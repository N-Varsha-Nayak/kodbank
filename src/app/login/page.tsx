"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      username: form.get("username"),
      password: form.get("password"),
    };

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      setError(data.message ?? "Login failed.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="shell auth-shell">
      <section className="auth-panel">
        <div>
          <div className="topbar">
            <span className="brand-mark">KB</span>
            <span className="badge">Customer Access</span>
          </div>
          <span className="eyebrow">
            Identity Check <b>Step 2</b>
          </span>
          <h1>Login</h1>
          <p className="lead">Enter valid username and password.</p>

          <form onSubmit={onSubmit} className="grid">
            <div className="field">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" type="text" required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required />
            </div>

            <div className="actions">
              <button type="submit" className="btn primary" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              <a href="/register" className="btn gold">
                Create Account
              </a>
            </div>
          </form>
          {!!error && <p className="hint err">{error}</p>}
          <p className="muted-link">
            New here? <a href="/register">Open your KodBank account</a>
          </p>
        </div>

        <aside className="auth-visual">
          <div className="topbar">
            <span className="brand">KodBank</span>
            <span className="badge">Security</span>
          </div>
          <h2>Secure login, verified every time.</h2>
          <p>
            We evaluate device signals and session freshness to keep your access
            safe.
          </p>
          <div className="kpi-row">
            <div className="kpi-card">
              <span>Session shield</span>
              <strong>Active</strong>
            </div>
            <div className="kpi-card">
              <span>Risk score</span>
              <strong>Low</strong>
            </div>
          </div>
          <ul className="security-list">
            <li>
              <span className="security-dot" />
              Continuous anomaly checks
            </li>
            <li>
              <span className="security-dot" />
              Encrypted cookie sessions
            </li>
            <li>
              <span className="security-dot" />
              Adaptive alerts and notices
            </li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
