<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<style type="text/css">
#container {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background:#f9f8f8;
}
#midbody{
	width:1000px;
	height: auto;
	margin:0 auto;
	overflow:hidden;
	background: #fff;
}
</style>
</head>
<s:include value="common/header.jsp"></s:include>
<body>
	<div id="container">
		<s:include value="common/menu.jsp"></s:include>
		<div id="midbody">
    		<div >
            	<table width="900" cellpadding="0" cellspacing="0">
	                <tr>
	                  	<td height="400" valign="top">              
							<table align="center" width="649"  cellpadding="0" cellspacing="0">
								<tr valign="bottom">
	 								<td height="20" style="color: #187101; padding-top: 5px;" align="left">
	     								<strong>首页-图片新闻</strong>
	 								</td>
								</tr>
								<tr valign="top">
	 								<td colspan="2" style="background-image:url(include/image/list_point.jpg)">
	 								</td>
								</tr>
								<tr>
	 								<td height="2" colspan="2">
	 								</td>
								</tr>
								<tr valign="top" align="left" style="line-height: 150%">
	    							<td width="100%" valign="top">
	    								<table width='100%' cellspacing='0' cellpadding='0'>
	    									<s:iterator value="newsList">
	    										<tr style='line-height:200%;'>
	            									<td>
	            										<img src='include/image/gray_arrow.gif' style='padding-right:5px;'/>
	            									</td>
	            									<td style="width:74%;text-align:left">
	            										<s:set name="url" value="'news_index?newsId=' + id"/>
														<a href="<s:property value='url'/>" target="_blank"><s:property value="display"/></a>
	            									</td>
	            									<td align="right">
	            										<s:date name="published" format="yyyy-MM-dd"/>
	            									</td>
	            								</tr>
											</s:iterator>
										</table>
	    							</td>
								</tr>
							</table>
	                  	</td>
	                </tr>
	                <s:if test="totalPage > 1">
                    	<tr align="center">
                        	<td align="center" style="height: 25px; text-align: center;">
                                                                                      共有<span><s:property value='totalCount'/></span>条
                                <span><s:property value='totalPage'/></span>页结果 &nbsp;&nbsp;&nbsp;&nbsp;当前为第
                                <span><s:property value='currentPage'/></span>页&nbsp;&nbsp;&nbsp;20条/页&nbsp;&nbsp;&nbsp;
                                <s:if test="currentPage > 1">
									<a href="news_list?currentPage=${currentPage - 1}">上一页</a>&nbsp;&nbsp;
								</s:if>
								<s:if test="currentPage != totalPage">
									<a href="news_list?currentPage=${currentPage + 1}">下一页</a>&nbsp;&nbsp;
								</s:if>
								跳转至第
								<input style="width: 20px; height: 12px;" type="text" onkeydown="if(event.keyCode==13) if(isNaN(this.value) || this.value < 1 || this.value > ${totalPage}) alert('请输入页数范围内的数字'); else window.location = 'news_list?currentPage=' + this.value;"/>
                                                                                      页
                            </td>
	                    </tr>
                    </s:if>
	          	</table>
        	</div>
    	</div>
    	<s:include value="common/foot.jsp"></s:include>
	</div>
</body>
</html>