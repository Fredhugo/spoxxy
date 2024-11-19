// src/pages/SpeechGenerator/components/GeneratorStepper.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StepperContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Step = styled(motion.div)`
  display: flex;
  align-items: center;
  
  &:not(:last-child) {
    margin-right: 2rem;
    
    &::after {
      content: '';
      width: 2rem;
      height: 2px;
      background: ${props => props.active ? props.theme.colors.primary : '#e1e1e1'};
      margin-left: 2rem;
    }
  }
`;

const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  border: 2px solid ${props => props.active ? props.theme.colors.primary : '#e1e1e1'};
  color: ${props => props.active ? 'white' : props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  transition: all 0.3s;
`;

const StepLabel = styled.span`
  color: ${props => props.active ? props.theme.colors.text : props.theme.colors.textSecondary};
  font-weight: ${props => props.active ? '600' : '400'};
`;

export const GeneratorStepper = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Input' },
    { number: 2, label: 'Configure' },
    { number: 3, label: 'Generate' },
    { number: 4, label: 'Review' }
  ];

  return (
    <StepperContainer>
      {steps.map((step) => (
        <Step 
          key={step.number}
          active={currentStep >= step.number}
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StepCircle active={currentStep >= step.number}>
            {step.number}
          </StepCircle>
          <StepLabel active={currentStep >= step.number}>
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </StepperContainer>
  );
};

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

export const InputStep = ({ onInputChange, inputMethod, setInputMethod }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Logique de traitement du fichier
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

      {inputMethod === 'write' || inputMethod === 'paste' ? (
        <TextArea
          placeholder="Enter your speech content here..."
          onChange={(e) => onInputChange(e.target.value)}
        />
      ) : null}
    </InputContainer>
  );
};

// src/pages/SpeechGenerator/components/ConfigureStep.jsx
import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const ConfigureContainer = styled(InputContainer)``;

const ConfigureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ConfigureItem = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

const customSelectStyles = {
  control: (base) => ({
    ...base,
    border: '2px solid #e1e1e1',
    borderRadius: '8px',
    padding: '4px',
    '&:hover': {
      borderColor: '#007AFF'
    }
  })
};

export const ConfigureStep = ({ config, onConfigChange }) => {
  const options = {
    languages: [
      { value: 'en', label: 'English' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
      { value: 'es', label: 'Spanish' }
    ],
    tones: [
      { value: 'professional', label: 'Professional' },
      { value: 'friendly', label: 'Friendly' },
      { value: 'persuasive', label: 'Persuasive' },
      { value: 'inspiring', label: 'Inspiring' }
    ],
    durations: [
      { value: 'short', label: '5-10 minutes' },
      { value: 'medium', label: '10-20 minutes' },
      { value: 'long', label: '20+ minutes' }
    ],
    audiences: [
      { value: 'general', label: 'General Public' },
      { value: 'business', label: 'Business Professionals' },
      { value: 'technical', label: 'Technical Audience' },
      { value: 'academic', label: 'Academic' }
    ]
  };

  return (
    <ConfigureContainer>
      <ConfigureGrid>
        <ConfigureItem>
          <label>Language</label>
          <Select
            options={options.languages}
            value={options.languages.find(l => l.value === config.language)}
            onChange={(selected) => onConfigChange('language', selected.value)}
            styles={customSelectStyles}
          />
        </ConfigureItem>

        <ConfigureItem>
          <label>Tone</label>
          <Select
            options={options.tones}
            value={options.tones.find(t => t.value === config.tone)}
            onChange={(selected) => onConfigChange('tone', selected.value)}
            styles={customSelectStyles}
          />
        </ConfigureItem>

        <ConfigureItem>
          <label>Duration</label>
          <Select
            options={options.durations}
            value={options.durations.find(d => d.value === config.duration)}
            onChange={(selected) => onConfigChange('duration', selected.value)}
            styles={customSelectStyles}
          />
        </ConfigureItem>

        <ConfigureItem>
          <label>Target Audience</label>
          <Select
            options={options.audiences}
            value={options.audiences.find(a => a.value === config.audience)}
            onChange={(selected) => onConfigChange('audience', selected.value)}
            styles={customSelectStyles}
          />
        </ConfigureItem>
      </ConfigureGrid>
    </ConfigureContainer>
  );
};