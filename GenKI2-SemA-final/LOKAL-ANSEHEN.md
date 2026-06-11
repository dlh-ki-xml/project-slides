# Folien lokal im Browser ansehen

Die Reveal.js-Folien muessen ueber einen lokalen HTTP-Server geoeffnet werden.
Nicht direkt die `index.html` per Dateiklick oeffnen, weil `slides.md` im Browser per `fetch` nachgeladen wird.

## Starten

Im Terminal in den Ordner `project-slides` wechseln:

```bash
cd /home/thomas/Dokumente/01-Arbeit/011-Strickhof/60-DLH/dlh-ki-xml/project-slides
python3 -m http.server 8000
```

Danach im Browser oeffnen:

```text
http://localhost:8000/GenKI2-SemA-final/
```

## Falls Port 8000 belegt ist

```bash
python3 -m http.server 8001
```

Dann im Browser:

```text
http://localhost:8001/GenKI2-SemA-final/
```

## Nuetzliche Bedienung

- Pfeiltasten: Folien wechseln
- `Esc`: Uebersicht
- `S`: Speaker-Notes in separatem Fenster
- `F`: Vollbild, falls vom Browser unterstuetzt
