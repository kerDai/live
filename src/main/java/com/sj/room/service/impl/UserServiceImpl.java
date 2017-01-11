package com.sj.room.service.impl;

import com.sj.room.core.util.EncryptUtil;
import com.sj.room.entity.condition.UserCondition;
import com.sj.room.entity.domain.User;
import com.sj.room.repository.UserRepository;
import com.sj.room.service.IUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.util.HashSet;
import java.util.Set;

/**
 * 用户实现类
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 10:23
 */
@Service
public class UserServiceImpl implements IUserService {


    private final static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findOne(Long id) {
        return userRepository.findOne(id);
    }

    @Override
    @Transactional
    public void updateTag(Integer tag, Long id) {
        userRepository.updateTag(tag, id);
    }

    @Override
    @Transactional
    public void updateStatus(Integer status, Long id) {
        userRepository.updateStatus(status, id);
    }

    @Override
    @Transactional
    public User updateNickname(String nickname, Long id) {
        userRepository.updateNickname(nickname, id);
        return userRepository.findOne(id);
    }

    @Override
    @Transactional
    public void avatar(Long id, String avatar) {
        userRepository.avatar(id, avatar);
    }

    @Override
    @Transactional
    public boolean changepwd(Long id, String oldPassword, String newPassword) {
        String oldpwd = EncryptUtil.encrypt(oldPassword);
        User user = userRepository.findOne(id);
        if(user.getPassword().equals(oldpwd)){
            String newpwd = EncryptUtil.encrypt(newPassword);
            userRepository.changepwd(id, newpwd);
            return true;
        }
        return false;
    }

    @Override
    public Page<User> findPage(UserCondition condition) {
        return userRepository.findAll(this.toSpecification(condition), condition.toPageable());
    }

    private Specification<User> toSpecification(final UserCondition cond) {
        return new Specification<User>() {

            @Override
            public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Path<String> mobile = root.get("mobile");
                Path<Long> id = root.get("id");
                Path<Integer> status = root.get("status");

                Set<Predicate> predicates = new HashSet<>();
                if (cond.getId() != null) {
                    predicates.add(cb.equal(id, cond.getId()));
                }

                if (cond.getStatus() != null) {
                    predicates.add(cb.equal(status, cond.getStatus()));
                }
                if (StringUtils.isNotBlank(cond.getMobile())) {
                    predicates.add(cb.equal(mobile, "%" + cond.getMobile() + "%"));
                }
                return cb.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };
    }
}
