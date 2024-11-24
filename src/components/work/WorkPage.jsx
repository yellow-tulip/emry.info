import React, { useState } from 'react';
import { useWorkImages } from './useWorkImages';
import { GalleryView } from './GalleryView';
import { FullscreenView } from './FullscreenView';
import { ViewToggle } from './ViewToggle';
import { SketchesView } from './SketchesView';
import { SoundView } from './SoundView';

export const WorkPage = () => {
  const [isGalleryView, setIsGalleryView] = useState(true);
  const [viewMode, setViewMode] = useState('stills');
  const { images, sketchImages } = useWorkImages();

  const currentImages = viewMode === 'stills' ? images : sketchImages;

  const renderContent = () => {
    if (viewMode === 'sound') {
      return <SoundView />;
    }
    
    if (viewMode === 'sketches' && isGalleryView) {
      return <SketchesView images={sketchImages} />;
    }
    
    return isGalleryView ? (
      <GalleryView images={currentImages} />
    ) : (
      <FullscreenView images={currentImages} />
    );
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      position: 'relative'
    }}>
      {renderContent()}

      <div style={{ 
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-end',
        background: 'transparent',
        width: 'auto',
        pointerEvents: 'auto'
      }}>
        <div style={{
          position: 'relative',
          marginBottom: '5px',
          opacity: viewMode === 'sound' ? 0 : 1,
          visibility: viewMode === 'sound' ? 'hidden' : 'visible',
          height: '24px'
        }}>
          <ViewToggle 
            isGalleryView={isGalleryView} 
            onClick={() => setIsGalleryView(!isGalleryView)} 
          />
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px',
          marginTop: '10px',
          background: 'transparent',
          width: 'auto'
        }}>
          {['stills', 'sketches', 'sound'].map((mode) => (
            <button 
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{ 
                background: 'transparent',
                border: 'none',
                color: viewMode === mode ? '#000' : '#666',
                cursor: 'pointer',
                padding: 0,
                fontWeight: 'bold',
                textAlign: 'right',
                width: 'auto'
              }}
            >
              #{mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
