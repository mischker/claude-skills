import test from 'node:test';
import assert from 'node:assert/strict';
import { MARKER, computeReminderMinutes, buildTitle, buildDescription, toIsoDateTime } from './shift-sync.mjs';

test('computeReminderMinutes: 13:30 shift -> 990 minutes before start', () => {
  assert.equal(computeReminderMinutes('13:30'), 990);
});

test('computeReminderMinutes: 9:00 shift -> 720 minutes before start', () => {
  assert.equal(computeReminderMinutes('9:00'), 720);
});

test('computeReminderMinutes: 8:30 shift -> 690 minutes before start', () => {
  assert.equal(computeReminderMinutes('8:30'), 690);
});

test('computeReminderMinutes: 0:00 shift -> 180 minutes before start', () => {
  assert.equal(computeReminderMinutes('0:00'), 180);
});

test('buildTitle: no update flag', () => {
  assert.equal(buildTitle('13:30', '21:30', false), 'Monia Praca 13:30–21:30');
});

test('buildTitle: update flag adds exactly one suffix, regardless of call count', () => {
  const first = buildTitle('9:00', '17:00', true);
  const second = buildTitle('9:00', '17:00', true);
  assert.equal(first, 'Monia Praca 9:00–17:00 (updated)');
  assert.equal(second, first);
});

test('buildDescription: first call has marker only, no change log', () => {
  assert.equal(buildDescription('', null), MARKER);
});

test('buildDescription: preserves prior change-log lines and appends a new one', () => {
  const afterFirst = buildDescription(MARKER, 'Updated 2026-07-01: was 9:00–17:00');
  assert.equal(afterFirst, `${MARKER}\nUpdated 2026-07-01: was 9:00–17:00`);

  const afterSecond = buildDescription(afterFirst, 'Updated 2026-07-15: was 13:30–21:30');
  assert.equal(
    afterSecond,
    `${MARKER}\nUpdated 2026-07-01: was 9:00–17:00\nUpdated 2026-07-15: was 13:30–21:30`
  );
});

test('toIsoDateTime: zero-pads single-digit hours for a valid ISO string', () => {
  assert.equal(toIsoDateTime('2026-07-06', '9:00'), '2026-07-06T09:00:00');
  assert.equal(toIsoDateTime('2026-07-06', '13:30'), '2026-07-06T13:30:00');
});

import { diffShifts } from './shift-sync.mjs';

function markedEvent({ id, start, end, summary, description = MARKER, date = '2026-07-06' }) {
  const pad = (n) => String(n).padStart(2, '0');
  const [sh, sm] = start.split(':');
  const [eh, em] = end.split(':');
  return {
    id,
    summary,
    description,
    start: { dateTime: `${date}T${pad(sh)}:${sm}:00+02:00` },
    end: { dateTime: `${date}T${pad(eh)}:${em}:00+02:00` },
  };
}

test('diffShifts: no existing events -> everything is a create', () => {
  const result = diffShifts({
    existingEvents: [],
    parsedShifts: [{ date: '2026-07-06', start: '13:30', end: '21:30' }],
    today: '2026-07-01',
  });
  assert.equal(result.toCreate.length, 1);
  assert.equal(result.toCreate[0].summary, 'Monia Praca 13:30–21:30');
  assert.equal(result.toCreate[0].startDateTime, '2026-07-06T13:30:00');
  assert.equal(result.toCreate[0].reminderMinutes, 990);
  assert.equal(result.toUpdate.length, 0);
  assert.equal(result.toDelete.length, 0);
});

test('diffShifts: identical existing vs parsed -> no changes (idempotent)', () => {
  const existingEvents = [markedEvent({ id: 'evt1', start: '13:30', end: '21:30', summary: 'Monia Praca 13:30–21:30' })];
  const result = diffShifts({
    existingEvents,
    parsedShifts: [{ date: '2026-07-06', start: '13:30', end: '21:30' }],
    today: '2026-07-01',
  });
  assert.equal(result.toCreate.length, 0);
  assert.equal(result.toUpdate.length, 0);
  assert.equal(result.toDelete.length, 0);
  assert.deepEqual(result.unchanged, ['2026-07-06']);
});

test('diffShifts: changed time -> single update, tagged and logged', () => {
  const existingEvents = [markedEvent({ id: 'evt1', start: '9:00', end: '17:00', summary: 'Monia Praca 9:00–17:00' })];
  const result = diffShifts({
    existingEvents,
    parsedShifts: [{ date: '2026-07-06', start: '13:30', end: '21:30' }],
    today: '2026-07-01',
  });
  assert.equal(result.toUpdate.length, 1);
  const u = result.toUpdate[0];
  assert.equal(u.id, 'evt1');
  assert.equal(u.summary, 'Monia Praca 13:30–21:30 (updated)');
  assert.equal(u.description, `${MARKER}\nUpdated 2026-07-01: was 9:00–17:00`);
  assert.equal(u.reminderMinutes, 990);
});

test('diffShifts: second change to an already-updated shift keeps one tag, appends history', () => {
  const existingEvents = [markedEvent({
    id: 'evt1',
    start: '13:30',
    end: '21:30',
    summary: 'Monia Praca 13:30–21:30 (updated)',
    description: `${MARKER}\nUpdated 2026-07-01: was 9:00–17:00`,
  })];
  const result = diffShifts({
    existingEvents,
    parsedShifts: [{ date: '2026-07-06', start: '11:00', end: '19:00' }],
    today: '2026-07-15',
  });
  assert.equal(result.toUpdate.length, 1);
  const u = result.toUpdate[0];
  assert.equal(u.summary, 'Monia Praca 11:00–19:00 (updated)');
  assert.equal(
    u.description,
    `${MARKER}\nUpdated 2026-07-01: was 9:00–17:00\nUpdated 2026-07-15: was 13:30–21:30`
  );
});

test('diffShifts: date no longer in parsed shifts -> delete', () => {
  const existingEvents = [markedEvent({ id: 'evt1', start: '13:30', end: '21:30', summary: 'Monia Praca 13:30–21:30' })];
  const result = diffShifts({ existingEvents, parsedShifts: [], today: '2026-07-01' });
  assert.equal(result.toDelete.length, 1);
  assert.equal(result.toDelete[0].id, 'evt1');
  assert.equal(result.toDelete[0].previousStart, '13:30');
});

test('diffShifts: unmarked events on the shared calendar are ignored entirely', () => {
  const existingEvents = [{
    id: 'evt-family-dinner',
    summary: 'Family dinner',
    description: 'no marker here',
    start: { dateTime: '2026-07-06T18:00:00+02:00' },
    end: { dateTime: '2026-07-06T20:00:00+02:00' },
  }];
  const result = diffShifts({
    existingEvents,
    parsedShifts: [{ date: '2026-07-06', start: '13:30', end: '21:30' }],
    today: '2026-07-01',
  });
  assert.equal(result.toCreate.length, 1);
  assert.equal(result.toDelete.length, 0);
});

test('diffShifts: unparsed date is skipped even if a marked event exists there', () => {
  const existingEvents = [markedEvent({ id: 'evt1', start: '9:00', end: '17:00', summary: 'Monia Praca 9:00–17:00', date: '2026-07-15' })];
  const result = diffShifts({
    existingEvents,
    parsedShifts: [],
    unparsedDates: ['2026-07-15'],
    today: '2026-07-01',
  });
  assert.equal(result.toDelete.length, 0);
  assert.equal(result.toUpdate.length, 0);
  assert.deepEqual(result.skipped, ['2026-07-15']);
});

test('diffShifts: two marked events on the same date are flagged ambiguous, not auto-resolved', () => {
  const existingEvents = [
    markedEvent({ id: 'evt1', start: '9:00', end: '17:00', summary: 'Monia Praca 9:00–17:00' }),
    markedEvent({ id: 'evt2', start: '9:00', end: '17:00', summary: 'Monia Praca 9:00–17:00' }),
  ];
  const result = diffShifts({
    existingEvents,
    parsedShifts: [{ date: '2026-07-06', start: '13:30', end: '21:30' }],
    today: '2026-07-01',
  });
  assert.equal(result.toCreate.length, 0);
  assert.equal(result.toUpdate.length, 0);
  assert.equal(result.ambiguous.length, 1);
  assert.deepEqual(result.ambiguous[0].eventIds.sort(), ['evt1', 'evt2']);
});
