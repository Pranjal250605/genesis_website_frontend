import React from 'react';

const StarField = () => {
  return (
    <div 
      className="absolute inset-0 z-[5] pointer-events-none opacity-40"
      style={{
        backgroundColor: '#050505',
        backgroundImage: `
          radial-gradient(1px 1px at 25px 35px, white, transparent),
          radial-gradient(2px 2px at 50px 100px, white, transparent),
          radial-gradient(1.5px 1.5px at 120px 210px, white, transparent),
          radial-gradient(3px 3px at 200px 50px, white, transparent),
          radial-gradient(2.5px 2.5px at 280px 140px, white, transparent)
        `,
        backgroundSize: '350px 200px', // This creates the "infinite" repeating random pattern
      }}
    />
  );
};

export default StarField;