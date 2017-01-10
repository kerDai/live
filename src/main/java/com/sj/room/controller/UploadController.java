package com.sj.room.controller;

import com.sj.room.api.aliyun.AliyunImage;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;

/**
 * 上传图片
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 10:22
 */
@RestController
public class UploadController {


    @PostMapping(value = "/upload")
    public Object uploadImage(@RequestParam("file") MultipartFile file, HttpServletRequest request){
        JSONObject obj = new JSONObject();
//        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
//        MultipartFile file = multipartRequest.getFile("imgFile");
        String imgPath = AliyunImage.uploadAliyun(file);
        obj.put("error", 0);
        obj.put("url", imgPath);
        return obj;
    }

}
