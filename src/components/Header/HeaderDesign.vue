<template>
  <div class="header"
       :style="{backgroundColor:$store.state.colorData.top.topBgColor,color:$store.state.colorData.top.topFontColor}">
    <div class="Title_header"
         :style="{backgroundColor:$store.state.colorData.top.topBgColor,color:$store.state.colorData.top.topFontColor}">
      <img class="Roms" src="@/assets/img/logo_icon.png"/>
      <span class="splite">|</span> 全时段多用户蒸汽管网水力耦合计算系统
    </div>
    <!-- 右侧按钮 -->
    <div class="header_user"
         :style="{backgroundColor:$store.state.colorData.top.topBgColor,color:$store.state.colorData.top.topFontColor}">
      <!-- <div class="headalist"  @click="showTheme = true">
          <span class="changeColor" title="切换主题"><i class="el-icon-s-promotion"></i></span>
      </div> -->
      <div class="headalist time_now">
        {{nowDate}} {{nowTime}}
      </div>
      <div class="headalist headLayout">
        <span>{{ userInfo }} <i class="el-icon-caret-bottom"></i></span>
        <div class="mouseHoverParent">
          <div class="mouseHover">
            <p @click="resetDialog = true"><i class="el-icon-key"></i> 修改密码</p>
            <p @click="LoginOut('Login')"><i class="el-icon-switch-button"></i> 退出登录</p>
          </div>
        </div>
      </div>
    </div>
    <!--修改密码-->
    <div class="zll-dialog changePassword">
      <popout title="修改密码" :visible.sync="resetDialog" v-if="resetDialog" class="minSize">
        <password ref="reset" slot="content" @resetForm="getResetFormData"></password>
        <template slot="bottom">
          <p class="zll-botton" @click="()=>{this.$refs.reset.setResetFormData('resetForm')}">提 交</p>
        </template>
      </popout>
    </div>
    <!--切换主题-->
    <color-popout :showPopout.sync="showTheme"></color-popout>
  </div>
</template>

<script>
  import colorPopout from '@/components/colorPopout/index'
  import password from './changePassword'
  import {getToken, setToken, removeToken} from "@/utils/auth";

  export default {
    components: {colorPopout, password},
    data() {
      return {
        showTheme: false, //主题弹框显示
        resetDialog: false,
        userInfo: '',
        nowTime: new Date(),
        nowDate: new Date(),
      }
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
      LoginOut(name) {//退出登录
        removeToken();
        if (this.$route.name != name) this.$router.push({name});
      },
      getResetFormData(data) { //修改密码
        this.updateUserPwd(data);

      },
      updateUserPwd(data) {
        let self = this;
        self.$http({
          url: "/pipe/updateUserPwd",
          method: "post",
          params: data
        }).then(resp => {
          if (!resp.success) {
            self.$message.error("密码错误！");
          } else {
            self.$message.success("修改成功!");
            self.resetDialog = false
            self.LoginOut("/Login");
          }
        });

      },
    },
    mounted() {
      this.getdateFormat(); //时间
      setInterval(() => {
        this.getdateFormat();
      }, 1000);
      let user = JSON.parse(getToken());
      this.userInfo = user.userName;
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/style/Header.scss";

  .time_now {
    width: 200px !important;
  }
</style>
