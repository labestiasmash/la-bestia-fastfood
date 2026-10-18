import React from 'react';
import { RESTAURANT_INFO, BANNER_IMAGE } from '../data/menuData';

interface HeaderProps {
  onOpenGoogleSheets: () => void;
  onOpenCodeExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGoogleSheets, onOpenCodeExport }) => {
  return (
    <header className="relative w-full bg-stone-950 border-b border-stone-800">
      {/* Top Bar Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Urban Fast Food) */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 via-amber-500 to-red-600 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-500/20 font-black text-xl">
            <i className="fa-solid fa-fire text-stone-950"></i>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white font-brand">
                LA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">BESTIA</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-800/60">
                FAST FOOD
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] text-stone-400 font-medium">
              Hamburguesas · Alitas · Salchipapas
            </span>
          </div>
        </div>

        {/* Zone 2: Status & Quick Info */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Abierto para Delivery</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-300 font-medium bg-stone-900/90 px-3 py-1.5 rounded-lg border border-stone-800">
            <i className="fa-regular fa-clock text-yellow-400"></i>
            <span>{RESTAURANT_INFO.schedule}</span>
          </div>
        </div>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGoogleSheets}
            title="Conexión Google Sheets"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-white border border-stone-800 transition-colors"
          >
            <i className="fa-solid fa-table text-emerald-400"></i>
            <span className="hidden sm:inline">Google Sheets</span>
          </button>

          <button
            onClick={onOpenCodeExport}
            title="Ver código GitHub Pages (HTML/CSS/JS)"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-stone-950 shadow-md shadow-amber-500/10 transition-all"
          >
            <i className="fa-brands fa-github text-sm"></i>
            <span className="hidden sm:inline">Código GitHub</span>
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative w-full overflow-hidden bg-stone-900 border-t border-stone-800/80">
        <div className="relative max-w-6xl mx-auto">
          {/* Background Image with Dark Gradient Scrim */}
          <div className="relative h-52 sm:h-64 md:h-72 w-full overflow-hidden">
            <img
              src={BANNER_IMAGE}
              alt="La Bestia Fast Food"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 filter brightness-80 contrast-115"
            />
            {/* Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/60 to-transparent" />

            {/* Hero Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-1.5">
                <span className="text-xs uppercase tracking-wider font-extrabold text-yellow-400 bg-yellow-500/15 px-2.5 py-0.5 rounded-md border border-yellow-500/30 flex items-center gap-1.5">
                  <i className="fa-solid fa-fire text-red-500"></i>
                  Sabor Callejero Bestial
                </span>
                <span className="text-xs text-stone-300 md:hidden flex items-center gap-1">
                  <i className="fa-regular fa-clock text-yellow-400"></i>
                  6:00 PM - 11:30 PM
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight font-brand">
                Hamburguesas gigantes, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">alitas acevichadas</span> y salchipapas salvajes.
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 mt-1.5 line-clamp-2 max-w-lg">
                Pide al instante por WhatsApp sin intermediarios ni comisiones abusivas. Preparado al momento y entregado caliente.
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 pt-3 border-t border-stone-800/80 text-[11px] sm:text-xs text-stone-300">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-burger text-yellow-400"></i>
                  Carne 100% Angus
                </span>
                <span className="hidden sm:inline text-stone-600">·</span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-drumstick-bite text-yellow-400"></i>
                  Alitas Extra Crujientes
                </span>
                <span className="hidden sm:inline text-stone-600">·</span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-motorcycle text-yellow-400"></i>
                  Delivery 30-40 min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
