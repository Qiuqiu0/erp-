<template>
  <div id="customerCreditDetail">
    <!--操作按钮-->
    <div class="button-div">
      <el-button icon="el-icon-back" @click="goBack">返回</el-button>
    </div>
    <el-tabs class="el-tabs" type="card" v-model="currTab">
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
              <label>客户代码</label>
              <el-input v-model="customerInfo.customerCode" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>客户名称</label>
              <el-input v-model="customerInfo.customerName" class="el-inputs" disabled></el-input>
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
              <el-select v-model="auditStatus" class="el-selects" disabled>
                <el-option v-for="(item, index) in auditStatusDic" :key="index" :label="item.dict_value" :value="item.dict_code"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="el-col">
              <label class="text_too_long">审批信用额度</label>
              <el-input v-model="creditAmt" class="el-inputs" disabled></el-input>
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
            <el-col :span="20" class="el-col-textarea">
              <label style="width:7.4%;vertical-align: 8px;">备注</label>
              <el-input  
              type="textarea"
              autosize
              v-model="remark"
              size="small"
              class="el-textarea"
              disabled></el-input>
            </el-col>
          </el-row>
        </div>
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
      <el-tab-pane label="流程详情"
                   name="lcxq">
        <div class="input-div input-div-bor bortop0">
          <v-exmineStatus :id="$route.query.id"></v-exmineStatus>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";
import uploadApi from "@/api/component";
import CreditApi from "@/api/creditData/credit";
import ExmineStatus from '@/components/exmineStatus'
export default {
  name: "customerCreditDetail",
   components: { 
    'v-exmineStatus': ExmineStatus
  },
  data() {
    return {
      currTab: "basic",
      //基本信息
      companyInfo: "",
      branchInfo: "",
      applyCode: "",
      applyDate: "",
      customerInfo: "",
      isControlled: "",
      isControlledDic: [
        {value: "0", label: "是"},
        {value: "1", label: "否"}
      ],
      startTime: "",
      endTime: "",
      auditStatus: "",
      auditStatusDic: [], //审核状态字典
      creditAmt: "",
      creditNo: "",
      currencyCode: "",
      currencyDic: [], //业务币种字典
      remark: "",
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
    this.auditStatusData();
    //业务币种下拉列表
    this.currencySelect();
    //获取客户信用额度详情
    this.customerCreditDetail();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor = "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    //获取客户信用额度详情
    customerCreditDetail() {
      CreditApi.customerCreditList({
        custCreditId: this.$route.query.id
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
        this.customerInfo = {
          customerCode: creditInfo.custCode,
          customerName: creditInfo.custName
        }
        this.isControlled = creditInfo.isControlled + "";
        this.startTime = creditInfo.creditBegintime;
        this.endTime = creditInfo.creditEndtime;
        this.auditStatus = creditInfo.auditStatus + "";
        this.creditAmt = creditInfo.creditAmt;
        this.creditNo = creditInfo.creditNo;
        this.currencyCode = creditInfo.currencyCode;
        this.remark = creditInfo.remark;
        this.selectFileList(this.$route.query.id);
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
    auditStatusData() {
      CreditApi.dicQuery({
        dictNo: 1030
      }).then(res => {
        this.auditStatusDic = res.data;
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
      this.$router.push({name: "customerCredit"});
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
#customerCreditDetail {
.input-div{
     .el-textarea {
      width:91.5%;
      font-size: 12px;
    }

    textarea {
      border-color: #909399 !important;
    }
  }
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