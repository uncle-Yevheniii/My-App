import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import App from './components/App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <HelmetProvider>
                <Helmet>
                    <title>My App</title>
                </Helmet>

                <App />
            </HelmetProvider>
        </BrowserRouter>
    </StrictMode>
)
