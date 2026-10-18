const PRIORITIES = new Set(["low", "medium", "high"]);

export function validateTaskInput(input) {
  const errors = {};
  const title = typeof input?.title === "string" ? input.title.trim() : "";
  const dueDate = typeof input?.dueDate === "string" ? input.dueDate : "";
  const priority = typeof input?.priority === "string" ? input.priority : "";
  if (!title) errors.title = "Enter a task title.";
  if (!isValidDate(dueDate)) errors.dueDate = "Choose a valid due date.";
  if (!PRIORITIES.has(priority)) errors.priority = "Choose a valid priority.";
  return { valid: Object.keys(errors).length === 0, errors, value: { title, dueDate, priority } };
}

export function isValidDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function createTask(input, id = makeId(), createdAt = new Date().toISOString()) {
  const result = validateTaskInput(input);
  if (!result.valid) {
    const error = new Error("Please correct the task details.");
    error.details = result.errors;
    throw error;
  }
  return { id, ...result.value, completed: false, createdAt };
}

export function toggleTask(tasks, id) {
  return tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
}

export function filterTasks(tasks, filter = "all") {
  if (filter === "active") return tasks.filter((task) => !task.completed);
  if (filter === "completed") return tasks.filter((task) => task.completed);
  return [...tasks];
}

export function sortTasksByDueDate(tasks) {
  return [...tasks].sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
}

export function parseStoredTasks(raw) {
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStoredTask);
  } catch {
    return [];
  }
}

function isStoredTask(task) {
  return task && typeof task === "object" && typeof task.id === "string" && task.id.length > 0 &&
    typeof task.title === "string" && task.title.trim().length > 0 && isValidDate(task.dueDate) &&
    PRIORITIES.has(task.priority) && typeof task.completed === "boolean" && typeof task.createdAt === "string";
}

function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? "task-" + Date.now() + "-" + Math.random().toString(16).slice(2);
}
