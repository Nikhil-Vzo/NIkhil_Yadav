import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import CursorBunny from './components/CursorBunny';
import MenuOverlay from './components/MenuOverlay';
import AmbientLayer from './components/AmbientLayer';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import ProjectPage from './components/ProjectPage';
import './App.css';

const Home = () => (
  <main>
    <Hero />
    <About />
    <Projects />
    <Experience />
    <Education />
    <Skills />
    <Achievements />
    <Contact />
  </main>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, duration: 1.5, smoothTouch: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <CustomCursor />
      <CursorBunny />
      <AmbientLayer />
      <MenuOverlay />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
