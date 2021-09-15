<template>
  <div class="portData">
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
      <div>
        <el-col :span="5" class="el-col">
          <label>港口编号</label>
          <el-input
            v-model="portCode"
            class="el-inputs"
            placeholder="请输入"
            v-input-filter:code
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>港口名称</label
          ><el-input
            v-model="portName"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col">
          <label>状态</label>
          <el-select v-model="isInactive" placeholder="请选择">
            <el-option
              v-for="item in stateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
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
        v-loading="loading"
        @selection-change="handleChange"
        @row-dblclick="dblclick"
        @row-click="rowClick"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="paritiesDate"
          label="港口编号"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit && !scope.row.portId">
              <span class="must-full">*</span>
              <el-input
                v-model="scope.row.portCode"
                placeholder="请输入内容"
                v-input-filter:code
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.portCode }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="paritiesDate"
          label="港口名称"
          show-overflow-tooltip
           width="170"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span class="must-full">*</span>
              <el-input
                v-model="scope.row.portName"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.portName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="国家" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-show="scope.row.edit">
              <span class="must-full">*</span>
              <el-select
                filterable
                v-model="scope.row.countryId"
                placeholder="请选择"
                @change="companyTable(scope.row.countryId, scope.$index)"
              >
                <el-option
                  v-for="item in areaList"
                  :key="item.regionId"
                  :label="item.regionName"
                  :value="item.regionId"
                >
                </el-option>
              </el-select>
            </div>
            <div v-show="!scope.row.edit">
              {{ scope.row.countryName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="paritiesDate" label="省份" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select
                filterable
                v-model="scope.row.provinceId"
                placeholder="请选择"
                @change="brandchTableChange(scope.row.provinceId, scope.$index)"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.regionId"
                  :label="item.regionName"
                  :value="item.regionId"
                >
                </el-option>
              </el-select>
            </div>
            <div v-else>
              {{ scope.row.provinceName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="paritiesDate" label="地址" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.portAddress"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.portAddress }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select v-model="scope.row.isInactive" placeholder="请选择">
                <el-option
                  v-for="item in stateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </div>
            <div v-else>
              {{ scope.row.isInactive }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdName"
          label="创建人"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.createdName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              {{ scope.row.createdTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="修改人">
          <template slot-scope="scope">
            <div>
              {{ scope.row.updatedName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="修改时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              {{ scope.row.updatedTime }}
            </div>
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
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PortApi from "@/api/portData/portData";
export default {
  name: "portData",
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
      portCode: "", //港口编码
      portName: "", //港口名称
      areaList: [], //国家列表
      provinceList: [],
      branchList: [], //省份列表
      isInactive: "", //状态
      stateList: [{ value: 0, label: "启用" }, { value: 1, label: "禁用" }], //状态列表
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
    //获取国家列表
    this.getArea();
    //获取表格
    this.portList();
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
    inputShow() {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    //获取国家列表
    getArea() {
      let params = { regionId: 0 };
      PortApi.areaList(params)
        .then(res => {
          this.areaList = res.data;
        })
        .catch();
    },
    //列表国家切换
    companyTable(e, index) {
      this.tableData[index].provinceId = ``;
      this.tableData[index].provinceName = ``;
      for (const iterator of this.areaList) {
        if (iterator.regionId == e) {
          this.tableData[index].countryName = iterator.regionName;
        }
      }
      this.branchTableList(e, index);
    },
    //列表省选择
    brandchTableChange(e, index) {
      for (const item of this.provinceList) {
        if (item.regionId == e)
          this.tableData[index].provinceName = item.regionName;
      }
    },
    //列表省渲染
    branchTableList(e, index) {
      let params = { regionId: e };
      PortApi.areaList(params)
        .then(res => {
          this.$nextTick(() => {
            this.provinceList = res.data;
            this.$set(this.tableData[index], index, res.data);
          });
        })
        .catch();
    },
    //获取表格
    portList() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        portCode: this.portCode,
        portName: this.portName,
        isInactive: this.isInactive
      };
      PortApi.portList(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.data.list;
          this.tableData.forEach((item, index) => {
            item.edit = false;
            item.createdTime = this.$timeFun(item.createdTime, 1);
            item.updatedTime = this.$timeFun(item.updatedTime, 1);
            item.isInactive == "0"
              ? (item.isInactive = "启用")
              : (item.isInactive = "禁用");
            item.branchTable = [];
            item.companyId ? item.companyId.toString() : ``;
          });
          this.total = res.data.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //查询
    queryData() {
      this.portList();
    },
    //清空选项
    clearNone() {
      this.portName = ``;
      this.portCode = ``;
      this.isInactive = ``;
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.portList();
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
      this.branchTableList(e.countryId, index);
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
      if (!this.selectioned) {
        this.$openWarning("未选择数据");
        return false;
      }

      if (e == 1) {
        this.tableData.forEach(item => {
          item.edit = false;
        });
        for (const get of this.selectioned) {
          this.tableData.forEach((item, index) => {
            if (item.one == get.one && item.portId == get.portId) {
              item.change = 1;
              item.edit = true;
            }
            this.$set(this.tableData, index, this.tableData[index]);
            this.branchTableList(item.countryId, index);
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
                  PortApi.portDel(old)
                    .then(res => {
                      this.$openSuccess(res.message);
                      // this.deleIndex(this.selectioned);
                      this.selectioned = [];
                      this.$refs.multipleTable.clearSelection();
                      this.portList();
                    })
                    .catch();
                } else {
                  this.deleIndex(this.selectioned);
                  this.$refs.multipleTable.clearSelection();
                }
                break;
              case 3:
                for (const item of old) {
                  item.isInactive = 0;
                }
                if (old.length) {
                  PortApi.portOpen(old)
                    .then(res => {
                      this.$openSuccess(res.message);
                      this.portList();
                    })
                    .catch();
                } else {
                  this.$openWarning("不可修改");
                }
                break;
              case 4:
                for (const item of old) {
                  item.isInactive = 1;
                }
                if (old.length) {
                  PortApi.portBlock(old)
                    .then(res => {
                      this.$openSuccess(res.message);
                      this.portList();
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
      let del = this.tableData.findIndex(item => {
        if (e.portId) {
          return item.portId == e.portId;
        } else {
          return item.one == e.one;
        }
      });
      this.tableData.splice(del, 1);
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
        portAddress: ``,
        portCode: ``,
        portName: ``,
        countryName: ``,
        countryId: ``,
        provinceName: "",
        provinceId: "",
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
      for (const item of changeData) {
        if (item.portCode == "") {
          this.$openWarning("请填写港口代码");
          return false;
        }
        if (item.portName == "") {
          this.$openWarning("请填写港口名称");
          return false;
        }
        if (item.countryName == "") {
          this.$openWarning("请选择国家");
          return false;
        }
        // if (item.provinceName == "") {
        //   this.$openWarning("请选择省份");
        //   return false;
        // }
        item.isInactive == "启用"
          ? (item.isInactive = "0")
          : (item.isInactive = "1");
      }
      this.$confirm("是否确定提交", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = changeData;
          PortApi.portInse(params)
            .then(res => {
              this.$openSuccess(res.message);
              this.portList();
            })
            .catch();
        })
        .catch();
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
</style>
