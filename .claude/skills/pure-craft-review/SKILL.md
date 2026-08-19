---
name: pure-craft-review
description: Revisa uma interface contra as regras de craft de Pure Design: teclado, foco visivel, area de toque, formulario, estado, URL, movimento reduzido. Comportamento, nao material. Use para "revisar a interface", "esta usavel", "checklist de qualidade", "regras de craft", "better interface", "acessibilidade de interacao".
---

# Revisao de craft

Material e o capitulo do vidro. Isto aqui e comportamento: o que a tela
faz quando alguem a usa. O capitulo "Craft rules" do README carrega as
tabelas completas graduadas em deve / deveria / nunca. As que decidem a
maioria dos builds:

## Teclado

- Toda operacao possivel com o ponteiro e possivel com o teclado.
- `:focus-visible` com anel visivel: `--focus-ring` 2px de `--text`
  sobre vidro, `--focus-offset` 2px.
- `outline: none` sem substituto declarado nunca. Nem uma vez.
- Ordem de foco segue a ordem visual.
- Um modal prende o foco e devolve ao gatilho ao fechar.

## Alcance

- `--hit-min` 24px sempre, `--hit-min-touch` 44px no toque.
- Quando a forma visivel e menor, `.hit` estende a area sem estender o
  desenho.
- `-webkit-tap-highlight-color: var(--tap-highlight)`, que e
  transparente: o realce cinza do iOS nao pertence a nenhum modo.

## Formulario

- Nunca bloqueie digitacao nem colagem. Nem no campo de codigo, nem no
  de cartao, nem no de senha.
- Submeter incompleto SURGE o erro em linha e leva o foco ao primeiro:
  desabilitar o botao esconde o motivo.
- O botao de enviar guarda o rotulo e ganha um anel. Ele nao vira
  spinner sem legenda.
- Campo de texto e `--text-field` (16px). Abaixo disso o iOS da zoom ao
  focar, e isso e um defeito de layout, nao do usuario.

## Estado

- Vazio, escasso, denso e erro sao **quatro desenhos**, nao um com
  texto trocado.
- O esqueleto copia a caixa final. Um esqueleto de outra forma e um
  salto de layout com etapa extra.
- Numero que se compara usa `.num` (tabular).
- A URL carrega o estado: filtro, aba, modo, pagina. Recarregar volta
  para onde estava.
- `color-scheme` declarado por modo, senao o navegador pinta barra de
  rolagem e cursor com o tema do sistema.

## Movimento

- So `transform` e `opacity` (mais `filter` na camada de motion).
- Toda transicao nomeia as suas propriedades. `transition: all` nunca.
- Nenhuma transicao de propriedade de layout: `width`, `height`,
  `margin`, `padding`, `top`, `left`, `grid-template-rows`,
  `flex-basis`. Accordion abre tirando o corpo do fluxo com `[hidden]`;
  medidor cresce por `transform: scaleX()` com origem a esquerda.
- Tudo colapsa sob `prefers-reduced-motion`.
- Controle assenta, nao pula: `--duration-5` com `--ease-out-soft`, sem
  deslocamento no hover.

## Componentes que ja existem

Nao reescreva: importe. `patterns.css` traz `.field`, `.input`,
`.check`, `.field-error`, `.empty`, `.skeleton`, `.truncate`,
`.sr-only`, `.skip-link`, `.tip`, `.hit`.

## Duas armadilhas que nao sao de cascata

- `border-bottom: var(--hairline) solid transparent` deixa as tres
  longhands como pending-substitution, e um `border-bottom-color` de
  especificidade maior em outro lugar volta a ser substituido por
  `transparent`. Escreva as longhands.
- Transicao lida em aba de fundo fica congelada no valor inicial, porque
  nenhum quadro roda ali. Le exatamente como defeito de cascata e nao e.
