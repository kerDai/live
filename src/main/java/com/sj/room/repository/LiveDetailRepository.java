package com.sj.room.repository;

import com.sj.room.entity.domain.LiveDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by duanke
 * Date: 2016/12/9.
 * Time: 14:49
 */
public interface LiveDetailRepository extends JpaRepository<LiveDetail, Long>, JpaSpecificationExecutor<LiveDetail> {

    @Query("select detail from LiveDetail detail where to_days(detail.createTime) = to_days(NOW()) and detail.liveId = ?1 order by detail.createTime desc")
    List<LiveDetail> getListToday(Long userId);

}

