<template>
    <div id="register">
        <header-top></header-top>
        <div class="register">
            <form id="inputval" @submit.prevent="submit">
                <div class="form-group">
                    <label for="exampleInputEmail1">账号：</label>
                    <input type="text"  @blur = "set('username')" v-model="user.username" class="form-control" name="username" id="exampleInputEmail1" placeholder="账号">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">密码：</label>
                    <input type="password"  @blur = "set('password')" v-model="user.password" class="form-control" name="password" id="exampleInputPassword1" placeholder="密码">
                </div>
                <div class="form-group">
                    <label for="doubleExampleInputPassword1">重复密码：</label>
                    <input type="password"  @blur = "set('password')"  v-model="user.againpassword" class="form-control" name="password" id="doubleExampleInputPassword1" placeholder="重复密码">
                </div>
                <div class="form-group">
                    性別：
                    <label>
                        <input  type="radio" value="男" v-model="user.sex"> 男
                    </label>
                    <label>
                        <input  type="radio" value="女" v-model="user.sex"> 女
                    </label>
                </div>
                <div class="checkbox">
                    <label><input  v-model="user.agree" type="checkbox"> 我同意相关的法律条款 </label>
                </div>
                <button type="submit" class="btn btn-scuess">注册</button>
            </form>
            <transition name="fade" mode="out-in" appear>
                <div id="register_msg" class="alert alert-danger" role="alert" v-show="msg_tishi.local"  v-text="msg_tishi.msg_data"></div>
            </transition>
        </div>
    </div>
</template>
<script>
    import HeaderTop from '../components/header.vue'
    export default{
        name:'register',
        e1:'#inputval',
        data() {
            return {
                user:{
                    username:'',
                    password:'',
                    againpassword:'',
                    sex:'',
                    agree:''
                },
                msg_tishi:{
                    msg_data:'',
                    local:false
                }
            }
        },
//        //钩子事件先挂载
//        mounted:function () {
//            this.set();
//        },
        methods:{
            submit:function () {
                const that = this;
                if(that.user.password != that.user.againpassword){
                    that.msg_tishi.msg_data = '两次输入的密码必须一致！'
                    that.msg_tishi.local = true
                }else {
                    if(that.user.username && that.user.password && that.user.sex && that.user.againpassword && that.user.agree && (that.user.password == that.user.againpassword)){
                        var formData = JSON.stringify(this.user); // 这里才是你的表单数据
                        this.$http.post('/doregister',formData).then((res) => {
                            //成功的时候
                            if(res.body == "1"){
                                //注册成功准备跳转
                                that.msg_tishi.local = false;
                                alert("注册成功");
                                window.location.href = "/";
                            }
                            if(res.body == "-1"){
                                //该用户存在
                                that.msg_tishi.msg_data = 'sorry,该用户已经存在，请更换用户名！'
                                that.msg_tishi.local = true
                            }
                            if(res.body == "0"){
                                //该用户存在
                                that.msg_tishi.msg_data = 'sorry,服务器无响应，请重试！'
                                that.msg_tishi.local = true
                            }
                        },(res) => {
                            //失败的时候
                        })
                    }else{
                        that.msg_tishi.msg_data = '请完善注册项！'
                        that.msg_tishi.local = true
                    }
                }
            },
            //input失去表单验证
            set:function (e) {
              var that = this;
              if(e == 'password'){
                  var reg = /^.{6,}$/; //验证密码是不是大于六位数
                  var psd = that.user.password;
                  if(!(reg.test(psd))){
                      that.msg_tishi.msg_data = '密码必须大于六位数！！'
                      that.msg_tishi.local = true
                  }else{
                      that.msg_tishi.local = false;
                  }
              }
            }
        },
        components:{HeaderTop}
    }
</script>
