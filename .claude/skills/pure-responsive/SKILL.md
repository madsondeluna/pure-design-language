---
name: pure-responsive
description: Converte uma tela larga na versao estreita segundo as regras de Pure Design, ou audita uma tela existente no estreito. Use para "versao mobile", "desktop to mobile", "adaptar para celular", "isso quebra no estreito", "responsivo".
---

# Do largo para o estreito

A tela estreita nao e a larga encolhida. Encolher e o que produz um
controle de 18px de altura e um campo que da zoom ao focar.

## As regras, em ordem de decisao

**1. A grade colapsa em `--breakpoint-stack` (768px).** Os dois eixos
viram um: tudo passa a comecar na coluna 1. `.axis-b` deixa de ser uma
coluna a direita e vira um bloco abaixo. Nao invente um terceiro eixo
para o estreito.

**2. Os degraus nao encolhem proporcionalmente.** 96 vira 48 entre
secoes, 48 vira 24 entre blocos, e 24 continua 24. Um degrau abaixo de
24 nao existe na diagramacao, nem no estreito.

**3. Toda area de toque sobe para `--hit-min-touch` (44px).** Campo vai
para `--field-height-touch` (44px). Isto nao e opcional e nao depende de
a tela caber sem.

**4. O tamanho do tipo nao encolhe.** Prosa continua `--text-15`,
controle continua `--text-12`, campo continua `--text-field` (16px).
O que encolhe e o titulo de secao, que troca de degrau na escala
(`--text-40` para `--text-24`, por exemplo), nunca sai dela.

**5. Vidro fundo custa caro em tela pequena.** `.glass-deep` (56px) e
`--blur-pill` (72px) numa barra de largura total num aparelho de
entrada derrubam a taxa de quadros. No estreito a barra desce para
`.glass` (16px).

**6. O que sai da tela nao vira menu escondido por padrao.** Primeiro
tente empilhar. Um menu que esconde tres links esconde a navegacao para
ganhar 40px.

**7. Tabela nao vira tabela com rolagem lateral.** Ou vira lista de
cartoes, um por linha, ou declara-se que ela e uma grade de especime e
rola dentro do proprio contentor com `overflow-x: auto`. O corpo da
pagina nunca rola na horizontal.

## Verificar

Redimensione para 375x812 com o navegador e RECARREGUE: uma trava de
dispositivo lida no carregamento nao re-executa no redimensionamento.
Depois varra de novo com `pure-contrast-sweep` e `pure-craft-review`:
o estreito e outro desenho, e ele nao herda a aprovacao do largo.

## No Figma

Se o pedido e gerar a versao estreita dentro do arquivo, carregue
`figma-use` antes de qualquer `use_figma`: e pre-requisito obrigatorio e
pular causa falha dificil de depurar. `figma-generate-design` cobre a
montagem de uma tela inteira secao por secao.
