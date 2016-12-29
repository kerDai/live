package com.sj.room.entity.domain;

import com.sj.room.core.base.IdEntity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * 申请主播资料
 * Created by duanke
 * Date: 2016/12/29.
 * Time: 13:47
 */
@Entity
@Table(name = "sj_anchor")
public class Anchor  extends IdEntity {

    private static final long serialVersionUID = -8723264167417988266L;


    @OneToOne
    private User user;

    private String realName;

    private Integer sex;

    private Integer age;

    private String qq;

    //行业经验龄
    private Integer tradeAge;

    private String email;
    private String mobile;
    private String job;
    //直播类型
    private Integer liveClassifyId;
    //直播简介
    private String profile;
    //申请理由
    private String reason;

    //0 待审核  1 审核通过  2 不通过
    private Integer status;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public Integer getTradeAge() {
        return tradeAge;
    }

    public void setTradeAge(Integer tradeAge) {
        this.tradeAge = tradeAge;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public Integer getLiveClassifyId() {
        return liveClassifyId;
    }

    public void setLiveClassifyId(Integer liveClassifyId) {
        this.liveClassifyId = liveClassifyId;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}