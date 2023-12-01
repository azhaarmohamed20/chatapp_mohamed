# Kommunikationssystem
Bei dieser Applikation handelt es sich um eine Chat App.

## Ziel
Das Ziel dieser Applikation ist es eine Applikation mit Frontend, Backend und einer Datenbank bereitzustellen.

## Voraussetzungen
Bevor sie diese Applikatio starten stellen Sie sicher, dass folgende Dinge installiert sind:
* Nodejs
* allenfals Docker

## Design
Klicken sie auf den Link, wenn sie an meiner Planung interessiert sind.
[Kurze PDF zur Umsetzung](./Umsetzung.pdf)
[Dokumentation schriftlich](Doku.md)

## Inbetriebnahme
Projekt herunterladen
<br/>
```git clone https://github.com/azhaarmohamed20/chatapp_mohamed.git```
<br/>

### Projekt bauen
Um das Projekt zu starten müssen Sie es mit ```$ npm install ``` builden oder 

### Starten der App local
Mit folgendem Befehl können sie das Frontend starten
<br/> ```$ cd client```
<br/> ```$ npm run dev```

Danach starten sie das Backend
<br/> ```$ cd server start```
<br/> ```$ npm start```

Und zu guter letzt lassen sie Docker laufen
<br/> ```$ cd server```
<br/> ```$ docker compose up -d```

### Starten der App mit Docker
Mit folgendem Befehl können sie das Chat App starten
<br/> ```$ docker compose up -d```

### Wichtig
Ich habe bei dieser App Secrets benutzt. Das heisst sie müssen jeweils, im Code sowohl als auch im Docker Compose diese anpassen, damit alles geht
