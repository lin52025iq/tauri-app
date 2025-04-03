// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs::{File, OpenOptions};
use std::io::Write;

#[tauri::command]
fn create_and_append_file(name: String, data: Vec<u8>) -> Result<String, String> {
    let temp_dir = std::env::temp_dir();
    let file_path = temp_dir.join(&name);

    // Create the file (or truncate if it exists)
    File::create(&file_path).map_err(|e| e.to_string())?;

    // Open in append mode
    let mut file = OpenOptions::new()
        .write(true)
        .append(true)
        .open(&file_path)
        .map_err(|e| e.to_string())?;

    // Write data in chunks to support progress reporting
    let chunk_size = 1024 * 1024; // 1MB chunks
    let mut written = 0;
    let total = data.len();

    while written < total {
        let remaining = total - written;
        let current_chunk_size = chunk_size.min(remaining);
        let chunk = &data[written..written + current_chunk_size];

        file.write_all(chunk).map_err(|e| e.to_string())?;
        written += current_chunk_size;
    }

    Ok(file_path.to_string_lossy().into_owned())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_drag::init())
        .invoke_handler(tauri::generate_handler![create_and_append_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
