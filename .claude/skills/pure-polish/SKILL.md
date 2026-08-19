---
name: pure-polish
description: Rotina de polimento visual de Pure Design. Roda a sequencia inteira sobre uma tela, uma pagina ou um arquivo do Figma, e devolve um relatorio de achados por gravidade. Use quando o pedido for "revisa essa interface", "polir a tela", "o que esta errado nesse layout", "roda o pure", "revisao de design", ou quando uma tela acabou de ser construida e ainda nao foi verificada. Aceita URL do Figma, caminho de arquivo ou URL de pagina servida.
---

# Rotina de polimento

Esta e a rotina, e as outras onze skills sao as suas etapas. Chamar esta
skill roda todas na ordem; chamar uma etapa isolada roda so ela.

## De onde vem a entrada

Tres origens, e a primeira coisa a fazer e decidir qual:

- **URL do figma.com**: leia pelo MCP da Figma. As ferramentas que
  existem de verdade sao `get_metadata` (arvore e geometria, barato),
  `get_screenshot` (pixel), `get_design_context` (codigo e tokens),
  `get_variable_defs` (variaveis ligadas), `get_motion_context`
  (animacao), `search_design_system` (componentes da biblioteca).
  Comece por `get_metadata`, e so peca `get_design_context` do no que
  importa: ele e caro.
- **Pagina servida**: use o navegador. `preview_start` com a URL,
  depois `read_page` para a arvore e `javascript_tool` para medir.
  Medir na pagina renderizada e a unica forma de pegar o que
  `check.mjs` nao ve.
- **Arquivo no disco**: leia o CSS e o HTML direto.

## A ordem, e por que ela e essa

1. `pure-contrast-sweep` — primeiro, porque e o unico achado que torna a
   tela inutilizavel para alguem. Tudo o mais e acabamento.
2. `pure-craft-review` — teclado, area de toque, foco visivel, estado de
   erro, estado vazio. Segundo pela mesma razao.
3. `pure-spacing-audit` — os tres degraus e os dois eixos.
4. `pure-analyze-components` — cada componente contra o vocabulario da
   linguagem: raio por papel, vidro por tamanho, um tamanho por classe.
5. `pure-motion-opportunities` — onde falta movimento e onde sobra.
6. `pure-ux-writing` — o texto da interface.
7. `pure-responsive` — a mesma tela no estreito.

`pure-handoff`, `pure-anatomy`, `pure-design-review` e
`pure-tokens-from-selection` NAO entram na rotina: sao produtos, nao
verificacoes. Chame-os por nome.

## Formato do relatorio

Agrupe por gravidade, nao por etapa. Uma linha por achado:

    [quebra]  seletor ou no      o que esta errado -> o que fazer
    [risco]   ...
    [polir]   ...

`quebra` e o que impede o uso: contraste abaixo de 4,5, controle sem
teclado, foco sem anel. `risco` e o que quebra em uma condicao que a tela
atual nao mostra: modo nao testado, estado vazio inexistente, texto que
transborda. `polir` e o resto.

Termine com a contagem por gravidade e nada mais. Nao proponha uma
reescrita da tela: proponha os achados.

## Antes de qualquer coisa

Rode `node tools/check.mjs` no repo da linguagem se ele estiver por
perto. Ele passar nao e a pagina passar, e isso esta escrito no proprio
README: ele le token contra token e nunca ve qual token a pagina pos em
qual fundo. Mas ele falhar significa que a base esta errada e nao adianta
auditar o que foi construido em cima.
