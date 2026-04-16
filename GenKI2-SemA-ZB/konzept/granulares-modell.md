# Granulares JSON-Zwischenformat für Moodle-XML

## Ziel

Dieses Dokument beschreibt ein detailliertes Zwischenformat für die Extraktion von Prüfungsfragen aus PDFs mit dem Ziel, später in Moodle-XML exportieren zu können.

Das Modell ist bewusst granular, um:

- Fehlerursachen besser zu identifizieren
- unterschiedliche Varianten desselben Dokuments abzubilden
- manuelle Nachbearbeitung zu ermöglichen
- die späteren Moodle-spezifischen Exportanforderungen abzubilden

---

## 1. Top-Level-Struktur

```json
{
  "document": {
    "sourceFile": "pruefung_bio.pdf",
    "sourceType": "pdf",
    "pages": 5,
    "version": "1.0"
  },
  "sections": [],
  "questions": []
}
```

- `document`
  - `sourceFile`: Dateiname der Quelldatei
  - `sourceType`: `pdf`, `ocr`, `text`
  - `pages`: Seitenzahl
  - `version`: Schema-/Formatversion

- `sections`
  - optionale Gliederung des Dokuments
  - z. B. Teil A, Themenblock, Seite

- `questions`
  - Liste der extrahierten Fragen/Aufgaben

---

## 2. Frageobjekt

Jede Frage sollte folgende Kernfelder enthalten:

```json
{
  "id": "q-1",
  "name": "Frage 1",
  "type": "multichoice",
  "questionNumber": "1",
  "originalText": "1. Welches ist die Hauptstadt von Frankreich?",
  "recognizedText": "1. Welches ist die Hauptstadt von Frankreich?",
  "questionText": "<p>Welches ist die Hauptstadt von Frankreich?</p>",
  "answers": [],
  "metadata": {}
}
```

- `id`
  - eindeutige Referenz für die Frage
  - wichtig für Mapping und Nachbearbeitung

- `name`
  - interner Name / Kurzbezeichnung
  - notwendig für Moodle `<name>`

- `type`
  - Moodle-kompatibler Fragetyp
  - z. B. `multichoice`, `shortanswer`, `numerical`, `matching`, `truefalse`, `description`

- `questionNumber`
  - Dokumentbezogene Nummerierung oder Kennzeichnung
  - z. B. `1`, `2a`, `3b`

- `originalText`
  - Rohtext aus PDF / OCR / Quelle
  - dient als Audit-Trail

- `recognizedText`
  - bereinigte Parser-Version
  - enthält eventuell korrigierten Text und normalisierte Umbrüche

- `questionText`
  - finale Ausgabeversion
  - verwendet für Vorschau und Export

- `subquestions`
  - optional, falls eine Aufgabe mehrere Unterfragen enthält
  - kann eine Liste von Teilobjekten sein

---

## 3. Antworten

Das Feld `answers` enthält strukturierte Antwortdaten.

### Beispiele

- `multichoice`

  ```json
  "answers": [
    { "text": "Paris", "fraction": 100 },
    { "text": "Berlin", "fraction": 0 }
  ]
  ```

- `shortanswer`

  ```json
  "answers": [
    { "text": "Paris", "fraction": 100, "useCase": false }
  ]
  ```

- `numerical`

  ```json
  "answers": [
    { "text": "3.14", "fraction": 100, "tolerance": 0.01, "toleranceType": "relative" }
  ]
  ```

- `matching`
  ```json
  "answers": [
    { "subquestion": "Bundesstadt der Schweiz", "answer": "Bern" }
  ]
  ```

---

## 4. Medien und Zusatzinhalte

Medien sollten separat erfasst werden, nicht nur im Fließtext.

- `media`
  - Listet eingebettete oder referenzierte Elemente
  - `type`: `image`, `table`, `formula`
  - `source`: `base64`, `path`
  - `caption`
  - `position`

- `table`
  - Kann als strukturierte Matrix (`rows[][]`) gespeichert werden
  - Oder als `html`/`markdown`, wenn das einfacher zu handhaben ist

- `formula`
  - z. B. als LaTeX-String

---

## 5. Metadaten

Metadaten unterstützen Nachbearbeitung und Qualitätsprüfung.

- `confidence`
  - Konfidenzwert für die gesamte Frage oder einzelne Felder

- `parseWarnings`
  - Liste erkannter Probleme

- `sourcePage`
  - Seitenzahl im PDF

- `pdfCoordinates`
  - optional für genaue Zuordnung im Layout

- `originalFormat`
  - `pdf`, `word-export`, `ocr`

- `shuffle`
  - true/false für Multiple Choice

- `single`
  - true/false für MC Single-Choice

- `answernumbering`
  - `abc`, `123`, `none`

- `hidden`
  - 0 / 1

---

## 6. Qualitäts- und Kontrollfelder

Diese Felder sind optional, helfen aber bei Bewertung und Review.

- `validation`
  - `status`: `ok`, `warning`, `error`
  - `issues`: Liste der Prüfhinweise

- `review`
  - `needsReview`: true/false
  - `reviewNotes`

---

## 7. Beispiel eines kompletten Frageobjekts

```json
{
  "id": "q-1",
  "name": "Frage 1",
  "type": "multichoice",
  "questionNumber": "1",
  "originalText": "1. Welches ist die Hauptstadt von Frankreich?",
  "recognizedText": "1. Welches ist die Hauptstadt von Frankreich?",
  "questionText": "<p>Welches ist die Hauptstadt von Frankreich?</p>",
  "answers": [
    { "text": "Paris", "fraction": 100 },
    { "text": "Berlin", "fraction": 0 }
  ],
  "metadata": {
    "confidence": 0.94,
    "sourcePage": 1,
    "shuffle": false,
    "single": true,
    "answernumbering": "abc"
  },
  "validation": {
    "status": "ok",
    "issues": []
  }
}
```

---

## 8. Empfehlung

- Das granulare Modell ist sinnvoll für dein Projekt.
- Es hilft, Parserprobleme sichtbar zu machen und den späteren Moodle-Export sauber zu realisieren.
- Phase 1 kann sich an den minimalen Kernfeldern orientieren, Phase 2 ergänzt dann die granularen Audit- und Review-Felder.
