package com.model.takeout;
// Generated 2015-9-23 15:39:14 by Hibernate Tools 3.4.0.CR1

import static javax.persistence.GenerationType.IDENTITY;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.model.Model;

/**
 * Food generated by hbm2java
 */
@Entity
@Table(name = "food", catalog = "takeout")
public class Food extends Model {

	/**
	 *
	 */
	private static final long serialVersionUID = -3469834190869103723L;
	private String description;
	private long id;
	private List<Image> images = new ArrayList<Image>();
	private String name;
	private List<Order> orders = new ArrayList<Order>();
	private double price;

	public Food() {
	}

	public Food(Integer id) {
		this.id = id;
	}

	public Food(String name, Double price, String description, List<Image> images) {
		this.name = name;
		this.price = price;
		this.description = description;
		this.images = images;
	}

	@Column(name = "description", length = 100)
	public String getDescription() {
		return this.description;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "id", unique = true, nullable = false)
	public long getId() {
		return this.id;
	}

	@OneToMany(mappedBy = "food")
	public List<Image> getImages() {
		return this.images;
	}

	@Column(name = "name", length = 50)
	public String getName() {
		return this.name;
	}

	@ManyToMany(mappedBy = "foods")
	public List<Order> getOrders() {
		return orders;
	}

	@Column(name = "price", precision = 10)
	public double getPrice() {
		return this.price;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

}
