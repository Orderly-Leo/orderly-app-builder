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
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_str_md5])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

       
}

// #[tauri::command]
// fn parse_css_json(css: String) -> String {
    
// }

// #[tauri::command]
// fn get_md5(path: &str) -> String {
//     let file = tauri::api::file::read(path).unwrap();
//     let md5 = md5::compute(file);
//     format!("{:x}", md5)
// }   

#[tauri::command]
fn get_str_md5(str: &str) -> String {
    let md5 = md5::compute(str.as_bytes());
    format!("{:x}", md5)
}
