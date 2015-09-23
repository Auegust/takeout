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
			<table width="900" bgcolor="white" border="0" cellspacing="0" cellpadding="0">
	            <tr align="right">
	                <td width="100%" height="14" colspan="2" style="padding: 8px 50px 3px 0;">
	                    <input id="Button1" type="button" value="打 印" onclick="window.print()" />
	                    <input id="Button2" type="button" value="关 闭" onclick="window.close()" />
	                </td>
	            </tr>
	            <tr>
	            	<td align="center">
	                	<table width="100%" border="0" class="border2" cellspacing="0" cellpadding="0">
	                       	<s:iterator value="law">
	                       		<tr>
	                        		<td style="font-size: 12pt; font-weight: bold; color: Red; padding: 15px 0 15px 0;">
	                                    <span id="lbltitle"><s:property value="title"/></span>
	                                </td>
	                            </tr>
								<tr>
									<td><s:property value="content" escape="false"/></td>
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

            