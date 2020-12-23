<template>
    <div class="addProject">
        <h3>优秀员工通知</h3>
        <div class="txt-contain">
            <p>优秀员工通知</p>
            <p class="time">2020-02-22 11:11:11</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        };
    },
    methods: {
       
    }
};
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";
    .txt-contain {
        padding: 30px;
        p {
            line-height: 26px;
            &.time {
                text-align: right;
            }
        }
    }
</style>