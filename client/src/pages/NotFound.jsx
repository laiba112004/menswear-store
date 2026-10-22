import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center bg-white">
      <div className="max-w-md w-full space-y-6">
        <div className="w-16 h-16 bg-brandBlack text-white mx-auto flex items-center justify-center">
          <Compass size={32} />
        </div>

        <span className="text-[10px] uppercase tracking-[0.35em] text-brandRed font-bold block">
          Error 404 // Lost Route
        </span>

        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight font-serif text-brandBlack">
          Out of Archive.
        </h1>

        <p className="text-xs text-neutral-600 uppercase tracking-widest leading-relaxed">
          The silhouette or runway URL you are navigating towards does not exist or has been relocated into our private vault.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-brandBlack text-white font-bold text-xs uppercase tracking-widest hover:bg-brandSoftBlack transition-all"
          >
            Explore Catalogue
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 border border-neutral-300 text-brandBlack font-bold text-xs uppercase tracking-widest hover:border-black transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} /> Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}