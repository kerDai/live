package com.sj.room.repository;

import com.sj.room.entity.domain.Live;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by duanke
 * Date: 2016/12/9.
 * Time: 14:49
 */
public interface LiveRepository extends JpaRepository<Live, Long>, JpaSpecificationExecutor<Live> {

    @Query("select live from Live live join live.liveClassify liveClassify where liveClassify.id = ?1")
    Page<Live> findClassifyPage(Long classifyId, Pageable pageable);

}

