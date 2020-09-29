<template>
    <div class="Menu">
        <div
            class="Menu-item"
            v-for="(item, index) in menuData"
            :key="parentIndex ? parentIndex + '-' + index : index.toString()"
        >
            <el-submenu
                v-if="item.children && item.children.length"
                :index="
                    parentIndex ? parentIndex + '-' + index : index.toString()
                "
            >
                <template slot="title">
                    <i v-if="item.icon" :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item-group>
                    <Menu
                        :menuData="item.children"
                        :parentIndex="
                            parentIndex ? parentIndex + '-' + index : index
                        "
                    ></Menu>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item
                v-else
                :index="
                    parentIndex ? parentIndex + '-' + index : index.toString()
                "
                @click.native="goPage(item.name)"
            >
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
            default: "",
        },
    },
    name: "Menu",
    methods: {
        goPage(name) {
            //页面跳转
            if (this.$route.name != name) {
                if (name == "Statistics") {
                    const { href } = this.$router.resolve({
                        path: "/Statistics",
                    });
                    window.open(href, "_blank");
                    return false;
                } else if (name == "ProductLine2") {
                    const { href } = this.$router.resolve({
                        path: "/ProductLine2",
                    });
                    window.open(href, "_blank");
                    return false;
                } else if (name == "ProductLine") {
                    const { href } = this.$router.resolve({
                        path: "/ProductLine",
                    });
                    window.open(href, "_blank");
                    return false;
                } else if (name == "QcScreen") {
                    const { href } = this.$router.resolve({
                        path: "/QcScreen",
                    });
                    window.open(href, "_blank");
                    return false;
                }
                this.$router.push({ name });
            }
        },
    },
};
</script>

<style scoped lang="scss">
@import "@/assets/style/LeftMenu.scss";
</style>
