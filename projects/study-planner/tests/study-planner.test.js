import test from "node:test";
import assert from "node:assert/strict";
import { createTask, filterTasks, isValidDate, parseStoredTasks, sortTasksByDueDate, toggleTask, validateTaskInput } from "../study-planner.js";

const validInput = { title: "  Revise arrays  ", dueDate: "2026-11-02", priority: "high" };
const sampleTasks = [
  { id: "b", title: "Later task", dueDate: "2026-11-03", priority: "low", completed: false, createdAt: "2026-10-01T10:00:00.000Z" },
  { id: "a", title: "Earlier task", dueDate: "2026-11-01", priority: "medium", completed: true, createdAt: "2026-10-01T10:00:00.000Z" },
  { id: "c", title: "Same date, later", dueDate: "2026-11-01", priority: "high", completed: false, createdAt: "2026-10-02T10:00:00.000Z" }
];

test("trims valid task titles and validates priority", () => {
  const result = validateTaskInput(validInput);
  assert.equal(result.valid, true);
  assert.equal(result.value.title, "Revise arrays");
});

test("rejects blank titles, malformed dates, and unsupported priorities", () => {
  const result = validateTaskInput({ title: "  ", dueDate: "2026-02-30", priority: "urgent" });
  assert.equal(result.valid, false);
  assert.deepEqual(Object.keys(result.errors).sort(), ["dueDate", "priority", "title"]);
});

test("validates actual calendar dates", () => {
  assert.equal(isValidDate("2024-02-29"), true);
  assert.equal(isValidDate("2025-02-29"), false);
  assert.equal(isValidDate("2026-2-03"), false);
});

test("creates an incomplete task and exposes validation details", () => {
  const task = createTask(validInput, "fixed-id", "2026-10-18T10:00:00.000Z");
  assert.equal(task.id, "fixed-id");
  assert.equal(task.title, "Revise arrays");
  assert.equal(task.completed, false);
  assert.throws(() => createTask({ ...validInput, title: "" }), (error) => Boolean(error.details.title));
});

test("filters without mutating the original task array", () => {
  const original = [...sampleTasks];
  assert.deepEqual(filterTasks(sampleTasks, "active").map((task) => task.id), ["b", "c"]);
  assert.deepEqual(filterTasks(sampleTasks, "completed").map((task) => task.id), ["a"]);
  assert.deepEqual(sampleTasks, original);
});

test("sorts by due date and breaks ties deterministically", () => {
  assert.deepEqual(sortTasksByDueDate(sampleTasks).map((task) => task.id), ["a", "c", "b"]);
  assert.deepEqual(sampleTasks.map((task) => task.id), ["b", "a", "c"]);
});

test("toggles a matching task without mutating the original", () => {
  const result = toggleTask(sampleTasks, "b");
  assert.equal(result.find((task) => task.id === "b").completed, true);
  assert.equal(result.find((task) => task.id === "a").completed, true);
  assert.notEqual(result[0], sampleTasks[0]);
  assert.equal(sampleTasks[0].completed, false);
});

test("ignores malformed or invalid persisted data safely", () => {
  assert.deepEqual(parseStoredTasks("{broken"), []);
  assert.deepEqual(parseStoredTasks(JSON.stringify({ tasks: [] })), []);
  assert.deepEqual(parseStoredTasks(JSON.stringify([{ ...sampleTasks[0], dueDate: "nope" }])), []);
  assert.equal(parseStoredTasks(JSON.stringify(sampleTasks)).length, 3);
});
