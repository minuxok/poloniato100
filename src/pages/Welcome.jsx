import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import opere from '../data/opere.json'
import AudioPlayer from '../components/AudioPlayer'

function resolveAssetUrl(path) {
  if (!path) return ''
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  return `${cleanBase}${cleanPath}`
}

function Welcome() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || 'it'
  const introduzione = opere.find((o) => o.id === 0)
  const biografia = opere.find((o) => o.id === 12)

  return (
    <section className="home">
      <div className="home__hero">
        <div className="home__hero-header">
          <div className="home__hero-title-group">
            <h1>{t('home_title')}</h1>
            <div className="home__hero-motto">{t('home_motto')}</div>
            <div className="home__hero-subtitle">{t('home_subtitle')}</div>
          </div>
          <span className="star-symbol" aria-hidden="true">✦</span>
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
            <div className="home__bio-text">{biografia.description[lang]}</div>
            <AudioPlayer src={resolveAssetUrl(biografia.audio?.[lang])} labelKey="play_bio" />
          </div>
        )}

        <div className="home__credits">
          <div><strong>{t('exhibition_curators')}:</strong> {t('volunteers_group')}</div>
          <div><strong>{t('collaboration')}:</strong> {t('tce_dev')}</div>
        </div>
      </div>

      <Link to="/" className="back-link">
        {t('back_home')} &rarr;
      </Link>
    </section>
  )
}

export default Welcome
