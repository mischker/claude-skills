---
name: business-model-audit
description: Use when diagnosing what's wrong with an existing business — applying Hormozi's lens to identify which stage of the money model is broken and what to fix first.
---

# Business Model Audit — Hormozi Diagnostic Framework

## Overview

Most business problems trace back to a broken stage in the money model. Before fixing tactics, identify which stage is failing. Fix stages in order: attraction → upsell/downsell → continuity. Don't fix continuity if attraction is broken.

**The diagnostic question:** Where does money stop flowing?

**Always start with leads.** No amount of conversion optimization, upsell improvement, or retention work fixes a business that doesn't have a repeatable way to get customers in front of its offer.

---

## Stage 1: Diagnose the Attraction Stage

**Symptom:** Not enough new customers

Questions to ask:
- Are you getting leads? (Yes/No)
- Are leads converting to customers? (What's your close rate?)
- Is your CAC < 30-day revenue? (Is it profitable to acquire customers?)

| Finding | Problem | Fix |
|---|---|---|
| No leads | No advertising / wrong channel | `lead-gen-channels` |
| Leads not converting | Offer isn't compelling | `hormozi-offer-design` |
| Converting but unprofitable | CAC > 30-day revenue | Add upsell/downsell before scaling |
| Decent conversion, low volume | Right offer, wrong scale | Increase ad spend after testing |

**Benchmark:** If you can't describe your attraction offer in one sentence that makes someone say "tell me more" — it's broken.

---

## Stage 2: Diagnose the Upsell / Downsell Stage

**Symptom:** Getting customers but not profitable in 30 days

Questions to ask:
- Do you make any offers after the initial purchase?
- What % of customers take an upsell? (Target: > 20%)
- What % of lost customers get a downsell offer?
- Are you leaving any "nos" on the table without a follow-up offer?

| Finding | Problem | Fix |
|---|---|---|
| No upsell offered at all | Revenue left on table | Implement `mm-classic-upsell` immediately |
| Upsell offered but < 15% take rate | Wrong upsell, bad timing, or weak framing | Audit: right next problem? Right moment? |
| No downsell process | Losing people who say no | Add `mm-payment-plan-downsell` as first step |
| Price objections overwhelming close | Offer not compelling enough | `hormozi-offer-design` → improve core value |

**Quick win:** A single upsell added to a working attraction offer can flip a losing model to profitable overnight.

---

## Stage 3: Diagnose the Continuity Stage

**Symptom:** Good month-1 revenue but flat or declining total revenue

Questions to ask:
- What % of customers are on recurring payments? (Target: > 50% of your customer base)
- What's your monthly churn rate? (Target: < 5%)
- What's your average customer LTV vs. CAC?
- Do you have a continuity offer at all?

| Finding | Problem | Fix |
|---|---|---|
| No continuity offer | Rebuilding from zero every month | Add `mm-continuity-bonus` or `mm-waived-fee` |
| Churn > 10% monthly | Product isn't delivering value | Fix delivery first; then retention (`pm-retention`) |
| LTV < 3x CAC | Either churn is high or price is too low | Reduce churn or raise price |
| Continuity offer but < 30% conversion | Wrong offer type or wrong timing | Audit continuity offer match to `mm-selector` |

---

## The Five Levers: Which One Is Broken?

| Lever | Metric | Broken if... |
|---|---|---|
| **Leads** | Lead volume per month | No consistent, predictable inflow |
| **Conversion** | % of leads → customers | < 20% close rate (for warm leads) |
| **Price** | Revenue per customer | Below market or below delivery cost |
| **Retention** | Monthly churn | > 5% monthly |
| **Upsell** | Revenue per customer month 1 | < 1.5x of attraction offer price |

Fix in this order: Leads → Conversion → Price → Upsell → Retention.

Don't optimize retention if you're not getting enough customers. Don't optimize upsells if your attraction offer isn't converting.

---

## The Hormozi Diagnostic Questions

Ask these about any struggling business:

1. **What do you sell and to whom?** (If you can't answer in one sentence → positioning problem)
2. **How do you get customers?** (If no consistent answer → attraction problem)
3. **What's your close rate?** (< 20% for warm → offer or sales problem)
4. **What do you offer after they buy?** (Nothing → revenue problem)
5. **What happens when they say no?** (Nothing → downsell problem)
6. **What % are on recurring billing?** (< 30% → continuity problem)
7. **What's your monthly churn?** (> 5% → retention problem)
8. **Can one customer fund the cost of getting two more?** (No → model isn't working yet)

---

## Quick Wins vs. Root Causes

| Quick win (this week) | Root cause fix (this quarter) |
|---|---|
| Add upsell to existing close | Redesign offer using `hormozi-offer-design` |
| Add payment plan option | Rebuild pricing model |
| Call old customers with rollover offer | Build systematic win-back campaign |
| Add 3% processing fee | Restructure billing cadence |
| Implement basic objection scripts | Train full sales process |

Start with quick wins to generate cash. Fix root causes to build lasting growth.

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Fixing retention before attraction works | Get leads first; retention can't save a starved funnel |
| Adding products before fixing the offer | One great offer beats ten mediocre ones |
| Scaling a broken model | Always fix 30-day profitability before increasing ad spend |
| Measuring LTV without measuring 30-day | LTV is aspirational; 30-day is operational — track both |
