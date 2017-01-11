package com.sj.room.controller;

import com.sj.room.core.base.AjaxDataResponse;
import com.sj.room.core.base.AjaxResponse;
import com.sj.room.entity.condition.LiveClassifyCondition;
import com.sj.room.entity.domain.Anchor;
import com.sj.room.entity.domain.LiveClassify;
import com.sj.room.entity.domain.User;
import com.sj.room.service.ILiveClassifyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 直播分类
 * Created by duanke
 * Date: 2017/1/11.
 * Time: 15:39
 */
@RestController
@RequestMapping(value = "/classify")
public class LiveClassifyController {

    private static final Logger logger = LoggerFactory.getLogger(AnchorController.class);

    @Autowired
    private ILiveClassifyService liveClassifyService;

    @Autowired
    private MessageSource messageSource;

    @GetMapping
    public Object findPage(LiveClassifyCondition condition){
        return liveClassifyService.findPage(condition);
    }

    @PostMapping
    public Object save(LiveClassify liveClassify, HttpServletRequest req){
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            liveClassifyService.save(liveClassify);
            return trueMessage(null);
        }
        return noLoginMessage();
    }

    private Object noLoginMessage() {
        String error = this.messageSource.getMessage("message.user.login.error", new Object[]{}, LocaleContextHolder.getLocale());
        return new AjaxResponse(999, error);
    }

    private Object trueMessage(Object u) {
        String message = this.messageSource.getMessage("message.user.success", new Object[]{}, LocaleContextHolder.getLocale());
        return new AjaxDataResponse<>(200, message, u);
    }

}
