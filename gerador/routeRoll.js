fs = require('fs');

module.exports = {

    gerar: function (caminho, nome, modelagem) {        

        let estrutura = modelagem.estrutura;

        if (!fs.existsSync(caminho + `/src/routes/${nome}/`)) {
            fs.mkdirSync(caminho + `/src/routes/${nome}/`, { recursive: true });
        }

        // let codeString = '';
        // if (fs.existsSync(caminho + `/src/routes/${nome}/${nome}Roll.route.js`)) {
        //     const data = fs.readFileSync(caminho + `/src/routes/${nome}/${nome}Roll.route.js`, 'utf8');

        //     let codigoCustom = '';
        //     if (data.includes("/*custom*/")) {
        //         codigoCustom = data.split('/*custom*/');
        //         codeString = codigoCustom[1];
        //     }
        // }


        var stream = fs.createWriteStream(caminho + `/src/routes/${nome}/${nome}Roll.route.jsx`);
        stream.once('open', function (fd) {
            const nameCap = nome.charAt(0).toUpperCase() + nome.slice(1);

            stream.write(`import React, { Component } from 'react';`);
            stream.write(`\nimport DropdownButton from 'react-bootstrap/DropdownButton';`);
            stream.write(`\nimport Dropdown from 'react-bootstrap/Dropdown';`);
            stream.write(`\nimport NavComponent from '../../components/navComponent/navComponent';`);
            stream.write(`\nimport PanelComponent from '../../components/panelComponent/panelComponent';`);
            stream.write(`\nimport _a from '../../utils/auth';`);
            stream.write(`\nimport _e from '../../utils/error';`);
            stream.write(`\nimport _f from '../../utils/filter';`);
            stream.write(`\nimport axios from '../../service/api';`);
            stream.write(`\nimport PaginationComponent from '../../components/paginationComponent/paginationComponent';`);
            stream.write(`\nimport GridComponent from '../../components/gridComponent/gridComponent';`);
            stream.write(`\nimport FilterComponent from '../../components/filterComponent/filterComponent';`);
            stream.write(`\nimport { Link } from 'react-router-dom';`);
            stream.write(`\nimport ConfirmComponent from '../../components/confirmComponent/confirmComponent';`);
            stream.write(`\n`);
            stream.write(`\nclass ${nameCap}RollRoute extends Component {`);
            stream.write(`\n`);
            stream.write(`\n\tconstructor(props) {`);
            stream.write(`\n\t\tsuper(props);`);
            stream.write(`\n\t\tthis.state = {`);
            stream.write(`\n\t\t\terror: {},`);
            stream.write(`\n\t\t\trollSet: [],`);
            stream.write(`\n\t\t\tcount: 0,`);
            stream.write(`\n\t\t\tpage: [0, 5], //offset, limit`);
            stream.write(`\n\t\t\tsort: ['asc', 'id'], //sort, prop`);
            stream.write(`\n\t\t\tfilterBy: '',`);
            stream.write(`\n\t\t\tfilterValue: '',`);
            stream.write(`\n\t\t\tonLoad: false,`);
            stream.write(`\n\t\t\tkey: -1,`);
            stream.write(`\n\t\t\tdisplayConfirm: false`);
            stream.write(`\n\t\t}`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n\tcomponentDidMount = () => {`);
            stream.write(`\n\t\tthis.loadRoll();`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n\tsetLoading(flag) {`);
            stream.write(`\n\t\tthis.setState({ onLoad: flag });`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n\tloadRoll = () => {`);
            stream.write(`\n\t\tconsole.time();`);
            stream.write(`\n\t\tthis.setLoading(true);`);
            stream.write(`\n`);
            stream.write(`\n\t\tlet { page, sort, filterValue, filterBy } = this.state;`);
            stream.write(`\n`);
            stream.write(`\n\t\tconst headers = {`);
            stream.write(`\n\t\t\tAuthorization: _a.getBearer(),`);
            stream.write(`\n\t\t\toffset: page[0],`);
            stream.write(`\n\t\t\tlimit: page[1],`);
            stream.write(`\n\t\t\tsorted: sort[0],`);
            stream.write(`\n\t\t\tattr: sort[1]`);
            stream.write(`\n\t\t};`);
            stream.write(`\n\t\taxios`);
            stream.write(`\n\t\t\t.get(_f.assembly('${nome}', filterBy, filterValue), { headers })`);
            stream.write(`\n\t\t\t.then(response => {`);
            stream.write(`\n\t\t\t\tif (response.data) {`);
            stream.write(`\n\t\t\t\t\tif (response.data.count > 0) {`);
            stream.write(`\n\t\t\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\t\t\trollSet: response.data.rows,`);
            stream.write(`\n\t\t\t\t\t\t\tcount: response.data.count`);
            stream.write(`\n\t\t\t\t\t\t});`);
            stream.write(`\n\t\t\t\t\t} else {`);
            stream.write(`\n\t\t\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\t\t\trollSet: [],`);
            stream.write(`\n\t\t\t\t\t\t\tcount: 0`);
            stream.write(`\n\t\t\t\t\t\t});`);
            stream.write(`\n\t\t\t\t\t}`);
            stream.write(`\n\t\t\t\t}`);
            stream.write(`\n\t\t\t})`);
            stream.write(`\n\t\t\t.catch(error => {`);
            stream.write(`\n\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\terror: _e.setOn(error)`);
            stream.write(`\n\t\t\t\t})`);
            stream.write(`\n\t\t\t});`);
            stream.write(`\n`);
            stream.write(`\n\t\tthis.setLoading(false);`);
            stream.write(`\n\t\tconsole.timeEnd();`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\thandleRemove() {`);
            stream.write(`\n\t\tthis.setLoading(true);`);
            stream.write(`\n\t\tlet { key } = this.state;`);
            stream.write(`\n\t\tconst headers = {`);
            stream.write(`\n\t\t\tAuthorization: _a.getBearer(),`);
            stream.write(`\n\t\t};`);
            stream.write(`\n`);
            stream.write(`\n\t\taxios`);
            stream.write(`\n\t\t\t.delete('${nome}/' + key, { headers })`);
            stream.write(`\n\t\t\t.then(response => {`);
            stream.write(`\n\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\terror: _e.setOn(response),`);
            stream.write(`\n\t\t\t\t\tdisplayConfirm: false`);
            stream.write(`\n\t\t\t\t}, this.loadRoll);`);
            stream.write(`\n\t\t\t})`);
            stream.write(`\n\t\t\t.catch(error => {`);
            stream.write(`\n\t\t\t\tconsole.log(error.request);`);
            stream.write(`\n\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\terror: _e.setOn(error),`);
            stream.write(`\n\t\t\t\t\tdisplayConfirm: false`);
            stream.write(`\n\t\t\t\t})`);
            stream.write(`\n\t\t\t});`);
            stream.write(`\n\t\tthis.setLoading(false);`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\trender() {`);
            stream.write(`\n\t\tlet { rollSet, count, page, sort, onLoad, key, displayConfirm } = this.state;`);
            stream.write(`\n`);
            stream.write(`\n\t\treturn (`);
            stream.write(`\n\t\t\t<NavComponent`);
            stream.write(`\n\t\t\t\tonLoad={onLoad}`);
            stream.write(`\n\t\t\t\trouteName="Listagem ${modelagem.label ? modelagem.label : nameCap}"`);
            stream.write(`\n\t\t\t\terror={this.state.error} errorClose={(error) => this.setState({ error })}>`);
            stream.write(`\n\t\t\t\t<PanelComponent name="Tabela">`);
            stream.write(`\n`);
            stream.write(`\n\t\t\t\t\t{`);
            stream.write(`\n\t\t\t\t\t\tdisplayConfirm ? (`);
            stream.write(`\n\t\t\t\t\t\t\t<ConfirmComponent`);
            stream.write(`\n\t\t\t\t\t\t\t\ttitle="Deseja deletar o registro selecionado?"`);
            stream.write(`\n\t\t\t\t\t\t\t\tseverity="danger"`);
            stream.write(`\n\t\t\t\t\t\t\t\tcancel={() => this.setState({ displayConfirm: false })}`);
            stream.write(`\n\t\t\t\t\t\t\t\tmove={() => this.handleRemove()}`);
            stream.write(`\n\t\t\t\t\t\t\t></ConfirmComponent>`);
            stream.write(`\n\t\t\t\t\t\t) : ('')`);
            stream.write(`\n\t\t\t\t\t}`);
            stream.write(`\n\t\t\t\t\t<div className="row">`);
            stream.write(`\n\t\t\t\t\t\t<div className="col-md-3 align-self-end">`);
            stream.write(`\n\t\t\t\t\t\t\t<div className="form-group">`);
            stream.write(`\n\t\t\t\t\t\t\t\t<FilterComponent`);

            let arraySet = [];
            let arraySetLabel = [];
            //arraySet.push('id');
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                
                if(item.props) {
                    if(item.props[0] == "filtravel") {
                        arraySet.push(item.nome);
                        arraySetLabel.push(item.label ? item.label.toLowerCase() : item.nome.toLowerCase())
                    }                
                }                
            }

            stream.write(`\n\t\t\t\t\t\t\t\t\tfilterByLabel={${JSON.stringify(arraySetLabel)}}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\tfilterByValue={${JSON.stringify(arraySet)}}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\tmove={(filterBy, filterValue) => this.setState({ filterBy, filterValue }, this.loadRoll)}`);
            stream.write(`\n\t\t\t\t\t\t\t\t></FilterComponent>`);
            stream.write(`\n\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t<div className="col-md-6"></div>`);
            stream.write(`\n\t\t\t\t\t\t<div className="col-md-3 align-self-end">`);
            stream.write(`\n\t\t\t\t\t\t\t<div className="form-group text-right">`);
            stream.write(`\n\t\t\t\t\t\t\t\t<DropdownButton drop="left" id="optionButton" variant="light" title="Mais opções">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t<Link className="dropdown-item" to="${nome}-form/new">Novo</Link>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t<button className="dropdown-item" disabled={key === -1} onClick={() => this.props.history.push('${nome}-form/' + key)} type="button"> Editar </button>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t<button className="dropdown-item" disabled={key === -1} onClick={() => this.setState({ displayConfirm: true })} type="button"> Remover </button>`);
            stream.write(`\n\t\t\t\t\t\t\t\t</DropdownButton>`);
            stream.write(`\n\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t{`);
            stream.write(`\n\t\t\t\t\t\tcount > 0 ? (`);
            stream.write(`\n\t\t\t\t\t\t\t<div className="row">`);
            stream.write(`\n\t\t\t\t\t\t\t\t<div className="col-md-12">`);

            let arraySetWId = [];
            let arraySetWIdLabel = [];
            let arraySetWIdSubTipo = [];
            let arraySetJoins = [];

            arraySetWId.push('id');
            arraySetWIdLabel.push('Id');
            arraySetWIdSubTipo.push(''); 
            arraySetJoins.push([]);
            
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];                
                arraySetWId.push(item.nome);
                arraySetWIdLabel.push(item.label ? item.label : item.nome);

                if(item.subtipo) {
                    arraySetWIdSubTipo.push(item.subtipo);
                } else {
                    arraySetWIdSubTipo.push('');
                }

                if(item.join) {
                    arraySetJoins.push(item.join);
                } else {
                    arraySetJoins.push([]);
                }
            }
            //join={[[],[ "11", "User", "name" ],[]]}

            stream.write(`\n\t\t\t\t\t\t\t\t\t<GridComponent`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\theader={${JSON.stringify(arraySetWIdLabel)}}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tattr={${JSON.stringify(arraySetWId)}}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\ttype={${JSON.stringify(arraySetWIdSubTipo)}}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tjoin={${JSON.stringify(arraySetJoins)}}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tset={rollSet}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tsort={sort}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tsetSort={(sort) => this.setState({ sort }, this.loadRoll)}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tonSelect={(key) => this.setState({ key })}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tselected={key}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t></GridComponent>`);
            stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t<div className="col-md-6 align-self-center">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t<PaginationComponent`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tpage={page}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tmove={(page) => this.setState({ page }, this.loadRoll)}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tcount={count}></PaginationComponent>`);
            stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t<div className="col-md-6 text-right align-self-center">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t<small className="mb-0 h6"> {count} registros no total </small>`);
            stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t) : (`);
            stream.write(`\n\t\t\t\t\t\t\t\t<h4 className="text-center text-danger"> Nenhum registro encontrado! </h4>`);
            stream.write(`\n\t\t\t\t\t\t\t)`);
            stream.write(`\n\t\t\t\t\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\t\t\t\t</PanelComponent>`);
            stream.write(`\n\t\t\t</NavComponent>`);
            stream.write(`\n\t\t);`);
            stream.write(`\n\t}`);
            stream.write(`\n}`);
            stream.write(`\n`);
            stream.write(`\nexport default ${nameCap}RollRoute;`);

        });
    }
}