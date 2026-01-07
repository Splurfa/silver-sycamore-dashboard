# Structure Analysis

## Summary

The repository structure partially aligns with CLAUDE.md governance but has significant issues: duplicate files at the artifacts root level, undocumented folders (archive, deliverables), empty placeholder folders, and naming convention violations in client-sources. The deliverables system is a positive addition but needs governance documentation. Pine Street Cafe Recipe App exists both as a subdirectory AND a separate git repo, creating confusion for future monorepo consolidation.

## Findings

### Compliant

- **Core folder hierarchy** matches CLAUDE.md: `engagement/artifacts/`, `engagement/sessions/`, `engagement/inbox/`
- **Session structure** uses correct `YYYY-MM-DD-location` naming pattern with `session.md` and optional `meetings/` subfolder
- **Inbox two-bucket system** present: `client-sources/` and `inputs/`
- **Client-sources dated subfolders** follow `YYYY-MM-DD` pattern (2026-01-02, 2026-01-05)
- **`_manifest.md`** in sessions folder as specified
- **`.claude/` structure** contains agents, commands, templates as documented
- **Kebab-case** used correctly for new generated markdown files (e.g., `booking-form-wedding.md`, `package-dream.md`)

### Issues Found

- **Duplicate files at artifacts root**: `/engagement/artifacts/business-map.md`, `catering.md`, `intake-assessments.md`, `people.md` exist alongside the same files in subdirectories (`current/`, `baseline/`, `analysis/`). Recommendation: Remove root-level duplicates, keep only staged versions in their proper folders.

- **Undocumented folder `archive/`**: `/engagement/inbox/archive/` exists with `2026-01-05-binder-photos/` but is not mentioned in CLAUDE.md governance. Recommendation: Either add `archive/` to inbox documentation or relocate content.

- **Undocumented folder `deliverables/`**: `/engagement/artifacts/deliverables/` with lifecycle stages (draft/review/approved/deployed) is not documented in CLAUDE.md's Artifact Organization table. Recommendation: Add to governance or merge with `delivered/` concept.

- **Empty folders**: `target/`, `deliverables/draft/`, `deliverables/review/`, `deliverables/approved/`, `inputs/`, `.claude/skills/` are empty. Recommendation: Keep scaffolding folders but consider adding README.md placeholders.

- **Naming convention violations in client-sources**: Original client folders use spaces and mixed case (e.g., `Temps + Docs`, `Bar Info Template`, `Final Appointment`). These are in the NEVER DELETE zone so renaming is risky. Recommendation: Accept as-is for originals; ensure all extracted/converted content uses kebab-case.

- **Duplicate deliverable location**: `pine-street-cafe-recipes/` exists both as `/pine-street-cafe-recipes/` (separate git repo) AND tracked in `/engagement/artifacts/deliverables/deployed/`. Recommendation: This is CORRECT - separate repo is the deployed deliverable, deliverables tracking is the catalog.

- **Command-center documents table references old paths**: References `inbox/1-2-26-intake` which doesn't exist (actual path is `inbox/client-sources/2026-01-02/`). Recommendation: Update document references.

- **Missing `delivered/` folder**: CLAUDE.md lists `delivered/` as a stage folder but it doesn't exist - `deliverables/deployed/` serves this purpose instead. Recommendation: Reconcile governance with actual structure.

### Deployment Strategy Notes

- **Current state:** Pine Street Cafe Recipe App is deployed as a separate Vercel project with its own GitHub repository (https://github.com/Splurfa/pine-street-cafe-recipes). The engagement repo tracks it as a deliverable with README in `artifacts/deliverables/deployed/pine-street-cafe-recipes/`.

- **IMPORTANT - Target architecture:**
  - ONE Vercel project for ALL deliverables (monorepo deployment)
  - ONE Convex backend shared across deliverables that need backend
  - Some deliverables are static (Recipe App), some will need backend
  - Infrastructure setup not yet complete - needs to be pinned

- **Considerations:**
  - Monorepo consolidates management and deployment
  - Shared Convex backend enables data sharing between apps
  - Need to design folder structure that supports both static and dynamic apps
  - Decision: Who maintains after engagement ends?

### Recommendations

1. **HIGH: Set up unified infrastructure** - Create single Vercel project + Convex backend before more deliverables

2. **HIGH: Remove root-level artifact duplicates** - Clean up `artifacts/business-map.md`, `catering.md`, `intake-assessments.md`, `people.md`. These appear to be copies, not the canonical staged versions.

3. **HIGH: Reconcile CLAUDE.md with actual structure** - Add `deliverables/` to governance OR rename to match existing `delivered/` convention. Pick one and document it.

4. **MEDIUM: Add `archive/` to inbox governance** - Document its purpose (processed client sources? historical photos?).

5. **LOW: Fix command-center document references** - Update paths from `inbox/1-2-26-intake` to `inbox/client-sources/2026-01-02/`.

6. **LOW: Add README placeholders to empty folders** - Especially `target/`, `inputs/` to clarify intended use.

---

*Analysis completed: 2026-01-05*
