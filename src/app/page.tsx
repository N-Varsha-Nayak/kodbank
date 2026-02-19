export default function Home() {
  return (
    <main className="shell">
      <section className="panel">
        <div className="topbar">
          <span className="brand">KodBank</span>
          <span className="badge">Digital Banking</span>
        </div>
        <span className="eyebrow">
          Trusted Access <b>24x7</b>
        </span>
        <h1>Welcome to KodBank</h1>
        <p className="lead">
          Open a secure customer account, login with JWT authentication, and check
          your wallet balance instantly.
        </p>
        <div className="actions">
          <a href="/register" className="btn primary">
            Open Account
          </a>
          <a href="/login" className="btn gold">
            Secure Login
          </a>
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
      </section>
    </main>
  );
}
