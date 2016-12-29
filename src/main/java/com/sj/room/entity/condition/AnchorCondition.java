package com.sj.room.entity.condition;

import com.sj.room.core.base.PageAndSortCondition;

/**
 * 用户代理类
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 11:05
 */
public class AnchorCondition extends PageAndSortCondition {

    private Long id;

    private String realName;

    private String mobile;

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

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
}
