(function ($) {
    $(function () {
        $(".pop-windows").each(function () {
            var herf = $(this).attr("href");
            $(this).attr("href", "javascript:void(0);");
            $(this).attr("_href", herf);
        });
        $(".pop-windows").on("click", function () {
            var popsize = $(this).attr('popsize');
            popsize = popsize.split("*");
            var herf = $(this).attr("_href");
            var title = $(this).attr("title");
            window.top.layer.open({
                title: title,
                type: 2,
                area: popsize,
                fix: false, //不固定
                maxmin: true,
                content: herf,
                end: function(){
                }
            });
        });
        var returnurl = $('.ajax-form').data("returnurl");
        $('.ajax-form').Validform({
            ajaxPost: true,
            tiptype: function (msg, o, cssctl) {
                if (o.type == 2) {
                    o.obj.removeClass('input_error');
                    var tip = o.obj.parent();
                    if(tip[0].tagName != 'TR') tip = tip.parent();
                    if(tip[0].tagName != 'TR') tip = tip.parent();
                    if(tip[0].tagName != 'TR') tip = tip.parent();
                    tip = tip.find('.text-limit');
                    if(tip.length > 0){
                        tip.hide();
                    }
                } else {
                    if(o.obj[0].tagName != 'FORM'){
                        o.obj.addClass('input_error');
                        var tip = o.obj.parent();
                        if(tip[0].tagName != 'TR') tip = tip.parent();
                        if(tip[0].tagName != 'TR') tip = tip.parent();
                        if(tip[0].tagName != 'TR') tip = tip.parent();
                        tip = tip.find('.text-limit');
                        if(tip.length == 0){
                            window.top.layer.msg(msg);
                        }else{
                            tip.text(msg);
                            tip.show();
                        }
                    }
                }
            },
            callback: function (data) {
                if (data.code == 1) {
                    window.top.layer.msg(data.info, {
                        icon: 1,
                        time: 600
                    }, function () {
                        if(window.self != window.top){
                            window.self.location.reload();
                            window.top.layer.closeAll();
                        }else{
                            if(undefined != returnurl){
                                window.self.location.href = returnurl;
                            }else{
                                window.self.location.reload();
                            }
                        }
                    });
                } else {
                    window.top.layer.msg(data.info);
                }
            }
        });
    });
})(jQuery);