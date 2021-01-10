import User from '@/views/mainContent/User/Index' //用户管理
import Project from '@/views/mainContent/Project/Index' //项目借用授权
import Materials from '@/views/mainContent/Materials/Index' //角色管理
import ProjectList from '@/views/mainContent/ProjectList/Index' //项目列表
import MyProjectList from '@/views/mainContent/MyProjectList/Index' //我的项目
import ImpowerRecord from '@/views/mainContent/ImpowerRecord/Index' //我的项目

// **************登录后访问的路由**********
export default [{
    path: 'User',
    name: 'User',
    meta: { title: '用户管理' },
    component: User
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
    path: 'ImpowerRecord',
    name: 'ImpowerRecord',
    meta: { title: '授权记录' },
    component: ImpowerRecord
}
]
