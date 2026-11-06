import { invoke, isTauri } from "@tauri-apps/api/core";

export type NativeStatus = { app: string; platform: string; version: string };

export async function getNativeStatus(): Promise<NativeStatus> {
  if (!isTauri()) return { app: "Shahid Assistant", platform: "Browser preview", version: "0.1.0" };
  return invoke<NativeStatus>("get_native_status");
}

export { isTauri };