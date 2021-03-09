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

            stream.write(`const { Op } = require('sequelize');\n`);
            stream.write(`const debug = require('../../utils/debug');\n`);

            stream.write(`const ${nameCap}Schema = require('../../database/schemas/${nome}.schema');\n`);

            var importModel = [];
            importModel.push(`${nameCap}Model`);
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                if (item.join) {
                    if (item.join[0] === '11') {
                        importModel.push(`${item.join[1]}Model`);
                    }
                }
            }
            stream.write(`const { ${importModel} } = require('../../database/models/models');\n`);
            stream.write(`exports.findAll = function (req, res) {\n`);
            stream.write(`\tconst offset = isNaN(Number(req.headers.offset)) ? 0 : Number(req.headers.offset);\n`);
            stream.write(`\tconst limit = isNaN(Number(req.headers.limit)) ? 5 : Number(req.headers.limit);\n`);
            stream.write(`\tconst sorted = req.headers.sorted;\n`);
            stream.write(`\tconst attr = req.headers.attr;\n`);
            stream.write(`\tlet order = [];\n`);
            stream.write(`\tif(sorted && attr) { order.push([ attr, sorted ]); }\n`);
            stream.write(`\tlet exclude = [];\n`);
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                if (estrutura[i].subtipo) {
                    if (estrutura[i].subtipo === "password") {
                        stream.write(`\texclude.push('password');\n`);
                    }
                }
            }

            stream.write(`\t${nameCap}Model\n`);
            stream.write(`\t\t.findAndCountAll({\n`);
            stream.write(`\t\t\toffset,\n`);
            stream.write(`\t\t\tlimit,\n`);
            stream.write(`\t\t\torder,\n`);
            stream.write(`\t\t\tattributes: {exclude},\n`);

            stream.write(`\t\t\tinclude: [\n`);
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                if (item.join) {
                    if (item.join[0] === '11') {
                        stream.write(`\t\t\t{ model: ${item.join[1]}Model, as: '${item.join[1]}' }, \n`);
                    }
                }
            }
            stream.write(`\t\t\t] \n`);
            stream.write(`\t\t\t})\n`);
            stream.write(`\t\t.then(result => {\n`);
            stream.write(`\t\t\tres.status(200).json(result);\n`);
            stream.write(`\t\t})\n`);
            stream.write(`\t\t.catch(e => {\n`);
            stream.write(`\t\t debug.save(e, '${nameCap} - findAll'); \n`);
            stream.write(`\t\t\tres.status(500).json(e.original.sqlMessage || e.original || e);\n`);
            stream.write(`\t\t});\n`);
            stream.write(`};\n`);
            stream.write(`exports.findOne = function (req, res) {\n`);
            stream.write(`\tconst id = isNaN(Number(req.params.id)) ? 0 : Number(req.params.id);\n`);
            stream.write(`\tlet exclude = [];\n`);
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                if (estrutura[i].subtipo) {
                    if (estrutura[i].subtipo === "password") {
                        stream.write(`\texclude.push('password');\n`);
                    }
                }
            }


            stream.write(`\t${nameCap}Model\n`);
            stream.write(`\t\t.findAll({attributes: {exclude}, \n`);
            stream.write(`\t\t\tinclude: [\n`);
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                if (item.join) {
                    if (item.join[0] === '11') {
                        stream.write(`\t\t\t{ model: ${item.join[1]}Model, as: '${item.join[1]}' }, \n`);
                    }
                }
            }
            stream.write(`\t\t\t], \n`);

            stream.write(`\t\t\twhere: { id }\n`);
            stream.write(`\t\t})\n`);
            stream.write(`\t.then(result => {\n`);
            stream.write(`\t\t\tres.status(200).json(result);\n`);
            stream.write(`\t\t})\n`);
            stream.write(`\t\t.catch(e => {\n`);
            stream.write(`\t\t debug.save(e, '${nameCap} - findOne'); \n`);
            stream.write(`\t\t\tres.status(500).json(e.original.sqlMessage || e.original || e);\n`);
            stream.write(`\t\t});\n`);
            stream.write(`};\n`);

            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];

                if (estrutura[i].props) {
                    if (estrutura[i].props[0] === "filtravel") {
                        const nomeFuncao = item.nome.charAt(0).toUpperCase() + item.nome.slice(1);

                        stream.write(`exports.findBy${nomeFuncao} = function (req, res) {\n`);
                        stream.write(`\tconst offset = isNaN(Number(req.headers.offset)) ? 0 : Number(req.headers.offset);\n`);
                        stream.write(`\tconst limit = isNaN(Number(req.headers.limit)) ? 5 : Number(req.headers.limit);\n`);
                        stream.write(`\tconst sorted = req.headers.sorted;\n`);
                        stream.write(`\tconst attr = req.headers.attr;\n`);
                        stream.write(`\tlet order = [];\n`);
                        stream.write(`\tif(sorted && attr) { order.push([ attr, sorted ]); }\n`);
                        stream.write(`\tlet exclude = [];\n`);
                        if (estrutura[i].subtipo) {
                            if (estrutura[i].subtipo === "password") {
                                stream.write(`\texclude.push('password');\n`);
                            }
                        }

                        if (estrutura[i].tipo === "varchar") {
                            stream.write(`\tconst ${item.nome} = req.params.${item.nome};\n`);
                        } else {
                            stream.write(`\tconst ${item.nome} = isNaN(Number(req.params.${item.nome})) ? 0 : Number(req.params.${item.nome});\n`);
                        }
                        stream.write(`\t${nameCap}Model\n`);
                        stream.write(`\t\t.findAndCountAll({\n`);
                        stream.write(`\t\t\toffset, limit, order, attributes: {exclude},`);

                        stream.write(`\t\t\tinclude: [\n`);
                        for (var j = 0; j < estrutura.length; j++) {
                            const item = estrutura[j];
                            if (item.join) {
                                if (item.join[0] === '11') {
                                    stream.write(`\t\t\t{ model: ${item.join[1]}Model, as: '${item.join[1]}' }, \n`);
                                }
                            }
                        }
                        stream.write(`\t\t\t], \n`);


                        if (estrutura[i].tipo === "varchar") {
                            stream.write(`\t\t\twhere: { ${item.nome}: { [Op.like]: '%' + ${item.nome} + '%' } }\n`);
                        } else if (estrutura[i].tipo == "integer") {
                            stream.write(`\t\t\twhere: { ${item.nome} }\n`);
                        } else {
                            stream.write(`\t\t\twhere: { ${item.nome} }\n`);
                        }
                        stream.write(`\t\t},)\n`);
                        stream.write(`\t\t.then(result => {\n`);
                        stream.write(`\t\t\tres.status(200).json(result);\n`);
                        stream.write(`\t\t})\n`);
                        stream.write(`\t\t.catch(e => {\n`);
                        stream.write(`\t\t debug.save(e, '${nameCap} - findBy${nomeFuncao}'); \n`);
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
            stream.write(`\t\t\tres.status(201).json(result);\n`);
            stream.write(`\t\t\t})\n`);
            stream.write(`\t\t\t.catch(e => {\n`);
            stream.write(`\t\t\t\tres.status(500).json(e);\n`);
            stream.write(`\t\t});\n`);
            stream.write(`\t} else {\n`);
            stream.write(`\t\t debug.save(e, '${nameCap} - create'); \n`);
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
            stream.write(`\t\t debug.save(e, '${nameCap} - update'); \n`);
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
            stream.write(`\t\t debug.save(e, '${nameCap} - delete'); \n`);
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