import {
  i as v,
  D as b,
  w as W,
  d as u,
  c as j,
  h as q,
  B as P,
  l as z,
  F as L,
  H as ne,
  a as oe,
  I as H,
  r as E,
  T as ae,
  J as k,
} from './iframe-DUTSPts5.js';
const se = Object.freeze({
  InvalidProxyUrlErrorMessage:
    "The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})",
  InvalidPublishableKeyErrorMessage:
    'The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})',
  MissingPublishableKeyErrorMessage:
    'Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.',
  MissingSecretKeyErrorMessage:
    'Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.',
  MissingClerkProvider:
    '{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider',
});
function Z({ packageName: e, customMessages: t }) {
  let r = e;
  function n(a, s) {
    if (!s) return `${r}: ${a}`;
    let l = a;
    const i = a.matchAll(/{{([a-zA-Z0-9-_]+)}}/g);
    for (const c of i) {
      const d = (s[c[1]] || '').toString();
      l = l.replace(`{{${c[1]}}}`, d);
    }
    return `${r}: ${l}`;
  }
  const o = { ...se, ...t };
  return {
    setPackageName({ packageName: a }) {
      return (typeof a == 'string' && (r = a), this);
    },
    setMessages({ customMessages: a }) {
      return (Object.assign(o, a || {}), this);
    },
    throwInvalidPublishableKeyError(a) {
      throw new Error(n(o.InvalidPublishableKeyErrorMessage, a));
    },
    throwInvalidProxyUrl(a) {
      throw new Error(n(o.InvalidProxyUrlErrorMessage, a));
    },
    throwMissingPublishableKeyError() {
      throw new Error(n(o.MissingPublishableKeyErrorMessage));
    },
    throwMissingSecretKeyError() {
      throw new Error(n(o.MissingSecretKeyErrorMessage));
    },
    throwMissingClerkProviderError(a) {
      throw new Error(n(o.MissingClerkProvider, a));
    },
    throw(a) {
      throw new Error(n(a));
    },
  };
}
var m = Z({ packageName: '@clerk/vue' });
function le(e) {
  m.setMessages(e).setPackageName(e);
}
const ie = {
    strict_mfa: { afterMinutes: 10, level: 'multi_factor' },
    strict: { afterMinutes: 10, level: 'second_factor' },
    moderate: { afterMinutes: 60, level: 'second_factor' },
    lax: { afterMinutes: 1440, level: 'second_factor' },
  },
  ue = new Set(['first_factor', 'second_factor', 'multi_factor']),
  ce = new Set(['strict_mfa', 'strict', 'moderate', 'lax']),
  de = (e) => typeof e == 'number' && e > 0,
  pe = (e) => ue.has(e),
  fe = (e) => ce.has(e),
  N = (e) => e.replace(/^(org:)*/, 'org:'),
  me = (e, t) => {
    const { orgId: r, orgRole: n, orgPermissions: o } = t;
    return (!e.role && !e.permission) || !r || !n || !o
      ? null
      : e.permission
        ? o.includes(N(e.permission))
        : e.role
          ? N(n) === N(e.role)
          : null;
  },
  G = (e, t) => {
    const { org: r, user: n } = Pe(e),
      [o, a] = t.split(':'),
      s = a || o;
    return o === 'org' ? r.includes(s) : o === 'user' ? n.includes(s) : [...r, ...n].includes(s);
  },
  ge = (e, t) => {
    const { features: r, plans: n } = t;
    return e.feature && r ? G(r, e.feature) : e.plan && n ? G(n, e.plan) : null;
  },
  Pe = (e) => {
    const t = e ? e.split(',').map((r) => r.trim()) : [];
    return {
      org: t.filter((r) => r.split(':')[0].includes('o')).map((r) => r.split(':')[1]),
      user: t.filter((r) => r.split(':')[0].includes('u')).map((r) => r.split(':')[1]),
    };
  },
  ve = (e) => {
    if (!e) return !1;
    const t = (o) => (typeof o == 'string' ? ie[o] : o),
      r = typeof e == 'string' && fe(e),
      n = typeof e == 'object' && pe(e.level) && de(e.afterMinutes);
    return r || n ? t.bind(null, e) : !1;
  },
  he = (e, { factorVerificationAge: t }) => {
    if (!e.reverification || !t) return null;
    const r = ve(e.reverification);
    if (!r) return null;
    const { level: n, afterMinutes: o } = r(),
      [a, s] = t,
      l = a !== -1 ? o > a : null,
      i = s !== -1 ? o > s : null;
    switch (n) {
      case 'first_factor':
        return l;
      case 'second_factor':
        return s !== -1 ? i : l;
      case 'multi_factor':
        return s === -1 ? l : l && i;
    }
  },
  be = (e) => (t) => {
    if (!e.userId) return !1;
    const r = ge(t, e),
      n = me(t, e),
      o = he(t, e);
    return [r || n, o].some((a) => a === null)
      ? [r || n, o].some((a) => a === !0)
      : [r || n, o].every((a) => a === !0);
  },
  ke = ({
    authObject: {
      sessionId: e,
      sessionStatus: t,
      userId: r,
      actor: n,
      orgId: o,
      orgRole: a,
      orgSlug: s,
      signOut: l,
      getToken: i,
      has: c,
      sessionClaims: d,
    },
    options: { treatPendingAsSignedOut: p = !0 },
  }) => {
    if (e === void 0 && r === void 0)
      return {
        isLoaded: !1,
        isSignedIn: void 0,
        sessionId: e,
        sessionClaims: void 0,
        userId: r,
        actor: void 0,
        orgId: void 0,
        orgRole: void 0,
        orgSlug: void 0,
        has: void 0,
        signOut: l,
        getToken: i,
      };
    if (e === null && r === null)
      return {
        isLoaded: !0,
        isSignedIn: !1,
        sessionId: e,
        userId: r,
        sessionClaims: null,
        actor: null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        has: () => !1,
        signOut: l,
        getToken: i,
      };
    if (p && t === 'pending')
      return {
        isLoaded: !0,
        isSignedIn: !1,
        sessionId: null,
        userId: null,
        sessionClaims: null,
        actor: null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        has: () => !1,
        signOut: l,
        getToken: i,
      };
    if (e && d && r && o && a)
      return {
        isLoaded: !0,
        isSignedIn: !0,
        sessionId: e,
        sessionClaims: d,
        userId: r,
        actor: n || null,
        orgId: o,
        orgRole: a,
        orgSlug: s || null,
        has: c,
        signOut: l,
        getToken: i,
      };
    if (e && d && r && !o)
      return {
        isLoaded: !0,
        isSignedIn: !0,
        sessionId: e,
        sessionClaims: d,
        userId: r,
        actor: n || null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        has: c,
        signOut: l,
        getToken: i,
      };
  };
var ye = Symbol('clerk'),
  Q = Symbol('UserButton'),
  D = Symbol('UserButton.MenuItems'),
  B = Symbol('UserProfile'),
  A = Symbol('OrganizationProfile');
function Y(e) {
  const t = v(ye);
  return (
    t ||
    m.throw(
      `${e} can only be used when the Vue plugin is installed. Learn more: https://clerk.com/docs/reference/vue/clerk-plugin`,
    )
  );
}
var y = () => {
    const { clerk: e } = Y('useClerk');
    return e;
  },
  _e =
    'Invalid state. Feel free to submit a bug or reach out to support here: https://clerk.com/support',
  Ue = '<UserButton.Action /> component needs to be a direct child of `<UserButton.MenuItems />`.',
  Se = '<UserButton.Link /> component needs to be a direct child of `<UserButton.MenuItems />`.',
  Oe =
    'Missing requirements. <UserButton.Link /> component requires props: href, label and slots: labelIcon.',
  Ce =
    'Missing requirements. <UserButton.Action /> component requires props: label and slots: labelIcon.',
  Ie = '<UserButton.MenuItems /> component needs to be a direct child of `<UserButton />`.',
  Me = (e) =>
    `Missing requirements. <${e}.Page /> component requires props: url, label and slots: labelIcon and a default slot for page content`,
  Re = (e) =>
    `Missing requirements. <${e}.Link /> component requires the following props: url, label and slots: labelIcon.`,
  we =
    '<UserProfile.Page /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.',
  je =
    '<UserProfile.Link /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.',
  qe =
    '<OrganizationProfile.Page /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.',
  ze =
    '<OrganizationProfile.Link /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.';
function Le(e) {
  const t = {};
  for (const r in e.value) t[r] = b(() => e.value[r]);
  return t;
}
function X(e) {
  return new Promise((t) => {
    let r;
    r = W(
      e,
      (n) => {
        n?.loaded && (t(n), r?.());
      },
      { immediate: !0 },
    );
  });
}
function Ee(e) {
  return async (t) => {
    const r = await X(e);
    return r.session ? r.session.getToken(t) : null;
  };
}
function Be(e) {
  return async (...t) => (await X(e)).signOut(...t);
}
var J = (e = {}) => {
    const { clerk: t, authCtx: r } = Y('useAuth'),
      n = Ee(t),
      o = Be(t),
      a = b(() => {
        const {
            userId: s,
            orgId: l,
            orgRole: i,
            orgPermissions: c,
            sessionClaims: d,
            factorVerificationAge: p,
          } = r.value,
          f = be({
            userId: s,
            orgId: l,
            orgRole: i,
            orgPermissions: c,
            factorVerificationAge: p,
            features: d?.fea || '',
            plans: d?.pla || '',
          }),
          h = ke({
            authObject: { ...r.value, getToken: n, signOut: o, has: f },
            options: { treatPendingAsSignedOut: e.treatPendingAsSignedOut },
          });
        return h || m.throw(_e);
      });
    return Le(a);
  },
  F = (e, t) => {
    const r = e.__vccOpts || e;
    for (const [n, o] of t) r[n] = o;
    return r;
  };
const Ae = Z({ packageName: '@clerk/shared' });
function Fe(e) {
  Ae.setPackageName({ packageName: e });
}
const xe = () => {
    try {
      return !1;
    } catch {}
    return !1;
  },
  U = (e) => {
    xe() && console.error(`Clerk: ${e}`);
  };
var x = (e) => {
    const t = y();
    let r;
    r = W(
      t,
      (n) => {
        n?.loaded && (e(n), r?.());
      },
      { immediate: !0 },
    );
  },
  Te = u(({ treatPendingAsSignedOut: e }, { slots: t }) => {
    const { userId: r } = J({ treatPendingAsSignedOut: e });
    return () => (r.value ? t.default?.() : null);
  });
Object.defineProperty(Te, 'props', { value: ['treatPendingAsSignedOut'] });
var Ke = u(({ treatPendingAsSignedOut: e }, { slots: t }) => {
  const { userId: r } = J({ treatPendingAsSignedOut: e });
  return () => (r.value === null ? t.default?.() : null);
});
Object.defineProperty(Ke, 'props', { value: ['treatPendingAsSignedOut'] });
var Ve = u((e, { slots: t }) => {
    const r = y();
    return () => (r.value?.loaded ? t.default?.() : null);
  }),
  Ne = u((e) => {
    const { sessionCtx: t, clientCtx: r } = Y('RedirectToSignIn');
    return (
      x((n) => {
        const o = r.value?.signedInSessions && r.value.signedInSessions.length > 0;
        t.value === null && o ? n.redirectToAfterSignOut() : n.redirectToSignIn(e);
      }),
      () => null
    );
  });
Object.defineProperty(Ne, 'props', {
  value: [
    'signInForceRedirectUrl',
    'signInFallbackRedirectUrl',
    'signUpForceRedirectUrl',
    'signUpFallbackRedirectUrl',
    'afterSignInUrl',
    'afterSignUpUrl',
    'redirectUrl',
  ],
});
var He = u(
  (e) => (
    x((t) => {
      t.redirectToSignUp(e);
    }),
    () => null
  ),
);
Object.defineProperty(He, 'props', {
  value: [
    'signInForceRedirectUrl',
    'signInFallbackRedirectUrl',
    'signUpForceRedirectUrl',
    'signUpFallbackRedirectUrl',
    'afterSignInUrl',
    'afterSignUpUrl',
    'redirectUrl',
  ],
});
var We = u(
  (e) => (
    x((t) => {
      t.redirectToTasks(e);
    }),
    () => null
  ),
);
Object.defineProperty(We, 'props', {
  value: [
    'signInForceRedirectUrl',
    'signInFallbackRedirectUrl',
    'signUpForceRedirectUrl',
    'signUpFallbackRedirectUrl',
    'afterSignInUrl',
    'afterSignUpUrl',
    'redirectUrl',
  ],
});
var De = u(
  (e) => (
    x((t) => {
      t.handleRedirectCallback(e);
    }),
    () => null
  ),
);
Object.defineProperty(De, 'props', {
  value: [
    'transferable',
    'signInForceRedirectUrl',
    'signInFallbackRedirectUrl',
    'signUpForceRedirectUrl',
    'signUpFallbackRedirectUrl',
    'afterSignInUrl',
    'afterSignUpUrl',
    'redirectUrl',
    'signInUrl',
    'signUpUrl',
    'firstFactorUrl',
    'secondFactorUrl',
    'resetPasswordUrl',
    'continueSignUpUrl',
    'verifyEmailAddressUrl',
    'verifyPhoneNumberUrl',
    'reloadResource',
    'unsafeMetadata',
  ],
});
var Ye = u((e, { slots: t }) => {
  const {
    isLoaded: r,
    has: n,
    userId: o,
  } = J({ treatPendingAsSignedOut: e.treatPendingAsSignedOut });
  return () =>
    r.value
      ? o.value
        ? typeof e.condition == 'function'
          ? e.condition(n.value)
            ? t.default?.()
            : t.fallback?.()
          : e.role || e.permission || e.feature || e.plan
            ? n.value?.(e)
              ? t.default?.()
              : t.fallback?.()
            : t.default?.()
        : t.fallback?.()
      : null;
});
Object.defineProperty(Ye, 'props', {
  value: ['condition', 'role', 'permission', 'feature', 'plan', 'treatPendingAsSignedOut'],
});
var S = u((e) => () => [...(e?.customPagesPortals ?? []), ...(e?.customMenuItemsPortals ?? [])]);
Object.defineProperty(S, 'props', { value: ['customPagesPortals', 'customMenuItemsPortals'] });
var T = u({
    props: {
      mount: { type: Function, required: !1 },
      unmount: { type: Function, required: !1 },
      open: { type: Function, required: !1 },
      close: { type: Function, required: !1 },
      updateProps: { type: Function, required: !1 },
      props: { type: Object, required: !1, default: () => ({}) },
    },
    setup(e) {
      const t = E(null);
      let r = !1;
      return (
        ne(() => {
          !t.value ||
            r ||
            (e.mount && e.mount(t.value, e.props), e.open && e.open(e.props), (r = !0));
        }),
        W(
          () => e.props,
          (n) => {
            r && e.updateProps && t.value && e.updateProps({ node: t.value, props: n });
          },
          { deep: !0 },
        ),
        oe(() => {
          r && t.value && (e.unmount && e.unmount(t.value), e.close && e.close());
        }),
        () => H(Ve, () => H('div', { ref: t }))
      );
    },
  }),
  Je = u({
    __name: 'OrganizationProfile',
    props: {
      path: { type: null, required: !1 },
      routing: { type: String, required: !1 },
      afterLeaveOrganizationUrl: { type: String, required: !1 },
      appearance: { type: Object, required: !1 },
      __experimental_startPath: { type: String, required: !1 },
      apiKeysProps: { type: Object, required: !1 },
    },
    setup(e, { expose: t }) {
      t();
      const r = e,
        n = y(),
        { customPages: o, customPagesPortals: a, addCustomPage: s } = re(),
        l = b(() => ({ ...r, customPages: o.value }));
      k(A, { addCustomPage: s });
      const i = {
        props: r,
        clerk: n,
        customPages: o,
        customPagesPortals: a,
        addCustomPage: s,
        finalProps: l,
        get ClerkHostRenderer() {
          return T;
        },
        get CustomPortalsRenderer() {
          return S;
        },
      };
      return (Object.defineProperty(i, '__isScriptSetup', { enumerable: !1, value: !0 }), i);
    },
  });
function Ge(e, t, r, n, o, a) {
  return (
    q(),
    j(
      L,
      null,
      [
        P(
          n.ClerkHostRenderer,
          {
            mount: n.clerk?.mountOrganizationProfile,
            unmount: n.clerk?.unmountOrganizationProfile,
            props: n.finalProps,
            'update-props': n.clerk?.__unstable__updateProps,
          },
          null,
          8,
          ['mount', 'unmount', 'props', 'update-props'],
        ),
        P(n.CustomPortalsRenderer, { 'custom-pages-portals': n.customPagesPortals }, null, 8, [
          'custom-pages-portals',
        ]),
        z(e.$slots, 'default'),
      ],
      64,
    )
  );
}
var Ze = F(Je, [
    ['render', Ge],
    [
      '__file',
      '/home/runner/work/javascript/javascript/packages/vue/src/components/ui-components/OrganizationProfile/OrganizationProfile.vue',
    ],
  ]),
  O = u(
    (e, { slots: t }) => {
      const r = v(A);
      return r ? (r.addCustomPage({ props: e, slots: t, component: O }), () => null) : m.throw(qe);
    },
    { name: 'OrganizationProfilePage' },
  );
Object.defineProperty(O, 'props', { value: ['label', 'url'] });
var C = u(
  (e, { slots: t }) => {
    const r = v(A);
    return r ? (r.addCustomPage({ props: e, slots: t, component: C }), () => null) : m.throw(ze);
  },
  { name: 'OrganizationProfileLink' },
);
Object.defineProperty(C, 'props', { value: ['url', 'label'] });
Object.assign(Ze, { Page: O, Link: C });
var w = (e, t) => !!e && Qe(e) && e.name === t.name,
  Qe = (e) => 'name' in e && 'setup' in e;
function Xe() {
  return Math.random().toString(36).substring(2, 7);
}
var $ = () => {
    const e = E([]);
    return {
      portals: b(() => e.value.map((o) => H(ae, { to: o.el }, o.slot()))),
      mount: (o, a) => {
        const s = Xe();
        (o.setAttribute('data-clerk-mount-id', s), e.value.push({ id: s, el: o, slot: a }));
      },
      unmount: (o) => {
        const a = o?.getAttribute('data-clerk-mount-id');
        if (a) {
          const s = e.value.findIndex((l) => l.id === a);
          s !== -1 && e.value.splice(s, 1);
        }
      },
    };
  },
  ee = () => {
    const {
      customPages: e,
      customPagesPortals: t,
      addCustomPage: r,
    } = te({
      reorderItemsLabels: ['account', 'security', 'billing', 'apiKeys'],
      PageComponent: I,
      LinkComponent: M,
      componentName: 'UserProfile',
    });
    return { customPages: e, customPagesPortals: t, addCustomPage: (o) => r(o) };
  },
  re = () => {
    const {
      customPages: e,
      customPagesPortals: t,
      addCustomPage: r,
    } = te({
      reorderItemsLabels: ['general', 'members', 'billing', 'apiKeys'],
      PageComponent: O,
      LinkComponent: C,
      componentName: 'OrganizationProfile',
    });
    return { customPages: e, customPagesPortals: t, addCustomPage: (o) => r(o) };
  },
  te = (e) => {
    const t = E([]),
      { portals: r, mount: n, unmount: o } = $(),
      { PageComponent: a, LinkComponent: s, reorderItemsLabels: l, componentName: i } = e;
    return {
      customPages: t,
      customPagesPortals: r,
      addCustomPage: (d) => {
        const { props: p, slots: f, component: h } = d,
          { label: g, url: R } = p;
        if (w(h, a))
          if ($e(p, f, l)) t.value.push({ label: g });
          else if (er(p, f))
            t.value.push({
              label: g,
              url: R,
              mountIcon(_) {
                n(_, f.labelIcon);
              },
              unmountIcon: o,
              mount(_) {
                n(_, f.default);
              },
              unmount: o,
            });
          else {
            U(Me(i));
            return;
          }
        if (w(h, s))
          if (rr(p, f))
            t.value.push({
              label: g,
              url: R,
              mountIcon(_) {
                n(_, f.labelIcon);
              },
              unmountIcon: o,
            });
          else {
            U(Re(i));
            return;
          }
      },
    };
  },
  $e = (e, t, r) => {
    const { label: n, url: o } = e,
      { default: a, labelIcon: s } = t;
    return !a && !o && !s && r.some((l) => l === n);
  },
  er = (e, t) => {
    const { label: r, url: n } = e,
      { default: o, labelIcon: a } = t;
    return !!o && !!n && !!a && !!r;
  },
  rr = (e, t) => {
    const { label: r, url: n } = e,
      { default: o, labelIcon: a } = t;
    return !o && !!n && !!a && !!r;
  },
  tr = u({
    __name: 'UserProfile',
    props: {
      path: { type: null, required: !1 },
      routing: { type: String, required: !1 },
      appearance: { type: Object, required: !1 },
      additionalOAuthScopes: { type: Object, required: !1 },
      __experimental_startPath: { type: String, required: !1 },
      apiKeysProps: { type: Object, required: !1 },
    },
    setup(e, { expose: t }) {
      t();
      const r = e,
        n = y(),
        { customPages: o, customPagesPortals: a, addCustomPage: s } = ee(),
        l = b(() => ({ ...r, customPages: o.value }));
      k(B, { addCustomPage: s });
      const i = {
        props: r,
        clerk: n,
        customPages: o,
        customPagesPortals: a,
        addCustomPage: s,
        finalProps: l,
        get ClerkHostRenderer() {
          return T;
        },
        get CustomPortalsRenderer() {
          return S;
        },
      };
      return (Object.defineProperty(i, '__isScriptSetup', { enumerable: !1, value: !0 }), i);
    },
  });
function nr(e, t, r, n, o, a) {
  return (
    q(),
    j(
      L,
      null,
      [
        P(
          n.ClerkHostRenderer,
          {
            mount: n.clerk?.mountUserProfile,
            unmount: n.clerk?.unmountUserProfile,
            props: n.finalProps,
            'update-props': n.clerk?.__unstable__updateProps,
          },
          null,
          8,
          ['mount', 'unmount', 'props', 'update-props'],
        ),
        P(n.CustomPortalsRenderer, { 'custom-pages-portals': n.customPagesPortals }, null, 8, [
          'custom-pages-portals',
        ]),
        z(e.$slots, 'default'),
      ],
      64,
    )
  );
}
var or = F(tr, [
    ['render', nr],
    [
      '__file',
      '/home/runner/work/javascript/javascript/packages/vue/src/components/ui-components/UserProfile/UserProfile.vue',
    ],
  ]),
  I = u(
    (e, { slots: t }) => {
      const r = v(B);
      return r ? (r.addCustomPage({ props: e, slots: t, component: I }), () => null) : m.throw(we);
    },
    { name: 'UserProfilePage' },
  );
Object.defineProperty(I, 'props', { value: ['label', 'url'] });
var M = u(
  (e, { slots: t }) => {
    const r = v(B);
    return r ? (r.addCustomPage({ props: e, slots: t, component: M }), () => null) : m.throw(je);
  },
  { name: 'UserProfileLink' },
);
Object.defineProperty(M, 'props', { value: ['url', 'label'] });
Object.assign(or, { Page: I, Link: M });
var ar = u({
  __name: 'OrganizationSwitcher',
  props: {
    createOrganizationUrl: { type: null, required: !1 },
    createOrganizationMode: { type: String, required: !1 },
    organizationProfileUrl: { type: null, required: !1 },
    organizationProfileMode: { type: String, required: !1 },
    defaultOpen: { type: Boolean, required: !1 },
    hidePersonal: { type: Boolean, required: !1 },
    afterSwitchOrganizationUrl: { type: String, required: !1 },
    afterCreateOrganizationUrl: { type: [Function, Object], required: !1, skipCheck: !0 },
    afterSelectOrganizationUrl: { type: [Function, Object], required: !1, skipCheck: !0 },
    afterSelectPersonalUrl: { type: [Function, Object], required: !1, skipCheck: !0 },
    afterLeaveOrganizationUrl: { type: String, required: !1 },
    skipInvitationScreen: { type: Boolean, required: !1 },
    hideSlug: { type: Boolean, required: !1 },
    appearance: { type: Object, required: !1 },
    organizationProfileProps: { type: Object, required: !1 },
  },
  setup(e, { expose: t }) {
    t();
    const r = y(),
      n = e,
      { customPages: o, customPagesPortals: a, addCustomPage: s } = re(),
      l = b(() => ({
        ...n,
        organizationProfileProps: { ...(n.organizationProfileProps || {}), customPages: o.value },
      }));
    k(A, { addCustomPage: s });
    const i = {
      clerk: r,
      props: n,
      customPages: o,
      customPagesPortals: a,
      addCustomPage: s,
      finalProps: l,
      get ClerkHostRenderer() {
        return T;
      },
      get CustomPortalsRenderer() {
        return S;
      },
    };
    return (Object.defineProperty(i, '__isScriptSetup', { enumerable: !1, value: !0 }), i);
  },
});
function sr(e, t, r, n, o, a) {
  return (
    q(),
    j(
      L,
      null,
      [
        P(
          n.ClerkHostRenderer,
          {
            mount: n.clerk?.mountOrganizationSwitcher,
            unmount: n.clerk?.unmountOrganizationSwitcher,
            'update-props': n.clerk?.__unstable__updateProps,
            props: n.finalProps,
          },
          null,
          8,
          ['mount', 'unmount', 'update-props', 'props'],
        ),
        P(n.CustomPortalsRenderer, { 'custom-pages-portals': n.customPagesPortals }, null, 8, [
          'custom-pages-portals',
        ]),
        z(e.$slots, 'default'),
      ],
      64,
    )
  );
}
var lr = F(ar, [
  ['render', sr],
  [
    '__file',
    '/home/runner/work/javascript/javascript/packages/vue/src/components/ui-components/OrganizationSwitcher/OrganizationSwitcher.vue',
  ],
]);
Object.assign(lr, { OrganizationProfilePage: O, OrganizationProfileLink: C });
var ir = () => {
    const e = E([]),
      { portals: t, mount: r, unmount: n } = $(),
      o = ['manageAccount', 'signOut'];
    function a(s) {
      const { props: l, component: i, slots: c } = s,
        { label: d, onClick: p, open: f, href: h } = l;
      if (w(i, K))
        if (ur(l, c, o)) e.value.push({ label: d });
        else if (cr(l, c)) {
          const g = {
            label: d,
            mountIcon(R) {
              r(R, c.labelIcon);
            },
            unmountIcon: n,
          };
          if (p !== void 0) e.value.push({ ...g, onClick: p, open: f });
          else if (f !== void 0) e.value.push({ ...g, open: f.startsWith('/') ? f : `/${f}` });
          else {
            U('Custom menu item must have either onClick or open property');
            return;
          }
        } else {
          U(Ce);
          return;
        }
      if (w(i, V))
        if (dr(l, c))
          e.value.push({
            label: d,
            href: h,
            mountIcon(g) {
              r(g, c.labelIcon);
            },
            unmountIcon: n,
          });
        else {
          U(Oe);
          return;
        }
    }
    return { customMenuItems: e, customMenuItemsPortals: t, addCustomMenuItem: a };
  },
  ur = (e, t, r) => {
    const { label: n, onClick: o } = e,
      { labelIcon: a } = t;
    return !o && !a && r.some((s) => s === n);
  },
  cr = (e, t) => {
    const { label: r, onClick: n, open: o } = e,
      { labelIcon: a } = t;
    return !!a && !!r && (typeof n == 'function' || typeof o == 'string');
  },
  dr = (e, t) => {
    const { label: r, href: n } = e,
      { labelIcon: o } = t;
    return !!n && !!o && !!r;
  },
  pr = u({
    __name: 'UserButton',
    props: {
      userProfileUrl: { type: null, required: !1 },
      userProfileMode: { type: String, required: !1 },
      showName: { type: Boolean, required: !1 },
      defaultOpen: { type: Boolean, required: !1 },
      __experimental_asStandalone: { type: [Boolean, Function], required: !1 },
      afterSignOutUrl: { type: String, required: !1 },
      afterMultiSessionSingleSignOutUrl: { type: String, required: !1 },
      signInUrl: { type: String, required: !1 },
      afterSwitchSessionUrl: { type: String, required: !1 },
      appearance: { type: Object, required: !1 },
      userProfileProps: { type: Object, required: !1 },
    },
    setup(e, { expose: t }) {
      t();
      const r = e,
        n = y(),
        { customMenuItems: o, customMenuItemsPortals: a, addCustomMenuItem: s } = ir(),
        { customPages: l, customPagesPortals: i, addCustomPage: c } = ee(),
        d = b(() => ({
          ...r,
          userProfileProps: { ...(r.userProfileProps || {}), customPages: l.value },
          customMenuItems: o.value,
        }));
      (k(Q, { addCustomMenuItem: s }), k(B, { addCustomPage: c }));
      const p = {
        props: r,
        clerk: n,
        customMenuItems: o,
        customMenuItemsPortals: a,
        addCustomMenuItem: s,
        customPages: l,
        customPagesPortals: i,
        addCustomPage: c,
        finalProps: d,
        get ClerkHostRenderer() {
          return T;
        },
        get CustomPortalsRenderer() {
          return S;
        },
      };
      return (Object.defineProperty(p, '__isScriptSetup', { enumerable: !1, value: !0 }), p);
    },
  });
function fr(e, t, r, n, o, a) {
  return (
    q(),
    j(
      L,
      null,
      [
        P(
          n.ClerkHostRenderer,
          {
            mount: n.clerk?.mountUserButton,
            unmount: n.clerk?.unmountUserButton,
            props: n.finalProps,
            'update-props': n.clerk?.__unstable__updateProps,
          },
          null,
          8,
          ['mount', 'unmount', 'props', 'update-props'],
        ),
        P(
          n.CustomPortalsRenderer,
          {
            'custom-pages-portals': n.customPagesPortals,
            'custom-menu-items-portals': n.customMenuItemsPortals,
          },
          null,
          8,
          ['custom-pages-portals', 'custom-menu-items-portals'],
        ),
        z(e.$slots, 'default'),
      ],
      64,
    )
  );
}
var mr = F(pr, [
    ['render', fr],
    [
      '__file',
      '/home/runner/work/javascript/javascript/packages/vue/src/components/ui-components/UserButton/UserButton.vue',
    ],
  ]),
  gr = u((e, { slots: t }) => {
    const r = v(Q);
    return r ? (k(D, r), () => t.default?.()) : m.throw(Ie);
  }),
  K = u(
    (e, { slots: t }) => {
      const r = v(D);
      return r
        ? (r.addCustomMenuItem({ props: e, slots: t, component: K }), () => null)
        : m.throw(Ue);
    },
    { name: 'MenuAction' },
  );
Object.defineProperty(K, 'props', { value: ['label', 'onClick', 'open'] });
var V = u(
  (e, { slots: t }) => {
    const r = v(D);
    return r
      ? (r.addCustomMenuItem({ props: e, slots: t, component: V }), () => null)
      : m.throw(Se);
  },
  { name: 'MenuLink' },
);
Object.defineProperty(V, 'props', { value: ['href', 'label'] });
Object.assign(mr, { MenuItems: gr, Action: K, Link: V, UserProfilePage: I, UserProfileLink: M });
le({ packageName: '@clerk/vue' });
Fe('@clerk/vue');
const vr = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t) r[n] = o;
  return r;
};
export { vr as _, J as u };
