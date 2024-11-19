// src/pages/Home/Home.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Button } from '../../components/common/Button';
import { Container } from '../../components/common/Container';

const MainContent = styled.main`
 min-height: 100vh;
`;

const CTASection = styled.section`
 background: linear-gradient(135deg, #007AFF 0%, #0056b3 100%);
 color: white;
 padding: 5rem 0;
 text-align: center;
`;

const CTAContent = styled.div`
 max-width: 600px;
 margin: 0 auto;
 
 h2 {
   font-size: 2.5rem;
   margin-bottom: 1.5rem;
 }
 
 p {
   font-size: 1.25rem;
   margin-bottom: 2rem;
   opacity: 0.9;
 }
`;

const ButtonGroup = styled.div`
 display: flex;
 gap: 1rem;
 justify-content: center;
 
 @media (max-width: 768px) {
   flex-direction: column;
   align-items: center;
 }
`;

const Home = () => {
 return (
   <MainContent>
     <Hero />
     <Features />
     <Testimonials />
     
     <CTASection>
       <Container>
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
         >
           <CTAContent>
             <h2>Ready to Transform Your Speeches?</h2>
             <p>
               Join thousands of professionals who deliver impactful presentations
               with Spoxxy.
             </p>
             <ButtonGroup>
               <Button>Start Free Trial</Button>
               <Button variant="secondary">Schedule Demo</Button>
             </ButtonGroup>
           </CTAContent>
         </motion.div>
       </Container>
     </CTASection>
   </MainContent>
 );
};

export default Home;