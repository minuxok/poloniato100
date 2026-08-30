import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import opere from '../data/opere.json'

// Estrae l'id opera da un URL scritto sul tag: .../opera/12, ?id=12,
// oppure .../#/opera/12 (formato reale con HashRouter).
function extractOperaId(raw) {
  try {
    const url = new URL(raw, window.location.origin)
    const match = url.pathname.match(/\/opera\/(\d+)/)
    if (match) return match[1]
    if (url.hash) {
      const hashPath = url.hash.slice(1)
      const hashMatch = hashPath.match(/\/opera\/(\d+)/)
      if (hashMatch) return hashMatch[1]
      const hashQuery = hashPath.split('?')[1]
      if (hashQuery) {
        const idFromHash = new URLSearchParams(hashQuery).get('id')
        if (idFromHash) return idFromHash
      }
    }
    return url.searchParams.get('id')
  } catch {
    return /^\d+$/.test(raw.trim()) ? raw.trim() : null
  }
}

/**
 * Barra persistente in fondo allo schermo.
 * Android: la Web NFC API richiede un gesto utente per attivarsi — invece
 * di un pulsante dedicato (un passaggio in più, ingiustificato agli occhi
 * del visitatore), agganciamo l'attivazione al primo tocco naturale sulla
 * pagina. L'utente vede solo il popup nativo del browser, mai un nostro
 * pulsante custom.
 * iOS/altri: nessuna Web NFC disponibile, il tag apre l'URL da solo.
 */
function NfcListener() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle')
  const navigateRef = useRef(navigate)
  navigateRef.current = navigate

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

  useEffect(() => {
    if (!('NDEFReader' in window)) {
      setStatus('unsupported')
      return
    }
    const arm = () => start()
    document.addEventListener('pointerdown', arm, { once: true })
    return () => document.removeEventListener('pointerdown', arm)
  }, [start])

  const message =
    status === 'idle' || status === 'scanning'
      ? t('nfc_scanning')
      : status === 'denied'
        ? t('nfc_denied')
        : status === 'error'
          ? t('nfc_error')
          : t('nfc_unsupported')

  return (
    <div className="nfcbar" role="status" aria-live="polite">
      <p className="nfcbar__msg" data-state={status}>
        <svg
          className="nfcbar__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM18 6h-5c-1.1 0-2 .9-2 2v2.28c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V8h3v8H8V8h1V6H6v12h12V6z"
          />
        </svg>
        {message}
      </p>
    </div>
  )
}

export default NfcListener
