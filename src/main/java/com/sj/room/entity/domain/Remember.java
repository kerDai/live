package com.sj.room.entity.domain;

import com.sj.room.core.base.IdEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 关注
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 14:34
 */
@Entity
@Table(name = "sj_wenzi_remember")
public class Remember extends IdEntity {

    //关注人
    private long fromId;

    //被关注
    private long toId;

    //1、关注
    @Column(name="status",columnDefinition="tinyint default 1")
    private Integer status = 1;

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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
