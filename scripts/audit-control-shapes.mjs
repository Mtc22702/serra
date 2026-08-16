/**
 * Verifica che la regola «la forma dice il ruolo» regga davvero sul rendering,
 * non solo nel foglio di stile: apre ogni pagina, misura il raggio e l'altezza
 * effettivi di ogni controllo visibile e segnala chi esce dai valori attesi.
 *
 * Lo si esegue nel browser (vedi il blocco stampato) perché i raggi finali
 * dipendono dalla cascata, dai media query e dal tema: leggere i sorgenti non
 * basta a dire cosa vede l'utente.
 */
export const AUDIT_SNIPPET = String.raw`
(() => {
  const px = (v) => Math.round(parseFloat(v) || 0);
  const CONTROL = 10, PILL_MIN = 100;
  const rows = [];
  const seen = new Set();

  const isControl = (el) => {
    const t = el.tagName.toLowerCase();
    if (t === 'button' || t === 'select' || t === 'textarea') return true;
    if (t === 'input' && !['hidden','checkbox','radio'].includes(el.type)) return true;
    if (t === 'a' && /btn|cta|chip|tab|toggle|nav-link|pick|action/i.test(el.className || '')) return true;
    return /\b(btn|cta|chip|tab|toggle|seg)\b/.test(el.className || '');
  };

  for (const el of document.querySelectorAll('button,select,textarea,input,a,[class*=btn],[class*=chip],[class*=tab],[class*=toggle]')) {
    if (!isControl(el)) continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;

    const radius = px(cs.borderTopLeftRadius);
    const h = Math.round(r.height);
    const cls = (el.className || '').toString().split(' ').filter(Boolean).slice(0,2).join('.');
    const key = cls + '|' + radius + '|' + h;
    if (seen.has(key)) continue;
    seen.add(key);

    const isField = ['input','select','textarea'].includes(el.tagName.toLowerCase());
    const round = radius >= Math.min(r.width, r.height) / 2 - 1;
    const pill = radius >= PILL_MIN || (round && Math.abs(r.width - r.height) < 4);

    let verdict = 'ok';
    if (isField && radius !== CONTROL && !round) verdict = 'campo non a ' + CONTROL + 'px';
    if (!isField && !pill && !round && radius !== CONTROL) verdict = 'controllo fuori scala';
    if (h < 40 && h > 0) verdict += (verdict === 'ok' ? '' : ' + ') + 'bersaglio ' + h + 'px';

    rows.push({ cls: cls.slice(0,42), tag: el.tagName.toLowerCase(), radius, h, verdict });
  }

  const bad = rows.filter((r) => r.verdict !== 'ok');
  return JSON.stringify({
    totale: rows.length,
    fuoriRegola: bad.length,
    raggi: [...new Set(rows.map((r) => r.radius))].sort((a, b) => a - b),
    altezze: [...new Set(rows.map((r) => r.h))].sort((a, b) => a - b),
    dettaglio: bad.slice(0, 25),
  }, null, 1);
})()
`;

console.log(AUDIT_SNIPPET);
