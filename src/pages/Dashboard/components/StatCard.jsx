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

const Icon = styled.div`
 margin-bottom: 1rem;
 color: ${props => props.theme.colors.primary};
 font-size: 1.5rem;
`;

export const StatCard = ({ title, value, trend, icon }) => (
 <Card
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.6 }}
 >
   {icon && <Icon>{icon}</Icon>}
   <Title>{title}</Title>
   <Value>{value}</Value>
   {trend && (
     <Trend trend={trend}>
       {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
     </Trend>
   )}
 </Card>
);

export default StatCard;