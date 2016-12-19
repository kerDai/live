package com.sj.room.entity.domain;

import com.sj.room.core.base.IdEntity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

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

    @OneToOne
    private LiveClassify liveClassify;

    @OneToMany(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    @JoinColumn(name="live_id")
    private Set<LiveDetail> liveDetails;

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


    public Set<LiveDetail> getLiveDetails() {
        return liveDetails;
    }

    public void setLiveDetails(Set<LiveDetail> liveDetails) {
        this.liveDetails = liveDetails;
    }
}
