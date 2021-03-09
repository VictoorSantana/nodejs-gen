fs = require('fs');

module.exports = {
    gerar: function (caminho, nome, modelagem) {
        var stream = fs.createWriteStream(caminho + `/database/models/models.js`);
        stream.once('open', function (fd) {
            
            let modelName = '';
            for(var i = 0; i < modelagem.length; i++) {

                stream.write(`const ${modelagem[i].nome}Model = require('./${modelagem[i].nome.toLowerCase()}.model'); \n`);                
                modelName += `${modelagem[i].nome}Model, `;
            }   
            stream.write(`\n`);


            for(var i = 0; i < modelagem.length; i++) {
                let estrutura = modelagem[i].estrutura;
                for(var j = 0; j < estrutura.length; j++) {
                    const item = estrutura[j];
                    //console.log(item.nome);
                    if(item.join) {
                        if(item.join[0] === '11') {
                            stream.write(`${modelagem[i].nome}Model.belongsTo(${item.join[1]}Model, { as: '${item.join[1]}', foreignKey: '${item.nome}', allowNull: true });\n`);
                            //stream.write(`\n`);
                        }   
                    }
                }
            }

            stream.write(`\n`);

            stream.write(`module.exports = { ${modelName} }; `);           

        });
    }
}