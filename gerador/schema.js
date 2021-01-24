fs = require('fs');

module.exports = {
    
    gerar: function (caminho, nome, estrutura) {
        if (!fs.existsSync(caminho + '/database/schemas/')) {
            fs.mkdirSync(caminho + '/database/schemas/', { recursive: true });
        }

        var stream = fs.createWriteStream(caminho + `/database/schemas/${nome}.schema.js`);
        stream.once('open', function (fd) {
            stream.write("const Joi = require('@hapi/joi'); \n");
            stream.write("module.exports = Joi.object({ \n");

            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                let tipo = "";
                let obg = "";
                let size = "";
                let tamanho = "";

                for(var j = 0; j < Number(item.tamanho); j++) {
                    tamanho += "9";
                }
                

                if (item.tipo === "varchar") {
                    tipo = ".string()";
                    size = `.max(${item.tamanho})`
                }
                if (item.tipo === "decimal") {
                    tipo = ".number()";
                }
                if (item.tipo === "integer") {
                    tipo = ".number().integer()";
                    size = `.max(${tamanho})`;
                }

                if (item.obrigatorio === "sim") {
                    obg = ".required()";
                }

                stream.write(`  ${item.nome}: Joi${tipo}${size}${obg},` + "\n");
            }

            stream.write("}); \n");
            stream.end();
        });


    }

};