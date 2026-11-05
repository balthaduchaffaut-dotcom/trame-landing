---
name: Trame — landing V2
description: Atelier de transmission — papier, encre, pêche ; le savoir rangé en classeur puis tissé en parcours.
colors:
  papier: "#FFFCF6"
  encre: "#232323"
  peche: "#F6C3A7"
  abricot: "#FFF0E5"
  braise: "#A44023"
  braise-appuye: "#7E3019"
  secondaire: "#625B54"
  trait: "#B6A99C"
  sur-encre-secondaire: "#D6CCC1"
  placeholder: "#6F665E"
typography:
  display:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(42px, 5.8vw, 88px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(32px, 3.6vw, 52px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  title:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(19px, 1.5vw, 22px)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(16px, 0.9rem + 0.3vw, 18px)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.3
  statement:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(34px, 4.4vw, 64px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline-close:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(36px, 4.6vw, 68px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  lead:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(19px, 1.6vw, 23px)"
    fontWeight: 600
    lineHeight: 1.4
  proof-label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(17px, 1.4vw, 20px)"
    fontWeight: 500
    lineHeight: 1.35
  small:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  summary:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 600
  confirmation:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 600
  proof:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(56px, 6vw, 96px)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  signature:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(96px, 27.5vw, 440px)"
    fontWeight: 650
    lineHeight: 0.74
    letterSpacing: "-0.04em"
  figure:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "clamp(44px, 5.6vw, 84px)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.04em"
    fontFeature: "tnum, lnum"
rounded:
  focus: "2px"
  onglet: "4px"
  intercalaire-haut: "8px"
  controle: "6px"
  intercalaire: "8px 8px 0 0"
  panneau: "10px"
spacing:
  gouttiere: "clamp(20px, 4vw, 56px)"
  section: "clamp(80px, 9vw, 136px)"
  bandeau: "68px"
  conteneur: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.papier}"
    rounded: "{rounded.controle}"
    padding: "13px 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.braise}"
  button-primary-active:
    backgroundColor: "{colors.braise-appuye}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.encre}"
    rounded: "{rounded.controle}"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.papier}"
  intercalaire:
    backgroundColor: "{colors.peche}"
    textColor: "{colors.encre}"
    typography: "{typography.label}"
    rounded: "{rounded.intercalaire}"
    padding: "7px 16px 6px"
  intercalaire-dernier:
    backgroundColor: "{colors.braise}"
    textColor: "{colors.papier}"
  input:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    rounded: "{rounded.controle}"
    padding: "12px 14px"
    height: "52px"
  feuille-formulaire:
    backgroundColor: "{colors.papier}"
    rounded: "{rounded.panneau}"
    padding: "clamp(22px, 3vw, 40px)"
  etiquette:
    textColor: "{colors.encre}"
    rounded: "{rounded.onglet}"
    padding: "5px 10px"
---

# Design System: Trame — landing V2

## Overview

**Atelier de transmission.** La page se lit comme un classeur que l'on feuillette : du papier, des traits d'encre, des onglets pêche, et un fil pointillé qui relie les étapes jusqu'au drapeau. Le savoir de l'équipe y est montré comme un objet qu'on range, qu'on prépare et qu'on transmet. Rien n'est personnifié : pas de mascotte ni de bulle de personnage. La V1 (téléphone, collines, pilules, ombres) sert d'anti-référence.

Direction imposée par le brief (palette, DM Sans, illustrations). Aucun tirage de direction n'a eu lieu : le monde était fixé par le commanditaire.

## Colors

- **Papier** (#FFFCF6) : fond dominant. Le papier des illustrations et pictogrammes a été aplati sur cette valeur exacte avant encodage ; les images se posent sans cadre.
- **Encre** (#232323) : texte, traits de section, contours, CTA principal, fond de la clôture « La bêta ».
- **Pêche** (#F6C3A7) : intercalaires, soulignement des titres, pastilles d'étapes atteintes, épaisseurs des fiches dessinées, signature géante du pied de page. Jamais pour du texte courant.
- **Abricot** (#FFF0E5) : bandeau d'introduction, bande de preuve chiffrée, choix sélectionné, confirmation.
- **Braise** (#A44023) : accent rare. Coches, section active, dernier intercalaire, drapeau, survol des CTA, focus, erreurs.
- **Secondaire** (#625B54) : texte d'appui sur papier (6,5:1). Sur encre : #D6CCC1 (9,9:1).
- **Trait** (#B6A99C) : règles fines du relevé, de la grille et des colonnes.

## Typography

DM Sans seule, locale (latin et latin-ext), graisses variables. Display 600 à −0,04em, équilibré. Le nom est porté par le logo validé (signature SVG : symbole « T » en relief papier sur pêche, puis le mot Trame), à 40 px de haut dans le bandeau et 56 px dans le pied de page. Les chiffres du relevé et de la preuve sont tabulaires. Le texte courant est plafonné à environ 34em.

## Layout

Conteneur de 1240 px, gouttière fluide de 20 à 56 px, sections séparées par un trait d'encre sur toute la largeur et rythmées par 80 à 136 px. Bandeau collant de 68 px ; les ancres réservent 112 px pour que l'intercalaire reste visible.

Séquence des sections :
1. Hero : titre pleine largeur, puis texte et CTA à gauche ; à droite, l'ordinateur « Ma première semaine », qui remonte sous la seconde ligne du titre.
2. Bandeau abricot.
3. Relevé chiffré.
4. Fil des trois étapes.
5. Grille tissée de six cases, close par la preuve.
6. Texte et image pour le départ.
7. Trois colonnes séparées par des traits.
8. Clôture à l'encre.
9. Pied de page avec le nom géant.

Une rubrique « Intégrations » s'insère après « Comment ça marche ». Elle est sur fond d'encre, comme la clôture : titre et texte avec un CTA en contour clair, puis le tableau des connexions (visuel « trame konnect ») posé sur une feuille papier en relief pêche.

Points de rupture : 640, 768, 880 (liens de navigation masqués), 900, 960, 1024 (fil horizontal).

## Elevation & Depth

Plat. Aucune ombre floue, ni verre, ni dégradé. La profondeur vient du dessin en perspective et du **relief du logo** : un calque pêche décalé sous une surface papier, sans flou. Ce relief apparaît dans le symbole, dans les tuiles du visuel d'intégrations et sous le tableau de la rubrique Intégrations (décalage de 6 à 12 px). Le détecteur le classe « dark-glow », mais ce n'est pas une lueur : c'est le motif de la marque.

## Shapes

Rayons : 4 px pour les étiquettes, 6 px pour les contrôles, 8 px en haut pour les intercalaires, 10 px pour le panneau du formulaire. Traits de 1 px (sections, grilles), 1,5 px pour les contrôles et le fil, 3 px pour le dessin de l'étape 2.

## Components

- **Intercalaire** : onglet pêche posé sur le trait de section. Sa position avance de gauche à droite d'une section à l'autre (`--tab-i`, de 0 à 5), comme les intercalaires d'un classeur. Le dernier est braise.
- **Fil** : chemin pointillé ondulé entre trois pastilles numérotées, terminé par un drapeau braise. Il se trace au défilement (`animation-timeline: view()`) et les pastilles passent du papier au pêche à son passage. Il est vertical sous 1024 px. Sans prise en charge ou avec mouvement réduit, il est dessiné et statique.
- **Vapeur du café** : trois volutes au trait d'encre (SVG `.hero-steam` dans le hero) montent et s'effacent en boucle, sur tous les écrans ; masquées avec mouvement réduit. Coordonnées mesurées sur l'illustration 1090 × 920.
- **Survol du hero** (souris seulement, absent avec mouvement réduit) : `v2.js` superpose à l'image du hero des calques découpés dans la même image (même fichier, rien à télécharger en plus). La fenêtre « Ma première semaine » et la carte « Mes ressources » se soulèvent avec une ombre franche, la loupe grandit et grossit les touches qu'elle couvre, et des touches du clavier s'allument en pêche l'une après l'autre. Chaque calque grandit autour de son centre plus qu'il ne se déplace, pour toujours recouvrir son empreinte d'origine. Les tracés (`clip-path` dans `v2.css`, touches dans `v2.js`) sont mesurés sur l'illustration 1090 × 920 : à refaire si l'image du hero change.
- **Relevé** : lignes réglées, grand chiffre à gauche, libellé secondaire à droite.
- **Grille tissée** : cases séparées par des règles, pictogramme de 112 px, preuve chiffrée en bande abricot sur toute la largeur.
- **Boutons** : encre pleine ou contour, hauteur minimale de 52 px (48 px dans le bandeau), survol braise.
- **Formulaire** : feuille papier sur fond d'encre. Chaque erreur s'affiche sous son champ (`aria-describedby`) ; le message d'état reste près du bouton pour l'aperçu et les échecs d'envoi.

## Do's and Don'ts

- **À faire :**
  - poser les illustrations et pictogrammes directement sur le papier, après aplatissement du fond (`outils/aplatir-papier.py`) ;
  - garder la braise rare ;
  - faire porter l'action au produit (« Trame prépare », « l'outil prévient ») ou aux personnes.
- **À éviter :**
  - les mascottes et la personnification ;
  - les cartes ombrées, les pilules, les dégradés, le verre, `mix-blend-mode` et les masques pour cacher un fond ;
  - le texte en pêche ;
  - plusieurs animations concurrentes : le fil est le seul moment animé.
- **Non canonisé :** les intercalaires restent des libellés de section posés avant le titre. Leur décalage et leur forme d'onglet les ancrent dans le monde du classeur, mais ce dispositif ne doit pas devenir une étiquette au-dessus de chaque titre sur d'autres surfaces.
