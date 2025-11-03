var F = Object.defineProperty;
var G = (e, r, t) => r in e ? F(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var m = (e, r, t) => G(e, typeof r != "symbol" ? r + "" : r, t);
import { defineComponent as W, nextTick as X, render as D, createVNode as I, h as C } from "vue";
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Z = Object.assign, R = Array.isArray, J = (e) => typeof e == "string", M = (e) => {
  const r = /* @__PURE__ */ Object.create(null);
  return (t) => r[t] || (r[t] = e(t));
}, Q = /-(\w)/g, P = M(
  (e) => e.replace(Q, (r, t) => t ? t.toUpperCase() : "")
), Y = /\B([A-Z])/g, N = M(
  (e) => e.replace(Y, "-$1").toLowerCase()
), $ = (e) => {
  const r = J(e) ? Number(e) : NaN;
  return isNaN(r) ? e : r;
};
/*!#__NO_SIDE_EFFECTS__*/
// @__NO_SIDE_EFFECTS__
function ee(e, r, t) {
  const o = W(e);
  class s extends T {
    constructor(i) {
      super(o, i, r, t);
    }
  }
  return m(s, "def", o), s;
}
const te = typeof HTMLElement < "u" ? HTMLElement : class {
};
class T extends te {
  constructor(t, o = {}, s = { shadowRoot: !0 }, n) {
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
    this._def = t, this._props = o, this._config = s, this._root && n ? n(this._createVNode(), this._root) : (this._config.shadowRoot !== !1 && this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  get _root() {
    return this._config.shadowRoot ? this.shadowRoot : this;
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, X(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), D(null, this._root), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    this._ob = new MutationObserver((s) => {
      for (const n of s)
        this._setAttr(n.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (s, n = !1) => {
      var v;
      const { props: i } = s, _ = this._collectNestedStyles(s);
      let y;
      if (i && !R(i))
        for (const h in i) {
          const c = i[h];
          (c === Number || c && c.type === Number) && (h in this._props && (this._props[h] = $(this._props[h])), (y || (y = /* @__PURE__ */ Object.create(null)))[P(h)] = !0);
        }
      if (this._numberProps = y, n && this._resolveProps(s), !this._config.shadowRoot) {
        this._slots = {};
        const h = (c) => Array.from(c).map((l) => {
          var d;
          if (l.nodeType === Node.ELEMENT_NODE) {
            const u = l, b = Object.fromEntries(
              Array.from(u.attributes).map((O) => [O.name, O.value])
            );
            return C(
              u.tagName.toLowerCase(),
              b,
              h(u.childNodes)
            );
          } else if (l.nodeType === Node.TEXT_NODE)
            return ((d = l.textContent) == null ? void 0 : d.trim()) || null;
          return null;
        }).filter((l) => l != null);
        for (const c of Array.from(this.childNodes)) {
          const l = c.nodeType === Node.ELEMENT_NODE && c.getAttribute("slot") || "default";
          if (this._slots[l] || (this._slots[l] = []), c.nodeType === Node.ELEMENT_NODE) {
            const d = c, u = Object.fromEntries(
              Array.from(d.attributes).map((b) => [b.name, b.value])
            );
            this._slots[l].push(
              C(
                d.tagName.toLowerCase(),
                u,
                h(d.childNodes)
              )
            );
          } else if (c.nodeType === Node.TEXT_NODE) {
            const d = (v = c.textContent) == null ? void 0 : v.trim();
            d && this._slots[l].push(d);
          }
        }
        this.replaceChildren();
      }
      console.log("__applyStyles fired"), this._applyStyles(_), this._update();
    }, o = this._def.__asyncLoader;
    o ? o().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: o } = t, s = R(o) ? o : Object.keys(o || {});
    for (const n of Object.keys(this))
      n[0] !== "_" && s.includes(n) && this._setProp(n, this[n], !0, !1);
    for (const n of s.map(P))
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
    let o = this.hasAttribute(t) ? this.getAttribute(t) : void 0;
    const s = P(t);
    this._numberProps && this._numberProps[s] && (o = $(o)), this._setProp(s, o, !1);
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
  _setProp(t, o, s = !0, n = !0) {
    o !== this._props[t] && (this._props[t] = o, n && this._instance && this._update(), s && (o === !0 ? this.setAttribute(N(t), "") : typeof o == "string" || typeof o == "number" ? this.setAttribute(N(t), o + "") : o || this.removeAttribute(N(t))));
  }
  _update() {
    D(this._createVNode(), this._root);
  }
  _createVNode() {
    const t = I(this._def, Z({}, this._props), this._slots);
    return this._instance || (t.ce = (o) => {
      this._instance = o, o.isCE = !0;
      const s = (i, _) => {
        this.dispatchEvent(
          new CustomEvent(i, {
            detail: _
          })
        );
      };
      o.emit = (i, ..._) => {
        s(i, _), N(i) !== i && s(N(i), _);
      };
      let n = this;
      for (; n = n && (n.parentNode || n.host); )
        if (n instanceof T) {
          o.parent = n._instance, o.provides = n._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((o) => {
      const s = document.createElement("style");
      s.textContent = o, this._config.nonce && s.setAttribute("nonce", this._config.nonce), this._root.prepend(s);
    });
  }
  _collectNestedStyles(t) {
    let o = t.styles ?? [];
    return t.components && Object.values(t.components).forEach((s) => {
      o = o.concat(this._collectNestedStyles(s));
    }), o;
  }
}
const H = (e) => {
  for (; (e == null ? void 0 : e.nodeType) !== 1; ) {
    if (!e.parentElement)
      throw new Error(
        "No parent element found, the rootComponent must be wrapped in a HTML element (e.g. <template><div> app content </div></template>)"
      );
    e = e.parentElement;
  }
  return e;
};
function se(e) {
  return "on" + e.charAt(0).toUpperCase() + e.slice(1);
}
function oe(e) {
  return typeof e == "string" ? e.replace(/:root/g, ":host") : Array.isArray(e) ? e.map((r) => r.replace(/:root/g, ":host")) : e;
}
const ne = ({
  rootComponent: e,
  plugins: r,
  cssFrameworkStyles: t,
  VueDefineCustomElement: o,
  h: s,
  createApp: n,
  getCurrentInstance: i,
  elementName: _,
  disableRemoveStylesOnUnmount: y,
  disableShadowDOM: v,
  replaceRootWithHostInCssFramework: h,
  asyncInitialization: c,
  loaderAttribute: l,
  hideSlotContentUntilMounted: d,
  nonce: u
}) => {
  const b = ee, O = h ? oe(t) : t, B = b({
    name: "vue-custom-element-root-component",
    styles: [O],
    nonce: u,
    props: {
      ...e.props,
      modelValue: { type: [String, Number, Boolean, Array, Object] }
      // v-model support
    },
    emits: e == null ? void 0 : e.emits,
    setup(K, { slots: U }) {
      var L;
      const S = [...(e == null ? void 0 : e.emits) || [], "update:modelValue"], f = n();
      if (f.component("app-root", e), e.provide) {
        const a = typeof e.provide == "function" ? e.provide() : e.provide;
        Object.keys(a).forEach((p) => {
          f.provide(p, a[p]);
        });
      }
      f.mixin({
        mounted() {
          var w, A, V, j;
          if (((A = (w = this.$) == null ? void 0 : w.type) == null ? void 0 : A.name) === "vue-custom-element-root-component") {
            console.log("is rootComponent");
            return;
          }
          const a = (E) => {
            console.log("insertStyles fired", E), E != null && E.length && (this.__style = document.createElement("style"), this.__style.innerText = E.join().replace(/\n/g, ""), u && this.__style.setAttribute("nonce", u), H(this.$el).append(this.__style));
          };
          if (a((V = this.$) == null ? void 0 : V.type.styles), this.$options.components)
            for (const E of Object.values(this.$options.components))
              a(E.styles);
          const p = ((j = this.$el.getRootNode()) == null ? void 0 : j.host) || H(this.$el);
          p && (d && p.querySelectorAll("[hidden]").forEach((q) => {
            q.removeAttribute("hidden");
          }), p.querySelectorAll(`[${l}]`).forEach((x) => {
            x.remove();
          }));
        },
        unmounted() {
          var a;
          y || (a = this.__style) == null || a.remove();
        }
      }), f.use(r);
      const g = i();
      if (Object.assign(g.appContext, f._context), Object.assign(g.provides, f._context.provides), process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        const a = document.querySelector(_);
        f._container = a, f._instance = g;
        const p = {
          Comment: Symbol("v-cmt"),
          Fragment: Symbol("v-fgt"),
          Static: Symbol("v-stc"),
          Text: Symbol("v-txt")
        };
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("app:init", f, f.version, p), window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = f;
      }
      const z = S == null ? void 0 : S.reduce((a, p) => {
        const w = se(p);
        return a[w] = (A) => {
          g.emit(p, A);
        }, a;
      }, {}), k = (L = e == null ? void 0 : e.namedSlots) == null ? void 0 : L.reduce((a, p) => (a[p] = () => s("slot", {
        name: p
      }), a), {});
      return () => s(
        e,
        {
          ...K,
          ...z
        },
        {
          default: () => s("slot"),
          ...k,
          ...U
        }
      );
    }
  }, { shadowRoot: !v, nonce: u });
  return c().then(() => B);
}, ce = ({
  elementName: e,
  rootComponent: r,
  plugins: t,
  cssFrameworkStyles: o,
  VueDefineCustomElement: s,
  h: n,
  createApp: i,
  getCurrentInstance: _,
  disableRemoveStylesOnUnmount: y = !1,
  disableShadowDOM: v = !1,
  replaceRootWithHostInCssFramework: h = !1,
  asyncInitialization: c = () => Promise.resolve(),
  loaderAttribute: l = "data-web-component-loader",
  hideSlotContentUntilMounted: d = !1,
  nonce: u
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
  if (!s) {
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
  ne({
    rootComponent: r,
    plugins: t,
    cssFrameworkStyles: o,
    VueDefineCustomElement: s,
    h: n,
    createApp: i,
    getCurrentInstance: _,
    elementName: e,
    disableRemoveStylesOnUnmount: y,
    disableShadowDOM: v,
    replaceRootWithHostInCssFramework: h,
    asyncInitialization: c,
    loaderAttribute: l,
    hideSlotContentUntilMounted: d,
    nonce: u
  }).then((b) => {
    customElements.define(
      e,
      b
    );
  });
};
export {
  ce as createWebComponent,
  ce as default,
  ne as defineCustomElement,
  ee as defineCustomElementSFC
};
