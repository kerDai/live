package com.sj.room.service;

import com.sj.room.entity.condition.RememberCondition;
import com.sj.room.entity.domain.Remember;
import org.springframework.data.domain.Page;

/**
 * 关注接口类
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 14:44
 */
public interface IRememberService {

    Remember save(Remember remember);

    Page<Remember> findPage(RememberCondition condition);

    /**
     * 是否已关注
     * @param fromId
     * @param toId
     * @return
     */
    Remember findByFromIdAndToId(long fromId, long toId);

    /**
     * 取消关注
     * @param fromId
     * @param toId
     */
    void deleteByfromIdAndToId(long fromId, long toId);
}
