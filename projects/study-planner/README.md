# Study Planner — Project Brief

## Purpose
A small practice project for managing study tasks. This folder currently contains requirements and acceptance criteria, not a completed application.

## MVP requirements
- Create a task with title, due date, and priority.
- List tasks and mark them complete.
- Filter by completion state and sort by due date.
- Validate empty titles and malformed dates.
- Provide useful empty and error states.
- Persist data using a documented storage choice.

## Acceptance criteria
- Empty or whitespace-only titles are rejected with a helpful message.
- Completing a task updates its visible state.
- Filtering does not mutate the underlying task list.
- Sorting is deterministic when dates match.
- Invalid persisted data is handled without crashing the UI.
- Setup and test commands are documented once implementation exists.

## Verification plan
Add unit tests for validation, filtering, sorting, and state transitions. Manually check keyboard use, narrow screens, and persistence after refresh.

> This is a project brief only; no runtime implementation or passing test suite is claimed yet.
