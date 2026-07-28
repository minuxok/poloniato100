import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import opere from '../data/opere.json'

function Home() {
  const { t, i18n } = useTranslation()

  return (
    <section className="home">
      <h1>{t('home_title')}</h1>
      <p>{t('home_subtitle')}</p>
      <ul className="home__list">
        {opere.map((opera) => {
          const title = opera.title[i18n.resolvedLanguage] ?? opera.title.it
          return (
            <li key={opera.id} className="home__list-item">
              <Link to={`/opera/${opera.id}`} className="home__list-link">
                <span>{title}</span>
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
