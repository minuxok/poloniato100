import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream
const isSafariBrowser = () => /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)
const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true

const DISMISS_KEY = 'pwa_install_dismissed'
const appIcon = `${import.meta.env.BASE_URL}pwa-192.png`

/**
 * Banner di installazione automatico: su Android/Chrome intercetta
 * beforeinstallprompt e mostra il vero prompt nativo; su iOS/Safari,
 * dove quell'evento non esiste, mostra una guida ai passaggi manuali.
 */
function PWAInstallPrompt({ disabled }) {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showIOSGuide, setShowIOSGuide] = useState(false)

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(DISMISS_KEY)) return

    if (isIOS()) {
      if (isSafariBrowser()) {
        const timer = setTimeout(() => setShowIOSGuide(true), 2500)
        return () => clearTimeout(timer)
      }
      return
    }

    const already = window._pwaDeferred
    if (already) {
      setDeferredPrompt(already)
      setShow(true)
      return
    }

    const handler = (e) => {
      e.preventDefault()
      window._pwaDeferred = e
      setDeferredPrompt(e)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    window._pwaDeferred = null
    setDeferredPrompt(null)
    setShow(false)
  }

  const handleDismiss = () => {
    setShow(false)
    setShowIOSGuide(false)
    localStorage.setItem(DISMISS_KEY, '1')
  }

  if (disabled || (!show && !showIOSGuide)) return null

  return (
    <div className="language-modal" role="dialog" aria-modal="true" aria-label={t('pwa_install_title')}>
      <div className="language-modal__panel install-prompt__panel">
        <img src={appIcon} alt="" className="install-prompt__icon" />
        <h2>{t('pwa_install_title')}</h2>
        <p className="install-prompt__subtitle">
          {showIOSGuide ? t('pwa_install_ios_subtitle') : t('pwa_install_subtitle')}
        </p>

        {showIOSGuide && (
          <ol className="install-prompt__steps">
            <li>{t('pwa_install_ios_step1')}</li>
            <li>{t('pwa_install_ios_step2')}</li>
            <li>{t('pwa_install_ios_step3')}</li>
          </ol>
        )}

        <div className="install-prompt__actions">
          {!showIOSGuide && (
            <button type="button" className="nfcbar__btn" onClick={handleInstall}>
              {t('pwa_install_btn')}
            </button>
          )}
          <button type="button" className="install-prompt__later" onClick={handleDismiss}>
            {showIOSGuide ? t('pwa_install_ios_close') : t('pwa_install_later')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PWAInstallPrompt
