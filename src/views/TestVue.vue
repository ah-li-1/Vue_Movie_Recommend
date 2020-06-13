<template>
    <div>
        <el-button type="text" @click="handleCreate()">打开嵌套表单的 Dialog</el-button>
        <el-dialog title="说说你对此片的看法吧"
                   :visible.sync="dialogFormVisible"
                   :before-close="closeDialogFunction">
            <el-form :model="form">
                <el-form-item label="内容" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitComment()">确 定</el-button>
            </div>
        </el-dialog>
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
                formLabelWidth: '120px'
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
            }
        }
    };
</script>