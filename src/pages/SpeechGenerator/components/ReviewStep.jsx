// src/pages/SpeechGenerator/components/ReviewStep.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiDownload, FiPlay, FiEdit, FiShare2 } from 'react-icons/fi';

const ReviewContainer = styled(motion.div)`
 background: white;
 border-radius: 12px;
 padding: 2rem;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SpeechContent = styled.div`
 margin-bottom: 2rem;
 padding: 1.5rem;
 border-radius: 8px;
 background: ${props => props.theme.colors.backgroundSecondary};
 font-size: 1.1rem;
 line-height: 1.6;
 white-space: pre-wrap;
`;

const ActionsGrid = styled.div`
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
 gap: 1rem;
 margin-top: 2rem;
`;

const ActionButton = styled.button`
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 0.5rem;
 padding: 1rem;
 border: none;
 border-radius: 8px;
 background: ${props => props.primary ? props.theme.colors.primary : props.theme.colors.backgroundSecondary};
 color: ${props => props.primary ? 'white' : props.theme.colors.text};
 font-weight: 500;
 cursor: pointer;
 transition: all 0.2s;
 
 &:hover {
   transform: translateY(-2px);
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 }
`;

const DownloadOptions = styled(motion.div)`
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
 gap: 1rem;
 margin-top: 1rem;
`;

const FormatButton = styled(ActionButton)`
 background: white;
 border: 1px solid ${props => props.theme.colors.primary};
 color: ${props => props.theme.colors.primary};
 padding: 0.75rem;
 font-size: 0.9rem;
`;

export const ReviewStep = ({ generatedSpeech, onEdit }) => {
 const [showDownloadOptions, setShowDownloadOptions] = React.useState(false);

 const handleDownload = async (format) => {
   try {
     const response = await fetch('YOUR_DOWNLOAD_ENDPOINT', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         text: generatedSpeech,
         format
       })
     });
     
     const blob = await response.blob();
     const url = window.URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = `speech.${format}`;
     a.click();
     window.URL.revokeObjectURL(url);
   } catch (error) {
     console.error('Download error:', error);
   }
 };

 const openPrompter = () => {
   const prompterWindow = window.open('/prompter', '_blank');
   if (prompterWindow) {
     prompterWindow.speechText = generatedSpeech;
   }
 };

 return (
   <ReviewContainer
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
   >
     <SpeechContent>
       {generatedSpeech}
     </SpeechContent>

     <ActionsGrid>
       <ActionButton primary onClick={() => setShowDownloadOptions(!showDownloadOptions)}>
         <FiDownload /> Download
       </ActionButton>
       
       <ActionButton onClick={openPrompter}>
         <FiPlay /> Open Prompter
       </ActionButton>
       
       <ActionButton onClick={onEdit}>
         <FiEdit /> Edit Speech
       </ActionButton>
       
       <ActionButton>
         <FiShare2 /> Share
       </ActionButton>
     </ActionsGrid>

     {showDownloadOptions && (
       <DownloadOptions
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
       >
         <FormatButton onClick={() => handleDownload('pdf')}>
           PDF
         </FormatButton>
         <FormatButton onClick={() => handleDownload('docx')}>
           Word
         </FormatButton>
         <FormatButton onClick={() => handleDownload('txt')}>
           Text
         </FormatButton>
         <FormatButton onClick={() => handleDownload('mp3')}>
           Audio
         </FormatButton>
       </DownloadOptions>
     )}
   </ReviewContainer>
 );
};

export default ReviewStep;