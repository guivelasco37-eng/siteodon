# solucaocerta.site

Site estático (HTML + imagens), publicado a partir deste repositório.

- `index.html` + `img/`: página de vendas do Guia Morar no Paraguai + Checklist (raiz do domínio). `morar-no-paraguai/` só redireciona para a raiz, mantendo as UTMs.
  - Feita para celular. Contador "preço de lançamento até hoje" zera à meia-noite do horário de quem visita (página demonstrativa, nunca expira).
  - Checkouts Wiapy: Básico R$ 19,90 (`FgHer-qHkd5n`), Completo R$ 37,90 (`RyaOBWaerFmr`), oferta Completo R$ 29,90 (`nkKnxCHw8pR`). UTMs da URL são repassadas para os checkouts.
  - Clique no Básico abre um popup com o Completo por R$ 29,90 (com opção de seguir no Básico). O popup se ajusta à altura da tela (testado de 320x480 a 412x915): em telas baixas some a imagem para os botões aparecerem sem rolar.
  - Parcelas: Completo em 9x de R$ 5,49.
  - Rastreamento: script de UTM Lowtrack (`lt_px_9e5b36d19ef5`) e Microsoft Clarity `z3xxebceza` no `<head>`.
- `diagnostico-split/`: área de membros do Diagnóstico Split (137 fichas em 8 blocos, busca, visor de fichas e 6 bônus em PDF). Tem `noindex` e não tem login.
- A página de vendas do Diagnóstico Split foi tirada do ar em 26/10/2026 (continua no histórico do git, commit 41fb436).
- `app-mp-k7x2/`: app "Meu Plano de Mudança" (upsell). Webapp instalável (manifest + service worker), sem login, `noindex`. Checklist das 8 fases, documentos por pessoa da família (aviso de antecedente vencendo ou vencendo antes da Migraciones), datas (janela de 90 dias da permanente, saída fiscal), calculadora de taxas, frases em espanhol e cópia de segurança. O progresso fica no `localStorage` do aparelho (chave `mp_plano_v1`). Taxas no topo do script (`TAXA`): atualizar todo ano em julho.
- `up1/`: página de upsell do app (R$ 27,00): "Sua compra está quase concluída", barra 75%, VSL Wistia `qxdb2dqi0h` e botão Wiapy (`initWiapyUpsell`). A recusa leva para `down1/`. **Trocar `linkUrl` pelo link real do checkout do upsell** (está como `.../checkout/undefined`).
- `down1/`: downsell só em texto (R$ 17,90), "última chance", barra 90%, botão Wiapy. Recusa vai para `wiapy.com/login`. **Trocar `linkUrl` pelo link real do checkout do downsell.**
- `img/app-mockup.webp`: mockup do app usado no `up1/`.
