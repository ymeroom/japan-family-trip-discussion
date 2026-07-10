const trip = window.JAPAN_TRIP;
const stateKey = "japan-family-trip-discussion-v2";
const defaultState = { notes: [] };
const kindLabels = {
  move: "移動日",
  foliage: "賞楓日",
  rest: "慢慢走",
  visit: "一般行程"
};

const cityNav = document.querySelector("[data-city-nav]");
const itineraryHost = document.querySelector("[data-itinerary]");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const form = document.querySelector("[data-discussion-form]");
const daySelect = document.querySelector("[data-day-select]");
const notesHost = document.querySelector("[data-family-notes]");
const summaryBox = document.querySelector("[data-summary]");
const copyButton = document.querySelector("[data-copy-summary]");
const clearButton = document.querySelector("[data-clear]");
const printButton = document.querySelector("[data-print]");

function loadState() {
  try {
    const raw = localStorage.getItem(stateKey);
    const stored = raw ? JSON.parse(raw) : defaultState;
    return { notes: Array.isArray(stored.notes) ? stored.notes : [] };
  } catch {
    return { ...defaultState };
  }
}

function saveState(nextState) {
  localStorage.setItem(stateKey, JSON.stringify(nextState));
}

let appState = loadState();
let activeFilter = "all";

function createCityNav() {
  trip.cities.forEach((city, index) => {
    const link = document.createElement("a");
    link.href = `#${city.id}`;
    link.className = `city-link ${city.accent}`;

    const number = document.createElement("span");
    number.textContent = String(index + 1).padStart(2, "0");

    const label = document.createElement("strong");
    label.textContent = city.name;

    const nights = document.createElement("small");
    nights.textContent = `${city.nights} 晚`;

    link.append(number, label, nights);
    cityNav.append(link);
  });
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

function createCitySection(city, filter) {
  const cityDays = trip.days.filter(
    (day) => day.city === city.id && (filter === "all" || day.kind === filter)
  );

  if (cityDays.length === 0) {
    return null;
  }

  const section = document.createElement("section");
  section.id = city.id;
  section.className = `city-section ${city.accent}`;

  const heading = document.createElement("header");
  heading.className = "city-heading";

  const label = document.createElement("p");
  label.className = "city-dates";
  label.textContent = city.dates;

  const title = document.createElement("h2");
  title.textContent = city.name;

  const nights = document.createElement("p");
  nights.className = "city-nights";
  nights.textContent = `${city.nights} 晚定點慢遊`;
  heading.append(label, title, nights);

  const days = document.createElement("div");
  days.className = "city-days";
  days.append(...cityDays.map(createDayRow));

  section.append(heading, days);
  return section;
}

function renderItinerary() {
  const sections = trip.cities
    .map((city) => createCitySection(city, activeFilter))
    .filter(Boolean);
  itineraryHost.replaceChildren(...sections);
}

function updateFilters() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function populateDaySelect() {
  trip.days.forEach((day) => {
    const option = document.createElement("option");
    option.value = `${day.date} ${day.title}`;
    option.textContent = `${day.date}｜${day.title}`;
    daySelect.append(option);
  });
}

function buildSummary() {
  const lines = [
    trip.tripMeta.title,
    `日期：${trip.tripMeta.start} - ${trip.tripMeta.end}`,
    `路線：${trip.cities.map((city) => `${city.name} ${city.nights}晚`).join(" → ")}`,
    "",
    "家庭留言："
  ];

  if (appState.notes.length === 0) {
    lines.push("還沒有留言。");
  } else {
    appState.notes.forEach((note, index) => {
      lines.push(`${index + 1}. ${note.name}｜${note.day}`);
      lines.push(`   感覺：${note.feeling}`);
      if (note.message) {
        lines.push(`   補充：${note.message}`);
      }
    });
  }

  return lines.join("\n");
}

function renderNotes() {
  notesHost.replaceChildren();

  if (appState.notes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "還沒有留言。看到喜歡或太累的日子，就記一筆。";
    notesHost.append(empty);
    return;
  }

  appState.notes.forEach((note) => {
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
    notesHost.append(card);
  });
}

function renderSummary() {
  summaryBox.value = buildSummary();
}

function renderDiscussion() {
  renderNotes();
  renderSummary();
}

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

  appState.notes = [note, ...appState.notes].slice(0, 12);
  saveState(appState);
  form.reset();
  renderDiscussion();
});

copyButton.addEventListener("click", async () => {
  renderSummary();
  summaryBox.select();

  try {
    await navigator.clipboard.writeText(summaryBox.value);
    copyButton.textContent = "已複製";
    window.setTimeout(() => {
      copyButton.textContent = "複製摘要";
    }, 1600);
  } catch {
    document.execCommand("copy");
  }
});

clearButton.addEventListener("click", () => {
  appState = { notes: [] };
  saveState(appState);
  form.reset();
  renderDiscussion();
});

printButton.addEventListener("click", () => {
  window.print();
});

createCityNav();
populateDaySelect();
renderItinerary();
renderDiscussion();
