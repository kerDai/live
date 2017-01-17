package com.sj.room.service.impl;

import com.sj.room.entity.condition.LiveDetailCondition;
import com.sj.room.entity.domain.LiveDetail;
import com.sj.room.repository.LiveDetailRepository;
import com.sj.room.service.ILiveDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 直播明细实现类
 * Created by duanke
 * Date: 2017/1/12.
 * Time: 18:16
 */
@Service
public class LiveDetailServiceImpl implements ILiveDetailService{


    @Autowired
    private LiveDetailRepository liveDetailRepository;

    @Override
    public Page<LiveDetail> findPage(LiveDetailCondition condition) {
        return null;
    }

    @Override
    public List<LiveDetail> getListTodayDesc(Long liveId) {
        return liveDetailRepository.getListTodayDesc(liveId);
    }

    @Override
    public List<LiveDetail> getListTodayAsc(Long liveId) {
        return liveDetailRepository.getListTodayAsc(liveId);
    }
}
