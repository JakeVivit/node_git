<!--头部引入组件-->
<template>
  <div id="index">
    <header-top></header-top>
    <div class="main">
      <div class="thismain">
        <right></right>
        <!--左侧侧部分-->
        <div class="mainleft" style="background: none; margin-top: 20px;background: #fff;padding-top: 20px;">
            <div class="as_topbar">
              <div class="author_img">
                <img src="">
              </div>
              <div class="nav">
                <span  @click="dialogVisible = true">提问</span>
                <span>回答</span>
                <span>写文章</span>
              </div>
            </div>
          <div class="clr"></div>
          <div class="as_target">
            <span>关注的话题：</span>
            <el-tag type="primary">标签三</el-tag>
            <el-tag type="primary">标签三</el-tag>
            <el-tag type="primary">标签三</el-tag>
            <el-tag type="primary">标签三</el-tag>
          </div>
          <div class="as_hottop">
            <h4>最热动态</h4>
            <span>设置</span>
          </div>
          <div class="as_main">
            <div class="top_img">
              <img>
            </div>
            <div class="problem">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。" name="1">
                  <div class="tetx_all">
                    <div class="text_img_con">
                      <span class="text">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</span>
                    </div>
                    <div class="clr"></div>
                    <div class="everone_msg">
                      <span class="zuozhe"><span class="answer_img"><img src=""></span>小小食人魔</span>
                      <span class="ding">顶（+3）</span>
                      <span class="guanzhu">关注此人</span>
                    </div>
                  </div>
                  <div class="clr"></div>
                  <div class="tetx_all">
                    <div class="text_img_con">
                      <span class="text">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</span>
                    </div>
                    <div class="clr"></div>
                    <div class="everone_msg">
                      <span class="zuozhe"><span class="answer_img"><img src=""></span>小小食人魔</span>
                      <span class="ding">顶（+3）</span>
                      <span class="guanzhu">关注此人</span>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <div class="button">
                <span class="dianzan">点赞（+10）</span>
                <span class="huida">回答（+35）</span>
                <span class="shoucang">收藏话题（+22）</span>
              </div>
            </div>
          </div>

          <div class="as_main">
            <div class="top_img">
              <img>
            </div>
            <div class="problem">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。" name="1">
                  <div class="tetx_all">
                    <div class="text_img_con">
                      <span class="text">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</span>
                    </div>
                    <div class="clr"></div>
                    <div class="everone_msg">
                      <span class="zuozhe"><span class="answer_img"><img src=""></span>小小食人魔</span>
                      <span class="ding">顶（+3）</span>
                      <span class="guanzhu">关注此人</span>
                    </div>
                  </div>
                  <div class="clr"></div>
                  <div class="tetx_all">
                    <div class="text_img_con">
                      <span class="text">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</span>
                    </div>
                    <div class="clr"></div>
                    <div class="everone_msg">
                      <span class="zuozhe"><span class="answer_img"><img src=""></span>小小食人魔</span>
                      <span class="ding">顶（+3）</span>
                      <span class="guanzhu">关注此人</span>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <div class="button">
                <span class="dianzan">点赞（+10）</span>
                <span class="huida">回答（+35）</span>
                <span class="shoucang">收藏话题（+22）</span>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

    <!--我要提问弹出层-->
    <el-dialog title="提问" v-model="dialogVisible" size="tiny">
      <!--<span>哈哈哈哈</span>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <router-view></router-view>
  </div>
</template>
<script>
  import HeaderTop from '../components/headerAscertain.vue'
  import right from '../components/rightAscertain.vue'
  export default{
    name: 'index',
    data() {
      return{
        activeName: '2', //折叠面板
        dialogVisible: false
      }
    },
    mounted:function () {

    },
    methods:{

    },
    components:{
      HeaderTop,
      right
    }
  }
</script>

<style>
  .clr{
    clear: both;
  }
  .el-collapse-item__header{
    height:auto;
    line-height: 35px;
  }
  .el-dialog--tiny{
   width: 40%;
  }
</style>

