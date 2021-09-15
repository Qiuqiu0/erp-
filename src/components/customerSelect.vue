<!--客户信息弹窗-->
<template>
  <div id="customerSelect">
    <el-dialog title="客户信息" :visible.sync="tipShow" append-to-body :show-close="false" :before-close="cancel" width="1100px">
      <div class="index">
        <div class="button-div">
          <el-button @click="query" icon="el-icon-search">查询</el-button>
          <el-button @click="reset" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="input-div">
        <el-form @keyup.enter.native="query">
          <el-col :span="5" class="el-col">
            <label>客户代码</label>
            <el-input v-model="customerCode" class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label>客户名称</label>
            <el-input v-model="customerName" class="el-inputs"></el-input>
          </el-col>
        </el-form>  
        </div>
        <div>
          <el-table
            class="el-table"
            border
            center
            :data="customerList"
            v-loading="loading"
            :row-class-name="setRowIndex"
            @row-click="selectRow">
            <el-table-column width="55">
              <template scope="scope">
                <el-radio :label="scope.$index" v-model="radioIndex">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="customerCode" label="客户代码" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerName" label="客户名称" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="companyName" label="公司名称" min-width="180" show-overflow-tooltip></el-table-column>
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
  name: "customerSelect",
  data() {
    return {
      customerCode: "",
      customerName: "",
      customerList: [],
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
    filterQuery: {
      type: Object,
      default: Object
    }
  },
  created() {
    this.queryData();
  },
  mounted() {},
  methods: {
    //初始化数据
    initData() {
      this.customerCode = "";
      this.customerName = "";
      this.radioIndex = null;
      this.radioRow = "";
      this.page = 1;
      this.pageSize = 10;
    },
    //获取客户信息列表
    queryData() {
      this.radioIndex = null;
      this.radioRow = "";
      this.loading = true;
      PopupApi.customerSelect({
        page: this.page,
        pageSize: this.pageSize,
        customerCode: this.customerCode,
        customerName: this.customerName,
        isInactive: 0,
        creditGroupCode: this.filterQuery.creditGroupCode,
        isSubsidiary: this.filterQuery.isSubsidiary,
        customerId: this.filterQuery.notEqual
      }).then(res => {
        this.loading = false;
        if (res.code == "success") {
          this.customerList = res.data.list;
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
      this.customerCode = "";
      this.customerName = "";
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
      this.$emit("customerSure", this.radioRow);
      this.initData();
    },
    //取消
    cancel() {
      this.$emit("customerCancle", false);
      this.initData();
    }
  },
  computed: {}
};
</script>