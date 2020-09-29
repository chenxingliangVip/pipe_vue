<template>
    <div class="MainPage">
        <div class="state" v-if="state == 0">
            <Header ref="Header"></Header>
            <div class="main_right">
                <LeftMenu></LeftMenu>
                <div class="mainContent" :class="$store.state.leftMenuMin && 'max'">
                    <div class="bodyContain">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
        <div class="main_right" v-if="state == 1">
            <div class="mainContent" :class="$store.state.leftMenuMin && 'max'">
                <div class="bodyContain">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <div class="main_right" v-if="state == 2">
            <div class="mainContent" :class="$store.state.leftMenuMin && 'max'">
                <div class="bodyContain">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu/index";
import Header from "@/components/Header/index";

let userInfo = JSON.parse(localStorage.getItem('userInfo'))
export default {
    name: "MainPage",
    data() {
        return {
            state: 0
        };
    },
    components: {
        LeftMenu,
        Header,
    },
    mounted() {
        this.state = userInfo.state
    },
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用 不！能！获取组件实例 `this` 因为当钩子执行前，组件实例还没被创建
        if(userInfo.state == 0) {
            next((VM) => {
                VM.$refs.Header.setMenu(to);
            });
        }else {
            next();
        }
    },
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。可以访问组件实例 `this`
        next();
        if(userInfo.state == 0) {
            this.$refs.Header.setMenu(to);
        }
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用 可以访问组件实例 `this`
        next();
    },
};
</script>

<style scoped lang="scss">
.MainPage {
    width: 100%;
    height: 100%;
    overflow: auto;
    .state {
        width: 100%;
        height: 100%;
    }
    .main_right {
        height: calc(100% - 50px);
        width: 100%;
        display: flex;
    }
    .mainContent {
        // padding: 15px;
        height: calc(100% - 46px);
        overflow: auto;
        background-color: #f6f6f6;
        width: calc(100% - 170px);
        margin-top: 46px;
        transition: width 0.3s;
        .bodyContain {
            background: #fff;
            box-shadow: 0 0 3px #ccc;
            padding: 15px;
            min-height: 100%;
        }
        &.max {
            width: calc(100% - 64px);
        }
    }
}
</style>
