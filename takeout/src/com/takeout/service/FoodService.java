package com.takeout.service;

import java.util.Map;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

import com.model.takeout.Food;
import com.takeout.log.annotation.LoggerClass;

@Component
@LoggerClass
public class FoodService extends GenericService<Food> {
	@Override
	protected DetachedCriteria getConditions(String query, Map<String, String> queryMap) {
		DetachedCriteria criteria = super.getConditions(query, queryMap);
		if (queryMap != null) {
			String queryParam = queryMap.get("queryParam");
			if (queryParam != null && !queryParam.equals("")) {
				criteria.add(Restrictions.like("name", queryParam, MatchMode.ANYWHERE));
			}
		}
		return criteria;
	}
}
