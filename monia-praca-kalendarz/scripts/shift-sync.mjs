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
