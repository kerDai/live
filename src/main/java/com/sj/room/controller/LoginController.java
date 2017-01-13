package com.sj.room.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sj.room.core.base.AjaxDataResponse;
import com.sj.room.core.base.AjaxResponse;
import com.sj.room.core.util.CookiesUtil;
import com.sj.room.core.util.EncryptUtil;
import com.sj.room.entity.condition.UserCondition;
import com.sj.room.entity.domain.User;
import com.sj.room.service.ILoginService;
import com.sj.room.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    @Autowired
    private IUserService userService;

    @Autowired
    private MessageSource messageSource;

    /**
     * 登录
     * @param mobile
     * @param password
     * @param req
     * @param resp
     * @return
     */
    @PostMapping(value = "/user/sign")
    public Object login(String mobile, String password, HttpServletRequest req, HttpServletResponse resp){
        User user = loginService.login(mobile, password);
        if(user != null){
            try {
                String obj = mapper.writeValueAsString(user);
                CookiesUtil.setCookie(resp, "users", obj);
                CookiesUtil.setCookie(resp, "headUrl", user.getAvatar());
                CookiesUtil.setCookie(resp, "nickname", URLEncoder.encode(user.getNickname(), "UTF-8"));
                req.getSession().setAttribute("loginSession", user);
//                req.setAttribute("loginSession", user);
                return new AjaxDataResponse<>(user);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        String message = this.messageSource.getMessage("message.user.login.no", new Object[]{}, LocaleContextHolder.getLocale());
        return new AjaxResponse(201, message);
    }


    /**
     * 注册
     * @param condition
     * @param req
     * @param resp
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/user/register")
    public Object register(UserCondition condition, HttpServletRequest req, HttpServletResponse resp) throws Exception {
        User user = new User();
        user.setMobile(condition.getMobile());
        if(condition.getPassword().equals(condition.getRePassword())){
            user.setPassword(EncryptUtil.encrypt(condition.getPassword()));
        }else {
            String message = this.messageSource.getMessage("message.user.register.password", new Object[]{}, LocaleContextHolder.getLocale());
            return new AjaxResponse(201, message);
        }
        user.setNickname(condition.getNickname());
        user.setStatus(0);
        User user1 = userService.save(user);

        String obj = mapper.writeValueAsString(user1);
        CookiesUtil.setCookie(resp, "users", obj);
        CookiesUtil.setCookie(resp, "headUrl", user.getAvatar());
        CookiesUtil.setCookie(resp, "nickname", URLEncoder.encode(user.getNickname(), "UTF-8"));
        req.getSession().setAttribute("loginSession", user);

        return new AjaxResponse();
    }

    @GetMapping(value = "/user/logout")
    public Object logout(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        //清除cookie
        CookiesUtil.clearCookie(req, resp, "users");
        CookiesUtil.clearCookie(req, resp, "headUrl");
        CookiesUtil.clearCookie(req, resp, "nickname");
        req.getSession().removeAttribute("loginSession");
        return new AjaxResponse();
    }

}
