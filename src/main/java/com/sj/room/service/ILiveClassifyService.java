package com.sj.room.service;

import com.sj.room.entity.condition.LiveClassifyCondition;
import com.sj.room.entity.domain.LiveClassify;
import org.springframework.data.domain.Page;

/**
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 13:50
 */
public interface ILiveClassifyService {

    Page<LiveClassify> findPage(LiveClassifyCondition condition);

    void save(LiveClassify liveClassify);

}
