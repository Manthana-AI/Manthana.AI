import { useState,useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [isInstalling, setIsInstalling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Check if Ollama is installed when component mounts
  const checkOllamaInstallation = async () => {
    try {
      const installed = await invoke<boolean>('check_ollama_installation');
      setIsInstalled(installed);
    } catch (err) {
      console.error('Error checking installation:', err);
    }
  };

  // Call the installation check when component mounts
  useEffect(() => {
    checkOllamaInstallation();
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    setError(null);
    try {
      await invoke('install_ollama');
      setIsInstalled(true);
    } catch (err) {
      setError(err as string);
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="container">
      <h1>Manthana.AI</h1>

      <div className="installation-container">
        {isInstalled ? (
          <div className="success-message">
            <h2>Ollama is Already Installed</h2>
            <p>You can now close this window and start using Ollama.</p>
            <button onClick={() => window.close()}>Close</button>
          </div>
        ) : (
          <div className="installation-step">
            <h2>Install Ollama</h2>
            <p>Click the button below to start the Ollama installation.</p>
            {error && <p className="error-message">{error}</p>}
            <button
              onClick={handleInstall}
              disabled={isInstalling}
              className="install-button"
            >
              {isInstalling ? 'Installing...' : 'Install Ollama'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

