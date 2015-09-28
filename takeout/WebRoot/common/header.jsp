<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" href="<s:url value="/include/image/icon/favicon.ico"/>" type="image/x-icon" />
<link rel="icon" href="<s:url value="/include/image/icon/favicon32.png"/>"/>

<!-- include extJs lib -->
<s:component template="extlib.ftl">
</s:component>

<link rel="stylesheet" type="text/css" href="<s:url value="/include/css/fjdp-all.css"/>" />
<link rel="stylesheet" type="text/css" href="<s:url value="/include/css/app-all.css"/>" />

<script type="text/javascript" src="<s:url value="/include/js/ext-lang-zh_CN.js"/>" charset="utf-8"></script>
<script>
	ctx = '<%=request.getContextPath()%>';
	loginUser = {
		name : '<s:property value="#session.authedUser.name" escape="false"/>'
	}
	
</script>
<script type="text/javascript" src="<s:url value="/include/js/ext-override.js"/>"></script>
<script type="text/javascript" src="<s:url value="/include/js/ext-extends.js"/>"></script>
<script type="text/javascript" src="<s:url value="/include/js/fjdp-all.js"/>"></script>
<script type="text/javascript" src="<s:url value="/widget/app-all.js"/>"></script>