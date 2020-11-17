import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Configuration } from 'react-md'
ReactDOM.render(
  <Configuration>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Configuration>,
  document.getElementById('root')
)
