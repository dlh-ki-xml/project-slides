<a href="https://github.com/dlh-ki-xml">
						<img src="images/logo-pdftoxml-w.svg" alt="Logo PDTtoXML" style="height: 100px; margin: 0 auto 4rem auto; background: transparent;" class="img-rounded">
					</a>
					<h2>Prüfungen einfach in Moodle transferieren</h2>
					<h5>Zwischenbericht vom Do. 23. April 2026</h5>
					<p>
            <small><a href="mailto:thomas.lampart@students.ffhs.ch">Thomas Lampart  &#124;  <i class="fas fa-envelope"></i> thomas.lampart@students.ffhs.ch</a><br><a href="https://www.ffhs.ch">www.ffhs.ch</a>
            </p>
            <p>
        <a href="https://dlh-ki-xml.github.io/project-slides/GenKI2-SemA-ZB/index.html">
          <i class="fas fa-external-link-alt" aria-hidden="true"></i> slides</a>
         </p>
        <p>
    	<a href="https://www.ffhs.ch">
    	<img src="images/logo-ffhs-w.svg" alt="FFHS-Logo" style="height: 80px; margin: 0 auto 4rem auto; background: transparent;" class="demo-logo">
    	</a></small>
    	</p>

Note:
Kurze Einordnung: Ich zeige den aktuellen Zwischenstand der Seminararbeit.
Fokus der Präsentation sind Problem, Workflow, Architekturentscheid und Evaluationslogik.

---

## <i class="fas fa-list-ul" aria-hidden="true"></i> Agenda

1. [Problem und Zielbild](#/2)
2. [Geplanter Workflow](#/3)
3. [Architekturentscheid](#/4)
4. [Evaluationsphasen](#/5)

Note:
Die Agenda ist bewusst knapp gehalten.
Die Agenda funktioniert zugleich als Navigation in die Themenstränge.
Ich führe vom Problem über den Workflow zur technischen Entscheidung und schliesse mit der Evaluation.

---

## <i class="fas fa-bullseye" aria-hidden="true"></i> Problem und Zielbild

<!-- vertical -->

### <i class="fas fa-map-marker-alt" aria-hidden="true"></i> Ausgangslage

- Manuelle Erfassung in Moodle:<br>ca. **60 Minuten für 10 Fragen**
- Hoher Aufwand durch **Feedbacks, Fragetypwahl und Medien**
- Typische Fehler: Antwortmarkierung, Punkte, Kategorie, Titel

Note:
Hier das Problem klar benennen: Der heutige Prozess ist fehleranfällig und zeitintensiv.
Wichtig ist der Bezug zur Praxis in Moodle, nicht eine abstrakte KI-Diskussion.

<!-- vertical -->

### <i class="fas fa-map-pin" aria-hidden="true"></i> Zielbild

- PDF nicht mehr manuell nachbauen, sondern **strukturiert analysieren**
- Zwischenformat als Kontrollschicht: **PDF → JSON → Moodle-XML**
- Zielaufwand: **15 Minuten für 10 Fragen**

Note:
Das Zielbild ist nicht Vollautomatisierung ohne Kontrolle.
Entscheidend ist die kontrollierte Transformation mit einem prüfbaren Zwischenformat.

---

## <i class="fas fa-project-diagram" aria-hidden="true"></i> Geplanter Workflow

<!-- vertical -->

<div class="mermaid">
<pre>
graph LR
  pdf[PDF-Upload] --> scan{Scan nötig}
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

**Kernaussage:** Die Lehrperson bleibt im Loop, aber nicht mehr für die komplette manuelle Neuerfassung.

Note:
Den Workflow von links nach rechts lesen.
Die Lehrperson bleibt an der Freigabe beteiligt, aber nicht mehr bei der vollständigen manuellen Neuerfassung jeder Aufgabe.

---

## <i class="fas fa-sitemap" aria-hidden="true"></i> Architekturentscheid

<!-- vertical -->

### Phase 1: Python-Pipeline, nicht offener Agent

- Parser, OCR, JSON und XML bleiben **klar steuerbar**
- LLM wird **gezielt aufgerufen** für Typen, Struktur, Tags, Feedbacks
- Fehler bleiben einem Schritt zuordenbar
- Besser für **Seminararbeit, Testing und Ground Truth**

Note:
Hier die Hauptentscheidung begründen: Phase 1 ist bewusst keine offene Agentik.
Für die Seminararbeit ist Nachvollziehbarkeit wichtiger als maximale Autonomie.

<!-- vertical -->

### Phase 2: kontrollierte Orchestrierung nur bei Bedarf

- z. B. für Formeln, Bilder, OCR-Fallbacks oder Zweitprüfungen
- eher **regelbasierte Workflow-Logik** als freie Agentik

Note:
Phase 2 ist kein Widerspruch zu Phase 1, sondern eine spätere Erweiterungsoption.
Erst wenn der Basiskern stabil ist, lohnt sich mehr Orchestrierung.

<!-- vertical -->

### Toolchain Phase 1

<div class="mermaid"><pre>
flowchart LR
  A[PDF Upload] --> B{Scan oder Bild PDF}
  B -- Ja --> C[OCR mit Tesseract und pytesseract]
  B -- Nein --> D[Parsing mit PyMuPDF]
  C --> D
  D --> E[LLM Analyse mit GPT 4o oder Claude]
  E --> F[JSON Validierung mit Pydantic]
  F --> G[Vorschau mit Streamlit]
  G -- OK --> I[XML Export mit lxml]
  G -- Anpassen --> H[Manuelle Korrektur]
  H --> F
  I --> J[(Moodle XML)]
</pre></div>

Note:
Diese Folie zeigt den konkreten Default-Stack fuer Phase 1.
Wichtig ist die Trennung zwischen automatischer Analyse, JSON-Kontrolle und kontrollierter manueller Korrektur.

---

## <i class="fas fa-vial" aria-hidden="true"></i> Evaluationsphasen

<!-- vertical -->

| Phase | Fokus                       | Fächer                             | Zweck                      |
| ----- | --------------------------- | ---------------------------------- | -------------------------- |
| **1** | text- und strukturdominiert | Geschichte, ABU, Deutsch, Biologie | Baseline der Pipeline      |
| **2** | formel- und symbolintensiv  | Mathematik, Physik, Chemie         | Belastungstest und Grenzen |

Note:
Die Zweiteilung der Evaluation ist methodisch wichtig.
Wir beginnen bewusst mit Fächern, in denen Struktur dominiert, bevor komplexere Symbolik dazukommt.

<!-- vertical -->

### Das heisst ...

- Pro Prüfung entsteht ein Referenzpaar aus **PDF + manuell erzeugtem Moodle-XML**
- Das XML ist die **Ground Truth** für Vergleich und Fehlermessung
- Phase 2 startet erst, wenn Phase 1 stabil genug ist

Note:
Ground Truth heisst hier: Wir haben ein manuell erstelltes Soll-Ergebnis zum Vergleichen.
Damit wird aus der Idee ein prüfbares Evaluationsdesign.

---

## <i class="fas fa-flag-checkered" aria-hidden="true"></i> Fazit und nächste Schritte

<!-- vertical -->

- **Angestrebter Prozess:** PDF nicht nur lesen, sondern kontrolliert in XML überführen
- **Technische Entscheidung:** zuerst Python-Pipeline, später evtl. orchestrierte Erweiterung
- **Methodische Entscheidung:** zweiphasige Evaluation statt alles gleichzeitig
- **Nächster Schritt:** Referenzmaterial für Phase 1 aufbauen und gegen Ground Truth testen

Note:
Diese Folie verdichtet die drei Kernaussagen: fachlich, technisch und methodisch.
Wenn wenig Zeit bleibt, ist das die zentrale Zusammenfassung.

<!-- vertical -->

### Ground-Truth Prozess

<div class="mermaid">
<pre>
graph LR
  p1[Phase 1<br/>Geschichte Biologie Allgemeinbildung] --> gt1[Referenzpaare<br/>PDF plus manuell erzeugtes Moodle-XML]
  gt1 --> eval1[Vergleich mit Ground Truth]
  eval1 --> gate{Phase 1 stabil genug?}
  gate -->|Ja| p2[Phase 2<br/>Mathematik Physik Chemie]
  gate -->|Nein| improve[Pipeline nachschärfen]
  p2 --> gt2[Neue Referenzpaare]
  gt2 --> eval2[Belastungstest an Symbolen und Formeln]
</pre>
</div>

Note:
Diese Folie ist als Diskussionsangebot gedacht.
Sie zeigt, dass die Ground-Truth-Logik nicht nur ein Messinstrument ist, sondern auch ein Entscheidkriterium für den Übergang in Phase 2.

<!-- vertical -->

- Phase 1 prüft zuerst die robuste Basis bei text- und strukturdominierten Prüfungen.
- Ground Truth bedeutet: Wir vergleichen jede Ausgabe mit einem manuell erstellten Moodle-XML als Soll-Ergebnis.

- Phase 2 beginnt erst, wenn die Pipeline für Phase 1 reproduzierbar stabil arbeitet.
- Die Diskussion im Team ist damit nicht mehr ob KI hilft, sondern wo die Systemgrenze sauber gezogen wird.

Note:
Hier kann die Diskussion geöffnet werden.
Die Leitfrage ist: Wo ziehen wir die Systemgrenze so, dass Qualität, Kontrolle und Nutzen zusammenpassen?

---

<h2 class="r-fit-text">Ich freue mich über Kritik und Anregungen!</h2>
				<p> Danke für Eure Aufmerksamkeit!</p>
      <span style="font-size: 200px; color: #133a61;">
        <i class="fas fa-comment-dots"></i>
      </span>
      <div style="position:absolute; left:0; right:0; bottom:20px; display:flex; justify-content:space-between; align-items:flex-end; padding:0 40px; font-size:small;">
        <div style="text-align:left;">
          <a href="mailto:thomas.lampart@students.ffhs.ch">
            <img src="images/qr-mailto.svg" style="width:75px;" alt="QR-Code zur E-Mailadresse"><br>
           <i class="fas fa-envelope"></i> thomas.lampart@students.ffhs.ch
          </a>
        </div>
        <div style="text-align:center;">
          <a href="https://dlh-ki-xml.github.io/project-slides/GenKI2-SemA-ZB/index.html">
           <!-- <img src="images/qr-slides.svg" style="width:75px;" alt="QR-Code zur Präsentation"><br> -->
            <i class="fas fa-external-link-alt" aria-hidden="true"></i> slides
          </a>
        </div>
        <div style="text-align:right;">
          <a href="https://github.com/dlh-ki-xml">
            <img src="images/qr-repo.svg" style="width:75px;" alt="QR-Code zum Repository"><br>
            <i class="fab fa-github"></i> repo
          </a>
        </div>
      </div>

Note:
Zum Schluss bewusst offen auf Feedback und Kritik einladen.
Die Folie dient als sauberer Ausstieg und als Übergang in Fragen oder Diskussion.

---

## <i class="fas fa-star" aria-hidden="true"></i> Highlights des aktuellen Arbeitsstands

- [**Workflow modularisiert**](#/10): Einzelaufgaben-Logik, JSON als Prüfschicht und OCR nur als Fallback
- [**Architektur teamfähig aufgesetzt**](#/11): klare Schnittstellen, lokalisierbare Fehler und austauschbare Komponenten
- [**Evaluation operationalisiert**](#/12): Referenzdatensätze, Review-Aufwand und klare Übergangskriterien für Phase 2

Note:
Diese Folie ist jetzt der Einstieg in den Anhang.
Jeder Punkt ergänzt den Hauptteil um zusätzliche Aspekte und führt direkt auf eine vertiefte Folie.

---

## <i class="fas fa-route" aria-hidden="true"></i> Anhang: Workflow geschärft

- Die Verarbeitung kann **pro Aufgabe** abgeschlossen werden statt nur als Gesamtdurchlauf
- Das **JSON-Zwischenformat** wirkt als technische Schnittstelle zwischen Parsing, Review und XML-Export
- **OCR bleibt Fallback** und wird nicht standardmässig erzwungen, was Fehler und Aufwand reduziert

<br>

[Zurück zur Anhangsübersicht](#/9)

Note:
Diese Detailfolie ergänzt den Hauptworkflow um die betriebliche Sicht.
Wichtig sind hier Modularität, Teilabschlüsse und ein kontrollierter OCR-Einsatz.

---

## <i class="fas fa-cogs" aria-hidden="true"></i> Anhang: Architekturentscheid

- Die Architektur erlaubt **Arbeitsteilung im Team**: Parsing, Prompting, Review-Logik und Export sind getrennte Baustellen
- Komponenten bleiben **austauschbar**, zum Beispiel Parser, Modellanbieter oder Exportlogik
- Die Fehleranalyse wird einfacher, weil jeder Verarbeitungsschritt gezielt geprüft und verbessert werden kann

<br>

[Zurück zur Anhangsübersicht](#/9)

Note:
Hier wird der Projektmehrwert des Architekturentscheids sichtbar.
Im Vordergrund stehen Teamarbeit, Austauschbarkeit und Wartbarkeit.

---

## <i class="fas fa-vial" aria-hidden="true"></i> Anhang: Evaluation definiert

- Für die Evaluation werden **bewusst ausgewählte Referenzprüfungen** pro Fachbereich aufgebaut
- Neben Korrektheit zählt auch der **Review-Aufwand** als praktische Kennzahl für den Projektnutzen
- Der Übergang in Phase 2 soll nicht aus dem Bauch heraus, sondern über dokumentierte Qualitätskriterien erfolgen

<br>

[Zurück zur Anhangsübersicht](#/9)

Note:
Diese Folie ergänzt den Hauptteil um die operative Sicht auf Evaluation.
Sie macht klar, wie aus der Logik ein konkretes Vorgehen mit Entscheidkriterien wird.
