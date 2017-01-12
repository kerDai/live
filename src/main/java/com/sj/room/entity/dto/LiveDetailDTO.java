package com.sj.room.entity.dto;

import java.io.Serializable;

/**
 * 用户密码修改
 * Created by duanke
 * Date: 2017/1/10.
 * Time: 10:11
 */
public class LiveDetailDTO implements Serializable {

    private static final long serialVersionUID = 2854887197086925183L;

    private Long userId;
    private String content;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
