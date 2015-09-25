UserInfo = Ext.extend(Ext.app.BaseFuncPanel, {

    initComponent : function() {
	var lockedRender = function(v) {
	    return v == true ? '<span style="color:red">已锁定</span>' : '';
	}
	Ext.apply(this, {
	    url : ctx + '/user',
	    gridConfig : {
		cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(), {
		    header : '用户名',
		    dataIndex : 'name',
		    sortable : true
		}, {
		    header : '电话号码',
		    dataIndex : 'phoneNumber',
		    sortable : true
		}, {
		    header : '住址',
		    dataIndex : 'address',
		    sortable : true
		}, {
		    header : '锁定',
		    dataIndex : 'locked',
		    renderer : lockedRender
		} ]),
		storeMapping : [ 'id', 'name', 'phoneNumber', 'address',
			'locked' ]
	    },

	    formConfig : {
		items : [

		{
		    xtype : 'fieldset',
		    title : '登陆信息',
		    autoHeight : true,
		    items : [ {
			xtype : 'f-text',
			fieldLabel : '用户名',
			id : 'name',
			name : 'name',
			allowBlank : false
		    }, {
			xtype : 'f-text',
			fieldLabel : '地址',
			id : 'address',
			name : 'address'
		    }, {
			xtype : 'f-text',
			fieldLabel : '电话号码',
			id : 'phoneNumber',
			name : 'phoneNumber'
		    }, {
			xtype : 'panel',
			id : 'passwordPanel',
			autoHeight : true,
			border : false,
			layout : 'form',
			items : [ {
			    xtype : 'f-text',
			    fieldLabel : '密码',
			    id : 'pswd',
			    name : 'password',
			    inputType : 'password',
			    allowBlank : false
			}, {
			    xtype : 'f-text',
			    fieldLabel : '确认密码',
			    id : 'pswdComfirm',
			    name : 'password2',
			    inputType : 'password',
			    vtype : 'password',
			    initialPassField : 'pswd',
			    allowBlank : false
			} ]
		    }, {
			xtype : 'panel',
			id : 'resetPanel',
			autoHeight : true,
			border : false,
			buttonAlign : 'center',
			hidden : true,
			buttons : [ {
			    xtype : 'f-button',
			    text : '重设密码',
			    iconCls : 'key',
			    scope : this,
			    handler : this.resetPassword
			} ]
		    } ]
		} ]
	    },
	    buttonConfig : [ 'all', '-', {
		text : '锁定',
		iconCls : 'lock',
		id : 'lockUserBt',
		prililegeCode : this.funcCode + '_lock',
		scope : this,
		handler : this.lockUser
	    }, {
		text : '解锁',
		iconCls : 'key',
		id : 'unlockUserBt',
		prililegeCode : this.funcCode + '_lock',
		scope : this,
		handler : this.lockUser,
		hidden : true
	    }, '->', {
		xtype : 'f-search',
		emptyText : '请输入用户名'
	    } ]
	});
	UserInfo.superclass.initComponent.call(this);

	this.getSelectionModel().on('rowselect',
		function(sm, rowIndex, record) {
		    var flag = sm.getSelected().data.locked;
		    Ext.getCmp('lockUserBt').setVisible(!flag);
		    Ext.getCmp('unlockUserBt').setVisible(flag);
		}, this);

	this.on('winshow',
		function(grid) {
		    if (this.saveType == 'update') {
			Ext.getCmp('passwordPanel').setVisible(false)
				.setDisabled(true);
			Ext.getCmp('resetPanel').setVisible(true).setDisabled(
				false);
			Ext.getCmp('pswd').setDisabled(true);
			Ext.getCmp('pswdComfirm').setDisabled(true);
			Ext.getCmp('name').setReadOnly();
		    }

		}, this);
    },
    resetPassword : function() {
	this.resetWin = new Ext.app.FormWindow({
	    iconCls : 'key',
	    winConfig : {
		height : 210,
		width : 395,
		title : '重设密码',
		desc : '将旧密码作废,重设用户的新密码',
		bigIconClass : 'resetKeyIcon'
	    },
	    formConfig : {
		items : [ {
		    xtype : 'f-text',
		    fieldLabel : '密码',
		    id : 'pswd2',
		    name : 'password',
		    inputType : 'password',
		    allowBlank : false
		}, {
		    xtype : 'f-text',
		    fieldLabel : '确认密码',
		    id : 'pswdComfirm2',
		    name : 'password2',
		    inputType : 'password',
		    vtype : 'password',
		    initialPassField : 'pswd2',
		    allowBlank : false
		} ]
	    },
	    buttons : [ {
		text : '确定',
		scope : this,
		handler : function() {
		    this.resetWin.formPanel.getForm().submit({
			waitMsg : '保存中...',
			url : this.url + '/resetPassword',
			params : {
			    id : this.getSelectionModel().getSelected().id
			},
			scope : this,
			success : function(form, action) {
			    this.resetWin.close();
			    App.msg("密码设置成功！");
			}
		    });
		}
	    } ]
	});
	this.resetWin.show();
    },
    lockUser : function() {
	Ext.Ajax.request({
	    url : this.url + '/lockUser',
	    params : {
		id : this.getSelectionModel().getSelected().id
	    },
	    scope : this,
	    success : function(response, options) {
		this.loadData();
	    }
	});
    }
});
