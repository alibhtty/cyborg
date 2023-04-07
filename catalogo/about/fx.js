'use strict';
(function(z, A) {
    "object" === typeof exports && "undefined" !== typeof module ? A(exports) : "function" === typeof define && define.amd ? define(["exports"], A) : (z = z || self, A(z.ShaderDoodle = {}))
})(this, function(z) {
    function A(a) {
        function b(a) {
            console.log(a);
            e.add(a.targetElement)
        }

        function d(b) {
            e.has(b.targetElement) ? e.delete(b.targetElement) : (b = a.createBufferSource(), b.buffer = a.createBuffer(1, 1, a.sampleRate), b.connect(a.destination), b.start(0), "function" === typeof a.resume && a.resume().then(c), f())
        }

        function c() {
            v.forEach(a => {
                a()
            })
        }

        function f() {
            p.forEach(a => {
                a.removeEventListener("touchstart", d);
                a.removeEventListener("touchmove", b);
                a.removeEventListener("touchend", d);
                a.removeEventListener("mouseup", d)
            });
            p.clear();
            e.clear()
        }
        let e = new Set,
            p = new Set,
            v = [];
        return {
            onStart: function(b) {
                "running" === a.state ? (console.log("already"), b()) : v.push(b)
            },
            register: function(a) {
                a.addEventListener("touchstart", d);
                a.addEventListener("touchmove", b);
                a.addEventListener("touchend", d);
                a.addEventListener("mouseup", d);
                p.add(a)
            },
            dispose: f
        }
    }

    function ca() {
        function a(a) {
            d[0].value[0] =
                a.alpha;
            d[0].value[1] = a.beta;
            d[0].value[2] = a.gamma
        }
        let b = !1,
            d = JSON.parse(JSON.stringify(L));
        return {
            get ustate() {
                return d
            },
            setup: function() {
                b || (b = !0, "object" === typeof DeviceOrientationEvent && "function" === typeof DeviceOrientationEvent.requestPermission ? DeviceOrientationEvent.requestPermission().then(b => {
                    "granted" === b && window.addEventListener("deviceorientation", a)
                }).catch(console.error) : window.addEventListener("deviceorientation", a))
            },
            dispose: function() {
                window.removeEventListener("deviceorientation",
                    a)
            }
        }
    }

    function da(a) {
        let b = {},
            d = a.getExtension.bind(a);
        return {
            get: function(a) {
                if (void 0 !== b[a]) return b[a];
                let c = d(a) || d("MOZ_".concat(a)) || d("WEBKIT_".concat(a));
                null === c && console.warn("<shader-doodle /> ".concat(a, " extension not supported."));
                return b[a] = c
            }
        }
    }

    function C() {
        function a(a, b) {
            if (a > n || b > h) a = Math.max(a, n), b = Math.max(b, h), a !== n && (n = a, c.width = Math.floor(1 * n)), b !== h && (h = b, c.height = Math.floor(1 * h))
        }

        function b(a) {
            let b = l ? (a - l) / 1E3 : 0;
            l = a;
            k[0].value += b;
            k[1].value = b;
            k[3].value++;
            a = new Date;
            k[2].value[0] =
                a.getFullYear();
            k[2].value[1] = a.getMonth() + 1;
            k[2].value[2] = a.getDate();
            k[2].value[3] = 3600 * a.getHours() + 60 * a.getMinutes() + a.getSeconds() + .001 * a.getMilliseconds()
        }

        function d(f) {
            if (m.size) {
                b(f);
                var u = [...k, ...e.ustate];
                m.forEach(b => b.render(c, a, n, h, 1, u));
                q = requestAnimationFrame(d)
            } else q = void 0
        }
        let c = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"),
            f = c.getContext("webgl") || c.getContext("experimental-webgl"),
            e = ca(),
            p = new(window.AudioContext || window.webkitAudioContext),
            v = new A(p);
        p.onStart =
            v.onStart;
        f.blendFunc(f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA);
        f.enable(f.BLEND);
        let n = 0,
            h = 0,
            q, l, m = new Set,
            k = JSON.parse(JSON.stringify(M)),
            w = da(f);
        w.get("OES_texture_float");
        w.get("OES_texture_float_linear");
        w.get("OES_texture_half_float");
        w.get("OES_texture_half_float_linear");
        f.clearColor(0, 0, 0, 0);
        return Object.freeze({
            get gl() {
                return f
            },
            get wa() {
                return p
            },
            addSurface: function(a) {
                v.register(a.dom);
                a.addClick(e.setup);
                m.add(a);
                q || (q = requestAnimationFrame(d))
            },
            removeSurface: function(a) {
                m.delete(a)
            },
            addUniform: function(a,
                b, c) {
                for (let d = 0; d < k.length; d++)
                    if (k[d].name === a) {
                        k[d].value = b;
                        k[d].type = c;
                        return
                    } k.push({
                    name: a,
                    value: b,
                    type: c,
                    toyname: a
                })
            },
            setUniform: function(a, b) {
                for (let c = 0; c < k.length; c++)
                    if (k[c].name === a) {
                        k[c].value = b;
                        break
                    }
            },
            dispose: function() {
                m.forEach(a => a.dispose());
                m.clear();
                m = void 0;
                cancelAnimationFrame(q);
                e.dispose();
                v.dispose()
            }
        })
    }

    function ea(a, b) {
        let d = {},
            c = a.getProgramParameter(b, a.ACTIVE_ATTRIBUTES);
        for (let f = 0; f < c; f++) {
            let {
                name: c
            } = a.getActiveAttrib(b, f);
            d[c] = a.getAttribLocation(b, c)
        }
        return d
    }

    function N(a) {
        function b(b) {
            a.texParameteri(a.TEXTURE_2D,
                a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, b ? a.NEAREST : a.LINEAR);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, b ? a.NEAREST : a.LINEAR)
        }
        let d, c, f = a.createFramebuffer();
        a.bindFramebuffer(a.FRAMEBUFFER, f);
        let e = a.createTexture();
        if (!e) throw Error("createTexture returned null");
        a.bindTexture(a.TEXTURE_2D, e);
        b(!0);
        a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, e, 0);
        return {
            get handle() {
                return f
            },
            get texture() {
                return e
            },
            updateTexture: b,
            bind: function() {
                a.bindFramebuffer(a.FRAMEBUFFER, f);
                a.viewport(0, 0, d, c)
            },
            updateResolution: function(b, f) {
                if (b !== d || f !== c) d = b, c = f, a.bindTexture(a.TEXTURE_2D, e), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, b, f, 0, a.RGBA, a.FLOAT, null)
            },
            dispose: function() {
                a.deleteFramebuffer(f);
                a.deleteTexture(e)
            }
        }
    }

    function O(a, b, d) {
        b = a.createShader(b);
        a.shaderSource(b, d);
        a.compileShader(b);
        if (!a.getShaderParameter(b, a.COMPILE_STATUS)) {
            let c = a.getShaderInfoLog(b);
            a.deleteShader(b);
            console.warn(c,
                "\nin shader:\n", d)
        }
        return b
    }

    function H(a, b) {
        if (a.length !== b.length) return !1;
        for (let d = 0, c = a.length; d < c; d++)
            if (a[d] !== b[d]) return !1;
        return !0
    }

    function I(a, b) {
        for (let d = 0, c = b.length; d < c; d++) a[d] = b[d]
    }

    function fa(a, b, d, c) {
        a[0] !== c && (d.uniform1f(b, c), a[0] = c)
    }

    function ha(a, b, d, c) {
        H(a, c) || (d.uniform2fv(b, c), I(a, c))
    }

    function ia(a, b, d, c) {
        H(a, c) || (d.uniform3fv(b, c), I(a, c))
    }

    function ja(a, b, d, c) {
        H(a, c) || (d.uniform4fv(b, c), I(a, c))
    }

    function ka(a, b, d, c) {
        a[0] !== c && (d.uniform1i(b, c), a[0] = c)
    }

    function la(a) {
        switch (a) {
            case 5126:
                return fa;
            case 35664:
                return ha;
            case 35665:
                return ia;
            case 35666:
                return ja;
            case 35678:
            case 36198:
                return ka
        }
    }

    function ma(a, b, d) {
        let c = [],
            f = la(b.type);
        return {
            get location() {
                return d
            },
            get name() {
                return b.name
            },
            setValue: function(...b) {
                f(c, d, a, ...b)
            }
        }
    }

    function na(a, b) {
        let d = {},
            c = a.getProgramParameter(b, a.ACTIVE_UNIFORMS);
        for (let e = 0; e < c; e++) {
            var f = a.getActiveUniform(b, e);
            let c = a.getUniformLocation(b, f.name);
            f = ma(a, f, c);
            d[f.name] = f
        }
        return d
    }

    function oa(a, b) {
        if (b) {
            let b = a.match(P);
            a = a.replace("mainImage", "main");
            a =
                a.replace(P, "()");
            a = (b ? "#define ".concat(b[1], " gl_FragColor\n#define ").concat(b[2], " gl_FragCoord.xy\n") : "") + a
        }
        a = pa(qa, b) + a;
        return "precision highp float;\n" + a
    }

    function ra(a, b, d, c, f = !1) {
        function e(a) {
            let b = r[F(a, f, "name")];
            b && b.setValue(F(a, f, "value"))
        }

        function p(b) {
            b.forEach(e);
            t.forEach(a => a.update(e));
            k && r.u_prevbuffer && (b = r.u_prevbuffer) && (b.setValue(w), a.activeTexture(a["TEXTURE".concat(w)]), a.bindTexture(a.TEXTURE_2D, k.texture), k.updateTexture());
            g.forEach(b => {
                r[b.name].setValue(b.u);
                a.activeTexture(a["TEXTURE".concat(b.u)]);
                a.bindTexture(a.TEXTURE_2D, b.fbo.texture);
                b.fbo.updateTexture()
            })
        }
        let v = sa++,
            n = a.createProgram(),
            h = a.createBuffer();
        b = O(a, a.VERTEX_SHADER, b);
        d = O(a, a.FRAGMENT_SHADER, oa(d, f));
        a.attachShader(n, b);
        a.attachShader(n, d);
        a.linkProgram(n);
        let q, l, m, k, w, u = ea(a, n),
            r = na(a, n),
            g = new Set,
            t = new Set,
            x = 0;
        if (!a.getProgramParameter(n, a.LINK_STATUS)) {
            let b = a.getProgramInfoLog(n);
            console.warn(b)
        }
        a.detachShader(n, b);
        a.detachShader(n, d);
        a.deleteShader(b);
        a.deleteShader(d);
        b = u.position;
        a.bindBuffer(a.ARRAY_BUFFER, h);
        a.bufferData(a.ARRAY_BUFFER,
            c, a.STATIC_DRAW);
        a.enableVertexAttribArray(b);
        a.vertexAttribPointer(b, 2, a.FLOAT, !1, 0, 0);
        return {
            get id() {
                return v
            },
            get nodes() {
                return g
            },
            get fbo() {
                return m
            },
            get name() {
                return q
            },
            get u() {
                return l
            },
            render: function(b, c, d) {
                g.size && g.forEach(a => a.render(b, c, d));
                if (m) {
                    if (k) {
                        let a = m;
                        m = k;
                        k = a;
                        k.bind();
                        k.updateResolution(b, c)
                    }
                    m.updateResolution(b, c);
                    m.bind()
                } else a.bindFramebuffer(a.FRAMEBUFFER, null), a.viewport(0, 0, b, c);
                a.clear(a.COLOR_BUFFER_BIT);
                a.useProgram(n);
                p(d);
                a.drawArrays(a.TRIANGLES, 0, 6)
            },
            addNode: function(a,
                b, c) {
                a.toFbo(b, x++, c);
                g.add(a)
            },
            removeNode: function(a) {
                g.delete(a)
            },
            addTexture: function(a) {
                t.add(a)
            },
            removeTexture: function(a) {
                t.delete(a)
            },
            getTexUnit: function() {
                return x++
            },
            update: p,
            toFbo: function(b, c, d) {
                q = b;
                l = c;
                m = N(a);
                d && (k = N(a), w = x++)
            },
            dispose: function() {
                t.forEach(a => a.dispose());
                t.clear();
                a.deleteProgram(n)
            }
        }
    }

    function Q(a) {
        if (!a) return [0, 0];
        let b = (a.tagName || "").toLowerCase();
        return "video" === b ? [a.videoWidth, a.videoHeight] : "img" === b ? [a.naturalWidth, a.naturalHeight] : [a.width, a.height]
    }

    function R(a,
        b, d = {}) {
        function c() {
            a.getParameter(a.ACTIVE_TEXTURE) !== b && a.activeTexture(a["TEXTURE".concat(b)])
        }

        function f() {
            h.forEach(b => {
                a.texParameteri(p, b[0], b[1])
            })
        }

        function e(b) {
            if ("object" === typeof b) {
                Object.assign(n, b);
                c();
                a.bindTexture(p, v);
                var {
                    level: d,
                    internalFormat: e,
                    offsetX: h,
                    offsetY: r,
                    width: g,
                    height: t,
                    border: m,
                    format: B,
                    type: D,
                    flipY: z,
                    buffer: y,
                    pixels: A
                } = n;
                f();
                a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, z);
                if (A) {
                    let [c, d] = Q(A);
                    if (0 === c || 0 === d) {
                        console.warn("Texture size is invalid ".concat(c, " x ").concat(d,
                            ". Update is skipped;"));
                        return
                    } {
                        ({
                            pixels: b
                        } = n);
                        var J = a.getTexParameter(p, a.TEXTURE_WRAP_S);
                        let c = a.getTexParameter(p, a.TEXTURE_WRAP_T),
                            d = a.getTexParameter(p, a.TEXTURE_MIN_FILTER),
                            f = G(b.width) && G(b.height);
                        (J = J !== a.CLAMP_TO_EDGE || c !== a.CLAMP_TO_EDGE || d !== a.LINEAR && d !== a.NEAREST) && !f && (l || (l = document.createElement("canvas"), l.width = 2 ** Math.floor(Math.log(b.width) / Math.LN2), l.height = 2 ** Math.floor(Math.log(b.height) / Math.LN2), console.warn("Texture is not power of two ".concat(b.width, " x ").concat(b.height,
                            ". Resized to ").concat(l.width, " x ").concat(l.height, ";"))), l.getContext("2d").drawImage(b, 0, 0, l.width, l.height));
                        q = J && l || b
                    }
                }
                "number" === typeof h && "number" === typeof r ? q ? a.texSubImage2D(p, d, h, r, B, D, q) : a.texSubImage2D(p, d, h, r, g, t, B, D, y) : q ? a.texImage2D(p, d, e, B, D, q) : a.texImage2D(p, d, e, g, t, m, B, D, y);
                q && G(q.width) && G(q.height) && (b = a.getTexParameter(p, a.TEXTURE_MIN_FILTER), b !== a.LINEAR && b !== a.NEAREST && a.generateMipmap(p))
            }
        }
        let p = a.TEXTURE_2D,
            v = a.createTexture(),
            n = {},
            h = [],
            q, l;
        e(Object.assign({
            level: 0,
            internalFormat: a.RGBA,
            offsetX: null,
            offsetY: null,
            width: 1,
            height: 1,
            border: 0,
            format: a.RGBA,
            type: a.UNSIGNED_BYTE,
            flipY: !0,
            buffer: ta,
            pixels: null
        }, "object" === typeof d ? d : {}));
        return {
            setParameters: function(b) {
                c();
                h.length = 0;
                b.forEach(b => {
                    h.push(b);
                    a.texParameteri(p, b[0], b[1])
                })
            },
            shallow: function() {
                c();
                a.bindTexture(p, v);
                f()
            },
            update: e,
            dispose: function() {
                a.deleteTexture(v)
            }
        }
    }

    function ua(a) {
        return new Promise((b, d) => {
            let c = new XMLHttpRequest;
            c.open("GET", a, !0);
            c.responseType = "arraybuffer";
            c.onreadystatechange = () => {
                c.readyState ===
                    XMLHttpRequest.DONE && (200 === c.status || 206 === c.status ? b(c.response) : (console.log(c), d(c.status)))
            };
            c.send()
        })
    }

    function va(a, b) {
        return new Promise((d, c) => {
            b.decodeAudioData(a, d, c)
        })
    }

    function wa(a, b, d, c, f, e, p, v) {
        async function n() {
            g = l.createBufferSource();
            g.buffer = await va(await ua(c), l);
            g.loop = e;
            g.start();
            t = !0
        }

        function h() {
            let a = document.querySelector(c);
            a && a instanceof HTMLAudioElement && (r = a, g = l.createMediaElementSource(a))
        }

        function q(a, b) {
            a.connect(m);
            m.connect(b)
        }
        f = a.gl;
        let l = a.wa,
            m = l.createAnalyser();
        m.fftSize = 1024;
        let k = new Uint8Array(m.frequencyBinCount),
            w = new Uint8Array(m.frequencyBinCount),
            u = R(f, b, {
                internalFormat: f.LUMINANCE,
                width: w.length,
                height: 2,
                format: f.LUMINANCE,
                buffer: null
            });
        u.setParameters([
            [f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE],
            [f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE],
            [f.TEXTURE_MIN_FILTER, f.NEAREST]
        ]);
        let r, g, t = !1,
            x = [{
                name: d,
                value: b
            }];
        "#" === c[0] ? h() : c && n();
        g && q(g, l.destination);
        return {
            dispose: function() {
                u.dispose()
            },
            update: function(a) {
                x.forEach(a);
                if (t || r && 2 < r.readyState && !r.paused && !r.ended &&
                    r.currentTime) m.getByteFrequencyData(k), m.getByteTimeDomainData(w), u.update({
                    offsetX: 0,
                    offsetY: 0,
                    height: 1,
                    buffer: k
                }), u.update({
                    offsetX: 0,
                    offsetY: 1,
                    height: 1,
                    buffer: w
                })
            }
        }
    }

    function S(a, b) {
        var d = Object.keys(a);
        if (Object.getOwnPropertySymbols) {
            var c = Object.getOwnPropertySymbols(a);
            b && (c = c.filter(function(b) {
                return Object.getOwnPropertyDescriptor(a, b).enumerable
            }));
            d.push.apply(d, c)
        }
        return d
    }

    function T(a) {
        let b = document.createElement("div");
        b.style.width = b.style.height = "1px";
        b.style.overflow = "hidden";
        b.style.position =
            "absolute";
        b.style.opacity = "0";
        b.style.pointerEvents = "none";
        b.style.zIndex = "-1000";
        b.appendChild(a);
        document.body.appendChild(b)
    }

    function xa(a, b, d, c, f, e, p, v, n, h) {
        function q() {
            t = 0;
            g = new Image;
            g.crossOrigin = "anonymous";
            g.onload = l;
            g.onerror = () => {
                console.warn("failed loading src: ".concat(c))
            };
            g.src = c
        }

        function l() {
            k();
            r.setParameters([
                [u.TEXTURE_WRAP_S, e],
                [u.TEXTURE_WRAP_T, p],
                [u.TEXTURE_MIN_FILTER, v],
                [u.TEXTURE_MAG_FILTER, n]
            ]);
            r.update({
                pixels: g
            })
        }

        function m() {
            t = 2;
            let a = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia,
                b = a => {
                    g = document.createElement("video");
                    g.width = 320;
                    g.height = 240;
                    g.autoplay = !0;
                    g.srcObject = a;
                    T(g)
                },
                c = () => {
                    navigator.mediaDevices.getUserMedia({
                        video: !0
                    }).then(b).catch(a => console.log(a.name + ": " + a.message))
                },
                d = () => {
                    a({
                        video: !0
                    }, b, a => a)
                };
            navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? c() : a && d()
        }

        function k() {
            if (g) {
                let [a, b] = Q(g);
                x[1].value[0] = a;
                x[1].value[1] = b
            }
        }

        function w() {
            return (2 === t || 1 === t) && g instanceof HTMLVideoElement
        }
        let u = a.gl,
            r = R(u, b),
            g, t, x = [{
                name: d,
                value: b
            }, {
                name: d + "_resolution",
                value: [0, 0]
            }],
            B = !1;
        if (f) m();
        else if (ya.test(c)) t = 1, g = document.createElement("video"), g.autoplay = !0, g.muted = !0, g.loop = !0, g.playsInline = !0, g.crossOrigin = "anonymous", g.src = c, T(g), g.play();
        else if (za.test(c)) q();
        else {
            try {
                g = document.querySelector(c)
            } catch (D) {
                console.warn("src: ".concat(c, ": invalid selector"))
            }
            g ? g instanceof HTMLImageElement ? (t = 0, g.complete ? l() : g.addEventListener("load", l)) : g instanceof HTMLVideoElement ? t = 1 : g instanceof HTMLCanvasElement ? (t = 3, l()) : g instanceof
            K ? (g = g.surface.dom, t = 3, l()) : console.warn("src: ".concat(c, ": element is not a valid texture source")): console.warn("src: ".concat(c, ": no element could be selected"))
        }
        return {
            dispose: function() {
                r.dispose()
            },
            update: function(a) {
                x.forEach(a);
                h || w() && g.readyState === g.HAVE_ENOUGH_DATA ? (w() && (B || (B = !0, k(), r.setParameters([
                    [u.TEXTURE_WRAP_S, u.CLAMP_TO_EDGE],
                    [u.TEXTURE_WRAP_T, u.CLAMP_TO_EDGE],
                    [u.TEXTURE_MIN_FILTER, u.LINEAR]
                ]))), r.update({
                    pixels: g
                })) : r.shallow()
            }
        }
    }

    function Aa(a) {
        function b(a) {
            n.forEach(a =>
                "function" === typeof a && a());
            k = !0;
            a = U(a);
            let {
                top: b,
                left: c,
                height: d
            } = q;
            h[2].value[0] = h[2].value[2] = a[0] - Math.floor(c);
            h[2].value[1] = h[2].value[3] = Math.floor(d) - (a[1] - Math.floor(b))
        }

        function d(a) {
            if (!m) {
                a = U(a);
                let {
                    top: b,
                    left: c,
                    height: d
                } = q;
                h[1].value[0] = a[0] - Math.floor(c);
                h[1].value[1] = Math.floor(d) - (a[1] - Math.floor(b));
                k && (h[2].value[0] = h[1].value[0], h[2].value[1] = h[1].value[1]);
                m = !0
            }
        }

        function c(a) {
            k = !1;
            1 === Math.sign(h[2].value[2]) && (h[2].value[2] *= -1);
            1 === Math.sign(h[2].value[3]) && (h[2].value[3] *=
                -1)
        }

        function f() {
            let b = e.getBoundingClientRect();
            l = 0 <= b.top + b.height && 0 <= b.left + b.width && b.bottom - b.height <= (window.innerHeight || document.documentElement.clientHeight) && b.right - b.width <= (window.innerWidth || document.documentElement.clientWidth);
            let c = 0 < a.height ? a.height : b.height,
                d = 0 < a.width ? a.width : b.width;
            d !== h[0].value[0] && (e.width = h[0].value[0] = d);
            c !== h[0].value[1] && (e.height = h[0].value[1] = c);
            q = b
        }
        let e = a.canvas instanceof HTMLCanvasElement ? a.canvas : document.createElementNS("http://www.w3.org/1999/xhtml",
                "canvas"),
            p = e.getContext("2d"),
            v = a.program,
            n = new Set,
            h = JSON.parse(JSON.stringify(V)),
            q = {},
            l, m, k;
        e.addEventListener("mousedown", b);
        e.addEventListener("mousemove", d);
        e.addEventListener("mouseup", c);
        e.addEventListener("mouseout", c);
        e.addEventListener("touchstart", b);
        e.addEventListener("touchmove", d);
        e.addEventListener("touchend", c);
        f();
        return Object.freeze({
            get dom() {
                return e
            },
            render: function(a, b, c, d, e, k) {
                f();
                m = !1;
                if (l && v) {
                    var g = h[0].value[0] || 0;
                    c = h[0].value[1] || 0;
                    b(g, c);
                    v.render(g, c, [...k, ...h]);
                    b =
                        g * e;
                    e *= c;
                    p.clearRect(0, 0, b, e);
                    p.drawImage(a, 0, d - e, b, e, 0, 0, b, e)
                }
            },
            addClick: function(a) {
                n.add(a)
            },
            dispose: function() {
                n.clear();
                e.removeEventListener("mousedown", b);
                e.removeEventListener("mousemove", d);
                e.removeEventListener("mouseup", c);
                e.removeEventListener("mouseout", c);
                e.removeEventListener("touchstart", b);
                e.removeEventListener("touchmove", d);
                e.removeEventListener("touchend", c)
            }
        })
    }
    var W = {
        render(a, b) {
            return "".concat(this.css(a, b), "\n            ").concat(this.html())
        },
        map(a) {
            return {
                canvas: a.querySelector("canvas")
            }
        },
        html(a) {
            return "<canvas></canvas>"
        },
        css(a, b) {
            return "<style>\n      :host {\n        position: relative;\n        display: inline-block;\n        width: ".concat(a || 250, "px;\n        height: ").concat(b || 250, "px;\n      }\n      :host > canvas {\n        position: absolute;\n        top: 0;\n        left: 0;\n        height: 100%;\n        width: 100%;\n        border-radius: inherit;\n      }\n    </style>")
        }
    };
    let M = [{
            name: "u_time",
            toyname: "iTime",
            type: "float",
            value: 0
        }, {
            name: "u_delta",
            toyname: "iTimeDelta",
            type: "float",
            value: 0
        }, {
            name: "u_date",
            toyname: "iDate",
            type: "vec4",
            value: [0, 0, 0, 0]
        }, {
            name: "u_frame",
            toyname: "iFrame",
            type: "int",
            value: 0
        }],
        V = [{
            name: "u_resolution",
            toyname: "iResolution",
            type: "vec2",
            value: [0, 0]
        }, {
            name: "u_mouse",
            toyname: "iCurrentMouse",
            type: "vec2",
            value: [0, 0]
        }, {
            name: "u_mousedrag",
            toyname: "iMouse",
            type: "vec4",
            value: [0, 0, 0, 0]
        }],
        L = [{
            name: "u_orientation",
            toyname: "iOrientation",
            type: "vec3",
            value: [0, 0, 0]
        }],
        qa = [...M, ...L, ...V],
        P = /\(\s*out\s+vec4\s+(\S+)\s*,\s*in\s+vec2\s+(\S+)\s*\)/,
        y;
    C.singleton =
        function() {
            y || (y = C());
            return y
        };
    C.resetSingleton = function() {
        y && y.dispose();
        y = C()
    };
    class E extends HTMLElement {
        get renderer() {
            return C.singleton()
        }
        get name() {
            return this.getAttribute("name")
        }
        set name(a) {
            this.setAttribute("name", a)
        }
    }
    var F = (a, b, d) => {
            if (!b) return a[d];
            b = "toy".concat(d);
            return a.hasOwnProperty(b) ? a[b] : a[d]
        },
        pa = (a, b) => Object.values(a).reduce((a, c) => a + "uniform ".concat(F(c, b, "type"), " ").concat(F(c, b, "name"), ";\n"), "");
    let sa = 0;
    var Ba = a => new Promise((b, d) => {
            let c = new XMLHttpRequest;
            c.open("GET",
                a);
            c.onreadystatechange = () => {
                c.readyState === XMLHttpRequest.DONE && (200 === c.status ? b(c.responseText) : d(c.status))
            };
            c.send()
        }),
        X = async a => a.src ? Ba(a.src) : a.text;
    let Y = new Float32Array([-1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1]),
        Ca = 0;
    class Z extends E {
        disconnectedCallback() {
            this.program.dispose();
            this.program = void 0
        }
        get shadertoy() {
            return this.hasAttribute("shadertoy")
        }
        set shadertoy(a) {
            a ? this.setAttribute("shadertoy", "") : this.removeAttribute("shadertoy")
        }
        get prevbuffer() {
            return this.hasAttribute("prevbuffer")
        }
        set prevbuffer(a) {
            a ?
                this.setAttribute("prevbuffer", "") : this.removeAttribute("prevbuffer")
        }
        get vertices() {
            let a = this.getAttribute("vertices");
            if (!a) return Y;
            a = JSON.parse(a);
            return Array.isArray(a) ? new Float32Array(a) : Y
        }
        set vertices(a) {
            a && Array.isArray(a) && this.setAttribute("vertices", JSON.stringify(a))
        }
        async init(a) {
            a && !this.name && (this.name = "".concat("u_node").concat(Ca++));
            let b = [],
                d, c;
            for (let a = 0; a < this.children.length; a++) {
                let e = this.children[a];
                if (e instanceof E) b.push(e);
                else switch (e.getAttribute("type")) {
                    case "x-shader/x-fragment":
                        c =
                            await X(e);
                        break;
                    case "x-shader/x-vertex":
                        d = await X(e)
                }
            }
            this.program = ra(this.renderer.gl, d || "attribute vec2 position;\nvoid main() {\n  gl_Position = vec4(position, 0.0, 1.0);\n}", c, this.vertices, this.shadertoy);
            b.forEach(a => {
                a.init(this.program)
            });
            a && a.addNode(this.program, this.name, this.prevbuffer)
        }
    }
    customElements.get("sd-node") || customElements.define("sd-node", Z);
    let ta = new Uint8Array([0, 0, 0, 255]),
        G = a => !(a & a - 1) && !!a,
        Da = 0;
    class Ea extends E {
        disconnectedCallback() {
            this.program.removeTexture(this.texture);
            this.texture.dispose()
        }
        get src() {
            return this.getAttribute("src")
        }
        set src(a) {
            this.setAttribute("src", a)
        }
        get autoplay() {
            return this.hasAttribute("autoplay")
        }
        set autoplay(a) {
            a ? this.setAttribute("autoplay", "") : this.removeAttribute("autoplay")
        }
        get loop() {
            return this.hasAttribute("loop")
        }
        set loop(a) {
            a ? this.setAttribute("loop", "") : this.removeAttribute("loop")
        }
        get crossOrigin() {
            return this.getAttribute("crossorigin")
        }
        set crossOrigin(a) {
            this.setAttribute("crossorigin", a)
        }
        get mic() {
            return this.hasAttribute("mic")
        }
        set mic(a) {
            a ?
                this.setAttribute("mic", "") : this.removeAttribute("mic")
        }
        init(a) {
            this.name || (this.name = "".concat("u_audio").concat(Da++));
            this.src && (this.program = a, this.texture = wa(this.renderer, a.getTexUnit(), this.name, this.src, this.mic, this.loop, this.autoplay, this.crossOrigin), a.addTexture(this.texture))
        }
    }
    customElements.get("sd-audio") || customElements.define("sd-audio", Ea);
    let za = /\w+\.(jpg|jpeg|png|gif|bmp)(?=\?|$)/i,
        ya = /\w+\.(mp4|3gp|webm|ogv)(?=\?|$)/i,
        aa = {
            NEAREST: 9728,
            LINEAR: 9729
        },
        Fa = function(a) {
            for (var b = 1; b <
                arguments.length; b++) {
                var d = null != arguments[b] ? arguments[b] : {};
                b % 2 ? S(d, !0).forEach(function(b) {
                    var c = d[b];
                    b in a ? Object.defineProperty(a, b, {
                        value: c,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : a[b] = c
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(d)) : S(d).forEach(function(b) {
                    Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(d, b))
                })
            }
            return a
        }({}, aa, {
            NEAREST_MIPMAP_NEAREST: 9984,
            LINEAR_MIPMAP_NEAREST: 9985,
            NEAREST_MIPMAP_LINEAR: 9986,
            LINEAR_MIPMAP_LINEAR: 9987
        }),
        ba = {
            REPEAT: 10497,
            MIRRORED_REPEAT: 33648,
            CLAMP_TO_EDGE: 33071
        },
        Ga = 0;
    class Ha extends E {
        static get observedAttributes() {
            return "mag-filter min-filter name src wrap-s wrap-t".split(" ")
        }
        disconnectedCallback() {
            this.program.removeTexture(this.texture);
            this.texture.dispose()
        }
        get forceUpdate() {
            return this.hasAttribute("force-update")
        }
        set forceUpdate(a) {
            a ? this.setAttribute("force-update", "") : this.removeAttribute("force-update")
        }
        get magFilter() {
            return aa[this.getAttribute("mag-filter")] || 9729
        }
        get minFilter() {
            return Fa[this.getAttribute("min-filter")] ||
                9987
        }
        get src() {
            return this.getAttribute("src")
        }
        set src(a) {
            this.setAttribute("src", a)
        }
        get webcam() {
            return this.hasAttribute("webcam")
        }
        set webcam(a) {
            a ? this.setAttribute("webcam", "") : this.removeAttribute("webcam")
        }
        get wrapS() {
            return ba[this.getAttribute("wrap-s")] || 10497
        }
        get wrapT() {
            return ba[this.getAttribute("wrap-t")] || 10497
        }
        init(a) {
            this.name || (this.name = "".concat("u_texture").concat(Ga++));
            if (this.src || this.webcam) this.program = a, this.texture = xa(this.renderer, a.getTexUnit(), this.name, this.src, this.webcam,
                this.wrapS, this.wrapT, this.minFilter, this.magFilter, this.forceUpdate), a.addTexture(this.texture)
        }
    }
    customElements.get("sd-texture") || customElements.define("sd-texture", Ha);
    class Ia extends E {
        disconnectedCallback() {}
        get x() {
            return parseFloat(this.getAttribute("x"))
        }
        set x(a) {
            null != a ? this.setAttribute("x", a) : this.removeAttribute("x")
        }
        get y() {
            return parseFloat(this.getAttribute("y"))
        }
        set y(a) {
            null != a ? this.setAttribute("y", a) : this.removeAttribute("y")
        }
        get z() {
            return parseFloat(this.getAttribute("z"))
        }
        set z(a) {
            null !=
                a ? this.setAttribute("z", a) : this.removeAttribute("z")
        }
        get w() {
            return parseFloat(this.getAttribute("w"))
        }
        set w(a) {
            null != a ? this.setAttribute("w", a) : this.removeAttribute("w")
        }
        getValue() {
            switch (this.type) {
                case "vec2":
                    return [this.x, this.y];
                case "vec3":
                    return [this.x, this.y, this.z];
                case "vec4":
                    return [this.x, this.y, this.z, this.w];
                default:
                    return this.x
            }
        }
        get type() {
            return this.getAttribute("type")
        }
        set type(a) {
            null != a ? this.setAttribute("type", a) : this.removeAttribute("type")
        }
        static get observedAttributes() {
            return ["x",
                "y", "z", "w"
            ]
        }
        attributeChangedCallback(a, b, d) {
            switch (a) {
                case "x":
                case "y":
                case "z":
                case "w":
                    null != d && this.renderer.setUniform(this.name, this.getValue())
            }
        }
        init(a) {
            this.name ? (this.program = a, this.renderer.addUniform(this.name, this.getValue(), this.type)) : console.warn("sd-uniform created without a name.")
        }
    }
    customElements.get("sd-uniform") || customElements.define("sd-uniform", Ia);
    let Ja = new Set(["touchstart", "touchmove", "touchend"]);
    var U = a => {
        a = Ja.has(a.type) && "object" === typeof a.touches[0] ? a.touches[0] :
            a;
        return [a.clientX || 0, a.clientY || 0]
    };
    class K extends Z {
        static get observedAttributes() {
            return ["height", "width"]
        }
        constructor() {
            super();
            this.shadow = this.attachShadow({
                mode: "open"
            })
        }
        connectedCallback() {
            this.shadow.innerHTML = W.render(this.width, this.height);
            this.canvas = W.map(this.shadow).canvas;
            setTimeout(() => {
                try {
                    this.init()
                } catch (a) {
                    console.error(a && a.message || "Error in shader-doodle.")
                }
            })
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.renderer.removeSurface(this.surface);
            this.surface.dispose();
            this.surface = void 0
        }
        attributeChangedCallback(a) {
            let b = this.shadow.styleSheets;
            if (("height" === a || "width" === a) && 0 < b.length) {
                let d = this[a];
                b[0].cssRules[0].style[a] = Number.isInteger(d) ? "".concat(d, "px") : "250px"
            }
        }
        get height() {
            let a = parseInt(this.getAttribute("height"));
            return Number.isInteger(a) ? a : void 0
        }
        set height(a) {
            let b = parseInt(a);
            Number.isInteger(b) && this.setAttribute("height", a)
        }
        get width() {
            let a = parseInt(this.getAttribute("width"));
            return Number.isInteger(a) ? a : void 0
        }
        set width(a) {
            a = parseInt(a);
            Number.isInteger(a) && this.setAttribute("width", a)
        }
        async init() {
            await super.init();
            this.surface = Aa(this);
            this.renderer.addSurface(this.surface)
        }
    }
    customElements.get("shader-doodle") || customElements.define("shader-doodle", K);
    z.ShaderDoodleElement = K;
    Object.defineProperty(z, "__esModule", {
        value: !0
    })
})