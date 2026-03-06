import {r as u, j as f, R as ot, g as Co} from './iframe-BPyNWV_d.js';
import {r as Eo, R as Ro, c as Hr} from './index-CG_SYJi4.js';
import './preload-helper-PPVm8Dsz.js';
import './index-DpdJq6kE.js';
var de = function () {
  return (
    (de =
      Object.assign ||
      function (t) {
        for (var r, n = 1, o = arguments.length; n < o; n++) {
          r = arguments[n];
          for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (t[s] = r[s]);
        }
        return t;
      }),
    de.apply(this, arguments)
  );
};
function Yr(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
      t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
}
function Po(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = t.length, s; n < o; n++)
      (s || !(n in t)) && (s || (s = Array.prototype.slice.call(t, 0, n)), (s[n] = t[n]));
  return e.concat(s || Array.prototype.slice.call(t));
}
var rt = 'right-scroll-bar-position',
  nt = 'width-before-scroll-bar',
  No = 'with-scroll-bars-hidden',
  To = '--removed-body-scroll-bar-size';
function _t(e, t) {
  return (typeof e == 'function' ? e(t) : e && (e.current = t), e);
}
function jo(e, t) {
  var r = u.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return r.value;
        },
        set current(n) {
          var o = r.value;
          o !== n && ((r.value = n), r.callback(n, o));
        },
      },
    };
  })[0];
  return ((r.callback = t), r.facade);
}
var _o = typeof window < 'u' ? u.useLayoutEffect : u.useEffect,
  vr = new WeakMap();
function Io(e, t) {
  var r = jo(null, function (n) {
    return e.forEach(function (o) {
      return _t(o, n);
    });
  });
  return (
    _o(
      function () {
        var n = vr.get(r);
        if (n) {
          var o = new Set(n),
            s = new Set(e),
            a = r.current;
          (o.forEach(function (i) {
            s.has(i) || _t(i, null);
          }),
            s.forEach(function (i) {
              o.has(i) || _t(i, a);
            }));
        }
        vr.set(r, e);
      },
      [e],
    ),
    r
  );
}
function ko(e) {
  return e;
}
function $o(e, t) {
  t === void 0 && (t = ko);
  var r = [],
    n = !1,
    o = {
      read: function () {
        if (n)
          throw new Error(
            'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.',
          );
        return r.length ? r[r.length - 1] : e;
      },
      useMedium: function (s) {
        var a = t(s, n);
        return (
          r.push(a),
          function () {
            r = r.filter(function (i) {
              return i !== a;
            });
          }
        );
      },
      assignSyncMedium: function (s) {
        for (n = !0; r.length; ) {
          var a = r;
          ((r = []), a.forEach(s));
        }
        r = {
          push: function (i) {
            return s(i);
          },
          filter: function () {
            return r;
          },
        };
      },
      assignMedium: function (s) {
        n = !0;
        var a = [];
        if (r.length) {
          var i = r;
          ((r = []), i.forEach(s), (a = r));
        }
        var l = function () {
            var d = a;
            ((a = []), d.forEach(s));
          },
          c = function () {
            return Promise.resolve().then(l);
          };
        (c(),
          (r = {
            push: function (d) {
              (a.push(d), c());
            },
            filter: function (d) {
              return ((a = a.filter(d)), r);
            },
          }));
      },
    };
  return o;
}
function Ao(e) {
  e === void 0 && (e = {});
  var t = $o(null);
  return ((t.options = de({async: !0, ssr: !1}, e)), t);
}
var Gr = function (e) {
  var t = e.sideCar,
    r = Yr(e, ['sideCar']);
  if (!t) throw new Error('Sidecar: please provide `sideCar` property to import the right car');
  var n = t.read();
  if (!n) throw new Error('Sidecar medium not found');
  return u.createElement(n, de({}, r));
};
Gr.isSideCarExport = !0;
function Mo(e, t) {
  return (e.useMedium(t), Gr);
}
var Xr = Ao(),
  It = function () {},
  it = u.forwardRef(function (e, t) {
    var r = u.useRef(null),
      n = u.useState({onScrollCapture: It, onWheelCapture: It, onTouchMoveCapture: It}),
      o = n[0],
      s = n[1],
      a = e.forwardProps,
      i = e.children,
      l = e.className,
      c = e.removeScrollBar,
      d = e.enabled,
      p = e.shards,
      m = e.sideCar,
      y = e.noRelative,
      v = e.noIsolation,
      b = e.inert,
      h = e.allowPinchZoom,
      S = e.as,
      g = S === void 0 ? 'div' : S,
      w = e.gapMode,
      E = Yr(e, [
        'forwardProps',
        'children',
        'className',
        'removeScrollBar',
        'enabled',
        'shards',
        'sideCar',
        'noRelative',
        'noIsolation',
        'inert',
        'allowPinchZoom',
        'as',
        'gapMode',
      ]),
      R = m,
      x = Io([r, t]),
      C = de(de({}, E), o);
    return u.createElement(
      u.Fragment,
      null,
      d &&
        u.createElement(R, {
          sideCar: Xr,
          removeScrollBar: c,
          shards: p,
          noRelative: y,
          noIsolation: v,
          inert: b,
          setCallbacks: s,
          allowPinchZoom: !!h,
          lockRef: r,
          gapMode: w,
        }),
      a
        ? u.cloneElement(u.Children.only(i), de(de({}, C), {ref: x}))
        : u.createElement(g, de({}, C, {className: l, ref: x}), i),
    );
  });
it.defaultProps = {enabled: !0, removeScrollBar: !0, inert: !1};
it.classNames = {fullWidth: nt, zeroRight: rt};
var Lo = function () {
  if (typeof __webpack_nonce__ < 'u') return __webpack_nonce__;
};
function zo() {
  if (!document) return null;
  var e = document.createElement('style');
  e.type = 'text/css';
  var t = Lo();
  return (t && e.setAttribute('nonce', t), e);
}
function Oo(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t));
}
function Fo(e) {
  var t = document.head || document.getElementsByTagName('head')[0];
  t.appendChild(e);
}
var Bo = function () {
    var e = 0,
      t = null;
    return {
      add: function (r) {
        (e == 0 && (t = zo()) && (Oo(t, r), Fo(t)), e++);
      },
      remove: function () {
        (e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  Do = function () {
    var e = Bo();
    return function (t, r) {
      u.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && r],
      );
    };
  },
  qr = function () {
    var e = Do(),
      t = function (r) {
        var n = r.styles,
          o = r.dynamic;
        return (e(n, o), null);
      };
    return t;
  },
  Vo = {left: 0, top: 0, right: 0, gap: 0},
  kt = function (e) {
    return parseInt(e || '', 10) || 0;
  },
  Wo = function (e) {
    var t = window.getComputedStyle(document.body),
      r = t[e === 'padding' ? 'paddingLeft' : 'marginLeft'],
      n = t[e === 'padding' ? 'paddingTop' : 'marginTop'],
      o = t[e === 'padding' ? 'paddingRight' : 'marginRight'];
    return [kt(r), kt(n), kt(o)];
  },
  Ho = function (e) {
    if ((e === void 0 && (e = 'margin'), typeof window > 'u')) return Vo;
    var t = Wo(e),
      r = document.documentElement.clientWidth,
      n = window.innerWidth;
    return {left: t[0], top: t[1], right: t[2], gap: Math.max(0, n - r + t[2] - t[0])};
  },
  Yo = qr(),
  _e = 'data-scroll-locked',
  Go = function (e, t, r, n) {
    var o = e.left,
      s = e.top,
      a = e.right,
      i = e.gap;
    return (
      r === void 0 && (r = 'margin'),
      `
  .`
        .concat(
          No,
          ` {
   overflow: hidden `,
        )
        .concat(
          n,
          `;
   padding-right: `,
        )
        .concat(i, 'px ')
        .concat(
          n,
          `;
  }
  body[`,
        )
        .concat(
          _e,
          `] {
    overflow: hidden `,
        )
        .concat(
          n,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            t && 'position: relative '.concat(n, ';'),
            r === 'margin' &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `,
                )
                .concat(
                  s,
                  `px;
    padding-right: `,
                )
                .concat(
                  a,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(i, 'px ')
                .concat(
                  n,
                  `;
    `,
                ),
            r === 'padding' && 'padding-right: '.concat(i, 'px ').concat(n, ';'),
          ]
            .filter(Boolean)
            .join(''),
          `
  }
  
  .`,
        )
        .concat(
          rt,
          ` {
    right: `,
        )
        .concat(i, 'px ')
        .concat(
          n,
          `;
  }
  
  .`,
        )
        .concat(
          nt,
          ` {
    margin-right: `,
        )
        .concat(i, 'px ')
        .concat(
          n,
          `;
  }
  
  .`,
        )
        .concat(rt, ' .')
        .concat(
          rt,
          ` {
    right: 0 `,
        )
        .concat(
          n,
          `;
  }
  
  .`,
        )
        .concat(nt, ' .')
        .concat(
          nt,
          ` {
    margin-right: 0 `,
        )
        .concat(
          n,
          `;
  }
  
  body[`,
        )
        .concat(
          _e,
          `] {
    `,
        )
        .concat(To, ': ')
        .concat(
          i,
          `px;
  }
`,
        )
    );
  },
  Sr = function () {
    var e = parseInt(document.body.getAttribute(_e) || '0', 10);
    return isFinite(e) ? e : 0;
  },
  Xo = function () {
    u.useEffect(function () {
      return (
        document.body.setAttribute(_e, (Sr() + 1).toString()),
        function () {
          var e = Sr() - 1;
          e <= 0 ? document.body.removeAttribute(_e) : document.body.setAttribute(_e, e.toString());
        }
      );
    }, []);
  },
  qo = function (e) {
    var t = e.noRelative,
      r = e.noImportant,
      n = e.gapMode,
      o = n === void 0 ? 'margin' : n;
    Xo();
    var s = u.useMemo(
      function () {
        return Ho(o);
      },
      [o],
    );
    return u.createElement(Yo, {styles: Go(s, !t, o, r ? '' : '!important')});
  },
  Ot = !1;
if (typeof window < 'u')
  try {
    var Ue = Object.defineProperty({}, 'passive', {
      get: function () {
        return ((Ot = !0), !0);
      },
    });
    (window.addEventListener('test', Ue, Ue), window.removeEventListener('test', Ue, Ue));
  } catch {
    Ot = !1;
  }
var Ne = Ot ? {passive: !1} : !1,
  Uo = function (e) {
    return e.tagName === 'TEXTAREA';
  },
  Ur = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var r = window.getComputedStyle(e);
    return r[t] !== 'hidden' && !(r.overflowY === r.overflowX && !Uo(e) && r[t] === 'visible');
  },
  Ko = function (e) {
    return Ur(e, 'overflowY');
  },
  Zo = function (e) {
    return Ur(e, 'overflowX');
  },
  xr = function (e, t) {
    var r = t.ownerDocument,
      n = t;
    do {
      typeof ShadowRoot < 'u' && n instanceof ShadowRoot && (n = n.host);
      var o = Kr(e, n);
      if (o) {
        var s = Zr(e, n),
          a = s[1],
          i = s[2];
        if (a > i) return !0;
      }
      n = n.parentNode;
    } while (n && n !== r.body);
    return !1;
  },
  Qo = function (e) {
    var t = e.scrollTop,
      r = e.scrollHeight,
      n = e.clientHeight;
    return [t, r, n];
  },
  Jo = function (e) {
    var t = e.scrollLeft,
      r = e.scrollWidth,
      n = e.clientWidth;
    return [t, r, n];
  },
  Kr = function (e, t) {
    return e === 'v' ? Ko(t) : Zo(t);
  },
  Zr = function (e, t) {
    return e === 'v' ? Qo(t) : Jo(t);
  },
  es = function (e, t) {
    return e === 'h' && t === 'rtl' ? -1 : 1;
  },
  ts = function (e, t, r, n, o) {
    var s = es(e, window.getComputedStyle(t).direction),
      a = s * n,
      i = r.target,
      l = t.contains(i),
      c = !1,
      d = a > 0,
      p = 0,
      m = 0;
    do {
      if (!i) break;
      var y = Zr(e, i),
        v = y[0],
        b = y[1],
        h = y[2],
        S = b - h - s * v;
      (v || S) && Kr(e, i) && ((p += S), (m += v));
      var g = i.parentNode;
      i = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
    } while ((!l && i !== document.body) || (l && (t.contains(i) || t === i)));
    return (((d && Math.abs(p) < 1) || (!d && Math.abs(m) < 1)) && (c = !0), c);
  },
  Ke = function (e) {
    return 'changedTouches' in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
  },
  wr = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Cr = function (e) {
    return e && 'current' in e ? e.current : e;
  },
  rs = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  ns = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  os = 0,
  Te = [];
function ss(e) {
  var t = u.useRef([]),
    r = u.useRef([0, 0]),
    n = u.useRef(),
    o = u.useState(os++)[0],
    s = u.useState(qr)[0],
    a = u.useRef(e);
  (u.useEffect(
    function () {
      a.current = e;
    },
    [e],
  ),
    u.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add('block-interactivity-'.concat(o));
          var b = Po([e.lockRef.current], (e.shards || []).map(Cr), !0).filter(Boolean);
          return (
            b.forEach(function (h) {
              return h.classList.add('allow-interactivity-'.concat(o));
            }),
            function () {
              (document.body.classList.remove('block-interactivity-'.concat(o)),
                b.forEach(function (h) {
                  return h.classList.remove('allow-interactivity-'.concat(o));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var i = u.useCallback(function (b, h) {
      if (('touches' in b && b.touches.length === 2) || (b.type === 'wheel' && b.ctrlKey))
        return !a.current.allowPinchZoom;
      var S = Ke(b),
        g = r.current,
        w = 'deltaX' in b ? b.deltaX : g[0] - S[0],
        E = 'deltaY' in b ? b.deltaY : g[1] - S[1],
        R,
        x = b.target,
        C = Math.abs(w) > Math.abs(E) ? 'h' : 'v';
      if ('touches' in b && C === 'h' && x.type === 'range') return !1;
      var P = window.getSelection(),
        N = P && P.anchorNode,
        j = N ? N === x || N.contains(x) : !1;
      if (j) return !1;
      var $ = xr(C, x);
      if (!$) return !0;
      if (($ ? (R = C) : ((R = C === 'v' ? 'h' : 'v'), ($ = xr(C, x))), !$)) return !1;
      if ((!n.current && 'changedTouches' in b && (w || E) && (n.current = R), !R)) return !0;
      var k = n.current || R;
      return ts(k, h, b, k === 'h' ? w : E);
    }, []),
    l = u.useCallback(function (b) {
      var h = b;
      if (!(!Te.length || Te[Te.length - 1] !== s)) {
        var S = 'deltaY' in h ? wr(h) : Ke(h),
          g = t.current.filter(function (R) {
            return R.name === h.type && (R.target === h.target || h.target === R.shadowParent) && rs(R.delta, S);
          })[0];
        if (g && g.should) {
          h.cancelable && h.preventDefault();
          return;
        }
        if (!g) {
          var w = (a.current.shards || [])
              .map(Cr)
              .filter(Boolean)
              .filter(function (R) {
                return R.contains(h.target);
              }),
            E = w.length > 0 ? i(h, w[0]) : !a.current.noIsolation;
          E && h.cancelable && h.preventDefault();
        }
      }
    }, []),
    c = u.useCallback(function (b, h, S, g) {
      var w = {name: b, delta: h, target: S, should: g, shadowParent: as(S)};
      (t.current.push(w),
        setTimeout(function () {
          t.current = t.current.filter(function (E) {
            return E !== w;
          });
        }, 1));
    }, []),
    d = u.useCallback(function (b) {
      ((r.current = Ke(b)), (n.current = void 0));
    }, []),
    p = u.useCallback(function (b) {
      c(b.type, wr(b), b.target, i(b, e.lockRef.current));
    }, []),
    m = u.useCallback(function (b) {
      c(b.type, Ke(b), b.target, i(b, e.lockRef.current));
    }, []);
  u.useEffect(function () {
    return (
      Te.push(s),
      e.setCallbacks({onScrollCapture: p, onWheelCapture: p, onTouchMoveCapture: m}),
      document.addEventListener('wheel', l, Ne),
      document.addEventListener('touchmove', l, Ne),
      document.addEventListener('touchstart', d, Ne),
      function () {
        ((Te = Te.filter(function (b) {
          return b !== s;
        })),
          document.removeEventListener('wheel', l, Ne),
          document.removeEventListener('touchmove', l, Ne),
          document.removeEventListener('touchstart', d, Ne));
      }
    );
  }, []);
  var y = e.removeScrollBar,
    v = e.inert;
  return u.createElement(
    u.Fragment,
    null,
    v ? u.createElement(s, {styles: ns(o)}) : null,
    y ? u.createElement(qo, {noRelative: e.noRelative, gapMode: e.gapMode}) : null,
  );
}
function as(e) {
  for (var t = null; e !== null; ) (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode));
  return t;
}
const is = Mo(Xr, ss);
var Qr = u.forwardRef(function (e, t) {
  return u.createElement(it, de({}, e, {ref: t, sideCar: is}));
});
Qr.classNames = it.classNames;
function Kt(e) {
  return Object.keys(e);
}
function ls(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function Er(e) {
  return e === '0rem' ? '0rem' : `calc(${e} * var(--mantine-scale))`;
}
function Jr(e, {shouldScale: t = !1} = {}) {
  function r(n) {
    if (n === 0 || n === '0') return `0${e}`;
    if (typeof n == 'number') {
      const o = `${n / 16}${e}`;
      return t ? Er(o) : o;
    }
    if (typeof n == 'string') {
      if (n === '' || n.startsWith('calc(') || n.startsWith('clamp(') || n.includes('rgba(')) return n;
      if (n.includes(','))
        return n
          .split(',')
          .map((s) => r(s))
          .join(',');
      if (n.includes(' '))
        return n
          .split(' ')
          .map((s) => r(s))
          .join(' ');
      const o = n.replace('px', '');
      if (!Number.isNaN(Number(o))) {
        const s = `${Number(o) / 16}${e}`;
        return t ? Er(s) : s;
      }
    }
    return n;
  }
  return r;
}
const O = Jr('rem', {shouldScale: !0});
Jr('em');
function lt(e) {
  return Object.keys(e).reduce((t, r) => (e[r] !== void 0 && (t[r] = e[r]), t), {});
}
function en(e) {
  if (typeof e == 'number') return !0;
  if (typeof e == 'string') {
    if (e.startsWith('calc(') || e.startsWith('var(') || (e.includes(' ') && e.trim() !== '')) return !0;
    const t =
      /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/;
    return e
      .trim()
      .split(/\s+/)
      .every((n) => t.test(n));
  }
  return !1;
}
function cs(e) {
  return Array.isArray(e) || e === null ? !1 : typeof e == 'object' ? e.type !== u.Fragment : !1;
}
function ct(e) {
  const t = u.createContext(null);
  return [
    ({children: o, value: s}) => f.jsx(t.Provider, {value: s, children: o}),
    () => {
      const o = u.useContext(t);
      if (o === null) throw new Error(e);
      return o;
    },
  ];
}
function Ve(e = null) {
  const t = u.createContext(e);
  return [({children: o, value: s}) => f.jsx(t.Provider, {value: s, children: o}), () => u.useContext(t)];
}
const us = {app: 100, modal: 200, popover: 300, overlay: 400, max: 9999};
function Ae(e) {
  return us[e];
}
function V(e, t = 'size', r = !0) {
  if (e !== void 0) return en(e) ? (r ? O(e) : e) : `var(--${t}-${e})`;
}
function ut(e) {
  return V(e, 'mantine-spacing');
}
function le(e) {
  return e === void 0 ? 'var(--mantine-radius-default)' : V(e, 'mantine-radius');
}
function ee(e) {
  return V(e, 'mantine-font-size');
}
function ds(e) {
  return V(e, 'mantine-line-height', !1);
}
function tn(e) {
  if (e) return V(e, 'mantine-shadow', !1);
}
function fs(e = 'mantine-') {
  return `${e}${Math.random().toString(36).slice(2, 11)}`;
}
function Se(e) {
  const t = u.useRef(e);
  return (
    u.useEffect(() => {
      t.current = e;
    }),
    u.useMemo(
      () =>
        (...r) =>
          t.current?.(...r),
      [],
    )
  );
}
function dt(e, t) {
  const {
      delay: r,
      flushOnUnmount: n,
      leading: o,
    } = typeof t == 'number' ? {delay: t, flushOnUnmount: !1, leading: !1} : t,
    s = Se(e),
    a = u.useRef(0),
    i = u.useMemo(() => {
      const l = Object.assign(
        (...c) => {
          window.clearTimeout(a.current);
          const d = l._isFirstCall;
          l._isFirstCall = !1;
          function p() {
            (window.clearTimeout(a.current), (a.current = 0), (l._isFirstCall = !0));
          }
          if (o && d) {
            s(...c);
            const v = () => {
                p();
              },
              b = () => {
                a.current !== 0 && (p(), s(...c));
              },
              h = () => {
                p();
              };
            ((l.flush = b), (l.cancel = h), (a.current = window.setTimeout(v, r)));
            return;
          }
          if (o && !d) {
            const v = () => {
                a.current !== 0 && (p(), s(...c));
              },
              b = () => {
                p();
              };
            ((l.flush = v), (l.cancel = b));
            const h = () => {
              p();
            };
            a.current = window.setTimeout(h, r);
            return;
          }
          const m = () => {
              a.current !== 0 && (p(), s(...c));
            },
            y = () => {
              p();
            };
          ((l.flush = m), (l.cancel = y), (a.current = window.setTimeout(m, r)));
        },
        {flush: () => {}, cancel: () => {}, _isFirstCall: !0},
      );
      return l;
    }, [s, r, o]);
  return (
    u.useEffect(
      () => () => {
        n ? i.flush() : i.cancel();
      },
      [i, n],
    ),
    i
  );
}
function ps(e, t) {
  try {
    return (e.addEventListener('change', t), () => e.removeEventListener('change', t));
  } catch {
    return (e.addListener(t), () => e.removeListener(t));
  }
}
function ms(e, t) {
  return typeof window < 'u' && 'matchMedia' in window ? window.matchMedia(e).matches : !1;
}
function ys(e, t, {getInitialValueInEffect: r} = {getInitialValueInEffect: !0}) {
  const [n, o] = u.useState(r ? t : ms(e));
  return (
    u.useEffect(() => {
      try {
        const s = window.matchMedia(e);
        return (o(s.matches), ps(s, (a) => o(a.matches)));
      } catch {
        return;
      }
    }, [e]),
    n || !1
  );
}
const Zt = typeof document < 'u' ? u.useLayoutEffect : u.useEffect;
function rn(e, t) {
  const r = u.useRef(!1);
  (u.useEffect(
    () => () => {
      r.current = !1;
    },
    [],
  ),
    u.useEffect(() => {
      if (r.current) return e();
      r.current = !0;
    }, t));
}
function hs({opened: e, shouldReturnFocus: t = !0}) {
  const r = u.useRef(null),
    n = () => {
      r.current &&
        'focus' in r.current &&
        typeof r.current.focus == 'function' &&
        r.current?.focus({preventScroll: !0});
    };
  return (
    rn(() => {
      let o = -1;
      const s = (a) => {
        a.key === 'Tab' && window.clearTimeout(o);
      };
      return (
        document.addEventListener('keydown', s),
        e ? (r.current = document.activeElement) : t && (o = window.setTimeout(n, 10)),
        () => {
          (window.clearTimeout(o), document.removeEventListener('keydown', s));
        }
      );
    }, [e, t]),
    n
  );
}
const gs = /input|select|textarea|button|object/,
  nn = 'a, input, select, textarea, button, object, [tabindex]';
function bs(e) {
  return e.style.display === 'none';
}
function vs(e) {
  if (e.getAttribute('aria-hidden') || e.getAttribute('hidden') || e.getAttribute('type') === 'hidden') return !1;
  let r = e;
  for (; r && !(r === document.body || r.nodeType === 11); ) {
    if (bs(r)) return !1;
    r = r.parentNode;
  }
  return !0;
}
function on(e) {
  let t = e.getAttribute('tabindex');
  return (t === null && (t = void 0), parseInt(t, 10));
}
function Ft(e) {
  const t = e.nodeName.toLowerCase(),
    r = !Number.isNaN(on(e));
  return ((gs.test(t) && !e.disabled) || (e instanceof HTMLAnchorElement && e.href) || r) && vs(e);
}
function sn(e) {
  const t = on(e);
  return (Number.isNaN(t) || t >= 0) && Ft(e);
}
function Ss(e) {
  return Array.from(e.querySelectorAll(nn)).filter(sn);
}
function xs(e, t) {
  const r = Ss(e);
  if (!r.length) {
    t.preventDefault();
    return;
  }
  const n = r[t.shiftKey ? 0 : r.length - 1],
    o = e.getRootNode();
  let s = n === o.activeElement || e === o.activeElement;
  const a = o.activeElement;
  if (
    (a.tagName === 'INPUT' &&
      a.getAttribute('type') === 'radio' &&
      (s = r
        .filter((d) => d.getAttribute('type') === 'radio' && d.getAttribute('name') === a.getAttribute('name'))
        .includes(n)),
    !s)
  )
    return;
  t.preventDefault();
  const l = r[t.shiftKey ? r.length - 1 : 0];
  l && l.focus();
}
function ws(e = !0) {
  const t = u.useRef(null),
    r = (o) => {
      let s = o.querySelector('[data-autofocus]');
      if (!s) {
        const a = Array.from(o.querySelectorAll(nn));
        ((s = a.find(sn) || a.find(Ft) || null), !s && Ft(o) && (s = o));
      }
      s && s.focus({preventScroll: !0});
    },
    n = u.useCallback(
      (o) => {
        e &&
          o !== null &&
          t.current !== o &&
          (o
            ? (setTimeout(() => {
                o.getRootNode() && r(o);
              }),
              (t.current = o))
            : (t.current = null));
      },
      [e],
    );
  return (
    u.useEffect(() => {
      if (!e) return;
      t.current && setTimeout(() => r(t.current));
      const o = (s) => {
        s.key === 'Tab' && t.current && xs(t.current, s);
      };
      return (document.addEventListener('keydown', o), () => document.removeEventListener('keydown', o));
    }, [e]),
    n
  );
}
const Cs = ot.useId || (() => {});
function Es() {
  const e = Cs();
  return e ? `mantine-${e.replace(/:/g, '')}` : '';
}
function We(e) {
  const t = Es(),
    [r, n] = u.useState(t);
  return (
    Zt(() => {
      n(fs());
    }, []),
    typeof e == 'string' ? e : typeof window > 'u' ? t : r
  );
}
function Rs(e, t, r) {
  u.useEffect(() => (window.addEventListener(e, t, r), () => window.removeEventListener(e, t, r)), [e, t]);
}
function Bt(e, t) {
  if (typeof e == 'function') return e(t);
  typeof e == 'object' && e !== null && 'current' in e && (e.current = t);
}
function Ps(...e) {
  const t = new Map();
  return (r) => {
    if (
      (e.forEach((n) => {
        const o = Bt(n, r);
        o && t.set(n, o);
      }),
      t.size > 0)
    )
      return () => {
        (e.forEach((n) => {
          const o = t.get(n);
          o && typeof o == 'function' ? o() : Bt(n, null);
        }),
          t.clear());
      };
  };
}
function Ce(...e) {
  return u.useCallback(Ps(...e), e);
}
function Ns({value: e, defaultValue: t, finalValue: r, onChange: n = () => {}}) {
  const [o, s] = u.useState(t !== void 0 ? t : r),
    a = (i, ...l) => {
      (s(i), n?.(i, ...l));
    };
  return e !== void 0 ? [e, n, !0] : [o, a, !1];
}
function an(e, t) {
  return ys('(prefers-reduced-motion: reduce)', e, t);
}
var Ts = {};
function js() {
  return typeof process < 'u' && Ts ? 'production' : 'development';
}
function _s(e) {
  const t = u.Children.toArray(e);
  return t.length !== 1 || !cs(t[0]) ? null : t[0];
}
function ln(e) {
  var t,
    r,
    n = '';
  if (typeof e == 'string' || typeof e == 'number') n += e;
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (r = ln(e[t])) && (n && (n += ' '), (n += r));
    } else for (r in e) e[r] && (n && (n += ' '), (n += r));
  return n;
}
function te() {
  for (var e, t, r = 0, n = '', o = arguments.length; r < o; r++)
    (e = arguments[r]) && (t = ln(e)) && (n && (n += ' '), (n += t));
  return n;
}
const Is = {};
function ks(e) {
  const t = {};
  return (
    e.forEach((r) => {
      Object.entries(r).forEach(([n, o]) => {
        t[n] ? (t[n] = te(t[n], o)) : (t[n] = o);
      });
    }),
    t
  );
}
function ft({theme: e, classNames: t, props: r, stylesCtx: n}) {
  const s = (Array.isArray(t) ? t : [t]).map((a) => (typeof a == 'function' ? a(e, r, n) : a || Is));
  return ks(s);
}
function st({theme: e, styles: t, props: r, stylesCtx: n}) {
  return (Array.isArray(t) ? t : [t]).reduce(
    (s, a) => (typeof a == 'function' ? {...s, ...a(e, r, n)} : {...s, ...a}),
    {},
  );
}
const $s = u.createContext(null);
function Ee() {
  const e = u.useContext($s);
  if (!e) throw new Error('[@mantine/core] MantineProvider was not found in tree');
  return e;
}
function As() {
  return Ee().classNamesPrefix;
}
function Ms() {
  return Ee().getStyleNonce;
}
function Ls() {
  return Ee().withStaticClasses;
}
function zs() {
  return Ee().headless;
}
function Os() {
  return Ee().stylesTransform?.sx;
}
function Fs() {
  return Ee().stylesTransform?.styles;
}
function cn() {
  return Ee().env || 'default';
}
function Bs(e) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(e);
}
function Ds(e) {
  let t = e.replace('#', '');
  if (t.length === 3) {
    const a = t.split('');
    t = [a[0], a[0], a[1], a[1], a[2], a[2]].join('');
  }
  if (t.length === 8) {
    const a = parseInt(t.slice(6, 8), 16) / 255;
    return {r: parseInt(t.slice(0, 2), 16), g: parseInt(t.slice(2, 4), 16), b: parseInt(t.slice(4, 6), 16), a};
  }
  const r = parseInt(t, 16),
    n = (r >> 16) & 255,
    o = (r >> 8) & 255,
    s = r & 255;
  return {r: n, g: o, b: s, a: 1};
}
function Vs(e) {
  const [t, r, n, o] = e
    .replace(/[^0-9,./]/g, '')
    .split(/[/,]/)
    .map(Number);
  return {r: t, g: r, b: n, a: o === void 0 ? 1 : o};
}
function Ws(e) {
  const t = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i,
    r = e.match(t);
  if (!r) return {r: 0, g: 0, b: 0, a: 1};
  const n = parseInt(r[1], 10),
    o = parseInt(r[2], 10) / 100,
    s = parseInt(r[3], 10) / 100,
    a = r[5] ? parseFloat(r[5]) : void 0,
    i = (1 - Math.abs(2 * s - 1)) * o,
    l = n / 60,
    c = i * (1 - Math.abs((l % 2) - 1)),
    d = s - i / 2;
  let p, m, y;
  return (
    l >= 0 && l < 1
      ? ((p = i), (m = c), (y = 0))
      : l >= 1 && l < 2
        ? ((p = c), (m = i), (y = 0))
        : l >= 2 && l < 3
          ? ((p = 0), (m = i), (y = c))
          : l >= 3 && l < 4
            ? ((p = 0), (m = c), (y = i))
            : l >= 4 && l < 5
              ? ((p = c), (m = 0), (y = i))
              : ((p = i), (m = 0), (y = c)),
    {r: Math.round((p + d) * 255), g: Math.round((m + d) * 255), b: Math.round((y + d) * 255), a: a || 1}
  );
}
function un(e) {
  return Bs(e) ? Ds(e) : e.startsWith('rgb') ? Vs(e) : e.startsWith('hsl') ? Ws(e) : {r: 0, g: 0, b: 0, a: 1};
}
function Hs(e, t) {
  return typeof e.primaryShade == 'number' ? e.primaryShade : t === 'dark' ? e.primaryShade.dark : e.primaryShade.light;
}
function $t(e) {
  return e <= 0.03928 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
}
function Ys(e) {
  const t = e.match(/oklch\((.*?)%\s/);
  return t ? parseFloat(t[1]) : null;
}
function Gs(e) {
  if (e.startsWith('oklch(')) return (Ys(e) || 0) / 100;
  const {r: t, g: r, b: n} = un(e),
    o = t / 255,
    s = r / 255,
    a = n / 255,
    i = $t(o),
    l = $t(s),
    c = $t(a);
  return 0.2126 * i + 0.7152 * l + 0.0722 * c;
}
function Fe(e, t = 0.179) {
  return e.startsWith('var(') ? !1 : Gs(e) > t;
}
function Me({color: e, theme: t, colorScheme: r}) {
  if (typeof e != 'string')
    throw new Error(`[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof e}`);
  if (e === 'bright')
    return {
      color: e,
      value: r === 'dark' ? t.white : t.black,
      shade: void 0,
      isThemeColor: !1,
      isLight: Fe(r === 'dark' ? t.white : t.black, t.luminanceThreshold),
      variable: '--mantine-color-bright',
    };
  if (e === 'dimmed')
    return {
      color: e,
      value: r === 'dark' ? t.colors.dark[2] : t.colors.gray[7],
      shade: void 0,
      isThemeColor: !1,
      isLight: Fe(r === 'dark' ? t.colors.dark[2] : t.colors.gray[6], t.luminanceThreshold),
      variable: '--mantine-color-dimmed',
    };
  if (e === 'white' || e === 'black')
    return {
      color: e,
      value: e === 'white' ? t.white : t.black,
      shade: void 0,
      isThemeColor: !1,
      isLight: Fe(e === 'white' ? t.white : t.black, t.luminanceThreshold),
      variable: `--mantine-color-${e}`,
    };
  const [n, o] = e.split('.'),
    s = o ? Number(o) : void 0,
    a = n in t.colors;
  if (a) {
    const i = s !== void 0 ? t.colors[n][s] : t.colors[n][Hs(t, r || 'light')];
    return {
      color: n,
      value: i,
      shade: s,
      isThemeColor: a,
      isLight: Fe(i, t.luminanceThreshold),
      variable: o ? `--mantine-color-${n}-${s}` : `--mantine-color-${n}-filled`,
    };
  }
  return {color: e, value: e, isThemeColor: a, isLight: Fe(e, t.luminanceThreshold), shade: s, variable: void 0};
}
function he(e, t) {
  const r = Me({color: e || t.primaryColor, theme: t});
  return r.variable ? `var(${r.variable})` : e;
}
function Xs(e, t) {
  const r = {
      from: e?.from || t.defaultGradient.from,
      to: e?.to || t.defaultGradient.to,
      deg: e?.deg ?? t.defaultGradient.deg ?? 0,
    },
    n = he(r.from, t),
    o = he(r.to, t);
  return `linear-gradient(${r.deg}deg, ${n} 0%, ${o} 100%)`;
}
function qs(e, t) {
  if (typeof e != 'string' || t > 1 || t < 0) return 'rgba(0, 0, 0, 1)';
  if (e.startsWith('var(')) {
    const s = (1 - t) * 100;
    return `color-mix(in srgb, ${e}, transparent ${s}%)`;
  }
  if (e.startsWith('oklch'))
    return e.includes('/') ? e.replace(/\/\s*[\d.]+\s*\)/, `/ ${t})`) : e.replace(')', ` / ${t})`);
  const {r, g: n, b: o} = un(e);
  return `rgba(${r}, ${n}, ${o}, ${t})`;
}
const Us = u.createContext(null);
function Re() {
  const e = u.useContext(Us);
  if (!e)
    throw new Error(
      '@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app',
    );
  return e;
}
function dn({color: e, theme: t, autoContrast: r}) {
  return (typeof r == 'boolean' ? r : t.autoContrast) && Me({color: e || t.primaryColor, theme: t}).isLight
    ? 'var(--mantine-color-black)'
    : 'var(--mantine-color-white)';
}
function Ks({classNames: e, styles: t, props: r, stylesCtx: n}) {
  const o = Re();
  return {
    resolvedClassNames: ft({theme: o, classNames: e, props: r, stylesCtx: n || void 0}),
    resolvedStyles: st({theme: o, styles: t, props: r, stylesCtx: n || void 0}),
  };
}
const Zs = {always: 'mantine-focus-always', auto: 'mantine-focus-auto', never: 'mantine-focus-never'};
function Qs({theme: e, options: t, unstyled: r}) {
  return te(t?.focusable && !r && (e.focusClassName || Zs[e.focusRing]), t?.active && !r && e.activeClassName);
}
function Js({selector: e, stylesCtx: t, options: r, props: n, theme: o}) {
  return ft({theme: o, classNames: r?.classNames, props: r?.props || n, stylesCtx: t})[e];
}
function Rr({selector: e, stylesCtx: t, theme: r, classNames: n, props: o}) {
  return ft({theme: r, classNames: n, props: o, stylesCtx: t})[e];
}
function ea({rootSelector: e, selector: t, className: r}) {
  return e === t ? r : void 0;
}
function ta({selector: e, classes: t, unstyled: r}) {
  return r ? void 0 : t[e];
}
function ra({themeName: e, classNamesPrefix: t, selector: r, withStaticClass: n}) {
  return n === !1 ? [] : e.map((o) => `${t}-${o}-${r}`);
}
function na({themeName: e, theme: t, selector: r, props: n, stylesCtx: o}) {
  return e.map((s) => ft({theme: t, classNames: t.components[s]?.classNames, props: n, stylesCtx: o})?.[r]);
}
function oa({options: e, classes: t, selector: r, unstyled: n}) {
  return e?.variant && !n ? t[`${r}--${e.variant}`] : void 0;
}
function sa({
  theme: e,
  options: t,
  themeName: r,
  selector: n,
  classNamesPrefix: o,
  classNames: s,
  classes: a,
  unstyled: i,
  className: l,
  rootSelector: c,
  props: d,
  stylesCtx: p,
  withStaticClasses: m,
  headless: y,
  transformedStyles: v,
}) {
  return te(
    Qs({theme: e, options: t, unstyled: i || y}),
    na({theme: e, themeName: r, selector: n, props: d, stylesCtx: p}),
    oa({options: t, classes: a, selector: n, unstyled: i}),
    Rr({selector: n, stylesCtx: p, theme: e, classNames: s, props: d}),
    Rr({selector: n, stylesCtx: p, theme: e, classNames: v, props: d}),
    Js({selector: n, stylesCtx: p, options: t, props: d, theme: e}),
    ea({rootSelector: c, selector: n, className: l}),
    ta({selector: n, classes: a, unstyled: i || y}),
    m && !y && ra({themeName: r, classNamesPrefix: o, selector: n, withStaticClass: t?.withStaticClass}),
    t?.className,
  );
}
function aa({theme: e, themeName: t, props: r, stylesCtx: n, selector: o}) {
  return t
    .map((s) => st({theme: e, styles: e.components[s]?.styles, props: r, stylesCtx: n})[o])
    .reduce((s, a) => ({...s, ...a}), {});
}
function Dt({style: e, theme: t}) {
  return Array.isArray(e)
    ? [...e].reduce((r, n) => ({...r, ...Dt({style: n, theme: t})}), {})
    : typeof e == 'function'
      ? e(t)
      : (e ?? {});
}
function ia(e) {
  return e.reduce(
    (t, r) => (
      r &&
        Object.keys(r).forEach((n) => {
          t[n] = {...t[n], ...lt(r[n])};
        }),
      t
    ),
    {},
  );
}
function la({vars: e, varsResolver: t, theme: r, props: n, stylesCtx: o, selector: s, themeName: a, headless: i}) {
  return ia([i ? {} : t?.(r, n, o), ...a.map((l) => r.components?.[l]?.vars?.(r, n, o)), e?.(r, n, o)])?.[s];
}
function ca({
  theme: e,
  themeName: t,
  selector: r,
  options: n,
  props: o,
  stylesCtx: s,
  rootSelector: a,
  styles: i,
  style: l,
  vars: c,
  varsResolver: d,
  headless: p,
  withStylesTransform: m,
}) {
  return {
    ...(!m && aa({theme: e, themeName: t, props: o, stylesCtx: s, selector: r})),
    ...(!m && st({theme: e, styles: i, props: o, stylesCtx: s})[r]),
    ...(!m && st({theme: e, styles: n?.styles, props: n?.props || o, stylesCtx: s})[r]),
    ...la({theme: e, props: o, stylesCtx: s, vars: c, varsResolver: d, selector: r, themeName: t, headless: p}),
    ...(a === r ? Dt({style: l, theme: e}) : null),
    ...Dt({style: n?.style, theme: e}),
  };
}
function ua({props: e, stylesCtx: t, themeName: r}) {
  const n = Re(),
    o = Fs()?.();
  return {
    getTransformedStyles: (a) =>
      o
        ? [
            ...a.map((l) => o(l, {props: e, theme: n, ctx: t})),
            ...r.map((l) => o(n.components[l]?.styles, {props: e, theme: n, ctx: t})),
          ].filter(Boolean)
        : [],
    withStylesTransform: !!o,
  };
}
function F({
  name: e,
  classes: t,
  props: r,
  stylesCtx: n,
  className: o,
  style: s,
  rootSelector: a = 'root',
  unstyled: i,
  classNames: l,
  styles: c,
  vars: d,
  varsResolver: p,
  attributes: m,
}) {
  const y = Re(),
    v = As(),
    b = Ls(),
    h = zs(),
    S = (Array.isArray(e) ? e : [e]).filter((E) => E),
    {withStylesTransform: g, getTransformedStyles: w} = ua({props: r, stylesCtx: n, themeName: S});
  return (E, R) => ({
    className: sa({
      theme: y,
      options: R,
      themeName: S,
      selector: E,
      classNamesPrefix: v,
      classNames: l,
      classes: t,
      unstyled: i,
      className: o,
      rootSelector: a,
      props: r,
      stylesCtx: n,
      withStaticClasses: b,
      headless: h,
      transformedStyles: w([R?.styles, c]),
    }),
    style: ca({
      theme: y,
      themeName: S,
      selector: E,
      options: R,
      props: r,
      stylesCtx: n,
      rootSelector: a,
      styles: c,
      style: s,
      vars: d,
      varsResolver: p,
      headless: h,
      withStylesTransform: g,
    }),
    ...m?.[E],
  });
}
function fn(e, t) {
  return typeof e == 'boolean' ? e : t.autoContrast;
}
function _(e, t, r) {
  const n = Re(),
    o = n.components[e]?.defaultProps,
    s = typeof o == 'function' ? o(n) : o;
  return {...t, ...s, ...lt(r)};
}
function At(e) {
  return Kt(e)
    .reduce((t, r) => (e[r] !== void 0 ? `${t}${ls(r)}:${e[r]};` : t), '')
    .trim();
}
function da({selector: e, styles: t, media: r, container: n}) {
  const o = t ? At(t) : '',
    s = Array.isArray(r) ? r.map((i) => `@media${i.query}{${e}{${At(i.styles)}}}`) : [],
    a = Array.isArray(n) ? n.map((i) => `@container ${i.query}{${e}{${At(i.styles)}}}`) : [];
  return `${o ? `${e}{${o}}` : ''}${s.join('')}${a.join('')}`.trim();
}
function pn(e) {
  const t = Ms();
  return f.jsx('style', {'data-mantine-styles': 'inline', nonce: t?.(), dangerouslySetInnerHTML: {__html: da(e)}});
}
function pt(e) {
  const {
    m: t,
    mx: r,
    my: n,
    mt: o,
    mb: s,
    ml: a,
    mr: i,
    me: l,
    ms: c,
    p: d,
    px: p,
    py: m,
    pt: y,
    pb: v,
    pl: b,
    pr: h,
    pe: S,
    ps: g,
    bd: w,
    bdrs: E,
    bg: R,
    c: x,
    opacity: C,
    ff: P,
    fz: N,
    fw: j,
    lts: $,
    ta: k,
    lh: M,
    fs: z,
    tt: B,
    td: W,
    w: H,
    miw: q,
    maw: U,
    h: Z,
    mih: Q,
    mah: ye,
    bgsz: ge,
    bgp: ae,
    bgr: be,
    bga: re,
    pos: T,
    top: A,
    left: Y,
    bottom: J,
    right: ue,
    inset: ve,
    display: ne,
    flex: Pe,
    hiddenFrom: go,
    visibleFrom: bo,
    lightHidden: vo,
    darkHidden: So,
    sx: xo,
    ...wo
  } = e;
  return {
    styleProps: lt({
      m: t,
      mx: r,
      my: n,
      mt: o,
      mb: s,
      ml: a,
      mr: i,
      me: l,
      ms: c,
      p: d,
      px: p,
      py: m,
      pt: y,
      pb: v,
      pl: b,
      pr: h,
      pe: S,
      ps: g,
      bd: w,
      bg: R,
      c: x,
      opacity: C,
      ff: P,
      fz: N,
      fw: j,
      lts: $,
      ta: k,
      lh: M,
      fs: z,
      tt: B,
      td: W,
      w: H,
      miw: q,
      maw: U,
      h: Z,
      mih: Q,
      mah: ye,
      bgsz: ge,
      bgp: ae,
      bgr: be,
      bga: re,
      pos: T,
      top: A,
      left: Y,
      bottom: J,
      right: ue,
      inset: ve,
      display: ne,
      flex: Pe,
      bdrs: E,
      hiddenFrom: go,
      visibleFrom: bo,
      lightHidden: vo,
      darkHidden: So,
      sx: xo,
    }),
    rest: wo,
  };
}
const fa = {
  m: {type: 'spacing', property: 'margin'},
  mt: {type: 'spacing', property: 'marginTop'},
  mb: {type: 'spacing', property: 'marginBottom'},
  ml: {type: 'spacing', property: 'marginLeft'},
  mr: {type: 'spacing', property: 'marginRight'},
  ms: {type: 'spacing', property: 'marginInlineStart'},
  me: {type: 'spacing', property: 'marginInlineEnd'},
  mx: {type: 'spacing', property: 'marginInline'},
  my: {type: 'spacing', property: 'marginBlock'},
  p: {type: 'spacing', property: 'padding'},
  pt: {type: 'spacing', property: 'paddingTop'},
  pb: {type: 'spacing', property: 'paddingBottom'},
  pl: {type: 'spacing', property: 'paddingLeft'},
  pr: {type: 'spacing', property: 'paddingRight'},
  ps: {type: 'spacing', property: 'paddingInlineStart'},
  pe: {type: 'spacing', property: 'paddingInlineEnd'},
  px: {type: 'spacing', property: 'paddingInline'},
  py: {type: 'spacing', property: 'paddingBlock'},
  bd: {type: 'border', property: 'border'},
  bdrs: {type: 'radius', property: 'borderRadius'},
  bg: {type: 'color', property: 'background'},
  c: {type: 'textColor', property: 'color'},
  opacity: {type: 'identity', property: 'opacity'},
  ff: {type: 'fontFamily', property: 'fontFamily'},
  fz: {type: 'fontSize', property: 'fontSize'},
  fw: {type: 'identity', property: 'fontWeight'},
  lts: {type: 'size', property: 'letterSpacing'},
  ta: {type: 'identity', property: 'textAlign'},
  lh: {type: 'lineHeight', property: 'lineHeight'},
  fs: {type: 'identity', property: 'fontStyle'},
  tt: {type: 'identity', property: 'textTransform'},
  td: {type: 'identity', property: 'textDecoration'},
  w: {type: 'spacing', property: 'width'},
  miw: {type: 'spacing', property: 'minWidth'},
  maw: {type: 'spacing', property: 'maxWidth'},
  h: {type: 'spacing', property: 'height'},
  mih: {type: 'spacing', property: 'minHeight'},
  mah: {type: 'spacing', property: 'maxHeight'},
  bgsz: {type: 'size', property: 'backgroundSize'},
  bgp: {type: 'identity', property: 'backgroundPosition'},
  bgr: {type: 'identity', property: 'backgroundRepeat'},
  bga: {type: 'identity', property: 'backgroundAttachment'},
  pos: {type: 'identity', property: 'position'},
  top: {type: 'size', property: 'top'},
  left: {type: 'size', property: 'left'},
  bottom: {type: 'size', property: 'bottom'},
  right: {type: 'size', property: 'right'},
  inset: {type: 'size', property: 'inset'},
  display: {type: 'identity', property: 'display'},
  flex: {type: 'identity', property: 'flex'},
};
function Qt(e, t) {
  const r = Me({color: e, theme: t});
  return r.color === 'dimmed'
    ? 'var(--mantine-color-dimmed)'
    : r.color === 'bright'
      ? 'var(--mantine-color-bright)'
      : r.variable
        ? `var(${r.variable})`
        : r.color;
}
function pa(e, t) {
  const r = Me({color: e, theme: t});
  return r.isThemeColor && r.shade === void 0 ? `var(--mantine-color-${r.color}-text)` : Qt(e, t);
}
function ma(e, t) {
  if (typeof e == 'number') return O(e);
  if (typeof e == 'string') {
    const [r, n, ...o] = e.split(' ').filter((a) => a.trim() !== '');
    let s = `${O(r)}`;
    return (n && (s += ` ${n}`), o.length > 0 && (s += ` ${Qt(o.join(' '), t)}`), s.trim());
  }
  return e;
}
const Pr = {
  text: 'var(--mantine-font-family)',
  mono: 'var(--mantine-font-family-monospace)',
  monospace: 'var(--mantine-font-family-monospace)',
  heading: 'var(--mantine-font-family-headings)',
  headings: 'var(--mantine-font-family-headings)',
};
function ya(e) {
  return typeof e == 'string' && e in Pr ? Pr[e] : e;
}
const ha = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
function ga(e, t) {
  return typeof e == 'string' && e in t.fontSizes
    ? `var(--mantine-font-size-${e})`
    : typeof e == 'string' && ha.includes(e)
      ? `var(--mantine-${e}-font-size)`
      : typeof e == 'number' || typeof e == 'string'
        ? O(e)
        : e;
}
function ba(e) {
  return e;
}
const va = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
function Sa(e, t) {
  return typeof e == 'string' && e in t.lineHeights
    ? `var(--mantine-line-height-${e})`
    : typeof e == 'string' && va.includes(e)
      ? `var(--mantine-${e}-line-height)`
      : e;
}
function xa(e, t) {
  return typeof e == 'string' && e in t.radius
    ? `var(--mantine-radius-${e})`
    : typeof e == 'number' || typeof e == 'string'
      ? O(e)
      : e;
}
function wa(e) {
  return typeof e == 'number' ? O(e) : e;
}
function Ca(e, t) {
  if (typeof e == 'number') return O(e);
  if (typeof e == 'string') {
    const r = e.replace('-', '');
    if (!(r in t.spacing)) return O(e);
    const n = `--mantine-spacing-${r}`;
    return e.startsWith('-') ? `calc(var(${n}) * -1)` : `var(${n})`;
  }
  return e;
}
const Mt = {
  color: Qt,
  textColor: pa,
  fontSize: ga,
  spacing: Ca,
  radius: xa,
  identity: ba,
  size: wa,
  lineHeight: Sa,
  fontFamily: ya,
  border: ma,
};
function Nr(e) {
  return e.replace('(min-width: ', '').replace('em)', '');
}
function Ea({media: e, ...t}) {
  const n = Object.keys(e)
    .sort((o, s) => Number(Nr(o)) - Number(Nr(s)))
    .map((o) => ({query: o, styles: e[o]}));
  return {...t, media: n};
}
function Ra(e) {
  if (typeof e != 'object' || e === null) return !1;
  const t = Object.keys(e);
  return !(t.length === 1 && t[0] === 'base');
}
function Pa(e) {
  return typeof e == 'object' && e !== null ? ('base' in e ? e.base : void 0) : e;
}
function Na(e) {
  return typeof e == 'object' && e !== null ? Kt(e).filter((t) => t !== 'base') : [];
}
function Ta(e, t) {
  return typeof e == 'object' && e !== null && t in e ? e[t] : e;
}
function mn({styleProps: e, data: t, theme: r}) {
  return Ea(
    Kt(e).reduce(
      (n, o) => {
        if (o === 'hiddenFrom' || o === 'visibleFrom' || o === 'sx') return n;
        const s = t[o],
          a = Array.isArray(s.property) ? s.property : [s.property],
          i = Pa(e[o]);
        if (!Ra(e[o]))
          return (
            a.forEach((c) => {
              n.inlineStyles[c] = Mt[s.type](i, r);
            }),
            n
          );
        n.hasResponsiveStyles = !0;
        const l = Na(e[o]);
        return (
          a.forEach((c) => {
            (i != null && (n.styles[c] = Mt[s.type](i, r)),
              l.forEach((d) => {
                const p = `(min-width: ${r.breakpoints[d]})`;
                n.media[p] = {...n.media[p], [c]: Mt[s.type](Ta(e[o], d), r)};
              }));
          }),
          n
        );
      },
      {hasResponsiveStyles: !1, styles: {}, inlineStyles: {}, media: {}},
    ),
  );
}
function yn() {
  return `__m__-${u.useId().replace(/[:«»]/g, '')}`;
}
function hn(e) {
  return e.startsWith('data-') ? e : `data-${e}`;
}
function ja(e) {
  return Object.keys(e).reduce((t, r) => {
    const n = e[r];
    return (n === void 0 || n === '' || n === !1 || n === null || (t[hn(r)] = e[r]), t);
  }, {});
}
function gn(e) {
  return e
    ? typeof e == 'string'
      ? {[hn(e)]: !0}
      : Array.isArray(e)
        ? [...e].reduce((t, r) => ({...t, ...gn(r)}), {})
        : ja(e)
    : null;
}
function Vt(e, t) {
  return Array.isArray(e)
    ? [...e].reduce((r, n) => ({...r, ...Vt(n, t)}), {})
    : typeof e == 'function'
      ? e(t)
      : (e ?? {});
}
function _a({theme: e, style: t, vars: r, styleProps: n}) {
  const o = Vt(t, e),
    s = Vt(r, e);
  return {...o, ...s, ...n};
}
const bn = u.forwardRef(
  (
    {
      component: e,
      style: t,
      __vars: r,
      className: n,
      variant: o,
      mod: s,
      size: a,
      hiddenFrom: i,
      visibleFrom: l,
      lightHidden: c,
      darkHidden: d,
      renderRoot: p,
      __size: m,
      ...y
    },
    v,
  ) => {
    const b = Re(),
      h = e || 'div',
      {styleProps: S, rest: g} = pt(y),
      E = Os()?.()?.(S.sx),
      R = yn(),
      x = mn({styleProps: S, theme: b, data: fa}),
      C = {
        ref: v,
        style: _a({theme: b, style: t, vars: r, styleProps: x.inlineStyles}),
        className: te(n, E, {
          [R]: x.hasResponsiveStyles,
          'mantine-light-hidden': c,
          'mantine-dark-hidden': d,
          [`mantine-hidden-from-${i}`]: i,
          [`mantine-visible-from-${l}`]: l,
        }),
        'data-variant': o,
        'data-size': en(a) ? void 0 : a || void 0,
        size: m,
        ...gn(s),
        ...g,
      };
    return f.jsxs(f.Fragment, {
      children: [
        x.hasResponsiveStyles && f.jsx(pn, {selector: `.${R}`, styles: x.styles, media: x.media}),
        typeof p == 'function' ? p(C) : f.jsx(h, {...C}),
      ],
    });
  },
);
bn.displayName = '@mantine/core/Box';
const I = bn;
function vn(e) {
  return e;
}
function L(e) {
  const t = u.forwardRef(e);
  return (
    (t.extend = vn),
    (t.withProps = (r) => {
      const n = u.forwardRef((o, s) => f.jsx(t, {...r, ...o, ref: s}));
      return ((n.extend = t.extend), (n.displayName = `WithProps(${t.displayName})`), n);
    }),
    t
  );
}
function fe(e) {
  const t = u.forwardRef(e);
  return (
    (t.withProps = (r) => {
      const n = u.forwardRef((o, s) => f.jsx(t, {...r, ...o, ref: s}));
      return ((n.extend = t.extend), (n.displayName = `WithProps(${t.displayName})`), n);
    }),
    (t.extend = vn),
    t
  );
}
const Ia = u.createContext({dir: 'ltr', toggleDirection: () => {}, setDirection: () => {}});
function Sn() {
  return u.useContext(Ia);
}
function xn(e) {
  const t = u.useRef(void 0),
    r = u.useCallback((n) => {
      const o = e.map((s) => {
        if (s != null) {
          if (typeof s == 'function') {
            const a = s,
              i = a(n);
            return typeof i == 'function'
              ? i
              : () => {
                  a(null);
                };
          }
          return (
            (s.current = n),
            () => {
              s.current = null;
            }
          );
        }
      });
      return () => {
        o.forEach((s) => s?.());
      };
    }, e);
  return u.useMemo(
    () =>
      e.every((n) => n == null)
        ? null
        : (n) => {
            (t.current && (t.current(), (t.current = void 0)), n != null && (t.current = r(n)));
          },
    e,
  );
}
var Jt = {
  root: 'm_d57069b5',
  content: 'm_b1336c6',
  viewport: 'm_c0783ff9',
  viewportInner: 'm_f8f631dd',
  scrollbar: 'm_c44ba933',
  thumb: 'm_d8b5e363',
  corner: 'm_21657268',
};
const [ka, oe] = ct('ScrollArea.Root component was not found in tree');
function Ie(e, t) {
  const r = Se(t);
  Zt(() => {
    let n = 0;
    if (e) {
      const o = new ResizeObserver(() => {
        (cancelAnimationFrame(n), (n = window.requestAnimationFrame(r)));
      });
      return (
        o.observe(e),
        () => {
          (window.cancelAnimationFrame(n), o.unobserve(e));
        }
      );
    }
  }, [e, r]);
}
const $a = u.forwardRef((e, t) => {
    const {style: r, ...n} = e,
      o = oe(),
      [s, a] = u.useState(0),
      [i, l] = u.useState(0),
      c = !!(s && i);
    return (
      Ie(o.scrollbarX, () => {
        const d = o.scrollbarX?.offsetHeight || 0;
        (o.onCornerHeightChange(d), l(d));
      }),
      Ie(o.scrollbarY, () => {
        const d = o.scrollbarY?.offsetWidth || 0;
        (o.onCornerWidthChange(d), a(d));
      }),
      c ? f.jsx('div', {...n, ref: t, style: {...r, width: s, height: i}}) : null
    );
  }),
  Aa = u.forwardRef((e, t) => {
    const r = oe(),
      n = !!(r.scrollbarX && r.scrollbarY);
    return r.type !== 'scroll' && n ? f.jsx($a, {...e, ref: t}) : null;
  }),
  Ma = {scrollHideDelay: 1e3, type: 'hover'},
  wn = u.forwardRef((e, t) => {
    const {type: r, scrollHideDelay: n, scrollbars: o, getStyles: s, ...a} = _('ScrollAreaRoot', Ma, e),
      [i, l] = u.useState(null),
      [c, d] = u.useState(null),
      [p, m] = u.useState(null),
      [y, v] = u.useState(null),
      [b, h] = u.useState(null),
      [S, g] = u.useState(0),
      [w, E] = u.useState(0),
      [R, x] = u.useState(!1),
      [C, P] = u.useState(!1),
      N = Ce(t, (j) => l(j));
    return f.jsx(ka, {
      value: {
        type: r,
        scrollHideDelay: n,
        scrollArea: i,
        viewport: c,
        onViewportChange: d,
        content: p,
        onContentChange: m,
        scrollbarX: y,
        onScrollbarXChange: v,
        scrollbarXEnabled: R,
        onScrollbarXEnabledChange: x,
        scrollbarY: b,
        onScrollbarYChange: h,
        scrollbarYEnabled: C,
        onScrollbarYEnabledChange: P,
        onCornerWidthChange: g,
        onCornerHeightChange: E,
        getStyles: s,
      },
      children: f.jsx(I, {
        ...a,
        ref: N,
        __vars: {
          '--sa-corner-width': o !== 'xy' ? '0px' : `${S}px`,
          '--sa-corner-height': o !== 'xy' ? '0px' : `${w}px`,
        },
      }),
    });
  });
wn.displayName = '@mantine/core/ScrollAreaRoot';
function Cn(e, t) {
  const r = e / t;
  return Number.isNaN(r) ? 0 : r;
}
function mt(e) {
  const t = Cn(e.viewport, e.content),
    r = e.scrollbar.paddingStart + e.scrollbar.paddingEnd,
    n = (e.scrollbar.size - r) * t;
  return Math.max(n, 18);
}
function En(e, t) {
  return (r) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const n = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + n * (r - e[0]);
  };
}
function La(e, [t, r]) {
  return Math.min(r, Math.max(t, e));
}
function Tr(e, t, r = 'ltr') {
  const n = mt(t),
    o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd,
    s = t.scrollbar.size - o,
    a = t.content - t.viewport,
    i = s - n,
    l = r === 'ltr' ? [0, a] : [a * -1, 0],
    c = La(e, l);
  return En([0, a], [0, i])(c);
}
function za(e, t, r, n = 'ltr') {
  const o = mt(r),
    s = o / 2,
    a = t || s,
    i = o - a,
    l = r.scrollbar.paddingStart + a,
    c = r.scrollbar.size - r.scrollbar.paddingEnd - i,
    d = r.content - r.viewport,
    p = n === 'ltr' ? [0, d] : [d * -1, 0];
  return En([l, c], p)(e);
}
function Rn(e, t) {
  return e > 0 && e < t;
}
function at(e) {
  return e ? parseInt(e, 10) : 0;
}
function xe(e, t, {checkForDefaultPrevented: r = !0} = {}) {
  return (n) => {
    (e?.(n), (r === !1 || !n.defaultPrevented) && t?.(n));
  };
}
const [Oa, Pn] = ct('ScrollAreaScrollbar was not found in tree'),
  Nn = u.forwardRef((e, t) => {
    const {
        sizes: r,
        hasThumb: n,
        onThumbChange: o,
        onThumbPointerUp: s,
        onThumbPointerDown: a,
        onThumbPositionChange: i,
        onDragScroll: l,
        onWheelScroll: c,
        onResize: d,
        ...p
      } = e,
      m = oe(),
      [y, v] = u.useState(null),
      b = Ce(t, (P) => v(P)),
      h = u.useRef(null),
      S = u.useRef(''),
      {viewport: g} = m,
      w = r.content - r.viewport,
      E = Se(c),
      R = Se(i),
      x = dt(d, 10),
      C = (P) => {
        if (h.current) {
          const N = P.clientX - h.current.left,
            j = P.clientY - h.current.top;
          l({x: N, y: j});
        }
      };
    return (
      u.useEffect(() => {
        const P = (N) => {
          const j = N.target;
          y?.contains(j) && E(N, w);
        };
        return (
          document.addEventListener('wheel', P, {passive: !1}),
          () => document.removeEventListener('wheel', P, {passive: !1})
        );
      }, [g, y, w, E]),
      u.useEffect(R, [r, R]),
      Ie(y, x),
      Ie(m.content, x),
      f.jsx(Oa, {
        value: {
          scrollbar: y,
          hasThumb: n,
          onThumbChange: Se(o),
          onThumbPointerUp: Se(s),
          onThumbPositionChange: R,
          onThumbPointerDown: Se(a),
        },
        children: f.jsx('div', {
          ...p,
          ref: b,
          'data-mantine-scrollbar': !0,
          style: {position: 'absolute', ...p.style},
          onPointerDown: xe(e.onPointerDown, (P) => {
            (P.preventDefault(),
              P.button === 0 &&
                (P.target.setPointerCapture(P.pointerId),
                (h.current = y.getBoundingClientRect()),
                (S.current = document.body.style.webkitUserSelect),
                (document.body.style.webkitUserSelect = 'none'),
                C(P)));
          }),
          onPointerMove: xe(e.onPointerMove, C),
          onPointerUp: xe(e.onPointerUp, (P) => {
            const N = P.target;
            N.hasPointerCapture(P.pointerId) && (P.preventDefault(), N.releasePointerCapture(P.pointerId));
          }),
          onLostPointerCapture: () => {
            ((document.body.style.webkitUserSelect = S.current), (h.current = null));
          },
        }),
      })
    );
  }),
  Tn = u.forwardRef((e, t) => {
    const {sizes: r, onSizesChange: n, style: o, ...s} = e,
      a = oe(),
      [i, l] = u.useState(),
      c = u.useRef(null),
      d = Ce(t, c, a.onScrollbarXChange);
    return (
      u.useEffect(() => {
        c.current && l(getComputedStyle(c.current));
      }, [c]),
      f.jsx(Nn, {
        'data-orientation': 'horizontal',
        ...s,
        ref: d,
        sizes: r,
        style: {...o, '--sa-thumb-width': `${mt(r)}px`},
        onThumbPointerDown: (p) => e.onThumbPointerDown(p.x),
        onDragScroll: (p) => e.onDragScroll(p.x),
        onWheelScroll: (p, m) => {
          if (a.viewport) {
            const y = a.viewport.scrollLeft + p.deltaX;
            (e.onWheelScroll(y), Rn(y, m) && p.preventDefault());
          }
        },
        onResize: () => {
          c.current &&
            a.viewport &&
            i &&
            n({
              content: a.viewport.scrollWidth,
              viewport: a.viewport.offsetWidth,
              scrollbar: {size: c.current.clientWidth, paddingStart: at(i.paddingLeft), paddingEnd: at(i.paddingRight)},
            });
        },
      })
    );
  });
Tn.displayName = '@mantine/core/ScrollAreaScrollbarX';
const jn = u.forwardRef((e, t) => {
  const {sizes: r, onSizesChange: n, style: o, ...s} = e,
    a = oe(),
    [i, l] = u.useState(),
    c = u.useRef(null),
    d = Ce(t, c, a.onScrollbarYChange);
  return (
    u.useEffect(() => {
      c.current && l(window.getComputedStyle(c.current));
    }, []),
    f.jsx(Nn, {
      ...s,
      'data-orientation': 'vertical',
      ref: d,
      sizes: r,
      style: {'--sa-thumb-height': `${mt(r)}px`, ...o},
      onThumbPointerDown: (p) => e.onThumbPointerDown(p.y),
      onDragScroll: (p) => e.onDragScroll(p.y),
      onWheelScroll: (p, m) => {
        if (a.viewport) {
          const y = a.viewport.scrollTop + p.deltaY;
          (e.onWheelScroll(y), Rn(y, m) && p.preventDefault());
        }
      },
      onResize: () => {
        c.current &&
          a.viewport &&
          i &&
          n({
            content: a.viewport.scrollHeight,
            viewport: a.viewport.offsetHeight,
            scrollbar: {size: c.current.clientHeight, paddingStart: at(i.paddingTop), paddingEnd: at(i.paddingBottom)},
          });
      },
    })
  );
});
jn.displayName = '@mantine/core/ScrollAreaScrollbarY';
const yt = u.forwardRef((e, t) => {
  const {orientation: r = 'vertical', ...n} = e,
    {dir: o} = Sn(),
    s = oe(),
    a = u.useRef(null),
    i = u.useRef(0),
    [l, c] = u.useState({content: 0, viewport: 0, scrollbar: {size: 0, paddingStart: 0, paddingEnd: 0}}),
    d = Cn(l.viewport, l.content),
    p = {
      ...n,
      sizes: l,
      onSizesChange: c,
      hasThumb: d > 0 && d < 1,
      onThumbChange: (y) => {
        a.current = y;
      },
      onThumbPointerUp: () => {
        i.current = 0;
      },
      onThumbPointerDown: (y) => {
        i.current = y;
      },
    },
    m = (y, v) => za(y, i.current, l, v);
  return r === 'horizontal'
    ? f.jsx(Tn, {
        ...p,
        ref: t,
        onThumbPositionChange: () => {
          if (s.viewport && a.current) {
            const y = s.viewport.scrollLeft,
              v = Tr(y, l, o);
            a.current.style.transform = `translate3d(${v}px, 0, 0)`;
          }
        },
        onWheelScroll: (y) => {
          s.viewport && (s.viewport.scrollLeft = y);
        },
        onDragScroll: (y) => {
          s.viewport && (s.viewport.scrollLeft = m(y, o));
        },
      })
    : r === 'vertical'
      ? f.jsx(jn, {
          ...p,
          ref: t,
          onThumbPositionChange: () => {
            if (s.viewport && a.current) {
              const y = s.viewport.scrollTop,
                v = Tr(y, l);
              (l.scrollbar.size === 0
                ? a.current.style.setProperty('--thumb-opacity', '0')
                : a.current.style.setProperty('--thumb-opacity', '1'),
                (a.current.style.transform = `translate3d(0, ${v}px, 0)`));
            }
          },
          onWheelScroll: (y) => {
            s.viewport && (s.viewport.scrollTop = y);
          },
          onDragScroll: (y) => {
            s.viewport && (s.viewport.scrollTop = m(y));
          },
        })
      : null;
});
yt.displayName = '@mantine/core/ScrollAreaScrollbarVisible';
const er = u.forwardRef((e, t) => {
  const r = oe(),
    {forceMount: n, ...o} = e,
    [s, a] = u.useState(!1),
    i = e.orientation === 'horizontal',
    l = dt(() => {
      if (r.viewport) {
        const c = r.viewport.offsetWidth < r.viewport.scrollWidth,
          d = r.viewport.offsetHeight < r.viewport.scrollHeight;
        a(i ? c : d);
      }
    }, 10);
  return (
    Ie(r.viewport, l),
    Ie(r.content, l),
    n || s ? f.jsx(yt, {'data-state': s ? 'visible' : 'hidden', ...o, ref: t}) : null
  );
});
er.displayName = '@mantine/core/ScrollAreaScrollbarAuto';
const _n = u.forwardRef((e, t) => {
  const {forceMount: r, ...n} = e,
    o = oe(),
    [s, a] = u.useState(!1);
  return (
    u.useEffect(() => {
      const {scrollArea: i} = o;
      let l = 0;
      if (i) {
        const c = () => {
            (window.clearTimeout(l), a(!0));
          },
          d = () => {
            l = window.setTimeout(() => a(!1), o.scrollHideDelay);
          };
        return (
          i.addEventListener('pointerenter', c),
          i.addEventListener('pointerleave', d),
          () => {
            (window.clearTimeout(l),
              i.removeEventListener('pointerenter', c),
              i.removeEventListener('pointerleave', d));
          }
        );
      }
    }, [o.scrollArea, o.scrollHideDelay]),
    r || s ? f.jsx(er, {'data-state': s ? 'visible' : 'hidden', ...n, ref: t}) : null
  );
});
_n.displayName = '@mantine/core/ScrollAreaScrollbarHover';
const Fa = u.forwardRef((e, t) => {
    const {forceMount: r, ...n} = e,
      o = oe(),
      s = e.orientation === 'horizontal',
      [a, i] = u.useState('hidden'),
      l = dt(() => i('idle'), 100);
    return (
      u.useEffect(() => {
        if (a === 'idle') {
          const c = window.setTimeout(() => i('hidden'), o.scrollHideDelay);
          return () => window.clearTimeout(c);
        }
      }, [a, o.scrollHideDelay]),
      u.useEffect(() => {
        const {viewport: c} = o,
          d = s ? 'scrollLeft' : 'scrollTop';
        if (c) {
          let p = c[d];
          const m = () => {
            const y = c[d];
            (p !== y && (i('scrolling'), l()), (p = y));
          };
          return (c.addEventListener('scroll', m), () => c.removeEventListener('scroll', m));
        }
      }, [o.viewport, s, l]),
      r || a !== 'hidden'
        ? f.jsx(yt, {
            'data-state': a === 'hidden' ? 'hidden' : 'visible',
            ...n,
            ref: t,
            onPointerEnter: xe(e.onPointerEnter, () => i('interacting')),
            onPointerLeave: xe(e.onPointerLeave, () => i('idle')),
          })
        : null
    );
  }),
  Wt = u.forwardRef((e, t) => {
    const {forceMount: r, ...n} = e,
      o = oe(),
      {onScrollbarXEnabledChange: s, onScrollbarYEnabledChange: a} = o,
      i = e.orientation === 'horizontal';
    return (
      u.useEffect(
        () => (
          i ? s(!0) : a(!0),
          () => {
            i ? s(!1) : a(!1);
          }
        ),
        [i, s, a],
      ),
      o.type === 'hover'
        ? f.jsx(_n, {...n, ref: t, forceMount: r})
        : o.type === 'scroll'
          ? f.jsx(Fa, {...n, ref: t, forceMount: r})
          : o.type === 'auto'
            ? f.jsx(er, {...n, ref: t, forceMount: r})
            : o.type === 'always'
              ? f.jsx(yt, {...n, ref: t})
              : null
    );
  });
Wt.displayName = '@mantine/core/ScrollAreaScrollbar';
function Ba(e, t = () => {}) {
  let r = {left: e.scrollLeft, top: e.scrollTop},
    n = 0;
  return (
    (function o() {
      const s = {left: e.scrollLeft, top: e.scrollTop},
        a = r.left !== s.left,
        i = r.top !== s.top;
      ((a || i) && t(), (r = s), (n = window.requestAnimationFrame(o)));
    })(),
    () => window.cancelAnimationFrame(n)
  );
}
const In = u.forwardRef((e, t) => {
  const {style: r, ...n} = e,
    o = oe(),
    s = Pn(),
    {onThumbPositionChange: a} = s,
    i = Ce(t, (d) => s.onThumbChange(d)),
    l = u.useRef(void 0),
    c = dt(() => {
      l.current && (l.current(), (l.current = void 0));
    }, 100);
  return (
    u.useEffect(() => {
      const {viewport: d} = o;
      if (d) {
        const p = () => {
          if ((c(), !l.current)) {
            const m = Ba(d, a);
            ((l.current = m), a());
          }
        };
        return (a(), d.addEventListener('scroll', p), () => d.removeEventListener('scroll', p));
      }
    }, [o.viewport, c, a]),
    f.jsx('div', {
      'data-state': s.hasThumb ? 'visible' : 'hidden',
      ...n,
      ref: i,
      style: {width: 'var(--sa-thumb-width)', height: 'var(--sa-thumb-height)', ...r},
      onPointerDownCapture: xe(e.onPointerDownCapture, (d) => {
        const m = d.target.getBoundingClientRect(),
          y = d.clientX - m.left,
          v = d.clientY - m.top;
        s.onThumbPointerDown({x: y, y: v});
      }),
      onPointerUp: xe(e.onPointerUp, s.onThumbPointerUp),
    })
  );
});
In.displayName = '@mantine/core/ScrollAreaThumb';
const Ht = u.forwardRef((e, t) => {
  const {forceMount: r, ...n} = e,
    o = Pn();
  return r || o.hasThumb ? f.jsx(In, {ref: t, ...n}) : null;
});
Ht.displayName = '@mantine/core/ScrollAreaThumb';
const kn = u.forwardRef(({children: e, style: t, onWheel: r, ...n}, o) => {
  const s = oe(),
    a = Ce(o, s.onViewportChange),
    i = (l) => {
      if ((r?.(l), s.scrollbarXEnabled && s.viewport && l.shiftKey)) {
        const {scrollTop: c, scrollHeight: d, clientHeight: p, scrollWidth: m, clientWidth: y} = s.viewport,
          v = c < 1,
          b = c >= d - p - 1;
        m > y && (v || b) && l.stopPropagation();
      }
    };
  return f.jsx(I, {
    ...n,
    ref: a,
    onWheel: i,
    style: {
      overflowX: s.scrollbarXEnabled ? 'scroll' : 'hidden',
      overflowY: s.scrollbarYEnabled ? 'scroll' : 'hidden',
      ...t,
    },
    children: f.jsx('div', {...s.getStyles('content'), ref: s.onContentChange, children: e}),
  });
});
kn.displayName = '@mantine/core/ScrollAreaViewport';
const $n = {scrollHideDelay: 1e3, type: 'hover', scrollbars: 'xy'},
  Da = (e, {scrollbarSize: t, overscrollBehavior: r, scrollbars: n}) => {
    let o = r;
    return (
      r && n && (n === 'x' ? (o = `${r} auto`) : n === 'y' && (o = `auto ${r}`)),
      {root: {'--scrollarea-scrollbar-size': O(t), '--scrollarea-over-scroll-behavior': o}}
    );
  },
  He = L((e, t) => {
    const r = _('ScrollArea', $n, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        scrollbarSize: l,
        vars: c,
        type: d,
        scrollHideDelay: p,
        viewportProps: m,
        viewportRef: y,
        onScrollPositionChange: v,
        children: b,
        offsetScrollbars: h,
        scrollbars: S,
        onBottomReached: g,
        onTopReached: w,
        overscrollBehavior: E,
        attributes: R,
        ...x
      } = r,
      [C, P] = u.useState(!1),
      [N, j] = u.useState(!1),
      [$, k] = u.useState(!1),
      M = F({
        name: 'ScrollArea',
        props: r,
        classes: Jt,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: R,
        vars: c,
        varsResolver: Da,
      }),
      z = u.useRef(null),
      B = xn([y, z]);
    return (
      u.useEffect(() => {
        if (!z.current || h !== 'present') return;
        const W = z.current,
          H = new ResizeObserver(() => {
            const {scrollHeight: q, clientHeight: U, scrollWidth: Z, clientWidth: Q} = W;
            (j(q > U), k(Z > Q));
          });
        return (H.observe(W), () => H.disconnect());
      }, [z, h]),
      f.jsxs(wn, {
        getStyles: M,
        type: d === 'never' ? 'always' : d,
        scrollHideDelay: p,
        ref: t,
        scrollbars: S,
        ...M('root'),
        ...x,
        children: [
          f.jsx(kn, {
            ...m,
            ...M('viewport', {style: m?.style}),
            ref: B,
            'data-offset-scrollbars': h === !0 ? 'xy' : h || void 0,
            'data-scrollbars': S || void 0,
            'data-horizontal-hidden': h === 'present' && !$ ? 'true' : void 0,
            'data-vertical-hidden': h === 'present' && !N ? 'true' : void 0,
            onScroll: (W) => {
              (m?.onScroll?.(W), v?.({x: W.currentTarget.scrollLeft, y: W.currentTarget.scrollTop}));
              const {scrollTop: H, scrollHeight: q, clientHeight: U} = W.currentTarget;
              (H - (q - U) >= -0.8 && g?.(), H === 0 && w?.());
            },
            children: b,
          }),
          (S === 'xy' || S === 'x') &&
            f.jsx(Wt, {
              ...M('scrollbar'),
              orientation: 'horizontal',
              'data-hidden': d === 'never' || (h === 'present' && !$) ? !0 : void 0,
              forceMount: !0,
              onMouseEnter: () => P(!0),
              onMouseLeave: () => P(!1),
              children: f.jsx(Ht, {...M('thumb')}),
            }),
          (S === 'xy' || S === 'y') &&
            f.jsx(Wt, {
              ...M('scrollbar'),
              orientation: 'vertical',
              'data-hidden': d === 'never' || (h === 'present' && !N) ? !0 : void 0,
              forceMount: !0,
              onMouseEnter: () => P(!0),
              onMouseLeave: () => P(!1),
              children: f.jsx(Ht, {...M('thumb')}),
            }),
          f.jsx(Aa, {...M('corner'), 'data-hovered': C || void 0, 'data-hidden': d === 'never' || void 0}),
        ],
      })
    );
  });
He.displayName = '@mantine/core/ScrollArea';
const tr = L((e, t) => {
  const {
      children: r,
      classNames: n,
      styles: o,
      scrollbarSize: s,
      scrollHideDelay: a,
      type: i,
      dir: l,
      offsetScrollbars: c,
      overscrollBehavior: d,
      viewportRef: p,
      onScrollPositionChange: m,
      unstyled: y,
      variant: v,
      viewportProps: b,
      scrollbars: h,
      style: S,
      vars: g,
      onBottomReached: w,
      onTopReached: E,
      onOverflowChange: R,
      ...x
    } = _('ScrollAreaAutosize', $n, e),
    C = u.useRef(null),
    P = xn([p, C]),
    [N, j] = u.useState(!1),
    $ = u.useRef(!1);
  return (
    u.useEffect(() => {
      if (!R) return;
      const k = C.current;
      if (!k) return;
      const M = () => {
        const B = k.scrollHeight > k.clientHeight;
        B !== N && ($.current ? R?.(B) : (($.current = !0), B && R?.(!0)), j(B));
      };
      M();
      const z = new ResizeObserver(M);
      return (z.observe(k), () => z.disconnect());
    }, [R, N]),
    f.jsx(I, {
      ...x,
      ref: t,
      style: [{display: 'flex', overflow: 'hidden'}, S],
      children: f.jsx(I, {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
          ...(h === 'y' && {minWidth: 0}),
          ...(h === 'x' && {minHeight: 0}),
          ...(h === 'xy' && {minWidth: 0, minHeight: 0}),
          ...(h === !1 && {minWidth: 0, minHeight: 0}),
        },
        children: f.jsx(He, {
          classNames: n,
          styles: o,
          scrollHideDelay: a,
          scrollbarSize: s,
          type: i,
          dir: l,
          offsetScrollbars: c,
          overscrollBehavior: d,
          viewportRef: P,
          onScrollPositionChange: m,
          unstyled: y,
          variant: v,
          viewportProps: b,
          vars: g,
          scrollbars: h,
          onBottomReached: w,
          onTopReached: E,
          'data-autosize': 'true',
          children: r,
        }),
      }),
    })
  );
});
He.classes = Jt;
tr.displayName = '@mantine/core/ScrollAreaAutosize';
tr.classes = Jt;
He.Autosize = tr;
var An = {root: 'm_87cf2631'};
const Va = {__staticSelector: 'UnstyledButton'},
  Ye = fe((e, t) => {
    const r = _('UnstyledButton', Va, e),
      {
        className: n,
        component: o = 'button',
        __staticSelector: s,
        unstyled: a,
        classNames: i,
        styles: l,
        style: c,
        attributes: d,
        ...p
      } = r,
      m = F({
        name: s,
        props: r,
        classes: An,
        className: n,
        style: c,
        classNames: i,
        styles: l,
        unstyled: a,
        attributes: d,
      });
    return f.jsx(I, {
      ...m('root', {focusable: !0}),
      component: o,
      ref: t,
      type: o === 'button' ? 'button' : void 0,
      ...p,
    });
  });
Ye.classes = An;
Ye.displayName = '@mantine/core/UnstyledButton';
var Mn = {root: 'm_515a97f8'};
const rr = L((e, t) => {
  const r = _('VisuallyHidden', null, e),
    {classNames: n, className: o, style: s, styles: a, unstyled: i, vars: l, attributes: c, ...d} = r,
    p = F({
      name: 'VisuallyHidden',
      classes: Mn,
      props: r,
      className: o,
      style: s,
      classNames: n,
      styles: a,
      unstyled: i,
      attributes: c,
    });
  return f.jsx(I, {component: 'span', ref: t, ...p('root'), ...d});
});
rr.classes = Mn;
rr.displayName = '@mantine/core/VisuallyHidden';
var Ln = {root: 'm_1b7284a3'};
const Wa = (e, {radius: t, shadow: r}) => ({
    root: {'--paper-radius': t === void 0 ? void 0 : le(t), '--paper-shadow': tn(r)},
  }),
  nr = fe((e, t) => {
    const r = _('Paper', null, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        withBorder: l,
        vars: c,
        radius: d,
        shadow: p,
        variant: m,
        mod: y,
        attributes: v,
        ...b
      } = r,
      h = F({
        name: 'Paper',
        props: r,
        classes: Ln,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: v,
        vars: c,
        varsResolver: Wa,
      });
    return f.jsx(I, {ref: t, mod: [{'data-with-border': l}, y], ...h('root'), variant: m, ...b});
  });
nr.classes = Ln;
nr.displayName = '@mantine/core/Paper';
var zn = {root: 'm_9814e45f'};
const Ha = {zIndex: Ae('modal')},
  Ya = (e, {gradient: t, color: r, backgroundOpacity: n, blur: o, radius: s, zIndex: a}) => ({
    root: {
      '--overlay-bg': t || ((r !== void 0 || n !== void 0) && qs(r || '#000', n ?? 0.6)) || void 0,
      '--overlay-filter': o ? `blur(${O(o)})` : void 0,
      '--overlay-radius': s === void 0 ? void 0 : le(s),
      '--overlay-z-index': a?.toString(),
    },
  }),
  or = fe((e, t) => {
    const r = _('Overlay', Ha, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        vars: l,
        fixed: c,
        center: d,
        children: p,
        radius: m,
        zIndex: y,
        gradient: v,
        blur: b,
        color: h,
        backgroundOpacity: S,
        mod: g,
        attributes: w,
        ...E
      } = r,
      R = F({
        name: 'Overlay',
        props: r,
        classes: zn,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: w,
        vars: l,
        varsResolver: Ya,
      });
    return f.jsx(I, {ref: t, ...R('root'), mod: [{center: d, fixed: c}, g], ...E, children: p});
  });
or.classes = zn;
or.displayName = '@mantine/core/Overlay';
function Lt(e) {
  const t = document.createElement('div');
  return (
    t.setAttribute('data-portal', 'true'),
    typeof e.className == 'string' && t.classList.add(...e.className.split(' ').filter(Boolean)),
    typeof e.style == 'object' && Object.assign(t.style, e.style),
    typeof e.id == 'string' && t.setAttribute('id', e.id),
    t
  );
}
function Ga({target: e, reuseTargetNode: t, ...r}) {
  if (e) return typeof e == 'string' ? document.querySelector(e) || Lt(r) : e;
  if (t) {
    const n = document.querySelector('[data-mantine-shared-portal-node]');
    if (n) return n;
    const o = Lt(r);
    return (o.setAttribute('data-mantine-shared-portal-node', 'true'), document.body.appendChild(o), o);
  }
  return Lt(r);
}
const Xa = {reuseTargetNode: !0},
  On = L((e, t) => {
    const {children: r, target: n, reuseTargetNode: o, ...s} = _('Portal', Xa, e),
      [a, i] = u.useState(!1),
      l = u.useRef(null);
    return (
      Zt(
        () => (
          i(!0),
          (l.current = Ga({target: n, reuseTargetNode: o, ...s})),
          Bt(t, l.current),
          !n && !o && l.current && document.body.appendChild(l.current),
          () => {
            !n && !o && l.current && document.body.removeChild(l.current);
          }
        ),
        [n],
      ),
      !a || !l.current ? null : Eo.createPortal(f.jsx(f.Fragment, {children: r}), l.current)
    );
  });
On.displayName = '@mantine/core/Portal';
const Fn = L(({withinPortal: e = !0, children: t, ...r}, n) =>
  cn() === 'test' || !e ? f.jsx(f.Fragment, {children: t}) : f.jsx(On, {ref: n, ...r, children: t}),
);
Fn.displayName = '@mantine/core/OptionalPortal';
const Be = (e) => ({
    in: {opacity: 1, transform: 'scale(1)'},
    out: {opacity: 0, transform: `scale(.9) translateY(${e === 'bottom' ? 10 : -10}px)`},
    transitionProperty: 'transform, opacity',
  }),
  Ze = {
    fade: {in: {opacity: 1}, out: {opacity: 0}, transitionProperty: 'opacity'},
    'fade-up': {
      in: {opacity: 1, transform: 'translateY(0)'},
      out: {opacity: 0, transform: 'translateY(30px)'},
      transitionProperty: 'opacity, transform',
    },
    'fade-down': {
      in: {opacity: 1, transform: 'translateY(0)'},
      out: {opacity: 0, transform: 'translateY(-30px)'},
      transitionProperty: 'opacity, transform',
    },
    'fade-left': {
      in: {opacity: 1, transform: 'translateX(0)'},
      out: {opacity: 0, transform: 'translateX(30px)'},
      transitionProperty: 'opacity, transform',
    },
    'fade-right': {
      in: {opacity: 1, transform: 'translateX(0)'},
      out: {opacity: 0, transform: 'translateX(-30px)'},
      transitionProperty: 'opacity, transform',
    },
    scale: {
      in: {opacity: 1, transform: 'scale(1)'},
      out: {opacity: 0, transform: 'scale(0)'},
      common: {transformOrigin: 'top'},
      transitionProperty: 'transform, opacity',
    },
    'scale-y': {
      in: {opacity: 1, transform: 'scaleY(1)'},
      out: {opacity: 0, transform: 'scaleY(0)'},
      common: {transformOrigin: 'top'},
      transitionProperty: 'transform, opacity',
    },
    'scale-x': {
      in: {opacity: 1, transform: 'scaleX(1)'},
      out: {opacity: 0, transform: 'scaleX(0)'},
      common: {transformOrigin: 'left'},
      transitionProperty: 'transform, opacity',
    },
    'skew-up': {
      in: {opacity: 1, transform: 'translateY(0) skew(0deg, 0deg)'},
      out: {opacity: 0, transform: 'translateY(-20px) skew(-10deg, -5deg)'},
      common: {transformOrigin: 'top'},
      transitionProperty: 'transform, opacity',
    },
    'skew-down': {
      in: {opacity: 1, transform: 'translateY(0) skew(0deg, 0deg)'},
      out: {opacity: 0, transform: 'translateY(20px) skew(-10deg, -5deg)'},
      common: {transformOrigin: 'bottom'},
      transitionProperty: 'transform, opacity',
    },
    'rotate-left': {
      in: {opacity: 1, transform: 'translateY(0) rotate(0deg)'},
      out: {opacity: 0, transform: 'translateY(20px) rotate(-5deg)'},
      common: {transformOrigin: 'bottom'},
      transitionProperty: 'transform, opacity',
    },
    'rotate-right': {
      in: {opacity: 1, transform: 'translateY(0) rotate(0deg)'},
      out: {opacity: 0, transform: 'translateY(20px) rotate(5deg)'},
      common: {transformOrigin: 'top'},
      transitionProperty: 'transform, opacity',
    },
    'slide-down': {
      in: {opacity: 1, transform: 'translateY(0)'},
      out: {opacity: 0, transform: 'translateY(-100%)'},
      common: {transformOrigin: 'top'},
      transitionProperty: 'transform, opacity',
    },
    'slide-up': {
      in: {opacity: 1, transform: 'translateY(0)'},
      out: {opacity: 0, transform: 'translateY(100%)'},
      common: {transformOrigin: 'bottom'},
      transitionProperty: 'transform, opacity',
    },
    'slide-left': {
      in: {opacity: 1, transform: 'translateX(0)'},
      out: {opacity: 0, transform: 'translateX(100%)'},
      common: {transformOrigin: 'left'},
      transitionProperty: 'transform, opacity',
    },
    'slide-right': {
      in: {opacity: 1, transform: 'translateX(0)'},
      out: {opacity: 0, transform: 'translateX(-100%)'},
      common: {transformOrigin: 'right'},
      transitionProperty: 'transform, opacity',
    },
    pop: {...Be('bottom'), common: {transformOrigin: 'center center'}},
    'pop-bottom-left': {...Be('bottom'), common: {transformOrigin: 'bottom left'}},
    'pop-bottom-right': {...Be('bottom'), common: {transformOrigin: 'bottom right'}},
    'pop-top-left': {...Be('top'), common: {transformOrigin: 'top left'}},
    'pop-top-right': {...Be('top'), common: {transformOrigin: 'top right'}},
  },
  jr = {entering: 'in', entered: 'in', exiting: 'out', exited: 'out', 'pre-exiting': 'out', 'pre-entering': 'out'};
function qa({transition: e, state: t, duration: r, timingFunction: n}) {
  const o = {WebkitBackfaceVisibility: 'hidden', transitionDuration: `${r}ms`, transitionTimingFunction: n};
  return typeof e == 'string'
    ? e in Ze
      ? {transitionProperty: Ze[e].transitionProperty, ...o, ...Ze[e].common, ...Ze[e][jr[t]]}
      : {}
    : {transitionProperty: e.transitionProperty, ...o, ...e.common, ...e[jr[t]]};
}
function Ua({
  duration: e,
  exitDuration: t,
  timingFunction: r,
  mounted: n,
  onEnter: o,
  onExit: s,
  onEntered: a,
  onExited: i,
  enterDelay: l,
  exitDelay: c,
}) {
  const d = Re(),
    p = an(),
    m = d.respectReducedMotion ? p : !1,
    [y, v] = u.useState(m ? 0 : e),
    [b, h] = u.useState(n ? 'entered' : 'exited'),
    S = u.useRef(-1),
    g = u.useRef(-1),
    w = u.useRef(-1);
  function E() {
    (window.clearTimeout(S.current), window.clearTimeout(g.current), cancelAnimationFrame(w.current));
  }
  const R = (C) => {
      E();
      const P = C ? o : s,
        N = C ? a : i,
        j = m ? 0 : C ? e : t;
      (v(j),
        j === 0
          ? (typeof P == 'function' && P(), typeof N == 'function' && N(), h(C ? 'entered' : 'exited'))
          : (w.current = requestAnimationFrame(() => {
              (Ro.flushSync(() => {
                h(C ? 'pre-entering' : 'pre-exiting');
              }),
                (w.current = requestAnimationFrame(() => {
                  (typeof P == 'function' && P(),
                    h(C ? 'entering' : 'exiting'),
                    (S.current = window.setTimeout(() => {
                      (typeof N == 'function' && N(), h(C ? 'entered' : 'exited'));
                    }, j)));
                })));
            })));
    },
    x = (C) => {
      if ((E(), typeof (C ? l : c) != 'number')) {
        R(C);
        return;
      }
      g.current = window.setTimeout(
        () => {
          R(C);
        },
        C ? l : c,
      );
    };
  return (
    rn(() => {
      x(n);
    }, [n]),
    u.useEffect(
      () => () => {
        E();
      },
      [],
    ),
    {transitionDuration: y, transitionStatus: b, transitionTimingFunction: r || 'ease'}
  );
}
function ht({
  keepMounted: e,
  transition: t = 'fade',
  duration: r = 250,
  exitDuration: n = r,
  mounted: o,
  children: s,
  timingFunction: a = 'ease',
  onExit: i,
  onEntered: l,
  onEnter: c,
  onExited: d,
  enterDelay: p,
  exitDelay: m,
}) {
  const y = cn(),
    {
      transitionDuration: v,
      transitionStatus: b,
      transitionTimingFunction: h,
    } = Ua({
      mounted: o,
      exitDuration: n,
      duration: r,
      timingFunction: a,
      onExit: i,
      onEntered: l,
      onEnter: c,
      onExited: d,
      enterDelay: p,
      exitDelay: m,
    });
  return v === 0 || y === 'test'
    ? o
      ? f.jsx(f.Fragment, {children: s({})})
      : e
        ? s({display: 'none'})
        : null
    : b === 'exited'
      ? e
        ? s({display: 'none'})
        : null
      : f.jsx(f.Fragment, {children: s(qa({transition: t, duration: v, state: b, timingFunction: h}))});
}
ht.displayName = '@mantine/core/Transition';
function sr({children: e, active: t = !0, refProp: r = 'ref', innerRef: n}) {
  const o = ws(t),
    s = Ce(o, n),
    a = _s(e);
  return a ? u.cloneElement(a, {[r]: s}) : e;
}
function Bn(e) {
  return f.jsx(rr, {tabIndex: -1, 'data-autofocus': !0, ...e});
}
sr.displayName = '@mantine/core/FocusTrap';
Bn.displayName = '@mantine/core/FocusTrapInitialFocus';
sr.InitialFocus = Bn;
var ie = {
  root: 'm_5ae2e3c',
  barsLoader: 'm_7a2bd4cd',
  bar: 'm_870bb79',
  'bars-loader-animation': 'm_5d2b3b9d',
  dotsLoader: 'm_4e3f22d7',
  dot: 'm_870c4af',
  'loader-dots-animation': 'm_aac34a1',
  ovalLoader: 'm_b34414df',
  'oval-loader-animation': 'm_f8e89c4b',
};
const Dn = u.forwardRef(({className: e, ...t}, r) =>
  f.jsxs(I, {
    component: 'span',
    className: te(ie.barsLoader, e),
    ...t,
    ref: r,
    children: [
      f.jsx('span', {className: ie.bar}),
      f.jsx('span', {className: ie.bar}),
      f.jsx('span', {className: ie.bar}),
    ],
  }),
);
Dn.displayName = '@mantine/core/Bars';
const Vn = u.forwardRef(({className: e, ...t}, r) =>
  f.jsxs(I, {
    component: 'span',
    className: te(ie.dotsLoader, e),
    ...t,
    ref: r,
    children: [
      f.jsx('span', {className: ie.dot}),
      f.jsx('span', {className: ie.dot}),
      f.jsx('span', {className: ie.dot}),
    ],
  }),
);
Vn.displayName = '@mantine/core/Dots';
const Wn = u.forwardRef(({className: e, ...t}, r) =>
  f.jsx(I, {component: 'span', className: te(ie.ovalLoader, e), ...t, ref: r}),
);
Wn.displayName = '@mantine/core/Oval';
const Hn = {bars: Dn, oval: Wn, dots: Vn},
  Ka = {loaders: Hn, type: 'oval'},
  Za = (e, {size: t, color: r}) => ({
    root: {'--loader-size': V(t, 'loader-size'), '--loader-color': r ? he(r, e) : void 0},
  }),
  gt = L((e, t) => {
    const r = _('Loader', Ka, e),
      {
        size: n,
        color: o,
        type: s,
        vars: a,
        className: i,
        style: l,
        classNames: c,
        styles: d,
        unstyled: p,
        loaders: m,
        variant: y,
        children: v,
        attributes: b,
        ...h
      } = r,
      S = F({
        name: 'Loader',
        props: r,
        classes: ie,
        className: i,
        style: l,
        classNames: c,
        styles: d,
        unstyled: p,
        attributes: b,
        vars: a,
        varsResolver: Za,
      });
    return v
      ? f.jsx(I, {...S('root'), ref: t, ...h, children: v})
      : f.jsx(I, {...S('root'), ref: t, component: m[s], variant: y, size: n, ...h});
  });
gt.defaultLoaders = Hn;
gt.classes = ie;
gt.displayName = '@mantine/core/Loader';
const Yn = u.forwardRef(({size: e = 'var(--cb-icon-size, 70%)', style: t, ...r}, n) =>
  f.jsx('svg', {
    viewBox: '0 0 15 15',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    style: {...t, width: e, height: e},
    ref: n,
    ...r,
    children: f.jsx('path', {
      d: 'M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z',
      fill: 'currentColor',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    }),
  }),
);
Yn.displayName = '@mantine/core/CloseIcon';
var Gn = {root: 'm_86a44da5', 'root--subtle': 'm_220c80f2'};
const Qa = {variant: 'subtle'},
  Ja = (e, {size: t, radius: r, iconSize: n}) => ({
    root: {'--cb-size': V(t, 'cb-size'), '--cb-radius': r === void 0 ? void 0 : le(r), '--cb-icon-size': O(n)},
  }),
  Ge = fe((e, t) => {
    const r = _('CloseButton', Qa, e),
      {
        iconSize: n,
        children: o,
        vars: s,
        radius: a,
        className: i,
        classNames: l,
        style: c,
        styles: d,
        unstyled: p,
        'data-disabled': m,
        disabled: y,
        variant: v,
        icon: b,
        mod: h,
        attributes: S,
        __staticSelector: g,
        ...w
      } = r,
      E = F({
        name: g || 'CloseButton',
        props: r,
        className: i,
        style: c,
        classes: Gn,
        classNames: l,
        styles: d,
        unstyled: p,
        attributes: S,
        vars: s,
        varsResolver: Ja,
      });
    return f.jsxs(Ye, {
      ref: t,
      ...w,
      unstyled: p,
      variant: v,
      disabled: y,
      mod: [{disabled: y || m}, h],
      ...E('root', {variant: v, active: !y && !m}),
      children: [b || f.jsx(Yn, {}), o],
    });
  });
Ge.classes = Gn;
Ge.displayName = '@mantine/core/CloseButton';
function ei(e) {
  return u.Children.toArray(e).filter(Boolean);
}
var Xn = {root: 'm_4081bf90'};
const ti = {preventGrowOverflow: !0, gap: 'md', align: 'center', justify: 'flex-start', wrap: 'wrap'},
  ri = (e, {grow: t, preventGrowOverflow: r, gap: n, align: o, justify: s, wrap: a}, {childWidth: i}) => ({
    root: {
      '--group-child-width': t && r ? i : void 0,
      '--group-gap': ut(n),
      '--group-align': o,
      '--group-justify': s,
      '--group-wrap': a,
    },
  }),
  ar = L((e, t) => {
    const r = _('Group', ti, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        children: l,
        gap: c,
        align: d,
        justify: p,
        wrap: m,
        grow: y,
        preventGrowOverflow: v,
        vars: b,
        variant: h,
        __size: S,
        mod: g,
        attributes: w,
        ...E
      } = r,
      R = ei(l),
      x = R.length,
      C = ut(c ?? 'md'),
      N = {childWidth: `calc(${100 / x}% - (${C} - ${C} / ${x}))`},
      j = F({
        name: 'Group',
        props: r,
        stylesCtx: N,
        className: o,
        style: s,
        classes: Xn,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: w,
        vars: b,
        varsResolver: ri,
      });
    return f.jsx(I, {...j('root'), ref: t, variant: h, mod: [{grow: y}, g], size: S, ...E, children: R});
  });
ar.classes = Xn;
ar.displayName = '@mantine/core/Group';
const [ni, pe] = ct('ModalBase component was not found in tree');
function oi({opened: e, transitionDuration: t}) {
  const [r, n] = u.useState(e),
    o = u.useRef(-1),
    a = an() ? 0 : t;
  return (
    u.useEffect(
      () => (
        e ? (n(!0), window.clearTimeout(o.current)) : a === 0 ? n(!1) : (o.current = window.setTimeout(() => n(!1), a)),
        () => window.clearTimeout(o.current)
      ),
      [e, a],
    ),
    r
  );
}
function si({id: e, transitionProps: t, opened: r, trapFocus: n, closeOnEscape: o, onClose: s, returnFocus: a}) {
  const i = We(e),
    [l, c] = u.useState(!1),
    [d, p] = u.useState(!1),
    m = typeof t?.duration == 'number' ? t?.duration : 200,
    y = oi({opened: r, transitionDuration: m});
  return (
    Rs(
      'keydown',
      (v) => {
        v.key === 'Escape' &&
          o &&
          !v.isComposing &&
          r &&
          v.target?.getAttribute('data-mantine-stop-propagation') !== 'true' &&
          s();
      },
      {capture: !0},
    ),
    hs({opened: r, shouldReturnFocus: n && a}),
    {_id: i, titleMounted: l, bodyMounted: d, shouldLockScroll: y, setTitleMounted: c, setBodyMounted: p}
  );
}
const qn = u.forwardRef(
  (
    {
      keepMounted: e,
      opened: t,
      onClose: r,
      id: n,
      transitionProps: o,
      onExitTransitionEnd: s,
      onEnterTransitionEnd: a,
      trapFocus: i,
      closeOnEscape: l,
      returnFocus: c,
      closeOnClickOutside: d,
      withinPortal: p,
      portalProps: m,
      lockScroll: y,
      children: v,
      zIndex: b,
      shadow: h,
      padding: S,
      __vars: g,
      unstyled: w,
      removeScrollProps: E,
      ...R
    },
    x,
  ) => {
    const {
        _id: C,
        titleMounted: P,
        bodyMounted: N,
        shouldLockScroll: j,
        setTitleMounted: $,
        setBodyMounted: k,
      } = si({id: n, transitionProps: o, opened: t, trapFocus: i, closeOnEscape: l, onClose: r, returnFocus: c}),
      {key: M, ...z} = E || {};
    return f.jsx(Fn, {
      ...m,
      withinPortal: p,
      children: f.jsx(ni, {
        value: {
          opened: t,
          onClose: r,
          closeOnClickOutside: d,
          onExitTransitionEnd: s,
          onEnterTransitionEnd: a,
          transitionProps: {...o, keepMounted: e},
          getTitleId: () => `${C}-title`,
          getBodyId: () => `${C}-body`,
          titleMounted: P,
          bodyMounted: N,
          setTitleMounted: $,
          setBodyMounted: k,
          trapFocus: i,
          closeOnEscape: l,
          zIndex: b,
          unstyled: w,
        },
        children: f.jsx(
          Qr,
          {
            enabled: j && y,
            ...z,
            children: f.jsx(I, {
              ref: x,
              ...R,
              __vars: {
                ...g,
                '--mb-z-index': (b || Ae('modal')).toString(),
                '--mb-shadow': tn(h),
                '--mb-padding': ut(S),
              },
              children: v,
            }),
          },
          M,
        ),
      }),
    });
  },
);
qn.displayName = '@mantine/core/ModalBase';
var ke = {
  title: 'm_615af6c9',
  header: 'm_b5489c3c',
  inner: 'm_60c222c7',
  content: 'm_fd1ab0aa',
  close: 'm_606cb269',
  body: 'm_5df29311',
};
function ai() {
  const e = pe();
  return (u.useEffect(() => (e.setBodyMounted(!0), () => e.setBodyMounted(!1)), []), e.getBodyId());
}
const Un = u.forwardRef(({className: e, ...t}, r) => {
  const n = ai(),
    o = pe();
  return f.jsx(I, {ref: r, ...t, id: n, className: te({[ke.body]: !o.unstyled}, e)});
});
Un.displayName = '@mantine/core/ModalBaseBody';
const Kn = u.forwardRef(({className: e, onClick: t, ...r}, n) => {
  const o = pe();
  return f.jsx(Ge, {
    ref: n,
    ...r,
    onClick: (s) => {
      (o.onClose(), t?.(s));
    },
    className: te({[ke.close]: !o.unstyled}, e),
    unstyled: o.unstyled,
  });
});
Kn.displayName = '@mantine/core/ModalBaseCloseButton';
const Zn = u.forwardRef(({transitionProps: e, className: t, innerProps: r, onKeyDown: n, style: o, ...s}, a) => {
  const i = pe();
  return f.jsx(ht, {
    mounted: i.opened,
    transition: 'pop',
    ...i.transitionProps,
    onExited: () => {
      (i.onExitTransitionEnd?.(), i.transitionProps?.onExited?.());
    },
    onEntered: () => {
      (i.onEnterTransitionEnd?.(), i.transitionProps?.onEntered?.());
    },
    ...e,
    children: (l) =>
      f.jsx('div', {
        ...r,
        className: te({[ke.inner]: !i.unstyled}, r.className),
        children: f.jsx(sr, {
          active: i.opened && i.trapFocus,
          innerRef: a,
          children: f.jsx(nr, {
            ...s,
            component: 'section',
            role: 'dialog',
            tabIndex: -1,
            'aria-modal': !0,
            'aria-describedby': i.bodyMounted ? i.getBodyId() : void 0,
            'aria-labelledby': i.titleMounted ? i.getTitleId() : void 0,
            style: [o, l],
            className: te({[ke.content]: !i.unstyled}, t),
            unstyled: i.unstyled,
            children: s.children,
          }),
        }),
      }),
  });
});
Zn.displayName = '@mantine/core/ModalBaseContent';
const Qn = u.forwardRef(({className: e, ...t}, r) => {
  const n = pe();
  return f.jsx(I, {component: 'header', ref: r, className: te({[ke.header]: !n.unstyled}, e), ...t});
});
Qn.displayName = '@mantine/core/ModalBaseHeader';
const ii = {duration: 200, timingFunction: 'ease', transition: 'fade'};
function li(e) {
  const t = pe();
  return {...ii, ...t.transitionProps, ...e};
}
const Jn = u.forwardRef(({onClick: e, transitionProps: t, style: r, visible: n, ...o}, s) => {
  const a = pe(),
    i = li(t);
  return f.jsx(ht, {
    mounted: n !== void 0 ? n : a.opened,
    ...i,
    transition: 'fade',
    children: (l) =>
      f.jsx(or, {
        ref: s,
        fixed: !0,
        style: [r, l],
        zIndex: a.zIndex,
        unstyled: a.unstyled,
        onClick: (c) => {
          (e?.(c), a.closeOnClickOutside && a.onClose());
        },
        ...o,
      }),
  });
});
Jn.displayName = '@mantine/core/ModalBaseOverlay';
function ci() {
  const e = pe();
  return (u.useEffect(() => (e.setTitleMounted(!0), () => e.setTitleMounted(!1)), []), e.getTitleId());
}
const eo = u.forwardRef(({className: e, ...t}, r) => {
  const n = ci(),
    o = pe();
  return f.jsx(I, {component: 'h2', ref: r, className: te({[ke.title]: !o.unstyled}, e), ...t, id: n});
});
eo.displayName = '@mantine/core/ModalBaseTitle';
function ui({children: e}) {
  return f.jsx(f.Fragment, {children: e});
}
const [di, fi] = Ve({size: 'sm'});
var se = {
  wrapper: 'm_6c018570',
  input: 'm_8fb7ebe7',
  section: 'm_82577fc2',
  placeholder: 'm_88bacfd0',
  root: 'm_46b77525',
  label: 'm_8fdc1311',
  required: 'm_78a94662',
  error: 'm_8f816625',
  description: 'm_fe47ce59',
};
const to = L((e, t) => {
  const r = _('InputClearButton', null, e),
    {size: n, variant: o, vars: s, classNames: a, styles: i, ...l} = r,
    c = fi(),
    {resolvedClassNames: d, resolvedStyles: p} = Ks({classNames: a, styles: i, props: r});
  return f.jsx(Ge, {
    variant: o || 'transparent',
    ref: t,
    size: n || c?.size || 'sm',
    classNames: d,
    styles: p,
    __staticSelector: 'InputClearButton',
    style: {pointerEvents: 'all', background: 'var(--input-bg)', ...l.style},
    ...l,
  });
});
to.displayName = '@mantine/core/InputClearButton';
const pi = {xs: 7, sm: 8, md: 10, lg: 12, xl: 15};
function mi({__clearable: e, __clearSection: t, rightSection: r, __defaultRightSection: n, size: o = 'sm'}) {
  const s = e && t;
  return s && (r || n)
    ? f.jsxs('div', {
        'data-combined-clear-section': !0,
        style: {display: 'flex', gap: 2, alignItems: 'center', paddingInlineEnd: pi[o]},
        children: [s, r || n],
      })
    : r === null
      ? null
      : r || s || n;
}
const [yi, Xe] = Ve({
    offsetBottom: !1,
    offsetTop: !1,
    describedBy: void 0,
    getStyles: null,
    inputId: void 0,
    labelId: void 0,
  }),
  hi = (e, {size: t}) => ({
    description: {'--input-description-size': t === void 0 ? void 0 : `calc(${ee(t)} - ${O(2)})`},
  }),
  bt = L((e, t) => {
    const r = _('InputDescription', null, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        vars: l,
        size: c,
        __staticSelector: d,
        __inheritStyles: p = !0,
        attributes: m,
        variant: y,
        ...v
      } = _('InputDescription', null, r),
      b = Xe(),
      h = F({
        name: ['InputWrapper', d],
        props: r,
        classes: se,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: m,
        rootSelector: 'description',
        vars: l,
        varsResolver: hi,
      }),
      S = (p && b?.getStyles) || h;
    return f.jsx(I, {
      component: 'p',
      ref: t,
      variant: y,
      size: c,
      ...S('description', b?.getStyles ? {className: o, style: s} : void 0),
      ...v,
    });
  });
bt.classes = se;
bt.displayName = '@mantine/core/InputDescription';
const gi = (e, {size: t}) => ({error: {'--input-error-size': t === void 0 ? void 0 : `calc(${ee(t)} - ${O(2)})`}}),
  vt = L((e, t) => {
    const r = _('InputError', null, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        vars: l,
        size: c,
        attributes: d,
        __staticSelector: p,
        __inheritStyles: m = !0,
        variant: y,
        ...v
      } = r,
      b = F({
        name: ['InputWrapper', p],
        props: r,
        classes: se,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: d,
        rootSelector: 'error',
        vars: l,
        varsResolver: gi,
      }),
      h = Xe(),
      S = (m && h?.getStyles) || b;
    return f.jsx(I, {
      component: 'p',
      ref: t,
      variant: y,
      size: c,
      ...S('error', h?.getStyles ? {className: o, style: s} : void 0),
      ...v,
    });
  });
vt.classes = se;
vt.displayName = '@mantine/core/InputError';
const _r = {labelElement: 'label'},
  bi = (e, {size: t}) => ({label: {'--input-label-size': ee(t), '--input-asterisk-color': void 0}}),
  St = L((e, t) => {
    const r = _('InputLabel', _r, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        vars: l,
        labelElement: c,
        size: d,
        required: p,
        htmlFor: m,
        onMouseDown: y,
        children: v,
        __staticSelector: b,
        variant: h,
        mod: S,
        attributes: g,
        ...w
      } = _('InputLabel', _r, r),
      E = F({
        name: ['InputWrapper', b],
        props: r,
        classes: se,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: g,
        rootSelector: 'label',
        vars: l,
        varsResolver: bi,
      }),
      R = Xe(),
      x = R?.getStyles || E;
    return f.jsxs(I, {
      ...x('label', R?.getStyles ? {className: o, style: s} : void 0),
      component: c,
      variant: h,
      size: d,
      ref: t,
      htmlFor: c === 'label' ? m : void 0,
      mod: [{required: p}, S],
      onMouseDown: (C) => {
        (y?.(C), !C.defaultPrevented && C.detail > 1 && C.preventDefault());
      },
      ...w,
      children: [v, p && f.jsx('span', {...x('required'), 'aria-hidden': !0, children: ' *'})],
    });
  });
St.classes = se;
St.displayName = '@mantine/core/InputLabel';
const ir = L((e, t) => {
  const r = _('InputPlaceholder', null, e),
    {
      classNames: n,
      className: o,
      style: s,
      styles: a,
      unstyled: i,
      vars: l,
      __staticSelector: c,
      variant: d,
      error: p,
      mod: m,
      attributes: y,
      ...v
    } = r,
    b = F({
      name: ['InputPlaceholder', c],
      props: r,
      classes: se,
      className: o,
      style: s,
      classNames: n,
      styles: a,
      unstyled: i,
      attributes: y,
      rootSelector: 'placeholder',
    });
  return f.jsx(I, {...b('placeholder'), mod: [{error: !!p}, m], component: 'span', variant: d, ref: t, ...v});
});
ir.classes = se;
ir.displayName = '@mantine/core/InputPlaceholder';
function vi(e, {hasDescription: t, hasError: r}) {
  const n = e.findIndex((l) => l === 'input'),
    o = e.slice(0, n),
    s = e.slice(n + 1),
    a = (t && o.includes('description')) || (r && o.includes('error'));
  return {offsetBottom: (t && s.includes('description')) || (r && s.includes('error')), offsetTop: a};
}
const Si = {
    labelElement: 'label',
    inputContainer: (e) => e,
    inputWrapperOrder: ['label', 'description', 'input', 'error'],
  },
  xi = (e, {size: t}) => ({
    label: {'--input-label-size': ee(t), '--input-asterisk-color': void 0},
    error: {'--input-error-size': t === void 0 ? void 0 : `calc(${ee(t)} - ${O(2)})`},
    description: {'--input-description-size': t === void 0 ? void 0 : `calc(${ee(t)} - ${O(2)})`},
  }),
  lr = L((e, t) => {
    const r = _('InputWrapper', Si, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        vars: l,
        size: c,
        variant: d,
        __staticSelector: p,
        inputContainer: m,
        inputWrapperOrder: y,
        label: v,
        error: b,
        description: h,
        labelProps: S,
        descriptionProps: g,
        errorProps: w,
        labelElement: E,
        children: R,
        withAsterisk: x,
        id: C,
        required: P,
        __stylesApiProps: N,
        mod: j,
        attributes: $,
        ...k
      } = r,
      M = F({
        name: ['InputWrapper', p],
        props: N || r,
        classes: se,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: $,
        vars: l,
        varsResolver: xi,
      }),
      z = {size: c, variant: d, __staticSelector: p},
      B = We(C),
      W = typeof x == 'boolean' ? x : P,
      H = w?.id || `${B}-error`,
      q = g?.id || `${B}-description`,
      U = B,
      Z = !!b && typeof b != 'boolean',
      Q = !!h,
      ye = `${Z ? H : ''} ${Q ? q : ''}`,
      ge = ye.trim().length > 0 ? ye.trim() : void 0,
      ae = S?.id || `${B}-label`,
      be = v && f.jsx(St, {labelElement: E, id: ae, htmlFor: U, required: W, ...z, ...S, children: v}, 'label'),
      re = Q && f.jsx(bt, {...g, ...z, size: g?.size || z.size, id: g?.id || q, children: h}, 'description'),
      T = f.jsx(u.Fragment, {children: m(R)}, 'input'),
      A = Z && u.createElement(vt, {...w, ...z, size: w?.size || z.size, key: 'error', id: w?.id || H}, b),
      Y = y.map((J) => {
        switch (J) {
          case 'label':
            return be;
          case 'input':
            return T;
          case 'description':
            return re;
          case 'error':
            return A;
          default:
            return null;
        }
      });
    return f.jsx(yi, {
      value: {getStyles: M, describedBy: ge, inputId: U, labelId: ae, ...vi(y, {hasDescription: Q, hasError: Z})},
      children: f.jsx(I, {ref: t, variant: d, size: c, mod: [{error: !!b}, j], ...M('root'), ...k, children: Y}),
    });
  });
lr.classes = se;
lr.displayName = '@mantine/core/InputWrapper';
const wi = {
    variant: 'default',
    leftSectionPointerEvents: 'none',
    rightSectionPointerEvents: 'none',
    withAria: !0,
    withErrorStyles: !0,
    size: 'sm',
  },
  Ci = (e, t, r) => ({
    wrapper: {
      '--input-margin-top': r.offsetTop ? 'calc(var(--mantine-spacing-xs) / 2)' : void 0,
      '--input-margin-bottom': r.offsetBottom ? 'calc(var(--mantine-spacing-xs) / 2)' : void 0,
      '--input-height': V(t.size, 'input-height'),
      '--input-fz': ee(t.size),
      '--input-radius': t.radius === void 0 ? void 0 : le(t.radius),
      '--input-left-section-width': t.leftSectionWidth !== void 0 ? O(t.leftSectionWidth) : void 0,
      '--input-right-section-width': t.rightSectionWidth !== void 0 ? O(t.rightSectionWidth) : void 0,
      '--input-padding-y': t.multiline ? V(t.size, 'input-padding-y') : void 0,
      '--input-left-section-pointer-events': t.leftSectionPointerEvents,
      '--input-right-section-pointer-events': t.rightSectionPointerEvents,
    },
  }),
  X = fe((e, t) => {
    const r = _('Input', wi, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        required: l,
        __staticSelector: c,
        __stylesApiProps: d,
        size: p,
        wrapperProps: m,
        error: y,
        disabled: v,
        leftSection: b,
        leftSectionProps: h,
        leftSectionWidth: S,
        rightSection: g,
        rightSectionProps: w,
        rightSectionWidth: E,
        rightSectionPointerEvents: R,
        leftSectionPointerEvents: x,
        variant: C,
        vars: P,
        pointer: N,
        multiline: j,
        radius: $,
        id: k,
        withAria: M,
        withErrorStyles: z,
        mod: B,
        inputSize: W,
        attributes: H,
        __clearSection: q,
        __clearable: U,
        __defaultRightSection: Z,
        ...Q
      } = r,
      {styleProps: ye, rest: ge} = pt(Q),
      ae = Xe(),
      be = {offsetBottom: ae?.offsetBottom, offsetTop: ae?.offsetTop},
      re = F({
        name: ['Input', c],
        props: d || r,
        classes: se,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: H,
        stylesCtx: be,
        rootSelector: 'wrapper',
        vars: P,
        varsResolver: Ci,
      }),
      T = M
        ? {required: l, disabled: v, 'aria-invalid': !!y, 'aria-describedby': ae?.describedBy, id: ae?.inputId || k}
        : {},
      A = mi({__clearable: U, __clearSection: q, rightSection: g, __defaultRightSection: Z, size: p});
    return f.jsx(di, {
      value: {size: p || 'sm'},
      children: f.jsxs(I, {
        ...re('wrapper'),
        ...ye,
        ...m,
        mod: [
          {
            error: !!y && z,
            pointer: N,
            disabled: v,
            multiline: j,
            'data-with-right-section': !!A,
            'data-with-left-section': !!b,
          },
          B,
        ],
        variant: C,
        size: p,
        children: [
          b &&
            f.jsx('div', {
              ...h,
              'data-position': 'left',
              ...re('section', {className: h?.className, style: h?.style}),
              children: b,
            }),
          f.jsx(I, {
            component: 'input',
            ...ge,
            ...T,
            ref: t,
            required: l,
            mod: {disabled: v, error: !!y && z},
            variant: C,
            __size: W,
            ...re('input'),
          }),
          A &&
            f.jsx('div', {
              ...w,
              'data-position': 'right',
              ...re('section', {className: w?.className, style: w?.style}),
              children: A,
            }),
        ],
      }),
    });
  });
X.classes = se;
X.Wrapper = lr;
X.Label = St;
X.Error = vt;
X.Description = bt;
X.Placeholder = ir;
X.ClearButton = to;
X.displayName = '@mantine/core/Input';
function Ei(e, t, r) {
  const n = _(e, t, r),
    {
      label: o,
      description: s,
      error: a,
      required: i,
      classNames: l,
      styles: c,
      className: d,
      unstyled: p,
      __staticSelector: m,
      __stylesApiProps: y,
      errorProps: v,
      labelProps: b,
      descriptionProps: h,
      wrapperProps: S,
      id: g,
      size: w,
      style: E,
      inputContainer: R,
      inputWrapperOrder: x,
      withAsterisk: C,
      variant: P,
      vars: N,
      mod: j,
      attributes: $,
      ...k
    } = n,
    {styleProps: M, rest: z} = pt(k),
    B = {
      label: o,
      description: s,
      error: a,
      required: i,
      classNames: l,
      className: d,
      __staticSelector: m,
      __stylesApiProps: y || n,
      errorProps: v,
      labelProps: b,
      descriptionProps: h,
      unstyled: p,
      styles: c,
      size: w,
      style: E,
      inputContainer: R,
      inputWrapperOrder: x,
      withAsterisk: C,
      variant: P,
      id: g,
      mod: j,
      attributes: $,
      ...S,
    };
  return {
    ...z,
    classNames: l,
    styles: c,
    unstyled: p,
    wrapperProps: {...B, ...M},
    inputProps: {
      required: i,
      classNames: l,
      styles: c,
      unstyled: p,
      size: w,
      __staticSelector: m,
      __stylesApiProps: y || n,
      error: a,
      variant: P,
      id: g,
      attributes: $,
    },
  };
}
const Ri = {__staticSelector: 'InputBase', withAria: !0, size: 'sm'},
  Le = fe((e, t) => {
    const {inputProps: r, wrapperProps: n, ...o} = Ei('InputBase', Ri, e);
    return f.jsx(X.Wrapper, {...n, children: f.jsx(X, {...r, ...o, ref: t})});
  });
Le.classes = {...X.classes, ...X.Wrapper.classes};
Le.displayName = '@mantine/core/InputBase';
const Pi = {
  gap: {type: 'spacing', property: 'gap'},
  rowGap: {type: 'spacing', property: 'rowGap'},
  columnGap: {type: 'spacing', property: 'columnGap'},
  align: {type: 'identity', property: 'alignItems'},
  justify: {type: 'identity', property: 'justifyContent'},
  wrap: {type: 'identity', property: 'flexWrap'},
  direction: {type: 'identity', property: 'flexDirection'},
};
var ro = {root: 'm_8bffd616'};
const cr = fe((e, t) => {
  const r = _('Flex', null, e),
    {
      classNames: n,
      className: o,
      style: s,
      styles: a,
      unstyled: i,
      vars: l,
      gap: c,
      rowGap: d,
      columnGap: p,
      align: m,
      justify: y,
      wrap: v,
      direction: b,
      attributes: h,
      ...S
    } = r,
    g = F({
      name: 'Flex',
      classes: ro,
      props: r,
      className: o,
      style: s,
      classNames: n,
      styles: a,
      unstyled: i,
      attributes: h,
      vars: l,
    }),
    w = Re(),
    E = yn(),
    R = mn({
      styleProps: {gap: c, rowGap: d, columnGap: p, align: m, justify: y, wrap: v, direction: b},
      theme: w,
      data: Pi,
    });
  return f.jsxs(f.Fragment, {
    children: [
      R.hasResponsiveStyles && f.jsx(pn, {selector: `.${E}`, styles: R.styles, media: R.media}),
      f.jsx(I, {ref: t, ...g('root', {className: E, style: lt(R.inlineStyles)}), ...S}),
    ],
  });
});
cr.classes = ro;
cr.displayName = '@mantine/core/Flex';
var no = {
  root: 'm_66836ed3',
  wrapper: 'm_a5d60502',
  body: 'm_667c2793',
  title: 'm_6a03f287',
  label: 'm_698f4f23',
  icon: 'm_667f2a6a',
  message: 'm_7fa78076',
  closeButton: 'm_87f54839',
};
const Ni = (e, {radius: t, color: r, variant: n, autoContrast: o}) => {
    const s = e.variantColorResolver({color: r || e.primaryColor, theme: e, variant: n || 'light', autoContrast: o});
    return {
      root: {
        '--alert-radius': t === void 0 ? void 0 : le(t),
        '--alert-bg': r || n ? s.background : void 0,
        '--alert-color': s.color,
        '--alert-bd': r || n ? s.border : void 0,
      },
    };
  },
  xt = L((e, t) => {
    const r = _('Alert', null, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        vars: l,
        radius: c,
        color: d,
        title: p,
        children: m,
        id: y,
        icon: v,
        withCloseButton: b,
        onClose: h,
        closeButtonLabel: S,
        variant: g,
        autoContrast: w,
        role: E,
        attributes: R,
        ...x
      } = r,
      C = F({
        name: 'Alert',
        classes: no,
        props: r,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: R,
        vars: l,
        varsResolver: Ni,
      }),
      P = We(y),
      N = (p && `${P}-title`) || void 0,
      j = `${P}-body`;
    return f.jsx(I, {
      id: P,
      ...C('root', {variant: g}),
      variant: g,
      ref: t,
      role: E || 'alert',
      ...x,
      'aria-describedby': m ? j : void 0,
      'aria-labelledby': p ? N : void 0,
      children: f.jsxs('div', {
        ...C('wrapper'),
        children: [
          v && f.jsx('div', {...C('icon'), children: v}),
          f.jsxs('div', {
            ...C('body'),
            children: [
              p &&
                f.jsx('div', {
                  ...C('title'),
                  'data-with-close-button': b || void 0,
                  children: f.jsx('span', {id: N, ...C('label'), children: p}),
                }),
              m && f.jsx('div', {id: j, ...C('message'), 'data-variant': g, children: m}),
            ],
          }),
          b &&
            f.jsx(Ge, {
              ...C('closeButton'),
              onClick: h,
              variant: 'transparent',
              size: 16,
              iconSize: 16,
              'aria-label': S,
              unstyled: i,
            }),
        ],
      }),
    });
  });
xt.classes = no;
xt.displayName = '@mantine/core/Alert';
var oo = {root: 'm_b6d8b162'};
function Ti(e) {
  if (e === 'start') return 'start';
  if (e === 'end' || e) return 'end';
}
const ji = {inherit: !1},
  _i = (e, {variant: t, lineClamp: r, gradient: n, size: o, color: s}) => ({
    root: {
      '--text-fz': ee(o),
      '--text-lh': ds(o),
      '--text-gradient': t === 'gradient' ? Xs(n, e) : void 0,
      '--text-line-clamp': typeof r == 'number' ? r.toString() : void 0,
      '--text-color': s ? he(s, e) : void 0,
    },
  }),
  ur = fe((e, t) => {
    const r = _('Text', ji, e),
      {
        lineClamp: n,
        truncate: o,
        inline: s,
        inherit: a,
        gradient: i,
        span: l,
        __staticSelector: c,
        vars: d,
        className: p,
        style: m,
        classNames: y,
        styles: v,
        unstyled: b,
        variant: h,
        mod: S,
        size: g,
        attributes: w,
        ...E
      } = r,
      R = F({
        name: ['Text', c],
        props: r,
        classes: oo,
        className: p,
        style: m,
        classNames: y,
        styles: v,
        unstyled: b,
        attributes: w,
        vars: d,
        varsResolver: _i,
      });
    return f.jsx(I, {
      ...R('root', {focusable: !0}),
      ref: t,
      component: l ? 'span' : 'p',
      variant: h,
      mod: [{'data-truncate': Ti(o), 'data-line-clamp': typeof n == 'number', 'data-inline': s, 'data-inherit': a}, S],
      size: g,
      ...E,
    });
  });
ur.classes = oo;
ur.displayName = '@mantine/core/Text';
var Ii = {
  root: 'm_5f75b09e',
  body: 'm_5f6e695e',
  labelWrapper: 'm_d3ea56bb',
  label: 'm_8ee546b8',
  description: 'm_328f68c0',
  error: 'm_8e8a99cc',
};
const so = u.forwardRef(
  (
    {
      __staticSelector: e,
      __stylesApiProps: t,
      className: r,
      classNames: n,
      styles: o,
      unstyled: s,
      children: a,
      label: i,
      description: l,
      id: c,
      disabled: d,
      error: p,
      size: m,
      labelPosition: y = 'left',
      bodyElement: v = 'div',
      labelElement: b = 'label',
      variant: h,
      style: S,
      vars: g,
      mod: w,
      attributes: E,
      ...R
    },
    x,
  ) => {
    const C = F({
      name: e,
      props: t,
      className: r,
      style: S,
      classes: Ii,
      classNames: n,
      styles: o,
      unstyled: s,
      attributes: E,
    });
    return f.jsx(I, {
      ...C('root'),
      ref: x,
      __vars: {'--label-fz': ee(m), '--label-lh': V(m, 'label-lh')},
      mod: [{'label-position': y}, w],
      variant: h,
      size: m,
      ...R,
      children: f.jsxs(I, {
        component: v,
        htmlFor: v === 'label' ? c : void 0,
        ...C('body'),
        children: [
          a,
          f.jsxs('div', {
            ...C('labelWrapper'),
            'data-disabled': d || void 0,
            children: [
              i &&
                f.jsx(I, {
                  component: b,
                  htmlFor: b === 'label' ? c : void 0,
                  ...C('label'),
                  'data-disabled': d || void 0,
                  children: i,
                }),
              l && f.jsx(X.Description, {size: m, __inheritStyles: !1, ...C('description'), children: l}),
              p && typeof p != 'boolean' && f.jsx(X.Error, {size: m, __inheritStyles: !1, ...C('error'), children: p}),
            ],
          }),
        ],
      }),
    });
  },
);
so.displayName = '@mantine/core/InlineInput';
function ki({children: e, role: t}) {
  const r = Xe();
  return r
    ? f.jsx('div', {role: t, 'aria-labelledby': r.labelId, 'aria-describedby': r.describedBy, children: e})
    : f.jsx(f.Fragment, {children: e});
}
var ze = {
  root: 'm_77c9d27d',
  inner: 'm_80f1301b',
  label: 'm_811560b9',
  section: 'm_a74036a',
  loader: 'm_a25b86ee',
  group: 'm_80d6d844',
  groupSection: 'm_70be2a01',
};
const Ir = {orientation: 'horizontal'},
  $i = (e, {borderWidth: t}) => ({group: {'--button-border-width': O(t)}}),
  dr = L((e, t) => {
    const r = _('ButtonGroup', Ir, e),
      {
        className: n,
        style: o,
        classNames: s,
        styles: a,
        unstyled: i,
        orientation: l,
        vars: c,
        borderWidth: d,
        variant: p,
        mod: m,
        attributes: y,
        ...v
      } = _('ButtonGroup', Ir, e),
      b = F({
        name: 'ButtonGroup',
        props: r,
        classes: ze,
        className: n,
        style: o,
        classNames: s,
        styles: a,
        unstyled: i,
        attributes: y,
        vars: c,
        varsResolver: $i,
        rootSelector: 'group',
      });
    return f.jsx(I, {...b('group'), ref: t, variant: p, mod: [{'data-orientation': l}, m], role: 'group', ...v});
  });
dr.classes = ze;
dr.displayName = '@mantine/core/ButtonGroup';
const Ai = (e, {radius: t, color: r, gradient: n, variant: o, autoContrast: s, size: a}) => {
    const i = e.variantColorResolver({
      color: r || e.primaryColor,
      theme: e,
      gradient: n,
      variant: o || 'filled',
      autoContrast: s,
    });
    return {
      groupSection: {
        '--section-height': V(a, 'section-height'),
        '--section-padding-x': V(a, 'section-padding-x'),
        '--section-fz': a?.includes('compact') ? ee(a.replace('compact-', '')) : ee(a),
        '--section-radius': t === void 0 ? void 0 : le(t),
        '--section-bg': r || o ? i.background : void 0,
        '--section-color': i.color,
        '--section-bd': r || o ? i.border : void 0,
      },
    };
  },
  fr = L((e, t) => {
    const r = _('ButtonGroupSection', null, e),
      {
        className: n,
        style: o,
        classNames: s,
        styles: a,
        unstyled: i,
        vars: l,
        variant: c,
        gradient: d,
        radius: p,
        autoContrast: m,
        attributes: y,
        ...v
      } = r,
      b = F({
        name: 'ButtonGroupSection',
        props: r,
        classes: ze,
        className: n,
        style: o,
        classNames: s,
        styles: a,
        unstyled: i,
        attributes: y,
        vars: l,
        varsResolver: Ai,
        rootSelector: 'groupSection',
      });
    return f.jsx(I, {...b('groupSection'), ref: t, variant: c, ...v});
  });
fr.classes = ze;
fr.displayName = '@mantine/core/ButtonGroupSection';
const Mi = {
    in: {opacity: 1, transform: `translate(-50%, calc(-50% + ${O(1)}))`},
    out: {opacity: 0, transform: 'translate(-50%, -200%)'},
    common: {transformOrigin: 'center'},
    transitionProperty: 'transform, opacity',
  },
  Li = (e, {radius: t, color: r, gradient: n, variant: o, size: s, justify: a, autoContrast: i}) => {
    const l = e.variantColorResolver({
      color: r || e.primaryColor,
      theme: e,
      gradient: n,
      variant: o || 'filled',
      autoContrast: i,
    });
    return {
      root: {
        '--button-justify': a,
        '--button-height': V(s, 'button-height'),
        '--button-padding-x': V(s, 'button-padding-x'),
        '--button-fz': s?.includes('compact') ? ee(s.replace('compact-', '')) : ee(s),
        '--button-radius': t === void 0 ? void 0 : le(t),
        '--button-bg': r || o ? l.background : void 0,
        '--button-hover': r || o ? l.hover : void 0,
        '--button-color': l.color,
        '--button-bd': r || o ? l.border : void 0,
        '--button-hover-color': r || o ? l.hoverColor : void 0,
      },
    };
  },
  $e = fe((e, t) => {
    const r = _('Button', null, e),
      {
        style: n,
        vars: o,
        className: s,
        color: a,
        disabled: i,
        children: l,
        leftSection: c,
        rightSection: d,
        fullWidth: p,
        variant: m,
        radius: y,
        loading: v,
        loaderProps: b,
        gradient: h,
        classNames: S,
        styles: g,
        unstyled: w,
        'data-disabled': E,
        autoContrast: R,
        mod: x,
        attributes: C,
        ...P
      } = r,
      N = F({
        name: 'Button',
        props: r,
        classes: ze,
        className: s,
        style: n,
        classNames: S,
        styles: g,
        unstyled: w,
        attributes: C,
        vars: o,
        varsResolver: Li,
      }),
      j = !!c,
      $ = !!d;
    return f.jsxs(Ye, {
      ref: t,
      ...N('root', {active: !i && !v && !E}),
      unstyled: w,
      variant: m,
      disabled: i || v,
      mod: [{disabled: i || E, loading: v, block: p, 'with-left-section': j, 'with-right-section': $}, x],
      ...P,
      children: [
        typeof v == 'boolean' &&
          f.jsx(ht, {
            mounted: v,
            transition: Mi,
            duration: 150,
            children: (k) =>
              f.jsx(I, {
                component: 'span',
                ...N('loader', {style: k}),
                'aria-hidden': !0,
                children: f.jsx(gt, {color: 'var(--button-color)', size: 'calc(var(--button-height) / 1.8)', ...b}),
              }),
          }),
        f.jsxs('span', {
          ...N('inner'),
          children: [
            c && f.jsx(I, {component: 'span', ...N('section'), mod: {position: 'left'}, children: c}),
            f.jsx(I, {component: 'span', mod: {loading: v}, ...N('label'), children: l}),
            d && f.jsx(I, {component: 'span', ...N('section'), mod: {position: 'right'}, children: d}),
          ],
        }),
      ],
    });
  });
$e.classes = ze;
$e.displayName = '@mantine/core/Button';
$e.Group = dr;
$e.GroupSection = fr;
function Yt() {
  return (
    (Yt = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Yt.apply(null, arguments)
  );
}
function zi(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) !== -1) continue;
      r[n] = e[n];
    }
  return r;
}
var Oi = u.useLayoutEffect,
  Fi = function (t) {
    var r = ot.useRef(t);
    return (
      Oi(function () {
        r.current = t;
      }),
      r
    );
  },
  kr = function (t, r) {
    if (typeof t == 'function') {
      t(r);
      return;
    }
    t.current = r;
  },
  Bi = function (t, r) {
    var n = ot.useRef();
    return ot.useCallback(
      function (o) {
        ((t.current = o), n.current && kr(n.current, null), (n.current = r), r && kr(r, o));
      },
      [r],
    );
  },
  $r = {
    'min-height': '0',
    'max-height': 'none',
    height: '0',
    visibility: 'hidden',
    overflow: 'hidden',
    position: 'absolute',
    'z-index': '-1000',
    top: '0',
    right: '0',
    display: 'block',
  },
  Di = function (t) {
    Object.keys($r).forEach(function (r) {
      t.style.setProperty(r, $r[r], 'important');
    });
  },
  Ar = Di,
  K = null,
  Mr = function (t, r) {
    var n = t.scrollHeight;
    return r.sizingStyle.boxSizing === 'border-box' ? n + r.borderSize : n - r.paddingSize;
  };
function Vi(e, t, r, n) {
  (r === void 0 && (r = 1),
    n === void 0 && (n = 1 / 0),
    K ||
      ((K = document.createElement('textarea')),
      K.setAttribute('tabindex', '-1'),
      K.setAttribute('aria-hidden', 'true'),
      Ar(K)),
    K.parentNode === null && document.body.appendChild(K));
  var o = e.paddingSize,
    s = e.borderSize,
    a = e.sizingStyle,
    i = a.boxSizing;
  (Object.keys(a).forEach(function (m) {
    var y = m;
    K.style[y] = a[y];
  }),
    Ar(K),
    (K.value = t));
  var l = Mr(K, e);
  ((K.value = t), (l = Mr(K, e)), (K.value = 'x'));
  var c = K.scrollHeight - o,
    d = c * r;
  (i === 'border-box' && (d = d + o + s), (l = Math.max(d, l)));
  var p = c * n;
  return (i === 'border-box' && (p = p + o + s), (l = Math.min(p, l)), [l, c]);
}
var Lr = function () {},
  Wi = function (t, r) {
    return t.reduce(function (n, o) {
      return ((n[o] = r[o]), n);
    }, {});
  },
  Hi = [
    'borderBottomWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'borderTopWidth',
    'boxSizing',
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontWeight',
    'letterSpacing',
    'lineHeight',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'tabSize',
    'textIndent',
    'textRendering',
    'textTransform',
    'width',
    'wordBreak',
    'wordSpacing',
    'scrollbarGutter',
  ],
  Yi = !!document.documentElement.currentStyle,
  Gi = function (t) {
    var r = window.getComputedStyle(t);
    if (r === null) return null;
    var n = Wi(Hi, r),
      o = n.boxSizing;
    if (o === '') return null;
    Yi &&
      o === 'border-box' &&
      (n.width =
        parseFloat(n.width) +
        parseFloat(n.borderRightWidth) +
        parseFloat(n.borderLeftWidth) +
        parseFloat(n.paddingRight) +
        parseFloat(n.paddingLeft) +
        'px');
    var s = parseFloat(n.paddingBottom) + parseFloat(n.paddingTop),
      a = parseFloat(n.borderBottomWidth) + parseFloat(n.borderTopWidth);
    return {sizingStyle: n, paddingSize: s, borderSize: a};
  },
  Xi = Gi;
function pr(e, t, r) {
  var n = Fi(r);
  u.useLayoutEffect(function () {
    var o = function (a) {
      return n.current(a);
    };
    if (e)
      return (
        e.addEventListener(t, o),
        function () {
          return e.removeEventListener(t, o);
        }
      );
  }, []);
}
var qi = function (t, r) {
    pr(document.body, 'reset', function (n) {
      t.current.form === n.target && r(n);
    });
  },
  Ui = function (t) {
    pr(window, 'resize', t);
  },
  Ki = function (t) {
    pr(document.fonts, 'loadingdone', t);
  },
  Zi = ['cacheMeasurements', 'maxRows', 'minRows', 'onChange', 'onHeightChange'],
  Qi = function (t, r) {
    var n = t.cacheMeasurements,
      o = t.maxRows,
      s = t.minRows,
      a = t.onChange,
      i = a === void 0 ? Lr : a,
      l = t.onHeightChange,
      c = l === void 0 ? Lr : l,
      d = zi(t, Zi),
      p = d.value !== void 0,
      m = u.useRef(null),
      y = Bi(m, r),
      v = u.useRef(0),
      b = u.useRef(),
      h = function () {
        var w = m.current,
          E = n && b.current ? b.current : Xi(w);
        if (E) {
          b.current = E;
          var R = Vi(E, w.value || w.placeholder || 'x', s, o),
            x = R[0],
            C = R[1];
          v.current !== x &&
            ((v.current = x), w.style.setProperty('height', x + 'px', 'important'), c(x, {rowHeight: C}));
        }
      },
      S = function (w) {
        (p || h(), i(w));
      };
    return (
      u.useLayoutEffect(h),
      qi(m, function () {
        if (!p) {
          var g = m.current.value;
          requestAnimationFrame(function () {
            var w = m.current;
            w && g !== w.value && h();
          });
        }
      }),
      Ui(h),
      Ki(h),
      u.createElement('textarea', Yt({}, d, {onChange: S, ref: y}))
    );
  },
  Ji = u.forwardRef(Qi);
const el = {size: 'sm'},
  mr = L((e, t) => {
    const {autosize: r, maxRows: n, minRows: o, __staticSelector: s, resize: a, ...i} = _('Textarea', el, e),
      l = r && js() !== 'test',
      c = l ? {maxRows: n, minRows: o} : {};
    return f.jsx(Le, {
      component: l ? Ji : 'textarea',
      ref: t,
      ...i,
      __staticSelector: s || 'Textarea',
      multiline: !0,
      'data-no-overflow': (r && n === void 0) || void 0,
      __vars: {'--input-resize': a},
      ...c,
    });
  });
mr.classes = Le.classes;
mr.displayName = '@mantine/core/Textarea';
var me = {root: 'm_9df02822', content: 'm_54c44539', inner: 'm_1f958f16', header: 'm_d0e2b9cd'};
const [tl, Oe] = ct('Modal component was not found in tree'),
  wt = L((e, t) => {
    const r = _('ModalBody', null, e),
      {classNames: n, className: o, style: s, styles: a, vars: i, ...l} = r,
      c = Oe();
    return f.jsx(Un, {ref: t, ...c.getStyles('body', {classNames: n, style: s, styles: a, className: o}), ...l});
  });
wt.classes = me;
wt.displayName = '@mantine/core/ModalBody';
const Ct = L((e, t) => {
  const r = _('ModalCloseButton', null, e),
    {classNames: n, className: o, style: s, styles: a, vars: i, ...l} = r,
    c = Oe();
  return f.jsx(Kn, {ref: t, ...c.getStyles('close', {classNames: n, style: s, styles: a, className: o}), ...l});
});
Ct.classes = me;
Ct.displayName = '@mantine/core/ModalCloseButton';
const Et = L((e, t) => {
  const r = _('ModalContent', null, e),
    {classNames: n, className: o, style: s, styles: a, vars: i, children: l, __hidden: c, ...d} = r,
    p = Oe(),
    m = p.scrollAreaComponent || ui;
  return f.jsx(Zn, {
    ...p.getStyles('content', {className: o, style: s, styles: a, classNames: n}),
    innerProps: p.getStyles('inner', {className: o, style: s, styles: a, classNames: n}),
    'data-full-screen': p.fullScreen || void 0,
    'data-modal-content': !0,
    'data-hidden': c || void 0,
    ref: t,
    ...d,
    children: f.jsx(m, {
      style: {maxHeight: p.fullScreen ? '100dvh' : `calc(100dvh - (${O(p.yOffset)} * 2))`},
      children: l,
    }),
  });
});
Et.classes = me;
Et.displayName = '@mantine/core/ModalContent';
const Rt = L((e, t) => {
  const r = _('ModalHeader', null, e),
    {classNames: n, className: o, style: s, styles: a, vars: i, ...l} = r,
    c = Oe();
  return f.jsx(Qn, {ref: t, ...c.getStyles('header', {classNames: n, style: s, styles: a, className: o}), ...l});
});
Rt.classes = me;
Rt.displayName = '@mantine/core/ModalHeader';
const Pt = L((e, t) => {
  const r = _('ModalOverlay', null, e),
    {classNames: n, className: o, style: s, styles: a, vars: i, ...l} = r,
    c = Oe();
  return f.jsx(Jn, {ref: t, ...c.getStyles('overlay', {classNames: n, style: s, styles: a, className: o}), ...l});
});
Pt.classes = me;
Pt.displayName = '@mantine/core/ModalOverlay';
const rl = {
    __staticSelector: 'Modal',
    closeOnClickOutside: !0,
    withinPortal: !0,
    lockScroll: !0,
    trapFocus: !0,
    returnFocus: !0,
    closeOnEscape: !0,
    keepMounted: !1,
    zIndex: Ae('modal'),
    transitionProps: {duration: 200, transition: 'fade-down'},
    yOffset: '5dvh',
  },
  nl = (e, {radius: t, size: r, yOffset: n, xOffset: o}) => ({
    root: {
      '--modal-radius': t === void 0 ? void 0 : le(t),
      '--modal-size': V(r, 'modal-size'),
      '--modal-y-offset': O(n),
      '--modal-x-offset': O(o),
    },
  }),
  Nt = L((e, t) => {
    const r = _('ModalRoot', rl, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        vars: l,
        yOffset: c,
        scrollAreaComponent: d,
        radius: p,
        fullScreen: m,
        centered: y,
        xOffset: v,
        __staticSelector: b,
        attributes: h,
        ...S
      } = r,
      g = F({
        name: b,
        classes: me,
        props: r,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: h,
        vars: l,
        varsResolver: nl,
      });
    return f.jsx(tl, {
      value: {yOffset: c, scrollAreaComponent: d, getStyles: g, fullScreen: m},
      children: f.jsx(qn, {
        ref: t,
        ...g('root'),
        'data-full-screen': m || void 0,
        'data-centered': y || void 0,
        'data-offset-scrollbars': d === He.Autosize || void 0,
        unstyled: i,
        ...S,
      }),
    });
  });
Nt.classes = me;
Nt.displayName = '@mantine/core/ModalRoot';
const [ol, sl] = Ve();
function ao({children: e}) {
  const [t, r] = u.useState([]),
    [n, o] = u.useState(Ae('modal'));
  return f.jsx(ol, {
    value: {
      stack: t,
      addModal: (s, a) => {
        (r((i) => [...new Set([...i, s])]),
          o((i) => (typeof a == 'number' && typeof i == 'number' ? Math.max(i, a) : i)));
      },
      removeModal: (s) => r((a) => a.filter((i) => i !== s)),
      getZIndex: (s) => `calc(${n} + ${t.indexOf(s)} + 1)`,
      currentId: t[t.length - 1],
      maxZIndex: n,
    },
    children: e,
  });
}
ao.displayName = '@mantine/core/ModalStack';
const Tt = L((e, t) => {
  const r = _('ModalTitle', null, e),
    {classNames: n, className: o, style: s, styles: a, vars: i, ...l} = r,
    c = Oe();
  return f.jsx(eo, {ref: t, ...c.getStyles('title', {classNames: n, style: s, styles: a, className: o}), ...l});
});
Tt.classes = me;
Tt.displayName = '@mantine/core/ModalTitle';
const al = {
    closeOnClickOutside: !0,
    withinPortal: !0,
    lockScroll: !0,
    trapFocus: !0,
    returnFocus: !0,
    closeOnEscape: !0,
    keepMounted: !1,
    zIndex: Ae('modal'),
    transitionProps: {duration: 200, transition: 'fade-down'},
    withOverlay: !0,
    withCloseButton: !0,
  },
  ce = L((e, t) => {
    const {
        title: r,
        withOverlay: n,
        overlayProps: o,
        withCloseButton: s,
        closeButtonProps: a,
        children: i,
        radius: l,
        opened: c,
        stackId: d,
        zIndex: p,
        ...m
      } = _('Modal', al, e),
      y = sl(),
      v = !!r || s,
      b = y && d ? {closeOnEscape: y.currentId === d, trapFocus: y.currentId === d, zIndex: y.getZIndex(d)} : {},
      h = n === !1 ? !1 : d && y ? y.currentId === d : c;
    return (
      u.useEffect(() => {
        y && d && (c ? y.addModal(d, p || Ae('modal')) : y.removeModal(d));
      }, [c, d, p]),
      f.jsxs(Nt, {
        ref: t,
        radius: l,
        opened: c,
        zIndex: y && d ? y.getZIndex(d) : p,
        ...m,
        ...b,
        children: [
          n && f.jsx(Pt, {visible: h, transitionProps: y && d ? {duration: 0} : void 0, ...o}),
          f.jsxs(Et, {
            radius: l,
            __hidden: y && d && c ? d !== y.currentId : !1,
            children: [
              v && f.jsxs(Rt, {children: [r && f.jsx(Tt, {children: r}), s && f.jsx(Ct, {...a})]}),
              f.jsx(wt, {children: i}),
            ],
          }),
        ],
      })
    );
  });
ce.classes = me;
ce.displayName = '@mantine/core/Modal';
ce.Root = Nt;
ce.Overlay = Pt;
ce.Content = Et;
ce.Body = wt;
ce.Header = Rt;
ce.Title = Tt;
ce.CloseButton = Ct;
ce.Stack = ao;
var io = {
  root: 'm_f3f1af94',
  inner: 'm_89c4f5e4',
  icon: 'm_f3ed6b2b',
  radio: 'm_8a3dbb89',
  'radio--outline': 'm_1bfe9d39',
};
const [il, lo] = Ve(),
  [ll, cl] = Ve();
var co = {card: 'm_9dc8ae12'};
const ul = {withBorder: !0},
  dl = (e, {radius: t}) => ({card: {'--card-radius': le(t)}}),
  yr = L((e, t) => {
    const r = _('RadioCard', ul, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        vars: l,
        checked: c,
        mod: d,
        withBorder: p,
        value: m,
        onClick: y,
        name: v,
        onKeyDown: b,
        attributes: h,
        ...S
      } = r,
      g = F({
        name: 'RadioCard',
        classes: co,
        props: r,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: h,
        vars: l,
        varsResolver: dl,
        rootSelector: 'card',
      }),
      {dir: w} = Sn(),
      E = lo(),
      R = typeof c == 'boolean' ? c : E?.value === m || !1,
      x = v || E?.name,
      C = (P) => {
        if ((b?.(P), ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(P.nativeEvent.code))) {
          P.preventDefault();
          const N = Array.from(document.querySelectorAll(`[role="radio"][name="${x || '__mantine'}"]`)),
            j = N.findIndex((M) => M === P.target),
            $ = j + 1 >= N.length ? 0 : j + 1,
            k = j - 1 < 0 ? N.length - 1 : j - 1;
          (P.nativeEvent.code === 'ArrowDown' && (N[$].focus(), N[$].click()),
            P.nativeEvent.code === 'ArrowUp' && (N[k].focus(), N[k].click()),
            P.nativeEvent.code === 'ArrowLeft' && (N[w === 'ltr' ? k : $].focus(), N[w === 'ltr' ? k : $].click()),
            P.nativeEvent.code === 'ArrowRight' && (N[w === 'ltr' ? $ : k].focus(), N[w === 'ltr' ? $ : k].click()));
        }
      };
    return f.jsx(ll, {
      value: {checked: R},
      children: f.jsx(Ye, {
        ref: t,
        mod: [{'with-border': p, checked: R}, d],
        ...g('card'),
        ...S,
        role: 'radio',
        'aria-checked': R,
        name: x,
        onClick: (P) => {
          (y?.(P), E?.onChange(m || ''));
        },
        onKeyDown: C,
      }),
    });
  });
yr.displayName = '@mantine/core/RadioCard';
yr.classes = co;
const jt = L((e, t) => {
  const {
      value: r,
      defaultValue: n,
      onChange: o,
      size: s,
      wrapperProps: a,
      children: i,
      name: l,
      readOnly: c,
      disabled: d,
      ...p
    } = _('RadioGroup', null, e),
    m = We(l),
    [y, v] = Ns({value: r, defaultValue: n, finalValue: '', onChange: o}),
    b = (h) => !c && v(typeof h == 'string' ? h : h.currentTarget.value);
  return f.jsx(il, {
    value: {value: y, onChange: b, size: s, name: m, disabled: d},
    children: f.jsx(X.Wrapper, {
      size: s,
      ref: t,
      ...a,
      ...p,
      labelElement: 'div',
      __staticSelector: 'RadioGroup',
      children: f.jsx(ki, {role: 'radiogroup', children: i}),
    }),
  });
});
jt.classes = X.Wrapper.classes;
jt.displayName = '@mantine/core/RadioGroup';
function uo({size: e, style: t, ...r}) {
  return f.jsx('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 5 5',
    style: {width: O(e), height: O(e), ...t},
    'aria-hidden': !0,
    ...r,
    children: f.jsx('circle', {cx: '2.5', cy: '2.5', r: '2.5', fill: 'currentColor'}),
  });
}
var fo = {indicator: 'm_717d7ff6', icon: 'm_3e4da632', 'indicator--outline': 'm_2980836c'};
const fl = {icon: uo},
  pl = (e, {radius: t, color: r, size: n, iconColor: o, variant: s, autoContrast: a}) => {
    const i = Me({color: r || e.primaryColor, theme: e}),
      l = i.isThemeColor && i.shade === void 0 ? `var(--mantine-color-${i.color}-outline)` : i.color;
    return {
      indicator: {
        '--radio-size': V(n, 'radio-size'),
        '--radio-radius': t === void 0 ? void 0 : le(t),
        '--radio-color': s === 'outline' ? l : he(r, e),
        '--radio-icon-size': V(n, 'radio-icon-size'),
        '--radio-icon-color': o ? he(o, e) : fn(a, e) ? dn({color: r, theme: e, autoContrast: a}) : void 0,
      },
    };
  },
  hr = L((e, t) => {
    const r = _('RadioIndicator', fl, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        vars: l,
        icon: c,
        radius: d,
        color: p,
        iconColor: m,
        autoContrast: y,
        checked: v,
        mod: b,
        variant: h,
        disabled: S,
        attributes: g,
        ...w
      } = r,
      E = F({
        name: 'RadioIndicator',
        classes: fo,
        props: r,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: g,
        vars: l,
        varsResolver: pl,
        rootSelector: 'indicator',
      }),
      R = cl(),
      x = typeof v == 'boolean' ? v : R?.checked || !1;
    return f.jsx(I, {
      ref: t,
      ...E('indicator', {variant: h}),
      variant: h,
      mod: [{checked: x, disabled: S}, b],
      ...w,
      children: f.jsx(c, {...E('icon')}),
    });
  });
hr.displayName = '@mantine/core/RadioIndicator';
hr.classes = fo;
const ml = {labelPosition: 'right'},
  yl = (e, {size: t, radius: r, color: n, iconColor: o, variant: s, autoContrast: a}) => {
    const i = Me({color: n || e.primaryColor, theme: e}),
      l = i.isThemeColor && i.shade === void 0 ? `var(--mantine-color-${i.color}-outline)` : i.color;
    return {
      root: {
        '--radio-size': V(t, 'radio-size'),
        '--radio-radius': r === void 0 ? void 0 : le(r),
        '--radio-color': s === 'outline' ? l : he(n, e),
        '--radio-icon-color': o ? he(o, e) : fn(a, e) ? dn({color: n, theme: e, autoContrast: a}) : void 0,
        '--radio-icon-size': V(t, 'radio-icon-size'),
      },
    };
  },
  we = L((e, t) => {
    const r = _('Radio', ml, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        vars: l,
        id: c,
        size: d,
        label: p,
        labelPosition: m,
        description: y,
        error: v,
        radius: b,
        color: h,
        variant: S,
        disabled: g,
        wrapperProps: w,
        icon: E = uo,
        rootRef: R,
        iconColor: x,
        onChange: C,
        mod: P,
        attributes: N,
        checked: j,
        ...$
      } = r,
      k = F({
        name: 'Radio',
        classes: io,
        props: r,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: N,
        vars: l,
        varsResolver: yl,
      }),
      M = lo(),
      z = M?.size ?? d,
      B = r.size ? d : z,
      {styleProps: W, rest: H} = pt($),
      q = We(c),
      U = M ? M.value === H.value : void 0,
      Z = {
        checked: U ?? j,
        name: M?.name ?? H.name,
        onChange: (Q) => {
          (M?.onChange(Q), C?.(Q));
        },
        disabled: M?.disabled ?? g,
      };
    return f.jsx(so, {
      ...k('root'),
      __staticSelector: 'Radio',
      __stylesApiProps: r,
      id: q,
      size: B,
      labelPosition: m,
      label: p,
      description: y,
      error: v,
      disabled: Z.disabled,
      classNames: n,
      styles: a,
      unstyled: i,
      'data-checked': (U ?? j) || void 0,
      variant: S,
      ref: R,
      mod: P,
      ...W,
      ...w,
      children: f.jsxs(I, {
        ...k('inner'),
        mod: {'label-position': m},
        children: [
          f.jsx(I, {
            ...k('radio', {focusable: !0, variant: S}),
            ...H,
            ...Z,
            component: 'input',
            mod: {error: !!v},
            ref: t,
            id: q,
            type: 'radio',
          }),
          f.jsx(E, {...k('icon'), 'aria-hidden': !0}),
        ],
      }),
    });
  });
we.classes = io;
we.displayName = '@mantine/core/Radio';
we.Group = jt;
we.Card = yr;
we.Indicator = hr;
var po = {root: 'm_6d731127'};
const hl = {gap: 'md', align: 'stretch', justify: 'flex-start'},
  gl = (e, {gap: t, align: r, justify: n}) => ({
    root: {'--stack-gap': ut(t), '--stack-align': r, '--stack-justify': n},
  }),
  gr = L((e, t) => {
    const r = _('Stack', hl, e),
      {
        classNames: n,
        className: o,
        style: s,
        styles: a,
        unstyled: i,
        vars: l,
        align: c,
        justify: d,
        gap: p,
        variant: m,
        attributes: y,
        ...v
      } = r,
      b = F({
        name: 'Stack',
        props: r,
        classes: po,
        className: o,
        style: s,
        classNames: n,
        styles: a,
        unstyled: i,
        attributes: y,
        vars: l,
        varsResolver: gl,
      });
    return f.jsx(I, {ref: t, ...b('root'), variant: m, ...v});
  });
gr.classes = po;
gr.displayName = '@mantine/core/Stack';
const br = L((e, t) => {
  const r = _('TextInput', null, e);
  return f.jsx(Le, {component: 'input', ref: t, ...r, __staticSelector: 'TextInput'});
});
br.classes = Le.classes;
br.displayName = '@mantine/core/TextInput';
function bl(e) {
  if (!/^[0-9a-zA-Z-]+$/.test(e))
    throw new Error(
      `[@mantine/use-form] Form name "${e}" is invalid, it should contain only letters, numbers and dashes`,
    );
}
const vl = typeof window < 'u' ? u.useLayoutEffect : u.useEffect;
function G(e, t) {
  vl(() => {
    if (e) return (window.addEventListener(e, t), () => window.removeEventListener(e, t));
  }, [e]);
}
function Sl(e, t) {
  (e && bl(e),
    G(`mantine-form:${e}:set-field-value`, (r) => t.setFieldValue(r.detail.path, r.detail.value)),
    G(`mantine-form:${e}:set-values`, (r) => t.setValues(r.detail)),
    G(`mantine-form:${e}:set-initial-values`, (r) => t.setInitialValues(r.detail)),
    G(`mantine-form:${e}:set-errors`, (r) => t.setErrors(r.detail)),
    G(`mantine-form:${e}:set-field-error`, (r) => t.setFieldError(r.detail.path, r.detail.error)),
    G(`mantine-form:${e}:clear-field-error`, (r) => t.clearFieldError(r.detail)),
    G(`mantine-form:${e}:clear-errors`, t.clearErrors),
    G(`mantine-form:${e}:reset`, t.reset),
    G(`mantine-form:${e}:validate`, t.validate),
    G(`mantine-form:${e}:validate-field`, (r) => t.validateField(r.detail)),
    G(`mantine-form:${e}:reorder-list-item`, (r) => t.reorderListItem(r.detail.path, r.detail.payload)),
    G(`mantine-form:${e}:remove-list-item`, (r) => t.removeListItem(r.detail.path, r.detail.index)),
    G(`mantine-form:${e}:insert-list-item`, (r) => t.insertListItem(r.detail.path, r.detail.item, r.detail.index)),
    G(`mantine-form:${e}:set-dirty`, (r) => t.setDirty(r.detail)),
    G(`mantine-form:${e}:set-touched`, (r) => t.setTouched(r.detail)),
    G(`mantine-form:${e}:reset-dirty`, (r) => t.resetDirty(r.detail)),
    G(`mantine-form:${e}:reset-touched`, t.resetTouched));
}
function xl(e) {
  return (t) => {
    if (!t) e(t);
    else if (typeof t == 'function') e(t);
    else if (typeof t == 'object' && 'nativeEvent' in t) {
      const {currentTarget: r} = t;
      r instanceof HTMLInputElement
        ? r.type === 'checkbox'
          ? e(r.checked)
          : e(r.value)
        : (r instanceof HTMLTextAreaElement || r instanceof HTMLSelectElement) && e(r.value);
    } else e(t);
  };
}
function Gt(e) {
  return e === null || typeof e != 'object'
    ? {}
    : Object.keys(e).reduce((t, r) => {
        const n = e[r];
        return (n != null && n !== !1 && (t[r] = n), t);
      }, {});
}
function wl(e) {
  const [t, r] = u.useState(Gt(e)),
    n = u.useRef(t),
    o = u.useCallback((l) => {
      r((c) => {
        const d = Gt(typeof l == 'function' ? l(c) : l);
        return ((n.current = d), d);
      });
    }, []),
    s = u.useCallback(() => o({}), []),
    a = u.useCallback(
      (l) => {
        n.current[l] !== void 0 &&
          o((c) => {
            const d = {...c};
            return (delete d[l], d);
          });
      },
      [t],
    ),
    i = u.useCallback(
      (l, c) => {
        c == null || c === !1 ? a(l) : n.current[l] !== c && o((d) => ({...d, [l]: c}));
      },
      [t],
    );
  return {errorsState: t, setErrors: o, clearErrors: s, setFieldError: i, clearFieldError: a};
}
function Xt(e, t) {
  if (t === null || typeof t != 'object') return {};
  const r = {...t};
  return (
    Object.keys(t).forEach((n) => {
      n.includes(`${String(e)}.`) && delete r[n];
    }),
    r
  );
}
function zr(e, t) {
  const r = e.substring(t.length + 1).split('.')[0];
  return parseInt(r, 10);
}
function Or(e, t, r, n) {
  if (t === void 0) return r;
  const o = `${String(e)}`;
  let s = r;
  n === -1 && (s = Xt(`${o}.${t}`, s));
  const a = {...s},
    i = new Set();
  return (
    Object.entries(s)
      .filter(([l]) => {
        if (!l.startsWith(`${o}.`)) return !1;
        const c = zr(l, o);
        return Number.isNaN(c) ? !1 : c >= t;
      })
      .forEach(([l, c]) => {
        const d = zr(l, o),
          p = l.replace(`${o}.${d}`, `${o}.${d + n}`);
        ((a[p] = c), i.add(p), i.has(l) || delete a[l]);
      }),
    a
  );
}
function Cl(e, {from: t, to: r}, n) {
  const o = `${e}.${t}`,
    s = `${e}.${r}`,
    a = {...n},
    i = new Set();
  return (
    Object.keys(n).forEach((l) => {
      if (i.has(l)) return;
      let c, d;
      if (
        (l.startsWith(o) ? ((c = l), (d = l.replace(o, s))) : l.startsWith(s) && ((c = l.replace(s, o)), (d = l)),
        c && d)
      ) {
        const p = a[c],
          m = a[d];
        (m === void 0 ? delete a[c] : (a[c] = m), p === void 0 ? delete a[d] : (a[d] = p), i.add(c), i.add(d));
      }
    }),
    a
  );
}
function Fr(e, t, r) {
  (typeof r.value == 'object' && (r.value = je(r.value)),
    !r.enumerable || r.get || r.set || !r.configurable || !r.writable || t === '__proto__'
      ? Object.defineProperty(e, t, r)
      : (e[t] = r.value));
}
function je(e) {
  if (typeof e != 'object') return e;
  var t = 0,
    r,
    n,
    o,
    s = Object.prototype.toString.call(e);
  if (
    (s === '[object Object]'
      ? (o = Object.create(e.__proto__ || null))
      : s === '[object Array]'
        ? (o = Array(e.length))
        : s === '[object Set]'
          ? ((o = new Set()),
            e.forEach(function (a) {
              o.add(je(a));
            }))
          : s === '[object Map]'
            ? ((o = new Map()),
              e.forEach(function (a, i) {
                o.set(je(i), je(a));
              }))
            : s === '[object Date]'
              ? (o = new Date(+e))
              : s === '[object RegExp]'
                ? (o = new RegExp(e.source, e.flags))
                : s === '[object DataView]'
                  ? (o = new e.constructor(je(e.buffer)))
                  : s === '[object ArrayBuffer]'
                    ? (o = e.slice(0))
                    : s.slice(-6) === 'Array]' && (o = new e.constructor(e)),
    o)
  ) {
    for (n = Object.getOwnPropertySymbols(e); t < n.length; t++) Fr(o, n[t], Object.getOwnPropertyDescriptor(e, n[t]));
    for (t = 0, n = Object.getOwnPropertyNames(e); t < n.length; t++)
      (Object.hasOwnProperty.call(o, (r = n[t])) && o[r] === e[r]) || Fr(o, r, Object.getOwnPropertyDescriptor(e, r));
  }
  return o || e;
}
function mo(e) {
  return typeof e != 'string' ? [] : e.split('.');
}
function D(e, t) {
  const r = mo(e);
  if (r.length === 0 || typeof t != 'object' || t === null) return;
  let n = t[r[0]];
  for (let o = 1; o < r.length && n != null; o += 1) n = n[r[o]];
  return n;
}
function qe(e, t, r) {
  const n = mo(e);
  if (n.length === 0) return r;
  const o = je(r);
  if (n.length === 1) return ((o[n[0]] = t), o);
  let s = o[n[0]];
  for (let a = 1; a < n.length - 1; a += 1) {
    if (s === void 0) return o;
    s = s[n[a]];
  }
  return ((s[n[n.length - 1]] = t), o);
}
function El(e, {from: t, to: r}, n) {
  const o = D(e, n);
  if (!Array.isArray(o)) return n;
  const s = [...o],
    a = o[t];
  return (s.splice(t, 1), s.splice(r, 0, a), qe(e, s, n));
}
function Rl(e, t, r, n) {
  const o = D(e, n);
  if (!Array.isArray(o)) return n;
  const s = [...o];
  return (s.splice(typeof r == 'number' ? r : s.length, 0, t), qe(e, s, n));
}
function Pl(e, t, r) {
  const n = D(e, r);
  return Array.isArray(n)
    ? qe(
        e,
        n.filter((o, s) => s !== t),
        r,
      )
    : r;
}
function Nl(e, t, r, n) {
  const o = D(e, n);
  if (!Array.isArray(o) || o.length <= r) return n;
  const s = [...o];
  return ((s[r] = t), qe(e, s, n));
}
function Tl({$values: e, $errors: t, $status: r}) {
  const n = u.useCallback((i, l) => {
      (r.clearFieldDirty(i),
        t.setErrors((c) => Cl(i, l, c)),
        e.setValues({values: El(i, l, e.refValues.current), updateState: !0}));
    }, []),
    o = u.useCallback((i, l) => {
      (r.clearFieldDirty(i),
        t.setErrors((c) => Or(i, l, c, -1)),
        e.setValues({values: Pl(i, l, e.refValues.current), updateState: !0}));
    }, []),
    s = u.useCallback((i, l, c) => {
      (r.clearFieldDirty(i),
        t.setErrors((d) => Or(i, c, d, 1)),
        e.setValues({values: Rl(i, l, c, e.refValues.current), updateState: !0}));
    }, []),
    a = u.useCallback((i, l, c) => {
      (r.clearFieldDirty(i), e.setValues({values: Nl(i, c, l, e.refValues.current), updateState: !0}));
    }, []);
  return {reorderListItem: n, removeListItem: o, insertListItem: s, replaceListItem: a};
}
var zt, Br;
function jl() {
  return (
    Br ||
      ((Br = 1),
      (zt = function e(t, r) {
        if (t === r) return !0;
        if (t && r && typeof t == 'object' && typeof r == 'object') {
          if (t.constructor !== r.constructor) return !1;
          var n, o, s;
          if (Array.isArray(t)) {
            if (((n = t.length), n != r.length)) return !1;
            for (o = n; o-- !== 0; ) if (!e(t[o], r[o])) return !1;
            return !0;
          }
          if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
          if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
          if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
          if (((s = Object.keys(t)), (n = s.length), n !== Object.keys(r).length)) return !1;
          for (o = n; o-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(r, s[o])) return !1;
          for (o = n; o-- !== 0; ) {
            var a = s[o];
            if (!e(t[a], r[a])) return !1;
          }
          return !0;
        }
        return t !== t && r !== r;
      })),
    zt
  );
}
var _l = jl();
const Qe = Co(_l);
function De(e, t) {
  const r = Object.keys(e);
  if (typeof t == 'string') {
    const n = r.filter((o) => o.startsWith(`${t}.`));
    return e[t] || n.some((o) => e[o]) || !1;
  }
  return r.some((n) => e[n]);
}
function Il({initialDirty: e, initialTouched: t, mode: r, $values: n}) {
  const [o, s] = u.useState(t),
    [a, i] = u.useState(e),
    l = u.useRef(t),
    c = u.useRef(e),
    d = u.useCallback((x) => {
      const C = typeof x == 'function' ? x(l.current) : x;
      ((l.current = C), r === 'controlled' && s(C));
    }, []),
    p = u.useCallback((x, C = !1) => {
      const P = typeof x == 'function' ? x(c.current) : x;
      ((c.current = P), (r === 'controlled' || C) && i(P));
    }, []),
    m = u.useCallback(() => d({}), []),
    y = u.useCallback((x) => {
      const C = x ? {...n.refValues.current, ...x} : n.refValues.current;
      (n.setValuesSnapshot(C), p({}));
    }, []),
    v = u.useCallback((x, C) => {
      d((P) => (De(P, x) === C ? P : {...P, [x]: C}));
    }, []),
    b = u.useCallback((x, C, P) => {
      p((N) => (De(N, x) === C ? N : {...N, [x]: C}), P);
    }, []),
    h = u.useCallback((x, C) => {
      const P = De(c.current, x),
        N = !Qe(D(x, n.getValuesSnapshot()), C),
        j = Xt(x, c.current);
      ((j[x] = N), p(j, P !== N));
    }, []),
    S = u.useCallback((x) => De(l.current, x), []),
    g = u.useCallback(
      (x) =>
        p((C) => {
          if (typeof x != 'string') return C;
          const P = Xt(x, C);
          return (delete P[x], Qe(P, C) ? C : P);
        }),
      [],
    ),
    w = u.useCallback((x) => {
      if (x) {
        const P = D(x, c.current);
        if (typeof P == 'boolean') return P;
        const N = D(x, n.refValues.current),
          j = D(x, n.valuesSnapshot.current);
        return !Qe(N, j);
      }
      return Object.keys(c.current).length > 0 ? De(c.current) : !Qe(n.refValues.current, n.valuesSnapshot.current);
    }, []),
    E = u.useCallback(() => c.current, []),
    R = u.useCallback(() => l.current, []);
  return {
    touchedState: o,
    dirtyState: a,
    touchedRef: l,
    dirtyRef: c,
    setTouched: d,
    setDirty: p,
    resetDirty: y,
    resetTouched: m,
    isTouched: S,
    setFieldTouched: v,
    setFieldDirty: b,
    setTouchedState: s,
    setDirtyState: i,
    clearFieldDirty: g,
    isDirty: w,
    getDirty: E,
    getTouched: R,
    setCalculatedFieldDirty: h,
  };
}
function kl({initialValues: e, onValuesChange: t, mode: r}) {
  const n = u.useRef(!1),
    [o, s] = u.useState(e || {}),
    a = u.useRef(o),
    i = u.useRef(o),
    l = u.useCallback(
      ({values: h, subscribers: S, updateState: g = !0, mergeWithPreviousValues: w = !0}) => {
        const E = a.current,
          R = h instanceof Function ? h(a.current) : h,
          x = w ? {...E, ...R} : R;
        ((a.current = x),
          g && (s(x), r === 'uncontrolled' && (a.current = x)),
          t?.(x, E),
          S?.filter(Boolean).forEach((C) => C({updatedValues: x, previousValues: E})));
      },
      [t],
    ),
    c = u.useCallback(
      (h) => {
        const S = D(h.path, a.current),
          g = h.value instanceof Function ? h.value(S) : h.value;
        if (S !== g) {
          const w = a.current,
            E = qe(h.path, g, a.current);
          (l({values: E, updateState: h.updateState}),
            h.subscribers?.filter(Boolean).forEach((R) => R({path: h.path, updatedValues: E, previousValues: w})));
        }
      },
      [l],
    ),
    d = u.useCallback((h) => {
      i.current = h;
    }, []),
    p = u.useCallback(
      (h, S) => {
        n.current || ((n.current = !0), l({values: h, updateState: r === 'controlled'}), d(h), S());
      },
      [l],
    ),
    m = u.useCallback(() => {
      l({values: i.current, updateState: !0, mergeWithPreviousValues: !1});
    }, [l]),
    y = u.useCallback(() => a.current, []),
    v = u.useCallback(() => i.current, []),
    b = u.useCallback(
      (h, S) => {
        const g = D(h, i.current);
        typeof g > 'u' || c({path: h, value: g, updateState: r === 'controlled', subscribers: S});
      },
      [c, r],
    );
  return {
    initialized: n,
    stateValues: o,
    refValues: a,
    valuesSnapshot: i,
    setValues: l,
    setFieldValue: c,
    resetValues: m,
    setValuesSnapshot: d,
    initialize: p,
    getValues: y,
    getValuesSnapshot: v,
    resetField: b,
  };
}
function $l({$status: e, cascadeUpdates: t}) {
  const r = u.useRef({}),
    n = u.useCallback((s, a) => {
      u.useEffect(
        () => (
          (r.current[s] = r.current[s] || []),
          r.current[s].push(a),
          () => {
            r.current[s] = r.current[s].filter((i) => i !== a);
          }
        ),
        [a],
      );
    }, []),
    o = u.useCallback((s) => {
      const a =
        r.current[s]?.map(
          (i) => (l) =>
            i({
              previousValue: D(s, l.previousValues),
              value: D(s, l.updatedValues),
              touched: e.isTouched(s),
              dirty: e.isDirty(s),
            }),
        ) ?? [];
      if (t)
        for (const i in r.current)
          (i.startsWith(`${s}.`) || s.startsWith(`${i}.`)) &&
            a.push(
              ...r.current[i].map(
                (l) => (c) =>
                  l({
                    previousValue: D(i, c.previousValues),
                    value: D(i, c.updatedValues),
                    touched: e.isTouched(i),
                    dirty: e.isDirty(i),
                  }),
              ),
            );
      return a;
    }, []);
  return {subscribers: r, watch: n, getFieldSubscribers: o};
}
function Dr(e, t) {
  return e ? `${e}-${t.toString()}` : t.toString();
}
const Je = Symbol('root-rule');
function Vr(e) {
  const t = Gt(e);
  return {hasErrors: Object.keys(t).length > 0, errors: t};
}
function qt(e, t, r = '', n = {}) {
  return typeof e != 'object' || e === null
    ? n
    : Object.keys(e).reduce((o, s) => {
        const a = e[s],
          i = `${r === '' ? '' : `${r}.`}${s}`,
          l = D(i, t);
        let c = !1;
        return (
          typeof a == 'function' && (o[i] = a(l, t, i)),
          typeof a == 'object' &&
            Array.isArray(l) &&
            ((c = !0), l.forEach((d, p) => qt(a, t, `${i}.${p}`, o)), Je in a && (o[i] = a[Je](l, t, i))),
          typeof a == 'object' &&
            typeof l == 'object' &&
            l !== null &&
            (c || qt(a, t, i, o), Je in a && (o[i] = a[Je](l, t, i))),
          o
        );
      }, n);
}
function Ut(e, t) {
  return Vr(typeof e == 'function' ? e(t) : qt(e, t));
}
function et(e, t, r) {
  if (typeof e != 'string') return {hasError: !1, error: null};
  const n = Ut(t, r),
    o = Object.keys(n.errors).find((s) => e.split('.').every((a, i) => a === s.split('.')[i]));
  return {hasError: !!o, error: o ? n.errors[o] : null};
}
const Al = '__MANTINE_FORM_INDEX__';
function Wr(e, t) {
  return t ? (typeof t == 'boolean' ? t : Array.isArray(t) ? t.includes(e.replace(/[.][0-9]+/g, `.${Al}`)) : !1) : !1;
}
function Ml({
  name: e,
  mode: t = 'controlled',
  initialValues: r,
  initialErrors: n = {},
  initialDirty: o = {},
  initialTouched: s = {},
  clearInputErrorOnChange: a = !0,
  validateInputOnChange: i = !1,
  validateInputOnBlur: l = !1,
  onValuesChange: c,
  transformValues: d = (h) => h,
  enhanceGetInputProps: p,
  validate: m,
  onSubmitPreventDefault: y = 'always',
  touchTrigger: v = 'change',
  cascadeUpdates: b = !1,
} = {}) {
  const h = wl(n),
    S = kl({initialValues: r, onValuesChange: c, mode: t}),
    g = Il({initialDirty: o, initialTouched: s, $values: S, mode: t}),
    w = Tl({$values: S, $errors: h, $status: g}),
    E = $l({$status: g, cascadeUpdates: b}),
    [R, x] = u.useState(0),
    [C, P] = u.useState({}),
    [N, j] = u.useState(!1),
    $ = u.useCallback(() => {
      (S.resetValues(), h.clearErrors(), g.resetDirty(), g.resetTouched(), t === 'uncontrolled' && x((T) => T + 1));
    }, []),
    k = u.useCallback(
      (T) => {
        (a && h.clearErrors(),
          t === 'uncontrolled' && x((A) => A + 1),
          Object.keys(E.subscribers.current).forEach((A) => {
            const Y = D(A, S.refValues.current),
              J = D(A, T);
            Y !== J &&
              E.getFieldSubscribers(A).forEach((ue) => ue({previousValues: T, updatedValues: S.refValues.current}));
          }));
      },
      [a],
    ),
    M = u.useCallback(
      (T) => {
        const A = S.refValues.current;
        (S.initialize(T, () => t === 'uncontrolled' && x((Y) => Y + 1)), k(A));
      },
      [k],
    ),
    z = u.useCallback(
      (T, A, Y) => {
        const J = Wr(T, i),
          ue = A instanceof Function ? A(D(T, S.refValues.current)) : A;
        (g.setCalculatedFieldDirty(T, ue),
          v === 'change' && g.setFieldTouched(T, !0),
          !J && a && h.clearFieldError(T),
          S.setFieldValue({
            path: T,
            value: A,
            updateState: t === 'controlled',
            subscribers: [
              ...E.getFieldSubscribers(T),
              J
                ? (ve) => {
                    const ne = et(T, m, ve.updatedValues);
                    ne.hasError ? h.setFieldError(T, ne.error) : h.clearFieldError(T);
                  }
                : null,
              Y?.forceUpdate !== !1 && t !== 'controlled' ? () => P((ve) => ({...ve, [T]: (ve[T] || 0) + 1})) : null,
            ],
          }));
      },
      [c, m],
    ),
    B = u.useCallback(
      (T) => {
        const A = S.refValues.current;
        (S.setValues({values: T, updateState: t === 'controlled'}), k(A));
      },
      [c, k],
    ),
    W = u.useCallback(() => {
      const T = Ut(m, S.refValues.current);
      return (h.setErrors(T.errors), T);
    }, [m]),
    H = u.useCallback(
      (T) => {
        const A = et(T, m, S.refValues.current);
        return (A.hasError ? h.setFieldError(T, A.error) : h.clearFieldError(T), A);
      },
      [m],
    ),
    q = (T, {type: A = 'input', withError: Y = !0, withFocus: J = !0, ...ue} = {}) => {
      const ne = {onChange: xl((Pe) => z(T, Pe, {forceUpdate: !1})), 'data-path': Dr(e, T)};
      return (
        Y && (ne.error = h.errorsState[T]),
        A === 'checkbox'
          ? (ne[t === 'controlled' ? 'checked' : 'defaultChecked'] = D(T, S.refValues.current))
          : (ne[t === 'controlled' ? 'value' : 'defaultValue'] = D(T, S.refValues.current)),
        J &&
          ((ne.onFocus = () => g.setFieldTouched(T, !0)),
          (ne.onBlur = () => {
            if (Wr(T, l)) {
              const Pe = et(T, m, S.refValues.current);
              Pe.hasError ? h.setFieldError(T, Pe.error) : h.clearFieldError(T);
            }
          })),
        Object.assign(
          ne,
          p?.({inputProps: ne, field: T, options: {type: A, withError: Y, withFocus: J, ...ue}, form: re}),
        )
      );
    },
    U = (T, A) => (Y) => {
      y === 'always' && Y?.preventDefault();
      const J = W();
      if (J.hasErrors) (y === 'validation-failed' && Y?.preventDefault(), A?.(J.errors, S.refValues.current, Y));
      else {
        const ue = T?.(d(S.refValues.current), Y);
        ue instanceof Promise && (j(!0), ue.finally(() => j(!1)));
      }
    },
    Z = (T) => d(T || S.refValues.current),
    Q = u.useCallback((T) => {
      (T.preventDefault(), $());
    }, []),
    ye = u.useCallback(
      (T) => (T ? !et(T, m, S.refValues.current).hasError : !Ut(m, S.refValues.current).hasErrors),
      [m],
    ),
    ge = (T) => `${R}-${String(T)}-${C[String(T)] || 0}`,
    ae = u.useCallback((T) => document.querySelector(`[data-path="${Dr(e, T)}"]`), []),
    be = u.useCallback(
      (T) => {
        S.resetField(T, [t !== 'controlled' ? () => P((A) => ({...A, [T]: (A[T] || 0) + 1})) : null]);
      },
      [S.resetField, t, P],
    ),
    re = {
      watch: E.watch,
      initialized: S.initialized.current,
      values: t === 'uncontrolled' ? S.refValues.current : S.stateValues,
      getValues: S.getValues,
      getInitialValues: S.getValuesSnapshot,
      setInitialValues: S.setValuesSnapshot,
      resetField: be,
      initialize: M,
      setValues: B,
      setFieldValue: z,
      submitting: N,
      setSubmitting: j,
      errors: h.errorsState,
      setErrors: h.setErrors,
      setFieldError: h.setFieldError,
      clearFieldError: h.clearFieldError,
      clearErrors: h.clearErrors,
      resetDirty: g.resetDirty,
      setTouched: g.setTouched,
      setDirty: g.setDirty,
      isTouched: g.isTouched,
      resetTouched: g.resetTouched,
      isDirty: g.isDirty,
      getTouched: g.getTouched,
      getDirty: g.getDirty,
      reorderListItem: w.reorderListItem,
      insertListItem: w.insertListItem,
      removeListItem: w.removeListItem,
      replaceListItem: w.replaceListItem,
      reset: $,
      validate: W,
      validateField: H,
      getInputProps: q,
      onSubmit: U,
      onReset: Q,
      isValid: ye,
      getTransformedValues: Z,
      key: ge,
      getInputNode: ae,
    };
  return (Sl(e, re), re);
}
const yo = ({note: e, isOpen: t, onClose: r, onSuccess: n, isAdmin: o = !1}) => {
  const {getToken: s} = Hr(),
    [a, i] = u.useState(!1),
    [l, c] = u.useState(null),
    d = Ml({
      initialValues: {title: e?.title || '', content: e?.content || '', isPublic: e?.isPublic === 'true' || !1},
      validate: {
        title: (m) => (m.trim().length > 0 ? null : 'Title cannot be empty'),
        content: (m) => (m.trim().length > 0 ? null : 'Content cannot be empty'),
      },
    });
  e && d.values.title !== e.title && d.setValues({title: e.title, content: e.content, isPublic: e.isPublic === 'true'});
  const p = async (m) => {
    if (!e || !e.id) {
      c('Cannot edit: note data is missing');
      return;
    }
    try {
      (i(!0), c(null));
      let y;
      const v = o ? localStorage.getItem('adminApiKey') || '' : await s();
      if (
        (o
          ? (y = await fetch(`/api/notes/${e.id}/admin`, {
              method: 'PUT',
              headers: {'Content-Type': 'application/json', 'X-API-Key': v},
              body: JSON.stringify(m),
            }))
          : e.isPublic === 'true' && !e.userId
            ? (y = await fetch(`/api/public-notes/${e.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(m),
              }))
            : (y = await fetch(`/api/notes/${e.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json', Authorization: `Bearer ${v}`},
                body: JSON.stringify(m),
              })),
        !y.ok)
      ) {
        const b = await y.json().catch(() => ({}));
        throw new Error(b.error || 'Failed to update note');
      }
      (n(), r());
    } catch (y) {
      (console.error('Error updating note:', y), c(y instanceof Error ? y.message : 'Failed to update note'));
    } finally {
      i(!1);
    }
  };
  return f.jsxs(ce, {
    opened: t,
    onClose: r,
    title: 'Edit Note',
    size: 'lg',
    centered: !0,
    overlayProps: {backgroundOpacity: 0.55, blur: 3},
    styles: {
      root: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
      content: {width: '100%', maxWidth: '600px', margin: '0 auto'},
    },
    children: [
      l && f.jsx(xt, {color: 'red', title: 'Error', mb: 'md', onClose: () => c(null), children: l}),
      f.jsx('form', {
        onSubmit: d.onSubmit(p),
        children: f.jsxs(gr, {
          children: [
            f.jsx(br, {
              label: 'Title',
              placeholder: 'Note title',
              ...d.getInputProps('title'),
              disabled: a,
              required: !0,
            }),
            f.jsx(mr, {
              label: 'Content',
              placeholder: 'Note content',
              minRows: 4,
              ...d.getInputProps('content'),
              disabled: a,
              required: !0,
            }),
            (o || e?.userId) &&
              f.jsx(jt, {
                value: d.values.isPublic ? 'true' : 'false',
                onChange: (m) => d.setFieldValue('isPublic', m === 'true'),
                label: 'Note visibility',
                description: 'Choose who can see this note',
                children: f.jsxs(cr, {
                  gap: 'md',
                  mt: 'xs',
                  children: [
                    f.jsx(we, {value: 'false', label: 'Private - Only you can see this note'}),
                    f.jsx(we, {value: 'true', label: 'Public - Anyone can see this note'}),
                  ],
                }),
              }),
            f.jsxs(ar, {
              justify: 'space-between',
              mt: 'md',
              children: [
                f.jsx($e, {variant: 'subtle', onClick: r, disabled: a, children: 'Cancel'}),
                f.jsx($e, {type: 'submit', loading: a, children: 'Save Changes'}),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
yo.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'EditNoteModal',
  props: {
    note: {
      required: !0,
      tsType: {name: 'union', raw: 'Note | null', elements: [{name: 'Note'}, {name: 'null'}]},
      description: '',
    },
    isOpen: {required: !0, tsType: {name: 'boolean'}, description: ''},
    onClose: {
      required: !0,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '() => void',
        signature: {arguments: [], return: {name: 'void'}},
      },
      description: '',
    },
    onSuccess: {
      required: !0,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '() => void',
        signature: {arguments: [], return: {name: 'void'}},
      },
      description: '',
    },
    isAdmin: {required: !1, tsType: {name: 'boolean'}, description: '', defaultValue: {value: 'false', computed: !1}},
  },
};
const ho = ({
  notes: e,
  emptyMessage: t,
  showUser: r = !1,
  onNoteDeleted: n,
  onNoteUpdated: o,
  isAdmin: s = !1,
  currentUserNotes: a = [],
}) => {
  const {getToken: i} = Hr(),
    [l, c] = u.useState(null),
    [d, p] = u.useState(null),
    [m, y] = u.useState(null);
  if (e.length === 0) return f.jsx(ur, {fs: 'italic', c: 'dimmed', ta: 'center', mt: 'xl', children: t});
  const v = async (g) => {
      if (window.confirm('Are you sure you want to delete this note?')) {
        (c(g.id), p(null));
        try {
          let w;
          const E = s ? localStorage.getItem('adminApiKey') || '' : await i();
          if (s && !E) {
            (p('Admin API key not found. Please login again.'), c(null));
            return;
          }
          if (
            (s
              ? (w = await fetch(`/api/notes/${g.id}/admin`, {method: 'DELETE', headers: {'X-API-Key': E}}))
              : (g.isPublic === 'true' || g.isPublic === !0) && !g.userId
                ? (w = await fetch(`/api/public-notes/${g.id}`, {method: 'DELETE'}))
                : (w = await fetch(`/api/notes/${g.id}`, {method: 'DELETE', headers: {Authorization: `Bearer ${E}`}})),
            !w.ok)
          ) {
            const R = await w.json().catch(() => ({}));
            throw new Error(R.message || 'Failed to delete note');
          }
          n && n();
        } catch (w) {
          (console.error('Error deleting note:', w), p(w instanceof Error ? w.message : 'Failed to delete note'));
        } finally {
          c(null);
        }
      }
    },
    b = (g) => {
      if (s || (typeof g.isPublic == 'string' ? g.isPublic === 'true' : g.isPublic) || !r) return !0;
      try {
        if (JSON.parse(localStorage.getItem('userNoteIds') || '[]').includes(g.id)) return !0;
      } catch {}
      return !!a.includes(g.id);
    },
    h = (g) => {
      if (r && g.user) {
        if (g.user.firstName) return `${g.user.firstName} ${g.user.lastName || ''}`.trim();
        if (g.user.email) return g.user.email;
      }
      if (!r) return 'you';
      try {
        if (JSON.parse(localStorage.getItem('userNoteIds') || '[]').includes(g.id)) return 'you';
      } catch {}
      return a.includes(g.id) ? 'you' : g.userId ? 'a user' : 'Anonymous';
    },
    S = (g) => new Date(g).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
  return f.jsxs(f.Fragment, {
    children: [
      d && f.jsx(xt, {color: 'red', mb: 'md', onClose: () => p(null), children: d}),
      f.jsx('div', {
        style: {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem'},
        children: e.map((g) => {
          const w = typeof g.isPublic == 'string' ? g.isPublic === 'true' : g.isPublic,
            E = h(g),
            R = b(g);
          return f.jsxs(
            'div',
            {
              style: {
                background: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.15s',
                ...(!w && !s ? {borderLeft: '4px solid #a855f7'} : {}),
              },
              onMouseOver: (x) => {
                x.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)';
              },
              onMouseOut: (x) => {
                x.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
              },
              children: [
                f.jsxs('div', {
                  style: {padding: '1.25rem', flex: 1},
                  children: [
                    f.jsxs('div', {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.75rem',
                      },
                      children: [
                        f.jsx('h3', {
                          style: {
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: '#111827',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            marginRight: '0.5rem',
                            flex: 1,
                            margin: '0 0.5rem 0 0',
                          },
                          children: g.title,
                        }),
                        f.jsx('span', {
                          style: {
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            padding: '0.125rem 0.5rem',
                            borderRadius: 999,
                            flexShrink: 0,
                            background: w ? '#dcfce7' : '#f3e8ff',
                            color: w ? '#15803d' : '#7e22ce',
                          },
                          children: w ? 'Public' : 'Private',
                        }),
                      ],
                    }),
                    f.jsx('p', {
                      style: {
                        fontSize: '0.875rem',
                        color: '#4b5563',
                        marginBottom: '1rem',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        margin: '0 0 1rem 0',
                      },
                      children: g.content,
                    }),
                    f.jsxs('div', {
                      style: {display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280'},
                      children: [f.jsxs('span', {children: ['By ', E]}), f.jsx('span', {children: S(g.createdAt)})],
                    }),
                  ],
                }),
                R &&
                  f.jsxs('div', {
                    style: {
                      borderTop: '1px solid #f3f4f6',
                      background: '#f9fafb',
                      padding: '0.75rem 1.25rem',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '0.75rem',
                    },
                    children: [
                      f.jsx('button', {
                        type: 'button',
                        onClick: () => y(g),
                        style: {
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#0d9488',
                          padding: 0,
                        },
                        onMouseOver: (x) => {
                          x.currentTarget.style.color = '#0f766e';
                        },
                        onMouseOut: (x) => {
                          x.currentTarget.style.color = '#0d9488';
                        },
                        children: 'Edit',
                      }),
                      f.jsx('button', {
                        type: 'button',
                        onClick: () => v(g),
                        disabled: l === g.id,
                        style: {
                          background: 'none',
                          border: 'none',
                          cursor: l === g.id ? 'wait' : 'pointer',
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#dc2626',
                          padding: 0,
                        },
                        onMouseOver: (x) => {
                          l !== g.id && (x.currentTarget.style.color = '#b91c1c');
                        },
                        onMouseOut: (x) => {
                          x.currentTarget.style.color = '#dc2626';
                        },
                        children: l === g.id ? 'Deleting…' : 'Delete',
                      }),
                    ],
                  }),
              ],
            },
            g.id,
          );
        }),
      }),
      m &&
        f.jsx(yo, {
          note: {...m, isPublic: typeof m.isPublic == 'string' ? m.isPublic : m.isPublic ? 'true' : 'false'},
          isOpen: !!m,
          onClose: () => y(null),
          onSuccess: () => {
            (y(null), o && o());
          },
          isAdmin: s,
        }),
    ],
  });
};
ho.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'NotesGrid',
  props: {
    notes: {required: !0, tsType: {name: 'Array', elements: [{name: 'Note'}], raw: 'Note[]'}, description: ''},
    emptyMessage: {required: !0, tsType: {name: 'string'}, description: ''},
    showUser: {required: !1, tsType: {name: 'boolean'}, description: '', defaultValue: {value: 'false', computed: !1}},
    onNoteDeleted: {
      required: !1,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '() => void',
        signature: {arguments: [], return: {name: 'void'}},
      },
      description: '',
    },
    onNoteUpdated: {
      required: !1,
      tsType: {
        name: 'signature',
        type: 'function',
        raw: '() => void',
        signature: {arguments: [], return: {name: 'void'}},
      },
      description: '',
    },
    isAdmin: {required: !1, tsType: {name: 'boolean'}, description: '', defaultValue: {value: 'false', computed: !1}},
    currentUserNotes: {
      required: !1,
      tsType: {name: 'Array', elements: [{name: 'string'}], raw: 'string[]'},
      description: '',
      defaultValue: {value: '[]', computed: !1},
    },
  },
};
const Dl = {title: 'Notes/NotesGrid', component: ho},
  tt = {args: {notes: []}};
tt.parameters = {
  ...tt.parameters,
  docs: {
    ...tt.parameters?.docs,
    source: {
      originalSource: `{
  args: {
    notes: []
  }
}`,
      ...tt.parameters?.docs?.source,
    },
  },
};
const Vl = ['Empty'];
export {tt as Empty, Vl as __namedExportsOrder, Dl as default};
