package com.sj.room.repository;

import com.sj.room.entity.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by duanke
 * Date: 2016/12/9.
 * Time: 14:49
 */
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {


    User findByMobileAndPassword(String mobile, String password);

    /**
     * 修改用户身份
     * @param tag
     */
    @Modifying
    @Query("update User u set u.tag = ?1 where u.id = ?2")
    void updateTag(Integer tag, Long id);


    /**
     * 更新状态
     * @param status
     * @param id
     */
    @Modifying
    @Query("update User u set u.status = ?1 where u.id = ?2")
    void updateStatus(Integer status, Long id);


    /**
     * 修改头像
     * @param id
     * @param avatar
     */
    @Modifying
    @Query("update User u set u.avatar = ?2 where u.id = ?1")
    void avatar(Long id, String avatar);

    /**
     * 修改密码
     * @param id
     * @param password
     */
    @Modifying
    @Query("update User u set u.password = ?2 where u.id = ?1")
    void changepwd(Long id, String password);
}

