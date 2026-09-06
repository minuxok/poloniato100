import opere from '../data/opere.json'

export function resolveAssetUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  return `${cleanBase}${cleanPath}`
}

export function getAudioUrlsForLang(lang) {
  return opere.map((o) => resolveAssetUrl(o.audio?.[lang])).filter(Boolean)
}

// "details" è per lo più una stringa unica non tradotta (materiale/misure),
// ma per i gruppi della Fornace Stringa (più pezzi per gruppo) è tradotta
// per lingua: questa funzione gestisce entrambi i formati.
export function resolveDetails(details, lang) {
  if (!details) return ''
  if (typeof details === 'string') return details
  return details[lang] ?? details.it ?? ''
}
