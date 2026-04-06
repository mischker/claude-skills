---
name: mm-30-day-profit-test
description: Use when evaluating whether a money model is working — calculating if customer revenue in 30 days covers cost to acquire and serve them, and diagnosing what to fix if it doesn't.
---

# 30-Day Profit Test — Money Model Health Check

## Overview

A money model works when profit from one customer in 30 days exceeds the cost to get and serve that customer. This is the minimum. A $100M money model makes enough in 30 days to fund getting many more customers.

**The test:** `30-Day Revenue per Customer > CAC + COGS`

---

## The Three Thresholds

| Threshold | What it means |
|---|---|
| **Revenue < CAC + COGS** | Losing money. Fix before scaling. |
| **Revenue = CAC + COGS** | Breaking even. Sustainable but not scalable. |
| **Revenue > CAC + COGS** | Profitable. Scale advertising. |
| **Revenue >> CAC + COGS** | $100M model. Cash is no longer a growth limiter. |

---

## How to Calculate

**Step 1: Calculate CAC (Cost to Acquire a Customer)**
```
CAC = Total Ad Spend ÷ Number of Customers Acquired
```
Include: ad spend, sales salaries/commissions, referral fees, affiliate payouts

**Step 2: Calculate COGS (Cost of Goods/Service Delivered)**
```
COGS = Direct cost to deliver your offer to one customer
```
Include: labor, materials, software, fulfillment, time (at your hourly rate)

**Step 3: Calculate 30-Day Revenue per Customer**
```
30-Day Revenue = Attraction Offer + Upsells + Downsells + First Continuity Payment
```
This is what you actually collect in the first 30 days per customer (not LTV).

**Step 4: Run the test**
```
Profit = 30-Day Revenue - CAC - COGS
```
Positive = working. Negative = something is broken.

---

## Diagnosing What's Broken

**If 30-Day Revenue < CAC:**
- CAC is too high → improve targeting, ad creative, or funnel conversion
- Attraction offer isn't converting → test new offer structure
- Not enough upsell/downsell revenue → add or improve those stages

**If 30-Day Revenue < CAC + COGS:**
- Margins are too thin → raise price, reduce delivery cost, or both
- COGS are too high → audit delivery; what can be systematized or cut?

**If close rates are low:**
- Attraction offer wrong for audience
- Sales process broken → use `sales-call-structure`
- Offer doesn't address real objections → use `sales-objection-handler`

**If upsell/downsell revenue is low:**
- Upsell not being offered (ops problem)
- Upsell not solving the next real problem → revisit `mm-classic-upsell`
- No downsell process at all → implement `mm-payment-plan-downsell`

---

## The Money Model Build Sequence (When to Move to Next Stage)

| Stage | Move to next when... |
|---|---|
| **Stage I (Attraction only)** | Getting customers reliably; covering CAC |
| **Stage II (+ Upsell/Downsell)** | 30-day revenue covering CAC + COGS |
| **Stage III (+ Continuity)** | 30-day revenue exceeds CAC + COGS; now maximizing LTV |

**Don't move to the next stage until the current one is reliable.** Measure in quarters, not weeks.

---

## LTV Check (Secondary Metric)

After 30-day model is working, check long-term health:

```
LTV = Average Revenue per Customer per Month ÷ Monthly Churn Rate
LTGP = LTV × Gross Margin %
Healthy: LTGP ÷ CAC > 3x
```

Low LTV relative to CAC → retention problem (see `pm-retention`)
High churn → product or fit problem, not pricing

---

## Key Benchmarks

| Metric | Target |
|---|---|
| 30-Day Revenue / CAC | > 1x (just surviving) → aim for 3x+ |
| Payment plan cancellation rate | < 10% of payment planners |
| Upsell take rate | > 20–30% of buyers |
| Continuity conversion | > 30–40% of customers |
| Monthly churn | < 5% (< 2% for annual billing) |

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Measuring LTV instead of 30-day | LTV is lagging; 30-day is the operating metric |
| Scaling before 30-day model works | Fix the model first; scaling a broken model = faster losses |
| Ignoring COGS | High volume on thin margins destroys cash flow |
| No upsell/downsell → low 30-day revenue | Even one upsell can flip the model from negative to positive |
