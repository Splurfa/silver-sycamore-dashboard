# MOVE Protocol - Persistent Reference

**Source:** /Users/splurfa/projects/move-protocol-project
**Purpose:** Stop forgetting what MOVE is. Reference this.

---

## What MOVE Is

**MOVE Protocol** is a **generative coordination layer** between operator intent and builder execution. It converts four primitive inputs into complete, builder-ready documentation packages.

**Core Philosophy:**
> "If a project cannot answer the four MOVE questions explicitly, it is unsafe to build."

**The Problem MOVE Solves:**
AI collapsed software build costs from $50K to $500. Small operators can now afford custom tools but cannot write PRDs. Builders can deliver fast but need specifications. MOVE is the interface that bridges this gap.

**How It Works:**
```
Operator → Four Primitives → MOVE → {move-package.md + move-package.agent.yaml} → Builder/Agent
```

---

## The Four Primitives (MOVE = Map, Outcome, Verify, Exchange)

### 1. MAP
**Question:** Where are we? Where are we going?

```yaml
map:
  current_state:
    description: string      # Observable situation today
    actors: string[]         # Who's involved
    pain_points: string[]    # What's wrong
  desired_state:
    description: string      # Observable situation after
    success_signals: string[] # How we know we're there
  gap:
    blockers: string[]       # What prevents transition
    constraints: string[]    # What can't change
    dependencies: string[]   # External requirements
  context:
    systems: string[]        # Existing infrastructure
    stakeholders: string[]   # People affected
    timeline: string         # Time constraints
```

### 2. OUTCOME
**Question:** What exists when we're done?

```yaml
outcome:
  conditions:
    - id: "O1"
      condition: string      # What exists
      binary_test: string    # Yes/No verification question
      evidence: string       # Proof method
  completion_rule: "ALL" | "ANY"
```

**Critical Rule:** Each outcome must be testable with a yes/no question.

### 3. VERIFY
**Question:** How do we prove it worked?

```yaml
verify:
  test_scenario:
    description: string
    preconditions: string[]
    inputs: string[]
    duration: string
  success_criteria:
    - criterion: string
      evidence: string
      threshold: string
      maps_to: string        # Outcome ID (O1, O2, etc.)
  failure_criteria:
    - criterion: string
      evidence: string
  hard_constraints:
    - constraint: string
      consequence: string
```

### 4. EXCHANGE
**Question:** What value moves between parties?

```yaml
exchange:
  parties:
    - party: string
      gives:
        - item: string
          type: "money" | "time" | "asset" | "capability"
      gets:
        - item: string
          type: "money" | "outcome" | "asset" | "capability"
      value: string          # Why it's worth it
  completion:
    definition: string       # When value has transferred
    observable: string       # How we know
  disputes:
    process: string          # How disagreements resolved
    escalation: string       # Who decides if unresolved
```

---

## How Primitives Relate

```
MAP defines the problem space
  ↓
OUTCOME defines success conditions (achievable from Map.desired_state)
  ↓
VERIFY defines proof requirements (maps 1:1 to Outcomes)
  ↓
EXCHANGE defines value exchange (justifies the work scope)
```

---

## Generated Package Structure (v1.3)

MOVE generates TWO artifacts from primitives:

### 1. move-package.md (Human Documentation)

10-Part Structure:
1. Contract (Executive Summary & Success Criteria)
2. Specifications (Technical Requirements)
3. Testing (Test Plan)
4. Configuration (Environment Setup)
5. Execution (Implementation Roadmap)
6. Boundaries (Scope Definition)
7. Next MOVE (Future Phases)
8. Builder Assessment
9. Known Ambiguities
10. Post-Execution Learning

### 2. move-package.agent.yaml (Machine-Parseable Manifest)

```yaml
move_version: "1.3"
package_id: string
agent_ready: true
technology_stack:        # DETERMINISTIC - no "builder chooses"
build_sequence:          # Explicit dependency graph
assertions:              # Given-When-Then format
error_handling:          # State machines for errors
configuration:           # Typed config schema
file_structure: {}       # Expected file tree
```

---

## MOVE Compliance Checklist

A MOVE-compliant package must have:

1. **All Four Primitives Completed**
   - Map with current/desired/gap/context
   - Outcomes with binary tests and evidence
   - Verify with test scenarios and thresholds
   - Exchange with parties, completion, disputes

2. **Generated Package Structure**
   - Component specifications (1:1 with outcomes)
   - Edge cases (8+ per spec)
   - Test cases mapped to outcomes
   - Configuration schema
   - Deployment checklist
   - Boundaries (in/out scope)

3. **Agent Manifest (v1.3)**
   - Deterministic tech stack (zero "builder chooses")
   - Build sequence with dependencies
   - Assertions in Given-When-Then format

---

## Key Files in move-protocol-project

| Purpose | Location |
|---------|----------|
| Canonical Spec | `spec/MOVE-PROTOCOL-v1.3.md` |
| Primitives Template | `templates/primitives-template.yaml` |
| Package Template | `templates/package-template-v1.3.md` |
| Schema Reference | `docs/reference/primitive-schemas.md` |
| Example Package | `packages/don-intake/` |

---

## Why This Matters for Silver Sycamore

Every deliverable should be MOVE-compliant:
- Has the four primitives populated
- Has lineage (which initiative spawned it, what decisions shaped it)
- Has exchange value defined
- Can be verified with binary tests

The primitives are **modularly interchangeable** - you can apply any single primitive anywhere (business or building).

---

*Saved: 2026-01-05*
*Source repo: /Users/splurfa/projects/move-protocol-project*
