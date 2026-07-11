const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");

const trips = require("../itinerary-data.js");

test("exposes the three approved 34-day plans", () => {
  assert.deepEqual(Object.keys(trips), ["plan1", "plan2", "plan3"]);

  Object.values(trips).forEach((trip) => {
    assert.equal(trip.days.length, 34);
    assert.equal(trip.days[0].date, "10/30");
    assert.equal(trip.days.at(-1).date, "12/2");
    assert.equal(trip.tripMeta.nights, 33);
  });

  assert.deepEqual(trips.plan1.cities.map((city) => city.nights), [4, 4, 5, 4, 7, 4, 5]);
  assert.deepEqual(trips.plan2.cities.map((city) => city.nights), [6, 4, 3, 12, 4, 4]);
  assert.deepEqual(trips.plan3.cities.map((city) => city.nights), [10, 6, 7, 10]);
});

test("keeps each route parent-friendly and marks optional effort", () => {
  assert.equal(trips.plan1.days.filter((day) => day.kind === "rest").length >= 5, true);
  assert.match(JSON.stringify(trips.plan1.days), /可選/);
  assert.equal(trips.plan3.days.filter((day) => day.kind === "rest").length >= 4, true);
  assert.match(JSON.stringify(trips.plan3.days), /三選一/);
  assert.equal(trips.plan3.cities.some((city) => city.name === "別府"), false);

  Object.values(trips).forEach((trip) => {
    assert.ok(trip.days.some((day) => day.kind === "move"));
    assert.ok(trip.days.some((day) => day.kind === "rest"));
    assert.ok(trip.days.some((day) => day.kind === "foliage"));
  });
});

test("page loads itinerary data before the renderer", () => {
  const html = readFileSync("index.html", "utf8");
  assert.ok(html.indexOf("itinerary-data.js") < html.indexOf("script.js"));
  assert.match(html, /data-itinerary/);
  assert.match(html, /data-city-nav/);
  assert.match(html, /data-filter="all"/);
});

test("page provides three accessible plan tabs", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /role="tablist"/);
  assert.match(html, /role="tabpanel"/);
  assert.match(html, /data-plan="plan1"/);
  assert.match(html, /data-plan="plan2"/);
  assert.match(html, /data-plan="plan3"/);
});

test("renderer switches plans by hash and scopes stored notes", () => {
  const script = readFileSync("script.js", "utf8");
  assert.match(script, /JAPAN_TRIPS/);
  assert.match(script, /getPlanIdFromHash/);
  assert.match(script, /hashchange/);
  assert.match(script, /ArrowLeft/);
  assert.match(script, /ArrowRight/);
  assert.match(script, /japan-family-trip-discussion-v3/);
  assert.match(script, /activePlanId/);
});

test("page exposes large-text and print itinerary styles", () => {
  const css = readFileSync("styles.css", "utf8");
  assert.match(css, /\.trip-hero/);
  assert.match(css, /\.day-row/);
  assert.match(css, /\.plan-tabs/);
  assert.match(css, /data-theme="rail"/);
  assert.match(css, /data-theme="maple"/);
  assert.match(css, /data-theme="pine"/);
  assert.doesNotMatch(css, /minmax\(8\.5rem, 1fr\)/);
  assert.match(css, /@media print/);
  assert.match(css, /prefers-reduced-motion/);
});
