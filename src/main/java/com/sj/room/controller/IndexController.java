package com.sj.room.controller;

import com.sj.room.entity.domain.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 13:38
 */
@Controller
public class IndexController {

    @GetMapping(value = "/web/center")
    public String center(HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            return "/web/center";
        }
        return "/login";
    }

    @GetMapping(value = "/web/password")
    public String password(HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            return "/web/password";
        }
        return "/login";
    }

    @GetMapping(value = "/web/avatar")
    public String avatar(HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            return "/web/avatar";
        }
        return "/login";
    }

    @GetMapping(value = "/web/apply")
    public String apply(HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            return "/web/apply";
        }
        return "/login";
    }

    @GetMapping(value = "/web/remember")
    public String remember(HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            return "/web/remember";
        }
        return "/login";
    }

    @GetMapping(value = "/web/quest")
    public String quest(HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            return "/web/quest";
        }
        return "/login";
    }


}
