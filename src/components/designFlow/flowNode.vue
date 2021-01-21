<template>
    <div
        class="node-item"
        ref="node"
        :style="flowNodeContainer"
        @mouseenter="showDelete"
        @mouseleave="hideDelete"
        @mouseup="changeNodeSite"
        @dblclick.stop="editNode"
    >
        <!-- <div class="node-titel">
            <div class="node-icon" v-show="mouseEnter">
                <i class="el-icon-delete" @@click.stop="deleteNode"></i>
            </div>
        </div> -->
        <div class="node-con">
            <img class="imgsrc type-icon" :src="iconClass">
            <p>{{ node.name }}</p>
            <div class="node_txt" v-if="node.Type == 1">
                <p v-show="node.pressure">压力：{{node.pressure}}Mpa</p>
                <p v-show="node.temperature">温度：{{node.temperature}}℃</p>
            </div>
            <div class="node_txt" v-if="node.Type == 3">
                <p v-show="node.liuL">流量：{{node.liuL}}</p>
                <p v-show="node.finalPressure">压力：{{node.finalPressure}}Mpa</p>
                <p v-show="node.finalT">温度：{{node.finalT}}℃</p>
            </div>

            <div class="guide-leftTop" v-show="mouseEnter"></div>
            <div class="guide-rightTop" v-show="mouseEnter"></div>
            <div class="guide-leftBottom" v-show="mouseEnter"></div>
            <div class="guide-rightBottom" v-show="mouseEnter"></div>
        </div>
        <div class="node-del" v-show="mouseEnter" @click.stop="deleteNode">
            <i class="el-icon-circle-close"></i>
        </div>

        <!--连线用--//触发连线的区域-->
        <div class="flow-node-drag" v-show="isconnect"></div>
    </div>
</template>

<script>
export default {
    props: {
        node: Object,
        isconnect: Boolean,
    },
    data() {
        return {
            mouseEnter: false,
        };
    },
    computed: {
        // 节点容器样式
        flowNodeContainer: {
            get() {
                return {
                    position: "absolute",
                    minWidth: "80px",
                    top: this.node.top,
                    left: this.node.left,
                    boxShadow: this.mouseEnter
                        ? "#66a6e0 0px 0px 12px 0px"
                        : "",
                };
            },
        },
        iconClass() {
            if (this.node.Type == 1) {
                return require("@/assets/img/reyuan.png");
            } else if (this.node.Type == 2) {
                return require("@/assets/img/jiedian.png");
            } else if (this.node.Type == 3) {
                return require("@/assets/img/yonghu.png");
            }
        },
    },
    methods: {
        // 删除节点
        deleteNode() {
            this.$emit("delete-node", this.node.id);
        },
        // 编辑节点
        editNode() {
            this.$emit("edit-node", this.node.id);
        },
        // 鼠标进入
        showDelete() {
            this.mouseEnter = true;
        },
        // 鼠标离开
        hideDelete() {
            this.mouseEnter = false;
        },
        // 鼠标移动后抬起
        changeNodeSite() {
            // this.$emit("changeNodeSite", {
            //     nodeId: this.node.id,
            //     left: this.$refs.node.style.left,
            //     top: this.$refs.node.style.top,
            // });
            let position = this.calcPosstion();
            this.$refs.node.style.left = position.left;
            this.$refs.node.style.top = position.top;

            this.$emit("changeNodeSite", {
                nodeId: this.node.id,
                left: position.left,
                top: position.top,
            });
        },
        // 计算元素位置
        calcPosstion(){
            /**
             * 相近元素自动对齐(相差50px自动对齐)
             * 对齐原则为:当左右同时出现满足对齐条件时候，优先选择左侧元素
             *             当上下同时出现满足对齐条件时候，优先选择上侧元素
             *
             */
            const offsetNum = 50;//偏移量
            // 当前元素位置
            let nodeX = this.$refs.node.style.left.replace('px','')*1,
                nodeY = this.$refs.node.style.top.replace('px','')*1;
            let newX = nodeX,newY = nodeY;//计算后的位置
            //所有元素位置
            let posstionArr = this.$parent.data.nodeList.map(item => {
                if(item.id == this.node.id) return null;
                let newItem = {
                    x:document.getElementById(item.id).style.left.replace('px','')*1,
                    y:document.getElementById(item.id).style.top.replace('px','')*1,
                }
                return {
                    ...newItem,
                    offsetX:nodeX - newItem.x,
                    offsetY:nodeY - newItem.y,
                };
            }) || [];
            // let addX = 0,addY = 0;//距离当前元素的位置
            posstionArr.map(item => {
                if(!item) return false;
                if(Math.abs(item.offsetX) < offsetNum ){
                    // addY = this.getLeftVal(addY,item.offsetY);
                    // if(addY == item.offsetY){
                    newX = item.x;
                    // }
                }
                if(Math.abs(item.offsetY) < offsetNum ){
                    // addX = this.getLeftVal(addX,item.offsetX);
                    // if(addX == item.offsetX){
                    newY = item.y;
                    // }
                }
                return false;
            })
            return {
                left:newX + 'px',
                top:newY + 'px',
            }
        },
        //优先获取正数，然后取最小正数
        getLeftVal(theVal,newVal){
            if(theVal == 0){
                return newVal;
            }
            if(theVal < 0 ){
                if(newVal > 0){
                    return newVal;
                }else{
                    return theVal > newVal ? theVal : newVal;
                }
            }else{
                if(newVal > 0){
                    return theVal > newVal ? newVal : theVal;
                }else{
                    return theVal;
                }
            }
        },
    },
};
</script>
<style>
.node-item {
    /* border-radius: 4px; */
    /* box-shadow: 0 0 2px #696969; */
    cursor: move;
    overflow: initial;
    /* background: #fbf4dc; */
    padding: 5px 0;
}

.node-titel {
    height: 20px;
    background: #ffc400;
}

.node-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    line-height: 20px;
}

.node-icon i {
    cursor: pointer;
}

.node-con {
    text-align: center;
    line-height: 15px;
}
.node-con .imgsrc {
    width: 40px;
    height: 40px;
}
.node-del {
    position: absolute;
    color: red;
    font-size: 16px;
    cursor: pointer;
    top: -8px;
    right: -8px;
}
.flow-node-drag {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: crosshair;
}
.node_txt p {
    text-align: left;
    padding-left: 10px;
}
.guide-leftTop {
    height: 1px;
    width: 580px;
    border: 1px dashed #2ab1e8;
    position: absolute;
    top: -0px;
    left: -250px;
    border-top: none;
    border-left: none;
}
.guide-rightTop {
    height: 1px;
    width: 580px;
    border: 1px dashed #2ab1e8;
    position: absolute;
    bottom: 0px;
    left: -250px;
    border-bottom: none;
    border-right: none;
}
.guide-rightTop.jiedian {
    top: 69px;
}
.guide-leftBottom {
    height: 300px;
    width: 1px;
    border: 1px dashed #2ab1e8;
    position: absolute;
    top: -120px;
    right: 0px;
    border-top: none;
    border-right: none;
}
.guide-rightBottom {
    height: 300px;
    width: 1px;
    border: 1px dashed #2ab1e8;
    position: absolute;
    top: -120px;
    left: 0px;
    border-bottom: none;
    border-left: none;
}

</style>
