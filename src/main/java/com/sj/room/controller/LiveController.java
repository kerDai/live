package com.sj.room.controller;

import com.sj.room.entity.condition.LiveCondition;
import com.sj.room.entity.domain.Live;
import com.sj.room.service.ILiveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.orm.jpa.vendor.OpenJpaDialect;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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

    private static final Logger logger = LoggerFactory.getLogger(LiveController.class);


    @Autowired
    private ILiveService liveService;

    @RequestMapping( method= RequestMethod.GET)
    public Object getList(LiveCondition condition){
        return liveService.getList(condition);
    }

    @RequestMapping(method=RequestMethod.POST)
    public Object save(Live live){
        Live temp = liveService.findTodayLive(live.getUserId());
        if(temp == null){
            liveService.save(live);
        }

        return "";
    }

    /**
     * 查看当天是否发起直播
     * @param userId
     * @return
     */
    @RequestMapping(value = "/{userId}/exist", method= RequestMethod.GET)
    public Object isExist(@PathVariable long userId){
        return liveService.findTodayLive(userId);
    }


    /**
     * 多表关联查询   前台page传递页码
     * @param pageable
     * @param role
     * @return
     */
    @RequestMapping(value = "/many", method=RequestMethod.GET)
    public Page<Live> getEntryByPageable(@PageableDefault(value = 2, sort = { "id" }, direction = Sort.Direction.DESC)
                                             Pageable pageable, @RequestParam(value = "role", defaultValue = "") String role) {
//        Pageable pageable1 = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize());
        long classifyId = 1;
        return liveService.findClassifyPage(classifyId , pageable);
    }

}
