<template>
  <div class="table-div">
    <el-form :disabled="type!==6">
      <div class="button-div">
        <el-button class="query-button" @click="addList" icon="el-icon-plus">增加行</el-button>
        <el-button @click="delItem" icon="el-icon-minus">刪除行</el-button>
      </div>
      <el-table
        border
        center
        :data="fiBillPledgeItems"
        class="el-table"
        ref="multipleTable"
        height="320px"
        @selection-change="handleChange"
        @row-dblclick="dblclick"
        @row-click="rowClick"
        @select-all="dialogCheck"
        @select="dialogCheck"
        v-loading="loading"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" width="120" :index="indexMethod" label="行号"></el-table-column>
        <el-table-column prop="pledgeBankName" label="质押银行">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="tip-select">
              <el-input size="mini" :value="scope.row.pledgeBankName" placeholder="请输入"></el-input>
              <span class="comicon" @click="companyBankTip"></span>
            </div>
            <div v-else>{{ scope.row.pledgeBankName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="pledgeDate" label="质押日期" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-date-picker
                style="width:150px;"
                size="small"
                class="el-inputs"
                v-model="scope.row.pledgeDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
            <div v-else>{{ scope.row.pledgeDate|time2Date }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="redemptionDate" label="赎回日期" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-date-picker
                style="width:150px;"
                size="small"
                class="el-inputs"
                v-model="scope.row.redemptionDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
            <div v-else>{{ scope.row.redemptionDate|time2Date }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="operationType" label="操作类型">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select
                class="el-inputs"
                v-model="scope.row.operationType"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  label="质押"
                  :disabled="fiGatheringBill.instrumentStatus===10270035"
                  :value="40050005"
                ></el-option>
                <el-option
                  label="赎回"
                  :disabled="fiGatheringBill.instrumentStatus!==10270035"
                  :value="40050010"
                ></el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.operationType===40050005?'质押':'赎回'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="createdName" label="操作人"></el-table-column>
        <el-table-column prop="createdTime" label="操作日期">
          <template slot-scope="scope">
            <div>{{ scope.row.createdTime|time }}</div>
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
    </el-form>
  </div>
</template>
<script>
import companyBankPopup from "@/components/companyBankPopup.vue";
import { delFiPaymentBillItem } from "@/api/billManage/paymentBIllDetail";
export default {
  name: "tabConSixth",
  components: { companyBankPopup },
  props: {
    companyId: {
      type: String,
      default: ""
    },
    fiGatheringBill: {
      type: Object,
      default: Object
    },
    disableAdd:false
  },
  data() {
    return {
      fiBillPledgeItems: [
        {
          id: "", //id	varchar(32) [e描述_32]	y		y		主键id
          receivableId: "", //应收票Id	varchar(32) [e描述_32]			y		应收票据id
          companyCode: "", //公司编码	varchar(32) [e描述_32]			y		公司编码
          billStandNumber: "", //票据台账编号	varchar(16) [e描述_16]			y		票据台账编号
          rowNo: "", //行项目号	int [e数字Int10]			y	默认值:0行项目号
          pledgeBank: "", //质押银行	varchar(64) [e描述_64]			y		质押银行
          pledgeDate: "", //质押日期	datetime [e时间]			y		质押日期
          redemptionDate: "", //赎回日期	datetime [e时间]			y		赎回日期
          operationType: "", //操作类型	int [e字典Int8]			y		操作类型:40050005 质押 40050010 赎回
          isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
          createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
          createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
          createdTime: "", //创建时间	datetime [e时间]			y		创建时间
          updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
          updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
          updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
          version: "" //数据版本	int [e数字Int10]			y	默认值:0数据版本
        }
      ],
      loading: false,
      companyBankShow: false
    };
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
        this.index = this.fiBillPledgeItems.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      let index = this.fiBillPledgeItems.indexOf(e);
      this.fiBillPledgeItems.forEach(item => {
        item.edit = false;
      });
      if (!this.fiBillPledgeItems[index].id) {
        this.fiBillPledgeItems[index].edit = true;
      }

      this.selectioned = e;
      this.index = this.fiBillPledgeItems.indexOf(e);
      this.$set(this.fiBillPledgeItems, this.fiBillPledgeItems.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e, true);
      this.selectioned = e;
      this.index = this.fiBillPledgeItems.indexOf(e);
    },
    //创建数据
    addList() {
      if(this.disableAdd){
        this.$openWarning("只能添加一条记录"); return;
      }
      this.fiBillPledgeItems.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        rowno: "",
        receivableId: this.id, //应收票Id	varchar(32) [e描述_32]			y		应收票据id
        companyCode: this.fiGatheringBill.companyCode, //公司编码	varchar(32) [e描述_32]			y		公司编码
        billStandNumber: this.fiGatheringBill.instrumentBillNo, //票据台账编号	varchar(16) [e描述_16]			y		票据台账编号
        pledgeBank: "", //质押银行	varchar(64) [e描述_64]			y		质押银行
        pledgeDate: "", //质押日期	datetime [e时间]			y		质押日期
        redemptionDate: "", //赎回日期	datetime [e时间]			y		赎回日期
        operationType:
          this.fiGatheringBill.instrumentStatus === 10270035
            ? 40050010
            : 40050005, //操作类型	int [e字典Int8]			y		操作类型:40050005 质押 40050010 赎回
        isInactive: "", //是否停用	int [b布尔型]			y	默认值:0是否停用，0表示激活状态，1表示停用，2表示作废
        createdBy: "", //创建者	varchar(32) [e描述_32]			y		创建者
        createdName: "", //创建者名称	varchar(64) [e描述_64]			y		创建者名称
        createdTime: "", //创建时间	datetime [e时间]			y		创建时间
        updatedBy: "", //更新者	varchar(32) [e描述_32]			y		更新者
        updatedName: "", //更新者名称	varchar(64) [e描述_64]			y		更新者名称
        updatedTime: "", //更新时间	datetime [e时间]			y		更新时间
        version: "" //数据版本	int [e数字Int10]			y	默认值:0数据版本
      };
      this.fiBillPledgeItems.unshift(data);
      this.disableAdd=true;
    },
    delItem() {
      if (!this.selectioned) {
        this.$openWarning("未选择数据");
        return false;
      }
      this.$confirm("确定删除吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.selectioned.id) {
          this.$message({
            message: "已生成的记录不允许删除",
            type: "error"
          });
        } else {
          this.deleIndex(this.selectioned);
          this.disableAdd=false;
        }
      });
    },
    //删除方法
    deleIndex(e) {
      let del = this.fiBillPledgeItems.findIndex(item => {
        if (e.id) {
          return item.id == e.id;
        } else {
          return item.one == e.one;
        }
      });

      this.fiBillPledgeItems.splice(del, 1);
    },
    postData() {
      if (validate.call(this, this.fiBillPledgeItems)) {
        return this.fiBillPledgeItems;
      } else {
        return false;
      }
      function validate(params) {
        let flag = true;
        let valParamsObj = {
          40050005: ["pledgeBank", "pledgeDate"],
          40050010: ["redemptionDate"]
        };
        let eleNameObj = {
          pledgeBank: "质押银行",
          pledgeDate: "质押日期",
          redemptionDate: "赎回日期"
        };
        let eleName = "";
        let self = this;
        for (let i = 0; i < params.length; i++) {
          let item = params[i];
          let valParams = valParamsObj[item["operationType"]];
          for (let j = 0; j < valParams.length; j++) {
            let key = valParams[j];
            const element = item[key];
            if (element != undefined && element != null && element !== "") {
            } else {
              eleName = key;
              self.$message({
                message: `${eleNameObj[eleName]}不能为空`,
                type: "error"
              });
              flag = false;
              return flag;
            }
          }
        }
        return true;
      }
    },
    //获取明细
    getPaymentDetailArray() {
      if (this.id == 0) {
        return;
      }
      getPaymentDetail({ paymentCode: this.id }).then(res => {
        if (res.code === "success") {
          this.fiBillPledgeItems = res.data;
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
      this.selectioned.pledgeBankName = e.bankName;
      this.selectioned.pledgeBank = e.bankCode;
      this.selectioned.edit = false;
      this.companyBankShow = false;
    }
  },
  watch: {
    fiGatheringBill(val) {
      if (val.hasOwnProperty("fiBillPledge")) {
        this.fiBillPledgeItems = JSON.parse(JSON.stringify(val.fiBillPledge));
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
  margin-bottom: 10px;
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