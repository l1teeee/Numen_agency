# Claude Task: Mobile UX/UI Audit Using UI UX Pro Max

## Goal

Perform a focused mobile UX/UI analysis of the current site. The user feels some parts of the mobile version still do not look right and wants a structured diagnosis before making more changes.

This task is for analysis first. Do not implement design changes unless the user explicitly asks after reviewing the audit.

Project path:

- `c:\Proyects\numen-agency`

Primary files to inspect:

- `src/components/blocks/sections.tsx`
- `src/components/blocks/navbar.tsx`
- `src/components/blocks/sticky-stack.tsx`
- `src/components/blocks/hero-section.tsx`
- `src/components/ui/chat-bubble.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`

Important repo instruction:

- Read `AGENTS.md` before making any code-related recommendation.
- This project uses a Next.js version with changed conventions. If you need to inspect behavior or suggest code-level fixes, read the relevant docs in `node_modules/next/dist/docs/`.

## Required Framework

Use the UI UX Pro Max evaluation framework. Apply these categories in this priority order:

1. Accessibility
2. Touch and interaction
3. Layout and responsive behavior
4. Typography and visual hierarchy
5. Color, contrast, and surface treatment
6. Navigation and sticky/fixed elements
7. Animation and motion
8. Performance and layout stability

The audit should focus on mobile. Desktop is only relevant as a comparison point to avoid recommending changes that break the overall design language.

## Mobile Viewports To Review

Test or visually inspect at least:

- `320x568`
- `360x640`
- `375x667`
- `390x844`
- `414x896`
- `430x932`

Also do one desktop sanity check:

- `1440x900`

## Specific Areas To Review

### 1. Navbar And Section Headers

Evaluate:

- Whether fixed navbar overlaps or visually crowds section headers.
- Whether the navbar feels too large, too centered, or too visually heavy on mobile.
- Whether section labels like `Selected Work`, `How We Work`, `About Numen`, `FAQ`, and `Start a Project` have consistent spacing and scale.
- Whether `pt-24` or current top padding feels elegant or too large.
- Whether sticky section transitions create awkward title positions.

Report:

- Which sections feel cramped or hidden.
- Which exact spacing/typography adjustments you recommend.
- Whether the fix should happen in section shells, navbar sizing, scroll behavior, or a shared mobile section header pattern.

### 2. Selected Work Mobile

Evaluate:

- Featured card hierarchy.
- Project title scale.
- Description length and readability.
- Tag density and wrapping.
- Status pill placement.
- Arrow icon placement.
- Card spacing between projects.
- Whether scroll behavior feels natural inside a sticky full-screen section.
- Whether the chat bubble blocks the last project content.

Report:

- What feels visually weak or unbalanced.
- Whether cards should become more compact, more editorial, more list-like, or more portfolio-like.
- Concrete recommended class-level changes, but do not implement them.

### 3. How We Work Mobile

Evaluate:

- Current icon-led process cards.
- Whether each icon communicates the step clearly.
- Whether the cards feel premium or too generic.
- Whether icon boxes, numbers, titles, and descriptions have the right hierarchy.
- Whether five cards fit comfortably across small devices.
- Whether this section needs a timeline treatment, numbered rail, compact accordion, or refined card list.

Report:

- Whether the current icons should stay or change.
- Which layout direction would look best for Numen's brand.
- Concrete recommended improvements for spacing, icon size, border, background, and text.

### 4. Other Mobile Sections

Review the rest of the mobile page for inconsistencies:

- Services
- About
- Stack
- FAQ
- Contact
- Chat bubble

Look for:

- Text too large or too small.
- Cards inside cards.
- Overcrowded content.
- Bad scroll traps.
- Inconsistent top padding.
- Poor content priority.
- Hard-to-tap interactive elements.
- Elements hidden by the chat bubble.
- Any horizontal scroll.

### 5. Motion And Sticky Behavior

Evaluate:

- Sticky stack behavior on mobile.
- Whether each section being `h-screen` creates content clipping.
- Whether internal scroll areas feel awkward.
- Whether animations make the mobile experience feel slower or more cramped.
- Whether reduced-motion behavior should be improved.

Report:

- Which sections should keep full-screen sticky behavior.
- Which sections may need mobile-specific `min-h-dvh`, natural height, or adjusted overflow.
- Specific risks with nested scrolling on mobile.

## Deliverable

Create a new markdown report:

- `MOBILE_UX_UI_AUDIT_REPORT.md`

The report must include:

1. Executive summary in Spanish.
2. Top 5 mobile UX/UI issues, ordered by severity.
3. Section-by-section findings.
4. Recommended design direction for `Selected Work`.
5. Recommended design direction for `How We Work`.
6. Quick wins that can be implemented safely.
7. Higher-impact redesign ideas that need user approval.
8. Exact viewport notes for the tested sizes.
9. A final prioritized checklist for implementation.

Use concise but specific language. The report should be practical enough that another agent can implement from it.

## Rules

- Do not implement changes in this task.
- Do not modify `src/components/blocks/sections.tsx` or any source file.
- Only create the audit report markdown.
- If screenshots are taken, reference them in the report if saved.
- If the local dev server cannot run, still complete a code-based audit and clearly state that live visual verification was not possible.
- Do not delete this task file unless the user explicitly asks. The deliverable is the audit report.

## Acceptance Criteria

- `MOBILE_UX_UI_AUDIT_REPORT.md` exists.
- The report focuses on mobile UX/UI, not generic code style.
- The report uses UI UX Pro Max categories.
- It includes concrete findings for `Selected Work` and `How We Work`.
- It includes actionable recommendations but no implementation changes.
