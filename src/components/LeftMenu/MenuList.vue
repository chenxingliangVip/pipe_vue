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
                    <Menu :menuData="item.children" :parentIndex=" parentIndex ? parentIndex + '-' + index : index "></Menu>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else-if="item.title == '物性计算'" :index=" parentIndex ? parentIndex + '-' + index : index.toString() " @click.native="computer()">
                <i v-if="item.icon" :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <el-menu-item v-else :index=" parentIndex ? parentIndex + '-' + index : index.toString() " @click.native="goPage(item.name)">
                <i v-if="item.icon" :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </div>
        
        <!-- 物性速算弹框 -->
        <div class="zll-dialog">
            <popout title="物性速算" :visible.sync="computerDialog" v-if="computerDialog" class="computer_dialog">
                <Computer ref="add" slot="content" :isEdit="isEdit" :editData="programInfo"></Computer>
            </popout>
        </div>
    </div>
</template>

<script>
import Computer from "@/views/DesignPage/computer.vue";
export default {
    props: {
        menuData: {},
        parentIndex: {
            default: "",
        },
        computerDialog: false,
        isEdit: false,
        programInfo: {
          id: "",
          custom: '',
          programName: '',
          acuteValue: '',
          rough: '',
          designer: '',
          checker: '',
          examiner: '',
          approver: '',
          averDegree: '',
          averWind: '',
          airDegree: '',
          groundDegree: '',
          groundDeep: '',
          groundHeat: '',
          airHeat: '',
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
        computer() {
            this.computerDialog = true
        }
    },
    components: {
      Computer,
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/style/LeftMenu.scss";
</style>
