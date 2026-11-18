/* BATCH 13: Upgrades B: fractions, decimals, percentages, equivalence, ratio. 12 slots. Guide: claude/word-problems-fill-guide.md.
   UPGRADES: read the box at the top of claude/wp-batch-12-upgrades-whole-numbers.js first. Each slot names its `base`; read the base, then write a
   new generator for the same maths with ONE thing added (the twist in `tw`, or the table or choice the spec asks for).
   Helpers in this batch start with `ub`. */
var ubLcm = (a, b) => a * b / gcd(a, b);
var ubTwo = maxL => { for (;;) {      // two simplest-form proper fractions with different denominators; a and b are their numerators over the common denominator L
  const D = [2, 3, 4, 5, 6, 8, 10, 12], d1 = pick(D), d2 = pick(D); if (d1 === d2) continue;
  const L = ubLcm(d1, d2), n1 = ri(1, d1 - 1), n2 = ri(1, d2 - 1);
  if (L > maxL || gcd(n1, d1) !== 1 || gcd(n2, d2) !== 1) continue;
  return {n1, d1, n2, d2, L, a: n1 * L / d1, b: n2 * L / d2}; } };
var ubPair = (lo, hi, maxSum) => { for (;;) { const a = ri(lo, hi), b = ri(lo, hi); if (a !== b && gcd(a, b) === 1 && a + b <= maxSum) return [a, b]; } };      // two different parts with no common factor
var ubOne = (giv, gp) => gp === 1 ? `1 part = ${giv}` : `${giv} ÷ ${gp} = ${giv / gp}`;      // never "÷ 1"
var ubOther = (...used) => { let s; do s = nm(); while (used.includes(s)); return s; };      // a name that is not already in the question
var ubPence = p => mon(p / 100, '£');      // 245 → £2.45, 250 → £2.50, 300 → £3
var ubBag = p => p < 100 ? `${p}p` : mon(p / 100, '£');      // a shelf price: 36p, £1.38
var ubT = v => v % 10 === 0 ? (v / 100).toFixed(1) : (v / 100).toFixed(2);      // a time in hundredths of a second: 1500 → 15.0, 1276 → 12.76
var ubCell = p => '£' + (p / 100).toFixed(2);      // table cell, always two decimal places

T({id: 'up-w4-4-convert', base: 'w4-4', type: 2, needs: ['F4', 'N11'], areas: ['FF', 'NP'], skel: 'frac-of-amount', ctx: 'food', style: 'cam', cur: '', marks: 2, tw: ['convert'],
  desc: 'a fraction of a bag whose mass is in kilograms, answer asked in grams (convert first, then the fraction)',
  gen: () => {
    for (;;) {
      const kg = pick([1, 1.5, 2, 2.5]), g = kg * 1000, d = pick([4, 5, 8, 10]), n = ri(2, d - 1);
      if (gcd(n, d) !== 1 || g % d !== 0) continue;
      const u = g / d;
      if (u >= 100 && u % 10 !== 0) continue;      // keep n × u a simple multiplication
      const food = pick(['flour', 'rice', 'sugar', 'oats', 'potatoes']), who = pick(['A recipe uses', 'A cake uses', 'A baker uses']), ans = u * n;
      return W(`${who} ${F(n, d)} of a ${nstr(kg)} kg bag of ${food}. Work out how many grams of ${food} are used.`, ans,
        [`${nstr(kg)} kg = ${g} g`, `${g} ÷ ${d} = ${u}`, `${u} × ${n} = ${ans}`], {suf: ' g'});
    }
  }});
T({id: 'up-ff-1a-error', base: 'ff-1a', type: 5, needs: ['F11'], areas: ['FF'], skel: 'frac-add-parts-of-whole', ctx: 'food', style: 'aqa', cur: '', marks: 2, tw: ['error'],
  desc: 'two people use fractions of the same whole, a student adds them wrongly (tops and bottoms added, bottoms changed but tops kept, or tops added over one bottom): name the mistake, give the correct fraction',
  gen: () => {
    for (;;) {
      const [A, B] = two(), S = ubOther(A, B), [whole, verb, done] = pick([['pizza', 'eats', 'eaten'], ['cake', 'eats', 'eaten'], ['bar of chocolate', 'eats', 'eaten'], ['tin of paint', 'uses', 'used'], ['bag of flour', 'uses', 'used']]);
      let f; do f = ubTwo(24); while (f.a + f.b >= f.L);
      const s = f.a + f.b, ans = fs(s, f.L), kind = pick(['tops', 'common', 'one']), tops = f.n1 + f.n2, cd = kind === 'tops' ? f.d1 + f.d2 : kind === 'common' ? f.L : pick([f.d1, f.d2]);
      if (tops * f.L === s * cd || tops >= cd) continue;
      const O = {tops: 'Added the tops and added the bottoms', common: 'Changed the bottoms but not the tops', one: 'Added the tops and kept one of the bottoms'};
      const conv = [f.d1 === f.L ? '' : `${f.n1}/${f.d1} = ${f.a}/${f.L}`, f.d2 === f.L ? '' : `${f.n2}/${f.d2} = ${f.b}/${f.L}`].filter(Boolean).join(' and ');
      const steps = [conv, `${f.a}/${f.L} + ${f.b}/${f.L} = ${s}/${f.L}`]; if (ans !== `${s}/${f.L}`) steps.push(`${s}/${f.L} = ${ans}`);
      steps.push(`${S}: ${O[kind].charAt(0).toLowerCase() + O[kind].slice(1)}`);
      return W(`${A} ${verb} ${F(f.n1, f.d1)} of a ${whole}. ${B} ${verb} ${F(f.n2, f.d2)} of the same ${whole}. ${S} says that ${F(tops, cd)} of the ${whole} is ${done} altogether. ${S} is wrong. What mistake did ${S} make? Work out the correct fraction of the ${whole} that is ${done}.`, ans, steps,
        {form: 'simplest', pick: {opts: shuf([O.tops, O.common, O.one]), a: O[kind]}});
    }
  }});
T({id: 'up-ff-3b-extra', base: 'ff-3b', type: 3, needs: ['F4', 'M12'], areas: ['FF', 'M'], skel: 'frac-of-amount-then-multiply', ctx: 'leisure', style: 'plain', cur: 'both', marks: 2, tw: ['extra'],
  desc: 'a fraction of a group goes on a trip and each pays the same; plus a number not needed (cost of the coach, number of adults going, or the leaving time): the total paid',
  gen: () => {
    const c = cur2(), [grp, trip, adults, payer] = pick([['students in Year 8', 'on a trip to the zoo', 'teachers', 'school'], ['members of a club', 'to see a film', 'club leaders', 'club'], ['children in a class', 'to a theme park', 'teachers', 'school'], ['students in a choir', 'to a concert', 'teachers', 'school']]);
    for (;;) {
      const d = pick([3, 4, 5, 6, 8, 10]), n = Math.random() < .15 ? 1 : ri(2, d - 1), m = ri(2, 6), p = ri(3, 12), goers = n * m;
      if (gcd(n, d) !== 1 || goers > 36) continue;
      const g = d * m, total = goers * p, kind = pick(['coach', 'adults', 'time']), cost = 20 * ri(5, 20), t = ri(2, 5);
      if ((kind === 'adults' && [n, d, m, p, goers].includes(t)) || (kind === 'coach' && cost === total)) continue;
      const ex = kind === 'coach' ? `The coach costs ${mon(cost, c)}. The ${payer} pays for the coach.` : kind === 'adults' ? `${t} ${adults} also go.` : `The coach leaves at ${pick(['08:00', '08:30', '09:00', '09:30'])}.`;
      const note = kind === 'coach' ? `The cost of the coach is not needed` : kind === 'adults' ? `The number of ${adults} is not needed` : 'The leaving time is not needed';
      return W(`${F(n, d)} of the ${g} ${grp} go ${trip}. ${ex} Each of the ${grp.split(' ')[0]} who go pays ${mon(p, c)}. Work out the total paid by them.`, total,
        [`${g} ÷ ${d} = ${m}`, ...(n === 1 ? [] : [`${m} × ${n} = ${goers}`]), `${goers} × ${mon(p, c)} = ${mon(total, c)}`, note], {pre: c});
    }
  }});
T({id: 'up-fd-3a-table', base: 'fd-3a', type: 3, needs: ['F15'], areas: ['FD'], skel: 'dec-add-then-change', ctx: 'shopping', style: 'aqa', cur: '£', marks: 2,
  desc: 'a price list table of 4 or 5 items: two are bought and paid for with a £5, £10 or £20 note, find the change (the other items are not needed)',
  gen: () => {
    const ITEMS = [['sandwich', 250, 495], ['bowl of soup', 220, 400], ['salad', 300, 495], ['slice of cake', 150, 350], ['cup of tea', 100, 220], ['glass of juice', 90, 260], ['muffin', 150, 300], ['cookie', 45, 150], ['toastie', 250, 450], ['flapjack', 120, 250]];
    for (;;) {
      const name = nm(), venue = pick(['a café', 'a snack bar', 'a school canteen']), rows = shuf(ITEMS).slice(0, ri(4, 5)).map(i => [i[0], 5 * ri(i[1] / 5, i[2] / 5)]);
      const [i1, i2] = shuf(rows).slice(0, 2), tot = i1[1] + i2[1], notes = [5, 10, 20].filter(n => n * 100 > tot);
      if (!notes.length || new Set(rows.map(r => r[1])).size < rows.length) continue;
      const note = pick(notes), ch = note * 100 - tot, a1 = /^[aeiou]/.test(i1[0]) ? 'an' : 'a', a2 = /^[aeiou]/.test(i2[0]) ? 'an' : 'a';
      return W(`The table shows some prices at ${venue}. ${name} buys ${a1} ${i1[0]} and ${a2} ${i2[0]}. ${name} pays with a £${note} note. Work out how much change ${name} gets.`, ch / 100,
        [`${ubPence(i1[1])} + ${ubPence(i2[1])} = ${ubPence(tot)}`, `£${note} − ${ubPence(tot)} = ${ubPence(ch)}`],
        {pre: '£', table: [['Item', 'Price'], ...rows.map(r => [r[0].charAt(0).toUpperCase() + r[0].slice(1), ubCell(r[1])])]});
    }
  }});
T({id: 'up-fd-2b-table', base: 'fd-2b', type: 3, needs: ['F15'], areas: ['FD'], skel: 'dec-compare-difference', ctx: 'sport', style: 'cam', cur: '', marks: 2,
  desc: 'a table of four runners\' times in seconds (one or two decimal places): the difference between the fastest and the slowest',
  gen: () => {
    const [ev, lo, hi] = pick([['a 100 m race', 1250, 1590], ['a 200 m race', 2600, 3400], ['a 50 m swim', 2800, 4200]]);
    for (;;) {
      const vals = Array.from({length: 4}, () => { const v = ri(lo, hi); return Math.random() < .5 ? Math.round(v / 10) * 10 : (v % 10 === 0 ? v + ri(1, 9) : v); });
      const ones = vals.filter(v => v % 10 === 0).length;
      if (new Set(vals).size < 4 || ones === 0 || ones === 4) continue;
      const names = []; while (names.length < 4) { const n = nm(); if (!names.includes(n)) names.push(n); }
      const mn = Math.min(...vals), mx = Math.max(...vals), nmn = names[vals.indexOf(mn)], nmx = names[vals.indexOf(mx)], diff = (mx - mn) / 100;
      const who = ev === 'a 50 m swim' ? 'swimmers' : 'runners';
      return W(`The table shows the times of four ${who} in ${ev}. Work out the difference between the fastest time and the slowest time.`, diff,
        [`Fastest: ${nmn}, ${ubT(mn)}. Slowest: ${nmx}, ${ubT(mx)}`, `${ubT(mx)} − ${ubT(mn)} = ${nstr(diff)} seconds`], {suf: ' seconds', table: [['Name', 'Time (seconds)'], ...names.map((n, i) => [n, ubT(vals[i])])]});
    }
  }});
T({id: 'up-fd-5a-convert', base: 'fd-5a', type: 5, needs: ['F16', 'WD3'], areas: ['FD', 'NW'], skel: 'best-buy-unit-price', ctx: 'shopping', style: 'edexcel', cur: '£', marks: 3, tw: ['convert'],
  desc: 'two bags of the same food, one priced in grams and one in kilograms: which is better value, and how many pence cheaper per 100 g',
  gen: () => {
    const [food, lo, hi] = pick([['rice', 15, 35], ['pasta', 18, 35], ['flour', 10, 25], ['sugar', 12, 25], ['oats', 15, 30], ['lentils', 20, 40]]);
    const g = pick([200, 300, 400, 500, 600, 800]), k = pick([1, 2, 3]), mg = g / 100, mk = k * 10, d = ri(2, 12), uc = ri(lo, hi - d), ud = uc + d, gCheaper = Math.random() < .5;
    const ug = gCheaper ? uc : ud, uk = gCheaper ? ud : uc, Tg = mg * ug, Tk = mk * uk, tg = `${g} g for ${ubBag(Tg)}`, tk = `${k} kg for ${ubBag(Tk)}`, gFirst = Math.random() < .5;
    const [b1, b2] = gFirst ? [tg, tk] : [tk, tg];
    return W(`A shop sells ${food} in two bags. One bag is ${b1}. The other bag is ${b2}. Which bag is better value for money? How much cheaper is that bag for each 100 g? Give your answer in pence.`, d,
      [`${k} kg = ${k * 1000} g`, `${Tg}p ÷ ${mg} = ${ug}p for 100 g`, `${Tk}p ÷ ${mk} = ${uk}p for 100 g`, `${ud}p − ${uc}p = ${d}p`], {suf: 'p', pick: {opts: [b1, b2], a: gCheaper ? tg : tk}});
  }});
T({id: 'up-w4-2-table', base: 'w4-2', type: 5, needs: ['F8'], areas: ['FP'], skel: 'pct-of-amount', ctx: 'shopping', style: 'ocr', cur: '£', marks: 3,
  desc: 'a sale table of three items with different prices and percentage discounts: which has the biggest saving, and how much is it (the biggest percentage is not always the biggest saving)',
  gen: () => {
    const wantMismatch = Math.random() < .5;
    for (;;) {
      const its = shuf(['jacket', 'trainers', 'backpack', 'headphones', 'watch', 'coat', 'tablet', 'hoodie']).slice(0, 3);
      const rows = its.map(it => { const p = 5 * ri(1, 8), price = (p % 10 === 0 ? 10 : 20) * ri(2, p % 10 === 0 ? 20 : 10); return {it, p, price, sav: price * p / 100}; });
      const sv = rows.map(r => r.sav), mxs = Math.max(...sv), ps = rows.map(r => r.p), mxp = Math.max(...ps);
      if (sv.filter(v => v === mxs).length > 1 || new Set(rows.map(r => r.price)).size < 3 || new Set(ps).size < 3) continue;
      const best = rows.find(r => r.sav === mxs), topPct = rows.find(r => r.p === mxp);
      if (wantMismatch && best === topPct) continue;
      return W(`The table shows three items in a sale at ${pick(['a sports shop', 'a department store', 'an online shop', 'a gift shop'])}. Which item has the biggest saving? Work out that saving.`, mxs,
        [...rows.map(r => `${r.p}% of £${r.price} = £${r.sav}`), `The biggest saving is £${mxs} on the ${best.it}`],
        {pre: '£', pick: {opts: its, a: best.it}, table: [['Item', 'Price', 'Discount'], ...rows.map(r => [r.it.charAt(0).toUpperCase() + r.it.slice(1), `£${r.price}`, `${r.p}%`])]});
    }
  }});
T({id: 'up-w5-1-extra', base: 'w5-1', type: 3, needs: ['F18'], areas: ['FP'], skel: 'pct-decrease', ctx: 'shopping', style: 'cam', cur: '$', marks: 2, tw: ['extra'],
  desc: 'a price reduced by a percentage, plus a number that is not needed (last year\'s price, the number left in the shop, or the date the sale ends): the sale price',
  gen: () => {
    for (;;) {
      const [item, shop, lo, hi] = pick([['coat', 'clothes shop', 2, 12], ['bike', 'bike shop', 5, 12], ['game', 'games shop', 1, 4], ['jacket', 'clothes shop', 2, 10], ['football', 'sports shop', 1, 3], ['backpack', 'sports shop', 2, 5]]);
      const A = ri(lo, hi) * 20, p = pick([10, 15, 20, 25, 30, 40]), off = A * p / 100, ans = A - off, kind = pick(['last', 'left', 'date']);
      let ex, note, e = 0;
      if (kind === 'last') { e = A + 10 * ri(1, 5); ex = `Last year the ${item} cost $${e}.`; note = `Last year's price is not needed`; }
      else if (kind === 'left') { e = ri(6, 30); ex = `There are ${e} ${item}s left in the ${shop}.`; note = `The number left in the shop is not needed`; }
      else { e = ri(10, 28); ex = `The sale ends on ${e} ${pick(['June', 'July', 'August', 'November', 'December'])}.`; note = 'The date the sale ends is not needed'; }
      if ([A, p, off, ans].includes(e)) continue;
      return W(`A ${item} costs $${A} in a ${shop}. ${ex} In a sale, the price of the ${item} is reduced by ${p}%. Calculate the sale price.`, ans,
        [`${p}% of ${A} = $${off}`, `${A} − ${off} = $${ans}`, note], {pre: '$'});
    }
  }});
T({id: 'up-fp-2b-error', base: 'fp-2b', type: 5, needs: ['F18'], areas: ['FP'], skel: 'pct-change-direction-from-story', ctx: 'shopping', style: 'aqa', cur: '£', marks: 2, tw: ['error'],
  desc: 'a price after a percentage added or taken off, a student gets it wrong (used the percentage as pounds, forgot to add or take it off, or went the wrong way): name the mistake, give the correct price',
  gen: () => {
    for (;;) {
      const [item, lo, hi] = pick([['coat', 2, 10], ['bag', 1, 6], ['lamp', 1, 5], ['chair', 2, 10], ['game', 1, 3], ['bike', 5, 15]]), S = nm();
      const [story, p, up, Pl, Ph] = pick([['A meal costs {s}. A service charge of 10% is added to the bill.', 10, true, 1, 6], ['A theatre ticket costs {s}. A booking fee of 15% is added.', 15, true, 1, 5], ['A phone costs {s}. A tax of 20% is added.', 20, true, 5, 20],
        [`A ${item} costs {s}. In a sale it is 25% cheaper.`, 25, false, lo, hi], [`A ${item} costs {s}. A shop takes 15% off the price.`, 15, false, lo, hi], [`A ${item} is priced at {s}. A student discount of 10% is given.`, 10, false, lo, hi]]);
      const P = 20 * ri(Pl, Ph), s = `£${P}`;
      const chg = P * p / 100, ans = up ? P + chg : P - chg, kind = pick(['pounds', 'forgot', 'way']);
      const claim = kind === 'pounds' ? (up ? P + p : P - p) : kind === 'forgot' ? chg : (up ? P - chg : P + chg);
      if (claim === ans) continue;
      const O = {pounds: 'Used the percentage as pounds', forgot: up ? 'Found the percentage but did not add it on' : 'Found the percentage but did not take it off', way: up ? 'Took the percentage off instead of adding it' : 'Added the percentage instead of taking it off'};
      return W(`${story.replace('{s}', s)} ${S} says that the price paid is £${claim}. ${S} is wrong. What mistake did ${S} make? Work out the correct price paid.`, ans,
        [`${p}% of ${s} = £${chg}`, `${s} ${up ? '+' : '−'} £${chg} = £${ans}`, `${S}: ${O[kind].charAt(0).toLowerCase() + O[kind].slice(1)}`], {pre: '£', pick: {opts: shuf([O.pounds, O.forgot, O.way]), a: O[kind]}});
    }
  }});
T({id: 'up-fe-3b-back', base: 'fe-3b', type: 5, needs: ['F6', 'F8'], areas: ['FE', 'FP'], skel: 'fraction-plus-pct-total', ctx: 'school', style: 'cam', cur: '', marks: 3, tw: ['back'],
  desc: 'a fraction and a percentage of a year group, the rest is a given number: work back to the whole year group (fraction to percentage, subtract from 100%, then up from 10% or 5%)',
  gen: () => {
    for (;;) {
      const d = pick([2, 4, 5, 10, 20]), n = ri(1, d - 1);
      if (gcd(n, d) !== 1) continue;
      const f = n * 100 / d, p = 5 * ri(1, 8), t = f + p, b = 100 - t, N = 20 * ri(5, 15);
      if (b < 10 || b > 60 || b % 5 !== 0 || f % 5 !== 0) continue;
      const B = N * b / 100, [o1, o2, o3, grp] = pick([['walk to school', 'cycle to school', 'come to school by bus', 'students in a year group'], ['have a school lunch', 'have a packed lunch', 'go home for lunch', 'students in a year group'], ['play football at lunch', 'play netball at lunch', 'do something else at lunch', 'students in a year group']]);
      const up = b % 10 === 0 ? (b === 10 ? [`10% = ${B}`] : [`${b}% = ${B}`, `10% = ${B} ÷ ${b / 10} = ${B / (b / 10)}`]) : [`${b}% = ${B}`, `5% = ${B} ÷ ${b / 5} = ${B / (b / 5)}`];
      const last = b % 10 === 0 ? `${B / (b / 10)} × 10 = ${N}` : `${B / (b / 5)} × 20 = ${N}`;
      return W(`${F(n, d)} of the ${grp} ${o1}. ${p}% of them ${o2}. The other ${B} ${o3}. Work out how many students are in the year group.`, N,
        [`${n}/${d} = ${f}%`, `${f}% + ${p}% = ${t}%`, `100% − ${t}% = ${b}%`, ...up, last]);
    }
  }});
T({id: 'up-ra-1b-convert', base: 'ra-1b', type: 3, needs: ['R6', 'N11'], areas: ['RA', 'NP'], skel: 'share-in-ratio-one-share', ctx: 'money', style: 'plain', cur: '£', marks: 2, tw: ['convert'], topics: ['ratio', 'money'],
  desc: 'two people share pounds and pence (like £2.40) in a ratio: how much one gets, answer in pence',
  gen: () => {
    for (;;) {
      const [A, B] = two(), [a, b] = ubPair(1, 7, 12), s = a + b, u = 5 * ri(2, 16), tot = s * u;
      if (tot < 150 || tot > 900 || tot % 100 === 0) continue;
      const first = Math.random() < .5, p = first ? a : b, ans = p * u;
      const what = pick(['of prize money', 'they earned washing cars', 'from a cake sale', 'of pocket money', 'they found in a jar']);
      return W(`${A} and ${B} share ${ubPence(tot)} ${what} in the ratio ${a} : ${b}. Work out how much ${first ? A : B} gets. Give your answer in pence.`, ans,
        [`${ubPence(tot)} = ${tot}p`, `${a} + ${b} = ${s} parts`, `${tot} ÷ ${s} = ${u}`, `${p} × ${u} = ${ans}p`], {suf: 'p'});
    }
  }});
T({id: 'up-ra-2b-error', base: 'ra-2b', type: 5, needs: ['R7'], areas: ['RA'], skel: 'order-swapped-ratio', ctx: 'nature', style: 'aqa', cur: '', marks: 2, tw: ['error'],
  desc: 'a ratio of two kinds of thing and the number of one kind given: a student used the ratio the wrong way round; name the mistake, give the correct number',
  gen: () => {
    const [place, X, Y] = pick([['In a park', 'dogs', 'cats'], ['On a lake', 'ducks', 'swans'], ['In a car park', 'cars', 'bikes'], ['In a choir', 'boys', 'girls'],
      ['On a farm', 'sheep', 'cows'], ['In a wood', 'oak trees', 'pine trees'], ['At a bird table', 'sparrows', 'robins'], ['In a field', 'horses', 'goats']]);
    const [a, b] = ubPair(2, 7, 12), first = Math.random() < .5, [gp, op, gx, ox] = first ? [a, b, X, Y] : [b, a, Y, X], S = nm(), w = ri(1, 3), u = op * w, giv = gp * u, ans = op * u, claim = giv / op * gp;
    const good = 'Used the ratio the wrong way round';
    return W(`${place} the ratio of ${X} to ${Y} is ${a} : ${b}. There are ${giv} ${gx}. ${S} says that there are ${claim} ${ox}. ${S} is wrong. What mistake did ${S} make? Work out how many ${ox} there are.`, ans,
      [ubOne(giv, gp), `${ox}: ${op} × ${u} = ${ans}`, `${S} used the ratio the wrong way round`],
      {pick: {opts: shuf([good, 'Added a number instead of scaling the ratio', 'Shared the whole number in the ratio']), a: good}});
  }});
