package com.sj.room.entity.condition;

import com.sj.room.core.base.PageAndSortCondition;

/**
 * 直播明细代理类
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 11:05
 */
public class LiveDetailCondition extends PageAndSortCondition {

    private Long id;

    private Long liveId;


    @Override
    protected String getDefaultSort() {
        return "id_1";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLiveId() {
        return liveId;
    }

    public void setLiveId(Long liveId) {
        this.liveId = liveId;
    }
}
