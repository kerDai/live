package com.sj.room.controller;

import com.sj.room.core.base.AjaxDataResponse;
import com.sj.room.core.base.AjaxResponse;
import com.sj.room.entity.condition.LiveCondition;
import com.sj.room.entity.domain.Live;
import com.sj.room.entity.domain.LiveDetail;
import com.sj.room.entity.domain.User;
import com.sj.room.entity.dto.LiveDetailDTO;
import com.sj.room.service.ILiveDetailService;
import com.sj.room.service.ILiveService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.orm.jpa.vendor.OpenJpaDialect;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 13:38
 */
@RestController
@RequestMapping(value = "/live")
public class LiveController {

    private static final Logger logger = LoggerFactory.getLogger(LiveController.class);


    @Autowired
    private ILiveService liveService;

    @Autowired
    private ILiveDetailService liveDetailService;

    @Autowired
    private MessageSource messageSource;

    @GetMapping
    public Object getList(LiveCondition condition){
        return liveService.getList(condition);
    }

    @PostMapping
    public Object save(LiveDetailDTO dto, HttpServletRequest req){
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            liveService.saveDetail(dto.getUserId(), dto.getContent());
            return trueMessage(null);
        }
        return noLoginMessage();
    }

    /**
     * 查看当天是否发起直播
     * @param userId
     * @return
     */
    @RequestMapping(value = "/{userId}/exist", method= RequestMethod.GET)
    public Object isExist(@PathVariable long userId, String sort, HttpServletRequest req){
        Live live = liveService.findTodayLive(userId);
        if(live != null){
            if(StringUtils.isNotBlank(sort)){
                if(sort.equals("1")){
                    List<LiveDetail> detailList = liveDetailService.getListTodayAsc(live.getId());
                    return new AjaxDataResponse(detailList);
                }
            }
            List<LiveDetail> detailList = liveDetailService.getListTodayDesc(live.getId());
            return new AjaxDataResponse(detailList);
        }
        return new AjaxResponse();
    }

    @GetMapping(value = "/today/detail")
    public Object detail(HttpServletRequest req){
        User user = (User) req.getSession().getAttribute("loginSession");
        if (user != null) {
            Live live = liveService.findTodayLive(user.getId());
            if(live != null){
                List<LiveDetail> detailList = liveDetailService.getListTodayDesc(live.getId());
                return new AjaxDataResponse(detailList);
            }
            return new AjaxDataResponse(null);
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
