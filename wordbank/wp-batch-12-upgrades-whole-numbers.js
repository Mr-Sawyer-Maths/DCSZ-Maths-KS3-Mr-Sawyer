/* BATCH 12: Upgrades A: whole numbers, place value, negatives, powers. 12 slots. Guide: claude/word-problems-fill-guide.md, and the
   "Upgrades" box below. How this fits: claude/word-problems-complexity.md, "How we add without repeating ourselves".
   UPGRADES: each slot names a `base` template that already exists and keeps its `skel`. Read the base first (it is in the batch file named in the
   spec), then write a NEW generator for the same maths with ONE thing added: the twist in `tw` (or the table or choice the spec asks for).
   Don't copy the base's code and change a word: the upgrade should read as a different question. Reuse the base's number ranges if they work.
   The upgrade's `type` is usually one level above the base.
   Helpers in this batch start with `ua`. */
var uaN = v => v < 0 ? '−' + (-v) : String(v);      // −3 written with a real minus sign
var uaP = v => v < 0 ? `(${uaN(v)})` : String(v);      // −3 in brackets inside a calculation
var uaCom = v => v >= 10000 ? String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : String(v);      // 34500 → 34,500
var uaCold = ['Oslo', 'Moscow', 'Helsinki', 'Toronto', 'Winnipeg', 'Edinburgh', 'Reykjavik', 'Chicago', 'Warsaw', 'Beijing', 'Calgary'], uaWarm = ['Rome', 'Cairo', 'Madrid', 'Sydney'];
var uaDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var uaFactors = n => { const f = []; for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i); return f; };
var uaLcm = (a, b) => a / gcd(a, b) * b;
var uaCarry = (a, b) => { let c = 0; while (a > 0 || b > 0 || c > 0) { const s = a % 10 + b % 10 + c; if (s >= 10) return true; c = 0; a = Math.floor(a / 10); b = Math.floor(b / 10); } return false; };      // does a + b carry in columns?
var uaBorrow = (a, b) => { let br = 0; while (a > 0 || b > 0) { if (a % 10 - br < b % 10) return true; br = 0; a = Math.floor(a / 10); b = Math.floor(b / 10); } return false; };      // does a − b need an exchange?
var uaWrongProd = (b, n) => { const ds = String(n).split('').reverse().map(Number); let w = 0; ds.forEach((d, i) => { const c = d * b; w += (i === ds.length - 1 ? c : c % 10) * 10 ** i; }); return w; };      // column multiplication with every carry forgotten
var uaHubs = {London: [['Paris', 340], ['Madrid', 1260], ['Rome', 1430], ['Athens', 2390], ['Cairo', 3510], ['Dubai', 5470]],
  'New York': [['Chicago', 1150], ['Miami', 1760], ['Mexico City', 3360], ['Los Angeles', 3940], ['London', 5570]],
  Singapore: [['Bangkok', 1430], ['Hong Kong', 2590], ['Delhi', 4150], ['Tokyo', 5320], ['Sydney', 6300]],
  Sydney: [['Melbourne', 710], ['Auckland', 2160], ['Perth', 3290], ['Singapore', 6300]]};      // approximate flight distances in km, to the nearest 10
var uaLegs = [['London', 'Dubai', 5470], ['Dubai', 'Delhi', 2190], ['Delhi', 'Singapore', 4150], ['Cairo', 'Dubai', 2400], ['Dubai', 'Singapore', 5840], ['New York', 'London', 5570], ['London', 'Paris', 340],
  ['Sydney', 'Perth', 3290], ['Perth', 'Singapore', 3900], ['London', 'Madrid', 1260], ['Madrid', 'New York', 5760]];
var uaChains = [['London', 'Dubai', 'Delhi'], ['Dubai', 'Delhi', 'Singapore'], ['Cairo', 'Dubai', 'Singapore'], ['New York', 'London', 'Paris'], ['Sydney', 'Perth', 'Singapore'], ['London', 'Madrid', 'New York']];

T({id: 'up-w3-1-extra', base: 'w3-1', type: 4, needs: ['M8', 'N5'], areas: ['M', 'S'], skel: 'mult-then-sub', ctx: 'shopping', style: 'edexcel', cur: '£', marks: 3, tw: ['extra'],
  desc: 'several items at one price, paid with a note, find the change; one extra number (opening time, items left on the shelf, or the price of something not bought)',
  gen: () => {
    for (;;) {
      const name = nm(), [shop, noun, pl, other, plo, phi] = pick([['a stationery shop', 'shop', 'notebooks', 'pencil case', 2, 6], ['a bakery', 'bakery', 'loaves of bread', 'cake', 2, 4], ['a corner shop', 'shop', 'cartons of milk', 'bottle of juice', 2, 4],
        ['a market stall', 'stall', 'jars of jam', 'jar of honey', 3, 6], ['a sports shop', 'shop', 'water bottles', 'football', 3, 8], ['a garden centre', 'garden centre', 'plant pots', 'watering can', 3, 9]]);
      const a = ri(3, 6), b = ri(plo, phi), cost = a * b;
      if (cost > 49) continue;
      const c = pick([10, 20, 50].filter(x => x > cost).slice(0, 2)), change = c - cost, kind = pick(['open', 'left', 'other']);
      let ex, note, extraNum;
      if (kind === 'open') { extraNum = 0; ex = `The ${noun} opens at ${pick(['07:30', '08:00', '08:30', '09:00', '09:30'])}.`; note = 'The opening time is not needed'; }
      else if (kind === 'left') { extraNum = ri(12, 48); ex = `There are ${extraNum} ${pl} left on the shelf.`; note = `The ${extraNum} ${pl} left on the shelf are not needed`; }
      else { extraNum = ri(2, 9); ex = `A ${other} costs £${extraNum}, but ${name} does not buy one.`; note = `The £${extraNum} price is not needed`; }
      if (kind !== 'open' && [a, b, cost, c, change].includes(extraNum)) continue;
      if (kind === 'other' && extraNum === b) continue;
      const q = kind === 'other'
        ? `${name} goes to ${shop}. ${name} buys ${a} ${pl} at £${b} each. ${ex} ${name} pays with a £${c} note. Work out how much change ${name} gets. You must show all your working.`
        : `${name} goes to ${shop}. ${ex} ${name} buys ${a} ${pl} at £${b} each and pays with a £${c} note. Work out how much change ${name} gets. You must show all your working.`;
      return W(q, change, [`${a} × ${b} = ${cost}`, `${c} − ${cost} = ${change}`, note], {pre: '£'});
    }
  }});
T({id: 'up-w3-6-table', base: 'w3-6', type: 4, needs: ['M12', 'N5'], areas: ['M', 'A'], skel: 'two-products-add', ctx: 'leisure', style: 'cam', cur: '$', marks: 3,
  desc: 'ticket prices in a table of three kinds, a group buys two of the kinds: total cost (the third price is not needed)',
  gen: () => {
    let pa, pc, ps;
    do { pa = ri(8, 12); pc = ri(4, 7); ps = ri(5, 9); } while (ps === pc || ps === pa);
    const price = {Adult: pa, Child: pc, Senior: ps}, [k1, k2] = shuf(['Adult', 'Child', 'Senior']).slice(0, 2);
    const m = ri(1, 3), n = ri(2, 4), venue = pick(['a cinema', 'a zoo', 'a museum', 'a theatre', 'a science centre', 'a wildlife park']), grp = pick(['family', 'group', 'club']);
    const t = (cnt, k) => `${cnt} ${k.toLowerCase()} ticket${cnt > 1 ? 's' : ''}`, e1 = m * price[k1], e2 = n * price[k2], tot = e1 + e2;
    return W(`The table shows the ticket prices at ${venue}. A ${grp} buys ${t(m, k1)} and ${t(n, k2)}. Calculate the total cost.`, tot,
      [`${t(m, k1)}: ${m} × ${price[k1]} = $${e1}`, `${t(n, k2)}: ${n} × ${price[k2]} = $${e2}`, `$${e1} + $${e2} = $${tot}`],
      {pre: '$', table: [['Ticket', 'Price'], ['Adult', `$${pa}`], ['Child', `$${pc}`], ['Senior', `$${ps}`]]});
  }});
T({id: 'up-wn-2g-table', base: 'wn-2g', type: 3, needs: ['WA', 'WS'], areas: ['NW'], skel: 'big-numbers-add-or-subtract', ctx: 'travel', style: 'plain', cur: '', marks: 2,
  desc: 'table of flight distances: how much further one flight is than another (exchanging), or the total of two flights joined end to end (carrying)',
  gen: () => {
    const head = ['From', 'To', 'Distance (km)'];
    if (Math.random() < .5) {
      for (;;) {
        const hub = pick(Object.keys(uaHubs)), rows = shuf(uaHubs[hub]).slice(0, ri(3, Math.min(4, uaHubs[hub].length)));
        const pairs = [];
        rows.forEach(x => rows.forEach(y => { if (x[1] > y[1] && uaBorrow(x[1], y[1])) pairs.push([x, y]); }));
        if (!pairs.length) continue;
        const [far, near] = pick(pairs), diff = far[1] - near[1];
        return W(`The table shows the distances of some flights from ${hub}. How much further is the flight to ${far[0]} than the flight to ${near[0]}?`, diff,
          [`${far[1]} − ${near[1]} = ${diff}`], {suf: ' km', table: [head, ...rows.map(r => [hub, r[0], String(r[1])])]});
      }
    }
    for (;;) {
      const [A, B, C] = pick(uaChains), d1 = uaLegs.find(l => l[0] === A && l[1] === B)[2], d2 = uaLegs.find(l => l[0] === B && l[1] === C)[2];
      if (!uaCarry(d1, d2)) continue;
      const others = shuf(uaLegs.filter(l => ![A, B].includes(l[0]) && !(l[0] === A && l[1] === B) && !(l[0] === B && l[1] === C))).slice(0, ri(1, 2));
      const rows = shuf([[A, B, d1], [B, C, d2], ...others]);
      return W(`The table shows the distances of some flights. A plane flies from ${A} to ${B} and then from ${B} to ${C}. Work out how far the plane flies altogether.`, d1 + d2,
        [`${d1} + ${d2} = ${d1 + d2}`], {suf: ' km', table: [head, ...rows.map(r => [r[0], r[1], String(r[2])])]});
    }
  }});
T({id: 'up-w2-2-convert', base: 'w2-2', type: 2, needs: ['N21', 'N11'], areas: ['M', 'NP'], skel: 'mult-price', ctx: 'shopping', style: 'aqa', cur: '£', marks: 2, tw: ['convert'],
  desc: 'items priced in pence, several bought: total cost, answer asked in pounds (pence first, then ÷ 100)',
  gen: () => {
    for (;;) {
      const name = nm(), n = ri(3, 9), p = ri(15, 95), tot = n * p;
      if (p % 10 === 0 || tot < 100) continue;
      const [pl, where] = pick([['pencils', 'the school shop'], ['stickers', 'a craft stall'], ['balloons', 'a party shop'], ['erasers', 'the school shop'], ['sweets', 'a corner shop'], ['party hats', 'a party shop'], ['raffle tickets', 'a school fair'], ['postcards', 'a gift shop']]);
      const q = pick([`${name} buys ${n} ${pl} at ${where}. Each one costs ${p}p. Work out the total cost. Give your answer in pounds (£).`,
        `At ${where}, ${pl} cost ${p}p each. ${name} buys ${n} of them. Work out the total cost. Give your answer in pounds (£).`]);
      return W(q, tot / 100, [`${n} × ${p} = ${tot}p`, `${tot} ÷ 100 = ${mon(tot / 100, '£')}`], {pre: '£'});
    }
  }});
T({id: 'up-wn-3c-error', base: 'wn-3c', type: 5, needs: ['WM2', 'WS'], areas: ['NW'], skel: 'mult-then-sub-big', ctx: 'work', style: 'aqa', cur: '', marks: 3, tw: ['error'],
  desc: 'stock minus boxes sent out, with a student\'s working shown where the carry in the multiplication was forgotten: say what went wrong, then the correct number left',
  gen: () => {
    for (;;) {
      const b = ri(3, 9), n = ri(101, 999);
      if (n % 10 === 0) continue;
      const total = b * n, wrong = uaWrongProd(b, n);
      if (wrong === total || total > 4900) continue;
      const s = ri(Math.max(1000, total + 60), 5000), name = nm(), place = pick(['A warehouse', 'A school shop', 'A factory', 'A supplier']), item = pick(['pencils', 'notebooks', 'tins of beans', 'books', 'bottles of water', 'floor tiles']);
      const good = 'Forgot to carry in the multiplication';
      return W(`${place} has ${s} ${item}. It sends out ${b} boxes. Each box has ${n} ${item}. ${name} works out how many ${item} are left. ${name}'s working is ${b} × ${n} = ${wrong}, then ${s} − ${wrong} = ${s - wrong}. ${name} is wrong. What did ${name} do wrong? Work out the correct number of ${item} left.`, s - total,
        [`${b} × ${n} = ${total}, not ${wrong}`, `${name} forgot to carry in the multiplication`, `${s} − ${total} = ${s - total}`],
        {pick: {opts: shuf([good, 'Made a mistake in the subtraction', 'Added instead of subtracting']), a: good}});
    }
  }});
T({id: 'up-np-3a-decide', base: 'np-3a', type: 5, needs: ['NE'], areas: ['NP'], skel: 'estimate-product', ctx: 'leisure', style: 'edexcel', cur: '£', marks: 3,
  desc: 'estimate a total cost by rounding to 1 significant figure, then decide if the estimate is more or less than the exact cost (both numbers rounded the same way)',
  gen: () => {
    const r1 = v => Number(v.toPrecision(1)), ok = v => v % 10 !== 0 && v % 5 !== 0, up = Math.random() < .5, side = v => up ? r1(v) > v : r1(v) < v, name = nm();
    const C = [[(n, p) => `${name} is booking a trip to a theme park for ${n} people. Each ticket costs £${p}.`, 22, 49], [(n, p) => `${name} buys ${n} tickets for a concert. Each ticket costs £${p}.`, 32, 79],
      [(n, p) => `A club orders ${n} team shirts. Each shirt costs £${p}.`, 12, 29], [(n, p) => `${name} is organising a visit to a science museum for ${n} students. Each ticket costs £${p}.`, 11, 29],
      [(n, p) => `A school buys ${n} calculators. Each calculator costs £${p}.`, 11, 19], [(n, p) => `${name} books ${n} seats at the theatre. Each seat costs £${p}.`, 28, 68]];
    const [intro, lo, hi] = pick(C);
    for (;;) {
      const n = Math.random() < .45 ? ri(110, 490) : ri(12, 98), p = ri(lo, hi);
      if (!ok(n) || !ok(p) || !side(n) || !side(p)) continue;
      const est = r1(n) * r1(p), more = 'More than the exact cost', less = 'Less than the exact cost';
      return W(`${intro(n, p)} By rounding each number to 1 significant figure, estimate the total cost. Is your estimate more or less than the exact cost? Give a reason for your answer.`, est,
        [`${n} ≈ ${r1(n)} and ${p} ≈ ${r1(p)}`, `${r1(n)} × ${r1(p)} = £${est}`, `Both numbers were rounded ${up ? 'up' : 'down'}, so the estimate is ${up ? 'more' : 'less'} than the exact cost`],
        {pre: '£', pick: {opts: [more, less], a: up ? more : less}});
    }
  }});
T({id: 'up-np-2a-error', base: 'np-2a', type: 5, needs: ['N11'], areas: ['NP'], skel: 'convert-choose-direction', ctx: 'measures', style: 'aqa', cur: '', marks: 2, tw: ['error'],
  desc: 'a student converts a metric measurement wrongly (100 instead of 1000, divided instead of multiplied, or multiplied instead of divided): name the mistake, give the correct conversion',
  gen: () => {
    const name = nm(), [big, small, k] = pick([['km', 'm', 1000], ['kg', 'g', 1000], ['litres', 'ml', 1000], ['m', 'cm', 100]]), toSmall = Math.random() < .5;
    const kind = k === 1000 ? pick(['factor', 'dir']) : 'dir', from = toSmall ? big : small, to = toSmall ? small : big;
    let v, claim, truth, key;
    if (toSmall) {
      if (kind === 'factor') { do v = ri(21, 95); while (v % 10 === 0); v /= 10; truth = Math.round(v * k); claim = Math.round(v * 100); key = 'factor'; }
      else { v = k === 1000 ? ri(2, 9) : ri(12, 98); truth = v * k; claim = v / k; key = 'div'; }
    } else if (kind === 'factor') { v = ri(21, 95) * 100; truth = v / k; claim = v / 100; key = 'factor'; }
    else { do v = k === 1000 ? ri(21, 95) * 10 : ri(120, 980); while (k === 100 && v % 10 === 0); truth = v / k; claim = v * k; key = 'mul'; }
    const word = {km: 'kilometres', m: 'metres', cm: 'centimetres', kg: 'kilograms', g: 'grams', litres: 'litres', ml: 'millilitres'}, one = big === 'litres' ? 'litre' : big;
    const opts = {factor: 'Used 100 instead of 1000', div: 'Divided instead of multiplying', mul: 'Multiplied instead of dividing'};
    const fmt = x => uaCom(Number(nstr(x).replace(/,/g, '')));
    const calc = toSmall ? `${nstr(v)} × ${k} = ${nstr(truth)} ${small}` : `${nstr(v)} ÷ ${k} = ${nstr(truth)} ${big}`;
    return W(`${name} changes ${nstr(v)} ${from} into ${word[to]}. ${name} says that ${nstr(v)} ${from} is ${fmt(claim)} ${to}. ${name} is wrong. What mistake did ${name} make? Work out the correct number of ${word[to]}.`, truth,
      [`1 ${one} = ${k} ${small}`, `${name}: ${opts[key].charAt(0).toLowerCase() + opts[key].slice(1)}`, calc], {suf: ' ' + to, pick: {opts: [opts.factor, opts.div, opts.mul], a: opts[key]}});
  }});
T({id: 'up-nn-1a-table', base: 'nn-1a', type: 4, needs: ['N13'], areas: ['NN'], skel: 'neg-fall-through-zero', ctx: 'nature', style: 'cam', cur: '', marks: 2, neg: true,
  desc: 'table of midday and midnight temperatures over five days (most midnights below zero): which day had the biggest fall, and how big was it',
  gen: () => {
    const city = pick(uaCold), start = ri(0, 2), days = uaDays.slice(start, start + 5);
    for (;;) {
      const rows = days.map(d => { const mid = ri(-4, 8), fall = ri(3, 14); return [d, mid, mid - fall, fall]; }), mx = Math.max(...rows.map(r => r[3]));
      if (rows.filter(r => r[3] === mx).length > 1 || rows.filter(r => r[2] < 0).length < 3) continue;
      const best = rows.find(r => r[3] === mx)[0];
      return W(`The table shows the midday and midnight temperatures in ${city} on five days. On which day did the temperature fall the most from midday to midnight? Work out that fall.`, mx,
        ['Fall = midday − midnight', ...rows.map(r => `${r[0]}: ${uaN(r[1])} − ${uaP(r[2])} = ${r[3]}`), `The biggest fall is ${mx} on ${best}`],
        {suf: '°C', pick: {opts: days, a: best}, table: [['Day', 'Midday (°C)', 'Midnight (°C)'], ...rows.map(r => [r[0], uaN(r[1]), uaN(r[2])])]});
    }
  }});
T({id: 'up-nn-2a-back', base: 'nn-2a', type: 3, needs: ['N13'], areas: ['NN'], skel: 'neg-difference-between', ctx: 'nature', style: 'cam', cur: '', marks: 2, neg: true, tw: ['back'],
  desc: 'one city is a number of degrees colder or warmer than another, one temperature given: find the other (cold city colder, warm city warmer)',
  gen: () => {
    const cold = pick(uaCold), warm = pick(uaWarm), askCold = Math.random() < .5, d = ri(5, 18), flip = Math.random() < .5;
    if (askCold) {
      let t; do t = ri(2, 14); while (t - d === 0);
      const ans = t - d, link = `${cold} is ${d} degrees colder than ${warm}.`, given = `The temperature in ${warm} is ${t}°C.`;
      return W(`${flip ? given + ' ' + link : link + ' ' + given} Work out the temperature in ${cold}.`, ans, [`Colder, so subtract`, `${t} − ${d} = ${uaN(ans)}`], {suf: '°C'});
    }
    let t; do t = -ri(2, 12); while (t + d < 1);
    const ans = t + d, link = `${warm} is ${d} degrees warmer than ${cold}.`, given = `The temperature in ${cold} is ${uaN(t)}°C.`;
    return W(`${flip ? given + ' ' + link : link + ' ' + given} Work out the temperature in ${warm}.`, ans, [`Warmer, so add`, `${uaN(t)} + ${d} = ${ans}`], {suf: '°C'});
  }});
T({id: 'up-nx-2a-time', base: 'nx-2a', type: 4, needs: ['N19'], areas: ['NX'], skel: 'lcm-events-coincide', ctx: 'travel', style: 'cam', cur: '', marks: 3, tw: ['interpret'],
  desc: 'two vehicles leave together on the hour and then every a and b minutes: how many times they leave together in a 2, 3 or 4 hour span, including the start and the end',
  gen: () => {
    for (;;) {
      const a = ri(4, 30), b = ri(4, 30);
      if (a === b || Math.max(a, b) % Math.min(a, b) === 0) continue;
      const L = uaLcm(a, b), spans = [2, 3, 4].filter(s => (s * 60) % L === 0);
      if (L < 20 || L > 60 || !spans.length) continue;
      const s = pick(spans), h0 = ri(6, 14), t0 = `${String(h0).padStart(2, '0')}:00`, t1 = `${String(h0 + s).padStart(2, '0')}:00`, k = s * 60 / L, ans = k + 1;
      const [pl, one, place] = pick([['buses', 'bus', 'a bus station'], ['trains', 'train', 'a station'], ['ferries', 'ferry', 'a harbour'], ['coaches', 'coach', 'a coach station']]);
      return W(`Two ${pl} leave ${place} together at ${t0}. One ${one} leaves every ${a} minutes. The other ${one} leaves every ${b} minutes. Work out how many times the two ${pl} leave together from ${t0} to ${t1}, including at ${t0} and at ${t1}.`, ans,
        [`LCM of ${a} and ${b} = ${L}`, `${t0} to ${t1} is ${s} hours = ${s * 60} minutes`, `${s * 60} ÷ ${L} = ${k}`, `${k} + 1 = ${ans}, to include ${t0}`]);
    }
  }});
T({id: 'up-nx-3a-table', base: 'nx-3a', type: 4, needs: ['N18', 'WM1', 'WM2'], areas: ['NX', 'NW'], skel: 'square-then-multiply-cost', ctx: 'building', style: 'cam', cur: '$', marks: 3,
  desc: 'square lawn from its side, a table of three turf prices per square metre, cost for the named turf (the other two rows are not needed)',
  gen: () => {
    const s = ri(4, 12), A = s * s, kinds = shuf(['Standard', 'Garden', 'Premium', 'Sports', 'Shade', 'Hardwearing']).slice(0, 3);
    let ps; do ps = [ri(3, 9), ri(3, 9), ri(3, 9)]; while (new Set(ps).size < 3);
    const i = ri(0, 2), p = ps[i], ans = A * p, place = pick(['lawn', 'garden', 'back garden', 'front garden']);
    return W(`A square ${place} has sides of ${s} m. The table shows the prices of three kinds of turf. The ${place} is covered with ${kinds[i]} turf. Calculate the cost.`, ans,
      [`${s} × ${s} = ${A} square metres`, `${A} × ${p} = $${ans}`], {pre: '$', table: [['Turf', 'Price per square metre'], ...kinds.map((k, j) => [k, `$${ps[j]}`])]});
  }});
T({id: 'up-nx-2b-extra', base: 'nx-2b', type: 3, needs: ['N19'], areas: ['NX'], skel: 'hcf-largest-equal-groups', ctx: 'food', style: 'edexcel', cur: '', marks: 3, tw: ['extra'],
  desc: 'two kinds of item shared into identical bags with none left over: greatest number of bags, plus a number not needed (bags in the cupboard, or the size of each bag)',
  gen: () => {
    for (;;) {
      const h = ri(2, 12), p = ri(2, 9), q = ri(2, 9);
      if (p === q || gcd(p, q) !== 1 || h * Math.max(p, q) > 100) continue;
      const x = h * p, y = h * q, name = nm(), [i1, i2] = pick([['apples', 'oranges'], ['red pens', 'blue pens'], ['biscuits', 'cakes'], ['pencils', 'rubbers'], ['sandwiches', 'pies'], ['carrots', 'potatoes']]);
      const cup = Math.random() < .5, e = ri(15, 40);
      if ([x, y, h].includes(e)) continue;
      const ex = cup ? `There are ${e} empty bags in the cupboard.` : `Each bag is ${e} cm tall.`, note = cup ? `The ${e} bags in the cupboard are not needed` : `The ${e} cm height of a bag is not needed`;
      return W(`${name} has ${x} ${i1} and ${y} ${i2}. ${ex} ${name} shares them equally into bags. Every bag has the same number of ${i1} and of ${i2}. Nothing is left over. Work out the greatest number of bags. You must show all your working.`, h,
        [`Factors of ${x}: ${uaFactors(x).join(', ')}`, `Factors of ${y}: ${uaFactors(y).join(', ')}`, `The biggest number in both lists is ${h}`, note]);
    }
  }});
