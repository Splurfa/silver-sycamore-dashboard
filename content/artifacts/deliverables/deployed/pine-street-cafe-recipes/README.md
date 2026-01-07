# Pine Street Cafe Recipes

**Status:** DEPLOYED (building → piloting)
**Deployed:** 2026-01-05 (v1), 2026-01-06 (v2)
**Owner:** Kitchen staff

## URLs

- **Production:** https://pine-street-cafe-recipes.vercel.app
- **Repository:** https://github.com/Splurfa/pine-street-cafe-recipes

## Description

Digital recipe book for Pine Street Cafe at Silver Sycamore venue. Single-page web application with 163 recipes across 9 categories, powered by Convex backend.

**Current Features (v2):**
- 163 recipes (117 added in v2)
- 9 categories: all, breakfast, appetizers, soups, salads, main, sides, sauces, desserts
- Search functionality
- Bottom sheet category picker (mobile UI redesign)
- Convex backend integration (dynamic data vs hardcoded)
- Mobile responsive design
- Professional leather/copper/cream color scheme
- Recipe scaling via servings field

## Backlog

*Pending feature requests and improvements:*

| Priority | Feature | Description | Status |
|----------|---------|-------------|--------|
| | | | |

*Add feature requests here. Move to History when completed.*

## Technical Details

**Frontend:**
- React + TypeScript
- Vite build system
- Custom bottom sheet component
- Mobile-first responsive design

**Backend:**
- Convex (ideal-shark-493 - client backend)
- Recipes table: 163 records with servings field
- Real-time queries for dynamic updates

**Deployment:**
- Vercel continuous deployment
- Production URL: https://pine-street-cafe-recipes.vercel.app

## Source

Digitized from physical recipe book using OCR:
- v1 (2026-01-05): 35 pages, 46 recipes
- v2 (2026-01-06): 140 HEIC images, 117 recipes (4 parallel OCR agents)

## History

- 2026-01-06: v2 overhaul — 117 new recipes, Convex backend integration, 9 categories, mobile UI redesign with bottom sheet, bug fix (Convex import capitalization)
- 2026-01-05: v1 created and deployed to Vercel — 46 recipes, 4 categories, hardcoded data
