<a href="https://github.com/dlh-ki-xml">
						<img src="images/logo-pdftoxml.svg" alt="Logo PDTtoXML" style="height: 100px; margin: 0 auto 4rem auto; background: transparent;" class="img-rounded">
					</a>
					<h2>Prüfungen einfach in Moodle transferieren</h2>
					<h5>Zwischenbericht vom Do. 23. April 2026</h5>
					<p>
						<small><a href="mailto:thomas.lampart@students.ffhs.ch">Thomas Lampart  &#124;  <i class="fas fa-envelope-square"></i> thomas.lampart@students.ffhs.ch</a><br><a href="https://www.ffhs.ch">www.ffhs.ch</a>
                        </p>
                        <p>
						<a href="https://www.ffhs.ch">
						<img src="images/logo-ffhs.svg" alt="FFHS-Logo" style="height: 80px; margin: 0 auto 4rem auto; background: transparent;" class="demo-logo">
						</a></small>
					</p>

---

## End-to-End-Ablauf

<div class="mermaid">
<pre>
graph LR
  upload[PDF-Upload] --> input{Dokumenttyp}
  input -->|Scan| ocr[OCR]
  input -->|Digital| text[Direkter Textzugriff]
  ocr --> pipeline[Parser plus LLM]
  text --> pipeline
  pipeline --> preview[JSON-Vorschau pro Aufgabe]
  preview --> decision{Freigabe}
  decision -->|OK| export[Moodle-XML-Export]
  decision -->|Review| revise[KI-gestuetzte Ueberarbeitung]
  revise --> preview
</pre>
</div>

---

## Agenda

1. Problem & IST-Prozess
2. SOLL-Prozess & Zielbild
3. Systemarchitektur
4. KI-Logik & Grenzen
5. Qualität & ROI
6. Phase 1 Scope & nächste Schritte

---

## Das Problem

**Manuelles Einpflegen von Prüfungen in Moodle ist…**

- ⏱️ zeitaufwendig: ~1 Stunde für 10 Fragen
- ❌ fehleranfällig: 5 typische Fehlerquellen
- 🔁 repetitiv: gleiche Schritte für jede Frage

> Prüfungsaufgaben liegen als PDF vor — Moodle erwartet strukturiertes XML.

---

## IST-Prozess (Beispiel Kprim)

Pro Frage **~6 Minuten**, 9 Schritte:

1. PDF öffnen & Frage lesen
2. Moodle: Fragetyp auswählen
3. Aufgabentitel formulieren
4. Fragetext einkopieren
5. Bewertung / Teilpunkte setzen
6. Wahlantworten einkopieren
7. ✍️ **Feedbacks verfassen** ← grösster Zeitfresser
8. Speichern
9. Nächste Frage…

---

## Aufwandtreiber & Fehlerquellen

**Zeitfresser (priorisiert):**

| Rang | Aufwand                 | Warum                    |
| ---- | ----------------------- | ------------------------ |
| 1    | Feedbacks verfassen     | Stehen selten im PDF     |
| 2    | Formeln / Diagramme     | Manueller Nachbau nötig  |
| 3    | Schlechte Scan-Qualität | OCR-Fehler, Layout-Chaos |

**Typische Fehler:**

- ❌ Falsche Antwort als „korrekt" markiert
- ❌ Punkte falsch vergeben
- ❌ Frage falscher Kategorie zugeordnet
- ❌ Unklare Titel → lange Suchzeiten

---

## SOLL-Prozess

<div class="mermaid">
<pre>
graph TD
  pdf[PDF-Upload] --> scan{Scan noetig}
  scan -->|Ja| ocr[OCR als Fallback]
  scan -->|Nein| parse[Direkter Parser-Lauf]
  ocr --> llm[Parser plus LLM]
  parse --> llm
  llm --> json[JSON-Zwischenformat]
  json --> item[Vorschau pro Aufgabe]
  item --> approve{Entscheid}
  approve -->|OK| xml[Export als Moodle-XML]
  approve -->|Review| review[Review mit KI]
  review --> item
</pre>
</div>

**Ziel:** ≤ 15 Minuten für 10 Fragen **(75 % Zeitersparnis)**

---

## SOLL: Designentscheide

| Entscheid                | Beschreibung                                   |
| ------------------------ | ---------------------------------------------- |
| **Vorschau ≠ Review**    | Vorschau = Resultat; Review = optional         |
| **Einzelaufgaben-Logik** | Jede Frage einzeln abschliessen                |
| **Abbruch-Option**       | Auf Frage- und Prozessebene; kein Datenverlust |
| **Titelnomenklatur**     | KI schlägt `[Kurs]-[Thema]-[Typ]-[Nr]` vor     |
| **Feedbacks**            | KI generiert aus Kontext; User prüft           |
| **Tags / Kategorie**     | KI schlägt vor; Lehrperson entscheidet         |

---

## Systemarchitektur

<div class="mermaid">
<pre>
graph TB
  subgraph Benutzer-Interface
    notebook[Jupyter Notebook]
    webui[Spaetere Web UI]
  end

subgraph Parser-Schicht
parsecore[pymupdf]
ocrmod[OCR mit tesseract optional]
media[Bild-Extraktion]
latex[Formeln zu LaTeX]
end

subgraph LLM-Analyse-Schicht
qtype[Fragetyp erkennen]
feedback[Feedbacks generieren]
meta[Titel und Tags vorschlagen]
conf[Confidence Scores]
end

subgraph Moodle-XML-Export
jsonxml[JSON nach XML]
validate[Validierung]
cleanup[Sofortloeschung temporaerer Daten]
end

notebook --> parsecore
webui --> parsecore
parsecore --> qtype
ocrmod --> qtype
media --> qtype
latex --> qtype
qtype --> jsonxml
feedback --> jsonxml
meta --> jsonxml
conf --> validate
jsonxml --> validate
validate --> cleanup

</pre>
</div>

---

## Technologie-Stack Phase 1

| Komponente     | Wahl                | Begründung                        |
| -------------- | ------------------- | --------------------------------- |
| PDF-Parser     | `pymupdf`           | Robust, Bild-Extraktion inklusive |
| OCR (Fallback) | `tesseract`         | Open Source, DE-Support           |
| LLM            | GPT-4o / Claude 3.5 | Struktur- & Textverstehen         |
| Orchestrierung | Direkte API-Calls   | Einfachheit, Phase 1              |
| Notebook       | Jupyter             | Transparent, präsentierbar        |

**Offene Frage:** LangChain / DSPy / OpenClaw evaluieren?
→ Entscheid vor Phase 2

---

## KI-Logik: Was darf die KI?

✅ **Erlaubt:**

- Struktur & Fragetyp erkennen (mit Confidence Score)
- Fehlende Feedbacks aus Kontext ableiten
- Schreibfehler korrigieren
- Titel & Tags vorschlagen (nummeriert: 1 / 2 / 3)
- OCR-Fehler normalisieren

❌ **Nicht erlaubt:**

- Inhalte frei erfinden
- Fragetyp raten → **Vorschläge zeigen** statt raten
- Vorhandene Inhalte umformulieren
- Fragetexte persistent loggen

---

## Fragetypen-Scope

**Phase 1 – automatisch:**
`multichoice` · `truefalse` · `kprime` · `mtf` · `shortanswer` · `match` · `numerical` · `description` · `cloze` · `ordering`

**Manueller Fallback (alle Phasen):**
`essay` · `drawing` · `ddimageortext` · `molsimilarity`

**Lernkurve:**

- Start: statische Few-Shot-Prompts
- Ab PDF 3: User-Korrekturen → neue Beispiele
- Phase 2: automatische Prompt-Anpassung

---

## Qualität messbar machen

| Dimension                  | Standard | Mathe/Chemie |
| -------------------------- | -------- | ------------ |
| Struktur (Aufgabengrenzen) | ≥ 95 %   | ≥ 97 %       |
| Fragetyp (klassifiziert)   | ≥ 90 %   | ≥ 94 %       |
| Antworten (vollständig)    | ≥ 85 %   | ≥ 92 %       |
| Bilder / Tabellen          | ≥ 80 %   | ≥ 88 %       |

**Schwellwerte:**

- ✅ ≥ 90 % → automatisch akzeptiert
- ⚠️ 70–89 % → User-Review
- ❌ < 70 % → Abbruch + Fehlermeldung

<div class="mermaid">
<pre>
graph LR
  score[Confidence Score] --> gate{Grenzwert}
  gate -->|ab 90 Prozent| accept[Automatisch akzeptieren]
  gate -->|70 bis 89 Prozent| review[User-Review]
  gate -->|unter 70 Prozent| reject[Abbruch plus Fehlermeldung]
</pre>
</div>

---

## ROI-Berechnung

| Szenario     | IST    | SOLL   | Ersparnis | Faktor |
| ------------ | ------ | ------ | --------- | ------ |
| Optimistisch | 60 Min | 10 Min | 50 Min    | **6×** |
| Realistisch  | 60 Min | 15 Min | 45 Min    | **4×** |
| Break-Even   | 60 Min | 30 Min | 30 Min    | **2×** |

**Annahmen (explizit):**

- IST-Baseline: ~60 Min / 10 Fragen (Angabe Lehrperson)
- Break-Even: ab >30 Min User-Review → Tool nicht mehr lohnend
- Nicht monetär: weniger Fehler, konsistente Titel, bessere Feedbacks

---

## Phase 1: Scope & Grenzen

**Minimalset (Seminararbeit):**

- **2 PDFs**: sauberes PDF (Stufe A) + LaTeX/Bilder (Stufe B/E)
- **3 Fragetypen**: `kprime` + `multichoice` + 1 weiterer
- **Ziel**: Je Kombination 3 Fragen → ~18 dokumentierte Testfälle

**Bewusste Ausschlüsse Phase 1:**

- ❌ Handschriftliche Scans
- ❌ `essay`, `drawing`, `ddimageortext`
- ❌ Direktimport in Moodle (nur XML-Export)
- ❌ Produktions-UI / Barrierefreiheit

---

## Nächste Schritte

| Schritt                                  | Priorität |
| ---------------------------------------- | --------- |
| Testdaten: 2 PDFs auswählen              | 🔴        |
| JSON-Schema v1.0 implementieren          | 🔴        |
| PDF-Parser aufsetzen (pymupdf)           | 🔴        |
| LLM-Prompts für Fragetyp-Klassifikation  | 🔴        |
| Few-Shot-Beispiele definieren            | 🔴        |
| JSON → Moodle-XML Konverter              | 🟡        |
| Testläufe + Fehlerrate dokumentieren     | 🟡        |
| AI-Framework-Evaluation (LangChain/DSPy) | 🔵        |

**Geschätzter Aufwand Phase 1: ~20–30h**

---

## Zusammenfassung

- **Problem:** 1h manueller Aufwand / 10 Fragen → zu langsam, zu fehleranfällig
- **Lösung:** KI-gestützter Prozess PDF → JSON → Moodle-XML
- **Ziel:** ≤ 15 Min, 4× schneller, weniger Fehler
- **Phase 1:** Jupyter Notebook PoC, 18 Testfälle, dokumentierte Grenzen
- **Nächste Blockpräsentation:** Beispieloutputs + funktionierende Pipeline

<br>

**Fragen? 💬**
