package com.sj.room.api.sms;

/**
 * url
 * Created by duanke
 * Date: 2016/12/27.
 * Time: 9:43
 */
public final class URIConstants {

    //查账户信息的http地址
    public final static String URI_GET_USER_INFO = "https://sms.yunpian.com/v2/user/get.json";

    //智能匹配模板发送接口的http地址
    public final static String URI_SEND_SMS = "https://sms.yunpian.com/v2/sms/single_send.json";

    //模板发送接口的http地址
    public final static String URI_TPL_SEND_SMS = "https://sms.yunpian.com/v2/sms/tpl_single_send.json";

    //发送语音验证码接口的http地址
    public final static String URI_SEND_VOICE = "https://voice.yunpian.com/v2/voice/send.json";

    //绑定主叫、被叫关系的接口http地址
    public final static String URI_SEND_BIND = "https://call.yunpian.com/v2/call/bind.json";

    //解绑主叫、被叫关系的接口http地址
    public final static String URI_SEND_UNBIND = "https://call.yunpian.com/v2/call/unbind.json";

    //添加模板
    public final static String URI_ADD_TPL = "https://sms.yunpian.com/v2/tpl/add.json";

    //编码格式。发送编码格式统一用UTF-8
    public final static String ENCODING = "UTF-8";

}
