package com.sj.room.entity.condition;

import com.sj.room.core.base.PageAndSortCondition;

/**
 * 关注代理类
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 11:05
 */
public class RememberCondition extends PageAndSortCondition {

    private Long id;

    //关注人
    private long fromId;

    //被关注
    private long toId;

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

    public long getFromId() {
        return fromId;
    }

    public void setFromId(long fromId) {
        this.fromId = fromId;
    }

    public long getToId() {
        return toId;
    }

    public void setToId(long toId) {
        this.toId = toId;
    }
}
