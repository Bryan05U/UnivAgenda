# UnivAgenda

**Aplicación móvil de organización universitaria**

UnivAgenda es una aplicación móvil desarrollada para ayudar a estudiantes universitarios a organizar sus actividades académicas, administrar sus tareas, consultar un calendario y mantener ordenadas sus asignaturas.

## Características principales

- **Inicio:** resumen de la actividad académica.
- **Tareas:** registro, consulta, seguimiento y eliminación de tareas.
- **Calendario:** organización de eventos y fechas importantes.
- **Asignaturas:** registro, búsqueda, edición y eliminación de asignaturas, con información de días y horarios.
- **Login y Registro:** pantallas de acceso y registro de demostración.
- **Perfil:** sección de información y opciones de usuario.
- **Almacenamiento local:** conservación de información mediante AsyncStorage.

> La autenticación de Login y Registro corresponde a una implementación de demostración; no utiliza actualmente un servicio de autenticación externo.

## Tecnologías utilizadas

- React Native
- Expo SDK 58
- Expo Router
- TypeScript
- AsyncStorage
- Expo Go
- Figma

## Diseño e identidad visual

El diseño de UnivAgenda se desarrolló considerando una identidad visual propia, con una paleta de colores basada principalmente en tonos azules y fondos claros.

La tipografía utilizada es Fredoka y el logotipo corresponde al diseño original del proyecto.

**Diseño en Figma:**

https://www.figma.com/design/Izjp1hq621p5XGNyg5on8z/UnivAgenda---Avance-1?node-id=0-1&t=CHXfo2ELGOPaYYC3-1

**Logotipos en Canva:**

https://canva.link/8xuoyvbya5c870f

## Requisitos

- Node.js
- npm
- Expo Go en un dispositivo móvil, o un entorno compatible para ejecutar la aplicación.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Bryan05U/UnivAgenda
```

Entrar en la carpeta del proyecto:

```bash
cd UnivAgenda
```

Instalar las dependencias:

```bash
npm install
```

## Ejecución

Iniciar el servidor de desarrollo:

```bash
npx expo start
```

Para ejecutar en web:

```bash
npx expo start --web
```

También se puede escanear el código QR desde Expo Go para probar la aplicación en un dispositivo móvil.

## Validaciones

Durante el desarrollo se realizaron pruebas funcionales de navegación, formularios, gestión de tareas, calendario, asignaturas y almacenamiento local.

Se ejecutaron las siguientes comprobaciones:

- `npx tsc --noEmit`
- `npx expo install --check`
- `npx expo-doctor`

**Resultado de Expo Doctor: 20/20 verificaciones aprobadas.**

## Uso de inteligencia artificial

ChatGPT se utilizó como herramienta de apoyo para resolver dudas técnicas, revisar código, corregir errores y mejorar la experiencia de usuario.

Las propuestas fueron revisadas y probadas antes de incorporarse al proyecto.

El detalle del proceso se encuentra en:

`docs/bitacora.md`

## Autoría

Proyecto académico desarrollado como aplicación móvil de organización universitaria.

