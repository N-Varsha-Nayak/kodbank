export default function Home() {
  return (
    <main className="shell">
      <section className="panel">
        <h1>KodBank</h1>
        <p>Secure login, JWT auth, and instant balance check.</p>
        <div className="actions">
          <a href="/register" className="btn primary">
            Register
          </a>
          <a href="/login" className="btn">
            Login
          </a>
        </div>
      </section>
    </main>
  );
}
