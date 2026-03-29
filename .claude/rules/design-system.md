---
paths:
  - "style.css"
  - "**/*.css"
---

# Design System Rules

## Design Tokens
```css
:root {
  --color-bg: #ffffff;
  --color-text-primary: #1a1a1a;
  --color-text-muted: #666666;
  --color-accent: #4a6741;          /* earthy forest green */
  --color-accent-italic: #6b8f62;   /* lighter green for italic hero text */
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --max-width: 1200px;
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
}
```

## Typography Scale
- `h1`: `clamp(2.5rem, 5vw, 3.5rem)`, weight 700.
- `h2`: `clamp(2rem, 4vw, 2.8rem)`, weight 700.
- `h3`: `1.2rem`, weight 700.
- `p`: `1rem`, line-height 1.7.

## Button Components
- **Primary**: Background `--color-accent`, white text, 12px 24px padding.
- **Outline**: Transparent background, 1.5px border of `--color-text-primary`.
- **Interactions**: Use `filter: brightness(1.1)` for hover on primary; `#f5f5f5` background for hover on outline.
