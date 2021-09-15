<template>
  <div id="costCategory">
    <!--查询条件-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-search" class="query-button" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      <el-button @click="showEditPage('searchList')" icon="el-icon-setting" style="float:right">
        自定义
      </el-button>
    </div>
    <el-form @keyup.enter.native="query">
    <div class="input-div auto-sibling">
      <contract-search
          v-for="item in searchList"
          :label="item.label"
          :key="item.key"
          :checked="item.checked"
          :matchKey="item.key"
          :bizOccurrence="bizOccurrence"
          :isInvCost="isInvCost"
          :isPrefetch="isPrefetch"
          :costsName="costsName"
          :costLinkDic="costLinkDic"
          :isIncludeDic="isIncludeDic"
          :isPrefetchDic="isPrefetchDic"
          @changeInput="changeData"
      />
    </div>
    </el-form>
    <!--列表信息-->
    <div class="button-div auto-sibling">
      <el-button icon="el-icon-folder-add" v-if="$actionFlag(`F001`)" @click="addData">创建</el-button>
      <el-button icon="el-icon-edit" v-if="$actionFlag(`F002`)" @click="updateData">修改</el-button>
      <el-button icon="el-icon-delete" v-if="$actionFlag(`F003`)" @click="deleteData">删除</el-button>
      <el-button icon="el-icon-data-line" v-if="$actionFlag(`F004`)" @click="goDetail">查看</el-button>
      <el-button @click="showEditPage('headerList')" icon="el-icon-setting" style="float:right"
        >自定义
      </el-button>
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        :data="costCategoryData"
        class="el-table"
        ref="multipleTable"
        height="calc(100% - 35px)"
        @selection-change="handleChange"
        @row-click="selectedRow"
        v-loading="loading"
        @sort-change="tableSortChange"

      >
        <el-table-column
          :key="item.key"
          :prop="item.key"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :show-overflow-tooltip="item.tooltip"
          v-for="item in fixHead"
          :sortable="item.sortable"

        >
        </el-table-column>
        <el-table-column
          :key="item.key"
          :prop="item.key"
          :type="item.type"
          :label="item.label"
          v-if="item.checked"
          :width="item.width"
          :show-overflow-tooltip="item.tooltip"
          v-for="item in headerList"
          :sortable="item.sortable"

        >
          <template scope="scope" v-if="item.temp">
            <span v-if="item.key === 'isInvCost'">
              <span>{{scope.row.isInvCost == 0 ? "是" : "否"}}</span>
            </span>
            <span v-if="item.key === 'isPrefetch'">
              <span>{{scope.row.isPrefetch == 0 ? "是" : "否"}}</span>
            </span>
            <span v-if="item.key === 'isIncome'">
              <span>{{scope.row.isIncome == 0 ? "是" : "否"}}</span>
            </span>
            <span v-if="item.key === 'createdTime'">
              <span>{{scope.row.createdTime | time}}</span>
            </span>
            <span v-if="item.key === 'updatedTime'">
              <span>{{scope.row.updatedTime | time}}</span>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页background-->
      <el-pagination
        class="pageArea"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="currentChange"
        @size-change="currentSize"
        :current-page="page"
        :page-sizes="[100,200,300,500]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <!--   自定义搜索选项-->
    <edit-search-item
      v-if="editPage"
      :list="editList"
      :title="editKey==='searchList'?'自定义搜索条件':'自定义表格排序'"
        :editPage="editPage"
        @editCancel="editCancel"
        @editSure="editSure"
    ></edit-search-item>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { costLinkObj, amortizeObj } from "@/api/dictionary";
import CostApi from "@/api/costData/cost";
import contractSearch from "@/views/costData/components/contractSearch";
import editSearchItem from "@/components/editSearchItem";
import { $moneyFormat } from "vue";
import { getFilter, setFilter } from "@/mixins/editCondition";

const AllSearch = [
  { key: "bizOccurrence", label: "费用环节", checked: true },
  { key: "isInvCost", label: "计入成本", checked: true },
  { key: "isPrefetch", label: "是否预提", checked: true },
  { key: "costsName", label: "费用名称", checked: true },
]; //全部选项标签
const ALLHeader = [
  {
    label: "费用环节",
    tooltip: true,
    key: "bizOccurrenceStr",
    checked: true,
    width: "100",
  },
  {
    label: "费用名称",
    tooltip: true,
    key: "costsName",
    checked: true,
    width: "180",
  },
  {
    label: "摊销维度",
    tooltip: true,
    key: "shareDimStr",
    checked: true,
    width: "120",
  },
  {
    label: "计入成本",
    tooltip: true,
    key: "isInvCost",
    width: "120",
    checked: true,
    temp: true,
  },
  {
    label: "是否预提",
    tooltip: true,
    key: "isPrefetch",
    checked: true,
    width: "100",
    temp: true,
  },
  {
    label: "是否收入",
    tooltip: true,
    key: "isIncome",
    checked: true,
    temp: true,
    width: "100",
  },
  {
    label: "收入科目",
    tooltip: true,
    key: "incomeAccount",
    checked: true,
    width: "100",
  },
  {
    label: "费用科目",
    tooltip: true,
    key: "chargeCatAccount",
    checked: true,
    width: "100",
  },
  {
    label: "预提科目",
    tooltip: true,
    key: "preCatAccount",
    checked: true,
    width: "100",
  },
  {
    label: "创建人",
    tooltip: true,
    key: "createdName",
    checked: true,
    width: "100",
  },
  {
    label: "创建时间",
    tooltip: true,
    key: "createdTime",
    checked: true,
    width: "160",
    temp: true,
  },
  {
    label: "修改人",
    tooltip: true,
    key: "updatedName",
    checked: true,
    width: "100",
  },
  {
    label: "修改时间",
    tooltip: true,
    key: "updatedTime",
    checked: true,
    width: "160",
    temp: true,
  },
]; //所有表头
export default {
  name: "costCategory",
  data() {
    return {
      sort: "",
      fixHead: [
        { type: "selection", key: "selection", checked: true },
        {
          type: "index",
          label: "序号",
          tooltip: true,
          key: "index",
          checked: true,
        },
      ],
      editPage: false,
      searchList: AllSearch,
      headerList: ALLHeader,
      editKey: "",
      editList: [],
      //查询条件
      bizOccurrence: "",
      costLinkDic: [],
      isInvCost: "",
      isIncludeDic: [{ value: 0, label: "是" }, { value: 1, label: "否" }],
      isPrefetch: "",
      isPrefetchDic: [{ value: 0, label: "是" }, { value: 1, label: "否" }],
      costsName: "",
      //列表字段
      costCategoryData: [],
      loading: true,
      selected: [], //列表选中行
      page: 1,
      pageSize: 100,
      total: 0,
      navColor: {
        button: {
          backgroundColor: "",
        },
      },
    };
  },
  mixins: [getFilter, setFilter],

  created() {
    //取查询条件
    this.$getQueryData(this);
    //费用环节字典
    this.costLinkData();
    //获取费用类别列表
    this.costCategoryList();
    this.getFilter();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
  },
  methods: {
    tableSortChange(column) {
      const { prop, order } = column;
      if (order === "descending") {
        this.sort = `${prop} desc`;
      } else {
        this.sort = `${prop} asc`;
      }
      this.query();
    },
    editCancel(list) {
      this.editPage = false;
      this[this.editKey] = list;
    },
    editSure(list) {
      this.editPage = false;
      this[this.editKey] = []; //必须先清空 再更新 否则不触发
      this.$nextTick(() => {
        this[this.editKey] = list;
        this.setFilter({
          filterJson: JSON.stringify(this.headerList),
          listJson: JSON.stringify(this.searchList),
        });
      });
    },
    showEditPage(key) {
      this.editKey = key;
      this.editPage = true;
      this.editList = this[key];
    },
    changeData({ val, key }) {
      this[key] = val;
    },
    //获取费用类别列表
    costCategoryList() {
      let params = {
        page: this.page,
        sort: this.sort,
        pageSize: this.pageSize,
        bizOccurrence: this.bizOccurrence,
        isInvCost: this.isInvCost,
        isPrefetch: this.isPrefetch,
        costsName: this.costsName,
      };
      this.$setQueryData(this, params);
      params = this.$queryFilter(params);
      this.loading = true;
      CostApi.costCategoryList(params)
        .then((res) => {
          this.loading = false;
          this.costCategoryData = res.data.list;
          this.total = res.data.total;
          this.costCategoryData.forEach((item) => {
            costLinkObj.forEach((item1) => {
              if (item.bizOccurrence == item1.dict_code)
                item.bizOccurrenceStr = item1.dict_value;
            });
            amortizeObj.forEach((item2) => {
              if (item.shareDim == item2.dict_code)
                item.shareDimStr = item2.dict_value;
            });
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //费用环节字典
    costLinkData() {
      CostApi.dicQuery({
        dictNo: 1060,
      })
        .then((res) => {
          this.costLinkDic = res.data;
        })
        .catch();
    },
    //创建
    addData() {
      this.$router.push({ name: "costCategoryEdit" });
    },
    //修改
    updateData() {
      if (this.selected.length != 1) {
        this.$openWarning("请选择一条要修改的数据");
        return false;
      }
      this.$router.push({
        name: "costCategoryEdit",
        query: { id: this.selected[0].costCategoryId },
      });
    },
    //删除
    deleteData() {
      if (this.selected.length == 0) {
        this.$openWarning("请选择要删除的数据");
        return false;
      }
      this.$confirm("是否确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        CostApi.costCategoryDelete(this.selected)
          .then((res) => {
            this.$openSuccess(res.message);
            this.page = 1;
            this.costCategoryList();
          })
          .catch();
      });
    },
    //查看
    goDetail() {
      if (this.selected.length != 1) {
        this.$openWarning("请选择一条要查看的数据");
        return false;
      }
      this.$router.push({
        name: "costCategoryDetail",
        query: { id: this.selected[0].costCategoryId },
      });
    },
    //查询
    query() {
      this.page = 1;
      this.costCategoryList();
    },
    //重置
    reset() {
      this.bizOccurrence = "";
      this.isInvCost = "";
      this.isPrefetch = "";
      this.costsName = "";
    },
    //列表多选
    handleChange(e) {
      this.selected = e;
    },
    selectedRow(e) {
      this.$refs.multipleTable.toggleRowSelection(e);
    },
    //翻页
    currentChange(e) {
      this.page = e;
      this.costCategoryList();
    },
    //单页数量
    currentSize(e) {
      this.page = 1;
      this.pageSize = e;
      this.costCategoryList();
    },
  },
  computed: {
    ...mapState({
      themecolor: "themecolor",
    }),
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      },
    },
  },
  components: {
    contractSearch,
    editSearchItem,
  },
};
</script>
<style lang="scss">
#costCategory {
  .el-col-5 {
    height: 32px;
  }
  label {
    display: inline-block;
    width: 30%;
    vertical-align: middle;
  }
  .el-inputs,
  .el-selects {
    width: 70%;
    .el-input__inner {
      width: 100%;
    }
  }
  .input-div .el-col:last-child {
    margin-bottom: 0;
  }
  .pageArea {
    margin: 10px 0 0 20px;
  }
}
</style>
