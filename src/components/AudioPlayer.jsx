import { useTranslation } from 'react-i18next'

function AudioPlayer({ src }) {
  const { t } = useTranslation()

  if (!src) return null

  return (
    <div className="audio-player">
      <p className="audio-player__label">{t('play_audio')}</p>
      <audio controls preload="none" src={src}>
        {t('audio_unsupported')}
      </audio>
    </div>
  )
}

export default AudioPlayer
