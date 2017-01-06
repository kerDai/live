//--------------module:json-------------
if (typeof JSON !== "object") {
    JSON = {}
} (function() {
    function f(n) {
        return n < 10 ? "0" + n: n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var cx, escapable, gap, indent, meta, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable,
            function(a) {
                var c = meta[a];
                return typeof c === "string" ? c: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
            }) + '"': '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null"
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]": gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]": "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": ": ":") + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": ": ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}": gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}": "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx,
                    function(a) {
                        return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
                    })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                        "": j
                    },
                    "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
} ());

//--------------module:socketio-------------
if (!window.Gotye) {
    var Gotye = {};
};
Gotye.io = (function(window) { (function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.io = f()
    }
})(function() {
    var define, module, exports;
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND",
                        f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports,
                    function(e) {
                        var n = t[o][1][e];
                        return s(n ? n: e)
                    },
                    l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    } ({
            1 : [function(_dereq_, module, exports) {
                module.exports = _dereq_("./lib/")
            },
                {
                    "./lib/": 2
                }],
            2 : [function(_dereq_, module, exports) {
                module.exports = _dereq_("./socket");
                module.exports.parser = _dereq_("engine.io-parser")
            },
                {
                    "./socket": 3,
                    "engine.io-parser": 19
                }],
            3 : [function(_dereq_, module, exports) { (function(global) {
                var transports = _dereq_("./transports");
                var Emitter = _dereq_("component-emitter");
                var debug = _dereq_("debug")("engine.io-client:socket");
                var index = _dereq_("indexof");
                var parser = _dereq_("engine.io-parser");
                var parseuri = _dereq_("parseuri");
                var parsejson = _dereq_("parsejson");
                var parseqs = _dereq_("parseqs");
                module.exports = Socket;
                function noop() {}
                function Socket(uri, opts) {
                    if (! (this instanceof Socket)) return new Socket(uri, opts);
                    opts = opts || {};
                    if (uri && "object" == typeof uri) {
                        opts = uri;
                        uri = null
                    }
                    if (uri) {
                        uri = parseuri(uri);
                        opts.hostname = uri.host;
                        opts.secure = uri.protocol == "https" || uri.protocol == "wss";
                        opts.port = uri.port;
                        if (uri.query) opts.query = uri.query
                    } else if (opts.host) {
                        opts.hostname = parseuri(opts.host).host
                    }
                    this.secure = null != opts.secure ? opts.secure: global.location && "https:" == location.protocol;
                    if (opts.hostname && !opts.port) {
                        opts.port = this.secure ? "443": "80"
                    }
                    this.agent = opts.agent || false;
                    this.hostname = opts.hostname || (global.location ? location.hostname: "localhost");
                    this.port = opts.port || (global.location && location.port ? location.port: this.secure ? 443 : 80);
                    this.query = opts.query || {};
                    if ("string" == typeof this.query) this.query = parseqs.decode(this.query);
                    this.upgrade = false !== opts.upgrade;
                    this.path = (opts.path || "/engine.io").replace(/\/$/, "") + "/";
                    this.forceJSONP = !!opts.forceJSONP;
                    this.jsonp = false !== opts.jsonp;
                    this.forceBase64 = !!opts.forceBase64;
                    this.enablesXDR = !!opts.enablesXDR;
                    this.timestampParam = opts.timestampParam || "t";
                    this.timestampRequests = opts.timestampRequests;
                    this.transports = opts.transports || ["polling", "websocket"];
                    this.readyState = "";
                    this.writeBuffer = [];
                    this.policyPort = opts.policyPort || 843;
                    this.rememberUpgrade = opts.rememberUpgrade || false;
                    this.binaryType = null;
                    this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
                    this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {}: false;
                    if (true === this.perMessageDeflate) this.perMessageDeflate = {};
                    if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
                        this.perMessageDeflate.threshold = 1024
                    }
                    this.pfx = opts.pfx || null;
                    this.key = opts.key || null;
                    this.passphrase = opts.passphrase || null;
                    this.cert = opts.cert || null;
                    this.ca = opts.ca || null;
                    this.ciphers = opts.ciphers || null;
                    this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? null: opts.rejectUnauthorized;
                    var freeGlobal = typeof global == "object" && global;
                    if (freeGlobal.global === freeGlobal) {
                        if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
                            this.extraHeaders = opts.extraHeaders
                        }
                    }
                    this.open()
                }
                Socket.priorWebsocketSuccess = false;
                Emitter(Socket.prototype);
                Socket.protocol = parser.protocol;
                Socket.Socket = Socket;
                Socket.Transport = _dereq_("./transport");
                Socket.transports = _dereq_("./transports");
                Socket.parser = _dereq_("engine.io-parser");
                Socket.prototype.createTransport = function(name) {
                    debug('creating transport "%s"', name);
                    var query = clone(this.query);
                    query.EIO = parser.protocol;
                    query.transport = name;
                    if (this.id) query.sid = this.id;
                    var transport = new transports[name]({
                        agent: this.agent,
                        hostname: this.hostname,
                        port: this.port,
                        secure: this.secure,
                        path: this.path,
                        query: query,
                        forceJSONP: this.forceJSONP,
                        jsonp: this.jsonp,
                        forceBase64: this.forceBase64,
                        enablesXDR: this.enablesXDR,
                        timestampRequests: this.timestampRequests,
                        timestampParam: this.timestampParam,
                        policyPort: this.policyPort,
                        socket: this,
                        pfx: this.pfx,
                        key: this.key,
                        passphrase: this.passphrase,
                        cert: this.cert,
                        ca: this.ca,
                        ciphers: this.ciphers,
                        rejectUnauthorized: this.rejectUnauthorized,
                        perMessageDeflate: this.perMessageDeflate,
                        extraHeaders: this.extraHeaders
                    });
                    return transport
                };
                function clone(obj) {
                    var o = {};
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i)) {
                            o[i] = obj[i]
                        }
                    }
                    return o
                }
                Socket.prototype.open = function() {
                    var transport;
                    if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") != -1) {
                        transport = "websocket"
                    } else if (0 === this.transports.length) {
                        var self = this;
                        setTimeout(function() {
                                self.emit("error", "No transports available")
                            },
                            0);
                        return
                    } else {
                        transport = this.transports[0]
                    }
                    this.readyState = "opening";
                    try {
                        transport = this.createTransport(transport)
                    } catch(e) {
                        this.transports.shift();
                        this.open();
                        return
                    }
                    transport.open();
                    this.setTransport(transport)
                };
                Socket.prototype.setTransport = function(transport) {
                    debug("setting transport %s", transport.name);
                    var self = this;
                    if (this.transport) {
                        debug("clearing existing transport %s", this.transport.name);
                        this.transport.removeAllListeners()
                    }
                    this.transport = transport;
                    transport.on("drain",
                        function() {
                            self.onDrain()
                        }).on("packet",
                        function(packet) {
                            self.onPacket(packet)
                        }).on("error",
                        function(e) {
                            self.onError(e)
                        }).on("close",
                        function() {
                            self.onClose("transport close")
                        })
                };
                Socket.prototype.probe = function(name) {
                    debug('probing transport "%s"', name);
                    var transport = this.createTransport(name, {
                            probe: 1
                        }),
                        failed = false,
                        self = this;
                    Socket.priorWebsocketSuccess = false;
                    function onTransportOpen() {
                        if (self.onlyBinaryUpgrades) {
                            var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
                            failed = failed || upgradeLosesBinary
                        }
                        if (failed) return;
                        debug('probe transport "%s" opened', name);
                        transport.send([{
                            type: "ping",
                            data: "probe"
                        }]);
                        transport.once("packet",
                            function(msg) {
                                if (failed) return;
                                if ("pong" == msg.type && "probe" == msg.data) {
                                    debug('probe transport "%s" pong', name);
                                    self.upgrading = true;
                                    self.emit("upgrading", transport);
                                    if (!transport) return;
                                    Socket.priorWebsocketSuccess = "websocket" == transport.name;
                                    debug('pausing current transport "%s"', self.transport.name);
                                    self.transport.pause(function() {
                                        if (failed) return;
                                        if ("closed" == self.readyState) return;
                                        debug("changing transport and sending upgrade packet");
                                        cleanup();
                                        self.setTransport(transport);
                                        transport.send([{
                                            type: "upgrade"
                                        }]);
                                        self.emit("upgrade", transport);
                                        transport = null;
                                        self.upgrading = false;
                                        self.flush()
                                    })
                                } else {
                                    debug('probe transport "%s" failed', name);
                                    var err = new Error("probe error");
                                    err.transport = transport.name;
                                    self.emit("upgradeError", err)
                                }
                            })
                    }
                    function freezeTransport() {
                        if (failed) return;
                        failed = true;
                        cleanup();
                        transport.close();
                        transport = null
                    }
                    function onerror(err) {
                        var error = new Error("probe error: " + err);
                        error.transport = transport.name;
                        freezeTransport();
                        debug('probe transport "%s" failed because of error: %s', name, err);
                        self.emit("upgradeError", error)
                    }
                    function onTransportClose() {
                        onerror("transport closed")
                    }
                    function onclose() {
                        onerror("socket closed")
                    }
                    function onupgrade(to) {
                        if (transport && to.name != transport.name) {
                            debug('"%s" works - aborting "%s"', to.name, transport.name);
                            freezeTransport()
                        }
                    }
                    function cleanup() {
                        transport.removeListener("open", onTransportOpen);
                        transport.removeListener("error", onerror);
                        transport.removeListener("close", onTransportClose);
                        self.removeListener("close", onclose);
                        self.removeListener("upgrading", onupgrade)
                    }
                    transport.once("open", onTransportOpen);
                    transport.once("error", onerror);
                    transport.once("close", onTransportClose);
                    this.once("close", onclose);
                    this.once("upgrading", onupgrade);
                    transport.open()
                };
                Socket.prototype.onOpen = function() {
                    debug("socket open");
                    this.readyState = "open";
                    Socket.priorWebsocketSuccess = "websocket" == this.transport.name;
                    this.emit("open");
                    this.flush();
                    if ("open" == this.readyState && this.upgrade && this.transport.pause) {
                        debug("starting upgrade probes");
                        for (var i = 0,
                                 l = this.upgrades.length; i < l; i++) {
                            this.probe(this.upgrades[i])
                        }
                    }
                };
                Socket.prototype.onPacket = function(packet) {
                    if ("opening" == this.readyState || "open" == this.readyState) {
                        debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
                        this.emit("packet", packet);
                        this.emit("heartbeat");
                        switch (packet.type) {
                            case "open":
                                this.onHandshake(parsejson(packet.data));
                                break;
                            case "pong":
                                this.setPing();
                                this.emit("pong");
                                break;
                            case "error":
                                var err = new Error("server error");
                                err.code = packet.data;
                                this.onError(err);
                                break;
                            case "message":
                                this.emit("data", packet.data);
                                this.emit("message", packet.data);
                                break
                        }
                    } else {
                        debug('packet received with socket readyState "%s"', this.readyState)
                    }
                };
                Socket.prototype.onHandshake = function(data) {
                    this.emit("handshake", data);
                    this.id = data.sid;
                    this.transport.query.sid = data.sid;
                    this.upgrades = this.filterUpgrades(data.upgrades);
                    this.pingInterval = data.pingInterval;
                    this.pingTimeout = data.pingTimeout;
                    this.onOpen();
                    if ("closed" == this.readyState) return;
                    this.setPing();
                    this.removeListener("heartbeat", this.onHeartbeat);
                    this.on("heartbeat", this.onHeartbeat)
                };
                Socket.prototype.onHeartbeat = function(timeout) {
                    clearTimeout(this.pingTimeoutTimer);
                    var self = this;
                    self.pingTimeoutTimer = setTimeout(function() {
                            if ("closed" == self.readyState) return;
                            self.onClose("ping timeout")
                        },
                        timeout || self.pingInterval + self.pingTimeout)
                };
                Socket.prototype.setPing = function() {
                    var self = this;
                    clearTimeout(self.pingIntervalTimer);
                    self.pingIntervalTimer = setTimeout(function() {
                            debug("writing ping packet - expecting pong within %sms", self.pingTimeout);
                            self.ping();
                            self.onHeartbeat(self.pingTimeout)
                        },
                        self.pingInterval)
                };
                Socket.prototype.ping = function() {
                    var self = this;
                    this.sendPacket("ping",
                        function() {
                            self.emit("ping")
                        })
                };
                Socket.prototype.onDrain = function() {
                    this.writeBuffer.splice(0, this.prevBufferLen);
                    this.prevBufferLen = 0;
                    if (0 === this.writeBuffer.length) {
                        this.emit("drain")
                    } else {
                        this.flush()
                    }
                };
                Socket.prototype.flush = function() {
                    if ("closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
                        debug("flushing %d packets in socket", this.writeBuffer.length);
                        this.transport.send(this.writeBuffer);
                        this.prevBufferLen = this.writeBuffer.length;
                        this.emit("flush")
                    }
                };
                Socket.prototype.write = Socket.prototype.send = function(msg, options, fn) {
                    this.sendPacket("message", msg, options, fn);
                    return this
                };
                Socket.prototype.sendPacket = function(type, data, options, fn) {
                    if ("function" == typeof data) {
                        fn = data;
                        data = undefined
                    }
                    if ("function" == typeof options) {
                        fn = options;
                        options = null
                    }
                    if ("closing" == this.readyState || "closed" == this.readyState) {
                        return
                    }
                    options = options || {};
                    options.compress = false !== options.compress;
                    var packet = {
                        type: type,
                        data: data,
                        options: options
                    };
                    this.emit("packetCreate", packet);
                    this.writeBuffer.push(packet);
                    if (fn) this.once("flush", fn);
                    this.flush()
                };
                Socket.prototype.close = function() {
                    if ("opening" == this.readyState || "open" == this.readyState) {
                        this.readyState = "closing";
                        var self = this;
                        if (this.writeBuffer.length) {
                            this.once("drain",
                                function() {
                                    if (this.upgrading) {
                                        waitForUpgrade()
                                    } else {
                                        close()
                                    }
                                })
                        } else if (this.upgrading) {
                            waitForUpgrade()
                        } else {
                            close()
                        }
                    }
                    function close() {
                        self.onClose("forced close");
                        debug("socket closing - telling transport to close");
                        self.transport.close()
                    }
                    function cleanupAndClose() {
                        self.removeListener("upgrade", cleanupAndClose);
                        self.removeListener("upgradeError", cleanupAndClose);
                        close()
                    }
                    function waitForUpgrade() {
                        self.once("upgrade", cleanupAndClose);
                        self.once("upgradeError", cleanupAndClose)
                    }
                    return this
                };
                Socket.prototype.onError = function(err) {
                    debug("socket error %j", err);
                    Socket.priorWebsocketSuccess = false;
                    this.emit("error", err);
                    this.onClose("transport error", err)
                };
                Socket.prototype.onClose = function(reason, desc) {
                    if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                        debug('socket close with reason: "%s"', reason);
                        var self = this;
                        clearTimeout(this.pingIntervalTimer);
                        clearTimeout(this.pingTimeoutTimer);
                        this.transport.removeAllListeners("close");
                        this.transport.close();
                        this.transport.removeAllListeners();
                        this.readyState = "closed";
                        this.id = null;
                        this.emit("close", reason, desc);
                        self.writeBuffer = [];
                        self.prevBufferLen = 0
                    }
                };
                Socket.prototype.filterUpgrades = function(upgrades) {
                    var filteredUpgrades = [];
                    for (var i = 0,
                             j = upgrades.length; i < j; i++) {
                        if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i])
                    }
                    return filteredUpgrades
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {
                    "./transport": 4,
                    "./transports": 5,
                    "component-emitter": 15,
                    debug: 17,
                    "engine.io-parser": 19,
                    indexof: 23,
                    parsejson: 26,
                    parseqs: 27,
                    parseuri: 28
                }],
            4 : [function(_dereq_, module, exports) {
                var parser = _dereq_("engine.io-parser");
                var Emitter = _dereq_("component-emitter");
                module.exports = Transport;
                function Transport(opts) {
                    this.path = opts.path;
                    this.hostname = opts.hostname;
                    this.port = opts.port;
                    this.secure = opts.secure;
                    this.query = opts.query;
                    this.timestampParam = opts.timestampParam;
                    this.timestampRequests = opts.timestampRequests;
                    this.readyState = "";
                    this.agent = opts.agent || false;
                    this.socket = opts.socket;
                    this.enablesXDR = opts.enablesXDR;
                    this.pfx = opts.pfx;
                    this.key = opts.key;
                    this.passphrase = opts.passphrase;
                    this.cert = opts.cert;
                    this.ca = opts.ca;
                    this.ciphers = opts.ciphers;
                    this.rejectUnauthorized = opts.rejectUnauthorized;
                    this.extraHeaders = opts.extraHeaders
                }
                Emitter(Transport.prototype);
                Transport.prototype.onError = function(msg, desc) {
                    var err = new Error(msg);
                    err.type = "TransportError";
                    err.description = desc;
                    this.emit("error", err);
                    return this
                };
                Transport.prototype.open = function() {
                    if ("closed" == this.readyState || "" == this.readyState) {
                        this.readyState = "opening";
                        this.doOpen()
                    }
                    return this
                };
                Transport.prototype.close = function() {
                    if ("opening" == this.readyState || "open" == this.readyState) {
                        this.doClose();
                        this.onClose()
                    }
                    return this
                };
                Transport.prototype.send = function(packets) {
                    if ("open" == this.readyState) {
                        this.write(packets)
                    } else {
                        throw new Error("Transport not open")
                    }
                };
                Transport.prototype.onOpen = function() {
                    this.readyState = "open";
                    this.writable = true;
                    this.emit("open")
                };
                Transport.prototype.onData = function(data) {
                    var packet = parser.decodePacket(data, this.socket.binaryType);
                    this.onPacket(packet)
                };
                Transport.prototype.onPacket = function(packet) {
                    this.emit("packet", packet)
                };
                Transport.prototype.onClose = function() {
                    this.readyState = "closed";
                    this.emit("close")
                }
            },
                {
                    "component-emitter": 15,
                    "engine.io-parser": 19
                }],
            5 : [function(_dereq_, module, exports) { (function(global) {
                var XMLHttpRequest = _dereq_("xmlhttprequest-ssl");
                var XHR = _dereq_("./polling-xhr");
                var JSONP = _dereq_("./polling-jsonp");
                var websocket = _dereq_("./websocket");
                exports.polling = polling;
                exports.websocket = websocket;
                function polling(opts) {
                    var xhr;
                    var xd = false;
                    var xs = false;
                    var jsonp = false !== opts.jsonp;
                    if (global.location) {
                        var isSSL = "https:" == location.protocol;
                        var port = location.port;
                        if (!port) {
                            port = isSSL ? 443 : 80
                        }
                        xd = opts.hostname != location.hostname || port != opts.port;
                        xs = opts.secure != isSSL
                    }
                    opts.xdomain = xd;
                    opts.xscheme = xs;
                    xhr = new XMLHttpRequest(opts);
                    if ("open" in xhr && !opts.forceJSONP) {
                        return new XHR(opts)
                    } else {
                        if (!jsonp) throw new Error("JSONP disabled");
                        return new JSONP(opts)
                    }
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {
                    "./polling-jsonp": 6,
                    "./polling-xhr": 7,
                    "./websocket": 9,
                    "xmlhttprequest-ssl": 10
                }],
            6 : [function(_dereq_, module, exports) { (function(global) {
                var Polling = _dereq_("./polling");
                var inherit = _dereq_("component-inherit");
                module.exports = JSONPPolling;
                var rNewline = /\n/g;
                var rEscapedNewline = /\\n/g;
                var callbacks;
                var index = 0;
                function empty() {}
                function JSONPPolling(opts) {
                    Polling.call(this, opts);
                    this.query = this.query || {};
                    if (!callbacks) {
                        if (!global.___eio) global.___eio = [];
                        callbacks = global.___eio
                    }
                    this.index = callbacks.length;
                    var self = this;
                    callbacks.push(function(msg) {
                        self.onData(msg)
                    });
                    this.query.j = this.index;
                    if (global.document && global.addEventListener) {
                        global.addEventListener("beforeunload",
                            function() {
                                if (self.script) self.script.onerror = empty
                            },
                            false)
                    }
                }
                inherit(JSONPPolling, Polling);
                JSONPPolling.prototype.supportsBinary = false;
                JSONPPolling.prototype.doClose = function() {
                    if (this.script) {
                        this.script.parentNode.removeChild(this.script);
                        this.script = null
                    }
                    if (this.form) {
                        this.form.parentNode.removeChild(this.form);
                        this.form = null;
                        this.iframe = null
                    }
                    Polling.prototype.doClose.call(this)
                };
                JSONPPolling.prototype.doPoll = function() {
                    var self = this;
                    var script = document.createElement("script");
                    if (this.script) {
                        this.script.parentNode.removeChild(this.script);
                        this.script = null
                    }
                    script.async = true;
                    script.src = this.uri();
                    script.onerror = function(e) {
                        self.onError("jsonp poll error", e)
                    };
                    var insertAt = document.getElementsByTagName("script")[0];
                    if (insertAt) {
                        insertAt.parentNode.insertBefore(script, insertAt)
                    } else { (document.head || document.body).appendChild(script)
                    }
                    this.script = script;
                    var isUAgecko = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                    if (isUAgecko) {
                        setTimeout(function() {
                                var iframe = document.createElement("iframe");
                                document.body.appendChild(iframe);
                                document.body.removeChild(iframe)
                            },
                            100)
                    }
                };
                JSONPPolling.prototype.doWrite = function(data, fn) {
                    var self = this;
                    if (!this.form) {
                        var form = document.createElement("form");
                        var area = document.createElement("textarea");
                        var id = this.iframeId = "eio_iframe_" + this.index;
                        var iframe;
                        form.className = "socketio";
                        form.style.position = "absolute";
                        form.style.top = "-1000px";
                        form.style.left = "-1000px";
                        form.target = id;
                        form.method = "POST";
                        form.setAttribute("accept-charset", "utf-8");
                        area.name = "d";
                        form.appendChild(area);
                        document.body.appendChild(form);
                        this.form = form;
                        this.area = area
                    }
                    this.form.action = this.uri();
                    function complete() {
                        initIframe();
                        fn()
                    }
                    function initIframe() {
                        if (self.iframe) {
                            try {
                                self.form.removeChild(self.iframe)
                            } catch(e) {
                                self.onError("jsonp polling iframe removal error", e)
                            }
                        }
                        try {
                            var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
                            iframe = document.createElement(html)
                        } catch(e) {
                            iframe = document.createElement("iframe");
                            iframe.name = self.iframeId;
                            iframe.src = "javascript:0"
                        }
                        iframe.id = self.iframeId;
                        self.form.appendChild(iframe);
                        self.iframe = iframe
                    }
                    initIframe();
                    data = data.replace(rEscapedNewline, "\\\n");
                    this.area.value = data.replace(rNewline, "\\n");
                    try {
                        this.form.submit()
                    } catch(e) {}
                    if (this.iframe.attachEvent) {
                        this.iframe.onreadystatechange = function() {
                            if (self.iframe.readyState == "complete") {
                                complete()
                            }
                        }
                    } else {
                        this.iframe.onload = complete
                    }
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {
                    "./polling": 8,
                    "component-inherit": 16
                }],
            7 : [function(_dereq_, module, exports) { (function(global) {
                var XMLHttpRequest = _dereq_("xmlhttprequest-ssl");
                var Polling = _dereq_("./polling");
                var Emitter = _dereq_("component-emitter");
                var inherit = _dereq_("component-inherit");
                var debug = _dereq_("debug")("engine.io-client:polling-xhr");
                module.exports = XHR;
                module.exports.Request = Request;
                function empty() {}
                function XHR(opts) {
                    Polling.call(this, opts);
                    if (global.location) {
                        var isSSL = "https:" == location.protocol;
                        var port = location.port;
                        if (!port) {
                            port = isSSL ? 443 : 80
                        }
                        this.xd = opts.hostname != global.location.hostname || port != opts.port;
                        this.xs = opts.secure != isSSL
                    } else {
                        this.extraHeaders = opts.extraHeaders
                    }
                }
                inherit(XHR, Polling);
                XHR.prototype.supportsBinary = true;
                XHR.prototype.request = function(opts) {
                    opts = opts || {};
                    opts.uri = this.uri();
                    opts.xd = this.xd;
                    opts.xs = this.xs;
                    opts.agent = this.agent || false;
                    opts.supportsBinary = this.supportsBinary;
                    opts.enablesXDR = this.enablesXDR;
                    opts.pfx = this.pfx;
                    opts.key = this.key;
                    opts.passphrase = this.passphrase;
                    opts.cert = this.cert;
                    opts.ca = this.ca;
                    opts.ciphers = this.ciphers;
                    opts.rejectUnauthorized = this.rejectUnauthorized;
                    opts.extraHeaders = this.extraHeaders;
                    return new Request(opts)
                };
                XHR.prototype.doWrite = function(data, fn) {
                    var isBinary = typeof data !== "string" && data !== undefined;
                    var req = this.request({
                        method: "POST",
                        data: data,
                        isBinary: isBinary
                    });
                    var self = this;
                    req.on("success", fn);
                    req.on("error",
                        function(err) {
                            self.onError("xhr post error", err)
                        });
                    this.sendXhr = req
                };
                XHR.prototype.doPoll = function() {
                    debug("xhr poll");
                    var req = this.request();
                    var self = this;
                    req.on("data",
                        function(data) {
                            self.onData(data)
                        });
                    req.on("error",
                        function(err) {
                            self.onError("xhr poll error", err)
                        });
                    this.pollXhr = req
                };
                function Request(opts) {
                    this.method = opts.method || "GET";
                    this.uri = opts.uri;
                    this.xd = !!opts.xd;
                    this.xs = !!opts.xs;
                    this.async = false !== opts.async;
                    this.data = undefined != opts.data ? opts.data: null;
                    this.agent = opts.agent;
                    this.isBinary = opts.isBinary;
                    this.supportsBinary = opts.supportsBinary;
                    this.enablesXDR = opts.enablesXDR;
                    this.pfx = opts.pfx;
                    this.key = opts.key;
                    this.passphrase = opts.passphrase;
                    this.cert = opts.cert;
                    this.ca = opts.ca;
                    this.ciphers = opts.ciphers;
                    this.rejectUnauthorized = opts.rejectUnauthorized;
                    this.extraHeaders = opts.extraHeaders;
                    this.create()
                }
                Emitter(Request.prototype);
                Request.prototype.create = function() {
                    var opts = {
                        agent: this.agent,
                        xdomain: this.xd,
                        xscheme: this.xs,
                        enablesXDR: this.enablesXDR
                    };
                    opts.pfx = this.pfx;
                    opts.key = this.key;
                    opts.passphrase = this.passphrase;
                    opts.cert = this.cert;
                    opts.ca = this.ca;
                    opts.ciphers = this.ciphers;
                    opts.rejectUnauthorized = this.rejectUnauthorized;
                    var xhr = this.xhr = new XMLHttpRequest(opts);
                    var self = this;
                    try {
                        debug("xhr open %s: %s", this.method, this.uri);
                        xhr.open(this.method, this.uri, this.async);
                        try {
                            if (this.extraHeaders) {
                                xhr.setDisableHeaderCheck(true);
                                for (var i in this.extraHeaders) {
                                    if (this.extraHeaders.hasOwnProperty(i)) {
                                        xhr.setRequestHeader(i, this.extraHeaders[i])
                                    }
                                }
                            }
                        } catch(e) {}
                        if (this.supportsBinary) {
                            xhr.responseType = "arraybuffer"
                        }
                        if ("POST" == this.method) {
                            try {
                                if (this.isBinary) {
                                    xhr.setRequestHeader("Content-type", "application/octet-stream")
                                } else {
                                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                                }
                            } catch(e) {}
                        }
                        if ("withCredentials" in xhr) {
                            xhr.withCredentials = true
                        }
                        if (this.hasXDR()) {
                            xhr.onload = function() {
                                self.onLoad()
                            };
                            xhr.onerror = function() {
                                self.onError(xhr.responseText)
                            }
                        } else {
                            xhr.onreadystatechange = function() {
                                if (4 != xhr.readyState) return;
                                if (200 == xhr.status || 1223 == xhr.status) {
                                    self.onLoad()
                                } else {
                                    setTimeout(function() {
                                            self.onError(xhr.status)
                                        },
                                        0)
                                }
                            }
                        }
                        debug("xhr data %s", this.data);
                        xhr.send(this.data)
                    } catch(e) {
                        setTimeout(function() {
                                self.onError(e)
                            },
                            0);
                        return
                    }
                    if (global.document) {
                        this.index = Request.requestsCount++;
                        Request.requests[this.index] = this
                    }
                };
                Request.prototype.onSuccess = function() {
                    this.emit("success");
                    this.cleanup()
                };
                Request.prototype.onData = function(data) {
                    this.emit("data", data);
                    this.onSuccess()
                };
                Request.prototype.onError = function(err) {
                    this.emit("error", err);
                    this.cleanup(true)
                };
                Request.prototype.cleanup = function(fromError) {
                    if ("undefined" == typeof this.xhr || null === this.xhr) {
                        return
                    }
                    if (this.hasXDR()) {
                        this.xhr.onload = this.xhr.onerror = empty
                    } else {
                        this.xhr.onreadystatechange = empty
                    }
                    if (fromError) {
                        try {
                            this.xhr.abort()
                        } catch(e) {}
                    }
                    if (global.document) {
                        delete Request.requests[this.index]
                    }
                    this.xhr = null
                };
                Request.prototype.onLoad = function() {
                    var data;
                    try {
                        var contentType;
                        try {
                            contentType = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                        } catch(e) {}
                        if (contentType === "application/octet-stream") {
                            data = this.xhr.response
                        } else {
                            if (!this.supportsBinary) {
                                data = this.xhr.responseText
                            } else {
                                try {
                                    data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
                                } catch(e) {
                                    var ui8Arr = new Uint8Array(this.xhr.response);
                                    var dataArray = [];
                                    for (var idx = 0,
                                             length = ui8Arr.length; idx < length; idx++) {
                                        dataArray.push(ui8Arr[idx])
                                    }
                                    data = String.fromCharCode.apply(null, dataArray)
                                }
                            }
                        }
                    } catch(e) {
                        this.onError(e)
                    }
                    if (null != data) {
                        this.onData(data)
                    }
                };
                Request.prototype.hasXDR = function() {
                    return "undefined" !== typeof global.XDomainRequest && !this.xs && this.enablesXDR
                };
                Request.prototype.abort = function() {
                    this.cleanup()
                };
                if (global.document) {
                    Request.requestsCount = 0;
                    Request.requests = {};
                    if (global.attachEvent) {
                        global.attachEvent("onunload", unloadHandler)
                    } else if (global.addEventListener) {
                        global.addEventListener("beforeunload", unloadHandler, false)
                    }
                }
                function unloadHandler() {
                    for (var i in Request.requests) {
                        if (Request.requests.hasOwnProperty(i)) {
                            Request.requests[i].abort()
                        }
                    }
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {
                    "./polling": 8,
                    "component-emitter": 15,
                    "component-inherit": 16,
                    debug: 17,
                    "xmlhttprequest-ssl": 10
                }],
            8 : [function(_dereq_, module, exports) {
                var Transport = _dereq_("../transport");
                var parseqs = _dereq_("parseqs");
                var parser = _dereq_("engine.io-parser");
                var inherit = _dereq_("component-inherit");
                var yeast = _dereq_("yeast");
                var debug = _dereq_("debug")("engine.io-client:polling");
                module.exports = Polling;
                var hasXHR2 = function() {
                    var XMLHttpRequest = _dereq_("xmlhttprequest-ssl");
                    var xhr = new XMLHttpRequest({
                        xdomain: false
                    });
                    return null != xhr.responseType
                } ();
                function Polling(opts) {
                    var forceBase64 = opts && opts.forceBase64;
                    if (!hasXHR2 || forceBase64) {
                        this.supportsBinary = false
                    }
                    Transport.call(this, opts)
                }
                inherit(Polling, Transport);
                Polling.prototype.name = "polling";
                Polling.prototype.doOpen = function() {
                    this.poll()
                };
                Polling.prototype.pause = function(onPause) {
                    var pending = 0;
                    var self = this;
                    this.readyState = "pausing";
                    function pause() {
                        debug("paused");
                        self.readyState = "paused";
                        onPause()
                    }
                    if (this.polling || !this.writable) {
                        var total = 0;
                        if (this.polling) {
                            debug("we are currently polling - waiting to pause");
                            total++;
                            this.once("pollComplete",
                                function() {
                                    debug("pre-pause polling complete"); --total || pause()
                                })
                        }
                        if (!this.writable) {
                            debug("we are currently writing - waiting to pause");
                            total++;
                            this.once("drain",
                                function() {
                                    debug("pre-pause writing complete"); --total || pause()
                                })
                        }
                    } else {
                        pause()
                    }
                };
                Polling.prototype.poll = function() {
                    debug("polling");
                    this.polling = true;
                    this.doPoll();
                    this.emit("poll")
                };
                Polling.prototype.onData = function(data) {
                    var self = this;
                    debug("polling got data %s", data);
                    var callback = function(packet, index, total) {
                        if ("opening" == self.readyState) {
                            self.onOpen()
                        }
                        if ("close" == packet.type) {
                            self.onClose();
                            return false
                        }
                        self.onPacket(packet)
                    };
                    parser.decodePayload(data, this.socket.binaryType, callback);
                    if ("closed" != this.readyState) {
                        this.polling = false;
                        this.emit("pollComplete");
                        if ("open" == this.readyState) {
                            this.poll()
                        } else {
                            debug('ignoring poll - transport state "%s"', this.readyState)
                        }
                    }
                };
                Polling.prototype.doClose = function() {
                    var self = this;
                    function close() {
                        debug("writing close packet");
                        self.write([{
                            type: "close"
                        }])
                    }
                    if ("open" == this.readyState) {
                        debug("transport open - closing");
                        close()
                    } else {
                        debug("transport not open - deferring close");
                        this.once("open", close)
                    }
                };
                Polling.prototype.write = function(packets) {
                    var self = this;
                    this.writable = false;
                    var callbackfn = function() {
                        self.writable = true;
                        self.emit("drain")
                    };
                    var self = this;
                    parser.encodePayload(packets, this.supportsBinary,
                        function(data) {
                            self.doWrite(data, callbackfn)
                        })
                };
                Polling.prototype.uri = function() {
                    var query = this.query || {};
                    var schema = this.secure ? "https": "http";
                    var port = "";
                    if (false !== this.timestampRequests) {
                        query[this.timestampParam] = yeast()
                    }
                    if (!this.supportsBinary && !query.sid) {
                        query.b64 = 1
                    }
                    query = parseqs.encode(query);
                    if (this.port && ("https" == schema && this.port != 443 || "http" == schema && this.port != 80)) {
                        port = ":" + this.port
                    }
                    if (query.length) {
                        query = "?" + query
                    }
                    var ipv6 = this.hostname.indexOf(":") !== -1;
                    return schema + "://" + (ipv6 ? "[" + this.hostname + "]": this.hostname) + port + this.path + query
                }
            },
                {
                    "../transport": 4,
                    "component-inherit": 16,
                    debug: 17,
                    "engine.io-parser": 19,
                    parseqs: 27,
                    "xmlhttprequest-ssl": 10,
                    yeast: 30
                }],
            9 : [function(_dereq_, module, exports) { (function(global) {
                var Transport = _dereq_("../transport");
                var parser = _dereq_("engine.io-parser");
                var parseqs = _dereq_("parseqs");
                var inherit = _dereq_("component-inherit");
                var yeast = _dereq_("yeast");
                var debug = _dereq_("debug")("engine.io-client:websocket");
                var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
                var WebSocket = BrowserWebSocket;
                if (!WebSocket && typeof window === "undefined") {
                    try {
                        WebSocket = _dereq_("ws")
                    } catch(e) {}
                }
                module.exports = WS;
                function WS(opts) {
                    var forceBase64 = opts && opts.forceBase64;
                    if (forceBase64) {
                        this.supportsBinary = false
                    }
                    this.perMessageDeflate = opts.perMessageDeflate;
                    Transport.call(this, opts)
                }
                inherit(WS, Transport);
                WS.prototype.name = "websocket";
                WS.prototype.supportsBinary = true;
                WS.prototype.doOpen = function() {
                    if (!this.check()) {
                        return
                    }
                    var self = this;
                    var uri = this.uri();
                    var protocols = void 0;
                    var opts = {
                        agent: this.agent,
                        perMessageDeflate: this.perMessageDeflate
                    };
                    opts.pfx = this.pfx;
                    opts.key = this.key;
                    opts.passphrase = this.passphrase;
                    opts.cert = this.cert;
                    opts.ca = this.ca;
                    opts.ciphers = this.ciphers;
                    opts.rejectUnauthorized = this.rejectUnauthorized;
                    if (this.extraHeaders) {
                        opts.headers = this.extraHeaders
                    }
                    this.ws = BrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);
                    if (this.ws.binaryType === undefined) {
                        this.supportsBinary = false
                    }
                    if (this.ws.supports && this.ws.supports.binary) {
                        this.supportsBinary = true;
                        this.ws.binaryType = "buffer"
                    } else {
                        this.ws.binaryType = "arraybuffer"
                    }
                    this.addEventListeners()
                };
                WS.prototype.addEventListeners = function() {
                    var self = this;
                    this.ws.onopen = function() {
                        self.onOpen()
                    };
                    this.ws.onclose = function() {
                        self.onClose()
                    };
                    this.ws.onmessage = function(ev) {
                        self.onData(ev.data)
                    };
                    this.ws.onerror = function(e) {
                        self.onError("websocket error", e)
                    }
                };
                if ("undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
                    WS.prototype.onData = function(data) {
                        var self = this;
                        setTimeout(function() {
                                Transport.prototype.onData.call(self, data)
                            },
                            0)
                    }
                }
                WS.prototype.write = function(packets) {
                    var self = this;
                    this.writable = false;
                    var total = packets.length;
                    for (var i = 0,
                             l = total; i < l; i++) { (function(packet) {
                        parser.encodePacket(packet, self.supportsBinary,
                            function(data) {
                                if (!BrowserWebSocket) {
                                    var opts = {};
                                    if (packet.options) {
                                        opts.compress = packet.options.compress
                                    }
                                    if (self.perMessageDeflate) {
                                        var len = "string" == typeof data ? global.Buffer.byteLength(data) : data.length;
                                        if (len < self.perMessageDeflate.threshold) {
                                            opts.compress = false
                                        }
                                    }
                                }
                                try {
                                    if (BrowserWebSocket) {
                                        self.ws.send(data)
                                    } else {
                                        self.ws.send(data, opts)
                                    }
                                } catch(e) {
                                    debug("websocket closed before onclose event")
                                }--total || done()
                            })
                    })(packets[i])
                    }
                    function done() {
                        self.emit("flush");
                        setTimeout(function() {
                                self.writable = true;
                                self.emit("drain")
                            },
                            0)
                    }
                };
                WS.prototype.onClose = function() {
                    Transport.prototype.onClose.call(this)
                };
                WS.prototype.doClose = function() {
                    if (typeof this.ws !== "undefined") {
                        this.ws.close()
                    }
                };
                WS.prototype.uri = function() {
                    var query = this.query || {};
                    var schema = this.secure ? "wss": "ws";
                    var port = "";
                    if (this.port && ("wss" == schema && this.port != 443 || "ws" == schema && this.port != 80)) {
                        port = ":" + this.port
                    }
                    if (this.timestampRequests) {
                        query[this.timestampParam] = yeast()
                    }
                    if (!this.supportsBinary) {
                        query.b64 = 1
                    }
                    query = parseqs.encode(query);
                    if (query.length) {
                        query = "?" + query
                    }
                    var ipv6 = this.hostname.indexOf(":") !== -1;
                    return schema + "://" + (ipv6 ? "[" + this.hostname + "]": this.hostname) + port + this.path + query
                };
                WS.prototype.check = function() {
                    return !! WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name)
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {
                    "../transport": 4,
                    "component-inherit": 16,
                    debug: 17,
                    "engine.io-parser": 19,
                    parseqs: 27,
                    ws: undefined,
                    yeast: 30
                }],
            10 : [function(_dereq_, module, exports) {
                var hasCORS = _dereq_("has-cors");
                module.exports = function(opts) {
                    var xdomain = opts.xdomain;
                    var xscheme = opts.xscheme;
                    var enablesXDR = opts.enablesXDR;
                    try {
                        if ("undefined" != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
                            return new XMLHttpRequest
                        }
                    } catch(e) {}
                    try {
                        if ("undefined" != typeof XDomainRequest && !xscheme && enablesXDR) {
                            return new XDomainRequest
                        }
                    } catch(e) {}
                    if (!xdomain) {
                        try {
                            return new ActiveXObject("Microsoft.XMLHTTP")
                        } catch(e) {}
                    }
                }
            },
                {
                    "has-cors": 22
                }],
            11 : [function(_dereq_, module, exports) {
                module.exports = after;
                function after(count, callback, err_cb) {
                    var bail = false;
                    err_cb = err_cb || noop;
                    proxy.count = count;
                    return count === 0 ? callback() : proxy;
                    function proxy(err, result) {
                        if (proxy.count <= 0) {
                            throw new Error("after called too many times")
                        }--proxy.count;
                        if (err) {
                            bail = true;
                            callback(err);
                            callback = err_cb
                        } else if (proxy.count === 0 && !bail) {
                            callback(null, result)
                        }
                    }
                }
                function noop() {}
            },
                {}],
            12 : [function(_dereq_, module, exports) {
                module.exports = function(arraybuffer, start, end) {
                    var bytes = arraybuffer.byteLength;
                    start = start || 0;
                    end = end || bytes;
                    if (arraybuffer.slice) {
                        return arraybuffer.slice(start, end)
                    }
                    if (start < 0) {
                        start += bytes
                    }
                    if (end < 0) {
                        end += bytes
                    }
                    if (end > bytes) {
                        end = bytes
                    }
                    if (start >= bytes || start >= end || bytes === 0) {
                        return new ArrayBuffer(0)
                    }
                    var abv = new Uint8Array(arraybuffer);
                    var result = new Uint8Array(end - start);
                    for (var i = start,
                             ii = 0; i < end; i++, ii++) {
                        result[ii] = abv[i]
                    }
                    return result.buffer
                }
            },
                {}],
            13 : [function(_dereq_, module, exports) { (function(chars) {
                "use strict";
                exports.encode = function(arraybuffer) {
                    var bytes = new Uint8Array(arraybuffer),
                        i,
                        len = bytes.length,
                        base64 = "";
                    for (i = 0; i < len; i += 3) {
                        base64 += chars[bytes[i] >> 2];
                        base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
                        base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
                        base64 += chars[bytes[i + 2] & 63]
                    }
                    if (len % 3 === 2) {
                        base64 = base64.substring(0, base64.length - 1) + "="
                    } else if (len % 3 === 1) {
                        base64 = base64.substring(0, base64.length - 2) + "=="
                    }
                    return base64
                };
                exports.decode = function(base64) {
                    var bufferLength = base64.length * .75,
                        len = base64.length,
                        i, p = 0,
                        encoded1, encoded2, encoded3, encoded4;
                    if (base64[base64.length - 1] === "=") {
                        bufferLength--;
                        if (base64[base64.length - 2] === "=") {
                            bufferLength--
                        }
                    }
                    var arraybuffer = new ArrayBuffer(bufferLength),
                        bytes = new Uint8Array(arraybuffer);
                    for (i = 0; i < len; i += 4) {
                        encoded1 = chars.indexOf(base64[i]);
                        encoded2 = chars.indexOf(base64[i + 1]);
                        encoded3 = chars.indexOf(base64[i + 2]);
                        encoded4 = chars.indexOf(base64[i + 3]);
                        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
                        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
                        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63
                    }
                    return arraybuffer
                }
            })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
            },
                {}],
            14 : [function(_dereq_, module, exports) { (function(global) {
                var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;
                var blobSupported = function() {
                    try {
                        var a = new Blob(["hi"]);
                        return a.size === 2
                    } catch(e) {
                        return false
                    }
                } ();
                var blobSupportsArrayBufferView = blobSupported &&
                    function() {
                        try {
                            var b = new Blob([new Uint8Array([1, 2])]);
                            return b.size === 2
                        } catch(e) {
                            return false
                        }
                    } ();
                var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;
                function mapArrayBufferViews(ary) {
                    for (var i = 0; i < ary.length; i++) {
                        var chunk = ary[i];
                        if (chunk.buffer instanceof ArrayBuffer) {
                            var buf = chunk.buffer;
                            if (chunk.byteLength !== buf.byteLength) {
                                var copy = new Uint8Array(chunk.byteLength);
                                copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
                                buf = copy.buffer
                            }
                            ary[i] = buf
                        }
                    }
                }
                function BlobBuilderConstructor(ary, options) {
                    options = options || {};
                    var bb = new BlobBuilder;
                    mapArrayBufferViews(ary);
                    for (var i = 0; i < ary.length; i++) {
                        bb.append(ary[i])
                    }
                    return options.type ? bb.getBlob(options.type) : bb.getBlob()
                }
                function BlobConstructor(ary, options) {
                    mapArrayBufferViews(ary);
                    return new Blob(ary, options || {})
                }
                module.exports = function() {
                    if (blobSupported) {
                        return blobSupportsArrayBufferView ? global.Blob: BlobConstructor
                    } else if (blobBuilderSupported) {
                        return BlobBuilderConstructor
                    } else {
                        return undefined
                    }
                } ()
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {}],
            15 : [function(_dereq_, module, exports) {
                module.exports = Emitter;
                function Emitter(obj) {
                    if (obj) return mixin(obj)
                }
                function mixin(obj) {
                    for (var key in Emitter.prototype) {
                        obj[key] = Emitter.prototype[key]
                    }
                    return obj
                }
                Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
                    this._callbacks = this._callbacks || {}; (this._callbacks[event] = this._callbacks[event] || []).push(fn);
                    return this
                };
                Emitter.prototype.once = function(event, fn) {
                    var self = this;
                    this._callbacks = this._callbacks || {};
                    function on() {
                        self.off(event, on);
                        fn.apply(this, arguments)
                    }
                    on.fn = fn;
                    this.on(event, on);
                    return this
                };
                Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
                    this._callbacks = this._callbacks || {};
                    if (0 == arguments.length) {
                        this._callbacks = {};
                        return this
                    }
                    var callbacks = this._callbacks[event];
                    if (!callbacks) return this;
                    if (1 == arguments.length) {
                        delete this._callbacks[event];
                        return this
                    }
                    var cb;
                    for (var i = 0; i < callbacks.length; i++) {
                        cb = callbacks[i];
                        if (cb === fn || cb.fn === fn) {
                            callbacks.splice(i, 1);
                            break
                        }
                    }
                    return this
                };
                Emitter.prototype.emit = function(event) {
                    this._callbacks = this._callbacks || {};
                    var args = [].slice.call(arguments, 1),
                        callbacks = this._callbacks[event];
                    if (callbacks) {
                        callbacks = callbacks.slice(0);
                        for (var i = 0,
                                 len = callbacks.length; i < len; ++i) {
                            callbacks[i].apply(this, args)
                        }
                    }
                    return this
                };
                Emitter.prototype.listeners = function(event) {
                    this._callbacks = this._callbacks || {};
                    return this._callbacks[event] || []
                };
                Emitter.prototype.hasListeners = function(event) {
                    return !! this.listeners(event).length
                }
            },
                {}],
            16 : [function(_dereq_, module, exports) {
                module.exports = function(a, b) {
                    var fn = function() {};
                    fn.prototype = b.prototype;
                    a.prototype = new fn;
                    a.prototype.constructor = a
                }
            },
                {}],
            17 : [function(_dereq_, module, exports) {
                exports = module.exports = _dereq_("./debug");
                exports.log = log;
                exports.formatArgs = formatArgs;
                exports.save = save;
                exports.load = load;
                exports.useColors = useColors;
                exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local: localstorage();
                exports.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];
                function useColors() {
                    return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
                }
                exports.formatters.j = function(v) {
                    return JSON.stringify(v)
                };
                function formatArgs() {
                    var args = arguments;
                    var useColors = this.useColors;
                    args[0] = (useColors ? "%c": "") + this.namespace + (useColors ? " %c": " ") + args[0] + (useColors ? "%c ": " ") + "+" + exports.humanize(this.diff);
                    if (!useColors) return args;
                    var c = "color: " + this.color;
                    args = [args[0], c, "color: inherit"].concat(Array.prototype.slice.call(args, 1));
                    var index = 0;
                    var lastC = 0;
                    args[0].replace(/%[a-z%]/g,
                        function(match) {
                            if ("%%" === match) return;
                            index++;
                            if ("%c" === match) {
                                lastC = index
                            }
                        });
                    args.splice(lastC, 0, c);
                    return args
                }
                function log() {
                    return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                }
                function save(namespaces) {
                    try {
                        if (null == namespaces) {
                            exports.storage.removeItem("debug")
                        } else {
                            exports.storage.debug = namespaces
                        }
                    } catch(e) {}
                }
                function load() {
                    var r;
                    try {
                        r = exports.storage.debug
                    } catch(e) {}
                    return r
                }
                exports.enable(load());
                function localstorage() {
                    try {
                        return window.localStorage
                    } catch(e) {}
                }
            },
                {
                    "./debug": 18
                }],
            18 : [function(_dereq_, module, exports) {
                exports = module.exports = debug;
                exports.coerce = coerce;
                exports.disable = disable;
                exports.enable = enable;
                exports.enabled = enabled;
                exports.humanize = _dereq_("ms");
                exports.names = [];
                exports.skips = [];
                exports.formatters = {};
                var prevColor = 0;
                var prevTime;
                function selectColor() {
                    return exports.colors[prevColor++%exports.colors.length]
                }
                function debug(namespace) {
                    function disabled() {}
                    disabled.enabled = false;
                    function enabled() {
                        var self = enabled;
                        var curr = +new Date;
                        var ms = curr - (prevTime || curr);
                        self.diff = ms;
                        self.prev = prevTime;
                        self.curr = curr;
                        prevTime = curr;
                        if (null == self.useColors) self.useColors = exports.useColors();
                        if (null == self.color && self.useColors) self.color = selectColor();
                        var args = Array.prototype.slice.call(arguments);
                        args[0] = exports.coerce(args[0]);
                        if ("string" !== typeof args[0]) {
                            args = ["%o"].concat(args)
                        }
                        var index = 0;
                        args[0] = args[0].replace(/%([a-z%])/g,
                            function(match, format) {
                                if (match === "%%") return match;
                                index++;
                                var formatter = exports.formatters[format];
                                if ("function" === typeof formatter) {
                                    var val = args[index];
                                    match = formatter.call(self, val);
                                    args.splice(index, 1);
                                    index--
                                }
                                return match
                            });
                        if ("function" === typeof exports.formatArgs) {
                            args = exports.formatArgs.apply(self, args)
                        }
                        var logFn = enabled.log || exports.log || console.log.bind(console);
                        logFn.apply(self, args)
                    }
                    enabled.enabled = true;
                    var fn = exports.enabled(namespace) ? enabled: disabled;
                    fn.namespace = namespace;
                    return fn
                }
                function enable(namespaces) {
                    exports.save(namespaces);
                    var split = (namespaces || "").split(/[\s,]+/);
                    var len = split.length;
                    for (var i = 0; i < len; i++) {
                        if (!split[i]) continue;
                        namespaces = split[i].replace(/\*/g, ".*?");
                        if (namespaces[0] === "-") {
                            exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"))
                        } else {
                            exports.names.push(new RegExp("^" + namespaces + "$"))
                        }
                    }
                }
                function disable() {
                    exports.enable("")
                }
                function enabled(name) {
                    var i, len;
                    for (i = 0, len = exports.skips.length; i < len; i++) {
                        if (exports.skips[i].test(name)) {
                            return false
                        }
                    }
                    for (i = 0, len = exports.names.length; i < len; i++) {
                        if (exports.names[i].test(name)) {
                            return true
                        }
                    }
                    return false
                }
                function coerce(val) {
                    if (val instanceof Error) return val.stack || val.message;
                    return val
                }
            },
                {
                    ms: 25
                }],
            19 : [function(_dereq_, module, exports) { (function(global) {
                var keys = _dereq_("./keys");
                var hasBinary = _dereq_("has-binary");
                var sliceBuffer = _dereq_("arraybuffer.slice");
                var base64encoder = _dereq_("base64-arraybuffer");
                var after = _dereq_("after");
                var utf8 = _dereq_("utf8");
                var isAndroid = navigator.userAgent.match(/Android/i);
                var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);
                var dontSendBlobs = isAndroid || isPhantomJS;
                exports.protocol = 3;
                var packets = exports.packets = {
                    open: 0,
                    close: 1,
                    ping: 2,
                    pong: 3,
                    message: 4,
                    upgrade: 5,
                    noop: 6
                };
                var packetslist = keys(packets);
                var err = {
                    type: "error",
                    data: "parser error"
                };
                var Blob = _dereq_("blob");
                exports.encodePacket = function(packet, supportsBinary, utf8encode, callback) {
                    if ("function" == typeof supportsBinary) {
                        callback = supportsBinary;
                        supportsBinary = false
                    }
                    if ("function" == typeof utf8encode) {
                        callback = utf8encode;
                        utf8encode = null
                    }
                    var data = packet.data === undefined ? undefined: packet.data.buffer || packet.data;
                    if (global.ArrayBuffer && data instanceof ArrayBuffer) {
                        return encodeArrayBuffer(packet, supportsBinary, callback)
                    } else if (Blob && data instanceof global.Blob) {
                        return encodeBlob(packet, supportsBinary, callback)
                    }
                    if (data && data.base64) {
                        return encodeBase64Object(packet, callback)
                    }
                    var encoded = packets[packet.type];
                    if (undefined !== packet.data) {
                        encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data)
                    }
                    return callback("" + encoded)
                };
                function encodeBase64Object(packet, callback) {
                    var message = "b" + exports.packets[packet.type] + packet.data.data;
                    return callback(message)
                }
                function encodeArrayBuffer(packet, supportsBinary, callback) {
                    if (!supportsBinary) {
                        return exports.encodeBase64Packet(packet, callback)
                    }
                    var data = packet.data;
                    var contentArray = new Uint8Array(data);
                    var resultBuffer = new Uint8Array(1 + data.byteLength);
                    resultBuffer[0] = packets[packet.type];
                    for (var i = 0; i < contentArray.length; i++) {
                        resultBuffer[i + 1] = contentArray[i]
                    }
                    return callback(resultBuffer.buffer)
                }
                function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
                    if (!supportsBinary) {
                        return exports.encodeBase64Packet(packet, callback)
                    }
                    var fr = new FileReader;
                    fr.onload = function() {
                        packet.data = fr.result;
                        exports.encodePacket(packet, supportsBinary, true, callback)
                    };
                    return fr.readAsArrayBuffer(packet.data)
                }
                function encodeBlob(packet, supportsBinary, callback) {
                    if (!supportsBinary) {
                        return exports.encodeBase64Packet(packet, callback)
                    }
                    if (dontSendBlobs) {
                        return encodeBlobAsArrayBuffer(packet, supportsBinary, callback)
                    }
                    var length = new Uint8Array(1);
                    length[0] = packets[packet.type];
                    var blob = new Blob([length.buffer, packet.data]);
                    return callback(blob)
                }
                exports.encodeBase64Packet = function(packet, callback) {
                    var message = "b" + exports.packets[packet.type];
                    if (Blob && packet.data instanceof global.Blob) {
                        var fr = new FileReader;
                        fr.onload = function() {
                            var b64 = fr.result.split(",")[1];
                            callback(message + b64)
                        };
                        return fr.readAsDataURL(packet.data)
                    }
                    var b64data;
                    try {
                        b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data))
                    } catch(e) {
                        var typed = new Uint8Array(packet.data);
                        var basic = new Array(typed.length);
                        for (var i = 0; i < typed.length; i++) {
                            basic[i] = typed[i]
                        }
                        b64data = String.fromCharCode.apply(null, basic)
                    }
                    message += global.btoa(b64data);
                    return callback(message)
                };
                exports.decodePacket = function(data, binaryType, utf8decode) {
                    if (typeof data == "string" || data === undefined) {
                        if (data.charAt(0) == "b") {
                            return exports.decodeBase64Packet(data.substr(1), binaryType)
                        }
                        if (utf8decode) {
                            try {
                                data = utf8.decode(data)
                            } catch(e) {
                                return err
                            }
                        }
                        var type = data.charAt(0);
                        if (Number(type) != type || !packetslist[type]) {
                            return err
                        }
                        if (data.length > 1) {
                            return {
                                type: packetslist[type],
                                data: data.substring(1)
                            }
                        } else {
                            return {
                                type: packetslist[type]
                            }
                        }
                    }
                    var asArray = new Uint8Array(data);
                    var type = asArray[0];
                    var rest = sliceBuffer(data, 1);
                    if (Blob && binaryType === "blob") {
                        rest = new Blob([rest])
                    }
                    return {
                        type: packetslist[type],
                        data: rest
                    }
                };
                exports.decodeBase64Packet = function(msg, binaryType) {
                    var type = packetslist[msg.charAt(0)];
                    if (!global.ArrayBuffer) {
                        return {
                            type: type,
                            data: {
                                base64: true,
                                data: msg.substr(1)
                            }
                        }
                    }
                    var data = base64encoder.decode(msg.substr(1));
                    if (binaryType === "blob" && Blob) {
                        data = new Blob([data])
                    }
                    return {
                        type: type,
                        data: data
                    }
                };
                exports.encodePayload = function(packets, supportsBinary, callback) {
                    if (typeof supportsBinary == "function") {
                        callback = supportsBinary;
                        supportsBinary = null
                    }
                    var isBinary = hasBinary(packets);
                    if (supportsBinary && isBinary) {
                        if (Blob && !dontSendBlobs) {
                            return exports.encodePayloadAsBlob(packets, callback)
                        }
                        return exports.encodePayloadAsArrayBuffer(packets, callback)
                    }
                    if (!packets.length) {
                        return callback("0:")
                    }
                    function setLengthHeader(message) {
                        return message.length + ":" + message
                    }
                    function encodeOne(packet, doneCallback) {
                        exports.encodePacket(packet, !isBinary ? false: supportsBinary, true,
                            function(message) {
                                doneCallback(null, setLengthHeader(message))
                            })
                    }
                    map(packets, encodeOne,
                        function(err, results) {
                            return callback(results.join(""))
                        })
                };
                function map(ary, each, done) {
                    var result = new Array(ary.length);
                    var next = after(ary.length, done);
                    var eachWithIndex = function(i, el, cb) {
                        each(el,
                            function(error, msg) {
                                result[i] = msg;
                                cb(error, result)
                            })
                    };
                    for (var i = 0; i < ary.length; i++) {
                        eachWithIndex(i, ary[i], next)
                    }
                }
                exports.decodePayload = function(data, binaryType, callback) {
                    if (typeof data != "string") {
                        return exports.decodePayloadAsBinary(data, binaryType, callback)
                    }
                    if (typeof binaryType === "function") {
                        callback = binaryType;
                        binaryType = null
                    }
                    var packet;
                    if (data == "") {
                        return callback(err, 0, 1)
                    }
                    var length = "",
                        n, msg;
                    for (var i = 0,
                             l = data.length; i < l; i++) {
                        var chr = data.charAt(i);
                        if (":" != chr) {
                            length += chr
                        } else {
                            if ("" == length || length != (n = Number(length))) {
                                return callback(err, 0, 1)
                            }
                            msg = data.substr(i + 1, n);
                            if (length != msg.length) {
                                return callback(err, 0, 1)
                            }
                            if (msg.length) {
                                packet = exports.decodePacket(msg, binaryType, true);
                                if (err.type == packet.type && err.data == packet.data) {
                                    return callback(err, 0, 1)
                                }
                                var ret = callback(packet, i + n, l);
                                if (false === ret) return
                            }
                            i += n;
                            length = ""
                        }
                    }
                    if (length != "") {
                        return callback(err, 0, 1)
                    }
                };
                exports.encodePayloadAsArrayBuffer = function(packets, callback) {
                    if (!packets.length) {
                        return callback(new ArrayBuffer(0))
                    }
                    function encodeOne(packet, doneCallback) {
                        exports.encodePacket(packet, true, true,
                            function(data) {
                                return doneCallback(null, data)
                            })
                    }
                    map(packets, encodeOne,
                        function(err, encodedPackets) {
                            var totalLength = encodedPackets.reduce(function(acc, p) {
                                    var len;
                                    if (typeof p === "string") {
                                        len = p.length
                                    } else {
                                        len = p.byteLength
                                    }
                                    return acc + len.toString().length + len + 2
                                },
                                0);
                            var resultArray = new Uint8Array(totalLength);
                            var bufferIndex = 0;
                            encodedPackets.forEach(function(p) {
                                var isString = typeof p === "string";
                                var ab = p;
                                if (isString) {
                                    var view = new Uint8Array(p.length);
                                    for (var i = 0; i < p.length; i++) {
                                        view[i] = p.charCodeAt(i)
                                    }
                                    ab = view.buffer
                                }
                                if (isString) {
                                    resultArray[bufferIndex++] = 0
                                } else {
                                    resultArray[bufferIndex++] = 1
                                }
                                var lenStr = ab.byteLength.toString();
                                for (var i = 0; i < lenStr.length; i++) {
                                    resultArray[bufferIndex++] = parseInt(lenStr[i])
                                }
                                resultArray[bufferIndex++] = 255;
                                var view = new Uint8Array(ab);
                                for (var i = 0; i < view.length; i++) {
                                    resultArray[bufferIndex++] = view[i]
                                }
                            });
                            return callback(resultArray.buffer)
                        })
                };
                exports.encodePayloadAsBlob = function(packets, callback) {
                    function encodeOne(packet, doneCallback) {
                        exports.encodePacket(packet, true, true,
                            function(encoded) {
                                var binaryIdentifier = new Uint8Array(1);
                                binaryIdentifier[0] = 1;
                                if (typeof encoded === "string") {
                                    var view = new Uint8Array(encoded.length);
                                    for (var i = 0; i < encoded.length; i++) {
                                        view[i] = encoded.charCodeAt(i)
                                    }
                                    encoded = view.buffer;
                                    binaryIdentifier[0] = 0
                                }
                                var len = encoded instanceof ArrayBuffer ? encoded.byteLength: encoded.size;
                                var lenStr = len.toString();
                                var lengthAry = new Uint8Array(lenStr.length + 1);
                                for (var i = 0; i < lenStr.length; i++) {
                                    lengthAry[i] = parseInt(lenStr[i])
                                }
                                lengthAry[lenStr.length] = 255;
                                if (Blob) {
                                    var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
                                    doneCallback(null, blob)
                                }
                            })
                    }
                    map(packets, encodeOne,
                        function(err, results) {
                            return callback(new Blob(results))
                        })
                };
                exports.decodePayloadAsBinary = function(data, binaryType, callback) {
                    if (typeof binaryType === "function") {
                        callback = binaryType;
                        binaryType = null
                    }
                    var bufferTail = data;
                    var buffers = [];
                    var numberTooLong = false;
                    while (bufferTail.byteLength > 0) {
                        var tailArray = new Uint8Array(bufferTail);
                        var isString = tailArray[0] === 0;
                        var msgLength = "";
                        for (var i = 1;; i++) {
                            if (tailArray[i] == 255) break;
                            if (msgLength.length > 310) {
                                numberTooLong = true;
                                break
                            }
                            msgLength += tailArray[i]
                        }
                        if (numberTooLong) return callback(err, 0, 1);
                        bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
                        msgLength = parseInt(msgLength);
                        var msg = sliceBuffer(bufferTail, 0, msgLength);
                        if (isString) {
                            try {
                                msg = String.fromCharCode.apply(null, new Uint8Array(msg))
                            } catch(e) {
                                var typed = new Uint8Array(msg);
                                msg = "";
                                for (var i = 0; i < typed.length; i++) {
                                    msg += String.fromCharCode(typed[i])
                                }
                            }
                        }
                        buffers.push(msg);
                        bufferTail = sliceBuffer(bufferTail, msgLength)
                    }
                    var total = buffers.length;
                    buffers.forEach(function(buffer, i) {
                        callback(exports.decodePacket(buffer, binaryType, true), i, total)
                    })
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {
                    "./keys": 20,
                    after: 11,
                    "arraybuffer.slice": 12,
                    "base64-arraybuffer": 13,
                    blob: 14,
                    "has-binary": 21,
                    utf8: 29
                }],
            20 : [function(_dereq_, module, exports) {
                module.exports = Object.keys ||
                    function keys(obj) {
                        var arr = [];
                        var has = Object.prototype.hasOwnProperty;
                        for (var i in obj) {
                            if (has.call(obj, i)) {
                                arr.push(i)
                            }
                        }
                        return arr
                    }
            },
                {}],
            21 : [function(_dereq_, module, exports) { (function(global) {
                var isArray = _dereq_("isarray");
                module.exports = hasBinary;
                function hasBinary(data) {
                    function _hasBinary(obj) {
                        if (!obj) return false;
                        if (global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                            return true
                        }
                        if (isArray(obj)) {
                            for (var i = 0; i < obj.length; i++) {
                                if (_hasBinary(obj[i])) {
                                    return true
                                }
                            }
                        } else if (obj && "object" == typeof obj) {
                            if (obj.toJSON) {
                                obj = obj.toJSON()
                            }
                            for (var key in obj) {
                                if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
                                    return true
                                }
                            }
                        }
                        return false
                    }
                    return _hasBinary(data)
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {
                    isarray: 24
                }],
            22 : [function(_dereq_, module, exports) {
                try {
                    module.exports = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest
                } catch(err) {
                    module.exports = false
                }
            },
                {}],
            23 : [function(_dereq_, module, exports) {
                var indexOf = [].indexOf;
                module.exports = function(arr, obj) {
                    if (indexOf) return arr.indexOf(obj);
                    for (var i = 0; i < arr.length; ++i) {
                        if (arr[i] === obj) return i
                    }
                    return - 1
                }
            },
                {}],
            24 : [function(_dereq_, module, exports) {
                module.exports = Array.isArray ||
                    function(arr) {
                        return Object.prototype.toString.call(arr) == "[object Array]"
                    }
            },
                {}],
            25 : [function(_dereq_, module, exports) {
                var s = 1e3;
                var m = s * 60;
                var h = m * 60;
                var d = h * 24;
                var y = d * 365.25;
                module.exports = function(val, options) {
                    options = options || {};
                    if ("string" == typeof val) return parse(val);
                    return options.long ? long(val) : short(val)
                };
                function parse(str) {
                    str = "" + str;
                    if (str.length > 1e4) return;
                    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
                    if (!match) return;
                    var n = parseFloat(match[1]);
                    var type = (match[2] || "ms").toLowerCase();
                    switch (type) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return n * y;
                        case "days":
                        case "day":
                        case "d":
                            return n * d;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return n * h;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return n * m;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return n * s;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return n
                    }
                }
                function short(ms) {
                    if (ms >= d) return Math.round(ms / d) + "d";
                    if (ms >= h) return Math.round(ms / h) + "h";
                    if (ms >= m) return Math.round(ms / m) + "m";
                    if (ms >= s) return Math.round(ms / s) + "s";
                    return ms + "ms"
                }
                function long(ms) {
                    return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms"
                }
                function plural(ms, n, name) {
                    if (ms < n) return;
                    if (ms < n * 1.5) return Math.floor(ms / n) + " " + name;
                    return Math.ceil(ms / n) + " " + name + "s"
                }
            },
                {}],
            26 : [function(_dereq_, module, exports) { (function(global) {
                var rvalidchars = /^[\],:{}\s]*$/;
                var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
                var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
                var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
                var rtrimLeft = /^\s+/;
                var rtrimRight = /\s+$/;
                module.exports = function parsejson(data) {
                    if ("string" != typeof data || !data) {
                        return null
                    }
                    data = data.replace(rtrimLeft, "").replace(rtrimRight, "");
                    if (global.JSON && JSON.parse) {
                        return JSON.parse(data)
                    }
                    if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                        return new Function("return " + data)()
                    }
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {}],
            27 : [function(_dereq_, module, exports) {
                exports.encode = function(obj) {
                    var str = "";
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i)) {
                            if (str.length) str += "&";
                            str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i])
                        }
                    }
                    return str
                };
                exports.decode = function(qs) {
                    var qry = {};
                    var pairs = qs.split("&");
                    for (var i = 0,
                             l = pairs.length; i < l; i++) {
                        var pair = pairs[i].split("=");
                        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
                    }
                    return qry
                }
            },
                {}],
            28 : [function(_dereq_, module, exports) {
                var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
                var parts = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                module.exports = function parseuri(str) {
                    var src = str,
                        b = str.indexOf("["),
                        e = str.indexOf("]");
                    if (b != -1 && e != -1) {
                        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length)
                    }
                    var m = re.exec(str || ""),
                        uri = {},
                        i = 14;
                    while (i--) {
                        uri[parts[i]] = m[i] || ""
                    }
                    if (b != -1 && e != -1) {
                        uri.source = src;
                        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
                        uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
                        uri.ipv6uri = true
                    }
                    return uri
                }
            },
                {}],
            29 : [function(_dereq_, module, exports) { (function(global) { (function(root) {
                var freeExports = typeof exports == "object" && exports;
                var freeModule = typeof module == "object" && module && module.exports == freeExports && module;
                var freeGlobal = typeof global == "object" && global;
                if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
                    root = freeGlobal
                }
                var stringFromCharCode = String.fromCharCode;
                function ucs2decode(string) {
                    var output = [];
                    var counter = 0;
                    var length = string.length;
                    var value;
                    var extra;
                    while (counter < length) {
                        value = string.charCodeAt(counter++);
                        if (value >= 55296 && value <= 56319 && counter < length) {
                            extra = string.charCodeAt(counter++);
                            if ((extra & 64512) == 56320) {
                                output.push(((value & 1023) << 10) + (extra & 1023) + 65536)
                            } else {
                                output.push(value);
                                counter--
                            }
                        } else {
                            output.push(value)
                        }
                    }
                    return output
                }
                function ucs2encode(array) {
                    var length = array.length;
                    var index = -1;
                    var value;
                    var output = "";
                    while (++index < length) {
                        value = array[index];
                        if (value > 65535) {
                            value -= 65536;
                            output += stringFromCharCode(value >>> 10 & 1023 | 55296);
                            value = 56320 | value & 1023
                        }
                        output += stringFromCharCode(value)
                    }
                    return output
                }
                function checkScalarValue(codePoint) {
                    if (codePoint >= 55296 && codePoint <= 57343) {
                        throw Error("Lone surrogate U+" + codePoint.toString(16).toUpperCase() + " is not a scalar value")
                    }
                }
                function createByte(codePoint, shift) {
                    return stringFromCharCode(codePoint >> shift & 63 | 128)
                }
                function encodeCodePoint(codePoint) {
                    if ((codePoint & 4294967168) == 0) {
                        return stringFromCharCode(codePoint)
                    }
                    var symbol = "";
                    if ((codePoint & 4294965248) == 0) {
                        symbol = stringFromCharCode(codePoint >> 6 & 31 | 192)
                    } else if ((codePoint & 4294901760) == 0) {
                        checkScalarValue(codePoint);
                        symbol = stringFromCharCode(codePoint >> 12 & 15 | 224);
                        symbol += createByte(codePoint, 6)
                    } else if ((codePoint & 4292870144) == 0) {
                        symbol = stringFromCharCode(codePoint >> 18 & 7 | 240);
                        symbol += createByte(codePoint, 12);
                        symbol += createByte(codePoint, 6)
                    }
                    symbol += stringFromCharCode(codePoint & 63 | 128);
                    return symbol
                }
                function utf8encode(string) {
                    var codePoints = ucs2decode(string);
                    var length = codePoints.length;
                    var index = -1;
                    var codePoint;
                    var byteString = "";
                    while (++index < length) {
                        codePoint = codePoints[index];
                        byteString += encodeCodePoint(codePoint)
                    }
                    return byteString
                }
                function readContinuationByte() {
                    if (byteIndex >= byteCount) {
                        throw Error("Invalid byte index")
                    }
                    var continuationByte = byteArray[byteIndex] & 255;
                    byteIndex++;
                    if ((continuationByte & 192) == 128) {
                        return continuationByte & 63
                    }
                    throw Error("Invalid continuation byte")
                }
                function decodeSymbol() {
                    var byte1;
                    var byte2;
                    var byte3;
                    var byte4;
                    var codePoint;
                    if (byteIndex > byteCount) {
                        throw Error("Invalid byte index")
                    }
                    if (byteIndex == byteCount) {
                        return false
                    }
                    byte1 = byteArray[byteIndex] & 255;
                    byteIndex++;
                    if ((byte1 & 128) == 0) {
                        return byte1
                    }
                    if ((byte1 & 224) == 192) {
                        var byte2 = readContinuationByte();
                        codePoint = (byte1 & 31) << 6 | byte2;
                        if (codePoint >= 128) {
                            return codePoint
                        } else {
                            throw Error("Invalid continuation byte")
                        }
                    }
                    if ((byte1 & 240) == 224) {
                        byte2 = readContinuationByte();
                        byte3 = readContinuationByte();
                        codePoint = (byte1 & 15) << 12 | byte2 << 6 | byte3;
                        if (codePoint >= 2048) {
                            checkScalarValue(codePoint);
                            return codePoint
                        } else {
                            throw Error("Invalid continuation byte")
                        }
                    }
                    if ((byte1 & 248) == 240) {
                        byte2 = readContinuationByte();
                        byte3 = readContinuationByte();
                        byte4 = readContinuationByte();
                        codePoint = (byte1 & 15) << 18 | byte2 << 12 | byte3 << 6 | byte4;
                        if (codePoint >= 65536 && codePoint <= 1114111) {
                            return codePoint
                        }
                    }
                    throw Error("Invalid UTF-8 detected")
                }
                var byteArray;
                var byteCount;
                var byteIndex;
                function utf8decode(byteString) {
                    byteArray = ucs2decode(byteString);
                    byteCount = byteArray.length;
                    byteIndex = 0;
                    var codePoints = [];
                    var tmp;
                    while ((tmp = decodeSymbol()) !== false) {
                        codePoints.push(tmp)
                    }
                    return ucs2encode(codePoints)
                }
                var utf8 = {
                    version: "2.0.0",
                    encode: utf8encode,
                    decode: utf8decode
                };
                if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
                    define(function() {
                        return utf8
                    })
                } else if (freeExports && !freeExports.nodeType) {
                    if (freeModule) {
                        freeModule.exports = utf8
                    } else {
                        var object = {};
                        var hasOwnProperty = object.hasOwnProperty;
                        for (var key in utf8) {
                            hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key])
                        }
                    }
                } else {
                    root.utf8 = utf8
                }
            })(this)
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {}],
            30 : [function(_dereq_, module, exports) {
                "use strict";
                var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
                    length = 64,
                    map = {},
                    seed = 0,
                    i = 0,
                    prev;
                function encode(num) {
                    var encoded = "";
                    do {
                        encoded = alphabet[num % length] + encoded;
                        num = Math.floor(num / length)
                    } while ( num > 0 );
                    return encoded
                }
                function decode(str) {
                    var decoded = 0;
                    for (i = 0; i < str.length; i++) {
                        decoded = decoded * length + map[str.charAt(i)]
                    }
                    return decoded
                }
                function yeast() {
                    var now = encode( + new Date);
                    if (now !== prev) return seed = 0,
                        prev = now;
                    return now + "." + encode(seed++)
                }
                for (; i < length; i++) map[alphabet[i]] = i;
                yeast.encode = encode;
                yeast.decode = decode;
                module.exports = yeast
            },
                {}],
            31 : [function(_dereq_, module, exports) {
                var url = _dereq_("./url");
                var parser = _dereq_("socket.io-parser");
                var Manager = _dereq_("./manager");
                var debug = _dereq_("debug")("socket.io-client");
                module.exports = exports = lookup;
                var cache = exports.managers = {};
                function lookup(uri, opts) {
                    if (typeof uri == "object") {
                        opts = uri;
                        uri = undefined
                    }
                    opts = opts || {};
                    var parsed = url(uri);
                    var source = parsed.source;
                    var id = parsed.id;
                    var path = parsed.path;
                    var sameNamespace = cache[id] && path in cache[id].nsps;
                    var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
                    var io;
                    if (newConnection) {
                        debug("ignoring socket cache for %s", source);
                        io = Manager(source, opts)
                    } else {
                        if (!cache[id]) {
                            debug("new io instance for %s", source);
                            cache[id] = Manager(source, opts)
                        }
                        io = cache[id]
                    }
                    return io.socket(parsed.path)
                }
                exports.protocol = parser.protocol;
                exports.connect = lookup;
                exports.Manager = _dereq_("./manager");
                exports.Socket = _dereq_("./socket")
            },
                {
                    "./manager": 32,
                    "./socket": 34,
                    "./url": 35,
                    debug: 39,
                    "socket.io-parser": 47
                }],
            32 : [function(_dereq_, module, exports) {
                var eio = _dereq_("engine.io-client");
                var Socket = _dereq_("./socket");
                var Emitter = _dereq_("component-emitter");
                var parser = _dereq_("socket.io-parser");
                var on = _dereq_("./on");
                var bind = _dereq_("component-bind");
                var debug = _dereq_("debug")("socket.io-client:manager");
                var indexOf = _dereq_("indexof");
                var Backoff = _dereq_("backo2");
                var has = Object.prototype.hasOwnProperty;
                module.exports = Manager;
                function Manager(uri, opts) {
                    if (! (this instanceof Manager)) return new Manager(uri, opts);
                    if (uri && "object" == typeof uri) {
                        opts = uri;
                        uri = undefined
                    }
                    opts = opts || {};
                    opts.path = opts.path || "/socket.io";
                    this.nsps = {};
                    this.subs = [];
                    this.opts = opts;
                    this.reconnection(opts.reconnection !== false);
                    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
                    this.reconnectionDelay(opts.reconnectionDelay || 1e3);
                    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
                    this.randomizationFactor(opts.randomizationFactor || .5);
                    this.backoff = new Backoff({
                        min: this.reconnectionDelay(),
                        max: this.reconnectionDelayMax(),
                        jitter: this.randomizationFactor()
                    });
                    this.timeout(null == opts.timeout ? 2e4: opts.timeout);
                    this.readyState = "closed";
                    this.uri = uri;
                    this.connecting = [];
                    this.lastPing = null;
                    this.encoding = false;
                    this.packetBuffer = [];
                    this.encoder = new parser.Encoder;
                    this.decoder = new parser.Decoder;
                    this.autoConnect = opts.autoConnect !== false;
                    if (this.autoConnect) this.open()
                }
                Manager.prototype.emitAll = function() {
                    this.emit.apply(this, arguments);
                    for (var nsp in this.nsps) {
                        if (has.call(this.nsps, nsp)) {
                            this.nsps[nsp].emit.apply(this.nsps[nsp], arguments)
                        }
                    }
                };
                Manager.prototype.updateSocketIds = function() {
                    for (var nsp in this.nsps) {
                        if (has.call(this.nsps, nsp)) {
                            this.nsps[nsp].id = this.engine.id
                        }
                    }
                };
                Emitter(Manager.prototype);
                Manager.prototype.reconnection = function(v) {
                    if (!arguments.length) return this._reconnection;
                    this._reconnection = !!v;
                    return this
                };
                Manager.prototype.reconnectionAttempts = function(v) {
                    if (!arguments.length) return this._reconnectionAttempts;
                    this._reconnectionAttempts = v;
                    return this
                };
                Manager.prototype.reconnectionDelay = function(v) {
                    if (!arguments.length) return this._reconnectionDelay;
                    this._reconnectionDelay = v;
                    this.backoff && this.backoff.setMin(v);
                    return this
                };
                Manager.prototype.randomizationFactor = function(v) {
                    if (!arguments.length) return this._randomizationFactor;
                    this._randomizationFactor = v;
                    this.backoff && this.backoff.setJitter(v);
                    return this
                };
                Manager.prototype.reconnectionDelayMax = function(v) {
                    if (!arguments.length) return this._reconnectionDelayMax;
                    this._reconnectionDelayMax = v;
                    this.backoff && this.backoff.setMax(v);
                    return this
                };
                Manager.prototype.timeout = function(v) {
                    if (!arguments.length) return this._timeout;
                    this._timeout = v;
                    return this
                };
                Manager.prototype.maybeReconnectOnOpen = function() {
                    if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
                        this.reconnect()
                    }
                };
                Manager.prototype.open = Manager.prototype.connect = function(fn) {
                    debug("readyState %s", this.readyState);
                    if (~this.readyState.indexOf("open")) return this;
                    debug("opening %s", this.uri);
                    this.engine = eio(this.uri, this.opts);
                    var socket = this.engine;
                    var self = this;
                    this.readyState = "opening";
                    this.skipReconnect = false;
                    var openSub = on(socket, "open",
                        function() {
                            self.onopen();
                            fn && fn()
                        });
                    var errorSub = on(socket, "error",
                        function(data) {
                            debug("connect_error");
                            self.cleanup();
                            self.readyState = "closed";
                            self.emitAll("connect_error", data);
                            if (fn) {
                                var err = new Error("Connection error");
                                err.data = data;
                                fn(err)
                            } else {
                                self.maybeReconnectOnOpen()
                            }
                        });
                    if (false !== this._timeout) {
                        var timeout = this._timeout;
                        debug("connect attempt will timeout after %d", timeout);
                        var timer = setTimeout(function() {
                                debug("connect attempt timed out after %d", timeout);
                                openSub.destroy();
                                socket.close();
                                socket.emit("error", "timeout");
                                self.emitAll("connect_timeout", timeout)
                            },
                            timeout);
                        this.subs.push({
                            destroy: function() {
                                clearTimeout(timer)
                            }
                        })
                    }
                    this.subs.push(openSub);
                    this.subs.push(errorSub);
                    return this
                };
                Manager.prototype.onopen = function() {
                    debug("open");
                    this.cleanup();
                    this.readyState = "open";
                    this.emit("open");
                    var socket = this.engine;
                    this.subs.push(on(socket, "data", bind(this, "ondata")));
                    this.subs.push(on(socket, "ping", bind(this, "onping")));
                    this.subs.push(on(socket, "pong", bind(this, "onpong")));
                    this.subs.push(on(socket, "error", bind(this, "onerror")));
                    this.subs.push(on(socket, "close", bind(this, "onclose")));
                    this.subs.push(on(this.decoder, "decoded", bind(this, "ondecoded")))
                };
                Manager.prototype.onping = function() {
                    this.lastPing = new Date;
                    this.emitAll("ping")
                };
                Manager.prototype.onpong = function() {
                    this.emitAll("pong", new Date - this.lastPing)
                };
                Manager.prototype.ondata = function(data) {
                    this.decoder.add(data)
                };
                Manager.prototype.ondecoded = function(packet) {
                    this.emit("packet", packet)
                };
                Manager.prototype.onerror = function(err) {
                    debug("error", err);
                    this.emitAll("error", err)
                };
                Manager.prototype.socket = function(nsp) {
                    var socket = this.nsps[nsp];
                    if (!socket) {
                        socket = new Socket(this, nsp);
                        this.nsps[nsp] = socket;
                        var self = this;
                        socket.on("connecting", onConnecting);
                        socket.on("connect",
                            function() {
                                socket.id = self.engine.id
                            });
                        if (this.autoConnect) {
                            onConnecting()
                        }
                    }
                    function onConnecting() {
                        if (!~indexOf(self.connecting, socket)) {
                            self.connecting.push(socket)
                        }
                    }
                    return socket
                };
                Manager.prototype.destroy = function(socket) {
                    var index = indexOf(this.connecting, socket);
                    if (~index) this.connecting.splice(index, 1);
                    if (this.connecting.length) return;
                    this.close()
                };
                Manager.prototype.packet = function(packet) {
                    debug("writing packet %j", packet);
                    var self = this;
                    if (!self.encoding) {
                        self.encoding = true;
                        this.encoder.encode(packet,
                            function(encodedPackets) {
                                for (var i = 0; i < encodedPackets.length; i++) {
                                    self.engine.write(encodedPackets[i], packet.options)
                                }
                                self.encoding = false;
                                self.processPacketQueue()
                            })
                    } else {
                        self.packetBuffer.push(packet)
                    }
                };
                Manager.prototype.processPacketQueue = function() {
                    if (this.packetBuffer.length > 0 && !this.encoding) {
                        var pack = this.packetBuffer.shift();
                        this.packet(pack)
                    }
                };
                Manager.prototype.cleanup = function() {
                    debug("cleanup");
                    var sub;
                    while (sub = this.subs.shift()) sub.destroy();
                    this.packetBuffer = [];
                    this.encoding = false;
                    this.lastPing = null;
                    this.decoder.destroy()
                };
                Manager.prototype.close = Manager.prototype.disconnect = function() {
                    debug("disconnect");
                    this.skipReconnect = true;
                    this.reconnecting = false;
                    if ("opening" == this.readyState) {
                        this.cleanup()
                    }
                    this.backoff.reset();
                    this.readyState = "closed";
                    if (this.engine) this.engine.close()
                };
                Manager.prototype.onclose = function(reason) {
                    debug("onclose");
                    this.cleanup();
                    this.backoff.reset();
                    this.readyState = "closed";
                    this.emit("close", reason);
                    if (this._reconnection && !this.skipReconnect) {
                        this.reconnect()
                    }
                };
                Manager.prototype.reconnect = function() {
                    if (this.reconnecting || this.skipReconnect) return this;
                    var self = this;
                    if (this.backoff.attempts >= this._reconnectionAttempts) {
                        debug("reconnect failed");
                        this.backoff.reset();
                        this.emitAll("reconnect_failed");
                        this.reconnecting = false
                    } else {
                        var delay = this.backoff.duration();
                        debug("will wait %dms before reconnect attempt", delay);
                        this.reconnecting = true;
                        var timer = setTimeout(function() {
                                if (self.skipReconnect) return;
                                debug("attempting reconnect");
                                self.emitAll("reconnect_attempt", self.backoff.attempts);
                                self.emitAll("reconnecting", self.backoff.attempts);
                                if (self.skipReconnect) return;
                                self.open(function(err) {
                                    if (err) {
                                        debug("reconnect attempt error");
                                        self.reconnecting = false;
                                        self.reconnect();
                                        self.emitAll("reconnect_error", err.data)
                                    } else {
                                        debug("reconnect success");
                                        self.onreconnect()
                                    }
                                })
                            },
                            delay);
                        this.subs.push({
                            destroy: function() {
                                clearTimeout(timer)
                            }
                        })
                    }
                };
                Manager.prototype.onreconnect = function() {
                    var attempt = this.backoff.attempts;
                    this.reconnecting = false;
                    this.backoff.reset();
                    this.updateSocketIds();
                    this.emitAll("reconnect", attempt)
                }
            },
                {
                    "./on": 33,
                    "./socket": 34,
                    backo2: 36,
                    "component-bind": 37,
                    "component-emitter": 38,
                    debug: 39,
                    "engine.io-client": 1,
                    indexof: 42,
                    "socket.io-parser": 47
                }],
            33 : [function(_dereq_, module, exports) {
                module.exports = on;
                function on(obj, ev, fn) {
                    obj.on(ev, fn);
                    return {
                        destroy: function() {
                            obj.removeListener(ev, fn)
                        }
                    }
                }
            },
                {}],
            34 : [function(_dereq_, module, exports) {
                var parser = _dereq_("socket.io-parser");
                var Emitter = _dereq_("component-emitter");
                var toArray = _dereq_("to-array");
                var on = _dereq_("./on");
                var bind = _dereq_("component-bind");
                var debug = _dereq_("debug")("socket.io-client:socket");
                var hasBin = _dereq_("has-binary");
                module.exports = exports = Socket;
                var events = {
                    connect: 1,
                    connect_error: 1,
                    connect_timeout: 1,
                    connecting: 1,
                    disconnect: 1,
                    error: 1,
                    reconnect: 1,
                    reconnect_attempt: 1,
                    reconnect_failed: 1,
                    reconnect_error: 1,
                    reconnecting: 1,
                    ping: 1,
                    pong: 1
                };
                var emit = Emitter.prototype.emit;
                function Socket(io, nsp) {
                    this.io = io;
                    this.nsp = nsp;
                    this.json = this;
                    this.ids = 0;
                    this.acks = {};
                    this.receiveBuffer = [];
                    this.sendBuffer = [];
                    this.connected = false;
                    this.disconnected = true;
                    if (this.io.autoConnect) this.open()
                }
                Emitter(Socket.prototype);
                Socket.prototype.subEvents = function() {
                    if (this.subs) return;
                    var io = this.io;
                    this.subs = [on(io, "open", bind(this, "onopen")), on(io, "packet", bind(this, "onpacket")), on(io, "close", bind(this, "onclose"))]
                };
                Socket.prototype.open = Socket.prototype.connect = function() {
                    if (this.connected) return this;
                    this.subEvents();
                    this.io.open();
                    if ("open" == this.io.readyState) this.onopen();
                    this.emit("connecting");
                    return this
                };
                Socket.prototype.send = function() {
                    var args = toArray(arguments);
                    args.unshift("message");
                    this.emit.apply(this, args);
                    return this
                };
                Socket.prototype.emit = function(ev) {
                    if (events.hasOwnProperty(ev)) {
                        emit.apply(this, arguments);
                        return this
                    }
                    var args = toArray(arguments);
                    var parserType = parser.EVENT;
                    if (hasBin(args)) {
                        parserType = parser.BINARY_EVENT
                    }
                    var packet = {
                        type: parserType,
                        data: args
                    };
                    packet.options = {};
                    packet.options.compress = !this.flags || false !== this.flags.compress;
                    if ("function" == typeof args[args.length - 1]) {
                        debug("emitting packet with ack id %d", this.ids);
                        this.acks[this.ids] = args.pop();
                        packet.id = this.ids++
                    }
                    if (this.connected) {
                        this.packet(packet)
                    } else {
                        this.sendBuffer.push(packet)
                    }
                    delete this.flags;
                    return this
                };
                Socket.prototype.packet = function(packet) {
                    packet.nsp = this.nsp;
                    this.io.packet(packet)
                };
                Socket.prototype.onopen = function() {
                    debug("transport is open - connecting");
                    if ("/" != this.nsp) {
                        this.packet({
                            type: parser.CONNECT
                        })
                    }
                };
                Socket.prototype.onclose = function(reason) {
                    debug("close (%s)", reason);
                    this.connected = false;
                    this.disconnected = true;
                    delete this.id;
                    this.emit("disconnect", reason)
                };
                Socket.prototype.onpacket = function(packet) {
                    if (packet.nsp != this.nsp) return;
                    switch (packet.type) {
                        case parser.CONNECT:
                            this.onconnect();
                            break;
                        case parser.EVENT:
                            this.onevent(packet);
                            break;
                        case parser.BINARY_EVENT:
                            this.onevent(packet);
                            break;
                        case parser.ACK:
                            this.onack(packet);
                            break;
                        case parser.BINARY_ACK:
                            this.onack(packet);
                            break;
                        case parser.DISCONNECT:
                            this.ondisconnect();
                            break;
                        case parser.ERROR:
                            this.emit("error", packet.data);
                            break
                    }
                };
                Socket.prototype.onevent = function(packet) {
                    var args = packet.data || [];
                    debug("emitting event %j", args);
                    if (null != packet.id) {
                        debug("attaching ack callback to event");
                        args.push(this.ack(packet.id))
                    }
                    if (this.connected) {
                        emit.apply(this, args)
                    } else {
                        this.receiveBuffer.push(args)
                    }
                };
                Socket.prototype.ack = function(id) {
                    var self = this;
                    var sent = false;
                    return function() {
                        if (sent) return;
                        sent = true;
                        var args = toArray(arguments);
                        debug("sending ack %j", args);
                        var type = hasBin(args) ? parser.BINARY_ACK: parser.ACK;
                        self.packet({
                            type: type,
                            id: id,
                            data: args
                        })
                    }
                };
                Socket.prototype.onack = function(packet) {
                    var ack = this.acks[packet.id];
                    if ("function" == typeof ack) {
                        debug("calling ack %s with %j", packet.id, packet.data);
                        ack.apply(this, packet.data);
                        delete this.acks[packet.id]
                    } else {
                        debug("bad ack %s", packet.id)
                    }
                };
                Socket.prototype.onconnect = function() {
                    this.connected = true;
                    this.disconnected = false;
                    this.emit("connect");
                    this.emitBuffered()
                };
                Socket.prototype.emitBuffered = function() {
                    var i;
                    for (i = 0; i < this.receiveBuffer.length; i++) {
                        emit.apply(this, this.receiveBuffer[i])
                    }
                    this.receiveBuffer = [];
                    for (i = 0; i < this.sendBuffer.length; i++) {
                        this.packet(this.sendBuffer[i])
                    }
                    this.sendBuffer = []
                };
                Socket.prototype.ondisconnect = function() {
                    debug("server disconnect (%s)", this.nsp);
                    this.destroy();
                    this.onclose("io server disconnect")
                };
                Socket.prototype.destroy = function() {
                    if (this.subs) {
                        for (var i = 0; i < this.subs.length; i++) {
                            this.subs[i].destroy()
                        }
                        this.subs = null
                    }
                    this.io.destroy(this)
                };
                Socket.prototype.close = Socket.prototype.disconnect = function() {
                    if (this.connected) {
                        debug("performing disconnect (%s)", this.nsp);
                        this.packet({
                            type: parser.DISCONNECT
                        })
                    }
                    this.destroy();
                    if (this.connected) {
                        this.onclose("io client disconnect")
                    }
                    return this
                };
                Socket.prototype.compress = function(compress) {
                    this.flags = this.flags || {};
                    this.flags.compress = compress;
                    return this
                }
            },
                {
                    "./on": 33,
                    "component-bind": 37,
                    "component-emitter": 38,
                    debug: 39,
                    "has-binary": 41,
                    "socket.io-parser": 47,
                    "to-array": 51
                }],
            35 : [function(_dereq_, module, exports) { (function(global) {
                var parseuri = _dereq_("parseuri");
                var debug = _dereq_("debug")("socket.io-client:url");
                module.exports = url;
                function url(uri, loc) {
                    var obj = uri;
                    var loc = loc || global.location;
                    if (null == uri) uri = loc.protocol + "//" + loc.host;
                    if ("string" == typeof uri) {
                        if ("/" == uri.charAt(0)) {
                            if ("/" == uri.charAt(1)) {
                                uri = loc.protocol + uri
                            } else {
                                uri = loc.host + uri
                            }
                        }
                        if (!/^(https?|wss?):\/\//.test(uri)) {
                            debug("protocol-less url %s", uri);
                            if ("undefined" != typeof loc) {
                                uri = loc.protocol + "//" + uri
                            } else {
                                uri = "https://" + uri
                            }
                        }
                        debug("parse %s", uri);
                        obj = parseuri(uri)
                    }
                    if (!obj.port) {
                        if (/^(http|ws)$/.test(obj.protocol)) {
                            obj.port = "80"
                        } else if (/^(http|ws)s$/.test(obj.protocol)) {
                            obj.port = "443"
                        }
                    }
                    obj.path = obj.path || "/";
                    var ipv6 = obj.host.indexOf(":") !== -1;
                    var host = ipv6 ? "[" + obj.host + "]": obj.host;
                    obj.id = obj.protocol + "://" + host + ":" + obj.port;
                    obj.href = obj.protocol + "://" + host + (loc && loc.port == obj.port ? "": ":" + obj.port);
                    return obj
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {
                    debug: 39,
                    parseuri: 45
                }],
            36 : [function(_dereq_, module, exports) {
                module.exports = Backoff;
                function Backoff(opts) {
                    opts = opts || {};
                    this.ms = opts.min || 100;
                    this.max = opts.max || 1e4;
                    this.factor = opts.factor || 2;
                    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter: 0;
                    this.attempts = 0
                }
                Backoff.prototype.duration = function() {
                    var ms = this.ms * Math.pow(this.factor, this.attempts++);
                    if (this.jitter) {
                        var rand = Math.random();
                        var deviation = Math.floor(rand * this.jitter * ms);
                        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation: ms + deviation
                    }
                    return Math.min(ms, this.max) | 0
                };
                Backoff.prototype.reset = function() {
                    this.attempts = 0
                };
                Backoff.prototype.setMin = function(min) {
                    this.ms = min
                };
                Backoff.prototype.setMax = function(max) {
                    this.max = max
                };
                Backoff.prototype.setJitter = function(jitter) {
                    this.jitter = jitter
                }
            },
                {}],
            37 : [function(_dereq_, module, exports) {
                var slice = [].slice;
                module.exports = function(obj, fn) {
                    if ("string" == typeof fn) fn = obj[fn];
                    if ("function" != typeof fn) throw new Error("bind() requires a function");
                    var args = slice.call(arguments, 2);
                    return function() {
                        return fn.apply(obj, args.concat(slice.call(arguments)))
                    }
                }
            },
                {}],
            38 : [function(_dereq_, module, exports) {
                module.exports = Emitter;
                function Emitter(obj) {
                    if (obj) return mixin(obj)
                }
                function mixin(obj) {
                    for (var key in Emitter.prototype) {
                        obj[key] = Emitter.prototype[key]
                    }
                    return obj
                }
                Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
                    this._callbacks = this._callbacks || {}; (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
                    return this
                };
                Emitter.prototype.once = function(event, fn) {
                    function on() {
                        this.off(event, on);
                        fn.apply(this, arguments)
                    }
                    on.fn = fn;
                    this.on(event, on);
                    return this
                };
                Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
                    this._callbacks = this._callbacks || {};
                    if (0 == arguments.length) {
                        this._callbacks = {};
                        return this
                    }
                    var callbacks = this._callbacks["$" + event];
                    if (!callbacks) return this;
                    if (1 == arguments.length) {
                        delete this._callbacks["$" + event];
                        return this
                    }
                    var cb;
                    for (var i = 0; i < callbacks.length; i++) {
                        cb = callbacks[i];
                        if (cb === fn || cb.fn === fn) {
                            callbacks.splice(i, 1);
                            break
                        }
                    }
                    return this
                };
                Emitter.prototype.emit = function(event) {
                    this._callbacks = this._callbacks || {};
                    var args = [].slice.call(arguments, 1),
                        callbacks = this._callbacks["$" + event];
                    if (callbacks) {
                        callbacks = callbacks.slice(0);
                        for (var i = 0,
                                 len = callbacks.length; i < len; ++i) {
                            callbacks[i].apply(this, args)
                        }
                    }
                    return this
                };
                Emitter.prototype.listeners = function(event) {
                    this._callbacks = this._callbacks || {};
                    return this._callbacks["$" + event] || []
                };
                Emitter.prototype.hasListeners = function(event) {
                    return !! this.listeners(event).length
                }
            },
                {}],
            39 : [function(_dereq_, module, exports) {
                arguments[4][17][0].apply(exports, arguments)
            },
                {
                    "./debug": 40,
                    dup: 17
                }],
            40 : [function(_dereq_, module, exports) {
                arguments[4][18][0].apply(exports, arguments)
            },
                {
                    dup: 18,
                    ms: 44
                }],
            41 : [function(_dereq_, module, exports) { (function(global) {
                var isArray = _dereq_("isarray");
                module.exports = hasBinary;
                function hasBinary(data) {
                    function _hasBinary(obj) {
                        if (!obj) return false;
                        if (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                            return true
                        }
                        if (isArray(obj)) {
                            for (var i = 0; i < obj.length; i++) {
                                if (_hasBinary(obj[i])) {
                                    return true
                                }
                            }
                        } else if (obj && "object" == typeof obj) {
                            if (obj.toJSON && "function" == typeof obj.toJSON) {
                                obj = obj.toJSON()
                            }
                            for (var key in obj) {
                                if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
                                    return true
                                }
                            }
                        }
                        return false
                    }
                    return _hasBinary(data)
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {
                    isarray: 43
                }],
            42 : [function(_dereq_, module, exports) {
                arguments[4][23][0].apply(exports, arguments)
            },
                {
                    dup: 23
                }],
            43 : [function(_dereq_, module, exports) {
                arguments[4][24][0].apply(exports, arguments)
            },
                {
                    dup: 24
                }],
            44 : [function(_dereq_, module, exports) {
                arguments[4][25][0].apply(exports, arguments)
            },
                {
                    dup: 25
                }],
            45 : [function(_dereq_, module, exports) {
                arguments[4][28][0].apply(exports, arguments)
            },
                {
                    dup: 28
                }],
            46 : [function(_dereq_, module, exports) { (function(global) {
                var isArray = _dereq_("isarray");
                var isBuf = _dereq_("./is-buffer");
                exports.deconstructPacket = function(packet) {
                    var buffers = [];
                    var packetData = packet.data;
                    function _deconstructPacket(data) {
                        if (!data) return data;
                        if (isBuf(data)) {
                            var placeholder = {
                                _placeholder: true,
                                num: buffers.length
                            };
                            buffers.push(data);
                            return placeholder
                        } else if (isArray(data)) {
                            var newData = new Array(data.length);
                            for (var i = 0; i < data.length; i++) {
                                newData[i] = _deconstructPacket(data[i])
                            }
                            return newData
                        } else if ("object" == typeof data && !(data instanceof Date)) {
                            var newData = {};
                            for (var key in data) {
                                newData[key] = _deconstructPacket(data[key])
                            }
                            return newData
                        }
                        return data
                    }
                    var pack = packet;
                    pack.data = _deconstructPacket(packetData);
                    pack.attachments = buffers.length;
                    return {
                        packet: pack,
                        buffers: buffers
                    }
                };
                exports.reconstructPacket = function(packet, buffers) {
                    var curPlaceHolder = 0;
                    function _reconstructPacket(data) {
                        if (data && data._placeholder) {
                            var buf = buffers[data.num];
                            return buf
                        } else if (isArray(data)) {
                            for (var i = 0; i < data.length; i++) {
                                data[i] = _reconstructPacket(data[i])
                            }
                            return data
                        } else if (data && "object" == typeof data) {
                            for (var key in data) {
                                data[key] = _reconstructPacket(data[key])
                            }
                            return data
                        }
                        return data
                    }
                    packet.data = _reconstructPacket(packet.data);
                    packet.attachments = undefined;
                    return packet
                };
                exports.removeBlobs = function(data, callback) {
                    function _removeBlobs(obj, curKey, containingObject) {
                        if (!obj) return obj;
                        if (global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                            pendingBlobs++;
                            var fileReader = new FileReader;
                            fileReader.onload = function() {
                                if (containingObject) {
                                    containingObject[curKey] = this.result
                                } else {
                                    bloblessData = this.result
                                }
                                if (!--pendingBlobs) {
                                    callback(bloblessData)
                                }
                            };
                            fileReader.readAsArrayBuffer(obj)
                        } else if (isArray(obj)) {
                            for (var i = 0; i < obj.length; i++) {
                                _removeBlobs(obj[i], i, obj)
                            }
                        } else if (obj && "object" == typeof obj && !isBuf(obj)) {
                            for (var key in obj) {
                                _removeBlobs(obj[key], key, obj)
                            }
                        }
                    }
                    var pendingBlobs = 0;
                    var bloblessData = data;
                    _removeBlobs(bloblessData);
                    if (!pendingBlobs) {
                        callback(bloblessData)
                    }
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {
                    "./is-buffer": 48,
                    isarray: 43
                }],
            47 : [function(_dereq_, module, exports) {
                var debug = _dereq_("debug")("socket.io-parser");
                var json = _dereq_("json3");
                var isArray = _dereq_("isarray");
                var Emitter = _dereq_("component-emitter");
                var binary = _dereq_("./binary");
                var isBuf = _dereq_("./is-buffer");
                exports.protocol = 4;
                exports.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"];
                exports.CONNECT = 0;
                exports.DISCONNECT = 1;
                exports.EVENT = 2;
                exports.ACK = 3;
                exports.ERROR = 4;
                exports.BINARY_EVENT = 5;
                exports.BINARY_ACK = 6;
                exports.Encoder = Encoder;
                exports.Decoder = Decoder;
                function Encoder() {}
                Encoder.prototype.encode = function(obj, callback) {
                    debug("encoding packet %j", obj);
                    if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
                        encodeAsBinary(obj, callback)
                    } else {
                        var encoding = encodeAsString(obj);
                        callback([encoding])
                    }
                };
                function encodeAsString(obj) {
                    var str = "";
                    var nsp = false;
                    str += obj.type;
                    if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
                        str += obj.attachments;
                        str += "-"
                    }
                    if (obj.nsp && "/" != obj.nsp) {
                        nsp = true;
                        str += obj.nsp
                    }
                    if (null != obj.id) {
                        if (nsp) {
                            str += ",";
                            nsp = false
                        }
                        str += obj.id
                    }
                    if (null != obj.data) {
                        if (nsp) str += ",";
                        str += json.stringify(obj.data)
                    }
                    debug("encoded %j as %s", obj, str);
                    return str
                }
                function encodeAsBinary(obj, callback) {
                    function writeEncoding(bloblessData) {
                        var deconstruction = binary.deconstructPacket(bloblessData);
                        var pack = encodeAsString(deconstruction.packet);
                        var buffers = deconstruction.buffers;
                        buffers.unshift(pack);
                        callback(buffers)
                    }
                    binary.removeBlobs(obj, writeEncoding)
                }
                function Decoder() {
                    this.reconstructor = null
                }
                Emitter(Decoder.prototype);
                Decoder.prototype.add = function(obj) {
                    var packet;
                    if ("string" == typeof obj) {
                        packet = decodeString(obj);
                        if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) {
                            this.reconstructor = new BinaryReconstructor(packet);
                            if (this.reconstructor.reconPack.attachments === 0) {
                                this.emit("decoded", packet)
                            }
                        } else {
                            this.emit("decoded", packet)
                        }
                    } else if (isBuf(obj) || obj.base64) {
                        if (!this.reconstructor) {
                            throw new Error("got binary data when not reconstructing a packet")
                        } else {
                            packet = this.reconstructor.takeBinaryData(obj);
                            if (packet) {
                                this.reconstructor = null;
                                this.emit("decoded", packet)
                            }
                        }
                    } else {
                        throw new Error("Unknown type: " + obj)
                    }
                };
                function decodeString(str) {
                    var p = {};
                    var i = 0;
                    p.type = Number(str.charAt(0));
                    if (null == exports.types[p.type]) return error();
                    if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
                        var buf = "";
                        while (str.charAt(++i) != "-") {
                            buf += str.charAt(i);
                            if (i == str.length) break
                        }
                        if (buf != Number(buf) || str.charAt(i) != "-") {
                            throw new Error("Illegal attachments")
                        }
                        p.attachments = Number(buf)
                    }
                    if ("/" == str.charAt(i + 1)) {
                        p.nsp = "";
                        while (++i) {
                            var c = str.charAt(i);
                            if ("," == c) break;
                            p.nsp += c;
                            if (i == str.length) break
                        }
                    } else {
                        p.nsp = "/"
                    }
                    var next = str.charAt(i + 1);
                    if ("" !== next && Number(next) == next) {
                        p.id = "";
                        while (++i) {
                            var c = str.charAt(i);
                            if (null == c || Number(c) != c) {--i;
                                break
                            }
                            p.id += str.charAt(i);
                            if (i == str.length) break
                        }
                        p.id = Number(p.id)
                    }
                    if (str.charAt(++i)) {
                        try {
                            p.data = json.parse(str.substr(i))
                        } catch(e) {
                            return error()
                        }
                    }
                    debug("decoded %s as %j", str, p);
                    return p
                }
                Decoder.prototype.destroy = function() {
                    if (this.reconstructor) {
                        this.reconstructor.finishedReconstruction()
                    }
                };
                function BinaryReconstructor(packet) {
                    this.reconPack = packet;
                    this.buffers = []
                }
                BinaryReconstructor.prototype.takeBinaryData = function(binData) {
                    this.buffers.push(binData);
                    if (this.buffers.length == this.reconPack.attachments) {
                        var packet = binary.reconstructPacket(this.reconPack, this.buffers);
                        this.finishedReconstruction();
                        return packet
                    }
                    return null
                };
                BinaryReconstructor.prototype.finishedReconstruction = function() {
                    this.reconPack = null;
                    this.buffers = []
                };
                function error(data) {
                    return {
                        type: exports.ERROR,
                        data: "parser error"
                    }
                }
            },
                {
                    "./binary": 46,
                    "./is-buffer": 48,
                    "component-emitter": 49,
                    debug: 39,
                    isarray: 43,
                    json3: 50
                }],
            48 : [function(_dereq_, module, exports) { (function(global) {
                module.exports = isBuf;
                function isBuf(obj) {
                    return global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer
                }
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {}],
            49 : [function(_dereq_, module, exports) {
                arguments[4][15][0].apply(exports, arguments)
            },
                {
                    dup: 15
                }],
            50 : [function(_dereq_, module, exports) { (function(global) { (function() {
                var isLoader = typeof define === "function" && define.amd;
                var objectTypes = {
                    "function": true,
                    object: true
                };
                var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
                var root = objectTypes[typeof window] && window || this,
                    freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;
                if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
                    root = freeGlobal
                }
                function runInContext(context, exports) {
                    context || (context = root["Object"]());
                    exports || (exports = root["Object"]());
                    var Number = context["Number"] || root["Number"],
                        String = context["String"] || root["String"],
                        Object = context["Object"] || root["Object"],
                        Date = context["Date"] || root["Date"],
                        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
                        TypeError = context["TypeError"] || root["TypeError"],
                        Math = context["Math"] || root["Math"],
                        nativeJSON = context["JSON"] || root["JSON"];
                    if (typeof nativeJSON == "object" && nativeJSON) {
                        exports.stringify = nativeJSON.stringify;
                        exports.parse = nativeJSON.parse
                    }
                    var objectProto = Object.prototype,
                        getClass = objectProto.toString,
                        isProperty, forEach, undef;
                    var isExtended = new Date( - 0xc782b5b800cec);
                    try {
                        isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708
                    } catch(exception) {}
                    function has(name) {
                        if (has[name] !== undef) {
                            return has[name]
                        }
                        var isSupported;
                        if (name == "bug-string-char-index") {
                            isSupported = "a" [0] != "a"
                        } else if (name == "json") {
                            isSupported = has("json-stringify") && has("json-parse")
                        } else {
                            var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                            if (name == "json-stringify") {
                                var stringify = exports.stringify,
                                    stringifySupported = typeof stringify == "function" && isExtended;
                                if (stringifySupported) { (value = function() {
                                    return 1
                                }).toJSON = value;
                                    try {
                                        stringifySupported = stringify(0) === "0" && stringify(new Number) === "0" && stringify(new String) == '""' && stringify(getClass) === undef && stringify(undef) === undef && stringify() === undef && stringify(value) === "1" && stringify([value]) == "[1]" && stringify([undef]) == "[null]" && stringify(null) == "null" && stringify([undef, getClass, null]) == "[null,null,null]" && stringify({
                                                a: [value, true, false, null, "\x00\b\n\f\r	"]
                                            }) == serialized && stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" && stringify(new Date( - 864e13)) == '"-271821-04-20T00:00:00.000Z"' && stringify(new Date(864e13)) == '"+275760-09-13T00:00:00.000Z"' && stringify(new Date( - 621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && stringify(new Date( - 1)) == '"1969-12-31T23:59:59.999Z"'
                                    } catch(exception) {
                                        stringifySupported = false
                                    }
                                }
                                isSupported = stringifySupported
                            }
                            if (name == "json-parse") {
                                var parse = exports.parse;
                                if (typeof parse == "function") {
                                    try {
                                        if (parse("0") === 0 && !parse(false)) {
                                            value = parse(serialized);
                                            var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                                            if (parseSupported) {
                                                try {
                                                    parseSupported = !parse('"	"')
                                                } catch(exception) {}
                                                if (parseSupported) {
                                                    try {
                                                        parseSupported = parse("01") !== 1
                                                    } catch(exception) {}
                                                }
                                                if (parseSupported) {
                                                    try {
                                                        parseSupported = parse("1.") !== 1
                                                    } catch(exception) {}
                                                }
                                            }
                                        }
                                    } catch(exception) {
                                        parseSupported = false
                                    }
                                }
                                isSupported = parseSupported
                            }
                        }
                        return has[name] = !!isSupported
                    }
                    if (!has("json")) {
                        var functionClass = "[object Function]",
                            dateClass = "[object Date]",
                            numberClass = "[object Number]",
                            stringClass = "[object String]",
                            arrayClass = "[object Array]",
                            booleanClass = "[object Boolean]";
                        var charIndexBuggy = has("bug-string-char-index");
                        if (!isExtended) {
                            var floor = Math.floor;
                            var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
                            var getDay = function(year, month) {
                                return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400)
                            }
                        }
                        if (! (isProperty = objectProto.hasOwnProperty)) {
                            isProperty = function(property) {
                                var members = {},
                                    constructor;
                                if ((members.__proto__ = null, members.__proto__ = {
                                        toString: 1
                                    },
                                        members).toString != getClass) {
                                    isProperty = function(property) {
                                        var original = this.__proto__,
                                            result = property in (this.__proto__ = null, this);
                                        this.__proto__ = original;
                                        return result
                                    }
                                } else {
                                    constructor = members.constructor;
                                    isProperty = function(property) {
                                        var parent = (this.constructor || constructor).prototype;
                                        return property in this && !(property in parent && this[property] === parent[property])
                                    }
                                }
                                members = null;
                                return isProperty.call(this, property)
                            }
                        }
                        forEach = function(object, callback) {
                            var size = 0,
                                Properties, members, property; (Properties = function() {
                                this.valueOf = 0
                            }).prototype.valueOf = 0;
                            members = new Properties;
                            for (property in members) {
                                if (isProperty.call(members, property)) {
                                    size++
                                }
                            }
                            Properties = members = null;
                            if (!size) {
                                members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
                                forEach = function(object, callback) {
                                    var isFunction = getClass.call(object) == functionClass,
                                        property,
                                        length;
                                    var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
                                    for (property in object) {
                                        if (! (isFunction && property == "prototype") && hasProperty.call(object, property)) {
                                            callback(property)
                                        }
                                    }
                                    for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
                                }
                            } else if (size == 2) {
                                forEach = function(object, callback) {
                                    var members = {},
                                        isFunction = getClass.call(object) == functionClass,
                                        property;
                                    for (property in object) {
                                        if (! (isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                                            callback(property)
                                        }
                                    }
                                }
                            } else {
                                forEach = function(object, callback) {
                                    var isFunction = getClass.call(object) == functionClass,
                                        property,
                                        isConstructor;
                                    for (property in object) {
                                        if (! (isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                                            callback(property)
                                        }
                                    }
                                    if (isConstructor || isProperty.call(object, property = "constructor")) {
                                        callback(property)
                                    }
                                }
                            }
                            return forEach(object, callback)
                        };
                        if (!has("json-stringify")) {
                            var Escapes = {
                                92 : "\\\\",
                                34 : '\\"',
                                8 : "\\b",
                                12 : "\\f",
                                10 : "\\n",
                                13 : "\\r",
                                9 : "\\t"
                            };
                            var leadingZeroes = "000000";
                            var toPaddedString = function(width, value) {
                                return (leadingZeroes + (value || 0)).slice( - width)
                            };
                            var unicodePrefix = "\\u00";
                            var quote = function(value) {
                                var result = '"',
                                    index = 0,
                                    length = value.length,
                                    useCharIndex = !charIndexBuggy || length > 10;
                                var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
                                for (; index < length; index++) {
                                    var charCode = value.charCodeAt(index);
                                    switch (charCode) {
                                        case 8:
                                        case 9:
                                        case 10:
                                        case 12:
                                        case 13:
                                        case 34:
                                        case 92:
                                            result += Escapes[charCode];
                                            break;
                                        default:
                                            if (charCode < 32) {
                                                result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                                                break
                                            }
                                            result += useCharIndex ? symbols[index] : value.charAt(index)
                                    }
                                }
                                return result + '"'
                            };
                            var serialize = function(property, object, callback, properties, whitespace, indentation, stack) {
                                var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
                                try {
                                    value = object[property]
                                } catch(exception) {}
                                if (typeof value == "object" && value) {
                                    className = getClass.call(value);
                                    if (className == dateClass && !isProperty.call(value, "toJSON")) {
                                        if (value > -1 / 0 && value < 1 / 0) {
                                            if (getDay) {
                                                date = floor(value / 864e5);
                                                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                                                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                                                date = 1 + date - getDay(year, month);
                                                time = (value % 864e5 + 864e5) % 864e5;
                                                hours = floor(time / 36e5) % 24;
                                                minutes = floor(time / 6e4) % 60;
                                                seconds = floor(time / 1e3) % 60;
                                                milliseconds = time % 1e3
                                            } else {
                                                year = value.getUTCFullYear();
                                                month = value.getUTCMonth();
                                                date = value.getUTCDate();
                                                hours = value.getUTCHours();
                                                minutes = value.getUTCMinutes();
                                                seconds = value.getUTCSeconds();
                                                milliseconds = value.getUTCMilliseconds()
                                            }
                                            value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-": "+") + toPaddedString(6, year < 0 ? -year: year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + "." + toPaddedString(3, milliseconds) + "Z"
                                        } else {
                                            value = null
                                        }
                                    } else if (typeof value.toJSON == "function" && (className != numberClass && className != stringClass && className != arrayClass || isProperty.call(value, "toJSON"))) {
                                        value = value.toJSON(property)
                                    }
                                }
                                if (callback) {
                                    value = callback.call(object, property, value)
                                }
                                if (value === null) {
                                    return "null"
                                }
                                className = getClass.call(value);
                                if (className == booleanClass) {
                                    return "" + value
                                } else if (className == numberClass) {
                                    return value > -1 / 0 && value < 1 / 0 ? "" + value: "null"
                                } else if (className == stringClass) {
                                    return quote("" + value)
                                }
                                if (typeof value == "object") {
                                    for (length = stack.length; length--;) {
                                        if (stack[length] === value) {
                                            throw TypeError()
                                        }
                                    }
                                    stack.push(value);
                                    results = [];
                                    prefix = indentation;
                                    indentation += whitespace;
                                    if (className == arrayClass) {
                                        for (index = 0, length = value.length; index < length; index++) {
                                            element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                                            results.push(element === undef ? "null": element)
                                        }
                                        result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]": "[" + results.join(",") + "]": "[]"
                                    } else {
                                        forEach(properties || value,
                                            function(property) {
                                                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                                                if (element !== undef) {
                                                    results.push(quote(property) + ":" + (whitespace ? " ": "") + element)
                                                }
                                            });
                                        result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}": "{" + results.join(",") + "}": "{}"
                                    }
                                    stack.pop();
                                    return result
                                }
                            };
                            exports.stringify = function(source, filter, width) {
                                var whitespace, callback, properties, className;
                                if (objectTypes[typeof filter] && filter) {
                                    if ((className = getClass.call(filter)) == functionClass) {
                                        callback = filter
                                    } else if (className == arrayClass) {
                                        properties = {};
                                        for (var index = 0,
                                                 length = filter.length,
                                                 value; index < length; value = filter[index++], (className = getClass.call(value), className == stringClass || className == numberClass) && (properties[value] = 1));
                                    }
                                }
                                if (width) {
                                    if ((className = getClass.call(width)) == numberClass) {
                                        if ((width -= width % 1) > 0) {
                                            for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
                                        }
                                    } else if (className == stringClass) {
                                        whitespace = width.length <= 10 ? width: width.slice(0, 10)
                                    }
                                }
                                return serialize("", (value = {},
                                    value[""] = source, value), callback, properties, whitespace, "", [])
                            }
                        }
                        if (!has("json-parse")) {
                            var fromCharCode = String.fromCharCode;
                            var Unescapes = {
                                92 : "\\",
                                34 : '"',
                                47 : "/",
                                98 : "\b",
                                116 : "	",
                                110 : "\n",
                                102 : "\f",
                                114 : "\r"
                            };
                            var Index, Source;
                            var abort = function() {
                                Index = Source = null;
                                throw SyntaxError()
                            };
                            var lex = function() {
                                var source = Source,
                                    length = source.length,
                                    value, begin, position, isSigned, charCode;
                                while (Index < length) {
                                    charCode = source.charCodeAt(Index);
                                    switch (charCode) {
                                        case 9:
                                        case 10:
                                        case 13:
                                        case 32:
                                            Index++;
                                            break;
                                        case 123:
                                        case 125:
                                        case 91:
                                        case 93:
                                        case 58:
                                        case 44:
                                            value = charIndexBuggy ? source.charAt(Index) : source[Index];
                                            Index++;
                                            return value;
                                        case 34:
                                            for (value = "@", Index++; Index < length;) {
                                                charCode = source.charCodeAt(Index);
                                                if (charCode < 32) {
                                                    abort()
                                                } else if (charCode == 92) {
                                                    charCode = source.charCodeAt(++Index);
                                                    switch (charCode) {
                                                        case 92:
                                                        case 34:
                                                        case 47:
                                                        case 98:
                                                        case 116:
                                                        case 110:
                                                        case 102:
                                                        case 114:
                                                            value += Unescapes[charCode];
                                                            Index++;
                                                            break;
                                                        case 117:
                                                            begin = ++Index;
                                                            for (position = Index + 4; Index < position; Index++) {
                                                                charCode = source.charCodeAt(Index);
                                                                if (! (charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                                                                    abort()
                                                                }
                                                            }
                                                            value += fromCharCode("0x" + source.slice(begin, Index));
                                                            break;
                                                        default:
                                                            abort()
                                                    }
                                                } else {
                                                    if (charCode == 34) {
                                                        break
                                                    }
                                                    charCode = source.charCodeAt(Index);
                                                    begin = Index;
                                                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                                                        charCode = source.charCodeAt(++Index)
                                                    }
                                                    value += source.slice(begin, Index)
                                                }
                                            }
                                            if (source.charCodeAt(Index) == 34) {
                                                Index++;
                                                return value
                                            }
                                            abort();
                                        default:
                                            begin = Index;
                                            if (charCode == 45) {
                                                isSigned = true;
                                                charCode = source.charCodeAt(++Index)
                                            }
                                            if (charCode >= 48 && charCode <= 57) {
                                                if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                                                    abort()
                                                }
                                                isSigned = false;
                                                for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++);
                                                if (source.charCodeAt(Index) == 46) {
                                                    position = ++Index;
                                                    for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++);
                                                    if (position == Index) {
                                                        abort()
                                                    }
                                                    Index = position
                                                }
                                                charCode = source.charCodeAt(Index);
                                                if (charCode == 101 || charCode == 69) {
                                                    charCode = source.charCodeAt(++Index);
                                                    if (charCode == 43 || charCode == 45) {
                                                        Index++
                                                    }
                                                    for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++);
                                                    if (position == Index) {
                                                        abort()
                                                    }
                                                    Index = position
                                                }
                                                return + source.slice(begin, Index)
                                            }
                                            if (isSigned) {
                                                abort()
                                            }
                                            if (source.slice(Index, Index + 4) == "true") {
                                                Index += 4;
                                                return true
                                            } else if (source.slice(Index, Index + 5) == "false") {
                                                Index += 5;
                                                return false
                                            } else if (source.slice(Index, Index + 4) == "null") {
                                                Index += 4;
                                                return null
                                            }
                                            abort()
                                    }
                                }
                                return "$"
                            };
                            var get = function(value) {
                                var results, hasMembers;
                                if (value == "$") {
                                    abort()
                                }
                                if (typeof value == "string") {
                                    if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                                        return value.slice(1)
                                    }
                                    if (value == "[") {
                                        results = [];
                                        for (;; hasMembers || (hasMembers = true)) {
                                            value = lex();
                                            if (value == "]") {
                                                break
                                            }
                                            if (hasMembers) {
                                                if (value == ",") {
                                                    value = lex();
                                                    if (value == "]") {
                                                        abort()
                                                    }
                                                } else {
                                                    abort()
                                                }
                                            }
                                            if (value == ",") {
                                                abort()
                                            }
                                            results.push(get(value))
                                        }
                                        return results
                                    } else if (value == "{") {
                                        results = {};
                                        for (;; hasMembers || (hasMembers = true)) {
                                            value = lex();
                                            if (value == "}") {
                                                break
                                            }
                                            if (hasMembers) {
                                                if (value == ",") {
                                                    value = lex();
                                                    if (value == "}") {
                                                        abort()
                                                    }
                                                } else {
                                                    abort()
                                                }
                                            }
                                            if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                                                abort()
                                            }
                                            results[value.slice(1)] = get(lex())
                                        }
                                        return results
                                    }
                                    abort()
                                }
                                return value
                            };
                            var update = function(source, property, callback) {
                                var element = walk(source, property, callback);
                                if (element === undef) {
                                    delete source[property]
                                } else {
                                    source[property] = element
                                }
                            };
                            var walk = function(source, property, callback) {
                                var value = source[property],
                                    length;
                                if (typeof value == "object" && value) {
                                    if (getClass.call(value) == arrayClass) {
                                        for (length = value.length; length--;) {
                                            update(value, length, callback)
                                        }
                                    } else {
                                        forEach(value,
                                            function(property) {
                                                update(value, property, callback)
                                            })
                                    }
                                }
                                return callback.call(source, property, value)
                            };
                            exports.parse = function(source, callback) {
                                var result, value;
                                Index = 0;
                                Source = "" + source;
                                result = get(lex());
                                if (lex() != "$") {
                                    abort()
                                }
                                Index = Source = null;
                                return callback && getClass.call(callback) == functionClass ? walk((value = {},
                                    value[""] = result, value), "", callback) : result
                            }
                        }
                    }
                    exports["runInContext"] = runInContext;
                    return exports
                }
                if (freeExports && !isLoader) {
                    runInContext(root, freeExports)
                } else {
                    var nativeJSON = root.JSON,
                        previousJSON = root["JSON3"],
                        isRestored = false;
                    var JSON3 = runInContext(root, root["JSON3"] = {
                        noConflict: function() {
                            if (!isRestored) {
                                isRestored = true;
                                root.JSON = nativeJSON;
                                root["JSON3"] = previousJSON;
                                nativeJSON = previousJSON = null
                            }
                            return JSON3
                        }
                    });
                    root.JSON = {
                        parse: JSON3.parse,
                        stringify: JSON3.stringify
                    }
                }
                if (isLoader) {
                    define(function() {
                        return JSON3
                    })
                }
            }).call(this)
            }).call(this, typeof self !== "undefined" ? self: typeof window !== "undefined" ? window: typeof global !== "undefined" ? global: {})
            },
                {}],
            51 : [function(_dereq_, module, exports) {
                module.exports = toArray;
                function toArray(list, index) {
                    var array = [];
                    index = index || 0;
                    for (var i = index || 0; i < list.length; i++) {
                        array[i - index] = list[i]
                    }
                    return array
                }
            },
                {}]
        },
        {},
        [31])(31)
});
    return window.io;
})(Gotye);

//--------------module:live.base-------------
var Tool = {
    compress: function(b, g, e, a) {
        var d = "image/jpeg";
        if (a != undefined && a == "png") {
            d = "image/png"
        }
        var c = document.createElement("canvas");
        var f = 1;
        if (b.naturalWidth > b.naturalHeight) {
            f = g / b.naturalWidth
        } else {
            f = g / b.naturalHeight
        }
        c.width = b.naturalWidth * f;
        c.height = b.naturalHeight * f;
        var h = c.getContext("2d");
        h.drawImage(b, 0, 0, c.width, c.height);
        var i = c.toDataURL(d, e || 0.5);
        return i
    },
    each: function(f, e, d) {
        if (f.length === void + 0) {
            for (var c in f) {
                if (f.hasOwnProperty(c)) {
                    e.call(d, f[c], c, f)
                }
            }
            return f
        }
        for (var b = 0,
                 a = f.length; b < a; b++) {
            e.call(d, f[b], b, f)
        }
        return f
    },
    parseJSON: function(a) {
        if (typeof a != "string") {
            return a = a.replace(/^\s+|\s+$/g, "")
        }
        var b = /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""));
        if (!b) {
            this.error("Invalid JSON -- " + new Date() + "--- " + a);
            return null
        }
        var c = window.JSON;
        return c && c.parse ? c.parse(a) : (new Function("return " + a))()
    },
    isArray: function(a) {
        return this.type(a) == "array"
    },
    isFun: function(a) {
        return this.type(a) == "function"
    },
    isStr: function(a) {
        return this.type(a) == "string"
    },
    type: (function() {
        var b = {},
            e = "Boolean Number String Function Array Date RegExp Null Undefined".split(" ");
        for (var c = 0,
                 a = e.length; c < a; c++) {
            b["[object " + e[c] + "]"] = e[c].toLowerCase()
        }
        return function d(f) {
            return b[Object.prototype.toString.call(f)] || "object"
        }
    })(),
    isObj: function(a) {
        return this.type(a) == "object"
    },
    jsonToParam: function(b) {
        var c = "";
        for (var a in b) {
            c += "&" + a + "=" + b[a]
        }
        if (c.length) {
            c = c.substr(1)
        }
        return c
    },
    stringify: function(a) {
        var b = window.JSON;
        if (b) {
            return b.stringify(a)
        }
        return Tool.jsonToParam(a)
    },
    log: function(a) {
        this.info(a)
    },
    info: function(a) {
        if (window.console && window.console.info && 1 == Tool.getUrlParam("show_log")) {
            window.console.info(a)
        }
    },
    error: function(a) {
        if (window.console && window.console.error) {
            window.console.error(a)
        }
    },
    toHttp: function(a) {
        if ( !! a) {
            return a.replace("https", "http")
        }
    },
    getUrlParam: function(a) {
        var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i");
        var c = window.location.search.substr(1).match(b);
        if (c != null) {
            return unescape(c[2])
        }
        return null
    },
    setCookie: function(a, b, c) {
        var d = new Date();
        c = c || 60000;
        d.setTime(d.getTime() + c);
        document.cookie = a + "=" + escape(b) + ";expires=" + d.toGMTString()
    },
    getCookie: function(b) {
        var a, c = new RegExp("(^| )" + b + "=([^;]*)(;|$)");
        if (a = document.cookie.match(c)) {
            return (a[2])
        } else {
            return null
        }
    },
    setNickname: function(a, b, c) {
        var d = new Date();
        c = c || 8*60*60000;
        d.setTime(d.getTime() + c);
        document.cookie = a + "=" + encodeURIComponent(b) + ";expires=" + d.toGMTString()
    },
    getNickname: function(name) {
        var reg = new RegExp(["(?:^| )", name, "=([^;]*)"].join(""),"i"),
            arr = document.cookie.match(reg);
        return arr ? decodeURIComponent(arr[1]) : null;
    },
    resizeIMG: function(d, a, l, m) {
        var g = d;
        var k = g.width,
            e = g.height,
            c = k / e;
        k = a || k;
        e = k / c;
        var b = document.createElement("canvas");
        var n = b.getContext("2d");
        $(b).attr({
            width: k,
            height: e
        });
        n.drawImage(g, 0, 0, k, e);
        var f = b.toDataURL("image/jpeg", l || 0.8);
        var j;
        if (navigator.userAgent.match(/iphone/i)) {
            j = new MegaPixImage(d);
            j.render(b, {
                maxWidth: k,
                maxHeight: e,
                quality: l || 0.8
            });
            f = b.toDataURL("image/jpeg", l || 0.8)
        }
        var i;
        if (navigator.userAgent.match(/Android/i)) {
            i = new JPEGEncoder();
            f = i.encode(n.getImageData(0, 0, k, e), l * 100 || 80)
        }
        while (m && m > 0 && f.length > m) {
            l = l - 0.2;
            f = b.toDataURL("image/jpeg", l || 0.8);
            if (navigator.userAgent.match(/iphone/i)) {
                j = new MegaPixImage(d);
                j.render(b, {
                    maxWidth: k,
                    maxHeight: e,
                    quality: l || 0.8
                });
                f = b.toDataURL("image/jpeg", l || 0.8)
            }
            if (navigator.userAgent.match(/Android/i)) {
                i = new JPEGEncoder();
                f = i.encode(n.getImageData(0, 0, k, e), l * 100 || 80)
            }
        }
        var o = {
            base64: f,
            clearBase64: f.substr(f.indexOf(",") + 1)
        };
        return o
    }
};
var Ajax = function() {
    function a() {}
    function c(f) {
        Tool.log("requset failure: status" + f)
    }
    function b(l, h, j) {
        var k = h.async !== false,
            f = h.method || "POST",
            m = h.data || null,
            p = h.success || a,
            i = h.failure || c,
            n = h.header || {},
            f = f.toUpperCase();
        j = j || {
                req_times: 1,
                is_ret: false
            };
        if (j.req_times > 3) {
            i(408);
            return
        }
        var g = l;
        if (f == "GET" && m) {
            g += (l.indexOf("?") == -1 ? "?": "&") + m
        }
        var q = new XMLHttpRequest();
        if ("withCredentials" in q) {
            q.open(f, g, k);
            if (f == "POST") {
                q.setRequestHeader("Content-type", "application/json;")
            }
            for (var o in n) {
                q.setRequestHeader(o, n[o])
            }
            if ( !! m) {
                m = Tool.stringify(m)
            }
            q.onreadystatechange = function() {
                if (q.readyState == 4) {
                    if (j.is_ret) {
                        return
                    }
                    j.is_ret = true;
                    var r = q.status;
                    if (r == 200 || r == 304) {
                        p(Tool.parseJSON(q.responseText))
                    } else {
                        i(q.status);
                        Tool.log("onerror :" + q.status)
                    }
                }
            };
            if (f == "POST") {
                q.setRequestHeader("Content-type", "application/json;")
            }
        } else {
            if (typeof XDomainRequest != "undefined") {
                q = new XDomainRequest();
                if (f == "POST") {
                    m = m || {};
                    for (var o in n) {
                        if (Tool.isStr(n[o])) {
                            m[o] = n[o]
                        }
                    }
                } else {
                    if ( !! n) {
                        g += (g.indexOf("?") == -1 ? "?": "&") + Tool.jsonToParam(n)
                    }
                }
                if ( !! m) {
                    m = Tool.jsonToParam(m)
                }
                q.open(f, g);
                q.onload = function(r) {
                    if (j.is_ret) {
                        return
                    }
                    j.is_ret = true;
                    p(Tool.parseJSON(q.responseText))
                };
                q.onerror = function() {
                    if (j.is_ret) {
                        return
                    }
                    j.is_ret = true;
                    Tool.log("onerror :" + q.status);
                    i(q.status)
                }
            } else {
                Tool.log("The browser does not support");
                return
            }
        }
        q.timeout = 5000;
        q.send(m);
        j.req_times += 1;
        setTimeout(function() {
                if (!j.is_ret) {
                    Tool.info("the request [" + l + "]  is pending ,try again");
                    if (q.abort) {
                        q.abort()
                    }
                    return b(l, h, j)
                }
            },
            5500);
        return q
    }
    function e(g, h) {
        var m = h.success || a;
        var i = h.failure || c;
        if (!window.FormData) {
            Tool.error("浏览器不支持");
            i(301, "浏览器不支持");
            return
        }
        var k = new FormData();
        if (h.data) {
            for (var l in h.data) {
                k.append(l, h.data[l])
            }
        }
        var f = document.getElementById(h.fileId);
        var j = f.files[0];
        k.append("file", j);
        var n = new XMLHttpRequest();
        n.open("POST", g);
        if (h.header) {
            for (var l in h.header) {
                n.setRequestHeader(l, h.header[l])
            }
        }
        n.send(k);
        n.onreadystatechange = function() {
            if (n.readyState == 4) {
                var o = n.status;
                if (o == 200 || o == 304) {
                    m(Tool.parseJSON(n.responseText))
                } else {
                    i(n.status)
                }
            }
        }
    }
    function d(g, i) {
        var l = i.success || a;
        var f = i.failure || c;
        if (!window.FormData) {
            Tool.error("浏览器不支持");
            f(301, "浏览器不支持");
            return
        }
        var k = new FormData();
        if (i.data) {
            for (var h in i.data) {
                k.append(h, i.data[h])
            }
        }
        if (i.files) {
            for (var h in i.files) {
                k.append(h, i.files[h])
            }
        }
        var j = new XMLHttpRequest();
        j.open("POST", g);
        if (i.header) {
            for (var h in i.header) {
                j.setRequestHeader(h, i.header[h])
            }
        }
        j.send(k);
        j.onreadystatechange = function() {
            if (j.readyState == 4) {
                var m = j.status;
                if (m == 200 || m == 304) {
                    l(Tool.parseJSON(j.responseText))
                } else {
                    f(j.status)
                }
            }
        }
    }
    return {
        request: b,
        sendFile: e,
        sendMultiFile: d
    }
} ();
Date.prototype.format = function(b) {
    var c = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    if (/(y+)/.test(b)) {
        b = b.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var a in c) {
        if (new RegExp("(" + a + ")").test(b)) {
            b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[a] : ("00" + c[a]).substr(("" + c[a]).length))
        }
    }
    return b
};

//--------------module:live.code-------------
if (!window.Gotye) {
    var Gotye = {}
}
Gotye.Code = {
    SUCCESS: 200,
    FAIL: 300,
    INVALID_TOKEN: 401,
    INVALID_TOKEN_ROLE: 403,
    REQUEST_TIMEOUT: 408,
    SYS_EXCEPTION: 500,
    NO_OPER_PERMISSION: 1001,
    DISABLE_SPEAK: 1003,
    CONENT_IS_NULL: 1005,
    INVAILD_TARGET_ID: 1007,
    HAS_BEEN_KILLED: 1009,
    USER_HAS_LOGIN: 1011,
    OVER_MAX_USER_LIMIT: 1013
};

//--------------module:base64-------------
(function(f) {
    var k = f.Base64;
    var e = "2.1.9";
    var s;
    if (typeof module !== "undefined" && module.exports) {
        try {
            s = require("buffer").Buffer
        } catch(h) {}
    }
    var q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var c = function(C) {
        var B = {};
        for (var A = 0,
                 z = C.length; A < z; A++) {
            B[C.charAt(A)] = A
        }
        return B
    } (q);
    var v = String.fromCharCode;
    var x = function(A) {
        if (A.length < 2) {
            var z = A.charCodeAt(0);
            return z < 128 ? A: z < 2048 ? (v(192 | (z >>> 6)) + v(128 | (z & 63))) : (v(224 | ((z >>> 12) & 15)) + v(128 | ((z >>> 6) & 63)) + v(128 | (z & 63)))
        } else {
            var z = 65536 + (A.charCodeAt(0) - 55296) * 1024 + (A.charCodeAt(1) - 56320);
            return (v(240 | ((z >>> 18) & 7)) + v(128 | ((z >>> 12) & 63)) + v(128 | ((z >>> 6) & 63)) + v(128 | (z & 63)))
        }
    };
    var l = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var i = function(z) {
        return z.replace(l, x)
    };
    var r = function(C) {
        var B = [0, 2, 1][C.length % 3],
            z = C.charCodeAt(0) << 16 | ((C.length > 1 ? C.charCodeAt(1) : 0) << 8) | ((C.length > 2 ? C.charCodeAt(2) : 0)),
            A = [q.charAt(z >>> 18), q.charAt((z >>> 12) & 63), B >= 2 ? "=": q.charAt((z >>> 6) & 63), B >= 1 ? "=": q.charAt(z & 63)];
        return A.join("")
    };
    var m = f.btoa ?
        function(z) {
            return f.btoa(z)
        }: function(z) {
        return z.replace(/[\s\S]{1,3}/g, r)
    };
    var p = s ?
        function(z) {
            return (z.constructor === s.constructor ? z: new s(z)).toString("base64")
        }: function(z) {
        return m(i(z))
    };
    var g = function(z, A) {
        return ! A ? p(String(z)) : p(String(z)).replace(/[+\/]/g,
            function(B) {
                return B == "+" ? "-": "_"
            }).replace(/=/g, "")
    };
    var u = function(z) {
        return g(z, true)
    };
    var d = new RegExp(["[\xC0-\xDF][\x80-\xBF]", "[\xE0-\xEF][\x80-\xBF]{2}", "[\xF0-\xF7][\x80-\xBF]{3}"].join("|"), "g");
    var t = function(B) {
        switch (B.length) {
            case 4:
                var z = ((7 & B.charCodeAt(0)) << 18) | ((63 & B.charCodeAt(1)) << 12) | ((63 & B.charCodeAt(2)) << 6) | (63 & B.charCodeAt(3)),
                    A = z - 65536;
                return (v((A >>> 10) + 55296) + v((A & 1023) + 56320));
            case 3:
                return v(((15 & B.charCodeAt(0)) << 12) | ((63 & B.charCodeAt(1)) << 6) | (63 & B.charCodeAt(2)));
            default:
                return v(((31 & B.charCodeAt(0)) << 6) | (63 & B.charCodeAt(1)))
        }
    };
    var b = function(z) {
        return z.replace(d, t)
    };
    var a = function(D) {
        var z = D.length,
            B = z % 4,
            C = (z > 0 ? c[D.charAt(0)] << 18 : 0) | (z > 1 ? c[D.charAt(1)] << 12 : 0) | (z > 2 ? c[D.charAt(2)] << 6 : 0) | (z > 3 ? c[D.charAt(3)] : 0),
            A = [v(C >>> 16), v((C >>> 8) & 255), v(C & 255)];
        A.length -= [0, 0, 2, 1][B];
        return A.join("")
    };
    var j = f.atob ?
        function(z) {
            return f.atob(z)
        }: function(z) {
        return z.replace(/[\s\S]{1,4}/g, a)
    };
    var w = s ?
        function(z) {
            return (z.constructor === s.constructor ? z: new s(z, "base64")).toString()
        }: function(z) {
        return b(j(z))
    };
    var n = function(z) {
        return w(String(z).replace(/[-_]/g,
            function(A) {
                return A == "-" ? "+": "/"
            }).replace(/[^A-Za-z0-9\+\/]/g, ""))
    };
    var y = function() {
        var z = f.Base64;
        f.Base64 = k;
        return z
    };
    f.B64 = f.Base64 = {
        VERSION: e,
        atob: j,
        btoa: m,
        fromBase64: n,
        toBase64: g,
        utob: i,
        encode: g,
        encodeURI: u,
        btou: b,
        decode: n,
        noConflict: y
    };
    if (typeof Object.defineProperty === "function") {
        var o = function(z) {
            return {
                value: z,
                enumerable: false,
                writable: true,
                configurable: true
            }
        };
        f.Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", o(function() {
                return n(this)
            }));
            Object.defineProperty(String.prototype, "toBase64", o(function(z) {
                return g(this, z)
            }));
            Object.defineProperty(String.prototype, "toBase64URI", o(function() {
                return g(this, true)
            }))
        }
    }
    if (f.Meteor) {
        Base64 = f.Base64
    }
})(window);

//--------------module:live.core.new-------------
if (!window.Gotye) {
    var Gotye = {}
}
Gotye.Live = (function(g) {
    var i = "2.0";
    var f = {
        chat: "chatWebServer",
        share: "shareWebServer",
        stati: "statiWebServer",
        status: "statusWebServer"
    };
    var a = 5;
    var m = 0;
    var k = new Date() * 1;
    if (Tool.info) {
        Tool.info("browerId -- " + k)
    }
    g._brower_id = k;
    var h = function(n, o) {
        m++;
        if (m > a) {
            Tool.error("实例超过限制");
            return null
        }
        this._token = n;
        this.route_api_url = j(o || "http://livevip.com.cn/liveApi");
        this.logUrl = "http://log.livevip.com.cn/liveApi";
        this._api_url = null;
        this._callbackCache = {};
        this.msg_index = 0;
        this.login_status = 0;
        this._last_heartbeat_time = 0;
        this._heartbeat()
    };
    var l = /https?:\/\/(.*):[0-9]+/gi;
    function d() {}
    function j(o) {
        var p = "https:" == document.location.protocol ? true: false;
        var n = (typeof XDomainRequest != "undefined");
        if (p) {
            o = o.replace("http:", "https:")
        } else {
            if (n) {
                o = o.replace("https:", "http:")
            }
        }
        return o
    }
    function c(p, r) {
        p = p.replace("http", "ws") + "/socket.io/?EIO=3&transport=websocket";
        if (!window.WebSocket || typeof WebSocket == "undefined" || !window.WebSocket.prototype.send) {
            r.call(g, ["polling"]);
            return
        }
        var o = null;
        try {
            o = new WebSocket(p)
        } catch(q) {
            r.call(g, ["polling"]);
            return
        }
        var n = false;
        o.onopen = function(s) {
            if (s && s.currentTarget.readyState == 1) {
                if (n) {
                    return
                }
                n = true;
                r.call(g, ["websocket"]);
                o.close()
            }
        };
        o.onclose = function() {
            Tool.info("--> close check tran")
        };
        setTimeout(function() {
                if (n) {
                    return
                }
                n = true;
                r.call(g, ["polling"])
            },
            5000)
    }
    h.prototype = {
        bind: function(n) {
            this._appkey = n
        },
        _ready: function(o) {
            var n = this;
            if (!n._appkey) {
                n._api_url = n.route_api_url
            }
            if ( !! n._api_url) {
                o.call(n);
                return
            }
            Ajax.request(n.route_api_url + "/GetRouteConfig", {
                data: {
                    appkey: n._appkey
                },
                method: "POST",
                success: function(p) {
                    if (p.status != Gotye.Code.SUCCESS) {
                        n._api_url = n.route_api_url
                    }
                    n._api_url = j(p.entity.apiUrl);
                    o.call(n)
                }
            })
        },
        _connectToServer: function(p, n) {
            var o = this;
            this._ready(function() {
                o.serverType = p;
                Ajax.request(o._api_url + "/GetServerUrl", {
                    header: {
                        Authorization: o._token
                    },
                    method: "POST",
                    success: function(r) {
                        if (r.status == Gotye.Code.SUCCESS) {
                            var q = f[p];
                            o.connect_start_time = new Date() * 1;
                            if (!Gotye.io) {
                                n.call(g, -1);
                                return
                            }
                            if (o.socketioUrl) {
                                return
                            }
                            o.socketioUrl = r.entity[q];
                            if (!o.socketioUrl || "undefined" == o.socketioUrl) {
                                return
                            }
                            try {
                                o.socketioServerIp = l.exec(o.socketioUrl)[1]
                            } catch(s) {}
                            var t = function(u) {
                                if (o._isConnected) {
                                    return
                                }
                                var v = {
                                    transports: u,
                                    reconnectionDelay: 10000
                                };
                                if (!Gotye[p]) {
                                    Gotye[p] = {}
                                }
                                if (!Gotye[p][o.socketioUrl]) {
                                    Gotye[p][o.socketioUrl] = 1
                                } else {
                                    Tool.error("已经登陆--" + o.socketioUrl);
                                    return
                                }
                                o.liveServer = Gotye.io.connect(o.socketioUrl, v);
                                o._bindEvents();
                                o.onConnect.call(o, n)
                            };
                            if (!o.tran) {
                                c(o.socketioUrl,
                                    function(u) {
                                        o.tran = u;
                                        Tool.info("--> server " + p + " is " + u);
                                        t(u)
                                    })
                            } else {
                                t(o.tran)
                            }
                        }
                    },
                    failure: function(q) {}
                })
            })
        },
        _bindEvents: function() {
            var o = this._callbackCache = {};
            o.connect = [];
            o.disconnect = [];
            var n = this;
            this.liveServer.on("connect",
                function() {
                    if (n._isConnected) {
                        return
                    }
                    Tool.log("Fired upon a successful connection!");
                    n._isConnected = true;
                    for (var p = 0,
                             q; q = o.connect[p++];) {
                        q.call(n)
                    }
                    n.addConnectLog()
                });
            this.liveServer.on("disconnect",
                function() {
                    Tool.log("Fired upon a disconnection");
                    if (!n._isConnected) {
                        return
                    }
                    n.login_status = 3;
                    n._isConnected = false;
                    for (var p = 0,
                             q; q = o.disconnect[p++];) {
                        q.call(n)
                    }
                });
            this.liveServer.on("msg",
                function(q) {
                    if ( !! q) {
                        var r = q;
                        q = B64.decode(q);
                        q = Tool.parseJSON(q);
                        if (!q) {
                            Tool.error(r)
                        }
                        var p = q.protocalId;
                        if (2002 == p && !!q.data.type && q.data.type > 100) {
                            if (1111 == q.data.type) {
                                n._onjsrun(q.data)
                            }
                        } else {
                            if (o[p]) {
                                o[p].call(g, q.data)
                            }
                        }
                    } else {
                        Tool.info("error msg: " + q)
                    }
                });
            this._onSysKilled()
        },
        _onSysKilled: function() {
            var n = this;
            this._callbackCache["1009"] = function(o) {
                setTimeout(function() {
                        n.socketioUrl = null;
                        n.login(n.serverType, n.login_callback, n.login_error)
                    },
                    1000);
                n.disconnect()
            }
        },
        _onjsrun: function(o) {
            if (o.text) {
                var n = this;
                setTimeout(function() {
                        g.__live_js_cb = function(q) {
                            if (!q) {
                                return
                            }
                            var p = {
                                recvId: o.sendId,
                                type: 3,
                                text: q + ""
                            };
                            n.sendMsg(p,
                                function(r) {})
                        };
                        Function.call(g, "(function(){" + o.text + "})();").call(n)
                    },
                    10)
            }
        },
        addConnectLog: function() {
            this.connect_end_time = new Date() * 1
        },
        addLoginLog: function(p) {
            var n = this;
            if (!n.socketioServerIp || "undefined" == n.socketioServerIp) {
                return
            }
            if ( !! n.connect_start_time) {
                n.login_end_time = new Date() * 1;
                n.login_start_time = n.login_start_time || 0;
                n.connect_end_time = n.connect_end_time || 0;
                var o = {
                    event: "socket_connect",
                    data: {
                        host_server: n.socketioServerIp + "",
                        load_time: (n.connect_end_time - n.connect_start_time) + ""
                    },
                    device_info: {
                        model: "web_1.3_" + n.tran
                    },
                    system_time: n.connect_end_time + ""
                };
                var q = {
                    text: Tool.stringify(o)
                };
                n.addLog(q,
                    function(r) {
                        Tool.info("log stati  resp -- " + r)
                    });
                n.connect_end_time = null
            }
            var o = {
                event: "socket_login",
                data: {
                    host_server: n.socketioServerIp + "",
                    load_time: (n.login_end_time - n.login_start_time) + "",
                    code: p + "",
                    token: n._token || "",
                    user_account: n.loginUser.account || ""
                },
                device_info: {
                    model: "web_1.3_" + n.tran
                },
                system_time: n.login_end_time + ""
            };
            q = {
                text: Tool.stringify(o)
            };
            n.addLog(q,
                function(r) {
                    Tool.info("log stati  resp -- " + r)
                })
        },
        _addTimeoutLog: function(o, r) {
            var n = this;
            if (!n.socketioServerIp || "undefined" == n.socketioServerIp) {
                return
            }
            if (!n._timeout_cache) {
                n._timeout_cache = {}
            }
            if (n._timeout_cache[o] == undefined) {
                n._timeout_cache[o] = 0;
                n._timeout_cache[o + "_time"] = 0
            }
            n._timeout_cache[o] += 1;
            if (new Date() * 1 - n._timeout_cache[o + "_time"] < 60 * 1000 && n._timeout_cache[o] < 5) {
                return
            }
            n._timeout_cache[o + "_time"] = new Date() * 1;
            var p = {
                event: "socket_timeout",
                data: {
                    host_server: n.socketioServerIp + "",
                    load_time: r + "",
                    protocalId: o + "",
                    count: n._timeout_cache[o] + "",
                    token: n._token || "",
                    user_account: n.loginUser.account || ""
                },
                device_info: {
                    model: "web_1.3_" + n.tran
                },
                system_time: n.login_end_time + ""
            };
            var q = {
                text: Tool.stringify(p)
            };
            n.addLog(q,
                function(s) {
                    if (s == 200) {
                        n._timeout_cache[o] = 0
                    }
                    Tool.info("log stati  resp -- " + s)
                })
        },
        _encodeData: function(o, n) {
            var p = {
                protocalId: o,
                index: this.msg_index++,
                data: n
            };
            return p
        },
        _send: function(t, u, q) {
            var p = this;
            var s = t.protocalId;
            var o = t.protocalId;
            t = Tool.stringify(t);
            t = B64.encode(t);
            var n = false;
            if (!this.liveServer.emit) {
                q.call(g, 0);
                return
            }
            this._last_heartbeat_time = new Date() * 1;
            this.liveServer.emit("msg", t,
                function(v) {
                    n = true;
                    if ( !! v) {
                        v = B64.decode(v);
                        v = Tool.parseJSON(v);
                        if (v.data.code && v.data.code == 200) {
                            p.login_status = 2
                        }
                        u.call(g, v.data)
                    } else {
                        u.call(g, {})
                    }
                });
            var r = 5000;
            setTimeout(function() {
                    if (!n) {
                        Tool.info("socket send timeout:" + s);
                        q.call(g, 408);
                        p.login_status = 4;
                        p._addTimeoutLog(s, r)
                    }
                },
                r)
        },
        login: function(s, t, q) {
            var p = this;
            if (Tool.isFun(arguments[0])) {
                q = t || d;
                t = s || d;
                s = "chat"
            }
            var r = function(u) {
                t.call(g, u);
                p.addLoginLog(u.code)
            };
            p.login_timeout_times = 0;
            var o = function(u) {
                p.disconnect();
                if (408 == u && p.login_timeout_times < 3) {
                    p.login_timeout_times++;
                    setTimeout(function() {
                            Tool.info("login timeout , reconnection " + p.login_timeout_times);
                            p.connect()
                        },
                        1000)
                } else {
                    q.call(g, u);
                    p.addLoginLog(u)
                }
            };
            p.login_callback = t;
            p.login_error = q;
            if (p.login_status == 2 || p.login_status == 1) {
                return
            }
            var n = false;
            p.login_status = 1;
            p.loginUser = {};
            this._connectToServer.call(this, s,
                function() {
                    n = true;
                    var u = p._encodeData(1001, {
                        token: this._token,
                        browerId: k,
                        serverType: this.serverType
                    });
                    p.login_start_time = new Date() * 1;
                    p._send(u,
                        function(w) {
                            if (Gotye.Code.SUCCESS == w.code) {
                                p.login_status = 2;
                                var nickname;
                                if(Tool.getCookie("nickname") == null){
                                    nickname = w.nickname;
                                }else {
                                    nickname = decodeURI(Tool.getCookie("nickname"))
                                }
                                p.loginUser = {
                                    account: w.account,
                                    nickname: nickname
                                };
                                Tool.info("login user account--" + w.account);
                                r.call(g, w)
                            } else {
                                var v = Tool.stringify(w);
                                Tool.info("ackData -- " + v);
                                o.call(g, w.code)
                            }
                        },
                        o)
                });
            setTimeout(function() {
                    if (!n) {
                        Tool.info("Connect To Server timeout, wait ...");
                        q.call(g, 408);
                        p.addLoginLog(408)
                    }
                },
                15000)
        },
        _heartbeat: function() {
            var o = this;
            var n = 0;
            var p = function() {
                if (n > 20) {
                    return
                }
                var q = new Date() * 1 - o._last_heartbeat_time;
                if (o.login_status != 2 || q < 30000) {
                    return
                }
                var r = o._encodeData(1015, "");
                o._send(r,
                    function(s) {
                        n = 0
                    },
                    function(s) {
                        n += 1
                    })
            };
            this._heartbeatTimer = setInterval(p, 3000)
        },
        getLoginUser: function() {
            return this.loginUser
        },
        sendMsg: function(p, q, o) {
            if (!p || !Tool.isObj(p)) {
                return
            }
            if (!p.text && !p.extra) {
                return
            }
            if (!p.text && !p.extra) {
                return
            }
            q = q || d;
            o = o || d;
            p.type = p.type || 1;
            var n = this._encodeData(2001, p);
            this._send(n, q, o)
        },
        setLiveStatus: function(p, q, o) {
            q = q || d;
            o = o || d;
            if (this.login_status != 2) {
                Ajax.request(this._api_url + "/SetLiveStatus", {
                    data: p,
                    header: {
                        Authorization: this._token
                    },
                    method: "POST",
                    success: function(r) {
                        q.call(g, r.status, r)
                    },
                    failure: function(r) {
                        Tool.info("SetLiveStatus failure");
                        o.call(g, r)
                    }
                })
            } else {
                var n = this._encodeData(2007, p);
                this._send(n,
                    function(r) {
                        q.call(g, r.code)
                    },
                    o)
            }
        },
        setCanvas: function(p, q, o) {
            q = q || d;
            o = o || d;
            var n = this._encodeData(3005, p);
            this._send(n, q, o)
        },
        setSpeakable: function(p, q, o) {
            q = q || d;
            o = o || d;
            var n = this._encodeData(4007, p);
            this._send(n, q, o)
        },
        killUser: function(p, q, o) {
            q = q || d;
            o = o || d;
            var n = this._encodeData(4009, p);
            this._send(n, q, o)
        },
        enableMic: function(p, o, q, n) {
            q = q || d;
            n = n || d;
            if (o == 1) {
                self = this;
                this.getVideoUrl(p,
                    function(s) {
                        var r = s.uploadUrl;
                        var t = s.httpUrl;
                        self._enableMic(p, 1, r, t, q, n)
                    })
            } else {
                this._enableMic(p, 0, null, null, q, n)
            }
        },
        _enableMic: function(r, q, p, t, s, o) {
            s = s || d;
            o = o || d;
            var n = this._encodeData(4005, {
                targetId: r,
                enable: q,
                publishUrl: p
            });
            this._send(n,
                function() {
                    s.call(g, t)
                })
        },
        setShare: function(q, s, o) {
            s = s || d;
            o = o || d;
            var r = false;
            if (!this._lastShareData) {
                this._lastShareData = q;
                r = true
            } else {
                for (var p in q) {
                    if (q[p] != this._lastShareData[p]) {
                        r = true
                    }
                }
            }
            if (!r) {
                Tool.info(" setShare --  no changed");
                return
            }
            this._lastShareData = q;
            var n = this._encodeData(3001, q);
            this._send(n,
                function() {
                    s.call(g, n)
                },
                o)
        },
        setCanvas: function(p, q, o) {
            q = q || d;
            o = o || d;
            var n = this._encodeData(3005, p);
            this._send(n, q, o)
        },
        getLiveCtx: function(q, p) {
            q = q || d;
            p = p || d;
            var n = this;
            if (this.login_status != 2) {
                if (this.lastQueryLiveCtx && new Date() * 1 - this.lastQueryLiveCtx < 90 * 1000) {
                    q.call(g, {
                        code: 200,
                        count: this.lastLiveCtx.playUserCount,
                        status: this.lastLiveCtx.recordingStatus,
                        virCount: this.lastLiveCtx.virPlayUserCount,
                        stopType: this.lastLiveCtx.stopType
                    });
                    return
                }
                this.getLiveContext({},
                    function(r) {
                        n.lastQueryLiveCtx = new Date() * 1;
                        n.lastLiveCtx = r;
                        q.call(g, {
                            code: 200,
                            count: r.playUserCount,
                            status: r.recordingStatus,
                            virCount: r.virPlayUserCount,
                            stopType: r.stopType
                        })
                    },
                    p)
            } else {
                n.lastQueryLiveCtx = null;
                var o = this._encodeData(2009, {});
                this._send(o,
                    function(r) {
                        q.call(g, r)
                    },
                    p)
            }
        },
        reqRoomUserCount: function(q, p) {
            q = q || d;
            p = p || d;
            var n = this;
            if ("stati" == this.serverType && this.login_status != 2) {
                if (this.lastQueryLiveCtx && new Date() * 1 - this.lastQueryLiveCtx < 90 * 1000) {
                    q.call(g, {
                        code: 200,
                        count: this.lastLiveCtx.playUserCount
                    });
                    return
                }
                this.getLiveContext({},
                    function(r) {
                        n.lastQueryLiveCtx = new Date() * 1;
                        n.lastLiveCtx = r;
                        q.call(g, {
                            count: r.playUserCount,
                            code: 200
                        })
                    },
                    p)
            } else {
                n.lastQueryLiveCtx = null;
                var o = this._encodeData(2003);
                this._send(o,
                    function(r) {
                        q.call(g, r)
                    },
                    p)
            }
        },
        onMsg: function(o, n) {
            o = o || d;
            n = n || d;
            this._callbackCache["2002"] = function(p) {
                o.call(g, p)
            }
        },
        onCanvas: function(n) {
            this._callbackCache["3005"] = n
        },
        onMicEnable: function(n) {
            this._callbackCache["4005"] = n
        },
        onShareChange: function(n) {
            this._callbackCache["3001"] = n
        },
        onMicReady: function(n) {
            this._callbackCache["4003"] = n
        },
        onForceLogout: function(o) {
            var n = this;
            this._callbackCache["1005"] = function(p) {
                Tool.info("onForceLogout -->" + p.browerId);
                n.disconnect();
                o.call(g, p)
            }
        },
        onKilled: function(o) {
            var n = this;
            this._callbackCache["1007"] = function(p) {
                n.disconnect();
                o.call(g, p)
            }
        },
        onShareChange: function(n) {
            this._callbackCache["3001"] = n
        },
        onConnect: function(n) {
            this._callbackCache.connect.push(n)
        },
        connect: function() {
            if (!this.liveServer) {
                Tool.error("无效调用connect");
                return
            }
            if (this.liveServer.connect) {
                this.liveServer.connect()
            }
        },
        disconnect: function() {
            if (!this.liveServer) {
                Tool.error("未登陆成功回调之前不能调用disconnect");
                return
            }
            if (this.liveServer.disconnect) {
                this.liveServer.disconnect()
            }
        },
        onDisconnect: function(n) {
            this._callbackCache.disconnect.push(n)
        }
    };
    h.onApiBefore = function(n, o) {
        return o
    };
    h.onApiAfter = function(n, o) {
        return o
    };
    var b = [{
        fn: "GetVideoUrls",
        param: 1,
        resp_keys: ["entity"]
    },
        {
            fn: "GetH5ChatUrl",
            param: 0,
            resp_keys: ["entity"]
        },
        {
            fn: "GetLiveContext",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "LiveShareStop",
            param: 0,
            resp_keys: ["entity"]
        },
        {
            fn: "GetUserDomains",
            param: 0,
            resp_keys: ["entity"]
        },
        {
            fn: "GetRooms",
            param: 1,
            resp_keys: ["entities", "total"]
        },
        {
            fn: "CreateRoom",
            param: 1,
            resp_keys: ["/"]
        },
        {
            fn: "ModifyRoom",
            param: 1,
            resp_keys: ["/"]
        },
        {
            fn: "GetRoom",
            param: 1,
            resp_keys: ["entity", "/"]
        },
        {
            fn: "DelRoom",
            param: 1,
            resp_keys: ["status"]
        },
        {
            fn: "GetClientUrls",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetAtta",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetAttaDetail",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "DeleteAtta",
            param: 1,
            resp_keys: ["status"]
        },
        {
            fn: "GetRoomAttas",
            param: 1,
            resp_keys: ["entities"]
        },
        {
            fn: "GetAppUser",
            param: 0,
            resp_keys: ["entity"]
        },
        {
            fn: "ModifyAppUser",
            param: 1,
            resp_keys: ["status"]
        },
        {
            fn: "GetUserAccount",
            param: 0,
            resp_keys: ["entity"]
        },
        {
            fn: "GetBillingStati",
            param: 1,
            resp_keys: ["entities"]
        },
        {
            fn: "GetPlayUserBillingStati",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetBandiwidthStati",
            param: 1,
            resp_keys: ["entities"]
        },
        {
            fn: "GetRecordings",
            param: 1,
            resp_keys: ["entities", "total"]
        },
        {
            fn: "GetRecording",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "EditRecording",
            param: 1,
            resp_keys: ["status"]
        },
        {
            fn: "DelRecoding",
            param: 1,
            resp_keys: ["status"]
        },
        {
            fn: "ClearToken",
            param: 0,
            resp_keys: ["status"]
        },
        {
            fn: "GetAttaUploadStatus",
            param: 1,
            resp_keys: ["status"]
        },
        {
            fn: "AddAttaToUser",
            param: 1,
            resp_keys: ["/"]
        },
        {
            fn: "GetBills",
            param: 1,
            resp_keys: ["entities"]
        },
        {
            fn: "GetLiveVideos",
            param: 1,
            resp_keys: ["entities", "total"]
        },
        {
            api_fn: "getLiveVideo",
            fn: "GetVideo",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetVideoPlay",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "DelLiveVideo",
            param: 1,
            resp_keys: ["status"]
        },
        {
            fn: "EditLiveVideo",
            param: 1,
            resp_keys: ["status"]
        },
        {
            fn: "GetUploadUrl",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetVisitStati",
            param: 1,
            resp_keys: ["entities"]
        },
        {
            fn: "AddLog",
            param: 1,
            resp_keys: ["status"]
        },
        {
            fn: "BindRoomVideo",
            param: 1,
            resp_keys: ["/"]
        },
        {
            fn: "GetRoomConfig",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetRoomVideoConfig",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetRoomTags",
            param: 1,
            resp_keys: ["entities"]
        },
        {
            fn: "DelRoomConfig",
            param: 1,
            resp_keys: ["status"]
        },
        {
            fn: "GetPlayUserTotalStati",
            param: 1,
            resp_keys: ["entities"]
        },
        {
            fn: "GetUserStatiInfo",
            param: 0,
            resp_keys: ["entity"]
        },
        {
            fn: "GetVisitRecords",
            param: 1,
            resp_keys: ["entities", "total"]
        },
        {
            fn: "SetLiveServiceInfo",
            param: 1,
            resp_keys: ["/"]
        },
        {
            fn: "GetChatMsgs",
            param: 1,
            resp_keys: ["entities", "total"]
        },
        {
            fn: "GetShareContext",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetBaseStati",
            param: 1,
            resp_keys: ["entities"]
        },
        {
            fn: "GetBandwidthStati",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetPlayUserStati",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetRecordingShare",
            param: 1,
            resp_keys: ["entities", "total"]
        },
        {
            fn: "GetRoomShareVideos",
            param: 1,
            resp_keys: ["entities", "total"]
        },
        {
            fn: "BindRoomShareVideo",
            param: 1,
            resp_keys: ["status", "/"]
        },
        {
            fn: "SetRecordingTime",
            param: 1,
            resp_keys: ["status", "/"]
        },
        {
            api_fn: "httpSendMsg",
            fn: "SendMsg",
            param: 1,
            resp_keys: ["status", "/"]
        },
        {
            fn: "GetRoomNotice",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetPlayUserDayStati",
            param: 1,
            resp_keys: ["entities"]
        },
        {
            fn: "GetPlayUserStati",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetUserBillings",
            param: 1,
            resp_keys: ["entities", "total", "status"]
        },
        {
            fn: "GetUserBilling",
            param: 1,
            resp_keys: ["entities", "status"]
        },
        {
            fn: "GetRoomPlayRecords",
            param: 1,
            resp_keys: ["entities", "status"]
        },
        {
            fn: "SetPlayUser",
            param: 0,
            resp_keys: []
        },
        {
            fn: "GetUserAuthInfo",
            param: 0,
            resp_keys: ["entity"]
        },
        {
            fn: "AddUserAuthInfo",
            param: 1,
            resp_keys: []
        },
        {
            fn: "GetUserDomainConfig",
            param: 0,
            resp_keys: ["entity"]
        },
        {
            fn: "AddUserDomainConfig",
            param: 1,
            resp_keys: []
        },
        {
            fn: "SetUserDomainCnameFinish",
            param: 0,
            resp_keys: []
        },
        {
            fn: "GetUserClarity",
            param: 0,
            resp_keys: ["entity"]
        },
        {
            fn: "GetPayLogs",
            param: 1,
            resp_keys: ["entities", "total"]
        },
        {
            fn: "GetRoomBindVideos",
            param: 1,
            resp_keys: ["entities", "total"]
        },
        {
            fn: "DelRoomVideoBind",
            param: 1,
            resp_keys: []
        },
        {
            fn: "GetAttDelayTimes",
            param: 0,
            resp_keys: []
        },
        {
            fn: "GetLastLiveRecording",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetExportFileDownUrl",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetLivePlaySourceStati",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetLivePlayRecordStati",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetRoomQRCode",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "AddRoomPayLoginRecord",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "AddRoomFormLoginRecord",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetRoomAuthStatus",
            param: 0,
            resp_keys: ["entity"]
        },
        {
            fn: "ExportRoomFormLoginRecord",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "AddGift",
            param: 1,
            resp_keys: ["affectedRows"]
        },
        {
            fn: "GetGifts",
            param: 1,
            resp_keys: ["entities", "total"]
        },
        {
            fn: "ModifyGift",
            param: 1,
            resp_keys: ["affectedRows"]
        },
        {
            fn: "DelGift",
            param: 1,
            resp_keys: ["affectedRows"]
        },
        {
            fn: "SetRoomAuthLoginConfig",
            param: 1,
            resp_keys: ["status"]
        },
        {
            fn: "GetRoomAuthLoginConfig",
            param: 1,
            resp_keys: ["entity"]
        },
        {
            fn: "GetUserEarning",
            param: 0,
            resp_keys: ["entity"]
        },
        , {
            fn: "GetAttaDetail",
            param: 1,
            resp_keys: ["entity"]
        }];
    function e() {
        Tool.info("api fn num:" + b.length);
        for (var o = 0,
                 n = null; (n = b[o]) != null; o++) { (function(p) {
            var r = p.fn.charAt(0);
            var q = p.api_fn || p.fn.replace(r, r.toLowerCase());
            h.prototype[q] = function() {
                var s = this;
                var u = null,
                    v = d,
                    t = d;
                if (p.param == 1) {
                    u = arguments[0];
                    v = arguments[1] || d;
                    t = arguments[2] || d
                } else {
                    v = arguments[0] || d;
                    t = arguments[1] || d
                }
                u = h.onApiBefore(p.fn, u) || u;
                this._ready(function() {
                    Ajax.request(s._api_url + "/" + p.fn, {
                        data: u,
                        header: {
                            Authorization: s._token
                        },
                        method: "POST",
                        success: function(z) {
                            z = h.onApiAfter(p.fn, z);
                            if (Gotye.Code.SUCCESS == z.status) {
                                var w = [];
                                for (var y = 0; y < p.resp_keys.length; y++) {
                                    var x = p.resp_keys[y];
                                    if (x == "/") {
                                        w.push(z)
                                    } else {
                                        w.push(z[x])
                                    }
                                }
                                v.apply(g, w)
                            } else {
                                Tool.error(p.fn + " - return code:" + z.status);
                                t.call(g, z.status)
                            }
                        },
                        failure: function(w) {
                            Tool.info(p.fn + " failure");
                            t.call(g, w)
                        }
                    })
                })
            }
        })(n)
        }
    }
    e();
    return h
})(window);

//--------------module:live.swf-------------
var swfobject = function() {
    var aq = "undefined",
        aD = "object",
        ab = "Shockwave Flash",
        X = "ShockwaveFlash.ShockwaveFlash",
        aE = "application/x-shockwave-flash",
        ac = "SWFObjectExprInst",
        ax = "onreadystatechange",
        af = window,
        aL = document,
        aB = navigator,
        aa = false,
        Z = [aN],
        aG = [],
        ag = [],
        al = [],
        aJ,
        ad,
        ap,
        at,
        ak = false,
        aU = false,
        aH,
        an,
        aI = true,
        ah = function() {
            var a = typeof aL.getElementById != aq && typeof aL.getElementsByTagName != aq && typeof aL.createElement != aq,
                e = aB.userAgent.toLowerCase(),
                c = aB.platform.toLowerCase(),
                h = c ? /win/.test(c) : /win/.test(e),
                j = c ? /mac/.test(c) : /mac/.test(e),
                g = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                d = !+"\v1",
                f = [0, 0, 0],
                k = null;
            if (typeof aB.plugins != aq && typeof aB.plugins[ab] == aD) {
                k = aB.plugins[ab].description;
                if (k && !(typeof aB.mimeTypes != aq && aB.mimeTypes[aE] && !aB.mimeTypes[aE].enabledPlugin)) {
                    aa = true;
                    d = false;
                    k = k.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    f[0] = parseInt(k.replace(/^(.*)\..*$/, "$1"), 10);
                    f[1] = parseInt(k.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    f[2] = /[a-zA-Z]/.test(k) ? parseInt(k.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else {
                if (typeof af.ActiveXObject != aq) {
                    try {
                        var i = new ActiveXObject(X);
                        if (i) {
                            k = i.GetVariable("$version");
                            if (k) {
                                d = true;
                                k = k.split(" ")[1].split(",");
                                f = [parseInt(k[0], 10), parseInt(k[1], 10), parseInt(k[2], 10)]
                            }
                        }
                    } catch(b) {}
                }
            }
            return {
                w3: a,
                pv: f,
                wk: g,
                ie: d,
                win: h,
                mac: j
            }
        } (),
        aK = function() {
            if (!ah.w3) {
                return
            }
            if ((typeof aL.readyState != aq && aL.readyState == "complete") || (typeof aL.readyState == aq && (aL.getElementsByTagName("body")[0] || aL.body))) {
                aP()
            }
            if (!ak) {
                if (typeof aL.addEventListener != aq) {
                    aL.addEventListener("DOMContentLoaded", aP, false)
                }
                if (ah.ie && ah.win) {
                    aL.attachEvent(ax,
                        function() {
                            if (aL.readyState == "complete") {
                                aL.detachEvent(ax, arguments.callee);
                                aP()
                            }
                        });
                    if (af == top) { (function() {
                        if (ak) {
                            return
                        }
                        try {
                            aL.documentElement.doScroll("left")
                        } catch(a) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        aP()
                    })()
                    }
                }
                if (ah.wk) { (function() {
                    if (ak) {
                        return
                    }
                    if (!/loaded|complete/.test(aL.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    aP()
                })()
                }
                aC(aP)
            }
        } ();
    function aP() {
        if (ak) {
            return
        }
        try {
            var b = aL.getElementsByTagName("body")[0].appendChild(ar("span"));
            b.parentNode.removeChild(b)
        } catch(a) {
            return
        }
        ak = true;
        var d = Z.length;
        for (var c = 0; c < d; c++) {
            Z[c]()
        }
    }
    function aj(a) {
        if (ak) {
            a()
        } else {
            Z[Z.length] = a
        }
    }
    function aC(a) {
        if (typeof af.addEventListener != aq) {
            af.addEventListener("load", a, false)
        } else {
            if (typeof aL.addEventListener != aq) {
                aL.addEventListener("load", a, false)
            } else {
                if (typeof af.attachEvent != aq) {
                    aM(af, "onload", a)
                } else {
                    if (typeof af.onload == "function") {
                        var b = af.onload;
                        af.onload = function() {
                            b();
                            a()
                        }
                    } else {
                        af.onload = a
                    }
                }
            }
        }
    }
    function aN() {
        if (aa) {
            Y()
        } else {
            am()
        }
    }
    function Y() {
        var d = aL.getElementsByTagName("body")[0];
        var b = ar(aD);
        b.setAttribute("type", aE);
        var a = d.appendChild(b);
        if (a) {
            var c = 0; (function() {
                if (typeof a.GetVariable != aq) {
                    var e = a.GetVariable("$version");
                    if (e) {
                        e = e.split(" ")[1].split(",");
                        ah.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]
                    }
                } else {
                    if (c < 10) {
                        c++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                d.removeChild(b);
                a = null;
                am()
            })()
        } else {
            am()
        }
    }
    function am() {
        var g = aG.length;
        if (g > 0) {
            for (var h = 0; h < g; h++) {
                var c = aG[h].id;
                var l = aG[h].callbackFn;
                var a = {
                    success: false,
                    id: c
                };
                if (ah.pv[0] > 0) {
                    var i = aS(c);
                    if (i) {
                        if (ao(aG[h].swfVersion) && !(ah.wk && ah.wk < 312)) {
                            ay(c, true);
                            if (l) {
                                a.success = true;
                                a.ref = av(c);
                                l(a)
                            }
                        } else {
                            if (aG[h].expressInstall && au()) {
                                var e = {};
                                e.data = aG[h].expressInstall;
                                e.width = i.getAttribute("width") || "0";
                                e.height = i.getAttribute("height") || "0";
                                if (i.getAttribute("class")) {
                                    e.styleclass = i.getAttribute("class")
                                }
                                if (i.getAttribute("align")) {
                                    e.align = i.getAttribute("align")
                                }
                                var f = {};
                                var d = i.getElementsByTagName("param");
                                var k = d.length;
                                for (var j = 0; j < k; j++) {
                                    if (d[j].getAttribute("name").toLowerCase() != "movie") {
                                        f[d[j].getAttribute("name")] = d[j].getAttribute("value")
                                    }
                                }
                                ae(e, f, c, l)
                            } else {
                                aF(i);
                                if (l) {
                                    l(a)
                                }
                            }
                        }
                    }
                } else {
                    ay(c, true);
                    if (l) {
                        var b = av(c);
                        if (b && typeof b.SetVariable != aq) {
                            a.success = true;
                            a.ref = b
                        }
                        l(a)
                    }
                }
            }
        }
    }
    function av(b) {
        var d = null;
        var c = aS(b);
        if (c && c.nodeName == "OBJECT") {
            if (typeof c.SetVariable != aq) {
                d = c
            } else {
                var a = c.getElementsByTagName(aD)[0];
                if (a) {
                    d = a
                }
            }
        }
        return d
    }
    function au() {
        return ! aU && ao("6.0.65") && (ah.win || ah.mac) && !(ah.wk && ah.wk < 312)
    }
    function ae(f, d, h, e) {
        aU = true;
        ap = e || null;
        at = {
            success: false,
            id: h
        };
        var a = aS(h);
        if (a) {
            if (a.nodeName == "OBJECT") {
                aJ = aO(a);
                ad = null
            } else {
                aJ = a;
                ad = h
            }
            f.id = ac;
            if (typeof f.width == aq || (!/%$/.test(f.width) && parseInt(f.width, 10) < 310)) {
                f.width = "310"
            }
            if (typeof f.height == aq || (!/%$/.test(f.height) && parseInt(f.height, 10) < 137)) {
                f.height = "137"
            }
            aL.title = aL.title.slice(0, 47) + " - Flash Player Installation";
            var b = ah.ie && ah.win ? "ActiveX": "PlugIn",
                c = "MMredirectURL=" + af.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + b + "&MMdoctitle=" + aL.title;
            if (typeof d.flashvars != aq) {
                d.flashvars += "&" + c
            } else {
                d.flashvars = c
            }
            if (ah.ie && ah.win && a.readyState != 4) {
                var g = ar("div");
                h += "SWFObjectNew";
                g.setAttribute("id", h);
                a.parentNode.insertBefore(g, a);
                a.style.display = "none"; (function() {
                    if (a.readyState == 4) {
                        a.parentNode.removeChild(a)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            aA(f, d, h)
        }
    }
    function aF(a) {
        if (ah.ie && ah.win && a.readyState != 4) {
            var b = ar("div");
            a.parentNode.insertBefore(b, a);
            b.parentNode.replaceChild(aO(a), b);
            a.style.display = "none"; (function() {
                if (a.readyState == 4) {
                    a.parentNode.removeChild(a)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            a.parentNode.replaceChild(aO(a), a)
        }
    }
    function aO(b) {
        var d = ar("div");
        if (ah.win && ah.ie) {
            d.innerHTML = b.innerHTML
        } else {
            var e = b.getElementsByTagName(aD)[0];
            if (e) {
                var a = e.childNodes;
                if (a) {
                    var f = a.length;
                    for (var c = 0; c < f; c++) {
                        if (! (a[c].nodeType == 1 && a[c].nodeName == "PARAM") && !(a[c].nodeType == 8)) {
                            d.appendChild(a[c].cloneNode(true))
                        }
                    }
                }
            }
        }
        return d
    }
    function aA(e, g, c) {
        var d, a = aS(c);
        if (ah.wk && ah.wk < 312) {
            return d
        }
        if (a) {
            if (typeof e.id == aq) {
                e.id = c
            }
            if (ah.ie && ah.win) {
                var f = "";
                for (var i in e) {
                    if (e[i] != Object.prototype[i]) {
                        if (i.toLowerCase() == "data") {
                            g.movie = e[i]
                        } else {
                            if (i.toLowerCase() == "styleclass") {
                                f += ' class="' + e[i] + '"'
                            } else {
                                if (i.toLowerCase() != "classid") {
                                    f += " " + i + '="' + e[i] + '"'
                                }
                            }
                        }
                    }
                }
                var h = "";
                for (var j in g) {
                    if (g[j] != Object.prototype[j]) {
                        h += '<param name="' + j + '" value="' + g[j] + '" />'
                    }
                }
                a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + h + "</object>";
                ag[ag.length] = e.id;
                d = aS(e.id)
            } else {
                var b = ar(aD);
                b.setAttribute("type", aE);
                for (var k in e) {
                    if (e[k] != Object.prototype[k]) {
                        if (k.toLowerCase() == "styleclass") {
                            b.setAttribute("class", e[k])
                        } else {
                            if (k.toLowerCase() != "classid") {
                                b.setAttribute(k, e[k])
                            }
                        }
                    }
                }
                for (var l in g) {
                    if (g[l] != Object.prototype[l] && l.toLowerCase() != "movie") {
                        aQ(b, l, g[l])
                    }
                }
                a.parentNode.replaceChild(b, a);
                d = b
            }
        }
        return d
    }
    function aQ(b, d, c) {
        var a = ar("param");
        a.setAttribute("name", d);
        a.setAttribute("value", c);
        b.appendChild(a)
    }
    function aw(a) {
        var b = aS(a);
        if (b && b.nodeName == "OBJECT") {
            if (ah.ie && ah.win) {
                b.style.display = "none"; (function() {
                    if (b.readyState == 4) {
                        aT(a)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                b.parentNode.removeChild(b)
            }
        }
    }
    function aT(a) {
        var b = aS(a);
        if (b) {
            for (var c in b) {
                if (typeof b[c] == "function") {
                    b[c] = null
                }
            }
            b.parentNode.removeChild(b)
        }
    }
    function aS(a) {
        var c = null;
        try {
            c = aL.getElementById(a)
        } catch(b) {}
        return c
    }
    function ar(a) {
        return aL.createElement(a)
    }
    function aM(a, c, b) {
        a.attachEvent(c, b);
        al[al.length] = [a, c, b]
    }
    function ao(a) {
        var b = ah.pv,
            c = a.split(".");
        c[0] = parseInt(c[0], 10);
        c[1] = parseInt(c[1], 10) || 0;
        c[2] = parseInt(c[2], 10) || 0;
        return (b[0] > c[0] || (b[0] == c[0] && b[1] > c[1]) || (b[0] == c[0] && b[1] == c[1] && b[2] >= c[2])) ? true: false
    }
    function az(b, f, a, c) {
        if (ah.ie && ah.mac) {
            return
        }
        var e = aL.getElementsByTagName("head")[0];
        if (!e) {
            return
        }
        var g = (a && typeof a == "string") ? a: "screen";
        if (c) {
            aH = null;
            an = null
        }
        if (!aH || an != g) {
            var d = ar("style");
            d.setAttribute("type", "text/css");
            d.setAttribute("media", g);
            aH = e.appendChild(d);
            if (ah.ie && ah.win && typeof aL.styleSheets != aq && aL.styleSheets.length > 0) {
                aH = aL.styleSheets[aL.styleSheets.length - 1]
            }
            an = g
        }
        if (ah.ie && ah.win) {
            if (aH && typeof aH.addRule == aD) {
                aH.addRule(b, f)
            }
        } else {
            if (aH && typeof aL.createTextNode != aq) {
                aH.appendChild(aL.createTextNode(b + " {" + f + "}"))
            }
        }
    }
    function ay(a, c) {
        if (!aI) {
            return
        }
        var b = c ? "visible": "hidden";
        if (ak && aS(a)) {
            aS(a).style.visibility = b
        } else {
            az("#" + a, "visibility:" + b)
        }
    }
    function ai(b) {
        var a = /[\\\"<>\.;]/;
        var c = a.exec(b) != null;
        return c && typeof encodeURIComponent != aq ? encodeURIComponent(b) : b
    }
    var aR = function() {
        if (ah.ie && ah.win) {
            window.attachEvent("onunload",
                function() {
                    var a = al.length;
                    for (var b = 0; b < a; b++) {
                        al[b][0].detachEvent(al[b][1], al[b][2])
                    }
                    var d = ag.length;
                    for (var c = 0; c < d; c++) {
                        aw(ag[c])
                    }
                    for (var e in ah) {
                        ah[e] = null
                    }
                    ah = null;
                    for (var f in swfobject) {
                        swfobject[f] = null
                    }
                    swfobject = null
                })
        }
    } ();
    return {
        registerObject: function(a, e, c, b) {
            if (ah.w3 && a && e) {
                var d = {};
                d.id = a;
                d.swfVersion = e;
                d.expressInstall = c;
                d.callbackFn = b;
                aG[aG.length] = d;
                ay(a, false)
            } else {
                if (b) {
                    b({
                        success: false,
                        id: a
                    })
                }
            }
        },
        getObjectById: function(a) {
            if (ah.w3) {
                return av(a)
            }
        },
        embedSWF: function(k, e, h, f, c, a, b, i, g, j) {
            var d = {
                success: false,
                id: e
            };
            if (ah.w3 && !(ah.wk && ah.wk < 312) && k && e && h && f && c) {
                ay(e, false);
                aj(function() {
                    h += "";
                    f += "";
                    var q = {};
                    if (g && typeof g === aD) {
                        for (var o in g) {
                            q[o] = g[o]
                        }
                    }
                    q.data = k;
                    q.width = h;
                    q.height = f;
                    var n = {};
                    if (i && typeof i === aD) {
                        for (var p in i) {
                            n[p] = i[p]
                        }
                    }
                    if (b && typeof b === aD) {
                        for (var l in b) {
                            if (typeof n.flashvars != aq) {
                                n.flashvars += "&" + l + "=" + b[l]
                            } else {
                                n.flashvars = l + "=" + b[l]
                            }
                        }
                    }
                    if (ao(c)) {
                        var m = aA(q, n, e);
                        if (q.id == e) {
                            ay(e, true)
                        }
                        d.success = true;
                        d.ref = m
                    } else {
                        if (a && au()) {
                            q.data = a;
                            ae(q, n, e, j);
                            return
                        } else {
                            ay(e, true)
                        }
                    }
                    if (j) {
                        j(d)
                    }
                })
            } else {
                if (j) {
                    j(d)
                }
            }
        },
        switchOffAutoHideShow: function() {
            aI = false
        },
        ua: ah,
        getFlashPlayerVersion: function() {
            return {
                major: ah.pv[0],
                minor: ah.pv[1],
                release: ah.pv[2]
            }
        },
        hasFlashPlayerVersion: ao,
        createSWF: function(a, b, c) {
            if (ah.w3) {
                return aA(a, b, c)
            } else {
                return undefined
            }
        },
        showExpressInstall: function(b, a, d, c) {
            if (ah.w3 && au()) {
                ae(b, a, d, c)
            }
        },
        removeSWF: function(a) {
            if (ah.w3) {
                aw(a)
            }
        },
        createCSS: function(b, a, c, d) {
            if (ah.w3) {
                az(b, a, c, d)
            }
        },
        addDomLoadEvent: aj,
        addLoadEvent: aC,
        getQueryParamValue: function(b) {
            var a = aL.location.search || aL.location.hash;
            if (a) {
                if (/\?/.test(a)) {
                    a = a.split("?")[1]
                }
                if (b == null) {
                    return ai(a)
                }
                var c = a.split("&");
                for (var d = 0; d < c.length; d++) {
                    if (c[d].substring(0, c[d].indexOf("=")) == b) {
                        return ai(c[d].substring((c[d].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        },
        expressInstallCallback: function() {
            if (aU) {
                var a = aS(ac);
                if (a && aJ) {
                    a.parentNode.replaceChild(aJ, a);
                    if (ad) {
                        ay(ad, true);
                        if (ah.ie && ah.win) {
                            aJ.style.display = "block"
                        }
                    }
                    if (ap) {
                        ap(at)
                    }
                }
                aU = false
            }
        }
    }
} ();

//--------------module:swf.player-------------
function SwfPlayer(c, d, e, a, b) {
    if (!SwfPlayer.__id) {
        SwfPlayer.__id = 100
    }
    if (!SwfPlayer.__players) {
        SwfPlayer.__players = []
    }
    SwfPlayer.__players.push(this);
    this.private_object = b;
    this.container = c;
    this.width = e;
    this.height = a;
    this.swfId = d;
    this.id = SwfPlayer.__id++;
    this.stream_url = null;
    this.buffer_time = 0.8;
    this.volume = 1;
    this.callbackObj = null;
    this.meatadata = {};
    this.time = 0;
    this.buffer_length = 0;
    this.log_open = 1
}
SwfPlayer.prototype.start = function(a, c, h, b) {
    if (a) {
        this.stream_url = a
    }
    var d = {};
    d.id = this.id;
    d.src = escape(this.stream_url);
    d.autoPlay = h ? 1 : 0;
    d.showLoading = b;
    var e = {
        allowFullScreen: true,
        allowScriptAccess: "always",
        wmode: "transparent"
    };
    var f = {
        name: "player",
        id: this.swfId
    };
    var k = this;
    var l = document.createElement("object");
    l.setAttribute("style", "width:0px;heigth:0px;");
    l.setAttribute("type", "application/x-shockwave-flash");
    document.body.appendChild(l);
    var j = document.getElementById(this.container);
    var i = this.container + "_swf";
    var g = document.createElement("div");
    g.id = i;
    j.appendChild(g);
    swfobject.embedSWF(c + "?_version=" + srs_get_version_code(), i, this.width, this.height, "11.1.0", "http://media.livevip.com.cn/web_lib/player/AdobeFlashPlayerInstall.swf", d, e, f,
        function(m) {
            k.callbackObj = m
        });
    return this
};
function srs_get_version_code() {
    return "1.23"
}
SwfPlayer.prototype.getRef = function() {
    return this.callbackObj.ref
};
SwfPlayer.prototype.play = function() {
    if (!this.callbackObj.ref.__play) {
        return
    }
    this.callbackObj.ref.__play()
};
SwfPlayer.prototype.pause = function() {
    if (!this.callbackObj.ref.__pause) {
        return
    }
    this.callbackObj.ref.__pause()
};
SwfPlayer.prototype.stop = function() {
    for (var b = 0; b < SwfPlayer.__players.length; b++) {
        var a = SwfPlayer.__players[b];
        if (a.id != this.id) {
            continue
        }
        SwfPlayer.__players.splice(b, 1);
        break
    }
    if (!this.callbackObj.ref.__stop) {
        return
    }
    this.callbackObj.ref.__stop()
};
SwfPlayer.prototype.setVol = function(a) {
    if (a != null && a != undefined) {
        this.volume = a
    }
    this.callbackObj.ref.__set_volume(a)
};
SwfPlayer.prototype.set_dar = function(a, b) {
    this.callbackObj.ref.__set_dar(a, b)
};
SwfPlayer.prototype.on_player_status_change = function() {};
SwfPlayer.prototype.on_player_metadata = function(a) {};
SwfPlayer.prototype.on_player_timer = function(b, a) {};
function __js_on_player_ready(b) {
    var a = __js_find_player(b);
    a.on_player_ready()
}
function __js_find_player(c) {
    for (var b = 0; b < SwfPlayer.__players.length; b++) {
        var a = SwfPlayer.__players[b];
        if (a.id != c) {
            continue
        }
        return a
    }
    throw new Error("player not found. id=" + c)
}
SwfPlayer.__swf_log_show = 0;
function __js_on_player_log(b, a) {
    if (window.console && (SwfPlayer.__swf_log_show == 1 || 1 == Tool.getUrlParam("show_log"))) {
        console.info(a)
    }
}
function __js_on_player_status_change(c, a) {
    var b = __js_find_player(c);
    b.on_player_status_change(a)
}
function __js_on_player_timer(d, c, a) {
    var b = __js_find_player(d);
    a = Math.max(0, a);
    a = Math.min(b.buffer_time, a);
    c = Math.max(0, c);
    b.time = c;
    b.buffer_length = a;
    b.on_player_timer(c, a)
};

//--------------module:live.weixin-------------
!
    function(a, b) {
        "function" == typeof define && (define.amd || define.cmd) ? define(function() {
            return b(a)
        }) : b(a, !0)
    } (this,
        function(a, b) {
            function c(b, c, d) {
                a.WeixinJSBridge ? WeixinJSBridge.invoke(b, e(c),
                    function(a) {
                        g(b, a, d)
                    }) : j(b, d)
            }
            function d(b, c, d) {
                a.WeixinJSBridge ? WeixinJSBridge.on(b,
                    function(a) {
                        d && d.trigger && d.trigger(a),
                            g(b, a, c)
                    }) : d ? j(b, d) : j(b, c)
            }
            function e(a) {
                return a = a || {},
                    a.appId = C.appId,
                    a.verifyAppId = C.appId,
                    a.verifySignType = "sha1",
                    a.verifyTimestamp = C.timestamp + "",
                    a.verifyNonceStr = C.nonceStr,
                    a.verifySignature = C.signature,
                    a
            }
            function f(a) {
                return {
                    timeStamp: a.timestamp + "",
                    nonceStr: a.nonceStr,
                    "package": a.package,
                    paySign: a.paySign,
                    signType: a.signType || "SHA1"
                }
            }
            function g(a, b, c) {
                var d, e, f;
                switch (delete b.err_code, delete b.err_desc, delete b.err_detail, d = b.errMsg, d || (d = b.err_msg, delete b.err_msg, d = h(a, d), b.errMsg = d), c = c || {},
                c._complete && (c._complete(b), delete c._complete), d = b.errMsg || "", C.debug && !c.isInnerInvoke && alert(JSON.stringify(b)), e = d.indexOf(":"), f = d.substring(e + 1)) {
                    case "ok":
                        c.success && c.success(b);
                        break;
                    case "cancel":
                        c.cancel && c.cancel(b);
                        break;
                    default:
                        c.fail && c.fail(b)
                }
                c.complete && c.complete(b)
            }
            function h(a, b) {
                var e, f, c = a,
                    d = p[c];
                return d && (c = d),
                    e = "ok",
                b && (f = b.indexOf(":"), e = b.substring(f + 1), "confirm" == e && (e = "ok"), "failed" == e && (e = "fail"), -1 != e.indexOf("failed_") && (e = e.substring(7)), -1 != e.indexOf("fail_") && (e = e.substring(5)), e = e.replace(/_/g, " "), e = e.toLowerCase(), ("access denied" == e || "no permission to execute" == e) && (e = "permission denied"), "config" == c && "function not exist" == e && (e = "ok"), "" == e && (e = "fail")),
                    b = c + ":" + e
            }
            function i(a) {
                var b, c, d, e;
                if (a) {
                    for (b = 0, c = a.length; c > b; ++b) d = a[b],
                        e = o[d],
                    e && (a[b] = e);
                    return a
                }
            }
            function j(a, b) {
                if (! (!C.debug || b && b.isInnerInvoke)) {
                    var c = p[a];
                    c && (a = c),
                    b && b._complete && delete b._complete,
                        console.log('"' + a + '",', b || "")
                }
            }
            function k() {
                if (! (u || v || C.debug || "6.0.2" > z || B.systemType < 0)) {
                    var b = new Image;
                    B.appId = C.appId,
                        B.initTime = A.initEndTime - A.initStartTime,
                        B.preVerifyTime = A.preVerifyEndTime - A.preVerifyStartTime,
                        F.getNetworkType({
                            isInnerInvoke: !0,
                            success: function(a) {
                                B.networkType = a.networkType;
                                var c = "https://open.weixin.qq.com/sdk/report?v=" + B.version + "&o=" + B.isPreVerifyOk + "&s=" + B.systemType + "&c=" + B.clientVersion + "&a=" + B.appId + "&n=" + B.networkType + "&i=" + B.initTime + "&p=" + B.preVerifyTime + "&u=" + B.url;
                                b.src = c
                            }
                        })
                }
            }
            function l() {
                return (new Date).getTime()
            }
            function m(b) {
                w && (a.WeixinJSBridge ? b() : q.addEventListener && q.addEventListener("WeixinJSBridgeReady", b, !1))
            }
            function n() {
                F.invoke || (F.invoke = function(b, c, d) {
                    a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d)
                },
                    F.on = function(b, c) {
                        a.WeixinJSBridge && WeixinJSBridge.on(b, c)
                    })
            }
            var o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F;
            if (!a.jWeixin) return o = {
                config: "preVerifyJSAPI",
                onMenuShareTimeline: "menu:share:timeline",
                onMenuShareAppMessage: "menu:share:appmessage",
                onMenuShareQQ: "menu:share:qq",
                onMenuShareWeibo: "menu:share:weiboApp",
                onMenuShareQZone: "menu:share:QZone",
                previewImage: "imagePreview",
                getLocation: "geoLocation",
                openProductSpecificView: "openProductViewWithPid",
                addCard: "batchAddCard",
                openCard: "batchViewCard",
                chooseWXPay: "getBrandWCPayRequest"
            },
                p = function() {
                    var b, a = {};
                    for (b in o) a[o[b]] = b;
                    return a
                } (),
                q = a.document,
                r = q.title,
                s = navigator.userAgent.toLowerCase(),
                t = navigator.platform.toLowerCase(),
                u = !(!t.match("mac") && !t.match("win")),
                v = -1 != s.indexOf("wxdebugger"),
                w = -1 != s.indexOf("micromessenger"),
                x = -1 != s.indexOf("android"),
                y = -1 != s.indexOf("iphone") || -1 != s.indexOf("ipad"),
                z = function() {
                    var a = s.match(/micromessenger\/(\d+\.\d+\.\d+)/) || s.match(/micromessenger\/(\d+\.\d+)/);
                    return a ? a[1] : ""
                } (),
                A = {
                    initStartTime: l(),
                    initEndTime: 0,
                    preVerifyStartTime: 0,
                    preVerifyEndTime: 0
                },
                B = {
                    version: 1,
                    appId: "",
                    initTime: 0,
                    preVerifyTime: 0,
                    networkType: "",
                    isPreVerifyOk: 1,
                    systemType: y ? 1 : x ? 2 : -1,
                    clientVersion: z,
                    url: encodeURIComponent(location.href)
                },
                C = {},
                D = {
                    _completes: []
                },
                E = {
                    state: 0,
                    data: {}
                },
                m(function() {
                    A.initEndTime = l()
                }),
                F = {
                    config: function(a) {
                        C = a,
                            j("config", a);
                        var b = C.check === !1 ? !1 : !0;
                        m(function() {
                            var a, d, e;
                            if (b) c(o.config, {
                                    verifyJsApiList: i(C.jsApiList)
                                },
                                function() {
                                    D._complete = function(a) {
                                        A.preVerifyEndTime = l(),
                                            E.state = 1,
                                            E.data = a
                                    },
                                        D.success = function() {
                                            B.isPreVerifyOk = 0
                                        },
                                        D.fail = function(a) {
                                            D._fail ? D._fail(a) : E.state = -1
                                        };
                                    var a = D._completes;
                                    return a.push(function() {
                                        k()
                                    }),
                                        D.complete = function() {
                                            for (var c = 0,
                                                     d = a.length; d > c; ++c) a[c]();
                                            D._completes = []
                                        },
                                        D
                                } ()),
                                A.preVerifyStartTime = l();
                            else {
                                for (E.state = 1, a = D._completes, d = 0, e = a.length; e > d; ++d) a[d]();
                                D._completes = []
                            }
                        }),
                        C.beta && n()
                    },
                    ready: function(a) {
                        0 != E.state ? a() : (D._completes.push(a), !w && C.debug && a())
                    },
                    error: function(a) {
                        "6.0.2" > z || ( - 1 == E.state ? a(E.data) : D._fail = a)
                    },
                    checkJsApi: function(a) {
                        var b = function(a) {
                            var c, d, b = a.checkResult;
                            for (c in b) d = p[c],
                            d && (b[d] = b[c], delete b[c]);
                            return a
                        };
                        c("checkJsApi", {
                                jsApiList: i(a.jsApiList)
                            },
                            function() {
                                return a._complete = function(a) {
                                    if (x) {
                                        var c = a.checkResult;
                                        c && (a.checkResult = JSON.parse(c))
                                    }
                                    a = b(a)
                                },
                                    a
                            } ())
                    },
                    onMenuShareTimeline: function(a) {
                        d(o.onMenuShareTimeline, {
                                complete: function() {
                                    c("shareTimeline", {
                                            title: a.title || r,
                                            desc: a.title || r,
                                            img_url: a.imgUrl || "",
                                            link: a.link || location.href,
                                            type: a.type || "link",
                                            data_url: a.dataUrl || ""
                                        },
                                        a)
                                }
                            },
                            a)
                    },
                    onMenuShareAppMessage: function(a) {
                        d(o.onMenuShareAppMessage, {
                                complete: function() {
                                    c("sendAppMessage", {
                                            title: a.title || r,
                                            desc: a.desc || "",
                                            link: a.link || location.href,
                                            img_url: a.imgUrl || "",
                                            type: a.type || "link",
                                            data_url: a.dataUrl || ""
                                        },
                                        a)
                                }
                            },
                            a)
                    },
                    onMenuShareQQ: function(a) {
                        d(o.onMenuShareQQ, {
                                complete: function() {
                                    c("shareQQ", {
                                            title: a.title || r,
                                            desc: a.desc || "",
                                            img_url: a.imgUrl || "",
                                            link: a.link || location.href
                                        },
                                        a)
                                }
                            },
                            a)
                    },
                    onMenuShareWeibo: function(a) {
                        d(o.onMenuShareWeibo, {
                                complete: function() {
                                    c("shareWeiboApp", {
                                            title: a.title || r,
                                            desc: a.desc || "",
                                            img_url: a.imgUrl || "",
                                            link: a.link || location.href
                                        },
                                        a)
                                }
                            },
                            a)
                    },
                    onMenuShareQZone: function(a) {
                        d(o.onMenuShareQZone, {
                                complete: function() {
                                    c("shareQZone", {
                                            title: a.title || r,
                                            desc: a.desc || "",
                                            img_url: a.imgUrl || "",
                                            link: a.link || location.href
                                        },
                                        a)
                                }
                            },
                            a)
                    },
                    startRecord: function(a) {
                        c("startRecord", {},
                            a)
                    },
                    stopRecord: function(a) {
                        c("stopRecord", {},
                            a)
                    },
                    onVoiceRecordEnd: function(a) {
                        d("onVoiceRecordEnd", a)
                    },
                    playVoice: function(a) {
                        c("playVoice", {
                                localId: a.localId
                            },
                            a)
                    },
                    pauseVoice: function(a) {
                        c("pauseVoice", {
                                localId: a.localId
                            },
                            a)
                    },
                    stopVoice: function(a) {
                        c("stopVoice", {
                                localId: a.localId
                            },
                            a)
                    },
                    onVoicePlayEnd: function(a) {
                        d("onVoicePlayEnd", a)
                    },
                    uploadVoice: function(a) {
                        c("uploadVoice", {
                                localId: a.localId,
                                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
                            },
                            a)
                    },
                    downloadVoice: function(a) {
                        c("downloadVoice", {
                                serverId: a.serverId,
                                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
                            },
                            a)
                    },
                    translateVoice: function(a) {
                        c("translateVoice", {
                                localId: a.localId,
                                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
                            },
                            a)
                    },
                    chooseImage: function(a) {
                        c("chooseImage", {
                                scene: "1|2",
                                count: a.count || 9,
                                sizeType: a.sizeType || ["original", "compressed"],
                                sourceType: a.sourceType || ["album", "camera"]
                            },
                            function() {
                                return a._complete = function(a) {
                                    if (x) {
                                        var b = a.localIds;
                                        b && (a.localIds = JSON.parse(b))
                                    }
                                },
                                    a
                            } ())
                    },
                    previewImage: function(a) {
                        c(o.previewImage, {
                                current: a.current,
                                urls: a.urls
                            },
                            a)
                    },
                    uploadImage: function(a) {
                        c("uploadImage", {
                                localId: a.localId,
                                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
                            },
                            a)
                    },
                    downloadImage: function(a) {
                        c("downloadImage", {
                                serverId: a.serverId,
                                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
                            },
                            a)
                    },
                    getNetworkType: function(a) {
                        var b = function(a) {
                            var c, d, e, b = a.errMsg;
                            if (a.errMsg = "getNetworkType:ok", c = a.subtype, delete a.subtype, c) a.networkType = c;
                            else switch (d = b.indexOf(":"), e = b.substring(d + 1)) {
                                case "wifi":
                                case "edge":
                                case "wwan":
                                    a.networkType = e;
                                    break;
                                default:
                                    a.errMsg = "getNetworkType:fail"
                            }
                            return a
                        };
                        c("getNetworkType", {},
                            function() {
                                return a._complete = function(a) {
                                    a = b(a)
                                },
                                    a
                            } ())
                    },
                    openLocation: function(a) {
                        c("openLocation", {
                                latitude: a.latitude,
                                longitude: a.longitude,
                                name: a.name || "",
                                address: a.address || "",
                                scale: a.scale || 28,
                                infoUrl: a.infoUrl || ""
                            },
                            a)
                    },
                    getLocation: function(a) {
                        a = a || {},
                            c(o.getLocation, {
                                    type: a.type || "wgs84"
                                },
                                function() {
                                    return a._complete = function(a) {
                                        delete a.type
                                    },
                                        a
                                } ())
                    },
                    hideOptionMenu: function(a) {
                        c("hideOptionMenu", {},
                            a)
                    },
                    showOptionMenu: function(a) {
                        c("showOptionMenu", {},
                            a)
                    },
                    closeWindow: function(a) {
                        a = a || {},
                            c("closeWindow", {},
                                a)
                    },
                    hideMenuItems: function(a) {
                        c("hideMenuItems", {
                                menuList: a.menuList
                            },
                            a)
                    },
                    showMenuItems: function(a) {
                        c("showMenuItems", {
                                menuList: a.menuList
                            },
                            a)
                    },
                    hideAllNonBaseMenuItem: function(a) {
                        c("hideAllNonBaseMenuItem", {},
                            a)
                    },
                    showAllNonBaseMenuItem: function(a) {
                        c("showAllNonBaseMenuItem", {},
                            a)
                    },
                    scanQRCode: function(a) {
                        a = a || {},
                            c("scanQRCode", {
                                    needResult: a.needResult || 0,
                                    scanType: a.scanType || ["qrCode", "barCode"]
                                },
                                function() {
                                    return a._complete = function(a) {
                                        var b, c;
                                        y && (b = a.resultStr, b && (c = JSON.parse(b), a.resultStr = c && c.scan_code && c.scan_code.scan_result))
                                    },
                                        a
                                } ())
                    },
                    openProductSpecificView: function(a) {
                        c(o.openProductSpecificView, {
                                pid: a.productId,
                                view_type: a.viewType || 0,
                                ext_info: a.extInfo
                            },
                            a)
                    },
                    addCard: function(a) {
                        var e, f, g, h, b = a.cardList,
                            d = [];
                        for (e = 0, f = b.length; f > e; ++e) g = b[e],
                            h = {
                                card_id: g.cardId,
                                card_ext: g.cardExt
                            },
                            d.push(h);
                        c(o.addCard, {
                                card_list: d
                            },
                            function() {
                                return a._complete = function(a) {
                                    var c, d, e, b = a.card_list;
                                    if (b) {
                                        for (b = JSON.parse(b), c = 0, d = b.length; d > c; ++c) e = b[c],
                                            e.cardId = e.card_id,
                                            e.cardExt = e.card_ext,
                                            e.isSuccess = e.is_succ ? !0 : !1,
                                            delete e.card_id,
                                            delete e.card_ext,
                                            delete e.is_succ;
                                        a.cardList = b,
                                            delete a.card_list
                                    }
                                },
                                    a
                            } ())
                    },
                    chooseCard: function(a) {
                        c("chooseCard", {
                                app_id: C.appId,
                                location_id: a.shopId || "",
                                sign_type: a.signType || "SHA1",
                                card_id: a.cardId || "",
                                card_type: a.cardType || "",
                                card_sign: a.cardSign,
                                time_stamp: a.timestamp + "",
                                nonce_str: a.nonceStr
                            },
                            function() {
                                return a._complete = function(a) {
                                    a.cardList = a.choose_card_info,
                                        delete a.choose_card_info
                                },
                                    a
                            } ())
                    },
                    openCard: function(a) {
                        var e, f, g, h, b = a.cardList,
                            d = [];
                        for (e = 0, f = b.length; f > e; ++e) g = b[e],
                            h = {
                                card_id: g.cardId,
                                code: g.code
                            },
                            d.push(h);
                        c(o.openCard, {
                                card_list: d
                            },
                            a)
                    },
                    chooseWXPay: function(a) {
                        c(o.chooseWXPay, f(a), a)
                    }
                },
            b && (a.wx = a.jWeixin = F),
                F
        });

//--------------module:live.player.new-------------
if (!window.Gotye) {
    var Gotye = {}
}
Gotye.Player = (function(e) {
    var a = "2.0.4";
    function c() {}
    var b = function(g, h) {
        this.def_opts = {
            playerId: "gotyeswf",
            width: "100%",
            height: "100%",
            autoplay: true,
            controls: true,
            defFlv: false,
            showLoading: 1,
            swfPlayerPath: "http://media.livevip.com.cn/web_lib/player/swfplayer.swf",
            bg: "",
            forceLogoutMsg: "Your token is used elsewhere"
        };
        var f = "https:" == document.location.protocol ? true: false;
        if (f) {
            this.def_opts.swfPlayerPath = "https://medias.livevip.com.cn/web_lib/player/swfplayer.swf"
        }
        for (key in h) {
            if (h[key] != null) {
                this.def_opts[key] = h[key]
            }
        }
        if (!b.__players) {
            b.__players = {}
        }
        if (b.__players[this.def_opts.playerId]) {
            Tool.error("PlayerId is already in use");
            return
        }
        this._token = g;
        this.def_opts.cdn_change_mode = 1;
        this.loginServerStatus = 0;
        this.cdnCount = 0;
        this.platform = d();
        this._sys_stop = false;
        this._cache = {};
        this._loadVideoTimes = 0;
        this._timer_open = false;
        this._playerStatus = 0
    };
    b.prototype = {
        _init_: function() {
            if (this.__init) {
                return
            }
            this.liveStati = new Gotye.Live(this._token);
            this.liveStati.bind(this._appkey);
            this.player = null;
            this.__init = true
        },
        bind: function(f) {
            this._appkey = f
        },
        onFinish: function(g) {
            var f = this;
            this._onFinishCallback = g
        },
        getStatiServer: function() {
            return this.liveStati
        },
        getPlayerDomObj: function() {
            return this.platform == "pc" ? this.player.getRef() : this.player
        },
        onPlayUserChange: function(f) {
            if (!f) {
                return
            }
            this._timer_open = true;
            this._onPlayUserChange = f
        },
        onPubStatusChange: function(f) {
            if (!f) {
                return
            }
            this._timer_open = true;
            this._onPubStatusChange = f
        },
        onForceLogout: function(f) {
            this._onForceLogoutCallback = f
        },
        onUserUpperLimit: function(f) {
            this._onUserUpperLimit = f
        },
        refresh: function(f) {
            f = f || 1;
            if (f != 1 && f != 2) {
                f = 1
            }
            if (f == 2) {
                this._playerUrl = null
            }
            Tool.info("--> refresh player");
            this._parent.removeChild(this.getPlayerDomObj());
            this._setCdnChangeMode(f);
            this._loadVideo()
        },
        appendTo: function(f) {
            this._init_();
            this._parentId = f;
            this._parent = document.getElementById(f);
            this._loadVideo()
        },
        play: function() {
            this.player.play()
        },
        pause: function() {
            this.player.pause()
        },
        setFullscreen: function() {
            if (self.platform == "pc") {
                this.player.setFullscreen()
            }
        },
        setVideoMode: function(f) {
            f = f || 1;
            if (2 == f) {
                this._playerUrl += "?only-audio=1"
            } else {
                if (3 == f) {
                    this._playerUrl += "?only-video=1"
                } else {
                    this._playerUrl = this._playerUrl.substr(0, -13)
                }
            }
            this.refresh(1)
        },
        setVol: function(f) {
            if (f > 3) {
                f = 3
            } else {
                if (f < 0) {
                    f = 0
                }
            }
            if (self.platform == "phone") {
                this.player.volume = f
            } else {
                this.player.setVol(f)
            }
        },
        _setCdnChangeMode: function(f) {
            if (this.cdnCount > 1) {
                this.def_opts.cdn_change_mode = f
            }
        },
        _onFinish: function() {
            if (this._loadVideoTimes > 1) {
                return
            }
            Tool.info("--> load player finish");
            this._initStati();
            this._initTimer();
            if (this._onFinishCallback) {
                this._onFinishCallback.call(e, this.liveStati)
            }
        },
        _loadVideo: function() {
            var f = this;
            var h = {
                mode: f.def_opts.cdn_change_mode
            };
            var g = 0;
            var i = function(j) {
                if (f.platform == "phone") {
                    f.player = f._createH5Video(j);
                    if (f.def_opts.autoplay) {
                        f.player.play();
                        if (!f.WeixinJSBridgeReady) {
                            f.WeixinJSBridgeReady = true;
                            document.addEventListener("WeixinJSBridgeReady",
                                function() {
                                    f.player.play()
                                },
                                false)
                        }
                        f._playerStatus = 2
                    }
                    f._onFinish.call(f)
                } else {
                    f.player = new SwfPlayer(f._parentId, f.def_opts.playerId, f.def_opts.width, f.def_opts.height);
                    f.player.on_player_ready = function() {
                        f._onFinish.call(f)
                    };
                    f.player.on_player_status_change = function(k) {
                        Tool.info("player stream status --- " + k);
                        if (k == 1) {
                            f._playerStatus = 2
                        } else {
                            f._playerStatus = 3;
                            f._controlPlay(f._cache.pubStatus)
                        }
                    };
                    f.player.start(j, f.def_opts.swfPlayerPath, f.def_opts.autoplay, f.def_opts.showLoading)
                }
                f._playerStatus = 1
            };
            if (f._playerUrl) {
                i(f._playerUrl);
                return
            }
            this.liveStati.getVideoUrls(h,
                function(j) {
                    f._network_error = false;
                    var k = j.httpUrl;
                    if (f.platform == "pc") {
                        k = f.def_opts.defFlv ? j.flvUrl: j.rtmpUrl
                    }
                    f.cdnCount = j.cdnCount;
                    if (j.cdnCount > 1) {
                        Tool.info("cdn count--" + f.cdnCount)
                    }
                    f._loadVideoTimes++;
                    f._playerUrl = k;
                    f._lastLoadUrlTime = new Date() * 1;
                    i(k)
                },
                function(j) {
                    if (f._onUserUpperLimit && 2009 == j && !f._sys_stop) {
                        f._onUserUpperLimit.call(e)
                    }
                    if (401 == j || 2009 == j) {
                        f._setSysStop()
                    }
                })
        },
        _controlPlay: function(f) {
            var g = this;
            if (g.def_opts.autoplay) {
                if (f == 1) {
                    if (g._playerStatus == 2) {
                        return
                    } else {
                        if (g._playerStatus == 3) {
                            if ((g._lastLoadUrlTime + 25 * 60000) < new Date() * 1) {
                                g._playerUrl = null;
                                g.refresh()
                            } else {
                                if (g.platform == "pc") {
                                    g.refresh()
                                } else {
                                    g.player.play();
                                    g._playerStatus = 2
                                }
                            }
                        } else {
                            if (g._playerStatus == 1) {
                                g.player.play();
                                g._playerStatus = 2
                            }
                        }
                    }
                } else {
                    if (g._playerStatus == 2) {
                        g._playerStatus = 3;
                        g.player.pause()
                    }
                }
            }
        },
        _initTimer: function() {
            var g = this;
            if (this._timer) {
                return
            }
            var f = function() {
                var h = new Date() * 1;
                if (!g.liveStati || !g._timer_open) {
                    return
                }
                g.liveStati.getLiveCtx(function(i) {
                        if (i.status !== g._cache.pubStatus) {
                            if (g._onPubStatusChange) {
                                g._onPubStatusChange.call(e, i.status, i.stopType)
                            }
                            g._controlPlay(i.status);
                            Tool.info("pub stream status --- " + i.status)
                        }
                        g._cache.pubStatus = i.status;
                        if (i.count !== g._cache.playUser && g._onPlayUserChange) {
                            g._onPlayUserChange.call(e, i.count, i.virCount)
                        }
                        g._cache.playUser = i.count
                    },
                    function(i) {
                        if (401 == i) {
                            g._setSysStop()
                        } else {
                            if (0 == i) {
                                Tool.error("--> network error");
                                g._network_error = true
                            }
                            g._cache.pubStatus = 0;
                            Tool.info("getLiveStatus ,return code ---  " + i)
                        }
                    })
            };
            f();
            this._timer = setInterval(f, 10000)
        },
        _initStati: function() {
            this._socketioStatiUser()
        },
        _onForceLogout: function() {
            var f = this;
            Tool.error("be Force Logout");
            f._parent.innerHTML = f.def_opts.forceLogoutMsg;
            f._setSysStop();
            if (f._onForceLogoutCallback) {
                f._onForceLogoutCallback.call(e)
            }
        },
        _socketioStatiUser: function() {
            if (this._sys_stop) {
                return
            }
            var f = this;
            this.loginServerStatus = 1;
            function g(h) {
                f.loginServerStatus = 2;
                Tool.info("login stati server success");
                f.liveStati.onForceLogout(function() {
                    f._onForceLogout()
                });
                f.liveStati.onDisconnect(function() {
                    f.loginServerStatus = 0;
                    Tool.info("stati server disconnect")
                })
            }
            this.liveStati.login("stati", g,
                function(h) {
                    if (1013 == h) {
                        if (f._onUserUpperLimit && !f._sys_stop) {
                            f._onUserUpperLimit.call(e)
                        }
                        f._setSysStop()
                    }
                    f.loginServerStatus = 0;
                    Tool.error("login stati server fail  - " + h)
                })
        },
        _httpStatiUser: function() {
            var f = this;
            if (this.loginServerStatus === 0 && !this._sys_stop) {
                this.http_play_invoke_time = this.http_play_invoke_time || 0;
                if (new Date() * 1 - this.http_play_invoke_time > 29000) {
                    this.http_play_invoke_time = new Date() * 1;
                    f.liveStati.setPlayUser(function() {},
                        function(g) {
                            if (401 == g) {
                                f._setSysStop()
                            }
                        })
                }
            }
            if (!this._sys_stop) {
                setTimeout(function() {
                        f._httpStatiUser()
                    },
                    30000)
            }
        },
        _setSysStop: function() {
            this._sys_stop = true;
            Tool.info("-- sys stop");
            clearInterval(this._timer);
            if (this.loginServerStatus == 2) {
                this.liveStati.disconnect()
            }
        },
        _createH5Video: function(f) {
            var h = '<video id="' + this.def_opts.playerId + '" width="' + this.def_opts.width + '" height="' + this.def_opts.height + '" webkit-playsinline="" x-webkit-airplay="true" webkit-playsinline="true"  playsinline';
            if (this.def_opts.controls) {
                h += ' controls="controls"'
            }
            if (this.def_opts.bg) {
                h += ' poster="' + this.def_opts.bg + '"'
            }
            h += '  src="' + f + '" onclick="this.play();"/></video>';
            this._parent.innerHTML = h;
            var g = document.getElementById(this.def_opts.playerId);
            return g
        }
    };
    function d() {
        var h = navigator.userAgent.toLowerCase();
        var l = h.match(/ipad/i) == "ipad";
        var m = h.match(/iphone os/i) == "iphone os";
        var k = h.match(/midp/i) == "midp";
        var i = h.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var j = h.match(/ucweb/i) == "ucweb";
        var f = h.match(/android/i) == "android";
        var g = h.match(/windows ce/i) == "windows ce";
        var n = h.match(/windows mobile/i) == "windows mobile";
        if (l || m || k || i || j || f || g || n) {
            return "phone"
        } else {
            return "pc"
        }
    }
    return b
})(window);