package com.sj.room.service.impl;

import com.sj.room.core.util.EncryptUtil;
import com.sj.room.entity.domain.User;
import com.sj.room.repository.UserRepository;
import com.sj.room.service.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 登录接口实现
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 16:27
 */
@Service
public class LoginServiceImpl implements ILoginService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User login(String mobile, String password) {
        return userRepository.findByMobileAndPassword(mobile, EncryptUtil.encrypt(password));
    }

    @Override
    public void logout() {

    }
}
