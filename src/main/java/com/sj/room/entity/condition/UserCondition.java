package com.sj.room.entity.condition;

import com.sj.room.core.base.PageAndSortCondition;

/**
 * 用户代理类
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 11:05
 */
public class UserCondition extends PageAndSortCondition {

    private Long id;

    /**
     * 用户身份
     */
    private Integer tag;

    /**
     * 用户状态
     * 0:
     */
    private Integer status;

    private String mobile;
    private String nickname;
    private String avatar;
    private String password;
    private String rePassword;
    private String verifyNo;

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
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

    public String getRePassword() {
        return rePassword;
    }

    public void setRePassword(String rePassword) {
        this.rePassword = rePassword;
    }

    public String getVerifyNo() {
        return verifyNo;
    }

    public void setVerifyNo(String verifyNo) {
        this.verifyNo = verifyNo;
    }

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
