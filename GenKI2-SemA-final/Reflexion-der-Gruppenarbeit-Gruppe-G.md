# GKI2 – Aufgabe 2.2
## Reflexion der Gruppenarbeit
**Gruppe G «Der Bewerberhelfer»**
30. April 2026

---

# BewerberHelfer – KI-gestütztes Bewerbungsmanagement zwischen Effizienzgewinn und Qualitätsverantwortung

## Ausgangslage & Kontext

Im Rahmen unserer Gruppenarbeit (Fabio Bonolo, Pascal Kuonen und Sibylle Bart) haben wir uns mit der Frage auseinandergesetzt, wie ein stark manuell geprägter Bewerbungsprozess durch den gezielten Einsatz von KI sinnvoll unterstützt werden kann.

Unser Case basiert auf einer realen Situation in der Palliativakademie Bern (Auftraggeberin):
Im Rahmen der letzten Rekrutierung für eine:n Sachbearbeiter:in Kursadministration musste die Stellenausschreibung bereits nach 7 Arbeitstagen wieder offline genommen werden, da rund 120 Bewerbungen eingegangen sind.

Ohne HR-Tools und mit begrenzten personellen Ressourcen war der Aufwand kaum mehr bewältigbar.

Der gesamte Prozess wird aktuell von:
- einer leitenden Person (80 % Pensum)
- einem Sachbearbeiter (10 % Pensum)

getragen – zusätzlich zum regulären Arbeitsportfolio.

Dies führt zu:
- hoher Belastung
- Risiko, qualifizierte Kandidat:innen nicht zu berücksichtigen

---

## Zielsetzung des Projekts

Der **„BewerberHelfer“** soll:

- eine spürbare Entlastung im Rekrutierungsprozess schaffen
- die Qualität der Auswahl sicherstellen

Die Projektwahl basiert auf den Kompetenzen im Team:
- Microsoft-365-Umgebung vorhanden
- Prozesskenntnis (IST/SOLL) vorhanden
- KI-Expertise (Copilot MVP)
- Perspektive People & Culture

---

## Was ist der BewerberHelfer?

Ein KI-gestützter Agent zur Unterstützung im Bewerbungsmanagement.

### Aufgaben:
- Erfassen und Strukturieren von Bewerbungsdaten
- Vorselektion von Kandidat:innen
- Erstellung von Zusammenfassungen
- E-Mail-Kommunikation

### Erweiterte Funktionen:
- Analyse von Unterlagen
- Erkennung von Inkohärenzen
- Aufbereitung von Informationen für Interviews

**Wichtig:**
Die finale Entscheidung bleibt beim Menschen.

---

## Methoden & Ansatz

Identifizierte Bottlenecks:
- repetitive administrative Aufgaben
- manuelle Vorselektion

### Eingesetzte Methoden:
- Prozessanalyse (IST/SOLL)
- BPMN-Modellierung
- Kriteriumsbasierte Klassifikation (A–D)
- Human-in-the-Loop
- Prompt Engineering

Fokus:
- Nutzung von GenAI für unstrukturierte Daten
- Vermeidung reiner Automatisierung

---

## Architektur & Tools

Basierend auf Microsoft 365:

- Copilot Studio (KI-Agent)
- Power Automate (Workflows)
- SharePoint (Datenhaltung)
- Outlook (Trigger & Kommunikation)

### Funktionen des KI-Agenten:
- Datenerfassung
- Vorselektion
- Zusammenfassungen
- Kommunikation
- Analyse von Inkohärenzen
- Vorbereitung von Interviews (Stärken, Auffälligkeiten, „Fun Facts“)

---

## Prompt Engineering

Zentrale Rolle im System:

- dynamische Generierung von Inhalten
- Nutzung von „Run a Prompt“ im Agent Flow
- Weiterverwendung der Outputs als Variablen

Beispiel:
- individuelle E-Mail statt Standardtemplate

### Offene Frage:
- Wo vollständige Automatisierung?
- Wo Human-in-the-Loop?

---

## Erkenntnisse & Nutzen

### Veränderung der Arbeit:

- **IST:** operative Tätigkeiten dominieren
- **SOLL:** Fokus auf Qualität & Entscheidungen

### Potenzial:
- 50–75 % Zeitersparnis im administrativen Bereich

---

## Herausforderungen

- Qualität und Nachvollziehbarkeit der KI
- Bias-Risiken
- Technische Stabilität
- Balance Mensch vs. Automatisierung
- Unterschiedliche CV-Formate
- Datenschutz & Compliance
- Akzeptanz

### Kritische Punkte:
- grafische Lebensläufe
- Manipulationsversuche (z. B. versteckter Text, Keywords)

---

## Weitere Schritte

- Erstellung fiktiver Bewerbungsdossiers
- Entwicklung von Stellenausschreibungen
- Systemtests
- Optimierung von:
  - Klassifikation
  - Prompts
  - Entscheidungsprozessen

Ziel:
- funktionstüchtiger Agent
- Messung von Effizienz und ROI

---

## Transparenz & Umgang mit KI

- Offene Kommunikation des KI-Einsatzes
- Darstellung auf Website und in Stellenausschreibungen

Ziel:
- Vertrauen schaffen
- verantwortungsvoller Einsatz

---

## Fazit / Reflexion

- Keine vollständige Automatisierung angestrebt
- Fokus auf sinnvolle Ergänzung

### Kerngedanke:
KI schafft Entlastung → Mensch trifft fundierte Entscheidungen

### Erkenntnisse:
- hybrider Ansatz ist sinnvoll
- Prozessmodell muss weiter präzisiert werden

Der BewerberHelfer zeigt:
- praxisnahe Umsetzung möglich
- nicht nur theoretisches Konzept
