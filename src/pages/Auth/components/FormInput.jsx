// src/pages/Auth/components/FormInput.jsx
import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
 margin-bottom: 1.5rem;
`;

const Label = styled.label`
 display: block;
 margin-bottom: 0.5rem;
 font-weight: 500;
 color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
 width: 100%;
 padding: 0.75rem 1rem;
 border: 2px solid ${props => props.error ? props.theme.colors.error : '#e1e1e1'};
 border-radius: 8px;
 font-size: 1rem;
 transition: border-color 0.2s;
 
 &:focus {
   border-color: ${props => props.theme.colors.primary};
   outline: none;
 }
`;

const ErrorMessage = styled.span`
 color: ${props => props.theme.colors.error};
 font-size: 0.875rem;
 margin-top: 0.25rem;
 display: block;
`;

export const FormInput = ({
 label,
 type = 'text',
 error,
 ...props
}) => (
 <InputWrapper>
   <Label>{label}</Label>
   <Input type={type} error={error} {...props} />
   {error && <ErrorMessage>{error}</ErrorMessage>}
 </InputWrapper>
);

export default FormInput;