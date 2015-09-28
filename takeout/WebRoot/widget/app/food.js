FoodList = Ext.extend(Ext.app.BaseFuncPanel, {
    initComponent : function() {
	Ext.apply(this, {
	    gridConfig : {
		cm : new Ext.grid.ColumnModel({
		    defaults : {
			width : 200,
			align : 'center'
		    },
		    columns : [ new Ext.grid.RowNumberer(), {
			header : '食品名',
			dataIndex : 'name'
		    }, {
			header : '价格',
			dataIndex : 'price'
		    }, {
			header : '详情',
			dataIndex : 'description'
		    } ]
		}),
		storeMapping : [ 'id', 'name', 'price', 'description' ]
	    },
	    buttonConfig : [ 'all',

	    {
		xtype : 'f-search',
		emptyText : '请输入食品名'
	    } ],
	    winConfig : {
		height : 470,
		width : 650,
		bigIconClass : 'newsBigIcon',
		desc : '新增，修改新闻信息'
	    },
	    formConfig : {
		layout : 'column',
		items : [ {
		    xtype : 'fieldset',
		    title : '文字信息',
		    items : [ {
			xtype : 'panel',
			layout : 'form',
			border : false,
			items : [ {
			    xtype : 'f-text',
			    fieldLabel : '食品名',
			    name : 'name',
			    allowBlank : false
			}, {
			    xtype : 'f-text',
			    fieldLabel : '价格',
			    name : 'price'
			}, {
			    xtype : 'htmleditor',
			    fieldLabel : '详情',
			    name : 'description',
			    height : 220,
			    allowBlank : false
			} ]
		    } ]
		} ]
	    },
	    url : ctx + '/food'
	});

	FoodList.superclass.initComponent.call(this);
    },

    listWithSelected : function(combo, record, index) {
	Ext.getCmp('foodList').loadData({
	    status : record.data.text
	});
    }
});

FoodInfo = Ext.extend(Ext.Panel, {
    layout : 'border',
    closable : true,
    initComponent : function() {
	this.center = new FoodList({
	    id : 'foodList',
	    funcCode : this.funcCode,
	    title : '食品信息',
	    region : 'center'
	});
	this.items = [ this.center ];
	FoodInfo.superclass.initComponent.call(this);
    },
    loadData : function() {
	this.center.loadData();
    }
});