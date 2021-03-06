package com.sj.room.core.util;

import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookiesUtil {
	public static String getCookie(HttpServletRequest request,
			String key) {
		Cookie cookie = WebUtils.getCookie(request,key);
		if (cookie!=null) {
			return cookie.getValue();
		}
		return null;
	}
	
	public static void clearCookie(HttpServletRequest request,
                                   HttpServletResponse response, String key){
		Cookie cookie = WebUtils.getCookie(request,key);
		if (cookie!=null) {
			cookie.setMaxAge(0);
			cookie.setPath("/");
			cookie.setValue(null);
			response.addCookie(cookie);
		}
	}
	
	public static void setCookie(HttpServletResponse response, String key, String value){
		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge((int)(8*60*60));
		cookie.setPath("/");
		response.setCharacterEncoding("UTF-8");
		response.addCookie(cookie);
	}
	
	public static void setCookieWithTime(HttpServletResponse response, String key, String value, Integer time){
		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(time);
		cookie.setPath("/");
		response.addCookie(cookie);
	}
}
