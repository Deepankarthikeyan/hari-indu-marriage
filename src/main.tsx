import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/wedding-experience.css'
import './styles/wx-react-overrides.css'
import './styles/mandap-palace-theme.css'
import './components/ui/AudioToggle.css'
import './components/ui/Lightbox.css'
import './components/sections/GallerySection.css'
import './components/wedding/SectionShell.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
