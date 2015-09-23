package com.takeout.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.model.takeout.User;
import com.takeout.log.annotation.LoggerClass;

@Component
@LoggerClass
public class UserService extends GenericService<User> {

	@SuppressWarnings("unchecked")
	public User authUser(User user) throws Exception {
		List<User> users = getDefDao().findByQueryString(
				"from User as u where u.name=? and u.password=? and u.locked=?", user.getName(), user.getPassword(),
				false);
		if (users.size() > 0) {
			return users.get(0);
		}
		return null;
	}

}
