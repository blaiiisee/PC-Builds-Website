import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Browse Builds", to: "/", end: true },
  { label: "About", to: "/about", end: false },
  { label: "Socials", to: "/socials", end: false },
];

export function SiteLayout() {
  return (
    <>
      <header className="site-header">
        <NavLink className="wordmark" to="/" aria-label="PC Builds home">
          pc builds
        </NavLink>

        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end={item.end}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Outlet />
    </>
  );
}
