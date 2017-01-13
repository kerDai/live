package com.sj.room.service.impl;

import com.sj.room.entity.condition.AnchorCondition;
import com.sj.room.entity.domain.Anchor;
import com.sj.room.entity.domain.Live;
import com.sj.room.entity.domain.LiveClassify;
import com.sj.room.repository.AnchorRepository;
import com.sj.room.repository.LiveRepository;
import com.sj.room.repository.UserRepository;
import com.sj.room.service.IAnchorService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * 申请主播
 * Created by duanke
 * Date: 2016/12/29.
 * Time: 14:28
 */
@Service
public class AnchorServiceImpl implements IAnchorService {

    @Autowired
    private AnchorRepository anchorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LiveRepository liveRepository;

    @Override
    @Transactional
    public Anchor save(Anchor anchor) {
        return anchorRepository.save(anchor);
    }

    @Override
    public Page<Anchor> findPage(AnchorCondition condition) {
        return anchorRepository.findAll(this.toSpecification(condition), condition.toPageable());
    }

    @Override
    public Anchor findByMobile(String mobile) {
        return anchorRepository.findByMobile(mobile);
    }

    @Override
    @Transactional
    public void updateStatus(long id, Integer status) {
        anchorRepository.updateStatus(id, status);
        if(status == 1){
            Anchor anchor = anchorRepository.findOne(id);
            userRepository.updateTag(1, anchor.getUser().getId());
        }
    }

    @Override
    public Anchor findOne(long id) {
        return anchorRepository.findOne(id);
    }

    @Override
    @Transactional
    public void updateRoomNo(long id, String roomNo) {
        anchorRepository.updateRoomNo(id, roomNo);
    }

    @Override
    public Anchor findByUserId(long userId) {
        return anchorRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public void updateRoomName(long userId, long id, String roomNanme) {
        anchorRepository.updateRoomName(id, roomNanme, new Date());
        Live live = new Live();
        live.setUserId(userId);
        liveRepository.save(live);
    }

    private Specification<Anchor> toSpecification(final AnchorCondition cond) {
        return new Specification<Anchor>() {

            @Override
            public Predicate toPredicate(Root<Anchor> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Path<String> realName = root.get("realName");
                Path<String> mobile = root.get("mobile");
                Path<Long> id = root.get("id");
                Path<Long> classifyId = root.get("liveClassify");
                Path<Integer> status = root.get("status");

                Set<Predicate> predicates = new HashSet<>();
                if (cond.getId() != null) {
                    predicates.add(cb.equal(id, cond.getId()));
                }

                if (cond.getClassifyId() != null) {
                    predicates.add(cb.equal(classifyId, cond.getClassifyId()));
                }

                if (cond.getStatus() != null) {
                    predicates.add(cb.equal(status, cond.getStatus()));
                }

                if (StringUtils.isNotBlank(cond.getRealName())) {
                    predicates.add(cb.equal(realName, "%" + cond.getRealName() + "%"));
                }
                if (StringUtils.isNotBlank(cond.getMobile())) {
                    predicates.add(cb.equal(mobile, "%" + cond.getMobile() + "%"));
                }
                return cb.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };
    }
}
