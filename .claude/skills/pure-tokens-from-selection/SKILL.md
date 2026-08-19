---
name: pure-tokens-from-selection
description: Extrai um design system preliminar de uma selecao de telas ou de assets e mapeia cada valor encontrado para o token de Pure Design correspondente, listando o que nao tem token. Use para "gerar design system dos assets", "extrair tokens", "design system gen", "mapear essas telas para a linguagem".
---

# Tokens a partir de uma selecao

Produto, nao verificacao. Nao entra em `pure-polish`.

Esta skill **nao gera uma paleta nova**. Pure Design ja e a paleta, a
escala de tipo, a escala de espaco e o conjunto de curvas. O que ela faz
e ler o que a selecao usa hoje e dizer, valor por valor, qual token
recebe cada um e o que nao tem onde encaixar.

## O metodo

**1. Extraia os valores brutos.** No Figma, `get_variable_defs` para o
que ja e variavel e `get_design_context` para o que esta solto. Em
codigo, varra hex, rgb, px, rem, ms e cubic-bezier.

**2. Agrupe por familia** antes de mapear: tinta, superficie, dado,
estado, tipo, tamanho, espaco, raio, movimento, vidro. Um valor
mapeado sem familia vira ruido: o mesmo cinza pode ser borda num lugar
e texto em outro, e sao tokens diferentes.

**3. Mapeie pelo PAPEL, nao pela proximidade de cor.** Um cinza usado
como borda vira `--border` mesmo que numericamente esteja mais perto de
`--muted`. Serie de grafico vai para `--chart-1` a `--chart-8` na ordem
em que aparece, nunca ciclada. Cor de estado vai para `--status-*`, e
estado e serie nunca trocam de lugar.

**4. Liste o que sobra.** Um valor sem token e uma de tres coisas, e o
relatorio precisa dizer qual:
   - **duplicata**: mesmo papel de um token existente com outro numero.
     Some.
   - **fora da linguagem**: papel que a linguagem nao cobre. Vira token
     novo em `tokens.css` E em `tokens/tokens.json` E no README, na
     mesma sessao, nunca literal no app.
   - **erro**: papel que a linguagem proibe. Caixa alta, curva com
     ultrapassagem, slot de grafico carregando estado. Nao vira token.

## Saida

Uma tabela de mapeamento e uma lista de sobras. Nada mais. Nao escreva
`tokens.css` sem confirmacao: mudar a linguagem muda todo projeto que
copiou dela.

    | valor encontrado | onde aparece    | familia    | token           |
    | #3E5C76          | 12 nos          | tinta      | --accent        |
    | 20px             | 4 nos           | espaco     | (sem token)     |
