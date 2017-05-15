<template>
    <div class="indexComp">
        <div id="header">
            <h2>{{text}}</h2>
            <div v-show="login_msg.isShow_button">
                <a @click="register">注册</a>
                <a  @click="sigin">登录</a>
            </div>
            <div id="welcome_msg" v-show="login_msg.isShow_msg">
                <span id="touxiang"><img :src="touxiang_img"></span>
                <span>欢迎～{{login_msg.username}}</span>
            </div>
            <div v-show="login_msg.isShow_msg" @click="login_out" class="login_out" id="ddd1">退出登录</div>
            <div v-show="login_msg.isShow_msg" class="login_out" id="ddd2" @click="setup">设置</div>
        </div>
        <div class="abb">
        <div class="bba">
        <nav style="border:none;margin:0;" class="navbar navbar-default">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div style="border:none;margin:0;padding: 0;text-align: center;" class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul id="ul01"  class="nav navbar-nav">
                        <li v-for="(item,$index) in tapbar.data" :class="{active : item.isactive}"><a :href="item.a"  :target = "item.target"> {{item.text}} <span class="sr-only">(current)</span></a></li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        </div>
        </div>
    </div>
</template>
<script>
    module.exports ={
        data() {
            return{
                text:"为WEB艺术家创造无限的可能",
                login_msg:{
                    isShow_msg:false,
                    isShow_button:false,
                    username:"",
                },
                write:{
                    link:""
                },
                tapbar:{
                    data:[
                        {text:'热点' , a:'/' ,isactive:true,target:""},
                        {text:'最新' , a:'#/news' ,isactive:false,target:""},
                        {text:'探知社区' , a:'#/ascertain' ,isactive:false,target:"_blank"},
                        {text:'问答社区' , a:'/' ,isactive:false,target:""},
                        {text:'我的收藏' , a:'/' ,isactive:false,target:""},
                        {text:'写博客' , a:'/myedit' ,isactive:false,target:"_blank"},
                        {text:'我的' , a:'/' ,isactive:false,target:""}
                      ]
                },
                touxiang_img:""
            }
        },
        mounted:function () {
            this.$http.post('/doindex',{},{emulateJSON:true}).then(function(res){
                //请求成功
                var that = this;
                if(res.body.data.login == true){
                    that.login_msg.username = res.body.data.username;
                    that.login_msg.isShow_msg = true;
                    that.write.link = '/myedit'
                }else{
                    that.login_msg.isShow_button = true;
                    that.write.link = '#/signin'
                }
                //设置头像
                that.touxiang_img = res.body.img;
            },function(res){
                console.log(res.status);
            });
            //根据url来确定哪一个标签是active
            var url = (document.URL).split("#")[1];
            var that = this;
            that.tapbar.data.forEach(function (item) {
              that.$set(item,'isactive',false);
            })
            if(url == "/"){
              that.$set(that.tapbar.data[0],'isactive',true);
            }else if(url == "/news"){
              that.$set(that.tapbar.data[1],'isactive',true);
            }else if(url == "/ascertain"){
              that.$set(that.tapbar.data[2],'isactive',true);
            }
        },
        methods:{
          sigin:function () {
            var url = (document.URL).split("#/")[1] ;
//            if(url == ""){
//                url = "/"
//            }
            window.location.href = '#/signin?id='+url;
          },
          register:function () {
            var url = (document.URL).split("#/")[1] ;
//            if(url == ""){
//                url = "/"
//            }
            window.location.href = '#/register?id='+url;
          },
          //点击退出登录的时候登录退出
          login_out:function () {
            this.$http.post('/dosigninout',{},{emulateJSON:true}).then(function(res){
                var that = this;
                if(res.body == "1"){
//                    that.$set(that.login_msg,"isShow_msg",false);
//                    that.$set(that.login_msg,"isShow_button",true);
                  window.location.reload();
                }
            })
          },
          //点击设置的时候进行信息设置
          setup:function () {
              window.location.href = "#/setup"
          }
        }
    }
</script>
<style>
    .abb{
        background: #f8f8f8;
        width:100%;
    }
    .bba{
        width:70%;
        margin: 0 auto;
    }
    #ul01{
        width:100%;
    }
    #ul01 .active{
      border-bottom: 2px solid #f3726d;
    }
    #ul01 li{
        width:14.28%;
        text-align: center;
        border-right: 1px solid #ececec;
    }
    #welcome_msg{
        color:#fff;
        font-size:18px;
    }
    @media screen and (max-width: 450px) {
        .bba{
            width:100%;
        }
        #ul01{
            width:100%;
            margin:0;
        }
    }
    #header{
        display: inline-block;
        width:100%;
        height: 150px;
        line-height: 100px;
        text-align: center;
        background:url('/img/top.jpg') 0 0 no-repeat ;
        position: relative;
        /*margin-top: 30px;*/
    }
    #header h2{
        color:#fff;
    }
    #header a{
        color:#fff;
        padding: 5px 30px;
        border:1px solid #fff;
        border-radius: 10px;
        text-decoration: none;
        margin-left: 10px;
        cursor: pointer;
    }
    #ddd1{
      margin-right: 20px;right:100px;
    }
    #ddd2{
      width:60px;
    }
    @media screen and (max-width: 450px) {
        #header h2{
            font-size:18px;
            margin-top:30px;
        }
        #ul01 li{
            width:100%;
        }
        #welcome_msg span{
          font-size: 15px;
        }
        #welcome_msg{
          margin-top: -24px;
        }
        #ddd1{
            right:180px;
        }
        #ddd2{
          right:130px;
        }
        #header .login_out{
          top:120px;
          height: 20px;
          line-height: 19px;
          font-size: 10px;
        }
    }
  #touxiang{
    display: inline-block;
    height:40px;
    width: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-right: 10px;
    overflow: hidden;
    position: relative;
    top: 12px;
  }
    #touxiang img{
      width: 100%;
    }
  .login_out{
    position: absolute;
    right:30px;
    top:22px;
    color:#fff;
    border:1px solid #fff;
    height:30px;
    width: 80px;
    border-radius: 5px;
    line-height: 30px;
    font-size: 12px;
    cursor: pointer;
  }
    .login_out:hover{
      background: #2c3e50;
      border:1px solid  #2c3e50;
    }
</style>
