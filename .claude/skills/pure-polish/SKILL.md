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

## Duas larguras, sempre

**A rotina roda DUAS VEZES: no largo e no estreito.** Nao e uma etapa
final chamada "responsivo", e essa correcao veio do proprio uso: o
estreito era o passo 7 e a maior parte dos defeitos morava nele.

Meca a 375px e a 1280px. O estreito nao herda a aprovacao do largo, e a
recíproca tambem vale: um alvo de toque que passa no estreito pode
falhar num tablet largo, porque area de toque se decide por
`pointer: coarse` e nunca por largura.

Ao redimensionar, RECARREGUE: uma trava de dispositivo lida no
carregamento nao re-executa no redimensionamento. E confirme
`matchMedia('(pointer: coarse)').matches` antes de reportar qualquer
numero de area de toque: sem isso a medicao e de ponteiro fino e nao diz
nada sobre o dedo.

## A ordem, e por que ela e essa

1. `pure-contrast-sweep` — primeiro, porque e o unico achado que torna a
   tela inutilizavel para alguem. Tudo o mais e acabamento. **Nas duas
   larguras.**
2. `pure-craft-review` — teclado, area de toque, foco visivel, estado de
   erro, estado vazio. Segundo pela mesma razao. **Nas duas larguras.**
3. `pure-responsive` — o que so o estreito revela: transbordo, empilha-
   mento, vidro fundo caro, tabela sem contentor de rolagem.
4. `pure-spacing-audit` — os tres degraus e os dois eixos.
5. `pure-analyze-components` — cada componente contra o vocabulario da
   linguagem: raio por papel, vidro por tamanho, um tamanho por classe.
6. `pure-motion-opportunities` — onde falta movimento e onde sobra.
7. `pure-ux-writing` — o texto da interface.

`pure-handoff`, `pure-anatomy`, `pure-design-review` e
`pure-tokens-from-selection` NAO entram na rotina: sao produtos, nao
verificacoes. Chame-os por nome.

## Como varrer transbordo sem falso positivo

Um elemento dentro de um contentor com `overflow-x: auto` reporta a
largura inteira em `getBoundingClientRect`, mesmo rolando corretamente
dentro dele. Varrer sem checar isso acusa toda tabela bem embrulhada.
Antes de contar um elemento como transbordo, suba pela ancestralidade
ate o body e descarte-o se algum ancestral rola. O sinal que decide e
`documentElement.scrollWidth > innerWidth`: se ele e falso, a pagina nao
rola de lado e nao ha transbordo, qualquer que seja o retangulo dos
filhos.

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
