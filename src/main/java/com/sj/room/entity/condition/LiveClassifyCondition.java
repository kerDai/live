package com.sj.room.entity.condition;

import com.sj.room.core.base.PageAndSortCondition;

/**
 * 用户代理类
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 11:05
 */
public class LiveClassifyCondition extends PageAndSortCondition {

    private Long id;

    private String title;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
