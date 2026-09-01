function resolveAssetUrl(path) {
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  return `${cleanBase}${cleanPath}`
}

/**
 * Simbolo grafico della mostra (dalla brochure), usato come fregio
 * accanto ai titoli e nel brand dell'header. Sostituisce il vecchio
 * carattere "✦".
 */
function StarSymbol({ size = '1.5rem', className = '' }) {
  return (
    <img
      src={resolveAssetUrl('assets/loghi/simbolo_poloniato.png')}
      alt=""
      aria-hidden="true"
      className={`star-symbol ${className}`.trim()}
      style={{ width: size, height: size }}
    />
  )
}

export default StarSymbol
