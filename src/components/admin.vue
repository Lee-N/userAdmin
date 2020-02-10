<template>
    <div id="admin">
          <el-row>
            <el-col :span="4">
              <el-menu
                default-active="2"
                class="el-menu-vertical"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router>
                <div>
                  <img src="../img/head.jpg"  />
                  <p>{{this.$route.params.username}}</p>
                </div>
                <el-menu-item index="/admin/userAdmin">
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/addUser">
                  <i class="el-icon-circle-plus"></i>
                  <span slot="title">添加用户</span>
                </el-menu-item>
              </el-menu>
                <router-link class="logout" to="/login">logout</router-link>
            </el-col>
            <el-col :span="20">
                <keep-alive>
                    <router-view class="view" v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view class="view" v-if="!$route.meta.keepAlive"></router-view>
            </el-col>
          </el-row>
    </div>
</template>

<script>
    export default {
        name: "admin",
        data(){
            return{
                routes:[

                ]
            }
        },
      components:{

      },
      methods:{

      },
        activated(){
           alert(123)
        }
    }
</script>

<style lang="less" scoped>
#admin{
    .logout{
        text-decoration: none;
        color: white;
        position: relative;
        bottom: 25px;
        left: 170px;
    }
   .view{
       padding-left: 5%;
   }
  .el-menu{
    height: 600px;
    div{
      padding-top: 30px;
      position:relative;
      text-align: center;
      img{
        height:80px;
        width:80px
      }
      p{
        color: white;
      }
    }
  }
}
</style>
