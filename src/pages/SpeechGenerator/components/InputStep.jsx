// src/pages/SpeechGenerator/components/InputStep.jsx
import React from 'react';
import styled from 'styled-components';
import { FiUpload, FiCopy, FiEdit } from 'react-icons/fi';

const InputContainer = styled.div`
 background: white;
 border-radius: 12px;
 padding: 2rem;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const InputOptions = styled.div`
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 1rem;
 margin-bottom: 2rem;
 
 @media (max-width: 768px) {
   grid-template-columns: 1fr;
 }
`;

const InputOption = styled.button`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 padding: 2rem;
 border: 2px dashed ${props => props.active ? props.theme.colors.primary : '#e1e1e1'};
 border-radius: 8px;
 background: ${props => props.active ? props.theme.colors.primary + '10' : 'white'};
 cursor: pointer;
 transition: all 0.2s;
 
 svg {
   font-size: 2rem;
   margin-bottom: 1rem;
   color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary};
 }
 
 &:hover {
   border-color: ${props => props.theme.colors.primary};
   background: ${props => props.theme.colors.primary + '10'};
 }
`;

const TextArea = styled.textarea`
 width: 100%;
 min-height: 300px;
 padding: 1rem;
 border: 2px solid #e1e1e1;
 border-radius: 8px;
 font-size: 1rem;
 resize: vertical;
 
 &:focus {
   border-color: ${props => props.theme.colors.primary};
   outline: none;
 }
`;

const FileInput = styled.input`
 display: none;
`;

const InputPreview = styled.div`
 margin-top: 1rem;
 padding: 1rem;
 background: ${props => props.theme.colors.backgroundSecondary};
 border-radius: 8px;
 font-size: 0.9rem;
`;

export const InputStep = ({ onInputChange, inputMethod, setInputMethod }) => {
 const handleFileUpload = (event) => {
   const file = event.target.files[0];
   const reader = new FileReader();
   reader.onload = (e) => {
     onInputChange(e.target.result);
   };
   reader.readAsText(file);
 };

 const handlePaste = (e) => {
   const text = e.clipboardData.getData('text');
   onInputChange(text);
 };

 return (
   <InputContainer>
     <InputOptions>
       <InputOption 
         active={inputMethod === 'write'}
         onClick={() => setInputMethod('write')}
       >
         <FiEdit />
         Write from scratch
       </InputOption>
       
       <InputOption
         active={inputMethod === 'upload'}
         onClick={() => setInputMethod('upload')}
       >
         <FiUpload />
         Upload file
         <FileInput
           type="file"
           accept=".doc,.docx,.pdf,.txt"
           onChange={handleFileUpload}
         />
       </InputOption>
       
       <InputOption
         active={inputMethod === 'paste'}
         onClick={() => setInputMethod('paste')}
       >
         <FiCopy />
         Paste text
       </InputOption>
     </InputOptions>

     {(inputMethod === 'write' || inputMethod === 'paste') && (
       <TextArea
         placeholder="Enter your speech content here..."
         onChange={(e) => onInputChange(e.target.value)}
         onPaste={inputMethod === 'paste' ? handlePaste : undefined}
       />
     )}
   </InputContainer>
 );
};

export default InputStep;