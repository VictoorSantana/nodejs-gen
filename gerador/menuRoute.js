fs = require('fs');

module.exports = {

    gerar: function (caminho, nome, modelagem) {


        // if (!fs.existsSync(caminho + `/src/routes/${nome}/`)) {
        //     fs.mkdirSync(caminho + `/src/routes/${nome}/`, { recursive: true });
        // }

        // let codeString = '';
        // if (fs.existsSync(caminho + `/src/routes/${nome}/${nome}Roll.route.js`)) {
        //     const data = fs.readFileSync(caminho + `/src/routes/${nome}/${nome}Roll.route.js`, 'utf8');

        //     let codigoCustom = '';
        //     if (data.includes("/*custom*/")) {
        //         codigoCustom = data.split('/*custom*/');
        //         codeString = codigoCustom[1];
        //     }
        // }


        var stream = fs.createWriteStream(caminho + `/src/utils/menu.js`);
        stream.once('open', function (fd) {
            //const nameCap = nome.charAt(0).toUpperCase() + nome.slice(1);

            stream.write(`\nexport default [`);
            for (var i = 0; i < modelagem.length; i++) {
                const item = modelagem[i];

                stream.write(`\n{`);
                stream.write(`\npath: '/${item.nome.toLowerCase()}-roll',`);
                stream.write(`\ntitle: '${item.label ? item.label : item.nome}',`);
                stream.write(`\nparam: ''`);
                stream.write(`\n},`);
            }

            stream.write(`\n]`);
        });

    }

}