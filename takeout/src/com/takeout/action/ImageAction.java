package com.takeout.action;

import java.io.File;
import java.util.Date;

import javax.annotation.Resource;

import com.model.takeout.Food;
import com.model.takeout.Image;
import com.takeout.Helper;
import com.takeout.service.FoodService;
import com.takeout.service.GenericService;
import com.takeout.service.ImageService;

import net.sf.json.JSONObject;

public class ImageAction extends GenericAction<Image> {
	/**
	 *
	 */
	private static final long serialVersionUID = 136952506278953153L;
	@Resource
	private FoodService foodService;
	private File image;

	@Resource
	private ImageService imageService;

	@Override
	public GenericService<Image> getDefService() {
		return imageService;
	}

	public FoodService getFoodService() {
		return foodService;
	}

	public ImageService getImageService() {
		return imageService;
	}

	@Override
	public String list() throws Exception {
		queryMap.put("parentId", parentId);
		return super.list();
	}

	@Override
	protected void setEntity(Image image) throws Exception {
		Food food = foodService.get(parentId);
		image.setFood(food);
		image.setName(get("name"));
		image.setDate(new Date());
	}

	public void setFoodService(FoodService foodService) {
		this.foodService = foodService;
	}

	public void setImageService(ImageService imageService) {
		this.imageService = imageService;
	}

	@Override
	protected JSONObject toJsonObject(Image image) throws Exception {
		Helper record = new Helper();
		record.put("id", image.getId());
		record.put("name", image.getName());
		record.put("date", image.getDate());
		return record.getJsonObject();
	}

	public String uploadImage() throws Exception {
		String name = imageService.uploadImage(get("id"), image, get("imagePath"));
		String returnImageStr = "";
		if (name == null) {
			returnImageStr = "{'success':false}";
		} else {
			returnImageStr = "{'success':true,'imageName':'" + name + "'}";
		}
		return render(returnImageStr);
	}
}
