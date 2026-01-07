# Sessions

Collaborative workspaces for each consulting session.

## Structure

Each session gets a dated subfolder containing:

```
YYYY-MM-DD-[type]/
├── README.md           # Session context and contents
├── session.md          # Session log (inputs, outputs, routing)
└── meetings/           # Client and personnel interactions
    └── HHMM-descriptor.md
```

Additional subfolders as needed:
- `agent-outputs/` - Generated content from agents
- `work-products/` - Deliverables and documents

## Lifecycle

1. **Start session** - Create dated folder, initialize session.md
2. **During session** - All work goes here (notes, agent outputs, generated content)
3. **Close session** - Route finalized items to proper engagement artifacts
4. **After synthesis** - Session folder becomes archive/reference

## Naming

### Folders
`YYYY-MM-DD-[type]/` where type is: onsite, remote, review, synthesis

Multiple sessions same day: `YYYY-MM-DD-[type]-2/`

### Meeting Files
`meetings/HHMM-[descriptor].md`

- **HHMM** — 24-hour timestamp when meeting occurred
- **descriptor** — short kebab-case label (e.g., touchpoint-michael, walkthrough-aubrey, debrief)

Examples:
- `meetings/0930-touchpoint-michael.md`
- `meetings/1415-walkthrough-aubrey.md`
- `meetings/1600-debrief.md`
