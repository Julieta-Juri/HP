// PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
// ARCHIVO: server.js
// PROP�SITO: Servidor principal del Hotel Para�so
// PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

// 1. IMPORTAMOS LAS LIBRER�AS QUE NECESITAMOS
const express = require('express');         // Para crear el servidor web
const cors = require('cors');               // Para permitir conexiones del frontend
require('dotenv').config();                 // Para leer variables del .env

// 2. IMPORTAMOS NUESTRO ARCHIVO DE BASE DE DATOS
const { connectDB, testConnection, sql } = require('./db');

// 3. CREAMOS LA APLICACI�N EXPRESS
const app = express();

// 4. OBTENEMOS EL PUERTO DEL ARCHIVO .env (o usamos 3000 por defecto)
const PORT = process.env.PORT || 3000;

// 5. CONFIGURAMOS MIDDLEWARES (herramientas que usa Express)
app.use(cors());                    // Permite que el frontend se conecte
app.use(express.json());           // Permite recibir datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Permite recibir formularios

// 6. RUTA PRINCIPAL (p�gina de inicio)
app.get('/', (req, res) => {
  res.json({
    message: '<� �Bienvenido al Hotel Para�so Backend!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 7. RUTA PARA PROBAR LA CONEXI�N A LA BASE DE DATOS
app.get('/api/test-db', async (req, res) => {
  try {
    console.log('>� Probando conexi�n a la base de datos...');

    // Intentamos hacer una consulta simple
    const result = await sql.query('SELECT 1 as prueba, GETDATE() as fecha_servidor');

    // Si llegamos aqu�, la conexi�n funciona
    res.json({
      success: true,
      message: ' Conexi�n a base de datos exitosa',
      servidor_sql: result.recordset[0].fecha_servidor,
      database: process.env.DB_DATABASE
    });

  } catch (error) {
    // Si hay error, lo enviamos al frontend
    console.error('L Error en /api/test-db:', error.message);

    res.status(500).json({
      success: false,
      message: 'L Error conectando a la base de datos',
      error: error.message,
      help: 'Revisa que SQL Server est� corriendo'
    });
  }
});

// 8. RUTA PARA VER INFORMACI�N DEL SISTEMA
app.get('/api/info', (req, res) => {
  res.json({
    hotel: 'Hotel Para�so',
    servidor: 'Express.js',
    base_datos: 'SQL Server',
    puerto: PORT,
    ambiente: process.env.NODE_ENV || 'development',
    uptime: process.uptime() + ' segundos'
  });
});

// 9. MANEJO DE RUTAS NO ENCONTRADAS (404)
app.use('*', (req, res) => {
  res.status(404).json({
    error: '=� Ruta no encontrada',
    ruta_solicitada: req.originalUrl,
    rutas_disponibles: [
      'GET /',
      'GET /api/test-db',
      'GET /api/info'
    ]
  });
});

// 10. FUNCI�N PARA INICIAR EL SERVIDOR
async function startServer() {
  try {
    console.log('=� Iniciando servidor del Hotel Para�so...');

    // Primero intentamos conectar a la base de datos
    console.log('=� Conectando a la base de datos...');
    const dbConnected = await connectDB();

    if (dbConnected) {
      // Si la BD se conect�, probamos una consulta
      await testConnection();
      console.log(' Base de datos lista');
    } else {
      console.log('�  Servidor iniciar� sin conexi�n a BD');
    }

    // Iniciamos el servidor web
    app.listen(PORT, () => {
      console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
      console.log('<� HOTEL PARA�SO - SERVIDOR INICIADO');
      console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
      console.log(`< URL: http://localhost:${PORT}`);
      console.log(`=� Base de datos: ${process.env.DB_DATABASE}`);
      console.log(`=�  Servidor SQL: ${process.env.DB_SERVER}`);
      console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
      console.log(' Servidor listo para recibir peticiones');
      console.log('=� Ctrl+C para detener el servidor');
    });

  } catch (error) {
    console.error('L Error fatal al iniciar servidor:', error.message);
    process.exit(1); // Termina el programa si hay error cr�tico
  }
}

// 11. MANEJO DE CIERRE ELEGANTE DEL SERVIDOR
process.on('SIGINT', async () => {
  console.log('\n=� Cerrando servidor...');

  // Importamos disconnectDB para cerrar la conexi�n
  const { disconnectDB } = require('./db');
  await disconnectDB();

  console.log('=K �Hasta luego!');
  process.exit(0);
});

// 12. INICIAMOS TODO
startServer();

// PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
// C�MO USAR:
// 1. Abre terminal en la carpeta 'servidor'
// 2. Ejecuta: node server.js
// 3. Ve a: http://localhost:3000
// PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP