// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AuthLayout } from './components/AuthLayout';
import { AuthCard } from './components/AuthCard';
import { FormInput } from './components/FormInput';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

const Title = styled.h1`
 font-size: 2rem;
 margin-bottom: 0.5rem;
 text-align: center;
`;

const Subtitle = styled.p`
 color: ${props => props.theme.colors.textSecondary};
 text-align: center;
 margin-bottom: 2rem;
`;

const Form = styled.form`
 margin-bottom: 1.5rem;
`;

const ForgotPassword = styled(Link)`
 color: ${props => props.theme.colors.primary};
 text-decoration: none;
 font-size: 0.875rem;
 display: block;
 text-align: right;
 margin: -1rem 0 1.5rem;
 
 &:hover {
   text-decoration: underline;
 }
`;

const Divider = styled.div`
 display: flex;
 align-items: center;
 margin: 2rem 0;
 
 &::before,
 &::after {
   content: '';
   flex: 1;
   height: 1px;
   background: #e1e1e1;
 }
 
 span {
   padding: 0 1rem;
   color: ${props => props.theme.colors.textSecondary};
 }
`;

const SocialButton = styled(Button)`
 width: 100%;
 background: white;
 border: 2px solid #e1e1e1;
 color: ${props => props.theme.colors.text};
 margin-bottom: 1rem;
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 0.5rem;
 
 img {
   width: 24px;
   height: 24px;
 }
`;

const RegisterLink = styled.p`
 text-align: center;
 margin-top: 2rem;
 
 a {
   color: ${props => props.theme.colors.primary};
   text-decoration: none;
   
   &:hover {
     text-decoration: underline;
   }
 }
`;

const Login = () => {
 const navigate = useNavigate();
 const { login } = useAuth();
 const [formData, setFormData] = useState({
   email: '',
   password: ''
 });
 const [errors, setErrors] = useState({});
 const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
   e.preventDefault();
   setErrors({});
   setLoading(true);
   
   try {
     await login(formData.email, formData.password);
     navigate('/dashboard');
   } catch (error) {
     setErrors({
       email: error.message
     });
   } finally {
     setLoading(false);
   }
 };

 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 };

 return (
   <AuthLayout>
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6 }}
     >
       <AuthCard>
         <Title>Welcome back</Title>
         <Subtitle>Sign in to continue to Spoxxy</Subtitle>
         
         <Form onSubmit={handleSubmit}>
           <FormInput
             label="Email"
             type="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             error={errors.email}
             required
           />
           <FormInput
             label="Password"
             type="password"
             name="password"
             value={formData.password}
             onChange={handleChange}
             error={errors.password}
             required
           />
           <ForgotPassword to="/forgot-password">
             Forgot password?
           </ForgotPassword>
           <Button type="submit" disabled={loading}>
             {loading ? 'Signing in...' : 'Sign In'}
           </Button>
         </Form>
         
         <Divider>
           <span>or continue with</span>
         </Divider>
         
         <SocialButton onClick={() => login('google')}>
           <img src="/google-icon.svg" alt="Google" />
           Continue with Google
         </SocialButton>
         
         <RegisterLink>
           Don't have an account? <Link to="/register">Sign up</Link>
         </RegisterLink>
       </AuthCard>
     </motion.div>
   </AuthLayout>
 );
};

export default Login;