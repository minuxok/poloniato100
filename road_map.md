# Specifica di Progetto: WebApp NFC per Mostra d'Arte in Chiesa

## 1. Panoramica del Progetto
Sviluppare una WebApp PWA ultra-leggera e reattiva per una mostra d'arte (10 opere) allestita all'interno di una chiesa.
L'utente interagisce con le opere toccando i tag NFC presenti nei cartellini espositivi.
L'esperienza deve essere a bassissima frizione: nessun download da store, nessuna configurazione complessa, supporto offline/offline-first per superare i problemi di connettività dovuti alle mura spesse della chiesa.

---

## 2. Requisiti Chiave & Flusso UX

### 2.1 Primo Tap NFC (Inizializzazione)
1. L'utente avvicina lo smartphone al tag NFC dell'opera (es. Opera #1).
2. Il tag apre la WebApp all'URL specifico dell'opera (`/opera/1` oppure `/?opera=1`).
3. L'app verifica la presenza della lingua preferita in `localStorage`:
   - **Se assente:** Mostra un modale/schermata di **Selezione Lingua** (Italiano, Inglese, Francese, Spagnolo, Tedesco).
   - **Se presente:** Carica direttamente i contenuti dell'opera nella lingua salvata.

### 2.2 Tap NFC Successivi
1. L'utente si sposta e scansiona l'NFC dell'Opera #2.
2. L'app rileva che la lingua è già salvata in `localStorage`.
3. Viene visualizzata **istantaneamente** la scheda dell'Opera #2 nella lingua preimpostata, senza chiedere nuovamente la lingua.
4. Un selettore di lingua minimale (es. icone/bandiere nell'header) resta sempre accessibile per eventuali cambi manuali.

---

## 3. Tech Stack Consigliato

| Componente | Tecnologia | Motivazione |
| :--- | :--- | :--- |
| **Framework Frontend** | **Vite + React** (JavaScript o TypeScript) | Reattività istantanea, build leggerissima, zero sovrastruttura SEO. |
| **Internazionalizzazione** | `i18next` + `react-i18next` + `i18next-browser-languagedetector` | Gestione multilingua fluida con integrazione nativa in `localStorage`. |
| **Routing** | `react-router-dom` | Gestione delle route per le 10 opere (`/opera/:id`). |
| **Gestione Dati** | JSON Statico (`src/data/opere.json`) | Solo 10 opere: nessun DB/CMS richiesto, caricamento immediato. |
| **Media Player** | Componenti HTML5 Nativi (`<audio>`, `<video>`) | Massima compatibilità, performance elevate e controllo diretto dello stato. |
| **PWA / Offline** | `vite-plugin-pwa` | Caching degli asset (file JSON, audio/video compressi, immagini) per ambienti senza segnale. |
| **Styling** | Tailwind CSS (o CSS Modules) | UI minimale, moderna, responsiva per mobile. |

---

## 4. Struttura Dati (`src/data/opere.json`)

Tutti i contenuti delle 10 opere devono essere strutturati in un unico file JSON statico. Le lingue supportate sono **it, en, fr, es, de**:

```json
[
  {
    "id": 1,
    "slug": "opera-1",
    "title": {
      "it": "Titolo Opera 1",
      "en": "Artwork Title 1",
      "fr": "Titre de l'Œuvre 1",
      "es": "Título de la Obra 1",
      "de": "Titel des Werks 1"
    },
    "artist": "Nome Artista",
    "year": "1542",
    "description": {
      "it": "Descrizione dettagliata dell'opera in italiano...",
      "en": "Detailed description of the artwork in English...",
      "fr": "Description détaillée de l'œuvre en français...",
      "es": "Descripción detallada de la obra en español...",
      "de": "Detaillierte Beschreibung des Kunstwerks auf Deutsch..."
    },
    "image": "/assets/images/opera-1.jpg",
    "audio": {
      "it": "/assets/audio/opera-1-it.mp3",
      "en": "/assets/audio/opera-1-en.mp3",
      "fr": "/assets/audio/opera-1-fr.mp3",
      "es": "/assets/audio/opera-1-es.mp3",
      "de": "/assets/audio/opera-1-de.mp3"
    },
    "video": {
      "it": "/assets/video/opera-1-it.mp4",
      "en": "/assets/video/opera-1-en.mp4",
      "fr": "/assets/video/opera-1-fr.mp4",
      "es": "/assets/video/opera-1-es.mp4",
      "de": "/assets/video/opera-1-de.mp4"
    }
  }
]
```

> Nota: se i video non contengono parlato (es. solo loop visivi muti/con musica), il campo `video` può restare una singola stringa invece che un oggetto per lingua.

---

## 5. Architettura della Cartella di Progetto

```text
mostra-nfc-app/
├── public/
│   ├── assets/
│   │   ├── audio/        # Audio MP3 per ciascuna lingua (es. opera-1-it.mp3)
│   │   ├── images/       # Immagini ad alta risoluzione/ottimizzate WebP
│   │   └── video/        # Video brevi/loop (opzionali)
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Header con selettore lingua sempre attivo
│   │   ├── LanguageModal.jsx    # Modal prima scelta lingua
│   │   ├── AudioPlayer.jsx      # Lettore audio personalizzato
│   │   └── ArtworkCard.jsx      # Vista dettagli dell'opera (Testo + Media)
│   ├── data/
│   │   └── opere.json           # Dati e traduzioni delle 10 opere
│   ├── i18n/
│   │   └── index.js             # Configurazione i18next + localStorage detector
│   ├── pages/
│   │   ├── Home.jsx             # Landing page generica / guida NFC
│   │   └── ArtworkDetail.jsx    # Pagina dettaglio opera letta da NFC (/opera/:id)
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

## 6. Configurazione e Logica Tecnico-Funzionale

### 6.1 Inizializzazione `i18next` con Persistenza

L'inizializzatore `i18n` deve verificare se esiste una lingua salvata. Se non esiste, lascia lo stato non impostato per far scattare il `LanguageModal`.

```javascript
// src/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'it',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    resources: {
      it: { translation: { choose_lang: "Scegli la lingua", play_audio: "Ascolta Guida Audio" } },
      en: { translation: { choose_lang: "Select Language", play_audio: "Listen to Audio Guide" } },
      fr: { translation: { choose_lang: "Choisir la langue", play_audio: "Écouter l'audioguide" } },
      es: { translation: { choose_lang: "Seleccionar Idioma", play_audio: "Escuchar Guía de Audio" } },
      de: { translation: { choose_lang: "Sprache wählen", play_audio: "Audioguide anhören" } }
    }
  });

export default i18n;
```

### 6.2 Gestione del Flusso Selezione Lingua (`ArtworkDetail.jsx`)

```jsx
// Concetto del controllo lingua all'apertura dell'opera
useEffect(() => {
  const hasSelectedLang = localStorage.getItem('user_lang_selected');
  if (!hasSelectedLang) {
    setShowLanguageModal(true);
  }
}, []);

const handleSelectLanguage = (lang) => {
  i18n.changeLanguage(lang);
  localStorage.setItem('user_lang_selected', 'true');
  setShowLanguageModal(false);
};
```

---

## 7. Programmazione dei Tag NFC

Ciascuno dei 10 tag NFC nei cartellini delle opere deve essere programmato come record **NDEF URI/URL** utilizzando strumenti standard (es. *NFC Tools*):

* **Opera 1 Tag:** `https://mostra-chiesa.app/opera/1`
* **Opera 2 Tag:** `https://mostra-chiesa.app/opera/2`
* ...
* **Opera 10 Tag:** `https://mostra-chiesa.app/opera/10`

> Da definire: modello di tag NFC (consigliato NTAG213 o superiore, capacità sufficiente per un URL breve) e chi si occupa dell'acquisto/scrittura fisica dei tag.

---

## 8. Ottimizzazioni per l'Ambiente Chiesa (Network Limited)

1. **Compressione Audio:** Formato MP3/AAC a bitrate max 96-128 kbps (eccellente per il parlato, file sotto i 2 MB).
2. **Formato Immagini:** Utilizzare `.webp` ottimizzati con ampiezza max 1200px.
3. **PWA Offline Support:** Configurare `vite-plugin-pwa` con `registerType: 'autoUpdate'` e strategie di caching `CacheFirst` per la cartella `assets/`.
4. **Primo accesso:** il service worker richiede almeno un tap con connessione minima (anche debole) per installarsi e mettere in cache gli asset; va verificato che ogni visitatore abbia un minimo di segnale al primissimo tap, altrimenti prevedere un fallback (es. QR/tag che punta a una pagina "leggera" iniziale).

---

## 9. Roadmap di Sviluppo in Antigravity IDE

1. **Step 1:** Inizializzare il progetto Vite React (`npm create vite@latest . -- --template react`).
2. **Step 2:** Installare dipendenze (`npm i react-router-dom i18next react-i18next i18next-browser-languagedetector lucide-react`).
3. **Step 3:** Creare il mock file `src/data/opere.json` con i dati delle 10 opere.
4. **Step 4:** Implementare il router (`/` e `/opera/:id`).
5. **Step 5:** Sviluppare il modal `LanguageModal` e la logica di memorizzazione `localStorage`.
6. **Step 6:** Sviluppare i componenti media (`AudioPlayer`, visualizzazione video/immagini).
7. **Step 7:** Configurare `vite-plugin-pwa` per il supporto offline in chiesa.
