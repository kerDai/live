package com.sj.room.service.impl;

import com.sj.room.entity.condition.LiveCondition;
import com.sj.room.entity.domain.Live;
import com.sj.room.repository.LiveRepository;
import com.sj.room.service.ILiveService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.util.HashSet;
import java.util.Set;

/**
 * 发起直播实现类
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 10:23
 */
@Service
public class LiveServiceImpl implements ILiveService {


    private final static Logger log = LoggerFactory.getLogger(LiveServiceImpl.class);

    @Autowired
    private LiveRepository liveRepository;


    @Override
    public Page<Live> findPage(LiveCondition condition) {
        return liveRepository.findAll(this.toSpecification(condition), condition.toPageable());
    }

    @Override
    @Transactional
    public void save(Live live) {
        liveRepository.save(live);
    }


    private Specification<Live> toSpecification(final LiveCondition cond) {
        return new Specification<Live>() {

            @Override
            public Predicate toPredicate(Root<Live> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Path<String> code = root.get("code");
                Path<String> title = root.get("title");
                Path<Long> id = root.get("id");

                Set<Predicate> predicates = new HashSet<>();
                if (cond.getId() != null) {
                    predicates.add(cb.equal(id, cond.getId()));
                }
                if (StringUtils.isNotBlank(cond.getCode())) {
                    predicates.add(cb.like(code, "%" + cond.getCode() + "%"));
                }
                if (StringUtils.isNotBlank(cond.getTitle())) {
                    predicates.add(cb.equal(title, "%" + cond.getTitle() + "%"));
                }

                return cb.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };
    }
}
