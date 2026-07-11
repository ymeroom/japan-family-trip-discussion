const trips = window.JAPAN_TRIPS;
const stateKey = "japan-family-trip-discussion-v3";
const legacyStateKey = "japan-family-trip-discussion-v2";
const planIds = ["plan1", "plan2", "plan3"];
const kindLabels = {
  move: "移動日",
  foliage: "賞楓日",
  rest: "慢慢走",
  visit: "一般行程"
};

const cityNav = document.querySelector("[data-city-nav]");
const itineraryHost = document.querySelector("[data-itinerary]");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const planTabs = Array.from(document.querySelectorAll("[role='tab'][data-plan]"));
const tripPanel = document.querySelector("[role='tabpanel']");
const form = document.querySelector("[data-discussion-form]");
const daySelect = document.querySelector("[data-day-select]");
const notesHost = document.querySelector("[data-family-notes]");
const summaryBox = document.querySelector("[data-summary]");
const copyButton = document.querySelector("[data-copy-summary]");
const clearButton = document.querySelector("[data-clear]");
const printButton = document.querySelector("[data-print]");

function emptyState() {
  return Object.fromEntries(planIds.map((id) => [id, { notes: [] }]));
}

function loadState() {
  const fallback = emptyState();

  try {
    const raw = localStorage.getItem(stateKey);
    if (raw) {
      const stored = JSON.parse(raw);
      planIds.forEach((id) => {
        fallback[id].notes = Array.isArray(stored[id]?.notes) ? stored[id].notes : [];
      });
      return fallback;
    }

    const legacyRaw = localStorage.getItem(legacyStateKey);
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      fallback.plan2.notes = Array.isArray(legacy.notes) ? legacy.notes : [];
      localStorage.setItem(stateKey, JSON.stringify(fallback));
    }
  } catch {
    return fallback;
  }

  return fallback;
}

function saveState() {
  localStorage.setItem(stateKey, JSON.stringify(appState));
}

function getPlanIdFromHash(hash) {
  const candidate = String(hash || "").replace(/^#/, "");
  return Object.hasOwn(trips, candidate) ? candidate : "plan2";
}

let appState = loadState();
let activePlanId = getPlanIdFromHash(window.location.hash);
let activeFilter = "all";

function activeTrip() {
  return trips[activePlanId] || trips.plan2;
}

function renderPlanHeader() {
  const trip = activeTrip();
  const meta = trip.tripMeta;
  document.documentElement.dataset.theme = meta.theme;
  document.title = `${meta.label}｜2026 日本家庭旅行`;
  document.querySelector("meta[name='theme-color']").content = meta.theme === "rail" ? "#176b87" : meta.theme === "pine" ? "#24705a" : "#c7332b";
  document.querySelector("[data-hero-title]").textContent = meta.heroTitle;
  document.querySelector("[data-hero-lead]").textContent = meta.lead;
  document.querySelector("[data-base-count]").textContent = `${trip.cities.length} 個定點`;
  document.querySelector("[data-rhythm]").textContent = meta.rhythm;
  document.querySelector("[data-plan-kicker]").textContent = meta.kicker;
  document.querySelector("[data-route-title]").innerHTML = meta.routeTitle.replace("\n", "<br>");
  document.querySelector("[data-ticket-note]").textContent = trip.ticketNote;

  const notes = trip.routeNotes.map(([label, copy]) => {
    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${label}：`;
    paragraph.append(strong, copy);
    return paragraph;
  });
  document.querySelector("[data-route-notes]").replaceChildren(...notes);

  const rules = trip.travelRules.map(([title, copy]) => {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = title;
    item.append(strong, copy);
    return item;
  });
  document.querySelector("[data-travel-rules]").replaceChildren(...rules);
}

function createCityNav() {
  const links = activeTrip().cities.map((city, index) => {
    const link = document.createElement("a");
    link.href = `#city-${activePlanId}-${city.id}`;
    link.className = `city-link ${city.accent}`;

    const number = document.createElement("span");
    number.textContent = String(index + 1).padStart(2, "0");
    const label = document.createElement("strong");
    label.textContent = city.name;
    const nights = document.createElement("small");
    nights.textContent = `${city.nights} 晚`;
    link.append(number, label, nights);
    return link;
  });
  cityNav.replaceChildren(...links);
}

function createDayRow(day) {
  const row = document.createElement("article");
  row.className = "day-row";
  row.dataset.kind = day.kind;

  const date = document.createElement("div");
  date.className = "day-date";
  const dateText = document.createElement("strong");
  dateText.textContent = day.date;
  const weekday = document.createElement("span");
  weekday.textContent = `星期${day.weekday}`;
  date.append(dateText, weekday);

  const copy = document.createElement("div");
  copy.className = "day-copy";
  const title = document.createElement("h3");
  title.textContent = day.title;
  const note = document.createElement("p");
  note.textContent = day.note;
  copy.append(title, note);

  const badges = document.createElement("div");
  badges.className = "day-badges";
  const kind = document.createElement("span");
  kind.className = `kind-badge ${day.kind}`;
  kind.textContent = kindLabels[day.kind];
  const effort = document.createElement("span");
  effort.className = "effort-badge";
  effort.textContent = `體力 ${day.effort}`;
  badges.append(kind, effort);
  row.append(date, copy, badges);
  return row;
}

function createCitySection(city) {
  const trip = activeTrip();
  const cityDays = trip.days.filter((day) => day.city === city.id && (activeFilter === "all" || day.kind === activeFilter));
  if (cityDays.length === 0) return null;

  const section = document.createElement("section");
  section.id = `city-${activePlanId}-${city.id}`;
  section.className = `city-section ${city.accent}`;
  const heading = document.createElement("header");
  heading.className = "city-heading";
  const dates = document.createElement("p");
  dates.className = "city-dates";
  dates.textContent = city.dates;
  const title = document.createElement("h2");
  title.textContent = city.name;
  const nights = document.createElement("p");
  nights.className = "city-nights";
  nights.textContent = `${city.nights} 晚定點慢遊`;
  heading.append(dates, title, nights);
  const days = document.createElement("div");
  days.className = "city-days";
  days.append(...cityDays.map(createDayRow));
  section.append(heading, days);
  return section;
}

function renderItinerary() {
  const sections = activeTrip().cities.map(createCitySection).filter(Boolean);
  itineraryHost.replaceChildren(...sections);
}

function updateFilters() {
  filterButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter)));
}

function populateDaySelect() {
  const options = activeTrip().days.map((day) => {
    const option = document.createElement("option");
    option.value = `${day.date} ${day.title}`;
    option.textContent = `${day.date}｜${day.title}`;
    return option;
  });
  daySelect.replaceChildren(...options);
}

function currentNotes() {
  return appState[activePlanId].notes;
}

function buildSummary() {
  const trip = activeTrip();
  const lines = [
    trip.tripMeta.title,
    `日期：${trip.tripMeta.start} - ${trip.tripMeta.end}`,
    `路線：${trip.cities.map((city) => `${city.name} ${city.nights}晚`).join(" → ")}`,
    `票券：${trip.ticketNote}`,
    "",
    "家庭留言："
  ];
  const notes = currentNotes();
  if (notes.length === 0) {
    lines.push("還沒有留言。");
  } else {
    notes.forEach((note, index) => {
      lines.push(`${index + 1}. ${note.name}｜${note.day}`);
      lines.push(`   感覺：${note.feeling}`);
      if (note.message) lines.push(`   補充：${note.message}`);
    });
  }
  return lines.join("\n");
}

function renderNotes() {
  const notes = currentNotes();
  if (notes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "這個方案還沒有留言。看到喜歡或太累的日子，就記一筆。";
    notesHost.replaceChildren(empty);
    return;
  }

  const cards = notes.map((note) => {
    const card = document.createElement("article");
    card.className = "note-card";
    const header = document.createElement("div");
    header.className = "note-header";
    const name = document.createElement("strong");
    name.textContent = note.name;
    const feeling = document.createElement("span");
    feeling.textContent = note.feeling;
    header.append(name, feeling);
    const day = document.createElement("p");
    day.className = "note-day";
    day.textContent = note.day;
    const message = document.createElement("p");
    message.textContent = note.message || "沒有補充。";
    card.append(header, day, message);
    return card;
  });
  notesHost.replaceChildren(...cards);
}

function renderDiscussion() {
  renderNotes();
  summaryBox.value = buildSummary();
}

function renderTabs() {
  planTabs.forEach((tab) => {
    const selected = tab.dataset.plan === activePlanId;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  tripPanel.setAttribute("aria-labelledby", `tab-${activePlanId}`);
}

function activatePlan(planId) {
  activePlanId = Object.hasOwn(trips, planId) ? planId : "plan2";
  activeFilter = "all";
  renderTabs();
  updateFilters();
  renderPlanHeader();
  createCityNav();
  populateDaySelect();
  renderItinerary();
  renderDiscussion();
}

planTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    window.location.hash = tab.dataset.plan;
  });
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const nextTab = planTabs[(index + offset + planTabs.length) % planTabs.length];
    window.location.hash = nextTab.dataset.plan;
    nextTab.focus();
  });
});

window.addEventListener("hashchange", () => activatePlan(getPlanIdFromHash(window.location.hash)));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    updateFilters();
    renderItinerary();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const note = {
    name: String(formData.get("name") || "家人").trim() || "家人",
    day: String(formData.get("day") || "未指定日期"),
    feeling: String(formData.get("feeling") || "很喜歡"),
    message: String(formData.get("note") || "").trim()
  };
  appState[activePlanId].notes = [note, ...currentNotes()].slice(0, 12);
  saveState();
  form.reset();
  renderDiscussion();
});

copyButton.addEventListener("click", async () => {
  summaryBox.value = buildSummary();
  summaryBox.select();
  try {
    await navigator.clipboard.writeText(summaryBox.value);
    copyButton.textContent = "已複製";
    window.setTimeout(() => { copyButton.textContent = "複製摘要"; }, 1600);
  } catch {
    document.execCommand("copy");
  }
});

clearButton.addEventListener("click", () => {
  appState[activePlanId] = { notes: [] };
  saveState();
  form.reset();
  renderDiscussion();
});

printButton.addEventListener("click", () => window.print());

if (!Object.hasOwn(trips, String(window.location.hash).replace(/^#/, ""))) {
  window.history.replaceState(null, "", "#plan2");
}
activatePlan(activePlanId);
