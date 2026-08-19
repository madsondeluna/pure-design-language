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

## Desligue a transicao antes de medir cor

Trocar a classe de modo e ler a cor no mesmo instante devolve o valor
INICIAL da transicao em curso, nao o final. Um botao que esta em 5,37:1
foi lido em 2,65 desse jeito, e isso le exatamente como um defeito de
cascata. Vale tambem para aba de fundo, onde nenhum quadro roda e toda
transicao fica congelada no comeco.

Injete `* { transition: none !important }` antes da varredura e remova
depois. O elemento vizinho sem transicao lendo certo enquanto o
transicionado le errado e a assinatura desse erro.

## Os pisos

- texto normal: 4,5:1
- texto grande (>= 24px, ou >= 19px em 600): 3:1
- indicador de foco e borda de controle: 3:1
- marca de grafico contra a superficie: 3:1

## Os dois erros que se repetem

- **`--secondary` nao e cor de texto em modo nenhum.** 2,61 a 4,25:1
  sobre `--surface`, abaixo do piso nos quatro modos. E cor de BORDA.
  Texto pequeno e metadado tomam `--muted`. Nos arquivos da linguagem
  isso fechou em 1.5.1 (`patterns.css` desde 1.4.2, `agent.css` com as
  27 trocas em 1.5.1), entao um achado desses hoje e codigo do APP, e a
  correcao e trocar por `--muted`, nunca clarear o secondary.
- **Slot de grafico como tipo tambem falha.** `--chart-2` da 3,38:1 a
  20px e 3,66:1 a 13px. Cor de serie vai na MARCA (ponto, barra,
  disco); o rotulo fica na tinta de texto.

## Como resolver a cor de verdade

Tres armadilhas de conversao, e cada uma ja produziu numero errado:

- **Fundo com alfa compoe, nao cobre.** Uma etiqueta com
  `rgba(45, 90, 122, 0.24)` sobre a superficie NAO tem esse rgba como
  fundo: o fundo real e a mistura. Tratar o alfa como opaco reprovou
  as tres etiquetas em 1,0-1,6 quando o composto real dava 5,4-6,8.
  Suba a ancestralidade acumulando camadas translucidas ate o primeiro
  fundo opaco e componha na ordem inversa.
- **`color-mix` sai como `oklab(...)` no valor computado**, e um parser
  de rgb devolve lixo silencioso. Converta toda cor pelo canvas: pinte
  um pixel com `fillStyle` e leia com `getImageData`. O canvas aceita
  qualquer sintaxe de cor que o CSS aceite.
- **O CSS ligado vem do cache mesmo em navegacao nova.** So a troca do
  `href` por um com sufixo aleatorio garante o arquivo do disco, e a
  sonda que confirma e ler a cor de um elemento conhecido antes e
  depois. Ja aconteceu duas vezes na mesma sessao.

## Saida

Uma linha por falha, com o numero:

    .card .meta        --secondary sobre --surface   3.4:1  (piso 4.5)  -> --muted
