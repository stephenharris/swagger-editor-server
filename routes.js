'use strict';
 
const Router = require('express');
const fs = require('fs');

const fileNameIsLegal = (filename) => {
    return filename.match(/^[0-9a-z-_]+$/gi);
}
 
const getSwaggerRoutes = (app) => {
    const router = new Router();
 
    router
        .get('/:id', (req, res) => {
            const id = req.params.id;

            if (!fileNameIsLegal(id)) {
                return res.status(400).send('Swagger file name must contain only alphanumerics, underscores and hyphens');
            }
            
            if (!fs.existsSync('./store/' + id)) {
                return res.status(404).send('Swagger file does not exist');
            }

            var contents = fs.readFileSync('./store/' + id, 'utf8');
            res.send(contents);
        })
        .put('/:id', (req, res) => {
            const id = req.params.id;
            
            if(! fileNameIsLegal(id) ) {
                return res.status(400).send('Swagger file name must contain only alphanumerics, underscores and hyphens');
            }

            fs.writeFile('./store/' + id, req.body, function(err, data){
                if (err) {
                    console.log(err);
                    res.status(500).send("Could not save swagger file");
                }
            });

            res.status(204).send();
        });
 
    app.use('/swagger', router);
};
 
module.exports = getSwaggerRoutes;
