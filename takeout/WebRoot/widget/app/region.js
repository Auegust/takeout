RegionInfo = Ext.extend(Ext.app.BaseFuncTree, {
    initComponent : function() {
	Ext.apply(this, {
	    winConfig : {
		height : 240,
		desc : '维护地区信息',
		bigIconClass : 'dictIcon'
	    },
	    formConfig : {
		items : [ {
		    xtype : 'f-text',
		    fieldLable : '名称',
		    name : 'name',
		    emptyText : '请输入地区名称',
		    allowBlank : false
		}, {
		    xtype : 'f-text',
		    fieldLable : '类型',
		    name : 'type'
		} ]
	    },
	    rootConfig : {
		id : '0'
	    },
	    url : ctx + '/region'
	});
	RegionInfo.superclass.initComponent.call(this);
    }
});
