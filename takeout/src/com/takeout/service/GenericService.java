package com.takeout.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;

import com.takeout.ListData;
import com.takeout.dao.GenericDao;
import com.takeout.log.annotation.LoggerMethod;
import com.takeout.util.GenericsUtil;

/**
 * 一个泛型Service,针对一个Entity提供一系列模板方法．
 *
 * @param <E>
 *            Entity的类型
 * @author Neo
 */
public abstract class GenericService<E> extends BaseService {

	@Resource
	private GenericDao<E> defDao;

	private Class<E> entityClass;

	/**
	 * 子类初始时根据子类的泛型参数决定Entity的类型,这个构造函数不能直接调用
	 */
	@SuppressWarnings("unchecked")
	protected GenericService() {
		this.entityClass = GenericsUtil.getGenericClass(getClass());
	}

	@LoggerMethod(operateName = "新增")
	public E add(E entity) throws Exception {
		return defDao.add(entity);
	}

	@LoggerMethod(operateName = "删除")
	public void del(E entity) throws Exception {
		defDao.del(entity);
	}

	public int delAll() {
		return defDao.bulkUpdate("delete from " + entityClass.getSimpleName());
	}

	/**
	 * 属性相等条件查询 例如 name = lisa
	 *
	 * @param propertyName
	 *            属性名
	 * @param value
	 *            属性值
	 * @return List<E>
	 */
	public List<E> findByProperty(String propertyName, Object value) {
		return findByProperty(propertyName, "=", value);
	}

	/**
	 * 属性条件查询 例如 age > 30,name = lisa
	 *
	 * @param propertyName
	 *            属性名
	 * @param operator
	 *            操作符
	 * @param value
	 *            属性值
	 */
	@SuppressWarnings("unchecked")
	public List<E> findByProperty(String propertyName, String operator, Object value) {
		String queryString = "from " + this.entityClass.getSimpleName() + " as e where e." + propertyName + " "
				+ operator + " ? ";
		return defDao.findByQueryString(queryString, value);
	}

	/**
	 * 属性相等条件查询,得到的是一个唯一值
	 *
	 * @param propertyName
	 *            属性名
	 * @param value
	 *            属性值
	 * @return 唯一值或者null
	 */
	public E findUniqueByProperty(String propertyName, Object value) {
		List<E> list = findByProperty(propertyName, value);
		if (list != null && list.size() >= 1)
			return list.get(0);
		else
			return null;
	}

	public E get(String id) {
		return StringUtils.isEmpty(id) ? null : defDao.getById(entityClass, getPk(id));
	}

	public List<E> getAll() {
		return defDao.findByCriteria(DetachedCriteria.forClass(this.entityClass));
	}

	/**
	 * @param query
	 * @param queryMap
	 * @return
	 */
	protected DetachedCriteria getConditions(String query, Map<String, String> queryMap) {
		return DetachedCriteria.forClass(this.entityClass).addOrder(getOrder());
	}

	public GenericDao<E> getDefDao() {
		return defDao;
	}

	public Class<E> getEntityClass() {
		return entityClass;
	}

	public ListData<E> getListData() {
		return getListData(getConditions(null, null), 0, 0);
	}

	public ListData<E> getListData(DetachedCriteria criteria) {
		List<E> list = defDao.findByCriteria(criteria);
		int total = list.size();
		return new ListData<E>(list, total);
	}

	public ListData<E> getListData(DetachedCriteria criteria, int start, int limit) {
		int total = getTotal(criteria);
		criteria.setProjection(null);
		criteria.setResultTransformer(Criteria.ROOT_ENTITY);
		List<E> list = defDao.findByCriteria(criteria, start, limit);
		return new ListData<E>(list, total);
	}

	public ListData<E> getListData(String query, Map<String, String> queryMap, int start, int limit) {
		ListData<E> listData = null;
		// 不分页
		if (limit == 0) {
			listData = getListData(getConditions(query, queryMap));
			// 分页
		} else {
			listData = getListData(getConditions(query, queryMap), start, limit);
		}
		return listData;
	}

	/**
	 * override以改变数据集的默认排序方式
	 *
	 * @return
	 */
	protected Order getOrder() {
		return Order.desc("id");
	}

	/**
	 * 转换为主键的值，这种实现会有问题
	 *
	 * @param id
	 * @return 实体List
	 */
	private Serializable getPk(String id) {
		try {
			int longPk = Integer.valueOf(id);
			return longPk;
		} catch (NumberFormatException e) {
			return id;
		}
	}

	@SuppressWarnings("unchecked")
	public E getRoot() {
		return (E) defDao.findByQueryString("from " + entityClass.getSimpleName() + " as e where e.parent is null")
				.get(0);
	}

	public int getTotal() {
		return defDao.getTotal();
	}

	private int getTotal(DetachedCriteria conditions) {
		return (Integer) defDao.getHibernateTemplate().findByCriteria(conditions.setProjection(Projections.rowCount()))
				.iterator().next();
	}

	public void setDefDao(GenericDao<E> defDao) {
		this.defDao = defDao;
	}

	public void setEntityClass(Class<E> entityClass) {
		this.entityClass = entityClass;
	}

	@LoggerMethod(operateName = "修改")
	public E update(E entity) {
		return defDao.update(entity);
	}
}
