import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
]

function Header() {
  const { i18n, t } = useTranslation()

  const handleChange = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('user_lang_selected', 'true')
  }

  return (
    <header className="app-header">
      <span className="app-header__title">{t('home_title')}</span>
      <nav className="app-header__langs" aria-label={t('choose_lang')}>
        {LANGUAGES.map(({ code, flag, label }) => (
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
            {flag}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header
