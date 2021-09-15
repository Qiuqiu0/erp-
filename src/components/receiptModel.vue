<template>
  <!-- 业务币种列表 -->
  <div class="coinSelect" v-if="tipShow">
    <el-dialog
      :visible.sync="tipShow"
      title="选择列表"
      append-to-body
      :show-close="false"
      :before-close="tipsCancle"
      width="1100px"
      class="popup_box"
    >
      <div class="index">
        <div class="button-div">
          <el-button class="query-button" @click="queryData" icon="el-icon-search">查询</el-button>
          <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="input-div">
          <div class="search-div">
            <el-col :span="5" class="el-col">
              <label>公司</label>
              <el-input v-model="paySelectObj.companyName" class="el-inputs" placeholder="请输入" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>部门</label>
              <el-input v-model="paySelectObj.orgName" class="el-inputs" disabled></el-input>
            </el-col>
            <el-col :span="5" class="el-col">
              <label>收款单位</label>
              <el-input v-model="paySelectObj.payeeName" class="el-inputs" disabled></el-input>
            </el-col>
             <!-- 币别选择 -->
            <!-- <coin-select :coin.sync="coin" class="el-col el-col-5"></coin-select> -->
           <el-col :span="5" class="el-col">
            <label>创建日期</label>
            <el-date-picker
              class="el-input-date"
              size="mini"
              v-model="createDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          </div>
        </div>
        <!-- 表格 -->
        <div class="el-table-div">
          <el-table
            border
            center
            ref="multipleTable"
            :data="tableData"
            class="el-table"
            v-loading="loading"
            @selection-change="handleSelectionChange"
            :row-class-name="setRowIndex"
            @row-click="selectRow"
          >
         <el-table-column type="selection" v-if="!isRadio" width="55"></el-table-column>
            <el-table-column width="55" v-if="isRadio">
              <template scope="scope">
                <el-radio
                  :label="scope.$index"
                  @change="radioChangeHandle"
                  v-model="radioIndex"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
          <el-table-column type="index" width="50" show-overflow-tooltip label="序号"></el-table-column>
          <!-- <el-table-column prop="companyName" width="170" show-overflow-tooltip label="公司"></el-table-column>
          <el-table-column prop="orgName" width="170" show-overflow-tooltip label="部门"></el-table-column>
          <el-table-column prop="accountYear" show-overflow-tooltip label="会计年度"></el-table-column> -->
          <el-table-column prop="gatheringNo" width="120" show-overflow-tooltip label="收款单号"></el-table-column>
          <el-table-column prop="payeeDate" width="100" show-overflow-tooltip label="收款日期">
            <template slot-scope="scope">
              <span>{{ scope.row.payeeDate | time2Date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ statusObj[scope.row.payeeStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否认领">
            <template slot-scope="scope">
              <span v-if="scope.row.isConfirmed == 1">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="currencyCode" width="90" show-overflow-tooltip label="币别"></el-table-column> -->
          <el-table-column prop="payeeAmtOrigin" :formatter="$moneyFormat" width="120" show-overflow-tooltip label="收款金额"></el-table-column>
          <el-table-column prop="payeeAmtBase" :formatter="$moneyFormat" width="120"  show-overflow-tooltip label="收款本位币" ></el-table-column>
          <el-table-column prop="payeeCategory" width="100"  show-overflow-tooltip label="收款类别">
            <template slot-scope="scope">
              <span>{{ payeeCategoryObj[scope.row.payeeCategory] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="payeeType" width="120" show-overflow-tooltip label="收款方式">
            <template slot-scope="scope">
              <span>{{ typeObj[scope.row.payeeType] }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="payeeBankName" show-overflow-tooltip label="收款银行"></el-table-column>
          <el-table-column prop="cashFlowCode" show-overflow-tooltip label="现金流编码"></el-table-column>
          <el-table-column prop="currencyRateRmb" width="120" show-overflow-tooltip label="汇率（人民币）">
            <template slot-scope="scope">
              <span>{{$numberToFixed(scope.row.currencyRateRmb,4)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="bizPersonName" show-overflow-tooltip label="业务员"></el-table-column>
          <el-table-column prop="postDate" show-overflow-tooltip label="过账日期">
            <template slot-scope="scope">
              <span>{{ scope.row.postDate | time2Date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="unDate" show-overflow-tooltip label="冲销日期">
            <template slot-scope="scope">
              <span>{{ scope.row.unDate | time2Date }}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="createdName" show-overflow-tooltip label="创建人"></el-table-column>
          <el-table-column prop="createdTime" width="140" show-overflow-tooltip label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createdTime | time2Date }}</span>
            </template>
          </el-table-column>
        </el-table>
        
        </div>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[100, 200, 300,500]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
      <slot></slot>
      <div slot="footer" class="button-div2">
        <el-button type="primary" @click="tipsSure()">确 定</el-button>
        <el-button @click="tipsCancle()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getPaymentItemDetail } from "@/api/paymentManage/applyPaymentDetail";
import {
  getCreditList,
} from "@/api/creditManage/creditNotes";
import {
  payeeCategoryObj,
  typeObj,
  statusObj,
  payeeTypeObj,
  crashContentObj
} from "@/views/fundsManage/dictionary";
export default {
  name: "receiptModel",
  data() {
    return {
      crashContentObj,
      tableData: [], //表格
      page: {
        pageSize: 100,
        pageNum: 1,
        total: 0
      },
      selectioned:[], //选中
      loading: false,
      loading: true, //表格loading
      show: true,
      payeeCategoryObj,
      typeObj,
      statusObj,
      payeeTypeObj,
      crashContentObj,
      isRadio:true,
      radioIndex:"",
      createDate:[], //创建日期
      paySelectObj:{}
    };
  },
  props: {
    tipShow: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.paySelectObj=JSON.parse(sessionStorage.getItem("paySelectObj"));
    console.log(this.paySelectObj);
    //获取表格
    this.queryData();
  },

  methods: {
    //选择数据
    //关闭
    tipsCancle() {
      this.$emit("tipsCancle");

      this.selectioned = [];
    },
    //确定
    tipsSure() {
      this.$emit("tipsSure", this.selectioned);

      this.selectioned = [];
    },
     handleSizeChange(val) {
      this.page.pageSize = val;
      this.queryData();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.queryData();
    },
    //选择数据
    handleSelectionChange(val) {
      this.selectioned = val;
    },
    //单选选择数据
    radioChangeHandle(index) {
      this.selectioned = [this.tableData[index]];
    },
    //列表单选
    setRowIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    selectRow(row) {
      this.isRadio && this.$refs.multipleTable.clearSelection(); //单选的时候触发
      this.$refs.multipleTable.toggleRowSelection(row, true);
      this.radioIndex = row.index;
    },
    queryData() {
      
      if(this.createDate && this.createDate.length){
        if(this.createDate[0] && this.createDate[1]){
          var startCreatedTime=this.createDate[0]+"T00:00:00.000Z";
          var endCreatedTime=this.createDate[1]+"T23:59:59.000Z";
        }
      }
      let params = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        companyCode: this.paySelectObj.companyCode, //公司
        orgCode:this.paySelectObj.orgCode, //部门
        payCompanyCode: this.paySelectObj.payeeCompanyCode,
       // receiverName: this.paySelectObj.payeeName,
        // payCompanyCode: this.customer.customerCode,
        // currencyCode: this.coin.currencyCode, //币种
        startCreateDate:startCreatedTime?startCreatedTime:"",
        endCreateDate:endCreatedTime?endCreatedTime:"",
        payeeStatus: 10330010
      };
      this.loading = true;
      getCreditList(params).then(res => {
        if (res.code === "success") {
          this.tableData = res.data;
          this.page.total = res.total;
          this.loading = false;
        }
      });
    },
    clearNone() {
      this.createDate = []; //创建日期

    },
  }
}
</script>
