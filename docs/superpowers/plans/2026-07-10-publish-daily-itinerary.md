# Publish Daily Itinerary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved option 2 itinerary into a bright, maple-led, large-text web page for older family members and publish it to the existing GitHub Pages site.

**Architecture:** Keep the site dependency-free. Store the 34-day itinerary in a reusable CommonJS/browser data module, render city sections and filters with vanilla JavaScript, and preserve the existing local family notes. Use a full-bleed autumn photo as the visual anchor and unframed city bands for scanning.

**Tech Stack:** Semantic HTML, CSS, vanilla JavaScript, Node.js built-in test runner, GitHub Pages.

## Global Constraints

- Dates are fixed at 2026-10-30 through 2026-12-02, 34 days and 33 nights.
- Bases are Tokyo 6, Kanazawa 4, Takayama 3, Kyoto 12, Hiroshima 4, Fukuoka 4 nights.
- Do not include Beppu.
- Text must remain comfortably readable for older adults at desktop and mobile widths.
- Show move days, rest days, and foliage-flex days with distinct labels and colors.
- Keep print, copy-summary, and local family-note behavior.
- Do not add runtime dependencies or a build step.

## Visual Direction

- Subject: a family-facing 34-day Japan itinerary; the page's single job is to make each day easy to discuss.
- Palette: maple `#c7332b`, ginkgo `#f2b544`, pine `#1f5b47`, rail `#287aa0`, paper `#fffaf0`, ink `#182026`.
- Type: restrained Ming-style serif for the hero and city names; highly legible Traditional Chinese sans serif for itinerary content; tabular numerals for dates.
- Layout: full-bleed autumn hero, six-stop route ribbon, sticky city navigation, then one full-width city band per base with repeated day rows.
- Signature: the six-stop route ribbon changes from cool Tokyo blue to vivid maple red and gold as the trip moves west.
- Self-critique: the old page's card grid makes three options equally prominent even though option 2 is decided. Replace it with one committed route and flatter itinerary bands; keep decoration concentrated in the hero and route ribbon.

```text
┌──────────────── autumn photograph ────────────────┐
│  34 days / Tokyo in, Fukuoka out / large title   │
└───────────────────────────────────────────────────┘
 Tokyo ─ Kanazawa ─ Takayama ─ Kyoto ─ Hiroshima ─ Fukuoka
 [all] [move days] [rest days]                       print

 TOKYO  6 nights
 10/30  Fri  Arrive and check in                 MOVE
 10/31  Sat  Ueno and museum                     EASY

 KANAZAWA  4 nights
 ...
```

---

### Task 1: Itinerary data contract and tests

**Files:**
- Create: `tests/itinerary.test.js`
- Create: `itinerary-data.js`

**Interfaces:**
- Produces: `tripMeta`, `cities`, and `days`, exported through `module.exports` and assigned to `window.JAPAN_TRIP` in browsers.

- [ ] **Step 1: Write failing data tests**

```js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const trip = require('../itinerary-data.js');

test('contains the approved 34-day route', () => {
  assert.equal(trip.days.length, 34);
  assert.equal(trip.days[0].date, '10/30');
  assert.equal(trip.days.at(-1).date, '12/2');
  assert.deepEqual(trip.cities.map((city) => city.nights), [6, 4, 3, 12, 4, 4]);
});

test('keeps Beppu out and marks special days', () => {
  assert.equal(JSON.stringify(trip).includes('別府'), false);
  assert.ok(trip.days.some((day) => day.kind === 'move'));
  assert.ok(trip.days.some((day) => day.kind === 'rest'));
  assert.ok(trip.days.some((day) => day.kind === 'foliage'));
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/itinerary.test.js`
Expected: FAIL because `itinerary-data.js` does not exist.

- [ ] **Step 3: Add the approved itinerary data**

```js
const JAPAN_TRIP = {
  tripMeta: { start: '2026/10/30', end: '2026/12/02', nights: 33 },
  cities: [{ id: 'tokyo', name: '東京', nights: 6 }],
  days: [{ city: 'tokyo', date: '10/30', weekday: '五', title: '抵達東京、入住', kind: 'move', effort: '低', note: '飯店附近吃飯，不跨區。' }]
};
if (typeof module !== 'undefined') module.exports = JAPAN_TRIP;
if (typeof window !== 'undefined') window.JAPAN_TRIP = JAPAN_TRIP;
```

- [ ] **Step 4: Run the test and verify GREEN**

Run: `node --test tests/itinerary.test.js`
Expected: 2 tests pass, 0 fail.

### Task 2: Committed route page structure and renderer

**Files:**
- Modify: `index.html`
- Modify: `script.js`
- Test: `tests/itinerary.test.js`

**Interfaces:**
- Consumes: `window.JAPAN_TRIP.cities` and `window.JAPAN_TRIP.days`.
- Produces: city navigation links, `.city-section` bands, `.day-row` entries, and `[data-filter]` controls.

- [ ] **Step 1: Add failing source-contract tests**

```js
test('page loads itinerary data before the renderer', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.ok(html.indexOf('itinerary-data.js') < html.indexOf('script.js'));
  assert.match(html, /data-itinerary/);
});
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/itinerary.test.js`
Expected: FAIL because the page has no itinerary host or data script.

- [ ] **Step 3: Replace the three-plan presentation with the approved route**

```html
<nav class="city-nav" data-city-nav aria-label="住宿城市"></nav>
<div class="itinerary-tools" aria-label="行程篩選">
  <button type="button" data-filter="all" aria-pressed="true">全部日程</button>
  <button type="button" data-filter="move">只看移動日</button>
  <button type="button" data-filter="rest">只看休息日</button>
</div>
<div data-itinerary></div>
<script src="itinerary-data.js"></script>
<script src="script.js"></script>
```

- [ ] **Step 4: Render accessible city and day markup**

```js
function renderItinerary(filter = 'all') {
  itineraryHost.replaceChildren(...trip.cities.map((city) => buildCitySection(city, filter)));
}
```

- [ ] **Step 5: Verify GREEN**

Run: `node --test tests/itinerary.test.js`
Expected: all tests pass.

### Task 3: Bright maple visual system and responsive layout

**Files:**
- Modify: `styles.css`
- Modify: `index.html`
- Test: `tests/itinerary.test.js`

**Interfaces:**
- Produces: full-bleed `.trip-hero`, sticky `.city-nav`, readable `.day-row`, color-coded `data-kind` states, and print-expanded itinerary.

- [ ] **Step 1: Add failing visual-contract tests**

```js
test('page exposes large-text and print itinerary styles', () => {
  const css = readFileSync('styles.css', 'utf8');
  assert.match(css, /\.trip-hero/);
  assert.match(css, /\.day-row/);
  assert.match(css, /@media print/);
  assert.match(css, /prefers-reduced-motion/);
});
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/itinerary.test.js`
Expected: FAIL because the new visual classes are absent.

- [ ] **Step 3: Implement the maple-led token system and layout**

```css
:root {
  --maple: #c7332b;
  --ginkgo: #f2b544;
  --pine: #1f5b47;
  --rail: #287aa0;
  --paper: #fffaf0;
  --ink: #182026;
}
.day-row { display: grid; grid-template-columns: 7rem minmax(0, 1fr) auto; }
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto; } }
```

- [ ] **Step 4: Verify GREEN and check CSS syntax**

Run: `node --test tests/itinerary.test.js`
Expected: all tests pass.

### Task 4: Browser verification, commit, and GitHub Pages publication

**Files:**
- Modify as needed from verification: `index.html`, `styles.css`, `script.js`, `itinerary-data.js`

**Interfaces:**
- Produces: public GitHub Pages deployment from `main`.

- [ ] **Step 1: Run static and JavaScript verification**

Run: `node --check script.js`
Expected: exit 0.

Run: `node --check itinerary-data.js`
Expected: exit 0.

Run: `node --test tests/itinerary.test.js`
Expected: all tests pass.

- [ ] **Step 2: Start a local static server and inspect desktop/mobile**

Run: `node -e "/* static server on an available localhost port */"`
Expected: HTTP 200 for `/`, no browser console errors, all 34 day rows rendered, and no overlap at 1440x900 or 390x844.

- [ ] **Step 3: Exercise filters, print button, and family note form**

Expected: filters update visible rows and `aria-pressed`; print opens; a note appears and persists after reload.

- [ ] **Step 4: Commit verified source**

```bash
git add index.html styles.css script.js itinerary-data.js tests/itinerary.test.js docs/superpowers/plans/2026-07-10-publish-daily-itinerary.md
git commit -m "Publish detailed Japan family itinerary"
```

- [ ] **Step 5: Push `main` and verify the public URL**

Run: `git push origin main`
Expected: push succeeds and `https://ymeroom.github.io/japan-family-trip-discussion/` renders the new page.

