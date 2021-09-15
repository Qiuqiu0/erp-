<template>
  <div class="table-div">
    <el-form  style="height:100%;">
      <div class="button-div">
        <el-button class="query-button" icon="el-icon-plus" @click="addList">增加行</el-button>
        <el-button  icon="el-icon-minus" @click="delItem">刪除行</el-button>
      </div>
      <el-table
        border
        center
        :data="odPayApplyItems"
        height="calc(100% - 26px)"
        class="el-table"
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
         <el-table-column  prop="claimStatus" label="认领状态" width="100">
          <template slot-scope="scope">
            <span>{{ claimStatusObject[scope.row.claimStatus] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gatheringNo" label="收款单号" width="130">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input size="mini" v-model="scope.row.gatheringNo" disabled placeholder="请输入"></el-input>
              <span class="comicon2" @click="costSettleTip"><i class="el-icon-search" ></i></span>
            </div>
            <div v-else>{{ scope.row.gatheringNo }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="itemApplyAmt" label="收款金额" width="150">
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
     
    </el-form>
     <!-- 收款单弹窗 -->
      <receipt-model
        v-if="costSettleShow"
        :tipShow="costSettleShow"
        @tipsCancle="costSettleCancle"
        @tipsSure="costSettleSure"
      ></receipt-model>
      <!-- 付款单弹窗 -->
      <payment-order-popup
        v-if="orderShow"
        :tipShow="orderShow"
        @tipsCancle="orderCancle"
        @tipsSure="orderSure"
      ></payment-order-popup>

  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { crashContentObj,claimStatusObject } from "../../dictionary";
import {
  getPaymentItemDetail,
  delPaymentItem
} from "@/api/paymentManage/applyPaymentDetail";
import receiptModel from "@/components/receiptModel";
import paymentOrderPopup from "@/components/paymentOrderPopup";
export default {
  name:"paymentTbaleDetail",
  components: { receiptModel,paymentOrderPopup},
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
      costSettleShow: false,
      orderShow:false,//付款单弹窗
      searchOptions: {}
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
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.odPayApplyItems.indexOf(e);
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
    //创建数据
    addList() {
      this.odPayApplyItems.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        claimStatus:"",//认领状态
        remark:"",//备注
        gatheringNo:"",//收款单号
        itemApplyAmt:'',//收款金额
        paymentCode:'',//付款单号
        updatedBy: "", //	更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //	更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //	更新时间	datetime [e时间]			y		更新时间
        version: "", //	数据版本	int [e数字Int10]			y	默认值:0数据版本
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
        gatheringNo: `${subtitle}收款单号`,
        itemApplyAmt: `${subtitle}收款金额`,
        paymentCode: `${subtitle}付款单号`,
      };
      let priceValid = {
        itemApplyAmt: `${subtitle}收款金额`
      };
      if (this.$validateArray(this.odPayApplyItems, params)) {
        if (
          this.$validateArrayCashContent(this.odPayApplyItems, "paymentData")
        ) {
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
        //this.setApplyDetailItems(); //新建时带入合同数组
        return;
      }
      getPaymentItemDetail({ payApplyCode:this.id}).then(res => {
        if (res.code === "success") {
          this.odPayApplyItems = res.data;
          let item = res.data[0];
        }
      });
    },
    costSettleTip() {
      this.costSettleShow = true;
    },
    //费用弹窗关闭
    costSettleCancle() {
      this.costSettleShow = false;
    },
    //费用弹窗确定获取数据
    costSettleSure(e) {
      let template = this.selectioned;
      let item = e[0];
        template.gatheringNo=item.gatheringNo;//收款单号
        template.itemApplyAmt=item.payeeAmtOrigin;//收款金额
        //template.payApplyCode: "", //	付款申请编码	varchar(64) [e描述_64]			y		付款申请编码
        template.updatedBy=item.updatedBy; //	更新者	varchar(32) [e描述_32]			y		更新者
        template.version=item.version; //	数据版本	int [e数字Int10]			y	默认值:0数据版本
      template.updatedName = item.updatedName;
      template.updatedTime = item.updatedTime;
      template.remark = item.remark;
      this.costSettleShow = false;
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
        template.paymentCode =item.paymentCode ;//付款单号
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
    //this.paymentDetail.payApplyCode=sessionStorage.getItem("payApplyCode");
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
