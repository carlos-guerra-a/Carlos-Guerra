# Sistema de Gestión de Empleados

Aplicación web para gestión de empleados desarrollada con React y consumiendo la API: [Employee API](https://github.com/GuillermoGodoy/EmployeeAPI).

## Funcionalidades

- Autenticación de usuarios (admin)
- Operaciones CRUD de empleados
- Desarrollado con React + Bootstrap
- Validaciones

## Instalación 


### Clonar el repositorio
- Ejecutar el comando: `git clone https://github.com/tu-usuario/empleados`

### Instalar dependencias 
- Ejecutar comando en la carpeta raíz: `npm install`

### Levantar la API de empleados 
- Seguir las instrucciones en: https://github.com/GuillermoGodoy/EmployeeAPI

### Iniciar la aplicación
- Ejecutar comando en la carpeta raíz: `npm start`

- Visitar http://localhost:3000 en el navegador.




## Uso

El flujo de uso es el siguiente:

- Pantalla de login para autenticar usuarios
- Vista de listado completo de empleados  
- Formulario para crear
- Eliminar empleados
- Vista de perfil de cada empleado
- Editar empleado
- Cierre de sesión

## Diseño y decisiones tomadas

### Tecnologías usadas:
- React: se utilizó para construir la interfaz, facilitando la creación y organización de distintos componentes en una vista.
- Bootstrap: se utilizó para obtener estilos predefinitidos y facilitar el desarrollo visual del sistema.

### Estructura
- Se utilizaron archivos JS y CSS, en general, para cada componente y así poder mantener una estructura clara y modular.

### Diseño
- Se personalizaron estilos para mejorar la apariencia de la aplicación, introduciendo colores y fuentes; también imagen de fondo para utilizar en el background de todas las vistas.

### Validaciones
- Se implementaron validaciones de formularios para garantizar la integridad de los datos ingresados.

### Token
- Se almacena Token de inicio de sesión en Local Storage; una vez terminada la sesión, se elimina su registro.

### Rutas y acceso:
- Se organizaron las rutas en el enrutador de React (React-Router-Dom). Además, se implementó una protección de acceso para redirigir a los usuarios no autenticados a la página principal. 






