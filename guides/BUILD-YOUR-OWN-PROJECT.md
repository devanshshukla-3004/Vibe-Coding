# Build Your Own Project

Use this guide when you have an idea and want to turn it into a working project with help from an AI coding assistant.

## 1. Start with a real, small problem

Complete this sentence:

> I want to build [thing] for [person] so they can [useful outcome].

Pick one main user and one main workflow. Avoid starting with a long list of features.

## 2. Write a short project brief

Answer these questions before generating code:

- **User:** Who is it for?
- **Problem:** What is difficult or annoying today?
- **Outcome:** What should become easier?
- **Must have:** What are the three most important behaviors?
- **Not now:** What features are intentionally excluded?
- **Data:** What information does it use, and where will it be stored?
- **Success:** How will you prove the main workflow works?

You can copy the [project brief template](../templates/PROJECT-BRIEF.md).

## 3. Ask AI to plan before coding

Use this prompt:

> I want to build [project] for [user]. Here are my requirements: [paste your brief]. First, check for unclear or conflicting requirements and ask me about important gaps. Then propose the simplest suitable technology and a step-by-step plan. Identify risks, files, and how we will test the main workflow. Do not start implementing until we agree on the plan.

Choose tools based on the project needs, your current skills, and what you can realistically run and maintain. Do not add a database, authentication, payments, or external integrations without a clear reason.

## 4. Build one milestone at a time

For each milestone:

1. State the exact behavior you want.
2. Ask AI to implement only that slice.
3. Read the changed files and ask about anything unfamiliar.
4. Run the app and the relevant checks.
5. Try a normal case and at least one edge case.
6. Fix problems before moving to the next milestone.
7. Save a Git commit when the project is in a working state.

If the AI changes many unrelated files, ask it to stop and explain the diff before continuing.

## 5. Test behavior, not just appearance

Examples of useful checks:

- Empty or invalid input.
- Unexpected values.
- Refreshing the page or restarting the app.
- A narrow screen and keyboard-only use.
- Network or storage failure when relevant.
- Permission and privacy boundaries when handling data.

Automated tests are useful, but they do not replace trying the app yourself. Record what you actually tested and any remaining limitations.

## 6. Finish and share responsibly

Before sharing:

- [ ] A new user can follow the setup instructions.
- [ ] The main workflow works in your own test.
- [ ] Relevant automated tests pass, if provided.
- [ ] No secrets, credentials, or private data are committed.
- [ ] The README explains the purpose, setup, usage, and known limitations.
- [ ] Screenshots or demos reflect the real running project.
- [ ] You can explain the main design choices and important files.

If you deploy the project, check the public URL and understand which data is public. Never claim deployment or testing succeeded without checking it.

## 7. Learn from the build

Write a short retrospective:

- What did I build and for whom?
- What did AI help with?
- What did I correct, reject, or verify?
- What can I now explain independently?
- What is the next most useful improvement?

The goal is not to make AI do everything. The goal is to get better at turning ideas into software you understand and can improve.
