# Artifact Organization Analysis

*Options for restructuring `engagement/artifacts/` to handle document lifecycle and state disambiguation*

**Generated:** 2026-01-05
**Context:** 14 flat markdown files with overlapping purposes and ambiguous lifecycle states

---

## The Problem Statement

The current artifact structure conflates multiple document states:

1. **Source material** - "This is what we extracted from their binder"
2. **Current operations** - "This is what they're using today"
3. **Under evaluation** - "This is what we're analyzing for improvements"
4. **Recommended changes** - "This is what we think they should do"
5. **Implemented** - "This is what we've delivered and they're using"

**Concrete example:** `sales-scripts.md` is simultaneously:
- Evidence extracted from the physical binder (source)
- Documentation of what staff currently use (current state)
- Material being evaluated for improvements (analysis)
- Potentially input to a deliverable we'd recommend (target state)

This ambiguity creates problems:
- Can't tell if a document represents "what is" vs "what should be"
- No clear lifecycle progression from discovery through delivery
- Hard to track what's been validated, what's proposed, what's implemented
- Risk of overwriting source material when making recommendations

---

## Current Artifact Inventory

| Artifact | Primary Purpose | Lifecycle State(s) |
|----------|-----------------|-------------------|
| `command-center.md` | Dashboard/entry point | Operational (always current) |
| `engagement-log.md` | Chronological history | Append-only (frozen entries) |
| `engagement-tracker.md` | Decisions, deliverables, wins | Operational + evaluative |
| `initiatives.md` | Active work items | Operational |
| `business-map.md` | Business context | Source + current state |
| `people.md` | Roles and duties | Source + current state |
| `catering.md` | Channel detail | Source + current + evaluative |
| `operational-inventory.md` | Products, venues, forms | Source (extracted from binder) |
| `packages-pricing.md` | Full pricing structure | Source (extracted from binder) |
| `sales-scripts.md` | Phone protocols | Source (extracted from binder) |
| `intake-assessments.md` | Confidence matrices | Process metadata |
| `source-comparison.md` | Drive vs binder analysis | Analysis/evaluation |
| `client-sources-2026-01-02-catalog.md` | File inventory | Source catalog |
| `client-sources-2026-01-05-catalog.md` | File inventory | Source catalog |

**Observation:** Several artifacts serve purely as source catalogs or source extractions, while others mix source material with operational tracking.

---

## Option 1: Lifecycle Folders with Cross-References

### Structure

```
engagement/artifacts/
├── 00-dashboard/
│   └── command-center.md          # Entry point, always current
│
├── 01-source/                     # IMMUTABLE - what we found
│   ├── operational-inventory.md   # Binder extraction
│   ├── packages-pricing.md        # Binder extraction
│   ├── sales-scripts.md           # Binder extraction
│   ├── source-comparison.md       # Analysis of sources
│   └── catalogs/
│       ├── client-sources-2026-01-02-catalog.md
│       └── client-sources-2026-01-05-catalog.md
│
├── 02-current-state/              # What's true today
│   ├── business-map.md            # How the business operates
│   ├── people.md                  # Current roles and duties
│   └── catering.md                # Current channel operations
│
├── 03-analysis/                   # Gap analysis, evaluation
│   ├── channel-assessments.md     # Where gaps exist
│   ├── process-friction.md        # Identified friction points
│   └── intake-assessments.md      # Confidence matrices
│
├── 04-recommendations/            # Proposed improvements
│   ├── sales-scripts-proposed.md  # Enhanced scripts
│   ├── pricing-recommendations.md # Pricing changes
│   └── process-improvements.md    # Workflow changes
│
├── 05-implemented/                # Delivered and accepted
│   └── (empty until deliverables complete)
│
└── 99-operational/                # Engagement tracking
    ├── engagement-log.md
    ├── engagement-tracker.md
    └── initiatives.md
```

### Migration Map

| Current Artifact | New Location | Rationale |
|-----------------|--------------|-----------|
| `command-center.md` | `00-dashboard/` | Entry point stays prominent |
| `operational-inventory.md` | `01-source/` | Pure binder extraction |
| `packages-pricing.md` | `01-source/` | Pure binder extraction |
| `sales-scripts.md` | `01-source/` | Pure binder extraction |
| `source-comparison.md` | `01-source/` | Source analysis |
| `client-sources-*-catalog.md` | `01-source/catalogs/` | Source inventories |
| `business-map.md` | `02-current-state/` | Current business context |
| `people.md` | `02-current-state/` | Current roles |
| `catering.md` | `02-current-state/` | Current operations |
| `intake-assessments.md` | `03-analysis/` | Evaluation artifact |
| `engagement-log.md` | `99-operational/` | Process tracking |
| `engagement-tracker.md` | `99-operational/` | Process tracking |
| `initiatives.md` | `99-operational/` | Process tracking |

### How It Handles the "Simultaneously Source AND Operational" Problem

**Split the document:**
- `01-source/sales-scripts.md` contains the verbatim extraction from the binder (immutable)
- `02-current-state/sales-process.md` describes how sales actually works today (can evolve)
- `04-recommendations/sales-scripts-proposed.md` contains recommended improvements
- `05-implemented/sales-scripts.md` becomes the final delivered version

**Cross-reference convention:**
Each document includes a header section:
```markdown
## Lineage
- **Source:** `01-source/sales-scripts.md`
- **Analysis:** `03-analysis/sales-process-gaps.md`
- **Status:** Current state documentation
```

### Pros

1. **Clear lifecycle progression** - Documents move through numbered stages
2. **Source preservation** - Original extractions never modified
3. **Unambiguous state** - Folder location tells you what the document represents
4. **Audit trail** - Can trace from source through recommendation to implementation
5. **MOVE Protocol alignment** - Maps cleanly to: gather sources, analyze gaps, recommend, implement

### Cons

1. **More files** - Same content split across multiple documents
2. **Folder navigation** - More clicks to find things
3. **Maintenance burden** - Must update multiple locations when things change
4. **Potential staleness** - Source docs may drift from current state if not cross-referenced properly
5. **Numbered prefix ugliness** - `00-`, `01-`, etc. is functional but not elegant

---

## Option 2: State Tags with Flat Structure (Enhanced Metadata)

### Structure

```
engagement/artifacts/
├── command-center.md              # Dashboard (no prefix)
│
├── [s] operational-inventory.md   # [s] = source
├── [s] packages-pricing.md
├── [s] sales-scripts.md
├── [s] source-comparison.md
├── [s] client-sources-2026-01-02-catalog.md
├── [s] client-sources-2026-01-05-catalog.md
│
├── [c] business-map.md            # [c] = current state
├── [c] people.md
├── [c] catering.md
│
├── [a] intake-assessments.md      # [a] = analysis
├── [a] channel-assessments.md
│
├── [r] sales-scripts-proposed.md  # [r] = recommendation
│
├── [i] (implemented deliverables) # [i] = implemented
│
├── engagement-log.md              # Operational (no prefix)
├── engagement-tracker.md
└── initiatives.md
```

### Alternative: Frontmatter Tags

Keep flat structure but add explicit YAML frontmatter to each document:

```yaml
---
title: Sales Scripts & Phone Protocols
state: source
source_date: 2026-01-05
source_type: binder-extraction
confidence: 0.90
related:
  - current: sales-process.md
  - analysis: sales-gaps.md
  - recommendation: sales-scripts-proposed.md
---
```

### Migration Map

Same artifacts, but add state metadata to each file header.

### How It Handles the "Simultaneously Source AND Operational" Problem

**Explicit state declaration:**
Each document declares its primary state in frontmatter. If a document serves multiple purposes, it gets split.

**State registry in command center:**
```markdown
## Artifact States

### Source Documents [s]
- operational-inventory.md
- packages-pricing.md
- sales-scripts.md
...

### Current State [c]
- business-map.md
- people.md
...

### Analysis [a]
- intake-assessments.md
...

### Recommendations [r]
(none yet)

### Implemented [i]
(none yet)
```

### Pros

1. **Minimal reorganization** - Mostly metadata additions
2. **Flat structure preserved** - Easy to navigate, no deep nesting
3. **Machine-readable** - Frontmatter enables tooling/automation
4. **Gradual adoption** - Can add tags incrementally
5. **Single source of truth per topic** - Don't need parallel documents for same content

### Cons

1. **Discipline required** - Must maintain frontmatter accurately
2. **Visual noise** - Prefixes or tags clutter filenames
3. **Ambiguity persists for mixed-state docs** - What's the state of a doc that's both source AND operational?
4. **No clear progression path** - How does a doc "graduate" from one state to another?
5. **Dashboard burden** - Command center must manually track all state categorizations

---

## Option 3: Domain + Stage Matrix (Hybrid)

### Concept

Organize by **domain** (what it's about) with **stage suffixes** (where it is in lifecycle).

### Structure

```
engagement/artifacts/
├── _dashboard/
│   └── command-center.md
│
├── _operational/                  # Engagement tracking (meta)
│   ├── engagement-log.md
│   ├── engagement-tracker.md
│   ├── initiatives.md
│   └── intake-assessments.md
│
├── business/                      # Business context domain
│   ├── business-map.md            # Current state (default)
│   └── people.md
│
├── catering/                      # Catering channel domain
│   ├── catering.source.md         # Extracted from sources
│   ├── catering.md                # Current operations
│   └── catering.target.md         # Recommendations (when created)
│
├── weddings/                      # Weddings channel domain
│   ├── packages.source.md         # Binder extraction
│   ├── sales-scripts.source.md    # Binder extraction
│   ├── packages.md                # Current offerings
│   └── sales-scripts.target.md    # Enhanced scripts (when created)
│
├── sources/                       # Raw source catalogs
│   ├── comparison.md
│   ├── catalog-2026-01-02.md
│   └── catalog-2026-01-05.md
│
└── venue/                         # Venue/operations domain
    └── operational-inventory.source.md
```

### Naming Convention

| Suffix | Meaning | Example |
|--------|---------|---------|
| `.source.md` | Extracted from client materials | `sales-scripts.source.md` |
| `.md` (none) | Current state/operations | `catering.md` |
| `.target.md` | Proposed/recommended state | `sales-scripts.target.md` |
| `.gap.md` | Gap analysis between states | `catering.gap.md` |
| `.delivered.md` | Implemented and accepted | `sales-scripts.delivered.md` |

### Migration Map

| Current Artifact | New Location | Rationale |
|-----------------|--------------|-----------|
| `command-center.md` | `_dashboard/` | Meta/entry point |
| `engagement-log.md` | `_operational/` | Process tracking |
| `engagement-tracker.md` | `_operational/` | Process tracking |
| `initiatives.md` | `_operational/` | Process tracking |
| `intake-assessments.md` | `_operational/` | Process metadata |
| `business-map.md` | `business/` | Business domain |
| `people.md` | `business/` | Business domain |
| `catering.md` | `catering/` | Split: current ops |
| `packages-pricing.md` | `weddings/packages.source.md` | Source extraction |
| `sales-scripts.md` | `weddings/sales-scripts.source.md` | Source extraction |
| `operational-inventory.md` | `venue/operational-inventory.source.md` | Source extraction |
| `source-comparison.md` | `sources/comparison.md` | Source analysis |
| `client-sources-*-catalog.md` | `sources/catalog-*.md` | Source catalogs |

### How It Handles the "Simultaneously Source AND Operational" Problem

**Parallel documents with explicit relationships:**

```
weddings/
├── sales-scripts.source.md    # What we found in the binder
├── sales-scripts.md           # What they use today (may differ from source)
├── sales-scripts.gap.md       # What's missing/broken
├── sales-scripts.target.md    # What we recommend
└── sales-scripts.delivered.md # What we shipped
```

**Domain grouping benefits:**
- All catering-related docs live in `catering/`
- All wedding-related docs live in `weddings/`
- Can quickly see full lifecycle for any domain

**Version progression is explicit:**
1. `.source.md` - Discovery
2. `.md` (current) - Documentation
3. `.gap.md` - Analysis
4. `.target.md` - Recommendation
5. `.delivered.md` - Implementation

### Pros

1. **Domain-centric navigation** - Find everything about weddings in one place
2. **Clear lifecycle within domain** - See full journey from source to delivery
3. **Parallel documents are expected** - No ambiguity about what represents what
4. **Suffix convention is intuitive** - `.source` vs `.target` vs `.delivered` is self-documenting
5. **Scales with complexity** - Add more domains as engagement grows
6. **MOVE Protocol fit** - source → current → gap → target → delivered maps directly to engagement workflow

### Cons

1. **More folders** - Navigation requires knowing the domain structure
2. **Naming discipline** - Must consistently use suffixes
3. **Potential confusion** - `catering.md` vs `catering/catering.md` if not careful
4. **Not all artifacts fit domains** - Some cross-cutting (like `business-map.md`)
5. **Initial restructuring effort** - Significant migration needed

---

## Recommendation Analysis

### Criteria for Evaluation

| Criterion | Weight | Option 1 (Lifecycle) | Option 2 (Tags) | Option 3 (Domain+Stage) |
|-----------|--------|---------------------|-----------------|-------------------------|
| Lifecycle clarity | High | Excellent | Fair | Excellent |
| Source preservation | High | Excellent | Good | Excellent |
| Navigation ease | Medium | Fair | Excellent | Good |
| Maintenance burden | Medium | High | Low | Medium |
| MOVE Protocol fit | High | Good | Fair | Excellent |
| Disambiguation | High | Good | Fair | Excellent |
| Scalability | Medium | Good | Good | Excellent |
| Migration effort | Low | Medium | Low | High |

### Summary Assessment

**Option 1 (Lifecycle Folders):** Best for audit trail and clear progression. Suffers from parallel file maintenance and deep navigation.

**Option 2 (State Tags):** Lowest friction, preserves current structure. But doesn't truly solve the "mixed state" problem - just documents it.

**Option 3 (Domain + Stage Matrix):** Best conceptual fit for the problem. Groups related content while maintaining clear lifecycle. Higher migration effort but most intuitive long-term.

---

## Key Principles for Any Option

Regardless of structure chosen:

1. **Source documents are immutable** - Never modify extracted content; create parallel docs for changes

2. **State must be explicit** - Whether via folder, suffix, or frontmatter, every document must declare its lifecycle state

3. **Cross-references are mandatory** - Related documents link to each other (source links to current, current links to target)

4. **Command center stays central** - Entry point aggregates state across all artifacts

5. **Progression is traceable** - Should be able to answer "where did this recommendation come from?"

---

## Implementation Considerations

### If Adopting Option 3 (Recommended)

**Phase 1: Create structure, migrate operational docs**
```bash
mkdir -p engagement/artifacts/{_dashboard,_operational,business,catering,weddings,sources,venue}
# Move meta/operational docs first (low risk)
```

**Phase 2: Migrate source extractions**
```bash
# Rename with .source suffix
mv packages-pricing.md weddings/packages.source.md
mv sales-scripts.md weddings/sales-scripts.source.md
mv operational-inventory.md venue/operational-inventory.source.md
```

**Phase 3: Create current-state docs**
```bash
# Extract current operations from mixed docs
# Create weddings/packages.md (current offerings)
# Create weddings/sales-scripts.md (current process)
```

**Phase 4: Update cross-references**
- Add lineage headers to all docs
- Update command-center.md with new structure
- Update CLAUDE.md with new conventions

### Naming Convention Documentation

Add to `CLAUDE.md`:

```markdown
## Artifact Naming Convention

Files use domain folders with stage suffixes:

| Suffix | Stage | Meaning |
|--------|-------|---------|
| `.source.md` | Discovery | Extracted from client materials (immutable) |
| `.md` | Current | Operational truth today |
| `.gap.md` | Analysis | Delta between current and target |
| `.target.md` | Recommendation | Proposed improvements |
| `.delivered.md` | Implementation | Shipped and accepted |

Underscore-prefixed folders (`_dashboard/`, `_operational/`) contain meta/process artifacts.
```

---

## Decision Framework

**Choose Option 1 if:**
- Audit trail is paramount
- Engagement involves formal deliverables with sign-off
- Multiple consultants need to trace work history

**Choose Option 2 if:**
- Minimal disruption is priority
- Structure is likely to evolve further
- Tooling/automation will enforce discipline

**Choose Option 3 if:**
- Long-term engagement with multiple domains
- Need both domain organization AND lifecycle clarity
- Willing to invest in migration for cleaner model

---

## Next Steps

1. **User decision** - Which option (or hybrid) fits the engagement?
2. **Migration plan** - Sequence changes to minimize disruption
3. **Convention documentation** - Update CLAUDE.md with chosen approach
4. **Tool support** - Consider scripts to validate structure/naming

---

*Analysis complete. Awaiting user direction on preferred approach.*
