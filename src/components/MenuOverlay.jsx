import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import MagneticElement from './MagneticElement';
import './MenuOverlay.css';

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'AWARDS', href: '#achievements' },
  { label: 'CONTACT', href: '#contact' }
];

const MenuOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  // Disable scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
  }, [isOpen, lenis]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (href, e) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Smooth scroll using Lenis to the target section
    if (lenis) {
      lenis.scrollTo(href, { offset: 0, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      // Fallback
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Pill Toggle */}
      <div className={`menu-toggle ${isOpen ? 'menu-open' : ''}`} onClick={toggleMenu}>
        <MagneticElement strength={0.4}>
          <div className="menu-pill">
            <span>{isOpen ? '[ CLOSE ]' : '[ MENU ]'}</span>
          </div>
        </MagneticElement>
      </div>

      {/* Fullscreen Overlay */}
      <div className={`menu-overlay ${isOpen ? 'is-active' : ''}`}>
        <div className="menu-inner">
          <nav className="menu-nav">
            {navLinks.map((link, i) => (
              <MagneticElement key={i} strength={0.2} tag="a">
                <a 
                  href={link.href}
                  className="menu-link hover-target"
                  onClick={(e) => handleNavClick(link.href, e)}
                  style={{ transitionDelay: isOpen ? `${i * 0.05}s` : '0s', display: 'block' }}
                >
                  <div className="menu-link-mask">
                    <span className="menu-link-text">{link.label}</span>
                  </div>
                </a>
              </MagneticElement>
            ))}
          </nav>
          
          <div className="menu-footer">
            <p>SYS.NAV // 2026/2027</p>
            <p>DESIGNED & ENGINEERED BY NIKHIL YADAV</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuOverlay;
