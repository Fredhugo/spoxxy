// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   checkAuth();
 }, []);

 const checkAuth = async () => {
   try {
     const currentUser = await Auth.currentAuthenticatedUser();
     setUser(currentUser);
   } catch (error) {
     setUser(null);
   } finally {
     setLoading(false);
   }
 };

 const login = async (email, password) => {
   try {
     const user = await Auth.signIn(email, password);
     setUser(user);
     return user;
   } catch (error) {
     throw new Error(error.message);
   }
 };

 const register = async ({ email, password, name }) => {
   try {
     await Auth.signUp({
       username: email,
       password,
       attributes: {
         email,
         name
       }
     });
     await login(email, password);
   } catch (error) {
     throw new Error(error.message);
   }
 };

 const logout = async () => {
   try {
     await Auth.signOut();
     setUser(null);
   } catch (error) {
     throw new Error(error.message);
   }
 };

 const value = {
   user,
   loading,
   login,
   register,
   logout,
   isAuthenticated: !!user
 };

 return (
   <AuthContext.Provider value={value}>
     {!loading && children}
   </AuthContext.Provider>
 );
};

export const useAuth = () => {
 const context = useContext(AuthContext);
 if (!context) {
   throw new Error('useAuth must be used within an AuthProvider');
 }
 return context;
};