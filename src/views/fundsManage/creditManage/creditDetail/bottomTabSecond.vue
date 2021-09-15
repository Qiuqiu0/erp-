<template>
  <div class="bottomTabSecond">
    <div class="button-div">
      <el-button class="query-button" icon="el-icon-plus" @click="addList" v-show="type===5">增加行</el-button>
      <el-button @click="delItem" icon="el-icon-minus" v-show="type===5">刪除行</el-button>
    </div>
    <div></div>
    <el-table
      border
      center
      :data="fiGatheringItems"
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
      <el-table-column type="index" label="行号" width="120" :index="indexMethod"></el-table-column>
      <el-table-column prop="orgName" label="部门" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.edit" class="tip-select">
            <el-input
              size="mini"
              v-model="scope.row.orgName"
              placeholder="请选择"
              :disabled="credit.orgId!==''"
            ></el-input>
            <span class="comicon" @click="departmentTip" v-show="!credit.orgId"></span>
          </div>
          <div v-else>{{ scope.row.orgName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="payeeCategory" label="收款类别" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-select v-model="scope.row.payeeCategory" disabled size="mini" placeholder="请选择">
              <el-option
                v-for="item in payeeCategoryOptions"
                :key="item.dict_key"
                :label="item.dict_value"
                :value="item.dict_key"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </div>
          <div v-else>{{ payeeCategoryObj[scope.row.payeeCategory] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="payeeAmtOrigin" label="收款金额（业务币）" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input
              size="mini"
              type="number"
              v-input-filter:price
              :key="scope.row|row2key('gatheringItemsId','payeeAmt')"
              @change="payeeAmtOriginChangeHandler"
              v-model="scope.row.payeeAmtOrigin"
              placeholder="请输入"
            ></el-input>
          </div>
          <div v-else>{{ scope.row.payeeAmtOrigin }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="payeeAmtBase" label="收款金额（本位币)" width="150">
        <template slot-scope="scope">
          <div>{{$calculationAmount(scope.row.payeeAmtOrigin , creditDetail.currentcyRateBase,"mul") }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="crashContent" label="款项内容" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-select v-model="scope.row.crashContent" size="mini" placeholder="请选择">
              <el-option
                v-for="item in creditContentOptions"
                :key="item.dict_key"
                :label="item.dict_value"
                :value="item.dict_key"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </div>
          <div v-else>{{ crashContentObj[scope.row.crashContent] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="erpPoNo" label="采购单号" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.edit" class="tip-select">
            <el-input size="mini" v-model="scope.row.erpPoNo" placeholder="请输入" readonly></el-input>
            <span class="comicon" @click="odPoContractTip"></span>
          </div>
          <div v-else>{{ scope.row.erpPoNo }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="soInvoiceNo" label="外销发票号" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input size="mini" v-model="scope.row.soInvoiceNo" placeholder="请输入"></el-input>
          </div>
          <div v-else>{{ scope.row.soInvoiceNo }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="fcFeeOrigin" label="外币扣费（业务币)" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input
              size="mini"
              type="number"
              v-input-filter:price
              :key="scope.row|row2key('gatheringItemsId','fcFee')"
              v-model="scope.row.fcFeeOrigin"
              @change="fcFeeOriginChangeHandler"
              placeholder="请输入"
            ></el-input>
          </div>
          <div v-else>{{ scope.row.fcFeeOrigin }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="fcFeeBase" label="外币扣费（本位币）" width="150">
        <template slot-scope="scope">
          <div>{{$calculationAmount(scope.row.fcFeeOrigin,creditDetail.currentcyRateBase,"mul")}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="bcFee" label="本币扣费" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input
              size="mini"
              type="number"
              v-input-filter:price
              :key="scope.row|row2key('gatheringItemsId','bcFee')"
              v-model="scope.row.bcFee"
              @change="bcFeeChangeHandler"
              placeholder="请输入"
            ></el-input>
          </div>
          <div v-else>{{ scope.row.bcFee }}</div>
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
    </el-table>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :data="credit"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    ></department-select>
    <!-- 采购合同弹窗 -->
    <od-po-contract-popup
      v-if="odPoContractShow"
      :isRadio="true"
      :searchOptions="{companyCode:credit.companyCode,orgCode:credit.orgCode,supplierCode:credit.payCompanyCode,currencyCode:credit.currencyCode}"
      :tipShow="odPoContractShow"
      @tipsCancle="odPoContractCancle"
      @tipsSure="odPoContractSure"
    ></od-po-contract-popup>
  </div>
</template>
<script>
import {
  getFiGatheringItems,
  deleteFiGatheringItems
} from "@/api/creditManage/creditDetail";
import departmentSelect from "@/components/departmentSelect.vue";
import odPoContractPopup from "@/components/odPoContractPopup";
import {
  payeeCategoryObj,
  typeObj,
  statusObj,
  payeeTypeObj,
  crashContentObj
} from "../../dictionary";
import {
  payeeCategoryOptions,
  crashContentOptions
} from "@/api/creditManage/selectOptions";
import { mapState } from "vuex";
export default {
  name: "bottomTabSecond",
  components: {
    departmentSelect,
    odPoContractPopup
  },
  props: {
    credit: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {
      payeeCategoryObj,
      typeObj,
      statusObj,
      payeeTypeObj,
      crashContentObj,
      payeeCategoryOptions: [],
      creditContentOptions: [],
      fiGatheringItems: [
        // {
        //   gatheringItemsId: "", //收款单明细id	varchar(32)
        //   gatheringNo: "", //收款单号	varchar(32)
        //   rowno: "", //行号	varchar(32)   自动生成，流水号
        //   orgCode: "", //部门编码	  弹出框：选择部门信息
        //   payeeType: "", //收款类型	int [e字典Int8] 下拉列表：
        //   payeeAmtOrigin: "", //收款金额（业务币）	 手工输入
        //   payeeAmtBase: "", //收款金额（本位币）	自动计算，等于【收款金额（业务币）】*【汇率（本位币）】
        //   crashContent: "", //款项内容	int [e字典Int8]		下拉列表：
        //   erpDoNo: "", //出库单号	varchar(32) [e描述_32]		弹出框：选择出库单
        //   erpSoNo: "", //销售订单号	varchar(32) [e描述_32]	选择出库单时，带出其对应的销售单号，或者弹窗选择销售合同
        //   erpPoNo: "", //采购订单	varchar(32) [e描述_32]		弹窗选择采购单
        //   soInvoiceNo: "", //外销发票号	varchar(32) [e描述_32]		手工输入
        //   fcFeeOrigin: "", //外币扣款（业务币）	 手工输入
        //   fcFeeBase: "", //外币扣款（本位币）	自动计算，等于【外币扣费（业务币）】*【汇率（本位币）】
        //   bcFee: "", //本币扣款	手工输入
        //   remark: "", //备注	手工输入
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
      index: 0,
      loading: false,
      departmentShow: false,
      odPoContractShow: false,
      companyName: {}
    };
  },
  computed: {
    ...mapState(["creditDetail"]),
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    type() {
      return this.$store.state.route.params.type;
    },
    id() {
      return this.$route.params.id;
    },
    total() {
      let total = 0;
      if (this.fiGatheringItems.length > 0) {
        this.fiGatheringItems.forEach(item => {
          total = this.$calculationAmount(total, item.payeeAmtOrigin, "add");
        });
      }
      return total;
    },
    fcFeeOriginTotal() {
      let total = 0;
      if (this.fiGatheringItems.length > 0) {
        this.fiGatheringItems.forEach(item => {
          total = this.$calculationAmount(total, item.fcFeeOrigin, "add");
        });
      }
      return total;
    },
    bcFeeTotal() {
      let total = 0;
      if (this.fiGatheringItems.length > 0) {
        this.fiGatheringItems.forEach(item => {
          total = this.$calculationAmount(total, item.bcFee, "add");
        });
      }
      return total;
    }
  },
  methods: {
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
        this.index = this.fiGatheringItems.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.fiGatheringItems.indexOf(e);
      this.fiGatheringItems.forEach(item => {
        item.edit = false;
      });
      this.fiGatheringItems[index].edit = true;
      this.selectioned = e;
      this.index = this.fiGatheringItems.indexOf(e);
      this.$set(this.fiGatheringItems, this.fiGatheringItems.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.fiGatheringItems.indexOf(e);
    },
    //创建数据
    addList() {
      this.fiGatheringItems.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        gatheringItemsId: "", //收款单明细id	varchar(32)
        gatheringNo: "", //收款单号	varchar(32)
        rowno: "", //行号	varchar(32)   自动生成，流水号
        orgId: this.credit.orgId,
        orgName: this.credit.orgName,
        orgCode: this.credit.orgCode, //部门编码	  弹出框：选择部门信息
        payeeCategory: this.credit.payeeCategory,
        payeeAmtOrigin: "", //收款金额（业务币）	 手工输入
        payeeAmtBase: "", //收款金额（本位币）	自动计算，等于【收款金额（业务币）】*【汇率（本位币）】
        crashContent: "", //款项内容	int [e字典Int8]		下拉列表：
        erpDoNo: "", //出库单号	varchar(32) [e描述_32]		弹出框：选择出库单
        erpSoNo: "", //销售订单号	varchar(32) [e描述_32]	选择出库单时，带出其对应的销售单号，或者弹窗选择销售合同
        erpPoNo: "", //采购订单	varchar(32) [e描述_32]		弹窗选择采购单
        soInvoiceNo: "", //外销发票号	varchar(32) [e描述_32]		手工输入
        fcFeeOrigin: 0, //外币扣款（业务币）	 手工输入
        fcFeeBase: "", //外币扣款（本位币）	自动计算，等于【外币扣费（业务币）】*【汇率（本位币）】
        bcFee: 0, //本币扣款	手工输入
        remark: "", //备注	手工输入
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        version: "" //数据版本	int [e数字Int10]			y	默认值:0数据版本
      };
      this.fiGatheringItems.unshift(data);
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
        if (this.selectioned.gatheringItemsId) {
          deleteFiGatheringItems([this.selectioned]).then(res => {
            if (res.code) {
              this.getFiGatheringItems();
            }
          });
        } else {
          this.deleIndex(this.selectioned);
        }
      });
    },
    //删除方法
    deleIndex(e) {
      let del = this.fiGatheringItems.findIndex(item => {
        if (e.gatheringItemsId) {
          return item.gatheringItemsId == e.gatheringItemsId;
        } else {
          return item.one == e.one;
        }
      });
      this.fiGatheringItems.splice(del, 1);
    },
    departmentTip() {
      this.departmentShow = true;
    },
    //部门弹窗关闭
    departmentCancle() {
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.departmentShow = false;
      this.fiGatheringItems[this.index].orgName = e.branchName;
      this.fiGatheringItems[this.index].orgCode = e.branchCode;
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
      let template = this.selectioned;
      let item = e[0];
      if (
        this.fiGatheringItems
          .map(item => item.erpPoNo)
          .findIndex(it => it === item.poNo) === -1
      ) {
        template.erpPoNo = item.poNo;
        template.payeeAmtOrigin = item.contractAmtVat;
        template.payeeAmtBase =
          item.contractAmtVat * this.creditDetail.currentcyRateBase;
        this.odPoContractShow = false;
      } else {
        this.$message({ message: "当前合同已添加", type: "warning" });
      }
    },
    payeeAmtOriginChangeHandler(val) {
      if (this.total > this.credit.payeeAmtOrigin) {
        this.$message({
          message: "认领金额大于收款金额,请重新输入",
          type: "warning"
        });
        this.fiGatheringItems[this.index].payeeAmtOrigin = 0;
      }
      this.fiGatheringItems[this.index].payeeAmtBase = this.$calculationAmount(
        this.fiGatheringItems[this.index].payeeAmtOrigin,
        this.creditDetail.currentcyRateBase,
        "mul"
      );
    },
    fcFeeOriginChangeHandler(val) {
      if (this.fcFeeOriginTotal > this.credit.fcFeeAmt) {
        this.$message({
          message: "外币扣费金额大于抬头外币扣费,请重新输入",
          type: "warning"
        });
        this.fiGatheringItems[this.index].fcFeeOrigin = 0;
      }
      this.fiGatheringItems[this.index].fcFeeBase = this.$calculationAmount(
        val,
        this.creditDetail.currentcyRateBase,
        "mul"
      );
    },
    bcFeeChangeHandler(val) {
      if (this.bcFeeTotal > this.credit.bcFeeAmt) {
        this.$message({
          message: "本币扣费金额大于抬头本币扣费,请重新输入",
          type: "warning"
        });
        this.fiGatheringItems[this.index].bcFee = 0;
      }
    },
    postData() {
      let subtitle = "收款明细行中";
      let params = {
        orgCode: `${subtitle}部门`,
        payeeCategory: `${subtitle}收款类别`,
        payeeAmtOrigin: `${subtitle}收款金额（业务币）`,
        payeeAmtBase: `${subtitle}收款金额（本位币）`,
        crashContent: `${subtitle}款项内容`
      };
      this.fiGatheringItems.forEach(item => {
        //收款金额（本位币）字段
        item.payeeAmtBase = this.$calculationAmount(
          item.payeeAmtOrigin,
          this.creditDetail.currentcyRateBase,
          "mul"
        );
      });
      if (this.$validateArray(this.fiGatheringItems, params)) {
        this.$emit("getData", this.fiGatheringItems);
        return true;
      } else {
        return false;
      }
    },
    //获取收款明细
    getFiGatheringItems() {
      if (this.id == 0) return;
      getFiGatheringItems({ gatheringId: this.id }).then(res => {
        if (res.code === "success") {
          this.fiGatheringItems = res.data;
        }
      });
    },
    getPayeeCategoryOptions() {
      payeeCategoryOptions().then(res => {
        if (res.code === "success") {
          this.payeeCategoryOptions = res.data;
        }
      });
    },
    getCrashContentOptions() {
      crashContentOptions().then(res => {
        if (res.code === "success") {
          this.creditContentOptions = res.data;
        }
      });
    }
  },
  mounted() {
    this.getFiGatheringItems();
    this.getPayeeCategoryOptions();
    this.getCrashContentOptions();
  }
};
</script>
<style lang="scss" scoped>
.bottomTabSecond {
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
