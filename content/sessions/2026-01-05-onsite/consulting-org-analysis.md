# Consulting Folder Organization Analysis

*How to organize artifacts that serve dual purposes: source documentation AND operational improvement*

**Generated:** 2026-01-05
**Context:** Revenue-focused consulting engagement for Silver Sycamore event venue

---

## The Multi-State Document Problem

When consulting firms engage with clients, they encounter a fundamental tension:

**Client documents serve DUAL purposes:**

| Role | Description | Example |
|------|-------------|---------|
| **Source Material** | Evidence of current state; what we discovered | "The sales script from the client's binder" |
| **Operational Reality** | What staff actually uses today | "The script the receptionist reads from" |
| **Under Evaluation** | Being assessed for effectiveness | "Does this script convert leads?" |
| **Potentially Deprecated** | May be replaced by our recommendations | "Our new script will replace this" |

A document like `sales-scripts.md` is simultaneously all four states. This creates confusion:
- Which version is canonical?
- What's the "before" vs "after"?
- What can we change vs what must we preserve?

---

## Consulting Industry Best Practices

### The "Baseline + Delta" Model

Major consulting firms (McKinsey, BCG, Deloitte) universally separate:

1. **Baseline Documentation** - Immutable snapshot of client's state at engagement start
2. **Working Analysis** - Consultant's assessment, findings, recommendations
3. **Deliverables** - Final recommendations and new materials
4. **Implementation Tracking** - Progress on adopted recommendations

This separation is critical for:
- Proving value ("here's what you had, here's what we gave you")
- Avoiding disputes ("we never said to delete that")
- Managing change ("the old process was X, new process is Y")
- Audit trails ("we can show exactly what changed and when")

### The "Current State / Future State" Pattern

Consulting engagements typically maintain:

```
current-state/     # What IS (discovered reality)
future-state/      # What SHOULD BE (recommendations)
gap-analysis/      # The delta between them
implementation/    # Progress on closing the gap
```

This pattern allows simultaneous work on evaluation AND improvement without confusion.

---

## Analysis: Current Silver Sycamore Structure

### Current Approach

```
engagement/
  artifacts/           # Mixed operational and analytical documents
    sales-scripts.md   # Extracted from client binder (but is it ours or theirs?)
    packages-pricing.md # Same ambiguity
    operational-inventory.md # Ditto
  inbox/
    client-sources/    # Original files - NEVER DELETE
      2026-01-02/      # Google Drive export
      2026-01-05/      # Binder photo extractions
  sessions/            # Meeting notes and session work
```

### Problems with Current Approach

1. **Artifacts are ambiguous** - `sales-scripts.md` extracted from client binder sits alongside our analytical documents. Is it "theirs" or "ours now"?

2. **No clear before/after separation** - When we improve the sales script, where does the new one go? Do we overwrite? Create a new file?

3. **Source preservation is good BUT** - We have `client-sources/` (excellent), but extracted content went directly into `artifacts/` which mixes document states.

4. **Evaluation artifacts mixed with operational artifacts** - `source-comparison.md` (our analysis) is in the same folder as `packages-pricing.md` (their documentation).

---

## Proposed Solution: State-Based Organization

### Option A: Subfolder Model (Recommended)

```
engagement/
  artifacts/
    baseline/                    # Immutable snapshot of client's current state
      sales-scripts.md           # Extracted from binder - FROZEN
      packages-pricing.md        # Their current pricing
      training-manual.md         # Their current training
      operational-inventory.md   # Complete inventory of what exists
      README.md                  # "Baseline captured 2026-01-05. Do not modify."

    analysis/                    # Our assessment work
      source-comparison.md       # Comparing sources
      gap-analysis.md            # What's missing/broken
      pricing-analysis.md        # Revenue optimization opportunities
      process-analysis.md        # Operational improvement opportunities

    recommendations/             # What we propose
      sales-scripts-v2.md        # Our improved version
      pricing-restructure.md     # New pricing recommendations
      training-improvements.md   # Suggested updates

    adopted/                     # What client approved and implemented
      sales-scripts.md           # The version they're actually using now
      # Moves here after implementation confirmed

    # Keep current operational documents at root
    command-center.md            # Engagement tracking
    engagement-log.md            # Chronological record
    engagement-tracker.md        # Decisions and wins
    initiatives.md               # Active work
    business-map.md              # Context (stable after discovery)
    people.md                    # Roles (stable after discovery)
    catering.md                  # Domain detail (stable after discovery)

  inbox/
    client-sources/              # NEVER DELETE - original files
    inputs/                      # Non-client materials
```

### Option B: Tag/Prefix Model (Simpler)

Keep flat structure, use naming conventions:

```
engagement/artifacts/
  # Baseline documents (their current state)
  baseline--sales-scripts.md
  baseline--packages-pricing.md
  baseline--training-manual.md

  # Analysis documents (our assessment)
  analysis--source-comparison.md
  analysis--pricing-gaps.md

  # Recommendations (our proposals)
  rec--sales-scripts-v2.md
  rec--pricing-restructure.md

  # Operational (ongoing engagement tracking)
  command-center.md
  engagement-log.md
  initiatives.md
```

### Option C: Status Header Model (Minimal Change)

Add explicit status headers to each document:

```markdown
# Sales Scripts

**Document Status:** BASELINE
**Source:** Client binder photos, 2026-01-05
**State:** Under evaluation - do not modify
**Related:** See `analysis/sales-effectiveness.md` for assessment
**Successor:** See `recommendations/sales-scripts-v2.md` for proposed replacement

---

[Original content below]
```

---

## Recommendation: Hybrid Approach

Given Silver Sycamore's current structure and the "convention over documentation" principle, I recommend:

### Phase 1: Immediate (Today)

Add status headers to existing artifacts to clarify their role:

```markdown
---
document_status: baseline | analysis | recommendation | adopted
source: client binder 2026-01-05 | consultant analysis | etc
state: frozen | active | deprecated
---
```

### Phase 2: Next Session

Create subfolder structure:

```
artifacts/
  baseline/          # Move extracted client docs here
  analysis/          # Move evaluation docs here
  recommendations/   # New folder for our proposals
  # Keep engagement tracking at root
```

### Phase 3: Implementation

When client adopts a recommendation:
1. Document in `engagement-tracker.md`
2. Move adopted version to appropriate location
3. Mark baseline version as "superseded by X"

---

## Document State Transitions

Clear rules for how documents move through states:

```
CLIENT SOURCE                BASELINE                    RECOMMENDATION              ADOPTED
(inbox/client-sources/)  ->  (artifacts/baseline/)   ->  (artifacts/recommendations/) -> (artifacts/adopted/)
     |                            |                            |                            |
     | Extract                    | Analyze                    | Client approves            |
     | & catalog                  | & assess                   | & we implement             |
     v                            v                            v                            v
  Never delete              Freeze after capture       Can iterate until approved    Current operational state
```

### State Definitions

| State | Mutability | Purpose | Example |
|-------|------------|---------|---------|
| **Source** | IMMUTABLE | Raw client files | `inbox/client-sources/2026-01-05/` |
| **Baseline** | FROZEN | Extracted, organized snapshot | `baseline/sales-scripts.md` |
| **Analysis** | ACTIVE | Our evaluation work | `analysis/pricing-gaps.md` |
| **Recommendation** | ACTIVE | Proposed improvements | `recommendations/sales-scripts-v2.md` |
| **Adopted** | VERSIONED | Implemented improvements | `adopted/sales-scripts.md` (post-implementation) |

---

## Practical Examples

### Example 1: Sales Scripts Journey

**Current state:**
- Source: Photos in `inbox/client-sources/2026-01-05/`
- Extracted to: `artifacts/sales-scripts.md`
- Status: Unclear - is this baseline or operational?

**Proposed journey:**

1. **Baseline** (`baseline/sales-scripts.md`)
   - Header: `document_status: baseline`
   - Content: Exact extraction from binder
   - Rule: NEVER modify after initial creation

2. **Analysis** (`analysis/sales-effectiveness.md`)
   - Assessment of current script effectiveness
   - Identified gaps: no objection handling for price, no follow-up protocol
   - Revenue impact estimate

3. **Recommendation** (`recommendations/sales-scripts-v2.md`)
   - Improved script with additions
   - Clear diff from baseline
   - Rationale for each change

4. **Adopted** (after client approval)
   - Move approved version to operational location
   - Train staff on new script
   - Track in engagement-tracker.md

### Example 2: Pricing Document Journey

**Current state:**
- `packages-pricing.md` - 684 lines, comprehensive extraction
- Mixed state: It's their pricing, but formatted by us

**Proposed treatment:**

1. Move to `baseline/packages-pricing.md` - freeze it
2. Create `analysis/pricing-opportunities.md` - our assessment
3. Create `recommendations/pricing-restructure.md` - proposed changes
4. After approval, update and track

---

## Implementation Checklist

### Immediate (This Session)

- [ ] Add document status headers to existing ambiguous artifacts
- [ ] Create `baseline/` subfolder
- [ ] Create `analysis/` subfolder
- [ ] Move extracted client content to `baseline/`
- [ ] Move evaluation content to `analysis/`
- [ ] Update `command-center.md` with new artifact locations

### Next Session

- [ ] Create `recommendations/` subfolder
- [ ] Establish document naming conventions
- [ ] Create first recommendation document
- [ ] Update CLAUDE.md with organizational pattern

### Ongoing

- [ ] Each new client document goes to `baseline/`
- [ ] Each analysis goes to `analysis/`
- [ ] Each proposal goes to `recommendations/`
- [ ] Track adoptions in `engagement-tracker.md`

---

## Document Naming Conventions

### Baseline Documents

Format: `{domain}.md` or `{domain}-{subtype}.md`

Examples:
- `sales-scripts.md` (their phone scripts)
- `packages-wedding.md` (their wedding package sheets)
- `packages-events.md` (their event package sheets)
- `training-manual.md` (their admin training)
- `vendor-contacts.md` (their vendor list)

### Analysis Documents

Format: `{domain}-analysis.md` or `{domain}-{focus}-analysis.md`

Examples:
- `sales-effectiveness-analysis.md`
- `pricing-gap-analysis.md`
- `process-friction-analysis.md`
- `source-comparison.md` (already exists, move to analysis/)

### Recommendation Documents

Format: `{domain}-recommendation.md` or `{domain}-v2.md`

Examples:
- `sales-scripts-v2.md` (improved script)
- `pricing-restructure.md` (pricing changes)
- `lead-follow-up-recommendation.md` (new process)

---

## Cross-Reference with Current Artifacts

| Current Artifact | Proposed Location | Rationale |
|------------------|-------------------|-----------|
| `sales-scripts.md` | `baseline/sales-scripts.md` | Extracted from client source |
| `packages-pricing.md` | `baseline/packages-pricing.md` | Extracted from client source |
| `operational-inventory.md` | `baseline/operational-inventory.md` | Comprehensive extraction |
| `source-comparison.md` | `analysis/source-comparison.md` | Our evaluation work |
| `business-map.md` | Keep at root | Stable context document |
| `people.md` | Keep at root | Stable context document |
| `catering.md` | Keep at root | Domain detail, rarely changes |
| `command-center.md` | Keep at root | Engagement tracking |
| `engagement-log.md` | Keep at root | Chronological record |
| `engagement-tracker.md` | Keep at root | Decisions and wins |
| `initiatives.md` | Keep at root | Active work tracking |
| `intake-assessments.md` | `analysis/intake-assessments.md` | Our evaluation work |

---

## Benefits of This Approach

### For the Engagement

1. **Clear provenance** - Always know where a document came from
2. **Safe to modify** - Know which documents can be edited
3. **Show value** - Easy to demonstrate before/after
4. **Avoid confusion** - Staff knows which version is current
5. **Support rollback** - Baseline preserved if recommendation fails

### For Revenue Focus

1. **Track improvements** - Clearly see what we've added
2. **Justify fees** - "We delivered X recommendations"
3. **Measure impact** - Compare baseline to adopted outcomes
4. **Scope creep protection** - Clear boundary of what was "theirs" vs "ours"

### For Client Relationship

1. **Transparency** - Client can see what we based recommendations on
2. **Trust** - We preserved their original work
3. **Ownership** - Clear handoff of adopted materials
4. **Continuity** - Future consultants can understand history

---

## Alternative Approaches Considered

### 1. Git-Based Versioning Only

**Approach:** Use git history to track document evolution
**Rejected because:**
- Git history is implicit, not explicit
- Hard to see "before/after" without diffing
- Doesn't help staff understand current state
- Consulting requires explicit documentation of change

### 2. Date-Prefixed Versions

**Approach:** `2026-01-05-sales-scripts.md`, `2026-01-15-sales-scripts.md`
**Rejected because:**
- Doesn't indicate document PURPOSE
- Still ambiguous: is the latest version adopted or proposed?
- Creates file proliferation

### 3. Single Document with Sections

**Approach:** One file with "Current", "Proposed", "History" sections
**Rejected because:**
- Files get very long
- Hard to share specific versions
- Merge conflicts if multiple people edit
- Doesn't work for binary/complex documents

---

## Conclusion

The recommended approach is **subfolder-based state organization**:

```
artifacts/
  baseline/           # Their frozen current state
  analysis/           # Our evaluation work
  recommendations/    # Our proposed improvements
  [operational docs]  # Engagement tracking at root
```

This provides:
- Clear document lifecycle management
- Explicit before/after separation
- Safe zones for modification vs preservation
- Industry-standard consulting practice alignment
- Revenue impact tracking capability

**Next action:** Implement the subfolder structure and migrate existing documents.

---

*This analysis supports the engagement governance principle: "Route all content to artifacts with explicit user approval."*
