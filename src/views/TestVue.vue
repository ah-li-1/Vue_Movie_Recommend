<template>
    <div>
        <el-button type="primary" icon="el-icon-edit" @click="showTime()">写评论</el-button>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xxx"></use>
        </svg>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    name: ''
                },
                formLabelWidth: '120px',
                time:''
            };
        },
        methods:{
            //重置dialog内的输入内容与关闭dialog
            resetForm(){
                this.form = {};
            },
            //点击创建dialog
            handleCreate(){
                this.resetForm();
                this.dialogFormVisible = true;
            },
            closeDialogFunction(){
                //点击dialog以外的地方触发
                this.dialogFormVisible = false;
                this.resetForm();
            },
            submitComment(){
                console.log(this.form.name);
                this.resetForm();
                this.dialogFormVisible = false;
            },
            showTime(){
                var myDate = new Date();

                myDate.getFullYear();       //获取当前年份(2位)

                myDate.getFullYear();    //获取完整的年份(4位,1970-????)

                myDate.getMonth();       //获取当前月份(0-11,0代表1月)

                myDate.getDate();        //获取当前日(1-31)

                myDate.getDay();         //获取当前星期X(0-6,0代表星期天)

                myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)

                myDate.getHours();       //获取当前小时数(0-23)

                myDate.getMinutes();     //获取当前分钟数(0-59)

                myDate.getSeconds();     //获取当前秒数(0-59)

                myDate.getMilliseconds();    //获取当前毫秒数(0-999)

                myDate.toLocaleDateString();     //获取当前日期

                var mytime=myDate.toLocaleTimeString();     //获取当前时间

                myDate.toLocaleString( );        //获取日期与时间
                alert(myDate.getFullYear()+'-'+myDate.getMonth()+'-'+myDate.getDate());
            }
        }
    };
</script>

<style scoped>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>