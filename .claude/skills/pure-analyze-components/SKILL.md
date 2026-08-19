---
name: pure-analyze-components
description: Analisa cada componente de um arquivo ou de uma tela contra o vocabulario de Pure Design (raio por papel, vidro por tamanho, um tamanho por classe, cor por funcao), aponta os problemas e aplica a correcao. Use para "analisar os componentes", "esse componente esta certo", "auditar o design system", "analyze components".
---

# Analise de componente

Um componente esta certo quando cada valor dele saiu do papel que ele
cumpre, nao do que ficou bom na tela.

## As cinco perguntas, nesta ordem

**1. O raio saiu do papel?**
`--radius-surface` 12 em cartao, painel, celula de grade, folha.
`--radius-field` 8 em campo. `--radius-media` 8 em imagem.
`--radius-control` cheio em controle. `--radius-circle` em avatar e
radio. `--radius-mark` 4 em marca de grafico. Nenhum canto vivo em lugar
nenhum, e a escada e concentrica: filho nunca arredonda mais que o pai.

**2. O desfoque saiu do tamanho?**
Raio grande em elemento baixo faz o Chrome amostrar alem da caixa.
`.glass-thin` 4px, `.glass` 16px (o controle padrao), `.glass-frost`
30px (superficie que carrega o proprio texto, e a unica texturizada),
`.glass-deep` 56px (barra de largura total), `--blur-card` 32px em
`.card-glass`, `--blur-pill` 72px so em `.overlay`. Texto sobre vidro e
sempre `--text`.

**3. Um tamanho por classe de controle?**
Controle e `--text-12`. Prosa e `--text-15`. Metadado e `--text-12`
mono. A unica excecao e campo de texto, que e `--text-field` (16px).
Titulo de secao e a unica funcao de `--font-display`, e quem usa
`--font-display` declara `--font-display-stretch` junto.

**4. A cor esta na funcao certa?**
Estado e `--status-*`, serie e `--chart-n`, e os dois NUNCA trocam de
lugar. Realce de sintaxe usa nivel de tinta (`--text`, `--muted`,
`--secondary`), nunca um slot de grafico. Tinta de diff e `color-mix`
sobre um token de estado. Nenhum hex fora de `tokens.css`.

**5. O modificador ganha na cascata?**
Um modificador que perde e um modificador que nao existe, e isso ja
aconteceu duas vezes nesta linguagem. `class="pill glass-accent"` saia
identico a `class="pill"` sem erro nenhum (1.4.2), e
`class="glass glass-frost"` saia com o preenchimento padrao (1.4.3).
Resolva a cascata regra por regra, nao no olho: pseudoclasse pesa na
mesma coluna que classe, e `:not()` soma o que carrega dentro.

## E a que quebra tudo em silencio

`backdrop-filter` declarado ANTES de `-webkit-backdrop-filter` some no
minificador. O Lightning CSS, que e o minificador do Tailwind v4 e do
Next, guarda so a ultima do par e nao recoloca a padrao. O Chrome
devolve `false` para `CSS.supports('-webkit-backdrop-filter', ...)`,
entao a pagina inteira compila limpa e renderiza sem desfoque nenhum.
A declaracao padrao vem sempre por ultimo.

Num projeto suspeito, antes de depurar qualquer outra coisa:
`getComputedStyle(el).backdropFilter`. Se der `none`, o projeto esta
numa copia anterior a 1.4.3 e o conserto e recopiar `web/*.css`.

## Corrigir

Aplique a correcao no arquivo, uma por vez, e diga qual regra cada uma
serve. Depois de aplicar, rode `node tools/check.mjs` se o repo da
linguagem estiver por perto.

## No Figma

`get_design_context` no no do componente devolve o codigo e os tokens
ligados; `get_variable_defs` diz quais variaveis estao de fato
amarradas. Um valor solto onde havia variavel e o achado mais comum.
