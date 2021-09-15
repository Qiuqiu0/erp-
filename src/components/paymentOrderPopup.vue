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
          <el-table-column type="selection" width="60" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="paymentCode" width="120" show-overflow-tooltip label="付款单号"></el-table-column>
          <el-table-column 
              prop="payAmtTotal" width="120" 
            :formatter="$moneyFormat" 
            show-overflow-tooltip 
            label="付款金额"></el-table-column>
          <el-table-column prop="payDate" width="100" show-overflow-tooltip label="付款日期">
            <template slot-scope="scope">
              <span>{{ scope.row.payDate | time2Date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="payType" show-overflow-tooltip label="付款方式">
            <template slot-scope="scope">
              <span>{{ payTypeObj[scope.row.payType] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createdTime" width="140" show-overflow-tooltip label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createdTime | time2Date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" width="120" show-overflow-tooltip label="备注"></el-table-column>
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
         <slot></slot>
        <div slot="footer" class="button-div2">
          <el-button type="primary" @click="tipsSure()">确 定</el-button>
          <el-button @click="tipsCancle()">取 消</el-button>
        </div>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getPaymentOrderList,
} from "@/api/paymentManage/paymentOrder";
import {
   payTypeObj
} from "@/views/fundsManage/dictionary";
export default {
    name:"paymentOrderPopup",
    data() {
    return {
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
      payTypeObj,
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
        receiverCode: this.paySelectObj.payeeCompanyCode,//收款单位
        fromCreatedDate:startCreatedTime?startCreatedTime:"",
        toCreatedDate:endCreatedTime?endCreatedTime:"",
        payApplyCode:this.paySelectObj.payApplyCode,
        payStatus:10490010,
        isApplyType:1
      };
      this.loading = true;
      getPaymentOrderList(params).then(res => {
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