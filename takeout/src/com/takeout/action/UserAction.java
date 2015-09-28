package com.takeout.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.model.takeout.User;
import com.takeout.Helper;
import com.takeout.service.GenericService;
import com.takeout.service.UserService;
import com.takeout.util.Constants;
import com.takeout.util.PinYin;
import com.takeout.util.Tools;

import net.sf.json.JSONArray;
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

	public String getUsers() throws Exception {
		List<User> userList = getDefService().getListData().getList();
		JSONArray ja = new JSONArray();
		for (User user : userList) {
			String pinyin = PinYin.toPinYinString(user.getName());
			if (pinyin.startsWith(getQuery().toUpperCase()) || user.getName().startsWith(getQuery())) {
				JSONObject record = new JSONObject();
				record.put("id", user.getId());
				record.put("text", user.getName());
				record.put("pinyin", pinyin);
				ja.add(record);
			}
		}
		jo.put("data", ja);
		return render(jo);
	}

	public UserService getUserService() {
		return userService;
	}

	public String lockUser() throws Exception {
		User user = (User) getSessionMap().get(Constants.AUTHED_USER);
		if (user.getId() == Integer.parseInt(getId())) {
			setJsonMessage(false, "自己不能锁定自己的哦");
		} else {
			boolean flag = userService.lockOrUnlockedUser(getId());
			jo.put(Constants.SUCCESS_KEY, flag);
		}
		return render(jo);
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
		record.put("name", user.getName());
		record.put("phoneNumber", user.getPhoneNumber());
		return record.getJsonObject();
	}
}
