---
description: How to add a new section to the Seaside Retreats landing page
---

To add a new section to the landing page, follow these steps:

1. **Update `index.html`**:
   - Create a new `<section>` tag within `<main>`.
   - Add a `container` class for consistent width.
   - Use semantic tags like `<h2>` for headers and `<div class="section-header">` if it needs a subtitle.

2. **Update `style.css`**:
   - Use the design tokens defined in `:root` (e.g., `--spacing-2xl`, `--color-text-secondary`).
   - Follow the naming convention `.section-name` for the main wrapper.
   - Ensure you include hover effects or transitions if the section is interactive.

3. **Verify Responsiveness**:
   - Check the section on mobile, tablet, and desktop.
   - Add necessary media queries in `style.css` under the appropriate breakpoint.

4. **Verify Accessibility**:
   - Ensure images have `alt` tags and color contrast is sufficient.

// turbo
5. **Preview Changes**:
   Run `npm run dev` to see the changes live with hot reloading.
