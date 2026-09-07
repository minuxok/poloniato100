import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import opere from '../data/opere.json'
import ArtworkCard from '../components/ArtworkCard'

function ArtworkDetail() {
  const { id } = useParams()
  const { t } = useTranslation()
  const opera = opere.find((o) => o.id === Number(id))
  const mediaRef = useRef(null)

  // Aprendo la scheda (da NFC o dall'elenco) il visitatore deve vedere subito
  // la foto dell'opera, non la cima della pagina con titolo/meta.
  useEffect(() => {
    mediaRef.current?.scrollIntoView({ behavior: 'auto', block: 'center' })
  }, [id])

  if (!opera) {
    return (
      <section>
        <p>{t('not_found')}</p>
        <Link to="/">{t('back_home')}</Link>
      </section>
    )
  }

  // Le opere della Fornace Stringa (Grandi Ceramiche Fischianti + id 14-19)
  // sono raggiunte tramite lo scroll automatico verso "?section=fornace":
  // tornare a "/" secco farebbe perdere il contesto e il visitatore
  // dovrebbe riscorrere tutta la pagina per ritrovare la sezione.
  const backTo = opera.id >= 13 ? '/?section=fornace' : '/'

  return (
    <section>
      <Link to={backTo} className="back-link">
        &larr; {t('back_home')}
      </Link>
      <ArtworkCard opera={opera} mediaRef={mediaRef} />
    </section>
  )
}

export default ArtworkDetail
