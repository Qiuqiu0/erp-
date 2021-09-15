<template>
  <div class="definitionOfFundPlan">
    <div class="button-div auto-sibling">
      <el-button class="query-button" icon="el-icon-search" @click="getData">查询</el-button>
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
    </div>
    <head-search @getSearchs="getSearchs" ref="headSearch" class="auto-sibling"></head-search>
    <!-- 表格 -->
    <div class="button-div auto-sibling">
      <el-button class="query-button" icon="el-icon-attract" v-if="$actionFlag(`F001`)" @click="addFundPlan">新建</el-button>
      <!-- <el-button icon="el-icon-edit" @click="editReclaim">修改</el-button> -->
      <el-button icon="el-icon-receiving" v-if="$actionFlag(`F002`)" @click="saveFundPlan">保存</el-button>
      <el-button icon="el-icon-data-line" v-if="$actionFlag(`F003`)" @click="delItem">删除</el-button>
    </div>
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        height="calc(100% - 35px)"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleChange"
        @row-click="selectedRow"
        @row-dblclick="dblclick"
        class="el-table"
        v-loading="loading"
      >
        <el-table-column type="selection" width="40" show-overflow-tooltip></el-table-column>
        <el-table-column type="index" width="50" show-overflow-tooltip label="序号"></el-table-column>
        <el-table-column prop="planType" width="120" show-overflow-tooltip label="资金计划周期">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <planType-select
                :needLabel="false"
                :planType.sync="scope.row.planType"
                @change="planTypeChangeHandler(scope.row)"
              ></planType-select>
            </div>
            <div v-else>{{ planTypeObj[scope.row.planType] }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="accountYear" width="160" show-overflow-tooltip label="会计年度">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-date-picker
                :disabled="scope.row.planType==''"
                @change="accountYearChangeHandler(scope.row)"
                v-model="scope.row.accountYear"
                class="el-inputs"
                value-format="yyyy"
                format="yyyy"
                align="right"
                size="small"
                type="year"
                placeholder="选择年"
              ></el-date-picker>
            </div>
            <div v-else>{{ scope.row.accountYear }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="accountMonth" width="160" show-overflow-tooltip label="月份">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <accountMonth-select
                :disable="scope.row.planType===11510005||scope.row.planType==''"
                :needLabel="false"
                :accountMonth.sync="scope.row.accountMonth"
                @change="accountMonthChangeHander(scope.row)"
              ></accountMonth-select>
            </div>
            <div v-else>{{ scope.row.accountMonth?scope.row.accountMonth:'--'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="accountWeek" width="160" show-overflow-tooltip label="周数">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
               <accountWeek-select
                :disable="scope.row.planType!==11510015"
                :needLabel="false"
                :accountWeek.sync="scope.row.accountWeek"
                @change="accountMonthChangeHander(scope.row)"
              ></accountWeek-select>
            </div>
            <div v-else>{{ scope.row.accountWeek?scope.row.accountWeek:'--' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="beginTime" width="160" show-overflow-tooltip label="起始日期">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-date-picker
                class="el-inputs"
                size="mini"
                v-model="scope.row.beginTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
            <div v-else>{{ scope.row.beginTime| time2Date}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" width="160" show-overflow-tooltip label="截止日期">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-date-picker
                class="el-inputs"
                size="mini"
                v-model="scope.row.endTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
            <div v-else>{{ scope.row.endTime| time2Date }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="createdName" show-overflow-tooltip label="创建人"></el-table-column>
        <el-table-column prop="createdTime" width="140" show-overflow-tooltip label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedName" show-overflow-tooltip label="修改人"></el-table-column>
        <el-table-column prop="updatedTime" width="140" show-overflow-tooltip label="修改日期">
          <template slot-scope="scope">
            <span>{{ scope.row.updatedTime | time }}</span>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>
<script>
import {
  getDefinePlanList,
  addDefinePlan
} from "@/api/fundPlansManage/definitionOfFundPlan";
import headSearch from "./headSearch";
import planTypeSelect from "@/views/fundsManage/conponents/planTypeSelect2";
import accountMonthSelect from "@/views/fundsManage/conponents/accountMonthSelect";
import accountWeekSelect from "@/views/fundsManage/conponents/accountWeekSelect";
import { selectedRow } from "@/mixins/selectedRow.js";
import { planTypeObj } from "../../dictionary";
export default {
  name: "definitionOfFundPlan",
  mixins: [selectedRow],
  components: {
    headSearch,
    planTypeSelect,
    accountMonthSelect,
    accountWeekSelect
  },
  data() {
    return {
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      page: {
        pageSize: 100,
        pageNum: 1,
        total: 0
      },
      planTypeObj,
      selectioned: "", //选中
      selectionedArray: [],
      checkShow: false,
      loading: false,
      newTbale: [], //新建数据
      tableData: [],
      searchOptions: {},
    };
  },
  methods: {
     selectedRow(row){
       this.$refs.multipleTable.toggleRowSelection(row);
    },
    getData() {
      this.$refs.headSearch.postData();
    },
    clearNone() {
      this.$refs.headSearch.clearNone();
    },
    dblclick(e) {
      let index = this.tableData.indexOf(e);
      this.tableData.forEach(item => {
        item.edit = false;
      });
      this.tableData[index].edit = true;
      this.tableData[index].change = 1;
      // this.selectioned = e;
      this.index = this.tableData.indexOf(e);
      this.$set(this.tableData, this.tableData.indexOf(e), e);
    },
    getSearchs(e) {
      this.searchOptions = e;
      this.queryData();
    },
    queryData() {
      let params = {
        pageNum: this.page.pageNum,
        rows: this.page.pageSize,
        ...this.searchOptions
      };
      this.loading = true;
      getDefinePlanList(this.$queryFilter(params)).then(res => {
        if (res.code === "success") {
          res.data.forEach(item => {
            item.edit = false;
            item.accountYear = item.accountYear + "";
          });
          this.tableData = res.data;
          this.page.total = res.total;
          this.loading = false;
        }
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.queryData();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.queryData();
    },
    handleChange(e) {
      this.selectionedArray = e;
    },
    addFundPlan() {
      this.clearNone();
      this.tableData.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        defineId: "", // varchar(32) not null comment '定义id',
        planType: 11510005, // int(11) default null comment '资金计划周期',
        accountYear: "", // int(11) not null default '0' comment '会计年度',
        accountMonth: "", // int(11) not null default '0' comment '月份',
        accountWeek: "", // int(11) not null default '0' comment '周数',
        beginTime: "", // datetime default null comment '起始日期',
        endTime: "", // datetime default null comment '截止日期',
        remark: "", // varchar(512) default null comment '备注',
        isInactive: "", // int(11) default '0' comment '是否停用，0表示激活状态，1表示停用，2表示作废',
        createdBy: "", // varchar(32) default null comment '创建者',
        createdName: "", // varchar(64) default null comment '创建者名称',
        createdTime: "", // datetime default null comment '创建时间',
        updatedBy: "", // varchar(32) default null comment '更新者',
        updatedName: "", // varchar(64) default null comment '更新者名称',
        updatedTime: "", // datetime default null comment '更新时间',
        version: "" // int(11) not null default '0' comment '数据版本',
      };
      this.newTbale.unshift(data);
      let newTbale = [];
      newTbale.unshift(data);
      this.tableData = newTbale.concat(this.tableData);
    },
    editReclaim() {
      this.tableData.forEach(item => {
        item.edit = false;
      });
      for (const get of this.selectionedArray) {
        this.tableData.forEach((item, index) => {
          if (item.one == get.one && item.planId == get.planId) {
            item.change = 1;
            item.edit = true;
          }
          this.$set(this.tableData, index, this.tableData[index]);
        });
      }
      this.tableData[this.index].edit = true;
      this.tableData[this.index].change = 1;
      this.$set(this.tableData, this.index, this.tableData[this.index]);
    },
    delItem() {
      if (this.selectionedArray.length === 0) {
        this.$message({ message: "未选择计划", type: "warning" });
        return;
      }
      if (!this.selectionedArray.every(item => item.defineId == "")) {
        this.$message({
          message: "只有未录入的系统的计划可删除,请重新选择",
          type: "warning"
        });
        return;
      }
      this.$confirm("删除行后无法恢复，是否确认删除？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.selectionedArray.forEach(item => {
          this.deleIndex(item);
        });
      });
    },
    //删除方法
    deleIndex(e) {
      let del = this.tableData.findIndex(item => {
        if (e.tripId) {
          return item.defineId == e.defineId;
        } else {
          return item.one == e.one;
        }
      });
      this.tableData.splice(del, 1);
    },
    planTypeChangeHandler(value) {
      let template = value;
      template.accountYear = "";
      template.accountMonth = "";
      template.beginTime = "";
      template.endTime = "";
    },
    accountYearChangeHandler(value) {
      let template = value;
      if (template.accountYear) {
        let beginTime = template.accountYear + "-01" + "-01";
        let endTime = template.accountYear + "-12" + "-31";
        template.beginTime = new Date(beginTime);
        template.endTime = new Date(endTime);
      } else {
        template.beginTime = "";
        template.endTime = "";
      }
    },
    accountMonthChangeHander(value) {
      let template = value;
      if (!template.accountYear) {
        this.$message({ message: "请选择年份先", type: "warning" });
        template.accountMonth = "";
        return;
      }
      if (template.accountMonth) {
        let beginTime =
          template.accountYear + `-${template.accountMonth}` + "-01";
        let endTime =
          template.accountYear + `-${template.accountMonth + 1}` + "-01"; //下个月的第一天
        template.beginTime = new Date(beginTime);
        template.endTime = new Date(endTime) - 60 * 60 * 24; // 下个月的第一天的前一天是上个月的最后一天
      } else {
        template.beginTime = "";
        template.endTime = "";
      }
    },
    accountWeekChangeHandler(value) {
      let template = value;
      if (!template.accountYear) {
        this.$message({ message: "请选择年份先", type: "warning" });
        template.accountWeek = "";
        return;
      }
      if (!template.accountMonth) {
        this.$message({ message: "请选择月份先", type: "warning" });
        template.accountWeek = "";
        return;
      }
      if (template.accountWeek) {
      } else {
        template.beginTime = "";
        template.endTime = "";
      }
    },
    saveFundPlan() {
      let params = this.tableData.filter(item => {
        return item.defineId == "";
      });
      if (params.length == 0) {
        this.$message({ message: "无新增数据", type: "warning" });
        return;
      }
      let eleNameObj = {
        planType: "资金计划周期", // int(11) default null comment '资金计划周期',
        accountYear: "会计年度", // int(11) not null default '0' comment '会计年度',
        accountMonth: "月份", // int(11) not null default '0' comment '月份',
        accountWeek: "周数", // int(11) not null default '0' comment '周数',
        beginTime: "起始日期", // datetime default null comment '起始日期',
        endTime: "截止日期" // datetime default null comment '截止日期',
      };
      params.map((item, index) => {
        delete item["edit"];
        delete item["one"];
      });
      if (validate.call(this, params, eleNameObj)) {
        addDefinePlan(params).then(res => {
          if (res.code === "success") {
            this.$openSuccess(res.message);
            this.queryData();
          }
        });
      }
    }
  },
  mounted() {
    this.queryData();
  },
  activated() {
    this.queryData();
  }
};
function validate(params, eleNameObj) {
  let flag = true;
  //     11510005: "年计划",11510010: "月计划",11510015: "周计划"
  let valParamsObj = {
    11510005: ["planType", "accountYear", "beginTime", "endTime"],
    11510010: [
      "planType",
      "accountYear",
      "accountMonth",
      "beginTime",
      "endTime"
    ],
    11510015: [
      "planType",
      "accountYear",
      "accountMonth",
      "accountWeek",
      "beginTime",
      "endTime"
    ]
  };
  let eleName = "";
  let self = this;
  for (let i = 0; i < params.length; i++) {
    let item = params[i];
    let valParams = valParamsObj[item["planType"]];
    for (let j = 0; j < valParams.length; j++) {
      let key = valParams[j];
      const element = item[key];
      if (element != undefined && element != null && element != "") {
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
</script>
<style lang="scss" >
.definitionOfFundPlan {
  .input-div .el-col .el-input__icon {
    line-height: 20px;
  }
  .el-col {
    position: relative;
    .comicon {
      width: 170px;
      height: 20px;
      position: absolute;
      right: 6px;
      top: 7px;
      cursor: pointer;
    }
    .el-input-date {
      width: 77%;
      border-color: #97999e !important;
    }
  }
  .el-table {
    .el-date-editor {
      width: 140px !important;
    }
  }
}
</style>
