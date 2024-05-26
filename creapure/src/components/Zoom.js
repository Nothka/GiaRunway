import React, { useState } from 'react';

const Zoom = ({ src }) => {
  const [backgroundPosition, setBackgroundPosition] = useState('20% 20%');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    // Add your custom condition here, for example, trigger when the cursor is within 510px from the left edge
    const triggerCondition = e.pageX < e.currentTarget.getBoundingClientRect().left+ 910;

    if (!isHovered && triggerCondition) {
      setIsHovered(true);
    }

    // Rest of the code remains the same
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`relative overflow-hidden w-full ${isHovered ? 'max-w-[76.5%]' : 'max-w-[76.5%]'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <div
          style={{ backgroundImage: `url(${src})`, backgroundPosition }}
          className='absolute top-0 left-0 w-full h-full opacity-100 rounded-xl transition-opacity duration-300'
        ></div>
      ) : null}
      <img
        src={src}
        alt='Zoomed'
        className={`w-full transition-transform rounded-xl duration-300 transform ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

export default Zoom;
