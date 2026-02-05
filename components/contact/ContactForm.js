'use client';

import { useState } from 'react';

/**
 * Estados posibles del formulario
 */
const FORM_STATUS = {
  IDLE: 'idle',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
  ERROR: 'error',
};

/**
 * Formulario de contacto
 *
 * @param {Object} props
 * @param {string} [props.recipientEmail] - Email del destinatario (para mostrar)
 */
export default function ContactForm({ recipientEmail }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(FORM_STATUS.IDLE);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Valida los campos del formulario
   * @returns {boolean} True si es válido
   */
  const validateForm = () => {
    const newErrors = {};

    // Nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    // Teléfono (opcional pero si se ingresa debe ser válido)
    if (formData.phone.trim() && !/^[\d\s\-+()]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Ingresa un número de teléfono válido';
    }

    // Asunto
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'El asunto debe tener al menos 5 caracteres';
    }

    // Mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja cambios en los campos del formulario
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus(FORM_STATUS.SUBMITTING);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setStatus(FORM_STATUS.SUCCESS);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error al enviar formulario:', error);
      }
      setErrorMessage(error.message || 'Error al enviar el mensaje. Por favor, intenta de nuevo.');
      setStatus(FORM_STATUS.ERROR);
    }
  };

  /**
   * Resetea el estado del formulario
   */
  const handleReset = () => {
    setStatus(FORM_STATUS.IDLE);
    setErrors({});
    setErrorMessage('');
  };

  // Mensaje de éxito
  if (status === FORM_STATUS.SUCCESS) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          ¡Mensaje enviado!
        </h3>
        <p className="text-gray-600 mb-6">
          Gracias por contactarme. Te responderé lo antes posible.
        </p>
        <button
          onClick={handleReset}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Nombre */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          autoComplete="name"
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.name
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2`}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          autoComplete="email"
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.email
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2`}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Teléfono <span className="text-gray-400 text-xs">(opcional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+57 300 123 4567"
          autoComplete="tel"
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.phone
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2`}
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Asunto */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Asunto <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="¿Sobre qué quieres hablar?"
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.subject
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2`}
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-600">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mensaje <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Escribe tu mensaje aquí..."
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.message
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 resize-none`}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* Error general */}
      {status === FORM_STATUS.ERROR && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">
            {errorMessage || 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.'}
          </p>
        </div>
      )}

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={status === FORM_STATUS.SUBMITTING}
        className="w-full px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === FORM_STATUS.SUBMITTING ? (
          <span className="inline-flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Enviando...
          </span>
        ) : (
          'Enviar mensaje'
        )}
      </button>

      {/* Nota de privacidad */}
      <p className="text-xs text-gray-500 text-center">
        Tu información será enviada de forma segura y solo será utilizada para responder tu mensaje.
      </p>
    </form>
  );
}
