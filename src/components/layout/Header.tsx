import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { env } from '@/config/env';
import { AnimatedLogo } from '@/components/common/AnimatedLogo';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 text-xl font-bold text-primary">
          <AnimatedLogo size={32} />
          {env.APP_NAME}
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to={ROUTES.LOGIN}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
