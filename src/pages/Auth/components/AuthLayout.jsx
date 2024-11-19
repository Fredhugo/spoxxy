// src/pages/Auth/components/AuthLayout.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AuthWrapper = styled.div`
 min-height: 100vh;
 display: flex;
 align-items: center;
 justify-content: center;
 padding: 2rem;
 background: ${props => props.theme.colors.backgroundSecondary};
 
 @media (max-width: 768px) {
   padding: 1rem;
 }
`;

const BackgroundDecoration = styled(motion.div)`
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 height: 50vh;
 background: linear-gradient(135deg, #007AFF 0%, #0056b3 100%);
 clip-path: polygon(0 0, 100% 0, 100% 60%, 0% 100%);
 z-index: -1;
`;

export const AuthLayout = ({ children }) => (
 <AuthWrapper>
   <BackgroundDecoration
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.6 }}
   />
   {children}
 </AuthWrapper>
);

export default AuthLayout;