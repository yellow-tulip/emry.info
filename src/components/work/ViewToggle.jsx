import React from 'react';

export const ViewToggle = ({ isGalleryView, onClick }) => (
  <button 
    className="work-view-toggle"
    onClick={onClick}
    aria-label={isGalleryView ? 'Switch to fullscreen view' : 'Switch to gallery view'}
  >
    *
  </button>
);
