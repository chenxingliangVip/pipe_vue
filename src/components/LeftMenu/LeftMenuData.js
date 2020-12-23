//左侧菜单数据
export default [
    {
        name: 'FirstPage',//路由name
        path: 'FirstPage',//路由name
        title: '信息公告',
        meta: { type: 1 },
        icon: 'el-icon-message'
    }, {
        title: '项目管理',
        meta: { type: 2 },
        icon: 'el-icon-folder-checked',
        children: [ //子菜单
            {
                name: 'ProjectList',//路由name
                path: 'ProjectList',//路由name
                title: '部门项目',
            },{
                name: 'MyProjectList',//路由name
                path: 'MyProjectList',//路由name
                title: '我的项目',
                meta: { type: 1 },
            }, {
                name: 'Project',//路由name
                path: 'Project',//路由name
                title: '项目授权',
                meta: { type: 1 },
            },
        ]
    }, {
        name: 'DesignPage',//路由name
        path: 'DesignPage',//路由name
        title: '工程设计',
        meta: { type: 3 },
        icon: 'el-icon-edit-outline'
    }, {
        title: '物性计算',
        meta: { type: 4 },
        icon: 'el-icon-edit-outline'
    }, {
        name: 'Materials',//路由name
        path: 'Materials',//路由name
        title: '材料管理',
        meta: { type: 5 },
        icon: 'el-icon-document-copy'
    }, {
        title: '系统管理',
        meta: { type: 6 },
        icon: 'el-icon-menu',
        children: [ //子菜单
            {
                name: 'Send',//路由name
                path: 'Send',//路由name
                title: '信息发布',
            }, {
                name: 'User',//路由name
                path: 'User',//路由name
                title: '用户管理',
            }, {
                name: 'Organization',//路由name
                path: 'Organization',//路由name
                title: '部门管理',
            }, {
                name: 'Power',//路由name
                path: 'Power',//路由name
                title: '权限角色',
            }, {
                name: 'DataCopy',//路由name
                path: 'DataCopy',//路由name
                title: '数据备份',
            }, {
                name: 'SystemLog',//路由name
                path: 'SystemLog',//路由name
                title: '系统日志',
            }, 
        ]
    }, 
    // {
    //     name: 'Project',//路由name
    //     path: 'Project',//路由name
    //     title: '项目借用授权',
    //     meta: { type: 1 },
    //     icon: 'el-icon-folder-checked'
    // },
    // {
    //     name: 'ProjectList',//路由name
    //     path: 'ProjectList',//路由name
    //     title: '项目列表',
    //     icon: 'el-icon-notebook-2'
    // },
]
