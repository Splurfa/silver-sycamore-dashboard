# Engagement Log

*Reverse chronological. Newest first. Prepend new entries.*

---

## Entry 14 — Infrastructure Overhaul (2026-01-05 Session)

**Session:** [2026-01-05-onsite](../../sessions/2026-01-05-onsite/session.md)

**Summary:**
Major infrastructure session focused on organizing the engagement for scale:

1. **Deployed Pine Street Cafe Recipe App** — First deliverable live at https://pine-street-cafe-recipes.vercel.app
2. **Created Excel Cortex** — 13-tab workbook (`silver-sycamore-master.xlsx`) extracting all structured data from discovery files (200+ entities)
3. **Reorganized Repo** — Replaced lazy `baseline/current/target` structure with domain-based `discovery/` folder (company, products, operations, sales subfolders)
4. **Cleaned Up** — Removed duplicate files, ghost session references, unused artifacts
5. **Pushed to GitHub** — All changes synced to main branch

**Key Decisions:**
- Excel as interim structured data layer (migrates to Convex when ready)
- Domain-based organization reflects how business actually operates
- ONE Vercel project, ONE Convex backend (monorepo architecture)

**Artifacts Changed:**
- silver-sycamore-master.xlsx (created)
- discovery/ folder structure (created)
- CLAUDE.md (infrastructure section added)
- command-center.md (updated artifacts section)
- deliverables/ system (created)

---

## Entry 13 — Michael's Bulletin Board (Direct Observation)

**Received:** 2026-01-02

**Source:** Derek's direct observation of Michael's office bulletin board

**Confidence:** 0.85 [++++] (first-party observation of written priorities)

**Summary:**
Michael has a priority action list posted in his office covering four domains:
1. **Team & Work Systems** — Hiring process, job descriptions, training videos, scorecards, quarterly reviews, PIP/TIP, meeting cadence, culture
2. **Marketing & Brand** — Humanize ads, partnerships, referral tracking, reviews in advertising, QR codes, dormant customer reactivation, department videos
3. **Money & Sales** — LTV calculation, upsell training, scarcity messaging, merchandise campaigns
4. **Vendor Partners** — Client folders with "Bonus Cash Cards" from partner vendors

**Strategic Insight:**
This **validates the hypothesis** that "Operations/workflows may require attention first" — Michael's priorities are heavily weighted toward team systems and process infrastructure, not just sales tactics. He's thinking like an operator building scale infrastructure.

**Key culture rule:** *"It's not what you preach, it's what you tolerate."*

**Routed to artifacts:**
- **initiatives.md** — Full priority list added (24 items across 4 categories)
- **people.md** — Michael's Team Vision section added
- **business-map.md** — Sales tactics and vendor partner strategy added
- **engagement-tracker.md** — Working hypothesis validated, new hypothesis added

---

## Entry 12 — Catering Menu Intake (7-Agent Pipeline)

**Received:** 2026-01-02

**Source:** Corporate and Off-Premise Catering Menu Final.docx (via 7-agent intake pipeline)

**Pipeline Result:** ATTENTION REQUIRED → User approved CATERING ONLY

**Documents Processed:**
- Corporate and Off-Premise Catering Menu Final.docx — SALES-COLLATERAL, confidence 0.85 [++++]
- Catering Sign Up Sheet.xlsx — TRACKING-DATA, confidence 0.72 [+++.]
- 2023 Bridal Online Planning Documents_.xlsx — PLANNING-TOOL, confidence 0.68 [+++.]
- Silver Sycamore Venue Layout.xlsx — REFERENCE-CONFIG, confidence 0.78 [+++.]
- Timeline Templates — OPS-TEMPLATE, confidence 0.58 [++..]
- Decor Appointment Form — OPS-TEMPLATE, confidence 0.45 [++..]

**Committed (12 items, 0.85 confidence):**
- **catering.md** — Full pricing structure added:
  - Breakfast Packages (6 options, $50-$120 per 10 people)
  - Lunch Options (4 options, $15.99-$125)
  - Comfort Meal Entrees (4 options, $12.99-$26.99 per person)
  - Drinks & Desserts pricing
  - Delivery & Service Terms (25 mile radius, $75 minimum, 10%/20% service fees)

**Deferred (user decision):**
- Event Staff (8 people) → Future people.md section
- Vendor Network (3 vendors) → Future business-map.md
- Corporate Clients (3 orgs) → Future business-map.md
- Indoor capacity 225 vs Chapel 200+ → Treated as different spaces, no contradiction

**Excluded:**
- Decor Appointment (0.38 confidence) — Below UNCERTAIN threshold

**Unblocked:**
- "Catering menu/pricing documentation" blocker now resolved

---

## Entry 11 — Easy Cater Deprecated, Square Catering Menu Priority

**Received:** 2026-01-02 (same day as Michael touchpoint)

**Source:** Derek

**Summary:**
- Major pivot: Easy Cater is being deprecated immediately
- New priority: Set up catering menu with Square site (similar to existing restaurant menu)
- Approach: Create Square catering menu → User creates site → Marketing director adds button to website linking to Square menu
- This is a direct-to-customer approach rather than marketplace dependency

**Rationale:**
- Square already in use for restaurant (Pine Street Cafe) — proven workflow
- Removes marketplace middleman (Easy Cater)
- Aligns with existing systems being migrated to Square
- Marketing director can integrate before exit

**Blockers:**
- Need Square login credentials
- Need catering menu content (items, pricing, packages)

**Routed to artifacts:**
- **command-center.md** — Phase updated, active initiatives changed
- **catering.md** — Updated workflow from Easy Cater to Square
- **initiatives.md** — Easy Cater moved to abandoned, Square catering menu added

---

## Entry 10 — Michael Touchpoint Processed

**Received:** 2026-01-02 12:41 touchpoint with Uncle Michael

**Source:** Derek (on-site session)

**Summary:**
- First in-person touchpoint with Michael during on-site session
- Gathered operational details, systems, staff roles, initiatives

**Routed to artifacts:**
- **people.md** — Aura (runs events, sales calls), Elaynah (runs events), Krista (wedding coordinator name confirmed), Aubrey (supports weddings)
- **business-map.md** — Current stack (Easy Cater, Square, Calendly, Agile CRM, Constant Contact), domains (4 listed)
- **catering.md** — Easy Cater is primary channel, $200K+ revenue target, sales approach is "outbound, direct, go get it"
- **initiatives.md** — 4 active: Square migration, stabilize Easy Cater, wedding coordinator hiring, marketing automation
- **engagement-tracker.md** — Decision: modular builds over monolithic systems

**Key insight:** Easy Cater is working — stabilize before expanding. Technical work should be discrete modules, not large integrated projects.

---

## Entry 9 — Translation Layer Protocol Established

**Received:** Session discussion

**Source:** Derek

**Summary:**
- Identified need for explicit protocol to convert external inputs into structured engagement artifacts
- Defined translation layer stages: Intake → Inventory → Extract → Map → Transform → Stage → Commit
- Staging step requires explicit surfacing of proposed changes and ambiguity before commit
- Commit only after approval — maintains fidelity and prevents false structure

**Changes made:**
- Command center restructured: Session Scratch now under "Pending" container alongside "Staged Changes"
- Added Project Files Index section to command center — tracks company docs, checked at session start for sync
- Project instructions updated with translation layer protocol

**Implications:**
- System now optimized for bulk document ingestion (preparing for tomorrow's session with Uncle Michael)
- Clear bridge between project files (company docs) and engagement artifacts
- External inputs go through defined translation process rather than direct fire-hose
- Artifacts stay at 10 — no structural change, just protocol upgrade

---

## Entry 8 — Ownership Structure Clarified

**Received:** Session update

**Source:** Derek

**Summary:**
- Peterson CPA (Friendswood) is owned by Uncle Don, John Peterson, and Joe Peterson
- Peterson CPA is the entity that purchased and owns Silver Sycamore
- Commitment level from Petersons is 100%
- Uncle Don, John, Joe, and Uncle Michael act as board of directors
- Naming convention established: use "Uncle Don" and "Uncle Michael" in documentation (informal but preferred)

**Implications:**
- Ownership structure is clearer — Peterson CPA is the actual owner, not just financial oversight
- Board structure now documented
- All artifacts updated to use Uncle Michael/Uncle Don naming convention

---

## Entry 7b — Intelligence vs Directive Separation

**Received:** Session discussion

**Source:** Derek

**Summary:**
- Identified gap: artifacts were conflating strategic assessment with directives/decisions
- "Catering is primary focus" was written as decision, but it's actually a working hypothesis
- Operations and workflows are archaic — may require attention before or alongside revenue work
- Sequencing is not yet decided — pending operational assessment
- Adjusted artifacts to distinguish intelligence (what we've assessed) from directives (what we've decided)

**Changes made:**
- command-center: Phase changed to evaluation mode, next actions include operational assessment
- engagement-tracker: Separated "Decisions" from new "Working Hypotheses" section
- business-map: Changed "Priority" column to "Assessment," softened language
- catering.md: Reframed opening as strategic case, not decided focus

**Implications:**
- Artifacts now properly reflect that we're in evaluation mode
- Hypotheses can evolve without contradicting "decisions"
- Operational assessment is explicitly on the table
- Maintains agnosticism on sequencing until directive is made

---

## Entry 7a — Transition Plans Clarified

**Received:** Session update

**Source:** Derek

**Summary:**
- Wedding coordination: Elaynah and Aura handling interim. Active hiring for dedicated coordinator. Structure allows assistant coordinators to branch out by event type as business grows.
- Marketing director: Function to be replaced by automation system (n8n + generative AI), not redistributed as workload. Derek builds system, hands keys to stakeholder who directs it. Salary redistributed to Elaynah/Aura. Michael aware of general direction but not fully briefed on technical approach.
- Marketing automation added as deliverable — time-sensitive, needs to be ready before marketing director exits.

**Implications:**
- Wedding coordination no longer blocked — plan in motion
- Marketing automation is a technical build Derek owns
- Need to document marketing director's current duties/contracts before exit

---

## Entry 6 — Full Artifact Restructure

**Received:** Session discussion

**Source:** Derek

**Summary:**
- Red-teamed entire artifact set from first principles
- Consolidated 13 artifacts → 10 artifacts
- Merged current-understanding into business-map (single source for business context)
- Consolidated 4 inactive channel docs (restaurant, bnb, corporate-events, special-events) → other-channels.md
- Created system-flow.html as rendered diagram of information routing
- Redesigned command-center as scannable dashboard with Session Scratch container
- Established manual session invocation ("new session" / "start session" to begin, "wrap up" / "close session" to end)
- Defined explicit routing rules: conversation → Claude sorts → artifacts → command center aggregates

**Final artifact set (10):**
1. command-center.md — dashboard, entry point
2. system-flow.html — routing diagram
3. engagement-log.md — chronological history
4. notes-ideas.md — parking lot
5. engagement-tracker.md — decisions/wins
6. business-map.md — business context
7. people.md — roles/duties
8. catering.md — primary channel
9. weddings.md — secondary channel
10. other-channels.md — consolidated inactive

**Implications:**
- Minimal artifact set with maximum coverage
- All artifacts connected via explicit routing
- Session boundaries manually controlled
- System flow diagram chronicles routing logic

---

## Entry 5 — Workflow Framework Established

**Received:** Session discussion

**Source:** Derek

**Summary:**
- Established command center artifact as session entry point
- Clarified artifact roles: engagement log (chronological, frozen) vs. notes-ideas (parking lot, malleable)
- Defined working relationship: Derek talks fluidly, Claude sorts into appropriate artifacts
- Command center gets updated at session close to reflect current state

**Implications:**
- Clear entry point for every session
- Fluid intake without losing information
- Artifacts have distinct, non-overlapping purposes

---

## Entry 4 — People Artifact + Motivation Intel

**Received:** Update from Derek

**Summary:**
- Created dedicated people artifact to track roles, duties, ownership, motivations
- Key insight: Michael, Elaynah, and Aura all view Silver Sycamore as a place they can retire. They want to grow it into something. Commitment and motivation from Elaynah and Aura is very high.
- Spelling note: Elaynah (not Alaina)

**Implications:**
- Core team is invested long-term, not just working a job
- High motivation means they'll engage with process improvements, not resist them
- Building out their roles and ownership is worth the investment

---

## Entry 3 — Wedding Coordinator Exit

**Received:** Update from Derek

**Summary:**
Wedding coordinator (legacy staff) put in her two weeks notice today. She's exiting.

**Implications:**
- Removes the direction/process friction that existed with her
- Opens question: who handles wedding coordination going forward?
- Transition timing confirmed—staff changes are now happening

---

## Entry 2 — Research Run

**Received:** Research on Silver Sycamore public presence, industry structure, catering workflows

**Summary:**
- Confirmed property details, directory listings, review ratings
- Pine Street Cafe strong (4.4/5), B&B weak (3.0/5)
- Found legacy ownership references (Jackie) and staff names (outdated)
- Pricing and package info from directories is unverified, may be outdated
- Extracted industry benchmarks for reference
- Identified legacy friction patterns from reviews (unvalidated for current ownership)

**Key insight:** Research reflects prior ownership. Most specifics need validation with Michael.

---

## Entry 1 — Intake Answers (Q1–Q5)

**Received:** Initial intake

**Source:** Derek

**Summary:**
- Silver Sycamore is a family-owned property in Pasadena, TX, acquired January 2025
- Six-acre western-themed venue ("Sycamoreville") with chapel, restaurant, B&B, event spaces
- Michael (operator) and Don (financial oversight via Peterson CPA) are primary stakeholders
- Core constraint is revenue—all work must tie to making money or protecting it
- Primary focus: catering sales (most reliable near-term path)
- Secondary focus: weddings (high conversion, but needs friction removed first)
- Legacy staff from prior ownership includes wedding coordinator (capable, friction on process) and marketing director (Michael wants to cut)
- Systems: Website → Calendly → Agile CRM → [fragmented] → Payment
- Michael wants to use slow months (Jan/Feb) to get SOPs in order

**Gaps identified:**
- CRM options and criteria
- Marketing director contracts/obligations
- Catering details (menu, pricing, packages, leads)
- Close path details (where deals stall)

---
