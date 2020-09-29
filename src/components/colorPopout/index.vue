<!--弹框表格组件-->
<template>
    <div class="colorPopout" v-show="showPopout">
        <!--背景-->
        <div class="popout-bg" @mousemove="mousemove">
            <div
                class="popout-main"
                v-bind:class="{'isMax':isMax == 2,'isMin':isMax == 0}"
                v-bind:style="getPosition()"
            >
                <div class="title" @mousedown="mousedown" @mouseup="mouseup">
                    <div class="text">切换主题</div>
                    <div class="tool" @mousedown.stop>
                        <!--最小化-->
                        <i class="el-icon-minus" v-show="isMax == 1" @click="setIsMax(0)"></i>
                        <!--最大化-->
                        <i class="el-icon-top-right" @click="setIsMax(2)" v-show="isMax == 1"></i>
                        <!--正常化-->
                        <i class="el-icon-copy-document" @click="setIsMax(1)" v-show="isMax != 1"></i>
                        <!--关闭-->
                        <i class="el-icon-close" @click="close()"></i>
                    </div>
                </div>
                <div class="content" v-show="isMax != 0">
                    <div class="color-item" v-for="(item,index) in colorDataList" :key="index">
                        <div
                            class="color-block"
                            v-bind:class="{active:$store.state.colorData.text == item.text}"
                            @click="setColorData(item)"
                        >
                            <div class="top" v-bind:style="{background:item.top.topBgColor}"></div>
                            <div class="right">
                                <div class="left" style="background:#284358"></div>
                            </div>
                        </div>
                        <div class="color-text">{{item.text}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import colorData from "./colorData";
export default {
    name: "colorPopout",
    props: ["showPopout"],
    data() {
        return {
            colorDataList: colorData, //所有主题list
            setRowShow: false, //是否显示自定义列
            isMax: 1, //是否是最大化 0 最小 1 正常  2最大
            left: false, //弹框left距离 false 代表初始移动位置
            top: false //弹框top距离 false 代表初始移动位置
        };
    },
    methods: {
        close() {
            //关闭
            this.$emit("update:showPopout", false);
        },
        setIsMax(val) {
            //设置窗口最大化、最小化
            this.left = false; //位置初始化
            this.top = false; //位置初始化
            this.isMax = val;
        },
        mousedown(e) {
            //按下
            this.down = true; //不添加监听
            this.titleX = e.offsetX; //不添加监听
            this.titleY = e.offsetY; //不添加监听
        },
        mousemove(e) {
            //移动
            if (this.down) {
                let x = e.clientX,
                    y = e.clientY;
                this.left = x - this.titleX; //设置弹框移动
                this.top = y - this.titleY; //设置弹框移动
            }
        },
        mouseup(e) {
            //松开
            this.down = false; //不添加监听
        },
        getPosition() {
            //返回弹框位置
            if (this.left === false || this.top == false) {
                return {};
            } else {
                return {
                    left: this.left + "px",
                    top: this.top + "px"
                };
            }
        },
        setColorData(data) {
            //设置data
            this.$store.commit("setColorData", data);
            this.close();
        }
    },
    components: {}
};
</script>
<style  scoped lang="scss">
.colorPopout {
    /*弹框背景*/
    .popout-bg {
        position: fixed;
        overflow: hidden;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 112;
        background: rgba(0, 0, 0, 0.4);
    }
    /*弹框内容*/
    .popout-main {
        &.isMax {
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }
        &.isMin {
            width: 180px;
            height: 45px;
            left: 0;
            bottom: 0;
            overflow: hidden;
            top: auto;
        }
        position: absolute;
        width: 500px;
        height: 390px;
        border-bottom: 1px solid #eee;
        color: #ffffff;
        background: #284358;
        z-index: 10;
        left: calc(50% - 250px);
        top: calc(50% - 195px);
        overflow: hidden;
        /*标题*/
        .title {
            height: 46px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            cursor: move;
            color: #ffffff;
            .text {
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 1;
                height: 100%;
                line-height: 45px;
                padding-left: 20px;
            }
            .tool {
                max-width: 120px;
                text-align: right;
                padding-right: 20px;
                height: 100%;
                line-height: 45px;
                cursor: initial;
                i {
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                    margin-left: 10px;
                    opacity: 0.7;
                }
            }
        }
        /*内容*/
        .content {
            height: calc(100% - 46px);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
            background: #f4f6f8;
            padding: 15px 5px 0;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-content: flex-start;
            .color-item {
                width: 150px;
                height: 97px;
                .color-block {
                    height: 60px;
                    box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
                    cursor: pointer;
                    border: 1px solid #fff;
                    &:hover,
                    &.active {
                        border: 1px solid #f00;
                    }
                    .top {
                        height: 10px;
                    }
                    .left {
                        width: 29px;
                        height: 100%;
                        float: left;
                    }
                    .right {
                        width: 100%;
                        height: calc(100% - 10px);
                        float: left;
                    }
                }
            }
            .color-text {
                text-align: center;
                font-size: 13px;
                padding: 10px 0;
            }
        }
    }
}
</style>
