---
subject: [GenKI2] Anwendung generativer AI
author: Thomas Lampart
date: 30.05.2026

---

## Welche Erwartungen sind an die Präsentsveranstaltung 3 (PVA3) aus meiner Sicht?
Ich habe folgende Fragen ins Miro gestellt:

    1. Wie sieht ein effizienter KI-Arbeitsplatz aus? Welche Sicherheitsrisiken bestehen, wenn Agents auf lokale Ordner zugreifen dürfen.
    2. Gibt es empfehlenswerte Tools die selbe gehostet werden können und ähnlich gut in der Qualität sind.
    3. Wie kann ich LLM's auf spezifische Inhalte trainieren, damit schneller Resultate entstehen, die meinem Use-Case entsprechen.


# Präsentation


### Retreival Augmentation Generation (RAG)

Sharam hat das Prinzip von RAG vorgestellt.
User with UI -> LLM -> API -> Datenbank -> LLM -> Antwort
Mit Zapier ist es einfach realisierbar oder lokal mit gpt4all.
Das war für mich eine super Ergänzung. ich habe mir ein AI-Lab in einer isolierten Debian-XFCE-Entwicklungs-VM mit Git/SSH, VSCodium, Podman, lokalem Ollama (Qwen3 und Qwen2.5-Coder), GPT4All und Continue-Integration, sodass ich vollständig lokal KI-gestützte Entwicklung, Experimente und später auch RAG-Workflows ohne Cloud-Abhängigkeit durchführen kann.
Damit wurde eigentlich meine dritte Frage beantwortet, da ich jetzt weiss, dass ich mit Ollama und Qwen3 einen LLM habe, den ich mit meinen Daten füttern kann, um schneller relevante Resultate zu erhalten. Das ist für mich eine super Ergänzung zu meinem KI-Arbeitsplatz.


### Schule und Paperclip

Langfristig wäre schon mein Ziel mit einer lokalen KI, wie dem oben beschriebenen Setup zu arbeiten. Als Lehrperson, möchte ich nicht mit den Noten und Feedbacks meiner Lernenden in der Cloud arbeiten, die Versprechen der Anbieter bezüglich Datenschutz und Sicherheit sind für mich nicht ausreichend. Daher wäre würde ich gerne auf ein lokalen Workflow umsteigen, auch wenn die Performance nicht so gut ist. Aktuell braucht mich das anonymisieren von Feedbacks und Noten schon sehr viel Zeit, da ich das manuell machen muss. Mit einem lokalen KI-Tool könnte ich ohne zu anonymisieren mit den Daten meiner Lernenden arbeiten. Paperclip wäre da allenfalls spannend. Folgender Agenten-Team könnte ich mir vorstellen:
1. Agent 1: Recherchiert zu einem Themenbereich
2. Agent 2: Schreibt basierend auf den Informationen von Agent 1 ein Moodlebuch
3. Agent 3: Korrigiert das Moodlebuch von Agent 2 und bereitet es für die Veröffentlichung vor.
4. Agent 4: Leitet die Lernziele nach Bloom's Taxonomie ab
5. Agent 5: Erstellt die Lernaktivitäten basierend auf den Lernzielen von Agent 4
6. Agent 6: Erstellt die Prüfungsfragen basierend auf den Lernaktivitäten von Agent 5
7. Agent 7: Korrigiert und überprüft die Prüfungsfragen
8. Agent 8: Korrigiert und bewertetdie offenen Prüfungsfragen der Lernenden und gibt Feedback
9. Agent 9: Analysiert die Bewertung optimiert im gegebenen Fall die Prüfungsfragen und verbessert die Lernaktivitäten und Lerninhalte.

### Anwendung im Business-Kontext
Bei der Diskussion, wie KI innerhalb eines Unternehmens etabliert wird, habe ich mich etwas ausgeklinkt, da ich mich in diesem Kontext nicht so gut auskenne. Es war aber interessant zu hören.
