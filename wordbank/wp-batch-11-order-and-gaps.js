/* BATCH 11: Order of operations (NO, 7 slots) and the last gaps in the grid (4 slots). 11 slots. Guide: claude/word-problems-fill-guide.md
   Order of operations is its own area in the word problem bank since 17 Nov 2026 (split from Negative numbers). Its one app level is
   N15 order of operations (brackets, then powers, then × and ÷, then + and −). Keep these problems free of negative numbers.
   Other levels: N13, N14 negatives · X5 adding and taking tens · KX all tables mixed · M12 all tables · N18 squares. */
var noN = v => v < 0 ? '−' + (-v) : String(v);      // a number with a proper minus sign
var noNum = {2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six'};
T({id: 'no-1a', type: 1, needs: ['N15'], areas: ['NO'], skel: 'evaluate-a-given-calculation', ctx: 'leisure', style: 'plain', cur: '', marks: 1,
  desc: 'a score or total written as b + n × p (addition first): work it out by multiplying first',
  gen: () => {
    const name = nm(), b = ri(2, 10), p = ri(2, 5), n = ri(3, 12), ans = b + n * p;
    const q = pick([
      `In a quiz, each correct answer scores ${p} points and there is a ${b}-point bonus. ${name} gets ${n} answers right. ${name}'s score is ${b} + ${n} × ${p}. Work out ${name}'s score.`,
      `In a game, ${name} starts with ${b} points. Each coin collected is worth ${p} points. ${name} collects ${n} coins. ${name}'s total is ${b} + ${n} × ${p}. Work out ${name}'s total.`,
      `A sports team has ${b} points already. Each win adds ${p} points. The team wins ${n} more games. The new total is ${b} + ${n} × ${p}. Work out the new total.`,
      `${name} has ${b} stickers. ${name} buys ${n} packs with ${p} stickers in each pack. The number of stickers is now ${b} + ${n} × ${p}. Work out how many stickers ${name} has.`]);
    return W(q, ans, [`${n} × ${p} = ${n * p}`, `${b} + ${n * p} = ${ans}`]);
  }});
T({id: 'no-1b', type: 1, needs: ['N15'], areas: ['NO'], skel: 'evaluate-a-given-calculation-with-brackets', ctx: 'school', style: 'plain', cur: '', marks: 1,
  desc: 'a total written as n × (a + b) with brackets: work out the bracket first',
  gen: () => {
    const n = ri(2, 9), a = ri(2, 10), b = ri(2, 10), s = a + b, ans = n * s;
    const q = pick([
      [`Each of ${n} tables has ${a} children and ${b} adults. The number of people is ${n} × (${a} + ${b}). Work out the number of people.`],
      [`Each of ${n} bags has ${a} red sweets and ${b} green sweets. The number of sweets is ${n} × (${a} + ${b}). Work out the number of sweets.`],
      [`Each of ${n} rows has ${a} blue chairs and ${b} red chairs. The number of chairs is ${n} × (${a} + ${b}). Work out the number of chairs.`],
      [`Each of ${n} teams has ${a} players and ${b} helpers. The number of people is ${n} × (${a} + ${b}). Work out the number of people.`]])[0];
    return W(q, ans, [`${a} + ${b} = ${s}`, `${n} × ${s} = ${ans}`]);
  }});
T({id: 'no-2a', type: 2, needs: ['N15'], areas: ['NO'], skel: 'brackets-needed-or-not', ctx: 'shopping', style: 'plain', cur: '', marks: 2,
  desc: 'random: n packs each holding a of one thing and b of another (brackets), or n packs of a plus b loose ones (no brackets)',
  gen: () => {
    const [box, boxes, one, two_] = pick([['box', 'boxes', 'pens', 'pencils'], ['bag', 'bags', 'apples', 'oranges'], ['pack', 'packs', 'red cards', 'blue cards'], ['tray', 'trays', 'muffins', 'cookies'], ['crate', 'crates', 'books', 'magazines']]);
    const n = ri(2, 9), a = ri(2, 12), b = ri(2, 12);
    if (Math.random() < .5) {
      const s = a + b, ans = n * s;
      return W(`Each ${box} has ${a} ${one} and ${b} ${two_}. There are ${n} ${boxes}. Work out how many ${one} and ${two_} there are altogether.`, ans,
        [`${n} × (${a} + ${b})`, `${a} + ${b} = ${s}`, `${n} × ${s} = ${ans}`]);
    }
    const x = n * a, ans = x + b;
    return W(`There are ${n} ${boxes} with ${a} ${one} in each ${box}. There are also ${b} ${one} loose. Work out how many ${one} there are altogether.`, ans,
      [`${n} × ${a} + ${b}`, `${n} × ${a} = ${x}`, `${x} + ${b} = ${ans}`]);
  }});
T({id: 'no-2b', type: 2, needs: ['N15'], areas: ['NO'], skel: 'which-calculation-matches', ctx: 'school', style: 'aqa', cur: '', marks: 2,
  desc: 'a short story and three calculations with the same numbers: pick the one that matches, then work it out',
  gen: () => {
    for (;;) {
      const p = ri(2, 9), q = ri(2, 9), r = ri(2, 12), f = ri(0, 2);
      const calcs = [`${p} × ${q} + ${r}`, `${p} × (${q} + ${r})`, `${p} + ${q} × ${r}`], vals = [p * q + r, p * (q + r), p + q * r];
      if (new Set(vals).size < 3) continue;
      const [story, thing] = [
        [`There are ${p} bags with ${q} sweets in each bag. There are also ${r} loose sweets.`, 'sweets'],
        [`There are ${p} boxes. Each box has ${q} red pens and ${r} blue pens.`, 'pens'],
        [`A shelf has ${p} books. Then ${q} boxes of ${r} books each are put on the shelf.`, 'books']][f];
      const steps = [[`${p} × ${q} = ${p * q}`, `${p * q} + ${r} = ${vals[0]}`], [`${q} + ${r} = ${q + r}`, `${p} × ${q + r} = ${vals[1]}`], [`${q} × ${r} = ${q * r}`, `${p} + ${q * r} = ${vals[2]}`]][f];
      return W(`${story} Which calculation gives the total number of ${thing}? Work out the answer.`, vals[f], [`The calculation is ${calcs[f]}`, ...steps], {pick: {opts: shuf(calcs), a: calcs[f]}});
    }
  }});
T({id: 'no-3a', type: 3, needs: ['N15', 'KX'], areas: ['NO', 'D'], skel: 'share-the-cost-of-a-sum', ctx: 'food', style: 'plain', cur: 'both', marks: 2,
  desc: 'friends share the cost of two things equally: (a + b) ÷ n with a whole-number answer',
  gen: () => {
    const c = cur2(), n = ri(2, 6), k = ri(3, 12), t = n * k, a = ri(Math.ceil(t * .3), Math.floor(t * .7)), b = t - a;
    const [[i1, v1], [i2, v2]] = pick([[['a pizza', 'costs'], ['some drinks', 'cost']], [['a birthday cake', 'costs'], ['some balloons', 'cost']], [['a box of sandwiches', 'costs'], ['a bottle of juice', 'costs']], [['a big bag of popcorn', 'costs'], ['some sweets', 'cost']]]);
    return W(`${noNum[n]} friends share the cost of ${i1} and ${i2}. ${i1[0].toUpperCase() + i1.slice(1)} ${v1} ${mon(a, c)}. ${i2[0].toUpperCase() + i2.slice(1)} ${v2} ${mon(b, c)}. They share the total cost equally. Work out how much each friend pays.`, k,
      [`(${mon(a, c)} + ${mon(b, c)}) ÷ ${n}`, `${mon(a, c)} + ${mon(b, c)} = ${mon(t, c)}`, `${mon(t, c)} ÷ ${n} = ${mon(k, c)}`], {pre: c});
  }});
T({id: 'no-4a', type: 4, needs: ['N15', 'M12'], areas: ['NO', 'M'], skel: 'league-points-table', ctx: 'sport', style: 'ocr', cur: '', marks: 3,
  desc: 'league table of three teams (won, drawn, lost): how many more points one team has than another (3 for a win, 1 for a draw)',
  gen: () => {
    for (;;) {
      const teams = shuf(['Rovers', 'Wanderers', 'Rangers', 'Hornets', 'Falcons', 'Tigers', 'Eagles', 'Comets']).slice(0, 3), g = ri(10, 16);
      const rows = teams.map(t => { const w = ri(0, g), d = ri(0, g - w); return {t, w, d, l: g - w - d, pts: 3 * w + d}; });
      const [x, y] = shuf(rows).slice(0, 2);
      if (x.pts === y.pts || rows.some(r => r.w > 12)) continue;
      const [hi, lo] = x.pts > y.pts ? [x, y] : [y, x];
      return W(`The table shows the results of three teams. A win scores 3 points, a draw scores 1 point and a loss scores 0 points. Work out how many more points ${hi.t} have than ${lo.t}.`, hi.pts - lo.pts,
        [`${hi.t}: 3 × ${hi.w} + ${hi.d} = ${3 * hi.w} + ${hi.d} = ${hi.pts}`, `${lo.t}: 3 × ${lo.w} + ${lo.d} = ${3 * lo.w} + ${lo.d} = ${lo.pts}`, `${hi.pts} − ${lo.pts} = ${hi.pts - lo.pts}`],
        {table: [['Team', 'Won', 'Drawn', 'Lost'], ...rows.map(r => [r.t, r.w, r.d, r.l])]});
    }
  }});
T({id: 'no-5a', type: 5, needs: ['N15'], areas: ['NO'], skel: 'brackets-to-make-it-true', ctx: 'school', style: 'aqa', cur: '', marks: 2,
  desc: 'a student writes a calculation that needs brackets to be true: choose where the brackets go, then work out the value without them',
  gen: () => {
    const ev = (a, o, b) => o === '+' ? a + b : o === '−' ? a - b : o === '×' ? a * b : a / b;
    for (;;) {
      const [o1, o2] = pick([['+', '×'], ['×', '+'], ['−', '×'], ['+', '÷']]);
      let x = ri(2, 12), y = ri(2, 12), z = ri(2, 9);
      if (o1 === '−') { x = ri(12, 30); y = ri(2, 5); z = ri(2, 4); }
      if (o2 === '÷') { z = ri(2, 6); y = z * ri(1, 6); x = z * ri(1, 6); }
      const left = ev(ev(x, o1, y), o2, z), right = ev(x, o1, ev(y, o2, z));
      const plain = (o2 === '×' || o2 === '÷') && (o1 === '+' || o1 === '−') ? right : left;      // × and ÷ come before + and −; for × then +, left to right is the same
      const claimed = plain === left ? right : left, needL = plain !== left;
      if (!Number.isInteger(plain) || !Number.isInteger(claimed) || plain <= 0 || claimed <= 0 || plain === claimed) continue;
      if (o1 === '−' && x <= y) continue;
      if (x === y || y === z) continue;
      const name = nm(), L = `(${x} ${o1} ${y}) ${o2} ${z}`, R = `${x} ${o1} (${y} ${o2} ${z})`, T3 = `${x} ${o1} ${y} ${o2} (${z})`, base = `${x} ${o1} ${y} ${o2} ${z}`;
      const right_ = needL ? L : R, first = needL ? `${x} ${o1} ${y}` : `${y} ${o2} ${z}`, firstV = needL ? ev(x, o1, y) : ev(y, o2, z);
      const withSteps = needL ? [`${first} = ${firstV}`, `${firstV} ${o2} ${z} = ${claimed}`] : [`${first} = ${firstV}`, `${x} ${o1} ${firstV} = ${claimed}`];
      const m = plain === right ? [`${y} ${o2} ${z} = ${ev(y, o2, z)}`, `${x} ${o1} ${ev(y, o2, z)} = ${plain}`] : [`${x} ${o1} ${y} = ${ev(x, o1, y)}`, `${ev(x, o1, y)} ${o2} ${z} = ${plain}`];
      return W(`${name} writes ${base} = ${claimed}. Where should the brackets go to make it true? Work out what ${base} really equals.`, plain,
        [`With ${right_}: ${withSteps.join(', ')}, so ${right_} = ${claimed}`, `Without brackets: ${m.join(', ')}`], {pick: {opts: shuf([L, R, T3]), a: right_}});
    }
  }});
T({id: 'gap-x-1a', type: 1, needs: ['X5'], areas: ['X'], skel: 'add-or-take-tens', ctx: 'leisure', style: 'plain', cur: '', marks: 1,
  desc: 'a two-digit amount, then a whole number of tens added or taken away (only the tens digit changes)',
  gen: () => {
    const name = nm(), things = pick(['stickers', 'marbles', 'cards', 'stamps', 'shells', 'beads']), add = Math.random() < .5, t0 = ri(add ? 1 : 2, add ? 8 : 9), u = ri(0, 9);
    const k = add ? ri(1, 9 - t0) : ri(1, t0 - 1), s = t0 * 10 + u, ans = add ? s + k * 10 : s - k * 10;
    const q = add ? `${name} has ${s} ${things}. ${name} buys ${k * 10} more. Work out how many ${things} ${name} has now.` : `${name} has ${s} ${things}. ${name} gives away ${k * 10}. Work out how many ${things} ${name} has now.`;
    return W(q, ans, [`${s} ${add ? '+' : '−'} ${k * 10} = ${ans}`]);
  }});
T({id: 'gap-d-5a', type: 5, needs: ['KX'], areas: ['D'], skel: 'share-equally-check-a-claim', ctx: 'food', style: 'plain', cur: '', marks: 2,
  desc: 'someone claims a number of things can be shared equally with none left over: half right; the number answer is the remainder',
  gen: () => {
    const right = Math.random() < .5;
    for (;;) {
      const name = nm(), n = ri(3, 9), things = pick(['sweets', 'stickers', 'cards', 'pencils', 'biscuits']), who = pick(['friends', 'children', 'cousins']);
      const tot = right ? n * ri(Math.ceil(30 / n), Math.floor(100 / n)) : ri(30, 100);
      if (!right && tot % n === 0) continue;
      const q = Math.floor(tot / n), r = tot % n;
      return W(`${name} says that ${tot} ${things} can be shared equally between ${n} ${who} with none left over. Is ${name} right? Work out how many ${things} are left over.`, r,
        [`${tot} ÷ ${n} = ${q} remainder ${r}`, r === 0 ? 'The remainder is 0, so yes' : `The remainder is ${r}, so no`], {pick: {opts: ['Yes', 'No'], a: right ? 'Yes' : 'No'}});
    }
  }});
T({id: 'gap-nn-4a', type: 4, needs: ['N13', 'N14'], areas: ['NN'], skel: 'neg-repeated-rise-then-change', ctx: 'nature', style: 'cam', cur: '', marks: 3, neg: true,
  desc: 'a diver at a negative depth rises the same amount each minute, then dives further: the answer is still negative',
  gen: () => {
    for (;;) {
      const s = ri(20, 40), r = ri(2, 6), m = ri(2, 5), R = r * m, d = ri(3, 12);
      if (R >= s) continue;
      const mid = s - R, ans = mid + d;
      return W(`A diver is at a position of ${noN(-s)} m, where 0 m is the surface. The diver rises ${r} m each minute for ${m} minutes. Then the diver dives down a further ${d} m. Work out the position of the diver now.`, -ans,
        [`${r} × ${m} = ${R}`, `${noN(-s)} + ${R} = ${noN(-mid)}`, `${noN(-mid)} − ${d} = ${noN(-ans)}`], {suf: ' m'});
    }
  }});
T({id: 'gap-nn-5a', type: 5, needs: ['N13'], areas: ['NN'], skel: 'neg-two-changes-backwards', ctx: 'nature', style: 'plain', cur: '', marks: 2, neg: true, tw: ['back'],
  desc: 'working backwards: two changes in temperature (a fall and/or a rise) and the final temperature (negative): find the start',
  gen: () => {
    const where = pick(['In the mountains', 'On a winter night', 'In a freezer room', 'At the top of the hill']);
    const end = -ri(1, 12), c1 = ri(2, 12), c2 = ri(2, 12), d1 = Math.random() < .5 ? 1 : -1, d2 = Math.random() < .5 ? 1 : -1;
    const w = d => d > 0 ? 'rose' : 'fell', mid = end - d2 * c2, start = mid - d1 * c1;
    const un = (v, d, c) => `${noN(v)} ${d > 0 ? '−' : '+'} ${c} = ${noN(v - d * c)}`;
    return W(`${where}, the temperature ${w(d1)} by ${c1} degrees, then ${w(d2)} by ${c2} degrees. It is now ${noN(end)}°C. Work out the temperature at the start.`, start,
      [`Undo the second change: ${un(end, d2, c2)}`, `Undo the first change: ${un(mid, d1, c1)}`], {suf: '°C'});
  }});
