import nodemailer from 'nodemailer';

/**
 * Validación básica de email
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Sanitiza texto para prevenir inyección
 */
function sanitizeText(text, maxLength = 1000) {
  if (!text || typeof text !== 'string') return '';
  return text.trim().slice(0, maxLength);
}

/**
 * POST /api/contact
 *
 * Recibe datos del formulario de contacto y envía email via Gmail SMTP
 */
export async function POST(request) {
  try {
    // Verificar que las credenciales estén configuradas
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Credenciales de Gmail no configuradas');
      return Response.json(
        { error: 'Servicio de email no configurado' },
        { status: 500 }
      );
    }

    // Parsear body
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar email
    if (!isValidEmail(email)) {
      return Response.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Sanitizar inputs
    const sanitizedData = {
      name: sanitizeText(name, 100),
      email: sanitizeText(email, 100),
      phone: sanitizeText(phone || '', 20),
      subject: sanitizeText(subject, 200),
      message: sanitizeText(message, 5000),
    };

    // Validar longitudes mínimas
    if (sanitizedData.name.length < 2) {
      return Response.json(
        { error: 'El nombre debe tener al menos 2 caracteres' },
        { status: 400 }
      );
    }

    if (sanitizedData.subject.length < 5) {
      return Response.json(
        { error: 'El asunto debe tener al menos 5 caracteres' },
        { status: 400 }
      );
    }

    if (sanitizedData.message.length < 10) {
      return Response.json(
        { error: 'El mensaje debe tener al menos 10 caracteres' },
        { status: 400 }
      );
    }

    // Configurar transporter de Nodemailer con Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Configurar el email
    const mailOptions = {
      from: `"Formulario de Contacto" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: sanitizedData.email,
      subject: `[Contacto Web] ${sanitizedData.subject}`,
      text: `
Nuevo mensaje desde el formulario de contacto:

Nombre: ${sanitizedData.name}
Email: ${sanitizedData.email}
Teléfono: ${sanitizedData.phone || 'No proporcionado'}
Asunto: ${sanitizedData.subject}

Mensaje:
${sanitizedData.message}

---
Este mensaje fue enviado desde el formulario de contacto del sitio web.
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1d4ed8; border-bottom: 2px solid #1d4ed8; padding-bottom: 10px;">
            Nuevo mensaje de contacto
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Nombre:</td>
              <td style="padding: 8px 0; color: #1f2937;">${sanitizedData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${sanitizedData.email}" style="color: #1d4ed8;">${sanitizedData.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Teléfono:</td>
              <td style="padding: 8px 0; color: #1f2937;">
                ${sanitizedData.phone
                  ? `<a href="tel:${sanitizedData.phone}" style="color: #1d4ed8;">${sanitizedData.phone}</a>`
                  : 'No proporcionado'}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Asunto:</td>
              <td style="padding: 8px 0; color: #1f2937;">${sanitizedData.subject}</td>
            </tr>
          </table>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">Mensaje:</h3>
            <p style="margin: 0; color: #1f2937; white-space: pre-wrap;">${sanitizedData.message}</p>
          </div>

          <p style="font-size: 12px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            Este mensaje fue enviado desde el formulario de contacto del sitio web.
          </p>
        </div>
      `,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    return Response.json(
      { message: 'Mensaje enviado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error enviando email:', error);
    }

    return Response.json(
      { error: 'Error al enviar el mensaje. Por favor, intenta de nuevo.' },
      { status: 500 }
    );
  }
}
