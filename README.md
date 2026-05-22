# Saint Sword Sourcing Platform

A premium, highly responsive, and high-performance static sourcing platform built for **Saint Sword Pvt. Ltd.** It specializes in global industrial sourcing, strategic trade execution, and market entry/access representation in the Indian economy.

---

## 📂 Project Structure

The project has been refactored and organized to follow clean, modern web development standards.

```
├── 404.html                # Custom error redirection page
├── index.html              # Core landing page (Hero, Services, Accordions, Contact)
├── assets/
│   ├── fonts/
│   │   └── Azonix.otf      # Archive custom display font
│   └── images/
│       ├── *.jpg / *.png   # High-resolution image assets
│       ├── *.webp          # Next-gen optimized WebP images (loaded via <picture> tags)
│       └── originals/      # Original raw design source assets
├── css/
│   └── style.css           # Central design system, custom properties, and styling overrides
├── js/
│   └── script.js           # Interactive route-handling, scroll animations, and accordion logic
└── scripts/                # Development utility & theme migration tools
    ├── fix_bright_theme.py
    ├── fix_visibility.py
    ├── make_bright.py
    ├── replace_colors.py
    └── update_fonts.py
```

---

## 🎨 Theme & Typography

- **Colors:** Transitioned to a customized **Bright Theme** utilizing a clean, light Sage/Teal palette with a high-contrast dark green (`#121A17`) header and mobile menu to retain professional brand weight.
- **Typography:** Uses standard legible typography:
  - **Body text:** `'Helvetica Neue'`, Helvetica, Arial, sans-serif
  - **Headings & Display:** `'Instrument Serif'`, Georgia, serif (elegant, editorial serifs for high-end feeling)

---

## 🚀 Performance Optimizations

1. **Next-Gen WebP Images:** The platform serves optimized `.webp` assets with `<picture>` tags, falling back to standard `.jpg`/`.png` for older browsers, reducing image sizes by **~50%** and drastically improving page loading speed.
2. **Smooth Layout Reflows:** Category accordion animations utilize high-performance `max-height` transitions instead of layout-thrashing grid transformations.
3. **GPU Hardware Acceleration:** Complex animations and visual transitions utilize `will-change` properties to avoid rendering delays on mobile.
4. **Form Integration:** Dynamic client-side verification on the contact form (via Formspree API) ensures validated, secure communication.

---

## 💻 Local Execution

Since this is a performant static site, it can be run directly:
- **Directly:** Open `index.html` in any web browser.
- **Local Dev Server:** Run `npx serve` or `python3 -m http.server 8000` in the root folder.
