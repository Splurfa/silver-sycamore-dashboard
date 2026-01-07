# Phase B: Data Mapping for Excel Architecture
**Generated:** 2026-01-05

---

## Entity Count Summary

| Entity Type | Count |
|-------------|-------|
| People | 9 |
| Venues | 12 |
| Wedding Packages | 9 (14 with day variations) |
| Event Packages | 11 |
| Catering Items | 70+ |
| Bar Packages | 11 |
| Add-Ons | 35+ |
| Systems | 5 |
| Domains | 4 |
| **Total** | **200+** |

---

## Recommended Excel Tabs (14)

### Tier 1: Revenue Critical
1. **WEDDING_PACKAGES** - 9 packages with pricing
2. **EVENT_PACKAGES** - 11 event types
3. **ADD_ONS** - 35+ upsell items
4. **CATERING_TIERS** - 9 pricing tiers
5. **BAR_PACKAGES** - 11 options

### Tier 2: Operational
6. **VENUES** - 12 spaces with capacities
7. **PEOPLE** - 9 team members
8. **SALES_SCRIPTS** - Phone protocols
9. **PRICING_MODIFIERS** - Tax, service charge, fees

### Tier 3: Infrastructure
10. **CATERING_ENTREES** - 40+ individual entrees
11. **VENDORS** - Partners (needs capture)
12. **SYSTEMS** - Tech stack
13. **DOMAINS** - Web properties
14. **CONTRACTS_TERMS** - Policies

---

## Data Quality Issues

### Pricing Conflicts (Need Verification)
1. Food Truck Fun: $100 vs $8,100 (OCR error?)
2. Mechanical Bull: $100 vs $800
3. Harpist: $2/person vs $400 flat

### Missing Data
- Contact info for all people
- Vendor directory (in physical binder)
- System login locations
- Domain registrar info

---

## Source Files Analyzed

| File | Lines | Status |
|------|-------|--------|
| company/business-map.md | 273 | Complete |
| company/people.md | 123 | Complete |
| operations/venues.md | 403 | Complete |
| products/wedding-packages.md | 690 | Complete |
| products/catering-menu.md | 142 | Complete |
| sales/scripts.md | 224 | Complete |
| **Total** | **1,855** | **All analyzed** |

---

## Build Priority

**Phase 1:** WEDDING_PACKAGES, EVENT_PACKAGES, ADD_ONS, CATERING_TIERS, BAR_PACKAGES
**Phase 2:** VENUES, PEOPLE, SALES_SCRIPTS, PRICING_MODIFIERS
**Phase 3:** CATERING_ENTREES, VENDORS, SYSTEMS, DOMAINS, CONTRACTS_TERMS
