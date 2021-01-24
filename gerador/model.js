fs = require('fs');

module.exports = {

    gerar: function (caminho, nome, estrutura) {
        if (!fs.existsSync(caminho + '/database/models/')) {
            fs.mkdirSync(caminho + '/database/models/', { recursive: true });
        }

        var stream = fs.createWriteStream(caminho + `/database/models/${nome}.model.js`);
        stream.once('open', function (fd) {
            const tb = nome[nome.length - 1] === "s" ? nome : nome + "s";

            stream.write("const Sequelize = require('sequelize'); \n");
            stream.write("const db = require('../connection'); \n");
            stream.write("const model = db.define('tb_" + tb + "', { \n");

            stream.write("\t id: {\n\t\t type: Sequelize.INTEGER,\n\t\t autoIncrement: true,\n\t\t primaryKey: true \t\n}, \n");

            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                let obg = "";

                stream.write(`\t ${item.nome}: { \n`);

                if (item.tipo === "varchar") {
                    stream.write(`\t\t type: Sequelize.STRING(${item.tamanho}), \n`);
                }
                if (item.tipo === "decimal") {
                    stream.write(`\t\t type: Sequelize.DECIMAL(${item.tamanho}), \n`);
                }
                if (item.tipo === "integer") {
                    stream.write(`\t\t type: Sequelize.INTEGER(${item.tamanho}), \n`);
                }
                if (item.obrigatorio === "sim") {
                    stream.write(`\t allowNull: false \n`);
                }

                stream.write(`\t}, \n`);
            }

            stream.write("}, { timestamps: false }); \n");
            stream.write("module.exports = model; \n");
            stream.end();
        });


    }

};