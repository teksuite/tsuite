+ function(t) {
    "use strict";
    var i = function(e, o) {
        this.options = t.extend({}, i.DEFAULTS, o), this.$window = t(window).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0
    }, i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$window.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = t(document).height(),
                o = this.$window.scrollTop(),
                f = this.$element.offset(),
                n = this.options.offset,
                s = n.top,
                h = n.bottom;
            "top" == this.affixed && (f.top += o), "object" != typeof n && (h = s = n), "function" == typeof s && (s = n.top(this.$element)), "function" == typeof h && (h = n.bottom(this.$element));
            var a = null != this.unpin && o + this.unpin <= f.top ? !1 : null != h && f.top + this.$element.height() >= e - h ? "bottom" : null != s && s >= o ? "top" : !1;
            if (this.affixed !== a) {
                this.unpin && this.$element.css("top", "");
                var p = "affix" + (a ? "-" + a : ""),
                    c = t.Event(p + ".bs.affix");
                this.$element.trigger(c), c.isDefaultPrevented() || (this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(p).trigger(t.Event(p.replace("affix", "affixed"))), "bottom" == a && this.$element.offset({
                    top: e - h - this.$element.height()
                }))
            }
        }
    };
    var e = t.fn.affix;
    t.fn.affix = function(e) {
        return this.each(function() {
            var o = t(this),
                f = o.data("bs.affix"),
                n = "object" == typeof e && e;
            f || o.data("bs.affix", f = new i(this, n)), "string" == typeof e && f[e]()
        })
    }, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function() {
        return t.fn.affix = e, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this),
                e = i.data();
            e.offset = e.offset || {}, e.offsetBottom && (e.offset.bottom = e.offsetBottom), e.offsetTop && (e.offset.top = e.offsetTop), i.affix(e)
        })
    })
}(jQuery); +
function(n) {
    "use strict";

    function t() {
        var n = document.createElement("bootstrap"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in t)
            if (void 0 !== n.style[i]) return {
                end: t[i]
            };
        return !1
    }
    n.fn.emulateTransitionEnd = function(t) {
        var i = !1,
            r = this;
        n(this).one(n.support.transition.end, function() {
            i = !0
        });
        var o = function() {
            i || n(r).trigger(n.support.transition.end)
        };
        return setTimeout(o, t), this
    }, n(function() {
        n.support.transition = t()
    })
}(jQuery); +
function(t) {
    "use strict";
    var e = function(t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    e.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, e.prototype.init = function(e, i, o) {
        this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o);
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var r = n[s];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin",
                    p = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(p + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }, e.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, e.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) {
            i[t] != o && (e[t] = o)
        }), e
    }, e.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? (i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show), void 0) : i.show()
    }, e.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? (i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide), void 0) : i.hide()
    }, e.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(e), e.isDefaultPrevented()) return;
            var i = this,
                o = this.tip();
            this.setContent(), this.options.animation && o.addClass("fade");
            var n = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                s = /\s?auto?\s?/i,
                r = s.test(n);
            r && (n = n.replace(s, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(n), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
            var a = this.getPosition(),
                p = o[0].offsetWidth,
                h = o[0].offsetHeight;
            if (r) {
                var l = this.$element.parent(),
                    f = n,
                    u = document.documentElement.scrollTop || document.body.scrollTop,
                    d = "body" == this.options.container ? window.innerWidth : l.outerWidth(),
                    c = "body" == this.options.container ? window.innerHeight : l.outerHeight(),
                    y = "body" == this.options.container ? 0 : l.offset().left;
                n = "bottom" == n && a.top + a.height + h - u > c ? "top" : "top" == n && a.top - u - h < 0 ? "bottom" : "right" == n && a.right + p > d ? "left" : "left" == n && a.left - p < y ? "right" : n, o.removeClass(f).addClass(n)
            }
            var g = this.getCalculatedOffset(n, a, p, h);
            this.applyPlacement(g, n), this.hoverState = null;
            var m = function() {
                i.$element.trigger("shown.bs." + i.type)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one(t.support.transition.end, m).emulateTransitionEnd(150) : m()
        }
    }, e.prototype.applyPlacement = function(e, i) {
        var o, n = this.tip(),
            s = n[0].offsetWidth,
            r = n[0].offsetHeight,
            a = parseInt(n.css("margin-top"), 10),
            p = parseInt(n.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(p) && (p = 0), e.top = e.top + a, e.left = e.left + p, t.offset.setOffset(n[0], t.extend({
            using: function(t) {
                n.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), n.addClass("in");
        var h = n[0].offsetWidth,
            l = n[0].offsetHeight;
        if ("top" == i && l != r && (o = !0, e.top = e.top + r - l), /bottom|top/.test(i)) {
            var f = 0;
            e.left < 0 && (f = -2 * e.left, e.left = 0, n.offset(e), h = n[0].offsetWidth, l = n[0].offsetHeight), this.replaceArrow(f - s + h, h, "left")
        } else this.replaceArrow(l - r, l, "top");
        o && n.offset(e)
    }, e.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
    }, e.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, e.prototype.hide = function() {
        function e() {
            "in" != i.hoverState && o.detach(), i.$element.trigger("hidden.bs." + i.type)
        }
        var i = this,
            o = this.tip(),
            n = t.Event("hide.bs." + this.type);
        return this.$element.trigger(n), n.isDefaultPrevented() ? void 0 : (o.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? o.one(t.support.transition.end, e).emulateTransitionEnd(150) : e(), this.hoverState = null, this)
    }, e.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, e.prototype.hasContent = function() {
        return this.getTitle()
    }, e.prototype.getPosition = function() {
        var e = this.$element[0];
        return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
            width: e.offsetWidth,
            height: e.offsetHeight
        }, this.$element.offset())
    }, e.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }, e.prototype.getTitle = function() {
        var t, e = this.$element,
            i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, e.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template)
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, e.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, e.prototype.enable = function() {
        this.enabled = !0
    }, e.prototype.disable = function() {
        this.enabled = !1
    }, e.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, e.prototype.toggle = function(e) {
        var i = e ? t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, e.prototype.destroy = function() {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function(i) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.tooltip"),
                s = "object" == typeof i && i;
            (n || "destroy" != i) && (n || o.data("bs.tooltip", n = new e(this, s)), "string" == typeof i && n[i]())
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = i, this
    }
}(jQuery); +
function(t) {
    "use strict";
    var e = '[data-dismiss="alert"]',
        a = function(a) {
            t(a).on("click", e, this.close)
        };
    a.prototype.close = function(e) {
        function a() {
            s.trigger("closed.bs.alert").remove()
        }
        var r = t(this),
            n = r.attr("data-target");
        n || (n = r.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
        var s = t(n);
        e && e.preventDefault(), s.length || (s = r.hasClass("alert") ? r : r.parent()), s.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one(t.support.transition.end, a).emulateTransitionEnd(150) : a())
    };
    var r = t.fn.alert;
    t.fn.alert = function(e) {
        return this.each(function() {
            var r = t(this),
                n = r.data("bs.alert");
            n || r.data("bs.alert", n = new a(this)), "string" == typeof e && n[e].call(r)
        })
    }, t.fn.alert.Constructor = a, t.fn.alert.noConflict = function() {
        return t.fn.alert = r, this
    }, t(document).on("click.bs.alert.data-api", e, a.prototype.close)
}(jQuery); +
function(t) {
    "use strict";
    var e = function(n, o) {
        this.$element = t(n), this.options = t.extend({}, e.DEFAULTS, o), this.isLoading = !1
    };
    e.DEFAULTS = {
        loadingText: "loading..."
    }, e.prototype.setState = function(e) {
        var n = "disabled",
            o = this.$element,
            i = o.is("input") ? "val" : "html",
            s = o.data();
        e += "Text", s.resetText || o.data("resetText", o[i]()), o[i](s[e] || this.options[e]), setTimeout(t.proxy(function() {
            "loadingText" == e ? (this.isLoading = !0, o.addClass(n).attr(n, n)) : this.isLoading && (this.isLoading = !1, o.removeClass(n).removeAttr(n))
        }, this), 0)
    }, e.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") && (n.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && n.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        t && this.$element.toggleClass("active")
    };
    var n = t.fn.button;
    t.fn.button = function(n) {
        return this.each(function() {
            var o = t(this),
                i = o.data("bs.button"),
                s = "object" == typeof n && n;
            i || o.data("bs.button", i = new e(this, s)), "toggle" == n ? i.toggle() : n && i.setState(n)
        })
    }, t.fn.button.Constructor = e, t.fn.button.noConflict = function() {
        return t.fn.button = n, this
    }, t(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(e) {
        var n = t(e.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle"), e.preventDefault()
    })
}(jQuery); +
function(t) {
    "use strict";
    var e = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
    };
    e.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, e.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, e.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, e.prototype.to = function(e) {
        var i = this,
            s = this.getActiveIndex();
        return e > this.$items.length - 1 || 0 > e ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            i.to(e)
        }) : s == e ? this.pause().cycle() : this.slide(e > s ? "next" : "prev", t(this.$items[e]))
    }, e.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, e.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, e.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, e.prototype.slide = function(e, i) {
        var s = this.$element.find(".item.active"),
            n = i || s[e](),
            a = this.interval,
            r = "next" == e ? "left" : "right",
            o = "next" == e ? "first" : "last",
            l = this;
        if (!n.length) {
            if (!this.options.wrap) return;
            n = this.$element.find(".item")[o]()
        }
        if (n.hasClass("active")) return this.sliding = !1;
        var c = t.Event("slide.bs.carousel", {
            relatedTarget: n[0],
            direction: r
        });
        return this.$element.trigger(c), c.isDefaultPrevented() ? void 0 : (this.sliding = !0, a && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function() {
            var e = t(l.$indicators.children()[l.getActiveIndex()]);
            e && e.addClass("active")
        })), t.support.transition && this.$element.hasClass("slide") ? (n.addClass(e), n[0].offsetWidth, s.addClass(r), n.addClass(r), s.one(t.support.transition.end, function() {
            n.removeClass([e, r].join(" ")).addClass("active"), s.removeClass(["active", r].join(" ")), l.sliding = !1, setTimeout(function() {
                l.$element.trigger("slid.bs.carousel")
            }, 0)
        }).emulateTransitionEnd(1e3 * s.css("transition-duration").slice(0, -1))) : (s.removeClass("active"), n.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), a && this.cycle(), this)
    };
    var i = t.fn.carousel;
    t.fn.carousel = function(i) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.carousel"),
                a = t.extend({}, e.DEFAULTS, s.data(), "object" == typeof i && i),
                r = "string" == typeof i ? i : a.slide;
            n || s.data("bs.carousel", n = new e(this, a)), "number" == typeof i ? n.to(i) : r ? n[r]() : a.interval && n.pause().cycle()
        })
    }, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = i, this
    }, t(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
        var i, s = t(this),
            n = t(s.attr("data-target") || (i = s.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")),
            a = t.extend({}, n.data(), s.data()),
            r = s.attr("data-slide-to");
        r && (a.interval = !1), n.carousel(a), (r = s.attr("data-slide-to")) && n.data("bs.carousel").to(r), e.preventDefault()
    }), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var e = t(this);
            e.carousel(e.data())
        })
    })
}(jQuery); +
function(t) {
    "use strict";
    var e = function(s, n) {
        this.$element = t(s), this.options = t.extend({}, e.DEFAULTS, n), this.transitioning = null, this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    e.DEFAULTS = {
        toggle: !0
    }, e.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, e.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e = t.Event("show.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var s = this.$parent && this.$parent.find("> .panel > .in");
                if (s && s.length) {
                    var n = s.data("bs.collapse");
                    if (n && n.transitioning) return;
                    s.collapse("hide"), n || s.data("bs.collapse", null)
                }
                var i = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[i](0), this.transitioning = 1;
                var a = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[i]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse"), this.$element.prev().children(".btn-accordion").html('<i class="icon-minus-1"></i>'), this.$element.prev().children(".btn-accordion").addClass("opened"), this.$element.prev().addClass("openedup")
                };
                if (!t.support.transition) return a.call(this);
                var l = t.camelCase(["scroll", i].join("-"));
                this.$element.one(t.support.transition.end, t.proxy(a, this)).emulateTransitionEnd(350)[i](this.$element[0][l])
            }
        }
    }, e.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var s = this.dimension();
                this.$element[s](this.$element[s]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse"), this.$element.prev().children(".btn-accordion").html('<i class="icon-plus-1"></i>'), this.$element.prev().children(".btn-accordion").removeClass("opened"), this.$element.prev().removeClass("openedup")
                };
                return t.support.transition ? (this.$element[s](0).one(t.support.transition.end, t.proxy(n, this)).emulateTransitionEnd(350), void 0) : n.call(this)
            }
        }
    }, e.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var s = t.fn.collapse;
    t.fn.collapse = function(s) {
        return this.each(function() {
            var n = t(this),
                i = n.data("bs.collapse"),
                a = t.extend({}, e.DEFAULTS, n.data(), "object" == typeof s && s);
            !i && a.toggle && "show" == s && (s = !s), i || n.data("bs.collapse", i = new e(this, a)), "string" == typeof s && i[s]()
        })
    }, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = s, this
    }, t(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(e) {
        var s, n = t(this),
            i = n.attr("data-target") || e.preventDefault() || (s = n.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""),
            a = t(i),
            l = a.data("bs.collapse"),
            o = l ? "toggle" : n.data(),
            r = n.attr("data-parent"),
            h = r && t(r);
        l && l.transitioning || (h && h.find('[data-toggle=collapse][data-parent="' + r + '"]').not(n).addClass("collapsed"), n[a.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), a.collapse(o)
    })
}(jQuery); +
function(o) {
    "use strict";

    function t(t) {
        o(e).remove(), o(r).each(function() {
            var e = n(o(this)),
                r = {
                    relatedTarget: this
                };
            e.hasClass("open") && (e.trigger(t = o.Event("hide.bs.dropdown", r)), t.isDefaultPrevented() || e.removeClass("open").trigger("hidden.bs.dropdown", r))
        })
    }

    function n(t) {
        var n = t.attr("data-target");
        n || (n = t.attr("href"), n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var e = n && o(n);
        return e && e.length ? e : t.parent()
    }
    var e = ".dropdown-backdrop",
        r = "[data-toggle=dropdown]",
        d = function(t) {
            o(t).on("click.bs.dropdown", this.toggle)
        };
    d.prototype.toggle = function(e) {
        var r = o(this);
        if (!r.is(".disabled, :disabled")) {
            var d = n(r),
                a = d.hasClass("open");
            if (t(), !a) {
                "ontouchstart" in document.documentElement && !d.closest(".navbar-nav").length && o('<div class="dropdown-backdrop"/>').insertAfter(o(this)).on("click", t);
                var i = {
                    relatedTarget: this
                };
                if (d.trigger(e = o.Event("show.bs.dropdown", i)), e.isDefaultPrevented()) return;
                d.toggleClass("open").trigger("shown.bs.dropdown", i), r.focus()
            }
            return !1
        }
    }, d.prototype.keydown = function(t) {
        if (/(38|40|27)/.test(t.keyCode)) {
            var e = o(this);
            if (t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled")) {
                var d = n(e),
                    a = d.hasClass("open");
                if (!a || a && 27 == t.keyCode) return 27 == t.which && d.find(r).focus(), e.click();
                var i = " li:not(.divider):visible a",
                    s = d.find("[role=menu]" + i + ", [role=listbox]" + i);
                if (s.length) {
                    var p = s.index(s.filter(":focus"));
                    38 == t.keyCode && p > 0 && p--, 40 == t.keyCode && p < s.length - 1 && p++, ~p || (p = 0), s.eq(p).focus()
                }
            }
        }
    };
    var a = o.fn.dropdown;
    o.fn.dropdown = function(t) {
        return this.each(function() {
            var n = o(this),
                e = n.data("bs.dropdown");
            e || n.data("bs.dropdown", e = new d(this)), "string" == typeof t && e[t].call(n)
        })
    }, o.fn.dropdown.Constructor = d, o.fn.dropdown.noConflict = function() {
        return o.fn.dropdown = a, this
    }, o(document).on("click.bs.dropdown.data-api", t).on("click.bs.dropdown.data-api", ".dropdown form", function(o) {
        o.stopPropagation()
    }).on("click.bs.dropdown.data-api", r, d.prototype.toggle).on("keydown.bs.dropdown.data-api", r + ", [role=menu], [role=listbox]", d.prototype.keydown)
}(jQuery); +
function(t) {
    "use strict";
    var e = function(e, o) {
        this.options = o, this.$element = t(e), this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    e.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.prototype.toggle = function(t) {
        return this[this.isShown ? "hide" : "show"](t)
    }, e.prototype.show = function(e) {
        var o = this,
            s = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function() {
            var s = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(document.body), o.$element.show().scrollTop(0), s && o.$element[0].offsetWidth, o.$element.addClass("in").attr("aria-hidden", !1), o.enforceFocus();
            var i = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            s ? o.$element.find(".modal-dialog").one(t.support.transition.end, function() {
                o.$element.focus().trigger(i)
            }).emulateTransitionEnd(300) : o.$element.focus().trigger(i)
        }))
    }, e.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one(t.support.transition.end, t.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, e.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.focus()
        }, this))
    }, e.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, e.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.removeBackdrop(), t.$element.trigger("hidden.bs.modal")
        })
    }, e.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, e.prototype.backdrop = function(e) {
        var o = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && o;
            if (this.$backdrop = t('<div class="modal-backdrop ' + o + '" />').appendTo(document.body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                    t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), s && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            s ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) : e()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) : e()) : e && e()
    };
    var o = t.fn.modal;
    t.fn.modal = function(o, s) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.modal"),
                a = t.extend({}, e.DEFAULTS, i.data(), "object" == typeof o && o);
            n || i.data("bs.modal", n = new e(this, a)), "string" == typeof o ? n[o](s) : a.show && n.show(s)
        })
    }, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
        return t.fn.modal = o, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var o = t(this),
            s = o.attr("href"),
            i = t(o.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")),
            n = i.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(s) && s
            }, i.data(), o.data());
        o.is("a") && e.preventDefault(), i.modal(n, this).one("hide", function() {
            o.is(":visible") && o.focus()
        })
    }), t(document).on("show.bs.modal", ".modal", function() {
        t(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function() {
        t(document.body).removeClass("modal-open")
    })
}(jQuery); +
function(t) {
    "use strict";
    var o = function(t, o) {
        this.init("popover", t, o)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    o.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), o.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), o.prototype.constructor = o, o.prototype.getDefaults = function() {
        return o.DEFAULTS
    }, o.prototype.setContent = function() {
        var t = this.tip(),
            o = this.getTitle(),
            e = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](o), t.find(".popover-content")[this.options.html ? "string" == typeof e ? "html" : "append" : "text"](e), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, o.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, o.prototype.getContent = function() {
        var t = this.$element,
            o = this.options;
        return t.attr("data-content") || ("function" == typeof o.content ? o.content.call(t[0]) : o.content)
    }, o.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, o.prototype.tip = function() {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    };
    var e = t.fn.popover;
    t.fn.popover = function(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.popover"),
                i = "object" == typeof e && e;
            (r || "destroy" != e) && (r || n.data("bs.popover", r = new o(this, i)), "string" == typeof e && r[e]())
        })
    }, t.fn.popover.Constructor = o, t.fn.popover.noConflict = function() {
        return t.fn.popover = e, this
    }
}(jQuery); +
function(t) {
    "use strict";
    var a = function(a) {
        this.element = t(a)
    };
    a.prototype.show = function() {
        var a = this.element,
            e = a.closest("ul:not(.dropdown-menu)"),
            n = a.data("target");
        if (n || (n = a.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !a.parent("li").hasClass("active")) {
            var i = e.find(".active:last a")[0],
                s = t.Event("show.bs.tab", {
                    relatedTarget: i
                });
            if (a.trigger(s), !s.isDefaultPrevented()) {
                var o = t(n);
                this.activate(a.parent("li"), e), this.activate(o, o.parent(), function() {
                    a.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: i
                    })
                })
            }
        }
    }, a.prototype.activate = function(a, e, n) {
        function i() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), a.addClass("active"), o ? (a[0].offsetWidth, a.addClass("in")) : a.removeClass("fade"), a.parent(".dropdown-menu") && a.closest("li.dropdown").addClass("active"), n && n()
        }
        var s = e.find("> .active"),
            o = n && t.support.transition && s.hasClass("fade");
        o ? s.one(t.support.transition.end, i).emulateTransitionEnd(150) : i(), s.removeClass("in")
    };
    var e = t.fn.tab;
    t.fn.tab = function(e) {
        return this.each(function() {
            var n = t(this),
                i = n.data("bs.tab");
            i || n.data("bs.tab", i = new a(this)), "string" == typeof e && i[e]()
        })
    }, t.fn.tab.Constructor = a, t.fn.tab.noConflict = function() {
        return t.fn.tab = e, this
    }, t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(a) {
        a.preventDefault(), t(this).tab("show")
    })
}(jQuery);
! function(t) {
    var e = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: "is-sticky",
            wrapperClassName: "sticky-wrapper",
            center: !1,
            getWidthFrom: ""
        },
        i = t(window),
        n = t(document),
        r = [],
        o = i.height(),
        s = function() {
            for (var e = i.scrollTop(), s = n.height(), a = s - o, c = e > a ? a - e : 0, p = 0; p < r.length; p++) {
                var l = r[p],
                    d = l.stickyWrapper.offset().top,
                    u = d - l.topSpacing - c;
                if (u >= e) null !== l.currentTop && (l.stickyElement.css("position", "").css("top", ""), l.stickyElement.parent().removeClass(l.className), l.currentTop = null);
                else {
                    var h = s - l.stickyElement.outerHeight() - l.topSpacing - l.bottomSpacing - e - c;
                    0 > h ? h += l.topSpacing : h = l.topSpacing, l.currentTop != h && (l.stickyElement.css("position", "fixed").css("top", h), "undefined" != typeof l.getWidthFrom && l.stickyElement.css("width", t(l.getWidthFrom).width()), l.stickyElement.parent().addClass(l.className), l.currentTop = h)
                }
            }
        },
        a = function() {
            o = i.height()
        },
        c = {
            init: function(i) {
                var n = t.extend(e, i);
                return this.each(function() {
                    var e = t(this),
                        i = e.attr("id"),
                        o = t("<div></div>").attr("id", i + "-sticky-wrapper").addClass(n.wrapperClassName);
                    e.wrapAll(o), n.center && e.parent().css({
                        width: e.outerWidth(),
                        marginLeft: "auto",
                        marginRight: "auto"
                    }), "right" == e.css("float") && e.css({
                        "float": "none"
                    }).parent().css({
                        "float": "right"
                    });
                    var s = e.parent();
                    s.css("height", e.outerHeight()), r.push({
                        topSpacing: n.topSpacing,
                        bottomSpacing: n.bottomSpacing,
                        stickyElement: e,
                        currentTop: null,
                        stickyWrapper: s,
                        className: n.className,
                        getWidthFrom: n.getWidthFrom
                    })
                })
            },
            update: s,
            unstick: function() {
                return this.each(function() {
                    var e = t(this);
                    removeIdx = -1;
                    for (var i = 0; i < r.length; i++) r[i].stickyElement.get(0) == e.get(0) && (removeIdx = i); - 1 != removeIdx && (r.splice(removeIdx, 1), e.unwrap(), e.removeAttr("style"))
                })
            }
        };
    window.addEventListener ? (window.addEventListener("scroll", s, !1), window.addEventListener("resize", a, !1)) : window.attachEvent && (window.attachEvent("onscroll", s), window.attachEvent("onresize", a)), t.fn.sticky = function(e) {
        return c[e] ? c[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? (t.error("Method " + e + " does not exist on jQuery.sticky"), void 0) : c.init.apply(this, arguments)
    }, t.fn.unstick = function(e) {
        return c[e] ? c[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? (t.error("Method " + e + " does not exist on jQuery.sticky"), void 0) : c.unstick.apply(this, arguments)
    }, t(function() {
        setTimeout(s, 0)
    })
}(jQuery);
! function(t) {
    t.fn.matchHeight = function(i) {
        return 1 >= this.length ? this : (i = "undefined" != typeof i ? i : !0, t.fn.matchHeight._groups.push({
            elements: this,
            byRow: i
        }), t.fn.matchHeight._apply(this, i), this)
    }, t.fn.matchHeight._apply = function(i, a) {
        var e = t(i),
            o = [e];
        return a && (e.css({
            display: "block",
            "padding-top": "0",
            "padding-bottom": "0",
            "border-top": "0",
            "border-bottom": "0",
            height: "100px"
        }), o = h(e), e.css({
            display: "",
            "padding-top": "",
            "padding-bottom": "",
            "border-top": "",
            "border-bottom": "",
            height: ""
        })), t.each(o, function(i, h) {
            var a = t(h),
                e = 0;
            a.each(function() {
                var i = t(this);
                i.css({
                    display: "block",
                    height: ""
                }), i.outerHeight(!1) > e && (e = i.outerHeight(!1))
            }), a.each(function() {
                var i = t(this),
                    h = 0;
                "border-box" !== i.css("box-sizing") && (h += n(i.css("border-top-width")) + n(i.css("border-bottom-width")), h += n(i.css("padding-top")) + n(i.css("padding-bottom"))), i.css("height", e - h)
            })
        }), this
    }, t.fn.matchHeight._applyDataApi = function() {
        var i = {};
        t("[data-match-height], [data-mh]").each(function() {
            var h = t(this),
                n = h.attr("data-match-height");
            i[n] = n in i ? i[n].add(h) : h
        }), t.each(i, function() {
            this.matchHeight(!0)
        })
    }, t.fn.matchHeight._groups = [];
    var i = -1;
    t.fn.matchHeight._update = function(h) {
        if (h && "resize" === h.type) {
            if (h = t(window).width(), h === i) return;
            i = h
        }
        t.each(t.fn.matchHeight._groups, function() {
            t.fn.matchHeight._apply(this.elements, this.byRow)
        })
    }, t(t.fn.matchHeight._applyDataApi), t(window).bind("load resize orientationchange", t.fn.matchHeight._update);
    var h = function(i) {
            var h = null,
                a = [];
            return t(i).each(function() {
                var i = t(this),
                    e = i.offset().top - n(i.css("margin-top")),
                    o = 0 < a.length ? a[a.length - 1] : null;
                null === o ? a.push(i) : 1 >= Math.floor(Math.abs(h - e)) ? a[a.length - 1] = o.add(i) : a.push(i), h = e
            }), a
        },
        n = function(t) {
            return parseFloat(t) || 0
        }
}(jQuery);
! function(t) {
    function e(t) {
        this.parent = t, this.container, this.loadbar, this.percentageContainer
    }

    function n(t) {
        this.toPreload = [], this.parent = t, this.container
    }

    function i(t) {
        this.element, this.parent = t
    }

    function o(i, o) {
        this.element = i, this.$element = t(i), this.options = o, this.foundUrls = [], this.destroyed = !1, this.imageCounter = 0, this.imageDone = 0, this.alreadyLoaded = !1, this.timerStart = Date.now(), this.preloadContainer = new n(this), this.overlayLoader = new e(this), this.defaultOptions = {
            onComplete: function() {},
            onLoadComplete: function() {},
            backgroundColor: "#000",
            barColor: "#fff",
            overlayId: "qLoverlay",
            barHeight: 1,
            percentage: !1,
            deepSearch: !0,
            completeAnimation: "fade",
            timeOutTime: 6e4,
            minimumTime: 500
        }, this.init()
    }! function(t) {
        "use strict";

        function e(e) {
            var n = t.event;
            return n.target = n.target || n.srcElement || e, n
        }
        var n = document.documentElement,
            i = function() {};
        n.addEventListener ? i = function(t, e, n) {
            t.addEventListener(e, n, !1)
        } : n.attachEvent && (i = function(t, n, i) {
            t[n + i] = i.handleEvent ? function() {
                var n = e(t);
                i.handleEvent.call(i, n)
            } : function() {
                var n = e(t);
                i.call(t, n)
            }, t.attachEvent("on" + n, t[n + i])
        });
        var o = function() {};
        n.removeEventListener ? o = function(t, e, n) {
            t.removeEventListener(e, n, !1)
        } : n.detachEvent && (o = function(t, e, n) {
            t.detachEvent("on" + e, t[e + n]);
            try {
                delete t[e + n]
            } catch (i) {
                t[e + n] = void 0
            }
        });
        var r = {
            bind: i,
            unbind: o
        };
        "function" == typeof define && define.amd ? define(r) : "object" == typeof exports ? module.exports = r : t.eventie = r
    }(this),
    function() {
        "use strict";

        function t() {}

        function e(t, e) {
            for (var n = t.length; n--;)
                if (t[n].listener === e) return n;
            return -1
        }

        function n(t) {
            return function() {
                return this[t].apply(this, arguments)
            }
        }
        var i = t.prototype,
            o = this,
            r = o.EventEmitter;
        i.getListeners = function(t) {
            var e, n, i = this._getEvents();
            if (t instanceof RegExp) {
                e = {};
                for (n in i) i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n])
            } else e = i[t] || (i[t] = []);
            return e
        }, i.flattenListeners = function(t) {
            var e, n = [];
            for (e = 0; e < t.length; e += 1) n.push(t[e].listener);
            return n
        }, i.getListenersAsObject = function(t) {
            var e, n = this.getListeners(t);
            return n instanceof Array && (e = {}, e[t] = n), e || n
        }, i.addListener = function(t, n) {
            var i, o = this.getListenersAsObject(t),
                r = "object" == typeof n;
            for (i in o) o.hasOwnProperty(i) && -1 === e(o[i], n) && o[i].push(r ? n : {
                listener: n,
                once: !1
            });
            return this
        }, i.on = n("addListener"), i.addOnceListener = function(t, e) {
            return this.addListener(t, {
                listener: e,
                once: !0
            })
        }, i.once = n("addOnceListener"), i.defineEvent = function(t) {
            return this.getListeners(t), this
        }, i.defineEvents = function(t) {
            for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
            return this
        }, i.removeListener = function(t, n) {
            var i, o, r = this.getListenersAsObject(t);
            for (o in r) r.hasOwnProperty(o) && (i = e(r[o], n), -1 !== i && r[o].splice(i, 1));
            return this
        }, i.off = n("removeListener"), i.addListeners = function(t, e) {
            return this.manipulateListeners(!1, t, e)
        }, i.removeListeners = function(t, e) {
            return this.manipulateListeners(!0, t, e)
        }, i.manipulateListeners = function(t, e, n) {
            var i, o, r = t ? this.removeListener : this.addListener,
                a = t ? this.removeListeners : this.addListeners;
            if ("object" != typeof e || e instanceof RegExp)
                for (i = n.length; i--;) r.call(this, e, n[i]);
            else
                for (i in e) e.hasOwnProperty(i) && (o = e[i]) && ("function" == typeof o ? r.call(this, i, o) : a.call(this, i, o));
            return this
        }, i.removeEvent = function(t) {
            var e, n = typeof t,
                i = this._getEvents();
            if ("string" === n) delete i[t];
            else if (t instanceof RegExp)
                for (e in i) i.hasOwnProperty(e) && t.test(e) && delete i[e];
            else delete this._events;
            return this
        }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(t, e) {
            var n, i, o, r, a = this.getListenersAsObject(t);
            for (o in a)
                if (a.hasOwnProperty(o))
                    for (i = a[o].length; i--;) n = a[o][i], n.once === !0 && this.removeListener(t, n.listener), r = n.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, n.listener);
            return this
        }, i.trigger = n("emitEvent"), i.emit = function(t) {
            var e = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(t, e)
        }, i.setOnceReturnValue = function(t) {
            return this._onceReturnValue = t, this
        }, i._getOnceReturnValue = function() {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, i._getEvents = function() {
            return this._events || (this._events = {})
        }, t.noConflict = function() {
            return o.EventEmitter = r, t
        }, "function" == typeof define && define.amd ? define(function() {
            return t
        }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
    }.call(this),
        function(t, e) {
            "use strict";
            "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) {
                return e(t, n, i)
            }) : "object" == typeof exports ? module.exports = e(t, require("eventEmitter"), require("eventie")) : t.imagesLoaded = e(t, t.EventEmitter, t.eventie)
        }(this, function(t, e, n) {
            "use strict";

            function i(t, e) {
                for (var n in e) t[n] = e[n];
                return t
            }

            function o(t) {
                return "[object Array]" === u.call(t)
            }

            function r(t) {
                var e = [];
                if (o(t)) e = t;
                else if ("number" == typeof t.length)
                    for (var n = 0, i = t.length; i > n; n++) e.push(t[n]);
                else e.push(t);
                return e
            }

            function a(t, e, n) {
                if (!(this instanceof a)) return new a(t, e);
                "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = r(t), this.options = i({}, this.options), "function" == typeof e ? n = e : i(this.options, e), n && this.on("always", n), this.getImages(), p && (this.jqDeferred = new p.Deferred);
                var o = this;
                setTimeout(function() {
                    o.check()
                })
            }

            function s(t) {
                this.img = t
            }

            function h(t) {
                this.src = t, f[t] = this
            }
            var p = t.jQuery,
                d = t.console,
                c = "undefined" != typeof d,
                u = Object.prototype.toString;
            a.prototype = new e, a.prototype.options = {}, a.prototype.getImages = function() {
                this.images = [];
                for (var t = 0, e = this.elements.length; e > t; t++) {
                    var n = this.elements[t];
                    "IMG" === n.nodeName && this.addImage(n);
                    for (var i = n.querySelectorAll("img"), o = 0, r = i.length; r > o; o++) {
                        var a = i[o];
                        this.addImage(a)
                    }
                }
            }, a.prototype.addImage = function(t) {
                var e = new s(t);
                this.images.push(e)
            }, a.prototype.check = function() {
                function t(t) {
                    return e.options.debug && c, e.progress(t), n++, n === i && e.complete(), !0
                }
                var e = this,
                    n = 0,
                    i = this.images.length;
                if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
                for (var o = 0; i > o; o++) {
                    var r = this.images[o];
                    r.on("confirm", t), r.check()
                }
            }, a.prototype.progress = function(t) {
                this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
                var e = this;
                setTimeout(function() {
                    e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify && e.jqDeferred.notify(e, t)
                })
            }, a.prototype.complete = function() {
                var t = this.hasAnyBroken ? "fail" : "done";
                this.isComplete = !0;
                var e = this;
                setTimeout(function() {
                    if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                        var n = e.hasAnyBroken ? "reject" : "resolve";
                        e.jqDeferred[n](e)
                    }
                })
            }, p && (p.fn.imagesLoaded = function(t, e) {
                var n = new a(this, t, e);
                return n.jqDeferred.promise(p(this))
            }), s.prototype = new e, s.prototype.check = function() {
                var t = f[this.img.src] || new h(this.img.src);
                if (t.isConfirmed) return this.confirm(t.isLoaded, "cached was confirmed"), void 0;
                if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
                var e = this;
                t.on("confirm", function(t, n) {
                    return e.confirm(t.isLoaded, n), !0
                }), t.check()
            }, s.prototype.confirm = function(t, e) {
                this.isLoaded = t, this.emit("confirm", this, e)
            };
            var f = {};
            return h.prototype = new e, h.prototype.check = function() {
                if (!this.isChecked) {
                    var t = new Image;
                    n.bind(t, "load", this), n.bind(t, "error", this), t.src = this.src, this.isChecked = !0
                }
            }, h.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, h.prototype.onload = function(t) {
                this.confirm(!0, "onload"), this.unbindProxyEvents(t)
            }, h.prototype.onerror = function(t) {
                this.confirm(!1, "onerror"), this.unbindProxyEvents(t)
            }, h.prototype.confirm = function(t, e) {
                this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
            }, h.prototype.unbindProxyEvents = function(t) {
                n.unbind(t.target, "load", this), n.unbind(t.target, "error", this)
            }, a
        }), e.prototype.createOverlay = function() {
            var e = "absolute";
            if ("body" == this.parent.element.tagName.toLowerCase()) e = "fixed";
            else {
                var n = this.parent.$element.css("position");
                ("fixed" != n || "absolute" != n) && this.parent.$element.css("position", "relative")
            }
            this.container = t("<div id='" + this.parent.options.overlayId + "'></div>").css({
                width: "100%",
                height: "100%",
                backgroundColor: this.parent.options.backgroundColor,
                backgroundPosition: "fixed",
                position: e,
                zIndex: 666999,
                top: 0,
                left: 0
            }).appendTo(this.parent.$element), this.loadbar = t("<div id='qLbar'></div>").css({
                height: this.parent.options.barHeight + "px",
                marginTop: "-" + this.parent.options.barHeight / 2 + "px",
                backgroundColor: this.parent.options.barColor,
                width: "0%",
                position: "absolute",
                top: "50%"
            }).appendTo(this.container), 1 == this.parent.options.percentage && (this.percentageContainer = t("<div id='qLpercentage'></div>").text("0%").css({
                height: "40px",
                width: "100px",
                position: "absolute",
                fontSize: "3em",
                top: "50%",
                left: "50%",
                marginTop: "-" + (59 + this.parent.options.barHeight) + "px",
                textAlign: "center",
                marginLeft: "-50px",
                color: this.parent.options.barColor
            }).appendTo(this.container)), this.parent.preloadContainer.toPreload.length && 1 != this.parent.alreadyLoaded || (this.parent.overlayLoader.updatePercentage(100), this.parent.endLoader())
        }, e.prototype.updatePercentage = function(t) {
            this.loadbar.stop().animate({
                width: Math.ceil(t) + "%",
                minWidth: Math.ceil(t) + "%"
            }, 200), 1 == this.parent.options.percentage && this.percentageContainer.text(Math.ceil(t) + "%")
        }, n.prototype.create = function() {
            this.container = t("<div></div>").appendTo("body").css({
                display: "none",
                width: 0,
                height: 0,
                overflow: "hidden"
            }), this.processQueue()
        }, n.prototype.processQueue = function() {
            for (var t = 0; this.toPreload.length > t; t++) this.parent.destroyed || this.preloadImage(this.toPreload[t])
        }, n.prototype.addImage = function(t) {
            this.toPreload.push(t)
        }, n.prototype.preloadImage = function(t) {
            var e = new i;
            e.addToPreloader(this, t), e.bindLoadEvent()
        }, i.prototype.addToPreloader = function(e, n) {
            this.element = t("<img />").attr("src", n), this.element.appendTo(e.container), this.parent = e.parent
        }, i.prototype.bindLoadEvent = function() {
            this.parent.imageCounter++, this.element[0].ref = this, new imagesLoaded(this.element, function(t) {
                t.elements[0].ref.completeLoading()
            })
        }, i.prototype.completeLoading = function() {
            this.parent.imageDone++;
            var t = 100 * (this.parent.imageDone / this.parent.imageCounter);
            this.parent.overlayLoader.updatePercentage(t), Date.now() - this.parent.timerStart > this.parent.options.timeOutTime && this.parent.endLoader(), (this.parent.imageDone == this.parent.imageCounter || t >= 100) && this.parent.endLoader()
        }, o.prototype.init = function() {
            if (this.options = t.extend({}, this.defaultOptions, this.options), this.findImageInElement(this.element), 1 == this.options.deepSearch)
                for (var e = this.$element.find("*:not(script)"), n = 0; n < e.length; n++) this.findImageInElement(e[n]);
            this.foundUrls.length, this.preloadContainer.create(), this.overlayLoader.createOverlay()
        }, o.prototype.findImageInElement = function(e) {
            var n = "",
                o = t(e),
                r = "normal";
            if ("none" != o.css("background-image") ? (n = o.css("background-image"), r = "background") : "undefined" != typeof o.attr("src") && "img" == e.nodeName.toLowerCase() && (n = o.attr("src")), !this.hasGradient(n)) {
                n = this.stripUrl(n);
                for (var a = n.split(", "), s = 0; s < a.length; s++)
                    if (this.validUrl(a[s]) && this.urlIsNew(a[s])) {
                        var h = "";
                        if (this.isIE() || this.isOpera()) h = "?rand=" + Math.random(), this.preloadContainer.addImage(a[s] + h);
                        else if ("background" == r) this.preloadContainer.addImage(a[s] + h);
                        else {
                            var p = new i(this);
                            p.element = o, p.bindLoadEvent()
                        }
                        this.foundUrls.push(a[s])
                    }
            }
        }, o.prototype.hasGradient = function(t) {
            return -1 == t.indexOf("gradient") ? !1 : !0
        }, o.prototype.stripUrl = function(t) {
            return t = t.replace(/url\(\"/g, ""), t = t.replace(/url\(/g, ""), t = t.replace(/\"\)/g, ""), t = t.replace(/\)/g, "")
        }, o.prototype.isIE = function() {
            return navigator.userAgent.match(/msie/i)
        }, o.prototype.isOpera = function() {
            return navigator.userAgent.match(/Opera/i)
        }, o.prototype.validUrl = function(t) {
            return t.length > 0 && !t.match(/^(data:)/i) ? !0 : !1
        }, o.prototype.urlIsNew = function(t) {
            return -1 == this.foundUrls.indexOf(t) ? !0 : !1
        }, o.prototype.destroyContainers = function() {
            this.destroyed = !0, this.preloadContainer.container.remove(), this.overlayLoader.container.remove()
        }, o.prototype.endLoader = function() {
            this.destroyed = !0, this.onLoadComplete()
        }, o.prototype.onLoadComplete = function() {
            if (this.options.onLoadComplete(), "grow" == this.options.completeAnimation) {
                var e = this.options.minimumTime;
                this.overlayLoader.loadbar[0].parent = this, this.overlayLoader.loadbar.stop().animate({
                    width: "100%"
                }, e, function() {
                    t(this).animate({
                        top: "0%",
                        width: "100%",
                        height: "100%"
                    }, 500, function() {
                        this.parent.overlayLoader.container[0].parent = this.parent, this.parent.overlayLoader.container.fadeOut(500, function() {
                            this.parent.destroyContainers(), this.parent.options.onComplete()
                        })
                    })
                })
            } else if ("fromTop" == this.options.completeAnimation) {
                var e = this.options.minimumTime;
                this.overlayLoader.loadbar[0].parent = this, this.overlayLoader.loadbar.stop().animate({
                    width: "100%",
                    top: 0
                }, e, function() {
                    t(this).animate({
                        width: "100%",
                        height: "100%"
                    }, 500, function() {
                        this.parent.overlayLoader.container[0].parent = this.parent, this.parent.overlayLoader.container.fadeOut(500, function() {
                            this.parent.destroyContainers(), this.parent.options.onComplete()
                        })
                    })
                })
            } else if ("fromBottom" == this.options.completeAnimation) {
                var e = this.options.minimumTime;
                this.overlayLoader.loadbar[0].parent = this, this.overlayLoader.loadbar.stop().animate({
                    width: "100%",
                    top: "100%"
                }, e, function() {
                    t(this).animate({
                        top: 0,
                        width: "100%",
                        height: "100%"
                    }, 500, function() {
                        this.parent.overlayLoader.container[0].parent = this.parent, this.parent.overlayLoader.container.fadeOut(500, function() {
                            this.parent.destroyContainers(), this.parent.options.onComplete()
                        })
                    })
                })
            } else if ("growHorizontal" == this.options.completeAnimation) {
                var e = this.options.minimumTime;
                this.overlayLoader.loadbar[0].parent = this, this.overlayLoader.loadbar.stop().animate({
                    height: "100%",
                    top: 0,
                    left: "50%"
                }, e, function() {
                    t(this).animate({
                        left: "0",
                        width: "100%",
                        height: "100%"
                    }, 500, function() {
                        this.parent.overlayLoader.container[0].parent = this.parent, this.parent.overlayLoader.container.fadeOut(500, function() {
                            this.parent.destroyContainers(), this.parent.options.onComplete()
                        })
                    })
                })
            } else if ("fromLeft" == this.options.completeAnimation) {
                var e = this.options.minimumTime;
                this.overlayLoader.loadbar[0].parent = this, this.overlayLoader.loadbar.stop().animate({
                    height: "100%",
                    top: "0%"
                }, e, function() {
                    t(this).animate({
                        width: "100%",
                        height: "100%"
                    }, 500, function() {
                        this.parent.overlayLoader.container[0].parent = this.parent, this.parent.overlayLoader.container.fadeOut(500, function() {
                            this.parent.destroyContainers(), this.parent.options.onComplete()
                        })
                    })
                })
            } else if ("fromRight" == this.options.completeAnimation) {
                var e = this.options.minimumTime;
                this.overlayLoader.loadbar[0].parent = this, this.overlayLoader.loadbar.stop().animate({
                    height: "100%",
                    top: "0%",
                    left: "100%"
                }, e, function() {
                    t(this).animate({
                        width: "100%",
                        height: "100%",
                        left: 0
                    }, 500, function() {
                        this.parent.overlayLoader.container[0].parent = this.parent, this.parent.overlayLoader.container.fadeOut(500, function() {
                            this.parent.destroyContainers(), this.parent.options.onComplete()
                        })
                    })
                })
            } else {
                var e = this.options.minimumTime;
                this.overlayLoader.container[0].parent = this, this.overlayLoader.container.fadeOut(e, function() {
                    this.parent.destroyContainers(), this.parent.options.onComplete()
                })
            }
        }, Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
            var e = this.length >>> 0,
                n = Number(arguments[1]) || 0;
            for (n = 0 > n ? Math.ceil(n) : Math.floor(n), 0 > n && (n += e); e > n; n++)
                if (n in this && this[n] === t) return n;
            return -1
        }), t.fn.queryLoader2 = function(t) {
            return this.each(function() {
                new o(this, t)
            })
        }
}(jQuery);