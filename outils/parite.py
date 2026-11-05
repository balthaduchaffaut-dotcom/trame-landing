#!/usr/bin/env python3
"""Compare les invariants A/B entre la V1 (Landing/lerenard/index.html) et la V2 Trame (../index.html).

Usage : python3 v2/outils/parite.py   (depuis la racine du dépôt ou n'importe où)

Vérifie :
- les textes visibles, hors maquettes de téléphone de la V1 (blocs role="img")
  et hors éléments aria-hidden (icônes, composition typographique décorative) ;
- les liens internes (ancres) et leurs libellés ;
- les champs du formulaire : nom, type, obligation, options ;
- la destination du formulaire (ENDPOINT) dans les scripts.
Les réécritures identitaires (le Renard -> Trame) sont listées et motivées dans
reecritures.json : elles sont retirées des deux côtés avant comparaison, et le script
vérifie qu'elles sont bien présentes. Tout autre écart, y compris d'ordre, est signalé.
Code de sortie 1 si une différence est trouvée.
"""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ICI = Path(__file__).resolve().parent
# V1 : dépôt voisin « lerenard » (Landing/lerenard), ou ancien emplacement lerenard/v2
V1 = next((p for p in (ICI.parent.parent / "lerenard" / "index.html", ICI.parent.parent / "index.html") if p.exists()), ICI.parent.parent / "lerenard" / "index.html")
V2 = ICI.parent / "index.html"
V2_JS = ICI.parent / "v2.js"
REECRITURES = ICI / "reecritures.json"
VIDES = {"br", "img", "input", "meta", "link", "hr", "source", "path", "circle", "rect", "line", "polyline", "ellipse", "polygon", "stop", "use"}


class Extracteur(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.pile = []          # True si l'élément ouvre une zone ignorée
        self.ignore = 0
        self.bloc = []
        self.textes = []
        self.liens = []
        self.champs = []
        self.lien = None
        self.select = None
        self.option = None

    def _flush(self):
        t = re.sub(r"\s+", " ", "".join(self.bloc)).strip()
        if t:
            self.textes.append(t)
        self.bloc = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        masque = tag in ("script", "style", "svg", "head") or a.get("role") == "img" or a.get("aria-hidden") == "true"
        if tag not in VIDES:
            self.pile.append(masque)
            if masque:
                self.ignore += 1
        if self.ignore:
            return
        if tag in ("p", "h1", "h2", "h3", "li", "div", "section", "article", "label", "legend", "summary", "button", "a", "option", "footer", "header", "nav", "span") and tag not in ("span",):
            self._flush()
        if tag == "a":
            self.lien = [a.get("href", ""), ""]
        if tag in ("input", "textarea"):
            self.champs.append((a.get("name"), a.get("type", "text"), "required" in a, a.get("value") if a.get("type") in ("radio", "checkbox") else None))
        if tag == "select":
            self.select = [a.get("name"), "select", "required" in a, []]
        if tag == "option" and self.select is not None:
            self.option = ""

    def handle_endtag(self, tag):
        if tag in VIDES:
            return
        if not self.ignore:
            if tag == "a" and self.lien:
                if self.lien[0].startswith("#"):
                    self.liens.append((self.lien[0], re.sub(r"\s+", " ", self.lien[1]).strip()))
                self.lien = None
            if tag == "option" and self.select is not None and self.option is not None:
                self.select[3].append(self.option.strip())
                self.option = None
            if tag == "select" and self.select is not None:
                n, t, r, o = self.select
                self.champs.append((n, t, r, " | ".join(o)))
                self.select = None
            self._flush()
        if self.pile and self.pile.pop():
            self.ignore -= 1

    def handle_data(self, data):
        if self.ignore:
            return
        self.bloc.append(data)
        if self.lien is not None:
            self.lien[1] += data
        if self.option is not None:
            self.option += data


def lire(chemin):
    e = Extracteur()
    e.feed(chemin.read_text(encoding="utf-8"))
    e._flush()
    return e


def endpoint(source):
    m = re.search(r"ENDPOINT\s*=\s*'([^']+)'", source)
    return m.group(1) if m else None


def comparer(nom, a, b):
    if a == b:
        print(f"OK    {nom} ({len(a)} éléments)")
        return True
    print(f"ÉCART {nom}")
    sa, sb = set(a), set(b)
    for x in a:
        if x not in sb:
            print(f"   - V1 seulement : {x}")
    for x in b:
        if x not in sa:
            print(f"   + V2 seulement : {x}")
    if sa == sb:
        print("   (mêmes éléments, ordre ou nombre différent)")
    return False


def retirer(sequence, a_retirer, cote):
    """Retire de la séquence chaque texte documenté, une occurrence à la fois ; signale ceux qui manquent."""
    reste = list(sequence)
    absents = []
    for t in a_retirer:
        # {"texte": ..., "apres": ...} vise l'occurrence qui suit un texte donné (texte répété ailleurs)
        apres = t.get("apres") if isinstance(t, dict) else None
        t = t["texte"] if isinstance(t, dict) else t
        if apres and apres in reste:
            i = reste.index(apres) + 1
            j = reste.index(t, i) if t in reste[i:] else -1
            if j >= 0:
                del reste[j]
                continue
        elif t in reste:
            reste.remove(t)
            continue
        absents.append(t)
    for t in absents:
        print(f"ÉCART réécriture documentée introuvable côté {cote} : {t}")
    return reste, not absents


def main():
    v1, v2 = lire(V1), lire(V2)
    r = json.loads(REECRITURES.read_text(encoding="utf-8"))
    ok = True
    t1, ok1 = retirer(v1.textes, [t for e in r["textes"] for t in e["v1"]], "V1")
    t2, ok2 = retirer(v2.textes, [t for e in r["textes"] for t in e["v2"]], "V2")
    ok &= ok1 and ok2
    print(f"INFO  {len(r['textes'])} réécritures identitaires documentées dans reecritures.json")
    ok &= comparer("textes visibles hors réécritures", t1, t2)
    l1 = set(v1.liens) - {tuple(a["v1"]) for a in r["ancres"] if a["v1"]}
    l2 = set(v2.liens) - {tuple(a["v2"]) for a in r["ancres"] if a["v2"]}
    ok &= comparer("ancres internes hors réécritures", sorted(l1), sorted(l2))
    ok &= comparer("champs du formulaire", v1.champs, v2.champs)
    e1, e2 = endpoint(V1.read_text(encoding="utf-8")), endpoint(V2_JS.read_text(encoding="utf-8"))
    ok &= comparer("destination du formulaire", [e1], [e2])
    if e1 and "VOTRE_ID" in e1:
        print("NOTE  l'identifiant Formspree n'est pas renseigné : aucune inscription ne peut aboutir, dans aucune variante.")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
