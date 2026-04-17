# Design System Strategy: Regina Elites Sporting Club

## 1. Overview & Creative North Star
### The Creative North Star: "Kinetic Prestige"
This design system is built to evoke the high-octane energy of a stadium at night. It rejects the static, boxy nature of traditional club websites in favor of an **Editorial Kinetic** approach. We achieve this through intentional asymmetry, massive typographic scales, and layered depth that mimics the physical architecture of premium sporting venues.

By utilizing "Kinetic Prestige," we move away from standard UI patterns and toward a signature look defined by sharp geometric angles (inspired by the club’s shield) and a sophisticated dark-mode environment where light is treated as a tactical tool rather than a default.

---

## 2. Colors: Tonal Depth & Soul
The palette is rooted in the club’s legacy—deep navy, vibrant red, and action-oriented green—but executed with a professional, dark-mode lens.

### The "No-Line" Rule
**Explicit Instruction:** Solid 1px borders are strictly prohibited for sectioning or containment. Boundaries must be established through:
*   **Background Shifts:** Transitioning from `surface` (#00132e) to `surface_container_low` (#051b38) to define section breaks.
*   **Geometric Clipping:** Using angled background shapes to slice the layout.

### Surface Hierarchy & Nesting
Treat the interface as physical layers of frosted glass. 
*   **Base:** `surface` (The deep stadium atmosphere).
*   **Sections:** Use `surface_container` (#0a203d) for structural areas.
*   **Interactive Units:** Use `surface_container_highest` (#223553) for cards or elements that need to feel "elevated" and closer to the user.

### The "Glass & Gradient" Rule
To add visual "soul," primary CTAs and hero highlights must use a **Linear Motion Gradient**:
*   **Primary Action:** A 45-degree gradient from `primary` (#ffb4ac) to `on_primary_container` (#ff3e3b). This creates a sense of forward momentum.
*   **Glassmorphism:** For floating navbars or stat overlays, use `surface_bright` (#273a58) at 60% opacity with a `backdrop-blur` of 12px.

---

## 3. Typography: The Editorial Voice
Our typography pairing is designed to reflect both the power of the athlete and the precision of the club.

*   **Display & Headlines (Space Grotesk):** This is our "Power" font. Use `display-lg` (3.5rem) for hero moments. The wide, geometric stance of Space Grotesk mirrors the club's "ELITE'S" wordmark. Use `uppercase` for all `headline` tokens to maintain a high-energy, authoritative tone.
*   **Body & Titles (Manrope):** This is our "Precision" font. Manrope provides a clean, modern contrast to the aggressive headings. Use `body-lg` (1rem) for readability in player bios and club news.

**Hierarchy Strategy:** Use massive contrast in scale. Pair a `display-lg` headline with a `label-md` uppercase subheader to create an "Editorial Poster" feel.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to create "pop"; we use light and layering to create "presence."

*   **The Layering Principle:** Place a `surface_container_lowest` (#000e25) card inside a `surface_container_low` (#051b38) section. This "recessed" look creates a sophisticated, premium feel without the clutter of drop shadows.
*   **Ambient Shadows:** For floating elements (Modals/Dropdowns), use a diffused 24px blur shadow. The color must be a 15% opacity tint of `surface_container_lowest`—never pure black.
*   **The "Ghost Border" Fallback:** If a container requires a border for accessibility, use the `outline_variant` token at **15% opacity**. It should feel like a whisper of a line, not a structural fence.

---

## 5. Components: Elite Styling

### Buttons (The Kinetic Trigger)
*   **Primary:** Sharp corners (`rounded-sm`: 0.125rem). Gradient background (Primary to Primary-Container). Text is `on_primary_fixed` (#410002) in all-caps Space Grotesk.
*   **Secondary:** Ghost style. `outline_variant` at 20% opacity. High-contrast white text.

### Cards & Lists (Zero-Divider Policy)
*   **Forbid Dividers:** Do not use lines to separate list items. Use 16px of `vertical white space` or alternating background tones (`surface_container_low` vs `surface_container`).
*   **Sporty Accents:** Every card should feature a 4px "accent blade" on the left or top edge using the `tertiary` (#66df75) green to signal "active" status.

### Input Fields
*   **Style:** Underline-only or subtle background fill (`surface_container_highest`). No four-sided boxes. When focused, the bottom border animates into a `primary` red gradient.

### Custom Component: The "Stat-Hero" Chip
*   Large, glassmorphic chips used for player stats (e.g., "Goals: 24"). Uses `surface_bright` with a 20% `on_surface` border for a high-end, futuristic aesthetic.

---

## 6. Do's and Don'ts

### Do:
*   **DO** use extreme typographic scales (pairing very large and very small text).
*   **DO** use the 45-degree angle of the club shield as a mask for images.
*   **DO** use `tertiary` (#66df75) sparingly for "Success" states and "Action" indicators to mimic field turf.
*   **DO** leave significant negative space; let the deep navy (`background`) breathe to emphasize prestige.

### Don't:
*   **DON'T** use `rounded-full` (pills) for buttons; it softens the brand too much. Stick to `sm` (0.125rem) for a sharper, aggressive look.
*   **DON'T** use grey shadows. Only use deep-tinted navy shadows to maintain the dark-mode immersion.
*   **DON'T** use standard 12-column grids strictly. Shift elements 20-40px off-center to create visual "motion."
*   **DON'T** use dividers or lines. Rely on color-blocking and spacing.