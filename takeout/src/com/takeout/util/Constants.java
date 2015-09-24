package com.takeout.util;

import javax.servlet.http.HttpSession;

public class Constants {

	public static final String APP_ROOT_DIR = "/home/weblogic";
	public static final String AUTH_FAILD = "authFailed";
	public static final String AUTHED_USER = "authedUser";// User
	public static final String DATA_KEY = "data";
	public static boolean DEBUG = true;

	public static final String ENTITY_KEY = "entity";
	public static final String EXCEPTION = "exception";
	public static final String FAILED = "failed";
	public static final ThreadLocal<HttpSession> HTTP_SESSION_IN_THREAD = new ThreadLocal<HttpSession>();

	public static final String INDEX = "index";
	public static final String INPUT = "input";
	public static final String LOGIN_LISTENER = "loginListener";
	public static final String MSG_KEY = "msg";
	public static final String OWNERWEBSITE = "owner";
	public static final String PRIVILEGES = "privileges";// (String)Object []
	public static final String PRIVILEGES_STRING = "privilegesString";// "['role'],['role_view']"
	public static final String PROJECTWEBSITE = "project";
	public static final String ROLES_STRING = "rolesString";// String
	public static final String SELECTWEBSITE = "select";
	public static final String SUCCESS_KEY = "success";
	public static final String TEMP_UPLOAD_DIR = "/upload";
	public static final String TEMPLATE = "template";
	public static final String TOTAL_COUNT_KEY = "totalCount";
	public static final String VIEWPORT = "viewport";
	public static final String VOTEWEBSITE = "vote";
	public static final String WEBSITE = "website";
	public static final String WEBUSER = "webUser";
	public static final String WIDGET_URLS = "widgets";// String
														// "['/admin/menu.js'],['/admin/role.js']"

}
