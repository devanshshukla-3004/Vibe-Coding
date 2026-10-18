# Study Planner — Example Project

A small browser-based task manager included as a learning example. Use it to practice reading AI-assisted code, changing one feature at a time, and verifying behavior.

## Features

- Add a study task with a title, due date, and priority.
- Mark tasks complete and delete them.
- Filter tasks by completion state and sort by due date.
- Validate input and show accessible error messages.
- Save tasks in the current browser using `localStorage`.
- Automated unit tests for the task logic.

**Storage note:** tasks stay in the same browser profile on the same device. There is no account, server-side database, or cross-device sync.

## Run it locally

Requirements: Node.js 20 or newer.

1. Open a terminal in this folder.
2. Run the tests:

   ```bash
   npm test
   ```

3. Open `index.html` in a modern browser to try the app. If your browser restricts JavaScript modules from local files, run a simple local static server from this folder instead (for example, `python -m http.server 8000`) and open `http://localhost:8000`.

## Learn from it

Try these small changes one at a time:

1. Add a category or subject field.
2. Add a filter for priority.
3. Add a friendly message when a task is overdue.
4. Improve the empty state or keyboard accessibility.

For each change: ask AI for a plan, identify the files it expects to edit, implement only that change, run `npm test`, and test it in the browser. Don't assume tests cover every visual or interaction detail.
