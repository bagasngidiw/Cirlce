import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import rootReducer from './stores/rootReducer'
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
  reducer: rootReducer
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </React.StrictMode>,
  </ChakraProvider>

)
