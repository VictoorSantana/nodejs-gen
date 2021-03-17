fs = require('fs');

module.exports = {

    gerar: function (caminho, nome, modelagem, modelsFull, joinedItem) {

        let estrutura = modelagem.estrutura;

        if (!fs.existsSync(caminho + `/src/routes/${nome}/`)) {
            fs.mkdirSync(caminho + `/src/routes/${nome}/`, { recursive: true });
        }

        let joinedAlvo = joinedItem[1];
        let joinedChaveAlvo = joinedItem[2];

        let joinedSet = {};


        for (var j = 0; j < modelsFull.length; j++) {
            if (joinedAlvo === modelsFull[j].nome) {
                joinedSet = modelsFull[j];
                break;
            }
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

        // console.log(joinedAlvo);

        var stream = fs.createWriteStream(caminho + `/src/routes/${nome}/${joinedAlvo.toLowerCase()}.resource.jsx`);

        stream.once('open', function (fd) {
            const nameCap = nome.charAt(0).toUpperCase() + nome.slice(1);

            stream.write(`\nimport React, { Component } from 'react';`);
            stream.write(`\nimport axios from '../../service/api';`);
            stream.write(`\nimport _f from '../../utils/filter';`);
            stream.write(`\nimport _a from '../../utils/auth';`);
            stream.write(`\nimport Tabs from 'react-bootstrap/Tabs';`);
            stream.write(`\nimport Tab from 'react-bootstrap/Tab';`);
            stream.write(`\nimport GridViewComponent from '../../components/gridViewComponent/gridViewComponent';`);
            stream.write(`\nimport ApiDropComponent from '../../components/apiDropComponent/apiDropComponent';`);
            stream.write(`\nimport PaginationComponent from '../../components/paginationComponent/paginationComponent';`);
            stream.write(`\n`);
            stream.write(`\nclass ${joinedAlvo}Resource extends Component {`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\tconstructor(props) {`);
            stream.write(`\n\t\tsuper(props);`);
            stream.write(`\n`);
            stream.write(`\n\t\tthis.state = {`);
            stream.write(`\n\t\t\trollSet: [],`);
            stream.write(`\n\t\t\tonLoad: false,`);
            stream.write(`\n\t\t\tpage: [0, 5], //offset, limit`);
            stream.write(`\n\t\t\tcount: 0,`);
            stream.write(`\n\t\t\terror: '',`);
            stream.write(`\n\t\t\tidField: 'new',`);

            for (var i = 0; i < joinedSet.estrutura.length; i++) {
                const item = joinedSet.estrutura[i];
                if (item.join) {
                    if (item.join[0] === '1N') {
                        stream.write(`\n\t\t\t${item.nome}Field: '',`);
                        stream.write(`\n\t\t\t${item.join[1].toLowerCase()}Roll: [],`);
                    } else {
                        stream.write(`\n\t\t\t${item.nome}Field: '',`);
                    }
                } else {
                    stream.write(`\n\t\t\t${item.nome}Field: '',`);
                }
            }

            // stream.write(`\n\t\t\tid_productField: '',`);
            // stream.write(`\n\t\t\tid_fileField: '',`);


            stream.write(`\n\t\t\tdisplay: 'form'`);
            stream.write(`\n\t\t}`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            // stream.write(`\n\tcomponentDidMount() {`);

            stream.write(`\n\t\tcomponentDidMount() {`);
            stream.write(`\n\t\tsetTimeout(function () {`);
            stream.write(`\n\t\tthis.read();`);
            stream.write(`\n\t\t}.bind(this), 150);`);
            stream.write(`\n\t\t}`);

            // stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\tread() {`);
            stream.write(`\n\t\tlet { idField } = this.props;`);
            stream.write(`\n\t\tlet { page } = this.state;`);
            stream.write(`\n`);
            stream.write(`\n\t\tconst headers = {`);
            stream.write(`\n\t\t\tAuthorization: _a.getBearer(),`);
            stream.write(`\n\t\t\toffset: page[0],`);
            stream.write(`\n\t\t\tlimit: page[1]`);
            stream.write(`\n\t\t};`);
            stream.write(`\n`);
            stream.write(`\n\t\taxios`);
            stream.write(`\n\t\t\t.get(_f.assembly('${joinedAlvo}', 'id_product', idField + ''), { headers })`);
            stream.write(`\n\t\t\t.then(response => {`);
            stream.write(`\n\t\t\t\tif (response.data) {`);
            stream.write(`\n\t\t\t\t\t// console.log(response.data.rows);`);
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
            stream.write(`\n\t\t\t\t\terror: 'Falha ao buscar registros...'`);
            stream.write(`\n\t\t\t\t});`);
            stream.write(`\n\t\t\t\tconsole.log(error);`);
            stream.write(`\n\t\t\t});`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\tfixFields(value) {`);
            stream.write(`\n\t\t// console.log(value);`);
            stream.write(`\n\t\tthis.setState({`);
            stream.write(`\n\t\t\tidField: value.id,`);

            for (var i = 0; i < joinedSet.estrutura.length; i++) {
                const item = joinedSet.estrutura[i];

                // stream.write(`\n\t\t\t${item.nome}Field: '',`);

                stream.write(`\n\t\t\t${item.nome}Field: value.${item.nome},`);
            }
            // stream.write(`\n\t\t\tid_productField: value.id_product,`);


            stream.write(`\n\t\t\tdisplay: 'form'`);
            stream.write(`\n\t\t});`);
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
            stream.write(`\n\thandleClear() {`);
            stream.write(`\n\t\tthis.setState({`);
            stream.write(`\n\t\t\tidField: 'new',`);

            for (var i = 0; i < joinedSet.estrutura.length; i++) {
                const item = joinedSet.estrutura[i];
                stream.write(`\n\t\t\t${item.nome}Field: '',`);
            }



            stream.write(`\n\t\t\tdisplay: 'list'`);
            stream.write(`\n\t\t});`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n\thandleRemove() {`);
            stream.write(`\n\t\t// this.setLoading(true);`);
            stream.write(`\n\t\tlet { idField } = this.state;`);
            stream.write(`\n`);
            stream.write(`\n\t\tif (idField == 'new') {`);
            stream.write(`\n\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\terror: 'Você não pode remover registro que não existe!'`);
            stream.write(`\n\t\t\t});`);
            stream.write(`\n\t\t\treturn;`);
            stream.write(`\n\t\t}`);
            stream.write(`\n\t\tconst headers = {`);
            stream.write(`\n\t\t\tAuthorization: _a.getBearer(),`);
            stream.write(`\n\t\t};`);
            stream.write(`\n`);
            stream.write(`\n\t\taxios`);
            stream.write(`\n\t\t\t.delete('${joinedAlvo}/' + idField, { headers })`);
            stream.write(`\n\t\t\t.then(response => {`);
            stream.write(`\n\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\tdisplay: 'list'`);
            stream.write(`\n\t\t\t\t}, this.read);`);
            stream.write(`\n\t\t\t})`);
            stream.write(`\n\t\t\t.catch(error => {`);
            stream.write(`\n\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\terror: 'Falha ao remover registro...'`);
            stream.write(`\n\t\t\t\t});`);
            stream.write(`\n\t\t\t\tconsole.log(error);`);
            stream.write(`\n\t\t\t});`);
            stream.write(`\n\t\t// this.setLoading(false);`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\thandleSave() {`);

            let namesJson = '';
            namesJson += 'idField, '
            for (var i = 0; i < joinedSet.estrutura.length; i++) {
                const item = joinedSet.estrutura[i];
                namesJson += item.nome + 'Field, '
            }

            stream.write(`\n\t\t// this.setState({ onLoad: true });`);
            stream.write(`\n\t\tlet { ${namesJson} } = this.state;`);
            stream.write(`\n\t\tconst headers = {`);
            stream.write(`\n\t\t\tAuthorization: _a.getBearer(),`);
            stream.write(`\n\t\t};`);

            for (var i = 0; i < joinedSet.estrutura.length; i++) {
                const item = joinedSet.estrutura[i];

                stream.write(`\n\t\tif (!_f.isset(${item.nome}Field)) {`);
                stream.write(`\n\t\t\tthis.setState({ error: 'Campo "${item.label ? item.label : item.nome}" não pode ficar vázio!' }); return;`);
                stream.write(`\n\t\t}`);
            }


            stream.write(`\n\t\tconst request = {`);
            for (var i = 0; i < joinedSet.estrutura.length; i++) {
                const item = joinedSet.estrutura[i];

                stream.write(`\n\t\t\t${item.nome}: ${item.nome}Field,`);
                // stream.write(`\n\t\t\tid_file: id_fileField,`);
            }

            stream.write(`\n\t\t};`);
            stream.write(`\n\t\tif (idField === 'new') {`);
            stream.write(`\n\t\t\taxios`);
            stream.write(`\n\t\t\t\t.post('${joinedAlvo}', request, { headers })`);
            stream.write(`\n\t\t\t\t.then(response => {`);
            stream.write(`\n\t\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\t\tdisplay: 'list'`);
            stream.write(`\n\t\t\t\t\t}, this.read);`);
            stream.write(`\n\t\t\t\t})`);
            stream.write(`\n\t\t\t\t.catch(error => {`);
            stream.write(`\n\t\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\t\terror: 'Falha ao adicionar registro...'`);
            stream.write(`\n\t\t\t\t\t});`);
            stream.write(`\n\t\t\t\t});`);
            stream.write(`\n\t\t} else {`);
            stream.write(`\n\t\t\taxios`);
            stream.write(`\n\t\t\t\t.put('${joinedAlvo}/' + idField, request, { headers })`);
            stream.write(`\n\t\t\t\t.then(response => {`);
            stream.write(`\n\t\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\t\tdisplay: 'list'`);
            stream.write(`\n\t\t\t\t\t}, this.read);`);
            stream.write(`\n\t\t\t\t})`);
            stream.write(`\n\t\t\t\t.catch(error => {`);
            stream.write(`\n\t\t\t\t\tthis.setState({`);
            stream.write(`\n\t\t\t\t\t\terror: 'Falha ao atualizar registro...'`);
            stream.write(`\n\t\t\t\t\t});`);
            stream.write(`\n\t\t\t\t});`);
            stream.write(`\n\t\t}`);
            stream.write(`\n\t\t// this.setState({ onLoad: false });`);
            stream.write(`\n\t}`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n\trender() {`);
            stream.write(`\n\t\tlet {count, page} = this.state;`);
            stream.write(`\n\t\treturn (`);
            stream.write(`\n\t\t\t<div className="row">`);
            stream.write(`\n\t\t\t\t<div className="col-md-12">`);
            stream.write(`\n`);
            stream.write(`\n\t\t\t\t\t{`);
            stream.write(`\n\t\t\t\t\t\tthis.state.error ? (`);
            stream.write(`\n\t\t\t\t\t\t\t<div className="w-100 cursor-pointer text-center bg-danger text-white p-1" onClick={() => this.setState({ error: '' })}>`);
            stream.write(`\n\t\t\t\t\t\t\t\t<h5> Clique para fechar! </h5>`);
            stream.write(`\n\t\t\t\t\t\t\t\t<p>{this.state.error}</p>`);
            stream.write(`\n\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t) : (`);
            stream.write(`\n\t\t\t\t\t\t\t<Tabs activeKey={this.state.display} onSelect={(eventKey) => this.setState({ display: eventKey })}>`);
            stream.write(`\n\t\t\t\t\t\t\t\t<Tab eventKey="list" title="Listagem">`);
            stream.write(`\n`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t<div className="row">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t<div className="col-md-12">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t<GridViewComponent`);

            let arraySetWId = [];
            let arraySetWIdLabel = [];
            let arraySetWIdSubTipo = [];
            let arraySetJoins = [];

            arraySetWId.push('id');
            arraySetWIdLabel.push('Id');
            arraySetWIdSubTipo.push('');
            arraySetJoins.push([]);

            for (var i = 0; i < joinedSet.estrutura.length; i++) {
                const item = joinedSet.estrutura[i];

                if (joinedChaveAlvo != item.nome) {
                    arraySetWId.push(item.nome);
                    arraySetWIdLabel.push(item.label ? item.label : item.nome);

                    if (item.subtipo) {
                        arraySetWIdSubTipo.push(item.subtipo);
                    } else {
                        arraySetWIdSubTipo.push('');
                    }

                    if (item.join) {
                        arraySetJoins.push(item.join);
                    } else {
                        arraySetJoins.push([]);
                    }
                }

            }


            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\t// Removido o chave do mesmo, porque não faz sentido aparecer duas vezes`);
            // stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\theader={["Id", "Arquivo"]}`);
            // stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\tattr={["id", "id_file"]}`);
            // stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\ttype={["", "attach"]}`);
            // stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\tjoin={["", ["11", "File", "title", "id_file"]]}`);

            stream.write(`\n\t\t\t\t\t\t\t\t\t\theader={${JSON.stringify(arraySetWIdLabel)}}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tattr={${JSON.stringify(arraySetWId)}}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\ttype={${JSON.stringify(arraySetWIdSubTipo)}}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\tjoin={${JSON.stringify(arraySetJoins)}}`);

            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\treturnable={true}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\treturned={(value) => this.fixFields(value)}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\tset={this.state.rollSet}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t></GridViewComponent>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t<div className="col-md-6 align-self-center">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t<PaginationComponent`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\tpage={page}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\tmove={(page) => this.setState({ page }, this.read)}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\tcount={count}></PaginationComponent>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t<div className="col-md-6 text-right align-self-center">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t<small className="mb-0 h6"> {count} registros no total </small>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n`);
            stream.write(`\n\t\t\t\t\t\t\t\t</Tab>`);
            stream.write(`\n\t\t\t\t\t\t\t\t<Tab eventKey="form" title="Formulário">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t<div className="row">`);

            stream.write(`\n\t\t\t\t\t\t\t\t\t\t<div className="col-md-3">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t<div className="form-group">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\t<label htmlFor="id"> Código </label>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\t<input`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\t\tonChange={this.handleChange}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\t\tvalue={this.state.idField}`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\t\treadOnly`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\t\ttype="text"`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\t\tname="id"`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t\t\tclassName="form-control" />`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t</div>`);

            for (var i = 0; i < joinedSet.estrutura.length; i++) {
                const item = joinedSet.estrutura[i];

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

            stream.write(`\n\t\t\t\t\t\t\t\t\t\t<div className="col-md-12">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t<hr></hr>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t<div className="col-md-3"></div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t<div className="col-md-2">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t<button type="button" className="btn btn-outline-danger btn-block" onClick={() => this.handleRemove()}> Remover </button>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t<div className="col-md-2">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t<button type="button" className="btn btn-outline-secondary btn-block" onClick={() => this.handleClear()}> Cancelar </button>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t<div className="col-md-2">`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t\t<button type="button" className="btn btn-outline-primary btn-block" onClick={() => this.handleSave()}> Adicionar </button>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t\t<div className="col-md-3"></div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t\t</div>`);
            stream.write(`\n\t\t\t\t\t\t\t\t</Tab>`);
            stream.write(`\n\t\t\t\t\t\t\t</Tabs>`);
            stream.write(`\n\t\t\t\t\t\t)`);
            stream.write(`\n\t\t\t\t\t}`);
            stream.write(`\n\t\t\t\t</div>`);
            stream.write(`\n\t\t\t</div >`);
            stream.write(`\n\t\t);`);
            stream.write(`\n\t}`);
            stream.write(`\n}`);
            stream.write(`\n`);
            stream.write(`\nexport default ${joinedAlvo}Resource;`);


        });
    }
}