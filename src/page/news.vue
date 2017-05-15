<!--头部引入组件-->
<template>
  <div id="index">
    <header-top></header-top>
    <div class="main">
      <div class="thismain">
        <right></right>
        <!--左侧侧部分-->


        <div class="mainleft" style="background: none;margin-top:0px;">
          <div class="moudel" v-for = "(item ,$index) in item">
            <div class="left_text">
              <div class="top">
                <div class="title">{{ item.title }}</div>
                <div class="author">作者：<span class="author_id">{{ item.username }}</span> . <span>{{ item.time_data }}</span></div>
              </div>
              <div v-show="img_isshow" class="img">
                <img :src="item.target">
              </div>
              <div class="text">
                <span> {{ item.introduce }} </span>
              </div>
              <div class="bottom_btn">
                <span class="button" @click="readtext(item._id,$index)">阅读全文 ></span>
                <span class="imgCon" @click = "click_fabulous( item._id,$index )">
                                     <img :src="item.dianzan_link">
                                    <p>{{ item.votes }}</p>
                                </span>
                <span class="imgCon" @click="click_collection( item._id,$index )">
                                    <img style="margin-top:4px;" :src="item.change_link">
                                    <p > 收藏 </p>
                                </span>
              </div>
            </div>
          </div>

          <!--分页-->
          <nav aria-label="...">
            <ul class="pager">
              <li :class="{'previous':true , 'disabled' : isupclick}"><a href="#" @click="upPage" style="cursor: pointer;"><span aria-hidden="true">&larr;</span> 上一页</a></li>
              <li style="height:100%;line-height: 30px;">第{{ now_page.page }}页/共{{ page_num }}页</li>
              <li :class="{'next':true,'disabled' : isnextclick}"><a href="#" @click="nextPage" style="cursor: pointer;">下一页 <span aria-hidden="true">&rarr;</span></a></li>
            </ul>
          </nav>


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
        page_num:"",
        now_page:{
          page:1
        },
        page:"",
        img_isshow:false,
        n:true,
        d:true,
        isupclick:true,
        isnextclick:false
      }
    },
    mounted:function () {
      this.$http.post('/doreadtext',{page:this.now_page.page,sort:"time_data"},{emulateJSON:true}).then(function(res){ //收藏
        //请求成功
        var that = this;
        that.page_num = parseInt(res.body.page); //页码数量
        that.item = res.body.data;
        that.item.forEach(function (re) {
          if(re.isshoucang == 0){
            that.$set(re,'change_link','/img/favorites.png');
          }else if(re.isshoucang == 1){
            that.$set(re,'change_link','/img/favorites_click.png');
            that.n = false;
          }
          if(re.isdianzan == 0){
            that.$set(re,'dianzan_link','/img/good.png');
          }else if(re.isdianzan == 1){
            that.$set(re,'dianzan_link','/img/good_clickd.png');
            that.d = false;
          }

//          if(re.target = ""){
//            that.$set(re,'img_isshow',false)
//          }else {
//            that.$set(re,'img_isshow',true);
//          }
//          console.log(re);
//          console.log(re.isshoucang)
        })
        for(var i=0;i<res.body.data.length;i++){
            if(res.body.data[i].target != ""){
              that.img_isshow = true
            }else{
              that.img_isshow = false
            }
        }
      },function(res){
        console.log(res.status);
      });
    },
    methods:{
      click_collection:function (id,index) { //点击收藏事件
        var that = this;
        //并把这篇文章的_id传入
        var this_id = id;
        if(that.n == true){
          this.$http.post('/docollection',{id:this_id,time:new Date(),del_add:that.n}).then(function(res){
            if(res.body == "0"){
              //收藏成功
              that.$set(that.item[index],'change_link','/img/favorites_click.png')
              that.n = false;
            }
            if(res.body == "-2"){
              //跳转登录
              window.location.href= '#/signin'
            }
          },function (res) {
            console.log(status);
          })
        }else {
          this.$http.post('/docollection',{id:this_id,time:new Date(),del_add:that.n}).then(function(res){
            console.log(res.body);
            if(res.body == "3"){
              //收藏成功
              that.$set(that.item[index],'change_link','/img/favorites.png');
              that.n = true;
            }
          },function (res) {
            console.log(status);
          })
        }
      },

      click_fabulous:function (id,index) { //点击点赞
        var that = this;
        //并把这篇文章的_id传入
        var this_id = id;
        if(that.d == true){
          var newNum_01 = that.item[index].votes;
          this.$http.post('/dofabulous',{id:this_id,time:new Date(),del_add:that.d}).then(function(res){
            if(res.body == "0"){
              //收藏成功
              that.$set(that.item[index],'dianzan_link','/img/good_clickd.png')
              //点点赞成功的时候把下面的数字也加上1
              that.$set(that.item[index],'votes',newNum_01 + 1);
              that.d = false;
            }
            if(res.body == "-2"){
              //跳转登录
              window.location.href= '#/signin'
            }
          },function (res) {
            console.log(status);
          })
        }else {
          var newNum_02 = that.item[index].votes;
          this.$http.post('/dofabulous',{id:this_id,time:new Date(),del_add:that.d}).then(function(res){
            if(res.body == "3"){
              //点赞成功
              that.$set(that.item[index],'dianzan_link','/img/good.png');
              //点点赞成功的时候把下面的数字也减去 1
              that.$set(that.item[index],'votes',newNum_02 - 1);
              that.d = true;
            }
          },function (res) {
            console.log(status);
          })
        }
      },

      //点击下一页，并把页码传给后台
      nextPage:function () {
        //当前页面加1
        var uppage = this.now_page.page +1;
        this.$set(this.now_page,'page',uppage);
        if(this.now_page.page >= this.page_num){
          this.now_page.page = this.page_num
          this.isnextclick = true
          this.isupclick = false
        }
        this.$http.post('/doreadtext',{page:this.now_page.page,sort:"time_data"},{emulateJSON:true}).then(function(res){ //收藏
          //请求成功
          var that = this;
          that.item = res.body.data;
          that.item.forEach(function (re) {
            if(re.isshoucang == 0){
              that.$set(re,'change_link','/img/favorites.png');
            }else if(re.isshoucang == 1){
              that.$set(re,'change_link','/img/favorites_click.png');
              that.n = false;
            }
            if(re.isdianzan == 0){
              that.$set(re,'dianzan_link','/img/good.png');
            }else if(re.isdianzan == 1){
              that.$set(re,'dianzan_link','/img/good_clickd.png');
              that.d = false;
            }
          })
          for(var i=0;i<res.body.data.length;i++){
            if(res.body.data[i].target != ""){
              that.img_isshow = true
            }else{
              that.img_isshow = false
            }
          }
        },function(res){
          console.log(res.status);
        });
      },

      //点击上一页，并把页码传给后台
      upPage:function () {
        var uppage = this.now_page.page - 1;
        this.$set(this.now_page,'page',uppage);
        if(this.now_page.page <= 1){
          this.now_page.page = 1;
          this.isnextclick = false;
          this.isupclick = true;
        }
        this.$http.post('/doreadtext',{page:this.now_page.page,sort:"time_data"},{emulateJSON:true}).then(function(res){ //收藏
          //请求成功
          var that = this;
          that.item = res.body.data;
          that.item.forEach(function (re) {
            if(re.isshoucang == 0){
              that.$set(re,'change_link','/img/favorites.png');
            }else if(re.isshoucang == 1){
              that.$set(re,'change_link','/img/favorites_click.png');
              that.n = false;
            }
            if(re.isdianzan == 0){
              that.$set(re,'dianzan_link','/img/good.png');
            }else if(re.isdianzan == 1){
              that.$set(re,'dianzan_link','/img/good_clickd.png');
              that.d = false;
            }
          })
          for(var i=0;i<res.body.data.length;i++){
            if(res.body.data[i].target != ""){
              that.img_isshow = true
            }else{
              that.img_isshow = false
            }
          }
        },function(res){
          console.log(res.status);
        });
      },

      //点击阅读全文的的时候获取文章id进行跳转
      readtext:function (id,index) {
        var this_id = id;
        //直接带id跳转
        window.location.href = '#/gettext?id='+this_id;
      }

    },
    components:{
      HeaderTop,
      right
    }
  }
</script>
