package com.sj.room.controller;

import com.sj.room.api.aliyun.AliyunImage;
import com.sj.room.core.base.AjaxDataResponse;
import com.sj.room.core.base.AjaxResponse;
import com.sj.room.core.util.CookiesUtil;
import com.sj.room.entity.condition.UserCondition;
import com.sj.room.entity.domain.User;
import com.sj.room.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

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

    /**
     * 上传头像
     *
     * @param file
     * @param userId
     * @param request
     * @return
     */
    @PostMapping(value = "/{userId}/avatar")
    public Object avatar(@RequestParam("file") MultipartFile file, @PathVariable long userId, HttpServletRequest request) {
//        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
//        MultipartFile file = multipartRequest.getFile("imgFile");
        String imgPath = AliyunImage.uploadAliyun(file);
        userService.avatar(userId, imgPath);
        return "success";
    }

    /**
     * 修改密码
     *
     * @param userId
     * @param oldPassword
     * @param newPassword
     * @return
     */
    @PostMapping(value = "/{userId}/changepwd")
    public Object changepwd(@PathVariable long userId, String oldPassword, String newPassword) {
        boolean result = userService.changepwd(userId, oldPassword, newPassword);
        if (!result) {
            return this.messageSource.getMessage("message.user.changepwd.nosame", new Object[]{}, LocaleContextHolder.getLocale());
        }
        return "success";
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
            CookiesUtil.clearCookie(req, resp, "nickname");
            CookiesUtil.setCookie(resp, "nickname", URLEncoder.encode(user.getNickname(), "UTF-8"));
            String message = this.messageSource.getMessage("message.user.update.nickname.success", new Object[]{}, LocaleContextHolder.getLocale());
            return new AjaxDataResponse<>(200, message, u);
        }
        String error = this.messageSource.getMessage("message.user.login.error", new Object[]{}, LocaleContextHolder.getLocale());
        return new AjaxResponse(999, error);
    }

    @GetMapping(value = "/{userId}/findOne")
    public Object findOne(@PathVariable long userId, HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            User u = userService.findOne(userId);
            return new AjaxDataResponse<>(u);
        }
        String error = this.messageSource.getMessage("message.user.login.error", new Object[]{}, LocaleContextHolder.getLocale());
        return new AjaxResponse(999, error);
    }

}
