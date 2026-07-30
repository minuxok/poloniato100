# Journey Into mostra_poloniato_2026

*A technical history reconstructed from claude-mem's persistent memory timeline, covering Jul 27–28, 2026.*

## 1. Project Genesis

The project begins at 4:20 PM on July 27, 2026, with a single directive: read `road_map.md` and give an opinion before proceeding (session `a65169a0`, S30). The roadmap describes an NFC-triggered multilingual art-exhibition web app — visitors tap an NFC tag next to a physical artwork and are taken to a mobile page with details and audio narration in their language. Observation **#128** (6:21 PM) records the roadmap review; **#129** immediately follows with the roadmap "enhanced" to add extended language support and a more detailed PWA strategy — the first sign that this was a collaborative design pass, not a rubber-stamp read.

Scaffolding began at 6:23–6:24 PM. The first `npm create vite` attempt was cancelled (**#130**) before a clean scaffold succeeded (**#131**) — a small false start, but the only one in the genesis phase. Dependencies went in at 6:27 PM (**#132**), immediately flagged with 10 high-severity vulnerabilities (**#133**), which were triaged the same minute into a specific chain: a `brace-expansion` DoS and a `react-router` CSRF issue (**#134**). No remediation is recorded in this session — the vulnerabilities were noted and development continued, an early and conscious acceptance of technical debt.

From there the build moved in a tight, numbered "Step N" sequence that the developer clearly used as a working checklist: mock artwork data in `opere.json` (**#135**, Step 3), a Home landing page with routing (**#136**), an ArtworkDetail page with audio playback (**#137**), and router wiring in `App.jsx` (**#138–139**), culminating in a first successful production build at 6:30 PM (**#140**) — nine minutes after the scaffold existed. The founding technical decisions were set in this window: Vite (not Next.js, despite a reference skeleton existing elsewhere in Next.js), React Router for navigation, and a JSON-file mock data layer standing in for a future content source.

## 2. Architectural Evolution

The architecture evolved in two clean phases separated by roughly 15 hours.

**Phase 1 (Jul 27, 6:35–6:41 PM): the PWA layer.** Steps 5–7 added i18next with five languages (**#141**), a `LanguageModal` and `Header` for switching (**#142–143**), a full `App.jsx` refactor to host the modal and layout (**#144–146**, including a rewrite of `App.css` to strip Vite's boilerplate styling in favor of mobile-first CSS), and finally full PWA configuration — service worker plus offline media caching (**#147**). A complete build (**#148**), a mobile-viewport render check (**#149**), and a custom smoke-test script (**#150–151**) closed the phase by 6:41 PM. This is the only phase in the project's history that reads as pure, uninterrupted feature construction — no bugs, no backtracking.

The day ended with light git housekeeping: repo init, staging, and the **initial commit** (`896afcf`, **#152–155**) at 7:05–7:06 PM, followed by a deliberate branching decision — `main` + `dev` (**#156**, ⚖) — establishing a workflow discipline before any further feature work touched the tree.

**Phase 2 (Jul 28, 9:10 AM onward): the NFC integration, and the architecture's real pivot.** The morning session opened not with new code but with an audit: a second, Next.js-based "skeleton" reference project existed with a more complete NFC implementation, and the question was how much of it to port into the Vite app (**#157–160**, S33/S34). This is the project's one real architectural fork — build NFC from scratch, or transplant working logic from a differently-structured sibling project. The transplant path won. `useNfc.js` was ported and adapted for numeric-ID routing under react-router (**#161**), and an `NfcListener.jsx` component followed, wired to i18next (**#162**). Translations grew by five NFC-status keys per language (**#163**), and language detection order was changed to check the `?lang=` URL parameter before `localStorage` (**#164**) — a small but important decision, since NFC tags carry URLs, not app state.

The pivot's second half came later that morning: the ported `useNfc` hook abstraction was **inlined directly into `NfcListener`** and the hook file deleted (**#184–185**, ↻, 9:40 AM). This reverses part of the initial transplant decision — the hook-based structure inherited from the Next.js skeleton was judged unnecessary overhead for a single-consumer component in this codebase, a small but genuine architecture-owns-its-code correction rather than a blind port.

## 3. Key Breakthroughs

Three moments stand out as clear investigation-to-resolution turns:

- **#159–160 (9:11–9:12 AM)** — the architectural audit itself. These are the two most expensive observations in the entire project (23,858 and 19,846 discovery tokens respectively — see §8), because they required holding two full project structures in mind simultaneously and reconciling a data-schema mismatch between them. Everything productive in Phase 2 flows from the conclusions reached here.
- **#178–179 (9:30 AM)** — mid-debugging-saga, the moment the dual-server mystery stopped being mysterious: "Vite auto-fallback explained dual-port configuration" and "dual-tier dev server architecture identified: app on 5173, Vite proxy on 5174." This is the pivot from confusion to a concrete, testable theory (detailed in §6).
- **#186–189 (9:44–9:45 AM)** — after adding `resolve.dedupe` and `optimizeDeps.include` to `vite.config.js`, the production build succeeded, the dev-server module graph was verified clean, and React deduplication was explicitly confirmed. This is the saga's resolution and the clearest "it works now" beat in the timeline.

## 4. Work Patterns

The rhythm is visible almost minute-by-minute because observations are densely timestamped. Jul 27 evening was a single uninterrupted **feature sprint**: roughly two hours (6:21–7:06 PM) moved from a roadmap read to a committed, working PWA skeleton with i18n, routing, and offline caching — 28 observations with no bug-driven detours.

Jul 28 morning shows a different pattern: a short **exploration phase** (9:10–9:13 AM, #157–160, pure discovery — no code changes) followed immediately by a **feature sprint** for the NFC port (9:14–9:16 AM, #161–166), which then ran straight into a **debugging cycle** (9:20–9:33 AM, S35–S37, the dev-server saga), which resolved directly into a **refactoring phase** (9:39–9:45 AM, #182–189, the hook-inlining and Vite config hardening), and closed with **commit/housekeeping** (9:47–9:50 AM, S39–S41). The whole morning — audit through commit — took about 40 minutes, suggesting a workflow where investigation, building, breaking, and fixing happen in one continuous session rather than separated across days.

## 5. Technical Debt

Debt was taken on knowingly, twice, and only partly repaid within this timeline:

- The **10 high-severity npm vulnerabilities** flagged at #133–134 on Jul 27 are never revisited in the observation record. This is open debt as of the last recorded observation.
- The **useNfc hook abstraction**, ported wholesale from the Next.js skeleton at #161, is debt of a different kind — structural debt from copying another codebase's shape rather than this one's. It was repaid same-day, within about 25 minutes of dev-server time, when it was inlined and deleted at #184–185.
- The **dual-Vite-server / duplicate-React-instance** state (§6) is best read as debt accrued silently by leftover background processes from a prior session, not by a coding decision — but it still had to be diagnosed and paid down like any other debt, via explicit `resolve.dedupe`/`optimizeDeps` configuration at #186.

## 6. Challenges and Debugging Sagas

The project's one real saga runs from **S35 to S37** (9:20–9:45 AM, Jul 28) and is worth tracing in full because it's the only multi-step debugging arc in the history.

It starts obliquely: S35 records an attempt to find browser-automation tooling to visually verify the freshly-integrated NFC UI, without success in getting a browser extension connected. That dead end feeds directly into S36, "Diagnose and resolve dual Vite dev server conflict." The investigation opens with a **process inventory** (#174, 9:29 AM) — the developer/agent enumerating what was actually running rather than guessing — followed by killing stray servers (**#175**) and starting fresh with a cleared cache (**#176**). The health check that followed still showed **two active listeners** (**#177**), which could have looked like the same bug recurring. Instead, #178–179 reframe it correctly: this wasn't a leftover-process bug at all, but Vite's own auto-fallback behavior — when 5173 is occupied, Vite silently stands up a second instance on 5174, producing what looks like duplicate app instances but is actually a proxy relationship. Ports were cleared again (**#180**) and a genuinely fresh server started (**#181**), rolling directly into S37, whose stated goal — "fix React duplicate instance errors... verify dependency deduplication works correctly" — shows the diagnosis had shifted from "why are there two servers" to "why does React think there are two copies of itself," a subtler and more consequential question, since duplicate React instances break hooks and context silently rather than with a clear error.

The fix (#184–186) combined two changes: inlining the `useNfc` hook to remove one layer of module indirection, and hardening `vite.config.js` with explicit dedupe/pre-bundling rules. Verification was thorough rather than assumed — a production build (#187), a dev-server module-pipeline check with React/Router/i18n imports confirmed intact (#188), and an explicit re-confirmation that pre-bundling deduplication now held across React modules (#189). The saga closes cleanly with a commit at #190 (9:49 AM) and a same-minute check of git remote status (#191, S40), which found none configured — a minor, unresolved loose end rather than a problem.

## 7. Memory and Continuity

Direct evidence of memory paying off is present but modest, appropriate to a project this young. Observation **#175**'s narrative explicitly frames the stray-server cleanup as clearing "processes running from a previous session" — i.e., the Jul 28 session opened already aware that Jul 27's dev server might still be alive in the background, which is exactly the kind of cross-session state that would otherwise require rediscovery. More broadly, the Jul 28 session's very first moves (#157–160, the skeleton-vs-current audit) read as a session picking up a thread — comparing "current project" against a reference skeleton — that only makes sense if the agent retained an accurate model of what had already been built the night before, rather than re-deriving it from scratch.

## 8. Token Economics & Memory ROI

Queried directly against `observations` (project = `mostra_poloniato_2026`) in `C:\Users\torre\.claude-mem\claude-mem.db`. Note: this database's schema does **not** include a `source_tool` or `source_input_summary` column (confirmed via `PRAGMA table_info`), so the explicit-recall count below relies solely on narrative-text matching, not tool-name filtering — the figure should be read as a lower bound, not a complete count.

**Headline numbers (self-reported by the memory system, from the timeline legend):** 60 compacted observations, 24,715 tokens to read/inject that context, representing 224,028 tokens of original work — an **89% savings** figure, i.e., roughly a 9:1 compression ratio between what it cost to *do* the work and what it costs to *recall* it.

**Independent SQL verification** (64 raw observation rows — slightly more than the 60 in the compacted timeline view, consistent with the timeline's own note that compaction merges/drops a few low-signal entries):

| Metric | Value |
|---|---|
| Total `discovery_tokens` (sum, all obs) | 230,058 |
| Distinct `memory_session_id` (real sessions) | 2 |
| Sub-session checkpoints (S30–S41, within those 2 sessions) | 12 |
| Sessions with context injection available (after the first) | 1 (the Jul 28 session) |
| Avg `discovery_tokens` per observation | 3,594.7 |
| Avg "read" cost per observation (title+subtitle+narrative+facts / 4) | 402.7 |
| Compression ratio (discovery : read) | ≈ 8.9 : 1 |
| Explicit recall events (narrative-text match only) | 1 (#175) |

**Top 5 most expensive observations by `discovery_tokens`** (the highest-value memories — the ones it would cost most to re-derive without memory):

| ID | Title | discovery_tokens |
|---|---|---|
| 159 | Complete architectural audit: skeleton (Next.js) vs. current project (Vite+Router) with component overlap | 23,858 |
| 160 | Current project is advanced in PWA setup but lacks NFC integration; data schema mismatch with skeleton | 19,846 |
| 135 | Step 3 Complete: Mock Artwork Data (opere.json) Created | 12,142 |
| 149 | Application Successfully Renders on Mobile Viewport; Dev Server Operational | 11,198 |
| 129 | Roadmap Enhanced with Extended Language Support and PWA Strategy Details | 10,552 |

Notably, the two most expensive observations in the project's entire 1.5-day history are the skeleton-vs-current architectural audit (#159–160) — confirming §3's identification of that moment as the project's central "aha."

**Per-day breakdown:**

| Day | Observations | Total discovery_tokens | Sessions |
|---|---|---|---|
| 2026-07-27 | 29 | 102,031 | 1 |
| 2026-07-28 | 35 | 128,027 | 1 |

**Passive recall savings estimate:** 1 session with context injection (Jul 28) × avg 50-observation window value (50 × 3,594.7 ≈ 179,735 tokens) × 0.30 relevance factor ≈ **53,920 tokens saved**.

**Explicit recall savings estimate:** with only 1 narrative-detected recall event, at ~10K tokens each, this is a weak signal ≈ **10,000 tokens** — treat as a rough floor, not a confident figure, given the column limitation noted above.

**Net ROI:** (53,920 + 10,000) / 24,715 (total read tokens invested per the system's own accounting) ≈ **2.6×** by this conservative bottom-up formula. This is lower than the system's self-reported 89%-savings / ~9:1 headline figure because the requested formula only credits *one* session's worth of passive injection (there being only one session after the first) and a single detected explicit-recall event — it undercounts by construction for a project this young with only two real sessions. Both figures are reported here rather than reconciled, per instructions not to invent numbers the data doesn't support.

## 9. Timeline Statistics

- **Date range:** 2026-07-27T16:21:26Z to 2026-07-28T07:50:05Z (database) / observations continue in the compacted timeline through roughly 9:50 AM local (10:10 AM GMT+2) — a single calendar-day-and-a-bit span.
- **Total observations:** 64 (raw DB) / 60 (compacted timeline).
- **Real sessions:** 2 (`a65169a0…` Jul 27 evening, `3c7b2318…` Jul 28 morning). **Sub-session checkpoints:** 12 (S30–S41).
- **Breakdown by type** (raw DB): discovery 27, change 19, feature 12, refactor 3, security_alert 2, decision 1.
- **Most active period:** Jul 28 morning, 9:10–9:50 AM — 35 observations and 6 sub-sessions (S33–S41) in roughly 40 minutes, dominated by the NFC integration and the dev-server saga.
- **Longest continuous debugging arc:** S35–S37 (9:20–9:45 AM Jul 28), ~25 minutes, the dual-server/duplicate-React saga detailed in §6.

## 10. Lessons and Meta-Observations

A few threads run through this short history that a new developer should internalize. First, **the project trusts audits before it trusts code** — every major move (the roadmap review, the skeleton-vs-current comparison) is preceded by an explicit discovery pass rather than jumping straight to implementation, and the timeline shows this paid off: the priciest observations in the whole project are audits, not bug fixes, because getting the comparison right up front is what made the subsequent port fast and largely dead-end-free. Second, **ported code gets re-owned, not just reused** — the `useNfc` hook was pulled in from the Next.js skeleton and then deliberately inlined once it no longer fit this codebase's shape, a healthy instinct worth continuing as more of the skeleton gets absorbed. Third, **infrastructure bugs get diagnosed with evidence, not guesses** — the dev-server saga's turning point was a process inventory (#174), not a hunch, and that discipline is what kept a two-headed "duplicate React" symptom from being misattributed to the wrong layer. Finally, two threads are left open at the point this timeline ends: the npm audit vulnerabilities from Jul 27 remain unaddressed, and no git remote existed as of #191 — both are natural next items, not oversights the history hides.
