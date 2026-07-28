import { useTranslation } from 'react-i18next'
import AudioPlayer from './AudioPlayer'

function ArtworkCard({ opera }) {
  const { i18n } = useTranslation()
  const lang = opera.title[i18n.resolvedLanguage] ? i18n.resolvedLanguage : 'it'
  const videoSrc = typeof opera.video === 'string' ? opera.video : opera.video?.[lang]

  return (
    <article className="artwork-card">
      <div className="artwork-card__media-container">
        <img
          className="artwork-card__image"
          src={opera.image}
          alt={opera.title[lang]}
        />
      </div>
      <header className="artwork-card__header">
        <h2 className="artwork-card__title">{opera.title[lang]}</h2>
        <span className="artwork-card__meta">
          {opera.artist} • {opera.year}
        </span>
      </header>
      <p className="artwork-card__description">{opera.description[lang]}</p>
      <AudioPlayer src={opera.audio?.[lang]} />
      {videoSrc && (
        <div className="artwork-card__video-container">
          <video
            className="artwork-card__video"
            controls
            preload="none"
            src={videoSrc}
          />
        </div>
      )}
    </article>
  )
}

export default ArtworkCard
