"use client";

import { useEffect, useState } from "react";

type BrainyBotDrawerProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export default function BrainyBotDrawer({
  title = "BrainyBot Assistant",
  description = "Chat with the banking assistant inside a secure drawer.",
  buttonLabel = "Open",
}: BrainyBotDrawerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <div className="assistant-launch">
        <div className="assistant-icon">BB</div>
        <div>
          <strong>{title}</strong>
          <p className="muted-link">{description}</p>
        </div>
        <button type="button" className="btn primary" onClick={() => setOpen(true)}>
          {buttonLabel}
        </button>
      </div>

      {open && (
        <div className="bot-overlay" role="dialog" aria-modal="true">
          <button
            type="button"
            className="bot-backdrop"
            onClick={() => setOpen(false)}
            aria-label="Close BrainyBot drawer"
          />
          <div className="bot-drawer">
            <div className="bot-header">
              <div>
                <p className="small-label">KodBank Assistant</p>
                <h3 className="bot-title">BrainyBot</h3>
              </div>
              <button type="button" className="bot-close" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <iframe
              src="https://brainybot-tau.vercel.app/"
              title="BrainyBot Banking Assistant"
              className="bot-frame"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </>
  );
}
