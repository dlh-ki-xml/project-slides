# Entscheidungen fuer die Teamdiskussion

Dieses Dokument fasst die wichtigsten anstehenden Architektur- und Prozessentscheidungen knapp zusammen.

## 1. Workflow-Grundmodell

**Entscheidung:** Soll der Prototyp als Python-Pipeline oder als agentischer Workflow gebaut werden?

**Kontext:**

- Phase 1 soll methodisch sauber, nachvollziehbar und evaluierbar sein
- Die Seminararbeit profitiert mehr von klarer Steuerlogik als von maximaler Autonomie

**Empfehlung:**

- Phase 1 als Python-Pipeline mit gezielten LLM-Aufrufen
- Agentische oder framework-gestuetzte Orchestrierung hoechstens in Phase 2 pruefen

## 2. Rolle der KI

**Entscheidung:** Ist die KI das steuernde System oder ein Analysebaustein?

**Kontext:**

- Die KI soll Struktur erkennen, Fragetypen klassifizieren und Vorschlaege machen
- Die Hauptlogik fuer Parsing, Fallback und Export muss kontrollierbar bleiben

**Empfehlung:**

- LLM als aufgerufener Dienst
- Steuerung, Validierung und Export in Python

## 3. Ground-Truth-Ansatz

**Entscheidung:** Welche Datenbasis wird fuer Training, Kalibrierung und Evaluation verwendet?

**Kontext:**

- PDF allein reicht nicht als Referenz
- Manuell erzeugtes Moodle-XML liefert ein belastbares Soll-Ergebnis

**Empfehlung:**

- Pro Pruefung ein Referenzpaar aus PDF und manuell erzeugtem Moodle-XML
- XML als Ground Truth fuer Vergleich und Fehlermessung
- Optional zusaetzliches JSON-Referenzformat fuer feinere Analyse

## 4. Evaluationsphasen

**Entscheidung:** Soll die Evaluation in zwei Phasen getrennt werden?

**Kontext:**

- Textlastige und formellastige Faecher stellen unterschiedliche Anforderungen
- Ohne Phasentrennung ist unklar, ob Fehler aus der Grundpipeline oder aus Fachkomplexitaet stammen

**Empfehlung:**

- Phase 1: Geschichte, Allgemeinbildung, Biologie
- Phase 2: Mathematik, Physik, Chemie

## 5. Uebergangskriterium zwischen Phase 1 und Phase 2

**Entscheidung:** Wann gilt Phase 1 als stabil genug?

**Kontext:**

- Phase 2 ist nur sinnvoll, wenn Baseline-Probleme bereits beherrscht werden

**Empfehlung:**

- Phase 2 erst beginnen, wenn Struktur, Fragetyp und XML-Export in Phase 1 reproduzierbar funktionieren
- Review-Aufwand und Fehlerklassen muessen dokumentiert sein

## 6. Umfang des Prototyps

**Entscheidung:** Was muss Phase 1 wirklich koennen?

**Kontext:**

- Ziel ist ein belastbarer Proof-of-Concept, keine produktionsreife Gesamtloesung

**Empfehlung:**

- Fokus auf Parsing, Klassifikation, JSON-Zwischenformat, XML-Export und Review-Logik
- Keine offene Agentik, keine Produktions-UI, kein Direktimport in Moodle in Phase 1

## 7. Umgang mit komplexen Fragetypen

**Entscheidung:** Welche Typen werden automatisch unterstuetzt, welche nur per Fallback?

**Kontext:**

- Drag-and-drop, Drawing, Molekuel- oder bildbezogene Typen sind deutlich fehleranfaelliger

**Empfehlung:**

- Auto-Scope in Phase 1 auf robuste Standardtypen begrenzen
- Komplexe Spezialtypen explizit als manuellen Fallback markieren

## 8. Erfolgskriterien

**Entscheidung:** Woran wird der Erfolg des Systems gemessen?

**Kontext:**

- Ohne messbare Kriterien bleibt die Bewertung zu subjektiv

**Empfehlung:**

- Strukturgenauigkeit
- Fragetyp-Genauigkeit
- Antwortvollstaendigkeit
- Review-Aufwand
- Vergleich gegen Ground Truth

## 9. Offene Diskussionsfrage fuer das Team

Die zentrale Teamfrage lautet nicht nur: Welche Technik nehmen wir?

Sondern:

- Welche Loesung ist fuer die Seminararbeit am besten begruendbar?
- Welche Komplexitaet koennen wir methodisch sauber vertreten?
- Welche Komponenten muessen wirklich umgesetzt werden und welche reichen als Phase-2-Option?
