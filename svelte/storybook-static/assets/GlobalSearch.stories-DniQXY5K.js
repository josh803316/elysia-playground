import {
  o as I,
  p as Q,
  a as W,
  s as g,
  b as Z,
  u as ee,
  f,
  e as L,
  i as R,
  g as s,
  c as l,
  d as te,
  h as p,
  j as a,
  $ as ae,
  k as se,
  l as O,
  m as re,
  n as ne,
  t as U,
  q as $,
  r as oe,
  v as le,
} from './iframe-3AYY9gF4.js';
import {w as ie, b as ce, a as de, e as ue} from './index-C0mD0_9W.js';
import './preload-helper-PPVm8Dsz.js';
var fe = {};
const ve = fe?.base ?? '';
new URL('sveltekit-internal://');
new TextEncoder();
new TextDecoder();
const he = window.fetch;
window.fetch = (t, r) => (
  (t instanceof Request ? t.method : r?.method || 'GET') !== 'GET' && pe.delete(me(t)),
  he(t, r)
);
const pe = new Map();
function me(t, r) {
  return `script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request ? t.url : t)}]`;
}
const j = new Set(['load', 'prerender', 'csr', 'ssr', 'trailingSlash', 'config']);
[...j];
const _e = new Set([...j]);
[..._e];
const ye = I.toString().includes('$$') || /function \w+\(\) \{\}/.test(I.toString());
ye && new URL('https://example.com');
function we() {
  const {subscribe: t, set: r} = ie({query: '', results: []});
  return {subscribe: t, setSearch: (i, o) => r({query: i, results: o}), clearSearch: () => r({query: '', results: []})};
}
const k = we();
var Se = f('<div class="search-item search-muted svelte-1ytcet">Searching…</div>'),
  be = f('<div class="search-item search-muted svelte-1ytcet">No notes found</div>'),
  ge = f('<span class="search-result-snippet svelte-1ytcet"> </span>'),
  ke = f(
    '<button type="button" class="search-item search-result svelte-1ytcet"><span class="search-result-title svelte-1ytcet"> </span> <!></button>',
  ),
  xe = f('<div class="search-dropdown svelte-1ytcet"><!></div>'),
  Ae = f(
    '<div class="global-search svelte-1ytcet"><input type="search" placeholder="Search notes…" class="search-input svelte-1ytcet" aria-label="Search notes" data-testid="global-search-input"/> <!></div>',
  );
function M(t, r) {
  Q(r, !0);
  let i = W(r, 'adminApiKey', 3, null),
    o = g(''),
    v = g(Z([])),
    A = g(!1),
    c = g(!1),
    m,
    h = null;
  ee(() => {
    const e = s(o).trim();
    if (!e) {
      (a(v, [], !0), a(c, !1), k.clearSearch());
      return;
    }
    return (
      h && clearTimeout(h),
      (h = setTimeout(async () => {
        a(A, !0);
        try {
          const d = {};
          if (typeof window < 'u' && window.Clerk?.session) {
            const S = await window.Clerk.session.getToken();
            S && (d.Authorization = `Bearer ${S}`);
          }
          i() && (d['X-API-Key'] = i());
          const _ = await fetch(`/api/notes/search?q=${encodeURIComponent(e)}`, {headers: d});
          if (!_.ok) throw new Error('Search failed');
          const y = await _.json(),
            w = Array.isArray(y) ? y : [];
          (a(v, w, !0), k.setSearch(e, w), a(c, !0));
        } catch {
          (a(v, [], !0), k.setSearch(e, []));
        } finally {
          a(A, !1);
        }
      }, 200)),
      () => {
        h && clearTimeout(h);
      }
    );
  });
  function N(e) {
    m && !m.contains(e.target) && a(c, !1);
  }
  function P() {
    (a(c, !1), a(o, ''), k.clearSearch());
  }
  var T = Ae();
  L('mousedown', ae, N);
  var q = p(T),
    V = O(q, 2);
  {
    var z = (e) => {
      var d = xe(),
        _ = p(d);
      {
        var y = (n) => {
            var u = Se();
            l(n, u);
          },
          w = (n) => {
            var u = be();
            l(n, u);
          },
          S = (n) => {
            var u = re(),
              B = ne(u);
            (ue(
              B,
              17,
              () => s(v),
              (E) => E.id,
              (E, b) => {
                var G = ke(),
                  C = p(G),
                  J = p(C),
                  X = O(C, 2);
                {
                  var Y = (K) => {
                    var D = ge(),
                      F = p(D);
                    (U((H) => $(F, `${H ?? ''}…`), [() => s(b).content.slice(0, 60)]), l(K, D));
                  };
                  R(X, (K) => {
                    s(b).content && K(Y);
                  });
                }
                (U(() => $(J, s(b).title || 'Untitled')),
                  oe('click', G, () => {
                    (P(), le(`${ve}/notes/${s(b).id}/edit`));
                  }),
                  l(E, G));
              },
            ),
              l(n, u));
          };
        R(_, (n) => {
          s(A) ? n(y) : s(v).length === 0 ? n(w, 1) : n(S, !1);
        });
      }
      l(e, d);
    };
    R(V, (e) => {
      s(c) && e(z);
    });
  }
  (ce(
    T,
    (e) => (m = e),
    () => m,
  ),
    L('focus', q, () => s(o).trim() && a(c, !0)),
    de(
      q,
      () => s(o),
      (e) => a(o, e),
    ),
    l(t, T),
    te());
}
se(['click']);
M.__docgen = {
  data: [
    {
      name: 'adminApiKey',
      visibility: 'public',
      keywords: [],
      kind: 'let',
      type: {kind: 'type', type: 'string', text: 'string'},
      static: !1,
      readonly: !1,
      defaultValue: 'null',
    },
  ],
  name: 'GlobalSearch.svelte',
};
const Ge = {title: 'Search/GlobalSearch', component: M},
  x = {};
x.parameters = {
  ...x.parameters,
  docs: {...x.parameters?.docs, source: {originalSource: '{}', ...x.parameters?.docs?.source}},
};
const Ke = ['Default'];
export {x as Default, Ke as __namedExportsOrder, Ge as default};
