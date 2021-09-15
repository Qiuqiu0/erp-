<template>
  <div class="creditDetail">
    <el-divider></el-divider>
    <div class="button-div auto-sibling">
      <el-button
        v-show="type!==2"
        class="query-button"
        icon="el-icon-suitcase"
        @click="savaCredit"
      >保存</el-button>
      <el-button
        @click="goBack"
        :icon="type!==2?'el-icon-close':'el-icon-back'"
      >{{ type!==2? "取消" : "返回" }}</el-button>
    </div>
    <el-divider></el-divider>
    <!-- tab标签 -->
    <el-tabs class="el-tabs auto-sibling" v-model="activeName" type="card">
      <el-tab-pane label="收款单抬头" name="first" :style="navColor"></el-tab-pane>
      <el-tab-pane label="应收票据信息" name="second"></el-tab-pane>
      <el-tab-pane label="系统信息" name="third"></el-tab-pane>
      <el-tab-pane  label="流程详情"
              name="lcxq">
          <div class="input-div input-div-bor bortop0">
              <v-exmineStatus :id="id"></v-exmineStatus>
          </div>
      </el-tab-pane>
    </el-tabs>
    <!-- tab内容 -->
    <div class="auto-sibling">
      <div v-show="activeName == 'first'">
        <top-tab-first
          @getData="getTopTabFirstData"
          :billAmt="bills.instrumentAmt"
          :billStatus="bills.instrumentStatus"
          ref="topTabFirst"
        ></top-tab-first>
      </div>
      <div v-show="activeName == 'second'" class="input-div" style="height:430px;padding-left:0;">
        <top-tab-second :bills.sync="bills"></top-tab-second>
      </div>
      <div v-show="activeName == 'third'" class="input-div" style="height:430px;">
        <el-col :span="5" class="el-col">
          <label>创建人</label>
          <el-input
            v-model="credit.createdName"
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
            v-model="credit.createdTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>修改人</label>
          <el-input
            v-model="credit.updatedName"
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
            v-model="credit.updatedTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
      </div>
    </div>
    <!-- 下部tab内容 -->
    <el-tabs class="el-tabs auto-sibling" v-model="handerOn" type="card">
      <el-tab-pane label="收款明细" name="credit" :style="navColor">
        <bottom-tab-first
          @getData="getBottomTabFirstData"
          :credit="credit"
          ref="bottomTabFirst"
          v-if="$store.state.creditDetail.isSales"
        ></bottom-tab-first>
        <bottom-tab-second
          @getData="getBottomTabFirstData"
          :credit="credit"
          ref="bottomTabFirst"
          v-else
        ></bottom-tab-second>
      </el-tab-pane>
      <el-tab-pane label="认领明细" name="claims">
        <el-table
          border
          center
          height="calc(100% - 10px)"
          :data="fiGatheringItemsShare"
          class="el-table"
          v-loading="loading"
        >
          <el-table-column prop="rowNo" show-overflow-tooltip label="收款单行号"></el-table-column>
          <el-table-column prop="orgCode" show-overflow-tooltip label="部门"></el-table-column>
          <el-table-column prop="payeeType" show-overflow-tooltip label="收款类别">
            <template slot-scope="scope">
              <div>{{ payeeCategoryObj[scope.row.payeeCategory] }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="shareAmt" show-overflow-tooltip label="收款金额（业务币）"></el-table-column>
          <el-table-column prop="shareAmtBase" show-overflow-tooltip label="收款金额（本位币)"></el-table-column>
          <el-table-column prop="shareAmtRmb" show-overflow-tooltip label="收款金额（人民币)"></el-table-column>
          <el-table-column prop="docType" show-overflow-tooltip label="单据类型">
            <template slot-scope="scope">
              <div>{{ docTypeObj[scope.row.docType] }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="docNo" show-overflow-tooltip label="单据号"></el-table-column>
          <el-table-column prop="soInvoiceNo" show-overflow-tooltip label="外销发票号"></el-table-column>
          <el-table-column prop="fcFeeOrigin" show-overflow-tooltip label="外币扣费（业务币)"></el-table-column>
          <el-table-column prop="fcFeeBase" show-overflow-tooltip label="外币扣费（本位币）" width="100px">
            <template slot-scope="scope">
              <div>{{ scope.row.fcFeeOrigin*(credit.currentcyRateBase?credit.currentcyRateBase:0) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="bcFee" show-overflow-tooltip label="本币扣费"></el-table-column>
          <el-table-column prop="remark" show-overflow-tooltip label="备注"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import topTabFirst from "./topTabFirst";
import topTabSecond from "./topTabSecond";
import bottomTabFirst from "./bottomTabFirst";
import bottomTabSecond from "./bottomTabSecond";
import ExmineStatus from '@/components/exmineStatus'
import {
  getCreditMainDetail,
  getfiPaymentBil,
  getFiGatheringItems,
  getFiGatheringItemsShare,
  saveCredit,
  getParities
} from "@/api/creditManage/creditDetail";
import { payeeCategoryObj, docTypeObj, statusObj } from "../../dictionary";
export default {
  name: "creditDetail",
  components: {
    topTabFirst,
    topTabSecond,
    bottomTabFirst,
    bottomTabSecond,
    'v-exmineStatus': ExmineStatus
  },
  data() {
    return {
      payeeCategoryObj,
      docTypeObj,
      navColor: {
        button: {
          backgroundColor: ""
        }
      },
      credit: {},
      bills: {}, //票据信息
      fiGatheringItemsShare: [],
      activeName: "first",
      handerOn: "credit",
      loading: false
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "creditNotes" });
    },
    //获取认领明细
    getFiGatheringItemsShare() {
      if (this.id == 0) return;
      getFiGatheringItemsShare({ gatheringId: this.id }).then(res => {
        if (res.code === "success") {
          this.fiGatheringItemsShare = res.data;
        }
      });
    },
    getTopTabFirstData(data) {
      this.credit = data;
      this.postData = JSON.parse(JSON.stringify(data));
    },
    getBottomTabFirstData(data) {
      let postData = JSON.parse(JSON.stringify(data));
      postData.map((item, index) => {
        delete item["edit"];
        delete item["one"];
        item.rowno = (index + 1) * 10;
      });
      this.postData.items = postData;
    },
    savaCredit() {
      if (!this.$refs.topTabFirst.postData()) return;
      if (this.type == 5) {
        if (!this.$refs.bottomTabFirst.postData()) return;
      }
      let params = { ...this.postData };
      saveCredit(params).then(res => {
        if (res.code === "success") {
          this.$openSuccess(res.message);
          this.$router.push({ name: "creditNotes" });
        }
      });
    }
  },
  computed: {
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    type() {
      return this.$store.state.route.params.type;
    },
    id() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.getFiGatheringItemsShare();
  }
};
</script>
<style lang="scss" scoped>

.creditDetail {
  .input-div .el-col .el-input__icon {
    line-height: 25px;
  }
  .input-div label {
    width: 29%;
    vertical-align: middle;
  }
  .el-checkbox::after,
  .el-radio::after {
    content: "";
  }

  .input-div .el-textarea__inner {
    border-color: #97999e !important;
  }
  .el-col {
    position: relative;
    height: 26px;
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
