import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  it: {
    translation: {
      choose_lang: 'Scegli la lingua',
      play_audio: 'Ascolta Guida Audio',
      audio_unsupported: 'Il tuo browser non supporta la riproduzione audio.',
      home_title: "Mostra d'Arte",
      home_subtitle:
        "Avvicina lo smartphone al tag NFC accanto a un'opera per scoprirne la storia.",
      not_found: 'Opera non trovata.',
      back_home: 'Tutte le opere',
      nfc_activate: 'Attiva la lettura dei cartellini',
      nfc_scanning: 'Avvicina il telefono al cartellino',
      nfc_unsupported: "Avvicina il telefono al cartellino dell'opera: si aprirà da solo.",
      nfc_denied:
        'Lettura NFC non consentita. Abilitala dalle impostazioni del browser oppure inquadra il QR sul cartellino.',
      nfc_error: 'Lettura non riuscita. Riprova ad avvicinare il telefono.',
    },
  },
  en: {
    translation: {
      choose_lang: 'Select Language',
      play_audio: 'Listen to Audio Guide',
      audio_unsupported: 'Your browser does not support audio playback.',
      home_title: 'Art Exhibition',
      home_subtitle:
        'Tap your phone on the NFC tag next to an artwork to discover its story.',
      not_found: 'Artwork not found.',
      back_home: 'All artworks',
      nfc_activate: 'Turn on label reading',
      nfc_scanning: 'Hold your phone near the label',
      nfc_unsupported: 'Hold your phone near the label: the work will open by itself.',
      nfc_denied:
        'NFC reading is blocked. Allow it in your browser settings, or scan the QR code on the label.',
      nfc_error: 'Reading failed. Try holding your phone closer.',
    },
  },
  fr: {
    translation: {
      choose_lang: 'Choisir la langue',
      play_audio: "Écouter l'audioguide",
      audio_unsupported: 'Votre navigateur ne prend pas en charge la lecture audio.',
      home_title: "Exposition d'Art",
      home_subtitle:
        "Approchez votre téléphone du tag NFC à côté d'une œuvre pour découvrir son histoire.",
      not_found: 'Œuvre introuvable.',
      back_home: 'Toutes les œuvres',
      nfc_activate: 'Activer la lecture des cartels',
      nfc_scanning: 'Approchez le téléphone du cartel',
      nfc_unsupported: "Approchez le téléphone du cartel : l'œuvre s'ouvrira toute seule.",
      nfc_denied:
        'Lecture NFC bloquée. Autorisez-la dans les réglages du navigateur ou scannez le QR du cartel.',
      nfc_error: 'Lecture échouée. Réessayez en approchant le téléphone.',
    },
  },
  es: {
    translation: {
      choose_lang: 'Seleccionar Idioma',
      play_audio: 'Escuchar Guía de Audio',
      audio_unsupported: 'Tu navegador no admite la reproducción de audio.',
      home_title: 'Exposición de Arte',
      home_subtitle:
        'Acerca tu teléfono a la etiqueta NFC junto a una obra para descubrir su historia.',
      not_found: 'Obra no encontrada.',
      back_home: 'Todas las obras',
      nfc_activate: 'Activar la lectura de etiquetas',
      nfc_scanning: 'Acerca el teléfono a la etiqueta',
      nfc_unsupported: 'Acerca el teléfono a la etiqueta de la obra: se abrirá sola.',
      nfc_denied:
        'Lectura NFC no permitida. Actívala en la configuración del navegador o escanea el código QR de la etiqueta.',
      nfc_error: 'Lectura fallida. Vuelve a acercar el teléfono.',
    },
  },
  de: {
    translation: {
      choose_lang: 'Sprache wählen',
      play_audio: 'Audioguide anhören',
      audio_unsupported: 'Ihr Browser unterstützt keine Audiowiedergabe.',
      home_title: 'Kunstausstellung',
      home_subtitle:
        'Halten Sie Ihr Smartphone an den NFC-Tag neben einem Kunstwerk, um seine Geschichte zu entdecken.',
      not_found: 'Kunstwerk nicht gefunden.',
      back_home: 'Alle Kunstwerke',
      nfc_activate: 'Schilderlesung einschalten',
      nfc_scanning: 'Halten Sie das Telefon an das Schild',
      nfc_unsupported: 'Halten Sie das Telefon an das Schild: das Werk öffnet sich von selbst.',
      nfc_denied:
        'NFC-Lesung ist blockiert. Erlauben Sie sie in den Browsereinstellungen oder scannen Sie den QR-Code.',
      nfc_error: 'Lesen fehlgeschlagen. Bitte erneut versuchen.',
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'it',
    supportedLngs: ['it', 'en', 'fr', 'es', 'de'],
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
