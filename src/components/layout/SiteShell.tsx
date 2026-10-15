import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { navItems, profile } from "@/data/content";

function useActiveSection() {
  const [active, setActive] = useState(navItems[0].id);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;
    const nodes = navItems
      .map((item) => document.getElementById(item.id))
      .filter((n): n is HTMLElement => Boolean(n));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [location.pathname]);

  return active;
}

export function SiteShell() {
  const active = useActiveSection();
  const location = useLocation();
  const onHome = location.pathname === "/";

  const rail = useMemo(() => navItems, []);

  return (
    <div className="site">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="grid-bg" aria-hidden="true" />
      <header className="topbar">
        <Link className="topbar__brand" data-track="preferred name" to="/">
          {profile.shortName}
        </Link>
        <div className="topbar__meta">
          <span className="topbar__dot" aria-hidden="true" />
          <span data-track="site status">SYS.OK</span>
          <span className="sr-only">System status nominal</span>
        </div>
      </header>
      <nav className="rail" aria-label="Section index">
        <div className="rail__mark">FRAME</div>
        {rail.map((item) => (
          <a
            key={item.id}
            href={onHome ? `#${item.id}` : `/#${item.id}`}
            data-index={item.index}
            aria-label={`${item.index} ${item.label}`}
            aria-current={onHome && active === item.id ? "true" : undefined}
          />
        ))}
      </nav>
      <main id="content" className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <span data-track="copyright">© 2026 {profile.name}</span>
        <span data-track="modus operandi">Commitment → Results</span>
      </footer>
      <nav className="mobile-nav" aria-label="Mobile sections">
        {rail.map((item) => (
          <a
            key={item.id}
            href={onHome ? `#${item.id}` : `/#${item.id}`}
            aria-current={onHome && active === item.id ? "true" : undefined}
          >
            {item.index}
          </a>
        ))}
      </nav>
    </div>
  );
}
