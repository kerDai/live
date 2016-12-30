package com.sj.room.api.aliyun;

import com.aliyun.oss.OSSClient;
import com.sj.room.core.util.RandomUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 阿里云
 * Created by duanke
 * Date: 2016/12/30.
 * Time: 10:29
 */
public class AliyunImage {

    private static String endpoint = "oss-cn-shanghai.aliyuncs.com";
    private static String accessKeyId = "LTAItYFZCOzDhCNQ";
    private static String accessKeySecret = "jsDVsEH6raHeCHn6wEV193n6XrFWQe";

    private static String bucketName = "aquan";
    private static String key = "*** Provide key ***";

    private static String yunPath = "http://aquan.img-cn-shanghai.aliyuncs.com/";


    public static String uploadAliyun(MultipartFile uploadFile) {
        String uid = RandomUtils.getRandomFileName();
        String fileName = uploadFile.getOriginalFilename();
        String suffix = fileName.substring(fileName.lastIndexOf(".") + 1);
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        // 上传文件流
        try {
            ossClient.putObject(bucketName, uid + "." + suffix, uploadFile.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
            ossClient.shutdown();
        }
        // 关闭client
        ossClient.shutdown();
        return yunPath + uid + "." + suffix;
    }

}
