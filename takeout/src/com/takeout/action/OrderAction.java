package com.takeout.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.model.takeout.Order;
import com.takeout.Helper;
import com.takeout.service.GenericService;
import com.takeout.service.OrderService;

import net.sf.json.JSONObject;

@Component
@Scope("prototype")
public class OrderAction extends GenericAction<Order> {

	/**
	 *
	 */
	private static final long serialVersionUID = 5079749747504551385L;
	@Resource
	private OrderService orderService;

	@Override
	public GenericService<Order> getDefService() {
		return orderService;
	}

	public OrderService getOrderService() {
		return orderService;
	}

	@Override
	protected void setEntity(Order order) throws Exception {
		order.setAddress(get("address"));
		order.setContent(get("content"));
		order.setPayStatus(Integer.parseInt(get("payStatus")));
		order.setPhoneNumber(get("phoneNumber"));
		order.setSum(Double.parseDouble(get("sum")));
		order.setUsername(get("username"));
	}

	public void setOrderService(OrderService orderService) {
		this.orderService = orderService;
	}

	@Override
	protected JSONObject toJsonObject(Order order) throws Exception {
		Helper record = new Helper();
		record.put("id", order.getId());
		record.put("address", order.getAddress());
		record.put("content", order.getContent());
		record.put("createTime", order.getCreatetime());
		record.put("payStatus", order.getPayStatus());
		record.put("username", order.getUsername());
		record.put("phoneNumber", order.getPhoneNumber());
		record.put("sum", order.getSum());
		return record.getJsonObject();
	}

}
