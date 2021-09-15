<template>
  <div class="table-div">
    <el-form :disabled="flag!==1" style="height:100%">
      <div class="button-div">
        <el-button class="query-button" @click="addList" icon="el-icon-plus" v-show="flag">增加行</el-button>
        <el-button v-show="flag" @click="delItem" icon="el-icon-minus">刪除行</el-button>
      </div>
      <el-table
        border
        center
        :data="fiSettleApplyItems"
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
        <el-table-column type="index" width="60" :index="indexMethod" label="行号"></el-table-column>
        <el-table-column prop="businessType" label="业务类型" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <businessType-select :businessType.sync="scope.row.businessType"></businessType-select>
            </div>
            <div v-else>{{ businessTypeObj[scope.row.businessType]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="businessNo" label="业务单据编号" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input
                :disabled="scope.row.businessType===10740020"
                size="mini"
                v-model="scope.row.businessNo"
                placeholder="请输入"
              ></el-input>
              <span
                class="comicon"
                @click="showTip(scope.row.businessType)"
                v-show="scope.row.businessType!==10740020"
              ></span>
            </div>
            <div v-else>{{ scope.row.businessNo }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="contractAmount" label="合同金额" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                type="number"
                v-model="scope.row.contractAmount"
                :disabled="scope.row.businessType!==10740020"
                placeholder="请输入"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.contractAmount }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="invoiceCode" label="发票编号" width="110">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input size="mini" type="text" v-model="scope.row.invoiceCode" placeholder="请输入"></el-input>
            </div>
            <div v-else>{{ scope.row.invoiceCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="exchangeAmount" label="押汇金额" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                type="number"
                :key="scope.row|row2key('applyItemsId','exchangeAmount')"
                v-input-filter:price
                v-model="scope.row.exchangeAmount"
                placeholder="请输入"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.exchangeAmount }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="lockStartDate" label="锁汇开始日期">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-date-picker
                style="width:150px;"
                size="small"
                class="el-inputs"
                v-model="scope.row.lockStartDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
            <div v-else>{{ scope.row.lockStartDate|time2Date }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="lockEndDate" label="锁汇结束日期">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-date-picker
                style="width:150px;"
                size="small"
                class="el-inputs"
                v-model="scope.row.lockEndDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
            <div v-else>{{ scope.row.lockEndDate|time2Date }}</div>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="false">{{ total }}</div>
      <!-- 采购合同弹窗 -->
      <od-po-contract-popup
        v-if="odPoContractShow"
        :isRadio="true"
        :searchOptions="{companyCode:fiSettleApply.companyCode,orgCode:fiSettleApply.orgCode,currencyCode:fiSettleApply.lockCurrencyCode}"
        :tipShow="odPoContractShow"
        @tipsCancle="odPoContractCancle"
        @tipsSure="odPoContractSure"
      ></od-po-contract-popup>
      <!-- 销售合同弹窗 -->
      <od-so-contract-popup
        v-if="odSoContractShow"
        :isRadio="true"
        :searchOptions="{companyCode:fiSettleApply.companyCode,orgCode:fiSettleApply.orgCode,originCurrencyCode: fiSettleApply.lockCurrencyCode}"
        :tipShow="odSoContractShow"
        @tipsCancle="odSoContractCancle"
        @tipsSure="odSoContractSure"
      ></od-so-contract-popup>
      <!-- 信用证弹窗 -->
      <letter-credit-popup
        v-if="letterCreditShow"
        :isRadio="true"
        :searchOptions="{companyCode:fiSettleApply.companyCode,orgCode:fiSettleApply.orgCode,currencyCode: fiSettleApply.lockCurrencyCode}"
        :tipShow="letterCreditShow"
        @tipsCancle="letterCreditCancle"
        @tipsSure="letterCreditSure"
      ></letter-credit-popup>
    </el-form>
  </div>
</template>
<script>
import {
  delFiSettleApplyItem,
  getFiSettleApplyItemDetail
} from "@/api/fiSettleManage/fiSettleApplyDetail";
import { findBrothersComponents } from "@/assets/js/findComponents";
import businessTypeSelect from "@/views/fundsManage/conponents/businessTypeSelect";
import odSoContractPopup from "@/components/odSoContractPopup";
import odPoContractPopup from "@/components/odPoContractPopup";
import letterCreditPopup from "@/components/letterCreditPopup";
import { businessTypeObj } from "../../dictionary";
import { mapMutations } from "vuex";
export default {
  name: "bottomTableFirst",
  props: {
    fiSettleApply: {
      type: Object,
      default: Object
    }
  },
  components: {
    businessTypeSelect,
    odSoContractPopup,
    odPoContractPopup,
    letterCreditPopup
  },
  data() {
    return {
      businessTypeObj,
      fiSettleApplyItems: [],
      odSoContractShow: false,
      odPoContractShow: false,
      letterCreditShow: false,
      loading: false
    };
  },
  computed: {
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    id() {
      return this.$route.params.id;
    },
    total() {
      let total = 0;
      if (this.fiSettleApplyItems.length > 0) {
        this.fiSettleApplyItems.forEach(item => {
          total = this.$calculationAmount(total, item.exchangeAmount, "add");
        });
      }
      this.setLockAmtTotal(total);
      return total;
    }
  },
  methods: {
    ...mapMutations(["setLockAmtTotal"]),
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
        this.index = this.fiSettleApplyItems.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.fiSettleApplyItems.indexOf(e);
      this.fiSettleApplyItems.forEach(item => {
        item.edit = false;
      });
      this.fiSettleApplyItems[index].edit = true;
      this.selectioned = e;
      this.index = this.fiSettleApplyItems.indexOf(e);
      this.$set(this.fiSettleApplyItems, this.fiSettleApplyItems.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.fiSettleApplyItems.indexOf(e);
    },
    //创建数据
    async addList() {
      //验证表头相关必填项
      const topTabFirst = findBrothersComponents(this, "tabConFirst", false)[0];
      if (! await topTabFirst.getData()) return;
      this.fiSettleApplyItems.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        applyItemsId: "", //结售汇申请明细id	varchar(32) [e描述_32]	y		y		结售汇申请明细id
        settleApplyId: "", //结售汇申请id	varchar(32) [e描述_32]			y		结售汇申请id
        settleApplyCode: "", //申请单据编号	varchar(32) [e描述_32]			y		申请单据编号
        rowno: "", //行号	varchar(32) [e描述_32]			y		行号
        businessType: "", //业务类型	int [e字典Int8]			y		业务类型
        businessNo: "", //业务单据编号	varchar(32) [e描述_32]			y		业务单据编号
        contractAmount: "", //合同金额	decimal(20,6) [d(20,6)小数]			y		合同金额
        invoiceCode: "", //发票编号	varchar(32) [e描述_32]			y		发票编号
        exchangeAmount: "", //押汇金额	decimal(20,6) [d(20,6)小数]			y		押汇金额
        lockStartDate: "", //锁汇开始日期	datetime [e时间]			y		锁汇开始日期
        lockEndDate: "", //锁汇结束日期	datetime [e时间]			y		锁汇结束日期
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        version: "" //数据版本	int [e数字Int10]			y	默认值:0数据版本
      };
      this.fiSettleApplyItems.unshift(data);
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
        if (this.selectioned.applyItemsId) {
          delFiSettleApplyItem({
            applyItemsId: this.selectioned.applyItemsId,
            version: this.selectioned.version,
            fVersion:this.fiSettleApply.version

          }).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.getArray();
            }
          });
        } else {
          this.deleIndex(this.selectioned);
        }
      });
    },
    //删除方法
    deleIndex(e) {
      let del = this.fiSettleApplyItems.findIndex(item => {
        if (e.applyItemsId) {
          return item.applyItemsId == e.applyItemsId;
        } else {
          return item.one == e.one;
        }
      });
      this.fiSettleApplyItems.splice(del, 1);
    },
    postData() {
      let subtitle = "结汇申请明细";
      let params = {
        businessType: `${subtitle}业务类型`,
        exchangeAmount: `${subtitle}押汇金额`,
        lockStartDate: `${subtitle}锁汇开始日期`,
        lockEndDate: `${subtitle}锁汇结束日期`,
      };
      if (this.$validateArray(this.fiSettleApplyItems, params)) {
        this.$emit("getData", this.fiSettleApplyItems);
        return true;
      } else {
        return false;
      }
    },
    //获取明细
    getArray() {
      if (this.id == 0) return;
      getFiSettleApplyItemDetail({ settleApplyId: this.id }).then(res => {
        if (res.code === "success") {
          this.fiSettleApplyItems = res.data;
        }
      });
    },
    showTip(businessType) {
      switch (businessType) {
        case 10740005: //采购
          this.odPoContractShow = true;
          break;
        case 10740010: //销售
          this.odSoContractShow = true;
          break;
        case 10740015: //信用证
          this.letterCreditShow = true;
          break;
        default:
          this.$message({
            message: "请选择业务类型",
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
      if (this.setBusinessNo(e)) {
        this.odSoContractShow = false;
      }
    },
    //采购合同弹窗关闭
    odPoContractCancle() {
      this.odPoContractShow = false;
    },
    //采购合同弹窗确定获取数据
    odPoContractSure(e) {
      if (this.setBusinessNo(e)) {
        this.odPoContractShow = false;
      }
    },
    //信用证弹窗关闭
    letterCreditCancle() {
      this.letterCreditShow = false;
    },
    //信用证弹窗确定获取数据
    letterCreditSure(e) {
      if (this.setBusinessNo(e)) {
        this.letterCreditShow = false;
      }
    },
    setBusinessNo(e) {
      let template = this.selectioned;
      let keyObj = {
        10740005: "poNo",
        10740010: "soContractNo",
        10740015: "applyCode"
      };
      let item = e[0];
      if (
        this.fiSettleApplyItems
          .map(item => item.businessNo)
          .findIndex(it => it === item[keyObj[template.businessType]]) === -1
      ) {
        template.businessNo = item[keyObj[template.businessType]];
        template.contractAmount = item.contractAmtVat
          ? item.contractAmtVat
          : item.lcAmt;
        return true;
      } else {
        this.$message({ message: "当前单据已添加", type: "warning" });
        return false;
      }
    }
  },
  mounted() {
    this.getArray();
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
