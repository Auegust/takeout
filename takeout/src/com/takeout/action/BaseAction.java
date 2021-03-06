package com.takeout.action;

import java.io.BufferedOutputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.model.takeout.User;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.annotations.Before;
import com.opensymphony.xwork2.interceptor.annotations.BeforeResult;
import com.takeout.Helper;
import com.takeout.util.Constants;

import net.sf.json.JSON;
import net.sf.json.JSONObject;

/**
 * 所有Action的基类,提供了方法拦截器,身份验证,
 * 提供了输出文本流,二进制流,设置json返回值等一系列实用方法
 * @author Neo.Liao
 *
 */
/**
 * @author Neo.Liao
 *
 */
public class BaseAction extends ActionSupport implements ServletRequestAware, ServletResponseAware, SessionAware {

	/**
	 *
	 */
	private static final long serialVersionUID = -1802076245363405646L;

	/**
	 * 登陆用户,它的值来自session,如果session失效,它的值也为空
	 */
	protected User authedUser;
	/**
	 * 注入一个name为id的request parameter
	 */
	protected String id;

	/**
	 * 一个全局 JSONObject 对象,它的内容将会被输出
	 */
	protected JSONObject jo = new JSONObject();

	/**
	 * 注入一个name为limit的request parameter,用于翻页查询,它的值不为0时,会自动实现翻页查询
	 */
	protected int limit;

	protected final Logger logger = LoggerFactory.getLogger("ROOT");

	/**
	 * matchPinyin 查询时是否支持拼音匹配
	 */
	private boolean matchPinyin = true;

	/**
	 * 注入一个name为node的request parameter,它是ext tree的节点id
	 */
	protected String node;

	/**
	 * 注入一个name为parentId的request parameter
	 */
	protected String parentId;

	/**
	 * 注入一个name为query的request parameter,常用于简单查询
	 */
	protected String query;

	/**
	 * 用于复杂查询,它的值不为空时,在service层override一个 getCondition(Map
	 * <String,String> queryMap)的方法,可实现复杂条件的查询
	 */
	protected Map<String, String> queryMap = new HashMap<String, String>();

	/**
	 * request全局变量
	 */
	protected HttpServletRequest request;

	/**
	 * response全局变量
	 */
	protected HttpServletResponse response;

	/**
	 * sessionMap全局变量
	 */
	protected Map<String, Object> sessionMap;

	/**
	 * 注入一个name为start的request parameter,用于翻页查询
	 */
	protected int start;

	// 验证失败时调用
	private String authFailed() throws Exception {
		logger.info("验证失败");
		response.setStatus(403);
		return isAjaxRequest() ? Constants.AUTH_FAILD : Constants.VIEWPORT;
	}

	/**
	 * action方法拦截器方法,在action方法执行前执行
	 *
	 * @return 跳转页面result name,为null时不跳转
	 * @throws Exception
	 */
	@Before
	public String beforeDoAction() throws Exception {
		// 绑定一个httpSession到本地线程,供其它层调用
		Helper.setHttpSessionInThread(request.getSession());

		// 身份验证
		authedUser = (User) getSessionMap().get(Constants.AUTHED_USER);
		if (this.authedUser == null && !(request.getServletPath().equals("/system/initDb")
				|| request.getServletPath().equals("/system/login")
				|| request.getServletPath().startsWith("/website"))) {
			return authFailed();
		}
		return null;
	}

	/**
	 * action方法拦截器方法,在return result之前执行
	 */
	@BeforeResult
	public void BeforeResult() {
		// 移除httpSession从本地线程
		Helper.removeHttpSessionInThread();
	}

	public void cleanSessionMap() {
		getSessionMap().clear();
	}

	/**
	 * request.getParameter的快捷方法
	 *
	 * @param paramName
	 *            http参数名称
	 * @return paramValue http参数值
	 */
	public String get(String paramName) {
		return request.getParameter(paramName);

	}

	public User getAuthedUser() {
		return authedUser;
	}

	public String getId() {
		return id;
	}

	public int getLimit() {
		return limit;
	}

	public String getNode() {
		return node;
	}

	public String getParentId() {
		return parentId;
	}

	public String getQuery() {
		return query;
	}

	public Map<String, String> getQueryMap() {
		return queryMap;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public Map<String, Object> getSessionMap() {
		return sessionMap;
	}

	public int getStart() {
		return start;
	}

	/**
	 * 验证这个请求是否是一个AJAX请求,基于http header的检验
	 *
	 * @return 是否是一个AJAX请求
	 */
	protected boolean isAjaxRequest() {
		return request.getHeader("X-Requested-With") != null
				&& request.getHeader("X-Requested-With").equalsIgnoreCase("XMLHttpRequest");
	}

	public boolean isMatchPinyin() {
		return matchPinyin;
	}

	/**
	 * 输出一个二进制流,主要用于显示图片等
	 *
	 * @param bytes
	 *            二进制数据
	 * @param contentType
	 *            Image数据MIME
	 * @return null
	 * @throws Exception
	 */
	protected String render(byte[] bytes, String contentType) throws Exception {
		// 不使用缓存,如果使用,https ie下不能下载
		setResponse(contentType, false);
		OutputStream out = new BufferedOutputStream(response.getOutputStream());
		out.write(bytes);
		out.flush();
		out.close();
		return null;
	}

	/**
	 * 输出一个json text,不返回任何页面
	 *
	 * @param json
	 *            一个json对象,可以是jsonObject或者jsonArray
	 * @return null
	 * @throws Exception
	 */
	protected String render(JSON json) throws Exception {
		return render(json.toString(2), "text/json");
	}

	/**
	 * 输出一个html text,不返回任何页面
	 *
	 * @param htmlString
	 *            html文档string
	 * @return null
	 * @throws Exception
	 */
	protected String render(String htmlString) throws Exception {
		return render(htmlString, "text/html");
	}

	/**
	 * 输出一个其它类型的text,类型MIME为contentType的值,不返回任何页面
	 *
	 * @param text
	 *            文本内容
	 * @param contentType
	 *            文本MIME
	 * @return null
	 * @throws Exception
	 */
	protected String render(String text, String contentType) throws Exception {
		setResponse(contentType);
		PrintWriter out = response.getWriter();
		out.print(text);
		out.flush();
		out.close();
		return null;
	}

	/**
	 * 输出一个二进制流,主要用于二进制文件的下载
	 *
	 * @param bytes
	 *            二进制数据
	 * @param contentType
	 *            数据MIME
	 * @param fileName
	 *            文件名
	 * @return null
	 * @throws Exception
	 */
	protected String renderFile(byte[] bytes, String fileName) throws Exception {
		// response.addHeader("Content-Disposition",
		// "attachment;filename="+new
		// String(fileName.getBytes("utf-8"),"ISO8859-1"));
		response.addHeader("Content-Disposition",
				"attachment;filename=" + new String(fileName.getBytes("GB2312"), "ISO-8859-1"));
		return render(bytes, "application/octet-stream");
	}

	/**
	 * 输出一个警告提示信息
	 *
	 * @param s
	 *            消息内容
	 * @return null
	 * @throws Exception
	 */
	protected String renderWarning(String s) throws Exception {
		response.setStatus(420);
		return render(s);
	}

	public void setAuthedUser(User authedUser) {
		this.authedUser = authedUser;
	}

	public void setId(String id) {
		this.id = id;
	}

	/**
	 * 输出一个json Message,这个message将用于ext如何处理回调函数
	 *
	 * @param flag
	 *            执行标志
	 */
	protected void setJsonMessage(boolean flag) {
		jo.put(Constants.SUCCESS_KEY, flag);
	}

	/**
	 * 输出一个json Message,并包含返回数据,这个message将用于ext如何处理回调函数
	 *
	 * @param flag
	 *            执行标志
	 * @param data
	 *            返回数据
	 */
	protected void setJsonMessage(boolean flag, JSON data) {
		setJsonMessage(flag);
		jo.put(Constants.DATA_KEY, data);
	}

	/**
	 * 输出一个json Message,并包含一个提示信息,这个message将用于ext如何处理回调函数
	 *
	 * @param flag
	 *            执行标志
	 * @param msg
	 *            提示信息
	 */
	protected void setJsonMessage(boolean flag, String msg) {
		setJsonMessage(flag);
		jo.put(Constants.MSG_KEY, msg);
		response.setHeader("hasMsg", "true");
	}

	/**
	 * 输出一个json Message,并包含返回数据和提示信息,这个message将用于ext如何处理回调函数
	 *
	 * @param flag
	 *            执行标志
	 * @param msg
	 *            提示信息
	 * @param data
	 *            返回数据
	 */
	protected void setJsonMessage(boolean flag, String msg, JSON data) {
		setJsonMessage(flag, msg);
		jo.put(Constants.DATA_KEY, data);
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public void setMatchPinyin(boolean matchPinyin) {
		this.matchPinyin = matchPinyin;
	}

	public void setNode(String node) {
		this.node = node;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public void setQueryMap(Map<String, String> queryMap) {
		this.queryMap = queryMap;
	}

	private void setResponse(String contentType) {
		setResponse(contentType, true);
	}
	// setter and
	// getter==================================================================

	private void setResponse(String contentType, boolean noCache) {
		response.setCharacterEncoding("utf-8");
		response.setContentType(contentType);
		if (noCache) {
			response.setHeader("Cache-Control", "no-cache");
			response.setHeader("Pragma", "no-cache");
		}
	}

	/*
	 * 三个注入方法
	 */
	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

	@Override
	public void setSession(Map<String, Object> sessionMap) {
		this.sessionMap = sessionMap;
	}

	public void setStart(int start) {
		this.start = start;
	}

}
