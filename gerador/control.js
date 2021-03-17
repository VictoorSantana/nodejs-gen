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
            stream.write(`const headerSet = require('../../utils/functions/headerSet');\n`);

            stream.write(`const ${nameCap}Schema = require('../../database/schemas/${nome}.schema');\n`);

            var importModel = [];
            importModel.push(`${nameCap}Model`);
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                if (item.join) {
                    if (item.join[0] === '11' || item.join[0] === '1N') {
                        importModel.push(`${item.join[1]}Model`);
                    }
                }
            }

            let uniqueArray = importModel.filter(function (item, pos) {
                return importModel.indexOf(item) == pos;
            })

            stream.write(`const { ${uniqueArray} } = require('../../database/models/models');\n`);
            stream.write(`exports.findAll = function (req, res) {\n`);
            // stream.write(`\tconst offset = isNaN(Number(req.headers.offset)) ? 0 : Number(req.headers.offset);\n`);
            // stream.write(`\tconst limit = isNaN(Number(req.headers.limit)) ? 5 : Number(req.headers.limit);\n`);
            // stream.write(`\tconst sorted = req.headers.sorted;\n`);
            // stream.write(`\tconst attr = req.headers.attr;\n`);
            // stream.write(`\tlet order = [];\n`);
            // stream.write(`\tif(sorted && attr) { order.push([ attr, sorted ]); }\n`);
            stream.write(`\tlet { offset, limit, order } = headerSet.getItems(req.headers);\n`);

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
                    if (item.join[0] === '11' || item.join[0] === '1N') {
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
                    if (item.join[0] === '11' || item.join[0] === '1N') {
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
                        // stream.write(`\tconst offset = isNaN(Number(req.headers.offset)) ? 0 : Number(req.headers.offset);\n`);
                        // stream.write(`\tconst limit = isNaN(Number(req.headers.limit)) ? 5 : Number(req.headers.limit);\n`);
                        // stream.write(`\tconst sorted = req.headers.sorted;\n`);
                        // stream.write(`\tconst attr = req.headers.attr;\n`);
                        // stream.write(`\tlet order = [];\n`);
                        // stream.write(`\tif(sorted && attr) { order.push([ attr, sorted ]); }\n`);

                        stream.write(`\tlet { offset, limit, order } = headerSet.getItems(req.headers);\n`);
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
                                if (item.join[0] === '11' || item.join[0] === '1N') {
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

            let temFileTipo = false;
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                if (item.tipo == "file") {
                    temFileTipo = true;
                    break;
                }
            }

            if (temFileTipo) {
                stream.write(`\nexports.create = function (req, res) {`);
                stream.write(`\n\tlet { error, value } = FileSchema.validate(req.body);`);
                stream.write(`\n\tif (error === undefined) {`);
                stream.write(`\n`);
                //stream.write(`\n\t\tconsole.log(req.files);`);
                stream.write(`\n\t\tif (!req.files) {`);
                stream.write(`\n\t\t\tres.status(400).json('file is needed');`);
                stream.write(`\n\t\t\treturn;`);
                stream.write(`\n\t\t}`);
                stream.write(`\n`);

                // stream.write(`\n\t\tvalue.hash = new Date().getTime();`);
                // stream.write(`\n\t\tlet day = new Date().getUTCDate();`);
                // stream.write(`\n\t\tlet month = new Date().getMonth() + 1;`);
                // stream.write(`\n\t\tlet year = new Date().getFullYear();`);
                // stream.write(`\n`);
                // stream.write(`\n\t\tlet filetarget = req.files.filetarget;`);
                // stream.write(`\n`);
                // stream.write(`\n\t\ttry {`);
                // stream.write(`\n\t\t\tvalue.type = filetarget.mimetype.split('/')[1];`);
                // stream.write(`\n\t\t\tvalue.type = value.type == 'jpeg' ? 'jpg' : value.type;`);
                // stream.write(`\n`);
                // stream.write(`\n\t\t\tif (value.type != 'png' && value.type != 'jpg') {`);
                // stream.write(`\n\t\t\t\tres.status(400).json('invalid type(' + value.type + ') extension.');`);
                // stream.write(`\n\t\t\t\treturn;`);
                // stream.write(`\n\t\t\t}`);
                // stream.write(`\n\t\t} catch (e) {`);
                // stream.write(`\n\t\t\tres.status(400).json('type not valid');`);
                // stream.write(`\n\t\t\treturn;`);
                // stream.write(`\n\t\t}`);
                // stream.write(`\n`);
                // stream.write(`\n\t\tfiletarget.mv('./public/storage/files/images/' + year + '/' + month + '/' + day + '/' + value.hash + '.' + value.type);`);

                for (var i = 0; i < estrutura.length; i++) {
                    const item = estrutura[i];
                    if (item.tipo == "file") {
                        stream.write(`\n\t\t let { type, hash, ok, msg } = headerSet.saveFile(req.files, '${item.nome}');`);
                    }
                }

                stream.write(`\n\t\tif(!ok) {`);
                stream.write(`\n\t\tres.status(400).send(msg);`);
                stream.write(`\n\t\treturn;`);
                stream.write(`\n\t\t}`);
                stream.write(`\n\t\t`);
                stream.write(`\n\t\tvalue.hash = hash;`);
                stream.write(`\n\t\tvalue.type = type;`);


                stream.write(`\n`);
                stream.write(`\n\t\tFileModel`);
                stream.write(`\n\t\t\t.create(value)`);
                stream.write(`\n\t\t\t.then(result => {`);
                stream.write(`\n\t\t\t\tres.status(200).json(result);`);
                stream.write(`\n\t\t\t})`);
                stream.write(`\n\t\t\t.catch(e => {`);
                stream.write(`\n\t\t\t\tres.status(500).json(e);`);
                stream.write(`\n\t\t\t});`);
                stream.write(`\n\t} else {`);
                stream.write(`\n\t\tres.status(500).json(error);`);
                stream.write(`\n\t}`);
                stream.write(`\n};`);
            } else {
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
            }


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