import { useTranslation } from 'react-i18next'

function AudioPlayer({ src, labelKey = 'play_audio' }) {
  const { t } = useTranslation()

  if (!src) return null

  return (
    <div className="audio-player">
      <div className="audio-player__header">
        <span className="audio-player__badge" aria-hidden="true">
          🎧
        </span>
        <p className="audio-player__label">{t(labelKey)}</p>
      </div>
      <audio controls preload="auto" src={src}>
        {t('audio_unsupported')}
      </audio>
    </div>
  )
}

export default AudioPlayer
