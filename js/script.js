// ===== EDITE AQUI =====
const CHECKOUT_BASICO   = "https://pay.hotmart.com/X108359046Q?checkoutMode=10";
const CHECKOUT_COMPLETO = "https://pay.hotmart.com/R108359005R?checkoutMode=10";
const CHECKOUT_POPUP    = "https://pay.hotmart.com/R108359005R?off=h4qoimow&checkoutMode=10";   // oferta do popup ao clicar no básico
// ======================

// ---------- Data de hoje (no fuso da pessoa) ----------
const hoje = new Date().toLocaleDateString('es', { day: '2-digit', month: '2-digit', year: 'numeric' });
document.querySelectorAll('.data-fim').forEach(e => e.textContent = hoje);

// ---------- Checkouts e popup ----------
const qs = (s, el = document) => el.querySelectorAll(s);
qs('.checkout-completo').forEach(a => a.href = CHECKOUT_COMPLETO);
qs('.checkout-popup').forEach(a => a.href = CHECKOUT_POPUP);
qs('.checkout-basico').forEach(a => a.href = CHECKOUT_BASICO);
const popup = document.querySelector('.popup');
qs('.abre-popup').forEach(a => a.addEventListener('click', e => { e.preventDefault(); popup.hidden = false; }));
popup.addEventListener('click', e => { if (e.target === popup || e.target.classList.contains('pp-x')) popup.hidden = true; });

// ---------- Preço na moeda local ----------
// País pelo IP (Cloudflare; reserva: geojs; reserva final: fuso horário). Câmbio: open.er-api.com (cache de 12h).
const MOEDA = { AR:'ARS', BO:'BOB', BR:'BRL', CL:'CLP', CO:'COP', CR:'CRC', DO:'DOP', GT:'GTQ', HN:'HNL', MX:'MXN',
  NI:'NIO', PY:'PYG', PE:'PEN', UY:'UYU', ES:'EUR', PT:'EUR', FR:'EUR', IT:'EUR', DE:'EUR', NL:'EUR', BE:'EUR', IE:'EUR',
  AT:'EUR', GB:'GBP', CA:'CAD', AU:'AUD', CH:'CHF' }; // EC, SV, PA, PR, US e os demais ficam em USD
const FUSO = { 'America/Bogota':'CO','America/Mexico_City':'MX','America/Lima':'PE','America/Santiago':'CL',
  'America/Argentina/Buenos_Aires':'AR','America/Sao_Paulo':'BR','America/Caracas':'VE','America/Guayaquil':'EC',
  'America/La_Paz':'BO','America/Asuncion':'PY','America/Montevideo':'UY','America/Guatemala':'GT','America/Tegucigalpa':'HN',
  'America/El_Salvador':'SV','America/Managua':'NI','America/Costa_Rica':'CR','America/Panama':'PA','America/Santo_Domingo':'DO',
  'America/Puerto_Rico':'PR','Europe/Madrid':'ES' };

function arredonda(v) {               // preços "bonitos": 37,90 · 124,90 · 27.900
  if (v < 200) { let r = Math.floor(v) + 0.90; if (r - v > 0.6) r -= 1; return Math.round(r * 100) / 100; }
  if (v < 1000) return Math.ceil(v / 10) * 10;
  return Math.ceil(v / 100) * 100;
}
function formata(v, moeda, pais) {
  if (moeda === 'USD') return 'US$ ' + (Number.isInteger(v) ? v : v.toFixed(2).replace('.', ','));
  const loc = pais === 'BR' ? 'pt-BR' : pais ? 'es-' + pais : 'es';
  const dec = Number.isInteger(v) || ['CLP','PYG','COP','CRC'].includes(moeda) ? 0 : 2;
  return new Intl.NumberFormat(loc, { style:'currency', currency:moeda, minimumFractionDigits:dec, maximumFractionDigits:dec }).format(v);
}
function pinta(moeda, taxa, pais) {
  const loc = usd => moeda === 'USD' ? usd : arredonda(usd * taxa);
  qs('.p[data-usd]').forEach(el => { el.textContent = formata(loc(parseFloat(el.dataset.usd)), moeda, pais); });
  qs('.p[data-dif]').forEach(el => {           // diferença exata entre dois preços já arredondados
    const [a, b] = el.dataset.dif.split('-').map(parseFloat);
    el.textContent = formata(Math.round((loc(a) - loc(b)) * 100) / 100, moeda, pais);
  });
}
async function pais() {
  try { const t = await (await fetch('https://www.cloudflare.com/cdn-cgi/trace')).text(); const m = t.match(/loc=([A-Z]{2})/); if (m) return m[1]; } catch {}
  try { const j = await (await fetch('https://get.geojs.io/v1/ip/country.json')).json(); if (j.country) return j.country; } catch {}
  return FUSO[Intl.DateTimeFormat().resolvedOptions().timeZone] || '';
}
async function taxa(moeda) {
  const k = 'fx_usd', c = JSON.parse(localStorage.getItem(k) || 'null');
  if (c && Date.now() - c.t < 12 * 3600e3 && c.r[moeda]) return c.r[moeda];
  const j = await (await fetch('https://open.er-api.com/v6/latest/USD')).json();
  localStorage.setItem(k, JSON.stringify({ t: Date.now(), r: j.rates })); return j.rates[moeda];
}
pinta('USD', 1, '');                   // mostra em dólar na hora; troca quando souber o país
(async () => {
  try {
    const pp = new URLSearchParams(location.search).get('pais'); // teste: ?pais=CO
    const cc = (pp || await pais()).toUpperCase(), moeda = MOEDA[cc] || 'USD';
    if (moeda !== 'USD') { const tx = await taxa(moeda); if (tx) pinta(moeda, tx, cc); }
  } catch { /* se falhar, fica em USD */ }
})();

// ---------- Lightbox e carrosséis ----------
const lb = document.querySelector('.lightbox'), lbImg = lb.querySelector('img');
lb.addEventListener('click', e => { if (e.target !== lbImg) lb.hidden = true; });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { lb.hidden = true; popup.hidden = true; } });

qs('.carrossel').forEach(c => {
  const t = c.dataset.tema;
  c.innerHTML = `<h3><small>10 METÁFORAS BÍBLICAS</small>${c.dataset.titulo}</h3>
    <div class="trilho">${[1,2,3,4].map(n => `<img src="images/${t}_${n}.webp" width="760" height="1075" loading="lazy" alt="Ficha ${c.dataset.titulo} ${n}">`).join('')}</div>
    <div class="nav"><button aria-label="Anterior">‹</button><div class="dots">${'<span></span>'.repeat(4)}</div><button aria-label="Siguiente">›</button></div>`;
  const tr = c.querySelector('.trilho'), dots = [...c.querySelectorAll('.dots span')], [prev, next] = c.querySelectorAll('.nav button');
  const passo = () => tr.querySelector('img').offsetWidth + 16;
  const marca = () => { const i = Math.round(tr.scrollLeft / passo()); dots.forEach((d, k) => d.classList.toggle('on', k === Math.min(i, 3))); };
  prev.onclick = () => tr.scrollBy({ left: -passo(), behavior: 'smooth' });
  next.onclick = () => tr.scrollBy({ left: passo(), behavior: 'smooth' });
  tr.addEventListener('scroll', marca); marca();
  tr.querySelectorAll('img').forEach(i => i.onclick = () => { lbImg.src = i.src; lb.hidden = false; });
});
