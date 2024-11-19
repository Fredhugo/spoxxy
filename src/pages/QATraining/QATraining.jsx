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
   setSettings(null);
 };

 const renderStage = () => {
   switch (stage) {
     case stages.SETUP:
       return <SessionSetup onStart={handleStart} />;
     case stages.SESSION:
       return (
         <QASession 
           questions={questions}
           settings={settings}
           onComplete={handleSessionComplete}
         />
       );
     case stages.RESULTS:
       return (
         <SessionResults
           results={results}
           settings={settings}
           onRetry={handleRetry}
           onFinish={() => window.location.href = '/dashboard'}
         />
       );
     default:
       return null;
   }
 };

 return (
   <DashboardLayout>
     <Container>
       <Header>
         <h1>Q&A Training Session</h1>
         <p>Practice answering questions and improve your presentation skills</p>
       </Header>

       {renderStage()}
     </Container>
   </DashboardLayout>
 );
};

export default QATraining;