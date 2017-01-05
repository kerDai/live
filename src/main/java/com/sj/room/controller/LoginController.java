package com.sj.room.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sj.room.core.base.AjaxDataResponse;
import com.sj.room.core.util.CookiesUtil;
import com.sj.room.entity.domain.User;
import com.sj.room.service.ILoginService;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.net.URLEncoder;

/**
 * 登录
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 16:23
 */
@RestController
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private ILoginService loginService;

    @PostMapping(value = "/user/sign")
    public Object login(String mobile, String password, HttpServletRequest req, HttpServletResponse resp){
        User user = loginService.login(mobile, password);
        if(user != null){
            try {
                String obj = mapper.writeValueAsString(user);
                CookiesUtil.setCookie(resp, "users", obj);
                CookiesUtil.setCookie(resp, "headUrl", user.getAvatar());
//                CookiesUtil.setCookie(resp, "nickname", user.getNickname());
//                CookiesUtil.setCookie(resp, "nickname", URLEncoder.encode(user.getNickname(), "UTF-8"));
                req.getSession().setAttribute("loginSession", user);
//                req.setAttribute("loginSession", user);
                return new AjaxDataResponse<>(user);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return "error";
    }

}
