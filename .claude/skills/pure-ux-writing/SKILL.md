---
name: pure-ux-writing
description: Escreve e revisa o texto de interface segundo as regras de Pure Design: sentence case, sem legenda sob titulo, sem voz de marketing. Use para "revisar os textos da interface", "melhorar a copy", "ux writing", "o que escrever nesse botao", "mensagem de erro".
---

# Texto de interface

## As regras que decidem quase tudo

**Sentence case em tudo.** Titulo, rotulo, botao, cabecalho de tabela,
cabecalho de grupo, chip. Nenhuma caixa alta em lugar nenhum, e nenhuma
minuscula deliberada.

**Nada de legenda sob titulo.** Nao se escreve texto de apoio abaixo de
titulo, rotulo, cartao ou ajuste. Um cabecalho conciso e
auto-explicativo, e so. Texto de apoio entra em duas situacoes: quando
foi pedido, ou quando sem ele o usuario erra.

**O botao diz o que acontece.** "Salvar alteracoes", nao "OK". "Excluir
tres arquivos", nao "Confirmar". O rotulo do botao repete o verbo da
pergunta.

**Sem voz de produto.** Nada de "poderoso", "sem esforco", "em
segundos", "simplesmente". Nenhum ponto de exclamacao. Nenhum emoji, em
lugar nenhum: nem em rotulo, nem em mensagem, nem em texto de ajuda.

## Erro

Um erro tem tres partes e ele cabe em uma frase: o que aconteceu, por
que, e o que fazer agora.

    Ruim:  Ocorreu um erro.
    Ruim:  Nao foi possivel processar sua solicitacao no momento.
    Bom:   O arquivo passa de 10 MB. Envie uma versao menor.

Nunca culpe o usuario e nunca peca desculpa. "Voce digitou errado" e
"Desculpe pelo transtorno" gastam a linha sem dizer o que fazer.

## Vazio

Um estado vazio diz o que vai aparecer ali e qual e a proxima acao.
"Nenhum resultado" sem mais nada e uma tela morta.

    Nenhum projeto ainda. Crie o primeiro para comecar.

## Numero e unidade

Numero que se compara vai em `.num` (tabular) e em `--font-mono`.
Unidade por extenso quando cabe, abreviada quando nao: "3 minutos",
"3 min". Separador decimal e virgula em PT-BR e ponto em EN.

## Idioma

O que o usuario le e ingles, mesmo quando a conversa e em portugues:
titulo, rotulo, texto de interface, legenda de grafico, README de
repositorio. O que fica entre a equipe e portugues: comentario de
codigo, mensagem de commit, conversa.

## No Figma

`get_metadata` devolve o texto de cada no. Liste as trocas em tabela de
antes e depois; escreva no arquivo so depois de confirmar, e carregando
`figma-use` antes de `use_figma`.
