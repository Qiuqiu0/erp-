<template>
  <div class="fiSettleApplyDetail">
    <el-divider></el-divider>
    <div class="button-div auto-sibling">
      <el-button
        v-show="flag "
        class="query-button"
        icon="el-icon-suitcase"
        @click="saveFiSettleApplyDetail"
      >保存</el-button>
      <el-button @click="goBack" :icon="flag?'el-icon-close':'el-icon-back'">
        {{
        flag ? "取消" : "返回"
        }}
      </el-button>
    </div>
    <el-divider></el-divider>
    <!-- tab标签 -->
    <el-tabs class="el-tabs auto-sibling" v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="first" :style="navColor"></el-tab-pane>
      <el-tab-pane label="打印及附件" name="second" :style="navColor"></el-tab-pane>
      <el-tab-pane label="系统信息" name="third"></el-tab-pane>
    </el-tabs>
    <!-- tab内容 -->
    <div class="auto-sibling">
      <tab-con-first v-show="activeName == 'first'" @getData="getTopTabFirstData" ref="topTabFirst"></tab-con-first>
      <tab-con-second v-show="activeName == 'second'" ref="fileTab" style="height:194px;"></tab-con-second>
      <div v-show="activeName == 'third'" class="input-div" style="height:194px;">
        <el-col :span="5" class="el-col">
          <label>创建人</label>
          <el-input
            v-model="fiSettleApply.createdName"
            disabled
            class="el-inputs"
            size="small"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>创建日期</label>
          <el-date-picker
            class="el-inputs"
            size="mini"
            disabled
            v-model="fiSettleApply.createdTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>修改人</label>
          <el-input
            v-model="fiSettleApply.updatedName"
            disabled
            class="el-inputs"
            size="small"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>修改日期</label>
          <el-date-picker
            class="el-inputs"
            disabled
            size="mini"
            v-model="fiSettleApply.updatedTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </div>
    </div>
    <!-- 下部tab内容 -->
    <el-tabs class="el-tabs auto-sibling" v-model="handerOn" type="card">
      <el-tab-pane label="结汇申请明细" name="credit" :style="navColor" class="table-div"></el-tab-pane>
    </el-tabs>
    <bottom-table-first
      v-show="handerOn=='credit'"
      v-auto
      :fiSettleApply="fiSettleApply"
      ref="tableDetail"
      @getData="getTableDetailData"
    ></bottom-table-first>
  </div>
</template>
<script>
import tabConFirst from "./tabConFirst";
import tabConSecond from "./tabConSecond";
import bottomTableFirst from "./bottomTableFirst";
import { saveFiSettleApply } from "@/api/fiSettleManage/fiSettleApplyDetail";
export default {
  name: "fiSettleApplyDetail",
  components: { tabConFirst, tabConSecond, bottomTableFirst },
  data() {
    return {
      companyName: "",
      branchName: "",
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      activeName: "first",
      handerOn: "credit",
      loading: false,
      fiSettleApply: {}
    };
  },
  computed: {
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: "fiSettleApplyList" });
    },
    getTopTabFirstData(data) {
      this.fiSettleApply = data;
      this.postData = JSON.parse(JSON.stringify(data));
    },
    //获取明细table
    getTableDetailData(data) {
      if (data.length > 0) {
        let postData = JSON.parse(JSON.stringify(data));
        postData.map((item, index) => {
          delete item["edit"];
          delete item["one"];
          item.rowno = (index + 1) * 10;
        });
        this.postData.applyItems = postData;
      }
    },
    saveFiSettleApplyDetail() {
      if (!this.$refs.topTabFirst.postData()) return;
      if (!this.$refs.tableDetail.postData()) return;
      let params = { ...this.postData };
      console.log(this.$refs.fileTab);
      params.sysSystemAccessoryList = this.$refs.fileTab.tableData;
      saveFiSettleApply(params).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "fiSettleApplyList" });
        }
      });
    }
  }
};
</script>
<style lang="scss" >
.fiSettleApplyDetail {
  .input-div .el-col {
    margin: 8px 0 0 10px;
    height: 26px;
  }
  .input-div .el-col .el-input__icon {
    line-height: 25px;
  }
  .input-div label {
    width: 30%;
    vertical-align: middle;
  }
  .input-div .el-textarea__inner {
    border-color: #97999e !important;
  }
  .el-col {
    position: relative;
    .comicon {
      width: 170px;
      height: 20px;
      position: absolute;
      right: 6px;
      top: 7px;
      cursor: pointer;
    }
  }
  .table-div {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    text-align: left;
  }
}
</style>
