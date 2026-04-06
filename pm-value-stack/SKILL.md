---
name: pm-value-stack
description: Use when defining product strategy, prioritizing features, scoping MVPs, or writing PRDs — applying value equation logic to product decisions. Not for marketing offers or pricing (use grand-slam-offer-creation for those).
---

# PM Value Stack — Product as Offer

## Overview

Every product decision is an offer: you are exchanging engineering effort and user attention for a desired outcome. The same framework that builds irresistible business offers applies to product — applied to two audiences simultaneously.

**The two buyers in every PM decision:**

| Audience | "Price" they pay | "Dream outcome" they want |
|---|---|---|
| **End user** | Time, attention, learning curve, friction | Goal achieved faster / with less effort |
| **Internal stakeholder** | Engineering cost, opportunity cost, risk | Business metric moved (revenue, retention, activation) |

A feature that scores well for users but can't be justified to stakeholders ships late or never. A feature justified to stakeholders but irrelevant to users gets built and abandoned. The PM's job is to find items that satisfy both value equations simultaneously.

---

## The Value Equation Applied to Product

**Value = (Outcome × Likelihood) ÷ (Time to Value × Effort)**

Apply this to evaluate any feature or initiative:

| Driver | User lens | Stakeholder lens |
|---|---|---|
| **Outcome** | Does this solve a real job-to-be-done? | Does this move a key business metric? |
| **Likelihood** | Will users actually succeed with this feature? | Is there evidence this will work? |
| **Time to value** | How quickly does the user experience the benefit? | How fast can we ship it? Payback period? |
| **Effort/Sacrifice** | How hard is it to adopt? Learning curve? | How complex to build? Maintenance burden? |

**Prioritize features that compress the denominator** — fast to ship, fast to adopt, low maintenance — before reaching for bigger outcome promises.

---

## 5-Step Feature / Product Build Process

### Step 1: Define the Dream Outcome

Write one sentence from the user's perspective naming the exact result they want — not what the feature does, but where the user arrives.

- Bad: "Users can filter the dashboard"
- Good: "Users immediately see only the data relevant to their current decision — without configuring anything"

Also write the stakeholder version:
- "Increases week-3 retention by reducing time-to-first-insight for new users"

Both must exist before scoping begins.

### Step 2: List Every Problem (Exhaustive)

For each step a user must take to reach the dream outcome, list every obstacle in 4 dimensions:

1. **Value doubt** — "Is this worth my time / switching cost?"
2. **Likelihood doubt** — "Will this actually work for my use case / data / team?"
3. **Effort** — "This looks complicated / I'll need to configure too much / I'll break something"
4. **Time** — "This will take too long to set up / I won't see results fast enough"

Aim for completeness. One unresolved obstacle = one reason the feature gets ignored after launch.

### Step 3: Turn Problems Into Solutions (Feature Inventory)

Flip each problem into a "How might we" or "How to" statement:

- "Users won't know if it works for their data" → "How to give users instant confidence the feature works before full commitment"
- "Setup takes too long" → "How to deliver the first meaningful result in under 60 seconds"

This list is your full feature/capability inventory — the raw material for scoping.

### Step 4: Delivery Vehicles (How to Solve Each)

For each solution, brainstorm all possible delivery mechanisms:

| Dimension | Options |
|---|---|
| **Effort from user** | Fully automatic (DFY) / Guided setup (DWY) / Manual config (DIY) |
| **Scope** | Single user / Team / Org-wide |
| **Timing** | Real-time / Async / Scheduled / On-demand |
| **Surface** | In-product / Email / API / Notification |
| **Fidelity** | Full feature / MVP / Experiment / Flag |

**10x / 1/10th test:**
- If you had 10x the eng capacity, what would you build?
- If you had 1/10th, how would you still deliver the core value?

The 1/10th answer is often your MVP.

### Step 5: Trim & Stack (Prioritization)

Remove first:
- High eng cost + Low user/business value
- Low eng cost + Low user/business value

Keep and prioritize:
- **Low cost + High value** → ship first, these are your high-leverage wins
- **High cost + High value** → sequence carefully, validate with smaller bets first

**Stack the release:**
Bundle low-cost high-value items together into a coherent launch. Each item should address a distinct obstacle from Step 2. The user experience of the launch should feel like: "They solved everything I was worried about."

---

## Next-Problem Roadmapping

The best back-end product always solves the customer's *next* problem — not the founder's passion or sales' top request.

> From $100M LTV Playbook: "My favorite upsell of all time: more of — or more help with — what they just bought, but with faster results, less risk, less effort, less hassle — for more money."

**After any successful product milestone, map the next barrier:**

1. Identify users who consistently succeed with the current feature (your top 20%)
2. Ask: "What do you try to do right after you win with this, that we don't support?"
3. The answer is your next roadmap item — not your backlog, your users' post-success frustration

**The test for a correct next initiative:** Would a power user of the current product immediately understand why this is the logical next thing to build? If yes, ship it. If they'd be confused why you're building it, it's founder vision, not user value.

**Key question:** "For users who get full value from [current feature] — what's the next frustration in their workflow after they win with us?"

---

## Scarcity & Urgency in PM (Sequencing & Prioritization)

These aren't marketing tricks — they're real constraints:

**Scarcity = capacity limits**
- How many features can your team ship this quarter without quality degrading?
- Publish your real capacity. Say no to low-value requests explicitly.
- "We can take 2 new initiatives this quarter; these are the 2 we're taking."

**Urgency = market timing and opportunity decay**
- Is there a window where this feature has outsized impact (competitive move, regulatory deadline, seasonal spike)?
- "Exploding opportunity" framing: some features lose 80% of their value if shipped 6 months late.

---

## Bonuses (What to Stack Into a Launch)

A feature launch is more valuable when broken into named component parts:

- Core feature
- Migration/onboarding guide
- Template or starting configuration
- Documentation with real examples
- In-app tooltip / empty state with first-run guidance
- Success metric visibility (let users see the outcome of the feature)

Each component addresses a specific adoption obstacle. Enumerate them in your launch brief — don't bury them. "We also shipped X, Y, Z" gets more stakeholder credit than a monolithic "we shipped the filtering feature."

---

## Guarantees (Risk Reversal in Product)

User risk is the #1 adoption blocker. Design it out:

| Risk type | PM response |
|---|---|
| "What if I mess up my data?" | Undo, preview, sandbox, dry-run mode |
| "What if I don't use it enough to be worth learning?" | Default-on, progressive disclosure, zero-config default |
| "What if my team doesn't adopt it?" | Admin rollout controls, team-level pilots |
| "What if this doesn't work for my use case?" | Free trial, usage-based activation, easy off-ramp |

**Frame your guarantee in the PRD/launch doc:**
"Users can try this feature without affecting live data. If they don't see value in the first session, they can revert with one click."

Strong risk reversal = faster enterprise adoption cycles.

---

## Naming Features and Initiatives

Apply the M-A-G-I-C formula to feature and initiative names:

| Letter | PM translation | Examples |
|---|---|---|
| **M** | Reason why / hook | "Automated", "Instant", "Zero-config", "One-click" |
| **A** | User segment | "For ops teams", "For solo founders", "For enterprise admins" |
| **G** | Goal / outcome | "First insight", "Faster close", "Zero manual work" |
| **I** | Time interval | "In 60 seconds", "Same day", "Week-1" |
| **C** | Container/type | "Dashboard", "Workflow", "Integration", "Assistant", "Mode" |

- Bad: "Advanced Filtering v2"
- Good: "Instant Focus Mode — see only what matters, zero configuration"

Good names improve adoption (users know what it does before clicking) and internal alignment (everyone understands what's being built and why).

---

## PRD / Initiative Structure Checklist

```
[ ] Dream outcome stated (user version + stakeholder version)
[ ] 20+ problems listed across 4 dimensions
[ ] Each problem converted to a solution/requirement
[ ] Delivery vehicle chosen per solution (DFY / DWY / DIY, scope, fidelity)
[ ] Trimmed to high-value, shippable scope
[ ] Bundle named (M-A-G-I-C formula)
[ ] Risk reversal designed in (undo / preview / pilot / off-ramp)
[ ] Launch components enumerated (core + onboarding + docs + in-app guidance)
[ ] Success metric tied to dream outcome (user + stakeholder)
[ ] Sequencing justified (scarcity = real capacity, urgency = real window)
```

---

## Common PM Mistakes

| Mistake | Fix |
|---|---|
| Defining the feature, not the outcome | Rewrite the goal as where the user arrives, not what you ship |
| Scoping before exhausting the problem list | Run Steps 2–3 fully before touching scope |
| Building the 10x version of a 1/10th problem | Score value honestly; high-fidelity delivery of a low-value outcome is waste |
| Launching without risk reversal | Design the off-ramp before writing the spec |
| Naming features after internal jargon | Apply M-A-G-I-C; test the name with one user who hasn't seen it |
| Treating all stakeholders as one buyer | Run the value equation separately for end users and business stakeholders |
| Shipping without stacking the launch | Enumerate every component; each one adds adoption momentum |
