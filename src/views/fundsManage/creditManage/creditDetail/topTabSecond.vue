<template>
  <div class="topTabSecond">
    <el-table
      border
      center
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      class="el-table"
      v-loading="loading"
    >
      <el-table-column type="index" width="50" label="行号"></el-table-column>
      <el-table-column prop="instrumentNo" show-overflow-tooltip label="票据号"></el-table-column>
      <el-table-column prop="instrumentBillNo" show-overflow-tooltip label="票据台账编号"></el-table-column>
      <el-table-column prop="payCompanyName" show-overflow-tooltip label="付款单位"></el-table-column>
      <el-table-column prop="invoiceDate" show-overflow-tooltip label="开票日期">
        <template slot-scope="scope">
          <span>{{ scope.row.invoiceDate | time2Date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="instrumentType" show-overflow-tooltip label="票据类型">
        <template slot-scope="scope">
          <span>{{ invoiceTypeObj[scope.row.instrumentType] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="instrumentProp" show-overflow-tooltip label="票据性质">
        <template slot-scope="scope">
          <span>{{ invoicePropertiesObj[scope.row.instrumentProp] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="instrumentYeildDate" show-overflow-tooltip label="到票日期">
        <template slot-scope="scope">
          <span>{{ scope.row.instrumentYeildDate | time2Date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isBig" label="大票/小票" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.isBig?"小票":"大票" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="invoiceManName" show-overflow-tooltip label="出票人" width="100px"></el-table-column>
      <el-table-column prop="invoiceBankName" show-overflow-tooltip label="出票人银行"></el-table-column>
      <el-table-column prop="receiptManName" show-overflow-tooltip label="收票人"></el-table-column>
      <el-table-column prop="receiptBankName" show-overflow-tooltip label="收票人银行"></el-table-column>
      <el-table-column prop="receiptReason" show-overflow-tooltip label="收票目的"></el-table-column>
      <el-table-column prop="instrumentAmt" show-overflow-tooltip label="票据金额"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getfiPaymentBil } from "@/api/creditManage/creditDetail";
import {
  invoiceTypeObj,
  invoicePropertiesObj,
  instrumentStatusObj
} from "../../dictionary";
export default {
  name: "topTabSecond",
  data() {
    return {
      invoiceTypeObj,
      invoicePropertiesObj,
      instrumentStatusObj,
      loading: false,
      tableData: [
        // {
        //   receivableId: "", //	收款单id
        //   custId: "", //	客户id
        //   companyCode: "", //	公司编码
        //   orgCode: "", //	组织编码
        //   accountYear: "", //	会计年度
        //   instrumentNo: "", //	票据号
        //   instrumentBillNo: "", //	票据台账编号
        //   currencyCode: "", //	票据币种
        //   instrumentAmt: "", //	票据金额
        //   payCompanyCode: "", //	付款单位
        //   invoiceDate: "", //	开票日期
        //   invoiceArrivedDate: "", //	到票日期
        //   instrumentYeildDate: "", //	到期日期
        //   instrumentType: "", //	票据类型
        //   instrumentProp: "", //	票据性质
        //   isBig: "", //	大票/小票
        //   bankType: "", //	银行类别
        //   instrumentStatus: "", //	票据状态
        //   invoiceMan: "", //	出票人
        //   invoiceBankCode: "", //	出票人银行
        //   invoiceBankAccount: "", //	出票人银行账号
        //   receiptMan: "", //	收票人
        //   receiptBankCode: "", //	收票人银行
        //   receiptBankAccount: "", //	收票人银行账号
        //   acceptorInfo: "", //	承兑人信息
        //   acceptorAccount: "", //	承兑人账号
        //   receiptReason: "", //	收票目的
        //   remark: "", //	备注
        //   isInactive: "", //	是否停用
        //   createdBy: "", //	创建者
        //   createdName: "", //	创建者名称
        //   createdTime: "", //	创建时间
        //   updatedBy: "", //	更新者
        //   updatedName: "", //	更新者名称
        //   updatedTime: "", //	更新时间
        //   version: "" //	数据版本
        // }
      ]
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    getfiPaymentBil() {
      if (this.id == 0) return;
      getfiPaymentBil({ gatheringId: this.id }).then(res => {
        if (res.code === "success") {
          res.data ? this.tableData.push(res.data) : null;
          res.data ? this.$emit("update:bills", res.data) : null;
        }
      });
    }
  },
  mounted() {
    this.getfiPaymentBil();
  }
};
</script>
<style lang="scss" scoped>
.topTabSecond {
  width: 100%;
  overflow: hidden;
  text-align: left;
  margin-bottom: 10px;
}
</style>
