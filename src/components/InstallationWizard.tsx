import React, { useState, useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";

type InstallationStep = 'welcome' | 'install' | 'complete' | 'already-installed';

const InstallationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<InstallationStep>('welcome');
  const [isInstalling, setIsInstalling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Ollama is already installed on component mount
    checkOllamaInstallation();
  }, []);

  const checkOllamaInstallation = async () => {
    try {
      const isInstalled = await invoke('check_ollama_installation');
      if (isInstalled) {
        setCurrentStep('already-installed');
      }
    } catch (err) {
      console.error('Error checking Ollama installation:', err);
    }
  };

  const handleInstallOllama = async () => {
    setIsInstalling(true);
    setError(null);
    
    try {
      await invoke('install_ollama');
      setCurrentStep('complete');
    } catch (err) {
      setError(err as string);
    } finally {
      setIsInstalling(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className="installation-step">
            <h2>Welcome to Manthana.AI</h2>
            <p>This wizard will help you install Ollama on your local machine.</p>
            <button 
              onClick={() => setCurrentStep('install')}
              className="primary-button"
            >
              Next
            </button>
          </div>
        );

      case 'install':
        return (
          <div className="installation-step">
            <h2>Install Ollama</h2>
            <p>Click the button below to start the Ollama installation.</p>
            {error && <p className="error-message">{error}</p>}
            <button 
              onClick={handleInstallOllama}
              disabled={isInstalling}
              className="primary-button"
            >
              {isInstalling ? 'Installing...' : 'Install Ollama'}
            </button>
          </div>
        );

      case 'complete':
        return (
          <div className="installation-step">
            <h2>Installation Complete</h2>
            <p>Ollama has been successfully installed on your system!</p>
            <button 
              onClick={() => window.close()}
              className="primary-button"
            >
              Close
            </button>
          </div>
        );

      case 'already-installed':
        return (
          <div className="installation-step">
            <h2>Ollama is Already Installed</h2>
            <p>Ollama is already installed on your system.</p>
            <button 
              onClick={() => window.close()}
              className="primary-button"
            >
              Close
            </button>
          </div>
        );
    }
  };

  return (
    <div className="installation-wizard">
      {renderStep()}
    </div>
  );
};

export default InstallationWizard;