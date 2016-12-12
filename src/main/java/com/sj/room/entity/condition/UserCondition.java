package com.sj.room.entity.condition;

import com.sj.room.core.base.PageAndSortCondition;

/**
 * 用户代理类
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 11:05
 */
public class UserCondition extends PageAndSortCondition {

    private Long id;

    /**
     * 用户身份
     */
    private Integer tag;

    /**
     * 用户状态
     * 0:
     */
    private Integer status;


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

    public Integer getTag() {
        return tag;
    }

    public void setTag(Integer tag) {
        this.tag = tag;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
