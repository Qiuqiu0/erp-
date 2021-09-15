<template>
  <div class="table-div">
    <el-form :disabled="$store.state.fiSettleExecuteDetail.executeType!==10750005" style="height:100%">
      <div class="button-div">
        <el-button
          class="query-button"
          @click="addList"
          icon="el-icon-plus"
          v-show="$store.state.fiSettleExecuteDetail.executeType===10750005&&type!==2"
        >增加行</el-button>
        <el-button
          v-show="$store.state.fiSettleExecuteDetail.executeType===10750005&&type!==2"
          @click="delItem"
          icon="el-icon-minus"
        >刪除行</el-button>
      </div>
      <el-table
        border
        center
        :data="fiSettleExecuteItems"
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
        <el-table-column type="index" width="60" :index="indexMethod" label="行号"></el-table-column>
        <template v-if="$store.state.fiSettleExecuteDetail.salesType===10720005">
          <el-table-column prop="docType" label="单据类型" width="140">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <executeDocType-select :executeDocType.sync="scope.row.docType"></executeDocType-select>
              </div>
              <div v-else>{{ executeDocTypeObj[scope.row.docType]}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="docNo" label="业务单据编号" width="140">
            <template slot-scope="scope">
              <div v-if="scope.row.edit" class="tip-select">
                <el-input size="mini" v-model="scope.row.docNo" placeholder="请输入"></el-input>
                <span class="comicon" @click="showTip(scope.row.docType)"></span>
              </div>
              <div v-else>{{ scope.row.docNo }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="paymentBankName" label="付款银行" width="150">
            <template slot-scope="scope">
              <div>{{ scope.row.paymentBankName }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="acceptanceAmt" label="承兑金额" width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input
                  size="mini"
                  type="number"
                  v-input-filter:price
                  :key="scope.row|row2key('execDetailId','acceptanceAmt')"
                  v-model="scope.row.acceptanceAmt"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div v-else>{{ scope.row.acceptanceAmt }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="currencyRate" label="执行汇率" width="110">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input
                  size="mini"
                  type="text"
                  v-input-filter:num6
                  :key="scope.row|row2key('execDetailId','currencyRate')"
                  v-model="scope.row.currencyRate"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div v-else>{{ scope.row.currencyRate }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="execDate" label="执行日期" width="180" >
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-date-picker
                  style="width:150px;"
                  size="small"
                  class="el-inputs"
                  v-model="scope.row.execDate"
                  :pickerOptions="pickerOptions"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div v-else>{{ scope.row.execDate|time2Date }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="150">
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
        </template>
        <template v-else>
          <el-table-column prop="invoiceCode" label="发票号" width="140">
            <template slot-scope="scope">
              <div v-if="scope.row.edit" class="tip-select">
                <el-input size="mini" v-model="scope.row.invoiceCode" placeholder="请输入"></el-input>
              </div>
              <div v-else>{{ scope.row.invoiceCode }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="predictReceiveAmt" label="预计收汇金额" width="130">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input
                  size="mini"
                  type="number"
                  v-input-filter:price
                  :key="scope.row|row2key('execDetailId','predictReceiveAmt')"
                  v-model="scope.row.predictReceiveAmt"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div v-else>{{ scope.row.predictReceiveAmt }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="receiveDate" label="收汇日期" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-date-picker
                  style="width:150px;"
                  size="small"
                  @change="receiveDateChangeHandler"
                  :pickerOptions="pickerOptions"
                  class="el-inputs"
                  v-model="scope.row.receiveDate"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div v-else>{{ scope.row.receiveDate|time2Date }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="lockAmt" label="锁定金额" width="130">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input
                  size="mini"
                  v-input-filter:price
                  :key="scope.row|row2key('execDetailId','lockAmt')"
                  @change="lockAmtChangeHandler(scope.row)"
                  type="number"
                  v-model="scope.row.lockAmt"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div v-else>{{ scope.row.lockAmt }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="currencyRate" label="锁汇汇率" width="110">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input
                  size="mini"
                  type="number"
                  v-input-filter:num6 
                  :key="scope.row|row2key('execDetailId','currencyRate')"
                  v-model="scope.row.currencyRate"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div v-else>{{ scope.row.currencyRate }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="settleAmt" label="结汇金额" width="130">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input 
                size="mini" 
                type="number"
                v-input-filter:price 
                :key="scope.row|row2key('execDetailId','settleAmt')"
                v-model="scope.row.settleAmt" 
                placeholder="请输入"></el-input>
              </div>
              <div v-else>{{ scope.row.settleAmt }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="settleDate" label="结汇日期" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-date-picker
                  style="width:150px;"
                  size="small"
                  class="el-inputs"
                  :pickerOptions="pickerClose"
                  v-model="scope.row.settleDate"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
              <div v-else>{{ scope.row.settleDate|time2Date }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="150">
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
        </template>
      </el-table>
      <div v-show="false">{{ total }}</div>
      <!-- 信用证弹窗 -->
      <letter-credit-popup
        v-if="letterCreditShow"
        :isRadio="true"
        :tipShow="letterCreditShow"
        :searchOptions="{companyCode:fiSettleExecute.companyCode,orgCode:fiSettleExecute.orgCode,currencyCode:fiSettleExecute.lockCurrencyCode}"
        @tipsCancle="letterCreditCancle"
        @tipsSure="letterCreditSure"
      ></letter-credit-popup>
      <!-- 选择付款申请单 -->
      <demand-payment-modal
        v-if="demandPaymentShow"
        :tipShow="demandPaymentShow"
        :applyStatusList=[10460015]
        :searchOptions="{companyCode:fiSettleExecute.companyCode,orgCode:fiSettleExecute.orgCode,currencyCode:fiSettleExecute.lockCurrencyCode}"
        @demandPaymentCancle="demandPaymentCancle"
        @demandPaymentSure="demandPaymentSure"
      ></demand-payment-modal>
    </el-form>
  </div>
</template>
<script>
import {
  delFiSettleExecuteItem,
  getFiSettleExecuteItemDetail
} from "@/api/fiSettleManage/fiSettleExecuteDetail";
import { findBrothersComponents } from "@/assets/js/findComponents";
import executeDocTypeSelect from "@/views/fundsManage/conponents/executeDocTypeSelect";
import letterCreditPopup from "@/components/letterCreditPopup";
import demandPaymentModal from "@/views/fundsManage/conponents/demandPaymentModal";
import { executeDocTypeObj } from "../../dictionary";
import { mapMutations } from "vuex";
import Count from "@/assets/js/calculation";
export default {
  name: "bottomTableFirst",
  props: {
    fiSettleExecute: {
      type: Object,
      default: Object
    }
  },
  components: {
    executeDocTypeSelect,
    letterCreditPopup,
    demandPaymentModal
  },
  data() {
    return {
      executeDocTypeObj,
      fiSettleExecuteItems: [
        // {
        //   execDetailId: "", //执行明细id	varchar(32) [e描述_32]	y		y		执行明细id
        //   executeId: "", //执行id	varchar(32) [e描述_32]			y		执行id
        //   rowno: "", //执行行号	varchar(32) [e描述_32]			y		执行行号
        //   execNo: "", //执行编号	varchar(32) [e描述_32]			y		执行编号
        //   docType: "", //单据类型	int [e字典Int8]			y		单据类型
        //   docNo: "", //业务单据编号	varchar(32) [e描述_32]			y		业务单据编号
        //   docRowno: "", //业务单据行号	varchar(32)			y		业务单据行号
        //   currencyRate: "", //汇率	varchar(32)			y		汇率
        //   execType: "", //执行类型	int [e字典Int8]			y		执行类型（执行/展期/违约）
        //   paymentBankCode: "", //付款银行编码	varchar(32) [e描述_32]			y		付款银行
        //   paymentBankName: "", //付款银行名称	varchar(128) [e描述_128]			y		付款银行名称
        //   acceptanceAmt: "", //承兑金额	varchar(32) [e描述_32]			y		承兑金额
        //   execDate: "", //执行日期	datetime [e时间]			y		执行日期
        //   remark: "", //备注	varchar(512) [e描述_512]			y		备注
        //   invoiceCode: "", //varchar(32)  '发票号',
        //   predictReceiveAmt: "", // decimal(20, 6)  '预计收汇金额',
        //   receiveDate: "", // datetime(0)  '收汇日期',
        //   lockAmt: "", // decimal(20, 6)  '锁定金额',
        //   settleAmt: "", // decimal(20, 6)  '结汇金额',
        //   settleDate: "", // datetime(0)  '结汇日期',
        //   isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        //   createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        //   createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        //   createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        //   updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        //   updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        //   updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        //   version: "" //数据版本	int [e数字Int10]			y	默认值:0数据版本
        // }
      ],
      letterCreditShow: false,
      demandPaymentShow: false, //付款申请单弹窗
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000;
        }
      },
      pickerClose: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000;
        }
      }
    };
  },
  computed: {
    type() {
      return this.$store.state.route.params.type;
    },
    id() {
      return this.$route.params.id;
    },
    total() {
      let total = 0;
      if (this.fiSettleExecuteItems.length > 0) {
        let key =
          this.$store.state.fiSettleExecuteDetail.salesType === 10720005
            ? "acceptanceAmt"
            : "lockAmt";
        this.fiSettleExecuteItems.forEach(item => {
          // total = Count.accMul(total, item[key]);
          total = this.$calculationAmount(total, item[key], "add");
        });
        if (this.$store.state.fiSettleExecuteDetail.executeType === 10750005) {
          this.setExecLockAmtTotal(total);
        }
      }
      return total;
    },
    salesType(){
      return this.$store.state.fiSettleExecuteDetail.salesType
    }
  },
  methods: {
    ...mapMutations(["setExecLockAmtTotal"]),
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
        this.index = this.fiSettleExecuteItems.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.fiSettleExecuteItems.indexOf(e);
      this.fiSettleExecuteItems.forEach(item => {
        item.edit = false;
      });
      this.fiSettleExecuteItems[index].edit = true;
      this.selectioned = e;
      this.index = this.fiSettleExecuteItems.indexOf(e);
      this.$set(
        this.fiSettleExecuteItems,
        this.fiSettleExecuteItems.indexOf(e),
        e
      );
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.fiSettleExecuteItems.indexOf(e);
    },
    //创建数据
    async addList() {
      //验证表头相关必填项
      const topTabFirst = findBrothersComponents(this, "tabConFirst", false)[0];
      if (!(await topTabFirst.getData())) return;
      this.fiSettleExecuteItems.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        execDetailId: "", //执行明细id	varchar(32) [e描述_32]	y		y		执行明细id
        executeId: "", //执行id	varchar(32) [e描述_32]			y		执行id
        rowno: "", //执行行号	varchar(32) [e描述_32]			y		执行行号
        execNo: "", //执行编号	varchar(32) [e描述_32]			y		执行编号
        docType: "", //单据类型	int [e字典Int8]			y		单据类型
        docNo: "", //业务单据编号	varchar(32) [e描述_32]			y		业务单据编号
        docRowno: "", //业务单据行号	varchar(32)			y		业务单据行号
        currencyRate: this.fiSettleExecute.execCurrencyRate, //汇率	varchar(32)			y		汇率
        execType: this.$store.state.fiSettleExecuteDetail.executeType, //执行类型	int [e字典Int8]			y		执行类型（执行/展期/违约）
        paymentBankCode: this.fiSettleExecute.execBankCode, //付款银行编码	varchar(32) [e描述_32]			y		付款银行
        paymentBankName: this.fiSettleExecute.execBankName, //付款银行名称	varchar(128) [e描述_128]			y		付款银行名称
        acceptanceAmt: "", //承兑金额	varchar(32) [e描述_32]			y		承兑金额
        execDate: "", //执行日期	datetime [e时间]			y		执行日期
        remark: "", //备注	varchar(512) [e描述_512]			y		备注
        invoiceCode: "", //varchar(32)  '发票号',
        predictReceiveAmt: "", // decimal(20, 6)  '预计收汇金额',
        receiveDate: "", // datetime(0)  '收汇日期',
        lockAmt: "", // decimal(20, 6)  '锁定金额',
        settleAmt: "", // decimal(20, 6)  '结汇金额',
        settleDate: "", // datetime(0)  '结汇日期',
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        version: "" //数据版本	int [e数字Int10]			y	默认值:0数据版本
      };
      this.fiSettleExecuteItems.unshift(data);
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
        if (this.selectioned.execDetailId) {
          delFiSettleExecuteItem({
            execDetailId: this.selectioned.execDetailId,
            version: this.selectioned.version,
            fVersion:this.fiSettleExecute.version
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
      let del = this.fiSettleExecuteItems.findIndex(item => {
        if (e.applyItemsId) {
          return item.execDetailId == e.execDetailId;
        } else {
          return item.one == e.one;
        }
      });
      this.fiSettleExecuteItems.splice(del, 1);
    },
    postData() {
      let subtitle = "结售汇执行明细";
      // predictReceiveAmt:"",// decimal(20, 6)  '预计收汇金额',
      // receiveDate:"",// datetime(0)  '收汇日期',
      // lockAmt:"",// decimal(20, 6)  '锁定金额',
      // currencyRate  锁汇汇率
      // settleAmt:"",// decimal(20, 6)  '结汇金额',
      // settleDate:"",// datetime(0)  '结汇日期',
      //  10720005: "购汇", 10720010: "结汇"
      let params = this.salesType===10720010?{
        predictReceiveAmt: `${subtitle}预计收汇金额`,
        receiveDate: `${subtitle}收汇日期`,
        lockAmt: `${subtitle}锁定金额`,
        currencyRate: `${subtitle}锁汇汇率`,
        settleAmt: `${subtitle}结汇金额`,
        settleDate: `${subtitle}结汇日期`
      }:{
        docType: `${subtitle}单据类型`,
        acceptanceAmt: `${subtitle}承兑金额`,
        execDate: `${subtitle}执行日期`,
      }
      if (this.$validateArray(this.fiSettleExecuteItems, params)) {
        this.$emit("getData", this.fiSettleExecuteItems);
        return true;
      } else {
        return false;
      }
    },
    //获取明细
    getArray() {
      if (this.id == 0) return;
      getFiSettleExecuteItemDetail({ executeId: this.id }).then(res => {
        if (res.code === "success") {
          this.fiSettleExecuteItems = res.data;
          this.$emit("setNormalArray", this.fiSettleExecuteItems); //共享执行列表
        }
      });
    },
    showTip(docType) {
      switch (docType) {
        case 10760005: //信用证
          this.letterCreditShow = true;
          break;
        case 10760010: //付款申请单
          this.demandPaymentShow = true;
          break;
        default:
          this.$message({
            message: "请选择业务类型",
            type: "error"
          });
          break;
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
    //付款申请单弹窗关闭
    demandPaymentCancle() {
      this.demandPaymentShow = false;
    },
    //付款申请单弹窗确定获取数据
    demandPaymentSure(e) {
      if (this.setBusinessNo([e])) {
        this.demandPaymentShow = false;
      }
    },
    setBusinessNo(e) {
      let template = this.selectioned;
      let keyObj = {
        10760005: "applyCode",
        10760010: "payApplyCode"
      };
      let item = e[0];
      if (
        this.fiSettleExecuteItems
          .map(item => item.docNo)
          .findIndex(it => it === item[keyObj[template.docType]]) === -1
      ) {
        template.docNo = item[keyObj[template.docType]];
        template.acceptanceAmt = item.applyAmt
          ? item.applyAmt
          : item.sumAcceptanceAmt;
        return true;
      } else {
        this.$message({ message: "当前单据已添加", type: "warning" });
        return false;
      }
    },
    lockAmtChangeHandler(row) {
      row.settleAmt = row.lockAmt;
    },
    receiveDateChangeHandler(value) {
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() < value;
        }
      };
    }
  },
  mounted() {
    this.getArray();
  },
  activated(){
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
