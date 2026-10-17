import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { navItems, profile } from "@/data/content";

function useActiveSection() {
  const [active, setActive] = useState(navItems[0].id);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    const update = () => {
      const mid = window.innerHeight / 2;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(navItems[navItems.length - 1].id);
        return;
      }

      let current = navItems[0].id;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= mid) current = item.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [location.pathname]);

  return active;
}

export function SiteShell() {
  const active = useActiveSection();
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <div className="site">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="grid-bg" aria-hidden="true" />
      <header className="topbar">
        <Link className="topbar__brand" data-track="Welcome!" to="/" reloadDocument>
          {profile.brandName}
        </Link>

        <nav className="topnav" aria-label="Section index">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={onHome ? `#${item.id}` : `/#${item.id}`}
              aria-label={`${item.index} ${item.label}`}
              aria-current={onHome && active === item.id ? "true" : undefined}
            >
              <span className="topnav__box" aria-hidden="true" />
              <span className="topnav__label">{item.label}</span>
              <span className="topnav__num">{item.index}</span>
            </a>
          ))}
        </nav>

        <div className="topbar__meta">
          <span className="topbar__dot" aria-hidden="true" />
          <span data-track="site status">SYS.OK</span>
          <span className="sr-only">System status nominal</span>
        </div>
      </header>

      <main id="content" className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <span data-track="copyright">© 2026 {profile.name}</span>
        <span data-track="modus operandi">Commitment → Results</span>
      </footer>
    </div>
  );
}
