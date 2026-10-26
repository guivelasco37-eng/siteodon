# solucaocerta.site

Site estático (HTML + imagens), publicado a partir deste repositório.

- `index.html` + `img/`: página de vendas do Diagnóstico Split (137 fichas de diagnóstico para ar-condicionado split).
  - Contador "preço de lançamento até hoje" zera à meia-noite do horário de quem visita.
  - Checkouts Wiapy: Básico R$ 17,90 (`mlxnERObeyF`) e Completo R$ 27,90 (`6ad6cce101d78b212dc4cc1c`). As UTMs da URL são repassadas para o checkout e o clique dispara InitiateCheckout no Pixel.
- Meta Pixel 2617204022047934 e Microsoft Clarity z0ghfn38y7 no `<head>`.
- `diagnostico-split/`: área de membros (137 fichas em 8 blocos, busca, visor de fichas e 6 bônus em PDF). Tem `noindex` e não tem login.

- `morar-no-paraguai/`: página de vendas do Guia Morar no Paraguai + Checklist (solucaocerta.site/morar-no-paraguai/).
  - Feita para celular. Contador "preço de lançamento até hoje" zera à meia-noite do horário de quem visita (página demonstrativa, nunca expira).
  - Botões ainda levam à seção de planos: falta ligar os links de checkout e colocar as parcelas (`[X]x de R$ [valor]`).
  - Sem Pixel/Clarity por enquanto.
