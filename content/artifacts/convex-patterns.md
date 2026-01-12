# Convex Patterns - Silver Sycamore

Quick reference for common Convex operations. Natural language triggers → actual commands.

## Deployment Info

**Deployment:** `ideal-shark-493`
**Dashboard:** https://dashboard.convex.dev/t/derekyellin/silver-sycamore
**Project Dir:** `/Users/splurfa/projects/silver-sycamore`

## Natural Language → Command Mappings

### Querying Data

| You say | I do |
|---------|------|
| "Get Square login" | `mcp__convex__run` → `logins:getByService` with `{"service": "Square Site"}` |
| "Show all logins" | `mcp__convex__run` → `logins:list` with `{}` |
| "Find admin@ logins" | `mcp__convex__runOneoffQuery` with filter on username field |
| "Get all recipes" | `mcp__convex__data` → table `recipes` |
| "Show wedding packages" | `mcp__convex__data` → table `weddingPackages` |

### Adding/Updating Data

| You say | I do |
|---------|------|
| "Save [service] login" | `mcp__convex__run` → `logins:create` with full object |
| "Update Square password" | `mcp__convex__run` → `logins:update` with id + password field |
| "Add vendor" | `mcp__convex__run` → `vendors:create` |
| "Import logins from [file]" | Parse file → `logins:bulkImport` |

### Schema Changes

| You say | I do |
|---------|------|
| "Add field to [table]" | Edit `convex/schema.ts` → `bunx convex dev --once` |
| "Add password field" | Update schema + corresponding `convex/[table].ts` functions |

### Exploration

| You say | I do |
|---------|------|
| "What tables exist?" | `mcp__convex__tables` |
| "Show table structure" | `mcp__convex__tables` → parse schema |
| "What functions available?" | `mcp__convex__functionSpec` |

## Common Queries

### Get Login by Service
```typescript
mcp__convex__run(
  deploymentSelector: "ownDev:...",
  functionName: "logins:getByService",
  args: '{"service": "Square Site"}'
)
```

### Custom Query (One-off)
```typescript
mcp__convex__runOneoffQuery(
  deploymentSelector: "ownDev:...",
  query: `
    import { query } from "convex:/_system/repl/wrappers.js";
    export default query({
      handler: async (ctx) => {
        const logins = await ctx.db.query("logins").collect();
        return logins.filter(l => l.username.includes("admin@"));
      }
    });
  `
)
```

### Add New Login
```typescript
mcp__convex__run(
  deploymentSelector: "ownDev:...",
  functionName: "logins:create",
  args: '{
    "service": "Service Name",
    "category": "Website/Service",
    "username": "user@example.com",
    "password": "secret123"
  }'
)
```

## Tables Quick Ref

| Table | Records | Key Fields | Common Queries |
|-------|---------|------------|----------------|
| logins | 78 | service, username, password | Get by service, list by category |
| recipes | 278 | title, category, ingredients | List by category, search by title |
| vendors | 49 | company, category, contact | List by category |
| people | 16 | name, role, email | List by role |
| weddingPackages | 8 | name, price | List all |
| eventPackages | 13 | name, price, category | List by category |

## When to Use What

**Use `mcp__convex__run`** when:
- Calling defined functions (logins:create, logins:getByService, etc.)
- Standard CRUD operations
- Functions exist in `convex/[table].ts`

**Use `mcp__convex__runOneoffQuery`** when:
- Complex filtering not covered by existing functions
- Ad-hoc queries
- Testing before creating a proper function

**Use `mcp__convex__data`** when:
- Reading raw table data
- Paginating through large tables
- Exploring table contents

**Use `mcp__convex__tables`** when:
- Need to see schema
- Checking what tables exist
- Understanding table structure

## Schema Update Pattern

1. Edit `convex/schema.ts` - add/modify field
2. Edit `convex/[table].ts` - update mutations/queries
3. Run `bunx convex dev --once` - deploy changes
4. Test with `mcp__convex__run`

## Session Workflow

At session start:
1. Get deployment status: `mcp__convex__status`
2. Capture deploymentSelector for session
3. Use it for all subsequent queries

## Notes

- **Passwords ARE stored** - schema includes password field as of 2026-01-08
- **No authentication on queries** - this is client data, not public
- **Source of truth** - Markdown files in `engagement/inbox/client-sources/` should be imported, not replaced by Convex data
