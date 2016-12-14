package com.sj.room.entity.domain;

import com.sj.room.core.base.IdEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 用户
 * Created by duanke
 * Date: 2016/12/9.
 * Time: 14:37
 */
@Entity
@Table(name = "sj_user")
public class User extends IdEntity {

    private static final long serialVersionUID = -5179498387222264177L;

    private String username;

    private String nickname;

    private String password;

    private String mobile;

    /**
     * 1 普通用户
     * 2 主播
     */
    private Integer tag;

    private Integer status;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
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
