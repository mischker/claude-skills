---
name: monia-praca-kalendarz
description: Sync Monia's monthly work-shift schedule screenshot into the shared "Nasze plany<3" Google Calendar. Invoke as /monia-praca-kalendarz with the schedule screenshot(s) attached.
---

# Monia Praca Kalendarz

Syncs Monia's monthly work-shift screenshot (from her employer's Inditex scheduling portal, Polish UI) into the "Nasze plany<3" Google Calendar (`856514baed2c9e33f4510b3299c7e90dae1e96918222e3600e61f8c63875c596@group.calendar.google.com`, `Europe/Warsaw`).

Design doc: `/Users/michalmischker/projects/monia-praca-kalendarz/docs/superpowers/specs/2026-07-01-monia-praca-kalendarz-design.md`

## When invoked

The user attaches one or more monthly schedule screenshots. Process each screenshot independently through all the steps below — a run with two screenshots produces two separate summaries at the end.

## Step 1 — Triple-pass parse

Getting a time wrong risks Monia missing or being late for a shift, so never trust a single read of the image.

1. Do **not** assume the attached screenshot lives at a stable path a fresh, context-less subagent can `Read` — images pasted directly into a chat aren't guaranteed to be reachable that way, and dispatching fresh general-purpose agents against a file path has been observed to fail unpredictably (confirmed 2026-07-01: 2 of 3 fresh-agent dispatches against a real attached screenshot failed to find the file at all, while 1 of 3 succeeded — a silent, nondeterministic failure mode that's especially dangerous here since a missed read could silently drop or corrupt a shift).
2. Dispatch **three independent fork subagents** instead (Agent tool, `subagent_type: "fork"`, run in parallel — a single message with three tool calls). A fork inherits this entire conversation, including the attached screenshot itself, so it doesn't depend on file-path resolution at all. Give each fork this exact directive:

   > Independently extract every day cell from the work-shift calendar screenshot attached in this conversation into a JSON array of `{date, status, start, end}`, where `date` is the real absolute `YYYY-MM-DD` (attribute grayed-out overflow cells at the grid's edges to their true adjacent month, not the header month — a grayed cell with a *larger* day number than the first non-grayed cell belongs to the previous month; a grayed cell with a *smaller* day number than the last non-grayed cell belongs to the next month), `status` is one of `work`/`off`/`vacation`/`unclear`, and `start`/`end` (as `H:MM` strings, only present when status is `work`) come from the `od HH:MM do HH:MM` text. If a single cell shows more than one `od–do` range (a split shift), set `status` to `unclear` for that date instead of picking or merging a range. Do this as a fresh, independent read of the image — do not reuse or reference any extraction already discussed earlier in the conversation. Return only the JSON array as your final message, nothing else.

3. Compare the three returned arrays date by date. A date's `status`/`start`/`end` is only accepted into the result if all three subagents agree exactly. Any disagreement (different status, different time, or any subagent returning `unclear`) puts that date on the **unparsed** list instead of being guessed at.
4. Build the shift list from the agreed results: every date where all three agree `status: "work"` becomes `{date, start, end}`. Dates agreed as `off`/`vacation` are simply dropped — they produce no event, but still matter (a date that used to be a shift and is now `off` will show up as a delete in Step 3, since it just won't be in this list).

**Output:** for each real calendar month touched by the screenshot, a shift list `[{date, start, end}, ...]` and an unparsed-dates list `[date, ...]`.

## Step 2 — Fetch existing synced events

For each month from Step 1, call `mcp__claude_ai_Google_Calendar__list_events`:
- `calendarId`: `856514baed2c9e33f4510b3299c7e90dae1e96918222e3600e61f8c63875c596@group.calendar.google.com`
- `startTime`: that month's first day, `T00:00:00`
- `endTime`: the *following* month's first day, `T00:00:00`
- `timeZone`: `Europe/Warsaw`

Keep the returned event objects exactly as-is (`id`, `summary`, `description`, `start.dateTime`, `end.dateTime`) — the diff script expects this raw shape.

## Step 3 — Compute the diff

For each month, run (via Bash):

```bash
echo '<JSON>' | node ~/.claude/skills/monia-praca-kalendarz/scripts/run-diff.mjs
```

`<JSON>` is a single object:
```json
{
  "existingEvents": [ /* raw event objects from Step 2, this month only */ ],
  "parsedShifts": [ /* {date, start, end} from Step 1, this month only */ ],
  "unparsedDates": [ /* unparsed dates from Step 1, this month only */ ],
  "today": "YYYY-MM-DD"
}
```
`today` is today's real date (Europe/Warsaw), in `YYYY-MM-DD` form.

The script returns `{ toCreate, toUpdate, toDelete, unchanged, skipped, ambiguous }`. Every `toCreate`/`toUpdate` entry already has the exact `summary`, `description`, `startDateTime`, `endDateTime`, and `reminderMinutes` to use verbatim — don't reconstruct or reformat them.

## Step 4 — Apply the diff

For each `toCreate` entry, call `mcp__claude_ai_Google_Calendar__create_event`:
- `calendarId`: the calendar ID above
- `summary`, `description`: from the entry
- `startTime`: entry's `startDateTime`
- `endTime`: entry's `endDateTime`
- `timeZone`: `Europe/Warsaw`
- `overrideReminders`: `[{"method": "popup", "minutes": entry.reminderMinutes}]`

For each `toUpdate` entry, call `mcp__claude_ai_Google_Calendar__update_event` with the same fields, plus `eventId: entry.id`.

For each `toDelete` entry, call `mcp__claude_ai_Google_Calendar__delete_event` with `eventId: entry.id`, `calendarId`, `notificationLevel: "NONE"`.

`unchanged` and `skipped` entries need no tool call. `ambiguous` entries also need no tool call — report them (Step 5), don't touch them.

If any `create_event`/`update_event`/`delete_event` call fails (rate limit, auth error, etc.), stop and report the failure directly in the summary rather than retrying silently — a silent retry could double-create an event.

## Step 5 — Report

Post a plain-language chat summary per month:
- **Added**: date + time, for each `toCreate` entry.
- **Updated**: date + old time → new time, for each `toUpdate` entry.
- **Removed**: date + old time, for each `toDelete` entry (the shift was cancelled).
- **Unchanged**: just the count (e.g. "12 shifts unchanged").
- **Couldn't read reliably**: dates from `skipped` — ask the user to confirm or re-send a clearer crop of those dates.
- **Needs manual cleanup**: dates from `ambiguous`, with the conflicting event IDs — more than one synced event exists on that date and this skill won't guess which to keep.
