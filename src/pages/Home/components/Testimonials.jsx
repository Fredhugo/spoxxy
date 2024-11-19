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

const Avatar = styled.div`
 width: 64px;
 height: 64px;
 border-radius: 50%;
 overflow: hidden;
 margin-bottom: 1rem;
 
 img {
   width: 100%;
   height: 100%;
   object-fit: cover;
 }
`;

const Quote = styled.p`
 font-size: 1.1rem;
 line-height: 1.6;
 margin-bottom: 1.5rem;
 color: #333;
`;

const Author = styled.div`
 h4 {
   font-size: 1.1rem;
   margin-bottom: 0.25rem;
 }
 
 p {
   color: #666;
   font-size: 0.9rem;
 }
`;

const testimonials = [
 {
   quote: "Spoxxy transformed how I prepare my presentations. The AI-powered insights are game-changing.",
   author: "Sarah Johnson",
   role: "CEO, TechStart",
   avatar: "/avatars/sarah.jpg"
 },
 {
   quote: "The cultural adaptation feature helps me connect with global audiences effortlessly.",
   author: "Michael Chen",
   role: "International Speaker",
   avatar: "/avatars/michael.jpg"
 },
 {
   quote: "I've seen a significant improvement in audience engagement since using Spoxxy.",
   author: "Emma Rodriguez",
   role: "Marketing Director",
   avatar: "/avatars/emma.jpg"
 },
 {
   quote: "Perfect for preparing conference talks. The Q&A training is invaluable.",
   author: "David Kim",
   role: "Tech Lead",
   avatar: "/avatars/david.jpg"
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
           <Avatar>
             <img src={testimonial.avatar} alt={testimonial.author} />
           </Avatar>
           <Quote>"{testimonial.quote}"</Quote>
           <Author>
             <h4>{testimonial.author}</h4>
             <p>{testimonial.role}</p>
           </Author>
         </TestimonialCard>
       ))}
     </TestimonialsGrid>
   </Container>
 </TestimonialsWrapper>
);

export default Testimonials;