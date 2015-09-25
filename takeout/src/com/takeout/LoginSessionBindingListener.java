package com.takeout;

import java.util.Date;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.model.takeout.User;
import com.takeout.service.UserService;
import com.takeout.util.Tools;

public class LoginSessionBindingListener implements HttpSessionBindingListener {

	private static final String USER_SERVICE_NAME = "userService";

	final Logger logger = LoggerFactory.getLogger("ROOT");

	private User user;

	public LoginSessionBindingListener(User authedUser) {
		this.setUser(authedUser);
	}

	public User getUser() {
		return user;
	}

	private User loginOrLogOut(HttpSessionBindingEvent event, boolean flag) {
		HttpSession session = event.getSession();
		UserService userService = lookupService(session);
		User userInDb = userService.get(String.valueOf(user.getId()));
		userService.updateLoginSession(userInDb, flag);
		return userInDb;
	}

	private UserService lookupService(HttpSession session) {
		WebApplicationContext wac = WebApplicationContextUtils
				.getRequiredWebApplicationContext(session.getServletContext());
		return (UserService) wac.getBean(USER_SERVICE_NAME, UserService.class);
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public void valueBound(HttpSessionBindingEvent event) {
		User userInDb = loginOrLogOut(event, true);
		logger.info("{} 用户<{}>登陆;", userInDb.getName(), Tools.date2String(new Date()));
	}

	@Override
	public void valueUnbound(HttpSessionBindingEvent event) {
		User userInDb = loginOrLogOut(event, false);
		logger.info("{} 用户<{}>注销;", userInDb.getName(), Tools.date2String(new Date()));
	}

}
