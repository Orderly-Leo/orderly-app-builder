use std::fs;
use std::path::Path;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_cli::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_str_md5,
            search_file_by_text,
            get_route_by_component,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_str_md5(str: &str) -> String {
    let digest = md5::compute(str.as_bytes());
    format!("{:x}", digest)
}

#[tauri::command]
fn search_file_by_text(path: String, keyword: String) -> Option<String> {
    fn search_in_directory(dir_path: &Path, keyword: &str) -> Option<String> {
        let mut queue = vec![dir_path.to_path_buf()];

        while let Some(current_path) = queue.pop() {
            if let Ok(entries) = fs::read_dir(&current_path) {
                for entry in entries {
                    if let Ok(entry) = entry {
                        let path = entry.path();

                        if path.is_dir()
                            && path
                                .file_name()
                                .map_or(false, |name| name == "node_modules")
                        {
                            continue;
                        }

                        if path.is_file() {
                            if let Ok(content) = fs::read_to_string(&path) {
                                if content.contains(keyword) {
                                    return Some(path.to_string_lossy().into_owned());
                                }
                            }
                        } else if path.is_dir() {
                            queue.push(path);
                        }
                    }
                }
            }
        }

        None
    }

    search_in_directory(Path::new(&path), &keyword)
}

#[tauri::command]
fn get_route_by_component(path: String, component_names: Vec<String>) -> Vec<String> {
    component_names
        .into_iter()
        .filter_map(|name| search_file_by_text(path.clone(), name))
        .collect()
}
