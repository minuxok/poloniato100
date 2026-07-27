import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import opere from '../data/opere.json'
import ArtworkCard from '../components/ArtworkCard'

function ArtworkDetail() {
  const { id } = useParams()
  const { t } = useTranslation()
  const opera = opere.find((o) => o.id === Number(id))

  if (!opera) {
    return (
      <section>
        <p>{t('not_found')}</p>
        <Link to="/">{t('back_home')}</Link>
      </section>
    )
  }

  return (
    <section>
      <Link to="/" className="back-link">
        &larr; {t('back_home')}
      </Link>
      <ArtworkCard opera={opera} />
    </section>
  )
}

export default ArtworkDetail
