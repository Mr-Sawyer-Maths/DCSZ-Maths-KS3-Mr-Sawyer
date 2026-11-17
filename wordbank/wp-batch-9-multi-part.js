/* BATCH 9: Multi-part questions and tables, one per hub topic. 9 slots. Guide: claude/word-problems-fill-guide.md, section "Multi-part questions and tables".
   This batch is the pilot for longer, exam-shaped questions (claude/word-problems-complexity.md). Matt reads its samples at checkpoint C before more are designed.
   Every slot here:
   - returns P(stem, [part a, part b, part c ...], options) instead of W(...). Each part is a W(...) with its own marks in the options: W(q, a, steps, {marks: 1}).
   - has its marks (the entry's marks field) equal to the sum of the parts' marks.
   - has type = the ladder level of its hardest part, and hub: 'core' (these are all Core tier).
   - starts easy: part (a) is level 1 or 2 and can be done by anyone who has the first level in needs. Later parts use earlier answers or add one twist.
   - is written in its board's style: Cambridge "Work out", "Write down", "Calculate", "Show your working" and later parts depending on earlier ones;
     AQA "Work out", "Write down", "Give a reason for your answer"; Edexcel "Work out", "You must show your working".
   A table goes in the options of P: P(stem, parts, {table: [['Item', 'Price'], ['Sandwich', '$3.50'], ...]}). The first row is the headings. */
var mpN = v => v < 0 ? '−' + (-v) : String(v);      // a number with a proper minus sign
var mpClock = (h, m) => String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');      // 8, 5 gives 08:05
var mpHM = t => [Math.floor(t / 60), t % 60];      // minutes after midnight to [hour, minute]
var mpGap = (h1, m1, h2, m2) => {      // minutes from one clock time to a later one, with the working a student would write
  const mins = h2 * 60 + m2 - h1 * 60 - m1, a = mpClock(h1, m1), b = mpClock(h2, m2);
  if (h1 === h2) return {mins, steps: [`${a} to ${b}: ${m2} − ${m1} = ${mins} minutes`]};
  const nums = [], steps = [];
  if (m1 > 0) { nums.push(60 - m1); steps.push(`${a} to ${mpClock(h1 + 1, 0)} = ${60 - m1} minutes`); }
  const whole = h2 - h1 - (m1 > 0 ? 1 : 0);
  if (whole > 0) { nums.push(whole * 60); steps.push(`${mpClock(m1 > 0 ? h1 + 1 : h1, 0)} to ${mpClock(h2, 0)} = ${whole} ${whole === 1 ? 'hour' : 'hours'} = ${whole * 60} minutes`); }
  if (m2 > 0) { nums.push(m2); steps.push(`${mpClock(h2, 0)} to ${b} = ${m2} minutes`); }
  if (nums.length > 1) steps.push(`${nums.join(' + ')} = ${mins} minutes`);
  return {mins, steps};
};
var mpBorrow = (a, b) => { let br = 0; while (a > 0 || b > 0) { if (a % 10 - br < b % 10) return true; br = 0; a = Math.floor(a / 10); b = Math.floor(b / 10); } return false; };      // does a − b in columns need an exchange?
var mpCols = (a, b) => { const lines = []; let br = 0; ['Units', 'Tens', 'Hundreds', 'Thousands'].forEach((nme, i) => { const da = Math.floor(a / Math.pow(10, i)) % 10, db = Math.floor(b / Math.pow(10, i)) % 10; let top = da - br; if (top < db) { top += 10; br = 1; } else br = 0; lines.push(`${nme}: ${top} − ${db} = ${top - db}`); }); return lines; };      // column subtraction, one line per column
var mpP = p => '£' + (p / 100).toFixed(2);      // pence as pounds, always 2 decimals: 240 gives £2.40
T({id: 'mp-whole-1', type: 3, needs: ['M12', 'WD1', 'N5', 'WM2'], areas: ['M', 'D', 'NW'], skel: 'trip-tickets-coaches-total', ctx: 'school', style: 'cam', cur: '$', marks: 5, hub: 'core', tw: ['interpret'],
  desc: 'school trip: total people, coaches needed (always round up), total coach cost (uses the number of coaches)',
  gen: () => {
    for (;;) {
      const s = ri(60, 180), t = ri(4, 12), n = s + t, c = pick([45, 50, 52]), k = Math.ceil(n / c), q = Math.floor(n / c), p = ri(150, 400), place = pick(['the museum', 'the science centre', 'the zoo', 'a castle']);
      if (n % c === 0) continue;
      return P(`A school is taking ${s} students and ${t} teachers to ${place}.`, [
        W('Work out the total number of people going on the trip.', n, [`${s} + ${t} = ${n}`], {marks: 1}),
        W(`A coach holds ${c} people. Work out how many coaches are needed.`, k, [`${n} ÷ ${c} = ${q} remainder ${n % c}`, `${q} ${q === 1 ? 'coach is' : 'coaches are'} not enough, so ${k} coaches`], {marks: 2}),
        W(`Each coach costs ${mon(p, '$')} to hire. Work out the total cost of the coaches.`, k * p, [`${k} × ${p} = ${k * p}`], {pre: '$', marks: 2})]);
    }
  }});
T({id: 'mp-place-1', type: 3, needs: ['N16', 'NE', 'WS'], areas: ['NP', 'NW'], skel: 'festival-round-estimate-difference', ctx: 'leisure', style: 'edexcel', cur: '£', marks: 5, hub: 'core',
  desc: 'festival ticket sales: round Saturday to the nearest 1000, estimate Sunday money to 1 significant figure, exact difference with exchanging',
  gen: () => {
    const r1 = v => Number(v.toPrecision(1));
    for (;;) {
      const sat = ri(2000, 8999), sun = ri(1000, sat - 300), price = ri(11, 59);
      if (sat % 10 === 0 || sun % 10 === 0 || price % 5 === 0 || !mpBorrow(sat, sun)) continue;
      const satR = Math.round(sat / 1000) * 1000, h = Math.floor(sat / 100) % 10, est = r1(sun) * r1(price);
      return P(`A festival sold ${sat} tickets on Saturday and ${sun} tickets on Sunday.`, [
        W('Write the number of tickets sold on Saturday correct to the nearest thousand.', satR, [`The hundreds digit is ${h}, so round ${h >= 5 ? 'up' : 'down'}`, `${sat} = ${satR} to the nearest thousand`], {marks: 1}),
        W(`Each ticket costs £${price}. By rounding each number to 1 significant figure, estimate the money taken on Sunday. You must show all your working.`, est,
          [`${sun} is about ${r1(sun)}`, `${price} is about ${r1(price)}`, `${r1(sun)} × ${r1(price)} = £${est}`], {pre: '£', marks: 2}),
        W('Work out exactly how many more tickets were sold on Saturday than on Sunday.', sat - sun, [...mpCols(sat, sun), `${sat} − ${sun} = ${sat - sun}`], {marks: 2})]);
    }
  }});
T({id: 'mp-neg-1', type: 3, needs: ['N13'], areas: ['NN'], skel: 'city-temperatures-table', ctx: 'nature', style: 'cam', cur: '', marks: 4, hub: 'core', neg: true,
  desc: 'table of five city temperatures at midnight (2 or 3 below zero): the lowest, the difference between highest and lowest, a rise by midday',
  gen: () => {
    const cold = ['Moscow', 'Oslo', 'Helsinki', 'Edmonton', 'Reykjavik', 'Anchorage', 'Stockholm', 'Winnipeg', 'Warsaw'], warm = ['London', 'Paris', 'Sydney', 'Cairo', 'Madrid', 'Rome', 'Lima', 'Lisbon', 'Singapore'];
    const k = pick([2, 3]), negs = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).slice(0, k).map(v => -v), poss = shuf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 5 - k);
    const rows = shuf([...shuf(cold).slice(0, k).map((c, i) => [c, negs[i]]), ...shuf(warm).slice(0, 5 - k).map((c, i) => [c, poss[i]])]), vals = rows.map(r => r[1]);
    const lo = Math.min(...vals), hi = Math.max(...vals), lowCity = rows.find(r => r[1] === lo)[0], [city, t] = pick(rows), rise = ri(3, 15), ans = t + rise;
    return P('The table shows the temperature in five cities at midnight.', [
      W('Write down the lowest temperature.', lo, [`${lowCity} has the lowest temperature: ${mpN(lo)}`], {suf: '°C', marks: 1}),
      W('Work out the difference between the highest temperature and the lowest temperature.', hi - lo, [`${hi} − (${mpN(lo)}) = ${hi} + ${-lo} = ${hi - lo}`], {suf: '°C', marks: 2}),
      W(`By midday the temperature in ${city} has risen by ${rise} °C. Work out the temperature in ${city} at midday.`, ans, [`${mpN(t)} + ${rise} = ${mpN(ans)}`], {suf: '°C', marks: 1})],
    {table: [['City', 'Temperature (°C)'], ...rows.map(r => [r[0], mpN(r[1])])]});
  }});
T({id: 'mp-powers-1', type: 4, needs: ['N18', 'WD1', 'M12', 'WM3'], areas: ['NX', 'NW', 'M'], skel: 'square-patio-tiles-packs-cost', ctx: 'building', style: 'cam', cur: '$', marks: 5, hub: 'core', tw: ['interpret'],
  desc: 'square patio of n by n tiles: number of tiles (square), packs needed (round up), total cost (uses the packs)',
  gen: () => {
    for (;;) {
      const n = ri(6, 15), sq = n * n, k = pick([8, 10, 12]), packs = Math.ceil(sq / k), q = Math.floor(sq / k), p = ri(9, 25);
      if (sq % k === 0) continue;
      return P(`A square patio is covered with square tiles. There are ${n} tiles along each side.`, [
        W('Work out the number of tiles needed.', sq, [`${n}${sup(2)} = ${n} × ${n} = ${sq}`], {marks: 1}),
        W(`The tiles are sold in packs of ${k}. Work out how many packs must be bought.`, packs, [`${sq} ÷ ${k} = ${q} remainder ${sq % k}`, `${q} packs is not enough, so ${packs} packs`], {marks: 2}),
        W(`One pack costs ${mon(p, '$')}. Work out the total cost of the packs.`, packs * p, [`${packs} × ${p} = ${packs * p}`], {pre: '$', marks: 2})]);
    }
  }});
T({id: 'mp-frac-1', type: 3, needs: ['F4', 'F13', 'WM2'], areas: ['FF'], skel: 'fraction-of-fraction-of-crowd', ctx: 'sport', style: 'edexcel', cur: '', marks: 5, hub: 'core',
  desc: 'a crowd (multiple of 40): a fraction are children, a fraction of those are under 10, then the fraction of the whole crowd (simplest form)',
  gen: () => {
    for (;;) {
      const P0 = ri(5, 30) * 40, [a, b] = pick([[3, 8], [2, 5], [3, 5], [5, 8], [3, 4]]), [c, e] = pick([[1, 2], [1, 4], [1, 5], [2, 3], [1, 3], [3, 4], [2, 5]]), ch = P0 / b * a;
      if (ch % e !== 0) continue;
      const u = ch / e * c, ans = fs(u, P0), sport = pick(['football match', 'rugby match', 'basketball game']);
      const s1 = [`${P0} ÷ ${b} = ${P0 / b}`, `${P0 / b} × ${a} = ${ch}`], s2 = [`${ch} ÷ ${e} = ${ch / e}`];
      if (c > 1) s2.push(`${ch / e} × ${c} = ${u}`);
      const mult = Math.random() < .5, nu = mult ? a * c : u, de = mult ? b * e : P0, s3 = [mult ? `${a}/${b} × ${c}/${e} = ${nu}/${de}` : `${u} out of ${P0} = ${nu}/${de}`];
      if (ans !== `${nu}/${de}`) s3.push(`${nu}/${de} = ${ans}`);      // simplify only when it can be
      return P(`${P0} people watch a ${sport}.`, [
        W(`${F(a, b)} of the people are children. Work out the number of children. You must show all your working.`, ch, s1, {marks: 2}),
        W(`${F(c, e)} of the children are under 10. Work out the number of children who are under 10.`, u, s2, {marks: 2}),
        W('What fraction of all the people are children under 10? Give your answer in its simplest form.', ans, s3, {form: 'simplest', marks: 1})]);
    }
  }});
T({id: 'mp-dec-1', type: 4, needs: ['F15', 'F16', 'WD3'], areas: ['FD', 'NW'], skel: 'cafe-menu-order-change-how-many', ctx: 'food', style: 'aqa', cur: '£', marks: 5, hub: 'core', tw: ['interpret'],
  desc: 'café price list in a table: total for two of one item and one of another, change from £10 or £20, how many of one item a round amount buys (round down)',
  gen: () => {
    for (;;) {
      const items = shuf([['coffee', 'coffees'], ['tea', 'teas'], ['muffin', 'muffins'], ['cookie', 'cookies'], ['sandwich', 'sandwiches'], ['juice', 'juices'], ['hot chocolate', 'hot chocolates'], ['soup', 'soups']]).slice(0, pick([4, 5]));
      const prices = []; while (prices.length < items.length) { const p = ri(17, 99) * 5; if (!prices.includes(p)) prices.push(p); }
      const [A, B] = two(), [i, j] = shuf(items.map((_, x) => x)).slice(0, 2), z = ri(0, items.length - 1), amt = ri(5, 12);
      prices[z] = pick([60, 75, 80, 120, 125, 150, 160, 175, 200, 225, 240, 250].filter(p => !prices.includes(p)));      // non-calculator (17 Nov 2026): part (c) divides by a price that is easy to count up in
      const total = 2 * prices[i] + prices[j], pay = total > 1000 ? 20 : (Math.random() < .7 ? 10 : 20), q = Math.floor(amt * 100 / prices[z]), r = amt * 100 % prices[z];
      if (r === 0 || q < 2 || q > 9) continue;
      return P('Here is part of a café price list.', [
        W(`${A} buys 2 ${items[i][1]} and 1 ${items[j][0]}. Work out the total cost. You must show your working.`, total / 100, [`2 × ${mpP(prices[i])} = ${mpP(2 * prices[i])}`, `${mpP(2 * prices[i])} + ${mpP(prices[j])} = ${mpP(total)}`], {pre: '£', marks: 2}),
        W(`${A} pays with a £${pay} note. Work out the change.`, (pay * 100 - total) / 100, [`£${pay} − ${mpP(total)} = ${mpP(pay * 100 - total)}`], {pre: '£', marks: 1}),
        W(`${B} has £${amt} to spend. ${B} only buys ${items[z][1]}. Work out the greatest number of ${items[z][1]} ${B} can buy.`, q, [`${q} × ${mpP(prices[z])} = ${mpP(q * prices[z])}`, `${q + 1} × ${mpP(prices[z])} = ${mpP((q + 1) * prices[z])}, which is more than £${amt}`, `Only whole items can be bought, so ${q}`], {marks: 2})],
      {table: [['Item', 'Price'], ...items.map((it, x) => [it[0][0].toUpperCase() + it[0].slice(1), mpP(prices[x])])]});
    }
  }});
T({id: 'mp-pct-1', type: 4, needs: ['F8', 'F18', 'M12', 'WM2'], areas: ['FP', 'M'], skel: 'tickets-child-adult-takings-rise', ctx: 'leisure', style: 'ocr', cur: '£', marks: 6, hub: 'core',
  desc: 'theatre tickets (multiple of 20): a percentage are child tickets, total money from child and adult prices, then a 5%, 10% or 20% rise',
  gen: () => {
    const T0 = ri(5, 20) * 20, pct = pick([15, 20, 25, 30, 35, 40]), child = T0 * pct / 100, adult = T0 - child, c = pick([4, 5, 6, 8]), a = pick([10, 12, 15]), total = child * c + adult * a, rise = pick([10, 5, 20]);
    const tenP = total * 10, incP = rise === 10 ? tenP : rise === 20 ? 2 * tenP : tenP / 2, newP = total * 100 + incP;
    const s3 = rise === 10 ? [`10% of £${total} = ${mon(tenP / 100, '£')}`] : rise === 20 ? [`10% of £${total} = ${mon(tenP / 100, '£')}`, `20% = 2 × ${mon(tenP / 100, '£')} = ${mon(incP / 100, '£')}`] : [`10% of £${total} = ${mon(tenP / 100, '£')}`, `5% = ${mon(tenP / 100, '£')} ÷ 2 = ${mon(incP / 100, '£')}`];
    s3.push(`£${total} + ${mon(incP / 100, '£')} = ${mon(newP / 100, '£')}`);
    return P(`A theatre sells ${T0} tickets for a show.`, [
      W(`${pct}% of the tickets are child tickets. Work out the number of child tickets.`, child, [`5% of ${T0} = ${T0} ÷ 20 = ${T0 / 20}`, `${pct}% = ${pct / 5} × 5%`, `${pct / 5} × ${T0 / 20} = ${child}`], {marks: 2}),
      W(`A child ticket costs £${c}. An adult ticket costs £${a}. Work out the total money taken.`, total, [`Adult tickets: ${T0} − ${child} = ${adult}`, `${child} × £${c} = £${child * c}`, `${adult} × £${a} = £${adult * a}`, `£${child * c} + £${adult * a} = £${total}`], {pre: '£', marks: 2}),
      W(`The next year, the total money taken goes up by ${rise}%. Find the new total.`, newP / 100, s3, {pre: '£', marks: 2})]);
  }});
T({id: 'mp-equiv-1', type: 5, needs: ['F6', 'F9', 'F17'], areas: ['FE', 'FP'], skel: 'three-test-scores-compare', ctx: 'school', style: 'aqa', cur: '', marks: 5, hub: 'core',
  desc: 'three students score "s out of t" on tests with different totals: first as a percentage, second as a simplest fraction, then who is highest and their percentage',
  gen: () => {
    for (;;) {
      const names = shuf(NAMES).slice(0, 3), ts = shuf([20, 25, 40, 50]).slice(0, 3), ss = ts.map(t => ri(Math.ceil(t * .45), t - 2)), pcts = ss.map((s, i) => s * 100 / ts[i]);
      if (gcd(ss[1], ts[1]) === 1 || new Set(pcts).size < 3) continue;
      const pc = (s, t) => [`100 ÷ ${t} = ${nstr(100 / t)}`, `${s} × ${nstr(100 / t)} = ${nstr(s * 100 / t)}%`], g = gcd(ss[1], ts[1]), top = pcts.indexOf(Math.max(...pcts));
      return P('Three students take tests. The table shows their scores.', [
        W(`Write ${names[0]}'s score as a percentage.`, pcts[0], pc(ss[0], ts[0]), {suf: '%', marks: 1}),
        W(`Write ${names[1]}'s score as a fraction in its simplest form.`, fs(ss[1], ts[1]), [`${ss[1]}/${ts[1]}: divide the top and bottom by ${g}`, `${ss[1]}/${ts[1]} = ${fs(ss[1], ts[1])}`], {form: 'simplest', marks: 2}),
        W('Which student got the highest percentage? Write down that percentage. Give a reason for your answer.', pcts[top], [...names.map((n, i) => `${n}: ${ss[i]} out of ${ts[i]} = ${nstr(pcts[i])}%`), `${names[top]} has the highest percentage: ${nstr(pcts[top])}%`], {suf: '%', pick: {opts: shuf(names), a: names[top]}, marks: 2})],
      {table: [['Name', 'Score'], ...names.map((n, i) => [n, `${ss[i]} out of ${ts[i]}`])]});
    }
  }});
T({id: 'mp-time-1', type: 4, needs: ['N5', 'N12'], areas: ['X', 'NM'], skel: 'bus-timetable-journey-wait', ctx: 'travel', style: 'cam', cur: '', marks: 5, hub: 'core',
  desc: 'bus timetable in a table (two buses, four stops): journey time, how long a person waits for Bus 2, and Bus 2 running late',
  gen: () => {
    const stopsAll = ['Station', 'Library', 'Market Square', 'Park Road', 'Hospital', 'School', 'Town Hall', 'Harbour', 'Leisure Centre', 'Bridge Street'];
    for (;;) {
      const h0 = ri(7, 10), m0 = ri(1, 11) * 5, d = [ri(2, 5) * 5, ri(2, 5) * 5, ri(2, 5) * 5], off = [0, d[0], d[0] + d[1], d[0] + d[1] + d[2]], delta = ri(4, 10) * 5, late = pick([10, 12, 15]);
      const base = h0 * 60 + m0, b1 = off.map(o => mpHM(base + o)), b2 = off.map(o => mpHM(base + delta + o));
      if (b1[3][0] <= h0 || b2[3][0] <= b2[0][0]) continue;
      const stops = shuf(stopsAll).slice(0, 4), name = nm(), arr = base + off[1] + ri(2, delta - 5), A = mpHM(arr), tot = mpGap(b1[0][0], b1[0][1], b1[3][0], b1[3][1]), wait = mpGap(A[0], A[1], b2[1][0], b2[1][1]);
      const L = mpHM(base + delta + off[3] + late), lt = mpGap(b1[0][0], b1[0][1], L[0], L[1]);
      return P('Here is part of a bus timetable.', [
        W(`Work out how long, in minutes, Bus 1 takes to go from ${stops[0]} to ${stops[3]}.`, tot.mins, tot.steps, {suf: ' minutes', marks: 2}),
        W(`${name} arrives at ${stops[1]} at ${mpClock(A[0], A[1])}, after Bus 1 has left. Work out how many minutes ${name} waits for Bus 2.`, wait.mins, wait.steps, {suf: ' minutes', marks: 1}),
        W(`One day, Bus 2 is ${late} minutes late at every stop. Work out how many minutes after Bus 1 leaves ${stops[0]} that Bus 2 reaches ${stops[3]}.`, lt.mins, [`${mpClock(b2[3][0], b2[3][1])} + ${late} minutes = ${mpClock(L[0], L[1])}`, ...lt.steps], {suf: ' minutes', marks: 2})],
      {table: [['Stop', 'Bus 1', 'Bus 2'], ...stops.map((s, i) => [s, mpClock(b1[i][0], b1[i][1]), mpClock(b2[i][0], b2[i][1])])]});
    }
  }});
