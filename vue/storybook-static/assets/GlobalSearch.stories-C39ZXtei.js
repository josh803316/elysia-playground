import {
  i as N,
  d as K,
  w as G,
  o as I,
  a as R,
  c as s,
  b as T,
  e as v,
  v as U,
  r as c,
  f as w,
  F as j,
  g as B,
  h as n,
  t as A,
} from './iframe-DUTSPts5.js';
import { u as D, _ as F } from './_plugin-vue_export-helper-7e0p2dfe.js';
import './preload-helper-PPVm8Dsz.js';
const V = Symbol('');
function $() {
  return N(V);
}
const L = Symbol('search-notes');
function O() {
  const u = N(L);
  if (!u)
    throw new Error('useSearchNotes must be used under a provider that calls provideSearchNotes');
  return u;
}
const M = { key: 0, class: 'search-dropdown' },
  z = { key: 0, class: 'search-item search-muted' },
  H = { key: 1, class: 'search-item search-muted' },
  P = ['onClick'],
  X = { class: 'search-result-title' },
  Y = { key: 0, class: 'search-result-snippet' },
  d = K({
    __name: 'GlobalSearch',
    props: { adminApiKey: { default: null } },
    setup(u) {
      const y = u,
        { getToken: E } = D(),
        { setSearch: _, clearSearch: S } = O(),
        r = c(''),
        l = c([]),
        m = c(!1),
        o = c(!1),
        p = c(null),
        x = $();
      let h = null;
      G(r, (t) => {
        if (!t.trim()) {
          ((l.value = []), (o.value = !1), S());
          return;
        }
        (h && clearTimeout(h),
          (h = setTimeout(async () => {
            m.value = !0;
            try {
              const a = {},
                e = await E.value();
              (e && (a.Authorization = `Bearer ${e}`),
                y.adminApiKey && (a['X-API-Key'] = y.adminApiKey));
              const f = await fetch(`/api/notes/search?q=${encodeURIComponent(t.trim())}`, {
                headers: a,
              });
              if (!f.ok) throw new Error('Search failed');
              const b = await f.json(),
                k = Array.isArray(b) ? b : [];
              ((l.value = k), _(t.trim(), k), (o.value = !0));
            } catch {
              ((l.value = []), _(t.trim(), []));
            } finally {
              m.value = !1;
            }
          }, 200)));
      });
      function g(t) {
        p.value && !p.value.contains(t.target) && (o.value = !1);
      }
      (I(() => document.addEventListener('mousedown', g)),
        R(() => document.removeEventListener('mousedown', g)));
      function C(t) {
        ((o.value = !1), (r.value = ''), S(), x.push('/notes'));
      }
      return (t, a) => (
        n(),
        s(
          'div',
          { ref_key: 'containerRef', ref: p, class: 'global-search' },
          [
            T(
              w(
                'input',
                {
                  'onUpdate:modelValue': a[0] || (a[0] = (e) => (r.value = e)),
                  type: 'search',
                  placeholder: 'Search notes…',
                  class: 'search-input',
                  'aria-label': 'Search notes',
                  'data-testid': 'global-search-input',
                  onFocus: a[1] || (a[1] = (e) => r.value.trim() && (o.value = !0)),
                },
                null,
                544,
              ),
              [[U, r.value]],
            ),
            o.value
              ? (n(),
                s('div', M, [
                  m.value
                    ? (n(), s('div', z, 'Searching…'))
                    : l.value.length === 0
                      ? (n(), s('div', H, 'No notes found'))
                      : v('', !0),
                  (n(!0),
                  s(
                    j,
                    null,
                    B(
                      l.value,
                      (e) => (
                        n(),
                        s(
                          'button',
                          {
                            key: e.id,
                            type: 'button',
                            class: 'search-item search-result',
                            onClick: (f) => C(),
                          },
                          [
                            w('span', X, A(e.title || 'Untitled'), 1),
                            e.content
                              ? (n(), s('span', Y, A(e.content.slice(0, 60)) + '…', 1))
                              : v('', !0),
                          ],
                          8,
                          P,
                        )
                      ),
                    ),
                    128,
                  )),
                ]))
              : v('', !0),
          ],
          512,
        )
      );
    },
  }),
  q = F(d, [['__scopeId', 'data-v-d92d8af9']]);
d.__docgenInfo = Object.assign(
  { displayName: d.name ?? d.__name },
  {
    exportName: 'default',
    displayName: 'GlobalSearch',
    description: '',
    tags: {},
    props: [
      {
        name: 'adminApiKey',
        required: !1,
        type: { name: 'union', elements: [{ name: 'string' }, { name: 'null' }] },
        defaultValue: { func: !1, value: 'null' },
      },
    ],
    sourceFiles: ['/Users/joshnisenson/git/elysia-playground/vue/src/components/GlobalSearch.vue'],
  },
);
const Z = { title: 'Search/GlobalSearch', component: q },
  i = {};
i.parameters = {
  ...i.parameters,
  docs: { ...i.parameters?.docs, source: { originalSource: '{}', ...i.parameters?.docs?.source } },
};
const ee = ['Default'];
export { i as Default, ee as __namedExportsOrder, Z as default };
