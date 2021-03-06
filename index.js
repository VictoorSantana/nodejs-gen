fs = require('fs');

const control = require('./gerador/control');
const model = require('./gerador/model');
const query = require('./gerador/query');
const route = require('./gerador/route');
const schema = require('./gerador/schema');

const routeRoll = require('./gerador/routeRoll');
const routeForm = require('./gerador/routeForm');
const routeApp = require('./gerador/routeApp');
const menuRoute = require('./gerador/menuRoute');
const modelIndex = require('./gerador/modelIndex');
const resource = require('./gerador/resource');

const dumbData = require('./gerador/dumbData');

const versao = 1.0;

fs.readFile('./corpo.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    const _r = JSON.parse(data);
    const path_project = _r.pasta_projeto
    const path_project_front = _r.front


    for (var i = 0; i < _r.modelagem.length; i++) {

        /* Cuidado com referencia  */
        /* Está passando como referencia  */
        
        const name_project = _r.modelagem[i].nome.toLowerCase();

        if (_r.modelagem[i].render === "sim") {
            control.gerar(path_project, name_project, _r.modelagem[i].estrutura);
            model.gerar(path_project, name_project, _r.modelagem[i].estrutura, _r.modelagem[i].timestamp);
            query.gerar(path_project, name_project, _r.modelagem[i].estrutura, _r.modelagem[i].timestamp);
            route.gerar(path_project, name_project, _r.modelagem[i].estrutura);
            schema.gerar(path_project, name_project, _r.modelagem[i].estrutura);

            routeRoll.gerar(path_project_front, name_project, _r.modelagem[i]);
            routeForm.gerar(path_project_front, name_project, _r.modelagem[i], _r.modelagem);

            if (_r.modelagem[i].joined) {
                for (var j = 0; j < _r.modelagem[i].joined.length; j++) {
                    resource.gerar(path_project_front, name_project, _r.modelagem[i], _r.modelagem, _r.modelagem[i].joined[j]);
                }
            }

            //dumbData.gerar(path_project, name_project, _r.modelagem[i].estrutura);

        }

        console.log('Gerado: ' + _r.modelagem[i].nome);
    }

    console.log('Gerando items finais ... ');
    routeApp.gerar(path_project_front, '', _r.modelagem);
    menuRoute.gerar(path_project_front, '', _r.modelagem);
    modelIndex.gerar(path_project, '', _r.modelagem);


});

