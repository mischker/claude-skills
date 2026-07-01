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
