fs = require('fs');

module.exports = {

    gerar: function (caminho, nome, estrutura) {
        if (!fs.existsSync(caminho + '/controllers/api/')) {
            fs.mkdirSync(caminho + '/controllers/api/', { recursive: true });
        }

        let codeString = '';
        if (fs.existsSync(caminho + `/controllers/api/${nome}.controller.js`)) {
            const data = fs.readFileSync(caminho + `/controllers/api/${nome}.controller.js`, 'utf8');

            let codigoCustom = '';
            if (data.includes("/*custom*/")) {
                codigoCustom = data.split('/*custom*/');
                codeString = codigoCustom[1];
            }
        }


        var stream = fs.createWriteStream(caminho + `/controllers/api/${nome}.controller.js`);
        stream.once('open', function (fd) {
            const nameCap = nome.charAt(0).toUpperCase() + nome.slice(1);

            stream.write(`const { QueryTypes, Op } = require('sequelize');\n`);
            stream.write(`const ${nameCap}Schema = require('../../database/schemas/${nome}.schema');\n`);
            stream.write(`const ${nameCap}Model = require('../../database/models/${nome}.model');\n`);
            stream.write(`exports.findAll = function (req, res) {\n`);
            stream.write(`\t${nameCap}Model\n`);
            stream.write(`\t\t.findAll()\n`);
            stream.write(`\t\t.then(result => {\n`);
            stream.write(`\t\t\tres.status(200).json(result);\n`);
            stream.write(`\t\t})\n`);
            stream.write(`\t\t.catch(e => {\n`);
            stream.write(`\t\t\tres.status(500).json(e.original.sqlMessage || e.original || e);\n`);
            stream.write(`\t\t});\n`);
            stream.write(`};\n`);
            stream.write(`exports.findOne = function (req, res) {\n`);
            stream.write(`\tconst id = isNaN(Number(req.params.id)) ? 0 : Number(req.params.id);\n`);
            stream.write(`\t${nameCap}Model\n`);
            stream.write(`\t\t.findAll({\n`);
            stream.write(`\t\t\twhere: { id }\n`);
            stream.write(`\t\t})\n`);
            stream.write(`\t.then(result => {\n`);
            stream.write(`\t\t\tres.status(200).json(result);\n`);
            stream.write(`\t\t})\n`);
            stream.write(`\t\t.catch(e => {\n`);
            stream.write(`\t\t\tres.status(500).json(e.original.sqlMessage || e.original || e);\n`);
            stream.write(`\t\t});\n`);
            stream.write(`};\n`);

            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];                

                if(estrutura[i].props) {
                    if(estrutura[i].props[0] === "filtravel") {
                        const nomeFuncao = item.nome.charAt(0).toUpperCase() + item.nome.slice(1);

                        stream.write(`exports.findBy${nomeFuncao} = function (req, res) {\n`);
                        if(estrutura[i].tipo === "varchar") {
                            stream.write(`\tconst ${item.nome} = req.params.${item.nome};\n`);
                        } else {
                            stream.write(`\tconst ${item.nome} = isNaN(Number(req.params.${item.nome})) ? 0 : Number(req.params.${item.nome});\n`);
                        }                     
                        stream.write(`\t${nameCap}Model\n`);
                        stream.write(`\t\t.findAll({\n`);
                        stream.write(`\t\t\twhere: { ${item.nome}: { [Op.like]: '%' + ${item.nome} + '%' } }\n`);
                        stream.write(`\t\t},)\n`);
                        stream.write(`\t\t.then(result => {\n`);
                        stream.write(`\t\t\tres.status(200).json(result);\n`);
                        stream.write(`\t\t})\n`);
                        stream.write(`\t\t.catch(e => {\n`);
                        stream.write(`\t\t\tres.status(500).json(e.original.sqlMessage || e.original || e);\n`);
                        stream.write(`\t\t});\n`);
                        stream.write(`};\n`);
                    }
                }                
            }

            stream.write(`exports.create = function (req, res) {\n`);
            stream.write(`\tconst { error, value } = ${nameCap}Schema.validate(req.body);\n`);
            stream.write(`\tif (error === undefined) {\n`);
            stream.write(`\t\t${nameCap}Model\n`);
            stream.write(`\t\t\t.create(value)\n`);
            stream.write(`\t\t\t.then(result => {\n`);
            stream.write(`\t\t\tres.status(200).json(result);\n`);
            stream.write(`\t\t\t})\n`);
            stream.write(`\t\t\t.catch(e => {\n`);
            stream.write(`\t\t\t\tres.status(500).json(e);\n`);
            stream.write(`\t\t});\n`);
            stream.write(`\t} else {\n`);
            stream.write(`\t\tres.status(500).json(error);\n`);
            stream.write(`\t}\n`);
            stream.write(`};\n`);
            stream.write(`exports.update = function (req, res) {\n`);
            stream.write(`\tconst id = isNaN(Number(req.params.id)) ? 0 : Number(req.params.id);\n`);
            stream.write(`\tconst { error, value } = ${nameCap}Schema.validate(req.body);\n`);
            stream.write(`\tif (error === undefined) {\n`);
            stream.write(`\t\t${nameCap}Model\n`);
            stream.write(`\t\t.update(value, {\n`);
            stream.write(`\t\t\twhere: { id }\n`);
            stream.write(`\t\t})\n`);
            stream.write(`\t\t.then(result => {\n`);
            stream.write(`\t\t\tres.status(200).json(result);\n`);
            stream.write(`\t\t})\n`);
            stream.write(`\t\t.catch(e => {\n`);
            stream.write(`\t\t\tres.status(500).json(e.original.sqlMessage || e.original || e);\n`);
            stream.write(`\t\t});\n`);
            stream.write(`\t} else {\n`);
            stream.write(`\t\tres.status(500).json(error);\n`);
            stream.write(`\t}\n`);
            stream.write(`};\n`);
            stream.write(`exports.delete = function (req, res) {\n`);
            stream.write(`\tconst id = isNaN(Number(req.params.id)) ? 0 : Number(req.params.id);\n`);
            stream.write(`\t${nameCap}Model\n`);
            stream.write(`\t\t.destroy({\n`);
            stream.write(`\t\t\twhere: { id }\n`);
            stream.write(`\t\t})\n`);
            stream.write(`\t\t.then(result => {\n`);
            stream.write(`\t\t\tres.status(200).json(result);\n`);
            stream.write(`\t\t})\n`);
            stream.write(`\t\t.catch(e => {\n`);
            stream.write(`\t\t\tres.status(500).json(e.original.sqlMessage || e.original || e);\n`);
            stream.write(`\t\t});\n`);
            stream.write(`};\n`);
            stream.write(`\n\n`);
            stream.write(`/*custom*/`);
            stream.write(codeString);
            stream.write(`/*custom*/`);
        });


    }

};