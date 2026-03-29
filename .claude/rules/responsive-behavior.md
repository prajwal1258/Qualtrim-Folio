---
paths:
  - "index.html"
  - "style.css"
---

# Responsive Behavior Rules

## Breakpoints
- **Mobile (< 768px)**: 
  - Nav collapses to hamburger (or hidden links).
  - Hero buttons stack vertically.
  - Highlights grid becomes 1 column.
  - Value props stack vertically.
- **Tablet (768px - 1024px)**:
  - Highlights grid stays 2-column.
  - Value props stay 3-column.
- **Desktop (> 1024px)**:
  - Full 3-column layouts as per spec.

## Layout Logic
- Use CSS Grid or Flexbox for all structural elements.
- Avoid hard-coded pixel widths; use percentage or `max-width` containers.
