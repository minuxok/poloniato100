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
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
