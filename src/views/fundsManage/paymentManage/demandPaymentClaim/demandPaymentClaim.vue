<template>
    <div class="demandPaymentClaim">
        <!--按钮样式-->
        <div class="button-div">
            <el-button  v-if="createdtype==3"  @click="claim">认领提交</el-button>
            <el-button v-else class="query-button" icon="el-icon-suitcase"  @click="savePaymentDetail">保存</el-button>
            <el-button  @click="goBack()" icon="el-icon-close">取消</el-button>
        </div>
        <el-tabs
            class="el-tabs"
            v-model="activeName"
            type="card"
            @tab-click="handleClick"
        >
            <el-tab-pane label="付款单抬头" name="one">
                <div>
                    <tab-con-first @getData="getTopTabFirstData" ref="topTabFirst"></tab-con-first>
                </div>
                <div v-if="createdtype==3">
                    <!-- 下部tab内容 -->
                    <el-tabs class="el-tabs auto-sibling el-tabs2" v-model="handerOn" type="card" style>
                        <el-tab-pane label="明细" name="credit"></el-tab-pane>
                    </el-tabs>
                    <template
                        v-if="$store.state.applyPaymentDetail.applyInvoiceType === 10540015"
                        >
                        <sale-table-detail
                            v-auto
                            @getData="getTableDetailData"
                            :paymentDetail="paymentDetail"
                            ref="tableDetail"
                        ></sale-table-detail>
                        </template>
                    <template
                        v-if="$store.state.applyPaymentDetail.applyInvoiceType === 10540010"
                        >
                        <purchase-table-detail
                            v-auto
                            @getData="getTableDetailData"
                            :paymentDetail="paymentDetail"
                            ref="tableDetail"
                        ></purchase-table-detail>
                        </template>
                    <template
                        v-if="$store.state.applyPaymentDetail.applyInvoiceType === 10540020"
                        >
                        <cost-table-detail
                            v-auto
                            @getData="getTableDetailData"
                            :paymentDetail="paymentDetail"
                            ref="tableDetail"
                        ></cost-table-detail>
                    </template>
                    <template
                        v-if="$store.state.applyPaymentDetail.applyInvoiceType === 10540005"
                        >
                        <contract-table-detail
                            v-auto
                            @getData="getTableDetailData"
                            :paymentDetail="paymentDetail"
                            ref="tableDetail"
                        ></contract-table-detail>
                    </template>
                    <template
                        v-if="$store.state.applyPaymentDetail.applyInvoiceType === 10540025"
                        >
                        <payment-table-detail
                            v-auto
                            @getData="getTableDetailData"
                            :paymentDetail="paymentDetail"
                            ref="tableDetail"
                        ></payment-table-detail>
                        <!-- <contract-table-detail
                            v-auto
                            @getData="getTableDetailData"
                            :paymentDetail="paymentDetail"
                            ref="tableDetail"
                        ></contract-table-detail> -->
                    </template>
                </div>
            </el-tab-pane>
            <el-tab-pane label="打印及附件" name="two">
                <div style="height:398px;background: #ffffff;">
                    <tab-con-second ref="fileTab"></tab-con-second>
                </div>
            </el-tab-pane>
            <el-tab-pane label="付款单信息" name="three">
                <div  style="height:398px;background: #ffffff;">
                    <el-table border center :data="tableData">
                    <el-table-column show-overflow-tooltip prop="paymentCode" label="付款单号"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="payDate" label="付款日期">
                        <template slot-scope="scope">
                        <span>{{ scope.row.payDate | time2Date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="payAmtTotal" label="付款金额（业务币）"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="baseCurrencyRate" label="汇率（本位币）"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="payAmtTotalBase" label="付款金额（本位币）"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="系统信息" name="four">
                <div  class="input-div" style="height:398px;">
                    <el-col :span="5" class="el-col">
                        <label>创建人</label>
                        <el-input
                            v-model="paymentDetail.createdName"
                            disabled
                            class="el-inputs"
                            size="small"
                            placeholder="请输入"
                        ></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                        <label>创建日期</label>
                        <el-date-picker
                            class="el-inputs"
                            size="small"
                            disabled
                            v-model="paymentDetail.createdTime"
                            type="date"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </el-col>
                    <el-col :span="5" class="el-col">
                    <label>修改人</label>
                        <el-input
                            v-model="paymentDetail.updatedName"
                            disabled
                            class="el-inputs"
                            size="small"
                            placeholder="请输入"
                        ></el-input>
                    </el-col>
                    <el-col :span="5" class="el-col">
                    <label>修改日期</label>
                        <el-date-picker
                            class="el-inputs"
                            disabled
                            size="small"
                            v-model="paymentDetail.updatedTime"
                            type="date"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </el-col>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import tabConFirst from "./tabConFirst";
import tabConSecond from "./tabConSecond";
import saleTableDetail from "./saleTableDetail";
import purchaseTableDetail from "./purchaseTableDetail";
import costTableDetail from "./costTableDetail";
import contractTableDetail from "./contractTableDetail";
import paymentTableDetail from "./paymentTableDetail";
import {
  getPaymentApplyDetail,
  addPaymentApply,
  updatePaymentApply,
  getPaymentByApplyCode,
  claimPayApply
} from "@/api/paymentManage/applyPaymentDetail";
export default {
    name:"demandPaymentClaim",
    components: {
        tabConFirst,
        tabConSecond,
        saleTableDetail,
        purchaseTableDetail,
        costTableDetail,
        contractTableDetail,
        paymentTableDetail
    },
    data(){
        return{
            activeName:"one",
            paymentDetail: {},//主表信息
            tableData:[],//附件
            createdtype:0,//创建类型 1，预付物流费用 2，无合同客户退款 3，认领提交 
            loading: false,
            handerOn:"create",
            payApplyCode:'',
        }
    },
    created(){
        this.createdtype=this.$route.params.createdtype;
        this.payApplyCode=this.$route.params.id;
        //sessionStorage.setItem("payApplyCode",this.payApplyCode);
        sessionStorage.setItem("createdtype",this.createdtype);
    },
    methods:{
        goBack() {
            sessionStorage.removeItem("paySelectObj");
            this.$router.push({ name: "demandForPayment" });
        },
         //tab切换
        handleClick(tab, event) {
            console.log(tab, event);
        },
        getTopTabFirstData(data) {
            this.paymentDetail = data;
            this.postData = JSON.parse(JSON.stringify(data));
        },
    getTableDetailData(data) {
      if (data.length > 0) {
        let postData = JSON.parse(JSON.stringify(data));
        postData.map((item, index) => {
          delete item["edit"];
          delete item["one"];
          if (item.hasOwnProperty("poType")) {
            delete item["poType"];
          }
          item.payRowNo = (index + 1) * 10;
        });
        this.postData.odPayApplyItemsList=postData;
      }
    },
    savePaymentDetail() {
      let httpObj = addPaymentApply;
      if (!this.$refs.topTabFirst.postData()) return;
      let params = {...this.postData};
      params.sysSystemAccessoryList = this.$refs.fileTab.tableData;
      httpObj(params).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "demandForPayment" });
        }
      });
    },
    //申请认领
    claim(){
      this.$confirm("是否确认提交选中记录？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (!this.$refs.topTabFirst.postData()) return;
        if (!this.$refs.tableDetail.postData()) return; 
        let params = {...this.postData};
        params.sysSystemAccessoryList = this.$refs.fileTab.tableData;
        claimPayApply(params).then(res => {
          if (res.code === "success") {
            sessionStorage.removeItem("paySelectObj");
            this.$openSuccess(res.message);
            this.$router.push({ name: "demandForPayment" });
          }
        });
      }).catch();
    },
    getPayment() {
      if (!this.payApplyCode) {
        return;
      }
      getPaymentByApplyCode({ payApplyCode: this.payApplyCode}).then(res => {
        if (res.code === "success") {
          this.tableData = res.data;
        }
      });
    }
  },
  mounted() {
    this.getPayment();
  }
}
</script>
<style lang="scss">
.demandPaymentClaim {
  .el-tabs2 .el-tabs__item{
    background: #1665d8;color: #fff;
  }
  .input-div .el-col {
    margin: 8px 0 0 10px;
    height: 26px;
  }
  .input-div .el-col .el-input__icon {
    line-height: 25px;
  }
  .input-div label {
    width: 30%;
    vertical-align: middle;
  }
  .input-div .el-textarea__inner {
    border-color: #97999e !important;
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
  }
  .table-div {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    text-align: left;
  }
}
</style>