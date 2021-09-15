<template>
  <div class="bankData content-div">
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
          <label>银行行号</label>
          <el-input
            v-model="bankCode"
            v-input-filter:code
            class="el-inputs"
            placeholder="请选择"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>银行名称</label>
          <el-input
            v-model="bankName"
            class="el-inputs"
            placeholder="请选择"
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
        <el-col :span="5" class="el-col">
          <label>类型</label>
          <el-select v-model="type" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeList"
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
      <el-button
        icon="el-icon-lock"
        v-if="$actionFlag(`F007`)"
        @click="synchronization"
        >用友银行同步</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="el-table-div" v-auto>
      <el-table
        border
        center
        highlight-current-row
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
          prop="bankCode"
          label="银行行号"
          width="150px"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-input
                v-model="scope.row.bankCode"
                v-input-filter:code
                @blur="handleBankcodeRule(scope)"
                :disabled="scope.row.bankId ? true : false"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.bankCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="bankName" label="银行名称" show-overflow-tooltip width="170">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-input
                v-model="scope.row.bankName"
                @blur="handleBanknameRule(scope)"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.bankName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="国家代码" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-input
                v-model="scope.row.provinceId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </div>
            <div v-else>{{ scope.row.provinceId }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="parities" label="国家名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-select
              filterable
                v-model="scope.row.countryName"
                @change="selChange(scope.row.countryName, scope.$index)"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in countryList"
                  :key="index"
                  :label="item.regionName"
                  :value="item.regionName"
                ></el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.countryName }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="bankSwiftCode"
          label="SWIFT码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.bankSwiftCode"
                v-input-filter:code
                @blur="handleBankcodeRule(scope)"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.bankSwiftCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="银行地址" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.bankAddress"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.bankAddress }}</div>
          </template>
        </el-table-column>
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
        <el-table-column prop="remark" label="类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.bankType" placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.bankType }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.createdTime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="修改人" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.updatedName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="修改时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ $timeFun(scope.row.updatedTime, 1) }}</div>
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
import ExApi from "@/api/bankRate/bankRate";
import { nameAndCode } from "@/api/bankRate/bankRateApi";
export default {
  name: "bankData",
  data() {
    return {
      tableData: [], //表格
      tableAssign: "", //表格深拷贝数据
      selectioned: [], //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      codeList: [], //银行代码列表
      bankName: "", //银行名称
      countryList: [], //国家列表
      bankCode: "", //银行行号
      isInactive: "", //状态
      stateList: [{ value: 0, label: "启用" }, { value: 1, label: "禁用" }], //状态列表
      type: "", //类型
      typeList: [{ value: 0, label: "国内" }, { value: 1, label: "国外" }], //类型状态
      loading: true, //表格loading
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
    this.conList();
    //获取表格
    this.bankList();
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
    synchronization() {
      this.$confirm("是否确定同步?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ExApi.yhTogether()
          .then(res => {
            if (res.code === "success") {
              console.log(res);
              this.$openSuccess(res.message);
            }
          })
          .catch();
      });
    },
    inputShow() {
      this.show = this.$showOne(this.show);
    },
    //选择国家
    selChange(e, index) {
      for (const item of this.countryList) {
        if (item.regionName == e) {
          this.tableData[index].provinceId = item.regionType;
        }
      }
    },
    //获取表格
    conList() {
      let params = {};
      ExApi.areaList(params)
        .then(res => {
          this.countryList = res.data;
        })
        .catch();
    },
    //获取表格
    bankList() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        bankName: this.bankName,
        bankCode: this.bankCode,
        isInactive: this.isInactive,
        bankType: this.type
      };
      ExApi.bankList(params)
        .then(res => {
          this.loading = false;
          this.tableAssign = [...res.data];
          res.data.forEach(item => {
            item.edit = false;
            item.createdTime = this.$timeFun(item.createdTime, 1);
            item.isInactive == "0"
              ? (item.isInactive = "启用")
              : (item.isInactive = "禁用");
            item.bankType == "0"
              ? (item.bankType = "国内")
              : (item.bankType = "国外");
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
      this.bankList();
    },
    //清空选项
    clearNone() {
      this.bankName = ``;
      this.bankCode = ``;
      this.isInactive = ``;
      this.type = ``;
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.bankList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.bankList();
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
      // this.index = this.tableData.indexOf(e);
      // this.selectioned = e;
    },
    //数据操作  1修改 0删除 3启用4禁用
    setUp(e) {
      if (this.selectioned.length == 0) {
        this.$openWarning("未选择数据");
        return false;
      }
      if (e == 1) {
        this.tableData.forEach(item => {
          item.edit = false;
        });
        for (const get of this.selectioned) {
          this.tableData.forEach((item, index) => {
            if (item.one == get.one && item.bankId == get.bankId) {
              item.change = 1;
              item.edit = true;
            }
            this.$set(this.tableData, index, this.tableData[index]);
          });
        }
        this.tableData[this.index].edit = true;
        this.tableData[this.index].change = 1;
        this.$set(this.tableData, this.index, this.tableData[this.index]);
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
              item.bankType == "国内"
                ? (item.bankType = 0)
                : (item.bankType = 1);
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
                  ExApi.delBank(old)
                    .then(res => {
                      this.$openSuccess("删除成功");
                      this.deleIndex(this.selectioned);
                      this.selectioned = [];
                      this.$refs.multipleTable.clearSelection();
                      // this.bankList();
                    })
                    .catch();
                } else {
                  this.deleIndex(ned);
                  this.$refs.multipleTable.clearSelection();
                }
                break;
              case 3:
                if (old.length) {
                  ExApi.startBank(old)
                    .then(res => {
                      this.$openSuccess("启用成功");
                      this.bankList();
                    })
                    .catch();
                } else {
                  this.$openWarning("不可修改");
                }
                break;
              case 4:
                if (old.length) {
                  ExApi.blocBank(old)
                    .then(res => {
                      this.$openSuccess("禁用成功");
                      this.bankList();
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
    // //删除方法
    // deleIndex(e) {
    //   let del = this.tableData.findIndex(item => {
    //     if (e.bankId) {
    //       return item.bankId == e.bankId;
    //     } else {
    //       return item.one == e.one;
    //     }
    //   });
    //   this.tableData.splice(del, 1);
    // },
    //删除方法
    deleIndex(e) {
      for (const get of e) {
        let del = this.tableData.findIndex(item => {
          return item.one == get.one && item.bankId == get.bankId;
        });
        this.tableData.splice(del, 1);
      }
    },
    //创建数据
    addList() {
      this.clearNone();
      this.tableData.forEach(item => {
        item.edit = false;
      });
      let noe = new Date().valueOf();
      let data = {
        edit: true,
        one: noe,
        bankCode: ``,
        bankName: ``,
        provinceId: ``,
        countryName: ``,
        bankSwiftCode: ``,
        bankAddress: ``,
        isInactive: `启用`,
        bankType: `国内`,
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
          if (item.bankCode == el.bankCode) {
            this.$openWarning('"银行行号"不允许存入重复字段');
            return;
          }
        }
      }
      for (const item of changeData) {
        if (
          item.bankCode == "" ||
          item.bankName == "" ||
          item.provinceId == "" ||
          item.countryName == ""
        ) {
          this.$openWarning("填写完整数据");
          return false;
        } else {
          item.isInactive == "启用"
            ? (item.isInactive = "0")
            : (item.isInactive = "1");
          item.bankType == "国内"
            ? (item.bankType = "0")
            : (item.bankType = "1");
        }
        this.$confirm("是否确定提交", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params = changeData;
            ExApi.insBank(params)
              .then(res => {
                this.$openSuccess("保存成功");
                this.bankList();
              })
              .catch();
          })
          .catch();
      }
    },
    //银行行号校验
    handleBankcodeRule(scope) {
      if (scope.row.bankCode) {
        if (!scope.row.bankId) {
          nameAndCode({ bankCode: scope.row.bankCode })
            .then(res => {
              // this.$openSuccess('"银行行号"可用')
            })
            .catch(err => {
              // this.$openWarning('"银行行号"已存在')
              scope.row.bankCode = "";
            });
        }
      } else {
        this.$openWarning('请输入"银行行号"');
      }
    },
    //银行名称校验
    handleBanknameRule(scope) {
      // if (scope.row.bankName) {
      //   if (!scope.row.bankId) {
      //     nameAndCode({ bankName: scope.row.bankName }).then((res) => {
      //       this.$openSuccess('"银行名称"可用')
      //     }).catch((err) => {
      //       scope.row.bankName = ''
      //     })
      //   }
      // } else {
      //   this.$openWarning('请输入"银行名称"')
      // }
    },
    handleUnitInactive(state) {
      if (state == "启用") {
        state = 1;
      } else {
        state = 0;
      }
      if (this.selectioned.length == 0) {
        this.$openWarning("请选择银行");
      } else {
        let temp = JSON.parse(JSON.stringify(this.selectioned));
        for (let i = 0; i < temp.length; i++) {
          const el = temp[i];
          if (!el.bankId) {
            temp.splice(i, 1);
            i--;
          }
          if (el.bankType == "国内") {
            el.bankType = 0;
          } else {
            el.bankType = 1;
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
      ExApi.startBank(temp)
        .then(res => {
          this.$openSuccess("启用成功");
          this.bankList();
        })
        .catch(() => {});
    },
    //禁用
    stopGdGoodsUnit(temp) {
      ExApi.blocBank(temp)
        .then(res => {
          this.$openSuccess("禁用成功");
          this.bankList();
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
    }
  }
};
</script>

<style lang="scss">
.bankData {
  /* margin-left: 19px;
  width: 97%; */
  .el_flex {
    display: flex;
    align-items: center;
  }
  .el-date-editor.el-input {
    width: auto;
  }
  .el-input__inner {
    height: 30px;
  }
  .el-select__caret.el-input__icon {
    line-height: inherit;
  }
}
</style>
