import sys, numpy as np, vtracer
from PIL import Image, ImageFilter
from collections import deque
src, out_png, out_svg = sys.argv[1:4]
im = Image.open(src).convert("RGB")
K = 8
big = im.resize((im.width*K, im.height*K), Image.LANCZOS).filter(ImageFilter.GaussianBlur(K*0.25))
a = np.asarray(big).astype(int)
# "azul" = quanto o azul passa do vermelho; 0 no branco, ~170 no azul
azul = (a[...,2]-a[...,0]) > 48
h, w = azul.shape
# tira o azul de fora do círculo: preenche a partir das bordas
fora = np.zeros_like(azul)
q = deque()
for x in range(w):
    for y in (0, h-1):
        if azul[y,x] and not fora[y,x]: fora[y,x]=True; q.append((y,x))
for y in range(h):
    for x in (0, w-1):
        if azul[y,x] and not fora[y,x]: fora[y,x]=True; q.append((y,x))
while q:
    y,x = q.popleft()
    for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
        ny,nx=y+dy,x+dx
        if 0<=ny<h and 0<=nx<w and azul[ny,nx] and not fora[ny,nx]:
            fora[ny,nx]=True; q.append((ny,nx))
tinta = azul & ~fora
tinta[230*K:283*K, 86*K:229*K] = False  # o texto entra redesenhado com fonte
mask = Image.fromarray(np.where(tinta, 0, 255).astype(np.uint8))
mask.save(out_png)
vtracer.convert_image_to_svg_py(out_png, out_svg, colormode="binary", mode="spline",
    filter_speckle=12, corner_threshold=60, length_threshold=4.0, splice_threshold=45, path_precision=2)
