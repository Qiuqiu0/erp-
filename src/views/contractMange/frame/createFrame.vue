<template>
  <div class="createFrame content-div2">
    <el-divider></el-divider>
    <div class="button-div">
      <el-button class="query-button"
                 v-if="!isChangeContract"
                 @click="submitForm"
                 icon="el-icon-suitcase">保存</el-button>
      <el-button icon="el-icon-edit-outline"
                 v-else
                 @click="handleContractChange">变更</el-button>
      <el-button @click="goBack"
                 icon="el-icon-close">取消</el-button>
    </div>
    <el-divider></el-divider>
    <!-- <header>框架协议</header> -->
    <!-- tab标签 -->
    <el-tabs class="el-tabs"
             v-model="activeName2"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="框架协议"
                   name="first"
                   :style="navColor"></el-tab-pane>
      <el-tab-pane label="合同条款"
                   name="tenth"></el-tab-pane>
      <el-tab-pane label="版本"
                   name="fourth"></el-tab-pane>
      <el-tab-pane label="打印及附件"
                   name="fifth"></el-tab-pane>
      <el-tab-pane label="系统信息"
                   name="sixth"></el-tab-pane>
    </el-tabs>
    <!-- tab标签 -->
    <!-- 合同基本信息 -->
    <div v-show="activeName2 == 'first'">
      <tab-first ref="first"
                 :modifyData="modifyData"></tab-first>
    </div>
    <div v-show="activeName2 == 'fourth'">
      <tab-fourth ref="fourth"></tab-fourth>
    </div>
    <div v-show="activeName2 == 'fifth'">
      <tab-fifth ref="fifth"></tab-fifth>
    </div>
    <div v-show="activeName2 == 'sixth'">
      <tab-sixth ref="sixth"></tab-sixth>
    </div>
    <div v-show="activeName2 == 'tenth'">
      <tab-tenth ref="tenth"></tab-tenth>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import tabFirst from "@/views/contractMange/frame/tabFirst.vue";
import tabFourth from "@/views/contractMange/frame/tabFourth.vue";
import tabFifth from "@/views/contractMange/frame/tabFifth.vue";
import tabSixth from "@/views/contractMange/frame/tabSixth.vue";
import tabTenth from "@/views/contractMange/frame/tabTenth.vue";
import WareApi from "@/api/wareRate/wareRate";
import { saveOdFwContract } from "@/api/contractMange/frameProtocol";
import { Message, Loading } from "element-ui";
export default {
  name: "createFrame",
  data () {
    return {
      componyShow: false, //银行弹窗
      departmentShow: false, //部门弹窗
      staffShow: false, //员工弹窗
      projectShow: false, //员工弹窗
      manShow: false, //人员弹窗
      customerShow: false, //客户弹窗
      supplierShow: false, //供应商弹窗
      companyName: ``, //公司
      branchName: ``, //部门
      staffName: ``, //员工
      projectCode: ``, //项目号
      projectName: ``, //项目名称
      manName: ``, //人员
      typeList: [],
      value2: ``, // 签订日期
      value3: ``, // 有效日期
      value4: ``, // 创建日期
      isInactive: ``, //
      isInaType: [
        { value: 10130005, label: "草拟" },
        { value: 10130010, label: "审批中" },
        { value: 10130015, label: "已生效" },
        { value: 10130020, label: "审批后修改" },
        { value: 10130025, label: "变更审批中" },
        { value: 10130030, label: "关闭中" },
        { value: 10130035, label: "已截停" },
        { value: 10130040, label: "开启中" },
        { value: 10130045, label: "已驳回" },
        { value: 10130050, label: "已关闭" }
      ],
      activeName2: "first", //标签页
      tableData: [], //通讯表格
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      linkList: [],
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      warehouseLinkList: [], //联系人
      warehouseId: "",
      version: "",
      //loading: true, //表格loading
      getData: {},
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      show: true,
      //修改数据
      modifyData: [],
      isChangeContract: false,
      isChange: null
    };
  },
  created () { },
  mounted () {
    let url = window.location.href;
    if (url.indexOf("isChange=") != -1) {
      this.isChangeContract = true
      this.isChange = 1
    }
  },
  methods: {
    // 获取标签
    handleClick (tab, event) {
      // eslint-disable-next-line no-console
      // console.log(tab, event);
    },
    //表格选择
    handleChange (e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    //返回
    goBack () {
      this.$router.push("/index/contractMange/frame/framecontract");
    },
    //保存数据
    submitForm () {
      //   this.dataLength = [];
      //   this.getData = {};
       
      let tempFirst = this.$refs["first"].to();
      let odFwContractTermFormList = this.$refs["tenth"].to(); //合同条款
      let sysSystemAccessoryList = this.$refs["fifth"].to(); //打印及附件
      if (tempFirst) {
        let saveOdFwContractForm = {
          ...tempFirst,
          odFwContractTermFormList,
          sysSystemAccessoryList
        };
        //使用Element loading-start 方法
      var loading = Loading.service({
        lock: true,
        text: "处理中...",
        background: "rgba(0, 0, 0, 0.7)"
      });
        saveOdFwContract(saveOdFwContractForm)
          .then(res => {
            loading.close();
            this.$openSuccess(res.message);
            this.$router.push("/index/contractMange/frame/framecontract");
          })
          .catch(err => {
            loading.close();
            // this.$openSuccess(err.message);
          });
      }
    },
    //变更数据
    handleContractChange () {
       //使用Element loading-start 方法
      
      let tempFirst = this.$refs["first"].changeTo();//框架协议
      let odFwContractTermFormList = this.$refs["tenth"].to(); //合同条款

      let sysSystemAccessoryList = this.$refs["fifth"].to(); //打印及附件

      let saveOdFwContractForm = {
        ...tempFirst,
        odFwContractTermFormList,
        sysSystemAccessoryList,
        isChange: 1
      };
      var loading2 = Loading.service({
        lock: true,
        text: "处理中...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      saveOdFwContract(saveOdFwContractForm)
        .then(res => {
          loading2.close();
          this.$openSuccess(res.message);
          this.$router.push("/index/contractMange/frame/framecontract");
        })
        .catch(err => {
          loading2.close();
          // this.$openSuccess(err.message);
        });
    },
  },
  components: {
    tabFirst,
    tabFourth,
    tabFifth,
    tabSixth,
    tabTenth
  }
};
</script>

<style lang="scss">
.createFrame {
  /* margin-left: 19px;
  width: 97%; */
  .el_flex {
    display: flex;
    align-items: center;
  }

  .el-date-editor.el-input {
    width: auto;
  }

  .table_title {
    font-weight: bold;
    font-size: 16px;
  }
  .bcakfff {
    background: #ffffff;
    padding: 10px 0px;
  }
  .formBox {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    .lablel {
      width: 103px;
      text-align: right;
      font-size: 12px;
      padding-right: 20px;
    }
    .labelInput {
      width: 200px;
    }
    .el-input__inner {
      height: 30px;
      width: 200px;
    }
    .el-input__icon {
      line-height: 30px;
    }
    .el-select .el-input__inner {
      width: 200px;
    }
  }
  .flex_center {
    display: flex;
    margin-bottom: 0;
    .table_title {
      margin-bottom: 0;
      margin-right: 10px;
    }
    .button-div {
      margin: 0;
    }
  }
  .el-tabs__item {
    width: auto !important;
  }
  header {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 5px;
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
    .absoLab {
      position: absolute;
      left: -4px;
    }
    .absdfzx {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .input-div-bor {
    border-bottom: 0;
    margin-bottom: 0;
  }
  .bortop0 {
    border-top: 0;
  }

  .el-tabs__header {
    margin-bottom: 0;
  }
  .olbutton {
    width: auto !important;
  }
}
</style>
