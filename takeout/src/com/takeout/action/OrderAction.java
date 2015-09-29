package com.takeout.action;

import javax.annotation.Resource;

import org.apache.commons.lang.xwork.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.model.takeout.Food;
import com.model.takeout.Order;
import com.takeout.Helper;
import com.takeout.service.GenericService;
import com.takeout.service.OrderService;

import net.sf.json.JSONArray;
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
		order.setPayStatus(0);
		order.setPhoneNumber(get("phoneNumber"));
		order.setUser(Helper.toUser(get("user")));
		order.setUsername(get("username"));
		order.getFoods().clear();
		if (StringUtils.isNotEmpty(get("foods"))) {
			for (String fid : get("foods").split(",")) {
				Food food = Helper.toFood(fid);
				order.getFoods().add(food);
				order.setSum(order.getSum() + food.getPrice());
			}
		}

	}

	public void setOrderService(OrderService orderService) {
		this.orderService = orderService;
	}

	@Override
	protected JSONObject toJsonObject(Order order) throws Exception {
		Helper record = new Helper();
		record.put("id", order.getId());
		record.put("address", order.getAddress());
		record.put("createTime", order.getCreatetime());
		record.put("payStatus", order.getPayStatus());
		record.put("username", order.getUsername());
		record.put("phoneNumber", order.getPhoneNumber());
		record.put("sum", order.getSum());
		record.put("user", order.getUser());
		JSONArray ja = new JSONArray();
		for (Food food : order.getFoods()) {
			ja.add(new Helper().put("food", food));
		}
		record.put("foods", ja);

		return record.getJsonObject();
	}

}
