// src/pages/SpeechAnalyzer/components/AnalysisOverview.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiBarChart2, FiClock, FiUsers, FiVolume2 } from 'react-icons/fi';

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const OverviewCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  .label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 0.5rem;
    
    svg {
      color: ${props => props.theme.colors.primary};
    }
  }
  
  .value {
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .description {
    font-size: 0.875rem;
    color: ${props => props.theme.colors.textSecondary};
    margin-top: 0.25rem;
  }
`;

export const AnalysisOverview = ({ overviewData }) => (
  <OverviewGrid>
    <OverviewCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="label">
        <FiBarChart2 /> Overall Score
      </div>
      <div className="value">{overviewData.score}%</div>
      <div className="description">Based on multiple factors</div>
    </OverviewCard>
    
    <OverviewCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="label">
        <FiClock /> Duration
      </div>
      <div className="value">{overviewData.duration}</div>
      <div className="description">Total speech length</div>
    </OverviewCard>
    
    <OverviewCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="label">
        <FiUsers /> Engagement
      </div>
      <div className="value">{overviewData.engagement}%</div>
      <div className="description">Audience engagement score</div>
    </OverviewCard>
    
    <OverviewCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="label">
        <FiVolume2 /> Clarity
      </div>
      <div className="value">{overviewData.clarity}%</div>
      <div className="description">Message clarity score</div>
    </OverviewCard>
  </OverviewGrid>
);

// src/pages/SpeechAnalyzer/SpeechAnalyzer.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { DashboardLayout } from '../Dashboard/components/DashboardLayout';
import { AnalysisOverview } from './components/AnalysisOverview';
import { EmotionChart } from './components/EmotionChart';
import { SentimentTimeline } from './components/SentimentTimeline';
import { KeywordCloud } from './components/KeywordCloud';
import { ImprovementSuggestions } from './components/ImprovementSuggestions';
import { AnalysisCard } from './components/AnalysisCard';
import { 
  FiUpload, 
  FiHeart, 
  FiTrendingUp, 
  FiCloud,
  FiMessageSquare
} from 'react-icons/fi';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const UploadSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const DropZone = styled.div`
  border: 2px dashed #e1e1e1;
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem 0;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary + '10'};
  }
`;

const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SpeechAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    await analyzeFile(selectedFile);
  };

  const analyzeFile = async (file) => {
    setAnalyzing(true);
    try {
      // Simulation d'appel API - à remplacer par votre appel Lambda réel
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('YOUR_LAMBDA_ENDPOINT', {
        method: 'POST',
        body: formData
      });
      
      const results = await response.json();
      setAnalysisResults(results);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <DashboardLayout>
      <Container>
        <Header>
          <h1>Speech Analysis</h1>
          <p>Get detailed insights about your speech</p>
        </Header>

        {!analysisResults ? (
          <UploadSection>
            <h2>Upload Your Speech</h2>
            <p>Upload a file or paste your speech text to begin analysis</p>
            
            <DropZone
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                analyzeFile(file);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <FiUpload size={48} color="#007AFF" />
              <p>Drag and drop your file here or click to browse</p>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".txt,.doc,.docx,.pdf"
                style={{ display: 'none' }}
              />
            </DropZone>
          </UploadSection>
        ) : (
          <>
            <AnalysisOverview overviewData={analysisResults.overview} />
            
            <AnalysisGrid>
              <AnalysisCard title="Emotional Analysis" icon={<FiHeart />}>
                <EmotionChart data={analysisResults.emotions} />
              </AnalysisCard>
              
              <AnalysisCard title="Sentiment Flow" icon={<FiTrendingUp />}>
                <SentimentTimeline data={analysisResults.sentiment} />
              </AnalysisCard>
              
              <AnalysisCard title="Key Topics" icon={<FiCloud />}>
                <KeywordCloud keywords={analysisResults.keywords} />
              </AnalysisCard>
              
              <AnalysisCard title="Improvements" icon={<FiMessageSquare />}>
                <ImprovementSuggestions suggestions={analysisResults.suggestions} />
              </AnalysisCard>
            </AnalysisGrid>
          </>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default SpeechAnalyzer;