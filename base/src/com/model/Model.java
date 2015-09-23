package com.model;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Model implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 5996317431609336498L;

	@Override
	public String toString() {
		return "";
	}

}
