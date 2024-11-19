// src/components/common/Header.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Container } from './Container';
import { useAuth } from '../../hooks/useAuth';

const HeaderWrapper = styled.header`
 background: white;
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

const MobileMenuContent = styled.div`
 position: fixed;
 top: 80px;
 left: 0;
 right: 0;
 background: white;
 padding: 1rem;
 box-shadow: 0 2px 4px rgba(0,0,0,0.1);
 transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
 transition: transform 0.3s ease-in-out;
`;

const MobileMenuItem = styled(Link)`
 display: block;
 padding: 1rem;
 text-align: center;
 color: #333;
 text-decoration: none;
 
 &:hover {
   background: #f5f5f5;
 }
`;

const NavLink = styled(Link)`
 color: #333;
 text-decoration: none;
 font-weight: 500;
 
 &:hover {
   color: ${props => props.theme.colors.primary};
 }
`;

const MenuButton = styled.button`
 background: none;
 border: none;
 font-size: 1.5rem;
 cursor: pointer;
 padding: 0.5rem;
`;

export const Header = () => {
 const navigate = useNavigate();
 const { isAuthenticated, logout } = useAuth();
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 const handleLogout = async () => {
   await logout();
   navigate('/');
 };

 return (
   <HeaderWrapper>
     <Container>
       <Nav>
         <Link to="/">
           <Logo src="/logo.png" alt="Spoxxy" />
         </Link>
         
         <MenuItems>
           <NavLink to="/features">Features</NavLink>
           <NavLink to="/pricing">Pricing</NavLink>
           {isAuthenticated ? (
             <>
               <NavLink to="/dashboard">Dashboard</NavLink>
               <Button variant="secondary" onClick={handleLogout}>
                 Sign Out
               </Button>
             </>
           ) : (
             <>
               <Button variant="secondary" onClick={() => navigate('/login')}>
                 Sign In
               </Button>
               <Button onClick={() => navigate('/signup')}>
                 Get Started
               </Button>
             </>
           )}
         </MenuItems>
         
         <MobileMenu>
           <MenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             ☰
           </MenuButton>
           <MobileMenuContent isOpen={isMobileMenuOpen}>
             <MobileMenuItem to="/features">Features</MobileMenuItem>
             <MobileMenuItem to="/pricing">Pricing</MobileMenuItem>
             {isAuthenticated ? (
               <>
                 <MobileMenuItem to="/dashboard">Dashboard</MobileMenuItem>
                 <MobileMenuItem as="button" onClick={handleLogout}>
                   Sign Out
                 </MobileMenuItem>
               </>
             ) : (
               <>
                 <MobileMenuItem to="/login">Sign In</MobileMenuItem>
                 <MobileMenuItem to="/signup">Get Started</MobileMenuItem>
               </>
             )}
           </MobileMenuContent>
         </MobileMenu>
       </Nav>
     </Container>
   </HeaderWrapper>
 );
};

export default Header;