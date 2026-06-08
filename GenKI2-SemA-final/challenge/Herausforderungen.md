# Herausforderungen

Die Quelldateien sind fachlich nicht neutral strukturiert. Für eine zuverlässige Überführung nach Moodle-XML müssen deshalb mehrere Problemklassen gleichzeitig behandelt werden.

## Inhaltliche und didaktische Herausforderungen

- Aufgabenstellung und Lösung sind oft nicht sauber getrennt. In vielen Vorlagen folgt die Musterlösung direkt auf die Frage, ohne eindeutige formale Grenze.
- Einige Vorlagen codieren die Lösung nur visuell, zum Beispiel über rote Schrift wie in `Geschichte-Beispiel-Loesungen-rot.png`. Diese Information geht bei einer reinen Textverarbeitung leicht verloren.
- Manche Aufgaben sind didaktisch mehrdeutig und lassen mehrere sinnvolle Moodle-Formate zu. Das betrifft nicht nur die technische Umsetzung, sondern auch den späteren Korrekturaufwand.
- Ein typisches Beispiel dafür ist die Biologie-Aufgabe mit `Neuron-LSG-Original.png`. Dieselbe Vorlage kann als Zeichenaufgabe mit höherem Korrekturaufwand (`Neuron-Zeichnen-Beschriften.png`) oder als stärker automatisierbare Beschriftungs- bzw. Drag-and-Drop-Aufgabe (`Neuron-Beschriften.png`, `Neuron-Drag-and-Drop.png`) modelliert werden.
- Viele analoge Aufgabenformate funktionieren im digitalen Kontext nicht gleich und müssen angepasst werden. Das heisst, dass jeder Moodle-Fragetyp eine spezifische Instruktion braucht.
- Weiter müsste in einer Bearbeitungsmaske auch nachgefragt werden, ob die Lernenden mit Sie oder Du angesprochen werden sollen, damit die Anrede in der Frage korrekt formuliert wird.
- Eine weitere Optimierung wäre, wenn die KI eine präzisere Aufgabenstellung vorschlagen würde, damit die Lehrperson selber entscheiden kann, ob die eigene oder die KI-Formulierung besser passt. Das betrifft insbesondere offene Fragen.
- Weiter gibt es Fälle, wo Lehrpersonen mehrere Fragen in eine Aufgabe hinein packen. Das kann eine Hürde sein für Lernende, da sie dann schon an der Aufgabestellung scheitern können. Hier wäre es toll, wenn die KI die Aufgabe in mehrere Fragen aufteilen könnte, damit die Lernenden Schritt für Schritt durch die Aufgabe geführt werden. Die Lehrperson soll selbstverständlich entscheiden können, ob sie diese Aufteilung übernehmen möchte oder nicht.

## Visuelle und strukturelle Herausforderungen

- Dekorative Bilder wirken teilweise inhaltlich relevant, obwohl sie keine prüfungsrelevante Information tragen. Das zeigt sich zum Beispiel bei `Deutsch-dekorative-Bilder.png`.
- Das Layout ist nicht immer semantisch eindeutig. Leerräume, Zeilenumbrüche und Absatzabstände markieren häufig Antwortfelder, aber nicht nach konsistenten Regeln.
- Tabellen, Kästen oder grafisch strukturierte Aufgaben sind schwieriger in linearen Text zu überführen. Das betrifft insbesondere komplexere Arbeitsblätter wie bei `Deutsch-komplexe-Tabellen-umwandeln.png`.
- In PDF-Quellen kommen zusätzliche Störungen dazu, etwa Kopf- und Fusszeilen, Seitenzahlen, Trennsilben oder optisch getrennte Blöcke, die inhaltlich zusammengehören.

## Technische Folgen für die Pipeline

- Fragetyp, Punkte und Antwortbereich lassen sich nicht immer direkt aus einer einzelnen Zeile ableiten, sondern oft erst aus mehreren benachbarten Elementen.
- Offene Marker wie `offen`, Musterlösungen oder halbfertige Antwortvorgaben müssen unterschiedlich interpretiert werden, obwohl sie im Rohtext ähnlich aussehen können.
- Für einzelne Fälle braucht es eher eine Rückfrage- oder Review-Logik als eine harte Vollautomatik, damit die didaktisch passende Moodle-Repräsentation gewählt wird.
- Genau deshalb ist ein kontrollierter Transformationsprozess mit Zwischenformat, Quality Gate und dokumentierten Prüfpunkten robuster als ein einmaliger Direkt-Export.

## Praxis bei Lehrpersonen

- Neben den dokumentzentrierten Problemklassen gibt es eine zweite Hürde: Lehrpersonen müssen Resultate unter Zeitdruck prüfen, Vertrauen in die Vorschläge aufbauen und den letzten Handoff nach Moodle bewältigen.
- Diese Perspektive ist für den realen ROI entscheidend und wird separat in `lehrpersonen-roi-und-vertrauen.md` verdichtet.

## Fazit

Die zentrale Herausforderung besteht nicht nur im Extrahieren von Text, sondern im korrekten Interpretieren von Kontext, Layout, Lösungslogik und didaktischer Absicht. Die Qualität des Outputs hängt deshalb wesentlich davon ab, ob Unsicherheiten sichtbar gemacht und im Zweifelsfall gezielt überprüft werden.
