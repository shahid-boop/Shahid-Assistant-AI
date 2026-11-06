# Shahid Assistant

A Windows 11 desktop AI assistant built with Tauri 2, React, TypeScript and Rust.

## Current implementation

This repository now contains the first application foundation:
- Tauri 2 desktop shell and native Rust status command.
- React workspace with overview, conversation, task checklist and settings screens.
- Midnight interface with champagne-gold accents and an animated assistant orb.
- Minimal Tauri capability permissions.
- Windows NSIS/MSI build configuration and a GitHub Actions build workflow.

The chat currently runs in local preview mode. Provider API calls, voice capture/playback, wake-word detection, camera/screen understanding, Windows automation, plugin isolation and scheduled background monitoring are **not implemented yet**. The interface does not pretend these systems are active.

## Requirements

- Windows 11
- Node.js 22+
- Rust stable toolchain
- Microsoft C++ Build Tools (MSVC)
- WebView2 Runtime

## Run in development

```powershell
npm install
npm run tauri:dev
```

For browser-only UI preview:

```powershell
npm run dev
```

## Build Windows installers

```powershell
npm run tauri:build
```

Installers are generated under `src-tauri/target/release/bundle/`.

## Security status

- No API keys or secrets belong in Git.
- Desktop automation is disabled until explicit permission controls and audit logging are implemented.
- Provider credentials are not yet persisted by the application.
- Tauri permissions begin with the minimal default capability.

## Development milestones

1. Desktop shell and workspace foundation — started.
2. Secure provider settings and streaming chat.
3. Voice input/output, interruption and wake-word pipeline.
4. Screen/camera context with explicit capture controls.
5. Permission-gated Windows automation and isolated plugin runtime.
6. Durable background tasks and notifications.
7. Automated tests, Windows 11 hardware validation and signed release packaging.

A configured CI workflow can produce installers, but a successful Windows build must be confirmed from an actual Actions run before a release is called verified.
