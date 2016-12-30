package com.sj.room.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 13:38
 */
@Controller
public class IndexController {


    @RequestMapping(value = "/center", method= RequestMethod.GET)
    public String list(){
        return "/center/index";
    }



    @GetMapping(value = "/login")
    public String login(){
        return "/login";
    }


}
