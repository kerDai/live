package com.sj.room.api.gotye.model;

import java.util.Date;

public class CreateRoom {
	private Long roomId;
	private Long appUserId;
	private String roomName;
	private String anchorPwd;// 主播密码
	private String userPwd;// 用户登录密码
	private String assistPwd;// 助理密码
	private String anchorDesc;// 主播描述
	private String contentDesc;// 内容描述
	private Date dateCreate;
	private String thirdRoomId; // 三方roomId. string类型
	private Long imRoomId;
	private Long isImRoom;
	private Integer maxOnlineNum; // 允许最大人数
	/** 新加字段 **/
	private String firstIndustry; // 所属行业，大分类
	private String secondIndustry;// 所属行业，小分类
	private String creator; // 创建人
	private Short status; // 0-未开始 1-已删除 2-正在直播

	public Long getRoomId() {
		return roomId;
	}

	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}

	public Long getAppUserId() {
		return appUserId;
	}

	public void setAppUserId(Long appUserId) {
		this.appUserId = appUserId;
	}

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

	public String getUserPwd() {
		return userPwd;
	}

	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}

	public String getAssistPwd() {
		return assistPwd;
	}

	public void setAssistPwd(String assistPwd) {
		this.assistPwd = assistPwd;
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

	public Date getDateCreate() {
		return dateCreate;
	}

	public void setDateCreate(Date dateCreate) {
		this.dateCreate = dateCreate;
	}

	public String getThirdRoomId() {
		return thirdRoomId;
	}

	public void setThirdRoomId(String thirdRoomId) {
		this.thirdRoomId = thirdRoomId;
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

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public Short getStatus() {
		return status;
	}

	public void setStatus(Short status) {
		this.status = status;
	}

	public Long getImRoomId() {
		return imRoomId;
	}

	public void setImRoomId(Long imRoomId) {
		this.imRoomId = imRoomId;
	}

	public Long getIsImRoom() {
		return isImRoom;
	}

	public void setIsImRoom(Long isImRoom) {
		this.isImRoom = isImRoom;
	}
}
