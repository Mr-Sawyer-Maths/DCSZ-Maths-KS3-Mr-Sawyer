/* BATCH 4: Equivalence (FE, 7 slots) and the gaps in Percentages (FP, 5 slots). Guide: claude/word-problems-fill-guide.md
   Levels: F6 converting between fractions, decimals, percentages · F9 comparing across forms
           F7 50/10/25/1% of amounts · F8 building from 10% · F17 one amount as a percentage of another · F18 increase and decrease · F19 multipliers · F20 reverse.
   Use only the fractions the app teaches for conversion: halves, quarters, fifths, tenths, twentieths, twenty-fifths, fiftieths, and 1/8, 3/8. */
var eqFracs = (() => { const L = []; [2, 4, 5, 10, 20, 25, 50].forEach(d => { for (let n = 1; n < d; n++) if (gcd(n, d) === 1) L.push([n, d]); }); return L; })();      // simplest-form fractions with a whole-number percentage
var eqEighths = [[1, 8], [3, 8]];
var eqSteps = (n, d) => { const k = 100 / d; return [`100 ÷ ${d} = ${nstr(k)}`, `${n} × ${nstr(k)} = ${nstr(n * k)}`]; };      // fraction to percentage, the working
T({id: 'fe-1a', type: 1, needs: ['F6'], areas: ['FE'], skel: 'fraction-to-pct', ctx: 'school', style: 'plain', cur: '', marks: 1,
  desc: 'a fraction of a group does something: write the fraction as a percentage',
  gen: () => {
    const [n, d] = pick(eqFracs.concat(eqEighths)), ans = n * 100 / d;
    const [grp, v] = pick([['of the students in a class', 'walk to school'], ['of the pupils in a year group', 'play a musical instrument'], ['of the members of a club', 'are boys'], ['of the students in a school', 'have a pet'], ['of the students in a class', 'bring a packed lunch']]);
    return W(`${F(n, d)} ${grp} ${v}. Write this fraction as a percentage.`, ans, [...eqSteps(n, d), `${n}/${d} = ${nstr(ans)}%`], {suf: '%'});
  }});
T({id: 'fe-1b', type: 1, needs: ['F6'], areas: ['FE'], skel: 'decimal-to-pct', ctx: 'science', style: 'cam', cur: '', marks: 1,
  desc: 'a reading given as a decimal of the full amount: write it as a percentage',
  gen: () => {
    let m; const kind = pick(['one', 'two', 'low']);
    if (kind === 'one') m = ri(1, 9) * 10; else if (kind === 'low') m = ri(1, 9); else do { m = ri(11, 99); } while (m % 10 === 0);
    const x = nstr(m / 100);
    const q = pick([`A phone battery has ${x} of its full charge left.`, `A water tank is ${x} full.`, `A download is ${x} complete.`, `A fuel tank is ${x} full.`, `A jar is ${x} full of sweets.`, `A bath is ${x} full of water.`]);
    return W(`${q} Write this as a percentage.`, m, [`${x} × 100 = ${m}`, `${x} = ${m}%`], {suf: '%'});
  }});
T({id: 'fe-3a', type: 3, needs: ['F6'], areas: ['FE'], skel: 'fraction-to-pct-then-rest', ctx: 'leisure', style: 'plain', cur: '', marks: 2,
  desc: 'a fraction of seats or places is taken: percentage still free',
  gen: () => {
    const [n, d] = pick(eqFracs), p = n * 100 / d, ans = 100 - p;
    const q = pick([`${F(n, d)} of the seats in a theatre are taken. What percentage of the seats are still free?`, `${F(n, d)} of the places on a coach trip are booked. What percentage of the places are still free?`,
      `${F(n, d)} of the spaces in a car park are in use. What percentage of the spaces are still free?`, `${F(n, d)} of the tickets for a concert have been sold. What percentage of the tickets are still available?`]);
    return W(q, ans, [...eqSteps(n, d), `${n}/${d} = ${p}%`, `100 − ${p} = ${ans}`], {suf: '%'});
  }});
T({id: 'fe-3b', type: 3, needs: ['F6'], areas: ['FE'], skel: 'fraction-plus-pct-total', ctx: 'school', style: 'cam', cur: '', marks: 2,
  desc: 'one part as a fraction and another as a percentage: percentage for the two together',
  gen: () => {
    for (;;) {
      const [n, d] = pick(eqFracs), f = n * 100 / d, p = ri(1, 14) * 5, tot = f + p;
      if (tot >= 100) continue;
      const [stem, o1, o2, tail] = pick([['travel to school by', 'bus', 'car', ''], ['travel to school by', 'bike', 'foot', ''], ['play', 'football', 'netball', ' at lunch'], ['have', 'a packed lunch', 'a school lunch', '']]);
      const fracFirst = Math.random() < .5, a = fracFirst ? F(n, d) : p + '%', b = fracFirst ? p + '%' : F(n, d);
      return W(`In a survey, ${a} of the students ${stem} ${o1}${tail} and ${b} of the students ${stem} ${o2}${tail}. Work out the percentage of the students who ${stem} ${o1} or ${o2}${tail}.`, tot,
        [...eqSteps(n, d), `${n}/${d} = ${f}%`, `${f} + ${p} = ${tot}`], {suf: '%'});
    }
  }});
T({id: 'fe-5a', type: 5, needs: ['F17', 'F9'], areas: ['FE', 'FP'], skel: 'compare-score-out-of-with-pct', ctx: 'school', style: 'aqa', cur: '', marks: 3,
  desc: 'a score out of a total against a percentage score: who is higher and by how many points',
  gen: () => {
    const [a, b] = two(), d = pick([20, 25, 40, 50]);
    const n = d === 20 ? ri(8, 19) : d === 25 ? ri(10, 24) : d === 40 ? 2 * ri(8, 19) : ri(20, 48), p1 = n * 100 / d;
    let p2; do { p2 = ri(40, 98); } while (p2 === p1);
    const [s1, s2] = pick([['maths', 'science'], ['English', 'history'], ['French', 'geography'], ['science', 'maths']]), hi = p1 > p2 ? a : b, diff = Math.abs(p1 - p2);
    return W(`${a} scored ${n} out of ${d} in a ${s1} test. ${b} scored ${p2}% in a ${s2} test. Who got the higher percentage? By how many percentage points?`, diff,
      [`${n}/${d} = ${p1}%`, `${a} got ${p1}% and ${b} got ${p2}%`, `${hi} got the higher percentage`, `${Math.max(p1, p2)} − ${Math.min(p1, p2)} = ${diff}`], {suf: '%', pick: {opts: [a, b], a: hi}});
  }});
T({id: 'fe-5b', type: 5, needs: ['F9', 'F8'], areas: ['FE', 'FP'], skel: 'compare-fraction-off-with-pct-off', ctx: 'shopping', style: 'plain', cur: 'both', marks: 3,
  desc: 'one shop takes a fraction off, another a percentage off the same price: which takes more and by how much',
  gen: () => {
    for (;;) {
      const c = cur2(), price = 20 * ri(2, 15), [n, d] = pick([[1, 4], [1, 5], [3, 10], [2, 5]]), p = ri(2, 10) * 5, item = pick(['jacket', 'pair of trainers', 'bike', 'tablet', 'coat', 'games console']);
      const offF = price * n / d, offP = price * p / 100;
      if (offF === offP) continue;
      const fracIsA = Math.random() < .5, offA = fracIsA ? offF : offP, offB = fracIsA ? offP : offF, big = offA > offB ? 'Shop A' : 'Shop B', diff = Math.abs(offA - offB);
      const tA = fracIsA ? `${F(n, d)} off` : `${p}% off`, tB = fracIsA ? `${p}% off` : `${F(n, d)} off`;
      const sA = fracIsA ? `${n}/${d} of ${mon(price, c)} = ${mon(offA, c)}` : `${p}% of ${mon(price, c)} = ${mon(offA, c)}`, sB = fracIsA ? `${p}% of ${mon(price, c)} = ${mon(offB, c)}` : `${n}/${d} of ${mon(price, c)} = ${mon(offB, c)}`;
      return W(`A ${item} costs ${mon(price, c)} in two shops. Shop A takes ${tA} the price. Shop B takes ${tB} the price. Which shop takes more off? How much more money does it take off?`, diff,
        [`Shop A: ${sA}`, `Shop B: ${sB}`, `${big} takes more off`, `${mon(Math.max(offA, offB), c)} − ${mon(Math.min(offA, offB), c)} = ${mon(diff, c)}`], {pre: c, pick: {opts: ['Shop A', 'Shop B'], a: big}});
    }
  }});
T({id: 'fe-5c', type: 5, needs: ['F6', 'F9'], areas: ['FE'], skel: 'largest-of-three-forms', ctx: 'sport', style: 'cam', cur: '', marks: 2,
  desc: 'three players score from a fraction, a decimal and a percentage of their shots: who has the largest share',
  gen: () => {
    for (;;) {
      const [n, d] = pick(eqFracs), vf = n * 100 / d, vd = ri(30, 80), vp = ri(30, 80);
      if (vf < 30 || vf > 80 || new Set([vf, vd, vp]).size < 3) continue;
      const names = shuf(NAMES).slice(0, 3), forms = shuf([{t: F(n, d), v: vf, s: `${n}/${d} = ${vf}%`}, {t: nstr(vd / 100), v: vd, s: `${nstr(vd / 100)} = ${vd}%`}, {t: vp + '%', v: vp, s: `${vp}%`}]);
      const mx = Math.max(vf, vd, vp), hi = names[forms.findIndex(f => f.v === mx)], game = pick(['basketball', 'netball', 'hockey']);
      return W(`In a ${game} match, ${names[0]} scored with ${forms[0].t} of the shots taken. ${names[1]} scored with ${forms[1].t} of the shots taken. ${names[2]} scored with ${forms[2].t} of the shots taken. Who scored with the largest share of shots? Write that share as a percentage.`, mx,
        [...names.map((nme, i) => `${nme}: ${forms[i].s}`), `${hi} has the largest share: ${mx}%`], {suf: '%', pick: {opts: names, a: hi}});
    }
  }});
T({id: 'fp-2a', type: 2, needs: ['F8', 'F17'], areas: ['FP'], skel: 'pct-of-or-as-pct', ctx: 'school', style: 'plain', cur: '', marks: 1,
  desc: 'a percentage of a group is a number, or a number in a group is a percentage (random)',
  gen: () => {
    for (;;) {
      const N = pick([20, 40, 50, 60, 80, 120, 200]), p = pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 80]), k = N * p / 100;
      if (!Number.isInteger(k) || k < 1) continue;
      const [intro, noun, pred] = pick([[`A club has ${N} members.`, 'members', 'are in Year 8'], [`${N} students were asked about their favourite lesson.`, 'students', 'chose maths'],
        [`A year group has ${N} students.`, 'students', 'walk to school'], [`${N} people took part in a survey.`, 'people', 'drink tea']]);
      if (Math.random() < .5) return W(`${intro} ${p}% of the ${noun} ${pred}. How many is that?`, k, [`${p}% of ${N} = ${p} ÷ 100 × ${N} = ${k}`]);
      return W(`${intro} ${k} of the ${noun} ${pred}. What percentage is that?`, p, [`${k} ÷ ${N} × 100 = ${p}`, `${p}%`], {suf: '%'});
    }
  }});
T({id: 'fp-2b', type: 2, needs: ['F18'], areas: ['FP'], skel: 'pct-change-direction-from-story', ctx: 'shopping', style: 'plain', cur: 'both', marks: 2,
  desc: 'a price changes by a percentage and the story says whether it goes up or down',
  gen: () => {
    const c = cur2(), P = 20 * ri(2, 15), name = nm(), s = mon(P, c), item = pick(['coat', 'bag', 'lamp', 'chair', 'game']);
    const [q, p, up] = pick([[`A parcel costs ${s} to buy. A delivery charge of 10% is added. Work out the price paid.`, 10, true],
      [`A shop gives club members 15% off. ${name} is a member and buys a ${item} for ${s}. Work out the price ${name} pays.`, 15, false],
      [`A meal costs ${s}. A service charge of 20% is added to the bill. Work out the price paid.`, 20, true],
      [`A damaged ${item} normally costs ${s}. It is sold for 25% less. Work out the price paid.`, 25, false]]);
    const chg = P * p / 100, ans = up ? P + chg : P - chg;
    return W(q, ans, [`${p}% of ${s} = ${mon(chg, c)}`, `${s} ${up ? '+' : '−'} ${mon(chg, c)} = ${mon(ans, c)}`], {pre: c});
  }});
T({id: 'fp-2c', type: 2, needs: ['F17'], areas: ['FP'], skel: 'part-as-pct-of-combined-total', ctx: 'sport', style: 'cam', cur: '', marks: 2,
  desc: 'two groups given separately: one group as a percentage of the combined total',
  gen: () => {
    for (;;) {
      const T0 = pick([20, 25, 40, 50]), x = ri(3, T0 - 3), y = T0 - x;
      if (T0 === 40 && x % 2) continue;
      const askX = Math.random() < .5, ask = askX ? x : y, ans = ask * 100 / T0;
      const [q1, q2] = pick([[`A club has ${x} boys and ${y} girls.`, [`What percentage of the members are boys?`, `What percentage of the members are girls?`]],
        [`A team won ${x} matches and lost ${y} matches.`, [`What percentage of the matches did the team win?`, `What percentage of the matches did the team lose?`]],
        [`A player took shots at goal. ${x} shots went in and ${y} shots missed.`, [`What percentage of the shots went in?`, `What percentage of the shots missed?`]]]);
      return W(`${q1} ${q2[askX ? 0 : 1]}`, ans, [`${x} + ${y} = ${T0}`, `${ask}/${T0} = ${ans}%`], {suf: '%'});
    }
  }});
T({id: 'fp-3a', type: 3, needs: ['F8'], areas: ['FP'], skel: 'pct-of-then-rest', ctx: 'leisure', style: 'edexcel', cur: '', marks: 2,
  desc: 'a percentage of the tickets or places are one kind: how many are not',
  gen: () => {
    const N = 20 * ri(4, 20), p = pick([10, 15, 20, 25, 30, 35, 40, 45, 60, 65, 70, 75, 80]), k = N * p / 100, ans = N - k;
    const q = pick([`${N} tickets were sold for a concert. ${p}% of the tickets were sold online. Work out the number of tickets that were not sold online.`,
      `A theatre has ${N} seats. ${p}% of the seats are in the balcony. Work out the number of seats that are not in the balcony.`,
      `A sports camp has ${N} places. ${p}% of the places are booked by girls. Work out the number of places that are not booked by girls.`,
      `A festival has ${N} tickets for sale. ${p}% of the tickets are for children. Work out the number of tickets that are not for children.`]);
    return W(q, ans, [`${p}% of ${N} = ${p} ÷ 100 × ${N} = ${k}`, `${N} − ${k} = ${ans}`]);
  }});
T({id: 'fp-5a', type: 5, needs: ['F18'], areas: ['FP'], skel: 'compare-two-pct-increases', ctx: 'work', style: 'plain', cur: 'both', marks: 3,
  desc: 'two jobs each get a different percentage pay rise: which pays more now and by how much a week',
  gen: () => {
    const c = cur2();
    for (;;) {
      const P1 = 20 * ri(10, 30), P2 = 20 * ri(10, 30), p1 = pick([5, 10, 20, 25]), p2 = pick([5, 10, 20, 25]);
      if (P1 === P2 || p1 === p2) continue;
      const r1 = P1 * p1 / 100, r2 = P2 * p2 / 100, n1 = P1 + r1, n2 = P2 + r2;
      if (n1 === n2) continue;
      if (Math.random() < .6 && (P1 < P2) === (n1 < n2)) continue;      // most of the time the job that paid less first ends up paying more
      const big = n1 > n2 ? 'Job A' : 'Job B', diff = Math.abs(n1 - n2);
      return W(`Job A pays ${mon(P1, c)} a week. Job B pays ${mon(P2, c)} a week. Job A's pay goes up by ${p1}%. Job B's pay goes up by ${p2}%. Which job pays more after the rise? How much more does it pay each week?`, diff,
        [`Job A: ${p1}% of ${mon(P1, c)} = ${mon(r1, c)}, so ${mon(P1, c)} + ${mon(r1, c)} = ${mon(n1, c)}`, `Job B: ${p2}% of ${mon(P2, c)} = ${mon(r2, c)}, so ${mon(P2, c)} + ${mon(r2, c)} = ${mon(n2, c)}`,
          `${big} pays more`, `${mon(Math.max(n1, n2), c)} − ${mon(Math.min(n1, n2), c)} = ${mon(diff, c)}`], {pre: c, pick: {opts: ['Job A', 'Job B'], a: big}});
    }
  }});
