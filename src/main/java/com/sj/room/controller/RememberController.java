package com.sj.room.controller;

import com.sj.room.entity.domain.Anchor;
import com.sj.room.entity.domain.Remember;
import com.sj.room.service.IAnchorService;
import com.sj.room.service.IRememberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 关注
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 14:59
 */
@RestController
@RequestMapping(value = "/remember")
public class RememberController {

    private static final Logger logger = LoggerFactory.getLogger(RememberController.class);

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private IRememberService rememberService;

    @PostMapping
    public Object save(Remember remember){
        String repeat = this.messageSource.getMessage("message.remember.save.repeat", new Object[]{}, LocaleContextHolder.getLocale());
        if(remember != null){
            Remember temp = rememberService.findByFromIdAndToId(remember.getFromId(), remember.getToId());
            if(temp == null){
                rememberService.save(remember);
                return "success";
            }
        }
        return repeat;
    }
}
