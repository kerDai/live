package com.sj.room.repository;

import com.sj.room.entity.domain.Remember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Created by duanke
 * Date: 2016/12/9.
 * Time: 14:49
 */
public interface RememberRepository extends JpaRepository<Remember, Long>, JpaSpecificationExecutor<Remember> {

    void deleteByfromIdAndToId(long fromId, long toId);

    Remember findByFromIdAndToId(long fromId, long toId);
}

