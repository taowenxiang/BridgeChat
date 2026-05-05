# BridgeChat Guided Demo Redesign Spec

## 1. Goal

Refactor BridgeChat from a multi-surface chat prototype into a presentation-first demo site with one clear narrative:

> Labels can open a conversation, but richer understanding comes from shared context, experience, and better prompts.

The final product should support a class presentation by making the story obvious within seconds, not by inviting open-ended exploration.

---

## 2. Product Framing

This project is not being treated as a general chat app, a social product, or a freeform prototype anymore.

It will become a two-page guided exhibition:

1. A concept homepage that explains the research idea and introduces the two core capabilities.
2. A guided demo page that automatically plays the two showcase scenes with synchronized explanation.

The experience should feel curated, legible, and presentation-ready.

---

## 3. Core Features To Keep

Only two showcase features remain in scope.

### Feature 1: Shared-Interest Icebreaker

Purpose:
Help a user start a conversation naturally by surfacing a lightweight shared interest cue.

What the demo should show:
- the user hesitates before sending
- the system notices a possible shared interest
- a soft prompt appears
- the message gets sent
- the other person responds positively

What this demonstrates:
- labels are not the lead actor
- shared context is a better opener than stereotype-based guessing
- the system reduces awkwardness without taking over the conversation

### Feature 2: AI-Guided Deeper Cue

Purpose:
Help a user find a better follow-up angle by extracting a more meaningful conversational cue from the current exchange.

What the demo should show:
- the other person shares a real-life complaint or experience
- the system identifies a deeper conversational hook
- an AI guidance card explains the angle
- the user responds through that angle
- the conversation becomes warmer and more specific

What this demonstrates:
- the system moves from label shorthand toward concrete behavior or experience
- AI support is explainable and lightweight
- the design encourages understanding rather than categorization

---

## 4. Scope To Remove

The following surfaces and behaviors are out of scope and should be removed instead of simplified in place:

- freeform chat product framing
- general message composer and unrestricted manual chat flow
- reply targeting as a core interaction
- the `Understand More` drawer and tab system
- progressive unlock mechanics
- end-of-chat reflection panel
- locale toggle
- demo guide overlay
- any secondary controls that make the demo feel exploratory instead of staged
- any branch that is not directly serving the two showcase scenes

The refactor should reduce both code surface and interaction surface.

---

## 5. Information Architecture

### Route 1: `/`

The homepage exists to explain the concept quickly and transition into the guided demo.

It should include:
- product name
- tagline or one-sentence thesis
- short research framing paragraph
- two feature cards, one for each kept capability
- a compact principles section
- one strong CTA to enter the guided demo

The homepage should not simulate product depth. Its job is orientation.

### Route 2: `/demo`

This page is the main deliverable.

It should include:
- a scene switcher for the two demo scenes
- a progress indicator or step marker
- replay controls
- a synchronized annotation rail
- the chat stage where the automatic demonstration plays

The page should be fully centered around a guided exhibition narrative.

---

## 6. Demo Structure

The guided demo page contains exactly two scenes:

1. `Scene 01: Shared-interest icebreaker`
2. `Scene 02: AI-guided deeper cue`

Each scene is auto-played rather than manually operated.

### Required playback behavior

- scene starts automatically when selected
- steps advance on a timed sequence
- current step is visibly highlighted
- user can replay the current scene
- user can switch to the other scene
- each step updates both the visible chat state and the explanatory annotation

The user should feel like they are watching a designed demonstration, not driving a product demo manually.

---

## 7. Annotation System

The annotation layer is a first-class part of the redesign.

Its job is to explain:
- what is happening on the screen
- why the system intervenes at that moment
- what social friction is being reduced
- how the interaction avoids stereotype-based assumptions

### Annotation behavior

- annotations progress in sync with scene steps
- current annotation is visually active
- previous annotations remain readable as context
- copy should be plain-language and presentation-friendly

Example annotation moments:
- “The system notices a shared interest but keeps the cue lightweight.”
- “This prompt appears after hesitation, nudging the conversation without replacing the user.”
- “The AI focuses on a concrete behavior signal, not on a personality label.”

The annotations should help an audience understand the research intent without needing narration from the presenter.

---

## 8. Visual Direction

### Overall style

The visual language should feel:
- clean
- calm
- editorial
- presentation-ready
- lightly academic-tech rather than startup-generic

### UI composition rules

- use shadcn-style components as the structural base
- use Magic UI / Aceternity sparingly for hero atmosphere, background treatment, bento framing, and subtle motion
- do not turn the entire site into a motion showcase
- keep the chat stage crisp and readable

### Color and mood

Recommended palette direction:
- soft off-white and mist backgrounds
- sage / teal / blue-gray accents
- gentle contrast, not neon

### Motion

Allowed motion:
- page-load reveal
- soft card entrance
- subtle step transitions
- restrained background shimmer or gradient drift in hero sections

Avoid:
- constant moving decorations
- noisy particles across the whole page
- effects that compete with the explanatory story

---

## 9. Layout Direction

### Homepage layout

Recommended structure:
- editorial hero block
- supporting bento area with exactly two feature cards
- small principles strip
- clear CTA into the demo

The homepage should communicate the thesis fast and look polished enough for a class presentation opening slide.

### Demo page layout

Recommended structure:
- top control row for scene switcher, progress, and replay
- left annotation rail
- right main chat stage

The annotation rail explains the scene while the chat stage performs it.

This pairing is the key redesign move.

---

## 10. Content Model

Scene content should be restructured into a small, explicit scripted data model.

Each scene should define:
- scene id
- title
- one-sentence scene purpose
- ordered step list

Each step should define:
- step id
- timing delay
- chat mutation to apply
- annotation title
- annotation body
- optional visual emphasis target

This gives one source of truth for both playback and explanatory UI.

---

## 11. State Model

The new interaction model should not depend on freeform user chat state.

Instead, each scene should run on a guided playback state model.

Recommended state concepts:
- `idle`
- `playing`
- optional `paused` state only if replay controls need explicit interruption handling
- `completed`

Recommended step-level milestones:
- `intro-visible`
- `hint-visible`
- `message-sent`
- `reply-visible`
- `scene-complete`

The exact internal names may change during implementation, but the architecture should remain step-driven and deterministic.

---

## 12. Component Direction

The redesign should favor fewer, narrower components with explicit responsibilities.

Recommended component split:

- `HomeHero`
- `FeatureBento`
- `DemoShell`
- `SceneSwitcher`
- `AutoPlayControls`
- `AnnotationRail`
- `ChatStage`

Recommended supporting libraries/modules:

- `demo-scenes` for scene scripts
- `demo-player` for playback orchestration
- compact shared `types`

The old `AppShell` / `VideoShell` structure should not be the center of the new architecture.
Reusing small pieces is fine, but the overall composition should be rebuilt around the new guided-demo concept.

---

## 13. Reuse Strategy

Reuse selectively:

- avatar assets
- message bubble presentation patterns if still useful
- existing scene copy where it supports the two core scenes
- any stable utility styles that do not carry old product assumptions

Do not preserve complexity just because it already exists.

Delete or replace legacy structures when they obscure the new story.

---

## 14. Success Criteria

The redesign is successful if all of the following are true:

- a first-time viewer can understand the project within one homepage pass
- the demo page showcases exactly two scenes and nothing distracting beyond them
- each scene can play automatically without manual chat interaction
- the audience can understand what each step means through the annotation rail
- the UI looks intentionally redesigned rather than lightly cleaned up
- the final experience feels stronger as a classroom presentation than the current build

---

## 15. Non-Goals

The redesign does not need to:

- support real-time chat
- support broad user input
- preserve all previous demo logic
- simulate a full product ecosystem
- maximize feature count

Clarity and narrative strength matter more than breadth.

---

## 16. Testing Expectations

The implementation should later verify:

- homepage layout on desktop and mobile
- demo page layout on desktop and mobile
- automatic playback sequencing for both scenes
- replay behavior
- scene switching reset behavior
- annotation and chat step synchronization
- no orphaned legacy controls remain visible

---

## 17. Final Direction Summary

BridgeChat will become a polished, guided showcase with:

- a concept-first homepage
- a dedicated guided demo page
- two automatic scenes only
- synchronized annotations explaining every important moment
- a clean shadcn base with restrained atmospheric enhancements

This is a deliberate shift from “prototype with many interaction surfaces” to “curated research presentation with two memorable demonstrations.”
