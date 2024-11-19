// src/pages/Prompter/components/PrompterControls.jsx
import React from 'react';
import styled from 'styled-components';
import { 
  FiPlay, 
  FiPause, 
  FiRotateCcw, 
  FiType, 
  FiMoon, 
  FiMaximize,
  FiMinimize,
  FiPlus,
  FiMinus,
  FiFlip
} from 'react-icons/fi';

const ControlsContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(10px);
  z-index: 1000;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const ControlButton = styled.button`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: white;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    font-size: 1.25rem;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const SpeedControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  
  span {
    min-width: 60px;
    text-align: center;
  }
`;

const FontSizeControl = styled(SpeedControl)``;

export const PrompterControls = ({
  isPlaying,
  speed,
  fontSize,
  isDarkMode,
  isMirrored,
  isFullscreen,
  onTogglePlay,
  onReset,
  onSpeedChange,
  onFontSizeChange,
  onToggleDarkMode,
  onToggleMirror,
  onToggleFullscreen
}) => (
  <ControlsContainer>
    <ControlButton onClick={onTogglePlay}>
      {isPlaying ? <FiPause /> : <FiPlay />}
    </ControlButton>
    
    <ControlButton onClick={onReset}>
      <FiRotateCcw />
    </ControlButton>
    
    <SpeedControl>
      <ControlButton onClick={() => onSpeedChange(speed - 0.1)} disabled={speed <= 0.5}>
        <FiMinus />
      </ControlButton>
      <span>{speed.toFixed(1)}x</span>
      <ControlButton onClick={() => onSpeedChange(speed + 0.1)} disabled={speed >= 2}>
        <FiPlus />
      </ControlButton>
    </SpeedControl>
    
    <FontSizeControl>
      <ControlButton onClick={() => onFontSizeChange(fontSize - 2)} disabled={fontSize <= 16}>
        <FiType />
        <FiMinus />
      </ControlButton>
      <span>{fontSize}px</span>
      <ControlButton onClick={() => onFontSizeChange(fontSize + 2)} disabled={fontSize >= 72}>
        <FiType />
        <FiPlus />
      </ControlButton>
    </FontSizeControl>
    
    <ControlButton onClick={onToggleDarkMode}>
      <FiMoon />
    </ControlButton>
    
    <ControlButton onClick={onToggleMirror}>
      <FiFlip />
    </ControlButton>
    
    <ControlButton onClick={onToggleFullscreen}>
      {isFullscreen ? <FiMinimize /> : <FiMaximize />}
    </ControlButton>
  </ControlsContainer>
);

// src/pages/Prompter/components/PrompterText.jsx
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const TextContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  font-size: ${props => props.fontSize}px;
  color: ${props => props.isDarkMode ? 'white' : 'black'};
  line-height: 1.6;
  transform: ${props => props.isMirrored ? 'scaleX(-1)' : 'none'};
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const ScrollContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  background: ${props => props.isDarkMode ? '#1a1a1a' : 'white'};
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PrompterText = ({
  text,
  isPlaying,
  speed,
  fontSize,
  isDarkMode,
  isMirrored,
  onComplete
}) => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const height = containerRef.current.scrollHeight;
    const duration = height / (50 * speed); // Ajustez 50 selon vos besoins
    
    if (isPlaying) {
      controls.start({
        y: -height,
        transition: {
          duration,
          ease: 'linear'
        }
      });
    } else {
      controls.stop();
    }
  }, [isPlaying, speed, controls]);
  
  const handleAnimationComplete = () => {
    onComplete();
  };

  return (
    <ScrollContainer isDarkMode={isDarkMode}>
      <TextContainer
        ref={containerRef}
        fontSize={fontSize}
        isDarkMode={isDarkMode}
        isMirrored={isMirrored}
        initial={{ y: 0 }}
        animate={controls}
        onAnimationComplete={handleAnimationComplete}
      >
        {text.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </TextContainer>
    </ScrollContainer>
  );
};