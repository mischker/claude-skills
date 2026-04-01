---
name: pm-data
description: Use when analyzing product metrics, retention curves, engagement data, churn rates, cohort analysis, or making data-driven product decisions. Do NOT use for feature prioritization or PRDs (use pm-value-stack for those).
---

# PM Data Analysis — Hormozi Lens

## Overview

Most PMs optimize for average metrics: average retention, average DAU, average conversion. Hormozi says that's wrong. Segment every analysis by customer value tier. A retention problem in your top 20% is a crisis. The same problem in your bottom 20% may be healthy product-market selection.

**Core rule:** Never make a product decision from a blended average metric.

---

## The LTGP Mental Model for Product Data

Hormozi's key formula: **LTGP = Gross Profit ÷ Churn Rate**

Applied to product: every data question should ultimately answer "does this increase the lifetime value of our best users?"

| Metric type | Hormozi question |
|---|---|
| Retention | Which user tier is retaining? At what rate? |
| Engagement | Do engaged users correlate with high-value users? |
| Conversion | Does this feature increase LTV, or just conversion rate? |
| Churn | Is churn concentrated in high-value or low-value users? |

---

## Value-Tier Segmentation (Do This First)

Before any analysis, split users into three tiers:

| Tier | Definition | Your proxy |
|---|---|---|
| Top 20% | Highest LTV, longest retained, most referrals | Define this for your product |
| Middle 60% | Median engagement | — |
| Bottom 20% | Low engagement, high churn, high support cost | — |

**Build every retention, engagement, and funnel chart with this split.** Never report a single blended number without the tier breakdown.

---

## Churn Analysis: Find the Leading Indicator

Hormozi found gym member churn was predictable 2–3 weeks before cancellation by tracking attendance:

```
Week 1: 3 sessions
Week 2: 2 sessions  ← reach out here
Week 3: 1 session
Week 4: CANCEL
```

**Your product has the same signal.** Find it:

1. Export all users who churned in the last 90 days
2. Chart their weekly core-action count for 60 days before churn
3. Overlay users who renewed at the same time
4. Find the week where the lines diverge
5. That divergence = your intervention trigger

> From Retention Playbook: "If you talked to them right when their attendance goes down to two sessions, you could rescue them."

**Output:** One behavioral metric + one threshold = one intervention trigger. Instrument it.

---

## LTV-Weighted Feature Decisions

Standard PM mistake: kill a feature because it reduces trial-to-paid conversion by 8%.

Hormozi question: do users who complete that step retain at a higher rate?

**Framework:**

```
Decision = (Conversion Rate × LTGP) — not conversion rate alone

Before removing/simplifying anything in the funnel:
1. Pull cohort retention at 30/60/90 days for users who used it vs. didn't
2. Calculate: (conv rate × avg retention months) for both groups
3. If completers have 2x+ retention, the conversion drop is likely worth it
```

**Pricing corollary:** Hormozi raised one acquisition's price and tripled the business. For PM: test whether your highest-engagement tier would pay more, or stay longer at a higher commitment level, before optimizing purely for volume.

---

## Price / Value / Churn Triangle

From Retention Playbook — the three-way relationship:

| Move | Effect on conversion | Effect on churn | Net LTV impact |
|---|---|---|---|
| Raise price | Down | Down (higher commitment) | Often up |
| Add friction to onboarding | Down | Down (better-fit users) | Often up |
| Simplify / remove friction | Up | Up (less-fit users enter) | Depends |
| Add features | Neutral | Up (overwhelm) | Usually down |

**Overwhelm = #1 churn driver.** When in doubt, removing features often increases retention.

---

## Retention Reporting Checklist

```
[ ] Data segmented by value tier (not blended average)
[ ] Top-tier churn identified and flagged separately
[ ] Leading indicator of churn identified (behavioral divergence point)
[ ] LTV impact calculated for every significant feature decision
[ ] Cohort retention tracked at 30/60/90 days per feature cohort
[ ] "Overwhelm candidates" flagged (features added in same period as churn increase)
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Reporting average retention | Segment by value tier; top-20% retention is the only number that matters |
| Killing features on conversion rate alone | Check cohort retention: completers vs. skippers |
| Treating all churn equally | Top-tier churn = crisis; bottom-tier churn may be healthy selection |
| Measuring feature success by DAU | Measure: does it increase % of users who reach the Dream Outcome? |
| Adding features to improve retention | Audit for overwhelm first; deletion often improves retention faster than addition |
