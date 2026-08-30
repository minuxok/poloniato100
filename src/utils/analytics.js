/**
 * Helper per integrazione GoatCounter Analytics per SPA React.
 */

/**
 * Traccia una visualizzazione pagina su GoatCounter.
 * @param {string} path - Il percorso della pagina (es. '/' o '/opera/terracotta-1')
 */
export function trackPageView(path) {
  if (window.goatcounter && typeof window.goatcounter.count === 'function') {
    window.goatcounter.count({
      path: path || '/',
    })
  }
}

/**
 * Traccia un evento personalizzato su GoatCounter.
 * @param {string} name - Nome univoco evento (es. 'audio-play-terracotta-1')
 * @param {string} [title] - Titolo/descrizione dell'evento
 */
export function trackEvent(name, title) {
  if (window.goatcounter && typeof window.goatcounter.count === 'function') {
    window.goatcounter.count({
      path: name,
      title: title || name,
      event: true,
    })
  }
}
