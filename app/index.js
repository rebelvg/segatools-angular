import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from 'app/pages';

const appElement = document.createElement('div');
appElement.setAttribute('id', 'app');
document.body.appendChild(appElement);

ReactDOM.render(<App />, document.getElementById('app'));
