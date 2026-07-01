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

**Before doing anything else in this step**: do not parse, describe, narrate, or state any shift times, dates, or statuses from any attached screenshot yourself — not even informally, in passing, or as part of your own reasoning. Forks inherit this entire conversation up to the point they're dispatched, so if you read or characterize the image's contents before dispatching the three forks below, all three would inherit that single anchored parse in their context, silently defeating the independence the whole triple-check exists to provide. The forks must each be the FIRST attempt at reading a given screenshot's shift data — not a check on an answer you already gave. Dispatch them while still "blind" to the screenshot's specific contents.

Process each attached screenshot independently, one at a time, through the numbered steps below. With N screenshots attached, this means **3×N total fork dispatches** — three fresh forks per screenshot, never shared or reused across screenshots.

For each screenshot:

1. Do **not** assume the attached screenshot lives at a stable path a fresh, context-less subagent can `Read` — images pasted directly into a chat aren't guaranteed to be reachable that way, and dispatching fresh general-purpose agents against a file path has been observed to fail unpredictably (confirmed 2026-07-01: 2 of 3 fresh-agent dispatches against a real attached screenshot failed to find the file at all, while 1 of 3 succeeded — a silent, nondeterministic failure mode that's especially dangerous here since a missed read could silently drop or corrupt a shift).
2. Dispatch **three independent fork subagents** for THIS screenshot (Agent tool, `subagent_type: "fork"`, run in parallel — a single message with three tool calls). A fork inherits this entire conversation, including the attached screenshot(s) themselves, so it doesn't depend on file-path resolution at all. Since more than one screenshot may be attached, each directive must unambiguously identify which specific image the fork is to read — by its attachment position (e.g. "the first attached screenshot", "the second attached screenshot"), or, once known, by the real month it depicts, or any other unambiguous identifier available. Give each fork this exact directive, filling in that identification:

   > Independently extract every day cell from [unambiguous identification of the one specific screenshot to read] into a JSON array of `{date, status, start, end}`, where `date` is the real absolute `YYYY-MM-DD` (attribute grayed-out overflow cells at the grid's edges to their true adjacent month, not the header month — a grayed cell with a *larger* day number than the first non-grayed cell belongs to the previous month; a grayed cell with a *smaller* day number than the last non-grayed cell belongs to the next month), `status` is one of `work`/`off`/`vacation`/`unclear`, and `start`/`end` (as `H:MM` strings, only present when status is `work`) come from the `od HH:MM do HH:MM` text. If a single cell shows more than one `od–do` range (a split shift), set `status` to `unclear` for that date instead of picking or merging a range. Do this as a fresh, independent read of the image — do not reuse or reference any extraction already discussed earlier in the conversation. Return only the JSON array as your final message, nothing else.

3. Compare the three returned arrays date by date. A date's `status`/`start`/`end` is only accepted into the result if all three subagents agree exactly. Any disagreement (different status, different time, or any subagent returning `unclear`) puts that date on the **unparsed** list instead of being guessed at.
4. Build the shift list from the agreed results: every date where all three agree `status: "work"` becomes `{date, start, end}`. Dates agreed as `off`/`vacation` are simply dropped — they produce no event, but still matter (a date that used to be a shift and is now `off` will show up as a delete in Step 3, since it just won't be in this list).

**Output:** for each real calendar month touched by the screenshot(s), a shift list `[{date, start, end}, ...]` and an unparsed-dates list `[date, ...]`.

## Step 2 — Fetch existing synced events

For each month from Step 1, call `mcp__claude_ai_Google_Calendar__list_events`:
- `calendarId`: `856514baed2c9e33f4510b3299c7e90dae1e96918222e3600e61f8c63875c596@group.calendar.google.com`
- `startTime`: that month's first day, `T00:00:00`
- `endTime`: the *following* month's first day, `T00:00:00`
- `timeZone`: `Europe/Warsaw`
- `pageSize`: `250` (the tool's documented maximum, to make truncation far less likely)

Check the response for a `nextPageToken`. If one is present, make a follow-up `list_events` call with the same parameters plus `pageToken` set to that value, and merge its returned events into the set for this month. Repeat until a response comes back with no `nextPageToken`, before moving on to Step 3 — a month with more than 250 events on the shared calendar is unlikely, but silently dropping events past the first page could cause duplicate creates or missed deletes for genuinely-synced events.

Keep the returned event objects exactly as-is (`id`, `summary`, `description`, `start.dateTime`, `end.dateTime`) — the diff script expects this raw shape.

## Step 3 — Compute the diff

For each month, write the JSON payload below to a temp file using the Write tool — do not embed the JSON in a shell command or shell-quote it in any way. Event `summary`/`description`/`location` text can contain single quotes, double quotes, or other characters (e.g. an unrelated event with an apostrophe in its title) that would break shell quoting and fail the whole month's sync. Then run the script (via Bash), redirecting that file in as stdin — no shell quoting of the JSON content at all:

```bash
node ~/.claude/skills/monia-praca-kalendarz/scripts/run-diff.mjs < /path/to/payload.json
```

The JSON payload is a single object:
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
