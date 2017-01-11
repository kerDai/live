package com.sj.room.service;


import com.sj.room.entity.condition.AnchorCondition;
import com.sj.room.entity.domain.Anchor;
import org.springframework.data.domain.Page;

/**
 * 申请主播接口类
 * Created by duanke
 * Date: 2016/12/9.
 * Time: 15:08
 */
public interface IAnchorService {

    Anchor save(Anchor anchor);

    Page<Anchor> findPage(AnchorCondition condition);

    Anchor findByMobile(String mobile);

    void updateStatus(long id, Integer status);

    Anchor findOne(long id);

    void updateRoomNo(long id, String roomNo);
}
