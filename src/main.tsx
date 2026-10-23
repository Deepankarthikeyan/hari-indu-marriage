import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/wedding-palette.css'
import './styles/curtain-invitation.css'
import './styles/invite-3d.css'
import './styles/wedding-sections.css'
import './components/ui/AudioToggle.css'
import './components/ui/Lightbox.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
