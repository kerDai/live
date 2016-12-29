package com.sj.room.api.sms;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static com.yunpian.sdk.util.HttpUtil.post;


/**
 * 云片短信接口
 * Created by duanke
 * Date: 2016/12/27.
 * Time: 9:41
 */
@RestController

public class SmsApi {



    @Value("${yunpian.api.key}")
    private String APIKEY;


    private final static String apikey = "ebbc6d4240c253a574adce37bd0c3820 ";


    @GetMapping(value = "/info")
    public static String getUserInfo(String apikey) throws Exception {
        Map<String, String> params = new HashMap<String, String>();
        params.put("apikey", apikey);
        return post(URIConstants.URI_GET_USER_INFO, params);
    }


    @GetMapping(value = "/add")
    public static String addTpl(String apikey) throws Exception {
        Map<String, String> params = new HashMap<String, String>();
        Integer notify_type = 0;
        params.put("apikey", apikey);
        params.put("tpl_content", "【圈子财经】您的验证码是#code#");
        params.put("notify_type", "1");
        return post(URIConstants.URI_ADD_TPL, params);
    }

    /**
     * 通过模板发送短信(不推荐)
     *
     * @param apikey    apikey
     * @param tpl_id    　模板id
     * @param tpl_value 　模板变量值
     * @param mobile    　接受的手机号
     * @return json格式字符串
     * @throws Exception
     */
    public static String tplSendSms(String apikey, long tpl_id, String tpl_value, String mobile) throws Exception {
        Map<String, String> params = new HashMap<String, String>();
        params.put("apikey", apikey);
        params.put("tpl_id", String.valueOf(tpl_id));
        params.put("tpl_value", tpl_value);
        params.put("mobile", mobile);
        return post(URIConstants.URI_TPL_SEND_SMS, params);
    }

    public static String singleSend(String apikey, String text, String mobile) throws Exception {
        Map<String, String> params = new HashMap<String, String>();//请求参数集合
        params.put("apikey", apikey);
        params.put("text", text);
        params.put("mobile", mobile);
        return post("https://sms.yunpian.com/v2/sms/single_send.json", params);//请自行使用post方式请求,可使用Apache HttpClient
    }

    public static void main(String[] args) throws Exception{
//        getUserInfo(apikey);

//        String tpl_value = URLEncoder.encode("#code#",URIConstants.ENCODING) +"="
//                + URLEncoder.encode("1234", URIConstants.ENCODING);
//        String result = tplSendSms(apikey, 1677662, tpl_value, "13917466694");

//        addTpl(apikey);


        singleSend(apikey, "您的验证码是12349", "13917466694");

    }

}
