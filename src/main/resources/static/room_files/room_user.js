/**
 * Created by wenliang on 2016/5/7.
 */

$(function () {
    this_ctime = '';
    layer.config({
        extend: 'extend/layer.ext.js'
    });
    msg = {
        reply: function(chat_id, nick_name){
            $("#room_talk_post").focus();
            $("#room_talk_post").val("@" + nick_name + ":");
            $("#reply_user_nickname").val("@" + nick_name + ":");
            $("#reply_chat_id").val(chat_id);
        },
        close: function(nick, room_id){
            window.top.layer.open({
                title: '黑名单',
                type: 2,
                area: ['400px', '800px'],
                fix: false, //不固定
                maxmin: true,
                content: 'http://'+host_passport+'/master_studio/black-sid-'+room_id+'-nick-'+nick,
                end: function () {
                }
            });
        },
        remove: function(chat_id){
            window.top.layer.open({
                title: '删除消息',
                type: 2,
                area: ['400px', '200px'],
                fix: false, //不固定
                maxmin: true,
                content: 'http://'+host_passport+'/master_studio/delmsg-id-'+chat_id,
                end: function () {
                }
            });
        },
        removemsg: function(chat_id){
            $(".comment-item[data-id="+chat_id+"]").remove();
        },
        message_rander: function(data, islast){
            //console.log(data);
            if(typeof(data.data) == 'undefined'){
                data.data = "";
            }
            if (data.data != "" && data.data != "{}") {
                var hdata = JSON.parse(data.data);
            } else {
                var hdata = {text: [data.content]};
            }

            if (data.type == "chat.text" || data.type == 'view.text') {
                var html = hdata.text.join("</p><p>");
                html = "<p>" + html + "</p>";
                var style = "";
                if (hdata.style['color'] != undefined) {
                    style = style + "color: " + hdata.style['color'] + ";";
                }
                if (hdata.style['font_size'] != undefined) {
                    style = style + "font-size: " + hdata.style['font_size'] + ";";
                }
                if (hdata.style['background_color'] != undefined) {
                    style = style + "background-color: " + hdata.style['background_color'] + ";";
                }
                if (hdata.style['text_decoration'] != undefined) {
                    style = style + "text-decoration: " + hdata.style['text_decoration'] + ";";
                }
                if (hdata.style['bold'] != undefined && hdata.style['bold'] == 1) {
                    style = style + "font-weight: bold;";
                }
                var imgs = '';
                if (hdata.img.length > 0) {
                    imgs = hdata.img.join("'><img src='");
                    imgs = "<img src='" + imgs + "'>";
                    imgs = "<p>" + imgs + "</p>";
                }
                html = "<div style='" + style + "'>" + html + imgs + "</div>";
            } else if (data.type == 'notice.answer.add') {
                var html = "<div class='ask-reply-box f-cb'><div class='studio-ar-con'><p style='color: #313131;'><span class='studio-ask'>？</span>" + hdata.ask_nickname + ": " + "<a href='http://www.shagualicai.cn/answer/info-aid-"+ hdata.ask_id +".shtml' target='_blank'>"+ hdata.ask_content +"</a>" + "</p><p class='f-cl8'><span class='studio-reply'></span>播主:" + hdata.answer_content + "</p></div></div>";
            } else if (data.type == 'notice.kit.addcontent') {
                var html = '<p><i class="updata-icon"></i> 播主 更新了策略<a target="_blank" class="c-video-title" href="http://www.shagualicai.cn/tactics/'+ hdata.kit_id +'.shtml">《'+ hdata.kit_name +'》</a><!--<span class="money-tip f-ml15">￥</span><span class="tag-tip f-ml15">更新</span>--></p><!--<p class="f-fs16 f-cl8 f-mt5">更新了新内容。</p>-->';
                //var html = "<div><p>策略<a class='f-cl3'>《" + hdata.kit_name + "》</a> 更新了新内容</p></div>";
            } else if (data.type == 'notice.rcstock.add') {
                var html = "<div class='ask-reply-box f-cb'><div class='studio-ar-con'><p style='color: #313131;'><span class='studio-focus'></span>关注了股票: <span class='f-cl3'>" + hdata.stock + "</span></p><p class='f-cl8'><span class='studio-focus-reason'></span>关注的理由: " + hdata.reason + "</p></div></div>";
            } else if (data.type == 'notice.kit.add') {
                var html = "<div><p><i class='updata-icon'></i> 播主 发布了策略: <a class='c-video-title' href='http://www.shagualicai.cn/tactics/"+ hdata.kit_id +".shtml' target='_blank'>《" + hdata.kit_name + "》</a></p><p>" + hdata.kit_desc + "</p></div>";
            } else if (data.type == 'notice.gift.buy') {
                if(islast == false){
                    gift.addgiftlist(hdata.nick_name, hdata.num, hdata.name, 'http://navatar.shagualicai.cn/gid/' + hdata.gid);
                }
                var html = "<span class='f-cl0'>礼物：</span><span class='f-cl6'>" + hdata.nick_name + "</span>送给播主<span class='f-cl6'> <img src='http://navatar.shagualicai.cn/gid/" + hdata.gid+"'> </span><span class='f-cl0'> x " + hdata.num + "</span>";
            } else if (data.type == 'notice.course.add') {
                var html = "<div><p><i class='updata-icon'></i><a href='http://www.shagualicai.cn/course/"+hdata.course_id+".shtml' target='_blank'>" + data.content + "</a></p></div>";
            }else if(data.type == "notice.zhibo.open"){
                var title = "'"+hdata.title+"'";
                var html = '<div class="f-cb"> <div class="f-fl video-msg-icon"></div>' +
                    ' <div class="f-fl f-ml10"> <p>' +
                    '<span class="f-cl8 f-mr10">'+hdata.room_name+'</span>开始视频直播<a class="c-video-title" onclick="openwindow('+hdata.live_id+','+title+')">《'+hdata.live_title+'》</a></p> </div> </div>';
            } else {
                var html = "<div><p>" + data.content + "</p></div>";
            }
            return html;
        },
        chat_rander: function(data, islast){
            if (room.master_user_id == data.user_id) {
                data.snick_name = data.nick_name + '<span class="chat-role">播主</span>';
            }
            else if (room.manager_user_ids.indexOf(data.user_id) > -1) {
                data.snick_name = data.nick_name + '<span class="chat-role">房管</span>';
            }
            else if (room.super_user_ids.indexOf(data.user_id) > -1) {
                data.snick_name = data.nick_name + '<span class="chat-role">超管</span>';
            }
            else {
                data.snick_name = data.nick_name;
            }

            var temp = "";
            if(data.user_id == '1000000'){
                //系统消息
                temp = $(".template-chat-notice-gift-buy").html();
                temp = temp.replace(/\[chat_id\]/g, data.id);
                temp = temp.replace(/\[content\]/g, msg.message_rander(data, islast));
            }else{
                var reply_temp = '';
                if (data.reply_item != undefined) {
                    //有回复
                    reply_temp = $(".template-chat-text-reply").html();
                    reply_temp = reply_temp.replace(/\[rchat_id\]/g, data.reply_item.id);
                    reply_temp = reply_temp.replace(/\[ravatar\]/g, user_avatar(data.reply_item.user_id));
                    reply_temp = reply_temp.replace(/\[rcontent\]/g, msg.message_rander(data.reply_item, islast));
                    reply_temp = reply_temp.replace(/\[rctime\]/g, getLocalTime(data.reply_item.ctime));
                    reply_temp = reply_temp.replace(/\[rnick_name\]/g, data.reply_item.nick_name);
                }
                if(data.user_id == user_id){
                    //我发的消息
                    temp = $(".template-chat-text-my").html();
                }else{
                    //别人发的消息
                    temp = $(".template-chat-text-other").html();
                }
                temp = temp.replace(/\[chat_id\]/g, data.id);
                temp = temp.replace(/\[avatar\]/g, user_avatar(data.user_id));
                temp = temp.replace(/\[content\]/g, msg.message_rander(data, islast));
                temp = temp.replace(/\[ctime\]/g, getLocalTime(data.ctime));
                temp = temp.replace(/\[nick_name\]/g, data.nick_name);
                temp = temp.replace(/\[user_id\]/g, data.user_id);
                temp = temp.replace(/\[snick_name\]/g, data.snick_name);
                temp = temp.replace(/\[reply\]/g, reply_temp);
            }
            return temp;
        },
        view_rander: function(data, islast){
            var temp_systag = '';
            if (data.user_id == '1000000') {
                temp_systag = $(".template-view-text-systag").html();
            }
            if (data.type == "chat.text" || data.type == 'view.text') {
                var temp = $(".template-view-text").html();
            }else{
                var temp = $(".template-view-text-o").html();
            }
            this_ctime = getLocalTime(data.ctime);
            temp = temp.replace(/\[view_id\]/g, data.id);
            temp = temp.replace(/\[avatar\]/g, user_avatar(data.user_id));
            temp = temp.replace(/\[content\]/g, msg.message_rander(data, islast));
            temp = temp.replace(/\[ctime\]/g, this_ctime);
            temp = temp.replace(/\[nick_name\]/g, data.nick_name);
            temp = temp.replace(/\[snick_name\]/g, data.snick_name);
            temp = temp.replace(/\[systag\]/g, temp_systag);
            return temp;
        },
        new_ask: function (data){
            var b = $('.master-reply-question');
            if(b.find('.msg-tag').length < 1){
                b.append(' <i class="msg-tag">1</i>');
            }else{
                var c = b.find('.msg-tag').text();
                c = parseInt(c) + 1;
                b.find('.msg-tag').text(c);
            }
        },
        view_img_thumb:function(img){
            //$(".studio-main .talk-item-txt img").unbind('click').on("click", function(){
                var src = $(img).attr("src");
                var pjson = {
                    "title": "", //相册标题
                    "id": 0, //相册id
                    "start": 0, //初始显示的图片序号，默认0
                    "shift":-1,
                    "data": [   //相册包含的图片，数组格式
                        {
                            "alt": "",
                            "pid": 0, //图片id
                            "src": src, //原图地址
                            "thumb": src //缩略图地址
                        }
                    ],
                };
                layer.photos({
                    photos: pjson
                });
            //});
        },
        show_window:function(herf){
            window.top.layer.open({
                title: ' ',
                shade: 0,
                type: 2,
                area: ['600px', '450px'],
                fix: false,
                maxmin: true,
                content: herf,
                end: function () {
                }
            });
        }
    };

    var chat_is_loading = false;
    var view_is_loading = false;

    im.server.login();
    im.server.join_room(room.sid);

    //个人消息
    im.server.on("user_receive", function (data) {
        if (typeof(data) == 'string') data = JSON.parse(data);
        if(data.type == 'notice.ask.add'){
            msg.new_ask(data);
        }
    });

    //重连
    im.server.on("reconnect", function () {
        $(".chat-zone").children(0).html("");
        $(".view-zone").children(0).html("");
        im.server.login();
        im.server.join_room(room.sid);
    });

    //加入房间结果
    im.server.on("join_room_result", function (data) {
        if (typeof(data) == 'string') data = JSON.parse(data);
        if(data.code != 1){
            layer.msg('加入房间失败');
        }
    });

    //发送消息结果
    im.server.on("room_chat_result", function (data) {
        if (typeof(data) == 'string') data = JSON.parse(data);
        if(data.code == -99){
            layer.msg('哥，您还没有登陆呢！');
        }else if(data.code == -100){
            layer.msg('您已经被禁止发言了！');
        }else{
            if(data.code != 1){
                layer.msg('发送消息失败，请刷新重试！');
            }
        }
    });

    im.server.on("room_view_result", function (data) {
        if (typeof(data) == 'string') data = JSON.parse(data);
        if(data.code == -99){
            layer.msg('哥，您还没有登陆呢！！！');
        }else{
            if(data.code != 1){
                layer.msg('发送消息失败，请刷新重试！');
            }
        }
    });

    //收到房间互动
    im.server.on("room_chat_receive", function (data) {
        if (typeof(data) == 'string') data = JSON.parse(data);
        if(data.topic == 'room.'+room.sid+'.chat'){
            playSound(document.getElementById("myAudio"));
            var temp = msg.chat_rander(data, false);
            var user_talk_list = $(".chat-zone");

            var st = parseInt(user_talk_list.scrollTop());
            var sh = parseInt(user_talk_list.height());
            var ch = parseInt(user_talk_list.children(0).height());
            temp = $(temp);
            temp.emoji();
            user_talk_list.children(0).append(temp);
            if(ch < st + sh) {
                user_talk_list.stop().animate({scrollTop: user_talk_list.children(0).height() + 2000}, 1500);
            }
        }else{
            //其他房间的消息
        }
    });

    //收到房间消息
    im.server.on("room_view_receive", function (data) {
        if (typeof(data) == 'string') data = JSON.parse(data);
        if(data.topic == 'room.'+room.sid+'.view') {
            playSound(document.getElementById("myAudio"));
            var temp = msg.view_rander(data, false);
            var master_view_list = $(".view-zone");
            var last_time = master_view_list.children(0).find(".talk-item:last-child").find(".ctime").text();
            if(last_time.length > 6 && this_ctime.length < 7){
                temp = $(".template-view-text-h").html() + temp;
            }

            var st = parseInt(master_view_list.scrollTop());
            var sh = parseInt(master_view_list.height());
            var ch = parseInt(master_view_list.children(0).height());
            temp = $(temp);
            temp.emoji();
            temp.find("img").attr("onclick", "msg.view_img_thumb(this);");
            master_view_list.children(0).append(temp);
            if(ch < st + sh){
                master_view_list.stop().animate({scrollTop: master_view_list.children(0).height() + 2000}, 1500);
            }
            //msg.view_img_thumb();
        }else{
            //其他房间的消息
        }
    });

    //收到声音
    im.server.on("room_view_receive_sound", function (data) {
        //playSound(document.getElementById("myAudio"));
    });
    //收到声音
    im.server.on("room_chat_receive_sound", function (data) {
        //playSound(document.getElementById("myAudio"));
    });

    //互动区滚动
    $(".chat-zone").scroll(function () {
        var user_talk_list = $(".chat-zone");
        if (!chat_is_loading) {
            if ($(this).scrollTop() == 0) {
                //加载上一页
                var last_id = $(this).find(".comment-item:first-child").data("id");
                var pdata = {topic: "room." + room.sid + ".chat", direct: 'old', msgid: last_id};
                chat_is_loading = true;
                $.ajax({
                    type: 'post',
                    url: "http://" + host_api + "/public_chat/getlastmsglist/host/www.shtml",
                    data: pdata,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (data) {
                        chat_is_loading = false;
                        if (data.code == 1) {
                            da = data.data;
                            if (typeof(da) == 'string') da = JSON.parse(da);
                            da = da.reverse();
                            for (i in da) {
                                var temp = msg.chat_rander(da[i], true);
                                temp = $(temp);
                                temp.emoji();
                                user_talk_list.children(0).prepend(temp);
                            }
                            var liTemps = user_talk_list.find(".comment-item:lt(" + da.length + ")");
                            var scrollTop = function () {
                                var _scrollTop = 0;
                                liTemps.each(function () {
                                    _scrollTop += $(this).outerHeight(true)
                                });
                                return _scrollTop;
                            };
                            user_talk_list.stop().animate({scrollTop: scrollTop()}, 0);
                        }
                    },
                    failureCallback: function () {
                        chat_is_loading = false;
                        layer.msg('error!');
                    },
                    dataType: "json"
                });
            }
        }
    });

    //观点区滚动
    $(".view-zone").scroll(function () {
        var master_view_list = $(".view-zone");
        if ($(this).scrollTop() == 0) {
            if (!view_is_loading) {
                //加载上一页
                var last_id = $(this).find(".talk-item:first-child").data("id");
                var pdata = {topic: "room." + room.sid + ".view", direct: 'old', msgid: last_id};
                view_is_loading = true;
                $.ajax({
                    type: 'post',
                    url: "http://" + host_api + "/public_chat/getlastmsglist/host/www.shtml",
                    data: pdata,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (data) {
                        view_is_loading = false;
                        if (data.code == 1) {
                            da = data.data;
                            if (typeof(da) == 'string') da = JSON.parse(da);
                            da = da.reverse();
                            for (i in da) {
                                var temp = msg.view_rander(da[i], true);
                                var last_time = master_view_list.children(0).find(".talk-item:first-child").find(".ctime").text();
                                if(last_time.length < 7 && this_ctime.length > 6){
                                    temp = temp + $(".template-view-text-h").html();
                                }
                                temp = $(temp);
                                temp.emoji();
                                temp.find("img").attr("onclick", "msg.view_img_thumb(this);");
                                master_view_list.children(0).prepend(temp);
                            }
                            var liTemps = master_view_list.find(".talk-item:lt(" + da.length + ")");
                            var scrollTop = function () {
                                var _scrollTop = 0;
                                liTemps.each(function () {
                                    _scrollTop += $(this).outerHeight(true)
                                });
                                return _scrollTop;
                            };
                            master_view_list.stop().animate({scrollTop: scrollTop()}, 0);
                            //msg.view_img_thumb();
                        }
                    },
                    failureCallback: function () {
                        view_is_loading = false;
                        layer.msg('error!');
                    },
                    dataType: "json"
                });
            }
        }
    });

    //ctrl + enter 发送消息
    $(window).keydown(function(event){
        if (event.ctrlKey && event.keyCode == 13){
            if($("#room_talk_post").is(":focus")){
                $('#room_talk_post_ok').trigger("click");
            }
        }
    });

    //关注
    $(".focus-btn").click(function(){
        var sid = $(this).data('sid');
        $.post("/studio/addfocus-sid-"+sid,{ sid:sid },function(data){
            layer.msg(data.info);
            if(data.code > 0){
                window.location.reload();
            }
        },"json");
    });
});