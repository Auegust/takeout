package com.takeout.service;

import java.util.Map;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.stereotype.Component;

import com.model.takeout.Region;
import com.takeout.log.annotation.LoggerClass;

@Component
@LoggerClass
public class RegionService extends GenericService<Region> {
	@Override
	protected DetachedCriteria getConditions(String query, Map<String, String> queryMap) {
		// TODO Auto-generated method stub
		return super.getConditions(query, queryMap);
	}
}
