# Square Catering Menu

## Category
Products & Revenue

## Status
Building

## MOVE

| MAP | OUTCOME | VERIFY | EXCHANGE |
|-----|---------|--------|----------|
| Menu structure, pricing logic, Square integration requirements | Live catering ordering site integrated with Square POS | Orders flow correctly through Square, kitchen receives tickets | New revenue channel operational, catering sales enabled online |

## Sub-Projects

| Task | MAP | OUTCOME | VERIFY | EXCHANGE | Status |
|------|-----|---------|--------|----------|--------|
| Menu Structure | Existing catering menus and packages | Structured menu data in Convex | Data matches client's offerings | Foundation for site | Done |
| Square Integration | Square API requirements | Working checkout flow | Test orders process correctly | Payments work | Pending |
| Site Build | Design requirements | Live catering site | Client can take orders | Revenue channel | In Progress |

## Notes

### Menu Data
- 11 catering menus in Convex (`cateringMenus` table)
- 12 bar packages (`barPackages` table)
- 35 add-ons (`addOns` table)

### Integration Requirements
- Square POS integration for payment processing
- Kitchen ticket generation
- Order confirmation flow

## Related

- Data: Convex client backend (`ideal-shark-493`)
- Analysis: [Catering Strategy](../../analysis/catering-strategy.md)
