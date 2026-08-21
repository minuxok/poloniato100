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
