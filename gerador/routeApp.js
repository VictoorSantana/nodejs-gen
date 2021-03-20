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


        var stream = fs.createWriteStream(caminho + `/src/App.js`);
        stream.once('open', function (fd) {
            const nameCap = nome.charAt(0).toUpperCase() + nome.slice(1);

            stream.write(`\nimport React from 'react';`);
            stream.write(`\nimport { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";`);
            stream.write(`\n`);
            stream.write(`\n`);
            stream.write(`\n/* Routes */`);
            stream.write(`\nimport LoginRoute from './routes/login.route';`);
            stream.write(`\nimport DebugRoute from './routes/debug.route';`);
            stream.write(`\nimport HomeRoute from './routes/home.route';`);

            //
            //<PrivateRoute path="/debug" component={(props) => <DebugRoute {...props}></DebugRoute>}></PrivateRoute>

            stream.write(`\n`);
            
            for (var i = 0; i < modelagem.length; i++) {
                const item = modelagem[i];                

                //stream.write(`\n\t\t\t${item.nome}Field: '',`);
                stream.write(`\nimport ${item.nome}FormRoute from './routes/${item.nome.toLowerCase()}/${item.nome.toLowerCase()}Form.route.jsx';`);
                stream.write(`\nimport ${item.nome}RollRoute from './routes/${item.nome.toLowerCase()}/${item.nome.toLowerCase()}Roll.route.jsx';`);
                stream.write(`\n`);
            }                        
            stream.write(`\n/*****/`);
            stream.write(`\n`);
            stream.write(`\n/* Helpers */`);
            stream.write(`\nimport Auth from './utils/auth';`);
            stream.write(`\n/*****/`);
            stream.write(`\n`);
            stream.write(`\nconst PrivateRoute = ({ component: Component, ...rest }) => (`);
            stream.write(`\n<Route`);
            stream.write(`\n\t{...rest}`);
            stream.write(`\n\trender={props =>`);
            stream.write(`\n\t  Auth.isValidToken() ? (`);
            stream.write(`\n\t\t<Component {...props} />`);
            stream.write(`\n\t  ) : (`);
            stream.write(`\n\t\t<Redirect to={{ pathname: "/", state: { from: props.location } }} />`);
            stream.write(`\n\t  )`);
            stream.write(`\n\t}`);
            stream.write(`\n/>`);
            stream.write(`\n);`);
            stream.write(`\n`);
            stream.write(`\nconst Routes = () => (`);
            stream.write(`\n<BrowserRouter>`);
            stream.write(`\n\t<Switch>`);
            stream.write(`\n\t  <Route  exact path="/"      component={(props) => <LoginRoute  {...props}></LoginRoute>}></Route>`);        
            stream.write(`\n\t  <PrivateRoute path="/debug" component={(props) => <DebugRoute {...props}></DebugRoute>}></PrivateRoute>`);
            stream.write(`\n\t  <PrivateRoute path="/home" component={(props) => <HomeRoute {...props}></HomeRoute>}></PrivateRoute>`);
            stream.write(`\n`);
            //


            for (var i = 0; i < modelagem.length; i++) {
                const item = modelagem[i];
                //const nameCapItem = item.nome.charAt(0).toUpperCase() + item.nome.slice(1);

                stream.write(`\n\t  <PrivateRoute path="/${item.nome.toLowerCase()}-roll" component={(props) => <${item.nome}RollRoute {...props}></${item.nome}RollRoute>}></PrivateRoute>`);
                stream.write(`\n\t  <PrivateRoute path="/${item.nome.toLowerCase()}-form/:id" component={(props) => <${item.nome}FormRoute {...props}></${item.nome}FormRoute>}></PrivateRoute>`);
                stream.write(`\n`);
                //console.log(item.nome);
            }
            stream.write(`\n\t</Switch>`);
            stream.write(`\n</BrowserRouter>`);
            stream.write(`\n);`);            
            stream.write(`\nexport default Routes; //end`);


        });

    }

}