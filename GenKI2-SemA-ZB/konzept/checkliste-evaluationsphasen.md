# Checkliste Evaluationsphasen

Diese Checkliste dient als operative Arbeitsgrundlage fuer GitHub-Issues oder ein Projektboard.

## Phase 1: Baseline-Evaluation

- [ ] Vier Pruefungen fuer die erste Evaluationsphase auswaehlen
- [ ] Faecherverteilung fuer Phase 1 festlegen: Geschichte, Allgemeinbildung, Biologie
- [ ] Pro Pruefung Dokumentcharakter notieren: nur Text, Text plus Bild, Text plus Tabelle
- [ ] Pro Pruefung Fragetypen inventarisieren
- [ ] Pro Pruefung Umfang dokumentieren: Seitenzahl, Anzahl Aufgaben, Komplexitaet
- [ ] Jede Pruefung manuell in Moodle erfassen
- [ ] Jede manuell erfasste Pruefung als Moodle-XML exportieren
- [ ] PDF und XML als Referenzpaar versionieren
- [ ] Optional zusaetzliches JSON-Referenzformat erzeugen
- [ ] Zwei Pruefungen als Kalibrierungsset definieren
- [ ] Eine Pruefung fuer Zwischenbewertung vorsehen
- [ ] Eine Pruefung als unangetastetes Testset reservieren

## Phase 1: Pipeline und Auswertung

- [ ] PDF-Parser mit Referenzmaterial testen
- [ ] Fragetyp-Klassifikation auf Referenzmaterial anwenden
- [ ] JSON-Zwischenformat mit Ground Truth vergleichen
- [ ] XML-Export mit manuell erzeugtem Moodle-XML vergleichen
- [ ] Strukturgenauigkeit dokumentieren
- [ ] Fragetyp-Genauigkeit dokumentieren
- [ ] Antwortvollstaendigkeit dokumentieren
- [ ] Bild- und Tabellenzuordnung dokumentieren
- [ ] Review-Aufwand pro Pruefung messen
- [ ] Haeufigste Fehlerklassen sammeln
- [ ] Entscheidung festhalten: Phase 1 stabil genug fuer Phase 2?

## Phase 2: Erweiterung fuer formellastige Faecher

- [ ] Drei weitere Pruefungen fuer Mathematik, Physik und Chemie auswaehlen
- [ ] Pro Pruefung Formelanteil, Tabellenanteil und Symbolik dokumentieren
- [ ] Numerische und formelnahe Fragetypen erfassen
- [ ] Jede Phase-2-Pruefung ebenfalls manuell in Moodle erfassen
- [ ] Moodle-XML pro Pruefung exportieren und versionieren
- [ ] Referenzpaare fuer Phase 2 getrennt von Phase 1 verwalten

## Phase 2: Belastungstest

- [ ] Formel- und Symbolerkennung evaluieren
- [ ] Numerische Toleranzen und Einheiten pruefen
- [ ] Tabellen- und Diagrammzuordnung pruefen
- [ ] Fallback-Regeln fuer problematische Fragetypen dokumentieren
- [ ] Unterschiede zwischen Phase 1 und Phase 2 auswerten
- [ ] Qualitaetsabfall und Review-Mehraufwand explizit festhalten

## Ergebnisdokumentation

- [ ] Ground-Truth-Ansatz im Konzeptdokument beschreiben
- [ ] Baseline-Logik Phase 1 im Konzeptdokument beschreiben
- [ ] Belastungstest-Logik Phase 2 im Konzeptdokument beschreiben
- [ ] Erfolgskriterien pro Phase definieren
- [ ] Risiken und Systemgrenzen aktualisieren
- [ ] Erkenntnisse fuer Praesentation und Seminararbeit verdichten

## Moegliche GitHub-Issues

- [ ] Referenzmaterial Phase 1 vorbereiten
- [ ] Ground-Truth-XML fuer Phase 1 erzeugen
- [ ] Testset fuer Baseline-Evaluation definieren
- [ ] PDF-zu-JSON-Pipeline gegen Ground Truth testen
- [ ] XML-Export gegen Referenz-XML vergleichen
- [ ] Erweiterungsset Mathematik, Physik, Chemie vorbereiten
- [ ] Phase-2-Belastungstest dokumentieren
