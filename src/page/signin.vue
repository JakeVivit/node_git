<template>
    <div id="register">
        <header-top></header-top>
        <div class="register">
            <form id="inputval" @submit.prevent="submit">
                <div class="form-group">
                    <label for="exampleInputEmail1">账号：</label>
                    <input type="text" v-model="user.username" class="form-control" name="username" id="exampleInputEmail1" placeholder="账号">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">密码：</label>
                    <input type="password"  v-model="user.password" class="form-control" name="password" id="exampleInputPassword1" placeholder="密码">
                </div>
                <button type="submit" class="btn btn-scuess">登陆</button>
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
        name:'#register',
        e1:'#inputval',
        data (){
            return {
                user : {
                    username:'',
                    password: ''
                },
                msg_tishi:{
                    msg_data:'',
                    local:false
                }
            }
        },
        methods:{
            submit:function () {
                const that = this;
                var formData = JSON.stringify(this.user); // 这里才是你的表单数据
                if (that.user.username != "" && that.user.username != ""){
                    this.$http.post('/dosignin',formData).then(function(res) {
                        //成功的时候
                        if(res.body == "0"){
                            //注册成功准备跳转
                            that.msg_tishi.local = false;
                            var id = this.$route.query.id;
                            window.location.href = "#/"+id;

                        }
                        if(res.body == "1"){
                            //密码错误
                            that.msg_tishi.msg_data = '密码输入有误，请重新输入！'
                            that.msg_tishi.local = true
                        }
                        if(res.body == "-2"){
                            //找不到该用户
                            that.msg_tishi.msg_data = '找不到该用户！'
                            that.msg_tishi.local = true
                        }
                        if(res.body == "-1"){
                            that.msg_tishi.msg_data = '服务器错误，请重新登陆！'
                            that.msg_tishi.local = true
                        }
                    },function(res){
                        //失败的时候
                    })
                }else{
                    that.msg_tishi.msg_data = '请完善登录项！'
                    that.msg_tishi.local = true
                }
            }
        },
        components:{HeaderTop}
    }
</script>
