/* BATCH 7: Whole numbers from the early fact levels (A, S, X, M, D, NW). 12 slots. Guide: claude/word-problems-fill-guide.md
   Why: every whole-number problem so far needs N5 or KX, which come late, so a Year 7 still learning facts sees none.
   These slots need early levels, so keep the numbers inside what those levels teach:
     A7 addition facts to 10 + 10 · S8 subtraction facts within 20 · M5 ×2, ×5, ×10 · D5 ÷2, ÷5, ÷10 · N5 2-digit add and subtract · KX all tables mixed
     M12 all tables · WA column addition · WS column subtraction · WD1 short division (no remainder in the app level). */
var wnCarry = (a, b) => { let c = 0; while (a > 0 || b > 0 || c > 0) { const s = a % 10 + b % 10 + c; if (s >= 10) return true; c = 0; a = Math.floor(a / 10); b = Math.floor(b / 10); } return false; };      // does adding a and b in columns carry anywhere?
var wnBorrow = (a, b) => { let br = 0; while (a > 0 || b > 0) { if (a % 10 - br < b % 10) return true; br = 0; a = Math.floor(a / 10); b = Math.floor(b / 10); } return false; };      // does a − b in columns need an exchange anywhere?
T({id: 'wn-1a', type: 1, needs: ['A7'], areas: ['A'], skel: 'add-two-small-amounts', ctx: 'school', style: 'plain', cur: '', marks: 1,
  desc: 'two amounts of 10 or less added: altogether (two colours) or now (some more)',
  gen: () => {
    const name = nm(), a = ri(3, 10), b = ri(3, 10);
    if (Math.random() < .5) {
      const [obj, c1, c2] = pick([['pens', 'red', 'blue'], ['balloons', 'red', 'green'], ['marbles', 'blue', 'yellow'], ['crayons', 'red', 'orange'], ['counters', 'black', 'white'], ['flowers', 'pink', 'white'], ['pencils', 'green', 'yellow']]);
      return W(`${name} has ${a} ${c1} ${obj} and ${b} ${c2} ${obj}. Work out how many ${obj} ${name} has altogether.`, a + b, [`${a} + ${b} = ${a + b}`]);
    }
    const obj = pick(['stickers', 'cards', 'stamps', 'shells', 'toy cars', 'badges', 'books', 'rulers']);
    return W(`${name} has ${a} ${obj}. ${name} gets ${b} more. Work out how many ${obj} ${name} has now.`, a + b, [`${a} + ${b} = ${a + b}`]);
  }});
T({id: 'wn-1b', type: 1, needs: ['S8'], areas: ['S'], skel: 'sub-within-20', ctx: 'food', style: 'plain', cur: '', marks: 1,
  desc: 'start from 11 to 20, take away 2 to 9 (eats, gives away, sells): how many are left',
  gen: () => {
    for (;;) {
      const name = nm(), n = ri(11, 20), k = ri(2, 9), food = pick(['apples', 'cupcakes', 'grapes', 'biscuits', 'strawberries', 'cherries', 'muffins', 'sweets']), verb = pick(['eats', 'gives away', 'sells']);
      if (n - k < 2) continue;
      return W(`${name} has ${n} ${food}. ${name} ${verb} ${k} of them. Work out how many ${food} are left.`, n - k, [`${n} − ${k} = ${n - k}`]);
    }
  }});
T({id: 'wn-1c', type: 1, needs: ['M5'], areas: ['M'], skel: 'mult-groups-of-2-5-10', ctx: 'shopping', style: 'plain', cur: '', marks: 1,
  desc: 'equal groups of 2, 5 or 10 bought: how many altogether',
  gen: () => {
    const name = nm(), n = ri(2, 10), [one, pl, thing, k] = pick([['pack', 'packs', 'pens', 5], ['bag', 'bags', 'apples', 5], ['box', 'boxes', 'eggs', 10], ['packet', 'packets', 'stickers', 10], ['pair', 'pairs', 'socks', 2], ['carton', 'cartons', 'pencils', 10], ['bunch', 'bunches', 'bananas', 5], ['tube', 'tubes', 'sweets', 10]]);
    return W(`${name} buys ${n} ${pl}. Each ${one} has ${k} ${thing}. Work out how many ${thing} ${name} buys altogether.`, n * k, [`${n} × ${k} = ${n * k}`]);
  }});
T({id: 'wn-1d', type: 1, needs: ['D5'], areas: ['D'], skel: 'div-share-by-2-5-10', ctx: 'food', style: 'plain', cur: '', marks: 1,
  desc: 'random: share equally between 2, 5 or 10, or put into groups of 2, 5 or 10 (a times-table total)',
  gen: () => {
    const name = nm(), k = pick([2, 5, 10]), m = ri(2, 10), t = k * m, food = pick(['sweets', 'grapes', 'strawberries', 'biscuits', 'cherries', 'slices of pizza']);
    if (Math.random() < .5) {
      const [pl, one] = pick([['friends', 'friend'], ['plates', 'plate'], ['bags', 'bag']]);
      return W(`${name} shares ${t} ${food} equally between ${k} ${pl}. Work out how many ${food} each ${one} gets.`, m, [`${t} ÷ ${k} = ${m}`]);
    }
    return W(`${name} puts ${t} ${food} into groups of ${k}. Work out how many groups there are.`, m, [`${t} ÷ ${k} = ${m}`]);
  }});
T({id: 'wn-2a', type: 2, needs: ['A7', 'S8'], areas: ['A', 'S'], skel: 'add-or-sub-within-20-from-story', ctx: 'leisure', style: 'plain', cur: '', marks: 1, tw: ['back'],
  desc: 'within 20, three versions: "more" then add, "fewer" then subtract, or the start unknown with "more" (subtract); steps say which and why',
  gen: () => {
    const [A, B] = two(), obj = pick(['marbles', 'cards', 'stickers', 'stamps', 'toy cars', 'shells']), v = pick(['add', 'sub', 'start']);
    if (v === 'add') {
      const a = ri(3, 14), b = ri(2, 20 - a);
      return W(`${A} has ${a} ${obj}. ${A} is given ${b} more. Work out how many ${obj} ${A} has now.`, a + b, [`More, so add: ${a} + ${b} = ${a + b}`]);
    }
    if (v === 'sub') {
      const a = ri(8, 20), b = ri(2, a - 2);
      return W(`${A} has ${a} ${obj}. ${B} has ${b} fewer ${obj} than ${A}. Work out how many ${obj} ${B} has.`, a - b, [`Fewer, so take away: ${a} − ${b} = ${a - b}`]);
    }
    const y = ri(8, 20), b = ri(2, y - 2);
    return W(`${A} had some ${obj}. ${A} was given ${b} more. Now ${A} has ${y}. Work out how many ${obj} ${A} had at first.`, y - b, [`${b} more were added, so take them away: ${y} − ${b} = ${y - b}`]);
  }});
T({id: 'wn-2b', type: 2, needs: ['N5'], areas: ['A', 'S', 'X'], skel: 'start-unknown-two-digit', ctx: 'money', style: 'plain', cur: 'both', marks: 1, tw: ['back'],
  desc: 'start unknown after spending, giving away or losing (sounds like subtraction, needs addition); half money, half objects',
  gen: () => {
    const name = nm(), s = ri(11, 60), l = ri(11, 99 - s), start = s + l;
    if (Math.random() < .5) {
      const c = cur2(), [verb, tail] = pick([['spends', ' on a game'], ['spends', ' on a present'], ['spends', ' on a toy'], ['gives away', ' to a charity']]);
      return W(`${name} ${verb} ${mon(s, c)}${tail}. ${name} has ${mon(l, c)} left. Work out how much money ${name} had at first.`, start, [`Add back the ${mon(s, c)}: ${mon(l, c)} + ${mon(s, c)} = ${mon(start, c)}`], {pre: c});
    }
    const [verb, thing, tail] = pick([['loses', 'cards', ''], ['gives away', 'stickers', ' to friends'], ['loses', 'points', ' in a quiz'], ['uses', 'tokens', ' at the arcade']]);
    return W(`${name} ${verb} ${s} ${thing}${tail}. ${name} has ${l} ${thing} left. Work out how many ${thing} ${name} had at first.`, start, [`Add back the ${s}: ${l} + ${s} = ${start}`]);
  }});
T({id: 'wn-2c', type: 2, needs: ['N5'], areas: ['A', 'X'], skel: 'fewer-than-means-add', ctx: 'sport', style: 'plain', cur: '', marks: 1,
  desc: 'random: "fewer than" where the answer is found by adding, or "more than" where the answer is found by subtracting',
  gen: () => {
    const [A, B] = two(), [verb, base, thing] = pick([['scored', 'score', 'points'], ['scored', 'score', 'runs'], ['did', 'do', 'press-ups'], ['did', 'do', 'sit-ups']]), d = ri(6, 25);
    if (Math.random() < .5) {
      const x = ri(20, 74), ans = x + d;
      return W(`${A} ${verb} ${d} fewer ${thing} than ${B}. ${A} ${verb} ${x} ${thing}. Work out how many ${thing} ${B} ${base === 'score' ? 'scored' : 'did'}.`, ans, [`${A} has fewer, so ${B} has more. Add: ${x} + ${d} = ${ans}`]);
    }
    const y = ri(35, 95), ans = y - d;
    return W(`${B} ${verb} ${d} more ${thing} than ${A}. ${B} ${verb} ${y} ${thing}. Work out how many ${thing} ${A} ${base === 'score' ? 'scored' : 'did'}.`, ans, [`${B} has more, so ${A} has fewer. Take away: ${y} − ${d} = ${ans}`]);
  }});
T({id: 'wn-2d', type: 2, needs: ['M5', 'D5'], areas: ['M', 'D'], skel: 'groups-total-or-count', ctx: 'school', style: 'plain', cur: '', marks: 1,
  desc: 'random: number of equal groups of 2, 5 or 10 given and the total asked, or the total given and the number of groups asked',
  gen: () => {
    const n = ri(2, 10), S = [
      {k: 5, mul: `There are ${n} teams. Each team has 5 players. Work out how many players there are altogether.`, div: t => `There are ${t} players. They make teams of 5. Work out how many teams there are.`},
      {k: 2, mul: `There are ${n} pairs of students. Work out how many students there are altogether.`, div: t => `${t} students work in pairs. Work out how many pairs there are.`},
      {k: 10, mul: `A hall has ${n} rows of 10 chairs. Work out how many chairs there are altogether.`, div: t => `A hall has ${t} chairs in rows of 10. Work out how many rows there are.`},
      {k: 5, mul: `A café has ${n} tables. Each table has 5 chairs. Work out how many chairs there are altogether.`, div: t => `A café has ${t} chairs. Each table has 5 chairs. Work out how many tables there are.`},
      {k: 10, mul: `A teacher has ${n} boxes of 10 pencils. Work out how many pencils there are altogether.`, div: t => `A teacher has ${t} pencils in boxes of 10. Work out how many boxes there are.`}], s = pick(S), t = n * s.k;
    if (Math.random() < .5) return W(s.mul, t, [`Equal groups, so multiply: ${n} × ${s.k} = ${t}`]);
    return W(s.div(t), n, [`Putting into equal groups, so divide: ${t} ÷ ${s.k} = ${n}`]);
  }});
T({id: 'wn-2e', type: 2, needs: ['KX'], areas: ['M', 'D'], skel: 'times-as-many', ctx: 'nature', style: 'plain', cur: '', marks: 1,
  desc: 'random: "times as many" to find the larger number (multiply) or the smaller number (divide)',
  gen: () => {
    const [place, a, b] = pick([['A pond', 'frogs', 'fish'], ['A farm', 'sheep', 'hens'], ['A zoo', 'lions', 'monkeys'], ['A park', 'ducks', 'pigeons'], ['A beach', 'crabs', 'shells'], ['A field', 'cows', 'sheep'], ['A garden', 'bees', 'butterflies']]);
    const s = ri(2, 12), m = ri(2, 9), t = s * m;
    if (Math.random() < .5) return W(`${place} has ${s} ${a}. It has ${m} times as many ${b} as ${a}. Work out how many ${b} it has.`, t, [`${m} times as many, so multiply: ${s} × ${m} = ${t}`]);
    return W(`${place} has ${t} ${b}. That is ${m} times as many as the number of ${a}. Work out how many ${a} there are.`, s, [`${m} times as many, so divide: ${t} ÷ ${m} = ${s}`]);
  }});
T({id: 'wn-2f', type: 2, needs: ['M12'], areas: ['M', 'D'], skel: 'cost-of-many-or-one', ctx: 'shopping', style: 'plain', cur: 'both', marks: 1,
  desc: 'random: cost of one (whole number 2 to 12) times a number of items, or the cost of several shared to find the cost of one',
  gen: () => {
    const c = cur2(), p = ri(2, 12), n = ri(2, 12), t = p * n, [one, pl] = pick([['notebook', 'notebooks'], ['ruler', 'rulers'], ['ticket', 'tickets'], ['magazine', 'magazines'], ['sandwich', 'sandwiches'], ['toy car', 'toy cars'], ['T-shirt', 'T-shirts']]);
    if (Math.random() < .5) return W(`One ${one} costs ${mon(p, c)}. Work out the cost of ${n} ${pl}.`, t, [`${n} × ${mon(p, c)} = ${mon(t, c)}`], {pre: c});
    return W(`${n} ${pl} cost ${mon(t, c)} altogether. Work out the cost of one ${one}.`, p, [`${mon(t, c)} ÷ ${n} = ${mon(p, c)}`], {pre: c});
  }});
T({id: 'wn-2g', type: 2, needs: ['WA', 'WS'], areas: ['NW'], skel: 'big-numbers-add-or-subtract', ctx: 'travel', style: 'plain', cur: '', marks: 1,
  desc: 'three- and four-digit numbers needing column methods: a total, a difference, or a whole when the part done and the part left are given',
  gen: () => {
    const kind = pick(['add', 'sub', 'start']), km = Math.random() < .7;
    if (kind === 'start') {
      let a, b; do { a = ri(1100, 5900); b = ri(1100, 5900); } while (!wnCarry(a, b));
      const [v, done, left] = pick([['plane', 'flown', 'fly'], ['ship', 'sailed', 'sail'], ['train', 'travelled', 'travel']]);
      return W(`A ${v} has ${done} ${a} km. It has ${b} km still to ${left}. Work out the length of the whole journey.`, a + b, [`Whole journey = part done + part left: ${a} + ${b} = ${a + b}`], {suf: ' km'});
    }
    if (kind === 'add') {
      let a, b; do { a = ri(1100, 6900); b = ri(300, 4900); } while (!wnCarry(a, b) || a + b > 9999);
      if (km) { const v = pick(['lorry', 'coach', 'train', 'ship']); return W(`A ${v} travels ${a} km in week one and ${b} km in week two. Work out how far the ${v} travels altogether.`, a + b, [`${a} + ${b} = ${a + b}`], {suf: ' km'}); }
      return W(`A railway station has ${a} passengers on Saturday and ${b} passengers on Sunday. Work out the total number of passengers.`, a + b, [`${a} + ${b} = ${a + b}`]);
    }
    let a, b; do { a = ri(2000, 9500); b = ri(500, a - 300); } while (!wnBorrow(a, b));
    if (km) { const [v1, v2] = pick([['lorry', 'coach'], ['train', 'bus'], ['ship', 'ferry']]); return W(`A ${v1} travels ${a} km. A ${v2} travels ${b} km. Work out how much further the ${v1} travels than the ${v2}.`, a - b, [`${a} − ${b} = ${a - b}`], {suf: ' km'}); }
    return W(`A ferry carries ${a} passengers in July and ${b} passengers in June. Work out how many more passengers it carries in July.`, a - b, [`${a} − ${b} = ${a - b}`]);
  }});
T({id: 'wn-2h', type: 2, needs: ['WD1'], areas: ['NW', 'D'], skel: 'div-remainder-round-down', ctx: 'food', style: 'plain', cur: '', marks: 2, tw: ['interpret'],
  desc: 'a total that does not divide exactly packed into boxes of 6, 8 or 12: how many full boxes (round down)',
  gen: () => {
    for (;;) {
      const t = ri(100, 400), k = pick([6, 8, 12]);
      if (t % k === 0) continue;
      const q = Math.floor(t / k), r = t % k, [thing, pack] = pick([['cupcakes', 'baker'], ['eggs', 'farmer'], ['cookies', 'baker'], ['muffins', 'baker'], ['oranges', 'shopkeeper']]);
      return W(`A ${pack} has ${t} ${thing}. The ${pack} packs them into boxes of ${k}. Work out how many full boxes the ${pack} can fill.`, q, [`${t} ÷ ${k} = ${q} remainder ${r}`, `Only full boxes count, so ${q} boxes`]);
    }
  }});
