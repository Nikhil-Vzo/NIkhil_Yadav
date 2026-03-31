import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { sfx } from '../utils/sfx';
import './CursorBunny.css';

const CursorBunny = () => {
  const bunnyWrapperRef = useRef(null);
  const [speechText, setSpeechText] = useState('');

  useEffect(() => {
    const el = bunnyWrapperRef.current;
    if (!el) return;

    // We use GSAP quickTo for highly performant tracking
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' });

    const moveBunny = (e) => {
      let clientX = e.clientX;
      let clientY = e.clientY;
      
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      const xOffset = clientX;
      const yOffset = clientY + 20; 
      xTo(xOffset);
      yTo(yOffset);
    };

    const handleMouseOver = (e) => {
      // AudioCtx initializing on interaction
      try { sfx.init(); } catch (err) {}

      const sectionTarget = e.target.closest('section');
      let newText = '';
      
      if (sectionTarget && sectionTarget.id) {
        switch(sectionTarget.id) {
          case 'hero':
            newText = 'HEY THERE! SCROLL DOWN';
            break;
          case 'about':
            newText = 'THIS IS MY ARCHITECT';
            break;
          case 'projects':
            newText = 'LOOK AT THESE BUILDS';
            break;
          case 'contact':
            newText = 'LET\'S TALK!';
            break;
          default:
            newText = '';
        }
      }

      setSpeechText(prev => {
        if (prev !== newText && newText !== '') {
          // Play a slight futuristic bloop when UI bubble pops up
          try { sfx.playBloop(); } catch(err) {}
        }
        return newText;
      });
    };

    window.addEventListener('mousemove', moveBunny);
    window.addEventListener('touchmove', moveBunny, { passive: true });
    window.addEventListener('touchstart', moveBunny, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    
    // Set initial position
    gsap.set(el, { 
      x: -200, 
      y: -200, 
      xPercent: -50, 
      yPercent: -50,
      scale: window.innerWidth < 768 ? 0.6 : 1.5,
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
      document.removeEventListener('mouseover', handleMouseOver);
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
      
      {/* Dynamic Speech Bubble */}
      <div className={`bunny-speech-bubble ${speechText ? 'is-visible' : ''}`}>
        <div className="speech-tail"></div>
        {speechText && <p>{speechText}</p>}
      </div>
    </div>
  );
};

export default CursorBunny;
