package com.takeout;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.xwork.StringUtils;

import com.model.Model;
import com.model.takeout.User;
import com.takeout.util.Constants;
import com.takeout.util.Tools;

import jxl.Sheet;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 助手类,提供有关json和date的快捷操作
 *
 * @author Neo.Liao
 *
 */
public class Helper {

	public static String getCell(Sheet sheet, int column, int row) {
		return sheet.getCell(column, row).getContents().trim();
	}

	public static HttpSession getHttpSessionInThread() {
		return Constants.HTTP_SESSION_IN_THREAD.get();
	}

	public static String getImageType(String imagePath) {
		String temp = imagePath.toLowerCase();
		if (temp.lastIndexOf(".jpg") != -1) {
			return "jpg";
		} else if (temp.lastIndexOf(".jpeg") != -1) {
			return "jpeg";
		} else if (temp.lastIndexOf(".gif") != -1) {
			return "gif";
		} else {
			return null;
		}
	}

	public static String getTimeNo() {
		Date date = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
		return format.format(date);
	}

	public static User getUser() {
		if (Constants.HTTP_SESSION_IN_THREAD.get() != null) {
			return (User) Constants.HTTP_SESSION_IN_THREAD.get().getAttribute(Constants.AUTHED_USER);
		} else
			return null;
	}

	public static void removeHttpSessionInThread() {
		Constants.HTTP_SESSION_IN_THREAD.remove();
	}

	public static void setHttpSessionInThread(HttpSession httpSession) {
		Constants.HTTP_SESSION_IN_THREAD.set(httpSession);
	}

	public static Date toDate(String dateString) throws ParseException {
		return Tools.string2Date(dateString);
	}

	public static String toDateString(Date date) throws ParseException {
		return Tools.date2String(date);
	}

	public static JSONArray toJsonArray(Collection<Model> collection) {
		return toJsonArray(collection, "id", "name");
	}

	public static JSONArray toJsonArray(Collection<Model> collection, String idProperty, String nameProperty) {
		JSONArray ja = new JSONArray();
		for (Model e : collection) {
			String id = null;
			String text = null;
			try {
				id = BeanUtils.getSimpleProperty(e, idProperty);
				text = BeanUtils.getSimpleProperty(e, nameProperty);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
			JSONObject temp = new JSONObject();
			temp.put("id", id);
			temp.put("text", text);
			ja.add(temp);
		}
		return ja;
	}

	public static JSONArray toJsonArray(Map<String, CachedValue> map) {
		JSONArray ja = new JSONArray();
		for (Entry<String, CachedValue> e : map.entrySet()) {
			JSONObject temp = new JSONObject();
			temp.put("id", e.getKey());
			temp.put("text", e.getValue().getName());
			temp.put("pinyin", e.getValue().getPinyin());
			temp.put("code", e.getValue().getCode());

			if (StringUtils.isNotEmpty(e.getValue().getRelativeId())) {
				JSONObject relative = new JSONObject();
				relative.put("id", e.getValue().getRelativeId());
				relative.put("text", e.getValue().getRelativeName());
				temp.put("relative", relative);
			}

			ja.add(temp);
		}
		return ja;
	}

	public static JSONObject toJsonObject(Collection<Model> collection) {
		JSONObject jo = new JSONObject();
		jo.put(Constants.DATA_KEY, toJsonArray(collection));
		return jo;
	}

	public static JSONObject toJsonObject(Collection<Model> collection, String idProperty, String nameProperty) {
		JSONObject jo = new JSONObject();
		jo.put(Constants.DATA_KEY, toJsonArray(collection, idProperty, nameProperty));
		return jo;
	}

	public static JSONObject toJsonObject(Map<String, CachedValue> map) {
		JSONObject jo = new JSONObject();
		jo.put(Constants.DATA_KEY, toJsonArray(map));
		return jo;
	}

	public static boolean userHasPrivilege(String privilegeCode) {
		Object[] privileges;
		if (Constants.HTTP_SESSION_IN_THREAD.get() != null) {
			privileges = (Object[]) Constants.HTTP_SESSION_IN_THREAD.get().getAttribute(Constants.PRIVILEGES);
		} else
			return false;
		if (privileges == null)
			return false;
		for (Object p : privileges) {
			if (((String) p).equals(privilegeCode))
				return true;
		}
		return false;
	}

	DecimalFormat df = new DecimalFormat("#,##0.00");

	DecimalFormat dft = new DecimalFormat("#,##0.000");

	protected JSONObject jsonObject;

	public Helper() {
		jsonObject = new JSONObject();
	}

	public JSONObject getJsonObject() {
		return jsonObject;
	}

	public Object put(String key, boolean o) {
		return jsonObject.put(key, o);
	}

	public Object put(String key, Boolean o) {
		return jsonObject.put(key, o);
	}

	public Object put(String key, Date o) {
		return jsonObject.put(key, Tools.date2String(o));
	}

	/*
	 * public Object put(String key,double o){ return jsonObject.put(key,
	 * df.format(o)); }
	 */
	public Object put(String key, double value) {
		return jsonObject.put(key, value);
	}

	/*
	 * public Object put(String key,double o,int digital){ return
	 * jsonObject.put(key, dft.format(o)); }
	 */
	public Object put(String key, double o, int digital) {
		return jsonObject.put(key, o);
	}

	/*
	 * public Object put(String key,Double o){ return jsonObject.put(key, o !=
	 * null ? df.format(o) : ""); }
	 */
	public Object put(String key, Double value) {
		return jsonObject.put(key, value);
	}

	/*
	 * public Object put(String key,Double o,int digital){ return
	 * jsonObject.put(key, o != null ? dft.format(o) : ""); }
	 */
	public Object put(String key, Double o, int digital) {
		return jsonObject.put(key, o);
	}

	public Object put(String key, int o) {
		return jsonObject.put(key, o);
	}

	public Object put(String key, Integer o) {
		return jsonObject.put(key, o);
	}

	public Object put(String key, JSONArray o) {
		return jsonObject.put(key, o);
	}

	public Object put(String key, JSONObject o) {
		return jsonObject.put(key, o);
	}

	public Object put(String key, long o) {
		return jsonObject.put(key, o);
	}

	public Object put(String key, Long o) {
		return jsonObject.put(key, o);
	}

	public Object put(String key, String o) {
		return jsonObject.put(key, o);
	}

	public String toString(int indentFactor) {
		return jsonObject.toString(indentFactor);
	}

}
