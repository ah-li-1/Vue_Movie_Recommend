<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="toRegistration()">去注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        inject:["reload"],
        data() {
            const checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }else {
                    let reg = /^[A-Za-z]+$/;
                    if (!reg.test(value)) {
                        callback(new Error("用户名只能使用英文"));
                    }else{
                        callback();
                    }
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === ''|| value === undefined) {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            return {
                ruleForm: {
                    name: this.$route.params.name,
                    password: this.$route.params.password
                },
                rules:{
                    name: [
                        { validator: checkName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8181/user/login', this.ruleForm).then(function (resp) {
                            console.log(resp.data);
                            if (resp.data === 'success') {
                                // alert('add success');
                                _this.$message({
                                    message: '登陆成功',
                                    type: 'success'
                                });
                                sessionStorage.setItem('user', _this.ruleForm.name);
                                console.log("写入",sessionStorage.getItem('user'));
                                _this.$router.push('/movie');
                                // window.location.reload();
                                _this.reload();
                            }else {
                                _this.$message({
                                    message: "登陆失败请检查用户名或密码",
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
            },
            toRegistration(){
                this.$router.push('/Registration');
            }
        }
    }
</script>

<style scoped>

</style>