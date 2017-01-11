package com.sj.room.core.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * 随机数
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 10:31
 */
public class RandomUtils {

    /**
     * 生成随机文件名：当前年月日时分秒+五位随机数
     *
     * @return
     */
    public static String getRandomFileName() {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");

        Date date = new Date();

        String str = simpleDateFormat.format(date);

        Random random = new Random();

        int rannum = (int) (random.nextDouble() * (99999 - 10000 + 1)) + 10000;// 获取5位随机数

        return str + rannum;// 当前时间
    }


    public static void main(String[] args) {
        System.out.println(getRandomFileName());
    }
}
