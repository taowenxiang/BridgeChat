# BridgeChat Bilingual Guided Demo Design

## 1. Goal

Reintroduce bilingual support to the refactored BridgeChat experience without bringing back the legacy multi-surface architecture.

The updated product should:

- keep the current reduced shape: concept-first homepage + guided demo page
- default to Simplified Chinese
- allow switching between Chinese and English
- remember the user’s last language choice
- keep autoplay, scene progression, and annotation behavior unchanged

This is a focused language-layer enhancement, not a return to the old product structure.

---

## 2. Product Context

The current refactored branch already reduced BridgeChat to:

1. `/` — a concept-first landing page
2. `/demo` — a guided autoplay demo with exactly two scenes

The current issue is that this reduced experience is effectively English-only.

The design goal is to restore bilingual usability while preserving the refactored architecture and keeping the implementation lightweight.

---

## 3. Scope

### In scope

Add bilingual support for:

- homepage hero copy
- homepage principle labels
- homepage feature card titles and descriptions
- guided demo header copy
- guided demo control labels
- scene switcher labels
- annotation rail heading and step labels
- chat-stage static labels
- scene titles, subtitles, purposes
- scene annotations
- scene messages and media captions
- document language (`html lang`)
- persisted language selection

### Out of scope

Do not add:

- URL-based i18n routes
- browser-language auto-detection
- server-side locale negotiation
- SEO/i18n routing structure
- third-language extensibility work
- revival of the old `copy.ts` system
- revival of the old chat-product / API / video mode architecture

---

## 4. User Experience

### Default language

The interface should default to Simplified Chinese (`zh`) on first visit.

### Persisted selection

If the user switches to English (`en`), that choice should be saved locally and reused on later visits.

### Switching behavior

Language switching should be immediate and client-side.

It should update:

- visible homepage text
- visible guided demo UI text
- currently selected scene text
- currently visible annotation content
- currently visible messages
- document `lang`

Language switching should not:

- reset the current page
- break autoplay
- reset the currently selected scene
- revert replay or timing logic

---

## 5. Information Architecture Impact

The product routes remain unchanged:

- `/`
- `/demo`

The change is internal to the rendering and copy systems only.

No new route layer is added.

---

## 6. Architecture Direction

Use a lightweight locale state layer instead of reviving the old locale-heavy app shell.

### Recommended structure

1. Add a small locale provider/hook pair
2. Add a unified bilingual copy source for homepage and demo UI
3. Convert scene content generation from static single-language data into locale-aware scene data
4. Keep existing playback logic intact

The key principle is:

> move text behind locale-aware helpers, not logic behind locale-aware branching

---

## 7. Locale State Design

### Locale model

Use exactly two locales:

- `zh`
- `en`

### Provider responsibilities

The locale provider should only handle:

- current locale value
- locale setter / toggle action
- reading the stored locale from `localStorage`
- persisting locale changes to `localStorage`
- updating `document.documentElement.lang`

### Default behavior

If no saved locale exists:

- use `zh`
- set `document.documentElement.lang` to `zh-CN`

If the current locale is `en`:

- set `document.documentElement.lang` to `en`

This provider should stay small and not accumulate product-specific logic.

---

## 8. Copy Architecture

The current branch splits visible text across:

- homepage/demo shell copy
- feature card copy
- scene content copy
- annotation labels and chat-stage labels

This should be unified into a bilingual source structure.

### Recommended organization

Use one locale-aware content layer with three domains:

1. `home`
2. `demo`
3. `scenes`

### `home`

Includes:

- badge
- title
- tagline
- intro
- CTA
- secondary CTA
- principles
- feature cards

### `demo`

Includes:

- demo heading
- demo intro/support text
- replay button
- next-scene button
- scene label
- annotation rail heading
- localized step prefix
- chat-stage heading
- live playback label
- waiting-state label

### `scenes`

Includes bilingual definitions for both scenes:

- eyebrow
- title
- subtitle
- purpose
- annotations
- visible messages
- media captions

This keeps all visible text in one coherent bilingual system instead of scattering it across component-local constants.

---

## 9. Scene Data Strategy

The current guided demo relies on structured scene data and playback helpers.

Keep that model, but change the scene source from:

- one static single-language array

to:

- a locale-aware scene factory or locale-keyed scene record

### Requirement

Autoplay state should continue to depend on stable scene structure:

- scene ids
- step ids
- delay values
- visible message ids

Only the displayed copy should vary by locale.

This ensures language switching does not destabilize playback behavior.

---

## 10. UI Placement

### Homepage

Add a compact language switch control at the top-right area of the landing page.

It should feel secondary, not like the main CTA.

### Guided demo page

Add a matching compact language switch control in the top-right control area of `/demo`.

It should sit alongside the demo controls without dominating the page.

### Control style

Keep it visually restrained:

- small
- clean
- consistent with the current shadcn-like button styling

Recommended examples:

- `中文 / EN`
- or a two-state segmented control

The design should communicate “available preference,” not “primary interaction.”

---

## 11. Component Impact

Expected affected areas:

- root layout
- locale provider/hook module
- homepage hero
- homepage feature bento
- demo shell
- scene switcher
- annotation rail
- chat stage
- bilingual copy module
- locale-aware scene data module

The playback engine should need little or no behavior change.

If it needs any changes, they should be limited to consuming locale-aware scene objects safely.

---

## 12. Testing Strategy

### Provider / locale-state tests

Verify:

- default locale is `zh`
- saved locale is restored from `localStorage`
- switching updates `localStorage`
- switching updates `document.documentElement.lang`

### Homepage tests

Verify:

- homepage renders Chinese by default
- switching changes CTA and feature copy to English
- homepage remains on the same route while switching

### Guided demo tests

Verify:

- demo renders Chinese by default
- switching changes scene title, annotation text, and demo controls to English
- replay preserves current locale
- next-scene preserves current locale
- autoplay still advances after locale switch

### Regression coverage

Retain checks that the final product still excludes old surfaces, but make them compatible with the bilingual model.

The regression suite should validate the final bilingual reduced app, not the old transition logic.

---

## 13. Design Constraints

### Preserve the reduced product

Do not reintroduce:

- legacy `LanguageToggle` component patterns
- old `copy.ts`
- old bridge/video route concepts
- old locale-dependent chat-product logic

### Preserve current visual direction

Do not redesign the site again while adding bilingual support.

The current refactored layout, atmosphere, and component hierarchy should remain the baseline.

### Keep boundaries clean

The bilingual layer should be:

- centralized
- predictable
- easy to test

It should not become a new distributed source of copy drift.

---

## 14. Success Criteria

The feature is successful if:

- the refactored branch remains a two-page product
- first load is in Chinese
- switching to English updates homepage and demo content immediately
- the chosen language persists across reloads
- `html lang` follows the active locale
- autoplay and replay continue to work correctly in both languages
- no deleted legacy product surfaces return

---

## 15. Final Direction Summary

BridgeChat should gain back bilingual usability through a focused language layer:

- default Chinese
- persisted user choice
- one lightweight locale state
- one unified bilingual content system
- no revival of the old multi-surface architecture

This keeps the refactored guided-demo product intact while making it usable for both Chinese and English presentation contexts.
