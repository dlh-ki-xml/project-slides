# Entscheidungen fuer die Teamdiskussion

Dieses Dokument fasst die wichtigsten anstehenden Architektur- und Prozessentscheidungen knapp zusammen.

## 1. Workflow-Grundmodell

**Entscheidung:** Soll der Prototyp als Python-Pipeline oder als agentischer Workflow gebaut werden?

**Kontext:**

- Der erste Projektstand soll schnell umsetzbar, stabil und fuer das ganze Team nachvollziehbar sein
- Fehler muessen klar lokalisierbar bleiben, damit Parsing, Review und Export gezielt verbessert werden koennen
- Fuer den Einstieg ist kontrollierbare Steuerlogik wertvoller als maximale Autonomie

**Empfehlung:**

- Phase 1 als Python-Pipeline mit gezielten LLM-Aufrufen
- Agentische oder framework-gestuetzte Orchestrierung hoechstens in Phase 2 pruefen

## 2. Rolle der KI

**Entscheidung:** Ist die KI das steuernde System oder ein Analysebaustein?

**Kontext:**

- Die KI soll Struktur erkennen, Fragetypen klassifizieren und Vorschlaege machen
- Die Hauptlogik fuer Parsing, Fallback, Review und Export muss im Projekt klar kontrollierbar bleiben
- Das Team braucht ein System, das auch ohne Black-Box-Verhalten gewartet und erweitert werden kann

**Empfehlung:**

- LLM als aufgerufener Dienst
- Steuerung, Validierung und Export in Python

## 3. Ground-Truth-Ansatz

**Entscheidung:** Welche Datenbasis wird fuer Training, Kalibrierung und Evaluation verwendet?

**Kontext:**

- PDF allein reicht nicht als Referenz
- Manuell erzeugtes Moodle-XML liefert ein belastbares Soll-Ergebnis
- Fuer Projektentscheidungen braucht das Team messbare Qualitaet statt rein subjektive Einschaetzungen

**Empfehlung:**

- Pro Pruefung ein Referenzpaar aus PDF und manuell erzeugtem Moodle-XML
- XML als Ground Truth fuer Vergleich und Fehlermessung
- Optional zusaetzliches JSON-Referenzformat fuer feinere Analyse

## 4. Evaluationsphasen

**Entscheidung:** Soll die Evaluation in zwei Phasen getrennt werden?

**Kontext:**

- Textlastige und formellastige Faecher stellen unterschiedliche Anforderungen
- Ohne Phasentrennung ist unklar, ob Fehler aus der Grundpipeline oder aus Fachkomplexitaet stammen
- Das Projekt braucht zuerst eine stabile Basis, bevor komplexere Spezialfaelle dazukommen

**Empfehlung:**

- Phase 1: Geschichte, Allgemeinbildung, Biologie
- Phase 2: Mathematik, Physik, Chemie

## 5. Uebergangskriterium zwischen Phase 1 und Phase 2

**Entscheidung:** Wann gilt Phase 1 als stabil genug?

**Kontext:**

- Phase 2 ist nur sinnvoll, wenn Baseline-Probleme bereits beherrscht werden
- Das Team sollte Erweiterungen erst dann angehen, wenn der Kernprozess reproduzierbar funktioniert

**Empfehlung:**

- Phase 2 erst beginnen, wenn Struktur, Fragetyp und XML-Export in Phase 1 reproduzierbar funktionieren
- Review-Aufwand und Fehlerklassen muessen dokumentiert sein

## 6. Umfang des Prototyps

**Entscheidung:** Was muss Phase 1 wirklich koennen?

**Kontext:**

- Ziel ist ein belastbarer Proof-of-Concept, keine produktionsreife Gesamtloesung
- Das Projekt braucht einen Kern, der echten Nutzen zeigt, ohne sich in Nebenbaustellen zu verlieren
- Alles, was Wartung und Implementierung stark verteuert, sollte bewusst spaeter kommen

**Empfehlung:**

- Fokus auf Parsing, Klassifikation, JSON-Zwischenformat, XML-Export und Review-Logik
- Keine offene Agentik, keine Produktions-UI, kein Direktimport in Moodle in Phase 1

## 7. Umgang mit komplexen Fragetypen

**Entscheidung:** Welche Typen werden automatisch unterstuetzt, welche nur per Fallback?

**Kontext:**

- Drag-and-drop, Drawing, Molekuel- oder bildbezogene Typen sind deutlich fehleranfaelliger
- Nicht alle Fragetypen liefern fuer den gleichen Aufwand den gleichen Projektnutzen
- Das Team sollte zuerst die robusten und haeufigen Typen abdecken

**Empfehlung:**

- Auto-Scope in Phase 1 auf robuste Standardtypen begrenzen
- Komplexe Spezialtypen explizit als manuellen Fallback markieren

## 8. Erfolgskriterien

**Entscheidung:** Woran wird der Erfolg des Systems gemessen?

**Kontext:**

- Ohne messbare Kriterien bleibt die Bewertung zu subjektiv
- Fuer Priorisierung, Weiterentwicklung und Teamentscheidungen braucht es klare Qualitaetsindikatoren

**Empfehlung:**

- Strukturgenauigkeit
- Fragetyp-Genauigkeit
- Antwortvollstaendigkeit
- Review-Aufwand
- Vergleich gegen Ground Truth

## 9. Offene Diskussionsfrage fuer das Team

Die zentrale Teamfrage lautet nicht nur: Welche Technik nehmen wir?

Sondern:

- Welche Loesung bringt dem Projekt frueh einen stabilen und sichtbaren Nutzen?
- Welche Komplexitaet koennen wir im Team realistisch umsetzen und betreiben?
- Welche Komponenten muessen wirklich umgesetzt werden und welche reichen als Phase-2-Option?
