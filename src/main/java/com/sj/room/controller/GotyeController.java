package com.sj.room.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sj.room.api.gotye.model.*;
import com.sj.room.core.util.ApiCall;
import com.sj.room.core.util.CookiesUtil;
import com.sj.room.core.util.LIVE_ROLE;
import com.sj.room.core.util.NameLib;
import com.sj.room.entity.domain.User;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Controller
public class GotyeController {


	public final static String apiUrl = "https://livevip.com.cn/liveApi";

	private ObjectMapper mapper = new ObjectMapper();

	private static AccessTokenResp appAccessToken=null;

	@Value("${GOTYE_EMAIL}")
	private String GOTYE_EMAIL;

	@Value("${GOTYE_PASSWORD}")
	private String GOTYE_PASSWORD;

	@Value("${GOTYE_ACCESS_SECRET}")
	private String GOTYE_ACCESS_SECRET;
	
	/**
	 * 页面进入
	 * @param req
	 * @param resp
	 * @param map
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/live/{roomId}")
	public String liveOnlineEnter(@PathVariable Long roomId, HttpServletRequest req, HttpServletResponse resp, ModelMap map) throws IOException {
//		roomId = Long.valueOf(239138);
		String path = req.getScheme()+"://"+req.getServerName() + ":" + req.getServerPort()+ req.getContextPath() + "/live";
		req.setAttribute("_path_", path);
		req.setAttribute("roomId", roomId);
		String obj = mapper.writeValueAsString(getRoom(roomId));
		req.setAttribute("room", obj);
		String tokenKey = "room_token_"+roomId;
		//页面通过tokenkey从cookie中获得token
		req.setAttribute("token_key",tokenKey);
		String token_key_time = "room_token_" + roomId+"_time";

		String tokenTimeStr = CookiesUtil.getCookie(req, token_key_time);
		String token = CookiesUtil.getCookie(req, tokenKey);

		User user = (User) req.getSession().getAttribute("loginSession");

		if(user == null){
			//如果cookie中已经存在token
			if (StringUtils.isNotEmpty(token) && StringUtils.isNotEmpty(tokenTimeStr)) {
				Long tokenTime = Long.parseLong(tokenTimeStr);
				//如果token未过期
				if((System.currentTimeMillis() - tokenTime) < 24 * 60 * 60 * 1000){
					return "home";
				}
			}
			token = accesstoken("0", "", roomId);
			//传值到前台js cookie
			CookiesUtil.setCookie(resp, "token_key", tokenKey);
			CookiesUtil.setCookie(resp, "room", obj);

			CookiesUtil.setCookie(resp, "roomId", roomId+"");

			CookiesUtil.setCookie(resp, "room_token_"+roomId, token);
			CookiesUtil.setCookie(resp, "room_token_" + roomId+"_time", new Date().getTime()+"");
			return "home";
		}else {
			//如果cookie中已经存在token
			if (StringUtils.isNotEmpty(token) && StringUtils.isNotEmpty(tokenTimeStr)) {
				accesstoken(user.getNickname(), user.getMobile(), roomId);
				CookiesUtil.setCookie(resp, "room", obj);
				Long tokenTime = Long.parseLong(tokenTimeStr);
				//如果token未过期
				if((System.currentTimeMillis() - tokenTime) < 24 * 60 * 60 * 1000){
					return "home";
				}
			}
			token = accesstoken(user.getNickname(), user.getMobile(), roomId);
			//传值到前台js cookie
			CookiesUtil.setCookie(resp, "token_key", tokenKey);
			CookiesUtil.setCookie(resp, "room", obj);

			CookiesUtil.setCookie(resp, "roomId", roomId+"");

			CookiesUtil.setCookie(resp, "room_token_"+roomId, token);
			CookiesUtil.setCookie(resp, "room_token_" + roomId+"_time", new Date().getTime()+"");
			return "home";
		}
	}
	

	/**
	 * 获取token
	 * @return
	 */
	private String accesstoken(String nickName,String account,Long roomId){
		String token = "";
		try {
			String reqJson = "";
			String respStr = "";
			AccessTokenReq req = new AccessTokenReq();
			AccessTokenResp accessTokenResp;
			//获取app级别的token
			accessAppToken();
			token = appAccessToken.getAccessToken();
			
			//获取房间密码
			String url = apiUrl + "/GetRoomPwd";
			GetRoomPwdReq getRoomPwdReq = new GetRoomPwdReq();
			getRoomPwdReq.setRole(LIVE_ROLE.visitor.getValue());
			getRoomPwdReq.setRoomId(roomId);
			reqJson = mapper.writeValueAsString(getRoomPwdReq);
			Map<String, String> headers = new HashMap<String, String>();
			headers.put("Authorization", token);
			respStr = ApiCall.post(url, reqJson, headers);
			GetRoomPwdResp getRoomPwdResp = mapper.readValue(respStr, GetRoomPwdResp.class);
			String roomPassword = getRoomPwdResp.getEntity().getUserPwd();
			
			//获取房间级别的token
			url = apiUrl + "/AccessToken";
			req = new AccessTokenReq();
			req.setAccount(StringUtils.isEmpty(account)?UUID.randomUUID().toString().replace("-", ""):account);
			//登录名称
			if("0".equals(nickName)){
				req.setNickName("游客(" + NameLib.generateName()+")");
			}else {
				req.setNickName(StringUtils.isEmpty(nickName)? NameLib.generateName():nickName);
			}
			//// TODO: 2016/12/28   获取登录名称
//			req.setNickName("留下你的微笑");
			req.setRoomId(roomId);
			req.setPassword(roomPassword);
			req.setScope("room");
			String secretKey = DigestUtils.md5Hex(roomId+roomPassword+GOTYE_ACCESS_SECRET).toString();
			req.setSecretKey(secretKey);
			reqJson = mapper.writeValueAsString(req);
			respStr = ApiCall.post(url, reqJson, null);
			accessTokenResp = mapper.readValue(respStr, AccessTokenResp.class);
			token = accessTokenResp.getAccessToken();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return token;
	}

	/**
	 * 获取app级别的token,并缓存
	 */
	private void accessAppToken(){
		try {
			String url = apiUrl + "/AccessToken";
			String reqJson = "";
			String respStr = "";
			AccessTokenReq req = new AccessTokenReq();
			AccessTokenResp accessTokenResp;
			//获取app级别的token
			if(null == appAccessToken || System.currentTimeMillis() - appAccessToken.getSystime() > appAccessToken.getExpiresIn()*1000){
				req.setScope("app");
				req.setUserName(GOTYE_EMAIL);
				req.setPassword(GOTYE_PASSWORD);
				reqJson = mapper.writeValueAsString(req);
				respStr = ApiCall.post(url, reqJson, null);
				accessTokenResp = mapper.readValue(respStr, AccessTokenResp.class);
				appAccessToken = accessTokenResp;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//获取房间信息
	private Room getRoom(Long roomId){
		Room room = new Room();
		try{
			String url = apiUrl + "/GetRoom";
			String reqJson = "";
			String respStr = "";
			accessAppToken();
			String token = appAccessToken.getAccessToken();
			GetRoomReq req = new GetRoomReq();
			req.setRoomId(roomId);
			reqJson = mapper.writeValueAsString(req);
			Map<String, String> headers = new HashMap<String, String>();
			headers.put("Authorization", token);
			respStr = ApiCall.post(url, reqJson, headers);
			GetRoomResp resp = mapper.readValue(respStr, GetRoomResp.class);
			room = resp.getEntity();
		}catch(Exception e){
			e.printStackTrace();
		}
		return room;
	}
	
	/**
	 * 微信浏览器
	 * @param req
	 * @return
	 */
	private Boolean isWexin(HttpServletRequest req){
		String ua = req.getHeader("user-agent").toLowerCase();
	    if (ua.indexOf("micromessenger") > 0) {// 是微信浏览器
	        return true; 
	    }else{
	    	return false;
	    }
	}
}
