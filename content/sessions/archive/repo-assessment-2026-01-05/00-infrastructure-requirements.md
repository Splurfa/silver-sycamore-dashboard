# Infrastructure Requirements (PINNED - HIGH PRIORITY)

## Target Architecture

**ONE Vercel project** serving multiple deliverables from a monorepo structure.

**ONE Convex backend** shared across deliverables that need backend functionality.

## Current State

| Component | Status | Location |
|-----------|--------|----------|
| Vercel Project | EXISTS (separate) | pine-street-cafe-recipes |
| Convex Backend | NOT SET UP | - |
| Monorepo Structure | NOT SET UP | - |

## Deliverable Types

| Type | Backend Needed | Example |
|------|----------------|---------|
| Static App | No | Pine Street Cafe Recipe App |
| Dynamic App | Yes (Convex) | TBD - inventory tracker, booking tool |

## Action Items

1. **Create unified Vercel project** for silver-sycamore deliverables
2. **Set up Convex backend** with shared database
3. **Design monorepo folder structure** that supports:
   - Static apps (just HTML/CSS/JS)
   - Dynamic apps (React + Convex)
   - Shared components/styles
4. **Migrate Pine Street Cafe Recipe App** into monorepo structure
5. **Document deployment workflow** for future deliverables

## Questions to Resolve

- [ ] Project naming: `silver-sycamore-apps`? `silver-sycamore-deliverables`?
- [ ] Will client take over hosting after engagement?
- [ ] Convex plan/tier needed?
- [ ] Domain strategy (subdomains vs paths)?

---

*Created: 2026-01-05*
*Priority: HIGH - Block before creating more deliverables*
