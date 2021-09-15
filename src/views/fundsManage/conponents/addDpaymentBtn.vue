<template>
  <div>
    <el-dropdown @command="handleCommand">
      <el-button class="query-button" style="width:86px" icon="el-icon-folder-add">新增<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="4" v-if="$actionFlag('F001')"  icon="el-icon-c-scale-to-original">框架协议</el-dropdown-item>
        <el-dropdown-item command="3" v-if="$actionFlag('F002')" icon="el-icon-shopping-cart-full" >采购合同</el-dropdown-item>
        <el-dropdown-item command="2" v-if="$actionFlag('F003')" icon="el-icon-money">销售合同</el-dropdown-item>
        <el-dropdown-item command="1" v-if="$actionFlag('F004')" icon="el-icon-coin">费用单据</el-dropdown-item>
        <el-dropdown-item command="5" v-if="$actionFlag('F012')" icon="el-icon-coin">无合同预付</el-dropdown-item>
        <el-dropdown-item command="6" v-if="$actionFlag('F013')" icon="el-icon-coin">无合同客户退款</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 销售弹窗 -->
    <od-so-contract-popup
      v-if="odSoContractShow"
      :tipShow="odSoContractShow"
      @tipsCancle="odSoContractCancle"
      @tipsSure="odSoContractSure"
    ></od-so-contract-popup>
    <od-po-contract-popup
      v-if="odPoContractShow"
      :tipShow="odPoContractShow"
      @tipsCancle="odPoContractCancle"
      @tipsSure="odPoContractSure"
    ></od-po-contract-popup>
    <od-fw-contract-popup
      v-if="odFwContractShow"
      :tipShow="odFwContractShow"
      @tipsCancle="odFwContractCancle"
      @tipsSure="odFwContractSure"
    ></od-fw-contract-popup>
    <cost-settle-popup
      v-if="costSettleShow"
      :tipShow="costSettleShow"
      @tipsCancle="costSettleCancle"
      @tipsSure="costSettleSure"
    ></cost-settle-popup>
  </div>
</template>
<script>
import odSoContractPopup from "@/components/odSoContractPopup";
import odPoContractPopup from "@/components/odPoContractPopup";
import odFwContractPopup from "@/components/odFwContractPopup";
import costSettlePopup from "@/views/fundsManage/conponents/costSettlePopup";
export default {
  name: "addDpaymentBtn",
  components: {
    odSoContractPopup,
    odPoContractPopup,
    odFwContractPopup,
    costSettlePopup
  },
  data() {
    return {
      odSoContractShow: false,
      odPoContractShow: false,
      odFwContractShow: false,
      costSettleShow: false
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "1":
          this.costSettleTip();
          break;
        case "2":
          this.odSoContractTip();
          break;
        case "3":
          this.odPoContractTip();
          break;
        case "4":
          this.odFwContractTip();
          break;
        case "5":
          this.toPage(1);
          break;
        case "6":
          this.toPage(2);
          break;
        default:
          break;
      }
    },
    //创建页面
    toPage(type){//1 wu
      this.$router.push({
        name: "demandPaymentClaim",
        params: {
            createdtype:type
        }
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
      //dict_key:10540015 dict_value:"销售订单"
      this.odSoContractShow = false;
      this.$emit("getType", 10540015);
      this.$emit("getArray", e);
    },
    odPoContractTip() {
      this.odPoContractShow = true;
    },
    //采购合同弹窗关闭
    odPoContractCancle() {
      this.odPoContractShow = false;
    },
    //采购合同弹窗确定获取数据
    odPoContractSure(e) {
      //dict_key:10540010 dict_value:"采购订单"
      this.odPoContractShow = false;
      this.$emit("getType", 10540010);
      this.$emit("getArray", e);
    },
    odFwContractTip() {
      this.odFwContractShow = true;
    },
    //框架协议弹窗关闭
    odFwContractCancle() {
      this.odFwContractShow = false;
    },
    //框架协议弹窗确定获取数据
    odFwContractSure(e) {
      //dict_key:10540005 dict_value:"框架协议"
      this.odFwContractShow = false;
      this.$emit("getType", 10540005);
      this.$emit("getArray", e);
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
      this.$emit("getType", 10540020);
      this.$emit("getArray", e);
      this.costSettleShow = false;
    }
  }
};
</script>
<style lang="scss"></style>
