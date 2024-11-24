import { useState, useEffect } from 'react';
import { getAssetUrl } from '../../utils/constants';

// Static images arranged in order shown, 3 per row
const imageFiles = [
  'cigratte.jpg',      // Row 1
  'sky.jpg',
  'glow.jpg',
  'trainseat.jpg',     // Row 2
  'thedock.jpg',
  'snowhill.jpg',
  'ladyinthetrain.jpg', // Row 3
  'darkness fire july4.jpg',
  'cecilia.jpg',
  'trainppl.jpg',      // Row 4
  'IMG_3822.png',
  'IMG_3829.png',
  'snowprints-2.jpg',  // Row 5
  'IMG_0138.jpg',
  'blankets.jpg'
];

// Sketch images - reordered with sketchbook5.jpg at the end
const sketchFiles = [
  'sketchbook1.png',
  'sketchbook2.png',
  'sketchbook3.png',
  'sketchbook4.png',
  'sketchbook5.png',
  'sketchbook6.png',
  'sketchbook5.jpg'
];

const loadImage = (src, priority = false) => {
  return new Promise((resolve) => {
    // First, quickly resolve with default dimensions
    resolve({
      width: 400,  // Default width
      height: 600, // Default height
      naturalWidth: 400,
      naturalHeight: 600,
      aspectRatio: 0.67,
      loaded: false,
      src
    });

    // Then load the actual image in the background
    const img = new Image();
    if (priority) {
      img.fetchPriority = 'high';
    }
    
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        aspectRatio: img.width / img.height,
        loaded: true,
        src
      });
    };

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      // Keep the default dimensions on error
    };

    img.src = src;
  });
};

export const useWorkImages = () => {
  const [images, setImages] = useState([]);
  const [sketchImages, setSketchImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load main images immediately
  useEffect(() => {
    let mounted = true;

    const loadImages = async () => {
      try {
        const loadedImages = await Promise.all(
          imageFiles.map(async (filename, index) => {
            try {
              const src = getAssetUrl(`images/work/${filename}`);
              const dimensions = await loadImage(src, index < 6); // Priority load first 6 images
              return {
                id: `image-${index}`,
                src,
                alt: `Work ${index + 1}`,
                ...dimensions,
                position: { x: 0, y: 0 }
              };
            } catch (err) {
              console.warn(`Failed to load image: ${filename}`, err);
              return null;
            }
          })
        );

        if (mounted) {
          setImages(loadedImages.filter(img => img !== null));
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          console.error('Error loading images:', err);
          setError(err);
          setLoading(false);
        }
      }
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, []);

  // Load sketch images when needed
  useEffect(() => {
    let mounted = true;

    const loadSketches = async () => {
      if (sketchImages.length > 0) return; // Don't reload if already loaded

      try {
        const loadedSketches = await Promise.all(
          sketchFiles.map(async (filename, index) => {
            try {
              const src = getAssetUrl(`images/sketches/${filename}`);
              const dimensions = await loadImage(src, index < 4); // Priority load first 4 sketches
              return {
                id: `sketch-${index}`,
                src,
                alt: `Sketch ${index + 1}`,
                ...dimensions,
                position: { x: 0, y: 0 }
              };
            } catch (err) {
              console.warn(`Failed to load sketch: ${filename}`, err);
              return null;
            }
          })
        );

        if (mounted) {
          setSketchImages(loadedSketches.filter(img => img !== null));
        }
      } catch (err) {
        if (mounted) {
          console.error('Error loading sketches:', err);
          setError(err);
        }
      }
    };

    loadSketches();

    return () => {
      mounted = false;
    };
  }, []); // Only load once when needed

  return { 
    images, 
    sketchImages,
    loading, 
    error,
    progress: loading ? 0 : 100
  };
};
