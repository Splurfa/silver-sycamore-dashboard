# Artifacts

Working documents for the Silver Sycamore consulting engagement.

## Entry Point

Start with [command-center.md](command-center.md) for current state and navigation.

## Artifacts

| Artifact | Purpose |
|----------|---------|
| command-center.md | Session dashboard, active/blocked items |
| engagement-log.md | Chronological record (append-only) |
| engagement-tracker.md | Decisions, deliverables, wins |
| initiatives.md | What's on the table - client goals, asks, commitments |
| document-index.md | Links to external company docs |
| business-map.md | Business context, systems, money flow |
| people.md | Roles, duties, ownership |
| catering.md | Primary revenue channel |
| weddings.md | Secondary revenue channel |
| other-channels.md | Inactive channels (reference) |

## Rules

- Every artifact has a defined purpose
- Initiatives can graduate to their own artifact if substantial
- Route information per protocol/routing.md

## Dashboard Contract

The live dashboard parses specific sections from artifacts. These section names **must not change** without updating the dashboard code.

| Artifact | Required Sections |
|----------|-------------------|
| command-center.md | `## Phase`, `## Active`, `## Blocked`, `## Next`, `## Current Session` |
| engagement-tracker.md | `## Decisions`, `## Working Hypotheses`, `## Deliverables` |

See `silver-sycamore-dashboard/app.js` for parsing logic.
