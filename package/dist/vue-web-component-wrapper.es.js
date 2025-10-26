var X = Object.defineProperty;
var I = (e, r, t) => r in e ? X(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var b = (e, r, t) => I(e, typeof r != "symbol" ? r + "" : r, t);
import { defineComponent as Z, nextTick as J, render as H, createVNode as Q, h as B } from "vue";
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Y = Object.assign, M = Array.isArray, ee = (e) => typeof e == "string", U = (e) => {
  const r = /* @__PURE__ */ Object.create(null);
  return (t) => r[t] || (r[t] = e(t));
}, te = /-(\w)/g, T = U(
  (e) => e.replace(te, (r, t) => t ? t.toUpperCase() : "")
), se = /\B([A-Z])/g, N = U(
  (e) => e.replace(se, "-$1").toLowerCase()
), K = (e) => {
  const r = ee(e) ? Number(e) : NaN;
  return isNaN(r) ? e : r;
};
/*!#__NO_SIDE_EFFECTS__*/
// @__NO_SIDE_EFFECTS__
function oe(e, r, t) {
  const s = Z(e);
  class o extends L {
    constructor(i) {
      super(s, i, r, t);
    }
  }
  return b(o, "def", s), o;
}
const ne = typeof HTMLElement < "u" ? HTMLElement : class {
};
class L extends ne {
  constructor(t, s = {}, o = { shadowRoot: !0 }, n) {
    super();
    /**
     * @internal
     */
    b(this, "_instance", null);
    b(this, "_connected", !1);
    b(this, "_resolved", !1);
    b(this, "_numberProps", null);
    b(this, "_styles");
    b(this, "_slots", {});
    b(this, "_ob", null);
    this._def = t, this._props = s, this._config = o, this._root && n ? n(this._createVNode(), this._root) : (this._config.shadowRoot !== !1 && this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  get _root() {
    return this._config.shadowRoot ? this.shadowRoot : this;
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, J(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), H(null, this._root), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let o = 0; o < this.attributes.length; o++)
      this._setAttr(this.attributes[o].name);
    this._ob = new MutationObserver((o) => {
      for (const n of o)
        this._setAttr(n.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (o, n = !1) => {
      var v;
      const { props: i } = o, f = this._collectNestedStyles(o);
      let y;
      if (i && !M(i))
        for (const u in i) {
          const c = i[u];
          (c === Number || c && c.type === Number) && (u in this._props && (this._props[u] = K(this._props[u])), (y || (y = /* @__PURE__ */ Object.create(null)))[T(u)] = !0);
        }
      if (this._numberProps = y, n && this._resolveProps(o), !this._config.shadowRoot) {
        this._slots = {};
        const u = (c) => Array.from(c).map((a) => {
          var d;
          if (a.nodeType === Node.ELEMENT_NODE) {
            const p = a, E = Object.fromEntries(
              Array.from(p.attributes).map((g) => [g.name, g.value])
            );
            return B(
              p.tagName.toLowerCase(),
              E,
              u(p.childNodes)
            );
          } else if (a.nodeType === Node.TEXT_NODE)
            return ((d = a.textContent) == null ? void 0 : d.trim()) || null;
          return null;
        }).filter((a) => a != null);
        for (const c of Array.from(this.childNodes)) {
          const a = c.nodeType === Node.ELEMENT_NODE && c.getAttribute("slot") || "default";
          if (this._slots[a] || (this._slots[a] = []), c.nodeType === Node.ELEMENT_NODE) {
            const d = c, p = Object.fromEntries(
              Array.from(d.attributes).map((E) => [E.name, E.value])
            );
            this._slots[a].push(
              B(
                d.tagName.toLowerCase(),
                p,
                u(d.childNodes)
              )
            );
          } else if (c.nodeType === Node.TEXT_NODE) {
            const d = (v = c.textContent) == null ? void 0 : v.trim();
            d && this._slots[a].push(d);
          }
        }
        this.replaceChildren();
      }
      this._applyStyles(f), this._update();
    }, s = this._def.__asyncLoader;
    s ? s().then((o) => t(o, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: s } = t, o = M(s) ? s : Object.keys(s || {});
    for (const n of Object.keys(this))
      n[0] !== "_" && o.includes(n) && this._setProp(n, this[n], !0, !1);
    for (const n of o.map(T))
      Object.defineProperty(this, n, {
        get() {
          return this._getProp(n);
        },
        set(i) {
          this._setProp(n, i);
        }
      });
  }
  _setAttr(t) {
    let s = this.hasAttribute(t) ? this.getAttribute(t) : void 0;
    const o = T(t);
    this._numberProps && this._numberProps[o] && (s = K(s)), this._setProp(o, s, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, s, o = !0, n = !0) {
    s !== this._props[t] && (this._props[t] = s, n && this._instance && this._update(), o && (s === !0 ? this.setAttribute(N(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(N(t), s + "") : s || this.removeAttribute(N(t))));
  }
  _update() {
    H(this._createVNode(), this._root);
  }
  _createVNode() {
    const t = Q(this._def, Y({}, this._props), this._slots);
    return this._instance || (t.ce = (s) => {
      this._instance = s, s.isCE = !0;
      const o = (i, f) => {
        this.dispatchEvent(
          new CustomEvent(i, {
            detail: f
          })
        );
      };
      s.emit = (i, ...f) => {
        o(i, f), N(i) !== i && o(N(i), f);
      };
      let n = this;
      for (; n = n && (n.parentNode || n.host); )
        if (n instanceof L) {
          s.parent = n._instance, s.provides = n._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((s) => {
      const o = document.createElement("style");
      o.textContent = s, this._config.nonce && o.setAttribute("nonce", this._config.nonce), this._root.prepend(o);
    });
  }
  _collectNestedStyles(t) {
    let s = t.styles ?? [];
    return t.components && Object.values(t.components).forEach((o) => {
      s = s.concat(this._collectNestedStyles(o));
    }), s;
  }
}
const P = (e) => {
  for (; (e == null ? void 0 : e.nodeType) !== 1; ) {
    if (!e.parentElement)
      throw new Error(
        "No parent element found, the rootComponent must be wrapped in a HTML element (e.g. <template><div> app content </div></template>)"
      );
    e = e.parentElement;
  }
  return e;
};
function re(e) {
  return "on" + e.charAt(0).toUpperCase() + e.slice(1);
}
function ie(e) {
  return typeof e == "string" ? e.replace(/:root/g, ":host") : Array.isArray(e) ? e.map((r) => r.replace(/:root/g, ":host")) : e;
}
const ce = ({
  rootComponent: e,
  plugins: r,
  cssFrameworkStyles: t,
  VueDefineCustomElement: s,
  h: o,
  createApp: n,
  getCurrentInstance: i,
  elementName: f,
  disableRemoveStylesOnUnmount: y,
  disableShadowDOM: v,
  replaceRootWithHostInCssFramework: u,
  asyncInitialization: c,
  loaderAttribute: a,
  hideSlotContentUntilMounted: d,
  nonce: p
}) => {
  console.log("defineCustomElement called");
  const E = v ? oe : s, g = u ? ie(t) : t, k = E({
    nonce: p,
    props: {
      ...e.props,
      modelValue: { type: [String, Number, Boolean, Array, Object] }
      // v-model support
    },
    emits: e == null ? void 0 : e.emits,
    setup(z, { slots: q }) {
      var j;
      const S = [...(e == null ? void 0 : e.emits) || [], "update:modelValue"], m = n();
      if (m.component("app-root", e), e.provide) {
        const l = typeof e.provide == "function" ? e.provide() : e.provide;
        Object.keys(l).forEach((h) => {
          m.provide(h, l[h]);
        });
      }
      m.mixin({
        mounted() {
          var w, A, x, V, $, D, R;
          if (console.log("this.$", this.$), console.log("this.$?.type?.name", (A = (w = this.$) == null ? void 0 : w.type) == null ? void 0 : A.name), ((V = (x = this.$) == null ? void 0 : x.type) == null ? void 0 : V.name) === "vue-custom-element-root-component") {
            const _ = document.createElement("style");
            _.innerText = g.join().replace(/\n/g, ""), p && _.setAttribute("nonce", p), P(this.$el).prepend(_);
            return;
          }
          const l = (_) => {
            _ != null && _.length && (this.__style = document.createElement("style"), this.__style.innerText = _.join().replace(/\n/g, ""), p && this.__style.setAttribute("nonce", p), P(this.$el).append(this.__style));
          };
          if (console.log("this.$?.type.styles", ($ = this.$) == null ? void 0 : $.type.styles), l((D = this.$) == null ? void 0 : D.type.styles), this.$options.components)
            for (const _ of Object.values(this.$options.components))
              console.log("comp.styles", _.styles), l(_.styles);
          const h = ((R = this.$el.getRootNode()) == null ? void 0 : R.host) || P(this.$el);
          h && (d && h.querySelectorAll("[hidden]").forEach((W) => {
            W.removeAttribute("hidden");
          }), h.querySelectorAll(`[${a}]`).forEach((C) => {
            C.remove();
          }));
        },
        unmounted() {
          var l;
          y || (l = this.__style) == null || l.remove();
        }
      }), m.use(r);
      const O = i();
      if (Object.assign(O.appContext, m._context), Object.assign(O.provides, m._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        const l = document.querySelector(f);
        m._container = l, m._instance = O;
        const h = {
          Comment: Symbol("v-cmt"),
          Fragment: Symbol("v-fgt"),
          Static: Symbol("v-stc"),
          Text: Symbol("v-txt")
        };
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", m, m.version, h), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = m;
      }
      const F = S == null ? void 0 : S.reduce((l, h) => {
        const w = re(h);
        return l[w] = (A) => {
          O.emit(h, A);
        }, l;
      }, {}), G = (j = e == null ? void 0 : e.namedSlots) == null ? void 0 : j.reduce((l, h) => (l[h] = () => o("slot", {
        name: h
      }), l), {});
      return () => o(
        e,
        {
          ...z,
          ...F
        },
        {
          default: () => o("slot"),
          ...G,
          ...q
        }
      );
    }
  }, { shadowRoot: !v, nonce: p });
  return c().then(() => k);
}, pe = ({
  elementName: e,
  rootComponent: r,
  plugins: t,
  cssFrameworkStyles: s,
  VueDefineCustomElement: o,
  h: n,
  createApp: i,
  getCurrentInstance: f,
  disableRemoveStylesOnUnmount: y = !1,
  disableShadowDOM: v = !1,
  replaceRootWithHostInCssFramework: u = !1,
  asyncInitialization: c = () => Promise.resolve(),
  loaderAttribute: a = "data-web-component-loader",
  hideSlotContentUntilMounted: d = !1,
  nonce: p
  // Used for Content Security Policy (CSP) compliance - will be applied to inline styles
}) => {
  if (!r) {
    console.warn("No root component provided. Please provide a root component to create a web component.");
    return;
  }
  if (!e) {
    console.warn("No element name provided. Please provide an element name to create a web component.");
    return;
  }
  if (!o) {
    console.warn(
      "No VueDefineCustomElement provided. Please provide a VueDefineCustomElement to create a web component."
    );
    return;
  }
  if (!n) {
    console.warn("No h provided. Please provide an h to create a web component.");
    return;
  }
  if (!i) {
    console.warn("No createApp provided. Please provide a createApp to create a web component.");
    return;
  }
  if (!f) {
    console.warn("No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.");
    return;
  }
  ce({
    rootComponent: r,
    plugins: t,
    cssFrameworkStyles: s,
    VueDefineCustomElement: o,
    h: n,
    createApp: i,
    getCurrentInstance: f,
    elementName: e,
    disableRemoveStylesOnUnmount: y,
    disableShadowDOM: v,
    replaceRootWithHostInCssFramework: u,
    asyncInitialization: c,
    loaderAttribute: a,
    hideSlotContentUntilMounted: d,
    nonce: p
  }).then((E) => {
    customElements.define(
      e,
      E
    );
  });
};
export {
  pe as createWebComponent,
  pe as default,
  ce as defineCustomElement,
  oe as defineCustomElementSFC
};
