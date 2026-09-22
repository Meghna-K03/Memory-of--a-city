import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  transparent?: boolean;
}

const LINKS = [
  { label: 'Explore', to: '/explore' },
  { label: 'Neighbourhoods', to: '/explore' },
  { label: 'About', to: '/' },
];

export default function Navbar({ transparent = false }: NavbarProps) {
  const location = useLocation();

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] flex h-[60px] items-center justify-between px-8 transition-colors ${
        transparent
          ? 'bg-gradient-to-b from-bg-deep/90 to-transparent'
          : 'border-b border-border-subtle bg-bg-deep/85 backdrop-blur-md'
      }`}
    >
      <Link
        to="/"
        className="flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-[0.12em] text-text-primary no-underline"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_8px_rgba(232,160,32,0.5)]" />
        Memory of a City
      </Link>

      <div className="flex items-center gap-1.5">
        {LINKS.map(({ label, to }) => {
          const active = location.pathname === to && label === 'Explore';
          return (
            <Link
              key={label}
              to={to}
              className={`rounded-md px-3.5 py-1.5 font-body text-[13px] font-medium no-underline transition-colors hover:bg-white/5 hover:text-text-primary ${
                active ? 'text-text-primary' : 'text-text-secondary'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
