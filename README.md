# solucaocerta.site

Site estático (HTML + imagens), publicado a partir deste repositório.

- `index.html` + `img/`: página de vendas do Diagnóstico Split (137 fichas de diagnóstico para ar-condicionado split).
  - Contador "preço de lançamento até hoje" zera à meia-noite do horário de quem visita.
  - Botões de checkout (`data-checkout="basico"` e `data-checkout="completo"`) ainda apontam para `#ofertas`: troque pelo link do checkout.
- `diagnostico-split/`: área de membros (137 fichas em 8 blocos, busca, visor de fichas e 6 bônus em PDF). Tem `noindex` e não tem login.
