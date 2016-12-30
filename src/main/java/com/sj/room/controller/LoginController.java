package com.sj.room.controller;

import com.sj.room.service.ILoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 登录
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 16:23
 */
@Controller
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);


    @Autowired
    private ILoginService loginService;

    @PostMapping(value = "/live/login")
    @RequestMapping
    public Object login(String mobile, String password){
        boolean result = loginService.login(mobile, password);
        if(result){
            return "/index";
        }
        return "";
    }

}
