<template>
  <div class="form-container">
    <!-- 顶部 -->
    <div class="header">
      <h1 class="title">报修</h1>
      <span class="back-link" @click="goHall">← 返回报修大厅</span>
    </div>

    <!-- 表单卡片 -->
    <el-card class="form-card">
      <el-form :model="form" label-width="100px">

        <el-form-item label="账号">
          <el-input v-model="form.account" placeholder="请输入学号" disabled></el-input>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名" ></el-input>
        </el-form-item>


        <el-form-item label="联系方式">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item label="生活区">
          <el-select v-model="form.area" placeholder="请选择生活区">
            <el-option label="钱江湾生活园区" value="钱江湾生活园区" />
            <el-option label="金沙港生活园区" value="金沙港生活园区" />
             <el-option label="教工路地区" value="教工路地区" />
          </el-select>
        </el-form-item>

        <el-form-item label="楼号">
          <el-input v-model="form.building" placeholder="如：3号楼" />
        </el-form-item>

        <el-form-item label="寝室号">
          <el-input v-model="form.room" placeholder="如：305" />
        </el-form-item>

        <!-- 报修类目（自动填充） -->
        <el-form-item label="报修类目">
          <el-input v-model="categoryName" disabled />
        </el-form-item>

        <!-- 具体事项 -->
        <el-form-item label="具体事项">
          <el-select v-model="form.item" placeholder="请选择具体问题">
            <el-option
              v-for="item in itemOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <!-- 问题描述 -->
        <el-form-item label="问题描述">
          <el-input
            type="textarea"
            :rows="4"
            v-model="form.desc"
            placeholder="请描述问题情况"
          />
        </el-form-item>

        <!-- 上传图片 -->
        <el-form-item label="上传图片">
          <el-upload
            list-type="picture-card"
            :auto-upload="false"
            :file-list="fileList"
            :on-change="handleFileChange"
            :on-remove="handleFileRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <!-- 提交 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交报修</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RepairFormView",
  data() {
    return {
      form: {
        account: "",
        name: "",
        phone: "",
        area: "",
        building: "",
        room: "",
        category: "",
        item: "",
        desc: ""
      },
      fileList: [] ,
      categoryMap: {
        electric: {
          name: "电工类",
          items: ["电源", "开关", "插座", "室外灯具", "室内灯具", "配电箱", "电表","空调", "其他"]
        },
        water: {
          name: "水工类",
          items: ["水龙头", "各类阀门", "水箱", "水表", "开水箱", "蹲坑", "座便器", "便池", "洗漱池", "拖把池", "地漏", "窨井", "管道", "淋浴蓬头", "连接软管", "底座", "热水读卡器", "热水管道", "楼顶热水设备", "其他"]
        },
        wood: {
          name: "木工类",
          items: ["入户门", "厕所门", "阳台门", "防火门", "窗户", "窗帘", "轨道", "滑轮", "晒衣架","学生寝室书桌", "床板", "床架", "柜子", "抽屉", "椅子", "上下铺爬梯", "蚊帐杆", "其他"]
        },
        metal: {
          name: "金工类",
          items: ["门锁", "合页", "把手", "插销", "卡扣","其他"]
        },
        network: {
          name: "网络类",
          items: ["无法上网", "网口损坏", "信号差", "其他"]
        },
        other: {
          name: "其他",
          items: ["其他"]
        }
      }
    };
  },
  computed: {
    categoryKey() {
      return this.$route.query.category;
    },
    categoryName() {
      return this.categoryMap[this.categoryKey]?.name || "";
    },
    itemOptions() {
      return this.categoryMap[this.categoryKey]?.items || [];
    }
  },
  mounted() {
    this.form.category = this.categoryName;
    const student = localStorage.getItem("student");
    if (student) {
      const user = JSON.parse(student);
      this.form.account = user.account || "";
    }
  },
  methods: {
    goHall() {
      this.$router.push("/student/repairhall");
    },
    submitForm() {
      const formData = new FormData();

      // 普通字段
      formData.append("reporterAccount", this.form.account);
      formData.append("reporterName", this.form.name);
      formData.append("reporterPhone", this.form.phone);
      formData.append("livingArea", this.form.area);
      formData.append("building", this.form.building);
      formData.append("roomNumber", this.form.room);
      formData.append("repairCategory", this.categoryName);
      formData.append("specificItem", this.form.item);
      formData.append("problemDescription", this.form.desc);

      // 图片（重点）
      this.fileList.forEach(file => {
        formData.append("images", file.raw);
      });

      console.log("===== FormData 内容 =====");
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(pair[0] + ": ", pair[1].name, pair[1].size + " bytes");
        } else {
          console.log(pair[0] + ": " + pair[1]);
        }
      }


      this.$axios.post("/addorder", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.$message.success("报修提交成功！");
          this.$router.push("/student/repairhall");
        } else {
          this.$message.error(res.data.msg || "提交失败");
        }
      }).catch(() => {
        this.$message.error("服务器错误");
      });
    },
    handleFileChange(file, fileList) {
      this.fileList = fileList;
    },
    handleFileRemove(file, fileList) {
      this.fileList = fileList;
    },
  }
};
</script>

<style scoped>
.form-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #e8eef6);
  padding: 30px;
}

.header {
  max-width: 800px;
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

.form-card {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
