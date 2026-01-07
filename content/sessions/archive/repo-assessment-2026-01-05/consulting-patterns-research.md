# Consulting Engagement Data Architecture Framework

*Research compiled: 2026-01-05*

A comprehensive framework for structuring consulting engagement tracking systems, synthesized from industry best practices and consulting methodologies.

---

## 1. Universal Entity Types

Every consulting engagement, regardless of domain, involves these core entities:

### Primary Entities

| Entity | Description | Examples |
|--------|-------------|----------|
| **Contacts/Stakeholders** | People involved in or affected by the engagement | Client sponsor, project lead, SMEs, end users |
| **Organizations** | Companies, departments, or groups | Client company, internal teams, vendors |
| **Deliverables** | Tangible outputs produced | Reports, SOPs, presentations, training materials |
| **Milestones** | Significant checkpoints marking progress | Phase completion, client sign-off, go-live |
| **Tasks/Activities** | Individual work items to complete | Interviews, analysis, document drafting |
| **Findings/Observations** | Discovered facts, issues, or insights | Pain points, gaps, opportunities |
| **Recommendations** | Proposed actions based on analysis | Strategic changes, process improvements |
| **Decisions** | Choices made during engagement | Scope changes, priority shifts |
| **Risks/Issues** | Problems (actual or potential) requiring attention | Blockers, dependencies, concerns |
| **Communications** | Interactions and touchpoints | Meetings, emails, calls, presentations |

### Secondary/Supporting Entities

| Entity | Description | Purpose |
|--------|-------------|---------|
| **Documents** | Reference materials and artifacts | Evidence, context, history |
| **Resources** | Assets allocated to the engagement | Budget, time, tools, people |
| **Dependencies** | Relationships between items | Sequencing, blocking relationships |
| **Change Requests** | Formal scope modifications | Scope management |
| **Invoices/Billing** | Financial transactions | Value exchange tracking |

---

## 2. Standard Relationship Patterns

### Core Relationships (Star Schema Approach)

```
                    ┌─────────────┐
                    │ ENGAGEMENT  │
                    │  (Center)   │
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────┴──────┐ ┌──────┴──────┐ ┌──────┴──────┐
    │   PEOPLE    │ │    WORK     │ │   VALUE     │
    │ Stakeholders│ │ Deliverables│ │  Exchange   │
    │  Contacts   │ │   Tasks     │ │  Outcomes   │
    └─────────────┘ └─────────────┘ └─────────────┘
```

### Key Relationship Types

**One-to-Many (1:N)**
- Engagement -> Phases
- Phase -> Deliverables
- Deliverable -> Tasks
- Stakeholder -> Communications
- Finding -> Recommendations

**Many-to-Many (M:N)**
- Tasks <-> Stakeholders (assignments, RACI)
- Findings <-> Recommendations (evidence chain)
- Deliverables <-> Documents (supporting materials)
- Risks <-> Tasks (mitigation actions)

### RACI Matrix Integration

Every work item benefits from clear ownership:
- **R**esponsible: Who does the work
- **A**ccountable: Who approves/owns outcome
- **C**onsulted: Who provides input
- **I**nformed: Who needs to know

---

## 3. Status/Lifecycle Stages

### Engagement-Level Lifecycle

Based on proven consulting frameworks:

| Stage | Focus | Key Activities | Typical Deliverables |
|-------|-------|----------------|---------------------|
| **1. Discovery** | Understanding "what is" | Interviews, observation, document review | Current state assessment, stakeholder map |
| **2. Analysis** | Finding root causes | Data synthesis, pattern identification | Gap analysis, opportunity matrix |
| **3. Recommendations** | Defining "what should be" | Solution design, prioritization | Strategic roadmap, recommendations deck |
| **4. Implementation** | Making it happen | Execution, training, change management | SOPs, training materials, systems |
| **5. Optimization** | Sustaining improvement | Monitoring, coaching, refinement | KPI dashboards, retainer support |

### Item-Level Status Workflow

**Universal Status States:**

```
[ Not Started ] -> [ In Progress ] -> [ In Review ] -> [ Complete ]
                         |                  |
                         v                  v
                   [ Blocked ]         [ Needs Input ]
```

**Detailed Status Options:**

| Status | Meaning | Action Required |
|--------|---------|-----------------|
| `draft` | Work begun, not ready for review | Continue work |
| `in-progress` | Actively being worked | Monitor progress |
| `blocked` | Cannot proceed | Remove blocker |
| `needs-input` | Awaiting information | Follow up |
| `in-review` | Pending approval | Review and feedback |
| `approved` | Accepted by stakeholder | Ready to deliver |
| `delivered` | Sent to client | Await confirmation |
| `complete` | Fully done and accepted | Archive |
| `deferred` | Postponed intentionally | Revisit later |
| `cancelled` | Will not be done | Document reason |

---

## 4. Handling "Anything Could Come Up" Flexibility

### The Capture-Process-Route Pattern

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    INBOX     │ --> │   CLASSIFY   │ --> │    ROUTE     │
│  (Capture)   │     │  (Triage)    │     │  (Assign)    │
└──────────────┘     └──────────────┘     └──────────────┘
```

**Inbox Approach Benefits:**
- Nothing falls through cracks
- Reduces cognitive load
- Forces explicit routing decisions
- Creates audit trail

### Entity Type Selection Logic

When something new comes up, classify by asking:

1. **Is it about a person?** -> Contact/Stakeholder
2. **Is it something to produce?** -> Deliverable
3. **Is it something to do?** -> Task/Action Item
4. **Is it something learned?** -> Finding/Observation
5. **Is it a suggestion for action?** -> Recommendation
6. **Is it a problem or concern?** -> Issue/Risk
7. **Is it a question needing answer?** -> Open Question
8. **Is it a choice that was made?** -> Decision

### Flexible Schema Design

Use an "extension" or "notes" pattern:

| Core Fields (Structured) | Flex Fields (Semi-structured) |
|-------------------------|------------------------------|
| ID, Type, Status, Owner | Tags, Notes, Custom Fields |
| Created, Modified dates | Linked Items, Attachments |
| Priority, Due Date | Context, Source |

---

## 5. Progressive Disclosure (Summary -> Detail)

### Three-Level Information Architecture

**Level 1: Dashboard/Executive View**
- Key metrics and KPIs
- Phase/milestone status
- Critical blockers
- Next actions
- Health indicators (RAG status)

**Level 2: Working View**
- Active items by status
- Upcoming deadlines
- Recent changes
- Grouped by category/phase

**Level 3: Detail View**
- Full item history
- All linked entities
- Complete documentation
- Audit trail

### Excel Implementation Pattern

**Summary Sheet (Dashboard)**
```
┌─────────────────────────────────────────────────────┐
│ ENGAGEMENT HEALTH                                   │
├──────────────┬──────────────┬──────────────────────┤
│ Phase: [X]   │ Health: [G]  │ Days Remaining: [N]  │
├──────────────┴──────────────┴──────────────────────┤
│ KEY METRICS                                         │
│ Deliverables: 12/20 complete (60%)                 │
│ Open Issues: 3 (1 critical)                        │
│ Pending Decisions: 5                               │
├────────────────────────────────────────────────────┤
│ NEXT 7 DAYS                                        │
│ - [Due Date] [Item] [Owner]                        │
└────────────────────────────────────────────────────┘
```

**Detail Sheets (One per Entity Type)**
- Contacts
- Deliverables
- Findings
- Recommendations
- Issues/Risks
- Decisions
- Communications Log

**Linking Strategy:**
- Use consistent ID schemes (D-001, F-001, R-001)
- Hyperlink between sheets
- Pivot tables for aggregation
- Named ranges for formula references

---

## 6. Value/Exchange Tracking

### The Value Equation

Consulting value = (Outcomes Achieved) / (Investment Made)

**Track Both Sides:**

| Investment (Client) | Value Delivered (Consultant) |
|--------------------|------------------------------|
| Fees paid | Revenue improvements |
| Time invested | Cost reductions |
| Resources allocated | Capability built |
| Change adoption effort | Risk reduced |
| Opportunity cost | Time saved |

### Value Documentation Pattern

For each major deliverable or phase:

```
┌─────────────────────────────────────────────────────┐
│ VALUE EXCHANGE RECORD                               │
├─────────────────────────────────────────────────────┤
│ What was delivered: [Description]                   │
│ Estimated value: [$ or qualitative]                 │
│ Investment required: [Hours, $, effort]             │
│ Value realized: [Actual outcomes when known]        │
│ Client feedback: [Satisfaction notes]               │
└─────────────────────────────────────────────────────┘
```

### ROI Tracking Cadence

Per research from West Monroe and ConsultingQuest:

| Checkpoint | Focus |
|------------|-------|
| At engagement start | Baseline metrics, expected value |
| Mid-engagement | Progress toward value, adjustments |
| At completion | Immediate outcomes, client satisfaction |
| 3-6 months post | Sustained value, actual ROI |

---

## 7. Recommended Data Structure for Excel "Cortex"

### Sheet Architecture

| Sheet | Purpose | Key Columns |
|-------|---------|-------------|
| **Dashboard** | Summary view | Aggregated metrics, status, actions |
| **Phases** | Engagement structure | Phase, Start, End, Status, Progress |
| **Contacts** | People database | Name, Org, Role, Influence, Contact Info |
| **Deliverables** | Output tracking | ID, Name, Phase, Owner, Status, Due, Delivered |
| **Tasks** | Work breakdown | ID, Task, Deliverable, Owner, Status, Due |
| **Findings** | Discovery insights | ID, Category, Description, Source, Priority |
| **Recommendations** | Action proposals | ID, Finding(s), Recommendation, Status, Impact |
| **Issues** | Problem tracking | ID, Issue, Severity, Owner, Status, Resolution |
| **Decisions** | Choice log | ID, Decision, Made By, Date, Rationale |
| **Comms** | Interaction log | Date, Type, Participants, Summary, Follow-ups |
| **Value** | ROI tracking | Category, Metric, Baseline, Target, Actual |
| **Inbox** | Capture queue | Date, Raw Input, Type, Routed To, Status |

### ID Scheme Convention

| Entity | Prefix | Example |
|--------|--------|---------|
| Phase | PH- | PH-01, PH-02 |
| Deliverable | D- | D-001, D-002 |
| Task | T- | T-001, T-002 |
| Finding | F- | F-001, F-002 |
| Recommendation | R- | R-001, R-002 |
| Issue | I- | I-001, I-002 |
| Decision | DEC- | DEC-001 |
| Contact | C- | C-001, C-002 |

---

## 8. Best Practices Summary

### From Research Sources:

1. **Define scope explicitly** - Include what's OUT of scope to prevent scope creep (Source: [ProjectManager](https://www.projectmanager.com/blog/5-ways-to-avoid-scope-creep))

2. **Use Work Breakdown Structure** - Deliverable-based WBS ensures 100% coverage (Source: [Atlassian](https://www.atlassian.com/work-management/project-management/work-breakdown-structure))

3. **Track stakeholder engagement** - Build stakeholder map at project start, update throughout (Source: [Richard Millington](https://www.richardmillington.com/p/stakeholderengagement))

4. **Implement change control** - Formal process for any scope modifications (Source: [MIGSO-PCUBED](https://www.migso-pcubed.com/blog/project-management-delivery/scope-creep/))

5. **Document decisions** - Record rationale, not just outcomes (Source: [CPA Journal](https://www.cpajournal.com/2017/07/18/distinguishing-agreed-upon-procedures-consulting-engagements-reports/))

6. **Link findings to recommendations** - Evidence chain creates credibility (Source: [Financial Crime Academy](https://financialcrimeacademy.org/reporting-recommendations-and-findings/))

7. **Schedule ROI checkpoints** - 3, 6, 12 months post-engagement (Source: [ConsultingQuest](https://consultingquest.com/insights/consulting-roi-guide/))

8. **Maintain single source of truth** - Centralized data prevents divergence (Source: [Consultation Manager](https://www.consultationmanager.com/))

---

## Sources

- [Consulting Success - Consulting Process](https://www.consultingsuccess.com/consulting-process)
- [9Lenses - 7 Key Stages of a Consulting Project](https://9lenses.com/7-key-stages-of-a-consulting-project-3/)
- [TCGen - Consulting Deliverables](https://www.tcgen.com/product-management/consulting-deliverables/)
- [ConsultingQuest - Scoping Framework](https://consultingquest.com/insights/scoping-consulting-projects-framework/)
- [ConsultingQuest - Consulting ROI Guide](https://consultingquest.com/insights/consulting-roi-guide/)
- [West Monroe - Consulting ROI](https://www.westmonroe.com/insights/consulting-roi)
- [ProjectManager - Work Breakdown Structure](https://www.projectmanager.com/guides/work-breakdown-structure)
- [Atlassian - Work Breakdown Structure](https://www.atlassian.com/work-management/project-management/work-breakdown-structure)
- [IIA - Audit Report Writing Toolkit](https://www.theiia.org/globalassets/site/auditing-report-writing-toolkit.pdf)
- [Financial Crime Academy - Reporting Recommendations](https://financialcrimeacademy.org/reporting-recommendations-and-findings/)
- [Richard Millington - Stakeholder Engagement](https://www.richardmillington.com/p/stakeholderengagement)
- [Simply Stakeholders - Monitor Engagement](https://simplystakeholders.com/monitor-stakeholder-engagement/)
- [ProjectManager - Scope Creep](https://www.projectmanager.com/blog/5-ways-to-avoid-scope-creep)
- [Consource - Measuring Consultant Performance](https://consource.io/how-to-measure-consultant-performance/)
