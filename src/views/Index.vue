<template>
    <el-container style="border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-active="$route.path" router router :default-openeds="['0', '1']">
                <el-submenu v-for="(item, index) in $router.options.routes" :index="index + ''" >
                    <template slot="title"><i class="el-icon-setting">{{item.name}}</i></template>
                    <el-menu-item v-for="(item2, index2) in item.children" :index="item2.path"
                                  :class="$route.path==item2.path?'is-active':''"v-if="item2.show">{{item2.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看信息</el-dropdown-item>
                        <el-dropdown-item @click.native="delect">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{username}}</span>
            </el-header>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        inject:["reload"],
        data(){
            return{
                username: sessionStorage.getItem('user')
            }
        },
        methods:{
            delect() {
                //alert("123");
                this.username = sessionStorage.removeItem('user');
                this.reload();
                //window.location.reload();
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>