# Methodenübersicht

## Problemstellung

Lehrpersonen brauchen heute ca. 60 Minuten, um 10 Prüfungsfragen manuell in Moodle zu erfassen. Der grösste Zeitfresser ist nicht das Abtippen, sondern das Erschliessen von Feedbacks, die im PDF oft gar nicht vorhanden sind, sowie die manuelle Wahl und Konfiguration der Fragetypen.

## Zielbild

Der geplante Prozess überführt ein bestehendes Prüfungs-PDF kontrolliert in ein Moodle-XML. Kernidee: nicht Vollautomatisierung, sondern eine strukturierte Transformation mit einer menschlichen Freigabe pro Aufgabe.

`PDF -> (OCR bei Bedarf) -> Parser + LLM -> JSON-Zwischenformat -> Vorschau + Freigabe -> Moodle-XML`

Zielaufwand: ca. 15 Minuten für 10 Fragen.

## Eingesetzte Tools und Methoden

| Schritt        | Tool / Methode          | Zweck                                                                      |
| -------------- | ----------------------- | -------------------------------------------------------------------------- |
| PDF-Parsing    | PyMuPDF                 | Text, Struktur und Metadaten extrahieren                                   |
| OCR (Fallback) | Tesseract + pytesseract | Scans und bildbasierte PDFs erschliessen                                   |
| LLM-Analyse    | GPT-4o oder Claude      | Fragetyp klassifizieren, fehlende Felder ableiten (Titel, Tags, Feedbacks) |
| Validierung    | Pydantic                | JSON-Zwischenformat strukturell prüfen                                     |
| Vorschau       | Streamlit               | Lehrperson gibt pro Aufgabe frei oder korrigiert                           |
| XML-Export     | lxml                    | Moodle-konformes XML generieren                                            |

Architekturentscheid Phase 1: Python-Pipeline statt offenem Agenten. Begründung: Fehler bleiben einem Schritt zuordenbar, was für die Evaluation und die Seminararbeit wichtiger ist als maximale Autonomie.

Evaluationsmethode: Zweiphasige Ground-Truth-Evaluation. Zuerst text- und strukturdominierte Fächer (Geschichte, ABU, Biologie), danach formel- und symbolintensive Fächer (Mathematik, Physik, Chemie). Als Soll-Ergebnis dient ein manuell erzeugtes Moodle-XML pro Referenzprüfung.

## Eigene Reflexion

Mich hat der Vortrag der Gruppe «Bewerber:innen-Helfer» besonders inspiriert, da sie bereits mit einem Agenten einen Workflow zur Datenextraktion und -strukturierung skizziert haben, der in einigen Punkten Parallelen zu meinem Ansatz aufweist. Insbesondere die Idee, strukturierte Daten aus unstrukturierten Quellen zu extrahieren und dabei eine menschliche Kontrollinstanz einzubauen, sehe ich als wichtigen Leitgedanken für meine eigene Arbeit. Ich bin deshalb auch unschlüssig, ob ich den oben beschriebenen Ansatz mit einer Python-Pipeline oder doch mit einem Agenten umsetzen soll. Einerseits könnte ein Agent flexibler auf unterschiedliche PDF-Formate reagieren, andererseits könnte eine Pipeline für die Evaluation und Fehlersuche in der Seminararbeit transparenter sein. Ich werde diesen Punkt in den nächsten Tagen noch einmal genauer abwägen und gegebenenfalls anpassen.

## Feedback aus der Präsentation eingearbeitet

Ich werde insbesondere die Idee von Rian (Team B) für einen Austausch und Abgleich aufnehmen. Ansonsten gab es keine direkten Feedbacks, die ich inhaltlich in die Architektur oder Methodik einarbeiten würde.

## Aktuelle Herausforderungen

- Uneinheitliche Dokumentqualität: Viele Prüfungs-PDFs von Lehrpersonen haben kein konsistentes Layout. Word wird oft nicht strukturiert eingesetzt, was das Parsing erschwert.
- Automatische Fragetypklassifizierung: Nicht alle Fragetypen (Kprim, Zuordnung, Lückentext) sind im PDF eindeutig erkennbar. Das LLM muss aus Kontext und Layout ableiten.
- Feedbacks ableiten: Feedbacks zu Wahlantworten stehen selten im PDF und müssen inhaltlich erschlossen werden. Das ist der grösste Aufwandstreiber und zugleich die unsicherste Stelle in der Pipeline.
- Formeln und Symbole (Phase 2): Mathematische und chemische Formeln sind in Phase 1 noch ausgeklammert, werden aber in Phase 2 zur zentralen Herausforderung.
- Evaluation und Messbarkeit: Was gilt als «gut genug»? Die Festlegung einer konkreten Qualitätsschwelle für den Übergang von Phase 1 zu Phase 2 ist noch offen.

Meine grösste Herausforderung bei den nächsten Schritten ist, dass ich praktisch keine Python-Programmierung kann. Deshalb werde ich meine ersten Versuche mit Vibe-Coding machen.

Ich werde ein Set mit PDF-, Word- und XML-Dateien zusammenstellen. Danach kann ich voraussichtlich besser abschätzen, wie genau die Evaluation und Messbarkeit ausfallen muss.

Das Feedback an Mitstudenten ist in einer separaten Datei erfasst.

Sorry für den vielen Text. Ich hoffe, ich konnte damit nochmals einen Überblick geben.

Vielen Dank schon im Voraus für das Feedback.

Beste Grüsse
Thomas
