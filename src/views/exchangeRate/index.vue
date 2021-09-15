<template>
  <div class="basicData content-div exch">
    <div class="button-div auto-sibling">
      <el-button class="query-button" @click="queryData" icon="el-icon-search"
        >查询</el-button
      >
      <el-button @click="clearNone" icon="el-icon-refresh">重置</el-button>
    </div>
    <!-- 搜索 -->
    <div class="index-div3 input-div auto-sibling">
      <p class="hide-input" v-if="show" @click="inputShow()">
        更多条件 <i class="el-icon-caret-bottom"></i>
      </p>
      <p class="hide-input" v-else @click="inputShow()">
        收起<i class="el-icon-caret-top"></i>
      </p>
      <div class="search-div">
        <el-col :span="5" class="el-col">
          <label>源货币</label>
          <el-select
            v-model="formValue"
            filterable
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in currSel"
              :key="item.currencyId"
              :label="item.currencyName"
              :value="item.currencyId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>目标币</label>
          <el-select
            v-model="toValue"
            filterable
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in currSel"
              :key="item.currencyId"
              :label="item.currencyName"
              :value="item.currencyId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-colc el_flex">
          <label>起始日期</label>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            clearable
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-col el_flex">
          <label>截止日期</label>
          <el-date-picker
            v-model="value3"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerClose"
            clearable
          ></el-date-picker>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>状态</label>
          <el-select v-model="isInactive" placeholder="请选择" clearable>
            <el-option
              v-for="item in isInaType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </div>
    </div>
    <!--按钮样式-->
    <div class="button-div auto-sibling">
      <el-button
        icon="el-icon-folder-add"
        v-if="$actionFlag(`F001`)"
        class="query-button"
        @click="addList"
        >创建</el-button
      >
      <el-button
        icon="el-icon-edit"
        v-if="$actionFlag(`F002`)"
        @click="setUp(1)"
        >修改</el-button
      >
      <el-button
        icon="el-icon-suitcase"
        v-if="$actionFlag(`F003`)"
        @click="addSub"
        >保存</el-button
      >
      <el-button
        icon="el-icon-delete"
        v-if="$actionFlag(`F004`)"
        @click="setUp(0)"
        >删除</el-button
      >
      <el-button
        icon="el-icon-unlock"
        v-if="$actionFlag(`F005`)"
        @click="setUp(3)"
        >启用</el-button
      >
      <el-button
        icon="el-icon-lock"
        v-if="$actionFlag(`F006`)"
        @click="setUp(4)"
        >禁用</el-button
      >
      <el-button icon="el-icon-download" v-if="$actionFlag(`F007`)"
        >导出</el-button
      >
      <!-- <el-button
        icon="el-icon-refresh"
        v-if="$actionFlag(`F009`)"
        @click="synchronization('sl')"
        >金蝶税率同步</el-button
      > -->
      <el-button
        icon="el-icon-refresh"
        v-if="$actionFlag(`F008`)"
        @click="synchronization('hl')"
        >用友汇率同步</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        :data="tableData"
        class="el-table"
        ref="multipleTable"
        height="calc(100% - 35px)"
        @selection-change="handleChange"
        @row-dblclick="dblclick"
        @row-click="rowClick"
        v-loading="loading"
      >
        <el-table-column
          type="selection"
          width="55"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          type="index"
          width="50"
          label="序号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="paritiesDate"
          label="日期"
          width="150px"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-date-picker
                v-model="scope.row.paritiesDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :disabled="scope.row.paritiesId ? true : false"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
            <div v-else>{{ scope.row.paritiesDate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="源货币" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in currSel" :key="item.currencyId">
              <span v-if="item.currencyName == scope.row.currencyFromName">{{
                (scope.row.currencyShortNameFrom = item.currencyCode)
              }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="源货币名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-select
                v-model="scope.row.currencyFromName"
                filterable
                @change="handleOrgCurrencyRule(scope)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in currSel"
                  :key="item.currencyId"
                  :label="item.currencyName"
                  :value="item.currencyName"
                ></el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.currencyFromName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="parities" label="汇率" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-input
                v-model="scope.row.parities"
                onKeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace(/^0[^.]/,'').replace(/^\./,'')"
                onKeypress="value=value.replace(/\.\d{8}/,'.'+Math.floor((value%1)*10000000))"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.parities }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="目标货币" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-for="item in currSel" :key="item.currencyId">
              <span v-if="item.currencyName == scope.row.currencyToName">{{
                (scope.row.currencyShortNameTo = item.currencyCode)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="目标货币名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-select
                v-model="scope.row.currencyToName"
                filterable
                @change="handleTarCurrencyRule(scope)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in currSel"
                  :key="item.currencyId"
                  :label="item.currencyName"
                  :value="item.currencyName"
                ></el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.currencyToName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select
                v-model="scope.row.isInactive"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in isInaType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.isInactive }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.remark"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.remark }}</div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页background-->
      <el-pagination
      background
        @size-change="handleSizeChange"
        @current-change="currentChange"
        :current-page="pageNum"
        :page-sizes="[100, 200, 300,500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ExApi from "@/api/exchangeRate/exchangeRate";
export default {
  name: "basicData",
  data() {
    return {
      inputData: "", //输入框
      tableData: [], //表格
      tableAssign: "", //表格深拷贝数据
      selectioned: null, //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      value2: "", //日期
      value3: "", //截止日期
      source: "", //源货币
      target: "", //目标币
      currSel: [], //货币选项
      formValue: ``, //元货币值
      toValue: ``, //目标币值
      noneBool: true, //是否全部输入 true是 false否
      loading: true, //表格loading
      isInactive: "",
      isInaType: [
        { value: 0, label: "启用" },
        { value: 1, label: "禁用" }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {}, //日期禁止项
      navColor: {
        button: {
          backgroundColor: "" //按钮颜色
        }
      },
      show: true
    };
  },
  created() {
    let that = this;
    if (that.value2 !== "") {
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() > that.value2;
        }
      };
    }
    //获取表格
    this.pariList();
    //获取货币
    this.listSimple();
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
    synchronization(e){
      this.$confirm("是否确定同步?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if(e=='sl'){
         ExApi.slTogether()
        .then(res => {
          if(res.code==='success'){
            this.$openSuccess(res.message);
          }
          
        })
        .catch();
      }else if(e=='hl'){
        ExApi.hlTogether()
        .then(res => {
          if(res.code==='success'){
            this.$openSuccess(res.message);
          }
          
        })
        .catch();
      }
      }); 
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    //查询货币接口
    listSimple() {
      ExApi.listSimple()
        .then(res => {
          this.currSel = res.data;
        })
        .catch();
    },
    //获取表格
    pariList() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        formCurrencyId: this.formValue,
        toCurrencyId: this.toValue,
        isInactive: this.isInactive,
        paritiesDateFrom: this.value2, //起始日期
        paritiesDateTo: this.value3 //截止日期
      };
      ExApi.pariList(params)
        .then(res => {
          this.loading = false;
          this.tableAssign = [...res.data];
          res.data.forEach(item => {
            item.edit = false;
            item.isInactive == "0"
              ? (item.isInactive = "启用")
              : (item.isInactive = "禁用");
            item.paritiesDate = this.$timeFun(item.paritiesDate, 1);
          });
          this.tableData = res.data;
          this.total = res.total;
          // if (res.data.length !== 0) {
          //   this.pageSize = res.data[0].pageSize;
          // }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //查询
    queryData() {
      if (Boolean(this.value2) != Boolean(this.value3)) {
        this.$openWarning("选择完整的起止日期");
        return false;
      }
      this.pariList();
    },
    //清空选项
    clearNone() {
      this.value2 = "";
      this.value3 = "";
      this.formValue = "";
      this.toValue = "";
      this.isInactive = "";
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.pariList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.pariList();
    },
    //表格选择
    handleChange(e) {
      this.selectioned = e;
    },
    //表格单选
    dialogCheck(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length === 0) {
        // 判断selection是否有值存在
        return;
      }
      if (row) {
        this.index = this.tableData.indexOf(row);
        this.selectioned = row;
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
    dblclick(e) {
      this.tableData.forEach(item => {
        item.edit = false;
      });
      this.index = this.tableData.indexOf(e);
      let index = this.index;
      this.tableData[index].edit = true;
      this.tableData[index].change = 1;
      this.$set(this.tableData, this.tableData.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      // this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e);
      // this.selectioned = e;
      // this.index = this.tableData.indexOf(e);
    },
    //表格禁止选择项
    // selectInit(row, index) {
    //   if (index === 0 && this.addNow) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    //数据操作  1修改 0删除 3启用4禁用
    setUp(e) {
      if (!this.selectioned.length) {
        this.$openWarning("未选择数据");
        return false;
      }
      if (e == 1) {
        for (const get of this.selectioned) {
          this.tableData.forEach((item, index) => {
            if (item.one == get.one && item.paritiesId == get.paritiesId) {
              item.change = 1;
              item.edit = true;
              this.$set(this.tableData, index, this.tableData[index]);
            }
          });
        }
      } else {
        let title = `是否确定删除`;
        if (e == 3) {
          title = `是否确定启用`;
        } else if (e == 4) {
          title = `是否确定禁用`;
        }
        this.$confirm(title, {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false
        })
          .then(() => {
            let params = this.selectioned;
            let par = JSON.parse(JSON.stringify(params));
            let old = []; //旧数据
            let ned = []; //新增数据
            for (const item of par) {
              item.isInactive == `启用`
                ? (item.isInactive = 0)
                : (item.isInactive = 1);
              if (item.one) {
                ned.push(item);
              } else {
                old.push(item);
              }
            }
            //isInactive 0启用 1禁用 2删除
            switch (e) {
              case 0:
                for (const item of old) {
                  if (item.isInactive == `0`) {
                    this.$openWarning(`启用状态不可删除`);
                    return false;
                  }
                  item.isInactive == `启用`
                    ? (item.isInactive = 0)
                    : (item.isInactive = 1);
                }
                if (old.length) {
                  ExApi.delBbParitiesBase(old)
                    .then(res => {
                      this.$openSuccess("删除成功");
                      this.deleIndex(this.selectioned);
                      this.selectioned = [];
                      this.$refs.multipleTable.clearSelection();
                    })
                    .catch();
                } else {
                  this.deleIndex(ned);
                  this.$refs.multipleTable.clearSelection();
                }
                break;
              case 3:
                if (old.length) {
                  ExApi.startParitie(old)
                    .then(res => {
                      this.$openSuccess("启用成功");
                      this.pariList();
                    })
                    .catch();
                } else {
                  this.$openWarning("不可修改");
                }
                break;
              case 4:
                if (old.length) {
                  ExApi.blockUpBbParities(old)
                    .then(res => {
                      this.$openSuccess("禁用成功");
                      this.pariList();
                    })
                    .catch();
                } else {
                  this.$openWarning("不可修改");
                }
                break;
              default:
                break;
            }
          })
          .catch();
      }
    },
    //删除方法
    deleIndex(e) {
      for (const get of e) {
        let del = this.tableData.findIndex(item => {
          return item.one == get.one && item.paritiesId == get.paritiesId;
        });
        this.tableData.splice(del, 1);
      }
    },
    //创建数据
    addList() {
      this.tableData.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      function ba(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
      }
      let da = ba(new Date());
      let data = {
        edit: true,
        one: noe,
        paritiesDate: da,
        parities: ``,
        currencyToName: ``,
        currencyShortNameTo: ``,
        toCurrencyId: ``,
        currencyShortNameFrom: ``,
        currencyFromName: ``,
        formCurrencyId: ``,
        isInactive: `启用`,
        change: 1
      };
      this.newTbale.unshift(data);
      let newTbale = [];
      newTbale.unshift(data);
      this.tableData = newTbale.concat(this.tableData);
    },
    //保存数据
    addSub() {
      let changeArr = this.tableData.filter(item => {
        return item.change == 1;
      });
      console;
      let old = JSON.stringify(changeArr);
      let changeData = JSON.parse(old);

      if (this.tableData.length == 0 || changeData.length == 0) {
        this.$openWarning("无数据提交");
        return false;
      }
      console.log(changeData);
      for (const item of changeData) {
        if (
          item.currencyToName == "" ||
          item.currencyShortNameTo == "" ||
          item.currencyShortNameFrom == "" ||
          item.currencyFromName == "" ||
          item.paritiesDate == "" ||
          item.parities == ""
        ) {
          this.$openWarning("填写完整数据");
          return false;
        } else {
          for (let obj of this.currSel) {
            if (item.currencyToName == obj.currencyName)
              item.toCurrencyId = obj.currencyId;
            if (item.currencyFromName == obj.currencyName)
              item.formCurrencyId = obj.currencyId;
          }
          item.isInactive == "启用"
            ? (item.isInactive = "0")
            : (item.isInactive = "1");
        }
      }
      this.$confirm("是否确定提交", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = changeData;
          ExApi.addParitie(params)
            .then(res => {
              this.$openSuccess("保存成功");
              this.pariList();
            })
            .catch();
        })
        .catch();
    },
    handleOrgCurrencyRule(scope) {
      if (scope.row.currencyToName) {
        if (scope.row.currencyToName == scope.row.currencyFromName) {
          this.$openWarning('"源货币"不应与"目标货币"相同');
          scope.row.currencyFromName = "";
        }
      }
    },
    handleTarCurrencyRule(scope) {
      if (scope.row.currencyFromName) {
        if (scope.row.currencyToName == scope.row.currencyFromName) {
          this.$openWarning('"目标货币"不应与"源货币"相同');
          scope.row.currencyToName = "";
        }
      }
    }
  },
  computed: {
    ...mapState({
      themecolor: "themecolor"
    })
  },
  watch: {
    themecolor: {
      handler() {
        this.navColor.button.backgroundColor = "#" + this.themecolor;
      }
    },
    value2(val) {
      let that = this;
      if (val > that.value3) {
        that.value3 = "";
      }
      this.pickerClose = {
        disabledDate(time) {
          return time.getTime() < that.value2;
        }
      };
    }
  }
};
</script>

<style lang="scss">
.basicData.exch {
  /* margin-left: 19px;
  width: 97%; */
  .el_flex {
    display: flex;
    align-items: center;
  }
  .el-date-editor.el-input {
    width: auto;
  }
  .el-input__icon {
    line-height: inherit;
  }
}
</style>
