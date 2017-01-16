package com.sj.room.entity.domain;

import com.sj.room.core.base.IdEntity;

import javax.persistence.*;
import java.util.Date;

/**
 * Title: LiveDetail
 * Package: com.sj.room.entity.domain
 * Description: 直播详情
 * Created by: duanke
 * Date: 2016/12/15  15:07
 */
@Entity
@Table(name = "sj_wenzi_live_detail")
public class LiveDetail extends IdEntity {

    private static final long serialVersionUID = -4837121847186917652L;

    @Column(columnDefinition="TEXT")
    private String content;

//    @ManyToOne(cascade = { CascadeType.REFRESH, CascadeType.MERGE }, optional = true)
//    @JoinColumn(name = "live_id")
//    private Live live;

    private Long liveId;

    public Long getLiveId() {
        return liveId;
    }

    public void setLiveId(Long liveId) {
        this.liveId = liveId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
