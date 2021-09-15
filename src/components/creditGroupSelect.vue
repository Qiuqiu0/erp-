<!--信用账户组信息弹窗-->
<template>
  <div id="creditGroupSelect">
    <el-dialog title="信用账户组信息" :visible.sync="isShow" :show-close="false" :before-close="cancel" width="1100px">
      <div class="index">
        <div class="button-div">
          <el-button @click="query" icon="el-icon-search">查询</el-button>
          <el-button @click="reset" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="input-div index-div">
        <el-form @keyup.enter.native="query">
          <el-col :span="5" class="el-col" style="margin-right:20px">
            <label class="text_too_long">信用账户组代码</label>
            <el-input v-model="creditGroupCode" class="el-inputs"></el-input>
          </el-col>
          <el-col :span="5" class="el-col">
            <label class="text_too_long">信用账户组名称</label>
            <el-input v-model="creditGroupName" class="el-inputs"></el-input>
          </el-col>
         </el-form> 
        </div>
        <div>
          <el-table
            class="el-table noContent"
            border
            center
            :data="creditGroupList"
            v-loading="loading"
            :row-class-name="setRowIndex"
            @row-click="selectRow">
            <el-table-column width="70" fixed>
              <template scope="scope">
                <el-radio :label="scope.$index" v-model="radioIndex">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="60" fixed></el-table-column>
            <el-table-column prop="creditGroupCode" label="信用账户组代码" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="creditGroupName" label="信用账户组名称" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createdName" label="创建人" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" min-width="160" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.createdTime | time}}</span>
              </template>
            </el-table-column>
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
  name: "creditGroupSelect",
  data() {
    return {
      creditGroupCode: "",
      creditGroupName: "",
      creditGroupList: [],
      radioIndex: null,
      radioRow: "",
      loading: true,
      page: 1,
      pageSize: 100,
      total: 0
    };
  },
  props: {
    isShow: Boolean,
    isInactive: {
      type: Number,
      default: null
    }
  },
  created() {
    this.queryData();
  },
  mounted() {},
  methods: {
    //初始化数据
    initData() {
      this.creditGroupCode = "";
      this.creditGroupName = "";
      this.radioIndex = null;
      this.radioRow = "";
      this.page = 1;
      this.pageSize = 10;
    },
    //获取信用账户组信息列表
    queryData() {
      this.radioIndex = null;
      this.radioRow = "";
      this.loading = true;
      PopupApi.creditGroupSelect({
        page: this.page,
        pageSize: this.pageSize,
        creditGroupCode: this.creditGroupCode,
        creditGroupName: this.creditGroupName,
        isInactive: this.isInactive
      }).then(res => {
        this.loading = false;
        if (res.code == "success") {
          this.creditGroupList = res.data.list;
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
      this.creditGroupCode = "";
      this.creditGroupName = "";
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
      this.$emit("callback", this.radioRow);
      this.initData();
    },
    //取消
    cancel() {
      this.$emit("callback", false);
      this.initData();
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
#creditGroupSelect {
  .text_too_long {
    position: absolute;
    width: 40% !important;
    line-height: 24px;
    margin-left: -40%;
  }
  .el-radio__input {
    margin-left: -3px;
  }
  .noContent label::after {
    content: none !important;
  }
}
.index .index-div{
  label{
    width: 35% !important;
  }
}
.index .index-div .el-input,
.index .index-div .el-select {
  width: 65% !important;
}
</style>