/**
 * Created by wenliang on 2016/03/22.
 */

if (typeof im == "undefined" || !im) {
    window.im = {};
}
if (typeof im.socket == "undefined" || !im.socket) {
    im.server = {};
}

(function () {
    var server = {};
    var user = {};

    //server.io = io('http://192.168.250.200:2020');
    //server.io = io('http://172.16.168.68:2020');
    var base = new Base64();
    server.io = io(base.decode(host));

    server.login = function () {
        this.io.emit('login', {auth: $.cookie('AUTH')});
    }

    server.join_room = function (room_id) {
        this.io.emit('join_room', {room_id: room_id});
    }

    server.leave_room = function (room_id) {
        this.io.emit('leave_room', {room_id: room_id});
    }

    server.room_chat = function (room_id, content, reply_id) {
        this.io.emit('room_chat', {room_id: room_id, content: content, reply_id: reply_id});
    }

    server.room_view = function (room_id, content) {
        this.io.emit('room_view', {room_id: room_id, content: content});
    }

    server.join_vip = function (room_id) {
        this.io.emit('join_vip', {room_id: room_id});
    }

    server.leave_vip = function (room_id) {
        this.io.emit('leave_vip', {room_id: room_id});
    }

    server.vip_chat = function (room_id, content, reply_id) {
        this.io.emit('vip_chat', {room_id: room_id, content: content, reply_id: reply_id});
    }

    server.vip_view = function (room_id, content) {
        this.io.emit('vip_view', {room_id: room_id, content: content});
    }

    server._callback = {};

    server.on = function (event, callback) {
        this._callback[event] = callback;
    }

    server.io.on("connect", function(){
        var _call = server._callback["connect"];
        if(_call != undefined){
            _call();
        }
    });

    server.io.on("reconnect", function(){
        var _call = server._callback["reconnect"];
        if(_call != undefined){
            _call();
        }
    });

    server.io.on("error", function(data){
        var _call = server._callback["error"];
        if(_call != undefined){
            _call(data.data);
        }
    });

    server.io.on("login_result", function(data){
        if(typeof(data) == 'string') data = JSON.parse(data);
        if(data.code == 1){
            user = data.data;
        }
    });

    server.io.on("user_receive", function(data){
        if(typeof(data) == 'string') data = JSON.parse(data);
        var _call = server._callback["user_receive"];
        if(_call != undefined){
            _call(data.data);
        }
    });

    server.io.on("join_room_result", function(data){
        if(typeof(data) == 'string') data = JSON.parse(data);
        var _call = server._callback["join_room_result"];
        if(_call != undefined){
            _call(data);
        }
    });

    server.io.on("join_vip_result", function(data){
        if(typeof(data) == 'string') data = JSON.parse(data);
        if(data.code < 1){
            layer.msg('您没有权限进入此房间！');
        }
        var _call = server._callback["join_vip_result"];
        if(_call != undefined){
            _call(data);
        }
    });

    server.io.on("room_chat_result", function(data){
        //console.log(data);
        var _call = server._callback["room_chat_result"];
        if(_call != undefined){
            _call(data);
        }
    });

    server.io.on("vip_chat_result", function(data){
        var _call = server._callback["vip_chat_result"];
        if(_call != undefined){
            _call(data);
        }
    });

    server.io.on("room_chat_receive", function(data){
        //console.log(data);
        if(typeof(data) == 'string') data = JSON.parse(data);
        var _call = server._callback["room_chat_receive"];
        if(_call != undefined){
            _call(data.data);
        }
        var _call_sound = server._callback["room_chat_receive_sound"];
        if(_call_sound != undefined){
            _call_sound(data.data);
        }
    });

    server.io.on("vip_chat_receive", function(data){
        //console.log(data);
        if(typeof(data) == 'string') data = JSON.parse(data);
        var _call = server._callback["vip_chat_receive"];
        if(_call != undefined){
            _call(data.data);
        }
        var _call_sound = server._callback["vip_chat_receive_sound"];
        if(_call_sound != undefined){
            _call_sound(data.data);
        }
    });

    server.io.on("room_chat_history_receive", function(data){
        //console.log("room_chat_history_receive:" + data);
        if(typeof(data) == 'string') data = JSON.parse(data);
        var _call = server._callback["room_chat_receive"];
        if(_call != undefined){
            for(i in data.data){
                _call(data.data[i]);
            }
        }
    });

    server.io.on("vip_chat_history_receive", function(data){
        if(typeof(data) == 'string') data = JSON.parse(data);
        var _call = server._callback["vip_chat_receive"];
        if(_call != undefined){
            for(i in data.data){
                _call(data.data[i]);
            }
        }
    });

    server.io.on("room_view_result", function(data){
        var _call = server._callback["room_view_result"];
        if(_call != undefined){
            _call(data);
        }
    });

    server.io.on("vip_view_result", function(data){
        var _call = server._callback["vip_view_result"];
        if(_call != undefined){
            _call(data);
        }
    });

    server.io.on("room_view_receive", function(data){
        if(typeof(data) == 'string') data = JSON.parse(data);
        var _call = server._callback["room_view_receive"];
        if(_call != undefined){
            _call(data.data);
        }
        var _call_sound = server._callback["room_view_receive_sound"];
        if(_call_sound != undefined){
            _call_sound(data.data);
        }
    });

    server.io.on("vip_view_receive", function(data){
        if(typeof(data) == 'string') data = JSON.parse(data);
        var _call = server._callback["vip_view_receive"];
        if(_call != undefined){
            _call(data.data);
        }
        var _call_sound = server._callback["vip_view_receive_sound"];
        if(_call_sound != undefined){
            _call_sound(data.data);
        }
    });

    server.io.on("room_view_history_receive", function(data){
        //console.log("room_view_history_receive:" + data);
        if(typeof(data) == 'string') data = JSON.parse(data);
        var _call = server._callback["room_view_receive"];
        if(_call != undefined){
            for(i in data.data){
                _call(data.data[i]);
            }
        }
    });

    server.io.on("vip_view_history_receive", function(data){
        //console.log("room_view_history_receive:" + data);
        if(typeof(data) == 'string') data = JSON.parse(data);
        var _call = server._callback["vip_view_receive"];
        if(_call != undefined){
            for(i in data.data){
                _call(data.data[i]);
            }
        }
    });

    if (typeof window !== "undefined" && window !== null) {
        im.server = server;
    }
}).call(this);
