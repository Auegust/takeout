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
			<table width="100%" bgcolor="white" border="0" cellspacing="0" cellpadding="0">
	            <tr>
	            	<td align="center" style="font-size:25px;color:red">
	                	用户名或密码错误，请输入正确的用户名和密码
	               		<s:set name="url" value="'index'"/>
						<a href="<s:property value='url'/>">返回主页</a>
					</td>
	           	</tr>
	       	</table>
       	</div>
       	<s:include value="common/foot.jsp"></s:include>
	</div>
</body>
</html>

            