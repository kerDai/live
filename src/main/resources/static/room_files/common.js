function user_avatar(user_id) {
    if (user_id.length == 18) {
        return "http://navatar.shagualicai.cn/uid/" + user_id;
    } else {
        return "http://navatar.shagualicai.cn/rid/" + user_id;
    }
}
function getLocalTime(nS) {
    var currentTime = (typeof(host_time) != "undefined") ? new Date(host_time * 1000) : new Date;
    var currentD = currentTime.getDate();
    var date = new Date(nS * 1000);
    Y = date.getFullYear();
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    D = date.getDate();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    if(m < 10) m = '0' + m;
    if(h < 10) h = '0' + h;
    if(s < 10) s = '0' + s;
    // console.log(Y + M + D + h + m + s); //呀麻碟
    if(currentD == D){
        return  h + ':' + m;
    //}else if(currentD-1 == D){
    //    return '昨天 ' + ' ' + h + ':' + m ;
    }else{
        return  h +':'+ m +'<span class="date-time">'+Y+'/'+ M +'/'+D+'</span>';
        //return M + '-' + D + ' ' + h + ':' + m;
    }
}

$(function () {
    $(".pop-windows").each(function () {
        var herf = $(this).attr("href");
        $(this).attr("href", "javascript:void(0);");
        $(this).attr("_href", herf);
    });
    $(".pop-windows").on("click", function () {
        // var auth = $.cookie('AUTH');
        var auth = Tool.getCookie("users");
        if(auth == null){
            window.top.layer.msg('请登录！');
        }else{
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
                end: function () {
                }
            });
        }
    });
});