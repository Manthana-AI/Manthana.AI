use std::path::PathBuf;
use std::env;

#[tauri::command]
async fn check_ollama_installation() -> Result<bool, String> {
    // Check multiple possible installation paths
    let possible_paths = vec![
        // Program Files path
        std::env::var("ProgramFiles").unwrap_or_default() + "\\Ollama\\ollama.exe",
        // Program Files (x86) path
        std::env::var("ProgramFiles(x86)").unwrap_or_default() + "\\Ollama\\ollama.exe",
        // Local AppData path
        std::env::var("LOCALAPPDATA").unwrap_or_default() + "\\Programs\\Ollama\\ollama.exe",
    ];

    // Check if Ollama exists in any of these locations
    for path in possible_paths {
        if PathBuf::from(path).exists() {
            return Ok(true);
        }
    }
    
    Ok(false)
}

#[tauri::command]
async fn install_ollama(_app: tauri::AppHandle) -> Result<(), String> {
    // Get the current executable's directory
    let current_dir = env::current_dir()
        .map_err(|e| format!("Failed to get current directory: {}", e))?;

    println!("Current directory: {:?}", current_dir);
    
    // Navigate to the binaries folder
    let installer_path = current_dir
    .join("target")
    .join("x86_64-pc-windows-msvc")
    .join("release")
    .join("binaries")
    .join("ollama-x86_64-pc-windows-msvc.exe");

    println!("Looking for installer at: {:?}", installer_path);

    println!("Looking for installer at: {:?}", installer_path);

    if !installer_path.exists() {
        return Err(format!("Installer not found at {:?}", installer_path));
    }

    // Execute the installer with elevation
    let mut cmd = std::process::Command::new("cmd");
    cmd.arg("/C")
        .arg("start")
        .arg("")
        .arg("/wait")
        .arg(&installer_path)
        .arg("/VERYSILENT");

    println!("Executing command: {:?}", cmd);

    let output = cmd.output().map_err(|e| format!("Failed to execute installer: {}", e))?;

    if output.status.success() {
        Ok(())
    } else {
        let error = String::from_utf8_lossy(&output.stderr);
        Err(format!("Installation failed: {}", error))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            check_ollama_installation,
            install_ollama
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}