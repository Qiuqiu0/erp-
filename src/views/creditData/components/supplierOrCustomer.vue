<!--供应商信息弹窗-->
<template>
  <div id="merchants">
    <el-dialog title="供应商信息" :visible.sync="tipShow" append-to-body :show-close="false" :before-close="cancel" width="1100px">
      <div class="index">
        <div class="button-div">
          <el-button @click="query" icon="el-icon-search">查询</el-button>
          <el-button @click="reset" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="input-div">
        <el-form @keyup.enter.native="query">
          <el-col :span="5" class="el-col">
            <label>客商代码</label>
            <el-input v-model="supplierCode" class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>客商名称</label>
            <el-input v-model="supplierName" class="el-inputs"></el-input>
          </el-col>
        </el-form>  
        </div>
        <div>
          <el-table
            class="el-table"
            border
            center
            :data="supplierList"
            v-loading="loading"
            :row-class-name="setRowIndex"
            @row-click="selectRow">
            <el-table-column width="55">
              <template scope="scope">
                <el-radio :label="scope.$index" v-model="radioIndex">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="custSupplyCode" label="客商代码" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="custSupplyName" label="客商名称" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="appliedAmt" label="已审批额度金额" min-width="180" show-overflow-tooltip></el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="currentChange"
            @size-change="currentSize"
            :current-page="page"
            :page-sizes="[100, 200, 300,500]"
            :page-size="pageSize"
            :total="total">
          </el-pagination>
        </div>
        <div class="button-div2">
          <el-button type="primary" size="small" @click="confirm" icon="el-icon-check">确 定</el-button>
          <el-button size="small" @click="cancel" icon="el-icon-close">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import PopupApi from "@/api/component";
export default {
  name: "merchants",
  data() {
    return {
      supplierCode: "",
      supplierName: "",
      supplierList: [],
      radioIndex: null,
      radioRow: "",
      loading: true,
      page: 1,
      pageSize: 100,
      total: 0
    };
  },
  props: {
    tipShow: Boolean,
    companyCode:{
      type:String,
    },
    orgCode:{
      type:String
    },
    custSupplyType:{
      type:String | Number
    }
  },
  created() {
    this.queryData();
  },
  mounted() {},
  methods: {
    //初始化数据
    initData() {
      this.supplierCode = "";
      this.supplierName = "";
      this.radioIndex = null;
      this.radioRow = "";
      this.page = 1;
      this.pageSize = 10;
    },
    //获取供应商信息列表
    queryData() {
      this.radioIndex = null;
      this.radioRow = "";
      this.loading = true;
      PopupApi.getCreditLimitCustSupplierList({
        page: this.page,
        pageSize: this.pageSize,
        companyCode:this.companyCode,
        orgCode:this.orgCode,
        custSupplyType:this.custSupplyType
      }).then(res => {
        this.loading = false;
        if (res.code == "success") {
          this.supplierList = res.data.list;
          this.total = res.data.total;
        } else {
          this.$openWarning(res.message);
        }
      }).catch(() => {
        this.loading = false;
      });
    },
    //查询
    query() {
      this.page = 1;
      this.queryData();
    },
    //重置
    reset() {
      this.supplierCode = "";
      this.supplierName = "";
    },
    //列表单选
    setRowIndex({row, rowIndex}) {
      row.index = rowIndex;
    },
    selectRow(row) {
      this.radioIndex = row.index;
      this.radioRow = row;
    },
    //翻页
    currentChange(val) {
      this.page = val;
      this.queryData();
    },
    //单页数量
    currentSize(val) {
      this.page = 1;
      this.pageSize = val;
      this.queryData();
    },
    //确定
    confirm() {
      if (this.radioRow.length == 0) {
        this.$openWarning("请选择要添加的数据");
        return;
      }
      this.$emit("supplierSure", this.radioRow);
      this.initData();
    },
    //取消
    cancel() {
      this.$emit("supplierCancle", false);
      this.initData();
    }
  },
  computed: {}
};
</script>