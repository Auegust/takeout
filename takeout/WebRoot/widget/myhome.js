Ext.ns('Myhome');

Myhome.Welcome = Ext.extend(Ext.Panel,{
	border : false,
	bodyStyle  : 'padding: 5px 10px',
	html : '<div class="msg-body"><p>欢迎您，<span class="userName">'+loginUser.name+'</span></p></div>'
});


MyHome = Ext.extend(Ext.Panel,{
	id:'myHomePanel',
	title: '我的工作台',
	iconCls:'userman',
	autoScroll:true,
	border:true,
	bodyStyle: 'padding: 10px ',
	layout: 'anchor',
	initComponent : function(){
		
		this.items = [
			new Myhome.Welcome({anchor: '-10'})
		];
		
    	MyHome.superclass.initComponent.call(this);
    	
    }

});

