<template xmlns="http://www.w3.org/1999/html">
    <div>
        <div id="content-pane">
            <div id="dataShow">
                <div class="in-movies-show-child">
                    <div class="posters"><img src="../assets/p480747492.jpg" height="238"></div>
                    <div class="movieMsg" >
                        <h1>
                            <span id="title">{{movieItem.title}}</span>
                        </h1>
                        <star :score="movieItem.star"></star>
                        <p>{{'评分：'+movieItem.star}}</p>
                        <p>{{'类型：'+movieItem.type}}</p>
                        <p>{{'导演：'+movieItem.director}}</p>
                        <p>{{'演员：'+movieItem.actor}}</p>
                    </div>
                </div>
            </div>

            <div id="comment">
                <div>
                    <p style="border: 1px solid #B3C0D1">
                        <span style="width: 300px; float: left;">{{movieItem.title+'的评论(共111条)'}}</span>
                        <el-button type="primary" icon="el-icon-edit" @click="handleCreate()">写评论</el-button>
                    </p>
                </div>
                <div id="comment-item"
                     style="max-height: 100px;border-bottom: #B3C0D1 1px solid;border-top: #B3C0D1 1px solid"
                     v-for="item in comment">
                    <h3>
                        <span class="comment-vote">
                            <span class="votes">{{item.likes}}</span>
                            <a href="javascript:void(0)" class="el-icon-thumb" onclick="" style="font-size: 30px"></a>
                            </span>
                        <span class="comment-info">
                                <a href="javascript:void(0)" class="">{{item.username}}</a>
                                <span class="comment-time ">
                                {{item.date}}
                            </span>
                        </span>
                    </h3>
                    <p id="user-comment">{{item.text}}</p>
                </div>
                <el-dialog title="说说你对此片的看法吧"
                           :visible.sync="dialogFormVisible"
                           :before-close="closeDialogFunction">
                    <el-form :model="form">
                        <el-form-item label="内容" :label-width="formLabelWidth">
                            <el-input v-model="form.text" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitComment()">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import star from '../star/star'

    export default {
        name: "Details",
        inject:["reload"],
        data() {
            return {
                movieItem:[],
                comment: [],
                dialogFormVisible: false,
                loading: false,
                form: {
                    text: '',
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '80px',
                timer: null,
            }
        },
        components: {
            star: star
        },
        mounted() {
            // 调用请求数据的方法

        },
        created() {

            axios.get('http://localhost:8181/movie/findById/'+sessionStorage.getItem("mId"))
                .then(res => {
                    this.movieItem = res.data;
                    //console.log('数据是:', res);
                    //this.comment = res.data;
                })
                .catch((e) => {
                    console.log('获取数据失败');
                });

            axios.get('http://localhost:8181/comment/finAllByMid/'+sessionStorage.getItem("mId"))
                .then(res => {
                    //console.log('数据是:', res);
                    this.comment = res.data;
                })
                .catch((e) => {
                    console.log('获取数据失败');
                });
        },
        methods: {
            //重置dialog内的输入内容与关闭dialog
            resetForm() {
                this.form = {};
            },
            getDate(){
                var d = new Date();
                return (d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate())
            },
            //点击创建dialog
            handleCreate() {
                this.resetForm();
                this.dialogFormVisible = true;
            },
            closeDialogFunction() {
                //点击dialog以外的地方触发
                this.dialogFormVisible = false;
                this.resetForm();
            },
            submitComment() {
                //console.log(this.form.text);
                if(this.form.text !== undefined){
                    // 判断是否已经登陆，未登录令其跳转至登陆界面
                    if (sessionStorage.getItem('user') !== null) {
                        axios.post('http://localhost:8181/comment/save/', {
                            text: this.form.text,
                            username: sessionStorage.getItem('user'),
                            date: this.getDate(),
                            mid:sessionStorage.getItem("mId")
                        })
                            .then(res => {
                                //console.log('数据是:', res.data);
                                if (res.data === 1) {
                                    this.$message({
                                        showClose: true,
                                        message: '评论成功',
                                        type: 'success'
                                    });
                                    this.reload();
                                }
                                // this.comment = res.data;
                            })
                            .catch((e) => {
                                console.log('获取数据失败');
                            });
                    } else {
                        this.$router.push("Login");
                    }
                }else{
                    this.$message.error('请输入内容哦');
                }
                this.resetForm();
                this.dialogFormVisible = false;
            }
        }
    }
</script>

<style scoped>
    #title {
        font: 12px Helvetica, Arial, sans-serif;
        font-weight: bold;
        color: #494949;
        line-height: 1.1;
        font-size: 26px;
    }

    #year {
        font: 12px Helvetica, Arial, sans-serif;
        font-weight: bold;
        line-height: 1.1;
        font-size: 26px;
        display: inline-block;
        zoom: 1;
        color: #888;
    }

    #info-panel span {
        word-break: normal;
        width: auto;
        display: block;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow: hidden;
        margin: 10px;
    }

    #mainPic {
        font: 12px Helvetica, Arial, sans-serif;
        line-height: 1.62;
        font-size: 13px;
        word-break: normal;
        text-align: center;
        vertical-align: middle;
        max-width: 135px;
        max-height: 200px;
        margin-bottom: 10px;
        float: left;
    }

    #info-panel {
        width: 333px;
        float: left;
    }

    .movieMsg {
        flex: 1;
        padding-left: 20px;
        vertical-align: top;

    }

    .posters {
        width: 170px;
        float: left;
    }

    #comment {
        margin-top: 50px;
    }

    h3 {
        word-break: break-word;
        font: 14px Arial, Helvetica, sans-serif;
        line-height: 1.7em;
        background: none;
        font-size: 13px;
        height: auto;
        margin: 0;
        padding: 0;
        color: #494949;
        margin-bottom: 5px;
    }

    .comment-vote {
        word-break: break-word;
        font: 14px Arial, Helvetica, sans-serif;
        line-height: 1.7em;
        font-size: 13px;
        color: #494949;
        float: right;
    }

    #user-comment {
        font: 12px Helvetica, Arial, sans-serif;
        word-break: break-word;
        font-size: 13px;
        line-height: 1.5;
        color: #494949;
        margin: 0;
    }
</style>