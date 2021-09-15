<template>
  <div class="table-div" v-show="status!=-1 &&  isBusiness!=1">
    <el-form  :disabled="flag!==0&&!conUseBills" style="height:100%">
      <div class="button-div">
        <el-button
          class="query-button"
          v-show="flag&&conUseBills"
          @click="addList"
          icon="el-icon-plus"
        >增加行</el-button>
        <el-button @click="delItem" v-show="flag&&conUseBills" icon="el-icon-minus">刪除行</el-button>
      </div>
      <el-table
        border
        center
        ref="multipleTable"
        :data="fiPaymentBillItems"
        tooltip-effect="dark"
        class="el-table"
        height="calc(100% - 26px)"
        @selection-change="handleChange"
        @row-dblclick="dblclick"
        @row-click="rowClick"
        @select-all="dialogCheck"
        @select="dialogCheck"
        v-loading="loading"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" width="50" :index="indexMethod" label="行号"></el-table-column>
        <el-table-column prop="orgName" label="部门"></el-table-column>
        <el-table-column prop="instrumentBillNo" label="票据台账编号">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input size="mini" v-model="scope.row.instrumentBillNo" placeholder="请输入"></el-input>
              <span class="comicon" @click="showTip"></span>
            </div>
            <div v-else>{{ scope.row.instrumentBillNo }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="instrumentNo" label="票据号" width="140"></el-table-column>
        <el-table-column prop="invoiceType" label="票据类型">
          <template slot-scope="scope">
            <span>{{ invoiceTypeObj[scope.row.invoiceType] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="billAmt" label="票据金额"></el-table-column>
        <el-table-column prop="bankMarginRatio" label="保证金比率(百分比)"></el-table-column>
      </el-table>
      <!-- 应收票据选择弹窗 -->
      <fi-gathering-bill-popup
        v-if="gatheringBillShow"
        :tipShow="gatheringBillShow"
        :searchOptions="{companyCode:this.paymentDetail.paymentMain.companyCode,currencyCode:this.paymentDetail.paymentMain.currencyCode}"
        :instrumentStatus="10270015"
        :isRadio="true"
        @tipsCancle="gatheringBillCancle"
        @tipsSure="gatheringBillSure"
      ></fi-gathering-bill-popup>
      <!-- 应付票价据选择弹窗 -->
      <fi-payment-bill-popup
        v-if="paymentBillShow"
        :tipShow="paymentBillShow"
        :searchOptions="{companyCode:this.paymentDetail.paymentMain.companyCode,currencyCode:this.paymentDetail.paymentMain.currencyCode,receiptByCode:this.paymentDetail.paymentMain.receiverCode,invoiceType:this.invoiceType}"
        :isRadio="true"
        @tipsCancle="paymentBillCancle"
        @tipsSure="paymentBillSure"
      ></fi-payment-bill-popup>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { invoiceTypeObj } from "../../dictionary";
import fiGatheringBillPopup from "@/components/fiGatheringBillPopup.vue";
import {
  getBillsByPaymentId,
  delConnectBill
} from "@/api/paymentManage/paymentDetail";
import fiPaymentBillPopup from "@/components/fiPaymentBillPopup.vue";
export default {
  name: "bottomTableSecond",
  components: { fiGatheringBillPopup, fiPaymentBillPopup },
  data() {
    return {
      invoiceTypeObj,
      fiPaymentBillItems: [],
      loading: false,
      paymentBillShow: false, //应付票据
      gatheringBillShow: false, //应收票据
      invoiceType: "", //过滤票据类型条件
      isBusiness:''
    };
  },
  computed: {
    ...mapState(["paymentDetail"]),
    conUseBills() {
      return [10310010, 10310020, 10310045].findIndex(
        item => item === this.paymentDetail.paymentMain.payType
      ) === -1
        ? false
        : true;
    },
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    paymentId() {
      return this.$store.state.route.params.paymentId;
    },
    status(){
       return this.$route.params.status;
    },
    id() {
      return this.$store.state.route.params.id;
    }
  },
  methods: {
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
        this.index = this.fiPaymentBillItems.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.fiPaymentBillItems.indexOf(e);
      this.fiPaymentBillItems.forEach(item => {
        item.edit = false;
      });
      this.fiPaymentBillItems[index].edit = true;
      this.selectioned = e;
      this.index = this.fiPaymentBillItems.indexOf(e);
      this.$set(this.fiPaymentBillItems, this.fiPaymentBillItems.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.fiPaymentBillItems.indexOf(e);
    },
    //创建数据
    addList() {
      this.fiPaymentBillItems.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        id: "", //id	varchar(32) [e描述_32]	y		y		付款单明细id
        paymentId: "", //付款单	varchar(32) [e描述_32]			y		付款单id
        itemsRowNo: "", //付款票据明细行号	varchar(32) [e描述_32]			y		付款票据明细行号
        orgId: this.paymentDetail.paymentMain.orgId, //组织id	varchar(32) [e描述_32]			y		组织id
        orgCode: this.paymentDetail.paymentMain.orgCode, //部门编码	varchar(32) [e描述_32]			y		部门编码
        orgName: this.paymentDetail.paymentMain.orgName, //部门名称	varchar(128) [e描述_128]			y		部门名称
        instrumentBillNo: "", //票据台账编号	varchar(64) [e描述_64]			y		保存时系统自动按照流水号给出10位流水号，系统自动生成2000000000～2999999999
        instrumentNo: "", //票据号	varchar(64) [e描述_64]			y		票据号,创建时，录入票据号后，系统自动检查该票据号是否已经存在，如果存在，则系统自动带着对应票据信息。
        invoiceType: "", //票据类型	int [e字典Int8]			y		(dictNo=2067)票据类型,b(银行承兑),d（商业承兑），3（应收款链）
        billAmt: "", //票据金额	decimal(20,6) [d(20,6)小数]			y		票据金额
        bankMarginRatio: "", //保证金比率(百分比)	decimal(20,6) [d(20,6)小数]			y		保证金比率(百分比)
        billSource: "", //数据来源	int [b布尔型]			y	默认值:0数据来源，1：应付；0：应收
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        version: "" //数据版本	int [e数字Int10]			y	默认值:0数据版本
      };
      this.fiPaymentBillItems.unshift(data);
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
          delConnectBill(this.selectioned).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.getBills();
            }
          });
        } else {
          this.deleIndex(this.selectioned);
        }
      });
    },
    //删除方法
    deleIndex(e) {
      let del = this.fiPaymentBillItems.findIndex(item => {
        if (e.id) {
          return item.id == e.id;
        } else {
          return item.one == e.one;
        }
      });
      this.fiPaymentBillItems.splice(del, 1);
    },
    postData() {
      let isBusiness=sessionStorage.getItem("isBusiness");
      if(isBusiness==0){
         if (this.fiPaymentBillItems.length===0) {
          this.$message({
            message: `票据不能为空`,
            type: "error"
          });
          return false;
        }
        let subtitle = "票据明细行中";
        let params = {
          instrumentBillNo: `${subtitle}票据台账编号`
        };
        if (this.$validateArray(this.fiPaymentBillItems, params)) {
          this.$emit("getData", this.fiPaymentBillItems);
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    //获取明细
    getBills() {
      if (this.id === 0) {
        return;
      }
      getBillsByPaymentId({
        paymentId: this.paymentId
      }).then(res => {
        if (res.code === "success") {
          this.fiPaymentBillItems = res.data;
        }
      });
    },
    showTip() {
      if (
        [10310010, 10310020].findIndex(
          item => item === this.paymentDetail.paymentMain.payType
        ) !== -1
      ) {
        let Obj = {
          10310010: 10870005,
          10310020: 10870010
        }; //收款类型转票据类型
        this.invoiceType = Obj[this.paymentDetail.paymentMain.payType];
        this.paymentBillShow = true;
      } else {
        this.gatheringBillShow = true;
      }
    },
    //应付票据关闭
    paymentBillCancle() {
      this.paymentBillShow = false;
    },
    //应付票据选择
    paymentBillSure(e) {
      let item = e;
      let template = this.selectioned;
      if (
        this.fiPaymentBillItems
          .map(item => item.instrumentBillNo)
          .findIndex(it => it === e["instrumentBillNo"]) === -1
      ) {
        template.id = ""; //id	varchar(32) [e描述_32]	y		y		付款单明细id
        template.paymentId =
          this.id === 0
            ? ""
            : this.paymentDetail.paymentMain.id
            ? this.paymentDetail.paymentMain.id
            : ""; //付款单	varchar(32) [e描述_32]			y		付款单id
        template.orgId = this.paymentDetail.paymentMain.orgId; //组织id	varchar(32) [e描述_32]			y		组织id
        template.orgCode = this.paymentDetail.paymentMain.orgCode; //部门编码	varchar(32) [e描述_32]			y		部门编码
        template.orgName = this.paymentDetail.paymentMain.orgName; //部门名称	varchar(128) [e描述_128]			y		部门名称
        template.instrumentBillNo = item.instrumentBillNo; //票据台账编号	varchar(64) [e描述_64]			y		保存时系统自动按照流水号给出10位流水号，系统自动生成2000000000～2999999999
        template.instrumentNo = item.instrumentNo; //票据号	varchar(64) [e描述_64]			y		票据号,创建时，录入票据号后，系统自动检查该票据号是否已经存在，如果存在，则系统自动带着对应票据信息。
        template.invoiceType = item.invoiceType; //票据类型	int [e字典Int8]			y		(dictNo=2067)票据类型,b(银行承兑),d（商业承兑），3（应收款链）
        template.billAmt = item.billAmt; //票据金额	decimal(20,6) [d(20,6)小数]			y		票据金额
        template.bankMarginRatio = item.bankMarginRatio; //保证金比率(百分比)	decimal(20,6) [d(20,6)小数]			y		保证金比率(百分比)
        template.billSource = 1; //数据来源	int [b布尔型]			y	默认值:0数据来源，1：应付；0：应收
        template.isInactive = item.isInactive; //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        this.paymentBillShow = false;
      } else {
        this.$message({ message: "当前票据已添加", type: "warning" });
      }
    },
    //应收票据关闭
    gatheringBillCancle() {
      this.gatheringBillShow = false;
    },
    gatheringBillSure(e) {
      let item = e;
      let template = this.selectioned;
      if (
        this.fiPaymentBillItems
          .map(item => item.instrumentBillNo)
          .findIndex(it => it === e["instrumentBillNo"]) === -1
      ) {
        template.id = ""; //id	varchar(32) [e描述_32]	y		y		付款单明细id
        template.paymentId =
          this.id === 0
            ? ""
            : this.paymentDetail.paymentMain.id
            ? this.paymentDetail.paymentMain.id
            : ""; //付款单	varchar(32) [e描述_32]			y		付款单id
        template.orgId = this.paymentDetail.paymentMain.orgId; //组织id	varchar(32) [e描述_32]			y		组织id
        template.orgCode = this.paymentDetail.paymentMain.orgCode; //部门编码	varchar(32) [e描述_32]			y		部门编码
        template.orgName = this.paymentDetail.paymentMain.orgName; //部门名称	varchar(128) [e描述_128]			y		部门名称
        template.instrumentBillNo = item.instrumentBillNo; //票据台账编号	varchar(64) [e描述_64]			y		保存时系统自动按照流水号给出10位流水号，系统自动生成2000000000～2999999999
        template.instrumentNo = item.instrumentNo; //票据号	varchar(64) [e描述_64]			y		票据号,创建时，录入票据号后，系统自动检查该票据号是否已经存在，如果存在，则系统自动带着对应票据信息。
        template.invoiceType = item.instrumentType; //票据类型	int [e字典Int8]			y		(dictNo=2067)票据类型,b(银行承兑),d（商业承兑），3（应收款链）
        template.billAmt = item.instrumentAmt; //票据金额	decimal(20,6) [d(20,6)小数]			y		票据金额
        template.bankMarginRatio = item.bankMarginRatio; //保证金比率(百分比)	decimal(20,6) [d(20,6)小数]			y		保证金比率(百分比)
        template.billSource = 0; //数据来源	int [b布尔型]			y	默认值:0数据来源，1：应付；0：应收
        template.isInactive = item.isInactive; //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        this.gatheringBillShow = false;
      } else {
        this.$message({ message: "当前票据已添加", type: "warning" });
      }
    },
    //清空票据
    clearBills(){
      this.fiPaymentBillItems=[];
    }
  },
  // activated() {
  //   this.getBills();
  // },
  mounted(){
      this.isBusiness=sessionStorage.getItem("isBusiness");
    this.getBills();
  }
};
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
