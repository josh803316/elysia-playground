import {
  w as vt,
  x as ga,
  E as wt,
  B as ca,
  R as ua,
  y as Br,
  z as Me,
  T as ba,
  A as fa,
  C as pa,
  D as Te,
  F as Ct,
  G as ya,
  H as ma,
  I as xa,
  J as ka,
  K as mr,
  L as ha,
  N as va,
  M as wa,
  O as Ca,
  P as _t,
  Q as zt,
  S as Ur,
  U as At,
  V as _a,
  W as za,
  X as Aa,
  Y as Va,
  g as o,
  Z as Ta,
  _ as Vt,
  a0 as Sa,
  r as Tt,
  k as ge,
  a1 as Pa,
  a2 as Ea,
  a3 as Na,
  a4 as Ba,
  a5 as Ma,
  a6 as ja,
  a7 as Ia,
  a8 as La,
  a9 as Oa,
  aa as Ra,
  ab as Da,
  u as pr,
  ac as ot,
  ad as Fa,
  ae as Be,
  af as Ga,
  ag as Ua,
  ah as Ha,
  ai as St,
  p as Se,
  a as R,
  m as ie,
  n as ae,
  i as Y,
  c as T,
  d as Pe,
  f as X,
  h as re,
  l as ee,
  aj as z,
  ak as je,
  t as de,
  q as Ue,
  al as fe,
  am as Ke,
  an as Wa,
  s as rr,
  j as H,
  ao as qa,
  ap as Tr,
  b as Pt,
  aq as Xe,
  e as Ya,
  ar as $e,
  as as Ka,
  at as Ne,
  au as nr,
} from './iframe-3AYY9gF4.js';
import {w as Ja, b as tr, e as Et, c as Za, d as Xa, a as Hr} from './index-C0mD0_9W.js';
import './preload-helper-PPVm8Dsz.js';
const Qa = () => performance.now(),
  Ge = {tick: (r) => requestAnimationFrame(r), now: () => Qa(), tasks: new Set()};
function Nt() {
  const r = Ge.now();
  (Ge.tasks.forEach((e) => {
    e.c(r) || (Ge.tasks.delete(e), e.f());
  }),
    Ge.tasks.size !== 0 && Ge.tick(Nt));
}
function $a(r) {
  let e;
  return (
    Ge.tasks.size === 0 && Ge.tick(Nt),
    {
      promise: new Promise((a) => {
        Ge.tasks.add((e = {c: r, f: a}));
      }),
      abort() {
        Ge.tasks.delete(e);
      },
    }
  );
}
function Sr(r, e) {
  Ct(() => {
    r.dispatchEvent(new CustomEvent(e));
  });
}
function eo(r) {
  if (r === 'float') return 'cssFloat';
  if (r === 'offset') return 'cssOffset';
  if (r.startsWith('--')) return r;
  const e = r.split('-');
  return e.length === 1
    ? e[0]
    : e[0] +
        e
          .slice(1)
          .map((a) => a[0].toUpperCase() + a.slice(1))
          .join('');
}
function st(r) {
  const e = {},
    a = r.split(';');
  for (const t of a) {
    const [s, l] = t.split(':');
    if (!s || l === void 0) break;
    const n = eo(s.trim());
    e[n] = l.trim();
  }
  return e;
}
const ro = (r) => r;
function Bt(r, e, a, t) {
  var s = (r & ya) !== 0,
    l = (r & ma) !== 0,
    n = s && l,
    d = (r & ba) !== 0,
    c = n ? 'both' : s ? 'in' : 'out',
    g,
    f = e.inert,
    p = e.style.overflow,
    m,
    A;
  function P() {
    return Ct(() => (g ??= a()(e, t?.() ?? {}, {direction: c})));
  }
  var C = {
      is_global: d,
      in() {
        if (((e.inert = f), !s)) {
          (A?.abort(), A?.reset?.());
          return;
        }
        (l || m?.abort(),
          (m = Wr(e, P(), A, 1, () => {
            (Sr(e, 'introend'), m?.abort(), (m = g = void 0), (e.style.overflow = p));
          })));
      },
      out(u) {
        if (!l) {
          (u?.(), (g = void 0));
          return;
        }
        ((e.inert = !0),
          (A = Wr(e, P(), m, 0, () => {
            (Sr(e, 'outroend'), u?.());
          })));
      },
      stop: () => {
        (m?.abort(), A?.abort());
      },
    },
    S = vt;
  if (((S.nodes.t ??= []).push(C), s && ga)) {
    var k = d;
    if (!k) {
      for (var _ = S.parent; _ && (_.f & wt) !== 0; ) for (; (_ = _.parent) && (_.f & ca) === 0; );
      k = !_ || (_.f & ua) !== 0;
    }
    k &&
      Br(() => {
        Me(() => C.in());
      });
  }
}
function Wr(r, e, a, t, s) {
  var l = t === 1;
  if (fa(e)) {
    var n,
      d = !1;
    return (
      pa(() => {
        if (!d) {
          var S = e({direction: l ? 'in' : 'out'});
          n = Wr(r, S, a, t, s);
        }
      }),
      {
        abort: () => {
          ((d = !0), n?.abort());
        },
        deactivate: () => n.deactivate(),
        reset: () => n.reset(),
        t: () => n.t(),
      }
    );
  }
  if ((a?.deactivate(), !e?.duration && !e?.delay))
    return (Sr(r, l ? 'introstart' : 'outrostart'), s(), {abort: Te, deactivate: Te, reset: Te, t: () => t});
  const {delay: c = 0, css: g, tick: f, easing: p = ro} = e;
  var m = [];
  if (l && a === void 0 && (f && f(0, 1), g)) {
    var A = st(g(0, 1));
    m.push(A, A);
  }
  var P = () => 1 - t,
    C = r.animate(m, {duration: c, fill: 'forwards'});
  return (
    (C.onfinish = () => {
      (C.cancel(), Sr(r, l ? 'introstart' : 'outrostart'));
      var S = a?.t() ?? 1 - t;
      a?.abort();
      var k = t - S,
        _ = e.duration * Math.abs(k),
        u = [];
      if (_ > 0) {
        var E = !1;
        if (g)
          for (var M = Math.ceil(_ / 16.666666666666668), h = 0; h <= M; h += 1) {
            var v = S + k * p(h / M),
              b = st(g(v, 1 - v));
            (u.push(b), (E ||= b.overflow === 'hidden'));
          }
        (E && (r.style.overflow = 'hidden'),
          (P = () => {
            var B = C.currentTime;
            return S + k * p(B / _);
          }),
          f &&
            $a(() => {
              if (C.playState !== 'running') return !1;
              var B = P();
              return (f(B, 1 - B), !0);
            }));
      }
      ((C = r.animate(u, {duration: _, fill: 'forwards'})),
        (C.onfinish = () => {
          ((P = () => t), f?.(t, 1 - t), s());
        }));
    }),
    {
      abort: () => {
        C && (C.cancel(), (C.effect = null), (C.onfinish = Te));
      },
      deactivate: () => {
        s = Te;
      },
      reset: () => {
        t === 0 && f?.(1, 0);
      },
      t: () => P(),
    }
  );
}
function to(r, e, a, t, s, l) {
  var n = null,
    d = r,
    c = new ka(d, !1);
  (xa(() => {
    const g = e() || null;
    var f = g === 'svg' ? va : void 0;
    if (g === null) {
      (c.ensure(null, null), mr(!0));
      return;
    }
    return (
      c.ensure(g, (p) => {
        if (g) {
          if (((n = ha(g, f)), wa(n, n), t)) {
            var m = n.appendChild(Ca());
            t(n, m);
          }
          ((vt.nodes.end = n), p.before(n));
        }
      }),
      mr(!0),
      () => {
        g && mr(!1);
      }
    );
  }, wt),
    _t(() => {
      mr(!0);
    }));
}
function ao(r, e, a) {
  Br(() => {
    var t = Me(() => e(r, a?.()) || {});
    if (t?.destroy) return () => t.destroy();
  });
}
function Mt(r, e) {
  var a = void 0,
    t;
  zt(() => {
    a !== (a = e()) &&
      (t && (Ur(t), (t = null)),
      a &&
        (t = At(() => {
          Br(() => a(r));
        })));
  });
}
function jt(r) {
  var e,
    a,
    t = '';
  if (typeof r == 'string' || typeof r == 'number') t += r;
  else if (typeof r == 'object')
    if (Array.isArray(r)) {
      var s = r.length;
      for (e = 0; e < s; e++) r[e] && (a = jt(r[e])) && (t && (t += ' '), (t += a));
    } else for (a in r) r[a] && (t && (t += ' '), (t += a));
  return t;
}
function $() {
  for (var r, e, a = 0, t = '', s = arguments.length; a < s; a++)
    (r = arguments[a]) && (e = jt(r)) && (t && (t += ' '), (t += e));
  return t;
}
function we(r) {
  return typeof r == 'object' ? $(r) : (r ?? '');
}
const lt = [
  ...` 	
\r\f \v\uFEFF`,
];
function oo(r, e, a) {
  var t = r == null ? '' : '' + r;
  if (a) {
    for (var s of Object.keys(a))
      if (a[s]) t = t ? t + ' ' + s : s;
      else if (t.length)
        for (var l = s.length, n = 0; (n = t.indexOf(s, n)) >= 0; ) {
          var d = n + l;
          (n === 0 || lt.includes(t[n - 1])) && (d === t.length || lt.includes(t[d]))
            ? (t = (n === 0 ? '' : t.substring(0, n)) + t.substring(d + 1))
            : (n = d);
        }
  }
  return t === '' ? null : t;
}
function nt(r, e = !1) {
  var a = e ? ' !important;' : ';',
    t = '';
  for (var s of Object.keys(r)) {
    var l = r[s];
    l != null && l !== '' && (t += ' ' + s + ': ' + l + a);
  }
  return t;
}
function Or(r) {
  return r[0] !== '-' || r[1] !== '-' ? r.toLowerCase() : r;
}
function so(r, e) {
  if (e) {
    var a = '',
      t,
      s;
    if ((Array.isArray(e) ? ((t = e[0]), (s = e[1])) : (t = e), r)) {
      r = String(r)
        .replaceAll(/\s*\/\*.*?\*\/\s*/g, '')
        .trim();
      var l = !1,
        n = 0,
        d = !1,
        c = [];
      (t && c.push(...Object.keys(t).map(Or)), s && c.push(...Object.keys(s).map(Or)));
      var g = 0,
        f = -1;
      const C = r.length;
      for (var p = 0; p < C; p++) {
        var m = r[p];
        if (
          (d
            ? m === '/' && r[p - 1] === '*' && (d = !1)
            : l
              ? l === m && (l = !1)
              : m === '/' && r[p + 1] === '*'
                ? (d = !0)
                : m === '"' || m === "'"
                  ? (l = m)
                  : m === '('
                    ? n++
                    : m === ')' && n--,
          !d && l === !1 && n === 0)
        ) {
          if (m === ':' && f === -1) f = p;
          else if (m === ';' || p === C - 1) {
            if (f !== -1) {
              var A = Or(r.substring(g, f).trim());
              if (!c.includes(A)) {
                m !== ';' && p++;
                var P = r.substring(g, p).trim();
                a += ' ' + P + ';';
              }
            }
            ((g = p + 1), (f = -1));
          }
        }
      }
    }
    return (t && (a += nt(t)), s && (a += nt(s, !0)), (a = a.trim()), a === '' ? null : a);
  }
  return r == null ? null : String(r);
}
function he(r, e, a, t, s, l) {
  var n = r.__className;
  if (n !== a || n === void 0) {
    var d = oo(a, t, l);
    (d == null ? r.removeAttribute('class') : e ? (r.className = d) : r.setAttribute('class', d), (r.__className = a));
  } else if (l && s !== l)
    for (var c in l) {
      var g = !!l[c];
      (s == null || g !== !!s[c]) && r.classList.toggle(c, g);
    }
  return l;
}
function Rr(r, e = {}, a, t) {
  for (var s in a) {
    var l = a[s];
    e[s] !== l && (a[s] == null ? r.style.removeProperty(s) : r.style.setProperty(s, l, t));
  }
}
function lo(r, e, a, t) {
  var s = r.__style;
  if (s !== e) {
    var l = so(e, t);
    (l == null ? r.removeAttribute('style') : (r.style.cssText = l), (r.__style = e));
  } else t && (Array.isArray(t) ? (Rr(r, a?.[0], t[0]), Rr(r, a?.[1], t[1], 'important')) : Rr(r, a, t));
  return t;
}
function qr(r, e, a = !1) {
  if (r.multiple) {
    if (e == null) return;
    if (!_a(e)) return za();
    for (var t of r.options) t.selected = e.includes(it(t));
    return;
  }
  for (t of r.options) {
    var s = it(t);
    if (Aa(s, e)) {
      t.selected = !0;
      return;
    }
  }
  (!a || e !== void 0) && (r.selectedIndex = -1);
}
function no(r) {
  var e = new MutationObserver(() => {
    qr(r, r.__value);
  });
  (e.observe(r, {childList: !0, subtree: !0, attributes: !0, attributeFilter: ['value']}),
    _t(() => {
      e.disconnect();
    }));
}
function it(r) {
  return '__value' in r ? r.__value : r.value;
}
const ir = Symbol('class'),
  dr = Symbol('style'),
  It = Symbol('is custom element'),
  Lt = Symbol('is html'),
  io = Vt ? 'option' : 'OPTION',
  go = Vt ? 'select' : 'SELECT';
function co(r, e) {
  e ? r.hasAttribute('selected') || r.setAttribute('selected', '') : r.removeAttribute('selected');
}
function Ye(r, e, a, t) {
  var s = Ot(r);
  s[e] !== (s[e] = a) &&
    (e === 'loading' && (r[Ia] = a),
    a == null ? r.removeAttribute(e) : typeof a != 'string' && Rt(r).includes(e) ? (r[e] = a) : r.setAttribute(e, a));
}
function uo(r, e, a, t, s = !1, l = !1) {
  var n = Ot(r),
    d = n[It],
    c = !n[Lt],
    g = e || {},
    f = r.nodeName === io;
  for (var p in e) p in a || (a[p] = null);
  (a.class ? (a.class = we(a.class)) : a[ir] && (a.class = null), a[dr] && (a.style ??= null));
  var m = Rt(r);
  for (const u in a) {
    let E = a[u];
    if (f && u === 'value' && E == null) {
      ((r.value = r.__value = ''), (g[u] = E));
      continue;
    }
    if (u === 'class') {
      var A = r.namespaceURI === 'http://www.w3.org/1999/xhtml';
      (he(r, A, E, t, e?.[ir], a[ir]), (g[u] = E), (g[ir] = a[ir]));
      continue;
    }
    if (u === 'style') {
      (lo(r, E, e?.[dr], a[dr]), (g[u] = E), (g[dr] = a[dr]));
      continue;
    }
    var P = g[u];
    if (!(E === P && !(E === void 0 && r.hasAttribute(u)))) {
      g[u] = E;
      var C = u[0] + u[1];
      if (C !== '$$')
        if (C === 'on') {
          const M = {},
            h = '$$' + u;
          let v = u.slice(2);
          var S = La(v);
          if ((Sa(v) && ((v = v.slice(0, -7)), (M.capture = !0)), !S && P)) {
            if (E != null) continue;
            (r.removeEventListener(v, g[h], M), (g[h] = null));
          }
          if (S) (Tt(v, r, E), ge([v]));
          else if (E != null) {
            let b = function (B) {
              g[u].call(this, B);
            };
            g[h] = Pa(v, r, b, M);
          }
        } else if (u === 'style') Ye(r, u, E);
        else if (u === 'autofocus') Ea(r, !!E);
        else if (!d && (u === '__value' || (u === 'value' && E != null))) r.value = r.__value = E;
        else if (u === 'selected' && f) co(r, E);
        else {
          var k = u;
          c || (k = Na(k));
          var _ = k === 'defaultValue' || k === 'defaultChecked';
          if (E == null && !d && !_)
            if (((n[u] = null), k === 'value' || k === 'checked')) {
              let M = r;
              const h = e === void 0;
              if (k === 'value') {
                let v = M.defaultValue;
                (M.removeAttribute(k), (M.defaultValue = v), (M.value = M.__value = h ? v : null));
              } else {
                let v = M.defaultChecked;
                (M.removeAttribute(k), (M.defaultChecked = v), (M.checked = h ? v : !1));
              }
            } else r.removeAttribute(u);
          else
            _ || (m.includes(k) && (d || typeof E != 'string'))
              ? ((r[k] = E), k in n && (n[k] = Ba))
              : typeof E != 'function' && Ye(r, k, E);
        }
    }
  }
  return g;
}
function ve(r, e, a = [], t = [], s = [], l, n = !1, d = !1) {
  Va(s, a, t, (c) => {
    var g = void 0,
      f = {},
      p = r.nodeName === go,
      m = !1;
    if (
      (zt(() => {
        var P = e(...c.map(o)),
          C = uo(r, g, P, l, n, d);
        m && p && 'value' in P && qr(r, P.value);
        for (let k of Object.getOwnPropertySymbols(f)) P[k] || Ur(f[k]);
        for (let k of Object.getOwnPropertySymbols(P)) {
          var S = P[k];
          (k.description === Ta && (!g || S !== g[k]) && (f[k] && Ur(f[k]), (f[k] = At(() => Mt(r, () => S)))),
            (C[k] = S));
        }
        g = C;
      }),
      p)
    ) {
      var A = r;
      Br(() => {
        (qr(A, g.value, !0), no(A));
      });
    }
    m = !0;
  });
}
function Ot(r) {
  return (r.__attributes ??= {[It]: r.nodeName.includes('-'), [Lt]: r.namespaceURI === Ma});
}
var dt = new Map();
function Rt(r) {
  var e = r.getAttribute('is') || r.nodeName,
    a = dt.get(e);
  if (a) return a;
  dt.set(e, (a = []));
  for (var t, s = r, l = Element.prototype; l !== s; ) {
    t = Oa(s);
    for (var n in t) t[n].set && a.push(n);
    s = ja(s);
  }
  return a;
}
function bo(r = !1) {
  const e = Ra,
    a = e.l.u;
  if (!a) return;
  let t = () => Be(e.s);
  if (r) {
    let s = 0,
      l = {};
    const n = Ga(() => {
      let d = !1;
      const c = e.s;
      for (const g in c) c[g] !== l[g] && ((l[g] = c[g]), (d = !0));
      return (d && s++, s);
    });
    t = () => o(n);
  }
  (a.b.length &&
    Da(() => {
      (gt(e, t), ot(a.b));
    }),
    pr(() => {
      const s = Me(() => a.m.map(Fa));
      return () => {
        for (const l of s) typeof l == 'function' && l();
      };
    }),
    a.a.length &&
      pr(() => {
        (gt(e, t), ot(a.a));
      }));
}
function gt(r, e) {
  if (r.l.s) for (const a of r.l.s) o(a);
  e();
}
Ua();
var xr = class extends Error {
    constructor(r, e) {
      (super(e + ''), (this.status = r), (this.value = e));
    }
  },
  fo =
    /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
  po =
    /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/,
  yo =
    /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/,
  mo = (r) => r.trim().length !== 0 && !Number.isNaN(Number(r)),
  Xr = (r) => {
    if (typeof r != 'string') return null;
    let e = r.replace(/"/g, '');
    if (fo.test(e) || po.test(e) || yo.test(e)) {
      let a = new Date(e);
      if (!Number.isNaN(a.getTime())) return a;
    }
    return null;
  },
  xo = (r) => {
    let e = r.charCodeAt(0),
      a = r.charCodeAt(r.length - 1);
    return (e === 123 && a === 125) || (e === 91 && a === 93);
  },
  ko = (r) => JSON.parse(r, (e, a) => Xr(a) || a),
  Qr = (r) => {
    if (!r) return r;
    if (mo(r)) return +r;
    if (r === 'true') return !0;
    if (r === 'false') return !1;
    let e = Xr(r);
    if (e) return e;
    if (xo(r))
      try {
        return ko(r);
      } catch {}
    return r;
  },
  ho = (r) => {
    let e = r.data.toString();
    return e === 'null' ? null : Qr(e);
  },
  vo = class {
    constructor(r) {
      ((this.url = r), (this.ws = new WebSocket(r)));
    }
    ws;
    send(r) {
      return Array.isArray(r)
        ? (r.forEach((e) => this.send(e)), this)
        : (this.ws.send(typeof r == 'object' ? JSON.stringify(r) : r.toString()), this);
    }
    on(r, e, a) {
      return this.addEventListener(r, e, a);
    }
    off(r, e, a) {
      return (this.ws.removeEventListener(r, e, a), this);
    }
    subscribe(r, e) {
      return this.addEventListener('message', r, e);
    }
    addEventListener(r, e, a) {
      return (
        this.ws.addEventListener(
          r,
          (t) => {
            if (r === 'message') {
              let s = ho(t);
              e({...t, data: s});
            } else e(t);
          },
          a,
        ),
        this
      );
    }
    removeEventListener(r, e, a) {
      return (this.off(r, e, a), this);
    }
    close() {
      return (this.ws.close(), this);
    }
  },
  wo = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'connect', 'subscribe'],
  Dt = ['localhost', '127.0.0.1', '0.0.0.0'],
  $r = typeof FileList > 'u',
  Pr = (r) => ($r ? r instanceof Blob : r instanceof FileList || r instanceof File),
  Co = (r) => {
    if (!r) return !1;
    for (let e in r) if (Pr(r[e]) || (Array.isArray(r[e]) && r[e].find(Pr))) return !0;
    return !1;
  },
  Dr = (r) =>
    $r
      ? r
      : new Promise((e) => {
          let a = new FileReader();
          ((a.onload = () => {
            let t = new File([a.result], r.name, {lastModified: r.lastModified, type: r.type});
            e(t);
          }),
            a.readAsArrayBuffer(r));
        }),
  Qe = async (r, e, a = {}, t = {}) => {
    if (Array.isArray(r)) {
      for (let s of r)
        if (!Array.isArray(s)) t = await Qe(s, e, a, t);
        else {
          let l = s[0];
          if (typeof l == 'string') t[l.toLowerCase()] = s[1];
          else for (let [n, d] of l) t[n.toLowerCase()] = d;
        }
      return t;
    }
    if (!r) return t;
    switch (typeof r) {
      case 'function':
        if (r instanceof Headers) return Qe(r, e, a, t);
        let s = await r(e, a);
        return s ? Qe(s, e, a, t) : t;
      case 'object':
        if (r instanceof Headers)
          return (
            r.forEach((l, n) => {
              t[n.toLowerCase()] = l;
            }),
            t
          );
        for (let [l, n] of Object.entries(r)) t[l.toLowerCase()] = n;
        return t;
      default:
        return t;
    }
  };
function Ft(r) {
  let e = r.split(`
`),
    a = {};
  for (let t of e) {
    if (!t || t.startsWith(':')) continue;
    let s = t.indexOf(':');
    if (s > 0) {
      let l = t.slice(0, s).trim(),
        n = t.slice(s + 1).replace(/^ /, '');
      a[l] = n && Qr(n);
    }
  }
  return Object.keys(a).length > 0 ? a : null;
}
function* ct(r) {
  let e;
  for (
    ;
    (e = r.value.indexOf(`

`)) !== -1;
  ) {
    let a = r.value.slice(0, e);
    if (((r.value = r.value.slice(e + 2)), a.trim())) {
      let t = Ft(a);
      t && (yield t);
    }
  }
}
async function* _o(r) {
  let e = r.body;
  if (!e) return;
  let a = e.getReader(),
    t = new TextDecoder('utf-8'),
    s = {value: ''};
  try {
    for (;;) {
      let {done: n, value: d} = await a.read();
      if (n) break;
      let c = typeof d == 'string' ? d : t.decode(d, {stream: !0});
      ((s.value += c), yield* ct(s));
    }
    let l = t.decode();
    if ((l && (s.value += l), yield* ct(s), s.value.trim())) {
      let n = Ft(s.value);
      n && (yield n);
    }
  } finally {
    a.releaseLock();
  }
}
var br = (r, e, a = [], t) =>
    new Proxy(() => {}, {
      get(s, l) {
        return br(r, e, l === 'index' ? a : [...a, l], t);
      },
      apply(s, l, [n, d]) {
        if (!n || d || (typeof n == 'object' && Object.keys(n).length !== 1) || wo.includes(a.at(-1))) {
          let c = [...a],
            g = c.pop(),
            f = '/' + c.join('/'),
            {fetcher: p = fetch, headers: m, onRequest: A, onResponse: P, fetch: C} = e,
            S = g === 'get' || g === 'head' || g === 'subscribe',
            k = S ? n?.query : d?.query,
            _ = '';
          if (k) {
            let u = (E, M) => {
              _ += (_ ? '&' : '?') + `${encodeURIComponent(E)}=${encodeURIComponent(M)}`;
            };
            for (let [E, M] of Object.entries(k)) {
              if (Array.isArray(M)) {
                for (let h of M) u(E, h);
                continue;
              }
              if (M != null) {
                if (typeof M == 'object') {
                  u(E, JSON.stringify(M));
                  continue;
                }
                u(E, `${M}`);
              }
            }
          }
          if (g === 'subscribe') {
            let u =
              r.replace(
                /^([^]+):\/\//,
                r.startsWith('https://')
                  ? 'wss://'
                  : r.startsWith('http://') || Dt.find((E) => r.includes(E))
                    ? 'ws://'
                    : 'wss://',
              ) +
              f +
              _;
            return new vo(u);
          }
          return (async () => {
            m = await Qe(m, f, d);
            let u = {method: g?.toUpperCase(), body: n, ...C, headers: m};
            u.headers = {...m, ...(await Qe(S ? n?.headers : d?.headers, f, u))};
            let E = S && typeof n == 'object' ? n.fetch : d?.fetch;
            if (((u = {...u, ...E}), S && delete u.body, A)) {
              Array.isArray(A) || (A = [A]);
              for (let B of A) {
                let D = await B(f, u);
                typeof D == 'object' && (u = {...u, ...D, headers: {...u.headers, ...(await Qe(D.headers, f, u))}});
              }
            }
            if ((S && delete u.body, Co(n))) {
              let B = new FormData(),
                D = (V) => {
                  if (typeof V == 'string' || Pr(V)) return !1;
                  if (typeof V == 'object') {
                    if (V !== null) return !0;
                    if (V instanceof Date) return !1;
                  }
                  return !1;
                },
                F = async (V) => (V instanceof File ? await Dr(V) : D(V) ? JSON.stringify(V) : V);
              for (let [V, j] of Object.entries(u.body)) {
                if (Array.isArray(j)) {
                  if (j.some((N) => typeof N == 'object' && N !== null && !Pr(N))) B.append(V, JSON.stringify(j));
                  else
                    for (let N = 0; N < j.length; N++) {
                      let x = j[N],
                        w = await F(x);
                      B.append(V, w);
                    }
                  continue;
                }
                if ($r) {
                  if (Array.isArray(j)) for (let N of j) B.append(V, await F(N));
                  else B.append(V, await F(j));
                  continue;
                }
                if (j instanceof File) {
                  B.append(V, await Dr(j));
                  continue;
                }
                if (j instanceof FileList) {
                  for (let N = 0; N < j.length; N++) B.append(V, await Dr(j[N]));
                  continue;
                }
                B.append(V, await F(j));
              }
              u.body = B;
            } else
              typeof n == 'object'
                ? ((u.headers['content-type'] = 'application/json'), (u.body = JSON.stringify(n)))
                : n != null && (u.headers['content-type'] = 'text/plain');
            if ((S && delete u.body, A)) {
              Array.isArray(A) || (A = [A]);
              for (let B of A) {
                let D = await B(f, u);
                typeof D == 'object' && (u = {...u, ...D, headers: {...u.headers, ...(await Qe(D.headers, f, u))}});
              }
            }
            d?.headers?.['content-type'] && (u.headers['content-type'] = d?.headers['content-type']);
            let M = r + f + _,
              h;
            try {
              h = await (t?.handle(new Request(M, u)) ?? p(M, u));
            } catch (B) {
              return {data: null, error: new xr(503, B), response: void 0, status: 503, headers: void 0};
            }
            let v = null,
              b = null;
            if (P) {
              Array.isArray(P) || (P = [P]);
              for (let B of P)
                try {
                  let D = await B(h.clone());
                  if (D != null) {
                    v = D;
                    break;
                  }
                } catch (D) {
                  D instanceof xr ? (b = D) : (b = new xr(422, D));
                  break;
                }
            }
            if (v !== null) return {data: v, error: b, response: h, status: h.status, headers: h.headers};
            switch (h.headers.get('Content-Type')?.split(';')[0]) {
              case 'text/event-stream':
                v = _o(h);
                break;
              case 'application/json':
                v = JSON.parse(await h.text(), (D, F) => (typeof F != 'string' ? F : Xr(F) || F));
                break;
              case 'application/octet-stream':
                v = await h.arrayBuffer();
                break;
              case 'multipart/form-data':
                let B = await h.formData();
                ((v = {}),
                  B.forEach((D, F) => {
                    v[F] = D;
                  }));
                break;
              default:
                v = await h.text().then(Qr);
            }
            return (
              (h.status >= 300 || h.status < 200) && ((b = new xr(h.status, v)), (v = null)),
              {data: v, error: b, response: h, status: h.status, headers: h.headers}
            );
          })();
        }
        return typeof n == 'object' ? br(r, e, [...a, Object.values(n)[0]], t) : br(r, e, a);
      },
    }),
  zo = (r, e = {}) =>
    typeof r == 'string'
      ? (e.keepDomain ||
          (r.includes('://') || (r = (Dt.find((a) => r.includes(a)) ? 'http://' : 'https://') + r),
          r.endsWith('/') && (r = r.slice(0, -1))),
        br(r, e))
      : (typeof window < 'u' &&
          console.warn(
            'Elysia instance server found on client side, this is not recommended for security reason. Use generic type instead.',
          ),
        br('http://e.ly', e, [], r)),
  ut = {};
const Vr = 'http://localhost:3500'.trim(),
  kr = Vr.toLowerCase(),
  Ao = kr === 'api' || kr === '//api' || kr === 'http://api' || kr === 'https://api',
  Vo =
    typeof window < 'u'
      ? window.location.origin
      : Vr && !Ao && /^https?:\/\//i.test(Vr)
        ? Vr.replace(/\/+$/, '')
        : typeof process < 'u' && ut.VERCEL_URL
          ? `https://${ut.VERCEL_URL}`
          : 'http://localhost:3500',
  _e = zo(Vo),
  gr = {
    notes: {
      getAll: async (r) => _e.api.notes.index.get({headers: r ? {Authorization: `Bearer ${r}`} : void 0}),
      getUserNotes: async (r) => _e.api.notes.get({headers: r ? {Authorization: `Bearer ${r}`} : void 0}),
      getById: async (r, e) => _e.api.notes[r].get({headers: e ? {Authorization: `Bearer ${e}`} : void 0}),
      create: async (r, e) => {
        const a = {...r, isPublic: typeof r.isPublic == 'string' ? r.isPublic === 'true' : (r.isPublic ?? !1)};
        try {
          return await _e.api.notes.post(a, {headers: e ? {Authorization: `Bearer ${e}`} : void 0});
        } catch (t) {
          const s = new Error(t.error || 'Failed to create note');
          throw (
            (s.details = t.details || 'Unknown error'),
            (s.technicalDetails = t.technicalDetails),
            (s.status = t.status),
            s
          );
        }
      },
      update: async (r, e, a) => {
        const t = {...e, isPublic: typeof e.isPublic == 'string' ? e.isPublic === 'true' : (e.isPublic ?? !1)};
        return _e.api.notes[r].put(t, {headers: a ? {Authorization: `Bearer ${a}`} : void 0});
      },
      delete: async (r, e) => _e.api.notes[r].delete({headers: e ? {Authorization: `Bearer ${e}`} : void 0}),
    },
    privateNotes: {
      getAll: async (r) => _e.api['private-notes'].get({headers: r ? {Authorization: `Bearer ${r}`} : void 0}),
      getById: async (r, e) => _e.api['private-notes'][r].get({headers: e ? {Authorization: `Bearer ${e}`} : void 0}),
      create: async (r, e) => _e.api['private-notes'].put(r, {headers: e ? {Authorization: `Bearer ${e}`} : void 0}),
      update: async (r, e, a) =>
        _e.api['private-notes'][r].put(e, {headers: a ? {Authorization: `Bearer ${a}`} : void 0}),
      delete: async (r, e) => _e.api['private-notes'][r].delete({headers: e ? {Authorization: `Bearer ${e}`} : void 0}),
    },
    publicNotes: {
      getAll: async () => _e.api['public-notes'].get(),
      getById: async (r) => _e.api['public-notes'][r].get(),
      create: async (r) => {
        try {
          return await _e.api['public-notes'].post(r);
        } catch (e) {
          const a = new Error(e.error || 'Failed to create public note');
          throw (
            (a.details = e.details || 'Unknown error'),
            (a.technicalDetails = e.technicalDetails),
            (a.status = e.status),
            a
          );
        }
      },
    },
    versions: {get: async () => _e.versions.get()},
  };
function To() {
  const {subscribe: r, set: e, update: a} = Ja({notes: null, loading: !1, error: null, initialized: !1}),
    t = {
      subscribe: r,
      fetchNotes: async (s) => {
        a((l) => ({...l, loading: !0}));
        try {
          if (!s) throw new Error('No authentication token available');
          const l = await gr.notes.getAll(s);
          e({notes: l.data, loading: !1, error: null, initialized: !0});
        } catch (l) {
          (console.error('Error fetching notes:', l),
            e({
              notes: null,
              loading: !1,
              error: l instanceof Error ? l : new Error('Failed to fetch notes'),
              initialized: !0,
            }));
        }
      },
      createNote: async (s, l) => {
        try {
          if (s.isPublic && !l) {
            await gr.publicNotes.create({content: s.content});
            return;
          }
          if (!l) throw new Error('No authentication token available');
          (await gr.notes.create(s, l), await t.fetchNotes(l));
        } catch (n) {
          throw (console.error('Error creating note:', n), n instanceof Error ? n : new Error('Failed to create note'));
        }
      },
      updateNote: async (s, l, n) => {
        try {
          if (!n) throw new Error('No authentication token available');
          (await gr.notes.update(s, l, n), await t.fetchNotes(n));
        } catch (d) {
          throw (console.error('Error updating note:', d), d instanceof Error ? d : new Error('Failed to update note'));
        }
      },
      deleteNote: async (s, l) => {
        try {
          if (!l) throw new Error('No authentication token available');
          (await gr.notes.delete(s, l), await t.fetchNotes(l));
        } catch (n) {
          throw (console.error('Error deleting note:', n), n instanceof Error ? n : new Error('Failed to delete note'));
        }
      },
    };
  return t;
}
const bt = To(),
  So = (r, e) => {
    const a = new Array(r.length + e.length);
    for (let t = 0; t < r.length; t++) a[t] = r[t];
    for (let t = 0; t < e.length; t++) a[r.length + t] = e[t];
    return a;
  },
  Po = (r, e) => ({classGroupId: r, validator: e}),
  Gt = (r = new Map(), e = null, a) => ({nextPart: r, validators: e, classGroupId: a}),
  Er = '-',
  ft = [],
  Eo = 'arbitrary..',
  No = (r) => {
    const e = Mo(r),
      {conflictingClassGroups: a, conflictingClassGroupModifiers: t} = r;
    return {
      getClassGroupId: (n) => {
        if (n.startsWith('[') && n.endsWith(']')) return Bo(n);
        const d = n.split(Er),
          c = d[0] === '' && d.length > 1 ? 1 : 0;
        return Ut(d, c, e);
      },
      getConflictingClassGroupIds: (n, d) => {
        if (d) {
          const c = t[n],
            g = a[n];
          return c ? (g ? So(g, c) : c) : g || ft;
        }
        return a[n] || ft;
      },
    };
  },
  Ut = (r, e, a) => {
    if (r.length - e === 0) return a.classGroupId;
    const s = r[e],
      l = a.nextPart.get(s);
    if (l) {
      const g = Ut(r, e + 1, l);
      if (g) return g;
    }
    const n = a.validators;
    if (n === null) return;
    const d = e === 0 ? r.join(Er) : r.slice(e).join(Er),
      c = n.length;
    for (let g = 0; g < c; g++) {
      const f = n[g];
      if (f.validator(d)) return f.classGroupId;
    }
  },
  Bo = (r) =>
    r.slice(1, -1).indexOf(':') === -1
      ? void 0
      : (() => {
          const e = r.slice(1, -1),
            a = e.indexOf(':'),
            t = e.slice(0, a);
          return t ? Eo + t : void 0;
        })(),
  Mo = (r) => {
    const {theme: e, classGroups: a} = r;
    return jo(a, e);
  },
  jo = (r, e) => {
    const a = Gt();
    for (const t in r) {
      const s = r[t];
      et(s, a, t, e);
    }
    return a;
  },
  et = (r, e, a, t) => {
    const s = r.length;
    for (let l = 0; l < s; l++) {
      const n = r[l];
      Io(n, e, a, t);
    }
  },
  Io = (r, e, a, t) => {
    if (typeof r == 'string') {
      Lo(r, e, a);
      return;
    }
    if (typeof r == 'function') {
      Oo(r, e, a, t);
      return;
    }
    Ro(r, e, a, t);
  },
  Lo = (r, e, a) => {
    const t = r === '' ? e : Ht(e, r);
    t.classGroupId = a;
  },
  Oo = (r, e, a, t) => {
    if (Do(r)) {
      et(r(t), e, a, t);
      return;
    }
    (e.validators === null && (e.validators = []), e.validators.push(Po(a, r)));
  },
  Ro = (r, e, a, t) => {
    const s = Object.entries(r),
      l = s.length;
    for (let n = 0; n < l; n++) {
      const [d, c] = s[n];
      et(c, Ht(e, d), a, t);
    }
  },
  Ht = (r, e) => {
    let a = r;
    const t = e.split(Er),
      s = t.length;
    for (let l = 0; l < s; l++) {
      const n = t[l];
      let d = a.nextPart.get(n);
      (d || ((d = Gt()), a.nextPart.set(n, d)), (a = d));
    }
    return a;
  },
  Do = (r) => 'isThemeGetter' in r && r.isThemeGetter === !0,
  Fo = (r) => {
    if (r < 1) return {get: () => {}, set: () => {}};
    let e = 0,
      a = Object.create(null),
      t = Object.create(null);
    const s = (l, n) => {
      ((a[l] = n), e++, e > r && ((e = 0), (t = a), (a = Object.create(null))));
    };
    return {
      get(l) {
        let n = a[l];
        if (n !== void 0) return n;
        if ((n = t[l]) !== void 0) return (s(l, n), n);
      },
      set(l, n) {
        l in a ? (a[l] = n) : s(l, n);
      },
    };
  },
  Yr = '!',
  pt = ':',
  Go = [],
  yt = (r, e, a, t, s) => ({
    modifiers: r,
    hasImportantModifier: e,
    baseClassName: a,
    maybePostfixModifierPosition: t,
    isExternal: s,
  }),
  Uo = (r) => {
    const {prefix: e, experimentalParseClassName: a} = r;
    let t = (s) => {
      const l = [];
      let n = 0,
        d = 0,
        c = 0,
        g;
      const f = s.length;
      for (let C = 0; C < f; C++) {
        const S = s[C];
        if (n === 0 && d === 0) {
          if (S === pt) {
            (l.push(s.slice(c, C)), (c = C + 1));
            continue;
          }
          if (S === '/') {
            g = C;
            continue;
          }
        }
        S === '[' ? n++ : S === ']' ? n-- : S === '(' ? d++ : S === ')' && d--;
      }
      const p = l.length === 0 ? s : s.slice(c);
      let m = p,
        A = !1;
      p.endsWith(Yr) ? ((m = p.slice(0, -1)), (A = !0)) : p.startsWith(Yr) && ((m = p.slice(1)), (A = !0));
      const P = g && g > c ? g - c : void 0;
      return yt(l, A, m, P);
    };
    if (e) {
      const s = e + pt,
        l = t;
      t = (n) => (n.startsWith(s) ? l(n.slice(s.length)) : yt(Go, !1, n, void 0, !0));
    }
    if (a) {
      const s = t;
      t = (l) => a({className: l, parseClassName: s});
    }
    return t;
  },
  Ho = (r) => {
    const e = new Map();
    return (
      r.orderSensitiveModifiers.forEach((a, t) => {
        e.set(a, 1e6 + t);
      }),
      (a) => {
        const t = [];
        let s = [];
        for (let l = 0; l < a.length; l++) {
          const n = a[l],
            d = n[0] === '[',
            c = e.has(n);
          d || c ? (s.length > 0 && (s.sort(), t.push(...s), (s = [])), t.push(n)) : s.push(n);
        }
        return (s.length > 0 && (s.sort(), t.push(...s)), t);
      }
    );
  },
  Wo = (r) => ({cache: Fo(r.cacheSize), parseClassName: Uo(r), sortModifiers: Ho(r), ...No(r)}),
  qo = /\s+/,
  Yo = (r, e) => {
    const {parseClassName: a, getClassGroupId: t, getConflictingClassGroupIds: s, sortModifiers: l} = e,
      n = [],
      d = r.trim().split(qo);
    let c = '';
    for (let g = d.length - 1; g >= 0; g -= 1) {
      const f = d[g],
        {
          isExternal: p,
          modifiers: m,
          hasImportantModifier: A,
          baseClassName: P,
          maybePostfixModifierPosition: C,
        } = a(f);
      if (p) {
        c = f + (c.length > 0 ? ' ' + c : c);
        continue;
      }
      let S = !!C,
        k = t(S ? P.substring(0, C) : P);
      if (!k) {
        if (!S) {
          c = f + (c.length > 0 ? ' ' + c : c);
          continue;
        }
        if (((k = t(P)), !k)) {
          c = f + (c.length > 0 ? ' ' + c : c);
          continue;
        }
        S = !1;
      }
      const _ = m.length === 0 ? '' : m.length === 1 ? m[0] : l(m).join(':'),
        u = A ? _ + Yr : _,
        E = u + k;
      if (n.indexOf(E) > -1) continue;
      n.push(E);
      const M = s(k, S);
      for (let h = 0; h < M.length; ++h) {
        const v = M[h];
        n.push(u + v);
      }
      c = f + (c.length > 0 ? ' ' + c : c);
    }
    return c;
  },
  Ko = (...r) => {
    let e = 0,
      a,
      t,
      s = '';
    for (; e < r.length; ) (a = r[e++]) && (t = Wt(a)) && (s && (s += ' '), (s += t));
    return s;
  },
  Wt = (r) => {
    if (typeof r == 'string') return r;
    let e,
      a = '';
    for (let t = 0; t < r.length; t++) r[t] && (e = Wt(r[t])) && (a && (a += ' '), (a += e));
    return a;
  },
  Kr = (r, ...e) => {
    let a, t, s, l;
    const n = (c) => {
        const g = e.reduce((f, p) => p(f), r());
        return ((a = Wo(g)), (t = a.cache.get), (s = a.cache.set), (l = d), d(c));
      },
      d = (c) => {
        const g = t(c);
        if (g) return g;
        const f = Yo(c, a);
        return (s(c, f), f);
      };
    return ((l = n), (...c) => l(Ko(...c)));
  },
  Jo = [],
  ke = (r) => {
    const e = (a) => a[r] || Jo;
    return ((e.isThemeGetter = !0), e);
  },
  qt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Yt = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Zo = /^\d+\/\d+$/,
  Xo = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Qo =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  $o = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  e0 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  r0 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  er = (r) => Zo.test(r),
  Q = (r) => !!r && !Number.isNaN(Number(r)),
  qe = (r) => !!r && Number.isInteger(Number(r)),
  Fr = (r) => r.endsWith('%') && Q(r.slice(0, -1)),
  De = (r) => Xo.test(r),
  t0 = () => !0,
  a0 = (r) => Qo.test(r) && !$o.test(r),
  Kt = () => !1,
  o0 = (r) => e0.test(r),
  s0 = (r) => r0.test(r),
  l0 = (r) => !L(r) && !O(r),
  n0 = (r) => or(r, Xt, Kt),
  L = (r) => qt.test(r),
  Ze = (r) => or(r, Qt, a0),
  Gr = (r) => or(r, u0, Q),
  mt = (r) => or(r, Jt, Kt),
  i0 = (r) => or(r, Zt, s0),
  hr = (r) => or(r, $t, o0),
  O = (r) => Yt.test(r),
  cr = (r) => sr(r, Qt),
  d0 = (r) => sr(r, b0),
  xt = (r) => sr(r, Jt),
  g0 = (r) => sr(r, Xt),
  c0 = (r) => sr(r, Zt),
  vr = (r) => sr(r, $t, !0),
  or = (r, e, a) => {
    const t = qt.exec(r);
    return t ? (t[1] ? e(t[1]) : a(t[2])) : !1;
  },
  sr = (r, e, a = !1) => {
    const t = Yt.exec(r);
    return t ? (t[1] ? e(t[1]) : a) : !1;
  },
  Jt = (r) => r === 'position' || r === 'percentage',
  Zt = (r) => r === 'image' || r === 'url',
  Xt = (r) => r === 'length' || r === 'size' || r === 'bg-size',
  Qt = (r) => r === 'length',
  u0 = (r) => r === 'number',
  b0 = (r) => r === 'family-name',
  $t = (r) => r === 'shadow',
  Jr = () => {
    const r = ke('color'),
      e = ke('font'),
      a = ke('text'),
      t = ke('font-weight'),
      s = ke('tracking'),
      l = ke('leading'),
      n = ke('breakpoint'),
      d = ke('container'),
      c = ke('spacing'),
      g = ke('radius'),
      f = ke('shadow'),
      p = ke('inset-shadow'),
      m = ke('text-shadow'),
      A = ke('drop-shadow'),
      P = ke('blur'),
      C = ke('perspective'),
      S = ke('aspect'),
      k = ke('ease'),
      _ = ke('animate'),
      u = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'],
      E = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
      ],
      M = () => [...E(), O, L],
      h = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      v = () => ['auto', 'contain', 'none'],
      b = () => [O, L, c],
      B = () => [er, 'full', 'auto', ...b()],
      D = () => [qe, 'none', 'subgrid', O, L],
      F = () => ['auto', {span: ['full', qe, O, L]}, qe, O, L],
      V = () => [qe, 'auto', O, L],
      j = () => ['auto', 'min', 'max', 'fr', O, L],
      N = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
        'center-safe',
        'end-safe',
      ],
      x = () => ['start', 'end', 'center', 'stretch', 'center-safe', 'end-safe'],
      w = () => ['auto', ...b()],
      I = () => [er, 'auto', 'full', 'dvw', 'dvh', 'lvw', 'lvh', 'svw', 'svh', 'min', 'max', 'fit', ...b()],
      y = () => [r, O, L],
      U = () => [...E(), xt, mt, {position: [O, L]}],
      W = () => ['no-repeat', {repeat: ['', 'x', 'y', 'space', 'round']}],
      se = () => ['auto', 'cover', 'contain', g0, n0, {size: [O, L]}],
      K = () => [Fr, cr, Ze],
      q = () => ['', 'none', 'full', g, O, L],
      te = () => ['', Q, cr, Ze],
      ne = () => ['solid', 'dashed', 'dotted', 'double'],
      Ee = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      pe = () => [Q, Fr, xt, mt],
      Je = () => ['', 'none', P, O, L],
      Ie = () => ['none', Q, O, L],
      Le = () => ['none', Q, O, L],
      Oe = () => [Q, O, L],
      Re = () => [er, 'full', ...b()];
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [De],
        breakpoint: [De],
        color: [t0],
        container: [De],
        'drop-shadow': [De],
        ease: ['in', 'out', 'in-out'],
        font: [l0],
        'font-weight': ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
        'inset-shadow': [De],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: ['dramatic', 'near', 'normal', 'midrange', 'distant', 'none'],
        radius: [De],
        shadow: [De],
        spacing: ['px', Q],
        text: [De],
        'text-shadow': [De],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{aspect: ['auto', 'square', er, L, O, S]}],
        container: ['container'],
        columns: [{columns: [Q, L, O, d]}],
        'break-after': [{'break-after': u()}],
        'break-before': [{'break-before': u()}],
        'break-inside': [{'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']}],
        'box-decoration': [{'box-decoration': ['slice', 'clone']}],
        box: [{box: ['border', 'content']}],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{float: ['right', 'left', 'none', 'start', 'end']}],
        clear: [{clear: ['left', 'right', 'both', 'none', 'start', 'end']}],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [{object: ['contain', 'cover', 'fill', 'none', 'scale-down']}],
        'object-position': [{object: M()}],
        overflow: [{overflow: h()}],
        'overflow-x': [{'overflow-x': h()}],
        'overflow-y': [{'overflow-y': h()}],
        overscroll: [{overscroll: v()}],
        'overscroll-x': [{'overscroll-x': v()}],
        'overscroll-y': [{'overscroll-y': v()}],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{inset: B()}],
        'inset-x': [{'inset-x': B()}],
        'inset-y': [{'inset-y': B()}],
        start: [{start: B()}],
        end: [{end: B()}],
        top: [{top: B()}],
        right: [{right: B()}],
        bottom: [{bottom: B()}],
        left: [{left: B()}],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{z: [qe, 'auto', O, L]}],
        basis: [{basis: [er, 'full', 'auto', d, ...b()]}],
        'flex-direction': [{flex: ['row', 'row-reverse', 'col', 'col-reverse']}],
        'flex-wrap': [{flex: ['nowrap', 'wrap', 'wrap-reverse']}],
        flex: [{flex: [Q, er, 'auto', 'initial', 'none', L]}],
        grow: [{grow: ['', Q, O, L]}],
        shrink: [{shrink: ['', Q, O, L]}],
        order: [{order: [qe, 'first', 'last', 'none', O, L]}],
        'grid-cols': [{'grid-cols': D()}],
        'col-start-end': [{col: F()}],
        'col-start': [{'col-start': V()}],
        'col-end': [{'col-end': V()}],
        'grid-rows': [{'grid-rows': D()}],
        'row-start-end': [{row: F()}],
        'row-start': [{'row-start': V()}],
        'row-end': [{'row-end': V()}],
        'grid-flow': [{'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']}],
        'auto-cols': [{'auto-cols': j()}],
        'auto-rows': [{'auto-rows': j()}],
        gap: [{gap: b()}],
        'gap-x': [{'gap-x': b()}],
        'gap-y': [{'gap-y': b()}],
        'justify-content': [{justify: [...N(), 'normal']}],
        'justify-items': [{'justify-items': [...x(), 'normal']}],
        'justify-self': [{'justify-self': ['auto', ...x()]}],
        'align-content': [{content: ['normal', ...N()]}],
        'align-items': [{items: [...x(), {baseline: ['', 'last']}]}],
        'align-self': [{self: ['auto', ...x(), {baseline: ['', 'last']}]}],
        'place-content': [{'place-content': N()}],
        'place-items': [{'place-items': [...x(), 'baseline']}],
        'place-self': [{'place-self': ['auto', ...x()]}],
        p: [{p: b()}],
        px: [{px: b()}],
        py: [{py: b()}],
        ps: [{ps: b()}],
        pe: [{pe: b()}],
        pt: [{pt: b()}],
        pr: [{pr: b()}],
        pb: [{pb: b()}],
        pl: [{pl: b()}],
        m: [{m: w()}],
        mx: [{mx: w()}],
        my: [{my: w()}],
        ms: [{ms: w()}],
        me: [{me: w()}],
        mt: [{mt: w()}],
        mr: [{mr: w()}],
        mb: [{mb: w()}],
        ml: [{ml: w()}],
        'space-x': [{'space-x': b()}],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{'space-y': b()}],
        'space-y-reverse': ['space-y-reverse'],
        size: [{size: I()}],
        w: [{w: [d, 'screen', ...I()]}],
        'min-w': [{'min-w': [d, 'screen', 'none', ...I()]}],
        'max-w': [{'max-w': [d, 'screen', 'none', 'prose', {screen: [n]}, ...I()]}],
        h: [{h: ['screen', 'lh', ...I()]}],
        'min-h': [{'min-h': ['screen', 'lh', 'none', ...I()]}],
        'max-h': [{'max-h': ['screen', 'lh', ...I()]}],
        'font-size': [{text: ['base', a, cr, Ze]}],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{font: [t, O, Gr]}],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              Fr,
              L,
            ],
          },
        ],
        'font-family': [{font: [d0, L, e]}],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{tracking: [s, O, L]}],
        'line-clamp': [{'line-clamp': [Q, 'none', O, Gr]}],
        leading: [{leading: [l, ...b()]}],
        'list-image': [{'list-image': ['none', O, L]}],
        'list-style-position': [{list: ['inside', 'outside']}],
        'list-style-type': [{list: ['disc', 'decimal', 'none', O, L]}],
        'text-alignment': [{text: ['left', 'center', 'right', 'justify', 'start', 'end']}],
        'placeholder-color': [{placeholder: y()}],
        'text-color': [{text: y()}],
        'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
        'text-decoration-style': [{decoration: [...ne(), 'wavy']}],
        'text-decoration-thickness': [{decoration: [Q, 'from-font', 'auto', O, Ze]}],
        'text-decoration-color': [{decoration: y()}],
        'underline-offset': [{'underline-offset': [Q, 'auto', O, L]}],
        'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{text: ['wrap', 'nowrap', 'balance', 'pretty']}],
        indent: [{indent: b()}],
        'vertical-align': [
          {align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', O, L]},
        ],
        whitespace: [{whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']}],
        break: [{break: ['normal', 'words', 'all', 'keep']}],
        wrap: [{wrap: ['break-word', 'anywhere', 'normal']}],
        hyphens: [{hyphens: ['none', 'manual', 'auto']}],
        content: [{content: ['none', O, L]}],
        'bg-attachment': [{bg: ['fixed', 'local', 'scroll']}],
        'bg-clip': [{'bg-clip': ['border', 'padding', 'content', 'text']}],
        'bg-origin': [{'bg-origin': ['border', 'padding', 'content']}],
        'bg-position': [{bg: U()}],
        'bg-repeat': [{bg: W()}],
        'bg-size': [{bg: se()}],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [{to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']}, qe, O, L],
                radial: ['', O, L],
                conic: [qe, O, L],
              },
              c0,
              i0,
            ],
          },
        ],
        'bg-color': [{bg: y()}],
        'gradient-from-pos': [{from: K()}],
        'gradient-via-pos': [{via: K()}],
        'gradient-to-pos': [{to: K()}],
        'gradient-from': [{from: y()}],
        'gradient-via': [{via: y()}],
        'gradient-to': [{to: y()}],
        rounded: [{rounded: q()}],
        'rounded-s': [{'rounded-s': q()}],
        'rounded-e': [{'rounded-e': q()}],
        'rounded-t': [{'rounded-t': q()}],
        'rounded-r': [{'rounded-r': q()}],
        'rounded-b': [{'rounded-b': q()}],
        'rounded-l': [{'rounded-l': q()}],
        'rounded-ss': [{'rounded-ss': q()}],
        'rounded-se': [{'rounded-se': q()}],
        'rounded-ee': [{'rounded-ee': q()}],
        'rounded-es': [{'rounded-es': q()}],
        'rounded-tl': [{'rounded-tl': q()}],
        'rounded-tr': [{'rounded-tr': q()}],
        'rounded-br': [{'rounded-br': q()}],
        'rounded-bl': [{'rounded-bl': q()}],
        'border-w': [{border: te()}],
        'border-w-x': [{'border-x': te()}],
        'border-w-y': [{'border-y': te()}],
        'border-w-s': [{'border-s': te()}],
        'border-w-e': [{'border-e': te()}],
        'border-w-t': [{'border-t': te()}],
        'border-w-r': [{'border-r': te()}],
        'border-w-b': [{'border-b': te()}],
        'border-w-l': [{'border-l': te()}],
        'divide-x': [{'divide-x': te()}],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{'divide-y': te()}],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [{border: [...ne(), 'hidden', 'none']}],
        'divide-style': [{divide: [...ne(), 'hidden', 'none']}],
        'border-color': [{border: y()}],
        'border-color-x': [{'border-x': y()}],
        'border-color-y': [{'border-y': y()}],
        'border-color-s': [{'border-s': y()}],
        'border-color-e': [{'border-e': y()}],
        'border-color-t': [{'border-t': y()}],
        'border-color-r': [{'border-r': y()}],
        'border-color-b': [{'border-b': y()}],
        'border-color-l': [{'border-l': y()}],
        'divide-color': [{divide: y()}],
        'outline-style': [{outline: [...ne(), 'none', 'hidden']}],
        'outline-offset': [{'outline-offset': [Q, O, L]}],
        'outline-w': [{outline: ['', Q, cr, Ze]}],
        'outline-color': [{outline: y()}],
        shadow: [{shadow: ['', 'none', f, vr, hr]}],
        'shadow-color': [{shadow: y()}],
        'inset-shadow': [{'inset-shadow': ['none', p, vr, hr]}],
        'inset-shadow-color': [{'inset-shadow': y()}],
        'ring-w': [{ring: te()}],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ring: y()}],
        'ring-offset-w': [{'ring-offset': [Q, Ze]}],
        'ring-offset-color': [{'ring-offset': y()}],
        'inset-ring-w': [{'inset-ring': te()}],
        'inset-ring-color': [{'inset-ring': y()}],
        'text-shadow': [{'text-shadow': ['none', m, vr, hr]}],
        'text-shadow-color': [{'text-shadow': y()}],
        opacity: [{opacity: [Q, O, L]}],
        'mix-blend': [{'mix-blend': [...Ee(), 'plus-darker', 'plus-lighter']}],
        'bg-blend': [{'bg-blend': Ee()}],
        'mask-clip': [{'mask-clip': ['border', 'padding', 'content', 'fill', 'stroke', 'view']}, 'mask-no-clip'],
        'mask-composite': [{mask: ['add', 'subtract', 'intersect', 'exclude']}],
        'mask-image-linear-pos': [{'mask-linear': [Q]}],
        'mask-image-linear-from-pos': [{'mask-linear-from': pe()}],
        'mask-image-linear-to-pos': [{'mask-linear-to': pe()}],
        'mask-image-linear-from-color': [{'mask-linear-from': y()}],
        'mask-image-linear-to-color': [{'mask-linear-to': y()}],
        'mask-image-t-from-pos': [{'mask-t-from': pe()}],
        'mask-image-t-to-pos': [{'mask-t-to': pe()}],
        'mask-image-t-from-color': [{'mask-t-from': y()}],
        'mask-image-t-to-color': [{'mask-t-to': y()}],
        'mask-image-r-from-pos': [{'mask-r-from': pe()}],
        'mask-image-r-to-pos': [{'mask-r-to': pe()}],
        'mask-image-r-from-color': [{'mask-r-from': y()}],
        'mask-image-r-to-color': [{'mask-r-to': y()}],
        'mask-image-b-from-pos': [{'mask-b-from': pe()}],
        'mask-image-b-to-pos': [{'mask-b-to': pe()}],
        'mask-image-b-from-color': [{'mask-b-from': y()}],
        'mask-image-b-to-color': [{'mask-b-to': y()}],
        'mask-image-l-from-pos': [{'mask-l-from': pe()}],
        'mask-image-l-to-pos': [{'mask-l-to': pe()}],
        'mask-image-l-from-color': [{'mask-l-from': y()}],
        'mask-image-l-to-color': [{'mask-l-to': y()}],
        'mask-image-x-from-pos': [{'mask-x-from': pe()}],
        'mask-image-x-to-pos': [{'mask-x-to': pe()}],
        'mask-image-x-from-color': [{'mask-x-from': y()}],
        'mask-image-x-to-color': [{'mask-x-to': y()}],
        'mask-image-y-from-pos': [{'mask-y-from': pe()}],
        'mask-image-y-to-pos': [{'mask-y-to': pe()}],
        'mask-image-y-from-color': [{'mask-y-from': y()}],
        'mask-image-y-to-color': [{'mask-y-to': y()}],
        'mask-image-radial': [{'mask-radial': [O, L]}],
        'mask-image-radial-from-pos': [{'mask-radial-from': pe()}],
        'mask-image-radial-to-pos': [{'mask-radial-to': pe()}],
        'mask-image-radial-from-color': [{'mask-radial-from': y()}],
        'mask-image-radial-to-color': [{'mask-radial-to': y()}],
        'mask-image-radial-shape': [{'mask-radial': ['circle', 'ellipse']}],
        'mask-image-radial-size': [{'mask-radial': [{closest: ['side', 'corner'], farthest: ['side', 'corner']}]}],
        'mask-image-radial-pos': [{'mask-radial-at': E()}],
        'mask-image-conic-pos': [{'mask-conic': [Q]}],
        'mask-image-conic-from-pos': [{'mask-conic-from': pe()}],
        'mask-image-conic-to-pos': [{'mask-conic-to': pe()}],
        'mask-image-conic-from-color': [{'mask-conic-from': y()}],
        'mask-image-conic-to-color': [{'mask-conic-to': y()}],
        'mask-mode': [{mask: ['alpha', 'luminance', 'match']}],
        'mask-origin': [{'mask-origin': ['border', 'padding', 'content', 'fill', 'stroke', 'view']}],
        'mask-position': [{mask: U()}],
        'mask-repeat': [{mask: W()}],
        'mask-size': [{mask: se()}],
        'mask-type': [{'mask-type': ['alpha', 'luminance']}],
        'mask-image': [{mask: ['none', O, L]}],
        filter: [{filter: ['', 'none', O, L]}],
        blur: [{blur: Je()}],
        brightness: [{brightness: [Q, O, L]}],
        contrast: [{contrast: [Q, O, L]}],
        'drop-shadow': [{'drop-shadow': ['', 'none', A, vr, hr]}],
        'drop-shadow-color': [{'drop-shadow': y()}],
        grayscale: [{grayscale: ['', Q, O, L]}],
        'hue-rotate': [{'hue-rotate': [Q, O, L]}],
        invert: [{invert: ['', Q, O, L]}],
        saturate: [{saturate: [Q, O, L]}],
        sepia: [{sepia: ['', Q, O, L]}],
        'backdrop-filter': [{'backdrop-filter': ['', 'none', O, L]}],
        'backdrop-blur': [{'backdrop-blur': Je()}],
        'backdrop-brightness': [{'backdrop-brightness': [Q, O, L]}],
        'backdrop-contrast': [{'backdrop-contrast': [Q, O, L]}],
        'backdrop-grayscale': [{'backdrop-grayscale': ['', Q, O, L]}],
        'backdrop-hue-rotate': [{'backdrop-hue-rotate': [Q, O, L]}],
        'backdrop-invert': [{'backdrop-invert': ['', Q, O, L]}],
        'backdrop-opacity': [{'backdrop-opacity': [Q, O, L]}],
        'backdrop-saturate': [{'backdrop-saturate': [Q, O, L]}],
        'backdrop-sepia': [{'backdrop-sepia': ['', Q, O, L]}],
        'border-collapse': [{border: ['collapse', 'separate']}],
        'border-spacing': [{'border-spacing': b()}],
        'border-spacing-x': [{'border-spacing-x': b()}],
        'border-spacing-y': [{'border-spacing-y': b()}],
        'table-layout': [{table: ['auto', 'fixed']}],
        caption: [{caption: ['top', 'bottom']}],
        transition: [{transition: ['', 'all', 'colors', 'opacity', 'shadow', 'transform', 'none', O, L]}],
        'transition-behavior': [{transition: ['normal', 'discrete']}],
        duration: [{duration: [Q, 'initial', O, L]}],
        ease: [{ease: ['linear', 'initial', k, O, L]}],
        delay: [{delay: [Q, O, L]}],
        animate: [{animate: ['none', _, O, L]}],
        backface: [{backface: ['hidden', 'visible']}],
        perspective: [{perspective: [C, O, L]}],
        'perspective-origin': [{'perspective-origin': M()}],
        rotate: [{rotate: Ie()}],
        'rotate-x': [{'rotate-x': Ie()}],
        'rotate-y': [{'rotate-y': Ie()}],
        'rotate-z': [{'rotate-z': Ie()}],
        scale: [{scale: Le()}],
        'scale-x': [{'scale-x': Le()}],
        'scale-y': [{'scale-y': Le()}],
        'scale-z': [{'scale-z': Le()}],
        'scale-3d': ['scale-3d'],
        skew: [{skew: Oe()}],
        'skew-x': [{'skew-x': Oe()}],
        'skew-y': [{'skew-y': Oe()}],
        transform: [{transform: [O, L, '', 'none', 'gpu', 'cpu']}],
        'transform-origin': [{origin: M()}],
        'transform-style': [{transform: ['3d', 'flat']}],
        translate: [{translate: Re()}],
        'translate-x': [{'translate-x': Re()}],
        'translate-y': [{'translate-y': Re()}],
        'translate-z': [{'translate-z': Re()}],
        'translate-none': ['translate-none'],
        accent: [{accent: y()}],
        appearance: [{appearance: ['none', 'auto']}],
        'caret-color': [{caret: y()}],
        'color-scheme': [{scheme: ['normal', 'dark', 'light', 'light-dark', 'only-dark', 'only-light']}],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              O,
              L,
            ],
          },
        ],
        'field-sizing': [{'field-sizing': ['fixed', 'content']}],
        'pointer-events': [{'pointer-events': ['auto', 'none']}],
        resize: [{resize: ['none', '', 'y', 'x']}],
        'scroll-behavior': [{scroll: ['auto', 'smooth']}],
        'scroll-m': [{'scroll-m': b()}],
        'scroll-mx': [{'scroll-mx': b()}],
        'scroll-my': [{'scroll-my': b()}],
        'scroll-ms': [{'scroll-ms': b()}],
        'scroll-me': [{'scroll-me': b()}],
        'scroll-mt': [{'scroll-mt': b()}],
        'scroll-mr': [{'scroll-mr': b()}],
        'scroll-mb': [{'scroll-mb': b()}],
        'scroll-ml': [{'scroll-ml': b()}],
        'scroll-p': [{'scroll-p': b()}],
        'scroll-px': [{'scroll-px': b()}],
        'scroll-py': [{'scroll-py': b()}],
        'scroll-ps': [{'scroll-ps': b()}],
        'scroll-pe': [{'scroll-pe': b()}],
        'scroll-pt': [{'scroll-pt': b()}],
        'scroll-pr': [{'scroll-pr': b()}],
        'scroll-pb': [{'scroll-pb': b()}],
        'scroll-pl': [{'scroll-pl': b()}],
        'snap-align': [{snap: ['start', 'end', 'center', 'align-none']}],
        'snap-stop': [{snap: ['normal', 'always']}],
        'snap-type': [{snap: ['none', 'x', 'y', 'both']}],
        'snap-strictness': [{snap: ['mandatory', 'proximity']}],
        touch: [{touch: ['auto', 'none', 'manipulation']}],
        'touch-x': [{'touch-pan': ['x', 'left', 'right']}],
        'touch-y': [{'touch-pan': ['y', 'up', 'down']}],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{select: ['none', 'text', 'all', 'auto']}],
        'will-change': [{'will-change': ['auto', 'scroll', 'contents', 'transform', O, L]}],
        fill: [{fill: ['none', ...y()]}],
        'stroke-w': [{stroke: [Q, cr, Ze, Gr]}],
        stroke: [{stroke: ['none', ...y()]}],
        'forced-color-adjust': [{'forced-color-adjust': ['auto', 'none']}],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': ['translate', 'translate-x', 'translate-y', 'translate-z'],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: {'font-size': ['leading']},
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    };
  },
  f0 = (r, {cacheSize: e, prefix: a, experimentalParseClassName: t, extend: s = {}, override: l = {}}) => (
    ur(r, 'cacheSize', e),
    ur(r, 'prefix', a),
    ur(r, 'experimentalParseClassName', t),
    wr(r.theme, l.theme),
    wr(r.classGroups, l.classGroups),
    wr(r.conflictingClassGroups, l.conflictingClassGroups),
    wr(r.conflictingClassGroupModifiers, l.conflictingClassGroupModifiers),
    ur(r, 'orderSensitiveModifiers', l.orderSensitiveModifiers),
    Cr(r.theme, s.theme),
    Cr(r.classGroups, s.classGroups),
    Cr(r.conflictingClassGroups, s.conflictingClassGroups),
    Cr(r.conflictingClassGroupModifiers, s.conflictingClassGroupModifiers),
    ea(r, s, 'orderSensitiveModifiers'),
    r
  ),
  ur = (r, e, a) => {
    a !== void 0 && (r[e] = a);
  },
  wr = (r, e) => {
    if (e) for (const a in e) ur(r, a, e[a]);
  },
  Cr = (r, e) => {
    if (e) for (const a in e) ea(r, e, a);
  },
  ea = (r, e, a) => {
    const t = e[a];
    t !== void 0 && (r[a] = r[a] ? r[a].concat(t) : t);
  },
  p0 = (r, ...e) => (typeof r == 'function' ? Kr(Jr, r, ...e) : Kr(() => f0(Jr(), r), ...e)),
  y0 = Kr(Jr);
var m0 = /\s+/g,
  x0 = (r) => (typeof r != 'string' || !r ? r : r.replace(m0, ' ').trim()),
  Nr = (...r) => {
    const e = [],
      a = (t) => {
        if (!t && t !== 0 && t !== 0n) return;
        if (Array.isArray(t)) {
          for (let l = 0, n = t.length; l < n; l++) a(t[l]);
          return;
        }
        const s = typeof t;
        if (s === 'string' || s === 'number' || s === 'bigint') {
          if (s === 'number' && t !== t) return;
          e.push(String(t));
        } else if (s === 'object') {
          const l = Object.keys(t);
          for (let n = 0, d = l.length; n < d; n++) {
            const c = l[n];
            t[c] && e.push(c);
          }
        }
      };
    for (let t = 0, s = r.length; t < s; t++) {
      const l = r[t];
      l != null && a(l);
    }
    return e.length > 0 ? x0(e.join(' ')) : void 0;
  },
  kt = (r) => (r === !1 ? 'false' : r === !0 ? 'true' : r === 0 ? '0' : r),
  ze = (r) => {
    if (!r || typeof r != 'object') return !0;
    for (const e in r) return !1;
    return !0;
  },
  k0 = (r, e) => {
    if (r === e) return !0;
    if (!r || !e) return !1;
    const a = Object.keys(r),
      t = Object.keys(e);
    if (a.length !== t.length) return !1;
    for (let s = 0; s < a.length; s++) {
      const l = a[s];
      if (!t.includes(l) || r[l] !== e[l]) return !1;
    }
    return !0;
  },
  h0 = (r, e) => {
    for (const a in e)
      if (Object.prototype.hasOwnProperty.call(e, a)) {
        const t = e[a];
        a in r ? (r[a] = Nr(r[a], t)) : (r[a] = t);
      }
    return r;
  },
  ra = (r, e) => {
    for (let a = 0; a < r.length; a++) {
      const t = r[a];
      Array.isArray(t) ? ra(t, e) : t && e.push(t);
    }
  },
  ta = (...r) => {
    const e = [];
    ra(r, e);
    const a = [];
    for (let t = 0; t < e.length; t++) e[t] && a.push(e[t]);
    return a;
  },
  Zr = (r, e) => {
    const a = {};
    for (const t in r) {
      const s = r[t];
      if (t in e) {
        const l = e[t];
        Array.isArray(s) || Array.isArray(l)
          ? (a[t] = ta(l, s))
          : typeof s == 'object' && typeof l == 'object' && s && l
            ? (a[t] = Zr(s, l))
            : (a[t] = l + ' ' + s);
      } else a[t] = s;
    }
    for (const t in e) t in r || (a[t] = e[t]);
    return a;
  },
  v0 = {twMerge: !0, twMergeConfig: {}};
function w0() {
  let r = null,
    e = {},
    a = !1;
  return {
    get cachedTwMerge() {
      return r;
    },
    set cachedTwMerge(t) {
      r = t;
    },
    get cachedTwMergeConfig() {
      return e;
    },
    set cachedTwMergeConfig(t) {
      e = t;
    },
    get didTwMergeConfigChange() {
      return a;
    },
    set didTwMergeConfigChange(t) {
      a = t;
    },
    reset() {
      ((r = null), (e = {}), (a = !1));
    },
  };
}
var Fe = w0(),
  C0 = (r) => {
    const e = (t, s) => {
      const {
          extend: l = null,
          slots: n = {},
          variants: d = {},
          compoundVariants: c = [],
          compoundSlots: g = [],
          defaultVariants: f = {},
        } = t,
        p = {...v0, ...s},
        m = l?.base ? Nr(l.base, t?.base) : t?.base,
        A = l?.variants && !ze(l.variants) ? Zr(d, l.variants) : d,
        P = l?.defaultVariants && !ze(l.defaultVariants) ? {...l.defaultVariants, ...f} : f;
      !ze(p.twMergeConfig) &&
        !k0(p.twMergeConfig, Fe.cachedTwMergeConfig) &&
        ((Fe.didTwMergeConfigChange = !0), (Fe.cachedTwMergeConfig = p.twMergeConfig));
      const C = ze(l?.slots),
        S = ze(n) ? {} : {base: Nr(t?.base, C && l?.base), ...n},
        k = C ? S : h0({...l?.slots}, ze(S) ? {base: t?.base} : S),
        _ = ze(l?.compoundVariants) ? c : ta(l?.compoundVariants, c),
        u = (M) => {
          if (ze(A) && ze(n) && C) return r(m, M?.class, M?.className)(p);
          if (_ && !Array.isArray(_))
            throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof _}`);
          if (g && !Array.isArray(g))
            throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof g}`);
          const h = (N, x = A, w = null, I = null) => {
              const y = x[N];
              if (!y || ze(y)) return null;
              const U = I?.[N] ?? M?.[N];
              if (U === null) return null;
              const W = kt(U);
              if (typeof W == 'object') return null;
              const se = P?.[N],
                K = W ?? kt(se);
              return y[K || 'false'];
            },
            v = () => {
              if (!A) return null;
              const N = Object.keys(A),
                x = [];
              for (let w = 0; w < N.length; w++) {
                const I = h(N[w], A);
                I && x.push(I);
              }
              return x;
            },
            b = (N, x) => {
              if (!A || typeof A != 'object') return null;
              const w = [];
              for (const I in A) {
                const y = h(I, A, N, x),
                  U = N === 'base' && typeof y == 'string' ? y : y && y[N];
                U && w.push(U);
              }
              return w;
            },
            B = {};
          for (const N in M) {
            const x = M[N];
            x !== void 0 && (B[N] = x);
          }
          const D = (N, x) => {
              const w = typeof M?.[N] == 'object' ? {[N]: M[N]?.initial} : {};
              return {...P, ...B, ...w, ...x};
            },
            F = (N = [], x) => {
              const w = [],
                I = N.length;
              for (let y = 0; y < I; y++) {
                const {class: U, className: W, ...se} = N[y];
                let K = !0;
                const q = D(null, x);
                for (const te in se) {
                  const ne = se[te],
                    Ee = q[te];
                  if (Array.isArray(ne)) {
                    if (!ne.includes(Ee)) {
                      K = !1;
                      break;
                    }
                  } else {
                    if ((ne == null || ne === !1) && (Ee == null || Ee === !1)) continue;
                    if (Ee !== ne) {
                      K = !1;
                      break;
                    }
                  }
                }
                K && (U && w.push(U), W && w.push(W));
              }
              return w;
            },
            V = (N) => {
              const x = F(_, N);
              if (!Array.isArray(x)) return x;
              const w = {},
                I = r;
              for (let y = 0; y < x.length; y++) {
                const U = x[y];
                if (typeof U == 'string') w.base = I(w.base, U)(p);
                else if (typeof U == 'object') for (const W in U) w[W] = I(w[W], U[W])(p);
              }
              return w;
            },
            j = (N) => {
              if (g.length < 1) return null;
              const x = {},
                w = D(null, N);
              for (let I = 0; I < g.length; I++) {
                const {slots: y = [], class: U, className: W, ...se} = g[I];
                if (!ze(se)) {
                  let K = !0;
                  for (const q in se) {
                    const te = w[q],
                      ne = se[q];
                    if (te === void 0 || (Array.isArray(ne) ? !ne.includes(te) : ne !== te)) {
                      K = !1;
                      break;
                    }
                  }
                  if (!K) continue;
                }
                for (let K = 0; K < y.length; K++) {
                  const q = y[K];
                  (x[q] || (x[q] = []), x[q].push([U, W]));
                }
              }
              return x;
            };
          if (!ze(n) || !C) {
            const N = {};
            if (typeof k == 'object' && !ze(k)) {
              const x = r;
              for (const w in k)
                N[w] = (I) => {
                  const y = V(I),
                    U = j(I);
                  return x(k[w], b(w, I), y ? y[w] : void 0, U ? U[w] : void 0, I?.class, I?.className)(p);
                };
            }
            return N;
          }
          return r(m, v(), F(_), M?.class, M?.className)(p);
        },
        E = () => {
          if (!(!A || typeof A != 'object')) return Object.keys(A);
        };
      return (
        (u.variantKeys = E()),
        (u.extend = l),
        (u.base = m),
        (u.slots = k),
        (u.variants = A),
        (u.defaultVariants = P),
        (u.compoundSlots = g),
        (u.compoundVariants = _),
        u
      );
    };
    return {tv: e, createTV: (t) => (s, l) => e(s, l ? Zr(t, l) : t)};
  },
  _0 = (r) =>
    ze(r)
      ? y0
      : p0({
          ...r,
          extend: {
            theme: r.theme,
            classGroups: r.classGroups,
            conflictingClassGroupModifiers: r.conflictingClassGroupModifiers,
            conflictingClassGroups: r.conflictingClassGroups,
            ...r.extend,
          },
        }),
  z0 = (r, e) => {
    const a = Nr(r);
    return !a || !(e?.twMerge ?? !0)
      ? a
      : ((!Fe.cachedTwMerge || Fe.didTwMergeConfigChange) &&
          ((Fe.didTwMergeConfigChange = !1), (Fe.cachedTwMerge = _0(Fe.cachedTwMergeConfig))),
        Fe.cachedTwMerge(a) || void 0);
  },
  A0 =
    (...r) =>
    (e) =>
      z0(r, e),
  {tv: i} = C0(A0);
const V0 = i({
    base: 'focus:outline-hidden whitespace-normal disabled:cursor-not-allowed disabled:opacity-50',
    variants: {
      color: {
        primary:
          'text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300',
        secondary:
          'text-secondary-500 focus:ring-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-800 dark:hover:text-secondary-300',
        gray: 'text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300',
        red: 'text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300',
        orange:
          'text-orange-500 focus:ring-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800 dark:hover:text-orange-300',
        amber:
          'text-amber-500 focus:ring-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800 dark:hover:text-amber-300',
        yellow:
          'text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300',
        lime: 'text-lime-500 focus:ring-lime-400 hover:bg-lime-200 dark:hover:bg-lime-800 dark:hover:text-lime-300',
        green:
          'text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300',
        emerald:
          'text-emerald-500 focus:ring-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800 dark:hover:text-emerald-300',
        teal: 'text-teal-500 focus:ring-teal-400 hover:bg-teal-200 dark:hover:bg-teal-800 dark:hover:text-teal-300',
        cyan: 'text-cyan-500 focus:ring-cyan-400 hover:bg-cyan-200 dark:hover:bg-cyan-800 dark:hover:text-cyan-300',
        sky: 'text-sky-500 focus:ring-sky-400 hover:bg-sky-200 dark:hover:bg-sky-800 dark:hover:text-sky-300',
        blue: 'text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300',
        indigo:
          'text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300',
        violet:
          'text-violet-500 focus:ring-violet-400 hover:bg-violet-200 dark:hover:bg-violet-800 dark:hover:text-violet-300',
        purple:
          'text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300',
        fuchsia:
          'text-fuchsia-500 focus:ring-fuchsia-400 hover:bg-fuchsia-200 dark:hover:bg-fuchsia-800 dark:hover:text-fuchsia-300',
        pink: 'text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300',
        rose: 'text-rose-500 focus:ring-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800 dark:hover:text-rose-300',
        none: '',
      },
      size: {
        xs: 'm-0.5 rounded-xs focus:ring-1 p-0.5',
        sm: 'm-0.5 rounded-sm focus:ring-1 p-0.5',
        md: 'm-0.5 rounded-lg focus:ring-2 p-1.5',
        lg: 'm-0.5 rounded-lg focus:ring-2 p-2.5',
      },
    },
    defaultVariants: {color: 'gray', size: 'md', href: null},
    slots: {svg: ''},
    compoundVariants: [
      {size: 'xs', class: {svg: 'w-3 h-3'}},
      {size: 'sm', class: {svg: 'w-3.5 h-3.5'}},
      {size: ['md', 'lg'], class: {svg: 'w-5 h-5'}},
      {size: ['xs', 'sm', 'md', 'lg'], color: 'none', class: 'focus:ring-0 rounded-none m-0'},
    ],
  }),
  aa = Symbol('dismissable');
function Mr(r) {
  return Ha(aa, {dismiss: r});
}
function T0() {
  return St(aa);
}
var S0 = X('<span class="sr-only"> </span>'),
  P0 = Ke(
    '<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>',
  ),
  E0 = X('<button><!> <!></button>'),
  N0 = X('<span class="sr-only"> </span>'),
  B0 = Ke(
    '<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>',
  ),
  M0 = X('<a><!> <!></a>');
function ar(r, e) {
  Se(e, !0);
  let a = R(e, 'color', 3, 'gray'),
    t = R(e, 'name', 3, 'Close'),
    s = R(e, 'size', 3, 'md'),
    l = je(e, [
      '$$slots',
      '$$events',
      '$$legacy',
      'children',
      'color',
      'onclick',
      'name',
      'ariaLabel',
      'size',
      'class',
      'svgClass',
    ]);
  const n = z(() => V0({color: a(), size: s()})),
    d = z(() => o(n).base),
    c = z(() => o(n).svg),
    g = T0();
  function f(C) {
    (e.onclick?.(C), !C.defaultPrevented && g?.dismiss?.(C));
  }
  var p = ie(),
    m = ae(p);
  {
    var A = (C) => {
        var S = E0();
        ve(S, (h) => ({type: 'button', ...l, class: h, onclick: f, 'aria-label': e.ariaLabel ?? t()}), [
          () => o(d)({class: $(e.class)}),
        ]);
        var k = re(S);
        {
          var _ = (h) => {
            var v = S0(),
              b = re(v);
            (de(() => Ue(b, t())), T(h, v));
          };
          Y(k, (h) => {
            t() && h(_);
          });
        }
        var u = ee(k, 2);
        {
          var E = (h) => {
              var v = ie(),
                b = ae(v);
              (fe(b, () => e.children), T(h, v));
            },
            M = (h) => {
              var v = P0();
              (de((b) => he(v, 0, b), [() => we(o(c)({class: e.svgClass}))]), T(h, v));
            };
          Y(u, (h) => {
            e.children ? h(E) : h(M, !1);
          });
        }
        T(C, S);
      },
      P = (C) => {
        var S = M0();
        ve(S, (h) => ({...l, onclick: f, class: h, 'aria-label': e.ariaLabel ?? t()}), [
          () => o(d)({class: $(e.class)}),
        ]);
        var k = re(S);
        {
          var _ = (h) => {
            var v = N0(),
              b = re(v);
            (de(() => Ue(b, t())), T(h, v));
          };
          Y(k, (h) => {
            t() && h(_);
          });
        }
        var u = ee(k, 2);
        {
          var E = (h) => {
              var v = ie(),
                b = ae(v);
              (fe(b, () => e.children), T(h, v));
            },
            M = (h) => {
              var v = B0();
              (de((b) => he(v, 0, b), [() => we(o(c)())]), T(h, v));
            };
          Y(u, (h) => {
            e.children ? h(E) : h(M, !1);
          });
        }
        T(C, S);
      };
    Y(m, (C) => {
      e.href === void 0 ? C(A) : C(P, !1);
    });
  }
  (T(r, p), Pe());
}
function j0(r, e = {}) {
  if (e === null)
    return {
      update(f = {}) {
        e = f;
      },
      destroy() {},
    };
  const a = document.activeElement;
  let t = !1,
    s = !1;
  function l() {
    return Array.from(r.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
  }
  function n(f) {
    if (f.key === 'Tab' && e !== null) {
      const p = document.activeElement,
        m = l(),
        A = m.at(0),
        P = m.at(-1);
      (f.shiftKey && p === A && (P?.focus(), f.preventDefault()),
        !f.shiftKey && p === P && (A?.focus(), f.preventDefault()));
    } else f.key === 'Escape' && e !== null && e.onEscape && (f.preventDefault(), (t = !0), e.onEscape());
  }
  function d(f) {
    !r.contains(f.relatedTarget) && f.relatedTarget !== a && (s = !0);
  }
  function c() {
    if (e !== null) {
      if (((t = !!e.isClosing), !t && !s)) {
        const f = l();
        f.length > 0 && f[0].focus();
      }
      (r.addEventListener('keydown', n), r.addEventListener('focusout', d));
    }
  }
  function g() {
    e !== null &&
      (r.removeEventListener('keydown', n),
      r.removeEventListener('focusout', d),
      !t &&
        !s &&
        a &&
        setTimeout(() => {
          a.focus({preventScroll: !0});
        }, 0));
  }
  return (
    c(),
    {
      update(f = {}) {
        (r.removeEventListener('keydown', n),
          r.removeEventListener('focusout', d),
          f && f.isClosing !== void 0 && (t = f.isClosing),
          (e = f),
          e !== null && (r.addEventListener('keydown', n), r.addEventListener('focusout', d)));
      },
      destroy() {
        g();
      },
    }
  );
}
function oa(r) {
  const e = Math.cos(r * Math.PI * 0.5);
  return Math.abs(e) < 1e-14 ? 1 : 1 - e;
}
const I0 = (r) => r;
function rt(r, {delay: e = 0, duration: a = 400, easing: t = I0} = {}) {
  const s = +getComputedStyle(r).opacity;
  return {delay: e, duration: a, easing: t, css: (l) => `opacity: ${l * s}`};
}
function sa() {
  const [r, e] = Wa();
  function a() {
    try {
      return r();
    } catch {
      return;
    }
  }
  return [a, e];
}
const [L0] = sa(),
  [la] = sa();
function He(r) {
  const e = L0();
  return (e && 'value' in e ? e.value : e)?.[r];
}
i({
  base: 'w-full',
  variants: {
    color: {primary: 'text-primary-500 dark:text-primary-400', secondary: 'text-secondary-500 dark:text-secondary-400'},
    flush: {true: '', false: 'border border-gray-200 dark:border-gray-700 rounded-t-xl'},
  },
});
i({
  slots: {
    base: 'group',
    button:
      'flex items-center justify-between w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-700 border-b',
    content: 'border-b border-gray-200 dark:border-gray-700',
    active:
      'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800',
    inactive: 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
  },
  variants: {
    flush: {
      true: {button: 'py-5', content: 'py-5'},
      false: {button: 'p-5 border-s border-e group-first:border-t', content: 'p-5 border-s border-e'},
    },
    open: {true: {}, false: {}},
  },
  compoundVariants: [
    {flush: !0, open: !0, class: {button: 'text-gray-900 dark:text-white'}},
    {flush: !0, open: !1, class: {button: 'text-gray-500 dark:text-gray-400'}},
  ],
  defaultVariants: {flush: !1, open: !1},
});
ge(['click']);
const O0 = i({
  base: 'p-4 gap-3 text-sm',
  variants: {
    color: {
      primary: 'bg-primary-50 dark:bg-gray-800 text-primary-800 dark:text-primary-400',
      secondary: 'bg-secondary-50 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-400',
      gray: 'bg-gray-100 text-gray-500 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300',
      red: 'bg-red-100 text-red-500 focus:ring-red-400 dark:bg-red-200 dark:text-red-600',
      orange: 'bg-orange-100 text-orange-500 focus:ring-orange-400 dark:bg-orange-200 dark:text-orange-600',
      amber: 'bg-amber-100 text-amber-500 focus:ring-amber-400 dark:bg-amber-200 dark:text-amber-600',
      yellow: 'bg-yellow-100 text-yellow-500 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600',
      lime: 'bg-lime-100 text-lime-500 focus:ring-lime-400 dark:bg-lime-200 dark:text-lime-600',
      green: 'bg-green-100 text-green-500 focus:ring-green-400 dark:bg-green-200 dark:text-green-600',
      emerald: 'bg-emerald-100 text-emerald-500 focus:ring-emerald-400 dark:bg-emerald-200 dark:text-emerald-600',
      teal: 'bg-teal-100 text-teal-500 focus:ring-teal-400 dark:bg-teal-200 dark:text-teal-600',
      cyan: 'bg-cyan-100 text-cyan-500 focus:ring-cyan-400 dark:bg-cyan-200 dark:text-cyan-600',
      sky: 'bg-sky-100 text-sky-500 focus:ring-sky-400 dark:bg-sky-200 dark:text-sky-600',
      blue: 'bg-blue-100 text-blue-500 focus:ring-blue-400 dark:bg-blue-200 dark:text-blue-600',
      indigo: 'bg-indigo-100 text-indigo-500 focus:ring-indigo-400 dark:bg-indigo-200 dark:text-indigo-600',
      violet: 'bg-violet-100 text-violet-500 focus:ring-violet-400 dark:bg-violet-200 dark:text-violet-600',
      purple: 'bg-purple-100 text-purple-500 focus:ring-purple-400 dark:bg-purple-200 dark:text-purple-600',
      fuchsia: 'bg-fuchsia-100 text-fuchsia-500 focus:ring-fuchsia-400 dark:bg-fuchsia-200 dark:text-fuchsia-600',
      pink: 'bg-pink-100 text-pink-500 focus:ring-pink-400 dark:bg-pink-200 dark:text-pink-600',
      rose: 'bg-rose-100 text-rose-500 focus:ring-rose-400 dark:bg-rose-200 dark:text-rose-600',
    },
    rounded: {true: 'rounded-lg'},
    border: {true: 'border'},
    icon: {true: 'flex items-center'},
    dismissable: {true: 'flex items-center'},
  },
  compoundVariants: [
    {
      border: !0,
      color: 'primary',
      class: 'border-primary-500 dark:border-primary-200 divide-primary-500 dark:divide-primary-200',
    },
    {
      border: !0,
      color: 'secondary',
      class: 'border-secondary-500 dark:border-secondary-200 divide-secondary-500 dark:divide-secondary-200',
    },
    {border: !0, color: 'gray', class: 'border-gray-300 dark:border-gray-800 divide-gray-300 dark:divide-gray-800'},
    {border: !0, color: 'red', class: 'border-red-300 dark:border-red-800 divide-red-300 dark:divide-red-800'},
    {
      border: !0,
      color: 'orange',
      class: 'border-orange-300 dark:border-orange-800 divide-orange-300 dark:divide-orange-800',
    },
    {
      border: !0,
      color: 'amber',
      class: 'border-amber-300 dark:border-amber-800 divide-amber-300 dark:divide-amber-800',
    },
    {
      border: !0,
      color: 'yellow',
      class: 'border-yellow-300 dark:border-yellow-800 divide-yellow-300 dark:divide-yellow-800',
    },
    {border: !0, color: 'lime', class: 'border-lime-300 dark:border-lime-800 divide-lime-300 dark:divide-lime-800'},
    {
      border: !0,
      color: 'green',
      class: 'border-green-300 dark:border-green-800 divide-green-300 dark:divide-green-800',
    },
    {
      border: !0,
      color: 'emerald',
      class: 'border-emerald-300 dark:border-emerald-800 divide-emerald-300 dark:divide-emerald-800',
    },
    {border: !0, color: 'teal', class: 'border-teal-300 dark:border-teal-800 divide-teal-300 dark:divide-teal-800'},
    {border: !0, color: 'cyan', class: 'border-cyan-300 dark:border-cyan-800 divide-cyan-300 dark:divide-cyan-800'},
    {border: !0, color: 'sky', class: 'border-sky-300 dark:border-sky-800 divide-sky-300 dark:divide-sky-800'},
    {border: !0, color: 'blue', class: 'border-blue-300 dark:border-blue-800 divide-blue-300 dark:divide-blue-800'},
    {
      border: !0,
      color: 'indigo',
      class: 'border-indigo-300 dark:border-indigo-800 divide-indigo-300 dark:divide-indigo-800',
    },
    {
      border: !0,
      color: 'violet',
      class: 'border-violet-300 dark:border-violet-800 divide-violet-300 dark:divide-violet-800',
    },
    {
      border: !0,
      color: 'purple',
      class: 'border-purple-300 dark:border-purple-800 divide-purple-300 dark:divide-purple-800',
    },
    {
      border: !0,
      color: 'fuchsia',
      class: 'border-fuchsia-300 dark:border-fuchsia-800 divide-fuchsia-300 dark:divide-fuchsia-800',
    },
    {border: !0, color: 'pink', class: 'border-pink-300 dark:border-pink-800 divide-pink-300 dark:divide-pink-800'},
    {border: !0, color: 'rose', class: 'border-rose-300 dark:border-rose-800 divide-rose-300 dark:divide-rose-800'},
  ],
  defaultVariants: {color: 'primary', rounded: !0},
});
var R0 = X('<div><!></div>'),
  D0 = X('<div><!> <!> <!></div>');
function F0(r, e) {
  Se(e, !0);
  let a = R(e, 'alertStatus', 15, !0),
    t = R(e, 'color', 3, 'primary'),
    s = R(e, 'rounded', 3, !0),
    l = R(e, 'transition', 3, rt),
    n = je(e, [
      '$$slots',
      '$$events',
      '$$legacy',
      'children',
      'icon',
      'alertStatus',
      'closeIcon',
      'color',
      'rounded',
      'border',
      'class',
      'dismissable',
      'transition',
      'params',
    ]);
  const d = z(() => He('alert'));
  let c = z(() =>
      O0({
        color: t(),
        rounded: s(),
        border: e.border,
        icon: !!e.icon,
        dismissable: e.dismissable,
        class: $(o(d), e.class),
      }),
    ),
    g = rr(void 0);
  function f() {
    o(g)?.dispatchEvent(new Event('close', {bubbles: !0, cancelable: !0})) && a(!1);
  }
  Mr(f);
  var p = ie(),
    m = ae(p);
  {
    var A = (P) => {
      var C = D0();
      ve(C, () => ({role: 'alert', ...n, class: o(c)}));
      var S = re(C);
      {
        var k = (v) => {
          var b = ie(),
            B = ae(b);
          (fe(B, () => e.icon), T(v, b));
        };
        Y(S, (v) => {
          e.icon && v(k);
        });
      }
      var _ = ee(S, 2);
      {
        var u = (v) => {
            var b = R0(),
              B = re(b);
            (fe(B, () => e.children), T(v, b));
          },
          E = (v) => {
            var b = ie(),
              B = ae(b);
            (fe(B, () => e.children), T(v, b));
          };
        Y(_, (v) => {
          e.icon || e.dismissable ? v(u) : v(E, !1);
        });
      }
      var M = ee(_, 2);
      {
        var h = (v) => {
          var b = ie(),
            B = ae(b);
          {
            var D = (V) => {
                ar(V, {
                  class: '-my-1.5 ms-auto -me-1.5',
                  get color() {
                    return t();
                  },
                  ariaLabel: 'Remove alert',
                  children: (j, N) => {
                    var x = ie(),
                      w = ae(x);
                    (qa(
                      w,
                      () => e.closeIcon,
                      (I, y) => {
                        y(I, {});
                      },
                    ),
                      T(j, x));
                  },
                  $$slots: {default: !0},
                });
              },
              F = (V) => {
                ar(V, {
                  class: '-my-1.5 ms-auto -me-1.5',
                  get color() {
                    return t();
                  },
                  ariaLabel: 'Remove alert',
                });
              };
            Y(B, (V) => {
              e.closeIcon ? V(D) : V(F, !1);
            });
          }
          T(v, b);
        };
        Y(M, (v) => {
          e.dismissable && v(h);
        });
      }
      (tr(
        C,
        (v) => H(g, v),
        () => o(g),
      ),
        Bt(3, C, l, () => e.params),
        T(P, C));
    };
    Y(m, (P) => {
      a() && P(A);
    });
  }
  (T(r, p), Pe());
}
i({
  base: 'relative flex items-center justify-center bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300',
  variants: {
    cornerStyle: {rounded: 'rounded-sm', circular: 'rounded-full'},
    border: {true: 'p-1 ring-2 ring-gray-300 dark:ring-gray-500', false: ''},
    stacked: {true: 'border-2 not-first:-ms-4 border-white dark:border-gray-800', false: ''},
    size: {xs: 'w-6 h-6', sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-20 h-20', xl: 'w-36 h-36'},
  },
  defaultVariants: {cornerStyle: 'circular', border: !1, stacked: !1, size: 'md'},
});
i({
  base: 'shrink-0',
  variants: {
    color: {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      gray: 'bg-gray-200',
      red: 'bg-red-500',
      orange: 'bg-orange-600',
      amber: 'bg-amber-500',
      yellow: 'bg-yellow-300',
      lime: 'bg-lime-500',
      green: 'bg-green-500',
      emerald: 'bg-emerald-500',
      teal: 'bg-teal-500',
      cyan: 'bg-cyan-500',
      sky: 'bg-sky-500',
      blue: 'bg-blue-500',
      indigo: 'bg-indigo-500',
      violet: 'bg-violet-500',
      purple: 'bg-purple-500',
      fuchsia: 'bg-fuchsia-500',
      pink: 'bg-pink-500',
      rose: 'bg-rose-500',
    },
    size: {xs: 'w-2 h-2', sm: 'w-2.5 h-2.5', md: 'w-3 h-3', lg: 'w-3.5 h-3.5', xl: 'w-6 h-6'},
    cornerStyle: {rounded: 'rounded-sm', circular: 'rounded-full'},
    border: {true: 'border border-gray-300 dark:border-gray-300', false: {}},
    hasChildren: {true: 'inline-flex items-center justify-center', false: {}},
    placement: {
      default: '',
      'top-left': 'absolute top-0 start-0',
      'top-center': 'absolute top-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2',
      'top-right': 'absolute top-0 end-0',
      'center-left': 'absolute top-1/2 -translate-y-1/2 start-0',
      center: 'absolute top-1/2 -translate-y-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2',
      'center-right': 'absolute top-1/2 -translate-y-1/2 end-0',
      'bottom-left': 'absolute bottom-0 start-0',
      'bottom-center': 'absolute bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2',
      'bottom-right': 'absolute bottom-0 end-0',
    },
    offset: {true: {}, false: {}},
  },
  compoundVariants: [
    {placement: 'top-left', offset: !0, class: '-translate-x-1/3 rtl:translate-x-1/3 -translate-y-1/3'},
    {placement: 'top-center', offset: !0, class: '-translate-y-1/3'},
    {placement: 'top-right', offset: !0, class: 'translate-x-1/3 rtl:-translate-x-1/3 -translate-y-1/3'},
    {placement: 'center-left', offset: !0, class: '-translate-x-1/3 rtl:translate-x-1/3'},
    {placement: 'center-right', offset: !0, class: 'translate-x-1/3 rtl:-translate-x-1/3'},
    {placement: 'bottom-left', offset: !0, class: '-translate-x-1/3 rtl:translate-x-1/3 translate-y-1/3'},
    {placement: 'bottom-center', offset: !0, class: 'translate-y-1/3'},
    {placement: 'bottom-right', offset: !0, class: 'translate-x-1/3 rtl:-translate-x-1/3 translate-y-1/3'},
  ],
  defaultVariants: {color: 'primary', size: 'md', cornerStyle: 'circular', border: !1, offset: !0, hasChildren: !1},
});
i({
  slots: {linkClass: 'flex align-middle', base: 'font-medium inline-flex items-center justify-center px-2.5 py-0.5'},
  variants: {
    color: {
      primary: {base: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'},
      secondary: {base: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300'},
      gray: {base: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'},
      red: {base: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'},
      orange: {base: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'},
      amber: {base: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'},
      yellow: {base: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'},
      lime: {base: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300'},
      green: {base: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'},
      emerald: {base: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'},
      teal: {base: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300'},
      cyan: {base: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300'},
      sky: {base: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300'},
      blue: {base: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'},
      indigo: {base: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'},
      violet: {base: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300'},
      fuchsia: {base: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300'},
      purple: {base: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'},
      pink: {base: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300'},
      rose: {base: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300'},
    },
    size: {small: 'text-xs', large: 'text-sm'},
    border: {true: {base: 'border'}},
    rounded: {true: {base: 'rounded-full'}, false: 'rounded-sm'},
  },
  compoundVariants: [
    {
      border: !0,
      color: 'primary',
      class: 'dark:bg-transparent dark:text-primary-400 border-primary-400 dark:border-primary-400',
    },
    {
      border: !0,
      color: 'secondary',
      class: 'dark:bg-transparent dark:text-secondary-400 border-secondary-400 dark:border-secondary-400',
    },
    {border: !0, color: 'gray', class: 'dark:bg-transparent dark:text-gray-400 border-gray-400 dark:border-gray-400'},
    {border: !0, color: 'red', class: 'dark:bg-transparent dark:text-red-400 border-red-400 dark:border-red-400'},
    {
      border: !0,
      color: 'orange',
      class: 'dark:bg-transparent dark:text-orange-400 border-orange-400 dark:border-orange-400',
    },
    {
      border: !0,
      color: 'amber',
      class: 'dark:bg-transparent dark:text-amber-400 border-amber-400 dark:border-amber-400',
    },
    {
      border: !0,
      color: 'yellow',
      class: 'dark:bg-transparent dark:text-yellow-300 border-yellow-300 dark:border-yellow-300',
    },
    {border: !0, color: 'lime', class: 'dark:bg-transparent dark:text-lime-400 border-lime-400 dark:border-lime-400'},
    {
      border: !0,
      color: 'green',
      class: 'dark:bg-transparent dark:text-green-400 border-green-400 dark:border-green-400',
    },
    {
      border: !0,
      color: 'emerald',
      class: 'dark:bg-transparent dark:text-emerald-400 border-emerald-400 dark:border-emerald-400',
    },
    {border: !0, color: 'teal', class: 'dark:bg-transparent dark:text-teal-400 border-teal-400 dark:border-teal-400'},
    {border: !0, color: 'cyan', class: 'dark:bg-transparent dark:text-cyan-400 border-cyan-400 dark:border-cyan-400'},
    {border: !0, color: 'sky', class: 'dark:bg-transparent dark:text-sky-400 border-sky-400 dark:border-sky-400'},
    {border: !0, color: 'blue', class: 'dark:bg-transparent dark:text-blue-400 border-blue-400 dark:border-blue-400'},
    {
      border: !0,
      color: 'indigo',
      class: 'dark:bg-transparent dark:text-indigo-400 border-indigo-400 dark:border-indigo-400',
    },
    {
      border: !0,
      color: 'violet',
      class: 'dark:bg-transparent dark:text-violet-400 border-violet-400 dark:border-violet-400',
    },
    {
      border: !0,
      color: 'purple',
      class: 'dark:bg-transparent dark:text-purple-400 border-purple-400 dark:border-purple-400',
    },
    {
      border: !0,
      color: 'fuchsia',
      class: 'dark:bg-transparent dark:text-fuchsia-400 border-fuchsia-400 dark:border-fuchsia-400',
    },
    {border: !0, color: 'pink', class: 'dark:bg-transparent dark:text-pink-400 border-pink-400 dark:border-pink-400'},
    {border: !0, color: 'rose', class: 'dark:bg-transparent dark:text-rose-400 border-rose-400 dark:border-rose-400'},
    {href: !0, color: 'primary', class: 'hover:bg-primary-200'},
    {href: !0, color: 'secondary', class: 'hover:bg-secondary-200'},
    {href: !0, color: 'gray', class: 'hover:bg-gray-200'},
    {href: !0, color: 'red', class: 'hover:bg-red-200'},
    {href: !0, color: 'orange', class: 'hover:bg-orange-200'},
    {href: !0, color: 'amber', class: 'hover:bg-amber-200'},
    {href: !0, color: 'yellow', class: 'hover:bg-yellow-200'},
    {href: !0, color: 'lime', class: 'hover:bg-lime-200'},
    {href: !0, color: 'green', class: 'hover:bg-green-200'},
    {href: !0, color: 'emerald', class: 'hover:bg-emerald-200'},
    {href: !0, color: 'teal', class: 'hover:bg-teal-200'},
    {href: !0, color: 'cyan', class: 'hover:bg-cyan-200'},
    {href: !0, color: 'sky', class: 'hover:bg-sky-200'},
    {href: !0, color: 'blue', class: 'hover:bg-blue-200'},
    {href: !0, color: 'indigo', class: 'hover:bg-indigo-200'},
    {href: !0, color: 'violet', class: 'hover:bg-violet-200'},
    {href: !0, color: 'purple', class: 'hover:bg-purple-200'},
    {href: !0, color: 'fuchsia', class: 'hover:bg-fuchsia-200'},
    {href: !0, color: 'pink', class: 'hover:bg-pink-200'},
    {href: !0, color: 'rose', class: 'hover:bg-rose-200'},
  ],
  defaultVariants: {color: 'primary', size: 'small', rounded: !1},
});
i({
  slots: {
    base: 'fixed z-50 flex justify-between p-4 mx-auto dark:bg-gray-700 dark:border-gray-600',
    insideDiv: 'flex flex-col md:flex-row md:items-center gap-2 mx-auto',
    dismissable: 'absolute end-2.5 top-2.5 md:static md:end-auto md:top-auto',
  },
  variants: {
    type: {
      top: {base: 'top-0 start-0 w-full border-b border-gray-200 bg-gray-50'},
      bottom: {base: 'bottom-0 start-0 w-full border-t border-gray-200 bg-gray-50'},
    },
    color: {
      primary: {base: 'bg-primary-50 dark:bg-primary-900'},
      secondary: {base: 'bg-secondary-50 dark:bg-secondary-900'},
      gray: {base: 'bg-gray-50 dark:bg-gray-700'},
      red: {base: 'bg-red-50 dark:bg-red-900'},
      orange: {base: 'bg-orange-50 dark:bg-orange-900'},
      amber: {base: 'bg-amber-50 dark:bg-amber-900'},
      yellow: {base: 'bg-yellow-50 dark:bg-yellow-900'},
      lime: {base: 'bg-lime-50 dark:bg-lime-900'},
      green: {base: 'bg-green-50 dark:bg-green-900'},
      emerald: {base: 'bg-emerald-50 dark:bg-emerald-900'},
      teal: {base: 'bg-teal-50 dark:bg-teal-900'},
      cyan: {base: 'bg-cyan-50 dark:bg-cyan-900'},
      sky: {base: 'bg-sky-50 dark:bg-sky-900'},
      blue: {base: 'bg-blue-50 dark:bg-blue-900'},
      indigo: {base: 'bg-indigo-50 dark:bg-indigo-900'},
      violet: {base: 'bg-violet-50 dark:bg-violet-900'},
      purple: {base: 'bg-purple-50 dark:bg-purple-900'},
      fuchsia: {base: 'bg-fuchsia-50 dark:bg-fuchsia-900'},
      pink: {base: 'bg-pink-50 dark:bg-pink-900'},
      rose: {base: 'bg-rose-50 dark:bg-rose-900'},
    },
  },
  defaultVariants: {type: 'top', multiline: !0},
});
i({
  slots: {
    base: 'w-full z-30 border-gray-200 dark:bg-gray-700 dark:border-gray-600',
    inner: 'grid h-full max-w-lg mx-auto',
  },
  variants: {
    position: {
      static: {base: 'static'},
      fixed: {base: 'fixed'},
      absolute: {base: 'absolute'},
      relative: {base: 'relative'},
      sticky: {base: 'sticky'},
    },
    navType: {
      default: {base: 'bottom-0 start-0 h-16 bg-white border-t'},
      border: {base: 'bottom-0 start-0 h-16 bg-white border-t'},
      application: {
        base: 'h-16 max-w-lg -translate-x-1/2 rtl:translate-x-1/2 bg-white border rounded-full bottom-4 start-1/2',
      },
      pagination: {base: 'bottom-0 h-16 -translate-x-1/2 rtl:translate-x-1/2 bg-white border-t start-1/2'},
      group: {base: 'bottom-0 -translate-x-1/2 rtl:translate-x-1/2 bg-white border-t start-1/2'},
      card: {base: 'bottom-0 start-0 h-16 bg-white border-t'},
      meeting: {
        base: 'bottom-0 start-0 grid h-16 grid-cols-1 px-8 bg-white border-t md:grid-cols-3',
        inner: 'flex items-center justify-center mx-auto',
      },
      video: {
        base: 'bottom-0 start-0 grid h-24 grid-cols-1 px-8 bg-white border-t md:grid-cols-3',
        inner: 'flex items-center w-full',
      },
    },
  },
  defaultVariants: {position: 'fixed', navType: 'default'},
});
i({
  slots: {base: 'inline-flex flex-col items-center justify-center', span: 'text-sm'},
  variants: {
    navType: {
      default: {
        base: 'px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group',
        span: 'text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500',
      },
      border: {
        base: 'px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600',
        span: 'text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500',
      },
      application: {base: '', span: 'sr-only'},
      pagination: {base: 'px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group', span: 'sr-only'},
      group: {base: 'p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group', span: 'sr-only'},
      card: {
        base: 'px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group',
        span: 'text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500',
      },
      meeting: {base: '', span: ''},
      video: {base: '', span: ''},
    },
    appBtnPosition: {
      left: {base: 'px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group'},
      middle: {base: 'px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group'},
      right: {base: 'px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group'},
    },
  },
  defaultVariants: {navType: 'default', appBtnPosition: 'middle', active: !1},
});
i({
  slots: {
    base: 'w-full',
    innerDiv: 'grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600',
  },
});
i({
  base: 'px-5 py-1.5 text-xs font-medium rounded-lg',
  variants: {
    active: {
      true: 'text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900',
      false: 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700',
    },
  },
});
i({
  slots: {
    base: 'flex',
    list: 'inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-3 rtl:space-x-reverse',
  },
  variants: {
    solid: {
      true: {
        base: 'px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700',
      },
      false: '',
    },
  },
  defaultVariants: {solid: !1},
});
i({
  slots: {base: 'inline-flex items-center', separator: 'h-6 w-6 text-gray-400 rtl:-scale-x-100'},
  variants: {home: {true: '', false: ''}, hasHref: {true: '', false: ''}},
  compoundVariants: [
    {
      home: !0,
      class: {
        base: 'inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
        separator: 'me-2 h-4 w-4',
      },
    },
    {
      home: !1,
      hasHref: !0,
      class: {
        base: 'ms-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ms-2 dark:text-gray-400 dark:hover:text-white',
      },
    },
    {home: !1, hasHref: !1, class: {base: 'ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400'}},
  ],
});
i({
  base: 'inline-flex rounded-lg shadow-xs',
  variants: {size: {sm: '', md: '', lg: ''}},
  defaultVariants: {size: 'md'},
});
const G0 = i({
  slots: {
    base: 'text-center font-medium inline-flex items-center justify-center',
    outline: 'bg-transparent border hover:text-white dark:bg-transparent dark:hover-text-white',
    shadow: 'shadow-lg',
    spinner: 'ms-2',
  },
  variants: {
    color: {
      primary: {
        base: 'text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus-within:ring-primary-300 dark:focus-within:ring-primary-800',
        outline:
          'text-primary-700 border-primary-700 hover:bg-primary-800 dark:border-primary-500 dark:text-primary-500 dark:hover:bg-primary-600',
        shadow: 'shadow-primary-500/50 dark:shadow-primary-800/80',
      },
      dark: {
        base: 'text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 focus-within:ring-gray-300 dark:focus-within:ring-gray-700',
        outline:
          'text-gray-900 border-gray-800 hover:bg-gray-900 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600',
        shadow: 'shadow-gray-500/50 gray:shadow-gray-800/80',
      },
      alternative: {
        base: 'text-gray-900 bg-transparent border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus-within:text-primary-700 dark:focus-within:text-white dark:hover:text-white dark:hover:bg-gray-700 focus-within:ring-gray-200 dark:focus-within:ring-gray-700',
        outline:
          'text-gray-700 border-gray-700 hover:bg-gray-800 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-500',
        shadow: '_shadow-gray-500/50 dark:shadow-gray-800/80',
      },
      light: {
        base: 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 focus-within:ring-gray-200 dark:focus-within:ring-gray-700',
        outline:
          'text-gray-700 border-gray-700 hover:bg-gray-800 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-500',
        shadow: 'shadow-gray-500/50 dark:shadow-gray-800/80',
      },
      secondary: {
        base: 'text-white bg-secondary-700 hover:bg-secondary-800 dark:bg-secondary-600 dark:hover:bg-secondary-700 focus-within:ring-secondary-300 dark:focus-within:ring-secondary-800',
        outline:
          'text-secondary-700 border-secondary-700 hover:bg-secondary-800 dark:border-secondary-400 dark:text-secondary-400 dark:hover:bg-secondary-500',
        shadow: 'shadow-secondary-500/50 dark:shadow-secondary-800/80',
      },
      gray: {
        base: 'text-white bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 focus-within:ring-gray-300 dark:focus-within:ring-gray-800',
        outline:
          'text-gray-700 border-gray-700 hover:bg-gray-800 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-500',
        shadow: 'shadow-gray-500/50 dark:shadow-gray-800/80',
      },
      red: {
        base: 'text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus-within:ring-red-300 dark:focus-within:ring-red-900',
        outline:
          'text-red-700 border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600',
        shadow: 'shadow-red-500/50 dark:shadow-red-800/80',
      },
      orange: {
        base: 'text-white bg-orange-700 hover:bg-orange-800 dark:bg-orange-600 dark:hover:bg-orange-700 focus-within:ring-orange-300 dark:focus-within:ring-orange-900',
        outline:
          'text-orange-700 border-orange-700 hover:bg-orange-800 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-500',
        shadow: 'shadow-orange-500/50 dark:shadow-orange-800/80',
      },
      amber: {
        base: 'text-white bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 focus-within:ring-amber-300 dark:focus-within:ring-amber-900',
        outline:
          'text-amber-700 border-amber-700 hover:bg-amber-800 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-500',
        shadow: 'shadow-amber-500/50 dark:shadow-amber-800/80',
      },
      yellow: {
        base: 'text-white bg-yellow-400 hover:bg-yellow-500 focus-within:ring-yellow-300 dark:focus-within:ring-yellow-900',
        outline:
          'text-yellow-400 border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400',
        shadow: 'shadow-yellow-500/50 dark:shadow-yellow-800/80',
      },
      lime: {
        base: 'text-white bg-lime-700 hover:bg-lime-800 dark:bg-lime-600 dark:hover:bg-lime-700 focus-within:ring-lime-300 dark:focus-within:ring-lime-800',
        outline:
          'text-lime-700 border-lime-700 hover:bg-lime-800 dark:border-lime-400 dark:text-lime-400 dark:hover:bg-lime-500',
        shadow: 'shadow-lime-500/50 dark:shadow-lime-800/80',
      },
      green: {
        base: 'text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 focus-within:ring-green-300 dark:focus-within:ring-green-800',
        outline:
          'text-green-700 border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600',
        shadow: 'shadow-green-500/50 dark:shadow-green-800/80',
      },
      emerald: {
        base: 'text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus-within:ring-emerald-300 dark:focus-within:ring-emerald-800',
        outline:
          'text-emerald-700 border-emerald-700 hover:bg-emerald-800 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-500',
        shadow: 'shadow-emerald-500/50 dark:shadow-emerald-800/80',
      },
      teal: {
        base: 'text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 focus-within:ring-teal-300 dark:focus-within:ring-teal-800',
        outline:
          'text-teal-700 border-teal-700 hover:bg-teal-800 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-500',
        shadow: 'shadow-teal-500/50 dark:shadow-teal-800/80',
      },
      cyan: {
        base: 'text-white bg-cyan-700 hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus-within:ring-cyan-300 dark:focus-within:ring-cyan-800',
        outline:
          'text-cyan-700 border-cyan-700 hover:bg-cyan-800 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-500',
        shadow: 'shadow-cyan-500/50 dark:shadow-cyan-800/80',
      },
      sky: {
        base: 'text-white bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-700 focus-within:ring-sky-300 dark:focus-within:ring-sky-800',
        outline:
          'text-sky-700 border-sky-700 hover:bg-sky-800 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-500',
        shadow: 'shadow-sky-500/50 dark:shadow-sky-800/80',
      },
      blue: {
        base: 'text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus-within:ring-blue-300 dark:focus-within:ring-blue-800',
        outline:
          'text-blue-700 border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500',
        shadow: 'shadow-blue-500/50 dark:shadow-blue-800/80',
      },
      indigo: {
        base: 'text-white bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus-within:ring-indigo-300 dark:focus-within:ring-indigo-800',
        outline:
          'text-indigo-700 border-indigo-700 hover:bg-indigo-800 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-500',
        shadow: 'shadow-indigo-500/50 dark:shadow-indigo-800/80',
      },
      violet: {
        base: 'text-white bg-violet-700 hover:bg-violet-800 dark:bg-violet-600 dark:hover:bg-violet-700 focus-within:ring-violet-300 dark:focus-within:ring-violet-800',
        outline:
          'text-violet-700 border-violet-700 hover:bg-violet-800 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-500',
        shadow: 'shadow-violet-500/50 dark:shadow-violet-800/80',
      },
      purple: {
        base: 'text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700',
        outline:
          'text-purple-700 border-purple-700 hover:bg-purple-800 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-500',
        shadow: 'shadow-purple-500/50 dark:shadow-purple-800/80',
      },
      fuchsia: {
        base: 'text-white bg-fuchsia-700 hover:bg-fuchsia-800 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700',
        outline:
          'text-fuchsia-700 border-fuchsia-700 hover:bg-fuchsia-800 dark:border-fuchsia-400 dark:text-fuchsia-400 dark:hover:bg-fuchsia-500',
        shadow: 'shadow-fuchsia-500/50 dark:shadow-fuchsia-800/80',
      },
      pink: {
        base: 'text-white bg-pink-700 hover:bg-pink-800 dark:bg-pink-600 dark:hover:bg-pink-700',
        outline:
          'text-pink-700 border-pink-700 hover:bg-pink-800 dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-500',
        shadow: 'shadow-pink-500/50 dark:shadow-pink-800/80',
      },
      rose: {
        base: 'text-white bg-rose-700 hover:bg-rose-800 dark:bg-rose-600 dark:hover:bg-rose-700',
        outline:
          'text-rose-700 border-rose-700 hover:bg-rose-800 dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-500',
        shadow: 'shadow-rose-500/50 dark:shadow-rose-800/80',
      },
    },
    size: {
      xs: 'px-3 py-2 text-xs',
      sm: 'px-4 py-2 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-5 py-3 text-base',
      xl: 'px-6 py-3.5 text-base',
    },
    group: {
      true: 'focus-within:ring-2 focus-within:z-10 [&:not(:first-child)]:rounded-s-none [&:not(:last-child)]:rounded-e-none [&:not(:last-child)]:border-e-0',
      false: 'focus-within:ring-4 focus-within:outline-hidden',
    },
    disabled: {true: 'cursor-not-allowed opacity-50', false: ''},
    pill: {true: 'rounded-full', false: 'rounded-lg'},
    checked: {true: '', false: ''},
  },
  compoundVariants: [],
  defaultVariants: {pill: !1},
});
i({
  slots: {
    base: 'inline-flex items-center justify-center transition-all duration-75 ease-in text-white bg-linear-to-r ',
    outlineWrapper: 'inline-flex items-center justify-center w-full border-0!',
  },
  variants: {
    color: {
      blue: {
        base: 'from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-blue-300 dark:focus:ring-blue-800',
      },
      green: {
        base: 'from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br focus:ring-green-300 dark:focus:ring-green-800',
      },
      cyan: {
        base: 'text-white bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-linear-to-br focus:ring-cyan-300 dark:focus:ring-cyan-800',
      },
      teal: {
        base: 'text-white bg-linear-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-linear-to-br focus:ring-teal-300 dark:focus:ring-teal-800',
      },
      lime: {
        base: 'text-gray-900 bg-linear-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-linear-to-br focus:ring-lime-300 dark:focus:ring-lime-800',
      },
      red: {
        base: 'text-white bg-linear-to-r from-red-400 via-red-500 to-red-600 hover:bg-linear-to-br focus:ring-red-300 dark:focus:ring-red-800',
      },
      pink: {
        base: 'text-white bg-linear-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-linear-to-br focus:ring-pink-300 dark:focus:ring-pink-800',
      },
      purple: {
        base: 'text-white bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-linear-to-br focus:ring-purple-300 dark:focus:ring-purple-800',
      },
      purpleToBlue: {
        base: 'text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-blue-300 dark:focus:ring-blue-800',
      },
      cyanToBlue: {
        base: 'text-white bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800',
      },
      greenToBlue: {
        base: 'text-white bg-linear-to-br from-green-400 to-blue-600 hover:bg-linear-to-bl focus:ring-green-200 dark:focus:ring-green-800',
      },
      purpleToPink: {
        base: 'text-white bg-linear-to-r from-purple-500 to-pink-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800',
      },
      pinkToOrange: {
        base: 'text-white bg-linear-to-br from-pink-500 to-orange-400 hover:bg-linear-to-bl focus:ring-pink-200 dark:focus:ring-pink-800',
      },
      tealToLime: {
        base: 'text-gray-900 bg-linear-to-r from-teal-200 to-lime-200 hover:bg-linear-to-l focus:ring-lime-200 dark:focus:ring-teal-700',
      },
      redToYellow: {
        base: 'text-gray-900 bg-linear-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-linear-to-bl focus:ring-red-100 dark:focus:ring-red-400',
      },
    },
    outline: {
      true: {
        base: 'p-0.5',
        outlineWrapper:
          'bg-white text-gray-900! dark:bg-gray-900 dark:text-white! hover:bg-transparent hover:text-inherit! group-hover:opacity-0! group-hover:text-inherit!',
      },
    },
    pill: {
      true: {base: 'rounded-full', outlineWrapper: 'rounded-full'},
      false: {base: 'rounded-lg', outlineWrapper: 'rounded-lg'},
    },
    size: {
      xs: 'px-3 py-2 text-xs',
      sm: 'px-4 py-2 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-5 py-3 text-base',
      xl: 'px-6 py-3.5 text-base',
    },
    shadow: {true: {base: 'shadow-lg'}},
    group: {true: 'rounded-none', false: ''},
    disabled: {true: {base: 'opacity-50 cursor-not-allowed'}},
  },
  compoundVariants: [
    {shadow: !0, color: 'blue', class: {base: 'shadow-blue-500/50 dark:shadow-blue-800/80'}},
    {shadow: !0, color: 'green', class: {base: 'shadow-green-500/50 dark:shadow-green-800/80'}},
    {shadow: !0, color: 'cyan', class: {base: 'shadow-cyan-500/50 dark:shadow-cyan-800/80'}},
    {shadow: !0, color: 'teal', class: {base: 'shadow-teal-500/50 dark:shadow-teal-800/80'}},
    {shadow: !0, color: 'lime', class: {base: 'shadow-lime-500/50 dark:shadow-lime-800/80'}},
    {shadow: !0, color: 'red', class: {base: 'shadow-red-500/50 dark:shadow-red-800/80'}},
    {shadow: !0, color: 'pink', class: {base: 'shadow-pink-500/50 dark:shadow-pink-800/80'}},
    {shadow: !0, color: 'purple', class: {base: 'shadow-purple-500/50 dark:shadow-purple-800/80'}},
    {shadow: !0, color: 'purpleToBlue', class: {base: 'shadow-blue-500/50 dark:shadow-blue-800/80'}},
    {shadow: !0, color: 'cyanToBlue', class: {base: 'shadow-cyan-500/50 dark:shadow-cyan-800/80'}},
    {shadow: !0, color: 'greenToBlue', class: {base: 'shadow-green-500/50 dark:shadow-green-800/80'}},
    {shadow: !0, color: 'purpleToPink', class: {base: 'shadow-purple-500/50 dark:shadow-purple-800/80'}},
    {shadow: !0, color: 'pinkToOrange', class: {base: 'shadow-pink-500/50 dark:shadow-pink-800/80'}},
    {shadow: !0, color: 'tealToLime', class: {base: 'shadow-lime-500/50 dark:shadow-teal-800/80'}},
    {shadow: !0, color: 'redToYellow', class: {base: 'shadow-red-500/50 dark:shadow-red-800/80'}},
    {group: !0, pill: !0, class: 'first:rounded-s-full last:rounded-e-full'},
    {group: !0, pill: !1, class: 'first:rounded-s-lg last:rounded-e-lg'},
  ],
});
var U0 = X('<a><!></a>'),
  H0 = X('<button><!> <!></button>');
function ht(r, e) {
  Se(e, !0);
  const a = la(),
    t = a?.size,
    s = a?.disabled;
  let l = R(e, 'outline', 3, !1),
    n = R(e, 'size', 3, 'md'),
    d = R(e, 'shadow', 3, !1),
    c = R(e, 'tag', 3, 'button'),
    g = R(e, 'loading', 3, !1),
    f = R(e, 'spinnerProps', 19, () => ({size: '4'})),
    p = je(e, [
      '$$slots',
      '$$events',
      '$$legacy',
      'children',
      'pill',
      'outline',
      'size',
      'color',
      'shadow',
      'tag',
      'disabled',
      'loading',
      'spinnerProps',
      'class',
    ]);
  const m = z(() => He('button'));
  let A = z(() => (t ? 'sm' : n())),
    P = z(() => e.color ?? (t ? (l() ? 'dark' : 'alternative') : 'primary')),
    C = z(() => !!s || !!e.disabled || g());
  const S = z(() => G0({color: o(P), size: o(A), disabled: o(C), pill: e.pill, group: !!t})),
    k = z(() => o(S).base),
    _ = z(() => o(S).outline),
    u = z(() => o(S).shadow),
    E = z(() => o(S).spinner);
  let M = z(() => o(k)({class: $(l() && o(_)(), d() && o(u)(), o(m)?.base, e.class)}));
  var h = ie(),
    v = ae(h);
  {
    var b = (F) => {
        var V = U0();
        ve(V, () => ({...p, class: o(M)}));
        var j = re(V);
        (fe(j, () => e.children ?? Te), T(F, V));
      },
      B = (F) => {
        var V = H0();
        ve(V, () => ({type: 'button', ...p, class: o(M), disabled: o(C)}));
        var j = re(V);
        fe(j, () => e.children ?? Te);
        var N = ee(j, 2);
        {
          var x = (w) => {
            {
              let I = z(() => o(E)());
              ns(
                w,
                Tr(f, {
                  get class() {
                    return o(I);
                  },
                }),
              );
            }
          };
          Y(N, (w) => {
            g() && w(x);
          });
        }
        T(F, V);
      },
      D = (F) => {
        var V = ie(),
          j = ae(V);
        (to(j, c, !1, (N, x) => {
          ve(N, () => ({...p, class: o(M)}));
          var w = ie(),
            I = ae(w);
          (fe(I, () => e.children ?? Te), T(x, w));
        }),
          T(F, V));
      };
    Y(v, (F) => {
      e.href !== void 0 ? F(b) : c() === 'button' ? F(B, 1) : F(D, !1);
    });
  }
  (T(r, h), Pe());
}
i({
  slots: {
    base: 'w-full flex max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700',
    image: 'rounded-t-lg',
  },
  variants: {
    size: {
      xs: {base: 'max-w-xs'},
      sm: {base: 'max-w-sm'},
      md: {base: 'max-w-lg'},
      lg: {base: 'max-w-2xl'},
      xl: {base: 'max-w-none'},
    },
    color: {
      gray: {base: 'border-gray-200 dark:bg-gray-800 dark:border-gray-700'},
      primary: {base: 'border-primary-200 bg-primary-400 dark:bg-primary-800 dark:border-primary-700'},
      secondary: {base: 'border-secondary-200 bg-secondary-400 dark:bg-secondary-800 dark:border-secondary-700'},
      red: {base: 'border-red-200 bg-red-400 dark:bg-red-800 dark:border-red-700'},
      orange: {base: 'border-orange-200 bg-orange-400 dark:bg-orange-800 dark:border-orange-700'},
      amber: {base: 'border-amber-200 bg-amber-400 dark:bg-amber-800 dark:border-amber-700'},
      yellow: {base: 'border-yellow-200 bg-yellow-400 dark:bg-yellow-800 dark:border-yellow-700'},
      lime: {base: 'border-lime-200 bg-lime-400 dark:bg-lime-800 dark:border-lime-700'},
      green: {base: 'border-green-200 bg-green-400 dark:bg-green-800 dark:border-green-700'},
      emerald: {base: 'border-emerald-200 bg-emerald-400 dark:bg-emerald-800 dark:border-emerald-700'},
      teal: {base: 'border-teal-200 bg-teal-400 dark:bg-teal-800 dark:border-teal-700'},
      cyan: {base: 'border-cyan-200 bg-cyan-400 dark:bg-cyan-800 dark:border-cyan-700'},
      sky: {base: 'border-sky-200 bg-sky-400 dark:bg-sky-800 dark:border-sky-700'},
      blue: {base: 'border-blue-200 bg-blue-400 dark:bg-blue-800 dark:border-blue-700'},
      indigo: {base: 'border-indigo-200 bg-indigo-400 dark:bg-indigo-800 dark:border-indigo-700'},
      violet: {base: 'border-violet-200 bg-violet-400 dark:bg-violet-800 dark:border-violet-700'},
      purple: {base: 'border-purple-200 bg-purple-400 dark:bg-purple-800 dark:border-purple-700'},
      fuchsia: {base: 'border-fuchsia-200 bg-fuchsia-400 dark:bg-fuchsia-800 dark:border-fuchsia-700'},
      pink: {base: 'border-pink-200 bg-pink-400 dark:bg-pink-800 dark:border-pink-700'},
      rose: {base: 'border-rose-200 bg-rose-400 dark:bg-rose-800 dark:border-rose-700'},
    },
    shadow: {
      xs: {base: 'shadow-xs'},
      sm: {base: 'shadow-sm'},
      normal: {base: 'shadow'},
      md: {base: 'shadow-md'},
      lg: {base: 'shadow-lg'},
      xl: {base: 'shadow-xl'},
      '2xl': {base: 'shadow-2xl'},
      inner: {base: 'shadow-inner'},
    },
    horizontal: {true: {base: 'md:flex-row', image: 'object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none'}},
    reverse: {
      true: {base: 'flex-col-reverse', image: 'rounded-b-lg rounded-tl-none'},
      false: {base: 'flex-col', image: 'rounded-t-lg'},
    },
    href: {true: '', false: ''},
    hasImage: {true: '', false: ''},
  },
  compoundVariants: [
    {horizontal: !0, reverse: !0, class: {base: 'md:flex-row-reverse', image: 'md:rounded-e-lg'}},
    {horizontal: !0, reverse: !1, class: {base: 'md:flex-row', image: 'md:rounded-s-lg'}},
    {href: !0, color: 'gray', class: {base: 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'}},
    {href: !0, color: 'primary', class: {base: 'cursor-pointer hover:bg-primary-500 dark:hover:bg-primary-700'}},
    {href: !0, color: 'secondary', class: {base: 'cursor-pointer hover:bg-secondary-500 dark:hover:bg-secondary-700'}},
    {href: !0, color: 'red', class: {base: 'cursor-pointer hover:bg-red-500 dark:hover:bg-red-700'}},
    {href: !0, color: 'orange', class: {base: 'cursor-pointer hover:bg-orange-500 dark:hover:bg-orange-700'}},
    {href: !0, color: 'amber', class: {base: 'cursor-pointer hover:bg-amber-500 dark:hover:bg-amber-700'}},
    {href: !0, color: 'yellow', class: {base: 'cursor-pointer hover:bg-yellow-500 dark:hover:bg-yellow-700'}},
    {href: !0, color: 'lime', class: {base: 'cursor-pointer hover:bg-lime-500 dark:hover:bg-lime-700'}},
    {href: !0, color: 'green', class: {base: 'cursor-pointer hover:bg-green-500 dark:hover:bg-green-700'}},
    {href: !0, color: 'emerald', class: {base: 'cursor-pointer hover:bg-emerald-500 dark:hover:bg-emerald-700'}},
    {href: !0, color: 'teal', class: {base: 'cursor-pointer hover:bg-teal-500 dark:hover:bg-teal-700'}},
    {href: !0, color: 'cyan', class: {base: 'cursor-pointer hover:bg-cyan-500 dark:hover:bg-cyan-700'}},
    {href: !0, color: 'sky', class: {base: 'cursor-pointer hover:bg-sky-500 dark:hover:bg-sky-700'}},
    {href: !0, color: 'blue', class: {base: 'cursor-pointer hover:bg-blue-500 dark:hover:bg-blue-700'}},
    {href: !0, color: 'indigo', class: {base: 'cursor-pointer hover:bg-indigo-500 dark:hover:bg-indigo-700'}},
    {href: !0, color: 'violet', class: {base: 'cursor-pointer hover:bg-violet-500 dark:hover:bg-violet-700'}},
    {href: !0, color: 'purple', class: {base: 'cursor-pointer hover:bg-purple-500 dark:hover:bg-purple-700'}},
    {href: !0, color: 'fuchsia', class: {base: 'cursor-pointer hover:bg-fuchsia-500 dark:hover:bg-fuchsia-700'}},
    {href: !0, color: 'pink', class: {base: 'cursor-pointer hover:bg-pink-500 dark:hover:bg-pink-700'}},
    {href: !0, color: 'rose', class: {base: 'cursor-pointer hover:bg-rose-500 dark:hover:bg-rose-700'}},
  ],
  defaultVariants: {size: 'sm', shadow: 'normal', horizontal: !1, reverse: !1},
});
i({
  slots: {base: 'grid overflow-hidden relative rounded-lg h-56 sm:h-64 xl:h-80 2xl:h-96', slide: ''},
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});
i({
  slots: {
    base: 'absolute start-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:translate-x-1/2 rtl:space-x-reverse',
    indicator: 'bg-gray-100 hover:bg-gray-300',
  },
  variants: {
    selected: {true: {indicator: 'opacity-100'}, false: {indicator: 'opacity-60'}},
    position: {top: {base: 'top-5'}, bottom: {base: 'bottom-5'}},
  },
});
i({
  slots: {
    base: 'flex absolute top-0 z-30 justify-center items-center px-4 h-full group focus:outline-hidden text-white dark:text-gray-300',
    span: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-hidden sm:h-10 sm:w-10 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70',
  },
  variants: {forward: {true: 'end-0', false: 'start-0'}},
});
i({base: 'flex flex-row justify-center bg-gray-100 w-full'});
i({base: '', variants: {selected: {true: 'opacity-100', false: 'opacity-60'}}, defaultVariants: {selected: !1}});
i({
  base: 'absolute block w-full h-full',
  variants: {
    fit: {
      contain: 'object-contain',
      cover: 'object-cover',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    },
  },
  defaultVariants: {fit: 'cover'},
});
ge(['click']);
ge(['click']);
i({
  base: 'gap-2',
  variants: {
    embedded: {true: 'px-1 py-1 focus-within:ring-0 bg-transparent hover:bg-transparent text-inherit', false: ''},
  },
  defaultVariants: {embedded: !1},
});
i({
  base: 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden rounded-lg text-sm p-2.5',
});
i({
  slots: {base: 'flex justify-between items-center', content: 'flex flex-wrap items-center'},
  variants: {
    embedded: {true: {}, false: {base: 'py-2 px-3 rounded-lg dark:border'}},
    color: {
      default: {
        base: 'bg-gray-50 dark:bg-gray-800 dark:border-gray-600',
        content: 'divide-gray-300 dark:divide-gray-800',
      },
      primary: {
        base: 'bg-primary-50 dark:bg-gray-800 dark:border-primary-800',
        content: 'divide-primary-300 dark:divide-primary-800',
      },
      secondary: {
        base: 'bg-secondary-50 dark:bg-gray-800 dark:border-secondary-800',
        content: 'divide-secondary-300 dark:divide-primary-800',
      },
      gray: {base: 'bg-gray-50 dark:bg-gray-800 dark:border-gray-800', content: 'divide-gray-300 dark:divide-gray-800'},
      red: {base: 'bg-red-50 dark:bg-gray-800 dark:border-red-800', content: 'divide-red-300 dark:divide-red-800'},
      yellow: {
        base: 'bg-yellow-50 dark:bg-gray-800 dark:border-yellow-800',
        content: 'divide-yellow-300 dark:divide-yellow-800',
      },
      green: {
        base: 'bg-green-50 dark:bg-gray-800 dark:border-green-800',
        content: 'divide-green-300 dark:divide-green-800',
      },
      indigo: {
        base: 'bg-indigo-50 dark:bg-gray-800 dark:border-indigo-800',
        content: 'divide-indigo-300 dark:divide-indigo-800',
      },
      purple: {
        base: 'bg-purple-50 dark:bg-gray-800 dark:border-purple-800',
        content: 'divide-purple-300 dark:divide-purple-800',
      },
      pink: {base: 'bg-pink-50 dark:bg-gray-800 dark:border-pink-800', content: 'divide-pink-300 dark:divide-pink-800'},
      blue: {base: 'bg-blue-50 dark:bg-gray-800 dark:border-blue-800', content: 'divide-blue-300 dark:divide-blue-800'},
      dark: {base: 'bg-gray-50 dark:bg-gray-800 dark:border-gray-800', content: 'divide-gray-300 dark:divide-gray-800'},
    },
    separators: {true: {content: 'sm:divide-x rtl:divide-x-reverse'}},
  },
  compoundVariants: [{embedded: !0, color: 'default', class: {base: 'bg-transparent'}}],
  defaultVariants: {color: 'default'},
});
i({
  base: 'flex items-center',
  variants: {
    spacing: {
      default: 'space-x-1 rtl:space-x-reverse',
      tight: 'space-x-0.5 rtl:space-x-reverse',
      loose: 'space-x-2 rtl:space-x-reverse',
    },
    padding: {default: 'sm:not(:last):pe-4 sm:not(:first):ps-4', none: ''},
    position: {middle: '', first: 'sm:ps-0', last: 'sm:pe-0'},
  },
  compoundVariants: [{position: ['first', 'last'], class: 'sm:px-0'}],
  defaultVariants: {spacing: 'default', padding: 'default'},
});
i({
  base: 'focus:outline-hidden whitespace-normal',
  variants: {
    color: {
      dark: 'text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600',
      gray: 'text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300',
      red: 'text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300',
      yellow:
        'text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300',
      green: 'text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300',
      indigo:
        'text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300',
      purple:
        'text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300',
      pink: 'text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300',
      blue: 'text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300',
      primary:
        'text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300',
      default: 'focus:ring-gray-400 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50',
    },
    size: {
      xs: 'm-0.5 rounded-xs focus:ring-1 p-0.5',
      sm: 'm-0.5 rounded-sm focus:ring-1 p-0.5',
      md: 'm-0.5 rounded-lg focus:ring-2 p-1.5',
      lg: 'm-0.5 rounded-lg focus:ring-2 p-2.5',
    },
    background: {true: '', false: ''},
  },
  compoundVariants: [
    {color: 'default', background: !0, class: 'dark:hover:bg-gray-600'},
    {color: 'default', background: !1, class: 'dark:hover:bg-gray-700'},
  ],
  defaultVariants: {color: 'default', size: 'md'},
});
i({
  slots: {
    base: 'inline-block rounded-lg bg-white dark:bg-gray-700 shadow-lg p-4',
    input:
      'w-full rounded-md border px-4 py-2 text-sm focus:ring-2 focus:outline-none outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900',
    titleVariant: 'mb-2 text-lg font-semibold text-gray-900 dark:text-white',
    polite:
      'text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200',
    button: 'absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-hidden dark:text-gray-400',
    actionButtons: 'mt-4 flex justify-between',
    columnHeader: 'text-center text-sm font-medium text-gray-500 dark:text-gray-400',
    grid: 'grid grid-cols-7 gap-1 w-64',
    nav: 'mb-4 flex items-center justify-between',
    dayButton:
      'h-8 w-full block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center font-semibold text-sm day p-0',
    monthButton:
      'rounded-lg px-3 py-2 text-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-700',
    actionSlot: '',
  },
  variants: {
    color: {
      primary: {
        input: 'focus:ring-primary-500 dark:focus:ring-primary-400',
        dayButton: 'bg-primary-300 dark:bg-primary-900',
      },
      blue: {input: 'focus:ring-blue-500 dark:focus:ring-blue-400', dayButton: 'bg-blue-300 dark:bg-blue-900'},
      red: {input: 'focus:ring-red-500 dark:focus:ring-red-400', dayButton: 'bg-red-300 dark:bg-red-900'},
      green: {input: 'focus:ring-green-500 dark:focus:ring-green-400', dayButton: 'bg-green-300 dark:bg-green-900'},
      yellow: {
        input: 'focus:ring-yellow-500 dark:focus:ring-yellow-400',
        dayButton: 'bg-yellow-300 dark:bg-yellow-900',
      },
      purple: {
        input: 'focus:ring-purple-500 dark:focus:ring-purple-400',
        dayButton: 'bg-purple-300 dark:bg-purple-900',
      },
      dark: {input: 'focus:ring-gray-500 dark:focus:ring-gray-400', dayButton: 'bg-gray-300 dark:bg-gray-900'},
      light: {input: 'focus:ring-gray-500 dark:focus:ring-gray-400', dayButton: 'bg-gray-300 dark:bg-gray-900'},
      alternative: {
        input: 'focus:ring-alternative-500 dark:focus:ring-alternative-400',
        dayButton: 'bg-alternative-300 dark:bg-alternative-900',
      },
      secondary: {
        input: 'focus:ring-secondary-500 dark:focus:ring-secondary-400',
        dayButton: 'bg-secondary-300 dark:bg-secondary-900',
      },
      gray: {input: 'focus:ring-gray-500 dark:focus:ring-gray-400', dayButton: 'bg-gray-300 dark:bg-gray-900'},
      orange: {
        input: 'focus:ring-orange-500 dark:focus:ring-orange-400',
        dayButton: 'bg-orange-300 dark:bg-orange-900',
      },
      amber: {input: 'focus:ring-amber-500 dark:focus:ring-amber-400', dayButton: 'bg-amber-300 dark:bg-amber-900'},
      lime: {input: 'focus:ring-lime-500 dark:focus:ring-lime-400', dayButton: 'bg-lime-300 dark:bg-lime-900'},
      emerald: {
        input: 'focus:ring-emerald-500 dark:focus:ring-emerald-400',
        dayButton: 'bg-emerald-300 dark:bg-emerald-900',
      },
      teal: {input: 'focus:ring-teal-500 dark:focus:ring-teal-400', dayButton: 'bg-teal-300 dark:bg-teal-900'},
      cyan: {input: 'focus:ring-cyan-500 dark:focus:ring-cyan-400', dayButton: 'bg-cyan-300 dark:bg-cyan-900'},
      sky: {input: 'focus:ring-sky-500 dark:focus:ring-sky-400', dayButton: 'bg-sky-300 dark:bg-sky-900'},
      indigo: {
        input: 'focus:ring-indigo-500 dark:focus:ring-indigo-400',
        dayButton: 'bg-indigo-300 dark:bg-indigo-900',
      },
      violet: {
        input: 'focus:ring-violet-500 dark:focus:ring-violet-400',
        dayButton: 'bg-violet-300 dark:bg-violet-900',
      },
      fuchsia: {
        input: 'focus:ring-fuchsia-500 dark:focus:ring-fuchsia-400',
        dayButton: 'bg-fuchsia-300 dark:bg-fuchsia-900',
      },
      pink: {input: 'focus:ring-pink-500 dark:focus:ring-pink-400', dayButton: 'bg-pink-300 dark:bg-pink-900'},
      rose: {input: 'focus:ring-rose-500 dark:focus:ring-rose-400', dayButton: 'bg-rose-300 dark:bg-rose-900'},
    },
    inline: {false: {base: 'absolute z-10 mt-1'}},
    current: {true: {dayButton: 'text-gray-400 dark:text-gray-500'}},
    today: {true: {dayButton: 'font-bold'}},
    unavailable: {true: {dayButton: 'opacity-50 cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700'}},
  },
  compoundVariants: [],
});
ge(['click']);
i({
  slots: {
    base: 'relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-xl h-[600px] w-[300px] shadow-xl',
    slot: 'rounded-xl overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800',
    top: 'w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute',
    leftTop: 'h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg',
    leftMid: 'h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg',
    leftBot: 'h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg',
    right: 'h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg',
  },
});
i({
  slots: {
    base: 'relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]',
    slot: 'rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800',
    top: 'h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg',
    leftTop: 'h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg',
    leftBot: 'h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg',
    right: 'h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg',
  },
});
i({
  slots: {
    base: 'relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]',
    inner: 'rounded-xl overflow-hidden h-[140px] md:h-[262px]',
    bot: 'relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]',
    botUnder: 'relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]',
  },
});
i({
  slots: {
    base: 'relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl',
    slot: 'rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800',
    top: 'w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute',
    leftTop: 'h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg',
    leftBot: 'h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg',
    right: 'h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg',
  },
});
i({
  slots: {
    base: 'relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]',
    inner: 'rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800',
    bot: 'relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]',
    botCen: 'absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800',
  },
});
i({
  slots: {
    base: 'relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-t-[2.5rem] h-[63px] max-w-[133px]',
    slot: 'rounded-[2rem] overflow-hidden h-[193px] w-[188px]',
    rightTop: 'h-[41px] w-[6px] bg-gray-800 dark:bg-gray-800 absolute -right-[16px] top-[40px] rounded-r-lg',
    rightBot: 'h-[32px] w-[6px] bg-gray-800 dark:bg-gray-800 absolute -right-[16px] top-[88px] rounded-r-lg',
    top: 'relative mx-auto border-gray-900 dark:bg-gray-800 dark:border-gray-800 border-[10px] rounded-[2.5rem] h-[213px] w-[208px]',
    bot: 'relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-b-[2.5rem] h-[63px] max-w-[133px]',
  },
});
i({
  slots: {
    base: 'relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]',
    slot: 'rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800',
    leftTop: 'h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg',
    leftMid: 'h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg',
    leftBot: 'h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg',
    right: 'h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg',
  },
});
const tt = i({
  slots: {
    base: 'backdrop:bg-gray-900/50 open:flex flex-col bg-white dark:bg-gray-800',
    form: 'flex flex-col w-full border-inherit dark:border-inherit divide-inherit dark:divide-inherit',
    close: 'absolute top-2.5 end-2.5',
  },
  variants: {},
  defaultVariants: {},
});
var W0 = X('<!> <!>', 1),
  q0 = X('<form method="dialog"><!></form>'),
  Y0 = X('<dialog><!></dialog>');
function K0(r, e) {
  Se(e, !0);
  const a = (x) => {
    var w = W0(),
      I = ae(w);
    fe(I, () => e.children ?? Te);
    var y = ee(I, 2);
    {
      var U = (W) => {
        {
          let se = z(() => k({class: $(e.classes?.close)}));
          ar(W, {
            type: 'submit',
            formnovalidate: !0,
            get class() {
              return o(se);
            },
          });
        }
      };
      Y(y, (W) => {
        f() && !g() && W(U);
      });
    }
    T(x, w);
  };
  let t = R(e, 'onaction', 3, () => !0),
    s = R(e, 'form', 3, !1),
    l = R(e, 'modal', 3, !0),
    n = R(e, 'autoclose', 3, !1),
    d = R(e, 'focustrap', 3, !1),
    c = R(e, 'open', 15, !1),
    g = R(e, 'permanent', 3, !1),
    f = R(e, 'dismissable', 3, !0),
    p = R(e, 'outsideclose', 3, !0),
    m = R(e, 'transition', 3, rt),
    A = je(e, [
      '$$slots',
      '$$events',
      '$$legacy',
      'children',
      'onaction',
      'oncancel',
      'onsubmit',
      'ontoggle',
      'form',
      'modal',
      'autoclose',
      'focustrap',
      'open',
      'permanent',
      'dismissable',
      'outsideclose',
      'class',
      'classes',
      'transition',
      'transitionParams',
    ]);
  const P = z(() => e.transitionParams ?? {duration: 100, easing: oa});
  let {base: C, form: S, close: k} = tt();
  const _ = () => c(!1),
    u = (x) => {
      if (typeof x.requestClose == 'function') return x.requestClose();
      x.dispatchEvent(new Event('cancel', {bubbles: !0, cancelable: !0}));
    };
  function E(x) {
    x.target === x.currentTarget && (e.oncancel?.(x), !x.defaultPrevented && (x.preventDefault(), g() || _()));
  }
  function M(x) {
    const w = x.currentTarget;
    if (x.target === w) {
      const I = w.getBoundingClientRect(),
        y = x.clientX >= I.left && x.clientX <= I.right && x.clientY >= I.top && x.clientY <= I.bottom;
      if (p() && !y) return u(w);
    }
    if (n() && x.target instanceof HTMLButtonElement && !g()) return _();
  }
  function h(x) {
    if ((e.onsubmit?.(x), x.defaultPrevented || !(x.target instanceof HTMLFormElement) || x.target.method !== 'dialog'))
      return;
    x.preventDefault();
    const w = x.currentTarget;
    if ((x.submitter && 'value' in x.submitter && (w.returnValue = String(x.submitter.value ?? '')), !w.returnValue))
      return u(w);
    (typeof t() == 'function' && t()({action: w.returnValue, data: new FormData(x.target)}) === !1) || _();
  }
  function v(x) {
    (e.ontoggle?.(x), c(x.newState === 'open'));
  }
  function b(x) {
    return (
      l() ? x.showModal() : x.show(),
      queueMicrotask(() => {
        const w =
          x.querySelector('[data-autofocus]') ??
          x.querySelector('input, textarea, select, button:not([aria-label="Close"])');
        w ? w.focus() : x.focus();
      }),
      () => x.close()
    );
  }
  const B = (x) => (d() ? j0(x) : void 0);
  let D = rr(void 0);
  function F() {
    s() || o(D)?.dispatchEvent(new Event('cancel', {bubbles: !0, cancelable: !0}));
  }
  Mr(F);
  var V = ie(),
    j = ae(V);
  {
    var N = (x) => {
      var w = Y0();
      ve(w, (W) => ({tabindex: '-1', onsubmit: h, oncancel: E, onclick: M, ontoggle: v, ...A, class: W}), [
        () => C({class: $(e.class)}),
      ]);
      var I = re(w);
      {
        var y = (W) => {
            var se = q0(),
              K = re(se);
            (a(K), de((q) => he(se, 1, q), [() => we(S({class: $(e.classes?.form)}))]), T(W, se));
          },
          U = (W) => {
            a(W);
          };
        Y(I, (W) => {
          s() ? W(y) : W(U, !1);
        });
      }
      (Mt(w, () => b),
        tr(
          w,
          (W) => H(D, W),
          () => o(D),
        ),
        ao(w, (W) => B?.(W)),
        Bt(7, w, m, () => o(P)),
        T(x, w));
    };
    Y(j, (x) => {
      c() && x(N);
    });
  }
  (T(r, V), Pe());
}
i({
  extend: tt,
  slots: {
    base: 'p-4 max-h-none max-w-none border border-gray-200 dark:border-gray-700 transform-gpu will-change-transform',
  },
  variants: {
    placement: {
      left: {base: 'me-auto h-full'},
      right: {base: 'ms-auto h-full'},
      top: {base: 'mb-auto w-full!'},
      bottom: {base: 'mt-auto w-full!'},
    },
    width: {default: {base: 'w-80'}, full: {base: 'w-full'}, half: {base: 'w-1/2'}},
    modal: {false: {base: 'fixed inset-0'}, true: {base: ''}},
    shifted: {true: {}, false: {}},
  },
  compoundVariants: [
    {shifted: !1, modal: !1, class: {base: 'z-50'}},
    {shifted: !0, placement: 'left', class: {base: '-translate-x-full'}},
    {shifted: !0, placement: 'right', class: {base: 'translate-x-full'}},
    {shifted: !0, placement: 'top', class: {base: '-translate-y-full'}},
    {shifted: !0, placement: 'bottom', class: {base: 'translate-y-full'}},
  ],
  defaultVariants: {placement: 'left', width: 'default', modal: !0},
});
i({
  slots: {
    base: 'flex items-center justify-between',
    button:
      'ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
    svg: 'h-4 w-4',
  },
});
i({
  slots: {
    base: 'p-4 absolute flex select-none cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500',
    handle: 'absolute rounded-lg bg-gray-300 dark:bg-gray-600',
  },
  variants: {
    placement: {
      left: {base: 'inset-y-0 right-0 touch-pan-x', handle: 'w-1 h-8 top-1/2 -translate-y-1/2'},
      right: {base: 'inset-y-0 left-0 touch-pan-x', handle: 'w-1 h-8 top-1/2 -translate-y-1/2'},
      top: {base: 'inset-x-0 bottom-0 touch-pan-y', handle: 'w-8 h-1 left-1/2 -translate-x-1/2'},
      bottom: {base: 'inset-x-0 top-0 touch-pan-y', handle: 'w-8 h-1 left-1/2 -translate-x-1/2'},
    },
  },
});
i({
  base: 'mt-2 divide-y divide-gray-300 dark:divide-gray-500 overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-700',
});
i({base: 'my-1 h-px bg-gray-100 dark:bg-gray-500'});
i({base: 'px-4 py-3 text-sm text-gray-900 dark:text-white'});
i({
  slots: {
    base: 'block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
    active:
      'block w-full text-left px-4 py-2 text-primary-700 dark:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
    li: '',
  },
});
i({base: 'py-2 text-sm text-gray-700 dark:text-gray-200'});
i({
  base: 'bg-white dark:bg-gray-800',
  variants: {
    footerType: {
      default: 'p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6',
      sitemap: 'bg-white dark:bg-gray-900',
      socialmedia: 'p-4 sm:p-6',
      logo: 'p-4 rounded-lg shadow md:px-6 md:py-8',
      sticky:
        'fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600',
    },
  },
});
i({
  slots: {
    base: 'flex items-center',
    span: 'self-center text-2xl font-semibold whitespace-nowrap dark:text-white',
    img: 'me-3 h-8',
  },
});
i({
  slots: {
    base: 'block text-sm text-gray-500 sm:text-center dark:text-gray-400',
    link: 'hover:underline',
    bySpan: 'ms-1',
  },
});
i({base: 'text-gray-500 hover:text-gray-900 dark:hover:text-white'});
i({base: 'text-gray-600 dark:text-gray-400'});
i({slots: {base: 'me-4 last:me-0 md:me-6', link: 'hover:underline'}});
i({slots: {image: 'h-auto max-w-full rounded-lg', div: 'grid'}});
i({
  base: 'px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500',
});
i({
  base: 'flex bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 divide-gray-200 dark:divide-gray-600',
  variants: {
    rounded: {true: 'rounded-lg', false: ''},
    border: {true: 'border border-gray-200 dark:border-gray-700', false: ''},
    horizontal: {true: 'flex-row divide-x', false: 'flex-col divide-y'},
  },
  compoundVariants: [{border: !0, class: 'divide-gray-200 dark:divide-gray-700'}],
  defaultVariants: {rounded: !0, border: !0, horizontal: !1},
});
i({
  base: 'py-2 px-4 w-full text-sm font-medium list-none flex items-center text-left gap-2',
  variants: {
    state: {
      normal: '',
      current: 'text-white bg-primary-700 dark:text-white dark:bg-gray-800',
      disabled: 'text-gray-900 bg-gray-100 dark:bg-gray-600 dark:text-gray-400',
    },
    active: {true: '', false: ''},
    horizontal: {true: 'first:rounded-s-lg last:rounded-e-lg', false: 'first:rounded-t-lg last:rounded-b-lg'},
  },
  compoundVariants: [
    {active: !0, state: 'disabled', class: 'cursor-not-allowed'},
    {
      active: !0,
      state: 'normal',
      class:
        'hover:bg-gray-100 hover:text-primary-700 dark:hover:bg-gray-600 dark:hover:text-white focus:z-40 focus:outline-hidden focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:focus:ring-gray-500 dark:focus:text-white',
    },
  ],
});
i({
  slots: {
    base: 'w-fit bg-white shadow-md dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-100 dark:border-gray-600 divide-gray-100 dark:divide-gray-600',
    div: 'flex flex-col md:flex-row p-4 max-w-(--breakpoint-md) justify-center mx-auto mt-2',
    ul: 'grid grid-flow-row gap-y-4 md:gap-x-0 auto-col-max auto-row-max grid-cols-2 md:grid-cols-3 text-sm font-medium',
    extra: 'md:w-1/3 mt-4 md:mt-0',
  },
  variants: {full: {true: {base: 'border-y shadow-xs w-full ml-0 rounded-none'}}, hasExtra: {true: {}}},
  compoundVariants: [{full: !0, hasExtra: !0, class: {ul: 'grid-cols-2 md:w-2/3'}}],
});
const J0 = i({
  extend: tt,
  slots: {
    base: 'w-full rounded-lg divide-y text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700 bg-white dark:bg-gray-800 pointer-events-auto',
    form: 'rounded-lg divide-y',
    header:
      'flex items-center p-4 md:p-5 justify-between rounded-t-lg shrink-0 text-xl font-semibold text-gray-900 dark:text-white',
    footer: 'flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse rounded-b-lg shrink-0',
    body: 'p-4 md:p-5 space-y-4 overflow-y-auto overscroll-contain',
  },
  variants: {
    fullscreen: {
      true: {
        base: 'fixed inset-0 w-screen h-screen max-w-none max-h-none m-0 p-0 border-none rounded-none bg-white dark:bg-gray-900',
      },
    },
    placement: {
      'top-left': {base: 'mb-auto mr-auto'},
      'top-center': {base: 'mb-auto mx-auto'},
      'top-right': {base: 'mb-auto ml-auto'},
      'center-left': {base: 'my-auto mr-auto'},
      center: {base: 'my-auto mx-auto'},
      'center-right': {base: 'my-auto ml-auto'},
      'bottom-left': {base: 'mt-auto mr-auto'},
      'bottom-center': {base: 'mt-auto mx-auto'},
      'bottom-right': {base: 'mt-auto ml-auto'},
    },
    size: {
      none: {base: ''},
      xs: {base: 'max-w-md'},
      sm: {base: 'max-w-lg'},
      md: {base: 'max-w-2xl'},
      lg: {base: 'max-w-4xl'},
      xl: {base: 'max-w-7xl'},
    },
  },
  defaultVariants: {placement: 'center', size: 'md'},
});
var Z0 = X('<h3> </h3> <!>', 1),
  X0 = X('<div><!></div>'),
  Q0 = X('<div><!></div>'),
  $0 = X('<!> <div><!></div> <!>', 1);
function es(r, e) {
  Se(e, !0);
  let a = R(e, 'open', 15, !1),
    t = R(e, 'permanent', 3, !1),
    s = R(e, 'dismissable', 3, !0),
    l = R(e, 'size', 3, 'md'),
    n = R(e, 'transition', 3, rt),
    d = R(e, 'fullscreen', 3, !1),
    c = je(e, [
      '$$slots',
      '$$events',
      '$$legacy',
      'children',
      'header',
      'footer',
      'title',
      'open',
      'permanent',
      'dismissable',
      'closeBtnClass',
      'headerClass',
      'bodyClass',
      'footerClass',
      'size',
      'placement',
      'class',
      'classes',
      'transitionParams',
      'transition',
      'fullscreen',
    ]);
  Me(() => ({
    headerClass: e.headerClass,
    bodyClass: e.bodyClass,
    footerClass: e.footerClass,
    closeBtnClass: e.closeBtnClass,
  }));
  const g = z(
      () => e.classes ?? {header: e.headerClass, body: e.bodyClass, footer: e.footerClass, close: e.closeBtnClass},
    ),
    f = z(() => He('modal')),
    p = {duration: 100, easing: oa},
    m = z(() => e.transitionParams ?? p),
    A = z(() => J0({placement: e.placement, size: l()})),
    P = z(() => o(A).base),
    C = z(() => o(A).header),
    S = z(() => o(A).footer),
    k = z(() => o(A).body);
  {
    let _ = z(() => s() && !e.title && !t()),
      u = z(() => o(P)({fullscreen: d(), class: $(o(f)?.base, e.class)}));
    K0(
      r,
      Tr(
        {
          get transition() {
            return n();
          },
          get dismissable() {
            return o(_);
          },
          get transitionParams() {
            return o(m);
          },
          get classes() {
            return e.classes;
          },
          get permanent() {
            return t();
          },
        },
        () => c,
        {
          get class() {
            return o(u);
          },
          get open() {
            return a();
          },
          set open(E) {
            a(E);
          },
          children: (E, M) => {
            var h = $0(),
              v = ae(h);
            {
              var b = (j) => {
                var N = X0(),
                  x = re(N);
                {
                  var w = (y) => {
                      var U = Z0(),
                        W = ae(U),
                        se = re(W),
                        K = ee(W, 2);
                      {
                        var q = (te) => {
                          {
                            let ne = z(() => $(o(g).close));
                            ar(te, {
                              type: 'submit',
                              formnovalidate: !0,
                              get class() {
                                return o(ne);
                              },
                            });
                          }
                        };
                        Y(K, (te) => {
                          s() && !t() && te(q);
                        });
                      }
                      (de(() => Ue(se, e.title)), T(y, U));
                    },
                    I = (y) => {
                      var U = ie(),
                        W = ae(U);
                      (fe(W, () => e.header), T(y, U));
                    };
                  Y(x, (y) => {
                    e.title ? y(w) : e.header && y(I, 1);
                  });
                }
                (de((y) => he(N, 1, y), [() => we(o(C)({class: $(o(f)?.header, o(g).header)}))]), T(j, N));
              };
              Y(v, (j) => {
                (e.title || e.header) && j(b);
              });
            }
            var B = ee(v, 2),
              D = re(B);
            fe(D, () => e.children ?? Te);
            var F = ee(B, 2);
            {
              var V = (j) => {
                var N = Q0(),
                  x = re(N);
                (fe(x, () => e.footer),
                  de((w) => he(N, 1, w), [() => we(o(S)({class: $(o(f)?.footer, o(g).footer)}))]),
                  T(j, N));
              };
              Y(F, (j) => {
                e.footer && j(V);
              });
            }
            (de((j) => he(B, 1, j), [() => we(o(k)({class: $(o(f)?.body, o(g).body)}))]), T(E, h));
          },
          $$slots: {default: !0},
        },
      ),
    );
  }
  Pe();
}
i({base: 'relative w-full px-2 py-2.5 sm:px-4'});
i({base: 'flex items-center'});
i({
  base: 'mx-auto flex flex-wrap items-center justify-between ',
  variants: {fluid: {true: 'w-full', false: 'container'}},
});
i({
  slots: {
    base: '',
    ul: 'flex flex-col p-4 mt-0 rtl:space-x-reverse',
    active: 'text-white bg-primary-700 dark:bg-primary-600',
    nonActive:
      'hover:text-primary-500 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
  },
  variants: {
    breakpoint: {
      sm: {
        base: 'w-full sm:block sm:w-auto',
        ul: 'sm:flex-row sm:text-sm sm:font-medium',
        active: 'sm:bg-transparent sm:text-primary-700 sm:dark:text-white sm:dark:bg-transparent',
        nonActive:
          'sm:hover:bg-transparent sm:border-0 sm:hover:text-primary-700 dark:sm:text-gray-400 sm:dark:hover:text-white sm:dark:hover:bg-transparent',
      },
      md: {
        base: 'w-full md:block md:w-auto',
        ul: 'md:flex-row md:text-sm md:font-medium',
        active: 'md:bg-transparent md:text-primary-700 md:dark:text-white md:dark:bg-transparent',
        nonActive:
          'md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:md:text-gray-400 md:dark:hover:text-white md:dark:hover:bg-transparent',
      },
      lg: {
        base: 'w-full lg:block lg:w-auto',
        ul: 'lg:flex-row lg:text-sm lg:font-medium',
        active: 'lg:bg-transparent lg:text-primary-700 lg:dark:text-white lg:dark:bg-transparent',
        nonActive:
          'lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:lg:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-transparent',
      },
      xl: {
        base: 'w-full xl:block xl:w-auto',
        ul: 'xl:flex-row xl:text-sm xl:font-medium',
        active: 'xl:bg-transparent xl:text-primary-700 xl:dark:text-white xl:dark:bg-transparent',
        nonActive:
          'xl:hover:bg-transparent xl:border-0 xl:hover:text-primary-700 dark:xl:text-gray-400 xl:dark:hover:text-white xl:dark:hover:bg-transparent',
      },
    },
    hidden: {
      false: {
        base: 'absolute top-full left-0 right-0 z-50 w-full',
        ul: 'border rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-400 border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700',
      },
      true: {base: 'hidden'},
    },
  },
  compoundVariants: [
    {
      breakpoint: 'sm',
      hidden: !1,
      class: {
        base: 'sm:static sm:z-auto',
        ul: 'sm:border-none sm:rounded-none sm:bg-inherit dark:sm:bg-inherit sm:shadow-none',
      },
    },
    {
      breakpoint: 'md',
      hidden: !1,
      class: {
        base: 'md:static md:z-auto',
        ul: 'md:border-none md:rounded-none md:bg-inherit dark:md:bg-inherit md:shadow-none',
      },
    },
    {
      breakpoint: 'lg',
      hidden: !1,
      class: {
        base: 'lg:static lg:z-auto',
        ul: 'lg:border-none lg:rounded-none lg:bg-inherit dark:lg:bg-inherit lg:shadow-none',
      },
    },
    {
      breakpoint: 'xl',
      hidden: !1,
      class: {
        base: 'xl:static xl:z-auto',
        ul: 'xl:border-none xl:rounded-none xl:bg-inherit dark:xl:bg-inherit xl:shadow-none',
      },
    },
  ],
  defaultVariants: {breakpoint: 'md'},
});
i({
  base: 'block py-2 pe-4 ps-3 rounded-sm',
  variants: {
    breakpoint: {
      sm: 'sm:p-2 sm:border-0',
      md: 'md:p-2 md:border-0',
      lg: 'lg:p-2 lg:border-0',
      xl: 'xl:p-2 xl:border-0',
    },
    hidden: {false: 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'},
  },
  compoundVariants: [
    {
      breakpoint: 'sm',
      hidden: !1,
      class: 'sm:hover:bg-transparent sm:hover:text-primary-700 sm:dark:hover:text-white sm:dark:hover:bg-transparent',
    },
    {
      breakpoint: 'md',
      hidden: !1,
      class: 'md:hover:bg-transparent md:hover:text-primary-700 md:dark:hover:text-white md:dark:hover:bg-transparent',
    },
    {
      breakpoint: 'lg',
      hidden: !1,
      class: 'lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:text-white lg:dark:hover:bg-transparent',
    },
    {
      breakpoint: 'xl',
      hidden: !1,
      class: 'xl:hover:bg-transparent xl:hover:text-primary-700 xl:dark:hover:text-white xl:dark:hover:bg-transparent',
    },
  ],
  defaultVariants: {breakpoint: 'md'},
});
i({
  slots: {base: 'ms-3', menu: 'h-6 w-6 shrink-0'},
  variants: {
    breakpoint: {sm: {base: 'sm:hidden'}, md: {base: 'md:hidden'}, lg: {base: 'lg:hidden'}, xl: {base: 'xl:hidden'}},
  },
  defaultVariants: {breakpoint: 'md'},
});
i({
  slots: {
    base: 'inline-flex -space-x-px rtl:space-x-reverse items-center',
    tableDiv: 'flex items-center text-sm mb-4',
    span: 'font-semibold mx-1',
    prev: 'rounded-none',
    next: 'rounded-none',
    active: '',
  },
  variants: {
    size: {default: '', large: ''},
    layout: {
      table: {
        prev: 'rounded-s bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white text-white  hover:text-gray-200',
        next: 'text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 hover:text-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
      },
      navigation: {prev: 'rounded-s-lg', next: 'rounded-e-lg'},
      pagination: {prev: 'rounded-s-lg', next: 'rounded-e-lg'},
    },
  },
  defaultVariants: {table: !1, size: 'default'},
});
i({
  base: 'flex items-center font-medium',
  variants: {
    size: {default: 'h-8 px-3 text-sm', large: 'h-10 px-4 text-base'},
    active: {
      true: 'text-primary-600 border border-gray-300 bg-primary-50 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
      false:
        'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
    },
    group: {true: '', false: 'rounded-lg'},
    table: {true: 'rounded-sm', false: 'border'},
    disabled: {true: 'cursor-not-allowed opacity-50', false: ''},
  },
  compoundVariants: [{group: !1, table: !1, class: 'rounded-lg'}],
  defaultVariants: {size: 'default', active: !1, group: !1, table: !1},
});
i({
  base: 'flex items-center font-medium',
  variants: {
    size: {default: 'h-8 px-3 text-sm', large: 'h-10 px-4 text-base'},
    active: {
      true: 'text-primary-600 border border-gray-300 bg-primary-50 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
      false:
        'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
    },
    group: {true: '', false: 'rounded-lg'},
    table: {true: 'rounded-sm', false: 'border'},
  },
  compoundVariants: [{group: !1, table: !1, class: 'rounded-lg'}],
  defaultVariants: {size: 'default', active: !1, group: !1, table: !1},
});
i({
  base: 'inline-flex -space-x-px rtl:space-x-reverse items-center',
  variants: {
    table: {true: 'divide-x rtl:divide-x-reverse dark divide-gray-700 dark:divide-gray-700', false: ''},
    size: {default: '', large: ''},
  },
  defaultVariants: {table: !1, size: 'default'},
});
i({
  slots: {
    base: 'rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700',
    content: 'p-2',
    title: 'py-2 px-3 rounded-t-md border-b ',
    h3: 'font-semibold',
  },
  variants: {
    color: {
      default: {
        title: 'bg-gray-100 border-gray-200 dark:border-gray-600 dark:bg-gray-700',
        h3: 'text-gray-900 dark:text-white',
      },
      primary: {title: 'bg-primary-700', h3: 'text-white'},
      secondary: {title: 'bg-secondary-700', h3: 'text-white'},
      gray: {title: 'bg-gray-700', h3: 'text-white'},
      red: {title: 'bg-red-700', h3: 'text-white'},
      orange: {title: 'bg-orange-700', h3: 'text-white'},
      amber: {title: 'bg-amber-700', h3: 'text-white'},
      yellow: {title: 'bg-yellow-500', h3: 'text-gray-800'},
      lime: {title: 'bg-lime-700', h3: 'text-white'},
      green: {title: 'bg-green-700', h3: 'text-white'},
      emerald: {title: 'bg-emerald-700', h3: 'text-white'},
      teal: {title: 'bg-teal-700', h3: 'text-white'},
      cyan: {title: 'bg-cyan-700', h3: 'text-white'},
      sky: {title: 'bg-sky-700', h3: 'text-white'},
      blue: {title: 'bg-blue-700', h3: 'text-white'},
      indigo: {title: 'bg-indigo-700', h3: 'text-white'},
      violet: {title: 'bg-violet-700', h3: 'text-white'},
      purple: {title: 'bg-purple-700', h3: 'text-white'},
      fuchsia: {title: 'bg-fuchsia-700', h3: 'text-white'},
      pink: {title: 'bg-pink-700', h3: 'text-white'},
      rose: {title: 'bg-rose-700', h3: 'text-white'},
    },
  },
});
i({
  slots: {
    base: 'w-full bg-gray-200 rounded-full dark:bg-gray-700',
    label: 'text-primary-100 text-xs font-medium text-center leading-none rounded-full',
    inside: 'rounded-full',
    outside: 'mb-1 flex justify-between',
    span: 'text-base font-medium dark:text-white',
    progressCls: 'text-sm font-medium dark:text-white',
  },
  variants: {
    color: {
      primary: {label: 'bg-primary-600', inside: 'bg-primary-600'},
      secondary: {label: 'bg-secondary-600', inside: 'bg-secondary-600'},
      gray: {label: 'bg-gray-600 dark:bg-gray-300', inside: 'bg-gray-600 dark:bg-gray-300'},
      red: {label: 'bg-red-600 dark:bg-red-500', inside: 'bg-red-600 dark:bg-red-500'},
      orange: {label: 'bg-orange-600 dark:bg-orange-500', inside: 'bg-orange-600 dark:bg-orange-500'},
      amber: {label: 'bg-amber-600 dark:bg-amber-500', inside: 'bg-amber-600 dark:bg-amber-500'},
      yellow: {label: 'bg-yellow-400', inside: 'bg-yellow-400'},
      lime: {label: 'bg-lime-600 dark:bg-lime-500', inside: 'bg-lime-600 dark:bg-lime-500'},
      green: {label: 'bg-green-600 dark:bg-green-500', inside: 'bg-green-600 dark:bg-green-500'},
      emerald: {label: 'bg-emerald-600 dark:bg-emerald-500', inside: 'bg-emerald-600 dark:bg-emerald-500'},
      teal: {label: 'bg-teal-600 dark:bg-teal-500', inside: 'bg-teal-600 dark:bg-teal-500'},
      cyan: {label: 'bg-cyan-600 dark:bg-cyan-500', inside: 'bg-cyan-600 dark:bg-cyan-500'},
      sky: {label: 'bg-sky-600 dark:bg-sky-500', inside: 'bg-sky-600 dark:bg-sky-500'},
      blue: {label: 'bg-blue-600', inside: 'bg-blue-600'},
      indigo: {label: 'bg-indigo-600 dark:bg-indigo-500', inside: 'bg-indigo-600 dark:bg-indigo-500'},
      violet: {label: 'bg-violet-600 dark:bg-violet-500', inside: 'bg-violet-600 dark:bg-violet-500'},
      purple: {label: 'bg-purple-600 dark:bg-purple-500', inside: 'bg-purple-600 dark:bg-purple-500'},
      fuchsia: {label: 'bg-fuchsia-600 dark:bg-fuchsia-500', inside: 'bg-fuchsia-600 dark:bg-fuchsia-500'},
      pink: {label: 'bg-pink-600 dark:bg-pink-500', inside: 'bg-pink-600 dark:bg-pink-500'},
      rose: {label: 'bg-rose-600 dark:bg-rose-500', inside: 'bg-rose-600 dark:bg-rose-500'},
    },
    labelInside: {true: '', false: ''},
  },
  compoundVariants: [
    {
      labelInside: !0,
      class: {base: 'text-primary-100 text-xs font-medium text-center leading-none rounded-full', label: 'p-0.5'},
    },
    {labelInside: !1, class: {base: 'rounded-full'}},
  ],
  defaultVariants: {color: 'primary', labelInside: !1},
});
i({
  slots: {
    base: 'relative inline-flex',
    label: 'absolute inset-0 flex items-center justify-center text-sm font-medium',
    background: 'opacity-25',
    foreground: 'transition-all',
    outside: 'flex flex-col items-center mb-2 text-center',
    span: 'text-base font-medium',
    progressCls: 'text-sm font-medium ml-1',
  },
  variants: {
    color: {
      primary: {background: 'stroke-primary-600', foreground: 'stroke-primary-600'},
      secondary: {background: 'stroke-secondary-600', foreground: 'stroke-secondary-600'},
      gray: {background: 'stroke-gray-600 dark:stroke-gray-300', foreground: 'stroke-gray-600 dark:stroke-gray-300'},
      red: {background: 'stroke-red-600 dark:stroke-red-500', foreground: 'stroke-red-600 dark:stroke-red-500'},
      orange: {
        background: 'stroke-orange-600 dark:stroke-orange-500',
        foreground: 'stroke-orange-600 dark:stroke-orange-500',
      },
      amber: {
        background: 'stroke-amber-600 dark:stroke-amber-500',
        foreground: 'stroke-amber-600 dark:stroke-amber-500',
      },
      yellow: {background: 'stroke-yellow-400', foreground: 'stroke-yellow-400'},
      lime: {background: 'stroke-lime-600 dark:stroke-lime-500', foreground: 'stroke-lime-600 dark:stroke-lime-500'},
      green: {
        background: 'stroke-green-600 dark:stroke-green-500',
        foreground: 'stroke-green-600 dark:stroke-green-500',
      },
      emerald: {
        background: 'stroke-emerald-600 dark:stroke-emerald-500',
        foreground: 'stroke-emerald-600 dark:stroke-emerald-500',
      },
      teal: {background: 'stroke-teal-600 dark:stroke-teal-500', foreground: 'stroke-teal-600 dark:stroke-teal-500'},
      cyan: {background: 'stroke-cyan-600 dark:stroke-cyan-500', foreground: 'stroke-cyan-600 dark:stroke-cyan-500'},
      sky: {background: 'stroke-sky-600 dark:stroke-sky-500', foreground: 'stroke-sky-600 dark:stroke-sky-500'},
      blue: {background: 'stroke-blue-600', foreground: 'stroke-blue-600'},
      indigo: {
        background: 'stroke-indigo-600 dark:stroke-indigo-500',
        foreground: 'stroke-indigo-600 dark:stroke-indigo-500',
      },
      violet: {
        background: 'stroke-violet-600 dark:stroke-violet-500',
        foreground: 'stroke-violet-600 dark:stroke-violet-500',
      },
      purple: {
        background: 'stroke-purple-600 dark:stroke-purple-500',
        foreground: 'stroke-purple-600 dark:stroke-purple-500',
      },
      fuchsia: {
        background: 'stroke-fuchsia-600 dark:stroke-fuchsia-500',
        foreground: 'stroke-fuchsia-600 dark:stroke-fuchsia-500',
      },
      pink: {background: 'stroke-pink-600 dark:stroke-pink-500', foreground: 'stroke-pink-600 dark:stroke-pink-500'},
      rose: {background: 'stroke-rose-600 dark:stroke-rose-500', foreground: 'stroke-rose-600 dark:stroke-rose-500'},
    },
    labelInside: {true: {}},
  },
});
i({
  slots: {
    base: 'flex items-center mt-4',
    span: 'text-sm font-medium text-gray-600 dark:text-gray-500',
    div2: 'mx-4 w-2/4 h-5 bg-gray-200 rounded-sm dark:bg-gray-700',
    div3: 'h-5 bg-yellow-400 rounded-sm',
    span2: 'text-sm font-medium text-gray-600 dark:text-gray-500',
  },
});
i({slots: {base: 'flex items-center', p: 'ms-2 text-sm font-bold text-gray-900 dark:text-white'}});
i({
  slots: {
    article: 'md:grid md:grid-cols-3 md:gap-8',
    div: 'mb-6 flex items-center space-x-4 rtl:space-x-reverse',
    div2: 'space-y-1 font-medium dark:text-white',
    div3: 'flex items-center text-sm text-gray-500 dark:text-gray-400',
    img: 'h-10 w-10 rounded-full',
    ul: 'space-y-4 text-sm text-gray-500 dark:text-gray-400',
    li: 'flex items-center',
  },
});
i({
  slots: {
    desc1:
      'bg-primary-100 w-8 text-primary-800 text-sm font-semibold inline-flex items-center p-1.5 rounded-sm dark:bg-primary-200 dark:text-primary-800',
    desc2: 'ms-2 font-medium text-gray-900 dark:text-white',
    desc3span: 'text-sm w-24 font-medium text-gray-500 dark:text-gray-400',
    desc3p: 'text-sm w-24 font-medium text-gray-500 dark:text-gray-400',
    link: 'ms-auto w-32 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500',
    bar: 'bg-primary-600 h-2.5 rounded-sm dark:bg-primary-500',
  },
});
i({
  slots: {
    base: 'top-0 left-0 z-50 w-64 transition-transform bg-gray-50 dark:bg-gray-800',
    active:
      'flex items-center group-has-[ul]:ms-6 p-2 text-base font-normal text-gray-900 bg-gray-200 dark:bg-gray-700 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
    nonactive:
      'flex items-center group-has-[ul]:ms-6 p-2 text-base font-normal text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
    div: 'overflow-y-auto px-3 py-4 bg-gray-50 dark:bg-gray-800',
    backdrop: 'fixed top-0 start-0 z-40 w-full h-full',
  },
  variants: {
    position: {fixed: {base: 'fixed'}, absolute: {base: 'absolute'}, static: {base: 'static'}},
    isOpen: {true: 'block', false: 'hidden'},
    breakpoint: {
      sm: {base: 'sm:block'},
      md: {base: 'md:block'},
      lg: {base: 'lg:block'},
      xl: {base: 'xl:block'},
      '2xl': {base: '2xl:block'},
    },
    alwaysOpen: {true: {base: 'block'}},
    backdrop: {true: {backdrop: 'bg-gray-900 opacity-75'}},
  },
  compoundVariants: [{alwaysOpen: !0, class: {base: '!block'}}],
});
i({
  slots: {
    base: 'inline-flex items-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600',
    svg: 'h-6 w-6 m-2',
  },
  variants: {breakpoint: {sm: 'sm:hidden', md: 'md:hidden', lg: 'lg:hidden', xl: 'xl:hidden', '2xl': '2xl:hidden'}},
});
i({
  slots: {
    base: 'flex items-center ps-2.5 mb-5',
    img: 'h-6 me-3 sm:h-7',
    span: 'self-center text-xl font-semibold whitespace-nowrap dark:text-white',
  },
});
i({
  slots: {
    base: 'p-4 mt-6 bg-primary-50 rounded-lg dark:bg-primary-900',
    div: 'flex items-center mb-3',
    span: 'bg-primary-100 text-primary-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-primary-200 dark:text-primary-900',
  },
});
i({
  slots: {
    base: 'group',
    btn: 'flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-sm transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
    span: 'flex-1 ms-3 text-left whitespace-nowrap',
    svg: 'h-3 w-3 text-gray-800 dark:text-white',
    ul: 'py-2 space-y-0',
  },
});
ge(['click']);
i({
  slots: {
    base: 'p-4 rounded-sm border border-gray-200 shadow-sm animate-pulse md:p-6 dark:border-gray-700',
    area: 'mb-4 flex h-48 items-center justify-center rounded-sm bg-gray-300 dark:bg-gray-700',
    icon: 'text-gray-200 dark:text-gray-600',
    line: 'rounded-full bg-gray-200 dark:bg-gray-700',
    footer: 'mt-4 flex items-center space-x-3 rtl:space-x-reverse',
  },
  variants: {
    size: {
      sm: {base: 'max-w-sm'},
      md: {base: 'max-w-md'},
      lg: {base: 'max-w-lg'},
      xl: {base: 'max-w-xl'},
      '2xl': {base: 'max-w-2xl'},
    },
  },
});
i({
  slots: {
    base: 'space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center',
    image: 'flex w-full items-center justify-center rounded-sm bg-gray-300 sm:w-96 dark:bg-gray-700',
    svg: 'text-gray-200',
    content: 'w-full',
    line: 'rounded-full bg-gray-200 dark:bg-gray-700',
  },
  variants: {
    size: {
      sm: {image: 'h-32', content: 'space-y-2'},
      md: {image: 'h-48', content: 'space-y-3'},
      lg: {image: 'h-64', content: 'space-y-4'},
    },
    rounded: {
      none: {image: 'rounded-none', line: 'rounded-none'},
      sm: {image: 'rounded-xs', line: 'rounded-xs'},
      md: {image: 'rounded-sm', line: 'rounded-sm'},
      lg: {image: 'rounded-lg', line: 'rounded-lg'},
      full: {image: 'rounded-full', line: 'rounded-full'},
    },
  },
});
i({
  slots: {
    base: 'p-4 space-y-4 max-w-md rounded-sm border border-gray-200 divide-y divide-gray-200 shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700',
    item: 'flex items-center justify-between',
    content: '',
    title: 'mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600',
    subTitle: 'h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700',
    extra: 'h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700',
  },
  variants: {
    size: {
      sm: {base: 'p-3 space-y-3 max-w-sm md:p-4', title: 'mb-2 h-2 w-20', subTitle: 'h-1.5 w-28', extra: 'h-2 w-10'},
      md: {},
      lg: {base: 'p-5 space-y-5 max-w-lg md:p-7', title: 'mb-3 h-3 w-28', subTitle: 'h-2.5 w-36', extra: 'h-3 w-14'},
    },
    rounded: {
      none: {base: 'rounded-none'},
      sm: {base: 'rounded-xs'},
      md: {base: 'rounded-sm'},
      lg: {base: 'rounded-lg'},
      full: {base: 'rounded-full p-8 md:p-16'},
    },
  },
});
i({
  slots: {wrapper: 'animate-pulse', line: 'rounded-full bg-gray-200 dark:bg-gray-700'},
  variants: {
    size: {
      sm: {wrapper: 'max-w-sm'},
      md: {wrapper: 'max-w-md'},
      lg: {wrapper: 'max-w-lg'},
      xl: {wrapper: 'max-w-xl'},
      '2xl': {wrapper: 'max-w-2xl'},
    },
  },
});
i({
  slots: {
    base: 'animate-pulse',
    lineA: 'rounded-full bg-gray-200 dark:bg-gray-700',
    lineB: 'rounded-full bg-gray-300 dark:bg-gray-700',
    svg: 'me-2 h-10 w-10 text-gray-200 dark:text-gray-700',
    content: 'mt-4 flex items-center justify-center',
  },
});
i({
  slots: {
    base: 'space-y-2.5 animate-pulse',
    div: 'flex items-center space-x-2 rtl:space-x-reverse',
    lineA: 'rounded-full bg-gray-200 dark:bg-gray-700',
    lineB: 'rounded-full bg-gray-300 dark:bg-gray-600',
  },
  variants: {
    size: {
      sm: {base: 'max-w-sm'},
      md: {base: 'max-w-md'},
      lg: {base: 'max-w-lg'},
      xl: {base: 'max-w-xl'},
      '2xl': {base: 'max-w-2xl'},
    },
  },
});
i({
  base: 'flex justify-center items-center h-56 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700',
  variants: {size: {sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl', '2xl': 'max-w-2xl'}},
});
i({
  slots: {
    base: 'p-4 max-w-sm rounded-sm border border-gray-200 shadow-sm animate-pulse md:p-6 dark:border-gray-700',
    wrapper: 'mt-4 flex items-baseline space-x-6 rtl:space-x-reverse',
    hLine: 'rounded-full bg-gray-200 dark:bg-gray-700',
    vLine: 'w-full rounded-t-lg bg-gray-200 dark:bg-gray-700',
  },
});
i({
  slots: {base: 'group bg-transparent', popper: 'flex items-center gap-2 bg-transparent text-inherit'},
  variants: {vertical: {true: {popper: 'flex-col'}}},
  defaultVariants: {vertical: !1},
});
i({
  slots: {base: 'w-[52px] h-[52px] shadow-xs p-0', span: 'mb-px text-xs font-medium'},
  variants: {
    noTooltip: {false: {}, true: {}},
    textOutside: {
      true: {base: 'relative', span: 'absolute -start-12 top-1/2 mb-px text-sm font-medium -translate-y-1/2'},
    },
  },
  compoundVariants: [{noTooltip: !0, textOutside: !1, class: {base: 'flex flex-col'}}],
  defaultVariants: {},
});
i({
  base: 'px-3 py-2 rounded-lg text-sm z-50 pointer-events-none',
  variants: {
    type: {
      light: 'bg-white text-gray-800 dark:bg-white dark:text-gray-800 border border-gray-200 dark:border-gray-200',
      auto: 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700',
      dark: 'bg-gray-800 text-white dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700',
      custom: '',
    },
    color: {
      primary: 'bg-primary-600 dark:bg-primary-600',
      secondary: 'bg-secondary-600 dark:bg-secondary-600',
      gray: 'bg-gray-600 dark:bg-gray-600',
      red: 'bg-red-600 dark:bg-red-600',
      orange: 'bg-orange-600 dark:bg-orange-600',
      amber: 'bg-amber-600 dark:bg-amber-600',
      yellow: 'bg-yellow-400 dark:bg-yellow-400',
      lime: 'bg-lime-600 dark:bg-lime-600',
      green: 'bg-green-600 dark:bg-green-600',
      emerald: 'bg-emerald-600 dark:bg-emerald-600',
      teal: 'bg-teal-600 dark:bg-teal-600',
      cyan: 'bg-cyan-600 dark:bg-cyan-600',
      sky: 'bg-sky-600 dark:bg-sky-600',
      blue: 'bg-blue-600 dark:bg-blue-600',
      indigo: 'bg-indigo-600 dark:bg-indigo-600',
      violet: 'bg-violet-600 dark:bg-violet-600',
      purple: 'bg-purple-600 dark:bg-purple-600',
      fuchsia: 'bg-fuchsia-600 dark:bg-fuchsia-600',
      pink: 'bg-pink-600 dark:bg-pink-600',
      rose: 'bg-rose-800 dark:bg-rose-800',
    },
  },
  compoundVariants: [
    {
      color: [
        'primary',
        'secondary',
        'gray',
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose',
      ],
      class: 'border-0 dark:border-0',
    },
  ],
  defaultVariants: {type: 'dark', color: void 0},
});
const rs = i({
  base: 'inline-block',
  variants: {
    type: {
      default: 'animate-spin',
      dots: 'inline-flex items-center justify-center',
      bars: 'inline-flex items-center justify-center',
      pulse: 'animate-pulse',
      orbit: '',
    },
    color: {
      primary: 'fill-primary-600 text-gray-300',
      secondary: 'fill-secondary-600 text-gray-300',
      gray: 'fill-gray-600 dark:fill-gray-300 text-gray-300',
      red: 'fill-red-600 text-gray-300',
      orange: 'fill-orange-500 text-gray-300',
      amber: 'fill-amber-500 text-gray-300',
      yellow: 'fill-yellow-400 text-gray-300',
      lime: 'fill-lime-500 text-gray-300',
      green: 'fill-green-500 text-gray-300',
      emerald: 'fill-emerald-500 text-gray-300',
      teal: 'fill-teal-500 text-gray-300',
      cyan: 'fill-cyan-500 text-gray-300',
      sky: 'fill-sky-500 text-gray-300',
      blue: 'fill-blue-600 text-gray-300',
      indigo: 'fill-indigo-600 text-gray-300',
      violet: 'fill-violet-600 text-gray-300',
      purple: 'fill-purple-600 text-gray-300',
      fuchsia: 'fill-fuchsia-600 text-gray-300',
      pink: 'fill-pink-600 text-gray-300',
      rose: 'fill-rose-600 text-gray-300',
    },
    size: {4: 'w-4 h-4', 5: 'w-5 h-5', 6: 'w-6 h-6', 8: 'w-8 h-8', 10: 'w-10 h-10', 12: 'w-12 h-12', 16: 'w-16 h-16'},
  },
  defaultVariants: {type: 'default', color: 'primary', size: '8'},
});
var ts = Ke(
    '<svg><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"></path></svg>',
  ),
  as = Ke(
    '<svg><circle cx="15" cy="15" r="15"><animate attributeName="r" values="15;9;15" dur="0.8s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;.5;1" dur="0.8s" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity="0.3"><animate attributeName="r" values="9;15;9" dur="0.8s" begin="0.2s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values=".5;1;.5" dur="0.8s" begin="0.2s" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" values="15;9;15" dur="0.8s" begin="0.4s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="1;.5;1" dur="0.8s" begin="0.4s" repeatCount="indefinite"></animate></circle></svg>',
  ),
  os = Ke(
    '<svg><rect y="10" width="15" height="120" rx="6"><animate attributeName="height" values="120;60;120" dur="1.2s" repeatCount="indefinite"></animate><animate attributeName="y" values="10;40;10" dur="1.2s" repeatCount="indefinite"></animate></rect><rect x="30" y="10" width="15" height="120" rx="6"><animate attributeName="height" values="120;60;120" dur="1.2s" begin="0.2s" repeatCount="indefinite"></animate><animate attributeName="y" values="10;40;10" dur="1.2s" begin="0.2s" repeatCount="indefinite"></animate></rect><rect x="60" y="10" width="15" height="120" rx="6"><animate attributeName="height" values="120;60;120" dur="1.2s" begin="0.4s" repeatCount="indefinite"></animate><animate attributeName="y" values="10;40;10" dur="1.2s" begin="0.4s" repeatCount="indefinite"></animate></rect></svg>',
  ),
  ss = Ke(
    '<svg><circle cx="50" cy="50" r="8"><animate attributeName="r" values="8;45" dur="1.5s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0.9;0" dur="1.5s" repeatCount="indefinite"></animate></circle><circle cx="50" cy="50" r="8"><animate attributeName="r" values="8;45" begin="0.5s" dur="1.5s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0.9;0" begin="0.5s" dur="1.5s" repeatCount="indefinite"></animate></circle><circle cx="50" cy="50" r="8"><animate attributeName="r" values="8;45" begin="1s" dur="1.5s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0.9;0" begin="1s" dur="1.5s" repeatCount="indefinite"></animate></circle></svg>',
  ),
  ls = Ke(
    '<svg><g><circle cx="50" cy="20" r="8"></circle><circle cx="73.66" cy="65" r="8"></circle><circle cx="26.34" cy="65" r="8"></circle><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.2s" repeatCount="indefinite"></animateTransform></g></svg>',
  );
function ns(r, e) {
  Se(e, !0);
  let a = R(e, 'type', 3, 'default'),
    t = R(e, 'color', 3, 'primary'),
    s = R(e, 'size', 3, '8'),
    l = R(e, 'currentFill', 3, 'inherit'),
    n = R(e, 'currentColor', 3, 'currentColor'),
    d = je(e, ['$$slots', '$$events', '$$legacy', 'type', 'color', 'size', 'class', 'currentFill', 'currentColor']);
  const c = z(() => He('spinner'));
  let g = z(() => rs({type: a(), color: t(), size: s(), class: $(o(c), e.class)}));
  var f = ie(),
    p = ae(f);
  {
    var m = (k) => {
        var _ = ts();
        ve(_, () => ({...d, role: 'status', class: o(g), viewBox: '0 0 100 101', fill: 'none'}));
        var u = re(_),
          E = ee(u);
        (de(() => {
          (Ye(u, 'fill', n()), Ye(E, 'fill', l()));
        }),
          T(k, _));
      },
      A = (k) => {
        var _ = as();
        (ve(_, () => ({...d, role: 'status', class: o(g), viewBox: '0 0 120 30', fill: 'currentColor'})), T(k, _));
      },
      P = (k) => {
        var _ = os();
        (ve(_, () => ({...d, role: 'status', class: o(g), viewBox: '0 0 135 140', fill: 'currentColor'})), T(k, _));
      },
      C = (k) => {
        var _ = ss();
        ve(_, () => ({...d, role: 'status', class: o(g), viewBox: '0 0 100 100'}));
        var u = re(_),
          E = ee(u),
          M = ee(E);
        (de(() => {
          (Ye(u, 'fill', l()), Ye(E, 'fill', l()), Ye(M, 'fill', l()));
        }),
          T(k, _));
      },
      S = (k) => {
        var _ = ls();
        (ve(_, () => ({...d, role: 'status', class: o(g), viewBox: '0 0 100 100', fill: 'currentColor'})), T(k, _));
      };
    Y(p, (k) => {
      a() === 'default'
        ? k(m)
        : a() === 'dots'
          ? k(A, 1)
          : a() === 'bars'
            ? k(P, 2)
            : a() === 'pulse'
              ? k(C, 3)
              : a() === 'orbit' && k(S, 4);
    });
  }
  (T(r, f), Pe());
}
i({
  slots: {
    base: 'flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base',
    item: 'flex items-center',
    content: 'flex items-center',
  },
  variants: {
    status: {
      completed: {
        item: "text-primary-600 dark:text-primary-500 md:w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700",
        content: "after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500",
      },
      current: {
        item: "text-primary-600 dark:text-primary-500 md:w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700",
        content: "after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500",
      },
      pending: {
        item: "md:w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700",
        content: "after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500",
      },
    },
    isLast: {true: {item: 'after:!hidden', content: 'after:!hidden'}, false: {}},
  },
  defaultVariants: {status: 'pending', isLast: !1},
});
i({
  slots: {
    base: 'flex items-center w-full relative',
    item: 'flex items-center justify-center z-10',
    circle: 'flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0',
    line: 'absolute h-1 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700',
    progressLine:
      'absolute h-1 top-1/2 -translate-y-1/2 bg-primary-600 dark:bg-primary-500 transition-all duration-300 ease-in-out',
  },
  variants: {
    status: {
      completed: {
        item: 'text-primary-600 dark:text-primary-400 flex-1',
        circle: 'bg-primary-600 dark:bg-primary-500 text-white',
      },
      current: {item: 'flex-1', circle: 'bg-primary-600 dark:bg-primary-500 text-white'},
      pending: {item: 'flex-1', circle: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'},
    },
  },
  defaultVariants: {status: 'pending'},
});
i({
  slots: {
    base: 'items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse',
    item: 'flex items-center space-x-2.5 rtl:space-x-reverse',
    indicator: 'flex items-center justify-center w-8 h-8 rounded-full shrink-0',
  },
  variants: {
    status: {
      completed: {
        item: 'text-primary-600 dark:text-primary-500',
        indicator: 'border border-primary-600 dark:border-primary-500 bg-primary-600 dark:bg-primary-500 text-white',
      },
      current: {
        item: 'text-gray-500 dark:text-gray-400',
        indicator: 'border border-gray-500 dark:border-gray-400 text-gray-500 dark:text-gray-400',
      },
      pending: {
        item: 'text-gray-500 dark:text-gray-400',
        indicator: 'border border-gray-500 dark:border-gray-400 text-gray-500 dark:text-gray-400',
      },
    },
  },
  defaultVariants: {status: 'pending'},
});
i({
  slots: {base: 'space-y-4 w-72', card: 'w-full p-4 border rounded-lg', content: 'flex items-center justify-between'},
  variants: {
    status: {
      completed: {
        card: 'text-green-700 border-green-300 bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400',
      },
      current: {
        card: 'text-primary-700 bg-primary-100 border-primary-300 dark:bg-gray-800 dark:border-primary-800 dark:text-primary-400',
      },
      pending: {
        card: 'text-gray-900 bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400',
      },
    },
  },
  defaultVariants: {status: 'pending'},
});
i({
  slots: {
    base: 'flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse',
    item: 'flex items-center',
    indicator: 'flex items-center justify-center w-5 h-5 me-2 text-xs rounded-full shrink-0',
  },
  variants: {
    status: {
      completed: {
        item: 'text-primary-600 dark:text-primary-500',
        indicator: 'border border-primary-600 dark:border-primary-500 bg-primary-600 dark:bg-primary-500 text-white',
      },
      current: {
        item: 'text-primary-600 dark:text-primary-500',
        indicator: 'border border-primary-600 dark:border-primary-500 bg-primary-600 dark:bg-primary-500 text-white',
      },
      pending: {
        item: 'text-gray-500 dark:text-gray-400',
        indicator: 'border border-gray-500 dark:border-gray-400 text-gray-500 dark:text-gray-400',
      },
    },
    hasChevron: {true: {}, false: {}},
  },
  defaultVariants: {status: 'pending', hasChevron: !1},
});
i({
  slots: {
    base: 'relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400',
    item: 'ms-6',
    circle:
      'absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900',
  },
  variants: {
    status: {
      completed: {circle: 'bg-green-200 dark:bg-green-900'},
      current: {circle: 'bg-primary-200 dark:bg-primary-900'},
      pending: {circle: 'bg-gray-100 dark:bg-gray-700'},
    },
    isLast: {true: {}, false: {item: 'mb-10'}},
  },
  defaultVariants: {status: 'pending', isLast: !1},
});
ge(['click']);
ge(['click']);
ge(['click']);
ge(['click']);
ge(['click']);
ge(['click']);
i({
  slots: {div: 'relative overflow-x-auto', table: 'w-full text-left text-sm'},
  variants: {
    color: {
      default: {table: 'text-gray-500 dark:text-gray-400'},
      primary: {table: 'text-primary-100 dark:text-primary-100'},
      secondary: {table: 'text-secondary-100 dark:text-secondary-100'},
      gray: {table: 'text-gray-100 dark:text-gray-100'},
      red: {table: 'text-red-100 dark:text-red-100'},
      orange: {table: 'text-orange-100 dark:text-orange-100'},
      amber: {table: 'text-amber-100 dark:text-amber-100'},
      yellow: {table: 'text-yellow-100 dark:text-yellow-100'},
      lime: {table: 'text-lime-100 dark:text-lime-100'},
      green: {table: 'text-green-100 dark:text-green-100'},
      emerald: {table: 'text-emerald-100 dark:text-emerald-100'},
      teal: {table: 'text-teal-100 dark:text-teal-100'},
      cyan: {table: 'text-cyan-100 dark:text-cyan-100'},
      sky: {table: 'text-sky-100 dark:text-sky-100'},
      blue: {table: 'text-blue-100 dark:text-blue-100'},
      indigo: {table: 'text-indigo-100 dark:text-indigo-100'},
      violet: {table: 'text-violet-100 dark:text-violet-100'},
      purple: {table: 'text-purple-100 dark:text-purple-100'},
      fuchsia: {table: 'text-fuchsia-100 dark:text-fuchsia-100'},
      pink: {table: 'text-pink-100 dark:text-pink-100'},
      rose: {table: 'text-rose-100 dark:text-rose-100'},
    },
    shadow: {true: {div: 'shadow-md sm:rounded-lg'}},
  },
});
i({
  base: '',
  variants: {
    color: {
      default: 'bg-white dark:bg-gray-800 dark:border-gray-700',
      primary: 'bg-white bg-primary-500 border-primary-400',
      secondary: 'bg-white bg-secondary-500 border-secondary-400',
      gray: 'bg-gray-500 border-gray-400',
      red: 'bg-red-500 border-red-400',
      orange: 'bg-orange-500 border-orange-400',
      amber: 'bg-amber-500 border-amber-400',
      yellow: 'bg-yellow-500 border-yellow-400',
      lime: 'bg-lime-500 border-lime-400',
      green: 'bg-white bg-green-500 border-green-400',
      emerald: 'bg-emerald-500 border-emerald-400',
      teal: 'bg-teal-500 border-teal-400',
      cyan: 'bg-cyan-500 border-cyan-400',
      sky: 'bg-sky-500 border-sky-400',
      blue: 'bg-white bg-blue-500 border-blue-400',
      indigo: 'bg-indigo-500 border-indigo-400',
      violet: 'bg-violet-500 border-violet-400',
      purple: 'bg-purple-500 border-purple-400',
      fuchsia: 'bg-fuchsia-500 border-fuchsia-400',
      pink: 'bg-pink-500 border-pink-400',
      rose: 'bg-rose-500 border-rose-400',
    },
    hoverable: {true: ''},
    striped: {true: ''},
    border: {true: 'border-b last:border-b-0'},
  },
  compoundVariants: [
    {hoverable: !0, color: 'default', class: 'hover:bg-gray-50 dark:hover:bg-gray-600'},
    {hoverable: !0, color: 'primary', class: 'hover:bg-primary-400 dark:hover:bg-primary-400'},
    {hoverable: !0, color: 'secondary', class: 'hover:bg-secondary-400 dark:hover:bg-secondary-400'},
    {hoverable: !0, color: 'gray', class: 'hover:bg-gray-400 dark:hover:bg-gray-400'},
    {hoverable: !0, color: 'red', class: 'hover:bg-red-400 dark:hover:bg-red-400'},
    {hoverable: !0, color: 'orange', class: 'hover:bg-orange-400 dark:hover:bg-orange-400'},
    {hoverable: !0, color: 'amber', class: 'hover:bg-amber-400 dark:hover:bg-amber-400'},
    {hoverable: !0, color: 'yellow', class: 'hover:bg-yellow-400 dark:hover:bg-yellow-400'},
    {hoverable: !0, color: 'lime', class: 'hover:bg-lime-400 dark:hover:bg-lime-400'},
    {hoverable: !0, color: 'green', class: 'hover:bg-green-400 dark:hover:bg-green-400'},
    {hoverable: !0, color: 'emerald', class: 'hover:bg-emerald-400 dark:hover:bg-emerald-400'},
    {hoverable: !0, color: 'teal', class: 'hover:bg-teal-400 dark:hover:bg-teal-400'},
    {hoverable: !0, color: 'cyan', class: 'hover:bg-cyan-400 dark:hover:bg-cyan-400'},
    {hoverable: !0, color: 'sky', class: 'hover:bg-sky-400 dark:hover:bg-sky-400'},
    {hoverable: !0, color: 'blue', class: 'hover:bg-blue-400 dark:hover:bg-blue-400'},
    {hoverable: !0, color: 'indigo', class: 'hover:bg-indigo-400 dark:hover:bg-indigo-400'},
    {hoverable: !0, color: 'violet', class: 'hover:bg-violet-400 dark:hover:bg-violet-400'},
    {hoverable: !0, color: 'purple', class: 'hover:bg-purple-400 dark:hover:bg-purple-400'},
    {hoverable: !0, color: 'fuchsia', class: 'hover:bg-fuchsia-400 dark:hover:bg-fuchsia-400'},
    {hoverable: !0, color: 'pink', class: 'hover:bg-pink-400 dark:hover:bg-pink-400'},
    {hoverable: !0, color: 'rose', class: 'hover:bg-rose-400 dark:hover:bg-rose-400'},
    {striped: !0, color: 'default', class: 'odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700'},
    {
      striped: !0,
      color: 'primary',
      class: 'odd:bg-primary-500 even:bg-primary-600 dark:odd:bg-primary-500 dark:even:bg-primary-600',
    },
    {
      striped: !0,
      color: 'secondary',
      class: 'odd:bg-secondary-500 even:bg-secondary-600 dark:odd:bg-secondary-500 dark:even:bg-secondary-600',
    },
    {striped: !0, color: 'gray', class: 'odd:bg-gray-500 even:bg-gray-600 dark:odd:bg-gray-500 dark:even:bg-gray-600'},
    {striped: !0, color: 'red', class: 'odd:bg-red-500 even:bg-red-600 dark:odd:bg-red-500 dark:even:bg-red-600'},
    {
      striped: !0,
      color: 'orange',
      class: 'odd:bg-orange-500 even:bg-orange-600 dark:odd:bg-orange-500 dark:even:bg-orange-600',
    },
    {
      striped: !0,
      color: 'amber',
      class: 'odd:bg-amber-500 even:bg-amber-600 dark:odd:bg-amber-500 dark:even:bg-amber-600',
    },
    {
      striped: !0,
      color: 'yellow',
      class: 'odd:bg-yellow-500 even:bg-yellow-600 dark:odd:bg-yellow-500 dark:even:bg-yellow-600',
    },
    {striped: !0, color: 'lime', class: 'odd:bg-lime-500 even:bg-lime-600 dark:odd:bg-lime-500 dark:even:bg-lime-600'},
    {
      striped: !0,
      color: 'green',
      class: 'odd:bg-green-500 even:bg-green-600 dark:odd:bg-green-500 dark:even:bg-green-600',
    },
    {
      striped: !0,
      color: 'emerald',
      class: 'odd:bg-emerald-500 even:bg-emerald-600 dark:odd:bg-emerald-500 dark:even:bg-emerald-600',
    },
    {striped: !0, color: 'teal', class: 'odd:bg-teal-500 even:bg-teal-600 dark:odd:bg-teal-500 dark:even:bg-teal-600'},
    {striped: !0, color: 'cyan', class: 'odd:bg-cyan-500 even:bg-cyan-600 dark:odd:bg-cyan-500 dark:even:bg-cyan-600'},
    {striped: !0, color: 'sky', class: 'odd:bg-sky-500 even:bg-sky-600 dark:odd:bg-sky-500 dark:even:bg-sky-600'},
    {striped: !0, color: 'blue', class: 'odd:bg-blue-500 even:bg-blue-600 dark:odd:bg-blue-500 dark:even:bg-blue-600'},
    {
      striped: !0,
      color: 'indigo',
      class: 'odd:bg-indigo-500 even:bg-indigo-600 dark:odd:bg-indigo-500 dark:even:bg-indigo-600',
    },
    {
      striped: !0,
      color: 'violet',
      class: 'odd:bg-violet-500 even:bg-violet-600 dark:odd:bg-violet-500 dark:even:bg-violet-600',
    },
    {
      striped: !0,
      color: 'purple',
      class: 'odd:bg-purple-500 even:bg-purple-600 dark:odd:bg-purple-500 dark:even:bg-purple-600',
    },
    {
      striped: !0,
      color: 'fuchsia',
      class: 'odd:bg-fuchsia-500 even:bg-fuchsia-600 dark:odd:bg-fuchsia-500 dark:even:bg-fuchsia-600',
    },
    {striped: !0, color: 'pink', class: 'odd:bg-pink-500 even:bg-pink-600 dark:odd:bg-pink-500 dark:even:bg-pink-600'},
    {striped: !0, color: 'rose', class: 'odd:bg-rose-500 even:bg-rose-600 dark:odd:bg-rose-500 dark:even:bg-rose-600'},
  ],
});
i({
  base: 'text-xs uppercase',
  variants: {
    color: {
      default: 'text-gray-700 dark:text-gray-400 bg-gray-50 dark:bg-gray-700',
      primary: 'text-white dark:text-white bg-primary-700 dark:bg-primary-700',
      secondary: 'text-white dark:text-white bg-secondary-700 dark:bg-secondary-700',
      gray: 'text-white dark:text-white bg-gray-700 dark:bg-gray-700',
      red: 'text-white dark:text-white bg-red-700 dark:bg-red-700',
      orange: 'text-white dark:text-white bg-orange-700 dark:bg-orange-700',
      amber: 'text-white dark:text-white bg-amber-700 dark:bg-amber-700',
      yellow: 'text-white dark:text-white bg-yellow-700 dark:bg-yellow-700',
      lime: 'text-white dark:text-white bg-lime-700 dark:bg-lime-700',
      green: 'text-white dark:text-white bg-green-700 dark:bg-green-700',
      emerald: 'text-white dark:text-white bg-emerald-700 dark:bg-emerald-700',
      teal: 'text-white dark:text-white bg-teal-700 dark:bg-teal-700',
      cyan: 'text-white dark:text-white bg-cyan-700 dark:bg-cyan-700',
      sky: 'text-white dark:text-white bg-sky-700 dark:bg-sky-700',
      blue: 'text-white dark:text-white bg-blue-700 dark:bg-blue-700',
      indigo: 'text-white dark:text-white bg-indigo-700 dark:bg-indigo-700',
      violet: 'text-white dark:text-white bg-violet-700 dark:bg-violet-700',
      purple: 'text-white dark:text-white bg-purple-700 dark:bg-purple-700',
      fuchsia: 'text-white dark:text-white bg-fuchsia-700 dark:bg-fuchsia-700',
      pink: 'text-white dark:text-white bg-pink-700 dark:bg-pink-700',
      rose: 'text-white dark:text-white bg-rose-700 dark:bg-rose-700',
    },
    border: {true: '', false: ''},
    striped: {true: '', false: ''},
  },
  compoundVariants: [
    {color: 'default', border: !0, class: ''},
    {color: 'default', striped: !0, class: ''},
    {striped: !0, color: 'blue', class: 'border-blue-400'},
    {striped: !0, color: 'green', class: 'border-green-400'},
    {striped: !0, color: 'red', class: 'border-red-400'},
    {striped: !0, color: 'yellow', class: 'border-yellow-400'},
    {striped: !0, color: 'purple', class: 'border-purple-400'},
    {striped: !0, color: 'indigo', class: 'border-indigo-400'},
    {striped: !0, color: 'pink', class: 'border-pink-400'},
  ],
});
i({base: 'px-6 py-4 whitespace-nowrap font-medium'});
i({base: 'px-6 py-3'});
i({
  slots: {
    root: 'relative overflow-x-auto shadow-md sm:rounded-lg',
    inner: 'p-4',
    search: 'relative mt-1',
    svgDiv: 'absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none',
    svg: 'w-5 h-5',
    input:
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    table: 'w-full text-left text-sm',
  },
  variants: {
    color: {
      default: {svg: 'text-gray-500 dark:text-gray-400', table: 'text-gray-500 dark:text-gray-400'},
      blue: {svg: 'text-blue-500 dark:text-blue-400', table: 'text-blue-100 dark:text-blue-100'},
      green: {svg: 'text-green-500 dark:text-green-400', table: 'text-green-100 dark:text-green-100'},
      red: {svg: 'text-red-500 dark:text-red-400', table: 'text-red-100 dark:text-red-100'},
      yellow: {svg: 'text-yellow-500 dark:text-yellow-400', table: 'text-yellow-100 dark:text-yellow-100'},
      purple: {svg: 'text-purple-500 dark:text-purple-400', table: 'text-purple-100 dark:text-purple-100'},
      indigo: {svg: 'text-indigo-500 dark:text-indigo-400', table: 'text-indigo-100 dark:text-indigo-100'},
      pink: {svg: 'text-pink-500 dark:text-pink-400', table: 'text-pink-100 dark:text-pink-100'},
    },
    striped: {
      true: {
        table:
          '[&_tbody_tr:nth-child(odd)]:bg-white [&_tbody_tr:nth-child(odd)]:dark:bg-gray-900 [&_tbody_tr:nth-child(even)]:bg-gray-50 [&_tbody_tr:nth-child(even)]:dark:bg-gray-800',
      },
      false: {},
    },
    hoverable: {true: {table: '[&_tbody_tr]:hover:bg-gray-50 [&_tbody_tr]:dark:hover:bg-gray-600'}, false: {}},
  },
  defaultVariants: {color: 'default', striped: !1, hoverable: !1},
});
ge(['click']);
i({
  slots: {
    base: 'flex space-x-2 rtl:space-x-reverse',
    content: 'p-4 bg-gray-50 rounded-lg dark:bg-gray-800 mt-4',
    divider: 'h-px bg-gray-200 dark:bg-gray-700',
    active: 'p-4 text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500',
    inactive:
      'p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300',
  },
  variants: {
    tabStyle: {
      full: {
        active:
          'p-4 w-full rounded-none group-first:rounded-s-lg group-last:rounded-e-lg text-gray-900 bg-gray-100 focus:ring-4 focus:ring-primary-300 focus:outline-hidden dark:bg-gray-700 dark:text-white',
        inactive:
          'p-4 w-full rounded-none group-first:rounded-s-lg group-last:rounded-e-lg text-gray-500 dark:text-gray-400 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-primary-300 focus:outline-hidden dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700',
      },
      pill: {
        active: 'py-3 px-4 text-white bg-primary-600 rounded-lg',
        inactive:
          'py-3 px-4 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
      },
      underline: {
        base: '-mb-px',
        active:
          'p-4 text-primary-600 border-b-2 border-primary-600 dark:text-primary-500 dark:border-primary-500 bg-transparent',
        inactive:
          'p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 text-gray-500 dark:text-gray-400 bg-transparent',
      },
      none: {active: '', inactive: ''},
    },
    hasDivider: {true: {}},
  },
  compoundVariants: [{tabStyle: ['full', 'pill'], hasDivider: !0, class: {divider: 'hidden'}}],
  defaultVariants: {tabStyle: 'none', hasDivider: !0},
});
i({
  slots: {
    base: 'group focus-within:z-10',
    button: 'inline-block text-sm font-medium text-center disabled:cursor-not-allowed',
  },
  variants: {open: {true: {button: 'active'}}, disabled: {true: {button: 'cursor-not-allowed'}}},
  compoundVariants: [
    {open: !0, class: {button: ''}},
    {open: !1, class: {button: ''}},
  ],
  defaultVariants: {open: !1, disabled: !1},
});
ge(['click']);
i({base: 'relative border-s border-gray-200 dark:border-gray-700'});
i({
  slots: {
    li: 'mb-10 ms-6',
    span: 'flex absolute -start-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900',
    img: 'rounded-full shadow-lg',
    outer: 'p-4 bg-white rounded-lg border border-gray-200 shadow-xs dark:bg-gray-700 dark:border-gray-600',
    inner: 'justify-between items-center mb-3 sm:flex',
    time: 'mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0',
    title: 'text-sm font-normal text-gray-500 lex dark:text-gray-300',
    text: 'p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300',
  },
});
i({
  slots: {
    div: 'p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700',
    time: 'text-lg font-semibold text-gray-900 dark:text-white',
    ol: 'mt-3 divide-y divider-gray-200 dark:divide-gray-700',
  },
});
i({
  slots: {
    base: '',
    a: 'block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700',
    img: 'me-3 mb-3 w-12 h-12 rounded-full sm:mb-0',
    div: 'text-gray-600 dark:text-gray-400',
    title: 'text-base font-normal',
    span: 'inline-flex items-center bg-gray-100 border border-gray-200 text-xs font-medium px-1.5 py-0.5 rounded',
    svg: 'me-1 h-3 w-3',
  },
});
const Z = {
  primary: {
    dot: 'bg-primary-200 dark:bg-primary-900',
    ring: 'ring-white dark:ring-gray-900',
    icon: 'text-primary-600 dark:text-primary-400',
  },
  green: {
    dot: 'bg-green-200 dark:bg-green-900',
    ring: 'ring-white dark:ring-gray-900',
    icon: 'text-green-600 dark:text-green-400',
  },
  orange: {
    dot: 'bg-orange-200 dark:bg-orange-900',
    ring: 'ring-white dark:ring-gray-900',
    icon: 'text-orange-600 dark:text-orange-400',
  },
  red: {
    dot: 'bg-red-200 dark:bg-red-900',
    ring: 'ring-white dark:ring-gray-900',
    icon: 'text-red-600 dark:text-red-400',
  },
  blue: {
    dot: 'bg-blue-200 dark:bg-blue-900',
    ring: 'ring-white dark:ring-gray-900',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  purple: {
    dot: 'bg-purple-200 dark:bg-purple-900',
    ring: 'ring-white dark:ring-gray-900',
    icon: 'text-purple-600 dark:text-purple-400',
  },
  gray: {
    dot: 'bg-gray-200 dark:bg-gray-700',
    ring: 'ring-white dark:ring-gray-900',
    icon: 'text-gray-600 dark:text-gray-400',
  },
};
i({
  variants: {
    order: {
      group: 'p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700',
      horizontal: 'sm:flex',
      activity: 'relative',
      vertical: 'relative',
      default: 'relative border-s border-gray-200 dark:border-gray-700',
    },
  },
  defaultVariants: {order: 'default'},
});
i({
  slots: {
    base: 'relative',
    div: '',
    defaultDiv: 'absolute w-2 h-2 bg-gray-200 rounded-full mt-1.5 -start-5 border border-buffer',
    time: '',
    h3: '',
    svg: 'w-4 h-4',
    connector: 'absolute top-6 left-3 w-px h-full',
  },
  variants: {
    order: {
      default: {
        base: 'mb-10 ms-4',
        div: 'absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700',
        time: 'mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500',
        h3: 'text-lg font-semibold text-gray-900 dark:text-white',
      },
      vertical: {
        base: 'mb-10 ms-6 relative',
        div: 'flex absolute -left-4 top-1.5 justify-center items-center w-6 h-6 rounded-full ring-8',
        time: 'mb-1 pl-4 text-sm font-normal leading-none text-gray-400 dark:text-gray-500',
        h3: 'flex ml-4 items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white',
        connector: 'absolute top-7 -left-1.5 w-px h-full',
      },
      horizontal: {
        base: 'relative mb-6 sm:mb-0',
        div: 'flex items-center',
        time: 'mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500',
        h3: 'text-lg font-semibold text-gray-900 dark:text-white',
      },
      activity: {
        base: 'mb-10 ms-6 relative',
        div: 'flex absolute -left-4 top-1.5 justify-center items-center w-6 h-6 rounded-full ring-8',
        time: 'mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500',
        h3: 'text-lg font-semibold text-gray-900 dark:text-white',
        connector: 'absolute top-7 -left-4 w-px h-full',
      },
      group: {
        base: '',
        div: 'p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700',
        time: 'text-lg font-semibold text-gray-900 dark:text-white',
        h3: 'text-lg font-semibold text-gray-900 dark:text-white',
      },
    },
    color: {primary: {}, green: {}, orange: {}, red: {}, blue: {}, purple: {}, gray: {}},
    isLast: {true: {}, false: {}},
  },
  compoundVariants: [
    {
      order: 'vertical',
      color: 'primary',
      class: {
        div: Z.primary.dot + ' ' + Z.primary.ring,
        svg: Z.primary.icon,
        connector: 'bg-primary-200 dark:bg-primary-700',
      },
    },
    {
      order: 'vertical',
      color: 'green',
      class: {div: Z.green.dot + ' ' + Z.green.ring, svg: Z.green.icon, connector: 'bg-green-200 dark:bg-green-700'},
    },
    {
      order: 'vertical',
      color: 'orange',
      class: {
        div: Z.orange.dot + ' ' + Z.orange.ring,
        svg: Z.orange.icon,
        connector: 'bg-orange-200 dark:bg-orange-700',
      },
    },
    {
      order: 'vertical',
      color: 'red',
      class: {div: Z.red.dot + ' ' + Z.red.ring, svg: Z.red.icon, connector: 'bg-red-200 dark:bg-red-700'},
    },
    {
      order: 'vertical',
      color: 'blue',
      class: {div: Z.blue.dot + ' ' + Z.blue.ring, svg: Z.blue.icon, connector: 'bg-blue-200 dark:bg-blue-700'},
    },
    {
      order: 'vertical',
      color: 'purple',
      class: {
        div: Z.purple.dot + ' ' + Z.purple.ring,
        svg: Z.purple.icon,
        connector: 'bg-purple-200 dark:bg-purple-700',
      },
    },
    {
      order: 'vertical',
      color: 'gray',
      class: {div: Z.gray.dot + ' ' + Z.gray.ring, svg: Z.gray.icon, connector: 'bg-gray-200 dark:bg-gray-700'},
    },
    {order: 'horizontal', color: 'primary', class: {div: Z.primary.dot + ' ' + Z.primary.ring, svg: Z.primary.icon}},
    {order: 'horizontal', color: 'green', class: {div: Z.green.dot + ' ' + Z.green.ring, svg: Z.green.icon}},
    {order: 'horizontal', color: 'orange', class: {div: Z.orange.dot + ' ' + Z.orange.ring, svg: Z.orange.icon}},
    {order: 'horizontal', color: 'red', class: {div: Z.red.dot + ' ' + Z.red.ring, svg: Z.red.icon}},
    {order: 'horizontal', color: 'blue', class: {div: Z.blue.dot + ' ' + Z.blue.ring, svg: Z.blue.icon}},
    {order: 'horizontal', color: 'purple', class: {div: Z.purple.dot + ' ' + Z.purple.ring, svg: Z.purple.icon}},
    {order: 'horizontal', color: 'gray', class: {div: Z.gray.dot + ' ' + Z.gray.ring, svg: Z.gray.icon}},
    {isLast: !0, class: {connector: 'hidden'}},
  ],
  defaultVariants: {order: 'default', color: 'primary', isLast: !1},
});
i({
  slots: {
    base: 'flex w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 gap-3',
    icon: 'w-8 h-8 inline-flex items-center justify-center shrink-0 rounded-lg',
    content: 'w-full text-sm font-normal',
    close:
      'ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700',
  },
  variants: {
    position: {
      'top-left': {base: 'absolute top-5 start-5'},
      'top-right': {base: 'absolute top-5 end-5'},
      'bottom-left': {base: 'absolute bottom-5 start-5'},
      'bottom-right': {base: 'absolute bottom-5 end-5'},
    },
    color: {
      primary: {
        icon: 'text-primary-500 bg-primary-100 dark:bg-primary-800 dark:text-primary-200',
        close: 'text-primary-500 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-500',
      },
      gray: {
        icon: 'text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-200',
        close: 'text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-500',
      },
      red: {
        icon: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
        close: 'text-red-500 dark:text-red-200 hover:text-red-600 dark:hover:text-red-500',
      },
      orange: {
        icon: 'text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200',
        close: 'text-orange-500 dark:text-orange-200 hover:text-orange-600 dark:hover:text-orange-500',
      },
      amber: {
        icon: 'text-amber-500 bg-amber-100 dark:bg-amber-700 dark:text-amber-200',
        close: 'text-amber-500 dark:text-amber-200 hover:text-amber-600 dark:hover:text-amber-500',
      },
      yellow: {
        icon: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200',
        close: 'text-yellow-500 dark:text-yellow-200 hover:text-yellow-600 dark:hover:text-yellow-500',
      },
      lime: {
        icon: 'text-lime-500 bg-lime-100 dark:bg-lime-700 dark:text-lime-200',
        close: 'text-lime-500 dark:text-lime-200 hover:text-lime-600 dark:hover:text-lime-500',
      },
      green: {
        icon: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
        close: 'text-green-500 dark:text-green-200 hover:text-green-600 dark:hover:text-green-500',
      },
      emerald: {
        icon: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-800 dark:text-emerald-200',
        close: 'text-emerald-500 dark:text-emerald-200 hover:text-emerald-600 dark:hover:text-emerald-500',
      },
      teal: {
        icon: 'text-teal-500 bg-teal-100 dark:bg-teal-800 dark:text-teal-200',
        close: 'text-teal-500 dark:text-teal-200 hover:text-teal-600 dark:hover:text-teal-500',
      },
      cyan: {
        icon: 'text-cyan-500 bg-cyan-100 dark:bg-cyan-800 dark:text-cyan-200',
        close: 'text-cyan-500 dark:text-cyan-200 hover:text-cyan-600 dark:hover:text-cyan-500',
      },
      sky: {
        icon: 'text-sky-500 bg-sky-100 dark:bg-sky-800 dark:text-sky-200',
        close: 'text-sky-500 dark:text-sky-200 hover:text-sky-600 dark:hover:text-sky-500',
      },
      blue: {
        icon: 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200',
        close: 'text-blue-500 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-500',
      },
      indigo: {
        icon: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-800 dark:text-indigo-200',
        close: 'text-indigo-500 dark:text-indigo-200 hover:text-indigo-600 dark:hover:text-indigo-500',
      },
      violet: {
        icon: 'text-violet-500 bg-violet-100 dark:bg-violet-800 dark:text-violet-200',
        close: 'text-violet-500 dark:text-violet-200 hover:text-violet-600 dark:hover:text-violet-500',
      },
      purple: {
        icon: 'text-purple-500 bg-purple-100 dark:bg-purple-800 dark:text-purple-200',
        close: 'text-purple-500 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-500',
      },
      fuchsia: {
        icon: 'text-fuchsia-500 bg-fuchsia-100 dark:bg-fuchsia-800 dark:text-fuchsia-200',
        close: 'text-fuchsia-500 dark:text-fuchsia-200 hover:text-fuchsia-600 dark:hover:text-fuchsia-500',
      },
      pink: {
        icon: 'text-pink-500 bg-pink-100 dark:bg-pink-700 dark:text-pink-200',
        close: 'text-pink-500 dark:text-pink-200 hover:text-pink-600 dark:hover:text-pink-500',
      },
      rose: {
        icon: 'text-rose-500 bg-rose-100 dark:bg-rose-700 dark:text-rose-200',
        close: 'text-rose-500 dark:text-rose-200 hover:text-rose-600 dark:hover:text-rose-500',
      },
    },
    align: {true: {base: 'items-center'}, false: {base: 'items-start'}},
  },
});
i({base: 'fixed z-50 space-y-3'});
const is = i({
  slots: {
    base: 'w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 me-2 rounded-sm',
    div: 'flex items-center',
  },
  variants: {
    color: {
      primary: {base: 'text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600'},
      secondary: {base: 'text-secondary-600 focus:ring-secondary-500 dark:focus:ring-secondary-600'},
      gray: {base: 'text-gray-600 focus:ring-gray-600 dark:ring-offset-gray-800 dark:focus:ring-gray-600'},
      red: {base: 'text-red-600 focus:ring-red-600 dark:ring-offset-red-600 dark:focus:ring-red-600'},
      orange: {base: 'text-orange-600 focus:ring-orange-600 dark:ring-offset-orange-600 dark:focus:ring-orange-600'},
      amber: {base: 'text-amber-600 focus:ring-amber-600 dark:ring-offset-amber-600 dark:focus:ring-amber-600'},
      yellow: {base: 'text-yellow-400 focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400'},
      lime: {base: 'text-lime-700 focus:ring-lime-700 dark:ring-offset-lime-700 dark:focus:ring-lime-700'},
      green: {base: 'text-green-600 focus:ring-green-600 dark:ring-offset-green-600 dark:focus:ring-green-600'},
      emerald: {
        base: 'text-emerald-600 focus:ring-emerald-600 dark:ring-offset-emerald-600 dark:focus:ring-emerald-600',
      },
      teal: {base: 'text-teal-600 focus:ring-teal-600 dark:ring-offset-teal-600 dark:focus:ring-teal-600'},
      cyan: {base: 'text-cyan-600 focus:ring-cyan-600 dark:ring-offset-cyan-600 dark:focus:ring-cyan-600'},
      sky: {base: 'text-sky-600 focus:ring-sky-600 dark:ring-offset-sky-600 dark:focus:ring-sky-600'},
      blue: {base: 'text-blue-700 focus:ring-blue-600 dark:ring-offset-blue-700 dark:focus:ring-blue-700'},
      indigo: {base: 'text-indigo-700 focus:ring-indigo-700 dark:ring-offset-indigo-700 dark:focus:ring-indigo-700'},
      violet: {base: 'text-violet-600 focus:ring-violet-600 dark:ring-offset-violet-600 dark:focus:ring-violet-600'},
      purple: {base: 'text-purple-600 focus:ring-purple-600 dark:ring-offset-purple-600 dark:focus:ring-purple-600'},
      fuchsia: {
        base: 'text-fuchsia-600 focus:ring-fuchsia-600 dark:ring-offset-fuchsia-600 dark:focus:ring-fuchsia-600',
      },
      pink: {base: 'text-pink-600 focus:ring-pink-600 dark:ring-offset-pink-600 dark:focus:ring-pink-600'},
      rose: {base: 'text-rose-600 focus:ring-rose-600 dark:ring-offset-rose-600 dark:focus:ring-rose-600'},
    },
    tinted: {
      true: {base: 'dark:bg-gray-600 dark:border-gray-500'},
      false: {base: 'dark:bg-gray-700 dark:border-gray-600'},
    },
    custom: {true: {base: 'sr-only peer'}},
    rounded: {true: {base: 'rounded-sm'}},
    inline: {true: {div: 'inline-flex', false: 'flex items-center'}},
    disabled: {
      true: {base: 'cursor-not-allowed opacity-50 bg-gray-200 border-gray-300', div: 'cursor-not-allowed opacity-70'},
      false: {},
    },
  },
  defaultVariants: {color: 'primary', disabled: !1},
});
i({
  base: '',
  variants: {inline: {true: 'inline-flex', false: 'flex'}, checked: {true: 'outline-4 outline-green-500'}},
  defaultVariants: {inline: !0},
});
const ds = i({
  base: 'text-sm rtl:text-right font-medium block',
  variants: {
    color: {
      disabled: 'text-gray-500 dark:text-gray-500',
      primary: 'text-primary-700 dark:text-primary-500',
      secondary: 'text-secondary-700 dark:text-secondary-500',
      green: 'text-green-700 dark:text-green-500',
      emerald: 'text-emerald-700 dark:text-emerald-500',
      red: 'text-red-700 dark:text-red-500',
      blue: 'text-blue-700 dark:text-blue-500',
      yellow: 'text-yellow-700 dark:text-yellow-500',
      orange: 'text-orange-700 dark:text-orange-500',
      gray: 'text-gray-700 dark:text-gray-200',
      teal: 'text-teal-700 dark:text-teal-500',
      cyan: 'text-cyan-700 dark:text-cyan-500',
      sky: 'text-sky-700 dark:text-sky-500',
      indigo: 'text-indigo-700 dark:text-indigo-500',
      lime: 'text-lime-700 dark:text-lime-500',
      amber: 'text-amber-700 dark:text-amber-500',
      violet: 'text-violet-700 dark:text-violet-500',
      purple: 'text-purple-700 dark:text-purple-500',
      fuchsia: 'text-fuchsia-700 dark:text-fuchsia-500',
      pink: 'text-pink-700 dark:text-pink-500',
      rose: 'text-rose-700 dark:text-rose-500',
    },
  },
});
var gs = X('<label><!></label>');
function fr(r, e) {
  Se(e, !0);
  let a = R(e, 'color', 3, 'gray'),
    t = R(e, 'show', 3, !0),
    s = je(e, ['$$slots', '$$events', '$$legacy', 'children', 'color', 'show', 'class']);
  const l = z(() => He('label'));
  let n = z(() => ds({color: a(), class: $(o(l), e.class)}));
  var d = ie(),
    c = ae(d);
  {
    var g = (p) => {
        var m = gs();
        ve(m, () => ({...s, class: o(n)}));
        var A = re(m);
        (fe(A, () => e.children), T(p, m));
      },
      f = (p) => {
        var m = ie(),
          A = ae(m);
        (fe(A, () => e.children), T(p, m));
      };
    Y(c, (p) => {
      t() ? p(g) : p(f, !1);
    });
  }
  (T(r, d), Pe());
}
var cs = X('<input/> <!>', 1),
  us = X('<input/> <!>', 1);
function bs(r, e) {
  Se(e, !0);
  const a = [];
  let t = R(e, 'color', 3, 'primary'),
    s = R(e, 'group', 31, () => Pt([])),
    l = R(e, 'choices', 19, () => []),
    n = R(e, 'checked', 15, !1),
    d = R(e, 'labelProps', 19, () => ({})),
    c = je(e, [
      '$$slots',
      '$$events',
      '$$legacy',
      'children',
      'color',
      'custom',
      'inline',
      'tinted',
      'rounded',
      'group',
      'choices',
      'checked',
      'classes',
      'class',
      'divClass',
      'disabled',
      'value',
      'labelProps',
    ]);
  Me(() => ({divClass: e.divClass}));
  const g = z(() => e.classes ?? {div: e.divClass}),
    f = z(() => He('checkbox')),
    p = z(() =>
      is({
        color: t(),
        tinted: e.tinted,
        custom: e.custom,
        rounded: e.rounded,
        inline: e.inline,
        disabled: e.disabled ?? !1,
      }),
    ),
    m = z(() => o(p).base),
    A = z(() => o(p).div);
  (pr(() => {
    e.value !== void 0 && Array.isArray(s()) && n(s().includes(e.value));
  }),
    pr(() => {
      if (e.value === void 0 || !Array.isArray(s())) return;
      const _ = s().indexOf(e.value);
      (n() === void 0 && n(_ >= 0), n() ? _ < 0 && s().push(e.value) : _ >= 0 && s().splice(_, 1));
    }));
  var P = ie(),
    C = ae(P);
  {
    var S = (_) => {
        var u = ie(),
          E = ae(u);
        (Et(
          E,
          19,
          l,
          (M, h) => M.value ?? h,
          (M, h) => {
            {
              let v = z(() => !!e.children || !!o(h).label),
                b = z(() => o(A)({class: $(o(f)?.div, o(g).div)}));
              fr(
                M,
                Tr(
                  {
                    get show() {
                      return o(v);
                    },
                  },
                  d,
                  {
                    get class() {
                      return o(b);
                    },
                    children: (B, D) => {
                      var F = cs(),
                        V = ae(F);
                      ve(
                        V,
                        (w) => ({
                          type: 'checkbox',
                          value: o(h).value,
                          checked: o(h).checked ?? !1,
                          disabled: e.disabled,
                          ...c,
                          class: w,
                        }),
                        [() => o(m)({class: $(o(f)?.base, e.class)})],
                        void 0,
                        void 0,
                        void 0,
                        !0,
                      );
                      var j = ee(V, 2);
                      {
                        var N = (w) => {
                            var I = ie(),
                              y = ae(I);
                            (fe(
                              y,
                              () => e.children,
                              () => ({value: o(h).value, checked: o(h).checked, disabled: e.disabled}),
                            ),
                              T(w, I));
                          },
                          x = (w) => {
                            var I = Xe();
                            (de(() => Ue(I, o(h).label)), T(w, I));
                          };
                        Y(j, (w) => {
                          e.children ? w(N) : w(x, !1);
                        });
                      }
                      (Xa(a, [], V, () => (o(h).value, s()), s), T(B, F));
                    },
                    $$slots: {default: !0},
                  },
                ),
              );
            }
          },
        ),
          T(_, u));
      },
      k = (_) => {
        {
          let u = z(() => !!e.children),
            E = z(() => o(A)({class: $(o(f)?.div, o(g).div)}));
          fr(
            _,
            Tr(
              {
                get show() {
                  return o(u);
                },
              },
              d,
              {
                get class() {
                  return o(E);
                },
                children: (M, h) => {
                  var v = us(),
                    b = ae(v);
                  ve(
                    b,
                    (F) => ({type: 'checkbox', value: e.value, disabled: e.disabled, ...c, class: F}),
                    [() => o(m)({class: $(o(f)?.base, e.class)})],
                    void 0,
                    void 0,
                    void 0,
                    !0,
                  );
                  var B = ee(b, 2);
                  {
                    var D = (F) => {
                      var V = ie(),
                        j = ae(V);
                      (fe(
                        j,
                        () => e.children,
                        () => ({value: e.value, checked: n(), disabled: e.disabled}),
                      ),
                        T(F, V));
                    };
                    Y(B, (F) => {
                      e.children && F(D);
                    });
                  }
                  (Za(b, n), T(M, v));
                },
                $$slots: {default: !0},
              },
            ),
          );
        }
      };
    Y(C, (_) => {
      l().length > 0 ? _(S) : _(k, !1);
    });
  }
  (T(r, P), Pe());
}
i({
  base: 'flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600',
});
i({
  slots: {
    base: 'block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg border p-0! dark:text-gray-400',
    wrapper: 'relative w-full',
    close: 'flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400 end-0 p-2.5',
    svg: '',
  },
  variants: {
    size: {
      sm: {base: 'text-xs ps-9 pe-9 p-2'},
      md: {base: 'text-sm ps-10 pe-10 p-2.5'},
      lg: {base: 'sm:text-base ps-11 pe-11 p-3'},
    },
  },
});
i({
  slots: {
    base: 'relative',
    input:
      'block w-full text-sm text-gray-900 bg-transparent appearance-none dark:text-white focus:outline-hidden focus:ring-0 peer disabled:cursor-not-allowed disabled:opacity-50',
    label:
      'absolute text-sm duration-300 transform scale-75 z-10 origin-left rtl:origin-right peer-placeholder-shown:scale-100 peer-focus:scale-75',
    close: 'absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black',
    combo:
      'absolute top-full right-0 left-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800',
    svg: '',
  },
  variants: {
    variant: {
      filled: {
        base: 'relative',
        input: 'rounded-t-lg border-0 border-b-2 bg-gray-50 dark:bg-gray-700',
        label: '-translate-y-4 start-2.5 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4',
      },
      outlined: {
        base: 'relative',
        input: 'rounded-lg border',
        label:
          '-translate-y-4 bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 start-1',
      },
      standard: {
        base: 'relative z-0',
        input: 'border-0 border-b-2',
        label: '-translate-y-6 -z-10 peer-focus:start-0 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6',
      },
    },
    size: {small: {}, default: {}},
    color: {
      default: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-primary-500 focus:border-primary-600',
        label: 'text-gray-500 dark:text-gray-400 peer-focus:text-primary-600 dark:peer-focus:text-primary-500',
      },
      primary: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-primary-500 focus:border-primary-600',
        label: 'text-primary-500 dark:text-primary-400 peer-focus:text-primary-600 dark:peer-focus:text-primary-500',
      },
      secondary: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-secondary-500 focus:border-secondary-600',
        label:
          'text-secondary-500 dark:text-secondary-400 peer-focus:text-secondary-600 dark:peer-focus:text-secondary-500',
      },
      gray: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-gray-500 focus:border-gray-600',
        label: 'text-gray-500 dark:text-gray-400 peer-focus:text-gray-600 dark:peer-focus:text-gray-500',
      },
      red: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-red-500 focus:border-red-600',
        label: 'text-red-500 dark:text-red-400 peer-focus:text-red-600 dark:peer-focus:text-red-500',
      },
      orange: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-orange-500 focus:border-orange-600',
        label: 'text-orange-500 dark:text-orange-400 peer-focus:text-orange-600 dark:peer-focus:text-orange-500',
      },
      amber: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-amber-500 focus:border-amber-600',
        label: 'text-amber-500 dark:text-amber-400 peer-focus:text-amber-600 dark:peer-focus:text-amber-500',
      },
      yellow: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-yellow-500 focus:border-yellow-600',
        label: 'text-yellow-500 dark:text-yellow-400 peer-focus:text-yellow-600 dark:peer-focus:text-yellow-500',
      },
      lime: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-lime-500 focus:border-lime-600',
        label: 'text-lime-500 dark:text-lime-400 peer-focus:text-lime-600 dark:peer-focus:text-lime-500',
      },
      green: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-green-500 focus:border-green-600',
        label: 'text-green-500 dark:text-green-400 peer-focus:text-green-600 dark:peer-focus:text-green-500',
      },
      emerald: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-emerald-500 focus:border-emerald-600',
        label: 'text-emerald-500 dark:text-emerald-400 peer-focus:text-emerald-600 dark:peer-focus:text-emerald-500',
      },
      teal: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-teal-500 focus:border-teal-600',
        label: 'text-teal-500 dark:text-teal-400 peer-focus:text-teal-600 dark:peer-focus:text-teal-500',
      },
      cyan: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-cyan-500 focus:border-cyan-600',
        label: 'text-cyan-500 dark:text-cyan-400 peer-focus:text-cyan-600 dark:peer-focus:text-cyan-500',
      },
      sky: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-sky-500 focus:border-sky-600',
        label: 'text-sky-500 dark:text-sky-400 peer-focus:text-sky-600 dark:peer-focus:text-sky-500',
      },
      blue: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600',
        label: 'text-blue-500 dark:text-blue-400 peer-focus:text-blue-600 dark:peer-focus:text-blue-500',
      },
      indigo: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-indigo-500 focus:border-indigo-600',
        label: 'text-indigo-500 dark:text-indigo-400 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-500',
      },
      violet: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-violet-500 focus:border-violet-600',
        label: 'text-violet-600 dark:text-violet-500 peer-focus:text-violet-600 dark:peer-focus:text-violet-500',
      },
      purple: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-purple-500 focus:border-purple-600',
        label: 'text-purple-600 dark:text-purple-500 peer-focus:text-purple-600 dark:peer-focus:text-purple-500',
      },
      fuchsia: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-fuchsia-500 focus:border-fuchsia-600',
        label: 'text-fuchsia-600 dark:text-fuchsia-500 peer-focus:text-fuchsia-600 dark:peer-focus:text-fuchsia-500',
      },
      pink: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-pink-500 focus:border-pink-600',
        label: 'text-pink-600 dark:text-pink-500 peer-focus:text-pink-600 dark:peer-focus:text-pink-500',
      },
      rose: {
        input: 'border-gray-300 dark:border-gray-600 dark:focus:border-rose-500 focus:border-rose-600',
        label: 'text-rose-600 dark:text-rose-500 peer-focus:text-rose-600 dark:peer-focus:text-rose-500',
      },
    },
  },
  compoundVariants: [
    {variant: 'filled', size: 'small', class: {input: 'px-2.5 pb-1.5 pt-4', label: 'top-3'}},
    {variant: 'filled', size: 'default', class: {input: 'px-2.5 pb-2.5 pt-5', label: 'top-4'}},
    {variant: 'outlined', size: 'small', class: {input: 'px-2.5 pb-1.5 pt-3', label: 'top-1'}},
    {variant: 'outlined', size: 'default', class: {input: 'px-2.5 pb-2.5 pt-4', label: 'top-2'}},
    {variant: 'standard', size: 'small', class: {input: 'py-2 px-0', label: 'top-3'}},
    {variant: 'standard', size: 'default', class: {input: 'py-2.5 px-0', label: 'top-3'}},
    {variant: 'filled', color: 'primary', class: {input: 'dark:focus:border-primary-500 focus:border-primary-600'}},
  ],
  defaultVariants: {variant: 'standard', size: 'default', color: 'primary'},
});
ge(['click']);
const fs = i({
  base: 'text-xs font-normal text-gray-500 dark:text-gray-300',
  variants: {
    color: {
      disabled: 'text-gray-400 dark:text-gray-500',
      primary: 'text-primary-500 dark:text-primary-400',
      secondary: 'text-secondary-500 dark:text-secondary-400',
      green: 'text-green-500 dark:text-green-400',
      emerald: 'text-emerald-500 dark:text-emerald-400',
      red: 'text-red-500 dark:text-red-400',
      blue: 'text-blue-500 dark:text-blue-400',
      yellow: 'text-yellow-500 dark:text-yellow-400',
      orange: 'text-orange-500 dark:text-orange-400',
      gray: 'text-gray-500 dark:text-gray-400',
      teal: 'text-teal-500 dark:text-teal-400',
      cyan: 'text-cyan-500 dark:text-cyan-400',
      sky: 'text-sky-500 dark:text-sky-400',
      indigo: 'text-indigo-500 dark:text-indigo-400',
      lime: 'text-lime-500 dark:text-lime-400',
      amber: 'text-amber-500 dark:text-amber-400',
      violet: 'text-violet-500 dark:text-violet-400',
      purple: 'text-purple-500 dark:text-purple-400',
      fuchsia: 'text-fuchsia-500 dark:text-fuchsia-400',
      pink: 'text-pink-500 dark:text-pink-400',
      rose: 'text-rose-500 dark:text-rose-400',
    },
  },
});
var ps = X('<p><!></p>');
function _r(r, e) {
  Se(e, !0);
  let a = R(e, 'color', 3, 'gray'),
    t = je(e, ['$$slots', '$$events', '$$legacy', 'children', 'class', 'color']);
  const s = z(() => He('helper')),
    l = z(() => fs({color: a(), class: $(o(s), e.class)}));
  var n = ps();
  ve(n, () => ({...t, class: o(l)}));
  var d = re(n);
  (fe(d, () => e.children ?? Te), T(r, n), Pe());
}
const ys = i({
  slots: {
    base: 'relative w-full',
    input: 'block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right focus:outline-hidden',
    left: 'flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400 pointer-events-none start-0 p-2.5',
    right: 'flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400 end-0 p-2.5',
    close: 'absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black',
    combo:
      'absolute top-full right-0 left-0 z-20 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800',
    comboItem: 'text-gray-900 dark:text-gray-50',
    div: '',
    svg: '',
  },
  variants: {
    size: {
      sm: {input: 'text-xs px-2 py-1'},
      md: {input: 'text-sm px-2.5 py-2.5'},
      lg: {input: 'sm:text-base px-3 py-3'},
    },
    color: {
      default: {
        input:
          'border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400',
      },
      tinted: {
        input:
          'border border-gray-300 dark:border-gray-500 bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400',
      },
      primary: {
        input:
          'border border-primary-200 dark:border-primary-400 focus:ring-primary-500 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 bg-primary-50 text-primary-900 placeholder-primary-700 dark:text-primary-400 dark:placeholder-primary-500 dark:bg-gray-700',
      },
      secondary: {
        input:
          'border border-secondary-200 dark:border-secondary-400 focus:ring-secondary-500 focus:border-secondary-600 dark:focus:ring-secondary-500 dark:focus:border-secondary-500 bg-secondary-50 text-secondary-900 placeholder-secondary-700 dark:text-secondary-400 dark:placeholder-secondary-500 dark:bg-gray-700',
      },
      green: {
        input:
          'border border-green-200 dark:border-green-400 focus:ring-green-500 focus:border-green-600 dark:focus:ring-green-500 dark:focus:border-green-500 bg-green-50 text-green-900 placeholder-green-700 dark:text-green-400 dark:placeholder-green-500 dark:bg-gray-700',
      },
      emerald: {
        input:
          'border border-emerald-200 dark:border-emerald-400 focus:ring-emerald-500 focus:border-emerald-600 dark:focus:ring-emerald-500 dark:focus:border-emerald-500 bg-emerald-50 text-emerald-900 placeholder-emerald-700 dark:text-emerald-400 dark:placeholder-emerald-500 dark:bg-gray-700',
      },
      red: {
        input:
          'border border-red-200 dark:border-red-400 focus:ring-red-500 focus:border-red-600 dark:focus:ring-red-500 dark:focus:border-red-500 bg-red-50 text-red-900 placeholder-red-700 dark:text-red-400 dark:placeholder-red-500 dark:bg-gray-700',
      },
      blue: {
        input:
          'border border-blue-200 dark:border-blue-400 focus:ring-blue-500 focus:border-blue-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-700 dark:text-blue-400 dark:placeholder-blue-500 dark:bg-gray-700',
      },
      yellow: {
        input:
          'border border-yellow-200 dark:border-yellow-400 focus:ring-yellow-500 focus:border-yellow-600 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 dark:text-yellow-400 dark:placeholder-yellow-500 dark:bg-gray-700',
      },
      orange: {
        input:
          'border border-orange-200 dark:border-orange-400 focus:ring-orange-500 focus:border-orange-600 dark:focus:ring-orange-500 dark:focus:border-orange-500 bg-orange-50 text-orange-900 placeholder-orange-700 dark:text-orange-400 dark:placeholder-orange-500 dark:bg-gray-700',
      },
      gray: {
        input:
          'border border-gray-200 dark:border-gray-400 focus:ring-gray-500 focus:border-gray-600 dark:focus:ring-gray-500 dark:focus:border-gray-500 bg-gray-50 text-gray-900 placeholder-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:bg-gray-700',
      },
      teal: {
        input:
          'border border-teal-200 dark:border-teal-400 focus:ring-teal-500 focus:border-teal-600 dark:focus:ring-teal-500 dark:focus:border-teal-500 bg-teal-50 text-teal-900 placeholder-teal-700 dark:text-teal-400 dark:placeholder-teal-500 dark:bg-gray-700',
      },
      cyan: {
        input:
          'border border-cyan-200 dark:border-cyan-400 focus:ring-cyan-500 focus:border-cyan-600 dark:focus:ring-cyan-500 dark:focus:border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 dark:text-cyan-400 dark:placeholder-cyan-500 dark:bg-gray-700',
      },
      sky: {
        input:
          'border border-sky-200 dark:border-sky-400 focus:ring-sky-500 focus:border-sky-600 dark:focus:ring-sky-500 dark:focus:border-sky-500 bg-sky-50 text-sky-900 placeholder-sky-700 dark:text-sky-400 dark:placeholder-sky-500 dark:bg-gray-700',
      },
      indigo: {
        input:
          'border border-indigo-200 dark:border-indigo-400 focus:ring-indigo-500 focus:border-indigo-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 bg-indigo-50 text-indigo-900 placeholder-indigo-700 dark:text-indigo-400 dark:placeholder-indigo-500 dark:bg-gray-700',
      },
      lime: {
        input:
          'border border-lime-200 dark:border-lime-400 focus:ring-lime-500 focus:border-lime-600 dark:focus:ring-lime-500 dark:focus:border-lime-500 bg-lime-50 text-lime-900 placeholder-lime-700 dark:text-lime-400 dark:placeholder-lime-500 dark:bg-gray-700',
      },
      amber: {
        input:
          'border border-amber-200 dark:border-amber-400 focus:ring-amber-500 focus:border-amber-600 dark:focus:ring-amber-500 dark:focus:border-amber-500 bg-amber-50 text-amber-900 placeholder-amber-700 dark:text-amber-400 dark:placeholder-amber-500 dark:bg-gray-700',
      },
      violet: {
        input:
          'border border-violet-200 dark:border-violet-400 focus:ring-violet-500 focus:border-violet-600 dark:focus:ring-violet-500 dark:focus:border-violet-500 bg-violet-50 text-violet-900 placeholder-violet-700 dark:text-violet-400 dark:placeholder-violet-500 dark:bg-gray-700',
      },
      purple: {
        input:
          'border border-purple-200 dark:border-purple-400 focus:ring-purple-500 focus:border-purple-600 dark:focus:ring-purple-500 dark:focus:border-purple-500 bg-purple-50 text-purple-900 placeholder-purple-700 dark:text-purple-400 dark:placeholder-purple-500 dark:bg-gray-700',
      },
      fuchsia: {
        input:
          'border border-fuchsia-200 dark:border-fuchsia-400 focus:ring-fuchsia-500 focus:border-fuchsia-600 dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500 bg-fuchsia-50 text-fuchsia-900 placeholder-fuchsia-700 dark:text-fuchsia-400 dark:placeholder-fuchsia-500 dark:bg-gray-700',
      },
      pink: {
        input:
          'border border-pink-200 dark:border-pink-400 focus:ring-pink-500 focus:border-pink-600 dark:focus:ring-pink-500 dark:focus:border-pink-500 bg-pink-50 text-pink-900 placeholder-pink-700 dark:text-pink-400 dark:placeholder-pink-500 dark:bg-gray-700',
      },
      rose: {
        input:
          'border border-rose-200 dark:border-rose-400 focus:ring-rose-500 focus:border-rose-600 dark:focus:ring-rose-500 dark:focus:border-rose-500 bg-rose-50 text-rose-900 placeholder-rose-700 dark:text-rose-400 dark:placeholder-rose-500 dark:bg-gray-700',
      },
    },
    grouped: {
      false: {base: 'rounded-lg', input: 'rounded-lg'},
      true: {
        base: 'first:rounded-s-lg last:rounded-e-lg not-first:-ms-px',
        input: 'first:rounded-s-lg last:rounded-e-lg not-first:-ms-px h-full',
      },
    },
  },
  defaultVariants: {size: 'md', color: 'default'},
});
var ms = X('<input/> <!>', 1),
  xs = X('<div tabindex="-1" class="sr-only"></div>'),
  ks = X('<div><!></div>'),
  hs = X('<div><!></div>'),
  vs = X('<button type="button"><p> </p></button>'),
  ws = X('<div></div>'),
  Cs = X('<div><!> <!> <!> <!></div>'),
  _s = X('<!> <!>', 1);
function zs(r, e) {
  Se(e, !0);
  const a = (J, G = Te) => {
    var oe = ie(),
      ue = ae(oe);
    {
      var xe = (Ae) => {
          var Ce = ie(),
            me = ae(Ce);
          {
            let le = z(() => ({...f, class: o(D)()}));
            fe(
              me,
              () => e.children,
              () => o(le),
            );
          }
          T(Ae, Ce);
        },
        We = (Ae) => {
          var Ce = ms(),
            me = ae(Ce);
          (ve(
            me,
            (be) => ({...f, oninput: Ee, onfocus: pe, onblur: Je, onkeydown: Ie, class: be}),
            [() => [G() || o(B)(), o(D)({class: $(o(m)?.input, e.class)})]],
            void 0,
            void 0,
            void 0,
            !0,
          ),
            tr(
              me,
              (be) => s(be),
              () => s(),
            ));
          var le = ee(me, 2);
          {
            var ye = (be) => {
              {
                let ce = z(() => o(j)({class: $(o(m)?.close, o(p).close)})),
                  Ve = z(() => $(o(p).svg));
                ar(be, {
                  get class() {
                    return o(ce);
                  },
                  get color() {
                    return d();
                  },
                  'aria-label': 'Clear search value',
                  get svgClass() {
                    return o(Ve);
                  },
                });
              }
            };
            Y(le, (be) => {
              t() !== void 0 && t() !== '' && l() && be(ye);
            });
          }
          (Hr(me, t), T(Ae, Ce));
        };
      Y(ue, (Ae) => {
        e.children ? Ae(xe) : Ae(We, !1);
      });
    }
    T(J, oe);
  };
  let t = R(e, 'value', 15),
    s = R(e, 'elementRef', 15),
    l = R(e, 'clearable', 3, !1),
    n = R(e, 'color', 3, 'default'),
    d = R(e, 'clearableColor', 3, 'none'),
    c = R(e, 'data', 19, () => []),
    g = R(e, 'maxSuggestions', 3, 5),
    f = je(e, [
      '$$slots',
      '$$events',
      '$$legacy',
      'children',
      'left',
      'right',
      'value',
      'elementRef',
      'clearable',
      'size',
      'color',
      'class',
      'classes',
      'wrapperClass',
      'leftClass',
      'rightClass',
      'divClass',
      'clearableSvgClass',
      'clearableColor',
      'clearableClass',
      'clearableOnClick',
      'data',
      'maxSuggestions',
      'onSelect',
      'comboClass',
      'comboItemClass',
      'onInput',
      'onFocus',
      'onBlur',
      'onKeydown',
      'oninput',
      'onfocus',
      'onblur',
      'onkeydown',
    ]);
  Me(() => ({
    wrapperClass: e.wrapperClass,
    leftClass: e.leftClass,
    rightClass: e.rightClass,
    divClass: e.divClass,
    clearableSvgClass: e.clearableSvgClass,
    clearableClass: e.clearableClass,
    comboClass: e.comboClass,
  }));
  const p = z(
      () =>
        e.classes ?? {
          left: e.leftClass,
          right: e.rightClass,
          div: e.divClass,
          svg: e.clearableSvgClass,
          close: e.clearableClass,
          combo: e.comboClass,
          comboItem: e.comboItemClass,
        },
    ),
    m = z(() => He('input')),
    A = z(() => e.oninput || e.onInput),
    P = z(() => e.onfocus || e.onFocus),
    C = z(() => e.onblur || e.onBlur),
    S = z(() => e.onkeydown || e.onKeydown),
    k = z(() => Array.isArray(c()) && c().length > 0);
  let _ = St('background'),
    u,
    E = z(la),
    M = z(() => !!o(E)),
    h = z(() => e.size || (o(E)?.size ? As(o(E).size) : void 0) || 'md');
  const v = z(() => (n() === 'default' && _ ? 'tinted' : n())),
    b = z(() => ys({size: o(h), color: o(v), grouped: o(M)})),
    B = z(() => o(b).base),
    D = z(() => o(b).input),
    F = z(() => o(b).left),
    V = z(() => o(b).right),
    j = z(() => o(b).close),
    N = z(() => o(b).combo),
    x = z(() => o(b).comboItem);
  Mr(() => {
    if (s()) {
      const J = s();
      ((J.value = ''),
        t(''),
        H(W, !1),
        se(),
        u?.focus(),
        setTimeout(() => {
          J.focus();
        }, 100));
    }
    e.clearableOnClick && e.clearableOnClick();
  });
  let I = rr(!1),
    y = rr(Pt([])),
    U = rr(-1),
    W = rr(!1);
  function se() {
    if (!o(k) || !o(I)) {
      H(y, [], !0);
      return;
    }
    const J = (t() || '').toLowerCase(),
      G = J.lastIndexOf(' '),
      oe = G === -1 ? J : J.substring(G + 1);
    (oe === '' && !o(W)
      ? H(y, [], !0)
      : oe
        ? H(
            y,
            c()
              .filter((ue) => ue.toLowerCase().includes(oe))
              .slice(0, g()),
            !0,
          )
        : o(W) && H(y, [...c()].slice(0, g()), !0),
      H(U, -1));
  }
  pr(() => {
    o(k) && se();
  });
  function K(J) {
    (String(t() || '').length > 0 && H(W, !1), se());
  }
  function q() {
    (H(I, !0), se());
  }
  function te() {
    setTimeout(() => {
      (H(I, !1), H(W, !1), H(y, [], !0));
    }, 200);
  }
  function ne(J) {
    if (o(k) && ((J.key === 'Backspace' || J.key === 'Delete') && t().length <= 1 && H(W, !0), !!o(y).length))
      switch (J.key) {
        case 'ArrowDown':
          (J.preventDefault(), H(U, (o(U) + 1) % o(y).length));
          break;
        case 'ArrowUp':
          (J.preventDefault(), H(U, o(U) <= 0 ? o(y).length - 1 : o(U) - 1, !0));
          break;
        case 'Enter':
          o(U) >= 0 && (J.preventDefault(), Le(o(y)[o(U)]));
          break;
        case 'Escape':
          (J.preventDefault(), H(y, [], !0));
          break;
      }
  }
  function Ee(J) {
    (o(A) && o(A)(J), K());
  }
  function pe(J) {
    (o(P) && o(P)(J), q());
  }
  function Je(J) {
    (o(C) && o(C)(J), te());
  }
  function Ie(J) {
    (o(S) && o(S)(J), ne(J));
  }
  function Le(J) {
    const G = t() || '',
      oe = G.lastIndexOf(' ');
    (t(oe === -1 ? J + ' ' : G.substring(0, oe + 1) + J + ' '),
      e.onSelect && e.onSelect(J),
      H(y, [], !0),
      H(U, -1),
      s() && s().focus());
  }
  var Oe = _s(),
    Re = ae(Oe);
  {
    var jr = (J) => {
      var G = xs();
      (tr(
        G,
        (oe) => (u = oe),
        () => u,
      ),
        T(J, G));
    };
    Y(Re, (J) => {
      l() && J(jr);
    });
  }
  var Ir = ee(Re, 2);
  {
    var Lr = (J) => {
        var G = Cs(),
          oe = re(G);
        {
          var ue = (le) => {
            var ye = ks(),
              be = re(ye);
            (fe(be, () => e.left),
              de((ce) => he(ye, 1, ce), [() => we(o(F)({class: $(o(m)?.left, o(p).left)}))]),
              T(le, ye));
          };
          Y(oe, (le) => {
            e.left && le(ue);
          });
        }
        var xe = ee(oe, 2);
        a(xe, () => !0);
        var We = ee(xe, 2);
        {
          var Ae = (le) => {
            var ye = hs(),
              be = re(ye);
            (fe(be, () => e.right),
              de((ce) => he(ye, 1, ce), [() => we(o(V)({class: $(o(m)?.right, o(p).right)}))]),
              T(le, ye));
          };
          Y(We, (le) => {
            e.right && le(Ae);
          });
        }
        var Ce = ee(We, 2);
        {
          var me = (le) => {
            var ye = ws();
            (Et(
              ye,
              22,
              () => o(y),
              (be) => be,
              (be, ce, Ve) => {
                var lr = vs(),
                  at = re(lr),
                  ia = re(at);
                (de(
                  (da) => {
                    (he(
                      lr,
                      1,
                      `w-full px-3 py-2 text-left ${o(Ve) === o(U) ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'} focus:outline-none`,
                    ),
                      he(at, 1, da),
                      Ue(ia, ce));
                  },
                  [() => we(o(x)({class: $(o(m)?.comboItem, o(p).comboItem)}))],
                ),
                  Tt('click', lr, () => Le(ce)),
                  Ya('mouseenter', lr, () => H(U, o(Ve), !0)),
                  T(be, lr));
              },
            ),
              de((be) => he(ye, 1, be), [() => we(o(N)({class: $(o(m)?.combo, o(p).combo)}))]),
              T(le, ye));
          };
          Y(Ce, (le) => {
            o(k) && o(I) && o(y).length > 0 && le(me);
          });
        }
        (de((le) => he(G, 1, le), [() => we(o(B)({class: $(o(m)?.base, o(p).div)}))]), T(J, G));
      },
      yr = (J) => {
        a(J, () => !1);
      };
    Y(Ir, (J) => {
      o(k) || e.right || e.left || l() ? J(Lr) : J(yr, !1);
    });
  }
  (T(r, Oe), Pe());
}
ge(['click']);
function As(r) {
  return r && r === 'xs' ? 'sm' : r === 'xl' ? 'lg' : r;
}
i({
  slots: {
    div: 'absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none',
    svg: 'w-4 h-4 text-gray-500 dark:text-gray-400',
    input:
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50',
    span: 'absolute start-0 bottom-3 text-gray-500 dark:text-gray-400',
    floatingInput:
      'block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer disabled:cursor-not-allowed disabled:opacity-50',
    label:
      'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto',
  },
  variants: {
    phoneType: {
      default: {},
      floating: {svg: 'w-4 h-4 rtl:rotate-[270deg]'},
      countryCode: {input: 'rounded-none rounded-e-lg'},
      copy: {},
      advanced: {},
    },
    phoneIcon: {true: {input: 'ps-10'}, false: {}},
  },
});
i({
  slots: {
    input: 'flex items-center w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 mr-2',
    label: 'flex items-center',
  },
  variants: {
    color: {
      primary: {input: 'text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600'},
      secondary: {input: 'text-secondary-600 focus:ring-secondary-500 dark:focus:ring-secondary-600'},
      gray: {input: 'text-gray-600 focus:ring-gray-500 dark:focus:ring-gray-600'},
      red: {input: 'text-red-600 focus:ring-red-500 dark:focus:ring-red-600'},
      orange: {input: 'text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600'},
      amber: {input: 'text-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600'},
      yellow: {input: 'text-yellow-400 focus:ring-yellow-500 dark:focus:ring-yellow-600'},
      lime: {input: 'text-lime-600 focus:ring-lime-500 dark:focus:ring-lime-600'},
      green: {input: 'text-green-600 focus:ring-green-500 dark:focus:ring-green-600'},
      emerald: {input: 'text-emerald-600 focus:ring-emerald-500 dark:focus:ring-emerald-600'},
      teal: {input: 'text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600'},
      cyan: {input: 'text-cyan-600 focus:ring-cyan-500 dark:focus:ring-cyan-600'},
      sky: {input: 'text-sky-600 focus:ring-sky-500 dark:focus:ring-sky-600'},
      blue: {input: 'text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600'},
      indigo: {input: 'text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600'},
      violet: {input: 'text-violet-600 focus:ring-violet-500 dark:focus:ring-violet-600'},
      purple: {input: 'text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600'},
      fuchsia: {input: 'text-fuchsia-600 focus:ring-fuchsia-500 dark:focus:ring-fuchsia-600'},
      pink: {input: 'text-pink-600 focus:ring-pink-500 dark:focus:ring-pink-600'},
      rose: {input: 'text-rose-600 focus:ring-rose-500 dark:focus:ring-rose-600'},
    },
    tinted: {
      true: {input: 'dark:bg-gray-600 dark:border-gray-500'},
      false: {input: 'dark:bg-gray-700 dark:border-gray-600'},
    },
    custom: {true: {input: 'sr-only peer'}, false: {input: 'relative'}},
    inline: {true: {label: 'inline-flex'}, false: {label: 'flex'}},
  },
  defaultVariants: {color: 'primary'},
});
i({base: '', variants: {inline: {true: 'inline-flex', false: 'flex'}}, defaultVariants: {inline: !0}});
i({
  base: 'w-full bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700',
  variants: {
    size: {sm: 'h-1 range-sm', md: 'h-2', lg: 'h-3 range-lg'},
    color: {gray: '', red: '', blue: '', indigo: '', violet: '', purple: '', fuchsia: '', pink: '', rose: ''},
    appearance: {auto: 'range accent-red-500', none: 'appearance-none'},
  },
  compoundVariants: [
    {appearance: 'auto', color: 'gray', class: 'accent-gray-500'},
    {appearance: 'auto', color: 'red', class: 'accent-red-500'},
    {appearance: 'auto', color: 'blue', class: 'accent-blue-500'},
    {appearance: 'auto', color: 'indigo', class: 'accent-indigo-500'},
    {appearance: 'auto', color: 'violet', class: 'accent-violet-500'},
    {appearance: 'auto', color: 'purple', class: 'accent-purple-500'},
    {appearance: 'auto', color: 'fuchsia', class: 'accent-fuchsia-500'},
    {appearance: 'auto', color: 'pink', class: 'accent-pink-500'},
    {appearance: 'auto', color: 'rose', class: 'accent-rose-500'},
  ],
});
i({
  slots: {
    base: 'relative w-full',
    left: 'absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none',
    icon: 'text-gray-500 dark:text-gray-400',
    content: 'absolute inset-y-0 end-0 flex items-center text-gray-500 dark:text-gray-400',
    input:
      'block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50',
    close: 'absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black',
    svg: '',
  },
  variants: {
    size: {
      sm: {input: 'text-xs p-2 ps-9 pe-9 ', icon: 'w-3 h-3'},
      md: {input: 'text-sm p-2.5 ps-10 pe-10', icon: 'w-4 h-4'},
      lg: {input: 'sm:text-base p-3 ps-11 pe-11', icon: 'w-6 h-6'},
    },
  },
  defaultVariants: {size: 'lg'},
});
i({
  slots: {
    base: 'relative w-full',
    select: 'block w-full rtl:text-right',
    close: 'absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black',
    svg: '',
  },
  variants: {
    underline: {
      true: {
        select:
          'text-gray-500 bg-transparent rounded-none! border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-hidden focus:ring-0 focus:border-gray-200 peer px-0!',
      },
      false: {
        select:
          'text-gray-900 bg-gray-50 border border-gray-300 focus:outline-hidden focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500',
      },
    },
    size: {
      sm: {select: 'text-xs px-2.5 py-2.5'},
      md: {select: 'text-sm px-2.5 py-2.5'},
      lg: {select: 'text-base py-3 px-4'},
    },
    disabled: {true: {select: 'cursor-not-allowed opacity-50'}, false: {}},
    grouped: {
      false: {base: 'rounded-lg', select: 'rounded-lg'},
      true: {
        base: 'first:rounded-s-lg last:rounded-e-lg not-first:-ms-px group',
        select: 'group-first:rounded-s-lg group-last:rounded-e-lg group-not-first:-ms-px h-full',
      },
    },
  },
  defaultVariants: {underline: !1, size: 'md'},
});
i({
  slots: {
    base: 'relative border border-gray-300 w-full flex items-center gap-2 dark:border-gray-600 ring-primary-500 dark:ring-primary-500 focus-visible:outline-hidden',
    select: '',
    dropdown:
      'absolute z-50 p-3 flex flex-col gap-1 max-h-64 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 start-0 top-[calc(100%+1rem)] rounded-lg cursor-pointer overflow-y-scroll w-full',
    item: 'py-2 px-3 rounded-lg text-gray-600 hover:text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-600',
    close: 'p-0 focus:ring-gray-400 dark:text-white',
    span: '',
    placeholder: 'text-gray-400',
    svg: 'ms-1 h-3 w-3 cursor-pointer text-gray-800 dark:text-white',
  },
  variants: {
    size: {
      sm: 'px-2.5 py-2.5 min-h-[2.4rem] text-xs',
      md: 'px-2.5 py-2.5 min-h-[2.7rem] text-sm',
      lg: 'px-3 py-3 min-h-[3.2rem] sm:text-base',
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed opacity-50 pointer-events-none',
        item: 'cursor-not-allowed opacity-50',
        close: 'cursor-not-allowed',
      },
      false: {base: 'focus-within:border-primary-500 dark:focus-within:border-primary-500 focus-within:ring-1'},
    },
    active: {
      true: {
        item: 'bg-primary-100 text-primary-500 dark:bg-primary-500 dark:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-500 hover:text-primary-600 dark:hover:text-primary-100',
      },
    },
    selected: {
      true: {
        item: 'bg-gray-100 text-black font-semibold hover:text-black dark:text-white dark:bg-gray-600 dark:hover:text-white',
      },
    },
    grouped: {
      false: {base: 'rounded-lg', select: 'rounded-lg'},
      true: {
        base: 'first:rounded-s-lg last:rounded-e-lg not-first:-ms-px group',
        select: 'group-first:rounded-s-lg group-last:rounded-e-lg group-not-first:-ms-px h-full',
      },
    },
  },
  compoundVariants: [
    {
      selected: !0,
      active: !0,
      class: {item: 'bg-primary-200 dark:bg-primary-600 text-primary-700 dark:text-primary-100 font-semibold'},
    },
  ],
  defaultVariants: {underline: !1, size: 'md'},
});
ge(['change', 'click']);
const Vs = i({
  slots: {
    div: 'relative',
    base: 'block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-hidden focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
    wrapper:
      'text-sm rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:placeholder-gray-400 dark:text-white border border-gray-200 dark:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50',
    inner: 'py-2 px-4 bg-white dark:bg-gray-800',
    header: 'py-2 px-3 border-gray-200 dark:border-gray-500',
    footer: 'py-2 px-3 border-gray-200 dark:border-gray-500',
    addon: 'absolute top-2 right-2 z-10',
    close: 'absolute right-2 top-5 -translate-y-1/2 text-gray-400 hover:text-black',
    svg: '',
  },
  variants: {
    wrapped: {
      false: {
        wrapper:
          'p-2.5 text-sm focus:outline-hidden focus:ring-primary-500 border-gray-300 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
    hasHeader: {true: {header: 'border-b'}, false: {inner: 'rounded-t-lg'}},
    hasFooter: {true: {footer: 'border-t'}, false: {inner: 'rounded-b-lg'}},
  },
});
var Ts = X('<textarea></textarea>'),
  Ss = X('<div><!></div>'),
  Ps = X('<div><!></div>'),
  Es = X('<div><!></div>'),
  Ns = X('<div><!> <div><!> <textarea></textarea></div> <!></div>'),
  Bs = X('<div><!> <!></div>');
function Ms(r, e) {
  Se(e, !0);
  let a = R(e, 'value', 15),
    t = R(e, 'elementRef', 15),
    s = R(e, 'clearableColor', 3, 'none'),
    l = je(e, [
      '$$slots',
      '$$events',
      '$$legacy',
      'header',
      'footer',
      'addon',
      'value',
      'elementRef',
      'divClass',
      'innerClass',
      'headerClass',
      'footerClass',
      'addonClass',
      'disabled',
      'class',
      'classes',
      'clearable',
      'clearableSvgClass',
      'clearableColor',
      'clearableClass',
      'clearableOnClick',
      'textareaClass',
    ]);
  Me(() => ({
    divClass: e.divClass,
    innerClass: e.innerClass,
    headerClass: e.headerClass,
    footerClass: e.footerClass,
    addonClass: e.addonClass,
    textareaClass: e.textareaClass,
    clearableClass: e.clearableClass,
    clearableSvgClass: e.clearableSvgClass,
  }));
  const n = z(
      () =>
        e.classes ?? {
          div: e.divClass,
          inner: e.innerClass,
          header: e.headerClass,
          footer: e.footerClass,
          addon: e.addonClass,
          textarea: e.textareaClass,
          close: e.clearableClass,
          svg: e.clearableSvgClass,
        },
    ),
    d = z(() => He('textarea'));
  let c = z(() => !!e.header),
    g = z(() => !!e.footer),
    f = z(() => !!e.addon),
    p = z(() => o(c) || o(g) || o(f));
  const m = z(() => Vs({wrapped: o(p), hasHeader: o(c), hasFooter: o(g)})),
    A = z(() => o(m).div),
    P = z(() => o(m).base),
    C = z(() => o(m).wrapper),
    S = z(() => o(m).inner),
    k = z(() => o(m).header),
    _ = z(() => o(m).footer),
    u = z(() => o(m).addon),
    E = z(() => o(m).close);
  Mr(() => {
    (t() && (t((t().value = ''), !0), a(void 0)), e.clearableOnClick && e.clearableOnClick());
  });
  var h = Bs(),
    v = re(h);
  {
    var b = (V) => {
        var j = Ts();
        (ve(j, (N) => ({disabled: e.disabled, ...l, class: N}), [() => o(C)({class: $(e.class, e.classes?.wrapper)})]),
          tr(
            j,
            (N) => t(N),
            () => t(),
          ),
          Hr(j, a),
          T(V, j));
      },
      B = (V) => {
        var j = Ns(),
          N = re(j);
        {
          var x = (K) => {
            var q = Ss(),
              te = re(q);
            (fe(te, () => e.header),
              de((ne) => he(q, 1, ne), [() => we(o(k)({class: $(o(d)?.header, o(n).header)}))]),
              T(K, q));
          };
          Y(N, (K) => {
            e.header && K(x);
          });
        }
        var w = ee(N, 2),
          I = re(w);
        {
          var y = (K) => {
            var q = Ps(),
              te = re(q);
            (fe(te, () => e.addon),
              de((ne) => he(q, 1, ne), [() => we(o(u)({class: $(o(d)?.addon, o(n).addon)}))]),
              T(K, q));
          };
          Y(I, (K) => {
            e.addon && K(y);
          });
        }
        var U = ee(I, 2);
        (ve(U, (K) => ({disabled: e.disabled, ...l, class: K}), [() => o(P)({class: $(o(d)?.base, e.class)})]),
          tr(
            U,
            (K) => t(K),
            () => t(),
          ));
        var W = ee(w, 2);
        {
          var se = (K) => {
            var q = Es(),
              te = re(q);
            (fe(te, () => e.footer),
              de((ne) => he(q, 1, ne), [() => we(o(_)({class: $(o(d)?.footer, o(n).footer)}))]),
              T(K, q));
          };
          Y(W, (K) => {
            e.footer && K(se);
          });
        }
        (de(
          (K, q) => {
            (he(j, 1, K), he(w, 1, q));
          },
          [
            () => we(o(C)({class: $(o(d)?.wrapper, e.classes?.wrapper)})),
            () => we(o(S)({class: $(o(d)?.inner, o(n).inner)})),
          ],
        ),
          Hr(U, a),
          T(V, j));
      };
    Y(v, (V) => {
      o(p) ? V(B, !1) : V(b);
    });
  }
  var D = ee(v, 2);
  {
    var F = (V) => {
      {
        let j = z(() => o(E)({class: $(o(d)?.close, o(n).close)})),
          N = z(() => $(o(n).svg));
        ar(V, {
          get class() {
            return o(j);
          },
          get color() {
            return s();
          },
          'aria-label': 'Clear search value',
          get svgClass() {
            return o(N);
          },
        });
      }
    };
    Y(D, (V) => {
      a() !== void 0 && a() !== '' && e.clearable && V(F);
    });
  }
  (de((V) => he(h, 1, V), [() => we(o(A)({class: $(o(d)?.div, o(n).div)}))]), T(r, h), Pe());
}
i({
  slots: {
    span: "me-3 shrink-0 bg-gray-200 rounded-full peer-focus:ring-4 peer-checked:after:translate-x-full peer-checked:rtl:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:bg-gray-600 dark:border-gray-500 relative ",
    label: 'flex items-center',
    input:
      'w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 rounded-sm dark:bg-gray-700 dark:border-gray-600 sr-only peer',
  },
  variants: {
    disabled: {true: {label: 'cursor-not-allowed opacity-50'}},
    checked: {true: '', false: ''},
    off_state_label: {true: {span: 'ms-3'}},
    color: {
      primary: {span: 'peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 peer-checked:bg-primary-600'},
      secondary: {
        span: 'peer-focus:ring-secondary-300 dark:peer-focus:ring-secondary-800 peer-checked:bg-secondary-600',
      },
      gray: {span: 'peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 peer-checked:bg-gray-500'},
      red: {span: 'peer-focus:ring-red-300 dark:peer-focus:ring-red-800 peer-checked:bg-red-600'},
      orange: {span: 'peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:bg-orange-500'},
      amber: {span: 'peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 peer-checked:bg-amber-600'},
      yellow: {span: 'peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:bg-yellow-400'},
      lime: {span: 'peer-focus:ring-lime-300 dark:peer-focus:ring-lime-800 peer-checked:bg-lime-500'},
      green: {span: 'peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:bg-green-600'},
      emerald: {span: 'peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 peer-checked:bg-emerald-600'},
      teal: {span: 'peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:bg-teal-600'},
      cyan: {span: 'peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 peer-checked:bg-cyan-600'},
      sky: {span: 'peer-focus:ring-sky-300 dark:peer-focus:ring-sky-800 peer-checked:bg-sky-600'},
      blue: {span: 'peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600'},
      indigo: {span: 'peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 peer-checked:bg-indigo-600'},
      violet: {span: 'peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 peer-checked:bg-violet-600'},
      purple: {span: 'peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:bg-purple-600'},
      fuchsia: {span: 'peer-focus:ring-fuchsia-300 dark:peer-focus:ring-fuchsia-800 peer-checked:bg-fuchsia-600'},
      pink: {span: 'peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 peer-checked:bg-pink-600'},
      rose: {span: 'peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 peer-checked:bg-rose-600'},
    },
    size: {
      small: {span: 'w-9 h-5 after:top-[2px] after:start-[2px] after:h-4 after:w-4'},
      default: {span: 'w-11 h-6 after:top-0.5 after:start-[2px] after:h-5 after:w-5'},
      large: {span: 'w-14 h-7 after:top-0.5 after:start-[4px]  after:h-6 after:w-6'},
    },
  },
  defaultVariants: {color: 'primary'},
});
i({
  slots: {
    buttonGroup: 'inline-flex rounded-lg shadow-sm relative',
    input: 'block disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right focus:ring-0 focus:outline-none',
    inputWithIcon: 'relative px-2 pr-8',
    iconWrapper: 'pointer-events-none absolute inset-y-0 end-0 top-0 flex items-center pe-3.5',
    icon: 'h-4 w-4 text-gray-500 dark:text-gray-400',
    select:
      'text-gray-900 disabled:text-gray-400 bg-gray-50 border border-gray-300 focus:ring-0 focus:outline-none block w-full border-l-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:disabled:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500',
    button: '!rounded-r-lg',
    buttonIcon: 'ml-2 h-4 w-4',
    rangeSeparator: 'flex items-center justify-center px-2 text-gray-500 dark:text-gray-400',
    rangeInputWrapper: 'relative',
    rangeInput: 'relative pr-8',
    rangeButton:
      'pointer-events-none absolute inset-y-0 top-0 right-0 flex items-center border-0 bg-transparent pe-3.5',
    dropdownContent: 'p-4 last:rounded-r-lg',
    dropdownInner: 'flex flex-col space-y-4',
    dropdownTimeRow: 'flex space-x-4',
    dropdownTimeCol: 'flex flex-col',
    dropdownTimeInput: 'w-24 rounded-l-lg !border-r px-2',
    dropdownButton: 'w-full !rounded-l-lg',
    toggleWrapper: 'flex w-full flex-col space-y-2',
    toggleRow: 'flex items-center justify-between',
    toggleTimeRow: 'flex space-x-4 p-2.5',
    toggleTimeCol: 'flex flex-col',
    toggleTimeInput: 'w-24 rounded-lg !border-r px-2',
    inlineGrid: 'grid w-full gap-2',
    inlineButton: 'rounded-lg',
  },
  variants: {
    type: {
      default: {input: 'rounded-e-lg'},
      select: {input: 'w-1/3 rounded-l-lg rounded-e-none', select: 'rounded-r-lg rounded-l-none'},
      dropdown: {input: 'rounded-l-lg rounded-e-none'},
      range: {},
      'timerange-dropdown': {},
      'timerange-toggle': {},
      'inline-buttons': {},
    },
    columns: {
      1: {inlineGrid: 'grid-cols-1'},
      2: {inlineGrid: 'grid-cols-2'},
      3: {inlineGrid: 'grid-cols-3'},
      4: {inlineGrid: 'grid-cols-4'},
    },
    disabled: {true: {input: 'disabled:cursor-not-allowed disabled:opacity-50'}},
  },
  defaultVariants: {type: 'default', columns: 2, disabled: !1},
});
ge(['click']);
i({
  base: 'inline-flex items-center hover:underline',
  variants: {
    color: {
      primary: 'text-primary-600 dark:text-primary-500',
      secondary: 'text-secondary-600 dark:text-secondary-500',
      gray: 'text-gray-600 dark:text-gray-500',
      red: 'text-red-600 dark:text-red-500',
      orange: 'text-orange-600 dark:text-orange-500',
      amber: 'text-amber-600 dark:text-amber-500',
      yellow: 'text-yellow-600 dark:text-yellow-500',
      lime: 'text-lime-600 dark:text-lime-500',
      green: 'text-green-600 dark:text-green-500',
      emerald: 'text-emerald-600 dark:text-emerald-500',
      teal: 'text-teal-600 dark:text-teal-500',
      cyan: 'text-cyan-600 dark:text-cyan-500',
      sky: 'text-sky-600 dark:text-sky-500',
      blue: 'text-blue-600 dark:text-blue-500',
      indigo: 'text-indigo-600 dark:text-indigo-500',
      violet: 'text-violet-600 dark:text-violet-500',
      purple: 'text-purple-600 dark:text-purple-500',
      fuchsia: 'text-fuchsia-600 dark:text-fuchsia-500',
      pink: 'text-pink-600 dark:text-pink-500',
      rose: 'text-rose-600 dark:text-rose-500',
    },
  },
});
i({
  base: 'font-semibold text-gray-900 dark:text-white',
  variants: {
    border: {true: 'border-s-4 border-gray-300 dark:border-gray-500', false: ''},
    italic: {true: 'italic', false: ''},
    bg: {true: 'bg-gray-50 dark:bg-gray-800', false: ''},
    alignment: {left: 'text-left', center: 'text-center', right: 'text-right'},
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },
  },
  defaultVariants: {border: !1, italic: !0, bg: !1, alignment: 'left', size: 'lg'},
});
i({
  variants: {tag: {dt: 'text-gray-500 md:text-lg dark:text-gray-400', dd: 'text-lg font-semibold'}},
  defaultVariants: {tag: 'dt'},
});
i({
  base: 'font-bold text-gray-900 dark:text-white',
  variants: {
    tag: {h1: 'text-5xl font-extrabold', h2: 'text-4xl', h3: 'text-3xl', h4: 'text-2xl', h5: 'text-xl', h6: 'text-lg'},
  },
  defaultVariants: {tag: 'h1'},
});
i({
  slots: {
    base: 'h-px my-8 border-0',
    div: 'inline-flex items-center justify-center w-full',
    content: 'absolute px-4 -translate-x-1/2 rtl:translate-x-1/2 bg-white start-1/2 dark:bg-gray-900',
    bg: '',
  },
  variants: {withChildren: {true: {base: 'w-full', div: 'relative'}}},
  defaultVariants: {withChildren: !1},
});
i({
  slots: {base: 'max-w-full h-auto', figure: '', caption: 'mt-2 text-sm text-center text-gray-500 dark:text-gray-400'},
  variants: {
    size: {
      xs: {base: 'max-w-xs', figure: 'max-w-xs'},
      sm: {base: 'max-w-sm', figure: 'max-w-sm'},
      md: {base: 'max-w-md', figure: 'max-w-md'},
      lg: {base: 'max-w-lg', figure: 'max-w-lg'},
      xl: {base: 'max-w-xl', figure: 'max-w-xl'},
      '2xl': {base: 'max-w-2xl', figure: 'max-w-2xl'},
      full: {base: 'max-w-full', figure: 'max-w-full'},
    },
    effect: {
      grayscale: {base: 'cursor-pointer rounded-lg grayscale filter transition-all duration-300 hover:grayscale-0'},
      blur: {base: 'blur-xs transition-all duration-300 hover:blur-none'},
      invert: {base: 'invert filter transition-all duration-300 hover:invert-0'},
      sepia: {base: 'sepia filter transition-all duration-300 hover:sepia-0'},
      saturate: {base: 'saturate-50 filter transition-all duration-300 hover:saturate-100'},
      'hue-rotate': {base: 'hue-rotate-60 filter transition-all duration-300 hover:hue-rotate-0'},
    },
    align: {
      left: {base: 'mx-0', figure: 'mx-0'},
      center: {base: 'mx-auto', figure: 'mx-auto'},
      right: {base: 'ml-auto mr-0', figure: 'ml-auto mr-0'},
    },
  },
});
i({base: 'grid grid-cols-1 sm:grid-cols-2'});
i({
  base: '',
  variants: {
    tag: {ul: 'list-disc', dl: '[&>*]:list-none list-none', ol: 'list-decimal'},
    position: {inside: 'list-inside', outside: 'list-outside'},
  },
  defaultVariants: {position: 'inside', tag: 'ul'},
});
i({base: 'text-white dark:bg-blue-500 bg-blue-600 px-2 rounded-sm'});
i({
  base: 'text-gray-900 dark:text-white',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    space: {
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
      widest: 'tracking-widest',
    },
    height: {
      none: 'leading-none',
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
      3: 'leading-3',
      4: 'leading-4',
      5: 'leading-5',
      6: 'leading-6',
      7: 'leading-7',
      8: 'leading-8',
      9: 'leading-9',
      10: 'leading-10',
    },
    align: {left: 'text-left', center: 'text-center', right: 'text-right'},
    whitespace: {
      normal: 'whitespace-normal',
      nowrap: 'whitespace-nowrap',
      pre: 'whitespace-pre',
      preline: 'whitespace-pre-line',
      prewrap: 'whitespace-pre-wrap',
    },
    italic: {true: 'italic'},
    firstUpper: {
      true: 'first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-left',
      false: '',
    },
    justify: {true: 'text-justify', false: ''},
  },
});
i({base: 'text-gray-500 dark:text-gray-400 font-semibold'});
i({
  variants: {
    italic: {true: 'italic'},
    underline: {true: 'underline decoration-2 decoration-blue-400 dark:decoration-blue-600'},
    linethrough: {true: 'line-through'},
    uppercase: {true: 'uppercase'},
    gradient: {
      skyToEmerald: 'text-transparent bg-clip-text bg-linear-to-r to-emerald-600 from-sky-400',
      purpleToBlue: 'text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500',
      pinkToOrange: 'text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-orange-400',
      tealToLime: 'text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-lime-300',
      redToYellow: 'text-transparent bg-clip-text bg-linear-to-r from-red-600 to-yellow-500',
      indigoToCyan: 'text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-400',
      fuchsiaToRose: 'text-transparent bg-clip-text bg-linear-to-r from-fuchsia-500 to-rose-500',
      amberToEmerald: 'text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-emerald-500',
      violetToRed: 'text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-red-500',
      blueToGreen: 'text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-teal-500 to-green-400',
      orangeToPurple: 'text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-pink-500 to-purple-500',
      yellowToRed: 'text-transparent bg-clip-text bg-linear-to-r from-yellow-200 via-indigo-400 to-red-600',
      none: '',
    },
    highlight: {
      blue: 'text-blue-600 dark:text-blue-500',
      green: 'text-green-600 dark:text-green-500',
      red: 'text-red-600 dark:text-red-500',
      yellow: 'text-yellow-600 dark:text-yellow-500',
      purple: 'text-purple-600 dark:text-purple-500',
      pink: 'text-pink-600 dark:text-pink-500',
      indigo: 'text-indigo-600 dark:text-indigo-500',
      teal: 'text-teal-600 dark:text-teal-500',
      orange: 'text-orange-600 dark:text-orange-500',
      cyan: 'text-cyan-600 dark:text-cyan-500',
      fuchsia: 'text-fuchsia-600 dark:text-fuchsia-500',
      amber: 'text-amber-600 dark:text-amber-500',
      lime: 'text-lime-600 dark:text-lime-500',
      none: '',
    },
    decoration: {
      solid: 'underline decoratio-solid',
      double: 'underline decoration-double',
      dotted: 'underline decoration-dotted',
      dashed: 'underline decoration-dashed',
      wavy: 'underline decoration-wavy',
      none: 'decoration-none',
    },
    decorationColor: {
      primary: 'underline decoration-primary-400 dark:decoration-primary-600',
      secondary: 'underline decoration-secondary-400 dark:decoration-secondary-600',
      gray: 'underline decoration-gray-400 dark:decoration-gray-600',
      orange: 'underline decoration-orange-400 dark:decoration-orange-600',
      red: 'underline decoration-red-400 dark:decoration-red-600',
      yellow: 'underline decoration-yellow-400 dark:decoration-yellow-600',
      lime: 'underline decoration-lime-400 dark:decoration-lime-600',
      green: 'underline decoration-green-400 dark:decoration-green-600',
      emerald: 'underline decoration-emerald-400 dark:decoration-emerald-600',
      teal: 'underline decoration-teal-400 dark:decoration-teal-600',
      cyan: 'underline decoration-cyan-400 dark:decoration-cyan-600',
      sky: 'underline decoration-sky-400 dark:decoration-sky-600',
      blue: 'underline decoration-blue-400 dark:decoration-blue-600',
      indigo: 'underline decoration-indigo-400 dark:decoration-indigo-600',
      violet: 'underline decoration-violet-400 dark:decoration-violet-600',
      purple: 'underline decoration-purple-400 dark:decoration-purple-600',
      fuchsia: 'underline decoration-fuchsia-400 dark:decoration-fuchsia-600',
      pink: 'underline decoration-pink-400 dark:decoration-pink-600',
      rose: 'underline decoration-rose-400 dark:decoration-rose-600',
      none: 'decoration-none',
    },
    decorationThickness: {
      1: 'underline decoration-1',
      2: 'underline decoration-2',
      4: 'underline decoration-4',
      8: 'underline decoration-8',
      0: 'decoration-0',
    },
  },
});
i({
  base: 'inline-flex border border-gray-300 overflow-hidden',
  variants: {
    roundedSize: {sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg', xl: 'rounded-xl', full: 'rounded-full'},
  },
});
i({
  slots: {
    button:
      'relative flex items-center transition-all duration-200 focus:outline-none border-r last:border-r-0 dark:bg-white dark:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50',
    content: 'flex items-center w-full overflow-hidden relative',
    text: 'transition-all duration-200 ml-0',
    icon: 'absolute left-0 flex-shrink-0 text-green-600',
  },
  variants: {
    selected: {true: {text: 'ml-5'}, false: {}},
    size: {
      sm: {button: 'p-1 px-2 text-sm'},
      md: {button: 'p-2 px-4 text-base'},
      lg: {button: 'p-3 px-5 text-lg'},
      xl: {button: 'p-4 px-6 text-xl'},
    },
    roundedSize: {
      sm: {button: 'first:rounded-s-sm last:rounded-e-sm'},
      md: {button: 'first:rounded-s-md last:rounded-e-md'},
      lg: {button: 'first:rounded-s-lg last:rounded-e-lg'},
      xl: {button: 'first:rounded-s-xl last:rounded-e-xl'},
      full: {button: 'first:rounded-s-full last:rounded-e-full'},
    },
    color: {
      primary: {button: 'data-[selected=true]:bg-primary-200 data-[selected=false]:hover:bg-gray-100'},
      secondary: {button: 'data-[selected=true]:bg-secondary-200 data-[selected=false]:hover:bg-gray-100'},
      gray: {button: 'data-[selected=true]:bg-gray-200 data-[selected=false]:hover:bg-gray-100'},
      red: {button: 'data-[selected=true]:bg-red-200 data-[selected=false]:hover:bg-red-50'},
      orange: {button: 'data-[selected=true]:bg-orange-200 data-[selected=false]:hover:bg-orange-50'},
      amber: {button: 'data-[selected=true]:bg-amber-200 data-[selected=false]:hover:bg-amber-50'},
      yellow: {button: 'data-[selected=true]:bg-yellow-200 data-[selected=false]:hover:bg-yellow-50'},
      lime: {button: 'data-[selected=true]:bg-lime-200 data-[selected=false]:hover:bg-lime-50'},
      green: {button: 'data-[selected=true]:bg-green-200 data-[selected=false]:hover:bg-green-50'},
      emerald: {button: 'data-[selected=true]:bg-emerald-200 data-[selected=false]:hover:bg-emerald-50'},
      teal: {button: 'data-[selected=true]:bg-teal-200 data-[selected=false]:hover:bg-teal-50'},
      cyan: {button: 'data-[selected=true]:bg-cyan-200 data-[selected=false]:hover:bg-cyan-50'},
      sky: {button: 'data-[selected=true]:bg-sky-200 data-[selected=false]:hover:bg-sky-50'},
      blue: {button: 'data-[selected=true]:bg-blue-200 data-[selected=false]:hover:bg-blue-50'},
      indigo: {button: 'data-[selected=true]:bg-indigo-200 data-[selected=false]:hover:bg-indigo-50'},
      violet: {button: 'data-[selected=true]:bg-violet-200 data-[selected=false]:hover:bg-violet-50'},
      purple: {button: 'data-[selected=true]:bg-purple-200 data-[selected=false]:hover:bg-purple-50'},
      fuchsia: {button: 'data-[selected=true]:bg-fuchsia-200 data-[selected=false]:hover:bg-fuchsia-50'},
      pink: {button: 'data-[selected=true]:bg-pink-200 data-[selected=false]:hover:bg-pink-50'},
      rose: {button: 'data-[selected=true]:bg-rose-200 data-[selected=false]:hover:bg-rose-50'},
      none: {},
    },
  },
  defaultVariants: {selected: !1, color: 'primary', size: 'md', roundedSize: 'md'},
});
i({
  slots: {
    base: 'relative max-w-2xl mx-auto p-4 space-y-4',
    inputSection: 'space-y-2',
    inputWrapper: 'flex gap-2',
    input:
      'flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white',
    searchWrapper: 'flex gap-2',
    searchContainer: 'relative flex-1',
    searchInput:
      'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white',
    searchIcon: 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400',
    itemsList: 'space-y-2 max-h-[500px] overflow-y-auto',
    emptyState: 'text-center py-8',
    emptyIcon: 'w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3',
    emptyText: 'text-sm text-gray-500 dark:text-gray-400',
    emptySubtext: 'text-xs text-gray-400 dark:text-gray-500 mt-1',
    item: 'group flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3 transition hover:bg-gray-50 dark:hover:bg-gray-800/50',
    itemContent: 'flex-1 min-w-0',
    itemHeader: 'flex items-center gap-2 mb-1',
    itemTimestamp: 'text-xs text-gray-500 dark:text-gray-400',
    itemText: 'text-sm text-gray-900 dark:text-gray-100 break-words line-clamp-2',
    itemActions: 'flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity',
    actionButton: 'p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center',
    actionIcon: 'w-4 h-4 flex-shrink-0',
    pinButton: 'p-1.5 rounded transition',
    deleteButton: 'p-1.5 rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 transition',
    toastContainer: 'fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-[slideIn_0.2s_ease-out]',
    toast: 'flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg',
    toastIcon: 'w-5 h-5',
    toastText: 'text-sm font-medium',
    addToClipboard: 'whitespace-nowrap rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50',
    clearAll: 'rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700',
    selectionMenu: 'selection-menu fixed z-50 -translate-x-1/2 -translate-y-full',
    selectionBubble: 'mb-2 flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-white shadow-xl',
    selectionText: 'max-w-[200px] truncate text-xs',
    selectionButton:
      'rounded bg-primary-700 px-2 py-1 text-xs font-medium whitespace-nowrap transition hover:bg-primary-500',
    selectionArrow: 'absolute bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900',
  },
  variants: {
    pinned: {
      true: {pinButton: 'text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20'},
      false: {pinButton: 'hover:bg-gray-200 dark:hover:bg-gray-700'},
    },
    type: {
      success: {toast: 'bg-green-500 text-white'},
      error: {toast: 'bg-red-500 text-white'},
      info: {toast: 'bg-blue-500 text-white'},
    },
  },
  defaultVariants: {pinned: !1, type: 'success'},
});
i({
  slots: {
    base: 'w-full mx-auto mt-20 max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden transform transition-all',
    search: 'rounded-b-none border-0 py-3',
    list: 'max-h-80 scroll-py-2 overflow-y-auto border-t border-gray-200 dark:border-gray-700',
    item: 'cursor-pointer select-none px-4 py-2 text-sm text-gray-900 dark:text-gray-100 aria-selected:bg-primary-600 aria-selected:text-white',
    itemDescription: 'text-xs truncate text-gray-500 dark:text-gray-400 aria-selected:text-primary-100',
    empty:
      'px-4 py-14 text-center border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400',
    footer:
      'flex flex-wrap items-center justify-between gap-2 bg-gray-50 dark:bg-gray-900/50 px-4 py-2.5 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700',
    kbd: 'inline-flex items-center gap-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 font-sans text-xs',
  },
  variants: {selected: {true: {}}},
  defaultVariants: {},
});
i({
  slots: {
    container: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 p-2 md:p-4',
    column:
      'w-full rounded-xl shadow-sm p-3 md:p-4 flex flex-col bg-surface-elevated text-surface-foreground transition-colors',
    columnTitle: 'text-sm md:text-base font-semibold mb-2 md:mb-3 dark:text-white',
    cardList: 'flex flex-col gap-2 flex-1 min-h-[60px]',
    card: 'bg-surface text-surface-foreground rounded-lg p-2.5 md:p-3 shadow-sm cursor-grab active:cursor-grabbing transition-all hover:bg-surface-hover hover:shadow-md',
    cardTitle: 'font-medium text-sm md:text-base',
    cardDescription: 'text-xs md:text-sm text-muted mt-1',
    cardTags: 'flex flex-wrap gap-1 mt-2',
    cardTag: 'text-[10px] md:text-xs bg-primary/10 text-primary px-1.5 md:px-2 py-0.5 rounded-full',
    addButton:
      'mt-2 md:mt-3 w-full bg-primary text-primary-foreground rounded-lg py-1.5 text-xs md:text-sm dark:text-primary-500 font-medium hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2',
  },
  variants: {isDragOver: {true: {column: 'ring-2 ring-primary'}}, isDragging: {true: {card: 'opacity-50'}}},
});
i({
  slots: {
    card: 'bg-surface text-surface-foreground rounded-lg p-2.5 md:p-3 shadow-sm shadow-black/20 dark:shadow-white/10 cursor-grab active:cursor-grabbing transition-all hover:bg-surface-hover hover:shadow-md',
    cardTitle: 'font-medium text-sm md:text-base dark:text-white',
    cardDescription: 'text-xs md:text-sm text-muted mt-1 dark:text-white',
    cardTags: 'flex flex-wrap gap-1 mt-2 dark:text-white',
    cardTag: 'text-[10px] md:text-xs bg-primary/10 text-primary px-1.5 md:px-2 py-0.5 rounded-full dark:text-white',
  },
  variants: {isDragging: {true: {card: 'opacity-50'}}},
});
i({
  slots: {
    base: 'bg-white dark:bg-gray-900 p-2 transition-all duration-300 z-40 border-b border-gray-200 dark:border-gray-700',
    container: '',
    list: '',
    link: 'px-4 py-2.5 transition-all duration-200 cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
    li: 'p-2 m-1',
  },
  variants: {
    position: {
      top: {
        base: 'top-0 left-0 right-0 w-full',
        container: 'container mx-auto px-4',
        list: 'flex space-x-1 overflow-x-auto scrollbar-none',
      },
      left: {
        base: 'fixed left-0 top-0 bottom-0 h-full w-64 overflow-y-auto',
        container: 'px-4 py-4',
        list: 'flex flex-col space-y-1',
      },
      right: {
        base: 'fixed right-0 top-0 bottom-0 h-full w-64 overflow-y-auto',
        container: 'px-4 py-4',
        list: 'flex flex-col space-y-1',
      },
    },
    sticky: {true: {base: ''}, false: {base: ''}},
    isSticky: {true: {base: 'shadow-lg'}, false: {base: ''}},
    active: {
      true: {
        link: 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 font-semibold focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
      },
      false: {
        link: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
      },
    },
  },
  defaultVariants: {position: 'top', sticky: !0, isSticky: !1, active: !1},
  compoundVariants: [{position: 'top', sticky: !0, class: {base: 'sticky'}}],
});
i({
  base: 'relative flex h-full w-full overflow-hidden select-none',
  variants: {direction: {horizontal: '', vertical: 'flex-col'}},
  defaultVariants: {direction: 'horizontal'},
});
i({base: 'flex flex-col relative overflow-hidden shrink-0 min-w-0 min-h-0'});
i({
  base: 'bg-gray-300 shrink-0 relative z-10 transition-colors duration-200 hover:bg-gray-400 focus:bg-gray-400 focus:outline focus:outline-2 focus:outline-blue-500 focus:-outline-offset-2',
  variants: {
    direction: {horizontal: 'w-1 cursor-col-resize', vertical: 'h-1 cursor-row-resize'},
    isDragging: {true: 'bg-blue-500', false: ''},
  },
  defaultVariants: {direction: 'horizontal', isDragging: !1},
});
i({
  base: 'absolute bg-transparent',
  variants: {direction: {horizontal: 'w-3 h-full -left-1 top-0', vertical: 'h-3 w-full -top-1 left-0'}},
  defaultVariants: {direction: 'horizontal'},
});
i({
  slots: {
    base: 'space-y-2 dark:text-white',
    label: 'text-base font-semibold',
    container: 'flex w-full justify-between gap-2',
    wrapper: 'relative h-full w-full',
    step: 'h-full w-full rounded-xs',
    glow: 'absolute -inset-1 rounded-xs opacity-30 blur-sm dark:opacity-25',
    incomplete: 'h-full w-full rounded-xs bg-gray-200 dark:bg-gray-700',
  },
  variants: {
    size: {
      xs: {container: 'h-1.5'},
      sm: {container: 'h-2'},
      md: {container: 'h-2.5'},
      lg: {container: 'h-3'},
      xl: {container: 'h-4'},
    },
    color: {
      primary: {
        step: 'data-[state=completed]:bg-primary-500 data-[state=completed]:dark:bg-primary-900 data-[state=current]:bg-primary-800 data-[state=current]:dark:bg-primary-400',
        glow: 'bg-primary-800 dark:bg-primary-400',
      },
      secondary: {
        step: 'data-[state=completed]:bg-secondary-500 data-[state=completed]:dark:bg-secondary-900 data-[state=current]:bg-secondary-800 data-[state=current]:dark:bg-secondary-400',
        glow: 'bg-secondary-800 dark:bg-secondary-400',
      },
      gray: {
        step: 'data-[state=completed]:bg-gray-400 data-[state=completed]:dark:bg-gray-500 data-[state=current]:bg-gray-700 data-[state=current]:dark:bg-gray-200',
        glow: 'bg-gray-700 dark:bg-gray-200',
      },
      red: {
        step: 'data-[state=completed]:bg-red-600 data-[state=completed]:dark:bg-red-900 data-[state=current]:bg-red-900 data-[state=current]:dark:bg-red-500',
        glow: 'bg-red-900 dark:bg-red-500',
      },
      yellow: {
        step: 'data-[state=completed]:bg-yellow-400 data-[state=completed]:dark:bg-yellow-600 data-[state=current]:bg-yellow-600 data-[state=current]:dark:bg-yellow-400',
        glow: 'bg-yellow-600 dark:bg-yellow-400',
      },
      green: {
        step: 'data-[state=completed]:bg-green-500 data-[state=completed]:dark:bg-green-900 data-[state=current]:bg-green-800 data-[state=current]:dark:bg-green-400',
        glow: 'bg-green-800 dark:bg-green-400',
      },
      indigo: {
        step: 'data-[state=completed]:bg-indigo-500 data-[state=completed]:dark:bg-indigo-900 data-[state=current]:bg-indigo-800 data-[state=current]:dark:bg-indigo-400',
        glow: 'bg-indigo-800 dark:bg-indigo-400',
      },
      purple: {
        step: 'data-[state=completed]:bg-purple-500 data-[state=completed]:dark:bg-purple-900 data-[state=current]:bg-purple-800 data-[state=current]:dark:bg-purple-400',
        glow: 'bg-purple-800 dark:bg-purple-400',
      },
      pink: {
        step: 'data-[state=completed]:bg-pink-500 data-[state=completed]:dark:bg-pink-900 data-[state=current]:bg-pink-800 data-[state=current]:dark:bg-pink-400',
        glow: 'bg-pink-800 dark:bg-pink-400',
      },
      blue: {
        step: 'data-[state=completed]:bg-blue-500 data-[state=completed]:dark:bg-blue-900 data-[state=current]:bg-blue-800 data-[state=current]:dark:bg-blue-400',
        glow: 'bg-blue-800 dark:bg-blue-400',
      },
      custom: {step: '', glow: ''},
    },
    glow: {true: {}, false: {}},
    hideLabel: {true: {}, false: {}},
  },
  compoundVariants: [
    {glow: !1, class: {glow: 'hidden'}},
    {hideLabel: !0, class: {label: 'hidden'}},
  ],
  defaultVariants: {size: 'md', color: 'primary', glow: !1, hideLabel: !1},
});
ge(['click']);
i({
  slots: {
    base: 'border border-gray-300 dark:border-gray-600 rounded-lg flex focus-within:ring-primary-500 focus-within:ring-1 focus-within:border-primary-500 scrollbar-hidden bg-gray-50 dark:bg-gray-700',
    tag: 'flex items-center rounded-lg bg-gray-100 text-gray-900 border border-gray-300 my-1 ml-1 px-2 text-sm max-w-full min-w-fit',
    span: 'items-center',
    close: 'my-auto ml-1',
    input:
      'block text-sm m-2.5 p-0 bg-transparent border-none outline-none text-gray-900 h-min w-full min-w-fit focus:ring-0 placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50',
    info: 'mt-1 text-sm text-blue-500 dark:text-blue-400',
    warning: 'mt-1 text-sm text-yellow-400 dark:text-yellow-300',
    error: 'mt-1 text-sm text-red-500 dark:text-red-400',
  },
});
ge(['click']);
i({
  slots: {
    overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm',
    highlight: [
      'fixed border-2 pointer-events-none transition-all duration-300',
      'border-blue-500',
      'shadow-[0_0_0_4px_rgba(59,130,246,0.2)]',
    ],
    tooltip: ['fixed bg-white rounded-xl shadow-2xl', 'w-80 max-w-[calc(100vw-2rem)]'],
    arrow: 'absolute w-2 h-2 rotate-45 bg-white',
    content: 'p-5 relative z-10 bg-white rounded-xl',
    title: 'text-lg font-semibold text-gray-900 mb-3',
    description: 'text-sm leading-relaxed text-gray-600 mb-4',
    progressContainer: 'flex gap-2 justify-center',
    progressDot: ['w-2 h-2 rounded-full bg-gray-300', 'hover:bg-gray-400 transition-all duration-200 hover:scale-110'],
    progressDotActive: '!bg-blue-500 w-6! rounded',
    actions: [
      'flex justify-between items-center px-5 py-4',
      'border-t border-gray-200 relative z-10 bg-white rounded-b-xl',
    ],
    navigation: 'flex gap-2',
    button: ['px-4 py-2 rounded-md text-sm font-medium', 'transition-all duration-200'],
    buttonPrimary: ['text-white bg-blue-500 hover:bg-blue-600'],
    buttonSecondary: ['text-gray-600 border border-gray-300', 'hover:bg-gray-50 hover:border-gray-400'],
  },
  variants: {
    size: {
      sm: {
        tooltip: 'w-64',
        content: 'p-4',
        actions: 'px-4 py-3',
        title: 'text-base',
        description: 'text-xs',
        button: 'px-3 py-1.5 text-xs',
      },
      md: {
        tooltip: 'w-80',
        content: 'p-5',
        actions: 'px-5 py-4',
        title: 'text-lg',
        description: 'text-sm',
        button: 'px-4 py-2 text-sm',
      },
      lg: {
        tooltip: 'w-96',
        content: 'p-6',
        actions: 'px-6 py-5',
        title: 'text-xl',
        description: 'text-base',
        button: 'px-5 py-2.5 text-base',
      },
    },
    color: {
      primary: {
        highlight: 'border-primary-500 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]',
        progressDotActive: '!bg-primary-500',
        buttonPrimary: 'bg-primary-500 hover:bg-primary-600',
      },
      blue: {
        highlight: 'border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]',
        progressDotActive: '!bg-blue-500',
        buttonPrimary: 'bg-blue-500 hover:bg-blue-600',
      },
      purple: {
        highlight: 'border-purple-500 shadow-[0_0_0_4px_rgba(168,85,247,0.2)]',
        progressDotActive: '!bg-purple-500',
        buttonPrimary: 'bg-purple-500 hover:bg-purple-600',
      },
      green: {
        highlight: 'border-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]',
        progressDotActive: '!bg-green-500',
        buttonPrimary: 'bg-green-500 hover:bg-green-600',
      },
      red: {
        highlight: 'border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.2)]',
        progressDotActive: '!bg-red-500',
        buttonPrimary: 'bg-red-500 hover:bg-red-600',
      },
    },
  },
  defaultVariants: {size: 'md', color: 'blue'},
});
i({
  slots: {
    container: 'overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent',
    spacer: 'relative',
    content: 'absolute top-0 left-0 right-0',
    item: '',
  },
  variants: {contained: {true: {item: '[contain:layout_style_paint]'}, false: {}}},
  defaultVariants: {contained: !1},
});
i({
  slots: {
    container: 'overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent',
    spacer: 'relative',
    content: 'relative w-full',
    item: '',
  },
  variants: {contained: {true: {item: '[contain:layout_style_paint]'}, false: {}}},
  defaultVariants: {contained: !1},
});
ge(['keydown', 'click']);
ge(['click', 'keydown']);
ge(['click']);
ge(['click', 'keydown']);
ge(['mousedown', 'keydown']);
ge(['click', 'keydown']);
var js = X(
    '<svg class="w-4 h-4 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg> <span>Convert to private note</span> <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-200 text-purple-800">Currently Public</span>',
    1,
  ),
  Is = X(
    '<svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"></path></svg> <span>Convert to public note</span> <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800">Currently Private</span>',
    1,
  ),
  Ls = X(
    '<svg class="w-4 h-4 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg> <span>Make this note private</span>',
    1,
  ),
  Os = X(
    '<svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"></path></svg> <span>Make this note public</span>',
    1,
  ),
  Rs = X(
    '<span class="font-medium">Authentication required!</span> You must be signed in to create a private note.',
    1,
  ),
  Ds = X(`<span class="font-medium">Anonymous mode:</span> You're creating a public note without an account.`, 1),
  Fs = X(
    '<span class="flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> </span>',
  ),
  Gs = Ke(
    '<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd"></path></svg> ',
    1,
  ),
  Us = X(
    '<div class="p-4"><!> <div class="space-y-4"><div><!> <!> <!></div> <div><!> <!> <!></div> <div class="flex items-center"><!> <!></div> <!> <!></div> <div class="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200"><!> <!></div></div>',
  );
function na(r, e) {
  Se(e, !1);
  const a = Ne(),
    t = Ne(),
    s = Ne(),
    l = Ne(),
    n = Ne();
  let d = R(e, 'open', 12, !1),
    c = R(e, 'onClose', 8, () => {}),
    g = R(e, 'onSuccess', 8, () => {}),
    f = R(e, 'userToken', 8, null),
    p = R(e, 'initialNote', 8, null),
    m = R(e, 'isEditing', 8, !1),
    A = R(e, 'initialPublic', 8, !1),
    P = Ne(''),
    C = Ne(''),
    S = Ne(!1),
    k = Ne(!1),
    _ = Ne(null),
    u = Ne(void 0);
  function E() {
    (H(P, ''), H(C, ''), H(S, !1), H(_, null), H(u, void 0));
  }
  function M(b) {
    (H(P, b.title || ''),
      H(C, b.content || ''),
      H(S, !1),
      H(u, b.id),
      console.log('Loaded note data for editing, checkbox set to unchecked by default'));
  }
  async function h() {
    if (o(P).trim() === '') {
      H(_, new Error('Title is required'));
      return;
    }
    if (o(C).trim() === '') {
      H(_, new Error('Content is required'));
      return;
    }
    let b = f();
    if (!o(t) && !b && typeof window < 'u' && window.Clerk?.session)
      try {
        b = (await window.Clerk.session.getToken()) ?? null;
      } catch {}
    if (!o(t) && !b) {
      H(_, new Error('You must be signed in to create a private note'));
      return;
    }
    try {
      if (
        (console.log(
          'Submitting note with token:',
          b || f() ? 'Present' : 'Missing',
          'Is public:',
          o(t) ? 'Yes' : 'No',
          'Checkbox checked:',
          o(S) ? 'Yes' : 'No',
        ),
        H(k, !0),
        H(_, null),
        m() && o(u))
      )
        if (p() && (p().userId == null || p().userId === '') && (p().isPublic === !0 || p().isPublic === 'true')) {
          const D = await fetch(`/api/public-notes/${o(u)}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: o(P).trim(), content: o(C), isPublic: o(t)}),
          });
          if (!D.ok) {
            const F = await D.json().catch(() => ({}));
            throw new Error(F.error || `Failed to update note: ${D.status}`);
          }
        } else {
          const D = {'Content-Type': 'application/json'},
            F = b ?? f();
          F && (D.Authorization = `Bearer ${F}`);
          const V = await fetch(`/api/notes/${o(u)}`, {
            method: 'PUT',
            headers: D,
            body: JSON.stringify({title: o(P), content: o(C), isPublic: o(t)}),
          });
          if (!V.ok) {
            const j = await V.json().catch(() => ({}));
            throw new Error(j.error || `Failed to update note: ${V.status}`);
          }
        }
      else {
        console.log('Creating new note as', o(t) ? 'public' : 'private');
        let B = o(t) ? f() : b;
        if (o(t) && typeof window < 'u' && window.Clerk?.session)
          try {
            const j = await window.Clerk.session.getToken();
            j && (B = j);
          } catch {}
        if (o(t) && !B)
          try {
            (await bt.createNote({title: o(P).trim(), content: o(C), isPublic: !0}, void 0), E(), g()(), c()());
            return;
          } catch (j) {
            throw (console.error('Error creating anonymous public note:', j), j);
          }
        const D = {'Content-Type': 'application/json'};
        B && (D.Authorization = `Bearer ${B}`);
        const F = {title: o(P), content: o(C), isPublic: o(t)},
          V = await fetch('/api/notes', {method: 'POST', headers: D, body: JSON.stringify(F)});
        if (!V.ok) {
          if (o(t) && V.status === 401)
            try {
              (await bt.createNote({title: o(P).trim(), content: o(C), isPublic: !0}, void 0), E(), g()(), c()());
              return;
            } catch (N) {
              console.error('Fallback public note creation failed:', N);
            }
          const j = await V.json().catch(() => ({}));
          throw new Error(j.error || `Failed to create note: ${V.status}`);
        }
      }
      (E(), g()(), c()());
    } catch (B) {
      (console.error('Error saving note:', B), H(_, B instanceof Error ? B : new Error('Failed to save note')));
    } finally {
      H(k, !1);
    }
  }
  function v() {
    (E(), c()());
  }
  ($e(
    () => (Be(d()), Be(p()), Be(m()), Be(A())),
    () => {
      d() &&
        (p() && m()
          ? (console.log('Loading existing note data for editing:', p()),
            M(p()),
            H(S, !1),
            console.log('Note loaded for editing, toggle checkbox set to unchecked by default'))
          : m() ||
            (H(P, ''),
            H(C, ''),
            H(S, !1),
            H(u, void 0),
            H(_, null),
            console.log('Creating new note with initialPublic:', A())));
    },
  ),
    $e(
      () => o(S),
      () => {
        H(a, o(S));
      },
    ),
    $e(
      () => (Be(m()), Be(p()), o(a), Be(A())),
      () => {
        H(
          t,
          m() && p()
            ? o(a)
              ? !(typeof p().isPublic == 'string' ? p().isPublic === 'true' : p().isPublic)
              : typeof p().isPublic == 'string'
                ? p().isPublic === 'true'
                : !!p().isPublic
            : o(a)
              ? !A()
              : A(),
        );
      },
    ),
    $e(
      () => o(t),
      () => {
        H(s, o(t) ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700');
      },
    ),
    $e(
      () => o(t),
      () => {
        H(l, o(t) ? 'green' : 'purple');
      },
    ),
    $e(
      () => (o(P), o(C)),
      () => {
        H(n, o(P).trim() !== '' && o(C).trim() !== '');
      },
    ),
    Ka(),
    bo());
  {
    let b = nr(() => (m() ? 'Edit' : 'Create')),
      B = nr(() => (o(t) ? 'Public' : 'Private'));
    es(r, {
      get title() {
        return `${o(b) ?? ''} ${o(B) ?? ''} Note`;
      },
      size: 'md',
      autoclose: !1,
      outsideclose: !0,
      placement: 'center',
      onclose: v,
      get open() {
        return d();
      },
      set open(D) {
        d(D);
      },
      children: (D, F) => {
        var V = Us(),
          j = re(V);
        {
          var N = (G) => {
            F0(G, {
              color: 'red',
              class: 'mb-4',
              children: (oe, ue) => {
                var xe = Xe();
                (de(() => Ue(xe, (o(_), Me(() => o(_).message)))), T(oe, xe));
              },
              $$slots: {default: !0},
            });
          };
          Y(j, (G) => {
            o(_) && G(N);
          });
        }
        var x = ee(j, 2),
          w = re(x),
          I = re(w);
        fr(I, {
          for: 'title',
          class: 'block mb-2',
          children: (G, oe) => {
            var ue = Xe();
            (de(() => Ue(ue, `Title ${o(t) ? '(optional for public notes)' : '(required)'}`)), T(G, ue));
          },
          $$slots: {default: !0},
        });
        var y = ee(I, 2);
        {
          let G = nr(() => (o(t) ? 'Optional for public notes' : 'Required')),
            oe = nr(() => !o(t));
          zs(y, {
            type: 'text',
            id: 'title',
            get placeholder() {
              return o(G);
            },
            get required() {
              return o(oe);
            },
            get value() {
              return o(P);
            },
            set value(ue) {
              H(P, ue);
            },
            $$legacy: !0,
          });
        }
        var U = ee(y, 2);
        {
          var W = (G) => {
              _r(G, {
                class: 'mt-2',
                color: 'red',
                children: (oe, ue) => {
                  var xe = Xe('Title is required for private notes');
                  T(oe, xe);
                },
                $$slots: {default: !0},
              });
            },
            se = z(() => (o(P), o(t), Be(d()), Me(() => !o(P).trim() && !o(t) && d())));
          Y(U, (G) => {
            o(se) && G(W);
          });
        }
        var K = ee(w, 2),
          q = re(K);
        fr(q, {
          for: 'content',
          class: 'block mb-2',
          children: (G, oe) => {
            var ue = Xe('Content (required)');
            T(G, ue);
          },
          $$slots: {default: !0},
        });
        var te = ee(q, 2);
        Ms(te, {
          id: 'content',
          placeholder: 'Enter note content',
          rows: 6,
          required: !0,
          get value() {
            return o(C);
          },
          set value(G) {
            H(C, G);
          },
          $$legacy: !0,
        });
        var ne = ee(te, 2);
        {
          var Ee = (G) => {
              _r(G, {
                class: 'mt-2',
                color: 'red',
                children: (oe, ue) => {
                  var xe = Xe('Content is required');
                  T(oe, xe);
                },
                $$slots: {default: !0},
              });
            },
            pe = z(() => (o(C), Be(d()), Me(() => !o(C).trim() && d())));
          Y(ne, (G) => {
            o(pe) && G(Ee);
          });
        }
        var Je = ee(K, 2),
          Ie = re(Je);
        bs(Ie, {
          id: 'isPublic',
          get checked() {
            return o(S);
          },
          set checked(G) {
            H(S, G);
          },
          $$legacy: !0,
        });
        var Le = ee(Ie, 2);
        fr(Le, {
          for: 'isPublic',
          class: 'ml-2 flex items-center',
          children: (G, oe) => {
            var ue = ie(),
              xe = ae(ue);
            {
              var We = (Ce) => {
                  var me = ie(),
                    le = ae(me);
                  {
                    var ye = (ce) => {
                        var Ve = js();
                        T(ce, Ve);
                      },
                      be = (ce) => {
                        var Ve = Is();
                        T(ce, Ve);
                      };
                    Y(le, (ce) => {
                      (Be(p()),
                        Me(() => (typeof p().isPublic == 'string' ? p().isPublic === 'true' : !!p().isPublic))
                          ? ce(ye)
                          : ce(be, !1));
                    });
                  }
                  T(Ce, me);
                },
                Ae = (Ce) => {
                  var me = ie(),
                    le = ae(me);
                  {
                    var ye = (ce) => {
                        var Ve = Ls();
                        T(ce, Ve);
                      },
                      be = (ce) => {
                        var Ve = Os();
                        T(ce, Ve);
                      };
                    Y(le, (ce) => {
                      o(t) ? ce(ye) : ce(be, !1);
                    });
                  }
                  T(Ce, me);
                };
              Y(xe, (Ce) => {
                m() && p() ? Ce(We) : Ce(Ae, !1);
              });
            }
            T(G, ue);
          },
          $$slots: {default: !0},
        });
        var Oe = ee(Je, 2);
        {
          var Re = (G) => {
            _r(G, {
              color: 'red',
              children: (oe, ue) => {
                var xe = Rs();
                T(oe, xe);
              },
              $$slots: {default: !0},
            });
          };
          Y(Oe, (G) => {
            !o(t) && !f() && G(Re);
          });
        }
        var jr = ee(Oe, 2);
        {
          var Ir = (G) => {
            _r(G, {
              color: 'green',
              children: (oe, ue) => {
                var xe = Ds();
                T(oe, xe);
              },
              $$slots: {default: !0},
            });
          };
          Y(jr, (G) => {
            o(t) && !f() && G(Ir);
          });
        }
        var Lr = ee(x, 2),
          yr = re(Lr);
        ht(yr, {
          type: 'button',
          color: 'light',
          class: 'px-6 py-2',
          get disabled() {
            return o(k);
          },
          onclick: v,
          children: (G, oe) => {
            var ue = Xe('Cancel');
            T(G, ue);
          },
          $$slots: {default: !0},
        });
        var J = ee(yr, 2);
        {
          let G = nr(() => o(k) || !o(n));
          ht(J, {
            type: 'button',
            get class() {
              return `${o(s) ?? ''} text-white px-6 py-2 font-semibold`;
            },
            get disabled() {
              return o(G);
            },
            onclick: h,
            children: (oe, ue) => {
              var xe = ie(),
                We = ae(xe);
              {
                var Ae = (me) => {
                    var le = Fs(),
                      ye = ee(re(le));
                    (de(() => Ue(ye, ` ${m() ? 'Updating...' : 'Creating...'}`)), T(me, le));
                  },
                  Ce = (me) => {
                    var le = Gs(),
                      ye = ae(le),
                      be = re(ye),
                      ce = ee(ye);
                    (de(() => {
                      (Ye(
                        be,
                        'd',
                        m()
                          ? 'M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'
                          : 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z',
                      ),
                        Ue(ce, `${m() ? 'Update ' : 'Save '}${o(t) ? 'Public ' : 'Private '}Note`));
                    }),
                      T(me, le));
                  };
                Y(We, (me) => {
                  o(k) ? me(Ae) : me(Ce, !1);
                });
              }
              T(oe, xe);
            },
            $$slots: {default: !0},
          });
        }
        T(D, V);
      },
      $$slots: {default: !0},
      $$legacy: !0,
    });
  }
  Pe();
}
na.__docgen = {
  data: [
    {
      name: 'open',
      visibility: 'public',
      keywords: [],
      kind: 'let',
      type: {kind: 'type', type: 'boolean', text: 'boolean'},
      static: !1,
      readonly: !1,
      defaultValue: 'false',
    },
    {
      name: 'onClose',
      visibility: 'public',
      keywords: [],
      kind: 'let',
      type: {kind: 'function', text: '() => void'},
      static: !1,
      readonly: !1,
      defaultValue: 'function',
    },
    {
      name: 'onSuccess',
      visibility: 'public',
      keywords: [],
      kind: 'let',
      type: {kind: 'function', text: '() => void'},
      static: !1,
      readonly: !1,
      defaultValue: 'function',
    },
    {
      name: 'userToken',
      visibility: 'public',
      keywords: [],
      kind: 'let',
      type: {kind: 'type', type: 'string', text: 'string'},
      static: !1,
      readonly: !1,
      defaultValue: 'null',
    },
    {
      name: 'initialNote',
      visibility: 'public',
      keywords: [],
      kind: 'let',
      type: {kind: 'type', type: 'object', text: 'NoteData'},
      static: !1,
      readonly: !1,
      defaultValue: 'null',
    },
    {
      name: 'isEditing',
      visibility: 'public',
      keywords: [],
      kind: 'let',
      type: {kind: 'type', type: 'boolean', text: 'boolean'},
      static: !1,
      readonly: !1,
      defaultValue: 'false',
    },
    {
      name: 'initialPublic',
      visibility: 'public',
      keywords: [],
      kind: 'let',
      type: {kind: 'type', type: 'boolean', text: 'boolean'},
      static: !1,
      readonly: !1,
      defaultValue: 'false',
    },
  ],
  name: 'NoteModal.svelte',
};
const Ys = {title: 'Notes/NoteModal', component: na},
  zr = {args: {open: !1}},
  Ar = {args: {open: !0}};
zr.parameters = {
  ...zr.parameters,
  docs: {
    ...zr.parameters?.docs,
    source: {
      originalSource: `{
  args: {
    open: false
  }
}`,
      ...zr.parameters?.docs?.source,
    },
  },
};
Ar.parameters = {
  ...Ar.parameters,
  docs: {
    ...Ar.parameters?.docs,
    source: {
      originalSource: `{
  args: {
    open: true
  }
}`,
      ...Ar.parameters?.docs?.source,
    },
  },
};
const Ks = ['Closed', 'Open'];
export {zr as Closed, Ar as Open, Ks as __namedExportsOrder, Ys as default};
