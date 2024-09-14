import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <HelmetProvider>
                <Helmet>
                    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                    <title>{'[my-app]MERN Stack'}</title>
                </Helmet>

                <App />
            </HelmetProvider>
        </BrowserRouter>
    </StrictMode>
)
