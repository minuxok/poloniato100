import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
]

function LanguageModal({ onSelect }) {
  const { t } = useTranslation()

  return (
    <div
      className="language-modal"
      role="dialog"
      aria-modal="true"
      aria-label={t('choose_lang')}
    >
      <div className="language-modal__panel">
        <h2>{t('choose_lang')}</h2>
        <div className="language-modal__grid">
          {LANGUAGES.map(({ code, flag, label }) => (
            <button
              key={code}
              type="button"
              className="language-modal__btn"
              onClick={() => onSelect(code)}
            >
              <span className="language-modal__flag" aria-hidden="true">
                {flag}
              </span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageModal
