import React from "react";
import { getAssetUrl } from '../utils/constants';

const borderKawaii = [
  '♡', '✧', '*', '✿', '★', '☆', '❀', '✮', '<3', '✩', '✫', '♡', '✧', '*', '✿', '★'
];

export const Fountain = () => {
  return (
    <div className="fountain-wrapper">
      <style>{`
        .fountain-wrapper {
          position: fixed;
          bottom: 40px;
          right: 40px;
          width: 500px;
          height: 500px;
          image-rendering: pixelated;
        }

        .fountain-container {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 20px;
        }

        .fountain-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          animation: none;
          animation-play-state: paused;
          transition: none;
        }

        .kawaii-border {
          position: absolute;
          color: #CDDFFA;
          font-size: 20px;
          opacity: 0.6;
          pointer-events: none;
          transform-origin: center;
        }

        /* Top border characters */
        .kawaii-border.top {
          top: -12px;
        }

        /* Bottom border characters */
        .kawaii-border.bottom {
          bottom: -12px;
        }

        /* Left border characters */
        .kawaii-border.left {
          left: -12px;
          writing-mode: vertical-rl;
        }

        /* Right border characters */
        .kawaii-border.right {
          right: -12px;
          writing-mode: vertical-rl;
        }
      `}</style>
      <div className="fountain-container">
        {/* Top border */}
        {borderKawaii.slice(0, 4).map((char, i) => (
          <span
            key={`top-${i}`}
            className="kawaii-border top"
            style={{ left: `${(i + 1) * 20}%` }}
          >
            {char}
          </span>
        ))}
        
        {/* Bottom border */}
        {borderKawaii.slice(4, 8).map((char, i) => (
          <span
            key={`bottom-${i}`}
            className="kawaii-border bottom"
            style={{ left: `${(i + 1) * 20}%` }}
          >
            {char}
          </span>
        ))}
        
        {/* Left border */}
        {borderKawaii.slice(8, 12).map((char, i) => (
          <span
            key={`left-${i}`}
            className="kawaii-border left"
            style={{ top: `${(i + 1) * 20}%` }}
          >
            {char}
          </span>
        ))}
        
        {/* Right border */}
        {borderKawaii.slice(12, 16).map((char, i) => (
          <span
            key={`right-${i}`}
            className="kawaii-border right"
            style={{ top: `${(i + 1) * 20}%` }}
          >
            {char}
          </span>
        ))}
        <img 
          src={getAssetUrl('images/lamb2.gif')}
          alt="Animated lamb" 
          className="fountain-image"
        />
      </div>
    </div>
  );
};
