---
name: pure-motion-opportunities
description: Varre uma tela e aponta onde movimento ajuda de verdade e onde ele so atrapalha, escolhendo a receita de web/motion.css que serve. Use para "onde adicionar animacao", "essa tela precisa de motion", "find animation opportunities", "revisar as transicoes", "trocar duracao solta por token".
---

# Oportunidade de movimento

Movimento existe para explicar uma mudanca de estado. Se nada muda de
estado, nao ha o que animar, e a resposta certa e "aqui nao".

## Onde ajuda, e qual receita

| o que a tela faz                          | receita de motion.css   |
| gatilho abre uma superficie ancorada      | `.motion-dropdown`      |
| superficie central sem gatilho            | `.motion-modal` + `.motion-scrim` |
| aviso sobe de baixo                       | `.motion-toast`         |
| dica sobre um icone                       | `.motion-tip`           |
| dois icones no mesmo slot                 | `.motion-icon-swap`     |
| o rotulo muda no lugar                    | `.motion-text-swap`     |
| titulo e apoio entrando juntos            | `.motion-lines`         |
| ponto de notificacao aparece              | `.motion-badge`         |
| um numero atualiza                        | `.motion-digits`        |
| validacao reprovou                        | `.motion-shake`         |
| placeholder vira conteudo carregado       | `.motion-reveal`        |
| texto de progresso que precisa viver      | `.motion-shimmer`       |
| conjunto pequeno e exclusivo com realce   | `.motion-tabs`          |
| confirmacao concluida                     | `.motion-check`         |
| lista vira detalhe, passo 1 vira passo 2  | `.motion-pages`         |
| aglomerado de controle que se funde       | `.liquid` (patterns.css)|

Empate entre duas: fica a de menor custo.

## Onde NAO ajuda

- Movimento em algo que nao mudou de estado.
- Deslocamento no hover de um controle. Controle assenta, nao pula.
- Mais de um momento de enfase por fluxo. `.motion-check` custa
  `--duration-6` de proposito, para nao virar habito.
- Abertura de accordion por altura. O corpo sai do fluxo com
  `[hidden]`, e nao ha receita porque nao deve haver.

## Tokenizar o que ja existe

Ao encontrar duracao, curva ou distancia solta, case pelo USO e nao pelo
numero. Um fechamento de modal de 300ms vira `--duration-2` (150ms)
porque ambos sao "fechamento de modal", mesmo com os numeros distantes.
Se o uso nao casa com nenhum token, deixe como esta e liste como
`sem token de uso correspondente`. Nunca troque so porque o numero
ficou perto.

A tabela de remapeamento completa esta no cabecalho de `web/motion.css`.

## O que ja e proibido e nao vira achado de motion

`transition: all`; transicao de propriedade de layout; curva nova; falta
de guarda de `prefers-reduced-motion`. Isso e `pure-craft-review`.

## No Figma

`get_motion_context` devolve a animacao declarada no no. Traduza para a
receita equivalente, nao para keyframes novos. Se o arquivo pede uma
curva com ultrapassagem, diga que ela nao existe aqui e o que entra no
lugar.
