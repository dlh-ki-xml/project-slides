# Implementierungskonzept: KI-gestützte PDF-zu-Moodle-Konvertierung

**Stand:** 14. April 2026
**Version:** 1.0
**Bezug:** Seminararbeit GenKI2-SemA-ZB
**Basis:** [prekonzept.md](prekonzept.md) – vollständig beantwortete Klärungsrunde (Blöcke 1–8)

---

## 1. Ausgangslage: IST-Prozess

### 1.1 Ablauf (manuell)

Pro Frage (Beispiel Kprim-Aufgabe):

1. PDF öffnen
2. Frage lesen & verstehen
3. In Moodle: Fragetyp auswählen und hinzufügen
4. Aufgabentitel formulieren
5. Aufgabentext (Stamm) reinkopieren
6. Bewertung → Teilpunkte anwählen
7. Wahlantworten reinkopieren
8. **Feedbacks zu den Wahlantworten verfassen** ← grösster Zeitfresser
9. Speichern → nächste Frage

**Gesamtaufwand:** ~1 Stunde für 10 Fragen (ca. 6 Min/Frage)

### 1.2 Aufwandtreiber (priorisiert)

| Rang | Aufwandtreiber                    | Auswirkung                                                     |
| ---- | --------------------------------- | -------------------------------------------------------------- |
| 1    | **Feedbacks verfassen**           | Stehen selten 1:1 im PDF; müssen inhaltlich erschlossen werden |
| 2    | **Chemische Formeln / Diagramme** | Manueller Nachbau oder Bild-Einbettung nötig                   |
| 3    | **Schlechte Dokumentqualität**    | OCR-Fehler, Layout-Chaos erfordern Korrekturen                 |
| 4    | **Barrierefreiheit** (zukünftig)  | Alt-Texte, lesbare Formeln → Phase 2                           |

### 1.3 Typische Fehlerquellen

- ❌ Falsche Antwort als „korrekt" markiert
- ❌ Punkte falsch vergeben
- ❌ Frage falschem Kurs / falscher Kategorie zugeordnet
- ❌ Tippfehler im Fragetext
- ❌ Lange Suchzeiten wegen unklarer / inkonsistenter Fragetitel

---

## 2. Zielbild: SOLL-Prozess

### 2.1 Prozessablauf

```
[PDF-Upload]
    │
    ▼
[OCR – bedingt, nur bei Scans]
    │
    ▼
[Parser + LLM-Analyse]
    → Struktur erkennen (Nummerierungen, Layout)
    → Fragetyp klassifizieren
    → Inhalte extrahieren (Text, Bild, Formeln)
    → Confidence Scores pro Feld generieren
    → Fehlende Felder aus Kontext ableiten (Feedback, Titel, Tags)
    │
    ▼
[JSON-Zwischenformat]
    │
    ▼ pro Aufgabe:
[Vorschau] ──► Aufgabe OK? ──► [direkt Export]
    │                               │
    │ nicht OK                      │
    ▼                               │
[Review mit KI]                     │
    - Inhalte präzisieren           │
    - Titelvorschlag bestätigen     │
    - Tags prüfen / anpassen        │
    - Kategorie zuweisen            │
    - Bild-Zuordnung korrigieren    │
    │                               │
    ▼                               │
[Export dieser Aufgabe] ◄───────────┘
    │
    ▼ (weiter bis alle Aufgaben verarbeitet)
[Gesamtexport: Moodle-XML-Set]
```

**Zielaufwand:** ≤15 Min für 10 Fragen (inkl. Review)
**Zeitersparnis:** ~75% gegenüber IST

### 2.2 Wichtige Designentscheide

| Entscheid                | Beschreibung                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Vorschau ≠ Review**    | Vorschau zeigt vorläufiges Resultat; Review ist optionaler Verbesserungsschritt                      |
| **Einzelaufgaben-Logik** | Jede Aufgabe wird einzeln abgeschlossen, bevor die nächste kommt                                     |
| **Abbruch-Option**       | Button auf Frage-Ebene (überspringen) und Prozess-Ebene (ganzen Import abbrechen); kein Datenverlust |
| **Kategorie-Zuweisung**  | Nach dem Review; Lehrperson entscheidet über Einordnung in Moodle-Datenbank                          |
| **Titelnomenklatur**     | KI schlägt konsistentes Schema vor z.B. `[Kurs]-[Thema]-[Fragetyp]-[Nr]`; User hat letztes Wort      |
| **Tags**                 | KI schlägt vor, User bestätigt; erleichtern Suche/Sortierung in Moodle                               |
| **Break-Even**           | Tool lohnt sich wenn Review <15–20 Min; bei >30 Min wird manuelles Arbeiten konkurrenzfähig          |

---

## 3. Systemarchitektur

### 3.1 Komponentenübersicht

```
┌─────────────────────────────────────────────────────────┐
│                     Benutzer-Interface                   │
│              (Jupyter Notebook / Web UI Phase 2)         │
└───────────────────────┬─────────────────────────────────┘
                        │ PDF-Upload (verschlüsselt)
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    Parser-Schicht                        │
│  pdfminer / pymupdf  │  OCR: tesseract (bedingt)        │
│  Bild-Extraktion     │  Formel-Erkennung → LaTeX        │
└───────────────────────┬─────────────────────────────────┘
                        │ Rohtext + Medien
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    LLM-Analyse-Schicht                   │
│  Fragetyp-Klassifikation  │  Struktur-Erkennung         │
│  Confidence Scores        │  Feedback-Generierung        │
│  Few-Shot-Prompts         │  Tag- / Titel-Vorschläge     │
│  Orchestrierung: direkte API-Calls (Phase 1)            │
│  oder: LangChain / DSPy (Phase 2, Evaluation nötig)     │
└───────────────────────┬─────────────────────────────────┘
                        │ strukturiertes JSON
                        ▼
┌─────────────────────────────────────────────────────────┐
│                JSON-Zwischenformat (v1.0)                │
│  id, originalText, recognizedText, sections,            │
│  questions, answers, media, confidence, metadata        │
└───────────────────────┬─────────────────────────────────┘
                        │ nach Review + Export
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  Moodle-XML-Export                       │
│  Konverter JSON → XML  │  Alle Fragetypen Phase 1       │
│  Validierung           │  Sofortlöschung temp. Daten    │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Technologie-Entscheide Phase 1

| Komponente     | Empfehlung                              | Begründung                                           |
| -------------- | --------------------------------------- | ---------------------------------------------------- |
| PDF-Parsing    | `pymupdf` (fitz)                        | Robust, schnell, Bild-Extraktion inklusive           |
| OCR (Fallback) | `tesseract` + `pytesseract`             | Open Source, gute DE-Unterstützung                   |
| LLM            | GPT-4o oder Claude 3.5 via API          | Stärken bei Strukturerkennung + Textverstehen        |
| Orchestrierung | Direkte API-Calls (Phase 1)             | Einfachheit; LangChain/DSPy in Phase 2 evaluieren    |
| Notebook       | Jupyter Notebook                        | Rapid Prototyping, transparent, leicht präsentierbar |
| JSON-Schema    | Eigenes Schema v1.0 (siehe Abschnitt 4) | Kontrollierbar, erweiterbar                          |
| XML-Export     | Eigener Konverter                       | Direkte Kontrolle über Moodle-XML-Format             |

---

## 4. JSON-Zwischenformat (Schema v1.0)

```json
{
  "version": "1.0",
  "sourceFile": "pruefung_2026.pdf",
  "processedAt": "2026-04-14T10:00:00Z",
  "questions": [
    {
      "id": "q001",
      "originalText": "Welche der folgenden Aussagen ist korrekt?",
      "recognizedText": "Welche der folgenden Aussagen ist korrekt?",
      "type": "kprime",
      "typeConfidence": 0.92,
      "status": "auto",
      "completeness": 85,
      "title": "Biologie-Zellbiologie-Kprim-001",
      "tags": ["Zellbiologie", "Mitose", "Kprim"],
      "points": 1.0,
      "answers": [
        {
          "id": "a001",
          "text": "Die Mitose erzeugt zwei genetisch identische Tochterzellen.",
          "correct": true,
          "confidence": 0.88,
          "feedback": "Korrekt. Die Mitose ist eine Zellteilung..."
        }
      ],
      "media": [
        {
          "type": "image",
          "data": "<base64>",
          "altText": "",
          "assignedTo": "q001"
        }
      ],
      "flags": []
    }
  ]
}
```

**Schlüsselfelder:**

| Feld               | Beschreibung                                                                     |
| ------------------ | -------------------------------------------------------------------------------- |
| `typeConfidence`   | 0.0–1.0; ≥0.9 = auto-accept, 0.7–0.9 = User-Review, <0.7 = Flag                  |
| `status`           | `auto` = sicher erkannt, `probable` = wahrscheinlich, `manual` = manuell gesetzt |
| `completeness`     | 0–100%; 100% = alle Felder ausgefüllt                                            |
| `flags`            | Array mit aktiven Warnungen z.B. `["lowConfidence", "missingFeedback"]`          |
| `media.assignedTo` | ID der zugehörigen Frage (korrigierbar im Review)                                |

---

## 5. KI-Logik und Grenzen

### 5.1 Was das LLM darf

- Struktur erkennen (Nummerierungen, Formatierung, Tabellenstruktur)
- Fragetyp klassifizieren (mit Confidence Score)
- Fehlende Felder aus Kontext ableiten: Feedbacks, Lösungshinweise, Tags, Titel
- OCR-Fehler normalisieren (mit User-Rückfrage bei substanziellen Änderungen)
- Schreibfehler korrigieren
- Nummerierte Vorschläge machen (1 / 2 / 3 + Freitext-Option)

### 5.2 Was das LLM nicht darf

- Inhalte frei erfinden ohne Rückfrage
- Vorhandene Inhalte umformulieren
- Fragetyp ohne Rückfrage raten – stattdessen: Vorschläge zeigen
- Persistentes Logging von Fragetexten im Klartext

### 5.3 Lernkurve (Few-Shot)

```
Phase 1 (Start):      Statische Prompts + Beispiele (2–3 Referenzfragen pro Typ)
Phase 1 (Kalibrierung): PDF 1–2 = Baseline messen, Prompts anpassen
Phase 1 (produktiv):  Ab PDF 3 zählen Metriken; jede User-Korrektur → neues Few-Shot-Beispiel
Phase 2:              Automatische Prompt-Anpassung nach 5 PDFs; Fach-Tracking einführen
```

### 5.4 Fragetypen-Scope

**Automatisch (Phase 1):**
`multichoice`, `truefalse`, `kprime`, `mtf`, `shortanswer`, `match`, `numerical`, `description`, `cloze`, `ordering`, `calculatedsimple`, `wordselect`, `randomsamatch`

**Manueller Fallback:**
`ddimageortext`, `ddmarker`, `ddwtos`, `drawing`, `essay`, `calculatedmulti`, `molsimilarity`

---

## 6. Qualitätsmetriken

### 6.1 Zielwerte

| Dimension                             | Standard | Mathe/Chemie/Physik | Biologie/Medizin |
| ------------------------------------- | -------- | ------------------- | ---------------- |
| Struktur (Aufgabengrenzen)            | ≥95%     | ≥97%                | ≥98%             |
| Fragetyp (korrekt klassifiziert)      | ≥90%     | ≥94%                | ≥93%             |
| Antworten (vollständig + korrekt)     | ≥85%     | ≥92%                | ≥89%             |
| Bilder/Tabellen (korrekt verarbeitet) | ≥80%     | ≥88%                | ≥84%             |

### 6.2 Schwellwerte & Aktionen

| Ergebnis       | Schwelle                       | Aktion                                                   |
| -------------- | ------------------------------ | -------------------------------------------------------- |
| ✅ Auto-Accept | ≥90% (Standard) / ≥93% (Mathe) | Direkt exportierbar                                      |
| ⚠️ User-Review | 70–89% / 80–92%                | Flag + Meldung: „N Fehler gefunden"                      |
| ❌ Abbruch     | <70% / <80%                    | „Qualität zu niedrig – Prompt anpassen oder Manual-Mode" |

### 6.3 Messmethode

- **Automatisch:** Confidence Scores pro Feld; Vergleich Output-JSON vs. Referenz (Precision/Recall)
- **Manuell:** User-Review vor Export; 3er-Skala (korrekt / teilweise / falsch)
- **Baseline:** Erste 2 PDFs = Kalibrierung (zählen nicht für Metriken)
- **Fach-Tracking:** Genauigkeit getrennt nach Fach und Fragetyp speichern

---

## 7. ROI-Berechnung

### 7.1 Annahmen (explizit)

| Parameter           | Wert                         | Quelle                               |
| ------------------- | ---------------------------- | ------------------------------------ |
| IST-Aufwand         | ~60 Min / 10 Fragen          | Angabe Lehrperson                    |
| SOLL-Aufwand (Ziel) | ≤15 Min / 10 Fragen          | inkl. Review                         |
| Break-Even          | 30 Min / 10 Fragen           | ab hier wird manuell konkurrenzfähig |
| Varianz             | je nach User-Geschwindigkeit | kein Messkriterium                   |

### 7.2 ROI-Tabelle

| Szenario                    | IST    | SOLL    | Ersparnis | Faktor             |
| --------------------------- | ------ | ------- | --------- | ------------------ |
| Optimistisch (wenig Review) | 60 Min | 10 Min  | 50 Min    | 6× schneller       |
| Realistisch                 | 60 Min | 15 Min  | 45 Min    | 4× schneller       |
| Break-Even                  | 60 Min | 30 Min  | 30 Min    | 2× schneller       |
| Tool langsamer als IST      | 60 Min | >60 Min | negativ   | → Abbruch/Fallback |

### 7.3 Nicht-monetäre Vorteile

- Weniger Fehler (5 typische Fehlerquellen reduziert, vgl. Block 5)
- Konsistente Fragetitel → schnellere Suche in Moodle-Datenbank
- KI-generierte Feedbacks als Ausgangsbasis → reduziert grössten Einzelaufwand
- Dokumentierte Qualitätsmetriken → nachweisbar gegenüber Schulleitung

---

## 8. Risikolandkarte

| Risiko                                            | Wahrscheinlichkeit | Auswirkung | Massnahme                                                |
| ------------------------------------------------- | ------------------ | ---------- | -------------------------------------------------------- |
| OCR-Qualität bei Scans unzureichend               | mittel             | hoch       | Phase 1 nur saubere PDFs; Scans Phase 2                  |
| LLM erkennt Fragetyp falsch                       | mittel             | mittel     | Confidence-Flagging + Vorschlagsmodus                    |
| Feedbacks qualitativ unbrauchbar                  | mittel             | mittel     | User-Review obligatorisch vor Export                     |
| Chemische Formeln falsch konvertiert              | hoch               | hoch       | Formeln als Bild einbetten (Fallback)                    |
| API-Kosten steigen unerwartet                     | niedrig            | mittel     | Lokales Modell als Fallback evaluieren (Phase 2)         |
| Prüfungsinhalte geleakt                           | niedrig            | sehr hoch  | HTTPS, sofortige Löschung, geschlossene Cloud            |
| Tool langsamer als IST (Break-Even überschritten) | niedrig            | hoch       | Abbruch-Button vorhanden; IST-Fallback jederzeit möglich |
| Fragetyp in Phase 1 nicht abgedeckt               | niedrig            | niedrig    | Manueller Fallback für alle 21 Typen definiert           |

---

## 9. Systemgrenzen Phase 1

### 9.1 Test-Setup (3 Dimensionen)

**Dokument-Stufen:**

- **Stufe A** (Pflicht): Maschinell erstelltes PDF → Baseline
- **Stufe B/E** (Pflicht): LaTeX-PDF mit Formeln ODER PDF mit Bildern/Diagrammen
- **Stufen C/D** (optional): Scans / Word-Chaos (nur wenn Zeit vorhanden)

**Fragetypen:**

- 🔴 Pflicht: `kprime`, `multichoice`, `truefalse`
- 🟡 Optional: `match`, `shortanswer`, `numerical`

**Inhaltskomplexität:** Einfach (nur Text) → Mittel (Text + Bild) → Komplex (Formeln)

**Minimalset:** 2 PDFs × 3 Fragetypen × 3 Fragen = ~18 dokumentierte Testfälle

### 9.2 Bewusste Ausschlüsse

| Ausschluss                          | Begründung                                   | Ziel-Phase                |
| ----------------------------------- | -------------------------------------------- | ------------------------- |
| Handschriftliche Scans              | OCR unzuverlässig                            | Phase 2                   |
| `essay`, `drawing`, `ddimageortext` | Manueller Fallback; kein Auto-Scope sinnvoll | Phase 2                   |
| Direktimport in Moodle              | Nur XML-Export Phase 1                       | Phase 2 (Moodle REST API) |
| Barrierefreiheit / Alt-Texte        | Zusatzaufwand, zukünftige Anforderung        | Phase 2                   |
| Produktions-UI                      | Jupyter Notebook reicht für Seminararbeit    | Phase 2                   |

---

## 10. Roadmap Phase 1

### 10.1 Deliverables Seminararbeit

**Block 2 (Teil 1 – Präsentation):**

- IST vs. SOLL Prozessanalyse (mit Zeiten + Fehlerquellen)
- Grobe Architekturübersicht (Komponentendiagramm)
- Erste Einschätzung: direkte API-Calls vs. AI-Workflow-Framework (LangChain / DSPy / OpenClaw)
- ROI-Skizze mit Annahmen

**Block 4 (Teil 2 – Umsetzung):**

- Jupyter Notebook (lauffähiger Proof-of-Concept)
- Dokumentierte Prompts (kommentiert, mit Few-Shot-Beispielen)
- Beispieloutputs: PDF → JSON → Moodle-XML (3–5 Fragen annotiert)
- Tabelle: IST-Fehlerquellen vs. SOLL-Abdeckung durch Tool
- Erkannte LLM-Grenzen dokumentiert

### 10.2 Konkrete nächste Schritte

| Schritt                                                                     | Priorität  | Aufwand |
| --------------------------------------------------------------------------- | ---------- | ------- |
| 1. Testdaten vorbereiten: 2 PDFs (Stufe A + B/E) mit je 10 Fragen auswählen | 🔴 hoch    | 1–2h    |
| 2. JSON-Schema v1.0 implementieren (Python-Dataclass oder Pydantic)         | 🔴 hoch    | 2–3h    |
| 3. PDF-Parser aufsetzen (pymupdf), Text und Bilder extrahieren              | 🔴 hoch    | 3–4h    |
| 4. Ersten LLM-Prompt für Fragetyp-Klassifikation schreiben und testen       | 🔴 hoch    | 2–3h    |
| 5. Few-Shot-Beispiele für `kprime`, `multichoice`, `truefalse` definieren   | 🔴 hoch    | 2–3h    |
| 6. JSON → Moodle-XML Konverter implementieren                               | 🟡 mittel  | 3–4h    |
| 7. Erste Testläufe mit Minimalset (18 Fragen) durchführen                   | 🟡 mittel  | 2–3h    |
| 8. Fehlerrate dokumentieren → Qualitätsmetriken befüllen                    | 🟡 mittel  | 1–2h    |
| 9. AI-Workflow-Frameworks evaluieren (LangChain vs. DSPy vs. direkt)        | 🔵 niedrig | 2–3h    |
| 10. Präsentation Block 2 vorbereiten                                        | 🔵 niedrig | 2–3h    |

**Gesamtaufwand Phase 1 (geschätzt):** ~20–30h

---

## 11. Datenschutz & Sicherheit

| Aspekt            | Massnahme                                                     |
| ----------------- | ------------------------------------------------------------- |
| Upload            | HTTPS / TLS verschlüsselt                                     |
| Cloud-Architektur | Geschlossene Umgebung; keine passive Aussenwelt-Kommunikation |
| Temporäre Dateien | Sofortige Löschung nach Export (PDF, JSON, Logs)              |
| Logging           | Kein Klartext-Logging von Frageinhalten in persistenten Logs  |
| Zugang            | Nur auf Befehl des Users → kein Caching über Session hinaus   |
| Phase 1           | Lokal (Jupyter Notebook) → Datenschutz trivial gelöst         |

---

## 12. Offene Punkte (bewusst zurückgestellt)

| Thema                                               | Status                           | Ziel-Phase          |
| --------------------------------------------------- | -------------------------------- | ------------------- |
| Barrierefreiheit (Alt-Texte, lesbare Formeln)       | Dokumentiert, nicht im Scope     | Phase 2             |
| AI-Workflow-Framework (LangChain / DSPy / OpenClaw) | Evaluation ausstehend            | Phase 1/2 Entscheid |
| Direktimport Moodle (REST API)                      | Definiert, nicht implementiert   | Phase 2             |
| Produktions-UI                                      | Nicht erwartet für Seminararbeit | Phase 2             |
| Handschriftliche Scans                              | Zu unzuverlässig                 | Phase 2             |

---

## 📎 Referenzen

- [prekonzept.md](prekonzept.md) — Klärungsgrundlage (alle 8 Blöcke beantwortet)
- [granulares-modell.md](granulares-modell.md) — JSON-Schema Details
- [auftrag-und-prompt/moodle_quiz_template_comprehensive_v4.xml](../auftrag-und-prompt/moodle_quiz_template_comprehensive_v4.xml) — XML-Vorlage alle Typen
- [project-docs/design/architekturentwurf.md](../../project-docs/design/architekturentwurf.md) — Architekturmodell
- [2026-04-10-LN-Auftrag-1.md](../auftrag-und-prompt/2026-04-10-LN-Auftrag-1.md) — Prüfungsauftrag
