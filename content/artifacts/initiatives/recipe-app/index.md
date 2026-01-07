# Pine Street Cafe Recipe App

## Category
Operations & Tools

## Status
Piloting

## MOVE

| MAP | OUTCOME | VERIFY | EXCHANGE |
|-----|---------|--------|----------|
| Kitchen workflow needs, recipe scaling requirements, staff tech comfort | 278 searchable recipes with ingredient scaling | Kitchen staff adoption, recipes accessible during service | Time savings, consistency, reduced training burden |

## Sub-Projects

| Task | MAP | OUTCOME | VERIFY | EXCHANGE | Status |
|------|-----|---------|--------|----------|--------|
| Recipe Data Migration | 140+ source images, handwritten recipes | 278 structured recipes in Convex | Data accuracy verified | Recipes digitized | Done |
| Recipe Search | Kitchen needs quick lookup | Searchable interface | Staff can find recipes fast | Efficiency gain | Done |
| Serving Scaling | Recipes have different base servings | Ingredient auto-scaling | Math is correct | Flexibility | Done |
| Kitchen Adoption | Staff tech comfort varies | Regular usage during service | Observation during shifts | Actual value realized | In Progress |

## Notes

### Current State
- App deployed: https://pine-street-cafe-recipes.vercel.app
- 278 recipes live in Convex (46 in `recipes` table with servings field)
- Search and scaling functional

### Adoption Status
- Piloting with kitchen staff
- Need observation during actual service to verify adoption
- Success = staff using it instead of paper binders

### Data Sources
- Original handwritten recipe cards (photographed)
- Previous digital attempts
- Staff knowledge capture

## Related

- Deliverable: [Pine Street Cafe Recipe App](https://pine-street-cafe-recipes.vercel.app)
- Data: Convex client backend `recipes` table
