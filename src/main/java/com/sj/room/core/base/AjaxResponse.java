package com.sj.room.core.base;

import java.io.Serializable;

/**
 * Created by duanke on 2016/12/14.
 */
public class AjaxResponse implements Serializable {

    private static final long serialVersionUID = -9208661856025346572L;

    private int     status;

    private boolean success;

    private String  message;

    public AjaxResponse() {
        this(200, "");
    }

    public AjaxResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.success = (this.status == 200);
    }



    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}

