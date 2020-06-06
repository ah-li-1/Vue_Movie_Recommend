<template>
    <div>
        <div id="searchData">
                <el-form :inline="true">
                    <el-form-item label="">
                        <el-input v-model="param.name"  placeholder="片名/导演/演员/类型"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <div style="text-align:right">
                            <el-button type="primary" @click="searchHandler">查询</el-button>
                        </div>
                    </el-form-item>
                </el-form>

        </div>
        <div id="dataShow">
            <div class="in-movies-show-child">
                <el-table :data="movies">
                    <el-table-column><img src="../assets/p480747492.jpg" height="200"></el-table-column>
                    <el-table-column prop="title" label="" id="title"></el-table-column>
                    <el-table-column prop="star" label=""/>
                    <el-table-column prop="director" label=""/>
                    <el-table-column prop="actor" label=""/>
                </el-table>
<!--                <br>-->

<!--                <div class="movieMsg">-->
<!--                    <div class="posters"><img src="../assets/p480747492.jpg" height="200"></div>-->
<!--                    <h2>肖申克的救赎</h2>-->
<!--                    <star :score="9.5"></star>-->
<!--                    <p>9.7分</p>-->
<!--                    <p>导演:导演</p>-->
<!--                    <p>主演:主演</p>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import star from '../star/star'
    export default {
        data(){
            return{
                name:'分类管理',
                movies:[],
                centerDialogVisible: false ,
                form:{},
                sels:[],
                param:{          //定义参数
                    name:'',
                    page:0,
                    pageSize:5
                }
            }
        },
        methods:{
            searchHandler(){
                this.loadCategories();
            },
            async loadCategories(){
                // let response=await axios.post('http://localhost:8181/movie/findAllByKey',this.param.name);
                const _this = this;
                axios.get('http://localhost:8181/movie/findAllByKey/'+ this.param.name).then(function (resp) {

                    if (resp.data.length != 0) {
                        console.log(resp.data)
                        _this.movies = resp.data;

                    }else {
                        console.log("没有搜索到结果哦")
                    }
                })

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
    #title {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 10px;
        color: #bd33fa
    }
</style>