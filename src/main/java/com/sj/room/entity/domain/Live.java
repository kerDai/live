package com.sj.room.entity.domain;

import com.sj.room.core.base.IdEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 图文直播
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 11:51
 */
@Entity
@Table(name = "sj_live")
public class Live extends IdEntity{

    private static final long serialVersionUID = 2249003552028217678L;

    private Long userId;

    private String title;

    @ManyToOne
    private LiveClassify liveClassify;

    private String remark;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LiveClassify getLiveClassify() {
        return liveClassify;
    }

    public void setLiveClassify(LiveClassify liveClassify) {
        this.liveClassify = liveClassify;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
