// src/pages/Home/components/Hero.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../../../components/common/Container';
import { Button } from '../../../components/common/Button';
import { H1, Lead } from '../../../components/common/Typography';

const HeroSection = styled.section`
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
`;

const HeroImage = styled(motion.img)`
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Hero = () => (
  <HeroSection>
    <Container>
      <HeroGrid>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <H1>Transform your ideas into powerful speeches</H1>
            <Lead>
              Create, analyze, and perfect your speeches with AI-powered tools.
              Engage your audience with confidence.
            </Lead>
            <ButtonGroup>
              <Button>Get Started Free</Button>
              <Button variant="secondary">See How It Works</Button>
            </ButtonGroup>
          </motion.div>
        </HeroContent>
        <HeroImage
          src="/hero-image.png"
          alt="Spoxxy Platform"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </HeroGrid>
    </Container>
  </HeroSection>
);

// src/pages/Home/components/Features.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../../../components/common/Container';
import { H2 } from '../../../components/common/Typography';

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  
  svg {
    width: 100%;
    height: 100%;
    color: #007AFF;
  }
`;

const features = [
  {
    icon: "✍️",
    title: "Speech Generation",
    description: "Create compelling speeches tailored to your audience and purpose"
  },
  {
    icon: "🎯",
    title: "Deep Analysis",
    description: "Get detailed insights and improvements for your speeches"
  },
  {
    icon: "💡",
    title: "Q&A Training",
    description: "Prepare for questions with AI-powered response generation"
  }
];

export const Features = () => (
  <section>
    <Container>
      <H2>Features that empower your voice</H2>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </Container>
  </section>
);

// src/pages/Home/components/Testimonials.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../../../components/common/Container';
import { H2 } from '../../../components/common/Typography';

const TestimonialsWrapper = styled.section`
  background: #f8f9fa;
  padding: 5rem 0;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const testimonials = [
  {
    quote: "Spoxxy transformed how I prepare my presentations. The AI-powered insights are game-changing.",
    author: "Sarah Johnson",
    role: "CEO, TechStart"
  },
  {
    quote: "The cultural adaptation feature helps me connect with global audiences effortlessly.",
    author: "Michael Chen",
    role: "International Speaker"
  }
];

export const Testimonials = () => (
  <TestimonialsWrapper>
    <Container>
      <H2>What our users say</H2>
      <TestimonialsGrid>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <p>"{testimonial.quote}"</p>
            <strong>{testimonial.author}</strong>
            <p>{testimonial.role}</p>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </Container>
  </TestimonialsWrapper>
);

// src/pages/Home/Home.jsx
import React from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';

const Home = () => (
  <>
    <Hero />
    <Features />
    <Testimonials />
  </>
);

export default Home;