# Bitácora de uso de Inteligencia Artificial – UnivAgenda

## 1. Información del proyecto

- **Nombre:** UnivAgenda
- **Tipo:** Aplicación móvil de organización universitaria.
- **Tecnologías:** React Native, Expo SDK 58, Expo Router y TypeScript.
- **Almacenamiento local:** AsyncStorage.
- **Diseño:** Figma.
- **Fecha de registro:** 22 de noviembre de 2026.

## 2. Objetivo de utilizar IA

Se utilizó ChatGPT como herramienta de apoyo durante el desarrollo de UnivAgenda para resolver dudas técnicas, proponer soluciones, corregir errores y mejorar la experiencia de usuario.

La IA se utilizó como asistente y no como sustituto del criterio del desarrollador. Las propuestas fueron revisadas e implementadas progresivamente, comprobando su funcionamiento en Expo Go.

## 3. Actividades en las que se utilizó IA

| Actividad | Apoyo recibido |
|---|---|
| Identidad visual | Orientación sobre colores, tipografía, contraste y consistencia visual. |
| Diseño de interfaces | Recomendaciones para organizar títulos, subtítulos, tarjetas, botones y componentes. |
| Navegación | Apoyo en la configuración de Expo Router y navegación entre pantallas. |
| Login y Registro | Orientación para implementar formularios e interacciones. |
| Gestión de tareas | Apoyo para crear, completar, buscar y eliminar tareas. |
| Calendario | Apoyo para organizar eventos, fechas, estados y eliminación. |
| Asignaturas | Apoyo para registrar, visualizar y eliminar asignaturas. |
| Persistencia | Implementación de AsyncStorage para conservar los datos localmente. |
| Inicio dinámico | Conexión de los resúmenes de tareas y eventos con los datos almacenados. |
| Corrección técnica | Diagnóstico de errores de TypeScript y revisión de dependencias de Expo. |

## 4. Ejemplos de instrucciones utilizadas

Los siguientes ejemplos resumen las solicitudes realizadas durante el desarrollo:

- "Ayúdame a desarrollar las pantallas de UnivAgenda utilizando React Native y Expo."
- "Necesito que los títulos y subtítulos mantengan la misma posición y estilo en las diferentes pantallas."
- "Quiero implementar la opción de eliminar tareas."
- "Necesito que los datos se mantengan guardados al cerrar y volver a abrir la aplicación."
- "Conecta el resumen de Inicio con las tareas y eventos del calendario."
- "Revisa el error de TypeScript y proporciona el código completo corregido."

## 5. Resultados aceptados

Se aceptaron e implementaron propuestas que ayudaron a:

- Mantener una identidad visual coherente.
- Mejorar la navegación entre las pantallas.
- Implementar operaciones de creación, consulta y eliminación de registros.
- Incorporar estados de tareas y eventos.
- Guardar información mediante AsyncStorage.
- Actualizar los indicadores de Inicio al regresar a la pantalla.
- Corregir errores de tipado en la navegación web.

## 6. Resultados rechazados o modificados

Las propuestas de IA no se incorporaron automáticamente. Algunas fueron modificadas según las necesidades del proyecto:

- Se solicitó mantener el logotipo original diseñado por el desarrollador en Canva, en lugar de sustituirlo por uno generado.
- Se ajustaron tamaños, posiciones y tipografías para mantener consistencia con el diseño de Figma.
- Se solicitó incorporar la eliminación de tareas y eventos cuando las primeras versiones no contemplaban esa opción.
- Se corrigieron propuestas de código cuando no respetaban la estructura existente o provocaban errores.
- Se decidió conservar el control del desarrollo mediante pruebas y validaciones progresivas.

## 7. Validación y pruebas

Las soluciones implementadas fueron comprobadas durante el desarrollo.

Pruebas realizadas:

- Navegación entre Inicio, Tareas, Calendario y Asignaturas.
- Acceso a Login, Registro y Perfil.
- Creación, finalización y eliminación de tareas.
- Creación y eliminación de eventos.
- Creación y eliminación de asignaturas.
- Persistencia de los datos mediante AsyncStorage.
- Actualización de los indicadores de Inicio.
- Ejecución de `npx tsc --noEmit`, sin errores.
- Ejecución de `npx expo install --check`, con dependencias actualizadas.
- Pruebas funcionales en Expo Go.

**Observación:** Expo Doctor presentó un error de conexión (`ECONNRESET`) al intentar consultar la API de Expo. Por ello, esa comprobación quedó pendiente y no se considera una validación exitosa.

## 8. Uso responsable de IA

Durante el proyecto se consideraron los siguientes criterios:

1. Revisar las respuestas antes de implementar cambios.
2. Comprobar el funcionamiento del código en el entorno de desarrollo.
3. No incorporar información inventada como si fuera parte del proyecto.
4. Mantener las decisiones de diseño y desarrollo bajo control del estudiante.
5. Utilizar la IA como herramienta de apoyo para aprender y resolver problemas.
6. Corregir y adaptar las propuestas cuando no se ajustaban a los requisitos.

## 9. Evidencias

Se deben incorporar capturas de pantalla que demuestren el proceso de desarrollo:

- Capturas de las conversaciones de apoyo con IA.
- Capturas de las pantallas implementadas.
- Capturas de pruebas funcionales.
- Capturas de correcciones de errores.
- Capturas del resultado final de la aplicación.

**Importante:** las capturas deben corresponder a evidencias reales del desarrollo. No se deben inventar resultados ni presentar imágenes ilustrativas como pruebas.

## 10. Conclusión

La inteligencia artificial fue utilizada como una herramienta complementaria durante el desarrollo de UnivAgenda. Permitió resolver dudas, mejorar componentes, corregir errores y avanzar en la implementación de las funcionalidades.

Sin embargo, las decisiones finales, la revisión del código, las pruebas y la validación de las funcionalidades fueron responsabilidad del desarrollador.
