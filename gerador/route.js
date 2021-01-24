fs = require('fs');

module.exports = {

    gerar: function (caminho, nome, estrutura) {
        if (!fs.existsSync(caminho + '/routes/')) {
            fs.mkdirSync(caminho + '/routes/', { recursive: true });
        }

        let codeString = '';
        if (fs.existsSync(caminho + `/routes/${nome}.route.js`)) {
            const data = fs.readFileSync(caminho + `/routes/${nome}.route.js`, 'utf8');
            
            let codigoCustom = '';
            if (data.includes("/*custom*/")) {
                codigoCustom = data.split('/*custom*/');
                codeString = codigoCustom[1];
            }
        }
        

        var stream = fs.createWriteStream(caminho + `/routes/${nome}.route.js`);
        stream.once('open', function (fd) {

            stream.write(`module.exports = function (app) {\n`);
            stream.write(`let { verify } = require('../routes/middleware/authentication');`);
            stream.write(`\tvar controller = require('../controllers/api/${nome}.controller');\n`);
            stream.write(`\tapp.get('/api/${nome}/', verify('roll ${nome}'), controller.findAll);\n`);
            stream.write(`\tapp.get('/api/${nome}/:id', verify('one ${nome}'), controller.findOne);\n`);

            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];        
                if(estrutura[i].props) {
                    if(estrutura[i].props[0] === "filtravel") {
                        const nomeFuncao = item.nome.charAt(0).toUpperCase() + item.nome.slice(1);                        
                        stream.write(`\tapp.get('/api/${nome}/findby/${item.nome}/:${item.nome}', verify('find by ${nome} ${item.nome}'), controller.findBy${nomeFuncao});\n`);
                    }
                }                
            }
            
            stream.write(`\tapp.post('/api/${nome}/', verify('add ${nome}'), controller.create);\n`);
            stream.write(`\tapp.put('/api/${nome}/:id', verify('update ${nome}'), controller.update);\n`);
            stream.write(`\tapp.delete('/api/${nome}/:id', verify('delete ${nome}'), controller.delete);\n`);
            stream.write(`\n\n`);
            stream.write(`/*custom*/`);
            stream.write(codeString);            
            stream.write(`/*custom*/`);
            stream.write(`\n}`);
        });

    }

};