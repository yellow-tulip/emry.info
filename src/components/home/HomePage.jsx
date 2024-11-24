import React, { useRef, useEffect } from 'react';
import { getAssetUrl } from '../../utils/constants';

export const HomePage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(error => {
        console.error("Video play error:", error);
      });
    }
  }, []);

  return (
    <div style={{ 
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    }}>
      <div style={{
        width: '75vw',
        height: '75vh',
        maxWidth: '1400px',
        maxHeight: '900px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginLeft: 'calc(var(--menu-width) - 100px)'
      }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          src={getAssetUrl('homemovie.mov')}
        />
      </div>
    </div>
  );
};
