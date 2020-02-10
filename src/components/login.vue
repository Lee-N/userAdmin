<template>
    <div id="login">
        <h3>用户管理系统</h3>
        <el-form ref="form" :rules="rules" :model="form">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="请输密码"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <div id="input3"><el-input v-model="form.code" placeholder="验证码" ></el-input></div>
                <i-code ref="codes" class="code"></i-code>
            </el-row>
          </el-form-item>
            <el-button @click="check()" type="primary">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    import icode from './icode'
    export default {
        data(){
            return{
                form:{
                  username:'',
                  password:'',
                  code:''
                },
                rules:{
                  username:[
                    {required:true,message:'请输入用户名',trigger:'blur'}
                  ],
                  password:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                  ],
                  code:[
                    {required:true,message:'请输入验证码',trigger:'blur'}
                  ]
                }
            }
        },
        name: "login",
        components:{
            'i-code':icode
        },
        methods:{
            check(){
                if(this.form.code==this.$refs.codes.identifyCode){
                  //var url="http://127.0.0.1:8888/userAdmin/MainServlet?method=login&username="+this.form.username+"&password="+this.form.password+"";
                    var url="http://127.0.0.1:8888/userAdminsp/MainAction?method=login&username="+this.form.username+"&password="+this.form.password+"";
                  console.log(url)
                  this.$http.get(url).then((respone)=>{
                    if(respone.body=="false"){
                      alert("用户名或密码错误")
                    }
                    else {
                       this.$router.push({name:'admin',params:{username:this.form.username}})
                    }
                  })
                }
                else{
                  alert("验证码输入错误")
                }
            }
        }
    }
</script>

<style lang="less" scoped>
#login{
   width: 30%;
    margin: 0 auto;
    h3{
       position: relative;
        left: 15%;
    }
.el-input{
  margin-bottom: 10px;
  width: 60%;
  }
  #input3{
    width: 45%;
    position: relative;
    display: inline-block;
  }
  .el-row{
    position: relative;
    top: -10px;
  }
  .code{
    position: relative;
    top:15px;
    right: 45px;
    line-height: 40px;
  }
  .el-button{
    position: relative;
    width:60%
  }
}
</style>
