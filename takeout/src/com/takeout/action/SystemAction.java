package com.takeout.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.model.takeout.Menu;
import com.model.takeout.MenuType;
import com.model.takeout.User;
import com.takeout.Helper;
import com.takeout.LoginSessionBindingListener;
import com.takeout.service.MenuService;
import com.takeout.service.UserService;
import com.takeout.util.Tools;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Component
@Scope("prototype")
public class SystemAction extends BaseAction {

	/**
	 *
	 */
	private static final long serialVersionUID = -1286129573507990832L;
	@Resource
	private MenuService menuService;
	@Resource
	private UserService userService;

	public MenuService getMenuService() {
		return menuService;
	}

	public String getMenuTree() throws Exception {
		Menu rootMenu = menuService.getRoot();
		JSONObject jo = walkMenuTree(rootMenu);
		return render((JSONArray) jo.get("children"));
	}

	public UserService getUserService() {
		return userService;
	}

	private List<String> getWidgetUrlsList() throws Exception {
		List<String> list = new ArrayList<String>();
		Menu rootMenu = menuService.getRoot();
		walkMenu(rootMenu, list);
		return list;
	}

	public String login() throws Exception {
		User loginUser = new User();
		loginUser.setName(get("name"));
		loginUser.setPassword(Tools.encodePassword(get("password")));
		User authUser = userService.authUser(loginUser);
		if (authUser == null) {
			setJsonMessage(false, "登录失败，请确定用户名或密码是否正确，以及用户是否被锁定");
			return render(jo);
		}
		cleanSessionMap();
		getSessionMap().put(Helper.LOGIN_LISTENER, new LoginSessionBindingListener(authUser));
		getSessionMap().put(Helper.AUTHED_USER, authUser);
		getSessionMap().put(Helper.WIDGET_URLS, getWidgetUrlsList());
		jo.put(SUCCESS_KEY, true);
		return render(jo);
	}

	public void setMenuService(MenuService menuService) {
		this.menuService = menuService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public String viewport() {
		return VIEWPORT;
	}

	private void walkMenu(Menu menu, List<String> list) {
		if (menu.getLeaf()) {
			list.add(menu.getUrl());
		} else {
			List<Menu> subMenus = menu.getChildren();
			for (Menu subMenu : subMenus) {
				walkMenu(subMenu, list);
			}
		}
	}

	private JSONObject walkMenuTree(Menu menu) {

		JSONObject jo = new JSONObject();

		jo.put("id", menu.getName());
		jo.put("text", menu.getText());

		// level 0
		if (menu.getType().equals(MenuType.ROOT)) {
			jo.put("expanded", true);
		}
		// level 1
		else if (menu.getType().equals(MenuType.CATEGORY)) {
			jo.put("cls", "parent-menu");
			jo.put("iconCls", menu.getIcon());
			jo.put("expanded", true);
			jo.put("singleClickExpand", true);
		}
		// level 2
		else if (menu.getType().equals(MenuType.NODE)) {
			jo.put("cls", "n-menu");
			jo.put("menuIcon", menu.getParent().getIcon());
		}
		if (menu.getLeaf()) {
			jo.put("leaf", true);
		} else {
			List<Menu> subMenus = menu.getChildren();
			JSONArray ja = new JSONArray();
			for (Menu submenu : subMenus) {
				ja.add(walkMenuTree(submenu));
				jo.put("children", ja);
			}
		}
		return jo;
	}
}
