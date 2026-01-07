# Repository Assessment Synthesis

**Date:** 2026-01-05
**Status:** Ready for Human Review

---

## Executive Summary

The Silver Sycamore repository has solid foundational structure aligned with CLAUDE.md governance, but has accumulated technical debt during rapid intake work: **4 duplicate files at artifacts root**, a **ghost session entry** in the manifest, and an **undocumented archive folder** with duplicate photos. The pricing/package data is scattered across 3+ markdown files making it difficult to maintain - consolidation to Excel (interim) then Convex (target) is the right path forward. Infrastructure for future deliverables (unified Vercel + Convex) is not yet set up and should be addressed before creating more apps.

---

## Consolidated Issue List

### CRITICAL (Blocks Work)

*None identified - repo is functional*

### HIGH (Fix Before More Work)

| ID | Issue | Source | Impact |
|----|-------|--------|--------|
| H1 | **4 duplicate files at artifacts root** - `business-map.md`, `people.md`, `catering.md`, `intake-assessments.md` exist both at root AND in proper subfolders | Artifacts | Confusion about canonical versions; risk of editing wrong file |
| H2 | **Ghost session in manifest** - `_manifest.md` references `2026-01-03-remote` which does not exist | Sessions | Manifest is unreliable for session tracking |
| H3 | **Undocumented archive bucket** - `inbox/archive/` exists but CLAUDE.md only defines `client-sources/` and `inputs/` | Sessions/Inbox | Governance violation; unclear what to do with archive |
| H4 | **Infrastructure not set up** - No unified Vercel project or Convex backend for future deliverables | Infrastructure | Blocks creating dynamic apps; Recipe App is isolated |

### MEDIUM (Fix When Convenient)

| ID | Issue | Source | Impact |
|----|-------|--------|--------|
| M1 | **Duplicate binder photos** - Same 49 HEIC files in `archive/` AND `client-sources/2026-01-05/` | Sessions/Inbox | Wasted storage; confusion about source of truth |
| M2 | **Pricing data scattered** - `venue-inventory.md`, `packages.md`, `catering.md` have overlapping content | Artifacts | Hard to maintain; Excel consolidation will fix |
| M3 | **command-center references old paths** - Points to `inbox/1-2-26-intake` instead of `inbox/client-sources/2026-01-02/` | Structure | Broken links in dashboard |
| M4 | **CLAUDE.md lists `delivered/` but actual folder is `deliverables/deployed/`** | Structure | Governance doesn't match reality |
| M5 | **3 new root-level files need classification** - `operational-inventory.md`, `packages-pricing.md`, `sales-scripts.md` | Artifacts | Not in proper subfolders |

### LOW (Nice to Have)

| ID | Issue | Source | Impact |
|----|-------|--------|--------|
| L1 | **Session naming convention mismatch** - README says `YYYY-MM-DD_[type]`, actual uses `YYYY-MM-DD-[type]` | Sessions | Documentation inaccurate |
| L2 | **Empty placeholder folders** - `target/`, `deliverables/draft/`, `deliverables/review/`, `deliverables/approved/`, `inputs/`, `.claude/skills/` | Structure | Clutter (but scaffolding is fine) |
| L3 | **analysis/gaps/README.md** is empty placeholder | Artifacts | Minor clutter |
| L4 | **repo-assessment folder location** - Currently in `inbox/` but not in either defined bucket | Sessions/Inbox | Minor governance violation |

---

## Proposed Actions

### Phase 1: Immediate Cleanup (Approve Each)

**Action 1: Delete 4 root-level duplicate artifacts**

| Delete This | Keep This |
|-------------|-----------|
| `engagement/artifacts/business-map.md` | `engagement/artifacts/current/business-map.md` |
| `engagement/artifacts/people.md` | `engagement/artifacts/current/people.md` |
| `engagement/artifacts/catering.md` | `engagement/artifacts/baseline/catering.md` |
| `engagement/artifacts/intake-assessments.md` | `engagement/artifacts/analysis/intake-assessments.md` |

**Verification needed:** Confirm root versions are duplicates (not newer drafts)

**Action 2: Fix manifest ghost entry**

Options:
- A) Remove `2026-01-03-remote` line from `_manifest.md` (session never existed)
- B) Create `2026-01-03-remote/session.md` if there was actually a remote session that day

**Action 3: Resolve archive bucket**

After confirming photos are duplicates:
- Delete `engagement/inbox/archive/` folder entirely
- Archive photos are older copies; client-sources has the canonical versions

**Action 4: Update command-center document references**

- Change `inbox/1-2-26-intake` to `inbox/client-sources/2026-01-02/`

### Phase 2: Classification (Needs Decision)

**Action 5: Classify 3 root-level files**

| File | Options |
|------|---------|
| `operational-inventory.md` | A) Move to `current/` B) Consolidate to Excel C) Delete if redundant |
| `packages-pricing.md` | A) Consolidate to Excel B) Move to `baseline/` |
| `sales-scripts.md` | A) Move to `baseline/weddings/` B) Keep at root for quick access |

### Phase 3: Governance Alignment (Can Batch)

**Action 6: Update CLAUDE.md**

- Add `deliverables/` folder to artifact organization (or rename to `delivered/`)
- Update session naming convention documentation to use hyphen format
- Decide: Add `archive/` as third inbox bucket, or keep two-bucket system?

### Phase 4: Excel Consolidation (Next Major Step)

**Action 7: Create master Excel workbook**

Source files to consolidate:
- `baseline/venue-inventory.md` (400+ lines) - Master pricing data
- `baseline/weddings/packages.md` (690 lines) - REDUNDANT, merge then delete
- `baseline/catering.md` - Catering menu
- `operational/initiatives.md` - Initiative tracking
- `operational/engagement-tracker.md` - Deliverables tracking
- `exchange/value-tracking.md` - Value log

Keep as markdown:
- `command-center.md` (dashboard)
- `business-map.md` (narrative)
- `people.md` (role descriptions)
- `sales-scripts.md` (phone protocols)
- `engagement-log.md` (chronological history)

### Phase 5: Infrastructure Setup (Before New Deliverables)

**Action 8: Set up unified infrastructure**

- Create single Vercel project for all Silver Sycamore deliverables
- Set up Convex backend with shared database
- Design monorepo folder structure
- Migrate Pine Street Cafe Recipe App into monorepo (optional)

---

## Questions for Human

1. **Ghost session `2026-01-03-remote`**: Did a remote session happen on Jan 3rd that we need to document, or is this a manifest error to delete?

2. **Archive folder purpose**: Was `archive/` intentionally created as a processing staging area, or did it just accumulate? Should we formalize it or eliminate it?

3. **Root-level operational files**: The 3 untracked files (`operational-inventory.md`, `packages-pricing.md`, `sales-scripts.md`) - are these works-in-progress that should stay accessible, or should they be filed into subfolders?

4. **Infrastructure timing**: Should we set up Vercel monorepo + Convex before or after Excel consolidation? Excel is interim but may take a week+.

5. **Domain strategy for deliverables**: Subdomains (recipes.silversycamore.com) or paths (silversycamore.com/recipes)?

---

## Safe to Auto-Fix

These items are clearly correct and low-risk. Approve for batch execution:

| Item | Action | Risk |
|------|--------|------|
| Delete `archive/2026-01-05-binder-photos/` | Remove 49 duplicate HEIC files | None - copies exist in client-sources |
| Delete `analysis/gaps/README.md` | Remove empty placeholder | None - folder can stay |
| Update command-center paths | Fix `1-2-26-intake` reference | None - just path correction |
| Update README.md session naming | Change underscore to hyphen documentation | None - matches actual practice |

**Total storage freed by archive deletion:** ~150MB (49 HEIC photos)

---

## Summary Table

| Priority | Count | Effort | Blocker? |
|----------|-------|--------|----------|
| CRITICAL | 0 | - | No |
| HIGH | 4 | 30min | No |
| MEDIUM | 5 | 1hr | No |
| LOW | 4 | 15min | No |

**Recommended sequence:**
1. Answer Questions for Human (decisions needed)
2. Execute Safe to Auto-Fix (batch)
3. Phase 1 actions (manual approval each)
4. Phase 2-3 (batch after decisions)
5. Phase 4: Excel workbook (next work session)
6. Phase 5: Infrastructure (before new deliverables)

---

*Synthesis completed: 2026-01-05*
