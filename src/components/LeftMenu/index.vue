<template>
    <div class="leftMenu" :class="$store.state.leftMenuMin && 'min'">
        <div class="time" :style="{color:$store.state.colorData.top.topFontColor}" v-show="!$store.state.leftMenuMin && 'min'">
            {{nowDate}} {{nowTime}}
        </div>
        <div class="zll-Menu">
            <el-menu :class="$store.state.colorData.index"
                :collapse="$store.state.leftMenuMin"
                :collapse-transition="false"
                :default-active="menuIndexs[$route.name]"
                class="el-menu-vertical-demo"
            >
                <MenuList :menuData="LeftMenuData"></MenuList>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import LeftMenuData from './LeftMenuData'
    import MenuList from './MenuList'
    export default {
        components:{MenuList},
        data() {
            function menuIndexsGet (menuData,parentIndex,menuIndexData){
                menuData = menuData ? menuData : LeftMenuData;
                menuIndexData = menuIndexData ? menuIndexData : {};
                parentIndex = parentIndex ? parentIndex : '';
                for (let i = 0; i < menuData.length; i++) {
                    if(menuData[i].name){
                        menuIndexData[menuData[i].name] = parentIndex ? (parentIndex + '-' + i) : i.toString();
                    }
                    if(menuData[i].children && menuData[i].children.length){
                        menuIndexsGet(menuData[i].children,parentIndex ? (parentIndex + '-' + i) : i.toString(),menuIndexData)
                    }
                }
                return menuIndexData;
            }
            let menuIndexData = menuIndexsGet();
            return {
                LeftMenuData:LeftMenuData,
                activeNum: "1",
                menuIndexs: menuIndexData,
                isCollapse: false, //菜单折叠
                nowTime: new Date(),
                nowDate: new Date(),
            };
        },
        methods: {
            getdateFormat() {
                //显示时间
                var _this = this;
                let yy = String(new Date().getFullYear());
                let mm = new Date().getMonth() + 1;
                let dd = String(new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate());
                let hou = String(new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours());
                let min = String(new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes());
                let sec = String(new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds());
                _this.nowTime = hou + ":" + min + ":" + sec;
                _this.nowDate = yy + "-" + mm + "-" + dd;
            },
        },
        mounted() {
            this.getdateFormat(); //时间
            setInterval(() => {
                this.getdateFormat();
            }, 1000);
        }
    };
</script>

<style scoped lang="scss">
    @import "@/assets/style/LeftMenu.scss";
</style>
