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

### Offene Punkte

- **Welche Felder werden minimal extrahiert?**
  - Beispiel: `id`, `text`, `type`, `answers`, `metadata`?
  - Oder granularer: `id`, `originalText`, `recognizedText`, `sections`, `questions`, `answers`?

- **Behandlung von Unsicherheit**
  - Confidence Score pro Feld?
  - Kennzeichnung „automatisch erkannt" vs. „wahrscheinlich"?
  - Fallback-Verhalten bei hoher Unsicherheit?

- **Handhabung von Medien**
  - Bilder: eingebettet (Base64) oder referenziert (Pfad)?
  - Tabellen: als JSON-Struktur, als Markdown oder original-HTML?
  - Formeln: LaTeX-String oder normalisiert?

- **Versioning des Formats**
  - Gibt es ein Versionsfeld?
  - Wie skaliert die Struktur später?

---

## 2️⃣ KI-Rolle präzisieren

### Problem
Zu unklar, was die LLM macht und was nicht.

### Offene Punkte

- **Scope der LLM-Aufgabe**
  - Erkennt sie **nur** Struktur + Fragetyp?
  - Oder auch: Antworten klassifizieren, fehlende Antworten ergänzen?
  - Oder auch: Qualitätskontrolle / Flagging zweifelhafter Fragen?

- **Explizite Grenzen**
  - Was darf die LLM **nicht** tun?
    - Originaltext normalisieren? → (ja oder nein)
    - Inhalte ergänzen / umformulieren? → (ja oder nein)
    - Typen „raten" bei völliger Unsicherheit? → (ja oder nein)

- **Lernkurve**
  - Verbesserung die LLM durch Feedback (z.B. Few-Shot-Learning)?
  - Oder statische Prompts?

- **Fragetyp-Automatisierbarkeit**
  - Welche Typen sind zuverlässig? (MC > offene Fragen?)
  - Welche Typen brauchen Mensch?
  - Gibt es Hochrisiko-Typen?

---

## 3️⃣ Qualität messbar machen

### Problem
„80 % ist gut genug" ist zu unscharf für Prüfungsbewertung und Produktivität.

### Offene Punkte

- **Dimensionen differenzieren**
  - Struktur (Aufgabengrenzen erkannt): Ziel %?
  - Fragetyp (korrekt klassifiziert): Ziel %?
  - Antworten (korrekt extrahiert): Ziel %?
  - Bilder/Tabellen (korrekt verarbeitet): Ziel %?

- **Messmethode**
  - Automatische Metriken (was genau)?
  - Manuelle Stichprobe (wie viele %)?
  - Wer bewertet? (du, test set, extern?)

- **Schwellwerte**
  - Bei welcher Qualität → automatisch akzeptiert?
  - Bei welcher → Flag für manuelle Prüfung?
  - Bei welcher → Abbruch / Neuversuch?

- **Iterative Verbesserung**
  - Feedback Loop für LLM?
  - Oder nur einmalige Bewertung?

---

## 4️⃣ Human-in-the-Loop konkretisieren

### Problem
„Lehrperson prüft Vorschau" ist prozessual zu vage.

### Offene Punkte

- **Eingriffspunkte der Lehrperson**
  - Prüft **VOR** Export?
  - Oder auch **nach** Direktimport in Moodle?
  - Fehlertoleranz: wie viele Fehler triggern Abbruch?

- **Was darf verändert werden?**
  - Fragetyp korrigieren?
  - Text editieren?
  - Antworten hinzufügen / löschen?
  - Bilder neu zuordnen?

- **Nachbearbeitungsaufwand**
  - Akzeptabel: wie viel Zeit pro Prüfung?
  - Akzeptabel: wie viele manuelle Korrektionen?
  - Break-Even: ab wann ist es schneller, von Hand zu arbeiten?

- **Prozessausstieg**
  - Kann Lehrperson sagen: „nein, zu buggy, manuell besser"?
  - Gibt es Fallback zu manueller Eingabe?

---

## 5️⃣ IST-Aufwand quantifizieren

### Problem
ROI ist nicht argumentierbar ohne IST-Baseline.

### Offene Punkte

- **Aktueller Prozess detailliert**
  - 1 Prüfung mit 10 Aufgaben: wie lange?
  - Welche Schritte? (Export PDF → manuell offnen → per Hand in Moodle → testen → …)
  - Fehlerquelle? (wie oft Fehler pro Prüfung?)

- **Varianz nach Dokumenttyp**
  - LaTeX-PDF: schneller?
  - Word-Chaos: langsamer?
  - Unterschied messbar?

- **Aufwandtreiber**
  - Ist Fragetyp-Zuweisung der größte Aufwand?
  - Ist es Text-Normalisierung?
  - Ist es Qualitätsprüfung?

---

## 6️⃣ SOLL-Prozess im Detail

### Problem
Der Soll-Prozess folgt dem project-docs-Modell, aber Konkretisierung steht aus.

### Offene Punkte

- **Entsprucht das project-docs-Modell?**
  - Upload → OCR (bedingt) → Parser → JSON → Vorschau → Export
  - Oder andere Reihenfolge / andere Schritte?

- **Zeitbudget SOLL**
  - 1 Prüfung mit 10 Aufgaben: wie lange?
  - Breakdown: Upload (sec), Verarbeitung (sec), Prüfung (min), Export (sec)?

- **Fehlertoleranz**
  - Bei Hochrisiko-Aufgabe: Abbruch oder Flag?
  - Wie viele Fehler → Zurück an Lehrperson?

- **Cleanup**
  - Wer löscht temporäre Dateien, PDFs, Logs?
  - Timeframe? (sofort, nach Export, nach 24h?)
  - Datenschutz: wo wird was nicht geloggt?

---

## 7️⃣ Systemgrenzen explizit setzen

### Problem
Ohne Scope wird das Projekt zu groß oder zu vage.

### Offene Punkte

- **Dokumenttypen in Phase 1**
  - Alle 5 Samples-PDFs? Oder Fokus auf 1–2?
  - Oder nur Word-Dokumente zuerst?

- **Fragetypenpriorisierung**
  - Multiple Choice: ja, Phase 1?
  - Offene Fragen: ja, Phase 1?
  - Rechnungen: ja, Phase 1?
  - Kprim, Zuordnung, Lückentexte: Phase 2?

- **Ausschlüsse (bewusst nicht im Scope)**
  - Handschriftliche Scans?
  - Komplexe mathematische Formeln (TeX)?
  - Cloze-Fragen / Delete-Fragen?
  - Essayformulierungen mit freier Antwort?

- **Moodle-Export oder Direktimport?**
  - Phase 1: nur XML-Export?
  - Direktimport in Moodle: Phase 2?

---

## 8️⃣ Erfolgskriterien für die Seminararbeit selbst

### Problem
Unterscheidung: Was ist Seminararbeit, was ist echte Produktivlösung?

### Offene Punkte

- **Umfang der Implementierung**
  - Müssen alle 5 PDFs zu 80%+ konvertiert sein?
  - Reicht Konzept + Proof-of-Concept auf 1–2 Samples?
  - Reicht Prototyp (JupyterNotebook) oder muss UI existieren?

- **Prüfungsbewertung vs. Projektqualität**
  - Bewertungskriterien: Methodisches Vorgehen > funktionierende Lösung?
  - Wie wird gutes Scheitern bewertet? (z.B. „konzeptionell gut, aber LLM-Limits erkannt")

- **Deliverables für Block 2 (Teil 1)**
  - Präsentation: Problemszenario + Optimierungspotential
  - Aber: wie detailliert soll Architektur sein?
  - Oder reicht „IST vs. SOLL, Potentiale skizziert"?

- **Deliverables für Block 4 (Teil 2)**
  - „Umsetzung + Prompts": bedeutet das lauffähigen Code?
  - Oder auch konzeptionelle Prompts + Beispieloutputs?

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
