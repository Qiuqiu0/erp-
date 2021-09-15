<template>
  <div class="warehouseData content-div">
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
      <p class="hide-input" v-if="show" @click="inputShow()">
        更多条件 <i class="el-icon-caret-bottom"></i>
      </p>
      <p class="hide-input" v-else @click="inputShow()">
        收起<i class="el-icon-caret-top"></i>
      </p>
      <div class="search-div">
        <el-col :span="5" class="el-col">
          <label>仓库代码</label>
          <el-input
            v-model="warehouseCode"
            class="el-inputs"
            placeholder="请选择"
            clearable
            v-input-filter:code
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>仓库名称</label>
          <el-input
            v-model="warehouseName"
            class="el-inputs"
            placeholder="请选择"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-colc el_flex">
          <label>仓库类型</label>
          <el-select v-model="warehouseType" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeList"
              :key="item.dict_value"
              :label="item.dict_value"
              :value="item.dict_key"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-colc el_flex">
          <label>仓库性质</label>
          <el-select v-model="warehouseAttr" placeholder="请选择" clearable>
            <el-option
              v-for="item in attrList"
              :key="item.dict_value"
              :label="item.dict_value"
              :value="item.dict_key"
            ></el-option>
          </el-select>
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
      <!-- <el-button icon="el-icon-refresh" @click="addSub">保存</el-button> -->
      <el-button
        icon="el-icon-delete"
        v-if="$actionFlag(`F003`)"
        @click="setUp(0)"
        >删除</el-button
      >
      <el-button
        icon="el-icon-lock"
        v-if="$actionFlag(`F005`)"
        @click="setUp(3)"
        >禁用</el-button
      >
      <el-button
        icon="el-icon-unlock"
        v-if="$actionFlag(`F006`)"
        @click="setUp(4)"
        >启用</el-button
      >
      <el-button
        icon="el-icon-data-line"
        v-if="$actionFlag(`F004`)"
        @click="setUp(5)"
        >查看</el-button
      >
      <!-- <el-button
        icon="el-icon-refresh"
        v-if="$actionFlag(`F007`)"
        @click="synchronization"
        >金蝶仓库同步</el-button
      > -->
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
        <el-table-column prop="paritiesDate" label="仓库代码" width="90px" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.warehouseCode"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.warehouseCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="仓库名称" width="275px" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.warehouseName"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.warehouseName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="仓库类型" width="100px" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <div v-if="scope.row.edit">
              <el-select v-model="scope.row.warehouseType" placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.dict_value"
                  :label="item.dict_value"
                  :value="item.dict_value"
                ></el-option>
              </el-select>
            </div> -->
            <div>
              {{ scope.row.warehouseType }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="仓库性质" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <div v-if="scope.row.edit">
              <el-select v-model="scope.row.warehouseAttr" placeholder="请选择">
                <el-option
                  v-for="item in attrList"
                  :key="item.dict_value"
                  :label="item.dict_value"
                  :value="item.dict_value"
                ></el-option>
              </el-select>
            </div> -->
            <div>
              {{ scope.row.warehouseAttr }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createdName" label="创建人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createdTime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updatedName" label="修改人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updatedTime" label="修改时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.isInactive" placeholder="请选择">
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
import WareApi from "@/api/wareRate/wareRate";
export default {
  name: "warehouseData",
  data() {
    return {
      inputData: "", //输入框
      tableData: [], //表格
      selectioned: null, //表格选中项
      index: null, //选中index
      tableAssign: "", //表格深拷贝数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      isInactive: "", //1禁用 0启用
      isInaType: [
        { value: 0, label: "启用" },
        { value: 1, label: "禁用" }
      ],
      warehouseCode: "", //仓库代码
      warehouseName: "", //仓库名称
      warehouseType: "", //仓库类型
      warehouseAttr: "", //仓库性质
      loading: true, //表格loading
      typeList: [],
      attrList: [],
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
    this.$getQueryData(this);
    //仓库类型
    this.selectWare();
  },
  mounted() {
    if (localStorage.themecolor) {
      this.navColor.button.backgroundColor =
        "#" + localStorage.getItem("themecolor");
    } else {
      this.navColor.button.backgroundColor = "#" + this.themecolor;
    }
    // //获取表格
    // this.wareList();
  },
  methods: {
    synchronization(){
      this.$confirm("是否确定同步?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        WareApi.slTogether()
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
    //仓库类型
    selectWare() {
      let params = {
        dictNo: 1001
      };
      let that = this;
      function runAsync() {
        let p = new Promise(function(resolve, reject) {
          WareApi.selectWare(params)
            .then(res => {
              that.typeList = res.data;
              resolve();
            })
            .catch();
        });
        return p;
      }
      function runAsync2() {
        let p = new Promise(function(resolve, reject) {
          WareApi.selectWare({ dictNo: 1012 })
            .then(res => {
              that.attrList = res.data;
              resolve();
            })
            .catch();
        });
        return p;
      }
      function runAsync3() {
        let p = new Promise(function(resolve, reject) {
          that.wareList();
          resolve();
        });
        return p;
      }
      runAsync()
        .then(() => {
          return runAsync2();
        })
        .then(() => {
          return runAsync3();
        });

      // WareApi.selectWare(params)
      //   .then(res => {
      //     this.typeList = res.data;
      //   })
      //   .catch();
      // WareApi.selectWare({ dictNo: 1012 })
      //   .then(res => {
      //     this.attrList = res.data;
      //   })
      //   .catch();
      // //获取表格
      // this.wareList();
    },
    //获取表格
    wareList() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        isInactive: this.isInactive,
        warehouseCode: this.warehouseCode,
        warehouseName: this.warehouseName,
        warehouseType: this.warehouseType,
        warehouseAttr: this.warehouseAttr
      };
      this.$setQueryData(this,params);
      WareApi.wareList(params)
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
            for (const iterator of this.typeList) {
              if (item.warehouseType == iterator.dict_code) {
                item.warehouseType = iterator.dict_value;
              }
            }
            for (const iterator of this.attrList) {
              if (item.warehouseAttr == iterator.dict_code) {
                item.warehouseAttr = iterator.dict_value;
              }
            }
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
      this.wareList();
    },
    //清空选项
    clearNone() {
      this.warehouseCode = "";
      this.warehouseName = "";
      this.warehouseType = "";
      this.warehouseAttr = "";
      this.isInactive = "";
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.wareList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.wareList();
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
      // let index = this.tableData.indexOf(e);
      // this.tableData.forEach(item => {
      //   item.edit = false;
      // });
      // this.tableData[index].edit = true;
      // this.selectioned = e;
      // this.index = this.tableData.indexOf(e);
      // this.$set(this.tableData, this.tableData.indexOf(e), e);
    },
    //单行点击
    rowClick(e) {
      // this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(e);
      // this.selectioned = e;
      // this.index = this.tableData.indexOf(e);
    },
    //数据操作  1修改 0删除 3禁用4启用 5查询
    setUp(e) {
      if (!this.selectioned) {
        this.$openWarning("未选择数据");
        return false;
      }
      if (e == 1) {
        this.$router.push({
          path: "/index/warehouseData/establish",
          query: { id: this.selectioned[0].warehouseId }
        });
      } else if (e == 5) {
        this.$router.push({
          path: "/index/warehouseData/warehouseDetail",
          query: { id: this.selectioned[0].warehouseId }
        });
      } else {
        let title = `是否确定删除`;
        if (e == 3) {
          title = `是否确定禁用`;
        } else if (e == 4) {
          title = `是否确定启用`;
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
              let ojb = {};
              item.isInactive == `启用`
                ? (item.isInactive = 0)
                : (item.isInactive = 1);
              ojb.warehouseId = item.warehouseId;
              ojb.version = item.version;
              ojb.isInactive = item.isInactive;
              if (item.one) {
                ned.push(item);
              } else {
                old.push(ojb);
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
                if (par.length) {
                  WareApi.delWare(old)
                    .then(res => {
                      this.$openSuccess(res.message);
                      this.deleIndex(this.selectioned);
                      // this.wareList();
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
                if (par.length) {
                  WareApi.wareBblock(old)
                    .then(res => {
                      this.$openSuccess(res.message);
                      this.wareList();
                    })
                    .catch();
                } else {
                  this.$openWarning("不可修改");
                }
                break;
              case 4:
                if (par.length) {
                  WareApi.startWare(old)
                    .then(res => {
                      this.$openSuccess(res.message);
                      this.wareList();
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
    //     if (e.warehouseId) {
    //       return item.warehouseId == e.warehouseId;
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
          return item.one == get.one && item.warehouseId == get.warehouseId;
        });
        this.tableData.splice(del, 1);
      }
    },
    //创建数据
    addList() {
      this.$router.push({ path: "/index/warehouseData/establish" });
    },
    //保存数据
    addSub() {
      if (this.tableData.length == 0) {
        this.$openWarning("无数据提交");
        return false;
      }
      let tableData = [...this.tableData];
      for (const item of tableData) {
        if (
          item.warehouseCode == "" ||
          item.warehouseName == "" ||
          item.warehouseType == "" ||
          item.warehouseAttr == ""
        ) {
          this.$openWarning("填写完整数据");
          return false;
        } else {
          for (const obj of this.typeList) {
            if (item.warehouseType == obj.label) item.warehouseType = obj.value;
            if (item.warehouseAttr == obj.label) item.warehouseAttr = obj.value;
          }
          item.isInactive == "0"
            ? (item.isInactive = "启用")
            : (item.isInactive = "禁用");
        }
        this.$confirm("是否确定提交", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params = tableData;
            WareApi.updateWare(params)
              .then(res => {
                this.$openSuccess(res.message);
                this.wareList();
              })
              .catch();
          })
          .catch();
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
    }
  }
};
</script>

<style lang="scss">
.warehouseData {
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
