import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import StarSymbol from './StarSymbol'

const LANGUAGES = [
  { code: 'it', iso: 'IT', label: 'Italiano' },
  { code: 'en', iso: 'EN', label: 'English' },
  { code: 'fr', iso: 'FR', label: 'Français' },
  { code: 'es', iso: 'ES', label: 'Español' },
  { code: 'de', iso: 'DE', label: 'Deutsch' },
]

function Header() {
  const { i18n, t } = useTranslation()

  const handleChange = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('user_lang_selected', 'true')
  }

  return (
    <header className="app-header">
      <Link to="/" className="app-header__brand">
        <StarSymbol size="1.1rem" />
        <span className="app-header__title">{t('home_title')}</span>
      </Link>
      <nav className="app-header__langs" aria-label={t('choose_lang')}>
        {LANGUAGES.map(({ code, iso, label }) => (
          <button
            key={code}
            type="button"
            className={`app-header__lang-btn${
              i18n.resolvedLanguage === code ? ' is-active' : ''
            }`}
            onClick={() => handleChange(code)}
            aria-label={label}
            aria-pressed={i18n.resolvedLanguage === code}
          >
            {iso}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header
