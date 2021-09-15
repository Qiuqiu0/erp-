<template>
  <div class="table-div">
    <el-form :disabled="type!==3" style="height:100%">
      <div class="button-div">
        <el-button class="query-button" @click="addList" v-show="type===3" icon="el-icon-plus">增加行</el-button>
        <el-button v-show="type===3" @click="delItem" icon="el-icon-minus">刪除行</el-button>
      </div>
      <el-table
        border
        center
        :data="fiBillPayableItems"
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
        <el-table-column type="index" :index="indexMethod" width="120" label="行号"></el-table-column>
        <el-table-column prop="projectName" width="120" label="项目号">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input size="mini" v-model="scope.row.projectCode" placeholder="请输入"></el-input>
              <span class="comicon" @click="projectTip"></span>
            </div>
            <div v-else>{{ scope.row.projectCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="bankName" label="开户银行" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input size="mini" v-model="scope.row.bankName" placeholder="请输入"></el-input>
              <span class="comicon" @click="companyBankTip"></span>
            </div>
            <div v-else>{{ scope.row.bankName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="bankCode" label="银行标识" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.bankCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="amountPay" label="付款金额" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                size="mini"
                type="number"
                :key="scope.row|row2key('id','fcFee')"
                v-input-filter:price
                @change="amountPayChangeHandler"
                v-model="scope.row.amountPay"
                placeholder="请输入"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.amountPay }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="billAmtRmb" label="付款金额（人民币)" width="150">
          <template slot-scope="scope">
            <div>{{$calculationAmount(scope.row.amountPay , rmbCurrencyRate,"mul") }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="bankSubject" label="银行科目" width="250" >
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input size="mini" v-model="scope.row.bankAccountName" placeholder="请输入"></el-input>
              <span class="comicon" @click="subjectTip"></span>
            </div>
            <div v-else>{{ scope.row.bankAccountName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="bankAccount" label="开户行账号" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.bankAccount }}</div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 选择银行 -->
      <company-bank-popup
        v-if="companyBankShow"
        :companyId="companyId"
        :tipShow="companyBankShow"
        @tipsCancle="companyBankCancle"
        @tipsSure="companyBankSure"
      ></company-bank-popup>
      <!-- 选择项目弹窗 -->
      <project-modal
        v-if="projectShow"
        :tipShow="projectShow"
        @projectCancle="projectCancle"
        @projectSure="projectSure"
      ></project-modal>
      <!-- 选择会计科目 -->
      <accountingSubject-modal
        v-if="subjectshow"
        :longNumber="1002"
        :tipShow="subjectshow"
        @subjectCancle="subjectCancle"
        @subjectSure="subjectSure"
      ></accountingSubject-modal>
    </el-form>
  </div>
</template>
<script>
import projectModal from "@/components/projectSelect.vue";
import companyBankPopup from "@/components/companyBankPopup.vue";
import accountingSubjectModal from "@/components/subjectFrame.vue"; //测试
import { delFiPaymentBillItem } from "@/api/billManage/paymentBIllDetail";
export default {
  name: "bottomTableFirst",
  components: { projectModal, companyBankPopup,accountingSubjectModal },
  data() {
    return {
      fiBillPayableItems: [],
      loading: false,
      companyBankShow: false,
      projectShow: false, //项目弹窗
      subjectshow: false //科目弹窗
    };
  },
  props: {
    companyId: {
      type: String,
      default: ""
    },
    tableData: {
      type: Array,
      default: Array
    },
    billAmt: {
      type: Number,
      default: 0
    },
    rmbCurrencyRate: {
      type: Number,
      default: 0
    }
  },
  computed: {
    flag() {
      return this.$store.state.route.params.editFlag;
    },
    id() {
      return this.$route.params.id;
    },
    type() {
      return this.$store.state.route.params.type;
    },
    total() {
      let total = 0;
      if (this.fiBillPayableItems.length > 0) {
        this.fiBillPayableItems.forEach(item => {
          total = this.$calculationAmount(total, item.amountPay, "add");
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
        this.index = this.fiBillPayableItems.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.fiBillPayableItems.indexOf(e);
      this.fiBillPayableItems.forEach(item => {
        item.edit = false;
      });
      this.fiBillPayableItems[index].edit = true;
      this.selectioned = e;
      this.index = this.fiBillPayableItems.indexOf(e);
      this.$set(this.fiBillPayableItems, this.fiBillPayableItems.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.fiBillPayableItems.indexOf(e);
    },
    //创建数据
    addList() {
      this.fiBillPayableItems.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        id: "", //	id	varchar(32) [e描述_32]	y		y		主键id
        rowno: "",
        accountIdentification: "", //	开户行账户主数据表	varchar(64) [e描述_64]			y		开户行账户主数据表
        projectCode: "", //项目号
        bankCode: "", //	开户银行	varchar(32) [e描述_32]			y		开户银行
        amountPay: "", //	付款金额	decimal(20,6) [d(20,6)小数]			y		付款金额
        billAmtRmb: "", //人民币金额
        bankAccount: "", //	银行账号	varchar(64) [e描述_64]			y		银行账号
        bankName: "", //	银行描述	varchar(128) [e描述_128]			y		银行描述
        bankAccountName:"", //	银行科目名称
        bankSubject: "", //	银行科目	varchar(64) [e描述_64]			y		银行科目
        remark: "", //	备注	varchar(512) [e描述_512]			y		备注
        isInactive: "", //	是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //	创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //	创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //	创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //	更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //	更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //	更新时间	datetime [e时间]			y		更新时间
        version: "", //	数据版本	int [e数字Int10]			y	默认值:0数据版本
        billId: "" //	应收票据id	varchar(32) [e描述_32]			y		应收票据id
      };
      this.fiBillPayableItems.unshift(data);
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
          delFiPaymentBillItem({
            id: this.selectioned.id,
            version: this.selectioned.version
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
      let del = this.fiBillPayableItems.findIndex(item => {
        if (e.id) {
          return item.id == e.id;
        } else {
          return item.one == e.one;
        }
      });
      this.fiBillPayableItems.splice(del, 1);
    },
    postData() {
      if (this.total !== this.billAmt) {
        this.$openWarning("票据金额与付款金额不相等，不能过帐");
        return false;
      }
      this.fiBillPayableItems.forEach(item => {
        //人民币金额
        item.billAmtRmb = this.$calculationAmount(
          item.amountPay,
          this.rmbCurrencyRate,
          "mul"
        );
      });
      let subtitle = "付款明细行中";
      let params = {
        amountPay: `${subtitle}付款金额`
      };
      let priceValid = {
        amountPay: `${subtitle}付款金额`
      };
      if (this.$validateArray(this.fiBillPayableItems, params)) {
        if (this.$validateArrayPrice(this.fiBillPayableItems, priceValid)) {
          this.$emit("getData", this.fiBillPayableItems);
          return true;
        }
      } else {
        return false;
      }
    },
    //获取明细
    getPaymentDetailArray() {
      if (this.id == 0) {
        return;
      }
      getPaymentDetail({ paymentCode: this.id }).then(res => {
        if (res.code === "success") {
          this.fiBillPayableItems = res.data;
        }
      });
    },
    companyBankTip() {
      if (this.companyId === "") {
        this.$openWarning("请先选择公司");
        return;
      }
      this.companyBankShow = true;
    },
    companyBankCancle() {
      this.companyBankShow = false;
    },
    companyBankSure(e) {
      let template = this.selectioned;
      template.bankName = e.bankName;
      template.bankCode = e.bankCode;
      template.bankAccount = e.bankAccount;
      this.companyBankShow = false;
    },
    //项目弹窗打开
    projectTip() {
      this.projectShow = true;
    },
    //项目弹窗关闭
    projectCancle() {
      this.projectShow = false;
    },
    //项目弹窗确定获取数据
    projectSure(e) {
      this.selectioned.projectCode = e.projectCode;
      this.selectioned.projectName = e.projectCode;
      this.projectShow = false;
    },
    //科目弹窗打开
    subjectTip() {
      this.subjectshow = true;
    },
    //科目弹窗关闭
    subjectCancle() {
      this.subjectshow = false;
    },
    //科目弹窗确定获取数据
    subjectSure(e) {
      this.selectioned.bankAccountName = e.number + e.name;
      this.selectioned.bankSubject = e.number;
      this.subjectshow = false;
    },
    amountPayChangeHandler(val) {
      let template = this.fiBillPayableItems[this.index];
      if (this.total > this.billAmt) {
        this.$message({
          message: "付款金额大于票据金额,请重新输入",
          type: "warning"
        });
        template.amountPay = 0;
      }
    }
  },
  watch: {
    tableData(array) {
      if (array.length > 0) {
        this.fiBillPayableItems = array;
      }
    }
  },
  mounted() {}
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
