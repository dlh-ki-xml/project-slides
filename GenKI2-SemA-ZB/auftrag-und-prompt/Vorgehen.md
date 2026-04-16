# 🔎 Einordnung

**Projektphase:**
→ Problemraum → Use Case → Spezifikation

**Ziel dieses Katalogs:**
→ Von „Idee“ zu **präzisem, prüfbarem Systemverständnis**

---

# ⚠️ Wichtige Regel

Beantworte NICHT alles auf einmal.

👉 Wir arbeiten iterativ:

1. zuerst **Use Case**
2. dann **Struktur**
3. dann **Qualität**
4. dann **Prozess**

---

# 🧩 1. USE-CASE-DEFINITION (zwingend zuerst)

## Ziel: Konkretes Szenario statt abstraktes System

### Fragen

1. **Konkretes Dokument**
   - Welches reale PDF nimmst du als Referenz?
     > Ich fünf verschiedene PDF's nehmen: 1. eines aus dem Fach Biologie mit LaTeX erstellt, 2. eines aus dem Fach Biologie mit Microsoft Word erstellt, 3. eines aus dem Fach Allgemeinbildender Unterricht mit Word erstellt, 4. eines aus dem Fach Geschichte mit LibreOffice erstellt, 5. eines aus dem Fach Mathematik mit Word erstellt.
   - Umfang (Seiten, Aufgaben)?
     > Zwischen 2 und 10 Seiten

1. **Dokumenttyp**
   - Prüfung?
     > Ja, es handelt sich um Prüfungen.
   - Übungsblatt?
   - Mischung?

1. **Struktur des Dokuments**
   - klar getrennte Aufgaben?
     > unterschiedlich, da viele Lehrpersonen Word nicht korrekt einsetzen, gibt es oft keine klaren Strukturen.
   - Fliesstext?
     > Ja, oft gibt es Fliesstext, z.B. bei Anleitungen oder Erklärungen.
   - nummeriert?
     > Ja, oft gibt es nummerierte Aufgaben, aber nicht immer.

1. **Fragetypen im Dokument**
   - Multiple Choice?
     > Ja
   - offene Fragen?
     > Ja -> die dann zu Freitext-Fragen werden
   - Rechnungen?
     > Ja, oft gibt es Rechnungen, z.B. in Mathematik.
     > Ergänzung folgernder Fragetypen: Kprim, Zuordnungsfragen, Lückentexte

1. **Medien**
   - Bilder enthalten?
     > ja
   - Tabellen?
     > ja
   - Formeln?
     > ja, vor allem in Mathematik

---

## ❗ Ziel dieses Blocks

👉 Du musst am Ende sagen können:

> „Ich löse genau dieses Szenario“

---

# 🧠 2. BEGRIFF „AUFGABE“ KLÄREN

## Ziel: zentrale Einheit definieren

### Fragen

1. Was ist **eine Aufgabe** in deinem System?
   - ein nummerierter Block?
     > das ist ganz unterschiedlich. In der Regel sind die Aufgaben nummeriert oder mit a), b), c) etc. gekennzeichnet. Es gibt aber auch Fälle, in denen die Aufgaben nicht klar nummeriert sind, z.B. wenn es sich um Fliesstext handelt oder wenn die Lehrperson keine klare Struktur verwendet hat.
   - eine Frage?
     > Ja, eine Aufgabe kann eine Frage sein, aber nicht jede Frage ist eine Aufgabe. Eine Aufgabe kann auch aus mehreren Fragen bestehen, z.B. wenn es sich um eine komplexe Problemstellung handelt, die mehrere Schritte erfordert.
   - mehrere Teilfragen?
     > Ja, oft gibt es Aufgaben, die aus mehreren Teilfragen bestehen, z.B. wenn es sich um eine komplexe Problemstellung handelt, die mehrere Schritte erfordert.

2. Wie erkennst du:
   - Beginn einer Aufgabe?
     > oft durch eine Nummerierung oder durch bestimmte Schlüsselwörter wie „Aufgabe“, „Frage“, „Teilaufgabe“ etc. Es gibt aber auch Fälle, in denen es keine klare Kennzeichnung gibt, z.B. wenn es sich um Fliesstext handelt oder wenn die Lehrperson keine klare Struktur verwendet hat. Dann können es auch mehrere Zeilen- oder Seitenumbrüche sein, die auf den Beginn einer neuen Aufgabe hinweisen. Es kann auch sein, dass die Aufgaben durch bestimmte Formatierungen wie Fettdruck, Unterstreichungen oder andere Hervorhebungen gekennzeichnet sind.
   - Ende einer Aufgabe?
     > oft durch die nächste Nummerierung. Es gibt aber auch Fälle, in denen es keine klare Kennzeichnung gibt, z.B. wenn es sich um Fliesstext handelt oder wenn die Lehrperson keine klare Struktur verwendet hat. Dann können es auch mehrere Zeilen- oder Seitenumbrüche sein, die auf das Ende einer Aufgabe hinweisen. Es kann auch sein, dass das Ende einer Aufgabe erkennbar ist am Beginn der nächsten Aufgabe. Die Aufgaben durch bestimmte Formatierungen wie Fettdruck, Unterstreichungen oder andere Hervorhebungen gekennzeichnet sind.

3. Gibt es:
   - Unteraufgaben (a, b, c)?
     > Ja, oft gibt es Unteraufgaben, die mit a), b), c) etc. gekennzeichnet sind.
   - Falls ja → eigene Einheiten oder Teil einer Aufgabe?
     > Das kommt ganz darauf an. In der Regel werden Unteraufgaben als Teil einer Aufgabe betrachtet, da sie oft inhaltlich zusammenhängen und sich auf die gleiche Problemstellung beziehen. Es gibt aber auch Fälle, in denen Unteraufgaben als eigenständige Einheiten betrachtet werden können, z.B. wenn sie sich inhaltlich stark unterscheiden oder wenn sie unterschiedliche Fragetypen haben.

---

## ❗ Kritischer Punkt

👉 Wenn du das nicht sauber definierst:

→ dein Parser ist nicht validierbar

---

# ⚙️ 3. STRUKTUR & ZWISCHENFORMAT

(Bezug zu deinem Architekturentwurf)

## Ziel: Was muss extrahiert werden?

### Fragen

1. Welche Felder hat eine Aufgabe minimal?

   Beispiel:
   - Text
     > Ja, der Text der Aufgabe ist ein zentrales Feld, da er die eigentliche Problemstellung oder Frage enthält. Er ist notwendig, um die Aufgabe zu verstehen und zu bearbeiten. z.T. kommt vor dem Text eine Überschrift, die Aufschluss über das Thema der Aufgabe gibt. Es gibt auch Fälle, wo der Aufgabenkontext in normaler Schrift geschrieben wird, und die Fragen immer kursiv geschrieben werden.
   - Typ
     > Ja, der Fragetyp ist ein wichtiges Feld, da er angibt, welche Art von Antwort erwartet wird und wie die Aufgabe bearbeitet werden soll. Er ist notwendig, um die Aufgabe korrekt zu interpretieren und zu bearbeiten. Es gibt verschiedene Fragetypen, z.B. Multiple Choice, offene Fragen, Rechnungen etc. Das wird auch die grösste Herausforderung sein, aus den PDFs die Fragetypen zu erkennen, da es oft keine klare Kennzeichnung gibt und die Lehrpersonen unterschiedliche Formulierungen verwenden. Es kann auch sein, dass es Untertypen gibt, z.B. bei Multiple Choice Fragen kann es Single-Choice oder Multiple-Choice Fragen geben.
     - Welche Typen gibt es?
       > Es gibt verschiedene Fragetypen, z.B. Multiple Choice, offene Fragen, Rechnungen etc. Es kann auch sein, dass es Untertypen gibt, z.B. bei Multiple Choice Fragen kann es Single-Choice oder Multiple-Choice Fragen geben.
   - Antworten
   > 
   - Punkte

2. Was ist **optional**?
   - Bilder?
   - Feedback?
   - Metadaten?

3. Was bleibt **unverändert**?
   - Originaltext?

👉 (du sagst das bereits implizit)

---

## ❗ Ziel

→ klares JSON-Zielmodell (noch ohne Syntax)

---

# 🤖 4. KI-ROLLE KLÄREN

## Ziel: Was macht die KI – und was NICHT?

### Fragen

1. Was soll die KI erkennen?
   - Aufgabenstruktur?
   - Fragetyp?
   - Antworten?

2. Was darf die KI NICHT tun?
   - Text verändern?
   - Inhalte ergänzen?

👉 (deine Annahme: Struktur, nicht Inhalt)

---

3. Wo ist Unsicherheit erlaubt?
   - Fragetyp?
   - Antworterkennung?

4. Wie wird Unsicherheit dargestellt?
   - Confidence Score?

---

## ❗ Ziel

→ klare Abgrenzung:

- deterministisch vs. probabilistisch

---

# 📊 5. QUALITÄT & ERFOLGSMESSUNG

(Bezug zu deinen 80%)

## Ziel: Messbarkeit herstellen

---

### Fragen

1. Was bedeutet **„korrekt konvertiert“** konkret?

   Zerlege in:
   - Struktur korrekt?
   - Fragetyp korrekt?
   - Antworten korrekt?

---

2. Wie misst du Qualität?

| Dimension | Messbar wie?                |
| --------- | --------------------------- |
| Struktur  | % korrekt erkannte Aufgaben |
| Typ       | % richtige Klassifikation   |
| Inhalt    | manuelle Bewertung          |

---

3. Was ist akzeptabel?

- 80 % gesamt?
- oder:
  - 95 % Struktur
  - 80 % Typ?

👉 Dein aktueller Wert ist zu unscharf

---

4. Wie viel Nachbearbeitung ist ok?

- Zeit?
- Anzahl Korrekturen?

---

## ❗ Ziel

→ evaluierbares System

---

# 👤 6. MENSCH IM PROZESS

## Ziel: realistische Automatisierung

---

### Fragen

1. Wo greift die Lehrperson ein?

- vor Export?
- nur bei Fehlern?

2. Was kann sie ändern?

- Fragetyp?
- Text?
- Antworten?

3. Wie viel Zeit darf sie investieren?

---

## ❗ Kritischer Punkt

👉 Dein System ist **Human-in-the-loop**

→ das musst du explizit modellieren

---

# 🔄 7. PROZESSABLAUF (IST vs. SOLL)

## Ziel: klarer Vergleich

---

### Fragen

1. Wie sieht der IST-Prozess konkret aus?

→ (du hast ihn teilweise beschrieben)

---

2. Wie sieht der SOLL-Prozess aus?

→ konkret:

- Upload
- Analyse
- Vorschau
- Korrektur
- Export

👉 entspricht deinem Architekturmodell

---

3. Wo wird Zeit gespart?

---

# 💰 8. ROI (oft unterschätzt!)

## Ziel: Nutzen argumentieren

---

### Fragen

1. Wie lange dauert aktuell:

- 1 Prüfung übertragen?
- 10 Prüfungen?

---

2. Wie lange im SOLL?

(Annahme klar kennzeichnen!)

---

3. Wo entstehen qualitative Effekte?

- weniger Fehler?
- mehr Tests?

---

## ❗ Ziel

→ begründeter Nutzen, kein Bauchgefühl

---

# 🚧 9. SYSTEMGRENZEN

## Ziel: Scope kontrollieren

---

### Fragen

1. Was ist bewusst **nicht im Scope**?

- Handschriftliche Scans?
- komplexe mathematische Formeln?
- Cloze-Fragen?

---

2. Welche Fragetypen zuerst?

👉 du hast bereits eine Liste

---

## ❗ Ziel

→ realistische erste Version

---

# 🎯 10. RISIKEN

## Ziel: Schwächen erkennen

---

### Fragen

1. Wo wird dein System scheitern?

- schlechte PDFs?
- unklare Struktur?

---

2. Was passiert dann?

- Abbruch?
- manuelle Bearbeitung?

---

# 📌 NÄCHSTER SCHRITT (verbindlich)

Ich stoppe dich hier bewusst wieder.

---

## 👉 Deine Aufgabe jetzt:

Beantworte NUR:

### 1. Use Case (Block 1)

### 2. Definition „Aufgabe“ (Block 2)

---

👉 Danach gehe ich mit dir:

→ in **Zwischenformat + KI-Logik + Qualitätsmodell**

---

Wenn du jetzt versuchst, alles gleichzeitig zu beantworten:

❌ wird es unscharf
❌ du verlierst Prüfbarkeit

---

Bleib diszipliniert.
Das hier ist der wichtigste Teil deines Projekts.
