<!--头部引入组件-->
<template>
  <div id="index">
    <header-top></header-top>
    <div class="main">
      <div class="thismain" id="thismain">
        <right></right>
        <!--左侧侧部分-->
        <div class="mainleft">
          <div class="top_title">
            <div class="msg_left">
              <div class="img_touxiang">
                  <img src="">
              </div>
              <div class="name">
                  作者：{{ item.username }}
              </div>
              <div class="target">
                <span>JavaScript</span>
              </div>
            </div>
            <div class="msg_right">
              <div class="right_main">
                <span> {{ item.title }} </span>
                <p> {{ item.time_data }} </p>
              </div>
            </div>
          </div>
          <div class="clr"></div>
          <!--博客内容主要部分-->
          <div id="text">
              <div class="con" v-html="item.content">
              </div>
              <div class="bottom">
                  <span class="imgCon" @click = "click_fabulous( item._id)">
                      <img :src="item.dianzan_link">
                      <p>{{ item.votes }}</p>
                  </span>
                <span class="imgCon" @click="click_collection( item._id )">
                    <img style="margin-top:4px;" :src="item.change_link">
                    <p > 收藏 </p>
                </span>
              </div>
          </div>
          <div class="clr"></div>
          <!--评论模块-->
          <div class="comment">
              <div class="comment_top">
                  <span>发表评论：</span>
              </div>
              <div class="comment_no" v-show = "comment_btn">
                  <span @click="not_login">您还没登录，请登陆后发表评论！</span>
              </div>
              <div class="comment_yes" v-show = "is_comment_con">
                  <textarea v-model = "comment_con"></textarea>

                  <button @click="set_comment" style="margin-top: 20px;padding:5px 10px;"> 发表评论 </button>
              </div>
          </div>

          <div class="comment">
            <div class="comment_top">
              <span style="font-weight: normal;">所有热门评论：</span>
            </div>
            <div class="no_comment" style="margin-top: 20px;" v-show="no_comment">
              <span style="color:#666;font-size: 14px;">暂时没有评论，快来发表自己观点吧！</span>
            </div>
            <div class="comment_text">
              <ul class="ul_01">
                <li v-for="item in comment_item">
                  <span style="display:inline-block;width:30px;height:30px;margin-right: 10px;overflow: hidden;"><img style="width:100%;" src="/img/footer.png"></span>
                  <span>{{ item.comment_content }}</span>
                  <div class="pinglunzhe">
                    <span>评论：{{ item.username }}</span>
                    <span>时间：{{ item.time }}</span>
                    <!--<span class="comment_back">回复评论</span>-->
                    <button @click = "click_comment(item._id)" v-show = "is_comment_con" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">发表观点</button>
                  </div>
                  <div class="back_text" v-show="item.show">
                    <span>评论回复：</span>
                    <ul class="ul_02">
                      <li v-for=" data in item.comment_comment">
                        <span style="display:inline-block;width:20px;height:20px;margin-right: 10px;overflow: hidden;"><img style="width:100%;" src="/img/footer_disk.png"></span>
                        <span>{{ data.content }}</span>
                        <div class="clr"></div>
                        <div class="pinglunzhe">
                          <span>评论：{{ data.username }}</span>
                          <span>时间：{{ data.time }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="exampleModalLabel">表达出您对这条评论的观点</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="message-text" class="control-label">您想说:</label>
                <textarea class="form-control" id="message-text" v-model="dalog_text"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="dalog_sure">回复这条评论</button>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
  import HeaderTop from '../components/header.vue'
  import right from '../components/right.vue'
  export default{
    name: 'index',
    data() {
      return{
        item:"",
        n:true,
        d:true,
        comment_btn:false,
        is_comment_con:true,
        comment_con : "",
        comment_item:"", //要写到页面上的所有评论数据
//        is_comment_com:false, //是否要展示评论下面的所有回复
        comment_id:"", //这是每天评论的id
        dalog_text:"", //模态输入框的值
        no_comment:false //没有评论显示的提示文字
      }
    },
    mounted:function () {
      //根据获得url id来读取content内容表的数据
      var id = this.$route.query.id
      this.$http.post('/dogettext',{id:id},{emulateJSON:true}).then(function(res){
          var that = this;
          var data = res.body.data[0];
          var this_username = res.body.this_username //此时登陆者的username//未登录是空
          //判断评论输入框是不是该显示
          if(this_username == ""){
            that.comment_btn = true;
            that.is_comment_con = false;
          }else {
            that.is_comment_con = true;
            that.comment_btn = false;
          }
          that.item = data;
          if(that.item.isshoucang == 0){
            that.$set(that.item,'change_link','/img/favorites.png');
          }else if(that.item.isshoucang == 1){
            that.$set(that.item,'change_link','/img/favorites_click.png');
            that.n = false;
          }
          if(that.item.isdianzan == 0){
            that.$set(that.item,'dianzan_link','/img/good.png');
          }else if(that.item.isdianzan == 1){
            that.$set(that.item,'dianzan_link','/img/good_clickd.png');
            that.d = false;
          }
      },function (res) {
        console.log(status);
      });
      //来读取comments表里所有评论数据
      this.$http.post('/showcomment',{id:id},{emulateJSON:true}).then(function(res){
          var that = this;
          if(res.body.length == 0){
            that.no_comment = true;
          }else{
            that.comment_item = res.body;
            that.no_comment = false;
            that.comment_item.forEach(function(re){
              if(re.comment_comment.length != 0){
                that.$set(re,'show',true);
              } else{
                that.$set(re,'show',false);
              }
            })
          }
      },function (res) {
        console.log(status);
      })
    },
    methods:{
      click_collection:function (id) { //点击收藏事件
        var that = this;
        //并把这篇文章的_id传入
        var this_id = id;
        if(that.n == true){
          this.$http.post('/docollection',{id:this_id,time:new Date(),del_add:that.n}).then(function(res){
            if(res.body == "0"){
              //收藏成功
              that.$set(that.item,'change_link','/img/favorites_click.png')
              that.n = false;
            }
            if(res.body == "-2"){
              //跳转登录
              var url = (document.URL).split("#/")[1] ;
              if(url == ""){
                url = "/"
              }
              window.location.href= '#/signin?id='+url
            }
          },function (res) {
            console.log(status);
          })
        }else {
          this.$http.post('/docollection',{id:this_id,time:new Date(),del_add:that.n}).then(function(res){
            console.log(res.body);
            if(res.body == "3"){
              //收藏成功
              that.$set(that.item,'change_link','/img/favorites.png');
              that.n = true;
            }
          },function (res) {
            console.log(status);
          })
        }
      },

      click_fabulous:function (id) { //点击点赞
        var that = this;
        //并把这篇文章的_id传入
        var this_id = id;
        if(that.d == true){
          var newNum_01 = that.item.votes;
          this.$http.post('/dofabulous',{id:this_id,time:new Date(),del_add:that.d}).then(function(res){
            if(res.body == "0"){
              //收藏成功
              that.$set(that.item,'dianzan_link','/img/good_clickd.png')
              //点点赞成功的时候把下面的数字也加上1
              that.$set(that.item,'votes',newNum_01 + 1);
              that.d = false;
            }
            if(res.body == "-2"){
              //跳转登录
              var url = (document.URL).split("#/")[1] ;
              if(url == ""){
                url = "/"
              }
              window.location.href= '#/signin?id='+url;
            }
          },function (res) {
            console.log(status);
          })
        }else {
          var newNum_02 = that.item.votes;
          this.$http.post('/dofabulous',{id:this_id,time:new Date(),del_add:that.d}).then(function(res){
            if(res.body == "3"){
              //点赞成功
              that.$set(that.item,'dianzan_link','/img/good.png');
              //点点赞成功的时候把下面的数字也减去 1
              that.$set(that.item,'votes',newNum_02 - 1);
              that.d = true;
            }
          },function (res) {
            console.log(status);
          })
        }
      },

      //点击还未登录，发表评论后进行登录
      not_login:function () {
        var url = (document.URL).split("#/")[1] ;
        //跳转登录
        window.location.href= '#/signin?id='+url
      },
      //点击发表评论进行评论发表
      set_comment:function () {
          var that = this;
          var comment = that.comment_con;
          var id = this.$route.query.id; //得到这篇文章的id传给后台
          if(comment != ""){
            this.$http.post('/docomment',{data:comment,id:id,type:1}).then(function(res){
              console.log(res.body);
              if (res.body == "1"){ //说明发表成功
                //进行页面刷新
                window.location.reload();
              }
            })
          }
      },

      //点击发表观点对评论进行评论
      click_comment:function (id) {
        var that = this;
        //点击的时候把id给data，做区别
        that.comment_id = id;
      },
      //点击模态框确定的时候吧评论的值传给后台
      dalog_sure:function () {
        var that = this;
        var comment = that.dalog_text;
        var id = that.comment_id;
        if(comment != ""){
          this.$http.post('/docomment',{data:comment,id:id,type:2}).then(function(res){
            if (res.body == "1"){ //说明发表成功
              //进行页面刷新
              window.location.reload();
            }
          })
        }
      }
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

  .main .thismain .mainleft{
    background: #fff;
    margin-top: 20px;
  }
</style>
