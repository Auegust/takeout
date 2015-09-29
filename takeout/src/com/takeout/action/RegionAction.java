package com.takeout.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.model.takeout.Region;
import com.takeout.Helper;
import com.takeout.service.GenericService;
import com.takeout.service.RegionService;

import net.sf.json.JSONObject;

@Component
@Scope("prototype")
public class RegionAction extends GenericAction<Region> {

	/**
	 *
	 */
	private static final long serialVersionUID = -3515644701554070002L;
	@Resource
	private RegionService regionService;

	@Override
	public GenericService<Region> getDefService() {
		return regionService;
	}

	public RegionService getRegionService() {
		return regionService;
	}

	@Override
	protected void setEntity(Region region) throws Exception {
		region.setName(get("name"));
		region.setType(get("type"));
	}

	public void setRegionService(RegionService regionService) {
		this.regionService = regionService;
	}

	@Override
	protected JSONObject toJsonObject(Region region) throws Exception {
		Helper record = new Helper();
		record.put("name", region.getName());
		record.put("id", region.getId());
		record.put("type", region.getType());

		return record.getJsonObject();
	}

}
