/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var tb = Object.create;
  var cn = Object.defineProperty;
  var rb = Object.getOwnPropertyDescriptor;
  var nb = Object.getOwnPropertyNames;
  var ib = Object.getPrototypeOf,
    ob = Object.prototype.hasOwnProperty;
  var me = (e, t) => () => (e && (t = e((e = 0))), t);
  var c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Ge = (e, t) => {
      for (var r in t) cn(e, r, { get: t[r], enumerable: !0 });
    },
    Ns = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of nb(t))
          !ob.call(e, i) &&
            i !== r &&
            cn(e, i, {
              get: () => t[i],
              enumerable: !(n = rb(t, i)) || n.enumerable,
            });
      return e;
    };
  var de = (e, t, r) => (
      (r = e != null ? tb(ib(e)) : {}),
      Ns(
        t || !e || !e.__esModule
          ? cn(r, "default", { value: e, enumerable: !0 })
          : r,
        e
      )
    ),
    it = (e) => Ns(cn({}, "__esModule", { value: !0 }), e);
  var Ps = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (s) {
          let u = window.getComputedStyle(s, null),
            d = u.getPropertyValue("position"),
            g = u.getPropertyValue("overflow"),
            v = u.getPropertyValue("display");
          (!d || d === "static") && (s.style.position = "relative"),
            g !== "hidden" && (s.style.overflow = "hidden"),
            (!v || v === "inline") && (s.style.display = "block"),
            s.clientHeight === 0 && (s.style.height = "100%"),
            s.className.indexOf("object-fit-polyfill") === -1 &&
              (s.className += " object-fit-polyfill");
        },
        i = function (s) {
          let u = window.getComputedStyle(s, null),
            d = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let g in d)
            u.getPropertyValue(g) !== d[g] && (s.style[g] = d[g]);
        },
        o = function (s) {
          let u = s.parentNode;
          n(u),
            i(s),
            (s.style.position = "absolute"),
            (s.style.height = "100%"),
            (s.style.width = "auto"),
            s.clientWidth > u.clientWidth
              ? ((s.style.top = "0"),
                (s.style.marginTop = "0"),
                (s.style.left = "50%"),
                (s.style.marginLeft = s.clientWidth / -2 + "px"))
              : ((s.style.width = "100%"),
                (s.style.height = "auto"),
                (s.style.left = "0"),
                (s.style.marginLeft = "0"),
                (s.style.top = "50%"),
                (s.style.marginTop = s.clientHeight / -2 + "px"));
        },
        a = function (s) {
          if (typeof s > "u" || s instanceof Event)
            s = document.querySelectorAll("[data-object-fit]");
          else if (s && s.nodeName) s = [s];
          else if (typeof s == "object" && s.length && s[0].nodeName) s = s;
          else return !1;
          for (let u = 0; u < s.length; u++) {
            if (!s[u].nodeName) continue;
            let d = s[u].nodeName.toLowerCase();
            if (d === "img") {
              if (t) continue;
              s[u].complete
                ? o(s[u])
                : s[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              d === "video"
                ? s[u].readyState > 0
                  ? o(s[u])
                  : s[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(s[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", a)
        : a(),
        window.addEventListener("resize", a),
        (window.objectFitPolyfill = a);
    })();
  });
  var Ms = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        n.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              a = $(`video#${o.attr("aria-controls")}`).get(0);
            if (a)
              if (a.paused) {
                let s = a.play();
                r(o),
                  s &&
                    typeof s.catch == "function" &&
                    s.catch(() => {
                      t(o);
                    });
              } else a.pause(), t(o);
          });
      });
    })();
  });
  var Pi = c(() => {
    "use strict";
    window.tram = (function (e) {
      function t(f, I) {
        var x = new _.Bare();
        return x.init(f, I);
      }
      function r(f) {
        return f.replace(/[A-Z]/g, function (I) {
          return "-" + I.toLowerCase();
        });
      }
      function n(f) {
        var I = parseInt(f.slice(1), 16),
          x = (I >> 16) & 255,
          L = (I >> 8) & 255,
          O = 255 & I;
        return [x, L, O];
      }
      function i(f, I, x) {
        return (
          "#" + ((1 << 24) | (f << 16) | (I << 8) | x).toString(16).slice(1)
        );
      }
      function o() {}
      function a(f, I) {
        d("Type warning: Expected: [" + f + "] Got: [" + typeof I + "] " + I);
      }
      function s(f, I, x) {
        d("Units do not match [" + f + "]: " + I + ", " + x);
      }
      function u(f, I, x) {
        if ((I !== void 0 && (x = I), f === void 0)) return x;
        var L = x;
        return (
          Fe.test(f) || !Be.test(f)
            ? (L = parseInt(f, 10))
            : Be.test(f) && (L = 1e3 * parseFloat(f)),
          0 > L && (L = 0),
          L === L ? L : x
        );
      }
      function d(f) {
        ae.debug && window && window.console.warn(f);
      }
      function g(f) {
        for (var I = -1, x = f ? f.length : 0, L = []; ++I < x; ) {
          var O = f[I];
          O && L.push(O);
        }
        return L;
      }
      var v = (function (f, I, x) {
          function L(se) {
            return typeof se == "object";
          }
          function O(se) {
            return typeof se == "function";
          }
          function D() {}
          function re(se, he) {
            function Q() {
              var Le = new ue();
              return O(Le.init) && Le.init.apply(Le, arguments), Le;
            }
            function ue() {}
            he === x && ((he = se), (se = Object)), (Q.Bare = ue);
            var ce,
              Te = (D[f] = se[f]),
              nt = (ue[f] = Q[f] = new D());
            return (
              (nt.constructor = Q),
              (Q.mixin = function (Le) {
                return (ue[f] = Q[f] = re(Q, Le)[f]), Q;
              }),
              (Q.open = function (Le) {
                if (
                  ((ce = {}),
                  O(Le) ? (ce = Le.call(Q, nt, Te, Q, se)) : L(Le) && (ce = Le),
                  L(ce))
                )
                  for (var Ir in ce) I.call(ce, Ir) && (nt[Ir] = ce[Ir]);
                return O(nt.init) || (nt.init = se), Q;
              }),
              Q.open(he)
            );
          }
          return re;
        })("prototype", {}.hasOwnProperty),
        E = {
          ease: [
            "ease",
            function (f, I, x, L) {
              var O = (f /= L) * f,
                D = O * f;
              return (
                I +
                x * (-2.75 * D * O + 11 * O * O + -15.5 * D + 8 * O + 0.25 * f)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (f, I, x, L) {
              var O = (f /= L) * f,
                D = O * f;
              return I + x * (-1 * D * O + 3 * O * O + -3 * D + 2 * O);
            },
          ],
          "ease-out": [
            "ease-out",
            function (f, I, x, L) {
              var O = (f /= L) * f,
                D = O * f;
              return (
                I +
                x * (0.3 * D * O + -1.6 * O * O + 2.2 * D + -1.8 * O + 1.9 * f)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (f, I, x, L) {
              var O = (f /= L) * f,
                D = O * f;
              return I + x * (2 * D * O + -5 * O * O + 2 * D + 2 * O);
            },
          ],
          linear: [
            "linear",
            function (f, I, x, L) {
              return (x * f) / L + I;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (f, I, x, L) {
              return x * (f /= L) * f + I;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (f, I, x, L) {
              return -x * (f /= L) * (f - 2) + I;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (f, I, x, L) {
              return (f /= L / 2) < 1
                ? (x / 2) * f * f + I
                : (-x / 2) * (--f * (f - 2) - 1) + I;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (f, I, x, L) {
              return x * (f /= L) * f * f + I;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (f, I, x, L) {
              return x * ((f = f / L - 1) * f * f + 1) + I;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (f, I, x, L) {
              return (f /= L / 2) < 1
                ? (x / 2) * f * f * f + I
                : (x / 2) * ((f -= 2) * f * f + 2) + I;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (f, I, x, L) {
              return x * (f /= L) * f * f * f + I;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (f, I, x, L) {
              return -x * ((f = f / L - 1) * f * f * f - 1) + I;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (f, I, x, L) {
              return (f /= L / 2) < 1
                ? (x / 2) * f * f * f * f + I
                : (-x / 2) * ((f -= 2) * f * f * f - 2) + I;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (f, I, x, L) {
              return x * (f /= L) * f * f * f * f + I;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (f, I, x, L) {
              return x * ((f = f / L - 1) * f * f * f * f + 1) + I;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (f, I, x, L) {
              return (f /= L / 2) < 1
                ? (x / 2) * f * f * f * f * f + I
                : (x / 2) * ((f -= 2) * f * f * f * f + 2) + I;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (f, I, x, L) {
              return -x * Math.cos((f / L) * (Math.PI / 2)) + x + I;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (f, I, x, L) {
              return x * Math.sin((f / L) * (Math.PI / 2)) + I;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (f, I, x, L) {
              return (-x / 2) * (Math.cos((Math.PI * f) / L) - 1) + I;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (f, I, x, L) {
              return f === 0 ? I : x * Math.pow(2, 10 * (f / L - 1)) + I;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (f, I, x, L) {
              return f === L
                ? I + x
                : x * (-Math.pow(2, (-10 * f) / L) + 1) + I;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (f, I, x, L) {
              return f === 0
                ? I
                : f === L
                ? I + x
                : (f /= L / 2) < 1
                ? (x / 2) * Math.pow(2, 10 * (f - 1)) + I
                : (x / 2) * (-Math.pow(2, -10 * --f) + 2) + I;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (f, I, x, L) {
              return -x * (Math.sqrt(1 - (f /= L) * f) - 1) + I;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (f, I, x, L) {
              return x * Math.sqrt(1 - (f = f / L - 1) * f) + I;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (f, I, x, L) {
              return (f /= L / 2) < 1
                ? (-x / 2) * (Math.sqrt(1 - f * f) - 1) + I
                : (x / 2) * (Math.sqrt(1 - (f -= 2) * f) + 1) + I;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (f, I, x, L, O) {
              return (
                O === void 0 && (O = 1.70158),
                x * (f /= L) * f * ((O + 1) * f - O) + I
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (f, I, x, L, O) {
              return (
                O === void 0 && (O = 1.70158),
                x * ((f = f / L - 1) * f * ((O + 1) * f + O) + 1) + I
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (f, I, x, L, O) {
              return (
                O === void 0 && (O = 1.70158),
                (f /= L / 2) < 1
                  ? (x / 2) * f * f * (((O *= 1.525) + 1) * f - O) + I
                  : (x / 2) *
                      ((f -= 2) * f * (((O *= 1.525) + 1) * f + O) + 2) +
                    I
              );
            },
          ],
        },
        m = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        T = document,
        w = window,
        k = "bkwld-tram",
        S = /[\-\.0-9]/g,
        N = /[A-Z]/,
        C = "number",
        M = /^(rgb|#)/,
        F = /(em|cm|mm|in|pt|pc|px)$/,
        q = /(em|cm|mm|in|pt|pc|px|%)$/,
        z = /(deg|rad|turn)$/,
        K = "unitless",
        Z = /(all|none) 0s ease 0s/,
        te = /^(width|height)$/,
        H = " ",
        A = T.createElement("a"),
        y = ["Webkit", "Moz", "O", "ms"],
        P = ["-webkit-", "-moz-", "-o-", "-ms-"],
        U = function (f) {
          if (f in A.style) return { dom: f, css: f };
          var I,
            x,
            L = "",
            O = f.split("-");
          for (I = 0; I < O.length; I++)
            L += O[I].charAt(0).toUpperCase() + O[I].slice(1);
          for (I = 0; I < y.length; I++)
            if (((x = y[I] + L), x in A.style))
              return { dom: x, css: P[I] + f };
        },
        X = (t.support = {
          bind: Function.prototype.bind,
          transform: U("transform"),
          transition: U("transition"),
          backface: U("backface-visibility"),
          timing: U("transition-timing-function"),
        });
      if (X.transition) {
        var ee = X.timing.dom;
        if (((A.style[ee] = E["ease-in-back"][0]), !A.style[ee]))
          for (var ne in m) E[ne][0] = m[ne];
      }
      var V = (t.frame = (function () {
          var f =
            w.requestAnimationFrame ||
            w.webkitRequestAnimationFrame ||
            w.mozRequestAnimationFrame ||
            w.oRequestAnimationFrame ||
            w.msRequestAnimationFrame;
          return f && X.bind
            ? f.bind(w)
            : function (I) {
                w.setTimeout(I, 16);
              };
        })()),
        j = (t.now = (function () {
          var f = w.performance,
            I = f && (f.now || f.webkitNow || f.msNow || f.mozNow);
          return I && X.bind
            ? I.bind(f)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        p = v(function (f) {
          function I(ie, le) {
            var _e = g(("" + ie).split(H)),
              ve = _e[0];
            le = le || {};
            var Ne = Y[ve];
            if (!Ne) return d("Unsupported property: " + ve);
            if (!le.weak || !this.props[ve]) {
              var ze = Ne[0],
                ke = this.props[ve];
              return (
                ke || (ke = this.props[ve] = new ze.Bare()),
                ke.init(this.$el, _e, Ne, le),
                ke
              );
            }
          }
          function x(ie, le, _e) {
            if (ie) {
              var ve = typeof ie;
              if (
                (le ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                ve == "number" && le)
              )
                return (
                  (this.timer = new oe({
                    duration: ie,
                    context: this,
                    complete: D,
                  })),
                  void (this.active = !0)
                );
              if (ve == "string" && le) {
                switch (ie) {
                  case "hide":
                    Q.call(this);
                    break;
                  case "stop":
                    re.call(this);
                    break;
                  case "redraw":
                    ue.call(this);
                    break;
                  default:
                    I.call(this, ie, _e && _e[1]);
                }
                return D.call(this);
              }
              if (ve == "function") return void ie.call(this, this);
              if (ve == "object") {
                var Ne = 0;
                nt.call(
                  this,
                  ie,
                  function (Ie, eb) {
                    Ie.span > Ne && (Ne = Ie.span), Ie.stop(), Ie.animate(eb);
                  },
                  function (Ie) {
                    "wait" in Ie && (Ne = u(Ie.wait, 0));
                  }
                ),
                  Te.call(this),
                  Ne > 0 &&
                    ((this.timer = new oe({ duration: Ne, context: this })),
                    (this.active = !0),
                    le && (this.timer.complete = D));
                var ze = this,
                  ke = !1,
                  un = {};
                V(function () {
                  nt.call(ze, ie, function (Ie) {
                    Ie.active && ((ke = !0), (un[Ie.name] = Ie.nextStyle));
                  }),
                    ke && ze.$el.css(un);
                });
              }
            }
          }
          function L(ie) {
            (ie = u(ie, 0)),
              this.active
                ? this.queue.push({ options: ie })
                : ((this.timer = new oe({
                    duration: ie,
                    context: this,
                    complete: D,
                  })),
                  (this.active = !0));
          }
          function O(ie) {
            return this.active
              ? (this.queue.push({ options: ie, args: arguments }),
                void (this.timer.complete = D))
              : d(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function D() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var ie = this.queue.shift();
              x.call(this, ie.options, !0, ie.args);
            }
          }
          function re(ie) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var le;
            typeof ie == "string"
              ? ((le = {}), (le[ie] = 1))
              : (le = typeof ie == "object" && ie != null ? ie : this.props),
              nt.call(this, le, Le),
              Te.call(this);
          }
          function se(ie) {
            re.call(this, ie), nt.call(this, ie, Ir, Z_);
          }
          function he(ie) {
            typeof ie != "string" && (ie = "block"),
              (this.el.style.display = ie);
          }
          function Q() {
            re.call(this), (this.el.style.display = "none");
          }
          function ue() {
            this.el.offsetHeight;
          }
          function ce() {
            re.call(this),
              e.removeData(this.el, k),
              (this.$el = this.el = null);
          }
          function Te() {
            var ie,
              le,
              _e = [];
            this.upstream && _e.push(this.upstream);
            for (ie in this.props)
              (le = this.props[ie]), le.active && _e.push(le.string);
            (_e = _e.join(",")),
              this.style !== _e &&
                ((this.style = _e), (this.el.style[X.transition.dom] = _e));
          }
          function nt(ie, le, _e) {
            var ve,
              Ne,
              ze,
              ke,
              un = le !== Le,
              Ie = {};
            for (ve in ie)
              (ze = ie[ve]),
                ve in pe
                  ? (Ie.transform || (Ie.transform = {}),
                    (Ie.transform[ve] = ze))
                  : (N.test(ve) && (ve = r(ve)),
                    ve in Y ? (Ie[ve] = ze) : (ke || (ke = {}), (ke[ve] = ze)));
            for (ve in Ie) {
              if (((ze = Ie[ve]), (Ne = this.props[ve]), !Ne)) {
                if (!un) continue;
                Ne = I.call(this, ve);
              }
              le.call(this, Ne, ze);
            }
            _e && ke && _e.call(this, ke);
          }
          function Le(ie) {
            ie.stop();
          }
          function Ir(ie, le) {
            ie.set(le);
          }
          function Z_(ie) {
            this.$el.css(ie);
          }
          function je(ie, le) {
            f[ie] = function () {
              return this.children
                ? J_.call(this, le, arguments)
                : (this.el && le.apply(this, arguments), this);
            };
          }
          function J_(ie, le) {
            var _e,
              ve = this.children.length;
            for (_e = 0; ve > _e; _e++) ie.apply(this.children[_e], le);
            return this;
          }
          (f.init = function (ie) {
            if (
              ((this.$el = e(ie)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              ae.keepInherited && !ae.fallback)
            ) {
              var le = B(this.el, "transition");
              le && !Z.test(le) && (this.upstream = le);
            }
            X.backface &&
              ae.hideBackface &&
              h(this.el, X.backface.css, "hidden");
          }),
            je("add", I),
            je("start", x),
            je("wait", L),
            je("then", O),
            je("next", D),
            je("stop", re),
            je("set", se),
            je("show", he),
            je("hide", Q),
            je("redraw", ue),
            je("destroy", ce);
        }),
        _ = v(p, function (f) {
          function I(x, L) {
            var O = e.data(x, k) || e.data(x, k, new p.Bare());
            return O.el || O.init(x), L ? O.start(L) : O;
          }
          f.init = function (x, L) {
            var O = e(x);
            if (!O.length) return this;
            if (O.length === 1) return I(O[0], L);
            var D = [];
            return (
              O.each(function (re, se) {
                D.push(I(se, L));
              }),
              (this.children = D),
              this
            );
          };
        }),
        b = v(function (f) {
          function I() {
            var D = this.get();
            this.update("auto");
            var re = this.get();
            return this.update(D), re;
          }
          function x(D, re, se) {
            return re !== void 0 && (se = re), D in E ? D : se;
          }
          function L(D) {
            var re = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(D);
            return (re ? i(re[1], re[2], re[3]) : D).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var O = { duration: 500, ease: "ease", delay: 0 };
          (f.init = function (D, re, se, he) {
            (this.$el = D), (this.el = D[0]);
            var Q = re[0];
            se[2] && (Q = se[2]),
              J[Q] && (Q = J[Q]),
              (this.name = Q),
              (this.type = se[1]),
              (this.duration = u(re[1], this.duration, O.duration)),
              (this.ease = x(re[2], this.ease, O.ease)),
              (this.delay = u(re[3], this.delay, O.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = te.test(this.name)),
              (this.unit = he.unit || this.unit || ae.defaultUnit),
              (this.angle = he.angle || this.angle || ae.defaultAngle),
              ae.fallback || he.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    H +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? H + E[this.ease][0] : "") +
                    (this.delay ? H + this.delay + "ms" : "")));
          }),
            (f.set = function (D) {
              (D = this.convert(D, this.type)), this.update(D), this.redraw();
            }),
            (f.transition = function (D) {
              (this.active = !0),
                (D = this.convert(D, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  D == "auto" && (D = I.call(this))),
                (this.nextStyle = D);
            }),
            (f.fallback = function (D) {
              var re =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (D = this.convert(D, this.type)),
                this.auto &&
                  (re == "auto" && (re = this.convert(this.get(), this.type)),
                  D == "auto" && (D = I.call(this))),
                (this.tween = new R({
                  from: re,
                  to: D,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (f.get = function () {
              return B(this.el, this.name);
            }),
            (f.update = function (D) {
              h(this.el, this.name, D);
            }),
            (f.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                h(this.el, this.name, this.get()));
              var D = this.tween;
              D && D.context && D.destroy();
            }),
            (f.convert = function (D, re) {
              if (D == "auto" && this.auto) return D;
              var se,
                he = typeof D == "number",
                Q = typeof D == "string";
              switch (re) {
                case C:
                  if (he) return D;
                  if (Q && D.replace(S, "") === "") return +D;
                  se = "number(unitless)";
                  break;
                case M:
                  if (Q) {
                    if (D === "" && this.original) return this.original;
                    if (re.test(D))
                      return D.charAt(0) == "#" && D.length == 7 ? D : L(D);
                  }
                  se = "hex or rgb string";
                  break;
                case F:
                  if (he) return D + this.unit;
                  if (Q && re.test(D)) return D;
                  se = "number(px) or string(unit)";
                  break;
                case q:
                  if (he) return D + this.unit;
                  if (Q && re.test(D)) return D;
                  se = "number(px) or string(unit or %)";
                  break;
                case z:
                  if (he) return D + this.angle;
                  if (Q && re.test(D)) return D;
                  se = "number(deg) or string(angle)";
                  break;
                case K:
                  if (he || (Q && q.test(D))) return D;
                  se = "number(unitless) or string(unit or %)";
              }
              return a(se, D), D;
            }),
            (f.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        l = v(b, function (f, I) {
          f.init = function () {
            I.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), M));
          };
        }),
        G = v(b, function (f, I) {
          (f.init = function () {
            I.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (f.get = function () {
              return this.$el[this.name]();
            }),
            (f.update = function (x) {
              this.$el[this.name](x);
            });
        }),
        W = v(b, function (f, I) {
          function x(L, O) {
            var D, re, se, he, Q;
            for (D in L)
              (he = pe[D]),
                (se = he[0]),
                (re = he[1] || D),
                (Q = this.convert(L[D], se)),
                O.call(this, re, Q, se);
          }
          (f.init = function () {
            I.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                pe.perspective &&
                  ae.perspective &&
                  ((this.current.perspective = ae.perspective),
                  h(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (f.set = function (L) {
              x.call(this, L, function (O, D) {
                this.current[O] = D;
              }),
                h(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (f.transition = function (L) {
              var O = this.values(L);
              this.tween = new fe({
                current: this.current,
                values: O,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var D,
                re = {};
              for (D in this.current) re[D] = D in O ? O[D] : this.current[D];
              (this.active = !0), (this.nextStyle = this.style(re));
            }),
            (f.fallback = function (L) {
              var O = this.values(L);
              this.tween = new fe({
                current: this.current,
                values: O,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (f.update = function () {
              h(this.el, this.name, this.style(this.current));
            }),
            (f.style = function (L) {
              var O,
                D = "";
              for (O in L) D += O + "(" + L[O] + ") ";
              return D;
            }),
            (f.values = function (L) {
              var O,
                D = {};
              return (
                x.call(this, L, function (re, se, he) {
                  (D[re] = se),
                    this.current[re] === void 0 &&
                      ((O = 0),
                      ~re.indexOf("scale") && (O = 1),
                      (this.current[re] = this.convert(O, he)));
                }),
                D
              );
            });
        }),
        R = v(function (f) {
          function I(Q) {
            se.push(Q) === 1 && V(x);
          }
          function x() {
            var Q,
              ue,
              ce,
              Te = se.length;
            if (Te)
              for (V(x), ue = j(), Q = Te; Q--; )
                (ce = se[Q]), ce && ce.render(ue);
          }
          function L(Q) {
            var ue,
              ce = e.inArray(Q, se);
            ce >= 0 &&
              ((ue = se.slice(ce + 1)),
              (se.length = ce),
              ue.length && (se = se.concat(ue)));
          }
          function O(Q) {
            return Math.round(Q * he) / he;
          }
          function D(Q, ue, ce) {
            return i(
              Q[0] + ce * (ue[0] - Q[0]),
              Q[1] + ce * (ue[1] - Q[1]),
              Q[2] + ce * (ue[2] - Q[2])
            );
          }
          var re = { ease: E.ease[1], from: 0, to: 1 };
          (f.init = function (Q) {
            (this.duration = Q.duration || 0), (this.delay = Q.delay || 0);
            var ue = Q.ease || re.ease;
            E[ue] && (ue = E[ue][1]),
              typeof ue != "function" && (ue = re.ease),
              (this.ease = ue),
              (this.update = Q.update || o),
              (this.complete = Q.complete || o),
              (this.context = Q.context || this),
              (this.name = Q.name);
            var ce = Q.from,
              Te = Q.to;
            ce === void 0 && (ce = re.from),
              Te === void 0 && (Te = re.to),
              (this.unit = Q.unit || ""),
              typeof ce == "number" && typeof Te == "number"
                ? ((this.begin = ce), (this.change = Te - ce))
                : this.format(Te, ce),
              (this.value = this.begin + this.unit),
              (this.start = j()),
              Q.autoplay !== !1 && this.play();
          }),
            (f.play = function () {
              this.active ||
                (this.start || (this.start = j()), (this.active = !0), I(this));
            }),
            (f.stop = function () {
              this.active && ((this.active = !1), L(this));
            }),
            (f.render = function (Q) {
              var ue,
                ce = Q - this.start;
              if (this.delay) {
                if (ce <= this.delay) return;
                ce -= this.delay;
              }
              if (ce < this.duration) {
                var Te = this.ease(ce, 0, 1, this.duration);
                return (
                  (ue = this.startRGB
                    ? D(this.startRGB, this.endRGB, Te)
                    : O(this.begin + Te * this.change)),
                  (this.value = ue + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ue = this.endHex || this.begin + this.change),
                (this.value = ue + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (f.format = function (Q, ue) {
              if (((ue += ""), (Q += ""), Q.charAt(0) == "#"))
                return (
                  (this.startRGB = n(ue)),
                  (this.endRGB = n(Q)),
                  (this.endHex = Q),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var ce = ue.replace(S, ""),
                  Te = Q.replace(S, "");
                ce !== Te && s("tween", ue, Q), (this.unit = ce);
              }
              (ue = parseFloat(ue)),
                (Q = parseFloat(Q)),
                (this.begin = this.value = ue),
                (this.change = Q - ue);
            }),
            (f.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var se = [],
            he = 1e3;
        }),
        oe = v(R, function (f) {
          (f.init = function (I) {
            (this.duration = I.duration || 0),
              (this.complete = I.complete || o),
              (this.context = I.context),
              this.play();
          }),
            (f.render = function (I) {
              var x = I - this.start;
              x < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        fe = v(R, function (f, I) {
          (f.init = function (x) {
            (this.context = x.context),
              (this.update = x.update),
              (this.tweens = []),
              (this.current = x.current);
            var L, O;
            for (L in x.values)
              (O = x.values[L]),
                this.current[L] !== O &&
                  this.tweens.push(
                    new R({
                      name: L,
                      from: this.current[L],
                      to: O,
                      duration: x.duration,
                      delay: x.delay,
                      ease: x.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (f.render = function (x) {
              var L,
                O,
                D = this.tweens.length,
                re = !1;
              for (L = D; L--; )
                (O = this.tweens[L]),
                  O.context &&
                    (O.render(x), (this.current[O.name] = O.value), (re = !0));
              return re
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (f.destroy = function () {
              if ((I.destroy.call(this), this.tweens)) {
                var x,
                  L = this.tweens.length;
                for (x = L; x--; ) this.tweens[x].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        ae = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !X.transition,
          agentTests: [],
        });
      (t.fallback = function (f) {
        if (!X.transition) return (ae.fallback = !0);
        ae.agentTests.push("(" + f + ")");
        var I = new RegExp(ae.agentTests.join("|"), "i");
        ae.fallback = I.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (f) {
          return new R(f);
        }),
        (t.delay = function (f, I, x) {
          return new oe({ complete: I, duration: f, context: x });
        }),
        (e.fn.tram = function (f) {
          return t.call(null, this, f);
        });
      var h = e.style,
        B = e.css,
        J = { transform: X.transform && X.transform.css },
        Y = {
          color: [l, M],
          background: [l, M, "background-color"],
          "outline-color": [l, M],
          "border-color": [l, M],
          "border-top-color": [l, M],
          "border-right-color": [l, M],
          "border-bottom-color": [l, M],
          "border-left-color": [l, M],
          "border-width": [b, F],
          "border-top-width": [b, F],
          "border-right-width": [b, F],
          "border-bottom-width": [b, F],
          "border-left-width": [b, F],
          "border-spacing": [b, F],
          "letter-spacing": [b, F],
          margin: [b, F],
          "margin-top": [b, F],
          "margin-right": [b, F],
          "margin-bottom": [b, F],
          "margin-left": [b, F],
          padding: [b, F],
          "padding-top": [b, F],
          "padding-right": [b, F],
          "padding-bottom": [b, F],
          "padding-left": [b, F],
          "outline-width": [b, F],
          opacity: [b, C],
          top: [b, q],
          right: [b, q],
          bottom: [b, q],
          left: [b, q],
          "font-size": [b, q],
          "text-indent": [b, q],
          "word-spacing": [b, q],
          width: [b, q],
          "min-width": [b, q],
          "max-width": [b, q],
          height: [b, q],
          "min-height": [b, q],
          "max-height": [b, q],
          "line-height": [b, K],
          "scroll-top": [G, C, "scrollTop"],
          "scroll-left": [G, C, "scrollLeft"],
        },
        pe = {};
      X.transform &&
        ((Y.transform = [W]),
        (pe = {
          x: [q, "translateX"],
          y: [q, "translateY"],
          rotate: [z],
          rotateX: [z],
          rotateY: [z],
          scale: [C],
          scaleX: [C],
          scaleY: [C],
          skew: [z],
          skewX: [z],
          skewY: [z],
        })),
        X.transform &&
          X.backface &&
          ((pe.z = [q, "translateZ"]),
          (pe.rotateZ = [z]),
          (pe.scaleZ = [C]),
          (pe.perspective = [F]));
      var Fe = /ms/,
        Be = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var Ds = c((ZV, qs) => {
    "use strict";
    var ab = window.$,
      sb = Pi() && ab.tram;
    qs.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        i = Function.prototype,
        o = r.push,
        a = r.slice,
        s = r.concat,
        u = n.toString,
        d = n.hasOwnProperty,
        g = r.forEach,
        v = r.map,
        E = r.reduce,
        m = r.reduceRight,
        T = r.filter,
        w = r.every,
        k = r.some,
        S = r.indexOf,
        N = r.lastIndexOf,
        C = Array.isArray,
        M = Object.keys,
        F = i.bind,
        q =
          (e.each =
          e.forEach =
            function (y, P, U) {
              if (y == null) return y;
              if (g && y.forEach === g) y.forEach(P, U);
              else if (y.length === +y.length) {
                for (var X = 0, ee = y.length; X < ee; X++)
                  if (P.call(U, y[X], X, y) === t) return;
              } else
                for (var ne = e.keys(y), X = 0, ee = ne.length; X < ee; X++)
                  if (P.call(U, y[ne[X]], ne[X], y) === t) return;
              return y;
            });
      (e.map = e.collect =
        function (y, P, U) {
          var X = [];
          return y == null
            ? X
            : v && y.map === v
            ? y.map(P, U)
            : (q(y, function (ee, ne, V) {
                X.push(P.call(U, ee, ne, V));
              }),
              X);
        }),
        (e.find = e.detect =
          function (y, P, U) {
            var X;
            return (
              z(y, function (ee, ne, V) {
                if (P.call(U, ee, ne, V)) return (X = ee), !0;
              }),
              X
            );
          }),
        (e.filter = e.select =
          function (y, P, U) {
            var X = [];
            return y == null
              ? X
              : T && y.filter === T
              ? y.filter(P, U)
              : (q(y, function (ee, ne, V) {
                  P.call(U, ee, ne, V) && X.push(ee);
                }),
                X);
          });
      var z =
        (e.some =
        e.any =
          function (y, P, U) {
            P || (P = e.identity);
            var X = !1;
            return y == null
              ? X
              : k && y.some === k
              ? y.some(P, U)
              : (q(y, function (ee, ne, V) {
                  if (X || (X = P.call(U, ee, ne, V))) return t;
                }),
                !!X);
          });
      (e.contains = e.include =
        function (y, P) {
          return y == null
            ? !1
            : S && y.indexOf === S
            ? y.indexOf(P) != -1
            : z(y, function (U) {
                return U === P;
              });
        }),
        (e.delay = function (y, P) {
          var U = a.call(arguments, 2);
          return setTimeout(function () {
            return y.apply(null, U);
          }, P);
        }),
        (e.defer = function (y) {
          return e.delay.apply(e, [y, 1].concat(a.call(arguments, 1)));
        }),
        (e.throttle = function (y) {
          var P, U, X;
          return function () {
            P ||
              ((P = !0),
              (U = arguments),
              (X = this),
              sb.frame(function () {
                (P = !1), y.apply(X, U);
              }));
          };
        }),
        (e.debounce = function (y, P, U) {
          var X,
            ee,
            ne,
            V,
            j,
            p = function () {
              var _ = e.now() - V;
              _ < P
                ? (X = setTimeout(p, P - _))
                : ((X = null), U || ((j = y.apply(ne, ee)), (ne = ee = null)));
            };
          return function () {
            (ne = this), (ee = arguments), (V = e.now());
            var _ = U && !X;
            return (
              X || (X = setTimeout(p, P)),
              _ && ((j = y.apply(ne, ee)), (ne = ee = null)),
              j
            );
          };
        }),
        (e.defaults = function (y) {
          if (!e.isObject(y)) return y;
          for (var P = 1, U = arguments.length; P < U; P++) {
            var X = arguments[P];
            for (var ee in X) y[ee] === void 0 && (y[ee] = X[ee]);
          }
          return y;
        }),
        (e.keys = function (y) {
          if (!e.isObject(y)) return [];
          if (M) return M(y);
          var P = [];
          for (var U in y) e.has(y, U) && P.push(U);
          return P;
        }),
        (e.has = function (y, P) {
          return d.call(y, P);
        }),
        (e.isObject = function (y) {
          return y === Object(y);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var K = /(.)^/,
        Z = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        te = /\\|'|\r|\n|\u2028|\u2029/g,
        H = function (y) {
          return "\\" + Z[y];
        },
        A = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (y, P, U) {
          !P && U && (P = U), (P = e.defaults({}, P, e.templateSettings));
          var X = RegExp(
              [
                (P.escape || K).source,
                (P.interpolate || K).source,
                (P.evaluate || K).source,
              ].join("|") + "|$",
              "g"
            ),
            ee = 0,
            ne = "__p+='";
          y.replace(X, function (_, b, l, G, W) {
            return (
              (ne += y.slice(ee, W).replace(te, H)),
              (ee = W + _.length),
              b
                ? (ne +=
                    `'+
((__t=(` +
                    b +
                    `))==null?'':_.escape(__t))+
'`)
                : l
                ? (ne +=
                    `'+
((__t=(` +
                    l +
                    `))==null?'':__t)+
'`)
                : G &&
                  (ne +=
                    `';
` +
                    G +
                    `
__p+='`),
              _
            );
          }),
            (ne += `';
`);
          var V = P.variable;
          if (V) {
            if (!A.test(V))
              throw new Error("variable is not a bare identifier: " + V);
          } else
            (ne =
              `with(obj||{}){
` +
              ne +
              `}
`),
              (V = "obj");
          ne =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            ne +
            `return __p;
`;
          var j;
          try {
            j = new Function(P.variable || "obj", "_", ne);
          } catch (_) {
            throw ((_.source = ne), _);
          }
          var p = function (_) {
            return j.call(this, _, e);
          };
          return (
            (p.source =
              "function(" +
              V +
              `){
` +
              ne +
              "}"),
            p
          );
        }),
        e
      );
    })();
  });
  var Pe = c((JV, Xs) => {
    "use strict";
    var ge = {},
      Xt = {},
      Bt = [],
      qi = window.Webflow || [],
      bt = window.jQuery,
      Ye = bt(window),
      ub = bt(document),
      ot = bt.isFunction,
      Ke = (ge._ = Ds()),
      ks = (ge.tram = Pi() && bt.tram),
      fn = !1,
      Di = !1;
    ks.config.hideBackface = !1;
    ks.config.keepInherited = !0;
    ge.define = function (e, t, r) {
      Xt[e] && Us(Xt[e]);
      var n = (Xt[e] = t(bt, Ke, r) || {});
      return Gs(n), n;
    };
    ge.require = function (e) {
      return Xt[e];
    };
    function Gs(e) {
      ge.env() &&
        (ot(e.design) && Ye.on("__wf_design", e.design),
        ot(e.preview) && Ye.on("__wf_preview", e.preview)),
        ot(e.destroy) && Ye.on("__wf_destroy", e.destroy),
        e.ready && ot(e.ready) && cb(e);
    }
    function cb(e) {
      if (fn) {
        e.ready();
        return;
      }
      Ke.contains(Bt, e.ready) || Bt.push(e.ready);
    }
    function Us(e) {
      ot(e.design) && Ye.off("__wf_design", e.design),
        ot(e.preview) && Ye.off("__wf_preview", e.preview),
        ot(e.destroy) && Ye.off("__wf_destroy", e.destroy),
        e.ready && ot(e.ready) && lb(e);
    }
    function lb(e) {
      Bt = Ke.filter(Bt, function (t) {
        return t !== e.ready;
      });
    }
    ge.push = function (e) {
      if (fn) {
        ot(e) && e();
        return;
      }
      qi.push(e);
    };
    ge.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var ln = navigator.userAgent.toLowerCase(),
      Vs = (ge.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      fb = (ge.env.chrome =
        /chrome/.test(ln) &&
        /Google/.test(navigator.vendor) &&
        parseInt(ln.match(/chrome\/(\d+)\./)[1], 10)),
      db = (ge.env.ios = /(ipod|iphone|ipad)/.test(ln));
    ge.env.safari = /safari/.test(ln) && !fb && !db;
    var Mi;
    Vs &&
      ub.on("touchstart mousedown", function (e) {
        Mi = e.target;
      });
    ge.validClick = Vs
      ? function (e) {
          return e === Mi || bt.contains(e, Mi);
        }
      : function () {
          return !0;
        };
    var Ws = "resize.webflow orientationchange.webflow load.webflow",
      pb = "scroll.webflow " + Ws;
    ge.resize = Fi(Ye, Ws);
    ge.scroll = Fi(Ye, pb);
    ge.redraw = Fi();
    function Fi(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = Ke.throttle(function (i) {
          Ke.each(r, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (i) {
          typeof i == "function" && (Ke.contains(r, i) || r.push(i));
        }),
        (n.off = function (i) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = Ke.filter(r, function (o) {
            return o !== i;
          });
        }),
        n
      );
    }
    ge.location = function (e) {
      window.location = e;
    };
    ge.env() && (ge.location = function () {});
    ge.ready = function () {
      (fn = !0), Di ? vb() : Ke.each(Bt, Fs), Ke.each(qi, Fs), ge.resize.up();
    };
    function Fs(e) {
      ot(e) && e();
    }
    function vb() {
      (Di = !1), Ke.each(Xt, Gs);
    }
    var Nt;
    ge.load = function (e) {
      Nt.then(e);
    };
    function Hs() {
      Nt && (Nt.reject(), Ye.off("load", Nt.resolve)),
        (Nt = new bt.Deferred()),
        Ye.on("load", Nt.resolve);
    }
    ge.destroy = function (e) {
      (e = e || {}),
        (Di = !0),
        Ye.triggerHandler("__wf_destroy"),
        e.domready != null && (fn = e.domready),
        Ke.each(Xt, Us),
        ge.resize.off(),
        ge.scroll.off(),
        ge.redraw.off(),
        (Bt = []),
        (qi = []),
        Nt.state() === "pending" && Hs();
    };
    bt(ge.ready);
    Hs();
    Xs.exports = window.Webflow = ge;
  });
  var zs = c((eW, js) => {
    "use strict";
    var Bs = Pe();
    Bs.define(
      "brand",
      (js.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          a = window.location,
          s = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          d;
        t.ready = function () {
          var m = n.attr("data-wf-status"),
            T = n.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(T) && a.hostname !== T && (m = !0),
            m &&
              !s &&
              ((d = d || v()),
              E(),
              setTimeout(E, 500),
              e(r).off(u, g).on(u, g));
        };
        function g() {
          var m =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(d).attr("style", m ? "display: none !important;" : "");
        }
        function v() {
          var m = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            T = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "4px", width: "26px" }),
            w = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg"
              )
              .attr("alt", "Made in Webflow");
          return m.append(T, w), m[0];
        }
        function E() {
          var m = i.children(o),
            T = m.length && m.get(0) === d,
            w = Bs.env("editor");
          if (T) {
            w && m.remove();
            return;
          }
          m.length && m.remove(), w || i.append(d);
        }
        return t;
      })
    );
  });
  var Ys = c((tW, Ks) => {
    "use strict";
    var ki = Pe();
    ki.define(
      "edit",
      (Ks.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (ki.env("test") || ki.env("frame")) && !r.fixture && !gb())
        )
          return { exit: 1 };
        var n = {},
          i = e(window),
          o = e(document.documentElement),
          a = document.location,
          s = "hashchange",
          u,
          d = r.load || E,
          g = !1;
        try {
          g =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        g
          ? d()
          : a.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(a.search) ||
              /\?edit$/.test(a.href)) &&
            d()
          : i.on(s, v).triggerHandler(s);
        function v() {
          u || (/\?edit/.test(a.hash) && d());
        }
        function E() {
          (u = !0),
            (window.WebflowEditor = !0),
            i.off(s, v),
            N(function (M) {
              e.ajax({
                url: S("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: m(M),
              });
            });
        }
        function m(M) {
          return function (F) {
            if (!F) {
              console.error("Could not load editor data");
              return;
            }
            (F.thirdPartyCookiesSupported = M),
              T(k(F.bugReporterScriptPath), function () {
                T(k(F.scriptPath), function () {
                  window.WebflowEditor(F);
                });
              });
          };
        }
        function T(M, F) {
          e.ajax({ type: "GET", url: M, dataType: "script", cache: !0 }).then(
            F,
            w
          );
        }
        function w(M, F, q) {
          throw (console.error("Could not load editor script: " + F), q);
        }
        function k(M) {
          return M.indexOf("//") >= 0
            ? M
            : S("https://editor-api.webflow.com" + M);
        }
        function S(M) {
          return M.replace(/([^:])\/\//g, "$1/");
        }
        function N(M) {
          var F = window.document.createElement("iframe");
          (F.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (F.style.display = "none"),
            (F.sandbox = "allow-scripts allow-same-origin");
          var q = function (z) {
            z.data === "WF_third_party_cookies_unsupported"
              ? (C(F, q), M(!1))
              : z.data === "WF_third_party_cookies_supported" &&
                (C(F, q), M(!0));
          };
          (F.onerror = function () {
            C(F, q), M(!1);
          }),
            window.addEventListener("message", q, !1),
            window.document.body.appendChild(F);
        }
        function C(M, F) {
          window.removeEventListener("message", F, !1), M.remove();
        }
        return n;
      })
    );
    function gb() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Qs = c((rW, $s) => {
    "use strict";
    var hb = Pe();
    hb.define(
      "focus-visible",
      ($s.exports = function () {
        function e(r) {
          var n = !0,
            i = !1,
            o = null,
            a = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function s(C) {
            return !!(
              C &&
              C !== document &&
              C.nodeName !== "HTML" &&
              C.nodeName !== "BODY" &&
              "classList" in C &&
              "contains" in C.classList
            );
          }
          function u(C) {
            var M = C.type,
              F = C.tagName;
            return !!(
              (F === "INPUT" && a[M] && !C.readOnly) ||
              (F === "TEXTAREA" && !C.readOnly) ||
              C.isContentEditable
            );
          }
          function d(C) {
            C.getAttribute("data-wf-focus-visible") ||
              C.setAttribute("data-wf-focus-visible", "true");
          }
          function g(C) {
            C.getAttribute("data-wf-focus-visible") &&
              C.removeAttribute("data-wf-focus-visible");
          }
          function v(C) {
            C.metaKey ||
              C.altKey ||
              C.ctrlKey ||
              (s(r.activeElement) && d(r.activeElement), (n = !0));
          }
          function E() {
            n = !1;
          }
          function m(C) {
            s(C.target) && (n || u(C.target)) && d(C.target);
          }
          function T(C) {
            s(C.target) &&
              C.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              g(C.target));
          }
          function w() {
            document.visibilityState === "hidden" && (i && (n = !0), k());
          }
          function k() {
            document.addEventListener("mousemove", N),
              document.addEventListener("mousedown", N),
              document.addEventListener("mouseup", N),
              document.addEventListener("pointermove", N),
              document.addEventListener("pointerdown", N),
              document.addEventListener("pointerup", N),
              document.addEventListener("touchmove", N),
              document.addEventListener("touchstart", N),
              document.addEventListener("touchend", N);
          }
          function S() {
            document.removeEventListener("mousemove", N),
              document.removeEventListener("mousedown", N),
              document.removeEventListener("mouseup", N),
              document.removeEventListener("pointermove", N),
              document.removeEventListener("pointerdown", N),
              document.removeEventListener("pointerup", N),
              document.removeEventListener("touchmove", N),
              document.removeEventListener("touchstart", N),
              document.removeEventListener("touchend", N);
          }
          function N(C) {
            (C.target.nodeName && C.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), S());
          }
          document.addEventListener("keydown", v, !0),
            document.addEventListener("mousedown", E, !0),
            document.addEventListener("pointerdown", E, !0),
            document.addEventListener("touchstart", E, !0),
            document.addEventListener("visibilitychange", w, !0),
            k(),
            r.addEventListener("focus", m, !0),
            r.addEventListener("blur", T, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var eu = c((nW, Js) => {
    "use strict";
    var Zs = Pe();
    Zs.define(
      "focus",
      (Js.exports = function () {
        var e = [],
          t = !1;
        function r(a) {
          t &&
            (a.preventDefault(),
            a.stopPropagation(),
            a.stopImmediatePropagation(),
            e.unshift(a));
        }
        function n(a) {
          var s = a.target,
            u = s.tagName;
          return (
            (/^a$/i.test(u) && s.href != null) ||
            (/^(button|textarea)$/i.test(u) && s.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(s.type) &&
              !s.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(s.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && s.controls === !0)
          );
        }
        function i(a) {
          n(a) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, a.target.focus(); e.length > 0; ) {
                var s = e.pop();
                s.target.dispatchEvent(new MouseEvent(s.type, s));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Zs.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: o };
      })
    );
  });
  var nu = c((iW, ru) => {
    "use strict";
    var Gi = window.jQuery,
      at = {},
      dn = [],
      tu = ".w-ix",
      pn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Gi(t).triggerHandler(at.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Gi(t).triggerHandler(at.types.OUTRO));
        },
      };
    at.triggers = {};
    at.types = { INTRO: "w-ix-intro" + tu, OUTRO: "w-ix-outro" + tu };
    at.init = function () {
      for (var e = dn.length, t = 0; t < e; t++) {
        var r = dn[t];
        r[0](0, r[1]);
      }
      (dn = []), Gi.extend(at.triggers, pn);
    };
    at.async = function () {
      for (var e in pn) {
        var t = pn[e];
        pn.hasOwnProperty(e) &&
          (at.triggers[e] = function (r, n) {
            dn.push([t, n]);
          });
      }
    };
    at.async();
    ru.exports = at;
  });
  var jt = c((oW, au) => {
    "use strict";
    var Ui = nu();
    function iu(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var yb = window.jQuery,
      vn = {},
      ou = ".w-ix",
      mb = {
        reset: function (e, t) {
          Ui.triggers.reset(e, t);
        },
        intro: function (e, t) {
          Ui.triggers.intro(e, t), iu(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          Ui.triggers.outro(e, t), iu(t, "COMPONENT_INACTIVE");
        },
      };
    vn.triggers = {};
    vn.types = { INTRO: "w-ix-intro" + ou, OUTRO: "w-ix-outro" + ou };
    yb.extend(vn.triggers, mb);
    au.exports = vn;
  });
  var su = c((aW, vt) => {
    function Vi(e) {
      return (
        (vt.exports = Vi =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (vt.exports.__esModule = !0),
        (vt.exports.default = vt.exports),
        Vi(e)
      );
    }
    (vt.exports = Vi),
      (vt.exports.__esModule = !0),
      (vt.exports.default = vt.exports);
  });
  var gn = c((sW, wr) => {
    var Eb = su().default;
    function uu(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (uu = function (i) {
        return i ? r : t;
      })(e);
    }
    function _b(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (Eb(e) !== "object" && typeof e != "function"))
        return { default: e };
      var r = uu(t);
      if (r && r.has(e)) return r.get(e);
      var n = {},
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var a = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          a && (a.get || a.set)
            ? Object.defineProperty(n, o, a)
            : (n[o] = e[o]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (wr.exports = _b),
      (wr.exports.__esModule = !0),
      (wr.exports.default = wr.exports);
  });
  var cu = c((uW, Or) => {
    function bb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Or.exports = bb),
      (Or.exports.__esModule = !0),
      (Or.exports.default = Or.exports);
  });
  var Ee = c((cW, lu) => {
    var hn = function (e) {
      return e && e.Math == Math && e;
    };
    lu.exports =
      hn(typeof globalThis == "object" && globalThis) ||
      hn(typeof window == "object" && window) ||
      hn(typeof self == "object" && self) ||
      hn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var zt = c((lW, fu) => {
    fu.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var Pt = c((fW, du) => {
    var Tb = zt();
    du.exports = !Tb(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var yn = c((dW, pu) => {
    var xr = Function.prototype.call;
    pu.exports = xr.bind
      ? xr.bind(xr)
      : function () {
          return xr.apply(xr, arguments);
        };
  });
  var yu = c((hu) => {
    "use strict";
    var vu = {}.propertyIsEnumerable,
      gu = Object.getOwnPropertyDescriptor,
      Ib = gu && !vu.call({ 1: 2 }, 1);
    hu.f = Ib
      ? function (t) {
          var r = gu(this, t);
          return !!r && r.enumerable;
        }
      : vu;
  });
  var Wi = c((vW, mu) => {
    mu.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var $e = c((gW, _u) => {
    var Eu = Function.prototype,
      Hi = Eu.bind,
      Xi = Eu.call,
      wb = Hi && Hi.bind(Xi);
    _u.exports = Hi
      ? function (e) {
          return e && wb(Xi, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return Xi.apply(e, arguments);
            }
          );
        };
  });
  var Iu = c((hW, Tu) => {
    var bu = $e(),
      Ob = bu({}.toString),
      xb = bu("".slice);
    Tu.exports = function (e) {
      return xb(Ob(e), 8, -1);
    };
  });
  var Ou = c((yW, wu) => {
    var Ab = Ee(),
      Sb = $e(),
      Rb = zt(),
      Cb = Iu(),
      Bi = Ab.Object,
      Lb = Sb("".split);
    wu.exports = Rb(function () {
      return !Bi("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return Cb(e) == "String" ? Lb(e, "") : Bi(e);
        }
      : Bi;
  });
  var ji = c((mW, xu) => {
    var Nb = Ee(),
      Pb = Nb.TypeError;
    xu.exports = function (e) {
      if (e == null) throw Pb("Can't call method on " + e);
      return e;
    };
  });
  var Ar = c((EW, Au) => {
    var Mb = Ou(),
      qb = ji();
    Au.exports = function (e) {
      return Mb(qb(e));
    };
  });
  var st = c((_W, Su) => {
    Su.exports = function (e) {
      return typeof e == "function";
    };
  });
  var Kt = c((bW, Ru) => {
    var Db = st();
    Ru.exports = function (e) {
      return typeof e == "object" ? e !== null : Db(e);
    };
  });
  var Sr = c((TW, Cu) => {
    var zi = Ee(),
      Fb = st(),
      kb = function (e) {
        return Fb(e) ? e : void 0;
      };
    Cu.exports = function (e, t) {
      return arguments.length < 2 ? kb(zi[e]) : zi[e] && zi[e][t];
    };
  });
  var Nu = c((IW, Lu) => {
    var Gb = $e();
    Lu.exports = Gb({}.isPrototypeOf);
  });
  var Mu = c((wW, Pu) => {
    var Ub = Sr();
    Pu.exports = Ub("navigator", "userAgent") || "";
  });
  var Vu = c((OW, Uu) => {
    var Gu = Ee(),
      Ki = Mu(),
      qu = Gu.process,
      Du = Gu.Deno,
      Fu = (qu && qu.versions) || (Du && Du.version),
      ku = Fu && Fu.v8,
      Qe,
      mn;
    ku &&
      ((Qe = ku.split(".")),
      (mn = Qe[0] > 0 && Qe[0] < 4 ? 1 : +(Qe[0] + Qe[1])));
    !mn &&
      Ki &&
      ((Qe = Ki.match(/Edge\/(\d+)/)),
      (!Qe || Qe[1] >= 74) &&
        ((Qe = Ki.match(/Chrome\/(\d+)/)), Qe && (mn = +Qe[1])));
    Uu.exports = mn;
  });
  var Yi = c((xW, Hu) => {
    var Wu = Vu(),
      Vb = zt();
    Hu.exports =
      !!Object.getOwnPropertySymbols &&
      !Vb(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Wu && Wu < 41)
        );
      });
  });
  var $i = c((AW, Xu) => {
    var Wb = Yi();
    Xu.exports = Wb && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var Qi = c((SW, Bu) => {
    var Hb = Ee(),
      Xb = Sr(),
      Bb = st(),
      jb = Nu(),
      zb = $i(),
      Kb = Hb.Object;
    Bu.exports = zb
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = Xb("Symbol");
          return Bb(t) && jb(t.prototype, Kb(e));
        };
  });
  var zu = c((RW, ju) => {
    var Yb = Ee(),
      $b = Yb.String;
    ju.exports = function (e) {
      try {
        return $b(e);
      } catch {
        return "Object";
      }
    };
  });
  var Yu = c((CW, Ku) => {
    var Qb = Ee(),
      Zb = st(),
      Jb = zu(),
      eT = Qb.TypeError;
    Ku.exports = function (e) {
      if (Zb(e)) return e;
      throw eT(Jb(e) + " is not a function");
    };
  });
  var Qu = c((LW, $u) => {
    var tT = Yu();
    $u.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : tT(r);
    };
  });
  var Ju = c((NW, Zu) => {
    var rT = Ee(),
      Zi = yn(),
      Ji = st(),
      eo = Kt(),
      nT = rT.TypeError;
    Zu.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && Ji((r = e.toString)) && !eo((n = Zi(r, e)))) ||
        (Ji((r = e.valueOf)) && !eo((n = Zi(r, e)))) ||
        (t !== "string" && Ji((r = e.toString)) && !eo((n = Zi(r, e))))
      )
        return n;
      throw nT("Can't convert object to primitive value");
    };
  });
  var tc = c((PW, ec) => {
    ec.exports = !1;
  });
  var En = c((MW, nc) => {
    var rc = Ee(),
      iT = Object.defineProperty;
    nc.exports = function (e, t) {
      try {
        iT(rc, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        rc[e] = t;
      }
      return t;
    };
  });
  var _n = c((qW, oc) => {
    var oT = Ee(),
      aT = En(),
      ic = "__core-js_shared__",
      sT = oT[ic] || aT(ic, {});
    oc.exports = sT;
  });
  var to = c((DW, sc) => {
    var uT = tc(),
      ac = _n();
    (sc.exports = function (e, t) {
      return ac[e] || (ac[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: uT ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var cc = c((FW, uc) => {
    var cT = Ee(),
      lT = ji(),
      fT = cT.Object;
    uc.exports = function (e) {
      return fT(lT(e));
    };
  });
  var Tt = c((kW, lc) => {
    var dT = $e(),
      pT = cc(),
      vT = dT({}.hasOwnProperty);
    lc.exports =
      Object.hasOwn ||
      function (t, r) {
        return vT(pT(t), r);
      };
  });
  var ro = c((GW, fc) => {
    var gT = $e(),
      hT = 0,
      yT = Math.random(),
      mT = gT((1).toString);
    fc.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + mT(++hT + yT, 36);
    };
  });
  var no = c((UW, hc) => {
    var ET = Ee(),
      _T = to(),
      dc = Tt(),
      bT = ro(),
      pc = Yi(),
      gc = $i(),
      Yt = _T("wks"),
      Mt = ET.Symbol,
      vc = Mt && Mt.for,
      TT = gc ? Mt : (Mt && Mt.withoutSetter) || bT;
    hc.exports = function (e) {
      if (!dc(Yt, e) || !(pc || typeof Yt[e] == "string")) {
        var t = "Symbol." + e;
        pc && dc(Mt, e)
          ? (Yt[e] = Mt[e])
          : gc && vc
          ? (Yt[e] = vc(t))
          : (Yt[e] = TT(t));
      }
      return Yt[e];
    };
  });
  var _c = c((VW, Ec) => {
    var IT = Ee(),
      wT = yn(),
      yc = Kt(),
      mc = Qi(),
      OT = Qu(),
      xT = Ju(),
      AT = no(),
      ST = IT.TypeError,
      RT = AT("toPrimitive");
    Ec.exports = function (e, t) {
      if (!yc(e) || mc(e)) return e;
      var r = OT(e, RT),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = wT(r, e, t)), !yc(n) || mc(n))
        )
          return n;
        throw ST("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), xT(e, t);
    };
  });
  var io = c((WW, bc) => {
    var CT = _c(),
      LT = Qi();
    bc.exports = function (e) {
      var t = CT(e, "string");
      return LT(t) ? t : t + "";
    };
  });
  var ao = c((HW, Ic) => {
    var NT = Ee(),
      Tc = Kt(),
      oo = NT.document,
      PT = Tc(oo) && Tc(oo.createElement);
    Ic.exports = function (e) {
      return PT ? oo.createElement(e) : {};
    };
  });
  var so = c((XW, wc) => {
    var MT = Pt(),
      qT = zt(),
      DT = ao();
    wc.exports =
      !MT &&
      !qT(function () {
        return (
          Object.defineProperty(DT("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var uo = c((xc) => {
    var FT = Pt(),
      kT = yn(),
      GT = yu(),
      UT = Wi(),
      VT = Ar(),
      WT = io(),
      HT = Tt(),
      XT = so(),
      Oc = Object.getOwnPropertyDescriptor;
    xc.f = FT
      ? Oc
      : function (t, r) {
          if (((t = VT(t)), (r = WT(r)), XT))
            try {
              return Oc(t, r);
            } catch {}
          if (HT(t, r)) return UT(!kT(GT.f, t, r), t[r]);
        };
  });
  var Rr = c((jW, Sc) => {
    var Ac = Ee(),
      BT = Kt(),
      jT = Ac.String,
      zT = Ac.TypeError;
    Sc.exports = function (e) {
      if (BT(e)) return e;
      throw zT(jT(e) + " is not an object");
    };
  });
  var Cr = c((Lc) => {
    var KT = Ee(),
      YT = Pt(),
      $T = so(),
      Rc = Rr(),
      QT = io(),
      ZT = KT.TypeError,
      Cc = Object.defineProperty;
    Lc.f = YT
      ? Cc
      : function (t, r, n) {
          if ((Rc(t), (r = QT(r)), Rc(n), $T))
            try {
              return Cc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw ZT("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var bn = c((KW, Nc) => {
    var JT = Pt(),
      eI = Cr(),
      tI = Wi();
    Nc.exports = JT
      ? function (e, t, r) {
          return eI.f(e, t, tI(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var lo = c((YW, Pc) => {
    var rI = $e(),
      nI = st(),
      co = _n(),
      iI = rI(Function.toString);
    nI(co.inspectSource) ||
      (co.inspectSource = function (e) {
        return iI(e);
      });
    Pc.exports = co.inspectSource;
  });
  var Dc = c(($W, qc) => {
    var oI = Ee(),
      aI = st(),
      sI = lo(),
      Mc = oI.WeakMap;
    qc.exports = aI(Mc) && /native code/.test(sI(Mc));
  });
  var fo = c((QW, kc) => {
    var uI = to(),
      cI = ro(),
      Fc = uI("keys");
    kc.exports = function (e) {
      return Fc[e] || (Fc[e] = cI(e));
    };
  });
  var Tn = c((ZW, Gc) => {
    Gc.exports = {};
  });
  var Bc = c((JW, Xc) => {
    var lI = Dc(),
      Hc = Ee(),
      po = $e(),
      fI = Kt(),
      dI = bn(),
      vo = Tt(),
      go = _n(),
      pI = fo(),
      vI = Tn(),
      Uc = "Object already initialized",
      yo = Hc.TypeError,
      gI = Hc.WeakMap,
      In,
      Lr,
      wn,
      hI = function (e) {
        return wn(e) ? Lr(e) : In(e, {});
      },
      yI = function (e) {
        return function (t) {
          var r;
          if (!fI(t) || (r = Lr(t)).type !== e)
            throw yo("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    lI || go.state
      ? ((It = go.state || (go.state = new gI())),
        (Vc = po(It.get)),
        (ho = po(It.has)),
        (Wc = po(It.set)),
        (In = function (e, t) {
          if (ho(It, e)) throw new yo(Uc);
          return (t.facade = e), Wc(It, e, t), t;
        }),
        (Lr = function (e) {
          return Vc(It, e) || {};
        }),
        (wn = function (e) {
          return ho(It, e);
        }))
      : ((qt = pI("state")),
        (vI[qt] = !0),
        (In = function (e, t) {
          if (vo(e, qt)) throw new yo(Uc);
          return (t.facade = e), dI(e, qt, t), t;
        }),
        (Lr = function (e) {
          return vo(e, qt) ? e[qt] : {};
        }),
        (wn = function (e) {
          return vo(e, qt);
        }));
    var It, Vc, ho, Wc, qt;
    Xc.exports = { set: In, get: Lr, has: wn, enforce: hI, getterFor: yI };
  });
  var Kc = c((eH, zc) => {
    var mo = Pt(),
      mI = Tt(),
      jc = Function.prototype,
      EI = mo && Object.getOwnPropertyDescriptor,
      Eo = mI(jc, "name"),
      _I = Eo && function () {}.name === "something",
      bI = Eo && (!mo || (mo && EI(jc, "name").configurable));
    zc.exports = { EXISTS: Eo, PROPER: _I, CONFIGURABLE: bI };
  });
  var Jc = c((tH, Zc) => {
    var TI = Ee(),
      Yc = st(),
      II = Tt(),
      $c = bn(),
      wI = En(),
      OI = lo(),
      Qc = Bc(),
      xI = Kc().CONFIGURABLE,
      AI = Qc.get,
      SI = Qc.enforce,
      RI = String(String).split("String");
    (Zc.exports = function (e, t, r, n) {
      var i = n ? !!n.unsafe : !1,
        o = n ? !!n.enumerable : !1,
        a = n ? !!n.noTargetGet : !1,
        s = n && n.name !== void 0 ? n.name : t,
        u;
      if (
        (Yc(r) &&
          (String(s).slice(0, 7) === "Symbol(" &&
            (s = "[" + String(s).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!II(r, "name") || (xI && r.name !== s)) && $c(r, "name", s),
          (u = SI(r)),
          u.source || (u.source = RI.join(typeof s == "string" ? s : ""))),
        e === TI)
      ) {
        o ? (e[t] = r) : wI(t, r);
        return;
      } else i ? !a && e[t] && (o = !0) : delete e[t];
      o ? (e[t] = r) : $c(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Yc(this) && AI(this).source) || OI(this);
    });
  });
  var _o = c((rH, el) => {
    var CI = Math.ceil,
      LI = Math.floor;
    el.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? LI : CI)(t);
    };
  });
  var rl = c((nH, tl) => {
    var NI = _o(),
      PI = Math.max,
      MI = Math.min;
    tl.exports = function (e, t) {
      var r = NI(e);
      return r < 0 ? PI(r + t, 0) : MI(r, t);
    };
  });
  var il = c((iH, nl) => {
    var qI = _o(),
      DI = Math.min;
    nl.exports = function (e) {
      return e > 0 ? DI(qI(e), 9007199254740991) : 0;
    };
  });
  var al = c((oH, ol) => {
    var FI = il();
    ol.exports = function (e) {
      return FI(e.length);
    };
  });
  var bo = c((aH, ul) => {
    var kI = Ar(),
      GI = rl(),
      UI = al(),
      sl = function (e) {
        return function (t, r, n) {
          var i = kI(t),
            o = UI(i),
            a = GI(n, o),
            s;
          if (e && r != r) {
            for (; o > a; ) if (((s = i[a++]), s != s)) return !0;
          } else
            for (; o > a; a++)
              if ((e || a in i) && i[a] === r) return e || a || 0;
          return !e && -1;
        };
      };
    ul.exports = { includes: sl(!0), indexOf: sl(!1) };
  });
  var Io = c((sH, ll) => {
    var VI = $e(),
      To = Tt(),
      WI = Ar(),
      HI = bo().indexOf,
      XI = Tn(),
      cl = VI([].push);
    ll.exports = function (e, t) {
      var r = WI(e),
        n = 0,
        i = [],
        o;
      for (o in r) !To(XI, o) && To(r, o) && cl(i, o);
      for (; t.length > n; ) To(r, (o = t[n++])) && (~HI(i, o) || cl(i, o));
      return i;
    };
  });
  var On = c((uH, fl) => {
    fl.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var pl = c((dl) => {
    var BI = Io(),
      jI = On(),
      zI = jI.concat("length", "prototype");
    dl.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return BI(t, zI);
      };
  });
  var gl = c((vl) => {
    vl.f = Object.getOwnPropertySymbols;
  });
  var yl = c((fH, hl) => {
    var KI = Sr(),
      YI = $e(),
      $I = pl(),
      QI = gl(),
      ZI = Rr(),
      JI = YI([].concat);
    hl.exports =
      KI("Reflect", "ownKeys") ||
      function (t) {
        var r = $I.f(ZI(t)),
          n = QI.f;
        return n ? JI(r, n(t)) : r;
      };
  });
  var El = c((dH, ml) => {
    var ew = Tt(),
      tw = yl(),
      rw = uo(),
      nw = Cr();
    ml.exports = function (e, t) {
      for (var r = tw(t), n = nw.f, i = rw.f, o = 0; o < r.length; o++) {
        var a = r[o];
        ew(e, a) || n(e, a, i(t, a));
      }
    };
  });
  var bl = c((pH, _l) => {
    var iw = zt(),
      ow = st(),
      aw = /#|\.prototype\./,
      Nr = function (e, t) {
        var r = uw[sw(e)];
        return r == lw ? !0 : r == cw ? !1 : ow(t) ? iw(t) : !!t;
      },
      sw = (Nr.normalize = function (e) {
        return String(e).replace(aw, ".").toLowerCase();
      }),
      uw = (Nr.data = {}),
      cw = (Nr.NATIVE = "N"),
      lw = (Nr.POLYFILL = "P");
    _l.exports = Nr;
  });
  var Il = c((vH, Tl) => {
    var wo = Ee(),
      fw = uo().f,
      dw = bn(),
      pw = Jc(),
      vw = En(),
      gw = El(),
      hw = bl();
    Tl.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        i = e.stat,
        o,
        a,
        s,
        u,
        d,
        g;
      if (
        (n
          ? (a = wo)
          : i
          ? (a = wo[r] || vw(r, {}))
          : (a = (wo[r] || {}).prototype),
        a)
      )
        for (s in t) {
          if (
            ((d = t[s]),
            e.noTargetGet ? ((g = fw(a, s)), (u = g && g.value)) : (u = a[s]),
            (o = hw(n ? s : r + (i ? "." : "#") + s, e.forced)),
            !o && u !== void 0)
          ) {
            if (typeof d == typeof u) continue;
            gw(d, u);
          }
          (e.sham || (u && u.sham)) && dw(d, "sham", !0), pw(a, s, d, e);
        }
    };
  });
  var Ol = c((gH, wl) => {
    var yw = Io(),
      mw = On();
    wl.exports =
      Object.keys ||
      function (t) {
        return yw(t, mw);
      };
  });
  var Al = c((hH, xl) => {
    var Ew = Pt(),
      _w = Cr(),
      bw = Rr(),
      Tw = Ar(),
      Iw = Ol();
    xl.exports = Ew
      ? Object.defineProperties
      : function (t, r) {
          bw(t);
          for (var n = Tw(r), i = Iw(r), o = i.length, a = 0, s; o > a; )
            _w.f(t, (s = i[a++]), n[s]);
          return t;
        };
  });
  var Rl = c((yH, Sl) => {
    var ww = Sr();
    Sl.exports = ww("document", "documentElement");
  });
  var Fl = c((mH, Dl) => {
    var Ow = Rr(),
      xw = Al(),
      Cl = On(),
      Aw = Tn(),
      Sw = Rl(),
      Rw = ao(),
      Cw = fo(),
      Ll = ">",
      Nl = "<",
      xo = "prototype",
      Ao = "script",
      Ml = Cw("IE_PROTO"),
      Oo = function () {},
      ql = function (e) {
        return Nl + Ao + Ll + e + Nl + "/" + Ao + Ll;
      },
      Pl = function (e) {
        e.write(ql("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      Lw = function () {
        var e = Rw("iframe"),
          t = "java" + Ao + ":",
          r;
        return (
          (e.style.display = "none"),
          Sw.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(ql("document.F=Object")),
          r.close(),
          r.F
        );
      },
      xn,
      An = function () {
        try {
          xn = new ActiveXObject("htmlfile");
        } catch {}
        An =
          typeof document < "u"
            ? document.domain && xn
              ? Pl(xn)
              : Lw()
            : Pl(xn);
        for (var e = Cl.length; e--; ) delete An[xo][Cl[e]];
        return An();
      };
    Aw[Ml] = !0;
    Dl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((Oo[xo] = Ow(t)), (n = new Oo()), (Oo[xo] = null), (n[Ml] = t))
            : (n = An()),
          r === void 0 ? n : xw(n, r)
        );
      };
  });
  var Gl = c((EH, kl) => {
    var Nw = no(),
      Pw = Fl(),
      Mw = Cr(),
      So = Nw("unscopables"),
      Ro = Array.prototype;
    Ro[So] == null && Mw.f(Ro, So, { configurable: !0, value: Pw(null) });
    kl.exports = function (e) {
      Ro[So][e] = !0;
    };
  });
  var Ul = c(() => {
    "use strict";
    var qw = Il(),
      Dw = bo().includes,
      Fw = Gl();
    qw(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return Dw(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    Fw("includes");
  });
  var Wl = c((TH, Vl) => {
    var kw = Ee(),
      Gw = $e();
    Vl.exports = function (e, t) {
      return Gw(kw[e].prototype[t]);
    };
  });
  var Xl = c((IH, Hl) => {
    Ul();
    var Uw = Wl();
    Hl.exports = Uw("Array", "includes");
  });
  var jl = c((wH, Bl) => {
    var Vw = Xl();
    Bl.exports = Vw;
  });
  var Kl = c((OH, zl) => {
    var Ww = jl();
    zl.exports = Ww;
  });
  var Co = c((xH, Yl) => {
    var Hw =
      typeof global == "object" && global && global.Object === Object && global;
    Yl.exports = Hw;
  });
  var Ze = c((AH, $l) => {
    var Xw = Co(),
      Bw = typeof self == "object" && self && self.Object === Object && self,
      jw = Xw || Bw || Function("return this")();
    $l.exports = jw;
  });
  var $t = c((SH, Ql) => {
    var zw = Ze(),
      Kw = zw.Symbol;
    Ql.exports = Kw;
  });
  var tf = c((RH, ef) => {
    var Zl = $t(),
      Jl = Object.prototype,
      Yw = Jl.hasOwnProperty,
      $w = Jl.toString,
      Pr = Zl ? Zl.toStringTag : void 0;
    function Qw(e) {
      var t = Yw.call(e, Pr),
        r = e[Pr];
      try {
        e[Pr] = void 0;
        var n = !0;
      } catch {}
      var i = $w.call(e);
      return n && (t ? (e[Pr] = r) : delete e[Pr]), i;
    }
    ef.exports = Qw;
  });
  var nf = c((CH, rf) => {
    var Zw = Object.prototype,
      Jw = Zw.toString;
    function eO(e) {
      return Jw.call(e);
    }
    rf.exports = eO;
  });
  var wt = c((LH, sf) => {
    var of = $t(),
      tO = tf(),
      rO = nf(),
      nO = "[object Null]",
      iO = "[object Undefined]",
      af = of ? of.toStringTag : void 0;
    function oO(e) {
      return e == null
        ? e === void 0
          ? iO
          : nO
        : af && af in Object(e)
        ? tO(e)
        : rO(e);
    }
    sf.exports = oO;
  });
  var Lo = c((NH, uf) => {
    function aO(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    uf.exports = aO;
  });
  var No = c((PH, cf) => {
    var sO = Lo(),
      uO = sO(Object.getPrototypeOf, Object);
    cf.exports = uO;
  });
  var gt = c((MH, lf) => {
    function cO(e) {
      return e != null && typeof e == "object";
    }
    lf.exports = cO;
  });
  var Po = c((qH, df) => {
    var lO = wt(),
      fO = No(),
      dO = gt(),
      pO = "[object Object]",
      vO = Function.prototype,
      gO = Object.prototype,
      ff = vO.toString,
      hO = gO.hasOwnProperty,
      yO = ff.call(Object);
    function mO(e) {
      if (!dO(e) || lO(e) != pO) return !1;
      var t = fO(e);
      if (t === null) return !0;
      var r = hO.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && ff.call(r) == yO;
    }
    df.exports = mO;
  });
  var pf = c((Mo) => {
    "use strict";
    Object.defineProperty(Mo, "__esModule", { value: !0 });
    Mo.default = EO;
    function EO(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var vf = c((Do, qo) => {
    "use strict";
    Object.defineProperty(Do, "__esModule", { value: !0 });
    var _O = pf(),
      bO = TO(_O);
    function TO(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Qt;
    typeof self < "u"
      ? (Qt = self)
      : typeof window < "u"
      ? (Qt = window)
      : typeof global < "u"
      ? (Qt = global)
      : typeof qo < "u"
      ? (Qt = qo)
      : (Qt = Function("return this")());
    var IO = (0, bO.default)(Qt);
    Do.default = IO;
  });
  var Fo = c((Mr) => {
    "use strict";
    Mr.__esModule = !0;
    Mr.ActionTypes = void 0;
    Mr.default = mf;
    var wO = Po(),
      OO = yf(wO),
      xO = vf(),
      gf = yf(xO);
    function yf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var hf = (Mr.ActionTypes = { INIT: "@@redux/INIT" });
    function mf(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(mf)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        a = [],
        s = a,
        u = !1;
      function d() {
        s === a && (s = a.slice());
      }
      function g() {
        return o;
      }
      function v(w) {
        if (typeof w != "function")
          throw new Error("Expected listener to be a function.");
        var k = !0;
        return (
          d(),
          s.push(w),
          function () {
            if (k) {
              (k = !1), d();
              var N = s.indexOf(w);
              s.splice(N, 1);
            }
          }
        );
      }
      function E(w) {
        if (!(0, OO.default)(w))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof w.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (o = i(o, w));
        } finally {
          u = !1;
        }
        for (var k = (a = s), S = 0; S < k.length; S++) k[S]();
        return w;
      }
      function m(w) {
        if (typeof w != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = w), E({ type: hf.INIT });
      }
      function T() {
        var w,
          k = v;
        return (
          (w = {
            subscribe: function (N) {
              if (typeof N != "object")
                throw new TypeError("Expected the observer to be an object.");
              function C() {
                N.next && N.next(g());
              }
              C();
              var M = k(C);
              return { unsubscribe: M };
            },
          }),
          (w[gf.default] = function () {
            return this;
          }),
          w
        );
      }
      return (
        E({ type: hf.INIT }),
        (n = { dispatch: E, subscribe: v, getState: g, replaceReducer: m }),
        (n[gf.default] = T),
        n
      );
    }
  });
  var Go = c((ko) => {
    "use strict";
    ko.__esModule = !0;
    ko.default = AO;
    function AO(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var bf = c((Uo) => {
    "use strict";
    Uo.__esModule = !0;
    Uo.default = NO;
    var Ef = Fo(),
      SO = Po(),
      GH = _f(SO),
      RO = Go(),
      UH = _f(RO);
    function _f(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function CO(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function LO(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: Ef.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                Ef.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function NO(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        typeof e[i] == "function" && (r[i] = e[i]);
      }
      var o = Object.keys(r);
      if (!1) var a;
      var s;
      try {
        LO(r);
      } catch (u) {
        s = u;
      }
      return function () {
        var d =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          g = arguments[1];
        if (s) throw s;
        if (!1) var v;
        for (var E = !1, m = {}, T = 0; T < o.length; T++) {
          var w = o[T],
            k = r[w],
            S = d[w],
            N = k(S, g);
          if (typeof N > "u") {
            var C = CO(w, g);
            throw new Error(C);
          }
          (m[w] = N), (E = E || N !== S);
        }
        return E ? m : d;
      };
    }
  });
  var If = c((Vo) => {
    "use strict";
    Vo.__esModule = !0;
    Vo.default = PO;
    function Tf(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function PO(e, t) {
      if (typeof e == "function") return Tf(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
        var o = r[i],
          a = e[o];
        typeof a == "function" && (n[o] = Tf(a, t));
      }
      return n;
    }
  });
  var Ho = c((Wo) => {
    "use strict";
    Wo.__esModule = !0;
    Wo.default = MO;
    function MO() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, a) {
          return a(o);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var wf = c((Xo) => {
    "use strict";
    Xo.__esModule = !0;
    var qO =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Xo.default = GO;
    var DO = Ho(),
      FO = kO(DO);
    function kO(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function GO() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (i, o, a) {
          var s = n(i, o, a),
            u = s.dispatch,
            d = [],
            g = {
              getState: s.getState,
              dispatch: function (E) {
                return u(E);
              },
            };
          return (
            (d = t.map(function (v) {
              return v(g);
            })),
            (u = FO.default.apply(void 0, d)(s.dispatch)),
            qO({}, s, { dispatch: u })
          );
        };
      };
    }
  });
  var Bo = c((He) => {
    "use strict";
    He.__esModule = !0;
    He.compose =
      He.applyMiddleware =
      He.bindActionCreators =
      He.combineReducers =
      He.createStore =
        void 0;
    var UO = Fo(),
      VO = Zt(UO),
      WO = bf(),
      HO = Zt(WO),
      XO = If(),
      BO = Zt(XO),
      jO = wf(),
      zO = Zt(jO),
      KO = Ho(),
      YO = Zt(KO),
      $O = Go(),
      BH = Zt($O);
    function Zt(e) {
      return e && e.__esModule ? e : { default: e };
    }
    He.createStore = VO.default;
    He.combineReducers = HO.default;
    He.bindActionCreators = BO.default;
    He.applyMiddleware = zO.default;
    He.compose = YO.default;
  });
  var Je,
    jo,
    ut,
    QO,
    ZO,
    zo,
    JO,
    Of = me(() => {
      "use strict";
      (Je = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (jo = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (ut = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (QO = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (ZO = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (zo = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (JO = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var Xe,
    ex,
    Ko = me(() => {
      "use strict";
      (Xe = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (ex = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var tx,
    xf = me(() => {
      "use strict";
      tx = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var rx,
    nx,
    ix,
    ox,
    ax,
    sx,
    ux,
    Yo,
    Af = me(() => {
      "use strict";
      Ko();
      ({
        TRANSFORM_MOVE: rx,
        TRANSFORM_SCALE: nx,
        TRANSFORM_ROTATE: ix,
        TRANSFORM_SKEW: ox,
        STYLE_SIZE: ax,
        STYLE_FILTER: sx,
        STYLE_FONT_VARIATION: ux,
      } = Xe),
        (Yo = {
          [rx]: !0,
          [nx]: !0,
          [ix]: !0,
          [ox]: !0,
          [ax]: !0,
          [sx]: !0,
          [ux]: !0,
        });
    });
  var we = {};
  Ge(we, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => Ox,
    IX2_ANIMATION_FRAME_CHANGED: () => Ex,
    IX2_CLEAR_REQUESTED: () => hx,
    IX2_ELEMENT_STATE_CHANGED: () => wx,
    IX2_EVENT_LISTENER_ADDED: () => yx,
    IX2_EVENT_STATE_CHANGED: () => mx,
    IX2_INSTANCE_ADDED: () => bx,
    IX2_INSTANCE_REMOVED: () => Ix,
    IX2_INSTANCE_STARTED: () => Tx,
    IX2_MEDIA_QUERIES_DEFINED: () => Ax,
    IX2_PARAMETER_CHANGED: () => _x,
    IX2_PLAYBACK_REQUESTED: () => vx,
    IX2_PREVIEW_REQUESTED: () => px,
    IX2_RAW_DATA_IMPORTED: () => cx,
    IX2_SESSION_INITIALIZED: () => lx,
    IX2_SESSION_STARTED: () => fx,
    IX2_SESSION_STOPPED: () => dx,
    IX2_STOP_REQUESTED: () => gx,
    IX2_TEST_FRAME_RENDERED: () => Sx,
    IX2_VIEWPORT_WIDTH_CHANGED: () => xx,
  });
  var cx,
    lx,
    fx,
    dx,
    px,
    vx,
    gx,
    hx,
    yx,
    mx,
    Ex,
    _x,
    bx,
    Tx,
    Ix,
    wx,
    Ox,
    xx,
    Ax,
    Sx,
    Sf = me(() => {
      "use strict";
      (cx = "IX2_RAW_DATA_IMPORTED"),
        (lx = "IX2_SESSION_INITIALIZED"),
        (fx = "IX2_SESSION_STARTED"),
        (dx = "IX2_SESSION_STOPPED"),
        (px = "IX2_PREVIEW_REQUESTED"),
        (vx = "IX2_PLAYBACK_REQUESTED"),
        (gx = "IX2_STOP_REQUESTED"),
        (hx = "IX2_CLEAR_REQUESTED"),
        (yx = "IX2_EVENT_LISTENER_ADDED"),
        (mx = "IX2_EVENT_STATE_CHANGED"),
        (Ex = "IX2_ANIMATION_FRAME_CHANGED"),
        (_x = "IX2_PARAMETER_CHANGED"),
        (bx = "IX2_INSTANCE_ADDED"),
        (Tx = "IX2_INSTANCE_STARTED"),
        (Ix = "IX2_INSTANCE_REMOVED"),
        (wx = "IX2_ELEMENT_STATE_CHANGED"),
        (Ox = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (xx = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (Ax = "IX2_MEDIA_QUERIES_DEFINED"),
        (Sx = "IX2_TEST_FRAME_RENDERED");
    });
  var Ce = {};
  Ge(Ce, {
    ABSTRACT_NODE: () => xA,
    AUTO: () => gA,
    BACKGROUND: () => cA,
    BACKGROUND_COLOR: () => uA,
    BAR_DELIMITER: () => mA,
    BORDER_COLOR: () => lA,
    BOUNDARY_SELECTOR: () => Px,
    CHILDREN: () => EA,
    COLON_DELIMITER: () => yA,
    COLOR: () => fA,
    COMMA_DELIMITER: () => hA,
    CONFIG_UNIT: () => Vx,
    CONFIG_VALUE: () => Fx,
    CONFIG_X_UNIT: () => kx,
    CONFIG_X_VALUE: () => Mx,
    CONFIG_Y_UNIT: () => Gx,
    CONFIG_Y_VALUE: () => qx,
    CONFIG_Z_UNIT: () => Ux,
    CONFIG_Z_VALUE: () => Dx,
    DISPLAY: () => dA,
    FILTER: () => iA,
    FLEX: () => pA,
    FONT_VARIATION_SETTINGS: () => oA,
    HEIGHT: () => sA,
    HTML_ELEMENT: () => wA,
    IMMEDIATE_CHILDREN: () => _A,
    IX2_ID_DELIMITER: () => Rx,
    OPACITY: () => nA,
    PARENT: () => TA,
    PLAIN_OBJECT: () => OA,
    PRESERVE_3D: () => IA,
    RENDER_GENERAL: () => SA,
    RENDER_PLUGIN: () => CA,
    RENDER_STYLE: () => RA,
    RENDER_TRANSFORM: () => AA,
    ROTATE_X: () => Qx,
    ROTATE_Y: () => Zx,
    ROTATE_Z: () => Jx,
    SCALE_3D: () => $x,
    SCALE_X: () => zx,
    SCALE_Y: () => Kx,
    SCALE_Z: () => Yx,
    SIBLINGS: () => bA,
    SKEW: () => eA,
    SKEW_X: () => tA,
    SKEW_Y: () => rA,
    TRANSFORM: () => Wx,
    TRANSLATE_3D: () => jx,
    TRANSLATE_X: () => Hx,
    TRANSLATE_Y: () => Xx,
    TRANSLATE_Z: () => Bx,
    WF_PAGE: () => Cx,
    WIDTH: () => aA,
    WILL_CHANGE: () => vA,
    W_MOD_IX: () => Nx,
    W_MOD_JS: () => Lx,
  });
  var Rx,
    Cx,
    Lx,
    Nx,
    Px,
    Mx,
    qx,
    Dx,
    Fx,
    kx,
    Gx,
    Ux,
    Vx,
    Wx,
    Hx,
    Xx,
    Bx,
    jx,
    zx,
    Kx,
    Yx,
    $x,
    Qx,
    Zx,
    Jx,
    eA,
    tA,
    rA,
    nA,
    iA,
    oA,
    aA,
    sA,
    uA,
    cA,
    lA,
    fA,
    dA,
    pA,
    vA,
    gA,
    hA,
    yA,
    mA,
    EA,
    _A,
    bA,
    TA,
    IA,
    wA,
    OA,
    xA,
    AA,
    SA,
    RA,
    CA,
    Rf = me(() => {
      "use strict";
      (Rx = "|"),
        (Cx = "data-wf-page"),
        (Lx = "w-mod-js"),
        (Nx = "w-mod-ix"),
        (Px = ".w-dyn-item"),
        (Mx = "xValue"),
        (qx = "yValue"),
        (Dx = "zValue"),
        (Fx = "value"),
        (kx = "xUnit"),
        (Gx = "yUnit"),
        (Ux = "zUnit"),
        (Vx = "unit"),
        (Wx = "transform"),
        (Hx = "translateX"),
        (Xx = "translateY"),
        (Bx = "translateZ"),
        (jx = "translate3d"),
        (zx = "scaleX"),
        (Kx = "scaleY"),
        (Yx = "scaleZ"),
        ($x = "scale3d"),
        (Qx = "rotateX"),
        (Zx = "rotateY"),
        (Jx = "rotateZ"),
        (eA = "skew"),
        (tA = "skewX"),
        (rA = "skewY"),
        (nA = "opacity"),
        (iA = "filter"),
        (oA = "font-variation-settings"),
        (aA = "width"),
        (sA = "height"),
        (uA = "backgroundColor"),
        (cA = "background"),
        (lA = "borderColor"),
        (fA = "color"),
        (dA = "display"),
        (pA = "flex"),
        (vA = "willChange"),
        (gA = "AUTO"),
        (hA = ","),
        (yA = ":"),
        (mA = "|"),
        (EA = "CHILDREN"),
        (_A = "IMMEDIATE_CHILDREN"),
        (bA = "SIBLINGS"),
        (TA = "PARENT"),
        (IA = "preserve-3d"),
        (wA = "HTML_ELEMENT"),
        (OA = "PLAIN_OBJECT"),
        (xA = "ABSTRACT_NODE"),
        (AA = "RENDER_TRANSFORM"),
        (SA = "RENDER_GENERAL"),
        (RA = "RENDER_STYLE"),
        (CA = "RENDER_PLUGIN");
    });
  var Cf = {};
  Ge(Cf, {
    ActionAppliesTo: () => ex,
    ActionTypeConsts: () => Xe,
    EventAppliesTo: () => jo,
    EventBasedOn: () => ut,
    EventContinuousMouseAxes: () => QO,
    EventLimitAffectedElements: () => ZO,
    EventTypeConsts: () => Je,
    IX2EngineActionTypes: () => we,
    IX2EngineConstants: () => Ce,
    InteractionTypeConsts: () => tx,
    QuickEffectDirectionConsts: () => JO,
    QuickEffectIds: () => zo,
    ReducedMotionTypes: () => Yo,
  });
  var Ue = me(() => {
    "use strict";
    Of();
    Ko();
    xf();
    Af();
    Sf();
    Rf();
  });
  var LA,
    Lf,
    Nf = me(() => {
      "use strict";
      Ue();
      ({ IX2_RAW_DATA_IMPORTED: LA } = we),
        (Lf = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case LA:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var Jt = c((be) => {
    "use strict";
    Object.defineProperty(be, "__esModule", { value: !0 });
    var NA =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    be.clone = Rn;
    be.addLast = qf;
    be.addFirst = Df;
    be.removeLast = Ff;
    be.removeFirst = kf;
    be.insert = Gf;
    be.removeAt = Uf;
    be.replaceAt = Vf;
    be.getIn = Cn;
    be.set = Ln;
    be.setIn = Nn;
    be.update = Hf;
    be.updateIn = Xf;
    be.merge = Bf;
    be.mergeDeep = jf;
    be.mergeIn = zf;
    be.omit = Kf;
    be.addDefaults = Yf;
    var Pf = "INVALID_ARGS";
    function Mf(e) {
      throw new Error(e);
    }
    function $o(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var PA = {}.hasOwnProperty;
    function Rn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = $o(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        r[i] = e[i];
      }
      return r;
    }
    function Ve(e, t, r) {
      var n = r;
      n == null && Mf(Pf);
      for (
        var i = !1, o = arguments.length, a = Array(o > 3 ? o - 3 : 0), s = 3;
        s < o;
        s++
      )
        a[s - 3] = arguments[s];
      for (var u = 0; u < a.length; u++) {
        var d = a[u];
        if (d != null) {
          var g = $o(d);
          if (g.length)
            for (var v = 0; v <= g.length; v++) {
              var E = g[v];
              if (!(e && n[E] !== void 0)) {
                var m = d[E];
                t && Sn(n[E]) && Sn(m) && (m = Ve(e, t, n[E], m)),
                  !(m === void 0 || m === n[E]) &&
                    (i || ((i = !0), (n = Rn(n))), (n[E] = m));
              }
            }
        }
      }
      return n;
    }
    function Sn(e) {
      var t = typeof e > "u" ? "undefined" : NA(e);
      return e != null && (t === "object" || t === "function");
    }
    function qf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Df(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Ff(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function kf(e) {
      return e.length ? e.slice(1) : e;
    }
    function Gf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Uf(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Vf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
      return (i[t] = r), i;
    }
    function Cn(e, t) {
      if ((!Array.isArray(t) && Mf(Pf), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var i = t[n];
          if (((r = r?.[i]), r === void 0)) return r;
        }
        return r;
      }
    }
    function Ln(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        i = e ?? n;
      if (i[t] === r) return i;
      var o = Rn(i);
      return (o[t] = r), o;
    }
    function Wf(e, t, r, n) {
      var i = void 0,
        o = t[n];
      if (n === t.length - 1) i = r;
      else {
        var a =
          Sn(e) && Sn(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
        i = Wf(a, t, r, n + 1);
      }
      return Ln(e, o, i);
    }
    function Nn(e, t, r) {
      return t.length ? Wf(e, t, r, 0) : r;
    }
    function Hf(e, t, r) {
      var n = e?.[t],
        i = r(n);
      return Ln(e, t, i);
    }
    function Xf(e, t, r) {
      var n = Cn(e, t),
        i = r(n);
      return Nn(e, t, i);
    }
    function Bf(e, t, r, n, i, o) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
        u < a;
        u++
      )
        s[u - 6] = arguments[u];
      return s.length
        ? Ve.call.apply(Ve, [null, !1, !1, e, t, r, n, i, o].concat(s))
        : Ve(!1, !1, e, t, r, n, i, o);
    }
    function jf(e, t, r, n, i, o) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
        u < a;
        u++
      )
        s[u - 6] = arguments[u];
      return s.length
        ? Ve.call.apply(Ve, [null, !1, !0, e, t, r, n, i, o].concat(s))
        : Ve(!1, !0, e, t, r, n, i, o);
    }
    function zf(e, t, r, n, i, o, a) {
      var s = Cn(e, t);
      s == null && (s = {});
      for (
        var u = void 0,
          d = arguments.length,
          g = Array(d > 7 ? d - 7 : 0),
          v = 7;
        v < d;
        v++
      )
        g[v - 7] = arguments[v];
      return (
        g.length
          ? (u = Ve.call.apply(Ve, [null, !1, !1, s, r, n, i, o, a].concat(g)))
          : (u = Ve(!1, !1, s, r, n, i, o, a)),
        Nn(e, t, u)
      );
    }
    function Kf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
        if (PA.call(e, r[i])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var o = {}, a = $o(e), s = 0; s < a.length; s++) {
        var u = a[s];
        r.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function Yf(e, t, r, n, i, o) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
        u < a;
        u++
      )
        s[u - 6] = arguments[u];
      return s.length
        ? Ve.call.apply(Ve, [null, !0, !1, e, t, r, n, i, o].concat(s))
        : Ve(!0, !1, e, t, r, n, i, o);
    }
    var MA = {
      clone: Rn,
      addLast: qf,
      addFirst: Df,
      removeLast: Ff,
      removeFirst: kf,
      insert: Gf,
      removeAt: Uf,
      replaceAt: Vf,
      getIn: Cn,
      set: Ln,
      setIn: Nn,
      update: Hf,
      updateIn: Xf,
      merge: Bf,
      mergeDeep: jf,
      mergeIn: zf,
      omit: Kf,
      addDefaults: Yf,
    };
    be.default = MA;
  });
  var Qf,
    qA,
    DA,
    FA,
    kA,
    GA,
    $f,
    Zf,
    Jf = me(() => {
      "use strict";
      Ue();
      (Qf = de(Jt())),
        ({
          IX2_PREVIEW_REQUESTED: qA,
          IX2_PLAYBACK_REQUESTED: DA,
          IX2_STOP_REQUESTED: FA,
          IX2_CLEAR_REQUESTED: kA,
        } = we),
        (GA = { preview: {}, playback: {}, stop: {}, clear: {} }),
        ($f = Object.create(null, {
          [qA]: { value: "preview" },
          [DA]: { value: "playback" },
          [FA]: { value: "stop" },
          [kA]: { value: "clear" },
        })),
        (Zf = (e = GA, t) => {
          if (t.type in $f) {
            let r = [$f[t.type]];
            return (0, Qf.setIn)(e, [r], { ...t.payload });
          }
          return e;
        });
    });
  var Me,
    UA,
    VA,
    WA,
    HA,
    XA,
    BA,
    jA,
    zA,
    KA,
    YA,
    ed,
    $A,
    td,
    rd = me(() => {
      "use strict";
      Ue();
      (Me = de(Jt())),
        ({
          IX2_SESSION_INITIALIZED: UA,
          IX2_SESSION_STARTED: VA,
          IX2_TEST_FRAME_RENDERED: WA,
          IX2_SESSION_STOPPED: HA,
          IX2_EVENT_LISTENER_ADDED: XA,
          IX2_EVENT_STATE_CHANGED: BA,
          IX2_ANIMATION_FRAME_CHANGED: jA,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: zA,
          IX2_VIEWPORT_WIDTH_CHANGED: KA,
          IX2_MEDIA_QUERIES_DEFINED: YA,
        } = we),
        (ed = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        ($A = 20),
        (td = (e = ed, t) => {
          switch (t.type) {
            case UA: {
              let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
              return (0, Me.merge)(e, {
                hasBoundaryNodes: r,
                reducedMotion: n,
              });
            }
            case VA:
              return (0, Me.set)(e, "active", !0);
            case WA: {
              let {
                payload: { step: r = $A },
              } = t;
              return (0, Me.set)(e, "tick", e.tick + r);
            }
            case HA:
              return ed;
            case jA: {
              let {
                payload: { now: r },
              } = t;
              return (0, Me.set)(e, "tick", r);
            }
            case XA: {
              let r = (0, Me.addLast)(e.eventListeners, t.payload);
              return (0, Me.set)(e, "eventListeners", r);
            }
            case BA: {
              let { stateKey: r, newState: n } = t.payload;
              return (0, Me.setIn)(e, ["eventState", r], n);
            }
            case zA: {
              let { actionListId: r, isPlaying: n } = t.payload;
              return (0, Me.setIn)(e, ["playbackState", r], n);
            }
            case KA: {
              let { width: r, mediaQueries: n } = t.payload,
                i = n.length,
                o = null;
              for (let a = 0; a < i; a++) {
                let { key: s, min: u, max: d } = n[a];
                if (r >= u && r <= d) {
                  o = s;
                  break;
                }
              }
              return (0, Me.merge)(e, { viewportWidth: r, mediaQueryKey: o });
            }
            case YA:
              return (0, Me.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var id = c((cX, nd) => {
    function QA() {
      (this.__data__ = []), (this.size = 0);
    }
    nd.exports = QA;
  });
  var Pn = c((lX, od) => {
    function ZA(e, t) {
      return e === t || (e !== e && t !== t);
    }
    od.exports = ZA;
  });
  var qr = c((fX, ad) => {
    var JA = Pn();
    function eS(e, t) {
      for (var r = e.length; r--; ) if (JA(e[r][0], t)) return r;
      return -1;
    }
    ad.exports = eS;
  });
  var ud = c((dX, sd) => {
    var tS = qr(),
      rS = Array.prototype,
      nS = rS.splice;
    function iS(e) {
      var t = this.__data__,
        r = tS(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : nS.call(t, r, 1), --this.size, !0;
    }
    sd.exports = iS;
  });
  var ld = c((pX, cd) => {
    var oS = qr();
    function aS(e) {
      var t = this.__data__,
        r = oS(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    cd.exports = aS;
  });
  var dd = c((vX, fd) => {
    var sS = qr();
    function uS(e) {
      return sS(this.__data__, e) > -1;
    }
    fd.exports = uS;
  });
  var vd = c((gX, pd) => {
    var cS = qr();
    function lS(e, t) {
      var r = this.__data__,
        n = cS(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    pd.exports = lS;
  });
  var Dr = c((hX, gd) => {
    var fS = id(),
      dS = ud(),
      pS = ld(),
      vS = dd(),
      gS = vd();
    function er(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    er.prototype.clear = fS;
    er.prototype.delete = dS;
    er.prototype.get = pS;
    er.prototype.has = vS;
    er.prototype.set = gS;
    gd.exports = er;
  });
  var yd = c((yX, hd) => {
    var hS = Dr();
    function yS() {
      (this.__data__ = new hS()), (this.size = 0);
    }
    hd.exports = yS;
  });
  var Ed = c((mX, md) => {
    function mS(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    md.exports = mS;
  });
  var bd = c((EX, _d) => {
    function ES(e) {
      return this.__data__.get(e);
    }
    _d.exports = ES;
  });
  var Id = c((_X, Td) => {
    function _S(e) {
      return this.__data__.has(e);
    }
    Td.exports = _S;
  });
  var ct = c((bX, wd) => {
    function bS(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    wd.exports = bS;
  });
  var Qo = c((TX, Od) => {
    var TS = wt(),
      IS = ct(),
      wS = "[object AsyncFunction]",
      OS = "[object Function]",
      xS = "[object GeneratorFunction]",
      AS = "[object Proxy]";
    function SS(e) {
      if (!IS(e)) return !1;
      var t = TS(e);
      return t == OS || t == xS || t == wS || t == AS;
    }
    Od.exports = SS;
  });
  var Ad = c((IX, xd) => {
    var RS = Ze(),
      CS = RS["__core-js_shared__"];
    xd.exports = CS;
  });
  var Cd = c((wX, Rd) => {
    var Zo = Ad(),
      Sd = (function () {
        var e = /[^.]+$/.exec((Zo && Zo.keys && Zo.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function LS(e) {
      return !!Sd && Sd in e;
    }
    Rd.exports = LS;
  });
  var Jo = c((OX, Ld) => {
    var NS = Function.prototype,
      PS = NS.toString;
    function MS(e) {
      if (e != null) {
        try {
          return PS.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    Ld.exports = MS;
  });
  var Pd = c((xX, Nd) => {
    var qS = Qo(),
      DS = Cd(),
      FS = ct(),
      kS = Jo(),
      GS = /[\\^$.*+?()[\]{}|]/g,
      US = /^\[object .+?Constructor\]$/,
      VS = Function.prototype,
      WS = Object.prototype,
      HS = VS.toString,
      XS = WS.hasOwnProperty,
      BS = RegExp(
        "^" +
          HS.call(XS)
            .replace(GS, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function jS(e) {
      if (!FS(e) || DS(e)) return !1;
      var t = qS(e) ? BS : US;
      return t.test(kS(e));
    }
    Nd.exports = jS;
  });
  var qd = c((AX, Md) => {
    function zS(e, t) {
      return e?.[t];
    }
    Md.exports = zS;
  });
  var Ot = c((SX, Dd) => {
    var KS = Pd(),
      YS = qd();
    function $S(e, t) {
      var r = YS(e, t);
      return KS(r) ? r : void 0;
    }
    Dd.exports = $S;
  });
  var Mn = c((RX, Fd) => {
    var QS = Ot(),
      ZS = Ze(),
      JS = QS(ZS, "Map");
    Fd.exports = JS;
  });
  var Fr = c((CX, kd) => {
    var e0 = Ot(),
      t0 = e0(Object, "create");
    kd.exports = t0;
  });
  var Vd = c((LX, Ud) => {
    var Gd = Fr();
    function r0() {
      (this.__data__ = Gd ? Gd(null) : {}), (this.size = 0);
    }
    Ud.exports = r0;
  });
  var Hd = c((NX, Wd) => {
    function n0(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Wd.exports = n0;
  });
  var Bd = c((PX, Xd) => {
    var i0 = Fr(),
      o0 = "__lodash_hash_undefined__",
      a0 = Object.prototype,
      s0 = a0.hasOwnProperty;
    function u0(e) {
      var t = this.__data__;
      if (i0) {
        var r = t[e];
        return r === o0 ? void 0 : r;
      }
      return s0.call(t, e) ? t[e] : void 0;
    }
    Xd.exports = u0;
  });
  var zd = c((MX, jd) => {
    var c0 = Fr(),
      l0 = Object.prototype,
      f0 = l0.hasOwnProperty;
    function d0(e) {
      var t = this.__data__;
      return c0 ? t[e] !== void 0 : f0.call(t, e);
    }
    jd.exports = d0;
  });
  var Yd = c((qX, Kd) => {
    var p0 = Fr(),
      v0 = "__lodash_hash_undefined__";
    function g0(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = p0 && t === void 0 ? v0 : t),
        this
      );
    }
    Kd.exports = g0;
  });
  var Qd = c((DX, $d) => {
    var h0 = Vd(),
      y0 = Hd(),
      m0 = Bd(),
      E0 = zd(),
      _0 = Yd();
    function tr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    tr.prototype.clear = h0;
    tr.prototype.delete = y0;
    tr.prototype.get = m0;
    tr.prototype.has = E0;
    tr.prototype.set = _0;
    $d.exports = tr;
  });
  var ep = c((FX, Jd) => {
    var Zd = Qd(),
      b0 = Dr(),
      T0 = Mn();
    function I0() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Zd(),
          map: new (T0 || b0)(),
          string: new Zd(),
        });
    }
    Jd.exports = I0;
  });
  var rp = c((kX, tp) => {
    function w0(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    tp.exports = w0;
  });
  var kr = c((GX, np) => {
    var O0 = rp();
    function x0(e, t) {
      var r = e.__data__;
      return O0(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    np.exports = x0;
  });
  var op = c((UX, ip) => {
    var A0 = kr();
    function S0(e) {
      var t = A0(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    ip.exports = S0;
  });
  var sp = c((VX, ap) => {
    var R0 = kr();
    function C0(e) {
      return R0(this, e).get(e);
    }
    ap.exports = C0;
  });
  var cp = c((WX, up) => {
    var L0 = kr();
    function N0(e) {
      return L0(this, e).has(e);
    }
    up.exports = N0;
  });
  var fp = c((HX, lp) => {
    var P0 = kr();
    function M0(e, t) {
      var r = P0(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    lp.exports = M0;
  });
  var qn = c((XX, dp) => {
    var q0 = ep(),
      D0 = op(),
      F0 = sp(),
      k0 = cp(),
      G0 = fp();
    function rr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    rr.prototype.clear = q0;
    rr.prototype.delete = D0;
    rr.prototype.get = F0;
    rr.prototype.has = k0;
    rr.prototype.set = G0;
    dp.exports = rr;
  });
  var vp = c((BX, pp) => {
    var U0 = Dr(),
      V0 = Mn(),
      W0 = qn(),
      H0 = 200;
    function X0(e, t) {
      var r = this.__data__;
      if (r instanceof U0) {
        var n = r.__data__;
        if (!V0 || n.length < H0 - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new W0(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    pp.exports = X0;
  });
  var ea = c((jX, gp) => {
    var B0 = Dr(),
      j0 = yd(),
      z0 = Ed(),
      K0 = bd(),
      Y0 = Id(),
      $0 = vp();
    function nr(e) {
      var t = (this.__data__ = new B0(e));
      this.size = t.size;
    }
    nr.prototype.clear = j0;
    nr.prototype.delete = z0;
    nr.prototype.get = K0;
    nr.prototype.has = Y0;
    nr.prototype.set = $0;
    gp.exports = nr;
  });
  var yp = c((zX, hp) => {
    var Q0 = "__lodash_hash_undefined__";
    function Z0(e) {
      return this.__data__.set(e, Q0), this;
    }
    hp.exports = Z0;
  });
  var Ep = c((KX, mp) => {
    function J0(e) {
      return this.__data__.has(e);
    }
    mp.exports = J0;
  });
  var bp = c((YX, _p) => {
    var eR = qn(),
      tR = yp(),
      rR = Ep();
    function Dn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new eR(); ++t < r; ) this.add(e[t]);
    }
    Dn.prototype.add = Dn.prototype.push = tR;
    Dn.prototype.has = rR;
    _p.exports = Dn;
  });
  var Ip = c(($X, Tp) => {
    function nR(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    Tp.exports = nR;
  });
  var Op = c((QX, wp) => {
    function iR(e, t) {
      return e.has(t);
    }
    wp.exports = iR;
  });
  var ta = c((ZX, xp) => {
    var oR = bp(),
      aR = Ip(),
      sR = Op(),
      uR = 1,
      cR = 2;
    function lR(e, t, r, n, i, o) {
      var a = r & uR,
        s = e.length,
        u = t.length;
      if (s != u && !(a && u > s)) return !1;
      var d = o.get(e),
        g = o.get(t);
      if (d && g) return d == t && g == e;
      var v = -1,
        E = !0,
        m = r & cR ? new oR() : void 0;
      for (o.set(e, t), o.set(t, e); ++v < s; ) {
        var T = e[v],
          w = t[v];
        if (n) var k = a ? n(w, T, v, t, e, o) : n(T, w, v, e, t, o);
        if (k !== void 0) {
          if (k) continue;
          E = !1;
          break;
        }
        if (m) {
          if (
            !aR(t, function (S, N) {
              if (!sR(m, N) && (T === S || i(T, S, r, n, o))) return m.push(N);
            })
          ) {
            E = !1;
            break;
          }
        } else if (!(T === w || i(T, w, r, n, o))) {
          E = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), E;
    }
    xp.exports = lR;
  });
  var Sp = c((JX, Ap) => {
    var fR = Ze(),
      dR = fR.Uint8Array;
    Ap.exports = dR;
  });
  var Cp = c((e5, Rp) => {
    function pR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, i) {
          r[++t] = [i, n];
        }),
        r
      );
    }
    Rp.exports = pR;
  });
  var Np = c((t5, Lp) => {
    function vR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    Lp.exports = vR;
  });
  var Fp = c((r5, Dp) => {
    var Pp = $t(),
      Mp = Sp(),
      gR = Pn(),
      hR = ta(),
      yR = Cp(),
      mR = Np(),
      ER = 1,
      _R = 2,
      bR = "[object Boolean]",
      TR = "[object Date]",
      IR = "[object Error]",
      wR = "[object Map]",
      OR = "[object Number]",
      xR = "[object RegExp]",
      AR = "[object Set]",
      SR = "[object String]",
      RR = "[object Symbol]",
      CR = "[object ArrayBuffer]",
      LR = "[object DataView]",
      qp = Pp ? Pp.prototype : void 0,
      ra = qp ? qp.valueOf : void 0;
    function NR(e, t, r, n, i, o, a) {
      switch (r) {
        case LR:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case CR:
          return !(e.byteLength != t.byteLength || !o(new Mp(e), new Mp(t)));
        case bR:
        case TR:
        case OR:
          return gR(+e, +t);
        case IR:
          return e.name == t.name && e.message == t.message;
        case xR:
        case SR:
          return e == t + "";
        case wR:
          var s = yR;
        case AR:
          var u = n & ER;
          if ((s || (s = mR), e.size != t.size && !u)) return !1;
          var d = a.get(e);
          if (d) return d == t;
          (n |= _R), a.set(e, t);
          var g = hR(s(e), s(t), n, i, o, a);
          return a.delete(e), g;
        case RR:
          if (ra) return ra.call(e) == ra.call(t);
      }
      return !1;
    }
    Dp.exports = NR;
  });
  var Fn = c((n5, kp) => {
    function PR(e, t) {
      for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
      return e;
    }
    kp.exports = PR;
  });
  var xe = c((i5, Gp) => {
    var MR = Array.isArray;
    Gp.exports = MR;
  });
  var na = c((o5, Up) => {
    var qR = Fn(),
      DR = xe();
    function FR(e, t, r) {
      var n = t(e);
      return DR(e) ? n : qR(n, r(e));
    }
    Up.exports = FR;
  });
  var Wp = c((a5, Vp) => {
    function kR(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
        var a = e[r];
        t(a, r, e) && (o[i++] = a);
      }
      return o;
    }
    Vp.exports = kR;
  });
  var ia = c((s5, Hp) => {
    function GR() {
      return [];
    }
    Hp.exports = GR;
  });
  var oa = c((u5, Bp) => {
    var UR = Wp(),
      VR = ia(),
      WR = Object.prototype,
      HR = WR.propertyIsEnumerable,
      Xp = Object.getOwnPropertySymbols,
      XR = Xp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                UR(Xp(e), function (t) {
                  return HR.call(e, t);
                }));
          }
        : VR;
    Bp.exports = XR;
  });
  var zp = c((c5, jp) => {
    function BR(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    jp.exports = BR;
  });
  var Yp = c((l5, Kp) => {
    var jR = wt(),
      zR = gt(),
      KR = "[object Arguments]";
    function YR(e) {
      return zR(e) && jR(e) == KR;
    }
    Kp.exports = YR;
  });
  var Gr = c((f5, Zp) => {
    var $p = Yp(),
      $R = gt(),
      Qp = Object.prototype,
      QR = Qp.hasOwnProperty,
      ZR = Qp.propertyIsEnumerable,
      JR = $p(
        (function () {
          return arguments;
        })()
      )
        ? $p
        : function (e) {
            return $R(e) && QR.call(e, "callee") && !ZR.call(e, "callee");
          };
    Zp.exports = JR;
  });
  var ev = c((d5, Jp) => {
    function eC() {
      return !1;
    }
    Jp.exports = eC;
  });
  var kn = c((Ur, ir) => {
    var tC = Ze(),
      rC = ev(),
      nv = typeof Ur == "object" && Ur && !Ur.nodeType && Ur,
      tv = nv && typeof ir == "object" && ir && !ir.nodeType && ir,
      nC = tv && tv.exports === nv,
      rv = nC ? tC.Buffer : void 0,
      iC = rv ? rv.isBuffer : void 0,
      oC = iC || rC;
    ir.exports = oC;
  });
  var Gn = c((p5, iv) => {
    var aC = 9007199254740991,
      sC = /^(?:0|[1-9]\d*)$/;
    function uC(e, t) {
      var r = typeof e;
      return (
        (t = t ?? aC),
        !!t &&
          (r == "number" || (r != "symbol" && sC.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    iv.exports = uC;
  });
  var Un = c((v5, ov) => {
    var cC = 9007199254740991;
    function lC(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= cC;
    }
    ov.exports = lC;
  });
  var sv = c((g5, av) => {
    var fC = wt(),
      dC = Un(),
      pC = gt(),
      vC = "[object Arguments]",
      gC = "[object Array]",
      hC = "[object Boolean]",
      yC = "[object Date]",
      mC = "[object Error]",
      EC = "[object Function]",
      _C = "[object Map]",
      bC = "[object Number]",
      TC = "[object Object]",
      IC = "[object RegExp]",
      wC = "[object Set]",
      OC = "[object String]",
      xC = "[object WeakMap]",
      AC = "[object ArrayBuffer]",
      SC = "[object DataView]",
      RC = "[object Float32Array]",
      CC = "[object Float64Array]",
      LC = "[object Int8Array]",
      NC = "[object Int16Array]",
      PC = "[object Int32Array]",
      MC = "[object Uint8Array]",
      qC = "[object Uint8ClampedArray]",
      DC = "[object Uint16Array]",
      FC = "[object Uint32Array]",
      ye = {};
    ye[RC] =
      ye[CC] =
      ye[LC] =
      ye[NC] =
      ye[PC] =
      ye[MC] =
      ye[qC] =
      ye[DC] =
      ye[FC] =
        !0;
    ye[vC] =
      ye[gC] =
      ye[AC] =
      ye[hC] =
      ye[SC] =
      ye[yC] =
      ye[mC] =
      ye[EC] =
      ye[_C] =
      ye[bC] =
      ye[TC] =
      ye[IC] =
      ye[wC] =
      ye[OC] =
      ye[xC] =
        !1;
    function kC(e) {
      return pC(e) && dC(e.length) && !!ye[fC(e)];
    }
    av.exports = kC;
  });
  var cv = c((h5, uv) => {
    function GC(e) {
      return function (t) {
        return e(t);
      };
    }
    uv.exports = GC;
  });
  var fv = c((Vr, or) => {
    var UC = Co(),
      lv = typeof Vr == "object" && Vr && !Vr.nodeType && Vr,
      Wr = lv && typeof or == "object" && or && !or.nodeType && or,
      VC = Wr && Wr.exports === lv,
      aa = VC && UC.process,
      WC = (function () {
        try {
          var e = Wr && Wr.require && Wr.require("util").types;
          return e || (aa && aa.binding && aa.binding("util"));
        } catch {}
      })();
    or.exports = WC;
  });
  var Vn = c((y5, vv) => {
    var HC = sv(),
      XC = cv(),
      dv = fv(),
      pv = dv && dv.isTypedArray,
      BC = pv ? XC(pv) : HC;
    vv.exports = BC;
  });
  var sa = c((m5, gv) => {
    var jC = zp(),
      zC = Gr(),
      KC = xe(),
      YC = kn(),
      $C = Gn(),
      QC = Vn(),
      ZC = Object.prototype,
      JC = ZC.hasOwnProperty;
    function eL(e, t) {
      var r = KC(e),
        n = !r && zC(e),
        i = !r && !n && YC(e),
        o = !r && !n && !i && QC(e),
        a = r || n || i || o,
        s = a ? jC(e.length, String) : [],
        u = s.length;
      for (var d in e)
        (t || JC.call(e, d)) &&
          !(
            a &&
            (d == "length" ||
              (i && (d == "offset" || d == "parent")) ||
              (o &&
                (d == "buffer" || d == "byteLength" || d == "byteOffset")) ||
              $C(d, u))
          ) &&
          s.push(d);
      return s;
    }
    gv.exports = eL;
  });
  var Wn = c((E5, hv) => {
    var tL = Object.prototype;
    function rL(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || tL;
      return e === r;
    }
    hv.exports = rL;
  });
  var mv = c((_5, yv) => {
    var nL = Lo(),
      iL = nL(Object.keys, Object);
    yv.exports = iL;
  });
  var Hn = c((b5, Ev) => {
    var oL = Wn(),
      aL = mv(),
      sL = Object.prototype,
      uL = sL.hasOwnProperty;
    function cL(e) {
      if (!oL(e)) return aL(e);
      var t = [];
      for (var r in Object(e)) uL.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    Ev.exports = cL;
  });
  var Dt = c((T5, _v) => {
    var lL = Qo(),
      fL = Un();
    function dL(e) {
      return e != null && fL(e.length) && !lL(e);
    }
    _v.exports = dL;
  });
  var Hr = c((I5, bv) => {
    var pL = sa(),
      vL = Hn(),
      gL = Dt();
    function hL(e) {
      return gL(e) ? pL(e) : vL(e);
    }
    bv.exports = hL;
  });
  var Iv = c((w5, Tv) => {
    var yL = na(),
      mL = oa(),
      EL = Hr();
    function _L(e) {
      return yL(e, EL, mL);
    }
    Tv.exports = _L;
  });
  var xv = c((O5, Ov) => {
    var wv = Iv(),
      bL = 1,
      TL = Object.prototype,
      IL = TL.hasOwnProperty;
    function wL(e, t, r, n, i, o) {
      var a = r & bL,
        s = wv(e),
        u = s.length,
        d = wv(t),
        g = d.length;
      if (u != g && !a) return !1;
      for (var v = u; v--; ) {
        var E = s[v];
        if (!(a ? E in t : IL.call(t, E))) return !1;
      }
      var m = o.get(e),
        T = o.get(t);
      if (m && T) return m == t && T == e;
      var w = !0;
      o.set(e, t), o.set(t, e);
      for (var k = a; ++v < u; ) {
        E = s[v];
        var S = e[E],
          N = t[E];
        if (n) var C = a ? n(N, S, E, t, e, o) : n(S, N, E, e, t, o);
        if (!(C === void 0 ? S === N || i(S, N, r, n, o) : C)) {
          w = !1;
          break;
        }
        k || (k = E == "constructor");
      }
      if (w && !k) {
        var M = e.constructor,
          F = t.constructor;
        M != F &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof M == "function" &&
            M instanceof M &&
            typeof F == "function" &&
            F instanceof F
          ) &&
          (w = !1);
      }
      return o.delete(e), o.delete(t), w;
    }
    Ov.exports = wL;
  });
  var Sv = c((x5, Av) => {
    var OL = Ot(),
      xL = Ze(),
      AL = OL(xL, "DataView");
    Av.exports = AL;
  });
  var Cv = c((A5, Rv) => {
    var SL = Ot(),
      RL = Ze(),
      CL = SL(RL, "Promise");
    Rv.exports = CL;
  });
  var Nv = c((S5, Lv) => {
    var LL = Ot(),
      NL = Ze(),
      PL = LL(NL, "Set");
    Lv.exports = PL;
  });
  var ua = c((R5, Pv) => {
    var ML = Ot(),
      qL = Ze(),
      DL = ML(qL, "WeakMap");
    Pv.exports = DL;
  });
  var Xn = c((C5, Uv) => {
    var ca = Sv(),
      la = Mn(),
      fa = Cv(),
      da = Nv(),
      pa = ua(),
      Gv = wt(),
      ar = Jo(),
      Mv = "[object Map]",
      FL = "[object Object]",
      qv = "[object Promise]",
      Dv = "[object Set]",
      Fv = "[object WeakMap]",
      kv = "[object DataView]",
      kL = ar(ca),
      GL = ar(la),
      UL = ar(fa),
      VL = ar(da),
      WL = ar(pa),
      Ft = Gv;
    ((ca && Ft(new ca(new ArrayBuffer(1))) != kv) ||
      (la && Ft(new la()) != Mv) ||
      (fa && Ft(fa.resolve()) != qv) ||
      (da && Ft(new da()) != Dv) ||
      (pa && Ft(new pa()) != Fv)) &&
      (Ft = function (e) {
        var t = Gv(e),
          r = t == FL ? e.constructor : void 0,
          n = r ? ar(r) : "";
        if (n)
          switch (n) {
            case kL:
              return kv;
            case GL:
              return Mv;
            case UL:
              return qv;
            case VL:
              return Dv;
            case WL:
              return Fv;
          }
        return t;
      });
    Uv.exports = Ft;
  });
  var Kv = c((L5, zv) => {
    var va = ea(),
      HL = ta(),
      XL = Fp(),
      BL = xv(),
      Vv = Xn(),
      Wv = xe(),
      Hv = kn(),
      jL = Vn(),
      zL = 1,
      Xv = "[object Arguments]",
      Bv = "[object Array]",
      Bn = "[object Object]",
      KL = Object.prototype,
      jv = KL.hasOwnProperty;
    function YL(e, t, r, n, i, o) {
      var a = Wv(e),
        s = Wv(t),
        u = a ? Bv : Vv(e),
        d = s ? Bv : Vv(t);
      (u = u == Xv ? Bn : u), (d = d == Xv ? Bn : d);
      var g = u == Bn,
        v = d == Bn,
        E = u == d;
      if (E && Hv(e)) {
        if (!Hv(t)) return !1;
        (a = !0), (g = !1);
      }
      if (E && !g)
        return (
          o || (o = new va()),
          a || jL(e) ? HL(e, t, r, n, i, o) : XL(e, t, u, r, n, i, o)
        );
      if (!(r & zL)) {
        var m = g && jv.call(e, "__wrapped__"),
          T = v && jv.call(t, "__wrapped__");
        if (m || T) {
          var w = m ? e.value() : e,
            k = T ? t.value() : t;
          return o || (o = new va()), i(w, k, r, n, o);
        }
      }
      return E ? (o || (o = new va()), BL(e, t, r, n, i, o)) : !1;
    }
    zv.exports = YL;
  });
  var ga = c((N5, Qv) => {
    var $L = Kv(),
      Yv = gt();
    function $v(e, t, r, n, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Yv(e) && !Yv(t))
        ? e !== e && t !== t
        : $L(e, t, r, n, $v, i);
    }
    Qv.exports = $v;
  });
  var Jv = c((P5, Zv) => {
    var QL = ea(),
      ZL = ga(),
      JL = 1,
      eN = 2;
    function tN(e, t, r, n) {
      var i = r.length,
        o = i,
        a = !n;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var s = r[i];
        if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        s = r[i];
        var u = s[0],
          d = e[u],
          g = s[1];
        if (a && s[2]) {
          if (d === void 0 && !(u in e)) return !1;
        } else {
          var v = new QL();
          if (n) var E = n(d, g, u, e, t, v);
          if (!(E === void 0 ? ZL(g, d, JL | eN, n, v) : E)) return !1;
        }
      }
      return !0;
    }
    Zv.exports = tN;
  });
  var ha = c((M5, eg) => {
    var rN = ct();
    function nN(e) {
      return e === e && !rN(e);
    }
    eg.exports = nN;
  });
  var rg = c((q5, tg) => {
    var iN = ha(),
      oN = Hr();
    function aN(e) {
      for (var t = oN(e), r = t.length; r--; ) {
        var n = t[r],
          i = e[n];
        t[r] = [n, i, iN(i)];
      }
      return t;
    }
    tg.exports = aN;
  });
  var ya = c((D5, ng) => {
    function sN(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    ng.exports = sN;
  });
  var og = c((F5, ig) => {
    var uN = Jv(),
      cN = rg(),
      lN = ya();
    function fN(e) {
      var t = cN(e);
      return t.length == 1 && t[0][2]
        ? lN(t[0][0], t[0][1])
        : function (r) {
            return r === e || uN(r, e, t);
          };
    }
    ig.exports = fN;
  });
  var Xr = c((k5, ag) => {
    var dN = wt(),
      pN = gt(),
      vN = "[object Symbol]";
    function gN(e) {
      return typeof e == "symbol" || (pN(e) && dN(e) == vN);
    }
    ag.exports = gN;
  });
  var jn = c((G5, sg) => {
    var hN = xe(),
      yN = Xr(),
      mN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      EN = /^\w*$/;
    function _N(e, t) {
      if (hN(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        yN(e)
        ? !0
        : EN.test(e) || !mN.test(e) || (t != null && e in Object(t));
    }
    sg.exports = _N;
  });
  var lg = c((U5, cg) => {
    var ug = qn(),
      bN = "Expected a function";
    function ma(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(bN);
      var r = function () {
        var n = arguments,
          i = t ? t.apply(this, n) : n[0],
          o = r.cache;
        if (o.has(i)) return o.get(i);
        var a = e.apply(this, n);
        return (r.cache = o.set(i, a) || o), a;
      };
      return (r.cache = new (ma.Cache || ug)()), r;
    }
    ma.Cache = ug;
    cg.exports = ma;
  });
  var dg = c((V5, fg) => {
    var TN = lg(),
      IN = 500;
    function wN(e) {
      var t = TN(e, function (n) {
          return r.size === IN && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    fg.exports = wN;
  });
  var vg = c((W5, pg) => {
    var ON = dg(),
      xN =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      AN = /\\(\\)?/g,
      SN = ON(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(xN, function (r, n, i, o) {
            t.push(i ? o.replace(AN, "$1") : n || r);
          }),
          t
        );
      });
    pg.exports = SN;
  });
  var Ea = c((H5, gg) => {
    function RN(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
        i[r] = t(e[r], r, e);
      return i;
    }
    gg.exports = RN;
  });
  var bg = c((X5, _g) => {
    var hg = $t(),
      CN = Ea(),
      LN = xe(),
      NN = Xr(),
      PN = 1 / 0,
      yg = hg ? hg.prototype : void 0,
      mg = yg ? yg.toString : void 0;
    function Eg(e) {
      if (typeof e == "string") return e;
      if (LN(e)) return CN(e, Eg) + "";
      if (NN(e)) return mg ? mg.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -PN ? "-0" : t;
    }
    _g.exports = Eg;
  });
  var Ig = c((B5, Tg) => {
    var MN = bg();
    function qN(e) {
      return e == null ? "" : MN(e);
    }
    Tg.exports = qN;
  });
  var Br = c((j5, wg) => {
    var DN = xe(),
      FN = jn(),
      kN = vg(),
      GN = Ig();
    function UN(e, t) {
      return DN(e) ? e : FN(e, t) ? [e] : kN(GN(e));
    }
    wg.exports = UN;
  });
  var sr = c((z5, Og) => {
    var VN = Xr(),
      WN = 1 / 0;
    function HN(e) {
      if (typeof e == "string" || VN(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -WN ? "-0" : t;
    }
    Og.exports = HN;
  });
  var zn = c((K5, xg) => {
    var XN = Br(),
      BN = sr();
    function jN(e, t) {
      t = XN(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[BN(t[r++])];
      return r && r == n ? e : void 0;
    }
    xg.exports = jN;
  });
  var Kn = c((Y5, Ag) => {
    var zN = zn();
    function KN(e, t, r) {
      var n = e == null ? void 0 : zN(e, t);
      return n === void 0 ? r : n;
    }
    Ag.exports = KN;
  });
  var Rg = c(($5, Sg) => {
    function YN(e, t) {
      return e != null && t in Object(e);
    }
    Sg.exports = YN;
  });
  var Lg = c((Q5, Cg) => {
    var $N = Br(),
      QN = Gr(),
      ZN = xe(),
      JN = Gn(),
      eP = Un(),
      tP = sr();
    function rP(e, t, r) {
      t = $N(t, e);
      for (var n = -1, i = t.length, o = !1; ++n < i; ) {
        var a = tP(t[n]);
        if (!(o = e != null && r(e, a))) break;
        e = e[a];
      }
      return o || ++n != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && eP(i) && JN(a, i) && (ZN(e) || QN(e)));
    }
    Cg.exports = rP;
  });
  var Pg = c((Z5, Ng) => {
    var nP = Rg(),
      iP = Lg();
    function oP(e, t) {
      return e != null && iP(e, t, nP);
    }
    Ng.exports = oP;
  });
  var qg = c((J5, Mg) => {
    var aP = ga(),
      sP = Kn(),
      uP = Pg(),
      cP = jn(),
      lP = ha(),
      fP = ya(),
      dP = sr(),
      pP = 1,
      vP = 2;
    function gP(e, t) {
      return cP(e) && lP(t)
        ? fP(dP(e), t)
        : function (r) {
            var n = sP(r, e);
            return n === void 0 && n === t ? uP(r, e) : aP(t, n, pP | vP);
          };
    }
    Mg.exports = gP;
  });
  var Yn = c((eB, Dg) => {
    function hP(e) {
      return e;
    }
    Dg.exports = hP;
  });
  var _a = c((tB, Fg) => {
    function yP(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Fg.exports = yP;
  });
  var Gg = c((rB, kg) => {
    var mP = zn();
    function EP(e) {
      return function (t) {
        return mP(t, e);
      };
    }
    kg.exports = EP;
  });
  var Vg = c((nB, Ug) => {
    var _P = _a(),
      bP = Gg(),
      TP = jn(),
      IP = sr();
    function wP(e) {
      return TP(e) ? _P(IP(e)) : bP(e);
    }
    Ug.exports = wP;
  });
  var xt = c((iB, Wg) => {
    var OP = og(),
      xP = qg(),
      AP = Yn(),
      SP = xe(),
      RP = Vg();
    function CP(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? AP
        : typeof e == "object"
        ? SP(e)
          ? xP(e[0], e[1])
          : OP(e)
        : RP(e);
    }
    Wg.exports = CP;
  });
  var ba = c((oB, Hg) => {
    var LP = xt(),
      NP = Dt(),
      PP = Hr();
    function MP(e) {
      return function (t, r, n) {
        var i = Object(t);
        if (!NP(t)) {
          var o = LP(r, 3);
          (t = PP(t)),
            (r = function (s) {
              return o(i[s], s, i);
            });
        }
        var a = e(t, r, n);
        return a > -1 ? i[o ? t[a] : a] : void 0;
      };
    }
    Hg.exports = MP;
  });
  var Ta = c((aB, Xg) => {
    function qP(e, t, r, n) {
      for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Xg.exports = qP;
  });
  var jg = c((sB, Bg) => {
    var DP = /\s/;
    function FP(e) {
      for (var t = e.length; t-- && DP.test(e.charAt(t)); );
      return t;
    }
    Bg.exports = FP;
  });
  var Kg = c((uB, zg) => {
    var kP = jg(),
      GP = /^\s+/;
    function UP(e) {
      return e && e.slice(0, kP(e) + 1).replace(GP, "");
    }
    zg.exports = UP;
  });
  var $n = c((cB, Qg) => {
    var VP = Kg(),
      Yg = ct(),
      WP = Xr(),
      $g = 0 / 0,
      HP = /^[-+]0x[0-9a-f]+$/i,
      XP = /^0b[01]+$/i,
      BP = /^0o[0-7]+$/i,
      jP = parseInt;
    function zP(e) {
      if (typeof e == "number") return e;
      if (WP(e)) return $g;
      if (Yg(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Yg(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = VP(e);
      var r = XP.test(e);
      return r || BP.test(e) ? jP(e.slice(2), r ? 2 : 8) : HP.test(e) ? $g : +e;
    }
    Qg.exports = zP;
  });
  var eh = c((lB, Jg) => {
    var KP = $n(),
      Zg = 1 / 0,
      YP = 17976931348623157e292;
    function $P(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = KP(e)), e === Zg || e === -Zg)) {
        var t = e < 0 ? -1 : 1;
        return t * YP;
      }
      return e === e ? e : 0;
    }
    Jg.exports = $P;
  });
  var Ia = c((fB, th) => {
    var QP = eh();
    function ZP(e) {
      var t = QP(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    th.exports = ZP;
  });
  var nh = c((dB, rh) => {
    var JP = Ta(),
      eM = xt(),
      tM = Ia(),
      rM = Math.max;
    function nM(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = r == null ? 0 : tM(r);
      return i < 0 && (i = rM(n + i, 0)), JP(e, eM(t, 3), i);
    }
    rh.exports = nM;
  });
  var wa = c((pB, ih) => {
    var iM = ba(),
      oM = nh(),
      aM = iM(oM);
    ih.exports = aM;
  });
  var sh = {};
  Ge(sh, {
    ELEMENT_MATCHES: () => sM,
    FLEX_PREFIXED: () => Oa,
    IS_BROWSER_ENV: () => et,
    TRANSFORM_PREFIXED: () => At,
    TRANSFORM_STYLE_PREFIXED: () => Zn,
    withBrowser: () => Qn,
  });
  var ah,
    et,
    Qn,
    sM,
    Oa,
    At,
    oh,
    Zn,
    Jn = me(() => {
      "use strict";
      (ah = de(wa())),
        (et = typeof window < "u"),
        (Qn = (e, t) => (et ? e() : t)),
        (sM = Qn(() =>
          (0, ah.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (Oa = Qn(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            r = "";
          try {
            let { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return r;
          } catch {
            return r;
          }
        }, "flex")),
        (At = Qn(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              r = "Transform",
              { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i] + r;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (oh = At.split("transform")[0]),
        (Zn = oh ? oh + "TransformStyle" : "transformStyle");
    });
  var xa = c((vB, dh) => {
    var uM = 4,
      cM = 0.001,
      lM = 1e-7,
      fM = 10,
      jr = 11,
      ei = 1 / (jr - 1),
      dM = typeof Float32Array == "function";
    function uh(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function ch(e, t) {
      return 3 * t - 6 * e;
    }
    function lh(e) {
      return 3 * e;
    }
    function ti(e, t, r) {
      return ((uh(t, r) * e + ch(t, r)) * e + lh(t)) * e;
    }
    function fh(e, t, r) {
      return 3 * uh(t, r) * e * e + 2 * ch(t, r) * e + lh(t);
    }
    function pM(e, t, r, n, i) {
      var o,
        a,
        s = 0;
      do
        (a = t + (r - t) / 2), (o = ti(a, n, i) - e), o > 0 ? (r = a) : (t = a);
      while (Math.abs(o) > lM && ++s < fM);
      return a;
    }
    function vM(e, t, r, n) {
      for (var i = 0; i < uM; ++i) {
        var o = fh(t, r, n);
        if (o === 0) return t;
        var a = ti(t, r, n) - e;
        t -= a / o;
      }
      return t;
    }
    dh.exports = function (t, r, n, i) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = dM ? new Float32Array(jr) : new Array(jr);
      if (t !== r || n !== i)
        for (var a = 0; a < jr; ++a) o[a] = ti(a * ei, t, n);
      function s(u) {
        for (var d = 0, g = 1, v = jr - 1; g !== v && o[g] <= u; ++g) d += ei;
        --g;
        var E = (u - o[g]) / (o[g + 1] - o[g]),
          m = d + E * ei,
          T = fh(m, t, n);
        return T >= cM ? vM(u, m, t, n) : T === 0 ? m : pM(u, d, d + ei, t, n);
      }
      return function (d) {
        return t === r && n === i
          ? d
          : d === 0
          ? 0
          : d === 1
          ? 1
          : ti(s(d), r, i);
      };
    };
  });
  var Kr = {};
  Ge(Kr, {
    bounce: () => $M,
    bouncePast: () => QM,
    ease: () => gM,
    easeIn: () => hM,
    easeInOut: () => mM,
    easeOut: () => yM,
    inBack: () => VM,
    inCirc: () => FM,
    inCubic: () => TM,
    inElastic: () => XM,
    inExpo: () => MM,
    inOutBack: () => HM,
    inOutCirc: () => GM,
    inOutCubic: () => wM,
    inOutElastic: () => jM,
    inOutExpo: () => DM,
    inOutQuad: () => bM,
    inOutQuart: () => AM,
    inOutQuint: () => CM,
    inOutSine: () => PM,
    inQuad: () => EM,
    inQuart: () => OM,
    inQuint: () => SM,
    inSine: () => LM,
    outBack: () => WM,
    outBounce: () => UM,
    outCirc: () => kM,
    outCubic: () => IM,
    outElastic: () => BM,
    outExpo: () => qM,
    outQuad: () => _M,
    outQuart: () => xM,
    outQuint: () => RM,
    outSine: () => NM,
    swingFrom: () => KM,
    swingFromTo: () => zM,
    swingTo: () => YM,
  });
  function EM(e) {
    return Math.pow(e, 2);
  }
  function _M(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function bM(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function TM(e) {
    return Math.pow(e, 3);
  }
  function IM(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function wM(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function OM(e) {
    return Math.pow(e, 4);
  }
  function xM(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function AM(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function SM(e) {
    return Math.pow(e, 5);
  }
  function RM(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function CM(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function LM(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function NM(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function PM(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function MM(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function qM(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function DM(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function FM(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function kM(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function GM(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function UM(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function VM(e) {
    let t = ht;
    return e * e * ((t + 1) * e - t);
  }
  function WM(e) {
    let t = ht;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function HM(e) {
    let t = ht;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function XM(e) {
    let t = ht,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        -(
          n *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / r)
        ));
  }
  function BM(e) {
    let t = ht,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) + 1);
  }
  function jM(e) {
    let t = ht,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (r || (r = 0.3 * 1.5),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        e < 1
          ? -0.5 *
            (n *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r))
          : n *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r) *
              0.5 +
            1);
  }
  function zM(e) {
    let t = ht;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function KM(e) {
    let t = ht;
    return e * e * ((t + 1) * e - t);
  }
  function YM(e) {
    let t = ht;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function $M(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function QM(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var zr,
    ht,
    gM,
    hM,
    yM,
    mM,
    Aa = me(() => {
      "use strict";
      (zr = de(xa())),
        (ht = 1.70158),
        (gM = (0, zr.default)(0.25, 0.1, 0.25, 1)),
        (hM = (0, zr.default)(0.42, 0, 1, 1)),
        (yM = (0, zr.default)(0, 0, 0.58, 1)),
        (mM = (0, zr.default)(0.42, 0, 0.58, 1));
    });
  var vh = {};
  Ge(vh, {
    applyEasing: () => JM,
    createBezierEasing: () => ZM,
    optimizeFloat: () => Yr,
  });
  function Yr(e, t = 5, r = 10) {
    let n = Math.pow(r, t),
      i = Number(Math.round(e * n) / n);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function ZM(e) {
    return (0, ph.default)(...e);
  }
  function JM(e, t, r) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Yr(r ? (t > 0 ? r(t) : t) : t > 0 && e && Kr[e] ? Kr[e](t) : t);
  }
  var ph,
    Sa = me(() => {
      "use strict";
      Aa();
      ph = de(xa());
    });
  var yh = {};
  Ge(yh, {
    createElementState: () => hh,
    ixElements: () => pq,
    mergeActionState: () => Ra,
  });
  function hh(e, t, r, n, i) {
    let o =
      r === eq ? (0, ur.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, ur.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
  }
  function Ra(e, t, r, n, i) {
    let o = gq(i);
    return (0, ur.mergeIn)(e, [t, dq, r], n, o);
  }
  function gq(e) {
    let { config: t } = e;
    return vq.reduce((r, n) => {
      let i = n[0],
        o = n[1],
        a = t[i],
        s = t[o];
      return a != null && s != null && (r[o] = s), r;
    }, {});
  }
  var ur,
    hB,
    eq,
    yB,
    tq,
    rq,
    nq,
    iq,
    oq,
    aq,
    sq,
    uq,
    cq,
    lq,
    fq,
    gh,
    dq,
    pq,
    vq,
    mh = me(() => {
      "use strict";
      ur = de(Jt());
      Ue();
      ({
        HTML_ELEMENT: hB,
        PLAIN_OBJECT: eq,
        ABSTRACT_NODE: yB,
        CONFIG_X_VALUE: tq,
        CONFIG_Y_VALUE: rq,
        CONFIG_Z_VALUE: nq,
        CONFIG_VALUE: iq,
        CONFIG_X_UNIT: oq,
        CONFIG_Y_UNIT: aq,
        CONFIG_Z_UNIT: sq,
        CONFIG_UNIT: uq,
      } = Ce),
        ({
          IX2_SESSION_STOPPED: cq,
          IX2_INSTANCE_ADDED: lq,
          IX2_ELEMENT_STATE_CHANGED: fq,
        } = we),
        (gh = {}),
        (dq = "refState"),
        (pq = (e = gh, t = {}) => {
          switch (t.type) {
            case cq:
              return gh;
            case lq: {
              let {
                  elementId: r,
                  element: n,
                  origin: i,
                  actionItem: o,
                  refType: a,
                } = t.payload,
                { actionTypeId: s } = o,
                u = e;
              return (
                (0, ur.getIn)(u, [r, n]) !== n && (u = hh(u, n, a, r, o)),
                Ra(u, r, s, i, o)
              );
            }
            case fq: {
              let {
                elementId: r,
                actionTypeId: n,
                current: i,
                actionItem: o,
              } = t.payload;
              return Ra(e, r, n, i, o);
            }
            default:
              return e;
          }
        });
      vq = [
        [tq, oq],
        [rq, aq],
        [nq, sq],
        [iq, uq],
      ];
    });
  var Eh = c((Ae) => {
    "use strict";
    Object.defineProperty(Ae, "__esModule", { value: !0 });
    Ae.renderPlugin =
      Ae.getPluginOrigin =
      Ae.getPluginDuration =
      Ae.getPluginDestination =
      Ae.getPluginConfig =
      Ae.createPluginInstance =
      Ae.clearPlugin =
        void 0;
    var hq = (e) => e.value;
    Ae.getPluginConfig = hq;
    var yq = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    Ae.getPluginDuration = yq;
    var mq = (e) => e || { value: 0 };
    Ae.getPluginOrigin = mq;
    var Eq = (e) => ({ value: e.value });
    Ae.getPluginDestination = Eq;
    var _q = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    Ae.createPluginInstance = _q;
    var bq = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    Ae.renderPlugin = bq;
    var Tq = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    Ae.clearPlugin = Tq;
  });
  var bh = c((Se) => {
    "use strict";
    Object.defineProperty(Se, "__esModule", { value: !0 });
    Se.renderPlugin =
      Se.getPluginOrigin =
      Se.getPluginDuration =
      Se.getPluginDestination =
      Se.getPluginConfig =
      Se.createPluginInstance =
      Se.clearPlugin =
        void 0;
    var Iq = (e) => document.querySelector(`[data-w-id="${e}"]`),
      wq = () => window.Webflow.require("spline"),
      Oq = (e, t) => e.filter((r) => !t.includes(r)),
      xq = (e, t) => e.value[t];
    Se.getPluginConfig = xq;
    var Aq = () => null;
    Se.getPluginDuration = Aq;
    var _h = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      Sq = (e, t) => {
        let r = t.config.value,
          n = Object.keys(r);
        if (e) {
          let o = Object.keys(e),
            a = Oq(n, o);
          return a.length ? a.reduce((u, d) => ((u[d] = _h[d]), u), e) : e;
        }
        return n.reduce((o, a) => ((o[a] = _h[a]), o), {});
      };
    Se.getPluginOrigin = Sq;
    var Rq = (e) => e.value;
    Se.getPluginDestination = Rq;
    var Cq = (e, t) => {
      var r, n;
      let i =
        t == null ||
        (r = t.config) === null ||
        r === void 0 ||
        (n = r.target) === null ||
        n === void 0
          ? void 0
          : n.pluginElement;
      return i ? Iq(i) : null;
    };
    Se.createPluginInstance = Cq;
    var Lq = (e, t, r) => {
      let n = wq(),
        i = n.getInstance(e),
        o = r.config.target.objectId,
        a = (s) => {
          if (!s) throw new Error("Invalid spline app passed to renderSpline");
          let u = o && s.findObjectById(o);
          if (!u) return;
          let { PLUGIN_SPLINE: d } = t;
          d.positionX != null && (u.position.x = d.positionX),
            d.positionY != null && (u.position.y = d.positionY),
            d.positionZ != null && (u.position.z = d.positionZ),
            d.rotationX != null && (u.rotation.x = d.rotationX),
            d.rotationY != null && (u.rotation.y = d.rotationY),
            d.rotationZ != null && (u.rotation.z = d.rotationZ),
            d.scaleX != null && (u.scale.x = d.scaleX),
            d.scaleY != null && (u.scale.y = d.scaleY),
            d.scaleZ != null && (u.scale.z = d.scaleZ);
        };
      i ? a(i.spline) : n.setLoadHandler(e, a);
    };
    Se.renderPlugin = Lq;
    var Nq = () => null;
    Se.clearPlugin = Nq;
  });
  var Ih = c((Oe) => {
    "use strict";
    Object.defineProperty(Oe, "__esModule", { value: !0 });
    Oe.getPluginOrigin =
      Oe.getPluginDuration =
      Oe.getPluginDestination =
      Oe.getPluginConfig =
      Oe.createPluginInstance =
      Oe.clearPlugin =
        void 0;
    Oe.normalizeColor = Th;
    Oe.renderPlugin = void 0;
    function Th(e) {
      let t,
        r,
        n,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase();
      if (o.startsWith("#")) {
        let a = o.substring(1);
        a.length === 3
          ? ((t = parseInt(a[0] + a[0], 16)),
            (r = parseInt(a[1] + a[1], 16)),
            (n = parseInt(a[2] + a[2], 16)))
          : a.length === 6 &&
            ((t = parseInt(a.substring(0, 2), 16)),
            (r = parseInt(a.substring(2, 4), 16)),
            (n = parseInt(a.substring(4, 6), 16)));
      } else if (o.startsWith("rgba")) {
        let a = o.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(a[0], 10)),
          (r = parseInt(a[1], 10)),
          (n = parseInt(a[2], 10)),
          (i = parseFloat(a[3]));
      } else if (o.startsWith("rgb")) {
        let a = o.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(a[0], 10)),
          (r = parseInt(a[1], 10)),
          (n = parseInt(a[2], 10));
      } else if (o.startsWith("hsla")) {
        let a = o.match(/hsla\(([^)]+)\)/)[1].split(","),
          s = parseFloat(a[0]),
          u = parseFloat(a[1].replace("%", "")) / 100,
          d = parseFloat(a[2].replace("%", "")) / 100;
        i = parseFloat(a[3]);
        let g = (1 - Math.abs(2 * d - 1)) * u,
          v = g * (1 - Math.abs(((s / 60) % 2) - 1)),
          E = d - g / 2,
          m,
          T,
          w;
        s >= 0 && s < 60
          ? ((m = g), (T = v), (w = 0))
          : s >= 60 && s < 120
          ? ((m = v), (T = g), (w = 0))
          : s >= 120 && s < 180
          ? ((m = 0), (T = g), (w = v))
          : s >= 180 && s < 240
          ? ((m = 0), (T = v), (w = g))
          : s >= 240 && s < 300
          ? ((m = v), (T = 0), (w = g))
          : ((m = g), (T = 0), (w = v)),
          (t = Math.round((m + E) * 255)),
          (r = Math.round((T + E) * 255)),
          (n = Math.round((w + E) * 255));
      } else if (o.startsWith("hsl")) {
        let a = o.match(/hsl\(([^)]+)\)/)[1].split(","),
          s = parseFloat(a[0]),
          u = parseFloat(a[1].replace("%", "")) / 100,
          d = parseFloat(a[2].replace("%", "")) / 100,
          g = (1 - Math.abs(2 * d - 1)) * u,
          v = g * (1 - Math.abs(((s / 60) % 2) - 1)),
          E = d - g / 2,
          m,
          T,
          w;
        s >= 0 && s < 60
          ? ((m = g), (T = v), (w = 0))
          : s >= 60 && s < 120
          ? ((m = v), (T = g), (w = 0))
          : s >= 120 && s < 180
          ? ((m = 0), (T = g), (w = v))
          : s >= 180 && s < 240
          ? ((m = 0), (T = v), (w = g))
          : s >= 240 && s < 300
          ? ((m = v), (T = 0), (w = g))
          : ((m = g), (T = 0), (w = v)),
          (t = Math.round((m + E) * 255)),
          (r = Math.round((T + E) * 255)),
          (n = Math.round((w + E) * 255));
      }
      return (
        (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n)) && `${e}`,
        { red: t, green: r, blue: n, alpha: i }
      );
    }
    var Pq = (e, t) => e.value[t];
    Oe.getPluginConfig = Pq;
    var Mq = () => null;
    Oe.getPluginDuration = Mq;
    var qq = (e, t) => {
      if (e) return e;
      let r = t.config.value,
        n = t.config.target.objectId,
        i = getComputedStyle(document.documentElement).getPropertyValue(n);
      if (r.size != null) return { size: parseInt(i, 10) };
      if (r.red != null && r.green != null && r.blue != null) return Th(i);
    };
    Oe.getPluginOrigin = qq;
    var Dq = (e) => e.value;
    Oe.getPluginDestination = Dq;
    var Fq = () => null;
    Oe.createPluginInstance = Fq;
    var kq = (e, t, r) => {
      let n = r.config.target.objectId,
        i = r.config.value.unit,
        { PLUGIN_VARIABLE: o } = t,
        { size: a, red: s, green: u, blue: d, alpha: g } = o,
        v;
      a != null && (v = a + i),
        s != null &&
          d != null &&
          u != null &&
          g != null &&
          (v = `rgba(${s}, ${u}, ${d}, ${g})`),
        v != null && document.documentElement.style.setProperty(n, v);
    };
    Oe.renderPlugin = kq;
    var Gq = (e, t) => {
      let r = t.config.target.objectId;
      document.documentElement.style.removeProperty(r);
    };
    Oe.clearPlugin = Gq;
  });
  var wh = c((ri) => {
    "use strict";
    var La = gn().default;
    Object.defineProperty(ri, "__esModule", { value: !0 });
    ri.pluginMethodMap = void 0;
    var Ca = (Ue(), it(Cf)),
      Uq = La(Eh()),
      Vq = La(bh()),
      Wq = La(Ih()),
      bB = (ri.pluginMethodMap = new Map([
        [Ca.ActionTypeConsts.PLUGIN_LOTTIE, { ...Uq }],
        [Ca.ActionTypeConsts.PLUGIN_SPLINE, { ...Vq }],
        [Ca.ActionTypeConsts.PLUGIN_VARIABLE, { ...Wq }],
      ]));
  });
  var Oh = {};
  Ge(Oh, {
    clearPlugin: () => Fa,
    createPluginInstance: () => Xq,
    getPluginConfig: () => Pa,
    getPluginDestination: () => qa,
    getPluginDuration: () => Hq,
    getPluginOrigin: () => Ma,
    isPluginType: () => kt,
    renderPlugin: () => Da,
  });
  function kt(e) {
    return Na.pluginMethodMap.has(e);
  }
  var Na,
    Gt,
    Pa,
    Ma,
    Hq,
    qa,
    Xq,
    Da,
    Fa,
    ka = me(() => {
      "use strict";
      Jn();
      Na = de(wh());
      (Gt = (e) => (t) => {
        if (!et) return () => null;
        let r = Na.pluginMethodMap.get(t);
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      }),
        (Pa = Gt("getPluginConfig")),
        (Ma = Gt("getPluginOrigin")),
        (Hq = Gt("getPluginDuration")),
        (qa = Gt("getPluginDestination")),
        (Xq = Gt("createPluginInstance")),
        (Da = Gt("renderPlugin")),
        (Fa = Gt("clearPlugin"));
    });
  var Ah = c((wB, xh) => {
    function Bq(e, t) {
      return e == null || e !== e ? t : e;
    }
    xh.exports = Bq;
  });
  var Rh = c((OB, Sh) => {
    function jq(e, t, r, n) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
      return r;
    }
    Sh.exports = jq;
  });
  var Lh = c((xB, Ch) => {
    function zq(e) {
      return function (t, r, n) {
        for (var i = -1, o = Object(t), a = n(t), s = a.length; s--; ) {
          var u = a[e ? s : ++i];
          if (r(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    Ch.exports = zq;
  });
  var Ph = c((AB, Nh) => {
    var Kq = Lh(),
      Yq = Kq();
    Nh.exports = Yq;
  });
  var Ga = c((SB, Mh) => {
    var $q = Ph(),
      Qq = Hr();
    function Zq(e, t) {
      return e && $q(e, t, Qq);
    }
    Mh.exports = Zq;
  });
  var Dh = c((RB, qh) => {
    var Jq = Dt();
    function e1(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!Jq(r)) return e(r, n);
        for (
          var i = r.length, o = t ? i : -1, a = Object(r);
          (t ? o-- : ++o < i) && n(a[o], o, a) !== !1;

        );
        return r;
      };
    }
    qh.exports = e1;
  });
  var Ua = c((CB, Fh) => {
    var t1 = Ga(),
      r1 = Dh(),
      n1 = r1(t1);
    Fh.exports = n1;
  });
  var Gh = c((LB, kh) => {
    function i1(e, t, r, n, i) {
      return (
        i(e, function (o, a, s) {
          r = n ? ((n = !1), o) : t(r, o, a, s);
        }),
        r
      );
    }
    kh.exports = i1;
  });
  var Vh = c((NB, Uh) => {
    var o1 = Rh(),
      a1 = Ua(),
      s1 = xt(),
      u1 = Gh(),
      c1 = xe();
    function l1(e, t, r) {
      var n = c1(e) ? o1 : u1,
        i = arguments.length < 3;
      return n(e, s1(t, 4), r, i, a1);
    }
    Uh.exports = l1;
  });
  var Hh = c((PB, Wh) => {
    var f1 = Ta(),
      d1 = xt(),
      p1 = Ia(),
      v1 = Math.max,
      g1 = Math.min;
    function h1(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = n - 1;
      return (
        r !== void 0 &&
          ((i = p1(r)), (i = r < 0 ? v1(n + i, 0) : g1(i, n - 1))),
        f1(e, d1(t, 3), i, !0)
      );
    }
    Wh.exports = h1;
  });
  var Bh = c((MB, Xh) => {
    var y1 = ba(),
      m1 = Hh(),
      E1 = y1(m1);
    Xh.exports = E1;
  });
  function jh(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function b1(e, t) {
    if (jh(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let r = Object.keys(e),
      n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (let i = 0; i < r.length; i++)
      if (!_1.call(t, r[i]) || !jh(e[r[i]], t[r[i]])) return !1;
    return !0;
  }
  var _1,
    Va,
    zh = me(() => {
      "use strict";
      _1 = Object.prototype.hasOwnProperty;
      Va = b1;
    });
  var ly = {};
  Ge(ly, {
    cleanupHTMLElement: () => mD,
    clearAllStyles: () => yD,
    clearObjectCache: () => k1,
    getActionListProgress: () => _D,
    getAffectedElements: () => ja,
    getComputedStyle: () => j1,
    getDestinationValues: () => J1,
    getElementId: () => W1,
    getInstanceId: () => U1,
    getInstanceOrigin: () => Y1,
    getItemConfigByKey: () => Z1,
    getMaxDurationItemIndex: () => cy,
    getNamespacedParameterId: () => ID,
    getRenderType: () => ay,
    getStyleProp: () => eD,
    mediaQueriesEqual: () => OD,
    observeStore: () => B1,
    reduceListToGroup: () => bD,
    reifyState: () => H1,
    renderHTMLElement: () => tD,
    shallowEqual: () => Va,
    shouldAllowMediaQuery: () => wD,
    shouldNamespaceEventParameter: () => TD,
    stringifyTarget: () => xD,
  });
  function k1() {
    ni.clear();
  }
  function U1() {
    return "i" + G1++;
  }
  function W1(e, t) {
    for (let r in e) {
      let n = e[r];
      if (n && n.ref === t) return n.id;
    }
    return "e" + V1++;
  }
  function H1({ events: e, actionLists: t, site: r } = {}) {
    let n = (0, si.default)(
        e,
        (a, s) => {
          let { eventTypeId: u } = s;
          return a[u] || (a[u] = {}), (a[u][s.id] = s), a;
        },
        {}
      ),
      i = r && r.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((a) => a.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: n,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function B1({ store: e, select: t, onChange: r, comparator: n = X1 }) {
    let { getState: i, subscribe: o } = e,
      a = o(u),
      s = t(i());
    function u() {
      let d = t(i());
      if (d == null) {
        a();
        return;
      }
      n(d, s) || ((s = d), r(s, e));
    }
    return a;
  }
  function $h(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: a,
        useEventTarget: s,
      } = e;
      return {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: a,
        useEventTarget: s,
      };
    }
    return {};
  }
  function ja({
    config: e,
    event: t,
    eventTarget: r,
    elementRoot: n,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (A, y) =>
          A.concat(
            ja({
              config: { target: y },
              event: t,
              eventTarget: r,
              elementRoot: n,
              elementApi: i,
            })
          ),
        []
      );
    let {
        getValidDocument: a,
        getQuerySelector: s,
        queryDocument: u,
        getChildElements: d,
        getSiblingElements: g,
        matchSelector: v,
        elementContains: E,
        isSiblingNode: m,
      } = i,
      { target: T } = e;
    if (!T) return [];
    let {
      id: w,
      objectId: k,
      selector: S,
      selectorGuids: N,
      appliesTo: C,
      useEventTarget: M,
    } = $h(T);
    if (k) return [ni.has(k) ? ni.get(k) : ni.set(k, {}).get(k)];
    if (C === jo.PAGE) {
      let A = a(w);
      return A ? [A] : [];
    }
    let q = (t?.action?.config?.affectedElements ?? {})[w || S] || {},
      z = !!(q.id || q.selector),
      K,
      Z,
      te,
      H = t && s($h(t.target));
    if (
      (z
        ? ((K = q.limitAffectedElements), (Z = H), (te = s(q)))
        : (Z = te = s({ id: w, selector: S, selectorGuids: N })),
      t && M)
    ) {
      let A = r && (te || M === !0) ? [r] : u(H);
      if (te) {
        if (M === q1) return u(te).filter((y) => A.some((P) => E(y, P)));
        if (M === Kh) return u(te).filter((y) => A.some((P) => E(P, y)));
        if (M === Yh) return u(te).filter((y) => A.some((P) => m(P, y)));
      }
      return A;
    }
    return Z == null || te == null
      ? []
      : et && n
      ? u(te).filter((A) => n.contains(A))
      : K === Kh
      ? u(Z, te)
      : K === M1
      ? d(u(Z)).filter(v(te))
      : K === Yh
      ? g(u(Z)).filter(v(te))
      : u(te);
  }
  function j1({ element: e, actionItem: t }) {
    if (!et) return {};
    let { actionTypeId: r } = t;
    switch (r) {
      case pr:
      case vr:
      case gr:
      case hr:
      case ci:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function Y1(e, t = {}, r = {}, n, i) {
    let { getStyle: o } = i,
      { actionTypeId: a } = n;
    if (kt(a)) return Ma(a)(t[a], n);
    switch (n.actionTypeId) {
      case lr:
      case fr:
      case dr:
      case Jr:
        return t[n.actionTypeId] || za[n.actionTypeId];
      case en:
        return z1(t[n.actionTypeId], n.config.filters);
      case tn:
        return K1(t[n.actionTypeId], n.config.fontVariations);
      case ny:
        return { value: (0, yt.default)(parseFloat(o(e, oi)), 1) };
      case pr: {
        let s = o(e, lt),
          u = o(e, ft),
          d,
          g;
        return (
          n.config.widthUnit === St
            ? (d = Qh.test(s) ? parseFloat(s) : parseFloat(r.width))
            : (d = (0, yt.default)(parseFloat(s), parseFloat(r.width))),
          n.config.heightUnit === St
            ? (g = Qh.test(u) ? parseFloat(u) : parseFloat(r.height))
            : (g = (0, yt.default)(parseFloat(u), parseFloat(r.height))),
          { widthValue: d, heightValue: g }
        );
      }
      case vr:
      case gr:
      case hr:
        return vD({
          element: e,
          actionTypeId: n.actionTypeId,
          computedStyle: r,
          getStyle: o,
        });
      case ci:
        return { value: (0, yt.default)(o(e, ai), r.display) };
      case F1:
        return t[n.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function J1({ element: e, actionItem: t, elementApi: r }) {
    if (kt(t.actionTypeId)) return qa(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case lr:
      case fr:
      case dr:
      case Jr: {
        let { xValue: n, yValue: i, zValue: o } = t.config;
        return { xValue: n, yValue: i, zValue: o };
      }
      case pr: {
        let { getStyle: n, setStyle: i, getProperty: o } = r,
          { widthUnit: a, heightUnit: s } = t.config,
          { widthValue: u, heightValue: d } = t.config;
        if (!et) return { widthValue: u, heightValue: d };
        if (a === St) {
          let g = n(e, lt);
          i(e, lt, ""), (u = o(e, "offsetWidth")), i(e, lt, g);
        }
        if (s === St) {
          let g = n(e, ft);
          i(e, ft, ""), (d = o(e, "offsetHeight")), i(e, ft, g);
        }
        return { widthValue: u, heightValue: d };
      }
      case vr:
      case gr:
      case hr: {
        let { rValue: n, gValue: i, bValue: o, aValue: a } = t.config;
        return { rValue: n, gValue: i, bValue: o, aValue: a };
      }
      case en:
        return t.config.filters.reduce($1, {});
      case tn:
        return t.config.fontVariations.reduce(Q1, {});
      default: {
        let { value: n } = t.config;
        return { value: n };
      }
    }
  }
  function ay(e) {
    if (/^TRANSFORM_/.test(e)) return ty;
    if (/^STYLE_/.test(e)) return Xa;
    if (/^GENERAL_/.test(e)) return Ha;
    if (/^PLUGIN_/.test(e)) return ry;
  }
  function eD(e, t) {
    return e === Xa ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function tD(e, t, r, n, i, o, a, s, u) {
    switch (s) {
      case ty:
        return aD(e, t, r, i, a);
      case Xa:
        return gD(e, t, r, i, o, a);
      case Ha:
        return hD(e, i, a);
      case ry: {
        let { actionTypeId: d } = i;
        if (kt(d)) return Da(d)(u, t, i);
      }
    }
  }
  function aD(e, t, r, n, i) {
    let o = oD
        .map((s) => {
          let u = za[s],
            {
              xValue: d = u.xValue,
              yValue: g = u.yValue,
              zValue: v = u.zValue,
              xUnit: E = "",
              yUnit: m = "",
              zUnit: T = "",
            } = t[s] || {};
          switch (s) {
            case lr:
              return `${w1}(${d}${E}, ${g}${m}, ${v}${T})`;
            case fr:
              return `${O1}(${d}${E}, ${g}${m}, ${v}${T})`;
            case dr:
              return `${x1}(${d}${E}) ${A1}(${g}${m}) ${S1}(${v}${T})`;
            case Jr:
              return `${R1}(${d}${E}, ${g}${m})`;
            default:
              return "";
          }
        })
        .join(" "),
      { setStyle: a } = i;
    Ut(e, At, i), a(e, At, o), cD(n, r) && a(e, Zn, C1);
  }
  function sD(e, t, r, n) {
    let i = (0, si.default)(t, (a, s, u) => `${a} ${u}(${s}${iD(u, r)})`, ""),
      { setStyle: o } = n;
    Ut(e, $r, n), o(e, $r, i);
  }
  function uD(e, t, r, n) {
    let i = (0, si.default)(
        t,
        (a, s, u) => (a.push(`"${u}" ${s}`), a),
        []
      ).join(", "),
      { setStyle: o } = n;
    Ut(e, Qr, n), o(e, Qr, i);
  }
  function cD({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
    return (
      (e === lr && n !== void 0) ||
      (e === fr && n !== void 0) ||
      (e === dr && (t !== void 0 || r !== void 0))
    );
  }
  function pD(e, t) {
    let r = e.exec(t);
    return r ? r[1] : "";
  }
  function vD({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
    let i = Ba[t],
      o = n(e, i),
      a = fD.test(o) ? o : r[i],
      s = pD(dD, a).split(Zr);
    return {
      rValue: (0, yt.default)(parseInt(s[0], 10), 255),
      gValue: (0, yt.default)(parseInt(s[1], 10), 255),
      bValue: (0, yt.default)(parseInt(s[2], 10), 255),
      aValue: (0, yt.default)(parseFloat(s[3]), 1),
    };
  }
  function gD(e, t, r, n, i, o) {
    let { setStyle: a } = o;
    switch (n.actionTypeId) {
      case pr: {
        let { widthUnit: s = "", heightUnit: u = "" } = n.config,
          { widthValue: d, heightValue: g } = r;
        d !== void 0 && (s === St && (s = "px"), Ut(e, lt, o), a(e, lt, d + s)),
          g !== void 0 &&
            (u === St && (u = "px"), Ut(e, ft, o), a(e, ft, g + u));
        break;
      }
      case en: {
        sD(e, r, n.config, o);
        break;
      }
      case tn: {
        uD(e, r, n.config, o);
        break;
      }
      case vr:
      case gr:
      case hr: {
        let s = Ba[n.actionTypeId],
          u = Math.round(r.rValue),
          d = Math.round(r.gValue),
          g = Math.round(r.bValue),
          v = r.aValue;
        Ut(e, s, o),
          a(e, s, v >= 1 ? `rgb(${u},${d},${g})` : `rgba(${u},${d},${g},${v})`);
        break;
      }
      default: {
        let { unit: s = "" } = n.config;
        Ut(e, i, o), a(e, i, r.value + s);
        break;
      }
    }
  }
  function hD(e, t, r) {
    let { setStyle: n } = r;
    switch (t.actionTypeId) {
      case ci: {
        let { value: i } = t.config;
        i === L1 && et ? n(e, ai, Oa) : n(e, ai, i);
        return;
      }
    }
  }
  function Ut(e, t, r) {
    if (!et) return;
    let n = oy[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      a = i(e, cr);
    if (!a) {
      o(e, cr, n);
      return;
    }
    let s = a.split(Zr).map(iy);
    s.indexOf(n) === -1 && o(e, cr, s.concat(n).join(Zr));
  }
  function sy(e, t, r) {
    if (!et) return;
    let n = oy[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      a = i(e, cr);
    !a ||
      a.indexOf(n) === -1 ||
      o(
        e,
        cr,
        a
          .split(Zr)
          .map(iy)
          .filter((s) => s !== n)
          .join(Zr)
      );
  }
  function yD({ store: e, elementApi: t }) {
    let { ixData: r } = e.getState(),
      { events: n = {}, actionLists: i = {} } = r;
    Object.keys(n).forEach((o) => {
      let a = n[o],
        { config: s } = a.action,
        { actionListId: u } = s,
        d = i[u];
      d && Zh({ actionList: d, event: a, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        Zh({ actionList: i[o], elementApi: t });
      });
  }
  function Zh({ actionList: e = {}, event: t, elementApi: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e;
    n &&
      n.forEach((o) => {
        Jh({ actionGroup: o, event: t, elementApi: r });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: a } = o;
          a.forEach((s) => {
            Jh({ actionGroup: s, event: t, elementApi: r });
          });
        });
  }
  function Jh({ actionGroup: e, event: t, elementApi: r }) {
    let { actionItems: n } = e;
    n.forEach((i) => {
      let { actionTypeId: o, config: a } = i,
        s;
      kt(o)
        ? (s = (u) => Fa(o)(u, i))
        : (s = uy({ effect: ED, actionTypeId: o, elementApi: r })),
        ja({ config: a, event: t, elementApi: r }).forEach(s);
    });
  }
  function mD(e, t, r) {
    let { setStyle: n, getStyle: i } = r,
      { actionTypeId: o } = t;
    if (o === pr) {
      let { config: a } = t;
      a.widthUnit === St && n(e, lt, ""), a.heightUnit === St && n(e, ft, "");
    }
    i(e, cr) && uy({ effect: sy, actionTypeId: o, elementApi: r })(e);
  }
  function ED(e, t, r) {
    let { setStyle: n } = r;
    sy(e, t, r), n(e, t, ""), t === At && n(e, Zn, "");
  }
  function cy(e) {
    let t = 0,
      r = 0;
    return (
      e.forEach((n, i) => {
        let { config: o } = n,
          a = o.delay + o.duration;
        a >= t && ((t = a), (r = i));
      }),
      r
    );
  }
  function _D(e, t) {
    let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      a = 0,
      s = 0;
    return (
      r.forEach((u, d) => {
        if (n && d === 0) return;
        let { actionItems: g } = u,
          v = g[cy(g)],
          { config: E, actionTypeId: m } = v;
        i.id === v.id && (s = a + o);
        let T = ay(m) === Ha ? 0 : E.duration;
        a += E.delay + T;
      }),
      a > 0 ? Yr(s / a) : 0
    );
  }
  function bD({ actionList: e, actionItemId: t, rawData: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e,
      o = [],
      a = (s) => (
        o.push((0, ui.mergeIn)(s, ["config"], { delay: 0, duration: 0 })),
        s.id === t
      );
    return (
      n && n.some(({ actionItems: s }) => s.some(a)),
      i &&
        i.some((s) => {
          let { continuousActionGroups: u } = s;
          return u.some(({ actionItems: d }) => d.some(a));
        }),
      (0, ui.setIn)(r, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function TD(e, { basedOn: t }) {
    return (
      (e === Je.SCROLLING_IN_VIEW && (t === ut.ELEMENT || t == null)) ||
      (e === Je.MOUSE_MOVE && t === ut.ELEMENT)
    );
  }
  function ID(e, t) {
    return e + D1 + t;
  }
  function wD(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function OD(e, t) {
    return Va(e && e.sort(), t && t.sort());
  }
  function xD(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + Wa + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
    return t + Wa + r + Wa + n;
  }
  var yt,
    si,
    ii,
    ui,
    T1,
    I1,
    w1,
    O1,
    x1,
    A1,
    S1,
    R1,
    C1,
    L1,
    oi,
    $r,
    Qr,
    lt,
    ft,
    ey,
    N1,
    P1,
    Kh,
    M1,
    Yh,
    q1,
    ai,
    cr,
    St,
    Zr,
    D1,
    Wa,
    ty,
    Ha,
    Xa,
    ry,
    lr,
    fr,
    dr,
    Jr,
    ny,
    en,
    tn,
    pr,
    vr,
    gr,
    hr,
    ci,
    F1,
    iy,
    Ba,
    oy,
    ni,
    G1,
    V1,
    X1,
    Qh,
    z1,
    K1,
    $1,
    Q1,
    Z1,
    za,
    rD,
    nD,
    iD,
    oD,
    lD,
    fD,
    dD,
    uy,
    fy = me(() => {
      "use strict";
      (yt = de(Ah())), (si = de(Vh())), (ii = de(Bh())), (ui = de(Jt()));
      Ue();
      zh();
      Sa();
      ka();
      Jn();
      ({
        BACKGROUND: T1,
        TRANSFORM: I1,
        TRANSLATE_3D: w1,
        SCALE_3D: O1,
        ROTATE_X: x1,
        ROTATE_Y: A1,
        ROTATE_Z: S1,
        SKEW: R1,
        PRESERVE_3D: C1,
        FLEX: L1,
        OPACITY: oi,
        FILTER: $r,
        FONT_VARIATION_SETTINGS: Qr,
        WIDTH: lt,
        HEIGHT: ft,
        BACKGROUND_COLOR: ey,
        BORDER_COLOR: N1,
        COLOR: P1,
        CHILDREN: Kh,
        IMMEDIATE_CHILDREN: M1,
        SIBLINGS: Yh,
        PARENT: q1,
        DISPLAY: ai,
        WILL_CHANGE: cr,
        AUTO: St,
        COMMA_DELIMITER: Zr,
        COLON_DELIMITER: D1,
        BAR_DELIMITER: Wa,
        RENDER_TRANSFORM: ty,
        RENDER_GENERAL: Ha,
        RENDER_STYLE: Xa,
        RENDER_PLUGIN: ry,
      } = Ce),
        ({
          TRANSFORM_MOVE: lr,
          TRANSFORM_SCALE: fr,
          TRANSFORM_ROTATE: dr,
          TRANSFORM_SKEW: Jr,
          STYLE_OPACITY: ny,
          STYLE_FILTER: en,
          STYLE_FONT_VARIATION: tn,
          STYLE_SIZE: pr,
          STYLE_BACKGROUND_COLOR: vr,
          STYLE_BORDER: gr,
          STYLE_TEXT_COLOR: hr,
          GENERAL_DISPLAY: ci,
          OBJECT_VALUE: F1,
        } = Xe),
        (iy = (e) => e.trim()),
        (Ba = Object.freeze({ [vr]: ey, [gr]: N1, [hr]: P1 })),
        (oy = Object.freeze({
          [At]: I1,
          [ey]: T1,
          [oi]: oi,
          [$r]: $r,
          [lt]: lt,
          [ft]: ft,
          [Qr]: Qr,
        })),
        (ni = new Map());
      G1 = 1;
      V1 = 1;
      X1 = (e, t) => e === t;
      (Qh = /px/),
        (z1 = (e, t) =>
          t.reduce(
            (r, n) => (r[n.type] == null && (r[n.type] = rD[n.type]), r),
            e || {}
          )),
        (K1 = (e, t) =>
          t.reduce(
            (r, n) => (
              r[n.type] == null &&
                (r[n.type] = nD[n.type] || n.defaultValue || 0),
              r
            ),
            e || {}
          ));
      ($1 = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (Q1 = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (Z1 = (e, t, r) => {
          if (kt(e)) return Pa(e)(r, t);
          switch (e) {
            case en: {
              let n = (0, ii.default)(r.filters, ({ type: i }) => i === t);
              return n ? n.value : 0;
            }
            case tn: {
              let n = (0, ii.default)(
                r.fontVariations,
                ({ type: i }) => i === t
              );
              return n ? n.value : 0;
            }
            default:
              return r[t];
          }
        });
      (za = {
        [lr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [fr]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [dr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Jr]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (rD = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (nD = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (iD = (e, t) => {
          let r = (0, ii.default)(t.filters, ({ type: n }) => n === e);
          if (r && r.unit) return r.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (oD = Object.keys(za));
      (lD = "\\(([^)]+)\\)"), (fD = /^rgb/), (dD = RegExp(`rgba?${lD}`));
      uy =
        ({ effect: e, actionTypeId: t, elementApi: r }) =>
        (n) => {
          switch (t) {
            case lr:
            case fr:
            case dr:
            case Jr:
              e(n, At, r);
              break;
            case en:
              e(n, $r, r);
              break;
            case tn:
              e(n, Qr, r);
              break;
            case ny:
              e(n, oi, r);
              break;
            case pr:
              e(n, lt, r), e(n, ft, r);
              break;
            case vr:
            case gr:
            case hr:
              e(n, Ba[t], r);
              break;
            case ci:
              e(n, ai, r);
              break;
          }
        };
    });
  var Vt = c((qe) => {
    "use strict";
    var yr = gn().default;
    Object.defineProperty(qe, "__esModule", { value: !0 });
    qe.IX2VanillaUtils =
      qe.IX2VanillaPlugins =
      qe.IX2ElementsReducer =
      qe.IX2Easings =
      qe.IX2EasingUtils =
      qe.IX2BrowserSupport =
        void 0;
    var AD = yr((Jn(), it(sh)));
    qe.IX2BrowserSupport = AD;
    var SD = yr((Aa(), it(Kr)));
    qe.IX2Easings = SD;
    var RD = yr((Sa(), it(vh)));
    qe.IX2EasingUtils = RD;
    var CD = yr((mh(), it(yh)));
    qe.IX2ElementsReducer = CD;
    var LD = yr((ka(), it(Oh)));
    qe.IX2VanillaPlugins = LD;
    var ND = yr((fy(), it(ly)));
    qe.IX2VanillaUtils = ND;
  });
  var fi,
    mt,
    PD,
    MD,
    qD,
    DD,
    FD,
    kD,
    li,
    dy,
    GD,
    UD,
    Ka,
    VD,
    WD,
    HD,
    XD,
    py,
    vy = me(() => {
      "use strict";
      Ue();
      (fi = de(Vt())),
        (mt = de(Jt())),
        ({
          IX2_RAW_DATA_IMPORTED: PD,
          IX2_SESSION_STOPPED: MD,
          IX2_INSTANCE_ADDED: qD,
          IX2_INSTANCE_STARTED: DD,
          IX2_INSTANCE_REMOVED: FD,
          IX2_ANIMATION_FRAME_CHANGED: kD,
        } = we),
        ({
          optimizeFloat: li,
          applyEasing: dy,
          createBezierEasing: GD,
        } = fi.IX2EasingUtils),
        ({ RENDER_GENERAL: UD } = Ce),
        ({
          getItemConfigByKey: Ka,
          getRenderType: VD,
          getStyleProp: WD,
        } = fi.IX2VanillaUtils),
        (HD = (e, t) => {
          let {
              position: r,
              parameterId: n,
              actionGroups: i,
              destinationKeys: o,
              smoothing: a,
              restingValue: s,
              actionTypeId: u,
              customEasingFn: d,
              skipMotion: g,
              skipToValue: v,
            } = e,
            { parameters: E } = t.payload,
            m = Math.max(1 - a, 0.01),
            T = E[n];
          T == null && ((m = 1), (T = s));
          let w = Math.max(T, 0) || 0,
            k = li(w - r),
            S = g ? v : li(r + k * m),
            N = S * 100;
          if (S === r && e.current) return e;
          let C, M, F, q;
          for (let K = 0, { length: Z } = i; K < Z; K++) {
            let { keyframe: te, actionItems: H } = i[K];
            if ((K === 0 && (C = H[0]), N >= te)) {
              C = H[0];
              let A = i[K + 1],
                y = A && N !== te;
              (M = y ? A.actionItems[0] : null),
                y && ((F = te / 100), (q = (A.keyframe - te) / 100));
            }
          }
          let z = {};
          if (C && !M)
            for (let K = 0, { length: Z } = o; K < Z; K++) {
              let te = o[K];
              z[te] = Ka(u, te, C.config);
            }
          else if (C && M && F !== void 0 && q !== void 0) {
            let K = (S - F) / q,
              Z = C.config.easing,
              te = dy(Z, K, d);
            for (let H = 0, { length: A } = o; H < A; H++) {
              let y = o[H],
                P = Ka(u, y, C.config),
                ee = (Ka(u, y, M.config) - P) * te + P;
              z[y] = ee;
            }
          }
          return (0, mt.merge)(e, { position: S, current: z });
        }),
        (XD = (e, t) => {
          let {
              active: r,
              origin: n,
              start: i,
              immediate: o,
              renderType: a,
              verbose: s,
              actionItem: u,
              destination: d,
              destinationKeys: g,
              pluginDuration: v,
              instanceDelay: E,
              customEasingFn: m,
              skipMotion: T,
            } = e,
            w = u.config.easing,
            { duration: k, delay: S } = u.config;
          v != null && (k = v),
            (S = E ?? S),
            a === UD ? (k = 0) : (o || T) && (k = S = 0);
          let { now: N } = t.payload;
          if (r && n) {
            let C = N - (i + S);
            if (s) {
              let K = N - i,
                Z = k + S,
                te = li(Math.min(Math.max(0, K / Z), 1));
              e = (0, mt.set)(e, "verboseTimeElapsed", Z * te);
            }
            if (C < 0) return e;
            let M = li(Math.min(Math.max(0, C / k), 1)),
              F = dy(w, M, m),
              q = {},
              z = null;
            return (
              g.length &&
                (z = g.reduce((K, Z) => {
                  let te = d[Z],
                    H = parseFloat(n[Z]) || 0,
                    y = (parseFloat(te) - H) * F + H;
                  return (K[Z] = y), K;
                }, {})),
              (q.current = z),
              (q.position = M),
              M === 1 && ((q.active = !1), (q.complete = !0)),
              (0, mt.merge)(e, q)
            );
          }
          return e;
        }),
        (py = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case PD:
              return t.payload.ixInstances || Object.freeze({});
            case MD:
              return Object.freeze({});
            case qD: {
              let {
                  instanceId: r,
                  elementId: n,
                  actionItem: i,
                  eventId: o,
                  eventTarget: a,
                  eventStateKey: s,
                  actionListId: u,
                  groupIndex: d,
                  isCarrier: g,
                  origin: v,
                  destination: E,
                  immediate: m,
                  verbose: T,
                  continuous: w,
                  parameterId: k,
                  actionGroups: S,
                  smoothing: N,
                  restingValue: C,
                  pluginInstance: M,
                  pluginDuration: F,
                  instanceDelay: q,
                  skipMotion: z,
                  skipToValue: K,
                } = t.payload,
                { actionTypeId: Z } = i,
                te = VD(Z),
                H = WD(te, Z),
                A = Object.keys(E).filter(
                  (P) => E[P] != null && typeof E[P] != "string"
                ),
                { easing: y } = i.config;
              return (0, mt.set)(e, r, {
                id: r,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: v,
                destination: E,
                destinationKeys: A,
                immediate: m,
                verbose: T,
                current: null,
                actionItem: i,
                actionTypeId: Z,
                eventId: o,
                eventTarget: a,
                eventStateKey: s,
                actionListId: u,
                groupIndex: d,
                renderType: te,
                isCarrier: g,
                styleProp: H,
                continuous: w,
                parameterId: k,
                actionGroups: S,
                smoothing: N,
                restingValue: C,
                pluginInstance: M,
                pluginDuration: F,
                instanceDelay: q,
                skipMotion: z,
                skipToValue: K,
                customEasingFn:
                  Array.isArray(y) && y.length === 4 ? GD(y) : void 0,
              });
            }
            case DD: {
              let { instanceId: r, time: n } = t.payload;
              return (0, mt.mergeIn)(e, [r], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case FD: {
              let { instanceId: r } = t.payload;
              if (!e[r]) return e;
              let n = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let a = 0; a < o; a++) {
                let s = i[a];
                s !== r && (n[s] = e[s]);
              }
              return n;
            }
            case kD: {
              let r = e,
                n = Object.keys(e),
                { length: i } = n;
              for (let o = 0; o < i; o++) {
                let a = n[o],
                  s = e[a],
                  u = s.continuous ? HD : XD;
                r = (0, mt.set)(r, a, u(s, t));
              }
              return r;
            }
            default:
              return e;
          }
        });
    });
  var BD,
    jD,
    zD,
    gy,
    hy = me(() => {
      "use strict";
      Ue();
      ({
        IX2_RAW_DATA_IMPORTED: BD,
        IX2_SESSION_STOPPED: jD,
        IX2_PARAMETER_CHANGED: zD,
      } = we),
        (gy = (e = {}, t) => {
          switch (t.type) {
            case BD:
              return t.payload.ixParameters || {};
            case jD:
              return {};
            case zD: {
              let { key: r, value: n } = t.payload;
              return (e[r] = n), e;
            }
            default:
              return e;
          }
        });
    });
  var Ey = {};
  Ge(Ey, { default: () => YD });
  var yy,
    my,
    KD,
    YD,
    _y = me(() => {
      "use strict";
      yy = de(Bo());
      Nf();
      Jf();
      rd();
      my = de(Vt());
      vy();
      hy();
      ({ ixElements: KD } = my.IX2ElementsReducer),
        (YD = (0, yy.combineReducers)({
          ixData: Lf,
          ixRequest: Zf,
          ixSession: td,
          ixElements: KD,
          ixInstances: py,
          ixParameters: gy,
        }));
    });
  var Ty = c((QB, by) => {
    var $D = wt(),
      QD = xe(),
      ZD = gt(),
      JD = "[object String]";
    function eF(e) {
      return typeof e == "string" || (!QD(e) && ZD(e) && $D(e) == JD);
    }
    by.exports = eF;
  });
  var wy = c((ZB, Iy) => {
    var tF = _a(),
      rF = tF("length");
    Iy.exports = rF;
  });
  var xy = c((JB, Oy) => {
    var nF = "\\ud800-\\udfff",
      iF = "\\u0300-\\u036f",
      oF = "\\ufe20-\\ufe2f",
      aF = "\\u20d0-\\u20ff",
      sF = iF + oF + aF,
      uF = "\\ufe0e\\ufe0f",
      cF = "\\u200d",
      lF = RegExp("[" + cF + nF + sF + uF + "]");
    function fF(e) {
      return lF.test(e);
    }
    Oy.exports = fF;
  });
  var qy = c((ej, My) => {
    var Sy = "\\ud800-\\udfff",
      dF = "\\u0300-\\u036f",
      pF = "\\ufe20-\\ufe2f",
      vF = "\\u20d0-\\u20ff",
      gF = dF + pF + vF,
      hF = "\\ufe0e\\ufe0f",
      yF = "[" + Sy + "]",
      Ya = "[" + gF + "]",
      $a = "\\ud83c[\\udffb-\\udfff]",
      mF = "(?:" + Ya + "|" + $a + ")",
      Ry = "[^" + Sy + "]",
      Cy = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Ly = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      EF = "\\u200d",
      Ny = mF + "?",
      Py = "[" + hF + "]?",
      _F = "(?:" + EF + "(?:" + [Ry, Cy, Ly].join("|") + ")" + Py + Ny + ")*",
      bF = Py + Ny + _F,
      TF = "(?:" + [Ry + Ya + "?", Ya, Cy, Ly, yF].join("|") + ")",
      Ay = RegExp($a + "(?=" + $a + ")|" + TF + bF, "g");
    function IF(e) {
      for (var t = (Ay.lastIndex = 0); Ay.test(e); ) ++t;
      return t;
    }
    My.exports = IF;
  });
  var Fy = c((tj, Dy) => {
    var wF = wy(),
      OF = xy(),
      xF = qy();
    function AF(e) {
      return OF(e) ? xF(e) : wF(e);
    }
    Dy.exports = AF;
  });
  var Gy = c((rj, ky) => {
    var SF = Hn(),
      RF = Xn(),
      CF = Dt(),
      LF = Ty(),
      NF = Fy(),
      PF = "[object Map]",
      MF = "[object Set]";
    function qF(e) {
      if (e == null) return 0;
      if (CF(e)) return LF(e) ? NF(e) : e.length;
      var t = RF(e);
      return t == PF || t == MF ? e.size : SF(e).length;
    }
    ky.exports = qF;
  });
  var Vy = c((nj, Uy) => {
    var DF = "Expected a function";
    function FF(e) {
      if (typeof e != "function") throw new TypeError(DF);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Uy.exports = FF;
  });
  var Qa = c((ij, Wy) => {
    var kF = Ot(),
      GF = (function () {
        try {
          var e = kF(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Wy.exports = GF;
  });
  var Za = c((oj, Xy) => {
    var Hy = Qa();
    function UF(e, t, r) {
      t == "__proto__" && Hy
        ? Hy(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    Xy.exports = UF;
  });
  var jy = c((aj, By) => {
    var VF = Za(),
      WF = Pn(),
      HF = Object.prototype,
      XF = HF.hasOwnProperty;
    function BF(e, t, r) {
      var n = e[t];
      (!(XF.call(e, t) && WF(n, r)) || (r === void 0 && !(t in e))) &&
        VF(e, t, r);
    }
    By.exports = BF;
  });
  var Yy = c((sj, Ky) => {
    var jF = jy(),
      zF = Br(),
      KF = Gn(),
      zy = ct(),
      YF = sr();
    function $F(e, t, r, n) {
      if (!zy(e)) return e;
      t = zF(t, e);
      for (var i = -1, o = t.length, a = o - 1, s = e; s != null && ++i < o; ) {
        var u = YF(t[i]),
          d = r;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != a) {
          var g = s[u];
          (d = n ? n(g, u, s) : void 0),
            d === void 0 && (d = zy(g) ? g : KF(t[i + 1]) ? [] : {});
        }
        jF(s, u, d), (s = s[u]);
      }
      return e;
    }
    Ky.exports = $F;
  });
  var Qy = c((uj, $y) => {
    var QF = zn(),
      ZF = Yy(),
      JF = Br();
    function e2(e, t, r) {
      for (var n = -1, i = t.length, o = {}; ++n < i; ) {
        var a = t[n],
          s = QF(e, a);
        r(s, a) && ZF(o, JF(a, e), s);
      }
      return o;
    }
    $y.exports = e2;
  });
  var Jy = c((cj, Zy) => {
    var t2 = Fn(),
      r2 = No(),
      n2 = oa(),
      i2 = ia(),
      o2 = Object.getOwnPropertySymbols,
      a2 = o2
        ? function (e) {
            for (var t = []; e; ) t2(t, n2(e)), (e = r2(e));
            return t;
          }
        : i2;
    Zy.exports = a2;
  });
  var tm = c((lj, em) => {
    function s2(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    em.exports = s2;
  });
  var nm = c((fj, rm) => {
    var u2 = ct(),
      c2 = Wn(),
      l2 = tm(),
      f2 = Object.prototype,
      d2 = f2.hasOwnProperty;
    function p2(e) {
      if (!u2(e)) return l2(e);
      var t = c2(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !d2.call(e, n))) || r.push(n);
      return r;
    }
    rm.exports = p2;
  });
  var om = c((dj, im) => {
    var v2 = sa(),
      g2 = nm(),
      h2 = Dt();
    function y2(e) {
      return h2(e) ? v2(e, !0) : g2(e);
    }
    im.exports = y2;
  });
  var sm = c((pj, am) => {
    var m2 = na(),
      E2 = Jy(),
      _2 = om();
    function b2(e) {
      return m2(e, _2, E2);
    }
    am.exports = b2;
  });
  var cm = c((vj, um) => {
    var T2 = Ea(),
      I2 = xt(),
      w2 = Qy(),
      O2 = sm();
    function x2(e, t) {
      if (e == null) return {};
      var r = T2(O2(e), function (n) {
        return [n];
      });
      return (
        (t = I2(t)),
        w2(e, r, function (n, i) {
          return t(n, i[0]);
        })
      );
    }
    um.exports = x2;
  });
  var fm = c((gj, lm) => {
    var A2 = xt(),
      S2 = Vy(),
      R2 = cm();
    function C2(e, t) {
      return R2(e, S2(A2(t)));
    }
    lm.exports = C2;
  });
  var pm = c((hj, dm) => {
    var L2 = Hn(),
      N2 = Xn(),
      P2 = Gr(),
      M2 = xe(),
      q2 = Dt(),
      D2 = kn(),
      F2 = Wn(),
      k2 = Vn(),
      G2 = "[object Map]",
      U2 = "[object Set]",
      V2 = Object.prototype,
      W2 = V2.hasOwnProperty;
    function H2(e) {
      if (e == null) return !0;
      if (
        q2(e) &&
        (M2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          D2(e) ||
          k2(e) ||
          P2(e))
      )
        return !e.length;
      var t = N2(e);
      if (t == G2 || t == U2) return !e.size;
      if (F2(e)) return !L2(e).length;
      for (var r in e) if (W2.call(e, r)) return !1;
      return !0;
    }
    dm.exports = H2;
  });
  var gm = c((yj, vm) => {
    var X2 = Za(),
      B2 = Ga(),
      j2 = xt();
    function z2(e, t) {
      var r = {};
      return (
        (t = j2(t, 3)),
        B2(e, function (n, i, o) {
          X2(r, i, t(n, i, o));
        }),
        r
      );
    }
    vm.exports = z2;
  });
  var ym = c((mj, hm) => {
    function K2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    hm.exports = K2;
  });
  var Em = c((Ej, mm) => {
    var Y2 = Yn();
    function $2(e) {
      return typeof e == "function" ? e : Y2;
    }
    mm.exports = $2;
  });
  var bm = c((_j, _m) => {
    var Q2 = ym(),
      Z2 = Ua(),
      J2 = Em(),
      ek = xe();
    function tk(e, t) {
      var r = ek(e) ? Q2 : Z2;
      return r(e, J2(t));
    }
    _m.exports = tk;
  });
  var Im = c((bj, Tm) => {
    var rk = Ze(),
      nk = function () {
        return rk.Date.now();
      };
    Tm.exports = nk;
  });
  var xm = c((Tj, Om) => {
    var ik = ct(),
      Ja = Im(),
      wm = $n(),
      ok = "Expected a function",
      ak = Math.max,
      sk = Math.min;
    function uk(e, t, r) {
      var n,
        i,
        o,
        a,
        s,
        u,
        d = 0,
        g = !1,
        v = !1,
        E = !0;
      if (typeof e != "function") throw new TypeError(ok);
      (t = wm(t) || 0),
        ik(r) &&
          ((g = !!r.leading),
          (v = "maxWait" in r),
          (o = v ? ak(wm(r.maxWait) || 0, t) : o),
          (E = "trailing" in r ? !!r.trailing : E));
      function m(q) {
        var z = n,
          K = i;
        return (n = i = void 0), (d = q), (a = e.apply(K, z)), a;
      }
      function T(q) {
        return (d = q), (s = setTimeout(S, t)), g ? m(q) : a;
      }
      function w(q) {
        var z = q - u,
          K = q - d,
          Z = t - z;
        return v ? sk(Z, o - K) : Z;
      }
      function k(q) {
        var z = q - u,
          K = q - d;
        return u === void 0 || z >= t || z < 0 || (v && K >= o);
      }
      function S() {
        var q = Ja();
        if (k(q)) return N(q);
        s = setTimeout(S, w(q));
      }
      function N(q) {
        return (s = void 0), E && n ? m(q) : ((n = i = void 0), a);
      }
      function C() {
        s !== void 0 && clearTimeout(s), (d = 0), (n = u = i = s = void 0);
      }
      function M() {
        return s === void 0 ? a : N(Ja());
      }
      function F() {
        var q = Ja(),
          z = k(q);
        if (((n = arguments), (i = this), (u = q), z)) {
          if (s === void 0) return T(u);
          if (v) return clearTimeout(s), (s = setTimeout(S, t)), m(u);
        }
        return s === void 0 && (s = setTimeout(S, t)), a;
      }
      return (F.cancel = C), (F.flush = M), F;
    }
    Om.exports = uk;
  });
  var Sm = c((Ij, Am) => {
    var ck = xm(),
      lk = ct(),
      fk = "Expected a function";
    function dk(e, t, r) {
      var n = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(fk);
      return (
        lk(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (i = "trailing" in r ? !!r.trailing : i)),
        ck(e, t, { leading: n, maxWait: t, trailing: i })
      );
    }
    Am.exports = dk;
  });
  var Cm = {};
  Ge(Cm, {
    actionListPlaybackChanged: () => Er,
    animationFrameChanged: () => pi,
    clearRequested: () => Fk,
    elementStateChanged: () => ss,
    eventListenerAdded: () => di,
    eventStateChanged: () => is,
    instanceAdded: () => os,
    instanceRemoved: () => as,
    instanceStarted: () => vi,
    mediaQueriesDefined: () => cs,
    parameterChanged: () => mr,
    playbackRequested: () => qk,
    previewRequested: () => Mk,
    rawDataImported: () => es,
    sessionInitialized: () => ts,
    sessionStarted: () => rs,
    sessionStopped: () => ns,
    stopRequested: () => Dk,
    testFrameRendered: () => kk,
    viewportWidthChanged: () => us,
  });
  var Rm,
    pk,
    vk,
    gk,
    hk,
    yk,
    mk,
    Ek,
    _k,
    bk,
    Tk,
    Ik,
    wk,
    Ok,
    xk,
    Ak,
    Sk,
    Rk,
    Ck,
    Lk,
    Nk,
    Pk,
    es,
    ts,
    rs,
    ns,
    Mk,
    qk,
    Dk,
    Fk,
    di,
    kk,
    is,
    pi,
    mr,
    os,
    vi,
    as,
    ss,
    Er,
    us,
    cs,
    gi = me(() => {
      "use strict";
      Ue();
      (Rm = de(Vt())),
        ({
          IX2_RAW_DATA_IMPORTED: pk,
          IX2_SESSION_INITIALIZED: vk,
          IX2_SESSION_STARTED: gk,
          IX2_SESSION_STOPPED: hk,
          IX2_PREVIEW_REQUESTED: yk,
          IX2_PLAYBACK_REQUESTED: mk,
          IX2_STOP_REQUESTED: Ek,
          IX2_CLEAR_REQUESTED: _k,
          IX2_EVENT_LISTENER_ADDED: bk,
          IX2_TEST_FRAME_RENDERED: Tk,
          IX2_EVENT_STATE_CHANGED: Ik,
          IX2_ANIMATION_FRAME_CHANGED: wk,
          IX2_PARAMETER_CHANGED: Ok,
          IX2_INSTANCE_ADDED: xk,
          IX2_INSTANCE_STARTED: Ak,
          IX2_INSTANCE_REMOVED: Sk,
          IX2_ELEMENT_STATE_CHANGED: Rk,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: Ck,
          IX2_VIEWPORT_WIDTH_CHANGED: Lk,
          IX2_MEDIA_QUERIES_DEFINED: Nk,
        } = we),
        ({ reifyState: Pk } = Rm.IX2VanillaUtils),
        (es = (e) => ({ type: pk, payload: { ...Pk(e) } })),
        (ts = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: vk,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (rs = () => ({ type: gk })),
        (ns = () => ({ type: hk })),
        (Mk = ({ rawData: e, defer: t }) => ({
          type: yk,
          payload: { defer: t, rawData: e },
        })),
        (qk = ({
          actionTypeId: e = Xe.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: r,
          eventId: n,
          allowEvents: i,
          immediate: o,
          testManual: a,
          verbose: s,
          rawData: u,
        }) => ({
          type: mk,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: r,
            testManual: a,
            eventId: n,
            allowEvents: i,
            immediate: o,
            verbose: s,
            rawData: u,
          },
        })),
        (Dk = (e) => ({ type: Ek, payload: { actionListId: e } })),
        (Fk = () => ({ type: _k })),
        (di = (e, t) => ({
          type: bk,
          payload: { target: e, listenerParams: t },
        })),
        (kk = (e = 1) => ({ type: Tk, payload: { step: e } })),
        (is = (e, t) => ({ type: Ik, payload: { stateKey: e, newState: t } })),
        (pi = (e, t) => ({ type: wk, payload: { now: e, parameters: t } })),
        (mr = (e, t) => ({ type: Ok, payload: { key: e, value: t } })),
        (os = (e) => ({ type: xk, payload: { ...e } })),
        (vi = (e, t) => ({ type: Ak, payload: { instanceId: e, time: t } })),
        (as = (e) => ({ type: Sk, payload: { instanceId: e } })),
        (ss = (e, t, r, n) => ({
          type: Rk,
          payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
        })),
        (Er = ({ actionListId: e, isPlaying: t }) => ({
          type: Ck,
          payload: { actionListId: e, isPlaying: t },
        })),
        (us = ({ width: e, mediaQueries: t }) => ({
          type: Lk,
          payload: { width: e, mediaQueries: t },
        })),
        (cs = () => ({ type: Nk }));
    });
  var De = {};
  Ge(De, {
    elementContains: () => ds,
    getChildElements: () => Kk,
    getClosestElement: () => rn,
    getProperty: () => Hk,
    getQuerySelector: () => fs,
    getRefType: () => ps,
    getSiblingElements: () => Yk,
    getStyle: () => Wk,
    getValidDocument: () => Bk,
    isSiblingNode: () => zk,
    matchSelector: () => Xk,
    queryDocument: () => jk,
    setStyle: () => Vk,
  });
  function Vk(e, t, r) {
    e.style[t] = r;
  }
  function Wk(e, t) {
    return e.style[t];
  }
  function Hk(e, t) {
    return e[t];
  }
  function Xk(e) {
    return (t) => t[ls](e);
  }
  function fs({ id: e, selector: t }) {
    if (e) {
      let r = e;
      if (e.indexOf(Lm) !== -1) {
        let n = e.split(Lm),
          i = n[0];
        if (((r = n[1]), i !== document.documentElement.getAttribute(Pm)))
          return null;
      }
      return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
    }
    return t;
  }
  function Bk(e) {
    return e == null || e === document.documentElement.getAttribute(Pm)
      ? document
      : null;
  }
  function jk(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function ds(e, t) {
    return e.contains(t);
  }
  function zk(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function Kk(e) {
    let t = [];
    for (let r = 0, { length: n } = e || []; r < n; r++) {
      let { children: i } = e[r],
        { length: o } = i;
      if (o) for (let a = 0; a < o; a++) t.push(i[a]);
    }
    return t;
  }
  function Yk(e = []) {
    let t = [],
      r = [];
    for (let n = 0, { length: i } = e; n < i; n++) {
      let { parentNode: o } = e[n];
      if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
        continue;
      r.push(o);
      let a = o.firstElementChild;
      for (; a != null; )
        e.indexOf(a) === -1 && t.push(a), (a = a.nextElementSibling);
    }
    return t;
  }
  function ps(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? Gk
        : Uk
      : null;
  }
  var Nm,
    ls,
    Lm,
    Gk,
    Uk,
    Pm,
    rn,
    Mm = me(() => {
      "use strict";
      Nm = de(Vt());
      Ue();
      ({ ELEMENT_MATCHES: ls } = Nm.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: Lm,
          HTML_ELEMENT: Gk,
          PLAIN_OBJECT: Uk,
          WF_PAGE: Pm,
        } = Ce);
      rn = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let r = e;
            do {
              if (r[ls] && r[ls](t)) return r;
              r = r.parentNode;
            } while (r != null);
            return null;
          };
    });
  var vs = c((xj, Dm) => {
    var $k = ct(),
      qm = Object.create,
      Qk = (function () {
        function e() {}
        return function (t) {
          if (!$k(t)) return {};
          if (qm) return qm(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    Dm.exports = Qk;
  });
  var hi = c((Aj, Fm) => {
    function Zk() {}
    Fm.exports = Zk;
  });
  var mi = c((Sj, km) => {
    var Jk = vs(),
      eG = hi();
    function yi(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    yi.prototype = Jk(eG.prototype);
    yi.prototype.constructor = yi;
    km.exports = yi;
  });
  var Wm = c((Rj, Vm) => {
    var Gm = $t(),
      tG = Gr(),
      rG = xe(),
      Um = Gm ? Gm.isConcatSpreadable : void 0;
    function nG(e) {
      return rG(e) || tG(e) || !!(Um && e && e[Um]);
    }
    Vm.exports = nG;
  });
  var Bm = c((Cj, Xm) => {
    var iG = Fn(),
      oG = Wm();
    function Hm(e, t, r, n, i) {
      var o = -1,
        a = e.length;
      for (r || (r = oG), i || (i = []); ++o < a; ) {
        var s = e[o];
        t > 0 && r(s)
          ? t > 1
            ? Hm(s, t - 1, r, n, i)
            : iG(i, s)
          : n || (i[i.length] = s);
      }
      return i;
    }
    Xm.exports = Hm;
  });
  var zm = c((Lj, jm) => {
    var aG = Bm();
    function sG(e) {
      var t = e == null ? 0 : e.length;
      return t ? aG(e, 1) : [];
    }
    jm.exports = sG;
  });
  var Ym = c((Nj, Km) => {
    function uG(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    Km.exports = uG;
  });
  var Zm = c((Pj, Qm) => {
    var cG = Ym(),
      $m = Math.max;
    function lG(e, t, r) {
      return (
        (t = $m(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, i = -1, o = $m(n.length - t, 0), a = Array(o);
            ++i < o;

          )
            a[i] = n[t + i];
          i = -1;
          for (var s = Array(t + 1); ++i < t; ) s[i] = n[i];
          return (s[t] = r(a)), cG(e, this, s);
        }
      );
    }
    Qm.exports = lG;
  });
  var eE = c((Mj, Jm) => {
    function fG(e) {
      return function () {
        return e;
      };
    }
    Jm.exports = fG;
  });
  var nE = c((qj, rE) => {
    var dG = eE(),
      tE = Qa(),
      pG = Yn(),
      vG = tE
        ? function (e, t) {
            return tE(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: dG(t),
              writable: !0,
            });
          }
        : pG;
    rE.exports = vG;
  });
  var oE = c((Dj, iE) => {
    var gG = 800,
      hG = 16,
      yG = Date.now;
    function mG(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = yG(),
          i = hG - (n - r);
        if (((r = n), i > 0)) {
          if (++t >= gG) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    iE.exports = mG;
  });
  var sE = c((Fj, aE) => {
    var EG = nE(),
      _G = oE(),
      bG = _G(EG);
    aE.exports = bG;
  });
  var cE = c((kj, uE) => {
    var TG = zm(),
      IG = Zm(),
      wG = sE();
    function OG(e) {
      return wG(IG(e, void 0, TG), e + "");
    }
    uE.exports = OG;
  });
  var dE = c((Gj, fE) => {
    var lE = ua(),
      xG = lE && new lE();
    fE.exports = xG;
  });
  var vE = c((Uj, pE) => {
    function AG() {}
    pE.exports = AG;
  });
  var gs = c((Vj, hE) => {
    var gE = dE(),
      SG = vE(),
      RG = gE
        ? function (e) {
            return gE.get(e);
          }
        : SG;
    hE.exports = RG;
  });
  var mE = c((Wj, yE) => {
    var CG = {};
    yE.exports = CG;
  });
  var hs = c((Hj, _E) => {
    var EE = mE(),
      LG = Object.prototype,
      NG = LG.hasOwnProperty;
    function PG(e) {
      for (
        var t = e.name + "", r = EE[t], n = NG.call(EE, t) ? r.length : 0;
        n--;

      ) {
        var i = r[n],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    _E.exports = PG;
  });
  var _i = c((Xj, bE) => {
    var MG = vs(),
      qG = hi(),
      DG = 4294967295;
    function Ei(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = DG),
        (this.__views__ = []);
    }
    Ei.prototype = MG(qG.prototype);
    Ei.prototype.constructor = Ei;
    bE.exports = Ei;
  });
  var IE = c((Bj, TE) => {
    function FG(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    TE.exports = FG;
  });
  var OE = c((jj, wE) => {
    var kG = _i(),
      GG = mi(),
      UG = IE();
    function VG(e) {
      if (e instanceof kG) return e.clone();
      var t = new GG(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = UG(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    wE.exports = VG;
  });
  var SE = c((zj, AE) => {
    var WG = _i(),
      xE = mi(),
      HG = hi(),
      XG = xe(),
      BG = gt(),
      jG = OE(),
      zG = Object.prototype,
      KG = zG.hasOwnProperty;
    function bi(e) {
      if (BG(e) && !XG(e) && !(e instanceof WG)) {
        if (e instanceof xE) return e;
        if (KG.call(e, "__wrapped__")) return jG(e);
      }
      return new xE(e);
    }
    bi.prototype = HG.prototype;
    bi.prototype.constructor = bi;
    AE.exports = bi;
  });
  var CE = c((Kj, RE) => {
    var YG = _i(),
      $G = gs(),
      QG = hs(),
      ZG = SE();
    function JG(e) {
      var t = QG(e),
        r = ZG[t];
      if (typeof r != "function" || !(t in YG.prototype)) return !1;
      if (e === r) return !0;
      var n = $G(r);
      return !!n && e === n[0];
    }
    RE.exports = JG;
  });
  var ME = c((Yj, PE) => {
    var LE = mi(),
      eU = cE(),
      tU = gs(),
      ys = hs(),
      rU = xe(),
      NE = CE(),
      nU = "Expected a function",
      iU = 8,
      oU = 32,
      aU = 128,
      sU = 256;
    function uU(e) {
      return eU(function (t) {
        var r = t.length,
          n = r,
          i = LE.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var o = t[n];
          if (typeof o != "function") throw new TypeError(nU);
          if (i && !a && ys(o) == "wrapper") var a = new LE([], !0);
        }
        for (n = a ? n : r; ++n < r; ) {
          o = t[n];
          var s = ys(o),
            u = s == "wrapper" ? tU(o) : void 0;
          u &&
          NE(u[0]) &&
          u[1] == (aU | iU | oU | sU) &&
          !u[4].length &&
          u[9] == 1
            ? (a = a[ys(u[0])].apply(a, u[3]))
            : (a = o.length == 1 && NE(o) ? a[s]() : a.thru(o));
        }
        return function () {
          var d = arguments,
            g = d[0];
          if (a && d.length == 1 && rU(g)) return a.plant(g).value();
          for (var v = 0, E = r ? t[v].apply(this, d) : g; ++v < r; )
            E = t[v].call(this, E);
          return E;
        };
      });
    }
    PE.exports = uU;
  });
  var DE = c(($j, qE) => {
    var cU = ME(),
      lU = cU();
    qE.exports = lU;
  });
  var kE = c((Qj, FE) => {
    function fU(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    FE.exports = fU;
  });
  var UE = c((Zj, GE) => {
    var dU = kE(),
      ms = $n();
    function pU(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = ms(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = ms(t)), (t = t === t ? t : 0)),
        dU(ms(e), t, r)
      );
    }
    GE.exports = pU;
  });
  var YE,
    $E,
    QE,
    ZE,
    vU,
    gU,
    hU,
    yU,
    mU,
    EU,
    _U,
    bU,
    TU,
    IU,
    wU,
    OU,
    xU,
    AU,
    SU,
    JE,
    e_,
    RU,
    CU,
    LU,
    t_,
    NU,
    PU,
    r_,
    MU,
    Es,
    n_,
    VE,
    WE,
    i_,
    on,
    qU,
    dt,
    o_,
    DU,
    We,
    tt,
    an,
    a_,
    _s,
    HE,
    bs,
    FU,
    nn,
    kU,
    GU,
    UU,
    s_,
    XE,
    VU,
    BE,
    WU,
    HU,
    XU,
    jE,
    Ti,
    Ii,
    zE,
    KE,
    u_,
    c_ = me(() => {
      "use strict";
      (YE = de(DE())), ($E = de(Kn())), (QE = de(UE()));
      Ue();
      Ts();
      gi();
      (ZE = de(Vt())),
        ({
          MOUSE_CLICK: vU,
          MOUSE_SECOND_CLICK: gU,
          MOUSE_DOWN: hU,
          MOUSE_UP: yU,
          MOUSE_OVER: mU,
          MOUSE_OUT: EU,
          DROPDOWN_CLOSE: _U,
          DROPDOWN_OPEN: bU,
          SLIDER_ACTIVE: TU,
          SLIDER_INACTIVE: IU,
          TAB_ACTIVE: wU,
          TAB_INACTIVE: OU,
          NAVBAR_CLOSE: xU,
          NAVBAR_OPEN: AU,
          MOUSE_MOVE: SU,
          PAGE_SCROLL_DOWN: JE,
          SCROLL_INTO_VIEW: e_,
          SCROLL_OUT_OF_VIEW: RU,
          PAGE_SCROLL_UP: CU,
          SCROLLING_IN_VIEW: LU,
          PAGE_FINISH: t_,
          ECOMMERCE_CART_CLOSE: NU,
          ECOMMERCE_CART_OPEN: PU,
          PAGE_START: r_,
          PAGE_SCROLL: MU,
        } = Je),
        (Es = "COMPONENT_ACTIVE"),
        (n_ = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: VE } = Ce),
        ({ getNamespacedParameterId: WE } = ZE.IX2VanillaUtils),
        (i_ = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (on = i_(({ element: e, nativeEvent: t }) => e === t.target)),
        (qU = i_(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (dt = (0, YE.default)([on, qU])),
        (o_ = (e, t) => {
          if (t) {
            let { ixData: r } = e.getState(),
              { events: n } = r,
              i = n[t];
            if (i && !FU[i.eventTypeId]) return i;
          }
          return null;
        }),
        (DU = ({ store: e, event: t }) => {
          let { action: r } = t,
            { autoStopEventId: n } = r.config;
          return !!o_(e, n);
        }),
        (We = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
          let { action: o, id: a } = t,
            { actionListId: s, autoStopEventId: u } = o.config,
            d = o_(e, u);
          return (
            d &&
              _r({
                store: e,
                eventId: u,
                eventTarget: r,
                eventStateKey: u + VE + n.split(VE)[1],
                actionListId: (0, $E.default)(d, "action.config.actionListId"),
              }),
            _r({
              store: e,
              eventId: a,
              eventTarget: r,
              eventStateKey: n,
              actionListId: s,
            }),
            sn({
              store: e,
              eventId: a,
              eventTarget: r,
              eventStateKey: n,
              actionListId: s,
            }),
            i
          );
        }),
        (tt = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n),
        (an = { handler: tt(dt, We) }),
        (a_ = { ...an, types: [Es, n_].join(" ") }),
        (_s = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (HE = "mouseover mouseout"),
        (bs = { types: _s }),
        (FU = { PAGE_START: r_, PAGE_FINISH: t_ }),
        (nn = (() => {
          let e = window.pageXOffset !== void 0,
            r =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : r.scrollLeft,
            scrollTop: e ? window.pageYOffset : r.scrollTop,
            stiffScrollTop: (0, QE.default)(
              e ? window.pageYOffset : r.scrollTop,
              0,
              r.scrollHeight - window.innerHeight
            ),
            scrollWidth: r.scrollWidth,
            scrollHeight: r.scrollHeight,
            clientWidth: r.clientWidth,
            clientHeight: r.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (kU = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (GU = ({ element: e, nativeEvent: t }) => {
          let { type: r, target: n, relatedTarget: i } = t,
            o = e.contains(n);
          if (r === "mouseover" && o) return !0;
          let a = e.contains(i);
          return !!(r === "mouseout" && o && a);
        }),
        (UU = (e) => {
          let {
              element: t,
              event: { config: r },
            } = e,
            { clientWidth: n, clientHeight: i } = nn(),
            o = r.scrollOffsetValue,
            u = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return kU(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: n,
            bottom: i - u,
          });
        }),
        (s_ = (e) => (t, r) => {
          let { type: n } = t.nativeEvent,
            i = [Es, n_].indexOf(n) !== -1 ? n === Es : r.isActive,
            o = { ...r, isActive: i };
          return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
        }),
        (XE = (e) => (t, r) => {
          let n = { elementHovered: GU(t) };
          return (
            ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        }),
        (VU = (e) => (t, r) => {
          let n = { ...r, elementVisible: UU(t) };
          return (
            ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
              e(t, n)) ||
            n
          );
        }),
        (BE =
          (e) =>
          (t, r = {}) => {
            let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = nn(),
              {
                event: { config: a, eventTypeId: s },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: d } = a,
              g = d === "PX",
              v = i - o,
              E = Number((n / v).toFixed(2));
            if (r && r.percentTop === E) return r;
            let m = (g ? u : (o * (u || 0)) / 100) / v,
              T,
              w,
              k = 0;
            r &&
              ((T = E > r.percentTop),
              (w = r.scrollingDown !== T),
              (k = w ? E : r.anchorTop));
            let S = s === JE ? E >= k + m : E <= k - m,
              N = {
                ...r,
                percentTop: E,
                inBounds: S,
                anchorTop: k,
                scrollingDown: T,
              };
            return (r && S && (w || N.inBounds !== r.inBounds) && e(t, N)) || N;
          }),
        (WU = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (HU = (e) => (t, r) => {
          let n = { finished: document.readyState === "complete" };
          return n.finished && !(r && r.finshed) && e(t), n;
        }),
        (XU = (e) => (t, r) => {
          let n = { started: !0 };
          return r || e(t), n;
        }),
        (jE =
          (e) =>
          (t, r = { clickCount: 0 }) => {
            let n = { clickCount: (r.clickCount % 2) + 1 };
            return (n.clickCount !== r.clickCount && e(t, n)) || n;
          }),
        (Ti = (e = !0) => ({
          ...a_,
          handler: tt(
            e ? dt : on,
            s_((t, r) => (r.isActive ? an.handler(t, r) : r))
          ),
        })),
        (Ii = (e = !0) => ({
          ...a_,
          handler: tt(
            e ? dt : on,
            s_((t, r) => (r.isActive ? r : an.handler(t, r)))
          ),
        })),
        (zE = {
          ...bs,
          handler: VU((e, t) => {
            let { elementVisible: r } = t,
              { event: n, store: i } = e,
              { ixData: o } = i.getState(),
              { events: a } = o;
            return !a[n.action.config.autoStopEventId] && t.triggered
              ? t
              : (n.eventTypeId === e_) === r
              ? (We(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (KE = 0.05),
        (u_ = {
          [TU]: Ti(),
          [IU]: Ii(),
          [bU]: Ti(),
          [_U]: Ii(),
          [AU]: Ti(!1),
          [xU]: Ii(!1),
          [wU]: Ti(),
          [OU]: Ii(),
          [PU]: { types: "ecommerce-cart-open", handler: tt(dt, We) },
          [NU]: { types: "ecommerce-cart-close", handler: tt(dt, We) },
          [vU]: {
            types: "click",
            handler: tt(
              dt,
              jE((e, { clickCount: t }) => {
                DU(e) ? t === 1 && We(e) : We(e);
              })
            ),
          },
          [gU]: {
            types: "click",
            handler: tt(
              dt,
              jE((e, { clickCount: t }) => {
                t === 2 && We(e);
              })
            ),
          },
          [hU]: { ...an, types: "mousedown" },
          [yU]: { ...an, types: "mouseup" },
          [mU]: {
            types: HE,
            handler: tt(
              dt,
              XE((e, t) => {
                t.elementHovered && We(e);
              })
            ),
          },
          [EU]: {
            types: HE,
            handler: tt(
              dt,
              XE((e, t) => {
                t.elementHovered || We(e);
              })
            ),
          },
          [SU]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: r,
                nativeEvent: n,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: a,
                  selectedAxis: s,
                  continuousParameterGroupId: u,
                  reverse: d,
                  restingState: g = 0,
                } = r,
                {
                  clientX: v = o.clientX,
                  clientY: E = o.clientY,
                  pageX: m = o.pageX,
                  pageY: T = o.pageY,
                } = n,
                w = s === "X_AXIS",
                k = n.type === "mouseout",
                S = g / 100,
                N = u,
                C = !1;
              switch (a) {
                case ut.VIEWPORT: {
                  S = w
                    ? Math.min(v, window.innerWidth) / window.innerWidth
                    : Math.min(E, window.innerHeight) / window.innerHeight;
                  break;
                }
                case ut.PAGE: {
                  let {
                    scrollLeft: M,
                    scrollTop: F,
                    scrollWidth: q,
                    scrollHeight: z,
                  } = nn();
                  S = w ? Math.min(M + m, q) / q : Math.min(F + T, z) / z;
                  break;
                }
                case ut.ELEMENT:
                default: {
                  N = WE(i, u);
                  let M = n.type.indexOf("mouse") === 0;
                  if (M && dt({ element: t, nativeEvent: n }) !== !0) break;
                  let F = t.getBoundingClientRect(),
                    { left: q, top: z, width: K, height: Z } = F;
                  if (!M && !WU({ left: v, top: E }, F)) break;
                  (C = !0), (S = w ? (v - q) / K : (E - z) / Z);
                  break;
                }
              }
              return (
                k && (S > 1 - KE || S < KE) && (S = Math.round(S)),
                (a !== ut.ELEMENT || C || C !== o.elementHovered) &&
                  ((S = d ? 1 - S : S), e.dispatch(mr(N, S))),
                {
                  elementHovered: C,
                  clientX: v,
                  clientY: E,
                  pageX: m,
                  pageY: T,
                }
              );
            },
          },
          [MU]: {
            types: _s,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: r, reverse: n } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: a } = nn(),
                s = i / (o - a);
              (s = n ? 1 - s : s), e.dispatch(mr(r, s));
            },
          },
          [LU]: {
            types: _s,
            handler: (
              { element: e, store: t, eventConfig: r, eventStateKey: n },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: a,
                  scrollWidth: s,
                  scrollHeight: u,
                  clientHeight: d,
                } = nn(),
                {
                  basedOn: g,
                  selectedAxis: v,
                  continuousParameterGroupId: E,
                  startsEntering: m,
                  startsExiting: T,
                  addEndOffset: w,
                  addStartOffset: k,
                  addOffsetValue: S = 0,
                  endOffsetValue: N = 0,
                } = r,
                C = v === "X_AXIS";
              if (g === ut.VIEWPORT) {
                let M = C ? o / s : a / u;
                return (
                  M !== i.scrollPercent && t.dispatch(mr(E, M)),
                  { scrollPercent: M }
                );
              } else {
                let M = WE(n, E),
                  F = e.getBoundingClientRect(),
                  q = (k ? S : 0) / 100,
                  z = (w ? N : 0) / 100;
                (q = m ? q : 1 - q), (z = T ? z : 1 - z);
                let K = F.top + Math.min(F.height * q, d),
                  te = F.top + F.height * z - K,
                  H = Math.min(d + te, u),
                  y = Math.min(Math.max(0, d - K), H) / H;
                return (
                  y !== i.scrollPercent && t.dispatch(mr(M, y)),
                  { scrollPercent: y }
                );
              }
            },
          },
          [e_]: zE,
          [RU]: zE,
          [JE]: {
            ...bs,
            handler: BE((e, t) => {
              t.scrollingDown && We(e);
            }),
          },
          [CU]: {
            ...bs,
            handler: BE((e, t) => {
              t.scrollingDown || We(e);
            }),
          },
          [t_]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: tt(on, HU(We)),
          },
          [r_]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: tt(on, XU(We)),
          },
        });
    });
  var x_ = {};
  Ge(x_, {
    observeRequests: () => lV,
    startActionGroup: () => sn,
    startEngine: () => Ri,
    stopActionGroup: () => _r,
    stopAllActionGroups: () => I_,
    stopEngine: () => Ci,
  });
  function lV(e) {
    Wt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: pV }),
      Wt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: vV }),
      Wt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: gV }),
      Wt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: hV });
  }
  function fV(e) {
    Wt({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        Ci(e),
          E_({ store: e, elementApi: De }),
          Ri({ store: e, allowEvents: !0 }),
          __();
      },
    });
  }
  function dV(e, t) {
    let r = Wt({
      store: e,
      select: ({ ixSession: n }) => n.tick,
      onChange: (n) => {
        t(n), r();
      },
    });
  }
  function pV({ rawData: e, defer: t }, r) {
    let n = () => {
      Ri({ store: r, rawData: e, allowEvents: !0 }), __();
    };
    t ? setTimeout(n, 0) : n();
  }
  function __() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function vV(e, t) {
    let {
        actionTypeId: r,
        actionListId: n,
        actionItemId: i,
        eventId: o,
        allowEvents: a,
        immediate: s,
        testManual: u,
        verbose: d = !0,
      } = e,
      { rawData: g } = e;
    if (n && i && g && s) {
      let v = g.actionLists[n];
      v && (g = JU({ actionList: v, actionItemId: i, rawData: g }));
    }
    if (
      (Ri({ store: t, rawData: g, allowEvents: a, testManual: u }),
      (n && r === Xe.GENERAL_START_ACTION) || Is(r))
    ) {
      _r({ store: t, actionListId: n }),
        T_({ store: t, actionListId: n, eventId: o });
      let v = sn({
        store: t,
        eventId: o,
        actionListId: n,
        immediate: s,
        verbose: d,
      });
      d && v && t.dispatch(Er({ actionListId: n, isPlaying: !s }));
    }
  }
  function gV({ actionListId: e }, t) {
    e ? _r({ store: t, actionListId: e }) : I_({ store: t }), Ci(t);
  }
  function hV(e, t) {
    Ci(t), E_({ store: t, elementApi: De });
  }
  function Ri({ store: e, rawData: t, allowEvents: r, testManual: n }) {
    let { ixSession: i } = e.getState();
    t && e.dispatch(es(t)),
      i.active ||
        (e.dispatch(
          ts({
            hasBoundaryNodes: !!document.querySelector(Oi),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        r &&
          (TV(e), yV(), e.getState().ixSession.hasDefinedMediaQueries && fV(e)),
        e.dispatch(rs()),
        mV(e, n));
  }
  function yV() {
    let { documentElement: e } = document;
    e.className.indexOf(l_) === -1 && (e.className += ` ${l_}`);
  }
  function mV(e, t) {
    let r = (n) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(pi(n, o)), t ? dV(e, r) : requestAnimationFrame(r));
    };
    r(window.performance.now());
  }
  function Ci(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: r } = t;
      r.forEach(EV), nV(), e.dispatch(ns());
    }
  }
  function EV({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function _V({
    store: e,
    eventStateKey: t,
    eventTarget: r,
    eventId: n,
    eventConfig: i,
    actionListId: o,
    parameterGroup: a,
    smoothing: s,
    restingValue: u,
  }) {
    let { ixData: d, ixSession: g } = e.getState(),
      { events: v } = d,
      E = v[n],
      { eventTypeId: m } = E,
      T = {},
      w = {},
      k = [],
      { continuousActionGroups: S } = a,
      { id: N } = a;
    eV(m, i) && (N = tV(t, N));
    let C = g.hasBoundaryNodes && r ? rn(r, Oi) : null;
    S.forEach((M) => {
      let { keyframe: F, actionItems: q } = M;
      q.forEach((z) => {
        let { actionTypeId: K } = z,
          { target: Z } = z.config;
        if (!Z) return;
        let te = Z.boundaryMode ? C : null,
          H = iV(Z) + ws + K;
        if (((w[H] = bV(w[H], F, z)), !T[H])) {
          T[H] = !0;
          let { config: A } = z;
          xi({
            config: A,
            event: E,
            eventTarget: r,
            elementRoot: te,
            elementApi: De,
          }).forEach((y) => {
            k.push({ element: y, key: H });
          });
        }
      });
    }),
      k.forEach(({ element: M, key: F }) => {
        let q = w[F],
          z = (0, Et.default)(q, "[0].actionItems[0]", {}),
          { actionTypeId: K } = z,
          Z = Si(K) ? xs(K)(M, z) : null,
          te = Os({ element: M, actionItem: z, elementApi: De }, Z);
        As({
          store: e,
          element: M,
          eventId: n,
          actionListId: o,
          actionItem: z,
          destination: te,
          continuous: !0,
          parameterId: N,
          actionGroups: q,
          smoothing: s,
          restingValue: u,
          pluginInstance: Z,
        });
      });
  }
  function bV(e = [], t, r) {
    let n = [...e],
      i;
    return (
      n.some((o, a) => (o.keyframe === t ? ((i = a), !0) : !1)),
      i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
      n[i].actionItems.push(r),
      n
    );
  }
  function TV(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: r } = t;
    b_(e),
      (0, br.default)(r, (i, o) => {
        let a = u_[o];
        if (!a) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        SV({ logic: a, store: e, events: i });
      });
    let { ixSession: n } = e.getState();
    n.eventListeners.length && wV(e);
  }
  function wV(e) {
    let t = () => {
      b_(e);
    };
    IV.forEach((r) => {
      window.addEventListener(r, t), e.dispatch(di(window, [r, t]));
    }),
      t();
  }
  function b_(e) {
    let { ixSession: t, ixData: r } = e.getState(),
      n = window.innerWidth;
    if (n !== t.viewportWidth) {
      let { mediaQueries: i } = r;
      e.dispatch(us({ width: n, mediaQueries: i }));
    }
  }
  function SV({ logic: e, store: t, events: r }) {
    RV(r);
    let { types: n, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: a } = o,
      s = OV(r, AV);
    if (!(0, p_.default)(s)) return;
    (0, br.default)(s, (v, E) => {
      let m = r[E],
        { action: T, id: w, mediaQueries: k = o.mediaQueryKeys } = m,
        { actionListId: S } = T.config;
      oV(k, o.mediaQueryKeys) || t.dispatch(cs()),
        T.actionTypeId === Xe.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(m.config) ? m.config : [m.config]).forEach((C) => {
            let { continuousParameterGroupId: M } = C,
              F = (0, Et.default)(a, `${S}.continuousParameterGroups`, []),
              q = (0, d_.default)(F, ({ id: Z }) => Z === M),
              z = (C.smoothing || 0) / 100,
              K = (C.restingState || 0) / 100;
            q &&
              v.forEach((Z, te) => {
                let H = w + ws + te;
                _V({
                  store: t,
                  eventStateKey: H,
                  eventTarget: Z,
                  eventId: w,
                  eventConfig: C,
                  actionListId: S,
                  parameterGroup: q,
                  smoothing: z,
                  restingValue: K,
                });
              });
          }),
        (T.actionTypeId === Xe.GENERAL_START_ACTION || Is(T.actionTypeId)) &&
          T_({ store: t, actionListId: S, eventId: w });
    });
    let u = (v) => {
        let { ixSession: E } = t.getState();
        xV(s, (m, T, w) => {
          let k = r[T],
            S = E.eventState[w],
            { action: N, mediaQueries: C = o.mediaQueryKeys } = k;
          if (!Ai(C, E.mediaQueryKey)) return;
          let M = (F = {}) => {
            let q = i(
              {
                store: t,
                element: m,
                event: k,
                eventConfig: F,
                nativeEvent: v,
                eventStateKey: w,
              },
              S
            );
            aV(q, S) || t.dispatch(is(w, q));
          };
          N.actionTypeId === Xe.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(k.config) ? k.config : [k.config]).forEach(M)
            : M();
        });
      },
      d = (0, y_.default)(u, cV),
      g = ({ target: v = document, types: E, throttle: m }) => {
        E.split(" ")
          .filter(Boolean)
          .forEach((T) => {
            let w = m ? d : u;
            v.addEventListener(T, w), t.dispatch(di(v, [T, w]));
          });
      };
    Array.isArray(n) ? n.forEach(g) : typeof n == "string" && g(e);
  }
  function RV(e) {
    if (!uV) return;
    let t = {},
      r = "";
    for (let n in e) {
      let { eventTypeId: i, target: o } = e[n],
        a = fs(o);
      t[a] ||
        ((i === Je.MOUSE_CLICK || i === Je.MOUSE_SECOND_CLICK) &&
          ((t[a] = !0),
          (r += a + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (r) {
      let n = document.createElement("style");
      (n.textContent = r), document.body.appendChild(n);
    }
  }
  function T_({ store: e, actionListId: t, eventId: r }) {
    let { ixData: n, ixSession: i } = e.getState(),
      { actionLists: o, events: a } = n,
      s = a[r],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let d = (0, Et.default)(u, "actionItemGroups[0].actionItems", []),
        g = (0, Et.default)(s, "mediaQueries", n.mediaQueryKeys);
      if (!Ai(g, i.mediaQueryKey)) return;
      d.forEach((v) => {
        let { config: E, actionTypeId: m } = v,
          T =
            E?.target?.useEventTarget === !0 && E?.target?.objectId == null
              ? { target: s.target, targets: s.targets }
              : E,
          w = xi({ config: T, event: s, elementApi: De }),
          k = Si(m);
        w.forEach((S) => {
          let N = k ? xs(m)(S, v) : null;
          As({
            destination: Os({ element: S, actionItem: v, elementApi: De }, N),
            immediate: !0,
            store: e,
            element: S,
            eventId: r,
            actionItem: v,
            actionListId: t,
            pluginInstance: N,
          });
        });
      });
    }
  }
  function I_({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, br.default)(t, (r) => {
      if (!r.continuous) {
        let { actionListId: n, verbose: i } = r;
        Ss(r, e), i && e.dispatch(Er({ actionListId: n, isPlaying: !1 }));
      }
    });
  }
  function _r({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: a } = e.getState(),
      s = a.hasBoundaryNodes && r ? rn(r, Oi) : null;
    (0, br.default)(o, (u) => {
      let d = (0, Et.default)(u, "actionItem.config.target.boundaryMode"),
        g = n ? u.eventStateKey === n : !0;
      if (u.actionListId === i && u.eventId === t && g) {
        if (s && d && !ds(s, u.element)) return;
        Ss(u, e),
          u.verbose && e.dispatch(Er({ actionListId: i, isPlaying: !1 }));
      }
    });
  }
  function sn({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
    groupIndex: o = 0,
    immediate: a,
    verbose: s,
  }) {
    let { ixData: u, ixSession: d } = e.getState(),
      { events: g } = u,
      v = g[t] || {},
      { mediaQueries: E = u.mediaQueryKeys } = v,
      m = (0, Et.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: T, useFirstGroupAsInitialState: w } = m;
    if (!T || !T.length) return !1;
    o >= T.length && (0, Et.default)(v, "config.loop") && (o = 0),
      o === 0 && w && o++;
    let S =
        (o === 0 || (o === 1 && w)) && Is(v.action?.actionTypeId)
          ? v.config.delay
          : void 0,
      N = (0, Et.default)(T, [o, "actionItems"], []);
    if (!N.length || !Ai(E, d.mediaQueryKey)) return !1;
    let C = d.hasBoundaryNodes && r ? rn(r, Oi) : null,
      M = $U(N),
      F = !1;
    return (
      N.forEach((q, z) => {
        let { config: K, actionTypeId: Z } = q,
          te = Si(Z),
          { target: H } = K;
        if (!H) return;
        let A = H.boundaryMode ? C : null;
        xi({
          config: K,
          event: v,
          eventTarget: r,
          elementRoot: A,
          elementApi: De,
        }).forEach((P, U) => {
          let X = te ? xs(Z)(P, q) : null,
            ee = te ? sV(Z)(P, q) : null;
          F = !0;
          let ne = M === z && U === 0,
            V = QU({ element: P, actionItem: q }),
            j = Os({ element: P, actionItem: q, elementApi: De }, X);
          As({
            store: e,
            element: P,
            actionItem: q,
            eventId: t,
            eventTarget: r,
            eventStateKey: n,
            actionListId: i,
            groupIndex: o,
            isCarrier: ne,
            computedStyle: V,
            destination: j,
            immediate: a,
            verbose: s,
            pluginInstance: X,
            pluginDuration: ee,
            instanceDelay: S,
          });
        });
      }),
      F
    );
  }
  function As(e) {
    let { store: t, computedStyle: r, ...n } = e,
      {
        element: i,
        actionItem: o,
        immediate: a,
        pluginInstance: s,
        continuous: u,
        restingValue: d,
        eventId: g,
      } = n,
      v = !u,
      E = KU(),
      { ixElements: m, ixSession: T, ixData: w } = t.getState(),
      k = zU(m, i),
      { refState: S } = m[k] || {},
      N = ps(i),
      C = T.reducedMotion && Yo[o.actionTypeId],
      M;
    if (C && u)
      switch (w.events[g]?.eventTypeId) {
        case Je.MOUSE_MOVE:
        case Je.MOUSE_MOVE_IN_VIEWPORT:
          M = d;
          break;
        default:
          M = 0.5;
          break;
      }
    let F = ZU(i, S, r, o, De, s);
    if (
      (t.dispatch(
        os({
          instanceId: E,
          elementId: k,
          origin: F,
          refType: N,
          skipMotion: C,
          skipToValue: M,
          ...n,
        })
      ),
      w_(document.body, "ix2-animation-started", E),
      a)
    ) {
      CV(t, E);
      return;
    }
    Wt({ store: t, select: ({ ixInstances: q }) => q[E], onChange: O_ }),
      v && t.dispatch(vi(E, T.tick));
  }
  function Ss(e, t) {
    w_(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: r, actionItem: n } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: a } = i[r] || {};
    a === m_ && rV(o, n, De), t.dispatch(as(e.id));
  }
  function w_(e, t, r) {
    let n = document.createEvent("CustomEvent");
    n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
  }
  function CV(e, t) {
    let { ixParameters: r } = e.getState();
    e.dispatch(vi(t, 0)), e.dispatch(pi(performance.now(), r));
    let { ixInstances: n } = e.getState();
    O_(n[t], e);
  }
  function O_(e, t) {
    let {
        active: r,
        continuous: n,
        complete: i,
        elementId: o,
        actionItem: a,
        actionTypeId: s,
        renderType: u,
        current: d,
        groupIndex: g,
        eventId: v,
        eventTarget: E,
        eventStateKey: m,
        actionListId: T,
        isCarrier: w,
        styleProp: k,
        verbose: S,
        pluginInstance: N,
      } = e,
      { ixData: C, ixSession: M } = t.getState(),
      { events: F } = C,
      q = F[v] || {},
      { mediaQueries: z = C.mediaQueryKeys } = q;
    if (Ai(z, M.mediaQueryKey) && (n || r || i)) {
      if (d || (u === jU && i)) {
        t.dispatch(ss(o, s, d, a));
        let { ixElements: K } = t.getState(),
          { ref: Z, refType: te, refState: H } = K[o] || {},
          A = H && H[s];
        (te === m_ || Si(s)) && YU(Z, H, A, v, a, k, De, u, N);
      }
      if (i) {
        if (w) {
          let K = sn({
            store: t,
            eventId: v,
            eventTarget: E,
            eventStateKey: m,
            actionListId: T,
            groupIndex: g + 1,
            verbose: S,
          });
          S && !K && t.dispatch(Er({ actionListId: T, isPlaying: !1 }));
        }
        Ss(e, t);
      }
    }
  }
  var d_,
    Et,
    p_,
    v_,
    g_,
    h_,
    br,
    y_,
    wi,
    BU,
    Is,
    ws,
    Oi,
    m_,
    jU,
    l_,
    xi,
    zU,
    Os,
    Wt,
    KU,
    YU,
    E_,
    $U,
    QU,
    ZU,
    JU,
    eV,
    tV,
    Ai,
    rV,
    nV,
    iV,
    oV,
    aV,
    Si,
    xs,
    sV,
    f_,
    uV,
    cV,
    IV,
    OV,
    xV,
    AV,
    Ts = me(() => {
      "use strict";
      (d_ = de(wa())),
        (Et = de(Kn())),
        (p_ = de(Gy())),
        (v_ = de(fm())),
        (g_ = de(pm())),
        (h_ = de(gm())),
        (br = de(bm())),
        (y_ = de(Sm()));
      Ue();
      wi = de(Vt());
      gi();
      Mm();
      c_();
      (BU = Object.keys(zo)),
        (Is = (e) => BU.includes(e)),
        ({
          COLON_DELIMITER: ws,
          BOUNDARY_SELECTOR: Oi,
          HTML_ELEMENT: m_,
          RENDER_GENERAL: jU,
          W_MOD_IX: l_,
        } = Ce),
        ({
          getAffectedElements: xi,
          getElementId: zU,
          getDestinationValues: Os,
          observeStore: Wt,
          getInstanceId: KU,
          renderHTMLElement: YU,
          clearAllStyles: E_,
          getMaxDurationItemIndex: $U,
          getComputedStyle: QU,
          getInstanceOrigin: ZU,
          reduceListToGroup: JU,
          shouldNamespaceEventParameter: eV,
          getNamespacedParameterId: tV,
          shouldAllowMediaQuery: Ai,
          cleanupHTMLElement: rV,
          clearObjectCache: nV,
          stringifyTarget: iV,
          mediaQueriesEqual: oV,
          shallowEqual: aV,
        } = wi.IX2VanillaUtils),
        ({
          isPluginType: Si,
          createPluginInstance: xs,
          getPluginDuration: sV,
        } = wi.IX2VanillaPlugins),
        (f_ = navigator.userAgent),
        (uV = f_.match(/iPad/i) || f_.match(/iPhone/)),
        (cV = 12);
      IV = ["resize", "orientationchange"];
      (OV = (e, t) => (0, v_.default)((0, h_.default)(e, t), g_.default)),
        (xV = (e, t) => {
          (0, br.default)(e, (r, n) => {
            r.forEach((i, o) => {
              let a = n + ws + o;
              t(i, n, a);
            });
          });
        }),
        (AV = (e) => {
          let t = { target: e.target, targets: e.targets };
          return xi({ config: t, elementApi: De });
        });
    });
  var S_ = c((_t) => {
    "use strict";
    var LV = gn().default,
      NV = cu().default;
    Object.defineProperty(_t, "__esModule", { value: !0 });
    _t.actions = void 0;
    _t.destroy = A_;
    _t.init = FV;
    _t.setEnv = DV;
    _t.store = void 0;
    Kl();
    var PV = Bo(),
      MV = NV((_y(), it(Ey))),
      Rs = (Ts(), it(x_)),
      qV = LV((gi(), it(Cm)));
    _t.actions = qV;
    var Cs = (_t.store = (0, PV.createStore)(MV.default));
    function DV(e) {
      e() && (0, Rs.observeRequests)(Cs);
    }
    function FV(e) {
      A_(), (0, Rs.startEngine)({ store: Cs, rawData: e, allowEvents: !0 });
    }
    function A_() {
      (0, Rs.stopEngine)(Cs);
    }
  });
  var N_ = c((sz, L_) => {
    "use strict";
    var R_ = Pe(),
      C_ = S_();
    C_.setEnv(R_.env);
    R_.define(
      "ix2",
      (L_.exports = function () {
        return C_;
      })
    );
  });
  var M_ = c((uz, P_) => {
    "use strict";
    var Tr = Pe();
    Tr.define(
      "links",
      (P_.exports = function (e, t) {
        var r = {},
          n = e(window),
          i,
          o = Tr.env(),
          a = window.location,
          s = document.createElement("a"),
          u = "w--current",
          d = /index\.(html|php)$/,
          g = /\/$/,
          v,
          E;
        r.ready = r.design = r.preview = m;
        function m() {
          (i = o && Tr.env("design")),
            (E = Tr.env("slug") || a.pathname || ""),
            Tr.scroll.off(w),
            (v = []);
          for (var S = document.links, N = 0; N < S.length; ++N) T(S[N]);
          v.length && (Tr.scroll.on(w), w());
        }
        function T(S) {
          var N =
            (i && S.getAttribute("href-disabled")) || S.getAttribute("href");
          if (((s.href = N), !(N.indexOf(":") >= 0))) {
            var C = e(S);
            if (
              s.hash.length > 1 &&
              s.host + s.pathname === a.host + a.pathname
            ) {
              if (!/^#[a-zA-Z0-9\-\_]+$/.test(s.hash)) return;
              var M = e(s.hash);
              M.length && v.push({ link: C, sec: M, active: !1 });
              return;
            }
            if (!(N === "#" || N === "")) {
              var F = s.href === a.href || N === E || (d.test(N) && g.test(E));
              k(C, u, F);
            }
          }
        }
        function w() {
          var S = n.scrollTop(),
            N = n.height();
          t.each(v, function (C) {
            var M = C.link,
              F = C.sec,
              q = F.offset().top,
              z = F.outerHeight(),
              K = N * 0.5,
              Z = F.is(":visible") && q + z - K >= S && q + K <= S + N;
            C.active !== Z && ((C.active = Z), k(M, u, Z));
          });
        }
        function k(S, N, C) {
          var M = S.hasClass(N);
          (C && M) || (!C && !M) || (C ? S.addClass(N) : S.removeClass(N));
        }
        return r;
      })
    );
  });
  var D_ = c((cz, q_) => {
    "use strict";
    var Li = Pe();
    Li.define(
      "scroll",
      (q_.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = T() ? null : window.history,
          i = e(window),
          o = e(document),
          a = e(document.body),
          s =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (A) {
              window.setTimeout(A, 15);
            },
          u = Li.env("editor") ? ".w-editor-body" : "body",
          d =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          g = 'a[href="#"]',
          v = 'a[href*="#"]:not(.w-tab-link):not(' + g + ")",
          E = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          m = document.createElement("style");
        m.appendChild(document.createTextNode(E));
        function T() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var w = /^#[a-zA-Z0-9][\w:.-]*$/;
        function k(A) {
          return w.test(A.hash) && A.host + A.pathname === r.host + r.pathname;
        }
        let S =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function N() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            S.matches
          );
        }
        function C(A, y) {
          var P;
          switch (y) {
            case "add":
              (P = A.attr("tabindex")),
                P
                  ? A.attr("data-wf-tabindex-swap", P)
                  : A.attr("tabindex", "-1");
              break;
            case "remove":
              (P = A.attr("data-wf-tabindex-swap")),
                P
                  ? (A.attr("tabindex", P),
                    A.removeAttr("data-wf-tabindex-swap"))
                  : A.removeAttr("tabindex");
              break;
          }
          A.toggleClass("wf-force-outline-none", y === "add");
        }
        function M(A) {
          var y = A.currentTarget;
          if (
            !(
              Li.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(y.className))
            )
          ) {
            var P = k(y) ? y.hash : "";
            if (P !== "") {
              var U = e(P);
              U.length &&
                (A && (A.preventDefault(), A.stopPropagation()),
                F(P, A),
                window.setTimeout(
                  function () {
                    q(U, function () {
                      C(U, "add"),
                        U.get(0).focus({ preventScroll: !0 }),
                        C(U, "remove");
                    });
                  },
                  A ? 0 : 300
                ));
            }
          }
        }
        function F(A) {
          if (
            r.hash !== A &&
            n &&
            n.pushState &&
            !(Li.env.chrome && r.protocol === "file:")
          ) {
            var y = n.state && n.state.hash;
            y !== A && n.pushState({ hash: A }, "", A);
          }
        }
        function q(A, y) {
          var P = i.scrollTop(),
            U = z(A);
          if (P !== U) {
            var X = K(A, P, U),
              ee = Date.now(),
              ne = function () {
                var V = Date.now() - ee;
                window.scroll(0, Z(P, U, V, X)),
                  V <= X ? s(ne) : typeof y == "function" && y();
              };
            s(ne);
          }
        }
        function z(A) {
          var y = e(d),
            P = y.css("position") === "fixed" ? y.outerHeight() : 0,
            U = A.offset().top - P;
          if (A.data("scroll") === "mid") {
            var X = i.height() - P,
              ee = A.outerHeight();
            ee < X && (U -= Math.round((X - ee) / 2));
          }
          return U;
        }
        function K(A, y, P) {
          if (N()) return 0;
          var U = 1;
          return (
            a.add(A).each(function (X, ee) {
              var ne = parseFloat(ee.getAttribute("data-scroll-time"));
              !isNaN(ne) && ne >= 0 && (U = ne);
            }),
            (472.143 * Math.log(Math.abs(y - P) + 125) - 2e3) * U
          );
        }
        function Z(A, y, P, U) {
          return P > U ? y : A + (y - A) * te(P / U);
        }
        function te(A) {
          return A < 0.5
            ? 4 * A * A * A
            : (A - 1) * (2 * A - 2) * (2 * A - 2) + 1;
        }
        function H() {
          var { WF_CLICK_EMPTY: A, WF_CLICK_SCROLL: y } = t;
          o.on(y, v, M),
            o.on(A, g, function (P) {
              P.preventDefault();
            }),
            document.head.insertBefore(m, document.head.firstChild);
        }
        return { ready: H };
      })
    );
  });
  var k_ = c((lz, F_) => {
    "use strict";
    var kV = Pe();
    kV.define(
      "touch",
      (F_.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new n(o) : null
            );
          });
        function n(o) {
          var a = !1,
            s = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            d,
            g;
          o.addEventListener("touchstart", v, !1),
            o.addEventListener("touchmove", E, !1),
            o.addEventListener("touchend", m, !1),
            o.addEventListener("touchcancel", T, !1),
            o.addEventListener("mousedown", v, !1),
            o.addEventListener("mousemove", E, !1),
            o.addEventListener("mouseup", m, !1),
            o.addEventListener("mouseout", T, !1);
          function v(k) {
            var S = k.touches;
            (S && S.length > 1) ||
              ((a = !0),
              S ? ((s = !0), (d = S[0].clientX)) : (d = k.clientX),
              (g = d));
          }
          function E(k) {
            if (a) {
              if (s && k.type === "mousemove") {
                k.preventDefault(), k.stopPropagation();
                return;
              }
              var S = k.touches,
                N = S ? S[0].clientX : k.clientX,
                C = N - g;
              (g = N),
                Math.abs(C) > u &&
                  r &&
                  String(r()) === "" &&
                  (i("swipe", k, { direction: C > 0 ? "right" : "left" }), T());
            }
          }
          function m(k) {
            if (a && ((a = !1), s && k.type === "mouseup")) {
              k.preventDefault(), k.stopPropagation(), (s = !1);
              return;
            }
          }
          function T() {
            a = !1;
          }
          function w() {
            o.removeEventListener("touchstart", v, !1),
              o.removeEventListener("touchmove", E, !1),
              o.removeEventListener("touchend", m, !1),
              o.removeEventListener("touchcancel", T, !1),
              o.removeEventListener("mousedown", v, !1),
              o.removeEventListener("mousemove", E, !1),
              o.removeEventListener("mouseup", m, !1),
              o.removeEventListener("mouseout", T, !1),
              (o = null);
          }
          this.destroy = w;
        }
        function i(o, a, s) {
          var u = e.Event(o, { originalEvent: a });
          e(a.target).trigger(u, s);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var V_ = c((fz, U_) => {
    "use strict";
    var Ht = Pe(),
      GV = jt(),
      rt = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      G_ = !0,
      UV = /^#[a-zA-Z0-9\-_]+$/;
    Ht.define(
      "dropdown",
      (U_.exports = function (e, t) {
        var r = t.debounce,
          n = {},
          i = Ht.env(),
          o = !1,
          a,
          s = Ht.env.touch,
          u = ".w-dropdown",
          d = "w--open",
          g = GV.triggers,
          v = 900,
          E = "focusout" + u,
          m = "keydown" + u,
          T = "mouseenter" + u,
          w = "mousemove" + u,
          k = "mouseleave" + u,
          S = (s ? "click" : "mouseup") + u,
          N = "w-close" + u,
          C = "setting" + u,
          M = e(document),
          F;
        (n.ready = q),
          (n.design = function () {
            o && y(), (o = !1), q();
          }),
          (n.preview = function () {
            (o = !0), q();
          });
        function q() {
          (a = i && Ht.env("design")), (F = M.find(u)), F.each(z);
        }
        function z(l, G) {
          var W = e(G),
            R = e.data(G, u);
          R ||
            (R = e.data(G, u, {
              open: !1,
              el: W,
              config: {},
              selectedIdx: -1,
            })),
            (R.toggle = R.el.children(".w-dropdown-toggle")),
            (R.list = R.el.children(".w-dropdown-list")),
            (R.links = R.list.find("a:not(.w-dropdown .w-dropdown a)")),
            (R.complete = X(R)),
            (R.mouseLeave = ne(R)),
            (R.mouseUpOutside = U(R)),
            (R.mouseMoveOutside = V(R)),
            K(R);
          var oe = R.toggle.attr("id"),
            fe = R.list.attr("id");
          oe || (oe = "w-dropdown-toggle-" + l),
            fe || (fe = "w-dropdown-list-" + l),
            R.toggle.attr("id", oe),
            R.toggle.attr("aria-controls", fe),
            R.toggle.attr("aria-haspopup", "menu"),
            R.toggle.attr("aria-expanded", "false"),
            R.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"),
            R.toggle.prop("tagName") !== "BUTTON" &&
              (R.toggle.attr("role", "button"),
              R.toggle.attr("tabindex") || R.toggle.attr("tabindex", "0")),
            R.list.attr("id", fe),
            R.list.attr("aria-labelledby", oe),
            R.links.each(function (h, B) {
              B.hasAttribute("tabindex") || B.setAttribute("tabindex", "0"),
                UV.test(B.hash) && B.addEventListener("click", A.bind(null, R));
            }),
            R.el.off(u),
            R.toggle.off(u),
            R.nav && R.nav.off(u);
          var ae = te(R, G_);
          a && R.el.on(C, Z(R)),
            a ||
              (i && ((R.hovering = !1), A(R)),
              R.config.hover && R.toggle.on(T, ee(R)),
              R.el.on(N, ae),
              R.el.on(m, j(R)),
              R.el.on(E, b(R)),
              R.toggle.on(S, ae),
              R.toggle.on(m, _(R)),
              (R.nav = R.el.closest(".w-nav")),
              R.nav.on(N, ae));
        }
        function K(l) {
          var G = Number(l.el.css("z-index"));
          (l.manageZ = G === v || G === v + 1),
            (l.config = {
              hover: l.el.attr("data-hover") === "true" && !s,
              delay: l.el.attr("data-delay"),
            });
        }
        function Z(l) {
          return function (G, W) {
            (W = W || {}),
              K(l),
              W.open === !0 && H(l, !0),
              W.open === !1 && A(l, { immediate: !0 });
          };
        }
        function te(l, G) {
          return r(function (W) {
            if (l.open || (W && W.type === "w-close"))
              return A(l, { forceClose: G });
            H(l);
          });
        }
        function H(l) {
          if (!l.open) {
            P(l),
              (l.open = !0),
              l.list.addClass(d),
              l.toggle.addClass(d),
              l.toggle.attr("aria-expanded", "true"),
              g.intro(0, l.el[0]),
              Ht.redraw.up(),
              l.manageZ && l.el.css("z-index", v + 1);
            var G = Ht.env("editor");
            a || M.on(S, l.mouseUpOutside),
              l.hovering && !G && l.el.on(k, l.mouseLeave),
              l.hovering && G && M.on(w, l.mouseMoveOutside),
              window.clearTimeout(l.delayId);
          }
        }
        function A(l, { immediate: G, forceClose: W } = {}) {
          if (l.open && !(l.config.hover && l.hovering && !W)) {
            l.toggle.attr("aria-expanded", "false"), (l.open = !1);
            var R = l.config;
            if (
              (g.outro(0, l.el[0]),
              M.off(S, l.mouseUpOutside),
              M.off(w, l.mouseMoveOutside),
              l.el.off(k, l.mouseLeave),
              window.clearTimeout(l.delayId),
              !R.delay || G)
            )
              return l.complete();
            l.delayId = window.setTimeout(l.complete, R.delay);
          }
        }
        function y() {
          M.find(u).each(function (l, G) {
            e(G).triggerHandler(N);
          });
        }
        function P(l) {
          var G = l.el[0];
          F.each(function (W, R) {
            var oe = e(R);
            oe.is(G) || oe.has(G).length || oe.triggerHandler(N);
          });
        }
        function U(l) {
          return (
            l.mouseUpOutside && M.off(S, l.mouseUpOutside),
            r(function (G) {
              if (l.open) {
                var W = e(G.target);
                if (!W.closest(".w-dropdown-toggle").length) {
                  var R = e.inArray(l.el[0], W.parents(u)) === -1,
                    oe = Ht.env("editor");
                  if (R) {
                    if (oe) {
                      var fe =
                          W.parents().length === 1 &&
                          W.parents("svg").length === 1,
                        ae = W.parents(
                          ".w-editor-bem-EditorHoverControls"
                        ).length;
                      if (fe || ae) return;
                    }
                    A(l);
                  }
                }
              }
            })
          );
        }
        function X(l) {
          return function () {
            l.list.removeClass(d),
              l.toggle.removeClass(d),
              l.manageZ && l.el.css("z-index", "");
          };
        }
        function ee(l) {
          return function () {
            (l.hovering = !0), H(l);
          };
        }
        function ne(l) {
          return function () {
            (l.hovering = !1), l.links.is(":focus") || A(l);
          };
        }
        function V(l) {
          return r(function (G) {
            if (l.open) {
              var W = e(G.target),
                R = e.inArray(l.el[0], W.parents(u)) === -1;
              if (R) {
                var oe = W.parents(".w-editor-bem-EditorHoverControls").length,
                  fe = W.parents(".w-editor-bem-RTToolbar").length,
                  ae = e(".w-editor-bem-EditorOverlay"),
                  h =
                    ae.find(".w-editor-edit-outline").length ||
                    ae.find(".w-editor-bem-RTToolbar").length;
                if (oe || fe || h) return;
                (l.hovering = !1), A(l);
              }
            }
          });
        }
        function j(l) {
          return function (G) {
            if (!(a || !l.open))
              switch (
                ((l.selectedIdx = l.links.index(document.activeElement)),
                G.keyCode)
              ) {
                case rt.HOME:
                  return l.open
                    ? ((l.selectedIdx = 0), p(l), G.preventDefault())
                    : void 0;
                case rt.END:
                  return l.open
                    ? ((l.selectedIdx = l.links.length - 1),
                      p(l),
                      G.preventDefault())
                    : void 0;
                case rt.ESCAPE:
                  return A(l), l.toggle.focus(), G.stopPropagation();
                case rt.ARROW_RIGHT:
                case rt.ARROW_DOWN:
                  return (
                    (l.selectedIdx = Math.min(
                      l.links.length - 1,
                      l.selectedIdx + 1
                    )),
                    p(l),
                    G.preventDefault()
                  );
                case rt.ARROW_LEFT:
                case rt.ARROW_UP:
                  return (
                    (l.selectedIdx = Math.max(-1, l.selectedIdx - 1)),
                    p(l),
                    G.preventDefault()
                  );
              }
          };
        }
        function p(l) {
          l.links[l.selectedIdx] && l.links[l.selectedIdx].focus();
        }
        function _(l) {
          var G = te(l, G_);
          return function (W) {
            if (!a) {
              if (!l.open)
                switch (W.keyCode) {
                  case rt.ARROW_UP:
                  case rt.ARROW_DOWN:
                    return W.stopPropagation();
                }
              switch (W.keyCode) {
                case rt.SPACE:
                case rt.ENTER:
                  return G(), W.stopPropagation(), W.preventDefault();
              }
            }
          };
        }
        function b(l) {
          return r(function (G) {
            var { relatedTarget: W, target: R } = G,
              oe = l.el[0],
              fe = oe.contains(W) || oe.contains(R);
            return fe || A(l), G.stopPropagation();
          });
        }
        return n;
      })
    );
  });
  var W_ = c((Ls) => {
    "use strict";
    Object.defineProperty(Ls, "__esModule", { value: !0 });
    Ls.default = VV;
    function VV(e, t, r, n, i, o, a, s, u, d, g, v, E) {
      return function (m) {
        e(m);
        var T = m.form,
          w = {
            name: T.attr("data-name") || T.attr("name") || "Untitled Form",
            pageId: T.attr("data-wf-page-id") || "",
            elementId: T.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              T.html()
            ),
            trackingCookies: n(),
          };
        let k = T.attr("data-wf-flow");
        k && (w.wfFlow = k), i(m);
        var S = o(T, w.fields);
        if (S) return a(S);
        if (((w.fileUploads = s(T)), u(m), !d)) {
          g(m);
          return;
        }
        v.ajax({
          url: E,
          type: "POST",
          data: w,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (N) {
            N && N.code === 200 && (m.success = !0), g(m);
          })
          .fail(function () {
            g(m);
          });
      };
    }
  });
  var X_ = c((pz, H_) => {
    "use strict";
    var Ni = Pe();
    Ni.define(
      "forms",
      (H_.exports = function (e, t) {
        var r = {},
          n = e(document),
          i,
          o = window.location,
          a = window.XDomainRequest && !window.atob,
          s = ".w-form",
          u,
          d = /e(-)?mail/i,
          g = /^\S+@\S+$/,
          v = window.alert,
          E = Ni.env(),
          m,
          T,
          w,
          k = /list-manage[1-9]?.com/i,
          S = t.debounce(function () {
            v(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              N(), !E && !m && M();
            };
        function N() {
          (u = e("html").attr("data-wf-site")),
            (T = "https://webflow.com/api/v1/form/" + u),
            a &&
              T.indexOf("https://webflow.com") >= 0 &&
              (T = T.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (w = `${T}/signFile`),
            (i = e(s + " form")),
            i.length && i.each(C);
        }
        function C(V, j) {
          var p = e(j),
            _ = e.data(j, s);
          _ || (_ = e.data(j, s, { form: p })), F(_);
          var b = p.closest("div.w-form");
          (_.done = b.find("> .w-form-done")),
            (_.fail = b.find("> .w-form-fail")),
            (_.fileUploads = b.find(".w-file-upload")),
            _.fileUploads.each(function (W) {
              X(W, _);
            });
          var l =
            _.form.attr("aria-label") || _.form.attr("data-name") || "Form";
          _.done.attr("aria-label") || _.form.attr("aria-label", l),
            _.done.attr("tabindex", "-1"),
            _.done.attr("role", "region"),
            _.done.attr("aria-label") ||
              _.done.attr("aria-label", l + " success"),
            _.fail.attr("tabindex", "-1"),
            _.fail.attr("role", "region"),
            _.fail.attr("aria-label") ||
              _.fail.attr("aria-label", l + " failure");
          var G = (_.action = p.attr("action"));
          if (
            ((_.handler = null),
            (_.redirect = p.attr("data-redirect")),
            k.test(G))
          ) {
            _.handler = y;
            return;
          }
          if (!G) {
            if (u) {
              _.handler = (() => {
                let W = W_().default;
                return W(F, o, Ni, te, U, z, v, K, q, u, P, e, T);
              })();
              return;
            }
            S();
          }
        }
        function M() {
          (m = !0),
            n.on("submit", s + " form", function (W) {
              var R = e.data(this, s);
              R.handler && ((R.evt = W), R.handler(R));
            });
          let V = ".w-checkbox-input",
            j = ".w-radio-input",
            p = "w--redirected-checked",
            _ = "w--redirected-focus",
            b = "w--redirected-focus-visible",
            l = ":focus-visible, [data-wf-focus-visible]",
            G = [
              ["checkbox", V],
              ["radio", j],
            ];
          n.on(
            "change",
            s + ' form input[type="checkbox"]:not(' + V + ")",
            (W) => {
              e(W.target).siblings(V).toggleClass(p);
            }
          ),
            n.on("change", s + ' form input[type="radio"]', (W) => {
              e(`input[name="${W.target.name}"]:not(${V})`).map((oe, fe) =>
                e(fe).siblings(j).removeClass(p)
              );
              let R = e(W.target);
              R.hasClass("w-radio-input") || R.siblings(j).addClass(p);
            }),
            G.forEach(([W, R]) => {
              n.on(
                "focus",
                s + ` form input[type="${W}"]:not(` + R + ")",
                (oe) => {
                  e(oe.target).siblings(R).addClass(_),
                    e(oe.target).filter(l).siblings(R).addClass(b);
                }
              ),
                n.on(
                  "blur",
                  s + ` form input[type="${W}"]:not(` + R + ")",
                  (oe) => {
                    e(oe.target).siblings(R).removeClass(`${_} ${b}`);
                  }
                );
            });
        }
        function F(V) {
          var j = (V.btn = V.form.find(':input[type="submit"]'));
          (V.wait = V.btn.attr("data-wait") || null),
            (V.success = !1),
            j.prop("disabled", !1),
            V.label && j.val(V.label);
        }
        function q(V) {
          var j = V.btn,
            p = V.wait;
          j.prop("disabled", !0), p && ((V.label = j.val()), j.val(p));
        }
        function z(V, j) {
          var p = null;
          return (
            (j = j || {}),
            V.find(':input:not([type="submit"]):not([type="file"])').each(
              function (_, b) {
                var l = e(b),
                  G = l.attr("type"),
                  W =
                    l.attr("data-name") || l.attr("name") || "Field " + (_ + 1),
                  R = l.val();
                if (G === "checkbox") R = l.is(":checked");
                else if (G === "radio") {
                  if (j[W] === null || typeof j[W] == "string") return;
                  R =
                    V.find(
                      'input[name="' + l.attr("name") + '"]:checked'
                    ).val() || null;
                }
                typeof R == "string" && (R = e.trim(R)),
                  (j[W] = R),
                  (p = p || H(l, G, W, R));
              }
            ),
            p
          );
        }
        function K(V) {
          var j = {};
          return (
            V.find(':input[type="file"]').each(function (p, _) {
              var b = e(_),
                l = b.attr("data-name") || b.attr("name") || "File " + (p + 1),
                G = b.attr("data-value");
              typeof G == "string" && (G = e.trim(G)), (j[l] = G);
            }),
            j
          );
        }
        let Z = { _mkto_trk: "marketo" };
        function te() {
          return document.cookie.split("; ").reduce(function (j, p) {
            let _ = p.split("="),
              b = _[0];
            if (b in Z) {
              let l = Z[b],
                G = _.slice(1).join("=");
              j[l] = G;
            }
            return j;
          }, {});
        }
        function H(V, j, p, _) {
          var b = null;
          return (
            j === "password"
              ? (b = "Passwords cannot be submitted.")
              : V.attr("required")
              ? _
                ? d.test(V.attr("type")) &&
                  (g.test(_) ||
                    (b = "Please enter a valid email address for: " + p))
                : (b = "Please fill out the required field: " + p)
              : p === "g-recaptcha-response" &&
                !_ &&
                (b = "Please confirm you\u2019re not a robot."),
            b
          );
        }
        function A(V) {
          U(V), P(V);
        }
        function y(V) {
          F(V);
          var j = V.form,
            p = {};
          if (/^https/.test(o.href) && !/^https/.test(V.action)) {
            j.attr("method", "post");
            return;
          }
          U(V);
          var _ = z(j, p);
          if (_) return v(_);
          q(V);
          var b;
          t.each(p, function (R, oe) {
            d.test(oe) && (p.EMAIL = R),
              /^((full[ _-]?)?name)$/i.test(oe) && (b = R),
              /^(first[ _-]?name)$/i.test(oe) && (p.FNAME = R),
              /^(last[ _-]?name)$/i.test(oe) && (p.LNAME = R);
          }),
            b &&
              !p.FNAME &&
              ((b = b.split(" ")),
              (p.FNAME = b[0]),
              (p.LNAME = p.LNAME || b[1]));
          var l = V.action.replace("/post?", "/post-json?") + "&c=?",
            G = l.indexOf("u=") + 2;
          G = l.substring(G, l.indexOf("&", G));
          var W = l.indexOf("id=") + 3;
          (W = l.substring(W, l.indexOf("&", W))),
            (p["b_" + G + "_" + W] = ""),
            e
              .ajax({ url: l, data: p, dataType: "jsonp" })
              .done(function (R) {
                (V.success = R.result === "success" || /already/.test(R.msg)),
                  V.success || console.info("MailChimp error: " + R.msg),
                  P(V);
              })
              .fail(function () {
                P(V);
              });
        }
        function P(V) {
          var j = V.form,
            p = V.redirect,
            _ = V.success;
          if (_ && p) {
            Ni.location(p);
            return;
          }
          V.done.toggle(_),
            V.fail.toggle(!_),
            _ ? V.done.focus() : V.fail.focus(),
            j.toggle(!_),
            F(V);
        }
        function U(V) {
          V.evt && V.evt.preventDefault(), (V.evt = null);
        }
        function X(V, j) {
          if (!j.fileUploads || !j.fileUploads[V]) return;
          var p,
            _ = e(j.fileUploads[V]),
            b = _.find("> .w-file-upload-default"),
            l = _.find("> .w-file-upload-uploading"),
            G = _.find("> .w-file-upload-success"),
            W = _.find("> .w-file-upload-error"),
            R = b.find(".w-file-upload-input"),
            oe = b.find(".w-file-upload-label"),
            fe = oe.children(),
            ae = W.find(".w-file-upload-error-msg"),
            h = G.find(".w-file-upload-file"),
            B = G.find(".w-file-remove-link"),
            J = h.find(".w-file-upload-file-name"),
            Y = ae.attr("data-w-size-error"),
            pe = ae.attr("data-w-type-error"),
            Fe = ae.attr("data-w-generic-error");
          if (
            (E ||
              oe.on("click keydown", function (O) {
                (O.type === "keydown" && O.which !== 13 && O.which !== 32) ||
                  (O.preventDefault(), R.click());
              }),
            oe.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            B.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            E)
          )
            R.on("click", function (O) {
              O.preventDefault();
            }),
              oe.on("click", function (O) {
                O.preventDefault();
              }),
              fe.on("click", function (O) {
                O.preventDefault();
              });
          else {
            B.on("click keydown", function (O) {
              if (O.type === "keydown") {
                if (O.which !== 13 && O.which !== 32) return;
                O.preventDefault();
              }
              R.removeAttr("data-value"),
                R.val(""),
                J.html(""),
                b.toggle(!0),
                G.toggle(!1),
                oe.focus();
            }),
              R.on("change", function (O) {
                (p = O.target && O.target.files && O.target.files[0]),
                  p &&
                    (b.toggle(!1),
                    W.toggle(!1),
                    l.toggle(!0),
                    l.focus(),
                    J.text(p.name),
                    L() || q(j),
                    (j.fileUploads[V].uploading = !0),
                    ee(p, I));
              });
            var Be = oe.outerHeight();
            R.height(Be), R.width(1);
          }
          function f(O) {
            var D = O.responseJSON && O.responseJSON.msg,
              re = Fe;
            typeof D == "string" && D.indexOf("InvalidFileTypeError") === 0
              ? (re = pe)
              : typeof D == "string" &&
                D.indexOf("MaxFileSizeError") === 0 &&
                (re = Y),
              ae.text(re),
              R.removeAttr("data-value"),
              R.val(""),
              l.toggle(!1),
              b.toggle(!0),
              W.toggle(!0),
              W.focus(),
              (j.fileUploads[V].uploading = !1),
              L() || F(j);
          }
          function I(O, D) {
            if (O) return f(O);
            var re = D.fileName,
              se = D.postData,
              he = D.fileId,
              Q = D.s3Url;
            R.attr("data-value", he), ne(Q, se, p, re, x);
          }
          function x(O) {
            if (O) return f(O);
            l.toggle(!1),
              G.css("display", "inline-block"),
              G.focus(),
              (j.fileUploads[V].uploading = !1),
              L() || F(j);
          }
          function L() {
            var O = (j.fileUploads && j.fileUploads.toArray()) || [];
            return O.some(function (D) {
              return D.uploading;
            });
          }
        }
        function ee(V, j) {
          var p = new URLSearchParams({ name: V.name, size: V.size });
          e.ajax({ type: "GET", url: `${w}?${p}`, crossDomain: !0 })
            .done(function (_) {
              j(null, _);
            })
            .fail(function (_) {
              j(_);
            });
        }
        function ne(V, j, p, _, b) {
          var l = new FormData();
          for (var G in j) l.append(G, j[G]);
          l.append("file", p, _),
            e
              .ajax({
                type: "POST",
                url: V,
                data: l,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                b(null);
              })
              .fail(function (W) {
                b(W);
              });
        }
        return r;
      })
    );
  });
  var j_ = c((vz, B_) => {
    "use strict";
    var Rt = Pe(),
      WV = jt(),
      Re = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    Rt.define(
      "navbar",
      (B_.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(window),
          o = e(document),
          a = t.debounce,
          s,
          u,
          d,
          g,
          v = Rt.env(),
          E = '<div class="w-nav-overlay" data-wf-ignore />',
          m = ".w-nav",
          T = "w--open",
          w = "w--nav-dropdown-open",
          k = "w--nav-dropdown-toggle-open",
          S = "w--nav-dropdown-list-open",
          N = "w--nav-link-open",
          C = WV.triggers,
          M = e();
        (r.ready = r.design = r.preview = F),
          (r.destroy = function () {
            (M = e()), q(), u && u.length && u.each(te);
          });
        function F() {
          (d = v && Rt.env("design")),
            (g = Rt.env("editor")),
            (s = e(document.body)),
            (u = o.find(m)),
            u.length && (u.each(Z), q(), z());
        }
        function q() {
          Rt.resize.off(K);
        }
        function z() {
          Rt.resize.on(K);
        }
        function K() {
          u.each(b);
        }
        function Z(h, B) {
          var J = e(B),
            Y = e.data(B, m);
          Y ||
            (Y = e.data(B, m, {
              open: !1,
              el: J,
              config: {},
              selectedIdx: -1,
            })),
            (Y.menu = J.find(".w-nav-menu")),
            (Y.links = Y.menu.find(".w-nav-link")),
            (Y.dropdowns = Y.menu.find(".w-dropdown")),
            (Y.dropdownToggle = Y.menu.find(".w-dropdown-toggle")),
            (Y.dropdownList = Y.menu.find(".w-dropdown-list")),
            (Y.button = J.find(".w-nav-button")),
            (Y.container = J.find(".w-container")),
            (Y.overlayContainerId = "w-nav-overlay-" + h),
            (Y.outside = p(Y));
          var pe = J.find(".w-nav-brand");
          pe &&
            pe.attr("href") === "/" &&
            pe.attr("aria-label") == null &&
            pe.attr("aria-label", "home"),
            Y.button.attr("style", "-webkit-user-select: text;"),
            Y.button.attr("aria-label") == null &&
              Y.button.attr("aria-label", "menu"),
            Y.button.attr("role", "button"),
            Y.button.attr("tabindex", "0"),
            Y.button.attr("aria-controls", Y.overlayContainerId),
            Y.button.attr("aria-haspopup", "menu"),
            Y.button.attr("aria-expanded", "false"),
            Y.el.off(m),
            Y.button.off(m),
            Y.menu.off(m),
            y(Y),
            d
              ? (H(Y), Y.el.on("setting" + m, P(Y)))
              : (A(Y),
                Y.button.on("click" + m, V(Y)),
                Y.menu.on("click" + m, "a", j(Y)),
                Y.button.on("keydown" + m, U(Y)),
                Y.el.on("keydown" + m, X(Y))),
            b(h, B);
        }
        function te(h, B) {
          var J = e.data(B, m);
          J && (H(J), e.removeData(B, m));
        }
        function H(h) {
          h.overlay && (ae(h, !0), h.overlay.remove(), (h.overlay = null));
        }
        function A(h) {
          h.overlay ||
            ((h.overlay = e(E).appendTo(h.el)),
            h.overlay.attr("id", h.overlayContainerId),
            (h.parent = h.menu.parent()),
            ae(h, !0));
        }
        function y(h) {
          var B = {},
            J = h.config || {},
            Y = (B.animation = h.el.attr("data-animation") || "default");
          (B.animOver = /^over/.test(Y)),
            (B.animDirect = /left$/.test(Y) ? -1 : 1),
            J.animation !== Y && h.open && t.defer(ne, h),
            (B.easing = h.el.attr("data-easing") || "ease"),
            (B.easing2 = h.el.attr("data-easing2") || "ease");
          var pe = h.el.attr("data-duration");
          (B.duration = pe != null ? Number(pe) : 400),
            (B.docHeight = h.el.attr("data-doc-height")),
            (h.config = B);
        }
        function P(h) {
          return function (B, J) {
            J = J || {};
            var Y = i.width();
            y(h),
              J.open === !0 && oe(h, !0),
              J.open === !1 && ae(h, !0),
              h.open &&
                t.defer(function () {
                  Y !== i.width() && ne(h);
                });
          };
        }
        function U(h) {
          return function (B) {
            switch (B.keyCode) {
              case Re.SPACE:
              case Re.ENTER:
                return V(h)(), B.preventDefault(), B.stopPropagation();
              case Re.ESCAPE:
                return ae(h), B.preventDefault(), B.stopPropagation();
              case Re.ARROW_RIGHT:
              case Re.ARROW_DOWN:
              case Re.HOME:
              case Re.END:
                return h.open
                  ? (B.keyCode === Re.END
                      ? (h.selectedIdx = h.links.length - 1)
                      : (h.selectedIdx = 0),
                    ee(h),
                    B.preventDefault(),
                    B.stopPropagation())
                  : (B.preventDefault(), B.stopPropagation());
            }
          };
        }
        function X(h) {
          return function (B) {
            if (h.open)
              switch (
                ((h.selectedIdx = h.links.index(document.activeElement)),
                B.keyCode)
              ) {
                case Re.HOME:
                case Re.END:
                  return (
                    B.keyCode === Re.END
                      ? (h.selectedIdx = h.links.length - 1)
                      : (h.selectedIdx = 0),
                    ee(h),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case Re.ESCAPE:
                  return (
                    ae(h),
                    h.button.focus(),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case Re.ARROW_LEFT:
                case Re.ARROW_UP:
                  return (
                    (h.selectedIdx = Math.max(-1, h.selectedIdx - 1)),
                    ee(h),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case Re.ARROW_RIGHT:
                case Re.ARROW_DOWN:
                  return (
                    (h.selectedIdx = Math.min(
                      h.links.length - 1,
                      h.selectedIdx + 1
                    )),
                    ee(h),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
              }
          };
        }
        function ee(h) {
          if (h.links[h.selectedIdx]) {
            var B = h.links[h.selectedIdx];
            B.focus(), j(B);
          }
        }
        function ne(h) {
          h.open && (ae(h, !0), oe(h, !0));
        }
        function V(h) {
          return a(function () {
            h.open ? ae(h) : oe(h);
          });
        }
        function j(h) {
          return function (B) {
            var J = e(this),
              Y = J.attr("href");
            if (!Rt.validClick(B.currentTarget)) {
              B.preventDefault();
              return;
            }
            Y && Y.indexOf("#") === 0 && h.open && ae(h);
          };
        }
        function p(h) {
          return (
            h.outside && o.off("click" + m, h.outside),
            function (B) {
              var J = e(B.target);
              (g && J.closest(".w-editor-bem-EditorOverlay").length) || _(h, J);
            }
          );
        }
        var _ = a(function (h, B) {
          if (h.open) {
            var J = B.closest(".w-nav-menu");
            h.menu.is(J) || ae(h);
          }
        });
        function b(h, B) {
          var J = e.data(B, m),
            Y = (J.collapsed = J.button.css("display") !== "none");
          if ((J.open && !Y && !d && ae(J, !0), J.container.length)) {
            var pe = G(J);
            J.links.each(pe), J.dropdowns.each(pe);
          }
          J.open && fe(J);
        }
        var l = "max-width";
        function G(h) {
          var B = h.container.css(l);
          return (
            B === "none" && (B = ""),
            function (J, Y) {
              (Y = e(Y)), Y.css(l, ""), Y.css(l) === "none" && Y.css(l, B);
            }
          );
        }
        function W(h, B) {
          B.setAttribute("data-nav-menu-open", "");
        }
        function R(h, B) {
          B.removeAttribute("data-nav-menu-open");
        }
        function oe(h, B) {
          if (h.open) return;
          (h.open = !0),
            h.menu.each(W),
            h.links.addClass(N),
            h.dropdowns.addClass(w),
            h.dropdownToggle.addClass(k),
            h.dropdownList.addClass(S),
            h.button.addClass(T);
          var J = h.config,
            Y = J.animation;
          (Y === "none" || !n.support.transform || J.duration <= 0) && (B = !0);
          var pe = fe(h),
            Fe = h.menu.outerHeight(!0),
            Be = h.menu.outerWidth(!0),
            f = h.el.height(),
            I = h.el[0];
          if (
            (b(0, I),
            C.intro(0, I),
            Rt.redraw.up(),
            d || o.on("click" + m, h.outside),
            B)
          ) {
            O();
            return;
          }
          var x = "transform " + J.duration + "ms " + J.easing;
          if (
            (h.overlay &&
              ((M = h.menu.prev()), h.overlay.show().append(h.menu)),
            J.animOver)
          ) {
            n(h.menu)
              .add(x)
              .set({ x: J.animDirect * Be, height: pe })
              .start({ x: 0 })
              .then(O),
              h.overlay && h.overlay.width(Be);
            return;
          }
          var L = f + Fe;
          n(h.menu).add(x).set({ y: -L }).start({ y: 0 }).then(O);
          function O() {
            h.button.attr("aria-expanded", "true");
          }
        }
        function fe(h) {
          var B = h.config,
            J = B.docHeight ? o.height() : s.height();
          return (
            B.animOver
              ? h.menu.height(J)
              : h.el.css("position") !== "fixed" && (J -= h.el.outerHeight(!0)),
            h.overlay && h.overlay.height(J),
            J
          );
        }
        function ae(h, B) {
          if (!h.open) return;
          (h.open = !1), h.button.removeClass(T);
          var J = h.config;
          if (
            ((J.animation === "none" ||
              !n.support.transform ||
              J.duration <= 0) &&
              (B = !0),
            C.outro(0, h.el[0]),
            o.off("click" + m, h.outside),
            B)
          ) {
            n(h.menu).stop(), I();
            return;
          }
          var Y = "transform " + J.duration + "ms " + J.easing2,
            pe = h.menu.outerHeight(!0),
            Fe = h.menu.outerWidth(!0),
            Be = h.el.height();
          if (J.animOver) {
            n(h.menu)
              .add(Y)
              .start({ x: Fe * J.animDirect })
              .then(I);
            return;
          }
          var f = Be + pe;
          n(h.menu).add(Y).start({ y: -f }).then(I);
          function I() {
            h.menu.height(""),
              n(h.menu).set({ x: 0, y: 0 }),
              h.menu.each(R),
              h.links.removeClass(N),
              h.dropdowns.removeClass(w),
              h.dropdownToggle.removeClass(k),
              h.dropdownList.removeClass(S),
              h.overlay &&
                h.overlay.children().length &&
                (M.length ? h.menu.insertAfter(M) : h.menu.prependTo(h.parent),
                h.overlay.attr("style", "").hide()),
              h.el.triggerHandler("w-close"),
              h.button.attr("aria-expanded", "false");
          }
        }
        return r;
      })
    );
  });
  var Y_ = c((gz, K_) => {
    "use strict";
    var Ct = Pe(),
      HV = jt(),
      pt = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      z_ =
        'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    Ct.define(
      "slider",
      (K_.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(document),
          o,
          a,
          s = Ct.env(),
          u = ".w-slider",
          d = '<div class="w-slider-dot" data-wf-ignore />',
          g =
            '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
          v = "w-slider-force-show",
          E = HV.triggers,
          m,
          T = !1;
        (r.ready = function () {
          (a = Ct.env("design")), w();
        }),
          (r.design = function () {
            (a = !0), setTimeout(w, 1e3);
          }),
          (r.preview = function () {
            (a = !1), w();
          }),
          (r.redraw = function () {
            (T = !0), w(), (T = !1);
          }),
          (r.destroy = k);
        function w() {
          (o = i.find(u)), o.length && (o.each(C), !m && (k(), S()));
        }
        function k() {
          Ct.resize.off(N), Ct.redraw.off(r.redraw);
        }
        function S() {
          Ct.resize.on(N), Ct.redraw.on(r.redraw);
        }
        function N() {
          o.filter(":visible").each(X);
        }
        function C(p, _) {
          var b = e(_),
            l = e.data(_, u);
          l ||
            (l = e.data(_, u, {
              index: 0,
              depth: 1,
              hasFocus: { keyboard: !1, mouse: !1 },
              el: b,
              config: {},
            })),
            (l.mask = b.children(".w-slider-mask")),
            (l.left = b.children(".w-slider-arrow-left")),
            (l.right = b.children(".w-slider-arrow-right")),
            (l.nav = b.children(".w-slider-nav")),
            (l.slides = l.mask.children(".w-slide")),
            l.slides.each(E.reset),
            T && (l.maskWidth = 0),
            b.attr("role") === void 0 && b.attr("role", "region"),
            b.attr("aria-label") === void 0 && b.attr("aria-label", "carousel");
          var G = l.mask.attr("id");
          if (
            (G || ((G = "w-slider-mask-" + p), l.mask.attr("id", G)),
            !a && !l.ariaLiveLabel && (l.ariaLiveLabel = e(g).appendTo(l.mask)),
            l.left.attr("role", "button"),
            l.left.attr("tabindex", "0"),
            l.left.attr("aria-controls", G),
            l.left.attr("aria-label") === void 0 &&
              l.left.attr("aria-label", "previous slide"),
            l.right.attr("role", "button"),
            l.right.attr("tabindex", "0"),
            l.right.attr("aria-controls", G),
            l.right.attr("aria-label") === void 0 &&
              l.right.attr("aria-label", "next slide"),
            !n.support.transform)
          ) {
            l.left.hide(), l.right.hide(), l.nav.hide(), (m = !0);
            return;
          }
          l.el.off(u),
            l.left.off(u),
            l.right.off(u),
            l.nav.off(u),
            M(l),
            a
              ? (l.el.on("setting" + u, y(l)), A(l), (l.hasTimer = !1))
              : (l.el.on("swipe" + u, y(l)),
                l.left.on("click" + u, K(l)),
                l.right.on("click" + u, Z(l)),
                l.left.on("keydown" + u, z(l, K)),
                l.right.on("keydown" + u, z(l, Z)),
                l.nav.on("keydown" + u, "> div", y(l)),
                l.config.autoplay &&
                  !l.hasTimer &&
                  ((l.hasTimer = !0), (l.timerCount = 1), H(l)),
                l.el.on("mouseenter" + u, q(l, !0, "mouse")),
                l.el.on("focusin" + u, q(l, !0, "keyboard")),
                l.el.on("mouseleave" + u, q(l, !1, "mouse")),
                l.el.on("focusout" + u, q(l, !1, "keyboard"))),
            l.nav.on("click" + u, "> div", y(l)),
            s ||
              l.mask
                .contents()
                .filter(function () {
                  return this.nodeType === 3;
                })
                .remove();
          var W = b.filter(":hidden");
          W.addClass(v);
          var R = b.parents(":hidden");
          R.addClass(v), T || X(p, _), W.removeClass(v), R.removeClass(v);
        }
        function M(p) {
          var _ = {};
          (_.crossOver = 0),
            (_.animation = p.el.attr("data-animation") || "slide"),
            _.animation === "outin" &&
              ((_.animation = "cross"), (_.crossOver = 0.5)),
            (_.easing = p.el.attr("data-easing") || "ease");
          var b = p.el.attr("data-duration");
          if (
            ((_.duration = b != null ? parseInt(b, 10) : 500),
            F(p.el.attr("data-infinite")) && (_.infinite = !0),
            F(p.el.attr("data-disable-swipe")) && (_.disableSwipe = !0),
            F(p.el.attr("data-hide-arrows"))
              ? (_.hideArrows = !0)
              : p.config.hideArrows && (p.left.show(), p.right.show()),
            F(p.el.attr("data-autoplay")))
          ) {
            (_.autoplay = !0),
              (_.delay = parseInt(p.el.attr("data-delay"), 10) || 2e3),
              (_.timerMax = parseInt(p.el.attr("data-autoplay-limit"), 10));
            var l = "mousedown" + u + " touchstart" + u;
            a ||
              p.el.off(l).one(l, function () {
                A(p);
              });
          }
          var G = p.right.width();
          (_.edge = G ? G + 40 : 100), (p.config = _);
        }
        function F(p) {
          return p === "1" || p === "true";
        }
        function q(p, _, b) {
          return function (l) {
            if (_) p.hasFocus[b] = _;
            else if (
              e.contains(p.el.get(0), l.relatedTarget) ||
              ((p.hasFocus[b] = _),
              (p.hasFocus.mouse && b === "keyboard") ||
                (p.hasFocus.keyboard && b === "mouse"))
            )
              return;
            _
              ? (p.ariaLiveLabel.attr("aria-live", "polite"),
                p.hasTimer && A(p))
              : (p.ariaLiveLabel.attr("aria-live", "off"), p.hasTimer && H(p));
          };
        }
        function z(p, _) {
          return function (b) {
            switch (b.keyCode) {
              case pt.SPACE:
              case pt.ENTER:
                return _(p)(), b.preventDefault(), b.stopPropagation();
            }
          };
        }
        function K(p) {
          return function () {
            U(p, { index: p.index - 1, vector: -1 });
          };
        }
        function Z(p) {
          return function () {
            U(p, { index: p.index + 1, vector: 1 });
          };
        }
        function te(p, _) {
          var b = null;
          _ === p.slides.length && (w(), ee(p)),
            t.each(p.anchors, function (l, G) {
              e(l.els).each(function (W, R) {
                e(R).index() === _ && (b = G);
              });
            }),
            b != null && U(p, { index: b, immediate: !0 });
        }
        function H(p) {
          A(p);
          var _ = p.config,
            b = _.timerMax;
          (b && p.timerCount++ > b) ||
            (p.timerId = window.setTimeout(function () {
              p.timerId == null || a || (Z(p)(), H(p));
            }, _.delay));
        }
        function A(p) {
          window.clearTimeout(p.timerId), (p.timerId = null);
        }
        function y(p) {
          return function (_, b) {
            b = b || {};
            var l = p.config;
            if (a && _.type === "setting") {
              if (b.select === "prev") return K(p)();
              if (b.select === "next") return Z(p)();
              if ((M(p), ee(p), b.select == null)) return;
              te(p, b.select);
              return;
            }
            if (_.type === "swipe")
              return l.disableSwipe || Ct.env("editor")
                ? void 0
                : b.direction === "left"
                ? Z(p)()
                : b.direction === "right"
                ? K(p)()
                : void 0;
            if (p.nav.has(_.target).length) {
              var G = e(_.target).index();
              if (
                (_.type === "click" && U(p, { index: G }), _.type === "keydown")
              )
                switch (_.keyCode) {
                  case pt.ENTER:
                  case pt.SPACE: {
                    U(p, { index: G }), _.preventDefault();
                    break;
                  }
                  case pt.ARROW_LEFT:
                  case pt.ARROW_UP: {
                    P(p.nav, Math.max(G - 1, 0)), _.preventDefault();
                    break;
                  }
                  case pt.ARROW_RIGHT:
                  case pt.ARROW_DOWN: {
                    P(p.nav, Math.min(G + 1, p.pages)), _.preventDefault();
                    break;
                  }
                  case pt.HOME: {
                    P(p.nav, 0), _.preventDefault();
                    break;
                  }
                  case pt.END: {
                    P(p.nav, p.pages), _.preventDefault();
                    break;
                  }
                  default:
                    return;
                }
            }
          };
        }
        function P(p, _) {
          var b = p.children().eq(_).focus();
          p.children().not(b);
        }
        function U(p, _) {
          _ = _ || {};
          var b = p.config,
            l = p.anchors;
          p.previous = p.index;
          var G = _.index,
            W = {};
          G < 0
            ? ((G = l.length - 1),
              b.infinite &&
                ((W.x = -p.endX), (W.from = 0), (W.to = l[0].width)))
            : G >= l.length &&
              ((G = 0),
              b.infinite &&
                ((W.x = l[l.length - 1].width),
                (W.from = -l[l.length - 1].x),
                (W.to = W.from - W.x))),
            (p.index = G);
          var R = p.nav
            .children()
            .eq(G)
            .addClass("w-active")
            .attr("aria-pressed", "true")
            .attr("tabindex", "0");
          p.nav
            .children()
            .not(R)
            .removeClass("w-active")
            .attr("aria-pressed", "false")
            .attr("tabindex", "-1"),
            b.hideArrows &&
              (p.index === l.length - 1 ? p.right.hide() : p.right.show(),
              p.index === 0 ? p.left.hide() : p.left.show());
          var oe = p.offsetX || 0,
            fe = (p.offsetX = -l[p.index].x),
            ae = { x: fe, opacity: 1, visibility: "" },
            h = e(l[p.index].els),
            B = e(l[p.previous] && l[p.previous].els),
            J = p.slides.not(h),
            Y = b.animation,
            pe = b.easing,
            Fe = Math.round(b.duration),
            Be = _.vector || (p.index > p.previous ? 1 : -1),
            f = "opacity " + Fe + "ms " + pe,
            I = "transform " + Fe + "ms " + pe;
          if (
            (h.find(z_).removeAttr("tabindex"),
            h.removeAttr("aria-hidden"),
            h.find("*").removeAttr("aria-hidden"),
            J.find(z_).attr("tabindex", "-1"),
            J.attr("aria-hidden", "true"),
            J.find("*").attr("aria-hidden", "true"),
            a || (h.each(E.intro), J.each(E.outro)),
            _.immediate && !T)
          ) {
            n(h).set(ae), O();
            return;
          }
          if (p.index === p.previous) return;
          if (
            (a || p.ariaLiveLabel.text(`Slide ${G + 1} of ${l.length}.`),
            Y === "cross")
          ) {
            var x = Math.round(Fe - Fe * b.crossOver),
              L = Math.round(Fe - x);
            (f = "opacity " + x + "ms " + pe),
              n(B).set({ visibility: "" }).add(f).start({ opacity: 0 }),
              n(h)
                .set({ visibility: "", x: fe, opacity: 0, zIndex: p.depth++ })
                .add(f)
                .wait(L)
                .then({ opacity: 1 })
                .then(O);
            return;
          }
          if (Y === "fade") {
            n(B).set({ visibility: "" }).stop(),
              n(h)
                .set({ visibility: "", x: fe, opacity: 0, zIndex: p.depth++ })
                .add(f)
                .start({ opacity: 1 })
                .then(O);
            return;
          }
          if (Y === "over") {
            (ae = { x: p.endX }),
              n(B).set({ visibility: "" }).stop(),
              n(h)
                .set({
                  visibility: "",
                  zIndex: p.depth++,
                  x: fe + l[p.index].width * Be,
                })
                .add(I)
                .start({ x: fe })
                .then(O);
            return;
          }
          b.infinite && W.x
            ? (n(p.slides.not(B))
                .set({ visibility: "", x: W.x })
                .add(I)
                .start({ x: fe }),
              n(B).set({ visibility: "", x: W.from }).add(I).start({ x: W.to }),
              (p.shifted = B))
            : (b.infinite &&
                p.shifted &&
                (n(p.shifted).set({ visibility: "", x: oe }),
                (p.shifted = null)),
              n(p.slides).set({ visibility: "" }).add(I).start({ x: fe }));
          function O() {
            (h = e(l[p.index].els)),
              (J = p.slides.not(h)),
              Y !== "slide" && (ae.visibility = "hidden"),
              n(J).set(ae);
          }
        }
        function X(p, _) {
          var b = e.data(_, u);
          if (b) {
            if (V(b)) return ee(b);
            a && j(b) && ee(b);
          }
        }
        function ee(p) {
          var _ = 1,
            b = 0,
            l = 0,
            G = 0,
            W = p.maskWidth,
            R = W - p.config.edge;
          R < 0 && (R = 0),
            (p.anchors = [{ els: [], x: 0, width: 0 }]),
            p.slides.each(function (fe, ae) {
              l - b > R &&
                (_++,
                (b += W),
                (p.anchors[_ - 1] = { els: [], x: l, width: 0 })),
                (G = e(ae).outerWidth(!0)),
                (l += G),
                (p.anchors[_ - 1].width += G),
                p.anchors[_ - 1].els.push(ae);
              var h = fe + 1 + " of " + p.slides.length;
              e(ae).attr("aria-label", h), e(ae).attr("role", "group");
            }),
            (p.endX = l),
            a && (p.pages = null),
            p.nav.length && p.pages !== _ && ((p.pages = _), ne(p));
          var oe = p.index;
          oe >= _ && (oe = _ - 1), U(p, { immediate: !0, index: oe });
        }
        function ne(p) {
          var _ = [],
            b,
            l = p.el.attr("data-nav-spacing");
          l && (l = parseFloat(l) + "px");
          for (var G = 0, W = p.pages; G < W; G++)
            (b = e(d)),
              b
                .attr("aria-label", "Show slide " + (G + 1) + " of " + W)
                .attr("aria-pressed", "false")
                .attr("role", "button")
                .attr("tabindex", "-1"),
              p.nav.hasClass("w-num") && b.text(G + 1),
              l != null && b.css({ "margin-left": l, "margin-right": l }),
              _.push(b);
          p.nav.empty().append(_);
        }
        function V(p) {
          var _ = p.mask.width();
          return p.maskWidth !== _ ? ((p.maskWidth = _), !0) : !1;
        }
        function j(p) {
          var _ = 0;
          return (
            p.slides.each(function (b, l) {
              _ += e(l).outerWidth(!0);
            }),
            p.slidesWidth !== _ ? ((p.slidesWidth = _), !0) : !1
          );
        }
        return r;
      })
    );
  });
  var Q_ = c((hz, $_) => {
    "use strict";
    var Lt = Pe(),
      XV = jt();
    Lt.define(
      "tabs",
      ($_.exports = function (e) {
        var t = {},
          r = e.tram,
          n = e(document),
          i,
          o,
          a = Lt.env,
          s = a.safari,
          u = a(),
          d = "data-w-tab",
          g = "data-w-pane",
          v = ".w-tabs",
          E = "w--current",
          m = "w--tab-active",
          T = XV.triggers,
          w = !1;
        (t.ready = t.design = t.preview = k),
          (t.redraw = function () {
            (w = !0), k(), (w = !1);
          }),
          (t.destroy = function () {
            (i = n.find(v)), i.length && (i.each(C), S());
          });
        function k() {
          (o = u && Lt.env("design")),
            (i = n.find(v)),
            i.length &&
              (i.each(M), Lt.env("preview") && !w && i.each(C), S(), N());
        }
        function S() {
          Lt.redraw.off(t.redraw);
        }
        function N() {
          Lt.redraw.on(t.redraw);
        }
        function C(H, A) {
          var y = e.data(A, v);
          y &&
            (y.links && y.links.each(T.reset),
            y.panes && y.panes.each(T.reset));
        }
        function M(H, A) {
          var y = v.substr(1) + "-" + H,
            P = e(A),
            U = e.data(A, v);
          if (
            (U || (U = e.data(A, v, { el: P, config: {} })),
            (U.current = null),
            (U.tabIdentifier = y + "-" + d),
            (U.paneIdentifier = y + "-" + g),
            (U.menu = P.children(".w-tab-menu")),
            (U.links = U.menu.children(".w-tab-link")),
            (U.content = P.children(".w-tab-content")),
            (U.panes = U.content.children(".w-tab-pane")),
            U.el.off(v),
            U.links.off(v),
            U.menu.attr("role", "tablist"),
            U.links.attr("tabindex", "-1"),
            F(U),
            !o)
          ) {
            U.links.on("click" + v, z(U)), U.links.on("keydown" + v, K(U));
            var X = U.links.filter("." + E),
              ee = X.attr(d);
            ee && Z(U, { tab: ee, immediate: !0 });
          }
        }
        function F(H) {
          var A = {};
          A.easing = H.el.attr("data-easing") || "ease";
          var y = parseInt(H.el.attr("data-duration-in"), 10);
          y = A.intro = y === y ? y : 0;
          var P = parseInt(H.el.attr("data-duration-out"), 10);
          (P = A.outro = P === P ? P : 0),
            (A.immediate = !y && !P),
            (H.config = A);
        }
        function q(H) {
          var A = H.current;
          return Array.prototype.findIndex.call(
            H.links,
            (y) => y.getAttribute(d) === A,
            null
          );
        }
        function z(H) {
          return function (A) {
            A.preventDefault();
            var y = A.currentTarget.getAttribute(d);
            y && Z(H, { tab: y });
          };
        }
        function K(H) {
          return function (A) {
            var y = q(H),
              P = A.key,
              U = {
                ArrowLeft: y - 1,
                ArrowUp: y - 1,
                ArrowRight: y + 1,
                ArrowDown: y + 1,
                End: H.links.length - 1,
                Home: 0,
              };
            if (P in U) {
              A.preventDefault();
              var X = U[P];
              X === -1 && (X = H.links.length - 1),
                X === H.links.length && (X = 0);
              var ee = H.links[X],
                ne = ee.getAttribute(d);
              ne && Z(H, { tab: ne });
            }
          };
        }
        function Z(H, A) {
          A = A || {};
          var y = H.config,
            P = y.easing,
            U = A.tab;
          if (U !== H.current) {
            H.current = U;
            var X;
            H.links.each(function (b, l) {
              var G = e(l);
              if (A.immediate || y.immediate) {
                var W = H.panes[b];
                l.id || (l.id = H.tabIdentifier + "-" + b),
                  W.id || (W.id = H.paneIdentifier + "-" + b),
                  (l.href = "#" + W.id),
                  l.setAttribute("role", "tab"),
                  l.setAttribute("aria-controls", W.id),
                  l.setAttribute("aria-selected", "false"),
                  W.setAttribute("role", "tabpanel"),
                  W.setAttribute("aria-labelledby", l.id);
              }
              l.getAttribute(d) === U
                ? ((X = l),
                  G.addClass(E)
                    .removeAttr("tabindex")
                    .attr({ "aria-selected": "true" })
                    .each(T.intro))
                : G.hasClass(E) &&
                  G.removeClass(E)
                    .attr({ tabindex: "-1", "aria-selected": "false" })
                    .each(T.outro);
            });
            var ee = [],
              ne = [];
            H.panes.each(function (b, l) {
              var G = e(l);
              l.getAttribute(d) === U
                ? ee.push(l)
                : G.hasClass(m) && ne.push(l);
            });
            var V = e(ee),
              j = e(ne);
            if (A.immediate || y.immediate) {
              V.addClass(m).each(T.intro),
                j.removeClass(m),
                w || Lt.redraw.up();
              return;
            } else {
              var p = window.scrollX,
                _ = window.scrollY;
              X.focus(), window.scrollTo(p, _);
            }
            j.length && y.outro
              ? (j.each(T.outro),
                r(j)
                  .add("opacity " + y.outro + "ms " + P, { fallback: s })
                  .start({ opacity: 0 })
                  .then(() => te(y, j, V)))
              : te(y, j, V);
          }
        }
        function te(H, A, y) {
          if (
            (A.removeClass(m).css({
              opacity: "",
              transition: "",
              transform: "",
              width: "",
              height: "",
            }),
            y.addClass(m).each(T.intro),
            Lt.redraw.up(),
            !H.intro)
          )
            return r(y).set({ opacity: 1 });
          r(y)
            .set({ opacity: 0 })
            .redraw()
            .add("opacity " + H.intro + "ms " + H.easing, { fallback: s })
            .start({ opacity: 1 });
        }
        return t;
      })
    );
  });
  Ps();
  Ms();
  zs();
  Ys();
  Qs();
  eu();
  jt();
  N_();
  M_();
  D_();
  k_();
  V_();
  X_();
  j_();
  Y_();
  Q_();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    "e-27": {
      id: "e-27",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-28",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699721889707,
    },
    "e-29": {
      id: "e-29",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-30",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699736595214,
    },
    "e-30": {
      id: "e-30",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-29",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699736595214,
    },
    "e-47": {
      id: "e-47",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-9", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-9-p",
          selectedAxis: "X_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-9-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
      ],
      createdOn: 1699741318057,
    },
    "e-48": {
      id: "e-48",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-49",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1699989839755,
    },
    "e-58": {
      id: "e-58",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-59" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a4896",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a4896",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 4,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-60": {
      id: "e-60",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-61",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a4896",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a4896",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-61": {
      id: "e-61",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-60",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a4896",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a4896",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-62": {
      id: "e-62",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-63" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a489e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a489e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 5,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-64": {
      id: "e-64",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-65",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a489e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a489e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-65": {
      id: "e-65",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-64",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a489e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a489e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-66": {
      id: "e-66",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-67" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48a6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48a6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 6,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-68": {
      id: "e-68",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-69",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48a6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48a6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-69": {
      id: "e-69",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-68",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48a6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48a6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-70": {
      id: "e-70",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-71" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 7,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-72": {
      id: "e-72",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-73",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-73": {
      id: "e-73",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-72",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48ae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48ae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-74": {
      id: "e-74",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-75",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48b6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48b6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-75": {
      id: "e-75",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-74",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48b6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48b6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-76": {
      id: "e-76",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-77" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48b6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48b6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 8,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-78": {
      id: "e-78",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-79" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 9,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-80": {
      id: "e-80",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-81",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-81": {
      id: "e-81",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-80",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48be",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48be",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-82": {
      id: "e-82",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-83" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48c6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48c6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 10,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-84": {
      id: "e-84",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-85",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48c6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48c6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-85": {
      id: "e-85",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-84",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48c6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48c6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680217154,
    },
    "e-86": {
      id: "e-86",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-87" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48d0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48d0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 4,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-88": {
      id: "e-88",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-89" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48d6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48d6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 6,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-90": {
      id: "e-90",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-91" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48d9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48d9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 8,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-92": {
      id: "e-92",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-93" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48f7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a48f7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-94": {
      id: "e-94",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-95" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a4942",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "655e5212dce7e2ae1517fc40|47e5322d-8224-b936-a7d8-35164e9a4942",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 4,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1700680217154,
    },
    "e-96": {
      id: "e-96",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-97",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07b39",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07b39",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680274677,
    },
    "e-98": {
      id: "e-98",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-99",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07be7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07be7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680274677,
    },
    "e-99": {
      id: "e-99",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-98",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07be7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07be7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680274677,
    },
    "e-100": {
      id: "e-100",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-101",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bf2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bf2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680274677,
    },
    "e-101": {
      id: "e-101",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-100",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bf2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bf2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680274677,
    },
    "e-102": {
      id: "e-102",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-103",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bfd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bfd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680274677,
    },
    "e-103": {
      id: "e-103",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-102",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bfd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bfd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700680274677,
    },
    "e-104": {
      id: "e-104",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-105",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bdc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bdc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700818548146,
    },
    "e-105": {
      id: "e-105",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-104",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bdc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07bdc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700818548147,
    },
    "e-106": {
      id: "e-106",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-107",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6947367f-5fe1-212b-c135-12a7e2e3b7ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6947367f-5fe1-212b-c135-12a7e2e3b7ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922320956,
    },
    "e-107": {
      id: "e-107",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-106",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6947367f-5fe1-212b-c135-12a7e2e3b7ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6947367f-5fe1-212b-c135-12a7e2e3b7ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922321017,
    },
    "e-108": {
      id: "e-108",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-109",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|35f6ce08-1ebf-453b-a9e3-21f647f817e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|35f6ce08-1ebf-453b-a9e3-21f647f817e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922483896,
    },
    "e-109": {
      id: "e-109",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-108",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|35f6ce08-1ebf-453b-a9e3-21f647f817e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|35f6ce08-1ebf-453b-a9e3-21f647f817e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922483896,
    },
    "e-110": {
      id: "e-110",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-111",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|23e9bfd3-c469-4f95-10a4-79b8b31f76e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|23e9bfd3-c469-4f95-10a4-79b8b31f76e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922484501,
    },
    "e-111": {
      id: "e-111",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-110",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|23e9bfd3-c469-4f95-10a4-79b8b31f76e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|23e9bfd3-c469-4f95-10a4-79b8b31f76e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922484501,
    },
    "e-112": {
      id: "e-112",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-113",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|1e643a7c-43da-e64d-0c7f-d3e99f053ab8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|1e643a7c-43da-e64d-0c7f-d3e99f053ab8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922485110,
    },
    "e-113": {
      id: "e-113",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-112",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|1e643a7c-43da-e64d-0c7f-d3e99f053ab8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|1e643a7c-43da-e64d-0c7f-d3e99f053ab8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922485110,
    },
    "e-114": {
      id: "e-114",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-115",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|08d31d83-a792-7aa9-b857-55da25a34dfc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|08d31d83-a792-7aa9-b857-55da25a34dfc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922486064,
    },
    "e-115": {
      id: "e-115",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-114",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|08d31d83-a792-7aa9-b857-55da25a34dfc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|08d31d83-a792-7aa9-b857-55da25a34dfc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922486064,
    },
    "e-116": {
      id: "e-116",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-117",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|a35c2b44-d154-1015-12ab-8c704d2a4b87",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|a35c2b44-d154-1015-12ab-8c704d2a4b87",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922487096,
    },
    "e-117": {
      id: "e-117",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-116",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|a35c2b44-d154-1015-12ab-8c704d2a4b87",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|a35c2b44-d154-1015-12ab-8c704d2a4b87",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700922487096,
    },
    "e-118": {
      id: "e-118",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-119",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5324a90e-f797-b11d-a9cd-16167a9e50ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5324a90e-f797-b11d-a9cd-16167a9e50ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700938165834,
    },
    "e-119": {
      id: "e-119",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-118",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5324a90e-f797-b11d-a9cd-16167a9e50ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5324a90e-f797-b11d-a9cd-16167a9e50ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700938165835,
    },
    "e-120": {
      id: "e-120",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-121",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|171ea4c2-f740-732d-2d0a-da5b85283654",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|171ea4c2-f740-732d-2d0a-da5b85283654",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700938872416,
    },
    "e-121": {
      id: "e-121",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-120",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "654d582cdd1c22473dd34db5|171ea4c2-f740-732d-2d0a-da5b85283654",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "654d582cdd1c22473dd34db5|171ea4c2-f740-732d-2d0a-da5b85283654",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700938872416,
    },
    "e-122": {
      id: "e-122",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-123",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ab3e886-3c1a-b518-10f1-76ce7ac2982b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ab3e886-3c1a-b518-10f1-76ce7ac2982b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700945571122,
    },
    "e-123": {
      id: "e-123",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-122",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5ab3e886-3c1a-b518-10f1-76ce7ac2982b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5ab3e886-3c1a-b518-10f1-76ce7ac2982b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700945571123,
    },
    "e-124": {
      id: "e-124",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-125",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67a7eebd-0636-4014-c38c-bc1c5fff767b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67a7eebd-0636-4014-c38c-bc1c5fff767b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700945591363,
    },
    "e-125": {
      id: "e-125",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-124",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "67a7eebd-0636-4014-c38c-bc1c5fff767b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "67a7eebd-0636-4014-c38c-bc1c5fff767b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700945591364,
    },
    "e-126": {
      id: "e-126",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-127",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "171ea4c2-f740-732d-2d0a-da5b8528366a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "171ea4c2-f740-732d-2d0a-da5b8528366a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700945610147,
    },
    "e-127": {
      id: "e-127",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-126",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "171ea4c2-f740-732d-2d0a-da5b8528366a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "171ea4c2-f740-732d-2d0a-da5b8528366a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1700945610202,
    },
  },
  actionLists: {
    "a-2": {
      id: "a-2",
      title: "LOOP 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".marquee-content-2",
                  selectorGuids: ["83665291-e09c-53c0-b29d-4950241a8a58"],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-2-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 15000,
                target: {
                  selector: ".marquee-content-2",
                  selectorGuids: ["83665291-e09c-53c0-b29d-4950241a8a58"],
                },
                xValue: -79.45,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-2-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".marquee-content-2",
                  selectorGuids: ["83665291-e09c-53c0-b29d-4950241a8a58"],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699720871530,
    },
    "a-4": {
      id: "a-4",
      title: "Nav stay",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 400,
                target: {
                  id: "654d582cdd1c22473dd34db5|dfdeccd4-0f9f-82c5-ddac-f89e4c722765",
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "vh",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1699736772787,
    },
    "a-3": {
      id: "a-3",
      title: "Nav leave",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-3-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 400,
                target: {
                  id: "654d582cdd1c22473dd34db5|dfdeccd4-0f9f-82c5-ddac-f89e4c722765",
                },
                yValue: -14,
                xUnit: "PX",
                yUnit: "vh",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1699736605299,
    },
    "a-9": {
      id: "a-9",
      title: "mouse move",
      continuousParameterGroups: [
        {
          id: "a-9-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-9-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".img-anii",
                      selectorGuids: ["d75d1ed2-addf-1850-2988-5abb3ae54571"],
                    },
                    xValue: -7,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-9-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".img-anii",
                      selectorGuids: ["d75d1ed2-addf-1850-2988-5abb3ae54571"],
                    },
                    xValue: 85,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-9-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-9-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".img-anii",
                      selectorGuids: ["d75d1ed2-addf-1850-2988-5abb3ae54571"],
                    },
                    yValue: 50,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-9-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".img-anii",
                      selectorGuids: ["d75d1ed2-addf-1850-2988-5abb3ae54571"],
                    },
                    yValue: -50,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1699741323818,
    },
    "a-10": {
      id: "a-10",
      title: "New Timed Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-10-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".inner-container",
                  selectorGuids: ["6d5bf94a-2dbd-75a0-2de9-fca775c6c136"],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-10-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 20000,
                target: {
                  selector: ".inner-container",
                  selectorGuids: ["6d5bf94a-2dbd-75a0-2de9-fca775c6c136"],
                },
                xValue: -153,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-10-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".inner-container",
                  selectorGuids: ["6d5bf94a-2dbd-75a0-2de9-fca775c6c136"],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699989855202,
    },
    "a-7": {
      id: "a-7",
      title: "reveal on hover",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-7-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".img-ani",
                  selectorGuids: ["658d766d-c4b8-cb14-9bc7-9f72aa497b93"],
                },
                value: "none",
              },
            },
            {
              id: "a-7-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".img-anii",
                  selectorGuids: ["d75d1ed2-addf-1850-2988-5abb3ae54571"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-7-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".img-anii",
                  selectorGuids: ["d75d1ed2-addf-1850-2988-5abb3ae54571"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-7-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".img-ani",
                  selectorGuids: ["658d766d-c4b8-cb14-9bc7-9f72aa497b93"],
                },
                value: "block",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1699740316589,
    },
    "a-8": {
      id: "a-8",
      title: "hide image",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".img-ani",
                  selectorGuids: ["658d766d-c4b8-cb14-9bc7-9f72aa497b93"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-8-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".img-anii",
                  selectorGuids: ["d75d1ed2-addf-1850-2988-5abb3ae54571"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1699740836140,
    },
    "a-11": {
      id: "a-11",
      title: "slider 1 moves",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07b3b",
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 2000,
                easing: "",
                duration: 0,
                target: {
                  id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07b4b",
                },
                value: "block",
              },
            },
            {
              id: "a-11-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 2000,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07b3b",
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 2000,
                easing: "",
                duration: 0,
                target: {
                  id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07b5d",
                },
                value: "block",
              },
            },
            {
              id: "a-11-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 2000,
                easing: "",
                duration: 0,
                target: {
                  id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07b4b",
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 2000,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07b3b",
                },
                value: "block",
              },
            },
            {
              id: "a-11-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 2000,
                easing: "",
                duration: 0,
                target: {
                  id: "654d582cdd1c22473dd34db5|63befbc1-9c00-7ad2-07bd-a2991ca07b5d",
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1700584829939,
    },
    "a-12": {
      id: "a-12",
      title: "Dropdown opens",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-12-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-iconn",
                  selectorGuids: ["a7ca232f-5518-a0d7-96d6-83388d928735"],
                },
                xValue: 0,
                zValue: 0,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-12-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-iconn",
                  selectorGuids: ["a7ca232f-5518-a0d7-96d6-83388d928735"],
                },
                xValue: 180,
                yValue: 0,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1700563470264,
    },
    "a-13": {
      id: "a-13",
      title: "dropdown closes",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-13-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-iconn",
                  selectorGuids: ["a7ca232f-5518-a0d7-96d6-83388d928735"],
                },
                xValue: 0,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1700818438421,
    },
    "a-14": {
      id: "a-14",
      title: "footer dropdown opens",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-14-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-icon",
                  selectorGuids: ["6e210ea9-998e-d19b-e02c-a61e9ceb0815"],
                },
                xValue: 0,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-icon",
                  selectorGuids: ["6e210ea9-998e-d19b-e02c-a61e9ceb0815"],
                },
                xValue: 180,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1700922326419,
    },
    "a-15": {
      id: "a-15",
      title: "footer dropdown closes",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-15-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-icon",
                  selectorGuids: ["6e210ea9-998e-d19b-e02c-a61e9ceb0815"],
                },
                xValue: 0,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1700922383492,
    },
    "a-16": {
      id: "a-16",
      title: "menu opens",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-16-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "ebcb9650-ec61-dfd3-312d-7f761f976c1a",
                },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-16-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "ebcb9650-ec61-dfd3-312d-7f761f976c1a",
                },
                yValue: 7,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-16-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "5e5ff825-9a73-6c39-ae4a-a1763a01b703",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-16-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "e58da939-d7b8-7472-28fd-ab9b7434d4d3",
                },
                zValue: -45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-16-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "e58da939-d7b8-7472-28fd-ab9b7434d4d3",
                },
                yValue: -7,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1700938193486,
    },
    "a-17": {
      id: "a-17",
      title: "menu closes",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-17-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "ebcb9650-ec61-dfd3-312d-7f761f976c1a",
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "ebcb9650-ec61-dfd3-312d-7f761f976c1a",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-17-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "5e5ff825-9a73-6c39-ae4a-a1763a01b703",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-17-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "e58da939-d7b8-7472-28fd-ab9b7434d4d3",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-17-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "e58da939-d7b8-7472-28fd-ab9b7434d4d3",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1700938488134,
    },
    slideInBottom: {
      id: "slideInBottom",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
