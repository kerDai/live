package com.sj.room.entity.domain;

import com.sj.room.core.base.IdEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 直播分类
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 11:56
 */
@Entity
@Table(name = "sj_live_classify")
public class LiveClassify extends IdEntity{

    private static final long serialVersionUID = -4169265002502610978L;

    private String title;

    private Integer status;// 1:正常 2:已删除

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
