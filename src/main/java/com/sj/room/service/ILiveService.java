package com.sj.room.service;

import com.sj.room.entity.condition.LiveCondition;
import com.sj.room.entity.domain.Live;
import org.springframework.data.domain.Page;

/**
 * 发起直播
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 13:50
 */
public interface ILiveService {


    Page<Live> findPage(LiveCondition condition);

    void save(Live live);

}
