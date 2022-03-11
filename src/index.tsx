import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

// HMR (работает только в дев режиме)
if (module && module.hot) module.hot.accept()
