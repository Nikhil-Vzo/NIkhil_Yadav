import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
    </div>
  );
};

export default Home;
