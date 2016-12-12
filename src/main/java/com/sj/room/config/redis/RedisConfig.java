package com.sj.room.config.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

/**
 * redis配置
 * Created by duanke
 * Date: 2016/12/8.
 * Time: 16:51
 */
@Component
public class RedisConfig {

    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    public RedisConfig(StringRedisTemplate stringRedisTemplate) {

        this.stringRedisTemplate = stringRedisTemplate;
    }

}