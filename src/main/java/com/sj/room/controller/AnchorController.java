package com.sj.room.controller;

import com.sj.room.entity.condition.AnchorCondition;
import com.sj.room.entity.domain.Anchor;
import com.sj.room.entity.domain.Live;
import com.sj.room.service.IAnchorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public Object save(Anchor anchor){
        Anchor temp = anchorService.findByMobile(anchor.getMobile());
        if(temp == null){
            anchorService.save(anchor);
        }
        return "";
    }

    @GetMapping
    public Object findPage(AnchorCondition condition){
        return anchorService.findPage(condition);
    }

    @GetMapping(value = "/{id}/{status}")
    public void updateStatus(@PathVariable long id, @PathVariable Integer status){
        anchorService.updateStatus(status, id);
    }

}
