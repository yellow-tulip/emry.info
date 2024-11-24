import React, { createContext, useContext, useState } from 'react';

const AmbientSoundscapeContext = createContext();

export const AmbientSoundscapeProvider = ({ children }) => {
  const [soundscapeRef, setSoundscapeRef] = useState(null);

  return (
    <AmbientSoundscapeContext.Provider 
      value={{ 
        soundscapeRef, 
        setSoundscapeRef
      }}
    >
      {children}
    </AmbientSoundscapeContext.Provider>
  );
};

export const useAmbientSoundscape = () => {
  const context = useContext(AmbientSoundscapeContext);
  if (!context) {
    throw new Error('useAmbientSoundscape must be used within an AmbientSoundscapeProvider');
  }
  return context;
};
