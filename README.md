# project-slides
Dieses Repository enthält Präsentationen zum Projekt in Form von Reveal.js-Folien. Die Inhalte werden aus Markdown-Dateien generiert und über GitHub Pages öffentlich bereitgestellt. Ziel ist eine einfache, versionierte und reproduzierbare Veröffentlichung von Präsentationen.

## Lokal starten

Die Reveal-Praesentationen muessen ueber einen HTTP-Server geladen werden, weil Markdown-Dateien wie GenKI2-SemA-ZB/slides.md per Fetch nachgeladen werden.

Empfohlener Startweg in VS Code:

1. Task Start GenKI Slides starten
2. Im Browser http://localhost:8000/GenKI2-SemA-ZB/ oeffnen

Alternativ im Terminal aus diesem Ordner:

python3 -m http.server 8000
