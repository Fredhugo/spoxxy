// src/pages/Dashboard/components/RecentSpeeches.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';

const Card = styled.div`
 background: white;
 border-radius: 12px;
 padding: 1.5rem;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
 font-size: 1.25rem;
 margin-bottom: 1.5rem;
`;

const SpeechList = styled.div`
 display: flex;
 flex-direction: column;
 gap: 1rem;
`;

const SpeechItem = styled(Link)`
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 1rem;
 border-radius: 8px;
 background: ${props => props.theme.colors.backgroundSecondary};
 transition: all 0.2s;
 text-decoration: none;
 color: inherit;
 
 &:hover {
   transform: translateX(4px);
   background: ${props => props.theme.colors.primary + '10'};
 }
`;

const SpeechInfo = styled.div`
 flex: 1;
 
 h3 {
   font-size: 1rem;
   margin-bottom: 0.25rem;
 }
 
 p {
   font-size: 0.875rem;
   color: ${props => props.theme.colors.textSecondary};
 }
`;

const StatsGroup = styled.div`
 display: flex;
 gap: 1rem;
 margin-top: 0.5rem;
`;

const Stat = styled.span`
 font-size: 0.75rem;
 color: ${props => props.theme.colors.textSecondary};
 display: flex;
 align-items: center;
 gap: 0.25rem;
`;

export const RecentSpeeches = ({ speeches }) => (
 <Card>
   <Title>Recent Speeches</Title>
   <SpeechList>
     {speeches.map(speech => (
       <SpeechItem key={speech.id} to={`/generator/${speech.id}`}>
         <SpeechInfo>
           <h3>{speech.title}</h3>
           <p>{new Date(speech.createdAt).toLocaleDateString()}</p>
           <StatsGroup>
             <Stat>⏱️ {speech.duration}</Stat>
             <Stat>🎯 {speech.audience}</Stat>
             <Stat>💬 {speech.language}</Stat>
           </StatsGroup>
         </SpeechInfo>
         <FiExternalLink />
       </SpeechItem>
     ))}
   </SpeechList>
 </Card>
);

export default RecentSpeeches;