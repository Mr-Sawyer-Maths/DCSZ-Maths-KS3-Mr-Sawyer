/* BATCH 8: Whole numbers with time, extra information, interpreting and errors (X, NW, A, S, M, D, NM). 12 slots. Guide: claude/word-problems-fill-guide.md
   Time is new here. Rules: every answer that is a time has a unit; use seconds for race times, timers and anything under about two minutes,
   minutes and hours for journeys. Clock times are written as 08:45 (24-hour) or 8:45 am, never as an answer.
   Levels: N5 2-digit add and subtract · X6 doubling and halving · M6 ×6 (so ×60 is a known fact scaled) · N12 known facts scaled (30 × 40)
           N21 multiplying by splitting · KX all tables · M12 all tables · WA, WS column add and subtract · WM2 3-digit × 1-digit · WM3 2-digit × 2-digit · WD1 short division. */
var wtClock = (h, m) => String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');      // 8, 5 gives 08:05
var wtSplit = (n, t) => { const tens = Math.floor(t / 10) * 10, u = t % 10; return `${n} × ${t} = ${n} × ${tens} + ${n} × ${u} = ${n * tens} + ${n * u} = ${n * t}`; };      // n × t by splitting t into tens and ones
T({id: 'wn-3a', type: 3, needs: ['N12', 'N5'], areas: ['NM', 'X'], skel: 'minutes-and-seconds-to-seconds', ctx: 'sport', style: 'cam', cur: '', marks: 2,
  desc: 'a time in minutes and seconds (a run, a song, a swim, a rowing session) written in seconds',
  gen: () => {
    const name = nm(), m = ri(2, 9), s = ri(5, 55), t = m * 60 + s, tx = `${m} minutes ${s} seconds`;
    const q = pick([`${name} runs a 3 km race in ${tx}.`, `A song lasts ${tx}.`, `${name} swims 400 m in ${tx}.`, `${name} does a rowing session that lasts ${tx}.`]);
    return W(`${q} Work out this time in seconds.`, t, [`${m} × 60 = ${m * 60}`, `${m * 60} + ${s} = ${t}`], {suf: ' seconds'});
  }});
T({id: 'wn-3b', type: 3, needs: ['N5'], areas: ['X', 'S'], skel: 'duration-between-clock-times', ctx: 'travel', style: 'plain', cur: '', marks: 2,
  desc: 'start and end clock times (24-hour) in the same morning or afternoon, crossing at least one hour: how many minutes',
  gen: () => {
    for (;;) {
      const sh = pick([6, 7, 8, 9, 10, 13, 14, 15, 16, 17]), sm = ri(1, 59), dur = ri(20, 170), end = sh * 60 + sm + dur, eh = Math.floor(end / 60), em = end % 60;
      if (eh <= sh || (sh < 12 && eh >= 12)) continue;
      const st = wtClock(sh, sm), en = wtClock(eh, em), next = wtClock(sh + 1, 0), p1 = 60 - sm, whole = eh - sh - 1, nums = [p1], steps = [`${st} to ${next} = ${p1} ${p1 === 1 ? 'minute' : 'minutes'}`];
      if (whole > 0) { steps.push(`${next} to ${wtClock(eh, 0)} = ${whole} ${whole === 1 ? 'hour' : 'hours'} = ${whole * 60} minutes`); nums.push(whole * 60); }
      if (em > 0) { steps.push(`${wtClock(eh, 0)} to ${en} = ${em} ${em === 1 ? 'minute' : 'minutes'}`); nums.push(em); }
      if (nums.length > 1) steps.push(`${nums.join(' + ')} = ${dur} minutes`);
      const q = pick([`A bus leaves the station at ${st} and arrives in town at ${en}. Work out how long the journey takes, in minutes.`, `A train leaves at ${st} and arrives at ${en}. Work out how long the journey takes, in minutes.`, `A film starts at ${st} and ends at ${en}. Work out how long the film lasts, in minutes.`, `A coach leaves school at ${st} and gets to the museum at ${en}. Work out how long the journey takes, in minutes.`]);
      return W(q, dur, steps, {suf: ' minutes'});
    }
  }});
T({id: 'wn-3c', type: 3, needs: ['WM2', 'WS'], areas: ['NW'], skel: 'mult-then-sub-big', ctx: 'work', style: 'edexcel', cur: '', marks: 2,
  desc: 'a stock of 1000 to 5000 items, some boxes of 3-digit size sent out: how many are left (multiply, then subtract)',
  gen: () => {
    let b, n, total;
    do { b = ri(3, 9); n = ri(101, 999); } while (n % 10 === 0 || b * n > 4900);
    total = b * n;
    const s = ri(Math.max(1000, total + 60), 5000), place = pick(['A warehouse', 'A school shop', 'A factory', 'A supplier']), item = pick(['pencils', 'notebooks', 'tins of beans', 'books', 'bottles of water', 'floor tiles']);
    return W(`${place} has ${s} ${item}. It sends out ${b} boxes. Each box has ${n} ${item}. Work out how many ${item} are left. You must show all your working.`, s - total, [`${b} × ${n} = ${total}`, `${s} − ${total} = ${s - total}`]);
  }});
T({id: 'wn-3d', type: 3, needs: ['N21', 'N5'], areas: ['NM', 'X'], skel: 'laps-total-seconds', ctx: 'sport', style: 'plain', cur: '', marks: 2,
  desc: 'laps of equal time in seconds (not a multiple of 10), then a rest: total time in seconds',
  gen: () => {
    const name = nm(), n = ri(3, 6), r = ri(15, 45);
    let t; do t = ri(41, 89); while (t % 10 === 0);
    const [verb, one] = pick([['swims', 'length of a pool'], ['cycles', 'lap of a track'], ['runs', 'lap of a track']]), lap = one.split(' ')[0];
    return W(`${name} ${verb} ${n} ${lap}s. Each ${lap} takes ${t} seconds. Then ${name} rests for ${r} seconds. Work out how long this takes altogether, in seconds.`, n * t + r,
      [wtSplit(n, t), `${n * t} + ${r} = ${n * t + r}`], {suf: ' seconds'});
  }});
T({id: 'wn-4a', type: 4, needs: ['N5', 'X6'], areas: ['A', 'S', 'X'], skel: 'sum-and-difference', ctx: 'people', style: 'plain', cur: '', marks: 3,
  desc: 'random: total and difference given; find the smaller amount (halve) or the larger amount (halve, then add the difference back)',
  gen: () => {
    const [A, B] = two(), thing = pick(['cards', 'stamps', 'stickers', 'marbles', 'points']), T2 = ri(24, 98);
    let d; do d = ri(2, Math.min(30, T2 - 8)); while ((T2 - d) % 2);
    const small = (T2 - d) / 2, large = small + d, steps = [`${T2} − ${d} = ${T2 - d}`, `${T2 - d} ÷ 2 = ${small}`];
    if (Math.random() < .5) return W(`${A} and ${B} have ${T2} ${thing} altogether. ${A} has ${d} more ${thing} than ${B}. Work out how many ${thing} ${B} has.`, small, steps);
    steps.push(`${small} + ${d} = ${large}`);
    return W(`${A} and ${B} have ${T2} ${thing} altogether. ${A} has ${d} more ${thing} than ${B}. Work out how many ${thing} ${A} has.`, large, steps);
  }});
T({id: 'wn-4b', type: 4, needs: ['N5'], areas: ['A', 'S', 'X'], skel: 'bus-several-stops', ctx: 'travel', style: 'plain', cur: '', marks: 3, tw: ['extra'],
  desc: 'a bus through three stops (some off, some on); one number is not needed: the departure time, the bus number or the number of seats',
  gen: () => {
    for (;;) {
      const start = ri(20, 45), offs = [], ons = [], counts = [start];
      let c = start, ok = true;
      for (let i = 0; i < 3; i++) {
        const off = ri(3, Math.min(15, c - 5)), on = ri(2, 15);
        offs.push(off); ons.push(on); c = c - off + on; counts.push(c);
        if (c < 5) { ok = false; break; }
      }
      if (!ok) continue;
      const seats = Math.max(...counts) + ri(5, 15), extra = pick(['time', 'number', 'seats']);
      const open = extra === 'time' ? `A bus leaves the station at ${wtClock(ri(6, 18), ri(0, 11) * 5)} with ${start} passengers.`
        : extra === 'number' ? `The number ${ri(11, 99)} bus leaves the station with ${start} passengers.` : `A bus with ${seats} seats leaves the station with ${start} passengers.`;
      const ord = ['first', 'second', 'third'], stops = [0, 1, 2].map(i => `At the ${ord[i]} stop, ${offs[i]} ${i === 0 ? 'passengers ' : ''}get off and ${ons[i]} get on.`).join(' ');
      return W(`${open} ${stops} Work out how many passengers are on the bus after the third stop.`, c, [0, 1, 2].map(i => `${counts[i]} − ${offs[i]} + ${ons[i]} = ${counts[i + 1]}`));
    }
  }});
T({id: 'wn-4c', type: 4, needs: ['WD1', 'N5'], areas: ['NW', 'D', 'X'], skel: 'how-many-more-to-fill', ctx: 'food', style: 'aqa', cur: '', marks: 3, tw: ['interpret'],
  desc: 'items packed in boxes of 6, 8 or 12 with a last box not full: how many more are needed to fill it',
  gen: () => {
    for (;;) {
      const n = ri(100, 300), k = pick([6, 8, 12]), r = n % k;
      if (r === 0) continue;
      const [thing, pack] = pick([['cupcakes', 'baker'], ['eggs', 'farmer'], ['cookies', 'baker'], ['muffins', 'baker'], ['oranges', 'shopkeeper']]);
      return W(`A ${pack} has ${n} ${thing}. The ${pack} packs them into boxes of ${k}. The last box is not full. Work out how many more ${thing} are needed to fill the last box. You must show your working.`, k - r,
        [`${n} ÷ ${k} = ${Math.floor(n / k)} remainder ${r}`, `${k} − ${r} = ${k - r}`]);
    }
  }});
T({id: 'wn-4d', type: 4, needs: ['WM3', 'WS'], areas: ['NW', 'M'], skel: 'two-products-then-change', ctx: 'leisure', style: 'cam', cur: '$', marks: 3,
  desc: 'two kinds of ticket (2-digit numbers, 2-digit whole-dollar prices, no multiples of 10) paid for with $500, $1000 or $2000: the change',
  gen: () => {
    const m10 = () => { let x; do x = ri(11, 49); while (x % 10 === 0); return x; }, n10 = () => { let x; do x = ri(11, 60); while (x % 10 === 0); return x; };
    for (;;) {
      const pay = pick([500, 1000, 2000]), a = n10(), b = n10(), p = m10(), q = m10();
      if (p <= q) continue;
      const t1 = a * p, t2 = b * q, t = t1 + t2;
      if (t > pay - 20 || t < pay * .5) continue;
      const [k1, k2, ev] = pick([['adult', 'child', 'show'], ['standard', 'premium', 'concert'], ['adult', 'junior', 'football match']]);
      const an = w => /^[aeiou]/.test(w) ? 'An' : 'A', lo = k1 === 'standard';      // the standard ticket is the cheaper one
      const n1 = lo ? b : a, n2 = lo ? a : b, c1 = lo ? q : p, c2 = lo ? p : q;
      return W(`A club buys ${n1} ${k1} tickets and ${n2} ${k2} tickets for a ${ev}. ${an(k1)} ${k1} ticket costs ${mon(c1, '$')}. ${an(k2)} ${k2} ticket costs ${mon(c2, '$')}. The club pays with ${mon(pay, '$')}. Calculate how much change the club gets.`, pay - t,
        [`${n1} × ${c1} = ${n1 * c1}`, `${n2} × ${c2} = ${n2 * c2}`, `${n1 * c1} + ${n2 * c2} = ${t}`, `${pay} − ${t} = ${pay - t}`], {pre: '$'});
    }
  }});
T({id: 'wn-5a', type: 5, needs: ['M12', 'N5'], areas: ['M', 'S'], skel: 'multibuy-or-single-better', ctx: 'shopping', style: 'plain', cur: 'both', marks: 3,
  desc: 'single price or a "3 for" or "4 for" deal (cheaper about 3 times in 4, dearer otherwise); deals plus singles or all singles: which is cheaper, and by how much',
  gen: () => {
    const c = cur2(), name = nm(), p = ri(2, 12), d = pick([3, 4]), [one, pl] = pick([['pen', 'pens'], ['notebook', 'notebooks'], ['bottle of juice', 'bottles of juice'], ['T-shirt', 'T-shirts'], ['cake', 'cakes'], ['sandwich', 'sandwiches']]);
    let n; do n = ri(d + 1, 11); while (n % d === 0);
    const D = Math.random() < .75 ? d * p - ri(1, Math.min(p, 4)) : d * p + ri(1, 3), k = Math.floor(n / d), r = n % d, A = n * p, B = k * D + r * p, cheap = B < A ? 'Deals and singles' : 'All singly', hi = Math.max(A, B), lo = Math.min(A, B);
    const steps = [`All singly: ${n} × ${mon(p, c)} = ${mon(A, c)}`, `${k} ${k === 1 ? 'deal' : 'deals'}: ${k} × ${mon(D, c)} = ${mon(k * D, c)}`, `Singles left: ${r} × ${mon(p, c)} = ${mon(r * p, c)}`, `Deals and singles: ${mon(k * D, c)} + ${mon(r * p, c)} = ${mon(B, c)}`, `${mon(hi, c)} − ${mon(lo, c)} = ${mon(hi - lo, c)}`];
    return W(`A shop sells ${pl} for ${mon(p, c)} each, or ${d} for ${mon(D, c)}. ${name} needs ${n} ${pl}. ${name} can buy them all singly, or buy as many deals as possible and the rest singly. Which way is cheaper? Work out how much cheaper it is.`, hi - lo, steps,
      {pre: c, pick: {opts: ['All singly', 'Deals and singles'], a: cheap}});
  }});
T({id: 'wn-5b', type: 5, needs: ['KX', 'N5'], areas: ['M', 'D', 'X'], skel: 'think-of-a-number-reverse', ctx: 'school', style: 'plain', cur: '', marks: 2, tw: ['back'],
  desc: 'random: think of a number, multiply then add, multiply then subtract, or add then multiply; the result is given, find the number',
  gen: () => {
    const name = nm(), x = ri(2, 12), m = ri(2, 9), v = pick(['ma', 'ms', 'am']);
    if (v === 'ma') {
      const c = ri(2, 15), r = x * m + c;
      return W(`${name} thinks of a number. ${name} multiplies it by ${m}, then adds ${c}. The answer is ${r}. Work out the number ${name} thought of.`, x, [`${r} − ${c} = ${x * m}`, `${x * m} ÷ ${m} = ${x}`]);
    }
    if (v === 'ms') {
      const c = ri(2, Math.min(15, x * m - 1)), r = x * m - c;
      return W(`${name} thinks of a number. ${name} multiplies it by ${m}, then subtracts ${c}. The answer is ${r}. Work out the number ${name} thought of.`, x, [`${r} + ${c} = ${x * m}`, `${x * m} ÷ ${m} = ${x}`]);
    }
    const a = ri(2, 15), r = (x + a) * m;
    return W(`${name} thinks of a number. ${name} adds ${a}, then multiplies the answer by ${m}. The answer is ${r}. Work out the number ${name} thought of.`, x, [`${r} ÷ ${m} = ${x + a}`, `${x + a} − ${a} = ${x}`]);
  }});
T({id: 'wn-5c', type: 5, needs: ['N21', 'N5'], areas: ['NM', 'X'], skel: 'compare-two-race-times', ctx: 'sport', style: 'aqa', cur: '', marks: 3,
  desc: 'two runners, different numbers of laps (3 to 5) at different lap times in seconds: who takes less time altogether, and by how many seconds',
  gen: () => {
    const lt = () => { let t; do t = ri(45, 95); while (t % 10 === 0); return t; };
    for (;;) {
      const [A, B] = two(), n1 = ri(3, 5), n2 = ri(3, 5), t1 = lt(), t2 = lt();
      if (n1 === n2) continue;
      const T1 = n1 * t1, T2 = n2 * t2, diff = Math.abs(T1 - T2);
      if (diff < 4) continue;
      const quick = T1 < T2 ? A : B;
      return W(`${A} and ${B} are training on a track. ${A} runs ${n1} laps. Each of ${A}'s laps takes ${t1} seconds. ${B} runs ${n2} laps. Each of ${B}'s laps takes ${t2} seconds. Who takes less time altogether? Work out how many seconds less. You must show your working.`, diff,
        [`${A}: ${wtSplit(n1, t1)}`, `${B}: ${wtSplit(n2, t2)}`, `${Math.max(T1, T2)} − ${Math.min(T1, T2)} = ${diff}`], {suf: ' seconds', pick: {opts: shuf([A, B]), a: quick}});
    }
  }});
T({id: 'wn-5d', type: 5, needs: ['WS'], areas: ['NW', 'S'], skel: 'column-subtraction-find-the-error', ctx: 'school', style: 'aqa', cur: '', marks: 2, tw: ['error'],
  desc: 'a student subtracts 3-digit numbers in columns, taking the smaller digit from the larger instead of exchanging: say what went wrong, then find the correct answer',
  gen: () => {
    const name = nm(), dg = x => [x % 10, Math.floor(x / 10) % 10, Math.floor(x / 100)];
    for (;;) {
      const a = ri(301, 999), b = ri(101, a - 100), da = dg(a), db = dg(b);
      if (!(da[0] < db[0] || da[1] < db[1]) || da[2] <= db[2]) continue;
      const wrong = da.reduce((s, d, i) => s + Math.abs(d - db[i]) * Math.pow(10, i), 0), right = a - b;
      if (wrong === right) continue;
      const names = ['Units', 'Tens', 'Hundreds'], lines = [];
      let br = 0;
      for (let i = 0; i < 3; i++) { let top = da[i] - br; if (top < db[i]) { top += 10; br = 1; } else br = 0; lines.push(`${names[i]}: ${top} − ${db[i]} = ${top - db[i]}`); }
      const good = 'Took the smaller digit from the larger instead of exchanging';
      return W(`${name} works out ${a} − ${b}. ${name}'s answer is ${wrong}. ${name} is wrong. What did ${name} do wrong? Work out the correct answer. You must show your working.`, right,
        [`${name} took the smaller digit from the larger in each column`, ...lines, `${a} − ${b} = ${right}`],
        {pick: {opts: shuf([good, 'Added instead of subtracting', 'Lined up the columns wrongly']), a: good}});
    }
  }});
