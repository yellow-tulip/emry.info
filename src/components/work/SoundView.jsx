import React from 'react';

export const SoundView = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        display: 'flex',
        gap: '40px',
        padding: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <iframe
            style={{
              border: 0,
              width: '350px',
              height: '470px'
            }}
            src="https://bandcamp.com/EmbeddedPlayer/album=4103168189/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
            seamless
          >
            <a href="https://snowfinch.bandcamp.com/album/resting-place-nest">resting-place, nest by snow finch</a>
          </iframe>
          <p style={{
            fontFamily: 'Times New Roman',
            fontSize: '12pt',
            lineHeight: '1.25',
            margin: 0,
            padding: 0,
            width: '350px',
            textAlign: 'left'
          }}>
            this is the sound of my heart
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <iframe
            style={{
              border: 0,
              width: '350px',
              height: '470px'
            }}
            src="https://bandcamp.com/EmbeddedPlayer/album=2541905902/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
            seamless
          >
            <a href="https://snowfinch.bandcamp.com/album/01">01 by snow finch</a>
          </iframe>
          <p style={{
            fontFamily: 'Times New Roman',
            fontSize: '12pt',
            lineHeight: '1.25',
            margin: 0,
            padding: 0,
            width: '350px',
            textAlign: 'left'
          }}>
           a selection of bedroom pop songs written during a summer of reclusion
          </p>
        </div>
      </div>
    </div>
  );
};
