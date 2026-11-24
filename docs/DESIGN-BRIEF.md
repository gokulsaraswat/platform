# DESIGN BRIEF: gokulsaraswat platform, v2

Self-contained: paste this file into any repo chat. Source of truth: `platform/packages/ui/src/v2/flavors.json`
(values below are generated from it; never edit them by hand). Preview: open `platform/packages/ui/preview/index.html`
(`?flavor=instrument|atelier|margin&theme=light|dark|system`). Decided 2026-11-25.

## 1. The idea in one paragraph
One foundation, three flavors. Every app shares the same token *names*, spacing, motion, accessibility rules and component
classes, so code and habits move between repos. Each app gets the flavor that suits its job: palette, fonts, density, radius
and press feedback. Nothing in v1 changes: v2 lives at `@gokulsaraswat/ui/v2` and `--gk-*` variables, next to the old tokens.

| Repo | Flavor | Default theme | Why |
|---|---|---|---|
| admin | Instrument | system | dense data, precise controls, long sessions |
| gokul-omni-converter | Instrument | follow OS, else light | desktop utility; reads like a tool, not a site |
| gokulmobilize (hub + Android) | Atelier | system | thumb-first launcher; touch, warmth, delight |
| Markdown-studio | Margin | system (keep its own toggle) | writing and reading come first; chrome stays quiet |
| GSpace | Margin | system | notes and course reading |
| bestportofolio | own direction (Gokul gives it) on the v2 foundation | its own | the public face; deliberate differences are listed in its repo |

## 2. Principles (apply to every screen)
1. **Content is the interface.** Chrome is quiet; the data, the document or the app tiles carry the screen.
2. **One bold thing per screen.** Instrument: the table. Atelier: the oversized display type on the tiles. Margin: the page and its margin notes. Everything around it stays disciplined.
3. **Every state is designed.** default, hover, focus-visible, active, disabled, loading (skeleton or spinner), empty, error. No blank screens, no spinner-only pages.
4. **Accessible by default.** WCAG 2.2 AA is tested in CI for every color pair (162 pairs). Visible focus on everything. Targets 24px minimum, 44px on touch (`--gk-touch-min`).
5. **Motion answers the user.** Movement shows what changed (dialog opens, tab indicator slides, toast arrives). At most one orchestrated entrance per screen. No scroll-triggered fade-ups on every section.
6. **Words are design.** Sentence case. Buttons say exactly what happens ("Grant role", "Export"), and the confirmation uses the same verb ("Role granted"). Errors say what failed and how to fix it; they don't apologise. Empty states invite the next action.

Don't: all-caps labels or eyebrows above headings, one highlighted word in a headline, a `→` on every button, identical rounded cards for everything, gradient washes as decoration, middle-dot metadata strings, numbered markers on content that isn't a sequence, hardcoded hex or px in app code (use tokens).

## 3. How theming works (all stacks)
- Flavor: `data-gk-flavor="instrument|atelier|margin"` on `<html>` (or any subtree). No attribute = instrument.
- Theme: light by default. Dark with class `dark` (the v1 / next-themes convention) or `data-gk-theme="dark"`.
  `data-gk-theme="system"` follows the OS. Each flavor block sets `color-scheme`, so native controls and scrollbars match.
- Root element: add class `gk-app` to `<body>` for background, text color, font and base size.
- Variables: colors `--gk-color-<token>`; type `--gk-font-{sans,display,reading,mono}`, `--gk-text-{xs,sm,base,lg,xl,2xl,3xl}`,
  `--gk-leading-{tight,snug,body}`, `--gk-weight-{regular,medium,strong,display}`, `--gk-tracking-{display,body}`;
  shape `--gk-radius-{sm,md,lg,xl,full}`, `--gk-control-h`, `--gk-press`; shared `--gk-space-*`, `--gk-shadow-{1,2,3}`,
  `--gk-ease-{enter,exit,move}`, `--gk-dur-{micro,spatial,morph}`, `--gk-z-*`, `--gk-touch-min`, `--gk-measure`.
- Color token roles: `bg` page, `surface` cards/inputs/bars, `sunken` wells/table heads/code, `border` dividers,
  `border-strong` input borders (3:1), `text` / `text-muted` / `text-subtle` (all 4.5:1), `accent` links + primary actions,
  `on-accent` text on accent, `accent-subtle` + `on-accent-subtle` selected/current, `focus` focus rings,
  `danger|success|warning|info` text + `*-subtle` fills, `highlight` + `on-highlight` marks/spark, `overlay` dialog scrim.

## 4. Type
- Instrument: IBM Plex Sans for everything, IBM Plex Mono for ids, code and keys. Base 15px, ratio about 1.2. Tabular figures in tables (`gk-num`).
- Atelier: Bricolage Grotesque (use `opsz` 96 for display, 14 for text), JetBrains Mono for code. Base 16px, display 44px, weight 750, tight tracking.
- Margin: Newsreader for documents and headings (use `opsz`), Instrument Sans for UI chrome, JetBrains Mono for the editor. Reading text 19px / 1.6, measure 68ch.
- Line length: under 80 characters (`--gk-measure` for reading). Headlines use `text-wrap: balance` (`gk-display`).
- Loading fonts: the token family names are the real names (`'IBM Plex Sans'`, ...). Either self-host woff2 with `@font-face`
  using exactly that family name, or point the variable at your loader: Next.js `next/font` -> set
  `--gk-font-sans: var(--font-plex-sans), 'Segoe UI', system-ui, sans-serif` on `<html>` after the tokens; Fontsource
  variable packages register `'<Name> Variable'`, so override the variable the same way. Subset to latin, `font-display: swap`,
  preload only the body face. All fonts are OFL (free to self-host).

## 5. Space, shape, depth, motion
- Space: 4px grid (`--gk-space-1` = 4px ... `--gk-space-20` = 80px). Same numbers as Tailwind's spacing scale, so `p-4` = `--gk-space-4`.
- Radius rises with hierarchy, not one radius everywhere: `sm` badges/kbd, `md` controls, `lg` cards/tables/toasts, `xl` dialogs and hub tiles, `full` pills/switches.
  Instrument 3-12px, Atelier 10-28px, Margin 3-8px.
- Depth: `--gk-shadow-1` resting cards, `2` hover/raised, `3` dialogs/toasts/menus. Shadows are ink-tinted and auto-stronger in dark mode; borders do most of the separating.
- Motion: enter `--gk-ease-enter` (cubic-bezier(0.16,1,0.3,1)), exit `--gk-ease-exit`, move `--gk-ease-move`. Durations: micro 150ms (hover, toggle), spatial 300ms (dialog, drawer, tab indicator), morph 400ms (staggered lists, view transitions). Animate only `transform` and `opacity`. `prefers-reduced-motion` sets all durations to 0ms automatically.
- Press feedback per flavor (`--gk-press`): Instrument `translateY(1px)`, Atelier `scale(0.96)`, Margin none.

## 6. Components (`v2/components.css` classes; React wrappers from `@gokulsaraswat/ui/v2`)
| Component | Classes | React | Notes |
|---|---|---|---|
| App root | `gk-app`, `gk-display`, `gk-prose`, `gk-muted`, `gk-num`, `gk-mono`, `gk-sr-only`, `gk-mark` | - | |
| Button | `gk-btn` + `--primary --ghost --danger`, `--sm --lg --icon` | `Button` (variant, size, loading, icon) | loading = `aria-busy` + spinner; icon buttons need `aria-label` |
| Field | `gk-field`, `gk-label`, `gk-hint`, `gk-field-error` | `Field` (label, hint, error) | wires `for`, `aria-describedby`, `aria-invalid` |
| Inputs | `gk-input`, `gk-select`, `gk-textarea` | `Input`, `Select`, `Textarea` | invalid via `aria-invalid="true"` |
| Choice | `gk-check` (label wrapper), `gk-switch` (on a checkbox with `role="switch"`) | `Checkbox`, `Radio`, `Switch` | native inputs, `accent-color` |
| Card | `gk-card`, `__header __body __footer`, `--interactive` | `Card` (interactive) | interactive only when the card has one primary action |
| Badge | `gk-badge` + `--accent --success --warning --danger --info` | `Badge` (tone) | |
| Alert | `gk-alert` + `--success --warning --danger`, `__title` | `Alert` (tone, title) | danger/warning `role="alert"`, else `role="status"` |
| Table | `gk-table-wrap` > `table.gk-table` | - (plain markup) | sticky head, `aria-sort`, selected rows `aria-selected`, `data-align="end"` for numbers |
| Tabs | `gk-tabs`, `gk-tab` | `Tabs`, `tabPanelProps()` | roving tabindex, arrows/Home/End |
| Navigation | `gk-topbar`, `gk-sidenav`, `gk-sidenav__group`, `gk-navlink` | - | current page `aria-current="page"`; topbar respects safe-area |
| Dialog | `dialog.gk-dialog`, `__header __title __body __footer` | `Dialog` (open, onClose, title, footer) | native `showModal()`: focus trap and Escape for free |
| Toast | `gk-toast-region` > `gk-toast` + `--success --warning --danger` | `ToastRegion` (toasts) | app owns the queue; region is `aria-live="polite"` |
| Loading | `gk-skeleton`, `gk-spinner` | `Skeleton`, `Spinner` (label) | skeleton mirrors the real layout |
| States | `gk-state`, `__icon __title __body __actions`, `--error` | `EmptyState`, `ErrorState` | empty = what belongs here + action; error = cause + recovery |
| Keys | `gk-kbd` | `Kbd` | |

Missing something? Do not invent a local look. Add `needs: PLT-F-<n>` to your backlog (see RULES.md section 4), use the
closest existing class or a neutral placeholder built from tokens, and the platform adds it to v2.

## 7. Per stack
- **React / Next.js + Tailwind v4 (admin, bestportofolio):** `@import "@gokulsaraswat/ui/v2/tokens.css"; @import "@gokulsaraswat/ui/v2/components.css";`
  and, for utilities, `@import "@gokulsaraswat/ui/v2/tailwind.css";` after `@import "tailwindcss";` (gives `bg-gk-surface`,
  `text-gk-text-muted`, `rounded-gk-md`, `shadow-gk-2`, `font-gk-display`, `ease-gk-enter`). Components: `import { Button } from '@gokulsaraswat/ui/v2'`.
  Set `data-gk-flavor` on `<html>` in the root layout. v1 imports keep working; migrate screen by screen.
- **Astro + React islands (gokulmobilize, GSpace):** import the two CSS files once in the base layout; use classes in `.astro`
  markup and the React wrappers only inside islands. No JS is needed for the look.
- **Vanilla JS / static (Markdown-studio):** no package install. Copy `v2/tokens.css` (or only your flavor's blocks) and
  `v2/components.css` into the repo as plain CSS, add them to the service-worker precache, set `data-gk-flavor="margin"`.
  Values below are identical if you prefer to hand-write variables.
- **Python desktop (gokul-omni-converter):** use the `GK_INSTRUMENT` dict below in `ui/kit.py` (colors as hex, sizes in px).
  Map `surface` to frames/entries, `bg` to the window, `accent` to the primary button and selection, `border_strong` to entry
  borders, `focus` to focus highlight. Fonts fall back to Segoe UI / Consolas when Plex is not installed. Pick light or dark
  from the OS setting once at start.

## 8. Accessibility checklist (definition of done for every screen)
- Text 4.5:1, large text and UI parts 3:1: guaranteed if you only use the tokens for their stated roles.
- Keyboard: every action reachable, visible `:focus-visible` ring, logical order, Escape closes overlays.
- Targets: 24px minimum; 44px on touch (automatic for v2 controls under `pointer: coarse`).
- Semantics: real buttons and links, labelled fields, tables with headers, live regions for async results.
- Motion: respects reduced motion (automatic for v2 durations; custom keyframes must add their own guard).
- Zoom to 200% and widths down to 320px without horizontal page scroll (tables scroll inside `gk-table-wrap`).

## 9. Raw values
<!-- RAW:START (generated by packages/ui/scripts/gen.mjs; do not edit) -->
### Instrument (`data-gk-flavor="instrument"`): admin, gokul-omni-converter

A precise control panel: cool slate, verdigris signal colour, tight type, small radii, data in tabular figures.

Fonts: IBM Plex Sans (variable, wght 400-600), IBM Plex Mono (400, 500). OFL.

| Token (`--gk-color-*`) | Light | Dark |
|---|---|---|
| bg | `#F4F6F7` | `#0F151A` |
| surface | `#FFFFFF` | `#161E25` |
| sunken | `#EBEEF0` | `#0B1014` |
| border | `#D6DCE1` | `#27323C` |
| border-strong | `#7E8A95` | `#6A7784` |
| text | `#132029` | `#E5EBEF` |
| text-muted | `#4D5B67` | `#A3AFBA` |
| text-subtle | `#5F6C78` | `#8D99A5` |
| accent | `#0B6B62` | `#3CC0AE` |
| accent-hover | `#08544D` | `#62D2C3` |
| on-accent | `#FFFFFF` | `#04231F` |
| accent-subtle | `#DCEFEB` | `#123430` |
| on-accent-subtle | `#074841` | `#9BE6DA` |
| focus | `#0B6B62` | `#3CC0AE` |
| danger | `#B42318` | `#F38479` |
| danger-subtle | `#FCE9E7` | `#3A1A17` |
| on-danger | `#FFFFFF` | `#2A0805` |
| success | `#16713A` | `#5FCB8C` |
| success-subtle | `#E1F3E7` | `#143022` |
| warning | `#8A5300` | `#E9B44E` |
| warning-subtle | `#FDF1D8` | `#352713` |
| info | `#1D5BA6` | `#7EAEEF` |
| info-subtle | `#E3EDF9` | `#16263C` |
| highlight | `#F2C94C` | `#E9B44E` |
| on-highlight | `#132029` | `#1F1603` |
| overlay | `rgba(19, 32, 41, 0.45)` | `rgba(0, 0, 0, 0.6)` |
| shadow-color | `19 32 41` | `0 0 0` |

| Scale | Values |
|---|---|
| font (`--gk-font-*`) | sans: 'IBM Plex Sans'; display: 'IBM Plex Sans'; reading: 'IBM Plex Sans'; mono: 'IBM Plex Mono' |
| text (`--gk-text-*`) | xs 0.75rem, sm 0.8125rem, base 0.9375rem, lg 1.125rem, xl 1.375rem, 2xl 1.75rem, 3xl 2.25rem |
| leading | tight 1.2, snug 1.35, body 1.5 |
| weight | regular 400, medium 500, strong 600, display 600 |
| radius (`--gk-radius-*`) | sm 0.1875rem, md 0.3125rem, lg 0.5rem, xl 0.75rem, full 999px |
| control height | 2.25rem (min 2.75rem on touch) |

Python theme dict (sizes in px):

```python
GK_INSTRUMENT = {
    "name": "instrument",
    "font": {
        "sans": "IBM Plex Sans",
        "mono": "IBM Plex Mono",
        "fallbackSans": "Segoe UI",
        "fallbackMono": "Consolas"
    },
    "size": {
        "xs": 12,
        "sm": 13,
        "base": 15,
        "lg": 18,
        "xl": 22,
        "2xl": 28,
        "3xl": 36
    },
    "radius": {
        "sm": 3,
        "md": 5,
        "lg": 8,
        "xl": 12
    },
    "control_h": 36,
    "light": {
        "bg": "#F4F6F7",
        "surface": "#FFFFFF",
        "sunken": "#EBEEF0",
        "border": "#D6DCE1",
        "border_strong": "#7E8A95",
        "text": "#132029",
        "text_muted": "#4D5B67",
        "text_subtle": "#5F6C78",
        "accent": "#0B6B62",
        "accent_hover": "#08544D",
        "on_accent": "#FFFFFF",
        "accent_subtle": "#DCEFEB",
        "on_accent_subtle": "#074841",
        "focus": "#0B6B62",
        "danger": "#B42318",
        "danger_subtle": "#FCE9E7",
        "on_danger": "#FFFFFF",
        "success": "#16713A",
        "success_subtle": "#E1F3E7",
        "warning": "#8A5300",
        "warning_subtle": "#FDF1D8",
        "info": "#1D5BA6",
        "info_subtle": "#E3EDF9",
        "highlight": "#F2C94C",
        "on_highlight": "#132029"
    },
    "dark": {
        "bg": "#0F151A",
        "surface": "#161E25",
        "sunken": "#0B1014",
        "border": "#27323C",
        "border_strong": "#6A7784",
        "text": "#E5EBEF",
        "text_muted": "#A3AFBA",
        "text_subtle": "#8D99A5",
        "accent": "#3CC0AE",
        "accent_hover": "#62D2C3",
        "on_accent": "#04231F",
        "accent_subtle": "#123430",
        "on_accent_subtle": "#9BE6DA",
        "focus": "#3CC0AE",
        "danger": "#F38479",
        "danger_subtle": "#3A1A17",
        "on_danger": "#2A0805",
        "success": "#5FCB8C",
        "success_subtle": "#143022",
        "warning": "#E9B44E",
        "warning_subtle": "#352713",
        "info": "#7EAEEF",
        "info_subtle": "#16263C",
        "highlight": "#E9B44E",
        "on_highlight": "#1F1603"
    }
}
```

### Atelier (`data-gk-flavor="atelier"`): gokulmobilize (hub web + Android)

A pocket launcher you want to touch: big soft shapes, ultramarine with a marigold spark, expressive grotesque type, springy feedback.

Fonts: Bricolage Grotesque (variable, opsz 12-96, wght 400-800), JetBrains Mono (400). OFL.

| Token (`--gk-color-*`) | Light | Dark |
|---|---|---|
| bg | `#F1F2F7` | `#10121C` |
| surface | `#FFFFFF` | `#181B2A` |
| sunken | `#E6E8F0` | `#0B0D15` |
| border | `#D3D7E3` | `#2A2F46` |
| border-strong | `#7C8299` | `#6E7594` |
| text | `#161A2E` | `#ECEEF8` |
| text-muted | `#4D536B` | `#A7ADC6` |
| text-subtle | `#5F6580` | `#9097B2` |
| accent | `#2F38D8` | `#9198FF` |
| accent-hover | `#232AB0` | `#ADB2FF` |
| on-accent | `#FFFFFF` | `#10133F` |
| accent-subtle | `#E3E5FF` | `#23274D` |
| on-accent-subtle | `#20279C` | `#C7CAFF` |
| focus | `#2F38D8` | `#9198FF` |
| danger | `#BE2A2A` | `#FF8A80` |
| danger-subtle | `#FDE8E8` | `#3B1A1A` |
| on-danger | `#FFFFFF` | `#2B0707` |
| success | `#18723F` | `#63D18F` |
| success-subtle | `#E0F4E8` | `#13301F` |
| warning | `#8A5200` | `#FFC24D` |
| warning-subtle | `#FFF0D1` | `#382A10` |
| info | `#2F38D8` | `#9198FF` |
| info-subtle | `#E3E5FF` | `#23274D` |
| highlight | `#FFB627` | `#FFC24D` |
| on-highlight | `#161A2E` | `#221600` |
| overlay | `rgba(22, 26, 46, 0.5)` | `rgba(0, 0, 0, 0.6)` |
| shadow-color | `35 42 120` | `0 0 0` |

| Scale | Values |
|---|---|
| font (`--gk-font-*`) | sans: 'Bricolage Grotesque'; display: 'Bricolage Grotesque'; reading: 'Bricolage Grotesque'; mono: 'JetBrains Mono' |
| text (`--gk-text-*`) | xs 0.8125rem, sm 0.875rem, base 1rem, lg 1.25rem, xl 1.5625rem, 2xl 1.9375rem, 3xl 2.75rem |
| leading | tight 1.05, snug 1.3, body 1.55 |
| weight | regular 400, medium 500, strong 650, display 750 |
| radius (`--gk-radius-*`) | sm 0.625rem, md 0.875rem, lg 1.25rem, xl 1.75rem, full 999px |
| control height | 2.75rem (min 2.75rem on touch) |

Python theme dict (sizes in px):

```python
GK_ATELIER = {
    "name": "atelier",
    "font": {
        "sans": "Bricolage Grotesque",
        "mono": "JetBrains Mono",
        "fallbackSans": "Segoe UI",
        "fallbackMono": "Consolas"
    },
    "size": {
        "xs": 13,
        "sm": 14,
        "base": 16,
        "lg": 20,
        "xl": 25,
        "2xl": 31,
        "3xl": 44
    },
    "radius": {
        "sm": 10,
        "md": 14,
        "lg": 20,
        "xl": 28
    },
    "control_h": 44,
    "light": {
        "bg": "#F1F2F7",
        "surface": "#FFFFFF",
        "sunken": "#E6E8F0",
        "border": "#D3D7E3",
        "border_strong": "#7C8299",
        "text": "#161A2E",
        "text_muted": "#4D536B",
        "text_subtle": "#5F6580",
        "accent": "#2F38D8",
        "accent_hover": "#232AB0",
        "on_accent": "#FFFFFF",
        "accent_subtle": "#E3E5FF",
        "on_accent_subtle": "#20279C",
        "focus": "#2F38D8",
        "danger": "#BE2A2A",
        "danger_subtle": "#FDE8E8",
        "on_danger": "#FFFFFF",
        "success": "#18723F",
        "success_subtle": "#E0F4E8",
        "warning": "#8A5200",
        "warning_subtle": "#FFF0D1",
        "info": "#2F38D8",
        "info_subtle": "#E3E5FF",
        "highlight": "#FFB627",
        "on_highlight": "#161A2E"
    },
    "dark": {
        "bg": "#10121C",
        "surface": "#181B2A",
        "sunken": "#0B0D15",
        "border": "#2A2F46",
        "border_strong": "#6E7594",
        "text": "#ECEEF8",
        "text_muted": "#A7ADC6",
        "text_subtle": "#9097B2",
        "accent": "#9198FF",
        "accent_hover": "#ADB2FF",
        "on_accent": "#10133F",
        "accent_subtle": "#23274D",
        "on_accent_subtle": "#C7CAFF",
        "focus": "#9198FF",
        "danger": "#FF8A80",
        "danger_subtle": "#3B1A1A",
        "on_danger": "#2B0707",
        "success": "#63D18F",
        "success_subtle": "#13301F",
        "warning": "#FFC24D",
        "warning_subtle": "#382A10",
        "info": "#9198FF",
        "info_subtle": "#23274D",
        "highlight": "#FFC24D",
        "on_highlight": "#221600"
    }
}
```

### Margin (`data-gk-flavor="margin"`): Markdown-studio, GSpace

A writing desk: near-white paper, ink text set in a reading serif, oxblood editing marks, quiet chrome that gets out of the way of the page.

Fonts: Newsreader (variable, opsz 6-72, wght 400-700, + italic), Instrument Sans (variable, wght 400-600), JetBrains Mono (400). OFL.

| Token (`--gk-color-*`) | Light | Dark |
|---|---|---|
| bg | `#FAFAF9` | `#151413` |
| surface | `#FFFFFF` | `#1C1B19` |
| sunken | `#F0F0EE` | `#0F0E0D` |
| border | `#E0DFDC` | `#2F2D2A` |
| border-strong | `#858079` | `#7A746C` |
| text | `#1E1C1A` | `#ECE8E2` |
| text-muted | `#55514C` | `#B0A99F` |
| text-subtle | `#68635D` | `#999288` |
| accent | `#8E1E41` | `#E58DA7` |
| accent-hover | `#701733` | `#F0A9BE` |
| on-accent | `#FFFFFF` | `#2B0913` |
| accent-subtle | `#F7E7EC` | `#3A1C25` |
| on-accent-subtle | `#6A1530` | `#F5C4D3` |
| focus | `#8E1E41` | `#E58DA7` |
| danger | `#B42318` | `#F38479` |
| danger-subtle | `#FCE9E7` | `#3A1A17` |
| on-danger | `#FFFFFF` | `#2A0805` |
| success | `#2E6B3A` | `#7CC88A` |
| success-subtle | `#E5F1E6` | `#1A2E1D` |
| warning | `#855100` | `#E2B45A` |
| warning-subtle | `#FBF0DA` | `#33281A` |
| info | `#2A5A8F` | `#8DB6E6` |
| info-subtle | `#E6EEF7` | `#1A2633` |
| highlight | `#F6E27A` | `#6B5E1E` |
| on-highlight | `#1E1C1A` | `#F5F1EA` |
| overlay | `rgba(30, 28, 26, 0.45)` | `rgba(0, 0, 0, 0.6)` |
| shadow-color | `30 28 26` | `0 0 0` |

| Scale | Values |
|---|---|
| font (`--gk-font-*`) | sans: 'Instrument Sans'; display: 'Newsreader'; reading: 'Newsreader'; mono: 'JetBrains Mono' |
| text (`--gk-text-*`) | xs 0.75rem, sm 0.875rem, base 1rem, lg 1.1875rem, xl 1.5rem, 2xl 1.875rem, 3xl 2.5rem |
| leading | tight 1.15, snug 1.35, body 1.6 |
| weight | regular 400, medium 500, strong 600, display 500 |
| radius (`--gk-radius-*`) | sm 0.1875rem, md 0.25rem, lg 0.375rem, xl 0.5rem, full 999px |
| control height | 2.5rem (min 2.75rem on touch) |

Python theme dict (sizes in px):

```python
GK_MARGIN = {
    "name": "margin",
    "font": {
        "sans": "Instrument Sans",
        "mono": "JetBrains Mono",
        "fallbackSans": "Segoe UI",
        "fallbackMono": "Consolas",
        "reading": "Newsreader",
        "fallbackReading": "Georgia"
    },
    "size": {
        "xs": 12,
        "sm": 14,
        "base": 16,
        "lg": 19,
        "xl": 24,
        "2xl": 30,
        "3xl": 40
    },
    "radius": {
        "sm": 3,
        "md": 4,
        "lg": 6,
        "xl": 8
    },
    "control_h": 40,
    "light": {
        "bg": "#FAFAF9",
        "surface": "#FFFFFF",
        "sunken": "#F0F0EE",
        "border": "#E0DFDC",
        "border_strong": "#858079",
        "text": "#1E1C1A",
        "text_muted": "#55514C",
        "text_subtle": "#68635D",
        "accent": "#8E1E41",
        "accent_hover": "#701733",
        "on_accent": "#FFFFFF",
        "accent_subtle": "#F7E7EC",
        "on_accent_subtle": "#6A1530",
        "focus": "#8E1E41",
        "danger": "#B42318",
        "danger_subtle": "#FCE9E7",
        "on_danger": "#FFFFFF",
        "success": "#2E6B3A",
        "success_subtle": "#E5F1E6",
        "warning": "#855100",
        "warning_subtle": "#FBF0DA",
        "info": "#2A5A8F",
        "info_subtle": "#E6EEF7",
        "highlight": "#F6E27A",
        "on_highlight": "#1E1C1A"
    },
    "dark": {
        "bg": "#151413",
        "surface": "#1C1B19",
        "sunken": "#0F0E0D",
        "border": "#2F2D2A",
        "border_strong": "#7A746C",
        "text": "#ECE8E2",
        "text_muted": "#B0A99F",
        "text_subtle": "#999288",
        "accent": "#E58DA7",
        "accent_hover": "#F0A9BE",
        "on_accent": "#2B0913",
        "accent_subtle": "#3A1C25",
        "on_accent_subtle": "#F5C4D3",
        "focus": "#E58DA7",
        "danger": "#F38479",
        "danger_subtle": "#3A1A17",
        "on_danger": "#2A0805",
        "success": "#7CC88A",
        "success_subtle": "#1A2E1D",
        "warning": "#E2B45A",
        "warning_subtle": "#33281A",
        "info": "#8DB6E6",
        "info_subtle": "#1A2633",
        "highlight": "#6B5E1E",
        "on_highlight": "#F5F1EA"
    }
}
```

### Shared (all flavors)

| Group | Values |
|---|---|
| space (`--gk-space-*`) | 0=0, 1=0.25rem, 2=0.5rem, 3=0.75rem, 4=1rem, 5=1.25rem, 6=1.5rem, 8=2rem, 10=2.5rem, 12=3rem, 16=4rem, 20=5rem |
| motion | `--gk-ease-enter` cubic-bezier(0.16, 1, 0.3, 1); `--gk-ease-exit` cubic-bezier(0.4, 0, 1, 1); `--gk-ease-move` cubic-bezier(0.65, 0, 0.35, 1); `--gk-dur-micro` 150ms; `--gk-dur-spatial` 300ms; `--gk-dur-morph` 400ms |
| z-index (`--gk-z-*`) | sticky 10, overlay 40, dialog 50, toast 60 |
| touch target | 2.75rem (44px) minimum on coarse pointers |
| reading measure | 68ch |
<!-- RAW:END -->
