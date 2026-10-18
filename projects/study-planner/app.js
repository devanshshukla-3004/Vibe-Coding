import { createTask, filterTasks, parseStoredTasks, sortTasksByDueDate, toggleTask, validateTaskInput } from "./study-planner.js";

const STORAGE_KEY = "vibe-coding-study-planner-v1";
const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const dateInput = document.querySelector("#task-date");
const priorityInput = document.querySelector("#task-priority");
const filterInput = document.querySelector("#task-filter");
const taskList = document.querySelector("#task-list");
const formMessage = document.querySelector("#form-message");
const errors = { title: document.querySelector("#title-error"), dueDate: document.querySelector("#date-error"), priority: document.querySelector("#priority-error") };
let tasks = loadTasks();

dateInput.min = localDateString();
render();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = { title: titleInput.value, dueDate: dateInput.value, priority: priorityInput.value };
  const validation = validateTaskInput(input);
  Object.entries(errors).forEach(([key, element]) => { element.textContent = validation.errors[key] ?? ""; });
  titleInput.setAttribute("aria-invalid", String(Boolean(validation.errors.title)));
  dateInput.setAttribute("aria-invalid", String(Boolean(validation.errors.dueDate)));
  priorityInput.setAttribute("aria-invalid", String(Boolean(validation.errors.priority)));
  if (!validation.valid) {
    formMessage.textContent = "Check the highlighted fields and try again.";
    return;
  }
  tasks = [createTask(input), ...tasks];
  saveTasks();
  form.reset();
  priorityInput.value = "medium";
  dateInput.min = localDateString();
  Object.values(errors).forEach((element) => { element.textContent = ""; });
  [titleInput, dateInput, priorityInput].forEach((element) => element.removeAttribute("aria-invalid"));
  formMessage.textContent = "Task added. One small step at a time.";
  render();
  titleInput.focus();
});

filterInput.addEventListener("change", render);
taskList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-toggle]");
  if (!checkbox) return;
  tasks = toggleTask(tasks, checkbox.dataset.toggle);
  saveTasks();
  render();
});
taskList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete]");
  if (!button) return;
  tasks = tasks.filter((task) => task.id !== button.dataset.delete);
  saveTasks();
  render();
});

function loadTasks() {
  try { return parseStoredTasks(localStorage.getItem(STORAGE_KEY)); }
  catch { return []; }
}
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    formMessage.textContent = "Browser storage is unavailable. Changes may not persist after refresh.";
  }
}
function localDateString() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}
function render() {
  document.querySelector("#total-count").textContent = tasks.length;
  document.querySelector("#active-count").textContent = tasks.filter((task) => !task.completed).length;
  document.querySelector("#completed-count").textContent = tasks.filter((task) => task.completed).length;
  const visible = sortTasksByDueDate(filterTasks(tasks, filterInput.value));
  taskList.replaceChildren();
  if (!visible.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    const icon = document.createElement("div");
    icon.className = "empty-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = filterInput.value === "completed" ? "✓" : "✦";
    const title = document.createElement("strong");
    title.textContent = filterInput.value === "completed" ? "Nothing completed yet" : filterInput.value === "active" ? "You're all caught up" : "A fresh page";
    const description = document.createElement("p");
    description.textContent = filterInput.value === "completed" ? "Finish a task and it will show up here." : filterInput.value === "active" ? "No open tasks. Enjoy the breathing room." : "Add your first task and give your focus a direction.";
    empty.append(icon, title, description);
    taskList.append(empty);
    return;
  }
  for (const task of visible) taskList.append(createTaskElement(task));
}
function createTaskElement(task) {
  const article = document.createElement("article");
  article.className = "task-item" + (task.completed ? " is-complete" : "");
  const checkbox = document.createElement("input");
  checkbox.className = "task-check";
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.dataset.toggle = task.id;
  checkbox.setAttribute("aria-label", "Mark " + task.title + (task.completed ? " incomplete" : " complete"));
  const content = document.createElement("div");
  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = task.title;
  const meta = document.createElement("div");
  meta.className = "task-meta";
  const due = document.createElement("span");
  due.textContent = "Due " + formatDate(task.dueDate);
  const priority = document.createElement("span");
  priority.className = "priority " + task.priority;
  priority.textContent = task.priority;
  meta.append(due, priority);
  content.append(title, meta);
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "delete-button";
  remove.dataset.delete = task.id;
  remove.textContent = "Delete";
  remove.setAttribute("aria-label", "Delete " + task.title);
  article.append(checkbox, content, remove);
  return article;
}
function formatDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
}
