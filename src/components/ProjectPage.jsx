import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from './Projects';
import './ProjectPage.css';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) {
    return (
      <div className="pp-notfound">
        <h2>Project not found.</h2>
        <Link to="/">← Back home</Link>
      </div>
    );
  }

  const { accent } = project;

  return (
    <div className="pp-page">
      {/* Noise overlay carried forward */}
      <div className="pp-noise" />

      {/* Header */}
      <nav className="pp-nav">
        <button className="pp-back hover-target" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <span className="pp-nav-tag" style={{ color: accent }}>{project.tag}</span>
      </nav>

      {/* Hero Banner */}
      <header className="pp-hero" style={{ '--accent': accent }}>
        <div className="pp-hero-glow" style={{ background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)` }} />
        <div className="pp-hero-inner">
          <span className="pp-number" style={{ color: accent }}>{project.number}</span>
          <h1 className="pp-title">{project.title}</h1>
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="pp-live-link hover-target" style={{ borderColor: accent, color: accent }}>
              Visit Live Site ↗
            </a>
          )}
          <p className="pp-tagline">{project.tagline}</p>
          <div className="pp-stats-row">
            {project.stats.map((s) => (
              <span key={s} className="pp-stat" style={{ borderColor: accent + '55', color: accent }}>{s}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Problem / Solution */}
      <section className="pp-case-block pp-split">
        <div className="pp-block-left">
          <span className="pp-block-label" style={{ color: accent }}>THE PROBLEM</span>
          <p className="pp-body">{project.problem}</p>
        </div>
        <div className="pp-block-right">
          <span className="pp-block-label" style={{ color: accent }}>THE SOLUTION</span>
          <p className="pp-body">{project.solution}</p>
        </div>
      </section>

      {/* Divider line */}
      <div className="pp-line" style={{ background: accent + '33' }} />

      {/* Highlights */}
      <section className="pp-case-block">
        <span className="pp-block-label" style={{ color: accent }}>KEY RESULTS</span>
        <ul className="pp-highlights">
          {project.highlights.map((h, i) => (
            <li key={i} className="pp-highlight-item" style={{ '--accent': accent }}>
              <span className="pp-bullet" style={{ background: accent }} />
              {h}
            </li>
          ))}
        </ul>
      </section>

      {/* Stack */}
      <section className="pp-case-block">
        <span className="pp-block-label" style={{ color: accent }}>TECH STACK</span>
        <div className="pp-stack">
          {project.stack.map((s) => (
            <span key={s} className="pp-stack-tag" style={{ borderColor: accent + '44' }}>{s}</span>
          ))}
        </div>
      </section>

      {/* Gallery / Mockups */}
      {project.media && project.media.length > 0 && (
        <section className="pp-case-block pp-media-block">
          {Array.from(new Set(project.media.map(m => m.category || 'GALLERY'))).map(category => (
            <div key={category} className="pp-gallery-section">
              <span className="pp-block-label" style={{ color: accent, marginTop: '2rem' }}>{category.toUpperCase()}</span>
              <div className="pp-gallery">
                {project.media.filter(m => (m.category || 'GALLERY') === category).map((m, i) => (
                  m.type === 'video' ? (
                    <video key={i} src={m.src} autoPlay loop muted playsInline className="pp-media-item" />
                  ) : (
                    <img key={i} src={m.src} alt={`${project.title} ${category} ${i + 1}`} loading="lazy" className="pp-media-item" />
                  )
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer className="pp-footer">
        <Link to="/" className="pp-home-link hover-target" style={{ color: accent }}>
          ← View all projects
        </Link>
        <p className="pp-year">{project.year}</p>
      </footer>
    </div>
  );
};

export default ProjectPage;
