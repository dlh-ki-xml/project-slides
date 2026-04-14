# Prekonzept: Offene Fragen und Klärungsbedarf

**Stand:** 14. April 2026
**Status:** Explorationsfragen für Konzepterstellung
**Bezug:** Seminararbeit GenKI2-SemA-ZB, Auftrag 2026-04-10-LN-Auftrag-1.md

---

## 📌 Kontext

Dieses Dokument katalogisiert die **offenen Punkte**, die geklärt werden müssen, bevor ein vollständiges Implementierungskonzept entsteht.

Basis sind:

- Beantwortete Fragen in [Vorgehen.md](../auftrag-und-prompt/Vorgehen.md)
- Research und Architekturentwürfe aus [project-docs/](../../project-docs/)
- Der Auftrag: praktisches Optimierungsprojekt für Bildung

---

## 1️⃣ JSON-Zwischenformat konkret

### Problem

Das Zwischenformat ist der zentrale Stabilitätsanker, aber zu abstrakt definiert.

> Genau, wie kommen wir verlässlich von unstrukturiertem PDF zu einem klaren, maschinenlesbaren Format, das alle notwendigen Informationen enthält, aber nicht überfrachtet ist? Und wie gehen wir mit Unsicherheiten und Medien um? Die Firma Parseur (https://parseur.com/de/blog/was-ist-ein-pdf-parser) verwendet drei Ansätze: 1) Template-basiert, 2) KI-gestützt, 3) Regelbasiert. Welcher Ansatz ist für unser Problem am besten geeignet? Und wie sieht das konkrete JSON-Schema aus, das wir anstreben? Es muss so gestaltet sein, dass es sowohl die Anforderungen der KI-Analyse als auch die Bedürfnisse der Lehrperson für die Vorschau erfüllt.

### Offene Punkte

- **Welche Felder werden minimal extrahiert?**
  - Beispiel: `id`, `text`, `type`, `answers`, `metadata`?
    >
  - Oder granularer: `id`, `originalText`, `recognizedText`, `sections`, `questions`, `answers`?

  > Siehe dazu auch: [granulares-modell.md](granulares-modell.md)

- **Behandlung von Unsicherheit**
  - Confidence Score pro Feld?
    - Typischerweise 0.0–1.0 (1.0 = 100% sicher)
    - Schwellen: ≥0.9 (hoch), 0.7–0.9 (mittel), <0.7 (niedrig)
    - Feld-Beispiele: questionText 0.85–0.95, type 0.70–0.85, answers 0.75–0.90
  - Kennzeichnung „automatisch erkannt" vs. „wahrscheinlich"?
    - Flag wie `autoRecognized: true/false` oder `status: 'auto'/'probable'`
    - Hilft, zwischen sicherer Erkennung und Schätzung zu unterscheiden
  - Fallback-Verhalten bei hoher Unsicherheit?
    - Bei Confidence <0.7: Flag für manuelle Prüfung setzen
    - Bei <0.5: Abbruch oder Standardwert (z.B. type='unknown')

- **Handhabung von Medien**
  - Bilder: eingebettet (Base64) oder referenziert (Pfad)?
    - Empfehlung: Base64 (selbstständig, einfach zu löschen, aber größer)
  - Tabellen: als JSON-Struktur, als Markdown oder original-HTML?
    - Empfehlung: JSON-Struktur (maschinenlesbar, skalierbar; alternativ Markdown für Einfachheit)
  - Formeln: LaTeX-String oder normalisiert?
    - Empfehlung: LaTeX-String (Moodle-kompatibel, behält Genauigkeit)

- **Versioning des Formats**
  - Gibt es ein Versionsfeld?
    - Empfehlung: Ja, einfaches Feld wie "version": "1.0" (für Schema-Kompatibilität)
  - Wie skaliert die Struktur später?
    - Empfehlung: Optionale Felder hinzufügen, backward-compatible (z.B. neue Metadaten ohne alte zu brechen)

---

## 2️⃣ KI-Rolle präzisieren

### Problem

Zu unklar, was die LLM macht und was nicht.

### Offene Punkte

- **Scope der LLM-Aufgabe**
  - Erkennt sie **nur** Struktur + Fragetyp?
  - Oder auch: Antworten klassifizieren, fehlende Antworten ergänzen?
  - Oder auch: Qualitätskontrolle / Flagging zweifelhafter Fragen?
    - Ergänzung: Das LLM soll anhand der Struktur (Nummerierungen, Formatierung), der Inhalte (Text, Bild, Linien) und des konkreten Textes (z.B. Fragen, die einen Hinweis geben auf den Fragetypen), also allen zur Verfügung stehenden Attribute, den Inhalt möglichst genau übernehmen. Fehlende Antworten ergänzen. Beschriftung der Frage aus den Informationen ableiten, sowie auch Tags. Wenn Inhalte verbessert werden können, wird der:die User:in gefragt und vorschläge gezeigt. Fragen, bei denen Strukturelemente oder Felder leer bleiben werden mit einer Prozentangabe versehen -> 100% ist fertig, alle möglichen Felder sind ausgefüllt.
    - Meine Ergänzung: LLM darf keine Inhalte erfinden (nur aus vorhandenen Daten ableiten). Confidence Scores pro Feld generieren. Bei Unsicherheit >80% automatisch akzeptieren, sonst User-Review.

- **Explizite Grenzen**
  - Was darf die LLM **nicht** tun?
    - Inhalte frei erfinden und diese ohne Rückfrage setzen.
  - Originaltext normalisieren? → (ja oder nein)
    - Ja, für OCR-Fehler und Layout, aber User fragen bei Änderungen.
  - Inhalte ergänzen / umformulieren? → (ja oder nein)
    - Inhalte umformulieren nicht, aber Schreibfehler korrigieren schon. Keine Inhalte ergänzen, wenn Inhalte vorhanden sind. Wenn keine Inhalte vorhanden sind, wie bei den Feedbacks oder Lösungen, dann diese erstellen.
  - Typen „raten" bei völliger Unsicherheit? → (ja oder nein)
    - nicht raten, sondern vorschläge machen und diese durch den:die user:in annehmen oder ablehnen lassen.

- **Lernkurve**
  - Verbesserung die LLM durch Feedback (z.B. Few-Shot-Learning)?
    - Ja, Few-Shot-Learning mit User-Feedback. Statische Prompts für Start, aber Feedback-Loop für iterative Verbesserung (z.B. korrigierte Beispiele hinzufügen). Für Seminarprojekt: Prototyp mit Feedback-Integration, um LLM anzupassen.
  - Oder statische Prompts?

- **Fragetyp-Automatisierbarkeit**
  - Welche Typen sind zuverlässig? (MC > offene Fragen?)
    - Alle Fragetypen in moodle_quiz_reference_all_types_v3.xml sowie alle Standard-Fragetypen der aktuellsten Moodle-Version. Empfehlung: Zuverlässig: multichoice, truefalse, shortanswer, match. Weniger: essay, drawing, wordselect (aufgrund Komplexität/Bilder).
  - Welche Typen brauchen Mensch?
    - Wahrscheinlich alle Typen, die mit Drag-and-Drop arbeiten. Als z.B. wenn auf einem Bild oder Abb. Strukturen beschriftet werden sollen. Zusätzlich: drawing, wordselect mit Bildern, essay (subjektive Bewertung).
  - Gibt es Hochrisiko-Typen?
    - Erklärung: Hochrisiko-Typen sind Fragetypen, bei denen Fehler kritisch sind (z.B. falsche Klassifizierung führt zu schlechten Lernoutcomes oder manueller Nacharbeit). Beispiele: essay (subjektiv, braucht menschliche Bewertung), drawing (manuell, OCR-Probleme), wordselect mit komplexen Bildern.

### Übersicht: Alle Moodle-Fragetypen & Automatisierbarkeit

| Fragetyp                           | Moodle-Type                  | Automatisierbarkeit | Aufwand LLM  | Aufwand Mensch          | Best Practice                                            |
| ---------------------------------- | ---------------------------- | ------------------- | ------------ | ----------------------- | -------------------------------------------------------- |
| **Multiple Choice**                | `multichoice`                | ⭐⭐⭐⭐⭐ hoch     | niedrig      | sehr niedrig            | Basis-Fragetyp, zuverlässig, robust                      |
| **Wahr/Falsch**                    | `truefalse`                  | ⭐⭐⭐⭐⭐ hoch     | sehr niedrig | sehr niedrig            | Einfach, schnell, gut für Vorwissen                      |
| **Kurzantwort**                    | `shortanswer`                | ⭐⭐⭐⭐ hoch       | niedrig      | mittel (Review möglich) | Flexibel, aber Text-Matching kritisch                    |
| **Zuordnung**                      | `match`                      | ⭐⭐⭐⭐ hoch       | mittel       | sehr niedrig            | Gutes Preis-Leistungs-Verhältnis                         |
| **Numerisch**                      | `numerical`                  | ⭐⭐⭐ mittel       | mittel       | niedrig                 | Mit Toleranzbereich gut für Mathe                        |
| **Freitext / Essay**               | `essay`                      | ⭐ sehr niedrig     | hoch         | **sehr hoch**           | Nur mit manueller Bewertung brauchbar                    |
| **Anordnung (Sequence)**           | `ordering`                   | ⭐⭐ niedrig        | mittel       | mittel                  | PDF/XLS -> XML fehleranfällig, Preview wichtig           |
| **Berechnet**                      | `calculated`                 | ⭐⭐ niedrig        | hoch         | mittel                  | Variablen/Datensätze komplex, Expert\*innen-Mode         |
| **Berechnete MC**                  | `calculatedmulti`            | ⭐⭐ niedrig        | hoch         | mittel                  | Kombiniert Komplexität von MC + berechnete Frage         |
| **Einfach berechnet**              | `calculatedsimple`           | ⭐⭐⭐ mittel       | mittel       | mittel                  | Vereinfacht, weniger Fehler als `calculated`             |
| **Drag&Drop auf Bild**             | `ddimageortext`              | ⭐ sehr niedrig     | sehr hoch    | **sehr hoch**           | Braucht präzise Bild-Logik, manuell besser               |
| **Drag&Drop auf Text**             | `ddmarker`                   | ⭐⭐ niedrig        | hoch         | **hoch**                | Text-Markierung schwer zu automatisieren                 |
| **Drag&Drop auf Markierungen**     | `ddwtos`                     | ⭐⭐ niedrig        | hoch         | **hoch**                | Ähnlich wie ddtext, braucht klare Struktur               |
| **Freihandzeichnen**               | `drawing`                    | ⭐ sehr niedrig     | sehr hoch    | **sehr hoch**           | Braucht Bild als Basis, nur manuell vernünftig           |
| **Kprim (ETH-Typ)**                | `kprime`                     | ⭐⭐⭐⭐ hoch       | mittel       | niedrig                 | Schweizer Standard, 4 Aussagen, richtig/falsch pro Zeile |
| **Lückentext / Cloze**             | `cloze`                      | ⭐⭐⭐ mittel       | mittel       | mittel                  | Mit Wildcard-Antworten robust, fehleranfällig ohne       |
| **Molsimilarity**                  | `moodle/qtype_molsimilarity` | ⭐ sehr niedrig     | sehr hoch    | **sehr hoch**           | Nur für Chemie/Molekularstruktur, spezialisiert          |
| **MTF (Multiple True/False)**      | `mtf`                        | ⭐⭐⭐⭐ hoch       | mittel       | niedrig                 | Schweizer Standard, ähnlich wie Kprim, robuster          |
| **Wörter markieren**               | `wordselect`                 | ⭐⭐ niedrig        | mittel       | mittel                  | Text mit gekennzeichneten Wörtern, gut für Wortschatz    |
| **Zufällige Kurzantwortzuordnung** | `randomsamatch`              | ⭐⭐ niedrig        | mittel       | mittel                  | Hybrid aus Zuordnung + Kurzantwort, flexibel             |
| **Beschreibung**                   | `description`                | ⭐⭐⭐⭐⭐ hoch     | niedrig      | sehr niedrig            | Nur Info-Text, keine Antwort, gut für Kontext            |

**Legende & Empfehlungen:**

- **⭐⭐⭐⭐⭐ hoch**: LLM kann reliabel und fehlerfrei generieren
- **⭐⭐⭐ mittel**: LLM kann gut generieren, braucht aber Review vor Export
- **⭐ sehr niedrig**: LLM-Generierung fehleranfällig oder unmöglich, manuell besser

**Scope Fragetypen:**

- **Automatisch erkannt & generiert**: `multichoice`, `truefalse`, `shortanswer`, `match`, `description`, `numerical`, `cloze`, `kprime`, `mtf`, `ordering`, `calculatedsimple`, `wordselect`, `randomsamatch`
- **Manueller Fallback**: Falls LLM einen Fragetyp nicht erkennt, kann User diesen manuell auswählen und mit erforderlichen Informationen ergänzen (z.B. `ddimageortext`, `ddmarker`, `drawing`, `essay`, `calculatedmulti`, `molsimilarity`)
- **Effekt**: Maximale Flexibilität – alle Moodle-Typen werden unterstützt, kombiniert automatische Erkennung mit manuellem Fallback

---

## 3️⃣ Qualität messbar machen

### Problem

„80 % ist gut genug" ist zu unscharf für Prüfungsbewertung und Produktivität.

### Offene Punkte

### Qualitätsstandards (Best Practice aus ähnlichen Projekten)

**Dimensionen differenzieren:**
| Dimension | Ziel Standard | Ziel Mathe/Chemie\* | Begründung |
|-----------|--------------|-------------------|-----------|
| **Struktur** (Aufgabengrenzen erkannt) | ≥95% | ≥97% | Falsche Grenzen = korrupte Fragen; bei Berechnungen kritischer |
| **Fragetyp** (korrekt klassifiziert) | ≥90% | ≥94% | Falsche Typen erfordern komplette Neubearbeitung; numerisch/calculated weniger fehlerverzeihend |
| **Antworten** (vollständig + korrekt) | ≥85% | ≥92% | Fehlende Antworten bei Berechnungen können zu falschen Ergebnissen führen |
| **Bilder/Tabellen** (korrekt verarbeitet) | ≥80% | ≥88% | Diagramme, Formeln, Tabellen in Mathe/Chemie müssen präzise sein |

**Fächerspezifische Differenzierung:**

- **Mathematik, Physik, Chemie**: +2–7% auf allen Metriken (Berechnungsgenauigkeit kritisch)
- **Geisteswissenschaften, Sprachen**: Standardwerte (konzeptionelle Fehler weniger kritisch)
- **Biologie, Medizin**: +3–4% auf Struktur + Antworten (Fachbegriffe, Systematik wichtig)

**Messmethode:**

- **Automatisch**: Vergleich Output-JSON vs. Referenz (Precision/Recall pro Feld)
- **Manuell**: Stichprobe 10–20% der Fragen vor Export, 3er-Skala (korrekt/teilweise/falsch)
- **Wer bewertet**: User selbst (Quick-Review vor Export, ~2–5 Min für 10 Fragen)

**Schwellwerte & Aktion:**

- **≥90% im Schnitt** (Standard) / **≥93% Mathe/Chemie**: ✅ Automatisch akzeptiert → direkt exportierbar
- **70–89% / 80–92%**: ⚠️ Flag für User-Review → „2 Fehler gefunden – akzeptieren oder Neuversuch?"
- **<70% / <80%**: ❌ Abbruch → „Qualität zu niedrig, Prompt anpassen oder Manual-Mode"

**Iterative Verbesserung:**

- Feedback-Loop: Jede User-Korrektur → Few-Shot-Beispiel hinzufügen
- Learning: Nach 5 PDFs Prompt automatisch anpassen (z.B. häufige Fehler)
- Baseline: Erste 2 PDFs = Kalibrierung, ab dem 3. = Metriken zählen
- **Fach-Tracking**: Genauigkeitswerte getrennt nach Fach/Fragetyp speichern

---

## 4️⃣ Human-in-the-Loop konkretisieren

### Problem

„Lehrperson prüft Vorschau" ist prozessual zu vage.

### Prozessschritte (Human-in-the-Loop)

**Eingriffspunkte der Lehrperson:**

- Eingriff **VOR** Export – immer, mindestens bei Unsicherheit des LLM
- Nach Direktimport in Moodle: kein geplanter Eingriffspunkt (optional, aber nicht Teil des Prozesses)
- Fehlertoleranz: Kein Abbruch bei Einzelfehlern – jede Frage wird einzeln geprüft und freigegeben

**Prozessablauf:**

1. PDF wird geparst und analysiert
2. LLM versucht Fragetyp automatisch zuzuordnen:
   - **Erfolgreich** → Prozess läuft weiter
   - **Unsicher** → User wird gefragt: LLM empfiehlt 2–3 passende Fragetypen als nummerierte Vorschläge mit Beispielen; User wählt Nummer oder gibt eigene Eingabe ein
3. Nach Fragetyp-Bestimmung: Prüfung der **Basis-Inhalte**:
   - Frage (mit Kontext: Text, Bild o.ä.)
   - Aufgabenstellung (Was zu tun ist, z.B. „Kreuzen Sie richtig/falsch an")
   - Bestandteile der Antwort (Antwortoptionen, Lücken, Zuordnungspaare, etc.)
   - Korrekte Antwort + Feedback (LLM generiert aus vorhandenen Infos + wissenschaftlichen Quellen)
4. Fehlende Inhalte → LLM zeigt nummerierte Vorschläge (typisch 3), plus Freitext-Option für eigene Formulierung oder Präzisierung

**Was darf verändert werden?**

- Fragetyp korrigieren: ✅ Ja
- Text editieren / Frage umformulieren: ✅ Ja (via Freitext-Eingabe)
- Antworten hinzufügen / löschen: ✅ Ja
- Feedback ergänzen / überschreiben: ✅ Ja
- Bilder neu zuordnen: ✅ Ja – User kann im Review korrigieren, welchem Bild/Abbildung eine Frage zugeordnet ist (z.B. wenn LLM ein Bild der falschen Frage zugewiesen hat)

**UI-Interaktionsmuster:**

- Vorschläge immer nummeriert: `1 / 2 / 3` (oder angepasste Anzahl je Aufgabe)
- Zusätzlich: Freitext-Eingabe möglich (eigene Formulierung oder Präzisierung)
- Kein Zwang zur Auswahl – User kann eigene Lösung eingeben

**Offene Punkte:**

- Nachbearbeitungsaufwand: IST-Baseline = ~1h für 10 Fragen (manuelles Erfassen in Moodle-Fragevorlagen). Ziel Tool + Review: ≤15 Min → entspricht Zeitersparnis von ~75%. Individuelle Abweichungen je nach User-Geschwindigkeit sind normal und kein Messkriterium.
- Break-Even: Tool lohnt sich, wenn Review + Korrekturen unter 15–20 Min bleiben. Bei >30 Min User-Review für 10 Fragen wird manuelles Arbeiten konkurrenzfähig.
- Fallback / Prozessausstieg: ✅ Ja – „Abbrechen"-Button vorhanden. User kehrt zur manuellen Eingabe direkt in Moodle zurück. Bisher verarbeitete Daten gehen nicht verloren (z.B. bereits freigegebene Fragen bleiben erhalten). Empfehlung: Button auf Frageebene (einzelne Frage überspringen) und auf Prozessebene (ganzen Import abbrechen) vorsehen.

---

## 5️⃣ IST-Aufwand quantifizieren

### Problem

ROI ist nicht argumentierbar ohne IST-Baseline.

### Offene Punkte

- **Aktueller Prozess detailliert**
  - 1 Prüfung mit 10 Aufgaben: **~1 Stunde** (manuelles Erfassen in Moodle-Fragevorlagen)
  - Konkrete Schritte pro Frage (Beispiel Kprim):
    1. PDF öffnen
    2. Frage lesen & verstehen
    3. In Moodle: Fragetyp auswählen und hinzufügen (z.B. Kprim-Aufgabe)
    4. Aufgabentitel formulieren
    5. Aufgabentext (Stamm) reinkopieren
    6. Bewertung → Teilpunkte anwählen
    7. 4 Wahlantworten reinkopieren
    8. 4 spezifische Feedbacks zu den Wahlantworten verfassen
    9. Speichern → weiter zur nächsten Frage
  - **Aufwandtreiber**: Schritt 8 (Feedbacks verfassen) ist der zeitintensivste Schritt – muss selbst formuliert werden, steht selten 1:1 im PDF
  - **Fehlerquellen (typisch, kommen regelmässig vor):**
    - ❌ Falsche Antwort als „korrekt" markiert
    - ❌ Punkte falsch vergeben
    - ❌ Frage falschem Kurs / falscher Kategorie zugeordnet
    - ❌ Tippfehler im Fragetext
    - ❌ Lange Suchzeiten, weil Fragetitel nicht eindeutig formuliert sind
  - **Implikation für Tool**: Automatische Vorschläge für Titel (eindeutig + konsistent), Kategorie-Zuweisung, und Markierung der korrekten Antwort reduzieren diese Fehler direkt → klar messbarer Qualitätsgewinn

- **Varianz nach Fragetyp**
  - Kprim vs. MC: **gleicher Aufwand** – Unterschied gering, beide brauchen 4 Antworten + je 4 Feedbacks
  - Hauptunterschiede entstehen nicht durch Fragetyp, sondern durch Inhalt (Formeln, Diagramme)

- **Barrierefreiheit als Aufwandtreiber**
  - Sollen Aufgaben barrierefrei sein (wichtig für Studierende mit Einschränkungen): **deutlich höherer Aufwand**
  - Barrierefreiheit umfasst: Alt-Texte für Bilder, lesbare Formeln, strukturierte Antworttexte
  - Dieser Aspekt ist bisher **nicht im Tool-Scope**, sollte aber als zukünftige Anforderung dokumentiert werden

- **Varianz nach Dokumenttyp**
  - **Gute Texterkennung** (sauberes PDF, klares Layout): Schneller → Texte können per Copy-Paste übernommen werden
  - **Aufwändig** bei: chemischen Formeln, Diagrammen, Reaktionsgleichungen → müssen separat erfasst oder als Bild eingebettet werden
  - Eingescannte Dokumente: langsamer, fehleranfälliger (OCR-Qualität entscheidend)

- **Aufwandtreiber (zusammengefasst)**
  1. **Feedbacks verfassen** → größter Zeitfresser (stehen selten im PDF)
  2. **Chemische Formeln / Diagramme** → müssen manuell nachgebaut oder als Bild eingebettet werden
  3. **Barrierefreiheit** → zusätzlicher Aufwand, wenn Zugänglichkeit gefordert ist
  4. **Schlechte Dokumentqualität** → OCR-Fehler, Layout-Chaos erfordern manuelle Korrekturen

---

## 6️⃣ SOLL-Prozess im Detail

### Problem

Der Soll-Prozess folgt dem project-docs-Modell, aber Konkretisierung steht aus.

### Offene Punkte

- **SOLL-Prozessablauf (konkret)**

  ```
  Upload → OCR (bedingt) → Parser → JSON
    └─► pro Aufgabe:
          Vorschau (vorläufiges Resultat)
              ├─► Aufgabe OK → direkt Export (Review überspringen)
              └─► Review mit KI:
                    - Inhalte präzisieren (Fragetext, Antworten, Feedbacks)
                    - Titelvorschlag (+ optionale Titelnomenklatur)
                    - Tag-Vorschläge durch KI
                    - Kategorie-Zuweisung NACH Review
              └─► Export dieser Aufgabe
          Weiter zur nächsten Aufgabe...
    └─► Nach allen Aufgaben: Gesamtexport als XML-Set
  ```

  **Wichtige Designentscheide:**
  - **Vorschau ≠ Review**: Vorschau zeigt das vorläufige Resultat; Review ist der optionale Verbesserungsschritt
  - **Einzelaufgaben-Logik**: Jede Aufgabe wird einzeln abgeschlossen, bevor die nächste kommt
  - **Kategorie-Zuweisung**: Erfolgt nach dem Review – Lehrperson entscheidet über Einordnung in Moodle-Datenbank
  - **Tags**: KI schlägt Tags vor → erleichtern spätere Suche/Sortierung in Moodle; User hat letztes Wort
  - **Titel**: KI schlägt eindeutigen Titel vor (ggf. nach Titelnomenklatur); User hat letztes Wort
  - **Titelnomenklatur**: Empfehlung: konsistentes Schema z.B. `[Kurs]-[Thema]-[Fragetyp]-[Nr]` → reduziert Suchaufwand direkt

- **Zeitbudget SOLL**
  - 1 Prüfung mit 10 Aufgaben: noch offen (Ziel ≤15 Min inkl. Review, vgl. Block 4)
  - Breakdown: Upload (~sec), Verarbeitung (~sec), Vorschau+Review pro Frage (~1–2 Min), Export (~sec)

- **Fehlertoleranz**
  - Einzelfehler → kein Abbruch, User entscheidet pro Frage
  - Systemfehler (Parser / LLM) → Flag + Meldung, Fallback auf manuellen Modus (vgl. Block 4)

- **Cleanup & Datenschutz**
  - Prüfungsinhalte sind **nicht hochsensibel** (keine personenbezogenen Daten), aber **schutzwürdig**: Aufgaben dürfen nicht geleakt werden (Einsatz in Qualifizierungsprozessen)
  - **Upload**: erlaubt, aber zwingend **verschlüsselt** (HTTPS / TLS)
  - **Cloud-Architektur**: geschlossene Umgebung, kommuniziert nur auf expliziten Befehl mit Aussenwelt (kein passiver Datenaustausch)
  - **Temporäre Speicherung**: OK während Verarbeitung; **sofortige Löschung nach Export** (PDF, JSON, Logs)
  - **Was nicht geloggt werden darf**: Frageinhalt im Klartext in persistenten Logs; kein Caching von PDFs über Session hinaus
  - **Empfehlung Phase 1**: Lokale Verarbeitung (Jupyter Notebook) – kein Cloud-Overhead, Datenschutz trivial; Cloud-Option für Phase 2 vorsehen

---

## 7️⃣ Systemgrenzen explizit setzen

### Problem

Ohne Scope wird das Projekt zu groß oder zu vage.

### Offene Punkte

- **Test-Setup Phase 1: Systemgrenzen austesten**

  Ziel: Herausfinden, wo das System robust funktioniert und wo es bricht – bevor das Konzept finalisiert wird.

  **Dimension 1 – Dokumentqualität (1 PDF pro Stufe)**

  | Stufe | Typ                                                      | Erwartung                               |
  | ----- | -------------------------------------------------------- | --------------------------------------- |
  | A     | Sauberes, maschinell erstelltes PDF (z.B. Word → Export) | Baseline, soll gut funktionieren        |
  | B     | LaTeX-PDF mit Formeln / Tabellen                         | Test: Formel-Parsing, Layout-Robustheit |
  | C     | Eingescanntes PDF (OCR nötig)                            | Stresstest: Texterkennung, Fehlerrate   |
  | D     | Word-Chaos (Mischformate, unkonventionelle Layouts)      | Stresstest: Struktur-Erkennung          |
  | E     | PDF mit Bildern / Diagrammen (Abbildungen in Fragen)     | Stresstest: Bild-Extraktion, Zuordnung  |

  → **Empfehlung**: Mit Stufe A starten (Baseline sicherstellen), dann B und E (realistische Strickhof-Fächer), C und D nur wenn Zeit reicht.

  **Dimension 2 – Fragetypen (mindestens 2 Fragen pro Typ)**

  | Priorität             | Fragetyp                                      | Begründung                                                |
  | --------------------- | --------------------------------------------- | --------------------------------------------------------- |
  | 🔴 Phase 1            | `kprime`, `multichoice`, `truefalse`          | Häufigste Typen @ Strickhof, zuverlässige Automatisierung |
  | 🟡 Phase 1 (optional) | `match`, `shortanswer`, `numerical`           | Mittlere Komplexität, gutes ROI                           |
  | 🔵 Phase 2            | `cloze`, `ordering`, `essay`, `ddimageortext` | Höhere Komplexität, Fallback-Modus                        |

  **Dimension 3 – Inhaltskomplexität**

  | Stufe   | Inhalt                                | Testfall                           |
  | ------- | ------------------------------------- | ---------------------------------- |
  | Einfach | Nur Text, keine Medien                | Funktioniert die Basis?            |
  | Mittel  | Text + Tabelle oder Text + Bild       | Korrekte Zuordnung Bild↔Frage?     |
  | Komplex | Chemische Formel / Reaktionsgleichung | Fallback oder LaTeX-Konvertierung? |

  **Minimalset für Seminararbeit (realistischer Scope)**
  - **2 PDFs**: Stufe A + Stufe B oder E
  - **3 Fragetypen**: `kprime` + `multichoice` + 1 weiterer
  - **Ziel**: Pro Kombination mind. 3 Fragen konvertieren und Fehlerrate dokumentieren
  - **Output**: Tabelle IST-Fehler vs. SOLL-Qualität → direkte Grundlage für ROI + Risikolandkarte

- **Bewusste Ausschlüsse Phase 1**
  - ❌ Handschriftliche Scans (OCR zu unzuverlässig, Phase 2)
  - ❌ `essay`, `drawing`, `ddimageortext` (manueller Fallback definiert, kein Auto-Scope)
  - ❌ Direktimport in Moodle (Phase 1 = nur XML-Export)
  - ❌ Barrierefreiheit / Alt-Texte (zukünftige Anforderung, dokumentiert in Block 5)

- **Moodle-Export oder Direktimport?**
  - Phase 1: **nur XML-Export** → Lehrperson importiert manuell in Moodle
  - Phase 2: Direktimport via Moodle REST API

---

## 8️⃣ Erfolgskriterien für die Seminararbeit selbst

### Problem

Unterscheidung: Was ist Seminararbeit, was ist echte Produktivlösung?

### Offene Punkte

- **Umfang der Implementierung**
  - Minimalset lt. Block 7: 2 PDFs × 3 Fragetypen × 3 Fragen = ~18 Testfälle
  - Prototyp im Jupyter Notebook reicht für Phase 1; keine UI nötig
  - Seriosität = dokumentiertes Vorgehen + nachvollziehbare Ergebnisse, nicht vollständige Produktivlösung

- **Prüfungsbewertung vs. Projektqualität**
  - Methodisches Vorgehen > funktionierende Lösung (Seminarkontext)
  - Gutes Scheitern ist explizit dokumentierwürdig: „LLM-Limits erkannt, Fallback definiert" ist ein Ergebnis
  - Seriöser Ansatz: reale Testdaten, dokumentierte Fehlerrate, klare IST↔SOLL-Gegenüberstellung

- **Deliverables für Block 2 (Teil 1 – Präsentation)**
  - ✅ IST vs. SOLL + Potenziale skizziert
  - ✅ **Grobe Architektur** erkennbar (Komponentenübersicht: PDF → Parser → LLM → JSON → XML)
  - ✅ Prüfung ob **automatisierte AI-Workflows** sinnvoll sind (z.B. [OpenClaw](https://github.com/openclaw) oder ähnliche Orchestrierungsframeworks wie LangChain, DSPy) → als offene Frage oder erste Einschätzung
  - Detaillierte Implementierung ist noch **nicht** erwartet

- **Deliverables für Block 4 (Teil 2 – Umsetzung)**
  - ✅ **Beispieloutputs** (PDF → JSON → XML, annotiert mit Confidence Scores)
  - ✅ **Konzeptionelle Prompts** (dokumentiert, nachvollziehbar, kommentiert)
  - ✅ Jupyter Notebook als Proof-of-Concept (lauffähig, aber kein Produktivcode)
  - ❌ Vollständige UI oder produktionsreifer Code: nicht erwartet
  - **Ziel**: Zeigen, dass der Ansatz funktioniert und wo die Grenzen liegen

---

## 📋 Nächste Schritte

### Für dich:

1. Beantworte die **8 Blöcke** oben nach Priorität
2. Gib Stichwörter / kurze Antworten
3. Markiere Punkte, die du **bewusst offen lässt** oder mit „unklar" kennzeichnest

### Für mich:

1. Katalogisiere deine Antworten in strukturierter Form
2. Triagiere: Was ist Annahme vs. Fakt vs. Unsicherheit?
3. Erstelle aus allen drei Ebenen ein **Implementierungskonzept** mit:
   - IST↔SOLL Prozessanalyse (mit Zeiten)
   - Zwischenformat Schema (konkret JSON)
   - KI-Logik und Grenzen
   - Qualitätsmetriken (+ Messmethode)
   - ROI-Berechnung (+ ausdrückliche Annahmen)
   - Risikolandkarte
   - Roadmap Phase 1 (konkrete nächste Schritte)

---

## 📎 Referenzen

- [Vorgehen.md](../auftrag-und-prompt/Vorgehen.md) — bisherige Klärungen
- [project-docs/design/architekturentwurf.md](../../project-docs/design/architekturentwurf.md) — Architekturmodell
- [project-docs/research/architektur-und-roadmap.md](../../project-docs/research/architektur-und-roadmap.md) — pragmatische Empfehlungen
- [2026-04-10-LN-Auftrag-1.md](../auftrag-und-prompt/2026-04-10-LN-Auftrag-1.md) — Prüfungsauftrag
