# WebApp Mostra Poloniato — Gestione Server VPS (OVH)

> **VPS:** `193.70.38.117` · Ubuntu · ISPConfig (stesso VPS del progetto Modello_Industriale_3D)
> **Dominio:** `https://poloniato100.art`
> **App:** `/opt/poloniato-2026` — build statica Vite, **nessun processo Node/PM2 a runtime**
> **Document root Apache:** `/var/www/clients/client0/web27` (contenuto = build `dist/`, copiato via rsync)
> **Database:** nessuno (dati statici in `src/data/opere.json`)
> **Accesso SSH:** Putty → `193.70.38.117` porta `22`, utente `ubuntu`
> **Repo:** https://github.com/minuxok/poloniato100 — branch `dev` (attivo), `main` (baseline)

A differenza del progetto Modello_Industriale_3D (Next.js + PM2 + reverse proxy), questa è una **SPA statica**: dopo `npm run build` la cartella `dist/` contiene solo HTML/CSS/JS/asset pronti da servire direttamente con Apache. Non serve nessun processo in ascolto su una porta, nessun PM2, nessun reverse proxy.

---

## Setup iniziale (da fare una sola volta)

### 1. Crea il sito in ISPConfig — farlo per primo

**URL ISPConfig:** `https://193.70.38.117:8080`

1. Crea un nuovo sito web per il dominio `poloniato100.art`.
2. Annota il **document root** che ISPConfig assegna al sito — serve al passo 4. Per `poloniato100.art` è: `/var/www/clients/client0/web27`
3. Tab **SSL** → abilita **Let's Encrypt** per HTTPS automatico.

> ⚠️ HTTPS è obbligatorio: senza SSL attivo non funzionano né il Service Worker (PWA/offline), né l'installabilità dell'app, né — su Android — la Web NFC API.

### 2. Clona il repo sul server

> ⚠️ GitHub non supporta più password via HTTPS. Il repo è privato, quindi prima di clonare:
> - Vai su GitHub → repo → **Settings** → **Danger Zone** → **Change visibility** → **Make public**
> - Clona sul server (30 secondi)
> - Rimetti subito **Make private**
> Nessun segreto nel repo (niente `.env` con credenziali), quindi non c'è rischio.

```bash
cd /opt
sudo git clone https://github.com/minuxok/poloniato100 poloniato-2026
sudo chown -R ubuntu:ubuntu /opt/poloniato-2026
cd /opt/poloniato-2026
git checkout main
```

### 3. Installa le dipendenze e builda

```bash
cd /opt/poloniato-2026
npm install
npm run build
```

Verifica che sia stata creata `/opt/poloniato-2026/dist/` con dentro `index.html`, `assets/`, `manifest.webmanifest`, `sw.js`.

### 4. Pubblica la build nel document root del sito

Copia il contenuto di `dist/` nel document root del sito:

```bash
rsync -a --delete /opt/poloniato-2026/dist/ /var/www/clients/client0/web27/
```

> Usa `rsync --delete` (non `cp`) così ogni deploy rimuove anche i file vecchi non più generati dal build (es. asset con hash cambiato).

Verifica:
```bash
curl -I https://poloniato100.art
```

Se risponde `200 OK` → **il sito è online**.

---

## Operazione più comune — Aggiornare il sito

Ogni volta che fai modifiche in locale e vuoi pubblicarle:

**1. Sul PC (terminale locale):**
```bash
git add -A
git commit -m "descrizione modifiche"
git push origin dev
```
Quando `dev` è pronto per la produzione, merge su `main` e push anche quello.

**2. Su Putty (server):**
```bash
cd /opt/poloniato-2026
git pull origin main
npm install
npm run build
rsync -a --delete dist/ /var/www/clients/client0/web27/
```

Nessun restart di processi necessario — sono file statici, Apache li serve subito. Il Service Worker (Workbox `autoUpdate`) si aggiorna da solo lato client al prossimo caricamento della pagina.

---

## Controllare che il sito funzioni

```bash
curl -I https://poloniato100.art
curl -sI https://poloniato100.art/manifest.webmanifest
```

Se `curl` dà errore di connessione → controlla che Apache sia attivo (`sudo systemctl status apache2`) e che il certificato SSL sia valido.

---

## File importanti sul server

| Percorso | Cosa contiene |
|---|---|
| `/opt/poloniato-2026/` | Sorgente del repo (git), usato solo per fare `npm run build` |
| `/opt/poloniato-2026/dist/` | Output del build, **non è quello che serve Apache** — va copiato nel document root |
| `/var/www/clients/client0/web27/` | Document root reale servito da Apache per `poloniato100.art` |

Nessun `.env` richiesto: il progetto usa dati statici (`src/data/opere.json`), non un database.

---

## ISPConfig — Pannello di controllo

**URL:** `https://193.70.38.117:8080`

Usare ISPConfig per:
- Gestire il sito `poloniato100.art` (DNS, SSL, document root)
- Rinnovare/gestire SSL (tab SSL del sito)
- Vedere i log Apache

---

## Se il sito non risponde — Checklist

1. `curl -I https://poloniato100.art` → risponde?
2. `sudo systemctl status apache2` → Apache è attivo?
3. `sudo systemctl restart apache2` → riavvia Apache se serve
4. Verifica che il document root in ISPConfig punti davvero alla cartella dove hai fatto `rsync` (percorso sbagliato = pagina vuota/404)
5. Controlla la data del certificato SSL nel tab SSL del sito (Let's Encrypt si rinnova da solo, ma può fallire silenziosamente)

---

## Note specifiche di questo progetto

### Routing con HashRouter — attenzione al formato URL dei tag NFC
L'app usa `HashRouter` (non `BrowserRouter`) perché è una build statica senza server-side routing: le route vivono nel frammento `#` dell'URL, non nel path.

**URL corretto per un tag NFC (es. Opera 3):**
```
https://poloniato100.art/#/opera/3
```

❌ **Non** `https://poloniato100.art/opera/3` (senza `#`) — Apache risponderebbe con l'`index.html` va bene lo stesso per il primo caricamento (HashRouter legge comunque l'hash lato client), ma se il tag NFC scrive l'URL senza `#/`, la webapp si apre sulla Home invece che sulla scheda dell'opera. **Scrivere sempre i tag con l'hash incluso.**

Riferimento numerico opere (`src/data/opere.json`, invariato):
| ID | Opera |
|---|---|
| 1 | San Giorgio e il Drago |
| 2 | Madonna con Bambino |
| 3 | Natività |
| 4 | Presepio (80x40cm) |
| 5 | Presepio (50x40cm) |
| 6 | Re Magi |
| 7 | Deposizione (Pannello A) |
| 8 | Deposizione (Pannello B) |
| 9 | Pietà |
| 10 | Risurrezione |

### Perché niente PM2/porta/reverse proxy
A differenza di progetti Next.js sullo stesso VPS (industriale-3d, cultural-invaders, visitnove-api), questa è una Single Page Application client-side pura: React Router gestisce tutto il routing nel browser dopo il primo caricamento di `index.html`. Apache deve solo servire file statici — zero configurazione di proxy, zero porte da gestire, zero rischio di conflitto con le altre app Node sul VPS.

### Service Worker e cache — comportamento dopo un deploy
Il service worker (Workbox, `registerType: 'autoUpdate'`) precachea solo l'app shell (HTML/CSS/JS/icone, non le immagini/audio/video delle opere — quelli restano su cache runtime on-demand, vedi `vite.config.js`). Dopo un deploy, i visitatori che hanno già la PWA installata ricevono l'aggiornamento automaticamente al primo refresh con connessione, senza dover reinstallare nulla.
