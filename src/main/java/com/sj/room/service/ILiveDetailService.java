package com.sj.room.service;

import com.sj.room.entity.condition.LiveDetailCondition;
import com.sj.room.entity.domain.LiveDetail;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 直播明细
 * Created by duanke
 * Date: 2017/1/12.
 * Time: 18:12
 */
public interface ILiveDetailService {


    Page<LiveDetail> findPage(LiveDetailCondition condition);

    List<LiveDetail> getListToday(Long liveId);

}
