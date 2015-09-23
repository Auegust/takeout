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
	                       	<s:iterator value="info">
	                       		<tr>
	                        		<td style="font-size: 12pt; font-weight: bold; color: Red; padding: 15px 0 15px 0;">
	                                    <span><s:property value="title"/></span>
	                                </td>
	                            </tr>
	                            <tr>
	                            	<td>
	                               		<s:date name="published" format="yyyy年MM月dd日"/>
	                               	</td>
	                            </tr>
								<tr>
									<td><s:property value="content" escape="false"/></td>
								</tr>
							</s:iterator>
	                   	</table>
	                   	<table cellspacing="1" cellpadding="0" rules="all" border="0" style="background-color:#BDDBB6;border-width:0px;width:100%;">
							<tr align="center" valign="middle" style="background-color:#F5FBF5;">
								<td style="height:25px;">投票项</td><td>操作</td><td>票数</td>
							</tr>
							<s:iterator value="infoDetail">
	                       		<tr>
	                        		<td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	                                    <s:property value="content"/>
	                                </td>
	                                <td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;color: Red;">
	                                	<s:if test="vote == 0">
	                                		<s:set name="url" value="'info_vote?accountId=' + accountId + '&detailId=' + id"/>
											<a href="<s:property value='url'/>">投票</a>
	                                	</s:if>
	                                	<s:if test="vote == 1">
	                                		<span>已投票</span>
	                                	</s:if>
	                                </td>
	                                <td align="center" valign="middle" style="background-color:#F5FBF5;height:25px;">
	                               		<s:property value="count"/>
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

            