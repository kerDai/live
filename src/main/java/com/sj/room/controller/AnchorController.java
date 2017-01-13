package com.sj.room.controller;

import com.sj.room.core.base.AjaxDataResponse;
import com.sj.room.core.base.AjaxResponse;
import com.sj.room.entity.condition.AnchorCondition;
import com.sj.room.entity.domain.Anchor;
import com.sj.room.entity.domain.Live;
import com.sj.room.entity.domain.User;
import com.sj.room.service.IAnchorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 主播申请
 * Created by duanke
 * Date: 2016/12/29.
 * Time: 14:39
 */
@RestController
@RequestMapping(value = "/anchor")
public class AnchorController {

    private static final Logger logger = LoggerFactory.getLogger(AnchorController.class);

    @Autowired
    private IAnchorService anchorService;

    @Autowired
    private MessageSource messageSource;

    @PostMapping
    public Object save(Anchor anchor, HttpServletRequest req){
        String message = "";
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            if(user.getMobile().equals(anchor.getMobile())){
                Anchor temp = anchorService.findByMobile(anchor.getMobile());
                if(temp == null){
                    anchor.setStatus(0);
                    anchorService.save(anchor);
                    return trueMessage(null);
                }
                message = this.messageSource.getMessage("message.anchor.register.repeat", new Object[]{}, LocaleContextHolder.getLocale());
                return new AjaxResponse(201, message);
            }
            message = this.messageSource.getMessage("message.anchor.register.mobile.nosame", new Object[]{}, LocaleContextHolder.getLocale());
            return new AjaxResponse(202, message);
        }
        return noLoginMessage();
    }

    @GetMapping
    public Object findPage(AnchorCondition condition){
        return anchorService.findPage(condition);
    }


    @GetMapping(value = "/{mobile}/findMobile")
    public Object findMobile(@PathVariable String mobile){
        Anchor anchor = anchorService.findByMobile(mobile);
        return new AjaxDataResponse<>(anchor);
    }


    @GetMapping(value = "/{id}/findOne")
    public Object findOne(@PathVariable long id){
        Anchor anchor = anchorService.findOne(id);
        return new AjaxDataResponse<>(anchor);
    }

    /**
     * 修改房间标题
     * @param anchor
     * @param req
     * @return
     */
    @PostMapping(value = "/title")
    public Object updateRoomName(Anchor anchor, HttpServletRequest req){
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            Anchor obj = anchorService.findByUserId(user.getId());
            if(obj != null){
                anchorService.updateRoomName(user.getId(), obj.getId(), anchor.getRoomName());
                return trueMessage(null);
            }else {
                String nodata = this.messageSource.getMessage("message.anchor.finduser.data", new Object[]{}, LocaleContextHolder.getLocale());
                return new AjaxResponse(201, nodata);
            }
        }
        return noLoginMessage();
    }

    /**
     * 更新主播排名
     * @param anchor
     * @param req
     * @return
     */
    @PostMapping(value = "/update/total")
    public Object updateTotal(Anchor anchor, HttpServletRequest req){
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            anchorService.updateTotal(anchor.getId(), anchor.getTotalProfit(), anchor.getTotalRetreat(), anchor.getTotalWin());
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
