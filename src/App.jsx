import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LanguageModal from './components/LanguageModal'
import NfcListener from './components/NfcListener'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import ArtworkDetail from './pages/ArtworkDetail'
import i18n from './i18n'
import { prefetchAudioForLanguage } from './utils/prefetchAudio'
import './App.css'

const SUPPORTED_LANGS = ['it', 'en', 'fr', 'es', 'de']

// Un cartellino NFC può forzare la lingua con ?lang=en: in tal caso il
// selettore non deve comparire, la scelta è già "fatta" dal tag.
function initialShowLanguageModal() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl && SUPPORTED_LANGS.includes(fromUrl)) {
    localStorage.setItem('user_lang_selected', 'true')
    return false
  }
  return !localStorage.getItem('user_lang_selected')
}

function App() {
  const [showLanguageModal, setShowLanguageModal] = useState(initialShowLanguageModal)

  const handleSelectLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('user_lang_selected', 'true')
    setShowLanguageModal(false)
  }

  // Appena la lingua è nota, scarica in background tutti gli audio di quella
  // lingua: quando il visitatore tocca un tag NFC l'audio è già in cache,
  // niente attesa di rete davanti all'opera.
  useEffect(() => {
    if (!showLanguageModal) {
      prefetchAudioForLanguage(i18n.resolvedLanguage)
    }
  }, [showLanguageModal])

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/benvenuto" element={<Welcome />} />
          <Route path="/opera/:id" element={<ArtworkDetail />} />
        </Routes>
      </main>
      <NfcListener />
      {showLanguageModal && <LanguageModal onSelect={handleSelectLanguage} />}
      <PWAInstallPrompt disabled={showLanguageModal} />
    </>
  )
}

export default App
