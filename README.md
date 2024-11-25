Este proyecto es una API REST creada con NestJS que implementa autenticación con JWT, gestión de roles y un CRUD para productos. A continuación, se detallan las instrucciones para instalar y ejecutar el proyecto.

#git clone (url del repo)
#cd (nombre del proyecto)
#--->npm install (para instalar las dependencias necesarias)
#Crear una Base de Datos (nosotros usamos laragon con mysql)
#Configurar las Variables de Entorno, y actualizar los valores según la configuración de la base de datos
#Ejecutar las Migraciones para crear las tablas necesarias con:
----> npx prisma migrate dev

#ejecutamos la api en modo desarrollo con: 
----> npm run start:dev
 
 -------------------------Como utilizar el pryecto----------------------

(nosotros para hacer las peticiones utilizamos POSTMAN)

#Registro y Login
las rutas /auth/register y /auth/login sirven para la creacion de usuarios y la obtencion de un token JWT
roles que se pueden usar para registrar:
ADMIN, SUPERADMIN, USER

#Gestión de Usuarios
Solo el SUPERADMIN puede ver, editar y eliminar usuarios y productos 
el ADMIN solo tiene acceso para ver los productos mas no para editar y eliminar

#Endpoints Protegidos
Para acceder a rutas protegidas, hay que colocar el token generado en el auth/login en el header:
key: Authorization 
value: Bearer <token>