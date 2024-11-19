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
 overflow: hidden;
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

const Prompter = ({ text }) => {
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

 const [fullscreenRef, { toggleFullscreen, isFullscreen }] = useFullscreen();

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
       if (isFullscreen) toggleFullscreen();
       break;
     default:
       break;
   }
 }, [toggleFullscreen, settingsOpen, isFullscreen]);

 useEffect(() => {
   window.addEventListener('keydown', handleKeyPress);
   return () => window.removeEventListener('keydown', handleKeyPress);
 }, [handleKeyPress]);

 const handleReset = () => {
   setIsPlaying(false);
   setProgress(0);
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
       onProgress={setProgress}
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
       isFullscreen={isFullscreen}
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