const mysql = require('mysql');

// Configuracion
const environment = require('../environment/environment');
const pool = mysql.createPool(environment.sql);

module.exports = {
    execute: async function (queryString, params = {}, additionalParams = {}) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('SQL error', err);
                    reject(err);
                    return;
                }

                // Validación caracteres variable escalar
                let valiText = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789_-';
                function validateChar(string) {
                    for (let index = 0; index < valiText.length; index++) {
                        if (string === valiText.charAt(index)) {
                            return true;
                        }
                    }
                    return false;
                }

                // Procesado de caracteres para simulación de variables escalares
                let query = queryString;
                for (let index = 0; index < query.length; index++) {
                    if (query.charAt(index) === '@') {
                        let indexOrigen = index;
                        let indexFinal = null;
                        index++;
                        for (; index < query.length; index++) {
                            if (validateChar(query.charAt(index))) {
                                // scalarName += query.charAt(index);
                                // console.log(scalarName)
                            } else {
                                indexFinal = index;
                                break;
                            }
                        }
                        // Si se recorre todo el length de la query
                        if (indexFinal === null) {
                            indexFinal = index;
                        }
                        // console.log('query al sacar escalar', query)
                        let scalarName = query.slice(indexOrigen + 1, indexFinal);
                        let tmpQuery = query;
                        query = query.slice(0, indexOrigen);

                        let newValue = null;
                        // Insert de valor escalar
                        if (Object.prototype.hasOwnProperty.call(params, scalarName)) {
                            newValue = pool.escape(params[scalarName]);
                        } else if (Object.prototype.hasOwnProperty.call(additionalParams, scalarName)) {
                            newValue = pool.escape(additionalParams[scalarName]);
                        } else {
                            reject(new Error('SQL error on ' + queryString + '\nDebes declarar la variable escalar @' + scalarName));
                            return;
                        }

                        query += newValue;

                        query += tmpQuery.slice(indexFinal, tmpQuery.length + 1);
                        // console.log('Nombre escalar: @' + scalarName + '\n');
                        index = indexOrigen + newValue.length;
                    }
                }
                // console.log(query)

                connection.query(query, [], (err, res, fields) => {
                    if (err) {
                        console.error('SQL error', err);
                        reject(err);
                        return;
                    }
                    resolve(res);
                    connection.release();
                });
            });
        });
    },
    escape: function (value) {
        return pool.escape(value);
    },
    getPool: function (value) {
        return pool;
    }
}
