# Deliverables

Lifecycle tracking for consulting deliverables.

## Stages

| Stage | Entry Criteria | Exit Criteria | Who Acts |
|-------|---------------|---------------|----------|
| **draft/** | Work has begun | Internal review complete | Consultant |
| **review/** | Ready for client eyes | Client provides feedback | Client |
| **approved/** | Client approves | Deployment initiated | Both |
| **deployed/** | Live in production | Ongoing operation | Client |

## Folder Structure

```
deliverables/
├── draft/           # Work in progress
├── review/          # Ready for client review
├── approved/        # Client signed off
└── deployed/        # In production use
```

## Each Deliverable Contains

```
[deliverable-name]/
├── README.md        # Status, dates, owner, description
└── assets/          # Files, code, documents (or links)
```

## Current Inventory

### Deployed
- **pine-street-cafe-recipes** - Digital recipe book for kitchen staff
