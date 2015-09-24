package com.takeout.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.xwork.StringUtils;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

import com.model.takeout.Image;
import com.takeout.Helper;
import com.takeout.log.annotation.LoggerClass;
import com.takeout.util.Constants;

@Component
@LoggerClass
public class ImageService extends GenericService<Image> {
	public byte[] displayImage(String imageName) throws IOException {
		String imagePath = Constants.APP_ROOT_DIR + Constants.TEMP_UPLOAD_DIR + "/image/";
		File file = new File(imagePath + imageName);
		return FileUtils.readFileToByteArray(file);
	}

	@Override
	protected DetachedCriteria getConditions(String query, Map<String, String> queryMap) {
		DetachedCriteria criteria = super.getConditions(query, queryMap);
		String parentId = queryMap.get("parentId");
		if (StringUtils.isNotEmpty(parentId)) {
			criteria.add(Restrictions.eq("food.id", Integer.parseInt(parentId)));
		}
		criteria.addOrder(Order.asc("date"));
		return criteria;
	}

	public List<Image> getImageList(String parentId) {
		DetachedCriteria criteria = DetachedCriteria.forClass(Image.class);
		criteria.add(Restrictions.eq("food.id", Integer.parseInt(parentId)));
		criteria.addOrder(Order.desc("date"));
		List<Image> list = getDefDao().findByCriteria(criteria);
		return list;
	}

	public String uploadImage(String fid, File image, String imagePath) throws IOException {
		String imageType = Helper.getImageType(imagePath);
		if (imageType == null) {
			return null;
		}
		String imageName = Helper.getTimeNo();
		String path = Constants.APP_ROOT_DIR + Constants.TEMP_UPLOAD_DIR + "/image/";
		File file = new File(path + imageName + "." + imageType);
		if (!file.getParentFile().exists()) {
			file.getParentFile().mkdirs();
		}
		FileUtils.writeByteArrayToFile(file, FileUtils.readFileToByteArray(image));
		String fileName = imageName + "." + imageType;
		return fileName;
	}
}
