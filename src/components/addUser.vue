<template>
    <div id="addUser">
        <el-form :rules="rules" :model="form" ref="form" inline-message>
            <el-form-item label="用户名" prop="username" class="username">
                  <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password"  class="password">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="type" label-width="63px">
                <el-select v-model="form.type">
                    <el-option value="管理员" label="管理员"></el-option>
                    <el-option value="用户" label="用户"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="sex" label-width="63px">
                <el-select v-model="form.sex">
                    <el-option value="男" label="男"></el-option>
                    <el-option value="女" label="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="爱好" prop="hobby"  label-width="63px">
                <el-checkbox-group v-model="form.hobby">
                    <el-checkbox label="阅读" name="阅读"></el-checkbox>
                    <el-checkbox label="跑步" name="跑步"></el-checkbox>
                    <el-checkbox label="电影" name="电影"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="生日" prop="date" label-width="63px">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
            </el-form-item>
            <el-form-item label="邮箱" prop="email"  class="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item prop="introduction" label="自我介绍" class="introduction">
                <el-input type="textarea" :autosize="{ minRows: 2}" v-model="form.introduction" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "add",
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    type: '',
                    sex: '',
                    hobby: [],
                    date: '',
                    email: '',
                    introduction: ''
                },

                rules: {
                    username: [
                        {required: true, message: '请输入用户名名称', trigger: 'blur'},

                    ],
                    password: [
                        {required: true, message: '请输入用户名名称', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'}
                    ],
                    hobby:[
                        {required:true,message:'至少选择一个爱好',trigger:'blur'}
                    ],
                    date:[
                        {required:true,message:'请选择生日',trigger:'blur'}
                    ],
                    email:[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    introduction:[
                        {required:true,message:'请输入自我介绍',trigger:'blur'}
                    ],


                }
            }
        },
        methods:{
            GMTToStr(time){
                let date = new Date(time)
                let Str=date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate()
                return Str
            },
            add(){
                // var url="http://127.0.0.1:8888/userAdmin/MainServlet?method=add&username="+this.form.username+"&password="+this.form.password+
                //         "&type="+this.form.type+"&sex="+this.form.sex+"&hobby="+this.form.hobby+"&date="+this.GMTToStr(this.form.date)+"&email="+this.form.email
                //     +"&introduction="+this.form.introduction
                var url="http://127.0.0.1:8888/userAdminsp/MainAction?method=add&username="+this.form.username+"&password="+this.form.password+
                    "&type="+this.form.type+"&sex="+this.form.sex+"&hobby="+this.form.hobby+"&date="+this.GMTToStr(this.form.date)+"&email="+this.form.email
                    +"&introduction="+this.form.introduction
                this.$http.get(url).then((respone)=>{
                    console.log(respone.msg)
                    if(respone.body.msg=="successfully add"){
                        alert("添加成功")
                    }
                    else{
                        alert("添加失败")
                    }
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.add();
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less" >
#addUser{
    .el-form-item__label{
        text-align: left;
    }
    .username,.password,.email{
        .el-input{
            width: 25%;
        }
    }
    .introduction{
        .el-textarea{
            width: 30%;
        }
    }
    .password,.email{
        .el-form-item__label
        {
            padding-right: 25px;
        }
    }

}
</style>