import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import opere from '../data/opere.json'
import AudioPlayer from '../components/AudioPlayer'
import Credits from '../components/Credits'
import StarSymbol from '../components/StarSymbol'

function resolveAssetUrl(path) {
  if (!path) return ''
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  return `${cleanBase}${cleanPath}`
}

function Home() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || 'it'
  const introduzione = opere.find((o) => o.id === 0)
  const saluti = opere.find((o) => o.id === 11)
  const biografia = opere.find((o) => o.id === 12)
  const opereInMostra = opere.filter((o) => o.id >= 1 && o.id <= 10)

  return (
    <section className="home">
      {/* Brochure Hero Header */}
      <div className="home__hero">
        <div className="home__hero-header">
          <div className="home__hero-title-group">
            <h1>{t('home_title')}</h1>
            <div className="home__hero-motto">{t('home_motto')}</div>
            <div className="home__hero-subtitle">{t('home_subtitle')}</div>
          </div>
          <StarSymbol />
        </div>

        <div className="divider-bar"></div>

        {introduzione && (
          <div className="home__intro">
            <div className="home__intro-text">{introduzione.description[lang]}</div>
            <AudioPlayer src={resolveAssetUrl(introduzione.audio?.[lang])} labelKey="play_intro" />
          </div>
        )}

        {biografia && (
          <div className="home__bio">
            <h2 className="home__section-title">
              <StarSymbol />
              {t('bio_title')}
            </h2>
            <div className="home__bio-text">{biografia.description[lang]}</div>
            <AudioPlayer src={resolveAssetUrl(biografia.audio?.[lang])} labelKey="play_bio" />
          </div>
        )}

        <Credits />
      </div>

      <div className="divider-bar divider-bar--center"></div>

      {/* Artworks List (Opere in Mostra) */}
      <h2 className="home__section-title">
        <StarSymbol />
        {t('opere_in_mostra')}
      </h2>

      <ul className="home__list">
        {opereInMostra.map((opera) => {
          const title = opera.title[lang] ?? opera.title.it
          return (
            <li key={opera.id} className="home__list-item">
              <Link to={`/opera/${opera.id}`} className="home__list-link">
                <div className="home__list-content">
                  <span className="home__list-title">{title}</span>
                  {opera.details && (
                    <span className="home__list-details">{opera.details}</span>
                  )}
                </div>
                <span className="home__list-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

      {saluti && (
        <>
          <div className="divider-bar divider-bar--center"></div>
          <h2 className="home__section-title">
            <StarSymbol />
            {saluti.title[lang] ?? saluti.title.it}
          </h2>
          <div className="home__closing">
            <div className="home__closing-text">{saluti.description[lang]}</div>
            <AudioPlayer src={resolveAssetUrl(saluti.audio?.[lang])} labelKey="play_farewell" />
          </div>
        </>
      )}
    </section>
  )
}

export default Home
