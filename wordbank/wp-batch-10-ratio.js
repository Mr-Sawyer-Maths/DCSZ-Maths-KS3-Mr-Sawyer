/* BATCH 10: Ratio (RA). 11 slots. Guide: claude/word-problems-fill-guide.md
   Level ids are from claude/section-ratio-outline.md and are final. Only R3 is in the app so far; these templates are written now and appear
   to students as each level they need ships.
     R1 writing a ratio · R2 equivalent ratios · R3 simplifying · R4 three parts, units and decimals · R5 the form 1 : n
     R6 sharing in a ratio (total given) · R7 one part given · R8 difference given · R9 ratio and fractions · R10 ratio and percentages (stretch) · R11 combining two ratios (stretch)
   Answers here are always one number (or a fraction), never a ratio: ratio answers are practised in the Ratio levels themselves.
   Money problems: these entries also carry topics: ['ratio', 'money'] (leave that field as it is). With w5-3 and w6-5 (retagged when R6 and R8 ship), the grid row is full. */
var raPair = (lo, hi, maxSum) => { for (;;) { const a = ri(lo, hi), b = ri(lo, hi); if (a !== b && gcd(a, b) === 1 && a + b <= maxSum) return [a, b]; } };      // two different parts with no common factor
var raLcm = (a, b) => a * b / gcd(a, b);
var raNames = n => shuf(NAMES).slice(0, n);
var raOne = (giv, gp, un) => gp === 1 ? `1 part = ${giv}${un}` : `${giv} ÷ ${gp} = ${giv / gp}${un} for one part`;      // the value of one part, without a silly ÷ 1
T({id: 'ra-1a', type: 1, needs: ['R2'], areas: ['RA'], skel: 'scale-a-mixture', ctx: 'food', style: 'plain', cur: '', marks: 1,
  desc: 'a mixture in a ratio; one amount is the ratio scaled by 2 to 9: work out the other amount',
  gen: () => {
    const [make, A, B, unit, rs, cap] = pick([['makes orange drink', 'squash', 'water', 'cups', [[1, 3], [1, 4], [1, 5], [2, 5], [2, 7], [3, 7]], 36],
      ['makes green paint', 'blue paint', 'yellow paint', 'litres', [[2, 3], [3, 4], [1, 2], [3, 5], [4, 5]], 30],
      ['makes pink paint', 'red paint', 'white paint', 'tins', [[1, 3], [2, 5], [1, 4], [3, 4]], 30],
      ['cooks rice for a party', 'rice', 'water', 'cups', [[1, 2], [2, 3], [2, 5]], 20],
      ['makes pancake batter', 'flour', 'milk', 'cups', [[2, 3], [3, 4], [3, 5]], 20],
      ['makes salad dressing', 'oil', 'vinegar', 'spoons', [[3, 1], [4, 1], [5, 2], [3, 2]], 20]]);
    const name = nm(), [a, b] = pick(rs), k = ri(2, Math.min(9, Math.floor(cap / Math.max(a, b)))), first = Math.random() < .5;      // cap keeps the amounts believable
    const [gp, op, gx, ox] = first ? [a, b, A, B] : [b, a, B, A], giv = gp * k, ans = op * k;
    return W(`${name} ${make}. ${name} mixes ${A} and ${B} in the ratio ${a} : ${b}. ${name} uses ${giv} ${unit} of ${gx}. Work out how many ${unit} of ${ox} ${name} uses.`, ans,
      [`${gp} × ${k} = ${giv}`, `${op} × ${k} = ${ans} ${unit}`], unit === 'litres' ? {suf: ' litres'} : {});
  }});
T({id: 'ra-1b', type: 1, needs: ['R6'], areas: ['RA'], skel: 'share-in-ratio-one-share', ctx: 'money', style: 'plain', cur: 'both', marks: 2, topics: ['ratio', 'money'],
  desc: 'two people share an amount of money in a ratio: work out one share',
  gen: () => {
    const c = cur2(), [A, B] = two(), [a, b] = raPair(1, 7, 12), u = ri(2, 12) * pick([1, 5, 10]), first = Math.random() < .5;
    const tot = (a + b) * u, p = first ? a : b, ans = p * u;
    const what = pick([`${mon(tot, c)}`, `${mon(tot, c)} of prize money`, `${mon(tot, c)} they earned washing cars`, `a gift of ${mon(tot, c)}`, `${mon(tot, c)} from a cake sale`]);
    return W(`${A} and ${B} share ${what} in the ratio ${a} : ${b}. Work out how much ${first ? A : B} gets.`, ans,
      [`${a} + ${b} = ${a + b} parts`, `${mon(tot, c)} ÷ ${a + b} = ${mon(u, c)}`, `${p} × ${mon(u, c)} = ${mon(ans, c)}`], {pre: c});
  }});
T({id: 'ra-1c', type: 1, needs: ['R6'], areas: ['RA'], skel: 'share-objects-three-parts', ctx: 'school', style: 'cam', cur: '', marks: 2,
  desc: 'objects shared between three people in a three-part ratio: work out one share',
  gen: () => {
    for (;;) {
      const r = [ri(1, 6), ri(1, 6), ri(1, 6)], s = r[0] + r[1] + r[2];
      if (new Set(r).size < 3 || s > 12 || gcd(gcd(r[0], r[1]), r[2]) !== 1) continue;
      const names = raNames(3), u = ri(2, Math.floor(199 / s)), tot = s * u, i = ri(0, 2), ans = r[i] * u;
      const thing = pick(['counters', 'stickers', 'books', 'marbles', 'cards', 'pencils']);
      return W(`${names[0]}, ${names[1]} and ${names[2]} share ${tot} ${thing} in the ratio ${r.join(' : ')}. Work out how many ${thing} ${names[i]} gets.`, ans,
        [`${r.join(' + ')} = ${s} parts`, `${tot} ÷ ${s} = ${u}`, `${r[i]} × ${u} = ${ans}`]);
    }
  }});
T({id: 'ra-2a', type: 2, needs: ['R7'], areas: ['RA'], skel: 'one-part-given-find-other', ctx: 'food', style: 'plain', cur: '', marks: 2,
  desc: 'a recipe or a bag of sweets in a ratio; one amount is given (either part): work out the other',
  gen: () => {
    const [intro, A, B, rs, g] = pick([['A recipe for biscuits uses flour and butter in the ratio', 'flour', 'butter', [[5, 2], [3, 1], [5, 3], [2, 1], [7, 4]], true],
      ['A recipe for flapjacks uses oats and honey in the ratio', 'oats', 'honey', [[4, 1], [5, 2], [3, 1], [7, 2]], true],
      ['A recipe for a sponge cake uses sugar and flour in the ratio', 'sugar', 'flour', [[2, 3], [3, 5], [1, 2], [3, 4]], true],
      ['A snack mix has peanuts and raisins in the ratio', 'peanuts', 'raisins', [[3, 2], [4, 5], [5, 3], [2, 3]], true],
      ['A bag of sweets has red sweets and yellow sweets in the ratio', 'red sweets', 'yellow sweets', [[3, 5], [4, 7], [2, 5], [5, 3], [7, 4]], false]]);
    const [a, b] = pick(rs), first = Math.random() < .5, u = g ? pick([10, 15, 20, 25, 30, 40, 50, 60, 70, 80].filter(v => Math.min(a, b) * v >= 40)) : ri(2, 12);
    const [gp, op, gx, ox] = first ? [a, b, A, B] : [b, a, B, A], giv = gp * u, ans = op * u, un = g ? ' g' : '';
    const q = g ? `${intro} ${a} : ${b}. ${nm()} uses ${giv} g of ${gx}. Work out the mass of ${ox} needed.`
      : `${intro} ${a} : ${b}. There are ${giv} ${gx} in the bag. Work out how many ${ox} there are.`;
    return W(q, ans, [raOne(giv, gp, un), `${op} × ${u} = ${ans}${un}`], g ? {suf: ' g'} : {});
  }});
T({id: 'ra-2b', type: 2, needs: ['R7'], areas: ['RA'], skel: 'order-swapped-ratio', ctx: 'nature', style: 'plain', cur: '', marks: 2,
  desc: 'a ratio of two kinds of thing; the number of one kind (first or second in the ratio) is given: work out the other',
  gen: () => {
    const [place, X, Y] = pick([['In a park', 'dogs', 'cats'], ['On a lake', 'ducks', 'swans'], ['In a car park', 'cars', 'bikes'], ['In a choir', 'boys', 'girls'],
      ['On a farm', 'sheep', 'cows'], ['In a wood', 'oak trees', 'pine trees'], ['At a bird table', 'sparrows', 'robins'], ['In a field', 'horses', 'goats']]);
    const [a, b] = raPair(1, 9, 15), u = ri(2, 12), first = Math.random() < .5;
    const [gp, op, gx, ox] = first ? [a, b, X, Y] : [b, a, Y, X], giv = gp * u, ans = op * u;
    return W(`${place} the ratio of ${X} to ${Y} is ${a} : ${b}. There are ${giv} ${gx}. Work out how many ${ox} there are.`, ans,
      [raOne(giv, gp, ''), `${ox}: ${op} × ${u} = ${ans}`]);
  }});
T({id: 'ra-2c', type: 2, needs: ['R7'], areas: ['RA'], skel: 'one-part-given-find-total', ctx: 'school', style: 'edexcel', cur: '', marks: 2,
  desc: 'one part of a ratio is known: work out the total',
  gen: () => {
    const [X, Y, where, there, all] = pick([['boys', 'girls', 'in a club', 'in the club', 'students in the club'], ['adults', 'children', 'at a school play', 'at the play', 'people at the play'],
      ['fiction books', 'non-fiction books', 'on a shelf', 'on the shelf', 'books on the shelf'], ['red counters', 'blue counters', 'in a bag', 'in the bag', 'counters in the bag'],
      ['Year 7 students', 'Year 8 students', 'in a chess club', 'in the chess club', 'students in the chess club'], ['teachers', 'students', 'on a school trip', 'on the trip', 'people on the trip']]);
    const [a, b] = X === 'teachers' ? [1, ri(6, 12)] : raPair(1, 9, 15), u = ri(2, 12), first = X === 'teachers' ? Math.random() < .3 : Math.random() < .5;
    const gp = first ? a : b, giv = gp * u, s = a + b, ans = s * u;
    return W(`The ratio of ${X} to ${Y} ${where} is ${a} : ${b}. There are ${giv} ${first ? X : Y} ${there}. Work out the total number of ${all}.`, ans,
      [raOne(giv, gp, ''), `${a} + ${b} = ${s} parts`, `${s} × ${u} = ${ans}`]);
  }});
T({id: 'ra-3a', type: 3, needs: ['R9', 'F4'], areas: ['RA', 'FF'], skel: 'ratio-to-fraction-then-amount', ctx: 'school', style: 'cam', cur: '', marks: 2,
  desc: 'a year group split in a ratio: work out one group by finding its fraction of the total',
  gen: () => {
    const [X, Y] = pick([['walk to school', 'take the bus'], ['have a school lunch', 'bring a packed lunch'], ['cycle to school', 'come by car'],
      ['choose art', 'choose music'], ['play football', 'play basketball'], ['learn French', 'learn Spanish']]);
    for (;;) {
      const [a, b] = raPair(1, 9, 12), s = a + b, u = pick([10, 15, 20, 25, 30, 35, 40]), tot = s * u, first = Math.random() < .5, p = first ? a : b, ans = p * u, yr = ri(7, 11);
      if (tot < 90 || tot > 360) continue;
      return W(`There are ${tot} students in Year ${yr}. The ratio of students who ${X} to students who ${Y} is ${a} : ${b}. Work out how many students ${first ? X : Y}.`, ans,
        [`${a} + ${b} = ${s}`, `${first ? X : Y}: ${p}/${s} of the students`, `${tot} ÷ ${s} = ${u}`, `${p}/${s} of ${tot} = ${p} × ${u} = ${ans}`]);
    }
  }});
T({id: 'ra-3b', type: 3, needs: ['R6', 'N5'], areas: ['RA', 'X'], skel: 'share-then-difference', ctx: 'money', style: 'plain', cur: 'both', marks: 3, topics: ['ratio', 'money'],
  desc: 'two people share money in a ratio: work out how much more one gets than the other',
  gen: () => {
    const c = cur2(), [A, B] = two(), [a, b] = raPair(1, 7, 12), u = ri(2, 12) * pick([1, 10]), s = a + b, tot = s * u, sa = a * u, sb = b * u;
    const [big, small, bs, ss] = a > b ? [A, B, sa, sb] : [B, A, sb, sa];
    const what = pick([`${mon(tot, c)}`, `${mon(tot, c)} they won in a quiz`, `${mon(tot, c)} from selling cakes`, `${mon(tot, c)} they earned walking dogs`]);
    return W(`${A} and ${B} share ${what} in the ratio ${a} : ${b}. Work out how much more ${big} gets than ${small}.`, bs - ss,
      [`${a} + ${b} = ${s} parts`, `${mon(tot, c)} ÷ ${s} = ${mon(u, c)}`, `${A}: ${a} × ${mon(u, c)} = ${mon(sa, c)}`, `${B}: ${b} × ${mon(u, c)} = ${mon(sb, c)}`, `${mon(bs, c)} − ${mon(ss, c)} = ${mon(bs - ss, c)}`], {pre: c});
  }});
T({id: 'ra-4a', type: 4, needs: ['R4', 'R6'], areas: ['RA'], skel: 'mixed-units-then-share', ctx: 'measures', style: 'aqa', cur: '', marks: 3, tw: ['convert'],
  desc: 'a length in metres or a mass in kg shared in a ratio, answer asked in cm or g',
  gen: () => {
    for (;;) {
      const [a, b] = raPair(1, 9, 12), s = a + b, len = Math.random() < .5, longer = Math.random() < .5, p = longer ? Math.max(a, b) : Math.min(a, b);
      if (len) {
        const u = ri(2, 9) * 10, cm = s * u;
        if (cm <= 100 || cm >= 1000 || cm % 100 === 0) continue;
        const thing = pick(['A rope', 'A piece of ribbon', 'A length of wood', 'A piece of string', 'A metal pipe']), m = nstr(cm / 100);
        return W(`${thing} is ${m} m long. It is cut into two pieces in the ratio ${a} : ${b}. Work out the length of the ${longer ? 'longer' : 'shorter'} piece. Give your answer in centimetres.`, p * u,
          [`${m} m = ${cm} cm`, `${a} + ${b} = ${s}`, `${cm} ÷ ${s} = ${u}`, `${p} × ${u} = ${p * u} cm`], {suf: ' cm'});
      }
      const u = ri(2, 9) * 50, g = s * u;
      if (g <= 1000 || g >= 10000 || g % 1000 === 0) continue;
      const [stuff, into] = pick([['flour', 'tub'], ['rice', 'jar'], ['sugar', 'bowl'], ['soil', 'pot'], ['sand', 'bucket']]), kg = nstr(g / 1000), name = nm();
      return W(`${name} has ${kg} kg of ${stuff}. ${name} shares it between two ${into}s in the ratio ${a} : ${b}. Work out the mass of ${stuff} in the ${longer ? 'heavier' : 'lighter'} ${into}. Give your answer in grams.`, p * u,
        [`${kg} kg = ${g} g`, `${a} + ${b} = ${s}`, `${g} ÷ ${s} = ${u}`, `${p} × ${u} = ${p * u} g`], {suf: ' g'});
    }
  }});
T({id: 'ra-5a', type: 5, needs: ['R9'], areas: ['RA'], skel: 'which-mixture-is-stronger', ctx: 'food', style: 'aqa', cur: '', marks: 3,
  desc: 'two squash-to-water ratios: whose drink has the greater fraction of squash, and by how much',
  gen: () => {
    for (;;) {
      const mk = () => { for (;;) { const a = ri(1, 4), b = ri(2, 9); if (a < b && gcd(a, b) === 1 && a + b >= 3 && a + b <= 10) return [a, b]; } };
      const [a, b] = mk(), [c, d] = mk(), s1 = a + b, s2 = c + d, L = raLcm(s1, s2);
      if (s1 === s2 || L > 60) continue;
      const [A, B] = two(), x = a * L / s1, y = c * L / s2;
      if (x === y) continue;
      const win = x > y ? A : B, hi = Math.max(x, y), lo = Math.min(x, y), ans = fs(hi - lo, L);
      const conv = [[a, s1, x], [c, s2, y]].filter(([, s]) => s !== L).map(([n, s, m]) => `${n}/${s} = ${m}/${L}`).join(' and ');
      return W(`${A} makes orange drink by mixing squash and water in the ratio ${a} : ${b}. ${B} mixes squash and water in the ratio ${c} : ${d}. Whose drink has the greater fraction of squash? Give a reason for your answer. Work out the difference between the two fractions of squash.`, ans,
        [`${A}: squash is ${a}/${s1} of the drink`, `${B}: squash is ${c}/${s2} of the drink`, conv, `${hi}/${L} > ${lo}/${L}, so ${win}`, `${hi}/${L} − ${lo}/${L} = ${hi - lo}/${L}` + (ans !== `${hi - lo}/${L}` ? ` = ${ans}` : '')],
        {form: 'simplest', pick: {opts: [A, B], a: win}});
    }
  }});
T({id: 'ra-5b', type: 5, needs: ['R11'], areas: ['RA'], skel: 'combine-two-ratios-in-context', ctx: 'nature', style: 'cam', cur: '', marks: 3, hub: 'ext',
  desc: 'three kinds of thing linked by two ratios; the middle one is known: work out the first or the third',
  gen: () => {
    for (;;) {
      const [place, X, Y, Z] = pick([['In a nature reserve', 'ducks', 'geese', 'swans'], ['On a farm', 'sheep', 'cows', 'pigs'], ['In a garden', 'roses', 'tulips', 'daisies'],
        ['In a pond', 'frogs', 'newts', 'fish'], ['In a wood', 'oak trees', 'ash trees', 'beech trees'], ['In a wildlife park', 'deer', 'rabbits', 'foxes']]);
      const [a, b] = raPair(1, 9, 18), [c, d] = raPair(1, 9, 18), L = raLcm(b, c);
      if (b === c || L === b || L === c || L > 36) continue;
      const A = a * L / b, C = d * L / c, k = ri(2, 6), askX = Math.random() < .5, P_ = askX ? A : C, ans = P_ * k;
      if (A > 99 || C > 99 || k * L > 150 || k * A > 200 || k * C > 200) continue;      // counts stay believable
      return W(`${place}, the ratio of ${X} to ${Y} is ${a} : ${b}. The ratio of ${Y} to ${Z} is ${c} : ${d}. There are ${k * L} ${Y}. Work out the number of ${askX ? X : Z}.`, ans,
        [`${X} : ${Y} = ${a} : ${b} = ${A} : ${L}`, `${Y} : ${Z} = ${c} : ${d} = ${L} : ${C}`, `${X} : ${Y} : ${Z} = ${A} : ${L} : ${C}`, `${k * L} ÷ ${L} = ${k}`, `${P_} × ${k} = ${ans}`]);
    }
  }});
