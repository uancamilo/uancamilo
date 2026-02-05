'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  { name: 'Contacto', href: '/contacto' },
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
  const [activeSection, setActiveSection] = useState(null);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  const closeButtonRef = useRef(null);

  /**
   * Focus trap para el menú móvil
   * Atrapa el foco dentro del menú cuando está abierto
   */
  const handleKeyDown = useCallback((e) => {
    if (!mobileMenuOpen || e.key !== 'Tab') return;

    const focusableElements = mobileMenuRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Shift + Tab en el primer elemento -> ir al último
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
    // Tab en el último elemento -> ir al primero
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }, [mobileMenuOpen]);

  /**
   * Cerrar menú con Escape y manejar focus trap
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleKeyDown);
      // Enfocar el botón de cerrar al abrir el menú
      closeButtonRef.current?.focus();
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, handleKeyDown]);

  /**
   * Detecta la sección visible en el viewport usando IntersectionObserver
   */
  useEffect(() => {
    // Solo observar secciones en la página principal
    if (pathname !== '/') {
      setActiveSection(null);
      return;
    }

    // Obtener IDs de secciones desde los links de navegación
    const sectionIds = navLinks
      .filter((link) => link.href.startsWith('/#'))
      .map((link) => link.href.replace('/#', ''));

    // Map para trackear la visibilidad de cada sección
    const visibilityMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibilityMap.set(id, entry.intersectionRatio);
          } else {
            visibilityMap.delete(id);
          }
        });

        // Encontrar la sección más visible
        let mostVisible = null;
        let highestRatio = 0;
        visibilityMap.forEach((ratio, id) => {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            mostVisible = id;
          }
        });

        setActiveSection(mostVisible);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-80px 0px -40% 0px', // Ajuste para header sticky
      }
    );

    // Observar cada sección
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  /**
   * Determina si un link está activo según la ruta o sección visible
   */
  const isLinkActive = (href) => {
    if (href === '/blog') {
      return pathname.startsWith('/blog');
    }
    if (href === '/contacto') {
      return pathname === '/contacto';
    }
    // Para links de secciones, verificar si es la sección visible
    if (href.startsWith('/#') && pathname === '/') {
      const sectionId = href.replace('/#', '');
      return activeSection === sectionId;
    }
    return false;
  };

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
              title="Ir al inicio"
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
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  title={`Ir a ${link.name}`}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 underline underline-offset-4'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                </a>
              );
            })}
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
        ref={mobileMenuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-xl lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header del menú móvil */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={closeMobileMenu}
            title="Ir al inicio"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white font-bold text-lg"
            aria-label="Ir al inicio"
          >
            {initials}
          </Link>
          <button
            ref={closeButtonRef}
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
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    title={`Ir a ${link.name}`}
                    className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.name}
                  </a>
                );
              })}
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
