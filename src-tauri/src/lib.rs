use serde::Serialize;

#[derive(Serialize)]
struct NativeStatus {
    app: &'static str,
    platform: &'static str,
    version: &'static str,
}

#[tauri::command]
fn get_native_status() -> NativeStatus {
    NativeStatus {
        app: "Shahid Assistant",
        platform: if cfg!(target_os = "windows") { "Windows desktop" } else { "Desktop preview" },
        version: env!("CARGO_PKG_VERSION"),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_native_status])
        .run(tauri::generate_context!())
        .expect("error while running Shahid Assistant");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn native_status_has_expected_identity() {
        let status = get_native_status();
        assert_eq!(status.app, "Shahid Assistant");
        assert_eq!(status.version, env!("CARGO_PKG_VERSION"));
    }
}
