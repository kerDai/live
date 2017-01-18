package com.sj.room.entity.condition;

import com.sj.room.core.base.PageAndSortCondition;
import com.sj.room.entity.domain.LiveClassify;

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

    //0 待审核  1 审核通过  2 驳回  3 不通过
    private Integer status;

    private Long classifyId;

    public Long getClassifyId() {
        return classifyId;
    }

    public void setClassifyId(Long classifyId) {
        this.classifyId = classifyId;
    }

    @Override
    protected String getDefaultSort() {
        return "updateTime_1";
    }


    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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
