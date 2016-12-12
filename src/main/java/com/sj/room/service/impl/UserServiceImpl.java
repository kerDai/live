package com.sj.room.service.impl;

import com.sj.room.entity.domain.User;
import com.sj.room.repository.UserRepository;
import com.sj.room.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 用户实现类
 * Created by duanke
 * Date: 2016/12/12.
 * Time: 10:23
 */
@Service
public class UserServiceImpl  implements IUserService {


    private final static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;


    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void updateTag(Integer tag, Long id) {
        userRepository.updateTag(tag, id);
    }

    @Override
    public void updateStatus(Integer status, Long id) {
        userRepository.updateStatus(status, id);
    }
}
