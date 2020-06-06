<template>
    <el-form style="width: 60%" :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="title" prop="title">
            <el-input v-model="ruleForm.title" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="year" prop="year">
            <el-input v-model="ruleForm.year" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="type" prop="type">
            <el-input v-model="ruleForm.type" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="director" prop="director">
            <el-input v-model="ruleForm.director" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="actor" prop="actor">
            <el-input v-model="ruleForm.actor" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="pp" prop="pp">
            <el-input v-model="ruleForm.pp" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="star" prop="star">
            <el-input v-model="ruleForm.star" autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "UpdateMovie",
        data() {
            return {
                ruleForm: {
                    title: '',
                    year: '',
                    type: '',
                    director: '',
                    actor: '',
                    pp: '',
                    star: ''
                }
            };
        },
        methods: {
            test() {
                console.log(this.ruleForm)
            },
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put('http://localhost:8181/movie/update/',this.ruleForm).then(function (resp) {
                            if (resp.data == 'success') {
                                _this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                _this.$router.push('/Movie');
                            }else {
                                _this.$message({
                                message: "失败",
                                type: 'error'
                            });
                        }

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            const _this = this;
            axios.get('http://localhost:8181/movie/findById/'+_this.$route.query.id).then(function (resp) {
                _this.ruleForm = resp.data;
                // console.log(resp);
            })
        }
    }
</script>

<style scoped>

</style>