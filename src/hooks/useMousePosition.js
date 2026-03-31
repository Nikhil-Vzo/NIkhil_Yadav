import { useState, useEffect } from 'react';

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      let clientX = e.clientX;
      let clientY = e.clientY;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('touchmove', updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('touchmove', updateMousePosition);
    };
  }, []);

  return mousePosition;
}
