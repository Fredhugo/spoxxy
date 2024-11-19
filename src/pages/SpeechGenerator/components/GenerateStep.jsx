// src/pages/SpeechGenerator/components/GenerateStep.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const GenerateContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const GenerateAnimation = styled(motion.div)`
  svg {
    font-size: 3rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const GenerateStatus = styled.h3`
  margin: 1rem 0;
  color: ${props => props.theme.colors.text};
`;

const GenerateProgress = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 1rem auto;
  height: 4px;
  background: #e1e1e1;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.colors.primary};
`;

export const GenerateStep = ({ onComplete }) => {
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState('Initializing...');

  React.useEffect(() => {
    const stages = [
      { progress: 25, status: 'Analyzing input...' },
      { progress: 50, status: 'Generating content...' },
      { progress: 75, status: 'Refining speech...' },
      { progress: 100, status: 'Finalizing...' }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].progress);
        setStatus(stages[currentStage].status);
        currentStage++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <GenerateContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GenerateAnimation
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <FiLoader />
      </GenerateAnimation>
      
      <GenerateStatus>{status}</GenerateStatus>
      
      <GenerateProgress>
        <ProgressBar
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </GenerateProgress>
    </GenerateContainer>
  );
};

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

export const ReviewStep = ({ generatedSpeech, onEdit }) => {
  const [showDownloadOptions, setShowDownloadOptions] = React.useState(false);

  const handleDownload = (format) => {
    // Logique de téléchargement selon le format
    console.log(`Downloading in ${format} format`);
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
        
        <ActionButton onClick={() => window.open('/prompter', '_blank')}>
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
          <ActionButton onClick={() => handleDownload('pdf')}>
            PDF
          </ActionButton>
          <ActionButton onClick={() => handleDownload('docx')}>
            Word
          </ActionButton>
          <ActionButton onClick={() => handleDownload('txt')}>
            Text
          </ActionButton>
          <ActionButton onClick={() => handleDownload('mp3')}>
            Audio
          </ActionButton>
        </DownloadOptions>
      )}
    </ReviewContainer>
  );
};

// src/pages/SpeechGenerator/SpeechGenerator.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { DashboardLayout } from '../Dashboard/components/DashboardLayout';
import { GeneratorStepper } from './components/GeneratorStepper';
import { InputStep } from './components/InputStep';
import { ConfigureStep } from './components/ConfigureStep';
import { GenerateStep } from './components/GenerateStep';
import { ReviewStep } from './components/ReviewStep';

const GeneratorContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const SpeechGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputMethod, setInputMethod] = useState('write');
  const [inputContent, setInputContent] = useState('');
  const [config, setConfig] = useState({
    language: 'en',
    tone: 'professional',
    duration: 'medium',
    audience: 'general'
  });
  const [generatedSpeech, setGeneratedSpeech] = useState('');

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfigChange = (key, value) => {
    setConfig({ ...config, [key]: value });
  };

  const handleGenerate = () => {
    // Appel à l'API Lambda
  };

  return (
    <DashboardLayout>
      <GeneratorContainer>
        <GeneratorStepper currentStep={currentStep} />

        {currentStep === 1 && (
          <InputStep
            onInputChange={setInputContent}
            inputMethod={inputMethod}
            setInputMethod={setInputMethod}
          />
        )}

        {currentStep === 2 && (
          <ConfigureStep
            config={config}
            onConfigChange={handleConfigChange}
          />
        )}

        {currentStep === 3 && (
          <GenerateStep onComplete={() => setCurrentStep(4)} />
        )}

        {currentStep === 4 && (
          <ReviewStep
            generatedSpeech={generatedSpeech}
            onEdit={() => setCurrentStep(1)}
          />
        )}

        <NavigationButtons>
          {currentStep > 1 && currentStep !== 3 && (
            <Button onClick={handleBack}>Back</Button>
          )}
          {currentStep < 3 && (
            <Button primary onClick={handleNext}>Next</Button>
          )}
          {currentStep === 3 && (
            <Button primary onClick={handleGenerate}>Generate</Button>
          )}
        </NavigationButtons>
      </GeneratorContainer>
    </DashboardLayout>
  );
};

export default SpeechGenerator;