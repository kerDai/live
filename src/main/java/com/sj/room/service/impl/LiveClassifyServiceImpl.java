package com.sj.room.service.impl;

import com.sj.room.entity.condition.LiveClassifyCondition;
import com.sj.room.entity.domain.LiveClassify;
import com.sj.room.repository.LiveClassifyRepository;
import com.sj.room.service.ILiveClassifyService;
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
 * 直播分类实现类
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 10:23
 */
@Service
public class LiveClassifyServiceImpl implements ILiveClassifyService {


    private final static Logger log = LoggerFactory.getLogger(LiveClassifyServiceImpl.class);


    @Autowired
    private LiveClassifyRepository liveClassifyRepository;

    @Override
    @Transactional
    public void save(LiveClassify liveClassify) {
        liveClassifyRepository.save(liveClassify);
    }

    @Override
    public Page<LiveClassify> findPage(LiveClassifyCondition condition) {
        return liveClassifyRepository.findAll(this.toSpecification(condition), condition.toPageable());
    }

    private Specification<LiveClassify> toSpecification(final LiveClassifyCondition cond) {
        return new Specification<LiveClassify>() {

            @Override
            public Predicate toPredicate(Root<LiveClassify> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Path<String> title = root.get("title");
                Path<Long> id = root.get("id");

                Set<Predicate> predicates = new HashSet<>();
                if (cond.getId() != null) {
                    predicates.add(cb.equal(id, cond.getId()));
                }
                if (StringUtils.isNotBlank(cond.getTitle())) {
                    predicates.add(cb.equal(title, "%" + cond.getTitle() + "%"));
                }

                return cb.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };
    }
}
