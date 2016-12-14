package com.sj.room.repository;

import com.sj.room.entity.domain.Live;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
public interface LiveRepository extends JpaRepository<Live, Long>, JpaSpecificationExecutor<Live> {

    /**
     * 关联查询
     * @param classifyId
     * @param pageable
     * @return
     */
    @Query("select live from Live live join live.liveClassify liveClassify where liveClassify.id = ?1")
    Page<Live> findClassifyPage(Long classifyId, Pageable pageable);


    /**
     * 查询当日是否有图文直播
     * @param userId
     * @return
     */
//    @Query(value="select * from sj_live live join sj_live_classify where to_days(live.create_time) = to_days(NOW()) and live.user_id = ?1",nativeQuery=true)
    @Query("select live from Live live join live.liveClassify liveClassify where to_days(live.createTime) = to_days(NOW()) and live.userId = ?1")
    Live findTodayLive(long userId);
}

