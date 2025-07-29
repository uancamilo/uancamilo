# Configuración de Contentful para tu CV

## 1. Configuración inicial

1. Ve a [Contentful](https://www.contentful.com) y crea una cuenta
2. Crea un nuevo espacio (Space)
3. Ve a Settings > API keys y copia:
   - Space ID
   - Content Delivery API - access token

4. Crea el archivo `.env.local` basado en `.env.local.example`:
```bash
cp .env.local.example .env.local
```

5. Edita `.env.local` con tus credenciales reales.

## 2. Modelos de contenido a crear

### Personal Info (personalInfo)
- **fullName** (Short text)
- **title** (Short text) 
- **email** (Short text)
- **phone** (Short text)
- **location** (Short text)
- **website** (Short text)
- **socialLinks** (JSON object) con estructura:
```json
{
  "github": "https://github.com/usuario",
  "linkedin": "https://linkedin.com/in/usuario",
  "twitter": "https://twitter.com/usuario",
  "instagram": "https://instagram.com/usuario",
  "portfolio": "https://sitio.com"
}
```

### Professional Summary (professionalSummary)
- **content** (Rich text) - Tu resumen profesional en markdown/rich text

### Experience (experience)
- **position** (Short text)
- **company** (Short text)
- **location** (Short text)
- **startDate** (Date)
- **endDate** (Date) - opcional
- **description** (Rich text)
- **achievements** (Short text, multiple values)
- **technologies** (Short text, multiple values)

### Education (education)
- **degree** (Short text)
- **institution** (Short text)
- **location** (Short text)
- **startDate** (Date)
- **endDate** (Date) - opcional
- **gpa** (Short text) - opcional
- **description** (Rich text) - opcional
- **achievements** (Short text, multiple values)

### Certification (certification)
- **name** (Short text)
- **issuer** (Short text)
- **issueDate** (Date)
- **expiryDate** (Date) - opcional
- **credentialId** (Short text) - opcional
- **url** (Short text) - opcional

### Skills (skills)
- **technical** (Short text, multiple values)
- **tools** (Short text, multiple values)
- **languages** (JSON object) con estructura:
```json
[
  {"language": "Spanish", "level": "Native"},
  {"language": "English", "level": "Advanced"}
]
```
- **soft** (Short text, multiple values)

## 3. Cómo agregar contenido

1. Ve a Content en tu espacio de Contentful
2. Haz clic en "Add entry" y selecciona el tipo de contenido
3. Llena los campos y publica

## 4. Ventajas de usar Contentful

- **Fácil actualización**: Cambias tu CV desde la interfaz web
- **Rich text**: Puedes usar markdown para descripciones
- **Versionado**: Contentful guarda versiones de tus cambios
- **Preview**: Puedes ver cambios antes de publicar
- **API**: Los datos se cargan automáticamente en tu sitio

## 5. Datos de respaldo

Si Contentful no está configurado o falla, la app usa los datos dummy en `/data/personal-info.js` como respaldo.

## 6. Actualización del CV

1. Modifica el contenido en Contentful
2. Los cambios aparecen automáticamente en tu sitio
3. El botón "Download CV" genera un PDF con la información actualizada

## 7. Estructura recomendada

- **1 entrada** de Personal Info
- **1 entrada** de Professional Summary  
- **1 entrada** de Skills
- **Múltiples entradas** de Experience (una por trabajo)
- **Múltiples entradas** de Education (una por título/certificado)
- **Múltiples entradas** de Certification (una por certificación)

¡Listo! Con esta configuración tendrás un CV dinámico que puedes actualizar fácilmente desde Contentful.