<template>
  <div class="staffData">
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
          <label>所属公司</label>
          <el-input
            v-model="company.companyName"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="componyTip(1)">
            <i class="el-icon-search"></i>
          </span>
          <!-- <el-select
            v-model="companyId"
            placeholder="请选择"
            @change="companyChange"
            clearable
          >
            <el-option
              v-for="item in companyList"
              :key="item.companyId"
              :label="item.companyName"
              :value="item.companyId"
            >
            </el-option>
          </el-select> -->
        </el-col>
        <!-- <el-col :span="5" class="el-col">
            <label>部门代码</label><el-input v-model="bankName" class="el-inputs" placeholder="请选择"></el-input>
        </el-col> -->
        <el-col :span="5" class="el-col">
          <label>部门名称</label>
          <!-- <el-select v-model="branchName" placeholder="请选择" clearable>
            <el-option
              v-for="item in branchList"
              :key="item.branchCode"
              :label="item.branchName"
              :value="item.branchCode"
            >
            </el-option>
          </el-select> -->
          <el-input
            v-model="branch.branchName"
            class="el-inputs"
            placeholder="请选择"
            disabled
          ></el-input>
          <span class="comicon" @click="departmentTip(1)">
            <i class="el-icon-search"></i>
          </span>
        </el-col>
        <el-col :span="5" class="el-colc">
          <label>状态</label>
          <el-select v-model="isInactive" placeholder="请选择" clearable>
            <el-option
              v-for="item in stateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="el-col" clearable>
          <label>员工代码</label>
          <el-input
            v-model="empCode"
            class="el-inputs"
            v-input-filter:code
            placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col :span="5" class="el-col" clearable>
          <label>员工姓名</label>
          <el-input
            v-model="empName"
            class="el-inputs"
            placeholder="请输入"
          ></el-input>
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
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="paritiesDate"
          label="员工代码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit && !scope.row.empId">
              <span style="color:red">*</span>
              <el-input
                v-input-filter:code
                v-model="scope.row.empCode"
                placeholder="请输入内容"
                @input="handleIdRule"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.empCode }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="paritiesDate"
          label="员工姓名"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <span style="color:red">*</span>
              <el-input
                v-model="scope.row.empName"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.empName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属公司"
          show-overflow-tooltip
          width="150"
        >
          <template slot-scope="scope">
            <div class="redfs" v-show="scope.row.edit">
              <!-- <el-select
                v-model="scope.row.companyId"
                placeholder="请选择"
                @change="companyTable(scope.row.companyId, scope.$index)"
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                >
                </el-option>
              </el-select> -->
              <span style="color:red">*</span>
              <el-input
                v-model="scope.row.companyName"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="componyTip(scope)">
                <i class="el-icon-search"></i>
              </span>
            </div>
            <div v-show="!scope.row.edit">
              {{ scope.row.companyName }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="paritiesDate" label="部门代码" width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if='scope.row.edit'>
                <el-input v-model="scope.row.bankCode" placeholder="请输入内容"></el-input>
              </div>
              <div v-else>
                {{ scope.row.bankCode }}
              </div>
            </template>
          </el-table-column> -->
        <el-table-column
          prop="paritiesDate"
          label="部门名称"
          show-overflow-tooltip
          width="150"
        >
          <template slot-scope="scope">
            <div class="redfs" v-if="scope.row.edit">
              <!-- <el-select
                v-model="scope.row.branchId"
                placeholder="请选择"
                @change="brandchTableChange(scope.row.branchId, scope.$index)"
              >
                <el-option
                  v-for="item in scope.row.branchTable"
                  :key="item.branchCode"
                  :label="item.branchName"
                  :value="item.branchId"
                >
                </el-option>
              </el-select> -->
              <span style="color:red">*</span>
              <el-input
                v-model="scope.row.branchName"
                class="el-inputs"
                placeholder="请选择"
                disabled
              ></el-input>
              <span class="comicon" @click="departmentTip(scope.row)">
                <i class="el-icon-search"></i>
              </span>
            </div>
            <div v-else>
              {{ scope.row.branchName }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="paritiesDate"
          label="对应金蝶部门编码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.kisOrgCode"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.kisOrgCode }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="对应金蝶部门名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.kisOrgName"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.kisOrgName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="对应OA部门编码"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.oaOrgCode"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.oaOrgCode }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="parities"
          label="对应OA部门名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
                v-model="scope.row.oaOrgName"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.oaOrgName }}
            </div>
          </template>
        </el-table-column> -->
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
    <!-- 选择公司弹窗 -->
    <compony-select
      v-if="componyShow"
      :tipShow="componyShow"
      :isInactiveS="isInactiveS"
      :isInactiveStatus="isInactiveStatus"
      @tipsCancle="tipsCancle"
      @tipsSure="tipsSure"
    ></compony-select>
    <!-- 选择部门弹窗 -->
    <department-select
      v-if="departmentShow"
      :tipShow="departmentShow"
      :data="company"
      :companyId="companyId"
      :isInactiveS="isInactiveS"
      :isInactiveStatus="isInactiveStatus"
      @departmentCancle="departmentCancle"
      @departmentSure="departmentSure"
    ></department-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
import componySelect from "@/components/componySelect.vue";
import departmentSelect from "@/components/departmentSelect.vue";
import StaffApi from "@/api/staffData/staffData";
export default {
  name: "staffData",
  data() {
    return {
      tableData: [], //表格
      componyShow: false, //公司弹窗
      departmentShow: false, //部门弹窗
      tableAssign: "", //表格深拷贝数据
      selectioned: [], //表格选中项
      index: null, //选中index
      newTbale: [], //新建数据
      page: null, //总页数
      pageNum: 1, //页码
      pageSize: 100, //页显示条数
      total: 0, //总数目
      company: {},
      com: "",
      come: {},
      dep: ``,
      companyId: "", //查询所属公司
      companyList: [], //公司列表
      codeList: [], //银行代码列表
      bankName: "", //银行名称
      bankCode: "", //银行行号
      branchCode: "", //部门编码
      branch: {}, //部门名称
      branchList: [], //部门列表
      empCode: "", //员工代码
      empName: "", //员工姓名
      isInactive: "", //状态
      isInactiveS: false, //状态
      isInactiveStatus: false, //控制公司里面状态
      stateList: [
        { value: 0, label: "启用" },
        { value: 1, label: "禁用" }
      ], //状态列表
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
    //获取公司列表
    this.getCompany();
    //获取表格
    this.empList();
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
      this.show = this.$showOne(this.show);
    },
    //公司弹窗打开
    componyTip(e) {
      if (e == 1) {
        this.componyShow = true;
        this.isInactiveS = false;
        this.isInactiveStatus = false;
        this.com = e;
      } else {
        this.componyShow = true;
        this.isInactiveS = true;
        this.isInactiveStatus = true;
        this.com = 2;
        this.index = e.$index;
      }
    },
    //公司弹窗关闭
    tipsCancle() {
      this.componyShow = false;
    },
    //公司弹窗确定获取数据
    tipsSure(e) {
      console.log(e);
      this.componyShow = false;
      if (this.com == 1) {
        this.company = e;
        this.branch = ``;
        this.staffName = ``;
      } else {
        this.companyId = e.companyId;
        let data = this.tableData[this.index];
        data.companyName = e.companyName;
        data.companyId = e.companyId;
        data.companyCode = e.companyCode;
        data.staffName = ``;
        data.branch = ``;
        data.branchCode = ``;
        data.branchId = ``;
        
        this.$set(this.tableData, this.index, data);
      }
    },
    //部门弹窗打开
    departmentTip(e) {
      if (e == 1) {
        // if (!this.company.companyName) {
        //   this.$openWarning("请先选择公司");
        //   return false;
        // }
        this.departmentShow = true;
        this.isInactiveS = false;
        this.isInactiveStatus = false;
      } else {
        console.log(e);
        this.companyId = ``;
        // if (!e.companyId) {
        //   this.$openWarning("请先选择公司");
        //   return false;
        // }
        this.companyId = e.companyId;
        this.dep = e;
        this.isInactiveS = true;
        this.isInactiveStatus = true;
        this.departmentShow = true;
      }
    },
    //部门弹窗关闭
    departmentCancle() {
      this.dep = ``;
      this.departmentShow = false;
    },
    //部门弹窗确定获取数据
    departmentSure(e) {
      this.departmentShow = false;
      if (this.dep) {
        this.dep.branchName = e.branchName;
        this.dep.branchId = e.branchId;
        this.$set(this.tableData, this.index, this.dep);
      } else {
        this.branch = e;
        this.staffName = ``;
      }
    },
    //获取公司列表
    getCompany() {
      let params = {};
      StaffApi.companyList(params)
        .then(res => {
          this.companyList = res.data;
        })
        .catch();
    },
    //获取公司部门列表
    gerBranch(e) {
      let params = { companyId: e };
      StaffApi.branchList(params)
        .then(res => {
          this.branchList = res.data;
        })
        .catch();
    },
    //公司选择切换
    companyChange(e) {
      this.branch = ``;
      this.gerBranch(e);
    },
    //列表公司切换
    companyTable(e, index) {
      this.tableData[index].branchId = ``;
      this.tableData[index].branchName = ``;
      for (const iterator of this.companyList) {
        if (iterator.companyId == e) {
          this.tableData[index].companyName = iterator.companyName;
        }
      }
      this.branchTableList(e, index);
    },
    //列表部门选择
    brandchTableChange(e, index) {
      for (const item of this.tableData[index].branchTable) {
        if (item.branchId == e)
          this.tableData[index].branchName = item.branchName;
      }
    },
    //列表部门渲染
    branchTableList(e, index) {
      let params = { companyId: e };
      StaffApi.branchList(params)
        .then(res => {
          this.$nextTick(() => {
            this.tableData[index].branchTable = res.data;
            this.$set(this.tableData[index], "branchTable", res.data);
          });
        })
        .catch();
    },
    //获取表格
    empList() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        rows: this.pageSize,
        companyId: this.company.companyId,
        // branchCode: this.branchCode,
        branchCode: this.branch.branchCode,
        empCode: this.empCode,
        empName: this.empName,
        isInactive: this.isInactive
      };
      let data=params;
      data.company=this.company;
      data.branch=this.branch;
      this.$setQueryData(this,data);
      StaffApi.empList(params)
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
      this.empList();
    },
    //清空选项
    clearNone() {
      this.company = {};
      this.branchList = [];
      this.branch = {};
      this.empCode = ``;
      this.empName = ``;
      this.isInactive = ``;
    },
    //翻页
    currentChange(e) {
      this.pageNum = e;
      this.empList();
    },
    //更改每页条数
    handleSizeChange(e) {
      this.pageSize = e;
      this.empList();
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
      this.branchTableList(e.companyId, index);
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
      if (!this.selectioned.length) {
        this.$openWarning("未选择数据");
        return false;
      }

      if (e == 1) {
        console.log(this.tableData);
        this.tableData.forEach(item => {
          item.edit = false;
        });
        for (const get of this.selectioned) {
          this.tableData.forEach((item, index) => {
            if (item.one == get.one && item.empId == get.empId) {
              item.change = 1;
              item.edit = true;
            }
            this.branchTableList(item.companyId, index);
            this.$set(this.tableData, index, this.tableData[index]);
          });
        }
        // this.tableData[this.index].edit = true;
        // this.tableData[this.index].change = 1;
        // this.$set(this.tableData, this.index, this.tableData[this.index]);
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
                  StaffApi.empDelete(old)
                    .then(res => {
                      this.$openSuccess(res.message);
                      this.deleIndex(this.selectioned);
                      // this.selectioned = [];
                      // this.$refs.multipleTable.clearSelection();
                      this.empList();
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
                console.log(old);
                if (old.length) {
                  StaffApi.open(old)
                    .then(res => {
                      this.$openSuccess(res.message);
                      this.empList();
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
                  StaffApi.block(old)
                    .then(res => {
                      this.$openSuccess(res.message);
                      this.empList();
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
    //     if (e.empId) {
    //       return item.empId == e.empId;
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
          return item.one == get.one && item.empId == get.empId;
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
        empCode: ``,
        empName: ``,
        kisOrgCode: ``,
        kisOrgName: ``,
        oaOrgCode: ``,
        oaOrgName: "",
        companyId: "",
        companyName: "",
        branchId: "",
        branch: "",
        companyList: this.companyList,
        branchList: [],
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
        item.companyId = this.companyId;
        return item.change == 1;
      });
      let old = JSON.stringify(changeArr);
      let changeData = JSON.parse(old);
      if (this.tableData.length == 0 || changeData.length == 0) {
        this.$openWarning("无数据提交");
        return false;
      }
      for (const item of changeData) {
        if (
          item.empName == "" ||
          item.empCode == "" ||
          item.companyName == "" ||
          item.branchId == ""
        ) {
          this.$openWarning("填写完整数据");
          return false;
        } else {
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
            StaffApi.empInsert(params)
              .then(res => {
                this.$openSuccess(res.message);
                this.empList();
              })
              .catch();
          })
          .catch();
      }
    },
    //ID输入校验
    handleIdRule(value) {
      console.log("value", value);
      let reg = /[^A-Za-z0-9]*$/;
      if (reg.test(value)) {
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
  },
  components: {
    componySelect,
    departmentSelect
  }
};
</script>

<style lang="scss">
.staffData {
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
  .redfs {
    position: relative;
    .comicon {
      width: 100%;
      position: absolute;
      left: 0;
      cursor: pointer;
      i {
        float: right;
        line-height: inherit;
      }
    }
  }
}
</style>
