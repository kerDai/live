package com.sj.room.entity.domain;

import com.sj.room.core.base.IdEntity;

import javax.persistence.*;

/**
 * Title: LiveDetail
 * Package: com.sj.room.entity.domain
 * Description: 直播详情
 * Created by: duanke
 * Date: 2016/12/15  15:07
 */
@Entity
@Table(name = "sj_live_detail")
public class LiveDetail extends IdEntity {

    private static final long serialVersionUID = -4837121847186917652L;

    @Column(columnDefinition="TEXT")
    private String content;

    /**
     * 2 取消
     */
    private Integer status;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

}
