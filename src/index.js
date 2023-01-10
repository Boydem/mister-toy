import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { App } from './root-cmp.jsx'
import './assets/css/main.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
