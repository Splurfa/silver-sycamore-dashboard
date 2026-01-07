# Artifacts Analysis

## Summary

The artifacts directory has significant structural drift from the hierarchy defined in command-center.md. There are 5 files at the root level that should be in subfolders, multiple instances of near-identical duplicate content (business-map, people, catering, intake-assessments exist both at root AND in proper subfolders), and pricing data is scattered across 3+ locations. The folder structure partially matches the defined hierarchy but has accumulated legacy files during migrations.

## Current State

### Actual Folder Structure

```
artifacts/
├── command-center.md                    # Correct location
├── business-map.md                      # DUPLICATE - should be in current/ only
├── catering.md                          # DUPLICATE - should be in baseline/ only
├── intake-assessments.md                # DUPLICATE - should be in analysis/ only
├── people.md                            # DUPLICATE - should be in current/ only
├── operational-inventory.md             # Root-level file
├── packages-pricing.md                  # Root-level file
├── sales-scripts.md                     # Root-level file
├── analysis/
│   ├── gaps/README.md                   # Empty placeholder
│   ├── intake-assessments.md            # Correct location
│   └── source-comparison.md             # Analysis artifact
├── baseline/
│   ├── catering.md                      # Correct location
│   ├── venue-inventory.md               # Comprehensive pricing/packages
│   └── weddings/
│       ├── packages.md                  # REDUNDANT - duplicates venue-inventory
│       └── sales-scripts.md             # Unique content - phone scripts
├── current/
│   ├── business-map.md                  # Correct location
│   └── people.md                        # Correct location
├── deliverables/
│   ├── README.md
│   ├── approved/                        # Empty
│   ├── deployed/pine-street-cafe-recipes/README.md
│   ├── draft/                           # Empty
│   └── review/                          # Empty
├── exchange/
│   └── value-tracking.md
├── operational/
│   ├── engagement-log.md
│   ├── engagement-tracker.md
│   └── initiatives.md
├── sources/
│   ├── catalog-2026-01-02.md
│   └── catalog-2026-01-05.md
└── target/                              # Empty
```

## Findings

### Redundancy Issues

1. **business-map.md** - Exists at root AND in current/ (keep current/)
2. **people.md** - Exists at root AND in current/ (keep current/)
3. **catering.md** - Exists at root AND in baseline/ (keep baseline/)
4. **intake-assessments.md** - Exists at root AND in analysis/ (keep analysis/)
5. **Pricing data scattered across 3+ locations:**
   - `baseline/venue-inventory.md` - 400+ lines
   - `baseline/weddings/packages.md` - 690 lines (duplicates venue-inventory)
   - `baseline/catering.md` - Duplicates catering pricing

### Root-Level Files to Classify

| File | Decision |
|------|----------|
| operational-inventory.md | Move to current/ or consolidate to Excel |
| packages-pricing.md | Consolidate to Excel |
| sales-scripts.md | Move to baseline/weddings/ or keep for quick reference |

### Consolidation Candidates for Excel Tracker

| File | Data Type | Excel Sheet |
|------|-----------|-------------|
| baseline/venue-inventory.md | All pricing, packages | Master Pricing |
| baseline/weddings/packages.md | Wedding packages (REDUNDANT) | Merge into Master |
| baseline/catering.md | Catering menu | Catering Menu |
| operational/initiatives.md | Initiative tracking | Initiatives |
| operational/engagement-tracker.md | Deliverables tracking | Engagement |
| exchange/value-tracking.md | Value delivered | Value Log |
| sources/catalog-*.md | Document inventory | Sources |

**Note:** Excel is an INTERIM solution - will migrate to Convex backend when infrastructure is ready.

### Files to Keep as Markdown

| File | Reason |
|------|--------|
| command-center.md | Dashboard/navigation |
| business-map.md | Narrative strategy |
| people.md | Role descriptions |
| sales-scripts.md | Phone protocols |
| engagement-log.md | Chronological history |
| source-comparison.md | Gap analysis narrative |

### Recommendations

**Priority 1: Remove Duplicate Root Files**
1. Delete root-level: business-map.md, people.md, catering.md, intake-assessments.md
2. Keep versions in proper subfolders (current/, baseline/, analysis/)

**Priority 2: Consolidate Pricing to Excel**
1. Create master Excel from venue-inventory.md
2. Delete baseline/weddings/packages.md (redundant)
3. Reference Excel from markdown files

**Priority 3: Classify Root-Level Files**
1. operational-inventory.md → current/ or Excel
2. packages-pricing.md → Excel
3. sales-scripts.md → baseline/weddings/ or delete if duplicate

**Priority 4: Clean Up**
1. Remove empty target/ or add content
2. Remove analysis/gaps/ empty placeholder

---

*Analysis completed: 2026-01-05*
