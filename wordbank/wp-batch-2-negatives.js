/* BATCH 2: Negative numbers and order of operations (NN). 12 slots. Guide: claude/word-problems-fill-guide.md
   Levels: N13 add and subtract negatives · N14 multiply and divide negatives · N15 order of operations. */
var COLD = ['Oslo', 'Moscow', 'Helsinki', 'Toronto', 'Winnipeg', 'Edinburgh', 'Reykjavik', 'Chicago', 'Warsaw', 'Beijing', 'Calgary'], WARM = ['Rome', 'Cairo', 'Madrid', 'Sydney'];
var cityFor = (t, not) => { let c; do { c = pick(t < 0 ? COLD : COLD.concat(WARM)); } while (c === not); return c; };      // a city whose weather suits the temperature
T({id: 'nn-1a', type: 1, needs: ['N13'], areas: ['NN'], skel: 'neg-fall-through-zero', ctx: 'nature', style: 'plain', cur: '', marks: 1, neg: true,
  desc: 'evening temperature falls overnight to below zero',
  gen: () => {
    const t = ri(1, 9), f = t + ri(1, 9), ans = t - f, city = pick(COLD);
    return W(pick([`At 10 pm the temperature in ${city} was ${t}°C. Overnight it fell by ${f} degrees. Work out the temperature in the morning.`,
      `The temperature in ${city} was ${t}°C in the evening. It fell by ${f} degrees overnight. Work out the temperature in the morning.`]), ans,
      [`${t} − ${t} = 0, and ${f - t} more to fall`, `${t} − ${f} = −${f - t}`], {suf: '°C'});
  }});
T({id: 'nn-1b', type: 1, needs: ['N13'], areas: ['NN'], skel: 'neg-floors-up-or-down', ctx: 'building', style: 'cam', cur: '', marks: 1, neg: true,
  desc: 'lift moves up from a basement floor or down past the ground floor',
  gen: () => {
    const n = v => v < 0 ? '−' + (-v) : String(v);
    const intro = 'A building has basement floors −1, −2 and −3. The ground floor is floor 0.';
    if (Math.random() < .5) {
      let s, u; do { s = ri(1, 3); u = ri(1, 6); } while (u === s);
      return W(`${intro} A lift is on floor ${n(-s)}. It goes up ${u} floor${u > 1 ? 's' : ''}. Which floor is the lift on now?`, u - s, [`Start at ${n(-s)}`, `${n(-s)} + ${u} = ${n(u - s)}`]);
    }
    const f = ri(1, 5), d = f + ri(1, 3);
    return W(`${intro} A lift is on floor ${f}. It goes down ${d} floors. Which floor is the lift on now?`, f - d, [`Start at ${f}`, `${f} − ${d} = ${n(f - d)}`]);
  }});
T({id: 'nn-2a', type: 2, needs: ['N13'], areas: ['NN'], skel: 'neg-difference-between', ctx: 'nature', style: 'cam', cur: '', marks: 1,
  desc: 'difference between two city temperatures, at least one negative',
  gen: () => {
    const n = v => v < 0 ? '−' + (-v) : String(v), p = v => v < 0 ? `(${n(v)})` : String(v);
    let a, b;
    do { a = -ri(1, 15); b = Math.random() < .5 ? ri(1, 20) : -ri(1, 12); } while (a === b);
    const [t1, t2] = Math.random() < .5 ? [a, b] : [b, a], c1 = cityFor(t1), c2 = cityFor(t2, c1), hi = Math.max(a, b), lo = Math.min(a, b), diff = hi - lo;
    return W(`The temperature in ${c1} is ${n(t1)}°C. The temperature in ${c2} is ${n(t2)}°C. Work out the difference between these two temperatures.`, diff,
      [`Higher − lower = ${n(hi)} − ${p(lo)}`, `${n(hi)} + ${-lo} = ${diff}`], {suf: '°C'});
  }});
T({id: 'nn-2b', type: 2, needs: ['N13'], areas: ['NN'], skel: 'neg-start-unknown', ctx: 'money', style: 'plain', cur: 'both', marks: 1,
  desc: 'balance before a payment, when the balance after is negative',
  gen: () => {
    const cu = cur2(), name = nm(), b0 = ri(5, 60), p = b0 + ri(3, 40), owed = p - b0;
    return W(`${name} has a bank balance of −${mon(owed, cu)}. A negative balance means ${name} owes the bank money. A payment of ${mon(p, cu)} has just gone out. What was the balance before the payment?`, b0,
      [`Balance before = balance after + payment`, `−${mon(owed, cu)} + ${mon(p, cu)} = ${mon(b0, cu)}`], {pre: cu});
  }});
T({id: 'nn-2c', type: 2, needs: ['N14'], areas: ['NN'], skel: 'neg-repeated-change-total', ctx: 'science', style: 'plain', cur: '', marks: 1, neg: true,
  desc: 'the same fall repeated several times, written as a negative total',
  gen: () => {
    const k = pick(['freezer', 'tea', 'dive', 'sub']);
    if (k === 'freezer') { const d = ri(2, 6), h = ri(3, 9); return W(`A freezer cools food by ${d}°C every hour. It cools the food for ${h} hours. Write the total change in temperature as a negative number.`, -d * h, [`${h} hours, each a change of −${d}`, `${h} × (−${d}) = −${d * h}`], {suf: '°C'}); }
    if (k === 'tea') { const d = ri(2, 6), m = ri(3, 9); return W(`A cup of tea cools by ${d}°C every minute. It cools for ${m} minutes. Write the total change in temperature as a negative number.`, -d * m, [`${m} minutes, each a change of −${d}`, `${m} × (−${d}) = −${d * m}`], {suf: '°C'}); }
    if (k === 'dive') { const d = ri(2, 6), m = ri(3, 8); return W(`A diver goes down ${d} m every minute. The diver keeps going for ${m} minutes. Write the total change in the diver's height as a negative number.`, -d * m, [`${m} minutes, each a change of −${d}`, `${m} × (−${d}) = −${d * m}`], {suf: ' m'}); }
    const d = pick([10, 20, 25, 30]), m = ri(3, 8);
    return W(`A submarine goes down ${d} m every minute. It keeps going for ${m} minutes. Write the total change in the submarine's height as a negative number.`, -d * m, [`${m} minutes, each a change of −${d}`, `${m} × (−${d}) = −${d * m}`], {suf: ' m'});
  }});
T({id: 'nn-3a', type: 3, needs: ['N13'], areas: ['NN'], skel: 'neg-two-changes', ctx: 'nature', style: 'plain', cur: '', marks: 2, neg: true,
  desc: 'start below zero, rise, then fall: find the final temperature',
  gen: () => {
    const n = v => v < 0 ? '−' + (-v) : String(v);
    let s, r, f, mid, fin;
    do { s = -ri(1, 10); r = ri(2, 12); f = ri(2, 12); mid = s + r; fin = mid - f; } while (fin === 0 || mid === 0);
    const city = pick(COLD);
    return W(`In ${city}, the temperature at 6 am was ${n(s)}°C. By noon it had risen by ${r} degrees. By midnight it had then fallen by ${f} degrees. Work out the temperature at midnight.`, fin,
      [`${n(s)} + ${r} = ${n(mid)}`, `${n(mid)} − ${f} = ${n(fin)}`], {suf: '°C'});
  }});
T({id: 'nn-3b', type: 3, needs: ['N14', 'N13'], areas: ['NN'], skel: 'neg-repeated-fall-from-start', ctx: 'science', style: 'cam', cur: '', marks: 2, neg: true,
  desc: 'a liquid cools by the same amount each minute and ends below zero',
  gen: () => {
    let T0, c, m; do { T0 = ri(4, 25); c = ri(3, 8); m = ri(3, 8); } while (c * m <= T0);
    const liq = pick(['A bottle of water', 'A carton of juice', 'A jug of milk', 'A bowl of soup']), ans = T0 - c * m;
    return W(`${liq} at ${T0}°C is put in a freezer. The temperature falls by ${c}°C every minute. Work out the temperature after ${m} minutes.`, ans,
      [`${m} × ${c} = ${c * m}`, `${T0} − ${c * m} = −${c * m - T0}`], {suf: '°C'});
  }});
T({id: 'nn-3c', type: 3, needs: ['N15', 'M12'], areas: ['NN', 'M'], skel: 'fixed-charge-plus-rate', ctx: 'travel', style: 'cam', cur: '$', marks: 2,
  desc: 'fixed charge plus a charge per unit, multiplication done first',
  gen: () => {
    const [f, r, k, q] = pick([
      () => { const f = ri(2, 6), r = ri(2, 5), k = ri(3, 12); return [f, r, k, `A taxi charges $${f} plus $${r} for each kilometre. Work out the cost of a journey of ${k} kilometres.`]; },
      () => { const f = ri(3, 8), r = ri(3, 6), k = ri(2, 8); return [f, r, k, `Bike hire costs $${f} plus $${r} for each hour. Work out the cost of hiring a bike for ${k} hours.`]; },
      () => { const f = ri(3, 6), r = ri(2, 4), k = ri(3, 10); return [f, r, k, `A go-kart track charges $${f} to enter plus $${r} for each lap. Work out the cost of ${k} laps.`]; }])();
    return W(q, f + r * k, [`${f} + ${r} × ${k}`, `Multiplication first: ${f} + ${r * k}`, `${f} + ${r * k} = $${f + r * k}`], {pre: '$'});
  }});
T({id: 'nn-4a', type: 4, needs: ['N13'], areas: ['NN'], skel: 'neg-two-results-then-difference', ctx: 'nature', style: 'cam', cur: '', marks: 3,
  desc: 'noon and midnight temperatures from a negative 6 am start, then their difference',
  gen: () => {
    const n = v => v < 0 ? '−' + (-v) : String(v), p = v => v < 0 ? `(${n(v)})` : String(v);
    const s = -ri(2, 9), r = ri(4, 14), d = ri(2, 8), noon = s + r, mid = s - d, diff = noon - mid, city = pick(COLD);
    return W(`The temperature in ${city} at 6 am was ${n(s)}°C. By noon it had risen by ${r} degrees. At midnight it was ${d} degrees lower than at 6 am. Work out the difference between the temperature at noon and the temperature at midnight.`, diff,
      [`Noon: ${n(s)} + ${r} = ${n(noon)}`, `Midnight: ${n(s)} − ${d} = ${n(mid)}`, `Difference: ${n(noon)} − ${p(mid)} = ${n(noon)} + ${-mid} = ${diff}`], {suf: '°C'});
  }});
T({id: 'nn-4b', type: 4, needs: ['N15', 'M12'], areas: ['NN', 'M'], skel: 'group-cost-brackets-minus-voucher', ctx: 'leisure', style: 'plain', cur: 'both', marks: 3,
  desc: 'group pays for two things each, then a voucher comes off the total',
  gen: () => {
    const cu = cur2(), [place, w1, w2, ra, rb] = pick([['a climbing wall', 'entry', 'a locker', [6, 14], [1, 3]], ['a football match', 'a ticket', 'a programme', [8, 20], [2, 5]], ['a skate park', 'entry', 'helmet hire', [5, 12], [2, 4]]]);
    const n = ri(3, 12), a = ri(ra[0], ra[1]), b = ri(rb[0], rb[1]), x = a + b, y = n * x, c = ri(2, Math.min(10, y - 1));
    return W(`A group of ${n} friends go to ${place}. Each person pays ${mon(a, cu)} for ${w1} and ${mon(b, cu)} for ${w2}. A voucher takes ${mon(c, cu)} off the total. Work out how much they pay altogether.`, y - c,
      [`${n} × (${a} + ${b}) − ${c}`, `Brackets first: ${a} + ${b} = ${x}`, `${n} × ${x} = ${y}`, `${y} − ${c} = ${mon(y - c, cu)}`], {pre: cu});
  }});
T({id: 'nn-5a', type: 5, needs: ['N13'], areas: ['NN'], skel: 'neg-which-is-colder-by', ctx: 'nature', style: 'aqa', cur: '', marks: 2,
  desc: 'which of two cities is colder, and by how many degrees',
  gen: () => {
    const n = v => v < 0 ? '−' + (-v) : String(v), p = v => v < 0 ? `(${n(v)})` : String(v);
    let a, b; do { a = ri(-15, 12); b = ri(-15, 12); } while (a === b || (a >= 0 && b >= 0));
    const c1 = cityFor(a), c2 = cityFor(b, c1);
    const diff = Math.abs(a - b), cold = a < b ? c1 : c2, hi = Math.max(a, b), lo = Math.min(a, b);
    return W(`The temperature in ${c1} is ${n(a)}°C. The temperature in ${c2} is ${n(b)}°C. Which city is colder? How many degrees colder is it?`, diff,
      [`${n(lo)} is lower than ${n(hi)}, so ${cold} is colder`, `${n(hi)} − ${p(lo)} = ${diff}`], {suf: '°C', pick: {opts: [c1, c2], a: cold}});
  }});
T({id: 'nn-5b', type: 5, needs: ['N15'], areas: ['NN'], skel: 'order-of-ops-find-the-error', ctx: 'school', style: 'aqa', cur: '', marks: 2,
  desc: 'a student works left to right: say what went wrong, then find the correct answer',
  gen: () => {
    const name = nm(), form = pick([1, 2, 3]);
    let a, b, c, d, expr, wrong, right, steps, op;
    if (form === 1) {
      a = ri(2, 12); b = ri(2, 9); c = ri(2, 9); expr = `${a} + ${b} × ${c}`; wrong = (a + b) * c; right = a + b * c; op = 'addition';
      steps = [`${name} did ${a} + ${b} first`, `Multiplication first: ${b} × ${c} = ${b * c}`, `${a} + ${b * c} = ${right}`];
    } else if (form === 2) {
      do { a = ri(15, 60); b = ri(2, 6); c = ri(2, 6); } while (b * c >= a - 2);
      expr = `${a} − ${b} × ${c}`; wrong = (a - b) * c; right = a - b * c; op = 'subtraction';
      steps = [`${name} did ${a} − ${b} first`, `Multiplication first: ${b} × ${c} = ${b * c}`, `${a} − ${b * c} = ${right}`];
    } else {
      do { a = ri(2, 12); b = ri(2, 8); c = ri(2, 8); d = ri(2, 9); right = a + b * c - d; } while (right <= 0);
      expr = `${a} + ${b} × ${c} − ${d}`; wrong = (a + b) * c - d; op = 'addition';
      steps = [`${name} did ${a} + ${b} first`, `Multiplication first: ${b} × ${c} = ${b * c}`, `${a} + ${b * c} − ${d} = ${a + b * c} − ${d} = ${right}`];
    }
    const good = `Did the ${op} before the multiplication`;
    return W(`${name} works out ${expr}. ${name}'s answer is ${wrong}. ${name} is wrong. What did ${name} do wrong? Work out the correct answer.`, right, steps,
      {pick: {opts: shuf([good, `Did the multiplication before the ${op}`, 'Got a times table fact wrong']), a: good}});
  }});
