fs = require('fs');

module.exports = {

    gerar: function (caminho, nome, modelagem, modelsFull) {

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
            stream.write(`\nimport GridViewComponent from '../../components/gridViewComponent/gridViewComponent';`);
            stream.write(`\nimport AttachComponent from '../../components/attachComponent/attachComponent';`);
            stream.write(`\nimport ComboComponent from '../../components/comboComponent/comboComponent';`);




            if (modelagem.joined) {
                let joined = modelagem.joined;
                for (var i = 0; i < joined.length; i++) {
                    let joinedName = joined[i][1];
                    stream.write(`\nimport ${joinedName}Resource from './${joinedName.toLowerCase()}.resource';`);
                }
            }
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
                if (item.join) {
                    if (item.join[0] === '1N') {
                        stream.write(`\n\t\t\t${item.nome}Field: '',`);
                        let keyRoll = item.join[4] ? item.join[4] : item.join[1];
                        stream.write(`\n\t\t\t${keyRoll.toLowerCase()}Roll: [],`);
                    } else {
                        stream.write(`\n\t\t\t${item.nome}Field: '',`);
                    }
                } else {
                    if (item.tipo == "integer" || item.tipo == "decimal") {
                        stream.write(`\n\t\t\t${item.nome}Field: 0,`);
                    } else if (item.tipo == "file") {
                        stream.write(`\n\t\t\t${item.nome}Field: {},`);
                    } else {
                        stream.write(`\n\t\t\t${item.nome}Field: '',`);
                    }
                }
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
                if (item.join) {
                    if (item.join[0] === '1N') {
                        let keyRoll = item.join[4] ? item.join[4] : item.join[1];
                        stream.write(`\n\t\t\t${keyRoll.toLowerCase()}Roll:  response.data[0] ? response.data[0].${keyRoll} : [],`);
                        stream.write(`\n\t\t\t\t\t\t${item.nome}Field: response.data[0].${item.nome},`);
                    } else {
                        stream.write(`\n\t\t\t\t\t\t${item.nome}Field: response.data[0].${item.nome},`);
                    }
                } else {
                    stream.write(`\n\t\t\t\t\t\t${item.nome}Field: response.data[0].${item.nome},`);
                }
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
            namesJson += 'idField,';
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                namesJson += item.nome + 'Field, '
            }
            // console.log("CARAHO --->", namesJson);
            stream.write(`\n\t\tlet { ${namesJson} } = this.state;`);


            let temFileTipo = false;
            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];
                if (item.obrigatorio === 'sim') {
                    if (item.tipo === "file") {
                        temFileTipo = true;
                        stream.write(`\nif (!${item.nome}Field[0]) { this.setState({ error: _e.generic('Erro de validação', 'warning', 'Campo "${item.label ? item.label : item.nome}" não pode ficar vázio!') }); return; }`);
                    } else {
                        stream.write(`\n\t\tif(!_f.isset(${item.nome}Field)) { this.setState({error: _e.generic('Erro de validação', 'warning', 'Campo "${item.label ? item.label : item.nome}" não pode ficar vázio!') }); return; }`);
                    }
                }
            }

            if (temFileTipo) {
                // let namesJson = '';
                // namesJson += 'idField, ';
                // for (var i = 0; i < estrutura.length; i++) {
                //     const item = estrutura[i];
                //     namesJson += item.nome + 'Field, \n'
                // }                
                // stream.write(`\n\t\tlet { ${namesJson} } = this.state;`);

                stream.write(`\nlet formData = new FormData();`);
                stream.write(`\n`);

                for (var i = 0; i < estrutura.length; i++) {
                    const item = estrutura[i];
                    if (item.tipo === "decimal") {
                        // stream.write(`\n\t\t\t ${item.nome}:  _f.toDecimal(${item.nome}Field),`);
                        stream.write(`\nformData.append("${item.nome}", _f.toDecimal(${item.nome}Field);`);
                    } else if (item.tipo === "file") {
                        stream.write(`\nformData.append("${item.nome}", ${item.nome}Field[0]);`);
                    }
                    else {
                        // stream.write(`\n\t\t\t ${item.nome}:  ${item.nome}Field,`);
                        stream.write(`\nformData.append("${item.nome}", ${item.nome}Field);`);
                    }
                }
                // stream.write(`\nformData.append("filetarget", filetarget[0]);`);
                // stream.write(`\nformData.append("title", titleField);`);
                // stream.write(`\nformData.append("credit", creditField);`);
                // stream.write(`\nformData.append("hash", hashField);`);
                // stream.write(`\nformData.append("type", typeField);`);
                // stream.write(`\nformData.append("id_folder", id_folderField);`);

                stream.write(`\n`);

                stream.write(`\nconst headers = {`);
                stream.write(`\n\tAuthorization: _a.getBearer(),`);
                stream.write(`\n\t"Content-Type": 'multipart/form-data; boundary=' + formData._boundary`);
                stream.write(`\n};`);
                stream.write(`\n`);
                stream.write(`\n\tif (idField === 'new') {`);
                stream.write(`\naxios.post("file", formData, {`);
                stream.write(`\n\theaders`);
                stream.write(`\n}).then(response => {`);
                stream.write(`\n\tthis.setState({`);
                stream.write(`\n\t\tonLoad: false,`);
                stream.write(`\n\t\terror: _e.setOn(response)`);
                stream.write(`\n\t}, () => {`);
                stream.write(`\n\t\tif (response.data) {`);
                stream.write(`\n\t\t\tif (response.data.id) {`);
                stream.write(`\n\t\t\t\tthis.props.history.push('/${nome}-form/' + response.data.id);`);
                stream.write(`\n\t\t\t}`);
                stream.write(`\n\t\t}`);
                stream.write(`\n\t});`);
                stream.write(`\n})`);
                stream.write(`\n\t.catch(error => {`);
                stream.write(`\n\t\tconsole.log(error.request);`);
                stream.write(`\n\t\tthis.setState({`);
                stream.write(`\n\t\t\tonLoad: false,`);
                stream.write(`\n\t\t\terror: _e.setOn(error)`);
                stream.write(`\n\t\t})`);
                stream.write(`\n\t});`);
                stream.write(`\n`);
                stream.write(`\n\t} else {`);
                stream.write(`\n\tthis.setState({ `);
                stream.write(`\n\t\terror: _e.generic('Sinto muito!', 'warning', 'Atualmente, não é possível atualizar um campo de arquivo em upload!') `);
                stream.write(`\n\t	});`);
                stream.write(`\n\treturn;`);
                stream.write(`\n\t}`);
                stream.write(`\n}`);

            } else {

                stream.write(`\n\t\tconst headers = {`);
                stream.write(`\n\t\t\tAuthorization: _a.getBearer(),`);
                stream.write(`\n\t\t};`);

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

                // stream.write(`\n\t\t\t\t\tthis.setState({`);
                // stream.write(`\n\t\t\t\t\t\terror: _e.setOn(response)`);
                // stream.write(`\n\t\t\t\t\t});`);
                // stream.write(`\n\t\t\t\t\tthis.props.history.push('/${nome}-roll');`);

                stream.write(`\n\t\t\t\t\tthis.setState({`);
                stream.write(`\n\t\t\t\t\terror: _e.setOn(response)`);
                stream.write(`\n\t\t\t\t\t}, () => {`);
                stream.write(`\n\t\t\t\t\tif(response.data) {`);
                stream.write(`\n\t\t\t\t\tif(response.data.id) {`);
                stream.write(`\n\t\t\t\t\tthis.props.history.push('/${nome}-form/' + response.data.id);`);
                stream.write(`\n\t\t\t\t\t}`);
                stream.write(`\n\t\t\t\t\t}`);
                stream.write(`\n\t\t\t\t\t});`);

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
            }

            // stream.write(`\n`);
            // stream.write(`\n`);
            // stream.write(`\n\thandleDelete() {`);
            // stream.write(`\n`);
            // stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\trender() {`);
            stream.write(`\n\t\treturn (`);
            stream.write(`\n\t\t\t<NavComponent onLoad={this.onLoad} routeName="Formulário ${modelagem.label ? modelagem.label : nameCap}" error={this.state.error} errorClose={(error) => this.setState({ error })}>`);
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

                    if (item.subtipo === "attach") {
                        stream.write(`\n\t\t\t\t\t\t\t\t<AttachComponent`);
                        stream.write(`\n\t\t\t\t\t\t\t\tvalue={this.state.id_fileField}`);
                        stream.write(`\n\t\t\t\t\t\t\t\tmove={(value) => this.setState({ id_fileField: value })}`);
                        stream.write(`\n\t\t\t\t\t\t\t\tseverity="danger"`);
                        stream.write(`\n\t\t\t\t\t\t\t\tcancel={() => null}></AttachComponent>`);
                    } else {
                        stream.write(`\n\t\t\t\t\t\t\t\t<ApiDropComponent`);
                        if(item.defaultValue) {
                            stream.write(`\n\t\t\t\t\t\t\t\tdefault={${JSON.stringify(item.defaultValue)}}`);
                        }
                        stream.write(`\n\t\t\t\t\t\t\t\tprop={['id', '${item.join[2]}']}`);
                        stream.write(`\n\t\t\t\t\t\t\t\tvalue={this.state.${item.nome}Field}`);
                        stream.write(`\n\t\t\t\t\t\t\t\tmove={(value) => this.setState({ ${item.nome}Field: value })}`);
                        stream.write(`\n\t\t\t\t\t\t\t\tservice={'${item.join[1]}'}`);
                        stream.write(`\n\t\t\t\t\t\t\t\t></ApiDropComponent>`);
                    }
                } else {
                    if (item.tipo === "decimal") {
                        if (item.subtipo === "money") {
                            stream.write(`\n\t\t\t\t\t\t\t\t<div className="input-group mb-3">`);
                            stream.write(`\n\t\t\t\t\t\t\t\t<input`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tonChange={(event) => this.setState({ ${item.nome}Field: _f.decimal(event) })}`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tmaxLength="${Number(item.tamanho) + 3}"`); //virgula e 2 zero após a virgula
                            stream.write(`\n\t\t\t\t\t\t\t\t\tvalue={this.state.${item.nome}Field}`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\ttype="text"`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tname="${item.nome}"`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tclassName="form-control" />`);
                            stream.write(`\n\t\t\t\t\t\t\t\t<div className="input-group-append">`);
                            stream.write(`\n\t\t\t\t\t\t\t\t<span className="input-group-text"><i className="fas fa-dollar-sign"></i></span>`);
                            stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
                            stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
                        } else {
                            stream.write(`\n\t\t\t\t\t\t\t\t<input`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tonChange={(event) => this.setState({ ${item.nome}Field: _f.decimal(event) })}`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tmaxLength="${Number(item.tamanho) + 3}"`); //virgula e 2 zero após a virgula
                            stream.write(`\n\t\t\t\t\t\t\t\t\tvalue={this.state.${item.nome}Field}`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\ttype="text"`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tname="${item.nome}"`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tclassName="form-control" />`);
                        }
                    } else if (item.tipo === "integer") {
                        if (item.subtipo === "amount") {
                            stream.write(`\n\t\t\t\t\t\t\t\t<div className="input-group mb-3">`);
                            stream.write(`\n\t\t\t\t\t\t\t\t<input maxLength="${item.tamanho}" value={this.state.${item.nome}Field} onChange={(event) => this.setState({ ${item.nome}Field: _f.integer(event) })} name="${item.nome}" type="text" className="form-control" placeholder="****"></input>`);
                            stream.write(`\n\t\t\t\t\t\t\t\t<div className="input-group-append">`);
                            stream.write(`\n\t\t\t\t\t\t\t\t<span className="input-group-text"><i className="fas fa-boxes text-secondary"></i></span>`);
                            stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
                            stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
                        } else if (item.subtipo === "static") {
                            let defaultItem = item.default;

                            if (defaultItem.tipo == "dropdown") {
                                stream.write(`\n\t\t\t\t\t\t\t\t<ComboComponent`);
                                stream.write(`\n\t\t\t\t\t\t\t\tallowNull={${item.obrigatorio ? 'false' : 'true'}}`);
                                stream.write(`\n\t\t\t\t\t\t\t\titems={${JSON.stringify(defaultItem.items)}}`);
                                stream.write(`\n\t\t\t\t\t\t\t\tvalue={this.state.${item.nome}Field}`);
                                stream.write(`\n\t\t\t\t\t\t\t\tmove={(value) => this.setState({ ${item.nome}Field: value })}`);
                                stream.write(`\n\t\t\t\t\t\t\t\t></ComboComponent>`);                                
                            }

                        } else {
                            stream.write(`\n\t\t\t\t\t\t\t\t<input`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tonChange={(event) => this.setState({ ${item.nome}Field: _f.integer(event) })}`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tmaxLength="${item.tamanho}"`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tvalue={this.state.${item.nome}Field}`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\ttype="text"`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tname="${item.nome}"`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tclassName="form-control" />`);
                        }

                    } else if (item.tipo === "datetime") {
                        //stream.write(`\n\t\t\t\t\t\t\t\t{`);
                        //stream.write(`\n\t\t\t\t\t\t\t\t\tonChange={this.handleChange}`);
                        //stream.write(`\n\t\t\t\t\t\t\t\t\tthis.state.${item.nome}Field ? (`);
                        stream.write(`\n\t\t\t\t\t\t\t\t\t\t<DatePickComponent value={new Date(this.state.${item.nome}Field)} move={(newValue) => this.setState({ ${item.nome}Field: newValue })}></DatePickComponent>`);
                        //stream.write(`\n\t\t\t\t\t\t\t\t\t) : ('')`);
                        //stream.write(`\n\t\t\t\t\t\t\t\t\t}`);
                    } else if (item.tipo === "file") {

                        // stream.write(`\n\t\t\t\t\t\t\t\t<div className="input-group mb-3">`);
                        // stream.write(`\n\t\t\t\t\t\t\t\t<div className="custom-file">`);
                        // stream.write(`\n\t\t\t\t\t\t\t\t<input`);
                        // stream.write(`\n\t\t\t\t\t\t\t\tonChange={(event) => this.setState({ ${item.nome}Field: event.target.files })}`);
                        // stream.write(`\n\t\t\t\t\t\t\t\t //value={this.state.${item.nome}Field}`);
                        // stream.write(`\n\t\t\t\t\t\t\t\ttype="file" accept="${item.subtipo ? item.subtipo : "image/*"}" className="custom-file-input"></input>`);
                        // stream.write(`\n\t\t\t\t\t\t\t\t<label className="custom-file-label">{ this.state.${item.nome}Field[0] ? this.state.${item.nome}Field[0].name : 'Abra o arquivo...' } </label>`);
                        // stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
                        // stream.write(`\n\t\t\t\t\t\t\t</div>`);

                        stream.write(`\n\t\t\t\t\t\t\t\t{`);
                        stream.write(`\n\t\t\t\t\t\t\t\tthis.state.idField != 'new' ? (`);
                        stream.write(`\n\t\t\t\t\t\t\t\t<button type="button"`);
                        stream.write(`\n\t\t\t\t\t\t\t\tonClick={() => {										`);
                        stream.write(`\n\t\t\t\t\t\t\t\tlet url = localStorage.getItem('hostServer');	`);
                        stream.write(`\n\t\t\t\t\t\t\t\tlet hash = Number(this.state.hashField);											`);
                        stream.write(`\n\t\t\t\t\t\t\t\tlet day = new Date(hash).getUTCDate();												`);
                        stream.write(`\n\t\t\t\t\t\t\t\tlet month = new Date(hash).getMonth() + 1;`);
                        stream.write(`\n\t\t\t\t\t\t\t\tlet year = new Date(hash).getFullYear();												`);
                        stream.write(`\n\t\t\t\t\t\t\t\twindow.location.href =('http://'+url+'/storage/files/images/'+year+'/'+month+'/'+day+'/'+ hash +'.'+this.state.typeField);`);
                        stream.write(`\n\t\t\t\t\t\t\t\t}} className="btn btn-outline-secondary btn-block"> Visualizar </button>`);
                        stream.write(`\n\t\t\t\t\t\t\t\t) : (`);
                        stream.write(`\n\t\t\t\t\t\t\t\t<div className="input-group mb-3">`);
                        stream.write(`\n\t\t\t\t\t\t\t\t<div className="custom-file">`);
                        stream.write(`\n\t\t\t\t\t\t\t\t<input`);
                        stream.write(`\n\t\t\t\t\t\t\t\tonChange={(event) => this.setState({ ${item.nome}Field: event.target.files })}`);
                        stream.write(`\n\t\t\t\t\t\t\t\t//value={this.state.${item.nome}Field}`);
                        stream.write(`\n\t\t\t\t\t\t\t\ttype="file" accept="image/*" className="custom-file-input"></input>`);
                        stream.write(`\n\t\t\t\t\t\t\t\t<label className="custom-file-label">{this.state.${item.nome}Field[0] ? this.state.${item.nome}Field[0].name : 'Abra o arquivo...'} </label>`);
                        stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
                        stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
                        stream.write(`\n\t\t\t\t\t\t\t\t)`);
                        stream.write(`\n\t\t\t\t\t\t\t\t}`);


                    } else if (item.tipo === "varchar") {
                        if (item.subtipo === "password") {
                            stream.write(`\n\t\t\t\t\t\t\t\t<div className="input-group mb-3">`);
                            stream.write(`\n\t\t\t\t\t\t\t\t<input maxLength="${item.tamanho}" value={this.state.${item.nome}Field} onChange={this.handleChange} name="${item.nome}" type="password" className="form-control" placeholder="****"></input>`);
                            stream.write(`\n\t\t\t\t\t\t\t\t<div className="input-group-append">`);
                            stream.write(`\n\t\t\t\t\t\t\t\t<span className="input-group-text"><i className="fas fa-lock"></i></span>`);
                            stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
                            stream.write(`\n\t\t\t\t\t\t\t\t</div>`);
                        } else {
                            stream.write(`\n\t\t\t\t\t\t\t\t<input`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tonChange={this.handleChange}`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tmaxLength="${item.tamanho}"`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tvalue={this.state.${item.nome}Field}`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\ttype="text"`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tname="${item.nome}"`);
                            stream.write(`\n\t\t\t\t\t\t\t\t\tclassName="form-control" />`);
                        }
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

            for (var i = 0; i < estrutura.length; i++) {
                const item = estrutura[i];

                if (item.join) {
                    if (item.join[0] === '1N') {
                        //console.log('debug 00 ' + JSON.stringify(modelagem));
                        for (var j = 0; j < modelsFull.length; j++) {

                            const estrModel = modelsFull[j];

                            // console.log('debug 01 ' + modelsFull[0]);
                            // console.log('debug 02 ' + item.join[1]);
                            // console.log('debug 01 ', estrModel);

                            if (item.join[1] === estrModel.nome) {

                                // console.log('debug 01 ' + estrModel.nome);
                                // console.log('debug 02 ' + item.join[1]);

                                stream.write(`\n\t\t\t\t<PanelComponent name="${item.join[1]} Listagem">`);
                                stream.write(`\n\t\t\t\t<div className="row">`);
                                stream.write(`\n\t\t\t\t<div className="col-md-12">`);
                                stream.write(`\n\t\t\t\t<GridViewComponent`);

                                let modelEstrutura = estrModel.estrutura;
                                let header = [];
                                let attr = [];
                                let join = [];
                                let type = [];

                                type.push('');
                                join.push('');
                                attr.push('id');
                                header.push('Id');

                                for (var k = 0; k < modelEstrutura.length; k++) {
                                    header.push(modelEstrutura[k].label ? modelEstrutura[k].label : modelEstrutura[k].nome);
                                    attr.push(modelEstrutura[k].nome);

                                    if (modelEstrutura[k].join) {
                                        join.push(modelEstrutura[k].join);
                                    } else {
                                        join.push("");
                                    }

                                    if (modelEstrutura[k].subtipo) {
                                        type.push(modelEstrutura[k].subtipo);
                                    } else {
                                        type.push("");
                                    }


                                }

                                stream.write(`\n\t\t\t\theader={${JSON.stringify(header)}}`);
                                stream.write(`\n\t\t\t\tattr={${JSON.stringify(attr)}}`);
                                stream.write(`\n\t\t\t\ttype={${JSON.stringify(type)}}`);
                                stream.write(`\n\t\t\t\tjoin={${JSON.stringify(join)}}`);
                                stream.write(`\n\t\t\t\tset={this.state.${item.join[4] ? item.join[4].toLowerCase() : estrModel.nome.toLowerCase()}Roll}`);
                                stream.write(`\n\t\t\t\t></GridViewComponent>`);
                                stream.write(`\n\t\t\t\t</div>`);
                                stream.write(`\n\t\t\t\t</div>`);
                                stream.write(`\n\t\t\t\t</PanelComponent>`);

                                break
                            }
                        }
                    }
                }
            }


            if (modelagem.joined) {
                let joined = modelagem.joined;

                for (var i = 0; i < joined.length; i++) {
                    let joinedName = joined[i][1];

                    for (var j = 0; j < modelsFull.length; j++) {
                        if (joinedName === modelsFull[j].nome) {

                            stream.write(`\n\t\t\t\t\t\t\t\t<PanelComponent name="${modelsFull[j].label ? modelsFull[j].label : modelsFull[j].nome}">`);
                            stream.write(`\n\t\t\t\t\t\t\t\t{`);
                            stream.write(`\n\t\t\t\t\t\t\t\tthis.state.idField ? (`);
                            stream.write(`\n\t\t\t\t\t\t\t\t<${joinedName}Resource`);
                            stream.write(`\n\t\t\t\t\t\t\t\tidField={this.state.idField}`);
                            stream.write(`\n\t\t\t\t\t\t\t\t></${joinedName}Resource>`);
                            stream.write(`\n\t\t\t\t\t\t\t\t) : (`);
                            stream.write(`\n\t\t\t\t\t\t\t\t<h4 className="text-danger text-center py-2"> Não foi possível carregar registros ... </h4>`);
                            stream.write(`\n\t\t\t\t\t\t\t\t)`);
                            stream.write(`\n\t\t\t\t\t\t\t\t}`);
                            stream.write(`\n\t\t\t\t\t\t\t\t</PanelComponent>`);

                            break;
                        }
                    }
                }
            }


            stream.write(`\n\t\t\t</NavComponent>`);
            stream.write(`\n\t\t);`);
            stream.write(`\n\t}`);
            stream.write(`\n}`);
            stream.write(`\n`);
            stream.write(`\nexport default ${nameCap}FormRoute;`);


        });
    }
}