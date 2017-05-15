<template>
  <div style="width:100%;background:#f3726d ">
    <el-menu style="width: 67%;margin: 0 auto;background: #f3726d" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item class="top_li" index="1" style="margin-left: 0;">热门问答</el-menu-item>
      <el-menu-item class="top_li" index="2">最新提问</el-menu-item>
      <el-menu-item class="top_li" index="3">我的问答</el-menu-item>
      <el-input class="input_top"
                placeholder="探索问答"
                icon="search"
                v-model="input2"
                :on-icon-click="handleIconClick">
      </el-input>
      <el-menu-item class="top_li" index="4">消息</el-menu-item>

    </el-menu>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1',
          input2: ''
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        handleIconClick(ev) {
          console.log(ev);
        }
      }
    }
  </script>

<style>
  .top_li{
    color:#fff;
  }
  .el-menu--horizontal .el-menu-item{
    border-bottom: 1px solid transparent;
    margin-left:20px;
  }
  .el-menu-item.is-active{
    color:#fff;
    background: #6a4e48;
  }
  .el-menu--dark .el-menu-item{
    color:#fff;
  }
  .el-menu--dark .el-menu-item:hover{
    background: #333333;
  }
  .input_top{
    width: 30%;
    margin-top: 12px;
    margin-left: 30px;
    float: right;
  }
</style>
