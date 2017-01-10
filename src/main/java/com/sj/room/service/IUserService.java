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

    User findOne(Long id);


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


    /**
     * 修改昵称
     * @param nickname
     * @param id
     */
    User updateNickname(String nickname, Long id);

    /**
     * 修改头像
     * @param id
     * @param avatar
     */
    void avatar(Long id, String avatar);



    /**
     * 修改密码
     * @param id
     * @param oldPassword
     * @param newPassword
     */
    boolean changepwd(Long id, String oldPassword, String newPassword);
}
