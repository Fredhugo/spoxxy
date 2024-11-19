// src/pages/SpeechAnalyzer/components/AnalysisCard.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const Content = styled.div`
  color: ${props => props.theme.colors.textSecondary};
`;

export const AnalysisCard = ({ title, icon, children }) => (
  <Card
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Title>
      {icon}
      {title}
    </Title>
    <Content>{children}</Content>
  </Card>
);

// src/pages/SpeechAnalyzer/components/EmotionChart.jsx
import React from 'react';
import styled from 'styled-components';
import { ResponsivePie } from '@nivo/pie';

const ChartContainer = styled.div`
  height: 300px;
`;

const emotions = [
  { id: 'joy', label: 'Joy', value: 35, color: '#34C759' },
  { id: 'confidence', label: 'Confidence', value: 25, color: '#007AFF' },
  { id: 'empathy', label: 'Empathy', value: 20, color: '#5856D6' },
  { id: 'urgency', label: 'Urgency', value: 15, color: '#FF9500' },
  { id: 'concern', label: 'Concern', value: 5, color: '#FF3B30' }
];

export const EmotionChart = () => (
  <ChartContainer>
    <ResponsivePie
      data={emotions}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ theme: 'background' }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="white"
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true
        }
      ]}
    />
  </ChartContainer>
);

// src/pages/SpeechAnalyzer/components/SentimentTimeline.jsx
import React from 'react';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line';

const TimelineContainer = styled.div`
  height: 300px;
`;

export const SentimentTimeline = ({ data }) => (
  <TimelineContainer>
    <ResponsiveLine
      data={[
        {
          id: 'sentiment',
          data: data.map((point, index) => ({
            x: index,
            y: point.value
          }))
        }
      ]}
      margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
      xScale={{ type: 'linear' }}
      yScale={{ 
        type: 'linear', 
        min: -1, 
        max: 1, 
        stacked: false 
      }}
      curve="natural"
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Time',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Sentiment',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      enableArea={true}
      areaOpacity={0.15}
      useMesh={true}
      legends={[]}
    />
  </TimelineContainer>
);

// src/pages/SpeechAnalyzer/components/KeywordCloud.jsx
import React from 'react';
import styled from 'styled-components';
import { TagCloud } from 'react-tagcloud';

const CloudContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;

const customRenderer = (tag, size, color) => (
  <span
    key={tag.value}
    style={{
      fontSize: `${size}px`,
      color,
      margin: '3px',
      padding: '3px',
      display: 'inline-block',
      cursor: 'pointer',
    }}
  >
    {tag.value}
  </span>
);

export const KeywordCloud = ({ keywords }) => (
  <CloudContainer>
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={keywords}
      renderer={customRenderer}
      colorOptions={{
        luminosity: 'dark',
        hue: 'blue',
      }}
    />
  </CloudContainer>
);

// src/pages/SpeechAnalyzer/components/ImprovementSuggestions.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const SuggestionList = styled.div`
  display: grid;
  gap: 1rem;
`;

const SuggestionItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.type === 'strength' ? 
    props.theme.colors.success + '10' : 
    props.theme.colors.warning + '10'
  };
  border-radius: 8px;
`;

const Icon = styled.div`
  svg {
    color: ${props => props.type === 'strength' ? 
      props.theme.colors.success : 
      props.theme.colors.warning
    };
  }
`;

const Content = styled.div`
  flex: 1;
  
  h4 {
    margin-bottom: 0.5rem;
    color: ${props => props.type === 'strength' ? 
      props.theme.colors.success : 
      props.theme.colors.warning
    };
  }
  
  p {
    font-size: 0.9rem;
  }
`;

export const ImprovementSuggestions = ({ suggestions }) => (
  <SuggestionList>
    {suggestions.map((suggestion, index) => (
      <SuggestionItem
        key={index}
        type={suggestion.type}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Icon type={suggestion.type}>
          {suggestion.type === 'strength' ? <FiCheckCircle /> : <FiAlertCircle />}
        </Icon>
        <Content type={suggestion.type}>
          <h4>{suggestion.title}</h4>
          <p>{suggestion.description}</p>
        </Content>
      </SuggestionItem>
    ))}
  </SuggestionList>
);