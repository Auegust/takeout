package com.takeout.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.model.takeout.Region;

import net.sf.json.JSONObject;

@Component
@Scope("prototype")
public class RegionAction extends GenericAction<Region> {

	/**
	 *
	 */
	private static final long serialVersionUID = -3515644701554070002L;

	@Override
	protected void setEntity(Region entity) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	protected JSONObject toJsonObject(Region entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
