"""Aplatit le papier des PNG maîtres sur #FFFCF6 sans toucher au trait.

Seuls les pixels clairs à <= T niveaux (par canal) du papier mesuré de l'image passent à #FFFCF6.
Le trait (encre), les aplats pêche et braise et l'anticrénelage sombre ne sont pas concernés.
usage: python flatten.py <src.png> <out.png>
"""
import sys
from collections import Counter
from PIL import Image

PAPER = (255, 252, 246)
T = 7

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
w, h = im.size
px = im.load()
# papier mesuré : couleur la plus fréquente sur une bande de 3 % au bord
m = max(4, int(min(w, h) * 0.03))
c = Counter()
for y in range(0, h, 2):
    for x in range(0, w, 2):
        if x < m or x >= w - m or y < m or y >= h - m:
            c[px[x, y]] += 1
p = c.most_common(1)[0][0]
changed = 0
maxdelta = 0
data = list(im.getdata())
res = []
for v in data:
    if v != PAPER and min(v) >= 225 and max(abs(v[i] - p[i]) for i in range(3)) <= T:
        d = max(abs(v[i] - PAPER[i]) for i in range(3))
        maxdelta = max(maxdelta, d)
        changed += 1
        res.append(PAPER)
    else:
        res.append(v)
im2 = Image.new("RGB", (w, h))
im2.putdata(res)
im2.save(out, optimize=True)
# papier restant hors seuil (taches) : pixels clairs > T du papier mais très proches du blanc crème
left = sum(1 for v in res if v != PAPER and min(v) >= 238)
print(f"{src.split('/')[-1]}: papier mesuré {p}, {changed} px aplatis ({changed / (w * h):.1%}), écart max corrigé {maxdelta}, pixels très clairs restants {left}")
