// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs::{create_dir_all, remove_file, File, OpenOptions};
use std::io::Write;
use std::path::Path;
use tauri::Manager;

#[tauri::command]
fn create_and_append_file(
    app_handle: tauri::AppHandle, // tauri 自动注入
    name: String,
    data: Vec<u8>,
) -> Result<String, String> {
    // 获取资源目录
    let resource_dir: std::path::PathBuf = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?
        .join("temp");

    create_dir_all(&resource_dir).map_err(|e| e.to_string())?;

    let file_path = resource_dir.join(&name);

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

#[tauri::command]
async fn delete_file(file_path: String) -> Result<(), String> {
    let path = Path::new(&file_path);

    // 检查文件是否存在
    if !path.exists() {
        return Err(format!("文件不存在: {}", file_path));
    }

    // 检查是否是文件（不是目录）
    if !path.is_file() {
        return Err(format!("路径不是文件: {}", file_path));
    }

    // 删除文件
    remove_file(path).map_err(|e| e.to_string())?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_drag::init())
        .invoke_handler(tauri::generate_handler![create_and_append_file, delete_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
