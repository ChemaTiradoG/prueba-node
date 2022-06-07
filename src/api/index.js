const path = require('path');
const sql = require('../models/mysql');

async function hasMutation(dna) {
    try {
        dna = JSON.parse(dna); // CONVERSIÓN A OBJETO JAVASCRIPT
        dna = dna.dna; // ARRAY PRINCIPAL HORIZONTAL
        console.log('DNA RECIBIDO ', dna);
        // SE UTILIZARAN PARA DISPONER DE LOS DATOS DE MANERA HORIZONTAL
        // Y ASÍ UTILIZAR UN SÓLO PROCESO DE BUSQUEDA DE SECUENCIA
        const dnaVertical = [];
        let dnaDiagonal = [];
        let dnaDiagonalInv = [];

        // VALIDACIÓNES DNA
        dna.forEach(function callback(linea, i) { // RECORRIDO POR ARRAY PRINCIPAL
            if (linea.length !== dna.length || typeof linea !== 'string') { // MATRIZ CUADRADA Y FORMATO STRING
                return 0;
            }
            linea.split("").forEach(function callback(e, j) { // RECORRIDO POR STRINGS
                if (e !== 'A' && e !== 'T' && e !== 'C' && e !== 'G') // SOLO CARACTERES VÁLIDOS
                    return 0;

                // GENERAMOS MATRIZ VERTICAL PARA BUSQUEDA
                if (i === 0) { // SI ESTAMOS EN LA POSICIÓN 0 DEL HORIZONTAL, AGREGAMOS NUEVO ARRAY AL VERTICAL 
                    dnaVertical.push(e);
                } else { // SI NO, CONCATENAMOS A LA POSICIÓN AGREGADA EN UN PRINCIPIO
                    dnaVertical[j] = dnaVertical[j] + e;
                }
            });
        });

        const dnaAux = []; // DNA INVERTIDO PARA GENERAR AMBAS DIAGONALES CON EL MISMO PROCESO
        dna.forEach(element => { // GENERANDO DNA INVERTIDO
            dnaAux.push(element.split('').reverse().join(''));
        });

        // GENERAR MATRICES DIAGONALES
        function getDiagonal(dnaReceived) {
            // SEPARACIÓN DE STRINGS EN ARRAYS
            dnaReceived.forEach(element => {
                element = element.split('');
            });

            // GENERACIÓN DE MATRIZ INVERTIDA (PARA EJECUTAR BUSQUEDA EN MEDIA MATRIZ 2 VECES)
            const newDiagonal = [];
            for (let i = dnaReceived.length - 1; i >= 0; i--) {
                const element = dnaReceived[i];
                newDiagonal.push(element.split('').reverse().join('').split(''));
            }

            const result = []; // CONSTANTE DONDE SE GUARDA EL RESULTADO DE LA FUNCIÓN

            // FUNCIÓN QUE OBTIENE LAS DIAGONALES DE MEDIA MATRIZ
            function mediaDiagonal(dnaProccess) {
                for (let i = 0; i < dnaProccess.length; i++) {
                    let x = i, y = 0;
                    tmp = '';
                    for (; x >= 0; x--, y++) {
                        tmp = tmp + dnaProccess[x][y];
                    }
                    result.push(tmp);
                }
            }

            mediaDiagonal(dnaReceived); // SE PROCESA PRIMER MITAD DE LA MATRIZ
            mediaDiagonal(newDiagonal); // SE PROCESA SEGUNDA MITAD DE LA MATRIZ (INVERTIDA)
            result.pop(); // SE DESCARTA LA DIAGONAL PRINCIPAL QUE SE REPITE
            return result;
        }

        // SE OBTIENEN LAS DIAGONALES HACIA AMBOS LADOS
        dnaDiagonal = getDiagonal(dna);
        dnaDiagonalInv = getDiagonal(dnaAux)

        // console.log('HORIZONTAL\n',dna);
        // console.log('\nVERTICAL\n',dnaVertical );
        // console.log('\nDIAGONAL\n', dnaDiagonal);
        // console.log('\nDIAGONAL INV\n', dnaDiagonalInv);

        // VERIFICA Y CUENTA EN TODAS LAS LINEAS OBTENIDAS ANTERIORMENTE, SI SE REPITEN
        // CARÁCTERES DOS VECES EN LA MATRIZ, Y POR TANTO SI EXISTE MUTACIÓN
        contadorMutacion = 0;
        async function comprobarMutacion(dna, dnaVertical, dnaDiagonal, dnaDiagonalInv) {
            lineas = [].concat(dna, dnaVertical, dnaDiagonal, dnaDiagonalInv);
            // console.log('lineas', lineas);

            for (let index = 0; index < lineas.length; index++) {
                const linea = lineas[index];
                // console.log('LINEA', linea);
                const arr = linea.split('');
                // DESCARTAMOS LINEAS MENORES A 4 CARACTERES
                if (arr.length >= 4) {
                    // COMIENZA LA BUSQUEDA DE MUTACIONES
                    for (let i = 0, j = i + 3; j < arr.length; i++, j++) {
                        // console.log('---- comparacion', arr[i], arr[i + 1], arr[i + 2], arr[i + 3]);
                        if (arr[i] == arr[i + 1] && arr[i + 1] == arr[i + 2] && arr[i + 2] == arr[i + 3]) {
                            contadorMutacion++;

                            if (contadorMutacion > 1) {
                                // console.log('Contador Mutación: ', contadorMutacion);
                                await sql.execute(`CALL SP_IN_REGISTRO_ADN(@dna, @tipo)`, { dna: JSON.stringify(dna), tipo: 1 }); // INSERCIÓN EN BASE DE DATOS MUTACIÓN
                                return 1; // DNA VÁLIDO CON MUTACIÓN
                            }

                            if ((j + 4) <= (arr.length - 1)) { // VALIDAR SI AUN SE PUEDE ENCONTRAR MUTACIÓN EN LA LINEA
                                i + 3; // SE AVANZA HASTA EL FINAL DE LA MUTACIÓN DESCUBIERTA
                                j + 3; // CON EL i++, j++ DEL CICLO DA +4
                            } else {
                                break;
                            }
                        }
                    }
                    // console.log('Contador Mutación: ', contadorMutacion);
                }
            }
            await sql.execute(`CALL SP_IN_REGISTRO_ADN(@dna, @tipo)`, { dna: JSON.stringify(dna), tipo: 0 }); // INSERCIÓN EN BASE DE DATOS NO MUTACIÓN
            return 2; // DNA VÁLIDO SIN MUTACIÓN
        }
        return await comprobarMutacion(dna, dnaVertical, dnaDiagonal, dnaDiagonalInv);
    } catch (error) {
        console.log(error);
        return 0; // FORMATO DNA INCORRECTO
    }
}

module.exports = async (app) => {
    app.post('/mutation/:dna', async (req, res) => {
        try {
            switch (await hasMutation(req.params.dna)) {
                case 0: // FORMATO INCORRECTO
                    console.log('RESULTADO: FORMATO INCORRECTO');
                    res.status(400).json({ mensaje: 'Formato DNA incorrecto' });
                    break;
                case 1: // MUTACIÓN
                    console.log('RESULTADO: MUTACIÓN');
                    res.status(200).json({ mensaje: 'OK' });
                    break
                case 2: // NO MUTACIÓN
                    console.log('RESULTADO: NO MUTACIÓN');
                    res.status(403).json({ mensaje: 'Forbidden' });
                    break;
            }
        } catch (error) {
            console.log('\nERROR ' + path.basename(__filename) + ' /' + req.route.path, '\n' + error.stack + '\n');
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    });

    app.get('/stats', async (req, res) => {
        res.set('Cache-Control', 'no-store');
        try {
            const result = await sql.execute('CALL SP_RP_ADN;');
            res.json({
                mensaje: result[0]
            });
        } catch (error) {
            console.log('\nERROR ' + path.basename(__filename) + ' /' + req.route.path, '\n' + error.stack + '\n');
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    });

    app.post('/test', async (req, res) => {
        res.set('Cache-Control', 'no-store');
        try {
            // NUMERO ALEATORIO ENTRE 4 Y 20 PARA DECIDIR CANTIDAD A INSERTAR
            const length = Math.floor(Math.random() * (10 - 4)) + 4;

            matricesMutacion = []; // PARA ENVIAR AL USUARIO MATRICES GENERADAS AUTOMATICAMENTE
            matricesNoMutacion = [];

            for (let i = 0; i < length; i++) {
                // NUMERO ALEATORIO ENTRE 4 Y 10 PARA ELEGIR LARGO DE LA MATRIZ
                const matrizSide = Math.floor(Math.random() * (10 - 4)) + 4;

                matrizArr = [];
                for (let j = 0; j < matrizSide; j++) {
                    matrizArr.push('')
                    for (let k = 0; k < matrizSide; k++) {
                        caracteres = ['A','T','C','G'];
                        // NUMERO ALEATORIO ENTRE 0 Y 3 PARA ELEGIR CARACTERES
                        setCaracter = Math.floor(Math.random() * (4 - 0)) + 0;
                        matrizArr[j]+= caracteres[setCaracter];
                    }
                }
                // console.log('MATRIZ A INSERTAR');
                // console.log(matrizArr);

                // PROCESO PARA INSERTAR MATRICES
                const type = await hasMutation(JSON.stringify({dna: matrizArr}));
                // Guardar para enviar al usuario
                (type === 1) ? matricesMutacion.push(matrizArr) : matricesNoMutacion.push(matrizArr);
            }
            res.status(200).json({ mensaje: 'Se insertaron ' + length + ' matrices', matricesMutacion: matricesMutacion, matricesNoMutacion: matricesNoMutacion  });
        } catch (error) {
            console.log('\nERROR ' + path.basename(__filename) + ' /' + req.route.path, '\n' + error.stack + '\n');
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    });

    app.delete('/truncate', async (req, res) => {
        try {
            await sql.execute('CALL SP_DT_ADN;');
            res.json({
                mensaje: 'Borrado correctamente'
            });
        } catch (error) {
            console.log('\nERROR ' + path.basename(__filename) + ' /' + req.route.path, '\n' + error.stack + '\n');
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    });

    app.get('/ping', async (req, res) => {
        try {
            res.json({
                mensaje: 'Conexión realizada correctamente'
            });
        } catch (error) {
            console.log('\nERROR ' + path.basename(__filename) + ' /' + req.route.path, '\n' + error.stack + '\n');
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    });

    // ERROR 404
    app.get('*', function (_req, res) { res.status(404).json({ mensaje: '[GET 404] No se encontró el recurso solicitado' }); });
    app.post('*', function (_req, res) { res.status(404).json({ mensaje: '[POST 404] No se encontró el recurso solicitado' }); });
    app.put('*', function (_req, res) { res.status(404).json({ mensaje: '[PUT 404] No se encontró el recurso solicitado' }); });
    app.delete('*', function (_req, res) { res.status(404).json({ mensaje: '[DELETE 404] No se encontró el recurso solicitado' }); });
};