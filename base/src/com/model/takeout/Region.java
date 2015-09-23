package com.model.takeout;
// Generated 2015-9-23 15:39:14 by Hibernate Tools 3.4.0.CR1

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.model.Model;

/**
 * Region generated by hbm2java
 */
@Entity
@Table(name = "region", catalog = "takeout")
public class Region extends Model {

	/**
	 *
	 */
	private static final long serialVersionUID = -2515420342064110829L;
	private int id;
	private String name;
	private String phoneNumber;
	private String postCode;
	private Region region;
	private List<Region> regions = new ArrayList<Region>();
	private String type;

	public Region() {
	}

	public Region(int id, Region region, String type) {
		this.id = id;
		this.region = region;
		this.type = type;
	}

	public Region(int id, Region region, String name, String phoneNumber, String postCode, String type,
			List<Region> regions) {
		this.id = id;
		this.region = region;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.postCode = postCode;
		this.type = type;
		this.regions = regions;
	}

	@Id

	@Column(name = "id", unique = true, nullable = false)
	public int getId() {
		return this.id;
	}

	@Column(name = "name", length = 100)
	public String getName() {
		return this.name;
	}

	@Column(name = "phoneNumber", length = 20)
	public String getPhoneNumber() {
		return this.phoneNumber;
	}

	@Column(name = "postCode", length = 20)
	public String getPostCode() {
		return this.postCode;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parentId", nullable = false)
	public Region getRegion() {
		return this.region;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "region")
	public List<Region> getRegions() {
		return this.regions;
	}

	@Column(name = "type", nullable = false, length = 10)
	public String getType() {
		return this.type;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}

	public void setRegion(Region region) {
		this.region = region;
	}

	public void setRegions(List<Region> regions) {
		this.regions = regions;
	}

	public void setType(String type) {
		this.type = type;
	}

}
