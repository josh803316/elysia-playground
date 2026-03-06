import {
  I as ee,
  g as K,
  au as ae,
  av as Q,
  aw as z,
  U as P,
  ax as re,
  ay as ne,
  az as X,
  V as fe,
  aA as W,
  at as le,
  aB as ie,
  aC as se,
  aD as ue,
  O as R,
  aE as p,
  aF as Z,
  aG as $,
  aH as D,
  aI as oe,
  aJ as ce,
  aK as ve,
  S as te,
  C as F,
  aL as j,
  aM as de,
  aN as G,
  aO as he,
  z as J,
  aP as H,
  aQ as _e,
  X as ge,
  P as be,
  y as Ee,
  aR as ke,
  D as q,
  aS as Se,
} from './iframe-3AYY9gF4.js';
function pe(e, r, a) {
  for (var i = [], s = r.length, l, u = r.length, v = 0; v < s; v++) {
    let g = r[v];
    $(
      g,
      () => {
        if (l) {
          if ((l.pending.delete(g), l.done.add(g), l.pending.size === 0)) {
            var d = e.outrogroups;
            (U(X(l.done)), d.delete(l), d.size === 0 && (e.outrogroups = null));
          }
        } else u -= 1;
      },
      !1,
    );
  }
  if (u === 0) {
    var n = i.length === 0 && a !== null;
    if (n) {
      var o = a,
        c = o.parentNode;
      (ve(c), c.append(o), e.items.clear());
    }
    U(r, !n);
  } else ((l = {pending: new Set(r), done: new Set()}), (e.outrogroups ??= new Set()).add(l));
}
function U(e, r = !0) {
  for (var a = 0; a < e.length; a++) te(e[a], r);
}
var Y;
function xe(e, r, a, i, s, l = null) {
  var u = e,
    v = new Map(),
    n = (r & j) !== 0;
  if (n) {
    var o = e;
    u = o.appendChild(R());
  }
  var c = null,
    g = ae(() => {
      var t = a();
      return fe(t) ? t : t == null ? [] : X(t);
    }),
    d,
    h = !0;
  function A() {
    ((f.fallback = c),
      we(f, d, u, r, i),
      c !== null &&
        (d.length === 0
          ? (c.f & p) === 0
            ? Z(c)
            : ((c.f ^= p), N(c, null, u))
          : $(c, () => {
              c = null;
            })));
  }
  var x = ee(() => {
      d = K(g);
      for (var t = d.length, I = new Set(), k = z, b = ne(), S = 0; S < t; S += 1) {
        var m = d[S],
          E = i(m, S),
          _ = h ? null : v.get(E);
        (_
          ? (_.v && Q(_.v, m), _.i && Q(_.i, S), b && k.unskip_effect(_.e))
          : ((_ = Ce(v, h ? u : (Y ??= R()), m, E, S, s, r, a)), h || (_.e.f |= p), v.set(E, _)),
          I.add(E));
      }
      if (
        (t === 0 && l && !c && (h ? (c = P(() => l(u))) : ((c = P(() => l((Y ??= R())))), (c.f |= p))),
        t > I.size && re(),
        !h)
      )
        if (b) {
          for (const [O, w] of v) I.has(O) || k.skip_effect(w.e);
          (k.oncommit(A), k.ondiscard(() => {}));
        } else A();
      K(g);
    }),
    f = {effect: x, items: v, outrogroups: null, fallback: c};
  h = !1;
}
function M(e) {
  for (; e !== null && (e.f & ce) === 0; ) e = e.next;
  return e;
}
function we(e, r, a, i, s) {
  var l = (i & de) !== 0,
    u = r.length,
    v = e.items,
    n = M(e.effect.first),
    o,
    c = null,
    g,
    d = [],
    h = [],
    A,
    x,
    f,
    t;
  if (l)
    for (t = 0; t < u; t += 1)
      ((A = r[t]),
        (x = s(A, t)),
        (f = v.get(x).e),
        (f.f & p) === 0 && (f.nodes?.a?.measure(), (g ??= new Set()).add(f)));
  for (t = 0; t < u; t += 1) {
    if (((A = r[t]), (x = s(A, t)), (f = v.get(x).e), e.outrogroups !== null))
      for (const w of e.outrogroups) (w.pending.delete(f), w.done.delete(f));
    if ((f.f & p) !== 0)
      if (((f.f ^= p), f === n)) N(f, null, a);
      else {
        var I = c ? c.next : n;
        (f === e.effect.last && (e.effect.last = f.prev),
          f.prev && (f.prev.next = f.next),
          f.next && (f.next.prev = f.prev),
          C(e, c, f),
          C(e, f, I),
          N(f, I, a),
          (c = f),
          (d = []),
          (h = []),
          (n = M(c.next)));
        continue;
      }
    if (((f.f & D) !== 0 && (Z(f), l && (f.nodes?.a?.unfix(), (g ??= new Set()).delete(f))), f !== n)) {
      if (o !== void 0 && o.has(f)) {
        if (d.length < h.length) {
          var k = h[0],
            b;
          c = k.prev;
          var S = d[0],
            m = d[d.length - 1];
          for (b = 0; b < d.length; b += 1) N(d[b], k, a);
          for (b = 0; b < h.length; b += 1) o.delete(h[b]);
          (C(e, S.prev, m.next), C(e, c, S), C(e, m, k), (n = k), (c = m), (t -= 1), (d = []), (h = []));
        } else
          (o.delete(f),
            N(f, n, a),
            C(e, f.prev, f.next),
            C(e, f, c === null ? e.effect.first : c.next),
            C(e, c, f),
            (c = f));
        continue;
      }
      for (d = [], h = []; n !== null && n !== f; ) ((o ??= new Set()).add(n), h.push(n), (n = M(n.next)));
      if (n === null) continue;
    }
    ((f.f & p) === 0 && d.push(f), (c = f), (n = M(f.next)));
  }
  if (e.outrogroups !== null) {
    for (const w of e.outrogroups) w.pending.size === 0 && (U(X(w.done)), e.outrogroups?.delete(w));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (n !== null || o !== void 0) {
    var E = [];
    if (o !== void 0) for (f of o) (f.f & D) === 0 && E.push(f);
    for (; n !== null; ) ((n.f & D) === 0 && n !== e.fallback && E.push(n), (n = M(n.next)));
    var _ = E.length;
    if (_ > 0) {
      var O = (i & j) !== 0 && u === 0 ? a : null;
      if (l) {
        for (t = 0; t < _; t += 1) E[t].nodes?.a?.measure();
        for (t = 0; t < _; t += 1) E[t].nodes?.a?.fix();
      }
      pe(e, E, O);
    }
  }
  l &&
    F(() => {
      if (g !== void 0) for (f of g) f.nodes?.a?.apply();
    });
}
function Ce(e, r, a, i, s, l, u, v) {
  var n = (u & se) !== 0 ? ((u & ue) === 0 ? le(a, !1, !1) : W(a)) : null,
    o = (u & ie) !== 0 ? W(s) : null;
  return {
    v: n,
    i: o,
    e: P(
      () => (
        l(r, n ?? a, o ?? s, v),
        () => {
          e.delete(i);
        }
      ),
    ),
  };
}
function N(e, r, a) {
  if (e.nodes)
    for (var i = e.nodes.start, s = e.nodes.end, l = r && (r.f & p) === 0 ? r.nodes.start : a; i !== null; ) {
      var u = oe(i);
      if ((l.before(i), i === s)) return;
      i = u;
    }
}
function C(e, r, a) {
  (r === null ? (e.effect.first = a) : (r.next = a), a === null ? (e.effect.last = r) : (a.prev = r));
}
function Ie(e, r, a = r) {
  var i = new WeakSet();
  (G(e, 'input', async (s) => {
    var l = s ? e.defaultValue : e.value;
    if (((l = L(e) ? V(l) : l), a(l), z !== null && i.add(z), await he(), l !== (l = r()))) {
      var u = e.selectionStart,
        v = e.selectionEnd,
        n = e.value.length;
      if (((e.value = l ?? ''), v !== null)) {
        var o = e.value.length;
        u === v && v === n && o > n
          ? ((e.selectionStart = o), (e.selectionEnd = o))
          : ((e.selectionStart = u), (e.selectionEnd = Math.min(v, o)));
      }
    }
  }),
    J(r) == null && e.value && (a(L(e) ? V(e.value) : e.value), z !== null && i.add(z)),
    H(() => {
      var s = r();
      if (e === document.activeElement) {
        var l = _e ?? z;
        if (i.has(l)) return;
      }
      (L(e) && s === V(e.value)) || (e.type === 'date' && !s && !e.value) || (s !== e.value && (e.value = s ?? ''));
    }));
}
const B = new Set();
function Te(e, r, a, i, s = i) {
  var l = a.getAttribute('type') === 'checkbox',
    u = e;
  if (r !== null) for (var v of r) u = u[v] ??= [];
  (u.push(a),
    G(
      a,
      'change',
      () => {
        var n = a.__value;
        (l && (n = Ae(u, n, a.checked)), s(n));
      },
      () => s(l ? [] : null),
    ),
    H(() => {
      var n = i();
      l ? ((n = n || []), (a.checked = n.includes(a.__value))) : (a.checked = ge(a.__value, n));
    }),
    be(() => {
      var n = u.indexOf(a);
      n !== -1 && u.splice(n, 1);
    }),
    B.has(u) ||
      (B.add(u),
      F(() => {
        (u.sort((n, o) => (n.compareDocumentPosition(o) === 4 ? -1 : 1)), B.delete(u));
      })),
    F(() => {}));
}
function ze(e, r, a = r) {
  (G(e, 'change', (i) => {
    var s = i ? e.defaultChecked : e.checked;
    a(s);
  }),
    J(r) == null && a(e.checked),
    H(() => {
      var i = r();
      e.checked = !!i;
    }));
}
function Ae(e, r, a) {
  for (var i = new Set(), s = 0; s < e.length; s += 1) e[s].checked && i.add(e[s].__value);
  return (a || i.delete(r), Array.from(i));
}
function L(e) {
  var r = e.type;
  return r === 'number' || r === 'range';
}
function V(e) {
  return e === '' ? null : +e;
}
function y(e, r) {
  return e === r || e?.[ke] === r;
}
function Me(e = {}, r, a, i) {
  return (
    Ee(() => {
      var s, l;
      return (
        H(() => {
          ((s = l),
            (l = []),
            J(() => {
              e !== a(...l) && (r(e, ...l), s && y(a(...s), e) && r(null, ...s));
            }));
        }),
        () => {
          F(() => {
            l && y(a(...l), e) && r(null, ...l);
          });
        }
      );
    }),
    e
  );
}
const T = [];
function Ne(e, r = q) {
  let a = null;
  const i = new Set();
  function s(v) {
    if (Se(e, v) && ((e = v), a)) {
      const n = !T.length;
      for (const o of i) (o[1](), T.push(o, e));
      if (n) {
        for (let o = 0; o < T.length; o += 2) T[o][0](T[o + 1]);
        T.length = 0;
      }
    }
  }
  function l(v) {
    s(v(e));
  }
  function u(v, n = q) {
    const o = [v, n];
    return (
      i.add(o),
      i.size === 1 && (a = r(s, l) || q),
      v(e),
      () => {
        (i.delete(o), i.size === 0 && a && (a(), (a = null)));
      }
    );
  }
  return {set: s, update: l, subscribe: u};
}
export {Ie as a, Me as b, ze as c, Te as d, xe as e, Ne as w};
