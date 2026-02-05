import { getCachedPersonalInfo } from '../../lib/data';
import { composeMetadataForAppRouter } from '../../seo/metadata/composeForAppRouter';
import ContactForm from '../../components/contact/ContactForm';

/**
 * Genera metadata dinámica para la página de contacto
 */
export async function generateMetadata() {
  const personalInfo = await getCachedPersonalInfo();

  return composeMetadataForAppRouter({
    title: 'Contacto',
    description: `Ponte en contacto con ${personalInfo?.name || 'nosotros'}. Envía un mensaje a través del formulario de contacto.`,
    path: '/contacto',
    personalInfo,
  });
}

/**
 * Página de Contacto
 *
 * Formulario para que los visitantes puedan enviar mensajes
 */
export default async function ContactPage() {
  const personalInfo = await getCachedPersonalInfo();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Contacto
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            ¿Tienes un proyecto en mente o quieres colaborar?
            Envíame un mensaje y te responderé lo antes posible.
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <ContactForm recipientEmail={personalInfo?.email} />
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            También puedes contactarme directamente a través de{' '}
            {personalInfo?.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                title={`Enviar email a ${personalInfo.email}`}
                className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
              >
                {personalInfo.email}
              </a>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 3600;
