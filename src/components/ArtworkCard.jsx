import { useTranslation } from 'react-i18next'
import AudioPlayer from './AudioPlayer'

function ArtworkCard({ opera }) {
  const { i18n } = useTranslation()
  const lang = opera.title[i18n.resolvedLanguage] ? i18n.resolvedLanguage : 'it'
  const videoSrc = typeof opera.video === 'string' ? opera.video : opera.video?.[lang]

  return (
    <article className="artwork-card">
      <img
        className="artwork-card__image"
        src={opera.image}
        alt={opera.title[lang]}
      />
      <h1 className="artwork-card__title">{opera.title[lang]}</h1>
      <p className="artwork-card__meta">
        {opera.artist} &mdash; {opera.year}
      </p>
      <p className="artwork-card__description">{opera.description[lang]}</p>
      <AudioPlayer src={opera.audio?.[lang]} />
      {videoSrc && (
        <video
          className="artwork-card__video"
          controls
          preload="none"
          src={videoSrc}
        />
      )}
    </article>
  )
}

export default ArtworkCard
