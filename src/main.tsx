import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/wedding-story.css'
import './components/ui/AudioToggle.css'
import './components/ui/Lightbox.css'
import './components/decor/FallingPetals.css'
import './components/decor/TraditionalEntrance.css'
import './components/art/MuruganVisual.css'
import './components/art/VelMotif.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
