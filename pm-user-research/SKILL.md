---
name: pm-user-research
description: Use when planning user research, writing interview guides, preparing discovery sprints, synthesizing interview transcripts, running usability testing, or identifying who to build for. Do NOT use for feature prioritization or PRDs (use pm-value-stack for those).
---

# PM User Research — Hormozi Lens

## Overview

Most PMs research the average user. Hormozi says that's wrong. Find the top 20% of users (highest value, longest retained, most referrals), study them exclusively, find the 3–5 things they share, and build for them. Everyone else is noise.

**The two research principles:**
1. **Segment before you sample.** Never average insights across all users.
2. **Common factors > themes.** Find what the best-outcome users have in common — not what everyone mentions.

---

## Pre-Research: Find the Right Sample

Before any interview, identify value tiers:

| Tier | Proxy metric (if no revenue) |
|---|---|
| Top 20% | Retention length + feature depth + referrals |
| Middle 60% | Average engagement |
| Bottom 20% | Low engagement, high support, early churn |

**Interview only top 20% for insight generation.** Interview bottom 20% only to understand churn patterns. Never blend the two in the same analysis pass.

---

## Interview Template (4-Part Structure)

Use the same structure every time — it enables cross-interview common factors analysis.

| Section | Questions to ask |
|---|---|
| **Who they are** | Role, company size, industry, how long using product |
| **Before & now** | What were they doing before? What's different now? Quantify. |
| **Aspiration** | What did they want when they adopted this? What does success look like? |
| **Trigger + path** | What caused them to start? What did they do before they committed? What almost stopped them? |

**The trigger question is the most important.** Repeated triggers across best users = the exact signal to amplify in discovery and onboarding.

---

## Post-Interview: Common Factors Analysis

After 8–12 interviews with top-tier users:

1. Lay all transcripts side by side
2. Look for what **high-value users say** that **low-value users don't**
3. Find the 3–5 shared factors — not themes, but specific qualifiers
4. Those factors define who you're building for and what to emphasize in the product

> From $100M Lost Chapters: "Come up with the fewest qualifiers they all have in common. Usually three to five."

**Output of every research cycle:** A 3-factor ideal user profile + the reverse-engineered activation path (what they all did before they became high-value).

---

## Usability Testing: Effort & Deletion Audit

Standard usability testing asks "what's confusing?" Hormozi testing asks two different questions:

**Effort audit:** How long from first touch to first meaningful outcome? Time it. Set a target before the session. Every step that delays the Dream Outcome is a priority fix — not a design suggestion.

**Deletion test:** Remove a feature. Ask: "Did you notice this was missing? Could you still accomplish your goal?"
- If no: deletion candidate
- If yes but rarely needed: progressive disclosure candidate
- If yes and critical: keep and simplify

> From Retention Playbook: "Overwhelm is the #1 reason for churn... Less but better is better than more and decent."

---

## Key Research Questions

| Moment | Question |
|---|---|
| Trigger identification | "What was happening in your work right before you decided to try this?" |
| Dream Outcome | "If this worked perfectly and you never thought about [problem] again — what would that make possible?" |
| Activation path | "Walk me through your first two weeks. When did it first click?" |
| Effort audit | "What almost made you stop using this in the first month?" |
| Aha moment | "Was there a specific moment where you thought — yes, this is exactly what I needed?" |
| Deletion test | "If we removed [feature], could you still do your main job here?" |

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Researching all users equally | Segment by value tier first; interview top 20% separately |
| Synthesizing by themes | Run common factors analysis: what do high-value users share that others don't? |
| Asking about features | Ask about outcomes, triggers, and moments — never features |
| Testing by adding | Run deletion rounds; overwhelm is a silent churn driver |
| One-time research | The buying journey of your best users should be reverse-engineered into the default product path |
