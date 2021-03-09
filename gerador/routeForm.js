fs = require('fs');

module.exports = {

    gerar: function (caminho, nome, estrutura) {


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


        var stream = fs.createWriteStream(caminho + `/src/routes/${nome}/${nome}Form.route.jsx`);
        stream.once('open', function (fd) {
            const nameCap = nome.charAt(0).toUpperCase() + nome.slice(1);


            stream.write(`import React, { Component } from 'react';`);
            stream.write(`\nimport { Link } from 'react-router-dom';`);
            stream.write(`\nimport NavComponent from '../../components/navComponent/navComponent';`);
            stream.write(`\nimport PanelComponent from '../../components/panelComponent/panelComponent';`);
            stream.write(`\nimport _a from '../../utils/auth';`);
            stream.write(`\nimport _e from '../../utils/error';`);
            stream.write(`\nimport _f from '../../utils/filter';`);
            stream.write(`\nimport DatePickComponent from '../../components/datePickComponent/datePickComponent';`);
            stream.write(`\nimport ApiDropComponent from '../../components/apiDropComponent/apiDropComponent';`);            

            stream.write(`\nimport axios from '../../service/api';`);
            stream.write(`\n`);
            stream.write(`\nclass ${nameCap}FormRoute extends Component {`);
            stream.write(`\n`);
            stream.write(`\n\tconstructor(props) {`);
            stream.write(`\n\t\tsuper(props);`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\t\tthis.state = {`);
            stream.write(`\n\t\t\terror: {},`);
            stream.write(`\n\t\t\tidField: 'new',`);

            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                stream.write(`\n\t\t\t${item.nome}Field: '',`);
            }

            stream.write(`\n\t\t\tonLoad: false,`);
            stream.write(`\n\t\t};`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\tcomponentDidMount() {`);
            stream.write(`\n\t\tthis.read();`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n\thandleChange = (event) => {`);
            stream.write(`\n\t\tconst { value, name } = event.target;`);
            stream.write(`\n\t\tconsole.log(name);`);
            stream.write(`\n\t\tthis.setState({`);
            stream.write(`\n\t\t\t[name + 'Field']: value`);
            stream.write(`\n\t\t});`);
            stream.write(`\n\t};`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\tread = () => {`);
            stream.write(`\n\t\tconst headers = {`);
            stream.write(`\n\t\t\tAuthorization: _a.getBearer(),`);
            stream.write(`\n\t\t};`);
            stream.write(`\n\t\tconst id = isNaN(Number(this.props.match.params.id)) ? 'new' : Number(this.props.match.params.id);`);
            stream.write(`\n\t\taxios`);
            stream.write(`\n\t\t\t.get('${nome}/' + id, { headers })`);
            stream.write(`\n\t\t\t.then(response => {`);
            stream.write(`\n\t\t\t\tif (response.data) {`);
            stream.write(`\n\t\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\t\tidField: response.data[0].id,`);
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                stream.write(`\n\t\t\t\t\t\t${item.nome}Field: response.data[0].${item.nome},`);
            }
            stream.write(`\n\t\t\t\t\t});`);
            stream.write(`\n\t\t\t\t}`);
            stream.write(`\n\t\t\t})`);
            stream.write(`\n\t\t\t.catch(error => {`);
            stream.write(`\n\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\terror: _e.setOn(error)`);
            stream.write(`\n\t\t\t\t})`);
            stream.write(`\n\t\t\t});`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\thandleSave() {`);
            stream.write(`\n\t\tthis.setState({ onLoad: true });`);

            let namesJson = '';
            namesJson += 'idField, ';
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                namesJson += item.nome + 'Field, '
            }

            stream.write(`\n\t\tlet { ${namesJson} } = this.state;`);
            stream.write(`\n\t\tconst headers = {`);
            stream.write(`\n\t\t\tAuthorization: _a.getBearer(),`);
            stream.write(`\n\t\t};`);
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];

                if (item.obrigatorio === 'sim') {
                    stream.write(`\n\t\tif(!_f.isset(${item.nome}Field)) { this.setState({error: _e.generic('Erro de validação', 'warning', 'Campo "${item.label ? item.label : item.nome}" não pode ficar vázio!') }); return; }`);
                }

            }
            stream.write(`\n\t\tconst request = {`);
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                if (item.tipo === "decimal") {
                    stream.write(`\n\t\t\t ${item.nome}:  _f.toDecimal(${item.nome}Field),`);
                } else {
                    stream.write(`\n\t\t\t ${item.nome}:  ${item.nome}Field,`);
                }
            }
            stream.write(`\n\t\t};`);
            stream.write(`\n\t\tif (idField === 'new') {`);
            stream.write(`\n\t\t\taxios`);
            stream.write(`\n\t\t\t\t.post('${nome}', request, { headers })`);
            stream.write(`\n\t\t\t\t.then(response => {`);
            stream.write(`\n\t\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\t\terror: _e.setOn(response)`);
            stream.write(`\n\t\t\t\t\t});`);
            stream.write(`\n\t\t\t\t\tthis.props.history.push('/${nome}-roll');`);
            stream.write(`\n\t\t\t\t})`);
            stream.write(`\n\t\t\t\t.catch(error => {`);
            stream.write(`\n\t\t\t\t\tconsole.log(error.request);`);
            stream.write(`\n\t\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\t\terror: _e.setOn(error)`);
            stream.write(`\n\t\t\t\t\t})`);
            stream.write(`\n\t\t\t\t});`);
            stream.write(`\n\t\t} else {`);
            stream.write(`\n\t\t\taxios`);
            stream.write(`\n\t\t\t\t.put('${nome}/' + idField, request, { headers })`);
            stream.write(`\n\t\t\t\t.then(response => {`);
            stream.write(`\n\t\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\t\terror: _e.setOn(response)`);
            stream.write(`\n\t\t\t\t\t});`);
            stream.write(`\n\t\t\t\t\tthis.props.history.push('/${nome}-roll');`);
            stream.write(`\n\t\t\t\t})`);
            stream.write(`\n\t\t\t\t.catch(error => {`);
            stream.write(`\n\t\t\t\t\tconsole.log(error.request);`);
            stream.write(`\n\t\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\t\terror: _e.setOn(error)`);
            stream.write(`\n\t\t\t\t\t})`);
            stream.write(`\n\t\t\t\t});`);
            stream.write(`\n\t\t}`);
            stream.write(`\n\t\tthis.setState({ onLoad: false });`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\thandleDelete() {`);
            stream.write(`\n`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\trender() {`);
            stream.write(`\n\t\treturn (`);
            stream.write(`\n\t\t\t<NavComponent onLoad={this.onLoad} routeName="${nameCap}" error={this.state.error} errorClose={(error) => this.setState({ error })}>`);
            stream.write(`\n\t\t\t\t<PanelComponent name="Formulário">`);
            stream.write(`\n\t\t\t\t\t<div className="row">`);

            stream.write(`\n\t\t\t\t\t\t<div className="col-md-3">`);
            stream.write(`\n\t\t\t\t\t\t\t<div className="form-group">`);
            stream.write(`\n\t\t\t\t\t\t\t\t<label htmlFor="id"> Código </label>`);
            stream.write(`\n\t\t\t\t\t\t\t\t<input`);
            stream.write(`\n\t\t\t\t\t\t\t\t\tonChange={this.handleChange}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\tvalue={this.state.idField}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\treadOnly`);
            stream.write(`\n\t\t\t\t\t\t\t\t\ttype="text"`);
            stream.write(`\n\t\t\t\t\t\t\t\t\tname="id"`);
            stream.write(`\n\t\t\t\t\t\t\t\t\tclassName="form-control" />`);
            stream.write(`\n\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t</div>`);

            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                stream.write(`\n\t\t\t\t\t\t<div className="col-md-3">`);
                stream.write(`\n\t\t\t\t\t\t\t<div className="form-group">`);
                stream.write(`\n\t\t\t\t\t\t\t\t<label htmlFor="${item.nome}"> ${item.label ? item.label : item.nome} </label>`);

                if (item.join) {
                    stream.write(`\n\t\t\t\t\t\t\t\t<ApiDropComponent`);
                    stream.write(`\n\t\t\t\t\t\t\t\tprop={['id', '${item.join[2]}']}`);
                    stream.write(`\n\t\t\t\t\t\t\t\tvalue={this.state.${item.nome}Field}`);
                    stream.write(`\n\t\t\t\t\t\t\t\tmove={(value) => this.setState({ ${item.nome}Field: value })}`);
                    stream.write(`\n\t\t\t\t\t\t\t\tservice={'${item.join[1]}'}`);
                    stream.write(`\n\t\t\t\t\t\t\t\t></ApiDropComponent>`);                    
                } else {
                    if (item.tipo === "decimal") {
                        stream.write(`\n\t\t\t\t\t\t\t\t<input`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tonChange={(event) => this.setState({ ${item.nome}Field: _f.decimal(event) })}`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tmaxLength="${Number(item.tamanho) + 3}"`); //virgula e 2 zero após a virgula
                        stream.write(`\n\t\t\t\t\t\t\t\t\tvalue={this.state.${item.nome}Field}`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\ttype="text"`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tname="${item.nome}"`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tclassName="form-control" />`);
                    } else if (item.tipo === "integer") {
                        stream.write(`\n\t\t\t\t\t\t\t\t<input`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tonChange={(event) => this.setState({ ${item.nome}Field: _f.integer(event) })}`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tmaxLength="${item.tamanho}"`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tvalue={this.state.${item.nome}Field}`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\ttype="text"`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tname="${item.nome}"`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tclassName="form-control" />`);
                    } else if (item.tipo === "datetime") {
                        //stream.write(`\n\t\t\t\t\t\t\t\t{`);
                        //stream.write(`\n\t\t\t\t\t\t\t\t\tonChange={this.handleChange}`);
                        //stream.write(`\n\t\t\t\t\t\t\t\t\tthis.state.${item.nome}Field ? (`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\t\t<DatePickComponent value={new Date(this.state.${item.nome}Field)} move={(newValue) => this.setState({ ${item.nome}Field: newValue })}></DatePickComponent>`);
                        //stream.write(`\n\t\t\t\t\t\t\t\t\t) : ('')`);
                        //stream.write(`\n\t\t\t\t\t\t\t\t\t}`);
                    } else {
                        stream.write(`\n\t\t\t\t\t\t\t\t<input`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tonChange={this.handleChange}`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tmaxLength="${item.tamanho}"`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tvalue={this.state.${item.nome}Field}`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\ttype="text"`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tname="${item.nome}"`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\tclassName="form-control" />`);
                    }
                }

                stream.write(`\n\t\t\t\t\t\t\t</div>`);
                stream.write(`\n\t\t\t\t\t\t</div>`);
            }


            // stream.write(`\n\t\t\t\t\t\t<div className="col-md-3">`);
            // stream.write(`\n\t\t\t\t\t\t\t<div className="form-group">`);
            // stream.write(`\n\t\t\t\t\t\t\t\t<label htmlFor="password"> password </label>`);
            // stream.write(`\n\t\t\t\t\t\t\t\t<input`);
            // stream.write(`\n\t\t\t\t\t\t\t\t\tonChange={this.handleChange}`);
            // stream.write(`\n\t\t\t\t\t\t\t\t\tvalue={this.state.passwordField}`);
            // stream.write(`\n\t\t\t\t\t\t\t\t\ttype="text"`);
            // stream.write(`\n\t\t\t\t\t\t\t\t\tname="password"`);
            // stream.write(`\n\t\t\t\t\t\t\t\t\tclassName="form-control" />`);
            // stream.write(`\n\t\t\t\t\t\t\t</div>`);
            // stream.write(`\n\t\t\t\t\t\t</div>`);

            stream.write(`\n\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t<div className="row">`);
            stream.write(`\n\t\t\t\t\t\t<div className="col-md-12"> <hr /> </div>`);
            stream.write(`\n\t\t\t\t\t\t<div className="col-md-4"></div>`);
            stream.write(`\n\t\t\t\t\t\t<div className="col-md-2">`);
            stream.write(`\n\t\t\t\t\t\t\t<div className="form-group">`);
            stream.write(`\n\t\t\t\t\t\t\t\t<Link to="/${nome}-roll" className="btn btn-outline-secondary btn-block"> Cancelar </Link>`);
            stream.write(`\n\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t<div className="col-md-2">`);
            stream.write(`\n\t\t\t\t\t\t\t<div className="form-group">`);
            stream.write(`\n\t\t\t\t\t\t\t\t<button type="button" onClick={() => this.handleSave()} className="btn btn-primary btn-block"> Salvar </button>`);
            stream.write(`\n\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t<div className="col-md-4"></div>`);
            stream.write(`\n\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t</PanelComponent>`);
            stream.write(`\n\t\t\t</NavComponent>`);
            stream.write(`\n\t\t);`);
            stream.write(`\n\t}`);
            stream.write(`\n}`);
            stream.write(`\n`);
            stream.write(`\nexport default ${nameCap}FormRoute;`);


        });
    }
}