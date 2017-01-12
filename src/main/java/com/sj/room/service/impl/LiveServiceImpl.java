package com.sj.room.service.impl;

import com.sj.room.entity.condition.LiveCondition;
import com.sj.room.entity.domain.Live;
import com.sj.room.entity.domain.LiveDetail;
import com.sj.room.repository.LiveDetailRepository;
import com.sj.room.repository.LiveRepository;
import com.sj.room.service.ILiveService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
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

    @Autowired
    private LiveDetailRepository liveDetailRepository;


    @Override
    public Page<Live> findPage(LiveCondition condition) {
        return liveRepository.findAll(this.toSpecification(condition), condition.toPageable());
    }

    @Override
    @Transactional
    public void save(Live live) {
        liveRepository.save(live);
    }

    @Override
    @Transactional
    public void saveDetail(Long userId, String content) {
        Live temp = findTodayLive(userId);
        if(temp == null){
            Live live = new Live();
            live.setUserId(userId);
            Live newLive = liveRepository.save(live);
            saveDeatail(content, newLive);
        }else {
            saveDeatail(content, temp);
        }
    }

    private void saveDeatail(String content, Live temp) {
        if(StringUtils.isNotBlank(content)){
            LiveDetail detail = new LiveDetail();
            detail.setContent(content);
            detail.setLiveId(temp.getId());
            liveDetailRepository.save(detail);
        }
    }

    @Override
    public List<Live> getList(LiveCondition condition) {
        return liveRepository.findAll();
    }

    @Override
    public Live findTodayLive(long id) {
        return liveRepository.findTodayLive(id);
    }

//    @Override
//    public Page<Live> findClassifyPage(Long classifyId ,Pageable pageable) {
//        return liveRepository.findClassifyPage(classifyId, pageable);
//    }


    private Specification<Live> toSpecification(final LiveCondition cond) {
        return new Specification<Live>() {

            @Override
            public Predicate toPredicate(Root<Live> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
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
