<template>
  <div class="my-repair-container">
    <div class="header">
      <h1 class="title">我的报修</h1>
      <span class="back-link" @click="goHall">← 返回报修大厅</span>
    </div>

    <div class="filter-bar">
      <el-radio-group v-model="filterStatus" size="small">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="processing">进行中</el-radio-button>
        <el-radio-button label="done">已完成</el-radio-button>
      </el-radio-group>
    </div>

    <div class="card-list">
      <el-empty
        v-if="filteredList.length === 0"
        description="暂无报修记录"
      />

      <el-card
        v-for="item in filteredList"
        :key="item.orderId"
        class="repair-card"
        shadow="hover"
      >
        <div class="card-header">
          <div>
            <b>{{ item.repairCategory }}</b> - {{ item.specificItem }}
          </div>

          <el-tag
            :type="item.isCompleted === 1 ? 'success' : 'warning'"
            size="mini"
          >
            {{ item.isCompleted === 1 ? '已完成' : '进行中' }}
          </el-tag>
        </div>

        <div class="card-content">
          <p><span>账号：</span>{{ item.reporterAccount }}</p>
          <p><span>姓名：</span>{{ item.reporterName }}</p>
          <p><span>联系方式：</span>{{ item.reporterPhone }}</p>
          <p>
            <span>位置：</span>
            {{ item.livingArea }} {{ item.building }} {{ item.roomNumber }}
          </p>
          <p><span>问题描述：</span>{{ item.problemDescription }}</p>
          <p v-if="item.repairImages">
            <span>图片：</span>
            <span
              v-for="(img, index) in item.repairImages.split(',')"
              :key="index"
            >
              <img :src="`http://localhost:8080${img}`" alt="repair" style="width:300px; margin-right:5px;" />
            </span>
          </p>
        </div>

        <div class="card-time">
          <p>提交时间：{{ formatDate(item.repairTime) }}</p>
          <p v-if="item.completedTime">
            完成时间：{{ formatDate(item.completedTime) }}
          </p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
 import { jwtDecode } from "jwt-decode"; 
export default {
  name: "MyRepairView",
  data() {
    return {
      filterStatus: "all",
      repairList: []
    };
  },
  computed: {
    filteredList() {
      if (this.filterStatus === "all") return this.repairList;
      return this.repairList.filter(item => {
        const status = item.isCompleted === 1 ? "done" : "processing";
        return status === this.filterStatus;
      });
    }
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    goHall() {
      this.$router.push("/student/repairhall");
    },
    fetchOrders() {
        const token = localStorage.getItem("student_token");
      if (!token) return;

      // 用 jwtDecode 解析 token
      let account = "";
      try {
        const decoded = jwtDecode(token);
        account = decoded.account;
      } catch (err) {
        console.error("JWT 解析失败:", err);
        this.$message.error("用户信息获取失败，请重新登录");
        return;
      }

      this.$axios
        .get("/myorders", { params: { account } })
        .then(res => {
          if (res.data.code === 1) {
            this.repairList = res.data.data || [];
          } else {
            this.$message.error(res.data.msg || "获取报修记录失败");
          }
        })
        .catch(() => {
          this.$message.error("服务器错误");
        });
    },
    formatDate(datetime) {
      if (!datetime) return "";
      const date = new Date(datetime);
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      const h = String(date.getHours()).padStart(2, "0");
      const min = String(date.getMinutes()).padStart(2, "0");
      return `${y}-${m}-${d} ${h}:${min}`;
    }
  }
};
</script>


<style scoped>
.my-repair-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #e8eef6);
  padding: 30px;
}

/* 顶部 */
.header {
  max-width: 900px;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 26px;
  font-weight: 600;
}

.back-link {
  color: #409eff;
  cursor: pointer;
  font-size: 14px;
}

.back-link:hover {
  text-decoration: underline;
}

/* 筛选 */
.filter-bar {
  max-width: 900px;
  margin: 0 auto 20px;
}

/* 卡片列表 */
.card-list {
  max-width: 900px;
  margin: 0 auto;
}

.repair-card {
  margin-bottom: 20px;
  border-radius: 8px;
}

/* 卡片头 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
}

/* 内容 */
.card-content p {
  margin: 4px 0;
  color: #606266;
}

.card-content span {
  color: #909399;
}

/* 时间 */
.card-time {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px dashed #ebeef5;
  font-size: 13px;
  color: #909399;
}
</style>
