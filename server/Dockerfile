# Verwende ein Basis-Image mit der gewünschten Node.js-Version
FROM node:14

# Legen Sie das Arbeitsverzeichnis fest
WORKDIR /app

# Kopiere die Abhängigkeiten in das Arbeitsverzeichnis
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes in das Arbeitsverzeichnis
COPY . .

# Setze die Portnummer, auf der dein Backend läuft
EXPOSE 5000

# Starte dein Backend
CMD ["npm", "start"]