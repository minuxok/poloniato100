import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LanguageModal from './components/LanguageModal'
import Home from './pages/Home'
import ArtworkDetail from './pages/ArtworkDetail'
import i18n from './i18n'
import './App.css'

function App() {
  const [showLanguageModal, setShowLanguageModal] = useState(
    () => !localStorage.getItem('user_lang_selected'),
  )

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
      {showLanguageModal && <LanguageModal onSelect={handleSelectLanguage} />}
    </>
  )
}

export default App
