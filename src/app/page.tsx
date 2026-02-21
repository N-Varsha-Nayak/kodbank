export default function Home() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="hero-grid">
          <article className="hero-card">
            <div className="topbar">
              <span className="brand-mark">KB</span>
              <span className="badge">Digital Banking</span>
            </div>
            <span className="eyebrow">
              Trusted Access <b>24x7</b>
            </span>
            <h1>Welcome to KodBank</h1>
            <p className="lead">
              Open a secure customer account, login with JWT authentication, and
              check your wallet balance instantly with <strong>real-time</strong>
              visibility.
            </p>
            <div className="actions">
              <a href="/register" className="btn primary">
                Open Account
              </a>
              <a href="/login" className="btn gold">
                Secure Login
              </a>
            </div>
            <div className="trust-row">
              <span className="trust-chip">FDIC style protection</span>
              <span className="trust-chip">Instant alerts</span>
              <span className="trust-chip">Dedicated support</span>
            </div>
            <div className="feature-grid">
              <div className="feature">
                <strong>Encrypted Auth</strong>
                <span>JWT with signed claims</span>
              </div>
              <div className="feature">
                <strong>Safe Storage</strong>
                <span>Aiven MySQL over SSL</span>
              </div>
              <div className="feature">
                <strong>Fast Access</strong>
                <span>One-click balance check</span>
              </div>
            </div>
          </article>

          <aside className="hero-card deep float-glow">
            <span className="hero-highlight">Premium Customer Suite</span>
            <h2>Bank-grade control, built for clarity.</h2>
            <p>
              See your balances, savings goals, and transfers at a glance. Every
              interaction is protected by smart authentication and adaptive
              security.
            </p>
            <div className="hero-stats">
              <div className="stat-pill">
                <b>2.5x</b>
                <span>Faster support</span>
              </div>
              <div className="stat-pill">
                <b>99.9%</b>
                <span>Uptime cover</span>
              </div>
              <div className="stat-pill">
                <b>60 sec</b>
                <span>Onboarding</span>
              </div>
            </div>
          </aside>
        </div>

        {/* BrainyBot removed from homepage for a cleaner look */}
      </section>
    </main>
  );
}
