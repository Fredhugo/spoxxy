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
 transition: color 0.3s, transform 0.3s;
 
 p {
   margin-bottom: 1.5rem;
 }
`;

const ScrollContainer = styled.div`
 height: 100vh;
 overflow: hidden;
 background: ${props => props.isDarkMode ? '#1a1a1a' : 'white'};
 transition: background-color 0.3s;
 touch-action: manipulation;
 
 &::-webkit-scrollbar {
   display: none;
 }
`;

const ProgressIndicator = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 height: 4px;
 background: ${props => props.theme.colors.primary};
 transform: scaleX(${props => props.progress});
 transform-origin: left;
 transition: transform 0.1s linear;
`;

export const PrompterText = ({
 text,
 isPlaying,
 speed,
 fontSize,
 isDarkMode,
 isMirrored,
 onProgress,
 onComplete
}) => {
 const controls = useAnimation();
 const containerRef = useRef(null);
 const startTimeRef = useRef(null);
 const requestRef = useRef(null);

 const animate = (timestamp) => {
   if (!startTimeRef.current) startTimeRef.current = timestamp;
   
   const progress = (timestamp - startTimeRef.current) * speed / 1000;
   const height = containerRef.current.scrollHeight - window.innerHeight;
   const currentPosition = Math.min(progress * 50, height);
   
   containerRef.current.style.transform = `translateY(-${currentPosition}px)`;
   onProgress(currentPosition / height);

   if (currentPosition < height) {
     requestRef.current = requestAnimationFrame(animate);
   } else {
     onComplete();
   }
 };

 useEffect(() => {
   if (isPlaying) {
     requestRef.current = requestAnimationFrame(animate);
   } else {
     cancelAnimationFrame(requestRef.current);
     startTimeRef.current = null;
   }

   return () => {
     if (requestRef.current) {
       cancelAnimationFrame(requestRef.current);
     }
   };
 }, [isPlaying, speed]);

 const handleTouchStart = (e) => {
   if (isPlaying) {
     e.preventDefault();
   }
 };

 return (
   <ScrollContainer 
     isDarkMode={isDarkMode}
     onTouchStart={handleTouchStart}
   >
     <TextContainer
       ref={containerRef}
       fontSize={fontSize}
       isDarkMode={isDarkMode}
       isMirrored={isMirrored}
       initial={{ y: 0 }}
     >
       {text.split('\n\n').map((paragraph, index) => (
         <p key={index}>{paragraph}</p>
       ))}
     </TextContainer>
   </ScrollContainer>
 );
};

export default PrompterText;