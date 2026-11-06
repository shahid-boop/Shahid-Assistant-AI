# Shahid Assistant — Agent Instructions

## Project intent
Build Shahid Assistant as a Windows 11 desktop AI assistant. Treat the architecture diagram and the user's latest requirements as the source of truth when they are supplied in this repository.

## Non-negotiable repository safety
- Work only in the branch explicitly selected by the user. The user has explicitly authorized work on `main` for this setup.
- Never force-push, reset, rebase shared history, delete branches, or rewrite commits.
- Never delete, rename, overwrite, or replace existing files/features/configuration/workflows without explicit approval.
- Before editing an existing file, inspect its full current contents and make the smallest compatible change.
- Do not use broad destructive shell commands (for example recursive delete, clean, or reset).
- Do not commit secrets, tokens, credentials, private keys, or populated local environment files.
- Do not claim a build, test, runtime check, or Windows hardware integration passed unless it was actually run and its result inspected.

## Multi-agent workflow
1. Orchestrator inspects repository state and decomposes work.
2. Architect documents boundaries, interfaces, data flow, and risks before major implementation.
3. Specialists work only within assigned scope and coordinate shared interfaces.
4. Reviewer independently checks correctness, compatibility, security, and unintended changes.
5. Tester runs available automated checks and records exact commands/results.
6. Security reviews permissions, secrets, plugin isolation, and OS automation safeguards.
7. Release prepares packaging only after review and tests.

## Collaboration rules
- Prefer parallel work only for independent tasks; serialize edits to shared files.
- Each task must state scope, acceptance criteria, files allowed to change, and verification.
- Do not invent APIs, dependencies, credentials, or completed features.
- If a required source file, diagram, credential, device, or Windows environment is unavailable, report the blocker and continue with safe work that does not depend on it.
- Keep a concise change log and list remaining work.

## Quality gates
- Inspect `git status` and the diff before committing.
- Run the repository's actual lint, typecheck, unit, integration, and build commands when present.
- Add or update tests for behavior changes.
- Report skipped checks explicitly with reasons.
- Never merge or publish a release without the user's explicit approval.
