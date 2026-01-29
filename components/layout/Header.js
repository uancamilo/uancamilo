'use client';

import { useState } from 'react';
import Link from 'next/link';
import DownloadCV from '../pdf/DownloadCV';

/**
 * Icono de menú hamburguesa (3 líneas)
 */
function MenuIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

/**
 * Icono de cerrar (X)
 */
function CloseIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

/**
 * Links de navegación a las secciones del CV
 * Usan prefijo /# para funcionar desde cualquier página (ej: /blog)
 */
const navLinks = [
  { name: 'Habilidades', href: '/#habilidades' },
  { name: 'Formación', href: '/#formacion' },
  { name: 'Idiomas', href: '/#idiomas' },
  { name: 'Proyectos', href: '/#proyectos' },
  { name: 'Experiencia', href: '/#experiencia' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contacto', href: '/#contacto' },
];

/**
 * Header - Navegación principal del sitio
 *
 * Características:
 * - Sticky en la parte superior
 * - Logo con iniciales
 * - Links a secciones del CV
 * - Botón CTA "Descargar CV"
 * - Menú móvil responsive
 */
export default function Header({ cvData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const initials = cvData?.personalInfo?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'CV';

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        >
          {/* Logo - Iniciales */}
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors"
              aria-label="Ir al inicio"
            >
              {initials}
            </Link>
          </div>

          {/* Botón menú móvil */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Abrir menú principal</span>
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Links de navegación - Desktop */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA - Desktop */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <DownloadCV
              cvData={cvData}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait transition-colors"
            >
              Descargar CV
            </DownloadCV>
          </div>
        </nav>
      </header>

      {/* Menú móvil - Overlay (fuera del header para evitar containing block de backdrop-blur) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Menú móvil - Panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-xl lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Menú móvil"
      >
        {/* Header del menú móvil */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white font-bold text-lg"
            aria-label="Ir al inicio"
          >
            {initials}
          </Link>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <span className="sr-only">Cerrar menú</span>
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Links del menú móvil */}
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-200">
            <div className="space-y-1 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA móvil */}
            <div className="py-6">
              <DownloadCV
                cvData={cvData}
                className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait transition-colors"
              >
                Descargar CV
              </DownloadCV>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
