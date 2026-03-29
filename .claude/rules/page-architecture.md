---
paths:
  - "index.html"
  - "**/*.html"
---

# Page Architecture Rules

## Structural Requirements
- **Navigation**: Sticky, minimalist, no shadows or borders. Includes brand, center nav links, and right auth actions.
- **Hero Section**: Centered text layout. "Essence" must be italicized and colored with `--color-accent-italic`.
- **Feature Image**: 100vw width, with a bottom-left overlay badge `"Handmade Pasta Daily"`.
- **Culinary Highlights**: 3-column grid of cards containing an image, title, and short description.
- **Value Props**: 3-column text-only row centered with generous whitespace.
- **Footer**: Single line, copyright only, minimalist muted text.

## HTML Best Practices
- Use `<nav>`, `<section>`, `<article>`, and `<footer>` tags.
- Each section should have a clear `class` or `id` for styling.
- Ensure `alt` tags are present for all imagery.
