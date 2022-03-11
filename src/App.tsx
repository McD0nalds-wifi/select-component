import React from 'react'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './App.module.scss'

/* START - View App additional imports and module code. */
import store from './redux/redux-store'

import { MainApp } from 'components'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <MainApp />
            </Provider>
        </BrowserRouter>
    )
}

export default App
