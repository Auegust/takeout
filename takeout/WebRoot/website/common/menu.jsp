<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<style type="text/css">
body {text-align:center;font-family:\5B8B\4F53,Arial Narrow,arial,serif;background:#ffffff;font-size:12px;}
body,div,form,input{padding:0; margin:0;}
.menu {clear:both; width:100%; min-width:1000px; height:29px; line-height:29px;}
.menu .main {width:1000px; margin:0 auto;}
.menu .login {float:left;}
.menuLink {float:right; padding-right:200px;}
.homeItem {float:left; overflow:hidden; display:block; padding:0 0 0 12px; background:url(include/image/menu.gif) no-repeat 0 -92px; padding-right:30px;}
.menuItem {float:left; overflow:hidden; display:block; padding:0 0 0 12px; background:url(include/image/menu.gif) no-repeat 0 -142px; padding-right:30px;}
</style>
<div id="header">
	<table width="1000" height="60" cellpadding="0" cellspacing="0" align="center" bgcolor="white">
   		<tr>
       		<td width="1000">
       			<img src="include/image/title.png"/>
            </td>
   		</tr>
   		<tr>
   			<td>
   				<div>
   					<div class="menu">
					    <div class="main">
					        <div class="login">
					            <s:if test="accountId != null">
						                               欢迎业主,<s:property value='accountId'/>
					            </s:if>
					            <s:if test="projectName != null">
						                                 欢迎楼盘,<s:property value='projectName'/>
					            </s:if>
					        </div>
					         <div class="menuLink">
            					<a class="homeItem" href="index" target="_blank" >主页</a>
            					<a class="menuItem" href="news_list" target="_blank">图片新闻</a> 
            					<a class="menuItem" href="law_list" target="_blank">政策法规</a> 
            					<a class="menuItem" href="actions_list" target="_blank">文件通知</a>
            					<a class="menuItem" href="guide_list" target="_blank">工作指南</a>
            					<a class="menuItem" href="data_list" target="_blank">资料下载</a>
        					</div>
					    </div>
					</div>
				</div>
	        </td>
		</tr>
	</table>
</div>		