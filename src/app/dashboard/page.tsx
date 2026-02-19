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
        <h1>User Dashboard</h1>
        <p>Welcome. Click below to verify JWT and fetch your balance.</p>

        <div className="actions">
          <button className="btn primary" onClick={checkBalance} disabled={loading}>
            {loading ? "Checking..." : "Check Balance"}
          </button>
          <a href="/login" className="btn">
            Back to Login
          </a>
        </div>

        {balance && (
          <p className="hint ok" style={{ fontSize: "1.05rem", fontWeight: 700 }}>
            your balance is : {balance}
          </p>
        )}
        {!!error && <p className="hint err">{error}</p>}
      </section>
    </main>
  );
}

