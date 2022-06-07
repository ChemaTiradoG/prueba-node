/**
 * Express configuration
 */
const express = require('express');
const fileUpload = require('express-fileupload');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const engine = require('ejs').renderFile;
const environment = require('../environment/environment');

module.exports = async (app) => {
    // Configuraciones de express
    app.set('trust proxy', 1); // Trust IIS proxy
    app.use('/static', express.static(process.cwd() + '/src/public'));
    app.use(fileUpload({ useTempFiles: true, }));
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(methodOverride());
    app.engine('html', engine);
    app.set('view engine', 'html');

    // Comprobación de status node.js
    app.get('/', async (req, res) => {
        try {
            res.json({
                mensaje: `Express server listening on ####, in ${environment.descripcion} mode.`
            });
        } catch (error) {
            console.log('\nERROR ' + path.basename(__filename) + ' /' + req.route.path, '\n' + error.stack + '\n');
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    });

    // Importación de módulos api
    require('../api')(app);
};
