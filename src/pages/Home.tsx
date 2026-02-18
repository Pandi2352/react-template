import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { env } from '@/config/env';
import { useAuth } from '@/hooks';
import { ArrowRight, Zap, Shield, Layers } from 'lucide-react';

export function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to{' '}
          <span className="text-primary">{env.APP_NAME}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          A modern React template with authentication, routing, and a clean component
          library — ready for your next project.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          {isAuthenticated ? (
            <Link
              to={ROUTES.DASHBOARD}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="w-full border-t border-gray-100 py-20">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Fast Development</h3>
            <p className="mt-2 text-sm text-gray-600">
              Vite + React 19 + TypeScript with hot module replacement for instant feedback.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-green-50 p-3">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Auth Ready</h3>
            <p className="mt-2 text-sm text-gray-600">
              Built-in authentication context with JWT token management and route guards.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 p-6">
            <div className="mb-4 inline-flex rounded-lg bg-indigo-50 p-3">
              <Layers className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Component Library</h3>
            <p className="mt-2 text-sm text-gray-600">
              Buttons, inputs, modals, toasts, tooltips and more — all styled with Tailwind CSS.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
