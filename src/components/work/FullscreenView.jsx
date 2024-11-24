import React, { useState } from 'react';

export const FullscreenView = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1000,
    background: 'none',
    border: 'none',
    fontSize: '36px',
    cursor: 'pointer',
    color: '#EAF2EF',
    WebkitTextStroke: '1px #0D090A',
    textStroke: '1px #0D090A',
    padding: '20px'
  };

  return (
    <div className="fullscreen-view" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <button 
        className="navigation-arrow" 
        onClick={handlePrev}
        style={{ 
          ...arrowStyle,
          left: '20px'
        }}
      >
        ↜
      </button>
      <button 
        className="navigation-arrow" 
        onClick={handleNext}
        style={{ 
          ...arrowStyle,
          right: '20px'
        }}
      >
        ↝
      </button>
      <div className="image-container" style={{
        width: '90vh',
        height: '90vh',
        maxWidth: '90vw',
        maxHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {images[currentIndex] && (
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              width: 'auto',
              height: 'auto'
            }}
          />
        )}
      </div>
    </div>
  );
};
