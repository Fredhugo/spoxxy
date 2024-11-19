// src/pages/Dashboard/components/DashboardLayout.jsx
import React from 'react';
import styled from 'styled-components';
import { Sidebar } from './Sidebar';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  margin-top: 80px; // Pour le header fixe
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background: ${props => props.theme.colors.backgroundSecondary};
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const DashboardLayout = ({ children }) => (
  <DashboardContainer>
    <Sidebar />
    <MainContent>{children}</MainContent>
  </DashboardContainer>
);

// src/pages/Dashboard/components/Sidebar.jsx
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiEdit, 
  FiMessageSquare, 
  FiBarChart2, 
  FiSettings 
} from 'react-icons/fi';

const SidebarContainer = styled.aside`
  width: 250px;
  background: white;
  border-right: 1px solid #eaeaea;
  height: calc(100vh - 80px);
  position: fixed;
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: all 0.2s;
  
  svg {
    margin-right: 1rem;
    font-size: 1.25rem;
  }
  
  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
    color: ${props => props.theme.colors.primary};
  }
  
  &.active {
    background: ${props => props.theme.colors.backgroundSecondary};
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const Logo = styled.img`
  height: 32px;
  margin: 0 2rem 2rem;
`;

export const Sidebar = () => (
  <SidebarContainer>
    <Logo src="/logo.png" alt="Spoxxy" />
    <nav>
      <NavItem to="/dashboard" end>
        <FiHome /> Dashboard
      </NavItem>
      <NavItem to="/generator">
        <FiEdit /> Speech Generator
      </NavItem>
      <NavItem to="/qa-training">
        <FiMessageSquare /> Q&A Training
      </NavItem>
      <NavItem to="/analyzer">
        <FiBarChart2/> Speech Analyzer
      </NavItem>
      <NavItem to="/settings">
        <FiSettings /> Settings
      </NavItem>
    </nav>
  </SidebarContainer>
);

// src/pages/Dashboard/components/StatCard.jsx
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
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const Trend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.trend > 0 ? props.theme.colors.success : props.theme.colors.error};
`;

export const StatCard = ({ title, value, trend }) => (
  <Card
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Title>{title}</Title>
    <Value>{value}</Value>
    {trend && (
      <Trend trend={trend}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
      </Trend>
    )}
  </Card>
);

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

export const RecentSpeeches = ({ speeches }) => (
  <Card>
    <Title>Recent Speeches</Title>
    <SpeechList>
      {speeches.map(speech => (
        <SpeechItem key={speech.id} to={`/generator/${speech.id}`}>
          <SpeechInfo>
            <h3>{speech.title}</h3>
            <p>{new Date(speech.createdAt).toLocaleDateString()}</p>
          </SpeechInfo>
          <FiExternalLink />
        </SpeechItem>
      ))}
    </SpeechList>
  </Card>
);

// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import styled from 'styled-components';
import { DashboardLayout } from './components/DashboardLayout';
import { StatCard } from './components/StatCard';
import { RecentSpeeches } from './components/RecentSpeeches';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const Dashboard = () => {
  // Mock data - à remplacer par des données réelles
  const stats = [
    { title: 'Generated Speeches', value: '12', trend: 20 },
    { title: 'Q&A Sessions', value: '34', trend: 15 },
    { title: 'Analysis Reports', value: '8', trend: -5 },
    { title: 'Total Duration', value: '5h 23m', trend: 10 }
  ];

  const recentSpeeches = [
    { id: 1, title: 'Company Vision 2025', createdAt: '2024-03-15' },
    { id: 2, title: 'Product Launch Keynote', createdAt: '2024-03-14' },
    { id: 3, title: 'Team Meeting Opening', createdAt: '2024-03-13' }
  ];

  return (
    <DashboardLayout>
      <WelcomeSection>
        <h1>Welcome back, John</h1>
        <p>Here's what's happening with your speeches</p>
      </WelcomeSection>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
          />
        ))}
      </StatsGrid>

      <RecentSpeeches speeches={recentSpeeches} />
    </DashboardLayout>
  );
};

export default Dashboard;