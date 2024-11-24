import React, { useState, useEffect } from 'react';

const characters = [
  { id: 1, emoji: '🌸', size: 24 },
  { id: 2, emoji: '🍡', size: 28 },
  { id: 3, emoji: '🎀', size: 26 },
  { id: 4, emoji: '⭐', size: 22 },
  { id: 5, emoji: '🌟', size: 24 },
  { id: 6, emoji: '✨', size: 20 }
];

const getRandomPosition = (menuWidth = 270) => {
  // Ensure characters stay within viewport and avoid menu area
  const x = Math.random() * (window.innerWidth - menuWidth - 50) + menuWidth;
  const y = Math.random() * (window.innerHeight - 50);
  return { x, y };
};

const KawaiiCharacter = ({ emoji, size, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const moveCharacter = () => {
      const newPosition = getRandomPosition();
      setPosition(newPosition);
    };

    const interval = setInterval(moveCharacter, Math.random() * 3000 + 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        fontSize: size,
        transition: 'all 0.3s ease-out',
        zIndex: 10,
        pointerEvents: 'none',
        userSelect: 'none',
        filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.1))',
      }}
    >
      {emoji}
    </div>
  );
};

export const KawaiiCharacters = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Initialize positions
    const initialPositions = characters.map(() => getRandomPosition());
    setPositions(initialPositions);
  }, []);

  if (positions.length === 0) return null;

  return (
    <>
      {characters.map((char, index) => (
        <KawaiiCharacter
          key={char.id}
          emoji={char.emoji}
          size={char.size}
          initialPosition={positions[index]}
        />
      ))}
    </>
  );
};
