/* BATCH 6: Fractions (FF, 8 slots) and Mental methods (NM, 4 slots). Guide: claude/word-problems-fill-guide.md
   Levels: F1 unit fractions of amounts · F2 equivalent · F3 simplifying · F4 fractions of amounts · F10, F11 add and subtract (same, then different denominators)
           F12 mixed and improper · F13 multiplying · F14 dividing · N22 adding and subtracting near tens and hundreds · N21 multiplying by splitting · N12 known facts scaled (30 × 40).
   Some answers here are fractions. Give them as text in simplest form with fs(n, d), and add form: 'simplest' to the options (see the guide). */
X('w2-1', {areas: ['M', 'NM']});      // these three already need N21 (multiplying by splitting), so they count for Mental methods too. No new template needed.
X('w2-2', {areas: ['M', 'NM']});
X('w2-5', {areas: ['M', 'NM']});
var ffLcm = (a, b) => a * b / gcd(a, b);
var ffAns = (n, d) => { const g = gcd(n, d); n /= g; d /= g; return d === 1 ? {a: n} : n < d ? {a: `${n}/${d}`, form: 'simplest'} : {a: `${Math.floor(n / d)} ${n % d}/${d}`, form: 'mixed'}; };      // a fraction answer from a numerator and denominator: proper, or a mixed number
var ffTwo = maxL => { for (;;) {      // two simplest-form proper fractions with different denominators; a and b are their numerators over the common denominator L
  const D = [2, 3, 4, 5, 6, 8, 10, 12], d1 = pick(D), d2 = pick(D); if (d1 === d2) continue;
  const L = ffLcm(d1, d2), n1 = ri(1, d1 - 1), n2 = ri(1, d2 - 1);
  if (L > maxL || gcd(n1, d1) !== 1 || gcd(n2, d2) !== 1) continue;
  return {n1, d1, n2, d2, L, a: n1 * L / d1, b: n2 * L / d2}; } };
var ffConv = f => [f.d1 === f.L ? '' : `${f.n1}/${f.d1} = ${f.a}/${f.L}`, f.d2 === f.L ? '' : `${f.n2}/${f.d2} = ${f.b}/${f.L}`].filter(Boolean).join(' and ');      // the "change to the same denominator" line
T({id: 'ff-1a', type: 1, needs: ['F11'], areas: ['FF'], skel: 'frac-add-parts-of-whole', ctx: 'food', style: 'plain', cur: '', marks: 2,
  desc: 'two people each use a fraction of the same whole (different denominators): what fraction altogether, less than 1',
  gen: () => {
    const [A, B] = two(), [whole, verb, done] = pick([['pizza', 'eats', 'eaten'], ['cake', 'eats', 'eaten'], ['bar of chocolate', 'eats', 'eaten'], ['tin of paint', 'uses', 'used'], ['bag of flour', 'uses', 'used']]);
    let f; do { f = ffTwo(24); } while (f.a + f.b >= f.L);
    const s = f.a + f.b, ans = fs(s, f.L), steps = [ffConv(f), `${f.a}/${f.L} + ${f.b}/${f.L} = ${s}/${f.L}`];
    if (ans !== `${s}/${f.L}`) steps.push(`${s}/${f.L} = ${ans}`);
    return W(`${A} ${verb} ${F(f.n1, f.d1)} of a ${whole}. ${B} ${verb} ${F(f.n2, f.d2)} of the same ${whole}. Work out the fraction of the ${whole} that is ${done} altogether.`, ans, steps, {form: 'simplest'});
  }});
T({id: 'ff-2a', type: 2, needs: ['F11'], areas: ['FF'], skel: 'frac-add-or-subtract-from-story', ctx: 'measures', style: 'plain', cur: '', marks: 2,
  desc: 'random direction: a tank is a fraction full, then a fraction of a tank is added or used; what fraction is full now',
  gen: () => {
    const name = nm(), add = Math.random() < .5, [tank, liq] = pick([['A water tank', 'water'], ['A fuel tank', 'fuel'], ['A diesel tank', 'diesel']]);
    let f; for (;;) { f = ffTwo(24); if (add ? f.a + f.b < f.L : f.a > f.b) break; }
    const r = add ? f.a + f.b : f.a - f.b, ans = fs(r, f.L), steps = [ffConv(f), `${f.a}/${f.L} ${add ? '+' : '−'} ${f.b}/${f.L} = ${r}/${f.L}`];
    if (ans !== `${r}/${f.L}`) steps.push(`${r}/${f.L} = ${ans}`);
    return W(`${tank} is ${F(f.n1, f.d1)} full. ${name} ${add ? 'adds' : 'uses'} ${F(f.n2, f.d2)} of a tank of ${liq}. Work out the fraction of the tank that is full now.`, ans, steps, {form: 'simplest'});
  }});
T({id: 'ff-2b', type: 2, needs: ['F13', 'F14'], areas: ['FF'], skel: 'frac-multiply-or-divide-by-whole', ctx: 'food', style: 'plain', cur: '', marks: 2,
  desc: 'random direction: a fraction of a kg or litre per item times a whole number, or a fraction of a metre cut into equal pieces',
  gen: () => {
    const name = nm();
    if (Math.random() < .5) {
      const [one, pl, stuff, big, suf] = pick([['cake', 'cakes', 'sugar', 'kilogram', ' kg'], ['loaf', 'loaves', 'flour', 'kilogram', ' kg'], ['pot of soup', 'pots of soup', 'stock', 'litre', ' litres']]);
      for (;;) {
        const d = pick([2, 3, 4, 5, 6, 8]), n = ri(1, d - 1), k = ri(2, 8);
        if (gcd(n, d) !== 1 || (n * k) % d === 0) continue;
        const r = ffAns(n * k, d), steps = [`${n}/${d} × ${k} = ${n * k}/${d}`];
        if (r.a !== `${n * k}/${d}`) steps.push(`${n * k}/${d} = ${r.a}`);
        return W(`Each ${one} needs ${F(n, d)} of a ${big} of ${stuff}. ${name} makes ${k} ${pl}. Work out how much ${stuff} ${name} needs.`, r.a, steps, {form: r.form, suf});
      }
    }
    for (;;) {
      const d = pick([2, 3, 4, 5, 6]), n = ri(1, d - 1), k = ri(2, 6);
      if (gcd(n, d) !== 1) continue;
      const r = ffAns(n, d * k), steps = [`${n}/${d} ÷ ${k} = ${n}/${d * k}`], stuff = pick(['ribbon', 'string', 'rope']);
      if (r.a !== `${n}/${d * k}`) steps.push(`${n}/${d * k} = ${r.a}`);
      return W(`${name} has ${F(n, d)} of a metre of ${stuff}. ${name} cuts the ${stuff} into ${k} equal pieces. Work out the length of one piece.`, r.a, steps, {form: r.form, suf: ' m'});
    }
  }});
T({id: 'ff-2c', type: 2, needs: ['F3'], areas: ['FF'], skel: 'part-over-total-simplify', ctx: 'food', style: 'cam', cur: '', marks: 2,
  desc: 'two groups given separately: what fraction are one colour, in simplest form (make the total first)',
  gen: () => {
    const [cont, noun, c1, c2] = pick([['A jar has', 'sweets', 'red', 'blue'], ['A bag has', 'sweets', 'mint', 'fruit'], ['A tin has', 'biscuits', 'chocolate', 'plain'], ['A bowl has', 'grapes', 'green', 'red'], ['A box has', 'chocolates', 'milk', 'dark']]);
    for (;;) {
      const r = ri(5, 40), b = ri(5, 40), t = r + b, g = gcd(r, t);
      if (g < 2) continue;
      const first = Math.random() < .5, num = first ? r : b, colour = first ? c1 : c2, ans = fs(num, t);
      return W(`${cont} ${r} ${c1} ${noun} and ${b} ${c2} ${noun}. Work out the fraction of the ${noun} that are ${colour}. Give your answer in its simplest form.`, ans, [`${r} + ${b} = ${t}`, `${num}/${t} = ${ans}`], {form: 'simplest'});
    }
  }});
T({id: 'ff-3a', type: 3, needs: ['F11'], areas: ['FF'], skel: 'frac-two-parts-then-rest', ctx: 'money', style: 'edexcel', cur: '', marks: 2,
  desc: 'pocket money: two fractions spent (different denominators), the rest saved; what fraction is saved',
  gen: () => {
    const name = nm(), [x, y] = shuf(['a magazine', 'sweets', 'a computer game', 'a snack', 'a book', 'a phone case', 'a toy']).slice(0, 2);
    let f; do { f = ffTwo(24); } while (f.a + f.b >= f.L);
    const s = f.a + f.b, rest = f.L - s, ans = fs(rest, f.L), steps = [ffConv(f), `${f.a}/${f.L} + ${f.b}/${f.L} = ${s}/${f.L}`, `1 − ${s}/${f.L} = ${rest}/${f.L}`];
    if (ans !== `${rest}/${f.L}`) steps.push(`${rest}/${f.L} = ${ans}`);
    return W(`${name} gets some pocket money. ${name} spends ${F(f.n1, f.d1)} of the pocket money on ${x} and ${F(f.n2, f.d2)} of the pocket money on ${y}. ${name} saves the rest. Work out the fraction of the pocket money that ${name} saves. You must show all your working.`, ans, steps, {form: 'simplest'});
  }});
T({id: 'ff-3b', type: 3, needs: ['F4', 'M12'], areas: ['FF', 'M'], skel: 'frac-of-amount-then-multiply', ctx: 'leisure', style: 'plain', cur: 'both', marks: 2,
  desc: 'a fraction of a group goes on a trip and each pays a whole number up to 12: the total paid',
  gen: () => {
    const c = cur2(), [grp, trip] = pick([['students in Year 8', 'on a trip to the zoo'], ['members of a club', 'to see a film'], ['children in a class', 'to a theme park'], ['students in a choir', 'to a concert']]);
    for (;;) {
      const d = pick([3, 4, 5, 6, 8, 10]), n = Math.random() < .15 ? 1 : ri(2, d - 1), m = ri(2, 6), p = ri(3, 12), goers = n * m;      // mostly non-unit fractions, like {3/4} of 32
      if (gcd(n, d) !== 1 || goers > 36) continue;
      const g = d * m, total = goers * p;
      return W(`${F(n, d)} of the ${g} ${grp} go ${trip}. Each of them pays ${mon(p, c)}. Work out the total paid.`, total,
        [`${g} ÷ ${d} = ${m}`, ...(n === 1 ? [] : [`${m} × ${n} = ${goers}`]), `${goers} × ${mon(p, c)} = ${mon(total, c)}`], {pre: c});
    }
  }});
T({id: 'ff-5a', type: 5, needs: ['F4'], areas: ['FF'], skel: 'compare-fractions-of-different-amounts', ctx: 'money', style: 'plain', cur: 'both', marks: 3,
  desc: 'two people save different fractions of different amounts: who saves more, and how much more',
  gen: () => {
    const c = cur2(), [A, B] = two(), D = [2, 3, 4, 5, 6, 8, 10];
    for (;;) {
      const d1 = pick(D), d2 = pick(D), n1 = ri(1, d1 - 1), n2 = ri(1, d2 - 1), m1 = ri(3, 12), m2 = ri(3, 12);
      if (gcd(n1, d1) !== 1 || gcd(n2, d2) !== 1) continue;
      const a1 = d1 * m1, a2 = d2 * m2, s1 = n1 * m1, s2 = n2 * m2;
      if (s1 === s2 || a1 > 100 || a2 > 100) continue;
      const first = s1 > s2, diff = Math.abs(s1 - s2);
      return W(`${A} saves ${F(n1, d1)} of ${mon(a1, c)}. ${B} saves ${F(n2, d2)} of ${mon(a2, c)}. Who saves more money? How much more does that person save?`, diff,
        [`${A}: ${a1} ÷ ${d1} = ${m1}${n1 === 1 ? '' : `, ${m1} × ${n1} = ${s1}`}`, `${B}: ${a2} ÷ ${d2} = ${m2}${n2 === 1 ? '' : `, ${m2} × ${n2} = ${s2}`}`, `${mon(Math.max(s1, s2), c)} − ${mon(Math.min(s1, s2), c)} = ${mon(diff, c)}`],
        {pre: c, pick: {opts: [A, B], a: first ? A : B}});
    }
  }});
T({id: 'ff-5b', type: 5, needs: ['F4'], areas: ['FF'], skel: 'frac-find-the-whole', ctx: 'school', style: 'edexcel', cur: '', marks: 2,
  desc: 'a fraction of a book is a given number of pages: find the pages in the whole book (working backwards)',
  gen: () => {
    const name = nm(), what = pick(['book', 'novel', 'story book']);
    for (;;) {
      const d = pick([3, 4, 5, 6, 8, 10]), n = Math.random() < .15 ? 1 : ri(2, d - 1), part = ri(6, 30), whole = d * part, pages = n * part;
      if (gcd(n, d) !== 1 || whole < 60 || whole > 250) continue;
      const steps = n === 1 ? [`${d} × ${pages} = ${whole}`] : [`${pages} ÷ ${n} = ${part}`, `${part} × ${d} = ${whole}`];
      return W(`${name} has read ${F(n, d)} of a ${what}. This is ${pages} pages. Work out the number of pages in the whole ${what}. You must show all your working.`, whole, steps);
    }
  }});
T({id: 'nm-1a', type: 1, needs: ['N22'], areas: ['NM'], skel: 'near-hundred-subtract', ctx: 'shopping', style: 'plain', cur: 'both', marks: 1,
  desc: 'three-digit amount, buy something costing 99, 199 or 299: money left, by taking the round number then adding 1 back',
  gen: () => {
    const c = cur2(), name = nm(), cost = pick([99, 199, 299]), r = cost + 1;
    const item = pick({99: ['a pair of trainers', 'a jacket', 'a pair of headphones', 'a watch'], 199: ['a tablet', 'a bike', 'a scooter', 'a games console'], 299: ['a bike', 'a laptop', 'a sofa', 'a television']}[cost]);
    const have = Math.min(999, ri(cost + 21, cost + 420)), x = have - r, ans = have - cost;
    return W(`${name} has ${mon(have, c)}. ${name} buys ${item} for ${mon(cost, c)}. Work out how much money ${name} has left.`, ans, [`${mon(have, c)} − ${mon(r, c)} = ${mon(x, c)}`, `${mon(x, c)} + 1 = ${mon(ans, c)}`], {pre: c});
  }});
T({id: 'nm-1b', type: 1, needs: ['N12'], areas: ['NM'], skel: 'mult-multiples-of-ten', ctx: 'school', style: 'plain', cur: '', marks: 1,
  desc: 'equal groups where both numbers are multiples of 10 or 100: how many altogether, using the times-table fact',
  gen: () => {
    const x = ri(2, 9), y = ri(2, 9), big = Math.random() < .35;
    const [one, pl, verb, thing] = big ? pick([['pack', 'packs', 'has', 'sheets of paper'], ['lorry', 'lorries', 'carries', 'bricks'], ['box', 'boxes', 'holds', 'paper clips']])
      : pick([['box', 'boxes', 'holds', 'exercise books'], ['row', 'rows', 'has', 'seats'], ['pack', 'packs', 'contains', 'pencils'], ['shelf', 'shelves', 'holds', 'books'], ['crate', 'crates', 'holds', 'bottles']]);
    const a = x * 10, b = y * (big ? 100 : 10);
    return W(`There are ${a} ${pl}. Each ${one} ${verb} ${b} ${thing}. Work out how many ${thing} there are altogether.`, a * b, [`${x} × ${y} = ${x * y}`, `${a} × ${b} = ${a * b}`]);
  }});
T({id: 'nm-2a', type: 2, needs: ['N22'], areas: ['NM'], skel: 'near-hundred-start-unknown-or-compare', ctx: 'shopping', style: 'plain', cur: 'both', marks: 1,
  desc: 'random: start unknown after spending 29, 39, 99 or 199, or how much more one costs than a 29/39/99/199 item (round and adjust)',
  gen: () => {
    const c = cur2(), name = nm(), s = pick([29, 39, 99, 199]), r = s + 1, big = s > 50;
    if (Math.random() < .5) {
      const left = big ? ri(110, 520) : ri(31, 400), start = left + s;
      return W(`After spending ${mon(s, c)}, ${name} has ${mon(left, c)} left. Work out how much money ${name} had at first.`, start, [`${mon(left, c)} + ${mon(r, c)} = ${mon(left + r, c)}`, `${mon(left + r, c)} − 1 = ${mon(start, c)}`], {pre: c});
    }
    const [i1, i2] = pick(big ? [['bike', 'scooter'], ['laptop', 'tablet'], ['sofa', 'armchair'], ['television', 'radio']] : [['jacket', 'scarf'], ['pair of trainers', 'cap'], ['bag', 'purse']]);
    const X = s + (big ? ri(51, 350) : ri(21, 150)), diff = X - s;
    return W(`A ${i1} costs ${mon(X, c)} and a ${i2} costs ${mon(s, c)}. Work out how much more the ${i1} costs.`, diff, [`${mon(X, c)} − ${mon(r, c)} = ${mon(X - r, c)}`, `${mon(X - r, c)} + 1 = ${mon(diff, c)}`], {pre: c});
  }});
T({id: 'nm-2b', type: 2, needs: ['N12'], areas: ['NM'], skel: 'scale-up-or-share-multiples-of-ten', ctx: 'school', style: 'plain', cur: '', marks: 1,
  desc: 'random direction: boxes times items in each box (multiples of 10 and 100), or a total packed equally to find the number in each',
  gen: () => {
    const x = ri(2, 9), y = ri(2, 9), big = Math.random() < .35;
    const [one, pl, thing] = big ? pick([['box', 'boxes', 'paper clips'], ['packet', 'packets', 'sheets of paper'], ['bag', 'bags', 'beads']]) : pick([['box', 'boxes', 'pencils'], ['bag', 'bags', 'marbles'], ['crate', 'crates', 'oranges'], ['tray', 'trays', 'cupcakes']]);
    const a = x * 10, b = y * (big ? 100 : 10), t = a * b;
    if (Math.random() < .5) return W(`A school has ${a} ${pl}. Each ${one} holds ${b} ${thing}. Work out how many ${thing} there are altogether.`, t, [`${x} × ${y} = ${x * y}`, `${a} × ${b} = ${t}`]);
    return W(`A school packs ${t} ${thing} equally into ${a} ${pl}. Work out how many ${thing} are in each ${one}.`, b, [`${x * y} ÷ ${x} = ${y}`, `${t} ÷ ${a} = ${b}`]);
  }});
