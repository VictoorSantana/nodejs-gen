fs = require('fs');

module.exports = {

    gerar: function (caminho, nome, estrutura, timestamps = "nao") {


        if (!fs.existsSync(caminho + '/database/queries/')) {
            fs.mkdirSync(caminho + '/database/queries/', { recursive: true });
        }

        var stream = fs.createWriteStream(caminho + `/database/queries/${nome}DumbData.sql`);
        stream.once('open', function (fd) {

            const tb = nome[nome.length - 1] === "s" ? nome : nome + "s";

            for (var j = 0; j < 10; j++) {
                stream.write(`INSERT INTO tb_${tb} ( `);

                for (var i = 0; i < estrutura.length; i++) {
                    const item = estrutura[i];

                    //stream.write(`CREATE TABLE tb_${tb} ( \n`);

                    stringQuery = `${item.nome},`;

                    if (i == estrutura.length - 1) {
                        stringQuery = stringQuery.substring(0, stringQuery.length - 1);
                    }

                    stream.write(stringQuery);
                }

                stream.write(`) VALUES (`);


                for (var i = 0; i < estrutura.length; i++) {
                    const item = estrutura[i];


                    if (item.tipo == 'varchar') {
                        stringQuery = `'lorem ipsum',`;
                    }else if (item.tipo == 'integer') {
                        stringQuery = `1,`;
                    }else if (item.tipo == 'decimal') {
                        stringQuery = `1.00,`;
                    }else if (item.tipo == 'datetime') {
                        stringQuery = `NOW(),`;
                    } else {
                        stringQuery = `'1',`; 
                    }

                    if (i == estrutura.length - 1) {
                        stringQuery = stringQuery.substring(0, stringQuery.length - 1);
                    }

                    stream.write(stringQuery);

                }
                stream.write(`); \n`);
            }






        });


    }

}