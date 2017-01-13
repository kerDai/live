package com.sj.room.repository;

import com.sj.room.entity.domain.Anchor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

/**
 * Created by duanke
 * Date: 2016/12/9.
 * Time: 14:49
 */
public interface AnchorRepository extends JpaRepository<Anchor, Long>, JpaSpecificationExecutor<Anchor> {

    @Modifying
    @Query("update Anchor a set a.status = ?2 where a.id = ?1")
    void updateStatus(long id, Integer status);

    @Modifying
    @Query("update Anchor a set a.roomNo = ?2 where a.id = ?1")
    void updateRoomNo(long id, String roomNo);

    @Modifying
    @Query("update Anchor a set  a.updateTime = ?3, a.roomName = ?2 where a.id = ?1")
    void updateRoomName(long id, String roomName, Date time);

    Anchor findByMobile(String mobile);

    Anchor findByUserId(long userId);

}

