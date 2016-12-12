package com.sj.room.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 13:38
 */
@RestController
@RequestMapping(value = "/live")
public class LiveController {



    @RequestMapping( method= RequestMethod.GET)
    public String list(){
        return "123";
    }


}
