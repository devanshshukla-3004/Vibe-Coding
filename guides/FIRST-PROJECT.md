# Build Your First Mini-Project

Build a simple **personal links page**: a page with your name, a short introduction, and links to websites or projects you want to share. The goal is to learn the build-and-check loop, not to create a perfect portfolio in one prompt.

## What you'll practice

- Turning an idea into clear requirements.
- Asking AI for a plan and small changes.
- Understanding HTML and CSS files.
- Running the result in a browser.
- Testing links and a narrow-screen layout.

## Step 1 — Define the result

Write down these requirements before asking AI to code:

- A page title and your display name.
- A short introduction.
- Three or more links with clear labels.
- A readable layout on desktop and mobile.
- No login, database, analytics, or other features you don't need.

Do not include personal information you don't want public.

## Step 2 — Ask for a plan

Try this prompt in your AI coding tool:

> Help me build a beginner-friendly personal links page using plain HTML and CSS. First, explain the proposed files and give me a short plan. Do not add JavaScript, a backend, a login, or dependencies unless I ask. Keep the code readable and explain the important parts.

Review the plan. If the tool suggests extra complexity, ask it to simplify.

## Step 3 — Build in small steps

Ask the AI to create the first version. Then ask it to explain:

- What the HTML elements represent.
- Which CSS rules control layout, spacing, and typography.
- How to open the page locally.
- What you should inspect before calling it finished.

Don't accept a change you cannot at least roughly explain. Ask questions until the main parts make sense.

## Step 4 — Check it yourself

Open the page in a browser and test each item:

- [ ] The page opens without an obvious error.
- [ ] Your name and introduction are correct.
- [ ] Every link points to the intended destination.
- [ ] Text is readable without horizontal scrolling on a narrow screen.
- [ ] Keyboard focus is visible when tabbing through links.
- [ ] There are no placeholder links or made-up claims.

If something fails, tell the AI what you observed and ask for the smallest fix. Re-test after the change.

## Step 5 — Make one improvement

Choose one improvement, such as adding a section for projects, improving spacing, or adding a light/dark color theme.

Prompt:

> I want to make one change: [describe it]. First tell me which file you will edit and what will change. Keep everything else the same. After the change, explain how I can verify it.

Review the diff and test the result again.

## Step 6 — Save and reflect

If you're using Git, save a commit with a clear message. Otherwise, keep a copy of the working version.

Write down:
- What you built.
- One AI suggestion you changed or rejected.
- One bug or edge case you checked.
- One thing you can explain without asking AI.

## Finished? Keep going

Try the [Build Your Own Project guide](BUILD-YOUR-OWN-PROJECT.md). You can also inspect the [Study Planner example](../projects/study-planner/README.md) when you're ready for a more interactive app.
