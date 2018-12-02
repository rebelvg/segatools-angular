import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import 'semantic-ui-css/semantic.min.css'
import App from 'app/pages'

injectGlobal`#app {height: 100%}`

const appElement = document.createElement('div')
appElement.setAttribute('id', 'app')
document.body.appendChild(appElement)

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)

