//package com.sj.room.config.druid;
//
//import com.alibaba.druid.support.http.WebStatFilter;
//
//import javax.servlet.annotation.WebFilter;
//import javax.servlet.annotation.WebInitParam;
//
///**
// * Druid的StatFilter
// * Created by duanke
// * Date: 2016/12/5.
// * Time: 11:29
// */
//@WebFilter(filterName="druidWebStatFilter",urlPatterns="/*",
//        initParams={
//                @WebInitParam(name="exclusions",value="*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico,/druid/*")// 忽略资源
//        })
//public class DruidStatFilter extends WebStatFilter {
//
//}