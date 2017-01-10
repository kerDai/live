package com.sj.room.core.base;

/**
 * ajax请求数据响应
 *
 * @author duanke
 * Created by duanke on 2016/12/14.
 */
public class AjaxDataResponse<T> extends AjaxResponse {

    private static final long serialVersionUID = 4597424147604392805L;

    private T data;

    public AjaxDataResponse(T data) {
        super();
        this.data=data;
        if (data instanceof Boolean) {
            setSuccess((Boolean) data);
        }
    }

    public AjaxDataResponse(int status, String message, T data) {
        super(status, message);
        this.data = data;
        if (data instanceof Boolean) {
            setSuccess((Boolean) data);
        }
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
