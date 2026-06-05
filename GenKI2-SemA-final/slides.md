<div class="title-slide">
  <p>
    <a href="https://github.com/dlh-ki-xml" target="_blank">
      <img src="../GenKI2-SemA-ZB/images/logo-pdftoxml-b.svg" alt="Logo PDTtoXML" class="title-logo" />
    </a>
  </p>

  <h2>Prüfungen reproduzierbar in Moodle-XML überführen</h2>
  <h5>18. Juni 2026</h5>

  <p>
    <small>
      <a href="mailto:thomas.lampart@students.ffhs.ch">Thomas Lampart | <i class="fas fa-envelope"></i> thomas.lampart@students.ffhs.ch</a><br>
      <a href="https://github.com/dlh-ki-xml" target="_blank"><i class="fab fa-github"></i> github.com/dlh-ki-xml</a>
    </small>
  </p>

  <p class="title-subline" style="font-size: 0.52em;">Lokal testbare Pipeline mit dokumentierten Artefakten, Quality Gate und klarer Ausbaurichtung Richtung AI-Workflow.</p>

  <p>
    <a href="https://www.ffhs.ch" target="_blank">
      <img src="../GenKI2-SemA-ZB/images/logo-ffhs.svg" alt="FFHS-Logo" class="ffhs-logo" />
    </a>
  </p>
</div>

Note:
Zeitbudget etwa 40 Sekunden.
Ich öffne mit dem Nutzen: weniger manuelle Moodle-Erfassung, aber weiterhin prüfbar und reproduzierbar.
Die Anhänge sind danach die technische Doku, nicht Teil des Pflichtvortrags.

---

## Agenda

1. Problem und Ziel im gewählten Prozess
2. Umgesetzte Lösung und aktueller Stand
3. Evidenz und Reproduzierbarkeit
4. Ausblick: Kombination mit dem AI-Workflow von mmaritini

Note:
Zeitbudget etwa 20 Sekunden.
Ich führe in vier Schritten vom Problem zur Lösung, dann zur Evidenz und zum Ausblick.
Alles Detailmaterial liegt im Anhang.

---

## Warum dieses Projekt?

<div class="metric-row">
  <div class="metric">
    <span class="value">Moodle-Import</span>
    <span class="label">heute oft manuell, fehleranfällig und zeitintensiv</span>
  </div>
  <div class="metric">
    <span class="value">PDF oder DOCX</span>
    <span class="label">Prüfungen liegen bereits vor, aber nicht im Moodle-Format</span>
  </div>
  <div class="metric">
    <span class="value">XML als Ziel</span>
    <span class="label">strukturierter, importierbarer Output statt Copy-Paste</span>
  </div>
</div>

<div class="two-col" style="margin-top: 0.9rem;">
  <div class="panel">
    <h3>Gewählter Optimierungsprozess</h3>
    <ul>
      <li>Aus einer bestehenden Prüfung ein importierbares Moodle-XML erzeugen</li>
      <li>Fehlerquellen reduzieren: Fragetyp, Punkte und Segmentierung</li>
      <li>Artefakte so ablegen, dass jeder Lauf nachprüfbar bleibt</li>
    </ul>
  </div>
  <div class="quote-box">
    <strong>Zielbild</strong><br>
    Nicht reine Vollautomatisierung, sondern ein kontrollierter Transformationsprozess mit prüfbarer Zwischenstufe.
  </div>
</div>

Note:
Zeitbudget etwa 50 Sekunden.
Der Unternehmensbezug ist der digitale Prüfungsprozess.
Optimiert wird nicht das Schreiben der Prüfung, sondern der Transfer in Moodle inklusive Qualitätskontrolle.

---

## Was wurde konkret gebaut?

<div class="mermaid"><pre>
flowchart LR
  A[Input<br/>PDF oder DOCX] --> B[extract<br/>Rohtext und Metadaten]
  B --> C[normalize<br/>LLM stuetzt Struktur und Fragetyp]
  C --> D[validate<br/>Schema plus Quality Gate]
  D --> E[export<br/>Moodle XML]
  E --> F[report<br/>Summary und Artefakte]
</pre></div>

<div class="two-col" style="margin-top: 0.8rem;">
  <div class="panel">
    <h3>Technische Basis</h3>
    <ul>
      <li>lokale Python-Pipeline mit festen Stages</li>
      <li>GenAI fuer Struktur, Fragetyp und Review-Vorschlaege</li>
      <li>Pydantic-Validierung und Quality Gate</li>
    </ul>
  </div>
  <div class="panel">
    <h3>Wichtige Verbesserungen</h3>
    <ul>
      <li>Confidence-Logik stabilisiert</li>
      <li>AUF und LSG sauberer getrennt</li>
      <li>PDF-Header, Fusszeilen und Trennsilben bereinigt</li>
    </ul>
  </div>
</div>

Note:
Zeitbudget etwa 70 Sekunden.
Kernaussage: Die Pipeline ist lokal ausführbar und jede Stufe schreibt ein prüfbares Artefakt.
Ich nenne nur die Stages, nicht die Detailimplementierung.

---

## Evidenz statt Behauptung

| Case                | Dateityp | Ergebnis | Aussage                                                    |
| ------------------- | -------- | -------- | ---------------------------------------------------------- |
| Geschichtsprüfung 1 | DOCX     | ready    | Referenzfall für Ground Truth                              |
| Grammatik AUF       | DOCX     | ready    | Aufgabenfassung sauber als Prompt modelliert               |
| Grammatik AUF       | PDF      | ready    | PDF-Rauschen kontrolliert, gleiche Qualitätsstufe erreicht |

<div class="two-col" style="margin-top: 0.7rem;">
  <div class="panel">
    <h3>Quality Gate</h3>
    <ul>
      <li>blocked stoppt Export hart</li>
      <li>needs review markiert echte Unsicherheit</li>
      <li>ready bedeutet: ohne Review-Hinweis exportierbar</li>
    </ul>
  </div>
  <div class="panel">
    <h3>ROI bei Lehrpersonen</h3>
    <ul>
      <li>manuell: ca. 60 Minuten für 10 Fragen</li>
      <li>Zielbild: ca. 15 Minuten mit Review statt Neuerfassung</li>
      <li>Nutzen entsteht nur, wenn Fehler sichtbar und schnell prüfbar bleiben</li>
    </ul>
  </div>
</div>

Note:
Zeitbudget etwa 70 Sekunden.
Die drei Runs sind der belastbare Beleg.
ROI heisst hier nicht nur Zeitersparnis, sondern weniger Neuerfassung bei sichtbaren Fehlern.

---

## Warum ist der Foliensatz Teil der Doku?

<div class="two-col">
  <div class="panel">
    <h3>Kurzbeleg Reproduktion</h3>
    <pre><code class="language-bash">cd project-docs/project/python-skripte
source ../../.venv/bin/activate
python -m pdf_to_moodle.main \
  --exam-id deutsch-auf-p17-pdf-2026w22 \
  --input data/input_pdfs/AUF-Grammatikpruefung-Syntax-Interpunktion.pdf \
  --stage all</code></pre>
  </div>
  <div class="panel">
    <h3>Prüfpunkte</h3>
    <ul>
      <li>`01_extract/raw_text.txt` prüfen</li>
      <li>`02_normalize/normalized.json` vergleichen</li>
      <li>`03_validate/validation_report.json` bewerten</li>
      <li>`05_report/summary.md` als Kurzstatus nutzen</li>
    </ul>
  </div>
</div>

<blockquote>
Der Foliensatz ist Ergebnisdarstellung und reproduzierbare technische Doku zugleich.
</blockquote>

Note:
Zeitbudget etwa 60 Sekunden.
Ich zeige nur einen Beispielaufruf und die wichtigsten Prüfpunkte.
Der vollständige Reproduktionsablauf steht im Anhang.

---

## Ausblick: Kombination mit mmaritini

<div class="two-col">
  <div class="panel">
    <h3>Heute stark bei thomtomi</h3>
    <ul>
      <li>operativer Backbone</li>
      <li>lokale Tests und deterministische Artefakte</li>
      <li>direkte Nachvollziehbarkeit pro Stage</li>
    </ul>
  </div>
  <div class="panel">
    <h3>Heute stark bei mmaritini</h3>
    <ul>
      <li>fachliches Zielbild und Produktfluss</li>
      <li>E-Mail-Intake und Rückfragepfad</li>
      <li>neutrales Zwischenformat und Entscheidungslogik</li>
    </ul>
  </div>
</div>

<div class="quote-box" style="margin-top: 0.8rem;">
  <strong>Strategische Richtung</strong><br>
  Python-Pipeline als Ausführungs-Backbone behalten und die fachliche Qualitätslogik des AI-Workflow-POC schrittweise integrieren.
</div>

Note:
Zeitbudget etwa 60 Sekunden.
Der Ausblick ist bewusst kein Entweder-oder.
Die starke Kombination ist: technische Reproduzierbarkeit von thomtomi plus fachlicher Produktfluss von mmaritini.

---

## Fazit

- Prozess als lokal ausführbare Pipeline umgesetzt
- Qualitätsstufe `ready` für Geschichtsprüfung sowie Grammatik AUF in DOCX und PDF erreicht
- Foliensatz dokumentiert Ergebnis, Reproduktion und Ausbaupfad
- Nächster Schritt: kontrollierte Zusammenführung mit dem AI-Workflow von mmaritini

<p class="lead">Danach folgt der Anhang mit Reproduktionsschritten, Architekturdetails und den belegten Run-Artefakten.</p>

Note:
Zeitbudget etwa 30 Sekunden.
Ich schliesse mit den vier Kernaussagen und verweise nur kurz auf den Anhang.

---

## Übergang in den Anhang

- Hauptteil endet hier nach rund 6:50 Minuten.
- Die restlichen Folien dienen als technische Doku und als Backup für Fragen.
- Relevanz: Projektstand, Reproduktion und Ausbaupfad bleiben im selben Artefakt dokumentiert.

Note:
Zeitbudget etwa 10 Sekunden.
Hier stoppe ich den Pflichtteil und nutze den Anhang nur bei Fragen.

---

<span class="appendix-tag">Anhang</span>

## Reproduzierbarkeit und technische Details

Note:
Ab hier gehe ich in die Dokumentationstiefe.
Diese Folien sind als Anhang gedacht und müssen nicht vollständig präsentiert werden.

---

## Anhang A: Repo-Struktur für Wiederholung

```text
project-docs/
├── project/python-skripte/
│   ├── data/input_pdfs/
│   ├── data/runs/<exam-id>/
│   ├── src/pdf_to_moodle/
│   └── tests/
└── results/

project-slides/
└── GenKI2-SemA-final/
```

- `src/pdf_to_moodle/` enthält Extraktion, Normalisierung, Validierung und Export.
- `data/runs/` enthält alle Artefakte eines konkreten Laufs.
- `project-slides/` hält die versionierte Präsentations-Doku.

Note:
Diese Folie beantwortet die Frage, wo jemand im Repo einsteigen muss, um das Projekt wieder auszuführen.

---

## Anhang B: Minimaler Reproduktionsablauf

```bash
cd project-docs/project/python-skripte
source ../../.venv/bin/activate

python -m pytest tests/test_parser.py tests/test_prompt_solution_split.py tests/test_quality_gate.py -q

python -m pdf_to_moodle.main \
  --exam-id deutsch-auf-p16-2026w22 \
  --input data/input_pdfs/AUF-Grammatikpruefung-Syntax-Interpunktion.docx \
  --stage all

python -m pdf_to_moodle.main \
  --exam-id deutsch-auf-p17-pdf-2026w22 \
  --input data/input_pdfs/AUF-Grammatikpruefung-Syntax-Interpunktion.pdf \
  --stage all
```

Erwartung: In beiden Runs endet `05_report/summary.md` mit `quality_gate: ready`.

Note:
Das ist die kompakteste Schrittfolge, um den aktuellen Stand auf einem frischen Checkout zu überprüfen.

---

## Anhang C: Was wurde iterativ verbessert?

| Iteration        | Problem                                           | Wirkung                                 |
| ---------------- | ------------------------------------------------- | --------------------------------------- |
| Confidence-Fix   | systematisches `needs_review`                     | History-Run auf `ready` gebracht        |
| AUF vs. LSG      | Aufgabenhinweise landeten in `solution_text`      | AUF-Dateien sauberer modelliert         |
| PDF-Cleanup      | Header, Fusszeilen, Trennsilben                   | PDF-Run fachlich näher an DOCX gebracht |
| Prompt-Heuristik | Rubriken und Instruktionen wurden falsch getrennt | längere Aufgabenköpfe stabilisiert      |

Note:
Diese Folie zeigt die eigentliche Entwicklungslogik: nicht ein grosser Wurf, sondern mehrere kleine, validierte Iterationen.

---

## Anhang D: Belegte Run-Artefakte

| Run                           | Artefakt                             | Zweck                           |
| ----------------------------- | ------------------------------------ | ------------------------------- |
| `history-p14-2026w22`         | `05_report/summary.md`               | Quality Gate und Review-Status  |
| `deutsch-auf-p16-2026w22`     | `02_normalize/normalized.json`       | AUF-DOCX in JSON geprüft        |
| `deutsch-auf-p17-pdf-2026w22` | `01_extract/raw_text.txt`            | PDF-Extraktion sichtbar geprüft |
| `deutsch-auf-p17-pdf-2026w22` | `03_validate/validation_report.json` | finale Entscheidung `ready`     |

Note:
Der Anhang verweist absichtlich auf echte Dateien im Repo.
Damit bleibt die Präsentation an überprüfbare Artefakte gekoppelt.

---

## Anhang E: Zielarchitektur der Kombination

<div class="mermaid"><pre>
flowchart LR
  intake[E-Mail oder Upload] --> precheck[Attachment Gate]
  precheck --> pipe[Python-Pipeline<br/>extract bis export]
  pipe --> gate[Quality Gate]
  gate -->|ready| xml[Moodle XML plus Report]
  gate -->|unsicher| clarify[gezielte Rückfrage]
  clarify --> pipe
  gate --> meta[neutrales Zwischenformat]
  meta --> product[AI-Workflow-Logik nach mmaritini]
</pre></div>

- technische Ausführung bleibt deterministisch
- fachliche Entscheidungslogik und Nutzerfluss werden ausgebaut
- beide Stränge zahlen auf denselben Qualitätsstandard ein

Note:
Das ist die Brücke zwischen heute und dem Ausblick.
Die Kombination bedeutet nicht, die Python-Pipeline zu ersetzen, sondern sie in einen stärkeren Produktfluss einzubetten.
