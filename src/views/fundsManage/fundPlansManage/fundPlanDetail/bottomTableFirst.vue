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
        :data="fiFinancialPlanDetailList"
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
        <el-table-column prop="planTime" label="计划日期" show-overflow-tooltip width="190">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-date-picker
                style="width:150px;"
                size="small"
                class="el-inputs"
                v-model="scope.row.planTime"
                :pickerOptions="pickerOptions"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
            <div v-else>{{ scope.row.planTime|time2Date }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="bizType" label="业务类型" show-overflow-tooltip width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <bizType-select :needLabel="false" :bizType.sync="scope.row.bizType"></bizType-select>
            </div>
            <div v-else>{{ bizTypeObj[scope.row.bizType]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="incomeType" show-overflow-tooltip label="收入类型" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <incomeType-select :needLabel="false" :incomeType.sync="scope.row.incomeType"></incomeType-select>
            </div>
            <div v-else>{{ incomeTypeObj[scope.row.incomeType]}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="interactiveCompanyName"
          show-overflow-tooltip
          label="往来单位"
          width="140"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input
                size="mini"
                disabled
                v-model="scope.row.interactiveCompanyName"
                placeholder="请输入"
              ></el-input>
              <span class="comicon" @click="showTip(scope.row.incomeType)"></span>
            </div>
            <div v-else>{{ scope.row.interactiveCompanyName }}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="contractAmount" label="往来单位描述" width="150">
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
        </el-table-column>-->
        <el-table-column prop="projectType" show-overflow-tooltip label="项目类别" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <projectType-select :needLabel="false" :projectType.sync="scope.row.projectType"></projectType-select>
            </div>
            <div v-else>{{ projectTypeObj[scope.row.projectType]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="fundType" show-overflow-tooltip label="资金类型" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <fundType-select :needLabel="false" :fundType.sync="scope.row.fundType"></fundType-select>
            </div>
            <div v-else>{{ fundTypeObj[scope.row.fundType]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="payCurrencyName" show-overflow-tooltip label="支付货币" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input disabled size="mini" v-model="scope.row.payCurrencyName" placeholder="请输入"></el-input>
              <span class="comicon" @click="showCoin(true)"></span>
            </div>
            <div v-else>{{ scope.row.payCurrencyName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="payCurrencyAmt" show-overflow-tooltip label="支付货币金额" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                type="number"
                :key="scope.row|row2key('detailId','payCurrencyAmt')"
                v-input-filter:price
                v-model="scope.row.payCurrencyAmt"
                placeholder="请输入"
                @input="changeIsbuy(scope.row,scope.$index)"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.payCurrencyAmt }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="isBuyExchange" show-overflow-tooltip label="是否购汇" width="110">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select
                v-model="scope.row.isBuyExchange"
                placeholder="请选择"
                class="el-inputs"
                size="small"
                @change="changeIsbuy(scope.row,scope.$index)"
              >
                <el-option
                  v-for="item in isBuyOption"
                  :key="item.dict_key"
                  :label="item.dict_value"
                  :value="item.dict_key"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.isBuyExchange?"是":"否"}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="exchangeCurrencyCode" show-overflow-tooltip label="购汇货币" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input
                disabled
                size="mini"
                v-model="scope.row.exchangeCurrencyName"
                placeholder="请输入"
              ></el-input>
              <span class="comicon" @click="showCoin(false)" v-show="scope.row.isBuyExchange"></span>
            </div>
            <div v-else>{{ scope.row.exchangeCurrencyName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="currencyRate" show-overflow-tooltip label="汇率" width="110">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                type="number"
                :key="scope.row|row2key('detailId','currencyRate')"
                v-input-filter:num6
                v-model="scope.row.currencyRate"
                placeholder="请输入"
                @input="changeIsbuy(scope.row,scope.$index)"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.currencyRate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="exchangeAmt" show-overflow-tooltip label="购汇货币金额" width="110">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                type="number"
                :disabled="!scope.row.isBuyExchange"
                :key="scope.row|row2key('detailId','exchangeAmt')"
                v-input-filter:price
                v-model="scope.row.exchangeAmt"
                placeholder="请输入"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.exchangeAmt }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="tradeContractNo" show-overflow-tooltip label="贸易合同号" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input size="mini" v-model="scope.row.tradeContractNo" placeholder="请输入"></el-input>
            </div>
            <div v-else>{{ scope.row.tradeContractNo }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="tradeQty" label="购销数量" show-overflow-tooltip width="110">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                type="number"
                :key="scope.row|row2key('detailId','tradeQty')"
                v-input-filter:int
                v-model="scope.row.tradeQty"
                placeholder="请输入"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.tradeQty }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="quantityUnitName" show-overflow-tooltip label="数量单位" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input disabled size="mini" v-model="scope.row.quantityUnitName" placeholder="请输入"></el-input>
              <span class="comicon" @click="showUnit"></span>
            </div>
            <div v-else>{{ scope.row.quantityUnitName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                v-model="scope.row.remark"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.remark }}</div>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="false">{{ planReceiveAmtBase }}</div>
      <div v-show="false">{{ planPaymentAmtBase }}</div>
      <div v-show="false">{{ planDifferenceAmtBase }}</div>
      <!-- 选择供应商弹窗 -->
      <supplier-modal
        v-if="supplierShow"
        :tipShow="supplierShow"
        @supplierCancle="supplierCancle"
        @supplierSure="supplierSure"
      ></supplier-modal>
      <!-- 选择客户弹窗 -->
      <customer-modal
        v-if="customerShow"
        :tipShow="customerShow"
        @customerCancle="customerCancle"
        @customerSure="customerSure"
      ></customer-modal>
      <!-- 选择币别 -->
      <coin-modal v-if="coinShow" :tipShow="coinShow" @coinCancle="coinCancle" @coinSure="coinSure"></coin-modal>
      <!-- 选择币别 -->
      <unit-modal v-if="unitShow" :tipShow="unitShow" @unitCancle="unitCancle" @unitSure="unitSure"></unit-modal>
    </el-form>
  </div>
</template>
<script>
import { delFundPlanItem } from "@/api/fundPlansManage/fundPlanDetail";
import { getBaseParitiesByCompanyId } from "@/api/creditManage/creditDetail";
import { findBrothersComponents } from "@/assets/js/findComponents";
import supplierModal from "@/components/supplierSelect.vue";
import customerModal from "@/components/customerSelect.vue";
import coinModal from "@/components/coinSelect.vue";
import unitModal from "@/components/unitPopup.vue";
import bizTypeSelect from "@/views/fundsManage/conponents/bizTypeSelect";
import incomeTypeSelect from "@/views/fundsManage/conponents/incomeTypeSelect";
import projectTypeSelect from "@/views/fundsManage/conponents/projectTypeSelect";
import fundTypeSelect from "@/views/fundsManage/conponents/fundTypeSelect";
import {
  bizTypeObj,
  incomeTypeObj,
  projectTypeObj,
  fundTypeObj
} from "../../dictionary";
export default {
  name: "bottomTableFirst",
  props: {
    fiFinancialPlan: {
      type: Object,
      default: Object
    },
    fiFinancialPlanDetailList: {
      type: Array,
      default: Array
    }
  },
  components: {
    supplierModal,
    customerModal,
    coinModal,
    unitModal,
    bizTypeSelect,
    incomeTypeSelect,
    projectTypeSelect,
    fundTypeSelect
  },
  data() {
    return {
      bizTypeObj,
      incomeTypeObj,
      projectTypeObj,
      fundTypeObj,
      isBuyOption: [
        { dict_key: 0, dict_value: "否" },
        { dict_key: 1, dict_value: "是" }
      ],
      pickerOptions: {},
      supplierShow: false,
      customerShow: false,
      coinShow: false,
      unitShow: false,
      isPayCoin: true,
      loading: false
    };
  },
  computed: {
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    id() {
      return this.$store.state.route.params.id;
    },
    planReceiveAmtBase() {
      let total = 0;
      let arr = this.fiFinancialPlanDetailList.filter(item => {
        return item.incomeType === 11560005;
      });
      if (arr.length > 0) {
        arr.forEach(item => {
          let amount = this.$calculationAmount(
            item.payCurrencyAmt,
            item.currencyRate,
            "mul"
          );
          total = this.$calculationAmount(total, amount, "add");
        });
      }
      this.fiFinancialPlan.planReceiveAmtBase = total;
      return total;
    },
    planPaymentAmtBase() {
      let total = 0;
      let arr = this.fiFinancialPlanDetailList.filter(item => {
        return item.incomeType === 11560010;
      });
      if (arr.length > 0) {
        arr.forEach(item => {
          let amount = this.$calculationAmount(
            item.payCurrencyAmt,
            item.currencyRate,
            "mul"
          );
          total = this.$calculationAmount(total, amount, "add");
        });
      }
      this.fiFinancialPlan.planPaymentAmtBase = total;
      return total;
    },
    planDifferenceAmtBase() {
      let total = 0;
      total = this.$calculationAmount(
        this.planReceiveAmtBase,
        this.planPaymentAmtBase,
        "sub"
      );
      this.fiFinancialPlan.planDifferenceAmtBase = total;
      return total;
    }
  },
  methods: {
    //改变是否购汇
    changeIsbuy(row,index){
        if(row.isBuyExchange){
          row.exchangeAmt=this.$calculationAmount(row.payCurrencyAmt, row.currencyRate, "mul");
        }else{//否
            row.currencyRate=1;
            row.exchangeAmt=row.payCurrencyAmt;
            row.exchangeCurrencyName=row.payCurrencyName;
        }
    },
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
        this.index = this.fiFinancialPlanDetailList.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.fiFinancialPlanDetailList.indexOf(e);
      this.fiFinancialPlanDetailList.forEach(item => {
        item.edit = false;
      });
      this.fiFinancialPlanDetailList[index].edit = true;
      this.selectioned = e;
      this.index = this.fiFinancialPlanDetailList.indexOf(e);
      this.$set(
        this.fiFinancialPlanDetailList,
        this.fiFinancialPlanDetailList.indexOf(e),
        e
      );
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.fiFinancialPlanDetailList.indexOf(e);
    },
    //创建数据
    async addList() {
      //验证表头相关必填项
      const topTabFirst = findBrothersComponents(this, "tabConFirst", false)[0];
      if (!(await topTabFirst.getData())) return;
      this.fiFinancialPlanDetailList.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        detailId: "", // varchar(32) not null comment '明细id',
        planId: this.fiFinancialPlan.planId, // varchar(32) not null comment '计划id',
        rowno: "", // varchar(32) default null comment '行号',
        planCode: this.fiFinancialPlan.planCode, // varchar(32) default null comment '资金计划编号',
        planTime: "", // varchar(32) default null comment '计划时间',
        bizType: "", // int(11) default null comment '业务类型',
        incomeType: "", // int(11) default null comment '收入类型',
        interactiveCompanyId: "", // varchar(64) default null comment '往来单位id',
        interactiveCompanyCode: "", // varchar(64) default null comment '往来单位编码',
        interactiveCompanyName: "", // varchar(128) default null comment '往来单位名称',
        projectType: "", // int(11) default null comment '项目类别',
        fundType: "", // int(11) default null comment '资金类型',
        payCurrencyCode: "", // varchar(32) default null comment '支付货币',
        payCurrencyName: "", // varchar(64) default null comment '支付货币名称',
        payCurrencyAmt: "", // decimal(20,6) default null comment '支付货币金额',
        isBuyExchange: 0, // int(11) default '0' comment '是否购汇',
        exchangeCurrencyCode: "", // varchar(32) default null comment '购汇货币',
        exchangeCurrencyName: "", // varchar(64) default null comment '购汇货币名称',
        currencyRate: 1, // decimal(32,8) default null comment '汇率',
        exchangeAmt: "", // decimal(20,6) default null comment '购汇货币金额',
        tradeContractNo: "", // varchar(64) default null comment '贸易合同号',
        tradeQty: "", // decimal(20,6) default null comment '购销数量',
        quantityUnitName: "", // decimal(20,6) default null comment '数量单位名称',
        quantityUnitCode: "", // decimal(20,6) default null comment '数量单位编码',
        remark: "", // varchar(512) default null comment '备注',
        isInactive: "", // int(11) default '0' comment '是否停用，0表示激活状态，1表示停用，2表示作废',
        createdBy: "", // varchar(32) default null comment '创建者',
        createdName: "", // varchar(64) default null comment '创建者名称',
        createdTime: "", // datetime default null comment '创建时间',
        updatedBy: "", // varchar(32) default null comment '更新者',
        updatedName: "", // varchar(64) default null comment '更新者名称',
        updatedTime: "", // datetime default null comment '更新时间',
        version: "" // int(11) not null default '0' comment '数据版本',
      };
      this.fiFinancialPlanDetailList.unshift(data);
      this.setPickerOptions(this.fiFinancialPlan);
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
        if (this.selectioned.detailId) {
          delFundPlanItem({
            detailId: this.selectioned.detailId,
            version: this.selectioned.version,
            planVersion: this.fiFinancialPlan.version
          }).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.$emit("reload");
            }
          });
        } else {
          this.deleIndex(this.selectioned);
        }
      });
    },
    //删除方法
    deleIndex(e) {
      let del = this.fiFinancialPlanDetailList.findIndex(item => {
        if (e.detailId) {
          return item.detailId == e.detailId;
        } else {
          return item.one == e.one;
        }
      });
      this.fiFinancialPlanDetailList.splice(del, 1);
    },
    postData() {
      if (this.fiFinancialPlanDetailList.length === 0) {
        this.$message({
          message: "当前未添加收付款明细,不允许提交",
          type: "error"
        });
        return;
      }
      let subtitle = "收付款明细";
      //  planTime: "", // varchar(32) default null comment '计划时间',
      // bizType: "", // int(11) default null comment '业务类型',
      // incomeType: "", // int(11) default null comment '收入类型',
      // interactiveCompanyId: "", // varchar(64) default null comment '往来单位id',
      // interactiveCompanyCode: "", // varchar(64) default null comment '往来单位编码',
      // interactiveCompanyName: "", // varchar(128) default null comment '往来单位名称',
      // projectType: "", // int(11) default null comment '项目类别',
      // fundType: "", // int(11) default null comment '资金类型',
      // payCurrencyCode: "", // varchar(32) default null comment '支付货币',
      // payCurrencyName: "", // varchar(64) default null comment '支付货币名称',
      // payCurrencyAmt: "", // decimal(20,6) default null comment '支付货币金额',
      // isBuyExchange: 0, // int(11) default '0' comment '是否购汇',
      // exchangeCurrencyCode: "", // varchar(32) default null comment '购汇货币',
      // exchangeCurrencyName: "", // varchar(64) default null comment '购汇货币名称',
      // currencyRate: 1, // decimal(32,8) default null comment '汇率',
      // exchangeAmt: "", // decimal(20,6) default null comment '购汇货币金额',
      // tradeContractNo: "", // varchar(64) default null comment '贸易合同号',
      // tradeQty: "", // decimal(20,6) default null comment '购销数量',
      // quantityUnitName: "", // decimal(20,6) default null comment '数量单位名称',
      // quantityUnitCode: "", // decimal(20,6) default null comment '数量单位编码',
      let params = {
        planTime: `${subtitle}计划时间`,
        bizType: `${subtitle}业务类型`,
        incomeType: `${subtitle}收入类型`,
        interactiveCompanyCode: `${subtitle}往来单位`,
        projectType: `${subtitle}项目类别`,
        fundType: `${subtitle}资金类型`,
        payCurrencyCode: `${subtitle}支付货币`,
        payCurrencyAmt: `${subtitle}支付货币金额`,
        isBuyExchange: `${subtitle}是否购汇`,
        exchangeCurrencyCode: `${subtitle}购汇货币`,
        currencyRate: `${subtitle}汇率`,
        exchangeAmt: `${subtitle}购汇货币金额`
      };
      // if (this.$validateArray(this.fiFinancialPlanDetailList, params)) {
      //   this.$emit("getData", this.fiFinancialPlanDetailList);
      //   return true;
      // } else {
      //   return false;
      // }
      let priceValid = {
        payCurrencyAmt: `${subtitle}总计金额`
      };
      if (validate.call(this, this.fiFinancialPlanDetailList, params)) {
        if (
          this.$validateArrayPrice(this.fiFinancialPlanDetailList, priceValid)
        ) {
          this.$emit("getData", this.fiFinancialPlanDetailList);
          return true;
        }
      } else {
        return false;
      }
    },
    //获取汇率
    getParities(e) {
      if (!e.exchangeCurrencyCode) {
        return;
      }
      getBaseParitiesByCompanyId({
        companyId: this.fiFinancialPlan.companyId,
        fromCurrencyCode: e.exchangeCurrencyCode
      }).then(res => {
        if (res.code === "success") {
          e.currencyRate = res.data ? res.data.parities : 1;
        }
      });
    },
    showTip(incomeType) {
      switch (incomeType) {
        case 11560005: // 收款
          this.customerShow = true;
          break;
        case 11560010: //付款
          this.supplierShow = true;
          break;
        default:
          this.$message({
            message: "请选择收入类型",
            type: "error"
          });
          break;
      }
    },
    //客户弹窗关闭
    customerCancle() {
      this.customerShow = false;
    },
    customerSure(e) {
      let template = this.selectioned;
      let item = e;
      template.interactiveCompanyId = item.customerId; //'往来单位id',
      template.interactiveCompanyCode = item.customerCode; //'往来单位编码',
      template.interactiveCompanyName = item.customerName; //'往来单位名称',
      this.customerShow = false;
    },
    //供应商弹窗关闭
    supplierCancle() {
      this.supplierShow = false;
    },
    supplierSure(e) {
      let template = this.selectioned;
      let item = e;
      template.interactiveCompanyId = item.supplierId; //往来单位id
      template.interactiveCompanyCode = item.supplierCode; //往来单位编码
      template.interactiveCompanyName = item.supplierName; //往来单位名称
      this.supplierShow = false;
    },
    showCoin(flag) {
      this.isPayCoin = flag;
      this.coinShow = true;
    },
    //币别弹窗关闭
    coinCancle() {
      this.coinShow = false;
    },
    coinSure(e) {
      let template = this.selectioned;
      let item = e;
      if (this.isPayCoin) {
        template.payCurrencyCode = item.currencyCode; //支付货币
        template.payCurrencyName = item.currencyName; //支付货币名称
      } else {
        template.exchangeCurrencyCode = item.currencyCode; //购汇货币
        template.exchangeCurrencyName = item.currencyName; //购汇货币名称
        this.getParities(template);
      }
      this.coinShow = false;
    },
    showUnit() {
      this.unitShow = true;
    },
    //供应商弹窗关闭
    unitCancle() {
      this.unitShow = false;
    },
    unitSure(e) {
      let template = this.selectioned;
      let item = e;
      template.quantityUnitName = item.unitName; //数量单位名称
      template.quantityUnitCode = item.unitCode; //数量单位编码
      this.unitShow = false;
    },
    setPickerOptions(e) {
      this.pickerOptions = {
        disabledDate(time) {
          return (
            e.planBegintime > time.getTime() || time.getTime() > e.planEndtime
          );
        }
      };
    }
  }
};
function validate(params, eleNameObj) {
  let flag = true;
  //  planTime: `${subtitle}计划时间`,
  //       bizType: `${subtitle}业务类型`,
  //       incomeType: `${subtitle}收入类型`,
  //       interactiveCompanyCode: `${subtitle}往来单位`,
  //       projectType: `${subtitle}项目类别`,
  //       fundType: `${subtitle}资金类型`,
  //       payCurrencyCode: `${subtitle}支付货币`,
  //       payCurrencyAmt: `${subtitle}支付货币金额`,
  //       isBuyExchange: `${subtitle}是否购汇`,
  //       exchangeCurrencyCode: `${subtitle}购汇货币`,
  //       currencyRate: `${subtitle}汇率`,
  //       exchangeAmt: `${subtitle}购汇货币金额`,
  let valParamsObj = {
    0: [
      "planTime",
      "bizType",
      "interactiveCompanyCode",
      "projectType",
      "fundType",
      "payCurrencyCode",
      "payCurrencyAmt",
      "isBuyExchange",
      "currencyRate"
    ],
    1: [
      "planTime",
      "bizType",
      "interactiveCompanyCode",
      "projectType",
      "fundType",
      "payCurrencyCode",
      "payCurrencyAmt",
      "isBuyExchange",
      "exchangeCurrencyCode",
      "currencyRate",
      "exchangeAmt"
    ]
  };
  let eleName = "";
  let self = this;
  for (let i = 0; i < params.length; i++) {
    let item = params[i];
    let valParams = valParamsObj[item["isBuyExchange"]];
    for (let j = 0; j < valParams.length; j++) {
      let key = valParams[j];
      const element = item[key];
      if (element != undefined && element != null && element !== "") {
      } else {
        eleName = key;
        self.$message({
          message: `${eleNameObj[eleName]}不能为空`,
          type: "error"
        });
        flag = false;
        return flag;
      }
    }
  }
  return true;
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
