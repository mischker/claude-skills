---
name: pricing-psychology
description: Use when designing how prices are presented, framed, or anchored — contrast effects, charm pricing, reframing interest as discounts, decoy pricing, and the psychology of payment timing.
---

# Pricing Psychology — How Perception Beats Math

## Overview

The number doesn't determine perceived value — the frame around it does. The same price can feel cheap or expensive depending entirely on what's around it. Master framing before testing price points.

---

## 1. Anchoring

**Principle:** The first number people see becomes the reference point for everything after.

**Applications:**

**High anchor first:**
Present your most expensive option before your main offer. The main offer feels cheap by comparison.
- $16,000 suit before $2,200 suit → $2,200 feels like a deal
- Premium tier before standard tier → standard tier converts better
See `mm-anchor-upsell` for full implementation.

**Value anchor before price:**
Present total value before price.
> "Everything included is worth $4,700. Your investment today is $1,200."

The $3,500 gap = perceived savings. Do not present price without this anchor first.

**Bonus anchor:**
> "This used to sell for $500. As a member bonus, you get it free."

Anchors make free bonuses feel genuinely valuable.

---

## 2. Interest vs. Discount Reframe

**Wrong (punishes payment plans):**
> "It's $1,000. If you do a payment plan, we charge $100 interest."

**Right (rewards prepayment):**
> "It's $1,100. Pay today and you save $100 — that's what most people do."

Same math. Second version anchors higher, rewards speed, never penalizes.

---

## 3. Charm Pricing

- $97 feels meaningfully less than $100
- $997 feels meaningfully less than $1,000
- Works for sub-$10K prices; above $10K, use round numbers (signals confidence)
- **$7.5K–$10K gray zone:** $9,997 still works; $9,999 reads as gimmicky. When in doubt, test $9,997 vs. $10,000 — most practitioners find round numbers win in this tier.

Use charm pricing on upsells and lower-ticket items. Use round numbers on premium/high-ticket anchors.

---

## 4. The Decoy Effect

Three options where Option B makes Option C look like obvious value:

| Option | Price |
|---|---|
| A — Digital only | $59/mo |
| B — Print only | $125/mo |
| C — Digital + Print | $125/mo |

B exists only to make C feel like a deal. Most people choose C.

**Formula:** A (cheap option) + B (expensive, less useful) + C (same price as B, clearly more value)

Use when you have two products you want people to buy both of. B is the decoy.

---

## 5. Payment Timing Psychology

**Fewer, larger payments feel cheaper than many small ones.**

> "One payment of $2,400" feels like less than "24 payments of $100" — even though they're the same.

Lead with large-payment options in your downsell process. Work down to smaller payments only when necessary.

**Prepay vs. payment plan psychology:**
- Prepay = loss already processed; no ongoing pain
- Payment plan = recurring reminder of the cost; often leads to more buyer's remorse and cancellations

This is why annual billing has 2% monthly churn vs. monthly billing's 10.7%.

---

## 6. "Per Day" Reframe

Convert price to daily equivalent for expensive but recurring products:

> "$2,400/year sounds like a lot. But it's $6.57 per day — less than a coffee."

Effective for:
- Annual subscriptions
- High-ticket programs relative to daily habit costs
- B2C where competitors are low-cost habits (smoking, dining out, etc.)

---

## 7. Processing Fee Addition

Adding a stated processing fee (3%) to a price:
- Never causes loss of sale
- Feels like a standard business cost, not a price increase
- Goes straight to profit

At 10% margins, 3% fee = 30% more profit. Trivial to implement.

> "It's $[X] plus a standard 3% processing fee."

---

## 8. The "4-Week" vs. "Monthly" Trick

"Every 4 weeks" vs. "every month":
- Same perceived price to the customer
- 13 billing cycles vs. 12 in a year = 8.3% more revenue

At 20% margins, this adds 41% to annual profit. Change two words.

---

## 9. Continuity Pricing vs. One-Time

To control what % of customers choose subscription vs. one-time:

| One-time markup (vs. subscription) | % who choose subscription |
|---|---|
| 1.33x | 50% |
| 2x | 70% |
| 2.66x | 90% |

Price the one-time option to hit your desired subscription mix.

---

## 10. Loss vs. Gain Framing

People feel losses ~2x more than equivalent gains. Use this:

**Gain framing (weaker):**
> "Sign up and get 3 months free."

**Loss framing (stronger):**
> "If you don't sign up today, you lose the 3 months we've set aside for you."

Or: Waived Fee Offer — people stay to avoid losing the discount they already have.

---

## Quick Reference: Which Tactic for What Goal

| Goal | Tactic |
|---|---|
| Make main offer feel like a deal | Anchor (high price first) |
| Increase perceived value | Value anchor before price |
| Get payment plans to feel fair | Interest-as-discount reframe |
| Drive subscription over one-time | Continuity pricing ratio |
| Increase profit with zero friction | 3% processing fee + 4-week billing |
| Make premium feel affordable | Per-day reframe |
| Drive commitment | Loss framing / Waived Fee |

For systematic iteration on price points over time, see `mm-pricing-strategy`.
