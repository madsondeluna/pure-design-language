---
name: pure-handoff
description: Transforma um componente em documentacao de entrega pronta para quem vai implementar: marcacao, tokens, estados, comportamento de teclado e os casos que quebram. Use para "documentar para o handoff", "component handoff", "especificar esse componente", "passar para o dev".
---

# Entrega de componente

Produto, nao verificacao. Nao entra em `pure-polish`.

Uma entrega serve para alguem construir sem perguntar nada. Se falta
uma resposta, ela vira uma pergunta, e a pergunta custa mais que a
linha que faltou.

## As seis secoes

**1. Marcacao.** O HTML minimo que faz o componente existir, com as
classes da linguagem, sem markup de demonstracao. Se o componente
precisa de estrutura duplicada, como `.liquid` precisa da folha e do
conteudo, mostre as duas camadas e diga por que.

**2. Tokens.** Tabela de propriedade para token. Nenhum valor literal
na coluna do token: se aparecer um, ele vira token em `tokens.css`
antes da entrega sair.

**3. Estados.** Repouso, hover, foco visivel, ativo, desabilitado,
carregando, erro, vazio. Um por linha, com o que muda. Estado que o
componente nao tem e uma linha dizendo isso.

**4. Comportamento de teclado.** Tecla por tecla. Tab, Enter, Espaco,
Escape, setas. Onde o foco entra, onde ele fica preso, para onde ele
volta. Um componente sem esta secao nao esta entregue.

**5. Os quatro modos.** O que muda entre `:root`, `.paper-like`,
`.deep-blue` e `.dark`. Na maioria dos casos nada muda porque tudo sai
de token, e essa frase e a resposta certa. Se algo muda, diga o que.

**6. Os casos que quebram.** Rotulo longo, lista vazia, lista de mil
itens, numero negativo, texto em outro idioma, tela de 320px, sem
javascript. Um por linha, com o que o componente faz. Este e o capitulo
que separa uma entrega de um print.

## Formato

Markdown, sentence case, sem legenda sob titulo, sem secao de premissa e
sem prosa justificando escolha. Documente o que a coisa e e o que ela
exige, nao por que foi escolhida.

## No Figma

`get_design_context` no no do componente devolve codigo e tokens
ligados, e `get_variable_defs` diz quais variaveis estao de fato
amarradas. Um valor solto onde havia variavel entra na entrega como
pendencia, nao como especificacao.
