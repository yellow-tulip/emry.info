import React from 'react';
import { useAmbientSoundscape } from './AmbientSoundscapeContext';

export const VolumeControl = () => {
  const { soundscapeRef } = useAmbientSoundscape();

  const handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    if (soundscapeRef && soundscapeRef.mainBus) {
      soundscapeRef.mainBus.gain.value = volume;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      left: '20px',
      bottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      zIndex: 1000
    }}>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="1"
        onChange={handleVolumeChange}
        style={{
          width: '100px',
          cursor: 'pointer',
          accentColor: '#CDDFFA'
        }}
      />
    </div>
  );
};
