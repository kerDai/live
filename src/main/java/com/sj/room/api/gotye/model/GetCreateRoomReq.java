package com.sj.room.api.gotye.model;

public class GetCreateRoomReq {

    //主播室名称
    private String roomName;
    //主播登录密码
    private String anchorPwd;
    //助理登录密码
    private String assistPwd;
    //用户登录密码
    private String userPwd;
    //主播描述
    private String anchorDesc;
    //内容描述
    private String contentDesc;
    //第三方房间号
    private String thirdRoomId;
    //创建者
    private String creator;
    //允许在线人数,0或不传表示无限制
    private Integer maxOnlineNum;
    //大范围行业,如金融
    private String firstIndustry;
    //小范围行业,如银行
    private String secondIndustry;

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getAnchorPwd() {
        return anchorPwd;
    }

    public void setAnchorPwd(String anchorPwd) {
        this.anchorPwd = anchorPwd;
    }

    public String getAssistPwd() {
        return assistPwd;
    }

    public void setAssistPwd(String assistPwd) {
        this.assistPwd = assistPwd;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }

    public String getAnchorDesc() {
        return anchorDesc;
    }

    public void setAnchorDesc(String anchorDesc) {
        this.anchorDesc = anchorDesc;
    }

    public String getContentDesc() {
        return contentDesc;
    }

    public void setContentDesc(String contentDesc) {
        this.contentDesc = contentDesc;
    }

    public String getThirdRoomId() {
        return thirdRoomId;
    }

    public void setThirdRoomId(String thirdRoomId) {
        this.thirdRoomId = thirdRoomId;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Integer getMaxOnlineNum() {
        return maxOnlineNum;
    }

    public void setMaxOnlineNum(Integer maxOnlineNum) {
        this.maxOnlineNum = maxOnlineNum;
    }

    public String getFirstIndustry() {
        return firstIndustry;
    }

    public void setFirstIndustry(String firstIndustry) {
        this.firstIndustry = firstIndustry;
    }

    public String getSecondIndustry() {
        return secondIndustry;
    }

    public void setSecondIndustry(String secondIndustry) {
        this.secondIndustry = secondIndustry;
    }
}
