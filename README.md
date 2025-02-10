# blablabook

 blablabook

## Initialiser le projet

git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin <git@github.com>:O-clock-Raclette/blablabook.git
git push -u origin main

## Création de branche

git remote add origin <git@github.com>:O-clock-Raclette/blablabook.git
git branch -M main
git push -u origin main

## creation de base de donnée

CREATE ROLE blablabook WITH LOGIN PASSWORD 'blablabook';
CREATE DATABASE blablabook WITH OWNER blablabook;
