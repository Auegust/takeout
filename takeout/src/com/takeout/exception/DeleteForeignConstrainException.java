package com.takeout.exception;

/**
 * 当删除表中一条记录时,因为外键约束导致删除失败,抛出这个异常
 * 
 * @author Neo.Liao
 *
 */
public class DeleteForeignConstrainException extends Exception {

	/**
	 *
	 */
	private static final long serialVersionUID = -2666374041518828574L;

}
