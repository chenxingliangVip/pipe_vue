import FirstPage from '@/views/mainContent/FirstPage/Index' //信息公告
import Project from '@/views/mainContent/Project/Index' //项目借用授权
import Materials from '@/views/mainContent/Materials/Index' //角色管理
import ProjectList from '@/views/mainContent/ProjectList/Index' //项目列表
import MyProjectList from '@/views/mainContent/MyProjectList/Index' //项目列表
import User from '@/views/mainContent/System/User/Index' //用户管理
import Send from '@/views/mainContent/System/Send/Index' //信息发布
import Power from '@/views/mainContent/System/Power/Index' //系统管理——角色权限
import Organization from '@/views/mainContent/System/Organization/Index' //系统管理——组织架构
import DataCopy from '@/views/mainContent/System/DataCopy/Index' //系统管理——数据备份
import SystemLog from '@/views/mainContent/System/SystemLog/Index' //系统管理——系统日志

// **************登录后访问的路由**********
export default [{
    path: 'FirstPage',
    name: 'FirstPage',
    meta: { title: '信息公告' },
    component: FirstPage
}, {
    path: 'Project',
    name: 'Project',
    meta: { title: '项目授权' },
    component: Project
}, {
    path: 'Materials',
    name: 'Materials',
    meta: { title: '材料管理' },
    component: Materials
}, {
    path: 'ProjectList',
    name: 'ProjectList',
    meta: { title: '项目列表' },
    component: ProjectList
}, {
    path: 'MyProjectList',
    name: 'MyProjectList',
    meta: { title: '我的项目' },
    component: MyProjectList
}, {
    path: 'User',
    name: 'User',
    meta: { title: '用户管理' },
    component: User
}, {
    path: 'Send',
    name: 'Send',
    meta: { title: '信息发布' },
    component: Send
}, {
    path: 'Send',
    name: 'Send',
    meta: { title: '信息发布' },
    component: Send
}, {
    path: 'Organization',
    name: 'Organization',
    meta: {title: '部门管理'},
    component: Organization
}, {
    path: 'Power',
    name: 'Power',
    meta: {title: '权限角色'},
    component: Power
}, {
    path: 'DataCopy',
    name: 'DataCopy',
    meta: {title: '数据备份'},
    component: DataCopy
}, {
    path: 'SystemLog',
    name: 'SystemLog',
    meta: {title: '系统日志'},
    component: SystemLog
}, 
]
