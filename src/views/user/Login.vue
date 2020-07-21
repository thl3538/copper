<template>
  <!-- 登录页面 -->
  <div class="login">
    <template>
      <div :style="{ display: 'block', padding: '20px', height: '100%', width: '100%' }">
        <!-- 登录表单主体 -->
        <Card
          :bordered="false"
          :style="{ width: '300px', margin: '150px auto', background: 'white' }"
        >
          <p slot="title">登录</p>
          <Form
            ref="formCustom"
            :model="formCustom"
            :rules="ruleCustom"
            @keydown.enter.native="handleSubmit('formCustom')"
          >
            <FormItem prop="userName">
              <Input type="text" v-model="formCustom.userName" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="userPwd">
              <Input type="password" v-model="formCustom.userPwd" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit('formCustom')" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formCustom: {
        userName: "",
        userPwd: "",
        identity: ""
      },
      ruleCustom: {
        userName: [
          {
            required: true,
            min: 4,
            max: 10,
            message: "长度在4~10位之间",
            trigger: "blur"
          }
        ],
        userPwd: [
          {
            required: true,
            min: 4,
            max: 10,
            message: "长度在4~10位之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    /**
     * 登录按钮触发事件
     */
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("user/handleLogin", this.formCustom)
            .then(res => {
              this.$Message.success("登录成功");
              this.$router.push({ path: "/home" });
            })
            .catch(err => {
              this.$Message.error(err);
            });
        } else {
          this.$Message.error("格式不正确");
        }
      });
    },
    /**
     * 表单重置
     */
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped>
.login {
  background: url(../../assets/background.jpg) center center fixed;
}
</style>

