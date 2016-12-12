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


    /**
     * 修改用户身份
     * @param tag
     */
    @Modifying
    @Query("update User u set u.tag = ?1 where u.id = ?2")
    void updateTag(Integer tag, Long id);


    @Modifying
    @Query("update User u set u.status = ?1 where u.id = ?2")
    void updateStatus(Integer status, Long id);

}

