import React from 'react';
import { getAssetUrl } from '../../utils/constants';

export const MePage = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#fff',
      position: 'fixed',
      top: 0,
      left: 0,
      paddingLeft: 'calc(var(--menu-width))'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px'
      }}>
        <img
          src={getAssetUrl('images/me/star.jpg')}
          alt="Star"
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover'
          }}
        />
        <img
          src={getAssetUrl('images/me/surrealme.jpg')}
          alt="Surreal portrait"
          style={{
            width: '400px',
            height: '400px',
            objectFit: 'cover',
            marginTop: '200px'
          }}
        />
      </div>
    </div>
  );
};
