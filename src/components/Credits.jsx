import { useTranslation } from 'react-i18next'

function resolveAssetUrl(path) {
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  return `${cleanBase}${cleanPath}`
}

function Credits() {
  const { t } = useTranslation()

  return (
    <div className="home__credits">
      <div className="home__credits-row">
        <img
          className="home__credits-logo home__credits-logo--blanser"
          src={resolveAssetUrl('assets/loghi/Logo_Blanser.png')}
          alt="I Blanser del Museo"
        />
        <div>
          <strong>{t('exhibition_curators')}:</strong> {t('volunteers_group')}
        </div>
      </div>

      <div className="home__patronage">
        <span className="home__patronage-label">{t('patronage')}</span>
        <div className="home__patronage-logos">
          <img
            src={resolveAssetUrl('assets/loghi/Logo_comune_Nove.png')}
            alt="Comune di Nove"
          />
          <img
            src={resolveAssetUrl('assets/loghi/Logo_Museo.png')}
            alt="Museo Civico della Ceramica di Nove"
          />
          <img
            src={resolveAssetUrl('assets/loghi/Logo_Parrocchia.png')}
            alt="Parrocchia dei Santi Pietro e Paolo Apostoli"
          />
        </div>
      </div>

      <div className="home__credits-row">
        <img
          className="home__credits-logo home__credits-logo--tce"
          src={resolveAssetUrl('assets/loghi/Logo_TCE.png')}
          alt="TCE"
        />
        <div>
          <strong>{t('collaboration')}:</strong> {t('tce_dev')}
        </div>
      </div>
    </div>
  )
}

export default Credits
