const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");

const trip = require("../itinerary-data.js");

test("contains the approved 34-day route", () => {
  assert.equal(trip.days.length, 34);
  assert.equal(trip.days[0].date, "10/30");
  assert.equal(trip.days.at(-1).date, "12/2");
  assert.deepEqual(
    trip.cities.map((city) => city.nights),
    [6, 4, 3, 12, 4, 4]
  );
});

test("keeps Beppu out and marks special days", () => {
  assert.equal(JSON.stringify(trip).includes("別府"), false);
  assert.ok(trip.days.some((day) => day.kind === "move"));
  assert.ok(trip.days.some((day) => day.kind === "rest"));
  assert.ok(trip.days.some((day) => day.kind === "foliage"));
});

test("page loads itinerary data before the renderer", () => {
  const html = readFileSync("index.html", "utf8");
  assert.ok(html.indexOf("itinerary-data.js") < html.indexOf("script.js"));
  assert.match(html, /data-itinerary/);
  assert.match(html, /data-city-nav/);
  assert.match(html, /data-filter="all"/);
});

test("page exposes large-text and print itinerary styles", () => {
  const css = readFileSync("styles.css", "utf8");
  assert.match(css, /\.trip-hero/);
  assert.match(css, /\.day-row/);
  assert.match(css, /@media print/);
  assert.match(css, /prefers-reduced-motion/);
});
