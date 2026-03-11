---
description: Static site optimization for SEO and Design
---

This workflow guides the process of optimizing the portfolio website for SEO and Design, specifically for static exports.

1. **Review Metadata and Structured Data**
   - Head to `src/app/layout.tsx`.
   - Ensure the `metadata` object is comprehensive (titles, descriptions, keywords, OG tags).
   - Verify `structuredData` in `layout.tsx` is accurate and up-to-date.

2. **Optimize Images**
   - Since `output: 'export'` is used, default Next.js image optimization is disabled.
   - Use `unoptimized: true` in `next.config.ts` (already done).
   - Ensure all images in `public/` or external sources are appropriately sized and compressed.
   - Use meaningful `alt` text and `data-ai-hint` for all images.

3. **Enhance Content and Structure**
   - Use semantic HTML tags (`<main>`, `<section>`, `<article>`, `<h1>`-`<h6>`).
   - Ensure a clear heading hierarchy (single `<h1>` per page).
   - Improve readability with proper spacing and typography.

4. **Refine Design Consistency**
   - Follow the "Flat Aesthetic" where applicable (check `globals.css` for `--radius` and shadow removals).
   - Ensure consistent use of Tailwind classes for margins, padding, and colors.
   - Check mobile responsiveness for all components and pages.

5. **Polish Interactions**
   - Use `framer-motion` for smooth entrance animations.
   - Ensure interactive elements have `data-cursor-interactive` for the custom cursor.
   - Add micro-animations (e.g., hover effects on cards and buttons).

6. **Deploy and Verify**
   - Run `npm run build` to ensure the static export works without errors.
   - Push changes to GitHub for Cloudflare Pages deployment.
   - Verify SEO using tools like PageSpeed Insights or Lighthouse.
