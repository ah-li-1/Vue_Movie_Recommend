<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="toLogin">已有账号</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            const checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }else {
                    let reg = /^[A-Za-z]+$/;
                    if (!reg.test(value)) {
                        callback(new Error("用户名只能使用英文"));
                    }else{
                        axios.post('http://localhost:8181/user/checkName', this.ruleForm).then(function (resp) {
                            if (resp.data === 'success') {
                                callback(new Error("用户名已存在"))
                            }else {
                                callback();
                            }
                        })
                    }
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    name: '',
                    password: '',
                    checkPass: '',
                },
                rules:{
                    name: [
                        { validator: checkName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            test() {
                console.log(this.ruleForm)
            },
            toLogin(){
                this.$router.push('/Login');
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    const _this = this;
                    if (valid) {
                        // console.log(this.ruleForm);
                        axios.post('http://localhost:8181/user/save', this.ruleForm).then(function (resp) {
                            if (resp.data == 'success') {
                                // alert('add success');
                                _this.$message("注册成功");
                                _this.$router.push({ name: '登陆', params:{name:_this.ruleForm.name, password:_this.ruleForm.password} });
                                console.log(_this.ruleForm.name, _this.ruleForm.password);
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
        }
    }
</script>

<style scoped>

</style>