import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [hoverText, setHoverText] = useState(null);
  const [hoverState, setHoverState] = useState('default'); // default, expand, hidden
  const [sectionTheme, setSectionTheme] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let speed = 0.2; // Lerp speed

    const onMouseMove = (e) => {
      let clientX = e.clientX;
      let clientY = e.clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      mouseX = clientX;
      mouseY = clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('.hover-target, a, button, .project-row');
      if (target) {
        setHoverState('expand');
        if (target.classList.contains('project-row')) {
          setHoverText('VIEW');
        } else if (target.classList.contains('contact-link')) {
          setHoverText('SAY HI');
        } else if (target.closest('.pp-back') || target.closest('.pp-home-link')) {
          setHoverText('BACK');
        } else {
          setHoverText('');
        }
      } else {
        setHoverState('default');
        setHoverText(null);
      }

      const sectionTarget = e.target.closest('section');
      if (sectionTarget && sectionTarget.id) {
        setSectionTheme(`theme-${sectionTarget.id}`);
      } else {
        setSectionTheme('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchstart', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${hoverState} ${hoverText ? 'has-text' : ''} ${sectionTheme}`}
    >
      {hoverText && <span className="cursor-text">{hoverText}</span>}
    </div>
  );
};

export default CustomCursor;
