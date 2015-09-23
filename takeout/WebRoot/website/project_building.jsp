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
	    	<table width="100%" cellpadding="0" cellspacing="0">
	        	<tr>
	           		<td height="5px">
	            	</td>
	        	</tr>
	        	<tr>
	            	<td style="background-image:url(include/image/strip.jpg)" height="25" width="234" align="left">
	                	<font color="white" style="padding-left: 5px;">幢信息</font>
	            	</td>
	            	<td height="25" width="766">
                    </td>
	        	</tr>
	         	<tr>
	            	<td colspan="2">
	                	<table cellspacing="1" cellpadding="0" rules="all" border="0" style="background-color:#BDDBB6;border-width:0px;width:100%;">
							<tr align="center" valign="middle" style="background-color:#F5FBF5;">
								<td style="height:25px;">幢名称</td><td>物业总数</td><td>面积总和</td><td>余额总额</td>
							</tr>
							<s:iterator value="buildingList">
								<tr>
 									<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
         								<s:property value="name"/>
         							</td>
         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
         								<s:set name="url" value="'building_house?buildingId=' + id"/>
										<a href="<s:property value='url'/>" target="_blank"><s:property value="houseCount"/></a>
         							</td>
         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
         								<s:property value="areaSum"/>
         							</td>
         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
         								<s:property value="balanceSum"/>
         							</td>
         						</tr>
							</s:iterator>
							<s:if test="totalPage > 1">
			                   	<tr align="center">
			                       	<td colspan="4" align="center" style="height: 25px; text-align: center;">
			                                                                                     共有<span><s:property value='totalCount'/></span>条
			                               <span><s:property value='totalPage'/></span>页结果 &nbsp;&nbsp;&nbsp;&nbsp;当前为第
			                               <span><s:property value='currentPage'/></span>页&nbsp;&nbsp;&nbsp;20条/页&nbsp;&nbsp;&nbsp;
			                               <s:if test="currentPage > 1">
											<a href="project_building?projectId=${projectId}&currentPage=${currentPage - 1}">上一页</a>&nbsp;&nbsp;
										</s:if>
										<s:if test="currentPage != totalPage">
											<a href="project_building?projectId=${projectId}&currentPage=${currentPage + 1}">下一页</a>&nbsp;&nbsp;
										</s:if>
										跳转至第
										<input style="width: 20px; height: 12px;" type="text" onkeydown="if(event.keyCode==13) if(isNaN(this.value) || this.value < 1 || this.value > ${totalPage}) alert('请输入页数范围内的数字'); else window.location = 'project_building?projectId=${projectId}&currentPage=' + this.value;"/>
			                                                                            页
			                    	</td>
			                    </tr>
			                </s:if>
						</table>
	                </td>
	           	</tr>
	       </table>
	    </div>
		<s:include value="common/foot.jsp"></s:include>
	</div>
</body>
</html>