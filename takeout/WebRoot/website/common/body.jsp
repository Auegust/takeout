<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<style type="text/css">
#midbody{
	width:1000px;
	height: auto;
	margin:0 auto;
	overflow:hidden;
	background: #fff;
}
.leftside{ 
	width:676px; 
	float:left;
	height:auto;
	margin:0 auto;
	padding-top:7px;
}
.rightside{ 
	width:324px;
	height:auto;
	float:right;
	margin:0 auto;
	padding-top:7px;
}
</style>
<script type="text/javascript">
function show(name,cursel,n,style){
	for(var i=1;i<=n;i++) {
      	var menu = document.getElementById(name+i);
      	var con = document.getElementById("rstable"+i);
      	menu.className = i == cursel ? style : ""; 
      	con.style.display = i == cursel ? "block" : "none";
    }
}
function submitLogin(){
	var userName = document.loginForm.userName.value;
	var password = document.loginForm.password.value;
	var userType = document.loginForm.userType.value;
	if (userType == '0') {
		alert("请选择正确的用户类型!");
		return false;
	}
	if (userName.length < 1){
		alert("请输入正确的用户名!");
		return false;
	}
	if (password.length < 1){
		alert("请输入正确的密码!");
		return false;
	}
	document.loginForm.submit();
	return false;
}

function clearValue(){
	document.loginForm.password.value="";
	document.loginForm.userName.value="";
}
function loginSelect(value){
	if (value == '1') {
		document.getElementById("userNameLabel").innerHTML = "账&nbsp;&nbsp;&nbsp;&nbsp;号";
		document.getElementById("pwdPrompt").innerHTML = "*&nbsp;&nbsp;维修资金账号后六位";
		document.getElementById("accountPrompt").innerHTML = "*&nbsp;&nbsp;请输入维修资金账号";
		document.loginForm.password.value="";
		document.loginForm.userName.value="";
	}else if (value == '2') {
		document.getElementById("userNameLabel").innerHTML = "楼盘名称";
		document.getElementById("accountPrompt").innerHTML = " ";
		document.getElementById("pwdPrompt").innerHTML = " ";
		document.loginForm.password.value="";
		document.loginForm.userName.value="";
	}
	
}

</script>
<div id="midbody">
    <div class="leftside" align="right">
    	<div>
            <table width="671" cellpadding="0" cellspacing="0">
                <tr height="5">
	                <td style="background-image:url(include/image/news_left_top_circle.jpg)" width="7">
	                </td>
	                <td style="background-image:url(include/image/news_point_1.jpg)" width="657">
	                </td>
	                <td style="background-image:url(include/image/news_right_top_circle.jpg)" width="7">
	                </td>
              	</tr>
                <tr height="212">
                  	<td style="background-image:url(include/image/news_point_2.jpg)" width="7">
                  	</td>
                  	<td width="657" valign="top">              
						<table align="center" width="649"  cellpadding="0" cellspacing="0">
							<tr height="20">
 								<td style="color: #187101; padding-top: 5px;" align="left">
     								<strong>图片新闻</strong>
 								</td>
 								<td align="right">
     								<a href="news_list" target="_blank">更多</a>
 								</td>
							</tr>
							<tr valign="top">
 								<td colspan="2" style="background-image:url(include/image/news_point_1.jpg)">
 								</td>
							</tr>
							<tr>
 								<td height="2" colspan="2">
 								</td>
							</tr>
							<tr valign="top" align="left" style="line-height: 150%">
	 							<td width="35%" style="padding-top: 3px;">
									<input id="flashPic1" type="hidden" value="${flashPic1}"/>
									<input id="flashPic2" type="hidden" value="${flashPic2}"/>
									<input id="flashPic3" type="hidden" value="${flashPic3}"/>
									<input id="flashLink1" type="hidden" value="${flashLink1}"/>
									<input id="flashLink2" type="hidden" value="${flashLink2}"/>
									<input id="flashLink3" type="hidden" value="${flashLink3}"/>
									<input id="flashText1" type="hidden" value="${flashText1}"/>
									<input id="flashText2" type="hidden" value="${flashText2}"/>
									<input id="flashText3" type="hidden" value="${flashText3}"/>
	 								<script type="text/javascript">
	                					var picWidth = 240;
	                 					var picHeight = 160;
	                 					var textHeight = 20;
	                 					var swfHeight = picHeight+textHeight;
						                //图片地址
						                var addr = '../../upload/image/';
						                var li = 'news_index?newsId=';
						                var flashPic1 = document.getElementById("flashPic1").value;
						                var flashPic2 = document.getElementById("flashPic2").value;
						                var flashPic3 = document.getElementById("flashPic3").value;
						                var flashLink1 = document.getElementById("flashLink1").value;
						                var flashLink2 = document.getElementById("flashLink2").value;
						                var flashLink3 = document.getElementById("flashLink3").value;
						                var flashText1 = document.getElementById("flashText1").value;
						                var flashText2 = document.getElementById("flashText2").value;
						                var flashText3 = document.getElementById("flashText3").value;
						                var pics = addr+flashPic1 + '|' + addr+flashPic2 + '|' + addr+flashPic3;
						                //连接
						                var links = li+flashLink1 + '|' + li+flashLink2 + '|' + li+flashLink3;
						                //文本
						                var texts = flashText1 + '|' + flashText2 + '|' + flashText3;
						                 
						                document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+ picWidth +'" height="'+ swfHeight +'">');
						                document.write('<param name="allowScriptAccess" value="sameDomain"><param name="movie" value="include/image/swf/news.swf"><param name="quality" value="high"><param name="bgcolor" value="#FFFFFF">');
						                document.write('<param name="menu" value="false"><param name=wmode value="opaque">');
						                document.write('<param name="FlashVars" value="pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+picWidth+'&borderheight='+picHeight+'&textheight='+textHeight+'">');
						                document.write('<embed src="include/image/swf/news.swf" wmode="opaque" FlashVars="pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+picWidth+'&borderheight='+picHeight+'&textheight='+textHeight+'" menu="false" bgcolor="#C5C5C5" quality="high" width="'+ picWidth +'" height="'+ swfHeight +'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" />');  document.write('</object>');
					            	</script>
    							</td>
    							<td width="65%" valign="top">
    								<table width='100%' cellspacing='0' cellpadding='0'>
    									<s:iterator value="newsList">
    										<tr style='line-height:200%;'>
            									<td>
            										<img src='include/image/gray_arrow.gif' style='padding-left:5px;'/>
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
                  	<td style="background-image:url(include/image/news_point_3.jpg)" width="7">
                  	</td>
                </tr>
                <tr>
                  	<td style="background-image:url(include/image/news_left_bottom_circle.jpg)" width="7" height="6">
                  	</td>
                  	<td style="background-image:url(include/image/news_point_4.jpg)" width="657">
                  	</td>
                  	<td style="background-image:url(include/image/news_right_bottom_circle.jpg)" width="7">
                  	</td>
              	</tr>
          	</table>
		</div>
		<div class="leftside">
        	<table width="671" cellpadding="0" cellspacing="0" align="right">
              	<tr>
                 	<td valign="top">
                    	<table class="border1" width="251" cellpadding="0" cellspacing="0">
                    		<tr valign="middle" class="td_background">
                      			<td align="left" style="padding-left: 10px;">
                        			<img src="include/image/user.gif" />&nbsp; 维修资金查询
                        		</td>
                      		</tr>
                      		<tr valign="middle" height="180">
                      			<td align="center">
                      				<form name="loginForm" method="post" action="login" id="loginForm" target="_blank"><br />
	                      				用户类型
	                      				<select name="userType" onclick="loginSelect(value);" style="width:123px;">
											<option value="1">业主</option>
											<option value="2">楼盘</option>
										</select><br /><br />
	                          			<label class="label" id="userNameLabel">账&nbsp;&nbsp;&nbsp;&nbsp;号</label>
	                          			<input type="text"  name="userName" style="font-Size:14px ;width:120px;border: solid 1px #5fb043;"/><br />
	                          			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label  class="label" id="accountPrompt" style="color:#999999;">*&nbsp;&nbsp;请输入维修资金账号</label><br />
	                          			密&nbsp;&nbsp;&nbsp;&nbsp;码
	                          			<input type="password"   name="password" style="width: 120px;font-size:14px;border: solid 1px #5fb043;" ";
	                              		onkeypress="if (event.keyCode==13){submitLogin();return false; }"/><br />
	                              		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="label" id="pwdPrompt" style="color:#999999;"> *&nbsp;&nbsp;维修资金账号后六位</label><br/><br/>
	                          			<img src="include/image/search.jpg" onclick="submitLogin();clearValue();" alt="查询" />
	                          		</form>
                        		</td>
                      		</tr>
                    	</table>
                  	</td>
                  	<td valign="top" style="padding-left: 3px;">
                    	<table class="border1" cellpadding="0" cellspacing="0">
                      		<tr align="right" valign="middle" class="td_background">
                        		<td width="100" id="rs1" class="td_bgcolor" onmouseover="show('rs',1,2,'td_bgcolor')" align="center">
                           		 	文件通知
                        		</td>
                        		<td width="100" id="rs2" onmouseover="show('rs',2,2,'td_bgcolor')" align="center">
                            		工作指南
                        		</td>
                        		<td align="right" style="width: 220px;">
                            		<a href="actions_list" target="_blank">更多</a> &nbsp;
                        		</td>
                        	</tr>
                        	<tr height="180">
		                        <td colspan="3" valign="top">
		                          	<table id="rstable1" width="100%" cellpadding="0" cellspacing="0">
                           				<s:iterator value="actionsList">
                           					<tr onmouseover="this.style.backgroundColor='#f5fbf5'" onmouseout="this.style.backgroundColor=''">
                            					<td width='16' height='24'>
	                              					<img src='include/image/gray_arrow.gif' style='padding-right:5px;'/>
	                              				</td>
	                              				<td style="width:74%;text-align:left">
	                              					<s:set name="url" value="'actions_index?actionsId=' + id"/>
													<a href="<s:property value='url'/>" target="_blank"><s:property value="display"/></a>
	                              				</td>
          										<td align="right">
          											<s:date name="published" format="yyyy-MM-dd"/>
          										</td>
       										</tr>
										</s:iterator>
		                          	</table>
		                          	<table id="rstable2" width="100%" style="display: none;" cellpadding="0" cellspacing="0">	
                            			<s:iterator value="guideList">
                           					<tr onmouseover="this.style.backgroundColor='#f5fbf5'" onmouseout="this.style.backgroundColor=''">
                             					<td width='16' height='24'>
		                              				<img src='include/image/gray_arrow.gif' style='padding-right:5px;'/>
		                              			</td>
		                              			<td style="width:74%;text-align:left">
		                              				<s:set name="url" value="'guide_index?guideId=' + id"/>
													<a href="<s:property value='url'/>"><s:property value="display"/></a>
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
          	</table>
      	</div>
  	</div>
    <div class="rightside">
    	<div>
        	<table width="316" cellpadding="0" cellspacing="0">
                <tr height="31">
                	<td style="background-image:url(include/image/law_left_bound.jpg)" width="10">
                  	</td>
                  	<td style="background-image:url(include/image/law_vertical_line.jpg)" width="296" valign="middle">
                    	<table width="100%" align="center" cellpadding="0" cellspacing="0">
                      		<tr>
                        		<td align="left">
                                	<img src="include/image/law.gif" />&nbsp;
                                    	<font color="#ff6801"><strong>政策法规</strong>
                                    	</font>
                        	  	</td>
                        	  	<td align="right">
                        			<a href="law_list" target="_blank">更多</a>
                        		</td>
                      		</tr>
                    	</table>
                  	</td>
                  	<td style="background-image:url(include/image/law_right_bound.jpg)" width="10">
                  	</td>
                </tr>
                <tr height="180">
                	<td style="background-image:url(include/image/law_point_1.jpg)" width="10">
                  	</td>
                  	<td width="296" valign="top">
                    	<table border="0" width="100%" cellspacing="0" cellpadding="0">
                    		<s:iterator value="lawList">
		                    	<tr>
                       				<td width="16" height="24">
                          				<img border="0" src="include/image/red_arrow.gif" width="11" height="15"/>
                          			</td>
                          			<td style="width:74%;text-align:left">
                          				<s:set name="url" value="'law_index?lawId=' + id"/>
										<a href="<s:property value='url'/>" target="_blank">
                          				<s:property value="display"/></a>
                          			</td>
     								<td align="right">
      									<s:date name="published" format="yyyy-MM-dd"/>
     								</td>
  								</tr>
							</s:iterator>
                    	</table>
                  	</td>
                  	<td style="background-image:url(include/image/law_point_2.jpg)" width="10">
                  	</td>
                </tr>
                <tr height="11">
                	<td style="background-image:url(include/image/law_left_bottom_circle.jpg)" width="10" style="padding-bottom: 3px;">
                  	</td>
                  	<td style="background-image:url(include/image/law_point_3.jpg)" width="296" style="padding-bottom: 3px;">
                  	</td>
                  	<td style="background-image:url(include/image/law_right_bottom_circle.jpg)" width="10" style="padding-bottom: 3px;">
                  	</td>
              	</tr>
              	<tr height="7">
              	</tr>
            </table>
        </div>
        <div>
            <table width="316" cellpadding="0" cellspacing="0">
              	<tr height="31">
	                <td style="background-image:url(include/image/law_left_bound.jpg)" width="10">
	                </td>
                  	<td style="background-image:url(include/image/law_vertical_line.jpg)" width="296" valign="middle">
                    	<table width="100%" align="center" cellpadding="0" cellspacing="0">
                      		<tr>
                        		<td align="left">
                          			<img src="include/image/download.gif" />
                          			&nbsp;<font color="#ff6801"><strong>资料下载</strong></font>
                        		</td>
                        		<td align="right">
                        			<a href="../" target="_blank">上传</a>
                        			<a href="data_list" target="_blank">更多</a>
                        		</td>
                      		</tr>
                    	</table>
                  	</td>
                  	<td style="background-image:url(include/image/law_right_bound.jpg)" width="10">
                  	</td>
                </tr>
                <tr height="170">
                  	<td style="background-image:url(include/image/law_point_1.jpg)" width="10">
                  	</td>
                  	<td width="296" valign="top">
                      	<table width="100%" border="0" cellspacing="0" cellpadding="0">
                      		<s:iterator value="dataList">
		                    	<tr>
                       				<td width="16" height="24">
                          				<img border="0" src="include/image/red_arrow.gif" width="11" height="15"/>
                          			</td>
                          			<td style="width:74%;text-align:left">
                          				<s:set name="url" value="'../../upload/data/' + fileName"/>
										<a href="<s:property value='url'/>">
										<s:property value="display"/></a>
                          			</td>
     								<td align="right">
      									<s:date name="published" format="yyyy-MM-dd"/>
     								</td>
  								</tr>
							</s:iterator>
                      	</table>
                  	</td>
                  	<td style="background-image:url(include/image/law_point_2.jpg)" width="10">
                  	</td>
                </tr>
                <tr height="11">
                	<td style="background-image:url(include/image/law_left_bottom_circle.jpg)" width="10" style="padding-bottom: 3px;">
                  	</td>
                  	<td style="background-image:url(include/image/law_point_3.jpg)" width="296" style="padding-bottom: 3px;">
                  	</td>
                  	<td style="background-image:url(include/image/law_right_bottom_circle.jpg)" width="10" style="padding-bottom: 3px;">
                  	</td>
              	</tr>
        	</table>
        </div>
    </div>
</div>