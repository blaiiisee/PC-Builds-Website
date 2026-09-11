import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Builds", to: "/builds" },
  { label: "Gaming", to: "/gaming" },
  { label: "Productivity", to: "/productivity" },
  { label: "About", to: "/about" },
];

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className={`site-header ${menuOpen ? "menu-open" : ""}`}>
        <div className="header-inner">
          <Link className="wordmark" to="/" aria-label="PC Builds home" onClick={() => setMenuOpen(false)}>
            pc builds guide
          </Link>

          <button
            className="menu-toggle"
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="menu-toggle__line" />
            <span className="menu-toggle__line" />
          </button>

          <nav
            className={menuOpen ? "is-open" : ""}
            id="primary-navigation"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) => (isActive ? "active" : undefined)}
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            <a
              className="header-social"
              href="https://www.tiktok.com/@iblaise_"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <SocialIcon />
              <span>@iblaise_</span>
            </a>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <div className="footer-inner">
          <Link className="footer-brand" to="/">
            pc builds guide
          </Link>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            className="footer-social"
            href="https://www.tiktok.com/@iblaise_"
            target="_blank"
            rel="noreferrer"
          >
            <SocialIcon />
            TikTok&nbsp; @iblaise_
          </a>
          <div className="footer-meta">
            <span>Curated in the Philippines</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function SocialIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="currentColor"
        d="M14.2 3v10.15a3.05 3.05 0 1 1-2.1-2.9V7.6a5.63 5.63 0 1 0 4.7 5.55V8.47A7.48 7.48 0 0 0 21 9.73V7.08A4.82 4.82 0 0 1 16.8 3h-2.6Z"
      />
    </svg>
  );
}
