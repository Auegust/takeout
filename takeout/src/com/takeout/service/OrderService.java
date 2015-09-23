package com.takeout.service;

import org.springframework.stereotype.Component;

import com.model.takeout.Order;
import com.takeout.log.annotation.LoggerClass;

@Component
@LoggerClass
public class OrderService extends GenericService<Order> {

}
