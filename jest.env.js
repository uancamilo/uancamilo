// jest.env.js - Variables de entorno para testing

// Establecer NODE_ENV para testing
process.env.NODE_ENV = "test";

// URLs de API para testing
process.env.NEXT_PUBLIC_API_URL = "http://localhost:8080";
process.env.API_BASE_URL = "http://localhost:8080";

// Configuración de autenticación para tests
process.env.NEXTAUTH_URL = "http://localhost:3000";
process.env.NEXTAUTH_SECRET = "test-secret";

// Configuración de base de datos para tests (si aplica)
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test_db";

// Configuración de email para tests
process.env.EMAIL_FROM = "test@example.com";
process.env.SMTP_HOST = "localhost";
process.env.SMTP_PORT = "587";
process.env.SMTP_USER = "test";
process.env.SMTP_PASSWORD = "test";

// Configuración de almacenamiento para tests
process.env.UPLOAD_DIR = "/tmp/test-uploads";

// Deshabilitar analytics y servicios externos en tests
process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS = "";
process.env.NEXT_PUBLIC_SENTRY_DSN = "";

// Configuración de timeouts para tests
process.env.TEST_TIMEOUT = "10000";

// Configuración de CORS para tests
process.env.CORS_ORIGIN = "http://localhost:3000";

// Flag para indicar que estamos en modo test
process.env.IS_TESTING = "true";

// Configuración de logs para tests (reducir verbosidad)
process.env.LOG_LEVEL = "error";

// Configuración de cache para tests (deshabilitar)
process.env.DISABLE_CACHE = "true";

// Configuración de rate limiting para tests (deshabilitar)
process.env.DISABLE_RATE_LIMIT = "true";
