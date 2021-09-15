<!--费用类别信息弹窗-->
<template>
  <div id="costSelect">
    <el-dialog title="费用类别信息" :visible.sync="isShow" :show-close="false" :before-close="cancel" width="1100px">
      <div class="index">
        <div class="button-div">
          <el-button @click="query" icon="el-icon-search">查询</el-button>
          <el-button @click="reset" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="input-div">
          <el-col :span="5" class="el-col">
            <label>费用名称</label>
            <el-input v-model="costsName" class="el-inputs"></el-input>
          </el-col>
        </div>
        <div>
          <el-table
            class="el-table noContent"
            border
            center
            :data="costList"
            v-loading="loading"
            :row-class-name="setRowIndex"
            @row-click="selectRow">
            <el-table-column width="70">
              <template scope="scope">
                <el-radio :label="scope.$index" v-model="radioIndex">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="costsName" label="费用名称" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bizOccurrenceStr" label="费用环节" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="shareDimStr" label="摊销维度" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="chargeCatAccount" label="费用科目" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="incomeAccount" label="收入科目" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="preCatAccount" label="预提科目" min-width="100" show-overflow-tooltip></el-table-column>
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
import { costLinkObj, amortizeObj } from "@/api/dictionary";
export default {
  name: "costSelect",
  data() {
    return {
      costsName: "",
      costList: [],
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
    //费用环节：默认0，采购环节1，销售环节2
    costLink: {
      type: Number,
      default: 0
    },
    //摊销维度：默认0，过滤掉项目选项(项目号为空)1
    isProjectNull: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.queryData();
  },
  mounted() {},
  methods: {
    //初始化数据
    initData() {
      this.costsName = "";
      this.radioIndex = null;
      this.radioRow = "";
      this.page = 1;
      this.pageSize = 10;
    },
    //获取费用类别信息列表
    queryData() {
      this.radioIndex = null;
      this.radioRow = "";
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        costsName: this.costsName,
        occurrence: this.costLink,
        projectCodeIsNull: this.isProjectNull
      };
      params = this.$queryFilter(params);
      this.loading = true;
      PopupApi.costCategorySelect(params).then(res => {
        this.loading = false;
        if (res.code == "success") {
          this.costList = res.data.list;
          this.total = res.data.total;
          this.costList.forEach(item => {
            costLinkObj.forEach(item1 => {
              if (item.bizOccurrence == item1.dict_code) item.bizOccurrenceStr = item1.dict_value;
            });
            amortizeObj.forEach(item2 => {
              if (item.shareDim == item2.dict_code) item.shareDimStr = item2.dict_value;
            });
          });
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
      this.costsName = "";
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
        return false;
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
<style lang="scss">
#costSelect {
  .noContent label::after {
    content: none !important;
  }
}
</style>