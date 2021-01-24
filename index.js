fs = require('fs');

const control = require('./gerador/control');
const model = require('./gerador/model');
const query = require('./gerador/query');
const route = require('./gerador/route');
const schema = require('./gerador/schema');
const versao = 1.0;

fs.readFile('./corpo.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    const _r = JSON.parse(data);
    const path_project = _r.pasta_projeto
    

    for (var i = 0; i < _r.modelagem.length; i++) {
        const name_project = _r.modelagem[i].nome.toLowerCase();
        
        if (_r.modelagem[i].render === "sim") {
            control.gerar(path_project, name_project, _r.modelagem[i].estrutura);
            model.gerar(path_project, name_project, _r.modelagem[i].estrutura);
            query.gerar(path_project, name_project, _r.modelagem[i].estrutura);
            route.gerar(path_project, name_project, _r.modelagem[i].estrutura);
            schema.gerar(path_project, name_project, _r.modelagem[i].estrutura);
        }

        console.log('Gerado: ' + _r.modelagem[i].nome);
    }

});

