---
name: pure-spacing-audit
description: Ajusta padding, gap e margin para a escala de Pure Design e confere os dois eixos verticais da grade de doze colunas. Use para "auditar espacamento", "arrumar o padding", "alinhar a grade", "os espacos estao inconsistentes", "spacing audit".
---

# Auditoria de espacamento

A escala de 4/8pt que a maioria das ferramentas assume NAO e a escala
desta linguagem. Aqui a diagramacao usa **tres degraus e so tres**:

    24  aproxima o que pertence ao mesmo bloco
    48  separa blocos dentro de uma secao
    96  separa secoes

Os degraus menores (`--space-2` a `--space-20`) existem para dentro de um
componente: folga entre icone e rotulo, respiro de uma pilula. Eles nao
sao degraus de diagramacao. Um `margin-top: var(--space-32)` entre dois
blocos e um achado, mesmo sendo token.

## Os dois eixos

Todo texto comeca na coluna 1 ou na coluna 9 de doze. As classes ja
existem no template: `.axis-a` (1 a 7), `.axis-a-wide` (1 a 10),
`.axis-b` (9 a 13), `.bleed` (1 a 13). Um bloco comecando na coluna 3 ou
na 5 e um achado, mesmo que fique bonito.

Excecao declarada, e ela precisa estar declarada no codigo: grade de
especime, que le como tabela e nao como texto corrido.

## O que procurar

1. Valor literal de espaco. `padding: 20px`, `gap: 1.5rem`,
   `margin: 12px 0`. Todo valor e `var(--space-*)`.
2. Degrau de diagramacao fora de 24/48/96.
3. Bloco fora dos dois eixos.
4. Escada de raio invertida: um filho arredondando mais que o pai.
   `--radius-surface` 12 no cartao, `--radius-field` 8 no campo dentro
   dele, `--radius-media` 8 na imagem, `--radius-control` cheio no
   controle. Nunca canto vivo.
5. Area de toque abaixo de `--hit-min` (24px) ou de
   `--hit-min-touch` (44px) no toque. A classe `.hit` existe para
   quando a forma visivel e menor que a area.

## No Figma

`get_metadata` devolve a geometria de cada no sem o custo de
`get_design_context`. Some as folgas entre irmaos de um auto-layout e
compare com a escala. Nao peca screenshot para medir espaco: o pixel
mente na escala do zoom.

## Saida

    [quebra] .painel > .linha    gap 20px, fora da escala          -> var(--space-24)
    [polir]  section#sobre       comeca na coluna 3, fora do eixo  -> .axis-a ou .axis-b
