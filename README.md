# Landing V2 · Trame (direction « Atelier de transmission »)

Variante B de la landing, à comparer à la V1 « le Renard » (dépôt voisin `Landing/lerenard`, inchangé).
La V2 change **trois choses à la fois** : la direction visuelle, le nom (Trame) et le ton (produit non personnifié).
Le test A/B comparera donc deux présentations globales du produit ; il ne permettra pas d'attribuer un écart à une image, une couleur ou au seul nom. Aucun résultat A/B n'est acquis.

Le nom Trame est retenu pour ce draft. Sa disponibilité juridique (marque) et ses domaines **n'ont pas été vérifiés**.

## Prévisualiser en local

- En ligne (GitHub Pages) : https://balthaduchaffaut-dotcom.github.io/trame-landing/
- En local, depuis ce dossier :

```bash
python3 -m http.server 8766 --bind 127.0.0.1
```

puis http://127.0.0.1:8766/ (`?debug-track` affiche les événements de mesure dans la console).

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Page Trame. Même ordre de sections, mêmes bénéfices, CTA et formulaire que la V1, plus une rubrique « Intégrations » propre à la V2 (voir plus bas). |
| `v2.css` | Styles limités à `.trame`. DM Sans locale. Rien n'est partagé avec la V1. |
| `v2.js` | Ancres, section active dans la navigation, formulaire (mêmes validations et messages que la V1), points de mesure A/B. |
| `assets/illustrations/` | Hero : l'ordinateur « Ma première semaine » (identité retenue, `Landing V2/trame-identite-retenue 2/hero-parcours-perspective-r3.png`), recadré sur sa marge de papier vide, AVIF 720/1090 + JPEG 1090. Puis les illustrations 02, 03 et 04, AVIF 768/1152/1536 + JPEG 1152 ; PNG maîtres dans `Landing V2/trame-design-system-v2/assets/`. L'illustration 01 (classeur et parcours) n'est plus affichée. |
| `assets/pictogrammes/` | Les 9 pictogrammes Trame, AVIF 240/400 + repli JPEG 400. PNG maîtres dans `Landing V2/trame-pictogrammes-v2 2/assets/`. |
| `assets/logo/` | Logo Trame validé (« logo B en relief ») : signature SVG dans le bandeau et le pied de page, symbole SVG et PNG 16/32 en favicon. Copies sans modification de `Landing V2/trame-identite-retenue 2/logo/`. |
| `assets/fonts/` | DM Sans (latin, latin-ext). |
| `PRODUCT.md`, `DESIGN.md` | Contexte produit et système visuel de la variante. |
| `outils/parite.py`, `outils/reecritures.json` | Contrôle des invariants V1/V2 et liste motivée des réécritures identitaires. |
| `outils/aplatir-papier.py` | Aplatit le papier d'un PNG maître sur #FFFCF6 (pixels clairs à ≤ 7 niveaux du papier mesuré ; trait, aplats et anticrénelage intacts) avant redimensionnement et encodage. Nécessite Pillow. Les originaux ne sont pas modifiés. |

Traitement des images : les PNG livrés ont un papier opaque légèrement plus sombre et irrégulier que le papier de la page (1 à 9 niveaux). Il a été aplati sur la valeur exacte de la page avant encodage, ce qui permet de poser les dessins sans cadre ni masque. Encodage AVIF (q82 ; q92 pour les variantes 1152 px, à cause d'un artefact du bord droit à q82) et JPEG q90 en repli. Chaque fichier a été comparé ligne à ligne à sa référence. La provenance est inscrite dans les métadonnées des JPEG.

Plus aucun asset du Renard n'est chargé par la V2 (logo, emblème, mascottes, favicon, pictogrammes 3D, police Bricolage). La V1 ne référence aucun fichier de ce dépôt.

## Contrôle de parité

```bash
python3 outils/parite.py   # attend la V1 dans ../lerenard/index.html
```

Les 23 réécritures liées au nom et à la dépersonnification sont listées avec leur motif dans `outils/reecritures.json`. Le script vérifie qu'elles sont appliquées, puis exige que **tout le reste** soit identique et dans le même ordre (119 blocs de texte), ainsi que les ancres, les champs du formulaire et sa destination. Seules autres différences : les textes internes aux maquettes de téléphone de la V1, retirés avec ce visuel.

## Rubrique « Intégrations » (V2 uniquement)

Ajoutée à la demande du commanditaire après « Comment ça marche », avec le visuel `RENARD/trame konnect.png`. Le papier a été aplati et 4 px de marge vide recadrés pour obtenir du 16:9 exact (1664x936). Le visuel est encodé en AVIF 960/1280/1664 et JPEG 1280.

- Le texte reste dans les faits déjà affirmés (« connecté à vos outils », « à partir de vos documents ») et ne nomme aucun connecteur.
- **Le visuel, lui, montre douze logos de marques tierces** : Slack, Teams, Notion, Drive, Asana, Zapier, Figma, Miro, HubSpot, Salesforce, GitHub, Jira. Il laisse donc entendre que ces intégrations existent. À la demande du commanditaire, aucune légende ne le nuance.
- Avant publication, il faut vérifier les intégrations réellement disponibles et les conditions d'usage des marques.
- Cette rubrique n'existe pas en V1 : les deux variantes ne présentent donc plus exactement le même contenu. `reecritures.json` la documente comme ajout.

Note technique : les AVIF produits par `sips` avec une hauteur impaire s'affichent transparents dans Chrome. Toutes les tailles utilisées ont des dimensions paires, et chaque AVIF est vérifié avec le décodeur de Chrome.

## Formulaire : état réel

- Destination : `https://formspree.io/f/VOTRE_ID`, identique à la V1. **Identifiant non renseigné** : aucune inscription ne peut aboutir, dans aucune variante. La page affiche alors le message d'aperçu de la V1, sans faux succès ni envoi.
- Pour activer l'envoi : remplacer `VOTRE_ID` dans `lerenard/index.html` (V1) **et** `v2.js` (ce dépôt), puis relancer `parite.py`.
- Le succès n'est affiché (et mesuré) qu'après une réponse HTTP 2xx.

## Mesure A/B : points d'intégration

Aucun outil d'analytics n'est chargé. `track()` (dans `v2.js`) pousse dans `window.dataLayer` s'il existe déjà, émet `CustomEvent('landing:track')` et garde un journal dans `window.__landingEvents`.

| Événement | Quand | Paramètres |
|---|---|---|
| `variant_view` | chargement | — |
| `beta_cta_click` | clic sur un CTA « Rejoindre la bêta » | `placement` : `nav`, `hero`, `integrations` (V2 seulement), `footer` |
| `beta_form_start` | première saisie dans le formulaire | — |
| `beta_form_error` | refus de l'envoi | `error_type` : `invalid_email`, `missing_consent`, `endpoint_not_configured`, `server` (+ `http_status`), `network` |
| `beta_form_success` | réponse 2xx confirmée | — |

Paramètres communs : `experiment_id` (`landing-direction-v1-v2`, provisoire), `variant` (`B`), `is_dev`. Aucune valeur saisie n'est transmise.

Avant un vrai test : instrumenter la V1 à l'identique (`variant: 'A'`), choisir l'outil et le cadre de consentement, mettre en place une affectation aléatoire stable (les URL `/` et `/v2/` ne sont qu'un moyen de revue), exclure `is_dev`, dimensionner la durée sur le trafic réel. Un clic sur un CTA n'est pas une inscription.

## Références externes restant à décider

- Domaine de Trame : aucun n'a été inventé. Pas d'URL canonique ni d'image de partage absolue (la V1 n'en a pas non plus).
- Adresse de contact : `contact@votre-domaine.fr` conservée telle quelle.
- Formspree : identifiant manquant.
- Mentions légales et confidentialité : placeholders conservés (adresse, directeur de la publication, hébergeur donné en exemple Netlify alors que le site est sur GitHub Pages, date, transferts hors UE). Le nom du projet y passe à Trame ; les éditeurs et responsables de traitement restent les deux porteurs nommés. **À faire valider**, comme la formulation du consentement.
- Copyright « © 2026 Trame » : à confirmer selon la vérification de la marque.

## Chiffres et promesses non vérifiés (dans les deux variantes)

« 12 mois », « 31,5 Md$ … Fortune 500 », « 44 jours », « 1 sur 2 », « +82 % … Brandon Hall Group », sources sans référence précise ; « en quelques jours », « Du pré-boarding à l'autonomie complète », « révolutionnée ». Toute correction doit être faite dans les deux variantes avant comparaison.

## Publication

Dépôt public `balthaduchaffaut-dotcom/trame-landing`, publié par GitHub Pages depuis la branche `main` (racine). Chaque poussée sur `main` met le site à jour en une à deux minutes. La page porte `noindex` : elle ne doit pas être indexée par les moteurs de recherche, mais toute personne qui a le lien peut l'ouvrir. Le formulaire n'envoie rien tant que `VOTRE_ID` n'est pas remplacé.
