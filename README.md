# Mathe Superheld 🦸‍♂️➕➖

Eine interaktive Mathe-Lern-App für die 2. Klasse, entwickelt mit React und Vite. Die App läuft vollständig client-seitig und ist für die Nutzung auf Tablets und Desktop-PCs optimiert.

🚀 **Live-Demo:** [https://retweetkoerbe.github.io/Mathe-quiz/](https://retweetkoerbe.github.io/Mathe-quiz/)

## 🎮 Spielmodi

### ❤️ Verliebte Zahlen
Trainiert das schnelle Ergänzen auf 10 oder 100 (Herz-Logik).
*   **Ziel:** Finde die fehlende Zahl, damit das Herz "ganz" wird (Summe = 10 oder 100).
*   **Features:** Visuelles Feedback, Herz-Animationen, angepasstes Zahlenfeld.

### 👣 Der Rechenweg
Schrittweises Rechnen mit Zehnerübergang.
*   **Strategie:** "Erst bis zum Zehner, dann den Rest".
*   **Ablauf:** Die App führt das Kind durch die 3 Schritte (bis zum Zehner -> Rest berechnen -> Ergebnis).
*   **Lerneffekt:** Verfestigt das Verständnis für den Zehnerübergang statt bloßem Auswendiglernen.

### 📏 Zahlenstrahl-Detektiv
Schult das Mengenverständnis und die Verortung von Zahlen im Raum (0-100).
*   **Interaktion:** Schiebe den Regler an die vermutete Stelle auf dem Zahlenstrahl.
*   **Feedback:** "Volltreffer", "Knapp daneben" oder "Noch zu weit weg".

## 🛠 Tech Stack

*   **Framework:** [React](https://react.dev/) (v19) mit [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3)
*   **Routing:** `react-router-dom` (HashRouter für GitHub Pages Kompatibilität)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Animationen:** CSS Transitions & `canvas-confetti` für Belohnungen
*   **Deployment:** GitHub Pages (via GitHub Actions)

## 📦 Installation & Entwicklung

Voraussetzung: Node.js (v18+)

1.  **Repository klonen:**
    ```bash
    git clone https://github.com/retweetkoerbe/Mathe-quiz.git
    cd Mathe-quiz
    ```

2.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```

3.  **Lokalen Entwicklungsserver starten:**
    ```bash
    npm run dev
    ```
    Die App ist dann unter `http://localhost:5173` erreichbar.

## 🚀 Deployment

Das Deployment erfolgt automatisch via **GitHub Actions**, sobald auf den `main`-Branch gepusht wird.

*   Workflow-Datei: `.github/workflows/deploy.yml`
*   Build-Befehl: `npm run build` (Erstellt den `dist/` Ordner)
*   Base-URL: Wird in `vite.config.js` dynamisch anhand des Repository-Namens gesetzt.

## 📝 Lizenz

Open Source - viel Spaß beim Lernen und Coden!
