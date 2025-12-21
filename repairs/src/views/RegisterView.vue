<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <h2 class="title">学生宿舍报修系统 - 注册</h2>

      <el-form :model="form" class="login-form">
        <!-- 账号 -->
        <el-form-item label="账号">
          <el-input v-model="form.account" placeholder="请输入您的学号"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item label="确认密码">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
          ></el-input>
        </el-form-item>

        <!-- 注册按钮 -->
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleRegister">
            注册
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 底部链接 -->
      <div class="bottom-links">
        <span class="link" @click="goLogin">已有账号？去登录</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RegisterStudentView",
  data() {
    return {
      form: {
        account: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    handleRegister() {
      if (!this.form.account || !this.form.password) {
        this.$message.error("账号或密码不能为空");
        return;
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.$message.error("两次输入的密码不一致");
        return;
      }

      this.$axios.post("/register", {
        account: this.form.account,
        password: this.form.password,
        checkPassword: this.form.confirmPassword
      }).then(res => {
        const data = res.data;

        if (data.code === 1) {
          this.$message.success(data.msg || "注册成功");
          this.$router.push("/student/login");
        } else {
          this.$message.error(data.msg || "注册失败");
        }
      }).catch(() => {
        this.$message.error("服务器异常");
      });
    },

    goLogin() {
      this.$router.push("/student/login");
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 400px;
  padding: 20px 30px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
}

.bottom-links {
  margin-top: 10px;
  text-align: center;
}

.link {
  color: #409eff;
  cursor: pointer;
  font-size: 14px;
}

.link:hover {
  text-decoration: underline;
}
</style>
