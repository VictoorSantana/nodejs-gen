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
                let msg = "";
                let tamanho = "";
                let tipoJs = "";

                for(var j = 0; j < Number(item.tamanho); j++) {
                    tamanho += "9";
                }
                

                if (item.tipo === "varchar") {
                    tipo = ".string()";
                    size = `.max(${item.tamanho})`
                    tipoJs = "string";
                }
                if (item.tipo === "decimal") {
                    tipo = ".number()";
                    size = `.max(${tamanho})`;
                    tipoJs = "number";
                }
                if (item.tipo === "integer") {
                    tipo = ".number().integer()";
                    size = `.max(${tamanho})`;
                    tipoJs = "number";
                }
                if (item.tipo === "datetime") {
                    tipo = ".date()";
                    tipoJs = "date";
                }                


                if (item.obrigatorio === "sim") {
                    obg = ".required()";
                }

                msg = `.messages({`;
                if (item.tipo === "varchar") {
                    msg += `'${tipoJs}.base': 'campo "${item.nome}" deve ser do tipo "texto".',\n`;
                }                
                if (item.tipo === "decimal") {
                    msg += `'${tipoJs}.base': 'campo "${item.nome}" deve ser do tipo "decimal".',\n`;
                }                
                if (item.tipo === "integer") {
                    msg += `'${tipoJs}.base': 'campo "${item.nome}" deve ser do tipo "inteiro".',\n`;
                }                
                if (item.tipo === "datetime") {
                    msg += `'${tipoJs}.base': 'campo "${item.nome}" deve ser do tipo "data valida".',\n`;
                }                

                msg +=  `'${tipoJs}.empty': 'campo "${item.nome}" não pode ser vazio.',
                    '${tipoJs}.min': 'campo "${item.nome}" deve ter o tamanho minimo de {#limit}',
                    '${tipoJs}.max': 'campo "${item.nome}" deve ter o tamanho maximo de {#limit}',
                    'any.required': 'campo "${item.nome}" é obrigatorio ser preenchido.'
                  })\n`;

                stream.write(`  ${item.nome}: Joi${tipo}${size}${obg}${msg},` + "\n");
            }

            stream.write("}); \n");
            stream.end();
        });


    }

};