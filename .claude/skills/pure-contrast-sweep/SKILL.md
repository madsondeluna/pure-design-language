---
name: pure-contrast-sweep
description: Varre a pagina renderizada e calcula o contraste de cada texto contra o fundo que realmente esta atras dele, nos quatro modos, incluindo os estados que comecam escondidos. Use para "verificar contraste", "acessibilidade de cor", "esse texto esta legivel", "WCAG", ou como primeira etapa de pure-polish.
---

# Varredura de contraste

`check.mjs` le token contra token: so `text`, `muted` e `accent`, e nunca
ve qual token a pagina pos em qual fundo. Esta skill le a pagina.

## O metodo

1. Sirva a pagina (`python3 -m http.server`) e abra com `preview_start`.
2. **Force os estados escondidos antes de varrer.** Erro, offline,
   modal, dica, menu suspenso, formulario atras de um botao: um estado
   que nunca abriu nunca e medido, e e onde o defeito mora. Ponha as
   classes de estado por `javascript_tool` e so entao varra.
3. Para cada elemento com no de texto, resolva o fundo NESTA ordem:
   a. `--surface-context` computado no elemento. Todo componente da
      linguagem que pinta fundo declara este token, e ele herda. Use-o.
   b. so se ele nao existir, suba pela ancestralidade ate o primeiro
      fundo opaco.
   O passo (a) existe por causa de `.liquid`: la o fundo vem de um
   IRMAO do texto, entao andar pela ancestralidade resolve contra
   `--bg` e da aprovado com a pagina errada na tela.
4. Repita nos quatro modos: `:root`, `.paper-like`, `.deep-blue`,
   `.dark`. Um valor que so funciona no claro e defeito, nao gosto.

## Os pisos

- texto normal: 4,5:1
- texto grande (>= 24px, ou >= 19px em 600): 3:1
- indicador de foco e borda de controle: 3:1
- marca de grafico contra a superficie: 3:1

## Os dois erros que se repetem

- **`--secondary` nao e cor de texto em modo nenhum.** 3,19 a 5,53:1
  sobre `--bg` e 2,61 a 4,25:1 sobre `--surface`, abaixo do piso em
  todos os quatro. E cor de BORDA, e a tabela do README diz isso.
  Texto pequeno e metadado tomam `--muted`. Desde 1.4.2 o
  `patterns.css` ja obedece em `.field-label` e no placeholder;
  `agent.css` ainda gasta `--secondary` em texto em 27 lugares,
  `.tok-com` entre eles, e essa contradicao continua aberta.
- **Slot de grafico como tipo tambem falha.** `--chart-2` da 3,38:1 a
  20px e 3,66:1 a 13px. Cor de serie vai na MARCA (ponto, barra,
  disco); o rotulo fica na tinta de texto.

## Saida

Uma linha por falha, com o numero:

    .card .meta        --secondary sobre --surface   3.4:1  (piso 4.5)  -> --muted
