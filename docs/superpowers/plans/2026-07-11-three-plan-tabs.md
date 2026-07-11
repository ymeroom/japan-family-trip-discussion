# Three Plan Tabs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish all three approved 34-day Japan family itineraries as accessible large-text tabs on the existing GitHub Pages site.

**Architecture:** Replace the single itinerary global with a `plan1`/`plan2`/`plan3` map while keeping the renderer dependency-free. A single active-plan controller reads the URL hash, rerenders the shared page regions, and stores family notes per plan. Existing plan 2 data remains unchanged.

**Tech Stack:** Semantic HTML, CSS, vanilla JavaScript, Node.js built-in test runner, GitHub Pages.

## Global Constraints

- Every plan spans 2026-10-30 through 2026-12-02, 34 days and 33 nights.
- Plan 1 nights are `[4, 4, 5, 4, 7, 4, 5]`.
- Plan 2 nights remain `[6, 4, 3, 12, 4, 4]`.
- Plan 3 nights are `[10, 6, 7, 10]` in Tokyo, Umeda, Kyoto, Fukuoka order.
- Default hash is `#plan2`; valid hashes are `#plan1`, `#plan2`, `#plan3`.
- Notes, filtering, summaries, and print output are scoped to the active plan.
- Keep the existing hero image, large-text layout, no runtime dependencies, and no build step.

---

### Task 1: Multi-plan data contract

**Files:**
- Modify: `tests/itinerary.test.js`
- Modify: `itinerary-data.js`

**Interfaces:**
- Produces: `window.JAPAN_TRIPS` and `module.exports`, both shaped as `{ plan1, plan2, plan3 }`.
- Each plan exposes `id`, `tripMeta`, `cities`, `days`, `routeNotes`, `travelRules`, and `ticketNote`.

- [ ] **Step 1: Replace single-plan tests with failing multi-plan tests**

```js
const trips = require("../itinerary-data.js");

test("contains three approved 34-day plans", () => {
  assert.deepEqual(Object.keys(trips), ["plan1", "plan2", "plan3"]);
  Object.values(trips).forEach((trip) => {
    assert.equal(trip.days.length, 34);
    assert.equal(trip.days[0].date, "10/30");
    assert.equal(trip.days.at(-1).date, "12/2");
  });
});

test("preserves each approved accommodation pattern", () => {
  assert.deepEqual(trips.plan1.cities.map((city) => city.nights), [4, 4, 5, 4, 7, 4, 5]);
  assert.deepEqual(trips.plan2.cities.map((city) => city.nights), [6, 4, 3, 12, 4, 4]);
  assert.deepEqual(trips.plan3.cities.map((city) => city.nights), [10, 6, 7, 10]);
});
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/itinerary.test.js`
Expected: FAIL because the existing export is one plan rather than three.

- [ ] **Step 3: Add plan metadata and approved plan 1/3 day data**

```js
const JAPAN_TRIPS = {
  plan1: { id: "plan1", tripMeta: { title: "完整環日本壯遊版", theme: "rail" }, cities: [], days: [] },
  plan2: { id: "plan2", tripMeta: { title: "楓葉平衡版", theme: "maple" }, cities: [], days: [] },
  plan3: { id: "plan3", tripMeta: { title: "三大區域孝親版", theme: "pine" }, cities: [], days: [] }
};
```

- [ ] **Step 4: Verify GREEN**

Run: `node --test tests/itinerary.test.js`
Expected: all data tests pass.

### Task 2: Hash tabs and active-plan rendering

**Files:**
- Modify: `index.html`
- Modify: `script.js`
- Modify: `tests/itinerary.test.js`

**Interfaces:**
- Consumes: `window.JAPAN_TRIPS`.
- Produces: `getPlanIdFromHash(hash)`, `activatePlan(planId)`, a semantic tablist, and plan-scoped local storage `{ plan1: {notes: []}, plan2: {notes: []}, plan3: {notes: []} }`.

- [ ] **Step 1: Add failing tab source-contract tests**

```js
test("page exposes three semantic plan tabs", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /role="tablist"/);
  assert.equal((html.match(/role="tab"/g) || []).length, 3);
  assert.match(html, /data-plan="plan1"/);
  assert.match(html, /data-plan="plan2"/);
  assert.match(html, /data-plan="plan3"/);
});
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/itinerary.test.js`
Expected: FAIL because the tablist is absent.

- [ ] **Step 3: Add tab markup**

```html
<div class="plan-tabs" role="tablist" aria-label="選擇旅行方案">
  <button role="tab" data-plan="plan1" aria-selected="false">方案 1｜壯遊版</button>
  <button role="tab" data-plan="plan2" aria-selected="true">方案 2｜平衡版</button>
  <button role="tab" data-plan="plan3" aria-selected="false">方案 3｜孝親版</button>
</div>
<div role="tabpanel" data-plan-panel></div>
```

- [ ] **Step 4: Implement hash selection, keyboard arrows, and rerendering**

```js
function getPlanIdFromHash(hash) {
  const id = hash.replace("#", "");
  return Object.hasOwn(trips, id) ? id : "plan2";
}

function activatePlan(planId) {
  activePlanId = Object.hasOwn(trips, planId) ? planId : "plan2";
  trip = trips[activePlanId];
  activeFilter = "all";
  renderPage();
}
```

- [ ] **Step 5: Preserve old notes under plan 2 and scope new notes by plan**

```js
const defaultState = {
  plan1: { notes: [] },
  plan2: { notes: [] },
  plan3: { notes: [] }
};
```

- [ ] **Step 6: Verify GREEN**

Run: `node --test tests/itinerary.test.js`
Expected: all tests pass.

### Task 3: Three-theme visual and accessible states

**Files:**
- Modify: `styles.css`
- Modify: `tests/itinerary.test.js`

**Interfaces:**
- Produces: `.plan-tabs`, `.plan-tab`, `[data-theme="rail"]`, `[data-theme="maple"]`, and `[data-theme="pine"]` styling with stable mobile dimensions.

- [ ] **Step 1: Add failing theme-contract test**

```js
test("styles all plan themes and selected tabs", () => {
  const css = readFileSync("styles.css", "utf8");
  assert.match(css, /\.plan-tabs/);
  assert.match(css, /data-theme="rail"/);
  assert.match(css, /data-theme="maple"/);
  assert.match(css, /data-theme="pine"/);
  assert.match(css, /aria-selected="true"/);
});
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/itinerary.test.js`
Expected: FAIL because three-theme tab styles do not exist.

- [ ] **Step 3: Add the restrained theme tokens and responsive tab layout**

```css
.plan-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.plan-tab[aria-selected="true"] { color: #fff; background: var(--active-plan); }
[data-theme="rail"] { --active-plan: var(--rail); }
[data-theme="maple"] { --active-plan: var(--maple); }
[data-theme="pine"] { --active-plan: var(--pine); }
```

- [ ] **Step 4: Verify GREEN**

Run: `node --test tests/itinerary.test.js`
Expected: all tests pass.

### Task 4: Verification and publication

**Files:**
- Modify if verification requires: `index.html`, `styles.css`, `script.js`, `itinerary-data.js`, `README.md`

- [ ] **Step 1: Run complete static verification**

Run: `node --test tests/itinerary.test.js`
Expected: all tests pass.

Run: `node --check script.js`
Expected: exit 0.

Run: `node --check itinerary-data.js`
Expected: exit 0.

Run: `git diff --check`
Expected: exit 0.

- [ ] **Step 2: Verify the public behavior after deployment**

Check `#plan1`, `#plan2`, and `#plan3` for correct day counts, selected-tab state, city counts, no horizontal overflow, and no console errors. Exercise one filter and one local note in two different plans to confirm isolation.

- [ ] **Step 3: Commit and push**

```bash
git add index.html styles.css script.js itinerary-data.js README.md tests/itinerary.test.js docs/superpowers/plans/2026-07-11-three-plan-tabs.md
git commit -m "Publish three Japan family trip plans"
git push origin main
```

- [ ] **Step 4: Confirm GitHub Pages**

Expected: Pages status is `built`, and `https://ymeroom.github.io/japan-family-trip-discussion/#plan1`, `#plan2`, and `#plan3` load the intended plan.

