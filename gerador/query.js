fs = require('fs');

module.exports = {

    gerar: function (caminho, nome, estrutura, timestamps = "nao") {


        if (!fs.existsSync(caminho + '/database/queries/')) {
            fs.mkdirSync(caminho + '/database/queries/', { recursive: true });
        }

        var stream = fs.createWriteStream(caminho + `/database/queries/${nome}.sql`);
        stream.once('open', function (fd) {

            const tb = nome[nome.length - 1] === "s" ? nome : nome + "s";

            stream.write(`CREATE TABLE tb_${tb} ( \n`);
            stream.write(`id INT NOT NULL AUTO_INCREMENT, \n`);

            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];

                let stringQuery = '';
                if (item.tipo === "varchar") {
                    stringQuery = (`${item.nome} VARCHAR(${item.tamanho}) ${item.obrigatorio === "sim" ? "NOT NULL " : "NULL "}\n,`);
                }

                if (item.tipo === "decimal") {
                    stringQuery = (`${item.nome} DECIMAL(${(item.tamanho + "").replace('.', ',')}) ${item.obrigatorio === "sim" ? "NOT NULL " : "NULL "}\n,`);
                }

                if (item.tipo === "integer") {
                    stringQuery = (`${item.nome} INT ${item.obrigatorio === "sim" ? "NOT NULL " : "NULL "}\n, `);
                }

                if (item.tipo === "datetime") {
                    stringQuery = (`${item.nome} DATETIME ${item.obrigatorio === "sim" ? "NOT NULL " : "NULL "}\n, `);
                }

               
                // if(i == estrutura.length - 1) {
                //     stringQuery = stringQuery.substring(0, stringQuery.length - 1);
                // }
                
                stream.write(stringQuery);
            }

            stream.write(`PRIMARY KEY (id));`);

            if (timestamps === "sim") {
                stream.write(`ALTER TABLE tb_${tb} 
                ADD COLUMN createdAt DATETIME NOT NULL,
                ADD COLUMN updatedAt DATETIME NOT NULL;
                `);
            } 

            stream.write(`\n\n/* ALTER TABLE */ \n\n`);

            stream.write(`ALTER TABLE tb_${tb} \n`);
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                
                let stringQuery = '';
                if (item.tipo === "varchar") {
                    stringQuery = (`ADD COLUMN ${item.nome} VARCHAR(${item.tamanho}) ${item.obrigatorio === "sim" ? "NOT NULL " : "NULL "}\n,`);
                }

                if (item.tipo === "decimal") {
                    stringQuery = (`ADD COLUMN ${item.nome} DECIMAL(5,2).replace('.', ',')}) ${item.obrigatorio === "sim" ? "NOT NULL " : "NULL "}\n,`);
                }

                if (item.tipo === "integer") {
                    stringQuery = (`ADD COLUMN ${item.nome} INT ${item.obrigatorio === "sim" ? "NOT NULL " : "NULL "}\n, `);
                }

                if (item.tipo === "datetime") {
                    stringQuery = (`ADD COLUMN ${item.nome} DATETIME ${item.obrigatorio === "sim" ? "NOT NULL " : "NULL "}\n, `);
                }
                
                if(i == estrutura.length - 1) {
                    stringQuery = stringQuery.substring(0, stringQuery.length - 1);
                }

                stream.write(stringQuery);
            }

            //stream.write(`);`);
        });

    }

};