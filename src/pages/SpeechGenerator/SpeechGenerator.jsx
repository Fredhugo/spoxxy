// src/pages/SpeechGenerator.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SpeechGenerator = () => {
  const [formData, setFormData] = useState({
    text: '',
    targetLanguage: 'en',
    tone: 'professional',
    duration: 'medium',
    targetAudience: 'general',
    cultural: 'international'
  });

  const [loading, setLoading] = useState(false);
  const [generatedSpeech, setGeneratedSpeech] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Appel à votre Lambda via API Gateway
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: 'generate',
          ...formData
        })
      });
      const data = await response.json();
      setGeneratedSpeech(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Create Your Speech</h1>
        <p>Transform your ideas into powerful words</p>
      </Header>

      <Form onSubmit={handleSubmit}>
        <TextArea
          placeholder="Enter your speech content or ideas..."
          value={formData.text}
          onChange={(e) => setFormData({...formData, text: e.target.value})}
        />

        <OptionsGrid>
          <Select
            label="Language"
            value={formData.targetLanguage}
            onChange={(e) => setFormData({...formData, targetLanguage: e.target.value})}
            options={[
              { value: 'en', label: 'English' },
              { value: 'fr', label: 'French' },
              { value: 'de', label: 'German' },
              // Add more languages
            ]}
          />

          <Select
            label="Tone"
            value={formData.tone}
            onChange={(e) => setFormData({...formData, tone: e.target.value})}
            options={[
              { value: 'professional', label: 'Professional' },
              { value: 'casual', label: 'Casual' },
              { value: 'inspiring', label: 'Inspiring' },
            ]}
          />

          <Select
            label="Duration"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            options={[
              { value: 'short', label: '5-10 minutes' },
              { value: 'medium', label: '10-20 minutes' },
              { value: 'long', label: '20+ minutes' },
            ]}
          />
        </OptionsGrid>

        <Button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Speech'}
        </Button>
      </Form>

      {generatedSpeech && (
        <ResultsSection>
          <h2>Generated Speech</h2>
          <GeneratedContent>
            {generatedSpeech.text}
          </GeneratedContent>
          
          <ActionsGrid>
            <ActionButton onClick={() => /* Download PDF */}>
              Download PDF
            </ActionButton>
            <ActionButton onClick={() => /* Download Word */}>
              Download Word
            </ActionButton>
            <ActionButton onClick={() => /* Open Prompter */}>
              Open Prompter
            </ActionButton>
            <ActionButton onClick={() => /* Go to Analysis */}>
              Analyze Speech
            </ActionButton>
          </ActionsGrid>
        </ResultsSection>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    border-color: #007AFF;
    outline: none;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const Button = styled.button`
  background: #007AFF;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #0056b3;
  }
  
  &:disabled {
    background: #ccc;
  }
`;

export default SpeechGenerator;