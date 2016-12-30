package com.sj.room.service;

/**
 * ${DESCRIPTION}
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 16:25
 */
public interface ILoginService {

    boolean login(String mobile, String password);

    void logout();

}
