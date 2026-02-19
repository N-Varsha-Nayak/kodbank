"use client";

import { useMemo, useState } from "react";

export default function DashboardPage() {
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const confettiItems = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, idx) => {
        const left = `${(idx * 13) % 100}%`;
        const delay = `${(idx % 8) * 0.2}s`;
        const colors = ["#f94144", "#f8961e", "#f9c74f", "#90be6d", "#577590"];
        return {
          left,
          delay,
          color: colors[idx % colors.length],
        };
      }),
    []
  );

  async function checkBalance() {
    setLoading(true);
    setError("");

    const response = await fetch("/api/balance", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.message ?? "Could not fetch balance.");
      setLoading(false);
      return;
    }

    setBalance(String(data.balance));
    setLoading(false);
  }

  return (
    <main className={`shell ${balance ? "party" : ""}`}>
      {balance && (
        <div className="confetti">
          {confettiItems.map((piece, index) => (
            <i
              key={index}
              style={{
                left: piece.left,
                animationDelay: piece.delay,
                background: piece.color,
              }}
            />
          ))}
        </div>
      )}

      <section className="panel">
        <div className="topbar">
          <span className="brand">KodBank</span>
          <span className="badge">Verified Session</span>
        </div>
        <span className="eyebrow">
          Balance Services <b>Live</b>
        </span>
        <h1>User Dashboard</h1>
        <p className="lead">
          Welcome. Click below to verify your JWT and fetch account balance.
        </p>

        <div className="actions">
          <button className="btn primary" onClick={checkBalance} disabled={loading}>
            {loading ? "Checking..." : "Check Balance"}
          </button>
          <a href="/login" className="btn">
            Switch Account
          </a>
        </div>

        {balance && (
          <div className="balance-card">
            <small>Current Available Balance</small>
            <div className="balance-amount">your balance is : {balance}</div>
          </div>
        )}
        {!!error && <p className="hint err">{error}</p>}
      </section>
    </main>
  );
}
