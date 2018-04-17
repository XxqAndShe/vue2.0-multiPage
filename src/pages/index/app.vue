<template>
  <div id="app">
    <!-- 顶部 -->
    <div id="header">
      <div class="name">XXX</div>
    </div>
    <!-- 侧栏 -->
    <div id="aside" :class="{'collapse-menu': collapseMenu}">
      <div class="collapse-menu" @click="collapseMenu = !collapseMenu">
        <icon-svg style="fill: #fff;" :size="20" icon-class="ego-menu"></icon-svg>
      </div>
      <div class="menu">
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="framePath"
          :collapse="collapseMenu"
          background-color="#1c2f41"
          text-color="rgba(255, 255, 255, 0.65)"
          active-text-color="#409EFF"
          style="width: 100%;box-sizing: border-box;border-right: none;">
          <el-submenu index="1">
            <template slot="title">
              <span slot="title">module1</span>
            </template>
            <el-menu-item index="/module1/home1.html" @click.native="go('/module1/home1.html')">home1</el-menu-item>
            <el-menu-item index="/module1/home2.html" @click.native="go('/module1/home2.html')">home2</el-menu-item>
            <el-menu-item index="/module1/home3.html" @click.native="go('/module1/home3.html')">home3</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span slot="title">module2</span>
            </template>
            <el-menu-item index="/module2/home4.html" @click.native="go('/module2/home4.html')">home4</el-menu-item>
            <el-menu-item index="/module2/home5.html" @click.native="go('/module2/home5.html')">home5</el-menu-item>
            <el-menu-item index="/module2/home6.html" @click.native="go('/module2/home6.html')">home6</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span slot="title">module3</span>
            </template>
            <el-menu-item index="/module3/home7.html" @click.native="go('/module3/home7.html')">home7</el-menu-item>
            <el-menu-item index="/module3/home8.html" @click.native="go('/module3/home8.html')">home8</el-menu-item>
            <el-menu-item index="/module3/home9.html" @click.native="go('/module3/home9.html')">home9</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <span slot="title">module4</span>
            </template>
            <el-menu-item index="/module4/home10.html" @click.native="go('/module4/home10.html')">home10</el-menu-item>
            <el-menu-item index="/module4/home11.html" @click.native="go('/module4/home11.html')">home11</el-menu-item>
            <el-menu-item index="/module4/home12.html" @click.native="go('/module4/home12.html')">home12</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <!-- 内容 -->
    <div id="main" v-loading="mainLoading" :class="{'collapse-menu': collapseMenu}">
      <iframe :src="framePath" ref="iframe" frameborder="0" id='framePath'></iframe>
    </div>
  </div>
</template>

<script>
import Viewer from "viewerjs";

export default {
  data() {
    return {
      mainLoading: true,
      baseUrl: process.env.BASE_URL,
      collapseMenu: false,
      framePath: "/home1.html",
      dialogTableVisible: false,
    };
  },
  created() {
    var path = '/module1/home1.html';
    console.log(location.hash.substring(1));
    this.framePath = path || "/home1.html";
  },
  mounted() {
    // 监听iframe窗口的消息
    this.$nextTick(function() {
      this.$refs.iframe.addEventListener("load", () => {
        this.mainLoading = false;
        location.hash = encodeURIComponent(this.framePath);
      });
    });
    /**
     * @description 首页跳转
     **/
    window.addEventListener(
      "message",
      e => {
        const domain = window.location.origin;
        const sourceDomain = e.origin || e.originalEvent.origin;
        if (domain === sourceDomain) {
          console.log(typeof e.data)
          if(e.data.type === 'home'){
            this.go(e.data.data)
          }
        }
      },
      false
    );
  },
  methods: {
    go: function(path) {
      if (path === this.framePath) return false;
      this.mainLoading = true;
      this.framePath = path;
      location.hash = encodeURIComponent(path);
    }
  }
};
</script>

<style lang="less">
@import "../../styles/variable.less";

html,
body {
  position: relative;
  width: 100%;
  height: 100%;
  color: @font-color;
  overflow-y: hidden;
}

#aside .menu::-webkit-scrollbar {
  width: 6px;
  height: 5px;
  background-color: #f5f5f5;
}
/*定义滚动条的轨道，内阴影及圆角*/
#aside .menu::-webkit-scrollbar-track {
  background-color: #1c2f41;
}
/*定义滑块，内阴影及圆角,宽高分别对应横竖滑块的尺寸*/

#aside .menu::-webkit-scrollbar-thumb {
  width: 5px;
  height: 5px;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: #a8a8a8;
}
#app-index {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: @min-width;
  overflow: hidden;
}
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#header {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  height: @header-height;
  align-items: stretch;
  justify-content: space-between;
  line-height: @header-height;
  background: linear-gradient(
    to right,
    @header-color-from 0,
    @header-color-to 100%
  );
  .name {
    flex: 0 0 @aside-width;
    text-align: center;
    font-size: 24px;
    color: #fff;
  }
  .nav {
    display: flex;
    align-items: center;
    padding: 0 15px;
    line-height: @header-height;
    color: #fff;
  }
  .avatar-box {
    display: inline-block;
    vertical-align: middle;
  }
  .avatar {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: none;
    user-select: none;
  }
  .el-icon-arrow-down {
    display: none;
  }
}

#aside {
  box-sizing: border-box;
  position: absolute;
  top: @header-height;
  bottom: 0;
  width: @aside-width;
  overflow: hidden;
  background-color: @aside-color;
  transition: width 0.3s;
  .menu {
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    bottom: 0;
    overflow: hidden;
    overflow-y: scroll;
  }
  .svg-icon {
    margin-right: 4px;
    fill: rgba(255, 255, 255, 0.65);
  }
  &.collapse-menu {
    width: @aside-collapse-width;
  }
  .collapse-menu {
    height: 30px;
    text-align: center;
    background-color: fade(#fff, 20%);
    .svg-icon {
      margin-top: 6px;
    }
  }
}

#main {
  position: absolute;
  top: @header-height;
  left: @aside-width;
  right: 0;
  bottom: 0;
  transition: left 0.3s;
  overflow: hidden;
  &.collapse-menu {
    left: @aside-collapse-width;
  }
  iframe {
    height: 100%;
    width: 100%;
    border: none;
  }
}
.order-dialog {
  width: 100%;
  .nameplate {
    display: flex;
    margin-bottom: 10px;
    border: 1px solid #2222;
    > div {
      flex: 1;
    }
    > div:first-child {
      flex: 0 0 5em;
      height: 50px;
      margin-right: 6px;
      > img {
        display: block;
        width: 50px;
        height: 50px;
        margin: 0 auto;
      }
    }
  }
  .list {
    > div {
      display: flex;
      label {
        flex: 0 0 5em;
        margin-right: 5px;
        text-align: right;
      }
    }
    .order-imageBox {
      display: flex;
      width: 100%;
      > div {
        position: relative;
        flex: 0 0 110px;
        height: 110px;
        margin-right: 3px;
        overflow: hidden;
      }
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        max-width: 100%;
        max-height: 100%;
        transform: translate3d(-50%, -50%, 0);
      }
    }
  }
}
</style>
