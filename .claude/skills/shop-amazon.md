---
name: Shop Amazon
description: Search, compare, and identify restaurant supplies and kitchenware on Amazon.
---

# Skill: Shop Amazon

This skill enables the agent to navigate Amazon to find high-quality products, supplies, and decor items relevant to the project (e.g., restaurant kitchenware, interior design elements for Seaside Retreats).

## Core Instructions

1. **Search & Identification**:
   - Use the `browser_subagent` to search for specific product categories (e.g., "professional copper cookware", "minimalist restaurant seating").
   - Prefer products with high ratings (4+ stars) and substantial review counts.

2. **Analysis Criteria**:
   - **Quality**: Look for "Amazon's Choice" or "Best Seller" badges.
   - **Aesthetics**: For Seaside Retreats, prioritize items that match the "Essence of Nature" design—earthy tones, natural materials (wood, stone, copper), and minimalist forms.
   - **Price Comparison**: Check multiple listings to find the best value for professional-grade items.

3. **Data Extraction**:
   - Extract product titles, current prices, ratings, and key features.
   - Note the availability and estimated delivery times.

4. **Reporting**:
   - Present a curated list of top 3-5 recommendations.
   - Include direct links and a brief "Why this fits" justification based on the project's design system.

## Safety & Best Practices
- **Do NOT** proceed to checkout or make any purchases.
- **Do NOT** share user personal data or account information.
- Use the `read_browser_page` tool to verify product details before recommending.

---
*Reference current design tokens in `design-system.md` to ensure color/style alignment.*
