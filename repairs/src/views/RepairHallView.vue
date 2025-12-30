<template>
  <div class="hall-container">
   <div class="header-area">
    <h1 class="page-title">报修大厅</h1>
   </div>

    <div class="header-divider"></div>

    <!-- 顶部栏 -->
    <div class="top-bar">
      <span class="top-link" @click="goLogin">← 返回登录</span>
      <span class="top-link" @click="goMyRepair">我的报修 →</span>
    </div>

    <!-- 副标题 -->
    <h2 class="hall-title">请选择报修类型</h2>

    <!-- 报修类型区域 -->
    <div class="type-grid">
      <div
        class="type-item"
        v-for="item in repairTypes"
        :key="item.type"
        @click="goRepair(item.type)"
      >
        <div class="icon-circle">
          <i :class="item.icon"></i>
        </div>
        <div class="type-name">{{ item.name }}</div>
      </div>
    </div>

    <!-- 注意事项 -->
    <el-card class="notice-card" shadow="never">
      <h3 class="notice-title">报修注意事项</h3>

      <el-collapse accordion>
        <!-- 电工类 -->
        <el-collapse-item title="电工类" name="1">
          <p>电源、开关、插座、室外灯具、室内灯具、配电箱、电表、空气开关</p>
          <p>浴霸、电风扇、排气扇</p>
          <p>学生寝室空调、学生公寓洗衣机</p>
          <p class="tip">（仅限学生寝室内统一租赁的空调、洗衣房内洗衣机报修）</p>
          <p>其他</p>
        </el-collapse-item>

        <!-- 水工类 -->
        <el-collapse-item title="水工类" name="2">
          <p>水龙头、各类阀门、水箱、水表、开水箱</p>
          <p>蹲坑、座便器、便池、洗漱池、拖把池、地漏、窨井、管道</p>
          <p>淋浴蓬头、连接软管、底座、热水读卡器、热水管道、楼顶热水设备</p>
          <p class="tip">（德能空气源热水紧急维修，请拨打 400-8899-011）</p>
          <p>其他</p>
        </el-collapse-item>

        <!-- 木工类 -->
        <el-collapse-item title="木工类" name="3">
          <p>入户门、厕所门、阳台门、防火门、窗户、窗帘、轨道、滑轮、晒衣架</p>
          <p>
            学生寝室书桌、床板、床架、柜子、抽屉、椅子、上下铺爬梯、蚊帐杆
          </p>
          <p class="tip">（仅限学生寝室家具报修）</p>
          <p>其他</p>
        </el-collapse-item>

        <!-- 金工类 -->
        <el-collapse-item title="金工类" name="4">
          <p>门锁、合页、插销、把手、卡扣</p>
          <p>其他</p>
        </el-collapse-item>
      </el-collapse>

      <!-- 维修时间 -->
      <div class="repair-time">
        <h4>维修时间说明</h4>
        <p>通常维修人员将在 <b>24 小时内</b> 进行维修。</p>
        <p>如遇情况较为严重或缺少维修材料，则需择日安排维修。</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RepairHallView",
  data() {
    return {
      repairTypes: [
        { name: "电工类", type: "electric", icon: "el-icon-lightning" },
        { name: "水工类", type: "water", icon: "el-icon-water-cup" },
        { name: "木工类", type: "wood", icon: "el-icon-box" },
        { name: "金工类", type: "metal", icon: "el-icon-setting" },
        { name: "网络类", type: "network", icon: "el-icon-monitor" },
        { name: "其他", type: "other", icon: "el-icon-more" }
      ]
    };
  },
  methods: {
    goRepair(type) {
        this.$router.push({
            path: "/student/repairform",
            query: {
            category: type
            }
        });
    },
    goMyRepair() {
      this.$router.push("/student/myrepair");
    },
    goLogin() {
      localStorage.removeItem("student_token");
      this.$router.push("/student/login");
    }
  }
};
</script>

<style scoped>
.hall-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #e4ecf7);
  padding: 20px 40px;
}

/* 顶部 */
.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.top-link {
  color: #409eff;
  cursor: pointer;
  font-size: 14px;
}

.top-link:hover {
  text-decoration: underline;
}

/* 标题 */
.hall-title {
  text-align: center;
  margin-bottom: 40px;
  font-weight: 500;
}

/* 类型网格 */
.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;
}

/* 单个类型 */
.type-item {
  text-align: center;
  cursor: pointer;
}

.icon-circle {
  width: 100px;
  height: 100px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #409eff;
  transition: all 0.3s;
}

.type-item:hover .icon-circle {
  background: linear-gradient(135deg, #054482, #d3bcf8);
  color: #fff;
  transform: translateY(-6px);
}

.type-name {
  font-size: 16px;
  margin-top: 6px;
}

.page-title {
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
}

.notice-card {
  max-width: 900px;
  margin: 60px auto 0;
}

.notice-title {
  margin-bottom: 15px;
}

.tip {
  color: #909399;
  font-size: 13px;
}

.repair-time {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px dashed #dcdfe6;
}

/* 顶部背景区域 */
.header-area {
  background: linear-gradient(135deg, #054482, #d3bcf8);
  padding: 30px 0 25px;
  border-radius: 8px 8px 8px 8px;
}

/* 标题在深色背景上 */
.header-area .page-title {
  color: #fff;
  margin-bottom: 0;
}
/* Header 与内容的分界装饰
.header-divider {
  width: 100%;
  height: 10px;
  margin-bottom: 10px;
  background: linear-gradient(
    to bottom,
    rgba(64, 158, 255, 0.35),
    rgba(64, 158, 255, 0)
  );
} */

</style>
