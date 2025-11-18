export default function AuthLayout({
  heading,
  subheading,
  asideTitle,
  asideDescription,
  asideHighlights = [],
  badge = "ThinkSpace",
  children,
  footer,
}) {
  return (
    <div className="auth-page">
      <div className="background-noise" />
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      <div className="auth-grid">
        <section className="auth-showcase">
          <span className="auth-pill">{badge}</span>
          <h2>{asideTitle}</h2>
          <p>{asideDescription}</p>
          <div className="showcase-highlights">
            {asideHighlights.map((item) => (
              <article key={item.title} className="highlight-card">
                <div className="highlight-accent" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="floating-metrics">
            <div>
              <span>42k+</span>
              <p>ideas sparked</p>
            </div>
            <div>
              <span>87%</span>
              <p>feel more creative</p>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <div>
            <p className="card-pill">Welcome to ThinkSpace</p>
            <h1>{heading}</h1>
            <p className="card-subtitle">{subheading}</p>
          </div>
          {children}
          {footer && <div className="auth-footer">{footer}</div>}
        </section>
      </div>
    </div>
  );
}

