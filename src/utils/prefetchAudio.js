import { getAudioUrlsForLang } from './audioAssets'

let running = false
let doneForLang = null

function whenIdle(fn) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(fn, { timeout: 5000 })
  } else {
    setTimeout(fn, 1500)
  }
}

/**
 * Scarica in background, un file alla volta, tutti gli audio della lingua
 * scelta: il service worker (CacheFirst su /assets/audio/) li mette in
 * cache così ogni tap NFC successivo trova l'audio già pronto, non solo
 * quello della pagina aperta. Sequenziale e a bassa priorità per non
 * saturare il wifi della chiesa; salta se l'utente ha Risparmio Dati attivo.
 */
export function prefetchAudioForLanguage(lang, { skipUrl } = {}) {
  if (running || doneForLang === lang) return
  if (navigator.connection?.saveData) return

  running = true
  const urls = getAudioUrlsForLang(lang).filter((u) => u !== skipUrl)

  whenIdle(async () => {
    for (const url of urls) {
      if (!navigator.onLine) break
      try {
        await fetch(url)
      } catch {
        // Rete assente o instabile: si ritenterà al prossimo tap sull'opera
      }
    }
    running = false
    doneForLang = lang
  })
}
