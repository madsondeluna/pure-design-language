# prussian

**Linguagem visual oficial para todo novo desenvolvimento.** Web e Python, extraída de `madsondeluna.github.io` e formalizada em tokens.

O resumo operacional das regras vive na seção "Design language: Prussian (official)" do `~/.claude/CLAUDE.md`, de onde alcança qualquer projeto. Ao mudar qualquer coisa aqui, sincronizar três lugares na mesma sessão: este repositório, aquela seção do CLAUDE.md, e a memória `prussian-design-system.md`. Uma mudança que chega em só um deles é um bug.

## A premissa

Três fontes entraram nesta versão e elas não são estilisticamente compatíveis. A leitura adotada, explícita para que possa ser contestada:

**A identidade vem do site.** Paleta slate azul (`#0D1321` a `#F4F6F9`), Geist para texto, Geist Mono para metadados, Cormorant Garamond 300 para títulos, superfícies sem raio separadas por filete de 1px, controles em pílula, vidro com saturação alta.

**A arquitetura vem de `devouringdetails.com`.** Tokens numéricos (`--text-13`, `--radius-8`, `--space-12`) em vez de camisetas P/M/G, e a disciplina de rampa numerada para os azuis. Nenhuma cor e nenhuma fonte de lá.

**O vocabulário de movimento vem de `motion.dev`.** As curvas nomeadas, `--ease-out-soft: cubic-bezier(.25,0,0,1)` em particular, que é a curva de saída dominante daquele site. A troca de accent por página que o motion.dev usa é um recurso próprio dele e não foi copiada.

O trabalho de fato não foi escolher cores: o site já tinha uma paleta coerente e nada mais. Não havia escala de tipo, de espaço, de raio, de elevação nem de movimento. Os valores estavam espalhados em estilos inline pelos componentes (`0.6875rem`, `0.9rem`, `0.45rem 1rem`, `0.2rem 0.65rem`, `blur(40px)` num lugar e `blur(72px)` em outro). Promover isso a escalas nomeadas é o que este pacote entrega.

## Arquivos

```
tokens/tokens.json          fonte única de verdade, legível por máquina
web/tokens.css              variáveis CSS, :root / :root.dark / :root.paper
web/theme.css               ponte @theme inline para Tailwind v4
web/patterns.css            os componentes escritos sobre os tokens
python/prussian/            pacote: palette, mpl, plotly
python/prussian-light.mplstyle   estilo matplotlib avulso
python/prussian-dark.mplstyle
python/streamlit/config.toml     tema Streamlit
python/streamlit/app.css         chrome que o config.toml não alcança
preview/index.html          guia da identidade visual, tudo renderizado ao vivo
tools/check.mjs             verifica as afirmações deste README
```

## Cor

### Quatro modos

A ordem é do mais claro ao mais escuro, e cada um tem um trabalho:

| Classe | Rampa | Fundo | Para que serve |
|---|---|---|---|
| `:root` | slate | `#F4F6F9` | o padrão, frio e neutro |
| `:root.paper-like` | paper | `#FAF8F1` | leitura longa e material impresso |
| `:root.deep-blue` | slate | `#0D1321` | o escuro azul da identidade original |
| `:root.dark` | graphite | `#0E0F13` | escuro neutro, cinza chumbo a quase preto |

Nota de migração importante: até a versão 1.0 a classe `dark` era o azul profundo. Agora `dark` é o neutro e o azul virou `deep-blue`. Quem migra do site `madsondeluna.github.io` e quer manter a aparência atual deve trocar a classe `dark` por `deep-blue`, e o `localStorage` que guarda o tema junto.

### As rampas

A rampa `slate` tem 15 passos e alimenta os modos claro, paper-like e deep-blue. Os cinco valores originais da paleta Space Cadet continuam sendo os âncoras: `#0D1321`, `#1D2D44`, `#3E5C76`, `#748CAB`, e o quinto, que no site foi trocado do creme `#F0EBD8` pelo frio `#F4F6F9`. O creme voltou como o modo `paper-like`.

A rampa `graphite` tem os mesmos 15 passos e alimenta o modo `dark`. É neutra por construção: croma OKLCH entre 0,007 e 0,012, um viés frio quase imperceptível na matiz 265. O modo dark abre mais contraste que o deep-blue em todos os pares. `--muted` sobe de 5,37 para 7,15, `--accent` de 6,94 para 9,86, e `--secondary` deixa de ser apenas decoração ao chegar em 5,53.

### Onde cada cor pode ser usada

Os valores abaixo são razões de contraste WCAG 2.1 calculadas, não estimadas. A regra de uso decorre delas.

| Token | Modo | Razão | Uso permitido |
|---|---|---|---|
| `--text` sobre `--bg` | claro e escuro | 17,13 | qualquer texto |
| `--muted` sobre `--bg` | claro | 6,47 | qualquer texto |
| `--muted` sobre `--surface` | claro | 6,02 | qualquer texto |
| `--muted` sobre `--bg` | escuro | 5,37 | qualquer texto |
| `--muted` sobre `--surface` | escuro | 4,02 | texto grande (18px ou 14px negrito) e componentes de interface; não usar em texto corrido |
| `--accent` sobre `--bg` | escuro | 6,94 | qualquer texto, e o anel de foco passa o mínimo de 3:1 |
| `--secondary` sobre `--bg` | claro | 3,19 | bordas, ícones e estados de foco; nunca texto |
| `--secondary` sobre `--surface` | claro | 2,97 | apenas decoração; nem texto nem elemento de interface que precise ser percebido |
| `--secondary` sobre `--bg` | escuro | 2,65 | apenas decoração |
| `--secondary` sobre `--surface` | escuro | 1,98 | apenas decoração |
| `--border` sobre `--bg` | ambos | 1,39 e 1,73 | filetes e divisores apenas |

Consequência prática: `--secondary` (`#748CAB`) no modo claro é cor de borda, não de texto. Onde o site usa `--muted` para prosa, está correto. Onde qualquer coisa usar `--secondary` para texto claro, está errado.

O modo `paper` fica a meio ponto do modo claro em todos os pares: 17,45 para texto, 6,59 para `--muted` sobre `--bg`, 5,87 sobre `--surface`, 3,25 para `--secondary`. As mesmas regras de uso valem sem alteração. Os oito slots de gráfico ficam entre 3,31 e 5,22 contra o fundo creme, todos acima do mínimo de 3:1 para marca.

As três cores de tag (`congress`, `conference`, `symposium`) passam 4,5:1 nos dois modos, entre 7,7 e 11,6.

As quatro cores de status (`good`, `warning`, `serious`, `critical`) ficam entre 5,54 e 8,62 nos dois modos, bem acima de 4,5:1, e têm significado reservado. Elas nunca viram "série 5" de um gráfico, e nunca aparecem sozinhas: sempre com ícone ou rótulo ao lado.

## Forma

O raio não é uma escala contínua a se escolher por gosto. A linguagem tem três decisões fixas:

**Superfícies têm raio zero.** Cartão, painel, célula de grade, campo de formulário, tabela. A separação vem do filete de 1px, não do canto arredondado.

**Controles têm raio total.** Botão, chip, pílula de ação, tag, seta de galeria. `--radius-full` ou `--radius-circle`.

**Mídia tem `--radius-8`.** Imagem, miniatura, iframe embutido.

Os passos intermediários (`--radius-2` a `--radius-16`) existem para componentes importados de biblioteca de terceiros que precisem ser aproximados, não para uso novo.

A grade de cartões usa a técnica do filete: as células não têm borda própria, o `gap: 1px` sobre um fundo `--border` desenha a grade inteira. É `.hairline-grid` em `patterns.css`.

### Vidro

O vidro é o material da identidade, não um enfeite de um componente. Ele tem cinco camadas e todas importam: preenchimento em gradiente vertical, desfoque do fundo, saturação, realce especular na aresta de cima e refração na de baixo. Tirar qualquer uma faz o resultado parecer uma superfície translúcida qualquer.

Há quatro texturas, e a diferença entre elas é quanto do fundo sobrevive. `.glass-thin` (4px) deixa quase tudo passar e serve a sobreposições onde o conteúdo de trás precisa continuar legível. `.glass` (16px) é o controle padrão. `.glass-frost` (30px) é o único que leva granulado, um `feTurbulence` dessaturado por cima do preenchimento, e é o que separa fosco de apenas translúcido: use em barra de ferramentas, paleta de comandos, sheet e modal. `.glass-deep` (56px) é para chrome de largura total. `.glass-accent` tinge o material com a cor de acento, e só um controle por grupo pode usá-lo.

As formas são independentes da textura: `.glass-sq`, `.glass-soft`, `.glass-round` e `.glass-circle`. `.glass-panel` monta uma grade interna de filete para barra flutuante. `.glass-stage` existe só para documentação: vidro sobre fundo liso não mostra nada, então o palco dá ao material algo para refratar.

A classe base é `.glass` e serve a qualquer forma: pílula, cartão, barra, popover, tooltip. `.pill` já vem de vidro porque é assim que a identidade usa; `.pill-solid` existe para onde o vidro não pode ir, como dentro de uma tabela densa ou sobre outra superfície translúcida.

O raio do desfoque é escolhido pelo tamanho da superfície, não por gosto. O raio precisa caber na caixa: um raio grande num elemento pequeno faz o navegador amostrar muito além dele, e o Chrome produz artefato de composição quando há vizinhos de vidro. Foi exatamente isso que acontecia com pílulas em `blur(72px)` lado a lado.

| Token | Valor | Onde |
|---|---|---|
| `--glass-blur` | 16px | pílula, chip, tooltip, qualquer superfície baixa |
| `--blur-card` | 32px | cartão, barra, painel, superfície grande |
| `--blur-pill` | 72px | apenas sobre canvas animado em tela cheia |

A transição do vidro é longa e amortecida por decisão: `--duration-5` (350ms) com `--ease-out-soft`. Ele assenta, não salta. Nada de deslocamento no hover, que era o que fazia o controle parecer brusco.

## Tipografia

Três famílias, três papéis, sem sobreposição.

**Cormorant Garamond 300** só em título de seção e no nome. Sempre com `--tracking-display` (-0.02em) e `--leading-none`. Nunca em texto corrido, nunca abaixo de `--text-32`.

**Geist Mono** só em metadado: numeração de seção, rótulo de campo, valor tabular, chip, código, sequência biológica. Com `--tracking-eyebrow` (0.12em) quando é rótulo. Nunca em parágrafo.

**Geist** em todo o resto.

A escala é numérica e os nomes são o tamanho: `--text-11` a `--text-56`. Os dois clamps do site viraram tokens (`--text-display-section`, `--text-display-name`) porque são responsivos por natureza e não cabem na escala fixa.

Medida de linha: `--measure-prose` (480px) é o padrão para texto de apoio. `.prose-justify` existe, mas é opcional e não é base: em coluna estreita o justificado abre rios de espaço entre palavras. O site aplica justificado em toda a coluna direita via `!important`; aqui isso é uma escolha por bloco.

## Movimento

Cinco curvas, cada uma com um trabalho:

| Token | Curva | Onde |
|---|---|---|
| `--ease-standard` | `cubic-bezier(.4,0,.2,1)` | troca de cor, fundo e borda em hover |
| `--ease-out` | `cubic-bezier(0,0,.2,1)` | entrada simples |
| `--ease-out-soft` | `cubic-bezier(.25,0,0,1)` | entrada de conteúdo, transição de aba |
| `--ease-out-expo` | `cubic-bezier(.16,1,.3,1)` | troca de slide, mudança de escala |
| `--ease-swift` | `cubic-bezier(.23,.88,.26,.92)` | deslocamento em hover, o empurrãozinho da pílula |

Durações de `--duration-1` (100ms) a `--duration-6` (500ms). O padrão de hover é `--duration-3` (200ms).

O deslocamento de hover é um token, não um número solto: `--nudge-1` (2px), `--nudge-2` (3px), `--nudge-3` (4px). A pílula grande recua 3px para a esquerda, a pílula dentro do cartão avança 4px para a direita.

Escada de entrada: 60ms por item, no máximo seis degraus, depois todos entram juntos. É `.stagger` em `patterns.css`.

Tudo respeita `prefers-reduced-motion: reduce`.

## Dados

A paleta de gráfico não é a paleta da interface. O azul ardósia da identidade tem croma OKLCH de 0,055, abaixo do piso de 0,10 em que uma cor ainda faz trabalho de identidade: usado como série, ele lê como cinza. A paleta de dados é uma família derivada, com o mesmo azul em versão saturada no slot 1.

Oito slots, ordem fixa, atribuídos em sequência e nunca ciclados:

| Slot | Hex | Nome |
|---|---|---|
| 1 | `#3973B1` | blue |
| 2 | `#9F8322` | gold |
| 3 | `#9E527F` | magenta |
| 4 | `#4C985F` | green |
| 5 | `#745BA5` | violet |
| 6 | `#BA6F3E` | orange |
| 7 | `#1990AD` | teal |
| 8 | `#AC5551` | red |

As oito matizes ficam no piso de croma (OKLCH 0,105 a 0,115) por decisão: a paleta é sóbria, não saturada. A ordem foi determinada por busca exaustiva sobre as permutações, maximizando a separação do pior par adjacente. Resultado verificado nos dois modos:

- Faixa de luminosidade: passa
- Piso de croma: passa
- Separação sob daltonismo: pior par adjacente delta-E 10,0 (deuteranopia), acima do alvo de 8
- Piso de visão normal: pior par adjacente delta-E 19,9, acima do piso de 15
- Contraste contra a superfície: todos os oito acima de 3:1

Em formas onde qualquer par de marcas pode encostar (dispersão, bolha, mapa, pequenos múltiplos), o limite é de **três séries**. Acima disso: agrupe o excedente, faceteie, ou acrescente uma segunda codificação. Não troque a paleta. `prussian.palette.series(n)` levanta erro acima de oito em vez de ciclar.

Rampas: `SEQUENTIAL` contínua de nove passos para heatmap e mapa de contato; `ORDINAL_LIGHT` e `ORDINAL_DARK` de sete passos discretos, validadas separadamente (a versão escura não é a clara invertida, são passos próprios ancorados no fundo escuro); `DIVERGING` de azul a âmbar com cinza neutro no centro.

Nunca dois eixos y no mesmo gráfico.

## Python

```python
from prussian import mpl
mpl.use("light")                    # ou "paper-like", "deep-blue", "dark"

fig, ax = plt.subplots()
ax.plot(x, y)                       # já sai no slot 1
mpl.finish(ax, title="Cobertura", subtitle="por amostra", ylabel="reads")
```

`mpl.use` aceita os quatro modos, aplica o tema global e registra quatro colormaps: `prussian`, `prussian_r`, `prussian_div`, `prussian_div_r`. `mpl.context(mode)` faz o mesmo dentro de um bloco `with`. `mpl.finish` cuida do que o rcParams não alcança: hierarquia de título alinhado à esquerda, rótulos no tom de tinta e nunca na cor da série, legenda sem caixa que aparece só a partir de duas séries, grade desligada em heatmap. `mpl.bar_gap` insere o vão de 2px entre segmentos empilhados.

```python
from prussian import plotly as pxt
pxt.use("light")                    # registra os quatro e define o padrão
```

Para quem não quer o pacote, `prussian-light.mplstyle` e `prussian-dark.mplstyle` fazem a parte de rcParams sozinhos.

Para app: copie `python/streamlit/config.toml` para `.streamlit/config.toml` e injete `app.css`. O `config.toml` não aceita dois temas, então o modo escuro entra pelo CSS via `prefers-color-scheme`.

## O que foi normalizado

Diferenças deliberadas em relação ao que está hoje no site. Nenhuma delas quebra a aparência; todas eliminam um valor solto.

Tamanhos de fonte `0.8rem` e `0.9rem` foram encaixados na escala como `--text-13` e `--text-15`. A diferença é de meio pixel.

Preenchimentos `0.45rem 1rem` e `0.2rem 0.65rem` viraram `--space-8 --space-16` e `--space-4 --space-10`.

`text-align: justify !important` na coluna inteira virou a classe opcional `.prose-justify`.

Os valores de blur passaram a ser escolhidos pelo tamanho da superfície, e a pílula caiu de 72px para 16px. Isso corrige um artefato real: em 72px o Chrome amostrava muito além da caixa e desenhava um bloco fantasma dentro do primeiro botão de uma fileira.

Sombras de vidro, que estavam escritas quatro vezes (repouso e hover, claro e escuro), viraram quatro tokens.

`--accent` subiu um passo no modo escuro. O `globals.css` do site não redefine `--accent` em `:root.dark`, então ele herda `#3E5C76` e o anel de foco fica em 2,65 contra o fundo escuro, abaixo do mínimo de 3:1 que a WCAG pede para indicador de foco. Com `--accent: #8CA0BA` (`--slate-400`) no escuro, a razão sobe para 6,94. `--secondary` continua em `#748CAB`, exatamente como no site.

Esta é a única mudança de valor entre `web/tokens.css` e o bloco de variáveis do `globals.css`, e a única que altera a aparência: os anéis de foco no modo escuro passam a ser visíveis. Todo o resto é idêntico ao que já está publicado, então a substituição não exige tocar em componente nenhum.

`patterns.css` é outra história. Ele mantém o `!important` nos hovers de `.hover-surface` e `.card-glass` porque os cartões do site definem `background` por estilo inline, e estilo inline vence qualquer seletor. Ao migrar um componente para estas classes, tire o `background` inline dele; aí o `!important` pode sair junto.

## Migração dos apps

`apps/biohub/` e os subapps usam uma paleta sem relação com esta: `#0d6efd`, `#dc3545`, `#198754`, `#adb5bd`, ou seja, as cores padrão de Bootstrap. São arquivos CSS escritos à mão, um por app.

O caminho mais curto é importar `web/tokens.css` no topo de cada `style.css` e trocar os hexes literais pelos semânticos correspondentes: `#0d6efd` para `var(--accent)`, `#198754` para `var(--status-good)`, `#dc3545` para `var(--status-critical)`, `#adb5bd` para `var(--muted)`, os cinzas de fundo para `var(--bg)` e `var(--surface)`. Feito isso, os apps herdam o modo escuro de graça, que hoje eles não têm.

Onde esses apps desenham gráfico, a paleta correta é a de dados, não a da interface.

## Verificação

```
node tools/check.mjs
```

Sem dependência, sai com código 1 em qualquer falha. Ele reexecuta o que este README afirma, lendo os hexes de `tokens/tokens.json`:

- os cinco checks da paleta categórica nos dois modos, incluindo a simulação de protanopia e deuteranopia por Machado, Oliveira e Fernandes 2009 em severidade 1.0
- monotonia, passo mínimo e contraste de ponta das duas rampas ordinais
- as razões de contraste dos tokens semânticos nos três modos, cada uma contra o piso declarado
- consistência entre `tokens.json`, `web/tokens.css`, `python/prussian/palette.py` e `python/streamlit/app.css`, que carregam as mesmas cores em quatro sintaxes
- ausência de um nono slot de gráfico

Se alguém empurrar `--chart-4` meio passo, o delta-E de 10,0 citado acima deixa de ser verdade e o script acusa. É o que impede este README de virar ficção.

## O guia da identidade

`preview/index.html` é o guia: sete seções cobrindo cor, cor de dados, tipografia, espaço e forma, movimento, componentes e uso. Tudo renderizado ao vivo nos três modos, com a tabela de contraste recalculada a cada troca e um clique em qualquer cor copiando o nome do token.

A diagramação do guia segue quatro regras declaradas no topo do arquivo, e elas valem para qualquer página construída nesta linguagem:

**Dois eixos verticais.** Todo texto começa na coluna 1 ou na coluna 9 de uma grade de doze. Não existe terceiro ponto de partida. Grades de espécime são exceção declarada, porque leem como tabela e não como texto corrido.

**Três degraus de espaço.** 24px aproxima o que pertence ao mesmo bloco, 48px separa blocos dentro de uma seção, 96px separa seções. Nenhum quarto valor.

**Uma capitalização.** Sentence case em tudo. Nenhum texto em caixa alta, nenhum título em minúscula deliberada. As únicas maiúsculas fora do início de frase são nomes próprios e siglas.

**Um tamanho por classe.** Controle é `--text-12`, prosa é `--text-15`, metadado é `--text-12` em mono. Dois controles lado a lado nunca têm corpos diferentes.

O guia carrega `../web/tokens.css` e `../web/patterns.css` de propósito, para testar os arquivos de verdade e não uma cópia, e busca as três fontes no Google Fonts. Abra pelo servidor local, não por `file://`:

```
python3 -m http.server 8731
```

Depois `http://localhost:8731/preview/index.html`.
