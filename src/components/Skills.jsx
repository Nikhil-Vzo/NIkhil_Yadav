import useInView from '../hooks/useInView';
import './Skills.css';

const categories = [
  {
    label: 'Frontend',
    accent: '#7c4dff',
    skills: ['React.js 18', 'Next.js', 'TypeScript', 'JavaScript ES6+', 'Tailwind CSS', 'GSAP', 'HTML5', 'Redux Toolkit'],
  },
  {
    label: 'Backend',
    accent: '#00e5a0',
    skills: ['Node.js 20', 'Express.js', 'REST APIs', 'GraphQL', 'JWT Auth', 'Deno', 'Edge Functions', 'Serverless'],
  },
  {
    label: 'Database',
    accent: '#ffd700',
    skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'Supabase', 'SQL', 'Query Optimization'],
  },
  {
    label: 'DevOps & Tools',
    accent: '#ff6b35',
    skills: ['Git', 'GitHub Actions', 'Docker', 'Vercel', 'Netlify', 'Postman', 'Figma', 'Jest', 'Cypress'],
  },
  {
    label: 'Other',
    accent: '#ff4d4d',
    skills: ['Java', 'Python', 'Data Structures', 'OOP', 'SEO', 'SDLC', 'Razorpay API', 'Resend API'],
  },
];

const SkillCategory = ({ cat, index }) => {
  // Use the new wild cubed/diagonal swipe based on even/odd index
  const animClass = index % 2 === 0 ? 'reveal-70deg' : 'reveal-cubic';
  const [ref, visible] = useInView({ threshold: 0.1 });
  
  return (
    <div ref={ref} className="skill-cat-wrapper" style={{ display: 'flex' }}>
      <div
        className={`skill-category ${animClass} ${visible ? 'is-visible' : ''}`}
        style={{ transitionDelay: `${index * 0.1}s`, width: '100%' }}
      >
        <div className="skill-cat-header">
          <span className="skill-dot" style={{ background: cat.accent }} />
          <span className="skill-cat-label" style={{ color: cat.accent }}>{cat.label}</span>
        </div>
        <div className="skill-pills">
          {cat.skills.map((s, i) => (
            <span
              key={s}
              className="skill-pill"
              style={{ '--accent': cat.accent, animationDelay: `${i * 0.04}s` }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [headerRef, headerVisible] = useInView();
  return (
    <section id="skills" className="skills-section">
      <div className="skills-header" ref={headerRef}>
        <span className={`section-label reveal from-left ${headerVisible ? 'is-visible' : ''}`} style={{ color: '#7c4dff' }}>/ SKILLS</span>
        <h2 className={`skills-title clip-reveal ${headerVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          WHAT I<br />WORK WITH
        </h2>
      </div>

      <div className="skills-grid">
        {categories.map((cat, i) => (
          <SkillCategory key={cat.label} cat={cat} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
