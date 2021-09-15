<template>
  <div class="table-div">
    <el-form style="height:100%;">
      <div class="button-div">
        <el-button class="query-button" icon="el-icon-plus" @click="addList">增加行</el-button>
        <el-button  icon="el-icon-minus" @click="delItem">刪除行</el-button>
      </div>
      <el-table
        border
        center
        :data="odPayApplyItems"
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
        <el-table-column type="index" :index="indexMethod" label="行号"></el-table-column>
        <!-- 出库单号??? -->
         <el-table-column  prop="claimStatus" label="认领状态" width="100">
          <template slot-scope="scope">
            <span>{{ claimStatusObject[scope.row.claimStatus] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="doNo" width="130" label="出库单号" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.doNo }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="soNo" label="销售订单号" width="130">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input size="mini" v-model="scope.row.soNo" placeholder="请输入"></el-input>
              <span class="comicon" @click="odSoContractTip"></span>
            </div>
            <div v-else>{{ scope.row.soNo }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="extContractNo" label="外部合同号" width="130" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.extContractNo }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="itemApplyAmt" label="申请付款金额(业务币)" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                type="number"
                v-model="scope.row.itemApplyAmt"
                @change="itemApplyAmtChangeHandler"
                :key="scope.row|row2key('id','itemApplyAmt')"
                v-input-filter:price
                placeholder="请输入"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.itemApplyAmt }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="residueLimit" label="剩余额度(业务币)" width="120"></el-table-column>
        <el-table-column prop="contractAmt" label="合同金额(原合同币别)" width="150">
          <template slot-scope="scope">
            <div>{{ scope.row.contractAmt }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="moneyContent" label="款项内容" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <cash-content-select
                :needLabel="false"
                required
                :cashContent.sync="scope.row.moneyContent"
              ></cash-content-select>
            </div>
            <div v-else>{{ crashContentObj[scope.row.moneyContent] }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                v-model="scope.row.remark"
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4 }"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.remark }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="paymentCode" label="付款单号" width="150">
           <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input size="mini" v-model="scope.row.paymentCode" disabled placeholder="请选择"></el-input>
              <span class="comicon2" @click="orderTip"><i class="el-icon-search" ></i></span>
            </div>
            <div v-else>{{ scope.row.paymentCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="updatedName" label="修改人"></el-table-column>
        <el-table-column prop="updatedTime" label="修改时间" show-overflow-tooltip width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.updatedTime | time }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="false">{{ total }}</div>
      <!-- 销售合同弹窗 -->
      <od-so-contract-popup
        v-if="odSoContractShow"
        :isRadio="true"
        :searchOptions="{}"
        :tipShow="odSoContractShow"
        @tipsCancle="odSoContractCancle"
        @tipsSure="odSoContractSure"
      ></od-so-contract-popup>
               <!-- 付款单弹窗 -->
      <payment-order-popup
        v-if="orderShow"
        :tipShow="orderShow"
        @tipsCancle="orderCancle"
        @tipsSure="orderSure"
      ></payment-order-popup>
    </el-form>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import {
  getPaymentItemDetail,
  delPaymentItem
} from "@/api/paymentManage/applyPaymentDetail";
import { crashContentObj,claimStatusObject } from "../../dictionary";
import odSoContractPopup from "@/components/odSoContractPopup";
import cashContentSelect from "@/views/fundsManage/conponents/cashContentSelect2";
import paymentOrderPopup from "@/components/paymentOrderPopup";
export default {
  name: "saleTableDetail",
  components: { odSoContractPopup, cashContentSelect ,paymentOrderPopup},
  props: {
    paymentDetail: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {
      crashContentObj,
      claimStatusObject,
      odPayApplyItems: [],
      loading: false,
      odSoContractShow: false,
      searchOptions: {},
      orderShow:false
    };
  },
  methods: {
    ...mapMutations(["setApplyAmtTotal"]),
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
        this.index = this.odPayApplyItems.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.odPayApplyItems.indexOf(e);
      this.odPayApplyItems.forEach(item => {
        item.edit = false;
      });
      if(this.odPayApplyItems[index].claimStatus!=11620015){
        this.odPayApplyItems[index].edit = true;
        this.selectioned = e;
        this.index = this.odPayApplyItems.indexOf(e);
        this.$set(this.odPayApplyItems, this.odPayApplyItems.indexOf(e), e);
      }
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.odPayApplyItems.indexOf(e);
    },
    //创建数据
    addList() {
      this.odPayApplyItems.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        payRowNo: noe,
        one: noe,
        claimStatus:'',// 认领状态
        paymentCode:'',//付款单号
        id: "", //	付款申请明细id	varchar(32) [e描述_32]	y		y		付款申请明细id
        payApplyCode: "", //	付款申请编码	varchar(64) [e描述_64]			y		付款申请编码
        itemApplyAmt: 0, //	申请金额	decimal(20,6) [d(20,6)小数]			y		申请金额
        contractSubCategory: "", //	合同细类	varchar(32) [e描述_32]			y		合同细类
        contractNoS: "", //	框架协议	varchar(64) [e描述_64]			y		框架协议
        poNo: "", //	采购单号	varchar(32) [e描述_32]			y		采购单号
        doNo: "", //	交货单号	varchar(32) [e描述_32]			y		交货单号
        soNo: "", //	销售订单号	varchar(32) [e描述_32]			y		销售订单号
        soInvoiceNo: "", //	销售发票号	varchar(32) [e描述_32]			y		销售订单号
        erpCostsCode: "", //	erp费用编码	varchar(64) [e描述_64]			y		erp费用编码
        itemsPayedAmt: "", //	已付款金额	decimal(20,6) [d(20,6)小数]			y		已付款金额
        soAmt: "", //	销售订单金额	decimal(20,6) [d(20,6)小数]			y		销售订单金额
        extContractNo: "", //	外部合同号	varchar(32) [e描述_32]			y		外部合同号
        contractAmt: "", //	合同金额	decimal(20,6) [d(20,6)小数]			y		合同金额
        moneyContent: "", //款项内容
        contractAmtHigh: "", //	合同上溢金额	decimal(20,6) [d(20,6)小数]			y		合同上溢金额
        invoiceNo: "", //	开票单号	varchar(128) [e描述_128]			y		开票单号
        invoiceDate: "", //	开票日期	datetime [e时间]			y		开票日期
        logisticsContractNo: "", //	物流合同号	varchar(32) [e描述_32]			y		物流合同号
        contractTitle: "", //	标题	varchar(32) [e描述_32]			y		标题
        contractType: "", //	合同类型	varchar(32) [e描述_32]			y		合同类型
        blNo: "", //	提单号	varchar(32) [e描述_32]			y		提单号
        erpBlNo: "", //	系统单据号	varchar(32) [e描述_32]			y		系统单据号
        tradeType: "", //	贸易类型	int [e字典Int8]			y		(dictNo=2010)贸易类型
        remark: "", //	备注	varchar(512) [e描述_512]			y		备注
        isInactive: "", //	是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //	创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //	创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //  //	创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //	更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //	更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //	更新时间	datetime [e时间]			y		更新时间
        version: "", //	数据版本	int [e数字Int10]			y	默认值:0数据版本
        residueLimit: "", //剩余金额
        extBlNo: "", // 外部提单号
      };
      this.odPayApplyItems.unshift(data);
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
          delPaymentItem({
            id: this.selectioned.id,
            version: this.selectioned.version,
            payApplyCode: this.paymentDetail.payApplyCode,
            payApplyVersion: this.paymentDetail.version
          }).then(res => {
            if (res.code === "success") {
              this.$openSuccess(res.message);
              this.getPaymentItemDetail();
            }
          });
        } else {
          this.deleIndex(this.selectioned);
        }
      });
    },
    //删除方法
    deleIndex(e) {
      let del = this.odPayApplyItems.findIndex(item => {
        if (e.id) {
          return item.id == e.id;
        } else {
          return item.one == e.one;
        }
      });
      this.odPayApplyItems.splice(del, 1);
    },
    postData() {

      let subtitle = "明细行中";
      let params = {
        soNo: `${subtitle}销售订单号`,
        itemApplyAmt: `${subtitle}申请付款金额（业务币）`,
        moneyContent: `${subtitle}款项内容`,
         paymentCode:`${subtitle}付款单号`,
      };
      let priceValid = {
        itemApplyAmt: `${subtitle}申请付款金额（业务币）`
      };
      if (this.$validateArray(this.odPayApplyItems, params)) {
        if (this.$validateArrayCashContent(this.odPayApplyItems, "soNo")) {
        } else {
          return false;
        }
        if (this.$validateArrayPrice(this.odPayApplyItems, priceValid)) {
          this.$emit("getData", this.odPayApplyItems);
          return true;
        }
      } else {
        return false;
      }
     
    },
    getPaymentItemDetail() {
      if (!this.id) {
       // this.setApplyDetailItems(); //新建时带入合同数组
        return;
      }
      getPaymentItemDetail({ payApplyCode: this.id }).then(res => {
        if (res.code === "success") {
          this.odPayApplyItems = res.data;
        }
      });
    },
    setApplyDetailItems() {
      this.applyPaymentDetail.applyInvoiceArray.forEach(item => {
        //    soContractNo =>soNo: "", //	销售订单号
        //    doNo  dono  出库单号
        //    extCode   extContractNo //外部合同号
        //    contractAmtVat   itemApplyAmt  //申请付款金额
        //    contractAmtVat contractAmt  //合同金额
        let template = {};
        let noe = new Date().valueOf();
        template.one = noe;
        template.edit = false;
        template.soNo = item.soContractNo;
        template.doNo = item.dono;
        template.extContractNo = item.extCode;
        template.itemApplyAmt = item.contractAmtVat;
        template.residueLimit = item.contractAmtVat;
        template.contractAmt = item.contractAmtVat;
        template.projectName = item.projectName;
        template.projectCode = item.projectCode;
        template.updatedName = item.updatedName;
        template.updatedTime = item.updatedTime;
        (template.moneyContent = ""), //款项内容
          (template.remark = item.remark);
        this.odPayApplyItems.push(template);
      });
    },
    odSoContractTip() {
      this.odSoContractShow = true;
    },
    //销售合同弹窗关闭
    odSoContractCancle() {
      this.odSoContractShow = false;
    },
    //销售合同弹窗确定获取数据
    odSoContractSure(e) {
      let template = this.selectioned;
      let item = e[0];
      template.soNo = item.soContractNo;
      template.doNo = item.doNo;
      template.extContractNo = item.extCode;
      template.itemApplyAmt = item.contractAmtVat;
      template.residueLimit = item.contractAmtVat;
      template.contractAmt = item.contractAmtVat;
      template.projectName = item.projectName;
      template.projectCode = item.projectCode;
      template.updatedName = item.updatedName;
      template.updatedTime = item.updatedTime;
      template.remark = item.remark;
      this.odSoContractShow = false;
    },
     //付款单弹窗
    orderTip(){
      this.orderShow=true;
    },
    //付款单弹窗
    orderCancle() {
      this.orderShow = false;
    },
    //付款单弹窗
    orderSure(e) {
      let template = this.selectioned;
      let item = e[0];
        template.paymentCode =item.paymentCode ;//付款申请编码
      this.orderShow = false;
    },
    //申请付款金额change
    itemApplyAmtChangeHandler(value) {
      let template = this.selectioned;
      this.selectioned.residueLimit = value;
    }
  },
  computed: {
    ...mapState(["applyPaymentDetail"]),
    id() {
      return this.$route.params.id;
    },
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    total() {
      let total = 0;
      if (this.odPayApplyItems.length > 0) {
        this.odPayApplyItems.forEach(item => {
          total = this.$calculationAmount(total, item.itemApplyAmt, "add");
        });
      }
      this.setApplyAmtTotal(total);
      return total;
    }
  },
  mounted() {
    this.getPaymentItemDetail();
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
