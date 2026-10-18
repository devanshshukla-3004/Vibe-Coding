# Agent Mode Lab: Bounded Work, Human Review

## Objective
Delegate a limited coding task while controlling scope, permissions, and acceptance.

## Before starting
- Create a branch or backup.
- Define allowed files and acceptance criteria.
- Never provide secrets or production credentials.
- Ask for a plan before edits.
- Require approval for destructive or external actions.

## Prompt pattern
"Goal: [specific behavior]. Context: [files and constraints]. Acceptance criteria: [observable checks]. Keep changes within [scope]. Do not add dependencies without explaining why. Propose a plan first and wait for approval. After implementation, summarize changed files, tests run, and remaining risks."

## Review
1. Inspect every changed file and diff.
2. Check for unrelated edits and new dependencies.
3. Run tests and manually exercise the feature.
4. Inspect security-sensitive paths.
5. Revert changes you cannot explain or verify.
6. Record results and unresolved checks.

## Deliverable
Agent task brief, reviewed diff summary, test evidence, and reflection. Success means the change meets criteria and the learner can explain every accepted edit.
