<a href="https://github.com/dlh-ki-xml">
						<img src="images/logo-pdftoxml.svg" alt="Logo PDTtoXML" style="height: 100px; margin: 0 auto 4rem auto; background: transparent;" class="img-rounded">
					</a>
					<h2>Prüfungen einfach in Moodle transferieren</h2>
					<h5>Zwischenbericht vom Do. 23. April 2026</h5>
					<p>
            <small><a href="mailto:thomas.lampart@students.ffhs.ch">Thomas Lampart  &#124;  <i class="fas fa-envelope"></i> thomas.lampart@students.ffhs.ch</a><br><a href="https://www.ffhs.ch">www.ffhs.ch</a>
                        </p>
                        <p>
						<a href="https://www.ffhs.ch">
						<img src="images/logo-ffhs.svg" alt="FFHS-Logo" style="height: 80px; margin: 0 auto 4rem auto; background: transparent;" class="demo-logo">
						</a></small>
					</p>

---

## <i class="fas fa-list-ul" aria-hidden="true"></i> Agenda

1. Problem und Zielbild
2. Geplanter Workflow
3. Architekturentscheid
4. Evaluationsphasen

---

## <i class="fas fa-bullseye" aria-hidden="true"></i> Problem und Zielbild

<!-- vertical -->

### Ausgangslage

- Manuelle Erfassung in Moodle: ca. **60 Minuten fuer 10 Fragen**
- Hoher Aufwand durch **Feedbacks, Fragetypwahl und Medien**
- Typische Fehler: Antwortmarkierung, Punkte, Kategorie, Titel

<!-- vertical -->

### Zielbild

- PDF nicht mehr manuell nachbauen, sondern **strukturiert analysieren**
- Zwischenformat als Kontrollschicht: **PDF → JSON → Moodle-XML**
- Zielaufwand: **15 Minuten fuer 10 Fragen**

---

## <i class="fas fa-project-diagram" aria-hidden="true"></i> Geplanter Workflow

<!-- vertical -->

<div class="mermaid">
<pre>
graph LR
  pdf[PDF-Upload] --> scan{Scan noetig}
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

**Kernaussage:** Die Lehrperson bleibt im Loop, aber nicht mehr fuer die komplette manuelle Neuerfassung.

---

## <i class="fas fa-sitemap" aria-hidden="true"></i> Architekturentscheid

<!-- vertical -->

### Phase 1: Python-Pipeline, nicht offener Agent

- Parser, OCR, JSON und XML bleiben **klar steuerbar**
- LLM wird **gezielt aufgerufen** fuer Typen, Struktur, Tags, Feedbacks
- Fehler bleiben einem Schritt zuordenbar
- Besser fuer **Seminararbeit, Testing und Ground Truth**

<!-- vertical -->

### Phase 2: kontrollierte Orchestrierung nur bei Bedarf

- z. B. fuer Formeln, Bilder, OCR-Fallbacks oder Zweitpruefungen
- eher **regelbasierte Workflow-Logik** als freie Agentik

---

## <i class="fas fa-vial" aria-hidden="true"></i> Evaluationsphasen

<!-- vertical -->

| Phase | Fokus                       | Faecher                    | Zweck                      |
| ----- | --------------------------- | -------------------------- | -------------------------- |
| **1** | text- und strukturdominiert | Geschichte, ABU, Biologie  | Baseline der Pipeline      |
| **2** | formel- und symbolintensiv  | Mathematik, Physik, Chemie | Belastungstest und Grenzen |

<!-- vertical -->

**Wichtig:**

- Pro Pruefung entsteht ein Referenzpaar aus **PDF + manuell erzeugtem Moodle-XML**
- Das XML ist die **Ground Truth** fuer Vergleich und Fehlermessung
- Phase 2 startet erst, wenn Phase 1 stabil genug ist

---

## <i class="fas fa-flag-checkered" aria-hidden="true"></i> Fazit und naechste Schritte

<!-- vertical -->

- **Fachliche Idee:** PDF nicht nur lesen, sondern kontrolliert in XML ueberfuehren
- **Technische Entscheidung:** zuerst Python-Pipeline, spaeter evtl. orchestrierte Erweiterung
- **Methodische Entscheidung:** zweiphasige Evaluation statt alles gleichzeitig
- **Naechster Schritt:** Referenzmaterial fuer Phase 1 aufbauen und gegen Ground Truth testen

---

<h2 class="r-fit-text">Ich freue mich über Kritik und Anregungen!</h2>
				<p> Danke für Eure Aufmerksamkeit!</p>
           <span style="font-size: 200px; color: #D9501E;">
                  <i class="fas fa-comment-dots"></i>
           </span>
           <div style="text-align: left; font-size:small"><img src="pic/QR-Code.svg" style=" bottom:75px; width:100px" alt="QR-Code"> <br> <a href="mailto:thomas.lampart@students.ffhs.ch">thomas.lampart@students.ffhs.ch</a></div>
               <div style="text-align: end; font-size:small"> Created with <a href="https://revealjs.com/">revealjs</a></div>

---

## Diskussionsgrundlage: Evaluation mit Ground Truth

<!-- vertical -->

<div class="mermaid">
<pre>
graph LR
  p1[Phase 1<br/>Geschichte Biologie Allgemeinbildung] --> gt1[Referenzpaare<br/>PDF plus manuell erzeugtes Moodle-XML]
  gt1 --> eval1[Vergleich mit Ground Truth]
  eval1 --> gate{Phase 1 stabil genug?}
  gate -->|Ja| p2[Phase 2<br/>Mathematik Physik Chemie]
  gate -->|Nein| improve[Pipeline nachschaerfen]
  p2 --> gt2[Neue Referenzpaare]
  gt2 --> eval2[Belastungstest an Symbolen und Formeln]
</pre>
</div>

<!-- vertical -->

- Phase 1 prueft zuerst die robuste Basis bei text- und strukturdominierten Pruefungen.
- Ground Truth bedeutet: Wir vergleichen jede Ausgabe mit einem manuell erstellten Moodle-XML als Soll-Ergebnis.

- <!-- vertical -->

- Phase 2 beginnt erst, wenn die Pipeline fuer Phase 1 reproduzierbar stabil arbeitet.
- Die Diskussion im Team ist damit nicht mehr ob KI hilft, sondern wo die Systemgrenze sauber gezogen wird.
