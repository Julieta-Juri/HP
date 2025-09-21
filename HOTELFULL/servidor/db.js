// ARCHIVO: db.js
// PROP�SITO: Manejar toda la conexi�n con SQL Server

// 1. IMPORTAMOS LA LIBRER�A PARA SQL SERVER
const sql = require('mssql');

// 2. LEEMOS LAS VARIABLES DE CONFIGURACI�N DEL ARCHIVO .env
require('dotenv').config();

// 3. CONFIGURACI�N DE LA CONEXI�N A LA BASE DE DATOS
const dbConfig = {
  server: process.env.DB_SERVER || 'localhost\\SQLEXPRESS',
  database: process.env.DB_DATABASE || 'HotelParaiso',
  authentication: {
    type: 'ntlm',
    options: {
      domain: '',
      userName: '',
      password: ''
    }
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
    connectionTimeout: 30000,
    requestTimeout: 30000
  }
};

// 4. FUNCI�N PARA CONECTAR A LA BASE DE DATOS
async function connectDB() {
  try {
    console.log('= Intentando conectar a la base de datos...');
    await sql.connect(dbConfig);

    console.log(' �XITO: Conectado a SQL Server');
    console.log(`=� Base de datos: ${dbConfig.database}`);
    console.log(`=�  Servidor: ${dbConfig.server}`);

    return true;

  } catch (error) {
    console.error('L ERROR: No se pudo conectar a la base de datos');
    console.error('=� Detalles del error:', error.message);

    return false;
  }
}

// 5. FUNCI�N PARA DESCONECTAR DE LA BASE DE DATOS
async function disconnectDB() {
  try {
    await sql.close();
    console.log('= Desconectado de la base de datos correctamente');
  } catch (error) {
    console.error('�  Error al desconectar:', error.message);
  }
}

// 6. FUNCI�N PARA PROBAR LA CONEXI�N
async function testConnection() {
  try {
    console.log('>� Probando conexi�n con consulta de prueba...');
    const result = await sql.query('SELECT 1 as prueba, GETDATE() as fecha_actual');

    console.log(' Consulta de prueba exitosa:');
    console.log('=� Fecha del servidor:', result.recordset[0].fecha_actual);

    return true;
  } catch (error) {
    console.error('L Error en consulta de prueba:', error.message);
    return false;
  }
}

// 7. EXPORTAMOS TODO PARA QUE OTROS ARCHIVOS LO USEN
module.exports = {
  connectDB,
  disconnectDB,
  testConnection,
  sql,
  dbConfig
};