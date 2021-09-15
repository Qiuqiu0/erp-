<template>
  <div class="bottomTabFirst">
    <div class="button-div">
      <el-button class="query-button" @click="addList" icon="el-icon-plus">复制行</el-button>
      <el-button @click="delItem" icon="el-icon-minus">刪除行</el-button>
    </div>
    <div></div>
    <el-table
      border
      center
      :data="fiGatheringItems"
      class="el-table"
      height="calc(100% - 26px)"
      ref="multipleTable"
      @selection-change="handleChange"
      @row-dblclick="dblclick"
      @row-click="rowClick"
      @select-all="dialogCheck"
      @select="dialogCheck"
      v-loading="loading"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column type="index" width="120" :index="indexMethod" label="行号"></el-table-column>
      <el-table-column prop="docType" label="单据类型" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.edit" class="tip-select">
            <el-select v-model="scope.row.docType" size="mini" placeholder="请选择">
              <el-option
                v-for="item in docTypeOptions"
                :key="item.dict_key"
                :label="item.dict_value"
                :value="item.dict_key"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </div>
          <div v-else>{{ docTypeObj[scope.row.docType] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="docNo" label="单据号" width="140">
        <template slot-scope="scope">
          <div v-if="scope.row.edit" class="tip-select">
            <el-input size="mini" v-model="scope.row.docNo" placeholder="请选择"></el-input>
            <span class="comicon" @click="docNoTip(scope.row.docType)"></span>
          </div>
          <div v-else>{{ scope.row.contractNo }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="extContractNo" label="外部合同号" width="120">
        <template slot-scope="scope">
          <div>{{ scope.row.extContractNo }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="soInvoiceNo" label="外销发票号" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input size="mini" v-model="scope.row.soInvoiceNo" placeholder="请输入"></el-input>
          </div>
          <div v-else>{{ scope.row.soInvoiceNo }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="bizPersonName" label="业务员" width="120">
        <template slot-scope="scope">
          <div>{{ scope.row.bizPersonName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="shareAmt" label="认领金额" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input
              size="mini"
              type="number"
              v-input-filter:price
              :key="scope.row|row2key('shareId','shareAmt')"
              @change="shareAmtChangeHandler"
              v-model="scope.row.shareAmt"
              placeholder="请输入"
            ></el-input>
          </div>
          <div v-else>{{ scope.row.shareAmt }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="shareAmtBase" label="认领金额（本位币）" width="150">
        <template slot-scope="scope">
          <div>{{String(scope.row.shareAmt *currentcyRateBase).replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="shareAmtBase" label="认领金额（人民币）" width="150">
        <template slot-scope="scope">
          <div>{{String(scope.row.shareAmt *currencyRateRmb).replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="foreignFee" label="外币扣费" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input
              size="mini"
              type="number"
              v-input-filter:price
              :key="scope.row|row2key('shareId','foreignFee')"
              v-model="scope.row.foreignFee"
              @change="foreignFeeChangeHandler"
              placeholder="请输入"
            ></el-input>
          </div>
          <div v-else>{{ scope.row.foreignFee }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="baseFee" label="本币扣费" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input
              size="mini"
              type="number"
              v-input-filter:price
              :key="scope.row|row2key('shareId','baseFee')"
              v-model="scope.row.baseFee"
              @change="baseFeeChangeHandler"
              placeholder="请输入"
            ></el-input>
          </div>
          <div v-else>{{ scope.row.baseFee }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="payeeCategory" label="收款类别" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-select v-model="scope.row.payeeCategory" size="mini" placeholder="请选择">
              <el-option
                v-for="item in payeeCategoryOptions"
                :key="item.dict_key"
                :label="item.dict_value"
                :value="item.dict_key"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </div>
          <div v-else>{{ payeeCategoryObj[scope.row.payeeCategory] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="50">
        <template slot-scope="scope">
          <div>{{ claimStatusObj[scope.row.status] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input
              size="mini"
              v-model="scope.row.remark"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
            ></el-input>
          </div>
          <div v-else>{{ scope.row.remark }}</div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :departztz="0"
      :data="companyName"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    ></department-select>
    <!-- 销售合同弹窗 -->
    <od-so-contract-popup
      v-if="odSoContractShow"
      :isRadio="true"
      :tipShow="odSoContractShow"
      :searchOptions="{companyCode:gatheringItem.companyCode,custCode:gatheringItem.payCompanyCode}"
      @tipsCancle="odSoContractCancle"
      @tipsSure="odSoContractSure"
    ></od-so-contract-popup>
    <!-- 销售发票弹窗 -->
    <ext-invoice-popup
      v-if="extInvoiceShow"
      :isRadio="true"
      :tipShow="extInvoiceShow"
      :searchOptions="{companyCode:gatheringItem.companyCode,custCode:gatheringItem.payCompanyCode}"
      @tipsCancle="extInvoiceCancle"
      @tipsSure="extInvoiceSure"
    ></ext-invoice-popup>
    <!-- 采购合同弹窗 -->
    <od-po-contract-popup
      v-if="odPoContractShow"
      :isRadio="true"
      :tipShow="odPoContractShow"
      :searchOptions="{companyCode:gatheringItem.companyCode,supplierCode:gatheringItem.payCompanyCode}"
      @tipsCancle="odPoContractCancle"
      @tipsSure="odPoContractSure"
    ></od-po-contract-popup>
    <!-- 费用弹窗 -->
    <cost-settle-popup
      v-if="costSettleShow"
      :isRadio="true"
      :tipShow="costSettleShow"
      :searchOptions="{companyCode:gatheringItem.companyCode,supplierCode:gatheringItem.payCompanyCode}"
      @tipsCancle="costSettleCancle"
      @tipsSure="costSettleSure"
    ></cost-settle-popup>
  </div>
</template>
<script>
import {
  getClaimDetail,
  delClaimDetail
} from "@/api/creditManage/reclaimDetail";
import departmentSelect from "@/components/departmentSelect.vue";
import odSoContractPopup from "@/components/odSoContractPopup";
import odPoContractPopup from "@/components/odPoContractPopup";
import extInvoicePopup from "@/components/extInvoicePopup";
import costSettlePopup from "@/views/fundsManage/conponents/costSettlePopup";
import { payeeCategoryObj, docTypeObj, claimStatusObj } from "../../dictionary";
import {
  payeeCategoryOptions,
  docTypeOptions
} from "@/api/creditManage/selectOptions";
export default {
  name: "bottomTabFirst",
  props: {
    currentcyRateBase: {
      // required: true,
      type: Number | String
    },
    currencyRateRmb: {
      type: Number | String
    },
    gatheringItem: {
      type: Object,
      default: Object
    }
  },
  components: {
    departmentSelect,
    odSoContractPopup,
    extInvoicePopup,
    odPoContractPopup,
    costSettlePopup
  },
  data() {
    return {
      docTypeObj,
      payeeCategoryObj,
      claimStatusObj,
      payeeCategoryOptions: [],
      docTypeOptions: [],
      fiGatheringItems: [
        // {
        //   shareId: "", //认领id	varchar(32) [e描述_32]	y		y		认领id
        //   gatheringItemsId: "", //收款明细id	varchar(32) [e描述_32]			y		收款明细id
        //   rowno: "", //行号	字段生成，流水号
        //   docNo: "", //单据号
        //   docType: "", //单据类型	 下拉列表：销售合同，采购合同，费用单据
        //   contractNo: "", //合同号	开窗选择（需要根据单据类型+付款单位条件限定合同范围）
        //   extContractNo: "", //外部合同号	根据选择合同带出
        //   soInvoiceNo: "", //外销发票号	手工输入
        //   shareAmt: "", //认领金额 手工输入
        //   payeeAmt: "", //收款金额
        //   payeeCategory: "", //收款类型	下拉列表：
        //   shareAmtBase: "", //认领金额(本位币)	根据认领金额带出（认领金额*本位币汇率）
        //   foreignFee: "", //外币扣费  手工输入
        //   baseFee: "", //本币扣费  手工输入
        //   remark: "" //手工输入
        // }
      ],
      index: 0,
      loading: false,
      departmentShow: false,
      companyName: {},
      extInvoiceShow: false, //销售发票
      odSoContractShow: false,
      odPoContractShow: false,
      costSettleShow: false
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    //认领金额
    total() {
      let total = 0;
      if (this.fiGatheringItems.length > 0) {
        this.fiGatheringItems.forEach(item => {
          total = this.$calculationAmount(total, item.shareAmt, "add");
        });
      }
      return total;
    },
    //外币扣费
    foreignFeeTotal() {
      let total = 0;
      if (this.fiGatheringItems.length > 0) {
        this.fiGatheringItems.forEach(item => {
          total = this.$calculationAmount(total, item.foreignFee, "add");
        });
      }
      return total;
    },
    baseFeeTotal() {
      let total = 0;
      if (this.fiGatheringItems.length > 0) {
        this.fiGatheringItems.forEach(item => {
          total = this.$calculationAmount(total, item.baseFee, "add");
        });
      }
      return total;
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
        this.index = this.fiGatheringItems.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.fiGatheringItems.indexOf(e);
      this.fiGatheringItems.forEach(item => {
        item.edit = false;
      });
      if (
        (claimStatusObj[e.status] == "已提交" ||
          claimStatusObj[e.status] == "已审核") &&
        payeeCategoryObj[e.payeeCategory] == "A:收款" &&
        payeeCategoryObj[this.gatheringItem.payeeCategory]
      ) {
        this.$message({ message: "当前状态不允许修改", type: "warning" });
        return;
      }
      this.fiGatheringItems[index].edit = true;
      this.selectioned = e;
      this.index = this.fiGatheringItems.indexOf(e);
      this.$set(this.fiGatheringItems, this.fiGatheringItems.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.fiGatheringItems.indexOf(e);
    },
    //创建数据
    addList() {
      this.fiGatheringItems.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        rowno: "",
        one: noe,
        shareId: "", //认领id	varchar(32) [e描述_32]	y		y		认领id
        gatheringItemsId: "", //收款明细id	varchar(32) [e描述_32]			y		收款明细id
        docNo: "", //单据号
        docType: "", //单据类型	 下拉列表：销售合同，采购合同，费用单据
        contractNo: "", //合同号	开窗选择（需要根据单据类型+付款单位条件限定合同范围）
        extContractNo: "", //外部合同号	根据选择合同带出
        soInvoiceNo: "", //外销发票号	手工输入
        shareAmt: this.gatheringItem.payeeAmtOrigin - this.total, //认领金额 手工输入
        payeeAmt: "", //收款金额
        payeeCategory: "", //收款类型	下拉列表：
        shareAmtBase: "", //认领金额(本位币)	根据认领金额带出（认领金额*本位币汇率）
        shareAmtRmb: "", //认领金额人民币
        foreignFee: "", //外币扣费  手工输入
        baseFee: "", //本币扣费  手工输入
        remark: "" //手工输入
      };
      this.fiGatheringItems.unshift(data);
    },
    delItem() {
      if (!this.selectioned) {
        this.$openWarning("未选择数据");
        return false;
      }
      if (
        this.selectioned.status &&
        claimStatusObj[this.selectioned.status] != "保存"
      ) {
        this.$message({ message: "当前状态不允许删除", type: "warning" });
        return;
      }
      this.$confirm("删除行后无法恢复，是否确认删除？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.selectioned.status) {
          delClaimDetail({
            shareId: this.selectioned.shareId,
            version: this.selectioned.version
          }).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.getClaimDetail();
            }
          });
        }
        this.deleIndex(this.selectioned);
      });
    },
    //删除方法
    deleIndex(e) {
      let del = this.fiGatheringItems.findIndex(item => {
        if (e.shareId) {
          return item.shareId == e.shareId;
        } else {
          return item.one == e.one;
        }
      });
      this.fiGatheringItems.splice(del, 1);
    },
    departmentTip() {
      this.departmentShow = false;
    },
    //部门弹窗关闭
    departmentCancle() {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.departmentShow = false;
      this.fiGatheringItems[this.index].orgName = e.branchName;
      this.fiGatheringItems[this.index].orgCode = e.branchCode;
    },
    shareAmtChangeHandler(val) {
      if (this.total > this.gatheringItem.payeeAmtOrigin) {
        this.$message({
          message: "认领金额大于收款金额,请重新输入",
          type: "warning"
        });
        this.fiGatheringItems[this.index].shareAmt = 0;
      }
    },
    foreignFeeChangeHandler() {
      if (this.foreignFeeTotal > this.gatheringItem.fcFeeOrigin) {
        this.$message({
          message: "外币扣费金额大于抬头外币扣费,请重新输入",
          type: "warning"
        });
        this.fiGatheringItems[this.index].foreignFee = 0;
      }
    },
    baseFeeChangeHandler() {
      if (this.baseFeeTotal > this.gatheringItem.bcFee) {
        this.$message({
          message: "本币扣费金额大于抬头本币扣费,请重新输入",
          type: "warning"
        });
        this.fiGatheringItems[this.index].baseFee = 0;
      }
    },
    postData() {
      this.fiGatheringItems.forEach(item => {
        //认领金额（本位币）字段
        item.shareAmtBase = this.$calculationAmount(
          item.shareAmt,
          this.currentcyRateBase,
          "mul"
        );
        //认领金额（人民币）字段
        item.shareAmtRmb = this.$calculationAmount(
          item.shareAmt,
          this.currencyRateRmb,
          "mul"
        );
      });
      let subtitle = "认领明细行中";
      let params = {
        docType: `${subtitle}单据类型`,
        docNo: `${subtitle}单据号`,
        shareAmt: `${subtitle}认领金额`,
        payeeCategory: `${subtitle}收款类别`
      };
      let priceValid = {
        shareAmt: `${subtitle}认领金额`
      };
      if (this.$validateArray(this.fiGatheringItems, params)) {
        if (this.$validateArrayPrice(this.fiGatheringItems, priceValid)) {
          this.$emit("getData", this.fiGatheringItems);
          return true;
        }
      } else {
        return false;
      }
    },
    docNoTip(docType) {
      switch (docType) {
        case 10530005:
          this.odSoContractShow = true;
          break;
        case 10530010:
          this.extInvoiceShow = true;
          break;
        case 10530015:
          this.odPoContractShow = true;
          break;
        case 10530020:
          this.costSettleShow = true;
          break;
        default:
          this.$message({
            message: "请选择单据类型",
            type: "error"
          });
          break;
      }
    },
    //销售合同弹窗关闭
    odSoContractCancle() {
      this.odSoContractShow = false;
    },
    //销售合同弹窗确定获取数据
    odSoContractSure(e) {
      if (this.setDocNo(e)) {
        this.odSoContractShow = false;
      }
    },
    //销售发票弹窗关闭
    extInvoiceCancle() {
      this.extInvoiceShow = false;
    },
    //销售发票弹窗确定获取数据
    extInvoiceSure(e) {
      if (this.setDocNo(e)) {
        this.extInvoiceShow = false;
      }
    },
    //采购合同弹窗关闭
    odPoContractCancle() {
      this.odPoContractShow = false;
    },
    //采购合同弹窗确定获取数据
    odPoContractSure(e) {
      if (this.setDocNo(e)) {
        this.odPoContractShow = false;
      }
    },
    //费用弹窗关闭
    costSettleCancle() {
      this.costSettleShow = false;
    },
    //费用弹窗确定获取数据
    costSettleSure(e) {
      if (this.setDocNo(e)) {
        this.costSettleShow = false;
      }
    },
    setDocNo(e) {
      let template = this.selectioned;
      let keyObj = {
        10530005: "soContractNo",
        10530010: "invoiceCode",
        10530015: "poNo",
        10530020: "erpCostsCode"
      };
      let item = e[0];
      // if (
      //   this.fiGatheringItems
      //     .map(item => item.docNo)
      //     .findIndex(it => it === item[keyObj[template.docType]]) === -1
      // ) {
      template.docNo = item[keyObj[template.docType]];
      template.extContractNo = item.extCode
        ? item.extCode
        : item.extInvoiceCode;
      template.contractNo = item[keyObj[template.docType]];
      template.bizPersion = item.bizPersonCode;
      template.bizPersonName = item.bizPersonName;
      return true;
      // } else {
      //   this.$message({ message: "当前单据已添加", type: "warning" });
      //   return false;
      // }
    },
    //获取认领明细
    getClaimDetail() {
      if (this.id == 0) return;
      getClaimDetail({ gatheringItemsId: this.id }).then(res => {
        if (res.code === "success") {
          this.fiGatheringItems = res.data;
        }
      });
    },
    getPayeeCategoryOptions() {
      payeeCategoryOptions().then(res => {
        if (res.code === "success") {
          this.payeeCategoryOptions = res.data;
        }
      });
    },
    getDocTypeOptions() {
      docTypeOptions().then(res => {
        if (res.code === "success") {
          this.docTypeOptions = res.data;
        }
      });
    }
  },
  mounted() {
    this.getClaimDetail();
    this.getPayeeCategoryOptions();
    this.getDocTypeOptions();
  }
};
</script>
<style lang="scss" scoped>
.bottomTabFirst {
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
