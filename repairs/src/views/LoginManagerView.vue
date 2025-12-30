<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <h2 class="title">宿舍报修系统 - 管理员登录</h2>

      <el-form :model="form" class="login-form">
        <!-- 账号输入 -->
        <el-form-item label="管理员账号">
          <el-input v-model="form.account" placeholder="请输入管理员账号"></el-input>
        </el-form-item>

        <!-- 密码输入 -->
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 底部链接：跳转学生端登录 -->
      <div class="bottom-links">
        <span class="link" @click="goStudentLogin">返回学生端登录</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AdminLoginView",
  data() {
    return {
      form: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    handleLogin() {
      if (!this.form.account || !this.form.password) {
        this.$message.warning("请输入账号和密码");
        return;
      }

      this.$axios.post("/loginadmin", {
        account: this.form.account,
        password: this.form.password
      }).then(res => {
        if (res.data.code === 1) {
          // 登录成功
          this.$message.success("管理员登录成功");

          // 保存管理员信息（后续鉴权用）
          localStorage.setItem("admin_token", res.data.data);

          // 跳转后台首页
          this.$router.push("/manage/student");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    goStudentLogin() {
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
