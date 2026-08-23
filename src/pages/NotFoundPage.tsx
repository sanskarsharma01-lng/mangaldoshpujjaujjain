import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';

export const NotFoundPage: React.FC = () => {

  return (
    <>
      <SEOHead title="404 - Page Not Found" description="The page you are looking for does not exist." noIndex={true} />

      <main role="main" className="pt-24 md:pt-28 min-h-screen bg-ivory flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Mandala overlay */}
        <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />
        <div className="absolute text-gold/5 font-serif text-[30rem] select-none pointer-events-none transform translate-y-1/4">
          🕉
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto space-y-6">
          <div className="flex flex-col items-center">
            <span className="text-8xl block select-none animate-float" aria-hidden="true">🔱</span>
            <span className="text-gold font-devanagari text-4xl block font-bold mt-4 tracking-wider">त्रुटि ४०४</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-poppins font-bold text-primary">Page Not Found</h1>
            <p className="text-text-muted text-sm leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Link to="/" className="btn-primary w-full py-3">
              Go to Home Page
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
export default NotFoundPage;
