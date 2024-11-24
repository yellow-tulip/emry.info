import React from 'react';

export const SketchesView = ({ images = [] }) => {
  const maxWidth = 900;
  const gap = 40;
  const columns = 2;

  return (
    <div className="sketches-view" style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      background: 'transparent',
      paddingTop: '80px'
    }}>
      <div className="sketches-grid" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        width: '100%',
        maxWidth: `${maxWidth}px`,
        margin: '0 auto',
        position: 'relative',
        background: 'transparent'
      }}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className="sketch-item"
            style={{
              width: '100%',
              position: 'relative',
              maxWidth: '400px',
              margin: '0 auto'
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading={index < 4 ? "eager" : "lazy"}
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: '600px',
                objectFit: 'contain'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
