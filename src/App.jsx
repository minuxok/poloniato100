import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LanguageModal from './components/LanguageModal'
import NfcListener from './components/NfcListener'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import Home from './pages/Home'
import ArtworkDetail from './pages/ArtworkDetail'
import i18n from './i18n'
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

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
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
