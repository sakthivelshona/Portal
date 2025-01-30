import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="339454556681-kfisns0u2hok4e33ugk02pgjrmt2tlls.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
);
