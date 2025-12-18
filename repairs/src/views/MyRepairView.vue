<template>
  <div class="my-repair-container">
    <!-- 顶部 -->
    <div class="header">
      <h1 class="title">我的报修</h1>
      <span class="back-link" @click="goHall">← 返回报修大厅</span>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <el-radio-group v-model="filterStatus" size="small">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="processing">进行中</el-radio-button>
        <el-radio-button label="done">已完成</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 报修记录 -->
    <div class="card-list">
      <el-empty
        v-if="filteredList.length === 0"
        description="暂无报修记录"
      />

      <el-card
        v-for="item in filteredList"
        :key="item.id"
        class="repair-card"
        shadow="hover"
      >
        <!-- 卡片头 -->
        <div class="card-header">
          <div>
            <b>{{ item.category }}</b> - {{ item.subItem }}
          </div>

          <el-tag
            :type="item.status === 'done' ? 'success' : 'warning'"
            size="mini"
          >
            {{ item.status === 'done' ? '已完成' : '进行中' }}
          </el-tag>
        </div>

        <!-- 内容 -->
        <div class="card-content">
          <p><span>账号：</span>{{ item.account }}</p>
          <p><span>联系方式：</span>{{ item.phone }}</p>
          <p>
            <span>位置：</span>
            {{ item.area }} {{ item.building }} {{ item.room }}
          </p>
          <p><span>问题描述：</span>{{ item.desc }}</p>
        </div>

        <!-- 时间 -->
        <div class="card-time">
          <p>提交时间：{{ item.submitTime }}</p>
          <p v-if="item.finishTime">
            完成时间：{{ item.finishTime }}
          </p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyRepairView",
  data() {
    return {
      filterStatus: "all",
      repairList: [
        {
          id: 1,
          category: "电工类",
          subItem: "灯具",
          account: "2023123456",
          phone: "13800001111",
          area: "东区",
          building: "3号楼",
          room: "305",
          desc: "寝室灯不亮，可能是灯管坏了",
          status: "processing",
          submitTime: "2025-04-10 14:32",
          finishTime: null
        },
        {
          id: 2,
          category: "水工类",
          subItem: "水龙头",
          account: "2023123456",
          phone: "13800001111",
          area: "东区",
          building: "3号楼",
          room: "305",
          desc: "水龙头漏水，关不紧",
          status: "done",
          submitTime: "2025-04-05 09:18",
          finishTime: "2025-04-06 16:40"
        },
        {
          id: 3,
          category: "网络类",
          subItem: "无法上网",
          account: "2023123456",
          phone: "13800001111",
          area: "西区",
          building: "1号楼",
          room: "218",
          desc: "插上网线无法上网，指示灯不亮",
          status: "done",
          submitTime: "2025-03-28 20:10",
          finishTime: "2025-03-29 11:05"
        }
      ]
    };
  },
  computed: {
    filteredList() {
      if (this.filterStatus === "all") {
        return this.repairList;
      }
      return this.repairList.filter(
        item => item.status === this.filterStatus
      );
    }
  },
  methods: {
    goHall() {
      this.$router.push("/student/repairhall");
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
