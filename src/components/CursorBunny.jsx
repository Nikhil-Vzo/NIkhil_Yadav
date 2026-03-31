import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CursorBunny.css';

const CursorBunny = () => {
  const bunnyWrapperRef = useRef(null);

  useEffect(() => {
    const el = bunnyWrapperRef.current;
    if (!el) return;

    // We use GSAP quickTo for highly performant tracking
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' });

    const moveBunny = (e) => {
      let clientX = e.clientX;
      let clientY = e.clientY;
      
      // Handle mobile touch tracking
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      const xOffset = clientX;
      const yOffset = clientY + 20; // Float slightly below finger/cursor
      xTo(xOffset);
      yTo(yOffset);
    };

    window.addEventListener('mousemove', moveBunny);
    window.addEventListener('touchmove', moveBunny, { passive: true });
    window.addEventListener('touchstart', moveBunny, { passive: true });
    
    // Set initial position out of view, but configure centering and scaling properly
    gsap.set(el, { 
      x: -200, 
      y: -200, 
      xPercent: -50, 
      yPercent: -50,
      scale: window.innerWidth < 768 ? 0.6 : 1.5, // Scaled up!
      opacity: 1 
    });

    const modelViewer = el.querySelector('model-viewer');
    const handleBunnyLoad = () => {
      window.dispatchEvent(new Event('bunnyLoaded'));
    };
    if (modelViewer) {
      modelViewer.addEventListener('load', handleBunnyLoad);
    }

    return () => {
      window.removeEventListener('mousemove', moveBunny);
      window.removeEventListener('touchmove', moveBunny);
      window.removeEventListener('touchstart', moveBunny);
      if (modelViewer) {
        modelViewer.removeEventListener('load', handleBunnyLoad);
      }
    };
  }, []);

  return (
    <div className="cursor-bunny-wrapper" ref={bunnyWrapperRef}>
      <model-viewer
        src="/bun_bun.glb"
        autoplay
        animation-crossfade-duration="0.5"
        interaction-prompt="none"
        disable-zoom
        disable-pan
        shadow-intensity="0"
        exposure="1"
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      />
    </div>
  );
};

export default CursorBunny;
