package com.takeout.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.model.takeout.Menu;

import net.sf.json.JSONObject;

@Component
@Scope("prototype")
public class MenuAction extends GenericAction<Menu> {

	/**
	 *
	 */
	private static final long serialVersionUID = -4377520361165416398L;

	@Override
	protected void setEntity(Menu entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	protected JSONObject toJsonObject(Menu entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
