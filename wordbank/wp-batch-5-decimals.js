/* BATCH 5: Decimals (FD). 10 slots. Guide: claude/word-problems-fill-guide.md
   Levels: F5 tenths and hundredths · F15 adding and subtracting decimals · F16 multiplying and dividing decimals (0.3 × 4, 0.3 × 0.4, 1.6 × 7, 2.4 ÷ 8). */
var fdD = h => nstr(h / 100);      // hundredths as text: fdD(275) is '2.75'
var fdTwo = (lo, hi) => { let v; do { v = ri(lo, hi); } while (v % 10 === 0); return v; };      // an amount in hundredths whose last digit is not 0 (a real 2 d.p. number)
var fdOne = (lo, hi) => { let v; do { v = ri(lo, hi); } while (v % 10 === 0); return v * 10; };      // lo and hi in tenths; the amount comes back in hundredths and is not a whole number (a real 1 d.p. number)
T({id: 'fd-1a', type: 1, needs: ['F16'], areas: ['FD'], skel: 'dec-price-times-quantity', ctx: 'shopping', style: 'plain', cur: 'both', marks: 1,
  desc: 'price per metre or kilogram under 2.00 (one decimal place) times a whole number bought',
  gen: () => {
    const c = cur2(), name = nm(), n = ri(2, 9), h = fdOne(3, 19), p = h / 100, ans = h * n / 100;
    const [Cap, low, verb, per, pl] = pick([['Ribbon', 'ribbon', 'costs', 'a metre', 'metres'], ['String', 'string', 'costs', 'a metre', 'metres'], ['Rope', 'rope', 'costs', 'a metre', 'metres'],
      ['Apples', 'apples', 'cost', 'a kilogram', 'kilograms'], ['Carrots', 'carrots', 'cost', 'a kilogram', 'kilograms'], ['Potatoes', 'potatoes', 'cost', 'a kilogram', 'kilograms'],
      ['Bananas', 'bananas', 'cost', 'a kilogram', 'kilograms'], ['Onions', 'onions', 'cost', 'a kilogram', 'kilograms'], ['Rice', 'rice', 'costs', 'a kilogram', 'kilograms']]);
    return W(`${Cap} ${verb} ${mon(p, c)} ${per}. ${name} buys ${n} ${pl} of ${low}. Work out the cost.`, ans, [`${n} × ${mon(p, c)} = ${mon(ans, c)}`], {pre: c});
  }});
T({id: 'fd-2a', type: 2, needs: ['F15'], areas: ['FD'], skel: 'dec-start-unknown', ctx: 'measures', style: 'plain', cur: '', marks: 1,
  desc: 'some is taken away and some is left: find the amount at first (add), litres, m or kg',
  gen: () => {
    const a = fdTwo(11, 99), b = fdOne(11, 39), [x, y] = Math.random() < .5 ? [a, b] : [b, a];      // x is taken away or used, y is left
    const out = fdD(x), left = fdD(y), ans = (x + y) / 100, name = nm();
    const kind = pick(['l', 'm', 'kg']), liq = pick(['water', 'juice', 'milk', 'paint']), stuff = pick(['rope', 'ribbon', 'string', 'wire']), food = pick(['rice', 'flour', 'sugar', 'pasta']);
    const q = kind === 'l' ? `${name} pours ${out} litres of ${liq} out of a jug. ${left} litres of ${liq} is left in the jug. Work out how much ${liq} was in the jug at first.`
      : kind === 'm' ? `${name} cuts ${out} m off a piece of ${stuff}. The piece that is left is ${left} m long. Work out how long the piece was at first.`
      : `${name} uses ${out} kg of ${food} for cooking. ${left} kg of ${food} is left in the bag. Work out how much ${food} was in the bag at first.`;
    return W(q, ans, [`${out} + ${left} = ${nstr(ans)}`], {suf: kind === 'l' ? ' litres' : kind === 'm' ? ' m' : ' kg'});
  }});
T({id: 'fd-2b', type: 2, needs: ['F15'], areas: ['FD'], skel: 'dec-compare-difference', ctx: 'sport', style: 'cam', cur: '', marks: 1,
  desc: 'two athletes with results of different decimal places: how much further or how many seconds longer',
  gen: () => {
    const [A, B] = two(), ev = pick([['jump', 300, 590], ['throw', 2000, 4500], ['race100', 1250, 1590], ['race200', 2600, 3400], ['swim', 3000, 4500]]);
    const t = fdTwo(ev[1] + 1, ev[2]), o = fdOne(ev[1] / 10, ev[2] / 10), [ha, hb] = Math.random() < .5 ? [t, o] : [o, t];
    const big = Math.max(ha, hb), small = Math.min(ha, hb), bigName = ha > hb ? A : B, smallName = ha > hb ? B : A, ans = (big - small) / 100;
    const xa = fdD(ha), xb = fdD(hb), kind = ev[0];
    let q, suf = '';
    if (kind === 'jump') { q = `In the long jump, ${A} jumps ${xa} m and ${B} jumps ${xb} m. Work out how much further ${bigName} jumps than ${smallName}.`; suf = ' m'; }
    else if (kind === 'throw') { q = `In the javelin, ${A} throws ${xa} m and ${B} throws ${xb} m. Work out how much further ${bigName} throws than ${smallName}.`; suf = ' m'; }
    else { const d = kind === 'race100' ? 'runs 100 m' : kind === 'race200' ? 'runs 200 m' : 'swims 50 m';
      q = `${A} ${d} in ${xa} seconds. ${B} ${d} in ${xb} seconds. Work out how many seconds longer ${bigName} takes than ${smallName}.`; }
    return W(q, ans, [`${fdD(big)} − ${fdD(small)} = ${nstr(ans)}`], suf ? {suf} : {});
  }});
T({id: 'fd-2c', type: 2, needs: ['F16'], areas: ['FD'], skel: 'dec-multiply-or-divide-from-story', ctx: 'food', style: 'plain', cur: '', marks: 1,
  desc: 'random direction: amount for each times a number of items, or a total shared equally to find the amount for one',
  gen: () => {
    const name = nm(), [one, pl, stuff] = pick([['cake', 'cakes', 'flour'], ['loaf', 'loaves', 'flour'], ['pie', 'pies', 'flour'], ['jar', 'jars of jam', 'sugar']]);
    if (Math.random() < .5) {
      const u = ri(2, 6), n = ri(3, 9), ans = u * n / 10;
      return W(`${name} makes ${n} ${pl}. Each ${one} uses ${nstr(u / 10)} kg of ${stuff}. Work out how much ${stuff} ${name} uses altogether.`, ans, [`${nstr(u / 10)} × ${n} = ${nstr(ans)}`], {suf: ' kg'});
    }
    for (;;) {
      const n = pick([2, 4, 5, 8]), T10 = ri(8, 48), h = 10 * T10 / n;      // h is the answer in hundredths
      if (!Number.isInteger(h) || h < 10 || h > 60) continue;
      const ans = h / 100;
      return W(`${name} makes ${n} ${pl} with ${nstr(T10 / 10)} kg of ${stuff}. Each ${one} uses the same amount of ${stuff}. Work out how much ${stuff} each ${one} uses.`, ans, [`${nstr(T10 / 10)} ÷ ${n} = ${nstr(ans)}`], {suf: ' kg'});
    }
  }});
T({id: 'fd-3a', type: 3, needs: ['F15'], areas: ['FD'], skel: 'dec-add-then-change', ctx: 'shopping', style: 'plain', cur: 'both', marks: 2,
  desc: 'two items added, paid with a 5, 10 or 20 note: work out the change',
  gen: () => {
    const c = cur2(), name = nm(), ITEMS = [['a sandwich', 180, 450], ['a drink', 90, 260], ['a magazine', 250, 550], ['a notebook', 120, 380], ['a pencil case', 200, 600], ['a book', 350, 800], ['a cap', 450, 850], ['a poster', 300, 700]];
    for (;;) {
      const [i1, i2] = shuf(ITEMS).slice(0, 2), p1 = 5 * ri(i1[1] / 5, i1[2] / 5), p2 = 5 * ri(i2[1] / 5, i2[2] / 5), tot = p1 + p2;
      const notes = [5, 10, 20].filter(n => n * 100 > tot);
      if (!notes.length) continue;
      const note = pick(notes), ch = note * 100 - tot;
      return W(`${name} buys ${i1[0]} for ${mon(p1 / 100, c)} and ${i2[0]} for ${mon(p2 / 100, c)}. ${name} pays with a ${c}${note} note. Work out how much change ${name} gets.`, ch / 100,
        [`${mon(p1 / 100, c)} + ${mon(p2 / 100, c)} = ${mon(tot / 100, c)}`, `${c}${note} − ${mon(tot / 100, c)} = ${mon(ch / 100, c)}`], {pre: c});
    }
  }});
T({id: 'fd-3b', type: 3, needs: ['F16', 'F15'], areas: ['FD'], skel: 'dec-multiply-then-add', ctx: 'shopping', style: 'cam', cur: '$', marks: 2,
  desc: 'several of one item at a price like $1.20, plus one other item: total cost',
  gen: () => {
    const name = nm(), n = ri(2, 6), o = 5 * ri(45, 179); let u; do { u = 10 * ri(6, 24); } while (u % 100 === 0);      // not a whole-dollar price
    const sub = n * u, tot = sub + o;
    const [pl] = pick([['notebooks'], ['pens'], ['folders'], ['rulers']]), other = pick(['a geometry set', 'a lunch box', 'a water bottle', 'a sports towel', 'a calculator']);
    return W(`${name} buys ${n} ${pl} at ${mon(u / 100, '$')} each and ${other} for ${mon(o / 100, '$')}. Work out the total cost.`, tot / 100,
      [`${n} × ${mon(u / 100, '$')} = ${mon(sub / 100, '$')}`, `${mon(sub / 100, '$')} + ${mon(o / 100, '$')} = ${mon(tot / 100, '$')}`], {pre: '$'});
  }});
T({id: 'fd-3c', type: 3, needs: ['F15'], areas: ['FD'], skel: 'dec-perimeter-of-rectangle', ctx: 'building', style: 'plain', cur: '', marks: 2,
  desc: 'perimeter of a rectangle with sides in metres, one with 1 d.p. and one with 2 d.p.',
  gen: () => {
    const [A, place, what] = pick([['A rectangular garden', 'garden', 'fencing'], ['A rectangular room', 'room', 'skirting board'], ['A rectangular play area', 'play area', 'fencing'], ['A rectangular vegetable patch', 'patch', 'edging strip']]);
    const a = fdTwo(210, 990), b = fdOne(21, 99), l = Math.max(a, b), w = Math.min(a, b), s = (l + w) / 100, p = 2 * s;
    return W(`${A} is ${fdD(l)} m long and ${fdD(w)} m wide. Work out the length of ${what} needed to go all the way round the ${place}.`, p, [`${fdD(l)} + ${fdD(w)} = ${nstr(s)}`, `${nstr(s)} + ${nstr(s)} = ${nstr(p)}`], {suf: ' m'});
  }});
T({id: 'fd-4a', type: 4, needs: ['F16', 'F15', 'WD3'], areas: ['FD', 'NW'], skel: 'dec-total-cost-then-share', ctx: 'food', style: 'aqa', cur: '£', marks: 3,
  desc: 'some of one item and some of another, total cost shared equally between 2, 4 or 5 friends',
  gen: () => {
    const MAIN = [['pizza', 'pizzas', 650, 1250], ['burger', 'burgers', 450, 850], ['portion of fish and chips', 'portions of fish and chips', 700, 1150], ['sandwich', 'sandwiches', 350, 600]];
    const EXTRA = [['drink', 'drinks', 95, 250], ['milkshake', 'milkshakes', 225, 400], ['ice cream', 'ice creams', 150, 300], ['slice of cake', 'slices of cake', 220, 380]];
    const NUMW = {2: 'Two', 4: 'Four', 5: 'Five'};
    for (;;) {
      const n = pick([2, 4, 5]), m = pick(MAIN), x = pick(EXTRA), a = ri(2, 4), b = ri(2, 6), p1 = 5 * ri(m[2] / 5, m[3] / 5), p2 = 5 * ri(x[2] / 5, x[3] / 5);
      const c1 = a * p1, c2 = b * p2, T = c1 + c2;
      if (T % n !== 0 || T / n > 1500) continue;
      const sh = T / n;
      return W(`${NUMW[n]} friends go to a café. They buy ${a} ${m[1]} at ${mon(p1 / 100)} each and ${b} ${x[1]} at ${mon(p2 / 100)} each. They share the total cost equally. Work out how much each friend pays.`, sh / 100,
        [`${a} × ${mon(p1 / 100)} = ${mon(c1 / 100)}`, `${b} × ${mon(p2 / 100)} = ${mon(c2 / 100)}`, `${mon(c1 / 100)} + ${mon(c2 / 100)} = ${mon(T / 100)}`, `${mon(T / 100)} ÷ ${n} = ${mon(sh / 100)}`], {pre: '£'});
    }
  }});
T({id: 'fd-5a', type: 5, needs: ['F16', 'WD3'], areas: ['FD', 'NW'], skel: 'best-buy-unit-price', ctx: 'shopping', style: 'edexcel', cur: '£', marks: 3,
  desc: 'two pack sizes of the same item: which is better value, and how many pence cheaper is each one',
  gen: () => {
    const ITEMS = [['pens', 'pen', 30, 90], ['pencils', 'pencil', 10, 40], ['bottles of water', 'bottle', 30, 80], ['chocolate bars', 'bar', 40, 90], ['cans of cola', 'can', 40, 90], ['notebooks', 'notebook', 50, 95]];
    const PAIRS = [[4, 6], [3, 5], [2, 5], [5, 10], [4, 8], [6, 10], [3, 6], [10, 12], [2, 3], [6, 8]];
    const [pl, one, lo, hi] = pick(ITEMS), [n1, n2] = pick(PAIRS), d = ri(2, 12), uc = ri(lo, hi - d), up = uc + d, smallCheaper = Math.random() < .5;
    const u1 = smallCheaper ? uc : up, u2 = smallCheaper ? up : uc, T1 = n1 * u1, T2 = n2 * u2;
    const t1 = `${n1} ${pl} for ${mon(T1 / 100)}`, t2 = `${n2} ${pl} for ${mon(T2 / 100)}`;
    return W(`A shop sells ${pl} in two different packs. One pack has ${t1}. The other pack has ${t2}. Which pack is better value for money? How much cheaper is each ${one} in that pack? Give your answer in pence.`, d,
      [`${T1}p ÷ ${n1} = ${u1}p`, `${T2}p ÷ ${n2} = ${u2}p`, `${up}p − ${uc}p = ${d}p`], {suf: 'p', pick: {opts: [t1, t2], a: smallCheaper ? t1 : t2}});
  }});
T({id: 'fd-5b', type: 5, needs: ['F15'], areas: ['FD'], skel: 'dec-missing-part-of-total', ctx: 'measures', style: 'cam', cur: '', marks: 2,
  desc: 'a length cut into three pieces: two pieces given with different decimal places, find the third',
  gen: () => {
    const stuff = pick(['pipe', 'rope', 'cable', 'wire']), a = fdTwo(150, 450), b = fdOne(20, 49), [p1, p2] = Math.random() < .5 ? [a, b] : [b, a], c = ri(30, 350), tot = a + b + c, s = (a + b) / 100;
    return W(`${/^(8|11|18)/.test(fdD(tot)) ? 'An' : 'A'} ${fdD(tot)} m length of ${stuff} is cut into three pieces. The first piece is ${fdD(p1)} m long. The second piece is ${fdD(p2)} m long. Work out the length of the third piece.`, c / 100,
      [`${fdD(p1)} + ${fdD(p2)} = ${nstr(s)}`, `${fdD(tot)} − ${nstr(s)} = ${fdD(c)}`], {suf: ' m'});
  }});
