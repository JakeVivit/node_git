<template>
  <div id="register">
    <header-top></header-top>
    <div class="register">
      <form id="inputval"  method="post" action="/dosetup"  enctype="multipart/form-data">
        <div class="form-group">
          <label for="nickname">设置昵称：</label>
          <input type="text"   v-model="user.nickname" class="form-control" name="nickname" id="nickname" placeholder="昵称(最多10个字符)" style="width:60%;"  maxlength="10">
        </div>
        <div class="form-group">
          <label for="year" style="display: block;">出生日期：</label>
          <!--<input type="text"  v-model="user.year" class="form-control" name="year" id="year" placeholder="年份" style="width:28%;display: inline-block;">-->
          <select v-model="user.year" class="form-control" name="year" id="year" placeholder="年份" style="width:25%;display: inline-block;">
            <option  v-for="year in years">{{ year }}</option>
          </select>
          <span>年</span>

          <select v-model="user.mouth" class="form-control" name="mouth"  placeholder="月份" style="width:25%;margin-left: 2%;display: inline-block;">
            <option v-for="mouth in mouths ">{{ mouth }}</option>
          </select>
          <span>月</span>

          <select v-model="user.day" class="form-control" name="day"  placeholder="几号" style="width:25%;margin-left: 2%;display: inline-block;">
            <option v-for="day in days">{{ day }}</option>>
          </select>
          <span>日</span>
          <!--<input type="text"  v-model="user.mouth" class="form-control" name="mouth"  placeholder="月份" style="width:28%;margin-left: 2%;display: inline-block;">-->
          <!--<input type="text"  v-model="user.day" class="form-control" name="day"  placeholder="几号" style="width:28%;margin-left: 2%;display: inline-block;">-->
        </div>
        <div class="form-group">
          <label for="year">职业：</label>
          <input type="text"  v-model="user.occupation" class="form-control" name="occupation"  placeholder="职业(最大不能超过20个字符)" maxlength="20">
        </div>
        <div class="form-group">
          <label for="target">设置签名：</label>
          <input type="text"  v-model="user.target" class="form-control" name="target" id="target"  placeholder="签名(最大不能超过100个字符)" maxlength="80">
        </div>
        <div class="form-group">
          <label for="img">设置头像：</label>
          <!--<div style="width:80px;height: 80px;overflow: hidden;border: 1px solid #ddd;margin-bottom: 20px;">-->
            <!--<img :src="user.file" style="width: 100%;">-->
          <!--</div>-->
          <input type="file" @change = "setImg"  v-model="user.img" class="form-control" id="img" name="img" style="border:none;box-shadow:none;">
        </div>
        <button type="submit" class="btn btn-scuess" style="background:#f3726d;color:#fff;">提交</button>
      </form>
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
          nickname:"" ,
          year:2017,
          mouth:'01',
          day:'01',
          occupation:"",
          autograph:"",
        },
//        img:{
//          file:"", //展示前台的img
//        },
//        imgFile:"",  //传给后台的img
        years:[1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1088,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017],
        mouths:['01','02','03','04','05','06','07','08','09','10','11','12'],
        days:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
      }
    },
    mounted:function(){
      //请求数据显示作者头像
      this.$http.post('/dosetup',{s:"img"},{emulateJSON:true}).then(function(res){
          var file = res.body.img;
//          this.$set(this.img,'file',file);
          var data = res.body.img;
          if(data.length != 0){
              this.user = res.body.data
          }
      })
    },

    methods:{
//      submit:function () {
//          //把所有的都提交
//         var formData = JSON.stringify(this.user);
//          this.$http.post('/dosetup',{s:"up",data:formData},{emulateJSON:true}).then(function(res){
//            if(res.body == "1"){
//                //上传成功
//            }
//          })
//      },

      setImg:function (e) {
//        this.$http.post('/dosetup',{},{emulateJSON:true}).then(function(res){
//              //图片上传成功
//              console.log(res.body);
//              this.$set(this.user,'file',res.body.img);
//          })
        let file = e.target.files[0];
        let supportedType = ['image/jpg','image/jpeg','image/png'];
        if(file && supportedType.indexOf(file.type)){
//          let nowFile;
//          var reader = new FileReader();
//          reader.readAsDataURL(file);
//          if (window.createObjectURL != undefined) {
//            nowFile = window.createObjectURL(file)
//          } else if (window.URL != undefined) {
//            nowFile = window.URL.createObjectURL(file)
//          } else if (window.webkitURL != undefined) {
//            nowFile = window.webkitURL.createObjectURL(file)
//          }
//          this.$set(this.user,'file',file);
        }else{
          alert('文件格式只支持：jpg、jpeg 和 png');
          this.clearFile();
        }
      },
      //提交按钮
      clearFile () {
        this.user.$file.value = '';
        this.user.file = null;
      },
    },
    components:{HeaderTop}
  }
</script>
