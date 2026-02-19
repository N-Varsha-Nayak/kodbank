"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      uid: form.get("uid"),
      uname: form.get("uname"),
      email: form.get("email"),
      password: form.get("password"),
      phone: form.get("phone"),
      role: "Customer",
    };

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      setError(data.message ?? "Registration failed");
      setLoading(false);
      return;
    }

    setMessage(data.message ?? "Registration successful.");
    setTimeout(() => router.push("/login"), 700);
  }

  return (
    <main className="shell">
      <section className="panel">
        <div className="topbar">
          <span className="brand">KodBank</span>
          <span className="badge">New Customer</span>
        </div>
        <span className="eyebrow">
          Account Setup <b>Step 1</b>
        </span>
        <h1>Create Account</h1>

        <form onSubmit={onSubmit} className="grid">
          <div className="split">
            <div className="field">
              <label htmlFor="uid">UID</label>
              <input id="uid" name="uid" type="number" required />
            </div>

            <div className="field">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value="Customer" disabled>
                <option value="Customer">Customer</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="uname">Username</label>
            <input id="uname" name="uname" type="text" required />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" required />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>

          <div className="actions">
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
            <a href="/login" className="btn">
              Go to Login
            </a>
          </div>
        </form>

        {!!message && <p className="hint ok">{message}</p>}
        {!!error && <p className="hint err">{error}</p>}
        <p className="muted-link">
          Already registered? <a href="/login">Login securely</a>
        </p>
      </section>
    </main>
  );
}
