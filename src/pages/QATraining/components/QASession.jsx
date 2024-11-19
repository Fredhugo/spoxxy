// src/pages/QATraining/components/QASession.jsx
import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiMicOff, FiPlay, FiPause } from 'react-icons/fi';

const SessionContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const QuestionCard = styled(motion.div)`
  background: ${props => props.theme.colors.backgroundSecondary};
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const AnswerCard = styled(motion.div)`
  background: ${props => props.theme.colors.primary + '10'};
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  justify-content: center;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.backgroundSecondary};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    font-size: 1.25rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e1e1e1;
  border-radius: 2px;
  margin: 2rem 0;
  
  div {
    height: 100%;
    width: ${props => (props.current / props.total) * 100}%;
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
    transition: width 0.3s;
  }
`;

export const QASession = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Logique de lecture audio
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Logique d'enregistrement
  };

  return (
    <SessionContainer>
      <ProgressBar current={currentIndex + 1} total={questions.length}>
        <div />
      </ProgressBar>

      <AnimatePresence mode="wait">
        <QuestionCard
          key={`question-${currentIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h3>Question {currentIndex + 1}</h3>
          <p>{currentQuestion.question}</p>
          
          <Controls>
            <ControlButton 
              onClick={togglePlayback}
              active={isPlaying}
            >
              {isPlaying ? <FiPause /> : <FiPlay />}
            </ControlButton>
          </Controls>
        </QuestionCard>

        <AnswerCard
          key={`answer-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h3>Model Answer</h3>
          <p>{currentQuestion.answer}</p>

          <Controls>
            <ControlButton 
              onClick={toggleRecording}
              active={isRecording}
            >
              {isRecording ? <FiMicOff /> : <FiMic />}
            </ControlButton>
          </Controls>
        </AnswerCard>
      </AnimatePresence>

      <Button onClick={handleNext}>
        {currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Session'}
      </Button>
    </SessionContainer>
  );
};

// src/pages/QATraining/components/SessionSetup.jsx
import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const SetupContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SetupForm = styled.form`
  display: grid;
  gap: 1.5rem;
`;

export const SessionSetup = ({ onStart }) => {
  const [settings, setSettings] = useState({
    speechId: '',
    difficulty: 'medium',
    questionsCount: 5,
    focusAreas: []
  });

  const options = {
    difficulty: [
      { value: 'easy', label: 'Easy' },
      { value: 'medium', label: 'Medium' },
      { value: 'hard', label: 'Hard' }
    ],
    questionsCount: [
      { value: 5, label: '5 questions' },
      { value: 10, label: '10 questions' },
      { value: 15, label: '15 questions' }
    ],
    focusAreas: [
      { value: 'content', label: 'Content Clarification' },
      { value: 'technical', label: 'Technical Details' },
      { value: 'implementation', label: 'Implementation' },
      { value: 'impact', label: 'Impact & Results' }
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(settings);
  };

  return (
    <SetupContainer>
      <SetupForm onSubmit={handleSubmit}>
        <div>
          <label>Difficulty Level</label>
          <Select
            options={options.difficulty}
            value={options.difficulty.find(d => d.value === settings.difficulty)}
            onChange={(selected) => setSettings({...settings, difficulty: selected.value})}
          />
        </div>

        <div>
          <label>Number of Questions</label>
          <Select
            options={options.questionsCount}
            value={options.questionsCount.find(q => q.value === settings.questionsCount)}
            onChange={(selected) => setSettings({...settings, questionsCount: selected.value})}
          />
        </div>

        <div>
          <label>Focus Areas</label>
          <Select
            isMulti
            options={options.focusAreas}
            value={options.focusAreas.filter(f => settings.focusAreas.includes(f.value))}
            onChange={(selected) => setSettings({...settings, focusAreas: selected.map(s => s.value)})}
          />
        </div>

        <Button type="submit">Start Session</Button>
      </SetupForm>
    </SetupContainer>
  );
};