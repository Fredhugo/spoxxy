// src/pages/QATraining/components/SessionResults.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAward, FiBarChart2 } from 'react-icons/fi';

const ResultsContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ScoreSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Score = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin: 1rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  
  h4 {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 0.5rem;
  }
  
  .value {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }
`;

const ResponseList = styled.div`
  margin-top: 2rem;
`;

const ResponseItem = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  
  h4 {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .question {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 0.5rem;
  }
  
  .answer {
    margin-bottom: 0.5rem;
  }
  
  .feedback {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.primary};
    padding: 0.5rem;
    background: ${props => props.theme.colors.primary + '10'};
    border-radius: 4px;
  }
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

export const SessionResults = ({ results, onRetry, onFinish }) => {
  const calculateStats = () => {
    return {
      totalQuestions: results.responses.length,
      correctAnswers: results.responses.filter(r => r.score > 0.8).length,
      averageScore: results.responses.reduce((acc, r) => acc + r.score, 0) / results.responses.length
    };
  };

  const stats = calculateStats();

  return (
    <ResultsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ScoreSection>
        <FiAward size={48} color="#007AFF" />
        <Score>{Math.round(stats.averageScore * 100)}%</Score>
        <h3>Session Complete!</h3>
      </ScoreSection>

      <StatsGrid>
        <StatCard>
          <h4>Questions</h4>
          <div className="value">{stats.totalQuestions}</div>
        </StatCard>
        <StatCard>
          <h4>Correct Answers</h4>
          <div className="value">{stats.correctAnswers}</div>
        </StatCard>
        <StatCard>
          <h4>Accuracy</h4>
          <div className="value">{Math.round(stats.averageScore * 100)}%</div>
        </StatCard>
      </StatsGrid>

      <ResponseList>
        <h3>Detailed Responses</h3>
        {results.responses.map((response, index) => (
          <ResponseItem key={index}>
            <h4>
              <FiCheckCircle color={response.score > 0.8 ? '#34C759' : '#FF9500'} />
              Question {index + 1}
            </h4>
            <div className="question">{response.question}</div>
            <div className="answer">{response.userAnswer}</div>
            <div className="feedback">{response.feedback}</div>
          </ResponseItem>
        ))}
      </ResponseList>

      <ActionButtons>
        <Button onClick={onRetry} variant="secondary">
          Try Again
        </Button>
        <Button onClick={onFinish} primary>
          Finish Session
        </Button>
      </ActionButtons>
    </ResultsContainer>
  );
};

// src/pages/QATraining/QATraining.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { DashboardLayout } from '../Dashboard/components/DashboardLayout';
import { SessionSetup } from './components/SessionSetup';
import { QASession } from './components/QASession';
import { SessionResults } from './components/SessionResults';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const stages = {
  SETUP: 'setup',
  SESSION: 'session',
  RESULTS: 'results'
};

const QATraining = () => {
  const [stage, setStage] = useState(stages.SETUP);
  const [settings, setSettings] = useState(null);
  const [results, setResults] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleStart = async (sessionSettings) => {
    setSettings(sessionSettings);
    
    // Appel à l'API Lambda pour générer les questions
    try {
      const response = await fetch('YOUR_LAMBDA_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionSettings)
      });
      
      const data = await response.json();
      setQuestions(data.questions);
      setStage(stages.SESSION);
    } catch (error) {
      console.error('Error generating questions:', error);
      // Gérer l'erreur
    }
  };

  const handleSessionComplete = (sessionResults) => {
    setResults(sessionResults);
    setStage(stages.RESULTS);
  };

  const handleRetry = () => {
    setStage(stages.SETUP);
    setResults(null);
    setQuestions([]);
  };

  return (
    <DashboardLayout>
      <Container>
        <Header>
          <h1>Q&A Training Session</h1>
          <p>Practice answering questions and improve your presentation skills</p>
        </Header>

        {stage === stages.SETUP && (
          <SessionSetup onStart={handleStart} />
        )}

        {stage === stages.SESSION && (
          <QASession 
            questions={questions}
            onComplete={handleSessionComplete}
          />
        )}

        {stage === stages.RESULTS && (
          <SessionResults
            results={results}
            onRetry={handleRetry}
            onFinish={() => window.location.href = '/dashboard'}
          />
        )}
      </Container>
    </DashboardLayout>
  );
};

export default QATraining;