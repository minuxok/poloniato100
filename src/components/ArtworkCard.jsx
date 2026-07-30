import { useTranslation } from 'react-i18next'
import AudioPlayer from './AudioPlayer'

function ArtworkCard({ opera }) {
  const { i18n } = useTranslation()
  const lang = opera.title[i18n.resolvedLanguage] ? i18n.resolvedLanguage : 'it'
  const videoSrc = typeof opera.video === 'string' ? opera.video : opera.video?.[lang]

  return (
    <article className="artwork-card">
      {/* Visual Confirmation Image */}
      <div className="artwork-card__media-container">
        <img
          className="artwork-card__image"
          src={opera.image}
          alt={opera.title[lang]}
          onError={(e) => {
            // Fallback placeholder image with artwork title if image file doesn't exist yet
            e.target.onerror = null
            e.target.src = `https://placehold.co/800x600/7a432a/ffffff?text=${encodeURIComponent(
              opera.title[lang]
            )}`
          }}
        />
        <div className="artwork-card__verify-badge">
          <span>✓</span> Opera #{opera.id}
        </div>
      </div>

      {/* Header & Meta Info */}
      <header className="artwork-card__header">
        <h2 className="artwork-card__title">{opera.title[lang]}</h2>
        <div className="artwork-card__meta-group">
          <span className="artwork-card__meta">
            {opera.artist}
          </span>
          {opera.details && (
            <span className="artwork-card__meta">
              {opera.details}
            </span>
          )}
        </div>
      </header>

      {/* Written Description */}
      <div className="artwork-card__description">
        {opera.description[lang]}
      </div>

      {/* Audio Guide Player */}
      <AudioPlayer src={opera.audio?.[lang]} />

      {/* Optional Video Guide */}
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
