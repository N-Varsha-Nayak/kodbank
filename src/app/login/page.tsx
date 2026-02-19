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
    <main className="shell">
      <section className="panel">
        <h1>Login</h1>
        <p>Enter valid username and password.</p>

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
            <a href="/register" className="btn">
              Create account
            </a>
          </div>
        </form>
        {!!error && <p className="hint err">{error}</p>}
      </section>
    </main>
  );
}

