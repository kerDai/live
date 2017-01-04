package com.sj.room.service;

import com.sj.room.entity.domain.User;

/**
 * ${DESCRIPTION}
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 16:25
 */
public interface ILoginService {

    User login(String mobile, String password);

    void logout();

}
