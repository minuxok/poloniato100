import { useEffect, useRef } from 'react'
import { useParams, Link, Navigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import opere from '../data/opere.json'
import ArtworkCard from '../components/ArtworkCard'

function ArtworkDetail() {
  const { id } = useParams()
  const { t } = useTranslation()
  const location = useLocation()
  const opera = opere.find((o) => o.id === Number(id))
  const mediaRef = useRef(null)

  // Aprendo la scheda (da NFC o dall'elenco) il visitatore deve vedere subito
  // la foto dell'opera, non la cima della pagina con titolo/meta.
  useEffect(() => {
    mediaRef.current?.scrollIntoView({ behavior: 'auto', block: 'center' })
  }, [id])

  // Il tag NFC d'ingresso è stato scritto con ".../#/opera/0", ma l'introduzione
  // completa (testo + BIO + credits) vive nella pagina "/benvenuto". Poiché il
  // tag non è più riscrivibile, chi apre "/opera/0" viene rimandato lì.
  // "/opera/0" non è linkato da nessuna parte nell'app (l'elenco parte da id 1).
  if (Number(id) === 0) {
    return <Navigate to={`/benvenuto${location.search}`} replace />
  }

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
  // L'opera 20 è esposta in chiesa nonostante l'id alto (vedi opere.json):
  // deve tornare a "/" secco, non alla sezione Fornace.
  const backTo = opera.id >= 13 && opera.id !== 20 ? '/?section=fornace' : '/'

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
