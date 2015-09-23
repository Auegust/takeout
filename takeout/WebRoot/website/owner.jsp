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
	                	<font color="white" style="padding-left: 5px;">物业信息</font>
	            	</td>
	            	<td height="25" width="766">
                    </td>
	        	</tr>
	         	<tr>
	            	<td colspan="2">
	                	<table cellspacing="1" cellpadding="0" rules="all" border="0" style="background-color:#BDDBB6;border-width:0px;width:100%;">
							<tr align="center" valign="middle" style="background-color:#F5FBF5;">
								<td style="height:25px;">维修资金编号</td><td>银行名称</td><td>物业详细地址</td><td>建筑面积</td><td>余额</td><td>欠缴金额</td>
							</tr>
							<tr>
								<s:iterator value="house">
									<tr>
	 									<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	         								<s:property value="accountId"/>
	         							</td>
	         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	         								<s:property value="bank.bankName"/>
	         							</td>
	         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	         								<s:property value="houseDetail"/>
	         							</td>
	   	         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	         								<s:property value="buildingArea"/>
	         							</td>
	         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	         								<s:property value="balance"/>
	         							</td>
	         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	         								<s:property value="ownBalance"/>
	         							</td>
	         							
         							</tr>
								</s:iterator>
								
							</tr>
						</table>
	                </td>
	           	</tr>
	           	<tr>
	           		<td height="10px">
	            	</td>
	           	</tr>
	           	<tr>
	            	<td style="background-image:url(include/image/strip.jpg)" height="25" width="234" align="left">
	                	<font color="white" style="padding-left: 5px;">资金流水信息</font>
	            	</td>
	            	<td height="25" width="766">
                    </td>
	        	</tr>
	         	<tr>
	            	<td colspan="2">
	                	<table cellspacing="1" cellpadding="0" rules="all" border="0" style="background-color:#BDDBB6;border-width:0px;width:100%;">
							<tr align="center" valign="middle" style="background-color:#F5FBF5;">
								<td style="height:25px;">票据号</td><td>日期</td><td>类型</td><td>发生额</td><td>余额</td>
							</tr>
							<tr>
								<s:iterator value="fundsFlowList">
									<tr>
	 									<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	         								<s:property value="voucherNo"/>
	         							</td>
	         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	         								<s:property value="tranDate"/>
	         							</td>
	         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	         								<s:property value="getTraceTypeText()"/>
	         							</td>
	         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	         								<s:property value="tranAmount"/>
	         							</td>
	         							<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	         								<s:property value="tranBalance"/>
	         							</td>
	         						</tr>
								</s:iterator>
							</tr>
						</table>
	                </td>
	           	</tr>
	           	<tr>
	           		<td height="10px">
	            	</td>
	           	</tr>
	           	<tr>
	            	<td style="background-image:url(include/image/strip.jpg)" height="25" width="234" align="left">
	                	<font color="white" style="padding-left: 5px;">楼盘公示信息</font>
	            	</td>
	            	<td align="right" style="padding-right: 10px;">
                        <a href="info_list?projectId=${projectId}"} target="_blank">更多</a>              
                    </td>
	        	</tr>
	         	<tr>
	            	<td colspan="2">
						<table width='100%' cellspacing='0' cellpadding='0'>
							<s:iterator value="infoList">
								<tr>
   									<td>
   										<img src='include/image/gray_arrow.gif' style='padding-right:5px;'/>
   									</td>
   									<td style="width:74%;text-align:left">
   										<s:set name="url" value="'info_index?accountId=' + accountId + '&infoId=' + id"/>
										<a href="<s:property value='url'/>" target="_blank"><s:property value="title"/></a>
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
	    </div>
		<s:include value="common/foot.jsp"></s:include>
	</div>
</body>
</html>