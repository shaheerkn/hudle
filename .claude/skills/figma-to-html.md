# Figma to HTML/SCSS — Hudle Project Skill

Convert Figma screenshots into pixel-perfect HTML and SCSS for the Hudle project.

## Project Setup

- **Type**: Static HTML/SCSS (no framework)
- **Build**: `npx sass css/style.scss css/style.css`
- **Units**: Always use `px` (never rem, em, or other units) — except `letter-spacing` uses `em` (e.g., `-0.05em`)

## File Structure

```
index.html                    ← All HTML lives here
css/
  style.scss                  ← Main entry, imports all partials
  abstracts/_variables.scss   ← Color/size tokens
  base/_reset.scss            ← Browser resets
  base/_typography.scss       ← Google Fonts imports + utility classes
  layout/_grid.scss           ← .container-l (1200px) and .container (1010px)
  layout/_header.scss         ← Navbar styles
  pages/_home.scss            ← All homepage sections
  components/_buttons.scss    ← Shared button styles
assets/
  images/                     ← SVGs, JPGs, PNGs
  fonts/                      ← (empty, using Google Fonts)
```

## Conventions

### HTML
- Semantic HTML5 (`<header>`, `<section>`, `<nav>`, `<h1>`-`<h6>`, `<p>`, `<a>`)
- BEM naming: `.block__element--modifier`
- Sections wrap content in `.container-l` for max-width centering
- Always add `padding-inline: 20px` on `.container-l` inside sections
- Inline SVGs for small icons (chevrons, arrows) — no icon font library
- Images referenced from `assets/images/` with relative paths

### SCSS
- Nest with `&__element` and `&--modifier` (BEM via nesting)
- Each section is a top-level class in `css/pages/_home.scss`
- Add a `// Section Name` comment above each block
- New layout partials go in `css/layout/`, new components in `css/components/`
- Register new partials in `css/style.scss` with `@use`
- Always compile after changes: `npx sass css/style.scss css/style.css`

### Responsive Breakpoints
- **Desktop**: default (no media query)
- **Tablet**: `@media (max-width: 992px)`
- **Mobile**: `@media (max-width: 576px)`
- Place media queries inside the component block, not in a separate file

## Design System — Typography

### Font Families (Google Fonts, already imported)
| Role       | Family        | Fallback   |
|------------|---------------|------------|
| Headings   | Abhaya Libre  | serif      |
| Taglines   | Raleway       | sans-serif |
| Body       | DM Sans       | sans-serif |
| Buttons/UI | Poppins       | sans-serif |

### Common Type Styles
| Element              | Family       | Weight | Size  | Line-height | Letter-spacing |
|----------------------|-------------|--------|-------|-------------|----------------|
| Main title (hero)    | Abhaya Libre | 600    | 64px  | 100%        | -0.1em         |
| Section title        | Abhaya Libre | 600    | 55px  | 100%        | -0.1em         |
| Hero subtitle        | Raleway      | 600    | 30px  | 100%        | -0.05em        |
| Tagline              | Raleway      | 600    | 24px  | 100%        | -0.05em        |
| Secondary title      | Raleway      | 600    | 24px  | 100%        | -0.05em        |
| Card title           | Raleway      | 600    | 28px  | 100%        | -0.05em        |
| Nav link             | Raleway      | 500    | 16px  | 100%        | -0.05em        |
| Body text            | DM Sans      | 400–500| 16px  | 130%–158%   | -0.05em        |
| Button               | Poppins      | 700    | 15px  | 100%        | -0.07em        |
| Link (discover more) | Raleway      | 600    | 16px  | 100%        | -0.05em        |

## Design System — Colors

| Token              | Hex       | Usage                          |
|--------------------|-----------|--------------------------------|
| Dark purple        | #433457   | Buttons, navbar CTA            |
| Blue/Indigo        | #8793F8 / #8894F9 | Primary buttons, links  |
| Dark background    | #0D0626   | Process section                |
| Card background    | #F4EEEC   | Feature cards (warm beige)     |
| Text primary       | #000000   | Headings, body text            |
| Text secondary     | #493934   | Card body text                 |
| Text on dark       | #FFFFFF   | White text on dark backgrounds |
| Text muted (dark)  | rgba(255,255,255,0.7) | Body text on dark bg |
| Border             | #E0D9E6   | Navbar divider                 |
| Hover purple       | #5a4873   | Button hover state             |

## Design System — Components

### Buttons
- Pill shape: `border-radius: 50px`
- Padding: `15px 24px`
- Font: Poppins 700, 15px, -0.07em letter-spacing
- Primary: `background: #8793F8`, `color: #fff`
- Secondary: `background: #433457`, `color: #fff`
- Transition: `background-color 0.2s`

### Links (Discover More)
- Inline-flex with arrow SVG icon
- Font: Raleway 600, 16px, -0.05em
- Color: `#8894F9`
- Arrow SVG: `width: 16px; height: 16px`
- Hover: color darkens, arrow slides right `translateX(4px)`
- Arrow SVG markup:
```html
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### Chevron (Dropdown Arrow for Nav)
```html
<svg width="10" height="6" viewBox="0 0 10 6" fill="none">
  <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### Cards
- Background: `#F4EEEC`
- Border-radius: `16px`
- Padding: `40px 36px` (or `40px 36px 0` if image bleeds to bottom)
- `overflow: hidden` when images touch edges

## Workflow — Step by Step

1. **Analyze the Figma screenshot** — identify layout (columns, alignment), typography, colors, spacing, and any images/icons
2. **Match to existing patterns** — reuse the type styles, colors, and components above
3. **Write HTML** — add section markup inside `<body>` in `index.html`, before `<script>`
4. **Write SCSS** — append section styles to `css/pages/_home.scss` (or the relevant partial)
5. **Register new partials** — if you created a new file, add `@use` in `css/style.scss`
6. **Compile** — run `npx sass css/style.scss css/style.css` and verify no errors
7. **Add responsive styles** — tablet (992px) and mobile (576px) breakpoints inside the section block

## Rules

- Always read the Figma screenshot carefully — do NOT guess the layout
- Use exact font specs when the user provides them (family, weight, size, line-height, letter-spacing)
- When the user says "use placeholder", create a styled `<div>` with a subtle background color and appropriate aspect-ratio
- Convert Figma's percentage letter-spacing to em (e.g., -5% → -0.05em, -7% → -0.07em, -10% → -0.1em)
- Keep all values in px except letter-spacing (em) and line-height (%)
- Images/icons from assets use relative paths: `assets/images/filename.svg`
- Do NOT add features, animations, or hover effects beyond what's visible in the design unless the user asks
- Do NOT create new files unless necessary — prefer appending to existing partials
