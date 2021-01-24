fs = require('fs');

module.exports = {

    gerar: function (caminho, nome, estrutura) {
        if (!fs.existsSync(caminho + '/database/queries/')) {
            fs.mkdirSync(caminho + '/database/queries/', { recursive: true });
        }

        var stream = fs.createWriteStream(caminho + `/database/queries/${nome}.sql`);
        stream.once('open', function (fd) {

            const tb = nome[nome.length - 1] === "s" ? nome : nome + "s";

            stream.write(`CREATE TABLE tb_${tb} (`);
            stream.write(`id INT NOT NULL AUTO_INCREMENT,`);

            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];

                let stringQuery = '';
                if (item.tipo === "varchar") {
                    stringQuery = (`${item.nome} VARCHAR(${item.tamanho}) ${item.obrigatorio === "sim" ? "NOT NULL" : "NULL"},`);
                }

                if (item.tipo === "decimal") {
                    stringQuery = (`${item.nome} DECIMAL(${(item.tamanho + "").replace('.', ',')}) ${item.obrigatorio === "sim" ? "NOT NULL" : "NULL"},`);
                }

                if (item.tipo === "integer") {
                    stringQuery = (`${item.nome} INT(${item.tamanho}) ${item.obrigatorio === "sim" ? "NOT NULL" : "NULL"}, `);
                }

                stringQuery = stringQuery.substring(0, stringQuery.length - 1);
                stream.write(stringQuery);
            }

            stream.write(`PRIMARY KEY (id));`);
        });

    }

};