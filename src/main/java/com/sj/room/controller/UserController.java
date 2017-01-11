package com.sj.room.controller;

import com.sj.room.core.base.AjaxDataResponse;
import com.sj.room.core.base.AjaxResponse;
import com.sj.room.entity.condition.AnchorCondition;
import com.sj.room.entity.condition.UserCondition;
import com.sj.room.entity.domain.User;
import com.sj.room.entity.dto.PasswordDTO;
import com.sj.room.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;

/**
 * 用户
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 15:53
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private IUserService userService;

    @GetMapping
    public Object findPage(UserCondition condition){
        return userService.findPage(condition);
    }

    /**
     * 上传头像
     * @param avatar
     * @param id
     * @param req
     * @return
     */
    @PostMapping(value = "/update/avatar")
    public Object avatar(@RequestParam("avatar") String avatar, @RequestParam("id") Long id, HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            userService.avatar(id, avatar);
            return trueMessage(null);
        }
        return noLoginMessage();
    }

    /**
     * 修改用户状态
     * @param id
     * @param status
     * @param req
     * @return
     */
    @PostMapping(value = "/{id}/{status}/status")
    public Object updateStatus(@PathVariable long id, @PathVariable Integer status, HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            userService.updateStatus(status, id);
            return trueMessage(null);
        }
        return noLoginMessage();
    }

    /**
     * 修改密码
     * @param dto
     * @return
     */
    @PostMapping(value = "/update/changepwd")
    public Object changepwd(PasswordDTO dto, HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            boolean result = userService.changepwd(dto.getId(), dto.getOldpass(), dto.getNewtwopass());
            if (result) {
                return trueMessage(null);
            }
            String message = this.messageSource.getMessage("message.user.changepwd.nosame", new Object[]{}, LocaleContextHolder.getLocale());
            return new AjaxResponse(201, message);
        }
        return noLoginMessage();
    }

    /**
     * 修改昵称
     *
     * @param condition
     * @return
     */
    @PostMapping(value = "/update/nickname")
    public Object updateNickname(UserCondition condition, HttpServletRequest req, HttpServletResponse resp) throws UnsupportedEncodingException {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            User u = userService.updateNickname(condition.getNickname(), condition.getId());
//            CookiesUtil.clearCookie(req, resp, "nickname");
//            CookiesUtil.setCookie(resp, "nickname", URLEncoder.encode(user.getNickname(), "UTF-8"));
            return trueMessage(u);
        }
        return noLoginMessage();
    }

    /**
     * 根据ID获取用户信息
     * @param userId
     * @param req
     * @return
     */
    @GetMapping(value = "/{userId}/findOne")
    public Object findOne(@PathVariable long userId, HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            User u = userService.findOne(userId);
            return new AjaxDataResponse<>(u);
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
