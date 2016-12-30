package com.sj.room.service.impl;

import com.sj.room.entity.condition.RememberCondition;
import com.sj.room.entity.domain.Remember;
import com.sj.room.repository.RememberRepository;
import com.sj.room.service.IRememberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.util.HashSet;
import java.util.Set;

/**
 * 关注接口类实现
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 14:49
 */
@Service
public class RememberServiceImpl implements IRememberService{

    @Autowired
    private RememberRepository rememberRepository;


    @Override
    @Transactional
    public Remember save(Remember remember) {
        return rememberRepository.save(remember);
    }

    @Override
    @Transactional
    public void deleteByfromIdAndToId(long fromId, long toId) {
        rememberRepository.deleteByfromIdAndToId(fromId, toId);
    }

    @Override
    public Page<Remember> findPage(RememberCondition condition) {
        return rememberRepository.findAll(this.toSpecification(condition), condition.toPageable());
    }

    @Override
    public Remember findByFromIdAndToId(long fromId, long toId) {
        return rememberRepository.findByFromIdAndToId(fromId, toId);
    }

    private Specification<Remember> toSpecification(final RememberCondition cond) {
        return new Specification<Remember>() {

            @Override
            public Predicate toPredicate(Root<Remember> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Path<Long> fromId = root.get("fromId");
                Path<Long> toId = root.get("toId");
                Path<Long> id = root.get("id");

                Set<Predicate> predicates = new HashSet<>();
                if (cond.getId() != null) {
                    predicates.add(cb.equal(id, cond.getId()));
                }
                if (cond.getFromId() > 0 ) {
                    predicates.add(cb.equal(fromId, cond.getFromId()));
                }
                if (cond.getToId() > 0 ) {
                    predicates.add(cb.equal(toId, cond.getToId()));
                }
                return cb.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };
    }


}
