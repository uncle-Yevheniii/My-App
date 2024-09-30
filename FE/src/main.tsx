import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import App from './components/App.tsx'
import { store } from './store/store.ts'

import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <HelmetProvider>
                    <Helmet>
                        <title>My App</title>
                    </Helmet>

                    <App />
                </HelmetProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
