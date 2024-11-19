// src/components/layout/Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';

const FooterWrapper = styled.footer`
  background: #1a1a1a;
  color: #fff;
  padding: 4rem 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLogo = styled.img`
  height: 40px;
  margin-bottom: 1rem;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const Copyright = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  opacity: 0.6;
`;

export const Footer = () => (
  <FooterWrapper>
    <Container>
      <FooterGrid>
        <FooterColumn>
          <FooterLogo src="/logo-white.png" alt="Spoxxy" />
          <p>Transform your ideas into powerful speeches with AI-powered tools.</p>
        </FooterColumn>
        
        <FooterColumn>
          <h4>Product</h4>
          <FooterLink to="/features">Features</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/testimonials">Testimonials</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <h4>Resources</h4>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/documentation">Documentation</FooterLink>
          <FooterLink to="/support">Support</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <h4>Company</h4>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
        </FooterColumn>
      </FooterGrid>
      
      <Copyright>
        © {new Date().getFullYear()} Spoxxy. All rights reserved.
      </Copyright>
    </Container>
  </FooterWrapper>
);

// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AppRoutes } from './routes';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <AppRoutes />
      <Footer />
    </ThemeProvider>
  </BrowserRouter>
);

export default App;

// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.background};
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  button {
    font-family: inherit;
  }
`;

// src/styles/theme.js
export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    text: '#1a1a1a',
    textSecondary: '#666666',
    background: '#ffffff',
    backgroundSecondary: '#f8f9fa',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
};

// src/routes/index.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import SpeechGenerator from '../pages/SpeechGenerator/SpeechGenerator';
import QATraining from '../pages/QATraining/QATraining';
import SpeechAnalyzer from '../pages/SpeechAnalyzer/SpeechAnalyzer';
import Pricing from '../pages/Pricing/Pricing';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import PrivateRoute from './PrivateRoute';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Protected Routes */}
    <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/generator" element={<SpeechGenerator />} />
      <Route path="/qa-training" element={<QATraining />} />
      <Route path="/analyzer" element={<SpeechAnalyzer />} />
    </Route>
  </Routes>
);

// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;