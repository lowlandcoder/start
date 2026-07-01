#!/bin/bash
# ============================================================
#  Start (start.lab023.nl) publiceren op de webserver
#  Plaats dit script in de thuismap op de server: ~/publiceer-start.sh
#  Maak het uitvoerbaar:  chmod +x ~/publiceer-start.sh
#
#  Het haalt de laatste versie uit GitHub en kopieert de
#  websitebestanden naar de docroot /var/www/start/.
# ============================================================
set -e

cd ~/start-repo
git pull origin main

cp index.html huisstijl.css style.css script.js /var/www/start/

echo "Gepubliceerd: Start bijgewerkt op /var/www/start/."
