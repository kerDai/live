package com.sj.room.service;

import com.sj.room.entity.condition.LiveCondition;
import com.sj.room.entity.domain.Live;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

/**
 * 发起直播
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 13:50
 */
public interface ILiveService {


    Page<Live> findPage(LiveCondition condition);

    void save(Live live);

    List<Live> getList(LiveCondition condition);

    /**
     * 查看当天是否发起直播
     * @param userId
     * @return
     */
    Live findTodayLive(long userId);

    /**
     * 关联查询——通过classify级联查询
     * @param classifyId
     * @param pageable
     * @return
     */
    Page<Live> findClassifyPage(Long classifyId, Pageable pageable);

}
