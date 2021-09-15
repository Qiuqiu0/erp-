<template>
  <div id="creditGroupCreditDetail">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-back" @click="goBack">返回</el-button>
    </div>
    <el-tabs class="el-tabs" type="card" v-model="currTab1">
      <el-tab-pane label="基本信息" name="basic">
        <div class="input-div">
          <el-row>
            <el-col :span="5" class="el-col">
              <label>公司</label>
              <el-input v-model="companyInfo.companyName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>部门</label>
              <el-input v-model="branchInfo.branchName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>业务员</label>
              <el-input v-model="salesman.empName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>申请单号</label>
              <el-input v-model="applyCode" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>申请日期</label>
              <el-date-picker v-model="applyDate" type="date" class="el-selects" disabled></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label class="text_too_long">信用账户组代码</label>
              <el-input v-model="creditGroupInfo.creditGroupCode" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label class="text_too_long">信用账户组名称</label>
              <el-input v-model="creditGroupInfo.creditGroupName" class="el-inputs" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label class="text_too_long">是否受额度管控</label>
              <el-select v-model="isControlled" class="el-selects" disabled>
                <el-option v-for="(item, index) in isControlledDic" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="el-col">
              <label class="text_too_long">授信有效期开始</label>
              <el-date-picker v-model="startTime" type="date" class="el-selects" disabled></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label class="text_too_long">授信有效期结束</label>
              <el-date-picker v-model="endTime" type="date" class="el-selects" disabled></el-date-picker>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>状态</label>
              <el-select v-model="grantStatus" class="el-selects" disabled>
                <el-option v-for="(item, index) in grantStatusDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label class="text_too_long">审批信用额度</label>
              <el-input v-model="grantAmt" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>额度账期</label>
              <el-input v-model="creditNo" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>业务币种</label>
              <el-input v-model="currencyCode" class="el-inputs" disabled></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="el-col el-full">
              <label>备注</label>
              <el-input v-model="remark" class="el-inputs" disabled></el-input>
            </el-col>
          </el-row>
        </div>
        <el-tabs class="el-tabs" type="card" v-model="currTab2">
          <el-tab-pane label="客户信息" name="customer">
            <el-table
              class="el-table"
              border
              center
              :data="customerArray">
              <el-table-column type="index" label="序号" width="55"></el-table-column>
              <el-table-column prop="customerName" label="客户" width="350" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="打印及附件" name="attachment">
        <div class="el-table-div">
           <el-table
            :data="uploadList.tableList"
            ref="table2"
            tooltip-effect="dark"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              type="index"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column prop="fileOldName" label="文件名称">
            </el-table-column>
            <!-- <el-table-column prop="fileType" label="类型"> </el-table-column>
            <el-table-column prop="fileType" label="文档类型名称">
            </el-table-column>
            <el-table-column prop="fileType" label="签章情况">
            </el-table-column> -->
            <el-table-column prop="createdTime" label="上传时间">
            </el-table-column>
            <el-table-column prop="createdName" label="上传人"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">下载</el-button>
                    <!-- <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">预览</el-button>
                    <el-button
                    size="mini"
                    type="text"
                    style="height: 26px;padding: 0;width:40px;"
                    @click="download(scope.row)">打印</el-button> -->
                </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";
import uploadApi from "@/api/component";
import CreditApi from "@/api/creditData/creditGroup";
export default {
  name: "creditGroupCreditDetail",
  data() {
    return {
      currTab1: "basic",
      currTab2: "customer",
      //基本信息
      companyInfo: "",
      branchInfo: "",
      applyCode: "",
      applyDate: "",
      creditGroupInfo: "",
      isControlled: "",
      isControlledDic: [
        {value: "0", label: "是"},
        {value: "1", label: "否"}
      ],
      startTime: "",
      endTime: "",
      grantStatus: "",
      grantStatusDic: [], //审核状态字典
      grantAmt: "",
      creditNo: "",
      currencyCode: "",
      currencyDic: [], //业务币种字典
      remark: "",
      //客户信息
      customerArray: [],
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      uploadList:{//附件上传
        tableList:[],
      },
      salesman:{},//业务员
    };
  },
  created() {
    //审核状态字典
    this.grantStatusData();
    //业务币种下拉列表
    this.currencySelect();
    //获取信用账户组信用额度详情
    this.creditGroupCreditDetail();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //获取信用账户组信用额度详情
    creditGroupCreditDetail() {
      CreditApi.creditGroupCreditList({
        quotaId: this.$route.query.id
      }).then(res => {
        let creditInfo = res.data.list[0];
        this.companyInfo = {
          companyName: creditInfo.companyName
        }
        this.branchInfo = {
          branchName: creditInfo.orgName
        }
        this.salesman.empName = creditInfo.bizName;
        this.applyCode = creditInfo.applyCode;
        this.applyDate = creditInfo.applyDate;
        this.creditGroupInfo = {
          creditGroupCode: creditInfo.creditGroupCode,
          creditGroupName: creditInfo.creditGroupName
        }
        this.isControlled = creditInfo.isControlled + "";
        this.startTime = creditInfo.grantBegintime;
        this.endTime = creditInfo.grantEndtime;
        this.grantStatus = creditInfo.grantStatus + "";
        this.grantAmt = creditInfo.grantAmt;
        this.creditNo = creditInfo.creditNo;
        this.currencyCode = creditInfo.currencyCode;
        this.remark = creditInfo.remark;
        this.getCustomerList(this.creditGroupInfo.creditGroupCode);
        this.selectFileList(this.$route.query.id);
      }).catch();
    },
    //根据信用账户组显示客户信息
    getCustomerList(creditGroupCode) {
      CreditApi.creditGroupToCustomer({
        creditGroupCode: creditGroupCode
      }).then(res => {
        this.customerArray = res.data;
      }).catch();
    },
    //查询附件
    selectFileList(id){
       let data = {
        businessId: this.$route.query.id
      };
      uploadApi.selectFileList(data)
        .then(res => {
          if (res.code == "success") {
            this.uploadList.tableList=res.data;
            this.uploadList.tableList.forEach(element => {
               element.createdTime=this.$timeFun(element.createdTime, true);
            });
          } else {
            this.$openWarning(res.message);
          }
        }).catch();
    },
    //预览
    download(row){
     window.open(row.fileServerAddress);
    },
    //审核状态字典
    grantStatusData() {
      CreditApi.dicQuery({
        dictNo: 1030
      }).then(res => {
        this.grantStatusDic = res.data;
      }).catch();
    },
    //业务币种下拉列表
    currencySelect() {
      CreditApi.currencySelect().then(res => {
        this.currencyDic = res.data;
      }).catch();
    },
    //返回
    goBack() {
      this.$router.push({name: "creditGroupCredit"});
    }
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    }
  }
};
</script>
<style lang="scss">
#creditGroupCreditDetail {
  .el-row {
    margin-left: 10px;
    .el-col {
      margin: 0;
      padding: 8px 0 10px 10px;
    }
  }
  .el-col:nth-child(4n-1),
  .el-col:nth-child(4n-2) {
    margin-left: 10px;
  }
  .el-col:nth-child(4n) {
    margin-left: -20px;
  }
  .is-disabled {
    .el-input__inner {
      color: #666;
      cursor: default;
    }
    .el-input__icon {
      cursor: default;
    }
  }
  label {
    display: inline-block;
    width: 35%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 65% !important;
    .el-input__inner {
      width: 100%;
    }
  }
  .el-col-20 {
    width: 96%;
  }
  .el-full {
    label {
      width: 8.5%;
    }
    .el-inputs {
      width: 91.5% !important;
      .el-input__inner {
        width: 100%;
      }
    }
  }
  .text_too_long {
    position: absolute;
    width: 40%;
    line-height: 24px;
    margin-left: -40%;
  }
}
</style>