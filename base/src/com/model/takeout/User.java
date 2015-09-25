package com.model.takeout;
// Generated 2015-9-23 15:39:14 by Hibernate Tools 3.4.0.CR1

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.model.Model;

/**
 * User generated by hbm2java
 */
@Entity
@Table(name = "user", catalog = "takeout")
public class User extends Model {

	/**
	 *
	 */
	private static final long serialVersionUID = 6018851750505876613L;
	private String address;
	private int id;
	private boolean locked;
	private String name;
	private List<Order> orders = new ArrayList<Order>();
	private String password;
	private String phoneNumber;

	public User() {
	}

	public User(int id, String password) {
		this.id = id;
		this.password = password;
	}

	public User(int id, String name, String address, boolean locked, String password, String phoneNumber,
			List<Order> orders) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.locked = locked;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.orders = orders;
	}

	@Column(name = "address", length = 200)
	public String getAddress() {
		return this.address;
	}

	@Id

	@Column(name = "id", unique = true, nullable = false)
	public int getId() {
		return this.id;
	}

	@Column(name = "locked")
	public boolean getLocked() {
		return this.locked;
	}

	@Column(name = "name", length = 50)
	public String getName() {
		return this.name;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	public List<Order> getOrders() {
		return this.orders;
	}

	@Column(name = "password", nullable = false, length = 100)
	public String getPassword() {
		return this.password;
	}

	@Column(name = "phoneNumber", length = 20)
	public String getPhoneNumber() {
		return this.phoneNumber;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

}
