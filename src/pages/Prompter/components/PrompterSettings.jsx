// src/pages/Prompter/components/PrompterSettings.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SettingsPanel = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 4px rgba(0,0,0,0.1);
  padding: 2rem;
  z-index: 1100;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SettingGroup = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }
`;

const ColorPicker = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const RangeInput = styled.input`
  width: 100%;
  margin: 10px 0;
`;

export const PrompterSettings = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange
}) => (
  <SettingsPanel
    initial={{ x: 300 }}
    animate={{ x: isOpen ? 0 : 300 }}
    transition={{ type: 'spring', damping: 20 }}
  >
    <SettingGroup>
      <h3>Background Color</h3>
      <ColorPicker
        type="color"
        value={settings.backgroundColor}
        onChange={(e) => onSettingsChange('backgroundColor', e.target.value)}
      />
    </SettingGroup>

    <SettingGroup>
      <h3>Text Color</h3>
      <ColorPicker
        type="color"
        value={settings.textColor}
        onChange={(e) => onSettingsChange('textColor', e.target.value)}
      />
    </SettingGroup>

    <SettingGroup>
      <h3>Scroll Smoothness</h3>
      <RangeInput
        type="range"
        min="1"
        max="10"
        value={settings.scrollSmoothness}
        onChange={(e) => onSettingsChange('scrollSmoothness', parseInt(e.target.value))}
      />
    </SettingGroup>
  </SettingsPanel>
);

// src/pages/Prompter/Prompter.jsx
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useFullscreen } from 'react-use';
import { PrompterControls } from './components/PrompterControls';
import { PrompterText } from './components/PrompterText';
import { PrompterSettings } from './components/PrompterSettings';

const PrompterContainer = styled.div`
  position: relative;
  height: 100vh;
  background: ${props => props.isDarkMode ? '#1a1a1a' : 'white'};
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: ${props => props.theme.colors.primary};
  width: ${props => props.progress}%;
  transition: width 0.3s linear;
  z-index: 1000;
`;

const KeyboardShortcuts = {
  SPACE: ' ',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ESCAPE: 'Escape',
  F: 'f',
  M: 'm',
  R: 'r',
};

export const Prompter = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [fontSize, setFontSize] = useState(32);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMirrored, setIsMirrored] = useState(false);
  const [progress, setProgress] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    scrollSmoothness: 5,
  });

  const [fullscreenRef, { toggleFullscreen }] = useFullscreen();

  const handleKeyPress = useCallback((event) => {
    switch (event.key) {
      case KeyboardShortcuts.SPACE:
        setIsPlaying(prev => !prev);
        break;
      case KeyboardShortcuts.ARROW_UP:
        setSpeed(prev => Math.min(prev + 0.1, 2));
        break;
      case KeyboardShortcuts.ARROW_DOWN:
        setSpeed(prev => Math.max(prev - 0.1, 0.5));
        break;
      case KeyboardShortcuts.F:
        toggleFullscreen();
        break;
      case KeyboardShortcuts.M:
        setIsMirrored(prev => !prev);
        break;
      case KeyboardShortcuts.R:
        handleReset();
        break;
      case KeyboardShortcuts.ESCAPE:
        if (settingsOpen) setSettingsOpen(false);
        break;
      default:
        break;
    }
  }, [toggleFullscreen, settingsOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    // Réinitialiser la position du texte
  };

  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleComplete = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  // Gestion des gestes tactiles
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > 50;
    const isSwipeDown = distance < -50;

    if (isSwipeUp) {
      setSpeed(prev => Math.min(prev + 0.1, 2));
    } else if (isSwipeDown) {
      setSpeed(prev => Math.max(prev - 0.1, 0.5));
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <PrompterContainer
      ref={fullscreenRef}
      isDarkMode={isDarkMode}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <ProgressBar progress={progress} />
      
      <PrompterText
        text={text}
        isPlaying={isPlaying}
        speed={speed}
        fontSize={fontSize}
        isDarkMode={isDarkMode}
        isMirrored={isMirrored}
        onComplete={handleComplete}
        style={{
          background: settings.backgroundColor,
          color: settings.textColor,
        }}
      />
      
      <PrompterControls
        isPlaying={isPlaying}
        speed={speed}
        fontSize={fontSize}
        isDarkMode={isDarkMode}
        isMirrored={isMirrored}
        isFullscreen={fullscreenRef.current?.fullscreen}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={handleReset}
        onSpeedChange={setSpeed}
        onFontSizeChange={setFontSize}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onToggleMirror={() => setIsMirrored(!isMirrored)}
        onToggleFullscreen={toggleFullscreen}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      
      <PrompterSettings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </PrompterContainer>
  );
};

export default Prompter;