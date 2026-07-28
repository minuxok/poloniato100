import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'it', iso: 'IT', label: 'Italiano' },
  { code: 'en', iso: 'EN', label: 'English' },
  { code: 'fr', iso: 'FR', label: 'Français' },
  { code: 'es', iso: 'ES', label: 'Español' },
  { code: 'de', iso: 'DE', label: 'Deutsch' },
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
          {LANGUAGES.map(({ code, iso, label }) => (
            <button
              key={code}
              type="button"
              className="language-modal__btn"
              onClick={() => onSelect(code)}
            >
              <span className="language-modal__iso" aria-hidden="true">
                {iso}
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
