<template>
	<div class="Login">
        <div class="bg"></div>
        <div class="header">
            <div class="imgurl">
                <img src="@/assets/img/title.png">
            </div>
            <h2>全时段多用户蒸汽管网水力耦合计算系统</h2>
        </div>
		<div class="LoginBody Login_input">
			<el-form :model="LoginForm" ref="LoginForm" class="demo-ruleForm LoginForm">
				<el-form-item>
					<el-input v-model="LoginForm.name" placeholder="账号" class="LoginInput">
						<i slot="prefix" class="el-input__icon el-icon-user"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" v-model="LoginForm.password" autocomplete="off" show-password placeholder="密码" @keyup.enter.native="LoginSubmit" class="LoginInput">
						<i slot="prefix" class="el-input__icon el-icon-lock"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-checkbox class="remember" v-model="LoginForm.remember">记住用户</el-checkbox>
				</el-form-item>
					<div class="Login-button" @click="LoginSubmit">登 录</div>
			</el-form>
		</div>
		<div class="footer">
			<p>Copyright 2019 © Refull All rights reserved    建议使用“Chrome / IE / 搜狗高速” 浏览器</p>
		</div>
	</div>
</template>

<script>
import {getRoutePages} from '@/router'
export default {
    name: 'Login',
    data() {
        return {
            LoginForm: {
                name: '',
                password: '',
                remember: false,
                state: 0,//0管理，1设计,2经理
            },
        }
    },
    methods:{
        LoginSubmit(){
            if(this.LoginForm.name){
                if(this.LoginForm.password){
                    if( this.LoginForm.name == 'admin' ) {
                        this.LoginForm.state = 0
                    } else if( this.LoginForm.name == 'sheji' ) {
                        this.LoginForm.state = 1
                    } else if( this.LoginForm.name == 'jingli' ) {
                        this.LoginForm.state = 2
                    }
                    //登录成功
                    localStorage.setItem('LoginStatus',1) //设置登录状态为已登录
                    localStorage.setItem('userInfo', JSON.stringify(this.LoginForm)) //记录登录信息
                    this.$router.addRoutes([getRoutePages()])//添加路由

                    if( this.LoginForm.state == 0 ) {
                            this.$router.push({
                                name:'User'
                            })
                    }else if ( this.LoginForm.state == 1 ){
                        this.$router.push({
                            name:'DesignPage'
                        })
                    }else if ( this.LoginForm.state == 2 ){
                        this.$router.push({
                            name:'ManagePage'
                        })
                    }
                    return;
                }
                this.$message.error('密码不能为空!');
                return;
            }else{
                this.$message.error('用户名不能为空!');
            }
        }
    },
    
    beforeCreate() {
        localStorage.removeItem('LoginStatus')//设置登录状态为未登录
        localStorage.removeItem('userInfo')
        sessionStorage.removeItem('isAdd')
    }
}
</script>

<style scoped lang="scss">
	$baseColor: #1397de;
	.Login {
		background-image: url(../assets/img/banner_bg2.png);
		height: 100%;
		background-size: cover;
        width: 100%;
        .bg {
            height: 100%;
            width: 100%;
            background: rgba(218, 218, 218, .5);
            position: absolute;
            top: 0;
            left: 0;
        }
        .header {
            width: 100%;
            padding-top: 6%;
            padding-bottom: 10px;
            position: relative;
            z-index: 11111;
            .imgurl {
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    width: 300px;
                }
            }
            h2 {
                color: #08459a;
                font-size: 34px;
                margin: 30px 0;
                font-weight: 400;
                text-align: center;
            }
        }
		.LoginBody {
			width: 450px;
            margin: 0 auto;
			background-color: rgb(0,164,222);
			box-shadow: 0 0 20px #ffffff;
			padding: 20px 50px;
			border-radius: 10px;
            position: relative;
            z-index: 1111;
			.Login-button {
				cursor: pointer;
				width: 80%;
				text-align: center;
				padding: 10px 0px;
				background-color: #ffffff;
				margin: 0 auto;
				color: rgb(0,164,222);
				font-size: 14px;
				border-radius: 25px;
				&:active{
                    opacity: 0.8;
                }
			}
		}
		.footer {
			// color: #ffffff;
			position: fixed;
			bottom: 0px;
			width: 100%;
			padding: 10px;
			p {
				text-align: center;
			}
		}
	}
</style>
