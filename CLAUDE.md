# Silver Sycamore Dashboard

Dynamic engagement dashboard for the Silver Sycamore consulting project. Content syncs automatically from the main engagement repository.

## Overview

This is a single-page application (SPA) that displays consulting engagement data in a premium dark-themed interface. The dashboard loads markdown files from the `content/` directory and renders them with live updates.

## Architecture

- **index.html** - SPA shell with fixed sidebar navigation and main content area
- **styles.css** - Premium dark theme design system with custom variables
- **app.js** - Core application logic (routing, markdown rendering, auto-refresh)
- **content/** - Markdown content files synced from main repo

## Local Development

Start a local development server:

```bash
cd /Users/splurfa/projects/silver-sycamore/silver-sycamore-dashboard
python3 -m http.server 8080
```

Then open: http://localhost:8080

## Dashboard Contract

**CRITICAL:** The dashboard parses specific markdown section names from artifacts. These section names **must not change** without updating `app.js`.

| Artifact | Required Sections |
|----------|-------------------|
| command-center.md | `## Phase`, `## Active`, `## Blocked`, `## Next`, `## Current Session` |
| engagement-tracker.md | `## Decisions`, `## Working Hypotheses`, `## Deliverables` |
| sessions/_manifest.md | Table with columns: Session, Date, Type, Status, Notes |

See `engagement/artifacts/README.md` for the canonical contract documentation.

## Content Structure

The dashboard expects these markdown files in `content/`:

### Operational
- `command-center.md` - Main dashboard with phase and status counts
- `engagement-tracker.md` - Task tracking and progress

### Channels
- `catering.md` - Catering revenue channel (Primary)
- `weddings.md` - Wedding revenue channel (Secondary)
- `other-channels.md` - Additional revenue opportunities

### Reference
- `engagement-log.md` - Session notes and decisions
- `business-map.md` - Business structure and operations
- `people.md` - Stakeholder information
- `initiatives.md` - Pending asks, commitments, goals

### Sessions
- `sessions/_manifest.md` - Sessions index (parsed for list view)
- `sessions/YYYY-MM-DD_type/` - Session folders containing:
  - `session.md` - Session overview with status, routing queue, notes index
  - `HHMM-descriptor.md` - Individual meeting notes

## Features

### Hash-Based Routing
Navigate using URL fragments:
- `#command-center` - Command center (default)
- `#catering` - Catering channel
- `#weddings` - Weddings channel
- etc.

### Auto-Refresh
Content polls every 5 seconds for changes. When a file is updated, it automatically refreshes without losing your place in the navigation.

### Status Extraction
The command-center.md file is parsed for status counts:
- **Blocked** - Items under `## Blocked` section
- **Staged** - Items under `## Staged` section
- **Scratch** - Items under `## Scratch` section

Counts appear in the header as badges.

### Phase Indicator
Extracts the current phase from command-center.md looking for:
```markdown
**Phase:** Phase 1: Discovery
```

### Internal Links
Markdown links to other .md files automatically convert to hash navigation:
- `[See Catering](catering.md)` → navigates to `#catering`

### Task Lists
Markdown task lists render with styled checkboxes:
```markdown
- [ ] Unchecked item
- [x] Checked item
```

## Updating Dashboard Code

### Modify Styles
Edit `styles.css` to change colors, layout, or typography. All design tokens are in CSS variables at the top of the file.

### Modify Layout or Features
- **HTML structure** - Edit `index.html`
- **Application logic** - Edit `app.js`

### Add/Remove Artifacts
Update the `ARTIFACTS` array in `app.js`:

```javascript
const ARTIFACTS = [
    {
        id: 'artifact-id',           // URL fragment
        title: 'Display Name',        // Sidebar text
        path: 'content/file.md',      // File path
        group: 'Operational',         // Sidebar group
        icon: '📋',                   // Optional icon
        badge: 'P'                    // Optional badge (P/S)
    },
    // ...
];
```

## Content Syncing

Content files in `content/` should be synced from the main engagement repository:

```bash
# From main silver-sycamore repo
cp engagement/command-center.md ../silver-sycamore-dashboard/content/
cp engagement/channels/catering.md ../silver-sycamore-dashboard/content/
# etc.
```

Consider creating a sync script or git hook to automate this.

## Deployment

This dashboard is connected to Vercel for automatic deployment:

1. Push changes to the repository
2. Vercel auto-deploys within seconds
3. Dashboard is live at your Vercel URL

### Environment Variables
None required - this is a static SPA with no backend.

## Design System

### Colors
- **Sidebar:** `#16161f` (darkest)
- **Main background:** `#1a1a2e` (dark)
- **Panels:** `#2d2d44` (elevated)
- **Primary accent:** `#2a9d8f` (teal)
- **Warning accent:** `#e9c46a` (amber)

### Typography
- **Font:** Inter (loaded from Google Fonts)
- **Base size:** 15px
- **Line height:** 1.6

### Spacing
Uses a consistent spacing scale: xs(4px), sm(8px), md(16px), lg(24px), xl(32px)

## Debugging

Open browser console and access:

```javascript
// View current state
window.dashboardDebug

// Force refresh all content
window.dashboardDebug.forceRefresh()
```

## Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Dependencies

- **marked.js** - Markdown parser (loaded from CDN)
- **Inter font** - Typography (loaded from Google Fonts)

No build process required - pure HTML/CSS/JS.
