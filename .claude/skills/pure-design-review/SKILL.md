---
name: pure-design-review
description: Revisao de design senior sobre uma tela ou um arquivo do Figma, feita direto na imagem. Julga hierarquia, densidade, ritmo e a decisao de composicao, nao a conformidade de token. Use para "revisa esse design", "o que voce acha dessa tela", "design review", "critica de layout", "isso esta bom".
---

# Revisao de design

As outras skills medem. Esta julga. Ela roda sobre o PIXEL, nao sobre o
CSS: `get_screenshot` no Figma, screenshot do navegador numa pagina
servida. Quem le codigo primeiro julga a intencao; quem le a imagem
julga o resultado.

## As cinco perguntas

**Hierarquia.** Feche os olhos por um segundo e reabra na imagem. O que
salta primeiro e o que mais importa? Se o que salta e um botao
secundario, uma borda pesada ou um bloco de cor, a hierarquia esta
invertida. Peso vem de tamanho e de espaco antes de vir de cor.

**Densidade.** Conte os blocos por dobra. Uma tela onde tudo respira
igual nao tem grupos: espaco uniforme e ausencia de decisao. Os tres
degraus (24 / 48 / 96) existem para que a distancia diga o que pertence
a que.

**Ritmo.** Os dois eixos verticais (coluna 1 e coluna 9) sustentam a
pagina inteira? Um bloco que comeca fora deles quebra a leitura mesmo
quando fica bonito sozinho.

**Consistencia de material.** Quantas texturas de vidro aparecem na
mesma dobra? Mais de duas e ruido. O vidro tem quatro texturas para
quatro tamanhos de superficie, nao para variar.

**A decisao que ninguem tomou.** Todo layout tem um lugar onde o
espaco, o tamanho ou a cor foram herdados do padrao em vez de
escolhidos. Aponte-o pelo nome.

## Como escrever a revisao

Comece pelo que funciona, uma frase, e sem elogio generico: diga a
decisao concreta que esta certa. Depois os problemas em ordem de
impacto, cada um com o conserto. Nada de "considerar", "talvez",
"poderia": diga o que fazer.

Nao proponha refazer a tela. Uma revisao que termina em "eu faria
diferente" nao e uma revisao.

## O que esta skill NAO faz

Contraste, espacamento em numero, conformidade de token e regra de
craft: cada um tem a sua skill e todos rodam em `pure-polish`. Nao
duplique. Se um achado desses aparecer na imagem, anote em uma linha e
mande para a skill dona.
