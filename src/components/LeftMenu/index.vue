<template>
  <div class="leftMenu" :class="$store.state.leftMenuMin && 'min'">
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
    <p class="tab">© 2019 睿孚 RELICA</p>
  </div>
</template>

<script>
  import LeftMenuData from './LeftMenuData'
  import MenuList from './MenuList'
  import {getToken} from '@/utils/auth' // 验权
  export default {
    components: {MenuList},
    data() {
      function menuIndexsGet(menuData, parentIndex, menuIndexData) {
        menuData = menuData ? menuData : LeftMenuData;
        menuIndexData = menuIndexData ? menuIndexData : {};
        parentIndex = parentIndex ? parentIndex : '';
        for (let i = 0; i < menuData.length; i++) {
          if (menuData[i].name) {
            menuIndexData[menuData[i].name] = parentIndex ? (parentIndex + '-' + i) : i.toString();
          }
          if (menuData[i].children && menuData[i].children.length) {
            menuIndexsGet(menuData[i].children, parentIndex ? (parentIndex + '-' + i) : i.toString(), menuIndexData)
          }
        }
        return menuIndexData;
      }
      function getSelfLeftMenu(){
        let user = JSON.parse(getToken());
        let newMenu = [];
        let roleType = user.roleType;
        if(roleType == 1){
          return LeftMenuData;
        }
        for (let m of LeftMenuData) {
          let meta = m.meta;
          if(meta && meta.auth &&meta.auth.length > 0){
            if (meta.auth.indexOf(roleType) > -1) {
              newMenu.push(m);
            }else{
              continue;
            }
          }
          if (meta && meta.type) {
            if (roleType !== 1) {
              if (roleType == meta.type) {
                newMenu.push(m);
              }
            }
          }else{
            newMenu.push(m);
          }
        }
        return newMenu;
      }
      let newMenu = getSelfLeftMenu();
      let menuIndexData = menuIndexsGet(newMenu);
      return {
        LeftMenuData: newMenu,
        activeNum: "1",
        menuIndexs: menuIndexData,
        isCollapse: false, //菜单折叠
      };
    },
    methods: {
    },
    mounted() {

    }
  };
</script>

<style scoped lang="scss">
  @import "@/assets/style/LeftMenu.scss";
</style>
