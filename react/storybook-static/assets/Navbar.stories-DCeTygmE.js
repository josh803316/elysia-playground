import {r as i, j as C} from './iframe-BPyNWV_d.js';
import {u as Me, S as Ue, U as Be, a as Ae, b as We} from './index-CG_SYJi4.js';
import './preload-helper-PPVm8Dsz.js';
import './index-DpdJq6kE.js';
var ce = 'popstate';
function fe(e) {
  return (
    typeof e == 'object' && e != null && 'pathname' in e && 'search' in e && 'hash' in e && 'state' in e && 'key' in e
  );
}
function He(e = {}) {
  function t(a, r) {
    let o = r.state?.masked,
      {pathname: l, search: s, hash: u} = o || a.location;
    return te(
      '',
      {pathname: l, search: s, hash: u},
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      o ? {pathname: a.location.pathname, search: a.location.search, hash: a.location.hash} : void 0,
    );
  }
  function n(a, r) {
    return typeof r == 'string' ? r : U(r);
  }
  return ze(t, n, null, e);
}
function E(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t);
}
function P(e, t) {
  if (!e) {
    typeof console < 'u' && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function je() {
  return Math.random().toString(36).substring(2, 10);
}
function de(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
    masked: e.unstable_mask ? {pathname: e.pathname, search: e.search, hash: e.hash} : void 0,
  };
}
function te(e, t, n = null, a, r) {
  return {
    pathname: typeof e == 'string' ? e : e.pathname,
    search: '',
    hash: '',
    ...(typeof t == 'string' ? B(t) : t),
    state: n,
    key: (t && t.key) || a || je(),
    unstable_mask: r,
  };
}
function U({pathname: e = '/', search: t = '', hash: n = ''}) {
  return (
    t && t !== '?' && (e += t.charAt(0) === '?' ? t : '?' + t),
    n && n !== '#' && (e += n.charAt(0) === '#' ? n : '#' + n),
    e
  );
}
function B(e) {
  let t = {};
  if (e) {
    let n = e.indexOf('#');
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
    let a = e.indexOf('?');
    (a >= 0 && ((t.search = e.substring(a)), (e = e.substring(0, a))), e && (t.pathname = e));
  }
  return t;
}
function ze(e, t, n, a = {}) {
  let {window: r = document.defaultView, v5Compat: o = !1} = a,
    l = r.history,
    s = 'POP',
    u = null,
    f = d();
  f == null && ((f = 0), l.replaceState({...l.state, idx: f}, ''));
  function d() {
    return (l.state || {idx: null}).idx;
  }
  function c() {
    s = 'POP';
    let h = d(),
      v = h == null ? null : h - f;
    ((f = h), u && u({action: s, location: p.location, delta: v}));
  }
  function m(h, v) {
    s = 'PUSH';
    let R = fe(h) ? h : te(p.location, h, v);
    f = d() + 1;
    let w = de(R, f),
      b = p.createHref(R.unstable_mask || R);
    try {
      l.pushState(w, '', b);
    } catch (x) {
      if (x instanceof DOMException && x.name === 'DataCloneError') throw x;
      r.location.assign(b);
    }
    o && u && u({action: s, location: p.location, delta: 1});
  }
  function y(h, v) {
    s = 'REPLACE';
    let R = fe(h) ? h : te(p.location, h, v);
    f = d();
    let w = de(R, f),
      b = p.createHref(R.unstable_mask || R);
    (l.replaceState(w, '', b), o && u && u({action: s, location: p.location, delta: 0}));
  }
  function g(h) {
    return Ve(h);
  }
  let p = {
    get action() {
      return s;
    },
    get location() {
      return e(r, l);
    },
    listen(h) {
      if (u) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(ce, c),
        (u = h),
        () => {
          (r.removeEventListener(ce, c), (u = null));
        }
      );
    },
    createHref(h) {
      return t(r, h);
    },
    createURL: g,
    encodeLocation(h) {
      let v = g(h);
      return {pathname: v.pathname, search: v.search, hash: v.hash};
    },
    push: m,
    replace: y,
    go(h) {
      return l.go(h);
    },
  };
  return p;
}
function Ve(e, t = !1) {
  let n = 'http://localhost';
  (typeof window < 'u' && (n = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    E(n, 'No window.location.(origin|href) available to create URL'));
  let a = typeof e == 'string' ? e : U(e);
  return ((a = a.replace(/ $/, '%20')), !t && a.startsWith('//') && (a = n + a), new URL(a, n));
}
function ye(e, t, n = '/') {
  return Je(e, t, n, !1);
}
function Je(e, t, n, a) {
  let r = typeof t == 'string' ? B(t) : t,
    o = k(r.pathname || '/', n);
  if (o == null) return null;
  let l = ve(e);
  Ke(l);
  let s = null;
  for (let u = 0; s == null && u < l.length; ++u) {
    let f = at(o);
    s = nt(l[u], f, a);
  }
  return s;
}
function ve(e, t = [], n = [], a = '', r = !1) {
  let o = (l, s, u = r, f) => {
    let d = {
      relativePath: f === void 0 ? l.path || '' : f,
      caseSensitive: l.caseSensitive === !0,
      childrenIndex: s,
      route: l,
    };
    if (d.relativePath.startsWith('/')) {
      if (!d.relativePath.startsWith(a) && u) return;
      (E(
        d.relativePath.startsWith(a),
        `Absolute route path "${d.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (d.relativePath = d.relativePath.slice(a.length)));
    }
    let c = L([a, d.relativePath]),
      m = n.concat(d);
    (l.children &&
      l.children.length > 0 &&
      (E(
        l.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${c}".`,
      ),
      ve(l.children, t, m, c, u)),
      !(l.path == null && !l.index) && t.push({path: c, score: et(c, l.index), routesMeta: m}));
  };
  return (
    e.forEach((l, s) => {
      if (l.path === '' || !l.path?.includes('?')) o(l, s);
      else for (let u of Re(l.path)) o(l, s, !0, u);
    }),
    t
  );
}
function Re(e) {
  let t = e.split('/');
  if (t.length === 0) return [];
  let [n, ...a] = t,
    r = n.endsWith('?'),
    o = n.replace(/\?$/, '');
  if (a.length === 0) return r ? [o, ''] : [o];
  let l = Re(a.join('/')),
    s = [];
  return (
    s.push(...l.map((u) => (u === '' ? o : [o, u].join('/')))),
    r && s.push(...l),
    s.map((u) => (e.startsWith('/') && u === '' ? '/' : u))
  );
}
function Ke(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : tt(
          t.routesMeta.map((a) => a.childrenIndex),
          n.routesMeta.map((a) => a.childrenIndex),
        ),
  );
}
var Ye = /^:[\w-]+$/,
  Ge = 3,
  qe = 2,
  Xe = 1,
  Qe = 10,
  Ze = -2,
  he = (e) => e === '*';
function et(e, t) {
  let n = e.split('/'),
    a = n.length;
  return (
    n.some(he) && (a += Ze),
    t && (a += qe),
    n.filter((r) => !he(r)).reduce((r, o) => r + (Ye.test(o) ? Ge : o === '' ? Xe : Qe), a)
  );
}
function tt(e, t) {
  return e.length === t.length && e.slice(0, -1).every((a, r) => a === t[r]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function nt(e, t, n = !1) {
  let {routesMeta: a} = e,
    r = {},
    o = '/',
    l = [];
  for (let s = 0; s < a.length; ++s) {
    let u = a[s],
      f = s === a.length - 1,
      d = o === '/' ? t : t.slice(o.length) || '/',
      c = J({path: u.relativePath, caseSensitive: u.caseSensitive, end: f}, d),
      m = u.route;
    if (
      (!c &&
        f &&
        n &&
        !a[a.length - 1].route.index &&
        (c = J({path: u.relativePath, caseSensitive: u.caseSensitive, end: !1}, d)),
      !c)
    )
      return null;
    (Object.assign(r, c.params),
      l.push({params: r, pathname: L([o, c.pathname]), pathnameBase: st(L([o, c.pathnameBase])), route: m}),
      c.pathnameBase !== '/' && (o = L([o, c.pathnameBase])));
  }
  return l;
}
function J(e, t) {
  typeof e == 'string' && (e = {path: e, caseSensitive: !1, end: !0});
  let [n, a] = rt(e.path, e.caseSensitive, e.end),
    r = t.match(n);
  if (!r) return null;
  let o = r[0],
    l = o.replace(/(.)\/+$/, '$1'),
    s = r.slice(1);
  return {
    params: a.reduce((f, {paramName: d, isOptional: c}, m) => {
      if (d === '*') {
        let g = s[m] || '';
        l = o.slice(0, o.length - g.length).replace(/(.)\/+$/, '$1');
      }
      const y = s[m];
      return (c && !y ? (f[d] = void 0) : (f[d] = (y || '').replace(/%2F/g, '/')), f);
    }, {}),
    pathname: o,
    pathnameBase: l,
    pattern: e,
  };
}
function rt(e, t = !1, n = !0) {
  P(
    e === '*' || !e.endsWith('*') || e.endsWith('/*'),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, '/*')}".`,
  );
  let a = [],
    r =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (l, s, u, f, d) => {
          if ((a.push({paramName: s, isOptional: u != null}), u)) {
            let c = d.charAt(f + l.length);
            return c && c !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    e.endsWith('*')
      ? (a.push({paramName: '*'}), (r += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : n
        ? (r += '\\/*$')
        : e !== '' && e !== '/' && (r += '(?:(?=\\/|$))'),
    [new RegExp(r, t ? void 0 : 'i'), a]
  );
}
function at(e) {
  try {
    return e
      .split('/')
      .map((t) => decodeURIComponent(t).replace(/\//g, '%2F'))
      .join('/');
  } catch (t) {
    return (
      P(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    );
  }
}
function k(e, t) {
  if (t === '/') return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    a = e.charAt(n);
  return a && a !== '/' ? null : e.slice(n) || '/';
}
var ot = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function lt(e, t = '/') {
  let {pathname: n, search: a = '', hash: r = ''} = typeof e == 'string' ? B(e) : e,
    o;
  return (
    n ? ((n = n.replace(/\/\/+/g, '/')), n.startsWith('/') ? (o = me(n.substring(1), '/')) : (o = me(n, t))) : (o = t),
    {pathname: o, search: ut(a), hash: ct(r)}
  );
}
function me(e, t) {
  let n = t.replace(/\/+$/, '').split('/');
  return (
    e.split('/').forEach((r) => {
      r === '..' ? n.length > 1 && n.pop() : r !== '.' && n.push(r);
    }),
    n.length > 1 ? n.join('/') : '/'
  );
}
function Q(e, t, n, a) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function it(e) {
  return e.filter((t, n) => n === 0 || (t.route.path && t.route.path.length > 0));
}
function we(e) {
  let t = it(e);
  return t.map((n, a) => (a === t.length - 1 ? n.pathname : n.pathnameBase));
}
function ne(e, t, n, a = !1) {
  let r;
  typeof e == 'string'
    ? (r = B(e))
    : ((r = {...e}),
      E(!r.pathname || !r.pathname.includes('?'), Q('?', 'pathname', 'search', r)),
      E(!r.pathname || !r.pathname.includes('#'), Q('#', 'pathname', 'hash', r)),
      E(!r.search || !r.search.includes('#'), Q('#', 'search', 'hash', r)));
  let o = e === '' || r.pathname === '',
    l = o ? '/' : r.pathname,
    s;
  if (l == null) s = n;
  else {
    let c = t.length - 1;
    if (!a && l.startsWith('..')) {
      let m = l.split('/');
      for (; m[0] === '..'; ) (m.shift(), (c -= 1));
      r.pathname = m.join('/');
    }
    s = c >= 0 ? t[c] : '/';
  }
  let u = lt(r, s),
    f = l && l !== '/' && l.endsWith('/'),
    d = (o || l === '.') && n.endsWith('/');
  return (!u.pathname.endsWith('/') && (f || d) && (u.pathname += '/'), u);
}
var L = (e) => e.join('/').replace(/\/\/+/g, '/'),
  st = (e) => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  ut = (e) => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  ct = (e) => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e),
  ft = class {
    constructor(e, t, n, a = !1) {
      ((this.status = e),
        (this.statusText = t || ''),
        (this.internal = a),
        n instanceof Error ? ((this.data = n.toString()), (this.error = n)) : (this.data = n));
    }
  };
function dt(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.internal == 'boolean' &&
    'data' in e
  );
}
function ht(e) {
  return (
    e
      .map((t) => t.route.path)
      .filter(Boolean)
      .join('/')
      .replace(/\/\/*/g, '/') || '/'
  );
}
var Ee = typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function xe(e, t) {
  let n = e;
  if (typeof n != 'string' || !ot.test(n)) return {absoluteURL: void 0, isExternal: !1, to: n};
  let a = n,
    r = !1;
  if (Ee)
    try {
      let o = new URL(window.location.href),
        l = n.startsWith('//') ? new URL(o.protocol + n) : new URL(n),
        s = k(l.pathname, t);
      l.origin === o.origin && s != null ? (n = s + l.search + l.hash) : (r = !0);
    } catch {
      P(
        !1,
        `<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return {absoluteURL: a, isExternal: r, to: n};
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var Ce = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(Ce);
var mt = ['GET', ...Ce];
new Set(mt);
var F = i.createContext(null);
F.displayName = 'DataRouter';
var Y = i.createContext(null);
Y.displayName = 'DataRouterState';
var pt = i.createContext(!1),
  be = i.createContext({isTransitioning: !1});
be.displayName = 'ViewTransition';
var gt = i.createContext(new Map());
gt.displayName = 'Fetchers';
var yt = i.createContext(null);
yt.displayName = 'Await';
var S = i.createContext(null);
S.displayName = 'Navigation';
var G = i.createContext(null);
G.displayName = 'Location';
var $ = i.createContext({outlet: null, matches: [], isDataRoute: !1});
$.displayName = 'Route';
var re = i.createContext(null);
re.displayName = 'RouteError';
var Se = 'REACT_ROUTER_ERROR',
  vt = 'REDIRECT',
  Rt = 'ROUTE_ERROR_RESPONSE';
function wt(e) {
  if (e.startsWith(`${Se}:${vt}:{`))
    try {
      let t = JSON.parse(e.slice(28));
      if (
        typeof t == 'object' &&
        t &&
        typeof t.status == 'number' &&
        typeof t.statusText == 'string' &&
        typeof t.location == 'string' &&
        typeof t.reloadDocument == 'boolean' &&
        typeof t.replace == 'boolean'
      )
        return t;
    } catch {}
}
function Et(e) {
  if (e.startsWith(`${Se}:${Rt}:{`))
    try {
      let t = JSON.parse(e.slice(40));
      if (typeof t == 'object' && t && typeof t.status == 'number' && typeof t.statusText == 'string')
        return new ft(t.status, t.statusText, t.data);
    } catch {}
}
function xt(e, {relative: t} = {}) {
  E(A(), 'useHref() may be used only in the context of a <Router> component.');
  let {basename: n, navigator: a} = i.useContext(S),
    {hash: r, pathname: o, search: l} = W(e, {relative: t}),
    s = o;
  return (n !== '/' && (s = o === '/' ? n : L([n, o])), a.createHref({pathname: s, search: l, hash: r}));
}
function A() {
  return i.useContext(G) != null;
}
function I() {
  return (E(A(), 'useLocation() may be used only in the context of a <Router> component.'), i.useContext(G).location);
}
var Le = 'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Pe(e) {
  i.useContext(S).static || i.useLayoutEffect(e);
}
function Ct() {
  let {isDataRoute: e} = i.useContext($);
  return e ? _t() : bt();
}
function bt() {
  E(A(), 'useNavigate() may be used only in the context of a <Router> component.');
  let e = i.useContext(F),
    {basename: t, navigator: n} = i.useContext(S),
    {matches: a} = i.useContext($),
    {pathname: r} = I(),
    o = JSON.stringify(we(a)),
    l = i.useRef(!1);
  return (
    Pe(() => {
      l.current = !0;
    }),
    i.useCallback(
      (u, f = {}) => {
        if ((P(l.current, Le), !l.current)) return;
        if (typeof u == 'number') {
          n.go(u);
          return;
        }
        let d = ne(u, JSON.parse(o), r, f.relative === 'path');
        (e == null && t !== '/' && (d.pathname = d.pathname === '/' ? t : L([t, d.pathname])),
          (f.replace ? n.replace : n.push)(d, f.state, f));
      },
      [t, n, o, r, e],
    )
  );
}
i.createContext(null);
function W(e, {relative: t} = {}) {
  let {matches: n} = i.useContext($),
    {pathname: a} = I(),
    r = JSON.stringify(we(n));
  return i.useMemo(() => ne(e, JSON.parse(r), a, t === 'path'), [e, r, a, t]);
}
function St(e, t, n) {
  E(A(), 'useRoutes() may be used only in the context of a <Router> component.');
  let {navigator: a} = i.useContext(S),
    {matches: r} = i.useContext($),
    o = r[r.length - 1],
    l = o ? o.params : {},
    s = o ? o.pathname : '/',
    u = o ? o.pathnameBase : '/',
    f = o && o.route;
  {
    let h = (f && f.path) || '';
    $e(
      s,
      !f || h.endsWith('*') || h.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${h}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${h}"> to <Route path="${h === '/' ? '*' : `${h}/*`}">.`,
    );
  }
  let d = I(),
    c;
  c = d;
  let m = c.pathname || '/',
    y = m;
  if (u !== '/') {
    let h = u.replace(/^\//, '').split('/');
    y = '/' + m.replace(/^\//, '').split('/').slice(h.length).join('/');
  }
  let g = ye(e, {pathname: y});
  return (
    P(f || g != null, `No routes matched location "${c.pathname}${c.search}${c.hash}" `),
    P(
      g == null ||
        g[g.length - 1].route.element !== void 0 ||
        g[g.length - 1].route.Component !== void 0 ||
        g[g.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${c.pathname}${c.search}${c.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ),
    Nt(
      g &&
        g.map((h) =>
          Object.assign({}, h, {
            params: Object.assign({}, l, h.params),
            pathname: L([
              u,
              a.encodeLocation
                ? a.encodeLocation(h.pathname.replace(/\?/g, '%3F').replace(/#/g, '%23')).pathname
                : h.pathname,
            ]),
            pathnameBase:
              h.pathnameBase === '/'
                ? u
                : L([
                    u,
                    a.encodeLocation
                      ? a.encodeLocation(h.pathnameBase.replace(/\?/g, '%3F').replace(/#/g, '%23')).pathname
                      : h.pathnameBase,
                  ]),
          }),
        ),
      r,
      n,
    )
  );
}
function Lt() {
  let e = Ft(),
    t = dt(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    a = 'rgba(200,200,200, 0.5)',
    r = {padding: '0.5rem', backgroundColor: a},
    o = {padding: '2px 4px', backgroundColor: a},
    l = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', e),
    (l = i.createElement(
      i.Fragment,
      null,
      i.createElement('p', null, '💿 Hey developer 👋'),
      i.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        i.createElement('code', {style: o}, 'ErrorBoundary'),
        ' or',
        ' ',
        i.createElement('code', {style: o}, 'errorElement'),
        ' prop on your route.',
      ),
    )),
    i.createElement(
      i.Fragment,
      null,
      i.createElement('h2', null, 'Unexpected Application Error!'),
      i.createElement('h3', {style: {fontStyle: 'italic'}}, t),
      n ? i.createElement('pre', {style: r}, n) : null,
      l,
    )
  );
}
var Pt = i.createElement(Lt, null),
  ke = class extends i.Component {
    constructor(e) {
      (super(e), (this.state = {location: e.location, revalidation: e.revalidation, error: e.error}));
    }
    static getDerivedStateFromError(e) {
      return {error: e};
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location || (t.revalidation !== 'idle' && e.revalidation === 'idle')
        ? {error: e.error, location: e.location, revalidation: e.revalidation}
        : {
            error: e.error !== void 0 ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      this.props.onError
        ? this.props.onError(e, t)
        : console.error('React Router caught the following error during render', e);
    }
    render() {
      let e = this.state.error;
      if (this.context && typeof e == 'object' && e && 'digest' in e && typeof e.digest == 'string') {
        const n = Et(e.digest);
        n && (e = n);
      }
      let t =
        e !== void 0
          ? i.createElement(
              $.Provider,
              {value: this.props.routeContext},
              i.createElement(re.Provider, {value: e, children: this.props.component}),
            )
          : this.props.children;
      return this.context ? i.createElement(kt, {error: e}, t) : t;
    }
  };
ke.contextType = pt;
var Z = new WeakMap();
function kt({children: e, error: t}) {
  let {basename: n} = i.useContext(S);
  if (typeof t == 'object' && t && 'digest' in t && typeof t.digest == 'string') {
    let a = wt(t.digest);
    if (a) {
      let r = Z.get(t);
      if (r) throw r;
      let o = xe(a.location, n);
      if (Ee && !Z.get(t))
        if (o.isExternal || a.reloadDocument) window.location.href = o.absoluteURL || o.to;
        else {
          const l = Promise.resolve().then(() => window.__reactRouterDataRouter.navigate(o.to, {replace: a.replace}));
          throw (Z.set(t, l), l);
        }
      return i.createElement('meta', {httpEquiv: 'refresh', content: `0;url=${o.absoluteURL || o.to}`});
    }
  }
  return e;
}
function $t({routeContext: e, match: t, children: n}) {
  let a = i.useContext(F);
  return (
    a &&
      a.static &&
      a.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = t.route.id),
    i.createElement($.Provider, {value: e}, n)
  );
}
function Nt(e, t = [], n) {
  let a = n?.state;
  if (e == null) {
    if (!a) return null;
    if (a.errors) e = a.matches;
    else if (t.length === 0 && !a.initialized && a.matches.length > 0) e = a.matches;
    else return null;
  }
  let r = e,
    o = a?.errors;
  if (o != null) {
    let d = r.findIndex((c) => c.route.id && o?.[c.route.id] !== void 0);
    (E(d >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(o).join(',')}`),
      (r = r.slice(0, Math.min(r.length, d + 1))));
  }
  let l = !1,
    s = -1;
  if (n && a) {
    l = a.renderFallback;
    for (let d = 0; d < r.length; d++) {
      let c = r[d];
      if (((c.route.HydrateFallback || c.route.hydrateFallbackElement) && (s = d), c.route.id)) {
        let {loaderData: m, errors: y} = a,
          g = c.route.loader && !m.hasOwnProperty(c.route.id) && (!y || y[c.route.id] === void 0);
        if (c.route.lazy || g) {
          (n.isStatic && (l = !0), s >= 0 ? (r = r.slice(0, s + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let u = n?.onError,
    f =
      a && u
        ? (d, c) => {
            u(d, {
              location: a.location,
              params: a.matches?.[0]?.params ?? {},
              unstable_pattern: ht(a.matches),
              errorInfo: c,
            });
          }
        : void 0;
  return r.reduceRight((d, c, m) => {
    let y,
      g = !1,
      p = null,
      h = null;
    a &&
      ((y = o && c.route.id ? o[c.route.id] : void 0),
      (p = c.route.errorElement || Pt),
      l &&
        (s < 0 && m === 0
          ? ($e('route-fallback', !1, 'No `HydrateFallback` element provided to render during initial hydration'),
            (g = !0),
            (h = null))
          : s === m && ((g = !0), (h = c.route.hydrateFallbackElement || null))));
    let v = t.concat(r.slice(0, m + 1)),
      R = () => {
        let w;
        return (
          y
            ? (w = p)
            : g
              ? (w = h)
              : c.route.Component
                ? (w = i.createElement(c.route.Component, null))
                : c.route.element
                  ? (w = c.route.element)
                  : (w = d),
          i.createElement($t, {match: c, routeContext: {outlet: d, matches: v, isDataRoute: a != null}, children: w})
        );
      };
    return a && (c.route.ErrorBoundary || c.route.errorElement || m === 0)
      ? i.createElement(ke, {
          location: a.location,
          revalidation: a.revalidation,
          component: p,
          error: y,
          children: R(),
          routeContext: {outlet: null, matches: v, isDataRoute: !0},
          onError: f,
        })
      : R();
  }, null);
}
function ae(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Tt(e) {
  let t = i.useContext(F);
  return (E(t, ae(e)), t);
}
function Dt(e) {
  let t = i.useContext(Y);
  return (E(t, ae(e)), t);
}
function It(e) {
  let t = i.useContext($);
  return (E(t, ae(e)), t);
}
function oe(e) {
  let t = It(e),
    n = t.matches[t.matches.length - 1];
  return (E(n.route.id, `${e} can only be used on routes that contain a unique "id"`), n.route.id);
}
function Ot() {
  return oe('useRouteId');
}
function Ft() {
  let e = i.useContext(re),
    t = Dt('useRouteError'),
    n = oe('useRouteError');
  return e !== void 0 ? e : t.errors?.[n];
}
function _t() {
  let {router: e} = Tt('useNavigate'),
    t = oe('useNavigate'),
    n = i.useRef(!1);
  return (
    Pe(() => {
      n.current = !0;
    }),
    i.useCallback(
      async (r, o = {}) => {
        (P(n.current, Le),
          n.current && (typeof r == 'number' ? await e.navigate(r) : await e.navigate(r, {fromRouteId: t, ...o})));
      },
      [e, t],
    )
  );
}
var pe = {};
function $e(e, t, n) {
  !t && !pe[e] && ((pe[e] = !0), P(!1, n));
}
i.memo(Mt);
function Mt({routes: e, future: t, state: n, isStatic: a, onError: r}) {
  return St(e, void 0, {state: n, isStatic: a, onError: r});
}
function Ut({
  basename: e = '/',
  children: t = null,
  location: n,
  navigationType: a = 'POP',
  navigator: r,
  static: o = !1,
  unstable_useTransitions: l,
}) {
  E(!A(), 'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.');
  let s = e.replace(/^\/*/, '/'),
    u = i.useMemo(() => ({basename: s, navigator: r, static: o, unstable_useTransitions: l, future: {}}), [s, r, o, l]);
  typeof n == 'string' && (n = B(n));
  let {pathname: f = '/', search: d = '', hash: c = '', state: m = null, key: y = 'default', unstable_mask: g} = n,
    p = i.useMemo(() => {
      let h = k(f, s);
      return h == null
        ? null
        : {location: {pathname: h, search: d, hash: c, state: m, key: y, unstable_mask: g}, navigationType: a};
    }, [s, f, d, c, m, y, a, g]);
  return (
    P(
      p != null,
      `<Router basename="${s}"> is not able to match the URL "${f}${d}${c}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    p == null ? null : i.createElement(S.Provider, {value: u}, i.createElement(G.Provider, {children: t, value: p}))
  );
}
var z = 'get',
  V = 'application/x-www-form-urlencoded';
function q(e) {
  return typeof HTMLElement < 'u' && e instanceof HTMLElement;
}
function Bt(e) {
  return q(e) && e.tagName.toLowerCase() === 'button';
}
function At(e) {
  return q(e) && e.tagName.toLowerCase() === 'form';
}
function Wt(e) {
  return q(e) && e.tagName.toLowerCase() === 'input';
}
function Ht(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function jt(e, t) {
  return e.button === 0 && (!t || t === '_self') && !Ht(e);
}
var H = null;
function zt() {
  if (H === null)
    try {
      (new FormData(document.createElement('form'), 0), (H = !1));
    } catch {
      H = !0;
    }
  return H;
}
var Vt = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function ee(e) {
  return e != null && !Vt.has(e)
    ? (P(!1, `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${V}"`), null)
    : e;
}
function Jt(e, t) {
  let n, a, r, o, l;
  if (At(e)) {
    let s = e.getAttribute('action');
    ((a = s ? k(s, t) : null),
      (n = e.getAttribute('method') || z),
      (r = ee(e.getAttribute('enctype')) || V),
      (o = new FormData(e)));
  } else if (Bt(e) || (Wt(e) && (e.type === 'submit' || e.type === 'image'))) {
    let s = e.form;
    if (s == null) throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let u = e.getAttribute('formaction') || s.getAttribute('action');
    if (
      ((a = u ? k(u, t) : null),
      (n = e.getAttribute('formmethod') || s.getAttribute('method') || z),
      (r = ee(e.getAttribute('formenctype')) || ee(s.getAttribute('enctype')) || V),
      (o = new FormData(s, e)),
      !zt())
    ) {
      let {name: f, type: d, value: c} = e;
      if (d === 'image') {
        let m = f ? `${f}.` : '';
        (o.append(`${m}x`, '0'), o.append(`${m}y`, '0'));
      } else f && o.append(f, c);
    }
  } else {
    if (q(e)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    ((n = z), (a = null), (r = V), (l = e));
  }
  return (
    o && r === 'text/plain' && ((l = o), (o = void 0)),
    {action: a, method: n.toLowerCase(), encType: r, formData: o, body: l}
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function le(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t);
}
function Kt(e, t, n, a) {
  let r = typeof e == 'string' ? new URL(e, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin) : e;
  return (
    n
      ? r.pathname.endsWith('/')
        ? (r.pathname = `${r.pathname}_.${a}`)
        : (r.pathname = `${r.pathname}.${a}`)
      : r.pathname === '/'
        ? (r.pathname = `_root.${a}`)
        : t && k(r.pathname, t) === '/'
          ? (r.pathname = `${t.replace(/\/$/, '')}/_root.${a}`)
          : (r.pathname = `${r.pathname.replace(/\/$/, '')}.${a}`),
    r
  );
}
async function Yt(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let n = await import(e.module);
    return ((t[e.id] = n), n);
  } catch (n) {
    return (
      console.error(`Error loading route module \`${e.module}\`, reloading page...`),
      console.error(n),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Gt(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === 'preload' && typeof e.imageSrcSet == 'string' && typeof e.imageSizes == 'string'
      : typeof e.rel == 'string' && typeof e.href == 'string';
}
async function qt(e, t, n) {
  let a = await Promise.all(
    e.map(async (r) => {
      let o = t.routes[r.route.id];
      if (o) {
        let l = await Yt(o, n);
        return l.links ? l.links() : [];
      }
      return [];
    }),
  );
  return en(
    a
      .flat(1)
      .filter(Gt)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) => (r.rel === 'stylesheet' ? {...r, rel: 'prefetch', as: 'style'} : {...r, rel: 'prefetch'})),
  );
}
function ge(e, t, n, a, r, o) {
  let l = (u, f) => (n[f] ? u.route.id !== n[f].route.id : !0),
    s = (u, f) =>
      n[f].pathname !== u.pathname || (n[f].route.path?.endsWith('*') && n[f].params['*'] !== u.params['*']);
  return o === 'assets'
    ? t.filter((u, f) => l(u, f) || s(u, f))
    : o === 'data'
      ? t.filter((u, f) => {
          let d = a.routes[u.route.id];
          if (!d || !d.hasLoader) return !1;
          if (l(u, f) || s(u, f)) return !0;
          if (u.route.shouldRevalidate) {
            let c = u.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: n[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: u.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof c == 'boolean') return c;
          }
          return !0;
        })
      : [];
}
function Xt(e, t, {includeHydrateFallback: n} = {}) {
  return Qt(
    e
      .map((a) => {
        let r = t.routes[a.route.id];
        if (!r) return [];
        let o = [r.module];
        return (
          r.clientActionModule && (o = o.concat(r.clientActionModule)),
          r.clientLoaderModule && (o = o.concat(r.clientLoaderModule)),
          n && r.hydrateFallbackModule && (o = o.concat(r.hydrateFallbackModule)),
          r.imports && (o = o.concat(r.imports)),
          o
        );
      })
      .flat(1),
  );
}
function Qt(e) {
  return [...new Set(e)];
}
function Zt(e) {
  let t = {},
    n = Object.keys(e).sort();
  for (let a of n) t[a] = e[a];
  return t;
}
function en(e, t) {
  let n = new Set();
  return (
    new Set(t),
    e.reduce((a, r) => {
      let o = JSON.stringify(Zt(r));
      return (n.has(o) || (n.add(o), a.push({key: o, link: r})), a);
    }, [])
  );
}
function Ne() {
  let e = i.useContext(F);
  return (le(e, 'You must render this element inside a <DataRouterContext.Provider> element'), e);
}
function tn() {
  let e = i.useContext(Y);
  return (le(e, 'You must render this element inside a <DataRouterStateContext.Provider> element'), e);
}
var ie = i.createContext(void 0);
ie.displayName = 'FrameworkContext';
function Te() {
  let e = i.useContext(ie);
  return (le(e, 'You must render this element inside a <HydratedRouter> element'), e);
}
function nn(e, t) {
  let n = i.useContext(ie),
    [a, r] = i.useState(!1),
    [o, l] = i.useState(!1),
    {onFocus: s, onBlur: u, onMouseEnter: f, onMouseLeave: d, onTouchStart: c} = t,
    m = i.useRef(null);
  (i.useEffect(() => {
    if ((e === 'render' && l(!0), e === 'viewport')) {
      let p = (v) => {
          v.forEach((R) => {
            l(R.isIntersecting);
          });
        },
        h = new IntersectionObserver(p, {threshold: 0.5});
      return (
        m.current && h.observe(m.current),
        () => {
          h.disconnect();
        }
      );
    }
  }, [e]),
    i.useEffect(() => {
      if (a) {
        let p = setTimeout(() => {
          l(!0);
        }, 100);
        return () => {
          clearTimeout(p);
        };
      }
    }, [a]));
  let y = () => {
      r(!0);
    },
    g = () => {
      (r(!1), l(!1));
    };
  return n
    ? e !== 'intent'
      ? [o, m, {}]
      : [o, m, {onFocus: M(s, y), onBlur: M(u, g), onMouseEnter: M(f, y), onMouseLeave: M(d, g), onTouchStart: M(c, y)}]
    : [!1, m, {}];
}
function M(e, t) {
  return (n) => {
    (e && e(n), n.defaultPrevented || t(n));
  };
}
function rn({page: e, ...t}) {
  let {router: n} = Ne(),
    a = i.useMemo(() => ye(n.routes, e, n.basename), [n.routes, e, n.basename]);
  return a ? i.createElement(on, {page: e, matches: a, ...t}) : null;
}
function an(e) {
  let {manifest: t, routeModules: n} = Te(),
    [a, r] = i.useState([]);
  return (
    i.useEffect(() => {
      let o = !1;
      return (
        qt(e, t, n).then((l) => {
          o || r(l);
        }),
        () => {
          o = !0;
        }
      );
    }, [e, t, n]),
    a
  );
}
function on({page: e, matches: t, ...n}) {
  let a = I(),
    {future: r, manifest: o, routeModules: l} = Te(),
    {basename: s} = Ne(),
    {loaderData: u, matches: f} = tn(),
    d = i.useMemo(() => ge(e, t, f, o, a, 'data'), [e, t, f, o, a]),
    c = i.useMemo(() => ge(e, t, f, o, a, 'assets'), [e, t, f, o, a]),
    m = i.useMemo(() => {
      if (e === a.pathname + a.search + a.hash) return [];
      let p = new Set(),
        h = !1;
      if (
        (t.forEach((R) => {
          let w = o.routes[R.route.id];
          !w ||
            !w.hasLoader ||
            ((!d.some((b) => b.route.id === R.route.id) && R.route.id in u && l[R.route.id]?.shouldRevalidate) ||
            w.hasClientLoader
              ? (h = !0)
              : p.add(R.route.id));
        }),
        p.size === 0)
      )
        return [];
      let v = Kt(e, s, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        h &&
          p.size > 0 &&
          v.searchParams.set(
            '_routes',
            t
              .filter((R) => p.has(R.route.id))
              .map((R) => R.route.id)
              .join(','),
          ),
        [v.pathname + v.search]
      );
    }, [s, r.unstable_trailingSlashAwareDataRequests, u, a, o, d, t, e, l]),
    y = i.useMemo(() => Xt(c, o), [c, o]),
    g = an(c);
  return i.createElement(
    i.Fragment,
    null,
    m.map((p) => i.createElement('link', {key: p, rel: 'prefetch', as: 'fetch', href: p, ...n})),
    y.map((p) => i.createElement('link', {key: p, rel: 'modulepreload', href: p, ...n})),
    g.map(({key: p, link: h}) =>
      i.createElement('link', {key: p, nonce: n.nonce, ...h, crossOrigin: h.crossOrigin ?? n.crossOrigin}),
    ),
  );
}
function ln(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == 'function' ? n(t) : n != null && (n.current = t);
    });
  };
}
var sn = typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  sn && (window.__reactRouterVersion = '7.13.1');
} catch {}
function un({basename: e, children: t, unstable_useTransitions: n, window: a}) {
  let r = i.useRef();
  r.current == null && (r.current = He({window: a, v5Compat: !0}));
  let o = r.current,
    [l, s] = i.useState({action: o.action, location: o.location}),
    u = i.useCallback(
      (f) => {
        n === !1 ? s(f) : i.startTransition(() => s(f));
      },
      [n],
    );
  return (
    i.useLayoutEffect(() => o.listen(u), [o, u]),
    i.createElement(Ut, {
      basename: e,
      children: t,
      location: l.location,
      navigationType: l.action,
      navigator: o,
      unstable_useTransitions: n,
    })
  );
}
var De = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  K = i.forwardRef(function (
    {
      onClick: t,
      discover: n = 'render',
      prefetch: a = 'none',
      relative: r,
      reloadDocument: o,
      replace: l,
      unstable_mask: s,
      state: u,
      target: f,
      to: d,
      preventScrollReset: c,
      viewTransition: m,
      unstable_defaultShouldRevalidate: y,
      ...g
    },
    p,
  ) {
    let {basename: h, navigator: v, unstable_useTransitions: R} = i.useContext(S),
      w = typeof d == 'string' && De.test(d),
      b = xe(d, h);
    d = b.to;
    let x = xt(d, {relative: r}),
      N = I(),
      T = null;
    if (s) {
      let D = ne(s, [], N.unstable_mask ? N.unstable_mask.pathname : '/', !0);
      (h !== '/' && (D.pathname = D.pathname === '/' ? h : L([h, D.pathname])), (T = v.createHref(D)));
    }
    let [O, _, X] = nn(a, g),
      Fe = hn(d, {
        replace: l,
        unstable_mask: s,
        state: u,
        target: f,
        preventScrollReset: c,
        relative: r,
        viewTransition: m,
        unstable_defaultShouldRevalidate: y,
        unstable_useTransitions: R,
      });
    function _e(D) {
      (t && t(D), D.defaultPrevented || Fe(D));
    }
    let se = !(b.isExternal || o),
      ue = i.createElement('a', {
        ...g,
        ...X,
        href: (se ? T : void 0) || b.absoluteURL || x,
        onClick: se ? _e : t,
        ref: ln(p, _),
        target: f,
        'data-discover': !w && n === 'render' ? 'true' : void 0,
      });
    return O && !w ? i.createElement(i.Fragment, null, ue, i.createElement(rn, {page: x})) : ue;
  });
K.displayName = 'Link';
var cn = i.forwardRef(function (
  {
    'aria-current': t = 'page',
    caseSensitive: n = !1,
    className: a = '',
    end: r = !1,
    style: o,
    to: l,
    viewTransition: s,
    children: u,
    ...f
  },
  d,
) {
  let c = W(l, {relative: f.relative}),
    m = I(),
    y = i.useContext(Y),
    {navigator: g, basename: p} = i.useContext(S),
    h = y != null && vn(c) && s === !0,
    v = g.encodeLocation ? g.encodeLocation(c).pathname : c.pathname,
    R = m.pathname,
    w = y && y.navigation && y.navigation.location ? y.navigation.location.pathname : null;
  (n || ((R = R.toLowerCase()), (w = w ? w.toLowerCase() : null), (v = v.toLowerCase())), w && p && (w = k(w, p) || w));
  const b = v !== '/' && v.endsWith('/') ? v.length - 1 : v.length;
  let x = R === v || (!r && R.startsWith(v) && R.charAt(b) === '/'),
    N = w != null && (w === v || (!r && w.startsWith(v) && w.charAt(v.length) === '/')),
    T = {isActive: x, isPending: N, isTransitioning: h},
    O = x ? t : void 0,
    _;
  typeof a == 'function'
    ? (_ = a(T))
    : (_ = [a, x ? 'active' : null, N ? 'pending' : null, h ? 'transitioning' : null].filter(Boolean).join(' '));
  let X = typeof o == 'function' ? o(T) : o;
  return i.createElement(
    K,
    {...f, 'aria-current': O, className: _, ref: d, style: X, to: l, viewTransition: s},
    typeof u == 'function' ? u(T) : u,
  );
});
cn.displayName = 'NavLink';
var fn = i.forwardRef(
  (
    {
      discover: e = 'render',
      fetcherKey: t,
      navigate: n,
      reloadDocument: a,
      replace: r,
      state: o,
      method: l = z,
      action: s,
      onSubmit: u,
      relative: f,
      preventScrollReset: d,
      viewTransition: c,
      unstable_defaultShouldRevalidate: m,
      ...y
    },
    g,
  ) => {
    let {unstable_useTransitions: p} = i.useContext(S),
      h = gn(),
      v = yn(s, {relative: f}),
      R = l.toLowerCase() === 'get' ? 'get' : 'post',
      w = typeof s == 'string' && De.test(s),
      b = (x) => {
        if ((u && u(x), x.defaultPrevented)) return;
        x.preventDefault();
        let N = x.nativeEvent.submitter,
          T = N?.getAttribute('formmethod') || l,
          O = () =>
            h(N || x.currentTarget, {
              fetcherKey: t,
              method: T,
              navigate: n,
              replace: r,
              state: o,
              relative: f,
              preventScrollReset: d,
              viewTransition: c,
              unstable_defaultShouldRevalidate: m,
            });
        p && n !== !1 ? i.startTransition(() => O()) : O();
      };
    return i.createElement('form', {
      ref: g,
      method: R,
      action: v,
      onSubmit: a ? u : b,
      ...y,
      'data-discover': !w && e === 'render' ? 'true' : void 0,
    });
  },
);
fn.displayName = 'Form';
function dn(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ie(e) {
  let t = i.useContext(F);
  return (E(t, dn(e)), t);
}
function hn(
  e,
  {
    target: t,
    replace: n,
    unstable_mask: a,
    state: r,
    preventScrollReset: o,
    relative: l,
    viewTransition: s,
    unstable_defaultShouldRevalidate: u,
    unstable_useTransitions: f,
  } = {},
) {
  let d = Ct(),
    c = I(),
    m = W(e, {relative: l});
  return i.useCallback(
    (y) => {
      if (jt(y, t)) {
        y.preventDefault();
        let g = n !== void 0 ? n : U(c) === U(m),
          p = () =>
            d(e, {
              replace: g,
              unstable_mask: a,
              state: r,
              preventScrollReset: o,
              relative: l,
              viewTransition: s,
              unstable_defaultShouldRevalidate: u,
            });
        f ? i.startTransition(() => p()) : p();
      }
    },
    [c, d, m, n, a, r, t, e, o, l, s, u, f],
  );
}
var mn = 0,
  pn = () => `__${String(++mn)}__`;
function gn() {
  let {router: e} = Ie('useSubmit'),
    {basename: t} = i.useContext(S),
    n = Ot(),
    a = e.fetch,
    r = e.navigate;
  return i.useCallback(
    async (o, l = {}) => {
      let {action: s, method: u, encType: f, formData: d, body: c} = Jt(o, t);
      if (l.navigate === !1) {
        let m = l.fetcherKey || pn();
        await a(m, n, l.action || s, {
          unstable_defaultShouldRevalidate: l.unstable_defaultShouldRevalidate,
          preventScrollReset: l.preventScrollReset,
          formData: d,
          body: c,
          formMethod: l.method || u,
          formEncType: l.encType || f,
          flushSync: l.flushSync,
        });
      } else
        await r(l.action || s, {
          unstable_defaultShouldRevalidate: l.unstable_defaultShouldRevalidate,
          preventScrollReset: l.preventScrollReset,
          formData: d,
          body: c,
          formMethod: l.method || u,
          formEncType: l.encType || f,
          replace: l.replace,
          state: l.state,
          fromRouteId: n,
          flushSync: l.flushSync,
          viewTransition: l.viewTransition,
        });
    },
    [a, r, t, n],
  );
}
function yn(e, {relative: t} = {}) {
  let {basename: n} = i.useContext(S),
    a = i.useContext($);
  E(a, 'useFormAction must be used inside a RouteContext');
  let [r] = a.matches.slice(-1),
    o = {...W(e || '.', {relative: t})},
    l = I();
  if (e == null) {
    o.search = l.search;
    let s = new URLSearchParams(o.search),
      u = s.getAll('index');
    if (u.some((d) => d === '')) {
      (s.delete('index'), u.filter((c) => c).forEach((c) => s.append('index', c)));
      let d = s.toString();
      o.search = d ? `?${d}` : '';
    }
  }
  return (
    (!e || e === '.') && r.route.index && (o.search = o.search ? o.search.replace(/^\?/, '?index&') : '?index'),
    n !== '/' && (o.pathname = o.pathname === '/' ? n : L([n, o.pathname])),
    U(o)
  );
}
function vn(e, {relative: t} = {}) {
  let n = i.useContext(be);
  E(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let {basename: a} = Ie('useViewTransitionState'),
    r = W(e, {relative: t});
  if (!n.isTransitioning) return !1;
  let o = k(n.currentLocation.pathname, a) || n.currentLocation.pathname,
    l = k(n.nextLocation.pathname, a) || n.nextLocation.pathname;
  return J(r.pathname, l) != null || J(r.pathname, o) != null;
}
const Oe = () => {
  const {user: e} = Me();
  return C.jsxs('nav', {
    className: 'navbar',
    children: [
      C.jsx('div', {
        className: 'navbar-brand',
        children: C.jsx(K, {to: '/', children: C.jsx('h1', {children: 'Elysia Notes'})}),
      }),
      C.jsxs('div', {
        className: 'navbar-menu',
        children: [
          C.jsx(Ue, {
            children: C.jsxs('div', {
              className: 'user-section',
              children: [
                C.jsx(K, {to: '/notes', className: 'nav-link', children: 'My Notes'}),
                C.jsxs('span', {className: 'welcome-message', children: ['Hello, ', e?.firstName || 'User']}),
                C.jsx(Be, {}),
              ],
            }),
          }),
          C.jsx(Ae, {
            children: C.jsx(We, {
              mode: 'modal',
              children: C.jsx('button', {className: 'auth-button signin', children: 'Sign In'}),
            }),
          }),
        ],
      }),
    ],
  });
};
Oe.__docgenInfo = {description: '', methods: [], displayName: 'Navbar'};
const Cn = {title: 'Layout/Navbar', component: Oe, decorators: [(e) => C.jsx(un, {children: C.jsx(e, {})})]},
  j = {};
j.parameters = {
  ...j.parameters,
  docs: {...j.parameters?.docs, source: {originalSource: '{}', ...j.parameters?.docs?.source}},
};
const bn = ['Default'];
export {j as Default, bn as __namedExportsOrder, Cn as default};
