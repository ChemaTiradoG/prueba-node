//CONFIGURACION
const environments = {
    dev: {
        descripcion: 'dev',
        port: '3000',
        sql: {
            host: '################', 
            user: '####',
            password: '####',
            database: 'prueba-node',
            waitForConnections: true,
            connectionLimit: 1000, // de 10 a 1000
            connectTimeout: 60 * 60 * 1000, // se agrego
            acquireTimeout: 60 * 60 * 1000, // se agrego
            timeout: 60 * 60 * 1000, // se agrego
        }
    },
};

// SELECCIÓN DE AMBIENTE NODE
const environment = environments.dev; 

module.exports = environment;