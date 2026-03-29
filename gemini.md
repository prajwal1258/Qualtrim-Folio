# Seaside Retreats — Build Instructions

## Overview

A restaurant/hotel landing page called **Seaside Retreats** with a clean, nature-inspired aesthetic. The design uses a minimal white background, serif typography, and an earthy green accent color throughout.

---

## Tech Stack

- **Framework**: HTML5 + CSS3 + Vanilla JavaScript (or React/Next.js)
- **Fonts**: A serif display font (e.g., `Playfair Display` or `Cormorant Garamond`) for headings + a clean sans-serif (e.g., `Lato` or `DM Sans`) for body text
- **Images**: Use real food photography (Unsplash API or static assets). Three hero/feature images required.
- **No external UI libraries** required — custom CSS throughout.

---

## Design Tokens

```css
:root {
  --color-bg: #ffffff;
  --color-text-primary: #1a1a1a;
  --color-text-muted: #666666;
  --color-accent: #4a6741;          /* earthy forest green */
  --color-accent-italic: #6b8f62;   /* lighter green for italic hero text */
  --color-btn-primary-bg: #4a6741;
  --color-btn-primary-text: #ffffff;
  --color-btn-outline-border: #1a1a1a;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Lato', sans-serif;
  --max-width: 1200px;
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
}
```

---

## Page Structure

### 1. Navigation Bar

- **Left**: Brand name "Seaside Retreats" in bold, dark, sans-serif.
- **Center**: Nav links — `Home`, `Menu`, `Reservations`, `Hotels`, `Experiences` — spaced evenly, no decoration.
- **Right**: `Log in` (plain text link) + `Sign up` (filled green button, rounded corners).
- Sticky at top; white background; no shadow or border.

```html
<nav>
  <a class="brand">Seaside Retreats</a>
  <ul class="nav-links">
    <li><a>Home</a></li>
    <li><a>Menu</a></li>
    <li><a>Reservations</a></li>
    <li><a>Hotels</a></li>
    <li><a>Experiences</a></li>
  </ul>
  <div class="nav-actions">
    <a class="login">Log in</a>
    <button class="btn-primary">Sign up</button>
  </div>
</nav>
```

---

### 2. Hero Section

- Centered text layout, generous vertical padding.
- **Headline**: `Taste the Essence of Nature`
  - "Taste the" and "of Nature" in dark serif bold.
  - "Essence" in italic, lighter green (`--color-accent-italic`), same serif font.
- **Subtext**: One to two lines of gray body copy describing the brand ethos.
- **CTA Buttons** (side by side, left-aligned from center):
  - `View Menu` — filled green (`--color-btn-primary-bg`), white text.
  - `Book a Table` — outlined (dark border, transparent background).
  - `Book a Hotel` — outlined (dark border, transparent background).

```html
<section class="hero">
  <h1>Taste the <em>Essence</em> of Nature</h1>
  <p>Experience a culinary journey where modern minimalism meets authentic flavors...</p>
  <div class="hero-actions">
    <button class="btn-primary">View Menu</button>
    <button class="btn-outline">Book a Table</button>
    <button class="btn-outline">Book a Hotel</button>
  </div>
</section>
```

**CSS note for italic title**:
```css
h1 em {
  color: var(--color-accent-italic);
  font-style: italic;
  font-weight: 400;
}
```

---

### 3. Full-Width Feature Image

- A large, edge-to-edge (100vw) food photograph — close-up pasta/pappardelle on a white plate, dark wood background.
- **Overlay caption** in the bottom-left corner: white pill/badge with dark text — `"Handmade Pasta Daily"`.
- No border-radius on the image itself; it bleeds full width.

```html
<div class="feature-image">
  <img src="pasta.jpg" alt="Handmade Pasta Daily" />
  <span class="caption-badge">Handmade Pasta Daily</span>
</div>
```

```css
.feature-image {
  position: relative;
  width: 100%;
  max-height: 500px;
  overflow: hidden;
}
.caption-badge {
  position: absolute;
  bottom: 24px;
  left: 24px;
  background: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-family: var(--font-body);
}
```

---

### 4. Culinary Highlights Section

- Section title: `Culinary Highlights` (serif, centered, large).
- Subtitle: `A selection of our guests' favorites.` (small, muted, centered).
- **3-column card grid** below, equal-width columns, no card shadow or border:
  - Each card has: square/landscape image on top, bold title below, short description in muted text.
  - Cards: **Wood-Fired Pizza**, **The Classic Burger**, **Sweet Finale**.

```html
<section class="highlights">
  <h2>Culinary Highlights</h2>
  <p class="subtitle">A selection of our guests' favorites.</p>
  <div class="card-grid">
    <div class="card">
      <img src="pizza.jpg" alt="Wood-Fired Pizza" />
      <h3>Wood-Fired Pizza</h3>
      <p>Authentic napoletana dough with fresh basil and mozzarella.</p>
    </div>
    <div class="card">
      <img src="burger.jpg" alt="The Classic Burger" />
      <h3>The Classic Burger</h3>
      <p>Premium wagyu beef, caramelized onions, and house sauce.</p>
    </div>
    <div class="card">
      <img src="dessert.jpg" alt="Sweet Finale" />
      <h3>Sweet Finale</h3>
      <p>Decadent chocolate mousse with seasonal berries.</p>
    </div>
  </div>
</section>
```

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.card img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
}
```

---

### 5. Features / Value Props Row

- **3-column text-only row** (no icons, no cards) with generous whitespace above and below.
- Each column: bold title + one line of muted body text, centered.
- Columns: **Organic Ingredients**, **Curated Wines**, **Serene Ambience**.

```html
<section class="features">
  <div class="feature">
    <h4>Organic Ingredients</h4>
    <p>Sourced locally from farmers we know and trust.</p>
  </div>
  <div class="feature">
    <h4>Curated Wines</h4>
    <p>A selection of fine wines to complement every dish.</p>
  </div>
  <div class="feature">
    <h4>Serene Ambience</h4>
    <p>Designed for conversation and relaxation.</p>
  </div>
</section>
```

```css
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  text-align: center;
  padding: 80px var(--max-width);
}
```

---

### 6. Footer

- Minimal one-line centered footer.
- Text: `© 2026 Seaside Retreats. All rights reserved.`
- Muted small text, no links, no background color change.

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| `< 768px` | Nav collapses to hamburger menu; hero buttons stack vertically; card grid becomes single column; features stack vertically |
| `768px – 1024px` | Card grid stays 2-column; features stay 3-column |
| `> 1024px` | Full layout as described above |

---

## Button Styles

```css
.btn-primary {
  background-color: var(--color-btn-primary-bg);
  color: var(--color-btn-primary-text);
  border: none;
  padding: 12px 24px;
  border-radius: var(--border-radius-sm);
  font-family: var(--font-body);
  font-size: 15px;
  cursor: pointer;
}

.btn-outline {
  background: transparent;
  color: var(--color-text-primary);
  border: 1.5px solid var(--color-text-primary);
  padding: 12px 24px;
  border-radius: var(--border-radius-sm);
  font-family: var(--font-body);
  font-size: 15px;
  cursor: pointer;
}

.btn-primary:hover { filter: brightness(1.1); }
.btn-outline:hover { background: #f5f5f5; }
```

---

## Typography Scale

```css
h1 { font-size: clamp(2.5rem, 5vw, 3.5rem); font-family: var(--font-display); font-weight: 700; }
h2 { font-size: clamp(2rem, 4vw, 2.8rem); font-family: var(--font-display); font-weight: 700; }
h3 { font-size: 1.2rem; font-family: var(--font-body); font-weight: 700; }
h4 { font-size: 1rem; font-family: var(--font-body); font-weight: 700; }
p  { font-size: 1rem; font-family: var(--font-body); color: var(--color-text-muted); line-height: 1.7; }
```

---

## Assets Required

| Asset | Description |
|---|---|
| `pasta.jpg` | Close-up pappardelle pasta on white plate, dark wood table background |
| `pizza.jpg` | Wood-fired pizza with egg and olives, top-down view |
| `burger.jpg` | Stacked classic burger with sesame bun, side view |
| `dessert.jpg` | Strawberry parfait/mousse in glass jars, marble surface |

All images should be sourced from [Unsplash](https://unsplash.com) or similar, optimized to WebP, and served at appropriate sizes for performance.

---

## Checklist

- [ ] Navigation with brand, links, and auth buttons
- [ ] Hero section with styled headline + 3 CTA buttons
- [ ] Full-width feature image with overlay caption badge
- [ ] Culinary Highlights 3-column card grid
- [ ] Value props text row (3 columns)
- [ ] Footer
- [ ] Responsive layout for mobile
- [ ] Google Fonts loaded (`Playfair Display`, `Lato`)
- [ ] CSS custom properties defined in `:root`
- [ ] All images optimized and with alt text