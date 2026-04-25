# BridgeChat Demo Spec for Codex

## 0. What this file is

This document is a build brief for Codex. Your job is to implement a **research-driven two-person chat demo** called **BridgeChat**.

This is **not** a matching app and **not** a general social network. It is a **single polished demo prototype** for a class presentation.

The product idea is:

> **Labels can open a conversation, but they should not close understanding.**

The demo should show how personality labels (for example MBTI) can be used as **lightweight conversation cues**, while the interface encourages users to move toward **experience, behavior, and communication preference** rather than stereotyping.

---

## 1. Product goal

Build a **desktop-first interactive web demo** that centers on a **chat interface between two university students**.

The demo should embody these research-informed design principles:

1. **Weak label, strong context**  
   Personality labels are allowed, but should never dominate the UI.
2. **Progressive disclosure**  
   Show only a small amount of profile information at first, then reveal deeper information through interaction.
3. **Conversation over categorization**  
   The system should help users ask better questions, not make stronger assumptions.
4. **Explainable AI assistance**  
   If AI suggests a prompt or rewrite, briefly explain why.
5. **Beyond-the-label reflection**  
   At the end of a short conversation, the system should show what the users learned beyond the initial label.

---

## 2. The final deliverable

Create a polished clickable demo with the following characteristics:

- Looks like a modern chat product
- Works with **mock data only** by default
- Uses local/demo state; no real auth is required
- Includes optional AI integration hooks, but must still function without an API key
- Demonstrates one complete user flow clearly enough for presentation

The deliverable should feel like a **research prototype** rather than a commercial app.

---

## 3. Demo concept

### Product name
**BridgeChat**

### Tagline
**From labels to understanding**

### Core interaction model
The user sees a chat UI between two people. The interface includes:

- a small, lightweight identity strip at the top
- a main chat thread in the center
- a right-side drawer called **Understand More**
- three AI-aided chat helper actions:
  - **Break the Ice**
  - **Go Deeper**
  - **Avoid Assumptions**
- an end-of-chat reflection card:
  - **What you learned beyond the label**

---

## 4. Research findings the demo must embody

The demo is based on the team’s qualitative findings. Design around these insights:

### A. Personality labels are useful as low-cost social signals
They can help reduce awkwardness and provide an initial conversation entry point.

### B. Labels are bridges only when used lightly
They become barriers when they are treated as fixed truths or used for hard judgment.

### C. Deep connection comes from richer signals
Shared interests, concrete experiences, communication style, and values matter more than a label alone.

### D. Better self-presentation is layered
Lightweight label first, then more specific behavior, experiences, and preferences.

### E. The system should reduce stereotype-driven messaging
The UI should gently redirect users from label-based assumptions toward open-ended understanding.

Every screen and feature should reinforce these ideas.

---

## 5. Scope: what to build

Build the following screens / states in a single Next.js app:

1. **Home / Demo intro screen**
2. **Main chat screen**
3. **End-of-chat reflection state**

No need to build onboarding, auth, backend dashboards, or a full social graph.

---

## 6. Recommended stack

Use this stack unless there is a very strong reason not to:

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS**
- **shadcn/ui** for components
- **Motion for React** for subtle transitions and drawer animations
- **Lucide React** for icons
- **Local mock data** in JSON or TS files
- Optional: **Supabase Realtime** if you want live synchronized chat later
- Optional: **OpenAI Responses API** for AI-generated suggestions and rewrites

### Why this stack
- Next.js App Router is current and well-documented for modern React apps.
- shadcn/ui is ideal for customizable polished UI without hiding the code.
- Motion is good for progressive-disclosure animations and subtle microinteractions.
- Supabase Realtime is useful if the prototype later needs real-time message syncing.

---

## 7. Product structure

Use the following route structure:

```txt
/app
  /page.tsx                  -> Landing / intro page
  /demo/page.tsx             -> Main BridgeChat demo
  /layout.tsx
  /globals.css
/components
  /bridgechat
    AppShell.tsx
    ChatHeader.tsx
    ChatThread.tsx
    MessageBubble.tsx
    Composer.tsx
    ActionBar.tsx
    UnderstandDrawer.tsx
    UnderstandingTabs.tsx
    SuggestionCard.tsx
    RewritePopover.tsx
    ReflectionPanel.tsx
    ProgressUnlockBanner.tsx
/lib
  /mock-data.ts
  /types.ts
  /bridgechat-engine.ts
  /ai.ts
  /prompts.ts
  /copy.ts
/public
```

---

## 8. Core screen design

## 8.1 Landing page

Purpose: explain the concept in one screen and give a button to launch the demo.

### Must include
- Product title: **BridgeChat**
- Tagline: **From labels to understanding**
- One-paragraph explanation:
  - This is a research-driven chat prototype
  - It treats personality labels as soft conversation cues, not hard judgments
- A button: **Launch Demo**
- A small section titled **Design Principles** with 4 short chips:
  - Weak label
  - Richer context
  - Better questions
  - Learn beyond the label

### Nice-to-have
- a small mini-mockup illustration of the chat layout
- gentle motion when entering the page

---

## 8.2 Main chat screen

This is the core of the demo.

### Layout
Create a 3-column desktop layout:

- **Left rail**: minimal context / demo controls
- **Center**: main chat interface
- **Right panel**: collapsible **Understand More** drawer

On smaller screens, the right panel can collapse into a sheet.

### 8.2.1 Left rail
Keep it lightweight. Include:

- Demo title
- A small explanation line:  
  `A chat interface designed to move from labels to understanding.`
- Buttons:
  - `Reset demo`
  - `Play guided flow`
  - `Toggle AI mode` (mock / live)

Optional:
- a simple step tracker:
  - Step 1: light cues
  - Step 2: open conversation
  - Step 3: reveal more
  - Step 4: reflect

---

## 8.2.2 Chat header

The chat header should **not** overemphasize MBTI.

### Must include
- avatar for each person
- names (use mock names)
- tiny chips such as:
  - MBTI (optional chip)
  - one interest
  - one conversation preference

Example:
- `INFP`
- `AI + HCI`
- `Prefers specific questions`

### Design rule
These chips must be visually secondary. The names and the existence of the conversation should dominate.

---

## 8.2.3 Chat thread

Build a realistic chat thread with around **6–8 initial messages** pre-seeded in the demo.

The conversation should feel like two university students newly talking.

### Example tone
- casual
- not romantic by default
- slightly thoughtful
- campus / research / club / study context is okay

### Initial seeded conversation goal
The conversation should show:
- a light opening based on shared context
- at least one moment where a stereotype-prone message might happen
- enough content for the drawer and reflection to feel meaningful

### Requirements
- message bubbles
- timestamp or subtle message metadata
- typing-safe layout
- smooth auto-scroll to bottom when new messages are added

---

## 8.2.4 Composer

At the bottom, build a message composer with:

- text input
- send button
- helper hint area above the input

The composer should support the **Avoid Assumptions** flow:

If the user types a stereotype-heavy sentence, the UI should not block it aggressively. Instead, it should show a small suggestion like:

> This message sounds label-based. Want to rephrase it as an open question?

Then provide a one-click rewrite option.

---

## 8.2.5 Action bar

Above the composer, add three clearly styled buttons:

### 1. Break the Ice
Generates a low-pressure opener.

### 2. Go Deeper
Generates a more meaningful follow-up based on the current conversation.

### 3. Avoid Assumptions
Takes either the current draft or the conversation context and proposes a more open-ended phrasing.

Each action should produce a **SuggestionCard** with:
- suggested text
- one-line explanation for why this is a good prompt
- button to insert into composer
- button to dismiss

---

## 8.2.6 Understand More drawer

This is the second most important part of the product after the chat thread.

Create a collapsible right-side drawer titled **Understand More**.

Default state: partially collapsed or compact.

When opened, it contains tabs.

### Tab 1: Common Ground
Show a few chips or cards with concrete shared ground:
- same school context
- both care about research / clubs / presentations
- both prefer lower-pressure conversation

### Tab 2: Beyond the Label
Show richer profile details that go beyond MBTI:
- `How I usually show up in conversations`
- `What people often misunderstand about me`
- `A topic I can talk about for a long time`
- `In group work, I usually…`

These should be written in first-person voice and feel real.

### Tab 3: Ask Better
Display AI-generated or mock-generated question suggestions and their explanations.

Each suggestion should be based on:
- common ground
- prior messages
- communication preference
- NOT on crude MBTI stereotyping

---

## 8.2.7 Progressive reveal mechanic

This is essential.

The UI should reveal more information only after interaction milestones.

### Required unlock flow
At minimum, implement this logic:

- **At start**:
  - show only the tiny header chips
  - `Beyond the Label` content is partially hidden
- **After 2 sent messages by the active user**:
  - unlock 1 additional detail in `Common Ground`
- **After 4 total back-and-forth turns**:
  - unlock `Beyond the Label`
- **After the user uses `Go Deeper` or sends a thoughtful follow-up**:
  - unlock the reflection preview state

Show a subtle banner or micro-animation when something unlocks.

Example:
> You’ve moved beyond first impressions. More context is now available.

---

## 8.2.8 End-of-chat reflection panel

After enough interaction, show a panel at the right or bottom titled:

# What you learned beyond the label

This panel should summarize 3–4 insights such as:
- This person prefers concrete questions over vague small talk.
- Their interest in research comes from curiosity, not just performance.
- Your shared ground is more about communication style and interests than MBTI.
- Your understanding of them has expanded beyond the initial label.

This can be mock-generated or AI-generated.

---

## 9. Required interactions

Implement these interactions even if the AI logic is mocked.

### Interaction 1: Launch demo
User opens the intro screen and clicks `Launch Demo`.

### Interaction 2: Read the lightweight identity strip
User sees that labels are present but visually secondary.

### Interaction 3: Use `Break the Ice`
User clicks the button and gets a thoughtful opener.

### Interaction 4: Message exchange continues
The conversation advances and unlocks more context.

### Interaction 5: User drafts a stereotype-heavy message
The system gently offers a rewrite.

### Interaction 6: User explores `Beyond the Label`
The right drawer reveals richer information.

### Interaction 7: User clicks `Go Deeper`
The system suggests a deeper question plus short explanation.

### Interaction 8: Reflection appears
The interface shows what was learned beyond the label.

This full flow should work smoothly without a backend.

---

## 10. Visual style

Aim for a clean, polished, slightly warm academic-tech look.

### Visual direction
- modern productivity/chat app
- soft neutral background
- subtle accent color, maybe teal / indigo / muted emerald
- high legibility
- rounded cards
- soft shadows
- animated but not flashy

### Important design principle
The UI should visually communicate that **conversation is the primary object** and **labels are secondary metadata**.

---

## 11. Mock data requirements

Create mock data for exactly **2 demo users**.

### User A example structure
```ts
{
  id: "user-a",
  name: "Mina",
  avatar: "/avatars/mina.png",
  label: "INFP",
  interests: ["AI + HCI", "campus media", "music"],
  conversationPreference: "Prefers specific questions",
  beyondLabel: {
    conversationStyle: "I usually warm up after a few messages, especially if the topic is specific.",
    misunderstoodAs: "People sometimes think I'm distant at first, but usually I'm just observing.",
    canTalkForeverAbout: "Why some interfaces make people feel instantly comfortable.",
    groupWorkStyle: "I often start by organizing structure before speaking a lot."
  }
}
```

### User B example structure
Create another user with different but compatible communication signals.

### Seeded message data
Include at least 6–8 messages that already feel plausible.

---

## 12. Behavioral rules for the AI helper

If AI mode is disabled or no API key exists, use deterministic mock rules.

### `Break the Ice`
Generate prompts based on:
- shared interests
- current situation
- communication preference

Avoid:
- “You are INFP so…”
- anything that assumes the label is destiny

### `Go Deeper`
Generate follow-ups that:
- ask about experience
- ask about meaning
- ask about preference in context

Good examples:
- “You mentioned you prefer specific questions — what kind usually makes conversation feel easier for you?”
- “You said people misunderstand you at first. Has that changed since coming to university?”

### `Avoid Assumptions`
Given a draft like:
- “You’re an I person so you probably hate social situations, right?”

Rewrite to something like:
- “Do you usually prefer smaller conversations, or does it depend on the setting?”

### Explanation style
Every suggestion should have a one-sentence explanation like:
- “This question uses a stated preference, not a stereotype.”
- “This follows up on experience instead of assuming personality from a label.”
- “This opens space for the other person to define themselves.”

---

## 13. Logic engine requirements

Create a simple internal engine in `/lib/bridgechat-engine.ts`.

It should handle:

- unlock logic
- suggestion generation (mock mode)
- stereotype detection (heuristic)
- reflection summary generation (mock mode)

### Example heuristic for stereotype detection
If draft text contains phrases like:
- `you are an I`
- `because you're INFP`
- `people like you`
- `your type always`
- `so you must be`

flag it as potentially assumption-heavy.

This does not need to be perfect.

---

## 14. Optional live AI integration

Support an optional environment variable for live AI calls.

### Environment variables
```bash
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5-mini
```

### Required abstraction
Write `/lib/ai.ts` so the app can switch between:
- `mock` mode
- `live` mode

### AI features to support
- icebreaker generation
- deeper follow-up generation
- rewrite suggestion
- reflection summary

### Guardrails for AI prompts
In `/lib/prompts.ts`, include clear instructions:

- treat personality labels as tentative cues, not truths
- prefer interests, experiences, and communication preferences
- do not stereotype or overclaim
- generate open-ended, low-pressure, socially safe wording
- keep outputs concise and presentation-friendly

---

## 15. Suggested prompt templates

### Icebreaker system prompt
```txt
You are helping two university students start a conversation.
Use personality labels only as lightweight context, never as fixed truths.
Prefer shared interests, recent context, or stated communication preferences.
Generate one low-pressure opening message and one short explanation.
Keep the tone natural, warm, and concise.
```

### Deeper question system prompt
```txt
You are helping a user continue a promising early conversation.
Do not stereotype based on MBTI or personality labels.
Ask about experience, meaning, preferences, or real situations.
Generate one thoughtful follow-up question and one short explanation.
```

### Rewrite system prompt
```txt
Rewrite the user's draft so that it becomes more open-ended and less label-based.
Do not shame the user.
Preserve the intent of curiosity.
Generate one rewritten message and one short explanation.
```

### Reflection system prompt
```txt
Summarize what the two users learned about each other beyond the initial label.
Focus on communication style, interests, and concrete personal meaning.
Return 3-4 short bullet points.
```

---

## 16. Motion and transitions

Use Motion for React sparingly but intentionally.

### Required motion moments
- drawer open/close animation
- unlock banner fade/slide in
- suggestion card enter/exit
- reflection panel reveal
- subtle layout transition when tabs change

### Do not do
- heavy parallax
- excessive bouncing
- attention-grabbing motion unrelated to meaning

Motion should support clarity, not spectacle.

---

## 17. Accessibility and UX requirements

The prototype should still be reasonably accessible.

### Must do
- semantic buttons
- visible focus states
- sufficient contrast
- keyboard-friendly interactions where practical
- no information conveyed by color alone

### UX principle
Keep the main task easy: read messages, type, ask better questions, reveal richer context.

---

## 18. Concrete acceptance criteria

The demo is successful if all of the following are true:

### Functional
- user can open the demo
- user can read and send messages locally
- action buttons produce suggestion cards
- stereotype-heavy draft triggers a rewrite suggestion
- drawer reveals richer context over time
- reflection panel appears after enough interaction

### Product
- the interface is clearly centered on chat, not profile matching
- MBTI/label is present but secondary
- the system consistently nudges toward richer understanding
- explanations are brief and useful

### Presentation
- the flow is smooth enough for a live class demo in 2–4 minutes
- visuals look polished
- there are no obvious placeholder blocks that break the illusion

---

## 19. Non-goals

Do **not** build any of the following unless there is extra time:

- authentication
- user accounts
- full database schema
- matching algorithm
- feed/discovery page
- notifications
- settings page
- mobile-native app shell
- actual multi-user networking

This is a focused prototype, not a startup MVP.

---

## 20. Build order

Implement in this order:

### Phase 1
- scaffold Next.js app
- set up Tailwind and shadcn/ui
- create intro page
- create main chat layout

### Phase 2
- add mock users and seed messages
- build chat thread + composer
- build action buttons + suggestion cards

### Phase 3
- build drawer tabs
- implement progressive unlock logic
- implement rewrite suggestion heuristic

### Phase 4
- build reflection panel
- polish layout and motion
- add optional live AI abstraction

### Phase 5
- final presentation polish
- reduce clutter
- ensure guided flow works smoothly

---

## 21. Suggested copy snippets

Use or adapt the following UI copy.

### Intro page blurb
`BridgeChat is a research-driven conversation prototype that treats personality labels as soft cues rather than hard judgments. It helps users move from first impressions to richer understanding.`

### Drawer label
`Understand More`

### Reflection title
`What you learned beyond the label`

### Unlock banner examples
- `More context unlocked.`
- `You’ve moved beyond first impressions.`
- `The conversation now reveals richer understanding.`

### Rewrite hint
`This draft sounds label-based. Want to make it more open-ended?`

---

## 22. Example guided demo flow

Make the app support this exact presentation flow:

1. Presenter opens landing page.
2. Clicks `Launch Demo`.
3. Shows that the header only lightly displays label + interests + preference.
4. Clicks `Break the Ice`.
5. Inserts suggestion and sends message.
6. More context unlocks in the right drawer.
7. Presenter types a stereotype-heavy message draft.
8. `Avoid Assumptions` suggests a better version.
9. Presenter sends or previews a deeper question.
10. Reflection panel appears: `What you learned beyond the label`.

If possible, include a button called `Play guided flow` that highlights these stages automatically.

---

## 23. Code quality expectations

- clean TypeScript types
- reusable components
- readable state logic
- no giant monolithic component if avoidable
- comments only where helpful
- visually consistent spacing, typography, and radius tokens

---

## 24. If time allows

Optional stretch features:

1. **Compare modes toggle**
   - Traditional label-centered chat
   - BridgeChat mode

2. **Confidence/explanation chips**
   Show whether a suggestion is based on:
   - shared interest
   - prior message
   - communication preference

3. **Editable self-description panel**
   Let the user tweak how they want to be understood.

4. **Fake realtime typing effect**
   Make the chat feel more alive.

---

## 25. Source-informed design rationale

These external references informed the product direction. You do not need to quote them in the UI, but keep the ideas aligned:

1. **Progressive disclosure**: show only the most necessary information first, reveal more as needed.
2. **Explainability and trust in AI systems**: AI suggestions should include brief rationale so users understand why the system recommends them.
3. **Modern React app architecture**: use current Next.js App Router patterns.
4. **Customizable UI primitives**: use shadcn/ui rather than black-box UI kits.
5. **Subtle motion**: use Motion for React to support understanding and transitions.
6. **Optional realtime architecture**: Supabase Realtime can support future chat syncing if extended.

---

## 26. References for implementation

Use these references if needed during implementation:

- Next.js App Router docs: https://nextjs.org/docs/app/getting-started
- shadcn/ui docs: https://ui.shadcn.com/docs
- shadcn/ui Next.js install: https://ui.shadcn.com/docs/installation/next
- Motion for React docs: https://motion.dev/docs/react
- Supabase Realtime docs: https://supabase.com/docs/guides/realtime
- NN/g Progressive Disclosure: https://www.nngroup.com/articles/progressive-disclosure/
- Google PAIR Explainability + Trust: https://pair.withgoogle.com/chapter/explainability-trust/

---

## 27. Final instruction to Codex

Implement this as a polished, presentation-ready demo.

Prioritize:
- clarity of concept
- faithfulness to the research findings
- elegance of interaction
- visual polish
- smooth guided flow

Do not overbuild.

The goal is not to ship a social product. The goal is to demonstrate a **research-informed interaction design** that helps users move from labels to understanding.
