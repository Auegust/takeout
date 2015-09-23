package com.takeout.action;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.model.takeout.Food;
import com.takeout.Helper;
import com.takeout.service.FoodService;
import com.takeout.service.GenericService;

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

	@Override
	public GenericService<Food> getDefService() {
		return foodService;
	}

	public FoodService getFoodService() {
		return foodService;
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
