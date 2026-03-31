import useInView from '../hooks/useInView';
import './Education.css';

const educationData = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    school: 'Amity University Raipur',
    period: 'Aug 2024 – Jun 2028',
    type: 'university'
  },
  {
    degree: 'ISC (Class XII) - Science & Mathematics',
    school: 'St. Thomas English School, Raipur',
    period: '2024',
    type: 'school'
  }
];

const EduItem = ({ edu, index }) => {
  const [ref, visible] = useInView({ threshold: 0.1 });
  const animClass = index % 2 === 0 ? 'reveal-70deg' : 'reveal-40deg';

  return (
    <div
      ref={ref}
      className={`edu-row ${animClass} ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="edu-period">
        <span>{edu.period}</span>
      </div>
      <div className="edu-details">
        <h3 className="edu-degree">{edu.degree}</h3>
        <p className="edu-school">{edu.school}</p>
      </div>
    </div>
  );
};

const Education = () => {
  const [headerRef, headerVisible] = useInView();
  
  return (
    <section id="education" className="education-section">
      <div className="edu-header" ref={headerRef}>
        <span className={`section-label reveal from-left ${headerVisible ? 'is-visible' : ''}`} style={{ color: '#00e5a0' }}>/ EDUCATION</span>
        <h2 className={`edu-title reveal-stretch ${headerVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          ACADEMICS
        </h2>
      </div>

      <div className="edu-list">
        {educationData.map((e, i) => (
          <EduItem key={i} edu={e} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Education;
