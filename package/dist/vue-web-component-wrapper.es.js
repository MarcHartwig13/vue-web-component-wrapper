var W = Object.defineProperty;
var X = (e, r, t) => r in e ? W(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var m = (e, r, t) => X(e, typeof r != "symbol" ? r + "" : r, t);
import { defineComponent as I, nextTick as Z, render as C, createVNode as J, h as H } from "vue";
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Q = Object.assign, B = Array.isArray, Y = (e) => typeof e == "string", U = (e) => {
  const r = /* @__PURE__ */ Object.create(null);
  return (t) => r[t] || (r[t] = e(t));
}, ee = /-(\w)/g, T = U(
  (e) => e.replace(ee, (r, t) => t ? t.toUpperCase() : "")
), te = /\B([A-Z])/g, N = U(
  (e) => e.replace(te, "-$1").toLowerCase()
), M = (e) => {
  const r = Y(e) ? Number(e) : NaN;
  return isNaN(r) ? e : r;
};
/*!#__NO_SIDE_EFFECTS__*/
// @__NO_SIDE_EFFECTS__
function se(e, r, t) {
  const s = I(e);
  class o extends S {
    constructor(i) {
      super(s, i, r, t);
    }
  }
  return m(o, "def", s), o;
}
const oe = typeof HTMLElement < "u" ? HTMLElement : class {
};
class S extends oe {
  constructor(t, s = {}, o = { shadowRoot: !0 }, n) {
    super();
    /**
     * @internal
     */
    m(this, "_instance", null);
    m(this, "_connected", !1);
    m(this, "_resolved", !1);
    m(this, "_numberProps", null);
    m(this, "_styles");
    m(this, "_slots", {});
    m(this, "_ob", null);
    this._def = t, this._props = s, this._config = o, this._root && n ? n(this._createVNode(), this._root) : (this._config.shadowRoot !== !1 && this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  get _root() {
    return this._config.shadowRoot ? this.shadowRoot : this;
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, Z(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), C(null, this._root), this._instance = null);
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
      const { props: i } = o, _ = this._collectNestedStyles(o);
      let y;
      if (i && !B(i))
        for (const u in i) {
          const c = i[u];
          (c === Number || c && c.type === Number) && (u in this._props && (this._props[u] = M(this._props[u])), (y || (y = /* @__PURE__ */ Object.create(null)))[T(u)] = !0);
        }
      if (this._numberProps = y, n && this._resolveProps(o), !this._config.shadowRoot) {
        this._slots = {};
        const u = (c) => Array.from(c).map((a) => {
          var h;
          if (a.nodeType === Node.ELEMENT_NODE) {
            const d = a, b = Object.fromEntries(
              Array.from(d.attributes).map((g) => [g.name, g.value])
            );
            return H(
              d.tagName.toLowerCase(),
              b,
              u(d.childNodes)
            );
          } else if (a.nodeType === Node.TEXT_NODE)
            return ((h = a.textContent) == null ? void 0 : h.trim()) || null;
          return null;
        }).filter((a) => a != null);
        for (const c of Array.from(this.childNodes)) {
          const a = c.nodeType === Node.ELEMENT_NODE && c.getAttribute("slot") || "default";
          if (this._slots[a] || (this._slots[a] = []), c.nodeType === Node.ELEMENT_NODE) {
            const h = c, d = Object.fromEntries(
              Array.from(h.attributes).map((b) => [b.name, b.value])
            );
            this._slots[a].push(
              H(
                h.tagName.toLowerCase(),
                d,
                u(h.childNodes)
              )
            );
          } else if (c.nodeType === Node.TEXT_NODE) {
            const h = (v = c.textContent) == null ? void 0 : v.trim();
            h && this._slots[a].push(h);
          }
        }
        this.replaceChildren();
      }
      this._applyStyles(_), this._update();
    }, s = this._def.__asyncLoader;
    s ? s().then((o) => t(o, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: s } = t, o = B(s) ? s : Object.keys(s || {});
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
    this._numberProps && this._numberProps[o] && (s = M(s)), this._setProp(o, s, !1);
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
    C(this._createVNode(), this._root);
  }
  _createVNode() {
    const t = J(this._def, Q({}, this._props), this._slots);
    return this._instance || (t.ce = (s) => {
      this._instance = s, s.isCE = !0;
      const o = (i, _) => {
        this.dispatchEvent(
          new CustomEvent(i, {
            detail: _
          })
        );
      };
      s.emit = (i, ..._) => {
        o(i, _), N(i) !== i && o(N(i), _);
      };
      let n = this;
      for (; n = n && (n.parentNode || n.host); )
        if (n instanceof S) {
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
const K = (e) => {
  for (; (e == null ? void 0 : e.nodeType) !== 1; ) {
    if (!e.parentElement)
      throw new Error(
        "No parent element found, the rootComponent must be wrapped in a HTML element (e.g. <template><div> app content </div></template>)"
      );
    e = e.parentElement;
  }
  return e;
};
function ne(e) {
  return "on" + e.charAt(0).toUpperCase() + e.slice(1);
}
function re(e) {
  return typeof e == "string" ? e.replace(/:root/g, ":host") : Array.isArray(e) ? e.map((r) => r.replace(/:root/g, ":host")) : e;
}
const ie = ({
  rootComponent: e,
  plugins: r,
  cssFrameworkStyles: t,
  VueDefineCustomElement: s,
  h: o,
  createApp: n,
  getCurrentInstance: i,
  elementName: _,
  disableRemoveStylesOnUnmount: y,
  disableShadowDOM: v,
  replaceRootWithHostInCssFramework: u,
  asyncInitialization: c,
  loaderAttribute: a,
  hideSlotContentUntilMounted: h,
  nonce: d
}) => {
  console.log("defineCustomElement called");
  const b = v ? se : s;
  u && re(t);
  const g = b({
    name: "vue-custom-element-root-component",
    nonce: d,
    props: {
      ...e.props,
      modelValue: { type: [String, Number, Boolean, Array, Object] }
      // v-model support
    },
    emits: e == null ? void 0 : e.emits,
    setup(z, { slots: q }) {
      var L;
      const P = [...(e == null ? void 0 : e.emits) || [], "update:modelValue"], f = n();
      if (f.component("app-root", e), e.provide) {
        const l = typeof e.provide == "function" ? e.provide() : e.provide;
        Object.keys(l).forEach((p) => {
          f.provide(p, l[p]);
        });
      }
      f.mixin({
        mounted() {
          var w, A, j, V, x, $, D;
          if (console.log("this.$", this.$), console.log("this.$?.type?.name", (A = (w = this.$) == null ? void 0 : w.type) == null ? void 0 : A.name), console.log("rootComponent", e), ((V = (j = this.$) == null ? void 0 : j.type) == null ? void 0 : V.name) === "vue-custom-element-root-component") {
            console.log("is vue-custom-element-root-component");
            return;
          }
          const l = (E) => {
            E != null && E.length && (this.__style = document.createElement("style"), this.__style.innerText = E.join().replace(/\n/g, ""), d && this.__style.setAttribute("nonce", d), K(this.$el).append(this.__style));
          };
          if (console.log("this.$?.type.styles", (x = this.$) == null ? void 0 : x.type.styles), l(($ = this.$) == null ? void 0 : $.type.styles), this.$options.components)
            for (const E of Object.values(this.$options.components))
              console.log("comp.styles", E.styles), l(E.styles);
          const p = ((D = this.$el.getRootNode()) == null ? void 0 : D.host) || K(this.$el);
          p && (h && p.querySelectorAll("[hidden]").forEach((F) => {
            F.removeAttribute("hidden");
          }), p.querySelectorAll(`[${a}]`).forEach((R) => {
            R.remove();
          }));
        },
        unmounted() {
          var l;
          y || (l = this.__style) == null || l.remove();
        }
      }), f.use(r);
      const O = i();
      if (Object.assign(O.appContext, f._context), Object.assign(O.provides, f._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        const l = document.querySelector(_);
        f._container = l, f._instance = O;
        const p = {
          Comment: Symbol("v-cmt"),
          Fragment: Symbol("v-fgt"),
          Static: Symbol("v-stc"),
          Text: Symbol("v-txt")
        };
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", f, f.version, p), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = f;
      }
      const G = P == null ? void 0 : P.reduce((l, p) => {
        const w = ne(p);
        return l[w] = (A) => {
          O.emit(p, A);
        }, l;
      }, {}), k = (L = e == null ? void 0 : e.namedSlots) == null ? void 0 : L.reduce((l, p) => (l[p] = () => o("slot", {
        name: p
      }), l), {});
      return () => o(
        e,
        {
          ...z,
          ...G
        },
        {
          default: () => o("slot"),
          ...k,
          ...q
        }
      );
    }
  }, { shadowRoot: !v, nonce: d });
  return c().then(() => g);
}, ae = ({
  elementName: e,
  rootComponent: r,
  plugins: t,
  cssFrameworkStyles: s,
  VueDefineCustomElement: o,
  h: n,
  createApp: i,
  getCurrentInstance: _,
  disableRemoveStylesOnUnmount: y = !1,
  disableShadowDOM: v = !1,
  replaceRootWithHostInCssFramework: u = !1,
  asyncInitialization: c = () => Promise.resolve(),
  loaderAttribute: a = "data-web-component-loader",
  hideSlotContentUntilMounted: h = !1,
  nonce: d
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
  if (!_) {
    console.warn("No getCurrentInstance provided. Please provide a getCurrentInstance to create a web component.");
    return;
  }
  ie({
    rootComponent: r,
    plugins: t,
    cssFrameworkStyles: s,
    VueDefineCustomElement: o,
    h: n,
    createApp: i,
    getCurrentInstance: _,
    elementName: e,
    disableRemoveStylesOnUnmount: y,
    disableShadowDOM: v,
    replaceRootWithHostInCssFramework: u,
    asyncInitialization: c,
    loaderAttribute: a,
    hideSlotContentUntilMounted: h,
    nonce: d
  }).then((b) => {
    customElements.define(
      e,
      b
    );
  });
};
export {
  ae as createWebComponent,
  ae as default,
  ie as defineCustomElement,
  se as defineCustomElementSFC
};
