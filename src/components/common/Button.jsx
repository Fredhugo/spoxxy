// src/components/common/Button.jsx
import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => props.variant === 'secondary' ? '#ffffff' : '#007AFF'};
  color: ${props => props.variant === 'secondary' ? '#007AFF' : '#ffffff'};
  padding: 0.8rem 1.5rem;
  border: 2px solid #007AFF;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

// src/components/common/Container.jsx
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

// src/components/layout/Header.jsx
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Container } from '../common/Container';

const HeaderWrapper = styled.header`
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const Logo = styled.img`
  height: 40px;
`;

const MenuItems = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Container>
        <Nav>
          <Link to="/">
            <Logo src="/logo.png" alt="Spoxxy" />
          </Link>
          
          <MenuItems>
            <Link to="/pricing">Pricing</Link>
            <Link to="/features">Features</Link>
            <Button variant="secondary" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/signup')}>
              Get Started
            </Button>
          </MenuItems>
          
          <MobileMenu>
            {/* Mobile menu implementation */}
          </MobileMenu>
        </Nav>
      </Container>
    </HeaderWrapper>
  );
};

// src/components/common/Section.jsx
import styled from 'styled-components';

export const Section = styled.section`
  padding: 5rem 0;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

// src/components/common/Typography.jsx
import styled from 'styled-components';

export const H1 = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const H2 = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Lead = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
`;