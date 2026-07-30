import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import opere from '../data/opere.json'

function Home() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || 'it'

  return (
    <section className="home">
      {/* Brochure Hero Header */}
      <div className="home__hero">
        <div className="home__hero-header">
          <div className="home__hero-title-group">
            <h1>{t('home_title')}</h1>
            <div className="home__hero-subtitle">{t('home_subtitle')}</div>
          </div>
          <span className="star-symbol" aria-hidden="true">✦</span>
        </div>

        <div className="divider-bar"></div>

        <div className="home__bio">
          <p>{t('bio_paragraph1')}</p>
          <p>{t('bio_paragraph2')}</p>
          <p>{t('bio_paragraph3')}</p>
          <p>{t('bio_paragraph4')}</p>
        </div>

        <div className="home__credits">
          <div><strong>{t('exhibition_curators')}:</strong> {t('volunteers_group')}</div>
          <div><strong>{t('collaboration')}:</strong> {t('tce_dev')}</div>
        </div>
      </div>

      <div className="divider-bar divider-bar--center"></div>

      {/* Artworks List (Opere in Mostra) */}
      <h2 className="home__section-title">
        <span className="star-symbol" aria-hidden="true">✦</span>
        {t('opere_in_mostra')}
      </h2>

      <ul className="home__list">
        {opere.map((opera) => {
          const title = opera.title[lang] ?? opera.title.it
          return (
            <li key={opera.id} className="home__list-item">
              <Link to={`/opera/${opera.id}`} className="home__list-link">
                <span className="home__list-num">{opera.id}.</span>
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
    </section>
  )
}

export default Home
