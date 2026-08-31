import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trans } from 'react-i18next'
import opere from '../data/opere.json'
import NfcIcon from './NfcIcon'

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

      reader.onreadingerror = () => setStatus('unsupported')
    } catch {
      // Silently fall back so the visitor is never shown intimidating permission warning popups
      setStatus('unsupported')
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

  // Always display friendly, positive NFC guidance
  const messageKey = 'nfc_unsupported'

  return (
    <div className="nfcbar" role="status" aria-live="polite">
      <p className="nfcbar__msg" data-state={status}>
        <NfcIcon className="nfcbar__icon" />
        <span className="nfcbar__text">
          <Trans
            i18nKey={messageKey}
            components={{ nfc: <NfcIcon className="nfcbar__icon nfcbar__icon--inline" /> }}
          />
        </span>
      </p>
    </div>
  )
}

export default NfcListener
