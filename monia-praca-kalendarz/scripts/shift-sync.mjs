export const MARKER = '[synced:monia-praca-kalendarz]';

export function computeReminderMinutes(start) {
  const [hour, minute] = start.split(':').map(Number);
  return 180 + hour * 60 + minute;
}

export function buildTitle(start, end, updated) {
  const base = `Monia Praca ${start}–${end}`;
  return updated ? `${base} (updated)` : base;
}

export function buildDescription(existingDescription, changeLogLine) {
  const lines = (existingDescription || '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && line !== MARKER);
  if (changeLogLine) lines.push(changeLogLine);
  return [MARKER, ...lines].join('\n');
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

export function toIsoDateTime(date, time) {
  const [hour, minute] = time.split(':').map(Number);
  return `${date}T${pad2(hour)}:${pad2(minute)}:00`;
}

function eventDate(event) {
  return event.start.dateTime.slice(0, 10);
}

function eventStart(event) {
  return event.start.dateTime.slice(11, 16).replace(/^0/, '');
}

function eventEnd(event) {
  return event.end.dateTime.slice(11, 16).replace(/^0/, '');
}

function buildEventPayload({ date, start, end, updated, existingDescription, changeLogLine }) {
  return {
    summary: buildTitle(start, end, updated),
    description: buildDescription(existingDescription, changeLogLine),
    startDateTime: toIsoDateTime(date, start),
    endDateTime: toIsoDateTime(date, end),
    reminderMinutes: computeReminderMinutes(start),
  };
}

export function diffShifts({ existingEvents, parsedShifts, unparsedDates = [], today }) {
  const ours = existingEvents.filter((e) => (e.description || '').includes(MARKER));

  const grouped = new Map();
  for (const e of ours) {
    const date = eventDate(e);
    if (!grouped.has(date)) grouped.set(date, []);
    grouped.get(date).push(e);
  }

  const ambiguous = [];
  const byDate = new Map();
  for (const [date, events] of grouped) {
    if (events.length > 1) {
      ambiguous.push({ date, eventIds: events.map((e) => e.id) });
    } else {
      byDate.set(date, events[0]);
    }
  }

  const excluded = new Set([...unparsedDates, ...ambiguous.map((a) => a.date)]);
  const parsedByDate = new Map(parsedShifts.map((s) => [s.date, s]));

  const toCreate = [];
  const toUpdate = [];
  const toDelete = [];
  const unchanged = [];

  for (const [date, shift] of parsedByDate) {
    if (excluded.has(date)) continue;
    const existing = byDate.get(date);

    if (!existing) {
      toCreate.push({
        date,
        ...buildEventPayload({ date, start: shift.start, end: shift.end, updated: false, existingDescription: '', changeLogLine: null }),
      });
      continue;
    }

    const previousStart = eventStart(existing);
    const previousEnd = eventEnd(existing);

    if (previousStart === shift.start && previousEnd === shift.end) {
      unchanged.push(date);
      continue;
    }

    toUpdate.push({
      id: existing.id,
      date,
      previousStart,
      previousEnd,
      ...buildEventPayload({
        date,
        start: shift.start,
        end: shift.end,
        updated: true,
        existingDescription: existing.description,
        changeLogLine: `Updated ${today}: was ${previousStart}–${previousEnd}`,
      }),
    });
  }

  for (const [date, existing] of byDate) {
    if (excluded.has(date)) continue;
    if (!parsedByDate.has(date)) {
      toDelete.push({
        id: existing.id,
        date,
        previousStart: eventStart(existing),
        previousEnd: eventEnd(existing),
      });
    }
  }

  return { toCreate, toUpdate, toDelete, unchanged, skipped: [...unparsedDates], ambiguous };
}
