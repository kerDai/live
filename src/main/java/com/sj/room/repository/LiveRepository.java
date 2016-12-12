package com.sj.room.repository;

import com.sj.room.entity.domain.Live;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Created by duanke
 * Date: 2016/12/9.
 * Time: 14:49
 */
public interface LiveRepository extends JpaRepository<Live, Long>, JpaSpecificationExecutor<Live> {

//    @Modifying
//    @Query("update User u set u.tag = ?1 where u.id = ?2")
//    void updateTag(Integer tag, Long id);
//
//
//    @Modifying
//    @Query("update User u set u.status = ?1 where u.id = ?2")
//    void updateStatus(Integer status, Long id);

}

