<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="msg-body">
	<p class="welcome">
		发布图片新闻、政策法规、文件通知、工作指南、表格资料、楼盘公示确认任务列表
		<a id="myhome-task-refresh" class="block refreshBt" href="#" 
			onclick="Ext.getCmp('task-portal').refresh();">点击刷新</a>
	</p>
	
	<p>
		您共有<span id="newsCount" class="countNumber"><s:property value="newsList.size" default="0"/></span>个发布图片新闻确认任务！
	</p>
	<div id="newsDiv" style="margin-top: 10px">
		<table cellspacing="0" cellpadding="0" style="border: 1px solid black; border-collapse: collapse">
			<tr>
				<td class="tdTaskTitle">标题</td>
				<td class="tdTaskTitle">提交时间</td>
				<td class="tdTaskTitle">申请人</td>
				<td class="tdTaskTitle">操作</td>
			</tr>
			<s:iterator value="newsList" status="rowStatus">
			<tr id="news-<s:property value='id'/>">
				<td class="tdTaskDetail"><s:property value="title"/></td>
				<td class="tdTaskDetail"><s:date name="created" format="yyyy-MM-dd" /></td>
				<td class="tdTaskDetail"><s:property value="applyMan"/></td>
				<td class="tdTaskDetail"><a class="block feedback" href="#" onclick="Ext.getCmp('task-portal').displayNews(<s:property value='id'/>)" >查看</a></td>
			</tr>
			</s:iterator>
		</table>
	</div>
	
	<p style="margin-top: 20px">
		您共有<span id="lawCount" class="countNumber"><s:property value="lawList.size" default="0"/></span>个发布政策法规确认任务！
	</p>
	<div id="lawDiv" style="margin-top: 10px">
		<table cellspacing="0" cellpadding="0" style="border: 1px solid black; border-collapse: collapse">
			<tr>
				<td class="tdTaskTitle">标题</td>
				<td class="tdTaskTitle">提交时间</td>
				<td class="tdTaskTitle">申请人</td>
				<td class="tdTaskTitle">操作</td>
			</tr>
			<s:iterator value="lawList" status="rowStatus">
			<tr id="law-<s:property value='id'/>">
				<td class="tdTaskDetail"><s:property value="title"/></td>
				<td class="tdTaskDetail"><s:date name="created" format="yyyy-MM-dd" /></td>
				<td class="tdTaskDetail"><s:property value="applyMan"/></td>
				<td class="tdTaskDetail"><a class="block feedback" href="#" onclick="Ext.getCmp('task-portal').displayLaw(<s:property value='id'/>)" >查看</a></td>
			</tr>
			</s:iterator>
		</table>
	</div>
	
	<p style="margin-top: 20px">
		您共有<span id="actionsCount" class="countNumber"><s:property value="actionsList.size" default="0"/></span>个发布文件通知确认任务！
	</p>
	<div id="actionsDiv" style="margin-top: 10px">
		<table cellspacing="0" cellpadding="0" style="border: 1px solid black; border-collapse: collapse">
			<tr>
				<td class="tdTaskTitle">标题</td>
				<td class="tdTaskTitle">提交时间</td>
				<td class="tdTaskTitle">申请人</td>
				<td class="tdTaskTitle">操作</td>
			</tr>
			<s:iterator value="actionsList" status="rowStatus">
			<tr id="actions-<s:property value='id'/>">
				<td class="tdTaskDetail"><s:property value="title"/></td>
				<td class="tdTaskDetail"><s:date name="created" format="yyyy-MM-dd" /></td>
				<td class="tdTaskDetail"><s:property value="applyMan"/></td>
				<td class="tdTaskDetail"><a class="block feedback" href="#" onclick="Ext.getCmp('task-portal').displayActions(<s:property value='id'/>)" >查看</a></td>
			</tr>
			</s:iterator>
		</table>
	</div>
	
	<p style="margin-top: 20px">
		您共有<span id="guideCount" class="countNumber"><s:property value="guideList.size" default="0"/></span>个发布工作指南确认任务！
	</p>
	<div id="guideDiv" style="margin-top: 10px">
		<table cellspacing="0" cellpadding="0" style="border: 1px solid black; border-collapse: collapse">
			<tr>
				<td class="tdTaskTitle">标题</td>
				<td class="tdTaskTitle">提交时间</td>
				<td class="tdTaskTitle">申请人</td>
				<td class="tdTaskTitle">操作</td>
			</tr>
			<s:iterator value="guideList" status="rowStatus">
			<tr id="guide-<s:property value='id'/>">
				<td class="tdTaskDetail"><s:property value="title"/></td>
				<td class="tdTaskDetail"><s:date name="created" format="yyyy-MM-dd" /></td>
				<td class="tdTaskDetail"><s:property value="applyMan"/></td>
				<td class="tdTaskDetail"><a class="block feedback" href="#" onclick="Ext.getCmp('task-portal').displayGuide(<s:property value='id'/>)" >查看</a></td>
			</tr>
			</s:iterator>
		</table>
	</div>
	
	<p style="margin-top: 20px">
		您共有<span id="dataCount" class="countNumber"><s:property value="dataList.size" default="0"/></span>个发布表格资料确认任务！
	</p>
	<div id="dataDiv" style="margin-top: 10px">
		<table cellspacing="0" cellpadding="0" style="border: 1px solid black; border-collapse: collapse">
			<tr>
				<td class="tdTaskTitle">标题</td>
				<td class="tdTaskTitle">提交时间</td>
				<td class="tdTaskTitle">申请人</td>
				<td class="tdTaskTitle">操作</td>
			</tr>
			<s:iterator value="dataList" status="rowStatus">
			<tr id="data-<s:property value='id'/>">
				<td class="tdTaskDetail"><s:property value="title"/></td>
				<td class="tdTaskDetail"><s:date name="created" format="yyyy-MM-dd" /></td>
				<td class="tdTaskDetail"><s:property value="applyMan"/></td>
				<td class="tdTaskDetail"><a class="block feedback" href="#" onclick="Ext.getCmp('task-portal').displayData(<s:property value='id'/>)" >查看</a></td>
			</tr>
			</s:iterator>
		</table>
	</div>
	
	<p style="margin-top: 20px">
		您共有<span id="infoCount" class="countNumber"><s:property value="infoList.size" default="0"/></span>个发布楼盘公示确认任务！
	</p>
	<div id="dataDiv" style="margin-top: 10px">
		<table cellspacing="0" cellpadding="0" style="border: 1px solid black; border-collapse: collapse">
			<tr>
				<td class="tdTaskTitle">标题</td>
				<td class="tdTaskTitle">提交时间</td>
				<td class="tdTaskTitle">申请人</td>
				<td class="tdTaskTitle">操作</td>
			</tr>
			<s:iterator value="infoList" status="rowStatus">
			<tr id="info-<s:property value='id'/>">
				<td class="tdTaskDetail"><s:property value="title"/></td>
				<td class="tdTaskDetail"><s:date name="created" format="yyyy-MM-dd" /></td>
				<td class="tdTaskDetail"><s:property value="applyMan"/></td>
				<td class="tdTaskDetail"><a class="block feedback" href="#" onclick="Ext.getCmp('task-portal').displayInfo(<s:property value='id'/>)" >查看</a></td>
			</tr>
			</s:iterator>
		</table>
	</div>
</div>
<script type="text/javascript">

</script>
