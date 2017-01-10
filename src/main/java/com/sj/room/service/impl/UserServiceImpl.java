package com.sj.room.service.impl;

import com.sj.room.core.util.EncryptUtil;
import com.sj.room.entity.domain.User;
import com.sj.room.repository.UserRepository;
import com.sj.room.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    private MessageSource messageSource;


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
}
