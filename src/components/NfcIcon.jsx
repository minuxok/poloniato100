import { resolveAssetUrl } from '../utils/audioAssets'

/**
 * Icona NFC (logo della mostra). Usata nella barra scanner in fondo allo
 * schermo e inline nei messaggi che chiedono di avvicinare il telefono
 * all'icona NFC dell'opera.
 */
function NfcIcon({ className = '' }) {
  return (
    <img
      src={resolveAssetUrl('assets/loghi/logo_NFC.png')}
      alt=""
      aria-hidden="true"
      className={className}
    />
  )
}

export default NfcIcon
