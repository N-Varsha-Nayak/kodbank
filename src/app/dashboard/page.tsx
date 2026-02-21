"use client";

import { useMemo, useState } from "react";

export default function DashboardPage() {
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);

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

  const transactions = [
    {
      title: "Cafe and Restaurant",
      type: "Expense",
      amount: "-$150.00",
      tone: "neg",
      tag: "DR",
    },
    {
      title: "Market Groceries",
      type: "Expense",
      amount: "-$250.00",
      tone: "neg",
      tag: "MK",
    },
    {
      title: "Quick Transfer",
      type: "Income",
      amount: "+$350.00",
      tone: "pos",
      tag: "QT",
    },
    {
      title: "Fuel Station",
      type: "Expense",
      amount: "-$90.00",
      tone: "neg",
      tag: "FL",
    },
    {
      title: "Retail Cashback",
      type: "Income",
      amount: "+$55.00",
      tone: "pos",
      tag: "CB",
    },
  ];

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
    <main className={`shell ${balance ? "party" : ""} bank-shell`}>
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

      <section className={`bank-dashboard ${isBotOpen ? "bot-open" : ""}`}>
        <aside className="bank-sidebar">
          <div className="bank-logo">KB</div>
          <nav className="bank-nav">
            <a className="active" href="/dashboard">
              Dashboard
            </a>
            <a href="#">Transfer</a>
            <a href="#">Transactions</a>
            <a href="#">Accounts & Cards</a>
            <a href="#">Investments</a>
            <a href="#">Settings</a>
          </nav>
        </aside>

        <div className="bank-main">
          <header className="bank-topbar">
            <div>
              <p className="small-label">KodBank</p>
              <h1>Dashboard</h1>
            </div>
            <div className="profile-chip">
              <span className="avatar">CU</span>
              <span>Customer</span>
            </div>
          </header>

          <div className="bank-grid">
            <section className="left-zone">
              <div className="metric-row">
                <article className="metric-card">
                  <p>Total Balance</p>
                  <h2>{balance ? `$${balance}` : "Tap Check Balance"}</h2>
                  <div className="metric-foot">
                    <span className="up">Income +2.35%</span>
                    <span>Expense -1.10%</span>
                  </div>
                  <button
                    className="btn primary"
                    onClick={checkBalance}
                    disabled={loading}
                  >
                    {loading ? "Checking..." : "Check Balance"}
                  </button>
                  {!!error && <p className="hint err">{error}</p>}
                </article>

                <article className="metric-card">
                  <p>Total Savings</p>
                  <h2>USD 5,000.00</h2>
                  <div className="mini-bars">
                    <i style={{ height: "14%" }} />
                    <i style={{ height: "22%" }} />
                    <i style={{ height: "30%" }} />
                    <i style={{ height: "40%" }} />
                    <i style={{ height: "64%" }} />
                    <i style={{ height: "78%" }} />
                    <i style={{ height: "88%" }} />
                  </div>
                </article>
              </div>

              <article className="analytics-card">
                <div className="chart-head">
                  <h3>Statistics</h3>
                  <span>Last 7 days</span>
                </div>
                <div className="bar-chart">
                  <div>
                    <i style={{ height: "34%" }} />
                    <b style={{ height: "54%" }} />
                  </div>
                  <div>
                    <i style={{ height: "45%" }} />
                    <b style={{ height: "47%" }} />
                  </div>
                  <div>
                    <i style={{ height: "52%" }} />
                    <b style={{ height: "85%" }} />
                  </div>
                  <div>
                    <i style={{ height: "44%" }} />
                    <b style={{ height: "63%" }} />
                  </div>
                  <div>
                    <i style={{ height: "37%" }} />
                    <b style={{ height: "68%" }} />
                  </div>
                  <div>
                    <i style={{ height: "33%" }} />
                    <b style={{ height: "42%" }} />
                  </div>
                  <div>
                    <i style={{ height: "26%" }} />
                    <b style={{ height: "35%" }} />
                  </div>
                </div>
              </article>

              <div className="bottom-row">
                <article className="sub-card goal">
                  <h3>Goals</h3>
                  <p>Summer Vacation</p>
                  <div className="progress">
                    <span style={{ width: "50%" }} />
                  </div>
                  <strong>50% reached</strong>
                </article>

                <article className="sub-card spend">
                  <h3>Spending Overview</h3>
                  <ul>
                    <li>
                      <span>Groceries</span>
                      <b>68%</b>
                    </li>
                    <li>
                      <span>Withdrawals</span>
                      <b>20%</b>
                    </li>
                    <li>
                      <span>Retail</span>
                      <b>10%</b>
                    </li>
                    <li>
                      <span>Petrol</span>
                      <b>2%</b>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="right-zone">
              <article className="transactions-card">
                <div className="chart-head">
                  <h3>Transactions</h3>
                  <a href="#">View all</a>
                </div>
                <div className="txn-list">
                  {transactions.map((txn) => (
                    <div key={`${txn.title}-${txn.amount}`} className="txn-item">
                      <span className="txn-tag">{txn.tag}</span>
                      <div className="txn-copy">
                        <strong>{txn.title}</strong>
                        <small>{txn.type}</small>
                      </div>
                      <b className={txn.tone === "pos" ? "pos" : "neg"}>{txn.amount}</b>
                    </div>
                  ))}
                </div>
              </article>

              <article className="assistant-card premium compact">
                <div className="assistant-head">
                  <h2>Need Help?</h2>
                  <p>Open BrainyBot in-app for instant banking support.</p>
                </div>
                <button className="btn gold bot-launch" onClick={() => setIsBotOpen(true)}>
                  Open BrainyBot
                </button>
              </article>
            </section>
          </div>
        </div>

        <aside className={`bot-sidebar ${isBotOpen ? "open" : ""}`}>
          <div className="bot-sidebar-head">
            <div>
              <h3>BrainyBot Assistant</h3>
              <p>Customer support in sidebar</p>
            </div>
            <button
              type="button"
              className="bot-close"
              onClick={() => setIsBotOpen(false)}
              aria-label="Close BrainyBot"
            >
              X
            </button>
          </div>
          <iframe
            src="https://brainybot-tau.vercel.app/"
            title="BrainyBot Banking Assistant"
            className="bot-sidebar-frame"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </aside>
      </section>
    </main>
  );
}

