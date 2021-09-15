<template>
  <div class="table-div"  v-show="status!=-1 &&  isBusiness!=1">
    <el-form :disabled="flag!==1" style="height:100%;">
      <div class="button-div">
        <el-button class="query-button" @click="addList" icon="el-icon-plus" v-show="flag">增加行</el-button>
        <el-button v-show="flag" @click="delItem" icon="el-icon-minus">刪除行</el-button>
      </div>
      <el-table
        border
        center
        :data="fiPaymentItems"
        class="el-table"
        ref="multipleTable"
        height="calc(100% - 26px)"
        @selection-change="handleChange"
        @row-dblclick="dblclick"
        @row-click="rowClick"
        @select-all="dialogCheck"
        @select="dialogCheck"
        v-loading="loading"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" width="120" :index="indexMethod" label="行号"></el-table-column>
        <el-table-column prop="contractNoS" width="80" label="部门" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.orgName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="payAmt" label="付款金额（业务币）" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                type="number"
                v-model="scope.row.payAmt"
                @change="payAmtChangeHandler"
                :key="scope.row|row2key('id','payAmt')"
                v-input-filter:price
                placeholder="请输入"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.payAmt }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="payAmtBase" label="付款金额（本位币）" width="150">
          <template slot-scope="scope">
            <div>
              {{$calculationAmount(
              scope.row.payAmt,
              paymentDetail.baseCurrencyRate,
              "mul"
              )}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="documentType" label="业务单据类型" width="150">
          <template slot-scope="scope">
            <div>{{ applyInvoiceTypeObj[scope.row.documentType]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="documentNo" label="业务单据编号" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input size="mini" v-model="scope.row.documentNo" placeholder="请输入"></el-input>
              <span class="comicon" @click="showTip"></span>
            </div>
            <div v-else>{{ scope.row.documentNo }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="extContractNo" label="外部合同号" width="130">
          <template slot-scope="scope">
            <div>{{ scope.row.extContractNo }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="blNo" label="提单号" width="130"></el-table-column>
        <el-table-column prop="extBlNo" label="外部提单号号" width="130" show-overflow-tooltip></el-table-column>
        <el-table-column prop="moneyContent" label="款项内容" width="120">
          <template slot-scope="scope">
            <div>{{ crashContentObj[scope.row.moneyContent] }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="projectCode" label="项目编号" width="150" show-overflow-tooltip>
          >
          <template slot-scope="scope">
            <div>{{ scope.row.projectCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.projectName }}</div>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="false">{{ total }}</div>
    </el-form>
     <payment-item-modal
        v-if="paymentItemShow"
        :tipShow="paymentItemShow"
        @tipsCancle="paymentItemCancle"
        @tipsSure="paymentItemSure"
        :payApplyCode="payApplyCode?payApplyCode:paymentDetail.paymentMain.payApplyCode"
        :documentType="documentType?documentType:paymentDetail.documentType"
      ></payment-item-modal>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { getPaymentItemDetail } from "@/api/paymentManage/applyPaymentDetail";
import paymentItemModal from "@/views/fundsManage/conponents/paymentItemModal";
import {
  delPaymentDetail,
  getPaymentDetail
} from "@/api/paymentManage/paymentDetail";
import { getParities,getBaseParitiesByCompanyId } from "@/api/creditManage/creditDetail";
import { applyInvoiceTypeObj, crashContentObj } from "../../dictionary";
export default {
  name: "bottomTableFirst",
  components: { paymentItemModal },
  props: {
    payment: {
      //抬头对象
      type: Object,
      default: Object
    }
  },
  data() {
    return {
      fiPaymentItems: [],
      loading: false,
      paymentItemShow: false,
      applyInvoiceTypeObj,
      crashContentObj,
      payApplyCode: "",
      documentType: "",
      isBusiness:''
    };
  },
  computed: {
    ...mapState(["paymentDetail"]),
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    id() {
      return this.$route.params.id;
    },
    status() {
      return this.$route.params.status;
    },
    total() {
      let total = 0;
      if (this.fiPaymentItems.length > 0) {
        this.fiPaymentItems.forEach(item => {
          total = this.$calculationAmount(total, item.payAmt, "add");
        });
      }
      if(this.isBusiness!=1){
        this.setPayAmtTotal(total);
      }
      return total;
    }
  },
  methods: {
    ...mapMutations(["setPayAmtTotal"]),
    indexMethod(index) {
      return (index + 1) * 10;
    },
    handleChange(e) {
      if (e.length === 0) {
        this.selectioned = null;
      }
    },
    //表格单选
    dialogCheck(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.selectioned = row;
        this.index = this.fiPaymentItems.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.fiPaymentItems.indexOf(e);
      this.fiPaymentItems.forEach(item => {
        item.edit = false;
      });
      this.fiPaymentItems[index].edit = true;
      this.selectioned = e;
      this.index = this.fiPaymentItems.indexOf(e);
      this.$set(this.fiPaymentItems, this.fiPaymentItems.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.fiPaymentItems.indexOf(e);
    },
    //创建数据
    addList() {
      this.fiPaymentItems.forEach(item => {
        item.edit = false;
      });
      let documentType = this.documentType
        ? this.documentType
        : this.fiPaymentItems[0].documentType;
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        itemsRowNo: "",
        id: "", //id	varchar(32) [e描述_32]	y		y		付款单明细id
        payApplyitemsId: "", //付款申请明细id	varchar(32) [e描述_32]			y		付款申请明细id
        paymentCode: "", //付款单号	varchar(64) [e描述_64]			y		付款单号
        payApplyRowNo: "", //付款申请单行号	varchar(32) [e描述_32]			y		付款申请单行号
        orgCode: this.paymentDetail.paymentMain.orgCode, //部门编码	varchar(32) [e描述_32]			y		部门编码
        orgName: this.paymentDetail.paymentMain.orgName, //部门名称	varchar(128) [e描述_128]			y		部门名称
        payApplyCode: "", //付款申请单号	varchar(64) [e描述_64]			y		付款申请单号
        applyAmt: 0, //申请金额	decimal(20,6) [d(20,6)小数]			y		申请金额
        payedAmt: "", //已付款金额	decimal(20,6) [d(20,6)小数]			y		已付款金额;默认为空，如抬头无付款申请标识不为空，则该字段显示为空，如抬头无付款申请标识为空，则该字段通过计算该行项目付款申请单下已付款的金额合计得出
        payAmt: 0, //付款金额	decimal(20,6) [d(20,6)小数]			y		付款金额
        payAmtBase: "", //付款金额本位币	decimal(20,6) [d(20,6)小数]			y		付款金额本位币
        documentType: documentType, //业务单据类型	int [e字典Int8]			y		业务单据类型
        moneyContent: "", //款项内容
        documentNo: "", //业务单据编号	varchar(64) [e描述_64]			y		业务单据编号
        extContractNo: "", //外部合同号	varchar(64) [e描述_64]			y		外部合同号
        extInvoiceNo: "", //外销发票号	varchar(64) [e描述_64]			y		外销发票号
        projectCode: "", //项目编码	varchar(64) [e描述_64]			y		项目编码
        projectName: "", //项目名称	varchar(64) [e描述_64]			y		项目名称
        remark: "", //备注	varchar(512) [e描述_512]			y		备注
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        version: "", //数据版本	int [e数字Int10]			y	默认值:0数据版本
        blNo:"",//提单号
        extBlNo:"",//外部提单号
      };
      this.fiPaymentItems.unshift(data);
    },
    delItem() {
      if (!this.selectioned) {
        this.$openWarning("未选择数据");
        return false;
      }
      this.$confirm("删除行后无法恢复，是否确认删除？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.selectioned.id) {
          delPaymentDetail({
            id: this.selectioned.id,
            version: this.selectioned.version,
            paymentCode: this.payment.paymentCode,
            paymentVersion: this.payment.version
          }).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.getPaymentDetailArray();
            }
          });
        } else {
          this.deleIndex(this.selectioned);
        }
      });
    },
    //删除方法
    deleIndex(e) {
      let del = this.fiPaymentItems.findIndex(item => {
        if (e.id) {
          return item.id == e.id;
        } else {
          return item.one == e.one;
        }
      });
      this.fiPaymentItems.splice(del, 1);
    },
    postData() {
      this.fiPaymentItems.forEach(item => {
        item.payAmtBase = this.$calculationAmount(
          item.payAmt,
          this.paymentDetail.baseCurrencyRate,
          "mul"
        );
      });
      let subtitle = "付款明细行中";
      let params = {
        documentNo: `${subtitle}业务单据编号`,
        payAmt: `${subtitle}付款金额（业务币）`,
        moneyContent: `${subtitle}款项内容`
      };
      let priceValid = {
        payAmt: `${subtitle}付款金额（业务币）`
      };
      let uniqueKeyArray = ["documentNo", "moneyContent", "blNo"]; //验证组合唯一性
      if (this.$validateArray(this.fiPaymentItems, params)) {
        if (valiUnique.call(this, this.fiPaymentItems, uniqueKeyArray)) {
        } else {
          return false;
        }
        if (this.$validateArrayPrice(this.fiPaymentItems, priceValid)) {
          this.$emit("getData", this.fiPaymentItems);
          return true;
        }
      } else {
        return false;
      }
    },
    //获取明细
    getPaymentDetailArray() {
      if (this.id == 0) {
        this.setAPaymentDetailArray(); //新建时带入合同数组
        return;
      }
      getPaymentDetail({ paymentCode: this.id }).then(res => {
        if (res.code === "success") {
          this.fiPaymentItems = res.data;
          this.payApplyCode = res.data[0].payApplyCode;
          this.documentType = res.data[0].documentType;
        }
      });
    },
    //新增设带入明细
    setAPaymentDetailArray() {
      if(this.status!=-1){
          getPaymentItemDetail({
            payApplyCode: this.paymentDetail.paymentMain.payApplyCode
          }).then(res => {
            if (res.code === "success") {
              this.fiPaymentItems = filterArray.call(this, res.data);
            }
          });
      }
      function filterArray(arr) {
        this.getParitiesForIssue();
        let fillterArr = arr.filter(item => {
          return item.residueLimit > 0;
        });
        let templateArr = [];
        let keyObj = {
          10540005: "contractNoS",
          10540010: "poNo",
          10540015: "soNo",
          10540020: "erpCostsCode"
        };
        fillterArr.forEach(item => {
          let noe = new Date().valueOf();
          let data = {
            edit: false,
            itemsRowNo: noe,
            id: "", //id	varchar(32) [e描述_32]	y		y		付款单明细id
            payApplyitemsId: item.id, //付款申请明细id	varchar(32) [e描述_32]			y		付款申请明细id
            paymentCode: "", //付款单号	varchar(64) [e描述_64]			y		付款单号
            payApplyRowNo: item.payRowNo, //付款申请单行号	varchar(32) [e描述_32]			y		付款申请单行号
            orgCode: this.paymentDetail.paymentMain.orgCode, //部门编码	varchar(32) [e描述_32]			y		部门编码
            orgName: this.paymentDetail.paymentMain.orgName, //部门名称	varchar(128) [e描述_128]			y		部门名称
            payApplyCode: item.payApplyCode, //付款申请单号	varchar(64) [e描述_64]			y		付款申请单号
            applyAmt: item.itemApplyAmt, //申请金额	decimal(20,6) [d(20,6)小数]			y		申请金额
            residueLimit : item.residueLimit, //剩余金额
            blNo:item.blNo,//提单号
            extBlNo:item.extBlNo,//外部提单号
            payedAmt: 0, //已付款金额	decimal(20,6) [d(20,6)小数]			y		已付款金额;默认为空，如抬头无付款申请标识不为空，则该字段显示为空，如抬头无付款申请标识为空，则该字段通过计算该行项目付款申请单下已付款的金额合计得出
            payAmt: item.residueLimit, //付款金额	decimal(20,6) [d(20,6)小数]			y		付款金额
            moneyContent: item.moneyContent, //款项内容
            payAmtBase: "", //付款金额本位币	decimal(20,6) [d(20,6)小数]			y		付款金额本位币
            documentType: this.paymentDetail.documentType, //业务单据类型	int [e字典Int8]			y		业务单据类型
            documentNo: item[keyObj[this.paymentDetail.documentType]], //业务单据编号	varchar(64) [e描述_64]			y		业务单据编号
            extContractNo: item.extContractNo, //外部合同号	varchar(64) [e描述_64]			y		外部合同号
            extInvoiceNo: item.soInvoiceNo ? item.soInvoiceNo : "", //外销发票号	varchar(64) [e描述_64]			y		外销发票号
            projectCode: item.projectCode, //项目编码	varchar(64) [e描述_64]			y		项目编码
            projectName: item.projectName, //项目名称	varchar(64) [e描述_64]			y		项目名称
            remark: item.remark, //备注	varchar(512) [e描述_512]			y		备注
            isInactive: item.isInactive, //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
            version: "" //数据版本	int [e数字Int10]			y	默认值:0数据版本
          };
          templateArr.push(data);
        });
        this.documentType=this.paymentDetail.documentType;
        return templateArr;
      }
    },
    showTip() {
      this.paymentItemShow = true;
    },
    paymentItemSure(e) {
      let keyObj = {
        10540005: "contractNoS",
        10540010: "poNo",
        10540015: "soNo",
        10540020: "erpCostsCode"
      };
      let documentType = this.documentType
        ? this.documentType
        : this.fiPaymentItems[0].documentType;
      let template = this.selectioned;
      if (
        e.residueLimit > 0 // 结清后不能添加
      ) {
        template.payApplyitemsId = e.id; //付款申请明细id	varchar(32) [e描述_32]			y		付款申请明细id
        template.payApplyRowNo = e.payRowNo; //付款申请单行号	varchar(32) [e描述_32]			y		付款申请单行号
        template.orgCode = this.paymentDetail.paymentMain.orgCode; //部门编码	varchar(32) [e描述_32]			y		部门编码
        template.orgName = this.paymentDetail.paymentMain.orgName; //部门名称	varchar(128) [e描述_128]			y		部门名称
        template.payApplyCode = e.payApplyCode; //付款申请单号	varchar(64) [e描述_64]			y		付款申请单号
        template.applyAmt = e.itemApplyAmt; //申请金额	decimal(20,6) [d(20,6)小数]			y		申请金额
        template.payedAmt = 0; //已付款金额	decimal(20,6) [d(20,6)小数]			y		已付款金额;默认为空，如抬头无付款申请标识不为空，则该字段显示为空，如抬头无付款申请标识为空，则该字段通过计算该行项目付款申请单下已付款的金额合计得出
        template.payAmt = e.residueLimit; //付款金额	decimal(20,6) [d(20,6)小数]			y		付款金额
        template.residueLimit = e.residueLimit //剩余金额
        template.blNo = e.blNo //提单号
        template.extBlNo = e.extBlNo //外部提单号
        template.payAmtBase = ""; //付款金额本位币	decimal(20,6) [d(20,6)小数]			y		付款金额本位币
        template.documentType = documentType; //业务单据类型	int [e字典Int8]			y		业务单据类型
        template.documentNo = e[keyObj[documentType]]; //业务单据编号	varchar(64) [e描述_64]			y		业务单据编号
        template.extContractNo = e.extContractNo; //外部合同号	varchar(64) [e描述_64]			y		外部合同号
        (template.moneyContent = e.moneyContent), //款项内容
          (template.extInvoiceNo = e.soInvoiceNo ? e.soInvoiceNo : ""); //外销发票号	varchar(64) [e描述_64]			y		外销发票号
        template.projectCode = e.projectCode; //项目编码	varchar(64) [e描述_64]			y		项目编码
        template.projectName = e.projectName; //项目名称	varchar(64) [e描述_64]			y		项目名称
        template.remark = e.remark; //备注	varchar(512) [e描述_512]			y		备注
        template.isInactive = e.isInactive; //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        this.paymentItemShow = false;
      } else {
        this.$message({ message: "当前明细已结清", type: "warning" });
      }
    },
     //根据公司id和业务币别获取本位币汇率
    getParitiesForIssue(){
        getBaseParitiesByCompanyId({
          companyId:this.paymentDetail.paymentMain.companyId,
          fromCurrencyCode: this.paymentDetail.paymentMain.currencyCode,
      }).then((res) => {
        this.paymentDetail.baseCurrencyRate = res.data.parities;
      }).catch((err) => { })
    },
    paymentItemCancle() {
      this.paymentItemShow = false;
    },
    payAmtChangeHandler(value) {
      if (value > this.fiPaymentItems[this.index].residueLimit) {
        this.$message({
          message: "付款金额大于剩余额度,请重新输入",
          type: "warning"
        });
        this.fiPaymentItems[this.index].payAmt = 0;
      }
    }
  },
  // activated() {
  //    console.log("33333");
  //   this.getPaymentDetailArray();
  // },
  mounted() {
    this.isBusiness=sessionStorage.getItem("isBusiness");
    this.getPaymentDetailArray();
  }
};
function valiUnique(params, eleNameArray) {
  let flag = true;
  let templateArray = [];
  let self = this;
  params.forEach(item => {
    let templateValue = "";
    templateValue =
      item[eleNameArray[0]] + item[eleNameArray[1]] + item[eleNameArray[2]];
    templateArray.push(templateValue);
  });
  let filtterArray = Array.from(new Set(templateArray)); //去重后单据数组
  if (filtterArray.length == templateArray.length) {
    return flag;
  } else {
    flag = false;
    self.$message({
      message: `存在单据号、款项内容、提单号都一样的单据`,
      type: "error"
    });
    return flag;
  }
}
</script>
<style lang="scss" scoped>
.table-div {
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  text-align: left;
  .tip-select {
    position: relative;
    .comicon {
      width: 100%;
      height: 20px;
      position: absolute;
      right: 0px;
      top: 7px;
      cursor: pointer;
      text-align: right;
    }
  }
}
</style>
