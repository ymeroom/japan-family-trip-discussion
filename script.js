const stateKey = "japan-family-trip-discussion";

const defaultState = {
  selectedPlan: "方案 2：本州＋九州舒適版",
  notes: []
};

const planButtons = Array.from(document.querySelectorAll("[data-pick]"));
const form = document.querySelector("[data-discussion-form]");
const notesHost = document.querySelector("[data-family-notes]");
const summaryBox = document.querySelector("[data-summary]");
const copyButton = document.querySelector("[data-copy-summary]");
const clearButton = document.querySelector("[data-clear]");
const printButton = document.querySelector("[data-print]");

function loadState() {
  try {
    const raw = localStorage.getItem(stateKey);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function saveState(nextState) {
  localStorage.setItem(stateKey, JSON.stringify(nextState));
}

let appState = loadState();

function selectedPriorities() {
  return Array.from(form.querySelectorAll('input[name="priority"]:checked')).map((item) => item.value);
}

function buildSummary() {
  const lines = [
    "2026 日本家庭旅行討論摘要",
    "日期：2026/10/30 - 2026/12/02",
    `目前主選：${appState.selectedPlan}`,
    "",
    "建議排序：方案 2 最平衡，方案 3 最孝親，方案 1 最壯遊。",
    ""
  ];

  if (appState.notes.length === 0) {
    lines.push("家人留言：還沒有留言。");
  } else {
    lines.push("家人留言：");
    appState.notes.forEach((note, index) => {
      lines.push(`${index + 1}. ${note.name}：${note.favorite}`);
      lines.push(`   在意：${note.priorities.length ? note.priorities.join("、") : "未填"}`);
      if (note.message) {
        lines.push(`   補充：${note.message}`);
      }
    });
  }

  return lines.join("\n");
}

function renderNotes() {
  notesHost.innerHTML = "";

  if (appState.notes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "還沒有留言。先選一個方案，晚餐時就有東西可以聊。";
    notesHost.append(empty);
    return;
  }

  appState.notes.forEach((note) => {
    const card = document.createElement("article");
    card.className = "note-card";

    const name = document.createElement("strong");
    name.textContent = note.name;

    const favorite = document.createElement("p");
    favorite.textContent = `想選：${note.favorite}`;

    const priorities = document.createElement("small");
    priorities.textContent = `在意：${note.priorities.length ? note.priorities.join("、") : "未填"}`;

    const message = document.createElement("p");
    message.textContent = note.message || "沒有補充。";

    card.append(name, favorite, priorities, message);
    notesHost.append(card);
  });
}

function renderSelection() {
  planButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.pick === appState.selectedPlan);
  });
  form.elements.favorite.value = appState.selectedPlan;
}

function renderSummary() {
  summaryBox.value = buildSummary();
}

function render() {
  renderSelection();
  renderNotes();
  renderSummary();
}

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.selectedPlan = button.dataset.pick;
    saveState(appState);
    render();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const note = {
    name: String(formData.get("name") || "家人").trim() || "家人",
    favorite: String(formData.get("favorite") || appState.selectedPlan),
    priorities: selectedPriorities(),
    message: String(formData.get("note") || "").trim()
  };

  appState.selectedPlan = note.favorite;
  appState.notes = [note, ...appState.notes].slice(0, 8);
  saveState(appState);
  form.reset();
  render();
});

copyButton.addEventListener("click", async () => {
  renderSummary();
  summaryBox.select();

  try {
    await navigator.clipboard.writeText(summaryBox.value);
    copyButton.textContent = "已複製";
    window.setTimeout(() => {
      copyButton.textContent = "複製討論摘要";
    }, 1600);
  } catch {
    document.execCommand("copy");
  }
});

clearButton.addEventListener("click", () => {
  appState = { ...defaultState, notes: [] };
  saveState(appState);
  form.reset();
  render();
});

printButton.addEventListener("click", () => {
  window.print();
});

render();
