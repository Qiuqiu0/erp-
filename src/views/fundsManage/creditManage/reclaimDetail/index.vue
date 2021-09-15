<template>
  <div class="reclaimDetail">
    <el-divider></el-divider>
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="saveReclaimDetail" icon="el-icon-suitcase">保存</el-button>
      <el-button @click="goBack" icon="el-icon-close">取消</el-button>
    </div>
    <el-divider></el-divider>
    <!-- tab标签 -->
    <el-tabs class="el-tabs auto-sibling" v-model="activeName" type="card">
      <el-tab-pane label="收款单抬头" name="first" :style="navColor"></el-tab-pane>
      <el-tab-pane label="系统信息" name="third"></el-tab-pane>
    </el-tabs>
    <!-- tab内容 -->
    <div class="auto-sibling">
      <div v-show="activeName == 'first'">
        <top-tab-first-read :credit="gatheringItem"></top-tab-first-read>
      </div>
      <div v-show="activeName == 'third'" class="input-div" style="height:188px;">
        <el-col :span="5" class="el-col">
          <label>创建人</label>
          <el-input
            v-model="gatheringItem.createdName"
            class="el-inputs"
            size="small"
            placeholder="请输入"
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>创建日期</label>
          <el-date-picker
            class="el-inputs"
            size="mini"
            disabled
            v-model="gatheringItem.createdTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>修改人</label>
          <el-input
            v-model="gatheringItem.updatedName"
            class="el-inputs"
            size="small"
            placeholder="请输入"
            disabled
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>修改日期</label>
          <el-date-picker
            class="el-inputs"
            disabled
            size="small"
            v-model="gatheringItem.updatedTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </div>
    </div>
    <!-- 下部tab内容 -->
    <el-tabs class="el-tabs auto-sibling" v-model="handerOn" type="card">
      <el-tab-pane label="认领明细" name="claims" class="table-div">
        <!-- <bottom-tab-first
          @getData="getBottomTabFirstData"
          ref="bottomTabFirst"
          :gatheringItem="gatheringItem"
          :currentcyRateBase="gatheringItem.currentcyRateBase"
          :currencyRateRmb="gatheringItem.currencyRateRmb"
        ></bottom-tab-first>-->
      </el-tab-pane>
    </el-tabs>
    <template v-if="handerOn == 'claims'">
      <bottom-tab-first
        v-auto
        @getData="getBottomTabFirstData"
        ref="bottomTabFirst"
        :gatheringItem="gatheringItem"
        :currentcyRateBase="gatheringItem.currentcyRateBase"
        :currencyRateRmb="gatheringItem.currencyRateRmb"
      ></bottom-tab-first>
    </template>
  </div>
</template>
<script>
import topTabFirstRead from "./topTabFirstRead";
import bottomTabFirst from "./bottomTabFirst";
import {
  getClaimMain,
  saveClaimDetail,
  getClaimDetail
} from "@/api/creditManage/reclaimDetail";
export default {
  name: "reclaimDetail",
  components: { topTabFirstRead, bottomTabFirst },
  data() {
    return {
      tableData: [],
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      gatheringItem: {
        rowNo: "",
        dataAuth: null,
        gatheringItemsId: "",
        companyId: "", //公司id	缺失
        companyCode: "", //公司编码  缺失
        companyName: "", //公司名称	缺失
        orgId: "", //组织id
        orgName: "", //组织名称
        orgCode: "", //部门编码
        gatheringNo: "", //收款单号
        rowno: "", //收款单行号
        payeeDate: "", //收款日期  缺失
        payeeCategory: "", //收款类别  缺失
        payCompanyName: "", //付款单位名称  缺失
        payCompanyCode: "", //付款单位代码  缺失
        currencyCode: "", //业务币种 ??? 缺失
        payeeAmtOrigin: "", //收款金额业务币
        currentcyRateBase: "", //汇率本位币  缺失
        payeeAmtBase: "", //收款金额本位币
        crashContent: "", //款项内容
        erpDoNo: "", //出库单号
        erpSoNo: "", //销售订单号
        erpPoNo: null, //采购订单
        soInvoiceNo: "", //外销发票号
        fcFeeOrigin: null, //外币扣款（业务币）
        fcFeeBase: null, //外币扣款（本位币）
        bcFee: null, //本币扣款
        payeeType: "", //收款方式 yes
        status: null,
        remark: "",
        isInactive: "",
        createdBy: "",
        createdName: "",
        createdTime: "",
        updatedBy: "",
        updatedName: "",
        updatedTime: "",
        version: ""
      },
      activeName: "first",
      handerOn: "claims",
      loading: false,
      postData: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: "creditNoteReclaims" });
    },
    getClaimMain() {
      if (this.id == 0) return;
      getClaimMain({ gatheringItemsId: this.id }).then(res => {
        if (res.code === "success") {
          this.gatheringItem = res.data;
        }
      });
    },
    getBottomTabFirstData(data) {
      let postData = JSON.parse(JSON.stringify(data));
      postData.map((item, index) => {
        delete item["edit"];
        delete item["one"];
        item.rowno = (index + 1) * 10;
      });
      this.postData.shares = postData;
    },
    saveReclaimDetail() {
      if (!this.$refs.bottomTabFirst.postData()) return;
      this.postData.gatheringItemsId = this.gatheringItem.gatheringItemsId;
      let params = { ...this.postData };
      saveClaimDetail(params).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "creditNoteReclaims" });
        }
      });
    }
  },
  mounted() {
    this.getClaimMain();
  }
};
</script>
<style lang="scss" scoped>
.reclaimDetail {
  .input-div .el-col {
    margin: 8px 0 0 10px;
  }
  .input-div .el-col .el-input__icon {
    line-height: 25px;
  }
  .input-div label {
    width: 29%;
    vertical-align: middle;
  }
  .el-col {
    position: relative;
    height: 32px;
    .comicon {
      width: 170px;
      height: 20px;
      position: absolute;
      right: 6px;
      top: 7px;
      cursor: pointer;
    }
  }
}
</style>
