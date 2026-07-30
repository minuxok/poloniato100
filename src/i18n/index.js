import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  it: {
    translation: {
      choose_lang: 'Scegli la lingua',
      play_audio: 'Ascolta Guida Audio',
      audio_unsupported: 'Il tuo browser non supporta la riproduzione audio.',
      home_title: 'DOMENICO POLONIATO',
      home_subtitle: 'OMAGGIO NEL CENTENARIO DELLA NASCITA',
      exhibition_curators: 'MOSTRA A CURA DEL GRUPPO DI VOLONTARI',
      volunteers_group: 'I BLANSER DEL MUSEO',
      collaboration: 'CON LA COLLABORAZIONE DI',
      tce_dev: 'TCE DEV DI TORRESIN MICHELE',
      artist_dates: '(1926-2013)',
      bio_title: 'DOMENICO POLONIATO (1926-2013)',
      bio_paragraph1: 'Domenico Poloniato è stato tra i principali interpreti della tradizione ceramica novese del secondo Novecento. Formatosi nelle storiche manifatture del territorio e al locale Istituto d\'Arte per la Ceramica, ha saputo coniugare una straordinaria padronanza tecnica ad un profondo legame con la cultura locale.',
      bio_paragraph2: 'Per oltre vent\'anni insegnò all\'Istituto d\'Arte, dove fu un maestro stimato da generazioni di allievi. Accanto all\'attività didattica, lavorò come modellatore per diverse manifatture e, negli anni Settanta, avviò un proprio laboratorio.',
      bio_paragraph3: 'La sua produzione spazializza dai celebri arcicuchi alle sculture di soggetto sacro (di cui in mostra è esposta una selezione), fino alle scene del mondo rurale legato al fiume Brenta. Le sue opere restituiscono, quindi, con precisione e sensibilità gesti, volti e tradizioni di una comunità.',
      bio_paragraph4: 'La mostra intende rendere omaggio, a cent\'anni dalla nascita, a un artista che ha saputo esprimere l\'identità della ceramica di Nove attraverso un linguaggio profondamente radicato nella cultura del suo territorio.',
      opere_in_mostra: 'OPERE IN MOSTRA',
      nfc_instruction: 'Avvicina lo smartphone al cartellino NFC dell\'opera per scoprirne la storia.',
      not_found: 'Opera non trovata.',
      back_home: 'Tutte le opere',
      nfc_activate: 'Attiva la lettura dei cartellini',
      nfc_scanning: 'Avvicina il telefono al cartellino',
      nfc_unsupported: 'Avvicina il telefono al cartellino dell\'opera: si aprirà da solo.',
      nfc_denied: 'Lettura NFC non consentita. Abilitala dalle impostazioni del browser oppure inquadra il QR sul cartellino.',
      nfc_error: 'Lettura non riuscita. Riprova ad avvicinare il telefono.'
    }
  },
  en: {
    translation: {
      choose_lang: 'Select Language',
      play_audio: 'Listen to Audio Guide',
      audio_unsupported: 'Your browser does not support audio playback.',
      home_title: 'DOMENICO POLONIATO',
      home_subtitle: 'CENTENARY BIRTH HOMAGE',
      exhibition_curators: 'EXHIBITION CURATED BY THE VOLUNTEER GROUP',
      volunteers_group: 'I BLANSER DEL MUSEO',
      collaboration: 'IN COLLABORATION WITH',
      tce_dev: 'TCE DEV BY TORRESIN MICHELE',
      artist_dates: '(1926-2013)',
      bio_title: 'DOMENICO POLONIATO (1926-2013)',
      bio_paragraph1: 'Domenico Poloniato was among the main interpreters of the Nove ceramic tradition in the second half of the 20th century. Trained in the historic local manufactories and the local Art Institute for Ceramics, he combined extraordinary technical mastery with a deep bond to local culture.',
      bio_paragraph2: 'For over twenty years he taught at the Art Institute, where he was an esteemed master to generations of students. alongside teaching, he worked as a modeler for various manufactories and opened his own workshop in the 1970s.',
      bio_paragraph3: 'His output ranges from the famous arcicuchi to sacred sculptures (a selection of which is on display), to scenes of rural life connected to the Brenta river. His works convey with precision and sensitivity the gestures and traditions of a community.',
      bio_paragraph4: 'One hundred years after his birth, this exhibition pays homage to an artist who expressed the identity of Nove ceramics through a language deeply rooted in his territory.',
      opere_in_mostra: 'EXHIBITED ARTWORKS',
      nfc_instruction: 'Tap your smartphone on the artwork\'s NFC tag to discover its story.',
      not_found: 'Artwork not found.',
      back_home: 'All artworks',
      nfc_activate: 'Turn on label reading',
      nfc_scanning: 'Hold your phone near the label',
      nfc_unsupported: 'Hold your phone near the label: the work will open by itself.',
      nfc_denied: 'NFC reading is blocked. Allow it in your browser settings, or scan the QR code on the label.',
      nfc_error: 'Reading failed. Try holding your phone closer.'
    }
  },
  fr: {
    translation: {
      choose_lang: 'Choisir la langue',
      play_audio: 'Écouter l\'audioguide',
      audio_unsupported: 'Votre navigateur ne prend pas en charge la lecture audio.',
      home_title: 'DOMENICO POLONIATO',
      home_subtitle: 'HOMMAGE AU CENTENAIRE DE SA NAISSANCE',
      exhibition_curators: 'EXPOSITION ORGANISÉE PAR LE GROUPE DE BÉNÉVOLES',
      volunteers_group: 'I BLANSER DEL MUSEO',
      collaboration: 'EN COLLABORATION AVEC',
      tce_dev: 'TCE DEV DE TORRESIN MICHELE',
      artist_dates: '(1926-2013)',
      bio_title: 'DOMENICO POLONIATO (1926-2013)',
      bio_paragraph1: 'Domenico Poloniato a été l\'un des principaux interprètes de la tradition céramique de Nove.',
      bio_paragraph2: 'Pendant plus de vingt ans, il a enseigné à l\'Institut d\'Art, formant plusieurs générations d\'élèves.',
      bio_paragraph3: 'Sa production s\'étend des célèbres arcicuchi aux sculptures à sujet sacré.',
      bio_paragraph4: 'L\'exposition rend hommage à un artiste profondément enraciné dans son territoire.',
      opere_in_mostra: 'ŒUVRES EXPOSÉES',
      nfc_instruction: 'Approchez votre téléphone du tag NFC à côté d\'une œuvre.',
      not_found: 'Œuvre introuvable.',
      back_home: 'Toutes les œuvres',
      nfc_activate: 'Activer la lecture des cartels',
      nfc_scanning: 'Approchez le téléphone du cartel',
      nfc_unsupported: 'Approchez le téléphone du cartel : l\'œuvre s\'ouvrira toute seule.',
      nfc_denied: 'Lecture NFC bloquée. Autorisez-la dans les réglages du navigateur.',
      nfc_error: 'Lecture échouée. Réessayez en approchant le téléphone.'
    }
  },
  es: {
    translation: {
      choose_lang: 'Seleccionar Idioma',
      play_audio: 'Escuchar Guía de Audio',
      audio_unsupported: 'Tu navegador no admite la reproducción de audio.',
      home_title: 'DOMENICO POLONIATO',
      home_subtitle: 'HOMENAJE EN EL CENTENARIO DE SU NACIMIENTO',
      exhibition_curators: 'EXPOSICIÓN A CARGO DEL GRUPO DE VOLUNTARIOS',
      volunteers_group: 'I BLANSER DEL MUSEO',
      collaboration: 'CON LA COLABORACIÓN DE',
      tce_dev: 'TCE DEV DE TORRESIN MICHELE',
      artist_dates: '(1926-2013)',
      bio_title: 'DOMENICO POLONIATO (1926-2013)',
      bio_paragraph1: 'Domenico Poloniato fue uno de los principales intérpretes de la tradición cerámica de Nove.',
      bio_paragraph2: 'Durante más de veinte años enseñó en el Instituto de Arte, siendo un maestro estimado por generaciones.',
      bio_paragraph3: 'Su producción abarca desde los célebres arcicuchi hasta esculturas de tema sacro.',
      bio_paragraph4: 'La exposición rinde homenaje a un artista profundamente arraigado en la cultura de su territorio.',
      opere_in_mostra: 'OBRAS EXPUESTAS',
      nfc_instruction: 'Acerca tu teléfono a la etiqueta NFC junto a una obra para descubrir su historia.',
      not_found: 'Obra no encontrada.',
      back_home: 'Todas las obras',
      nfc_activate: 'Activar la lectura de etiquetas',
      nfc_scanning: 'Acerca el teléfono a la etiqueta',
      nfc_unsupported: 'Acerca el teléfono a la etiqueta de la obra: se abrirá sola.',
      nfc_denied: 'Lectura NFC no permitida. Actívala en la configuración del navegador.',
      nfc_error: 'Lectura fallida. Vuelve a acercar el teléfono.'
    }
  },
  de: {
    translation: {
      choose_lang: 'Sprache wählen',
      play_audio: 'Audioguide anhören',
      audio_unsupported: 'Ihr Browser unterstützt keine Audiowiedergabe.',
      home_title: 'DOMENICO POLONIATO',
      home_subtitle: 'HOMMAGE ZUM HUNDERTSTEN GEBURTSTAG',
      exhibition_curators: 'AUSSTELLUNG KURATIERT VON DER FREIWILLIGENGRUPPE',
      volunteers_group: 'I BLANSER DEL MUSEO',
      collaboration: 'IN ZUSAMMENARBEIT MIT',
      tce_dev: 'TCE DEV VON TORRESIN MICHELE',
      artist_dates: '(1926-2013)',
      bio_title: 'DOMENICO POLONIATO (1926-2013)',
      bio_paragraph1: 'Domenico Poloniato war einer der wichtigsten Vertreter der Keramiktradition von Nove.',
      bio_paragraph2: 'Über zwanzig Jahre lang unterrichtete er am Kunstinstitut und prägte Generationen von Schülern.',
      bio_paragraph3: 'Sein Schaffen reicht von den berühmten Arcicuchi bis hin zu sakralen Skulpturen.',
      bio_paragraph4: 'Die Ausstellung würdigt einen Künstler, der fest in der Kultur seiner Region verwurzelt war.',
      opere_in_mostra: 'AUSGESTELLTE WERKE',
      nfc_instruction: 'Halten Sie Ihr Smartphone an den NFC-Tag neben einem Kunstwerk.',
      not_found: 'Kunstwerk nicht gefunden.',
      back_home: 'Alle Kunstwerke',
      nfc_activate: 'Schilderlesung einschalten',
      nfc_scanning: 'Halten Sie das Telefon an das Schild',
      nfc_unsupported: 'Halten Sie das Telefon an das Schild: das Werk öffnet sich von selbst.',
      nfc_denied: 'NFC-Lesung ist blockiert. Erlauben Sie sie in den Browsereinstellungen.',
      nfc_error: 'Lesen fehlgeschlagen. Bitte erneut versuchen.'
    }
  }
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
