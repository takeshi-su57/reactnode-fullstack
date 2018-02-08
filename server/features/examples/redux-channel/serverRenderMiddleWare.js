const { createStore } =require( 'redux');
const { reducer } =require( './../src/reducers');
const {Provider} =require( 'react-redux');
const { App } =require( './../src/App');
const { renderToString } =require( 'react-dom/server');
const React =require( 'react');
const template =require( 'lodash/template');
const fs =require( 'fs');

const readModuleFile = (path, callback)=>{
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

const handleRender = (getState) => (req, res)=>{
    let defaultState = getState();
    const store = createStore(reducer,defaultState);

    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const preloadedState = store.getState().toJS();

    readModuleFile('./../public/index.html', (err, index)=>{
        const templated = template(index)({
            html,
            preloadedState:JSON.stringify(preloadedState).replace(/</g, '\\u003c')
        });
        res.send(templated);
    });
};

module.exports = {
    handleRender
}