<template>
  <div class="currencyData content-div">
    <el-col class="el-col el-col-btn auto-sibling">
      <div class="button-div">
        <el-button icon="el-icon-search" class="query-button" @click="queryData"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" @click="clearNone">重置</el-button>
      </div>
    </el-col>
    <!-- 搜索 -->
    <div class="index-div3 input-div auto-sibling">
      <!-- <p class="hide-input" v-if="show" @click="inputShow()">更多条件 <i class="el-icon-caret-bottom"></i></p>
      <p class="hide-input" v-else @click="inputShow()">收起<i class="el-icon-caret-top"></i></p> -->
      <div class="">
        <el-col :span="5" class="el-col">
          <label>货币代码</label>
          <el-input
            v-model="currencyCode"
            class="el-inputs"
            v-input-filter:code
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>货币名称</label>
          <el-input
            v-model="currencyName"
            class="el-inputs"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>状态</label>
          <el-select v-model="isInactive" placeholder="请选择" clearable>
            <el-option
              v-for="item in stateList"
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
        class="query-button"
        v-if="$actionFlag(`F001`)"
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
      <el-button
        icon="el-icon-refresh"
        v-if="$actionFlag(`F008`)"
        @click="synchronization"
        >用友货币同步</el-button
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="paritiesDate"
          label="货币代码"
          width="150px"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-input
                v-model="scope.row.currencyCode"
                @blur="handleCurrencyRule(scope)"
                v-input-filter:code
                :disabled="scope.row.currencyId ? true : false"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.currencyCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="货币名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-input
                v-model="scope.row.currencyName"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.currencyName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="货币简称" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-input
                v-model="scope.row.currencyShort"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.currencyShort }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdName"
          label="创建人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="updatedName"
          label="修改人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="updatedTime"
          label="修改时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="name" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select
                v-model="scope.row.isInactive"
                @change="handleUnitInactive(scope.row.isInactive)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in stateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.isInactive }}</div>
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
import CurrApi from "@/api/currRate/currRate";
import { NameAndCode } from "@/api/currRate/currRateApi";
export default {
  name: "currencyData",
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
      currencyCode: "", //货币代码
      currencyName: "", //货币名称
      addNow: false, //创建状态
      loading: true, //表格loading
      isInactive: "", //状态
      stateList: [
        { value: 0, label: "启用" },
        { value: 1, label: "禁用" }
      ], //状态列表
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerClose: {},
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
    this.currList();
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
    synchronization(){
      this.$confirm("是否确定同步?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        CurrApi.hbTogether()
        .then(res => {
          if(res.code==='success'){
            this.$openSuccess(res.message);
          }
          
        })
        .catch();
      });
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    //获取表格
    currList() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        currencyCode: this.currencyCode,
        currencyName: this.currencyName,
        isInactive: this.isInactive
      };
      CurrApi.currList(params)
        .then(res => {
          this.loading = false;
          this.tableAssign = [...res.data];
          res.data.forEach(item => {
            item.edit = false;
            item.isInactive == "0"
              ? (item.isInactive = "启用")
              : (item.isInactive = "禁用");
            item.createdTime = this.$timeFun(item.createdTime, 1);
            item.updatedTime = this.$timeFun(item.updatedTime, 1);
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
      this.currList();
    },
    //清空选项
    clearNone() {
      this.currencyCode = "";
      this.currencyName = "";
      this.isInactive = "";
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.currList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.currList();
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
        this.selectioned = row;
        this.index = this.tableData.indexOf(row);
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    //单行双击
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
    //单行点击
    rowClick(e) {
      // this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e);
      // this.selectioned = e;
      // this.index = this.tableData.indexOf(e);
    },
    //数据操作  1修改 0删除 3启用4禁用
    setUp(e) {
      if (!this.selectioned) {
        this.$openWarning("未选择数据");
        return false;
      }
      this.tableData.forEach(item => {
        item.edit = false;
      });
      if (e == 1) {
        for (const get of this.selectioned) {
          this.tableData.forEach((item, index) => {
            if (item.one == get.one && item.currencyId == get.currencyId) {
              item.change = 1;
              item.edit = true;
            }
            this.$set(this.tableData, index, this.tableData[index]);
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
                  CurrApi.delCurr(old)
                    .then(res => {
                      this.$openSuccess("删除成功");
                      // this.currList();
                      this.deleIndex(this.selectioned);
                      this.selectioned = [];
                      this.$refs.multipleTable.clearSelection();
                    })
                    .catch();
                } else {
                  this.deleIndex(this.selectioned);
                  this.$refs.multipleTable.clearSelection();
                }
                break;
              case 3:
                if (old.length) {
                  CurrApi.startCurr(old)
                    .then(res => {
                      this.$openSuccess("启用成功");
                      this.currList();
                    })
                    .catch();
                } else {
                  this.$openWarning("不可修改");
                }
                break;
              case 4:
                if (old.length) {
                  CurrApi.blockCurr(old)
                    .then(res => {
                      this.$openSuccess("禁用成功");
                      this.currList();
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
          return item.one == get.one && item.currencyId == get.currencyId;
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
      let data = {
        edit: true,
        one: noe,
        currencyName: ``,
        currencyShort: ``,
        currencyCode: ``,
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
      let old = JSON.stringify(changeArr);
      let changeData = JSON.parse(old);

      if (this.tableData.length == 0 || changeData.length == 0) {
        this.$openWarning("无数据提交");
        return false;
      }
      for (let i = 0; i < changeData.length; i++) {
        const item = changeData[i];
        for (let j = i + 1; j < changeData.length; j++) {
          const el = changeData[j];
          if (item.currencyCode == el.currencyCode) {
            this.$openWarning('"货币代码"不允许存入重复字段');
            return;
          }
        }
      }
      for (const item of changeData) {
        if (
          item.currencyCode == "" ||
          item.currencyName == "" ||
          item.currencyShort == ""
        ) {
          this.$openWarning("填写完整数据");
          return false;
        } else {
          item.isInactive == "启用"
            ? (item.isInactive = "0")
            : (item.isInactive = "1");
          item.type == "国内" ? (item.type = "0") : (item.type = "1");
        }
        this.$confirm("是否确定提交", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params = changeData;
            CurrApi.addCur(params)
              .then(res => {
                this.$openSuccess("保存成功");
                this.currList();
              })
              .catch();
          })
          .catch();
      }
    },
    handleCurrencyRule(scope) {
      if (scope.row.currencyCode) {
        if (!scope.row.currencyId) {
          NameAndCode({ currencyCode: scope.row.currencyCode })
            .then(res => {
              // this.$openSuccess('"货币代码"可用')
            })
            .catch(err => {
              scope.row.currencyCode = "";
            });
        }
      }
    },
    handleUnitInactive(state) {
      if (state == "启用") {
        state = 1;
      } else {
        state = 0;
      }
      if (this.selectioned.length == 0) {
        this.$openWarning("请选择货币");
      } else {
        let temp = JSON.parse(JSON.stringify(this.selectioned));
        for (let i = 0; i < temp.length; i++) {
          const el = temp[i];
          if (!el.currencyId) {
            temp.splice(i, 1);
            i--;
          }
          el.isInactive = state;
        }
        switch (state) {
          case 1:
            this.enableGdGoodsUnit(temp);
            break;
          case 0:
            this.stopGdGoodsUnit(temp);
            break;
          default:
            break;
        }
      }
    },
    //启用
    enableGdGoodsUnit(temp) {
      CurrApi.startCurr(temp)
        .then(res => {
          this.$openSuccess("启用成功");
          this.currList();
        })
        .catch(() => {});
    },
    //禁用
    stopGdGoodsUnit(temp) {
      CurrApi.blockCurr(temp)
        .then(res => {
          this.$openSuccess("禁用成功");
          this.currList();
        })
        .catch(() => {});
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
.currencyData {
  /* margin-left: 19px;
  width: 97%; */
  .el_flex {
    display: flex;
    align-items: center;
  }

  .el-date-editor.el-input {
    width: auto;
  }
}
</style>
