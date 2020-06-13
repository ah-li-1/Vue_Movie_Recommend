<template>
    <div>
        <div id="searchData">
            <el-form :inline="true">
                <el-form-item label="">
                    <el-input v-model="param.name" placeholder="片名/导演/演员/类型"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="text-align:right">
                        <el-button type="primary" @click="searchHandler">查询</el-button>
                    </div>
                </el-form-item>
            </el-form>

        </div>
        <div id="dataShow">
            <div class="in-movies-show-child" v-for="item in movies">
                <div class="posters"><img src="../assets/p480747492.jpg" height="238"></div>
                <div class="movieMsg">
                    <p><a href="javascript:void(0)" @click="toDetails(item.id,item.title,item.type,item.director,item.actor,item.star,item.year)">{{item.title}}</a></p>
                    <star :score="item.star"></star>
                    <p>{{'评分：'+item.star}}</p>
                    <p>{{'类型：'+item.type}}</p>
                    <p>{{'导演：'+item.director}}</p>
                    <p>{{'演员：'+item.actor}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import star from '../star/star'

    export default {
        data() {
            return {
                name: '分类管理',
                movies: [],
                centerDialogVisible: false,
                form: {},
                sels: [],
                param: {          //定义参数
                    name: '',
                    page: 0,
                    pageSize: 5
                }
            }
        },
        methods: {
            searchHandler() {
                this.loadCategories();
            },
            async loadCategories() {
                // let response=await axios.post('http://localhost:8181/movie/findAllByKey',this.param.name);
                const _this = this;
                axios.get('http://localhost:8181/movie/findAllByKey/' + this.param.name).then(function (resp) {

                    if (resp.data.length !== 0) {
                        console.log(resp.data);
                        _this.movies = resp.data;

                    } else {
                        console.log("没有搜索到结果哦");
                    }
                })

            },
            toDetails(id,title,type,director,actor,star,year){
                this.$router.push({ name: '详情', params:{id:id,title:title,type:type,director:director,actor:actor,star:star,year:year}});
                console.log("跳转");
            }
        },
        components: {
            star: star
        },

    }
</script>

<style scoped>
    body {
        margin: 0;
        padding: 0;
    }

    h1 {
        text-align: center;
    }

    .in-movies-wrap {
        text-decoration: none;
        font-size: 0;
        padding: 0 100px;
    }

    .in-movies-show {
        background-color: #000000;
        padding: 10px 20px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 0;
    }

    .in-movies-show-child {
        display: flex;
        align-items: flex-end;
        padding-bottom: 10px;
        border-bottom: 1px solid #d6d6d6;
    }

    .in-movies-show p {
        font-size: 14px;
        color: #666;
    }

    .movieMsg {
        flex: 1;
        padding-left: 20px;
        vertical-align: top;
    }

    h2 {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 10px;
        color: antiquewhite
    }
    p a{
        font-size: 16px;
        text-decoration:none;
        padding-bottom: 0px;
        padding-top: 0px;
    }
</style>