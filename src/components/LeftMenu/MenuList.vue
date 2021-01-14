<template>
    <div class="Menu">
        <div class="Menu-item"
            v-for="(item, index) in menuData"
            :key="parentIndex ? parentIndex + '-' + index : index.toString()"
        >
            <el-submenu v-if="item.children && item.children.length" :index=" parentIndex ? parentIndex + '-' + index : index.toString()">
                <template slot="title">
                    <i v-if="item.icon" :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item-group>
                    <Menu :menuData="item.children" :parentIndex=" parentIndex ? parentIndex + '-' + index : index.toString() "></Menu>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index=" parentIndex ? parentIndex + '-' + index : index.toString() " @click.native="goPage(item.name)">
                <i v-if="item.icon" :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        menuData: {},
        parentIndex: {
            default: 0,
        },
    },
    name: "Menu",
    methods: {
        goPage(name) {
            //页面跳转
            if (this.$route.name != name) {
                this.$router.push({ name });
            }
        },
    },
};
</script>

<style scoped lang="scss">
@import "@/assets/style/LeftMenu.scss";
</style>
