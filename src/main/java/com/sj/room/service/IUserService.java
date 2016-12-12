package com.sj.room.service;


import com.sj.room.entity.domain.User;

/**
 * ${DESCRIPTION}
 * Created by duanke
 * Date: 2016/12/9.
 * Time: 15:08
 */
public interface IUserService {

    User save(User user);


    /**
     * 修改用户身份
     * @param tag
     * @param uid
     */
    void updateTag(Integer tag, Long uid);


    /**
     * 修改用户状态
     * @param status
     * @param id
     */
    void updateStatus(Integer status, Long id);
}
