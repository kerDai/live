package com.sj.room.entity.dto;

import java.io.Serializable;

/**
 * 用户密码修改
 * Created by duanke
 * Date: 2017/1/10.
 * Time: 10:11
 */
public class PasswordDTO implements Serializable {

    private static final long serialVersionUID = 2854887197086925183L;

    private Long id;
    private String oldpass;
    private String newpass;
    private String newtwopass;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOldpass() {
        return oldpass;
    }

    public void setOldpass(String oldpass) {
        this.oldpass = oldpass;
    }

    public String getNewpass() {
        return newpass;
    }

    public void setNewpass(String newpass) {
        this.newpass = newpass;
    }

    public String getNewtwopass() {
        return newtwopass;
    }

    public void setNewtwopass(String newtwopass) {
        this.newtwopass = newtwopass;
    }
}
