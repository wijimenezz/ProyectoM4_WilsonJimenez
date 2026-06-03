## URL DE REPOSITORIO EN GITHUB

```
https://github.com/wijimenezz/ProyectoM4_WilsonJimenez
```

---

## LINK DEL DEPLOY EN VERCEL

```
https://proyecto-m4-alpha.vercel.app/
```

---

# Proyecto M4 - Task Manager

Una aplicación web moderna de gestión de tareas con soporte para checklist, drag and drop, autenticación, persistencia de datos y envío de notificaciones por email.

## Descripción del Proyecto

Task Manager es una aplicación de productividad que permite a los usuarios crear, organizar y gestionar tareas de manera intuitiva. La aplicación cuenta con:

- **Gestión de Tareas**: Crear, editar, eliminar y organizar tareas en columnas
- **Drag and Drop**: Sistema intuitivo para mover tarjetas entre diferentes columnas de estado
- **Autenticación**: Sistema de login seguro mediante Firebase Authentication
- **Notificaciones por Email**: Envío automático de notificaciones y confirmaciones por email
- **Interfaz Responsiva**: Diseño adaptable a diferentes dispositivos
- **TypeScript**: Código tipado para mayor seguridad y mantenibilidad

## Decisiones Arquitectónicas

### Stack Tecnológico

| Tecnología       | Versión   | Propósito                                    |
| ---------------- | --------- | -------------------------------------------- |
| **React**        | ^19.2.6   | Framework UI para componentes dinámicos      |
| **TypeScript**   | ~6.0.2    | Tipado estático para mayor seguridad         |
| **Vite**         | ^8.0.12   | Build tool rápido y optimizado               |
| **Firebase**     | ^12.14.0  | Autenticación y base de datos en tiempo real |
| **@dnd-kit**     | ^6.3.1    | Sistema de drag and drop accesible           |
| **React Router** | ^7.16.0   | Navegación entre páginas                     |
| **AWS SES**      | ^3.1058.0 | Servicio de envío de emails                  |

### Estructura del Proyecto

```
src/
├── api/              # Funciones de API y llamadas al backend
├── components/       # Componentes React reutilizables
├── features/         # Funcionalidades principales de la aplicación
├── hooks/           # Custom React hooks
├── router/          # Configuración de rutas
├── services/        # Servicios externos (Firebase, API)
├── styles/          # Estilos globales y temas
├── types/           # Definiciones de tipos TypeScript
├── utils/           # Funciones utilitarias
└── tests/           # Tests unitarios e integración
```

### Patrones Implementados

- **Component-Based Architecture**: Componentes React reutilizables y modulares
- **Custom Hooks**: Lógica separada del UI mediante hooks personalizados
- **Service Layer**: Abstracción de llamadas a APIs y servicios externos
- **Type Safety**: Tipos TypeScript completos en toda la aplicación
- **Drag & Drop**: Implementación accesible usando @dnd-kit

## Instrucciones de Instalación

### Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Cuenta de Firebase
- Credenciales de AWS (para SES)

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd Proyecto-M4
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp .env.example .env.local
   ```

   Edita el archivo `.env.local` con tus credenciales de Firebase.

4. **Ejecutar en desarrollo**

   ```bash
   npm run dev
   # o
   yarn dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

5. **Compilar para producción**
   ```bash
   npm run build
   # o
   yarn build
   ```

## Variables de Entorno Necesarias

Crea un archivo `.env.local` basado en `.env.example` con las siguientes variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=tu_api_key_firebase
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### Cómo Obtener las Credenciales

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Dirígete a **Configuración del Proyecto** > **Mi apps**
4. Copia las credenciales mostradas en la configuración de tu aplicación web

## URL de Producción

La aplicación está desplegada en Vercel:

- **URL**: [https://proyecto-m4.vercel.app](https://proyecto-m4.vercel.app)
- **Rama de Producción**: `main`
- **Rama de Staging**: `develop` (cuando exista)

### Deployment

El proyecto usa Vercel para despliegue automático. Cada push a la rama `main` dispara un nuevo build y deployment automático.

## Flujo de Envío de Emails

### Arquitectura

```
Aplicación (React)
    ↓
Backend API (Node.js/Vercel)
    ↓
AWS SES (Simple Email Service)
    ↓
Servidor SMTP
    ↓
Bandeja de entrada del usuario
```

### Proceso Detallado

1. **Evento Disparador**: El usuario realiza una acción que requiere notificación
   - Creación de tarea
   - Cambio de estado de tarea
   - Asignación de tarea
   - Recordatorio programado

2. **Envío a Backend**

   ```
   POST /api/send-email
   {
     recipient: "user@example.com",
     subject: "Nueva tarea asignada",
     templateId: "task-created",
     data: { taskName, deadline, assignedBy }
   }
   ```

3. **Procesamiento en Backend**
   - Validación de datos
   - Generación de template HTML
   - Preparación de email con AWS SES

4. **Envío con AWS SES**
   - Credenciales de AWS verificadas
   - Email encolado en SES
   - Monitoreo de estado de entrega

5. **Confirmación**
   - Estado guardado en Firebase
   - Log de envío registrado
   - Respuesta al cliente

### Estados Posibles de Email

| Estado         | Descripción                          |
| -------------- | ------------------------------------ |
| **pending**    | Email en espera de envío             |
| **sending**    | Email siendo procesado por SES       |
| **sent**       | Email enviado exitosamente           |
| **failed**     | Error durante el envío               |
| **bounced**    | Email rechazado (dirección inválida) |
| **complained** | Usuario marcó como spam              |

### Configuración de AWS SES

Para que funcione el envío de emails:

1. Ve a [AWS Console](https://console.aws.amazon.com/ses/)
2. Verifica tu dominio o dirección de email remitente
3. Crea Access Keys (ID y Secret)
4. Agrega las credenciales en variables de entorno del backend:
   ```
   AWS_ACCESS_KEY_ID=tu_key_id
   AWS_SECRET_ACCESS_KEY=tu_secret_key
   AWS_SES_REGION=us-east-1
   ```

## Comandos Disponibles

```bash
# Desarrollo
npm run dev           # Inicia servidor de desarrollo con HMR

# Build
npm run build         # Compila para producción

# Testing
npm test              # Ejecuta tests en modo watch
npm run test:run      # Ejecuta tests una sola vez
npm run test:coverage # Genera reporte de cobertura

# Linting
npm run lint          # Verifica problemas de código

# Preview
npm run preview       # Previsualiza el build de producción
```

## Troubleshooting

### Error de Firebase: "Firebase app not initialized"

- Verifica que `.env.local` contiene todas las variables requeridas
- Reinicia el servidor de desarrollo

### Emails no se envían

- Verifica que AWS SES está correctamente configurado
- Comprueba los logs del backend
- Asegúrate de que el dominio está verificado en AWS SES

### Drag and Drop no funciona

- Verifica que `@dnd-kit` está instalado: `npm ls @dnd-kit/core`
- Comprueba la consola del navegador para errores

## Contribución

1. Crea una rama para tu feature: `git checkout -b feature/mi-feature`
2. Commit los cambios: `git commit -m 'Add mi-feature'`
3. Push a la rama: `git push origin feature/mi-feature`
4. Abre un Pull Request

## Licencia

Proyecto desarrollado como parte del Bootcamp de Henry.

---

**Última actualización**: Junio 2026
