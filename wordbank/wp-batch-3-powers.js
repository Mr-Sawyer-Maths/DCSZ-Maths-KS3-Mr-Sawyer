/* BATCH 3: Powers, roots, factors and primes (NX). 12 slots. Guide: claude/word-problems-fill-guide.md
   Levels: N18 squares, cubes, roots · N19 HCF and LCM · NX5 prime factors · NX1 powers · NX2 index laws · NX3 zero and negative powers · NX4 standard form.
   Powers are written with sup(): `10${sup(6)}` prints 10⁶. Areas are counted in squares, so no cm² or m² unit is needed. */
var nxCom = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');      // 340000 → 340,000 (the check ignores commas in the steps)
var nxFactors = n => { const f = []; for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i); return f; };
var nxMults = (k, upTo) => { const m = []; for (let i = k; i <= upTo; i += k) m.push(i); return m; };
var nxLcm = (a, b) => a / gcd(a, b) * b;
var nxMant = () => { let m; do { m = ri(11, 99); } while (m % 10 === 0); return m; };      // a two-digit mantissa such as 3.4 (as 34), never a whole number
T({id: 'nx-1a', type: 1, needs: ['N18'], areas: ['NX'], skel: 'square-area-to-side', ctx: 'building', style: 'plain', cur: '', marks: 1,
  desc: 'a square covered by a square number of 1 m slabs: find the side',
  gen: () => {
    const n = ri(4, 15), N = n * n, name = nm();
    const [place, items, one] = pick([['patio', 'slabs', 'slab'], ['lawn', 'squares of turf', 'square of turf'], ['floor', 'tiles', 'tile'], ['playground', 'paving slabs', 'paving slab'], ['yard', 'paving stones', 'paving stone']]);
    return W(`${name} covers a square ${place} with ${N} ${items}. Each ${one} measures 1 m by 1 m. Work out the length of one side of the ${place}.`, n,
      [`${n} × ${n} = ${N}`, `The square root of ${N} is ${n}`, `One side is ${n} m`], {suf: ' m'});
  }});
T({id: 'nx-1b', type: 1, needs: ['N18'], areas: ['NX'], skel: 'cube-count-small-cubes', ctx: 'building', style: 'cam', cur: '', marks: 1,
  desc: 'a large cube built from small cubes: count them from the edge length',
  gen: () => {
    const n = pick([2, 3, 4, 5, 10]), name = nm(), ans = n * n * n, obj = pick(['toy bricks', 'sugar cubes', 'wooden blocks', 'foam cubes', 'dice']);
    return W(`${name} builds a large cube out of ${obj}. There are ${n} ${obj} along each edge of the large cube. Work out the number of ${obj} used.`, ans,
      [`${n} × ${n} × ${n}`, `${n * n} × ${n} = ${ans}`]);
  }});
T({id: 'nx-1c', type: 1, needs: ['NX4'], areas: ['NX'], skel: 'standard-form-to-ordinary', ctx: 'science', style: 'cam', cur: '', marks: 1,
  desc: 'write a standard form number as an ordinary number',
  gen: () => {
    const m = nxMant(), x = nstr(m / 10);
    const [lo, hi, f] = pick([[3, 6, p => [`A spacecraft travels ${x} × 10${sup(p)} km. Write this distance as an ordinary number.`, ' km']],
      [5, 6, p => [`A planet is ${x} × 10${sup(p)} km from its star. Write this distance as an ordinary number.`, ' km']],
      [5, 6, p => [`A city has a population of ${x} × 10${sup(p)}. Write this number as an ordinary number.`, '']],
      [3, 6, p => [`A scientist counts ${x} × 10${sup(p)} cells in a sample. Write this number as an ordinary number.`, '']]]);
    const p = ri(lo, hi), [q, suf] = f(p), ans = m * 10 ** (p - 1);
    return W(q, ans, [`10${sup(p)} = ${nxCom(10 ** p)}`, `${x} × ${nxCom(10 ** p)} = ${nxCom(ans)}`], suf ? {suf} : {});
  }});
T({id: 'nx-2a', type: 2, needs: ['N19'], areas: ['NX'], skel: 'lcm-events-coincide', ctx: 'travel', style: 'edexcel', cur: '', marks: 2,
  desc: 'two things repeat at different intervals: when do they next happen together',
  gen: () => {
    for (;;) {
      const a = ri(4, 20), b = ri(4, 20);
      if (a === b) continue;
      const lo = Math.min(a, b), hi = Math.max(a, b), L = nxLcm(a, b);
      if (L >= 100 || (hi % lo === 0 && Math.random() > .1)) continue;
      const [p, q, r] = pick([['Two buses leave a bus station at the same time. One bus leaves every ' + a + ' minutes. The other bus leaves every ' + b + ' minutes.', 'they next leave', 'at the same time'],
        ['Two trains leave a station at the same time. One train leaves every ' + a + ' minutes. The other train leaves every ' + b + ' minutes.', 'they next leave', 'at the same time'],
        ['Two church bells ring together. One bell rings every ' + a + ' minutes. The other bell rings every ' + b + ' minutes.', 'they next ring', 'together'],
        ['Two lights flash together. One light flashes every ' + a + ' minutes. The other light flashes every ' + b + ' minutes.', 'they next flash', 'together']]);
      return W(`${p} After how many minutes will ${q} ${r}?`, L,
        [`Multiples of ${hi}: ${nxMults(hi, L).join(', ')}`, `Multiples of ${lo}: ${nxMults(lo, L).join(', ')}`, `The first number in both lists is ${L}`], {suf: ' minutes'});
    }
  }});
T({id: 'nx-2b', type: 2, needs: ['N19'], areas: ['NX'], skel: 'hcf-largest-equal-groups', ctx: 'food', style: 'plain', cur: '', marks: 2,
  desc: 'two amounts shared into identical bags with nothing left over: greatest number of bags',
  gen: () => {
    for (;;) {
      const h = ri(2, 12), p = ri(2, 9), q = ri(2, 9);
      if (p === q || gcd(p, q) !== 1 || h * Math.max(p, q) > 100) continue;
      const x = h * p, y = h * q, name = nm(), [i1, i2] = pick([['apples', 'oranges'], ['red pens', 'blue pens'], ['biscuits', 'cakes'], ['pencils', 'rubbers'], ['sandwiches', 'pies'], ['carrots', 'potatoes']]);
      return W(`${name} has ${x} ${i1} and ${y} ${i2}. ${name} shares them into bags. Every bag has the same number of ${i1} and the same number of ${i2}. Nothing is left over. Work out the greatest number of bags that can be made.`, h,
        [`Factors of ${x}: ${nxFactors(x).join(', ')}`, `Factors of ${y}: ${nxFactors(y).join(', ')}`, `The biggest number in both lists is ${h}`]);
    }
  }});
T({id: 'nx-2c', type: 2, needs: ['N18'], areas: ['NX'], skel: 'square-or-root-choose', ctx: 'building', style: 'plain', cur: '', marks: 1,
  desc: 'square floor of square tiles: given one side find the total, or given the total find one side',
  gen: () => {
    const n = ri(4, 15), N = n * n, name = nm();
    if (Math.random() < .5) return W(`${name} covers a square floor with square tiles. There are ${n} tiles along each side of the floor. No tiles are cut. Work out how many tiles ${name} uses.`, N, [`${n} × ${n} = ${N}`]);
    return W(`${name} covers a square floor with ${N} square tiles. No tiles are cut. Work out how many tiles there are along each side of the floor.`, n, [`${n} × ${n} = ${N}`, `The square root of ${N} is ${n}`]);
  }});
T({id: 'nx-3a', type: 3, needs: ['N18', 'WM1'], areas: ['NX', 'NW'], skel: 'square-then-multiply-cost', ctx: 'building', style: 'plain', cur: 'both', marks: 2,
  desc: 'area of a square from its side, then the cost at a price per square metre',
  gen: () => {
    const c = cur2(), s = ri(4, 12), p = ri(2, 9), A = s * s, ans = A * p, name = nm();
    const [place, mat, verb] = pick([['lawn', 'Turf', 'cover the lawn with turf'], ['bedroom floor', 'Carpet', 'carpet the bedroom floor'], ['patio', 'Paving', 'pave the patio'], ['hall floor', 'Wooden flooring', 'cover the hall floor with wooden flooring']]);
    return W(`${name} wants to ${verb}. The ${place} is a square with sides of ${s} m. ${mat} costs ${mon(p, c)} for each square metre. Work out the total cost.`, ans,
      [`${s} × ${s} = ${A} square metres`, `${A} × ${mon(p, c)} = ${mon(ans, c)}`], {pre: c});
  }});
T({id: 'nx-3b', type: 3, needs: ['NX4', 'N11'], areas: ['NX', 'NP'], skel: 'standard-form-then-scale', ctx: 'work', style: 'cam', cur: '', marks: 2,
  desc: 'standard form daily output scaled up to 10 or 100 days, answer as an ordinary number',
  gen: () => {
    const m = nxMant(), x = nstr(m / 10), k = ri(3, 5), days = pick([10, 100]), daily = m * 10 ** (k - 1), ans = daily * days, item = pick(['bottles', 'biscuits', 'screws', 'bricks', 'pencils', 'sweets']);
    return W(`A factory makes ${x} × 10${sup(k)} ${item} each day. Work out how many ${item} the factory makes in ${days} days. Give your answer as an ordinary number.`, ans,
      [`${x} × 10${sup(k)} = ${nxCom(daily)}`, `${nxCom(daily)} × ${days} = ${nxCom(ans)}`]);
  }});
T({id: 'nx-4a', type: 4, needs: ['N19'], areas: ['NX'], skel: 'lcm-equal-numbers-of-packs', ctx: 'food', style: 'edexcel', cur: '', marks: 3,
  desc: 'items sold in different pack sizes: packs needed to get exactly equal numbers',
  gen: () => {
    for (;;) {
      const a = ri(3, 12), b = ri(3, 12);
      if (a === b || a % b === 0 || b % a === 0) continue;
      const L = nxLcm(a, b);
      if (L > 60) continue;
      const name = nm(), [i1, i2] = pick([['bread rolls', 'burgers'], ['hot dog rolls', 'sausages'], ['paper plates', 'paper cups'], ['party hats', 'balloons'], ['pens', 'notebooks'], ['sandwiches', 'cakes']]);
      const first = Math.random() < .5, ask = first ? i1 : i2, size = first ? a : b;
      return W(`${i1[0].toUpperCase() + i1.slice(1)} are sold in packs of ${a}. ${i2[0].toUpperCase() + i2.slice(1)} are sold in packs of ${b}. ${name} wants exactly the same number of ${i1} and ${i2}. Work out the smallest number of packs of ${ask} that ${name} needs to buy.`, L / size,
        [`Multiples of ${a}: ${nxMults(a, L).join(', ')}`, `Multiples of ${b}: ${nxMults(b, L).join(', ')}`, `The smallest number in both lists is ${L}`, `${L} ÷ ${size} = ${L / size}`]);
    }
  }});
T({id: 'nx-4b', type: 4, needs: ['N18', 'N5'], areas: ['NX', 'X'], skel: 'difference-of-two-squares-area', ctx: 'school', style: 'plain', cur: '', marks: 3,
  desc: 'a small square stuck on a larger square: area still showing',
  gen: () => {
    for (;;) {
      const a = ri(4, 13), b = ri(a + 2, 15);
      if ((b - a) % 2) continue;
      const name = nm(), [small, big] = pick([['photo', 'card'], ['picture', 'board'], ['sticker', 'sheet of paper'], ['mirror', 'wooden panel']]);
      return W(`${name} sticks a square ${small} onto the middle of a square ${big}. The ${small} has sides of ${a} cm. The ${big} has sides of ${b} cm. How many square centimetres of the ${big} can still be seen?`, b * b - a * a,
        [`${b} × ${b} = ${b * b}`, `${a} × ${a} = ${a * a}`, `${b * b} − ${a * a} = ${b * b - a * a}`]);
    }
  }});
T({id: 'nx-5a', type: 5, needs: ['N18', 'N5'], areas: ['NX', 'X'], skel: 'largest-square-remainder', ctx: 'building', style: 'aqa', cur: '', marks: 2,
  desc: 'a non-square number of tiles makes the biggest possible square: how many are left over',
  gen: () => {
    let T0; do { T0 = ri(20, 220); } while (Number.isInteger(Math.sqrt(T0)));
    const k = Math.floor(Math.sqrt(T0)), left = T0 - k * k, name = nm(), obj = pick(['square tiles', 'square paving slabs', 'square stickers', 'square floor mats']);
    return W(`${name} has ${T0} ${obj}. ${name} makes the largest square that is possible with them. Work out how many ${obj} are left over.`, left,
      [`${k} × ${k} = ${k * k}, which is less than ${T0}`, `${k + 1} × ${k + 1} = ${(k + 1) ** 2}, which is more than ${T0}`, `${T0} − ${k * k} = ${left}`]);
  }});
T({id: 'nx-5b', type: 5, needs: ['NX1', 'N5'], areas: ['NX', 'X'], skel: 'powers-compare-which-larger', ctx: 'money', style: 'plain', cur: 'both', marks: 3,
  desc: 'two prizes written as powers with base and index swapped: which is worth more and by how much',
  gen: () => {
    const [p, q] = pick([[2, 5], [2, 6], [2, 7], [3, 4], [3, 5], [2, 3], [4, 5]]), c = cur2(), name = nm(), swap = Math.random() < .5;
    const a = swap ? [q, p] : [p, q], b = swap ? [p, q] : [q, p];      // prize A is base^index, prize B has them swapped
    const va = a[0] ** a[1], vb = b[0] ** b[1], big = va > vb ? 'Prize A' : 'Prize B', diff = Math.abs(va - vb);
    const ex = ([base, i], v) => `${base}${sup(i)} = ${Array(i).fill(base).join(' × ')} = ${v}`;
    return W(`${name} can choose one of two prizes. Prize A is ${c}${a[0]}${sup(a[1])}. Prize B is ${c}${b[0]}${sup(b[1])}. Which prize is worth more? How much more is it worth?`, diff,
      [ex(a, va), ex(b, vb), `${big} is worth more`, `${c}${Math.max(va, vb)} − ${c}${Math.min(va, vb)} = ${c}${diff}`], {pre: c, pick: {opts: ['Prize A', 'Prize B'], a: big}});
  }});
