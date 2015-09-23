package com.takeout.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.model.takeout.Order;

import net.sf.json.JSONObject;

@Component
@Scope("prototype")
public class OrderAction extends GenericAction<Order> {

	/**
	 *
	 */
	private static final long serialVersionUID = 5079749747504551385L;

	@Override
	protected void setEntity(Order entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	protected JSONObject toJsonObject(Order entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
