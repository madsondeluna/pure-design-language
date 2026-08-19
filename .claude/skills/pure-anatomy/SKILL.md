---
name: pure-anatomy
description: Gera o documento de anatomia de um componente, com marcador numerado sobre a imagem e tabela de atributo por parte. Use para "documentar esse componente", "anatomia do componente", "create anatomy", "diagrama das partes".
---

# Anatomia de componente

Produto, nao verificacao. Nao entra em `pure-polish`.

## O que sai

Um documento com tres pecas, nesta ordem:

**1. A imagem com marcadores.** Um circulo numerado por parte,
posicionado sobre a parte. Numera-se na ordem de leitura: de fora para
dentro, de cima para baixo. O circulo usa `--radius-circle`,
`--text-11` mono e a tinta `--text` sobre `--surface`. Nunca uma cor de
grafico: um marcador nao carrega identidade de serie.

**2. A tabela de partes.** Uma linha por marcador:

    | # | parte | token | valor | obrigatoria |

A coluna do token e a que importa: `--radius-field`, `--space-12`,
`--text-12`. Se uma parte nao tem token, ela e um achado, nao uma
linha da tabela.

**3. As variantes e os estados.** Quais partes aparecem, somem ou
mudam em cada variante. Estado e repouso, hover, foco visivel, ativo,
desabilitado, carregando, erro. Um estado que o componente nao tem e
uma linha dizendo que nao tem, nao uma linha ausente.

## Como obter as partes

- **Figma**: `get_metadata` da a arvore do no com nome e geometria de
  cada filho. Os nomes das camadas viram os nomes das partes; se
  estiverem como "Frame 42", diga isso, e um achado.
- **Codigo**: leia a regra CSS do componente e a marcacao. Cada
  seletor filho e uma parte.

## Regras de escrita

Sentence case em tudo, inclusive nos cabecalhos da tabela. Sem legenda
sob titulo. A descricao de uma parte diz o que ela faz, nao como ela
parece: "recebe o rotulo e define a altura do controle", nao "retangulo
arredondado cinza claro".
