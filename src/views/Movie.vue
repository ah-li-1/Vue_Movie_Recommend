<template>
    <div >
        <el-table :data="movies">
            <el-table-column prop="title" label="片名"/>
            <el-table-column prop="year" label="年份" width="60"/>
            <el-table-column prop="type" label="类型"/>
            <el-table-column prop="director" label="导演"/>
            <el-table-column prop="actor" label="演员"/>
            <el-table-column  label="评分" >
                <star :score="movies.star" ></star>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteItem(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import star from '../star/star'
    export default {
        name: "Movie",
        methods:{
            edit(row){
                // row.id
                this.$router.push({
                    path: '/UpdateMovie',
                    query:{
                        id: row.id
                    }
                });
            },
            deleteItem(row){
                // row.id
                const _this = this;
                axios.delete('http://localhost:8181/movie/delete/'+row.id).then(function (resp) {
                    _this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    // _this.$router.push('/movie');
                    window.location.reload();
                })
            }
        },
        data(){
            return{
                movies:[],
                value: ''
            }
        },
        created() {
            const  _this = this;
            axios.get('http://localhost:8181/movie/findAll/').then(function (resp) {
                _this.movies = resp.data;
                // console.log(resp.data[4].star);
            })
        },
        components: {
            star: star
        },
    }
</script>

<style scoped>

</style>