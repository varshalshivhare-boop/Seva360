---
name: Heritage Modernist
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f0eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#5a413d'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0ea'
  outline: '#8e706c'
  outline-variant: '#e2bfb9'
  surface-tint: '#b22b1d'
  primary: '#570000'
  on-primary: '#ffffff'
  primary-container: '#800000'
  on-primary-container: '#ff8371'
  inverse-primary: '#ffb4a8'
  secondary: '#8f4e00'
  on-secondary: '#ffffff'
  secondary-container: '#fe9832'
  on-secondary-container: '#683700'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cba72f'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#8f0f07'
  secondary-fixed: '#ffdcc2'
  secondary-fixed-dim: '#ffb77a'
  on-secondary-fixed: '#2e1500'
  on-secondary-fixed-variant: '#6d3a00'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.08em
  kpi-value:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max-width: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 80px
---

## Brand & Style

The design system is built upon the "Modern Indian Heritage" narrative—a fusion of traditional dignity and contemporary precision. It targets a diverse demographic, from tech-savvy administrators to elderly pilgrims, requiring a UI that is both premium and profoundly accessible.

The aesthetic follows a **Modern / Corporate** style with **Minimalist** layouts. It avoids cliché religious iconography in favor of geometric clarity and structural elegance. The emotional response should be one of "Structured Serenity"—calm, reliable, and high-end. We use generous whitespace to represent the openness of spiritual spaces, while keeping data-dense admin tools professional and efficient.

## Colors

The palette is anchored by **Deep Maroon**, conveying authority and heritage. **Saffron** is used sparingly as an action accent to draw attention to primary CTAs. **Subtle Gold** serves as a sophisticated highlight for borders, icons, or secondary decorative elements.

The background uses a **Warm Ivory** rather than pure white to reduce eye strain and provide a more welcoming, "parchment-like" premium feel. Status colors are saturated and distinct to ensure immediate cognitive recognition for pilgrimage flow management (low vs. critical crowd density).

## Typography

This design system utilizes **Montserrat** for headlines to project confidence and modernity. **Inter** is selected for body and UI labels due to its exceptional legibility at small sizes and high x-height, which is critical for the elderly user base.

Large base font sizes (minimum 16px/18px for body) are enforced to ensure accessibility. For the admin dashboard, we use a specific `kpi-value` style that prioritizes numerical clarity. All caps labels with tracking are reserved for metadata and headers to maintain a professional, organized hierarchy.

## Layout & Spacing

We employ a **Fixed Grid** system for desktop (12 columns) and a **Fluid Grid** for mobile (4 columns). The rhythm is based on an **8px linear scale**, ensuring consistent alignment across all components.

Generous margins (40px on desktop) and significant vertical gaps (80px between major sections) are intentional. This "breathing room" prevents the interface from feeling cluttered or stressful, reflecting the calm nature of the platform's purpose. Dashboard views should prioritize a compact 24px gutter to maximize information density while maintaining clean separation.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and **Ambient Shadows**. Instead of harsh black shadows, we use low-opacity Maroon or Charcoal tints in the shadows to maintain color harmony with the background.

- **Level 0 (Base):** Warm Ivory (#FCF9F2).
- **Level 1 (Cards):** White (#FFFFFF) with a soft 4px blur, 5% opacity shadow. Used for content blocks.
- **Level 2 (Active/Hover):** White (#FFFFFF) with an 8px blur, 10% opacity shadow. Used for interactive cards and dropdowns.
- **Level 3 (Modals):** White (#FFFFFF) with a 24px diffused shadow.

Outlines are used sparingly, primarily in a **Subtle Gold** or a 10% opacity Charcoal for "ghost" buttons and form fields.

## Shapes

The design system uses a **Rounded** (0.5rem / 8px) corner radius as the standard. This strikes a balance between the precision of a professional dashboard and the approachability of a hospitality service.

- **Standard Elements (Buttons, Inputs):** 8px radius.
- **Large Containers (Cards, Modals):** 16px (rounded-lg) to 24px (rounded-xl) radius.
- **Status Pills:** Fully rounded (Pill-shaped) to distinguish them clearly from interactive buttons.

## Components

### Buttons
- **Primary:** Solid Deep Maroon with White text. Bold, 8px radius.
- **Secondary:** Transparent with Deep Maroon border or Subtle Gold border.
- **Accent:** Saffron background for high-priority user actions (e.g., "Book Darshan").

### Cards
Cards are the primary container. They must have a white background, 16px corner radius, and a subtle ambient shadow. For admin KPIs, cards should include a 4px left-border accent using the relevant status color.

### Input Fields
Large touch targets (minimum 48px height). Use a light charcoal border (10% opacity) that transitions to Deep Maroon on focus. Labels should always be visible above the field for clarity.

### Icons
Use thin-stroke (1.5px or 2px) icons. Icons should be monochrome (Charcoal) or use the Primary Maroon. Avoid multi-colored or illustrative icons to maintain the professional aesthetic.

### Admin Dashboard Elements
- **Charts:** Use a clean, sans-serif labeling system. Data series should use the primary palette (Maroon, Saffron, Gold) before moving to status colors.
- **KPI Cards:** Feature a large Montserrat numerical value and a small trend indicator (arrow up/down).