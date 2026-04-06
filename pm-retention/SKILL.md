---
name: pm-retention
description: Use when a product has churn, low activation, or poor re-engagement — designing the architecture that gets users to first value fast and keeps them coming back. Not for roadmap planning (use pm-value-stack).
---

# PM Retention — Hormozi Lens

## Overview

Hormozi's core retention insight: it costs 5–25x more to acquire a new customer than to retain one. A 3% churn reduction from 9% → 3% is a 3.3x increase in lifetime value. Retention is not a feature — it's an architecture you design into every stage of the product lifecycle.

**The two rules:**
1. Get users to their Dream Outcome as fast as possible (overwhelm kills before they ever get there)
2. Design proactive intervention points — don't wait for churn to react

---

## Time-to-First-Value: The North Star

From Lead Nurture Playbook: "The fewer days out leads scheduled, the greater the show rate." In product: the faster a user reaches their first meaningful outcome, the higher their long-term retention.

**Set this metric before any implementation work begins:**

```
Time-to-First-Value = time from signup to first [core action that predicts retention]

Measure it. Set a target. Every implementation decision in the sprint must answer:
"Does this bring that number down?"
```

Removing a step that costs users 2 days = more valuable than any new feature.

**The minimum viable activation path:** What is the fewest steps required for a new user to experience the Dream Outcome once? Build and protect that path first. Everything else is secondary.

---

## The 5 Hormozi Retention Interventions (Product Equivalent)

From Retention Playbook — the 5 Horsemen translated to product:

| Hormozi original | Product equivalent | When to trigger |
|---|---|---|
| Track attendance | Monitor core-action frequency | Instrument weekly active usage of key feature |
| Reach out when it drops | In-app or email intervention | Usage drops 50%+ week-over-week |
| Handwritten cards at milestones | Milestone messages (feel personal) | Day 7, Day 30, first key outcome achieved |
| Member events | Community moments, in-product events | Scheduled but feels spontaneous to user |
| Exit interview before cancellation | Offboarding interception flow | Cancellation intent detected — surface objection before final decision |

**The intervention message template:**
> "Hey, noticed you haven't [done X] this week — is there something getting in the way? Here's the one thing that usually helps."

This must feel personal, not automated. One specific observation + one specific suggestion.

---

## Less Is More: Design for Consumption

From Retention Playbook: "Think value per second, not seconds of value. Overwhelm is the #1 reason for churn."

Gym Launch went through 10 versions — each one shorter and simpler. The version with lowest churn: one Q&A call per month + one long newsletter. Adding more increased churn.

**Deletion-first spec rule:** Before adding anything to the onboarding or core flow, run the deletion test:
- Can users achieve the Dream Outcome without this step?
- Do users notice when this is missing?
- Is this consumed by most users, or just some?

If removable without impact → remove it.

**Spec pattern:** Every feature spec should answer "what does this replace or remove?" before "what does this add?"

---

## Build for Best Users First

From Common Factors Analysis method:

Before writing a spec, find users who already achieve the intended outcome — even through workarounds:

1. Identify 5–8 users who currently succeed at the thing you're about to build
2. Interview them: what are the 3 things they all do the same way?
3. Those 3 common factors = your default product path
4. Everything else is progressive disclosure or power-user territory

> "Who are the users who already do [thing] via workaround? What do they have in common? Build that as the default."

---

## Retention Architecture Checklist

```
[ ] Time-to-first-value defined and instrumented
[ ] Activation path: minimum viable steps to Dream Outcome mapped
[ ] Leading indicator of churn identified (behavioral signal before cancellation)
[ ] Intervention trigger: metric threshold + response message defined
[ ] Milestone moments: Day 7, Day 30, first core outcome — messages drafted
[ ] Deletion audit: run before adding anything to the core flow
[ ] Offboarding interception: does user see a structured question before cancelling?
[ ] "Build for best users" check: interviewed workaround users before spec written?
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Treating retention as a feature to ship | Retention is an architecture — instrument it before launch, not after |
| Waiting for cancellation to engage | Design proactive triggers at the first behavioral signal of disengagement |
| Adding more content/features to reduce churn | Audit for overwhelm first; removal often works better |
| Generic onboarding messages | Use specific observation ("you haven't done X") not generic ("come back!") |
| Designing for median user | Identify best-outcome users; reverse-engineer their path; make it the default |
| Measuring activation by signup completion | Measure activation by first meaningful outcome, not form submission |
