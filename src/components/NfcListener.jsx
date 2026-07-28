import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import opere from '../data/opere.json'

// Estrae l'id opera da un URL scritto sul tag: .../opera/12 oppure ?id=12
function extractOperaId(raw) {
  try {
    const url = new URL(raw, window.location.origin)
    const match = url.pathname.match(/\/opera\/(\d+)/)
    if (match) return match[1]
    return url.searchParams.get('id')
  } catch {
    return /^\d+$/.test(raw.trim()) ? raw.trim() : null
  }
}

/**
 * Barra persistente in fondo allo schermo.
 * Android: attiva la scansione Web NFC e cambia opera senza mai lasciare la pagina.
 * iOS/altri: spiega solo cosa fare, perché il tag apre l'URL da solo.
 */
function NfcListener() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle')
  const navigateRef = useRef(navigate)
  navigateRef.current = navigate

  useEffect(() => {
    if (!('NDEFReader' in window)) {
      setStatus('unsupported')
    }
  }, [])

  const start = useCallback(async () => {
    if (!('NDEFReader' in window)) {
      setStatus('unsupported')
      return
    }
    try {
      const reader = new window.NDEFReader()
      await reader.scan()
      setStatus('scanning')

      reader.onreading = (event) => {
        for (const record of event.message.records) {
          if (!['url', 'absolute-url', 'text'].includes(record.recordType)) continue
          const raw = new TextDecoder(record.encoding || 'utf-8').decode(record.data)
          const id = extractOperaId(raw)
          const opera = id ? opere.find((o) => o.id === Number(id)) : undefined
          if (opera) {
            navigateRef.current(`/opera/${opera.id}`)
            if (navigator.vibrate) navigator.vibrate(20)
            return
          }
        }
      }

      reader.onreadingerror = () => setStatus('error')
    } catch (err) {
      setStatus(err?.name === 'NotAllowedError' ? 'denied' : 'error')
    }
  }, [])

  const message =
    status === 'scanning'
      ? t('nfc_scanning')
      : status === 'denied'
        ? t('nfc_denied')
        : status === 'error'
          ? t('nfc_error')
          : t('nfc_unsupported')

  return (
    <div className="nfcbar" role="status" aria-live="polite">
      {status === 'idle' ? (
        <button type="button" className="nfcbar__btn" onClick={start}>
          {t('nfc_activate')}
        </button>
      ) : (
        <p className="nfcbar__msg" data-state={status}>
          <span className="nfcbar__pulse" aria-hidden="true" />
          {message}
        </p>
      )}
    </div>
  )
}

export default NfcListener
