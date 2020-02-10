<template>
    <div id="userAdmin">
        <div class="search">
            <el-form >
                <el-row>
                    <el-select  v-model="type">
                        <el-option v-for="item in items" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                    <el-input type="text" v-model="keyword"></el-input>
                    <el-button @click="sendRequest()" type="primary" plain>搜索</el-button>
                </el-row>
            </el-form>
        </div>
            <el-table  :data="list">
                <el-table-column prop="id" label="id" v-if="false"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="password" label="密码"></el-table-column>
                <el-table-column prop="type" label="身份"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="hobby" label="爱好"></el-table-column>
                <el-table-column prop="date" label="生日"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="introduction" label="自我介绍" ></el-table-column>
                <el-table-column label="操作" min-width="100" >
                    <template slot-scope="scope">
                    <el-button  @click="modifyUser(scope.row)" type="primary" size="small">修改</el-button>
                    <el-button  @click="deleteUser(scope.row.id)" type="primary" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[2,5,10]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
                    background>
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
         data(){
             return{
                 type:'',
                 items:[{value:'username',label:'用户名'},{value:'hobby',label:'爱好'},{value:'introduction',label:'自我介绍'}],
                 keyword:'',
                 list:[],
                 count:0,
                 limit:2,
                 curPage:1
             }
         },
        methods:{
             sendRequest(){
                 //var url="http://127.0.0.1:8888/userAdmin/MainServlet?method=search&type="+this.type+"&keyword="+this.keyword+"&limit="+this.limit+"&page="+this.curPage
                 var url="http://127.0.0.1:8888/userAdminsp/MainAction?method=search&type="+this.type+"&keyword="+this.keyword+"&limit="+this.limit+"&page="+this.curPage
                 console.log(url)
                 this.$http.get(url).then((respone)=>{
                     console.log(respone)
                     this.list=respone.body.data,
                         this.count=respone.body.count
                 })
             },
            handleCurrentChange(curPage){
                 this.curPage=curPage;
                 console.log(this.curPage)
                 this.sendRequest();
            },
            handleSizeChange(val) {
                this.limit=val;
                this.sendRequest();
            },
            modifyUser(row){
               this.$router.push({path:'/admin/updateUser',query:{row:row}})

            },
            deleteUser(id){
                 //var url="http://127.0.0.1:8888/userAdmin/MainServlet?method=delete&id="+id;
                var url="http://127.0.0.1:8888/userAdminsp/MainAction?method=delete&id="+id;
                 this.$http.get(url).then((respone)=>{
                     if(respone.body.msg=="successfully delete"){
                         if((this.curPage-1)*this.limit+1==this.count)
                             this.curPage=this.curPage-1;
                         this.sendRequest()
                     }
                     else{
                         alert("删除失败")
                     }
                 })
            }
        }
    }
</script>

<style lang="less" scoped>
#admin{
    width: 100%;
    margin: 0 auto;
  .el-input{
    width: 30%;
  }
}
</style>
