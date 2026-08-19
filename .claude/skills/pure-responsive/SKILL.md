---
name: pure-responsive
description: Converte uma tela larga na versao estreita segundo as regras de Pure Design, ou audita uma tela existente no estreito. Use para "versao mobile", "desktop to mobile", "adaptar para celular", "isso quebra no estreito", "responsivo".
---

# Do largo para o estreito

A tela estreita nao e a larga encolhida. Encolher e o que produz um
controle de 18px de altura e um campo que da zoom ao focar.

## As regras, em ordem de decisao

**1. A grade colapsa em `--breakpoint-stack` (768px).** Os dois eixos
viram um: tudo passa a comecar na coluna 1. `.axis-b` deixa de ser uma
coluna a direita e vira um bloco abaixo. Nao invente um terceiro eixo
para o estreito.

**2. Os degraus nao encolhem proporcionalmente.** 96 vira 48 entre
secoes, 48 vira 24 entre blocos, e 24 continua 24. Um degrau abaixo de
24 nao existe na diagramacao, nem no estreito.

**3. Area de toque decide-se por `pointer: coarse`, NUNCA por largura.**
Um tablet de 1280px e toque e um celular ligado a um mouse nao e, e
decidir por largura erra os dois. Desde 1.5.0 `patterns.css` e
`agent.css` levam blocos `pointer: coarse` que sobem quatorze classes de
controle para `--hit-min-touch`. O que sobra para auditar e o que o
projeto criou por conta propria.

Antes de reportar qualquer numero de area de toque, confirme
`matchMedia('(pointer: coarse)').matches` na aba medida. Se der falso, a
medicao e de ponteiro fino e nao diz nada sobre o dedo.

**4. O tamanho do tipo nao encolhe.** Prosa continua `--text-15`,
controle continua `--text-12`, campo continua `--text-field` (16px).
O que encolhe e o titulo de secao, que troca de degrau na escala
(`--text-40` para `--text-24`, por exemplo), nunca sai dela.

**5. Vidro fundo custa caro em tela pequena, e a linguagem ja faz isso
sozinha desde 1.5.0.** Abaixo de `--breakpoint-stack` o `patterns.css`
desce `.glass-deep` de 56px para o raio do fosco e `.overlay` de 72px
para o do cartao. A classe continua a mesma e nenhuma marcacao muda, ou
seja, isto NAO e um achado a reportar: e comportamento. Reporte apenas
se o projeto tiver sobrescrito o bloco.

**6. O que sai da tela nao vira menu escondido por padrao.** Primeiro
tente empilhar. Um menu que esconde tres links esconde a navegacao para
ganhar 40px.

**7. Toda tabela mora dentro de `.table-scroll`.** O contentor rola, a
pagina nao. Nao e opcional e nao depende de a tabela ser larga hoje: uma
coluna a mais amanha e o defeito volta em silencio. Quando a tabela e
curta e a leitura ganha com isso, a alternativa e virar lista de
cartoes, um por linha; o que nao existe e tabela solta.

O corpo da pagina nunca rola na horizontal. O sinal que decide e
`documentElement.scrollWidth > innerWidth`, e nao o retangulo de um
filho: um elemento dentro de um contentor que rola reporta a largura
inteira mesmo estando contido.

## Verificar

Redimensione para 375x812 com o navegador e RECARREGUE: uma trava de
dispositivo lida no carregamento nao re-executa no redimensionamento.
Depois varra de novo com `pure-contrast-sweep` e `pure-craft-review`:
o estreito e outro desenho, e ele nao herda a aprovacao do largo.

Se a folha de estilo mudou entre uma medicao e outra, force a recarga
dela: o navegador serve a versao em cache e a medicao seguinte descreve
o arquivo antigo. Trocar o `href` do `<link>` por um com sufixo novo
resolve, e conferir uma regra conhecida no `cssRules` confirma que a
nova chegou. Uma medicao contra CSS em cache le exatamente como "a
correcao nao funcionou".

## No Figma

Se o pedido e gerar a versao estreita dentro do arquivo, carregue
`figma-use` antes de qualquer `use_figma`: e pre-requisito obrigatorio e
pular causa falha dificil de depurar. `figma-generate-design` cobre a
montagem de uma tela inteira secao por secao.
