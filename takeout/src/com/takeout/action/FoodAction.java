package com.takeout.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.model.takeout.Food;
import com.model.takeout.Order;
import com.takeout.Helper;
import com.takeout.service.FoodService;
import com.takeout.service.GenericService;
import com.takeout.service.OrderService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Component
@Scope("prototype")
public class FoodAction extends GenericAction<Food> {
	/**
	 *
	 */
	private static final long serialVersionUID = 4308402579979557925L;

	@Resource
	private FoodService foodService;
	@Resource
	private OrderService OrderService;

	@Override
	public GenericService<Food> getDefService() {
		return foodService;
	}

	public String getFoodsByOrder() throws Exception {
		Order order = OrderService.get(getId());
		List<Food> foodList = foodService.getListData().getList();
		JSONArray ja = new JSONArray();
		for (Food food : foodList) {
			JSONObject record = new JSONObject();
			record.put("id", food.getId());
			record.put("text", food.getName());
			record.put("checked", order == null ? false : order.getFoods().contains(food));
			ja.add(record);
		}
		jo.put("data", ja);
		return render(jo);
	}

	public FoodService getFoodService() {
		return foodService;
	}

	public OrderService getOrderService() {
		return OrderService;
	}

	@Override
	protected void setEntity(Food food) throws Exception {
		food.setDescription(get("description"));
		food.setName(get("name"));
		food.setPrice(Double.parseDouble(get("price")));
	}

	public void setFoodService(FoodService foodService) {
		this.foodService = foodService;
	}

	public void setOrderService(OrderService orderService) {
		OrderService = orderService;
	}

	@Override
	protected JSONObject toJsonObject(Food food) throws Exception {
		Helper record = new Helper();
		record.put("id", food.getId());
		record.put("name", food.getName());
		record.put("description", food.getDescription());
		record.put("price", food.getPrice());
		return record.getJsonObject();
	}

}
