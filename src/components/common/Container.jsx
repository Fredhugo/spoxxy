// src/components/common/Container.jsx
import styled from 'styled-components';

export const Container = styled.div`
 max-width: 1200px;
 margin: 0 auto;
 padding: 0 2rem;
 
 @media (max-width: 768px) {
   padding: 0 1rem;
 }

 @media (max-width: 1200px) {
   max-width: 100%;
 }
`;

export const Section = styled(Container)`
 padding-top: 4rem;
 padding-bottom: 4rem;

 @media (max-width: 768px) {
   padding-top: 2rem;
   padding-bottom: 2rem;
 }
`;

export const NarrowContainer = styled(Container)`
 max-width: 800px;
`;

export const WideContainer = styled(Container)`
 max-width: 1400px;
`;

export default Container;