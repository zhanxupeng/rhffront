<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="userName">
            <Input type="text" v-model="formInline.userName" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    userName: '',
                    password: ''
                },
                ruleInline: {
                    userName: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                let that =this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    that.API.userLogin.login(that.formInline).then(res=>{

                        console.log(res);
                        if(res.code==='0'){
                            that.$router.push({path: '/hello'});
                        }

                    })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

