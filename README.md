# solucaocerta.site

Site estático (HTML + imagens), publicado a partir deste repositório.

- `index.html` + `img/`: página de vendas do Guia Morar no Paraguai + Checklist (raiz do domínio). `morar-no-paraguai/` só redireciona para a raiz, mantendo as UTMs.
  - Feita para celular. Contador "preço de lançamento até hoje" zera à meia-noite do horário de quem visita (página demonstrativa, nunca expira).
  - Checkouts Wiapy: Básico R$ 19,90 (`FgHer-qHkd5n`), Completo R$ 37,90 (`RyaOBWaerFmr`), oferta Completo R$ 29,90 (`nkKnxCHw8pR`). UTMs da URL são repassadas para os checkouts.
  - Clique no Básico abre um popup com o Completo por R$ 29,90 (com opção de seguir no Básico). Back redirect: na primeira vez que o visitante tenta voltar, o mesmo popup aparece.
  - Parcelas: Completo em 9x de R$ 5,49.
  - Rastreamento: script de UTM Lowtrack (`lt_px_9e5b36d19ef5`) e Microsoft Clarity `z3xxebceza` no `<head>`.
- `diagnostico-split/`: área de membros do Diagnóstico Split (137 fichas em 8 blocos, busca, visor de fichas e 6 bônus em PDF). Tem `noindex` e não tem login.
- A página de vendas do Diagnóstico Split foi tirada do ar em 26/10/2026 (continua no histórico do git, commit 41fb436).
