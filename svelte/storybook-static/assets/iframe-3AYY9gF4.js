const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './GlobalSearch.stories-DniQXY5K.js',
      './index-C0mD0_9W.js',
      './preload-helper-PPVm8Dsz.js',
      './GlobalSearch-BSBD5yVh.css',
      './NoteModal.stories-BGjYTK2L.js',
      './NoteModal-CD54FDqW.css',
      './DocsRenderer-LL677BLK-DtpHh83m.js',
    ]),
) => i.map((i) => d[i]);
import {_ as __vitePreload} from './preload-helper-PPVm8Dsz.js';
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) o(s);
  new MutationObserver((s) => {
    for (const i of s)
      if (i.type === 'childList')
        for (const u of i.addedNodes) u.tagName === 'LINK' && u.rel === 'modulepreload' && o(u);
  }).observe(document, {childList: !0, subtree: !0});
  function r(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    );
  }
  function o(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = r(s);
    fetch(s.href, i);
  }
})();
var tl = Object.create,
  et = Object.defineProperty,
  ol = Object.getOwnPropertyDescriptor,
  nl = Object.getOwnPropertyNames,
  sl = Object.getPrototypeOf,
  il = Object.prototype.hasOwnProperty,
  n = (e, t) => et(e, 'name', {value: t, configurable: !0}),
  cr = ((e) =>
    typeof require < 'u'
      ? require
      : typeof Proxy < 'u'
        ? new Proxy(e, {get: (t, r) => (typeof require < 'u' ? require : t)[r]})
        : e)(function (e) {
    if (typeof require < 'u') return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported');
  }),
  q = (e, t) => () => (t || e((t = {exports: {}}).exports, t), t.exports),
  _e = (e, t) => {
    for (var r in t) et(e, r, {get: t[r], enumerable: !0});
  },
  al = (e, t, r, o) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let s of nl(t))
        !il.call(e, s) && s !== r && et(e, s, {get: () => t[s], enumerable: !(o = ol(t, s)) || o.enumerable});
    return e;
  },
  ue = (e, t, r) => ((r = e != null ? tl(sl(e)) : {}), al(et(r, 'default', {value: e, enumerable: !0}), e)),
  it = q((e, t) => {
    (function (r) {
      if (typeof e == 'object' && typeof t < 'u') t.exports = r();
      else if (typeof define == 'function' && define.amd) define([], r);
      else {
        var o;
        (typeof window < 'u'
          ? (o = window)
          : typeof global < 'u'
            ? (o = global)
            : typeof self < 'u'
              ? (o = self)
              : (o = this),
          (o.memoizerific = r()));
      }
    })(function () {
      return n(function r(o, s, i) {
        function u(d, m) {
          if (!s[d]) {
            if (!o[d]) {
              var y = typeof cr == 'function' && cr;
              if (!m && y) return y(d, !0);
              if (l) return l(d, !0);
              var g = new Error("Cannot find module '" + d + "'");
              throw ((g.code = 'MODULE_NOT_FOUND'), g);
            }
            var S = (s[d] = {exports: {}});
            o[d][0].call(
              S.exports,
              function (T) {
                var O = o[d][1][T];
                return u(O || T);
              },
              S,
              S.exports,
              r,
              o,
              s,
              i,
            );
          }
          return s[d].exports;
        }
        n(u, 's');
        for (var l = typeof cr == 'function' && cr, p = 0; p < i.length; p++) u(i[p]);
        return u;
      }, 'e')(
        {
          1: [
            function (r, o, s) {
              o.exports = function (i) {
                if (typeof Map != 'function' || i) {
                  var u = r('./similar');
                  return new u();
                } else return new Map();
              };
            },
            {'./similar': 2},
          ],
          2: [
            function (r, o, s) {
              function i() {
                return ((this.list = []), (this.lastItem = void 0), (this.size = 0), this);
              }
              (n(i, 'Similar'),
                (i.prototype.get = function (u) {
                  var l;
                  if (this.lastItem && this.isEqual(this.lastItem.key, u)) return this.lastItem.val;
                  if (((l = this.indexOf(u)), l >= 0)) return ((this.lastItem = this.list[l]), this.list[l].val);
                }),
                (i.prototype.set = function (u, l) {
                  var p;
                  return this.lastItem && this.isEqual(this.lastItem.key, u)
                    ? ((this.lastItem.val = l), this)
                    : ((p = this.indexOf(u)),
                      p >= 0
                        ? ((this.lastItem = this.list[p]), (this.list[p].val = l), this)
                        : ((this.lastItem = {key: u, val: l}), this.list.push(this.lastItem), this.size++, this));
                }),
                (i.prototype.delete = function (u) {
                  var l;
                  if (
                    (this.lastItem && this.isEqual(this.lastItem.key, u) && (this.lastItem = void 0),
                    (l = this.indexOf(u)),
                    l >= 0)
                  )
                    return (this.size--, this.list.splice(l, 1)[0]);
                }),
                (i.prototype.has = function (u) {
                  var l;
                  return this.lastItem && this.isEqual(this.lastItem.key, u)
                    ? !0
                    : ((l = this.indexOf(u)), l >= 0 ? ((this.lastItem = this.list[l]), !0) : !1);
                }),
                (i.prototype.forEach = function (u, l) {
                  var p;
                  for (p = 0; p < this.size; p++) u.call(l || this, this.list[p].val, this.list[p].key, this);
                }),
                (i.prototype.indexOf = function (u) {
                  var l;
                  for (l = 0; l < this.size; l++) if (this.isEqual(this.list[l].key, u)) return l;
                  return -1;
                }),
                (i.prototype.isEqual = function (u, l) {
                  return u === l || (u !== u && l !== l);
                }),
                (o.exports = i));
            },
            {},
          ],
          3: [
            function (r, o, s) {
              var i = r('map-or-similar');
              o.exports = function (d) {
                var m = new i(!1),
                  y = [];
                return function (g) {
                  var S = n(function () {
                    var T = m,
                      O,
                      C,
                      D = arguments.length - 1,
                      R = Array(D + 1),
                      x = !0,
                      J;
                    if ((S.numArgs || S.numArgs === 0) && S.numArgs !== D + 1)
                      throw new Error(
                        'Memoizerific functions should always be called with the same number of arguments',
                      );
                    for (J = 0; J < D; J++) {
                      if (((R[J] = {cacheItem: T, arg: arguments[J]}), T.has(arguments[J]))) {
                        T = T.get(arguments[J]);
                        continue;
                      }
                      ((x = !1), (O = new i(!1)), T.set(arguments[J], O), (T = O));
                    }
                    return (
                      x && (T.has(arguments[D]) ? (C = T.get(arguments[D])) : (x = !1)),
                      x || ((C = g.apply(null, arguments)), T.set(arguments[D], C)),
                      d > 0 &&
                        ((R[D] = {cacheItem: T, arg: arguments[D]}),
                        x ? u(y, R) : y.push(R),
                        y.length > d && l(y.shift())),
                      (S.wasMemoized = x),
                      (S.numArgs = D + 1),
                      C
                    );
                  }, 'memoizerific');
                  return ((S.limit = d), (S.wasMemoized = !1), (S.cache = m), (S.lru = y), S);
                };
              };
              function u(d, m) {
                var y = d.length,
                  g = m.length,
                  S,
                  T,
                  O;
                for (T = 0; T < y; T++) {
                  for (S = !0, O = 0; O < g; O++)
                    if (!p(d[T][O].arg, m[O].arg)) {
                      S = !1;
                      break;
                    }
                  if (S) break;
                }
                d.push(d.splice(T, 1)[0]);
              }
              n(u, 'moveToMostRecentLru');
              function l(d) {
                var m = d.length,
                  y = d[m - 1],
                  g,
                  S;
                for (
                  y.cacheItem.delete(y.arg), S = m - 2;
                  S >= 0 && ((y = d[S]), (g = y.cacheItem.get(y.arg)), !g || !g.size);
                  S--
                )
                  y.cacheItem.delete(y.arg);
              }
              n(l, 'removeCachedResult');
              function p(d, m) {
                return d === m || (d !== d && m !== m);
              }
              n(p, 'isEqual');
            },
            {'map-or-similar': 1},
          ],
        },
        {},
        [3],
      )(3);
    });
  }),
  wi = q((e) => {
    (Object.defineProperty(e, '__esModule', {value: !0}),
      (e.isEqual = (function () {
        var t = Object.prototype.toString,
          r = Object.getPrototypeOf,
          o = Object.getOwnPropertySymbols
            ? function (s) {
                return Object.keys(s).concat(Object.getOwnPropertySymbols(s));
              }
            : Object.keys;
        return function (s, i) {
          return n(function u(l, p, d) {
            var m,
              y,
              g,
              S = t.call(l),
              T = t.call(p);
            if (l === p) return !0;
            if (l == null || p == null) return !1;
            if (d.indexOf(l) > -1 && d.indexOf(p) > -1) return !0;
            if (
              (d.push(l, p),
              S != T ||
                ((m = o(l)),
                (y = o(p)),
                m.length != y.length ||
                  m.some(function (O) {
                    return !u(l[O], p[O], d);
                  })))
            )
              return !1;
            switch (S.slice(8, -1)) {
              case 'Symbol':
                return l.valueOf() == p.valueOf();
              case 'Date':
              case 'Number':
                return +l == +p || (+l != +l && +p != +p);
              case 'RegExp':
              case 'Function':
              case 'String':
              case 'Boolean':
                return '' + l == '' + p;
              case 'Set':
              case 'Map':
                ((m = l.entries()), (y = p.entries()));
                do if (!u((g = m.next()).value, y.next().value, d)) return !1;
                while (!g.done);
                return !0;
              case 'ArrayBuffer':
                ((l = new Uint8Array(l)), (p = new Uint8Array(p)));
              case 'DataView':
                ((l = new Uint8Array(l.buffer)), (p = new Uint8Array(p.buffer)));
              case 'Float32Array':
              case 'Float64Array':
              case 'Int8Array':
              case 'Int16Array':
              case 'Int32Array':
              case 'Uint8Array':
              case 'Uint16Array':
              case 'Uint32Array':
              case 'Uint8ClampedArray':
              case 'Arguments':
              case 'Array':
                if (l.length != p.length) return !1;
                for (g = 0; g < l.length; g++)
                  if ((g in l || g in p) && (g in l != g in p || !u(l[g], p[g], d))) return !1;
                return !0;
              case 'Object':
                return u(r(l), r(p), d);
              default:
                return !1;
            }
          }, 'n')(s, i, []);
        };
      })()));
  }),
  qn = q((e) => {
    (Object.defineProperty(e, '__esModule', {value: !0}), (e.encodeString = o));
    var t = Array.from({length: 256}, (s, i) => '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase()),
      r = new Int8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0,
      ]);
    function o(s) {
      let i = s.length;
      if (i === 0) return '';
      let u = '',
        l = 0,
        p = 0;
      e: for (; p < i; p++) {
        let d = s.charCodeAt(p);
        for (; d < 128; ) {
          if ((r[d] !== 1 && (l < p && (u += s.slice(l, p)), (l = p + 1), (u += t[d])), ++p === i)) break e;
          d = s.charCodeAt(p);
        }
        if ((l < p && (u += s.slice(l, p)), d < 2048)) {
          ((l = p + 1), (u += t[192 | (d >> 6)] + t[128 | (d & 63)]));
          continue;
        }
        if (d < 55296 || d >= 57344) {
          ((l = p + 1), (u += t[224 | (d >> 12)] + t[128 | ((d >> 6) & 63)] + t[128 | (d & 63)]));
          continue;
        }
        if ((++p, p >= i)) throw new Error('URI malformed');
        let m = s.charCodeAt(p) & 1023;
        ((l = p + 1),
          (d = 65536 + (((d & 1023) << 10) | m)),
          (u += t[240 | (d >> 18)] + t[128 | ((d >> 12) & 63)] + t[128 | ((d >> 6) & 63)] + t[128 | (d & 63)]));
      }
      return l === 0 ? s : l < i ? u + s.slice(l) : u;
    }
    n(o, 'encodeString');
  }),
  It = q((e) => {
    (Object.defineProperty(e, '__esModule', {value: !0}),
      (e.defaultOptions = e.defaultShouldSerializeObject = e.defaultValueSerializer = void 0));
    var t = qn(),
      r = n((i) => {
        switch (typeof i) {
          case 'string':
            return (0, t.encodeString)(i);
          case 'bigint':
          case 'boolean':
            return '' + i;
          case 'number':
            if (Number.isFinite(i)) return i < 1e21 ? '' + i : (0, t.encodeString)('' + i);
            break;
        }
        return i instanceof Date ? (0, t.encodeString)(i.toISOString()) : '';
      }, 'defaultValueSerializer');
    e.defaultValueSerializer = r;
    var o = n((i) => i instanceof Date, 'defaultShouldSerializeObject');
    e.defaultShouldSerializeObject = o;
    var s = n((i) => i, 'identityFunc');
    e.defaultOptions = {
      nesting: !0,
      nestingSyntax: 'dot',
      arrayRepeat: !1,
      arrayRepeatSyntax: 'repeat',
      delimiter: 38,
      valueDeserializer: s,
      valueSerializer: e.defaultValueSerializer,
      keyDeserializer: s,
      shouldSerializeObject: e.defaultShouldSerializeObject,
    };
  }),
  Vn = q((e) => {
    (Object.defineProperty(e, '__esModule', {value: !0}), (e.getDeepObject = s), (e.stringifyObject = m));
    var t = It(),
      r = qn();
    function o(y) {
      return y === '__proto__' || y === 'constructor' || y === 'prototype';
    }
    n(o, 'isPrototypeKey');
    function s(y, g, S, T, O) {
      if (o(g)) return y;
      let C = y[g];
      return typeof C == 'object' && C !== null
        ? C
        : !T && (O || typeof S == 'number' || (typeof S == 'string' && S * 0 === 0 && S.indexOf('.') === -1))
          ? (y[g] = [])
          : (y[g] = {});
    }
    n(s, 'getDeepObject');
    var i = 20,
      u = '[]',
      l = '[',
      p = ']',
      d = '.';
    function m(y, g, S = 0, T, O) {
      let {
          nestingSyntax: C = t.defaultOptions.nestingSyntax,
          arrayRepeat: D = t.defaultOptions.arrayRepeat,
          arrayRepeatSyntax: R = t.defaultOptions.arrayRepeatSyntax,
          nesting: x = t.defaultOptions.nesting,
          delimiter: J = t.defaultOptions.delimiter,
          valueSerializer: K = t.defaultOptions.valueSerializer,
          shouldSerializeObject: M = t.defaultOptions.shouldSerializeObject,
        } = g,
        se = typeof J == 'number' ? String.fromCharCode(J) : J,
        ne = O === !0 && D,
        le = C === 'dot' || (C === 'js' && !O);
      if (S > i) return '';
      let ce = '',
        de = !0,
        B = !1;
      for (let N in y) {
        let v = y[N],
          A;
        (T
          ? ((A = T), ne ? R === 'bracket' && (A += u) : le ? ((A += d), (A += N)) : ((A += l), (A += N), (A += p)))
          : (A = N),
          de || (ce += se),
          typeof v == 'object' && v !== null && !M(v)
            ? ((B = v.pop !== void 0), (x || (D && B)) && (ce += m(v, g, S + 1, A, B)))
            : ((ce += (0, r.encodeString)(A)), (ce += '='), (ce += K(v, N))),
          de && (de = !1));
      }
      return ce;
    }
    n(m, 'stringifyObject');
  }),
  na = q((e, t) => {
    var r = 12,
      o = 0,
      s = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
        5, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 24, 36, 48, 60, 72, 84, 96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 127, 63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7,
      ];
    function i(p) {
      var d = p.indexOf('%');
      if (d === -1) return p;
      for (var m = p.length, y = '', g = 0, S = 0, T = d, O = r; d > -1 && d < m; ) {
        var C = l(p[d + 1], 4),
          D = l(p[d + 2], 0),
          R = C | D,
          x = s[R];
        if (((O = s[256 + O + x]), (S = (S << 6) | (R & s[364 + x])), O === r))
          ((y += p.slice(g, T)),
            (y += S <= 65535 ? String.fromCharCode(S) : String.fromCharCode(55232 + (S >> 10), 56320 + (S & 1023))),
            (S = 0),
            (g = d + 3),
            (d = T = p.indexOf('%', g)));
        else {
          if (O === o) return null;
          if (((d += 3), d < m && p.charCodeAt(d) === 37)) continue;
          return null;
        }
      }
      return y + p.slice(g);
    }
    n(i, 'decodeURIComponent');
    var u = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15,
    };
    function l(p, d) {
      var m = u[p];
      return m === void 0 ? 255 : m << d;
    }
    (n(l, 'hexCodeToInt'), (t.exports = i));
  }),
  la = q((e) => {
    var t =
      (e && e.__importDefault) ||
      function (y) {
        return y && y.__esModule ? y : {default: y};
      };
    (Object.defineProperty(e, '__esModule', {value: !0}),
      (e.numberValueDeserializer = e.numberKeyDeserializer = void 0),
      (e.parse = m));
    var r = Vn(),
      o = It(),
      s = t(na()),
      i = n((y) => {
        let g = Number(y);
        return Number.isNaN(g) ? y : g;
      }, 'numberKeyDeserializer');
    e.numberKeyDeserializer = i;
    var u = n((y) => {
      let g = Number(y);
      return Number.isNaN(g) ? y : g;
    }, 'numberValueDeserializer');
    e.numberValueDeserializer = u;
    var l = /\+/g,
      p = n(function () {}, 'Empty');
    p.prototype = Object.create(null);
    function d(y, g, S, T, O) {
      let C = y.substring(g, S);
      return (T && (C = C.replace(l, ' ')), O && (C = (0, s.default)(C) || C), C);
    }
    n(d, 'computeKeySlice');
    function m(y, g) {
      let {
          valueDeserializer: S = o.defaultOptions.valueDeserializer,
          keyDeserializer: T = o.defaultOptions.keyDeserializer,
          arrayRepeatSyntax: O = o.defaultOptions.arrayRepeatSyntax,
          nesting: C = o.defaultOptions.nesting,
          arrayRepeat: D = o.defaultOptions.arrayRepeat,
          nestingSyntax: R = o.defaultOptions.nestingSyntax,
          delimiter: x = o.defaultOptions.delimiter,
        } = g ?? {},
        J = typeof x == 'string' ? x.charCodeAt(0) : x,
        K = R === 'js',
        M = new p();
      if (typeof y != 'string') return M;
      let se = y.length,
        ne = '',
        le = -1,
        ce = -1,
        de = -1,
        B = M,
        N,
        v = '',
        A = '',
        P = !1,
        F = !1,
        H = !1,
        pe = !1,
        we = !1,
        ve = !1,
        he = !1,
        qe = 0,
        Mt = -1,
        Bt = -1,
        Vt = -1;
      for (let Ve = 0; Ve < se + 1; Ve++) {
        if (((qe = Ve !== se ? y.charCodeAt(Ve) : J), qe === J)) {
          if (
            ((he = ce > le),
            he || (ce = Ve),
            de !== ce - 1 &&
              ((A = d(y, de + 1, Mt > -1 ? Mt : ce, H, P)),
              (v = T(A)),
              N !== void 0 && (B = (0, r.getDeepObject)(B, N, v, K && we, K && ve))),
            he || v !== '')
          ) {
            he && ((ne = y.slice(ce + 1, Ve)), pe && (ne = ne.replace(l, ' ')), F && (ne = (0, s.default)(ne) || ne));
            let Ft = S(ne, v);
            if (D) {
              let qt = B[v];
              qt === void 0 ? (Mt > -1 ? (B[v] = [Ft]) : (B[v] = Ft)) : qt.pop ? qt.push(Ft) : (B[v] = [qt, Ft]);
            } else B[v] = Ft;
          }
          ((ne = ''),
            (le = Ve),
            (ce = Ve),
            (P = !1),
            (F = !1),
            (H = !1),
            (pe = !1),
            (we = !1),
            (ve = !1),
            (Mt = -1),
            (de = Ve),
            (B = M),
            (N = void 0),
            (v = ''));
        } else
          qe === 93
            ? (D && O === 'bracket' && Vt === 91 && (Mt = Bt),
              C &&
                (R === 'index' || K) &&
                ce <= le &&
                (de !== Bt &&
                  ((A = d(y, de + 1, Ve, H, P)),
                  (v = T(A)),
                  N !== void 0 && (B = (0, r.getDeepObject)(B, N, v, void 0, K)),
                  (N = v),
                  (H = !1),
                  (P = !1)),
                (de = Ve),
                (ve = !0),
                (we = !1)))
            : qe === 46
              ? C &&
                (R === 'dot' || K) &&
                ce <= le &&
                (de !== Bt &&
                  ((A = d(y, de + 1, Ve, H, P)),
                  (v = T(A)),
                  N !== void 0 && (B = (0, r.getDeepObject)(B, N, v, K)),
                  (N = v),
                  (H = !1),
                  (P = !1)),
                (we = !0),
                (ve = !1),
                (de = Ve))
              : qe === 91
                ? C &&
                  (R === 'index' || K) &&
                  ce <= le &&
                  (de !== Bt &&
                    ((A = d(y, de + 1, Ve, H, P)),
                    (v = T(A)),
                    K && N !== void 0 && (B = (0, r.getDeepObject)(B, N, v, K)),
                    (N = v),
                    (H = !1),
                    (P = !1),
                    (we = !1),
                    (ve = !0)),
                  (de = Ve))
                : qe === 61
                  ? ce <= le
                    ? (ce = Ve)
                    : (F = !0)
                  : qe === 43
                    ? ce > le
                      ? (pe = !0)
                      : (H = !0)
                    : qe === 37 && (ce > le ? (F = !0) : (P = !0));
        ((Bt = Ve), (Vt = qe));
      }
      return M;
    }
    n(m, 'parse');
  }),
  ca = q((e) => {
    (Object.defineProperty(e, '__esModule', {value: !0}), (e.stringify = r));
    var t = Vn();
    function r(o, s) {
      if (o === null || typeof o != 'object') return '';
      let i = s ?? {};
      return (0, t.stringifyObject)(o, i);
    }
    n(r, 'stringify');
  }),
  kt = q((e) => {
    var t =
        (e && e.__createBinding) ||
        (Object.create
          ? function (i, u, l, p) {
              p === void 0 && (p = l);
              var d = Object.getOwnPropertyDescriptor(u, l);
              ((!d || ('get' in d ? !u.__esModule : d.writable || d.configurable)) &&
                (d = {
                  enumerable: !0,
                  get: n(function () {
                    return u[l];
                  }, 'get'),
                }),
                Object.defineProperty(i, p, d));
            }
          : function (i, u, l, p) {
              (p === void 0 && (p = l), (i[p] = u[l]));
            }),
      r =
        (e && e.__exportStar) ||
        function (i, u) {
          for (var l in i) l !== 'default' && !Object.prototype.hasOwnProperty.call(u, l) && t(u, i, l);
        };
    (Object.defineProperty(e, '__esModule', {value: !0}), (e.stringify = e.parse = void 0));
    var o = la();
    Object.defineProperty(e, 'parse', {
      enumerable: !0,
      get: n(function () {
        return o.parse;
      }, 'get'),
    });
    var s = ca();
    (Object.defineProperty(e, 'stringify', {
      enumerable: !0,
      get: n(function () {
        return s.stringify;
      }, 'get'),
    }),
      r(It(), e));
  }),
  Kn = q((e, t) => {
    t.exports = {
      Aacute: 'Á',
      aacute: 'á',
      Abreve: 'Ă',
      abreve: 'ă',
      ac: '∾',
      acd: '∿',
      acE: '∾̳',
      Acirc: 'Â',
      acirc: 'â',
      acute: '´',
      Acy: 'А',
      acy: 'а',
      AElig: 'Æ',
      aelig: 'æ',
      af: '⁡',
      Afr: '𝔄',
      afr: '𝔞',
      Agrave: 'À',
      agrave: 'à',
      alefsym: 'ℵ',
      aleph: 'ℵ',
      Alpha: 'Α',
      alpha: 'α',
      Amacr: 'Ā',
      amacr: 'ā',
      amalg: '⨿',
      amp: '&',
      AMP: '&',
      andand: '⩕',
      And: '⩓',
      and: '∧',
      andd: '⩜',
      andslope: '⩘',
      andv: '⩚',
      ang: '∠',
      ange: '⦤',
      angle: '∠',
      angmsdaa: '⦨',
      angmsdab: '⦩',
      angmsdac: '⦪',
      angmsdad: '⦫',
      angmsdae: '⦬',
      angmsdaf: '⦭',
      angmsdag: '⦮',
      angmsdah: '⦯',
      angmsd: '∡',
      angrt: '∟',
      angrtvb: '⊾',
      angrtvbd: '⦝',
      angsph: '∢',
      angst: 'Å',
      angzarr: '⍼',
      Aogon: 'Ą',
      aogon: 'ą',
      Aopf: '𝔸',
      aopf: '𝕒',
      apacir: '⩯',
      ap: '≈',
      apE: '⩰',
      ape: '≊',
      apid: '≋',
      apos: "'",
      ApplyFunction: '⁡',
      approx: '≈',
      approxeq: '≊',
      Aring: 'Å',
      aring: 'å',
      Ascr: '𝒜',
      ascr: '𝒶',
      Assign: '≔',
      ast: '*',
      asymp: '≈',
      asympeq: '≍',
      Atilde: 'Ã',
      atilde: 'ã',
      Auml: 'Ä',
      auml: 'ä',
      awconint: '∳',
      awint: '⨑',
      backcong: '≌',
      backepsilon: '϶',
      backprime: '‵',
      backsim: '∽',
      backsimeq: '⋍',
      Backslash: '∖',
      Barv: '⫧',
      barvee: '⊽',
      barwed: '⌅',
      Barwed: '⌆',
      barwedge: '⌅',
      bbrk: '⎵',
      bbrktbrk: '⎶',
      bcong: '≌',
      Bcy: 'Б',
      bcy: 'б',
      bdquo: '„',
      becaus: '∵',
      because: '∵',
      Because: '∵',
      bemptyv: '⦰',
      bepsi: '϶',
      bernou: 'ℬ',
      Bernoullis: 'ℬ',
      Beta: 'Β',
      beta: 'β',
      beth: 'ℶ',
      between: '≬',
      Bfr: '𝔅',
      bfr: '𝔟',
      bigcap: '⋂',
      bigcirc: '◯',
      bigcup: '⋃',
      bigodot: '⨀',
      bigoplus: '⨁',
      bigotimes: '⨂',
      bigsqcup: '⨆',
      bigstar: '★',
      bigtriangledown: '▽',
      bigtriangleup: '△',
      biguplus: '⨄',
      bigvee: '⋁',
      bigwedge: '⋀',
      bkarow: '⤍',
      blacklozenge: '⧫',
      blacksquare: '▪',
      blacktriangle: '▴',
      blacktriangledown: '▾',
      blacktriangleleft: '◂',
      blacktriangleright: '▸',
      blank: '␣',
      blk12: '▒',
      blk14: '░',
      blk34: '▓',
      block: '█',
      bne: '=⃥',
      bnequiv: '≡⃥',
      bNot: '⫭',
      bnot: '⌐',
      Bopf: '𝔹',
      bopf: '𝕓',
      bot: '⊥',
      bottom: '⊥',
      bowtie: '⋈',
      boxbox: '⧉',
      boxdl: '┐',
      boxdL: '╕',
      boxDl: '╖',
      boxDL: '╗',
      boxdr: '┌',
      boxdR: '╒',
      boxDr: '╓',
      boxDR: '╔',
      boxh: '─',
      boxH: '═',
      boxhd: '┬',
      boxHd: '╤',
      boxhD: '╥',
      boxHD: '╦',
      boxhu: '┴',
      boxHu: '╧',
      boxhU: '╨',
      boxHU: '╩',
      boxminus: '⊟',
      boxplus: '⊞',
      boxtimes: '⊠',
      boxul: '┘',
      boxuL: '╛',
      boxUl: '╜',
      boxUL: '╝',
      boxur: '└',
      boxuR: '╘',
      boxUr: '╙',
      boxUR: '╚',
      boxv: '│',
      boxV: '║',
      boxvh: '┼',
      boxvH: '╪',
      boxVh: '╫',
      boxVH: '╬',
      boxvl: '┤',
      boxvL: '╡',
      boxVl: '╢',
      boxVL: '╣',
      boxvr: '├',
      boxvR: '╞',
      boxVr: '╟',
      boxVR: '╠',
      bprime: '‵',
      breve: '˘',
      Breve: '˘',
      brvbar: '¦',
      bscr: '𝒷',
      Bscr: 'ℬ',
      bsemi: '⁏',
      bsim: '∽',
      bsime: '⋍',
      bsolb: '⧅',
      bsol: '\\',
      bsolhsub: '⟈',
      bull: '•',
      bullet: '•',
      bump: '≎',
      bumpE: '⪮',
      bumpe: '≏',
      Bumpeq: '≎',
      bumpeq: '≏',
      Cacute: 'Ć',
      cacute: 'ć',
      capand: '⩄',
      capbrcup: '⩉',
      capcap: '⩋',
      cap: '∩',
      Cap: '⋒',
      capcup: '⩇',
      capdot: '⩀',
      CapitalDifferentialD: 'ⅅ',
      caps: '∩︀',
      caret: '⁁',
      caron: 'ˇ',
      Cayleys: 'ℭ',
      ccaps: '⩍',
      Ccaron: 'Č',
      ccaron: 'č',
      Ccedil: 'Ç',
      ccedil: 'ç',
      Ccirc: 'Ĉ',
      ccirc: 'ĉ',
      Cconint: '∰',
      ccups: '⩌',
      ccupssm: '⩐',
      Cdot: 'Ċ',
      cdot: 'ċ',
      cedil: '¸',
      Cedilla: '¸',
      cemptyv: '⦲',
      cent: '¢',
      centerdot: '·',
      CenterDot: '·',
      cfr: '𝔠',
      Cfr: 'ℭ',
      CHcy: 'Ч',
      chcy: 'ч',
      check: '✓',
      checkmark: '✓',
      Chi: 'Χ',
      chi: 'χ',
      circ: 'ˆ',
      circeq: '≗',
      circlearrowleft: '↺',
      circlearrowright: '↻',
      circledast: '⊛',
      circledcirc: '⊚',
      circleddash: '⊝',
      CircleDot: '⊙',
      circledR: '®',
      circledS: 'Ⓢ',
      CircleMinus: '⊖',
      CirclePlus: '⊕',
      CircleTimes: '⊗',
      cir: '○',
      cirE: '⧃',
      cire: '≗',
      cirfnint: '⨐',
      cirmid: '⫯',
      cirscir: '⧂',
      ClockwiseContourIntegral: '∲',
      CloseCurlyDoubleQuote: '”',
      CloseCurlyQuote: '’',
      clubs: '♣',
      clubsuit: '♣',
      colon: ':',
      Colon: '∷',
      Colone: '⩴',
      colone: '≔',
      coloneq: '≔',
      comma: ',',
      commat: '@',
      comp: '∁',
      compfn: '∘',
      complement: '∁',
      complexes: 'ℂ',
      cong: '≅',
      congdot: '⩭',
      Congruent: '≡',
      conint: '∮',
      Conint: '∯',
      ContourIntegral: '∮',
      copf: '𝕔',
      Copf: 'ℂ',
      coprod: '∐',
      Coproduct: '∐',
      copy: '©',
      COPY: '©',
      copysr: '℗',
      CounterClockwiseContourIntegral: '∳',
      crarr: '↵',
      cross: '✗',
      Cross: '⨯',
      Cscr: '𝒞',
      cscr: '𝒸',
      csub: '⫏',
      csube: '⫑',
      csup: '⫐',
      csupe: '⫒',
      ctdot: '⋯',
      cudarrl: '⤸',
      cudarrr: '⤵',
      cuepr: '⋞',
      cuesc: '⋟',
      cularr: '↶',
      cularrp: '⤽',
      cupbrcap: '⩈',
      cupcap: '⩆',
      CupCap: '≍',
      cup: '∪',
      Cup: '⋓',
      cupcup: '⩊',
      cupdot: '⊍',
      cupor: '⩅',
      cups: '∪︀',
      curarr: '↷',
      curarrm: '⤼',
      curlyeqprec: '⋞',
      curlyeqsucc: '⋟',
      curlyvee: '⋎',
      curlywedge: '⋏',
      curren: '¤',
      curvearrowleft: '↶',
      curvearrowright: '↷',
      cuvee: '⋎',
      cuwed: '⋏',
      cwconint: '∲',
      cwint: '∱',
      cylcty: '⌭',
      dagger: '†',
      Dagger: '‡',
      daleth: 'ℸ',
      darr: '↓',
      Darr: '↡',
      dArr: '⇓',
      dash: '‐',
      Dashv: '⫤',
      dashv: '⊣',
      dbkarow: '⤏',
      dblac: '˝',
      Dcaron: 'Ď',
      dcaron: 'ď',
      Dcy: 'Д',
      dcy: 'д',
      ddagger: '‡',
      ddarr: '⇊',
      DD: 'ⅅ',
      dd: 'ⅆ',
      DDotrahd: '⤑',
      ddotseq: '⩷',
      deg: '°',
      Del: '∇',
      Delta: 'Δ',
      delta: 'δ',
      demptyv: '⦱',
      dfisht: '⥿',
      Dfr: '𝔇',
      dfr: '𝔡',
      dHar: '⥥',
      dharl: '⇃',
      dharr: '⇂',
      DiacriticalAcute: '´',
      DiacriticalDot: '˙',
      DiacriticalDoubleAcute: '˝',
      DiacriticalGrave: '`',
      DiacriticalTilde: '˜',
      diam: '⋄',
      diamond: '⋄',
      Diamond: '⋄',
      diamondsuit: '♦',
      diams: '♦',
      die: '¨',
      DifferentialD: 'ⅆ',
      digamma: 'ϝ',
      disin: '⋲',
      div: '÷',
      divide: '÷',
      divideontimes: '⋇',
      divonx: '⋇',
      DJcy: 'Ђ',
      djcy: 'ђ',
      dlcorn: '⌞',
      dlcrop: '⌍',
      dollar: '$',
      Dopf: '𝔻',
      dopf: '𝕕',
      Dot: '¨',
      dot: '˙',
      DotDot: '⃜',
      doteq: '≐',
      doteqdot: '≑',
      DotEqual: '≐',
      dotminus: '∸',
      dotplus: '∔',
      dotsquare: '⊡',
      doublebarwedge: '⌆',
      DoubleContourIntegral: '∯',
      DoubleDot: '¨',
      DoubleDownArrow: '⇓',
      DoubleLeftArrow: '⇐',
      DoubleLeftRightArrow: '⇔',
      DoubleLeftTee: '⫤',
      DoubleLongLeftArrow: '⟸',
      DoubleLongLeftRightArrow: '⟺',
      DoubleLongRightArrow: '⟹',
      DoubleRightArrow: '⇒',
      DoubleRightTee: '⊨',
      DoubleUpArrow: '⇑',
      DoubleUpDownArrow: '⇕',
      DoubleVerticalBar: '∥',
      DownArrowBar: '⤓',
      downarrow: '↓',
      DownArrow: '↓',
      Downarrow: '⇓',
      DownArrowUpArrow: '⇵',
      DownBreve: '̑',
      downdownarrows: '⇊',
      downharpoonleft: '⇃',
      downharpoonright: '⇂',
      DownLeftRightVector: '⥐',
      DownLeftTeeVector: '⥞',
      DownLeftVectorBar: '⥖',
      DownLeftVector: '↽',
      DownRightTeeVector: '⥟',
      DownRightVectorBar: '⥗',
      DownRightVector: '⇁',
      DownTeeArrow: '↧',
      DownTee: '⊤',
      drbkarow: '⤐',
      drcorn: '⌟',
      drcrop: '⌌',
      Dscr: '𝒟',
      dscr: '𝒹',
      DScy: 'Ѕ',
      dscy: 'ѕ',
      dsol: '⧶',
      Dstrok: 'Đ',
      dstrok: 'đ',
      dtdot: '⋱',
      dtri: '▿',
      dtrif: '▾',
      duarr: '⇵',
      duhar: '⥯',
      dwangle: '⦦',
      DZcy: 'Џ',
      dzcy: 'џ',
      dzigrarr: '⟿',
      Eacute: 'É',
      eacute: 'é',
      easter: '⩮',
      Ecaron: 'Ě',
      ecaron: 'ě',
      Ecirc: 'Ê',
      ecirc: 'ê',
      ecir: '≖',
      ecolon: '≕',
      Ecy: 'Э',
      ecy: 'э',
      eDDot: '⩷',
      Edot: 'Ė',
      edot: 'ė',
      eDot: '≑',
      ee: 'ⅇ',
      efDot: '≒',
      Efr: '𝔈',
      efr: '𝔢',
      eg: '⪚',
      Egrave: 'È',
      egrave: 'è',
      egs: '⪖',
      egsdot: '⪘',
      el: '⪙',
      Element: '∈',
      elinters: '⏧',
      ell: 'ℓ',
      els: '⪕',
      elsdot: '⪗',
      Emacr: 'Ē',
      emacr: 'ē',
      empty: '∅',
      emptyset: '∅',
      EmptySmallSquare: '◻',
      emptyv: '∅',
      EmptyVerySmallSquare: '▫',
      emsp13: ' ',
      emsp14: ' ',
      emsp: ' ',
      ENG: 'Ŋ',
      eng: 'ŋ',
      ensp: ' ',
      Eogon: 'Ę',
      eogon: 'ę',
      Eopf: '𝔼',
      eopf: '𝕖',
      epar: '⋕',
      eparsl: '⧣',
      eplus: '⩱',
      epsi: 'ε',
      Epsilon: 'Ε',
      epsilon: 'ε',
      epsiv: 'ϵ',
      eqcirc: '≖',
      eqcolon: '≕',
      eqsim: '≂',
      eqslantgtr: '⪖',
      eqslantless: '⪕',
      Equal: '⩵',
      equals: '=',
      EqualTilde: '≂',
      equest: '≟',
      Equilibrium: '⇌',
      equiv: '≡',
      equivDD: '⩸',
      eqvparsl: '⧥',
      erarr: '⥱',
      erDot: '≓',
      escr: 'ℯ',
      Escr: 'ℰ',
      esdot: '≐',
      Esim: '⩳',
      esim: '≂',
      Eta: 'Η',
      eta: 'η',
      ETH: 'Ð',
      eth: 'ð',
      Euml: 'Ë',
      euml: 'ë',
      euro: '€',
      excl: '!',
      exist: '∃',
      Exists: '∃',
      expectation: 'ℰ',
      exponentiale: 'ⅇ',
      ExponentialE: 'ⅇ',
      fallingdotseq: '≒',
      Fcy: 'Ф',
      fcy: 'ф',
      female: '♀',
      ffilig: 'ﬃ',
      fflig: 'ﬀ',
      ffllig: 'ﬄ',
      Ffr: '𝔉',
      ffr: '𝔣',
      filig: 'ﬁ',
      FilledSmallSquare: '◼',
      FilledVerySmallSquare: '▪',
      fjlig: 'fj',
      flat: '♭',
      fllig: 'ﬂ',
      fltns: '▱',
      fnof: 'ƒ',
      Fopf: '𝔽',
      fopf: '𝕗',
      forall: '∀',
      ForAll: '∀',
      fork: '⋔',
      forkv: '⫙',
      Fouriertrf: 'ℱ',
      fpartint: '⨍',
      frac12: '½',
      frac13: '⅓',
      frac14: '¼',
      frac15: '⅕',
      frac16: '⅙',
      frac18: '⅛',
      frac23: '⅔',
      frac25: '⅖',
      frac34: '¾',
      frac35: '⅗',
      frac38: '⅜',
      frac45: '⅘',
      frac56: '⅚',
      frac58: '⅝',
      frac78: '⅞',
      frasl: '⁄',
      frown: '⌢',
      fscr: '𝒻',
      Fscr: 'ℱ',
      gacute: 'ǵ',
      Gamma: 'Γ',
      gamma: 'γ',
      Gammad: 'Ϝ',
      gammad: 'ϝ',
      gap: '⪆',
      Gbreve: 'Ğ',
      gbreve: 'ğ',
      Gcedil: 'Ģ',
      Gcirc: 'Ĝ',
      gcirc: 'ĝ',
      Gcy: 'Г',
      gcy: 'г',
      Gdot: 'Ġ',
      gdot: 'ġ',
      ge: '≥',
      gE: '≧',
      gEl: '⪌',
      gel: '⋛',
      geq: '≥',
      geqq: '≧',
      geqslant: '⩾',
      gescc: '⪩',
      ges: '⩾',
      gesdot: '⪀',
      gesdoto: '⪂',
      gesdotol: '⪄',
      gesl: '⋛︀',
      gesles: '⪔',
      Gfr: '𝔊',
      gfr: '𝔤',
      gg: '≫',
      Gg: '⋙',
      ggg: '⋙',
      gimel: 'ℷ',
      GJcy: 'Ѓ',
      gjcy: 'ѓ',
      gla: '⪥',
      gl: '≷',
      glE: '⪒',
      glj: '⪤',
      gnap: '⪊',
      gnapprox: '⪊',
      gne: '⪈',
      gnE: '≩',
      gneq: '⪈',
      gneqq: '≩',
      gnsim: '⋧',
      Gopf: '𝔾',
      gopf: '𝕘',
      grave: '`',
      GreaterEqual: '≥',
      GreaterEqualLess: '⋛',
      GreaterFullEqual: '≧',
      GreaterGreater: '⪢',
      GreaterLess: '≷',
      GreaterSlantEqual: '⩾',
      GreaterTilde: '≳',
      Gscr: '𝒢',
      gscr: 'ℊ',
      gsim: '≳',
      gsime: '⪎',
      gsiml: '⪐',
      gtcc: '⪧',
      gtcir: '⩺',
      gt: '>',
      GT: '>',
      Gt: '≫',
      gtdot: '⋗',
      gtlPar: '⦕',
      gtquest: '⩼',
      gtrapprox: '⪆',
      gtrarr: '⥸',
      gtrdot: '⋗',
      gtreqless: '⋛',
      gtreqqless: '⪌',
      gtrless: '≷',
      gtrsim: '≳',
      gvertneqq: '≩︀',
      gvnE: '≩︀',
      Hacek: 'ˇ',
      hairsp: ' ',
      half: '½',
      hamilt: 'ℋ',
      HARDcy: 'Ъ',
      hardcy: 'ъ',
      harrcir: '⥈',
      harr: '↔',
      hArr: '⇔',
      harrw: '↭',
      Hat: '^',
      hbar: 'ℏ',
      Hcirc: 'Ĥ',
      hcirc: 'ĥ',
      hearts: '♥',
      heartsuit: '♥',
      hellip: '…',
      hercon: '⊹',
      hfr: '𝔥',
      Hfr: 'ℌ',
      HilbertSpace: 'ℋ',
      hksearow: '⤥',
      hkswarow: '⤦',
      hoarr: '⇿',
      homtht: '∻',
      hookleftarrow: '↩',
      hookrightarrow: '↪',
      hopf: '𝕙',
      Hopf: 'ℍ',
      horbar: '―',
      HorizontalLine: '─',
      hscr: '𝒽',
      Hscr: 'ℋ',
      hslash: 'ℏ',
      Hstrok: 'Ħ',
      hstrok: 'ħ',
      HumpDownHump: '≎',
      HumpEqual: '≏',
      hybull: '⁃',
      hyphen: '‐',
      Iacute: 'Í',
      iacute: 'í',
      ic: '⁣',
      Icirc: 'Î',
      icirc: 'î',
      Icy: 'И',
      icy: 'и',
      Idot: 'İ',
      IEcy: 'Е',
      iecy: 'е',
      iexcl: '¡',
      iff: '⇔',
      ifr: '𝔦',
      Ifr: 'ℑ',
      Igrave: 'Ì',
      igrave: 'ì',
      ii: 'ⅈ',
      iiiint: '⨌',
      iiint: '∭',
      iinfin: '⧜',
      iiota: '℩',
      IJlig: 'Ĳ',
      ijlig: 'ĳ',
      Imacr: 'Ī',
      imacr: 'ī',
      image: 'ℑ',
      ImaginaryI: 'ⅈ',
      imagline: 'ℐ',
      imagpart: 'ℑ',
      imath: 'ı',
      Im: 'ℑ',
      imof: '⊷',
      imped: 'Ƶ',
      Implies: '⇒',
      incare: '℅',
      in: '∈',
      infin: '∞',
      infintie: '⧝',
      inodot: 'ı',
      intcal: '⊺',
      int: '∫',
      Int: '∬',
      integers: 'ℤ',
      Integral: '∫',
      intercal: '⊺',
      Intersection: '⋂',
      intlarhk: '⨗',
      intprod: '⨼',
      InvisibleComma: '⁣',
      InvisibleTimes: '⁢',
      IOcy: 'Ё',
      iocy: 'ё',
      Iogon: 'Į',
      iogon: 'į',
      Iopf: '𝕀',
      iopf: '𝕚',
      Iota: 'Ι',
      iota: 'ι',
      iprod: '⨼',
      iquest: '¿',
      iscr: '𝒾',
      Iscr: 'ℐ',
      isin: '∈',
      isindot: '⋵',
      isinE: '⋹',
      isins: '⋴',
      isinsv: '⋳',
      isinv: '∈',
      it: '⁢',
      Itilde: 'Ĩ',
      itilde: 'ĩ',
      Iukcy: 'І',
      iukcy: 'і',
      Iuml: 'Ï',
      iuml: 'ï',
      Jcirc: 'Ĵ',
      jcirc: 'ĵ',
      Jcy: 'Й',
      jcy: 'й',
      Jfr: '𝔍',
      jfr: '𝔧',
      jmath: 'ȷ',
      Jopf: '𝕁',
      jopf: '𝕛',
      Jscr: '𝒥',
      jscr: '𝒿',
      Jsercy: 'Ј',
      jsercy: 'ј',
      Jukcy: 'Є',
      jukcy: 'є',
      Kappa: 'Κ',
      kappa: 'κ',
      kappav: 'ϰ',
      Kcedil: 'Ķ',
      kcedil: 'ķ',
      Kcy: 'К',
      kcy: 'к',
      Kfr: '𝔎',
      kfr: '𝔨',
      kgreen: 'ĸ',
      KHcy: 'Х',
      khcy: 'х',
      KJcy: 'Ќ',
      kjcy: 'ќ',
      Kopf: '𝕂',
      kopf: '𝕜',
      Kscr: '𝒦',
      kscr: '𝓀',
      lAarr: '⇚',
      Lacute: 'Ĺ',
      lacute: 'ĺ',
      laemptyv: '⦴',
      lagran: 'ℒ',
      Lambda: 'Λ',
      lambda: 'λ',
      lang: '⟨',
      Lang: '⟪',
      langd: '⦑',
      langle: '⟨',
      lap: '⪅',
      Laplacetrf: 'ℒ',
      laquo: '«',
      larrb: '⇤',
      larrbfs: '⤟',
      larr: '←',
      Larr: '↞',
      lArr: '⇐',
      larrfs: '⤝',
      larrhk: '↩',
      larrlp: '↫',
      larrpl: '⤹',
      larrsim: '⥳',
      larrtl: '↢',
      latail: '⤙',
      lAtail: '⤛',
      lat: '⪫',
      late: '⪭',
      lates: '⪭︀',
      lbarr: '⤌',
      lBarr: '⤎',
      lbbrk: '❲',
      lbrace: '{',
      lbrack: '[',
      lbrke: '⦋',
      lbrksld: '⦏',
      lbrkslu: '⦍',
      Lcaron: 'Ľ',
      lcaron: 'ľ',
      Lcedil: 'Ļ',
      lcedil: 'ļ',
      lceil: '⌈',
      lcub: '{',
      Lcy: 'Л',
      lcy: 'л',
      ldca: '⤶',
      ldquo: '“',
      ldquor: '„',
      ldrdhar: '⥧',
      ldrushar: '⥋',
      ldsh: '↲',
      le: '≤',
      lE: '≦',
      LeftAngleBracket: '⟨',
      LeftArrowBar: '⇤',
      leftarrow: '←',
      LeftArrow: '←',
      Leftarrow: '⇐',
      LeftArrowRightArrow: '⇆',
      leftarrowtail: '↢',
      LeftCeiling: '⌈',
      LeftDoubleBracket: '⟦',
      LeftDownTeeVector: '⥡',
      LeftDownVectorBar: '⥙',
      LeftDownVector: '⇃',
      LeftFloor: '⌊',
      leftharpoondown: '↽',
      leftharpoonup: '↼',
      leftleftarrows: '⇇',
      leftrightarrow: '↔',
      LeftRightArrow: '↔',
      Leftrightarrow: '⇔',
      leftrightarrows: '⇆',
      leftrightharpoons: '⇋',
      leftrightsquigarrow: '↭',
      LeftRightVector: '⥎',
      LeftTeeArrow: '↤',
      LeftTee: '⊣',
      LeftTeeVector: '⥚',
      leftthreetimes: '⋋',
      LeftTriangleBar: '⧏',
      LeftTriangle: '⊲',
      LeftTriangleEqual: '⊴',
      LeftUpDownVector: '⥑',
      LeftUpTeeVector: '⥠',
      LeftUpVectorBar: '⥘',
      LeftUpVector: '↿',
      LeftVectorBar: '⥒',
      LeftVector: '↼',
      lEg: '⪋',
      leg: '⋚',
      leq: '≤',
      leqq: '≦',
      leqslant: '⩽',
      lescc: '⪨',
      les: '⩽',
      lesdot: '⩿',
      lesdoto: '⪁',
      lesdotor: '⪃',
      lesg: '⋚︀',
      lesges: '⪓',
      lessapprox: '⪅',
      lessdot: '⋖',
      lesseqgtr: '⋚',
      lesseqqgtr: '⪋',
      LessEqualGreater: '⋚',
      LessFullEqual: '≦',
      LessGreater: '≶',
      lessgtr: '≶',
      LessLess: '⪡',
      lesssim: '≲',
      LessSlantEqual: '⩽',
      LessTilde: '≲',
      lfisht: '⥼',
      lfloor: '⌊',
      Lfr: '𝔏',
      lfr: '𝔩',
      lg: '≶',
      lgE: '⪑',
      lHar: '⥢',
      lhard: '↽',
      lharu: '↼',
      lharul: '⥪',
      lhblk: '▄',
      LJcy: 'Љ',
      ljcy: 'љ',
      llarr: '⇇',
      ll: '≪',
      Ll: '⋘',
      llcorner: '⌞',
      Lleftarrow: '⇚',
      llhard: '⥫',
      lltri: '◺',
      Lmidot: 'Ŀ',
      lmidot: 'ŀ',
      lmoustache: '⎰',
      lmoust: '⎰',
      lnap: '⪉',
      lnapprox: '⪉',
      lne: '⪇',
      lnE: '≨',
      lneq: '⪇',
      lneqq: '≨',
      lnsim: '⋦',
      loang: '⟬',
      loarr: '⇽',
      lobrk: '⟦',
      longleftarrow: '⟵',
      LongLeftArrow: '⟵',
      Longleftarrow: '⟸',
      longleftrightarrow: '⟷',
      LongLeftRightArrow: '⟷',
      Longleftrightarrow: '⟺',
      longmapsto: '⟼',
      longrightarrow: '⟶',
      LongRightArrow: '⟶',
      Longrightarrow: '⟹',
      looparrowleft: '↫',
      looparrowright: '↬',
      lopar: '⦅',
      Lopf: '𝕃',
      lopf: '𝕝',
      loplus: '⨭',
      lotimes: '⨴',
      lowast: '∗',
      lowbar: '_',
      LowerLeftArrow: '↙',
      LowerRightArrow: '↘',
      loz: '◊',
      lozenge: '◊',
      lozf: '⧫',
      lpar: '(',
      lparlt: '⦓',
      lrarr: '⇆',
      lrcorner: '⌟',
      lrhar: '⇋',
      lrhard: '⥭',
      lrm: '‎',
      lrtri: '⊿',
      lsaquo: '‹',
      lscr: '𝓁',
      Lscr: 'ℒ',
      lsh: '↰',
      Lsh: '↰',
      lsim: '≲',
      lsime: '⪍',
      lsimg: '⪏',
      lsqb: '[',
      lsquo: '‘',
      lsquor: '‚',
      Lstrok: 'Ł',
      lstrok: 'ł',
      ltcc: '⪦',
      ltcir: '⩹',
      lt: '<',
      LT: '<',
      Lt: '≪',
      ltdot: '⋖',
      lthree: '⋋',
      ltimes: '⋉',
      ltlarr: '⥶',
      ltquest: '⩻',
      ltri: '◃',
      ltrie: '⊴',
      ltrif: '◂',
      ltrPar: '⦖',
      lurdshar: '⥊',
      luruhar: '⥦',
      lvertneqq: '≨︀',
      lvnE: '≨︀',
      macr: '¯',
      male: '♂',
      malt: '✠',
      maltese: '✠',
      Map: '⤅',
      map: '↦',
      mapsto: '↦',
      mapstodown: '↧',
      mapstoleft: '↤',
      mapstoup: '↥',
      marker: '▮',
      mcomma: '⨩',
      Mcy: 'М',
      mcy: 'м',
      mdash: '—',
      mDDot: '∺',
      measuredangle: '∡',
      MediumSpace: ' ',
      Mellintrf: 'ℳ',
      Mfr: '𝔐',
      mfr: '𝔪',
      mho: '℧',
      micro: 'µ',
      midast: '*',
      midcir: '⫰',
      mid: '∣',
      middot: '·',
      minusb: '⊟',
      minus: '−',
      minusd: '∸',
      minusdu: '⨪',
      MinusPlus: '∓',
      mlcp: '⫛',
      mldr: '…',
      mnplus: '∓',
      models: '⊧',
      Mopf: '𝕄',
      mopf: '𝕞',
      mp: '∓',
      mscr: '𝓂',
      Mscr: 'ℳ',
      mstpos: '∾',
      Mu: 'Μ',
      mu: 'μ',
      multimap: '⊸',
      mumap: '⊸',
      nabla: '∇',
      Nacute: 'Ń',
      nacute: 'ń',
      nang: '∠⃒',
      nap: '≉',
      napE: '⩰̸',
      napid: '≋̸',
      napos: 'ŉ',
      napprox: '≉',
      natural: '♮',
      naturals: 'ℕ',
      natur: '♮',
      nbsp: ' ',
      nbump: '≎̸',
      nbumpe: '≏̸',
      ncap: '⩃',
      Ncaron: 'Ň',
      ncaron: 'ň',
      Ncedil: 'Ņ',
      ncedil: 'ņ',
      ncong: '≇',
      ncongdot: '⩭̸',
      ncup: '⩂',
      Ncy: 'Н',
      ncy: 'н',
      ndash: '–',
      nearhk: '⤤',
      nearr: '↗',
      neArr: '⇗',
      nearrow: '↗',
      ne: '≠',
      nedot: '≐̸',
      NegativeMediumSpace: '​',
      NegativeThickSpace: '​',
      NegativeThinSpace: '​',
      NegativeVeryThinSpace: '​',
      nequiv: '≢',
      nesear: '⤨',
      nesim: '≂̸',
      NestedGreaterGreater: '≫',
      NestedLessLess: '≪',
      NewLine: `
`,
      nexist: '∄',
      nexists: '∄',
      Nfr: '𝔑',
      nfr: '𝔫',
      ngE: '≧̸',
      nge: '≱',
      ngeq: '≱',
      ngeqq: '≧̸',
      ngeqslant: '⩾̸',
      nges: '⩾̸',
      nGg: '⋙̸',
      ngsim: '≵',
      nGt: '≫⃒',
      ngt: '≯',
      ngtr: '≯',
      nGtv: '≫̸',
      nharr: '↮',
      nhArr: '⇎',
      nhpar: '⫲',
      ni: '∋',
      nis: '⋼',
      nisd: '⋺',
      niv: '∋',
      NJcy: 'Њ',
      njcy: 'њ',
      nlarr: '↚',
      nlArr: '⇍',
      nldr: '‥',
      nlE: '≦̸',
      nle: '≰',
      nleftarrow: '↚',
      nLeftarrow: '⇍',
      nleftrightarrow: '↮',
      nLeftrightarrow: '⇎',
      nleq: '≰',
      nleqq: '≦̸',
      nleqslant: '⩽̸',
      nles: '⩽̸',
      nless: '≮',
      nLl: '⋘̸',
      nlsim: '≴',
      nLt: '≪⃒',
      nlt: '≮',
      nltri: '⋪',
      nltrie: '⋬',
      nLtv: '≪̸',
      nmid: '∤',
      NoBreak: '⁠',
      NonBreakingSpace: ' ',
      nopf: '𝕟',
      Nopf: 'ℕ',
      Not: '⫬',
      not: '¬',
      NotCongruent: '≢',
      NotCupCap: '≭',
      NotDoubleVerticalBar: '∦',
      NotElement: '∉',
      NotEqual: '≠',
      NotEqualTilde: '≂̸',
      NotExists: '∄',
      NotGreater: '≯',
      NotGreaterEqual: '≱',
      NotGreaterFullEqual: '≧̸',
      NotGreaterGreater: '≫̸',
      NotGreaterLess: '≹',
      NotGreaterSlantEqual: '⩾̸',
      NotGreaterTilde: '≵',
      NotHumpDownHump: '≎̸',
      NotHumpEqual: '≏̸',
      notin: '∉',
      notindot: '⋵̸',
      notinE: '⋹̸',
      notinva: '∉',
      notinvb: '⋷',
      notinvc: '⋶',
      NotLeftTriangleBar: '⧏̸',
      NotLeftTriangle: '⋪',
      NotLeftTriangleEqual: '⋬',
      NotLess: '≮',
      NotLessEqual: '≰',
      NotLessGreater: '≸',
      NotLessLess: '≪̸',
      NotLessSlantEqual: '⩽̸',
      NotLessTilde: '≴',
      NotNestedGreaterGreater: '⪢̸',
      NotNestedLessLess: '⪡̸',
      notni: '∌',
      notniva: '∌',
      notnivb: '⋾',
      notnivc: '⋽',
      NotPrecedes: '⊀',
      NotPrecedesEqual: '⪯̸',
      NotPrecedesSlantEqual: '⋠',
      NotReverseElement: '∌',
      NotRightTriangleBar: '⧐̸',
      NotRightTriangle: '⋫',
      NotRightTriangleEqual: '⋭',
      NotSquareSubset: '⊏̸',
      NotSquareSubsetEqual: '⋢',
      NotSquareSuperset: '⊐̸',
      NotSquareSupersetEqual: '⋣',
      NotSubset: '⊂⃒',
      NotSubsetEqual: '⊈',
      NotSucceeds: '⊁',
      NotSucceedsEqual: '⪰̸',
      NotSucceedsSlantEqual: '⋡',
      NotSucceedsTilde: '≿̸',
      NotSuperset: '⊃⃒',
      NotSupersetEqual: '⊉',
      NotTilde: '≁',
      NotTildeEqual: '≄',
      NotTildeFullEqual: '≇',
      NotTildeTilde: '≉',
      NotVerticalBar: '∤',
      nparallel: '∦',
      npar: '∦',
      nparsl: '⫽⃥',
      npart: '∂̸',
      npolint: '⨔',
      npr: '⊀',
      nprcue: '⋠',
      nprec: '⊀',
      npreceq: '⪯̸',
      npre: '⪯̸',
      nrarrc: '⤳̸',
      nrarr: '↛',
      nrArr: '⇏',
      nrarrw: '↝̸',
      nrightarrow: '↛',
      nRightarrow: '⇏',
      nrtri: '⋫',
      nrtrie: '⋭',
      nsc: '⊁',
      nsccue: '⋡',
      nsce: '⪰̸',
      Nscr: '𝒩',
      nscr: '𝓃',
      nshortmid: '∤',
      nshortparallel: '∦',
      nsim: '≁',
      nsime: '≄',
      nsimeq: '≄',
      nsmid: '∤',
      nspar: '∦',
      nsqsube: '⋢',
      nsqsupe: '⋣',
      nsub: '⊄',
      nsubE: '⫅̸',
      nsube: '⊈',
      nsubset: '⊂⃒',
      nsubseteq: '⊈',
      nsubseteqq: '⫅̸',
      nsucc: '⊁',
      nsucceq: '⪰̸',
      nsup: '⊅',
      nsupE: '⫆̸',
      nsupe: '⊉',
      nsupset: '⊃⃒',
      nsupseteq: '⊉',
      nsupseteqq: '⫆̸',
      ntgl: '≹',
      Ntilde: 'Ñ',
      ntilde: 'ñ',
      ntlg: '≸',
      ntriangleleft: '⋪',
      ntrianglelefteq: '⋬',
      ntriangleright: '⋫',
      ntrianglerighteq: '⋭',
      Nu: 'Ν',
      nu: 'ν',
      num: '#',
      numero: '№',
      numsp: ' ',
      nvap: '≍⃒',
      nvdash: '⊬',
      nvDash: '⊭',
      nVdash: '⊮',
      nVDash: '⊯',
      nvge: '≥⃒',
      nvgt: '>⃒',
      nvHarr: '⤄',
      nvinfin: '⧞',
      nvlArr: '⤂',
      nvle: '≤⃒',
      nvlt: '<⃒',
      nvltrie: '⊴⃒',
      nvrArr: '⤃',
      nvrtrie: '⊵⃒',
      nvsim: '∼⃒',
      nwarhk: '⤣',
      nwarr: '↖',
      nwArr: '⇖',
      nwarrow: '↖',
      nwnear: '⤧',
      Oacute: 'Ó',
      oacute: 'ó',
      oast: '⊛',
      Ocirc: 'Ô',
      ocirc: 'ô',
      ocir: '⊚',
      Ocy: 'О',
      ocy: 'о',
      odash: '⊝',
      Odblac: 'Ő',
      odblac: 'ő',
      odiv: '⨸',
      odot: '⊙',
      odsold: '⦼',
      OElig: 'Œ',
      oelig: 'œ',
      ofcir: '⦿',
      Ofr: '𝔒',
      ofr: '𝔬',
      ogon: '˛',
      Ograve: 'Ò',
      ograve: 'ò',
      ogt: '⧁',
      ohbar: '⦵',
      ohm: 'Ω',
      oint: '∮',
      olarr: '↺',
      olcir: '⦾',
      olcross: '⦻',
      oline: '‾',
      olt: '⧀',
      Omacr: 'Ō',
      omacr: 'ō',
      Omega: 'Ω',
      omega: 'ω',
      Omicron: 'Ο',
      omicron: 'ο',
      omid: '⦶',
      ominus: '⊖',
      Oopf: '𝕆',
      oopf: '𝕠',
      opar: '⦷',
      OpenCurlyDoubleQuote: '“',
      OpenCurlyQuote: '‘',
      operp: '⦹',
      oplus: '⊕',
      orarr: '↻',
      Or: '⩔',
      or: '∨',
      ord: '⩝',
      order: 'ℴ',
      orderof: 'ℴ',
      ordf: 'ª',
      ordm: 'º',
      origof: '⊶',
      oror: '⩖',
      orslope: '⩗',
      orv: '⩛',
      oS: 'Ⓢ',
      Oscr: '𝒪',
      oscr: 'ℴ',
      Oslash: 'Ø',
      oslash: 'ø',
      osol: '⊘',
      Otilde: 'Õ',
      otilde: 'õ',
      otimesas: '⨶',
      Otimes: '⨷',
      otimes: '⊗',
      Ouml: 'Ö',
      ouml: 'ö',
      ovbar: '⌽',
      OverBar: '‾',
      OverBrace: '⏞',
      OverBracket: '⎴',
      OverParenthesis: '⏜',
      para: '¶',
      parallel: '∥',
      par: '∥',
      parsim: '⫳',
      parsl: '⫽',
      part: '∂',
      PartialD: '∂',
      Pcy: 'П',
      pcy: 'п',
      percnt: '%',
      period: '.',
      permil: '‰',
      perp: '⊥',
      pertenk: '‱',
      Pfr: '𝔓',
      pfr: '𝔭',
      Phi: 'Φ',
      phi: 'φ',
      phiv: 'ϕ',
      phmmat: 'ℳ',
      phone: '☎',
      Pi: 'Π',
      pi: 'π',
      pitchfork: '⋔',
      piv: 'ϖ',
      planck: 'ℏ',
      planckh: 'ℎ',
      plankv: 'ℏ',
      plusacir: '⨣',
      plusb: '⊞',
      pluscir: '⨢',
      plus: '+',
      plusdo: '∔',
      plusdu: '⨥',
      pluse: '⩲',
      PlusMinus: '±',
      plusmn: '±',
      plussim: '⨦',
      plustwo: '⨧',
      pm: '±',
      Poincareplane: 'ℌ',
      pointint: '⨕',
      popf: '𝕡',
      Popf: 'ℙ',
      pound: '£',
      prap: '⪷',
      Pr: '⪻',
      pr: '≺',
      prcue: '≼',
      precapprox: '⪷',
      prec: '≺',
      preccurlyeq: '≼',
      Precedes: '≺',
      PrecedesEqual: '⪯',
      PrecedesSlantEqual: '≼',
      PrecedesTilde: '≾',
      preceq: '⪯',
      precnapprox: '⪹',
      precneqq: '⪵',
      precnsim: '⋨',
      pre: '⪯',
      prE: '⪳',
      precsim: '≾',
      prime: '′',
      Prime: '″',
      primes: 'ℙ',
      prnap: '⪹',
      prnE: '⪵',
      prnsim: '⋨',
      prod: '∏',
      Product: '∏',
      profalar: '⌮',
      profline: '⌒',
      profsurf: '⌓',
      prop: '∝',
      Proportional: '∝',
      Proportion: '∷',
      propto: '∝',
      prsim: '≾',
      prurel: '⊰',
      Pscr: '𝒫',
      pscr: '𝓅',
      Psi: 'Ψ',
      psi: 'ψ',
      puncsp: ' ',
      Qfr: '𝔔',
      qfr: '𝔮',
      qint: '⨌',
      qopf: '𝕢',
      Qopf: 'ℚ',
      qprime: '⁗',
      Qscr: '𝒬',
      qscr: '𝓆',
      quaternions: 'ℍ',
      quatint: '⨖',
      quest: '?',
      questeq: '≟',
      quot: '"',
      QUOT: '"',
      rAarr: '⇛',
      race: '∽̱',
      Racute: 'Ŕ',
      racute: 'ŕ',
      radic: '√',
      raemptyv: '⦳',
      rang: '⟩',
      Rang: '⟫',
      rangd: '⦒',
      range: '⦥',
      rangle: '⟩',
      raquo: '»',
      rarrap: '⥵',
      rarrb: '⇥',
      rarrbfs: '⤠',
      rarrc: '⤳',
      rarr: '→',
      Rarr: '↠',
      rArr: '⇒',
      rarrfs: '⤞',
      rarrhk: '↪',
      rarrlp: '↬',
      rarrpl: '⥅',
      rarrsim: '⥴',
      Rarrtl: '⤖',
      rarrtl: '↣',
      rarrw: '↝',
      ratail: '⤚',
      rAtail: '⤜',
      ratio: '∶',
      rationals: 'ℚ',
      rbarr: '⤍',
      rBarr: '⤏',
      RBarr: '⤐',
      rbbrk: '❳',
      rbrace: '}',
      rbrack: ']',
      rbrke: '⦌',
      rbrksld: '⦎',
      rbrkslu: '⦐',
      Rcaron: 'Ř',
      rcaron: 'ř',
      Rcedil: 'Ŗ',
      rcedil: 'ŗ',
      rceil: '⌉',
      rcub: '}',
      Rcy: 'Р',
      rcy: 'р',
      rdca: '⤷',
      rdldhar: '⥩',
      rdquo: '”',
      rdquor: '”',
      rdsh: '↳',
      real: 'ℜ',
      realine: 'ℛ',
      realpart: 'ℜ',
      reals: 'ℝ',
      Re: 'ℜ',
      rect: '▭',
      reg: '®',
      REG: '®',
      ReverseElement: '∋',
      ReverseEquilibrium: '⇋',
      ReverseUpEquilibrium: '⥯',
      rfisht: '⥽',
      rfloor: '⌋',
      rfr: '𝔯',
      Rfr: 'ℜ',
      rHar: '⥤',
      rhard: '⇁',
      rharu: '⇀',
      rharul: '⥬',
      Rho: 'Ρ',
      rho: 'ρ',
      rhov: 'ϱ',
      RightAngleBracket: '⟩',
      RightArrowBar: '⇥',
      rightarrow: '→',
      RightArrow: '→',
      Rightarrow: '⇒',
      RightArrowLeftArrow: '⇄',
      rightarrowtail: '↣',
      RightCeiling: '⌉',
      RightDoubleBracket: '⟧',
      RightDownTeeVector: '⥝',
      RightDownVectorBar: '⥕',
      RightDownVector: '⇂',
      RightFloor: '⌋',
      rightharpoondown: '⇁',
      rightharpoonup: '⇀',
      rightleftarrows: '⇄',
      rightleftharpoons: '⇌',
      rightrightarrows: '⇉',
      rightsquigarrow: '↝',
      RightTeeArrow: '↦',
      RightTee: '⊢',
      RightTeeVector: '⥛',
      rightthreetimes: '⋌',
      RightTriangleBar: '⧐',
      RightTriangle: '⊳',
      RightTriangleEqual: '⊵',
      RightUpDownVector: '⥏',
      RightUpTeeVector: '⥜',
      RightUpVectorBar: '⥔',
      RightUpVector: '↾',
      RightVectorBar: '⥓',
      RightVector: '⇀',
      ring: '˚',
      risingdotseq: '≓',
      rlarr: '⇄',
      rlhar: '⇌',
      rlm: '‏',
      rmoustache: '⎱',
      rmoust: '⎱',
      rnmid: '⫮',
      roang: '⟭',
      roarr: '⇾',
      robrk: '⟧',
      ropar: '⦆',
      ropf: '𝕣',
      Ropf: 'ℝ',
      roplus: '⨮',
      rotimes: '⨵',
      RoundImplies: '⥰',
      rpar: ')',
      rpargt: '⦔',
      rppolint: '⨒',
      rrarr: '⇉',
      Rrightarrow: '⇛',
      rsaquo: '›',
      rscr: '𝓇',
      Rscr: 'ℛ',
      rsh: '↱',
      Rsh: '↱',
      rsqb: ']',
      rsquo: '’',
      rsquor: '’',
      rthree: '⋌',
      rtimes: '⋊',
      rtri: '▹',
      rtrie: '⊵',
      rtrif: '▸',
      rtriltri: '⧎',
      RuleDelayed: '⧴',
      ruluhar: '⥨',
      rx: '℞',
      Sacute: 'Ś',
      sacute: 'ś',
      sbquo: '‚',
      scap: '⪸',
      Scaron: 'Š',
      scaron: 'š',
      Sc: '⪼',
      sc: '≻',
      sccue: '≽',
      sce: '⪰',
      scE: '⪴',
      Scedil: 'Ş',
      scedil: 'ş',
      Scirc: 'Ŝ',
      scirc: 'ŝ',
      scnap: '⪺',
      scnE: '⪶',
      scnsim: '⋩',
      scpolint: '⨓',
      scsim: '≿',
      Scy: 'С',
      scy: 'с',
      sdotb: '⊡',
      sdot: '⋅',
      sdote: '⩦',
      searhk: '⤥',
      searr: '↘',
      seArr: '⇘',
      searrow: '↘',
      sect: '§',
      semi: ';',
      seswar: '⤩',
      setminus: '∖',
      setmn: '∖',
      sext: '✶',
      Sfr: '𝔖',
      sfr: '𝔰',
      sfrown: '⌢',
      sharp: '♯',
      SHCHcy: 'Щ',
      shchcy: 'щ',
      SHcy: 'Ш',
      shcy: 'ш',
      ShortDownArrow: '↓',
      ShortLeftArrow: '←',
      shortmid: '∣',
      shortparallel: '∥',
      ShortRightArrow: '→',
      ShortUpArrow: '↑',
      shy: '­',
      Sigma: 'Σ',
      sigma: 'σ',
      sigmaf: 'ς',
      sigmav: 'ς',
      sim: '∼',
      simdot: '⩪',
      sime: '≃',
      simeq: '≃',
      simg: '⪞',
      simgE: '⪠',
      siml: '⪝',
      simlE: '⪟',
      simne: '≆',
      simplus: '⨤',
      simrarr: '⥲',
      slarr: '←',
      SmallCircle: '∘',
      smallsetminus: '∖',
      smashp: '⨳',
      smeparsl: '⧤',
      smid: '∣',
      smile: '⌣',
      smt: '⪪',
      smte: '⪬',
      smtes: '⪬︀',
      SOFTcy: 'Ь',
      softcy: 'ь',
      solbar: '⌿',
      solb: '⧄',
      sol: '/',
      Sopf: '𝕊',
      sopf: '𝕤',
      spades: '♠',
      spadesuit: '♠',
      spar: '∥',
      sqcap: '⊓',
      sqcaps: '⊓︀',
      sqcup: '⊔',
      sqcups: '⊔︀',
      Sqrt: '√',
      sqsub: '⊏',
      sqsube: '⊑',
      sqsubset: '⊏',
      sqsubseteq: '⊑',
      sqsup: '⊐',
      sqsupe: '⊒',
      sqsupset: '⊐',
      sqsupseteq: '⊒',
      square: '□',
      Square: '□',
      SquareIntersection: '⊓',
      SquareSubset: '⊏',
      SquareSubsetEqual: '⊑',
      SquareSuperset: '⊐',
      SquareSupersetEqual: '⊒',
      SquareUnion: '⊔',
      squarf: '▪',
      squ: '□',
      squf: '▪',
      srarr: '→',
      Sscr: '𝒮',
      sscr: '𝓈',
      ssetmn: '∖',
      ssmile: '⌣',
      sstarf: '⋆',
      Star: '⋆',
      star: '☆',
      starf: '★',
      straightepsilon: 'ϵ',
      straightphi: 'ϕ',
      strns: '¯',
      sub: '⊂',
      Sub: '⋐',
      subdot: '⪽',
      subE: '⫅',
      sube: '⊆',
      subedot: '⫃',
      submult: '⫁',
      subnE: '⫋',
      subne: '⊊',
      subplus: '⪿',
      subrarr: '⥹',
      subset: '⊂',
      Subset: '⋐',
      subseteq: '⊆',
      subseteqq: '⫅',
      SubsetEqual: '⊆',
      subsetneq: '⊊',
      subsetneqq: '⫋',
      subsim: '⫇',
      subsub: '⫕',
      subsup: '⫓',
      succapprox: '⪸',
      succ: '≻',
      succcurlyeq: '≽',
      Succeeds: '≻',
      SucceedsEqual: '⪰',
      SucceedsSlantEqual: '≽',
      SucceedsTilde: '≿',
      succeq: '⪰',
      succnapprox: '⪺',
      succneqq: '⪶',
      succnsim: '⋩',
      succsim: '≿',
      SuchThat: '∋',
      sum: '∑',
      Sum: '∑',
      sung: '♪',
      sup1: '¹',
      sup2: '²',
      sup3: '³',
      sup: '⊃',
      Sup: '⋑',
      supdot: '⪾',
      supdsub: '⫘',
      supE: '⫆',
      supe: '⊇',
      supedot: '⫄',
      Superset: '⊃',
      SupersetEqual: '⊇',
      suphsol: '⟉',
      suphsub: '⫗',
      suplarr: '⥻',
      supmult: '⫂',
      supnE: '⫌',
      supne: '⊋',
      supplus: '⫀',
      supset: '⊃',
      Supset: '⋑',
      supseteq: '⊇',
      supseteqq: '⫆',
      supsetneq: '⊋',
      supsetneqq: '⫌',
      supsim: '⫈',
      supsub: '⫔',
      supsup: '⫖',
      swarhk: '⤦',
      swarr: '↙',
      swArr: '⇙',
      swarrow: '↙',
      swnwar: '⤪',
      szlig: 'ß',
      Tab: '	',
      target: '⌖',
      Tau: 'Τ',
      tau: 'τ',
      tbrk: '⎴',
      Tcaron: 'Ť',
      tcaron: 'ť',
      Tcedil: 'Ţ',
      tcedil: 'ţ',
      Tcy: 'Т',
      tcy: 'т',
      tdot: '⃛',
      telrec: '⌕',
      Tfr: '𝔗',
      tfr: '𝔱',
      there4: '∴',
      therefore: '∴',
      Therefore: '∴',
      Theta: 'Θ',
      theta: 'θ',
      thetasym: 'ϑ',
      thetav: 'ϑ',
      thickapprox: '≈',
      thicksim: '∼',
      ThickSpace: '  ',
      ThinSpace: ' ',
      thinsp: ' ',
      thkap: '≈',
      thksim: '∼',
      THORN: 'Þ',
      thorn: 'þ',
      tilde: '˜',
      Tilde: '∼',
      TildeEqual: '≃',
      TildeFullEqual: '≅',
      TildeTilde: '≈',
      timesbar: '⨱',
      timesb: '⊠',
      times: '×',
      timesd: '⨰',
      tint: '∭',
      toea: '⤨',
      topbot: '⌶',
      topcir: '⫱',
      top: '⊤',
      Topf: '𝕋',
      topf: '𝕥',
      topfork: '⫚',
      tosa: '⤩',
      tprime: '‴',
      trade: '™',
      TRADE: '™',
      triangle: '▵',
      triangledown: '▿',
      triangleleft: '◃',
      trianglelefteq: '⊴',
      triangleq: '≜',
      triangleright: '▹',
      trianglerighteq: '⊵',
      tridot: '◬',
      trie: '≜',
      triminus: '⨺',
      TripleDot: '⃛',
      triplus: '⨹',
      trisb: '⧍',
      tritime: '⨻',
      trpezium: '⏢',
      Tscr: '𝒯',
      tscr: '𝓉',
      TScy: 'Ц',
      tscy: 'ц',
      TSHcy: 'Ћ',
      tshcy: 'ћ',
      Tstrok: 'Ŧ',
      tstrok: 'ŧ',
      twixt: '≬',
      twoheadleftarrow: '↞',
      twoheadrightarrow: '↠',
      Uacute: 'Ú',
      uacute: 'ú',
      uarr: '↑',
      Uarr: '↟',
      uArr: '⇑',
      Uarrocir: '⥉',
      Ubrcy: 'Ў',
      ubrcy: 'ў',
      Ubreve: 'Ŭ',
      ubreve: 'ŭ',
      Ucirc: 'Û',
      ucirc: 'û',
      Ucy: 'У',
      ucy: 'у',
      udarr: '⇅',
      Udblac: 'Ű',
      udblac: 'ű',
      udhar: '⥮',
      ufisht: '⥾',
      Ufr: '𝔘',
      ufr: '𝔲',
      Ugrave: 'Ù',
      ugrave: 'ù',
      uHar: '⥣',
      uharl: '↿',
      uharr: '↾',
      uhblk: '▀',
      ulcorn: '⌜',
      ulcorner: '⌜',
      ulcrop: '⌏',
      ultri: '◸',
      Umacr: 'Ū',
      umacr: 'ū',
      uml: '¨',
      UnderBar: '_',
      UnderBrace: '⏟',
      UnderBracket: '⎵',
      UnderParenthesis: '⏝',
      Union: '⋃',
      UnionPlus: '⊎',
      Uogon: 'Ų',
      uogon: 'ų',
      Uopf: '𝕌',
      uopf: '𝕦',
      UpArrowBar: '⤒',
      uparrow: '↑',
      UpArrow: '↑',
      Uparrow: '⇑',
      UpArrowDownArrow: '⇅',
      updownarrow: '↕',
      UpDownArrow: '↕',
      Updownarrow: '⇕',
      UpEquilibrium: '⥮',
      upharpoonleft: '↿',
      upharpoonright: '↾',
      uplus: '⊎',
      UpperLeftArrow: '↖',
      UpperRightArrow: '↗',
      upsi: 'υ',
      Upsi: 'ϒ',
      upsih: 'ϒ',
      Upsilon: 'Υ',
      upsilon: 'υ',
      UpTeeArrow: '↥',
      UpTee: '⊥',
      upuparrows: '⇈',
      urcorn: '⌝',
      urcorner: '⌝',
      urcrop: '⌎',
      Uring: 'Ů',
      uring: 'ů',
      urtri: '◹',
      Uscr: '𝒰',
      uscr: '𝓊',
      utdot: '⋰',
      Utilde: 'Ũ',
      utilde: 'ũ',
      utri: '▵',
      utrif: '▴',
      uuarr: '⇈',
      Uuml: 'Ü',
      uuml: 'ü',
      uwangle: '⦧',
      vangrt: '⦜',
      varepsilon: 'ϵ',
      varkappa: 'ϰ',
      varnothing: '∅',
      varphi: 'ϕ',
      varpi: 'ϖ',
      varpropto: '∝',
      varr: '↕',
      vArr: '⇕',
      varrho: 'ϱ',
      varsigma: 'ς',
      varsubsetneq: '⊊︀',
      varsubsetneqq: '⫋︀',
      varsupsetneq: '⊋︀',
      varsupsetneqq: '⫌︀',
      vartheta: 'ϑ',
      vartriangleleft: '⊲',
      vartriangleright: '⊳',
      vBar: '⫨',
      Vbar: '⫫',
      vBarv: '⫩',
      Vcy: 'В',
      vcy: 'в',
      vdash: '⊢',
      vDash: '⊨',
      Vdash: '⊩',
      VDash: '⊫',
      Vdashl: '⫦',
      veebar: '⊻',
      vee: '∨',
      Vee: '⋁',
      veeeq: '≚',
      vellip: '⋮',
      verbar: '|',
      Verbar: '‖',
      vert: '|',
      Vert: '‖',
      VerticalBar: '∣',
      VerticalLine: '|',
      VerticalSeparator: '❘',
      VerticalTilde: '≀',
      VeryThinSpace: ' ',
      Vfr: '𝔙',
      vfr: '𝔳',
      vltri: '⊲',
      vnsub: '⊂⃒',
      vnsup: '⊃⃒',
      Vopf: '𝕍',
      vopf: '𝕧',
      vprop: '∝',
      vrtri: '⊳',
      Vscr: '𝒱',
      vscr: '𝓋',
      vsubnE: '⫋︀',
      vsubne: '⊊︀',
      vsupnE: '⫌︀',
      vsupne: '⊋︀',
      Vvdash: '⊪',
      vzigzag: '⦚',
      Wcirc: 'Ŵ',
      wcirc: 'ŵ',
      wedbar: '⩟',
      wedge: '∧',
      Wedge: '⋀',
      wedgeq: '≙',
      weierp: '℘',
      Wfr: '𝔚',
      wfr: '𝔴',
      Wopf: '𝕎',
      wopf: '𝕨',
      wp: '℘',
      wr: '≀',
      wreath: '≀',
      Wscr: '𝒲',
      wscr: '𝓌',
      xcap: '⋂',
      xcirc: '◯',
      xcup: '⋃',
      xdtri: '▽',
      Xfr: '𝔛',
      xfr: '𝔵',
      xharr: '⟷',
      xhArr: '⟺',
      Xi: 'Ξ',
      xi: 'ξ',
      xlarr: '⟵',
      xlArr: '⟸',
      xmap: '⟼',
      xnis: '⋻',
      xodot: '⨀',
      Xopf: '𝕏',
      xopf: '𝕩',
      xoplus: '⨁',
      xotime: '⨂',
      xrarr: '⟶',
      xrArr: '⟹',
      Xscr: '𝒳',
      xscr: '𝓍',
      xsqcup: '⨆',
      xuplus: '⨄',
      xutri: '△',
      xvee: '⋁',
      xwedge: '⋀',
      Yacute: 'Ý',
      yacute: 'ý',
      YAcy: 'Я',
      yacy: 'я',
      Ycirc: 'Ŷ',
      ycirc: 'ŷ',
      Ycy: 'Ы',
      ycy: 'ы',
      yen: '¥',
      Yfr: '𝔜',
      yfr: '𝔶',
      YIcy: 'Ї',
      yicy: 'ї',
      Yopf: '𝕐',
      yopf: '𝕪',
      Yscr: '𝒴',
      yscr: '𝓎',
      YUcy: 'Ю',
      yucy: 'ю',
      yuml: 'ÿ',
      Yuml: 'Ÿ',
      Zacute: 'Ź',
      zacute: 'ź',
      Zcaron: 'Ž',
      zcaron: 'ž',
      Zcy: 'З',
      zcy: 'з',
      Zdot: 'Ż',
      zdot: 'ż',
      zeetrf: 'ℨ',
      ZeroWidthSpace: '​',
      Zeta: 'Ζ',
      zeta: 'ζ',
      zfr: '𝔷',
      Zfr: 'ℨ',
      ZHcy: 'Ж',
      zhcy: 'ж',
      zigrarr: '⇝',
      zopf: '𝕫',
      Zopf: 'ℤ',
      Zscr: '𝒵',
      zscr: '𝓏',
      zwj: '‍',
      zwnj: '‌',
    };
  }),
  ha = q((e, t) => {
    t.exports = {
      Aacute: 'Á',
      aacute: 'á',
      Acirc: 'Â',
      acirc: 'â',
      acute: '´',
      AElig: 'Æ',
      aelig: 'æ',
      Agrave: 'À',
      agrave: 'à',
      amp: '&',
      AMP: '&',
      Aring: 'Å',
      aring: 'å',
      Atilde: 'Ã',
      atilde: 'ã',
      Auml: 'Ä',
      auml: 'ä',
      brvbar: '¦',
      Ccedil: 'Ç',
      ccedil: 'ç',
      cedil: '¸',
      cent: '¢',
      copy: '©',
      COPY: '©',
      curren: '¤',
      deg: '°',
      divide: '÷',
      Eacute: 'É',
      eacute: 'é',
      Ecirc: 'Ê',
      ecirc: 'ê',
      Egrave: 'È',
      egrave: 'è',
      ETH: 'Ð',
      eth: 'ð',
      Euml: 'Ë',
      euml: 'ë',
      frac12: '½',
      frac14: '¼',
      frac34: '¾',
      gt: '>',
      GT: '>',
      Iacute: 'Í',
      iacute: 'í',
      Icirc: 'Î',
      icirc: 'î',
      iexcl: '¡',
      Igrave: 'Ì',
      igrave: 'ì',
      iquest: '¿',
      Iuml: 'Ï',
      iuml: 'ï',
      laquo: '«',
      lt: '<',
      LT: '<',
      macr: '¯',
      micro: 'µ',
      middot: '·',
      nbsp: ' ',
      not: '¬',
      Ntilde: 'Ñ',
      ntilde: 'ñ',
      Oacute: 'Ó',
      oacute: 'ó',
      Ocirc: 'Ô',
      ocirc: 'ô',
      Ograve: 'Ò',
      ograve: 'ò',
      ordf: 'ª',
      ordm: 'º',
      Oslash: 'Ø',
      oslash: 'ø',
      Otilde: 'Õ',
      otilde: 'õ',
      Ouml: 'Ö',
      ouml: 'ö',
      para: '¶',
      plusmn: '±',
      pound: '£',
      quot: '"',
      QUOT: '"',
      raquo: '»',
      reg: '®',
      REG: '®',
      sect: '§',
      shy: '­',
      sup1: '¹',
      sup2: '²',
      sup3: '³',
      szlig: 'ß',
      THORN: 'Þ',
      thorn: 'þ',
      times: '×',
      Uacute: 'Ú',
      uacute: 'ú',
      Ucirc: 'Û',
      ucirc: 'û',
      Ugrave: 'Ù',
      ugrave: 'ù',
      uml: '¨',
      Uuml: 'Ü',
      uuml: 'ü',
      Yacute: 'Ý',
      yacute: 'ý',
      yen: '¥',
      yuml: 'ÿ',
    };
  }),
  Xn = q((e, t) => {
    t.exports = {amp: '&', apos: "'", gt: '>', lt: '<', quot: '"'};
  }),
  ga = q((e, t) => {
    t.exports = {
      0: 65533,
      128: 8364,
      130: 8218,
      131: 402,
      132: 8222,
      133: 8230,
      134: 8224,
      135: 8225,
      136: 710,
      137: 8240,
      138: 352,
      139: 8249,
      140: 338,
      142: 381,
      145: 8216,
      146: 8217,
      147: 8220,
      148: 8221,
      149: 8226,
      150: 8211,
      151: 8212,
      152: 732,
      153: 8482,
      154: 353,
      155: 8250,
      156: 339,
      158: 382,
      159: 376,
    };
  }),
  ba = q((e) => {
    var t =
      (e && e.__importDefault) ||
      function (i) {
        return i && i.__esModule ? i : {default: i};
      };
    Object.defineProperty(e, '__esModule', {value: !0});
    var r = t(ga()),
      o =
        String.fromCodePoint ||
        function (i) {
          var u = '';
          return (
            i > 65535 &&
              ((i -= 65536), (u += String.fromCharCode(((i >>> 10) & 1023) | 55296)), (i = 56320 | (i & 1023))),
            (u += String.fromCharCode(i)),
            u
          );
        };
    function s(i) {
      return (i >= 55296 && i <= 57343) || i > 1114111 ? '�' : (i in r.default && (i = r.default[i]), o(i));
    }
    (n(s, 'decodeCodePoint'), (e.default = s));
  }),
  Qn = q((e) => {
    var t =
      (e && e.__importDefault) ||
      function (m) {
        return m && m.__esModule ? m : {default: m};
      };
    (Object.defineProperty(e, '__esModule', {value: !0}), (e.decodeHTML = e.decodeHTMLStrict = e.decodeXML = void 0));
    var r = t(Kn()),
      o = t(ha()),
      s = t(Xn()),
      i = t(ba()),
      u = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
    ((e.decodeXML = l(s.default)), (e.decodeHTMLStrict = l(r.default)));
    function l(m) {
      var y = d(m);
      return function (g) {
        return String(g).replace(u, y);
      };
    }
    n(l, 'getStrictDecoder');
    var p = n(function (m, y) {
      return m < y ? 1 : -1;
    }, 'sorter');
    e.decodeHTML = (function () {
      for (var m = Object.keys(o.default).sort(p), y = Object.keys(r.default).sort(p), g = 0, S = 0; g < y.length; g++)
        m[S] === y[g] ? ((y[g] += ';?'), S++) : (y[g] += ';');
      var T = new RegExp('&(?:' + y.join('|') + '|#[xX][\\da-fA-F]+;?|#\\d+;?)', 'g'),
        O = d(r.default);
      function C(D) {
        return (D.substr(-1) !== ';' && (D += ';'), O(D));
      }
      return (
        n(C, 'replacer'),
        function (D) {
          return String(D).replace(T, C);
        }
      );
    })();
    function d(m) {
      return n(function (y) {
        if (y.charAt(1) === '#') {
          var g = y.charAt(2);
          return g === 'X' || g === 'x' ? i.default(parseInt(y.substr(3), 16)) : i.default(parseInt(y.substr(2), 10));
        }
        return m[y.slice(1, -1)] || y;
      }, 'replace');
    }
    n(d, 'getReplacer');
  }),
  es = q((e) => {
    var t =
      (e && e.__importDefault) ||
      function (R) {
        return R && R.__esModule ? R : {default: R};
      };
    (Object.defineProperty(e, '__esModule', {value: !0}),
      (e.escapeUTF8 = e.escape = e.encodeNonAsciiHTML = e.encodeHTML = e.encodeXML = void 0));
    var r = t(Xn()),
      o = p(r.default),
      s = d(o);
    e.encodeXML = D(o);
    var i = t(Kn()),
      u = p(i.default),
      l = d(u);
    ((e.encodeHTML = S(u, l)), (e.encodeNonAsciiHTML = D(u)));
    function p(R) {
      return Object.keys(R)
        .sort()
        .reduce(function (x, J) {
          return ((x[R[J]] = '&' + J + ';'), x);
        }, {});
    }
    n(p, 'getInverseObj');
    function d(R) {
      for (var x = [], J = [], K = 0, M = Object.keys(R); K < M.length; K++) {
        var se = M[K];
        se.length === 1 ? x.push('\\' + se) : J.push(se);
      }
      x.sort();
      for (var ne = 0; ne < x.length - 1; ne++) {
        for (var le = ne; le < x.length - 1 && x[le].charCodeAt(1) + 1 === x[le + 1].charCodeAt(1); ) le += 1;
        var ce = 1 + le - ne;
        ce < 3 || x.splice(ne, ce, x[ne] + '-' + x[le]);
      }
      return (J.unshift('[' + x.join('') + ']'), new RegExp(J.join('|'), 'g'));
    }
    n(d, 'getInverseReplacer');
    var m =
        /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
      y =
        String.prototype.codePointAt != null
          ? function (R) {
              return R.codePointAt(0);
            }
          : function (R) {
              return (R.charCodeAt(0) - 55296) * 1024 + R.charCodeAt(1) - 56320 + 65536;
            };
    function g(R) {
      return '&#x' + (R.length > 1 ? y(R) : R.charCodeAt(0)).toString(16).toUpperCase() + ';';
    }
    n(g, 'singleCharReplacer');
    function S(R, x) {
      return function (J) {
        return J.replace(x, function (K) {
          return R[K];
        }).replace(m, g);
      };
    }
    n(S, 'getInverse');
    var T = new RegExp(s.source + '|' + m.source, 'g');
    function O(R) {
      return R.replace(T, g);
    }
    (n(O, 'escape'), (e.escape = O));
    function C(R) {
      return R.replace(s, g);
    }
    (n(C, 'escapeUTF8'), (e.escapeUTF8 = C));
    function D(R) {
      return function (x) {
        return x.replace(T, function (J) {
          return R[J] || g(J);
        });
      };
    }
    n(D, 'getASCIIEncoder');
  }),
  Da = q((e) => {
    (Object.defineProperty(e, '__esModule', {value: !0}),
      (e.decodeXMLStrict =
        e.decodeHTML5Strict =
        e.decodeHTML4Strict =
        e.decodeHTML5 =
        e.decodeHTML4 =
        e.decodeHTMLStrict =
        e.decodeHTML =
        e.decodeXML =
        e.encodeHTML5 =
        e.encodeHTML4 =
        e.escapeUTF8 =
        e.escape =
        e.encodeNonAsciiHTML =
        e.encodeHTML =
        e.encodeXML =
        e.encode =
        e.decodeStrict =
        e.decode =
          void 0));
    var t = Qn(),
      r = es();
    function o(p, d) {
      return (!d || d <= 0 ? t.decodeXML : t.decodeHTML)(p);
    }
    (n(o, 'decode'), (e.decode = o));
    function s(p, d) {
      return (!d || d <= 0 ? t.decodeXML : t.decodeHTMLStrict)(p);
    }
    (n(s, 'decodeStrict'), (e.decodeStrict = s));
    function i(p, d) {
      return (!d || d <= 0 ? r.encodeXML : r.encodeHTML)(p);
    }
    (n(i, 'encode'), (e.encode = i));
    var u = es();
    (Object.defineProperty(e, 'encodeXML', {
      enumerable: !0,
      get: n(function () {
        return u.encodeXML;
      }, 'get'),
    }),
      Object.defineProperty(e, 'encodeHTML', {
        enumerable: !0,
        get: n(function () {
          return u.encodeHTML;
        }, 'get'),
      }),
      Object.defineProperty(e, 'encodeNonAsciiHTML', {
        enumerable: !0,
        get: n(function () {
          return u.encodeNonAsciiHTML;
        }, 'get'),
      }),
      Object.defineProperty(e, 'escape', {
        enumerable: !0,
        get: n(function () {
          return u.escape;
        }, 'get'),
      }),
      Object.defineProperty(e, 'escapeUTF8', {
        enumerable: !0,
        get: n(function () {
          return u.escapeUTF8;
        }, 'get'),
      }),
      Object.defineProperty(e, 'encodeHTML4', {
        enumerable: !0,
        get: n(function () {
          return u.encodeHTML;
        }, 'get'),
      }),
      Object.defineProperty(e, 'encodeHTML5', {
        enumerable: !0,
        get: n(function () {
          return u.encodeHTML;
        }, 'get'),
      }));
    var l = Qn();
    (Object.defineProperty(e, 'decodeXML', {
      enumerable: !0,
      get: n(function () {
        return l.decodeXML;
      }, 'get'),
    }),
      Object.defineProperty(e, 'decodeHTML', {
        enumerable: !0,
        get: n(function () {
          return l.decodeHTML;
        }, 'get'),
      }),
      Object.defineProperty(e, 'decodeHTMLStrict', {
        enumerable: !0,
        get: n(function () {
          return l.decodeHTMLStrict;
        }, 'get'),
      }),
      Object.defineProperty(e, 'decodeHTML4', {
        enumerable: !0,
        get: n(function () {
          return l.decodeHTML;
        }, 'get'),
      }),
      Object.defineProperty(e, 'decodeHTML5', {
        enumerable: !0,
        get: n(function () {
          return l.decodeHTML;
        }, 'get'),
      }),
      Object.defineProperty(e, 'decodeHTML4Strict', {
        enumerable: !0,
        get: n(function () {
          return l.decodeHTMLStrict;
        }, 'get'),
      }),
      Object.defineProperty(e, 'decodeHTML5Strict', {
        enumerable: !0,
        get: n(function () {
          return l.decodeHTMLStrict;
        }, 'get'),
      }),
      Object.defineProperty(e, 'decodeXMLStrict', {
        enumerable: !0,
        get: n(function () {
          return l.decodeXML;
        }, 'get'),
      }));
  }),
  Ha = q((e, t) => {
    function r(v, A) {
      if (!(v instanceof A)) throw new TypeError('Cannot call a class as a function');
    }
    n(r, '_classCallCheck');
    function o(v, A) {
      for (var P = 0; P < A.length; P++) {
        var F = A[P];
        ((F.enumerable = F.enumerable || !1),
          (F.configurable = !0),
          'value' in F && (F.writable = !0),
          Object.defineProperty(v, F.key, F));
      }
    }
    n(o, '_defineProperties');
    function s(v, A, P) {
      return (A && o(v.prototype, A), P && o(v, P), v);
    }
    n(s, '_createClass');
    function i(v, A) {
      var P = (typeof Symbol < 'u' && v[Symbol.iterator]) || v['@@iterator'];
      if (!P) {
        if (Array.isArray(v) || (P = u(v)) || (A && v && typeof v.length == 'number')) {
          P && (v = P);
          var F = 0,
            H = n(function () {}, 'F');
          return {
            s: H,
            n: n(function () {
              return F >= v.length ? {done: !0} : {done: !1, value: v[F++]};
            }, 'n'),
            e: n(function (he) {
              throw he;
            }, 'e'),
            f: H,
          };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var pe = !0,
        we = !1,
        ve;
      return {
        s: n(function () {
          P = P.call(v);
        }, 's'),
        n: n(function () {
          var he = P.next();
          return ((pe = he.done), he);
        }, 'n'),
        e: n(function (he) {
          ((we = !0), (ve = he));
        }, 'e'),
        f: n(function () {
          try {
            !pe && P.return != null && P.return();
          } finally {
            if (we) throw ve;
          }
        }, 'f'),
      };
    }
    n(i, '_createForOfIteratorHelper');
    function u(v, A) {
      if (v) {
        if (typeof v == 'string') return l(v, A);
        var P = Object.prototype.toString.call(v).slice(8, -1);
        if ((P === 'Object' && v.constructor && (P = v.constructor.name), P === 'Map' || P === 'Set'))
          return Array.from(v);
        if (P === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(P)) return l(v, A);
      }
    }
    n(u, '_unsupportedIterableToArray');
    function l(v, A) {
      (A == null || A > v.length) && (A = v.length);
      for (var P = 0, F = new Array(A); P < A; P++) F[P] = v[P];
      return F;
    }
    n(l, '_arrayLikeToArray');
    var p = Da(),
      d = {fg: '#FFF', bg: '#000', newline: !1, escapeXML: !1, stream: !1, colors: m()};
    function m() {
      var v = {
        0: '#000',
        1: '#A00',
        2: '#0A0',
        3: '#A50',
        4: '#00A',
        5: '#A0A',
        6: '#0AA',
        7: '#AAA',
        8: '#555',
        9: '#F55',
        10: '#5F5',
        11: '#FF5',
        12: '#55F',
        13: '#F5F',
        14: '#5FF',
        15: '#FFF',
      };
      return (
        R(0, 5).forEach(function (A) {
          R(0, 5).forEach(function (P) {
            R(0, 5).forEach(function (F) {
              return y(A, P, F, v);
            });
          });
        }),
        R(0, 23).forEach(function (A) {
          var P = A + 232,
            F = g(A * 10 + 8);
          v[P] = '#' + F + F + F;
        }),
        v
      );
    }
    n(m, 'getDefaultColors');
    function y(v, A, P, F) {
      var H = 16 + v * 36 + A * 6 + P,
        pe = v > 0 ? v * 40 + 55 : 0,
        we = A > 0 ? A * 40 + 55 : 0,
        ve = P > 0 ? P * 40 + 55 : 0;
      F[H] = S([pe, we, ve]);
    }
    n(y, 'setStyleColor');
    function g(v) {
      for (var A = v.toString(16); A.length < 2; ) A = '0' + A;
      return A;
    }
    n(g, 'toHexString');
    function S(v) {
      var A = [],
        P = i(v),
        F;
      try {
        for (P.s(); !(F = P.n()).done; ) {
          var H = F.value;
          A.push(g(H));
        }
      } catch (pe) {
        P.e(pe);
      } finally {
        P.f();
      }
      return '#' + A.join('');
    }
    n(S, 'toColorHexString');
    function T(v, A, P, F) {
      var H;
      return (
        A === 'text'
          ? (H = K(P, F))
          : A === 'display'
            ? (H = C(v, P, F))
            : A === 'xterm256Foreground'
              ? (H = ne(v, F.colors[P]))
              : A === 'xterm256Background'
                ? (H = le(v, F.colors[P]))
                : A === 'rgb' && (H = O(v, P)),
        H
      );
    }
    n(T, 'generateOutput');
    function O(v, A) {
      A = A.substring(2).slice(0, -1);
      var P = +A.substr(0, 2),
        F = A.substring(5).split(';'),
        H = F.map(function (pe) {
          return ('0' + Number(pe).toString(16)).substr(-2);
        }).join('');
      return se(v, (P === 38 ? 'color:#' : 'background-color:#') + H);
    }
    n(O, 'handleRgb');
    function C(v, A, P) {
      A = parseInt(A, 10);
      var F = {
          '-1': n(function () {
            return '<br/>';
          }, '_'),
          0: n(function () {
            return v.length && D(v);
          }, '_'),
          1: n(function () {
            return M(v, 'b');
          }, '_'),
          3: n(function () {
            return M(v, 'i');
          }, '_'),
          4: n(function () {
            return M(v, 'u');
          }, '_'),
          8: n(function () {
            return se(v, 'display:none');
          }, '_'),
          9: n(function () {
            return M(v, 'strike');
          }, '_'),
          22: n(function () {
            return se(v, 'font-weight:normal;text-decoration:none;font-style:normal');
          }, '_'),
          23: n(function () {
            return ce(v, 'i');
          }, '_'),
          24: n(function () {
            return ce(v, 'u');
          }, '_'),
          39: n(function () {
            return ne(v, P.fg);
          }, '_'),
          49: n(function () {
            return le(v, P.bg);
          }, '_'),
          53: n(function () {
            return se(v, 'text-decoration:overline');
          }, '_'),
        },
        H;
      return (
        F[A]
          ? (H = F[A]())
          : 4 < A && A < 7
            ? (H = M(v, 'blink'))
            : 29 < A && A < 38
              ? (H = ne(v, P.colors[A - 30]))
              : 39 < A && A < 48
                ? (H = le(v, P.colors[A - 40]))
                : 89 < A && A < 98
                  ? (H = ne(v, P.colors[8 + (A - 90)]))
                  : 99 < A && A < 108 && (H = le(v, P.colors[8 + (A - 100)])),
        H
      );
    }
    n(C, 'handleDisplay');
    function D(v) {
      var A = v.slice(0);
      return (
        (v.length = 0),
        A.reverse()
          .map(function (P) {
            return '</' + P + '>';
          })
          .join('')
      );
    }
    n(D, 'resetStyles');
    function R(v, A) {
      for (var P = [], F = v; F <= A; F++) P.push(F);
      return P;
    }
    n(R, 'range');
    function x(v) {
      return function (A) {
        return (v === null || A.category !== v) && v !== 'all';
      };
    }
    n(x, 'notCategory');
    function J(v) {
      v = parseInt(v, 10);
      var A = null;
      return (
        v === 0
          ? (A = 'all')
          : v === 1
            ? (A = 'bold')
            : 2 < v && v < 5
              ? (A = 'underline')
              : 4 < v && v < 7
                ? (A = 'blink')
                : v === 8
                  ? (A = 'hide')
                  : v === 9
                    ? (A = 'strike')
                    : (29 < v && v < 38) || v === 39 || (89 < v && v < 98)
                      ? (A = 'foreground-color')
                      : ((39 < v && v < 48) || v === 49 || (99 < v && v < 108)) && (A = 'background-color'),
        A
      );
    }
    n(J, 'categoryForCode');
    function K(v, A) {
      return A.escapeXML ? p.encodeXML(v) : v;
    }
    n(K, 'pushText');
    function M(v, A, P) {
      return (P || (P = ''), v.push(A), '<'.concat(A).concat(P ? ' style="'.concat(P, '"') : '', '>'));
    }
    n(M, 'pushTag');
    function se(v, A) {
      return M(v, 'span', A);
    }
    n(se, 'pushStyle');
    function ne(v, A) {
      return M(v, 'span', 'color:' + A);
    }
    n(ne, 'pushForegroundColor');
    function le(v, A) {
      return M(v, 'span', 'background-color:' + A);
    }
    n(le, 'pushBackgroundColor');
    function ce(v, A) {
      var P;
      if ((v.slice(-1)[0] === A && (P = v.pop()), P)) return '</' + A + '>';
    }
    n(ce, 'closeTag');
    function de(v, A, P) {
      var F = !1,
        H = 3;
      function pe() {
        return '';
      }
      n(pe, 'remove');
      function we(jt, Ut) {
        return (P('xterm256Foreground', Ut), '');
      }
      n(we, 'removeXterm256Foreground');
      function ve(jt, Ut) {
        return (P('xterm256Background', Ut), '');
      }
      n(ve, 'removeXterm256Background');
      function he(jt) {
        return (A.newline ? P('display', -1) : P('text', jt), '');
      }
      n(he, 'newline');
      function qe(jt, Ut) {
        ((F = !0), Ut.trim().length === 0 && (Ut = '0'), (Ut = Ut.trimRight(';').split(';')));
        var Zr = i(Ut),
          Gn;
        try {
          for (Zr.s(); !(Gn = Zr.n()).done; ) {
            var Hn = Gn.value;
            P('display', Hn);
          }
        } catch (zn) {
          Zr.e(zn);
        } finally {
          Zr.f();
        }
        return '';
      }
      n(qe, 'ansiMess');
      function Mt(jt) {
        return (P('text', jt), '');
      }
      n(Mt, 'realText');
      function Bt(jt) {
        return (P('rgb', jt), '');
      }
      n(Bt, 'rgb');
      var Vt = [
        {pattern: /^\x08+/, sub: pe},
        {pattern: /^\x1b\[[012]?K/, sub: pe},
        {pattern: /^\x1b\[\(B/, sub: pe},
        {pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/, sub: Bt},
        {pattern: /^\x1b\[38;5;(\d+)m/, sub: we},
        {pattern: /^\x1b\[48;5;(\d+)m/, sub: ve},
        {pattern: /^\n/, sub: he},
        {pattern: /^\r+\n/, sub: he},
        {pattern: /^\r/, sub: he},
        {pattern: /^\x1b\[((?:\d{1,3};?)+|)m/, sub: qe},
        {pattern: /^\x1b\[\d?J/, sub: pe},
        {pattern: /^\x1b\[\d{0,3};\d{0,3}f/, sub: pe},
        {pattern: /^\x1b\[?[\d;]{0,3}/, sub: pe},
        {pattern: /^(([^\x1b\x08\r\n])+)/, sub: Mt},
      ];
      function Ve(jt, Ut) {
        (Ut > H && F) || ((F = !1), (v = v.replace(jt.pattern, jt.sub)));
      }
      n(Ve, 'process');
      var Ft = [],
        qt = v,
        lr = qt.length;
      e: for (; lr > 0; ) {
        for (var Bn = 0, zr = 0, Jn = Vt.length; zr < Jn; Bn = ++zr) {
          var ys = Vt[Bn];
          if ((Ve(ys, Bn), v.length !== lr)) {
            lr = v.length;
            continue e;
          }
        }
        if (v.length === lr) break;
        (Ft.push(0), (lr = v.length));
      }
      return Ft;
    }
    n(de, 'tokenize');
    function B(v, A, P) {
      return (A !== 'text' && ((v = v.filter(x(J(P)))), v.push({token: A, data: P, category: J(P)})), v);
    }
    n(B, 'updateStickyStack');
    var N = (function () {
      function v(A) {
        (r(this, v),
          (A = A || {}),
          A.colors && (A.colors = Object.assign({}, d.colors, A.colors)),
          (this.options = Object.assign({}, d, A)),
          (this.stack = []),
          (this.stickyStack = []));
      }
      return (
        n(v, 'Filter'),
        s(v, [
          {
            key: 'toHtml',
            value: n(function (A) {
              var P = this;
              A = typeof A == 'string' ? [A] : A;
              var F = this.stack,
                H = this.options,
                pe = [];
              return (
                this.stickyStack.forEach(function (we) {
                  var ve = T(F, we.token, we.data, H);
                  ve && pe.push(ve);
                }),
                de(A.join(''), H, function (we, ve) {
                  var he = T(F, we, ve, H);
                  (he && pe.push(he), H.stream && (P.stickyStack = B(P.stickyStack, we, ve)));
                }),
                F.length && pe.push(D(F)),
                pe.join('')
              );
            }, 'toHtml'),
          },
        ]),
        v
      );
    })();
    t.exports = N;
  }),
  Za = q((e, t) => {
    (function (r, o) {
      typeof e == 'object' && typeof t < 'u'
        ? (t.exports = o())
        : typeof define == 'function' && define.amd
          ? define(o)
          : ((r = typeof globalThis < 'u' ? globalThis : r || self).BrowserDetector = o());
    })(e, function () {
      function r(p, d) {
        for (var m = 0; m < d.length; m++) {
          var y = d[m];
          ((y.enumerable = y.enumerable || !1),
            (y.configurable = !0),
            'value' in y && (y.writable = !0),
            Object.defineProperty(
              p,
              ((g = y.key),
              (S = void 0),
              typeof (S = (function (T, O) {
                if (typeof T != 'object' || T === null) return T;
                var C = T[Symbol.toPrimitive];
                if (C !== void 0) {
                  var D = C.call(T, O);
                  if (typeof D != 'object') return D;
                  throw new TypeError('@@toPrimitive must return a primitive value.');
                }
                return (O === 'string' ? String : Number)(T);
              })(g, 'string')) == 'symbol'
                ? S
                : String(S)),
              y,
            ));
        }
        var g, S;
      }
      n(r, 'e');
      var o = {
          chrome: 'Google Chrome',
          brave: 'Brave',
          crios: 'Google Chrome',
          edge: 'Microsoft Edge',
          edg: 'Microsoft Edge',
          edgios: 'Microsoft Edge',
          fennec: 'Mozilla Firefox',
          jsdom: 'JsDOM',
          mozilla: 'Mozilla Firefox',
          fxios: 'Mozilla Firefox',
          msie: 'Microsoft Internet Explorer',
          opera: 'Opera',
          opios: 'Opera',
          opr: 'Opera',
          opt: 'Opera',
          rv: 'Microsoft Internet Explorer',
          safari: 'Safari',
          samsungbrowser: 'Samsung Browser',
          electron: 'Electron',
        },
        s = {
          android: 'Android',
          androidTablet: 'Android Tablet',
          cros: 'Chrome OS',
          fennec: 'Android Tablet',
          ipad: 'IPad',
          iphone: 'IPhone',
          jsdom: 'JsDOM',
          linux: 'Linux',
          mac: 'Macintosh',
          tablet: 'Android Tablet',
          win: 'Windows',
          'windows phone': 'Windows Phone',
          xbox: 'Microsoft Xbox',
        },
        i = n(function (p) {
          var d = new RegExp(
              '^-?\\d+(?:.\\d{0,'.concat(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1, '})?'),
            ),
            m = Number(p).toString().match(d);
          return m ? m[0] : null;
        }, 'n'),
        u = n(function () {
          return typeof window < 'u' ? window.navigator : null;
        }, 'i'),
        l = (function () {
          function p(g) {
            var S;
            ((function (T, O) {
              if (!(T instanceof O)) throw new TypeError('Cannot call a class as a function');
            })(this, p),
              (this.userAgent = g || ((S = u()) === null || S === void 0 ? void 0 : S.userAgent) || null));
          }
          n(p, 't');
          var d, m, y;
          return (
            (d = p),
            (m = [
              {
                key: 'parseUserAgent',
                value: n(function (g) {
                  var S,
                    T,
                    O,
                    C = {},
                    D = g || this.userAgent || '',
                    R = D.toLowerCase().replace(/\s\s+/g, ' '),
                    x =
                      /(edge)\/([\w.]+)/.exec(R) ||
                      /(edg)[/]([\w.]+)/.exec(R) ||
                      /(opr)[/]([\w.]+)/.exec(R) ||
                      /(opt)[/]([\w.]+)/.exec(R) ||
                      /(fxios)[/]([\w.]+)/.exec(R) ||
                      /(edgios)[/]([\w.]+)/.exec(R) ||
                      /(jsdom)[/]([\w.]+)/.exec(R) ||
                      /(samsungbrowser)[/]([\w.]+)/.exec(R) ||
                      /(electron)[/]([\w.]+)/.exec(R) ||
                      /(chrome)[/]([\w.]+)/.exec(R) ||
                      /(crios)[/]([\w.]+)/.exec(R) ||
                      /(opios)[/]([\w.]+)/.exec(R) ||
                      /(version)(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(R) ||
                      /(webkit)[/]([\w.]+).*(version)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(R) ||
                      /(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(R) ||
                      /(webkit)[/]([\w.]+)/.exec(R) ||
                      /(opera)(?:.*version|)[/]([\w.]+)/.exec(R) ||
                      /(msie) ([\w.]+)/.exec(R) ||
                      /(fennec)[/]([\w.]+)/.exec(R) ||
                      (R.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(R)) ||
                      (R.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(R)) ||
                      [],
                    J =
                      /(ipad)/.exec(R) ||
                      /(ipod)/.exec(R) ||
                      /(iphone)/.exec(R) ||
                      /(jsdom)/.exec(R) ||
                      /(windows phone)/.exec(R) ||
                      /(xbox)/.exec(R) ||
                      /(win)/.exec(R) ||
                      /(tablet)/.exec(R) ||
                      (/(android)/.test(R) && /(mobile)/.test(R) === !1 && ['androidTablet']) ||
                      /(android)/.exec(R) ||
                      /(mac)/.exec(R) ||
                      /(linux)/.exec(R) ||
                      /(cros)/.exec(R) ||
                      [],
                    K = x[5] || x[3] || x[1] || null,
                    M = J[0] || null,
                    se = x[4] || x[2] || null,
                    ne = u();
                  (K === 'chrome' &&
                    typeof (ne == null || (S = ne.brave) === null || S === void 0 ? void 0 : S.isBrave) == 'function' &&
                    (K = 'brave'),
                    K && (C[K] = !0),
                    M && (C[M] = !0));
                  var le = !!(C.tablet || C.android || C.androidTablet),
                    ce = !!(C.ipad || C.tablet || C.androidTablet),
                    de = !!(
                      C.android ||
                      C.androidTablet ||
                      C.tablet ||
                      C.ipad ||
                      C.ipod ||
                      C.iphone ||
                      C['windows phone']
                    ),
                    B = !!(C.cros || C.mac || C.linux || C.win),
                    N = !!(C.brave || C.chrome || C.crios || C.opr || C.safari || C.edg || C.electron),
                    v = !!(C.msie || C.rv);
                  return {
                    name: (T = o[K]) !== null && T !== void 0 ? T : null,
                    platform: (O = s[M]) !== null && O !== void 0 ? O : null,
                    userAgent: D,
                    version: se,
                    shortVersion: se ? i(parseFloat(se), 2) : null,
                    isAndroid: le,
                    isTablet: ce,
                    isMobile: de,
                    isDesktop: B,
                    isWebkit: N,
                    isIE: v,
                  };
                }, 'value'),
              },
              {
                key: 'getBrowserInfo',
                value: n(function () {
                  var g = this.parseUserAgent();
                  return {
                    name: g.name,
                    platform: g.platform,
                    userAgent: g.userAgent,
                    version: g.version,
                    shortVersion: g.shortVersion,
                  };
                }, 'value'),
              },
            ]),
            (y = [
              {
                key: 'VERSION',
                get: n(function () {
                  return '3.4.0';
                }, 'get'),
              },
            ]),
            m && r(d.prototype, m),
            y && r(d, y),
            Object.defineProperty(d, 'prototype', {writable: !1}),
            p
          );
        })();
      return l;
    });
  }),
  Ht = {};
_e(Ht, {global: () => E});
var E = (() => {
    let e;
    return (
      typeof window < 'u'
        ? (e = window)
        : typeof globalThis < 'u'
          ? (e = globalThis)
          : typeof global < 'u'
            ? (e = global)
            : typeof self < 'u'
              ? (e = self)
              : (e = {}),
      e
    );
  })(),
  ge = {};
_e(ge, {
  ARGTYPES_INFO_REQUEST: () => fo,
  ARGTYPES_INFO_RESPONSE: () => nt,
  CHANNEL_CREATED: () => cl,
  CHANNEL_WS_DISCONNECT: () => Wt,
  CONFIG_ERROR: () => $t,
  CREATE_NEW_STORYFILE_REQUEST: () => pl,
  CREATE_NEW_STORYFILE_RESPONSE: () => dl,
  CURRENT_STORY_WAS_SET: () => rt,
  DOCS_PREPARED: () => Yt,
  DOCS_RENDERED: () => pr,
  FILE_COMPONENT_SEARCH_REQUEST: () => ul,
  FILE_COMPONENT_SEARCH_RESPONSE: () => fl,
  FORCE_REMOUNT: () => Kt,
  FORCE_RE_RENDER: () => dr,
  GLOBALS_UPDATED: () => Ce,
  NAVIGATE_URL: () => yl,
  PLAY_FUNCTION_THREW_EXCEPTION: () => Xt,
  PRELOAD_ENTRIES: () => Qt,
  PREVIEW_BUILDER_PROGRESS: () => ml,
  PREVIEW_KEYDOWN: () => Zt,
  REGISTER_SUBSCRIPTION: () => hl,
  REQUEST_WHATS_NEW_DATA: () => wl,
  RESET_STORY_ARGS: () => ur,
  RESULT_WHATS_NEW_DATA: () => _l,
  SAVE_STORY_REQUEST: () => Ol,
  SAVE_STORY_RESPONSE: () => Il,
  SELECT_STORY: () => gl,
  SET_CONFIG: () => Sl,
  SET_CURRENT_STORY: () => eo,
  SET_FILTER: () => bl,
  SET_GLOBALS: () => ro,
  SET_INDEX: () => Tl,
  SET_STORIES: () => El,
  SET_WHATS_NEW_CACHE: () => Cl,
  SHARED_STATE_CHANGED: () => Rl,
  SHARED_STATE_SET: () => Al,
  STORIES_COLLAPSE_ALL: () => xl,
  STORIES_EXPAND_ALL: () => vl,
  STORY_ARGS_UPDATED: () => to,
  STORY_CHANGED: () => oo,
  STORY_ERRORED: () => no,
  STORY_FINISHED: () => ot,
  STORY_INDEX_INVALIDATED: () => so,
  STORY_MISSING: () => tt,
  STORY_PREPARED: () => io,
  STORY_RENDERED: () => We,
  STORY_RENDER_PHASE_CHANGED: () => Pe,
  STORY_SPECIFIED: () => ao,
  STORY_THREW_EXCEPTION: () => lo,
  STORY_UNCHANGED: () => co,
  TELEMETRY_ERROR: () => uo,
  TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: () => Ll,
  TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: () => jl,
  TESTING_MODULE_CRASH_REPORT: () => Fl,
  TESTING_MODULE_PROGRESS_REPORT: () => Dl,
  TESTING_MODULE_RUN_ALL_REQUEST: () => kl,
  TESTING_MODULE_RUN_REQUEST: () => Nl,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: () => Pl,
  UNHANDLED_ERRORS_WHILE_PLAYING: () => Jt,
  UPDATE_GLOBALS: () => fr,
  UPDATE_QUERY_PARAMS: () => po,
  UPDATE_STORY_ARGS: () => yr,
  default: () => ll,
});
var zt = ((e) => (
    (e.CHANNEL_WS_DISCONNECT = 'channelWSDisconnect'),
    (e.CHANNEL_CREATED = 'channelCreated'),
    (e.CONFIG_ERROR = 'configError'),
    (e.STORY_INDEX_INVALIDATED = 'storyIndexInvalidated'),
    (e.STORY_SPECIFIED = 'storySpecified'),
    (e.SET_CONFIG = 'setConfig'),
    (e.SET_STORIES = 'setStories'),
    (e.SET_INDEX = 'setIndex'),
    (e.SET_CURRENT_STORY = 'setCurrentStory'),
    (e.CURRENT_STORY_WAS_SET = 'currentStoryWasSet'),
    (e.FORCE_RE_RENDER = 'forceReRender'),
    (e.FORCE_REMOUNT = 'forceRemount'),
    (e.PRELOAD_ENTRIES = 'preloadStories'),
    (e.STORY_PREPARED = 'storyPrepared'),
    (e.DOCS_PREPARED = 'docsPrepared'),
    (e.STORY_CHANGED = 'storyChanged'),
    (e.STORY_UNCHANGED = 'storyUnchanged'),
    (e.STORY_RENDERED = 'storyRendered'),
    (e.STORY_FINISHED = 'storyFinished'),
    (e.STORY_MISSING = 'storyMissing'),
    (e.STORY_ERRORED = 'storyErrored'),
    (e.STORY_THREW_EXCEPTION = 'storyThrewException'),
    (e.STORY_RENDER_PHASE_CHANGED = 'storyRenderPhaseChanged'),
    (e.PLAY_FUNCTION_THREW_EXCEPTION = 'playFunctionThrewException'),
    (e.UNHANDLED_ERRORS_WHILE_PLAYING = 'unhandledErrorsWhilePlaying'),
    (e.UPDATE_STORY_ARGS = 'updateStoryArgs'),
    (e.STORY_ARGS_UPDATED = 'storyArgsUpdated'),
    (e.RESET_STORY_ARGS = 'resetStoryArgs'),
    (e.SET_FILTER = 'setFilter'),
    (e.SET_GLOBALS = 'setGlobals'),
    (e.UPDATE_GLOBALS = 'updateGlobals'),
    (e.GLOBALS_UPDATED = 'globalsUpdated'),
    (e.REGISTER_SUBSCRIPTION = 'registerSubscription'),
    (e.PREVIEW_KEYDOWN = 'previewKeydown'),
    (e.PREVIEW_BUILDER_PROGRESS = 'preview_builder_progress'),
    (e.SELECT_STORY = 'selectStory'),
    (e.STORIES_COLLAPSE_ALL = 'storiesCollapseAll'),
    (e.STORIES_EXPAND_ALL = 'storiesExpandAll'),
    (e.DOCS_RENDERED = 'docsRendered'),
    (e.SHARED_STATE_CHANGED = 'sharedStateChanged'),
    (e.SHARED_STATE_SET = 'sharedStateSet'),
    (e.NAVIGATE_URL = 'navigateUrl'),
    (e.UPDATE_QUERY_PARAMS = 'updateQueryParams'),
    (e.REQUEST_WHATS_NEW_DATA = 'requestWhatsNewData'),
    (e.RESULT_WHATS_NEW_DATA = 'resultWhatsNewData'),
    (e.SET_WHATS_NEW_CACHE = 'setWhatsNewCache'),
    (e.TOGGLE_WHATS_NEW_NOTIFICATIONS = 'toggleWhatsNewNotifications'),
    (e.TELEMETRY_ERROR = 'telemetryError'),
    (e.FILE_COMPONENT_SEARCH_REQUEST = 'fileComponentSearchRequest'),
    (e.FILE_COMPONENT_SEARCH_RESPONSE = 'fileComponentSearchResponse'),
    (e.SAVE_STORY_REQUEST = 'saveStoryRequest'),
    (e.SAVE_STORY_RESPONSE = 'saveStoryResponse'),
    (e.ARGTYPES_INFO_REQUEST = 'argtypesInfoRequest'),
    (e.ARGTYPES_INFO_RESPONSE = 'argtypesInfoResponse'),
    (e.CREATE_NEW_STORYFILE_REQUEST = 'createNewStoryfileRequest'),
    (e.CREATE_NEW_STORYFILE_RESPONSE = 'createNewStoryfileResponse'),
    (e.TESTING_MODULE_CRASH_REPORT = 'testingModuleCrashReport'),
    (e.TESTING_MODULE_PROGRESS_REPORT = 'testingModuleProgressReport'),
    (e.TESTING_MODULE_RUN_REQUEST = 'testingModuleRunRequest'),
    (e.TESTING_MODULE_RUN_ALL_REQUEST = 'testingModuleRunAllRequest'),
    (e.TESTING_MODULE_CANCEL_TEST_RUN_REQUEST = 'testingModuleCancelTestRunRequest'),
    (e.TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE = 'testingModuleCancelTestRunResponse'),
    e
  ))(zt || {}),
  ll = zt,
  {
    CHANNEL_WS_DISCONNECT: Wt,
    CHANNEL_CREATED: cl,
    CONFIG_ERROR: $t,
    CREATE_NEW_STORYFILE_REQUEST: pl,
    CREATE_NEW_STORYFILE_RESPONSE: dl,
    CURRENT_STORY_WAS_SET: rt,
    DOCS_PREPARED: Yt,
    DOCS_RENDERED: pr,
    FILE_COMPONENT_SEARCH_REQUEST: ul,
    FILE_COMPONENT_SEARCH_RESPONSE: fl,
    FORCE_RE_RENDER: dr,
    FORCE_REMOUNT: Kt,
    GLOBALS_UPDATED: Ce,
    NAVIGATE_URL: yl,
    PLAY_FUNCTION_THREW_EXCEPTION: Xt,
    UNHANDLED_ERRORS_WHILE_PLAYING: Jt,
    PRELOAD_ENTRIES: Qt,
    PREVIEW_BUILDER_PROGRESS: ml,
    PREVIEW_KEYDOWN: Zt,
    REGISTER_SUBSCRIPTION: hl,
    RESET_STORY_ARGS: ur,
    SELECT_STORY: gl,
    SET_CONFIG: Sl,
    SET_CURRENT_STORY: eo,
    SET_FILTER: bl,
    SET_GLOBALS: ro,
    SET_INDEX: Tl,
    SET_STORIES: El,
    SHARED_STATE_CHANGED: Rl,
    SHARED_STATE_SET: Al,
    STORIES_COLLAPSE_ALL: xl,
    STORIES_EXPAND_ALL: vl,
    STORY_ARGS_UPDATED: to,
    STORY_CHANGED: oo,
    STORY_ERRORED: no,
    STORY_INDEX_INVALIDATED: so,
    STORY_MISSING: tt,
    STORY_PREPARED: io,
    STORY_RENDER_PHASE_CHANGED: Pe,
    STORY_RENDERED: We,
    STORY_FINISHED: ot,
    STORY_SPECIFIED: ao,
    STORY_THREW_EXCEPTION: lo,
    STORY_UNCHANGED: co,
    UPDATE_GLOBALS: fr,
    UPDATE_QUERY_PARAMS: po,
    UPDATE_STORY_ARGS: yr,
    REQUEST_WHATS_NEW_DATA: wl,
    RESULT_WHATS_NEW_DATA: _l,
    SET_WHATS_NEW_CACHE: Cl,
    TOGGLE_WHATS_NEW_NOTIFICATIONS: Pl,
    TELEMETRY_ERROR: uo,
    SAVE_STORY_REQUEST: Ol,
    SAVE_STORY_RESPONSE: Il,
    ARGTYPES_INFO_REQUEST: fo,
    ARGTYPES_INFO_RESPONSE: nt,
    TESTING_MODULE_CRASH_REPORT: Fl,
    TESTING_MODULE_PROGRESS_REPORT: Dl,
    TESTING_MODULE_RUN_REQUEST: Nl,
    TESTING_MODULE_RUN_ALL_REQUEST: kl,
    TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: Ll,
    TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: jl,
  } = zt,
  yo = {
    '@storybook/global': '__STORYBOOK_MODULE_GLOBAL__',
    'storybook/internal/channels': '__STORYBOOK_MODULE_CHANNELS__',
    '@storybook/channels': '__STORYBOOK_MODULE_CHANNELS__',
    '@storybook/core/channels': '__STORYBOOK_MODULE_CHANNELS__',
    'storybook/internal/client-logger': '__STORYBOOK_MODULE_CLIENT_LOGGER__',
    '@storybook/client-logger': '__STORYBOOK_MODULE_CLIENT_LOGGER__',
    '@storybook/core/client-logger': '__STORYBOOK_MODULE_CLIENT_LOGGER__',
    'storybook/internal/core-events': '__STORYBOOK_MODULE_CORE_EVENTS__',
    '@storybook/core-events': '__STORYBOOK_MODULE_CORE_EVENTS__',
    '@storybook/core/core-events': '__STORYBOOK_MODULE_CORE_EVENTS__',
    'storybook/internal/preview-errors': '__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__',
    '@storybook/core-events/preview-errors': '__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__',
    '@storybook/core/preview-errors': '__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__',
    'storybook/internal/preview-api': '__STORYBOOK_MODULE_PREVIEW_API__',
    '@storybook/preview-api': '__STORYBOOK_MODULE_PREVIEW_API__',
    '@storybook/core/preview-api': '__STORYBOOK_MODULE_PREVIEW_API__',
    'storybook/internal/types': '__STORYBOOK_MODULE_TYPES__',
    '@storybook/types': '__STORYBOOK_MODULE_TYPES__',
    '@storybook/core/types': '__STORYBOOK_MODULE_TYPES__',
  },
  cs = Object.keys(yo),
  br = {};
_e(br, {
  Channel: () => ie,
  HEARTBEAT_INTERVAL: () => Po,
  HEARTBEAT_MAX_LATENCY: () => Oo,
  PostMessageTransport: () => Qe,
  WebsocketTransport: () => Ze,
  createBrowserChannel: () => kd,
  default: () => Nd,
});
function _(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  var o = Array.from(typeof e == 'string' ? [e] : e);
  o[o.length - 1] = o[o.length - 1].replace(/\r?\n([\t ]*)$/, '');
  var s = o.reduce(function (l, p) {
    var d = p.match(/\n([\t ]+|(?!\s).)/g);
    return d
      ? l.concat(
          d.map(function (m) {
            var y, g;
            return (g = (y = m.match(/[\t ]/g)) === null || y === void 0 ? void 0 : y.length) !== null && g !== void 0
              ? g
              : 0;
          }),
        )
      : l;
  }, []);
  if (s.length) {
    var i = new RegExp(
      `
[	 ]{` +
        Math.min.apply(Math, s) +
        '}',
      'g',
    );
    o = o.map(function (l) {
      return l.replace(
        i,
        `
`,
      );
    });
  }
  o[0] = o[0].replace(/^\r?\n/, '');
  var u = o[0];
  return (
    t.forEach(function (l, p) {
      var d = u.match(/(?:^|\n)( *)$/),
        m = d ? d[1] : '',
        y = l;
      (typeof l == 'string' &&
        l.includes(`
`) &&
        (y = String(l)
          .split(
            `
`,
          )
          .map(function (g, S) {
            return S === 0 ? g : '' + m + g;
          }).join(`
`)),
        (u += y + o[p + 1]));
    }),
    u
  );
}
n(_, 'dedent');
var ps = _,
  mo = new Map(),
  Ml = 'UNIVERSAL_STORE:',
  ee = {PENDING: 'PENDING', RESOLVED: 'RESOLVED', REJECTED: 'REJECTED'},
  w = class re {
    constructor(t, r) {
      if (
        ((this.debugging = !1),
        (this.listeners = new Map([['*', new Set()]])),
        (this.getState = n(() => (this.debug('getState', {state: this.state}), this.state), 'getState')),
        (this.subscribe = n((o, s) => {
          let i = typeof o == 'function',
            u = i ? '*' : o,
            l = i ? o : s;
          if ((this.debug('subscribe', {eventType: u, listener: l}), !l))
            throw new TypeError(
              `Missing first subscribe argument, or second if first is the event type, when subscribing to a UniversalStore with id '${this.id}'`,
            );
          return (
            this.listeners.has(u) || this.listeners.set(u, new Set()),
            this.listeners.get(u).add(l),
            () => {
              (this.debug('unsubscribe', {eventType: u, listener: l}),
                this.listeners.has(u) &&
                  (this.listeners.get(u).delete(l), this.listeners.get(u)?.size === 0 && this.listeners.delete(u)));
            }
          );
        }, 'subscribe')),
        (this.send = n((o) => {
          if ((this.debug('send', {event: o}), this.status !== re.Status.READY))
            throw new TypeError(_`Cannot send event before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify({event: o, id: this.id, actor: this.actor, environment: this.environment}, null, 2)}`);
          (this.emitToListeners(o, {actor: this.actor}), this.emitToChannel(o, {actor: this.actor}));
        }, 'send')),
        (this.debugging = t.debug ?? !1),
        !re.isInternalConstructing)
      )
        throw new TypeError('UniversalStore is not constructable - use UniversalStore.create() instead');
      if (
        ((re.isInternalConstructing = !1),
        (this.id = t.id),
        (this.actorId = Date.now().toString(36) + Math.random().toString(36).substring(2)),
        (this.actorType = t.leader ? re.ActorType.LEADER : re.ActorType.FOLLOWER),
        (this.state = t.initialState),
        (this.channelEventName = `${Ml}${this.id}`),
        this.debug('constructor', {options: t, environmentOverrides: r, channelEventName: this.channelEventName}),
        this.actor.type === re.ActorType.LEADER)
      )
        this.syncing = {state: ee.RESOLVED, promise: Promise.resolve()};
      else {
        let o,
          s,
          i = new Promise((u, l) => {
            ((o = n(() => {
              this.syncing.state === ee.PENDING && ((this.syncing.state = ee.RESOLVED), u());
            }, 'syncingResolve')),
              (s = n((p) => {
                this.syncing.state === ee.PENDING && ((this.syncing.state = ee.REJECTED), l(p));
              }, 'syncingReject')));
          });
        this.syncing = {state: ee.PENDING, promise: i, resolve: o, reject: s};
      }
      ((this.getState = this.getState.bind(this)),
        (this.setState = this.setState.bind(this)),
        (this.subscribe = this.subscribe.bind(this)),
        (this.onStateChange = this.onStateChange.bind(this)),
        (this.send = this.send.bind(this)),
        (this.emitToChannel = this.emitToChannel.bind(this)),
        (this.prepareThis = this.prepareThis.bind(this)),
        (this.emitToListeners = this.emitToListeners.bind(this)),
        (this.handleChannelEvents = this.handleChannelEvents.bind(this)),
        (this.debug = this.debug.bind(this)),
        (this.channel = r?.channel ?? re.preparation.channel),
        (this.environment = r?.environment ?? re.preparation.environment),
        this.channel && this.environment
          ? this.prepareThis({channel: this.channel, environment: this.environment})
          : re.preparation.promise.then(this.prepareThis));
    }
    static setupPreparationPromise() {
      let t,
        r,
        o = new Promise((s, i) => {
          ((t = n((u) => {
            s(u);
          }, 'resolveRef')),
            (r = n((...u) => {
              i(u);
            }, 'rejectRef')));
        });
      re.preparation = {resolve: t, reject: r, promise: o};
    }
    get actor() {
      return Object.freeze({
        id: this.actorId,
        type: this.actorType,
        environment: this.environment ?? re.Environment.UNKNOWN,
      });
    }
    get status() {
      if (!this.channel || !this.environment) return re.Status.UNPREPARED;
      switch (this.syncing?.state) {
        case ee.PENDING:
        case void 0:
          return re.Status.SYNCING;
        case ee.REJECTED:
          return re.Status.ERROR;
        case ee.RESOLVED:
        default:
          return re.Status.READY;
      }
    }
    untilReady() {
      return Promise.all([re.preparation.promise, this.syncing?.promise]);
    }
    static create(t) {
      if (!t || typeof t?.id != 'string')
        throw new TypeError('id is required and must be a string, when creating a UniversalStore');
      t.debug &&
        console.debug(
          _`[UniversalStore]
        create`,
          {options: t},
        );
      let r = mo.get(t.id);
      if (r)
        return (
          console.warn(_`UniversalStore with id "${t.id}" already exists in this environment, re-using existing.
        You should reuse the existing instance instead of trying to create a new one.`),
          r
        );
      re.isInternalConstructing = !0;
      let o = new re(t);
      return (mo.set(t.id, o), o);
    }
    static __prepare(t, r) {
      ((re.preparation.channel = t),
        (re.preparation.environment = r),
        re.preparation.resolve({channel: t, environment: r}));
    }
    setState(t) {
      let r = this.state,
        o = typeof t == 'function' ? t(r) : t;
      if ((this.debug('setState', {newState: o, previousState: r, updater: t}), this.status !== re.Status.READY))
        throw new TypeError(_`Cannot set state before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify({newState: o, id: this.id, actor: this.actor, environment: this.environment}, null, 2)}`);
      this.state = o;
      let s = {type: re.InternalEventType.SET_STATE, payload: {state: o, previousState: r}};
      (this.emitToChannel(s, {actor: this.actor}), this.emitToListeners(s, {actor: this.actor}));
    }
    onStateChange(t) {
      return (
        this.debug('onStateChange', {listener: t}),
        this.subscribe(re.InternalEventType.SET_STATE, ({payload: r}, o) => {
          t(r.state, r.previousState, o);
        })
      );
    }
    emitToChannel(t, r) {
      (this.debug('emitToChannel', {event: t, eventInfo: r, channel: this.channel}),
        this.channel?.emit(this.channelEventName, {event: t, eventInfo: r}));
    }
    prepareThis({channel: t, environment: r}) {
      ((this.channel = t),
        (this.environment = r),
        this.debug('prepared', {channel: t, environment: r}),
        this.channel.on(this.channelEventName, this.handleChannelEvents),
        this.actor.type === re.ActorType.LEADER
          ? this.emitToChannel({type: re.InternalEventType.LEADER_CREATED}, {actor: this.actor})
          : (this.emitToChannel({type: re.InternalEventType.FOLLOWER_CREATED}, {actor: this.actor}),
            this.emitToChannel({type: re.InternalEventType.EXISTING_STATE_REQUEST}, {actor: this.actor}),
            setTimeout(() => {
              this.syncing.reject(
                new TypeError(
                  `No existing state found for follower with id: '${this.id}'. Make sure a leader with the same id exists before creating a follower.`,
                ),
              );
            }, 1e3)));
    }
    emitToListeners(t, r) {
      let o = this.listeners.get(t.type),
        s = this.listeners.get('*');
      (this.debug('emitToListeners', {event: t, eventInfo: r, eventTypeListeners: o, everythingListeners: s}),
        [...(o ?? []), ...(s ?? [])].forEach((i) => i(t, r)));
    }
    handleChannelEvents(t) {
      let {event: r, eventInfo: o} = t;
      if ([o.actor.id, o.forwardingActor?.id].includes(this.actor.id)) {
        this.debug('handleChannelEvents: Ignoring event from self', {channelEvent: t});
        return;
      } else if (this.syncing?.state === ee.PENDING && r.type !== re.InternalEventType.EXISTING_STATE_RESPONSE) {
        this.debug('handleChannelEvents: Ignoring event while syncing', {channelEvent: t});
        return;
      }
      if ((this.debug('handleChannelEvents', {channelEvent: t}), this.actor.type === re.ActorType.LEADER)) {
        let s = !0;
        switch (r.type) {
          case re.InternalEventType.EXISTING_STATE_REQUEST:
            s = !1;
            let i = {type: re.InternalEventType.EXISTING_STATE_RESPONSE, payload: this.state};
            (this.debug('handleChannelEvents: responding to existing state request', {responseEvent: i}),
              this.emitToChannel(i, {actor: this.actor}));
            break;
          case re.InternalEventType.LEADER_CREATED:
            ((s = !1),
              (this.syncing.state = ee.REJECTED),
              this.debug('handleChannelEvents: erroring due to second leader being created', {event: r}),
              console.error(_`Detected multiple UniversalStore leaders created with the same id "${this.id}".
            Only one leader can exists at a time, your stores are now in an invalid state.
            Leaders detected:
            this: ${JSON.stringify(this.actor, null, 2)}
            other: ${JSON.stringify(o.actor, null, 2)}`));
            break;
        }
        s &&
          (this.debug('handleChannelEvents: forwarding event', {channelEvent: t}),
          this.emitToChannel(r, {actor: o.actor, forwardingActor: this.actor}));
      }
      if (this.actor.type === re.ActorType.FOLLOWER)
        switch (r.type) {
          case re.InternalEventType.EXISTING_STATE_RESPONSE:
            if (
              (this.debug("handleChannelEvents: Setting state from leader's existing state response", {event: r}),
              this.syncing?.state !== ee.PENDING)
            )
              break;
            this.syncing.resolve?.();
            let s = {type: re.InternalEventType.SET_STATE, payload: {state: r.payload, previousState: this.state}};
            ((this.state = r.payload), this.emitToListeners(s, o));
            break;
        }
      (r.type === re.InternalEventType.SET_STATE &&
        (this.debug('handleChannelEvents: Setting state', {event: r}), (this.state = r.payload.state)),
        this.emitToListeners(r, {actor: o.actor}));
    }
    debug(t, r) {
      this.debugging &&
        console.debug(
          _`[UniversalStore::${this.id}::${this.environment ?? re.Environment.UNKNOWN}]
        ${t}`,
          JSON.stringify({data: r, actor: this.actor, state: this.state, status: this.status}, null, 2),
        );
    }
    static __reset() {
      (re.preparation.reject(new Error('reset')), re.setupPreparationPromise(), (re.isInternalConstructing = !1));
    }
  };
(n(w, 'UniversalStore'),
  (w.ActorType = {LEADER: 'LEADER', FOLLOWER: 'FOLLOWER'}),
  (w.Environment = {SERVER: 'SERVER', MANAGER: 'MANAGER', PREVIEW: 'PREVIEW', UNKNOWN: 'UNKNOWN', MOCK: 'MOCK'}),
  (w.InternalEventType = {
    EXISTING_STATE_REQUEST: '__EXISTING_STATE_REQUEST',
    EXISTING_STATE_RESPONSE: '__EXISTING_STATE_RESPONSE',
    SET_STATE: '__SET_STATE',
    LEADER_CREATED: '__LEADER_CREATED',
    FOLLOWER_CREATED: '__FOLLOWER_CREATED',
  }),
  (w.Status = {UNPREPARED: 'UNPREPARED', SYNCING: 'SYNCING', READY: 'READY', ERROR: 'ERROR'}),
  (w.isInternalConstructing = !1),
  w.setupPreparationPromise());
var Q = w,
  Ul = n((e) => e.transports !== void 0, 'isMulti'),
  Gl = n(() => Math.random().toString(16).slice(2), 'generateRandomId'),
  ho = class {
    constructor(t = {}) {
      ((this.sender = Gl()),
        (this.events = {}),
        (this.data = {}),
        (this.transports = []),
        (this.isAsync = t.async || !1),
        Ul(t)
          ? ((this.transports = t.transports || []),
            this.transports.forEach((r) => {
              r.setHandler((o) => this.handleEvent(o));
            }))
          : (this.transports = t.transport ? [t.transport] : []),
        this.transports.forEach((r) => {
          r.setHandler((o) => this.handleEvent(o));
        }));
    }
    get hasTransport() {
      return this.transports.length > 0;
    }
    addListener(t, r) {
      ((this.events[t] = this.events[t] || []), this.events[t].push(r));
    }
    emit(t, ...r) {
      let o = {type: t, args: r, from: this.sender},
        s = {};
      r.length >= 1 && r[0] && r[0].options && (s = r[0].options);
      let i = n(() => {
        (this.transports.forEach((u) => {
          u.send(o, s);
        }),
          this.handleEvent(o));
      }, 'handler');
      this.isAsync ? setImmediate(i) : i();
    }
    last(t) {
      return this.data[t];
    }
    eventNames() {
      return Object.keys(this.events);
    }
    listenerCount(t) {
      let r = this.listeners(t);
      return r ? r.length : 0;
    }
    listeners(t) {
      return this.events[t] || void 0;
    }
    once(t, r) {
      let o = this.onceListener(t, r);
      this.addListener(t, o);
    }
    removeAllListeners(t) {
      t ? this.events[t] && delete this.events[t] : (this.events = {});
    }
    removeListener(t, r) {
      let o = this.listeners(t);
      o && (this.events[t] = o.filter((s) => s !== r));
    }
    on(t, r) {
      this.addListener(t, r);
    }
    off(t, r) {
      this.removeListener(t, r);
    }
    handleEvent(t) {
      let r = this.listeners(t.type);
      (r &&
        r.length &&
        r.forEach((o) => {
          o.apply(t, t.args);
        }),
        (this.data[t.type] = t.args));
    }
    onceListener(t, r) {
      let o = n((...s) => (this.removeListener(t, o), r(...s)), 'onceListener');
      return o;
    }
  };
n(ho, 'Channel');
var ie = ho,
  mr = {};
_e(mr, {deprecate: () => ae, logger: () => I, once: () => j, pretty: () => X});
var {LOGLEVEL: ql} = E,
  Se = {trace: 1, debug: 2, info: 3, warn: 4, error: 5, silent: 10},
  Bl = ql,
  $e = Se[Bl] || Se.info,
  I = {
    trace: n((e, ...t) => {
      $e <= Se.trace && console.trace(e, ...t);
    }, 'trace'),
    debug: n((e, ...t) => {
      $e <= Se.debug && console.debug(e, ...t);
    }, 'debug'),
    info: n((e, ...t) => {
      $e <= Se.info && console.info(e, ...t);
    }, 'info'),
    warn: n((e, ...t) => {
      $e <= Se.warn && console.warn(e, ...t);
    }, 'warn'),
    error: n((e, ...t) => {
      $e <= Se.error && console.error(e, ...t);
    }, 'error'),
    log: n((e, ...t) => {
      $e < Se.silent && console.log(e, ...t);
    }, 'log'),
  },
  go = new Set(),
  j = n(
    (e) =>
      (t, ...r) => {
        if (!go.has(t)) return (go.add(t), I[e](t, ...r));
      },
    'once',
  );
j.clear = () => go.clear();
j.trace = j('trace');
j.debug = j('debug');
j.info = j('info');
j.warn = j('warn');
j.error = j('error');
j.log = j('log');
var ae = j('warn'),
  X = n(
    (e) =>
      (...t) => {
        let r = [];
        if (t.length) {
          let o = /<span\s+style=(['"])([^'"]*)\1\s*>/gi,
            s = /<\/span>/gi,
            i;
          for (r.push(t[0].replace(o, '%c').replace(s, '%c')); (i = o.exec(t[0])); ) (r.push(i[2]), r.push(''));
          for (let u = 1; u < t.length; u++) r.push(t[u]);
        }
        I[e].apply(I, r);
      },
    'pretty',
  );
X.trace = X('trace');
X.debug = X('debug');
X.info = X('info');
X.warn = X('warn');
X.error = X('error');
var Vl = Object.create,
  ds = Object.defineProperty,
  Hl = Object.getOwnPropertyDescriptor,
  us = Object.getOwnPropertyNames,
  zl = Object.getPrototypeOf,
  Wl = Object.prototype.hasOwnProperty,
  Z = n(
    (e, t) =>
      n(function () {
        return (t || (0, e[us(e)[0]])((t = {exports: {}}).exports, t), t.exports);
      }, '__require'),
    '__commonJS',
  ),
  $l = n((e, t, r, o) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let s of us(t))
        !Wl.call(e, s) && s !== r && ds(e, s, {get: n(() => t[s], 'get'), enumerable: !(o = Hl(t, s)) || o.enumerable});
    return e;
  }, '__copyProps'),
  st = n(
    (e, t, r) => (
      (r = e != null ? Vl(zl(e)) : {}),
      $l(t || !e || !e.__esModule ? ds(r, 'default', {value: e, enumerable: !0}) : r, e)
    ),
    '__toESM',
  ),
  Yl = [
    'bubbles',
    'cancelBubble',
    'cancelable',
    'composed',
    'currentTarget',
    'defaultPrevented',
    'eventPhase',
    'isTrusted',
    'returnValue',
    'srcElement',
    'target',
    'timeStamp',
    'type',
  ],
  Kl = ['detail'];
function fs(e) {
  let t = Yl.filter((r) => e[r] !== void 0).reduce((r, o) => ({...r, [o]: e[o]}), {});
  return (
    e instanceof CustomEvent &&
      Kl.filter((r) => e[r] !== void 0).forEach((r) => {
        t[r] = e[r];
      }),
    t
  );
}
n(fs, 'extractEventHiddenProperties');
var Ps = ue(it()),
  Ts = Z({
    'node_modules/has-symbols/shams.js'(e, t) {
      t.exports = n(function () {
        if (typeof Symbol != 'function' || typeof Object.getOwnPropertySymbols != 'function') return !1;
        if (typeof Symbol.iterator == 'symbol') return !0;
        var r = {},
          o = Symbol('test'),
          s = Object(o);
        if (
          typeof o == 'string' ||
          Object.prototype.toString.call(o) !== '[object Symbol]' ||
          Object.prototype.toString.call(s) !== '[object Symbol]'
        )
          return !1;
        var i = 42;
        r[o] = i;
        for (o in r) return !1;
        if (
          (typeof Object.keys == 'function' && Object.keys(r).length !== 0) ||
          (typeof Object.getOwnPropertyNames == 'function' && Object.getOwnPropertyNames(r).length !== 0)
        )
          return !1;
        var u = Object.getOwnPropertySymbols(r);
        if (u.length !== 1 || u[0] !== o || !Object.prototype.propertyIsEnumerable.call(r, o)) return !1;
        if (typeof Object.getOwnPropertyDescriptor == 'function') {
          var l = Object.getOwnPropertyDescriptor(r, o);
          if (l.value !== i || l.enumerable !== !0) return !1;
        }
        return !0;
      }, 'hasSymbols');
    },
  }),
  Es = Z({
    'node_modules/has-symbols/index.js'(e, t) {
      var r = typeof Symbol < 'u' && Symbol,
        o = Ts();
      t.exports = n(function () {
        return typeof r != 'function' ||
          typeof Symbol != 'function' ||
          typeof r('foo') != 'symbol' ||
          typeof Symbol('bar') != 'symbol'
          ? !1
          : o();
      }, 'hasNativeSymbols');
    },
  }),
  Xl = Z({
    'node_modules/function-bind/implementation.js'(e, t) {
      var r = 'Function.prototype.bind called on incompatible ',
        o = Array.prototype.slice,
        s = Object.prototype.toString,
        i = '[object Function]';
      t.exports = n(function (u) {
        var l = this;
        if (typeof l != 'function' || s.call(l) !== i) throw new TypeError(r + l);
        for (
          var p = o.call(arguments, 1),
            d,
            m = n(function () {
              if (this instanceof d) {
                var O = l.apply(this, p.concat(o.call(arguments)));
                return Object(O) === O ? O : this;
              } else return l.apply(u, p.concat(o.call(arguments)));
            }, 'binder'),
            y = Math.max(0, l.length - p.length),
            g = [],
            S = 0;
          S < y;
          S++
        )
          g.push('$' + S);
        if (
          ((d = Function('binder', 'return function (' + g.join(',') + '){ return binder.apply(this,arguments); }')(m)),
          l.prototype)
        ) {
          var T = n(function () {}, 'Empty2');
          ((T.prototype = l.prototype), (d.prototype = new T()), (T.prototype = null));
        }
        return d;
      }, 'bind');
    },
  }),
  To = Z({
    'node_modules/function-bind/index.js'(e, t) {
      var r = Xl();
      t.exports = Function.prototype.bind || r;
    },
  }),
  Jl = Z({
    'node_modules/has/src/index.js'(e, t) {
      var r = To();
      t.exports = r.call(Function.call, Object.prototype.hasOwnProperty);
    },
  }),
  Rs = Z({
    'node_modules/get-intrinsic/index.js'(e, t) {
      var r,
        o = SyntaxError,
        s = Function,
        i = TypeError,
        u = n(function (B) {
          try {
            return s('"use strict"; return (' + B + ').constructor;')();
          } catch {}
        }, 'getEvalledConstructor'),
        l = Object.getOwnPropertyDescriptor;
      if (l)
        try {
          l({}, '');
        } catch {
          l = null;
        }
      var p = n(function () {
          throw new i();
        }, 'throwTypeError'),
        d = l
          ? (function () {
              try {
                return (arguments.callee, p);
              } catch {
                try {
                  return l(arguments, 'callee').get;
                } catch {
                  return p;
                }
              }
            })()
          : p,
        m = Es()(),
        y =
          Object.getPrototypeOf ||
          function (B) {
            return B.__proto__;
          },
        g = {},
        S = typeof Uint8Array > 'u' ? r : y(Uint8Array),
        T = {
          '%AggregateError%': typeof AggregateError > 'u' ? r : AggregateError,
          '%Array%': Array,
          '%ArrayBuffer%': typeof ArrayBuffer > 'u' ? r : ArrayBuffer,
          '%ArrayIteratorPrototype%': m ? y([][Symbol.iterator]()) : r,
          '%AsyncFromSyncIteratorPrototype%': r,
          '%AsyncFunction%': g,
          '%AsyncGenerator%': g,
          '%AsyncGeneratorFunction%': g,
          '%AsyncIteratorPrototype%': g,
          '%Atomics%': typeof Atomics > 'u' ? r : Atomics,
          '%BigInt%': typeof BigInt > 'u' ? r : BigInt,
          '%Boolean%': Boolean,
          '%DataView%': typeof DataView > 'u' ? r : DataView,
          '%Date%': Date,
          '%decodeURI%': decodeURI,
          '%decodeURIComponent%': decodeURIComponent,
          '%encodeURI%': encodeURI,
          '%encodeURIComponent%': encodeURIComponent,
          '%Error%': Error,
          '%eval%': eval,
          '%EvalError%': EvalError,
          '%Float32Array%': typeof Float32Array > 'u' ? r : Float32Array,
          '%Float64Array%': typeof Float64Array > 'u' ? r : Float64Array,
          '%FinalizationRegistry%': typeof FinalizationRegistry > 'u' ? r : FinalizationRegistry,
          '%Function%': s,
          '%GeneratorFunction%': g,
          '%Int8Array%': typeof Int8Array > 'u' ? r : Int8Array,
          '%Int16Array%': typeof Int16Array > 'u' ? r : Int16Array,
          '%Int32Array%': typeof Int32Array > 'u' ? r : Int32Array,
          '%isFinite%': isFinite,
          '%isNaN%': isNaN,
          '%IteratorPrototype%': m ? y(y([][Symbol.iterator]())) : r,
          '%JSON%': typeof JSON == 'object' ? JSON : r,
          '%Map%': typeof Map > 'u' ? r : Map,
          '%MapIteratorPrototype%': typeof Map > 'u' || !m ? r : y(new Map()[Symbol.iterator]()),
          '%Math%': Math,
          '%Number%': Number,
          '%Object%': Object,
          '%parseFloat%': parseFloat,
          '%parseInt%': parseInt,
          '%Promise%': typeof Promise > 'u' ? r : Promise,
          '%Proxy%': typeof Proxy > 'u' ? r : Proxy,
          '%RangeError%': RangeError,
          '%ReferenceError%': ReferenceError,
          '%Reflect%': typeof Reflect > 'u' ? r : Reflect,
          '%RegExp%': RegExp,
          '%Set%': typeof Set > 'u' ? r : Set,
          '%SetIteratorPrototype%': typeof Set > 'u' || !m ? r : y(new Set()[Symbol.iterator]()),
          '%SharedArrayBuffer%': typeof SharedArrayBuffer > 'u' ? r : SharedArrayBuffer,
          '%String%': String,
          '%StringIteratorPrototype%': m ? y(''[Symbol.iterator]()) : r,
          '%Symbol%': m ? Symbol : r,
          '%SyntaxError%': o,
          '%ThrowTypeError%': d,
          '%TypedArray%': S,
          '%TypeError%': i,
          '%Uint8Array%': typeof Uint8Array > 'u' ? r : Uint8Array,
          '%Uint8ClampedArray%': typeof Uint8ClampedArray > 'u' ? r : Uint8ClampedArray,
          '%Uint16Array%': typeof Uint16Array > 'u' ? r : Uint16Array,
          '%Uint32Array%': typeof Uint32Array > 'u' ? r : Uint32Array,
          '%URIError%': URIError,
          '%WeakMap%': typeof WeakMap > 'u' ? r : WeakMap,
          '%WeakRef%': typeof WeakRef > 'u' ? r : WeakRef,
          '%WeakSet%': typeof WeakSet > 'u' ? r : WeakSet,
        },
        O = n(function B(N) {
          var v;
          if (N === '%AsyncFunction%') v = u('async function () {}');
          else if (N === '%GeneratorFunction%') v = u('function* () {}');
          else if (N === '%AsyncGeneratorFunction%') v = u('async function* () {}');
          else if (N === '%AsyncGenerator%') {
            var A = B('%AsyncGeneratorFunction%');
            A && (v = A.prototype);
          } else if (N === '%AsyncIteratorPrototype%') {
            var P = B('%AsyncGenerator%');
            P && (v = y(P.prototype));
          }
          return ((T[N] = v), v);
        }, 'doEval2'),
        C = {
          '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
          '%ArrayPrototype%': ['Array', 'prototype'],
          '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
          '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
          '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
          '%ArrayProto_values%': ['Array', 'prototype', 'values'],
          '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
          '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
          '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
          '%BooleanPrototype%': ['Boolean', 'prototype'],
          '%DataViewPrototype%': ['DataView', 'prototype'],
          '%DatePrototype%': ['Date', 'prototype'],
          '%ErrorPrototype%': ['Error', 'prototype'],
          '%EvalErrorPrototype%': ['EvalError', 'prototype'],
          '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
          '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
          '%FunctionPrototype%': ['Function', 'prototype'],
          '%Generator%': ['GeneratorFunction', 'prototype'],
          '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
          '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
          '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
          '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
          '%JSONParse%': ['JSON', 'parse'],
          '%JSONStringify%': ['JSON', 'stringify'],
          '%MapPrototype%': ['Map', 'prototype'],
          '%NumberPrototype%': ['Number', 'prototype'],
          '%ObjectPrototype%': ['Object', 'prototype'],
          '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
          '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
          '%PromisePrototype%': ['Promise', 'prototype'],
          '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
          '%Promise_all%': ['Promise', 'all'],
          '%Promise_reject%': ['Promise', 'reject'],
          '%Promise_resolve%': ['Promise', 'resolve'],
          '%RangeErrorPrototype%': ['RangeError', 'prototype'],
          '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
          '%RegExpPrototype%': ['RegExp', 'prototype'],
          '%SetPrototype%': ['Set', 'prototype'],
          '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
          '%StringPrototype%': ['String', 'prototype'],
          '%SymbolPrototype%': ['Symbol', 'prototype'],
          '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
          '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
          '%TypeErrorPrototype%': ['TypeError', 'prototype'],
          '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
          '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
          '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
          '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
          '%URIErrorPrototype%': ['URIError', 'prototype'],
          '%WeakMapPrototype%': ['WeakMap', 'prototype'],
          '%WeakSetPrototype%': ['WeakSet', 'prototype'],
        },
        D = To(),
        R = Jl(),
        x = D.call(Function.call, Array.prototype.concat),
        J = D.call(Function.apply, Array.prototype.splice),
        K = D.call(Function.call, String.prototype.replace),
        M = D.call(Function.call, String.prototype.slice),
        se = D.call(Function.call, RegExp.prototype.exec),
        ne = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
        le = /\\(\\)?/g,
        ce = n(function (B) {
          var N = M(B, 0, 1),
            v = M(B, -1);
          if (N === '%' && v !== '%') throw new o('invalid intrinsic syntax, expected closing `%`');
          if (v === '%' && N !== '%') throw new o('invalid intrinsic syntax, expected opening `%`');
          var A = [];
          return (
            K(B, ne, function (P, F, H, pe) {
              A[A.length] = H ? K(pe, le, '$1') : F || P;
            }),
            A
          );
        }, 'stringToPath3'),
        de = n(function (B, N) {
          var v = B,
            A;
          if ((R(C, v) && ((A = C[v]), (v = '%' + A[0] + '%')), R(T, v))) {
            var P = T[v];
            if ((P === g && (P = O(v)), typeof P > 'u' && !N))
              throw new i('intrinsic ' + B + ' exists, but is not available. Please file an issue!');
            return {alias: A, name: v, value: P};
          }
          throw new o('intrinsic ' + B + ' does not exist!');
        }, 'getBaseIntrinsic2');
      t.exports = n(function (B, N) {
        if (typeof B != 'string' || B.length === 0) throw new i('intrinsic name must be a non-empty string');
        if (arguments.length > 1 && typeof N != 'boolean') throw new i('"allowMissing" argument must be a boolean');
        if (se(/^%?[^%]*%?$/, B) === null)
          throw new o('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
        var v = ce(B),
          A = v.length > 0 ? v[0] : '',
          P = de('%' + A + '%', N),
          F = P.name,
          H = P.value,
          pe = !1,
          we = P.alias;
        we && ((A = we[0]), J(v, x([0, 1], we)));
        for (var ve = 1, he = !0; ve < v.length; ve += 1) {
          var qe = v[ve],
            Mt = M(qe, 0, 1),
            Bt = M(qe, -1);
          if ((Mt === '"' || Mt === "'" || Mt === '`' || Bt === '"' || Bt === "'" || Bt === '`') && Mt !== Bt)
            throw new o('property names with quotes must have matching quotes');
          if (((qe === 'constructor' || !he) && (pe = !0), (A += '.' + qe), (F = '%' + A + '%'), R(T, F))) H = T[F];
          else if (H != null) {
            if (!(qe in H)) {
              if (!N) throw new i('base intrinsic for ' + B + ' exists, but the property is not available.');
              return;
            }
            if (l && ve + 1 >= v.length) {
              var Vt = l(H, qe);
              ((he = !!Vt), he && 'get' in Vt && !('originalValue' in Vt.get) ? (H = Vt.get) : (H = H[qe]));
            } else ((he = R(H, qe)), (H = H[qe]));
            he && !pe && (T[F] = H);
          }
        }
        return H;
      }, 'GetIntrinsic');
    },
  }),
  Ql = Z({
    'node_modules/call-bind/index.js'(e, t) {
      var r = To(),
        o = Rs(),
        s = o('%Function.prototype.apply%'),
        i = o('%Function.prototype.call%'),
        u = o('%Reflect.apply%', !0) || r.call(i, s),
        l = o('%Object.getOwnPropertyDescriptor%', !0),
        p = o('%Object.defineProperty%', !0),
        d = o('%Math.max%');
      if (p)
        try {
          p({}, 'a', {value: 1});
        } catch {
          p = null;
        }
      t.exports = n(function (y) {
        var g = u(r, i, arguments);
        if (l && p) {
          var S = l(g, 'length');
          S.configurable && p(g, 'length', {value: 1 + d(0, y.length - (arguments.length - 1))});
        }
        return g;
      }, 'callBind');
      var m = n(function () {
        return u(r, s, arguments);
      }, 'applyBind2');
      p ? p(t.exports, 'apply', {value: m}) : (t.exports.apply = m);
    },
  }),
  Zl = Z({
    'node_modules/call-bind/callBound.js'(e, t) {
      var r = Rs(),
        o = Ql(),
        s = o(r('String.prototype.indexOf'));
      t.exports = n(function (i, u) {
        var l = r(i, !!u);
        return typeof l == 'function' && s(i, '.prototype.') > -1 ? o(l) : l;
      }, 'callBoundIntrinsic');
    },
  }),
  ec = Z({
    'node_modules/has-tostringtag/shams.js'(e, t) {
      var r = Ts();
      t.exports = n(function () {
        return r() && !!Symbol.toStringTag;
      }, 'hasToStringTagShams');
    },
  }),
  rc = Z({
    'node_modules/is-regex/index.js'(e, t) {
      var r = Zl(),
        o = ec()(),
        s,
        i,
        u,
        l;
      o &&
        ((s = r('Object.prototype.hasOwnProperty')),
        (i = r('RegExp.prototype.exec')),
        (u = {}),
        (p = n(function () {
          throw u;
        }, 'throwRegexMarker')),
        (l = {toString: p, valueOf: p}),
        typeof Symbol.toPrimitive == 'symbol' && (l[Symbol.toPrimitive] = p));
      var p,
        d = r('Object.prototype.toString'),
        m = Object.getOwnPropertyDescriptor,
        y = '[object RegExp]';
      t.exports = n(
        o
          ? function (g) {
              if (!g || typeof g != 'object') return !1;
              var S = m(g, 'lastIndex'),
                T = S && s(S, 'value');
              if (!T) return !1;
              try {
                i(g, l);
              } catch (O) {
                return O === u;
              }
            }
          : function (g) {
              return !g || (typeof g != 'object' && typeof g != 'function') ? !1 : d(g) === y;
            },
        'isRegex',
      );
    },
  }),
  tc = Z({
    'node_modules/is-function/index.js'(e, t) {
      t.exports = o;
      var r = Object.prototype.toString;
      function o(s) {
        if (!s) return !1;
        var i = r.call(s);
        return (
          i === '[object Function]' ||
          (typeof s == 'function' && i !== '[object RegExp]') ||
          (typeof window < 'u' &&
            (s === window.setTimeout || s === window.alert || s === window.confirm || s === window.prompt))
        );
      }
      n(o, 'isFunction3');
    },
  }),
  oc = Z({
    'node_modules/is-symbol/index.js'(e, t) {
      var r = Object.prototype.toString,
        o = Es()();
      o
        ? ((s = Symbol.prototype.toString),
          (i = /^Symbol\(.*\)$/),
          (u = n(function (l) {
            return typeof l.valueOf() != 'symbol' ? !1 : i.test(s.call(l));
          }, 'isRealSymbolObject')),
          (t.exports = n(function (l) {
            if (typeof l == 'symbol') return !0;
            if (r.call(l) !== '[object Symbol]') return !1;
            try {
              return u(l);
            } catch {
              return !1;
            }
          }, 'isSymbol3')))
        : (t.exports = n(function (l) {
            return !1;
          }, 'isSymbol3'));
      var s, i, u;
    },
  }),
  nc = st(rc()),
  sc = st(tc()),
  ic = st(oc());
function ac(e) {
  return e != null && typeof e == 'object' && Array.isArray(e) === !1;
}
n(ac, 'isObject');
var lc = typeof global == 'object' && global && global.Object === Object && global,
  cc = lc,
  pc = typeof self == 'object' && self && self.Object === Object && self,
  dc = cc || pc || Function('return this')(),
  Eo = dc,
  uc = Eo.Symbol,
  Ye = uc,
  As = Object.prototype,
  fc = As.hasOwnProperty,
  yc = As.toString,
  hr = Ye ? Ye.toStringTag : void 0;
function mc(e) {
  var t = fc.call(e, hr),
    r = e[hr];
  try {
    e[hr] = void 0;
    var o = !0;
  } catch {}
  var s = yc.call(e);
  return (o && (t ? (e[hr] = r) : delete e[hr]), s);
}
n(mc, 'getRawTag');
var hc = mc,
  gc = Object.prototype,
  Sc = gc.toString;
function bc(e) {
  return Sc.call(e);
}
n(bc, 'objectToString');
var Tc = bc,
  Ec = '[object Null]',
  Rc = '[object Undefined]',
  ms = Ye ? Ye.toStringTag : void 0;
function Ac(e) {
  return e == null ? (e === void 0 ? Rc : Ec) : ms && ms in Object(e) ? hc(e) : Tc(e);
}
n(Ac, 'baseGetTag');
var xs = Ac;
function xc(e) {
  return e != null && typeof e == 'object';
}
n(xc, 'isObjectLike');
var vc = xc,
  wc = '[object Symbol]';
function _c(e) {
  return typeof e == 'symbol' || (vc(e) && xs(e) == wc);
}
n(_c, 'isSymbol');
var Ro = _c;
function Cc(e, t) {
  for (var r = -1, o = e == null ? 0 : e.length, s = Array(o); ++r < o; ) s[r] = t(e[r], r, e);
  return s;
}
n(Cc, 'arrayMap');
var Pc = Cc,
  Oc = Array.isArray,
  Ao = Oc,
  hs = Ye ? Ye.prototype : void 0,
  gs = hs ? hs.toString : void 0;
function vs(e) {
  if (typeof e == 'string') return e;
  if (Ao(e)) return Pc(e, vs) + '';
  if (Ro(e)) return gs ? gs.call(e) : '';
  var t = e + '';
  return t == '0' && 1 / e == -1 / 0 ? '-0' : t;
}
n(vs, 'baseToString');
var Fc = vs;
function Dc(e) {
  var t = typeof e;
  return e != null && (t == 'object' || t == 'function');
}
n(Dc, 'isObject2');
var ws = Dc,
  Nc = '[object AsyncFunction]',
  kc = '[object Function]',
  Lc = '[object GeneratorFunction]',
  jc = '[object Proxy]';
function Mc(e) {
  if (!ws(e)) return !1;
  var t = xs(e);
  return t == kc || t == Lc || t == Nc || t == jc;
}
n(Mc, 'isFunction');
var Uc = Mc,
  Gc = Eo['__core-js_shared__'],
  bo = Gc,
  Ss = (function () {
    var e = /[^.]+$/.exec((bo && bo.keys && bo.keys.IE_PROTO) || '');
    return e ? 'Symbol(src)_1.' + e : '';
  })();
function qc(e) {
  return !!Ss && Ss in e;
}
n(qc, 'isMasked');
var Bc = qc,
  Vc = Function.prototype,
  Hc = Vc.toString;
function zc(e) {
  if (e != null) {
    try {
      return Hc.call(e);
    } catch {}
    try {
      return e + '';
    } catch {}
  }
  return '';
}
n(zc, 'toSource');
var Wc = zc,
  $c = /[\\^$.*+?()[\]{}|]/g,
  Yc = /^\[object .+?Constructor\]$/,
  Kc = Function.prototype,
  Xc = Object.prototype,
  Jc = Kc.toString,
  Qc = Xc.hasOwnProperty,
  Zc = RegExp(
    '^' +
      Jc.call(Qc)
        .replace($c, '\\$&')
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
      '$',
  );
function ep(e) {
  if (!ws(e) || Bc(e)) return !1;
  var t = Uc(e) ? Zc : Yc;
  return t.test(Wc(e));
}
n(ep, 'baseIsNative');
var rp = ep;
function tp(e, t) {
  return e?.[t];
}
n(tp, 'getValue');
var op = tp;
function np(e, t) {
  var r = op(e, t);
  return rp(r) ? r : void 0;
}
n(np, 'getNative');
var _s = np;
function sp(e, t) {
  return e === t || (e !== e && t !== t);
}
n(sp, 'eq');
var ip = sp,
  ap = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  lp = /^\w*$/;
function cp(e, t) {
  if (Ao(e)) return !1;
  var r = typeof e;
  return r == 'number' || r == 'symbol' || r == 'boolean' || e == null || Ro(e)
    ? !0
    : lp.test(e) || !ap.test(e) || (t != null && e in Object(t));
}
n(cp, 'isKey');
var pp = cp,
  dp = _s(Object, 'create'),
  gr = dp;
function up() {
  ((this.__data__ = gr ? gr(null) : {}), (this.size = 0));
}
n(up, 'hashClear');
var fp = up;
function yp(e) {
  var t = this.has(e) && delete this.__data__[e];
  return ((this.size -= t ? 1 : 0), t);
}
n(yp, 'hashDelete');
var mp = yp,
  hp = '__lodash_hash_undefined__',
  gp = Object.prototype,
  Sp = gp.hasOwnProperty;
function bp(e) {
  var t = this.__data__;
  if (gr) {
    var r = t[e];
    return r === hp ? void 0 : r;
  }
  return Sp.call(t, e) ? t[e] : void 0;
}
n(bp, 'hashGet');
var Tp = bp,
  Ep = Object.prototype,
  Rp = Ep.hasOwnProperty;
function Ap(e) {
  var t = this.__data__;
  return gr ? t[e] !== void 0 : Rp.call(t, e);
}
n(Ap, 'hashHas');
var xp = Ap,
  vp = '__lodash_hash_undefined__';
function wp(e, t) {
  var r = this.__data__;
  return ((this.size += this.has(e) ? 0 : 1), (r[e] = gr && t === void 0 ? vp : t), this);
}
n(wp, 'hashSet');
var _p = wp;
function Ke(e) {
  var t = -1,
    r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
n(Ke, 'Hash');
Ke.prototype.clear = fp;
Ke.prototype.delete = mp;
Ke.prototype.get = Tp;
Ke.prototype.has = xp;
Ke.prototype.set = _p;
var bs = Ke;
function Cp() {
  ((this.__data__ = []), (this.size = 0));
}
n(Cp, 'listCacheClear');
var Pp = Cp;
function Op(e, t) {
  for (var r = e.length; r--; ) if (ip(e[r][0], t)) return r;
  return -1;
}
n(Op, 'assocIndexOf');
var lt = Op,
  Ip = Array.prototype,
  Fp = Ip.splice;
function Dp(e) {
  var t = this.__data__,
    r = lt(t, e);
  if (r < 0) return !1;
  var o = t.length - 1;
  return (r == o ? t.pop() : Fp.call(t, r, 1), --this.size, !0);
}
n(Dp, 'listCacheDelete');
var Np = Dp;
function kp(e) {
  var t = this.__data__,
    r = lt(t, e);
  return r < 0 ? void 0 : t[r][1];
}
n(kp, 'listCacheGet');
var Lp = kp;
function jp(e) {
  return lt(this.__data__, e) > -1;
}
n(jp, 'listCacheHas');
var Mp = jp;
function Up(e, t) {
  var r = this.__data__,
    o = lt(r, e);
  return (o < 0 ? (++this.size, r.push([e, t])) : (r[o][1] = t), this);
}
n(Up, 'listCacheSet');
var Gp = Up;
function Xe(e) {
  var t = -1,
    r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
n(Xe, 'ListCache');
Xe.prototype.clear = Pp;
Xe.prototype.delete = Np;
Xe.prototype.get = Lp;
Xe.prototype.has = Mp;
Xe.prototype.set = Gp;
var qp = Xe,
  Bp = _s(Eo, 'Map'),
  Vp = Bp;
function Hp() {
  ((this.size = 0), (this.__data__ = {hash: new bs(), map: new (Vp || qp)(), string: new bs()}));
}
n(Hp, 'mapCacheClear');
var zp = Hp;
function Wp(e) {
  var t = typeof e;
  return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean' ? e !== '__proto__' : e === null;
}
n(Wp, 'isKeyable');
var $p = Wp;
function Yp(e, t) {
  var r = e.__data__;
  return $p(t) ? r[typeof t == 'string' ? 'string' : 'hash'] : r.map;
}
n(Yp, 'getMapData');
var ct = Yp;
function Kp(e) {
  var t = ct(this, e).delete(e);
  return ((this.size -= t ? 1 : 0), t);
}
n(Kp, 'mapCacheDelete');
var Xp = Kp;
function Jp(e) {
  return ct(this, e).get(e);
}
n(Jp, 'mapCacheGet');
var Qp = Jp;
function Zp(e) {
  return ct(this, e).has(e);
}
n(Zp, 'mapCacheHas');
var ed = Zp;
function rd(e, t) {
  var r = ct(this, e),
    o = r.size;
  return (r.set(e, t), (this.size += r.size == o ? 0 : 1), this);
}
n(rd, 'mapCacheSet');
var td = rd;
function Je(e) {
  var t = -1,
    r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
n(Je, 'MapCache');
Je.prototype.clear = zp;
Je.prototype.delete = Xp;
Je.prototype.get = Qp;
Je.prototype.has = ed;
Je.prototype.set = td;
var Cs = Je,
  od = 'Expected a function';
function xo(e, t) {
  if (typeof e != 'function' || (t != null && typeof t != 'function')) throw new TypeError(od);
  var r = n(function () {
    var o = arguments,
      s = t ? t.apply(this, o) : o[0],
      i = r.cache;
    if (i.has(s)) return i.get(s);
    var u = e.apply(this, o);
    return ((r.cache = i.set(s, u) || i), u);
  }, 'memoized');
  return ((r.cache = new (xo.Cache || Cs)()), r);
}
n(xo, 'memoize');
xo.Cache = Cs;
var nd = xo,
  sd = 500;
function id(e) {
  var t = nd(e, function (o) {
      return (r.size === sd && r.clear(), o);
    }),
    r = t.cache;
  return t;
}
n(id, 'memoizeCapped');
var ad = id,
  ld = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  cd = /\\(\\)?/g,
  pd = ad(function (e) {
    var t = [];
    return (
      e.charCodeAt(0) === 46 && t.push(''),
      e.replace(ld, function (r, o, s, i) {
        t.push(s ? i.replace(cd, '$1') : o || r);
      }),
      t
    );
  }),
  dd = pd;
function ud(e) {
  return e == null ? '' : Fc(e);
}
n(ud, 'toString');
var fd = ud;
function yd(e, t) {
  return Ao(e) ? e : pp(e, t) ? [e] : dd(fd(e));
}
n(yd, 'castPath');
var md = yd;
function gd(e) {
  if (typeof e == 'string' || Ro(e)) return e;
  var t = e + '';
  return t == '0' && 1 / e == -1 / 0 ? '-0' : t;
}
n(gd, 'toKey');
var Sd = gd;
function bd(e, t) {
  t = md(t, e);
  for (var r = 0, o = t.length; e != null && r < o; ) e = e[Sd(t[r++])];
  return r && r == o ? e : void 0;
}
n(bd, 'baseGet');
var Td = bd;
function Ed(e, t, r) {
  var o = e == null ? void 0 : Td(e, t);
  return o === void 0 ? r : o;
}
n(Ed, 'get');
var Rd = Ed,
  at = ac,
  Ad = n((e) => {
    let t = null,
      r = !1,
      o = !1,
      s = !1,
      i = '';
    if (e.indexOf('//') >= 0 || e.indexOf('/*') >= 0)
      for (let u = 0; u < e.length; u += 1)
        (!t && !r && !o && !s
          ? e[u] === '"' || e[u] === "'" || e[u] === '`'
            ? (t = e[u])
            : e[u] === '/' && e[u + 1] === '*'
              ? (r = !0)
              : e[u] === '/' && e[u + 1] === '/'
                ? (o = !0)
                : e[u] === '/' && e[u + 1] !== '/' && (s = !0)
          : (t &&
              ((e[u] === t && e[u - 1] !== '\\') ||
                (e[u] ===
                  `
` &&
                  t !== '`')) &&
              (t = null),
            s &&
              ((e[u] === '/' && e[u - 1] !== '\\') ||
                e[u] ===
                  `
`) &&
              (s = !1),
            r && e[u - 1] === '/' && e[u - 2] === '*' && (r = !1),
            o &&
              e[u] ===
                `
` &&
              (o = !1)),
          !r && !o && (i += e[u]));
    else i = e;
    return i;
  }, 'removeCodeComments'),
  xd = (0, Ps.default)(1e4)((e) => Ad(e).replace(/\n\s*/g, '').trim()),
  vd = n(function (e, t) {
    let r = t.slice(0, t.indexOf('{')),
      o = t.slice(t.indexOf('{'));
    if (r.includes('=>') || r.includes('function')) return t;
    let s = r;
    return ((s = s.replace(e, 'function')), s + o);
  }, 'convertShorthandMethods2'),
  wd = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
  Sr = n((e) => e.match(/^[\[\{\"\}].*[\]\}\"]$/), 'isJSON');
function Os(e) {
  if (!at(e)) return e;
  let t = e,
    r = !1;
  return (
    typeof Event < 'u' && e instanceof Event && ((t = fs(t)), (r = !0)),
    (t = Object.keys(t).reduce((o, s) => {
      try {
        (t[s] && t[s].toJSON, (o[s] = t[s]));
      } catch {
        r = !0;
      }
      return o;
    }, {})),
    r ? t : e
  );
}
n(Os, 'convertUnconventionalData');
var _d = n(function (e) {
    let t, r, o, s;
    return n(function (i, u) {
      try {
        if (i === '') return ((s = []), (t = new Map([[u, '[]']])), (r = new Map()), (o = []), u);
        let l = r.get(this) || this;
        for (; o.length && l !== o[0]; ) (o.shift(), s.pop());
        if (typeof u == 'boolean') return u;
        if (u === void 0) return e.allowUndefined ? '_undefined_' : void 0;
        if (u === null) return null;
        if (typeof u == 'number')
          return u === -1 / 0 ? '_-Infinity_' : u === 1 / 0 ? '_Infinity_' : Number.isNaN(u) ? '_NaN_' : u;
        if (typeof u == 'bigint') return `_bigint_${u.toString()}`;
        if (typeof u == 'string') return wd.test(u) ? (e.allowDate ? `_date_${u}` : void 0) : u;
        if ((0, nc.default)(u)) return e.allowRegExp ? `_regexp_${u.flags}|${u.source}` : void 0;
        if ((0, sc.default)(u)) {
          if (!e.allowFunction) return;
          let {name: d} = u,
            m = u.toString();
          return m.match(/(\[native code\]|WEBPACK_IMPORTED_MODULE|__webpack_exports__|__webpack_require__)/)
            ? `_function_${d}|${(() => {}).toString()}`
            : `_function_${d}|${xd(vd(i, m))}`;
        }
        if ((0, ic.default)(u)) {
          if (!e.allowSymbol) return;
          let d = Symbol.keyFor(u);
          return d !== void 0 ? `_gsymbol_${d}` : `_symbol_${u.toString().slice(7, -1)}`;
        }
        if (o.length >= e.maxDepth) return Array.isArray(u) ? `[Array(${u.length})]` : '[Object]';
        if (u === this) return `_duplicate_${JSON.stringify(s)}`;
        if (u instanceof Error && e.allowError)
          return {
            __isConvertedError__: !0,
            errorProperties: {
              ...(u.cause ? {cause: u.cause} : {}),
              ...u,
              name: u.name,
              message: u.message,
              stack: u.stack,
              '_constructor-name_': u.constructor.name,
            },
          };
        if (
          u.constructor &&
          u.constructor.name &&
          u.constructor.name !== 'Object' &&
          !Array.isArray(u) &&
          !e.allowClass
        )
          return;
        let p = t.get(u);
        if (!p) {
          let d = Array.isArray(u) ? u : Os(u);
          if (
            u.constructor &&
            u.constructor.name &&
            u.constructor.name !== 'Object' &&
            !Array.isArray(u) &&
            e.allowClass
          )
            try {
              Object.assign(d, {'_constructor-name_': u.constructor.name});
            } catch {}
          return (s.push(i), o.unshift(d), t.set(u, JSON.stringify(s)), u !== d && r.set(u, d), d);
        }
        return `_duplicate_${p}`;
      } catch {
        return;
      }
    }, 'replace');
  }, 'replacer2'),
  Cd = n(function reviver(options) {
    let refs = [],
      root;
    return n(function revive(key, value) {
      if (
        (key === '' &&
          ((root = value),
          refs.forEach(({target: e, container: t, replacement: r}) => {
            let o = Sr(r) ? JSON.parse(r) : r.split('.');
            o.length === 0 ? (t[e] = root) : (t[e] = Rd(root, o));
          })),
        key === '_constructor-name_')
      )
        return value;
      if (at(value) && value.__isConvertedError__) {
        let {message: e, ...t} = value.errorProperties,
          r = new Error(e);
        return (Object.assign(r, t), r);
      }
      if (at(value) && value['_constructor-name_'] && options.allowFunction) {
        let e = value['_constructor-name_'];
        if (e !== 'Object') {
          let t = new Function(`return function ${e.replace(/[^a-zA-Z0-9$_]+/g, '')}(){}`)();
          Object.setPrototypeOf(value, new t());
        }
        return (delete value['_constructor-name_'], value);
      }
      if (typeof value == 'string' && value.startsWith('_function_') && options.allowFunction) {
        let [, name, source] = value.match(/_function_([^|]*)\|(.*)/) || [],
          sourceSanitized = source.replace(/[(\(\))|\\| |\]|`]*$/, '');
        if (!options.lazyEval) return eval(`(${sourceSanitized})`);
        let result = n((...args) => {
          let f = eval(`(${sourceSanitized})`);
          return f(...args);
        }, 'result');
        return (
          Object.defineProperty(result, 'toString', {value: n(() => sourceSanitized, 'value')}),
          Object.defineProperty(result, 'name', {value: name}),
          result
        );
      }
      if (typeof value == 'string' && value.startsWith('_regexp_') && options.allowRegExp) {
        let [, e, t] = value.match(/_regexp_([^|]*)\|(.*)/) || [];
        return new RegExp(t, e);
      }
      return typeof value == 'string' && value.startsWith('_date_') && options.allowDate
        ? new Date(value.replace('_date_', ''))
        : typeof value == 'string' && value.startsWith('_duplicate_')
          ? (refs.push({target: key, container: this, replacement: value.replace(/^_duplicate_/, '')}), null)
          : typeof value == 'string' && value.startsWith('_symbol_') && options.allowSymbol
            ? Symbol(value.replace('_symbol_', ''))
            : typeof value == 'string' && value.startsWith('_gsymbol_') && options.allowSymbol
              ? Symbol.for(value.replace('_gsymbol_', ''))
              : typeof value == 'string' && value === '_-Infinity_'
                ? -1 / 0
                : typeof value == 'string' && value === '_Infinity_'
                  ? 1 / 0
                  : typeof value == 'string' && value === '_NaN_'
                    ? NaN
                    : typeof value == 'string' && value.startsWith('_bigint_') && typeof BigInt == 'function'
                      ? BigInt(value.replace('_bigint_', ''))
                      : value;
    }, 'revive');
  }, 'reviver'),
  Is = {
    maxDepth: 10,
    space: void 0,
    allowFunction: !0,
    allowRegExp: !0,
    allowDate: !0,
    allowClass: !0,
    allowError: !0,
    allowUndefined: !0,
    allowSymbol: !0,
    lazyEval: !0,
  },
  pt = n((e, t = {}) => {
    let r = {...Is, ...t};
    return JSON.stringify(Os(e), _d(r), t.space);
  }, 'stringify'),
  Pd = n(() => {
    let e = new Map();
    return n(function t(r) {
      (at(r) &&
        Object.entries(r).forEach(([o, s]) => {
          s === '_undefined_' ? (r[o] = void 0) : e.get(s) || (e.set(s, !0), t(s));
        }),
        Array.isArray(r) &&
          r.forEach((o, s) => {
            o === '_undefined_' ? (e.set(o, !0), (r[s] = void 0)) : e.get(o) || (e.set(o, !0), t(o));
          }));
    }, 'mutateUndefined');
  }, 'mutator'),
  dt = n((e, t = {}) => {
    let r = {...Is, ...t},
      o = JSON.parse(e, Cd(r));
    return (Pd()(o), o);
  }, 'parse'),
  vo = 'Invariant failed';
function fe(e, t) {
  if (!e) throw new Error(vo);
}
n(fe, 'invariant');
var Fs = n((e) => {
    let t = Array.from(document.querySelectorAll('iframe[data-is-storybook]')),
      [r, ...o] = t.filter((i) => {
        try {
          return (
            i.contentWindow?.location.origin === e.source.location.origin &&
            i.contentWindow?.location.pathname === e.source.location.pathname
          );
        } catch {}
        try {
          return i.contentWindow === e.source;
        } catch {}
        let u = i.getAttribute('src'),
          l;
        try {
          if (!u) return !1;
          ({origin: l} = new URL(u, document.location.toString()));
        } catch {
          return !1;
        }
        return l === e.origin;
      }),
      s = r?.getAttribute('src');
    if (s && o.length === 0) {
      let {protocol: i, host: u, pathname: l} = new URL(s, document.location.toString());
      return `${i}//${u}${l}`;
    }
    return (o.length > 0 && I.error('found multiple candidates for event source'), null);
  }, 'getEventSourceUrl'),
  {document: wo, location: _o} = E,
  Ds = 'storybook-channel',
  Id = {allowFunction: !1, maxDepth: 25},
  Co = class {
    constructor(t) {
      if (
        ((this.config = t),
        (this.connected = !1),
        (this.buffer = []),
        typeof E?.addEventListener == 'function' && E.addEventListener('message', this.handleEvent.bind(this), !1),
        t.page !== 'manager' && t.page !== 'preview')
      )
        throw new Error(`postmsg-channel: "config.page" cannot be "${t.page}"`);
    }
    setHandler(t) {
      this.handler = (...r) => {
        (t.apply(this, r), !this.connected && this.getLocalFrame().length && (this.flush(), (this.connected = !0)));
      };
    }
    send(t, r) {
      let {
          target: o,
          allowRegExp: s,
          allowFunction: i,
          allowSymbol: u,
          allowDate: l,
          allowError: p,
          allowUndefined: d,
          allowClass: m,
          maxDepth: y,
          space: g,
          lazyEval: S,
        } = r || {},
        T = Object.fromEntries(
          Object.entries({
            allowRegExp: s,
            allowFunction: i,
            allowSymbol: u,
            allowDate: l,
            allowError: p,
            allowUndefined: d,
            allowClass: m,
            maxDepth: y,
            space: g,
            lazyEval: S,
          }).filter(([x, J]) => typeof J < 'u'),
        ),
        O = {...Id, ...(E.CHANNEL_OPTIONS || {}), ...T},
        C = this.getFrames(o),
        D = new URLSearchParams(_o?.search || ''),
        R = pt({key: Ds, event: t, refId: D.get('refId')}, O);
      return C.length
        ? (this.buffer.length && this.flush(),
          C.forEach((x) => {
            try {
              x.postMessage(R, '*');
            } catch {
              I.error('sending over postmessage fail');
            }
          }),
          Promise.resolve(null))
        : new Promise((x, J) => {
            this.buffer.push({event: t, resolve: x, reject: J});
          });
    }
    flush() {
      let {buffer: t} = this;
      ((this.buffer = []),
        t.forEach((r) => {
          this.send(r.event).then(r.resolve).catch(r.reject);
        }));
    }
    getFrames(t) {
      if (this.config.page === 'manager') {
        let r = Array.from(wo.querySelectorAll('iframe[data-is-storybook][data-is-loaded]')).flatMap((o) => {
          try {
            return o.contentWindow && o.dataset.isStorybook !== void 0 && o.id === t ? [o.contentWindow] : [];
          } catch {
            return [];
          }
        });
        return r?.length ? r : this.getCurrentFrames();
      }
      return E && E.parent && E.parent !== E.self ? [E.parent] : [];
    }
    getCurrentFrames() {
      return this.config.page === 'manager'
        ? Array.from(wo.querySelectorAll('[data-is-storybook="true"]')).flatMap((t) =>
            t.contentWindow ? [t.contentWindow] : [],
          )
        : E && E.parent
          ? [E.parent]
          : [];
    }
    getLocalFrame() {
      return this.config.page === 'manager'
        ? Array.from(wo.querySelectorAll('#storybook-preview-iframe')).flatMap((t) =>
            t.contentWindow ? [t.contentWindow] : [],
          )
        : E && E.parent
          ? [E.parent]
          : [];
    }
    handleEvent(t) {
      try {
        let {data: r} = t,
          {key: o, event: s, refId: i} = typeof r == 'string' && Sr(r) ? dt(r, E.CHANNEL_OPTIONS || {}) : r;
        if (o === Ds) {
          let u =
              this.config.page === 'manager'
                ? '<span style="color: #37D5D3; background: black"> manager </span>'
                : '<span style="color: #1EA7FD; background: black"> preview </span>',
            l = Object.values(ge).includes(s.type)
              ? `<span style="color: #FF4785">${s.type}</span>`
              : `<span style="color: #FFAE00">${s.type}</span>`;
          if ((i && (s.refId = i), (s.source = this.config.page === 'preview' ? t.origin : Fs(t)), !s.source)) {
            X.error(`${u} received ${l} but was unable to determine the source of the event`);
            return;
          }
          let p = `${u} received ${l} (${r.length})`;
          (X.debug(
            _o.origin !== s.source ? p : `${p} <span style="color: gray">(on ${_o.origin} from ${s.source})</span>`,
            ...s.args,
          ),
            fe(this.handler, 'ChannelHandler should be set'),
            this.handler(s));
        }
      } catch (r) {
        I.error(r);
      }
    }
  };
n(Co, 'PostMessageTransport');
var Qe = Co,
  {WebSocket: Fd} = E,
  Po = 15e3,
  Oo = 5e3,
  Io = class {
    constructor({url: t, onError: r, page: o}) {
      ((this.buffer = []),
        (this.isReady = !1),
        (this.isClosed = !1),
        (this.pingTimeout = 0),
        (this.socket = new Fd(t)),
        (this.socket.onopen = () => {
          ((this.isReady = !0), this.heartbeat(), this.flush());
        }),
        (this.socket.onmessage = ({data: s}) => {
          let i = typeof s == 'string' && Sr(s) ? dt(s) : s;
          (fe(this.handler), this.handler(i), i.type === 'ping' && (this.heartbeat(), this.send({type: 'pong'})));
        }),
        (this.socket.onerror = (s) => {
          r && r(s);
        }),
        (this.socket.onclose = (s) => {
          (fe(this.handler),
            this.handler({type: Wt, args: [{reason: s.reason, code: s.code}], from: o || 'preview'}),
            (this.isClosed = !0),
            clearTimeout(this.pingTimeout));
        }));
    }
    heartbeat() {
      (clearTimeout(this.pingTimeout),
        (this.pingTimeout = setTimeout(() => {
          this.socket.close(3008, 'timeout');
        }, Po + Oo)));
    }
    setHandler(t) {
      this.handler = t;
    }
    send(t) {
      this.isClosed || (this.isReady ? this.sendNow(t) : this.sendLater(t));
    }
    sendLater(t) {
      this.buffer.push(t);
    }
    sendNow(t) {
      let r = pt(t, {maxDepth: 15, allowFunction: !1, ...E.CHANNEL_OPTIONS});
      this.socket.send(r);
    }
    flush() {
      let {buffer: t} = this;
      ((this.buffer = []), t.forEach((r) => this.send(r)));
    }
  };
n(Io, 'WebsocketTransport');
var Ze = Io,
  {CONFIG_TYPE: Dd} = E,
  Nd = ie;
function kd({page: e, extraTransports: t = []}) {
  let r = [new Qe({page: e}), ...t];
  if (Dd === 'DEVELOPMENT') {
    let s = window.location.protocol === 'http:' ? 'ws' : 'wss',
      {hostname: i, port: u} = window.location,
      l = `${s}://${i}:${u}/storybook-server-channel`;
    r.push(new Ze({url: l, onError: n(() => {}, 'onError'), page: e}));
  }
  let o = new ie({transports: r});
  return (Q.__prepare(o, e === 'manager' ? Q.Environment.MANAGER : Q.Environment.PREVIEW), o);
}
n(kd, 'createBrowserChannel');
var Tr = {};
_e(Tr, {Addon_TypesEnum: () => Ns});
var Ns = ((e) => (
    (e.TAB = 'tab'),
    (e.PANEL = 'panel'),
    (e.TOOL = 'tool'),
    (e.TOOLEXTRA = 'toolextra'),
    (e.PREVIEW = 'preview'),
    (e.experimental_PAGE = 'page'),
    (e.experimental_SIDEBAR_BOTTOM = 'sidebar-bottom'),
    (e.experimental_SIDEBAR_TOP = 'sidebar-top'),
    (e.experimental_TEST_PROVIDER = 'test-provider'),
    e
  ))(Ns || {}),
  Yr = {};
_e(Yr, {
  DocsContext: () => me,
  HooksContext: () => be,
  Preview: () => Me,
  PreviewWeb: () => Wr,
  PreviewWithSelection: () => Ue,
  ReporterAPI: () => Ee,
  StoryStore: () => Le,
  UrlStore: () => Be,
  WebView: () => He,
  addons: () => te,
  applyHooks: () => ft,
  combineArgs: () => tr,
  combineParameters: () => Y,
  composeConfigs: () => ke,
  composeStepRunners: () => Ct,
  composeStories: () => qi,
  composeStory: () => Pn,
  createPlaywrightTest: () => Bi,
  decorateStory: () => xn,
  defaultDecorateStory: () => vt,
  definePreview: () => ks,
  experimental_MockUniversalStore: () => gt,
  experimental_UniversalStore: () => Q,
  experimental_useUniversalStore: () => Si,
  filterArgTypes: () => Mr,
  getCsfFactoryAnnotations: () => Pt,
  inferControls: () => ir,
  makeDecorator: () => $s,
  mockChannel: () => ut,
  normalizeProjectAnnotations: () => Ne,
  normalizeStory: () => De,
  prepareMeta: () => wt,
  prepareStory: () => sr,
  sanitizeStoryContextUpdate: () => vn,
  setDefaultProjectAnnotations: () => Ui,
  setProjectAnnotations: () => Gi,
  simulateDOMContentLoaded: () => $r,
  simulatePageLoad: () => ss,
  sortStoriesV7: () => Ki,
  useArgs: () => zs,
  useCallback: () => er,
  useChannel: () => Vs,
  useEffect: () => Er,
  useGlobals: () => Ws,
  useMemo: () => Ms,
  useParameter: () => Hs,
  useReducer: () => Bs,
  useRef: () => Gs,
  useState: () => mt,
  useStoryContext: () => Rr,
  userOrAutoTitle: () => Wi,
  userOrAutoTitleFromSpecifier: () => Fn,
});
function ut() {
  let e = {setHandler: n(() => {}, 'setHandler'), send: n(() => {}, 'send')};
  return new ie({transport: e});
}
n(ut, 'mockChannel');
var No = class {
  constructor() {
    ((this.getChannel = n(() => {
      if (!this.channel) {
        let t = ut();
        return (this.setChannel(t), t);
      }
      return this.channel;
    }, 'getChannel')),
      (this.ready = n(() => this.promise, 'ready')),
      (this.hasChannel = n(() => !!this.channel, 'hasChannel')),
      (this.setChannel = n((t) => {
        ((this.channel = t), this.resolve());
      }, 'setChannel')),
      (this.promise = new Promise((t) => {
        this.resolve = () => t(this.getChannel());
      })));
  }
};
n(No, 'AddonStore');
var Do = No,
  Fo = '__STORYBOOK_ADDONS_PREVIEW';
function Ld() {
  return (E[Fo] || (E[Fo] = new Do()), E[Fo]);
}
n(Ld, 'getAddonsStore');
var te = Ld();
function ks(e) {
  return e;
}
n(ks, 'definePreview');
var Mo = class {
  constructor() {
    ((this.hookListsMap = void 0),
      (this.mountedDecorators = void 0),
      (this.prevMountedDecorators = void 0),
      (this.currentHooks = void 0),
      (this.nextHookIndex = void 0),
      (this.currentPhase = void 0),
      (this.currentEffects = void 0),
      (this.prevEffects = void 0),
      (this.currentDecoratorName = void 0),
      (this.hasUpdates = void 0),
      (this.currentContext = void 0),
      (this.renderListener = n((t) => {
        t === this.currentContext?.id &&
          (this.triggerEffects(), (this.currentContext = null), this.removeRenderListeners());
      }, 'renderListener')),
      this.init());
  }
  init() {
    ((this.hookListsMap = new WeakMap()),
      (this.mountedDecorators = new Set()),
      (this.prevMountedDecorators = new Set()),
      (this.currentHooks = []),
      (this.nextHookIndex = 0),
      (this.currentPhase = 'NONE'),
      (this.currentEffects = []),
      (this.prevEffects = []),
      (this.currentDecoratorName = null),
      (this.hasUpdates = !1),
      (this.currentContext = null));
  }
  clean() {
    (this.prevEffects.forEach((t) => {
      t.destroy && t.destroy();
    }),
      this.init(),
      this.removeRenderListeners());
  }
  getNextHook() {
    let t = this.currentHooks[this.nextHookIndex];
    return ((this.nextHookIndex += 1), t);
  }
  triggerEffects() {
    (this.prevEffects.forEach((t) => {
      !this.currentEffects.includes(t) && t.destroy && t.destroy();
    }),
      this.currentEffects.forEach((t) => {
        this.prevEffects.includes(t) || (t.destroy = t.create());
      }),
      (this.prevEffects = this.currentEffects),
      (this.currentEffects = []));
  }
  addRenderListeners() {
    (this.removeRenderListeners(), te.getChannel().on(We, this.renderListener));
  }
  removeRenderListeners() {
    te.getChannel().removeListener(We, this.renderListener);
  }
};
n(Mo, 'HooksContext');
var be = Mo;
function Ls(e) {
  let t = n((...r) => {
    let {hooks: o} = typeof r[0] == 'function' ? r[1] : r[0],
      s = o.currentPhase,
      i = o.currentHooks,
      u = o.nextHookIndex,
      l = o.currentDecoratorName;
    ((o.currentDecoratorName = e.name),
      o.prevMountedDecorators.has(e)
        ? ((o.currentPhase = 'UPDATE'), (o.currentHooks = o.hookListsMap.get(e) || []))
        : ((o.currentPhase = 'MOUNT'),
          (o.currentHooks = []),
          o.hookListsMap.set(e, o.currentHooks),
          o.prevMountedDecorators.add(e)),
      (o.nextHookIndex = 0));
    let p = E.STORYBOOK_HOOKS_CONTEXT;
    E.STORYBOOK_HOOKS_CONTEXT = o;
    let d = e(...r);
    if (((E.STORYBOOK_HOOKS_CONTEXT = p), o.currentPhase === 'UPDATE' && o.getNextHook() != null))
      throw new Error(
        'Rendered fewer hooks than expected. This may be caused by an accidental early return statement.',
      );
    return ((o.currentPhase = s), (o.currentHooks = i), (o.nextHookIndex = u), (o.currentDecoratorName = l), d);
  }, 'hookified');
  return ((t.originalFn = e), t);
}
n(Ls, 'hookify');
var ko = 0,
  jd = 25,
  ft = n(
    (e) => (t, r) => {
      let o = e(
        Ls(t),
        r.map((s) => Ls(s)),
      );
      return (s) => {
        let {hooks: i} = s;
        ((i.prevMountedDecorators ??= new Set()),
          (i.mountedDecorators = new Set([t, ...r])),
          (i.currentContext = s),
          (i.hasUpdates = !1));
        let u = o(s);
        for (ko = 1; i.hasUpdates; )
          if (((i.hasUpdates = !1), (i.currentEffects = []), (u = o(s)), (ko += 1), ko > jd))
            throw new Error('Too many re-renders. Storybook limits the number of renders to prevent an infinite loop.');
        return (i.addRenderListeners(), u);
      };
    },
    'applyHooks',
  ),
  Md = n((e, t) => e.length === t.length && e.every((r, o) => r === t[o]), 'areDepsEqual'),
  Lo = n(
    () => new Error('Storybook preview hooks can only be called inside decorators and story functions.'),
    'invalidHooksError',
  );
function js() {
  return E.STORYBOOK_HOOKS_CONTEXT || null;
}
n(js, 'getHooksContextOrNull');
function jo() {
  let e = js();
  if (e == null) throw Lo();
  return e;
}
n(jo, 'getHooksContextOrThrow');
function Ud(e, t, r) {
  let o = jo();
  if (o.currentPhase === 'MOUNT') {
    r != null &&
      !Array.isArray(r) &&
      I.warn(
        `${e} received a final argument that is not an array (instead, received ${r}). When specified, the final argument must be an array.`,
      );
    let s = {name: e, deps: r};
    return (o.currentHooks.push(s), t(s), s);
  }
  if (o.currentPhase === 'UPDATE') {
    let s = o.getNextHook();
    if (s == null) throw new Error('Rendered more hooks than during the previous render.');
    return (
      s.name !== e &&
        I.warn(
          `Storybook has detected a change in the order of Hooks${o.currentDecoratorName ? ` called by ${o.currentDecoratorName}` : ''}. This will lead to bugs and errors if not fixed.`,
        ),
      r != null &&
        s.deps == null &&
        I.warn(
          `${e} received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.`,
        ),
      r != null &&
        s.deps != null &&
        r.length !== s.deps.length &&
        I.warn(`The final argument passed to ${e} changed size between renders. The order and size of this array must remain constant.
Previous: ${s.deps}
Incoming: ${r}`),
      (r == null || s.deps == null || !Md(r, s.deps)) && (t(s), (s.deps = r)),
      s
    );
  }
  throw Lo();
}
n(Ud, 'useHook');
function yt(e, t, r) {
  let {memoizedState: o} = Ud(
    e,
    (s) => {
      s.memoizedState = t();
    },
    r,
  );
  return o;
}
n(yt, 'useMemoLike');
function Ms(e, t) {
  return yt('useMemo', e, t);
}
n(Ms, 'useMemo');
function er(e, t) {
  return yt('useCallback', () => e, t);
}
n(er, 'useCallback');
function Us(e, t) {
  return yt(e, () => ({current: t}), []);
}
n(Us, 'useRefLike');
function Gs(e) {
  return Us('useRef', e);
}
n(Gs, 'useRef');
function Gd() {
  let e = js();
  if (e != null && e.currentPhase !== 'NONE') e.hasUpdates = !0;
  else
    try {
      te.getChannel().emit(dr);
    } catch {
      I.warn('State updates of Storybook preview hooks work only in browser');
    }
}
n(Gd, 'triggerUpdate');
function qs(e, t) {
  let r = Us(e, typeof t == 'function' ? t() : t),
    o = n((s) => {
      ((r.current = typeof s == 'function' ? s(r.current) : s), Gd());
    }, 'setState');
  return [r.current, o];
}
n(qs, 'useStateLike');
function mt(e) {
  return qs('useState', e);
}
n(mt, 'useState');
function Bs(e, t, r) {
  let o = r != null ? () => r(t) : t,
    [s, i] = qs('useReducer', o);
  return [s, n((u) => i((l) => e(l, u)), 'dispatch')];
}
n(Bs, 'useReducer');
function Er(e, t) {
  let r = jo(),
    o = yt('useEffect', () => ({create: e}), t);
  r.currentEffects.includes(o) || r.currentEffects.push(o);
}
n(Er, 'useEffect');
function Vs(e, t = []) {
  let r = te.getChannel();
  return (
    Er(
      () => (
        Object.entries(e).forEach(([o, s]) => r.on(o, s)),
        () => {
          Object.entries(e).forEach(([o, s]) => r.removeListener(o, s));
        }
      ),
      [...Object.keys(e), ...t],
    ),
    er(r.emit.bind(r), [r])
  );
}
n(Vs, 'useChannel');
function Rr() {
  let {currentContext: e} = jo();
  if (e == null) throw Lo();
  return e;
}
n(Rr, 'useStoryContext');
function Hs(e, t) {
  let {parameters: r} = Rr();
  if (e) return r[e] ?? t;
}
n(Hs, 'useParameter');
function zs() {
  let e = te.getChannel(),
    {id: t, args: r} = Rr(),
    o = er((i) => e.emit(yr, {storyId: t, updatedArgs: i}), [e, t]),
    s = er((i) => e.emit(ur, {storyId: t, argNames: i}), [e, t]);
  return [r, o, s];
}
n(zs, 'useArgs');
function Ws() {
  let e = te.getChannel(),
    {globals: t} = Rr(),
    r = er((o) => e.emit(fr, {globals: o}), [e]);
  return [t, r];
}
n(Ws, 'useGlobals');
var $s = n(({name: e, parameterName: t, wrapper: r, skipIfNoParametersOrOptions: o = !1}) => {
  let s = n(
    (i) => (u, l) => {
      let p = l.parameters && l.parameters[t];
      return (p && p.disable) || (o && !i && !p) ? u(l) : r(u, l, {options: i, parameters: p});
    },
    'decorator',
  );
  return (...i) =>
    typeof i[0] == 'function'
      ? s()(...i)
      : (...u) => {
          if (u.length > 1) return i.length > 1 ? s(i)(...u) : s(...i)(...u);
          throw new Error(`Passing stories directly into ${e}() is not allowed,
        instead use addDecorator(${e}) and pass options with the '${t}' parameter`);
        };
}, 'makeDecorator');
function Uo(e, t) {
  let r = {},
    o = Object.entries(e);
  for (let s = 0; s < o.length; s++) {
    let [i, u] = o[s];
    t(u, i) || (r[i] = u);
  }
  return r;
}
n(Uo, 'omitBy');
function Go(e, t) {
  let r = {};
  for (let o = 0; o < t.length; o++) {
    let s = t[o];
    Object.prototype.hasOwnProperty.call(e, s) && (r[s] = e[s]);
  }
  return r;
}
n(Go, 'pick');
function qo(e, t) {
  let r = {},
    o = Object.entries(e);
  for (let s = 0; s < o.length; s++) {
    let [i, u] = o[s];
    t(u, i) && (r[i] = u);
  }
  return r;
}
n(qo, 'pickBy');
function $(e) {
  if (typeof e != 'object' || e == null) return !1;
  if (Object.getPrototypeOf(e) === null) return !0;
  if (e.toString() !== '[object Object]') return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
n($, 'isPlainObject');
function oe(e, t) {
  let r = {},
    o = Object.keys(e);
  for (let s = 0; s < o.length; s++) {
    let i = o[s],
      u = e[i];
    r[i] = t(u, i, e);
  }
  return r;
}
n(oe, 'mapValues');
var Ys = '[object RegExp]',
  Ks = '[object String]',
  Xs = '[object Number]',
  Js = '[object Boolean]',
  Bo = '[object Arguments]',
  Qs = '[object Symbol]',
  Zs = '[object Date]',
  ei = '[object Map]',
  ri = '[object Set]',
  ti = '[object Array]',
  oi = '[object Function]',
  ni = '[object ArrayBuffer]',
  ht = '[object Object]',
  si = '[object Error]',
  ii = '[object DataView]',
  ai = '[object Uint8Array]',
  li = '[object Uint8ClampedArray]',
  ci = '[object Uint16Array]',
  pi = '[object Uint32Array]',
  di = '[object BigUint64Array]',
  ui = '[object Int8Array]',
  fi = '[object Int16Array]',
  yi = '[object Int32Array]',
  mi = '[object BigInt64Array]',
  hi = '[object Float32Array]',
  gi = '[object Float64Array]';
function Vo(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
n(Vo, 'getSymbols');
function Ho(e) {
  return e == null ? (e === void 0 ? '[object Undefined]' : '[object Null]') : Object.prototype.toString.call(e);
}
n(Ho, 'getTag');
function Ar(e, t) {
  if (typeof e == typeof t)
    switch (typeof e) {
      case 'bigint':
      case 'string':
      case 'boolean':
      case 'symbol':
      case 'undefined':
        return e === t;
      case 'number':
        return e === t || Object.is(e, t);
      case 'function':
        return e === t;
      case 'object':
        return ye(e, t);
    }
  return ye(e, t);
}
n(Ar, 'isEqual');
function ye(e, t, r) {
  if (Object.is(e, t)) return !0;
  let o = Ho(e),
    s = Ho(t);
  if ((o === Bo && (o = ht), s === Bo && (s = ht), o !== s)) return !1;
  switch (o) {
    case Ks:
      return e.toString() === t.toString();
    case Xs: {
      let l = e.valueOf(),
        p = t.valueOf();
      return l === p || (Number.isNaN(l) && Number.isNaN(p));
    }
    case Js:
    case Zs:
    case Qs:
      return Object.is(e.valueOf(), t.valueOf());
    case Ys:
      return e.source === t.source && e.flags === t.flags;
    case oi:
      return e === t;
  }
  r = r ?? new Map();
  let i = r.get(e),
    u = r.get(t);
  if (i != null && u != null) return i === t;
  (r.set(e, t), r.set(t, e));
  try {
    switch (o) {
      case ei: {
        if (e.size !== t.size) return !1;
        for (let [l, p] of e.entries()) if (!t.has(l) || !ye(p, t.get(l), r)) return !1;
        return !0;
      }
      case ri: {
        if (e.size !== t.size) return !1;
        let l = Array.from(e.values()),
          p = Array.from(t.values());
        for (let d = 0; d < l.length; d++) {
          let m = l[d],
            y = p.findIndex((g) => ye(m, g, r));
          if (y === -1) return !1;
          p.splice(y, 1);
        }
        return !0;
      }
      case ti:
      case ai:
      case li:
      case ci:
      case pi:
      case di:
      case ui:
      case fi:
      case yi:
      case mi:
      case hi:
      case gi: {
        if ((typeof Buffer < 'u' && Buffer.isBuffer(e) !== Buffer.isBuffer(t)) || e.length !== t.length) return !1;
        for (let l = 0; l < e.length; l++) if (!ye(e[l], t[l], r)) return !1;
        return !0;
      }
      case ni:
        return e.byteLength !== t.byteLength ? !1 : ye(new Uint8Array(e), new Uint8Array(t), r);
      case ii:
        return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : ye(e.buffer, t.buffer, r);
      case si:
        return e.name === t.name && e.message === t.message;
      case ht: {
        if (!(ye(e.constructor, t.constructor, r) || ($(e) && $(t)))) return !1;
        let l = [...Object.keys(e), ...Vo(e)],
          p = [...Object.keys(t), ...Vo(t)];
        if (l.length !== p.length) return !1;
        for (let d = 0; d < l.length; d++) {
          let m = l[d],
            y = e[m];
          if (!Object.prototype.hasOwnProperty.call(t, m)) return !1;
          let g = t[m];
          if (!ye(y, g, r)) return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    (r.delete(e), r.delete(t));
  }
}
n(ye, 'areObjectsEqual');
var Si = n((e, t) => {
    let [r, o] = mt(t ? t(e.getState()) : e.getState());
    return (
      Er(
        () =>
          e.onStateChange((s, i) => {
            if (!t) {
              o(s);
              return;
            }
            let u = t(s),
              l = t(i);
            !Ar(u, l) && o(u);
          }),
        [e, o, t],
      ),
      [r, e.setState]
    );
  }, 'useUniversalStore'),
  St = class Ta extends Q {
    constructor(t, r) {
      ((Q.isInternalConstructing = !0),
        super({...t, leader: !0}, {channel: new ie({}), environment: Q.Environment.MOCK}),
        (Q.isInternalConstructing = !1),
        typeof r?.fn == 'function' &&
          ((this.testUtils = r),
          (this.getState = r.fn(this.getState)),
          (this.setState = r.fn(this.setState)),
          (this.subscribe = r.fn(this.subscribe)),
          (this.onStateChange = r.fn(this.onStateChange)),
          (this.send = r.fn(this.send))));
    }
    static create(t, r) {
      return new Ta(t, r);
    }
    unsubscribeAll() {
      if (!this.testUtils)
        throw new Error(ps`Cannot call unsubscribeAll on a store that does not have testUtils.
        Please provide testUtils as the second argument when creating the store.`);
      let t = n((r) => {
        try {
          r.value();
        } catch {}
      }, 'callReturnedUnsubscribeFn');
      (this.subscribe.mock?.results.forEach(t), this.onStateChange.mock?.results.forEach(t));
    }
  };
n(St, 'MockUniversalStore');
var gt = St,
  kr = {};
_e(kr, {
  CalledExtractOnStoreError: () => vr,
  CalledPreviewMethodBeforeInitializationError: () => V,
  Category: () => Ti,
  EmptyIndexError: () => Pr,
  ImplicitActionsDuringRendering: () => zo,
  MdxFileWithNoCsfReferencesError: () => Cr,
  MissingRenderToCanvasError: () => wr,
  MissingStoryAfterHmrError: () => xr,
  MissingStoryFromCsfFileError: () => Ir,
  MountMustBeDestructuredError: () => Oe,
  NextJsSharpError: () => Wo,
  NextjsRouterMocksNotAvailable: () => $o,
  NoRenderFunctionError: () => Dr,
  NoStoryMatchError: () => Or,
  NoStoryMountedError: () => Nr,
  StoryIndexFetchError: () => _r,
  StoryStoreAccessedBeforeInitializationError: () => Fr,
  UnknownArgTypesError: () => Yo,
  UnsupportedViewportDimensionError: () => Ko,
});
function bi({code: e, category: t}) {
  let r = String(e).padStart(4, '0');
  return `SB_${t}_${r}`;
}
n(bi, 'parseErrorCode');
var bt = class Sa extends Error {
  constructor(t) {
    (super(Sa.getFullMessage(t)),
      (this.data = {}),
      (this.fromStorybook = !0),
      (this.category = t.category),
      (this.documentation = t.documentation ?? !1),
      (this.code = t.code));
  }
  get fullErrorCode() {
    return bi({code: this.code, category: this.category});
  }
  get name() {
    let t = this.constructor.name;
    return `${this.fullErrorCode} (${t})`;
  }
  static getFullMessage({documentation: t, code: r, category: o, message: s}) {
    let i;
    return (
      t === !0
        ? (i = `https://storybook.js.org/error/${bi({code: r, category: o})}`)
        : typeof t == 'string'
          ? (i = t)
          : Array.isArray(t) &&
            (i = `
${t.map((u) => `	- ${u}`).join(`
`)}`),
      `${s}${
        i != null
          ? `

More info: ${i}
`
          : ''
      }`
    );
  }
};
n(bt, 'StorybookError');
var G = bt,
  Ti = ((e) => (
    (e.BLOCKS = 'BLOCKS'),
    (e.DOCS_TOOLS = 'DOCS-TOOLS'),
    (e.PREVIEW_CLIENT_LOGGER = 'PREVIEW_CLIENT-LOGGER'),
    (e.PREVIEW_CHANNELS = 'PREVIEW_CHANNELS'),
    (e.PREVIEW_CORE_EVENTS = 'PREVIEW_CORE-EVENTS'),
    (e.PREVIEW_INSTRUMENTER = 'PREVIEW_INSTRUMENTER'),
    (e.PREVIEW_API = 'PREVIEW_API'),
    (e.PREVIEW_REACT_DOM_SHIM = 'PREVIEW_REACT-DOM-SHIM'),
    (e.PREVIEW_ROUTER = 'PREVIEW_ROUTER'),
    (e.PREVIEW_THEMING = 'PREVIEW_THEMING'),
    (e.RENDERER_HTML = 'RENDERER_HTML'),
    (e.RENDERER_PREACT = 'RENDERER_PREACT'),
    (e.RENDERER_REACT = 'RENDERER_REACT'),
    (e.RENDERER_SERVER = 'RENDERER_SERVER'),
    (e.RENDERER_SVELTE = 'RENDERER_SVELTE'),
    (e.RENDERER_VUE = 'RENDERER_VUE'),
    (e.RENDERER_VUE3 = 'RENDERER_VUE3'),
    (e.RENDERER_WEB_COMPONENTS = 'RENDERER_WEB-COMPONENTS'),
    (e.FRAMEWORK_NEXTJS = 'FRAMEWORK_NEXTJS'),
    (e.ADDON_VITEST = 'ADDON_VITEST'),
    e
  ))(Ti || {}),
  Xo = class extends G {
    constructor(t) {
      (super({
        category: 'PREVIEW_API',
        code: 1,
        message: _`
        Couldn't find story matching id '${t.storyId}' after HMR.
        - Did you just rename a story?
        - Did you remove it from your CSF file?
        - Are you sure a story with the id '${t.storyId}' exists?
        - Please check the values in the stories field of your main.js config and see if they would match your CSF File.
        - Also check the browser console and terminal for potential error messages.`,
      }),
        (this.data = t));
    }
  };
n(Xo, 'MissingStoryAfterHmrError');
var xr = Xo,
  Jo = class extends G {
    constructor(t) {
      (super({
        category: 'PREVIEW_API',
        code: 2,
        documentation:
          'https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function',
        message: _`
        We detected that you use an implicit action arg while ${t.phase} of your story.  
        ${
          t.deprecated
            ? `
This is deprecated and won't work in Storybook 8 anymore.
`
            : ''
        }
        Please provide an explicit spy to your args like this:
          import { fn } from '@storybook/test';
          ... 
          args: {
           ${t.name}: fn()
          }`,
      }),
        (this.data = t));
    }
  };
n(Jo, 'ImplicitActionsDuringRendering');
var zo = Jo,
  Qo = class extends G {
    constructor() {
      super({
        category: 'PREVIEW_API',
        code: 3,
        message: _`
        Cannot call \`storyStore.extract()\` without calling \`storyStore.cacheAllCsfFiles()\` first.

        You probably meant to call \`await preview.extract()\` which does the above for you.`,
      });
    }
  };
n(Qo, 'CalledExtractOnStoreError');
var vr = Qo,
  Zo = class extends G {
    constructor() {
      super({
        category: 'PREVIEW_API',
        code: 4,
        message: _`
        Expected your framework's preset to export a \`renderToCanvas\` field.

        Perhaps it needs to be upgraded for Storybook 7.0?`,
        documentation: 'https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mainjs-framework-field',
      });
    }
  };
n(Zo, 'MissingRenderToCanvasError');
var wr = Zo,
  en = class extends G {
    constructor(t) {
      (super({
        category: 'PREVIEW_API',
        code: 5,
        message: _`
        Called \`Preview.${t.methodName}()\` before initialization.
        
        The preview needs to load the story index before most methods can be called. If you want
        to call \`${t.methodName}\`, try \`await preview.initializationPromise;\` first.
        
        If you didn't call the above code, then likely it was called by an addon that needs to
        do the above.`,
      }),
        (this.data = t));
    }
  };
n(en, 'CalledPreviewMethodBeforeInitializationError');
var V = en,
  rn = class extends G {
    constructor(t) {
      (super({
        category: 'PREVIEW_API',
        code: 6,
        message: _`
        Error fetching \`/index.json\`:
        
        ${t.text}

        If you are in development, this likely indicates a problem with your Storybook process,
        check the terminal for errors.

        If you are in a deployed Storybook, there may have been an issue deploying the full Storybook
        build.`,
      }),
        (this.data = t));
    }
  };
n(rn, 'StoryIndexFetchError');
var _r = rn,
  tn = class extends G {
    constructor(t) {
      (super({
        category: 'PREVIEW_API',
        code: 7,
        message: _`
        Tried to render docs entry ${t.storyId} but it is a MDX file that has no CSF
        references, or autodocs for a CSF file that some doesn't refer to itself.
        
        This likely is an internal error in Storybook's indexing, or you've attached the
        \`attached-mdx\` tag to an MDX file that is not attached.`,
      }),
        (this.data = t));
    }
  };
n(tn, 'MdxFileWithNoCsfReferencesError');
var Cr = tn,
  on = class extends G {
    constructor() {
      super({
        category: 'PREVIEW_API',
        code: 8,
        message: _`
        Couldn't find any stories in your Storybook.

        - Please check your stories field of your main.js config: does it match correctly?
        - Also check the browser console and terminal for error messages.`,
      });
    }
  };
n(on, 'EmptyIndexError');
var Pr = on,
  nn = class extends G {
    constructor(t) {
      (super({
        category: 'PREVIEW_API',
        code: 9,
        message: _`
        Couldn't find story matching '${t.storySpecifier}'.

        - Are you sure a story with that id exists?
        - Please check your stories field of your main.js config.
        - Also check the browser console and terminal for error messages.`,
      }),
        (this.data = t));
    }
  };
n(nn, 'NoStoryMatchError');
var Or = nn,
  sn = class extends G {
    constructor(t) {
      (super({
        category: 'PREVIEW_API',
        code: 10,
        message: _`
        Couldn't find story matching id '${t.storyId}' after importing a CSF file.

        The file was indexed as if the story was there, but then after importing the file in the browser
        we didn't find the story. Possible reasons:
        - You are using a custom story indexer that is misbehaving.
        - You have a custom file loader that is removing or renaming exports.

        Please check your browser console and terminal for errors that may explain the issue.`,
      }),
        (this.data = t));
    }
  };
n(sn, 'MissingStoryFromCsfFileError');
var Ir = sn,
  an = class extends G {
    constructor() {
      super({
        category: 'PREVIEW_API',
        code: 11,
        message: _`
        Cannot access the Story Store until the index is ready.

        It is not recommended to use methods directly on the Story Store anyway, in Storybook 9 we will
        remove access to the store entirely`,
      });
    }
  };
n(an, 'StoryStoreAccessedBeforeInitializationError');
var Fr = an,
  ln = class extends G {
    constructor(t) {
      (super({
        category: 'PREVIEW_API',
        code: 12,
        message: _`
      Incorrect use of mount in the play function.
      
      To use mount in the play function, you must satisfy the following two requirements: 
      
      1. You *must* destructure the mount property from the \`context\` (the argument passed to your play function). 
         This makes sure that Storybook does not start rendering the story before the play function begins.
      
      2. Your Storybook framework or builder must be configured to transpile to ES2017 or newer. 
         This is because destructuring statements and async/await usages are otherwise transpiled away, 
         which prevents Storybook from recognizing your usage of \`mount\`.
      
      Note that Angular is not supported. As async/await is transpiled to support the zone.js polyfill. 
      
      More info: https://storybook.js.org/docs/writing-tests/interaction-testing#run-code-before-the-component-gets-rendered
      
      Received the following play function:
      ${t.playFunction}`,
      }),
        (this.data = t));
    }
  };
n(ln, 'MountMustBeDestructuredError');
var Oe = ln,
  cn = class extends G {
    constructor(t) {
      (super({
        category: 'PREVIEW_API',
        code: 14,
        message: _`
        No render function available for storyId '${t.id}'
      `,
      }),
        (this.data = t));
    }
  };
n(cn, 'NoRenderFunctionError');
var Dr = cn,
  pn = class extends G {
    constructor() {
      super({
        category: 'PREVIEW_API',
        code: 15,
        message: _`
        No component is mounted in your story.
        
        This usually occurs when you destructure mount in the play function, but forget to call it.
        
        For example:

        async play({ mount, canvasElement }) {
          // 👈 mount should be called: await mount(); 
          const canvas = within(canvasElement);
          const button = await canvas.findByRole('button');
          await userEvent.click(button);
        };

        Make sure to either remove it or call mount in your play function.
      `,
      });
    }
  };
n(pn, 'NoStoryMountedError');
var Nr = pn,
  dn = class extends G {
    constructor() {
      super({
        category: 'FRAMEWORK_NEXTJS',
        code: 1,
        documentation: 'https://storybook.js.org/docs/get-started/nextjs#faq',
        message: _`
      You are importing avif images, but you don't have sharp installed.

      You have to install sharp in order to use image optimization features in Next.js.
      `,
      });
    }
  };
n(dn, 'NextJsSharpError');
var Wo = dn,
  un = class extends G {
    constructor(t) {
      (super({
        category: 'FRAMEWORK_NEXTJS',
        code: 2,
        message: _`
        Tried to access router mocks from "${t.importType}" but they were not created yet. You might be running code in an unsupported environment.
      `,
      }),
        (this.data = t));
    }
  };
n(un, 'NextjsRouterMocksNotAvailable');
var $o = un,
  fn$1 = class extends G {
    constructor(t) {
      (super({
        category: 'DOCS-TOOLS',
        code: 1,
        documentation: 'https://github.com/storybookjs/storybook/issues/26606',
        message: _`
        There was a failure when generating detailed ArgTypes in ${t.language} for:
        ${JSON.stringify(t.type, null, 2)} 
        
        Storybook will fall back to use a generic type description instead.

        This type is either not supported or it is a bug in the docgen generation in Storybook.
        If you think this is a bug, please detail it as much as possible in the Github issue.
      `,
      }),
        (this.data = t));
    }
  };
n(fn$1, 'UnknownArgTypesError');
var Yo = fn$1,
  yn = class extends G {
    constructor(t) {
      (super({
        category: 'ADDON_VITEST',
        code: 1,
        message: _`
        Encountered an unsupported value "${t.value}" when setting the viewport ${t.dimension} dimension.
        
        The Storybook plugin only supports values in the following units:
        - px, vh, vw, em, rem and %.
        
        You can either change the viewport for this story to use one of the supported units or skip the test by adding '!test' to the story's tags per https://storybook.js.org/docs/writing-stories/tags
      `,
      }),
        (this.data = t));
    }
  };
n(yn, 'UnsupportedViewportDimensionError');
var Ko = yn,
  Ot = ue(it()),
  rr = Symbol('incompatible'),
  mn = n((e, t) => {
    let r = t.type;
    if (e == null || !r || t.mapping) return e;
    switch (r.name) {
      case 'string':
        return String(e);
      case 'enum':
        return e;
      case 'number':
        return Number(e);
      case 'boolean':
        return String(e) === 'true';
      case 'array':
        return !r.value || !Array.isArray(e)
          ? rr
          : e.reduce((o, s, i) => {
              let u = mn(s, {type: r.value});
              return (u !== rr && (o[i] = u), o);
            }, new Array(e.length));
      case 'object':
        return typeof e == 'string' || typeof e == 'number'
          ? e
          : !r.value || typeof e != 'object'
            ? rr
            : Object.entries(e).reduce((o, [s, i]) => {
                let u = mn(i, {type: r.value[s]});
                return u === rr ? o : Object.assign(o, {[s]: u});
              }, {});
      default:
        return rr;
    }
  }, 'map'),
  Ei = n(
    (e, t) =>
      Object.entries(e).reduce((r, [o, s]) => {
        if (!t[o]) return r;
        let i = mn(s, t[o]);
        return i === rr ? r : Object.assign(r, {[o]: i});
      }, {}),
    'mapArgsToTypes',
  ),
  tr = n(
    (e, t) =>
      Array.isArray(e) && Array.isArray(t)
        ? t.reduce((r, o, s) => ((r[s] = tr(e[s], t[s])), r), [...e]).filter((r) => r !== void 0)
        : !$(e) || !$(t)
          ? t
          : Object.keys({...e, ...t}).reduce((r, o) => {
              if (o in t) {
                let s = tr(e[o], t[o]);
                s !== void 0 && (r[o] = s);
              } else r[o] = e[o];
              return r;
            }, {}),
    'combineArgs',
  ),
  Ri = n(
    (e, t) =>
      Object.entries(t).reduce((r, [o, {options: s}]) => {
        function i() {
          return (o in e && (r[o] = e[o]), r);
        }
        if ((n(i, 'allowArg'), !s)) return i();
        if (!Array.isArray(s))
          return (
            j.error(_`
        Invalid argType: '${o}.options' should be an array.

        More info: https://storybook.js.org/docs/api/arg-types
      `),
            i()
          );
        if (s.some((y) => y && ['object', 'function'].includes(typeof y)))
          return (
            j.error(_`
        Invalid argType: '${o}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
      `),
            i()
          );
        let u = Array.isArray(e[o]),
          l = u && e[o].findIndex((y) => !s.includes(y)),
          p = u && l === -1;
        if (e[o] === void 0 || s.includes(e[o]) || p) return i();
        let d = u ? `${o}[${l}]` : o,
          m = s.map((y) => (typeof y == 'string' ? `'${y}'` : String(y))).join(', ');
        return (j.warn(`Received illegal value for '${d}'. Supported options: ${m}`), r);
      }, {}),
    'validateOptions',
  ),
  Ie = Symbol('Deeply equal'),
  or = n((e, t) => {
    if (typeof e != typeof t) return t;
    if (Ar(e, t)) return Ie;
    if (Array.isArray(e) && Array.isArray(t)) {
      let r = t.reduce((o, s, i) => {
        let u = or(e[i], s);
        return (u !== Ie && (o[i] = u), o);
      }, new Array(t.length));
      return t.length >= e.length ? r : r.concat(new Array(e.length - t.length).fill(void 0));
    }
    return $(e) && $(t)
      ? Object.keys({...e, ...t}).reduce((r, o) => {
          let s = or(e?.[o], t?.[o]);
          return s === Ie ? r : Object.assign(r, {[o]: s});
        }, {})
      : t;
  }, 'deepDiff'),
  hn = 'UNTARGETED';
function Ai({args: e, argTypes: t}) {
  let r = {};
  return (
    Object.entries(e).forEach(([o, s]) => {
      let {target: i = hn} = t[o] || {};
      ((r[i] = r[i] || {}), (r[i][o] = s));
    }),
    r
  );
}
n(Ai, 'groupArgsByTarget');
function qd(e) {
  return (Object.keys(e).forEach((t) => e[t] === void 0 && delete e[t]), e);
}
n(qd, 'deleteUndefined');
var gn = class {
  constructor() {
    ((this.initialArgsByStoryId = {}), (this.argsByStoryId = {}));
  }
  get(t) {
    if (!(t in this.argsByStoryId)) throw new Error(`No args known for ${t} -- has it been rendered yet?`);
    return this.argsByStoryId[t];
  }
  setInitial(t) {
    if (!this.initialArgsByStoryId[t.id])
      ((this.initialArgsByStoryId[t.id] = t.initialArgs), (this.argsByStoryId[t.id] = t.initialArgs));
    else if (this.initialArgsByStoryId[t.id] !== t.initialArgs) {
      let r = or(this.initialArgsByStoryId[t.id], this.argsByStoryId[t.id]);
      ((this.initialArgsByStoryId[t.id] = t.initialArgs),
        (this.argsByStoryId[t.id] = t.initialArgs),
        r !== Ie && this.updateFromDelta(t, r));
    }
  }
  updateFromDelta(t, r) {
    let o = Ri(r, t.argTypes);
    this.argsByStoryId[t.id] = tr(this.argsByStoryId[t.id], o);
  }
  updateFromPersisted(t, r) {
    let o = Ei(r, t.argTypes);
    return this.updateFromDelta(t, o);
  }
  update(t, r) {
    if (!(t in this.argsByStoryId)) throw new Error(`No args known for ${t} -- has it been rendered yet?`);
    this.argsByStoryId[t] = qd({...this.argsByStoryId[t], ...r});
  }
};
n(gn, 'ArgsStore');
var Tt = gn,
  Et = n(
    (e = {}) => Object.entries(e).reduce((t, [r, {defaultValue: o}]) => (typeof o < 'u' && (t[r] = o), t), {}),
    'getValuesFromArgTypes',
  ),
  Sn = class {
    constructor({globals: t = {}, globalTypes: r = {}}) {
      this.set({globals: t, globalTypes: r});
    }
    set({globals: t = {}, globalTypes: r = {}}) {
      let o = this.initialGlobals && or(this.initialGlobals, this.globals);
      this.allowedGlobalNames = new Set([...Object.keys(t), ...Object.keys(r)]);
      let s = Et(r);
      ((this.initialGlobals = {...s, ...t}),
        (this.globals = this.initialGlobals),
        o && o !== Ie && this.updateFromPersisted(o));
    }
    filterAllowedGlobals(t) {
      return Object.entries(t).reduce(
        (r, [o, s]) => (
          this.allowedGlobalNames.has(o)
            ? (r[o] = s)
            : I.warn(`Attempted to set a global (${o}) that is not defined in initial globals or globalTypes`),
          r
        ),
        {},
      );
    }
    updateFromPersisted(t) {
      let r = this.filterAllowedGlobals(t);
      this.globals = {...this.globals, ...r};
    }
    get() {
      return this.globals;
    }
    update(t) {
      this.globals = {...this.globals, ...this.filterAllowedGlobals(t)};
    }
  };
n(Sn, 'GlobalsStore');
var Rt = Sn,
  xi = ue(it()),
  Bd = (0, xi.default)(1)((e) => Object.values(e).reduce((t, r) => ((t[r.importPath] = t[r.importPath] || r), t), {})),
  bn = class {
    constructor({entries: t} = {v: 5, entries: {}}) {
      this.entries = t;
    }
    entryFromSpecifier(t) {
      let r = Object.values(this.entries);
      if (t === '*') return r[0];
      if (typeof t == 'string') return this.entries[t] ? this.entries[t] : r.find((i) => i.id.startsWith(t));
      let {name: o, title: s} = t;
      return r.find((i) => i.name === o && i.title === s);
    }
    storyIdToEntry(t) {
      let r = this.entries[t];
      if (!r) throw new xr({storyId: t});
      return r;
    }
    importPathToEntry(t) {
      return Bd(this.entries)[t];
    }
  };
n(bn, 'StoryIndexStore');
var At = bn,
  Vd = n((e) => (typeof e == 'string' ? {name: e} : e), 'normalizeType'),
  Hd = n((e) => (typeof e == 'string' ? {type: e} : e), 'normalizeControl'),
  zd = n((e, t) => {
    let {type: r, control: o, ...s} = e,
      i = {name: t, ...s};
    return (r && (i.type = Vd(r)), o ? (i.control = Hd(o)) : o === !1 && (i.control = {disable: !0}), i);
  }, 'normalizeInputType'),
  Fe = n((e) => oe(e, zd), 'normalizeInputTypes');
function vi(e) {
  return e
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\./g, ' ')
    .replace(/([^\n])([A-Z])([a-z])/g, (t, r, o, s) => `${r} ${o}${s}`)
    .replace(/([a-z])([A-Z])/g, (t, r, o) => `${r} ${o}`)
    .replace(/([a-z])([0-9])/gi, (t, r, o) => `${r} ${o}`)
    .replace(/([0-9])([a-z])/gi, (t, r, o) => `${r} ${o}`)
    .replace(/(\s|^)(\w)/g, (t, r, o) => `${r}${o.toUpperCase()}`)
    .replace(/ +/g, ' ')
    .trim();
}
n(vi, 'toStartCaseStr');
var En = ue(wi()),
  _i = n((e) => e.map((t) => typeof t < 'u').filter(Boolean).length, 'count'),
  Wd = n((e, t) => {
    let {exists: r, eq: o, neq: s, truthy: i} = e;
    if (_i([r, o, s, i]) > 1) throw new Error(`Invalid conditional test ${JSON.stringify({exists: r, eq: o, neq: s})}`);
    if (typeof o < 'u') return (0, En.isEqual)(t, o);
    if (typeof s < 'u') return !(0, En.isEqual)(t, s);
    if (typeof r < 'u') {
      let u = typeof t < 'u';
      return r ? u : !u;
    }
    return typeof i > 'u' || i ? !!t : !t;
  }, 'testValue'),
  Rn = n((e, t, r) => {
    if (!e.if) return !0;
    let {arg: o, global: s} = e.if;
    if (_i([o, s]) !== 1) throw new Error(`Invalid conditional value ${JSON.stringify({arg: o, global: s})}`);
    let i = o ? t[o] : r[s];
    return Wd(e.if, i);
  }, 'includeConditionalArg');
function nr(e) {
  return e != null && typeof e == 'object' && '_tag' in e && e?._tag === 'Story';
}
n(nr, 'isStory');
var An = n(
    (e) =>
      e
        .toLowerCase()
        .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
        .replace(/-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, ''),
    'sanitize',
  ),
  Ci = n((e, t) => {
    let r = An(e);
    if (r === '') throw new Error(`Invalid ${t} '${e}', must include alphanumeric characters`);
    return r;
  }, 'sanitizeSafe'),
  Oi = n((e, t) => `${Ci(e, 'kind')}${t ? `--${Ci(t, 'name')}` : ''}`, 'toId'),
  Ii = n((e) => vi(e), 'storyNameFromExport');
function Pi(e, t) {
  return Array.isArray(t) ? t.includes(e) : e.match(t);
}
n(Pi, 'matches');
function Lr(e, {includeStories: t, excludeStories: r}) {
  return e !== '__esModule' && (!t || Pi(e, t)) && (!r || !Pi(e, r));
}
n(Lr, 'isExportStory');
var Fi = n((...e) => {
    let t = e.reduce((r, o) => (o.startsWith('!') ? r.delete(o.slice(1)) : r.add(o), r), new Set());
    return Array.from(t);
  }, 'combineTags'),
  k = n((e) => (Array.isArray(e) ? e : e ? [e] : []), 'normalizeArrays'),
  $d = _`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
function De(e, t, r) {
  let o = t,
    s = typeof t == 'function' ? t : null,
    {story: i} = o;
  i && (I.debug('deprecated story', i), ae($d));
  let u = Ii(e),
    l = (typeof o != 'function' && o.name) || o.storyName || i?.name || u,
    p = [...k(o.decorators), ...k(i?.decorators)],
    d = {...i?.parameters, ...o.parameters},
    m = {...i?.args, ...o.args},
    y = {...i?.argTypes, ...o.argTypes},
    g = [...k(o.loaders), ...k(i?.loaders)],
    S = [...k(o.beforeEach), ...k(i?.beforeEach)],
    T = [...k(o.experimental_afterEach), ...k(i?.experimental_afterEach)],
    {render: O, play: C, tags: D = [], globals: R = {}} = o,
    x = d.__id || Oi(r.id, u);
  return {
    moduleExport: t,
    id: x,
    name: l,
    tags: D,
    decorators: p,
    parameters: d,
    args: m,
    argTypes: Fe(y),
    loaders: g,
    beforeEach: S,
    experimental_afterEach: T,
    globals: R,
    ...(O && {render: O}),
    ...(s && {userStoryFn: s}),
    ...(C && {play: C}),
  };
}
n(De, 'normalizeStory');
function jr(e, t = e.title, r) {
  let {id: o, argTypes: s} = e;
  return {id: An(o || t), ...e, title: t, ...(s && {argTypes: Fe(s)}), parameters: {fileName: r, ...e.parameters}};
}
n(jr, 'normalizeComponentAnnotations');
var Yd = n((e) => {
    let {globals: t, globalTypes: r} = e;
    (t || r) && I.error('Global args/argTypes can only be set globally', JSON.stringify({globals: t, globalTypes: r}));
  }, 'checkGlobals'),
  Kd = n((e) => {
    let {options: t} = e;
    t?.storySort && I.error('The storySort option parameter can only be set globally');
  }, 'checkStorySort'),
  xt = n((e) => {
    e && (Yd(e), Kd(e));
  }, 'checkDisallowedParameters');
function Di(e, t, r) {
  let {default: o, __namedExportsOrder: s, ...i} = e,
    u = Object.values(i)[0];
  if (nr(u)) {
    let d = jr(u.meta.input, r, t);
    xt(d.parameters);
    let m = {meta: d, stories: {}, moduleExports: e};
    return (
      Object.keys(i).forEach((y) => {
        if (Lr(y, d)) {
          let g = De(y, i[y].input, d);
          (xt(g.parameters), (m.stories[g.id] = g));
        }
      }),
      (m.projectAnnotations = u.meta.preview.composed),
      m
    );
  }
  let l = jr(o, r, t);
  xt(l.parameters);
  let p = {meta: l, stories: {}, moduleExports: e};
  return (
    Object.keys(i).forEach((d) => {
      if (Lr(d, l)) {
        let m = De(d, i[d], l);
        (xt(m.parameters), (p.stories[m.id] = m));
      }
    }),
    p
  );
}
n(Di, 'processCSFFile');
function ki(e) {
  return e != null && Xd(e).includes('mount');
}
n(ki, 'mountDestructured');
function Xd(e) {
  let t = e.toString().match(/[^(]*\(([^)]*)/);
  if (!t) return [];
  let r = Ni(t[1]);
  if (!r.length) return [];
  let o = r[0];
  return o.startsWith('{') && o.endsWith('}')
    ? Ni(o.slice(1, -1).replace(/\s/g, '')).map((s) => s.replace(/:.*|=.*/g, ''))
    : [];
}
n(Xd, 'getUsedProps');
function Ni(e) {
  let t = [],
    r = [],
    o = 0;
  for (let i = 0; i < e.length; i++)
    if (e[i] === '{' || e[i] === '[') r.push(e[i] === '{' ? '}' : ']');
    else if (e[i] === r[r.length - 1]) r.pop();
    else if (!r.length && e[i] === ',') {
      let u = e.substring(o, i).trim();
      (u && t.push(u), (o = i + 1));
    }
  let s = e.substring(o).trim();
  return (s && t.push(s), t);
}
n(Ni, 'splitByComma');
function xn(e, t, r) {
  let o = r(e);
  return (s) => t(o, s);
}
n(xn, 'decorateStory');
function vn({
  componentId: e,
  title: t,
  kind: r,
  id: o,
  name: s,
  story: i,
  parameters: u,
  initialArgs: l,
  argTypes: p,
  ...d
} = {}) {
  return d;
}
n(vn, 'sanitizeStoryContextUpdate');
function vt(e, t) {
  let r = {},
    o = n(
      (i) => (u) => {
        if (!r.value) throw new Error('Decorated function called without init');
        return ((r.value = {...r.value, ...vn(u)}), i(r.value));
      },
      'bindWithContext',
    ),
    s = t.reduce((i, u) => xn(i, u, o), e);
  return (i) => ((r.value = i), s(i));
}
n(vt, 'defaultDecorateStory');
var Y = n((...e) => {
  let t = {},
    r = e.filter(Boolean),
    o = r.reduce(
      (s, i) => (
        Object.entries(i).forEach(([u, l]) => {
          let p = s[u];
          Array.isArray(l) || typeof p > 'u' ? (s[u] = l) : $(l) && $(p) ? (t[u] = !0) : typeof l < 'u' && (s[u] = l);
        }),
        s
      ),
      {},
    );
  return (
    Object.keys(t).forEach((s) => {
      let i = r
        .filter(Boolean)
        .map((u) => u[s])
        .filter((u) => typeof u < 'u');
      i.every((u) => $(u)) ? (o[s] = Y(...i)) : (o[s] = i[i.length - 1]);
    }),
    o
  );
}, 'combineParameters');
function sr(e, t, r) {
  let {moduleExport: o, id: s, name: i} = e || {},
    u = Li(e, t, r),
    l = n(async (M) => {
      let se = {};
      for (let ne of [
        ...('__STORYBOOK_TEST_LOADERS__' in E && Array.isArray(E.__STORYBOOK_TEST_LOADERS__)
          ? [E.__STORYBOOK_TEST_LOADERS__]
          : []),
        k(r.loaders),
        k(t.loaders),
        k(e.loaders),
      ]) {
        if (M.abortSignal.aborted) return se;
        let le = await Promise.all(ne.map((ce) => ce(M)));
        Object.assign(se, ...le);
      }
      return se;
    }, 'applyLoaders'),
    p = n(async (M) => {
      let se = new Array();
      for (let ne of [...k(r.beforeEach), ...k(t.beforeEach), ...k(e.beforeEach)]) {
        if (M.abortSignal.aborted) return se;
        let le = await ne(M);
        le && se.push(le);
      }
      return se;
    }, 'applyBeforeEach'),
    d = n(async (M) => {
      let se = [
        ...k(r.experimental_afterEach),
        ...k(t.experimental_afterEach),
        ...k(e.experimental_afterEach),
      ].reverse();
      for (let ne of se) {
        if (M.abortSignal.aborted) return;
        await ne(M);
      }
    }, 'applyAfterEach'),
    m = n((M) => M.originalStoryFn(M.args, M), 'undecoratedStoryFn'),
    {applyDecorators: y = vt, runStep: g} = r,
    S = [...k(e?.decorators), ...k(t?.decorators), ...k(r?.decorators)],
    T = e?.userStoryFn || e?.render || t.render || r.render,
    O = ft(y)(m, S),
    C = n((M) => O(M), 'unboundStoryFn'),
    D = e?.play ?? t?.play,
    R = ki(D);
  if (!T && !R) throw new Dr({id: s});
  let x = n((M) => async () => (await M.renderToCanvas(), M.canvas), 'defaultMount'),
    J = e.mount ?? t.mount ?? r.mount ?? x,
    K = r.testingLibraryRender;
  return {
    storyGlobals: {},
    ...u,
    moduleExport: o,
    id: s,
    name: i,
    story: i,
    originalStoryFn: T,
    undecoratedStoryFn: m,
    unboundStoryFn: C,
    applyLoaders: l,
    applyBeforeEach: p,
    applyAfterEach: d,
    playFunction: D,
    runStep: g,
    mount: J,
    testingLibraryRender: K,
    renderToCanvas: r.renderToCanvas,
    usesMount: R,
  };
}
n(sr, 'prepareStory');
function wt(e, t, r) {
  return {...Li(void 0, e, t), moduleExport: r};
}
n(wt, 'prepareMeta');
function Li(e, t, r) {
  let o = ['dev', 'test'],
    s = E.DOCS_OPTIONS?.autodocs === !0 ? ['autodocs'] : [],
    i = Fi(...o, ...s, ...(r.tags ?? []), ...(t.tags ?? []), ...(e?.tags ?? [])),
    u = Y(r.parameters, t.parameters, e?.parameters),
    {argTypesEnhancers: l = [], argsEnhancers: p = []} = r,
    d = Y(r.argTypes, t.argTypes, e?.argTypes);
  if (e) {
    let D = e?.userStoryFn || e?.render || t.render || r.render;
    u.__isArgsStory = D && D.length > 0;
  }
  let m = {...r.args, ...t.args, ...e?.args},
    y = {...t.globals, ...e?.globals},
    g = {
      componentId: t.id,
      title: t.title,
      kind: t.title,
      id: e?.id || t.id,
      name: e?.name || '__meta',
      story: e?.name || '__meta',
      component: t.component,
      subcomponents: t.subcomponents,
      tags: i,
      parameters: u,
      initialArgs: m,
      argTypes: d,
      storyGlobals: y,
    };
  g.argTypes = l.reduce((D, R) => R({...g, argTypes: D}), g.argTypes);
  let S = {...m};
  g.initialArgs = p.reduce((D, R) => ({...D, ...R({...g, initialArgs: D})}), S);
  let {name: T, story: O, ...C} = g;
  return C;
}
n(Li, 'preparePartialAnnotations');
function _t(e) {
  let {args: t} = e,
    r = {...e, allArgs: void 0, argsByTarget: void 0};
  if (E.FEATURES?.argTypeTargetsV7) {
    let i = Ai(e);
    r = {...e, allArgs: e.args, argsByTarget: i, args: i[hn] || {}};
  }
  let o = Object.entries(r.args).reduce((i, [u, l]) => {
      if (!r.argTypes[u]?.mapping) return ((i[u] = l), i);
      let p = n((d) => {
        let m = r.argTypes[u].mapping;
        return m && d in m ? m[d] : d;
      }, 'mappingFn');
      return ((i[u] = Array.isArray(l) ? l.map(p) : p(l)), i);
    }, {}),
    s = Object.entries(o).reduce((i, [u, l]) => {
      let p = r.argTypes[u] || {};
      return (Rn(p, o, r.globals) && (i[u] = l), i);
    }, {});
  return {...r, unmappedArgs: t, args: s};
}
n(_t, 'prepareContext');
var wn = n((e, t, r) => {
    let o = typeof e;
    switch (o) {
      case 'boolean':
      case 'string':
      case 'number':
      case 'function':
      case 'symbol':
        return {name: o};
    }
    return e
      ? r.has(e)
        ? (I.warn(_`
        We've detected a cycle in arg '${t}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `),
          {name: 'other', value: 'cyclic object'})
        : (r.add(e),
          Array.isArray(e)
            ? {name: 'array', value: e.length > 0 ? wn(e[0], t, new Set(r)) : {name: 'other', value: 'unknown'}}
            : {name: 'object', value: oe(e, (s) => wn(s, t, new Set(r)))})
      : {name: 'object', value: {}};
  }, 'inferType'),
  _n = n((e) => {
    let {id: t, argTypes: r = {}, initialArgs: o = {}} = e,
      s = oe(o, (u, l) => ({name: l, type: wn(u, `${t}.${l}`, new Set())})),
      i = oe(r, (u, l) => ({name: l}));
    return Y(s, i, r);
  }, 'inferArgTypes');
_n.secondPass = !0;
var ji = n((e, t) => (Array.isArray(t) ? t.includes(e) : e.match(t)), 'matches'),
  Mr = n(
    (e, t, r) =>
      !t && !r
        ? e
        : e &&
          qo(e, (o, s) => {
            let i = o.name || s.toString();
            return !!(!t || ji(i, t)) && (!r || !ji(i, r));
          }),
    'filterArgTypes',
  ),
  Jd = n((e, t, r) => {
    let {type: o, options: s} = e;
    if (o) {
      if (r.color && r.color.test(t)) {
        let i = o.name;
        if (i === 'string') return {control: {type: 'color'}};
        i !== 'enum' && I.warn(`Addon controls: Control of type color only supports string, received "${i}" instead`);
      }
      if (r.date && r.date.test(t)) return {control: {type: 'date'}};
      switch (o.name) {
        case 'array':
          return {control: {type: 'object'}};
        case 'boolean':
          return {control: {type: 'boolean'}};
        case 'string':
          return {control: {type: 'text'}};
        case 'number':
          return {control: {type: 'number'}};
        case 'enum': {
          let {value: i} = o;
          return {control: {type: i?.length <= 5 ? 'radio' : 'select'}, options: i};
        }
        case 'function':
        case 'symbol':
          return null;
        default:
          return {control: {type: s ? 'select' : 'object'}};
      }
    }
  }, 'inferControl'),
  ir = n((e) => {
    let {
      argTypes: t,
      parameters: {__isArgsStory: r, controls: {include: o = null, exclude: s = null, matchers: i = {}} = {}},
    } = e;
    if (!r) return t;
    let u = Mr(t, o, s),
      l = oe(u, (p, d) => p?.type && Jd(p, d.toString(), i));
    return Y(l, u);
  }, 'inferControls');
ir.secondPass = !0;
function Ne({
  argTypes: e,
  globalTypes: t,
  argTypesEnhancers: r,
  decorators: o,
  loaders: s,
  beforeEach: i,
  experimental_afterEach: u,
  globals: l,
  initialGlobals: p,
  ...d
}) {
  return (
    l &&
      Object.keys(l).length > 0 &&
      ae(_`
      The preview.js 'globals' field is deprecated and will be removed in Storybook 9.0.
      Please use 'initialGlobals' instead. Learn more:

      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#previewjs-globals-renamed-to-initialglobals
    `),
    {
      ...(e && {argTypes: Fe(e)}),
      ...(t && {globalTypes: Fe(t)}),
      decorators: k(o),
      loaders: k(s),
      beforeEach: k(i),
      experimental_afterEach: k(u),
      argTypesEnhancers: [...(r || []), _n, ir],
      initialGlobals: Y(p, l),
      ...d,
    }
  );
}
n(Ne, 'normalizeProjectAnnotations');
var Mi = n(
  (e) => async () => {
    let t = [];
    for (let r of e) {
      let o = await r();
      o && t.unshift(o);
    }
    return async () => {
      for (let r of t) await r();
    };
  },
  'composeBeforeAllHooks',
);
function Ct(e) {
  return async (t, r, o) => {
    await e.reduceRight(
      (s, i) => async () => i(t, s, o),
      async () => r(o),
    )();
  };
}
n(Ct, 'composeStepRunners');
function Gr(e, t) {
  return e.map((r) => r.default?.[t] ?? r[t]).filter(Boolean);
}
n(Gr, 'getField');
function Te(e, t, r = {}) {
  return Gr(e, t).reduce((o, s) => {
    let i = k(s);
    return r.reverseFileOrder ? [...i, ...o] : [...o, ...i];
  }, []);
}
n(Te, 'getArrayField');
function Ur(e, t) {
  return Object.assign({}, ...Gr(e, t));
}
n(Ur, 'getObjectField');
function ar(e, t) {
  return Gr(e, t).pop();
}
n(ar, 'getSingletonField');
function ke(e) {
  let t = Te(e, 'argTypesEnhancers'),
    r = Gr(e, 'runStep'),
    o = Te(e, 'beforeAll');
  return {
    parameters: Y(...Gr(e, 'parameters')),
    decorators: Te(e, 'decorators', {reverseFileOrder: !(E.FEATURES?.legacyDecoratorFileOrder ?? !1)}),
    args: Ur(e, 'args'),
    argsEnhancers: Te(e, 'argsEnhancers'),
    argTypes: Ur(e, 'argTypes'),
    argTypesEnhancers: [...t.filter((s) => !s.secondPass), ...t.filter((s) => s.secondPass)],
    globals: Ur(e, 'globals'),
    initialGlobals: Ur(e, 'initialGlobals'),
    globalTypes: Ur(e, 'globalTypes'),
    loaders: Te(e, 'loaders'),
    beforeAll: Mi(o),
    beforeEach: Te(e, 'beforeEach'),
    experimental_afterEach: Te(e, 'experimental_afterEach'),
    render: ar(e, 'render'),
    renderToCanvas: ar(e, 'renderToCanvas'),
    renderToDOM: ar(e, 'renderToDOM'),
    applyDecorators: ar(e, 'applyDecorators'),
    runStep: Ct(r),
    tags: Te(e, 'tags'),
    mount: ar(e, 'mount'),
    testingLibraryRender: ar(e, 'testingLibraryRender'),
  };
}
n(ke, 'composeConfigs');
var Cn = class {
  constructor() {
    this.reports = [];
  }
  async addReport(t) {
    this.reports.push(t);
  }
};
n(Cn, 'ReporterAPI');
var Ee = Cn;
function Pt(e, t, r) {
  return nr(e)
    ? {story: e.input, meta: e.meta.input, preview: e.meta.preview.composed}
    : {story: e, meta: t, preview: r};
}
n(Pt, 'getCsfFactoryAnnotations');
function Ui(e) {
  globalThis.defaultProjectAnnotations = e;
}
n(Ui, 'setDefaultProjectAnnotations');
var Qd = 'ComposedStory',
  Zd = 'Unnamed Story';
function eu(e) {
  return e ? ke([e]) : {};
}
n(eu, 'extractAnnotation');
function Gi(e) {
  let t = Array.isArray(e) ? e : [e];
  return (
    (globalThis.globalProjectAnnotations = ke([globalThis.defaultProjectAnnotations ?? {}, ke(t.map(eu))])),
    globalThis.globalProjectAnnotations ?? {}
  );
}
n(Gi, 'setProjectAnnotations');
var Re = [];
function Pn(e, t, r, o, s) {
  if (e === void 0) throw new Error('Expected a story but received undefined.');
  t.title = t.title ?? Qd;
  let i = jr(t),
    u = s || e.storyName || e.story?.name || e.name || Zd,
    l = De(u, e, i),
    p = Ne(ke([o ?? globalThis.globalProjectAnnotations ?? {}, r ?? {}])),
    d = sr(l, i, p),
    m = {...Et(p.globalTypes), ...p.initialGlobals, ...d.storyGlobals},
    y = new Ee(),
    g = n(() => {
      let D = _t({
        hooks: new be(),
        globals: m,
        args: {...d.initialArgs},
        viewMode: 'story',
        reporting: y,
        loaded: {},
        abortSignal: new AbortController().signal,
        step: n((R, x) => d.runStep(R, x, D), 'step'),
        canvasElement: null,
        canvas: {},
        globalTypes: p.globalTypes,
        ...d,
        context: null,
        mount: null,
      });
      return (
        (D.parameters.__isPortableStory = !0),
        (D.context = D),
        d.renderToCanvas &&
          (D.renderToCanvas = async () => {
            let R = await d.renderToCanvas?.(
              {
                componentId: d.componentId,
                title: d.title,
                id: d.id,
                name: d.name,
                tags: d.tags,
                showMain: n(() => {}, 'showMain'),
                showError: n((x) => {
                  throw new Error(`${x.title}
${x.description}`);
                }, 'showError'),
                showException: n((x) => {
                  throw x;
                }, 'showException'),
                forceRemount: !0,
                storyContext: D,
                storyFn: n(() => d.unboundStoryFn(D), 'storyFn'),
                unboundStoryFn: d.unboundStoryFn,
              },
              D.canvasElement,
            );
            R && Re.push(R);
          }),
        (D.mount = d.mount(D)),
        D
      );
    }, 'initializeContext'),
    S,
    T = n(async (D) => {
      let R = g();
      return (
        (R.canvasElement ??= globalThis?.document?.body),
        S && (R.loaded = S.loaded),
        Object.assign(R, D),
        d.playFunction(R)
      );
    }, 'play'),
    O = n((D) => {
      let R = g();
      return (Object.assign(R, D), tu(d, R));
    }, 'run'),
    C = d.playFunction ? T : void 0;
  return Object.assign(
    n(function (D) {
      let R = g();
      return (S && (R.loaded = S.loaded), (R.args = {...R.initialArgs, ...D}), d.unboundStoryFn(R));
    }, 'storyFn'),
    {
      id: d.id,
      storyName: u,
      load: n(async () => {
        for (let R of [...Re].reverse()) await R();
        Re.length = 0;
        let D = g();
        ((D.loaded = await d.applyLoaders(D)), Re.push(...(await d.applyBeforeEach(D)).filter(Boolean)), (S = D));
      }, 'load'),
      globals: m,
      args: d.initialArgs,
      parameters: d.parameters,
      argTypes: d.argTypes,
      play: C,
      run: O,
      reporting: y,
      tags: d.tags,
    },
  );
}
n(Pn, 'composeStory');
var ru = n((e, t, r, o) => Pn(e, t, r, {}, o), 'defaultComposeStory');
function qi(e, t, r = ru) {
  let {default: o, __esModule: s, __namedExportsOrder: i, ...u} = e,
    l = o;
  return Object.entries(u).reduce((p, [d, m]) => {
    let {story: y, meta: g} = Pt(m);
    return (!l && g && (l = g), Lr(d, l) ? Object.assign(p, {[d]: r(y, l, t, d)}) : p);
  }, {});
}
n(qi, 'composeStories');
function Bi(e) {
  return e.extend({
    mount: n(async ({mount: t, page: r}, o) => {
      await o(async (s, ...i) => {
        if (!('__pw_type' in s) || ('__pw_type' in s && s.__pw_type !== 'jsx'))
          throw new Error(_`
              Portable stories in Playwright CT only work when referencing JSX elements.
              Please use JSX format for your components such as:

              instead of:
              await mount(MyComponent, { props: { foo: 'bar' } })

              do:
              await mount(<MyComponent foo="bar"/>)

              More info: https://storybook.js.org/docs/api/portable-stories-playwright
            `);
        await r.evaluate(async (l) => {
          let p = await globalThis.__pwUnwrapObject?.(l);
          return ('__pw_type' in p ? p.type : p)?.load?.();
        }, s);
        let u = await t(s, ...i);
        return (
          await r.evaluate(async (l) => {
            let p = await globalThis.__pwUnwrapObject?.(l),
              d = '__pw_type' in p ? p.type : p,
              m = document.querySelector('#root');
            return d?.play?.({canvasElement: m});
          }, s),
          u
        );
      });
    }, 'mount'),
  });
}
n(Bi, 'createPlaywrightTest');
async function tu(e, t) {
  for (let s of [...Re].reverse()) await s();
  if (((Re.length = 0), !t.canvasElement)) {
    let s = document.createElement('div');
    (globalThis?.document?.body?.appendChild(s),
      (t.canvasElement = s),
      Re.push(() => {
        globalThis?.document?.body?.contains(s) && globalThis?.document?.body?.removeChild(s);
      }));
  }
  if (((t.loaded = await e.applyLoaders(t)), t.abortSignal.aborted)) return;
  Re.push(...(await e.applyBeforeEach(t)).filter(Boolean));
  let r = e.playFunction,
    o = e.usesMount;
  (o || (await t.mount()),
    !t.abortSignal.aborted &&
      (r &&
        (o ||
          (t.mount = async () => {
            throw new Oe({playFunction: r.toString()});
          }),
        await r(t)),
      await e.applyAfterEach(t)));
}
n(tu, 'runStory');
function Vi(e, t) {
  return Uo(Go(e, t), (r) => r === void 0);
}
n(Vi, 'picky');
var Hi = 1e3,
  ou = 1e4,
  On = class {
    constructor(t, r, o) {
      ((this.importFn = r),
        (this.getStoriesJsonData = n(() => {
          let u = this.getSetStoriesPayload(),
            l = ['fileName', 'docsOnly', 'framework', '__id', '__isArgsStory'];
          return {
            v: 3,
            stories: oe(u.stories, (p) => {
              let {importPath: d} = this.storyIndex.entries[p.id];
              return {
                ...Vi(p, ['id', 'name', 'title']),
                importPath: d,
                kind: p.title,
                story: p.name,
                parameters: {...Vi(p.parameters, l), fileName: d},
              };
            }),
          };
        }, 'getStoriesJsonData')),
        (this.storyIndex = new At(t)),
        (this.projectAnnotations = Ne(o)));
      let {initialGlobals: s, globalTypes: i} = this.projectAnnotations;
      ((this.args = new Tt()),
        (this.userGlobals = new Rt({globals: s, globalTypes: i})),
        (this.hooks = {}),
        (this.cleanupCallbacks = {}),
        (this.processCSFFileWithCache = (0, Ot.default)(Hi)(Di)),
        (this.prepareMetaWithCache = (0, Ot.default)(Hi)(wt)),
        (this.prepareStoryWithCache = (0, Ot.default)(ou)(sr)));
    }
    setProjectAnnotations(t) {
      this.projectAnnotations = Ne(t);
      let {initialGlobals: r, globalTypes: o} = t;
      this.userGlobals.set({globals: r, globalTypes: o});
    }
    async onStoriesChanged({importFn: t, storyIndex: r}) {
      (t && (this.importFn = t),
        r && (this.storyIndex.entries = r.entries),
        this.cachedCSFFiles && (await this.cacheAllCSFFiles()));
    }
    async storyIdToEntry(t) {
      return this.storyIndex.storyIdToEntry(t);
    }
    async loadCSFFileByStoryId(t) {
      let {importPath: r, title: o} = this.storyIndex.storyIdToEntry(t),
        s = await this.importFn(r);
      return this.processCSFFileWithCache(s, r, o);
    }
    async loadAllCSFFiles() {
      let t = {};
      return (
        Object.entries(this.storyIndex.entries).forEach(([r, {importPath: o}]) => {
          t[o] = r;
        }),
        (
          await Promise.all(
            Object.entries(t).map(async ([r, o]) => ({importPath: r, csfFile: await this.loadCSFFileByStoryId(o)})),
          )
        ).reduce((r, {importPath: o, csfFile: s}) => ((r[o] = s), r), {})
      );
    }
    async cacheAllCSFFiles() {
      this.cachedCSFFiles = await this.loadAllCSFFiles();
    }
    preparedMetaFromCSFFile({csfFile: t}) {
      let r = t.meta;
      return this.prepareMetaWithCache(r, this.projectAnnotations, t.moduleExports.default);
    }
    async loadStory({storyId: t}) {
      let r = await this.loadCSFFileByStoryId(t);
      return this.storyFromCSFFile({storyId: t, csfFile: r});
    }
    storyFromCSFFile({storyId: t, csfFile: r}) {
      let o = r.stories[t];
      if (!o) throw new Ir({storyId: t});
      let s = r.meta,
        i = this.prepareStoryWithCache(o, s, r.projectAnnotations ?? this.projectAnnotations);
      return (this.args.setInitial(i), (this.hooks[i.id] = this.hooks[i.id] || new be()), i);
    }
    componentStoriesFromCSFFile({csfFile: t}) {
      return Object.keys(this.storyIndex.entries)
        .filter((r) => !!t.stories[r])
        .map((r) => this.storyFromCSFFile({storyId: r, csfFile: t}));
    }
    async loadEntry(t) {
      let r = await this.storyIdToEntry(t),
        o = r.type === 'docs' ? r.storiesImports : [],
        [s, ...i] = await Promise.all([
          this.importFn(r.importPath),
          ...o.map((u) => {
            let l = this.storyIndex.importPathToEntry(u);
            return this.loadCSFFileByStoryId(l.id);
          }),
        ]);
      return {entryExports: s, csfFiles: i};
    }
    getStoryContext(t, {forceInitialArgs: r = !1} = {}) {
      let o = this.userGlobals.get(),
        {initialGlobals: s} = this.userGlobals,
        i = new Ee();
      return _t({
        ...t,
        args: r ? t.initialArgs : this.args.get(t.id),
        initialGlobals: s,
        globalTypes: this.projectAnnotations.globalTypes,
        userGlobals: o,
        reporting: i,
        globals: {...o, ...t.storyGlobals},
        hooks: this.hooks[t.id],
      });
    }
    addCleanupCallbacks(t, r) {
      this.cleanupCallbacks[t.id] = r;
    }
    async cleanupStory(t) {
      this.hooks[t.id].clean();
      let r = this.cleanupCallbacks[t.id];
      if (r) for (let o of [...r].reverse()) await o();
      delete this.cleanupCallbacks[t.id];
    }
    extract(t = {includeDocsOnly: !1}) {
      let {cachedCSFFiles: r} = this;
      if (!r) throw new vr();
      return Object.entries(this.storyIndex.entries).reduce((o, [s, {type: i, importPath: u}]) => {
        if (i === 'docs') return o;
        let l = r[u],
          p = this.storyFromCSFFile({storyId: s, csfFile: l});
        return (
          (!t.includeDocsOnly && p.parameters.docsOnly) ||
            (o[s] = Object.entries(p).reduce(
              (d, [m, y]) =>
                m === 'moduleExport' || typeof y == 'function'
                  ? d
                  : Array.isArray(y)
                    ? Object.assign(d, {[m]: y.slice().sort()})
                    : Object.assign(d, {[m]: y}),
              {
                args: p.initialArgs,
                globals: {...this.userGlobals.initialGlobals, ...this.userGlobals.globals, ...p.storyGlobals},
              },
            )),
          o
        );
      }, {});
    }
    getSetStoriesPayload() {
      let t = this.extract({includeDocsOnly: !0}),
        r = Object.values(t).reduce((o, {title: s}) => ((o[s] = {}), o), {});
      return {v: 2, globals: this.userGlobals.get(), globalParameters: {}, kindParameters: r, stories: t};
    }
    raw() {
      return (
        ae('StoryStore.raw() is deprecated and will be removed in 9.0, please use extract() instead'),
        Object.values(this.extract())
          .map(({id: t}) => this.fromId(t))
          .filter(Boolean)
      );
    }
    fromId(t) {
      if (
        (ae('StoryStore.fromId() is deprecated and will be removed in 9.0, please use loadStory() instead'),
        !this.cachedCSFFiles)
      )
        throw new Error('Cannot call fromId/raw() unless you call cacheAllCSFFiles() first.');
      let r;
      try {
        ({importPath: r} = this.storyIndex.storyIdToEntry(t));
      } catch {
        return null;
      }
      let o = this.cachedCSFFiles[r],
        s = this.storyFromCSFFile({storyId: t, csfFile: o});
      return {
        ...s,
        storyFn: n((i) => {
          let u = {
            ...this.getStoryContext(s),
            abortSignal: new AbortController().signal,
            canvasElement: null,
            loaded: {},
            step: n((l, p) => s.runStep(l, p, u), 'step'),
            context: null,
            mount: null,
            canvas: {},
            viewMode: 'story',
          };
          return s.unboundStoryFn({...u, ...i});
        }, 'storyFn'),
      };
    }
  };
n(On, 'StoryStore');
var Le = On;
function In(e) {
  return e.startsWith('\\\\?\\') ? e : e.replace(/\\/g, '/');
}
n(In, 'slash');
var nu = n((e) => {
  if (e.length === 0) return e;
  let t = e[e.length - 1],
    r = t?.replace(/(?:[.](?:story|stories))?([.][^.]+)$/i, '');
  if (e.length === 1) return [r];
  let o = e[e.length - 2];
  return r && o && r.toLowerCase() === o.toLowerCase()
    ? [...e.slice(0, -2), r]
    : r && (/^(story|stories)([.][^.]+)$/i.test(t) || /^index$/i.test(r))
      ? e.slice(0, -1)
      : [...e.slice(0, -1), r];
}, 'sanitize');
function zi(e) {
  return e
    .flatMap((t) => t.split('/'))
    .filter(Boolean)
    .join('/');
}
n(zi, 'pathJoin');
var Fn = n((e, t, r) => {
    let {directory: o, importPathMatcher: s, titlePrefix: i = ''} = t || {};
    typeof e == 'number' &&
      j.warn(_`
      CSF Auto-title received a numeric fileName. This typically happens when
      webpack is mis-configured in production mode. To force webpack to produce
      filenames, set optimization.moduleIds = "named" in your webpack config.
    `);
    let u = In(String(e));
    if (s.exec(u)) {
      if (!r) {
        let l = u.replace(o, ''),
          p = zi([i, l]).split('/');
        return ((p = nu(p)), p.join('/'));
      }
      return i ? zi([i, r]) : r;
    }
  }, 'userOrAutoTitleFromSpecifier'),
  Wi = n((e, t, r) => {
    for (let o = 0; o < t.length; o += 1) {
      let s = Fn(e, t[o], r);
      if (s) return s;
    }
    return r || void 0;
  }, 'userOrAutoTitle'),
  $i = /\s*\/\s*/,
  Yi = n(
    (e = {}) =>
      (t, r) => {
        if (t.title === r.title && !e.includeNames) return 0;
        let o = e.method || 'configure',
          s = e.order || [],
          i = t.title.trim().split($i),
          u = r.title.trim().split($i);
        e.includeNames && (i.push(t.name), u.push(r.name));
        let l = 0;
        for (; i[l] || u[l]; ) {
          if (!i[l]) return -1;
          if (!u[l]) return 1;
          let p = i[l],
            d = u[l];
          if (p !== d) {
            let y = s.indexOf(p),
              g = s.indexOf(d),
              S = s.indexOf('*');
            return y !== -1 || g !== -1
              ? (y === -1 && (S !== -1 ? (y = S) : (y = s.length)),
                g === -1 && (S !== -1 ? (g = S) : (g = s.length)),
                y - g)
              : o === 'configure'
                ? 0
                : p.localeCompare(d, e.locales ? e.locales : void 0, {numeric: !0, sensitivity: 'accent'});
          }
          let m = s.indexOf(p);
          (m === -1 && (m = s.indexOf('*')), (s = m !== -1 && Array.isArray(s[m + 1]) ? s[m + 1] : []), (l += 1));
        }
        return 0;
      },
    'storySort',
  ),
  su = n((e, t, r) => {
    if (t) {
      let o;
      (typeof t == 'function' ? (o = t) : (o = Yi(t)), e.sort(o));
    } else e.sort((o, s) => r.indexOf(o.importPath) - r.indexOf(s.importPath));
    return e;
  }, 'sortStoriesCommon'),
  Ki = n((e, t, r) => {
    try {
      return su(e, t, r);
    } catch (o) {
      throw new Error(_`
    Error sorting stories with sort parameter ${t}:

    > ${o.message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
    }
  }, 'sortStoriesV7'),
  Ae = new Error('prepareAborted'),
  {AbortController: Xi} = globalThis;
function Ji(e) {
  try {
    let {name: t = 'Error', message: r = String(e), stack: o} = e;
    return {name: t, message: r, stack: o};
  } catch {
    return {name: 'Error', message: String(e)};
  }
}
n(Ji, 'serializeError');
var Dn = class {
  constructor(t, r, o, s, i, u, l = {autoplay: !0, forceInitialArgs: !1}, p) {
    ((this.channel = t),
      (this.store = r),
      (this.renderToScreen = o),
      (this.callbacks = s),
      (this.id = i),
      (this.viewMode = u),
      (this.renderOptions = l),
      (this.type = 'story'),
      (this.notYetRendered = !0),
      (this.rerenderEnqueued = !1),
      (this.disableKeyListeners = !1),
      (this.teardownRender = n(() => {}, 'teardownRender')),
      (this.torndown = !1),
      (this.abortController = new Xi()),
      p && ((this.story = p), (this.phase = 'preparing')));
  }
  async runPhase(t, r, o) {
    ((this.phase = r),
      this.channel.emit(Pe, {newPhase: this.phase, storyId: this.id}),
      o && (await o(), this.checkIfAborted(t)));
  }
  checkIfAborted(t) {
    return t.aborted
      ? ((this.phase = 'aborted'), this.channel.emit(Pe, {newPhase: this.phase, storyId: this.id}), !0)
      : !1;
  }
  async prepare() {
    if (
      (await this.runPhase(this.abortController.signal, 'preparing', async () => {
        this.story = await this.store.loadStory({storyId: this.id});
      }),
      this.abortController.signal.aborted)
    )
      throw (await this.store.cleanupStory(this.story), Ae);
  }
  isEqual(t) {
    return !!(this.id === t.id && this.story && this.story === t.story);
  }
  isPreparing() {
    return ['preparing'].includes(this.phase);
  }
  isPending() {
    return ['loading', 'beforeEach', 'rendering', 'playing', 'afterEach'].includes(this.phase);
  }
  async renderToElement(t) {
    return ((this.canvasElement = t), this.render({initial: !0, forceRemount: !0}));
  }
  storyContext() {
    if (!this.story) throw new Error('Cannot call storyContext before preparing');
    let {forceInitialArgs: t} = this.renderOptions;
    return this.store.getStoryContext(this.story, {forceInitialArgs: t});
  }
  async render({initial: t = !1, forceRemount: r = !1} = {}) {
    let {canvasElement: o} = this;
    if (!this.story) throw new Error('cannot render when not prepared');
    let s = this.story;
    if (!o) throw new Error('cannot render when canvasElement is unset');
    let {
      id: i,
      componentId: u,
      title: l,
      name: p,
      tags: d,
      applyLoaders: m,
      applyBeforeEach: y,
      applyAfterEach: g,
      unboundStoryFn: S,
      playFunction: T,
      runStep: O,
    } = s;
    r && !t && (this.cancelRender(), (this.abortController = new Xi()));
    let C = this.abortController.signal,
      D = !1,
      R = s.usesMount;
    try {
      let x = {
        ...this.storyContext(),
        viewMode: this.viewMode,
        abortSignal: C,
        canvasElement: o,
        loaded: {},
        step: n((B, N) => O(B, N, x), 'step'),
        context: null,
        canvas: {},
        renderToCanvas: n(async () => {
          let B = await this.renderToScreen(J, o);
          ((this.teardownRender = B || (() => {})), (D = !0));
        }, 'renderToCanvas'),
        mount: n(async (...B) => {
          this.callbacks.showStoryDuringRender?.();
          let N = null;
          return (
            await this.runPhase(C, 'rendering', async () => {
              N = await s.mount(x)(...B);
            }),
            R && (await this.runPhase(C, 'playing')),
            N
          );
        }, 'mount'),
      };
      x.context = x;
      let J = {
        componentId: u,
        title: l,
        kind: l,
        id: i,
        name: p,
        story: p,
        tags: d,
        ...this.callbacks,
        showError: n((B) => ((this.phase = 'errored'), this.callbacks.showError(B)), 'showError'),
        showException: n((B) => ((this.phase = 'errored'), this.callbacks.showException(B)), 'showException'),
        forceRemount: r || this.notYetRendered,
        storyContext: x,
        storyFn: n(() => S(x), 'storyFn'),
        unboundStoryFn: S,
      };
      if (
        (await this.runPhase(C, 'loading', async () => {
          x.loaded = await m(x);
        }),
        C.aborted)
      )
        return;
      let K = await y(x);
      if (
        (this.store.addCleanupCallbacks(s, K),
        this.checkIfAborted(C) || (!D && !R && (await x.mount()), (this.notYetRendered = !1), C.aborted))
      )
        return;
      let M = this.story.parameters?.test?.dangerouslyIgnoreUnhandledErrors === !0,
        se = new Set(),
        ne = n((B) => se.add('error' in B ? B.error : B.reason), 'onError');
      if (this.renderOptions.autoplay && r && T && this.phase !== 'errored') {
        (window.addEventListener('error', ne),
          window.addEventListener('unhandledrejection', ne),
          (this.disableKeyListeners = !0));
        try {
          if (
            (R
              ? await T(x)
              : ((x.mount = async () => {
                  throw new Oe({playFunction: T.toString()});
                }),
                await this.runPhase(C, 'playing', async () => T(x))),
            !D)
          )
            throw new Nr();
          (this.checkIfAborted(C),
            !M && se.size > 0 ? await this.runPhase(C, 'errored') : await this.runPhase(C, 'played'));
        } catch (B) {
          if (
            (this.callbacks.showStoryDuringRender?.(),
            await this.runPhase(C, 'errored', async () => {
              this.channel.emit(Xt, Ji(B));
            }),
            this.story.parameters.throwPlayFunctionExceptions !== !1)
          )
            throw B;
          console.error(B);
        }
        if (
          (!M && se.size > 0 && this.channel.emit(Jt, Array.from(se).map(Ji)),
          (this.disableKeyListeners = !1),
          window.removeEventListener('unhandledrejection', ne),
          window.removeEventListener('error', ne),
          C.aborted)
        )
          return;
      }
      (await this.runPhase(C, 'completed', async () => this.channel.emit(We, i)),
        this.phase !== 'errored' &&
          (await this.runPhase(C, 'afterEach', async () => {
            await g(x);
          })));
      let le = !M && se.size > 0,
        ce = x.reporting.reports.some((B) => B.status === 'failed'),
        de = le || ce;
      await this.runPhase(C, 'finished', async () =>
        this.channel.emit(ot, {storyId: i, status: de ? 'error' : 'success', reporters: x.reporting.reports}),
      );
    } catch (x) {
      ((this.phase = 'errored'),
        this.callbacks.showException(x),
        await this.runPhase(C, 'finished', async () =>
          this.channel.emit(ot, {storyId: i, status: 'error', reporters: []}),
        ));
    }
    this.rerenderEnqueued && ((this.rerenderEnqueued = !1), this.render());
  }
  async rerender() {
    if (this.isPending() && this.phase !== 'playing') this.rerenderEnqueued = !0;
    else return this.render();
  }
  async remount() {
    return (await this.teardown(), this.render({forceRemount: !0}));
  }
  cancelRender() {
    this.abortController?.abort();
  }
  async teardown() {
    ((this.torndown = !0), this.cancelRender(), this.story && (await this.store.cleanupStory(this.story)));
    for (let t = 0; t < 3; t += 1) {
      if (!this.isPending()) {
        await this.teardownRender();
        return;
      }
      await new Promise((r) => setTimeout(r, 0));
    }
    (window.location.reload(), await new Promise(() => {}));
  }
};
n(Dn, 'StoryRender');
var je = Dn,
  {fetch: iu} = E,
  au = './index.json',
  Nn = class {
    constructor(t, r, o = te.getChannel(), s = !0) {
      ((this.importFn = t),
        (this.getProjectAnnotations = r),
        (this.channel = o),
        (this.storyRenders = []),
        (this.storeInitializationPromise = new Promise((i, u) => {
          ((this.resolveStoreInitializationPromise = i), (this.rejectStoreInitializationPromise = u));
        })),
        s && this.initialize());
    }
    get storyStore() {
      return new Proxy(
        {},
        {
          get: n((t, r) => {
            if (this.storyStoreValue)
              return (
                ae('Accessing the Story Store is deprecated and will be removed in 9.0'),
                this.storyStoreValue[r]
              );
            throw new Fr();
          }, 'get'),
        },
      );
    }
    async initialize() {
      this.setupListeners();
      try {
        let t = await this.getProjectAnnotationsOrRenderError();
        (await this.runBeforeAllHook(t), await this.initializeWithProjectAnnotations(t));
      } catch (t) {
        this.rejectStoreInitializationPromise(t);
      }
    }
    ready() {
      return this.storeInitializationPromise;
    }
    setupListeners() {
      (this.channel.on(so, this.onStoryIndexChanged.bind(this)),
        this.channel.on(fr, this.onUpdateGlobals.bind(this)),
        this.channel.on(yr, this.onUpdateArgs.bind(this)),
        this.channel.on(fo, this.onRequestArgTypesInfo.bind(this)),
        this.channel.on(ur, this.onResetArgs.bind(this)),
        this.channel.on(dr, this.onForceReRender.bind(this)),
        this.channel.on(Kt, this.onForceRemount.bind(this)));
    }
    async getProjectAnnotationsOrRenderError() {
      try {
        let t = await this.getProjectAnnotations();
        if (((this.renderToCanvas = t.renderToCanvas), !this.renderToCanvas)) throw new wr();
        return t;
      } catch (t) {
        throw (this.renderPreviewEntryError('Error reading preview.js:', t), t);
      }
    }
    async initializeWithProjectAnnotations(t) {
      this.projectAnnotationsBeforeInitialization = t;
      try {
        let r = await this.getStoryIndexFromServer();
        return this.initializeWithStoryIndex(r);
      } catch (r) {
        throw (this.renderPreviewEntryError('Error loading story index:', r), r);
      }
    }
    async runBeforeAllHook(t) {
      try {
        (await this.beforeAllCleanup?.(), (this.beforeAllCleanup = await t.beforeAll?.()));
      } catch (r) {
        throw (this.renderPreviewEntryError('Error in beforeAll hook:', r), r);
      }
    }
    async getStoryIndexFromServer() {
      let t = await iu(au);
      if (t.status === 200) return t.json();
      throw new _r({text: await t.text()});
    }
    initializeWithStoryIndex(t) {
      if (!this.projectAnnotationsBeforeInitialization)
        throw new Error('Cannot call initializeWithStoryIndex until project annotations resolve');
      ((this.storyStoreValue = new Le(t, this.importFn, this.projectAnnotationsBeforeInitialization)),
        delete this.projectAnnotationsBeforeInitialization,
        this.setInitialGlobals(),
        this.resolveStoreInitializationPromise());
    }
    async setInitialGlobals() {
      this.emitGlobals();
    }
    emitGlobals() {
      if (!this.storyStoreValue) throw new V({methodName: 'emitGlobals'});
      let t = {
        globals: this.storyStoreValue.userGlobals.get() || {},
        globalTypes: this.storyStoreValue.projectAnnotations.globalTypes || {},
      };
      this.channel.emit(ro, t);
    }
    async onGetProjectAnnotationsChanged({getProjectAnnotations: t}) {
      (delete this.previewEntryError, (this.getProjectAnnotations = t));
      let r = await this.getProjectAnnotationsOrRenderError();
      if ((await this.runBeforeAllHook(r), !this.storyStoreValue)) {
        await this.initializeWithProjectAnnotations(r);
        return;
      }
      (this.storyStoreValue.setProjectAnnotations(r), this.emitGlobals());
    }
    async onStoryIndexChanged() {
      if ((delete this.previewEntryError, !(!this.storyStoreValue && !this.projectAnnotationsBeforeInitialization)))
        try {
          let t = await this.getStoryIndexFromServer();
          if (this.projectAnnotationsBeforeInitialization) {
            this.initializeWithStoryIndex(t);
            return;
          }
          await this.onStoriesChanged({storyIndex: t});
        } catch (t) {
          throw (this.renderPreviewEntryError('Error loading story index:', t), t);
        }
    }
    async onStoriesChanged({importFn: t, storyIndex: r}) {
      if (!this.storyStoreValue) throw new V({methodName: 'onStoriesChanged'});
      await this.storyStoreValue.onStoriesChanged({importFn: t, storyIndex: r});
    }
    async onUpdateGlobals({globals: t, currentStory: r}) {
      if ((this.storyStoreValue || (await this.storeInitializationPromise), !this.storyStoreValue))
        throw new V({methodName: 'onUpdateGlobals'});
      if ((this.storyStoreValue.userGlobals.update(t), r)) {
        let {initialGlobals: o, storyGlobals: s, userGlobals: i, globals: u} = this.storyStoreValue.getStoryContext(r);
        this.channel.emit(Ce, {initialGlobals: o, userGlobals: i, storyGlobals: s, globals: u});
      } else {
        let {initialGlobals: o, globals: s} = this.storyStoreValue.userGlobals;
        this.channel.emit(Ce, {initialGlobals: o, userGlobals: s, storyGlobals: {}, globals: s});
      }
      await Promise.all(this.storyRenders.map((o) => o.rerender()));
    }
    async onUpdateArgs({storyId: t, updatedArgs: r}) {
      if (!this.storyStoreValue) throw new V({methodName: 'onUpdateArgs'});
      (this.storyStoreValue.args.update(t, r),
        await Promise.all(
          this.storyRenders
            .filter((o) => o.id === t && !o.renderOptions.forceInitialArgs)
            .map((o) => (o.story && o.story.usesMount ? o.remount() : o.rerender())),
        ),
        this.channel.emit(to, {storyId: t, args: this.storyStoreValue.args.get(t)}));
    }
    async onRequestArgTypesInfo({id: t, payload: r}) {
      try {
        await this.storeInitializationPromise;
        let o = await this.storyStoreValue?.loadStory(r);
        this.channel.emit(nt, {id: t, success: !0, payload: {argTypes: o?.argTypes || {}}, error: null});
      } catch (o) {
        this.channel.emit(nt, {id: t, success: !1, error: o?.message});
      }
    }
    async onResetArgs({storyId: t, argNames: r}) {
      if (!this.storyStoreValue) throw new V({methodName: 'onResetArgs'});
      let o = this.storyRenders.find((i) => i.id === t)?.story || (await this.storyStoreValue.loadStory({storyId: t})),
        s = (
          r || [...new Set([...Object.keys(o.initialArgs), ...Object.keys(this.storyStoreValue.args.get(t))])]
        ).reduce((i, u) => ((i[u] = o.initialArgs[u]), i), {});
      await this.onUpdateArgs({storyId: t, updatedArgs: s});
    }
    async onForceReRender() {
      await Promise.all(this.storyRenders.map((t) => t.rerender()));
    }
    async onForceRemount({storyId: t}) {
      await Promise.all(this.storyRenders.filter((r) => r.id === t).map((r) => r.remount()));
    }
    renderStoryToElement(t, r, o, s) {
      if (!this.renderToCanvas || !this.storyStoreValue) throw new V({methodName: 'renderStoryToElement'});
      let i = new je(this.channel, this.storyStoreValue, this.renderToCanvas, o, t.id, 'docs', s, t);
      return (
        i.renderToElement(r),
        this.storyRenders.push(i),
        async () => {
          await this.teardownRender(i);
        }
      );
    }
    async teardownRender(t, {viewModeChanged: r} = {}) {
      ((this.storyRenders = this.storyRenders.filter((o) => o !== t)), await t?.teardown?.({viewModeChanged: r}));
    }
    async loadStory({storyId: t}) {
      if (!this.storyStoreValue) throw new V({methodName: 'loadStory'});
      return this.storyStoreValue.loadStory({storyId: t});
    }
    getStoryContext(t, {forceInitialArgs: r = !1} = {}) {
      if (!this.storyStoreValue) throw new V({methodName: 'getStoryContext'});
      return this.storyStoreValue.getStoryContext(t, {forceInitialArgs: r});
    }
    async extract(t) {
      if (!this.storyStoreValue) throw new V({methodName: 'extract'});
      if (this.previewEntryError) throw this.previewEntryError;
      return (await this.storyStoreValue.cacheAllCSFFiles(), this.storyStoreValue.extract(t));
    }
    renderPreviewEntryError(t, r) {
      ((this.previewEntryError = r), I.error(t), I.error(r), this.channel.emit($t, r));
    }
  };
n(Nn, 'Preview');
var Me = Nn,
  kn = class {
    constructor(t, r, o, s) {
      ((this.channel = t),
        (this.store = r),
        (this.renderStoryToElement = o),
        (this.storyIdByName = n((i) => {
          let u = this.nameToStoryId.get(i);
          if (u) return u;
          throw new Error(`No story found with that name: ${i}`);
        }, 'storyIdByName')),
        (this.componentStories = n(() => this.componentStoriesValue, 'componentStories')),
        (this.componentStoriesFromCSFFile = n(
          (i) => this.store.componentStoriesFromCSFFile({csfFile: i}),
          'componentStoriesFromCSFFile',
        )),
        (this.storyById = n((i) => {
          if (!i) {
            if (!this.primaryStory)
              throw new Error('No primary story defined for docs entry. Did you forget to use `<Meta>`?');
            return this.primaryStory;
          }
          let u = this.storyIdToCSFFile.get(i);
          if (!u) throw new Error(`Called \`storyById\` for story that was never loaded: ${i}`);
          return this.store.storyFromCSFFile({storyId: i, csfFile: u});
        }, 'storyById')),
        (this.getStoryContext = n(
          (i) => ({...this.store.getStoryContext(i), loaded: {}, viewMode: 'docs'}),
          'getStoryContext',
        )),
        (this.loadStory = n((i) => this.store.loadStory({storyId: i}), 'loadStory')),
        (this.componentStoriesValue = []),
        (this.storyIdToCSFFile = new Map()),
        (this.exportToStory = new Map()),
        (this.exportsToCSFFile = new Map()),
        (this.nameToStoryId = new Map()),
        (this.attachedCSFFiles = new Set()),
        s.forEach((i, u) => {
          this.referenceCSFFile(i);
        }));
    }
    referenceCSFFile(t) {
      (this.exportsToCSFFile.set(t.moduleExports, t),
        this.exportsToCSFFile.set(t.moduleExports.default, t),
        this.store.componentStoriesFromCSFFile({csfFile: t}).forEach((r) => {
          let o = t.stories[r.id];
          (this.storyIdToCSFFile.set(o.id, t), this.exportToStory.set(o.moduleExport, r));
        }));
    }
    attachCSFFile(t) {
      if (!this.exportsToCSFFile.has(t.moduleExports))
        throw new Error('Cannot attach a CSF file that has not been referenced');
      this.attachedCSFFiles.has(t) ||
        (this.attachedCSFFiles.add(t),
        this.store.componentStoriesFromCSFFile({csfFile: t}).forEach((r) => {
          (this.nameToStoryId.set(r.name, r.id),
            this.componentStoriesValue.push(r),
            this.primaryStory || (this.primaryStory = r));
        }));
    }
    referenceMeta(t, r) {
      let o = this.resolveModuleExport(t);
      if (o.type !== 'meta')
        throw new Error(
          '<Meta of={} /> must reference a CSF file module export or meta export. Did you mistakenly reference your component instead of your CSF file?',
        );
      r && this.attachCSFFile(o.csfFile);
    }
    get projectAnnotations() {
      let {projectAnnotations: t} = this.store;
      if (!t) throw new Error("Can't get projectAnnotations from DocsContext before they are initialized");
      return t;
    }
    resolveAttachedModuleExportType(t) {
      if (t === 'story') {
        if (!this.primaryStory)
          throw new Error('No primary story attached to this docs file, did you forget to use <Meta of={} />?');
        return {type: 'story', story: this.primaryStory};
      }
      if (this.attachedCSFFiles.size === 0)
        throw new Error('No CSF file attached to this docs file, did you forget to use <Meta of={} />?');
      let r = Array.from(this.attachedCSFFiles)[0];
      if (t === 'meta') return {type: 'meta', csfFile: r};
      let {component: o} = r.meta;
      if (!o) throw new Error('Attached CSF file does not defined a component, did you forget to export one?');
      return {type: 'component', component: o};
    }
    resolveModuleExport(t) {
      let r = this.exportsToCSFFile.get(t);
      if (r) return {type: 'meta', csfFile: r};
      let o = this.exportToStory.get(nr(t) ? t.input : t);
      return o ? {type: 'story', story: o} : {type: 'component', component: t};
    }
    resolveOf(t, r = []) {
      let o;
      if (['component', 'meta', 'story'].includes(t)) {
        let s = t;
        o = this.resolveAttachedModuleExportType(s);
      } else o = this.resolveModuleExport(t);
      if (r.length && !r.includes(o.type)) {
        let s = o.type === 'component' ? 'component or unknown' : o.type;
        throw new Error(_`Invalid value passed to the 'of' prop. The value was resolved to a '${s}' type but the only types for this block are: ${r.join(', ')}.
        - Did you pass a component to the 'of' prop when the block only supports a story or a meta?
        - ... or vice versa?
        - Did you pass a story, CSF file or meta to the 'of' prop that is not indexed, ie. is not targeted by the 'stories' globs in the main configuration?`);
      }
      switch (o.type) {
        case 'component':
          return {...o, projectAnnotations: this.projectAnnotations};
        case 'meta':
          return {...o, preparedMeta: this.store.preparedMetaFromCSFFile({csfFile: o.csfFile})};
        default:
          return o;
      }
    }
  };
n(kn, 'DocsContext');
var me = kn,
  Ln = class {
    constructor(t, r, o, s) {
      ((this.channel = t),
        (this.store = r),
        (this.entry = o),
        (this.callbacks = s),
        (this.type = 'docs'),
        (this.subtype = 'csf'),
        (this.torndown = !1),
        (this.disableKeyListeners = !1),
        (this.preparing = !1),
        (this.id = o.id));
    }
    isPreparing() {
      return this.preparing;
    }
    async prepare() {
      this.preparing = !0;
      let {entryExports: t, csfFiles: r = []} = await this.store.loadEntry(this.id);
      if (this.torndown) throw Ae;
      let {importPath: o, title: s} = this.entry,
        i = this.store.processCSFFileWithCache(t, o, s),
        u = Object.keys(i.stories)[0];
      ((this.story = this.store.storyFromCSFFile({storyId: u, csfFile: i})),
        (this.csfFiles = [i, ...r]),
        (this.preparing = !1));
    }
    isEqual(t) {
      return !!(this.id === t.id && this.story && this.story === t.story);
    }
    docsContext(t) {
      if (!this.csfFiles) throw new Error('Cannot render docs before preparing');
      let r = new me(this.channel, this.store, t, this.csfFiles);
      return (this.csfFiles.forEach((o) => r.attachCSFFile(o)), r);
    }
    async renderToElement(t, r) {
      if (!this.story || !this.csfFiles) throw new Error('Cannot render docs before preparing');
      let o = this.docsContext(r),
        {docs: s} = this.story.parameters || {};
      if (!s) throw new Error('Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed');
      let i = await s.renderer(),
        {render: u} = i,
        l = n(async () => {
          try {
            (await u(o, s, t), this.channel.emit(pr, this.id));
          } catch (p) {
            this.callbacks.showException(p);
          }
        }, 'renderDocs');
      return (
        (this.rerender = async () => l()),
        (this.teardownRender = async ({viewModeChanged: p}) => {
          !p || !t || i.unmount(t);
        }),
        l()
      );
    }
    async teardown({viewModeChanged: t} = {}) {
      (this.teardownRender?.({viewModeChanged: t}), (this.torndown = !0));
    }
  };
n(Ln, 'CsfDocsRender');
var qr = Ln,
  jn = class {
    constructor(t, r, o, s) {
      ((this.channel = t),
        (this.store = r),
        (this.entry = o),
        (this.callbacks = s),
        (this.type = 'docs'),
        (this.subtype = 'mdx'),
        (this.torndown = !1),
        (this.disableKeyListeners = !1),
        (this.preparing = !1),
        (this.id = o.id));
    }
    isPreparing() {
      return this.preparing;
    }
    async prepare() {
      this.preparing = !0;
      let {entryExports: t, csfFiles: r = []} = await this.store.loadEntry(this.id);
      if (this.torndown) throw Ae;
      ((this.csfFiles = r), (this.exports = t), (this.preparing = !1));
    }
    isEqual(t) {
      return !!(this.id === t.id && this.exports && this.exports === t.exports);
    }
    docsContext(t) {
      if (!this.csfFiles) throw new Error('Cannot render docs before preparing');
      return new me(this.channel, this.store, t, this.csfFiles);
    }
    async renderToElement(t, r) {
      if (!this.exports || !this.csfFiles || !this.store.projectAnnotations)
        throw new Error('Cannot render docs before preparing');
      let o = this.docsContext(r),
        {docs: s} = this.store.projectAnnotations.parameters || {};
      if (!s) throw new Error('Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed');
      let i = {...s, page: this.exports.default},
        u = await s.renderer(),
        {render: l} = u,
        p = n(async () => {
          try {
            (await l(o, i, t), this.channel.emit(pr, this.id));
          } catch (d) {
            this.callbacks.showException(d);
          }
        }, 'renderDocs');
      return (
        (this.rerender = async () => p()),
        (this.teardownRender = async ({viewModeChanged: d} = {}) => {
          !d || !t || (u.unmount(t), (this.torndown = !0));
        }),
        p()
      );
    }
    async teardown({viewModeChanged: t} = {}) {
      (this.teardownRender?.({viewModeChanged: t}), (this.torndown = !0));
    }
  };
n(jn, 'MdxDocsRender');
var Br = jn,
  lu = globalThis;
function cu(e) {
  let t = (e.composedPath && e.composedPath()[0]) || e.target;
  return /input|textarea/i.test(t.tagName) || t.getAttribute('contenteditable') !== null;
}
n(cu, 'focusInInput');
var Qi = 'attached-mdx',
  pu = 'unattached-mdx';
function du({tags: e}) {
  return e?.includes(pu) || e?.includes(Qi);
}
n(du, 'isMdxEntry');
function Mn(e) {
  return e.type === 'story';
}
n(Mn, 'isStoryRender');
function uu(e) {
  return e.type === 'docs';
}
n(uu, 'isDocsRender');
function fu(e) {
  return uu(e) && e.subtype === 'csf';
}
n(fu, 'isCsfDocsRender');
var Un = class extends Me {
  constructor(t, r, o, s) {
    (super(t, r, void 0, !1),
      (this.importFn = t),
      (this.getProjectAnnotations = r),
      (this.selectionStore = o),
      (this.view = s),
      this.initialize());
  }
  setupListeners() {
    (super.setupListeners(),
      (lu.onkeydown = this.onKeydown.bind(this)),
      this.channel.on(eo, this.onSetCurrentStory.bind(this)),
      this.channel.on(po, this.onUpdateQueryParams.bind(this)),
      this.channel.on(Qt, this.onPreloadStories.bind(this)));
  }
  async setInitialGlobals() {
    if (!this.storyStoreValue) throw new V({methodName: 'setInitialGlobals'});
    let {globals: t} = this.selectionStore.selectionSpecifier || {};
    (t && this.storyStoreValue.userGlobals.updateFromPersisted(t), this.emitGlobals());
  }
  async initializeWithStoryIndex(t) {
    return (await super.initializeWithStoryIndex(t), this.selectSpecifiedStory());
  }
  async selectSpecifiedStory() {
    if (!this.storyStoreValue) throw new V({methodName: 'selectSpecifiedStory'});
    if (this.selectionStore.selection) {
      await this.renderSelection();
      return;
    }
    if (!this.selectionStore.selectionSpecifier) {
      this.renderMissingStory();
      return;
    }
    let {storySpecifier: t, args: r} = this.selectionStore.selectionSpecifier,
      o = this.storyStoreValue.storyIndex.entryFromSpecifier(t);
    if (!o) {
      t === '*'
        ? this.renderStoryLoadingException(t, new Pr())
        : this.renderStoryLoadingException(t, new Or({storySpecifier: t.toString()}));
      return;
    }
    let {id: s, type: i} = o;
    (this.selectionStore.setSelection({storyId: s, viewMode: i}),
      this.channel.emit(ao, this.selectionStore.selection),
      this.channel.emit(rt, this.selectionStore.selection),
      await this.renderSelection({persistedArgs: r}));
  }
  async onGetProjectAnnotationsChanged({getProjectAnnotations: t}) {
    (await super.onGetProjectAnnotationsChanged({getProjectAnnotations: t}),
      this.selectionStore.selection && this.renderSelection());
  }
  async onStoriesChanged({importFn: t, storyIndex: r}) {
    (await super.onStoriesChanged({importFn: t, storyIndex: r}),
      this.selectionStore.selection ? await this.renderSelection() : await this.selectSpecifiedStory());
  }
  onKeydown(t) {
    if (!this.storyRenders.find((r) => r.disableKeyListeners) && !cu(t)) {
      let {altKey: r, ctrlKey: o, metaKey: s, shiftKey: i, key: u, code: l, keyCode: p} = t;
      this.channel.emit(Zt, {event: {altKey: r, ctrlKey: o, metaKey: s, shiftKey: i, key: u, code: l, keyCode: p}});
    }
  }
  async onSetCurrentStory(t) {
    (this.selectionStore.setSelection({viewMode: 'story', ...t}),
      await this.storeInitializationPromise,
      this.channel.emit(rt, this.selectionStore.selection),
      this.renderSelection());
  }
  onUpdateQueryParams(t) {
    this.selectionStore.setQueryParams(t);
  }
  async onUpdateGlobals({globals: t}) {
    let r = (this.currentRender instanceof je && this.currentRender.story) || void 0;
    (super.onUpdateGlobals({globals: t, currentStory: r}),
      (this.currentRender instanceof Br || this.currentRender instanceof qr) &&
        (await this.currentRender.rerender?.()));
  }
  async onUpdateArgs({storyId: t, updatedArgs: r}) {
    super.onUpdateArgs({storyId: t, updatedArgs: r});
  }
  async onPreloadStories({ids: t}) {
    (await this.storeInitializationPromise,
      this.storyStoreValue && (await Promise.allSettled(t.map((r) => this.storyStoreValue?.loadEntry(r)))));
  }
  async renderSelection({persistedArgs: t} = {}) {
    let {renderToCanvas: r} = this;
    if (!this.storyStoreValue || !r) throw new V({methodName: 'renderSelection'});
    let {selection: o} = this.selectionStore;
    if (!o) throw new Error('Cannot call renderSelection as no selection was made');
    let {storyId: s} = o,
      i;
    try {
      i = await this.storyStoreValue.storyIdToEntry(s);
    } catch (g) {
      (this.currentRender && (await this.teardownRender(this.currentRender)), this.renderStoryLoadingException(s, g));
      return;
    }
    let u = this.currentSelection?.storyId !== s,
      l = this.currentRender?.type !== i.type;
    (i.type === 'story' ? this.view.showPreparingStory({immediate: l}) : this.view.showPreparingDocs({immediate: l}),
      this.currentRender?.isPreparing() && (await this.teardownRender(this.currentRender)));
    let p;
    i.type === 'story'
      ? (p = new je(this.channel, this.storyStoreValue, r, this.mainStoryCallbacks(s), s, 'story'))
      : du(i)
        ? (p = new Br(this.channel, this.storyStoreValue, i, this.mainStoryCallbacks(s)))
        : (p = new qr(this.channel, this.storyStoreValue, i, this.mainStoryCallbacks(s)));
    let d = this.currentSelection;
    this.currentSelection = o;
    let m = this.currentRender;
    this.currentRender = p;
    try {
      await p.prepare();
    } catch (g) {
      (m && (await this.teardownRender(m)), g !== Ae && this.renderStoryLoadingException(s, g));
      return;
    }
    let y = !u && m && !p.isEqual(m);
    if (
      (t && Mn(p) && (fe(!!p.story), this.storyStoreValue.args.updateFromPersisted(p.story, t)),
      m && !m.torndown && !u && !y && !l)
    ) {
      ((this.currentRender = m), this.channel.emit(co, s), this.view.showMain());
      return;
    }
    if ((m && (await this.teardownRender(m, {viewModeChanged: l})), d && (u || l) && this.channel.emit(oo, s), Mn(p))) {
      fe(!!p.story);
      let {
        parameters: g,
        initialArgs: S,
        argTypes: T,
        unmappedArgs: O,
        initialGlobals: C,
        userGlobals: D,
        storyGlobals: R,
        globals: x,
      } = this.storyStoreValue.getStoryContext(p.story);
      (this.channel.emit(io, {id: s, parameters: g, initialArgs: S, argTypes: T, args: O}),
        this.channel.emit(Ce, {userGlobals: D, storyGlobals: R, globals: x, initialGlobals: C}));
    } else {
      let {parameters: g} = this.storyStoreValue.projectAnnotations,
        {initialGlobals: S, globals: T} = this.storyStoreValue.userGlobals;
      if (
        (this.channel.emit(Ce, {globals: T, initialGlobals: S, storyGlobals: {}, userGlobals: T}),
        fu(p) || p.entry.tags?.includes(Qi))
      ) {
        if (!p.csfFiles) throw new Cr({storyId: s});
        ({parameters: g} = this.storyStoreValue.preparedMetaFromCSFFile({csfFile: p.csfFiles[0]}));
      }
      this.channel.emit(Yt, {id: s, parameters: g});
    }
    Mn(p)
      ? (fe(!!p.story),
        this.storyRenders.push(p),
        this.currentRender.renderToElement(this.view.prepareForStory(p.story)))
      : this.currentRender.renderToElement(this.view.prepareForDocs(), this.renderStoryToElement.bind(this));
  }
  async teardownRender(t, {viewModeChanged: r = !1} = {}) {
    ((this.storyRenders = this.storyRenders.filter((o) => o !== t)), await t?.teardown?.({viewModeChanged: r}));
  }
  mainStoryCallbacks(t) {
    return {
      showStoryDuringRender: n(() => this.view.showStoryDuringRender(), 'showStoryDuringRender'),
      showMain: n(() => this.view.showMain(), 'showMain'),
      showError: n((r) => this.renderError(t, r), 'showError'),
      showException: n((r) => this.renderException(t, r), 'showException'),
    };
  }
  renderPreviewEntryError(t, r) {
    (super.renderPreviewEntryError(t, r), this.view.showErrorDisplay(r));
  }
  renderMissingStory() {
    (this.view.showNoPreview(), this.channel.emit(tt));
  }
  renderStoryLoadingException(t, r) {
    (I.error(r), this.view.showErrorDisplay(r), this.channel.emit(tt, t));
  }
  renderException(t, r) {
    let {name: o = 'Error', message: s = String(r), stack: i} = r;
    (this.channel.emit(lo, {name: o, message: s, stack: i}),
      this.channel.emit(Pe, {newPhase: 'errored', storyId: t}),
      this.view.showErrorDisplay(r),
      I.error(`Error rendering story '${t}':`),
      I.error(r));
  }
  renderError(t, {title: r, description: o}) {
    (I.error(`Error rendering story ${r}: ${o}`),
      this.channel.emit(no, {title: r, description: o}),
      this.channel.emit(Pe, {newPhase: 'errored', storyId: t}),
      this.view.showErrorDisplay({message: r, stack: o}));
  }
};
n(Un, 'PreviewWithSelection');
var Ue = Un,
  Hr = ue(kt()),
  da = ue(kt()),
  pa = /^[a-zA-Z0-9 _-]*$/,
  ua = /^-?[0-9]+(\.[0-9]+)?$/,
  Uu = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i,
  fa = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i,
  Wn = n(
    (e = '', t) =>
      e === null || e === '' || !pa.test(e)
        ? !1
        : t == null || t instanceof Date || typeof t == 'number' || typeof t == 'boolean'
          ? !0
          : typeof t == 'string'
            ? pa.test(t) || ua.test(t) || Uu.test(t) || fa.test(t)
            : Array.isArray(t)
              ? t.every((r) => Wn(e, r))
              : $(t)
                ? Object.entries(t).every(([r, o]) => Wn(r, o))
                : !1,
    'validateArgs',
  ),
  Gu = {
    delimiter: ';',
    nesting: !0,
    arrayRepeat: !0,
    arrayRepeatSyntax: 'bracket',
    nestingSyntax: 'js',
    valueDeserializer(e) {
      if (e.startsWith('!')) {
        if (e === '!undefined') return;
        if (e === '!null') return null;
        if (e === '!true') return !0;
        if (e === '!false') return !1;
        if (e.startsWith('!date(') && e.endsWith(')')) return new Date(e.replaceAll(' ', '+').slice(6, -1));
        if (e.startsWith('!hex(') && e.endsWith(')')) return `#${e.slice(5, -1)}`;
        let t = e.slice(1).match(fa);
        if (t)
          return e.startsWith('!rgba') || e.startsWith('!RGBA')
            ? `${t[1]}(${t[2]}, ${t[3]}, ${t[4]}, ${t[5]})`
            : e.startsWith('!hsla') || e.startsWith('!HSLA')
              ? `${t[1]}(${t[2]}, ${t[3]}%, ${t[4]}%, ${t[5]})`
              : e.startsWith('!rgb') || e.startsWith('!RGB')
                ? `${t[1]}(${t[2]}, ${t[3]}, ${t[4]})`
                : `${t[1]}(${t[2]}, ${t[3]}%, ${t[4]}%)`;
      }
      return ua.test(e) ? Number(e) : e;
    },
  },
  $n = n((e) => {
    let t = e.split(';').map((r) => r.replace('=', '~').replace(':', '='));
    return Object.entries((0, da.parse)(t.join(';'), Gu)).reduce(
      (r, [o, s]) =>
        Wn(o, s)
          ? Object.assign(r, {[o]: s})
          : (j.warn(_`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/writing-stories/args#setting-args-through-the-url
    `),
            r),
      {},
    );
  }, 'parseArgsParam'),
  {history: ya, document: xe} = E;
function qu(e) {
  let t = (e || '').match(/^\/story\/(.+)/);
  if (!t) throw new Error(`Invalid path '${e}',  must start with '/story/'`);
  return t[1];
}
n(qu, 'pathToId');
var ma = n(({selection: e, extraParams: t}) => {
    let r = xe?.location.search.slice(1),
      {path: o, selectedKind: s, selectedStory: i, ...u} = (0, Hr.parse)(r);
    return `?${(0, Hr.stringify)({...u, ...t, ...(e && {id: e.storyId, viewMode: e.viewMode})})}`;
  }, 'getQueryString'),
  Bu = n((e) => {
    if (!e) return;
    let t = ma({selection: e}),
      {hash: r = ''} = xe.location;
    ((xe.title = e.storyId), ya.replaceState({}, '', `${xe.location.pathname}${t}${r}`));
  }, 'setPath'),
  Vu = n((e) => e != null && typeof e == 'object' && Array.isArray(e) === !1, 'isObject'),
  Vr = n((e) => {
    if (e !== void 0) {
      if (typeof e == 'string') return e;
      if (Array.isArray(e)) return Vr(e[0]);
      if (Vu(e)) return Vr(Object.values(e).filter(Boolean));
    }
  }, 'getFirstString'),
  Hu = n(() => {
    if (typeof xe < 'u') {
      let e = xe.location.search.slice(1),
        t = (0, Hr.parse)(e),
        r = typeof t.args == 'string' ? $n(t.args) : void 0,
        o = typeof t.globals == 'string' ? $n(t.globals) : void 0,
        s = Vr(t.viewMode);
      (typeof s != 'string' || !s.match(/docs|story/)) && (s = 'story');
      let i = Vr(t.path),
        u = i ? qu(i) : Vr(t.id);
      if (u) return {storySpecifier: u, args: r, globals: o, viewMode: s};
    }
    return null;
  }, 'getSelectionSpecifierFromPath'),
  Yn = class {
    constructor() {
      this.selectionSpecifier = Hu();
    }
    setSelection(t) {
      ((this.selection = t), Bu(this.selection));
    }
    setQueryParams(t) {
      let r = ma({extraParams: t}),
        {hash: o = ''} = xe.location;
      ya.replaceState({}, '', `${xe.location.pathname}${r}${o}`);
    }
  };
n(Yn, 'UrlStore');
var Be = Yn,
  $a = ue(Ha()),
  Ya = ue(kt()),
  {document: z} = E,
  za = 100,
  Ka = ((e) => (
    (e.MAIN = 'MAIN'),
    (e.NOPREVIEW = 'NOPREVIEW'),
    (e.PREPARING_STORY = 'PREPARING_STORY'),
    (e.PREPARING_DOCS = 'PREPARING_DOCS'),
    (e.ERROR = 'ERROR'),
    e
  ))(Ka || {}),
  rs = {
    PREPARING_STORY: 'sb-show-preparing-story',
    PREPARING_DOCS: 'sb-show-preparing-docs',
    MAIN: 'sb-show-main',
    NOPREVIEW: 'sb-show-nopreview',
    ERROR: 'sb-show-errordisplay',
  },
  ts = {centered: 'sb-main-centered', fullscreen: 'sb-main-fullscreen', padded: 'sb-main-padded'},
  Wa = new $a.default({escapeXML: !0}),
  os = class {
    constructor() {
      if (((this.testing = !1), typeof z < 'u')) {
        let {__SPECIAL_TEST_PARAMETER__: t} = (0, Ya.parse)(z.location.search.slice(1));
        switch (t) {
          case 'preparing-story': {
            (this.showPreparingStory(), (this.testing = !0));
            break;
          }
          case 'preparing-docs': {
            (this.showPreparingDocs(), (this.testing = !0));
            break;
          }
        }
      }
    }
    prepareForStory(t) {
      return (
        this.showStory(),
        this.applyLayout(t.parameters.layout),
        (z.documentElement.scrollTop = 0),
        (z.documentElement.scrollLeft = 0),
        this.storyRoot()
      );
    }
    storyRoot() {
      return z.getElementById('storybook-root');
    }
    prepareForDocs() {
      return (
        this.showMain(),
        this.showDocs(),
        this.applyLayout('fullscreen'),
        (z.documentElement.scrollTop = 0),
        (z.documentElement.scrollLeft = 0),
        this.docsRoot()
      );
    }
    docsRoot() {
      return z.getElementById('storybook-docs');
    }
    applyLayout(t = 'padded') {
      if (t === 'none') {
        (z.body.classList.remove(this.currentLayoutClass), (this.currentLayoutClass = null));
        return;
      }
      this.checkIfLayoutExists(t);
      let r = ts[t];
      (z.body.classList.remove(this.currentLayoutClass), z.body.classList.add(r), (this.currentLayoutClass = r));
    }
    checkIfLayoutExists(t) {
      ts[t] ||
        I.warn(_`
          The desired layout: ${t} is not a valid option.
          The possible options are: ${Object.keys(ts).join(', ')}, none.
        `);
    }
    showMode(t) {
      (clearTimeout(this.preparingTimeout),
        Object.keys(Ka).forEach((r) => {
          r === t ? z.body.classList.add(rs[r]) : z.body.classList.remove(rs[r]);
        }));
    }
    showErrorDisplay({message: t = '', stack: r = ''}) {
      let o = t,
        s = r,
        i = t.split(`
`);
      (i.length > 1 &&
        (([o] = i),
        (s = i
          .slice(1)
          .join(
            `
`,
          )
          .replace(/^\n/, ''))),
        (z.getElementById('error-message').innerHTML = Wa.toHtml(o)),
        (z.getElementById('error-stack').innerHTML = Wa.toHtml(s)),
        this.showMode('ERROR'));
    }
    showNoPreview() {
      this.testing ||
        (this.showMode('NOPREVIEW'),
        this.storyRoot()?.setAttribute('hidden', 'true'),
        this.docsRoot()?.setAttribute('hidden', 'true'));
    }
    showPreparingStory({immediate: t = !1} = {}) {
      (clearTimeout(this.preparingTimeout),
        t
          ? this.showMode('PREPARING_STORY')
          : (this.preparingTimeout = setTimeout(() => this.showMode('PREPARING_STORY'), za)));
    }
    showPreparingDocs({immediate: t = !1} = {}) {
      (clearTimeout(this.preparingTimeout),
        t
          ? this.showMode('PREPARING_DOCS')
          : (this.preparingTimeout = setTimeout(() => this.showMode('PREPARING_DOCS'), za)));
    }
    showMain() {
      this.showMode('MAIN');
    }
    showDocs() {
      (this.storyRoot().setAttribute('hidden', 'true'), this.docsRoot().removeAttribute('hidden'));
    }
    showStory() {
      (this.docsRoot().setAttribute('hidden', 'true'), this.storyRoot().removeAttribute('hidden'));
    }
    showStoryDuringRender() {
      z.body.classList.add(rs.MAIN);
    }
  };
n(os, 'WebView');
var He = os,
  ns = class extends Ue {
    constructor(t, r) {
      (super(t, r, new Be(), new He()),
        (this.importFn = t),
        (this.getProjectAnnotations = r),
        (E.__STORYBOOK_PREVIEW__ = this));
    }
  };
n(ns, 'PreviewWeb');
var Wr = ns,
  {document: ze} = E,
  wf = [
    'application/javascript',
    'application/ecmascript',
    'application/x-ecmascript',
    'application/x-javascript',
    'text/ecmascript',
    'text/javascript',
    'text/javascript1.0',
    'text/javascript1.1',
    'text/javascript1.2',
    'text/javascript1.3',
    'text/javascript1.4',
    'text/javascript1.5',
    'text/jscript',
    'text/livescript',
    'text/x-ecmascript',
    'text/x-javascript',
    'module',
  ],
  _f = 'script',
  Xa = 'scripts-root';
function $r() {
  let e = ze.createEvent('Event');
  (e.initEvent('DOMContentLoaded', !0, !0), ze.dispatchEvent(e));
}
n($r, 'simulateDOMContentLoaded');
function Cf(e, t, r) {
  let o = ze.createElement('script');
  ((o.type = e.type === 'module' ? 'module' : 'text/javascript'),
    e.src ? ((o.onload = t), (o.onerror = t), (o.src = e.src)) : (o.textContent = e.innerText),
    r ? r.appendChild(o) : ze.head.appendChild(o),
    e.parentNode.removeChild(e),
    e.src || t());
}
n(Cf, 'insertScript');
function Ja(e, t, r = 0) {
  e[r](() => {
    (r++, r === e.length ? t() : Ja(e, t, r));
  });
}
n(Ja, 'insertScriptsSequentially');
function ss(e) {
  let t = ze.getElementById(Xa);
  t ? (t.innerHTML = '') : ((t = ze.createElement('div')), (t.id = Xa), ze.body.appendChild(t));
  let r = Array.from(e.querySelectorAll(_f));
  if (r.length) {
    let o = [];
    (r.forEach((s) => {
      let i = s.getAttribute('type');
      (!i || wf.includes(i)) && o.push((u) => Cf(s, u, t));
    }),
      o.length && Ja(o, $r, void 0));
  } else $r();
}
n(ss, 'simulatePageLoad');
var Qa = {
    '@storybook/global': Ht,
    'storybook/internal/channels': br,
    '@storybook/channels': br,
    '@storybook/core/channels': br,
    'storybook/internal/client-logger': mr,
    '@storybook/client-logger': mr,
    '@storybook/core/client-logger': mr,
    'storybook/internal/core-events': ge,
    '@storybook/core-events': ge,
    '@storybook/core/core-events': ge,
    'storybook/internal/preview-errors': kr,
    '@storybook/core-events/preview-errors': kr,
    '@storybook/core/preview-errors': kr,
    'storybook/internal/preview-api': Yr,
    '@storybook/preview-api': Yr,
    '@storybook/core/preview-api': Yr,
    'storybook/internal/types': Tr,
    '@storybook/types': Tr,
    '@storybook/core/types': Tr,
  },
  el = ue(Za()),
  ls;
function Pf() {
  return (ls || (ls = new el.default(E.navigator?.userAgent).getBrowserInfo()), ls);
}
n(Pf, 'getBrowserInfo');
function rl(e) {
  return ((e.browserInfo = Pf()), e);
}
n(rl, 'prepareForTelemetry');
function Of(e) {
  let t = e.error || e;
  t.fromStorybook && E.sendTelemetryError(t);
}
n(Of, 'errorListener');
function If({reason: e}) {
  e.fromStorybook && E.sendTelemetryError(e);
}
n(If, 'unhandledRejectionListener');
function Ff() {
  (cs.forEach((e) => {
    E[yo[e]] = Qa[e];
  }),
    (E.sendTelemetryError = (e) => {
      E.__STORYBOOK_ADDONS_CHANNEL__.emit(uo, rl(e));
    }),
    E.addEventListener('error', Of),
    E.addEventListener('unhandledrejection', If));
}
n(Ff, 'setup');
Ff();
const {createBrowserChannel} = __STORYBOOK_MODULE_CHANNELS__,
  {addons: addons$2} = __STORYBOOK_MODULE_PREVIEW_API__,
  channel = createBrowserChannel({page: 'preview'});
addons$2.setChannel(channel);
window.__STORYBOOK_ADDONS_CHANNEL__ = channel;
window.CONFIG_TYPE === 'DEVELOPMENT' && (window.__STORYBOOK_SERVER_CHANNEL__ = channel);
const importers = {
  './src/lib/components/GlobalSearch.stories.ts': () =>
    __vitePreload(() => import('./GlobalSearch.stories-DniQXY5K.js'), __vite__mapDeps([0, 1, 2, 3]), import.meta.url),
  './src/lib/components/NoteModal.stories.ts': () =>
    __vitePreload(() => import('./NoteModal.stories-BGjYTK2L.js'), __vite__mapDeps([4, 1, 2, 5]), import.meta.url),
};
async function importFn(e) {
  return await importers[e]();
}
var __defProp$3 = Object.defineProperty,
  __export$3 = (e, t) => {
    for (var r in t) __defProp$3(e, r, {get: t[r], enumerable: !0});
  };
function isPlainObject(e) {
  if (!e || typeof e != 'object') return !1;
  let t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype || Object.getPrototypeOf(t) === null
    ? Object.prototype.toString.call(e) === '[object Object]'
    : !1;
}
function isPrimitive(e) {
  return e == null || (typeof e != 'object' && typeof e != 'function');
}
function isTypedArray(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function getSymbols(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function getTag(e) {
  return e == null ? (e === void 0 ? '[object Undefined]' : '[object Null]') : Object.prototype.toString.call(e);
}
var regexpTag = '[object RegExp]',
  stringTag = '[object String]',
  numberTag = '[object Number]',
  booleanTag = '[object Boolean]',
  argumentsTag = '[object Arguments]',
  symbolTag = '[object Symbol]',
  dateTag = '[object Date]',
  mapTag = '[object Map]',
  setTag = '[object Set]',
  arrayTag = '[object Array]',
  functionTag = '[object Function]',
  arrayBufferTag = '[object ArrayBuffer]',
  objectTag = '[object Object]',
  errorTag = '[object Error]',
  dataViewTag = '[object DataView]',
  uint8ArrayTag = '[object Uint8Array]',
  uint8ClampedArrayTag = '[object Uint8ClampedArray]',
  uint16ArrayTag = '[object Uint16Array]',
  uint32ArrayTag = '[object Uint32Array]',
  bigUint64ArrayTag = '[object BigUint64Array]',
  int8ArrayTag = '[object Int8Array]',
  int16ArrayTag = '[object Int16Array]',
  int32ArrayTag = '[object Int32Array]',
  bigInt64ArrayTag = '[object BigInt64Array]',
  float32ArrayTag = '[object Float32Array]',
  float64ArrayTag = '[object Float64Array]',
  __create$1 = Object.create,
  __defProp$2 = Object.defineProperty,
  __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor,
  __getOwnPropNames$1 = Object.getOwnPropertyNames,
  __getProtoOf$1 = Object.getPrototypeOf,
  __hasOwnProp$1 = Object.prototype.hasOwnProperty,
  __require = ((e) =>
    typeof require < 'u'
      ? require
      : typeof Proxy < 'u'
        ? new Proxy(e, {get: (t, r) => (typeof require < 'u' ? require : t)[r]})
        : e)(function (e) {
    if (typeof require < 'u') return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported');
  }),
  __commonJS$1 = (e, t) =>
    function () {
      return (t || (0, e[__getOwnPropNames$1(e)[0]])((t = {exports: {}}).exports, t), t.exports);
    },
  __export$2 = (e, t) => {
    for (var r in t) __defProp$2(e, r, {get: t[r], enumerable: !0});
  },
  __copyProps$1 = (e, t, r, o) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let s of __getOwnPropNames$1(t))
        !__hasOwnProp$1.call(e, s) &&
          s !== r &&
          __defProp$2(e, s, {get: () => t[s], enumerable: !(o = __getOwnPropDesc$1(t, s)) || o.enumerable});
    return e;
  },
  __toESM$1 = (e, t, r) => (
    (r = e != null ? __create$1(__getProtoOf$1(e)) : {}),
    __copyProps$1(t || !e || !e.__esModule ? __defProp$2(r, 'default', {value: e, enumerable: !0}) : r, e)
  ),
  require_dist = __commonJS$1({
    '../../node_modules/jsdoc-type-pratt-parser/dist/index.js'(e, t) {
      (function (r, o) {
        typeof e == 'object' && typeof t < 'u'
          ? o(e)
          : typeof define == 'function' && define.amd
            ? define(['exports'], o)
            : ((r = typeof globalThis < 'u' ? globalThis : r || self), o((r.jtpp = {})));
      })(e, function (r) {
        function o(a) {
          return a.text !== void 0 && a.text !== '' ? `'${a.type}' with value '${a.text}'` : `'${a.type}'`;
        }
        class s extends Error {
          constructor(c) {
            (super(`No parslet found for token: ${o(c)}`), (this.token = c), Object.setPrototypeOf(this, s.prototype));
          }
          getToken() {
            return this.token;
          }
        }
        class i extends Error {
          constructor(c) {
            (super(`The parsing ended early. The next token was: ${o(c)}`),
              (this.token = c),
              Object.setPrototypeOf(this, i.prototype));
          }
          getToken() {
            return this.token;
          }
        }
        class u extends Error {
          constructor(c, h) {
            let b = `Unexpected type: '${c.type}'.`;
            (h !== void 0 && (b += ` Message: ${h}`), super(b), Object.setPrototypeOf(this, u.prototype));
          }
        }
        function l(a) {
          return (c) => (c.startsWith(a) ? {type: a, text: a} : null);
        }
        function p(a) {
          let c = 0,
            h,
            b = a[0],
            L = !1;
          if (b !== "'" && b !== '"') return null;
          for (; c < a.length; ) {
            if ((c++, (h = a[c]), !L && h === b)) {
              c++;
              break;
            }
            L = !L && h === '\\';
          }
          if (h !== b) throw new Error('Unterminated String');
          return a.slice(0, c);
        }
        let d = new RegExp(
            '[$_\\p{ID_Start}]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}',
            'u',
          ),
          m = new RegExp(
            '[$\\-\\p{ID_Continue}\\u200C\\u200D]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}',
            'u',
          );
        function y(a) {
          let c = a[0];
          if (!d.test(c)) return null;
          let h = 1;
          do {
            if (((c = a[h]), !m.test(c))) break;
            h++;
          } while (h < a.length);
          return a.slice(0, h);
        }
        let g = /^(NaN|-?((\d*\.\d+|\d+)([Ee][+-]?\d+)?|Infinity))/;
        function S(a) {
          var c, h;
          return (h = (c = g.exec(a)) === null || c === void 0 ? void 0 : c[0]) !== null && h !== void 0 ? h : null;
        }
        let T = (a) => {
          let c = y(a);
          return c == null ? null : {type: 'Identifier', text: c};
        };
        function O(a) {
          return (c) => {
            if (!c.startsWith(a)) return null;
            let h = c[a.length];
            return h !== void 0 && m.test(h) ? null : {type: a, text: a};
          };
        }
        let C = (a) => {
            let c = p(a);
            return c == null ? null : {type: 'StringValue', text: c};
          },
          D = (a) => (a.length > 0 ? null : {type: 'EOF', text: ''}),
          R = (a) => {
            let c = S(a);
            return c === null ? null : {type: 'Number', text: c};
          },
          x = [
            D,
            l('=>'),
            l('('),
            l(')'),
            l('{'),
            l('}'),
            l('['),
            l(']'),
            l('|'),
            l('&'),
            l('<'),
            l('>'),
            l(','),
            l(';'),
            l('*'),
            l('?'),
            l('!'),
            l('='),
            l(':'),
            l('...'),
            l('.'),
            l('#'),
            l('~'),
            l('/'),
            l('@'),
            O('undefined'),
            O('null'),
            O('function'),
            O('this'),
            O('new'),
            O('module'),
            O('event'),
            O('extends'),
            O('external'),
            O('infer'),
            O('typeof'),
            O('keyof'),
            O('readonly'),
            O('import'),
            O('is'),
            O('in'),
            O('asserts'),
            R,
            T,
            C,
          ],
          J = /^\s*\n\s*/;
        class K {
          static create(c) {
            let h = this.read(c);
            c = h.text;
            let b = this.read(c);
            return ((c = b.text), new K(c, void 0, h.token, b.token));
          }
          constructor(c, h, b, L) {
            ((this.text = ''), (this.text = c), (this.previous = h), (this.current = b), (this.next = L));
          }
          static read(c, h = !1) {
            ((h = h || J.test(c)), (c = c.trim()));
            for (let b of x) {
              let L = b(c);
              if (L !== null) {
                let U = Object.assign(Object.assign({}, L), {startOfLine: h});
                return ((c = c.slice(U.text.length)), {text: c, token: U});
              }
            }
            throw new Error('Unexpected Token ' + c);
          }
          advance() {
            let c = K.read(this.text);
            return new K(c.text, this.current, this.next, c.token);
          }
        }
        function M(a) {
          if (a === void 0) throw new Error('Unexpected undefined');
          if (
            a.type === 'JsdocTypeKeyValue' ||
            a.type === 'JsdocTypeParameterList' ||
            a.type === 'JsdocTypeProperty' ||
            a.type === 'JsdocTypeReadonlyProperty' ||
            a.type === 'JsdocTypeObjectField' ||
            a.type === 'JsdocTypeJsdocObjectField' ||
            a.type === 'JsdocTypeIndexSignature' ||
            a.type === 'JsdocTypeMappedType' ||
            a.type === 'JsdocTypeTypeParameter'
          )
            throw new u(a);
          return a;
        }
        function se(a) {
          return a.type === 'JsdocTypeKeyValue' ? le(a) : M(a);
        }
        function ne(a) {
          return a.type === 'JsdocTypeName' ? a : le(a);
        }
        function le(a) {
          if (a.type !== 'JsdocTypeKeyValue') throw new u(a);
          return a;
        }
        function ce(a) {
          var c;
          if (a.type === 'JsdocTypeVariadic') {
            if (((c = a.element) === null || c === void 0 ? void 0 : c.type) === 'JsdocTypeName') return a;
            throw new u(a);
          }
          if (a.type !== 'JsdocTypeNumber' && a.type !== 'JsdocTypeName') throw new u(a);
          return a;
        }
        function de(a) {
          if (a.type === 'JsdocTypeTuple' || (a.type === 'JsdocTypeGeneric' && a.meta.brackets === 'square')) return a;
          throw new u(a);
        }
        function B(a) {
          return a.type === 'JsdocTypeIndexSignature' || a.type === 'JsdocTypeMappedType';
        }
        var N;
        (function (a) {
          ((a[(a.ALL = 0)] = 'ALL'),
            (a[(a.PARAMETER_LIST = 1)] = 'PARAMETER_LIST'),
            (a[(a.OBJECT = 2)] = 'OBJECT'),
            (a[(a.KEY_VALUE = 3)] = 'KEY_VALUE'),
            (a[(a.INDEX_BRACKETS = 4)] = 'INDEX_BRACKETS'),
            (a[(a.UNION = 5)] = 'UNION'),
            (a[(a.INTERSECTION = 6)] = 'INTERSECTION'),
            (a[(a.PREFIX = 7)] = 'PREFIX'),
            (a[(a.INFIX = 8)] = 'INFIX'),
            (a[(a.TUPLE = 9)] = 'TUPLE'),
            (a[(a.SYMBOL = 10)] = 'SYMBOL'),
            (a[(a.OPTIONAL = 11)] = 'OPTIONAL'),
            (a[(a.NULLABLE = 12)] = 'NULLABLE'),
            (a[(a.KEY_OF_TYPE_OF = 13)] = 'KEY_OF_TYPE_OF'),
            (a[(a.FUNCTION = 14)] = 'FUNCTION'),
            (a[(a.ARROW = 15)] = 'ARROW'),
            (a[(a.ARRAY_BRACKETS = 16)] = 'ARRAY_BRACKETS'),
            (a[(a.GENERIC = 17)] = 'GENERIC'),
            (a[(a.NAME_PATH = 18)] = 'NAME_PATH'),
            (a[(a.PARENTHESIS = 19)] = 'PARENTHESIS'),
            (a[(a.SPECIAL_TYPES = 20)] = 'SPECIAL_TYPES'));
        })(N || (N = {}));
        class v {
          constructor(c, h, b) {
            ((this.grammar = c),
              typeof h == 'string' ? (this._lexer = K.create(h)) : (this._lexer = h),
              (this.baseParser = b));
          }
          get lexer() {
            return this._lexer;
          }
          parse() {
            let c = this.parseType(N.ALL);
            if (this.lexer.current.type !== 'EOF') throw new i(this.lexer.current);
            return c;
          }
          parseType(c) {
            return M(this.parseIntermediateType(c));
          }
          parseIntermediateType(c) {
            let h = this.tryParslets(null, c);
            if (h === null) throw new s(this.lexer.current);
            return this.parseInfixIntermediateType(h, c);
          }
          parseInfixIntermediateType(c, h) {
            let b = this.tryParslets(c, h);
            for (; b !== null; ) ((c = b), (b = this.tryParslets(c, h)));
            return c;
          }
          tryParslets(c, h) {
            for (let b of this.grammar) {
              let L = b(this, h, c);
              if (L !== null) return L;
            }
            return null;
          }
          consume(c) {
            return (
              Array.isArray(c) || (c = [c]),
              c.includes(this.lexer.current.type) ? ((this._lexer = this.lexer.advance()), !0) : !1
            );
          }
          acceptLexerState(c) {
            this._lexer = c.lexer;
          }
        }
        function A(a) {
          return a === '}' || a === 'EOF' || a === '|' || a === ',' || a === ')' || a === '>';
        }
        let P = (a, c, h) => {
          let b = a.lexer.current.type,
            L = a.lexer.next.type;
          return (h == null && b === '?' && !A(L)) || (h != null && b === '?')
            ? (a.consume('?'),
              h == null
                ? {type: 'JsdocTypeNullable', element: a.parseType(N.NULLABLE), meta: {position: 'prefix'}}
                : {type: 'JsdocTypeNullable', element: M(h), meta: {position: 'suffix'}})
            : null;
        };
        function F(a) {
          let c = (h, b, L) => {
            let U = h.lexer.current.type,
              W = h.lexer.next.type;
            if (L === null) {
              if ('parsePrefix' in a && a.accept(U, W)) return a.parsePrefix(h);
            } else if ('parseInfix' in a && a.precedence > b && a.accept(U, W)) return a.parseInfix(h, L);
            return null;
          };
          return (Object.defineProperty(c, 'name', {value: a.name}), c);
        }
        let H = F({
            name: 'optionalParslet',
            accept: (a) => a === '=',
            precedence: N.OPTIONAL,
            parsePrefix: (a) => (
              a.consume('='),
              {type: 'JsdocTypeOptional', element: a.parseType(N.OPTIONAL), meta: {position: 'prefix'}}
            ),
            parseInfix: (a, c) => (
              a.consume('='),
              {type: 'JsdocTypeOptional', element: M(c), meta: {position: 'suffix'}}
            ),
          }),
          pe = F({
            name: 'numberParslet',
            accept: (a) => a === 'Number',
            parsePrefix: (a) => {
              let c = parseFloat(a.lexer.current.text);
              return (a.consume('Number'), {type: 'JsdocTypeNumber', value: c});
            },
          }),
          we = F({
            name: 'parenthesisParslet',
            accept: (a) => a === '(',
            parsePrefix: (a) => {
              if ((a.consume('('), a.consume(')'))) return {type: 'JsdocTypeParameterList', elements: []};
              let c = a.parseIntermediateType(N.ALL);
              if (!a.consume(')')) throw new Error('Unterminated parenthesis');
              return c.type === 'JsdocTypeParameterList'
                ? c
                : c.type === 'JsdocTypeKeyValue'
                  ? {type: 'JsdocTypeParameterList', elements: [c]}
                  : {type: 'JsdocTypeParenthesis', element: M(c)};
            },
          }),
          ve = F({
            name: 'specialTypesParslet',
            accept: (a, c) => (a === '?' && A(c)) || a === 'null' || a === 'undefined' || a === '*',
            parsePrefix: (a) => {
              if (a.consume('null')) return {type: 'JsdocTypeNull'};
              if (a.consume('undefined')) return {type: 'JsdocTypeUndefined'};
              if (a.consume('*')) return {type: 'JsdocTypeAny'};
              if (a.consume('?')) return {type: 'JsdocTypeUnknown'};
              throw new Error('Unacceptable token: ' + a.lexer.current.text);
            },
          }),
          he = F({
            name: 'notNullableParslet',
            accept: (a) => a === '!',
            precedence: N.NULLABLE,
            parsePrefix: (a) => (
              a.consume('!'),
              {type: 'JsdocTypeNotNullable', element: a.parseType(N.NULLABLE), meta: {position: 'prefix'}}
            ),
            parseInfix: (a, c) => (
              a.consume('!'),
              {type: 'JsdocTypeNotNullable', element: M(c), meta: {position: 'suffix'}}
            ),
          });
        function qe({allowTrailingComma: a}) {
          return F({
            name: 'parameterListParslet',
            accept: (c) => c === ',',
            precedence: N.PARAMETER_LIST,
            parseInfix: (c, h) => {
              let b = [se(h)];
              c.consume(',');
              do
                try {
                  let L = c.parseIntermediateType(N.PARAMETER_LIST);
                  b.push(se(L));
                } catch (L) {
                  if (L instanceof s) break;
                  throw L;
                }
              while (c.consume(','));
              if (b.length > 0 && b.slice(0, -1).some((L) => L.type === 'JsdocTypeVariadic'))
                throw new Error('Only the last parameter may be a rest parameter');
              return {type: 'JsdocTypeParameterList', elements: b};
            },
          });
        }
        let Mt = F({
            name: 'genericParslet',
            accept: (a, c) => a === '<' || (a === '.' && c === '<'),
            precedence: N.GENERIC,
            parseInfix: (a, c) => {
              let h = a.consume('.');
              a.consume('<');
              let b = [],
                L = !1;
              if (a.consume('infer')) {
                L = !0;
                let U = a.parseIntermediateType(N.SYMBOL);
                if (U.type !== 'JsdocTypeName')
                  throw new u(U, 'A typescript asserts always has to have a name on the left side.');
                b.push(U);
              } else
                do b.push(a.parseType(N.PARAMETER_LIST));
                while (a.consume(','));
              if (!a.consume('>')) throw new Error('Unterminated generic parameter list');
              return Object.assign(
                Object.assign({type: 'JsdocTypeGeneric', left: M(c), elements: b}, L ? {infer: !0} : {}),
                {meta: {brackets: 'angle', dot: h}},
              );
            },
          }),
          Bt = F({
            name: 'unionParslet',
            accept: (a) => a === '|',
            precedence: N.UNION,
            parseInfix: (a, c) => {
              a.consume('|');
              let h = [];
              do h.push(a.parseType(N.UNION));
              while (a.consume('|'));
              return {type: 'JsdocTypeUnion', elements: [M(c), ...h]};
            },
          }),
          Vt = [P, H, pe, we, ve, he, qe({allowTrailingComma: !0}), Mt, Bt, H];
        function Ve({allowSquareBracketsOnAnyType: a, allowJsdocNamePaths: c, pathGrammar: h}) {
          return function (b, L, U) {
            if (U == null || L >= N.NAME_PATH) return null;
            let W = b.lexer.current.type,
              Dt = b.lexer.next.type;
            if (
              !(
                (W === '.' && Dt !== '<') ||
                (W === '[' && (a || U.type === 'JsdocTypeName')) ||
                (c && (W === '~' || W === '#'))
              )
            )
              return null;
            let Nt,
              Lt = !1;
            b.consume('.')
              ? (Nt = 'property')
              : b.consume('[')
                ? ((Nt = 'property-brackets'), (Lt = !0))
                : b.consume('~')
                  ? (Nt = 'inner')
                  : (b.consume('#'), (Nt = 'instance'));
            let Kr = h !== null ? new v(h, b.lexer, b) : b,
              Gt = Kr.parseIntermediateType(N.NAME_PATH);
            b.acceptLexerState(Kr);
            let So;
            switch (Gt.type) {
              case 'JsdocTypeName':
                So = {type: 'JsdocTypeProperty', value: Gt.value, meta: {quote: void 0}};
                break;
              case 'JsdocTypeNumber':
                So = {type: 'JsdocTypeProperty', value: Gt.value.toString(10), meta: {quote: void 0}};
                break;
              case 'JsdocTypeStringValue':
                So = {type: 'JsdocTypeProperty', value: Gt.value, meta: {quote: Gt.meta.quote}};
                break;
              case 'JsdocTypeSpecialNamePath':
                if (Gt.specialType === 'event') So = Gt;
                else throw new u(Gt, "Type 'JsdocTypeSpecialNamePath' is only allowed with specialType 'event'");
                break;
              default:
                throw new u(
                  Gt,
                  "Expecting 'JsdocTypeName', 'JsdocTypeNumber', 'JsdocStringValue' or 'JsdocTypeSpecialNamePath'",
                );
            }
            if (Lt && !b.consume(']')) {
              let va = b.lexer.current;
              throw new Error(`Unterminated square brackets. Next token is '${va.type}' with text '${va.text}'`);
            }
            return {type: 'JsdocTypeNamePath', left: M(U), right: So, pathType: Nt};
          };
        }
        function Ft({allowedAdditionalTokens: a}) {
          return F({
            name: 'nameParslet',
            accept: (c) => c === 'Identifier' || c === 'this' || c === 'new' || a.includes(c),
            parsePrefix: (c) => {
              let {type: h, text: b} = c.lexer.current;
              return (c.consume(h), {type: 'JsdocTypeName', value: b});
            },
          });
        }
        let qt = F({
          name: 'stringValueParslet',
          accept: (a) => a === 'StringValue',
          parsePrefix: (a) => {
            let c = a.lexer.current.text;
            return (
              a.consume('StringValue'),
              {type: 'JsdocTypeStringValue', value: c.slice(1, -1), meta: {quote: c[0] === "'" ? 'single' : 'double'}}
            );
          },
        });
        function lr({pathGrammar: a, allowedTypes: c}) {
          return F({
            name: 'specialNamePathParslet',
            accept: (h) => c.includes(h),
            parsePrefix: (h) => {
              let b = h.lexer.current.type;
              if ((h.consume(b), !h.consume(':'))) return {type: 'JsdocTypeName', value: b};
              let L,
                U = h.lexer.current;
              if (h.consume('StringValue'))
                L = {
                  type: 'JsdocTypeSpecialNamePath',
                  value: U.text.slice(1, -1),
                  specialType: b,
                  meta: {quote: U.text[0] === "'" ? 'single' : 'double'},
                };
              else {
                let Nt = '',
                  Lt = ['Identifier', '@', '/'];
                for (; Lt.some((Kr) => h.consume(Kr)); ) ((Nt += U.text), (U = h.lexer.current));
                L = {type: 'JsdocTypeSpecialNamePath', value: Nt, specialType: b, meta: {quote: void 0}};
              }
              let W = new v(a, h.lexer, h),
                Dt = W.parseInfixIntermediateType(L, N.ALL);
              return (h.acceptLexerState(W), M(Dt));
            },
          });
        }
        let Bn = [
            Ft({allowedAdditionalTokens: ['external', 'module']}),
            qt,
            pe,
            Ve({allowSquareBracketsOnAnyType: !1, allowJsdocNamePaths: !0, pathGrammar: null}),
          ],
          zr = [...Bn, lr({allowedTypes: ['event'], pathGrammar: Bn})];
        function Jn(a) {
          let c;
          if (a.type === 'JsdocTypeParameterList') c = a.elements;
          else if (a.type === 'JsdocTypeParenthesis') c = [a.element];
          else throw new u(a);
          return c.map((h) => se(h));
        }
        function ys(a) {
          let c = Jn(a);
          if (c.some((h) => h.type === 'JsdocTypeKeyValue')) throw new Error('No parameter should be named');
          return c;
        }
        function jt({
          allowNamedParameters: a,
          allowNoReturnType: c,
          allowWithoutParenthesis: h,
          allowNewAsFunctionKeyword: b,
        }) {
          return F({
            name: 'functionParslet',
            accept: (L, U) => L === 'function' || (b && L === 'new' && U === '('),
            parsePrefix: (L) => {
              let U = L.consume('new');
              L.consume('function');
              let W = L.lexer.current.type === '(';
              if (!W) {
                if (!h) throw new Error('function is missing parameter list');
                return {type: 'JsdocTypeName', value: 'function'};
              }
              let Dt = {type: 'JsdocTypeFunction', parameters: [], arrow: !1, constructor: U, parenthesis: W},
                Nt = L.parseIntermediateType(N.FUNCTION);
              if (a === void 0) Dt.parameters = ys(Nt);
              else {
                if (U && Nt.type === 'JsdocTypeFunction' && Nt.arrow) return ((Dt = Nt), (Dt.constructor = !0), Dt);
                Dt.parameters = Jn(Nt);
                for (let Lt of Dt.parameters)
                  if (Lt.type === 'JsdocTypeKeyValue' && !a.includes(Lt.key))
                    throw new Error(`only allowed named parameters are ${a.join(', ')} but got ${Lt.type}`);
              }
              if (L.consume(':')) Dt.returnType = L.parseType(N.PREFIX);
              else if (!c) throw new Error('function is missing return type');
              return Dt;
            },
          });
        }
        function Ut({allowPostfix: a, allowEnclosingBrackets: c}) {
          return F({
            name: 'variadicParslet',
            accept: (h) => h === '...',
            precedence: N.PREFIX,
            parsePrefix: (h) => {
              h.consume('...');
              let b = c && h.consume('[');
              try {
                let L = h.parseType(N.PREFIX);
                if (b && !h.consume(']')) throw new Error("Unterminated variadic type. Missing ']'");
                return {type: 'JsdocTypeVariadic', element: M(L), meta: {position: 'prefix', squareBrackets: b}};
              } catch (L) {
                if (L instanceof s) {
                  if (b) throw new Error('Empty square brackets for variadic are not allowed.');
                  return {type: 'JsdocTypeVariadic', meta: {position: void 0, squareBrackets: !1}};
                } else throw L;
              }
            },
            parseInfix: a
              ? (h, b) => (
                  h.consume('...'),
                  {type: 'JsdocTypeVariadic', element: M(b), meta: {position: 'suffix', squareBrackets: !1}}
                )
              : void 0,
          });
        }
        let Zr = F({
            name: 'symbolParslet',
            accept: (a) => a === '(',
            precedence: N.SYMBOL,
            parseInfix: (a, c) => {
              if (c.type !== 'JsdocTypeName')
                throw new Error("Symbol expects a name on the left side. (Reacting on '(')");
              a.consume('(');
              let h = {type: 'JsdocTypeSymbol', value: c.value};
              if (!a.consume(')')) {
                let b = a.parseIntermediateType(N.SYMBOL);
                if (((h.element = ce(b)), !a.consume(')'))) throw new Error('Symbol does not end after value');
              }
              return h;
            },
          }),
          Gn = F({
            name: 'arrayBracketsParslet',
            precedence: N.ARRAY_BRACKETS,
            accept: (a, c) => a === '[' && c === ']',
            parseInfix: (a, c) => (
              a.consume('['),
              a.consume(']'),
              {
                type: 'JsdocTypeGeneric',
                left: {type: 'JsdocTypeName', value: 'Array'},
                elements: [M(c)],
                meta: {brackets: 'square', dot: !1},
              }
            ),
          });
        function Hn({objectFieldGrammar: a, allowKeyTypes: c}) {
          return F({
            name: 'objectParslet',
            accept: (h) => h === '{',
            parsePrefix: (h) => {
              h.consume('{');
              let b = {type: 'JsdocTypeObject', meta: {separator: 'comma'}, elements: []};
              if (!h.consume('}')) {
                let L,
                  U = new v(a, h.lexer, h);
                for (;;) {
                  U.acceptLexerState(h);
                  let W = U.parseIntermediateType(N.OBJECT);
                  (h.acceptLexerState(U), W === void 0 && c && (W = h.parseIntermediateType(N.OBJECT)));
                  let Dt = !1;
                  if (
                    (W.type === 'JsdocTypeNullable' && ((Dt = !0), (W = W.element)),
                    W.type === 'JsdocTypeNumber' || W.type === 'JsdocTypeName' || W.type === 'JsdocTypeStringValue')
                  ) {
                    let Nt;
                    (W.type === 'JsdocTypeStringValue' && (Nt = W.meta.quote),
                      b.elements.push({
                        type: 'JsdocTypeObjectField',
                        key: W.value.toString(),
                        right: void 0,
                        optional: Dt,
                        readonly: !1,
                        meta: {quote: Nt},
                      }));
                  } else if (W.type === 'JsdocTypeObjectField' || W.type === 'JsdocTypeJsdocObjectField')
                    b.elements.push(W);
                  else throw new u(W);
                  if (h.lexer.current.startOfLine) ((L = 'linebreak'), h.consume(',') || h.consume(';'));
                  else if (h.consume(',')) L = 'comma';
                  else if (h.consume(';')) L = 'semicolon';
                  else break;
                  if (h.lexer.current.type === '}') break;
                }
                if (
                  ((b.meta.separator = L ?? 'comma'),
                  L === 'linebreak' && (b.meta.propertyIndent = '  '),
                  !h.consume('}'))
                )
                  throw new Error("Unterminated record type. Missing '}'");
              }
              return b;
            },
          });
        }
        function zn({allowSquaredProperties: a, allowKeyTypes: c, allowReadonly: h, allowOptional: b}) {
          return F({
            name: 'objectFieldParslet',
            precedence: N.KEY_VALUE,
            accept: (L) => L === ':',
            parseInfix: (L, U) => {
              var W;
              let Dt = !1,
                Nt = !1;
              (b && U.type === 'JsdocTypeNullable' && ((Dt = !0), (U = U.element)),
                h && U.type === 'JsdocTypeReadonlyProperty' && ((Nt = !0), (U = U.element)));
              let Lt = (W = L.baseParser) !== null && W !== void 0 ? W : L;
              if (
                (Lt.acceptLexerState(L),
                U.type === 'JsdocTypeNumber' || U.type === 'JsdocTypeName' || U.type === 'JsdocTypeStringValue' || B(U))
              ) {
                if (B(U) && !a) throw new u(U);
                Lt.consume(':');
                let Kr;
                U.type === 'JsdocTypeStringValue' && (Kr = U.meta.quote);
                let Gt = Lt.parseType(N.KEY_VALUE);
                return (
                  L.acceptLexerState(Lt),
                  {
                    type: 'JsdocTypeObjectField',
                    key: B(U) ? U : U.value.toString(),
                    right: Gt,
                    optional: Dt,
                    readonly: Nt,
                    meta: {quote: Kr},
                  }
                );
              } else {
                if (!c) throw new u(U);
                Lt.consume(':');
                let Kr = Lt.parseType(N.KEY_VALUE);
                return (L.acceptLexerState(Lt), {type: 'JsdocTypeJsdocObjectField', left: M(U), right: Kr});
              }
            },
          });
        }
        function ea({allowOptional: a, allowVariadic: c}) {
          return F({
            name: 'keyValueParslet',
            precedence: N.KEY_VALUE,
            accept: (h) => h === ':',
            parseInfix: (h, b) => {
              let L = !1,
                U = !1;
              if (
                (a && b.type === 'JsdocTypeNullable' && ((L = !0), (b = b.element)),
                c && b.type === 'JsdocTypeVariadic' && b.element !== void 0 && ((U = !0), (b = b.element)),
                b.type !== 'JsdocTypeName')
              )
                throw new u(b);
              h.consume(':');
              let W = h.parseType(N.KEY_VALUE);
              return {type: 'JsdocTypeKeyValue', key: b.value, right: W, optional: L, variadic: U};
            },
          });
        }
        let oa = [
            ...Vt,
            jt({
              allowWithoutParenthesis: !0,
              allowNamedParameters: ['this', 'new'],
              allowNoReturnType: !0,
              allowNewAsFunctionKeyword: !1,
            }),
            qt,
            lr({allowedTypes: ['module', 'external', 'event'], pathGrammar: zr}),
            Ut({allowEnclosingBrackets: !0, allowPostfix: !0}),
            Ft({allowedAdditionalTokens: ['keyof']}),
            Zr,
            Gn,
            Ve({allowSquareBracketsOnAnyType: !1, allowJsdocNamePaths: !0, pathGrammar: zr}),
          ],
          wa = [
            ...oa,
            Hn({
              objectFieldGrammar: [
                Ft({allowedAdditionalTokens: ['typeof', 'module', 'in']}),
                zn({allowSquaredProperties: !1, allowKeyTypes: !0, allowOptional: !1, allowReadonly: !1}),
                ...oa,
              ],
              allowKeyTypes: !0,
            }),
            ea({allowOptional: !0, allowVariadic: !0}),
          ],
          sa = F({
            name: 'typeOfParslet',
            accept: (a) => a === 'typeof',
            parsePrefix: (a) => (
              a.consume('typeof'),
              {type: 'JsdocTypeTypeof', element: a.parseType(N.KEY_OF_TYPE_OF)}
            ),
          }),
          Ra = [
            Ft({allowedAdditionalTokens: ['typeof', 'module', 'keyof', 'event', 'external', 'in']}),
            P,
            H,
            qt,
            pe,
            zn({allowSquaredProperties: !1, allowKeyTypes: !1, allowOptional: !1, allowReadonly: !1}),
          ],
          Ca = [
            ...Vt,
            Hn({allowKeyTypes: !1, objectFieldGrammar: Ra}),
            Ft({allowedAdditionalTokens: ['event', 'external', 'in']}),
            sa,
            jt({
              allowWithoutParenthesis: !1,
              allowNamedParameters: ['this', 'new'],
              allowNoReturnType: !0,
              allowNewAsFunctionKeyword: !1,
            }),
            Ut({allowEnclosingBrackets: !1, allowPostfix: !1}),
            Ft({allowedAdditionalTokens: ['keyof']}),
            lr({allowedTypes: ['module'], pathGrammar: zr}),
            Ve({allowSquareBracketsOnAnyType: !1, allowJsdocNamePaths: !0, pathGrammar: zr}),
            ea({allowOptional: !1, allowVariadic: !1}),
            Zr,
          ],
          Oa = F({
            name: 'assertsParslet',
            accept: (a) => a === 'asserts',
            parsePrefix: (a) => {
              a.consume('asserts');
              let c = a.parseIntermediateType(N.SYMBOL);
              if (c.type !== 'JsdocTypeName')
                throw new u(c, 'A typescript asserts always has to have a name on the left side.');
              return a.consume('is')
                ? {type: 'JsdocTypeAsserts', left: c, right: M(a.parseIntermediateType(N.INFIX))}
                : {type: 'JsdocTypeAssertsPlain', element: c};
            },
          });
        function Ia({allowQuestionMark: a}) {
          return F({
            name: 'tupleParslet',
            accept: (c) => c === '[',
            parsePrefix: (c) => {
              c.consume('[');
              let h = {type: 'JsdocTypeTuple', elements: []};
              if (c.consume(']')) return h;
              let b = c.parseIntermediateType(N.ALL);
              if (
                (b.type === 'JsdocTypeParameterList'
                  ? b.elements[0].type === 'JsdocTypeKeyValue'
                    ? (h.elements = b.elements.map(le))
                    : (h.elements = b.elements.map(M))
                  : b.type === 'JsdocTypeKeyValue'
                    ? (h.elements = [le(b)])
                    : (h.elements = [M(b)]),
                !c.consume(']'))
              )
                throw new Error("Unterminated '['");
              if (h.elements.some((L) => L.type === 'JsdocTypeUnknown'))
                throw new Error('Question mark in tuple not allowed');
              return h;
            },
          });
        }
        let Pa = F({
            name: 'keyOfParslet',
            accept: (a) => a === 'keyof',
            parsePrefix: (a) => (
              a.consume('keyof'),
              {type: 'JsdocTypeKeyof', element: M(a.parseType(N.KEY_OF_TYPE_OF))}
            ),
          }),
          xa = F({
            name: 'importParslet',
            accept: (a) => a === 'import',
            parsePrefix: (a) => {
              if ((a.consume('import'), !a.consume('('))) throw new Error('Missing parenthesis after import keyword');
              let c = a.parseType(N.PREFIX);
              if (c.type !== 'JsdocTypeStringValue')
                throw new Error('Only string values are allowed as paths for imports');
              if (!a.consume(')')) throw new Error('Missing closing parenthesis after import keyword');
              return {type: 'JsdocTypeImport', element: c};
            },
          }),
          Na = F({
            name: 'readonlyPropertyParslet',
            accept: (a) => a === 'readonly',
            parsePrefix: (a) => (
              a.consume('readonly'),
              {type: 'JsdocTypeReadonlyProperty', element: a.parseIntermediateType(N.KEY_VALUE)}
            ),
          }),
          Fa = F({
            name: 'arrowFunctionParslet',
            precedence: N.ARROW,
            accept: (a) => a === '=>',
            parseInfix: (a, c) => (
              a.consume('=>'),
              {
                type: 'JsdocTypeFunction',
                parameters: Jn(c).map(ne),
                arrow: !0,
                constructor: !1,
                parenthesis: !0,
                returnType: a.parseType(N.OBJECT),
              }
            ),
          }),
          La = F({
            name: 'genericArrowFunctionParslet',
            accept: (a) => a === '<',
            parsePrefix: (a) => {
              let c = [];
              a.consume('<');
              do {
                let b,
                  L = a.parseIntermediateType(N.SYMBOL);
                if (
                  (L.type === 'JsdocTypeOptional' && ((L = L.element), (b = a.parseType(N.SYMBOL))),
                  L.type !== 'JsdocTypeName')
                )
                  throw new u(L);
                let U;
                a.consume('extends') &&
                  ((U = a.parseType(N.SYMBOL)),
                  U.type === 'JsdocTypeOptional' && ((U = U.element), (b = a.parseType(N.SYMBOL))));
                let W = {type: 'JsdocTypeTypeParameter', name: L};
                if (
                  (U !== void 0 && (W.constraint = U), b !== void 0 && (W.defaultValue = b), c.push(W), a.consume('>'))
                )
                  break;
              } while (a.consume(','));
              let h = a.parseIntermediateType(N.SYMBOL);
              return ((h.typeParameters = c), h);
            },
          }),
          ka = F({
            name: 'intersectionParslet',
            accept: (a) => a === '&',
            precedence: N.INTERSECTION,
            parseInfix: (a, c) => {
              a.consume('&');
              let h = [];
              do h.push(a.parseType(N.INTERSECTION));
              while (a.consume('&'));
              return {type: 'JsdocTypeIntersection', elements: [M(c), ...h]};
            },
          }),
          Ma = F({
            name: 'predicateParslet',
            precedence: N.INFIX,
            accept: (a) => a === 'is',
            parseInfix: (a, c) => {
              if (c.type !== 'JsdocTypeName')
                throw new u(c, 'A typescript predicate always has to have a name on the left side.');
              return (
                a.consume('is'),
                {type: 'JsdocTypePredicate', left: c, right: M(a.parseIntermediateType(N.INFIX))}
              );
            },
          }),
          Ba = F({
            name: 'objectSquareBracketPropertyParslet',
            accept: (a) => a === '[',
            parsePrefix: (a) => {
              if (a.baseParser === void 0) throw new Error('Only allowed inside object grammar');
              a.consume('[');
              let c = a.lexer.current.text;
              a.consume('Identifier');
              let h;
              if (a.consume(':')) {
                let b = a.baseParser;
                (b.acceptLexerState(a),
                  (h = {type: 'JsdocTypeIndexSignature', key: c, right: b.parseType(N.INDEX_BRACKETS)}),
                  a.acceptLexerState(b));
              } else if (a.consume('in')) {
                let b = a.baseParser;
                (b.acceptLexerState(a),
                  (h = {type: 'JsdocTypeMappedType', key: c, right: b.parseType(N.ARRAY_BRACKETS)}),
                  a.acceptLexerState(b));
              } else throw new Error("Missing ':' or 'in' inside square bracketed property.");
              if (!a.consume(']')) throw new Error('Unterminated square brackets');
              return h;
            },
          }),
          ja = F({
            name: 'readonlyArrayParslet',
            accept: (a) => a === 'readonly',
            parsePrefix: (a) => (
              a.consume('readonly'),
              {type: 'JsdocTypeReadonlyArray', element: de(a.parseIntermediateType(N.ALL))}
            ),
          }),
          Ua = F({
            name: 'conditionalParslet',
            precedence: N.INFIX,
            accept: (a) => a === 'extends',
            parseInfix: (a, c) => {
              a.consume('extends');
              let h = a.parseType(N.KEY_OF_TYPE_OF).element,
                b = a.parseType(N.INFIX);
              return (
                a.consume(':'),
                {
                  type: 'JsdocTypeConditional',
                  checksType: M(c),
                  extendsType: h,
                  trueType: b,
                  falseType: a.parseType(N.INFIX),
                }
              );
            },
          }),
          Va = [
            Na,
            Ft({allowedAdditionalTokens: ['typeof', 'module', 'keyof', 'event', 'external', 'in']}),
            P,
            H,
            qt,
            pe,
            zn({allowSquaredProperties: !0, allowKeyTypes: !1, allowOptional: !0, allowReadonly: !0}),
            Ba,
          ],
          qa = [
            ...Vt,
            Hn({allowKeyTypes: !1, objectFieldGrammar: Va}),
            ja,
            sa,
            Pa,
            xa,
            qt,
            jt({
              allowWithoutParenthesis: !0,
              allowNoReturnType: !1,
              allowNamedParameters: ['this', 'new', 'args'],
              allowNewAsFunctionKeyword: !0,
            }),
            Ia({allowQuestionMark: !1}),
            Ut({allowEnclosingBrackets: !1, allowPostfix: !1}),
            Oa,
            Ua,
            Ft({allowedAdditionalTokens: ['event', 'external', 'in']}),
            lr({allowedTypes: ['module'], pathGrammar: zr}),
            Gn,
            Fa,
            La,
            Ve({allowSquareBracketsOnAnyType: !0, allowJsdocNamePaths: !1, pathGrammar: zr}),
            ka,
            Ma,
            ea({allowVariadic: !0, allowOptional: !0}),
          ];
        function aa(a, c) {
          switch (c) {
            case 'closure':
              return new v(Ca, a).parse();
            case 'jsdoc':
              return new v(wa, a).parse();
            case 'typescript':
              return new v(qa, a).parse();
          }
        }
        function Ga(a, c = ['typescript', 'closure', 'jsdoc']) {
          let h;
          for (let b of c)
            try {
              return aa(a, b);
            } catch (L) {
              h = L;
            }
          throw h;
        }
        function Zn(a, c) {
          let h = a[c.type];
          if (h === void 0) throw new Error(`In this set of transform rules exists no rule for type ${c.type}.`);
          return h(c, (b) => Zn(a, b));
        }
        function Ge(a) {
          throw new Error('This transform is not available. Are you trying the correct parsing mode?');
        }
        function ia(a) {
          let c = {params: []};
          for (let h of a.parameters)
            h.type === 'JsdocTypeKeyValue'
              ? h.key === 'this'
                ? (c.this = h.right)
                : h.key === 'new'
                  ? (c.new = h.right)
                  : c.params.push(h)
              : c.params.push(h);
          return c;
        }
        function as(a, c, h) {
          return a === 'prefix' ? h + c : c + h;
        }
        function Xr(a, c) {
          switch (c) {
            case 'double':
              return `"${a}"`;
            case 'single':
              return `'${a}'`;
            case void 0:
              return a;
          }
        }
        function _a() {
          return {
            JsdocTypeParenthesis: (a, c) => `(${a.element !== void 0 ? c(a.element) : ''})`,
            JsdocTypeKeyof: (a, c) => `keyof ${c(a.element)}`,
            JsdocTypeFunction: (a, c) => {
              var h;
              if (a.arrow) {
                if (a.returnType === void 0) throw new Error('Arrow function needs a return type.');
                let b = `${a.typeParameters !== void 0 ? `<${(h = a.typeParameters.map(c).join(', ')) !== null && h !== void 0 ? h : ''}>` : ''}(${a.parameters.map(c).join(', ')}) => ${c(a.returnType)}`;
                return (a.constructor && (b = 'new ' + b), b);
              } else {
                let b = a.constructor ? 'new' : 'function';
                return (
                  a.parenthesis &&
                    ((b += `(${a.parameters.map(c).join(', ')})`),
                    a.returnType !== void 0 && (b += `: ${c(a.returnType)}`)),
                  b
                );
              }
            },
            JsdocTypeName: (a) => a.value,
            JsdocTypeTuple: (a, c) => `[${a.elements.map(c).join(', ')}]`,
            JsdocTypeVariadic: (a, c) =>
              a.meta.position === void 0 ? '...' : as(a.meta.position, c(a.element), '...'),
            JsdocTypeNamePath: (a, c) => {
              let h = c(a.left),
                b = c(a.right);
              switch (a.pathType) {
                case 'inner':
                  return `${h}~${b}`;
                case 'instance':
                  return `${h}#${b}`;
                case 'property':
                  return `${h}.${b}`;
                case 'property-brackets':
                  return `${h}[${b}]`;
              }
            },
            JsdocTypeStringValue: (a) => Xr(a.value, a.meta.quote),
            JsdocTypeAny: () => '*',
            JsdocTypeGeneric: (a, c) => {
              if (a.meta.brackets === 'square') {
                let h = a.elements[0],
                  b = c(h);
                return h.type === 'JsdocTypeUnion' || h.type === 'JsdocTypeIntersection' ? `(${b})[]` : `${b}[]`;
              } else
                return `${c(a.left)}${a.meta.dot ? '.' : ''}<${a.infer === !0 ? 'infer ' : ''}${a.elements.map(c).join(', ')}>`;
            },
            JsdocTypeImport: (a, c) => `import(${c(a.element)})`,
            JsdocTypeObjectField: (a, c) => {
              let h = '';
              return (
                a.readonly && (h += 'readonly '),
                typeof a.key == 'string' ? (h += Xr(a.key, a.meta.quote)) : (h += c(a.key)),
                a.optional && (h += '?'),
                a.right === void 0 ? h : h + `: ${c(a.right)}`
              );
            },
            JsdocTypeJsdocObjectField: (a, c) => `${c(a.left)}: ${c(a.right)}`,
            JsdocTypeKeyValue: (a, c) => {
              let h = a.key;
              return (
                a.optional && (h += '?'),
                a.variadic && (h = '...' + h),
                a.right === void 0 ? h : h + `: ${c(a.right)}`
              );
            },
            JsdocTypeSpecialNamePath: (a) => `${a.specialType}:${Xr(a.value, a.meta.quote)}`,
            JsdocTypeNotNullable: (a, c) => as(a.meta.position, c(a.element), '!'),
            JsdocTypeNull: () => 'null',
            JsdocTypeNullable: (a, c) => as(a.meta.position, c(a.element), '?'),
            JsdocTypeNumber: (a) => a.value.toString(),
            JsdocTypeObject: (a, c) => {
              var h, b;
              return `{${
                (a.meta.separator === 'linebreak' && a.elements.length > 1
                  ? `
` + ((h = a.meta.propertyIndent) !== null && h !== void 0 ? h : '')
                  : '') +
                a.elements.map(c).join(
                  a.meta.separator === 'comma'
                    ? ', '
                    : a.meta.separator === 'linebreak'
                      ? `
` + ((b = a.meta.propertyIndent) !== null && b !== void 0 ? b : '')
                      : '; ',
                ) +
                (a.meta.separator === 'linebreak' && a.elements.length > 1
                  ? `
`
                  : '')
              }}`;
            },
            JsdocTypeOptional: (a, c) => as(a.meta.position, c(a.element), '='),
            JsdocTypeSymbol: (a, c) => `${a.value}(${a.element !== void 0 ? c(a.element) : ''})`,
            JsdocTypeTypeof: (a, c) => `typeof ${c(a.element)}`,
            JsdocTypeUndefined: () => 'undefined',
            JsdocTypeUnion: (a, c) => a.elements.map(c).join(' | '),
            JsdocTypeUnknown: () => '?',
            JsdocTypeIntersection: (a, c) => a.elements.map(c).join(' & '),
            JsdocTypeProperty: (a) => Xr(a.value, a.meta.quote),
            JsdocTypePredicate: (a, c) => `${c(a.left)} is ${c(a.right)}`,
            JsdocTypeIndexSignature: (a, c) => `[${a.key}: ${c(a.right)}]`,
            JsdocTypeMappedType: (a, c) => `[${a.key} in ${c(a.right)}]`,
            JsdocTypeAsserts: (a, c) => `asserts ${c(a.left)} is ${c(a.right)}`,
            JsdocTypeReadonlyArray: (a, c) => `readonly ${c(a.element)}`,
            JsdocTypeAssertsPlain: (a, c) => `asserts ${c(a.element)}`,
            JsdocTypeConditional: (a, c) =>
              `${c(a.checksType)} extends ${c(a.extendsType)} ? ${c(a.trueType)} : ${c(a.falseType)}`,
            JsdocTypeTypeParameter: (a, c) =>
              `${c(a.name)}${a.constraint !== void 0 ? ` extends ${c(a.constraint)}` : ''}${a.defaultValue !== void 0 ? ` = ${c(a.defaultValue)}` : ''}`,
          };
        }
        let Zi = _a();
        function hu(a) {
          return Zn(Zi, a);
        }
        let yu = [
          'null',
          'true',
          'false',
          'break',
          'case',
          'catch',
          'class',
          'const',
          'continue',
          'debugger',
          'default',
          'delete',
          'do',
          'else',
          'export',
          'extends',
          'finally',
          'for',
          'function',
          'if',
          'import',
          'in',
          'instanceof',
          'new',
          'return',
          'super',
          'switch',
          'this',
          'throw',
          'try',
          'typeof',
          'var',
          'void',
          'while',
          'with',
          'yield',
        ];
        function Qr(a) {
          let c = {type: 'NameExpression', name: a};
          return (yu.includes(a) && (c.reservedWord = !0), c);
        }
        let mu = {
          JsdocTypeOptional: (a, c) => {
            let h = c(a.element);
            return ((h.optional = !0), h);
          },
          JsdocTypeNullable: (a, c) => {
            let h = c(a.element);
            return ((h.nullable = !0), h);
          },
          JsdocTypeNotNullable: (a, c) => {
            let h = c(a.element);
            return ((h.nullable = !1), h);
          },
          JsdocTypeVariadic: (a, c) => {
            if (a.element === void 0) throw new Error('dots without value are not allowed in catharsis mode');
            let h = c(a.element);
            return ((h.repeatable = !0), h);
          },
          JsdocTypeAny: () => ({type: 'AllLiteral'}),
          JsdocTypeNull: () => ({type: 'NullLiteral'}),
          JsdocTypeStringValue: (a) => Qr(Xr(a.value, a.meta.quote)),
          JsdocTypeUndefined: () => ({type: 'UndefinedLiteral'}),
          JsdocTypeUnknown: () => ({type: 'UnknownLiteral'}),
          JsdocTypeFunction: (a, c) => {
            let h = ia(a),
              b = {type: 'FunctionType', params: h.params.map(c)};
            return (
              h.this !== void 0 && (b.this = c(h.this)),
              h.new !== void 0 && (b.new = c(h.new)),
              a.returnType !== void 0 && (b.result = c(a.returnType)),
              b
            );
          },
          JsdocTypeGeneric: (a, c) => ({
            type: 'TypeApplication',
            applications: a.elements.map((h) => c(h)),
            expression: c(a.left),
          }),
          JsdocTypeSpecialNamePath: (a) => Qr(a.specialType + ':' + Xr(a.value, a.meta.quote)),
          JsdocTypeName: (a) => (a.value !== 'function' ? Qr(a.value) : {type: 'FunctionType', params: []}),
          JsdocTypeNumber: (a) => Qr(a.value.toString()),
          JsdocTypeObject: (a, c) => {
            let h = {type: 'RecordType', fields: []};
            for (let b of a.elements)
              b.type !== 'JsdocTypeObjectField' && b.type !== 'JsdocTypeJsdocObjectField'
                ? h.fields.push({type: 'FieldType', key: c(b), value: void 0})
                : h.fields.push(c(b));
            return h;
          },
          JsdocTypeObjectField: (a, c) => {
            if (typeof a.key != 'string') throw new Error('Index signatures and mapped types are not supported');
            return {
              type: 'FieldType',
              key: Qr(Xr(a.key, a.meta.quote)),
              value: a.right === void 0 ? void 0 : c(a.right),
            };
          },
          JsdocTypeJsdocObjectField: (a, c) => ({type: 'FieldType', key: c(a.left), value: c(a.right)}),
          JsdocTypeUnion: (a, c) => ({type: 'TypeUnion', elements: a.elements.map((h) => c(h))}),
          JsdocTypeKeyValue: (a, c) => ({
            type: 'FieldType',
            key: Qr(a.key),
            value: a.right === void 0 ? void 0 : c(a.right),
          }),
          JsdocTypeNamePath: (a, c) => {
            let h = c(a.left),
              b;
            a.right.type === 'JsdocTypeSpecialNamePath'
              ? (b = c(a.right).name)
              : (b = Xr(a.right.value, a.right.meta.quote));
            let L = a.pathType === 'inner' ? '~' : a.pathType === 'instance' ? '#' : '.';
            return Qr(`${h.name}${L}${b}`);
          },
          JsdocTypeSymbol: (a) => {
            let c = '',
              h = a.element,
              b = !1;
            return (
              h?.type === 'JsdocTypeVariadic' &&
                (h.meta.position === 'prefix' ? (c = '...') : (b = !0), (h = h.element)),
              h?.type === 'JsdocTypeName' ? (c += h.value) : h?.type === 'JsdocTypeNumber' && (c += h.value.toString()),
              b && (c += '...'),
              Qr(`${a.value}(${c})`)
            );
          },
          JsdocTypeParenthesis: (a, c) => c(M(a.element)),
          JsdocTypeMappedType: Ge,
          JsdocTypeIndexSignature: Ge,
          JsdocTypeImport: Ge,
          JsdocTypeKeyof: Ge,
          JsdocTypeTuple: Ge,
          JsdocTypeTypeof: Ge,
          JsdocTypeIntersection: Ge,
          JsdocTypeProperty: Ge,
          JsdocTypePredicate: Ge,
          JsdocTypeAsserts: Ge,
          JsdocTypeReadonlyArray: Ge,
          JsdocTypeAssertsPlain: Ge,
          JsdocTypeConditional: Ge,
          JsdocTypeTypeParameter: Ge,
        };
        function gu(a) {
          return Zn(mu, a);
        }
        function Tn(a) {
          switch (a) {
            case void 0:
              return 'none';
            case 'single':
              return 'single';
            case 'double':
              return 'double';
          }
        }
        function _u(a) {
          switch (a) {
            case 'inner':
              return 'INNER_MEMBER';
            case 'instance':
              return 'INSTANCE_MEMBER';
            case 'property':
              return 'MEMBER';
            case 'property-brackets':
              return 'MEMBER';
          }
        }
        function ta(a, c) {
          return c.length === 2 ? {type: a, left: c[0], right: c[1]} : {type: a, left: c[0], right: ta(a, c.slice(1))};
        }
        let Eu = {
          JsdocTypeOptional: (a, c) => ({
            type: 'OPTIONAL',
            value: c(a.element),
            meta: {syntax: a.meta.position === 'prefix' ? 'PREFIX_EQUAL_SIGN' : 'SUFFIX_EQUALS_SIGN'},
          }),
          JsdocTypeNullable: (a, c) => ({
            type: 'NULLABLE',
            value: c(a.element),
            meta: {syntax: a.meta.position === 'prefix' ? 'PREFIX_QUESTION_MARK' : 'SUFFIX_QUESTION_MARK'},
          }),
          JsdocTypeNotNullable: (a, c) => ({
            type: 'NOT_NULLABLE',
            value: c(a.element),
            meta: {syntax: a.meta.position === 'prefix' ? 'PREFIX_BANG' : 'SUFFIX_BANG'},
          }),
          JsdocTypeVariadic: (a, c) => {
            let h = {
              type: 'VARIADIC',
              meta: {
                syntax:
                  a.meta.position === 'prefix'
                    ? 'PREFIX_DOTS'
                    : a.meta.position === 'suffix'
                      ? 'SUFFIX_DOTS'
                      : 'ONLY_DOTS',
              },
            };
            return (a.element !== void 0 && (h.value = c(a.element)), h);
          },
          JsdocTypeName: (a) => ({type: 'NAME', name: a.value}),
          JsdocTypeTypeof: (a, c) => ({type: 'TYPE_QUERY', name: c(a.element)}),
          JsdocTypeTuple: (a, c) => ({type: 'TUPLE', entries: a.elements.map(c)}),
          JsdocTypeKeyof: (a, c) => ({type: 'KEY_QUERY', value: c(a.element)}),
          JsdocTypeImport: (a) => ({
            type: 'IMPORT',
            path: {type: 'STRING_VALUE', quoteStyle: Tn(a.element.meta.quote), string: a.element.value},
          }),
          JsdocTypeUndefined: () => ({type: 'NAME', name: 'undefined'}),
          JsdocTypeAny: () => ({type: 'ANY'}),
          JsdocTypeFunction: (a, c) => {
            let h = ia(a),
              b = {
                type: a.arrow ? 'ARROW' : 'FUNCTION',
                params: h.params.map((L) => {
                  if (L.type === 'JsdocTypeKeyValue') {
                    if (L.right === void 0)
                      throw new Error("Function parameter without ':' is not expected to be 'KEY_VALUE'");
                    return {type: 'NAMED_PARAMETER', name: L.key, typeName: c(L.right)};
                  } else return c(L);
                }),
                new: null,
                returns: null,
              };
            return (
              h.this !== void 0 ? (b.this = c(h.this)) : a.arrow || (b.this = null),
              h.new !== void 0 && (b.new = c(h.new)),
              a.returnType !== void 0 && (b.returns = c(a.returnType)),
              b
            );
          },
          JsdocTypeGeneric: (a, c) => {
            let h = {
              type: 'GENERIC',
              subject: c(a.left),
              objects: a.elements.map(c),
              meta: {
                syntax:
                  a.meta.brackets === 'square'
                    ? 'SQUARE_BRACKET'
                    : a.meta.dot
                      ? 'ANGLE_BRACKET_WITH_DOT'
                      : 'ANGLE_BRACKET',
              },
            };
            return (
              a.meta.brackets === 'square' &&
                a.elements[0].type === 'JsdocTypeFunction' &&
                !a.elements[0].parenthesis &&
                (h.objects[0] = {type: 'NAME', name: 'function'}),
              h
            );
          },
          JsdocTypeObjectField: (a, c) => {
            if (typeof a.key != 'string') throw new Error('Index signatures and mapped types are not supported');
            if (a.right === void 0)
              return {type: 'RECORD_ENTRY', key: a.key, quoteStyle: Tn(a.meta.quote), value: null, readonly: !1};
            let h = c(a.right);
            return (
              a.optional && (h = {type: 'OPTIONAL', value: h, meta: {syntax: 'SUFFIX_KEY_QUESTION_MARK'}}),
              {type: 'RECORD_ENTRY', key: a.key.toString(), quoteStyle: Tn(a.meta.quote), value: h, readonly: !1}
            );
          },
          JsdocTypeJsdocObjectField: () => {
            throw new Error('Keys may not be typed in jsdoctypeparser.');
          },
          JsdocTypeKeyValue: (a, c) => {
            if (a.right === void 0)
              return {type: 'RECORD_ENTRY', key: a.key, quoteStyle: 'none', value: null, readonly: !1};
            let h = c(a.right);
            return (
              a.optional && (h = {type: 'OPTIONAL', value: h, meta: {syntax: 'SUFFIX_KEY_QUESTION_MARK'}}),
              {type: 'RECORD_ENTRY', key: a.key, quoteStyle: 'none', value: h, readonly: !1}
            );
          },
          JsdocTypeObject: (a, c) => {
            let h = [];
            for (let b of a.elements)
              (b.type === 'JsdocTypeObjectField' || b.type === 'JsdocTypeJsdocObjectField') && h.push(c(b));
            return {type: 'RECORD', entries: h};
          },
          JsdocTypeSpecialNamePath: (a) => {
            if (a.specialType !== 'module')
              throw new Error(`jsdoctypeparser does not support type ${a.specialType} at this point.`);
            return {type: 'MODULE', value: {type: 'FILE_PATH', quoteStyle: Tn(a.meta.quote), path: a.value}};
          },
          JsdocTypeNamePath: (a, c) => {
            let h = !1,
              b,
              L;
            a.right.type === 'JsdocTypeSpecialNamePath' && a.right.specialType === 'event'
              ? ((h = !0), (b = a.right.value), (L = Tn(a.right.meta.quote)))
              : ((b = a.right.value), (L = Tn(a.right.meta.quote)));
            let U = {type: _u(a.pathType), owner: c(a.left), name: b, quoteStyle: L, hasEventPrefix: h};
            if (U.owner.type === 'MODULE') {
              let W = U.owner;
              return ((U.owner = U.owner.value), (W.value = U), W);
            } else return U;
          },
          JsdocTypeUnion: (a, c) => ta('UNION', a.elements.map(c)),
          JsdocTypeParenthesis: (a, c) => ({type: 'PARENTHESIS', value: c(M(a.element))}),
          JsdocTypeNull: () => ({type: 'NAME', name: 'null'}),
          JsdocTypeUnknown: () => ({type: 'UNKNOWN'}),
          JsdocTypeStringValue: (a) => ({type: 'STRING_VALUE', quoteStyle: Tn(a.meta.quote), string: a.value}),
          JsdocTypeIntersection: (a, c) => ta('INTERSECTION', a.elements.map(c)),
          JsdocTypeNumber: (a) => ({type: 'NUMBER_VALUE', number: a.value.toString()}),
          JsdocTypeSymbol: Ge,
          JsdocTypeProperty: Ge,
          JsdocTypePredicate: Ge,
          JsdocTypeMappedType: Ge,
          JsdocTypeIndexSignature: Ge,
          JsdocTypeAsserts: Ge,
          JsdocTypeReadonlyArray: Ge,
          JsdocTypeAssertsPlain: Ge,
          JsdocTypeConditional: Ge,
          JsdocTypeTypeParameter: Ge,
        };
        function vu(a) {
          return Zn(Eu, a);
        }
        function Tu() {
          return {
            JsdocTypeIntersection: (a, c) => ({type: 'JsdocTypeIntersection', elements: a.elements.map(c)}),
            JsdocTypeGeneric: (a, c) => ({
              type: 'JsdocTypeGeneric',
              left: c(a.left),
              elements: a.elements.map(c),
              meta: {dot: a.meta.dot, brackets: a.meta.brackets},
            }),
            JsdocTypeNullable: (a) => a,
            JsdocTypeUnion: (a, c) => ({type: 'JsdocTypeUnion', elements: a.elements.map(c)}),
            JsdocTypeUnknown: (a) => a,
            JsdocTypeUndefined: (a) => a,
            JsdocTypeTypeof: (a, c) => ({type: 'JsdocTypeTypeof', element: c(a.element)}),
            JsdocTypeSymbol: (a, c) => {
              let h = {type: 'JsdocTypeSymbol', value: a.value};
              return (a.element !== void 0 && (h.element = c(a.element)), h);
            },
            JsdocTypeOptional: (a, c) => ({
              type: 'JsdocTypeOptional',
              element: c(a.element),
              meta: {position: a.meta.position},
            }),
            JsdocTypeObject: (a, c) => ({
              type: 'JsdocTypeObject',
              meta: {separator: 'comma'},
              elements: a.elements.map(c),
            }),
            JsdocTypeNumber: (a) => a,
            JsdocTypeNull: (a) => a,
            JsdocTypeNotNullable: (a, c) => ({
              type: 'JsdocTypeNotNullable',
              element: c(a.element),
              meta: {position: a.meta.position},
            }),
            JsdocTypeSpecialNamePath: (a) => a,
            JsdocTypeObjectField: (a, c) => ({
              type: 'JsdocTypeObjectField',
              key: a.key,
              right: a.right === void 0 ? void 0 : c(a.right),
              optional: a.optional,
              readonly: a.readonly,
              meta: a.meta,
            }),
            JsdocTypeJsdocObjectField: (a, c) => ({
              type: 'JsdocTypeJsdocObjectField',
              left: c(a.left),
              right: c(a.right),
            }),
            JsdocTypeKeyValue: (a, c) => ({
              type: 'JsdocTypeKeyValue',
              key: a.key,
              right: a.right === void 0 ? void 0 : c(a.right),
              optional: a.optional,
              variadic: a.variadic,
            }),
            JsdocTypeImport: (a, c) => ({type: 'JsdocTypeImport', element: c(a.element)}),
            JsdocTypeAny: (a) => a,
            JsdocTypeStringValue: (a) => a,
            JsdocTypeNamePath: (a) => a,
            JsdocTypeVariadic: (a, c) => {
              let h = {
                type: 'JsdocTypeVariadic',
                meta: {position: a.meta.position, squareBrackets: a.meta.squareBrackets},
              };
              return (a.element !== void 0 && (h.element = c(a.element)), h);
            },
            JsdocTypeTuple: (a, c) => ({type: 'JsdocTypeTuple', elements: a.elements.map(c)}),
            JsdocTypeName: (a) => a,
            JsdocTypeFunction: (a, c) => {
              let h = {
                type: 'JsdocTypeFunction',
                arrow: a.arrow,
                parameters: a.parameters.map(c),
                constructor: a.constructor,
                parenthesis: a.parenthesis,
              };
              return (a.returnType !== void 0 && (h.returnType = c(a.returnType)), h);
            },
            JsdocTypeKeyof: (a, c) => ({type: 'JsdocTypeKeyof', element: c(a.element)}),
            JsdocTypeParenthesis: (a, c) => ({type: 'JsdocTypeParenthesis', element: c(a.element)}),
            JsdocTypeProperty: (a) => a,
            JsdocTypePredicate: (a, c) => ({type: 'JsdocTypePredicate', left: c(a.left), right: c(a.right)}),
            JsdocTypeIndexSignature: (a, c) => ({type: 'JsdocTypeIndexSignature', key: a.key, right: c(a.right)}),
            JsdocTypeMappedType: (a, c) => ({type: 'JsdocTypeMappedType', key: a.key, right: c(a.right)}),
            JsdocTypeAsserts: (a, c) => ({type: 'JsdocTypeAsserts', left: c(a.left), right: c(a.right)}),
            JsdocTypeReadonlyArray: (a, c) => ({type: 'JsdocTypeReadonlyArray', element: c(a.element)}),
            JsdocTypeAssertsPlain: (a, c) => ({type: 'JsdocTypeAssertsPlain', element: c(a.element)}),
            JsdocTypeConditional: (a, c) => ({
              type: 'JsdocTypeConditional',
              checksType: c(a.checksType),
              extendsType: c(a.extendsType),
              trueType: c(a.trueType),
              falseType: c(a.falseType),
            }),
            JsdocTypeTypeParameter: (a, c) => ({
              type: 'JsdocTypeTypeParameter',
              name: c(a.name),
              constraint: a.constraint !== void 0 ? c(a.constraint) : void 0,
              defaultValue: a.defaultValue !== void 0 ? c(a.defaultValue) : void 0,
            }),
          };
        }
        let Ea = {
          JsdocTypeAny: [],
          JsdocTypeFunction: ['parameters', 'returnType'],
          JsdocTypeGeneric: ['left', 'elements'],
          JsdocTypeImport: [],
          JsdocTypeIndexSignature: ['right'],
          JsdocTypeIntersection: ['elements'],
          JsdocTypeKeyof: ['element'],
          JsdocTypeKeyValue: ['right'],
          JsdocTypeMappedType: ['right'],
          JsdocTypeName: [],
          JsdocTypeNamePath: ['left', 'right'],
          JsdocTypeNotNullable: ['element'],
          JsdocTypeNull: [],
          JsdocTypeNullable: ['element'],
          JsdocTypeNumber: [],
          JsdocTypeObject: ['elements'],
          JsdocTypeObjectField: ['right'],
          JsdocTypeJsdocObjectField: ['left', 'right'],
          JsdocTypeOptional: ['element'],
          JsdocTypeParenthesis: ['element'],
          JsdocTypeSpecialNamePath: [],
          JsdocTypeStringValue: [],
          JsdocTypeSymbol: ['element'],
          JsdocTypeTuple: ['elements'],
          JsdocTypeTypeof: ['element'],
          JsdocTypeUndefined: [],
          JsdocTypeUnion: ['elements'],
          JsdocTypeUnknown: [],
          JsdocTypeVariadic: ['element'],
          JsdocTypeProperty: [],
          JsdocTypePredicate: ['left', 'right'],
          JsdocTypeAsserts: ['left', 'right'],
          JsdocTypeReadonlyArray: ['element'],
          JsdocTypeAssertsPlain: ['element'],
          JsdocTypeConditional: ['checksType', 'extendsType', 'trueType', 'falseType'],
          JsdocTypeTypeParameter: ['name', 'constraint', 'defaultValue'],
        };
        function ra(a, c, h, b, L) {
          b?.(a, c, h);
          let U = Ea[a.type];
          for (let W of U) {
            let Dt = a[W];
            if (Dt !== void 0)
              if (Array.isArray(Dt)) for (let Nt of Dt) ra(Nt, a, W, b, L);
              else ra(Dt, a, W, b, L);
          }
          L?.(a, c, h);
        }
        function bu(a, c, h) {
          ra(a, void 0, void 0, c, h);
        }
        ((r.catharsisTransform = gu),
          (r.identityTransformRules = Tu),
          (r.jtpTransform = vu),
          (r.parse = aa),
          (r.stringify = hu),
          (r.stringifyRules = _a),
          (r.transform = Zn),
          (r.traverse = bu),
          (r.tryParse = Ga),
          (r.visitorKeys = Ea));
      });
    },
  });
const {UnknownArgTypesError} = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,
  {UnknownArgTypesError: UnknownArgTypesError2} = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
var Markers;
(function (e) {
  ((e.start = '/**'), (e.nostart = '/***'), (e.delim = '*'), (e.end = '*/'));
})((Markers = Markers || (Markers = {})));
var import_jsdoc_type_pratt_parser = __toESM$1(require_dist(), 1),
  jsdocStringifyRules = (0, import_jsdoc_type_pratt_parser.stringifyRules)(),
  originalJsdocStringifyObject = jsdocStringifyRules.JsdocTypeObject;
jsdocStringifyRules.JsdocTypeAny = () => 'any';
jsdocStringifyRules.JsdocTypeObject = (e, t) => `(${originalJsdocStringifyObject(e, t)})`;
jsdocStringifyRules.JsdocTypeOptional = (e, t) => t(e.element);
jsdocStringifyRules.JsdocTypeNullable = (e, t) => t(e.element);
jsdocStringifyRules.JsdocTypeNotNullable = (e, t) => t(e.element);
jsdocStringifyRules.JsdocTypeUnion = (e, t) => e.elements.map(t).join('|');
var combineParameters = (...e) => {
    let t = {},
      r = e.filter(Boolean),
      o = r.reduce(
        (s, i) => (
          Object.entries(i).forEach(([u, l]) => {
            let p = s[u];
            Array.isArray(l) || typeof p > 'u'
              ? (s[u] = l)
              : isPlainObject(l) && isPlainObject(p)
                ? (t[u] = !0)
                : typeof l < 'u' && (s[u] = l);
          }),
          s
        ),
        {},
      );
    return (
      Object.keys(t).forEach((s) => {
        let i = r
          .filter(Boolean)
          .map((u) => u[s])
          .filter((u) => typeof u < 'u');
        i.every((u) => isPlainObject(u)) ? (o[s] = combineParameters(...i)) : (o[s] = i[i.length - 1]);
      }),
      o
    );
  },
  enhanceArgTypes = (e) => {
    let {
        component: t,
        argTypes: r,
        parameters: {docs: o = {}},
      } = e,
      {extractArgTypes: s} = o;
    if (!s || !t) return r;
    let i = s(t);
    return i ? combineParameters(i, r) : r;
  },
  ADDON_ID$1 = 'storybook/docs',
  SNIPPET_RENDERED = `${ADDON_ID$1}/snippet-rendered`,
  SourceType = ((e) => ((e.AUTO = 'auto'), (e.CODE = 'code'), (e.DYNAMIC = 'dynamic'), e))(SourceType || {});
const PUBLIC_VERSION = '5';
typeof window < 'u' && ((window.__svelte ??= {}).v ??= new Set()).add(PUBLIC_VERSION);
const EACH_ITEM_REACTIVE = 1,
  EACH_INDEX_REACTIVE = 2,
  EACH_IS_CONTROLLED = 4,
  EACH_IS_ANIMATED = 8,
  EACH_ITEM_IMMUTABLE = 16,
  PROPS_IS_IMMUTABLE = 1,
  PROPS_IS_RUNES = 2,
  PROPS_IS_UPDATED = 4,
  PROPS_IS_BINDABLE = 8,
  PROPS_IS_LAZY_INITIAL = 16,
  TRANSITION_IN = 1,
  TRANSITION_OUT = 2,
  TRANSITION_GLOBAL = 4,
  TEMPLATE_FRAGMENT = 1,
  TEMPLATE_USE_IMPORT_NODE = 2,
  UNINITIALIZED = Symbol(),
  NAMESPACE_HTML = 'http://www.w3.org/1999/xhtml',
  NAMESPACE_SVG = 'http://www.w3.org/2000/svg',
  ATTACHMENT_KEY = '@attach',
  DEV = !1;
var is_array = Array.isArray,
  index_of = Array.prototype.indexOf,
  includes = Array.prototype.includes,
  array_from = Array.from,
  define_property = Object.defineProperty,
  get_descriptor = Object.getOwnPropertyDescriptor,
  get_descriptors = Object.getOwnPropertyDescriptors,
  object_prototype = Object.prototype,
  array_prototype = Array.prototype,
  get_prototype_of = Object.getPrototypeOf,
  is_extensible = Object.isExtensible;
function is_function(e) {
  return typeof e == 'function';
}
const noop = () => {};
function run(e) {
  return e();
}
function run_all(e) {
  for (var t = 0; t < e.length; t++) e[t]();
}
function deferred() {
  var e,
    t,
    r = new Promise((o, s) => {
      ((e = o), (t = s));
    });
  return {promise: r, resolve: e, reject: t};
}
function fallback(e, t, r = !1) {
  return e === void 0 ? (r ? t() : t) : e;
}
const DERIVED = 2,
  EFFECT = 4,
  RENDER_EFFECT = 8,
  MANAGED_EFFECT = 1 << 24,
  BLOCK_EFFECT = 16,
  BRANCH_EFFECT = 32,
  ROOT_EFFECT = 64,
  BOUNDARY_EFFECT = 128,
  CONNECTED = 512,
  CLEAN = 1024,
  DIRTY = 2048,
  MAYBE_DIRTY = 4096,
  INERT = 8192,
  DESTROYED = 16384,
  REACTION_RAN = 32768,
  EFFECT_TRANSPARENT = 65536,
  EAGER_EFFECT = 1 << 17,
  HEAD_EFFECT = 1 << 18,
  EFFECT_PRESERVED = 1 << 19,
  USER_EFFECT = 1 << 20,
  EFFECT_OFFSCREEN = 1 << 25,
  WAS_MARKED = 65536,
  REACTION_IS_UPDATING = 1 << 21,
  ASYNC = 1 << 22,
  ERROR_VALUE = 1 << 23,
  STATE_SYMBOL = Symbol('$state'),
  LEGACY_PROPS = Symbol('legacy props'),
  LOADING_ATTR_SYMBOL = Symbol(''),
  STALE_REACTION = new (class extends Error {
    name = 'StaleReactionError';
    message = 'The reaction that called `getAbortSignal()` was re-run or destroyed';
  })(),
  IS_XHTML = !!globalThis.document?.contentType && globalThis.document.contentType.includes('xml');
function lifecycle_outside_component(e) {
  throw new Error('https://svelte.dev/e/lifecycle_outside_component');
}
function missing_context() {
  throw new Error('https://svelte.dev/e/missing_context');
}
function async_derived_orphan() {
  throw new Error('https://svelte.dev/e/async_derived_orphan');
}
function each_key_duplicate(e, t, r) {
  throw new Error('https://svelte.dev/e/each_key_duplicate');
}
function effect_in_teardown(e) {
  throw new Error('https://svelte.dev/e/effect_in_teardown');
}
function effect_in_unowned_derived() {
  throw new Error('https://svelte.dev/e/effect_in_unowned_derived');
}
function effect_orphan(e) {
  throw new Error('https://svelte.dev/e/effect_orphan');
}
function effect_update_depth_exceeded() {
  throw new Error('https://svelte.dev/e/effect_update_depth_exceeded');
}
function props_invalid_value(e) {
  throw new Error('https://svelte.dev/e/props_invalid_value');
}
function state_descriptors_fixed() {
  throw new Error('https://svelte.dev/e/state_descriptors_fixed');
}
function state_prototype_fixed() {
  throw new Error('https://svelte.dev/e/state_prototype_fixed');
}
function state_unsafe_mutation() {
  throw new Error('https://svelte.dev/e/state_unsafe_mutation');
}
function svelte_boundary_reset_onerror() {
  throw new Error('https://svelte.dev/e/svelte_boundary_reset_onerror');
}
function select_multiple_invalid_value() {
  console.warn('https://svelte.dev/e/select_multiple_invalid_value');
}
function svelte_boundary_reset_noop() {
  console.warn('https://svelte.dev/e/svelte_boundary_reset_noop');
}
function equals(e) {
  return e === this.v;
}
function safe_not_equal(e, t) {
  return e != e ? t == t : e !== t || (e !== null && typeof e == 'object') || typeof e == 'function';
}
function safe_equals(e) {
  return !safe_not_equal(e, this.v);
}
let legacy_mode_flag = !1,
  tracing_mode_flag = !1;
function enable_legacy_mode_flag() {
  legacy_mode_flag = !0;
}
let component_context = null;
function set_component_context(e) {
  component_context = e;
}
function createContext() {
  const e = {};
  return [() => (hasContext(e) || missing_context(), getContext(e)), (t) => setContext(e, t)];
}
function getContext(e) {
  return get_or_init_context_map().get(e);
}
function setContext(e, t) {
  return (get_or_init_context_map().set(e, t), t);
}
function hasContext(e) {
  return get_or_init_context_map().has(e);
}
function push(e, t = !1, r) {
  component_context = {
    p: component_context,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: legacy_mode_flag && !t ? {s: null, u: null, $: []} : null,
  };
}
function pop(e) {
  var t = component_context,
    r = t.e;
  if (r !== null) {
    t.e = null;
    for (var o of r) create_user_effect(o);
  }
  return ((t.i = !0), (component_context = t.p), {});
}
function is_runes() {
  return !legacy_mode_flag || (component_context !== null && component_context.l === null);
}
function get_or_init_context_map(e) {
  return (
    component_context === null && lifecycle_outside_component(),
    (component_context.c ??= new Map(get_parent_context(component_context) || void 0))
  );
}
function get_parent_context(e) {
  let t = e.p;
  for (; t !== null; ) {
    const r = t.c;
    if (r !== null) return r;
    t = t.p;
  }
  return null;
}
let micro_tasks = [];
function run_micro_tasks() {
  var e = micro_tasks;
  ((micro_tasks = []), run_all(e));
}
function queue_micro_task(e) {
  if (micro_tasks.length === 0 && !is_flushing_sync) {
    var t = micro_tasks;
    queueMicrotask(() => {
      t === micro_tasks && run_micro_tasks();
    });
  }
  micro_tasks.push(e);
}
function flush_tasks() {
  for (; micro_tasks.length > 0; ) run_micro_tasks();
}
function handle_error(e) {
  var t = active_effect;
  if (t === null) return ((active_reaction.f |= ERROR_VALUE), e);
  if ((t.f & REACTION_RAN) === 0 && (t.f & EFFECT) === 0) throw e;
  invoke_error_boundary(e, t);
}
function invoke_error_boundary(e, t) {
  for (; t !== null; ) {
    if ((t.f & BOUNDARY_EFFECT) !== 0) {
      if ((t.f & REACTION_RAN) === 0) throw e;
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    }
    t = t.parent;
  }
  throw e;
}
const STATUS_MASK = -7169;
function set_signal_status(e, t) {
  e.f = (e.f & STATUS_MASK) | t;
}
function update_derived_status(e) {
  (e.f & CONNECTED) !== 0 || e.deps === null ? set_signal_status(e, CLEAN) : set_signal_status(e, MAYBE_DIRTY);
}
function clear_marked(e) {
  if (e !== null)
    for (const t of e) (t.f & DERIVED) === 0 || (t.f & WAS_MARKED) === 0 || ((t.f ^= WAS_MARKED), clear_marked(t.deps));
}
function defer_effect(e, t, r) {
  ((e.f & DIRTY) !== 0 ? t.add(e) : (e.f & MAYBE_DIRTY) !== 0 && r.add(e),
    clear_marked(e.deps),
    set_signal_status(e, CLEAN));
}
const batches = new Set();
let current_batch = null,
  previous_batch = null,
  batch_values = null,
  queued_root_effects = [],
  last_scheduled_effect = null,
  is_flushing = !1,
  is_flushing_sync = !1;
class Batch {
  current = new Map();
  previous = new Map();
  #e = new Set();
  #t = new Set();
  #n = 0;
  #r = 0;
  #o = null;
  #a = new Set();
  #s = new Set();
  #i = new Map();
  is_fork = !1;
  #u = !1;
  #c() {
    return this.is_fork || this.#r > 0;
  }
  skip_effect(t) {
    this.#i.has(t) || this.#i.set(t, {d: [], m: []});
  }
  unskip_effect(t) {
    var r = this.#i.get(t);
    if (r) {
      this.#i.delete(t);
      for (var o of r.d) (set_signal_status(o, DIRTY), schedule_effect(o));
      for (o of r.m) (set_signal_status(o, MAYBE_DIRTY), schedule_effect(o));
    }
  }
  process(t) {
    ((queued_root_effects = []), this.apply());
    var r = [],
      o = [];
    for (const s of t) this.#l(s, r, o);
    if (this.#c()) {
      (this.#d(o), this.#d(r));
      for (const [s, i] of this.#i) reset_branch(s, i);
    } else {
      for (const s of this.#e) s();
      (this.#e.clear(),
        this.#n === 0 && this.#f(),
        (previous_batch = this),
        (current_batch = null),
        flush_queued_effects(o),
        flush_queued_effects(r),
        this.#a.clear(),
        this.#s.clear(),
        (previous_batch = null),
        this.#o?.resolve());
    }
    batch_values = null;
  }
  #l(t, r, o) {
    t.f ^= CLEAN;
    for (var s = t.first; s !== null; ) {
      var i = s.f,
        u = (i & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0,
        l = u && (i & CLEAN) !== 0,
        p = l || (i & INERT) !== 0 || this.#i.has(s);
      if (!p && s.fn !== null) {
        u
          ? (s.f ^= CLEAN)
          : (i & EFFECT) !== 0
            ? r.push(s)
            : is_dirty(s) && ((i & BLOCK_EFFECT) !== 0 && this.#s.add(s), update_effect(s));
        var d = s.first;
        if (d !== null) {
          s = d;
          continue;
        }
      }
      for (; s !== null; ) {
        var m = s.next;
        if (m !== null) {
          s = m;
          break;
        }
        s = s.parent;
      }
    }
  }
  #d(t) {
    for (var r = 0; r < t.length; r += 1) defer_effect(t[r], this.#a, this.#s);
  }
  capture(t, r) {
    (r !== UNINITIALIZED && !this.previous.has(t) && this.previous.set(t, r),
      (t.f & ERROR_VALUE) === 0 && (this.current.set(t, t.v), batch_values?.set(t, t.v)));
  }
  activate() {
    ((current_batch = this), this.apply());
  }
  deactivate() {
    current_batch === this && ((current_batch = null), (batch_values = null));
  }
  flush() {
    if ((this.activate(), queued_root_effects.length > 0)) {
      if ((flush_effects(), current_batch !== null && current_batch !== this)) return;
    } else this.#n === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#t) t(this);
    this.#t.clear();
  }
  #f() {
    if (batches.size > 1) {
      this.previous.clear();
      var t = batch_values,
        r = !0;
      for (const s of batches) {
        if (s === this) {
          r = !1;
          continue;
        }
        const i = [];
        for (const [l, p] of this.current) {
          if (s.current.has(l))
            if (r && p !== s.current.get(l)) s.current.set(l, p);
            else continue;
          i.push(l);
        }
        if (i.length === 0) continue;
        const u = [...s.current.keys()].filter((l) => !this.current.has(l));
        if (u.length > 0) {
          var o = queued_root_effects;
          queued_root_effects = [];
          const l = new Set(),
            p = new Map();
          for (const d of i) mark_effects(d, u, l, p);
          if (queued_root_effects.length > 0) {
            ((current_batch = s), s.apply());
            for (const d of queued_root_effects) s.#l(d, [], []);
            s.deactivate();
          }
          queued_root_effects = o;
        }
      }
      ((current_batch = null), (batch_values = t));
    }
    (this.#i.clear(), batches.delete(this));
  }
  increment(t) {
    ((this.#n += 1), t && (this.#r += 1));
  }
  decrement(t) {
    ((this.#n -= 1),
      t && (this.#r -= 1),
      !this.#u &&
        ((this.#u = !0),
        queue_micro_task(() => {
          ((this.#u = !1), this.#c() ? queued_root_effects.length > 0 && this.flush() : this.revive());
        })));
  }
  revive() {
    for (const t of this.#a) (this.#s.delete(t), set_signal_status(t, DIRTY), schedule_effect(t));
    for (const t of this.#s) (set_signal_status(t, MAYBE_DIRTY), schedule_effect(t));
    this.flush();
  }
  oncommit(t) {
    this.#e.add(t);
  }
  ondiscard(t) {
    this.#t.add(t);
  }
  settled() {
    return (this.#o ??= deferred()).promise;
  }
  static ensure() {
    if (current_batch === null) {
      const t = (current_batch = new Batch());
      (batches.add(current_batch),
        is_flushing_sync ||
          queue_micro_task(() => {
            current_batch === t && t.flush();
          }));
    }
    return current_batch;
  }
  apply() {}
}
function flushSync(e) {
  var t = is_flushing_sync;
  is_flushing_sync = !0;
  try {
    for (var r; ; ) {
      if (
        (flush_tasks(), queued_root_effects.length === 0 && (current_batch?.flush(), queued_root_effects.length === 0))
      )
        return ((last_scheduled_effect = null), r);
      flush_effects();
    }
  } finally {
    is_flushing_sync = t;
  }
}
function flush_effects() {
  is_flushing = !0;
  var e = null;
  try {
    for (var t = 0; queued_root_effects.length > 0; ) {
      var r = Batch.ensure();
      if (t++ > 1e3) {
        var o, s;
        infinite_loop_guard();
      }
      (r.process(queued_root_effects), old_values.clear());
    }
  } finally {
    ((queued_root_effects = []), (is_flushing = !1), (last_scheduled_effect = null));
  }
}
function infinite_loop_guard() {
  try {
    effect_update_depth_exceeded();
  } catch (e) {
    invoke_error_boundary(e, last_scheduled_effect);
  }
}
let eager_block_effects = null;
function flush_queued_effects(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var o = e[r++];
      if (
        (o.f & (DESTROYED | INERT)) === 0 &&
        is_dirty(o) &&
        ((eager_block_effects = new Set()),
        update_effect(o),
        o.deps === null &&
          o.first === null &&
          o.nodes === null &&
          o.teardown === null &&
          o.ac === null &&
          unlink_effect(o),
        eager_block_effects?.size > 0)
      ) {
        old_values.clear();
        for (const s of eager_block_effects) {
          if ((s.f & (DESTROYED | INERT)) !== 0) continue;
          const i = [s];
          let u = s.parent;
          for (; u !== null; )
            (eager_block_effects.has(u) && (eager_block_effects.delete(u), i.push(u)), (u = u.parent));
          for (let l = i.length - 1; l >= 0; l--) {
            const p = i[l];
            (p.f & (DESTROYED | INERT)) === 0 && update_effect(p);
          }
        }
        eager_block_effects.clear();
      }
    }
    eager_block_effects = null;
  }
}
function mark_effects(e, t, r, o) {
  if (!r.has(e) && (r.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & DERIVED) !== 0
        ? mark_effects(s, t, r, o)
        : (i & (ASYNC | BLOCK_EFFECT)) !== 0 &&
          (i & DIRTY) === 0 &&
          depends_on(s, t, o) &&
          (set_signal_status(s, DIRTY), schedule_effect(s));
    }
}
function depends_on(e, t, r) {
  const o = r.get(e);
  if (o !== void 0) return o;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (includes.call(t, s)) return !0;
      if ((s.f & DERIVED) !== 0 && depends_on(s, t, r)) return (r.set(s, !0), !0);
    }
  return (r.set(e, !1), !1);
}
function schedule_effect(e) {
  var t = (last_scheduled_effect = e),
    r = t.b;
  if (r?.is_pending && (e.f & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0 && (e.f & REACTION_RAN) === 0) {
    r.defer_effect(e);
    return;
  }
  for (; t.parent !== null; ) {
    t = t.parent;
    var o = t.f;
    if (
      is_flushing &&
      t === active_effect &&
      (o & BLOCK_EFFECT) !== 0 &&
      (o & HEAD_EFFECT) === 0 &&
      (o & REACTION_RAN) !== 0
    )
      return;
    if ((o & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
      if ((o & CLEAN) === 0) return;
      t.f ^= CLEAN;
    }
  }
  queued_root_effects.push(t);
}
function reset_branch(e, t) {
  if (!((e.f & BRANCH_EFFECT) !== 0 && (e.f & CLEAN) !== 0)) {
    ((e.f & DIRTY) !== 0 ? t.d.push(e) : (e.f & MAYBE_DIRTY) !== 0 && t.m.push(e), set_signal_status(e, CLEAN));
    for (var r = e.first; r !== null; ) (reset_branch(r, t), (r = r.next));
  }
}
function createSubscriber(e) {
  let t = 0,
    r = source(0),
    o;
  return () => {
    effect_tracking() &&
      (get(r),
      render_effect(
        () => (
          t === 0 && (o = untrack(() => e(() => increment(r)))),
          (t += 1),
          () => {
            queue_micro_task(() => {
              ((t -= 1), t === 0 && (o?.(), (o = void 0), increment(r)));
            });
          }
        ),
      ));
  };
}
var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
function boundary(e, t, r, o) {
  new Boundary(e, t, r, o);
}
class Boundary {
  parent;
  is_pending = !1;
  transform_error;
  #e;
  #t = null;
  #n;
  #r;
  #o;
  #a = null;
  #s = null;
  #i = null;
  #u = null;
  #c = 0;
  #l = 0;
  #d = !1;
  #f = new Set();
  #h = new Set();
  #p = null;
  #b = createSubscriber(
    () => (
      (this.#p = source(this.#c)),
      () => {
        this.#p = null;
      }
    ),
  );
  constructor(t, r, o, s) {
    ((this.#e = t),
      (this.#n = r),
      (this.#r = (i) => {
        var u = active_effect;
        ((u.b = this), (u.f |= BOUNDARY_EFFECT), o(i));
      }),
      (this.parent = active_effect.b),
      (this.transform_error = s ?? this.parent?.transform_error ?? ((i) => i)),
      (this.#o = block(() => {
        this.#T();
      }, flags)));
  }
  #_() {
    try {
      this.#a = branch(() => this.#r(this.#e));
    } catch (t) {
      this.error(t);
    }
  }
  #v(t) {
    const r = this.#n.failed;
    r &&
      (this.#i = branch(() => {
        r(
          this.#e,
          () => t,
          () => () => {},
        );
      }));
  }
  #y() {
    const t = this.#n.pending;
    t &&
      ((this.is_pending = !0),
      (this.#s = branch(() => t(this.#e))),
      queue_micro_task(() => {
        var r = (this.#u = document.createDocumentFragment()),
          o = create_text();
        (r.append(o),
          (this.#a = this.#g(() => (Batch.ensure(), branch(() => this.#r(o))))),
          this.#l === 0 &&
            (this.#e.before(r),
            (this.#u = null),
            pause_effect(this.#s, () => {
              this.#s = null;
            }),
            this.#m()));
      }));
  }
  #T() {
    try {
      if (
        ((this.is_pending = this.has_pending_snippet()),
        (this.#l = 0),
        (this.#c = 0),
        (this.#a = branch(() => {
          this.#r(this.#e);
        })),
        this.#l > 0)
      ) {
        var t = (this.#u = document.createDocumentFragment());
        move_effect(this.#a, t);
        const r = this.#n.pending;
        this.#s = branch(() => r(this.#e));
      } else this.#m();
    } catch (r) {
      this.error(r);
    }
  }
  #m() {
    this.is_pending = !1;
    for (const t of this.#f) (set_signal_status(t, DIRTY), schedule_effect(t));
    for (const t of this.#h) (set_signal_status(t, MAYBE_DIRTY), schedule_effect(t));
    (this.#f.clear(), this.#h.clear());
  }
  defer_effect(t) {
    defer_effect(t, this.#f, this.#h);
  }
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#n.pending;
  }
  #g(t) {
    var r = active_effect,
      o = active_reaction,
      s = component_context;
    (set_active_effect(this.#o), set_active_reaction(this.#o), set_component_context(this.#o.ctx));
    try {
      return t();
    } catch (i) {
      return (handle_error(i), null);
    } finally {
      (set_active_effect(r), set_active_reaction(o), set_component_context(s));
    }
  }
  #E(t) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#E(t);
      return;
    }
    ((this.#l += t),
      this.#l === 0 &&
        (this.#m(),
        this.#s &&
          pause_effect(this.#s, () => {
            this.#s = null;
          }),
        this.#u && (this.#e.before(this.#u), (this.#u = null))));
  }
  update_pending_count(t) {
    (this.#E(t),
      (this.#c += t),
      !(!this.#p || this.#d) &&
        ((this.#d = !0),
        queue_micro_task(() => {
          ((this.#d = !1), this.#p && internal_set(this.#p, this.#c));
        })));
  }
  get_effect_pending() {
    return (this.#b(), get(this.#p));
  }
  error(t) {
    var r = this.#n.onerror;
    let o = this.#n.failed;
    if (!r && !o) throw t;
    (this.#a && (destroy_effect(this.#a), (this.#a = null)),
      this.#s && (destroy_effect(this.#s), (this.#s = null)),
      this.#i && (destroy_effect(this.#i), (this.#i = null)));
    var s = !1,
      i = !1;
    const u = () => {
        if (s) {
          svelte_boundary_reset_noop();
          return;
        }
        ((s = !0),
          i && svelte_boundary_reset_onerror(),
          this.#i !== null &&
            pause_effect(this.#i, () => {
              this.#i = null;
            }),
          this.#g(() => {
            (Batch.ensure(), this.#T());
          }));
      },
      l = (p) => {
        try {
          ((i = !0), r?.(p, u), (i = !1));
        } catch (d) {
          invoke_error_boundary(d, this.#o && this.#o.parent);
        }
        o &&
          (this.#i = this.#g(() => {
            Batch.ensure();
            try {
              return branch(() => {
                var d = active_effect;
                ((d.b = this),
                  (d.f |= BOUNDARY_EFFECT),
                  o(
                    this.#e,
                    () => p,
                    () => u,
                  ));
              });
            } catch (d) {
              return (invoke_error_boundary(d, this.#o.parent), null);
            }
          }));
      };
    queue_micro_task(() => {
      var p;
      try {
        p = this.transform_error(t);
      } catch (d) {
        invoke_error_boundary(d, this.#o && this.#o.parent);
        return;
      }
      p !== null && typeof p == 'object' && typeof p.then == 'function'
        ? p.then(l, (d) => invoke_error_boundary(d, this.#o && this.#o.parent))
        : l(p);
    });
  }
}
function flatten(e, t, r, o) {
  const s = is_runes() ? derived : derived_safe_equal;
  var i = e.filter((y) => !y.settled);
  if (r.length === 0 && i.length === 0) {
    o(t.map(s));
    return;
  }
  var u = active_effect,
    l = capture(),
    p = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((y) => y.promise)) : null;
  function d(y) {
    l();
    try {
      o(y);
    } catch (g) {
      (u.f & DESTROYED) === 0 && invoke_error_boundary(g, u);
    }
    unset_context();
  }
  if (r.length === 0) {
    p.then(() => d(t.map(s)));
    return;
  }
  function m() {
    (l(),
      Promise.all(r.map((y) => async_derived(y)))
        .then((y) => d([...t.map(s), ...y]))
        .catch((y) => invoke_error_boundary(y, u)));
  }
  p ? p.then(m) : m();
}
function capture() {
  var e = active_effect,
    t = active_reaction,
    r = component_context,
    o = current_batch;
  return function (i = !0) {
    (set_active_effect(e), set_active_reaction(t), set_component_context(r), i && o?.activate());
  };
}
function unset_context(e = !0) {
  (set_active_effect(null), set_active_reaction(null), set_component_context(null), e && current_batch?.deactivate());
}
function increment_pending() {
  var e = active_effect.b,
    t = current_batch,
    r = e.is_rendered();
  return (
    e.update_pending_count(1),
    t.increment(r),
    () => {
      (e.update_pending_count(-1), t.decrement(r));
    }
  );
}
function derived(e) {
  var t = DERIVED | DIRTY,
    r = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? active_reaction : null;
  return (
    active_effect !== null && (active_effect.f |= EFFECT_PRESERVED),
    {
      ctx: component_context,
      deps: null,
      effects: null,
      equals,
      f: t,
      fn: e,
      reactions: null,
      rv: 0,
      v: UNINITIALIZED,
      wv: 0,
      parent: r ?? active_effect,
      ac: null,
    }
  );
}
function async_derived(e, t, r) {
  active_effect === null && async_derived_orphan();
  var s = void 0,
    i = source(UNINITIALIZED),
    u = !active_reaction,
    l = new Map();
  return (
    async_effect(() => {
      var p = deferred();
      s = p.promise;
      try {
        Promise.resolve(e()).then(p.resolve, p.reject).finally(unset_context);
      } catch (g) {
        (p.reject(g), unset_context());
      }
      var d = current_batch;
      if (u) {
        var m = increment_pending();
        (l.get(d)?.reject(STALE_REACTION), l.delete(d), l.set(d, p));
      }
      const y = (g, S = void 0) => {
        if ((d.activate(), S)) S !== STALE_REACTION && ((i.f |= ERROR_VALUE), internal_set(i, S));
        else {
          ((i.f & ERROR_VALUE) !== 0 && (i.f ^= ERROR_VALUE), internal_set(i, g));
          for (const [T, O] of l) {
            if ((l.delete(T), T === d)) break;
            O.reject(STALE_REACTION);
          }
        }
        m && m();
      };
      p.promise.then(y, (g) => y(null, g || 'unknown'));
    }),
    teardown(() => {
      for (const p of l.values()) p.reject(STALE_REACTION);
    }),
    new Promise((p) => {
      function d(m) {
        function y() {
          m === s ? p(i) : d(s);
        }
        m.then(y, y);
      }
      d(s);
    })
  );
}
function user_derived(e) {
  const t = derived(e);
  return (push_reaction_value(t), t);
}
function derived_safe_equal(e) {
  const t = derived(e);
  return ((t.equals = safe_equals), t);
}
function destroy_derived_effects(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1) destroy_effect(t[r]);
  }
}
function get_derived_parent_effect(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & DERIVED) === 0) return (t.f & DESTROYED) === 0 ? t : null;
    t = t.parent;
  }
  return null;
}
function execute_derived(e) {
  var t,
    r = active_effect;
  set_active_effect(get_derived_parent_effect(e));
  try {
    ((e.f &= ~WAS_MARKED), destroy_derived_effects(e), (t = update_reaction(e)));
  } finally {
    set_active_effect(r);
  }
  return t;
}
function update_derived(e) {
  var t = execute_derived(e);
  if (
    !e.equals(t) &&
    ((e.wv = increment_write_version()), (!current_batch?.is_fork || e.deps === null) && ((e.v = t), e.deps === null))
  ) {
    set_signal_status(e, CLEAN);
    return;
  }
  is_destroying_effect ||
    (batch_values !== null
      ? (effect_tracking() || current_batch?.is_fork) && batch_values.set(e, t)
      : update_derived_status(e));
}
function freeze_derived_effects(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) &&
        (t.teardown?.(),
        t.ac?.abort(STALE_REACTION),
        (t.teardown = noop),
        (t.ac = null),
        remove_reactions(t, 0),
        destroy_effect_children(t));
}
function unfreeze_derived_effects(e) {
  if (e.effects !== null) for (const t of e.effects) t.teardown && update_effect(t);
}
let eager_effects = new Set();
const old_values = new Map();
let eager_effects_deferred = !1;
function source(e, t) {
  var r = {f: 0, v: e, reactions: null, equals, rv: 0, wv: 0};
  return r;
}
function state(e, t) {
  const r = source(e);
  return (push_reaction_value(r), r);
}
function mutable_source(e, t = !1, r = !0) {
  const o = source(e);
  return (
    t || (o.equals = safe_equals),
    legacy_mode_flag &&
      r &&
      component_context !== null &&
      component_context.l !== null &&
      (component_context.l.s ??= []).push(o),
    o
  );
}
function set(e, t, r = !1) {
  active_reaction !== null &&
    (!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) &&
    is_runes() &&
    (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 &&
    (current_sources === null || !includes.call(current_sources, e)) &&
    state_unsafe_mutation();
  let o = r ? proxy(t) : t;
  return internal_set(e, o);
}
function internal_set(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    (is_destroying_effect ? old_values.set(e, t) : old_values.set(e, r), (e.v = t));
    var o = Batch.ensure();
    if ((o.capture(e, r), (e.f & DERIVED) !== 0)) {
      const s = e;
      ((e.f & DIRTY) !== 0 && execute_derived(s), update_derived_status(s));
    }
    ((e.wv = increment_write_version()),
      mark_reactions(e, DIRTY),
      is_runes() &&
        active_effect !== null &&
        (active_effect.f & CLEAN) !== 0 &&
        (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 &&
        (untracked_writes === null ? set_untracked_writes([e]) : untracked_writes.push(e)),
      !o.is_fork && eager_effects.size > 0 && !eager_effects_deferred && flush_eager_effects());
  }
  return t;
}
function flush_eager_effects() {
  eager_effects_deferred = !1;
  for (const e of eager_effects)
    ((e.f & CLEAN) !== 0 && set_signal_status(e, MAYBE_DIRTY), is_dirty(e) && update_effect(e));
  eager_effects.clear();
}
function increment(e) {
  set(e, e.v + 1);
}
function mark_reactions(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var o = is_runes(), s = r.length, i = 0; i < s; i++) {
      var u = r[i],
        l = u.f;
      if (!(!o && u === active_effect)) {
        var p = (l & DIRTY) === 0;
        if ((p && set_signal_status(u, t), (l & DERIVED) !== 0)) {
          var d = u;
          (batch_values?.delete(d),
            (l & WAS_MARKED) === 0 && (l & CONNECTED && (u.f |= WAS_MARKED), mark_reactions(d, MAYBE_DIRTY)));
        } else
          p &&
            ((l & BLOCK_EFFECT) !== 0 && eager_block_effects !== null && eager_block_effects.add(u),
            schedule_effect(u));
      }
    }
}
function proxy(e) {
  if (typeof e != 'object' || e === null || STATE_SYMBOL in e) return e;
  const t = get_prototype_of(e);
  if (t !== object_prototype && t !== array_prototype) return e;
  var r = new Map(),
    o = is_array(e),
    s = state(0),
    i = update_version,
    u = (l) => {
      if (update_version === i) return l();
      var p = active_reaction,
        d = update_version;
      (set_active_reaction(null), set_update_version(i));
      var m = l();
      return (set_active_reaction(p), set_update_version(d), m);
    };
  return (
    o && r.set('length', state(e.length)),
    new Proxy(e, {
      defineProperty(l, p, d) {
        (!('value' in d) || d.configurable === !1 || d.enumerable === !1 || d.writable === !1) &&
          state_descriptors_fixed();
        var m = r.get(p);
        return (
          m === void 0
            ? u(() => {
                var y = state(d.value);
                return (r.set(p, y), y);
              })
            : set(m, d.value, !0),
          !0
        );
      },
      deleteProperty(l, p) {
        var d = r.get(p);
        if (d === void 0) {
          if (p in l) {
            const m = u(() => state(UNINITIALIZED));
            (r.set(p, m), increment(s));
          }
        } else (set(d, UNINITIALIZED), increment(s));
        return !0;
      },
      get(l, p, d) {
        if (p === STATE_SYMBOL) return e;
        var m = r.get(p),
          y = p in l;
        if (
          (m === void 0 &&
            (!y || get_descriptor(l, p)?.writable) &&
            ((m = u(() => {
              var S = proxy(y ? l[p] : UNINITIALIZED),
                T = state(S);
              return T;
            })),
            r.set(p, m)),
          m !== void 0)
        ) {
          var g = get(m);
          return g === UNINITIALIZED ? void 0 : g;
        }
        return Reflect.get(l, p, d);
      },
      getOwnPropertyDescriptor(l, p) {
        var d = Reflect.getOwnPropertyDescriptor(l, p);
        if (d && 'value' in d) {
          var m = r.get(p);
          m && (d.value = get(m));
        } else if (d === void 0) {
          var y = r.get(p),
            g = y?.v;
          if (y !== void 0 && g !== UNINITIALIZED) return {enumerable: !0, configurable: !0, value: g, writable: !0};
        }
        return d;
      },
      has(l, p) {
        if (p === STATE_SYMBOL) return !0;
        var d = r.get(p),
          m = (d !== void 0 && d.v !== UNINITIALIZED) || Reflect.has(l, p);
        if (d !== void 0 || (active_effect !== null && (!m || get_descriptor(l, p)?.writable))) {
          d === void 0 &&
            ((d = u(() => {
              var g = m ? proxy(l[p]) : UNINITIALIZED,
                S = state(g);
              return S;
            })),
            r.set(p, d));
          var y = get(d);
          if (y === UNINITIALIZED) return !1;
        }
        return m;
      },
      set(l, p, d, m) {
        var y = r.get(p),
          g = p in l;
        if (o && p === 'length')
          for (var S = d; S < y.v; S += 1) {
            var T = r.get(S + '');
            T !== void 0 ? set(T, UNINITIALIZED) : S in l && ((T = u(() => state(UNINITIALIZED))), r.set(S + '', T));
          }
        if (y === void 0)
          (!g || get_descriptor(l, p)?.writable) && ((y = u(() => state(void 0))), set(y, proxy(d)), r.set(p, y));
        else {
          g = y.v !== UNINITIALIZED;
          var O = u(() => proxy(d));
          set(y, O);
        }
        var C = Reflect.getOwnPropertyDescriptor(l, p);
        if ((C?.set && C.set.call(m, d), !g)) {
          if (o && typeof p == 'string') {
            var D = r.get('length'),
              R = Number(p);
            Number.isInteger(R) && R >= D.v && set(D, R + 1);
          }
          increment(s);
        }
        return !0;
      },
      ownKeys(l) {
        get(s);
        var p = Reflect.ownKeys(l).filter((y) => {
          var g = r.get(y);
          return g === void 0 || g.v !== UNINITIALIZED;
        });
        for (var [d, m] of r) m.v !== UNINITIALIZED && !(d in l) && p.push(d);
        return p;
      },
      setPrototypeOf() {
        state_prototype_fixed();
      },
    })
  );
}
function get_proxied_value(e) {
  try {
    if (e !== null && typeof e == 'object' && STATE_SYMBOL in e) return e[STATE_SYMBOL];
  } catch {}
  return e;
}
function is(e, t) {
  return Object.is(get_proxied_value(e), get_proxied_value(t));
}
var $window, is_firefox, first_child_getter, next_sibling_getter;
function init_operations() {
  if ($window === void 0) {
    (($window = window), (is_firefox = /Firefox/.test(navigator.userAgent)));
    var e = Element.prototype,
      t = Node.prototype,
      r = Text.prototype;
    ((first_child_getter = get_descriptor(t, 'firstChild').get),
      (next_sibling_getter = get_descriptor(t, 'nextSibling').get),
      is_extensible(e) &&
        ((e.__click = void 0),
        (e.__className = void 0),
        (e.__attributes = null),
        (e.__style = void 0),
        (e.__e = void 0)),
      is_extensible(r) && (r.__t = void 0));
  }
}
function create_text(e = '') {
  return document.createTextNode(e);
}
function get_first_child(e) {
  return first_child_getter.call(e);
}
function get_next_sibling(e) {
  return next_sibling_getter.call(e);
}
function child(e, t) {
  return get_first_child(e);
}
function first_child(e, t = !1) {
  {
    var r = get_first_child(e);
    return r instanceof Comment && r.data === '' ? get_next_sibling(r) : r;
  }
}
function sibling(e, t = 1, r = !1) {
  let o = e;
  for (; t--; ) o = get_next_sibling(o);
  return o;
}
function clear_text_content(e) {
  e.textContent = '';
}
function should_defer_append() {
  return !1;
}
function create_element(e, t, r) {
  return document.createElementNS(t ?? NAMESPACE_HTML, e, void 0);
}
function autofocus(e, t) {
  if (t) {
    const r = document.body;
    ((e.autofocus = !0),
      queue_micro_task(() => {
        document.activeElement === r && e.focus();
      }));
  }
}
let listening_to_form_reset = !1;
function add_form_reset_listener() {
  listening_to_form_reset ||
    ((listening_to_form_reset = !0),
    document.addEventListener(
      'reset',
      (e) => {
        Promise.resolve().then(() => {
          if (!e.defaultPrevented) for (const t of e.target.elements) t.__on_r?.();
        });
      },
      {capture: !0},
    ));
}
function without_reactive_context(e) {
  var t = active_reaction,
    r = active_effect;
  (set_active_reaction(null), set_active_effect(null));
  try {
    return e();
  } finally {
    (set_active_reaction(t), set_active_effect(r));
  }
}
function listen_to_event_and_reset_event(e, t, r, o = r) {
  e.addEventListener(t, () => without_reactive_context(r));
  const s = e.__on_r;
  (s
    ? (e.__on_r = () => {
        (s(), o(!0));
      })
    : (e.__on_r = () => o(!0)),
    add_form_reset_listener());
}
function validate_effect(e) {
  (active_effect === null && (active_reaction === null && effect_orphan(), effect_in_unowned_derived()),
    is_destroying_effect && effect_in_teardown());
}
function push_effect(e, t) {
  var r = t.last;
  r === null ? (t.last = t.first = e) : ((r.next = e), (e.prev = r), (t.last = e));
}
function create_effect(e, t, r) {
  var o = active_effect;
  o !== null && (o.f & INERT) !== 0 && (e |= INERT);
  var s = {
    ctx: component_context,
    deps: null,
    nodes: null,
    f: e | DIRTY | CONNECTED,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: o,
    b: o && o.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null,
  };
  if (r)
    try {
      update_effect(s);
    } catch (l) {
      throw (destroy_effect(s), l);
    }
  else t !== null && schedule_effect(s);
  var i = s;
  if (
    (r &&
      i.deps === null &&
      i.teardown === null &&
      i.nodes === null &&
      i.first === i.last &&
      (i.f & EFFECT_PRESERVED) === 0 &&
      ((i = i.first),
      (e & BLOCK_EFFECT) !== 0 && (e & EFFECT_TRANSPARENT) !== 0 && i !== null && (i.f |= EFFECT_TRANSPARENT)),
    i !== null &&
      ((i.parent = o),
      o !== null && push_effect(i, o),
      active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (e & ROOT_EFFECT) === 0))
  ) {
    var u = active_reaction;
    (u.effects ??= []).push(i);
  }
  return s;
}
function effect_tracking() {
  return active_reaction !== null && !untracking;
}
function teardown(e) {
  const t = create_effect(RENDER_EFFECT, null, !1);
  return (set_signal_status(t, CLEAN), (t.teardown = e), t);
}
function user_effect(e) {
  validate_effect();
  var t = active_effect.f,
    r = !active_reaction && (t & BRANCH_EFFECT) !== 0 && (t & REACTION_RAN) === 0;
  if (r) {
    var o = component_context;
    (o.e ??= []).push(e);
  } else return create_user_effect(e);
}
function create_user_effect(e) {
  return create_effect(EFFECT | USER_EFFECT, e, !1);
}
function user_pre_effect(e) {
  return (validate_effect(), create_effect(RENDER_EFFECT | USER_EFFECT, e, !0));
}
function component_root(e) {
  Batch.ensure();
  const t = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, e, !0);
  return (r = {}) =>
    new Promise((o) => {
      r.outro
        ? pause_effect(t, () => {
            (destroy_effect(t), o(void 0));
          })
        : (destroy_effect(t), o(void 0));
    });
}
function effect(e) {
  return create_effect(EFFECT, e, !1);
}
function legacy_pre_effect(e, t) {
  var r = component_context,
    o = {effect: null, ran: !1, deps: e};
  (r.l.$.push(o),
    (o.effect = render_effect(() => {
      (e(), !o.ran && ((o.ran = !0), untrack(t)));
    })));
}
function legacy_pre_effect_reset() {
  var e = component_context;
  render_effect(() => {
    for (var t of e.l.$) {
      t.deps();
      var r = t.effect;
      ((r.f & CLEAN) !== 0 && r.deps !== null && set_signal_status(r, MAYBE_DIRTY),
        is_dirty(r) && update_effect(r),
        (t.ran = !1));
    }
  });
}
function async_effect(e) {
  return create_effect(ASYNC | EFFECT_PRESERVED, e, !0);
}
function render_effect(e, t = 0) {
  return create_effect(RENDER_EFFECT | t, e, !0);
}
function template_effect(e, t = [], r = [], o = []) {
  flatten(o, t, r, (s) => {
    create_effect(RENDER_EFFECT, () => e(...s.map(get)), !0);
  });
}
function block(e, t = 0) {
  var r = create_effect(BLOCK_EFFECT | t, e, !0);
  return r;
}
function managed(e, t = 0) {
  var r = create_effect(MANAGED_EFFECT | t, e, !0);
  return r;
}
function branch(e) {
  return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, e, !0);
}
function execute_effect_teardown(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = is_destroying_effect,
      o = active_reaction;
    (set_is_destroying_effect(!0), set_active_reaction(null));
    try {
      t.call(null);
    } finally {
      (set_is_destroying_effect(r), set_active_reaction(o));
    }
  }
}
function destroy_effect_children(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const s = r.ac;
    s !== null &&
      without_reactive_context(() => {
        s.abort(STALE_REACTION);
      });
    var o = r.next;
    ((r.f & ROOT_EFFECT) !== 0 ? (r.parent = null) : destroy_effect(r, t), (r = o));
  }
}
function destroy_block_effect_children(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    ((t.f & BRANCH_EFFECT) === 0 && destroy_effect(t), (t = r));
  }
}
function destroy_effect(e, t = !0) {
  var r = !1;
  ((t || (e.f & HEAD_EFFECT) !== 0) &&
    e.nodes !== null &&
    e.nodes.end !== null &&
    (remove_effect_dom(e.nodes.start, e.nodes.end), (r = !0)),
    destroy_effect_children(e, t && !r),
    remove_reactions(e, 0),
    set_signal_status(e, DESTROYED));
  var o = e.nodes && e.nodes.t;
  if (o !== null) for (const i of o) i.stop();
  execute_effect_teardown(e);
  var s = e.parent;
  (s !== null && s.first !== null && unlink_effect(e),
    (e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null));
}
function remove_effect_dom(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : get_next_sibling(e);
    (e.remove(), (e = r));
  }
}
function unlink_effect(e) {
  var t = e.parent,
    r = e.prev,
    o = e.next;
  (r !== null && (r.next = o),
    o !== null && (o.prev = r),
    t !== null && (t.first === e && (t.first = o), t.last === e && (t.last = r)));
}
function pause_effect(e, t, r = !0) {
  var o = [];
  pause_children(e, o, !0);
  var s = () => {
      (r && destroy_effect(e), t && t());
    },
    i = o.length;
  if (i > 0) {
    var u = () => --i || s();
    for (var l of o) l.out(u);
  } else s();
}
function pause_children(e, t, r) {
  if ((e.f & INERT) === 0) {
    e.f ^= INERT;
    var o = e.nodes && e.nodes.t;
    if (o !== null) for (const l of o) (l.is_global || r) && t.push(l);
    for (var s = e.first; s !== null; ) {
      var i = s.next,
        u = (s.f & EFFECT_TRANSPARENT) !== 0 || ((s.f & BRANCH_EFFECT) !== 0 && (e.f & BLOCK_EFFECT) !== 0);
      (pause_children(s, t, u ? r : !1), (s = i));
    }
  }
}
function resume_effect(e) {
  resume_children(e, !0);
}
function resume_children(e, t) {
  if ((e.f & INERT) !== 0) {
    ((e.f ^= INERT), (e.f & CLEAN) === 0 && (set_signal_status(e, DIRTY), schedule_effect(e)));
    for (var r = e.first; r !== null; ) {
      var o = r.next,
        s = (r.f & EFFECT_TRANSPARENT) !== 0 || (r.f & BRANCH_EFFECT) !== 0;
      (resume_children(r, s ? t : !1), (r = o));
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null) for (const u of i) (u.is_global || t) && u.in();
  }
}
function move_effect(e, t) {
  if (e.nodes)
    for (var r = e.nodes.start, o = e.nodes.end; r !== null; ) {
      var s = r === o ? null : get_next_sibling(r);
      (t.append(r), (r = s));
    }
}
let is_updating_effect = !1,
  is_destroying_effect = !1;
function set_is_destroying_effect(e) {
  is_destroying_effect = e;
}
let active_reaction = null,
  untracking = !1;
function set_active_reaction(e) {
  active_reaction = e;
}
let active_effect = null;
function set_active_effect(e) {
  active_effect = e;
}
let current_sources = null;
function push_reaction_value(e) {
  active_reaction !== null && (current_sources === null ? (current_sources = [e]) : current_sources.push(e));
}
let new_deps = null,
  skipped_deps = 0,
  untracked_writes = null;
function set_untracked_writes(e) {
  untracked_writes = e;
}
let write_version = 1,
  read_version = 0,
  update_version = read_version;
function set_update_version(e) {
  update_version = e;
}
function increment_write_version() {
  return ++write_version;
}
function is_dirty(e) {
  var t = e.f;
  if ((t & DIRTY) !== 0) return !0;
  if ((t & DERIVED && (e.f &= ~WAS_MARKED), (t & MAYBE_DIRTY) !== 0)) {
    for (var r = e.deps, o = r.length, s = 0; s < o; s++) {
      var i = r[s];
      if ((is_dirty(i) && update_derived(i), i.wv > e.wv)) return !0;
    }
    (t & CONNECTED) !== 0 && batch_values === null && set_signal_status(e, CLEAN);
  }
  return !1;
}
function schedule_possible_effect_self_invalidation(e, t, r = !0) {
  var o = e.reactions;
  if (o !== null && !(current_sources !== null && includes.call(current_sources, e)))
    for (var s = 0; s < o.length; s++) {
      var i = o[s];
      (i.f & DERIVED) !== 0
        ? schedule_possible_effect_self_invalidation(i, t, !1)
        : t === i &&
          (r ? set_signal_status(i, DIRTY) : (i.f & CLEAN) !== 0 && set_signal_status(i, MAYBE_DIRTY),
          schedule_effect(i));
    }
}
function update_reaction(e) {
  var t = new_deps,
    r = skipped_deps,
    o = untracked_writes,
    s = active_reaction,
    i = current_sources,
    u = component_context,
    l = untracking,
    p = update_version,
    d = e.f;
  ((new_deps = null),
    (skipped_deps = 0),
    (untracked_writes = null),
    (active_reaction = (d & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? e : null),
    (current_sources = null),
    set_component_context(e.ctx),
    (untracking = !1),
    (update_version = ++read_version),
    e.ac !== null &&
      (without_reactive_context(() => {
        e.ac.abort(STALE_REACTION);
      }),
      (e.ac = null)));
  try {
    e.f |= REACTION_IS_UPDATING;
    var m = e.fn,
      y = m();
    e.f |= REACTION_RAN;
    var g = e.deps,
      S = current_batch?.is_fork;
    if (new_deps !== null) {
      var T;
      if ((S || remove_reactions(e, skipped_deps), g !== null && skipped_deps > 0))
        for (g.length = skipped_deps + new_deps.length, T = 0; T < new_deps.length; T++)
          g[skipped_deps + T] = new_deps[T];
      else e.deps = g = new_deps;
      if (effect_tracking() && (e.f & CONNECTED) !== 0)
        for (T = skipped_deps; T < g.length; T++) (g[T].reactions ??= []).push(e);
    } else
      !S && g !== null && skipped_deps < g.length && (remove_reactions(e, skipped_deps), (g.length = skipped_deps));
    if (
      is_runes() &&
      untracked_writes !== null &&
      !untracking &&
      g !== null &&
      (e.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0
    )
      for (T = 0; T < untracked_writes.length; T++) schedule_possible_effect_self_invalidation(untracked_writes[T], e);
    if (s !== null && s !== e) {
      if ((read_version++, s.deps !== null)) for (let O = 0; O < r; O += 1) s.deps[O].rv = read_version;
      if (t !== null) for (const O of t) O.rv = read_version;
      untracked_writes !== null && (o === null ? (o = untracked_writes) : o.push(...untracked_writes));
    }
    return ((e.f & ERROR_VALUE) !== 0 && (e.f ^= ERROR_VALUE), y);
  } catch (O) {
    return handle_error(O);
  } finally {
    ((e.f ^= REACTION_IS_UPDATING),
      (new_deps = t),
      (skipped_deps = r),
      (untracked_writes = o),
      (active_reaction = s),
      (current_sources = i),
      set_component_context(u),
      (untracking = l),
      (update_version = p));
  }
}
function remove_reaction(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var o = index_of.call(r, e);
    if (o !== -1) {
      var s = r.length - 1;
      s === 0 ? (r = t.reactions = null) : ((r[o] = r[s]), r.pop());
    }
  }
  if (r === null && (t.f & DERIVED) !== 0 && (new_deps === null || !includes.call(new_deps, t))) {
    var i = t;
    ((i.f & CONNECTED) !== 0 && ((i.f ^= CONNECTED), (i.f &= ~WAS_MARKED)),
      update_derived_status(i),
      freeze_derived_effects(i),
      remove_reactions(i, 0));
  }
}
function remove_reactions(e, t) {
  var r = e.deps;
  if (r !== null) for (var o = t; o < r.length; o++) remove_reaction(e, r[o]);
}
function update_effect(e) {
  var t = e.f;
  if ((t & DESTROYED) === 0) {
    set_signal_status(e, CLEAN);
    var r = active_effect,
      o = is_updating_effect;
    ((active_effect = e), (is_updating_effect = !0));
    try {
      ((t & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0 ? destroy_block_effect_children(e) : destroy_effect_children(e),
        execute_effect_teardown(e));
      var s = update_reaction(e);
      ((e.teardown = typeof s == 'function' ? s : null), (e.wv = write_version));
      var i;
      DEV && tracing_mode_flag && (e.f & DIRTY) !== 0 && e.deps;
    } finally {
      ((is_updating_effect = o), (active_effect = r));
    }
  }
}
async function tick() {
  (await Promise.resolve(), flushSync());
}
function get(e) {
  var t = e.f,
    r = (t & DERIVED) !== 0;
  if (active_reaction !== null && !untracking) {
    var o = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
    if (!o && (current_sources === null || !includes.call(current_sources, e))) {
      var s = active_reaction.deps;
      if ((active_reaction.f & REACTION_IS_UPDATING) !== 0)
        e.rv < read_version &&
          ((e.rv = read_version),
          new_deps === null && s !== null && s[skipped_deps] === e
            ? skipped_deps++
            : new_deps === null
              ? (new_deps = [e])
              : new_deps.push(e));
      else {
        (active_reaction.deps ??= []).push(e);
        var i = e.reactions;
        i === null ? (e.reactions = [active_reaction]) : includes.call(i, active_reaction) || i.push(active_reaction);
      }
    }
  }
  if (is_destroying_effect && old_values.has(e)) return old_values.get(e);
  if (r) {
    var u = e;
    if (is_destroying_effect) {
      var l = u.v;
      return (
        (((u.f & CLEAN) === 0 && u.reactions !== null) || depends_on_old_values(u)) && (l = execute_derived(u)),
        old_values.set(u, l),
        l
      );
    }
    var p =
        (u.f & CONNECTED) === 0 &&
        !untracking &&
        active_reaction !== null &&
        (is_updating_effect || (active_reaction.f & CONNECTED) !== 0),
      d = (u.f & REACTION_RAN) === 0;
    (is_dirty(u) && (p && (u.f |= CONNECTED), update_derived(u)),
      p && !d && (unfreeze_derived_effects(u), reconnect(u)));
  }
  if (batch_values?.has(e)) return batch_values.get(e);
  if ((e.f & ERROR_VALUE) !== 0) throw e.v;
  return e.v;
}
function reconnect(e) {
  if (((e.f |= CONNECTED), e.deps !== null))
    for (const t of e.deps)
      ((t.reactions ??= []).push(e),
        (t.f & DERIVED) !== 0 && (t.f & CONNECTED) === 0 && (unfreeze_derived_effects(t), reconnect(t)));
}
function depends_on_old_values(e) {
  if (e.v === UNINITIALIZED) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps) if (old_values.has(t) || ((t.f & DERIVED) !== 0 && depends_on_old_values(t))) return !0;
  return !1;
}
function untrack(e) {
  var t = untracking;
  try {
    return ((untracking = !0), e());
  } finally {
    untracking = t;
  }
}
function deep_read_state(e) {
  if (!(typeof e != 'object' || !e || e instanceof EventTarget)) {
    if (STATE_SYMBOL in e) deep_read(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const r = e[t];
        typeof r == 'object' && r && STATE_SYMBOL in r && deep_read(r);
      }
  }
}
function deep_read(e, t = new Set()) {
  if (typeof e == 'object' && e !== null && !(e instanceof EventTarget) && !t.has(e)) {
    (t.add(e), e instanceof Date && e.getTime());
    for (let o in e)
      try {
        deep_read(e[o], t);
      } catch {}
    const r = get_prototype_of(e);
    if (
      r !== Object.prototype &&
      r !== Array.prototype &&
      r !== Map.prototype &&
      r !== Set.prototype &&
      r !== Date.prototype
    ) {
      const o = get_descriptors(r);
      for (let s in o) {
        const i = o[s].get;
        if (i)
          try {
            i.call(e);
          } catch {}
      }
    }
  }
}
const event_symbol = Symbol('events'),
  all_registered_events = new Set(),
  root_event_handles = new Set();
function create_event(e, t, r, o = {}) {
  function s(i) {
    if ((o.capture || handle_event_propagation.call(t, i), !i.cancelBubble))
      return without_reactive_context(() => r?.call(this, i));
  }
  return (
    e.startsWith('pointer') || e.startsWith('touch') || e === 'wheel'
      ? queue_micro_task(() => {
          t.addEventListener(e, s, o);
        })
      : t.addEventListener(e, s, o),
    s
  );
}
function event(e, t, r, o, s) {
  var i = {capture: o, passive: s},
    u = create_event(e, t, r, i);
  (t === document.body || t === window || t === document || t instanceof HTMLMediaElement) &&
    teardown(() => {
      t.removeEventListener(e, u, i);
    });
}
function delegated(e, t, r) {
  (t[event_symbol] ??= {})[e] = r;
}
function delegate(e) {
  for (var t = 0; t < e.length; t++) all_registered_events.add(e[t]);
  for (var r of root_event_handles) r(e);
}
let last_propagated_event = null;
function handle_event_propagation(e) {
  var t = this,
    r = t.ownerDocument,
    o = e.type,
    s = e.composedPath?.() || [],
    i = s[0] || e.target;
  last_propagated_event = e;
  var u = 0,
    l = last_propagated_event === e && e[event_symbol];
  if (l) {
    var p = s.indexOf(l);
    if (p !== -1 && (t === document || t === window)) {
      e[event_symbol] = t;
      return;
    }
    var d = s.indexOf(t);
    if (d === -1) return;
    p <= d && (u = p);
  }
  if (((i = s[u] || e.target), i !== t)) {
    define_property(e, 'currentTarget', {
      configurable: !0,
      get() {
        return i || r;
      },
    });
    var m = active_reaction,
      y = active_effect;
    (set_active_reaction(null), set_active_effect(null));
    try {
      for (var g, S = []; i !== null; ) {
        var T = i.assignedSlot || i.parentNode || i.host || null;
        try {
          var O = i[event_symbol]?.[o];
          O != null && (!i.disabled || e.target === i) && O.call(i, e);
        } catch (C) {
          g ? S.push(C) : (g = C);
        }
        if (e.cancelBubble || T === t || T === null) break;
        i = T;
      }
      if (g) {
        for (let C of S)
          queueMicrotask(() => {
            throw C;
          });
        throw g;
      }
    } finally {
      ((e[event_symbol] = t), delete e.currentTarget, set_active_reaction(m), set_active_effect(y));
    }
  }
}
const policy =
  globalThis?.window?.trustedTypes &&
  globalThis.window.trustedTypes.createPolicy('svelte-trusted-html', {createHTML: (e) => e});
function create_trusted_html(e) {
  return policy?.createHTML(e) ?? e;
}
function create_fragment_from_html(e) {
  var t = create_element('template');
  return ((t.innerHTML = create_trusted_html(e.replaceAll('<!>', '<!---->'))), t.content);
}
function assign_nodes(e, t) {
  var r = active_effect;
  r.nodes === null && (r.nodes = {start: e, end: t, a: null, t: null});
}
function from_html(e, t) {
  var r = (t & TEMPLATE_FRAGMENT) !== 0,
    o = (t & TEMPLATE_USE_IMPORT_NODE) !== 0,
    s,
    i = !e.startsWith('<!>');
  return () => {
    s === void 0 && ((s = create_fragment_from_html(i ? e : '<!>' + e)), r || (s = get_first_child(s)));
    var u = o || is_firefox ? document.importNode(s, !0) : s.cloneNode(!0);
    if (r) {
      var l = get_first_child(u),
        p = u.lastChild;
      assign_nodes(l, p);
    } else assign_nodes(u, u);
    return u;
  };
}
function from_namespace(e, t, r = 'svg') {
  var o = !e.startsWith('<!>'),
    s = (t & TEMPLATE_FRAGMENT) !== 0,
    i = `<${r}>${o ? e : '<!>' + e}</${r}>`,
    u;
  return () => {
    if (!u) {
      var l = create_fragment_from_html(i),
        p = get_first_child(l);
      if (s) for (u = document.createDocumentFragment(); get_first_child(p); ) u.appendChild(get_first_child(p));
      else u = get_first_child(p);
    }
    var d = u.cloneNode(!0);
    if (s) {
      var m = get_first_child(d),
        y = d.lastChild;
      assign_nodes(m, y);
    } else assign_nodes(d, d);
    return d;
  };
}
function from_svg(e, t) {
  return from_namespace(e, t, 'svg');
}
function text(e = '') {
  {
    var t = create_text(e + '');
    return (assign_nodes(t, t), t);
  }
}
function comment() {
  var e = document.createDocumentFragment(),
    t = document.createComment(''),
    r = create_text();
  return (e.append(t, r), assign_nodes(t, r), e);
}
function append(e, t) {
  e !== null && e.before(t);
}
function is_capture_event(e) {
  return e.endsWith('capture') && e !== 'gotpointercapture' && e !== 'lostpointercapture';
}
const DELEGATED_EVENTS = [
  'beforeinput',
  'click',
  'change',
  'dblclick',
  'contextmenu',
  'focusin',
  'focusout',
  'input',
  'keydown',
  'keyup',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'pointerdown',
  'pointermove',
  'pointerout',
  'pointerover',
  'pointerup',
  'touchend',
  'touchmove',
  'touchstart',
];
function can_delegate_event(e) {
  return DELEGATED_EVENTS.includes(e);
}
const ATTRIBUTE_ALIASES = {
  formnovalidate: 'formNoValidate',
  ismap: 'isMap',
  nomodule: 'noModule',
  playsinline: 'playsInline',
  readonly: 'readOnly',
  defaultvalue: 'defaultValue',
  defaultchecked: 'defaultChecked',
  srcobject: 'srcObject',
  novalidate: 'noValidate',
  allowfullscreen: 'allowFullscreen',
  disablepictureinpicture: 'disablePictureInPicture',
  disableremoteplayback: 'disableRemotePlayback',
};
function normalize_attribute(e) {
  return ((e = e.toLowerCase()), ATTRIBUTE_ALIASES[e] ?? e);
}
const PASSIVE_EVENTS = ['touchstart', 'touchmove'];
function is_passive_event(e) {
  return PASSIVE_EVENTS.includes(e);
}
let should_intro = !0;
function set_should_intro(e) {
  should_intro = e;
}
function set_text(e, t) {
  var r = t == null ? '' : typeof t == 'object' ? `${t}` : t;
  r !== (e.__t ??= e.nodeValue) && ((e.__t = r), (e.nodeValue = `${r}`));
}
function mount(e, t) {
  return _mount(e, t);
}
const listeners = new Map();
function _mount(e, {target: t, anchor: r, props: o = {}, events: s, context: i, intro: u = !0, transformError: l}) {
  init_operations();
  var p = void 0,
    d = component_root(() => {
      var m = r ?? t.appendChild(create_text());
      boundary(
        m,
        {pending: () => {}},
        (S) => {
          push({});
          var T = component_context;
          (i && (T.c = i), s && (o.$$events = s), (should_intro = u), (p = e(S, o) || {}), (should_intro = !0), pop());
        },
        l,
      );
      var y = new Set(),
        g = (S) => {
          for (var T = 0; T < S.length; T++) {
            var O = S[T];
            if (!y.has(O)) {
              y.add(O);
              var C = is_passive_event(O);
              for (const x of [t, document]) {
                var D = listeners.get(x);
                D === void 0 && ((D = new Map()), listeners.set(x, D));
                var R = D.get(O);
                R === void 0
                  ? (x.addEventListener(O, handle_event_propagation, {passive: C}), D.set(O, 1))
                  : D.set(O, R + 1);
              }
            }
          }
        };
      return (
        g(array_from(all_registered_events)),
        root_event_handles.add(g),
        () => {
          for (var S of y)
            for (const C of [t, document]) {
              var T = listeners.get(C),
                O = T.get(S);
              --O == 0
                ? (C.removeEventListener(S, handle_event_propagation), T.delete(S), T.size === 0 && listeners.delete(C))
                : T.set(S, O);
            }
          (root_event_handles.delete(g), m !== r && m.parentNode?.removeChild(m));
        }
      );
    });
  return (mounted_components.set(p, d), p);
}
let mounted_components = new WeakMap();
function unmount(e, t) {
  const r = mounted_components.get(e);
  return r ? (mounted_components.delete(e), r(t)) : Promise.resolve();
}
class BranchManager {
  anchor;
  #e = new Map();
  #t = new Map();
  #n = new Map();
  #r = new Set();
  #o = !0;
  constructor(t, r = !0) {
    ((this.anchor = t), (this.#o = r));
  }
  #a = () => {
    var t = current_batch;
    if (this.#e.has(t)) {
      var r = this.#e.get(t),
        o = this.#t.get(r);
      if (o) (resume_effect(o), this.#r.delete(r));
      else {
        var s = this.#n.get(r);
        s &&
          (this.#t.set(r, s.effect),
          this.#n.delete(r),
          s.fragment.lastChild.remove(),
          this.anchor.before(s.fragment),
          (o = s.effect));
      }
      for (const [i, u] of this.#e) {
        if ((this.#e.delete(i), i === t)) break;
        const l = this.#n.get(u);
        l && (destroy_effect(l.effect), this.#n.delete(u));
      }
      for (const [i, u] of this.#t) {
        if (i === r || this.#r.has(i)) continue;
        const l = () => {
          if (Array.from(this.#e.values()).includes(i)) {
            var d = document.createDocumentFragment();
            (move_effect(u, d), d.append(create_text()), this.#n.set(i, {effect: u, fragment: d}));
          } else destroy_effect(u);
          (this.#r.delete(i), this.#t.delete(i));
        };
        this.#o || !o ? (this.#r.add(i), pause_effect(u, l, !1)) : l();
      }
    }
  };
  #s = (t) => {
    this.#e.delete(t);
    const r = Array.from(this.#e.values());
    for (const [o, s] of this.#n) r.includes(o) || (destroy_effect(s.effect), this.#n.delete(o));
  };
  ensure(t, r) {
    var o = current_batch,
      s = should_defer_append();
    if (r && !this.#t.has(t) && !this.#n.has(t))
      if (s) {
        var i = document.createDocumentFragment(),
          u = create_text();
        (i.append(u), this.#n.set(t, {effect: branch(() => r(u)), fragment: i}));
      } else
        this.#t.set(
          t,
          branch(() => r(this.anchor)),
        );
    if ((this.#e.set(o, t), s)) {
      for (const [l, p] of this.#t) l === t ? o.unskip_effect(p) : o.skip_effect(p);
      for (const [l, p] of this.#n) l === t ? o.unskip_effect(p.effect) : o.skip_effect(p.effect);
      (o.oncommit(this.#a), o.ondiscard(this.#s));
    } else this.#a();
  }
}
function snippet(e, t, ...r) {
  var o = new BranchManager(e);
  block(() => {
    const s = t() ?? null;
    o.ensure(s, s && ((i) => s(i, ...r)));
  }, EFFECT_TRANSPARENT);
}
function onMount(e) {
  (component_context === null && lifecycle_outside_component(),
    legacy_mode_flag && component_context.l !== null
      ? init_update_callbacks(component_context).m.push(e)
      : user_effect(() => {
          const t = untrack(e);
          if (typeof t == 'function') return t;
        }));
}
function init_update_callbacks(e) {
  var t = e.l;
  return (t.u ??= {a: [], b: [], m: []});
}
function if_block(e, t, r = !1) {
  var o = new BranchManager(e),
    s = r ? EFFECT_TRANSPARENT : 0;
  function i(u, l) {
    o.ensure(u, l);
  }
  block(() => {
    var u = !1;
    (t((l, p = 0) => {
      ((u = !0), i(p, l));
    }),
      u || i(!1, null));
  }, s);
}
function component(e, t, r) {
  var o = new BranchManager(e);
  block(() => {
    var s = t() ?? null;
    o.ensure(s, s && ((i) => r(i, s)));
  }, EFFECT_TRANSPARENT);
}
let is_store_binding = !1;
function capture_store_binding(e) {
  var t = is_store_binding;
  try {
    return ((is_store_binding = !1), [e(), is_store_binding]);
  } finally {
    is_store_binding = t;
  }
}
const rest_props_handler = {
  get(e, t) {
    if (!e.exclude.includes(t)) return e.props[t];
  },
  set(e, t) {
    return !1;
  },
  getOwnPropertyDescriptor(e, t) {
    if (!e.exclude.includes(t) && t in e.props) return {enumerable: !0, configurable: !0, value: e.props[t]};
  },
  has(e, t) {
    return e.exclude.includes(t) ? !1 : t in e.props;
  },
  ownKeys(e) {
    return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t));
  },
};
function rest_props(e, t, r) {
  return new Proxy({props: e, exclude: t}, rest_props_handler);
}
const spread_props_handler = {
  get(e, t) {
    let r = e.props.length;
    for (; r--; ) {
      let o = e.props[r];
      if ((is_function(o) && (o = o()), typeof o == 'object' && o !== null && t in o)) return o[t];
    }
  },
  set(e, t, r) {
    let o = e.props.length;
    for (; o--; ) {
      let s = e.props[o];
      is_function(s) && (s = s());
      const i = get_descriptor(s, t);
      if (i && i.set) return (i.set(r), !0);
    }
    return !1;
  },
  getOwnPropertyDescriptor(e, t) {
    let r = e.props.length;
    for (; r--; ) {
      let o = e.props[r];
      if ((is_function(o) && (o = o()), typeof o == 'object' && o !== null && t in o)) {
        const s = get_descriptor(o, t);
        return (s && !s.configurable && (s.configurable = !0), s);
      }
    }
  },
  has(e, t) {
    if (t === STATE_SYMBOL || t === LEGACY_PROPS) return !1;
    for (let r of e.props) if ((is_function(r) && (r = r()), r != null && t in r)) return !0;
    return !1;
  },
  ownKeys(e) {
    const t = [];
    for (let r of e.props)
      if ((is_function(r) && (r = r()), !!r)) {
        for (const o in r) t.includes(o) || t.push(o);
        for (const o of Object.getOwnPropertySymbols(r)) t.includes(o) || t.push(o);
      }
    return t;
  },
};
function spread_props(...e) {
  return new Proxy({props: e}, spread_props_handler);
}
function prop(e, t, r, o) {
  var s = !legacy_mode_flag || (r & PROPS_IS_RUNES) !== 0,
    i = (r & PROPS_IS_BINDABLE) !== 0,
    u = (r & PROPS_IS_LAZY_INITIAL) !== 0,
    l = o,
    p = !0,
    d = () => (p && ((p = !1), (l = u ? untrack(o) : o)), l),
    m;
  if (i) {
    var y = STATE_SYMBOL in e || LEGACY_PROPS in e;
    m = get_descriptor(e, t)?.set ?? (y && t in e ? (x) => (e[t] = x) : void 0);
  }
  var g,
    S = !1;
  (i ? ([g, S] = capture_store_binding(() => e[t])) : (g = e[t]),
    g === void 0 && o !== void 0 && ((g = d()), m && (s && props_invalid_value(), m(g))));
  var T;
  if (
    (s
      ? (T = () => {
          var x = e[t];
          return x === void 0 ? d() : ((p = !0), x);
        })
      : (T = () => {
          var x = e[t];
          return (x !== void 0 && (l = void 0), x === void 0 ? l : x);
        }),
    s && (r & PROPS_IS_UPDATED) === 0)
  )
    return T;
  if (m) {
    var O = e.$$legacy;
    return function (x, J) {
      return arguments.length > 0 ? ((!s || !J || O || S) && m(J ? T() : x), x) : T();
    };
  }
  var C = !1,
    D = ((r & PROPS_IS_IMMUTABLE) !== 0 ? derived : derived_safe_equal)(() => ((C = !1), T()));
  i && get(D);
  var R = active_effect;
  return function (x, J) {
    if (arguments.length > 0) {
      const K = J ? get(D) : s && i ? proxy(x) : x;
      return (set(D, K), (C = !0), l !== void 0 && (l = K), x);
    }
    return (is_destroying_effect && C) || (R.f & DESTROYED) !== 0 ? D.v : get(D);
  };
}
function DecoratorHandler(e, t) {
  push(t, !0);
  let r = user_derived(() => Object.fromEntries(Object.entries(t.props).filter(([l]) => !l.startsWith('event_'))));
  var o = comment(),
    s = first_child(o);
  {
    var i = (l) => {
        var p = comment(),
          d = first_child(p);
        (component(
          d,
          () => t.decorator.Component,
          (m, y) => {
            y(
              m,
              spread_props(() => t.decorator.props, {
                children: (g, S) => {
                  var T = comment(),
                    O = first_child(T);
                  (component(
                    O,
                    () => t.Component,
                    (C, D) => {
                      D(
                        C,
                        spread_props(() => get(r)),
                      );
                    },
                  ),
                    append(g, T));
                },
                $$slots: {default: !0},
              }),
            );
          },
        ),
          append(l, p));
      },
      u = (l) => {
        var p = comment(),
          d = first_child(p);
        (component(
          d,
          () => t.Component,
          (m, y) => {
            y(
              m,
              spread_props(() => get(r)),
            );
          },
        ),
          append(l, p));
      };
    if_block(s, (l) => {
      t.decorator ? l(i) : l(u, !1);
    });
  }
  (append(e, o), pop());
}
function dedent(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  var o = Array.from(typeof e == 'string' ? [e] : e);
  o[o.length - 1] = o[o.length - 1].replace(/\r?\n([\t ]*)$/, '');
  var s = o.reduce(function (l, p) {
    var d = p.match(/\n([\t ]+|(?!\s).)/g);
    return d
      ? l.concat(
          d.map(function (m) {
            var y, g;
            return (g = (y = m.match(/[\t ]/g)) === null || y === void 0 ? void 0 : y.length) !== null && g !== void 0
              ? g
              : 0;
          }),
        )
      : l;
  }, []);
  if (s.length) {
    var i = new RegExp(
      `
[	 ]{` +
        Math.min.apply(Math, s) +
        '}',
      'g',
    );
    o = o.map(function (l) {
      return l.replace(
        i,
        `
`,
      );
    });
  }
  o[0] = o[0].replace(/^\r?\n/, '');
  var u = o[0];
  return (
    t.forEach(function (l, p) {
      var d = u.match(/(?:^|\n)( *)$/),
        m = d ? d[1] : '',
        y = l;
      (typeof l == 'string' &&
        l.includes(`
`) &&
        (y = String(l)
          .split(
            `
`,
          )
          .map(function (g, S) {
            return S === 0 ? g : '' + m + g;
          }).join(`
`)),
        (u += y + o[p + 1]));
    }),
    u
  );
}
var root_1 = from_html('<div id="sb-pending-async-component-notice">Pending async component...</div>');
function PreviewRender(e, t) {
  push(t, !0);
  let r = user_derived(() => t.storyFn()),
    o = user_derived(() => get(r).Component),
    s = user_derived(() => fallback(get(r).props, () => ({}), !0));
  user_effect(() => {
    get(o) ||
      t.showError({
        title: `Expecting a Svelte component from the story: "${t.name}" of "${t.title}".`,
        description: dedent`
        Did you forget to return the Svelte component configuration from the story?
        Use "() => ({ Component: YourComponent, props: {} })"
        when defining the story.
      `,
      });
  });
  var i = comment(),
    u = first_child(i);
  (boundary(
    u,
    {
      pending: (p) => {
        var d = root_1();
        append(p, d);
      },
    },
    (p) => {
      DecoratorHandler(p, {
        get Component() {
          return get(o);
        },
        get props() {
          return get(s);
        },
      });
    },
  ),
    append(e, i),
    pop());
}
const createReactiveProps = (e) => proxy(e);
var entry_preview_exports = {};
__export$3(entry_preview_exports, {
  applyDecorators: () => decorateStory,
  argTypesEnhancers: () => argTypesEnhancers,
  mount: () => mount2,
  parameters: () => parameters$1,
  render: () => render,
  renderToCanvas: () => renderToCanvas,
});
const {logger} = __STORYBOOK_MODULE_CLIENT_LOGGER__;
function hasKeyword(e, t) {
  return t ? t.find((r) => r.name === e) != null : !1;
}
var extractArgTypes = (e) => {
    try {
      let t = e.__docgen;
      if (t) return createArgTypes(t);
    } catch (t) {
      logger.log(`Error extracting argTypes: ${t}`);
    }
    return {};
  },
  createArgTypes = (e) => {
    let t = {};
    return (
      e.data &&
        e.data.forEach((r) => {
          t[r.name] = {
            ...parseTypeToControl(r.type),
            name: r.name,
            description: r.description || void 0,
            type: {
              required: hasKeyword('required', r.keywords || []),
              name: r.type?.text === '{}' ? 'object' : r.type?.text,
            },
            table: {type: {summary: r.type?.text}, defaultValue: {summary: r.defaultValue}, category: 'properties'},
          };
        }),
      e.events &&
        e.events.forEach((r) => {
          t[`event_${r.name}`] = {
            name: r.name,
            action: r.name,
            control: !1,
            ...(r.description ? {description: r.description} : {}),
            table: {category: 'events'},
          };
        }),
      e.slots &&
        e.slots.forEach((r) => {
          t[`slot_${r.name}`] = {
            name: r.name,
            control: !1,
            description: [r.description, r.params?.map((o) => `\`${o.name}\``).join(' ')].filter((o) => o).join(`

`),
            table: {category: 'slots'},
          };
        }),
      t
    );
  },
  parseTypeToControl = (e) => {
    if (!e) return null;
    if (e.kind === 'type')
      switch (e.type) {
        case 'string':
          return {control: {type: 'text'}};
        case 'any':
          return {control: {type: 'object'}};
        default:
          return {control: {type: e.type}};
      }
    else if (e.kind === 'union') {
      if (
        Array.isArray(e.type) &&
        !e.type.some((t) => t.kind !== 'const' || !['string', 'number', 'null', 'undefined'].includes(t.type))
      ) {
        let t = e.type.map((r) => r.value);
        return {control: {type: 'radio'}, options: t};
      }
    } else if (e.kind === 'function') return {control: null};
    return null;
  };
function extractComponentDescription(e) {
  return e?.__docgen?.description || '';
}
const {RESET_STORY_ARGS} = __STORYBOOK_MODULE_CORE_EVENTS__,
  {addons: addons$1} = __STORYBOOK_MODULE_PREVIEW_API__;
var storyIdsToRemountFromResetArgsEvent = new Set();
addons$1.getChannel().on(RESET_STORY_ARGS, ({storyId: e}) => {
  storyIdsToRemountFromResetArgsEvent.add(e);
});
var componentsByDomElement = new Map();
async function renderToCanvas(
  {storyFn: e, title: t, name: r, showMain: o, showError: s, storyContext: i, forceRemount: u},
  l,
) {
  function p(y) {
    let {mountedComponent: g} = componentsByDomElement.get(y) ?? {};
    g && (unmount(g), componentsByDomElement.delete(y));
  }
  let d = componentsByDomElement.get(l),
    m = u;
  if (
    (storyIdsToRemountFromResetArgsEvent.has(i.id) && ((m = !0), storyIdsToRemountFromResetArgsEvent.delete(i.id)),
    m && p(l),
    !d || m)
  ) {
    let y = createReactiveProps({storyFn: e, storyContext: i, name: r, title: t, showError: s}),
      g = mount(PreviewRender, {target: l, props: y});
    (componentsByDomElement.set(l, {mountedComponent: g, props: y}), await tick());
  } else (Object.assign(d.props, {storyFn: e, storyContext: i, name: r, title: t, showError: s}), await tick());
  return (
    o(),
    () => {
      p(l);
    }
  );
}
var render = (e, t) => {
  let {id: r, component: o} = t;
  if (!o) throw new Error(`Unable to render story ${r} as the component annotation is missing from the default export`);
  return {Component: o, props: e};
};
const {sanitizeStoryContextUpdate} = __STORYBOOK_MODULE_PREVIEW_API__;
function unWrap(e) {
  return e && typeof e == 'object' && 'default' in e ? e.default : e;
}
function prepareStory(e, t, r) {
  let o = unWrap(t),
    s = r && unWrap(r),
    i;
  return (
    !o || Object.keys(o).length === 0 ? (i = {Component: e.component}) : o.Component ? (i = o) : (i = {Component: o}),
    s ? {Component: DecoratorHandler, props: {...s, decorator: i}} : {...i, argTypes: e.argTypes}
  );
}
function decorateStory(e, t) {
  return t.reduce(
    (r, o) => (s) => {
      let i,
        u = o((l) => ((i = r({...s, ...sanitizeStoryContextUpdate(l)})), i), s);
      return (i || (i = r(s)), u === i ? i : prepareStory(s, u, i));
    },
    (r) => prepareStory(r, e(r)),
  );
}
var mount2 = (e) => async (t, r) => (
    t && (e.originalStoryFn = () => ({Component: t, props: r && 'props' in r ? r?.props : r})),
    await e.renderToCanvas(),
    e.canvas
  ),
  parameters$1 = {renderer: 'svelte', docs: {story: {inline: !0}, extractArgTypes, extractComponentDescription}},
  argTypesEnhancers = [enhanceArgTypes];
const entry_preview_9460 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        applyDecorators: decorateStory,
        argTypesEnhancers,
        mount: mount2,
        parameters: parameters$1,
        render,
        renderToCanvas,
      },
      Symbol.toStringTag,
      {value: 'Module'},
    ),
  ),
  {deprecate} = __STORYBOOK_MODULE_CLIENT_LOGGER__,
  {emitTransformCode, useEffect, useRef} = __STORYBOOK_MODULE_PREVIEW_API__;
var skipSourceRender = (e) => {
  let t = e?.parameters.docs?.source,
    r = e?.parameters.__isArgsStory;
  return (e?.tags ?? []).some((o) => o.startsWith('svelte-csf'))
    ? !0
    : t?.type === SourceType.DYNAMIC
      ? !1
      : !r || t?.code || t?.type === SourceType.CODE;
};
function toSvelteProperty(e, t, r) {
  if (t == null) return null;
  let o = r[e];
  return (o && o.defaultValue === t) || (o && o.action)
    ? null
    : t === !0
      ? e
      : typeof t == 'string'
        ? `${e}=${JSON.stringify(t)}`
        : typeof t == 'function'
          ? `${e}={<handler>}`
          : `${e}={${JSON.stringify(t)}}`;
}
function getComponentName(e) {
  if (e == null) return null;
  let {__docgen: t = {}} = e,
    {name: r} = t;
  return r ? (r.endsWith('.svelte') && (r = r.substring(0, r.length - 7)), r) : e.name;
}
function generateSvelteSource(e, t, r, o) {
  let s = getComponentName(e);
  if (!s) return null;
  let i = Object.entries(t)
      .filter(([m]) => m !== o)
      .map(([m, y]) => toSvelteProperty(m, y, r))
      .filter((m) => m),
    u = i.join(' '),
    l = u.length > 50,
    p = o ? t[o] : null,
    d = l
      ? `<${s}
  ${i.join(`
  `)}`
      : `<${s} ${u}`;
  return p
    ? `${d}>
    ${p}
</${s}>`
    : `${d}/>`;
}
function getWrapperProperties(e) {
  let {__docgen: t} = e || {};
  return t
    ? t.keywords?.find((r) => r.name === 'wrapper')
      ? {wrapper: !0, slotProperty: t.data?.find((r) => r.keywords.find((o) => o.name === 'slot'))?.name}
      : {wrapper: !1}
    : {wrapper: !1};
}
var sourceDecorator = (e, t) => {
    let r = skipSourceRender(t),
      o = e(),
      s = useRef(void 0);
    return (
      useEffect(() => {
        if (r) return;
        let {parameters: i = {}, args: u = {}, component: l} = t || {},
          {Component: p} = t.originalStoryFn(u, t),
          {wrapper: d, slotProperty: m} = getWrapperProperties(p);
        d &&
          (i.component && deprecate('parameters.component is deprecated. Using context.component instead.'), (p = l));
        let y = generateSvelteSource(p, u, t?.argTypes, m);
        y && s.current !== y && (emitTransformCode(y, t), (s.current = y));
      }),
      o
    );
  },
  decorators$1 = [sourceDecorator];
const entry_preview_docs_9930 = Object.freeze(
  Object.defineProperty({__proto__: null, decorators: decorators$1}, Symbol.toStringTag, {value: 'Module'}),
);
var __defProp$1 = Object.defineProperty,
  __export$1 = (e, t) => {
    for (var r in t) __defProp$1(e, r, {get: t[r], enumerable: !0});
  };
async function goto(...e) {
  let t = new CustomEvent('storybook:goto', {detail: e});
  window.dispatchEvent(t);
}
function setAfterNavigateArgument(e) {
  setContext('after-navigate-args', e);
}
function createMockedStore(e) {
  return [
    {
      subscribe(t) {
        let r = getContext(e);
        return (t(r), () => {});
      },
    },
    (t) => {
      setContext(e, t);
    },
  ];
}
var [page$1, setAppStoresPage] = createMockedStore('page-ctx'),
  [navigating$1, setAppStoresNavigating] = createMockedStore('navigating-ctx'),
  [updated$1, setAppStoresUpdated] = createMockedStore('updated-ctx');
updated$1.check = () => {};
const {action} = __STORYBOOK_MODULE_ACTIONS__;
function MockProvider(e, t) {
  push(t, !0);
  const r = prop(t, 'svelteKitParameters', 19, () => ({}));
  (setAppStoresPage(r()?.stores?.page),
    setAppStoresNavigating(r()?.stores?.navigating),
    setAppStoresUpdated(r()?.stores?.updated),
    setAfterNavigateArgument(r()?.navigation?.afterNavigate));
  const o = (u) => (typeof u == 'function' ? {callback: u, asRegex: !1} : u);
  onMount(() => {
    const u = (m) => {
      const g = m.composedPath().findLast((S) => S instanceof HTMLElement && S.tagName === 'A');
      if (g && g instanceof HTMLAnchorElement) {
        const S = g.getAttribute('href');
        if (!S) return;
        m.preventDefault();
        const T = () => action('navigate')(S, m);
        if (!r().hrefs) {
          T();
          return;
        }
        let O = !0;
        (Object.entries(r().hrefs).forEach(([C, D]) => {
          const {callback: R, asRegex: x} = o(D);
          (x ? new RegExp(C).test(S) : S === C) && ((O = !1), R?.(S, m));
        }),
          O && T());
      }
    };
    function l(m, y, g) {
      const S = [];
      return (
        y.forEach((T) => {
          const O = r()[m]?.[T] && r()[m][T] instanceof Function;
          if (O || g) {
            const C = ({detail: R = []}) => {
                const x = Array.isArray(R) ? R : [];
                (O ? r()[m][T] : action(T))(...x);
              },
              D = `storybook:${T}`;
            (S.push({eventType: D, listener: C}), window.addEventListener(D, C));
          }
        }),
        () => {
          S.forEach(({eventType: T, listener: O}) => {
            window.removeEventListener(T, O);
          });
        }
      );
    }
    const p = l('navigation', ['goto', 'invalidate', 'invalidateAll', 'pushState', 'replaceState'], !0),
      d = l('forms', ['enhance']);
    return (
      window.addEventListener('click', u),
      () => {
        (window.removeEventListener('click', u), p(), d());
      }
    );
  });
  var s = comment(),
    i = first_child(s);
  (snippet(i, () => t.children), append(e, s), pop());
}
const {fn} = __STORYBOOK_MODULE_TEST__,
  defaultStatePageValues = {
    data: {},
    form: null,
    error: null,
    params: {},
    route: {id: null},
    state: {},
    status: -1,
    url: new URL(location.origin),
  };
let pageData = state(defaultStatePageValues.data),
  pageForm = state(defaultStatePageValues.form),
  pageError = state(defaultStatePageValues.error),
  pageParams = state(defaultStatePageValues.params),
  pageRoute = state(defaultStatePageValues.route),
  pageState = state(defaultStatePageValues.state),
  pageStatus = state(defaultStatePageValues.status),
  pageUrl = state(defaultStatePageValues.url),
  page = {
    get data() {
      return get(pageData);
    },
    set data(e) {
      set(pageData, e);
    },
    get form() {
      return get(pageForm);
    },
    set form(e) {
      set(pageForm, e);
    },
    get error() {
      return get(pageError);
    },
    set error(e) {
      set(pageError, e);
    },
    get params() {
      return get(pageParams);
    },
    set params(e) {
      set(pageParams, e);
    },
    get route() {
      return get(pageRoute);
    },
    set route(e) {
      set(pageRoute, e);
    },
    get state() {
      return get(pageState);
    },
    set state(e) {
      set(pageState, e);
    },
    get status() {
      return get(pageStatus);
    },
    set status(e) {
      set(pageStatus, e);
    },
    get url() {
      return get(pageUrl);
    },
    set url(e) {
      set(pageUrl, e);
    },
  };
function setAppStatePage(e = {}) {
  ((page.data = e.data ?? defaultStatePageValues.data),
    (page.form = e.form ?? defaultStatePageValues.form),
    (page.error = e.error ?? defaultStatePageValues.error),
    (page.params = e.params ?? defaultStatePageValues.params),
    (page.route = e.route ?? defaultStatePageValues.route),
    (page.state = e.state ?? defaultStatePageValues.state),
    (page.status = e.status ?? defaultStatePageValues.status),
    (page.url = e.url ?? defaultStatePageValues.url));
}
const defaultStateNavigatingValues = {from: null, to: null, type: null, willUnload: null, delta: null, complete: null};
let navigatingFrom = state(defaultStateNavigatingValues.from),
  navigatingTo = state(defaultStateNavigatingValues.to),
  navigatingType = state(defaultStateNavigatingValues.type),
  navigatingWillUnload = state(defaultStateNavigatingValues.willUnload),
  navigatingDelta = state(defaultStateNavigatingValues.delta),
  navigatingComplete = state(defaultStateNavigatingValues.complete),
  navigating = {
    get from() {
      return get(navigatingFrom);
    },
    set from(e) {
      set(navigatingFrom, e);
    },
    get to() {
      return get(navigatingTo);
    },
    set to(e) {
      set(navigatingTo, e);
    },
    get type() {
      return get(navigatingType);
    },
    set type(e) {
      set(navigatingType, e);
    },
    get willUnload() {
      return get(navigatingWillUnload);
    },
    set willUnload(e) {
      set(navigatingWillUnload, e);
    },
    get delta() {
      return get(navigatingDelta);
    },
    set delta(e) {
      set(navigatingDelta, e);
    },
    get complete() {
      return get(navigatingComplete);
    },
    set complete(e) {
      set(navigatingComplete, e);
    },
  };
function setAppStateNavigating(e = {}) {
  ((navigating.from = e.from ?? defaultStateNavigatingValues.from),
    (navigating.to = e.to ?? defaultStateNavigatingValues.to),
    (navigating.type = e.type ?? defaultStateNavigatingValues.type),
    (navigating.willUnload = e.willUnload ?? defaultStateNavigatingValues.willUnload),
    (navigating.delta = e.delta ?? defaultStateNavigatingValues.delta),
    (navigating.complete = e.complete ?? defaultStateNavigatingValues.complete));
}
let updatedCurrent = state(!1),
  updated = {
    get current() {
      return get(updatedCurrent);
    },
    set current(e) {
      set(updatedCurrent, e);
    },
    check: fn(() => Promise.resolve(get(updatedCurrent))),
  };
function setAppStateUpdated(e = {}) {
  updated.current = e.current ?? !1;
}
var preview_exports$1 = {};
__export$1(preview_exports$1, {beforeEach: () => beforeEach, decorators: () => decorators});
var svelteKitMocksDecorator = (e, t) => {
    let r = t.parameters?.sveltekit_experimental ?? {};
    return {Component: MockProvider, props: {svelteKitParameters: r}};
  },
  decorators = [svelteKitMocksDecorator],
  beforeEach = async (e) => {
    let t = e.parameters?.sveltekit_experimental ?? {};
    (setAppStatePage(t?.state?.page),
      setAppStateNavigating(t?.state?.navigating),
      setAppStateUpdated(t?.state?.updated));
  };
const preview_9181 = Object.freeze(
  Object.defineProperty({__proto__: null, beforeEach, decorators}, Symbol.toStringTag, {value: 'Module'}),
);
var __create = Object.create,
  __defProp = Object.defineProperty,
  __getOwnPropDesc = Object.getOwnPropertyDescriptor,
  __getOwnPropNames = Object.getOwnPropertyNames,
  __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty,
  __commonJS = (e, t) =>
    function () {
      return (t || (0, e[__getOwnPropNames(e)[0]])((t = {exports: {}}).exports, t), t.exports);
    },
  __export = (e, t) => {
    for (var r in t) __defProp(e, r, {get: t[r], enumerable: !0});
  },
  __copyProps = (e, t, r, o) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let s of __getOwnPropNames(t))
        !__hasOwnProp.call(e, s) &&
          s !== r &&
          __defProp(e, s, {get: () => t[s], enumerable: !(o = __getOwnPropDesc(t, s)) || o.enumerable});
    return e;
  },
  __toESM = (e, t, r) => (
    (r = e != null ? __create(__getProtoOf(e)) : {}),
    __copyProps(__defProp(r, 'default', {value: e, enumerable: !0}), e)
  ),
  preview_exports = {};
__export(preview_exports, {parameters: () => parameters});
var excludeTags = Object.entries(globalThis.TAGS_OPTIONS ?? {}).reduce((e, t) => {
    let [r, o] = t;
    return (o.excludeFromDocsStories && (e[r] = !0), e);
  }, {}),
  parameters = {
    docs: {
      renderer: async () => {
        let {DocsRenderer: e} = await __vitePreload(
          async () => {
            const {DocsRenderer: t} = await import('./DocsRenderer-LL677BLK-DtpHh83m.js').then((r) => r.D);
            return {DocsRenderer: t};
          },
          __vite__mapDeps([6, 2]),
          import.meta.url,
        );
        return new e();
      },
      stories: {
        filter: (e) => (e.tags || []).filter((t) => excludeTags[t]).length === 0 && !e.parameters.docs?.disable,
      },
    },
  };
const preview_8699 = Object.freeze(
    Object.defineProperty({__proto__: null, parameters}, Symbol.toStringTag, {value: 'Module'}),
  ),
  {addons} = __STORYBOOK_MODULE_PREVIEW_API__,
  FRAME_TIME_60FPS = 16.67,
  DROPPED_FRAME_MULTIPLIER = 2,
  THRASHING_FRAME_THRESHOLD = 50,
  THRASHING_STYLE_WRITE_WINDOW = 50,
  INTERACTION_LATENCIES_WINDOW = 50,
  FRAME_TIMES_WINDOW = 60,
  INPUT_LATENCIES_WINDOW = 30,
  PAINT_TIMES_WINDOW = 30,
  SPARKLINE_HISTORY_SIZE = 30,
  JITTER_BASELINE_SIZE = 5,
  JITTER_MULTIPLIER = 3,
  JITTER_INPUT_DELTA = 30,
  JITTER_INPUT_ABSOLUTE = 50,
  JITTER_FRAME_DELTA = 20,
  JITTER_FRAME_ABSOLUTE = 40,
  JITTER_PAINT_DELTA = 20,
  JITTER_PAINT_ABSOLUTE = 35,
  MAX_DECAY_THRESHOLD = 20,
  MAX_DECAY_RATE = 0.99,
  MAX_INPUT_DECAY_THRESHOLD = 20,
  MAX_INPUT_DECAY_RATE = 0.98,
  MAX_PAINT_DECAY_THRESHOLD = 10,
  MAX_PAINT_DECAY_RATE = 0.98;
function getSimpleSelector(e) {
  if (!e) return 'unknown';
  if (e.id) return `#${e.id}`;
  const t = e.getAttribute('elementtiming');
  if (t) return `[elementtiming="${t}"]`;
  const r = e.className
    ? `.${e.className
        .split(/\s+/)
        .filter((o) => o)
        .slice(0, 2)
        .join('.')}`
    : '';
  return `${e.tagName.toLowerCase()}${r}`;
}
var ElementTimingCollector = class {
    #e = null;
    #t = !1;
    #n = [];
    #r = 0;
    #o = 0;
    constructor() {
      this.#t = this.#a();
    }
    #a() {
      try {
        return typeof PerformanceObserver < 'u' && PerformanceObserver.supportedEntryTypes.includes('element');
      } catch {
        return !1;
      }
    }
    start() {
      if (this.#t) {
        this.#o = performance.now();
        try {
          ((this.#e = new PerformanceObserver((e) => {
            for (const t of e.getEntries()) this.#s(t);
          })),
            this.#e.observe({type: 'element', buffered: !0}));
        } catch {
          this.#t = !1;
        }
      }
    }
    #s(e) {
      const t = e.renderTime || e.loadTime || 0;
      if (t < this.#o) return;
      const r = {
        identifier: e.identifier || 'unnamed',
        renderTime: t,
        loadTime: e.loadTime || 0,
        selector: getSimpleSelector(e.element),
        tagName: e.element?.tagName.toLowerCase() ?? 'unknown',
      };
      (e.naturalWidth && ((r.naturalWidth = e.naturalWidth), (r.naturalHeight = e.naturalHeight)),
        e.url && (r.url = e.url),
        this.#n.push(r),
        t > this.#r && (this.#r = t));
    }
    stop() {
      (this.#e?.disconnect(), (this.#e = null));
    }
    reset() {
      ((this.#n = []), (this.#r = 0), (this.#o = performance.now()));
    }
    getMetrics() {
      return {
        elementTimingSupported: this.#t,
        elements: this.#n,
        largestRenderTime: this.#r,
        elementCount: this.#n.length,
      };
    }
  },
  ForcedReflowCollector = class Jr {
    #e = 0;
    #t = !1;
    #n = null;
    static #r = null;
    static #o = [
      'offsetTop',
      'offsetLeft',
      'offsetWidth',
      'offsetHeight',
      'scrollTop',
      'scrollLeft',
      'scrollWidth',
      'scrollHeight',
      'clientTop',
      'clientLeft',
      'clientWidth',
      'clientHeight',
    ];
    static #a = [
      'width',
      'height',
      'minWidth',
      'minHeight',
      'maxWidth',
      'maxHeight',
      'padding',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'margin',
      'marginTop',
      'marginRight',
      'marginBottom',
      'marginLeft',
      'borderWidth',
      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
      'display',
      'position',
      'top',
      'left',
      'right',
      'bottom',
      'fontSize',
      'lineHeight',
      'boxSizing',
      'overflow',
    ];
    markLayoutDirty() {
      ((this.#t = !0),
        this.#n && clearTimeout(this.#n),
        (this.#n = setTimeout(() => {
          this.#t = !1;
        }, 0)));
    }
    start() {
      Jr.#r ||
        (Jr.#r = {
          initialized: !1,
          originalGetters: new Map(),
          originalStyleSetters: new Map(),
          originalSetProperty: null,
          activeCollectors: new Set(),
          currentCollector: null,
        });
      const t = Jr.#r;
      if ((t.activeCollectors.add(this), (t.currentCollector = this), !t.initialized)) {
        t.initialized = !0;
        for (const o of Jr.#o) {
          const s = Object.getOwnPropertyDescriptor(HTMLElement.prototype, o);
          s?.get &&
            (t.originalGetters.set(o, s),
            Object.defineProperty(HTMLElement.prototype, o, {
              get() {
                const i = Jr.#r?.currentCollector;
                return (i && i.#t && (i.#e++, (i.#t = !1)), s.get?.call(this));
              },
              configurable: !0,
            }));
        }
        for (const o of Jr.#a) {
          const s = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, o);
          if (s?.set) {
            t.originalStyleSetters.set(o, s);
            const i = s.set;
            Object.defineProperty(CSSStyleDeclaration.prototype, o, {
              ...s,
              set(u) {
                (Jr.#r?.currentCollector?.markLayoutDirty(), i.call(this, u));
              },
            });
          }
        }
        const r = CSSStyleDeclaration.prototype.setProperty;
        ((t.originalSetProperty = r),
          (CSSStyleDeclaration.prototype.setProperty = function (o, s, i) {
            (Jr.#r?.currentCollector?.markLayoutDirty(), r.call(this, o, s, i ?? ''));
          }));
      }
    }
    stop() {
      this.#n && (clearTimeout(this.#n), (this.#n = null));
      const t = Jr.#r;
      if (
        t &&
        (t.activeCollectors.delete(this),
        t.currentCollector === this && (t.currentCollector = null),
        t.activeCollectors.size === 0 && t.initialized)
      ) {
        for (const [r, o] of t.originalGetters) Object.defineProperty(HTMLElement.prototype, r, o);
        t.originalGetters.clear();
        for (const [r, o] of t.originalStyleSetters) Object.defineProperty(CSSStyleDeclaration.prototype, r, o);
        (t.originalStyleSetters.clear(),
          t.originalSetProperty &&
            ((CSSStyleDeclaration.prototype.setProperty = t.originalSetProperty), (t.originalSetProperty = null)),
          (t.initialized = !1));
      }
    }
    reset() {
      ((this.#e = 0), (this.#t = !1));
    }
    getMetrics() {
      return {forcedReflowCount: this.#e};
    }
  };
function computeAverage(e) {
  return e.length === 0 ? 0 : e.reduce((t, r) => t + r, 0) / e.length;
}
function computeStdDev(e) {
  if (e.length < 2) return 0;
  const t = computeAverage(e),
    r = e.map((o) => (o - t) ** 2);
  return Math.sqrt(r.reduce((o, s) => o + s, 0) / (e.length - 1));
}
function computeFrameStability(e) {
  if (e.length < 2) return 100;
  const t = computeAverage(e);
  if (t === 0) return 100;
  const r = computeStdDev(e) / t;
  return Math.max(0, Math.min(100, Math.round((1 - r) * 100)));
}
function computePercentile(e, t) {
  if (e.length === 0) return 0;
  if (e.length === 1) return e[0];
  const r = [...e].sort((l, p) => l - p),
    o = t * (r.length - 1),
    s = Math.floor(o),
    i = Math.ceil(o),
    u = o - s;
  return s === i ? r[s] : r[s] + u * (r[i] - r[s]);
}
function computeP95(e) {
  const t = computePercentile(e, 0.95);
  return Math.round(t * 10) / 10;
}
function getMemoryMB() {
  const e = performance.memory;
  return e?.usedJSHeapSize ? Math.round((e.usedJSHeapSize / 1024 / 1024) * 10) / 10 : null;
}
function addToWindow(e, t, r) {
  (e.push(t), e.length > r && e.shift());
}
function updateMaxWithDecay(e, t, r, o) {
  return t > e ? t : t < r && e > r ? e * o : e;
}
var FrameTimingCollector = class {
    #e = [];
    #t = 0;
    #n = 0;
    #r = 0;
    #o = 0;
    #a = null;
    #s;
    constructor(e) {
      this.#s = e;
    }
    start() {
      ((this.#o = performance.now()), this.#i());
    }
    stop() {
      this.#a !== null && (cancelAnimationFrame(this.#a), (this.#a = null));
    }
    reset() {
      ((this.#e = []), (this.#t = 0), (this.#n = 0), (this.#r = 0));
    }
    getMetrics() {
      return {
        frameTimes: this.#e,
        maxFrameTime: this.#t,
        droppedFrames: this.#n,
        frameJitter: this.#r,
        frameStability: computeFrameStability(this.#e),
      };
    }
    #i = () => {
      const e = performance.now(),
        t = e - this.#o;
      ((this.#o = e), this.#u(t), this.#s?.(t), (this.#a = requestAnimationFrame(this.#i)));
    };
    #u(e) {
      if (
        (addToWindow(this.#e, e, FRAME_TIMES_WINDOW),
        (this.#t = updateMaxWithDecay(this.#t, e, MAX_DECAY_THRESHOLD, MAX_DECAY_RATE)),
        e > FRAME_TIME_60FPS * DROPPED_FRAME_MULTIPLIER && (this.#n += Math.floor(e / FRAME_TIME_60FPS) - 1),
        this.#e.length >= JITTER_BASELINE_SIZE)
      ) {
        const t = computeAverage(this.#e.slice(-JITTER_BASELINE_SIZE, -1));
        e > t * JITTER_MULTIPLIER && e - t > JITTER_FRAME_DELTA && e > JITTER_FRAME_ABSOLUTE && this.#r++;
      }
    }
  },
  InputCollector = class Aa {
    #e = [];
    #t = 0;
    #n = 0;
    #r = [];
    #o = [];
    #a = 0;
    #s = 0;
    #i = [];
    #u = 0;
    #c = [];
    #l = 0;
    #d = [];
    #f = [];
    #h = [];
    #p = new Map();
    static #b = 500;
    #_ = null;
    #v = null;
    #y = null;
    #T = null;
    #m = {};
    #g = null;
    #E = null;
    #S = !1;
    #A;
    constructor() {
      ((this.#A = this.#I.bind(this)), (this.#S = this.#w()));
    }
    #w() {
      try {
        return !!PerformanceObserver.supportedEntryTypes?.includes('event');
      } catch {
        return !1;
      }
    }
    start() {
      (window.addEventListener('pointermove', this.#A), this.#S && this.#R());
    }
    #R() {
      try {
        ((this.#g = new PerformanceObserver((t) => {
          for (const r of t.getEntries()) this.#C(r);
        })),
          this.#g.observe({type: 'event', buffered: !0, durationThreshold: 16}),
          (this.#E = new PerformanceObserver((t) => {
            const r = t.getEntries();
            if (r.length > 0 && this.#_ === null) {
              const o = r[0];
              ((this.#_ = o.processingStart - o.startTime), (this.#v = o.name));
            }
          })),
          this.#E.observe({type: 'first-input', buffered: !0}));
      } catch {
        this.#S = !1;
      }
    }
    #C(t) {
      if (t.interactionId === 0) return;
      const r = t.duration,
        o = t.interactionId,
        s = t.name;
      this.#m[s] = (this.#m[s] ?? 0) + 1;
      const i = t.processingStart - t.startTime,
        u = t.processingEnd - t.processingStart,
        l = Math.max(0, r - i - u),
        p = {
          duration: r,
          eventType: s,
          targetSelector: t.targetSelector || 'unknown',
          inputDelay: i,
          processingTime: u,
          presentationDelay: l,
        };
      ((this.#T = p),
        r > (this.#p.get(o) ?? 0) && (this.#p.set(o, r), (!this.#y || r > this.#y.duration) && (this.#y = p)),
        addToWindow(this.#d, i, INTERACTION_LATENCIES_WINDOW),
        addToWindow(this.#f, u, INTERACTION_LATENCIES_WINDOW),
        addToWindow(this.#h, l, INTERACTION_LATENCIES_WINDOW),
        (this.#u = performance.interactionCount ?? this.#p.size),
        addToWindow(this.#c, r, INTERACTION_LATENCIES_WINDOW),
        this.#p.size > Aa.#b && this.#O(),
        this.#D());
    }
    #O() {
      const t = Array.from(this.#p.entries());
      (t.sort((r, o) => o[1] - r[1]), (this.#p = new Map(t.slice(0, 100))));
    }
    #D() {
      const t = Array.from(this.#p.values());
      if (t.length === 0) {
        this.#l = 0;
        return;
      }
      t.sort((o, s) => s - o);
      const r = t.length;
      r < 50 ? (this.#l = t[0] ?? 0) : (this.#l = t[Math.floor(r * 0.02)] ?? 0);
    }
    stop() {
      (window.removeEventListener('pointermove', this.#A),
        this.#g?.disconnect(),
        this.#E?.disconnect(),
        (this.#g = null),
        (this.#E = null));
    }
    reset() {
      ((this.#e = []),
        (this.#t = 0),
        (this.#n = 0),
        (this.#r = []),
        (this.#o = []),
        (this.#a = 0),
        (this.#s = 0),
        (this.#i = []),
        (this.#u = 0),
        (this.#c = []),
        (this.#l = 0),
        (this.#d = []),
        (this.#f = []),
        (this.#h = []),
        this.#p.clear(),
        (this.#_ = null),
        (this.#v = null),
        (this.#y = null),
        (this.#T = null),
        (this.#m = {}));
    }
    getMetrics() {
      return {
        inputLatencies: this.#e,
        maxInputLatency: this.#t,
        inputJitter: this.#n,
        paintTimes: this.#o,
        maxPaintTime: this.#a,
        paintJitter: this.#s,
        eventTimingSupported: this.#S,
        interactionCount: this.#u,
        interactionLatencies: this.#c,
        inpMs: this.#l,
        avgInputDelay: computeAverage(this.#d),
        avgProcessingTime: computeAverage(this.#f),
        avgPresentationDelay: computeAverage(this.#h),
        firstInputDelay: this.#_,
        firstInputType: this.#v,
        slowestInteraction: this.#y,
        lastInteraction: this.#T,
        interactionsByType: {...this.#m},
      };
    }
    #I(t) {
      const r = t.timeStamp;
      requestAnimationFrame(() => {
        const o = performance.now(),
          s = o - r;
        (this.#P(s),
          requestAnimationFrame(() => {
            const i = performance.now() - o;
            this.#x(i);
          }));
      });
    }
    #P(t) {
      if (
        (addToWindow(this.#e, t, INPUT_LATENCIES_WINDOW),
        (this.#t = updateMaxWithDecay(this.#t, t, MAX_INPUT_DECAY_THRESHOLD, MAX_INPUT_DECAY_RATE)),
        this.#r.push(t),
        this.#r.length > 10 && this.#r.shift(),
        this.#r.length >= JITTER_BASELINE_SIZE)
      ) {
        const r = computeAverage(this.#r.slice(0, -1));
        t > r * JITTER_MULTIPLIER && t - r > JITTER_INPUT_DELTA && t > JITTER_INPUT_ABSOLUTE && this.#n++;
      }
    }
    #x(t) {
      if (
        (addToWindow(this.#o, t, PAINT_TIMES_WINDOW),
        (this.#a = updateMaxWithDecay(this.#a, t, MAX_PAINT_DECAY_THRESHOLD, MAX_PAINT_DECAY_RATE)),
        this.#i.push(t),
        this.#i.length > 10 && this.#i.shift(),
        this.#i.length >= JITTER_BASELINE_SIZE)
      ) {
        const r = computeAverage(this.#i.slice(0, -1));
        t > r * JITTER_MULTIPLIER && t - r > JITTER_PAINT_DELTA && t > JITTER_PAINT_ABSOLUTE && this.#s++;
      }
    }
  };
const SESSION_GAP_MS = 1e3,
  SESSION_MAX_DURATION_MS = 5e3;
var LayoutShiftCollector = class {
  #e = 0;
  #t = 0;
  #n = null;
  #r = null;
  #o = 0;
  #a = 0;
  #s = null;
  start() {
    try {
      ((this.#s = new PerformanceObserver((e) => {
        for (const t of e.getEntries()) this.#i(t);
      })),
        this.#s.observe({type: 'layout-shift', buffered: !0}));
    } catch {}
  }
  #i(e) {
    e.hadRecentInput ||
      (this.#o++,
      this.#n === null ||
      this.#r === null ||
      e.startTime - this.#r >= SESSION_GAP_MS ||
      e.startTime - this.#n >= SESSION_MAX_DURATION_MS
        ? (this.#t > 0 && (this.#a++, this.#t > this.#e && (this.#e = this.#t)),
          (this.#t = e.value),
          (this.#n = e.startTime))
        : (this.#t += e.value),
      (this.#r = e.startTime),
      this.#t > this.#e && (this.#e = this.#t));
  }
  stop() {
    (this.#s?.disconnect(), (this.#s = null));
  }
  reset() {
    ((this.#e = 0), (this.#t = 0), (this.#n = null), (this.#r = null), (this.#o = 0), (this.#a = 0));
  }
  getMetrics() {
    return {
      layoutShiftScore: Math.round(this.#e * 1e4) / 1e4,
      layoutShiftCount: this.#o,
      currentSessionScore: Math.round(this.#t * 1e4) / 1e4,
      sessionCount: this.#a,
    };
  }
};
const LOAF_HISTORY_WINDOW = 50;
var LongAnimationFrameCollector = class {
    #e = !1;
    #t = 0;
    #n = 0;
    #r = 0;
    #o = 0;
    #a = [];
    #s = 0;
    #i = null;
    #u = null;
    #c = null;
    constructor() {
      this.#e = this.#l();
    }
    #l() {
      try {
        return PerformanceObserver.supportedEntryTypes.includes('long-animation-frame');
      } catch {
        return !1;
      }
    }
    start() {
      if (this.#e)
        try {
          ((this.#c = new PerformanceObserver((e) => {
            for (const t of e.getEntries()) this.#d(t);
          })),
            this.#c.observe({type: 'long-animation-frame', buffered: !0}));
        } catch {
          this.#e = !1;
        }
    }
    #d(e) {
      (this.#t++, (this.#n += e.blockingDuration), addToWindow(this.#a, e.duration, LOAF_HISTORY_WINDOW));
      const t = e.scripts ?? [];
      t.length > 0 && this.#s++;
      let r = null;
      if (t.length > 0) {
        const s = [...t].sort((i, u) => u.duration - i.duration)[0];
        s &&
          (r = {
            sourceURL: s.sourceURL || 'unknown',
            sourceFunctionName: s.sourceFunctionName || 'anonymous',
            sourceCharPosition: s.sourceCharPosition,
            invokerType: s.invokerType,
            invoker: s.invoker || 'unknown',
            executionStart: s.executionStart,
            duration: s.duration,
          });
      }
      const o = {
        duration: e.duration,
        blockingDuration: e.blockingDuration,
        renderStart: e.renderStart,
        styleAndLayoutStart: e.styleAndLayoutStart,
        scriptCount: t.length,
        topScript: r,
      };
      ((this.#i = o), e.duration > this.#r && ((this.#r = e.duration), (this.#o = e.blockingDuration), (this.#u = o)));
    }
    stop() {
      (this.#c?.disconnect(), (this.#c = null));
    }
    reset() {
      ((this.#t = 0),
        (this.#n = 0),
        (this.#r = 0),
        (this.#o = 0),
        (this.#a = []),
        (this.#s = 0),
        (this.#i = null),
        (this.#u = null));
    }
    getMetrics() {
      return {
        loafSupported: this.#e,
        loafCount: this.#t,
        totalLoafBlockingDuration: Math.round(this.#n),
        longestLoafDuration: Math.round(this.#r),
        longestLoafBlockingDuration: Math.round(this.#o),
        avgLoafDuration: Math.round(computeAverage(this.#a)),
        p95LoafDuration: Math.round(computeP95(this.#a)),
        loafsWithScripts: this.#s,
        lastLoaf: this.#i,
        worstLoaf: this.#u,
      };
    }
  },
  MainThreadCollector = class {
    #e = 0;
    #t = 0;
    #n = 0;
    #r = null;
    start() {
      try {
        ((this.#r = new PerformanceObserver((e) => {
          for (const t of e.getEntries())
            (this.#e++, t.duration > this.#t && (this.#t = t.duration), (this.#n += Math.max(0, t.duration - 50)));
        })),
          this.#r.observe({type: 'longtask'}));
      } catch {}
    }
    stop() {
      (this.#r?.disconnect(), (this.#r = null));
    }
    reset() {
      ((this.#e = 0), (this.#t = 0), (this.#n = 0));
    }
    getMetrics() {
      return {longTasks: this.#e, longestTask: this.#t, totalBlockingTime: this.#n};
    }
  },
  MemoryCollector = class {
    #e = null;
    #t = null;
    #n = null;
    #r = [];
    #o = 0;
    #a = 0;
    #s = null;
    start() {
      const e = getMemoryMB();
      ((this.#e = e), (this.#t = e), (this.#n = e), (this.#a = performance.now()), (this.#s = e));
    }
    stop() {}
    reset() {
      const e = getMemoryMB();
      ((this.#e = e),
        (this.#t = e),
        (this.#n = e),
        (this.#r = []),
        (this.#o = 0),
        (this.#a = performance.now()),
        (this.#s = e));
    }
    update() {
      const e = getMemoryMB();
      e !== null &&
        ((this.#n = e),
        this.#e === null && (this.#e = e),
        (this.#t === null || e > this.#t) && (this.#t = e),
        addToWindow(this.#r, e, SPARKLINE_HISTORY_SIZE),
        this.#i(e));
    }
    getMetrics() {
      return {
        baselineMemoryMB: this.#e,
        peakMemoryMB: this.#t,
        lastMemoryMB: this.#n,
        memoryHistory: this.#r,
        gcPressure: this.#o,
      };
    }
    #i(e) {
      const t = performance.now();
      if (this.#s !== null) {
        const r = (t - this.#a) / 1e3;
        if (r > 0) {
          const o = e - this.#s;
          o > 0 ? (this.#o = o / r) : (this.#o *= 0.9);
        }
      }
      ((this.#a = t), (this.#s = e));
    }
  };
function scheduleIdle(e, t) {
  return typeof requestIdleCallback == 'function' ? requestIdleCallback(e, t) : setTimeout(e, 0);
}
function cancelIdle(e) {
  typeof cancelIdleCallback == 'function' ? cancelIdleCallback(e) : clearTimeout(e);
}
var PaintCollector = class {
  #e = 0;
  #t = 0;
  #n = null;
  #r = new Set();
  #o = new Set();
  #a = [];
  #s = !1;
  #i = null;
  #u = null;
  #c = null;
  #l = null;
  start() {
    try {
      ((this.#u = new PerformanceObserver((e) => {
        this.#e += e.getEntries().length;
      })),
        this.#u.observe({type: 'paint', buffered: !0}));
    } catch {}
    try {
      ((this.#c = new PerformanceObserver((e) => {
        for (const t of e.getEntries())
          if (t.entryType === 'resource') {
            const r = t;
            if (r.initiatorType === 'script') {
              const o = r.responseEnd - r.fetchStart;
              o > 0 && (this.#t += o);
            }
          }
      })),
        this.#c.observe({type: 'resource', buffered: !0}));
    } catch {}
    this.#d();
  }
  stop() {
    (this.#u?.disconnect(), this.#c?.disconnect(), (this.#u = null), (this.#c = null), this.#f());
  }
  reset() {
    ((this.#e = 0),
      (this.#t = 0),
      (this.#n = null),
      this.#r.clear(),
      this.#o.clear(),
      (this.#a = []),
      (this.#s = !1),
      this.#h(),
      this.#l && this.#p());
  }
  #d() {
    (this.#p(),
      (this.#l = new MutationObserver((e) => {
        for (const t of e)
          if (t.type === 'attributes') this.#o.add(t.target);
          else if (t.type === 'childList') {
            t.removedNodes.length > 0 && (this.#s = !0);
            for (const r of t.addedNodes) r instanceof Element && this.#a.push(r);
          }
        this.#b();
      })),
      this.#l.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ['style', 'class'],
        childList: !0,
        subtree: !0,
      }));
  }
  #f() {
    (this.#l?.disconnect(), (this.#l = null), this.#h(), this.#o.clear(), (this.#a = []), (this.#s = !1));
  }
  #h() {
    this.#i !== null && (cancelIdle(this.#i), (this.#i = null));
  }
  #p() {
    (this.#h(),
      (this.#i = scheduleIdle(
        () => {
          ((this.#i = null), this.#_());
        },
        {timeout: 1e3},
      )));
  }
  #b() {
    this.#i === null &&
      (this.#i = scheduleIdle(() => {
        ((this.#i = null), this.#v());
      }));
  }
  #_() {
    (this.#r.clear(), this.#o.clear(), (this.#a = []), (this.#s = !1));
    for (const e of document.querySelectorAll('*')) this.#y(e) && this.#r.add(e);
    this.#n = this.#r.size;
  }
  #v() {
    if (this.#s) {
      for (const e of this.#r) e.isConnected || this.#r.delete(e);
      this.#s = !1;
    }
    for (const e of this.#a)
      if (e.isConnected) {
        this.#y(e) && this.#r.add(e);
        for (const t of e.querySelectorAll('*')) this.#y(t) && this.#r.add(t);
      }
    this.#a = [];
    for (const e of this.#o) e.isConnected ? (this.#y(e) ? this.#r.add(e) : this.#r.delete(e)) : this.#r.delete(e);
    (this.#o.clear(), (this.#n = this.#r.size));
  }
  #y(e) {
    const t = getComputedStyle(e);
    if ((t.willChange && t.willChange !== 'auto') || (t.perspective && t.perspective !== 'none')) return !0;
    const r = t.transform;
    return !!(
      r &&
      r !== 'none' &&
      (r.startsWith('matrix3d') || /translate3d|translateZ|rotate3d|rotateX|rotateY|scale3d|perspective/i.test(r))
    );
  }
  getMetrics() {
    return {paintCount: this.#e, scriptEvalTime: this.#t, compositorLayers: this.#n};
  }
};
const DEFAULT_REACT_METRICS = {
  reactRenderCount: 0,
  reactMountCount: 0,
  reactMountDuration: 0,
  reactPostMountUpdateCount: 0,
  reactPostMountMaxDuration: 0,
  nestedUpdateCount: 0,
  slowReactUpdates: 0,
  reactUpdateDurations: [],
  totalBaseDuration: 0,
  maxCommitLag: 0,
  commitLagHistory: [],
  memoizationEfficiency: 1,
  totalActualDuration: 0,
};
function createEmptyReactMetrics() {
  return {...DEFAULT_REACT_METRICS, reactUpdateDurations: [], commitLagHistory: []};
}
var ReactProfilerCollector = class {
    #e = new Map();
    #t;
    start() {}
    stop() {}
    reset() {
      for (const [e, t] of this.#e) {
        const r = t.metrics.reactMountCount,
          o = t.metrics.reactMountDuration;
        ((t.metrics = {...createEmptyReactMetrics(), reactMountCount: r, reactMountDuration: o}),
          this.#t?.(t.storyId, e, t.metrics));
      }
    }
    setOnProfilerUpdate(e) {
      this.#t = e;
    }
    clearProfilers() {
      this.#e.clear();
    }
    clearProfilersExcept(e) {
      for (const [t, r] of this.#e) r.storyId !== e && this.#e.delete(t);
    }
    getProfilerIds() {
      return Array.from(this.#e.keys());
    }
    getProfilerMetrics(e) {
      return this.#e.get(e)?.metrics;
    }
    reportRender = (e) => {
      const t = Math.max(0, e.commitTime - e.startTime - e.actualDuration);
      let r = this.#e.get(e.profilerId);
      (r
        ? (r.storyId = e.storyId)
        : ((r = {metrics: createEmptyReactMetrics(), storyId: e.storyId}), this.#e.set(e.profilerId, r)),
        this.#n(r, e, t),
        this.#t?.(e.storyId, e.profilerId, r.metrics));
    };
    #n(e, t, r) {
      const {phase: o, actualDuration: s, baseDuration: i} = t,
        u = e.metrics;
      (o === 'nested-update' && u.nestedUpdateCount++,
        u.reactRenderCount++,
        (u.totalBaseDuration += i),
        (u.totalActualDuration += s),
        (u.memoizationEfficiency = u.totalBaseDuration > 0 ? u.totalActualDuration / u.totalBaseDuration : 1),
        r > u.maxCommitLag && (u.maxCommitLag = r),
        addToWindow(u.commitLagHistory, r, 100),
        o === 'mount'
          ? (u.reactMountCount++, (u.reactMountDuration += s))
          : (u.reactPostMountUpdateCount++,
            s > u.reactPostMountMaxDuration && (u.reactPostMountMaxDuration = s),
            s > 16 && u.slowReactUpdates++,
            addToWindow(u.reactUpdateDurations, s, 100)));
    }
    getMetrics() {
      if (this.#e.size === 0) return createEmptyReactMetrics();
      let e = 0,
        t = 0,
        r = 0,
        o = 0,
        s = 0,
        i = 0,
        u = 0,
        l = 0,
        p = 0,
        d = 0;
      const m = [],
        y = [];
      for (const S of this.#e.values()) {
        const T = S.metrics;
        ((e += T.reactRenderCount),
          (t += T.reactMountCount),
          (r += T.reactMountDuration),
          (o += T.reactPostMountUpdateCount),
          (s = Math.max(s, T.reactPostMountMaxDuration)),
          (i += T.nestedUpdateCount),
          (u += T.slowReactUpdates),
          (l += T.totalBaseDuration),
          (p += T.totalActualDuration),
          (d = Math.max(d, T.maxCommitLag)),
          m.push(...T.reactUpdateDurations),
          y.push(...T.commitLagHistory));
      }
      const g = l > 0 ? p / l : 1;
      return {
        reactRenderCount: e,
        reactMountCount: t,
        reactMountDuration: r,
        reactPostMountUpdateCount: o,
        reactPostMountMaxDuration: s,
        nestedUpdateCount: i,
        slowReactUpdates: u,
        reactUpdateDurations: m.slice(-100),
        totalBaseDuration: l,
        maxCommitLag: d,
        commitLagHistory: y.slice(-100),
        memoizationEfficiency: g,
        totalActualDuration: p,
      };
    }
  },
  StyleMutationCollector = class {
    #e = 0;
    #t = 0;
    #n = [];
    #r = 0;
    #o = 0;
    #a = 0;
    #s = 0;
    #i = null;
    #u = null;
    onLayoutDirty;
    start() {
      ((this.#i = new MutationObserver((e) => {
        for (const t of e)
          if (t.type === 'attributes' && t.attributeName === 'style') {
            (this.#e++, this.#o++, (this.#a = performance.now()), this.onLayoutDirty?.());
            const r = t.target.getAttribute('style') ?? '',
              o = t.oldValue ?? '',
              s = r.match(/--[\w-]+\s*:[^;]*/g),
              i = o.match(/--[\w-]+\s*:[^;]*/g);
            if (s) {
              const u = new Set(i?.map((l) => l.trim()));
              for (const l of s) u.has(l.trim()) || this.#t++;
            }
          } else
            t.type === 'childList'
              ? (this.#s += t.addedNodes.length + t.removedNodes.length)
              : t.type === 'attributes' && t.attributeName !== 'style' && this.#s++;
      })),
        this.#i.observe(document.body, {
          childList: !0,
          attributes: !0,
          attributeOldValue: !0,
          subtree: !0,
          attributeFilter: ['style', 'class', 'id', 'data-state', 'aria-expanded', 'aria-hidden', 'hidden', 'disabled'],
        }),
        (this.#u = setInterval(() => {
          (addToWindow(this.#n, this.#s, 30), (this.#s = 0));
        }, 200)));
    }
    stop() {
      (this.#i?.disconnect(), this.#u && clearInterval(this.#u), (this.#i = null), (this.#u = null));
    }
    reset() {
      ((this.#e = 0), (this.#t = 0), (this.#n = []), (this.#r = 0), (this.#o = 0), (this.#s = 0));
    }
    checkThrashing(e) {
      const t = performance.now() - this.#a;
      (this.#o > 0 && t < THRASHING_STYLE_WRITE_WINDOW && e > THRASHING_FRAME_THRESHOLD && this.#r++, (this.#o = 0));
    }
    getMetrics() {
      return {styleWrites: this.#e, cssVarChanges: this.#t, domMutationFrames: this.#n, thrashingScore: this.#r};
    }
  };
function createInitialState() {
  return {fpsHistory: [], frameTimeHistory: [], domElements: null};
}
var CollectorManager = class {
  collectors;
  #e = !1;
  #t;
  #n = null;
  constructor({onProfilerUpdate: e} = {}) {
    ((this.#t = createInitialState()),
      (this.collectors = {
        style: new StyleMutationCollector(),
        reflow: new ForcedReflowCollector(),
        frame: new FrameTimingCollector((t) => {
          this.collectors.style.checkThrashing(t);
        }),
        input: new InputCollector(),
        mainThread: new MainThreadCollector(),
        loaf: new LongAnimationFrameCollector(),
        layoutShift: new LayoutShiftCollector(),
        memory: new MemoryCollector(),
        react: new ReactProfilerCollector(),
        paint: new PaintCollector(),
        elementTiming: new ElementTimingCollector(),
      }),
      (this.collectors.style.onLayoutDirty = () => {
        this.collectors.reflow.markLayoutDirty();
      }),
      e &&
        this.collectors.react.setOnProfilerUpdate((t, r, o) => {
          (e(t, r, o), this.#n !== t && (this.collectors.react.clearProfilersExcept(t), (this.#n = t)));
        }));
  }
  get isRunning() {
    return this.#e;
  }
  get #r() {
    return Object.values(this.collectors);
  }
  start() {
    if (!this.#e) {
      for (const e of this.#r) e.start();
      this.#e = !0;
    }
  }
  stop() {
    if (this.#e) {
      for (const e of this.#r) e.stop();
      this.#e = !1;
    }
  }
  reset() {
    for (const e of this.#r) e.reset();
    this.#t = createInitialState();
  }
  get reportRender() {
    return this.collectors.react.reportRender;
  }
  getProfilerIds() {
    return this.collectors.react.getProfilerIds();
  }
  getProfilerMetrics(e) {
    return this.collectors.react.getProfilerMetrics(e);
  }
  updateSparklineData() {
    this.collectors.memory.update();
    const e = this.collectors.frame.getMetrics();
    if (e.frameTimes.length > 0) {
      const t = computeAverage(e.frameTimes),
        r = Math.round(1e3 / t);
      (addToWindow(this.#t.fpsHistory, r, SPARKLINE_HISTORY_SIZE),
        addToWindow(this.#t.frameTimeHistory, t, SPARKLINE_HISTORY_SIZE));
    }
  }
  setDomElementCount(e) {
    this.#t.domElements = e;
  }
  observeContainer(e) {
    let t = null,
      r = !1;
    const o = () => {
        ((this.#t.domElements = e.querySelectorAll('*').length), (r = !1));
      },
      s = () => {
        r || ((r = !0), (t = setTimeout(o, 500)));
      };
    o();
    const i = new MutationObserver(s);
    return (
      i.observe(e, {childList: !0, subtree: !0}),
      () => {
        (i.disconnect(), t && clearTimeout(t));
      }
    );
  }
  getFrameMetrics() {
    return this.collectors.frame.getMetrics();
  }
  computeMetrics() {
    const e = this.#t,
      {
        frame: t,
        input: r,
        mainThread: o,
        loaf: s,
        layoutShift: i,
        memory: u,
        style: l,
        reflow: p,
        react: d,
        paint: m,
        elementTiming: y,
      } = Object.fromEntries(Object.entries(this.collectors).map(([D, R]) => [D, R.getMetrics()])),
      g = computeAverage(t.frameTimes),
      S = g > 0 ? Math.round(1e3 / g) : 0,
      T = computeAverage(r.inputLatencies),
      O = computeAverage(r.paintTimes),
      C =
        u.lastMemoryMB !== null && u.baselineMemoryMB !== null
          ? Math.round((u.lastMemoryMB - u.baselineMemoryMB) * 10) / 10
          : null;
    return {
      fps: S,
      frameTime: Math.round(g * 10) / 10,
      maxFrameTime: Math.round(t.maxFrameTime * 10) / 10,
      inputLatency: Math.round(T * 10) / 10,
      maxInputLatency: Math.round(r.maxInputLatency * 10) / 10,
      paintTime: Math.round(O * 10) / 10,
      maxPaintTime: Math.round(r.maxPaintTime * 10) / 10,
      inputJitter: r.inputJitter,
      memoryUsedMB: u.lastMemoryMB,
      memoryDeltaMB: C,
      peakMemoryMB: u.peakMemoryMB,
      fpsHistory: [...e.fpsHistory],
      frameTimeHistory: [...e.frameTimeHistory],
      memoryHistory: [...u.memoryHistory],
      longTasks: o.longTasks,
      longestTask: o.longestTask,
      totalBlockingTime: Math.round(o.totalBlockingTime),
      loafSupported: s.loafSupported,
      loafCount: s.loafCount,
      totalLoafBlockingDuration: s.totalLoafBlockingDuration,
      longestLoafDuration: s.longestLoafDuration,
      longestLoafBlockingDuration: s.longestLoafBlockingDuration,
      avgLoafDuration: s.avgLoafDuration,
      p95LoafDuration: s.p95LoafDuration,
      loafsWithScripts: s.loafsWithScripts,
      lastLoaf: s.lastLoaf,
      worstLoaf: s.worstLoaf,
      droppedFrames: t.droppedFrames,
      frameJitter: t.frameJitter,
      frameStability: t.frameStability,
      styleWrites: l.styleWrites,
      thrashingScore: l.thrashingScore,
      layoutShiftScore: i.layoutShiftScore,
      layoutShiftCount: i.layoutShiftCount,
      currentSessionCLS: i.currentSessionScore,
      eventTimingSupported: r.eventTimingSupported,
      interactionCount: r.interactionCount,
      inpMs: r.inpMs,
      firstInputDelay: r.firstInputDelay,
      firstInputType: r.firstInputType,
      lastInteraction: r.lastInteraction,
      slowestInteraction: r.slowestInteraction,
      interactionsByType: r.interactionsByType,
      reactMountCount: d.reactMountCount,
      reactMountDuration: d.reactMountDuration,
      reactRenderCount: d.reactRenderCount,
      reactPostMountUpdateCount: d.reactPostMountUpdateCount,
      reactPostMountMaxDuration: d.reactPostMountMaxDuration,
      renderCascades: d.nestedUpdateCount,
      domElements: e.domElements,
      forcedReflowCount: p.forcedReflowCount,
      eventListenerCount: 0,
      observerCount: 0,
      cssVarChanges: l.cssVarChanges,
      scriptEvalTime: Math.round(m.scriptEvalTime * 10) / 10,
      gcPressure: Math.round(u.gcPressure * 100) / 100,
      paintCount: m.paintCount,
      paintJitter: r.paintJitter,
      compositorLayers: m.compositorLayers,
      domMutationsPerFrame: Math.round(computeAverage(l.domMutationFrames)),
      slowReactUpdates: d.slowReactUpdates,
      reactP95Duration: computeP95(d.reactUpdateDurations),
      elementTimingSupported: y.elementTimingSupported,
      elementTimingCount: y.elementCount,
      largestElementRenderTime: Math.round(y.largestRenderTime * 10) / 10,
      elementTimings: y.elements.map((D) => ({
        identifier: D.identifier,
        renderTime: Math.round(D.renderTime * 10) / 10,
        selector: D.selector,
      })),
    };
  }
};
const ADDON_ID = 'primer-performance-monitor',
  PERF_EVENTS = {
    METRICS_UPDATE: `${ADDON_ID}/metrics-update`,
    RESET: `${ADDON_ID}/reset`,
    REQUEST_METRICS: `${ADDON_ID}/request-metrics`,
    INSPECT_ELEMENT: `${ADDON_ID}/inspect-element`,
    PROFILER_UPDATE: `${ADDON_ID}/profiler-update`,
  },
  DEFAULT_METRICS = {
    fps: 0,
    frameTime: 0,
    maxFrameTime: 0,
    droppedFrames: 0,
    frameJitter: 0,
    frameStability: 100,
    inputLatency: 0,
    maxInputLatency: 0,
    inputJitter: 0,
    eventTimingSupported: !0,
    interactionCount: 0,
    inpMs: 0,
    firstInputDelay: null,
    firstInputType: null,
    lastInteraction: null,
    slowestInteraction: null,
    interactionsByType: {},
    paintTime: 0,
    maxPaintTime: 0,
    paintCount: 0,
    paintJitter: 0,
    memoryUsedMB: null,
    memoryDeltaMB: null,
    peakMemoryMB: null,
    gcPressure: 0,
    fpsHistory: [],
    frameTimeHistory: [],
    memoryHistory: [],
    longTasks: 0,
    longestTask: 0,
    totalBlockingTime: 0,
    loafSupported: !0,
    loafCount: 0,
    totalLoafBlockingDuration: 0,
    longestLoafDuration: 0,
    longestLoafBlockingDuration: 0,
    avgLoafDuration: 0,
    p95LoafDuration: 0,
    loafsWithScripts: 0,
    lastLoaf: null,
    worstLoaf: null,
    styleWrites: 0,
    thrashingScore: 0,
    layoutShiftScore: 0,
    layoutShiftCount: 0,
    currentSessionCLS: 0,
    forcedReflowCount: 0,
    domMutationsPerFrame: 0,
    cssVarChanges: 0,
    reactRenderCount: 0,
    reactMountCount: 0,
    reactMountDuration: 0,
    reactPostMountUpdateCount: 0,
    reactPostMountMaxDuration: 0,
    reactP95Duration: 0,
    slowReactUpdates: 0,
    renderCascades: 0,
    domElements: null,
    scriptEvalTime: 0,
    eventListenerCount: 0,
    observerCount: 0,
    compositorLayers: null,
    elementTimingSupported: !0,
    elementTimingCount: 0,
    largestElementRenderTime: 0,
    elementTimings: [],
  };
function createPerformanceStore() {
  let e = {...DEFAULT_METRICS};
  const t = new Map();
  let r = null;
  const o = new Set();
  let s = {globalMetrics: e, profilers: new Map(t), selectedProfilerId: r, hasProfilers: !1};
  const i = {globalMetrics: {...DEFAULT_METRICS}, profilers: new Map(), selectedProfilerId: null, hasProfilers: !1},
    u = () => {
      s = {globalMetrics: e, profilers: new Map(t), selectedProfilerId: r, hasProfilers: t.size > 0};
      for (const l of o) l();
    };
  return {
    subscribe(l) {
      return (
        o.add(l),
        () => {
          o.delete(l);
        }
      );
    },
    getSnapshot() {
      return s;
    },
    getServerSnapshot() {
      return i;
    },
    setGlobalMetrics(l) {
      ((e = l), u());
    },
    getGlobalMetrics() {
      return e;
    },
    resetGlobalMetrics() {
      ((e = {...DEFAULT_METRICS}), u());
    },
    updateProfiler(l, p) {
      (t.set(l, {...p, id: l, lastUpdated: performance.now()}), u());
    },
    removeProfiler(l) {
      t.has(l) && (t.delete(l), r === l && (r = null), u());
    },
    getProfilerMetrics(l) {
      return t.get(l);
    },
    getProfilerIds() {
      return Array.from(t.keys());
    },
    resetProfilers() {
      for (const [l, p] of t)
        t.set(l, {
          ...p,
          reactRenderCount: 0,
          reactPostMountUpdateCount: 0,
          reactPostMountMaxDuration: 0,
          nestedUpdateCount: 0,
          slowReactUpdates: 0,
          reactUpdateDurations: [],
          lastUpdated: performance.now(),
        });
      u();
    },
    clearProfilers() {
      (t.clear(), (r = null), u());
    },
    setSelectedProfiler(l) {
      l !== r && ((r = l), u());
    },
    getSelectedProfiler() {
      return r;
    },
    getAggregatedReactMetrics() {
      if (t.size === 0)
        return {
          reactRenderCount: 0,
          reactMountCount: 0,
          reactMountDuration: 0,
          reactPostMountUpdateCount: 0,
          reactPostMountMaxDuration: 0,
          nestedUpdateCount: 0,
          slowReactUpdates: 0,
          reactUpdateDurations: [],
          totalBaseDuration: 0,
          maxCommitLag: 0,
          commitLagHistory: [],
          memoizationEfficiency: 1,
          totalActualDuration: 0,
        };
      let l = 0,
        p = 0,
        d = 0,
        m = 0,
        y = 0,
        g = 0,
        S = 0,
        T = 0,
        O = 0,
        C = 0;
      const D = [],
        R = [];
      for (const J of t.values())
        ((l += J.reactRenderCount),
          (p += J.reactMountCount),
          (d += J.reactMountDuration),
          (m += J.reactPostMountUpdateCount),
          (y = Math.max(y, J.reactPostMountMaxDuration)),
          (g += J.nestedUpdateCount),
          (S += J.slowReactUpdates),
          (T += J.totalBaseDuration),
          (O += J.totalActualDuration),
          (C = Math.max(C, J.maxCommitLag)),
          D.push(...J.reactUpdateDurations),
          R.push(...J.commitLagHistory));
      const x = T > 0 ? O / T : 1;
      return {
        reactRenderCount: l,
        reactMountCount: p,
        reactMountDuration: d,
        reactPostMountUpdateCount: m,
        reactPostMountMaxDuration: y,
        nestedUpdateCount: g,
        slowReactUpdates: S,
        reactUpdateDurations: D.slice(-100),
        totalBaseDuration: T,
        maxCommitLag: C,
        commitLagHistory: R.slice(-100),
        memoizationEfficiency: x,
        totalActualDuration: O,
      };
    },
    resetAll() {
      ((e = {...DEFAULT_METRICS}), this.resetProfilers(), u());
    },
  };
}
const performanceStore = createPerformanceStore(),
  UPDATE_INTERVAL_MS = 50,
  SPARKLINE_SAMPLE_INTERVAL_MS = 200;
let inspectStyleInjected = !1;
function ensureInspectStyle() {
  if (inspectStyleInjected) return;
  inspectStyleInjected = !0;
  const e = document.createElement('style');
  ((e.textContent = `
    @keyframes perf-inspect-flash {
      0%, 100% { outline-color: #f06; }
      33% { outline-color: #06f; }
      66% { outline-color: #f06; }
    }
    [data-perf-inspect] {
      outline: 3px solid #f06 !important;
      outline-offset: 2px !important;
      animation: perf-inspect-flash 0.6s ease-out !important;
    }
  `),
    document.head.appendChild(e));
}
function handleInspectElement(e) {
  if (!(!e || e === 'unknown'))
    try {
      const t = document.querySelector(e);
      t instanceof HTMLElement &&
        (ensureInspectStyle(),
        t.scrollIntoView({behavior: 'smooth', block: 'center'}),
        (t.dataset.perfInspect = ''),
        setTimeout(() => {
          delete t.dataset.perfInspect;
        }, 600),
        console.log(
          '%c[Performance Panel] Inspecting element:',
          'color: #f06; font-weight: bold',
          t,
          `
Selector: ${e}`,
        ));
    } catch {}
}
var PerformanceMonitorCore = class {
  manager;
  storyId;
  metricsIntervalId = null;
  sparklineIntervalId = null;
  containerCleanup = null;
  channelCleanups = [];
  constructor(e) {
    ((this.storyId = e),
      (this.manager = new CollectorManager({
        onProfilerUpdate: (t, r, o) => {
          (performanceStore.updateProfiler(r, o),
            addons.getChannel().emit(PERF_EVENTS.PROFILER_UPDATE, {id: r, metrics: o, storyId: t}));
        },
      })));
  }
  start() {
    const e = addons.getChannel();
    this.manager.start();
    const t = () => {
        e.emit(PERF_EVENTS.METRICS_UPDATE, this.manager.computeMetrics());
        for (const o of this.manager.getProfilerIds()) {
          const s = this.manager.getProfilerMetrics(o);
          s && e.emit(PERF_EVENTS.PROFILER_UPDATE, {id: o, metrics: s, storyId: this.storyId});
        }
      },
      r = () => {
        (this.manager.reset(), performanceStore.resetAll());
      };
    (e.on(PERF_EVENTS.REQUEST_METRICS, t),
      e.on(PERF_EVENTS.RESET, r),
      e.on(PERF_EVENTS.INSPECT_ELEMENT, handleInspectElement),
      (this.channelCleanups = [
        () => {
          e.off(PERF_EVENTS.REQUEST_METRICS, t);
        },
        () => {
          e.off(PERF_EVENTS.RESET, r);
        },
        () => {
          e.off(PERF_EVENTS.INSPECT_ELEMENT, handleInspectElement);
        },
      ]),
      (this.metricsIntervalId = setInterval(() => {
        const o = this.manager.computeMetrics();
        (e.emit(PERF_EVENTS.METRICS_UPDATE, o), performanceStore.setGlobalMetrics(o));
      }, UPDATE_INTERVAL_MS)),
      (this.sparklineIntervalId = setInterval(() => {
        this.manager.updateSparklineData();
      }, SPARKLINE_SAMPLE_INTERVAL_MS)));
  }
  stop() {
    (this.manager.stop(),
      this.metricsIntervalId != null && (clearInterval(this.metricsIntervalId), (this.metricsIntervalId = null)),
      this.sparklineIntervalId != null && (clearInterval(this.sparklineIntervalId), (this.sparklineIntervalId = null)));
    for (const e of this.channelCleanups) e();
    ((this.channelCleanups = []), this.containerCleanup?.(), (this.containerCleanup = null));
  }
  observeContainer(e) {
    return (
      this.containerCleanup?.(),
      (this.containerCleanup = this.manager.observeContainer(e)),
      this.containerCleanup
    );
  }
};
let _activeCore = null;
function getActiveCore() {
  return _activeCore;
}
function setActiveCore(e) {
  (_activeCore && _activeCore !== e && _activeCore.stop(), (_activeCore = e));
}
const ROOT_DISCOVERY_TIMEOUT_MS = 5e3;
function waitForStorybookRoot(e, t) {
  const r = document.getElementById('storybook-root');
  if (r) {
    t(r);
    return;
  }
  const o = new MutationObserver(() => {
    if (getActiveCore() !== e) {
      o.disconnect();
      return;
    }
    const s = document.getElementById('storybook-root');
    s && (o.disconnect(), t(s));
  });
  (o.observe(document.body, {childList: !0, subtree: !0}),
    setTimeout(() => {
      o.disconnect();
    }, ROOT_DISCOVERY_TIMEOUT_MS));
}
const withPerformanceMonitor = (e, t) => {
    if (t.parameters.performancePanel?.disable) return (setActiveCore(null), e());
    let r = getActiveCore();
    if (r?.storyId !== t.id) {
      ((r = new PerformanceMonitorCore(t.id)), setActiveCore(r), r.start());
      const o = r;
      waitForStorybookRoot(o, (s) => {
        o.observeContainer(s);
      });
    }
    return e();
  },
  preview$1 = {decorators: [withPerformanceMonitor]},
  preview_universal_12485 = Object.freeze(
    Object.defineProperty({__proto__: null, default: preview$1}, Symbol.toStringTag, {value: 'Module'}),
  ),
  preview = {},
  preview_7037 = Object.freeze(
    Object.defineProperty({__proto__: null, default: preview}, Symbol.toStringTag, {value: 'Module'}),
  );
Ff();
const {composeConfigs, PreviewWeb} = __STORYBOOK_MODULE_PREVIEW_API__,
  getProjectAnnotations = (e = []) => {
    const t = [
      e[0] ?? entry_preview_9460,
      e[1] ?? entry_preview_docs_9930,
      e[2] ?? preview_9181,
      e[3] ?? preview_8699,
      e[4] ?? preview_universal_12485,
      e[5] ?? preview_7037,
    ];
    return composeConfigs(t);
  };
window.__STORYBOOK_PREVIEW__ = window.__STORYBOOK_PREVIEW__ || new PreviewWeb(importFn, getProjectAnnotations);
window.__STORYBOOK_STORY_STORE__ = window.__STORYBOOK_STORY_STORE__ || window.__STORYBOOK_PREVIEW__.storyStore;
export {
  $window as $,
  is_function as A,
  BLOCK_EFFECT as B,
  queue_micro_task as C,
  noop as D,
  EFFECT_TRANSPARENT as E,
  without_reactive_context as F,
  TRANSITION_IN as G,
  TRANSITION_OUT as H,
  block as I,
  BranchManager as J,
  set_should_intro as K,
  create_element as L,
  assign_nodes as M,
  NAMESPACE_SVG as N,
  create_text as O,
  teardown as P,
  managed as Q,
  REACTION_RAN as R,
  destroy_effect as S,
  TRANSITION_GLOBAL as T,
  branch as U,
  is_array as V,
  select_multiple_invalid_value as W,
  is as X,
  flatten as Y,
  ATTACHMENT_KEY as Z,
  IS_XHTML as _,
  prop as a,
  booleanTag as a$,
  is_capture_event as a0,
  create_event as a1,
  autofocus as a2,
  normalize_attribute as a3,
  UNINITIALIZED as a4,
  NAMESPACE_HTML as a5,
  get_prototype_of as a6,
  LOADING_ATTR_SYMBOL as a7,
  can_delegate_event as a8,
  get_descriptors as a9,
  source as aA,
  EACH_INDEX_REACTIVE as aB,
  EACH_ITEM_REACTIVE as aC,
  EACH_ITEM_IMMUTABLE as aD,
  EFFECT_OFFSCREEN as aE,
  resume_effect as aF,
  pause_effect as aG,
  INERT as aH,
  get_next_sibling as aI,
  BRANCH_EFFECT as aJ,
  clear_text_content as aK,
  EACH_IS_CONTROLLED as aL,
  EACH_IS_ANIMATED as aM,
  listen_to_event_and_reset_event as aN,
  tick as aO,
  render_effect as aP,
  previous_batch as aQ,
  STATE_SYMBOL as aR,
  safe_not_equal as aS,
  isPlainObject as aT,
  isPrimitive as aU,
  isTypedArray as aV,
  getTag as aW,
  functionTag as aX,
  regexpTag as aY,
  symbolTag as aZ,
  dateTag as a_,
  component_context as aa,
  user_pre_effect as ab,
  run_all as ac,
  run as ad,
  deep_read_state as ae,
  derived as af,
  enable_legacy_mode_flag as ag,
  setContext as ah,
  getContext as ai,
  user_derived as aj,
  rest_props as ak,
  snippet as al,
  from_svg as am,
  createContext as an,
  component as ao,
  spread_props as ap,
  text as aq,
  legacy_pre_effect as ar,
  legacy_pre_effect_reset as as,
  mutable_source as at,
  derived_safe_equal as au,
  internal_set as av,
  current_batch as aw,
  each_key_duplicate as ax,
  should_defer_append as ay,
  array_from as az,
  proxy as b,
  numberTag as b0,
  stringTag as b1,
  objectTag as b2,
  getSymbols as b3,
  errorTag as b4,
  dataViewTag as b5,
  arrayBufferTag as b6,
  float64ArrayTag as b7,
  float32ArrayTag as b8,
  bigInt64ArrayTag as b9,
  int32ArrayTag as ba,
  int16ArrayTag as bb,
  int8ArrayTag as bc,
  bigUint64ArrayTag as bd,
  uint32ArrayTag as be,
  uint16ArrayTag as bf,
  uint8ClampedArrayTag as bg,
  uint8ArrayTag as bh,
  arrayTag as bi,
  setTag as bj,
  mapTag as bk,
  argumentsTag as bl,
  __commonJS$1 as bm,
  __require as bn,
  __toESM$1 as bo,
  __export$2 as bp,
  SNIPPET_RENDERED as bq,
  dedent as br,
  SourceType as bs,
  __toESM as bt,
  __commonJS as bu,
  append as c,
  pop as d,
  event as e,
  from_html as f,
  get as g,
  child as h,
  if_block as i,
  set as j,
  delegate as k,
  sibling as l,
  comment as m,
  first_child as n,
  onMount as o,
  push as p,
  set_text as q,
  delegated as r,
  state as s,
  template_effect as t,
  user_effect as u,
  goto as v,
  active_effect as w,
  should_intro as x,
  effect as y,
  untrack as z,
};
