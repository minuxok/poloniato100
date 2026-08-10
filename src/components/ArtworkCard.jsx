import { useTranslation } from 'react-i18next'
import AudioPlayer from './AudioPlayer'

function resolveAssetUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  return `${cleanBase}${cleanPath}`
}

function ArtworkCard({ opera }) {
  const { i18n } = useTranslation()
  const lang = opera.title[i18n.resolvedLanguage] ? i18n.resolvedLanguage : 'it'
  const rawVideo = typeof opera.video === 'string' ? opera.video : opera.video?.[lang]
  const videoSrc = resolveAssetUrl(rawVideo)
  const imageSrc = resolveAssetUrl(opera.image)
  const audioSrc = resolveAssetUrl(opera.audio?.[lang])

  return (
    <article className="artwork-card">
      {/* Visual Confirmation Image */}
      <div className="artwork-card__media-container">
        <img
          className="artwork-card__image"
          src={imageSrc}
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
      <AudioPlayer src={audioSrc} />

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
