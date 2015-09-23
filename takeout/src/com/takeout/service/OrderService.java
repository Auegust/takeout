package com.takeout.service;

import java.util.Map;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.stereotype.Component;

import com.model.takeout.Order;
import com.takeout.log.annotation.LoggerClass;

@Component
@LoggerClass
public class OrderService extends GenericService<Order> {
	@Override
	protected DetachedCriteria getConditions(String query, Map<String, String> queryMap) {
		// TODO Auto-generated method stub
		return super.getConditions(query, queryMap);
	}
}
