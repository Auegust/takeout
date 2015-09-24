package com.takeout.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.model.takeout.User;
import com.takeout.Helper;
import com.takeout.service.GenericService;
import com.takeout.service.UserService;
import com.takeout.util.Tools;

import net.sf.json.JSONObject;

@Component
@Scope("prototype")
public class UserAction extends GenericAction<User> {
	/**
	 *
	 */
	private static final long serialVersionUID = -3863759309854139570L;
	@Resource
	private UserService userService;

	@Override
	public GenericService<User> getDefService() {
		return userService;
	}

	public UserService getUserService() {
		return userService;
	}

	@Override
	protected void setEntity(User user) throws Exception {
		user.setName(get("name"));
		user.setAddress(get("address"));
		user.setPhoneNumber(get("phoneNumber"));
		if (get("password") != null) {
			user.setPassword(Tools.encodePassword(get("password")));
		}
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	@Override
	protected JSONObject toJsonObject(User user) throws Exception {
		Helper record = new Helper();
		record.put("id", user.getId());
		record.put("address", user.getAddress());
		record.put("locked", user.getLocked());
		record.put("phoneNumber", user.getPhoneNumber());
		return record.getJsonObject();
	}

}
