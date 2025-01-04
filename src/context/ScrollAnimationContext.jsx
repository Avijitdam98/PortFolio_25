import React, { createContext, useContext } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const ScrollAnimationContext = createContext();

export const ScrollAnimationProvider = ({ children }) => {
  const scrollAnimation = useScrollAnimation();

  return (
    <ScrollAnimationContext.Provider value={scrollAnimation}>
      {children}
    </ScrollAnimationContext.Provider>
  );
};

export const useScrollAnimationContext = () => {
  const context = useContext(ScrollAnimationContext);
  if (!context) {
    throw new Error('useScrollAnimationContext must be used within a ScrollAnimationProvider');
  }
  return context;
};
