Ext.app.FoodSelect = Ext.extend(Ext.app.MultiSelectField, {
    initComponent : function() {

	this.store = new Ext.data.JsonStore({
	    url : ctx + '/food/getFoodsByOrder',
	    root : 'data',
	    fields : [ 'id', 'text', 'checked' ]
	});

	Ext.app.FoodSelect.superclass.initComponent.call(this);

	this.store.on('beforeload', function(store, o) {
	    this.store.baseParams['id'] = Ext.getCmp('OrderInfo').saveId;
	}, this);
    }
});
Ext.reg('f-foodByOrder', Ext.app.FoodSelect);

OrderInfo = Ext.extend(Ext.app.BaseFuncPanel, {

    initComponent : function() {
	var foodsRender = function(v) {
	    var re = [];
	    for ( var r in v) {
		if (v[r].text) {
		    re.push(v[r].text);
		}
	    }
	    return re.join(',');
	}
	var payRender = function(v) {
	    return "lallalal";
	}

	Ext.apply(this, {
	    url : ctx + '/order',
	    gridConfig : {
		cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(), {
		    header : '用户名',
		    dataIndex : 'username',
		    sortable : true
		}, {
		    header : '电话号码',
		    dataIndex : 'phoneNumber',
		    sortable : true
		}, {
		    header : '支付状态',
		    dataIndex : 'payStatus',
		    renderer : payRender
		}, {
		    header : '总额',
		    dataIndex : 'sum'
		}, {
		    header : '所存在套餐',
		    dataIndex : 'foods',
		    renderer : foodsRender,
		    width : 200
		} ]),
		storeMapping : [ 'id', 'username', 'user', 'phoneNumber',
			'payStatus', 'sum', 'foods' ]
	    },
	    winConfig : {
		height : 440,
		width : 405,
		desc : '为员工分配用户名，设置密码，并分配角色',
		bigIconClass : 'userIcon'
	    },
	    formConfig : {
		items : [ {
		    xtype : 'fieldset',
		    title : '对应员工',
		    autoHeight : true,
		    items : [ {
			xtype : 'f-select',
			dataUrl : '/user/getUsers',
			storeFields : [ 'id', 'text' ],
			fieldLabel : '员工姓名',
			hiddenName : 'user',
			id : 'userSelect',
			allowBlank : false,
			emptyText : '请选择一个员工',
			listeners : {}
		    } ]
		}, {
		    xtype : 'fieldset',
		    title : '登陆信息',
		    autoHeight : true,
		    items : [ {
			xtype : 'f-text',
			fieldLabel : '用户名',
			id : 'username',
			name : 'username',
			allowBlank : false
		    },

		    ]
		}, {
		    xtype : 'fieldset',
		    title : '选择用户角色',
		    autoHeight : true,
		    items : [ {
			xtype : 'f-foodByOrder',
			fieldLabel : '用户角色',
			hiddenName : 'foods',
			emptyText : '请选择一个或多个用户角色',
			allowBlank : false
		    } ]
		} ]
	    }

	});
	OrderInfo.superclass.initComponent.call(this);

    }
});
